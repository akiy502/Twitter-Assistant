'use strict';
// https://dev.twitter.com/docs/auth/application-only-auth
// RFC 1738
import xhrModule = require("sdk/net/xhr");

const XMLHttpRequest = xhrModule.XMLHttpRequest

function requestToken(twitterAssistantServerOrigin: string, callbackURL: string){
    console.log('requestToken', twitterAssistantServerOrigin, callbackURL);
    
    return new Promise<AccessToken>((resolve, reject) => {
        const xhr = new XMLHttpRequest({mozAnon: true});
        const url = twitterAssistantServerOrigin + '/twitter/oauth/request_token'
        
        xhr.open('POST', url);

        xhr.addEventListener('load', e => {
            console.log('/oauth2/token status', xhr.status);

            if(xhr.status < 400){
                resolve(xhr.response);
            }
            else{
                reject(url +' HTTP error '+ xhr.status);
            }

        });

        xhr.addEventListener('error', e => {
            reject(url +' error '+ String(e));
        });
        
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({callbackURL: callbackURL}));
    });
}

export = requestToken;
