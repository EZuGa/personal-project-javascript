export const scenario = [
    {
        index: 3,
        meta: {
            
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {
            // throw new Error("boloshi")
            store.ezu = "ezu"
        },
				// callback for rollback

    },
    {
        index: 2,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {
            // throw new Error("REVEERSI VER QNA")
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
            store.jabaxa = "jabaxa"
        },
				// callback for rollback
        restore: async (store) => {
            delete store.jabaxa;
        }
    }
];


