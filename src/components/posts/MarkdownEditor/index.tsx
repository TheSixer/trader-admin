import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import MarkdownPreview from './MarkdownPreview';
import 'react-markdown-editor-lite/lib/index.css';
import './index.css';

MdEditor.unuse(Plugins.Clear);
MdEditor.unuse(Plugins.FontUnderline);

interface IMarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLen?: number;
  id?: string;
}

export default function MarkdownEditor({ value, onChange, maxLen, id }: IMarkdownEditorProps) {
  const handleEditorChange: MdEditor['props']['onChange'] = ({ text }) => {
    onChange?.(text.slice(0, maxLen));
  };

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(localStorage.getItem('token'));

    fetch(`${import.meta.env.VITE_API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('上传失败');
        }
        return response.json();
      })
      .then(data => {
        callback(data.url);
      })
      .catch(error => {
        console.error('图片上传错误:', error);
        callback('');
      });
  };

  return (
    <MdEditor
      className="markdown-editor"
      placeholder="请输入文章内容"
      view={{
        menu: true,
        md: true,
        html: false,
      }}
      renderHTML={(text) => <MarkdownPreview text={text} />}
      value={value}
      onChange={handleEditorChange}
      onImageUpload={handleImageUpload}
      id={id}
    />
  );
}

export { MarkdownPreview };
