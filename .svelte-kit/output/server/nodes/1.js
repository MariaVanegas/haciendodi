

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e277abf6.js","_app/immutable/chunks/index.cb6fbcaa.js","_app/immutable/chunks/singletons.151e968f.js","_app/immutable/chunks/index.a06bb9a4.js"];
export const stylesheets = [];
export const fonts = [];
