import ServerResponse from "./ServerResponse"

export default class Formatter {

    static handle<T>(model: T) : T[Extract<keyof T, string>]{

       if (model) {

            for(let prop in model) {

                if (prop == 'props') {
                    //@ts-ignore
                    return model[prop]

                }

            }
        }

        throw new Error('Can not read this class')
        

    }

}