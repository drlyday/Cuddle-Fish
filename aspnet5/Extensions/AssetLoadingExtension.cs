using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace aspnet5.Extensions
{
    public static class AssetLoadingExtension
    {
        public static MvcHtmlString ViewSpecificRequireJs(this HtmlHelper helper)
        {
            var routeData = helper.ViewContext.RouteData;
            var action = routeData.Values["action"].ToString();
            var area = routeData.DataTokens["area"] ?? "Default";
            var controller = routeData.Values["controller"].ToString();

            string path = string.Format("Controllers/{0}/{1}", controller, action);

            return new MvcHtmlString(path);
        }
    }
}