using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using aspnet5.Areas.MovieStore.Models;
using aspnet5.Areas.MovieStore.Models.Movies;
using Autofac;

namespace aspnet5.Plugins
{
    public class ParentControlModule : Module
    {
        //http://autofac.readthedocs.io/en/latest/configuration/modules.html
        public int childAge { get; set; }

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new MovieFilter(c.Resolve<IFilterRules>())).As<IMovieFilter>();

            if (childAge < 13)
                builder.Register(c => new LittleKidRules()).As<IFilterRules>();
            else if (childAge < 18)
                builder.Register(c => new TeenagerRules()).As<IFilterRules>();
            else
                builder.Register(c => new NoRules()).As<IFilterRules>();
        }
    }

    public class NoRules : IFilterRules
    {
        public bool FilterOut(string genre)
        {
            bool filterOut = false;
            return filterOut;
        }

        public string Name
        {
            get { return "No Rules"; }
        }
    }

    public class TeenagerRules : IFilterRules
    {
        public bool FilterOut(string genre)
        {
            bool filterOut = genre == Genres.R || genre == Genres.X;
            return filterOut;
        }

        public string Name
        {
            get { return "Teenager Rules"; }
        }
    }

    public class LittleKidRules : IFilterRules
    {
        public bool FilterOut(string genre)
        {
            bool filterOut = genre == Genres.R || genre == Genres.X || genre == Genres.PG13;
            return filterOut;
        }

        public string Name => "Little Kids Rules";
    }

    public interface IMovieFilter
    {
        bool Filterout(Movie movie);
        string Name { get;}
    }

    public interface IFilterRules
    {
        bool FilterOut(string genre);
        string Name { get;}
    }

    public class MovieFilter : IMovieFilter
    {
        private readonly IFilterRules _filter;

        public MovieFilter(IFilterRules filter)
        {
            _filter = filter;
        }

        public bool Filterout(Movie movie)
        {
            return _filter.FilterOut(movie?.Genre);
        }

        public string Name => _filter.Name;
    }
}