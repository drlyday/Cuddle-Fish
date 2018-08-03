using aspnet5.Areas.MovieStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MovieStoreWebsiteMVC.Areas.MovieStore.Controllers.Api
{

   //[EnableCors("CorsPolicy")]
   //[Produces("application/json")]
   [AllowCrossSiteJson]
   [Route("api/endpoints")]
   public class EndpointsController : ApiController
   {
      // GET: api/Endpoints
      [HttpGet]
      [AllowCrossSiteJson]
      public IHttpActionResult Get()
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
   }
}