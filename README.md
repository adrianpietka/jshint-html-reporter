jshint-html-reporter
====================

Simple generator of HTML report for JSHint results.

## Installation

```bash
$: npm install jshint-html-reporter --save
```

## Usage

Use it with:

#### JSHint CLI

```
jshint --reporter node_modules/jshint-html-reporter/reporter.js file.js
```

#### [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)

```js
grunt.initConfig({
	jshint: {
		options: {
			reporter: require('jshint-html-reporter'),
			reporterOutput: 'jshint-report.html'
		},
		target: ['file.js']
	}
});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.registerTask('default', ['jshint']);
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Adrian Pietka](http://adrian.pietka.info)

## Release History

* 0.2.1 Properly escape content for HTML output
* 0.2.0 Summary of results and code refactor
* 0.1.3 Improvements in package.json
* 0.1.2 Improvements in package.json and template
* 0.1.1 Fixes for path of template files
* 0.1.0 Initial release
