<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit'
	import { decode } from 'blurhash'
	import { onMount } from 'svelte'
	import { applyAction, deserialize, enhance } from '$app/forms'
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Input from '$lib/components/Input.svelte'
	import Meta from '$lib/components/Meta.svelte'
	import type { ActionData } from './$types'

	export let form: ActionData

	const resX = 16
	const resY = 16

	let url = ''
	let error = ''
	let isSubmitting = false
	let img: HTMLImageElement
	let canvas: HTMLCanvasElement
	let show = false

	function toggle() {
		show = !show
	}

	async function onSubmit(action: string) {
		if (isSubmitting) return

		isSubmitting = true
		error = ''
		const res = await fetch(url)

		if (!res.headers.get('content-type')?.startsWith('image')) {
			error = 'Please use valid image 🖼️ url'
			isSubmitting = false
			return
		} else if (parseInt(res.headers.get('content-length') || '') > 100_000) {
			error = 'File is too big'
			isSubmitting = false
			return
		}

		const data = new FormData()
		const blob = await res.blob()
		data.append('image', new File([blob], 'image'))
		data.append('url', url)

		try {
			const response = await fetch(action, {
				method: 'POST',
				body: data,
				headers: {
					'x-sveltekit-action': 'true'
				}
			})

			show = false
			const result: ActionResult = deserialize(await response.text())
			setTimeout(() => {
				applyAction(result)
			}, 500)
		} catch (error) {
			console.error(error)
		} finally {
			isSubmitting = false
		}
	}

	onMount(() => {
		img.onload = () => {
			setTimeout(() => {
				show = true
			}, 500)
		}
	})

	$: {
		if (form && canvas) {
			const pixels = decode(form.hash, resX, resY, 1)
			const ctx = canvas.getContext('2d')
			const imageData = ctx?.createImageData(resX, resY)
			imageData?.data.set(pixels)
			ctx?.putImageData(imageData || new ImageData(resX, resY), 0, 0)

			img.src = form.url
		}
	}
</script>

<Meta title="Blurhash" description="Simple blurhash implementation" />

<div class="max-w-[64rem] mx-auto p-4">
	<Card>
		<form
			method="POST"
			use:enhance={({ action, cancel }) => {
				cancel()
				onSubmit(action.pathname)
			}}
		>
			<div class="flex">
				<Input class="flex-1 mr-4" placeholder="Paste image url..." bind:value={url} required />
				<Button disabled={isSubmitting}>
					{#if isSubmitting}
						<span class="inline-block animate-spin text-lg">↺</span>
					{:else}
						Get
					{/if}
				</Button>
			</div>
			<div class="text-red-500"><small>{error}</small></div>
		</form>

		<div class="relative" class:mt-4={form} style="aspect-ratio: {form?.aspect || 'auto'};">
			{#if form}
				<canvas bind:this={canvas} class="w-full h-full rounded-md" width={resX} height={resY} />
			{/if}

			<img
				bind:this={img}
				class="absolute left-0 top-0 w-full h-full rounded-md transition-opacity duration-500 opacity-0"
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
