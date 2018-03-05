using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieStoreDomain.Models.Movies;

namespace MovieStore.Messages
{
    public interface IMessage
    {
        string Name { get; }
    }

    public class MovieMessage : IMessage
    {
        public string Name => "Foo";

        public long Id { get; set; }

        public Movie Movie { get; set; }
    }

    /*public class BarMessage : IMessage
    {
        public string Name => "Bar";

        public string Marker { get; set; }
    }*/
}
