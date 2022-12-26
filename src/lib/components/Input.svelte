<script lang="ts">
	export let type = 'text'
	export let value: string | number = ''
	export let label = ''
	export let id = ''

	let className = ''
	export { className as class }
	export let inputClass = ''

	let inputmode = type.match(/^(number|range)$/) ? 'numeric' : 'text'

	function onInput(e: Event) {
		const target = e.target as HTMLInputElement
		value = type.match(/^(number|range)$/) ? +target.value : target.value
	}
</script>

<div class={className}>
	<label for={id}>{label}</label>
	<input
		class="w-full rounded border border-black/10 dark:border-white/25 bg-white/5 p-2 {inputClass}"
		{id}
		{type}
		{value}
		{inputmode}
		{...$$restProps}
		on:input={onInput}
		on:change={onInput}
	/>
</div>
