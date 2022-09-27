import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CNavlink.scss';

const CNavlink = (props: any) => {
  const remainingProps = { ...props };
  delete remainingProps.Icon;
  return (
    <NavLink className='tab' {...remainingProps}>
      <div className='tab--icon'>{<props.Icon className='icon' />}</div>
     <div className='tab--name'> {props.children}</div>
    </NavLink>
  );
};
export default CNavlink;
