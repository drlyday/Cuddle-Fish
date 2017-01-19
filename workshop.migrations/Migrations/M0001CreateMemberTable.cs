using FluentMigrator;

namespace workshop.migrations.Migrations
{
    [Migration(1)]
    public class M0001CreateMemberTable:Migration
    {
        public override void Up()
        {
            Create.Table("Member")
                .WithColumn("memberId").AsInt32().PrimaryKey().Identity()
                .WithColumn("Name").AsString(50)
                .WithColumn("Address").AsString();
        }

        public override void Down()
        {
            Delete.Table("Member");
        }
    }
}
