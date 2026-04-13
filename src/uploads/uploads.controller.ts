import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadsService } from './uploads.service';
import { Express } from 'express';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('avatar')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload user avatar' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Request() req: any, @UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadAvatar(req.user.id, file);
  }

  @Post('document')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload document to lead/contact/account' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body('entityType') entityType: 'lead' | 'contact' | 'account',
    @Body('entityId') entityId: number,
  ) {
    return this.uploadsService.uploadDocument(entityType, entityId, file);
  }
  @Post('logo')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload company logo' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadLogo(file);
  }
}