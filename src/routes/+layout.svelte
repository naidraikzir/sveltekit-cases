<script lang="ts">
	import { page } from '$app/stores'
	import '$lib/app.css'
	import Navbar from '$lib/components/Navbar.svelte'

	$: isHome = $page.route.id === '/'
</script>

<div class="min-h-screen bg-black/5 dark:bg-indigo-900 dark:text-white">
	<div class="min-h-screen dark:bg-black/70">
		<div class="fixed top-1/4 left-1/4 w-32 h-32 flex items-center justify-center">
			<div class="absolute w-full h-full bg-pink-600 rotate-45 rounded-2xl -z-10" />
			{#if isHome}
				<div class="text-center text-pink-200">Select menu above 👆</div>
			{/if}
		</div>

		<div class="relative">
			<Navbar />
			<slot />
		</div>
	</div>
</div>
