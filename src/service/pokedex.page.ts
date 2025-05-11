import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-pokedex',
  templateUrl: 'pokedex.page.html',
  styleUrls: ['pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  pokemonData: any;

  constructor(private pokeapiService: PokeapiService) { }

  ngOnInit() {
    this.getPokemonData('pikachu');  // Por ejemplo, cargar datos de Pikachu
  }

  getPokemonData(pokemonName: string) {
    this.pokeapiService.getPokemon(pokemonName)
      .then(response => {
        this.pokemonData = response.data;
        console.log(this.pokemonData); // Imprime los datos del Pokémon en la consola
      })
      .catch(error => {
        console.error('Error al obtener los datos del Pokémon:', error);
      });
  }
}
