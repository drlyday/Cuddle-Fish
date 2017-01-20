using FluentMigrator;

namespace workshop.migrations.Migrations
{
    [Migration(3)]
    public class Migration0119171640TestFwdOnly : Migration
    {
        public override void Up()
        {
            Create.Table("Ratings").WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("ParentalGuidanceRating").AsString(30);

            Insert.IntoTable("Ratings").Row(new {ParentalGuidanceRating = "NA"});
            Insert.IntoTable("Ratings").Row(new {ParentalGuidanceRating = "G"});
            Insert.IntoTable("Ratings").Row(new {ParentalGuidanceRating = "PG"});
            Insert.IntoTable("Ratings").Row(new {ParentalGuidanceRating = "PG-13"});
            Insert.IntoTable("Ratings").Row(new {ParentalGuidanceRating = "R"});
            Insert.IntoTable("Ratings").Row(new {ParentalGuidanceRating = "X"});
        }

        public override void Down()
        {
            Delete.Table("Ratings");
        }
    }
}
