class Transaction{
    // constructor(){
    // }


    async dispatch(scenario){
        this.scenario = scenario.sort((item1,item2)=>item1.index-item2.index);

        if(this.scenario[0].index === 1){
            var  firstTask = await this.scenario[0].call(null)
            return this.completeTask(firstTask,1)
        }else{
            throw new Error("First task wasn't found. Can't Continue")
        }
        
        
    
    }
    async completeTask(lastValue,currId) {
        
        try{

        console.log(`completeTask(${lastValue},${currId})`)
        if(currId===this.scenario.length){
            console.log(`lastVal: ${lastValue}`)
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
        return this.rollback(lastValue,currId)
    }
    }

    async rollback(lastVal,currId){
        if(currId-1 === -1){
            return lastVal
        }

        console.log(`rollback(${lastVal},${currId})`)
        

        let currVal = await this.scenario[currId-1].restore(lastVal)
        console.log(currVal)

        return this.rollback(currVal,--currId)
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
            return store -=1;
        }
    },
    {
        index: 34,
        meta: {
            title: 'Task-2',
            description: 'Testing-2'
        },
				// callbafck for main execution
        call: async (store) => {
            console.log("shemovida - 3")
            return store +=1;
        },
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
			// const store = transaction.store; // {} | null
            // const logs = transation.logs; // []
            
            console.log("Morcha")
    } catch (err) {
            // log detailed error
            console.log("MAIN ERROR:")
            console.log(err.message)
            
    }
})();




        // let a = await this.scenario[0].call(null)
        // console.log(a)
        // let b = await this.scenario[1].call(a)
        // console.log(b)
        // let c = await this.scenario[2].call(b)
        // console.log(c)
        // try{
        // let d = await this.scenario[3].call(c)
        // }catch(err){
        //     console.log(err.message)
       
        //     c = await this.scenario[3].restore(c)
        //     console.log(c)
        //     b = await this.scenario[2].restore(b)
        //     console.log(b)
        //     a = await this.scenario[2].restore(a)
        //     console.log(a)
        //     return null
        // }