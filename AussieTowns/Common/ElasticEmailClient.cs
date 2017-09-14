using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AussieTowns.Common
{
    public static class ElasticEmailClient
    {

        public static string ApiKey = "a0c2228b-0f5f-4e7a-9016-f52d2c84e946";
        public static string ApiUri { get; } = "https://api.elasticemail.com/v2";
        /// <summary>
        /// Get email batch status
        /// </summary>
        /// <param name="apikey">ApiKey that gives you access to our SMTP and HTTP API's.</param>
        /// <param name="transactionId">Transaction identifier</param>
        /// <param name="showFailed">Include Bounced email addresses.</param>
        /// <param name="showSent">Include Sent email addresses.</param>
        /// <param name="showDelivered">Include all delivered email addresses.</param>
        /// <param name="showPending">Include Ready to send email addresses.</param>
        /// <param name="showOpened">Include Opened email addresses.</param>
        /// <param name="showClicked">Include Clicked email addresses.</param>
        /// <param name="showAbuse">Include Reported as abuse email addresses.</param>
        /// <param name="showUnsubscribed">Include Unsubscribed email addresses.</param>
        /// <param name="showErrors">Include error messages for bounced emails.</param>
        /// <param name="showMessageIDs">Include all MessageIDs for this transaction</param>
        /// <returns>ApiTypes.EmailJobStatus</returns>
        public static async Task<EmailJobStatus> GetStatus(string transactionId, bool showFailed = false, bool showSent = false, bool showDelivered = false, bool showPending = false, bool showOpened = false, bool showClicked = false, bool showAbuse = false, bool showUnsubscribed = false, bool showErrors = false, bool showMessageIDs = false)
        {
            using (var client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var values = new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("apikey", ApiKey),
                        new KeyValuePair<string, string>("transactionID", transactionId)
                    };
                if (!showFailed) values.Add(new KeyValuePair<string, string>("showFailed", showFailed.ToString()));
                if (!showSent) values.Add(new KeyValuePair<string, string>("showSent", showSent.ToString()));
                if (!showDelivered) values.Add(new KeyValuePair<string, string>("showDelivered", showDelivered.ToString()));
                if (!showPending) values.Add(new KeyValuePair<string, string>("showPending", showPending.ToString()));
                if (!showOpened) values.Add(new KeyValuePair<string, string>("showOpened", showOpened.ToString()));
                if (!showClicked) values.Add(new KeyValuePair<string, string>("showClicked", showClicked.ToString()));
                if (!showAbuse) values.Add(new KeyValuePair<string, string>("showAbuse", showAbuse.ToString()));
                if (!showUnsubscribed) values.Add(new KeyValuePair<string, string>("showUnsubscribed", showUnsubscribed.ToString()));
                if (!showErrors) values.Add(new KeyValuePair<string, string>("showErrors", showErrors.ToString()));
                if (!showMessageIDs) values.Add(new KeyValuePair<string, string>("showMessageIDs", showMessageIDs.ToString()));

                var content = new FormUrlEncodedContent(values);

                using (var response = await client.PostAsync(ApiUri,content).ConfigureAwait(false))
                {
                    var dataAsString = await response.Content.ReadAsStringAsync();
                    var emResponse = JsonConvert.DeserializeObject<ApiResponse<EmailJobStatus>>(dataAsString);

                    return emResponse.Data;
                }
            }
        }

        /// <summary>
        /// Submit emails. The HTTP POST request is suggested. The default, maximum (accepted by us) size of an email is 10 MB in total, with or without attachments included. For suggested implementations please refer to https://elasticemail.com/support/http-api/
        /// </summary>
        /// <param name="apikey">ApiKey that gives you access to our SMTP and HTTP API's.</param>
        /// <param name="subject">Email subject</param>
        /// <param name="from">From email address</param>
        /// <param name="fromName">Display name for from email address</param>
        /// <param name="sender">Email address of the sender</param>
        /// <param name="senderName">Display name sender</param>
        /// <param name="msgFrom">Optional parameter. Sets FROM MIME header.</param>
        /// <param name="msgFromName">Optional parameter. Sets FROM name of MIME header.</param>
        /// <param name="replyTo">Email address to reply to</param>
        /// <param name="replyToName">Display name of the reply to address</param>
        /// <param name="to">List of email recipients (each email is treated separately, like a BCC). Separated by comma or semicolon. We suggest using the "msgTo" parameter if backward compatibility with API version 1 is not a must.</param>
        /// <param name="msgTo">Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (visible to all other recipients of the message as TO MIME header). Separated by comma or semicolon.</param>
        /// <param name="msgCC">Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (visible to all other recipients of the message as CC MIME header). Separated by comma or semicolon.</param>
        /// <param name="msgBcc">Optional parameter. Will be ignored if the 'to' parameter is also provided. List of email recipients (each email is treated seperately). Separated by comma or semicolon.</param>
        /// <param name="lists">The name of a contact list you would like to send to. Separate multiple contact lists by commas or semicolons.</param>
        /// <param name="segments">The name of a segment you would like to send to. Separate multiple segments by comma or semicolon. Insert "0" for all Active contacts.</param>
        /// <param name="mergeSourceFilename">File name one of attachments which is a CSV list of Recipients.</param>
        /// <param name="channel">An ID field (max 191 chars) that can be used for reporting [will default to HTTP API or SMTP API]</param>
        /// <param name="bodyHtml">Html email body</param>
        /// <param name="bodyText">Text email body</param>
        /// <param name="charset">Text value of charset encoding for example: iso-8859-1, windows-1251, utf-8, us-ascii, windows-1250 and more…</param>
        /// <param name="charsetBodyHtml">Sets charset for body html MIME part (overrides default value from charset parameter)</param>
        /// <param name="charsetBodyText">Sets charset for body text MIME part (overrides default value from charset parameter)</param>
        /// <param name="encodingType">0 for None, 1 for Raw7Bit, 2 for Raw8Bit, 3 for QuotedPrintable, 4 for Base64 (Default), 5 for Uue  note that you can also provide the text version such as "Raw7Bit" for value 1.  NOTE: Base64 or QuotedPrintable is recommended if you are validating your domain(s) with DKIM.</param>
        /// <param name="template">The ID of an email template you have created in your account.</param>
        /// <param name="attachmentFiles">Attachment files. These files should be provided with the POST multipart file upload, not directly in the request's URL. Should also include merge CSV file</param>
        /// <param name="headers">Optional Custom Headers. Request parameters prefixed by headers_ like headers_customheader1, headers_customheader2. Note: a space is required after the colon before the custom header value. headers_xmailer=xmailer: header-value1</param>
        /// <param name="postBack">Optional header returned in notifications.</param>
        /// <param name="merge">Request parameters prefixed by merge_ like merge_firstname, merge_lastname. If sending to a template you can send merge_ fields to merge data with the template. Template fields are entered with {firstname}, {lastname} etc.</param>
        /// <param name="timeOffSetMinutes">Number of minutes in the future this email should be sent</param>
        /// <param name="poolName">Name of your custom IP Pool to be used in the sending process</param>
        /// <param name="isTransactional">True, if email is transactional (non-bulk, non-marketing, non-commercial). Otherwise, false</param>
        /// <returns>ApiTypes.EmailSend</returns>
        public static async Task<EmailSend> Send(string subject = null, string from = null, string fromName = null, string sender = null, string senderName = null, string msgFrom = null, string msgFromName = null, string replyTo = null, string replyToName = null, string to = null, string[] msgTo = null, string[] msgCC = null, string[] msgBcc = null, IEnumerable<string> lists = null, IEnumerable<string> segments = null, string mergeSourceFilename = null, string channel = null, string bodyHtml = null, string bodyText = null, string charset = null, string charsetBodyHtml = null, string charsetBodyText = null, EncodingType encodingType = EncodingType.None, string template = null, IEnumerable<FileData> attachmentFiles = null, Dictionary<string, string> headers = null, string postBack = null, Dictionary<string, string> merge = null, string timeOffSetMinutes = null, string poolName = null, bool isTransactional = false)
        {
            using (var client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var values = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("apikey", ApiKey)
                };

                if (subject != null) values.Add(new KeyValuePair<string, string>("subject", subject));
                if (from != null) values.Add(new KeyValuePair<string, string>("from", from));
                if (fromName != null) values.Add(new KeyValuePair<string, string>("fromName", fromName));
                if (sender != null) values.Add(new KeyValuePair<string, string>("sender", sender));
                if (senderName != null) values.Add(new KeyValuePair<string, string>("senderName", senderName));
                if (msgFrom != null) values.Add(new KeyValuePair<string, string>("msgFrom", msgFrom));
                if (msgFromName != null) values.Add(new KeyValuePair<string, string>("msgFromName", msgFromName));
                if (replyTo != null) values.Add(new KeyValuePair<string, string>("replyTo", replyTo));
                if (replyToName != null) values.Add(new KeyValuePair<string, string>("replyToName", replyToName));
                if (to != null) values.Add(new KeyValuePair<string, string>("to", to));
                if (msgTo != null)
                {
                    values.AddRange(msgTo.Select(item => new KeyValuePair<string, string>("msgTo", item)));
                }
                if (msgCC != null)
                {
                    values.AddRange(msgCC.Select(item => new KeyValuePair<string, string>("msgCC", item)));
                }

                if (msgBcc != null)
                {
                    values.AddRange(msgBcc.Select(item => new KeyValuePair<string, string>("msgBcc", item)));
                }

                if (lists != null) values.Add(new KeyValuePair<string, string>("lists", string.Join(",", lists)));
                if (segments != null) values.Add(new KeyValuePair<string, string>("segments", string.Join(",", segments)));
                if (mergeSourceFilename != null) values.Add(new KeyValuePair<string, string>("mergeSourceFilename", mergeSourceFilename));
                if (channel != null) values.Add(new KeyValuePair<string, string>("channel", channel));
                if (bodyHtml != null) values.Add(new KeyValuePair<string, string>("bodyHtml", bodyHtml));
                if (bodyText != null) values.Add(new KeyValuePair<string, string>("bodyText", bodyText));
                if (charset != null) values.Add(new KeyValuePair<string, string>("charset", charset));
                if (charsetBodyHtml != null) values.Add(new KeyValuePair<string, string>("charsetBodyHtml", charsetBodyHtml));
                if (charsetBodyText != null) values.Add(new KeyValuePair<string, string>("charsetBodyText", charsetBodyText));
                if (encodingType != EncodingType.None) values.Add(new KeyValuePair<string, string>("encodingType", encodingType.ToString()));
                if (template != null) values.Add(new KeyValuePair<string, string>("template", template));
                if (headers != null)
                {
                    values.AddRange(headers.Select(item => new KeyValuePair<string, string>("headers_" + item.Key, item.Value)));
                }
                if (postBack != null) values.Add(new KeyValuePair<string, string>("postBack", postBack));
                if (merge != null)
                {
                    values.AddRange(merge.Select(item => new KeyValuePair<string, string>("merge_" + item.Key, item.Value)));
                }
                if (timeOffSetMinutes != null) values.Add(new KeyValuePair<string, string>("timeOffSetMinutes", timeOffSetMinutes));
                if (poolName != null) values.Add(new KeyValuePair<string, string>("poolName", poolName));
                if (isTransactional != false) values.Add(new KeyValuePair<string, string>("isTransactional", isTransactional.ToString()));

                values.Add(new KeyValuePair<string, string>("merge_firstname", "JohnTest"));

                var content = new FormUrlEncodedContent(values);

                using (var response = await client.PostAsync(ApiUri + "/email/send", content).ConfigureAwait(false))
                {
                    var dataAsString = await response.Content.ReadAsStringAsync();
                    var emResponse = JsonConvert.DeserializeObject<ApiResponse<EmailSend>>(dataAsString);
                    if (emResponse.success)
                    {
                        return emResponse.Data;
                    }
                    else
                    {
                        throw new Exception(emResponse.error);
                    }
                    
                }
            }
        }

        /// <summary>
        /// Detailed status of a unique email sent through your account. Returns a 'Email has expired and the status is unknown.' error, if the email has not been fully processed yet.
        /// </summary>
        /// <param name="messageId">Unique identifier for this email.</param>
        /// <returns>ApiTypes.EmailStatus</returns>
        public static async Task<EmailStatus> Status(string messageId)
        {
            using (var client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var values = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("apikey", ApiKey),
                    new KeyValuePair<string, string>("messageID", messageId)
                };

                var content = new FormUrlEncodedContent(values);

                using (var response = await client.PostAsync(ApiUri, content).ConfigureAwait(false))
                {
                    var dataAsString = await response.Content.ReadAsStringAsync();
                    var emResponse = JsonConvert.DeserializeObject<ApiResponse<EmailStatus>>(dataAsString);

                    return emResponse.Data;
                }
            }
        }

        /// <summary>
        /// View email
        /// </summary>
        /// <param name="messageId"></param>
        /// <returns>ApiTypes.EmailView</returns>
        public static async Task<EmailView> View(string messageId)
        {
            using (var client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);

                var values = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("apikey", ApiKey),
                    new KeyValuePair<string, string>("messageID", messageId)
                };

                var content = new FormUrlEncodedContent(values);

                using (var response = await client.PostAsync(ApiUri, content).ConfigureAwait(false))
                {
                    var dataAsString = await response.Content.ReadAsStringAsync();
                    var emResponse = JsonConvert.DeserializeObject<ApiResponse<EmailView>>(dataAsString);

                    return emResponse.Data;
                }
            }
        }
    }

    public class EmailJobStatus
    {
        /// <summary>
        /// ID number of your attachment
        /// </summary>
        public string ID;

        /// <summary>
        /// Name of status: submitted, complete, in_progress
        /// </summary>
        public string Status;

        /// <summary>
        /// 
        /// </summary>
        public int RecipientsCount;

        /// <summary>
        /// 
        /// </summary>
        public List<EmailJobFailedStatus> Failed;

        /// <summary>
        /// Total emails sent.
        /// </summary>
        public int FailedCount;

        /// <summary>
        /// 
        /// </summary>
        public List<string> Sent;

        /// <summary>
        /// Total emails sent.
        /// </summary>
        public int SentCount;

        /// <summary>
        /// Number of delivered messages
        /// </summary>
        public List<string> Delivered;

        /// <summary>
        /// 
        /// </summary>
        public int DeliveredCount;

        /// <summary>
        /// 
        /// </summary>
        public List<string> Pending;

        /// <summary>
        /// 
        /// </summary>
        public int PendingCount;

        /// <summary>
        /// Number of opened messages
        /// </summary>
        public List<string> Opened;

        /// <summary>
        /// Total emails opened.
        /// </summary>
        public int OpenedCount;

        /// <summary>
        /// Number of clicked messages
        /// </summary>
        public List<string> Clicked;

        /// <summary>
        /// Total emails clicked
        /// </summary>
        public int ClickedCount;

        /// <summary>
        /// Number of unsubscribed messages
        /// </summary>
        public List<string> Unsubscribed;

        /// <summary>
        /// Total emails clicked
        /// </summary>
        public int UnsubscribedCount;

        /// <summary>
        /// 
        /// </summary>
        public List<string> AbuseReports;

        /// <summary>
        /// 
        /// </summary>
        public int AbuseReportsCount;

        /// <summary>
        /// List of all MessageIDs for this job.
        /// </summary>
        public List<string> MessageIDs;

    }

    public class EmailSend
    {
        /// <summary>
        /// ID number of transaction
        /// </summary>
        public string TransactionID;

        /// <summary>
        /// Unique identifier for this email.
        /// </summary>
        public string MessageID;

    }

    public class EmailStatus
    {
        /// <summary>
        /// Email address this email was sent from.
        /// </summary>
        public string From;

        /// <summary>
        /// Email address this email was sent to.
        /// </summary>
        public string To;

        /// <summary>
        /// Date the email was submitted.
        /// </summary>
        public DateTime Date;

        /// <summary>
        /// Value of email's status
        /// </summary>
        public LogJobStatus Status;

        /// <summary>
        /// Name of email's status
        /// </summary>
        public string StatusName;

        /// <summary>
        /// Date of last status change.
        /// </summary>
        public DateTime StatusChangeDate;

        /// <summary>
        /// Detailed error or bounced message.
        /// </summary>
        public string ErrorMessage;

        /// <summary>
        /// ID number of transaction
        /// </summary>
        public Guid TransactionID;

    }

    /// <summary>
    /// Email details formatted in json
    /// </summary>
    public class EmailView
    {
        /// <summary>
        /// Body (text) of your message.
        /// </summary>
        public string Body;

        /// <summary>
        /// Default subject of email.
        /// </summary>
        public string Subject;

        /// <summary>
        /// Starting date for search in YYYY-MM-DDThh:mm:ss format.
        /// </summary>
        public string From;

    }

    internal class ApiResponse<T>
    {
        public bool success = false;
        public string error = null;
        public T Data
        {
            get;
            set;
        }
    }

    /// <summary>
    /// Encoding type for the email headers
    /// </summary>
    public enum EncodingType
    {
        /// <summary>
        /// Encoding of the email is provided by the sender and not altered.
        /// </summary>
        UserProvided = -1,

        /// <summary>
        /// No endcoding is set for the email.
        /// </summary>
        None = 0,

        /// <summary>
        /// Encoding of the email is in Raw7bit format.
        /// </summary>
        Raw7bit = 1,

        /// <summary>
        /// Encoding of the email is in Raw8bit format.
        /// </summary>
        Raw8bit = 2,

        /// <summary>
        /// Encoding of the email is in QuotedPrintable format.
        /// </summary>
        QuotedPrintable = 3,

        /// <summary>
        /// Encoding of the email is in Base64 format.
        /// </summary>
        Base64 = 4,

        /// <summary>
        /// Encoding of the email is in Uue format.
        /// </summary>
        Uue = 5,

    }

    /// <summary>
    /// File response from the server
    /// </summary>
    public class FileData
    {
        /// <summary>
        /// File content
        /// </summary>
        public byte[] Content { get; set; }

        /// <summary>
        /// MIME content type, optional for uploads
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>
        /// Name of the file this class contains
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// Saves this file to given destination
        /// </summary>
        /// <param name="path">Path string exluding file name</param>
        public void SaveToDirectory(string path)
        {
            File.WriteAllBytes(Path.Combine(path, FileName), Content);
        }

        /// <summary>
        /// Saves this file to given destination
        /// </summary>
        /// <param name="pathWithFileName">Path string including file name</param>
        public void SaveTo(string pathWithFileName)
        {
            File.WriteAllBytes(pathWithFileName, Content);
        }

        /// <summary>
        /// Reads a file to this class instance
        /// </summary>
        /// <param name="pathWithFileName">Path string including file name</param>
        public void ReadFrom(string pathWithFileName)
        {
            Content = File.ReadAllBytes(pathWithFileName);
            FileName = Path.GetFileName(pathWithFileName);
            //ContentType = System.Web.MimeMapping.GetMimeMapping(FileName);
        }

        /// <summary>
        /// Creates a new FileData instance from a file
        /// </summary>
        /// <param name="pathWithFileName">Path string including file name</param>
        /// <returns></returns>
        public static FileData CreateFromFile(string pathWithFileName)
        {
            FileData fileData = new FileData();
            fileData.ReadFrom(pathWithFileName);
            return fileData;
        }
    }

    public class EmailJobFailedStatus
    {
        /// <summary>
        /// 
        /// </summary>
        public string Address;

        /// <summary>
        /// 
        /// </summary>
        public string Error;

        /// <summary>
        /// RFC Error code
        /// </summary>
        public int ErrorCode;

        /// <summary>
        /// 
        /// </summary>
        public string Category;

    }

    /// <summary>
    /// 
    /// </summary>
    public enum LogJobStatus
    {
        /// <summary>
        /// All emails
        /// </summary>
        All = 0,

        /// <summary>
        /// Email has been submitted successfully and is queued for sending.
        /// </summary>
        ReadyToSend = 1,

        /// <summary>
        /// Email has soft bounced and is scheduled to retry.
        /// </summary>
        WaitingToRetry = 2,

        /// <summary>
        /// Email is currently sending.
        /// </summary>
        Sending = 3,

        /// <summary>
        /// Email has errored or bounced for some reason.
        /// </summary>
        Error = 4,

        /// <summary>
        /// Email has been successfully delivered.
        /// </summary>
        Sent = 5,

        /// <summary>
        /// Email has been opened by the recipient.
        /// </summary>
        Opened = 6,

        /// <summary>
        /// Email has had at least one link clicked by the recipient.
        /// </summary>
        Clicked = 7,

        /// <summary>
        /// Email has been unsubscribed by the recipient.
        /// </summary>
        Unsubscribed = 8,

        /// <summary>
        /// Email has been complained about or marked as spam by the recipient.
        /// </summary>
        AbuseReport = 9,

    }
}
