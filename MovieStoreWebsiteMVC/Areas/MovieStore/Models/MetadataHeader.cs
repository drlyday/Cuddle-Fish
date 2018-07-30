using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieStoreWebsiteMVC.Areas.MovieStore.Models
{
    public class MetadataHeader
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
        public string SelectorValue { get; set; }
        public string PrimaryKey { get; set; }
        public List<PropertyMetadata> metadata { get; set; } = new List<PropertyMetadata>();
    }
}