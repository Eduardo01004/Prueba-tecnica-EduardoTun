import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TerrainService } from './terrain.service';

@Controller('api')
export class TerrainController {
  constructor(private readonly terrainService: TerrainService) {}

  @Post('calculate')
  calculate(@Body() body: { heights: number[] }) {
    const result = this.terrainService.calculateWater(body.heights);
    return { heights: body.heights, totalWater: result };
  }

  @Get('topologists')
  getTopologists() {
    return this.terrainService.getTopologists();
  }

  @Get('topologists/:id')
  getTopologist(@Param('id') id: string) {
    return this.terrainService.getTopologistById(Number(id));
  }

  @Get('projects')
  getProjects() {
    return this.terrainService.getProjects();
  }

  @Get('projects/:id')
  getProject(@Param('id') id: string) {
    return this.terrainService.getProjectById(Number(id));
  }

  @Get('terrains')
  getTerrains() {
    return this.terrainService.getTerrains();
  }

  @Get('terrains/:id')
  getTerrain(@Param('id') id: string) {
    return this.terrainService.getTerrainById(Number(id));
  }

  @Get('topologists/:id/terrains')
  getTerrainsByTopologist(@Param('id') id: string) {
    return this.terrainService.getTerrainsByTopologist(Number(id));
  }

  @Get('projects/:id/terrains')
  getTerrainsByProject(@Param('id') id: string) {
    return this.terrainService.getTerrainsByProject(Number(id));
  }

  @Post('terrains')
  createTerrain(@Body() body: { topologistId: number; projectId: number; heights: number[]; latitude?: number; longitude?: number }) {
    return this.terrainService.createTerrain(body);
  }

  @Get('report')
  getReport() {
    return this.terrainService.getReport();
  }
}
