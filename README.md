# PP2 
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


---
## Autores
* Amanda Akemi Perina Kouchi
* Laura Naomi Seto
* Raul Yoshiyuki Komai
* Thiago Massayuki Toyota
