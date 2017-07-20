using aspnet5.Areas.MovieStore.Models;

namespace aspnet5.Areas.MovieStore.Filters
{
    public class TeenagerRules : IFilterRules
    {
        public bool FilterOut(string genre)
        {
            bool filterOut = genre == Genres.R || genre == Genres.X;
            return filterOut;
        }

        public string Name
        {
            get { return "Teenager Rules"; }
        }
    }
}