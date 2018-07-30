using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Cookies;
using Owin;

[assembly: OwinStartupAttribute(typeof(aspnet5.Startup))]
namespace aspnet5
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            ConfigureAuth(app);

            // using https://app.pluralsight.com/player?course=owin-katana-understanding&author=chris-klug&name=owin-katana-understanding-m5&clip=1&mode=live
            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationType = "ApplicationCookie",
                LoginPath = new Microsoft.Owin.PathString("/Auth/LoginModel")
            });
        }
    }
}
