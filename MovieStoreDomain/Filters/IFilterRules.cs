namespace MovieStore.Filters
{
    public interface IFilterRules
    {
        bool FilterOut(string genre);
        string Name { get;}
    }
}