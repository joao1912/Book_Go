
export default class Formatter {

    static handle<T>(model: T) : T[Extract<keyof T, string>]{

        for(let prop in model) {

            if (prop == 'props') {

                return model[prop]

            }

        }

        throw new Error('Can not read this class')

    }

}