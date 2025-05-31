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
		/**
		 * Handles the raw logs and converts them into structured log entries.
		 * @param {RawLogs[]} logs - The raw logs to process.
		 */
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
			// Convert entries to an array of LogEntry objects
			this.logs = Object.values(entries).map((entry: LogEntry) => {
				// If both startTime and endTime are present, calculate the duration
				if (entry.startTime && entry.endTime) {
					const entryStart = new Date(`1970-01-01T${entry.startTime}Z`).getTime()
					const entryEnd = new Date(`1970-01-01T${entry.endTime}Z`).getTime()
					const duration = entryEnd - entryStart
					// Split the duration into hours, minutes, and seconds
					const { minutes, seconds } = millisecondsSplit(duration)
					return {
						startTime: entry.startTime,
						endTime: entry.endTime,
						duration: `${minutes}m ${seconds}s`,
						durationSeconds: duration / 1000,
						name: entry.name,
						id: entry.id,
						// Determine the status based on the duration
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
