"use strict";

function random(upper, lower) {
    upper++;
    lower = lower || 0;
    return Math.floor((Math.random() * (upper - lower)) + lower);
}

function shuffle(list_) {
        let list = list_.slice(0);
        let count = list.length;
        let swap = 0;

        for (let i = count-1; i > -1; i--) {
            swap = random(i);
            list[i] = list.splice(swap, 1, list[i])[0];
        }

        return list;
}

module.exports = {
    configure: function(options){

        this.senderName = options.senderName || "Some Elf";
        this.senderAddress = options.senderAddress || "secret_santa@customtaxapp.com";
        this.subject = options.subject || "Secret Santa";
        
        let apiKey = options.apiKey;
        let domain = options.domain;
        
        this.mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});
        
        return this;
    },
    
    assignBenefactors: function(participants){
        
        let names = shuffle(participants.map(function(p){
            return p.name;
        }));
        
        this.participants = participants.map(function(p){
            p.benefactor = names.pop();
            return p;
        });
        
        return Promise.resolve(this.participants);
    },
    
    send: function(mailMan){
        let self = this;
        
        let mailer = mailMan || this.mailgun;
        
        this.participants.forEach(function(participant){
            
            let email = {
              from: `${self.senderName} <${self.senderAddress}>`,
              to: participant.email,
              subject: `${self.subject} for ${participant.name}`,
              text: `Psst!\n...................................................................................................................................\nSecret Message for ${participant.name}: ${participant.benefactor} is on the nice list! You are their Secret Santa, make sure to get them a gift!`
            };
            
            mailer.messages().send(email, function (error, body) {
              console.log(body);
            });
        });
    }
}