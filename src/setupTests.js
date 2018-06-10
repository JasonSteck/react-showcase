import React from 'react';
import Page from './spec/Page.jsx'
import TestWrapper from './spec/TestWrapper.js'
import App from './App';

global.page = new Page(<App />);

TestWrapper(global.page);
