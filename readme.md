This repo contains the boilerplates for gamil add-on and notes for development.

### Setup
* create standalone script project, manually switch it to a standard google cloud platform project. For difference of default and standard projects and why/how to migrate, see official guide to [cloud platform projects](https://developers.google.com/apps-script/guides/cloud-platform-projects).
* setup [clasp](https://github.com/google/clasp).
* install as developer add-on for test, doc [here](https://developers.google.com/gsuite/add-ons/how-tos/testing-gmail-addons).

### Logging and Analytics
If setup a standard google cloud platform project and link to the apps script projetc, use `console.log`, `console.info`, `console.error`, etc, will send log to [stackdriver logs](https://console.cloud.google.com/projectselector2/logs/viewer?supportedpurview=project) automatically.
* each log has a user key attached in "labels" of the log metadata
* can also send customized information such as user id
* enable `Log exceptions` in apps script project to capture exceptions in large user base.
* [Stackdriver Error Reporting](https://developers.google.com/apps-script/guides/logging#stackdriver_error_reporting) - no additional setup is needed for apps script projects

#### Short-term logging 
if log for debugging,  can use `Logger.log` instead of `console.log`. This will send data to Apps Script Logger, which is lightweight but only persists a short time, more [here](https://developers.google.com/apps-script/guides/logging).

#### Pricing of Stackdriver Logging
[Pricing guide](https://cloud.google.com/stackdriver/pricing)

### Card Update and Navigation
* Basic navigation - stack cards together, as in `contextualAddOn.buildContextualAddOn`
* Custom Navigation, refer to `buildButtonCard.btn2OnClickCallback` , `buildInfoWidgetCard.navToButtonCard`, and `universalActions.createSettingsResponse`

### Error handling
use `try{...}catch(e){...}` to render error handling UI, for example `universalActions.showErrorUIexample`.

### External API
* put external api domain to `urlFetchWhitelist` field of `appsscript.json` -- only allow https protocol, and must have trailing slash.
* check `buildExternalCard.onConfirmDropdown`.
[connect to non-google services](https://developers.google.com/gsuite/add-ons/how-tos/non-google-services)
[UrlFetchApp class](https://developers.google.com/apps-script/reference/url-fetch/)
Examle external api used for testing: [News API](https://newsapi.org/docs/endpoints/top-headlines). Need to register and get free API Key.

### Contextual triggered and Compose triggered Add-ons
* Cards for contextual and for compose may not be used interchangeably, because the two triggers pass different information to the callbacks.
* UI components are the same.

### Examples of implementation
* search threads
* create/modify draft
* send/reply/forward message (can add attachment)
* get message metadata
* create/delete label
* mark message/thread (un)read, (un)important, (un)starred
* (un)trash/(un)spam/(un)archive threads

Note: can also use `MailApp` to send mail instead of `GmailApp`, [docs](https://developers.google.com/apps-script/reference/mail/mail-app).

* Interact with other google services
* Interact with external API

#### Some reference shortcuts
[official doc for add-ons](https://developers.google.com/gsuite/add-ons/overview)
[Manifest structure](https://developers.google.com/apps-script/manifest)
[gmail scopes(add-on)](https://developers.google.com/gsuite/add-ons/concepts/gmail-scopes)
[gmail scopes](https://developers.google.com/gmail/api/auth/scopes)
[google scopes](https://developers.google.com/identity/protocols/googlescopes)