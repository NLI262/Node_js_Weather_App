const request=require('postman-request')



const forecast=(location, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=115bbfdd127b83cb46a14ef6a55eb70c&query='+location
    request(url, (error,response)=>{
        const parsed=JSON.parse(response.body)
      
        
        if(error){
            callback('No internet pa', undefined)
        }
        else if(parsed.error)
        {
         
         callback(parsed.error.info, undefined)
        }
        else{
         
             callback(undefined ,parsed.current.temperature )
        
       }
    })
    
}

module.exports =forecast 