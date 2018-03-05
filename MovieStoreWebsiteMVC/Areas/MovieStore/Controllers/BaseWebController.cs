using System;
using System.Web.Mvc;

namespace aspnet5.Areas.MovieStore.Controllers
{
    public class BaseWebController : Controller
    {
        //todo inject

        public ActionResult OnException(Exception ex, string errorMessage )
        {
            //Logger Error

            if (ex != null)
            {
                ModelState.AddModelError("BaseExceptionCollection", ex.Message);
            }

            return TryRedirectToReferrer();
        }

        private ActionResult TryRedirectToReferrer()
        {
            return Request.UrlReferrer == null ? null : new RedirectResult(Request.UrlReferrer.ToString());
        }

        public ActionResult OnException(Exception ex, string errorMessage, Func<ActionResult> action )
        {
            //Logger Error

            if (ex != null)
            {
                ModelState.AddModelError("BaseExceptionCollection", ex.Message);
            }

            return action();
        }

    }
}