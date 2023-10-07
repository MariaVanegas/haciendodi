import { c as create_ssr_component } from "../../chunks/index2.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ':root{--text-color:"#737373";--main-font:"Archivo Narrow"}.bold{fill:var(--text-color);font-family:var(--main-font);font-weight:bold}.normal{fill:var(--text-color);font-family:var(--main-font);font-weight:normal}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1ltee7z_START --><style>@import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;700&display=swap');
  </style><!-- HEAD_svelte-1ltee7z_END -->`, ""}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
