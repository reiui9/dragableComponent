import React from 'react';
import './box.css';

const Box = () => {
	return <div className='box' data-testid='box'></div>;
};

export default React.memo(Box);
