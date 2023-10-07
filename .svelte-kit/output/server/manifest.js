export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "haciendodi/_app",
	assets: new Set([".DS_Store",".nojekyll","assets/.DS_Store","assets/escalera.svg","assets/maletin.svg","assets/matrioska.jpeg","favicon.png"]),
	mimeTypes: {".svg":"image/svg+xml",".jpeg":"image/jpeg",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.5b08f652.js","app":"_app/immutable/entry/app.552ce850.js","imports":["_app/immutable/entry/start.5b08f652.js","_app/immutable/chunks/index.57496350.js","_app/immutable/chunks/singletons.10759f5c.js","_app/immutable/chunks/index.29d22139.js","_app/immutable/entry/app.552ce850.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.57496350.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
