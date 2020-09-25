import React, { useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

interface AppProps {
  isLoggedIn?: null;
}

const App: React.FC<AppProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(authService.currentUser);
  return <AppRouter isLoggedIn={isLoggedIn} />;
};

export default App;
