using MovieStore.Models;

namespace MovieStore.Filters
{
    public class LittleKidRules : IFilterRules
    {
        public bool FilterOut(string genre)
        {
            bool filterOut = genre == Genres.R || genre == Genres.X || genre == Genres.PG13;
            return filterOut;
        }

        public string Name => "Little Kids Rules";
    }
}