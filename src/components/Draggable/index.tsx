import React, { ReactNode, DragEvent, useState } from 'react';
import './draggable.css';

interface DraggableProps {
	children: ReactNode;
}

const Draggable = ({ children }: DraggableProps) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
		const img = new Image();
		e.dataTransfer.setDragImage(img, 0, 0);
		setPosition({ x: e.clientX, y: e.clientY });
	};

	const dragHandler = (e: DragEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		target.style.left = `${position.x}px`;
		target.style.top = `${position.y}px`;
		setPosition({
			x: e.clientX,
			y: e.clientY,
		});
	};

	return (
		<div className='draggable-container'>
			<div
				className='draggable-component'
				data-testid='draggable-component'
				draggable='true'
				onDragStart={dragStartHandler}
				onDrag={dragHandler}
			>
				{children}
			</div>
		</div>
	);
};

export default React.memo(Draggable);
