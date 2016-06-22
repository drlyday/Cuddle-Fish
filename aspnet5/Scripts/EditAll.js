$(function() {

    // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
    function AppViewModel(jsonModel) {
        var self = this;
        
       
    }

    // Activates knockout.js
    var vm = new AppViewModel(jsonModel);
    ko.applyBindings(vm);
});