import { useInput, InputProps } from "react-admin";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CloudUpload as UploadIcon } from '@mui/icons-material';

export const CoverImageInput = (props: InputProps) => {
  const { field } = useInput(props);
  const [previewUrl, setPreviewUrl] = useState(field.value);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const data = await response.json();
      field.onChange(data.url);
      setPreviewUrl(data.url);
    } catch (error) {
      console.error('图片上传错误:', error);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="cover-image-upload"
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="cover-image-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<UploadIcon />}
          sx={{ mb: 2 }}
        >
          上传封面图片
        </Button>
      </label>
      {previewUrl && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            预览:
          </Typography>
          <img 
            src={previewUrl} 
            alt="封面预览" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '200px', 
              objectFit: 'cover',
              borderRadius: '4px'
            }} 
          />
        </Box>
      )}
    </Box>
  );
}; 