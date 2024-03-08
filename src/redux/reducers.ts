import { SET_CHARACTERS, SET_LOADING, SET_ERROR } from './actionTypes';
import { Character } from '../types/types';
import { ActionTypes } from './actions';

interface IInitialState {
  characters: Character[],
  isLoading: boolean,
  error: string | null,
}

const initialState: IInitialState = {
  characters: [] as Character[],
  isLoading: false,
  error: null,
};

export const rootReducer = (state = initialState, action: ActionTypes) => {
  let uniqueCharacters;
  switch (action.type) {
  case SET_CHARACTERS:
    uniqueCharacters = action.payload.filter(
      (char: Character) => !state.characters.some((stateChar: Character) => stateChar.id === char.id)
    );
    return { ...state, characters: [...state.characters, ...uniqueCharacters], isLoading: false };
  case SET_LOADING:
    return { ...state, isLoading: action.payload };
  case SET_ERROR:
    return { ...state, error: action.payload, isLoading: false };
  default:
    return state;
  }
};