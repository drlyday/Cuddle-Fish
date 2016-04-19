using aspnet5.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace aspnet5.ViewModels
{
    public class MovieSearchViewModel
    {

        public MovieSearchViewModel()
        {
            StarRatings.Add(new StarRating() { Value = 0, Text = "bleh" });
            StarRatings.Add(new StarRating() { Value = 1, Text = "ok" });
        }

        [Display(Name = "Rating")]
        public Int16? SelectedStarRating { get; set; }

        [Display(Name = "Genre")]
        public string SelectedGenre { get; set; }

        public List<Movie> Movies { get; internal set; }

        public List<StarRating> StarRatings { get; set; } = new List<StarRating>();

        public List<SelectListItem> Genres { get; set; } = new List<SelectListItem>();
    }
    public class StarRating
    {
        public int? Value { get; set; }
        public string Text { get; set; }
    }
}

