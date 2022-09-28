import { Link } from 'react-router-dom';
import '../styles/Page.scss';

const NotFoundScreen = () => {
  return (
    <div className='page--splash'>
      <div style={{ margin: '1rem' }}>404: Page not found </div>
      <Link to='/'>Go to Home</Link>
    </div>
  );
};
export default NotFoundScreen;
