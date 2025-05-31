import { defineStore } from 'pinia'
import type { RawLogs, LogEntry } from '@/assets/types.interface'
import { millisecondsSplit } from '@/assets/milliseconds_split'

export const useLogsStore = defineStore('logs', {
	state: () => ({ logs: [] as LogEntry[] }),
	getters: {
		getLogs: (state) => {
			return state.logs
		},
	},
	actions: {
		handleEntry(logs: RawLogs[]) {
			const rawLogs = logs.filter((log: RawLogs) => log.id)
			const entries = {} as Record<string, LogEntry>
			rawLogs.forEach((log: RawLogs) => {
				if (log.type === 'START') {
					if (entries[log.id]) {
						entries[log.id].startTime = log.time
					} else {
						entries[log.id] = {
							startTime: log.time,
							endTime: '',
							name: log.name,
							id: log.id,
							status: 'UNKNOWN',
						}
					}
				} else if (log.type === 'END') {
					if (entries[log.id]) {
						entries[log.id].endTime = log.time
					} else {
						entries[log.id] = {
							startTime: '',
							endTime: log.time,
							name: log.name,
							id: log.id,
							status: 'UNKNOWN',
						}
					}
				}
			})
			this.logs = Object.values(entries).map((entry: LogEntry) => {
				if (entry.startTime && entry.endTime) {
					const entryStart = new Date(`1970-01-01T${entry.startTime}Z`).getTime()
					const entryEnd = new Date(`1970-01-01T${entry.endTime}Z`).getTime()
					const duration = entryEnd - entryStart
					const { minutes, seconds } = millisecondsSplit(duration)
					return {
						startTime: entry.startTime,
						endTime: entry.endTime,
						// duration: millisecondsSplit(duration),
						duration: `${minutes}m ${seconds}s`,
						name: entry.name,
						id: entry.id,
						status:
							duration < 60 * 5 * 1000
								? 'OK'
								: duration < 60 * 10 * 1000
									? 'WARNING'
									: 'ERROR',
					}
				} else {
					return entry
				}
			})
		},
	},
})
