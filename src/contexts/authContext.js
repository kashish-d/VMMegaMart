import React from "react";

const initialItem = {
	login: () => {},
	userStatus: false,
	userLoading: false,
	userError: false,
};

// Creating the context object and passing the default values.
const authContext = React.createContext(initialItem);

export default authContext;
