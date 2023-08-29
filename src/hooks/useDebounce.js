import React, { useEffect, useState } from "react";

function useDebounce(value, delay = 700) {
	const [debouncedValue, setDebouncedValue] = useState();

	useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(id);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
