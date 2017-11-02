using System.Security.Cryptography;

namespace AussieTowns.Auth
{
    public class RSAKeyHelper
    {
        public static RSAParameters GenerateKey()
        {
            using (RSA rsa = RSA.Create())
            {
                rsa.KeySize = 2048;

                return rsa.ExportParameters(true);
            }
        }
    }
}
