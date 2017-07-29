using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Amazon;
using Amazon.Runtime;
using Amazon.SQS;
using Amazon.SQS.Model;
using Microsoft.IdentityModel.Protocols;
using Newtonsoft.Json;
using Message = AussieTowns.Model.Message;

namespace AussieTowns.Extensions
{
    public static class AwsSqsExtensions
    {
        public static async Task<IEnumerable<KeyValuePair<string, HttpStatusCode>>> PushToSqsAsync(this object message, string queueUrl)
        {
            return await PushToSqsAsync(message, queueUrl, new Dictionary<string, string>());
        }

        public static async Task<IEnumerable<KeyValuePair<string, HttpStatusCode>>> PushToSqsAsync(this object message, string queueUrl, IEnumerable<KeyValuePair<string, string>> messageAttributes)
        {
            // Serialize it as a literal string if possible
            string messageBody = message as string;
            if (messageBody == null)
            {
                var jsonTextWriter = new StringWriter();
                var serializer = new JsonSerializer();
                serializer.Serialize(jsonTextWriter, message);
                messageBody = jsonTextWriter.ToString();
            }

            return await PushToSqsAsync(messageBody, queueUrl, messageAttributes);
        }

        //public static async Task<SendMessageBatchResponse> PushToSqsBatchAsync(this IEnumerable<Tuple<string, string>> messageRequestEntries, string queueUrl)
        //{
        //    if (messageRequestEntries == null) return null;

        //    var requests = messageRequestEntries
        //        .Select(entry =>
        //        {
        //            var requestId = entry.Item1;
        //            var messageBody = entry.Item2;
        //            return new SendMessageBatchRequestEntry(requestId, messageBody);
        //        }).ToList();

        //    if (requests.Count > 10)
        //    {
        //        throw new ArgumentOutOfRangeException($"[SendMessageBatchAsync] Number of messages exceeded max allowed by SQS batch 10. Your request batch contains {requests.Count}");
        //    }

        //    if (!requests.Any()) return null;

        //    var response = await AmazonSqsClientSingleton.SendMessageBatchAsync(queueUrl, requests);
        //    return response;
        //}

        //public static async Task<IEnumerable<KeyValuePair<string, HttpStatusCode>>> PushToSqsAsync(this string messageBody, string queueUrl, IEnumerable<KeyValuePair<string, string>> messageAttributes)
        //{
        //    var sendMessageRequest = new SendMessageRequest(queueUrl, messageBody);

        //    if (messageAttributes != null)
        //    {
        //        foreach (var pair in messageAttributes)
        //        {
        //            sendMessageRequest.MessageAttributes.Add(pair.Key, new MessageAttributeValue() { DataType = "String", StringValue = pair.Value });
        //        }
        //    }

        //    var response = await AmazonSqsClientSingleton.SendMessageAsync(sendMessageRequest);
        //    var result = new[] { new KeyValuePair<string, HttpStatusCode>(response.MessageId, response.HttpStatusCode) };
        //    return result;
        //}

        public static async Task<Tuple<HttpStatusCode, string>> PushToSqsAsync(this string messageBody, AmazonSQSClient client, string queueUrl, int? delayQueueInSeconds = null)
        {
            try
            {
                var sendMessageRequest = new SendMessageRequest(queueUrl, messageBody);
                if (delayQueueInSeconds.HasValue)
                {
                    sendMessageRequest.DelaySeconds = delayQueueInSeconds.Value;
                }
                var response = await client.SendMessageAsync(sendMessageRequest);
                return Tuple.Create(response.HttpStatusCode, $"MessageID:{response.MessageId}");
            }
            catch (AmazonSQSException ex)
            {
                return Tuple.Create(HttpStatusCode.BadRequest, $"RequestID={ex.RequestId}\nError={ex}");
            }
        }

        //public static async Task<IEnumerable<KeyValuePair<string, HttpStatusCode>>> PeekIntoSqs(this string queueUrl,
        //    Action<Message> messageHandler, int maxNumberOfMessages = 1)

        //{
        //    return await PullFromSqsAsync(queueUrl, messageHandler, maxNumberOfMessages);
        //}

