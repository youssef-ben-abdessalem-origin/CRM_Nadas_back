import { Controller, Get, Post, Query, UseGuards, Request, Param, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GmailService } from './gmail.service';
import { Response } from 'express';

@ApiTags('Gmail')
@Controller('gmail')
export class GmailController {
  constructor(private gmailService: GmailService) {}

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
    const userId = parseInt(state);
    await this.gmailService.setTokens(userId, code);
    res.redirect('http://localhost:5173/emails?gmail_connected=true');
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
  ) {
    return this.gmailService.listMessages(
      req.user.id,
      maxResults ? parseInt(maxResults) : 50,
      pageToken,
    );
  }

  @Get('messages/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Gmail message by ID' })
  async getMessage(@Request() req: any, @Param('id') id: string) {
    return this.gmailService.getMessage(req.user.id, id);
  }
}