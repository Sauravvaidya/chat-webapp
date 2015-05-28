// var requirejs = require('././node_modules/requirejs/bin/r.js');
// requirejs('angular-ui-router');

angular
  .module('starterApp', [
    'ngMaterial',
    'users',
    'firebase',
    'ui.router'
  ])
  .controller('appController', function($scope) {
    console.log($scope);
  })

  .config(function ($mdThemingProvider, $mdIconProvider, $locationProvider, $urlRouterProvider, $stateProvider){
    // $locationProvider.html5Mode(true);

    // $urlRouterProvider.otherwise("/login")

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'src/users/view/login.html'
      })
      .state('chat', {
        url: '/chat',
        templateUrl: 'src/users/view/chat.html'
      });

    // console.log('hahaha');

    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu"       , "./assets/svg/menu.svg"        , 24)
      .icon("share"      , "./assets/svg/share.svg"       , 24)
      .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
      .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
      .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
      .icon("phone"      , "./assets/svg/phone.svg"       , 512);

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
  });