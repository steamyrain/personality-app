const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const ISSUER = process.env.REACT_APP_ISSUER
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK

export default {
	oidc:{
		clientId:CLIENT_ID,	
		issuer:ISSUER,
		redirectUri:REDIRECT_URI,
		scopes:['openid','email'],
		disableHttpsCheck:OKTA_TESTING_DISABLEHTTPSCHECK
	},
	resourceServer:{
		scraperUrl: 'http://localhost:3000/crawl.json?start_request=false&spider_name=fl&email=gaijin.itsuki@gmail.com&password=itsukiizcool&page=https://m.facebook.com/reinhard.petradi/friends&url=https://m.facebook.com'
	}
}
