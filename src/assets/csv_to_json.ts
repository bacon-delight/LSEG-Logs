import type { RawLogs } from './types.interface'

const csv_to_json = (csv: string): RawLogs[] => {
	const lines = csv.split('\n')
	const headers = ['time', 'name', 'type', 'id']
	const result: RawLogs[] = []

	for (let i = 1; i < lines.length; i++) {
		const obj: RawLogs = {
			time: '',
			name: '',
			type: '',
			id: '',
		}
		const currentLine = lines[i].split(',')

		for (let j = 0; j < headers.length; j++) {
			const header = headers[j].trim() as keyof RawLogs
			obj[header] = currentLine[j] ? currentLine[j].trim() : ''
		}

		result.push(obj)
	}

	return result
}

export default csv_to_json
