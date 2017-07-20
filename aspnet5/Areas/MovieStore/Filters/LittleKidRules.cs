using aspnet5.Areas.MovieStore.Models;

namespace aspnet5.Areas.MovieStore.Filters
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