import {scenario} from "./scenario"
import {Transaction} from "./transaction"



const transaction = new Transaction();

(async() => {
    try {
        
            await transaction.dispatch(scenario);
            
            const store = transaction.store; // {} | null
            console.log(store)
            const logs = transaction.logs; // []
            console.log(logs)

            if(![...Object.keys(store)].length){
                console.log("FAILED: (restored without error)")
            }else{
                console.log("SUCCEED")
            }

    } catch (err) {
        console.log(err.stack)
        console.log("FAILED: (restored with error)")
    }
})();