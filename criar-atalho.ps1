# Script PowerShell para criar atalho no Desktop
$WshShell = New-Object -ComObject WScript.Shell
$Desktop = [System.Environment]::GetFolderPath('Desktop')
$ShortcutPath = Join-Path $Desktop "Iniciar EyeVital.lnk"
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "$PSScriptRoot\start.bat"
$Shortcut.WorkingDirectory = $PSScriptRoot
$Shortcut.IconLocation = "C:\Windows\System32\shell32.dll,21"
$Shortcut.Description = "Iniciar projeto TCC EyeVital"
$Shortcut.Save()

Write-Host "Atalho criado no Desktop!" -ForegroundColor Green
Write-Host "Clique duas vezes em 'Iniciar EyeVital' para iniciar o projeto." -ForegroundColor Cyan
