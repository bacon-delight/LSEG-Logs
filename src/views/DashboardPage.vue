<template>
	<h1>Insights</h1>
	<div class="charts">
		<DoughnutChart class="doughnutchart" />
		<LineChart class="linechart" />
	</div>

	<LogsTable :logs="logs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useLogsStore } from '@/stores/logs'
import LogsTable from '@/components/LogsTable.vue'
import DoughnutChart from '@/components/DoughnutChart.vue'
import LineChart from '@/components/LineChart.vue'

export default defineComponent({
	name: 'DashboardPage',
	components: { LogsTable, DoughnutChart, LineChart },
	computed: {
		...mapState(useLogsStore, ['logs']),
	},
	mounted() {
		// Redirect to home if no logs are available
		if (this.logs.length === 0) {
			this.$router.push({ path: '/' })
		}
	},
})
</script>

<style scoped>
.charts {
	display: grid;
	grid-template-columns: 1fr 3fr;

	@media screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
}

.doughnutchart {
	width: 100%;
}

.linechart {
	width: 100%;
}
</style>
