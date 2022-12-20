import type { LayoutServerLoad } from "./$types";

export const prerender = true

export const load: LayoutServerLoad = async () => {
  const modules = import.meta.glob('./**/+page.svelte')
  const routes = new Set(
    Object.keys(modules)
      .map((module) => module.split('/'))
      .filter((module) => module.length > 2)
      .map((module) => module[1])
  )

  return {
    routes: [...routes]
  }
};
