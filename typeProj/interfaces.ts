
interface IMeta{
    title:string;
    description:string;
}

interface IScenarion{
index:number;
meta:IMeta

//?
call:(store:IStore<any>)=>void;
restore?:(store:IStore<any>)=>void 
}

interface IStore<T>{
[k: string]: T
}

interface ILog{
index: number,
meta: IMeta,
storeBefore: IStore<any>,
storeAfter: IStore<any>,
//BOOM ADVANCED TYPE
error: null | IError
}

interface IError{
name: string;
message: string;
stack: string;
}