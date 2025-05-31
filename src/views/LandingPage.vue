<template>
	<div>
		<h1>Log Monitoring</h1>
		<p>Select a file to view insights</p>
	</div>
	<FileUploader @upload="handleUpload" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { useLogsStore } from '@/stores/logs'
import csv_to_json from '@/assets/csv_to_json'
import FileUploader from '@/components/FileUploader.vue'

export default defineComponent({
	name: 'LandingPage',
	components: {
		FileUploader,
	},
	methods: {
		...mapActions(useLogsStore, ['handleEntry']),
		handleUpload(content: string) {
			this.handleEntry(csv_to_json(content))
			this.$router.push('/dashboard')
		},
	},
})
</script>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 10rem;
}
</style>
