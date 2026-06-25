import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CostCenter } from "./entities/cost-center.entity";
import { Department } from "../departments/entities/department.entity";
import { Employee } from "../hr/entities/employee.entity";
import { CostCentersService } from "./cost-centers.service";
import { CostCentersController } from "./cost-centers.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CostCenter, Department, Employee])],
  providers: [CostCentersService],
  controllers: [CostCentersController],
  exports: [CostCentersService],
})
export class CostCentersModule {}
