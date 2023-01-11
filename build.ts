import { build } from "https://deno.land/x/esbuild/mod.js"

build({
  entryPoints: [
    "./example.ts",
  ],
  bundle: true,
  outfile: "out.js",
  platform: "browser",
  format: "esm",
  plugins: [
    {
      name: "npm",
      setup(build) {
        build.onResolve({
          filter: /^npm:/,
        }, (name) => {
          return {
            path: `https://esm.sh/${name.path.toString().replace("npm:", "")}`,
	    external: true
          }
        })
      },
    },
  ],
})
