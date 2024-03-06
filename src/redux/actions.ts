// actions.ts
import axios from 'axios';
import { Dispatch } from 'redux';
import { Character } from '../types/types';
import { FETCH_CHARACTERS, SET_CHARACTERS, SET_ERROR, SET_LOADING } from './actionTypes';

interface IActions {
  SET_CHARACTERS: typeof SET_CHARACTERS,
  SET_LOADING: typeof SET_LOADING,
  SET_ERROR: typeof SET_ERROR,
  FETCH_CHARACTERS: typeof FETCH_CHARACTERS,
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

export type ActionTypes = setCharactersAction | setLoadingAction | setErrorAction | fetchCharactersAction;

export const fetchCharacters = (input: string) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios.get(`https://rickandmortyapi.com/api/character/?name=${input}`)
      .then(res => {
        dispatch({ type: SET_CHARACTERS, payload: res.data.results });
        dispatch({ type: SET_LOADING, payload: false });
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