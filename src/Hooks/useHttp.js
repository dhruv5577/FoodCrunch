import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

async function sendHttpReq(url,configure){
  const res=await fetch(url,configure);

  const resData=await res.json();

  if(!res.ok){
    throw new Error(resData.message || 'spmething Wennt Wronf')
  }

  return resData;
}

export default function useHttp(url,configure,initialdata){

  const[data,setData]=useState(initialdata);
  const [error,setError]=useState()
  const [isLoading,setIsLoading]=useState(false)

  function cleardata(){
    setData(initialdata);
  }

  const sendReq=useCallback(
    async function sendReq(data) {
    setIsLoading(true);
    try {
      const res =await sendHttpReq(url,{...configure,body:data});
      setData(res);
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false); 
  },[url,configure])

  useEffect(()=>{
    if((configure && (configure.method==='GET' || !configure.method)) || !configure ){
      sendReq();
    }
    
  },[sendReq,configure])


  return {
    data,
    isLoading,
    error,
    sendReq,
    cleardata
  }
}