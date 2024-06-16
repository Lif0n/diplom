import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import Services from './services';
import config from './config';
import { ServicesContext } from './context';

const services = new Services(config);

const root = createRoot(document.getElementById('root'));

const now = new Date();
localStorage.setItem('currentYear', now.getFullYear());
localStorage.setItem('currentSemester', ((now.getMonth()+1) > 8 ? 1 : 2))

// Первый рендер приложения
root.render(
  <Provider store={services.redux}>
    <ServicesContext.Provider value={services}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServicesContext.Provider>
  </Provider>

);
