import { Injectable } from '@nestjs/common';
import { Topologist } from './entities/topologist.entity';
import { Project } from './entities/project.entity';
import { Terrain } from './entities/terrain.entity';

@Injectable()
export class TerrainService {
  private topologists: Topologist[] = [
    {
      id: 1,
      name: 'Carlos',
      lastName: 'Garcia',
      email: 'carlos.garcia@email.com',
      phone: '555-1234',
      organization: 'GeoStudios',
      registerDate: new Date('2024-01-15'),
      active: true
    },
    {
      id: 2,
      name: 'Maria',
      lastName: 'Lopez',
      email: 'maria.lopez@email.com',
      phone: '555-5678',
      organization: 'TerrainTech',
      registerDate: new Date('2024-02-20'),
      active: true
    },
    {
      id: 3,
      name: 'Juan',
      lastName: 'Martinez',
      email: 'juan.martinez@email.com',
      phone: '555-9012',
      organization: 'GeoStudios',
      registerDate: new Date('2024-03-10'),
      active: false
    }
  ];

  private projects: Project[] = [
    {
      id: 1,
      name: 'Analisis Zona Norte',
      description: 'Estudio de terrenos en zona norte de la ciudad',
      client: 'Municipalidad',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-06-30'),
      active: true,
      createdAt: new Date('2024-01-01')
    },
    {
      id: 2,
      name: 'Proyecto Hidrografico Sur',
      description: 'Mapeo de acumulacion de agua en terrenos',
      client: 'Gobierno Regional',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-12-31'),
      active: true,
      createdAt: new Date('2024-03-01')
    }
  ];

  private terrains: Terrain[] = [
    {
      id: 1,
      topologistId: 1,
      projectId: 1,
      heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      waterUnits: 6,
      maxHeight: 3,
      arrayLength: 12,
      latitude: 19.4326,
      longitude: -99.1332,
      createdAt: new Date('2024-02-15')
    },
    {
      id: 2,
      topologistId: 1,
      projectId: 1,
      heights: [4, 2, 0, 3, 2, 5],
      waterUnits: 9,
      maxHeight: 5,
      arrayLength: 6,
      latitude: 19.4520,
      longitude: -99.1500,
      createdAt: new Date('2024-02-20')
    },
    {
      id: 3,
      topologistId: 2,
      projectId: 2,
      heights: [3, 0, 2, 0, 4],
      waterUnits: 7,
      maxHeight: 4,
      arrayLength: 5,
      latitude: 20.6597,
      longitude: -103.3496,
      createdAt: new Date('2024-04-10')
    }
  ];

  private terrainIdCounter = 4;

  calculateWater(heights: number[]): number {
    const n = heights.length;

    if (n === 0) return 0;

    const maxLeft: number[] = new Array(n);
    const maxRight: number[] = new Array(n);

    maxLeft[0] = heights[0];
    for (let i = 1; i < n; i++) {
      maxLeft[i] = Math.max(maxLeft[i - 1], heights[i]);
    }

    maxRight[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      maxRight[i] = Math.max(maxRight[i + 1], heights[i]);
    }

    let totalWater = 0;
    for (let i = 0; i < n; i++) {
      const waterLevel = Math.min(maxLeft[i], maxRight[i]);
      const waterAtPosition = waterLevel - heights[i];
      if (waterAtPosition > 0) {
        totalWater += waterAtPosition;
      }
    }

    return totalWater;
  }

  // Topologists
  getTopologists(): Topologist[] {
    return this.topologists;
  }

  getTopologistById(id: number): Topologist {
    return this.topologists.find(t => t.id === id);
  }

  // Projects
  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project {
    return this.projects.find(p => p.id === id);
  }

  // Terrains
  getTerrains(): Terrain[] {
    return this.terrains;
  }

  getTerrainById(id: number): Terrain {
    return this.terrains.find(t => t.id === id);
  }

  getTerrainsByTopologist(topologistId: number): Terrain[] {
    return this.terrains.filter(t => t.topologistId === topologistId);
  }

  getTerrainsByProject(projectId: number): Terrain[] {
    return this.terrains.filter(t => t.projectId === projectId);
  }

  createTerrain(data: { topologistId: number; projectId: number; heights: number[]; latitude?: number; longitude?: number }): Terrain {
    const terrain: Terrain = {
      id: this.terrainIdCounter++,
      topologistId: data.topologistId,
      projectId: data.projectId,
      heights: data.heights,
      waterUnits: this.calculateWater(data.heights),
      maxHeight: Math.max(...data.heights),
      arrayLength: data.heights.length,
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
      createdAt: new Date()
    };
    this.terrains.push(terrain);
    return terrain;
  }

  // Reports
  getReport() {
    const totalTerrains = this.terrains.length;
    const totalWater = this.terrains.reduce((sum, t) => sum + t.waterUnits, 0);
    const avgWater = totalTerrains > 0 ? totalWater / totalTerrains : 0;

    return {
      totalTerrains,
      totalWater,
      avgWater: Math.round(avgWater * 100) / 100,
      maxWater: Math.max(...this.terrains.map(t => t.waterUnits)),
      minWater: Math.min(...this.terrains.map(t => t.waterUnits)),
      totalTopologists: this.topologists.filter(t => t.active).length,
      totalProjects: this.projects.filter(p => p.active).length
    };
  }
}
