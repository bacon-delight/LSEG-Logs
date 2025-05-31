export interface RawLogs {
	time: string
	name: string
	type: string
	id: string
}

export interface LogEntry {
	startTime: string
	endTime: string
	duration?: string
	durationSeconds?: number
	name: string
	id: string
	status: 'OK' | 'ERROR' | 'WARNING' | 'UNKNOWN'
}
