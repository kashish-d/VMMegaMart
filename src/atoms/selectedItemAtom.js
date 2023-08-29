import { atom } from "recoil";

const defaultSelectedItemState = {
	itemName: "",
	itemDescription: "",
	itemPrice: "",
	itemQuantity: "",
	category: "",
	itemIndex: 0,
};

export const selectedItemState = atom({
	key: "selectedItemState",
	default: defaultSelectedItemState,
});
