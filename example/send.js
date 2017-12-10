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
		process.exit(1)
	}

	if(isDryRun)
		secretSanta.configure({
			mailer: require('../lib/fakeMailer')
		})
	else
		secretSanta.configure({
			senderName: "Some Elf",
			senderAddress: "secret_santa@customtaxapp.com",
			subject: "Secret Santa",
			mailer: mailgun({
				apiKey: apiKey, 
				domain: domain
			})
		})

	secretSanta.assignBenefactors(participants)
	secretSanta.send()
}