using System;
using System.Collections.Generic;
using aspnet5.Areas.MovieStore.Models.Movies;

namespace aspnet5.Areas.MovieStore.ViewModels.Movies
{
    public class EditAllMoviesViewModel
    {

        public EditAllMoviesViewModel()
        {

        }

        public String Message { get; set; } = "Edit all moveies in a grid and save with named attributes";

        public IList<Movie> Movies { get; set; } = new List<Movie>();        
    }
}