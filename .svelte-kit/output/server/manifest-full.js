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
		client: {"start":"_app/immutable/entry/start.a60748ab.js","app":"_app/immutable/entry/app.74ab585c.js","imports":["_app/immutable/entry/start.a60748ab.js","_app/immutable/chunks/index.cb6fbcaa.js","_app/immutable/chunks/singletons.151e968f.js","_app/immutable/chunks/index.a06bb9a4.js","_app/immutable/entry/app.74ab585c.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.cb6fbcaa.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
