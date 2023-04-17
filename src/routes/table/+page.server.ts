export const prerender = false

export const load = async ({ fetch }) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10&_embed=todos')
	const users = response.json()
	return {
		users
	}
}
