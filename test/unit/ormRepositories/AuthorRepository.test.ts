import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, getAuthorByName, updateAuthor } from "../../../src/adapters/ormAdapter/protocols/authorProtocols"
import { Author } from "../../../src/entities/Author"
import CleanDataBase from "../../util/CleanDataBase"

interface IAuthorToBeSearch {
    id?: string;
    name: 'nome_para_busca';
    description: 'uma descrição';
}

interface IAuthorToBeUpdate {
    id?: string;
    name: 'nome_para_update';
    description: 'uma descrição';
}

describe('Testes do AuthorRepository', () => {
    
    let idAuthorToBeDelete: string;
    let idAuthorToBeSearch: string;
    let idAuthorToBeUpdate: string;

    beforeAll(async () => {

        // Criar um autor para deletar

        await createAuthor.execute({
            name: 'nome_teste1',
            description: 'uma descrição'
        })
            .then(result => {
                idAuthorToBeDelete = result.props.id
            })


        // Criar autor para buscas e update

        const authorToBeSearch: IAuthorToBeSearch = {
            name: 'nome_para_busca',
            description: 'uma descrição'
        }

        await createAuthor.execute(authorToBeSearch)
            .then(result => {
                idAuthorToBeSearch = result.props.id
            })

        // Criar autor para buscas e update

        const authorToBeUpdate: IAuthorToBeUpdate = {
            name: 'nome_para_update',
            description: 'uma descrição'
        }

        await createAuthor.execute(authorToBeUpdate)
            .then(result => {
                idAuthorToBeUpdate = result.props.id
            })
            
    })

    it('Deve criar um autor', async () => {
       
        const autor = await createAuthor.execute({
            name: 'nome_teste2',
            description: 'uma descrição'
        })

        expect(autor.props).toHaveProperty('id')
        expect(autor).toBeInstanceOf(Author)

    })

    it('Deve deletar um autor', async () => {
        
        await deleteAuthor.execute(idAuthorToBeDelete)
        .then(result => {

            expect(result.message).toBe('Author deletado com sucesso!')

        })

    })

    it('Deve buscar todos os autores', async () => {
        
        const allAuthors = await getAllAuthors.execute()

        expect(allAuthors[0]).toBeInstanceOf(Author)
        expect(allAuthors.length).toBeGreaterThan(0)
        

    })

    it('Deve buscar um autor por id', async () => {

        await getAuthorById.execute(idAuthorToBeSearch)
            .then(result => {

                const equalValue: IAuthorToBeSearch = {
                    id: idAuthorToBeSearch,
                    name: 'nome_para_busca',
                    description: 'uma descrição'
                }

                expect(result.props).toEqual(equalValue)  
                expect(result).toBeInstanceOf(Author)

            })

    })

    it('Deve buscar um autor por nome', async () => {
      
        await getAuthorByName.execute('nome_para_busca')
            .then(result => {

                const equalValue: IAuthorToBeSearch = {
                    id: idAuthorToBeSearch,
                    name: 'nome_para_busca',
                    description: 'uma descrição'
                }

                expect(result.props).toEqual(equalValue)
                expect(result).toBeInstanceOf(Author)

            })
        
    })

    it('Deve atualizar informações do autor', async () => {
        
        const updatedValues = {
            id: idAuthorToBeUpdate,
            name: 'novo_nome',
            description: 'uma descrição'
        }

        await updateAuthor.execute(updatedValues)
            .then((result: Author) => {

                expect(result.props).toEqual(updatedValues)
                expect(result).toBeInstanceOf(Author)

            })

    })

    afterAll(async () => {

        await CleanDataBase.execute()

    })

})