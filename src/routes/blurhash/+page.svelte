<script lang="ts">
	import { decode } from 'blurhash'
	import { onMount } from 'svelte'
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Input from '$lib/components/Input.svelte'
	import Meta from '$lib/components/Meta.svelte'
	import type { ActionData } from './$types'

	export let form: ActionData

	const resX = 16
	const resY = 16
	let img: HTMLImageElement
	let canvas: HTMLCanvasElement
	let show = false

	function toggle() {
		show = !show
	}

	onMount(() => {
		if (!(form && canvas)) return

		const pixels = decode(form.hash, resX, resY, 1)
		const ctx = canvas.getContext('2d')
		const imageData = ctx?.createImageData(resX, resY)
		imageData?.data.set(pixels)
		ctx?.putImageData(imageData || new ImageData(resX, resY), 0, 0)

		img.onload = () => {
			setTimeout(() => {
				show = true
			}, 500)
		}
		img.src = form.url
	})
</script>

<Meta title="Blurhash" description="Simple blurhash implementation" />

<div class="max-w-[64rem] mx-auto p-4">
	<Card>
		<form class="flex" method="POST">
			<Input class="flex-1 mr-4" placeholder="Paste image url..." name="url" required />
			<Button>Get</Button>
		</form>

		<div class="relative" class:mt-4={form} style="aspect-ratio: {form?.aspect || 'auto'};">
			{#if form}
				<canvas bind:this={canvas} class="w-full h-full rounded-md" width={resX} height={resY} />
			{/if}

			<img
				bind:this={img}
				class="absolute left-0 top-0 w-full h-full rounded-md duration-500 transition-opacity opacity-0"
				class:opacity-100={show}
				alt="Loaded"
			/>
		</div>

		{#if form}
			<div class="mt-4 text-center">
				<Button on:click={toggle}>Toggle Image</Button>
			</div>
		{/if}
	</Card>
</div>
