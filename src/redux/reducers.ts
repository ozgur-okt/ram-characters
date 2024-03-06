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
  switch (action.type) {
    case SET_CHARACTERS:
      return { ...state, characters: action.payload, isLoading: false };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};