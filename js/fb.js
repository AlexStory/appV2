 var fb = function(){
   'use strict';

   var _ref =  new Firebase('https://phonebook-alex.firebaseio.com/');
   function _setData(){
     _ref.on('value', function(data){
     return data.val();
     });
   }

   return{
     setData: _setData,
     contacts : ''
   }

});
