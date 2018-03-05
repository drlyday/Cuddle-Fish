using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using MovieStore;
using MovieStore.Queries;

namespace aspnet5.Areas.MovieStore.Controllers.Api
{
    public class GenreController : ApiController
    {
        private readonly MovieStoreDbContext _db;

        public GenreController(MovieStoreDbContext db)
        {
            _db = db;
        }

        // GET api/<controller>
        public IEnumerable<SelectListItem> Get()
        {
            var queryable = new MoviesQuery(_db);
            var genres = queryable.WhereMovieRatingGreater(1).Select(m => new SelectListItem() { Text = m.Genre, Value = m.Genre });
            return genres;
        }

        // GET api/<controller>
        public IEnumerable<SelectListItem> ByStarRating(int selectedStarRating)
        {
            var queryable = new MoviesQuery(_db);
            var genres = queryable.WhereMovieRatingGreater(selectedStarRating).Select(m => new SelectListItem() { Text = m.Genre, Value = m.Genre });
            return genres;
        }

        // GET api/<controller>
        // If a collection of ratings needs to be sent [FromUri] is required.
        public IEnumerable<SelectListItem> ByManyStarRating([FromUri]int[] selectedStarRating)
        {
            var queryable = new MoviesQuery(_db);
            var genres = queryable.WhereMovieRatingGreater(selectedStarRating).Select(m => new SelectListItem() { Text = m.Genre, Value = m.Genre });
            return genres;
        }

        // GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}