"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { getTokenData } from "../helpers/getTokenData";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(null);
	const [token, setToken] = useState(Cookies.get("token"));
	const getUserInfo = async () => {
		if (token) {
			const tokenData = await getTokenData(token);
			setUserInfo(tokenData);
		} else {
			setUserInfo(null);
		}
	};

	useEffect(() => {
		token && getUserInfo();
	}, [token]);

	return (
		<AuthContext
			value={{
				userInfo,
				setUserInfo,
				getUserInfo,
				setToken,
			}}
		>
			{children}
		</AuthContext>
	);
};

export const useAuth = () => useContext(AuthContext);
