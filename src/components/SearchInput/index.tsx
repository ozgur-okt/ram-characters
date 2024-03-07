// SearchInput.tsx
import React from 'react';
import { TextField, CircularProgress, Chip } from '@material-ui/core';
import { Character } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './index.css';

interface SearchInputProps {
  input: string;
  selectedCharacters: Character[];
  handleSelectCharacter: (character: Character) => void;
  setInput: (input: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ input, selectedCharacters, handleSelectCharacter, setInput, handleKeyDown }) => {
  const isLoading = useSelector((state: RootState) => state.isLoading);
  return (
    <TextField
      type="text"
      variant='outlined'
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search characters..."
      InputProps={{
        className:'search-input',
        startAdornment: selectedCharacters.map(character => (
          <Chip
            key={character.id}
            label={character.name}
            onDelete={() => handleSelectCharacter(character)}
            className='chip'
          />
        )),
        endAdornment: isLoading && <CircularProgress color="inherit" size={30} />,
      }}
    />
  );
};

export default SearchInput;