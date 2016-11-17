using aspnet5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using System.Linq.Expressions;
using aspnet5.Areas.MovieStore.Models.Movies;

namespace aspnet5.Queries
{
    public class MoviesQuery 
    {
        ApplicationDbContext db;
        IQueryable<Movie> queryable;

        public MoviesQuery(ApplicationDbContext _db)
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