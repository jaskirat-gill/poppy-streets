import React from 'react';
import './index.css';
import App from './routes/App';
import City from './routes/City';
import Street from './routes/Street';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom';

// Sets all paths for application
const router = (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/:city" element={<City />} />
    <Route path="/:city/:street" element={<Street />} />
  </Routes>
);

ReactDOM.render(
  <BrowserRouter>
    {router}
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
