import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { Layout, Button } from 'antd';

import GlobalStyle from './styles/global';

const { Header } = Layout;
const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
