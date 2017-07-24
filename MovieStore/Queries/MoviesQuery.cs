using System.Linq;
using MovieStore.Models.Movies;

namespace MovieStore.Queries
{
    public class MoviesQuery 
    {
        MovieStoreDbContext db;
        IQueryable<Movie> queryable;

        public MoviesQuery(MovieStoreDbContext _db)
        {
            db = _db;
            queryable = db.Movies;
        }

        public IQueryable<Movie> WherePriceGreater(int price)
        {
            return queryable.Where<Movie>(m => m.Price > 2);
        }

        public IQueryable<Movie> WhereMovieRatingGreater(int rating)
        {
            return queryable.Where<Movie>(m => m.StarRating >= rating);
        }

        public IQueryable<Movie> WhereMovieRatingGreater(int[] ratings)
        {
            return queryable.Where<Movie>(m => ratings.Any(r => r >= m.StarRating));
        }
    }
}