module.exports = function (grunt) {

    grunt.initConfig({
        angularFileLoader: {
            options: {
                scripts: [
                    'app/**/*.js',
                    'vendor/angular/angular.js',
                    'vendor/angular-route/angular-route.js',
                    'vendor/angular-resource/angular-resource.js'
                ]
            },
            your_target: {
                src: ['index.html']
            },
        },
    });

    grunt.loadNpmTasks('grunt-angular-file-loader');

    grunt.registerTask('default', ['angularFileLoader']);

};