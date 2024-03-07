import axios from 'axios';

export const getCharacters = (input: string) => {
  return axios.get(`https://rickandmortyapi.com/api/character/?name=${input}`);
};