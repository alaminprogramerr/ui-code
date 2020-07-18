import namor from "namor";
import axios from "axios";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = () => {
    const statusChance = Math.random();
    return {
        firstName: namor.generate({ words: 1, numbers: 0 }),
        lastName: namor.generate({ words: 1, numbers: 0 }),
        };
};

export function makeData(len = 1) {
    return range(len).map(d => {
        return {
            ...newPerson(),
            children: range(1).map(newPerson)
        };
    });
}

export function makePostCall(posturl,payload){
  axios({
  method: 'post',
  url: posturl,  
  data:payload
  })
  .then((response) =>  {
       alert(JSON.stringify(response.data))
       return response
  })
  .catch(function (error) {
    console.log(error);
    return {}
  })
  
}

export function makeGetCall(geturl,payload){
  
  var response_data = []
  
      axios({
      method: 'get',
      url: geturl,
      })
    .then((response) =>  {
      //  alert(JSON.stringify(response.data))
         response_data.push(response.data)
    })
    .catch(function (error) {
      console.log(error);
    //  return {}
    })
    alert(response_data)
  return response_data
}


const trigger_api = async (get_url) => {
  try {
    return await axios.get(get_url)
  } catch (error) {
    console.error(error)
  }
}


const axiosTest  = async (url) => {
   return await axios.get(url)
   .then(function (response) {
           console.log(response.data);
           alert(response.data)
           return response.data;
          })
.catch(function (error) {
   console.log(error);
});
}


export const make_get_call = async (get_url) =>{
  const response = await axiosTest(get_url)
  return response 
}
