import { Module } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dofiddmz7',
  api_key: '745198935585132',
  api_secret: '5eQAhx_M6_lxupqDtL6kxyLMpY4',
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