// Search.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../redux/actions';
import { Character } from '../types/types';
import { Dispatch } from 'redux';

function Search() {
  const [input, setInput] = useState('');
  const characters = useSelector((state: { characters: Character[] }) => state.characters);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (input) {
      dispatch(fetchCharacters(input));
    }
  }, [input, dispatch]);

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Search characters"
      />
      {characters && characters.map((character: Character) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  );
}

export default Search;