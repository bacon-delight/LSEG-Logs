<template>
	<Chart type="doughnut" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useLogsStore } from '@/stores/logs'
import Chart from 'primevue/chart'

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
				labels: ['OK', 'WARNING', 'ERROR', 'UNKNOWN'],
				datasets: [
					{
						data: [0, 0, 0, 0],
						backgroundColor: ['#4BC0C0', '#FFCE56', '#FF6384', '#dedede'],
					},
				],
			},
			chartOptions: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
					},
				},
			},
		}
	},
	mounted() {
		// Update chart data based on logs
		const statusCounts = this.logs.reduce(
			(acc, log) => {
				acc[log.status] = (acc[log.status] || 0) + 1
				return acc
			},
			{ OK: 0, WARNING: 0, ERROR: 0, UNKNOWN: 0 },
		)
		this.chartData.datasets[0].data = [
			statusCounts.OK,
			statusCounts.WARNING,
			statusCounts.ERROR,
			statusCounts.UNKNOWN,
		]
		this.chartData.labels = Object.keys(statusCounts)
	},
})
</script>
