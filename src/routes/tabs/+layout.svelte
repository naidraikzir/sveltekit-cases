<script lang="ts">
	import { fade } from 'svelte/transition'
	import { page } from '$app/stores'
	import Card from '$lib/components/Card.svelte'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	interface Tab {
		name: string
		url: string
	}

	const tabs: Tab[] = [
		{ name: 'Form', url: 'form' },
		{ name: 'Table', url: 'table' }
	]

	$: getActiveClass = (tab: Tab) => {
		return $page.url.pathname.endsWith(tab.url) && 'bg-black/5 dark:bg-white/10'
	}
</script>

<div class="container mx-auto p-4">
	<Card>
		<div class="flex justify-around">
			{#each tabs as tab}
				<a
					href={`/tabs/${tab.url}`}
					class="flex-1 rounded text-center font-bold text-black dark:text-white p-2 {getActiveClass(
						tab
					)}"
				>
					{tab.name}
				</a>
			{/each}
		</div>
	</Card>

	<div class="mt-8">
		{#key data.url}
			<div in:fade={{ delay: 250 }} out:fade={{ duration: 250 }}>
				<slot />
			</div>
		{/key}
	</div>
</div>
