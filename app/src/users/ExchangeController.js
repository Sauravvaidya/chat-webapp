angular
  .module('exchange', [
    'ngMaterial',
    'users',
    'ui.router'
  ])
  .controller('ExchangeController', function($scope, $rootScope, $state, $http) {
    $scope.user = {
      mg: {},
      wu: {}
    };
    var mgConfig = {
      method: 'GET',
      url: 'https://secure.moneygram.com/rest/sendMoney/receiveOptions/inPerson/USA/USD/NPL'
    }
    $http(mgConfig)
      .success(function(data) {
        $scope.user.mg.exchangeRate = data[0].receiveOptions[0].exchangeRate;
        // console.log($scope.mgData);
      })
      .error(function(data) {
        console.log('Request to MoneyGram failed!');
      });

    var wuSessionConfig = {
      method: 'POST',
      url: 'https://www.westernunion.com/wuconnect/rest/api/v1.0/CreateSession',
      data: {
        "device": {
          "id": "",
          "type": "WEB"
        },
        "channel": {
          "name": "Western Union",
          "type": "WEB",
          "version": "9Z00"
        },
        "external_reference_no": "1",
        "security": {
          "black_box_data": {
          },
          "client_ip": "245024209201"
        },
        "bashPath": "/us/en/"
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }

    var wuConfig = {
      method: 'POST',
      url: 'https://www.westernunion.com/wuconnect/rest/api/v1.0/FeeInquiryEstimated',
      data: {
        "security":{
          "session":{
          },
          "client_ip":"159182183006"
        },
        "external_reference_no":"1",
        "origination_channels":{
          "channel":[
            {
              "type":"AGT"
            }
          ]
        },
        "reference_location":{
          "address":{
            "postal_code":"80224",
            "country_iso_code":"NP"
          }
        },
        "payment_details":{
          "origination":{
            "principal_amount":"500.00",
            "currency_iso_code":"USD",
            "country_iso_code":"US"
          },
          "destination":{
            "currency_iso_code":"NPR",
            "country_iso_code":"NP"
          },
          "payment_type":"ALL"
        },
        "inquiry_type":"MONEY_TRANSFER_FEE",
        "inquiry_accuracy":"ESTIMATED",
        "version":2,
        "bashPath":"/us/en/"
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }

    $http(wuSessionConfig)
      .success(function(session) {
        // console.log(data);
        wuConfig.data.security.session.id = session.security.session.id;

        $http(wuConfig)
          .success(function(data) {
            $scope.user.wu.exchangeRate = data.serviceOptions.serviceOption.AGT.AG[0].paymentDetails.exchangeRate;
          })
      })
      .error(function(data) {
        console.log('Request to WU session failed!');
      });

    $scope.calculateTotal = function() {
      $scope.user.mg.total = $scope.user.mg.exchangeRate * $scope.user.amount;
      $scope.user.wu.total = $scope.user.wu.exchangeRate * $scope.user.amount;
      $scope.user.diff = Math.abs($scope.user.mg.total-$scope.user.wu.total);
    }
  });