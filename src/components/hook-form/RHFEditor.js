import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
//
import Editor from '../editor';
import {useState} from 'react'

// ----------------------------------------------------------------------

RHFEditor.propTypes = {
  name: PropTypes.string,
};

export default function RHFEditor({ name, ...other }) {
  const [value, setValue] = useState('');

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Editor
      simple
      id="minimal-quill"
      value={value}
      onChange={onChange}
      placeholder="Type a message"
      sx={{
        borderColor: 'transparent',
      }}
    />
  );
}
