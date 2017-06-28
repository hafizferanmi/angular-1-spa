var app = angular.module('myApp', ["ngRoute"])
    // .constant(path, '../../coppa')

.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            template: '<p> This is the index page </p>',
            templateUrl: "this is the index page"
        })
        .when("/join", {
            templateUrl: "join.html"
        })
        .when("/create", {
            templateUrl: "create-thread.html"
        })
        .when("/show", {
            templateUrl: "show.html",
        })
        .when("/login", {
            templateUrl: "login.html"
        })
        .when('/profile', {
            templateUrl: 'profile.html'
        })
        .when('/home', {
            templateUrl: 'home.html'
        })
        .when("/users", {
            templateUrl: 'users.html'
        })
        .when('/:title', {
            templateUrl: 'title.html'
        })

    .otherwise({
        redirectTo: "/login"
    });
})

.controller('loginCtrl', function($scope, $http, $rootScope) {
    $scope.check = false;
    $rootScope.loggedIn = true;

    $scope.login = function() {

        console.log('another');
        // if ($scope.user == 'protocall' & $scope.password == 'protocall') {
        //     $rootScope.loggedIn = true;
        //     $location.path('/home')
        // } else {
        //     alert('nothing');
        // }

        // $http.post("localhost/hozii/add")
        //     .then(function(response) {
        //         alert(response);
        //     });


    }
})

.controller('homeCtrl', function($scope, $http) {
    // alert('this is the first home landing page of the website');
    $http.get("/post")
        .then(function(response) {
            alert(response);
        });
})

.controller('joinCtrl', function($scope, $http) {
    $scope.join = function() {
        var path = '../../coppa/';
        $http.get(path + "/show")
            .then(function(response) {
                console.log(response.data);
            });

    }
})

.controller('createCtrl', function($scope, $http) {
    $scope.create = function() {
        alert('this is the create thread controller');
    }
})

.controller('show-post', function($scope, $http, $location, $timeout) {
    $scope.show_post = function() {
        var path = '../../coppa/';
        $http.get(path + "/show")
            .then(function(response) {
                $scope.posts = response.data;
                $timeout(function() {
                    $scope.posts = response.data;
                }, 1000);

            });


    }
    $scope.show = function(post_title) {
        $location.path('/' + post_title);
        // console.log($location);
    }


})

.controller('title', function($scope, $http, $location, $routeParams) {
    $scope.title = $routeParams.title;
    var path = '../../coppa/';
    $http.get(path + "/show/" + $scope.title)
        .then(function(response) {
            $scope.post_desc = response.data;


        });
})

.controller('userCtrl', function($scope, $http) {
    var path = '../../coppa/';
    $http.get(path + "mayfollow")
        .then(function(response) {
            console.log(response);
            $scope.users = response.data;
        });

    $http.get(path + "isfollowing")
        .then(function(response) {
            console.log(response.data);
            $scope.following = response.data;
        });

    $scope.follow = function(username) {
        alert(username);
        $http.post(path + "follow/" + username)
            .then(function(response) {
                alert(response);
                // $scope.users = response.data;
            });
    }

    $scope.unfollow = function(username) {
        alert(username);
        $http.post(path + "unfollow/" + username)
            .then(function(response) {
                alert(response);
                // $scope.users = response.data;
            });
    }
});
