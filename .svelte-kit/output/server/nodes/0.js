import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.2205ace5.js","_app/immutable/chunks/index.cb6fbcaa.js"];
export const stylesheets = ["_app/immutable/assets/0.bb77b2b4.css"];
export const fonts = [];
