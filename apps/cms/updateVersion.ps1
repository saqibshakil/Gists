$ini = Get-IniContent .\versions.ini
$ini["mops.system:app.group.2.cms"]["mops.web.cms:app.version"] = if ($env:CI_COMMIT_TAG) { $env:CI_COMMIT_TAG } else { $env:CI_COMMIT_BRANCH }
$ini | Out-IniFile -Force -FilePath  .\versions.ini
