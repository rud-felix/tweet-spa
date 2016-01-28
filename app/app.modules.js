'use strict';

// Main module which included in index.html
var appModule = angular.module("appModule",
    ['messageModule', 'userModule', 'securityModule']
);

var securityModule  = angular.module('securityModule', ['ngRoute', 'ngResource']);
var messageModule   = angular.module('messageModule', ['ngRoute', 'ngResource']);
var userModule      = angular.module('userModule', ['ngRoute', 'ngResource']);
