import React,{useState,useEffect} from 'react'
import APIClient from '../apiClient'
import RadarChart from 'react-svg-radar-chart'
import 'react-svg-radar-chart/build/css/index.css'

export default function FormUpload(props){
	const [file,setFile] = useState(null)
	const [accessToken,setAccessToken] = useState(null)
	const [taskLocation,setTaskLocation] = useState(null)
	const [predResult,setPredResult] = useState(null)
	const captions = {
		cEXT:'Extraversion',
		cNEU:'Neuroticism',
		cAGR:'Agreeableness',
		cCON:'Conscientiousness',
		cOPN:'Openness'
	}
	useEffect(()=>{
                const fetchAuth = async() => {
                        const accessToken = await props.auth.getAccessToken()
			setAccessToken(accessToken)
			console.log(accessToken)
                }
                fetchAuth();
        },[])
	return(
		<div>
			<form onSubmit={e => {
				let form_data = new FormData()
				form_data.append('file',file,file.name)
				let apiClient = new APIClient(accessToken)
				const result = async () => {
					const response = await apiClient.uploadFile(form_data)
					const data = await response
					const predict = await apiClient.pollStatus(data.headers['location'])
							.get(
								(response) => {
									if (response.data.state === "PENDING") {
										return true
									}	
									else if (response.data.state === "SUCCESS") {
										setPredResult(response.data['result'])
										return false
									}
									else {
										return false
									}
								}
							)
				}
				result()	
				e.preventDefault()
			}}>
				<p>
					<input type="file" 
						id="json" 
						accept="application/json"
						onChange={e=>{
								setFile(e.target.files[0])
								if(file){
									console.log(file)
								}
						}}
						required
					/>
				</p>
					<input type="submit"/>
			</form>
			{
				predResult ?
				<RadarChart
					captions={captions}
					data={[{
						data:{
							cEXT:predResult[0],
							cNEU:predResult[1],
							cAGR:predResult[2],
							cCON:predResult[3],
							cOPN:predResult[4]
						},
						meta:{color:'blue'}
					}]}
				/>
				: <p> You have not submit any post to predict yet </p>
			}
		</div>
	)
}
