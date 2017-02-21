var appRoot = 'src/';
var outputRoot = 'dist/';
var outputTestsRoot = 'dist-test/'
var testRoot = 'tests/';
module.exports = {
    root: appRoot,
    source: appRoot + '**/*.ts',
    jsonSource: appRoot + '**/*.json',
    output: outputRoot,
    testOutput: outputTestsRoot,
    dtsSrc: [
        './typings/**/*.d.ts',
        './custom_typings/**/*.d.ts',
        './src/**/*.d.ts'
    ],
    testSrc: testRoot + '**/*.ts',
}