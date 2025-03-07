import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  useRecordContext,
  Button,
  TopToolbar,
  FieldProps,
  useShowController,
  Loading,
  Error,
} from "react-admin";
import { Typography, Paper } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

// 显示报告摘要的自定义字段
const ReportSummaryField = (props: FieldProps) => {
  const record = useRecordContext();
  
  if (!record || !record.report_summary) return null;
  
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {record.report_summary}
      </Typography>
    </Paper>
  );
};

// 下载按钮
const DownloadButton = () => {
  const record = useRecordContext();
  
  if (!record) return null;
  
  const handleDownload = () => {
    const downloadUrl = `${import.meta.env.VITE_API_URL}/survey/reports/${record.id}/download`;
    const token = localStorage.getItem('token');
    
    fetch(downloadUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw Error(`下载失败: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${record.report_name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('下载报告时出错:', error);
      alert(`下载失败: ${error.message}`);
    });
  };
  
  return (
    <Button 
      onClick={handleDownload} 
      label="下载报告"
      startIcon={<DownloadIcon />}
    />
  );
};

// 顶部工具栏
const ReportShowActions = () => (
  <TopToolbar>
    <DownloadButton />
  </TopToolbar>
);

// 使用 useShowController 获取更多控制
const ReportShowContent = () => {
  const { record, isLoading, error } = useShowController();
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!record) return null;
  
  return (
    <SimpleShowLayout>
      <TextField source="report_name" label="报告名称" />
      <DateField source="created_at" label="生成时间" showTime />
      <Typography variant="h6" sx={{ mt: 2 }}>报告摘要</Typography>
      <ReportSummaryField source="report_summary" />
    </SimpleShowLayout>
  );
};

export const ReportShow = () => (
  <Show actions={<ReportShowActions />}>
    <ReportShowContent />
  </Show>
); 