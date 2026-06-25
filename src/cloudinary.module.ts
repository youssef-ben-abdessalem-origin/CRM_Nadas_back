import { Module } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dppdwnjo8',
  api_key: '274699343335685',
  api_secret: '_GabaovQ4jU2NnPT7pTM6h_bhCs',
});

@Module({
  providers: [
    {
      provide: 'CLOUDINARY',
      useValue: cloudinary,
    },
  ],
  exports: ['CLOUDINARY'],
})
export class CloudinaryModule {}