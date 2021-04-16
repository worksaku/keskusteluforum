import React from 'react';

const Button: React.FC<any> = ({ text, classes, ...rest }) => {
  return (
    <button
      className={`bg-red-400 px-2 py-1 uppercase text-sm rounded text-white hover:bg-red-600 transition ${classes}`.trim()}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
