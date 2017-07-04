using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ThirdParty.BouncyCastle.OpenSsl;


namespace AussieTowns.Controllers
{
    // https://stackoverflow.com/questions/17128038/c-sharp-rsa-encryption-decryption-with-transmission
    // https://stackoverflow.com/questions/23734792/c-sharp-export-private-public-rsa-key-from-rsacryptoserviceprovider-to-pem-strin
    // https://stackoverflow.com/questions/14037204/import-net-public-xml-key-to-javascript-in-rsa
    // https://gist.github.com/fmoliveira/42af375804e0cd3add8d
    // https://github.com/jrnker/CSharp-easy-RSA-PEM
    // https://www.example-code.com/dotnet-core/rsa_keyExchange.asp
    // https://www.codeproject.com/Articles/1104467/Hashing-passwords-in-NET-Core-with-tips
    [Route("api/[controller]")]
    public class AuthController
    {
    }
}
