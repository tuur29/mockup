
# Mockup (Working title)

An application for making mockups and exporting them to an easily viewable html page.

## How?

Artboards in your project are saved as separate SVG's and then saved inside a HTML page.

Main benefits of this approach:
 - Preview your project locally or via a webserver inside any browser window!
 - You can easily spice up your mockups if you know some HTML/CSS

# Development

Boilerplate used: https://github.com/maximegris/angular-electron

## Included Commands

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

You can deactivate "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

Your application is optimized. Only /dist folder and node dependencies are included in the executable.

## Browser mode

Maybe you want to execute the application in the browser with hot reload ? You can do it with `npm run ng:serve:web`.  
Note that you can't use Electron or NodeJS native libraries in this case. Please check `providers/electron.service.ts` to watch how conditional import of electron/Native libraries is done.
