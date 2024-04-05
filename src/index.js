import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
