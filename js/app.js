document.addEventListener('deviceready', function(){
    StatusBar.backgroundColorByHexString('#1A237E');
});

/* Angular Location Update */
!function(n){"use strict";n.module("ngLocationUpdate",[]).run(["$route","$rootScope","$location",function(n,t,o){o.update_path=function(c,u){if(o.path()!=c){var a=n.current;t.$on("$locationChangeSuccess",function(){a&&(n.current=a,a=null)}),o.path(c),u||o.replace()}}}])}(window.angular);
var currentContent = 'A';
var apps = angular.module('pepakq', ['ngMaterial', 'ngRoute', 'ngMdIcons', 'ngLocationUpdate']);
apps.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'view/homeLayout.html',
        controller: 'homeCtrl'
    }).when('/materi/:bab', {
        templateUrl: 'view/mainMateriView.html',
        controller: 'materiCtrl',
        reloadOnSearch: false
    }).when('/about', {
        templateUrl: 'view/aboutLayout.html',
        controller: 'aboutCtrl'
    });
});

apps.controller('homeCtrl', function($scope, $http, $log, $location) {
    $scope.hello = 'Selamat Datang';   
    // Menu
    $scope.menuUrls = [
  		{'value':'About', 'url':'#about'}
  	];
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    $scope.goto = function(path) {
      $location.update_path(path, true);
    };
});


apps.controller('materiCtrl', function($scope, $http, $q, $log, $timeout, $mdSidenav, $routeParams, $mdDialog) {
    $scope.isParibasan = false;
    $scope.toggleLeft = buildDelayedToggler('left');
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }, 200);
    }
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      }
    }
    
    /* AutoComplete */
    $scope.datas;
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;
    
    function querySearch (query) {
      var results = query ? $scope.datas.filter( createFilterFor(query) ) : $scope.datas,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
    }

    function selectedItemChange(item) {
    }
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item[Object.keys(item)[0]].search(lowercaseQuery) !== -1);
      };

    }
    
    var materi = $routeParams.bab;
    if (materi == 'anak_kewan') {
        $scope.anaks;
        $http.get("materi/anake_kewan.json", { cache: true}).then(function (response) {
          $scope.anaks = response.data;
          $scope.datas = $scope.anaks;
        });
        $scope.materiTitle = "Arane Anak Kewan";
        $scope.materiurl = "view/anakKewanMateri.html";
    } else if (materi == 'gamane_kewan') {
        $scope.gamane;
        $http.get("materi/gamane_kewan.json", { cache: true}).then(function (response) {
          $scope.gamane = response.data;
          $scope.datas = $scope.gamane;
        });
        $scope.materiTitle = "Arane Gamane Kewan";
        $scope.materiurl = "view/gamaneKewanMateri.html";
    } else if (materi == 'swarane_kewan' ) {
        $scope.swarane;
        $http.get("materi/swarane_kewan.json", { cache: true}).then(function (response) {
          $scope.swarane = response.data;
          $scope.datas = $scope.swarane;
        });
        $scope.materiTitle = "Arane Swarane Kewan";
        $scope.materiurl = "view/swaraKewanMateri.html";
    } else if (materi == 'rupane_kewan') {
        $scope.rupane;
        $http.get("materi/rupane_kewan.json", { cache: true}).then(function (response) {
          $scope.rupane = response.data;
          $scope.datas = $scope.rupane;
        });
        $scope.materiTitle = "Arane Rupane Kewan";
        $scope.materiurl = "view/rupaneKewanMateri.html";
    } else if (materi == 'mangane_kewan') {
        $scope.mangane;
        $http.get("materi/mangan_kewan.json", { cache: true}).then(function (response) {
          $scope.mangane = response.data;
          $scope.datas = $scope.mangane;
        });
        $scope.materiTitle = "Arane Mangane Kewan";
        $scope.materiurl = "view/manganeKewanMateri.html";
    } else if (materi == 'tingkahe_kewan') {
        $scope.tingkahe;
        $http.get("materi/tingkahe_kewan.json", { cache: true}).then(function (response) {
          $scope.tingkahe = response.data;
          $scope.datas = $scope.tingkahe;
        });
        $scope.materiTitle = "Arane Tingkahe Kewan";
        $scope.materiurl = "view/tingkaheKewanMateri.html";
    } else if (materi == 'aksara') {
        $scope.materiTitle = "Aksara Jawa";
        $scope.materiurl = "view/aksaraMateri.html";
    } else if (materi == 'paribasan') {
        $scope.isParibasan = true;
        $scope.materiTitle = "Paribasan";
        $scope.materiurl = "view/paribasanMateri.html";
        $scope.scrollPosition = currentContent;
    } else if (materi == 'kosok_balen') {
        $scope.kosokbalen;
        $http.get("materi/kosok_balen.json", { cache: true}).then(function (response) {
          $scope.kosokbalen = response.data;
          $scope.datas = $scope.kosokbalen;
        });
        $scope.materiTitle = "Tembung Kosok Balen";
        $scope.materiurl = "view/kosokBalenMateri.html";
    } else if (materi == 'saroja') {
        $scope.materiTitle = "Tembung Saroja";
        $scope.materiurl = "view/sarojaMateri.html";
    } else if (materi == 'entar') {
        $scope.entar;
        $http.get("materi/tembung_entar.json", { cache: true}).then(function (response) {
          $scope.entar = response.data;
          $scope.datas = $scope.entar;
        });
        $scope.materiTitle = "Tembung Entar";
        $scope.materiurl = "view/entarMateri.html";
    } else if (materi == 'kerajaaan_satrya') {
        $scope.satrya;
        $http.get("materi/jeneng_kesatrya.json", { cache: true}).then(function (response) {
          $scope.satrya = response.data;
          $scope.datas = $scope.satrya;
        });
        $scope.materiTitle = "Jeneng Kesatrya";
        $scope.materiurl = "view/jenengKesatryaMateri.html";
    }
    
    $scope.menuGrid = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'view/gridMenu.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
      };
      
     function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
    
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
    
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
        
        $scope.scrollTo = function(l) {
            
            b = ['A', 'B', 'C', 'D', 'E', 'G', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y'];
            if (l == 'A') {
                $('md-content.flex').scrollTop(0);
                console.log('we here ' + l);
            } else {
                var total = 0;
                c = b.indexOf(l);

                for (i=0;i<c;i++) {
                    console.info(c);
                    if (c > 5) {
                        
                        total += 30;
                    }
                    total += parseInt($('#'+ b[i]).height());
                } 
                console.log(total);
                $('md-content.flex').scrollTop(total);
            }
            $mdDialog.cancel();
        }
      }
    
});

apps.controller('aboutCtrl', function($scope, $http, $log, $mdSidenav) {
    $scope.materiTitle = "About Developer";  

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    /* Sidenav */
    $scope.toggleLeft = buildDelayedToggler('left');
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
});