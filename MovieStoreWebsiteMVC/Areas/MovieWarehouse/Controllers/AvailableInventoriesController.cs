using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MovieStoreWebsiteMVC.Areas.MovieWarehouse.Controllers
{
    public class AvailableInventoriesController : ApiController
    {
        // GET: api/AvailableInventories
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/AvailableInventories/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AvailableInventories
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/AvailableInventories/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/AvailableInventories/5
        public void Delete(int id)
        {
        }
    }
}
