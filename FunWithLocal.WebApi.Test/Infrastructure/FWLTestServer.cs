using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace FunWithLocal.WebApi.Test.Infrastructure
{
    [CollectionDefinition("TestServer collection")]
    public class FwlTestServer : ICollectionFixture<TestServerFixture>
    {
        // This class has no code, and is never created. Its purpose is simply
        // to be the place to apply [CollectionDefinition] and all the
        // ICollectionFixture<> interfaces.
    }
}
