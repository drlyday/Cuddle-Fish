USE [aspnet-aspnet5-20160411023355]
GO
ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId]
GO

/****** Object:  Table [dbo].[Movies]    Script Date: 1/20/2017 11:02:46 AM ******/
DROP TABLE [dbo].[Movies]
GO
/****** Object:  Table [dbo].[Member]    Script Date: 1/20/2017 11:02:46 AM ******/
DROP TABLE [dbo].[Member]
GO
/****** Object:  Table [dbo].[Genres]    Script Date: 1/20/2017 11:02:46 AM ******/
DROP TABLE [dbo].[Genres]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 1/20/2017 11:02:46 AM ******/
DROP TABLE [dbo].[AspNetUsers]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 1/20/2017 11:02:46 AM ******/
DROP TABLE [dbo].[AspNetUserRoles]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 1/20/2017 11:02:46 AM ******/
DROP TABLE [dbo].[AspNetUserLogins]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 1/20/2017 11:02:46 AM ******/
DROP TABLE [dbo].[AspNetUserClaims]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 1/20/2017 11:02:46 AM ******/
DROP TABLE [dbo].[AspNetRoles]
GO

