import { useInput, InputProps } from "react-admin";
import MarkdownEditor from "./MarkdownEditor";

export const MarkdownInput = (props: InputProps) => {
  const { field } = useInput(props);

  return (
    <MarkdownEditor
      id={`${props.source}-input`}
      value={field.value}
      onChange={field.onChange}
    />
  );
};
