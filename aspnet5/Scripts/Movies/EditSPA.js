$(function() {

    var movie = function (data, root, _) {        
        // auto-build js object properties
        ko.mapping.fromJS(data, {}, this);

        // todo: add custom properties
        this.funkyName = 'Funky ' + this.title();

        this.deleteRow = (function(root) {
            root.movies.remove(this);
        });
    }


    // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
    function AppViewModel(jsonModel) {
        //var self = this;
        
        var mapping = {
            'movies': {
                create: (function (movie, _, options) {
                    return new movie(options.data, this, _);
                }).bind(this, movie, _)
            }
        }
        ko.mapping.fromJS(window.jsonModel, mapping, this);
    }

    // Activates knockout.js
    var vm = new AppViewModel(jsonModel);

    ko.applyBindings(vm);
});