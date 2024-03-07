import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters, clearCharacters } from '../../redux/actions';
import { AppDispatch, RootState } from '../../redux/store';
import './index.css';
import { Autocomplete, Box } from '@mui/material';
import CharacterOption from '../../components/CharacterOption';
import CharacterInput from '../../components/CharacterInput';

function Search() {
  const [input, setInput] = useState('');
  const characters = useSelector((state: RootState) => state.characters);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (input.trim() === '') {
      dispatch(clearCharacters());
    } else {
      dispatch(fetchCharacters(input));
    }
  }, [input, dispatch]);

  const clearInputAndCharacters = () => {
    setInput('');
    dispatch(clearCharacters());
  };

  return (
    <Box className='search-container'>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={characters}
        disableCloseOnSelect
        onClose={() => clearInputAndCharacters()}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <CharacterOption props={props} option={option} selected={selected} input={input} key={option.id} />
        )}
        className='autocomplete'
        renderInput={(params) => (
          <CharacterInput params={params} input={input} setInput={setInput} />
        )}
        PaperComponent={({ children }) => (
          <Box className='paper'>
            {children}
          </Box>
        )}
        ChipProps={{ className: 'chip' }}
      />
    </Box>
  );
}

export default Search;