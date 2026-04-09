import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['owner', 'createdBy'],
      order: { dueDate: 'ASC' },
    });
  }

  async findByEntity(entityType: string, entityId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { entityType, entityId },
      relations: ['owner', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(data: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(data);
    return this.taskRepository.save(task);
  }

  async update(id: number, data: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    Object.assign(task, data);
    return this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    await this.taskRepository.remove(task);
  }
}
