import { atom } from "recoil";

const defaultAuthState = {
	userStatus: false,
	userLoading: false,
};

export const authState = atom({
	key: "authState",
	default: defaultAuthState,
});
