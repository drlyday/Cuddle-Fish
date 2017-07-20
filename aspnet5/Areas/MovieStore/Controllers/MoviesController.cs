using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using aspnet5.Areas.MovieStore.Filters;
using aspnet5.Areas.MovieStore.Models;
using aspnet5.Areas.MovieStore.Models.Movies;
using aspnet5.Areas.MovieStore.ViewModels;
using aspnet5.Areas.MovieStore.ViewModels.Movies;
using Microsoft.AspNet.Identity.EntityFramework;

namespace aspnet5.Areas.MovieStore.Controllers
{
    public class MoviesController : BaseWebController
    {
        private readonly MovieStoreDbContext _db;
        private readonly IMovieFilter _filter;

        public MoviesController(MovieStoreDbContext db, IMovieFilter filter)
        {
            _db = db;
            _filter = filter;
        }
        
        // GET: Movies
        public ActionResult Index()
        {
            var list = _db.Movies.ToList().Where(m => !_filter.Filterout(m)).ToList();
            var vm = new MovieSearchViewModel {Movies = list, FilterName = _filter.Name};
            return View(vm);
        }

        [HttpPost]
        public ActionResult Index(MovieSearchViewModel vm)
        {
            var rating = Convert.ToInt16(vm.SelectedStarRating ?? 0);
            vm.Movies = _db.Movies.Where(m => m.StarRating == rating && m.Genre == vm.SelectedGenre).ToList();
            return View(vm);
        }

        // GET: Movies/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Movie movie = _db.Movies.Find(id);
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
                _db.Movies.Add(movie);
                _db.SaveChanges();
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
            Movie movie = _db.Movies.Find(id);
            if (movie == null)
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // i.e.; public ActionResult Edit([Bind(Include = "ID,Title,ReleaseDate,Genre,Price")] Movie movie)
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Movie movie)
        {
            if (ModelState.IsValid)
            {
                _db.Entry(movie).State = EntityState.Modified;
                _db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(movie);
        }

        // GET: Movies/EditAll
        public ActionResult EditAll()
        {
            var vm = new EditAllMoviesViewModel();
            vm.Movies = _db.Movies.ToList();
            return View(vm);
        }

        // GET: Movies/EditSpa
        public ActionResult EditSPA()
        {
            var vm = new EditAllMoviesViewModel();
            vm.Movies = _db.Movies.ToList();
            return View(vm);
        }

        [HttpPost]
        public ActionResult EditSPA(EditAllMoviesViewModel editAllMoviesViewModel)
        {
            try
            {
                var movies = editAllMoviesViewModel.Movies;
                foreach (var movie in movies)
                {
                    var existing = _db.Movies.FirstOrDefault(m => m.ID == movie.ID);
                    if (existing != null)
                    {
                        existing.Title = movie.Title;
                        existing.Genre = movie.Genre;
                        existing.ReleaseDate = movie.ReleaseDate;
                        existing.Price = movie.Price;
                        existing.StarRating = movie.StarRating;
                    }
                }
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                OnException(ex, ex.Message);
            }

            var vm = new MovieSearchViewModel();
            vm.Movies = _db.Movies.ToList();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult EditAll(EditAllMoviesViewModel editAllMoviesViewModel)
        {
            try
            {
                var movies = editAllMoviesViewModel.Movies;
                foreach (var movie in movies)
                {
                    var existing = _db.Movies.FirstOrDefault(m => m.ID == movie.ID);
                    if (existing != null)
                    {
                        existing.Title = movie.Title;
                        existing.Genre = movie.Genre;
                        existing.ReleaseDate = movie.ReleaseDate;
                        existing.Price = movie.Price;
                        existing.StarRating = movie.StarRating;
                    }
                }
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                OnException(ex, ex.Message);
            }

            var vm = new MovieSearchViewModel();
            vm.Movies = _db.Movies.ToList();
            return RedirectToAction("Index");
        }

        // GET: Movies/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Movie movie = _db.Movies.Find(id);
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


                Movie movie = _db.Movies.Find(id);
                _db.Movies.Remove(movie);
                _db.SaveChanges();
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
                _db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
