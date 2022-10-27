import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import axios from 'axios';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  excecuteSeed() {
    return this.seedService.excecuteSeed();
  }

}
