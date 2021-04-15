import React from 'react';

const Button: React.FC<any> = ({ text, classes, ...rest }) => {
  return (
    <button
      className={`bg-blue-400 px-2 py-1 uppercase text-sm rounded text-white ${classes}`.trim()}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
