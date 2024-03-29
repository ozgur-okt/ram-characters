import React from 'react';
import { TextField, CircularProgress, AutocompleteRenderInputParams } from '@mui/material';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import './index.css';

interface CharacterInputProps {
  params: AutocompleteRenderInputParams;
  input: string;
  setInput: (input: string) => void;
}

const CharacterInput: React.FC<CharacterInputProps> = ({ params, input, setInput }) => {
  const loading = useSelector((state: RootState) => state.isLoading);
  return (
    <TextField
      {...params}
      placeholder="Search characters"
      value={input}
      onChange={e => setInput(e.target.value)}
      className='text-field'
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );
};

export default CharacterInput;