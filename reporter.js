'use strict';

module.exports = {
    reporter: function (result) {
        var fs = require('fs');
        var path = require('path');

        var templates = {
            body: '',
            item: '',
            itemHeader: '',
            noItems: '',
            summary: ''
        };

        var numberOfFailures = {
            failures: 0,
            errors: 0,
            warnings: 0
        };

        function init() {
            loadTemplates();
            calculateNumberOfFailures();
            process.stdout.write(getRenderedHTML());
        }

        function calculateNumberOfFailures() {
            numberOfFailures.failures = result.length;

            result.forEach(function (element) {
                if (isError(element.error.code)) {
                    numberOfFailures.errors += 1;
                } else {
                    numberOfFailures.warnings += 1;
                }
            });
        }

        function isError(errorCode) {
            return errorCode && errorCode[0] === 'E';
        }

        function loadTemplates() {
            var templatePath = path.join(__dirname) + '/templates/bootstrap/';

            for (var template in templates) {
                templates[template] = fs.readFileSync(templatePath + template + '.html').toString();
            }
        }

        function prepareContent() {
            var content = '';
            var previousFile = '';

            if (result.length === 0) {
                return templates.noItems;
            }

            result.forEach(function (element) {
                var file = element.file;
                var error = element.error;

                if (previousFile !== file) {
                    previousFile = file;
                    content += templates.itemHeader.replace('{file}', file);
                }

                content += templates.item.replace('{class}', isError(error.code) ? 'danger' : 'warning')
                    .replace('{code}', error.code)
                    .replace('{line}', error.line)
                    .replace('{character}', error.character)
                    .replace('{evidence}', error.evidence)
                    .replace('{reason}', error.reason);
            });

            return content;
        }

        function prepareSummary() {
            var summary = templates.summary.replace('{failures}', numberOfFailures.failures)
                .replace('{errors}', numberOfFailures.errors)
                .replace('{warnings}', numberOfFailures.warnings);

            return numberOfFailures.failures ? summary : '';
        }

        function getRenderedHTML() {
            return templates.body
                .replace('{content}', prepareContent())
                .replace('{summary}', prepareSummary());
        }

        init();
    }
};
