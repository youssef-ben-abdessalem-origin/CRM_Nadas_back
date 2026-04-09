import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkDriveTeam } from './entities/workdrive-team.entity';
import { WorkDriveFolder } from './entities/workdrive-folder.entity';
import { WorkDriveFile } from './entities/workdrive-file.entity';
import { WorkDrivePermission, WorkDriveRole } from './entities/workdrive-permission.entity';

@Injectable()
export class WorkDriveService {
  constructor(
    @InjectRepository(WorkDriveTeam)
    private readonly teamRepo: Repository<WorkDriveTeam>,
    @InjectRepository(WorkDriveFolder)
    private readonly folderRepo: Repository<WorkDriveFolder>,
    @InjectRepository(WorkDriveFile)
    private readonly fileRepo: Repository<WorkDriveFile>,
    @InjectRepository(WorkDrivePermission)
    private readonly permissionRepo: Repository<WorkDrivePermission>,
  ) {}

  async getTeamByOwner(ownerId: number) {
    return this.teamRepo.findOne({ where: { ownerId } });
  }

  async createTeam(name: string, ownerId: number) {
    const team = this.teamRepo.create({ name, ownerId });
    return this.teamRepo.save(team);
  }

  async getFolders(teamId: number, isTeamFolder: boolean, parentId?: number) {
    return this.folderRepo.find({
      where: { teamId, isTeamFolder, parentId: parentId || null },
      order: { name: 'ASC' },
    });
  }

  async createFolder(data: Partial<WorkDriveFolder>) {
    const folder = this.folderRepo.create(data);
    return this.folderRepo.save(folder);
  }

  async updatePermissions(folderId: number, permissions: { userId: number; role: WorkDriveRole }[]) {
    // Delete existing permissions for this folder
    await this.permissionRepo.delete({ folderId });
    
    // Add new ones
    const entities = permissions.map(p => this.permissionRepo.create({
      folderId,
      userId: p.userId,
      role: p.role,
    }));
    
    return this.permissionRepo.save(entities);
  }

  async getFolderPermissions(folderId: number) {
    return this.permissionRepo.find({
      where: { folderId },
      relations: ['user'],
    });
  }

  async getFiles(folderId: number) {
    return this.fileRepo.find({ where: { folderId } });
  }

  async createFile(data: Partial<WorkDriveFile>) {
    const file = this.fileRepo.create(data);
    return this.fileRepo.save(file);
  }
}
