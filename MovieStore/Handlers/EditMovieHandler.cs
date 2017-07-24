using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieStore.Filters;
using MovieStore.Transitions;

namespace MovieStore.Handlers
{
    class EditMovieHandler : MessageHandler<EditMoviesTransition>
    {
        private readonly MovieStoreDbContext _db;
        private readonly IMovieFilter _filter;

        public EditMovieHandler(MovieStoreDbContext db, IMovieFilter filter)
        {
            _db = db;
            _filter = filter;
        }
        protected override void InnerHandle(EditMoviesTransition message)
        {
            var movies = message.Movies;
            var transition = new EditMoviesTransition(movies);
            
            foreach (var movie in movies)
            {
                var existing = _db.Movies.FirstOrDefault(m => m.ID == movie.ID);
                if (existing == null) continue;

                existing.Title = movie.Title;
                existing.Genre = movie.Genre;
                existing.ReleaseDate = movie.ReleaseDate;
                existing.Price = movie.Price;
                existing.StarRating = movie.StarRating;
            }
            _db.SaveChanges();
        }
    }
}
