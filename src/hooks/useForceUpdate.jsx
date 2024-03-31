import { useState, useCallback } from "react";
export function useForceUpdate() {
	const [value, setValue] = useState(0);
	const update = useCallback(() => {
		setValue(value + 1);
	});
	return [value, update];
}
