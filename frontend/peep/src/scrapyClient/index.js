export default function getJSONFlist(){
	return (fetch(
		'http://localhost:3000/crawl.json?start_request=false&spider_name=fl&email=gaijin.itsuki@gmail.com&password=itsukiizcool&page=https://m.facebook.com/reinhard.petradi/friends&url=https://m.facebook.com'
		)
		.then(response=>response.json())
	)
}

