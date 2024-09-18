# PP2 
Projetos elaborados para a disciplina de Processamento Gráfico. 
---
## *WebGL*
Esse projeto utiliza WebGL para renderizar a cena e os objetos 3D.

### Ambiente de Execução
Os arquivos-fonte são:
- **main.htmml:** arquivo html contendo o canvas, em que é renderizado os objetos.
- **webgl.css:** arquivo css contendo a estilização da página.
- **webgl.js:** arquivo javascript contendo toda a lógica de renderização dos objetos, suas texturas e iluminação, camêra e cena.

Há também arquivos auxiliares com funções específicas para manipular cada objeto da cena, bem como arquivos com funções de câmera, etc. São estes:
- **mill.js:** arquivo javascript contendo funções de manipulação do objeto "windmill", como extração de vértices, texturas, normais, etc.
- **fragment_shader_mill.frag:** arquivo .frag contendo o código do fragment shader, responsável pelo cor das primitivas.
- **vertex_shader_mill.vert:** arquivo .vert contendo o código do vertex shader, responsável pela posição dos vértices.

- **book.js:** arquivo javascript contendo funções de manipulação do objeto "book", como extração de vértices, normais, etc.
- **fragment_shader_book.vert:** arquivo .frag contendo o código do fragment shader, responsável pelo cor das primitivas.
- **vertex_shader_book.vert:** arquivo .vert contendo o código do vertex shader, responsável pela posição dos vértices.

### Objetos
Os objetos estão armazenados no site webgl2fundamentals.org e são um moinho e um livro.

O moinho é um objeto .obj com textura em um arquivo .mtl com coordenadas iniciais em, aproximadamente (0.441, -4.004, -0.008).
O livro é um objeto obj que possui as coordenadas iniciais em, aproximadamente (0.441, -4.004, -0.008).


### Câmera
Para visualizar os objetos, fez-se a câmera se enquadrar dentro das dimensões máximas e mínimas de todos os objetos que compõe a cena. Usa-se fov igual a 80 e, também, calcula-se o aspecto da cena, de maneira a sempre se ajustar à resolução da tela em que a renderização está acontecendo.
Por fim, a câmera olha para a origem, a uma distância 20% maior que o tamanho da cena, assim possibilitando a visualização por inteiro da área de renderização.

### Cena
Após converter-se o tempo para segundos, aumenta-se o tempo para o livro e reduz-se o tempo para o moinho, a fim de se criar um efeito especial na composição.
Para renderizar o moinho, ele se desloca ao longo do eixo x, para que se distancie da sua posição inicial (para não colidir com o outro objeto). Então, aplica-se uma rotação ao longo do eixo y, resultando em um movimento de "órbita" em torno do livro.
Para renderizar o livro, desloca-se ele ao longo do eixo y, para que este fique na altura do centro do moinho. Então, aplica-se 3 rotações ao longo dos 3 eixos, resultando em um movimento esperado, caótico.
A luz da cena incide de frente aos objetos, na mesma direção da câmera. 

### Execução do projeto
O projeto utilizou a biblioteca TWGL e foi desenvolvido em JavaScript, HTML e CSS. Os shaders foram escritos em GL e SL.

Para a execução do main.html, é necessário estar com o WAMPserver ligado, e com todos os arquivos-fonte na pasta "www", que se encontra no diretório de instalação do WAMPserver. Por fim, para executar o html é necessário abrir o navegador e entrar: "localhost/main.html".
