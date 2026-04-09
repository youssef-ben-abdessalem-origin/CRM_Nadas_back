import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { WorkDriveFolder } from './workdrive-folder.entity';
import { User } from '../../users/entities/user.entity';

export enum WorkDriveRole {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  EDITOR = 'EDITOR',
  COMMENTER = 'COMMENTER',
  VIEWER = 'VIEWER',
}

@Entity('workdrive_permissions')
export class WorkDrivePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkDriveFolder)
  folder: WorkDriveFolder;

  @Column()
  folderId: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: WorkDriveRole,
    default: WorkDriveRole.VIEWER,
  })
  role: WorkDriveRole;

  @CreateDateColumn()
  createdAt: Date;
}
