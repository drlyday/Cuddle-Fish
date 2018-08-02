$env:path += ";" + (Get-Item "Env:ProgramFiles").Value + "\Git\user\bin" 

Set-Alias ssh-agent "$env:ProgramFiles\git\usr\bin\ssh-agent.exe" 

Set-Alias ssh-add "$env:ProgramFiles\git\usr\bin\ssh-add.exe" 

$projectRootPath = "C:\Users\dlyday\Source\examples\aspnet5"

Import-Module PsGet 
  

function global:prompt { 

    $realLASTEXITCODE = $LASTEXITCODE 

    Write-Host -nonewline  -ForegroundColor Gray "[ " 

    Write-Host($pwd.ProviderPath) -nonewline -ForegroundColor White 

    Write-Host  -ForegroundColor Gray " ] " 

    Write-VcsStatus 

    $global:LASTEXITCODE = $realLASTEXITCODE 

    Write-Host -ForegroundColor Gray " $(Get-Date -Format 'r')" 

    return "> " 

} 

  

function killTasks{ 

                taskkill /F /IM MSBuild.exe 

                taskkill /F /IM JetBrains* 

                taskkill /F /IM VSTest* 

                taskkill /F /IM Microsoft.Alm.Shared.Remoting.Remote* 

                taskkill /F /IM Microsoft.VisualStudio.Web.Host.exe 

                taskkill /F /IM NUnit* 

} 

  

function gac([string]$message = ""){ 

                gs 

                askQuestion("Do you want to check these files in?"); 

                git status -v 

                askQuestion("Seriously?"); 

                git add -A 

                git commit -m $message 

} 

  

function pullit{ 

                git pull 

} 

  

function gs{ 

                git status 

} 

  

function ghistory{ 

                git log --author 'lyd68j' 

} 

  

function gokarma{ 

                karma start C:\Users\lyd68j\Source\Repos\Estream\Source\Estream.Web\karma.conf.js.in.noCoverage --browsers=Chrome --single-run=false --debug 

} 

  

function list { 

    " 

    publishproduction : builds ang and core into publish directory 

    - 

    merge-check : displays merge status 

    serve : serve angular app 

    test : test angular app 

    copydist-to-host 

    move-host-files-to-share : copies asp.net core publish dir to network share 

    runhost : run asp.net  

    runhost-withbuild : run asp.net with build 

    buildang-prod : production build 

    buildang-buildrunhost: buildang-prod+copydist-to-host+buildrunhost 

    buildang-runhost: buildang-prod+copydist-to-host+runhost 

    npminstall : removes npm proxy, installs npm modules, adds npm proxy 

    npmupdate 

    ghistory 

    gs 

    pullit
	
    dbmigrate: builds database
	
    dbkill: reverts all database migrations
	
	" 

} 

  

function npminstall{ 

  npm config delete -g proxy 

  npm config delete -g https-proxy 

  npm install -g 

  npm config set proxy http://amrproxy.bp.com:80  

  npm config set https-proxy http://amrproxy.bp.com:80 

} 

  

function npmupdate{ 

  npm config delete -g proxy 

  npm config delete -g https-proxy 

  npm update -g --save 

  npm config set proxy http://amrproxy.bp.com:80  

  npm config set https-proxy http://amrproxy.bp.com:80 

} 

  

function npmupdatenpm{ 

  npm config delete -g proxy 

  npm config delete -g https-proxy 

  npm install -g npm 

  npm config set proxy http://amrproxy.bp.com:80  

  npm config set https-proxy http://amrproxy.bp.com:80 

} 

  

function npmproxy-delete{ 

  npm config delete -g proxy 

  npm config delete -g https-proxy 

} 

  

function disable-npmconfig{ 

    rename C:\Users\lyd68j\.npmrc .npmrc_temp 

} 

  

function enable-npmconfig{ 

    rename C:\Users\lyd68j\.npmrc_temp .npmrc 

} 

  

function npmproxy-set{ 

  npm config set proxy http://amrproxy.bp.com:80  

  npm config set https-proxy http://amrproxy.bp.com:80 

} 

  

function runhost-withbuild { 

    cd C:\Users\dlyday\Source\examples\aspnet5\CuddleFishServices 

    pwd 

    "Running Host" 

    dotnet run --console 

} 

  

function runhost { 

    cd C:\Users\dlyday\Source\examples\aspnet5\CuddleFishServices 

    pwd 

    "Running Asp.Net Core Host" 

    dotnet run --console --nobuild -c Release 

} 

  

  

function buildang-prod { 

    cd C:\Users\dlyday\Source\examples\aspnet5\; 

    pwd 

    "Building PDM Admin: Angular app" 

    ng build --prod 

} 

  

