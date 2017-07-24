using System;
using System.Collections.Generic;
using MovieStore.Models.Movies;

namespace aspnet5.Areas.MovieStore.ViewModels.Movies
{
    public class EditAllMoviesViewModel
    {

        public EditAllMoviesViewModel()
        {

        }

        public string Message { get; set; } = "Edit all moveies in a grid and save with named attributes";

        public IList<Movie> Movies { get; set; } = new List<Movie>();        
    }
}