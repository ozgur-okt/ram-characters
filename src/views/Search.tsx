// Search.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../redux/actions';
import { Character } from '../types/types';
import { AppDispatch, RootState } from '../redux/store';
import { Chip, TextField, Checkbox, Avatar, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, CircularProgress, Typography } from '@material-ui/core';

function Search() {
  const [input, setInput] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const characters = useSelector((state: RootState) => state.characters);
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const error = useSelector((state: RootState) => state.error);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (input) {
      dispatch(fetchCharacters(input));
    }
  }, [input, dispatch]);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacters(prevCharacters => {
      if (prevCharacters.find(c => c.id === character.id)) {
        return prevCharacters.filter(c => c.id !== character.id);
      } else {
        return [...prevCharacters, character];
      }
    });
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
  };

  return (
    <div>
      <TextField 
        type="text" 
        variant='outlined'
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Search characters"
        InputProps={{
          startAdornment: selectedCharacters.map(character => (
            <Chip 
              key={character.id} 
              label={character.name} 
              onDelete={() => handleSelectCharacter(character)} 
            />
          )),
        }}
      />
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">{error}</Typography>
      ) : characters && characters.map((character: Character) => (
        <ListItem key={character.id}>
          <Checkbox 
            checked={!!selectedCharacters.find(c => c.id === character.id)} 
            onChange={() => handleSelectCharacter(character)} 
          />
          <ListItemAvatar>
            <Avatar src={character.image} />
          </ListItemAvatar>
          <ListItemText 
            primary={highlightText(character.name, input)} 
            secondary={`${character.episode.length} episodes`} 
          />
        </ListItem>
      ))}
    </div>
  );
}

export default Search;