import { createContext, useState } from 'react';

// const userContext = createContext<{
// 	JWTToken?: string | null;
// 	setJWTToken?: React.Dispatch<React.SetStateAction<string | null>>;
// }>({ JWTToken: undefined, setJWTToken: undefined });

const userContext = createContext({
	JWTToken: '',
	setJWTToken: (JWTToken: string) => {},
});

export default userContext;
