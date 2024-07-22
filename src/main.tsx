import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
      <SpeedInsights />
    </Provider>
  );
} else {
  console.error("Root element not found");
}