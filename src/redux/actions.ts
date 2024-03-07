// actions.ts
import axios from 'axios';
import { Dispatch } from 'redux';
import { Character } from '../types/types';
import { CLEAR_CHARACTERS, FETCH_CHARACTERS, SET_CHARACTERS, SET_ERROR, SET_LOADING } from './actionTypes';

export interface IActions {
  SET_CHARACTERS: typeof SET_CHARACTERS,
  SET_LOADING: typeof SET_LOADING,
  SET_ERROR: typeof SET_ERROR,
  FETCH_CHARACTERS: typeof FETCH_CHARACTERS,
  CLEAR_CHARACTERS: typeof CLEAR_CHARACTERS
}

type setCharactersAction = {
  type: IActions['SET_CHARACTERS'],
  payload: Character[]
}

type setLoadingAction = {
  type: IActions['SET_LOADING'],
  payload: boolean
}

type setErrorAction = {
  type: IActions['SET_ERROR'],
  payload: string | null
}

export type fetchCharactersAction = {
  type: IActions['FETCH_CHARACTERS'],
  payload: string
}

type clearCharactersAction = {
  type: IActions['CLEAR_CHARACTERS']
}

export type ActionTypes = setCharactersAction | setLoadingAction | setErrorAction | fetchCharactersAction | clearCharactersAction;

export const fetchCharacters = (input: string) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios.get(`https://rickandmortyapi.com/api/character/?name=${input}`)
      .then(res => {
        dispatch({ type: SET_CHARACTERS, payload: res.data.results });
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_ERROR, payload: null });
      })
      .catch(err => {
        dispatch({ type: SET_ERROR, payload: err.message });
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
};

export const setCharacters = (characters: Character[]) => ({
  type: SET_CHARACTERS,
  payload: characters,
});

export const clearCharacters = () => ({
  type: CLEAR_CHARACTERS,
});