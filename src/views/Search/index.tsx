import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters, clearCharacters } from '../../redux/actions';
import { Character } from '../../types/types';
import { AppDispatch, RootState } from '../../redux/store';
import './index.css';
import { Autocomplete, Box, Checkbox, CircularProgress, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Divider } from '@material-ui/core';

function Search() {
  const [input, setInput] = useState('');
  const characters = useSelector((state: RootState) => state.characters);
  const loading = useSelector((state: RootState) => state.isLoading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (input.trim() === '') {
      dispatch(clearCharacters());
    } else {
      dispatch(fetchCharacters(input));
    }
  }, [input, dispatch]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Box className='search-container'>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={characters}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => {
          const matchIndex = option.name.toLowerCase().indexOf(input.toLowerCase());
          const beforeMatch = option.name.slice(0, matchIndex);
          const match = option.name.slice(matchIndex, matchIndex + input.length);
          const afterMatch = option.name.slice(matchIndex + input.length);
          const episodeCount = option.episode.length;

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
                  <Box>{` ${episodeCount} episodes`}</Box>
                </Box>
              </li>
              <Divider />
            </>
          );
        }}
        style={{ width: 600 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search characters"
            placeholder="Search characters"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ backgroundColor: "white" }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }} />
        )}
      />
    </Box>
  );
}

export default Search;