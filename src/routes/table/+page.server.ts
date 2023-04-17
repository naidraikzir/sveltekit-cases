import type { PageServerLoad } from './$types'

export const prerender = false

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10&_embed=todos')
	const users = response.json()
	return {
		users
	}
}
