import React, { useState } from 'react';
import { css } from '@emotion/css';
import { Button } from '@material-ui/core';
import { Titlebar } from './components/Titlebar';

const { ElectronAPI } = window;

export const App: React.FC = () => {
	const [imagePaths, setImagePaths] = useState<string[]>();

	const onClickImageSelectButton = async () => {
		const files = await ElectronAPI.showFileSelector();
		setImagePaths(files);
	};

	return (
		<div className={sContainer}>
			<Titlebar />
			<div className={sContentsContainer} onContextMenu={() => console.log('onContextMenu')}>
				<Button color="secondary" variant="outlined" onClick={onClickImageSelectButton}>
					Image Select
				</Button>
				<br />
				{imagePaths && imagePaths.map((imagePath, i) => <img key={i} src={imagePath} alt="" />)}
			</div>
		</div>
	);
};

const sContainer = css`
	/* position: relative; */
`;

const sContentsContainer = css`
	position: absolute;
	top: 30px;
	width: 100%;
	height: calc(100vh - 30px);
	overflow: auto;
	background-color: rgba(30, 30, 30, 0.5);
	/* border: 2px solid red; */
`;
