import { ReactElement, useState } from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { useInput } from 'react-admin';

interface TagInputProps {
  source: string;
  label?: string;
}

export const TagInput = (props: TagInputProps): ReactElement => {
  const { field } = useInput(props);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault();
      const newTag = inputValue.trim();
      const currentTags = Array.isArray(field.value) ? field.value : [];
      if (!currentTags.includes(newTag)) {
        field.onChange([...currentTags, newTag]);
      }
      setInputValue('');
    }
  };

  return (
    <Autocomplete
      {...field}
      multiple
      freeSolo
      value={Array.isArray(field.value) ? field.value : []}
      inputValue={inputValue}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      onChange={(_, newValue) => field.onChange(newValue)}
      options={[]}
      renderTags={(tags: string[], getTagProps) =>
        tags.map((tag, index) => (
          <Chip
            {...getTagProps({ index })}
            key={tag}
            label={tag}
            size="small"
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label || '标签'}
          onKeyDown={handleKeyDown}
          placeholder="输入标签后按回车"
          fullWidth
        />
      )}
    />
  );
}; 