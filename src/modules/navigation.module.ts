import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationMenu } from '../entities/navigation.entity';
import { NavigationController } from '../controllers/navigation.controller';
import { NavigationService } from '../services/navigation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NavigationMenu]),
  ],
  controllers: [NavigationController],
  providers: [NavigationService],
  exports: [NavigationService],
})
export class NavigationModule {} 