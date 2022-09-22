import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './CNavlink.scss';

const CNavlink = (props: any) => {
  const remainingProps = { ...props };
  delete remainingProps.Icon;
  return (
    <Link className='tab' to={props.to}>
      <div className='icon'>
        {<props.Icon classname='icon'/>}
      </div>
      <Link className='navlink' {...remainingProps} />
    </Link>
  );
};
export default CNavlink;
