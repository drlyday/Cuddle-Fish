using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CuddleFishServices.Models
{
    public class Endpoint
    {
        public string name { get; set;}
        public string type { get; set; }
        public string label { get; set; }
        public string description { get; set; }
        public string group { get; set; }
        public string icon { get; set; }
        public string uiEndpoint { get; set; }
        public string serviceEndopint { get; set; }        
    }
}
