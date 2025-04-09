import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import store from './redux/store'; // Import store đã tạo
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Bọc ứng dụng trong Provider */}
      <App />
    </Provider>
  </StrictMode>
);

