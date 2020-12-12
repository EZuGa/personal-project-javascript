// import {scenario} from "./scenario.mjs"
import {scenarioValidation} from "./validator.mjs"


 export class Transaction{
    async dispatch(scenario){
     

        scenario = scenarioValidation(scenario);

    
        

        //create properties
        this.logs = [];
        this.store = {};
        for(let index in scenario){
            
            let element = scenario[index]
            let logObj = {
                index:element.index,
                meta:element.meta,
                storeBefore:{},
                storeAfter:{},
                error:null
            }
            Object.assign(logObj.storeBefore,this.store)
            try{
                if(Number(index)+1 !== element.index){
                    throw new Error("Numeracia arasworia")
                }
                await element.call(this.store);
                Object.assign(logObj.storeAfter,this.store)
                this.logs[index] = logObj;

            }catch(err){     
                 
                Object.assign(logObj.storeAfter,this.store)
                logObj.error = {
                    name:err.name,
                    message:err.message,
                    stack:err.stack
                }
                delete logObj.storeBefore
                delete logObj.storeAfter

                this.logs[index] = logObj;
                for(let i=index-1; i>=0; --i){
                    let element = scenario[i]
                    
                    
                    if(typeof element.restore === "undefined"){
                        continue;
                    }

                    await element.restore(this.store)
         
                }
                
                break;
            }
        }
    }
}


// const transaction = new Transaction();

// (async() => {
//     try {
        
//             await transaction.dispatch(scenario);
            
//             const store = transaction.store; // {} | null
//             console.log(store)
//             const logs = transaction.logs; // []
//             console.log(logs)

//             if(![...Object.keys(store)].length){
//                 console.log("FAILED: (restored without error)")
//             }else{
//                 console.log("SUCCEED")
//             }

//     } catch (err) {
//         console.log(err.stack)
//         console.log("FAILED: (restored with error)")
//     }
// })();



