
# Useful commands

## Running

|Command|Description|
|--|--|
|`npm start`| Build for development |
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

## Generating

### Generate new part
```
ng g module parts/home/menubar --spec=false -m pages/home/home.module.ts;
ng g component parts/home/menubar --module parts/home/menubar/menubar.module.ts --export
```
Then import the generated module where you need it.
You will also probably want to import SharedModule in the generated module.

### Inspect bundle sizes
You need to install npm-run first: `npm install -g npm-run `
```
ng build --prod --stats-json;
npm run bundle-report
```