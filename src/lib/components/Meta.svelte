<script lang="ts">
	export let title = ''
	export let description = 'Demo'
</script>

<svelte:head>
	<title>{title ? `${title} | Svltkt` : 'Svltkt'}</title>
	<meta name="description" content={description} />
</svelte:head>