        //public static async Task<IEnumerable<KeyValuePair<string, HttpStatusCode>>> PullFromSqsAsync(this string queueUrl,
        //                                                                                             Action<Message> messageHandler,
        //                                                                                             int maxNumberOfMessages = 10,
        //                                                                                             int? defaultVisibilityTimeoutInSeconds = null,
        //                                                                                             IEnumerable<string> fetchMessageAttributeNames = null)
        //{
        //    var receiveRequest = new ReceiveMessageRequest
        //    {
        //        MaxNumberOfMessages = maxNumberOfMessages,
        //        QueueUrl = queueUrl
        //    };

        //    if (defaultVisibilityTimeoutInSeconds.HasValue)
        //    {
        //        receiveRequest.VisibilityTimeout = defaultVisibilityTimeoutInSeconds.Value;
        //    }

        //    if (fetchMessageAttributeNames != null)
        //    {
        //        receiveRequest.MessageAttributeNames = fetchMessageAttributeNames.ToList();
        //    }

        //    var results = new List<KeyValuePair<string, HttpStatusCode>>();
        //    var receiveMessageResponse = await AmazonSqsClientSingleton.ReceiveMessageAsync(receiveRequest);

        //    foreach (var currentMessage in receiveMessageResponse.Messages)
        //    {
        //        var receiptHandle = currentMessage.ReceiptHandle;

        //        //messageHandler(currentMessage);
        //        var currentResult = new KeyValuePair<string, HttpStatusCode>(receiptHandle, receiveMessageResponse.HttpStatusCode);
        //        results.Add(currentResult);
        //    }

        //    return results;
        //}

        //public static int GetApproximateNumberOfMessages(this string queueUrl)
        //{
        //    var request = new GetQueueAttributesRequest(queueUrl, new List<string>() { "ApproximateNumberOfMessages" });
        //    var response = AmazonSqsClientSingleton.GetQueueAttributesAsync(request);
        //    return response.Result.ApproximateNumberOfMessages;
        //}

        //public static int GetApproximateNumberOfMessagesNotVisible(this string queueUrl)
        //{
        //    var request = new GetQueueAttributesRequest(queueUrl, new List<string>() { "ApproximateNumberOfMessagesNotVisible" });
        //    var response = AmazonSqsClientSingleton.GetQueueAttributesAsync(request);

        //    return response.Result.ApproximateNumberOfMessagesNotVisible;
        //}

        //public static int GetTotalApproximateNumberOfMessages(this string queueUrl)
        //{
        //    var request = new GetQueueAttributesRequest(queueUrl, new List<string>() { "ApproximateNumberOfMessages", "ApproximateNumberOfMessagesNotVisible" });
        //    var response = AmazonSqsClientSingleton.GetQueueAttributesAsync(request);

        //    return response.Result.ApproximateNumberOfMessages + response.Result.ApproximateNumberOfMessagesNotVisible;
        //}

        //public static async Task<IEnumerable<KeyValuePair<string, HttpStatusCode>>> DeleteSqsMessageAsync(this string queueUrl, params string[] receiptHandles)
        //{
        //    var results = new List<KeyValuePair<string, HttpStatusCode>>();
        //    foreach (var receiptHandle in receiptHandles)
        //    {
        //        await DeleteSqsMessageAsync(queueUrl, receiptHandle, results);
        //    }

        //    return results;
        //}

        //public static async Task DeleteSqsMessageAsync(this string queueUrl, string receiptHandle,
        //    ICollection<KeyValuePair<string, HttpStatusCode>> results)
        //{
        //    var deleteRequest = new DeleteMessageRequest(queueUrl, receiptHandle);
        //    var response = await AmazonSqsClientSingleton.DeleteMessageAsync(deleteRequest);
        //    var statusCode = response.HttpStatusCode;

        //    results.Add(new KeyValuePair<string, HttpStatusCode>(receiptHandle, statusCode));
        //}

        public static AmazonSQSClient GetClient(string secretKey, string accessKey, string region)
        {
            var credentials = new BasicAWSCredentials(accessKey, secretKey);

            AWSConfigs.AWSRegion = region;
            var client = new AmazonSQSClient(credentials, new AmazonSQSConfig { MaxErrorRetry = 1 });
            return client;
        }
    }
}
