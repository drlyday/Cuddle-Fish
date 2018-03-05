using Autofac;
using MovieStore.Filters;

namespace MovieStore.ModuleRegistration
{
    public class ParentControlModule : Module
    {
        //http://autofac.readthedocs.io/en/latest/configuration/modules.html
        public int childAge { get; set; }

        protected override void Load(ContainerBuilder builder)
        {
            // Register an IMovieFilter which takes an IFilterRules
            builder.Register(c => new MovieFilter(c.Resolve<IFilterRules>())).As<IMovieFilter>();

            // Register IFilterRules, which will feed into the above IMovieFilter
            if (childAge < 13)
                builder.Register(c => new LittleKidRules()).As<IFilterRules>();
            else if (childAge < 18)
                builder.Register(c => new TeenagerRules()).As<IFilterRules>();
            else
                builder.Register(c => new NoRules()).As<IFilterRules>();
        }
    }
}