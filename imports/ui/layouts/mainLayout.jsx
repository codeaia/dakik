import React from 'react';
import Flexbox from 'flexbox-react';

export const mainLayout = ({nav, content}) => (
    <Flexbox className="appHeader">
      {nav}
      {content}
    </Flexbox>
)
