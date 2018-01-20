using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace FunWithLocal.WebApi.Test.Infrastructure
{
    public class TestServerFixture : IDisposable
    {
        public TestServer Server { get; }
        public HttpClient Client { get; }

        public TestServerFixture()
        {
            var hostBuilder = new WebHostBuilder()
                .UseEnvironment("Testing")
                .UseStartup<Startup>();

            Server = new TestServer(hostBuilder);
            Client = Server.CreateClient();
        }

        public void Dispose()
        {
            Server.Dispose();
            Client.Dispose();
        }

        public TService GetService<TService>()
            where TService : class
        {
            return Server?.Host?.Services?.GetService(typeof(TService)) as TService;
        }
    }
}
