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
		client: {"start":"_app/immutable/entry/start.68b889ea.js","app":"_app/immutable/entry/app.4b58ea36.js","imports":["_app/immutable/entry/start.68b889ea.js","_app/immutable/chunks/index.57496350.js","_app/immutable/chunks/singletons.73cfbca2.js","_app/immutable/chunks/index.29d22139.js","_app/immutable/entry/app.4b58ea36.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.57496350.js"],"stylesheets":[],"fonts":[]},
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
