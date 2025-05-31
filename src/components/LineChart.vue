<template>
	<Chart type="line" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useLogsStore } from '@/stores/logs'
import Chart from 'primevue/chart'
import type { LogEntry } from '@/assets/types.interface'

export default defineComponent({
	name: 'DoughnutChart',
	components: {
		Chart,
	},
	computed: {
		...mapState(useLogsStore, ['logs']),
	},
	data() {
		return {
			chartData: {
				labels: [
					'<5 mins',
					'5-10 mins',
					'10-15 mins',
					'15-20 mins',
					'20-25 mins',
					'25-30 mins',
					'>30 mins',
				],
				datasets: [
					{
						label: 'Durations',
						data: [0, 0, 0, 0, 0, 0, 0],
						fill: false,
						tension: 0.4,
					},
				],
			},
			chartOptions: {
				maintainAspectRatio: false,
				aspectRatio: 1,
			},
		}
	},
	mounted() {
		const counts = {
			'<5 mins': 0,
			'5-10 mins': 0,
			'10-15 mins': 0,
			'15-20 mins': 0,
			'20-25 mins': 0,
			'25-30 mins': 0,
			'>30 mins': 0,
		}
		this.logs.forEach((log: LogEntry) => {
			if (!log.durationSeconds) return
			if (log.durationSeconds < 300) {
				counts['<5 mins']++
			} else if (log.durationSeconds < 600) {
				counts['5-10 mins']++
			} else if (log.durationSeconds < 900) {
				counts['10-15 mins']++
			} else if (log.durationSeconds < 1200) {
				counts['15-20 mins']++
			} else if (log.durationSeconds < 1500) {
				counts['20-25 mins']++
			} else if (log.durationSeconds < 1800) {
				counts['25-30 mins']++
			} else {
				counts['>30 mins']++
			}
		})

		this.chartData = {
			labels: [
				'<5 mins',
				'5-10 mins',
				'10-15 mins',
				'15-20 mins',
				'20-25 mins',
				'25-30 mins',
				'>30 mins',
			],
			datasets: [
				{
					label: 'Durations',
					data: [
						counts['<5 mins'],
						counts['5-10 mins'],
						counts['10-15 mins'],
						counts['15-20 mins'],
						counts['20-25 mins'],
						counts['25-30 mins'],
						counts['>30 mins'],
					],
					fill: false,
					tension: 0.4,
				},
				// {
				// 	label: 'Durations',

				// 	// data: this.logs.map((log: LogEntry) => log.durationSeconds || 0) as number[],
				// 	fill: false,
				// 	tension: 0.4,
				// },
			],
		}
	},
})
</script>
