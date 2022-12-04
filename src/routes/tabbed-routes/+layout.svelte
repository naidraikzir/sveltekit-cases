<script lang="ts">
	import { page } from '$app/stores'
	import Card from '$lib/components/Card.svelte'

	interface Tab {
		name: string
		url: string
	}

	const tabs: Tab[] = [
		{ name: 'One', url: 'one' },
		{ name: 'Two', url: 'two' }
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
					href={`/tabbed-routes/${tab.url}`}
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
		<slot />
	</div>
</div>
