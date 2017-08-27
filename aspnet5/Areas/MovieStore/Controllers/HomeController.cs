using System.Web.Mvc;

namespace aspnet5.MovieStore.Controllers
{
    public class Home2Controller : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        public ActionResult About()
        {
            ViewBag.Message = "Congrates, you successfully got through COOKIE AUTHENTICATION!.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}