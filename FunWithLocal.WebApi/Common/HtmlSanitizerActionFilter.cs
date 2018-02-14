using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using FunWithLocal.WebApi.Model;
using Ganss.XSS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace FunWithLocal.WebApi.Common
{
    public class HtmlSanitizerActionFilter : TypeFilterAttribute
    {
        public HtmlSanitizerActionFilter():base(typeof(HtmlSanitizerActionFilterImpl))
        {
        }

        public class HtmlSanitizerActionFilterImpl : IActionFilter
        {
            private readonly HtmlSanitizer _htmlSanitizer;
            public HtmlSanitizerActionFilterImpl(HtmlSanitizer htmlSanitizer)
            {
                _htmlSanitizer = htmlSanitizer;
            }

            public void OnActionExecuting(ActionExecutingContext context)
            {
                // perform some business logic work
                var article = context.ActionArguments.FirstOrDefault(x => x.Key == "article");
                if (article.Value == null) return;

                var item = (Article) article.Value;

                var sanitizedContent = _htmlSanitizer.Sanitize(item.Content);
                //https://www.regextester.com/27540
                var regex = new Regex(@"<\s*a[^>]*>(.*?)<\s*/\s*a>", RegexOptions.IgnoreCase);
                var matches = regex.Matches(sanitizedContent);
                foreach (Match match in matches)
                {
                    var matchValue = match.Value;
                    var linkPosition = matchValue.IndexOf("href=\"https://www.funwithlocal.com", StringComparison.InvariantCultureIgnoreCase);
                    if (linkPosition < 0)
                    {
                        matchValue = matchValue.Insert(3, "rel=\"nofollow\" ");
                        sanitizedContent = sanitizedContent.Replace(match.Value, matchValue);
                    }
                }

                item.Content = WebUtility.HtmlEncode(sanitizedContent);

                item.Title = WebUtility.HtmlEncode(_htmlSanitizer.Sanitize(item.Title));
            }

            public void OnActionExecuted(ActionExecutedContext context)
            {
                // perform some business logic work
                var article = context.Result; 

            }
        }
    }
}
