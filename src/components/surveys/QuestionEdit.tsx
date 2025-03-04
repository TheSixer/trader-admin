import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  required,
  useGetOne,
} from "react-admin";
import { 
  Button, 
  Box, 
  TextField, 
  IconButton,
  CircularProgress 
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const questionTypes = [
  { id: 'single', name: '单选' },
  { id: 'multiple', name: '多选' },
  { id: 'text', name: '文本' },
];

const QuestionEditForm = () => {
  const { id } = useParams();
  const { data: record, isLoading } = useGetOne('survey/questions', { id });
  const [options, setOptions] = useState<{ id?: number; content: string }[]>([]);
  const [currentType, setCurrentType] = useState<string>('');

  // 初始化选项和类型
  useEffect(() => {
    if (record) {
      setCurrentType(record.type || 'single');
      setOptions(record.options || []);
    }
  }, [record]);

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

  const handleTypeChange = (type: string) => {
    setCurrentType(type);
    // 如果切换到文本类型，清空选项
    if (type === 'text') {
      setOptions([]);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
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
        onChange={(e) => handleTypeChange(e.target.value)}
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
      {['single', 'multiple'].includes(currentType) && (
        <Box>
          {options.map((option, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <TextField
                label={`选项 ${index + 1}`}
                value={option.content || ''}
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
          <Button 
            startIcon={<AddIcon />} 
            onClick={handleAddOption}
            variant="outlined"
          >
            添加选项
          </Button>
        </Box>
      )}
    </SimpleForm>
  );
};

export const QuestionEdit = () => (
  <Edit transform={(data) => data}>
    <QuestionEditForm />
  </Edit>
); 