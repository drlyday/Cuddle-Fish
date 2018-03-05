using MovieStore.Models;

namespace MovieStore.Filters
{
    public class TeenagerRules : IFilterRules
    {
        public bool FilterOut(string genre)
        {
            bool filterOut = genre == Genres.R || genre == Genres.X;
            return filterOut;
        }

        public string Name => "Teenager Rules";
    }
}