function copydist-to-host { 

    "Copying files" 

    cd C:\Users\dlyday\Source\examples\aspnet5\CuddleFishServices 

    md -Force ./wwwroot   

    $source= "C:\Users\dlyday\Source\examples\aspnet5\AngularClient\dist" 

    $destination= "C:\Users\dlyday\Source\examples\aspnet5\CuddleFishServices\wwwroot" 

    Write-Host "Copying angular dist to Asp.Net Host " -BackgroundColor "YELLOW" -ForegroundColor "Black" 

    Write-Host "Source: $source : " -BackgroundColor "YELLOW" -ForegroundColor "Black" 

    Write-Host "Target: $destination : " -BackgroundColor "YELLOW" -ForegroundColor "Black"      

    robocopy $source $destination *.* /MIR   

    pwd 

    Write-Host –NoNewLine  ""FINISHED Copying files: Confirm"" " -BackgroundColor "YELLOW" -ForegroundColor "Black"       

} 

  

function publishcorehost{ 

    "Publishing Core Host in Release mode" 

    cd C:\Users\dlyday\Source\examples\aspnet5\CuttleFishHost\CuddleFishHost

    dotnet publish -c Release 

} 

  

  

function buildang-runhost{ 

    buildang-prod 

    copydist-to-host 

    runhost 

} 

  

function move-host-files-to-share(){ 

    $source= "C:\Users\dlyday\Source\examples\aspnet5\CuddleFishServices\bin\Release\net461\publish" 

    $destination= "I:\ngg\ISTDCT\lyday\PDM-AdminUI" 

  

    Write-Host "Moving files to networkshare " -BackgroundColor "YELLOW" -ForegroundColor "Black" 

    Write-Host "Target: $destination " -BackgroundColor "YELLOW" -ForegroundColor "Black" 

     

    robocopy $source $destination *.* /MIR 

} 

  

function askQuestion([string]$arg1){ 

    Write-Host $arg1 -BackgroundColor "Black" -ForegroundColor "Cyan" 

  

    Write-Host "Press any key to continue ..." -BackgroundColor "Black" -ForegroundColor "Yellow" 

  

    $x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 

} 

  

  

function buildang-buildrunhost{ 

    buildang-prod 

    copydist-to-host 

    runhost-withbuild  

} 

  

function publishproduction{ 

    askQuestion("Are you in admin mode?????"); 

    askQuestion("Have you started Application Tools for exceptions?????"); 

  

    Write-Host "DO WORK! " -BackgroundColor "YELLOW" -ForegroundColor "Black" 

    "buildang-prod" 

    buildang-prod 

    "copydist-to-host" 

    copydist-to-host 

    "publishcorehost" 

    publishcorehost 

    "move-host-files-to-share" 

    move-host-files-to-share 

    "COMPLETE" 

} 

  

function test { 

    "Running npm run test instead of ng test ensures tests are run with the version of @angular/cli specified in package.json" 

    "npm run test" 

    npm run test; 

} 

  

function serve { 

    "Running npm start instead of ng serve ensures the app is served with the version of @angular/cli specified in package.json" 

    "npm start" 

    npm start 

} 

  

function merge-check { 

    "-------------" 

    "What is merged to master? " 

    "git branch -r --merged origin/master " 

    git branch -r --merged origin/master 

    "-------------" 

    "what is merged to develop?" 

    "git branch --merged develop" 

    git branch --merged develop 

    "-------------" 

    "what is NOT merged to develop? " 

    "git branch --no-merged develop " 

    git branch --no-merged develop 

    "-------------""-------------" 

    "what is merged to THIS current branch? " 

    "git branch --merged" 

    git branch --merged 

    "-------------" 

    "-------------""-------------" 

    "what is NOT merged to THIS current branch? " 

    "git branch --no-merged" 

    git branch --no-merged 

    "-------------" 

} 

  

function saltpeppa{ 

    [console]::beep(404,350)  ##D 

    [console]::beep(605,250)  ##A 

    [console]::beep(539,350)  ##G 

    [console]::beep(480,350)  ##F 

    [console]::beep(453,350)  ##E 

    [console]::beep(360,350)  ##C 

    [console]::beep(360,350)  ##C 

    [console]::beep(453,250)  ##E 

    [console]::beep(479,250)  ##F 

    [console]::beep(453,250)  ##E 

    [console]::beep(360,250)  ##C 

} 

function tone{ 

    [console]::beep(339,350)  ##D 

} 

function pushit{ 

                git push 

                saltpeppa 

} 

function dbmigrate {

	$projectRootPath
	
	cd $projectRootPath'\workshop.migrations\Util'
	
	start-process RunMigration.bat
}

function dbkill {

	$projectRootPath
	
	cd $projectRootPath'\workshop.migrations\Util'
	
	start-process RoleBackToStart.bat
}

  

Set-Location 'C:\Users\dlyday\Source\examples\aspnet5\AngularClient' 

"You are now entering PowerShell : " + $env:Username 

  

Import-Module 'C:\tools\poshgit\dahlbyk-posh-git-a4faccd\src\posh-git.psd1' 