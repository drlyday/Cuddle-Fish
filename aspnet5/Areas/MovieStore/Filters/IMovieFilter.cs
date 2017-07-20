using aspnet5.Areas.MovieStore.Models.Movies;

namespace aspnet5.Areas.MovieStore.Filters
{
    public interface IMovieFilter
    {
        bool Filterout(Movie movie);
        string Name { get;}
    }
}