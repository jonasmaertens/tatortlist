# Tatortlist

Lädt aktuell verfügbare Tatorte aus der Mediathek und die Metadaten dazu von ard.de. Hostet eine PWA mit Watchlist und eine Watched-List inkl. Filter nach Teams, Orten, Datum etc.

## Project setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
rm -r ./server/public/* && cp -a ./dist/. ./server/public/
node ./server/tatortlist.js
```
Server läuft unter PORT 4000 HTTP, auf Raspi über Nginx Reverse Proxy auf https://***REMOVED*** (URL hinterlegt in .env)


