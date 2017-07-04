'use strict';

/* Services */

// Define your services here if necessary
var appServices = angular.module('app.services', []);

/**
 * Override default angular exception handler to log and alert info if debug mode
 */
appServices.factory('myDialog',function(){
  return {
    alert:function(that,txt,fn){
      that.openAlert=true;
      that.alert={
        txt:txt,
        sure:function(){
          that.openAlert=false;
          if(fn){
            fn();
          }
        }
      }
    },
    confirm:function(that,title,txt,fn1,fn2){
      that.openConfirm=true;
      that.confirm={
        title:title,
        txt:txt,
        sure:function(){
          that.openConfirm=false;
          if(fn1){
            fn1();
          }
        },
        cancel:function(){
          that.openConfirm=false;
          if(fn2){
            fn2();
          }
        }
      }
    },
    tip:function(that,x,t){
      that.openTip=true;
      that.tip={
        txt:x
      }
      t(function(){
        that.openTip=false;
      },2500);
    }
  }
})
/**
 * Sing Script loader. Loads script tags asynchronously and in order defined in a page
 */
.factory('scriptLoader', ['$q', '$timeout', function($q, $timeout) {

    /**
     * Naming it processedScripts because there is no guarantee any of those have been actually loaded/executed
     * @type {Array}
     */
    var processedScripts = [];
    return {
        /**
         * Parses 'data' in order to find & execute script tags asynchronously as defined.
         * Called for partial views.
         * @param data
         * @returns {*} promise that will be resolved when all scripts are loaded
         */
        loadScriptTagsFromData: function(data) {
            var deferred = $q.defer();
            var $contents = $($.parseHTML(data, document, true)),
                $scripts = $contents.filter('script[data-src][type="text/javascript-lazy"]').add($contents.find('script[data-src][type="text/javascript-lazy"]')),
                scriptLoader = this;

            scriptLoader.loadScripts($scripts.map(function(){ return $(this).attr('data-src')}).get())
                .then(function(){
                    deferred.resolve(data);
                });

            return deferred.promise;
        },


        /**
         * Sequentially and asynchronously loads scripts (without blocking) if not already loaded
         * @param scripts an array of url to create script tags from
         * @returns {*} promise that will be resolved when all scripts are loaded
         */
        loadScripts: function(scripts) {
            var previousDefer = $q.defer();
            previousDefer.resolve();
            scripts.forEach(function(script){
                if (processedScripts[script]){
                    if (processedScripts[script].processing){
                        previousDefer = processedScripts[script];
                    }
                    return
                }

                var scriptTag = document.createElement('script'),
                    $scriptTag = $(scriptTag),
                    defer = $q.defer();
                scriptTag.src = script;
                defer.processing = true;

                $scriptTag.load(function(){
                    $timeout(function(){
                        defer.resolve();
                        defer.processing = false;
                        Pace.restart();
                    })
                });

                previousDefer.promise.then(function(){
                    document.body.appendChild(scriptTag);
                });

                processedScripts[script] = previousDefer = defer;
            });

            return previousDefer.promise;
        }
    }
}]);