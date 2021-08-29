// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "@angular-devkit/build-angular"],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-spec-reporter"),
            require("karma-jasmine-html-reporter"),
            require("karma-coverage-istanbul-reporter"),
            require("@angular-devkit/build-angular/plugins/karma"),
        ],
        client: {
            jasmine: {
                random: false,
                seed: '4321',
                oneFailurePerSpec: true,
                failFast: false,
                timeoutInterval: 1000
            },
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: require("path").join(__dirname, "../coverage"),
            reports: ["html", "lcovonly"],
            fixWebpackSourcePaths: true,
        },
        specReporter: {
            random: false,
            maxLogLines: 5, // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false, // do not print information about failed tests
            suppressPassed: false, // do not print information about passed tests
            suppressSkipped: true, // do not print information about skipped tests
            showSpecTiming: false, // print the time elapsed for each spec
        },
        reporters: ["spec"],
        port: 4567,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["ChromeHeadlessNoSandbox"],
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: "ChromeHeadless",
                flags: ["--no-sandbox", "--disable-web-security"],
            },
        },
        failOnEmptyTestSuite: false,
    });
};
