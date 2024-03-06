// actions.ts
import axios from 'axios';
import { SET_CHARACTERS } from './actionTypes';
import { Character } from '../types/types'; // assuming you've defined the Character type in a types.ts file
import { Dispatch } from 'redux';


interface IActions {
  SET_CHARACTERS: string
  FETCH_CHARACTERS: string
}

type setCharactersAction = {
  type: IActions['SET_CHARACTERS']
  payload: Character[]
}

export type fetchCharactersAction = {
  type: IActions['FETCH_CHARACTERS']
  payload: string
}

export const fetchCharacters = (input: string) => {
  return (dispatch: Dispatch<setCharactersAction>) => {
    axios.get(`https://rickandmortyapi.com/api/character/?name=${input}`)
      .then(res => {
        dispatch(setCharacters(res.data.results));
      })
      .catch(err => console.error(err));
  };
};

export const setCharacters = (characters: Character[]) => ({
  type: SET_CHARACTERS,
  payload: characters,
});