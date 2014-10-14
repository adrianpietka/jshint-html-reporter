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

        function escapeHtml(string) {
            if (!string) {
                return string;
            }

            return ("" + string)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/@/g, '&#64;')
                .replace(/\$/g, '&#36;')
                .replace(/\(/g, '&#40;')
                .replace(/\)/g, '&#41;')
                .replace(/\{/g, '&#123;')
                .replace(/\}/g, '&#125;')
                .replace(/\[/g, '&#91;')
                .replace(/\]/g, '&#93;')
                .replace(/\+/g, '&#43;')
                .replace(/=/g, '&#61;')
                .replace(/`/g, '&#96;')
                .replace(/\,/g, '&#44;')
                .replace(/\!/g, '&#33;')
                .replace(/%/g, '&#37;');
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
                    content += templates.itemHeader.replace('{file}', escapeHtml(file));
                }

                content += templates.item
                    .replace('{class}', isError(error.code) ? 'danger' : 'warning')
                    .replace('{code}', escapeHtml(error.code))
                    .replace('{line}', escapeHtml(error.line))
                    .replace('{character}', escapeHtml(error.character))
                    .replace('{evidence}', escapeHtml(error.evidence))
                    .replace('{reason}', escapeHtml(error.reason));
            });

            return content;
        }

        function prepareSummary() {
            if (!numberOfFailures.failures) {
                return '';
            }

            return templates.summary
                .replace('{failures}', escapeHtml(numberOfFailures.failures))
                .replace('{errors}', escapeHtml(numberOfFailures.errors))
                .replace('{warnings}', escapeHtml(numberOfFailures.warnings));
        }

        function getRenderedHTML() {
            return templates.body
                .replace('{content}', prepareContent())
                .replace('{summary}', prepareSummary());
        }

        init();
    }
};
