export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/.DS_Store","assets/escalera.svg","assets/maletin.svg","assets/matrioska.jpeg","favicon.png"]),
	mimeTypes: {".svg":"image/svg+xml",".jpeg":"image/jpeg",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.e6bb87ff.js","app":"_app/immutable/entry/app.987daabd.js","imports":["_app/immutable/entry/start.e6bb87ff.js","_app/immutable/chunks/index.57496350.js","_app/immutable/chunks/singletons.9119dc3a.js","_app/immutable/chunks/index.29d22139.js","_app/immutable/entry/app.987daabd.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.57496350.js"],"stylesheets":[],"fonts":[]},
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
