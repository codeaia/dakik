import React from 'react';
import Flexbox from 'flexbox-react';

export const authLayout = ({nav, content}) => (
  <div className="fullHeight">
    {nav}
    {content}
  </div>
)
