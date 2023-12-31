import React, { useState, useEffect } from 'react';

import "../styles/App.css";

import { useChain, useConnectionStatus, useAddress } from "@thirdweb-dev/react";


const IsConnected = (props) => {
	const [shouldRenderDelayed, setShouldRenderDelayed] = useState(false);
	const [notLoaded, setNotLoaded] = useState(false);
	const [showUserData, setShowUserData] = useState("user-data");
	const [showContractAddress, setShowContractAddress] = useState("address-data");
	const [addressChanged, setAddressChanged] = useState(false);
	// const chain = useChain();
	const userAddress = useAddress();
	let userShortAddress = "";
	let contractShortAddress = "";
	const contract = props.contract;
	const isValidAddress = props.isValidAddress;

	let isConnected = props.isConnected;
	const contractAddress = props.contractAddress;

	const currentChain = props.currentChain;

		

	if (userAddress !== undefined) {

		userShortAddress = userAddress;
		// userShortAddress = userAddress.substring(0, 6) + "..." + userAddress.substring(userAddress.length - 4, userAddress.length);
	}

	if (contract !== undefined) {
		contractShortAddress = contractAddress;
		// contractShortAddress = contractAddress.substring(0, 6) + "..." + contractAddress.substring(contractAddress.length - 4, contractAddress.length);
	}

	// console.log(contract);

	useEffect(() => {
		if (isConnected == "connected") {

			// console.log(chain);

			setTimeout(() => {
				setShouldRenderDelayed(true);
				setNotLoaded(true);
				setTimeout(() => {
					setShowUserData("user-data-show");
				}
					, 100);

			}, 500);
		} else {
			setNotLoaded(false);
			setShouldRenderDelayed(false);
			setShowUserData("user-data");
		}
	}, [isConnected]);

	useEffect(() => {
		// console.log(contract)
		if (props.isValidAddress) {

			setTimeout(() => {
				setTimeout(() => {
					setShowContractAddress("address-data-show");
				}, 400);
			}, 100);
		} else {
			setShowContractAddress("address-data");
		}
	}, [contract]);

	const contractLoaded = contract.isSuccess;

	return (
		<>
			{isConnected === "unknown" && <div>Loading...</div>}
			{isConnected === "disconnected" && (
				<div>
					<code>ConnectionStatus: </code> {isConnected}
				</div>
			)}
			{isConnected === "connecting" && (
				<div>
					<p>Connecting...</p>
				</div>
			)
			}

			{currentChain != undefined && (
				<div>
					{/* <code>IsConnectedComponent: </code> {isConnected} */}
					{!notLoaded && showUserData == "user-data" && <p>Loading user address...</p>}
					{shouldRenderDelayed && (
						<div className={`user-data ${showUserData}`}>
							{contractLoaded && props.isValidAddress && (
								<div className={`address-data ${showContractAddress}`}>
									<p></p>Contract Address is
									<code> {contractShortAddress}</code>
								</div>
							)}
							<p></p>User address is
							<code> {userShortAddress}</code>
							<p></p>Connected to
							{/* <code> {chain.name}</code> */}
							<code className="chain-name"> {currentChain.name}</code>
						</div>

					)}
				</div>
			)}
		</>
	);
}

export default IsConnected;
