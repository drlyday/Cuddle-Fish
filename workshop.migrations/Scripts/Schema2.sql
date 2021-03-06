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
/****** Object:  Index [UC_Version]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP INDEX [UC_Version] ON [dbo].[VersionInfo] WITH ( ONLINE = OFF )
GO
/****** Object:  Table [dbo].[VersionInfo]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[VersionInfo]
GO
/****** Object:  Table [dbo].[Ratings]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[Ratings]
GO
/****** Object:  Table [dbo].[Movies]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[Movies]
GO
/****** Object:  Table [dbo].[Member]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[Member]
GO
/****** Object:  Table [dbo].[Genres]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[Genres]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[AspNetUsers]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[AspNetUserRoles]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[AspNetUserLogins]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[AspNetUserClaims]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP TABLE [dbo].[AspNetRoles]
GO
USE [master]
GO
/****** Object:  Database [aspnet-aspnet5-20160411023355]    Script Date: 7/31/2018 12:24:26 PM ******/
DROP DATABASE [aspnet-aspnet5-20160411023355]
GO
/****** Object:  Database [aspnet-aspnet5-20160411023355]    Script Date: 7/31/2018 12:24:26 PM ******/
CREATE DATABASE [aspnet-aspnet5-20160411023355]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'aspnet-aspnet5-20160411023355.mdf', FILENAME = N'C:\Users\Dustin Lyday\OneDrive\Software Projects\MovieStore\MovieStoreWebsiteMVC\App_Data\aspnet-aspnet5-20160411023355.mdf' , SIZE = 3264KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'aspnet-aspnet5-20160411023355_log.ldf', FILENAME = N'C:\Users\Dustin Lyday\OneDrive\Software Projects\MovieStore\MovieStoreWebsiteMVC\App_Data\aspnet-aspnet5-20160411023355_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [aspnet-aspnet5-20160411023355].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET ARITHABORT OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET  ENABLE_BROKER 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET  MULTI_USER 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET DB_CHAINING OFF 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET DELAYED_DURABILITY = DISABLED 
GO
USE [aspnet-aspnet5-20160411023355]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](128) NOT NULL,
	[Email] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Genres]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genres](
	[Name] [nchar](10) NOT NULL,
	[Value] [smallint] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Member]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Member](
	[memberId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Address] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED 
(
	[memberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Movies]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Movies](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NULL,
	[ReleaseDate] [datetime] NOT NULL,
	[Genre] [nvarchar](max) NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[StarRating] [smallint] NULL,
	[Rating] [varchar](20) NULL,
 CONSTRAINT [PK_dbo.Movies] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Ratings]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ratings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ParentalGuidanceRating] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_Ratings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[VersionInfo]    Script Date: 7/31/2018 12:24:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VersionInfo](
	[Version] [bigint] NOT NULL,
	[AppliedOn] [datetime] NULL,
	[Description] [nvarchar](1024) NULL
) ON [PRIMARY]

GO
/****** Object:  Index [UC_Version]    Script Date: 7/31/2018 12:24:26 PM ******/
CREATE UNIQUE CLUSTERED INDEX [UC_Version] ON [dbo].[VersionInfo]
(
	[Version] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Movies] ON 

INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (1, N'Cheech and Chong 3', CAST(N'2018-07-31 00:00:00.000' AS DateTime), N'Comedy', CAST(1.96 AS Decimal(18, 2)), 4, N'R')
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (3, N'Pulp Fiction', CAST(N'1997-01-01 00:00:00.000' AS DateTime), N'Drama', CAST(56.25 AS Decimal(18, 2)), 4, N'R')
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (4, N'Matrix 2', CAST(N'2001-01-01 00:00:00.000' AS DateTime), N'Action', CAST(78.00 AS Decimal(18, 2)), 2, N'R')
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (5, N'Star Wars', CAST(N'1973-01-01 00:00:00.000' AS DateTime), N'Action', CAST(0.21 AS Decimal(18, 2)), 4, N'R')
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (6, N'Sausage Party', CAST(N'2016-10-01 00:00:00.000' AS DateTime), N'Comedy', CAST(0.50 AS Decimal(18, 2)), 1, N'R')
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (7, N'Cars', CAST(N'2005-01-01 00:00:00.000' AS DateTime), N'Drama', CAST(12.00 AS Decimal(18, 2)), 1, N'R')
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (8, N'Dustin Gone Cray', CAST(N'2017-01-31 00:00:00.000' AS DateTime), N'Drama', CAST(1.00 AS Decimal(18, 2)), 1, NULL)
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (10, N'test', CAST(N'2017-01-31 00:00:00.000' AS DateTime), N'test', CAST(2.00 AS Decimal(18, 2)), 1, NULL)
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (11, N'qqqq', CAST(N'2017-01-30 00:00:00.000' AS DateTime), N'qqqq', CAST(222.00 AS Decimal(18, 2)), 1, NULL)
INSERT [dbo].[Movies] ([ID], [Title], [ReleaseDate], [Genre], [Price], [StarRating], [Rating]) VALUES (12, N'Get Out', CAST(N'2018-03-05 00:00:00.000' AS DateTime), N'Horror', CAST(19.99 AS Decimal(18, 2)), NULL, NULL)
SET IDENTITY_INSERT [dbo].[Movies] OFF
SET IDENTITY_INSERT [dbo].[Ratings] ON 

INSERT [dbo].[Ratings] ([Id], [ParentalGuidanceRating]) VALUES (1, N'NA')
INSERT [dbo].[Ratings] ([Id], [ParentalGuidanceRating]) VALUES (2, N'G')
INSERT [dbo].[Ratings] ([Id], [ParentalGuidanceRating]) VALUES (3, N'PG')
INSERT [dbo].[Ratings] ([Id], [ParentalGuidanceRating]) VALUES (4, N'PG-13')
INSERT [dbo].[Ratings] ([Id], [ParentalGuidanceRating]) VALUES (5, N'R')
INSERT [dbo].[Ratings] ([Id], [ParentalGuidanceRating]) VALUES (6, N'X')
SET IDENTITY_INSERT [dbo].[Ratings] OFF
INSERT [dbo].[VersionInfo] ([Version], [AppliedOn], [Description]) VALUES (1, CAST(N'2017-01-20 17:30:14.000' AS DateTime), N'M0001CreateMemberTable')
INSERT [dbo].[VersionInfo] ([Version], [AppliedOn], [Description]) VALUES (2, CAST(N'2017-01-20 17:30:14.000' AS DateTime), N'Migration0119171604AddRating')
INSERT [dbo].[VersionInfo] ([Version], [AppliedOn], [Description]) VALUES (3, CAST(N'2017-01-20 17:30:14.000' AS DateTime), N'Migration0119171640TestFwdOnly')
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId]
GO
USE [master]
GO
ALTER DATABASE [aspnet-aspnet5-20160411023355] SET  READ_WRITE 
GO
