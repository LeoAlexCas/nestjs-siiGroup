import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { map, take } from 'rxjs';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  runSEED() {
    return this.seedService.seedWrite().pipe(
      map((res) => res),
      take(1)
    );
  };
};
