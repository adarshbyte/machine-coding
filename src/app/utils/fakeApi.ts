const fakeApi = async (countOfCall:number)=>{
    return new Promise<string>((res,rej)=>{
        setTimeout(()=>{
            if(countOfCall>0){
                rej(`Rejected: Retry count ${countOfCall}`);
            }else{
                res(`Resolved: After ${countOfCall}`);
            }
        },1000)
    })
}
export default fakeApi;