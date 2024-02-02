((Get-Content -path .\apps\cms\coverage\cobertura-coverage.xml -Raw) -replace ([regex]::Escape('\apps\cms')),'') | Set-Content -Path .\apps\cms\coverage\cobertura-coverage.xml

((Get-Content -path .\apps\cms\coverage\cobertura-coverage.xml -Raw) -replace '"src','"apps\cms\src') | Set-Content -Path .\apps\cms\coverage\cobertura-coverage.xml
