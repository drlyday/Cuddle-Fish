cd ..\..\packages\FluentMigrator.1.6.2\tools

.\Migrate.exe /connection "data source=(localdb)\MSSQLLocalDB;initial catalog=aspnet-aspnet5-20160411023355; Integrated Security=SSPI;"  /db SQLserver2014 /timeout 600 /target ..\..\..\workshop.migrations\bin\Debug\workshop.migrations.dll /verbose /version 0 /task migrate:up