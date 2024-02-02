
param(
    [ValidateSet('Release','Debug')] $Configuration = 'Debug',
    [ValidateSet('x64','x86')] $Platform = 'x64',
    $Ref = $env:CI_COMMIT_REF_NAME,
    $SymStorePath = $env:SYMSTOREPATH
)

function Coalesce($a, $b) { if ([string]::IsNullOrEmpty($a)) { $b } else { $a } }

$ImageNameCMS = Coalesce($env:MOPS_WEB_DIR, 'mops-ui-cms')

task Build {
    exec {
        yarn
        yarn workspace cms tsc
        # yarn workspace cms test
        yarn workspace cms lint

        .\dobuild.ps1
        # . $env:VCENV_PS1

        .\fixCoverageRefs.ps1
    }
}

task CollectArtifacts {

}

task Clean {
    Write-Output $ImageNameCMS
}

function CopyDocFiles($package) {
    $langs = Get-ChildItem ../../doc | Where-Object {$_.PSIsContainer} | Foreach-Object {$_.Name}
    foreach ($lang in $langs) {
        if(test-path("../../doc/$lang/$package")) {
            remove-item "./doc/$lang/$package/" -Recurse -Force -ErrorAction Ignore
            copy-item "../../doc/$lang/$package" "./doc/$lang/$package/" -recurse
        }
    }
}

task BuildContainerImage {

    Set-Location apps/cms
    Get-ChildItem
    CopyDocFiles "cms"
    docker build -t $ImageNameCMS .
    remove-item "./doc/" -recurse -force
    Set-Location ../..

}

task PushContainerImage {
    exec {
        c:\buildtools\pushimage.ps1 $ImageNameCMS
    }
}

task . Clean, Build, CollectArtifacts, BuildContainerImage, {
}

