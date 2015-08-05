# grunt-moonscript

Reference: https://code.mattcampbell.net/moonscript-template/commit/f4f349d283834902664fb0027c144fd2ac2fc29d/

Example:

```
moonscript:
	build:
		files: [
			expand: yes
			cwd: "moon/"
			src: "*.moon"
			dest: "lua/"
			ext: ".lua"
		]
```

## License
Copyright (c) 2015 neutra
Licensed under the MIT license.
