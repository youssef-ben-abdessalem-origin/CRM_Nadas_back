import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { WorkDriveFolder } from './workdrive-folder.entity';
import { User } from '../../users/entities/user.entity';

@Entity('workdrive_files')
export class WorkDriveFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  @Column()
  url: string;

  @ManyToOne(() => WorkDriveFolder)
  folder: WorkDriveFolder;

  @Column()
  folderId: number;

  @ManyToOne(() => User)
  owner: User;

  @Column()
  ownerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
