// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCGpm5s4Fvwr40RLpEpjI_Wa1xksPSJb9s",
    authDomain: "buxy-ng.firebaseapp.com",
    databaseURL: "https://buxy-ng.firebaseio.com",
    projectId: "buxy-ng"
  }
};
