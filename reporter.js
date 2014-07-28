"use strict";

module.exports = {
    reporter: function (result) {
        var fs = require('fs');
        var path = require('path');

        var content = "";
        var previousFile = "";

        var basePath = path.join(__dirname);
        var templatePath = basePath + '/templates/bootstrap/';

        var template = fs.readFileSync(templatePath + 'template.html').toString();
        var item = fs.readFileSync(templatePath + 'item.html').toString();
        var header = fs.readFileSync(templatePath + 'header.html').toString();

        result.forEach(function (element) {
            var file = element.file;
            var error = element.error;
            var isError = error.code && error.code[0] === 'E';

            if (previousFile !== file) {
                previousFile = file;
                content += header.replace('{file}', file);
            }

            content += item.replace("{class}", isError ? "danger" : "warning")
                .replace("{code}", error.code)
                .replace("{line}", error.line)
                .replace("{character}", error.character)
                .replace("{evidence}", error.evidence)
                .replace("{reason}", error.reason);
        });

        var view = template.replace('{content}', content);

        process.stdout.write(view);
    }
};