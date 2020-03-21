import axios from 'axios'
import Request from 'axios-request-handler'

const FLASK_URI = 'http://localhost:3000'

const client = axios.create({
	baseURL: FLASK_URI,
	json: true
})

class APIClient{
	constructor(accessToken){
		this.accessToken = accessToken
	}
	uploadFile(file){
		return axios.post(`${FLASK_URI}/upload`,file,{headers:{authorization: `Bearer ${this.accessToken}`}})
	}
	pollStatus(location){
		const requestInstance = new Request(
						location,
						{
							headers:
								{
									authorization: 
										`Bearer ${this.accessToken}`
								}
						}
					)
		return requestInstance.poll(2000)
	}
	async perform(method,resource,data){
		return client({
			method,
			url: resource,
			data,
			headers:{
				Authorization: `Bearer ${this.accessToken}`
			}
		}).then(resp=>{
			return resp.data ? resp.data : []
		})
	}
}
export default APIClient
