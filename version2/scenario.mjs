export const scenario = [
    {
        index: 3,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {
            console.log("call()")
            store.ezu = "ezu"
        },
				// callback for rollback
        restore: async (store) => {
            console.log("aqac?")
            delete store.ezu;
        }
    },
    {
        index: 2,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {
            console.log("call()")
            store.chito = "chito"

        },
				// callback for rollback
        restore: async (store) => {
            delete store.chito
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
            console.log("call()")
            store.jabaxa = "jabaxa"
        },
				// callback for rollback
        restore: async (store) => {
            delete store.jabaxa;
        }
    }
];