import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary.module';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { User } from '../users/entities/user.entity';
import { Lead } from '../leads/entities/lead.entity';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([User, Lead]),
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}