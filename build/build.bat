@echo off

set scriptroot=%~dp0
pwsh.exe -executionpolicy bypass -file "%scriptroot%\build_addon.ps1" Notebook