using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.IdentityModel.Protocols;

namespace AussieTowns.Extensions
{
    public static class AwsS3Extensions
    {
        public static AmazonS3Client GetS3Client(string secretKey, string accessKey, string region)
        {
            var credentials = new BasicAWSCredentials(accessKey, secretKey);

            //AWSConfigs.AWSRegion = region;
            var client = new AmazonS3Client(credentials,RegionEndpoint.APSoutheast2);
            return client;
        }

        public static async Task<PutObjectResponse> SaveToS3Async(AmazonS3Client client, Stream stream, string bucketName, string keyName)
        {
            var putRequest = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = keyName,
                InputStream = stream
            };

            //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
            return await client.PutObjectAsync(putRequest);
        }

        public static async Task<DeleteObjectResponse> DeleteObjectS3Async(AmazonS3Client client, string bucketName,
            string keyName)
        {
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = bucketName,
                Key = keyName
            }; ;
            return await client.DeleteObjectAsync(deleteRequest);
        }
    }
}
