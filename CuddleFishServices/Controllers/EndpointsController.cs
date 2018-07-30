using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CuddleFishServices.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieStoreDomain.Models.Movies;

namespace CuddleFishServices.Controllers
{
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/endpoints")]
    public class EndpointsController : Controller
    {
        // GET: api/Endpoints
        [HttpGet]
        public IActionResult Get()
        {
            var movie = new Endpoint()
            {
                Name = "movie",
                Description = "movie",  
                Group = "movies",
                ServiceEndPoint = "http://localhost:52306/api/moviesangular",
                UiEndpoint = "http://localhost:52306/api/metadata/moviesangular",
                Type = "movie"

            };
            var movies = new List<Endpoint>();
            movies.Add(movie);
            return Json(movies);
        }

        // GET: api/Endpoints/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Endpoints
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Endpoints/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
