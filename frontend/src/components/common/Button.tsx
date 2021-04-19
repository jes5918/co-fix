import React from 'react';

interface Props {
  children: any;
}

function Button(props: Props) {
  const { children } = props;

  return <button>{children}</button>;
}

export default Button;
