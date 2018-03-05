using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using aspnet5.Areas.MovieStore.Models;
using MovieStore.Models;

namespace aspnet5.Areas.MovieStore.Controllers
{
    public class AuthController : Controller
    {
        // GET: MovieStore/Auth
        public ActionResult Login()
        {
            var model = new Login();
            return View(model);
        }
        // POST: MovieStore/Auth
        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            if (model.User.ToLower().Equals("dustin") && model.Password.ToLower().Equals("password"))
            {
                var identity = new ClaimsIdentity("ApplicationCookie");
                identity.AddClaims(new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, model.User),
                    new Claim(ClaimTypes.Name, model.User)
                });
                HttpContext.GetOwinContext().Authentication.SignIn(identity);
            }
            return View(model);
        }
    }
}