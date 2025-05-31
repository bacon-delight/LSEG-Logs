<template>
	<FileUpload
		:accept="acceptedFileTypes.join(',')"
		mode="basic"
		@select="handleFileUpload"
		:multiple="false"
		:maxFileSize="1000000"
		:auto="true"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'

export default defineComponent({
	name: 'FileUploader',
	components: {
		FileUpload,
	},
	data() {
		return {
			acceptedFileTypes: ['.json', '.csv', '.log'],
		}
	},
	methods: {
		handleFileUpload(event: FileUploadSelectEvent) {
			if (event.files && event.files.length > 0) {
				const file = event.files[0]
				const reader = new FileReader()
				reader.onload = (e) => {
					const content = e.target?.result as string
					this.$emit('upload', content)
				}
				reader.readAsText(file)
			}
		},
	},
})
</script>
