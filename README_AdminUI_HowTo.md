# Repository Information: PDM-AdminUI
This repository contains source code related to the PDM Administrative UI. 


The structure of this repository is as follows:

## Build\
This folder contains build related scripts and configuration information.

## AngularClient\
    This is the "UI" part of the admin UI and is a regular Angular project based on the 
	Angular CLI.  
	
	To build, change directories into the AngularClient dir
    and type: "ng serve -o" and debug via the Chrome debugger.
    When deploying, type "ng build --prod" and copy contents of new "dist" directory
    into the "Asp.NetCoreHost"'s wwwroot.

## Asp.NetCoreHost\
	This is a the host container for the UI component (as opposed to hosting in IIS or some other app). 
	The host can run as either a console app or as a Windows Service.

	To run on the desktop, using a cmd prompt running with elevated permissions: 
	"dotnet run --console"

	How to deploy Asp.Net hosted Angular app?
		In elevated permission Visual Studio: build->publish
	or via the console:
		not net publish --output <outputPath>
