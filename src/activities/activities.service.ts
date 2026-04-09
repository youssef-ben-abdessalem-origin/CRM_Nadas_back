import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity, ActivityEntityType } from './entities/activity.entity';
import { ActivityType } from '../settings/entities/activity-type.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(ActivityType)
    private readonly activityTypeRepository: Repository<ActivityType>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find({
      relations: ['assignedTo', 'createdBy'],
      order: { dueDate: 'ASC' },
    });
  }

  async findByEntity(entityType: ActivityEntityType, entityId: number): Promise<Activity[]> {
    return this.activityRepository.find({
      where: { entityType, entityId },
      relations: ['assignedTo', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(
    data: {
      entityType: ActivityEntityType;
      entityId: number;
      typeId: number;
      subject?: string;
      description?: string;
      dueDate?: Date;
      assignedToId?: number;
      createdById?: number;
      callType?: string;
      durationMinutes?: string;
      durationSeconds?: string;
      voiceRecording?: string;
      reminder?: string;
      status?: string;
    },
  ): Promise<Activity> {
    const activity = this.activityRepository.create(data);
    return this.activityRepository.save(activity);
  }

  async update(id: number, data: Partial<Activity>): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) throw new NotFoundException('Activity not found');
    Object.assign(activity, data);
    return this.activityRepository.save(activity);
  }

  async complete(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) throw new NotFoundException('Activity not found');
    activity.completed = true;
    activity.completedAt = new Date();
    return this.activityRepository.save(activity);
  }

  async reassign(id: number, assignedToId: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) throw new NotFoundException('Activity not found');
    activity.assignedToId = assignedToId;
    return this.activityRepository.save(activity);
  }

  async delete(id: number): Promise<void> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) throw new NotFoundException('Activity not found');
    await this.activityRepository.remove(activity);
  }

  async getAllTypes(): Promise<ActivityType[]> {
    return this.activityTypeRepository.find({ where: { isActive: true } });
  }
}
