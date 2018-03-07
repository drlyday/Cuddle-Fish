using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MovieStoreWebsiteMVC.Areas.MovieWarehouse.Controllers
{
    public class InventoryController : Controller
    {
        // GET: MovieWarehouse/Inventory
        public ActionResult Index()
        {
            return View();
        }
    }
}