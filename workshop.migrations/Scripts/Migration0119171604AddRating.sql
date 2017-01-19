ALTER TABLE [dbo].[Movies] ADD Rating VARCHAR(20) NULL
GO
Update dbo.Movies Set Rating = 'R'
GO