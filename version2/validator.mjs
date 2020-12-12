export function scenarioValidation(scenario) {    
    for(let item of scenario){
        for(let current in item){
        if(current !=="index" && current !=="meta" && current !== "call" && current !=="restore"){
            throw new Error("Some additional field was passed.");
        }
        }
        if(typeof item.index !== "number"){
            throw new Error("Index must be a number");
        } 
        if (
            typeof item.meta !== "object" &&
            item.meta instanceof  Map &&
            item.meta instanceof  WeakMap &&
            item.meta instanceof  Set &&
            item.meta instanceof  WeakSet
        ){
            throw new Error("Meta must be an object");
        }
        if(typeof item.meta.title !== "string"){
            throw new Error("Title must be a String");
        }
        if(typeof item.meta.description !== "string"){
            throw new Error("Title must be a String");
        }
        if(typeof item.call !== "function"){
            throw new Error("Call must be a function");
        }
        if(typeof item.restore !== "function" && typeof item.restore !== "undefined"){
            throw new Error("Restore must be a function");
        }

    }
}