import {scenario} from "./scenario.mjs"
import {scenarioValidation} from "./validator.mjs"


 class Transaction{
    async dispatch(scenario){
        //validation
        scenarioValidation(scenario);
        
        //sort
        scenario = scenario.sort((item1,item2)=>item1.index-item2.index);

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
                this.logs[index] = logObj;
                for(let i=index-1; i>=0; --i){
                    let reverseObj = Object.assign({},this.logs[i])
                    
                    
                    
                    let element = scenario[i]
                    if(typeof element.restore === "undefined"){
                        continue;
                    }
                    reverseObj.storeBefore = Object.assign({},this.store)
                    await element.restore(this.store)
                    reverseObj.storeAfter = Object.assign({},this.store)
                    // console.log(logObj)

                    this.logs.push(reverseObj)
                    
                    
                }
                break;
            }
        }
    }
}


const transaction = new Transaction();

(async() => {
    try {
        
            await transaction.dispatch(scenario);
            
            const store = transaction.store; // {} | null
            console.log(store)
            const logs = transaction.logs; // []
            console.log(logs)
    } catch (err) {
        console.log("MAJOR ERROR")
        console.log(err.stack)
        // console.log(transaction.logs)
        
    }
})();



