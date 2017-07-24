using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using MovieStore.Models.Movies;

namespace aspnet5.Areas.MovieStore.ViewModels.Movies
{
    public class MovieSearchViewModel
    {

        public MovieSearchViewModel()
        {
            StarRatings.Add(new StarRating() { Value = 0, Text = "bleh 0" });
            StarRatings.Add(new StarRating() { Value = 1, Text = "ok 1" });
            StarRatings.Add(new StarRating() { Value = 2, Text = "2" });
            StarRatings.Add(new StarRating() { Value = 3, Text = "3" });
        }

        [Display(Name = "Rating")]
        public short? SelectedStarRating { get; set; }

        [Display(Name = "Genre")]
        public string SelectedGenre { get; set; }

        public List<Movie> Movies { get; internal set; }

        public List<StarRating> StarRatings { get; set; } = new List<StarRating>();

        public List<SelectListItem> Genres { get; set; } = new List<SelectListItem>();
        public string FilterName { get; set; }
    }
    public class StarRating
    {
        public int? Value { get; set; }
        public string Text { get; set; }
    }
}

