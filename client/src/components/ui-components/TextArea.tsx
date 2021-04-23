import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  classes?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ classes, ...props }) => {
  return (
    <textarea
      data-testid="textarea-component"
      className={`block w-full borderpy-1 px-3 ${classes}`.trim()}
      {...props}
    ></textarea>
  );
};

export default TextArea;
