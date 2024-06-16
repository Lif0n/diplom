import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Spin } from 'antd';

function Spinner({active, children}) {
  if (active) {
    return <div className='Spinner'><Spin size='large' style={{margin: 'auto'}}/></div>
  } else {
    return children;
  }
}

Spinner.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

Spinner.defaultProps = {}

export default memo(Spinner);
