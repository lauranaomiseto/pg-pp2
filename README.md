# PP2 
## *Raytracing*
### Descrição
  Esse projeto utiliza uma implementação de raytracing para visualização de uma animação de uma cena com alguns objetos e materiais diversos. A cena construída conta com 30 objetos, todos esferas, que formam uma árvore de natal dentro de um globo de neve, com movimentos de câmera e objetos.
  
### Características e Capacidades
- Renderização de uma árvore de natal composta por esferas.
- Pequenas esferas dentro do globo, simulando flocos de neve.
- Diferentes materiais para a cúpula do globo, árvore, base e estrela.
- Movimentação de objetos e câmera.
  
### Cena Gerada
  A cena gerada consiste em um globo de neve, contendo uma árvore de natal, flocos de neve em movimento e outros elementos, como a colina de neve e a estrela no topo da árvore. Durante a animação, a câmera faz alguns movimentos, mostrando ângulos diferentes dos objetos. 
  
### WCS(World Coordinate System) e Posicionamento dos Objetos
- Base do globo: Serve como suporte para os objetos dentro da cúpula. Tem as coordenadas em (0.0, -1.75, -5.0) e raio de 1.5.

- Cúpula do globo: Composta por duas esferas transparentes que simulam a aparência de vidro, envolve todo o restante da cena. O centro das cúpulas estão ambos em (0.0, 0.0, -5.0) e os raios têm 1.2 e 1.1 unidades, respectivamente.

- Snow hill: A colina de neve forma o solo do globo, suas coordenadas são (0.0, -0.98, -5.0) e o raio é 1.

- Esferas que compõem a árvore: A árvore é formada por 4 esferas de tamanhos diferentes. A maior tem raio 0.35 e seu centro está em (0.0, -0.05, -5.0), as esferas subsequentes têm apenas o eixo y e o raio alterados. A seguir, os pontos y e raios das esferas em sequência: 0.30, 0.25; 0.55, 0.19; 0.75, 0.125.

- Estrela: A estrela é uma esfera de raio 0.06 e centro (0.0, 0.935, -5.0) sobre o topo da árvore.

- Neve (posições iniciais): Na cena, há 20 bolas de neve que compõem o ambiente dentro do globo. As esferas foram colocadas em posições aleatórias, todas com um raio de 0.03 unidades. A seguir estão os eixos iniciais de cada um dos flocos:
(-0.387, 0.381, -4.833); (-0.493, 0.545, -4.344); (0.336, 0.366, -5.140); (0.638, 0.499, -4.880); (-0.698, 0.487, -4.732); (-0.475, 0.525, -5.347); (0.482, 0.202, -5.008); (0.329, 0.556, -5.176); (-0.284, 0.380, -5.627); (0.457, 0.715, -4.718); (-0.787, 0.1, -4.433); (-0.693, 0.2, -4.344); (0.396, 0.9, -5.140); (0.638, 0.09, -4.880); (-0.698, 0.15, -4.732); (-0.575, 0.1, -5.347); (0.682, 0.11, -5.008); (0.529, 0.07, -5.176); (-0.584, 0.19, -5.627); (0.757, 0.21, -4.718).
Esses objetos foram movimentados algumas vezes para baixo, para criar a animação da cena. 

- Câmera: A câmera foi inicialmente posicionada em (0, 2.5, 2.5) e, para criar a movimentação e diferentes ângulos, ela foi movida algumas vezes.

### Execução do projeto
  O projeto utilizou a biblioteca recomendada e foi desenvolvido em C++, sem nenhum sistema de geração automatizada. Para executar, basta compilar o arquivo main.cc e chamar o programa resultante atribuído sua saída a um arquivo de imagem PPM.

```
g++ main.cc -o programa
./programa > imagem.ppm
```

## WebGL

## Autores
Amanda Akemi Perina Kouchi
Laura Naomi Seto
Raul Yoshiyuki Komai
Thiago Massayuki Toyota
