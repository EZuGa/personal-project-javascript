
export class Transaction {
    logs:IStore<any>[];
    store:IStore<any>;

    @gijiDecorator
    async dispatch(scenario:Array<IScenarion>) {
        this.logs= [];
        this.store = {};


        for (let index in scenario) {

            let element = scenario[index]
            let logObj:ILog = {
                index: element.index,
                meta: element.meta,
                storeBefore: {},
                storeAfter: {},
                error: null
            }
            Object.assign(logObj.storeBefore, this.store)
            try {
                if (Number(index) + 1 !== element.index) {
                    throw new Error("Numeracia arasworia")
                }
                await element.call(this.store);
                Object.assign(logObj.storeAfter, this.store)
                this.logs[index] = logObj;
            } catch (err) {
                Object.assign(logObj.storeAfter, this.store)
                logObj.error = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                }
                delete logObj.storeBefore
                delete logObj.storeAfter

                this.logs[index] = logObj;
                for (let i:number = Number(index) - 1; i >= 0; --i) {
                    let element = scenario[i]
                    if (typeof element.restore === "undefined") {
                        continue;
                    }
                    await element.restore(this.store)
                }
                break;
            }
        }
    }
}



function gijiDecorator(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let scenario = arguments[0];

        scenario = scenario.sort((item1,item2)=>item1.index-item2.index);

    if(scenario[scenario.length-1].hasOwnProperty('restore')) {
        throw new Error("Last Item must't have restore method"); 
    }

        console.log(this);
        //HELP: Aq return rato?
        return method.apply(this, arguments);
    }
}