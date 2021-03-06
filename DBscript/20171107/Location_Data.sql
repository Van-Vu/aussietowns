USE [Domain]
GO
/****** Object:  Table [dbo].[FullLocationList]    Script Date: 7/04/2017 4:05:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FullLocationList](
	[LocationID] [varchar](25) NULL,
	[SuburbID] [int] NOT NULL,
	[State] [varchar](3) NULL,
	[RegionName] [varchar](50) NULL,
	[AreaName] [nvarchar](50) NULL,
	[Name] [varchar](50) NULL,
	[DisplayInfo] [varchar](119) NULL,
	[Postcode] [varchar](4) NULL,
	[SuburbType] [varchar](1) NOT NULL,
	[Latitude] [float] NULL,
	[Longitude] [float] NULL,
	[MaxLatitude] [float] NULL,
	[MaxLongitude] [float] NULL,
	[MinLatitude] [float] NULL,
	[MinLongitude] [float] NULL,
	[DateModified] [datetime] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_FullLocationList_3] PRIMARY KEY CLUSTERED 
(
	[SuburbID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 85) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Location]    Script Date: 7/04/2017 4:05:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[State] [varchar](3) NOT NULL,
	[Region] [varchar](50) NOT NULL,
	[Area] [varchar](50) NOT NULL,
	[Suburb] [varchar](50) NOT NULL,
	[PostCode] [varchar](4) NOT NULL,
	[CostID] [int] NULL,
	[IsUrbanRegion] [bit] NULL
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[FullLocationList] ADD  CONSTRAINT [DF_FullLocationList_DateModified]  DEFAULT (getdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[FullLocationList] ADD  CONSTRAINT [DF_FullLocationList_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Location] ADD  DEFAULT (0) FOR [IsUrbanRegion]
GO
