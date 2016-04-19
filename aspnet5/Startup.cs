using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(aspnet5.Startup))]
namespace aspnet5
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
