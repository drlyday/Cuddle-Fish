$(function() {

    // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
    function AppViewModel(jsonModel) {
        var self = this;
        self.genres = ko.observable(jsonModel.genres);
        self.starRatings = ko.observable(jsonModel.starRatings);

        //self.selectedStarRating = ko.observable(jsonModel.selectedStarRating);
        self.selectedStarRating = ko.observable(0);
        self.selectedGenre = ko.observable(jsonModel.selectedGenre);

        self.firstName = "Bert";
        self.lastName = ko.observable("Bertington") ;
        
        //Do some fancy KO mapping
        var getGenresInDB = function (rating) {
            //C:\Users\Dustin Lyday\OneDrive\Software Projects\aspnet5\aspnet5\MovieStore\Movies\Genre\ByStarRating
                // Send an AJAX requestselectedStarRatingselectedStarRatingselectedStarRating$L$.
            $.getJSON('../api/Genre/ByStarRating',
                    {
                        data: { selectedStarRating: self.selectedStarRating() }
                    })
                    .done(function (data) {
                    var options = new ko.observable(data);
                        self.genres(data);
                        // On success, 'data' contains a list of products.
                        $.each(data, function (key, item) {
                            // Add a list item for the product.
                            
                        });
                });
        };
        var sayHi = function () { alert('hi') }

        //self.selectedStarRating.subscribe(getGenresInDB);
        self.selectedStarRating.subscribe(getGenresInDB);
        //this.getGenresInDB();

        //  self.selectedStarRating(1);
    }

    // Activates knockout.js
    var vm = new AppViewModel(jsonModel);
    ko.applyBindings(vm);
});