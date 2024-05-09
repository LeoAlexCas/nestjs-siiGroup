import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HttpModule } from '@nestjs/axios';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    HttpModule,
    CommonModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema
      }
    ])
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
