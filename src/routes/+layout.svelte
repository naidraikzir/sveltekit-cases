<script lang="ts">
	import '$lib/app.css'
	import Shapes from '$lib/components/Shapes.svelte'
	import Navbar from '$lib/components/Navbar.svelte'
	import ProgressBar from '$lib/components/ProgressBar.svelte'
	import routes from '$lib/store/routes'
	import type { PageData } from './$types'

	export let data: PageData
	$routes = data.routes
</script>

<ProgressBar />

<div class="min-h-screen bg-black/5 dark:bg-indigo-900 dark:text-white">
	<div class="min-h-screen dark:bg-black/70">
		<Shapes />

		<div class="relative">
			<Navbar />
			<div class="mt-4">
				<slot />
			</div>
		</div>
	</div>
</div>
