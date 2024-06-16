import { useState, useCallback } from "react";
export function useRefresh() {
	const [value, setValue] = useState(false);
	const update = useCallback(() => {
		const newVal = !value;
		setValue(newVal);
	});
	return [value, update];
}
