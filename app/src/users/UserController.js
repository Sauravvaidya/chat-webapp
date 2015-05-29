(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$firebaseArray', '$scope','$rootScope',
          "$firebaseObject",
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $log, $q, $firebaseArray, $scope, $rootScope, $firebaseObject) {
    var self = this;

    self.selected     = {};
    self.user         = {};
    self.chatMessagesWrittenByLoggedInUser = [];
    self.chatMessagesWrittenByFriends = [];
    // self.userChatMessages = [ ];
    self.users        = [];
    self.selectUser   = selectUser;
    self.sendMessage  = sendMessage;
    self.toggleList   = toggleUsersList;
    self.loadDataFromFirebase = loadDataFromFirebase;
    self.share        = share;
    self.loggedInUserAvatar = '';

    var firebaseURL = 'https://amber-heat-630.firebaseio.com/';

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);

            angular.forEach(users, function (user) {
              // console.log(user);
              if(user.name == $rootScope.name) {
                // console.log(user.name);
                self.loggedInUserAvatar = user.avatar;
              }
            })
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
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
      self.toggleList();
      self.loadDataFromFirebase();
      // console.log(self.selected);
    }

    var writtenByLoggedInUserList,
      writtenByFriendsList;

    function loadDataFromFirebase () {
      self.chatMessagesWrittenByLoggedInUser = [];
      // self.chatMessagesWrittenByFriends = [];

      var writtenByLoggedInUserId = $rootScope.name+'-'+self.selected.name,
        writtenByFriendsId = self.selected.name+'-'+$rootScope.name;

      // console.log(conversationId);

      writtenByLoggedInUserList = $firebaseArray(new Firebase(firebaseURL + writtenByLoggedInUserId));
      writtenByLoggedInUserList.$loaded().then(function(data) {
        if(data.length > 0) {
          angular.forEach(data, function(obj) {
            self.chatMessagesWrittenByLoggedInUser = self.chatMessagesWrittenByLoggedInUser.concat(obj);
          })
        }
      });

      writtenByFriendsList = $firebaseArray(new Firebase(firebaseURL + writtenByFriendsId));
      // writtenByFriendsList.$loaded().then(function(data) {
      //   if(data.length > 0) {
      //     angular.forEach(data, function(obj) {
      //       self.chatMessagesWrittenByFriends = self.chatMessagesWrittenByFriends.concat(obj);
      //     })
      //   }
      // });
    }
    
    function sendMessage () {
      // console.log(self.user.message);
      writtenByLoggedInUserList.$add({ messageToFriends: self.selected.message});

      writtenByFriendsList.$add({ messageFromFriends: self.selected.message}).then(function(ref) {

        // var key = ref.key();
        // console.log(key);
        // var record = list.$getRecord(key);
        // console.log('record added was: '+ record);
        //list.$getRecord(key);
        self.selected.message = '';
        self.loadDataFromFirebase()

      });


    }

    // function userSendMessage () {

    //   var conversationId = self.user.name +'-'+ self.user.sendTo;
    //   var fromUserList = $firebaseArray(new Firebase (firebaseURL + conversationId));
    //   fromUserList.$add({ from: self.user.name, message: self.user.message}).then(function(ref) {

    //   })
    //   fromUserList.$loaded().then(function (data) {
    //     if(data.length > 0) {
    //       angular.forEach(data, function (obj) {
    //         self.chatMessages = self.chatMessages.concat(obj);
    //       })
    //     }
    //   })

    // }

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
