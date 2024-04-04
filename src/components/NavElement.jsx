import { Link, useLocation } from "react-router-dom";
import { Box, Tooltip } from "@mantine/core";
import classNames from "classnames";

function NavElement({
	children,
	to,
	className,
	hoverEffect,
	label,
	disableTooltip,
	isLogo,
	...rest
}) {
	const location = useLocation().pathname;
	const navLinkClass = classNames(
		"size-14 flex items-center justify-center rounded-md",
		className,
		{ "hover:bg-green-100": hoverEffect },
		{ "bg-green-100": location === to && !isLogo }
	);
	return (
		<Tooltip
			label={label}
			disabled={disableTooltip}
			position='right'
			transitionProps={{ transition: "scale", duration: 200 }}>
			<Link to={to} className={navLinkClass} {...rest}>
				<Box className='size-14 flex items-center justify-center '>
					{children}
				</Box>
			</Link>
		</Tooltip>
	);
}
export default NavElement;
