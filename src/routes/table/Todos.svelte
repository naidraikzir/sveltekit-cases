<script lang="ts">
	interface Todo {
		title: string
		completed: boolean
	}

	export let todos: Todo[]
</script>

<table class="w-full">
	<thead>
		<tr>
			<th />
			<th class="p-2" align="left">
				<h2 class="text-xl">Todos</h2>
			</th>
		</tr>
		<tr>
			<th class="p-2" width="42" />
			<th class="p-2" align="left">Title</th>
		</tr>
	</thead>
	<tbody>
		{#each todos as todo}
			<tr>
				<td class="p-2">
					<input type="checkbox" checked={todo.completed} on:click|preventDefault />
				</td>
				<td class="p-2">{todo.title}</td>
			</tr>
		{/each}
	</tbody>
</table>
