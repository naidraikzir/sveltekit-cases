<script lang="ts">
	import { page } from '$app/stores'

	let className = ''
	export { className as class }

	interface MenuItem {
		url: string
		label: string
	}

	const menu: MenuItem[] = [{ url: '/tabs', label: 'Tabs' }]

	$: menuIsActive = (menu: MenuItem) => $page.route.id?.startsWith(menu.url)
</script>

<div class={className}>
	{#each menu as menuItem}
		<a
			href={menuItem.url}
			class={`text-lg ${menuIsActive(menuItem) && 'border-b-2 border-b-pink-700'}`}
		>
			{menuItem.label}
		</a>
	{/each}
</div>
