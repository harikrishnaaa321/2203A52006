import axios from "axios";
const limit=4;
let prevData=[];
let currData=[];
const endpoints={
  p:"http://20.244.56.144/evaluation-service/primes",
  f:"http://20.244.56.144/evaluation-service/fibo",
  e:"http://20.244.56.144/evaluation-service/even",
  r:"http://20.244.56.144/evaluation-service/rand",
};
export const getNumbers=async(req,res)=>{
  const {number_id}=req.params;
  const link=endpoints[number_id];
  if(!link){
    return res.status(400).json({error:"Invalid"});
  }
  try{
    prevData=[...currData];
    const apiReply=await axios.get(link,{
      headers:{Authorization:`Bearer ${process.env.BEARER_TOKEN}`},
      timeout:5000,
      validateStatus:()=>true,
    });
    if(apiReply.status!==200){
      return res.status(apiReply.status).json({
        error:"error occured",
        status:apiReply.status,
        details:apiReply.data,
      });
    }
    const fetched=apiReply.data.numbers||[];
    currData=fetched.slice(-limit);
    const total=currData.reduce((a,b)=>a+b,0);
    const average=currData.length?(total/currData.length).toFixed(2):"0.00";
    res.json({
      windowPrevState:prevData,
      windowCurrState:currData,
      numbers:currData,
      avg:average,
    });
  }catch(err){
    res.status(500).json({
      error:"Failed to fetch numbers",
      message:err.message,
    });
  }
};
