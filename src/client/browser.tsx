import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './components/app';
import { containerId } from '../shared/constants';

declare global {
    interface Window { __APP_CONTEXT__: AppContext }
}

const context = window.__APP_CONTEXT__

const app = <App {...context.initialState}/>;
const el = document.getElementById(containerId);
hydrate(app, el);
