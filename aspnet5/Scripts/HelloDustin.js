$(function() {

    // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
    function AppViewModel() {
        this.firstName = "Bert";
        this.lastName = "Bertington";

        this.capitalizeLastName = function () {
            var currentVal = this.lastName();        // Read the current value
            this.lastName(currentVal.toUpperCase()); // Write back a modified value
        };
    }

    // Activates knockout.js
    ko.applyBindings(new AppViewModel());

});