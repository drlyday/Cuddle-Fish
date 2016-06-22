using aspnet5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace aspnet5.ViewModels
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