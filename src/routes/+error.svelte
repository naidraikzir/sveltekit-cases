<script lang="ts">
	import { page } from '$app/stores'
	import Card from '$lib/components/Card.svelte'
	import Meta from '$lib/components/Meta.svelte'
</script>

<Meta title={`${$page.status}`} />

<div class="container mx-auto px-4 min-h-[20rem] flex items-center justify-center">
	<Card>
		<div class="text-center">
			<h1 class="text-5xl">{$page.status}</h1>
			<h2 class="text-2xl">{$page.error?.message}</h2>
		</div>
	</Card>
</div>
