<script lang="ts">
	import GithubLogo from './GithubLogo.svelte'
	import Menu from './Menu.svelte'
	import Themer from './Themer.svelte'

	const sideWidthClass = 'w-[4.5rem]'
</script>

<div class="flex items-center justify-between p-4">
	<a href="/" class="{sideWidthClass} font-bold text-2xl">Kit.</a>
	<Menu />
	<div class="flex {sideWidthClass} text-right">
		<a
			href="https://github.com/naidraikzir/sveltekit-cases"
			class="w-8 h-8 mr-2 flex items-center justify-center"
			target="_blank"
			aria-label="Github"
			rel="noreferrer"
		>
			<GithubLogo />
		</a>
		<Themer />
	</div>
</div>
