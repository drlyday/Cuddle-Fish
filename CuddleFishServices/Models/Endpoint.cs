using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CuddleFishServices.Models
{
    public class Endpoint
    {
        public string Name { get; set;}
        public string Type { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
        public string Group { get; set; }
        public string Icon { get; set; }
        public string UiEndpoint { get; set; }
        public string ServiceEndPoint { get; set; }        
    }
}
