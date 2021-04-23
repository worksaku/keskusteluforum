import { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  classes?: string;
}

const TextField: React.FC<TextFieldProps> = ({ classes, ...props }) => {
  return (
    <input
      data-testid="textfield-component"
      className={`border px-2 py-3 rounded ${classes}`.trim()}
      {...props}
    />
  );
};

export default TextField;
