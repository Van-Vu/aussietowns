using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using FunWithLocal.WebApi.Common;
using FunWithLocal.WebApi.Model;
using Ganss.XSS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Routing;
using Moq;
using Xunit;
using FluentAssertions;

namespace FunWithLocal.WebApi.Test
{
    public class HtmlSanitizerTest
    {
        private readonly HtmlSanitizerActionFilter.HtmlSanitizerActionFilterImpl _htmlSanitizer;
        private ActionExecutingContext _actionExecutingContext;

        public HtmlSanitizerTest()
        {
            _htmlSanitizer = new HtmlSanitizerActionFilter.HtmlSanitizerActionFilterImpl(new HtmlSanitizer());

            var actionContext = new ActionContext(
                new Mock<HttpContext>().Object,
                new Mock<RouteData>().Object,
                new Mock<ActionDescriptor>().Object,
                new ModelStateDictionary()
            );

            _actionExecutingContext = new ActionExecutingContext(
                actionContext,
                new List<IFilterMetadata>(),
                new Dictionary<string, object>(),
                new Mock<Controller>().Object
            );
        }

        [Fact]
        [Trait("UnitTest", "HtmlSanitizerActionFilter")]
        public void ActionExecuting_WithAnchorTag_Expects0NoFollowAttrib()
        {
            // Arrange
            _actionExecutingContext.ActionArguments.Add(new KeyValuePair<string, object>("article",
                new Article {Title = "test", Content = "<a href=\"https://www.funwithlocal.com/\">Test</a>"}));


            _htmlSanitizer.OnActionExecuting(_actionExecutingContext);

            var article = (Article) _actionExecutingContext.ActionArguments.FirstOrDefault(x => x.Key == "article").Value;
            article.Content.IndexOf("nofollow", StringComparison.InvariantCultureIgnoreCase).Should().Be(-1);
        }

        [Fact]
        [Trait("UnitTest", "HtmlSanitizerActionFilter")]
        public void ActionExecuting_WithAnchorTag_Expects1NoFollowAttrib()
        {
            // Arrange
            _actionExecutingContext.ActionArguments.Add(new KeyValuePair<string, object>("article",
                new Article { Title = "test", Content = "<a href=\"www.google.com\">Test</a>" }));
            
            _htmlSanitizer.OnActionExecuting(_actionExecutingContext);

            var article = (Article)_actionExecutingContext.ActionArguments.FirstOrDefault(x => x.Key == "article").Value;
            article.Content.IndexOf("nofollow", StringComparison.InvariantCultureIgnoreCase).Should().BeGreaterThan(0);
        }

        [Fact]
        [Trait("UnitTest", "HtmlSanitizerActionFilter")]
        public void ActionExecuting_WithAnchorTag_Expects2NoFollowAttrib()
        {
            // Arrange
            _actionExecutingContext.ActionArguments.Add(new KeyValuePair<string, object>("article",
                new Article { Title = "test", Content = "Hello <a href=\"www.google.com\">Test1</a> this is my <a href=\"www.google.com\">Test2</a>" }));

            _htmlSanitizer.OnActionExecuting(_actionExecutingContext);

            var article = (Article)_actionExecutingContext.ActionArguments.FirstOrDefault(x => x.Key == "article").Value;
            var regex = new Regex("nofollow", RegexOptions.IgnoreCase);
            regex.Matches(article.Content).Count.Should().Be(2);
        }

        [Fact]
        [Trait("UnitTest", "HtmlSanitizerActionFilter")]
        public void ActionExecuting_WithAnchorTag_ExpectsMixedNoFollowAttrib()
        {
            // Arrange
            _actionExecutingContext.ActionArguments.Add(new KeyValuePair<string, object>("article",
                new Article { Title = "test", Content = "Hello <a href=\"https://www.funwithlocal.com\">Test1</a> this is my <a href=\"www.google.com\">Test2</a>" }));

            _htmlSanitizer.OnActionExecuting(_actionExecutingContext);

            var article = (Article)_actionExecutingContext.ActionArguments.FirstOrDefault(x => x.Key == "article").Value;
            var regex = new Regex("nofollow", RegexOptions.IgnoreCase);
            regex.Matches(article.Content).Count.Should().Be(1);
        }

    }
}
