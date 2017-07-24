namespace MovieStore.Filters
{
    public class NoRules : IFilterRules
    {
        public bool FilterOut(string genre)
        {
            bool filterOut = false;
            return filterOut;
        }

        public string Name
        {
            get { return "No Rules"; }
        }
    }
}