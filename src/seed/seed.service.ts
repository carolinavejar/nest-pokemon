import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance} from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {}
  
  async excecuteSeed() {

    await this.pokemonModel.deleteMany();


    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=300')  
    // const insertPromisesArray = [];
    const pokemons = [];
    data.results.forEach( async({ name , url })  => {
      
      const segments = url.split('/');
      const nro = +segments[segments.length -2]
      // insertPromisesArray.push(this.pokemonModel.create({ name, nro})) 
      pokemons.push({ name, nro })
    });
    
    this.pokemonModel.insertMany(pokemons);
    return "Seed excecuted";
  }
}
