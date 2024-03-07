import React from 'react';
import { Checkbox, Box, Divider, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Character } from '../../types/types';

interface CharacterOptionProps {
  props: any;
  option: Character;
  selected: boolean;
  input: string;
}

const CharacterOption: React.FC<CharacterOptionProps> = ({ props, option, selected, input }) => {
  const matchIndex = option.name.toLowerCase().indexOf(input.toLowerCase());
  const beforeMatch = option.name.slice(0, matchIndex);
  const match = option.name.slice(matchIndex, matchIndex + input.length);
  const afterMatch = option.name.slice(matchIndex + input.length);
  const episodeCount = option.episode.length;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <>
      <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        <img src={option.image} alt={option.name} style={{ marginRight: 8, height: '40px' }} />
        <Box>
          <Box>
            {beforeMatch}
            <b>{match}</b>
            {afterMatch}
          </Box>
          <Typography>{`${episodeCount} episodes`}</Typography>
        </Box>
      </li>
      <Divider />
    </>
  );
}

export default CharacterOption;