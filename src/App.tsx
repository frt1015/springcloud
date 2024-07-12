import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { getBaseUrl } from './apis/api';
import "./App-less.css";
import router from './router';

function App() {

  useEffect(() => {
    getBaseUrl();
  }, []);

  return useRoutes(router)
}

export default App;
