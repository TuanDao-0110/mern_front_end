import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './app/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));


// 1 set up store
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

