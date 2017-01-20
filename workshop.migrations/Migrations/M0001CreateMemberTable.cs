using FluentMigrator;

namespace workshop.migrations.Migrations
{
    [Migration(1)]
    public class M0001CreateMemberTable:Migration
    {
        public override void Up()
        {
            Execute.EmbeddedScript("Migration0000000StartHere.sql");
        }

        public override void Down()
        {
            Execute.EmbeddedScript("Migration0000000EndHere.sql");
        }
    }
}
