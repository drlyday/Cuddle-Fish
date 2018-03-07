using System.Web.Mvc;

namespace MovieStoreWebsiteMVC.Areas.MovieWarehouse
{
    public class MovieWarehouseAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "MovieWarehouse";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "MovieWarehouse_default",
                "MovieWarehouse/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}