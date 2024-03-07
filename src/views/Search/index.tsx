import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters, clearCharacters } from '../../redux/actions';
import { Character } from '../../types/types';
import { AppDispatch, RootState } from '../../redux/store';
import './index.css';
import ErrorText from '../../components/ErrorText';
import SearchInput from '../../components/SearchInput';
import CharacterItem from '../../components/CharacterItem';

function Search() {
  const [input, setInput] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [focusedCharacterIndex, setFocusedCharacterIndex] = useState(0);
  const characters = useSelector((state: RootState) => state.characters);
  const error = useSelector((state: RootState) => state.error);
  const dispatch: AppDispatch = useDispatch();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (input.trim() === '') {
      dispatch(clearCharacters());
    } else {
      dispatch(fetchCharacters(input));
    }
    setFocusedCharacterIndex(0);
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

  return (
    <div className='search-container'>
      <SearchInput
        input={input}
        selectedCharacters={selectedCharacters}
        handleSelectCharacter={handleSelectCharacter}
        setInput={setInput}
        handleKeyDown={handleKeyDown}
      />
      {error ? (
        <ErrorText errorText={error} />
      ) : characters.length > 0 && (
        <div ref={listRef} className='character-list'>
          {characters.map((character: Character, index: number) => (
            <CharacterItem
              character={character}
              selectedCharacters={selectedCharacters}
              handleSelectCharacter={handleSelectCharacter}
              isFocused={index === focusedCharacterIndex}
              input={input}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;