import React from 'react';

export const homeLayout = ({nav, counter, taskFrame, actionsMenu, tagListButton}) => (
  <div>
    <header>

    </header>
    <main>
      {nav}
      {tagListButton}
      {actionsMenu}
      {content}
      {taskFrame}
    </main>
  </div>
)
