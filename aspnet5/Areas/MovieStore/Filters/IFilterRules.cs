namespace aspnet5.Areas.MovieStore.Filters
{
    public interface IFilterRules
    {
        bool FilterOut(string genre);
        string Name { get;}
    }
}