import './index.css';
import { Provider } from 'jotai';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={null}>
			<Provider>
				<App />
			</Provider>
		</Suspense>
	</React.StrictMode>,
	document.getElementById('root')
);
