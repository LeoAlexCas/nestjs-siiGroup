import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, defer, from, map, of, switchMap, take, tap } from 'rxjs';
import { IPokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly _pokemonModel: Model<Pokemon>,
    private readonly _httpService: HttpService,
    private readonly _httpAdapted: AxiosAdapter
  ) {}

    seedWrite() {
      console.log('WRITE SEED')
      return this._httpService.get<IPokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0').pipe(
        map((res) => {
          const data = res.data.results.map((el) => {
            console.log('CREANDO DATA')
            const segmentes = el.url.split('/');
            const no = segmentes[segmentes.length - 2];
            return {
              name: el.name,
              no
            };
          });

          return data;
        }),
        switchMap((data) => from(this._pokemonModel.insertMany(data))),
        catchError((error) => {
          console.log(error)
          if (error.code === 11000) {
            throw new BadRequestException(`Pokemon exists in db`)
          };
          throw new BadRequestException(error);
        }),
        take(1)
      )
    };
};
