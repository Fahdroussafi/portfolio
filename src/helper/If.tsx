import React, { JSX } from 'react';

export const If = (props: { children: JSX.Element | JSX.Element[] | React.ReactNode; condition?: boolean | null }) => {
  if (props.condition) {
    return <>{props.children}</>;
  }

  return null;
};
