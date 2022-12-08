<script lang="ts">
	import Menu from './Menu.svelte'
	import Themer from './Themer.svelte'
</script>

<div class="flex items-center justify-between p-4">
	<a href="/" class="w-[42px] font-bold text-2xl">Kit.</a>
	<Menu />
	<div class="w-[42px] text-right">
		<Themer />
	</div>
</div>
