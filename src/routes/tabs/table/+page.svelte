<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Meta from '$lib/components/Meta.svelte'
	import type { PageData } from './$types'
	import Todos from './Todos.svelte'

	export let data: PageData
	let expanded = new Set()

	$: onItemClick = (index: number) => () => {
		expanded.has(index) ? expanded.delete(index) : expanded.add(index)
		expanded = expanded
	}
</script>

<Meta title="Table" description="Table with children" />

<Card>
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr>
					<th class="p-2" width="42" />
					<th class="p-2" align="left">Name</th>
					<th class="p-2" align="left">Email</th>
					<th class="p-2" align="left">City</th>
					<th class="p-2" align="left">Website</th>
				</tr>
			</thead>
			<tbody>
				{#each data.users as user, index}
					<tr
						class="cursor-pointer hover:bg-black/10 dark:hover:bg-black/50"
						on:click={onItemClick(index)}
					>
						<td class="p-2 text-center">{expanded.has(index) ? '▽' : '▷'}</td>
						<td class="p-2 whitespace-nowrap">{user.name}</td>
						<td class="p-2 whitespace-nowrap">{user.email}</td>
						<td class="p-2 whitespace-nowrap">{user.address.city}</td>
						<td class="p-2 whitespace-nowrap">{user.website}</td>
					</tr>

					{#if expanded.has(index)}
						<tr class="bg-black/5 dark:bg-black/25">
							<td class="p-2" />
							<td class="p-2" colspan="4">
								<Todos todos={user.todos} />
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</Card>
