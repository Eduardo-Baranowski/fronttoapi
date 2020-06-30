import React from 'react';
import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
