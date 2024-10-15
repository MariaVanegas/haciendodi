

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.c3d03643.js","_app/immutable/chunks/2.ff67538d.js","_app/immutable/chunks/index.cb6fbcaa.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.a06bb9a4.js"];
export const stylesheets = ["_app/immutable/assets/2.bff2ff4c.css"];
export const fonts = [];
