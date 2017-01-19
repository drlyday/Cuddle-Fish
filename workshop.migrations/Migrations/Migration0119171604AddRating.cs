using FluentMigrator;

namespace workshop.migrations.Migrations
{
    [Migration(2)]
    public class Migration0119171604AddRating:Migration
    {
        public override void Up()
        {
            Execute.EmbeddedScript("Migration0119171604AddRating.sql");
        }

        public override void Down()
        {
            Execute.EmbeddedScript("Migration0119171604DropRating.sql");
        }
    }
}
