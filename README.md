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

grunt.loadNpmTasks('jshint-html-reporter');
grunt.registerTask('default', ['jshint']);
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Adrian Pietka](http://adrian.pietka.info)

## Release History

* 0.1.0 Initial release