using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;

namespace aspnet5
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();
            //AreaRegistration.RegisterAllAreas();

            config.Routes.MapHttpRoute("WithActionApi", "api/{controller}/do/{action}/");
            config.Routes.MapHttpRoute("WithAreaActionApi", "api/{area}/{controller}/do/{action}/");
            /*config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "MovieStore/api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );*/

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
/*
            config.Routes.MapHttpRoute(
                name: "ArealessApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );*/
        }
    }
}
