import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, classes, ...rest }) => {
  return (
    <button
      data-testid="button-component"
      className={`bg-red-400 px-2 py-1 uppercase text-sm rounded text-white hover:bg-red-600 transition ${classes}`.trim()}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
