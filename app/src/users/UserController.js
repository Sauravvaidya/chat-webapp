(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$firebaseArray', '$scope', '$state',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $log, $q, $firebaseArray, $scope, $state) {
    var self = this;

    self.selected     = {};
    self.user         = {};
    self.chatMessages = [ ];
    self.userChatMessages = [ ];
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.sendMessage  = sendMessage;
    self.toggleList   = toggleUsersList;
    self.loadDataFromFirebase = loadDataFromFirebase;
    self.share        = share;

    // self.signIn = signIn;
    $scope.signIn = function signIn(){
      $state.go('chat');
    };

    var firebaseURL = 'https://amber-heat-630.firebaseio.com/';

    // list.add({foo: 'bar'});

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            // self.selected = users[0];  no default selection
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    var list;
    function loadDataFromFirebase () {
      var conversationId = self.user.name+'-'+self.selected.name;
      console.log(conversationId);

      list = $firebaseArray(new Firebase(firebaseURL + conversationId));
      list.$loaded().then(function(data) {
        if(data.length > 0) {
          angular.forEach(data, function(obj) {
            // console.log(obj);
            self.chatMessages = self.chatMessages.concat(obj);
          })
          // console.log(self.chatMessages);
        }
      });
    }
    
    function selectUser ( user ) {

      self.chatMessages = [];
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
      self.toggleList();
      self.loadDataFromFirebase();
      // console.log(self.selected);
    }

    function sendMessage () {
      // console.log(self.user.message);
      list.$add({ message: self.selected.message}).then(function(ref) {

        // var key = ref.key();
        // console.log(key);
        // var record = list.$getRecord(key);
        // console.log('record added was: '+ record);
        //list.$getRecord(key);
        self.chatMessages = [];
        self.selected.message = '';
        self.loadDataFromFirebase()

      });

      var toUserList = $firebaseArray(new Firebase (firebaseURL + self.user.name));
      toUserList.$add({ from: self.selected.name, message: self.selected.message}).then(function(ref) {

      });
      self.userChatMessages = [];
      toUserList.$loaded().then(function (data) {
        if(data.length > 0) {
          angular.forEach(data, function (obj) {
            self.userChatMessages = self.userChatMessages.concat(obj);
          })
        }
      })

      //input field is empty after the message has been sent
    }

    function userSendMessage () {

      var conversationId = self.user.name +'-'+ self.user.sendTo;
      var fromUserList = $firebaseArray(new Firebase (firebaseURL + conversationId));
      fromUserList.$add({ from: self.user.name, message: self.user.message}).then(function(ref) {

      })
      fromUserList.$loaded().then(function (data) {
        if(data.length > 0) {
          angular.forEach(data, function (obj) {
            self.chatMessages = self.chatMessages.concat(obj);
          })
        }
      })

    }

    /**
     * Show the bottom sheet
     */
    function share($event) {
        var user = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: '/app/src/users/view/contactSheet.html',
          controller: [ '$mdBottomSheet', UserSheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function UserSheetController( $mdBottomSheet ) {
          this.user = user;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
