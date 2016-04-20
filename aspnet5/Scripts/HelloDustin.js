$(function() {

    // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
    function AppViewModel(jsonModel) {
        var self = this;
        self.firstName = "Bert";
        self.lastName = ko.observable("Bertington");

        //Do some fancy KO mapping

        this.getGenresInDB = function () {
            $(document).ready(function () {
                // Send an AJAX request
                $.getJSON('../api/genre')
                    .done(function (data) {
                        // On success, 'data' contains a list of products.
                        $.each(data, function (key, item) {
                            // Add a list item for the product.
                            alert(item.Text);
                            self.lastName(item.Text);
                        });
                    });
            });
        };

        this.getGenresInDB();
    }

    // Activates knockout.js
    var vm = new AppViewModel(jsonModel);
    ko.applyBindings(vm);
});