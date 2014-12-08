var ng = angular
;(function(){
  'use strict';

  ng.module('myAddressBook', [])
    .controller('AddressController', function($http){
      var vm = this;
      vm.contacts = [];
       var fb = {
        ref : new Firebase('https://phonebook-alex.firebaseio.com/'),
        setData : function(){
          fb.ref.child('list').on('value', function(data){
            vm.contacts = data.val();
          });
        },
        addChild : function(input) {
          fb.ref.child('list').push(input);
        }
      };
      fb.setData();

      vm.addNewContact = function(){
       vm.newContact.number = vm.formatNumber(vm.newContact.number);
        // vm.contacts.push(vm.newContact);
        if(!vm.newContact.address){
          vm.newContact.address = 'N/A';
        }
        fb.addChild(vm.newContact);
        vm.newContact = null;
      }

      vm.removeContact = function(id){
        fb.ref.child('list').child(id).remove();

      }
      vm.formatNumber = function(number){
          if(!number){
            return 'N/A'
          } else {
              if(number.length == 7){
                var newNum = number.toString().split("")
                newNum.splice(3,0,"-");
                return newNum.join("");
                }else{
                 var newNum = number.toString().split("")
                 newNum.unshift("(");
                 newNum.splice(4,0,") ");
                 newNum.splice(8,0,"-");
                 return newNum.join("");
                }
          }
        }
    });
}());
