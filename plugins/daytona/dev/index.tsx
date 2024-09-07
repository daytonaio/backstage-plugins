import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { daytonaPlugin, DaytonaPage } from '../src/plugin';

createDevApp()
  .registerPlugin(daytonaPlugin)
  .addPage({
    element: <DaytonaPage />,
    title: 'Root Page',
    path: '/daytona',
  })
  .render();
