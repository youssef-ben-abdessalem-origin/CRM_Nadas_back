import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Campaign } from '../campaigns/entities/campaign.entity';

@Injectable()
export class UploadsService {
  constructor(
    @Inject('CLOUDINARY') private cloudinary: any,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {}

  async uploadAvatar(userId: number, file: Express.Multer.File): Promise<{ url: string }> {
    const result = await this.cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      folder: 'nexus-crm/avatars',
      public_id: `avatar_${userId}`,
      transformation: [
        { width: 200, height: 200, crop: 'fill', gravity: 'face' },
      ],
    });

    await this.userRepository.update(userId, { avatar: result.secure_url });

    return { url: result.secure_url };
  }

  async uploadDocument(
    entityType: 'lead' | 'contact' | 'account' | 'campaign',
    entityId: number,
    file: Express.Multer.File,
  ): Promise<{ url: string; name: string; type: string }> {
    const result = await this.cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      folder: `nexus-crm/${entityType}/${entityId}`,
    });

    const attachment = {
      url: result.secure_url,
      name: file.originalname,
      type: file.mimetype,
      uploadedAt: new Date().toISOString(),
    };

    if (entityType === 'lead') {
      const lead = await this.leadRepository.findOne({ where: { id: entityId } });
      if (lead) {
        const attachments = lead.attachments || [];
        attachments.push(attachment);
        await this.leadRepository.update(entityId, { attachments });
      }
    } else if (entityType === 'campaign') {
      const campaign = await this.campaignRepository.findOne({ where: { id: entityId } });
      if (campaign) {
        const attachments = campaign.attachments || [];
        attachments.push(attachment);
        await this.campaignRepository.update(entityId, { attachments });
      }
    }

    return {
      url: result.secure_url,
      name: file.originalname,
      type: file.mimetype,
    };
  }

  async uploadLogo(file: Express.Multer.File): Promise<{ url: string }> {
    const result = await this.cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
      folder: 'nexus-crm/company',
      public_id: 'company_logo',
      transformation: [
        { width: 400, height: 400, crop: 'limit' },
      ],
    });

    return { url: result.secure_url };
  }
}