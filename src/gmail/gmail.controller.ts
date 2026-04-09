import { Controller, Get, Post, Query, UseGuards, Request, Param, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GmailService } from './gmail.service';
import { Response } from 'express';

@ApiTags('Gmail')
@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @Get('auth-url')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Gmail OAuth URL' })
  getAuthUrl(@Request() req: any) {
    const url = this.gmailService.getAuthUrl(req.user.id);
    return { url };
  }

  @Get('callback')
  @ApiOperation({ summary: 'Gmail OAuth callback' })
  async callback(@Query('code') code: string, @Query('state') state: string, @Res() res: Response) {
    console.log('Gmail callback received, state:', state, 'code exists:', !!code);
    try {
      const userId = Number.parseInt(state);
      console.log('Setting tokens for userId:', userId);
      await this.gmailService.setTokens(userId, code);
      res.redirect('http://localhost:8080/emails?gmail_connected=true');
    } catch (error) {
      console.error('Gmail callback error:', error);
      res.redirect('http://localhost:8080/emails?gmail_error=callback_failed');
    }
  }

  @Post('connect')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Connect Gmail with authorization code' })
  async connect(@Request() req: any, @Query('code') code: string) {
    return this.gmailService.setTokens(req.user.id, code);
  }

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check Gmail connection status' })
  async getStatus(@Request() req: any) {
    const connected = await this.gmailService.isConnected(req.user.id);
    return { connected };
  }

  @Post('disconnect')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Disconnect Gmail' })
  async disconnect(@Request() req: any) {
    await this.gmailService.disconnect(req.user.id);
    return { success: true };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Gmail profile' })
  async getProfile(@Request() req: any) {
    return this.gmailService.getProfile(req.user.id);
  }

  @Get('messages')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List Gmail messages' })
  async listMessages(
    @Request() req: any,
    @Query('maxResults') maxResults?: string,
    @Query('pageToken') pageToken?: string,
    @Query('label') label?: string,
  ) {
    return this.gmailService.listMessages(
      req.user.id,
      maxResults ? Number.parseInt(maxResults) : 50,
      pageToken,
      label || 'INBOX',
    );
  }

  @Get('messages/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Gmail message by ID' })
  async getMessage(@Request() req: any, @Param('id') id: string) {
    return this.gmailService.getMessage(req.user.id, id);
  }

  @Get('threads/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Gmail thread by ID' })
  async getThread(@Request() req: any, @Param('id') id: string) {
    return this.gmailService.getThread(req.user.id, id);
  }

  @Post('send')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send Gmail message' })
  async sendEmail(
    @Request() req: any,
    @Query('to') to: string,
    @Query('subject') subject: string,
    @Query('body') body: string,
    @Query('threadId') threadId?: string,
  ) {
    return this.gmailService.sendEmail(req.user.id, to, subject, body, threadId);
  }
}