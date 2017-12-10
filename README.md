# Secret Santa
_a rewrite of the PHP secret santa on my old portfolio site_

### Prerequisites
_node version >= 6.9.1 and [mailgun][mailgun link]_

```
git clone git@github.com:Wambosa/secret_santa.git
cd secret_santa; npm install
```

# How To

### 1. get a mailgun account
_I hope they still offer sandbox accounts for free. They just limit you to like 1000 emails._

### 2. edit [example/participants.json](./example.participants.json)
_putting in your real list of people_

### 3. dry run
`node ./example/send.js ./participants.json`

### 4. run the job
`node ./example/send.js ./participants.json myMailGunSandboxDomain.com apikeyXXXXXXXXXXXX`

- args are strictly positional and space delimited
 - **1st** arg: is the implementation of the secretSanta module
 - **2nd** arg: is the data source file containing a json serialized array of participants
 - **3rd** arg: is the domain name provided at [mailgun](https://mailgun.com/app/domains)
 - **4th** arg: is the api key associated with the aforementioned domain _(it may still be possible to use the sandbox domains)_

----------

## future
- we typically dont want suggestions to be included, (because it cheapens the quest) however it might be a cool feature


[mailgun link]: https://mailgun.com/app/domains