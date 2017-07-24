using MovieStore.Models.Movies;

namespace MovieStore.Filters
{
    public interface IMovieFilter
    {
        bool Filterout(Movie movie);
        string Name { get;}
    }
}