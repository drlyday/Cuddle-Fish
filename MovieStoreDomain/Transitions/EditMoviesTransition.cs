using System.Collections.Generic;
using MovieStore.Handlers;
using MovieStore.Messages;
using MovieStoreDomain.Models.Movies;

namespace MovieStore.Transitions
{
    public class EditMoviesTransition : IMessage
    {
        public string Name { get; }

        public readonly IList<Movie> Movies;

        public EditMoviesTransition(IList<Movie> movies)
        {
            Movies = movies;
        }
    }
}