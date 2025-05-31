<template>
	<DataTable
		:value="logs"
		tableStyle="min-width: 50rem"
		paginator
		:rows="10"
		:rowsPerPageOptions="[10, 20, 50]"
	>
		<Column field="id" header="Task ID"></Column>
		<Column field="name" header="Name"></Column>
		<Column field="status" sortable header="Status"></Column>
		<Column field="startTime" sortable header="Start"></Column>
		<Column field="endTime" sortable header="End"></Column>
		<Column field="duration" sortable header="Duration"></Column>
	</DataTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default defineComponent({
	name: 'LogsTable',
	components: {
		DataTable,
		Column,
	},
	props: {
		logs: {
			type: Array,
			required: true,
		},
	},
})
</script>
