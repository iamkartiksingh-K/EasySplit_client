function MoneyPlus(props) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 30' {...props}>
			<g fill='#000' fillRule='evenodd'>
				<path d='M7.95 20h13.06c1.092 0 1.99-.892 1.99-1.992V6.992A1.992 1.992 0 0 0 21.01 5H4.99C3.899 5 3 5.892 3 6.992v8.059a3.51 3.51 0 0 1 1-.714V6.992C4 6.447 4.448 6 4.99 6h16.02c.546 0 .99.445.99.992v11.016a.996.996 0 0 1-.99.992H8.662a3.51 3.51 0 0 1-.714 1Z' />
				<path d='M23 10h-4.49A2.498 2.498 0 0 0 16 12.5c0 1.39 1.123 2.5 2.51 2.5H23v-1h-4.49c-.839 0-1.51-.667-1.51-1.5 0-.832.668-1.5 1.51-1.5H23v-1ZM18.747 2.465c.716-.183 1.248.234 1.246.975l-.008 2.012-.002.5 1 .004.002-.5.008-2.012c.005-1.394-1.142-2.294-2.494-1.948L4.53 5.073l-.698 1.211 14.914-3.819ZM5.5 22a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z' />
				<path d='M5.997 17v-2h-1v2H3v1h1.997v1.997h1V18H8v-1H5.997Z' />
			</g>
			<text
				y={39}
				fontSize={5}
				fontWeight='bold'
				fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
				{"Created by Pham Thi Dieu Linh"}
			</text>
			<text
				y={44}
				fontSize={5}
				fontWeight='bold'
				fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
				{"from the Noun Project"}
			</text>
		</svg>
	);
}
export default MoneyPlus;
