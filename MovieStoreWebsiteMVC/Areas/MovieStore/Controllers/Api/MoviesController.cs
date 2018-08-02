using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MovieStore;
using MovieStoreDomain.Models.Movies;
using MovieStoreWebsiteMVC.Areas.MovieStore.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MovieStoreWebsiteMVC.Areas.MovieStore.Controllers.Api
{
    [AllowCrossSiteJson]
    public class MoviesController : ApiController
    {
        private MovieStoreDbContext db = new MovieStoreDbContext();

        // GET: api/Movies
        [AllowCrossSiteJson]
        public IQueryable<Movie> GetMovies()
        {
            return db.Movies;
        }

        // GET: api/Movies/5
        //[ResponseType(typeof(Movie))]
        [AllowCrossSiteJson]
        public IHttpActionResult GetMovie(int id)
        {
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return NotFound();
            }

            return Json(movie);
        }

        // GET: api/MovieMetadata
        [AllowCrossSiteJson]
        [Route("api/metadata/movies")]
        [HttpGet]
        public IHttpActionResult MovieMetadata()
        {
            MetadataHeader header = new MetadataHeader()
            {
                Name = "Movie",
                Type = "Movie",
                Label = "Movie",
                Description = "Movie",
                SelectorValue = "Title",
                PrimaryKey = "ID"
            };
            var movie = new Movie();


            IEnumerable<PropertyMetadata> listOfPropertiesInMovieObject = movie.GetType()
                                                                               .GetProperties()
                                                                               .Select(x => new PropertyMetadata() {
                                                                                   Value = x.Name,
                                                                                   Key = true,
                                                                                   Label = x.Name,
                                                                                   Description = "",
                                                                                   Type = "text",
                                                                                   Required = true,
                                                                                   Order = 0,
                                                                                   Gridshow = true,
                                                                                   color = "blue"
                                                                               });
            
            header.metadata.AddRange(listOfPropertiesInMovieObject);
            
            if (movie == null)
            {
                return NotFound();
            }
            
            return Json(header, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });            
        }

        // PUT: api/Movies/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMovie(int id, Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movie.ID)
            {
                return BadRequest();
            }

            db.Entry(movie).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Movies
        [ResponseType(typeof(Movie))]
        public IHttpActionResult PostMovie(Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Movies.Add(movie);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = movie.ID }, movie);
        }

        // DELETE: api/Movies/5
        [ResponseType(typeof(Movie))]
        public IHttpActionResult DeleteMovie(int id)
        {
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return NotFound();
            }

            db.Movies.Remove(movie);
            db.SaveChanges();

            return Ok(movie);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MovieExists(int id)
        {
            return db.Movies.Count(e => e.ID == id) > 0;
        }
    }
}