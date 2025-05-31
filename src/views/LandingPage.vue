<template>
	<div>Landing Page</div>
	<RouterLink to="/dashboard">Dashboard</RouterLink>
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
