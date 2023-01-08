import { render, screen, fireEvent } from '@testing-library/react';
import Draggable from '.';

test('renders draggable div box', async () => {
	render(
		<Draggable>
			<div style={{ widows: '100px', height: '100px' }}>box</div>
		</Draggable>
	);

	let component = screen.getByTestId('draggable-component');

	await drag(component, {
		delta: { x: 0, y: 0 },
	});

	expect({
		x: component.getBoundingClientRect().x,
		y: component.getBoundingClientRect().y,
	}).toEqual({ x: 0, y: 0 });
});

const sleep = (ms) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export default async function drag(
	element,
	{ delta, steps = 20, duration = 500 }
) {
	const from = element.getBoundingClientRect();
	const to = delta
		? {
				x: from.x + delta.x,
				y: from.y + delta.y,
		  }
		: element.getBoundingClientRect();

	const step = {
		x: (to.x - from.x) / steps,
		y: (to.y - from.y) / steps,
	};

	const current = {
		clientX: from.x,
		clientY: from.y,
	};

	fireEvent.mouseEnter(element, current);
	fireEvent.mouseOver(element, current);
	fireEvent.mouseMove(element, current);
	fireEvent.mouseDown(element, current);
	for (let i = 0; i < steps; i++) {
		current.clientX += step.x;
		current.clientY += step.y;
		await sleep(duration / steps);
		fireEvent.mouseMove(element, current);
	}
	fireEvent.mouseUp(element, current);
}
