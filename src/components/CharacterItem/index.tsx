import React from 'react';
import { Checkbox, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Divider } from '@material-ui/core';
import { Character } from '../../types/types';
import HighlightText from '../HighlightText';
import './index.css';

interface CharacterItemProps {
  character: Character;
  selectedCharacters: Character[];
  handleSelectCharacter: (character: Character) => void;
  isFocused: boolean;
  input: string;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ character, selectedCharacters, handleSelectCharacter, isFocused, input }) => {
  return (
    <Box>
      <ListItem
        key={character.id}
        selected={isFocused}
      >
        <Checkbox
          checked={!!selectedCharacters.find(c => c.id === character.id)}
          onChange={() => handleSelectCharacter(character)}
          style={!!selectedCharacters.find(c => c.id === character.id) ? { color: '#1876d1' } : {}}
        />
        <ListItemAvatar>
          <Avatar className='avatar' src={character.image} />
        </ListItemAvatar>
        <ListItemText
          primary={<HighlightText text={character.name} highlight={input} />}
          secondary={`${character.episode.length} episodes`}
        />
      </ListItem>
      <Divider />
    </Box>
  );
};

export default CharacterItem;