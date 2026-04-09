import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkDriveTeam } from './workdrive-team.entity';
import { User } from '../../users/entities/user.entity';

@Entity('workdrive_folders')
export class WorkDriveFolder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isTeamFolder: boolean;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => WorkDriveFolder, folder => folder.children)
  parent: WorkDriveFolder;

  @OneToMany(() => WorkDriveFolder, folder => folder.parent)
  children: WorkDriveFolder[];

  @ManyToOne(() => WorkDriveTeam)
  team: WorkDriveTeam;

  @Column({ nullable: true })
  teamId: number;

  @ManyToOne(() => User)
  owner: User;

  @Column()
  ownerId: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
