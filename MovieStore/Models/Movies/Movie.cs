using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MovieStore.Validations.Validations;

namespace MovieStore.Models.Movies
{
    public class Movie : IValidatableObject
    {
        public int ID { get; set; }
        public string Title { get; set; }
        [DataType(DataType.Date)]
        [PastDate(ErrorMessage = "Please enter a past date")]
        [Required(ErrorMessage = "When was the movie released?")]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }
        public decimal Price { get; set; }
//        [Required(ErrorMessage = "What is your Rating?")]
        public short? StarRating { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var errors = new List<ValidationResult>();

            if (StarRating < 0 || StarRating > 5)
            {
                errors.Add(new ValidationResult("Stars must be betweeen 0 and 5"));
            }

            return errors;
        }
    }
}
