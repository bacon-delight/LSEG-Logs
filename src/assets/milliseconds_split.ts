export const millisecondsSplit = (
	milliseconds: number,
): {
	hours: number
	minutes: number
	seconds: number
} => {
	const hours = Math.floor(milliseconds / (60 * 60 * 1000))
	milliseconds -= hours * (60 * 60 * 1000)

	const minutes = Math.floor(milliseconds / (60 * 1000))
	milliseconds -= minutes * (60 * 1000)

	const seconds = Math.floor(milliseconds / 1000)

	return { hours, minutes, seconds }
}
