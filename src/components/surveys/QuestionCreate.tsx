import React, { useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  required,
} from "react-admin";
import { 
  Button, 
  Box, 
  TextField, 
  IconButton 
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const questionTypes = [
  { id: 'single', name: '单选' },
  { id: 'multiple', name: '多选' },
  { id: 'text', name: '文本' },
];

export const QuestionCreate = () => {
  const [options, setOptions] = useState([{ content: '' }]);

  const handleAddOption = () => {
    setOptions([...options, { content: '' }]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].content = value;
    setOptions(newOptions);
  };

  const transform = (data: any) => ({
    ...data,
    options: data.type !== 'text' ? options : [],
  });

  return (
    <Create transform={transform}>
      <SimpleForm>
        <TextInput 
          source="title" 
          validate={[required()]} 
          label="问题标题" 
          fullWidth 
        />
        <SelectInput 
          source="type" 
          choices={questionTypes} 
          validate={[required()]} 
          label="问题类型" 
        />
        <BooleanInput 
          source="is_required" 
          label="是否必填" 
        />
        <TextInput 
          source="sort_order" 
          label="排序" 
          type="number" 
        />

        {/* 动态添加选项 */}
        <Box>
          {options.map((option, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <TextField
                label={`选项 ${index + 1}`}
                value={option.content}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mr: 2 }}
              />
              <IconButton onClick={() => handleRemoveOption(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Button 
          startIcon={<AddIcon />} 
          onClick={handleAddOption}
          variant="outlined"
        >
          添加选项
        </Button>
      </SimpleForm>
    </Create>
  );
}; 