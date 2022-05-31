/// <reference types="Cypress"/>

describe('Oauth feature apis', () => {

    let access_token = '';
    let userId = '';


    beforeEach('generate token', () => {



        it('get the access user token', () => {

            //to get the token id(access token)
            cy.request({

                method: 'POST',
                //url: 'http://coop.apps.symfonycasts.com/token',
                url: '/token',
                form: true,
                body: {
                    "client-id": "CypressApp",
                    "client_secret": "dydbffunsuhuwbfubaubnwidmnbbAB", //auto-generated ; then->copy&paste
                    "grant_type": "client_credentials"
                }



            }).then(reponse => {
                cy.log(JSON.stringify(reponse));
                cy.log(reponse.body.access_token);
                access_token = reponse.body.access_token;


                //get the user id
                cy.request({
                    method: 'GET',
                    //url: 'http://coop.apps.symfonycasts.com/api/me',
                    url: '/api/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }

                }).then(reponse => {

                    userId = reponse.body.id;
                    cy.log("user id " + userId);
                })

            })

            it('Unlock the Barn Test', () => {


                cy.request({
                    method: 'POST',
                    //url: 'http://coop.apps.symfonycasts.com/api/' + userId + '/barn-unlock',
                    url: '/api/' + userId + '/barn-unlock',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                }).then(reponse => {

                    cy.log(JSON.stringify(reponse));
                    expect(reponse.status).to.equal(200);
                })

            })


        })

            it('Put the Toilet Seat Down Test', () => {


                cy.request({
                    method: 'POST',
                    //url: 'http://coop.apps.symfonycasts.com/api/' + userId + '/toiletseat-down',
                    url: '/api/' + userId + '/toiletseat-down',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                }).then(reponse => {

                    cy.log(JSON.stringify(reponse));
                    expect(reponse.status).to.equal(200);
                })

            })

            it('Chicken Feed Test', () => {


                cy.request({
                    method: 'POST',
                    //url: 'http://coop.apps.symfonycasts.com/api/' + userId + '/chickens-feed',
                    url: '/api/' + userId + '/chickens-feed',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                }).then(reponse => {

                    cy.log(JSON.stringify(reponse));
                    expect(reponse.status).to.equal(200);
                })

            })


            //})
        //})
    })

})