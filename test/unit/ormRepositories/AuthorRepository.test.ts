import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, getAuthorByName, updateAuthor } from "../../../src/adapters/ormAdapter/protocols/authorProtocols"
import { Author } from "../../../src/entities/Author"

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
    
    let idAuthorToBeDelete: string | undefined;
    let idAuthorToBeSearch: string | undefined;
    let idAuthorToBeUpdate: string | undefined;

    beforeAll(async () => {

        // Criar um autor para deletar

        const author1 = new Author({
            name: 'nome_teste1',
            description: 'uma descrição'
        })

        await createAuthor.execute(author1)
            .then(result => {
  
                idAuthorToBeDelete = result.props.id
                
            })


        // Criar autor para buscas e update

        const authorToBeSearch: IAuthorToBeSearch = {
            name: 'nome_para_busca',
            description: 'uma descrição'
        }

        const author2 = new Author(authorToBeSearch)

        await createAuthor.execute(author2)
            .then(result => {
                idAuthorToBeSearch = result.props.id
            })

        // Criar autor para buscas e update

        const authorToBeUpdate: IAuthorToBeUpdate = {
            name: 'nome_para_update',
            description: 'uma descrição'
        }

        const author3 = new Author(authorToBeUpdate)

        await createAuthor.execute(author3)
            .then(result => {
                idAuthorToBeUpdate = result.props.id
            })
            
    })

    it('Deve criar um autor', async () => {

        const authorInstanceToBeCreate = new Author({
            name: 'nome_teste2',
            description: 'uma descrição'
        })
       
        const autor = await createAuthor.execute(authorInstanceToBeCreate)

        expect(autor.props).toHaveProperty('id')
        expect(autor).toBeInstanceOf(Author)

    })

    it('Deve deletar um autor', async () => {

        if (idAuthorToBeDelete == undefined) throw new Error('idAuthorToBeDelete can not be undefined')
        
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

        if (idAuthorToBeSearch == undefined) throw new Error('idAuthorToBeSearch can not be undefined')

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

        const authorInstanceToBeUpdated = new Author(updatedValues)

        await updateAuthor.execute(authorInstanceToBeUpdated)
            .then((result: Author) => {

                expect(result.props).toEqual(updatedValues)
                expect(result).toBeInstanceOf(Author)

            })

    })

})