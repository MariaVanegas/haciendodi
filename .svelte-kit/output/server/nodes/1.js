

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.6a8bc222.js","_app/immutable/chunks/index.57496350.js","_app/immutable/chunks/singletons.9119dc3a.js","_app/immutable/chunks/index.29d22139.js"];
export const stylesheets = [];
export const fonts = [];
