using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AussieTowns
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureLogging(x => x.AddConsole())
                .ConfigureAppConfiguration((ctx, config) =>
                    config.SetBasePath(ctx.HostingEnvironment.ContentRootPath))
                .UseStartup<Startup>()
                .Build();

    }
}
