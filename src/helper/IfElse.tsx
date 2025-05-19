import { JSX } from 'react';

export const IfElse = (props: { children: [JSX.Element, JSX.Element]; condition?: boolean | null }) => {
  if (props.condition) {
    return props.children[0];
  }

  return props.children[1];
};
