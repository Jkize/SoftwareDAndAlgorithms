()=>{

    const appConfig = {timesToRepeat:2};

    const impureMultiply = (str:string)=>{
        console.log(str.repeat(appConfig.timesToRepeat));
    }

    impureMultiply('Hello'); //logs: "Hello Hello"

    const pureMultiply = ( log:(message:any)=>void, timesToRepeat:number, str:string)=>{
        log(str.repeat(timesToRepeat))
    }
    pureMultiply(console.log, appConfig.timesToRepeat,'hello');

}