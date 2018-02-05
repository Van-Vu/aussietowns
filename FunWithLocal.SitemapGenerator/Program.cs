// https://github.com/deptagency/dept-gravatar/tree/master/DEPT-Gravatar/src/Applications/D.Applications.GravatarImporter

using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace FunWithLocal.SitemapGenerator
{
    class Program
    {
        private static string currentEnv;

        static void Main(string[] args)
        {
            try
            {
                Log.Information($"Starting application: {DateTime.Now}");

                currentEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                IServiceCollection serviceCollection = new ServiceCollection();

                ConfigureServices(serviceCollection);

                IServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

                var sitemap = serviceProvider.GetService<ISitemapGenerator>();
                sitemap.Run();

                Log.Information($"Finish: {DateTime.Now}");
            }
            catch (Exception e)
            {
                Log.Fatal("Fatal error", e);
                throw;
            }
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            IConfigurationRoot configuration = GetConfiguration();
            services.AddSingleton<IConfiguration>(configuration);

            //Configure logger
            Log.Logger = new LoggerConfiguration()
                    .ReadFrom.Configuration(configuration)
                    .CreateLogger();

            var mySqlConnectionString = configuration.GetSection("ApplicationConfiguration:MySqlConnString").Value;

            services.AddLogging(loggingBuilder => loggingBuilder.AddSerilog(dispose: true));
            services.AddSingleton<ISitemapGenerator, SitemapGenerator>();
            services.AddSingleton<ISerializedXmlSaver<Sitemap>, SerializedXmlSaver<Sitemap>>();
            services.AddSingleton<IFileSystemWrapper, FileSystemWrapper>();
            services.AddSingleton<IUrlRetriever, UrlRetriever>(x => new UrlRetriever(mySqlConnectionString));
        }

        private static IConfigurationRoot GetConfiguration()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{currentEnv}.json", true);

            return configuration.Build();
        }
    }
}
