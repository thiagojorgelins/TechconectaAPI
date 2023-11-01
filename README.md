# APItechconecta-prototype-NODE

## Configuraçoes para rodar o Projeto na sua máquina
1. Crie um banco pelo MYSQL Worckbench ou no CLI
    * create database "Nome do banco"

2. Crie um arquivo .env
    ```
    PORT= Porta que vai rodar sua aplicação
    DB_NAME= Nome do banco
    DB_USER= Nome de usuário do mysql
    DB_PASSWORD= Senha do mysql
    DB_HOST= localhost
    DB_DIALECT= mysql
    JWT_SECRET= Crie uma string qualquer
    ```

3. Instalações de pacotes e rodando a aplicação
    * Use o _npm install_ para instalar os modulos necessários
    * _npm run dev_ para executar a aplicação que irá rodar na porta especificada no .env
    * Caso não seja especificada nenhuma porta a aplicação irá usar a porta localhost:3000

Ao rodar a aplicação todas as tabelas serão criadas.