<template>
	<div>Insights</div>
	<LogsTable :logs="logs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useLogsStore } from '@/stores/logs'
import LogsTable from '@/components/LogsTable.vue'

export default defineComponent({
	name: 'DashboardPage',
	components: { LogsTable },
	computed: {
		...mapState(useLogsStore, ['logs']),
	},
	mounted() {
		if (this.logs.length === 0) {
			this.$router.push({ path: '/' })
		}
	},
})
</script>
