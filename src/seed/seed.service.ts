import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import axios, {AxiosInstance} from 'axios';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';




@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter
  ){}


  async executeSeed(){

    await this.pokemonModel.deleteMany({}); // delete * from pokemons;
    
    //console.log(fetch); versio de 18  arriba
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    //Insersionces 1 opcion
    const pokemonToInsert: { name:string, no:number }[] = [];
    
    data.results.forEach(({ name, url }) =>{

      //console.log({name,url});
      const segment = url.split('/');
      //console.log(segment);
      const no  = +segment[segment.length - 2];
      //const pokemon = await this.pokemonModel.create({name, no});
      //console.log({name, no})

      pokemonToInsert.push({ name, no }); //[{ name:bulbasaur, no:1 }]

    });

    await this.pokemonModel.insertMany( pokemonToInsert ); // se reconstruye la base de datos
    //insert into pokemons


    return 'Seed Executed';
    
  }
}
