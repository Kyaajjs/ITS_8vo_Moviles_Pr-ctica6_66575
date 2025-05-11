import axios from 'axios';

class PokeapiService {
  private apiUrl = 'https://pokeapi.co/api/v2/';

  getPokemon(pokemonName: string) {
    return axios.get(`${this.apiUrl}pokemon/${pokemonName}`);
  }
}

export default new PokeapiService();
