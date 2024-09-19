# PP2

Projetos elaborados para a disciplina de Processamento Gráfico. 
---
## *Raytracing*
Esse projeto utiliza a biblioteca de raytracing gerada em [Ray Tracing in One Weekend](https://github.com/RayTracing/raytracing.github.io/) para renderizar cenas com objetos de materiais diversos.

Posteriormente, as imagens `.ppm` resultantes foram utilizadas para compor uma pequena animação.
  
### Cena
As cenas construídas, dadas pelo conjunto de pontos centrais acumuladas no objeto `world`,  contam com 30 objetos esféricos e são compostas por um chão e um globo de neve, que, por sua vez, consiste em uma base, uma redoma de vidro oco, uma colina de neve, uma árvore de natal e alguns flocos de neve.

Os tipos de materiais utilizados em cena foram os `lambertian`, `metal` e `dielectric`, implementados na biblioteca, para objetos difusos (chão, neve, árvore), metálicos (base do globo) e transparentes (redoma de vidro do globo), respectivamente.

### Câmera
Utilizando a classe `camera`, configuramos as seguintes propriedades (atributos com valores explicitados permaneceram com seus valores inalterados na animação):

- **Resolução** da imagem, com os atributos: `aspect_ratio = 16.0/9.0` e `image_width = 800`. 

- **Antialiasing**, com: `samples_per_pixel = 200` - que indica o número de amostras para colorir um pixel, e `max_depth = 50` - que limita no número de raios refletidos na cena.

- **Posição** e **inclinação** da câmera, com: `vfov = 25` - ângulo utilizado para calcular a área máxima de captura, `lookfrom` - posição da câmera, `lookat = (0, -0.3, -5.2)` - posição na cena que corresponde à posição central no view port, e `vup` - vetor cuja direção corresponde a inclinação da câmera. 

- **Desfoque**, com os atributos: `defocus_angle=0.6` - ângulo do cone cuja base representa o disco/origem dos raios, e `focus_distance=7.0` - que dá a distância da câmera até o plano de foco perfeito.

### Animação
Para a animação, movimentamos a câmera, alterando o atributo `lookfrom` e o vetor `vup`. Além disso, os flocos de neve também foram movimentados, diminuindo suas coordenadas `y`, para simular sua queda.

Aponta-se aqui, que a renderização dos quadros para a animação foi realizada alterando os parâmetros necessários de forma manual e executando o programa a cada configuração diferente, isto é, sem a elaboração de um algoritmo que gerasse todos os frames de uma vez.
  
### WCS (World Coordinate System) e posicionamento dos objetos
- **WCS**: o ponto de origem do mundo, indicado pelo atributo `pixel00_loc` da classe `camera`, está localizado no centro do view port, calculado com base em `vfov` e `focus_dist`.

- **Objetos**:

  - Chão: Coordenadas centrais em (0.0, -101.0, -5.0) e raio 100.0.

  - Base do globo: Serve como suporte para os objetos dentro da cúpula. Tem as coordenadas em (0.0, -1.75, -5.0) e raio de 1.5. Objeto fixo em todas os quadros gerados.

  - Cúpula do globo: Composta por duas esferas transparentes que simulam a aparência de vidro. O centro das duas cúpulas está em (0.0, 0.0, -5.0) e os raios têm tamanho 1.2 e 1.1, respectivamente.

  - Snow hill: A colina de neve forma o solo do globo, suas coordenadas são (0.0, -0.98, -5.0) e o raio é 1.

  - Esferas que compõem a árvore: A árvore é formada por 4 esferas de tamanhos diferentes. A maior tem raio 0.35 e seu centro está em (0.0, -0.05, -5.0), as esferas subsequentes têm apenas o eixo y e o raio alterados. A seguir, os pontos y e raios das esferas em sequência: 0.30, 0.25; 0.55, 0.19; 0.75, 0.125.

  - Estrela: A estrela é uma esfera de raio 0.06 e centro (0.0, 0.935, -5.0) sobre o topo da árvore.

  - Neve (posições iniciais): As 20 esferas foram colocadas em posições aleatórias dentro da esfera interna que compõe a redoma, todas com um raio de 0.03 unidades. A seguir estão os eixos iniciais de cada um dos flocos:
  (-0.387, 0.381, -4.833); (-0.493, 0.545, -4.344); (0.336, 0.366, -5.140); (0.638, 0.499, -4.880); (-0.698, 0.487, -4.732); (-0.475, 0.525, -5.347); (0.482, 0.202, -5.008); (0.329, 0.556, -5.176); (-0.284, 0.380, -5.627); (0.457, 0.715, -4.718); (-0.787, 0.1, -4.433); (-0.693, 0.2, -4.344); (0.396, 0.9, -5.140); (0.638, 0.09, -4.880); (-0.698, 0.15, -4.732); (-0.575, 0.1, -5.347); (0.682, 0.11, -5.008); (0.529, 0.07, -5.176); (-0.584, 0.19, -5.627); (0.757, 0.21, -4.718).

### Execução do projeto
O projeto utilizou a biblioteca recomendada e foi desenvolvido em C++, sem nenhum sistema de geração automatizada. 

Para executar, basta compilar o arquivo main.cc (e suas dependências) e chamar o programa resultante atribuindo sua saída a um arquivo de imagem `.ppm`:

```
g++ main.cc -o programa
```
```
./programa > imagem.ppm
```

---
## WebGL
Esse projeto utiliza WebGL para renderizar a cena e os objetos 3D.

### Ambiente de Execução
Os arquivos-fonte são:
- **main.html:** arquivo html contendo o canvas, em que é renderizado os objetos.
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
O moinho é um objeto .obj com textura em um arquivo .mtl com coordenadas iniciais em, aproximadamente, (0.441, -4.004, -0.008).
O livro é um objeto obj que possui as coordenadas iniciais em, aproximadamente, (0.441, -4.004, -0.008).

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
Para a execução do main.html, é necessário estar com o WAMPserver ligado, e com todos os arquivos-fonte na pasta "www", que se encontra no diretório de instalação do WAMPserver. Por fim, para executar o html é necessário abrir o navegador e acessar: "localhost/main.html".

---
## Autores
* Amanda Akemi Perina Kouchi
* Laura Naomi Seto
* Raul Yoshiyuki Komai
* Thiago Massayuki Toyota

