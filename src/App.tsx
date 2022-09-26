import 'antd/dist/antd.css';
import './App.css';
import './styles/Globals.scss'
import { Provider } from 'react-redux';
import AppRoutes from './router/AppRoutes';
import { store } from './redux_toolkit/stores/store';

function App() {
  return (
    <div className='App'>
    <Provider store={store}>
      <AppRoutes />
    </Provider>

    </div>
  );
}

export default App;
