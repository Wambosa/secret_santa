"use strict";

let secretSanta = null;

// note: if running from repo
try {secretSanta = require('../');}
catch (_) {secretSanta = require('secret_santa');}

main(process.argv.splice(2));

function main(args){
    
    let participantFile = args[0];
    let domain = args[1];
    let apiKey = args[2];
    
    if(domain && apiKey)
        secretSanta.configure({domain: domain, apiKey: apiKey});
    else
        var imposterMailMan = {
            messages : function(){
                this.send = function(data, callback){
                    
                    console.warn("pretend send");
                    console.log(JSON.stringify(data, null, ' '));
                    
                    callback(null, {ok:true});
                };
                
                return this;
            }
        };

    if(participantFile)
        var participants = require(participantFile);

    if(participants)
        secretSanta.assignBenefactors(participants)
            .then(function(){
                secretSanta.send(imposterMailMan);
            })
            .catch(console.error);
    else
        console.warn(`there are no participants in ${participantFile}`, 'try using ./ (dot slash to target with relative paths)');
}