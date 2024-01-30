export interface IDeleteMessage {

    message: 'Deletado com sucesso!'

}

export interface IDeleteFinance {

    execute(id: string): Promise<IDeleteMessage>

}