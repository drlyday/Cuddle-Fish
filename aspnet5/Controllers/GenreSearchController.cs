using aspnet5.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace aspnet5.Controllers
{
    public class GenreSearchController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET api/<controller>
        public IEnumerable<SelectListItem> Get()
        {

            List<SelectListItem> genres = db.Movies.Select(m => new SelectListItem() { Text = m.Genre, Value = m.Genre }).ToList();
            return genres;
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

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