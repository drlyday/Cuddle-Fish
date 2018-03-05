using System;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MovieStoreDomain.Models.Movies;

namespace MovieStore
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class MovieStoreDbContext : IdentityDbContext<ApplicationUser>
    {
        public MovieStoreDbContext(): base("DefaultConnection", throwIfV1Schema: false)
        {
            // print the query to the Debugging window
            Database.Log = (query) => { Debug.WriteLine((string) query); };
            // print the query to the Console
            Database.Log = Console.WriteLine;
        }

        public static MovieStoreDbContext Create()
        {
            return new MovieStoreDbContext();
        }

        public System.Data.Entity.DbSet<Movie> Movies { get; set; }
    }
}