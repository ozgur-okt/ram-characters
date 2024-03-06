// Search.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters, clearCharacters } from '../redux/actions';
import { Character } from '../types/types';
import { AppDispatch, RootState } from '../redux/store';
import { Chip, TextField, Checkbox, Avatar, ListItem, ListItemText, ListItemAvatar, CircularProgress, Typography, Divider, Box } from '@material-ui/core';

function Search() {
  const [input, setInput] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [focusedCharacterIndex, setFocusedCharacterIndex] = useState(0);
  const characters = useSelector((state: RootState) => state.characters);
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const error = useSelector((state: RootState) => state.error);
  const dispatch: AppDispatch = useDispatch();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (input.trim() === '') {
      dispatch(clearCharacters());
    } else {
      dispatch(fetchCharacters(input));
    }
  }, [input, dispatch]);

  useEffect(() => {
    if (characters.length > 0 && listRef.current) {
      const listItem = listRef.current.children[focusedCharacterIndex].firstChild as HTMLElement;
      const listItemRect = listItem.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      const isVisible = listItemRect.top >= listRect.top && listItemRect.bottom <= listRect.bottom;
  
      if (!isVisible) {
        listItem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [characters.length, focusedCharacterIndex]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedCharacterIndex(prevIndex => Math.min(prevIndex + 1, characters.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedCharacterIndex(prevIndex => Math.max(prevIndex - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        handleSelectCharacter(characters[focusedCharacterIndex]);
        break;
      case 'Backspace':
        if (input === '') {
          setSelectedCharacters(prevCharacters => prevCharacters.slice(0, -1));
        }
        break;
      default:
        break;
    }
  };

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
    <Box display="flex" sx={{padding:"10px",border:'1px solid red'}}>
      <TextField
        type="text"
        variant='outlined'
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search characters"
        InputProps={{
          style: { borderRadius: '15px', width: '700px'},
          startAdornment: selectedCharacters.map(character => (
            <Chip
              key={character.id}
              label={character.name}
              onDelete={() => handleSelectCharacter(character)}
              style={{marginRight: '5px'}}
            />
          )),
        }}
      />
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">{error}</Typography>
      ) : characters.length > 0 && (
        <ul ref={listRef} style={{border:"0.5px solid gray", borderRadius:"25px", padding:"0", width:"700px", height:"400px", overflow:"scroll"}}>
          {characters.map((character: Character, index: number) => (
            <Box sx={{borderRadius:'15px'}}>
              <ListItem
                key={character.id}
                selected={index === focusedCharacterIndex}
              >
                <Checkbox
                  checked={!!selectedCharacters.find(c => c.id === character.id)}
                  onChange={() => handleSelectCharacter(character)}
                />
                <ListItemAvatar>
                  <Avatar style={{borderRadius:'10px'}} src={character.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={highlightText(character.name, input)}
                  secondary={`${character.episode.length} episodes`}
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default Search;