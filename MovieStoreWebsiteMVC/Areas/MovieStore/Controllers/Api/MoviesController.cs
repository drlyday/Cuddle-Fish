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
      /// <summary>
      ///   This synchronous request returns an array of all workspaces available.  
      /// </summary>
      /// <remarks>
      ///   By default, this is both active and inactive.  Active means it’s currently open in an instance of IAM.  Inactive means it’s serialized to disk on the server and will need to be loaded before any requests are sent to it. 
      ///    
      ///   For active workspaces the properties will include the status (“Busy” or “Idle”). This should be called after all other asynchronous GET/POST/PUT/PATCH/DELETE requests that operate on the workspace.  
      ///   Some of these requests, being asynchronous, may require unknown amounts of time to finish processing.  
      ///   Call this repeatedly until the status is “idle” before issuing the next request.
      ///   
      ///   If successful the response payload will contain a JSON “workspaces” object which is an array of workspaces.  The array will be empty if no workspaces are available.   
      /// <!-- 
      /// <p>  
      ///      // Contents of JSON Body
      ///      {  
      ///         "id":"8A6E5179-E1F5-4C4C-9AB7-F27938D3FEA8",  
      ///         "name":"My New Workspace 1",  
      ///         "isActive":true,  
      ///         "status":"Idle"  
      ///      },  
      ///      {   
      ///         "id":"{9C3D8530-3652-4025-B577-AB8E6F194186}",  
      ///         "name":" My New Workspace 2",  
      ///         "isActive":false  
      ///      }  
      /// </p>  
      /// -->
      /// 
      ///   The status can be either the “Idle” or “Busy” state.It’s a string rather than a Boolean to indicate whether it’s busy so that we can potentially expand it with other states such as “Solving”.  
      /// </remarks>
      /// <example>description</example>  
      /// <param name="id">is an optional Boolean parameter to filter the list to only those that are active. More than one workspace can be active if multiple copies of IAM have been started.</param>  
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