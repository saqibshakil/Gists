# Post Localizations
try {
  . .\general\Post-Localizations.ps1
  Post-Localizations
}
catch [System.Net.WebException] {
  Write-Host "An exception was caught: $($_.Exception.Message)" -BackgroundColor DarkRed
  $_.Exception.Response
  break
}

# Copy MFE docs
Write-Host "Checking if docs already exist..."
if (-Not (test-path("./data/doc-copied"))) {
    # Write-Host "Docs do not exist, cleaning up..."
    # Remove-Item ./doc/* -Recurse -Force -ErrorAction Ignore
    # write-host("Fetching docs, available languages:")
    # write-host("-----------------------------------")
    # Get-ChildItem ./doc-files | Where-Object {$_.PSIsContainer} | Foreach-Object {$_.Name}
    # write-host("-----------------------------------")
    Write-Host "Copying new docs..."
    Copy-Item ./doc-files/en/* ./doc/en/ -Recurse -Force
    new-item -force -path ./data/doc-copied -value "This file indicates that documentation has been copied." -type file
    Write-Host "Docs copied!"
}
else {
    Write-Host "Docs already exist"
}

# Update Versions
try {
  . .\general\Update-Versions.ps1
  Update-Versions
}
catch [System.Net.WebException] {
  Write-Host "An exception was caught: $($_.Exception.Message)" -BackgroundColor DarkRed
  $_.Exception.Response
  break
}

Write-Host "serving build!"
