export interface returnData<T> {
    success: boolean,
    data: { [x: string]: any; } | string
}

export interface IValidatorAdapterRepository {

    validate<T>(data: T, schema: any): Partial< returnData<T> > 

}

