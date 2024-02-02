$html = (Get-Content -path .\index.html -Raw)

$auth_config = (Get-Content -path ..\conf\auth_config.json -Raw)

$new_auth_config = '<script id="config"> window.config = ' + $auth_config + ' </script>'

$html = $html -replace '\n*',''
$html = $html -replace '<script id="config"[\w\W][^>]*>', $new_auth_config
$html | Set-Content -Path .\index.html