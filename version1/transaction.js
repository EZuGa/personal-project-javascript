class Transaction{
    async dispatch(scenario){
        this.scenario = scenario.sort((item1,item2)=>item1.index-item2.index);

        //aq rato ar agdebs errors???
        this.checkScenarion(0)
        

        if(this.scenario[0].index === 1){
            var  firstTask = await this.scenario[0].call(null)
            return this.completeTask(firstTask,1)
        }else{
            throw new Error("First task wasn't found. Can't Continue")
        }
    }
    checkScenarion(id){
        let currscenario = this.scenario[id]
        for(let item in currscenario){
            if(item !=="index" && item !=="meta" && item !== "call" && item !=="restore"){
                throw new Error("Some additional field was passed.")
            }
        }

        if(typeof currscenario.index !== "number"){
            throw new Error("Index must be a number")
        } 
        if (
            typeof currscenario.meta !== "object" &&
            currscenario.meta instanceof  Map &&
            currscenario.meta instanceof  WeakMap &&
            currscenario.meta instanceof  Set &&
            currscenario.meta instanceof  WeakSet
        ){
            throw new Error("Meta must be an object")
        }
        if(typeof currscenario.meta.title !== "string"){
            throw new Error("Title must be a String")
        }
        if(typeof currscenario.meta.description !== "string"){
            throw new Error("Title must be a String")
        }
        if(typeof currscenario.call !== "function"){
            throw new Error("Call must be a function")
        }
        if(typeof currscenario.restore !== "function"){
            throw new Error("Restore must be a function")
        }
    }
    async completeTask(lastValue,currId) {
        
        try{
            this.checkScenarion(currId)

        console.log(`completeTask(${lastValue},${currId})`)
        if(currId===this.scenario.length){
            console.log(`lastVal: ${lastValue}`)
            this.store = lastValue;
            return lastValue
        }

        if(currId+1 !== this.scenario[currId].index){
            throw new Error("Numeracia arasworia P.S(aq gaakete rollback!!!)")
        }

        let currVal = await this.scenario[currId].call(lastValue)
        console.log(`currVal:${currVal}`)
        return this.completeTask(currVal,++currId)
    }catch (err){
        console.log(err.message)
        console.log(lastValue)
        return this.rollback(lastValue,currId-1)
    }
    }

    async rollback(lastVal,currId){

        
        if(currId === -1){
            this.store = null
            return lastVal
        }

        console.log(`rollback(${lastVal},${currId})`)
        
        if(typeof this.scenario[currId].restore !== "undefined"){
            // console.log("T")
        var currVal = await this.scenario[currId].restore(lastVal)
        // console.log(currVal)
        return this.rollback(currVal,--currId)
        }else{
            // console.log("F")
            // console.log(lastVal)
        return this.rollback(lastVal,--currId)
        }

    }
}

const scenario = [
    {
        index: 2,
        meta: {
            title: 'Task-2',
            description: 'Testing-2'
        },
				// callback for main execution
        call: async (store) => {
            console.log("shemovida - 2")
            return store +=1;
        },
				// callback for rollback
        restore: async (store) => {
            return store-=1;
        }
    },
    {
        index: 3,
        meta: {
            title: 'Task-2',
            description: 'Testing-2'
        },
				// callbafck for main execution
        // call: async (store) => {
        //     console.log("shemovida - 3")
        //     return store +=1;
        // },
				// callback for rollback
        restore: async (store) => {
            return store -=1;
        }
    },
    {
        index: 1,      
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {
            console.log("shemovida - 1")
            store +=1;
            return store
            
        },
				// callback for rollback
        restore: async (store) => {
            return store -=1;
        }
    },
];




const transaction = new Transaction();

(async() => {
    try {
            let j = await transaction.dispatch(scenario);
            console.log(`final val: ${j}`)
            const store = transaction.store; // {} | null
            if (store === null){
                console.log("FAILED. Restored Correctly")
            }else{
                console.log("SUCCEED")
            }
            // const logs = transation.logs; // []
            
            console.log("Morcha")
    } catch (err) {
            // log detailed error
            console.log("Critical Error: " + err.message)
    }
})();


