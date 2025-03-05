import React, { useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  required,
  useGetOne,
  SaveButton,
  Toolbar,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { 
  Button, 
  Box, 
  TextField, 
  IconButton,
  CircularProgress 
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

type Option = {
  id?: number;
  content: string;
}

const questionTypes = [
  { id: 'single', name: '单选' },
  { id: 'multiple', name: '多选' },
  { id: 'text', name: '文本' },
];

// 使用通用 React 类型
const CustomToolbar = (props: { children?: ReactNode }) => (
  <Toolbar {...props}>
    <SaveButton alwaysEnable />
  </Toolbar>
);

const QuestionEditForm = () => {
  const { id } = useParams();
  const { data: record, isLoading } = useGetOne('survey/questions', { id });
  const [options, setOptions] = useState<Option[]>([]);
  const [currentType, setCurrentType] = useState<string>('');
  const [title, setTitle] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  
  const [update] = useUpdate();
  const notify = useNotify();
  const redirect = useRedirect();
  
  // 初始化选项和类型
  useEffect(() => {
    if (record) {
      setCurrentType(record.type || 'single');
      setOptions(record.options || []);
      setTitle(record.title || '');
      setIsRequired(record.is_required || false);
      setSortOrder(record.sort_order || 0);
    }
  }, [record]);

  const handleAddOption = () => {
    setOptions([...options, { content: '' }]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].content = value;
    setOptions(newOptions);
  };

  const handleTypeChange = (event: any) => {
    const type = event.target.value;
    setCurrentType(type);
    if (type === 'text') {
      setOptions([]);
    }
  };
  
  const handleSave = () => {
    // 创建一个干净的选项数组，确保没有循环引用
    const cleanOptions = options.map(option => ({
      ...(option.id ? { id: option.id } : {}),
      content: option.content || '',
    }));
    
    // 创建干净的数据对象
    const updatedData = {
      id: Number(id),
      title: title || '',
      type: currentType || 'text',
      is_required: Boolean(isRequired),
      sort_order: Number(sortOrder) || 0,
      options: currentType !== 'text' ? cleanOptions : [],
    };
    
    // 使用 try-catch 捕获可能的错误
    try {
      update(
        'survey/questions',
        { id, data: updatedData },
        {
          onSuccess: () => {
            notify('问题已更新', { type: 'success' });
            redirect('list', 'survey/questions');
          },
          onError: (error: Error) => {
            notify(`更新失败: ${error.message}`, { type: 'error' });
          },
        }
      );
    } catch (error) {
      console.error('保存问题时出错:', error);
      notify(`更新失败: ${error instanceof Error ? error.message : '未知错误'}`, { type: 'error' });
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <SimpleForm toolbar={<CustomToolbar />} onSubmit={handleSave}>
        <TextInput 
          source="title" 
          validate={[required()]} 
          label="问题标题" 
          fullWidth 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <SelectInput 
          source="type" 
          choices={questionTypes} 
          validate={[required()]} 
          label="问题类型" 
          value={currentType}
          onChange={handleTypeChange}
        />
        <BooleanInput 
          source="is_required" 
          label="是否必填" 
          value={isRequired}
          onChange={(value) => setIsRequired(value)}
        />
        <TextInput 
          source="sort_order" 
          label="排序" 
          type="number" 
          value={sortOrder}
          onChange={(e) => setSortOrder(parseInt(e.target.value))}
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
      
      {/* 添加一个独立的保存按钮，避免使用 SimpleForm 的提交机制 */}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSave}
        >
          保存
        </Button>
      </Box>
    </>
  );
};

export const QuestionEdit = () => (
  <Edit>
    <QuestionEditForm />
  </Edit>
); 