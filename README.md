# Book&Go
- Este projeto visa criar um sistema para gerenciar uma biblioteca física, permitindo aos usuários visualizar os livros disponíveis, favoritar obras, reservar livros e desfrutar de outras funcionalidades, tornando a gestão de livros mais eficiente e acessível.

##Funcionalidades

**Visualização de Livros: ** Os usuários podem visualizar todos os livros disponíveis na biblioteca, incluindo informações como título, autor, gênero e outros.

**Favoritos:** Os usuários têm a capacidade de favoritar livros de seu interesse para acessá-los facilmente mais tarde.

**Reserva de Livros:** Os usuários podem reservar livros que desejam pegar emprestado, garantindo que a obra esteja disponível quando precisarem.

**Gestão de Empréstimos:** O sistema permite aos administradores gerenciar empréstimos de livros, incluindo registros de empréstimos de cada obra.


## Tecnologias Utilizadas

**Banco de dados:** PostgreSQL, Prisma Client.

**Framework:** Express.

**Segurança e Autenticação:** Bcrypt, Jsonwebtoken.

**Middleware e Ferramentas:** Axios, Http-terminator, Swagger-ui-express, Zod.

**Desenvolvimento e Testes:** TypeScript, Jest, Nodemon.

## Arquitetura e Estrutura de Pastas
Adotamos a arquitetura limpa para garantir a separação clara de responsabilidades e a escalabilidade do código. 

**entities:** Armazena as entidades do projeto, que representam os principais objetos de negócio da aplicação.

**adapters:** Contém os adapters e abstrações utilizados no projeto para adaptar as entidades e casos de uso às diferentes tecnologias ou frameworks.

**interfaces:** Contém a pasta controllers e routes, responsáveis por lidar com a comunicação HTTP e definir as rotas da API.

**useCases:** Armazena os casos de uso da aplicação, que encapsulam a lógica de negócio da aplicação de forma independente da infraestrutura.

**tests:** Contém todos os testes unitários e de integração, garantindo a qualidade e confiabilidade do código.

##Observações
- Este projeto ainda está em desenvolvimento. 

- Há um arquivo exemplo .env (.env.example) disponível para fornecer um guia sobre as variáveis de ambiente necessárias para configurar a aplicação.


