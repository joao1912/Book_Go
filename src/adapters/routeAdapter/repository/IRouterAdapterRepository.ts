
export interface IRouterAdapterRepository {

    get(rota: string, controller: any, plugins: any[]): void;

    post(rota: string, controller: any): void;

    put(rota: string, controller: any): void;

    delete(rota: string, controller: any): void

}