import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PagitationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit : number
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon>,
    private readonly configService : ConfigService
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit')    
  }
  async create(createPokemonDto: CreatePokemonDto) {
    console.log("Creating" + createPokemonDto.name + " . . . .  ");
    
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto )
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }
    
  }

  findAll(paginationDto: PagitationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({ nro: 1})
    .select('-__v') // Oculta con el '-' la columna '__v' de los resultados
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne( {nro: term } )
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne( {id: term } )
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne( {name: term.toLocaleLowerCase().trim() } )
    }

    if(!pokemon) {
      throw new NotFoundException(`Pokemon ${term} not found`)
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne( term );

      if(updatePokemonDto.name ){
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }
      await pokemon.updateOne(updatePokemonDto)
      
      return { ...pokemon.toJSON(),  ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error)
    }
    
  }

  async remove(id: string) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne( { _id: id } );
    if ( deletedCount === 0 ) {
      throw new BadRequestException(`Pokemon ${id} not found`)
    }
    return;
  }

  private handleExceptions (error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in DB ${JSON.stringify(error.keyValue)}`)
    } else {
      console.log(error);
      throw new InternalServerErrorException(`Cant create Pokemons - Check server logs`)
    }
  }
}
