// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyCqFbNL8VPaLgHIn4EP14nx0oKyOfypNsA",
      authDomain: "changa-argentina.firebaseapp.com",
      databaseURL: "https://changa-argentina.firebaseio.com",
      projectId: "changa-argentina",
      storageBucket: "changa-argentina.appspot.com",
      messagingSenderId: "1042158778601",
      appId: "1:1042158778601:web:1d714cc9ff80a7e6d99878",
      measurementId: "G-2NHHKFFV3C"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
