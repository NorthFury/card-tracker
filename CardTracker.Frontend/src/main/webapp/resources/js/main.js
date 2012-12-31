requirejs.config({
    //By default load any module IDs from js/module
    baseUrl: 'resources/js/module',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: 'resources/js/app'
    }
});

define("amplify", [], function () {
    return amplify;
});
define("underscore", [], function () {
    return _;
});
define("crypto", [], function () {
    return Crypto;
});
