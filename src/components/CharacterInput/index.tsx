import React from 'react';
import { TextField, CircularProgress } from '@mui/material';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import './index.css';

interface CharacterInputProps {
  params: any;
  input: string;
  setInput: (input: string) => void;
}

const CharacterInput: React.FC<CharacterInputProps> = ({ params, input, setInput }) => {
  const loading = useSelector((state: RootState) => state.isLoading);
  return (
    <TextField
      {...params}
      label="Search characters"
      placeholder="Search characters"
      value={input}
      onChange={e => setInput(e.target.value)}
      className='text-field'
      InputProps={{
        ...params.InputProps,
        className: 'input',
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );
}

export default CharacterInput;