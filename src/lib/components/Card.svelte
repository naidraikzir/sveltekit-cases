<script lang="ts">
	let className = ''
	export { className as class }
</script>

<div
	class="rounded-lg shadow-lg bg-white/50 dark:bg-white/5 dark:text-white border border-white/10 p-4 backdrop-blur-md {className}"
>
	<slot />
</div>
