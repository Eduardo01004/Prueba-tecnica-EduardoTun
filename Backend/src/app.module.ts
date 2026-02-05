import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerrainModule } from './terrain/terrain.module';

@Module({
  imports: [TerrainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
