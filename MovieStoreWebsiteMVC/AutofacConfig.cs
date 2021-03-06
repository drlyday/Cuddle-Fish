﻿using System.Web.Mvc;
using aspnet5.Controllers;
using Autofac;
using Autofac.Integration.Mvc;
using MovieStore;
using MovieStore.Filters;
using MovieStore.Handlers;
using MovieStore.ModuleRegistration;
using MovieStore.Transitions;

namespace aspnet5
{
    public class AutofacConfig
    {
        public static void Config()
        {
            var builder = new ContainerBuilder();

            // Register your MVC controllers. (MvcApplication is the name of the class in Global.asax.)
            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            builder.RegisterAssemblyTypes(typeof(MessageHandler<>).Assembly)
                .Where(x => x.Name.EndsWith("SaleHandler"))
                .AsImplementedInterfaces();

            // ...or you can register individual controllers manually.
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
            //  - Movie Store Database Context for EF
            builder.RegisterType<MovieStoreDbContext>();
            //builder.RegisterType<MovieStoreDbContext>().As<IdentityDbContext<ApplicationUser>>();

            // Custom class registrations
            builder.RegisterType<DynamicHandler>();
            builder.RegisterType<EditMovieHandler>().As<MessageHandler<EditMoviesTransition>>();
            builder.RegisterType<TeenagerRules>().As<IFilterRules>();
            builder.RegisterType<LittleKidRules>().As<IFilterRules>();
            builder.RegisterType<MovieFilter>().As<IMovieFilter>();

            // AutoFac Module Registration
            // WTF: A module is a grouping of registrations.  This one has the parent controls.
            builder.RegisterModule(new ParentControlModule() { childAge = 5});

            // Set the dependency resolver to be Autofac.
            // MVC has DI concept backed in with IDependencyResolover: AutofacDependencyResolver is an implimentation
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}