# Secret Santa
_a rewrite of the PHP secret santa on my old portfolio site_

## ~~BYOB~~ Bring Your Own Mailer
- currently tested and configured for using [mailgun](https://mailgun.com/app/domains) easily

### Install
- ```git clone git@github.com:Wambosa/secret_santa.git```

### Minimal CLI Usage
- ```~/root # node```
- ```var secretSanta = require('secret_santa')```
- ```secretSanta.assignBenefactors(participants)``` takes an array of **participants** and returns that same list with a _random_ **benefactor**
 - where a **participant** is: ```{"name": "Ned Stark", "email": "nStark@got.ded"}```
- you can view the resulting array as your secret santa list and distribute it any festive way you see fit

you: **but i am too lazy to type all that and be festive**  
me: _then just use a data source file and send them an email automatically instead_  

### Sending Mail
- get your savvy chums to provide a json list of names and emails
- get a [mailgun](https://mailgun.com/app/domains) account
- ```secretSanta.configure({domain: domain, apiKey: apiKey})``` takes a [mailgun](https://mailgun.com/app/domains)  domain and apiKey in order to prepare for actual mail sending.
- you must call ```secretSanta.assignBenefactors(participants)``` before sending so that there is something to send! (_hint_, load from a json file)
- then just call ```secretSanta.send()``` without args so that mailgun service is used

you: **i dont like mailgun**  
me: _then just replace the file contents of ./participants.json, and run the example_  

### The Example
- located: ```./spec/not.really.a.spec.js```
- test: ```node ./spec/not.really.a.spec.js ./participants.json```
- run: ```node ./spec/not.really.a.spec.js ./participants.json myMailGunSandboxDomain.com apikeyXXXXXXXXXXXX``` 
- args are strictly positional and space delimited
 - **1st** arg: is the implementation of the secretSanta module
 - **2nd** arg: is the data source file containing a json serialized array of participants
 - **3rd** arg: is the domain name provided at [mailgun](https://mailgun.com/app/domains)
 - **4th** arg: is the api key associated with the aforementioned domain _(it may still be possible to use the sandbox domains)_

### notes
- my father in law asks me to organize a secret santa indiscriminately
- occasionally my wife wants to rig the drawing so that she gets a specific person

### future
- _bring-your-own-mailer_ (design a better interface. the fakeMailer is okay, but it could be better)
- reimplement _easy rigger_
- we typically dont want suggestions to be included, (because it cheapens the quest) however it might be a cool feature