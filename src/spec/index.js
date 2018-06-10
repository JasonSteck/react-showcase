import React from 'react';
import Page from './Page.jsx'
import App from '../App';
import TestWrapper from './TestWrapper.js'

global.page = new Page(<App />);

TestWrapper(global.page);
