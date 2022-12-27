<button
	class="text-sm rounded-md bg-indigo-700 hover:bg-indigo-600 text-white shadow transition px-4 py-1"
	class:opacity-50={$$props.disabled}
	on:click
	disabled={$$props.disabled}
>
	<slot />
</button>
