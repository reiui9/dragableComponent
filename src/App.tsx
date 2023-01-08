import React from 'react';
import Box from './components/Box';
import Draggable from './components/Draggable';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Draggable>
				<Box />
			</Draggable>
		</div>
	);
}

export default App;
