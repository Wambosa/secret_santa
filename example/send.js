var secretSanta = require('../')
const mailgun = require('mailgun-js')

main(process.argv.splice(2))

function main(args) {
	let participantFile = args[0];
	let participants = [];
	let domain = args[1];
	let apiKey = args[2];

	let isDryRun = !domain || !apiKey

	try {
		participants = require(participantFile)
	} catch(err) {
		console.error(`there are no participants in ${participantFile} or the path to file is wrong`)
		console.error(err)
	}

	if(!isDryRun)
		secretSanta.configure({
			senderName: "Some Elf",
			senderAddress: "secret_santa@customtaxapp.com",
			subject: "Secret Santa",
			mailer: mailgun({
				apiKey: apiKey, 
				domain: domain
			})
		})
	else
		secretSanta.configure({
			subject: "Secret Santa -- Dry Run",
			mailer: require('../lib/fakeMailer')
		})

	secretSanta.assignBenefactors(participants)
	secretSanta.send()
}