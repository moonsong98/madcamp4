import React, { useState, useEffect } from 'react';
import { Modal } from '@material-ui/core';
import DaumPostCode from 'react-daum-postcode';

function AddressSearch() {
	const [open, setOpen] = useState(false);
	const [fullAddress, setFullAddress] = useState('');
	const [zoneCode, setZoneCode] = useState('');
	const [leftAddress, setLeftAddress] = useState('');
	// DaumPostCode style
	const width = 500;
	const height = 772;
	const modalStyle = {
		position: 'absolute',
		top: '10%',
		left: '35%',
		zIndex: '100',
		border: '1px solid #000000',
		overflow: 'hidden',
	};

	const onCompleteHandler = (data: any) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}
		setZoneCode(data.zonecode);
		setFullAddress(fullAddress);
		setOpen(false);
	};

	return (
		<div className="modalRow">
			<div className="modalCell">
				<div className="cellFirst">
					<div className="zipCode">{zoneCode}</div>
					<button
						type="button"
						onClick={() => {
							setOpen(true);
						}}
					>
						<span>우편번호 찾기</span>
					</button>
				</div>
				<Modal open={open} onClose={() => setOpen(false)}>
					<DaumPostCode onComplete={onCompleteHandler} autoClose width={width} height={height} style={modalStyle} />
				</Modal>
				<div className="address">{fullAddress}</div>
				<div className="addressBox">
					<input
						type="text"
						value={leftAddress}
						name="address"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLeftAddress(event.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}

export default AddressSearch;
