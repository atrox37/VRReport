export type StackLayer = {
	id: 'hardware' | 'runtime' | 'standards' | 'engines' | 'apps'
	title: string
	bullets: string[]
}

export type Solution = {
	intro: string
	architecture: string[]
	architectureDesc?: string[]
	capabilities: (string | { text: string; tip?: string })[]
	pros: string[]
	cons: string[]
	use: string[]
	notUse: string[]
	products?: {
		title: string
		intro: string
		highlights: string[]
		image?: { url: string; source?: string; alt?: string }
		link?: string
		details?: string
	}[]
}

export type CompareRow = {
	name: string
	values: string[]
}

export type VrContent = {
	goals: string[]
	goalsIntro?: string[]
	goalsItems?: { title: string; details: string[] }[]
	stack: StackLayer[]
	stackDetails?: {
		[id in StackLayer['id']]?: {
			paragraphs?: string[]
			images?: { url: string; source?: string; alt?: string }[]
		}
	}
	solutions: {
		unity: Solution
		unreal: Solution
		three: Solution
		babylon: Solution
	}
	compare: {
		columns: string[]
		rows: CompareRow[]
		categories?: string[]
	}
	recommend: { scenario: string; tech: string }[]
	references: { title: string; url?: string; note?: string }[]
	summary?: string[]
}


