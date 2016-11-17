using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using aspnet5.Areas.MovieStore.Models;
using aspnet5.Areas.MovieStore.Models.Movies;
using aspnet5.Areas.MovieStore.ViewModels;
using aspnet5.Areas.MovieStore.ViewModels.Movies;

namespace aspnet5.Areas.MovieStore.Controllers
{
    public class MoviesController : BaseWebController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Movies
        public ActionResult Index()
        {
            var vm = new MovieSearchViewModel {Movies = db.Movies.ToList()};
            return View(vm);
        }

        [HttpPost]
        public ActionResult Index(MovieSearchViewModel vm)
        {
            var rating = Convert.ToInt16(vm.SelectedStarRating ?? 0);
            vm.Movies = db.Movies.Where(m => m.StarRating == rating && m.Genre == vm.SelectedGenre).ToList();
            return View(vm);
        }

        // GET: Movies/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // GET: Movies/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Movies/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Title,ReleaseDate,Genre,Price")] Movie movie)
        {
            if (ModelState.IsValid)
            {
                db.Movies.Add(movie);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(movie);
        }

        // GET: Movies/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Title,ReleaseDate,Genre,Price")] Movie movie)
        {
            if (ModelState.IsValid)
            {
                db.Entry(movie).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(movie);
        }

        // GET: Movies/EditAll
        public ActionResult EditAll()
        {
            var vm = new EditAllMoviesViewModel();
            vm.Movies = db.Movies.ToList();
            return View(vm);
        }

        // GET: Movies/EditSpa
        public ActionResult EditSPA()
        {
            var vm = new EditAllMoviesViewModel();
            vm.Movies = db.Movies.ToList();
            return View(vm);
        }

        [HttpPost]
        public ActionResult EditAll(EditAllMoviesViewModel editAllMoviesViewModel)
        {
            try
            {
                var movies = editAllMoviesViewModel.Movies;
                foreach (var movie in movies)
                {
                    var existing = db.Movies.FirstOrDefault(m => m.ID == movie.ID);
                    if (existing != null)
                    {
                        existing.Title = movie.Title;
                        existing.Genre = movie.Genre;
                        existing.ReleaseDate = movie.ReleaseDate;
                        existing.Price = movie.Price;
                        existing.StarRating = movie.StarRating;
                    }
                }
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                OnException(ex, ex.Message);
            }

            var vm = new MovieSearchViewModel();
            vm.Movies = db.Movies.ToList();
            return RedirectToAction("Index");
        }

        // GET: Movies/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Movie movie = db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // POST: Movies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            try
            {


                Movie movie = db.Movies.Find(id);
                db.Movies.Remove(movie);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                OnException(ex,ex.Message, () => { return View(); });
            }
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }

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
