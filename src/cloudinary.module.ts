import { Module } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dp1lir8kc',
  api_key: '565189924782621',
  api_secret: 'I771l-EUZqsnrXOf38dgXNs1Dps',
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