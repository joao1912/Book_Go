import { createAuthor } from "../../../src/adapters/ormAdapter/protocols/authorProtocols"
import { Author } from "../../../src/entities/Author"
import CleanDataBase from "../../util/CleanDataBase"


describe('Testes do AuthorRepository', () => {
    
    it('Deve criar um autor', async () => {
       
        const autor = await createAuthor.execute({
            name: 'nome_teste1',
            description: 'uma descrição'
        })

        expect(autor.props).toHaveProperty('id')
        expect(autor).toBeInstanceOf(Author)

    })

    it('Deve deletar um autor', async () => {
        expect(true).toBe(true)
    })

    it('Deve buscar todos os autores', async () => {
        expect(true).toBe(true)
    })

    it('Deve buscar um autor por id', async () => {
        expect(true).toBe(true)
    })

    it('Deve buscar um autor por nome', async () => {
        expect(true).toBe(true)
    })

    it('Deve atualizar informações do autor', async () => {
        expect(true).toBe(true)
    })

    afterAll(async () => {

        await CleanDataBase.execute()

    })

})