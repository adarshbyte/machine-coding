export {}

self.onmessage = (event:MessageEvent)=>{
    const {type, payload} = event.data;
    if(type === 'process'){
        console.log(payload);
        self.postMessage({type:'processed-data',payload});
    }
}