import {
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  FunctionField,
  useRecordContext,
  DeleteButton,
  usePermissions
} from "react-admin";
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

// 下载报告按钮组件 - 使用 useRecordContext 替代 props 传值
const DownloadReportButton = () => {
  const record = useRecordContext();
  
  if (!record) return null;
  
  const handleDownload = () => {
    // 创建下载链接
    const downloadUrl = `${import.meta.env.VITE_API_URL}/survey/reports/${record.id}/download`;
    
    // 添加身份验证令牌
    const token = localStorage.getItem('token');
    
    // 使用 fetch API 获取文件
    fetch(downloadUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`下载失败: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
      // 创建临时 URL
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${record.report_name}.pdf`);
      document.body.appendChild(link);
      link.click();
      // 清理
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
      startIcon={<DownloadIcon />}
      size="small"
    >
      下载
    </Button>
  );
};

export const ReportList = () => {
  const { permissions } = usePermissions();
  const isAdmin = permissions === 'admin';
  
  return (
    <List>
      <Datagrid rowClick="show">
        <TextField source="report_name" label="报告名称" />
        <FunctionField 
          label="报告摘要" 
          render={record => record.report_summary 
            ? (record.report_summary.length > 50 
              ? `${record.report_summary.substring(0, 50)}...` 
              : record.report_summary)
            : '无摘要'
          } 
        />
        <DateField source="created_at" label="生成时间" showTime />
        <DownloadReportButton />
        <ShowButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}; 