using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PDMAdmin
{
    public class Startup
    {
      public Startup(IConfiguration configuration)
      {
          Configuration = configuration;
      }

      public IConfiguration Configuration { get; }

      // This method gets called by the runtime. Use this method to add services to the container.
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddMvc();
         services.AddRouting();
         // Add service and create Policy with options
         services.AddCors(options =>
         {
               options.AddPolicy("CorsPolicy",
                  builder => builder.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
         });
      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IHostingEnvironment env)
      {
        // global policy - assign here or on each controller
        app.UseCors("CorsPolicy");

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseBrowserLink();
        }
        else
        {
            app.UseExceptionHandler("/Error");
        }

       // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing
        var trackPackageRouteHandler = new RouteHandler(context =>
        {
            var routeValues = context.GetRouteData().Values;
            return context.Response.WriteAsync("{Status:\"passed\"}");
        });
        var routeBuilder = new RouteBuilder(app, trackPackageRouteHandler);
        routeBuilder.MapRoute(
            "Health Check Route",
            "healthcheck");

        var routes = routeBuilder.Build();
        app.UseRouter(routes);                              

        // Allows deeplinking for Angular
        // Kestral only knows about "/".  Any other link gets a 404.
        // Catch 404 code and change request path to what Kestral knows about.
        app.Use(
          async (context, next) =>
                    {
                      await next();
                      if (context.Response.StatusCode == 404)
                      {
                        context.Request.Path = "/";
                        await next();
                      }
                    });

        //https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files
        app.UseFileServer();
        //app.UseStaticFiles();
    }
  }
}
