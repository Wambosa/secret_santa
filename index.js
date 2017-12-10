
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

	let name = this.find((v, i) => {
		if(!not.includes(v))
			return this.splice(i, 1)
	})

	return name
}

module.exports = {
	configure: function(options) {
		this.senderName = options.senderName
		this.senderAddress = options.senderAddress
		this.subject = options.subject || "Secret Santa"
		this.mailer = options.mailer
		this.participants = []
		return this
	},

	assignBenefactors: function(participants) {
		let self = this
		let names = shuffle(participants.map(p => p.name))

		return participants.sort((a, b) => a.not.length < b.not.length)
		.map(p => {
			p.benefactor = names.next(p.not.concat(p.name))
			self.participants.push(p)
			return p
		})
	},
	
	send: function() {
		let self = this

		this.participants.forEach(p => {

			let email = {
				from: `${self.senderName} <${self.senderAddress}>`,
				to: p.email,
				subject: `${self.subject} for ${p.name}`,
				text: `Psst!\n${'.'.repeat(200)}\nSecret Message for ${p.name}: ${p.benefactor} is on the nice list! You are their Secret Santa, make sure to get them a gift!`
			}

			this.mailer.messages().send(email, (err, body) => {
				if(err)
					console.error(err)
				else
					console.log(body)
			})
		})
	}
}