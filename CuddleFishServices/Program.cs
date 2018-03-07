using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CuddleFishServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
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
                      })
                    .UseStartup<Startup>()
                    .Build();
            return host;
        }
    }
}
