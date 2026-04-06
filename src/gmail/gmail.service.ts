import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { google, gmail_v1 } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { User } from '../users/entities/user.entity';

interface GmailTokens {
  access_token: string;
  refresh_token?: string;
  expiry_date?: number;
}

@Injectable()
export class GmailService {
  private oauth2Client: any;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.initOAuthClient();
  }

  private initOAuthClient() {
    const credentialsPath = path.join(process.cwd(), 'client_secret.json');
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.web;

    this.oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      'http://localhost:3000/api/v1/gmail/callback',
    );
  }

  getAuthUrl(userId: number): string {
    const scopes = [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      state: String(userId),
      prompt: 'consent',
    });
  }

  async setTokens(userId: number, code: string): Promise<{ success: boolean }> {
    console.log('setTokens called with userId:', userId, 'code length:', code.length);
    const { tokens } = await this.oauth2Client.getToken(code);
    console.log('Tokens received:', tokens ? 'yes' : 'no', 'refresh_token:', !!tokens?.refresh_token);
    await this.userRepository.update(userId, { gmailTokens: tokens as any });
    console.log('Tokens saved to user:', userId);
    return { success: true };
  }

  private async getTokens(userId: number): Promise<GmailTokens | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    console.log('getTokens for userId:', userId, 'user found:', !!user, 'tokens:', !!user?.gmailTokens);
    return user?.gmailTokens || null;
  }

  private async getAuth(userId: number) {
    const tokens = await this.getTokens(userId);
    if (!tokens) {
      throw new Error('Gmail not connected. Please connect your Gmail account first.');
    }

    const auth = this.oauth2Client;
    auth.setCredentials(tokens);
    return auth;
  }

  async getProfile(userId: number): Promise<gmail_v1.Schema$Profile> {
    const auth = await this.getAuth(userId);
    const gmail = google.gmail({ version: 'v1', auth });
    const response = await gmail.users.getProfile({ userId: 'me' });
    return response.data;
  }

  async listMessages(userId: number, maxResults = 50, pageToken?: string): Promise<{
    messages: gmail_v1.Schema$Message[];
    nextPageToken?: string;
    resultSizeEstimate: number;
  }> {
    const auth = await this.getAuth(userId);
    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      pageToken,
      labelIds: ['INBOX'],
    });

    const messages = response.data.messages || [];

    const fullMessages = await Promise.all(
      messages.map(async (msg) => {
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id!,
          format: 'full',
        });
        return fullMessage.data;
      }),
    );

    return {
      messages: fullMessages,
      nextPageToken: response.data.nextPageToken || undefined,
      resultSizeEstimate: response.data.resultSizeEstimate || 0,
    };
  }

  async getMessage(userId: number, messageId: string): Promise<gmail_v1.Schema$Message> {
    const auth = await this.getAuth(userId);
    const gmail = google.gmail({ version: 'v1', auth });

    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full',
    });

    return response.data;
  }

  async isConnected(userId: number): Promise<boolean> {
    const tokens = await this.getTokens(userId);
    return !!tokens;
  }

  async disconnect(userId: number): Promise<void> {
    await this.userRepository.update(userId, { gmailTokens: null });
  }

  async sendEmail(userId: number, to: string, subject: string, body: string, threadId?: string): Promise<{ messageId: string }> {
    const auth = await this.getAuth(userId);
    const gmail = google.gmail({ version: 'v1', auth });

    const message = [
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      body,
    ].join('\n');

    const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
        threadId,
      },
    });

    return { messageId: response.data.id! };
  }
}