<script lang="ts">
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	let size = 10
	let padding = 60
	let bound = size + padding * 2
	let xCount = 0
	let yCount = 0

	const shapes = ['star', 'circle', 'cross', 'triangle']
	type Shape = (typeof shapes)[number]

	const colors = ['#BEE86D', '#B3A6E2', '#EAB1B0']
	type Color = (typeof colors)[number]

	interface Item {
		shape: Shape
		color: Color
		x: number
		y: number
		offsetX: number
		offsetY: number
		rotation: number
	}

	let items: Item[] = []

	function build() {
		xCount = Math.round(window.innerWidth / bound)
		yCount = Math.round(window.innerHeight / bound)

		items = []
		for (let i = 0; i < yCount; i++) {
			for (let j = 0; j < xCount; j++) {
				items = [
					...items,
					{
						shape: shapes[randBetween(0, 3)],
						color: colors[randBetween(0, 2)],
						x: j * bound + bound / 2,
						y: i * bound + bound / 2,
						offsetX: randBetween(0, 200) * randSign(),
						offsetY: randBetween(0, 200) * randSign(),
						rotation: randBetween(0, 360) * randSign()
					}
				]
			}
		}
	}

	function randBetween(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	function randSign() {
		return Math.round(Math.random()) ? 1 : -1
	}

	onMount(() => {
		build()
		window.onresize = build
	})
</script>

<svg style="display:none;">
	<defs>
		<g id="star">
			<path
				d="M27.5 1.5l7.3 13.3c.1.2.3.3.4.4l13.3 7.3c1.9 1.1 1.9 3.9 0 4.9l-13.3 7.3c-.2.1-.3.3-.4.4l-7.3 13.3c-1.1 1.9-3.9 1.9-4.9 0l-7.3-13.3c-.1-.2-.3-.3-.4-.4L1.5 27.5c-1.9-1.1-1.9-3.9 0-4.9l13.3-7.3c.2-.1.3-.3.4-.4l7.3-13.3c1.1-2.1 3.9-2.1 5-.1z"
			/>
		</g>
		<g id="circle">
			<path
				d="M25 50C11.2 50 0 38.8 0 25S11.2 0 25 0s25 11.2 25 25-11.2 25-25 25zm0-38.7c-7.5 0-13.7 6.1-13.7 13.7S17.5 38.7 25 38.7 38.7 32.5 38.7 25 32.5 11.3 25 11.3z"
			/>
		</g>
		<g id="cross">
			<path
				d="M43.2 18.5h-7.1c-2.5 0-4.6-2.1-4.6-4.6V6.8c0-3.4-2.5-6.5-5.9-6.8-3.9-.4-7.2 2.7-7.2 6.5v7.3c0 2.5-2.1 4.6-4.6 4.6H6.7c-3.4 0-6.5 2.5-6.8 5.9-.4 3.9 2.7 7.2 6.5 7.2h7.3c2.5 0 4.6 2.1 4.6 4.6v7.1c0 3.4 2.5 6.5 5.9 6.8 3.9.4 7.2-2.7 7.2-6.5v-7.3c0-2.5 2.1-4.6 4.6-4.6h7.3c3.8 0 6.9-3.3 6.5-7.2-.1-3.4-3.2-5.9-6.6-5.9z"
			/>
		</g>
		<g id="triangle">
			<path
				d="M38.9 46.2H11.1c-4 0-7.6-2.1-9.6-5.5-2-3.5-2-7.6 0-11.1L15.4 5.5C17.4 2.1 21 0 25 0s7.6 2.1 9.6 5.5l13.9 24.1c2 3.5 2 7.6 0 11.1s-5.6 5.5-9.6 5.5zM25 10.5c-.3 0-.5.2-.5.3L10.6 34.9c-.1.1-.2.3 0 .6s.4.3.5.3h27.8c.1 0 .3 0 .5-.3s.1-.5 0-.6L25.5 10.8c0-.1-.2-.3-.5-.3z"
			/>
		</g>
	</defs>
</svg>

<div class="fixed w-full h-full">
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		style="width: {xCount * bound}px; height: {yCount * bound}px;"
	>
		{#each items as item}
			<svg
				viewBox="0 0 50 50"
				fill={item.color}
				class="overflow-visible absolute transition"
				style="width: {size}px; top: {item.y}px; left: {item.x}px; transform: translateX({item.offsetX}%) translateY({item.offsetY}%) rotate({item.rotation}deg);"
				transition:fade
			>
				<use xlink:href={`#${item.shape}`} />
			</svg>
		{/each}
	</div>
</div>
