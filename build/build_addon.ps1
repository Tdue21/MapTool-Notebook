Param([Parameter(Mandatory=$true)][String]$AddonLibrary)

$zipFile = "$AddonLibrary.zip"
$finalFile = "$AddonLibrary.mtlib"

$libraryPath = Resolve-Path -Path (Join-Path -Path $PSScriptRoot -ChildPath "..\source\")
$releasePath = Resolve-Path -Path (Join-Path -Path $PSScriptRoot -ChildPath "..\release\")

$zipDestination = Join-Path -Path $releasePath -ChildPath $zipFile
$finalDestination = Join-Path -Path $releasePath -ChildPath $finalFile

Compress-Archive -Path $libraryPath\* -DestinationPath "$zipDestination" -Force

if(Test-Path -Path "$finalDestination"){
    Remove-Item -Path "$finalDestination"
}
Rename-Item -Path "$zipDestination" -NewName $finalDestination -Force