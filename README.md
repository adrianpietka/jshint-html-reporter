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

## URLs

* [jshint-html-reporter on npmjs](https://www.npmjs.org/package/jshint-html-reporter)
* [jshint-html-reporter on github](https://github.com/adrianpietka/jshint-html-reporter)

## Author

Adrian Pietka

* [http://adrian.pietka.me](http://adrian.pietka.me)
* [adrian@pietka.me](mailto:adrian@pietka.me)

## License

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0) &copy; Adrian Pietka

## Release History

* 0.2.4 Using HTTPS protocol for Bootstrap CDN url
* 0.2.3 Changed license to CC 4.0
* 0.2.2 HTTP protocol removed from Bootstrap CDN url
* 0.2.1 Properly escape content for HTML output
* 0.2.0 Summary of results and code refactor
* 0.1.3 Improvements in package.json
* 0.1.2 Improvements in package.json and template
* 0.1.1 Fixes for path of template files
* 0.1.0 Initial release
