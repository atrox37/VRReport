import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
	state: () => ({
		isPresentationMode: true as boolean,
		isFocusMode: true as boolean
	}),
	actions: {
		togglePresentation() {
			this.isPresentationMode = !this.isPresentationMode
		},
		setFocusMode(val: boolean) {
			this.isFocusMode = val
		}
	}
})


