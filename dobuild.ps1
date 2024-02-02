
if ($env:CI_COMMIT_BRANCH -eq "MOPS40-develop" -or $env:CI_COMMIT_BRANCH -eq "master" -or $env:CI_COMMIT_TAG -match "^v[0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z_]+-[0-9]+)?$" -or $env:BUILD_MODE -eq "Production" ) {
    yarn workspace cms build -p --mode=production --config webpack.prod.config.js
}
else {
    yarn workspace cms build
}
