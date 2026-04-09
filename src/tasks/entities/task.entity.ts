import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column({ nullable: true })
  dueDate: string;

  @Column({ default: 'Normal' })
  priority: string;

  @Column({ default: 'Pending' })
  status: string;

  @Column({ nullable: true })
  entityType: string;

  @Column({ nullable: true })
  entityId: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  hasReminder: boolean;

  @Column({ type: 'jsonb', nullable: true })
  reminder: any;

  @Column({ default: false })
  hasRepeat: boolean;

  @Column({ type: 'jsonb', nullable: true })
  repeat: any;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  ownerId: number;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column({ nullable: true })
  createdById: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
