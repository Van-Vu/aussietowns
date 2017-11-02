using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using ThirdParty.BouncyCastle.OpenSsl;

namespace AussieTowns.Auth
{
    public static class RsaEncryption
    {
        public static string GenerateRsaKeys()
        {
            var rsaCryptoServiceProvider = new RSACryptoServiceProvider(2048);

            //Export the key information to an RSAParameters object.
            //Pass false to export the public key information or pass
            //true to export public and private key information.
            //var publicKey = rsa.ExportParameters(false);
            //privateKey = rsaCryptoServiceProvider.ExportParameters(true);

            File.WriteAllText(@"D:\privatekey.pem", ExportPrivateKey(rsaCryptoServiceProvider));

            return ExportPublicKey(rsaCryptoServiceProvider);
        }

        public static string RsaDecrypt(this string encryptText)
        {
            try
            {
                //first, get our bytes back from the base64 string ...
                var bytesCypherText = Convert.FromBase64String(encryptText);

                //we want to decrypt, therefore we need a csp and load our private key

                var pemReader = new PemReader(File.OpenText(@"D:\privatekey.pem"));
                var rsaCryptoServiceProvider = new RSACryptoServiceProvider();
                rsaCryptoServiceProvider.ImportParameters(pemReader.ReadPrivatekey());

                //decrypt and strip pkcs#1.5 padding
                var bytesPlainTextData = rsaCryptoServiceProvider.Decrypt(bytesCypherText, false);

                //get our original plainText back...
                var plainTextData = Encoding.UTF8.GetString(bytesPlainTextData);

                return plainTextData;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }

        private static string ExportPublicKey(RSACryptoServiceProvider csp)
        {
            var parameters = csp.ExportParameters(false);
            using (var stream = new MemoryStream())
            {
                var writer = new BinaryWriter(stream);
                writer.Write((byte)0x30); // SEQUENCE

                //byte[] buffer, int index, int count, bool writable, bool publiclyVisible
                using (var innerStream = new MemoryStream())
                {
                    var innerWriter = new BinaryWriter(innerStream);
                    EncodeIntegerBigEndian(innerWriter, new byte[] { 0x00 }); // Version
                    EncodeIntegerBigEndian(innerWriter, parameters.Modulus);
                    EncodeIntegerBigEndian(innerWriter, parameters.Exponent);
                    EncodeIntegerBigEndian(innerWriter, parameters.Exponent); // instead of parameters.D
                    EncodeIntegerBigEndian(innerWriter, parameters.Exponent); // instead of parameters.P
                    EncodeIntegerBigEndian(innerWriter, parameters.Exponent); // instead of parameters.Q
                    EncodeIntegerBigEndian(innerWriter, parameters.Exponent); // instead of parameters.DP
                    EncodeIntegerBigEndian(innerWriter, parameters.Exponent); // instead of parameters.DQ
                    EncodeIntegerBigEndian(innerWriter, parameters.Exponent); // instead of parameters.InverseQ
                    var length = (int)innerStream.Length;
                    EncodeLength(writer, length);

                    ArraySegment<byte> buffer;
                    innerStream.TryGetBuffer(out buffer);

                    writer.Write(buffer.Array, 0, length);
                }

                ArraySegment<byte> streamBuffer;
                stream.TryGetBuffer(out streamBuffer);

                char[] base64 = Convert.ToBase64String(streamBuffer.Array, 0, (int)stream.Length).ToCharArray();
                StringBuilder res = new StringBuilder();
                res.AppendLine("-----BEGIN RSA PUBLIC KEY-----");
                for (int i = 0; i < base64.Length; i += 64)
                {
                    int l = Math.Min(64, base64.Length - i);
                    for (int j = 0; j < l; j++) res.Append(base64[i + j]);
                    res.AppendLine();
                }
                res.AppendLine("-----END RSA PUBLIC KEY-----");
                return res.ToString();
            }
        }

        private static string ExportPrivateKey(RSACryptoServiceProvider csp)
        {
            if (csp.PublicOnly) throw new ArgumentException("CSP does not contain a private key", "csp");
            var parameters = csp.ExportParameters(true);
            using (var stream = new MemoryStream())
            {
                var writer = new BinaryWriter(stream);
                writer.Write((byte)0x30); // SEQUENCE
                using (var innerStream = new MemoryStream())
                {
                    var innerWriter = new BinaryWriter(innerStream);
                    EncodeIntegerBigEndian(innerWriter, new byte[] { 0x00 }); // Version
                    EncodeIntegerBigEndian(innerWriter, parameters.Modulus);
                    EncodeIntegerBigEndian(innerWriter, parameters.Exponent);
                    EncodeIntegerBigEndian(innerWriter, parameters.D);
                    EncodeIntegerBigEndian(innerWriter, parameters.P);
                    EncodeIntegerBigEndian(innerWriter, parameters.Q);
                    EncodeIntegerBigEndian(innerWriter, parameters.DP);
                    EncodeIntegerBigEndian(innerWriter, parameters.DQ);
                    EncodeIntegerBigEndian(innerWriter, parameters.InverseQ);
                    var length = (int)innerStream.Length;
                    EncodeLength(writer, length);

                    ArraySegment<byte> buffer;
                    innerStream.TryGetBuffer(out buffer);
                    writer.Write(buffer.Array, 0, length);
                }

                ArraySegment<byte> streamBuffer;
                stream.TryGetBuffer(out streamBuffer);

                var base64 = Convert.ToBase64String(streamBuffer.Array, 0, (int)stream.Length).ToCharArray();
                StringBuilder res = new StringBuilder();
                res.AppendLine("-----BEGIN RSA PRIVATE KEY-----");
                for (int i = 0; i < base64.Length; i += 64)
                {
                    int l = Math.Min(64, base64.Length - i);
                    for (int j = 0; j < l; j++) res.Append(base64[i + j]);
                    res.AppendLine();
                }
                res.AppendLine("-----END RSA PRIVATE KEY-----");
                return res.ToString();


                //outputStream.WriteLine("-----BEGIN RSA PRIVATE KEY-----");
                //// Output as Base64 with lines chopped at 64 characters
                //for (var i = 0; i < base64.Length; i += 64)
                //{
                //    outputStream.WriteLine(base64, i, Math.Min(64, base64.Length - i));
                //}
                //outputStream.WriteLine("-----END RSA PRIVATE KEY-----");
            }
        }

        private static void EncodeIntegerBigEndian(BinaryWriter stream, byte[] value, bool forceUnsigned = true)
        {
            stream.Write((byte)0x02); // INTEGER
            var prefixZeros = 0;
            for (var i = 0; i < value.Length; i++)
            {
                if (value[i] != 0) break;
                prefixZeros++;
            }
            if (value.Length - prefixZeros == 0)
            {
                EncodeLength(stream, 1);
                stream.Write((byte)0);
            }
            else
            {
                if (forceUnsigned && value[prefixZeros] > 0x7f)
                {
                    // Add a prefix zero to force unsigned if the MSB is 1
                    EncodeLength(stream, value.Length - prefixZeros + 1);
                    stream.Write((byte)0);
                }
                else
                {
                    EncodeLength(stream, value.Length - prefixZeros);
                }
                for (var i = prefixZeros; i < value.Length; i++)
                {
                    stream.Write(value[i]);
                }
            }
        }

        private static void EncodeLength(BinaryWriter stream, int length)
        {
            if (length < 0) throw new ArgumentOutOfRangeException("length", "Length must be non-negative");
            if (length < 0x80)
            {
                // Short form
                stream.Write((byte)length);
            }
            else
            {
                // Long form
                var temp = length;
                var bytesRequired = 0;
                while (temp > 0)
                {
                    temp >>= 8;
                    bytesRequired++;
                }
                stream.Write((byte)(bytesRequired | 0x80));
                for (var i = bytesRequired - 1; i >= 0; i--)
                {
                    stream.Write((byte)(length >> (8 * i) & 0xff));
                }
            }
        }
    }
}
