

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.95409693.js","_app/immutable/chunks/2.9ec2b854.js","_app/immutable/chunks/index.57496350.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.29d22139.js"];
export const stylesheets = ["_app/immutable/assets/2.bff2ff4c.css"];
export const fonts = [];
