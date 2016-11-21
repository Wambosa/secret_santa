# Secret Santa
_a rewrite of the PHP secret santa on my old portfolio site_


#### requires a mailgun account


### usage
- ```npm install```
- args are stricly positional and space delimited
 - ```node ./spec/not.really.a.spec.js ./participants.example myMailGunDomain.com apikeyXXXXXXXXXXXX``` 
- first arg is the implementation of the secretSanta module
- second arg is the source file containing a json serialized array of participants
 - the signature is ```{"name": "John Snow", "email": "jsnow@got.ded"}```
- the third arg is the domain name provided at [mailgun](https://mailgun.com/app/domains)
- the fourth arg is the api key associated with the aforementioned domain (it may still be possible to use the sandbox domains)


### notes
- my father in law asks me to organize a secret santa indiscriminately
- occasionally my wife wants to rig the drawing so that she gets a specific person


### future
- _bring-your-own-mailer_ (design a better interface. the fakeMailer is okay, but it could be better)
- reimplement _easy rigger_
- we typically dont want suggestions to be included, (because it cheapens the quest) however it might be a cool feature