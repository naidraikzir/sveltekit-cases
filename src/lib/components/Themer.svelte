<script lang="ts">
	function setTheme() {
		if (localStorage.theme === 'dark') {
			localStorage.theme = 'light'
			document.documentElement.classList.remove('dark')
		} else {
			localStorage.theme = 'dark'
			document.documentElement.classList.add('dark')
		}
	}
</script>

<button
	class="w-8 h-8 text-2xl cursor-pointer before:content-['🌞'] dark:before:content-['🌜']"
	on:click={setTheme}
	aria-label="theme-toggle"
/>
