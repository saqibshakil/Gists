# escape=`
#FROM registry.mopssys.com/mops-4.0/containers/mops-nodejs
ARG base_image
FROM $base_image

LABEL maintainer="MOPSsys AB - http://www.mopssys.com"

USER ContainerAdministrator

SHELL ["pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
WORKDIR C:/mops/

COPY startup.ps1 ./
COPY versions.ini ./
COPY Get-IniContent.ps1 ./
COPY Out-IniFile.ps1 ./

COPY src/translations/export.json ./translations/

ADD dist/ ./
ADD doc/ ./doc-files

RUN npm i -g serve@13.0.4

EXPOSE 3000

CMD ./startup.ps1; serve . -l 3000
