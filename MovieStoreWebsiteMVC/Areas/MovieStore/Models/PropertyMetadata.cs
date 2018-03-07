using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieStoreWebsiteMVC.Areas.MovieStore.Models
{
    public class PropertyMetadata
    {
        public string Value { get; set; }
        public bool Key { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public bool Required { get; set; }
        public int Order { get; set; }
        public bool GridShow { get; set; }
        public string color { get; set; }
    }
}