# Listagem de Clientes Inadimplentes

Projeto conta com frontend em React + Redux, backend em Node.js, base de dados MongoDB e docker. A interface é construída com as definições do Material Design.

### Resumo do projeto

O intuito do projeto é ter uma relação entre 3 entidades: **Customers**, **Orders** e **Bonds**, simulando que um Cliente pode comprar um Título e isso gera um Pedido.

O Pedido pode ter sido pago ou não (atributo PaidAt pode ser um Date ou null).
Um Cliente Inadimplente seria um cliente que tem um Pedido que não foi pago ainda.

Todo banco de dados é populado ao subir o container com a lib **faker**.


### Rodando o projeto

##### Requisitos: Ter instalado na máquina Docker e Node. Portas 3000 e 3001 livres.


- Clone o projeto via git e ou baixe o zip
- No terminal, acesse a pasta do projeto e rode o comando `sudo make up` 
- Acesse (http://localhost:3000)


### Autor
Allan Lancioni
