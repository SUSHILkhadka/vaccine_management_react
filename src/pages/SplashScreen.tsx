import { Spin } from 'antd';
import React from 'react';
import '../styles/Page.scss'
const SplashScreen: React.FC = () => {
  return (
    <div className='page--splash'>
      <Spin size='large' />
    </div>
  );
};
export default SplashScreen;
