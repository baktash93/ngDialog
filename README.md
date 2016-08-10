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
 - ___`template`___
   The template property can be used to provide an HTML _template_ for the inner content of the dialog that you'd want to display.
   _Note that the wrapping element in the template should have the `ng-dialog-content` class._
   
 - ___`templateUrl`___
 - 
   Used to load a template from a relative path
   
 - ___`controller`___
 - 
   The name of a registered controller that the dialog may consume
   
 - ___`locals`___
 - 
   An optional object for passing in any values, variables, or any other objects to be used within the scope of the dialog controller instance
 
 - ___`width`___
 
   Optional, sets the width of the dialog to an arbitrary value.
 - ___`type`___
 - 
   Needed for wiring the CSS styles and animations to the dialog. Defaults to `default` which renders the dialog with a _fade in and scale_ effect. 
   Other possible values are as follows:
   
     1. `full-screen`: With an opaque overlay taking whole screen
     2. `sticky-top`: Sticks to the top with transparent overlay
     3. `window`: Opaque overlay with the dialog covering roughly the whole screen
     4. `slide-right`: Smooth sliding animation for the dialog-content
     
    _See credits below for the original source for animations and theming._

Note: This method returns a promise.

####2. `hide(returnData)`
   Hides the dialog with returning the `returnData` to the _resolve_ callback of the promise returned from `.show()` method.
####3. `cancel()`
   Closes the dialog with no further operation by rejecting the original promise created with `.show()`.

Example
-

####_Dialog Template_

    <div class="ng-dialog-content">
      <h3>Your Fancy Dialog</h3>
      <div>
        <!-- some other content -->
        <button ng-click="closeDialog()">Close me!</button>
      </div>
    </div>


####_Code_

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

Customization with _Stylus_
-

The CSS for the dialogs is created with [Stylus](https://github.com/stylus) in view of bringing control over the appearance of the dialog in a dynamic approach. However, do note that changing the appearance is fully possible with plain CSS as well by applying your own styles to any of the following CSS class selectors: 

* `ng-dialog`
* `ng-dialog-content`
* `ng-dialog-overlay`

To incorporate your own theme using Stylus, you'll need to install Stylus globaly:

    npm install -g stylus

Or if you're comfortable with _gulp_, install the `gulp-stylus` plugin and use it to compile your `.styl` theme file.

There is a set of pre-defined Stylus variables which you can set to fit in any custom appearance to the dialog. Once set, compile your `.styl` file with Stylus, then load the compiled CSS into your page and you're done.

The following enlists the pre-defined properties which you can also find under the `theme-default.styl` Stylus file located in `dist/css` folder.

 * _`dialog-overlay-background`_
 
    Background for the transparent overlay. Using `rgba` is recommended.
 * _`dialog-overlay-background-opaque`_
 
    Background for the opaque type of overlays (i.e. `window` and `full-screen` types).
 * _`dialog-color`_
 
    The CSS `color` property for the super-parent `ng-dialog` CSS class.
 * _`dialog-heading-color`_
 
    Optional CSS `color` property for the dialog heading.
 * _`dialog-heading-background`_
 
    Dialog heading CSS `background` property.
 * _`dialog-heading-border-radius`_
 * _`dialog-content-color`_
    
    Optional CSS `color` property for the dialog content block.
 * _`dialog-content-background`_
  
    CSS `background` property for the dialog content box.
 * _`dialog-content-border-radius`_
  
    Optional `border-radius` property for the dialog content box.
 * _`dialog-font-family`_
    
    CSS `font-family` property for the whole dialog.
 * _`dialog-font-size`_
 
    CSS `font-size` property.
 * _`dialog-button-color`_
    
    Optional CSS `color` property for the buttons in the dialog.
 * _`dialog-button-background`_
    
    CSS `background` property for the dialog buttons (_Also affects the `close` button_).
 * _`dialog-button-hover-background`_
    
    Optional CSS `background` property when a dialog button is hovered (_Also affects the `close` button_).

####Important:

For the above set properties to take effect, along with animations to work, do import the files `ngDialog.styl` and `ngDialogFX.styl` in your theme Stylus file as such:

    ...
    @import ngDialog
    @import ngDialogFX
 

Credits
-
Original theme and the animation effects was inspired from a [post by Mary Lou](http://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/) at _tympanus.net_.

License
-
MIT
