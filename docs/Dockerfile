 # syntax=docker/dockerfile:1
  FROM mcr.microsoft.com/dotnet/aspnet:3.1
  COPY publish/ App/
  WORKDIR /App
  EXPOSE 80
  EXPOSE 443

  ENTRYPOINT ["dotnet", "TreeSavior.dll"]