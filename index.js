
class SecretSanta {

  configure(options) {
    this.senderName = options.senderName
    this.senderAddress = options.senderAddress
    this.subject = options.subject || "Secret Santa"
    this.mailer = options.mailer
    this.participants = []
    this.cycles = 0
    return this
  }

  assignBenefactors(persons) {
    let working = true

    while(working) {
      this.cycles++
      let niceList = shuffle(persons)
      this.participants = persons.sort((a, b) => a.not.length < b.not.length)
        .map(p => {
          p.benefactor = niceList.next(p.not.concat(p.name))
          return p
        })

      working = this.participants.find(p => !p.benefactor)
    }
  }

  send() {
    this.participants.forEach(p => {
      let email = {
        from: `${this.senderName} <${this.senderAddress}>`,
        to: p.email,
        subject: `${this.subject} for ${p.name}`,
        text: say(p)
      }

      this.mailer.messages().send(email, (err, body) => {
        if(err)
          console.error(err)
        else
          console.log(body)
      })
    })

    console.log(`send complete with ${this.cycles} cycles`)
  }

}

function say(participant) {
  let receiver = participant.benefactor
  return `
    Psst!
    Here is the Secret Santa message you've been patiently waiting for all year.
    ${'.'.repeat(200)}
    Secret Message for ${participant.name}:

    ${receiver.name} is on the nice list!
    ${receiver.name} ${receiver.likes}.
    You are their Secret Santa, make sure to get them a gift!
  `
}

function random(upper, lower) {
  upper++
  lower = lower || 0
  return Math.floor((Math.random() * (upper - lower)) + lower)
}

function shuffle(list_) {
  let list = list_.slice(0)
  let count = list.length
  let swap = 0

  for (let i = count-1; i > -1; i--) {
    swap = random(i)
    list[i] = list.splice(swap, 1, list[i])[0]
  }

  return list
}

Array.prototype.next = function(not) {

  let element = this.find((v, i) => {
    if(!not.includes(v.name))
      return this.splice(i, 1)
  })

  return element
}


module.exports = SecretSanta