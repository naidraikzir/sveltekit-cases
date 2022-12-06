<script lang="ts">
	import { slide } from 'svelte/transition'
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Input from '$lib/components/Input.svelte'
	import Meta from '$lib/components/Meta.svelte'

	let form = {
		name: '',
		count: 0,
		items: [
			{
				name: '',
				amount: 0
			}
		]
	}

	function addItem() {
		form.items = [
			...form.items,
			{
				name: '',
				amount: 0
			}
		]
	}

	function removeItem(index: number) {
		return () => (form.items = form.items.filter((item, i) => i !== index))
	}
</script>

<Meta title="Form" description="Form inputs with non primitive type value bindings" />

<div class="container mx-auto p-4">
	<Card>
		<div class="flex flex-col lg:flex-row gap-8 justify-between">
			<form class="lg:w-96 flex-shrink-0" on:submit|preventDefault>
				<Input type="text" id="name" label="Name" class="mb-2" bind:value={form.name} />
				<Input
					type="number"
					id="count"
					label="Count"
					class="mb-2"
					bind:value={form.count}
					min="0"
				/>

				<div class="flex items-center justify-between mt-8 mb-4">
					<div class="font-bold">Items</div>
					<Button on:click={addItem}>Add Item</Button>
				</div>

				{#each form.items as item, index}
					<div
						class="flex items-end justify-between mb-2 gap-4"
						transition:slide|local={{ duration: 200 }}
					>
						<Input type="text" id={`name-${index}`} label="Name" bind:value={item.name} />
						<Input
							type="number"
							id={`amount-${index}`}
							label="Amount"
							bind:value={item.amount}
							min="0"
						/>
						<button class="p-2" on:click={removeItem(index)}>❌</button>
					</div>
				{/each}
			</form>

			<div class="flex-1 w-full overflow-x-auto rounded-lg bg-[#100020] text-white p-4">
				<pre>{JSON.stringify(form, undefined, 2)}</pre>
			</div>
		</div>
	</Card>
</div>
