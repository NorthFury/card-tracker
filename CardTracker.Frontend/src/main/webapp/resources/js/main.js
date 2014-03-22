requirejs.config({
    baseUrl: 'resources/js/module',
    shim: {
        'jqueryui': {
            exports: '$.widget',
            deps: ['jquery']
        },
        'amplify': {
            exports: 'amplify'
        }
    },
    paths: {
        'app': 'resources/js/app',
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min',
        'jquery.ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        'amplify': '//cdnjs.cloudflare.com/ajax/libs/amplifyjs/1.1.0/amplify.min'
    }
});

define("crypto", [], function () {
    return Crypto;
});
