using System.Web.Mvc;
using aspnet5.Areas.MovieStore.Models;
using aspnet5.Controllers;
using aspnet5.Plugins;
using Autofac;
using Autofac.Integration.Mvc;
using Microsoft.AspNet.Identity.EntityFramework;

namespace aspnet5
{
    public class AutofacConfig
    {
        public static void Config()
        {
            var builder = new ContainerBuilder();

            // Register your MVC controllers. (MvcApplication is the name of
            // the class in Global.asax.)
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            // ...or you can register individual controlllers manually.
            builder.RegisterType<HomeController>().InstancePerRequest();

            // OPTIONAL: Register model binders that require DI.
            builder.RegisterModelBinders(typeof(MvcApplication).Assembly);
            builder.RegisterModelBinderProvider();

            // OPTIONAL: Register web abstractions like HttpContextBase.
            builder.RegisterModule<AutofacWebTypesModule>();

            // OPTIONAL: Enable property injection in view pages.
            builder.RegisterSource(new ViewRegistrationSource());

            // OPTIONAL: Enable property injection into action filters.
            builder.RegisterFilterProvider();

            // OPTIONAL: Enable action method parameter injection (RARE).
            //builder.InjectActionInvoker();

            // Register This applicatoin's resources
            builder.RegisterType<ApplicationDbContext>();
            //builder.RegisterType<ApplicationDbContext>().As<IdentityDbContext<ApplicationUser>>();

            builder.RegisterModule(new ParentControlModule() { childAge = 5});

            // Set the dependency resolver to be Autofac.
            // MVC has DI concept backed in with IDependencyResolover: AutofacDependencyResolver is an implimentation
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}