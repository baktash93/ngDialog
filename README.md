# ngDialog

A minimalistic, easy to use, and easy to customize, dialog module fully compatible with AngularJS 1.x.x.

Installation
-
    
- Install via bower

        bower install baktash93/ngDialog
        
- Include the `ngDialog.js` file into your page via a `script` tag (_after loading `angular` of course_)
- Load the `theme-default.css` stylesheet into your web page, found under `/dist/css/theme-default.css` path in the `ngDialog` folder
- Add `ngDialog` as a dependency to your AngularJS's main module
- Inject `ngDialog` service to your controller
    
Usage
-
The `ngDialog` service exposes the following methods for showing/hiding dialogs.

####1. `show(options)`

The `show` method enables you to pop a dialog with a set of required `options` which are as follows:
 - `template`
   The template property can be used to provide an HTML _template_ for the inner content of the dialog that you'd want to display.
   _Note that the wrapping element in the template should have the `ng-dialog-content` class._
   
 - `templateUrl`
   Used to load a template from a relative path
   
 - `controller`
   The name of a registered controller that the dialog may consume
   
 - `locals`
   An optional object for passing in any values, variables, or any other objects to be used within the scope of the dialog controller instance
   
 - `type`
   Needed for wiring the CSS styles and animations to the dialog. Defaults to `default` which renders the dialog with a _fade in and scale_ effect. 
   Other possible values are as follows:
   
     1. `full-screen`
     2. `sticky-top`
     3. `window`
     
    _See credits below for the original source for animations and theming._

Note: This method returns a promise.

####2. `hide(returnData)`
   Hides the dialog with returning the `returnData` to the _resolve_ callback of the promise returned from `.show()` method.
####3. `cancel()`
   Closes the dialog with no further operation by rejecting the original promise created with `.show()`.

Example
-

####Dialog Template

    <div class="ng-dialog-content">
      <h3>Your Fancy Dialog</h3>
      <div>
        <!-- some other content -->
        <button ng-click="closeDialog()">Close me!</button>
      </div>
    </div>


####Code
    angular.module('yourApp', ['ngDialog'])
    .controller('YourMainController', 
      function($scope, ngDialog){
        $scope.openDialog = function(){
          ngDialog.show({
            templateUrl: '/path/to/your/template',
            controller: 'SomeDialogController',
            locals: {
              name: 'Lionel Messi',
              occupation: 'Athlete'
            }
          }).then(function(returnedData){
            // do some stuff with returned data
          });
      }
    })
    .controller('SomeDialogController', 
      function($scope, ngDialog){
        var someData = { ... };
        $scope.closeDialog = function(){
          ngDialog.hide(someData);
        }
    });
    
[Demo]()
-

Clone the repo to observe a basic implementation of the `ngDialog` module.

Customizing with _Stylus_

...

Credits
-
Original theme and the animation effects was inspired from a [post by Mary Lou](http://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/) at _tympanus.net_.

License
-
MIT
