import React from 'react';
import Flexbox from 'flexbox-react';

export const mainLayout = ({nav, content}) => (
  <div>
    <main>
      <Flexbox flexDirection="row" alignItems="center">
        <Flexbox>
        </Flexbox>
        <Flexbox className="app">
          <Flexbox className="appHeader">
            {nav}
            {content}
          </Flexbox>
        </Flexbox>
        <Flexbox>
        </Flexbox>
      </Flexbox>
    </main>
  </div>
)
