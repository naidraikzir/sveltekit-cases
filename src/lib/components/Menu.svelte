<script lang="ts">
	import { page } from '$app/stores'

	interface MenuItem {
		url: string
		label: string
	}

	const menu: MenuItem[] = [
		{ url: '/tabbed-routes', label: 'Tabbed Routes' },
		{ url: '/form', label: 'Form' },
		{ url: '/table', label: 'Table' }
	]

	$: getActiveClass = (menu: MenuItem) =>
		$page.route.id?.startsWith(menu.url) && 'border-b-2 border-b-pink-700'
</script>

<div class="relative group">
	<div class="md:hidden text-3xl -mt-1">⚀</div>
	<div
		class="
			left-1/2 top-full min-w-max z-10 rounded-lg backdrop-blur
			absolute md:static
			-translate-x-1/2 md:translate-x-0
			mt-2 md:m-0 p-4 md:p-0
		bg-white/50 dark:bg-white/5 md:dark:bg-transparent
			border border-white/10 md:border-0
		dark:text-white
			opacity-0 md:opacity-100 group-hover:opacity-100
			invisible md:visible group-hover:visible
		"
	>
		{#each menu as menuItem}
			<a
				href={menuItem.url}
				class={`text-lg mx-2 block my-2 md:inline md:p-0 ${getActiveClass(menuItem)}`}
			>
				{menuItem.label}
			</a>
		{/each}
	</div>
</div>
