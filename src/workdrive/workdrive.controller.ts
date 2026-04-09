import { Controller, Get, Post, Body, Param, UseGuards, Query, Request } from '@nestjs/common';
import { WorkDriveService } from './workdrive.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorkDriveRole } from './entities/workdrive-permission.entity';

@Controller('workdrive')
@UseGuards(JwtAuthGuard)
export class WorkDriveController {
  constructor(private readonly workDriveService: WorkDriveService) {}

  @Get('team')
  getTeam(@Request() req) {
    return this.workDriveService.getTeamByOwner(req.user.id);
  }

  @Post('team')
  createTeam(@Request() req, @Body('name') name: string) {
    return this.workDriveService.createTeam(name, req.user.id);
  }

  @Get('folders')
  getFolders(
    @Request() req,
    @Query('teamId') teamId: string,
    @Query('isTeamFolder') isTeamFolder: string,
    @Query('parentId') parentId?: string,
  ) {
    return this.workDriveService.getFolders(
      Number(teamId),
      isTeamFolder === 'true',
      parentId ? Number(parentId) : undefined,
    );
  }

  @Post('folders')
  createFolder(@Request() req, @Body() data: any) {
    return this.workDriveService.createFolder({
      ...data,
      ownerId: req.user.id,
    });
  }

  @Get('folders/:id/permissions')
  getPermissions(@Param('id') id: string) {
    return this.workDriveService.getFolderPermissions(Number(id));
  }

  @Post('folders/:id/permissions')
  updatePermissions(
    @Param('id') id: string,
    @Body('permissions') permissions: { userId: number; role: WorkDriveRole }[],
  ) {
    return this.workDriveService.updatePermissions(Number(id), permissions);
  }

  @Get('files')
  getFiles(@Query('folderId') folderId: string) {
    return this.workDriveService.getFiles(Number(folderId));
  }

  @Post('files')
  createFile(@Request() req, @Body() data: any) {
    return this.workDriveService.createFile({
      ...data,
      ownerId: req.user.id,
    });
  }
}
