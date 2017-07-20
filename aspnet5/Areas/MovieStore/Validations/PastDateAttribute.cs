using System;
using System.ComponentModel.DataAnnotations;

namespace aspnet5.Areas.MovieStore.Validations
{
    public class PastDateAttribute : RequiredAttribute
    {
        public override bool IsValid(object value)
        {
            return base.IsValid(value) && ((DateTime) value) < DateTime.Now;
        }
    }
}