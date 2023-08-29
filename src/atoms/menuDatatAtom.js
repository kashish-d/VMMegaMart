import { atom } from "recoil";

const defaultMenuDataState = [];

export const menuDataState = atom({
	key: "menuDataState",
	default: defaultMenuDataState,
});
