using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.WindowsServices;
using Microsoft.Extensions.Configuration;

namespace PDMAdmin
{
   public class Program
    {
      public static void Main(string[] args)
      {
        bool isService = !(Debugger.IsAttached || args.Contains("--console"));

        var pathToContentRoot = Directory.GetCurrentDirectory();
        if (isService)
        {
          var pathToExe = Process.GetCurrentProcess().MainModule.FileName;
          pathToContentRoot = Path.GetDirectoryName(pathToExe);
        }

        System.IO.Directory.SetCurrentDirectory(System.AppDomain.CurrentDomain.BaseDirectory);

        var configBuilder = new ConfigurationBuilder()
                            .SetBasePath(Directory.GetCurrentDirectory())
                            .AddJsonFile("appsettings.json");

        var config = configBuilder.Build();
        var port = int.Parse(config["port"]);
        var url = config["url"];
        var urlPrefix = config["urlPrefix"];

          var host = new WebHostBuilder()
          .UseKestrel(options =>
          {
            options.Listen(IPAddress.Any, port);
            // HTTPS
            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?tabs=aspnetcore2x
            //options.Listen(IPAddress.Any, port, listenOptions =>
            //{
            //  listenOptions.UseHttps("testCert.pfx", "testPassword");
            //});
          })
          .UseContentRoot(pathToContentRoot)
          .UseStartup<Startup>()
          // .UseHttpSys(options =>
          // {
          //   // options.Authentication.Schemes = AuthenticationSchemes.None;
          //   // options.Authentication.AllowAnonymous = true;
          //   // options.MaxConnections = 100;
          //   // options.MaxRequestBodySize = 30000000;
          //   //options.UrlPrefixes.Add(urlPrefix + "+:" + port);
          //   //options.UrlPrefixes.Add("http://+:80/");
          //   options.UrlPrefixes.Add("http://+:" + port);
          // })
          // .UseApplicationInsights()
          .Build();

          if (isService)
          {
            host.RunAsService();
          }
          else
          {
            host.Run();
          }

          Process.Start("chrome.exe", string.Format("--incognito  http://localhost:{0}/MovieStore/Movies ", port));


          //BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
      {
        return WebHost.CreateDefaultBuilder(args)
          .UseStartup<Startup>()
          .Build();
      }
    }
}
