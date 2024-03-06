// reducers.ts
import { SET_CHARACTERS } from './actionTypes';
import { Character } from '../types/types';

const initialState = {
  characters: [] as Character[],
};

export const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CHARACTERS:
      return { ...state, characters: action.payload };
    default:
      return state;
  }
};