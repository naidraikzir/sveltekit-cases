import { encode } from 'blurhash'
import sharp from 'sharp'
import type { Actions } from './$types'

export const prerender = false

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData()
		const url = <string>form.get('url')
		const image = <Blob>form.get('image')

		const buffer = await image.arrayBuffer()
		const imgArr = new Uint8ClampedArray(buffer)
		const {
			data,
			info: { width, height }
		} = await sharp(imgArr).raw().ensureAlpha().toBuffer({ resolveWithObject: true })
		const hash = await encode(new Uint8ClampedArray(data.buffer), width, height, 4, 4)
		const aspect = Math.round((width / height) * 100) / 100

		return { url, hash, aspect }
	}
}
