using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Encodings.Web;
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

        private class HtmlSanitizerActionFilterImpl : IActionFilter
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
                item.Content = WebUtility.HtmlEncode(_htmlSanitizer.Sanitize(item.Content));
                var linkPosition = item.Content.IndexOf("a href=", StringComparison.InvariantCultureIgnoreCase);
                if (linkPosition > 0)
                {
                    item.Content = item.Content.Insert(linkPosition + 2, "rel=\"nofollow\" ");
                }

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
