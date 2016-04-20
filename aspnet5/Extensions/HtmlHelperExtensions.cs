using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace aspnet5.Extensions
{
    public static class HtmlHelperExtensions
    {

        private static readonly JsonSerializerSettings Settings;

        static HtmlHelperExtensions()
        {
            Settings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
        }

        public static MvcHtmlString ToJson(this HtmlHelper html, object value)
        {
            return MvcHtmlString.Create(JsonConvert.SerializeObject(value, Formatting.None, Settings));
        }
    }
}