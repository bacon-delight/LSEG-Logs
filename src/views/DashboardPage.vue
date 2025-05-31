<template>
	<h1>Insights</h1>
	<div class="charts">
		<DoughnutChart />
		<!-- <DoughnutChart /> -->
	</div>

	<LogsTable :logs="logs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useLogsStore } from '@/stores/logs'
import LogsTable from '@/components/LogsTable.vue'
import DoughnutChart from '@/components/DoughnutChart.vue'

export default defineComponent({
	name: 'DashboardPage',
	components: { LogsTable, DoughnutChart },
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
	display: flex;
	flex-direction: row;
	/* justify-content: space-between; */
}
</style>
