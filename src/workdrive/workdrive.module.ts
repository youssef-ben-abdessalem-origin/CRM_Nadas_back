import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkDriveService } from './workdrive.service';
import { WorkDriveController } from './workdrive.controller';
import { WorkDriveTeam } from './entities/workdrive-team.entity';
import { WorkDriveFolder } from './entities/workdrive-folder.entity';
import { WorkDriveFile } from './entities/workdrive-file.entity';
import { WorkDrivePermission } from './entities/workdrive-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkDriveTeam,
      WorkDriveFolder,
      WorkDriveFile,
      WorkDrivePermission,
    ]),
  ],
  controllers: [WorkDriveController],
  providers: [WorkDriveService],
  exports: [WorkDriveService],
})
export class WorkDriveModule {}
