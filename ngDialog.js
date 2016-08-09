'use strict';

angular.module('ngDialog', [])
.service('ngDialog', function($rootScope, $compile, $timeout, $http, $q){
    var scope,
    dialogDeferred,
    hideCallback;

    function compileDialogTemplate(template, options){
        var scope = $rootScope.$new(),
        parent = options.parent ? options.parent : 'body',
        type = options.type ? options.type : "default";
        setScopeLocals(scope, options.locals);

        var dialog = document.createElement('ng-dialog'),
        dialogContent = document.createElement('ng-dialog-content');
        dialog.setAttribute('type', type);
        dialog.appendChild(dialogContent);
        dialogContent.setAttribute('controller', options.controller);
        dialogContent.innerHTML = template;

        var compiledDialog = $compile(dialog)(scope);
        document.querySelector(parent).appendChild(compiledDialog[0]);
        $timeout(function(){
            angular.element(compiledDialog).children('.ng-dialog').addClass('ng-dialog-fx-' + type)
            setTimeout(function(){
                angular.element(compiledDialog).children('.ng-dialog').addClass('ng-dialog-show');
            }, 100);
        }, 25);
    }

    function setScopeLocals(scope, locals) {
        if(locals){
            for (var key in locals) {
                if (locals.hasOwnProperty(key)) {
                    scope[key] = locals[key];
                }
            }
        }
    }

    return {
        show: function(options){
            dialogDeferred = $q.defer();
            if(options.templateUrl) {
                $http.get(options.templateUrl)
                .then(function(response) {
                    compileDialogTemplate(response.data, options);
                });
            } else if (options.template) {
                compileDialogTemplate(options.template, options);
            }
            return dialogDeferred.promise;
        },
        hide: function(data){
            dialogDeferred.resolve(data);
            hideCallback.call(this);
        },
        cancel: function(){
            dialogDeferred.reject();
            hideCallback.call(this);
        },
        initHideCallback: function(callback){
            hideCallback = callback;
        }
    };
})
.factory('ngDialogTemplate', function(){
    return {
        "default": "<div class=\"ng-dialog\">"
            + "<a class=\"close-sign-box\" href=\"\" ng-click=\"ngDialogCtrl.close()\"><span class=\"close-sign\"></span></a>"
            + "<div ng-transclude></div>"
            + "</div>"
            + "<div class=\"ng-dialog-overlay\"></div>"
            ,
        "sticky-top": "<div class=\"ng-dialog\">"
            + "<a class=\"close-sign-box\" href=\"\" ng-click=\"ngDialogCtrl.close()\"><span class=\"close-sign\"></span></a>"
            + "<div ng-transclude></div>"
            + "</div>"
            + "<div class=\"ng-dialog-overlay\"></div>"
            ,
        "slide-right": "<div class=\"ng-dialog\">"
            + "<div ng-transclude></div>"
            + "<a class=\"close-sign-box\" href=\"\" ng-click=\"ngDialogCtrl.close()\"><span class=\"close-sign\"></span></a>"
            + "</div>"
            + "<div class=\"ng-dialog-overlay\"></div>"
            ,
        "window": "<div class=\"ng-dialog\">"
            + "<div ng-transclude></div>"
            + "<a class=\"close-sign-box\" href=\"\" ng-click=\"ngDialogCtrl.close()\"><span class=\"close-sign\"></span></a>"
            + "</div>"
            + "<div class=\"ng-dialog-overlay\"></div>"
            ,
        "full-screen": "<div class=\"ng-dialog\">"
            + "<div ng-transclude></div>"
            + "<a class=\"close-sign-box\" href=\"\" ng-click=\"ngDialogCtrl.close()\"><span class=\"close-sign\"></span></a>"
            + "</div>"
            + "<div class=\"ng-dialog-overlay\"></div>",
    };
})
.directive('ngDialog', ['ngDialogTemplate', function(ngDialogTemplate){
    return {
        restrict: 'E',
        transclude: true,
        controllerAs: 'ngDialogCtrl',
        controller: ['$scope', '$timeout', 'ngDialog', function($scope, $timeout, ngDialog){
            var vm = this;
            vm.close = function(){
                var dialog = document.querySelector('ng-dialog');
                angular.element(dialog).children('.ng-dialog').removeClass('ng-dialog-show');
                $timeout(function(){
                    dialog.parentNode.removeChild(dialog);
                }, 450);
                console.log('closing...');
            };

            ngDialog.initHideCallback(vm.close);
        }],
        template: function(elem, attrs){
            return ngDialogTemplate[attrs.type];
        }
    }
}])
.directive('ngDialogContent', function(){
    return {
        transclude: true,
        require: ['?controller', '?^ngDialog'],
        controller: '@',
        name: "controller",
        link: function(scope, iElement, attrs, ctrls){},
        template: "<div ng-transclude></div>"
    };
});
