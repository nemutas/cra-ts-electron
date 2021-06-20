import React from 'react';
import { css, cx } from '@emotion/css';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CropSquareOutlinedIcon from '@material-ui/icons/CropSquareOutlined';
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import MinimizeOutlinedIcon from '@material-ui/icons/MinimizeOutlined';

const { ElectronAPI } = window;

export const Titlebar: React.FC = () => {
	const onClickResized = async () => {
		const isFullScreen = await ElectronAPI.isFullScreen();
		if (isFullScreen) {
			await ElectronAPI.windowRestore();
		} else {
			await ElectronAPI.windowMaximize();
		}
	};

	return (
		<div className={sContainer}>
			<div className={sAppIconContainer}>
				<img className={sAppIcon} src="./logo192.png" alt="" />
			</div>
			<div className={sTitle}>
				<Typography style={{ color: grey[200], fontSize: '15px' }}>Electron App</Typography>
			</div>
			<button className={sButton} onClick={() => ElectronAPI.windowMinimize()}>
				<MinimizeOutlinedIcon style={sButtonIcon} />
			</button>
			<button className={sButton} onClick={onClickResized}>
				{false ? (
					<FilterNoneOutlinedIcon style={sButtonIcon} />
				) : (
					<CropSquareOutlinedIcon style={sButtonIcon} />
				)}
			</button>

			<button className={cx(sButton, sCloseHover)} onClick={() => ElectronAPI.windowClose()}>
				<CloseOutlinedIcon style={sButtonIcon} />
			</button>
		</div>
	);
};

const sButtonIcon = {
	color: grey[200],
	width: '15px'
};

const sContainer = css`
	position: fixed;
	display: flex;
	width: 100%;
	height: 30px;
	background-color: rgb(60, 60, 60);
	z-index: 9999;
	-webkit-app-region: drag;
`;

const sAppIconContainer = css`
	width: 20px; /* titlebarHeight:30px - margin-lr:10px */
	height: auto;
	display: flex;
	justify-items: center;
	align-items: center;
	margin: 5px;
	/* background-color: rgba(215, 21, 38, 0.3); */
`;

const sAppIcon = css`
	width: 100%;
	height: 100%;
`;

const sTitle = css`
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	color: gray;
	/* background-color: rgba(215, 21, 38, 0.3); */
`;

const sButton = css`
	width: 50px;
	height: 100%;
	border: none;
	background-color: transparent;
	color: gray;
	-webkit-app-region: no-drag;
	:hover {
		background-color: rgb(80, 80, 80);
	}
`;

const sCloseHover = css`
	:hover {
		background-color: rgb(215, 21, 38);
	}
`;
