using System;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;

namespace FunWithLocal.WebApi.Common
{
    public static class StringHelper
    {
        public static string StripHtml(string html)
        {
            if (!string.IsNullOrEmpty(html))
            {
                // Replace any <br /> tags with new lines:
                html = Regex.Replace(html, @"\<\s*br\s*/?\s*\>", Environment.NewLine);
                // Delete any other tags - 
                //		[^\<]*? Match the minimum amount of any character that isn't a <, this way we get the < bracket closest to the > so we match <a> instead of <<a> etc
                html = Regex.Replace(html, "<\\s*/?\\??\\s*\\w+([:]\\w)?((\\s+\\w+(\\s*=\\s*(?:\".*?\"|'.*?'|[^'\">\\s]+))?)+\\s*|\\s*)/?\\s*\\??>", string.Empty);

                // Delete partial tags
                html = Regex.Replace(html, "<.+", string.Empty, RegexOptions.Singleline);

                //return html.Replace("\n", Environment.NewLine).Replace(Environment.NewLine, "<br />");
                return html;
            }

            return html;
        }

        public static string SeorizeListingName(string header, int id)
        {
            var lowerHeader = header.ToLower();
            return $"{string.Join("-", lowerHeader.Split(' '))}-{id}";
        }

        public static string GetCurrentHostEnvironemnt(IHttpContextAccessor httpContextAccessor)
        {
            var request = httpContextAccessor.HttpContext.Request;
            var protocol = request.IsHttps ? "https" : "http";
            return $"{protocol}://{request.Host}/";
        }
    }
}
