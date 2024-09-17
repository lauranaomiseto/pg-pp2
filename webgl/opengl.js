function carregarShader(txt) {
  return fetch(txt)              // Faz a requisição do arquivo
    .then(response => response.text()) // Converte a resposta em texto
    ;
}

function getExtents(positions) {
    const min = positions.slice(0, 3);
    const max = positions.slice(0, 3);
    for (let i = 3; i < positions.length; i += 3) {
      for (let j = 0; j < 3; ++j) {
        const v = positions[i + j];
        min[j] = Math.min(v, min[j]);
        max[j] = Math.max(v, max[j]);
      }
    }
    return {min, max};
  }

  function getGeometriesExtents(geometries) {
    return geometries.reduce(({min, max}, {data}) => {
      const minMax = getExtents(data.position);
      return {
        min: min.map((min, ndx) => Math.min(minMax.min[ndx], min)),
        max: max.map((max, ndx) => Math.max(minMax.max[ndx], max)),
      };
    }, {
      min: Array(3).fill(Number.POSITIVE_INFINITY),
      max: Array(3).fill(Number.NEGATIVE_INFINITY),
    });
  }

import { parseOBJ as parseOBJ_book } from './book/book.js';

import { parseOBJ as parseOBJ_mill } from './mill/mill.js';
import { parseMapArgs as parseMapArgs_mill } from './mill/mill.js';
import { parseMTL as parseMTL_mill } from './mill/mill.js';
import { makeIndexedIndicesFn as makeIndexedIndicesFn_mill } from './mill/mill.js';

async function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector("#canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  // Tell the twgl to match position with a_position etc..
  twgl.setAttributePrefix("a_");
  
    // -- | -- | -- MILL -- | -- | --
  //Carrega-se e compila-se os shaders
  var vs_mill =  await carregarShader('./mill/vertex_shader_mill.vert');
  var fs_mill = await carregarShader('./mill/fragment_shader_mill.frag');
  const meshProgramInfo_mill = twgl.createProgramInfo(gl, [vs_mill, fs_mill]);

  //Carrega-se o modelo do .obj 3d
  const objHref_mill = 'https://webgl2fundamentals.org/webgl/resources/models/windmill/windmill.obj';  
  var response = await fetch(objHref_mill);
  var text = await response.text();
  const mill = parseOBJ_mill(text);
    
  //Carrega-se materias do .mtl 
  const baseHref = new URL(objHref_mill, window.location.href);
  const matTexts = await Promise.all(mill.materialLibs.map(async filename => {
    const matHref = new URL(filename, baseHref).href;
    const response = await fetch(matHref);
    return await response.text();
  }));
  const materials = parseMTL_mill(matTexts.join('\n'));
  const textures = {
    defaultWhite: twgl.createTexture(gl, {src: [255, 255, 255, 255]}),
  };

  //Para cada material, aplica-se sua textura
  for (const material of Object.values(materials)) {
    Object.entries(material)
      .filter(([key]) => key.endsWith('Map'))
      .forEach(([key, filename]) => {
        let texture = textures[filename];
        if (!texture) {
          const textureHref = new URL(filename, baseHref).href;
          texture = twgl.createTexture(gl, {src: textureHref, flipY: true});
          textures[filename] = texture;
        }
        material[key] = texture;
      });
  }

  // hack the materials so we can see the specular map
  Object.values(materials).forEach(m => {
    m.shininess = 25;
    m.specular = [3, 2, 1];
  });

  const defaultMaterial = {
    diffuse: [1, 1, 1],
    diffuseMap: textures.defaultWhite,
    ambient: [0, 0, 0],
    specular: [1, 1, 1],
    specularMap: textures.defaultWhite,
    shininess: 400,
    opacity: 1,
  };

  const parts_mill = mill.geometries.map(({material, data}) => {
    // Because data is just named arrays like this
    //
    // {
    //   position: [...],
    //   texcoord: [...],
    //   normal: [...],
    // }
    //
    // and because those names match the attributes in our vertex
    // shader we can pass it directly into `createBufferInfoFromArrays`
    // from the article "less code more fun".

    if (data.color) {
      if (data.position.length === data.color.length) {
        // it's 3. The our helper library assumes 4 so we need
        // to tell it there are only 3.
        data.color = { numComponents: 3, data: data.color };
      }
    } else {
      // there are no vertex colors so just use constant white
      data.color = { value: [1, 1, 1, 1] };
    }

    // create a buffer for each array by calling
    // gl.createBuffer, gl.bindBuffer, gl.bufferData
    const bufferInfo_mill = twgl.createBufferInfoFromArrays(gl, data);
    const vao_mill = twgl.createVAOFromBufferInfo(gl, meshProgramInfo_mill, bufferInfo_mill);
    return {
      material: {
        ...defaultMaterial,
        ...materials[material],
      },
      bufferInfo_mill,
      vao_mill,
    };
  });

  
  const extents_mill = getGeometriesExtents(mill.geometries);
  const range_mill = m4.subtractVectors(extents_mill.max, extents_mill.min);
  // amount to move the object so its center is at the origin
  /*const millOffset = m4.scaleVector(
      m4.addVectors(
        extents_mill.min,
        m4.scaleVector(range_mill, 0.5)),
      -1);*/
  
      
       // -- | -- | -- BOOK -- | -- | --
      //Carrega-se e compila-se os shaders 
  var vs_book =  await carregarShader('./book/vertex_shader_book.vert');
  var fs_book = await carregarShader('./book/fragment_shader_book.frag');
  const meshProgramInfo_book = twgl.createProgramInfo(gl, [vs_book, fs_book]);
    
  const objHref_book = 'https://webgl2fundamentals.org/webgl/resources/models/book-vertex-chameleon-study/book.obj';  
  response = await fetch(objHref_book);
  text = await response.text();
  const book = parseOBJ_book(text);
  
  
  const parts_book = book.geometries.map(({data}) => {
    // Because data is just named arrays like this
    //
    // {
    //   position: [...],
    //   texcoord: [...],
    //   normal: [...],
    // }
    //
    // and because those names match the attributes in our vertex
    // shader we can pass it directly into `createBufferInfoFromArrays`
    // from the article "less code more fun".

    if (data.color) {
      if (data.position.length === data.color.length) {
        // it's 3. The our helper library assumes 4 so we need
        // to tell it there are only 3.
        data.color = { numComponents: 3, data: data.color };
      }
    } else {
      // there are no vertex colors so just use constant white
      data.color = { value: [1, 1, 1, 1] };
    }

    // create a buffer for each array by calling
    // gl.createBuffer, gl.bindBuffer, gl.bufferData
    const bufferInfo_book = twgl.createBufferInfoFromArrays(gl, data);
    const vao_book = twgl.createVAOFromBufferInfo(gl, meshProgramInfo_book, bufferInfo_book);
    return {
      material: {
        u_diffuse: [1, 1, 1, 1],
      },
      bufferInfo_book,
      vao_book,
    };
  });
  
     // function getExtents(positions) igual ao mill
      
     //function getGeometriesExtents igual ao mill
      
    const extents_book = getGeometriesExtents(book.geometries);
    //const range_book = m4.subtractVectors(extents_book.max, extents_book.min);
  // amount to move the object so its center is at the origin
    /*const bookOffset = m4.scaleVector(
      m4.addVectors(
        extents_book.min,
        m4.scaleVector(range_book, 0.5)),
      -1);*/
      
      
     // -- | -- | -- CAMERA -- | -- | -- 
      
  const min = extents_mill.min.map((m, i) => Math.min(m, extents_book.min[i]));
  const max = extents_mill.max.map((m, i) => Math.max(m, extents_book.max[i]));
  
  const range = m4.subtractVectors(max, min);
  const center = m4.addVectors(min, m4.scaleVector(range, 0.5));
  // amount to move the object so its center is at the origin
   
  const bookOffset = m4.scaleVector(
      m4.addVectors(
        min,
        m4.scaleVector(range, 0.5)),
      -1);  
      
  const millOffset = m4.scaleVector(
      m4.addVectors(
        min,
        m4.scaleVector(range, 0.5)),
      -1);
      
      const cameraTarget = center ;//[0, 0, 0];
  // figure out how far away to move the camera so we can likely
  // see the object.
  const radius = m4.length(range) * 1.2;
  const cameraPosition = m4.addVectors(center, [
    0,
    0,
    radius,
  ]);
  // Set zNear and zFar to something hopefully appropriate
  // for the size of this object.
  const zNear = radius / 100;
  const zFar = radius * 3;

  function degToRad(deg) {
    return deg * Math.PI / 180;
  }

  // -- | -- | -- CENA -- | -- | --
      function render(time) {
    time *= 0.001;  // convert to seconds

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);

    const fieldOfViewRadians = degToRad(60);
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projection = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);

    const up = [0, 1, 0];
    // Compute the camera's matrix using look at.
    const camera = m4.lookAt(cameraPosition, cameraTarget, up);

    // Make a view matrix from the camera matrix.
    const view = m4.inverse(camera);

    const sharedUniforms = {
      u_lightDirection: m4.normalize([-1, 3, 5]),
      u_view: view,
      u_projection: projection,
      u_viewWorldPosition: cameraPosition,
    };

      
   // Renderizar o windmill
  gl.useProgram(meshProgramInfo_mill.program);
  twgl.setUniforms(meshProgramInfo_mill, {
    u_lightDirection: m4.normalize([-1, 3, 5]),
    u_view: view,
    u_projection: projection,
  });

  let u_world_mill = m4.yRotation(time);
  u_world_mill = m4.translate(u_world_mill, ...millOffset);

  for (const { bufferInfo_mill, vao_mill, material } of parts_mill) {
    gl.bindVertexArray(vao_mill);
    twgl.setUniforms(meshProgramInfo_mill, { u_world: u_world_mill, ...material });
    twgl.drawBufferInfo(gl, bufferInfo_mill);
  }

  // Renderizar o book
  gl.useProgram(meshProgramInfo_book.program);
  twgl.setUniforms(meshProgramInfo_book, {
    u_lightDirection: m4.normalize([-1, 3, 5]),
    u_view: view,
    u_projection: projection,
  });

  let u_world_book = m4.yRotation(time);
  u_world_book = m4.translate(u_world_book, ...bookOffset);

  for (const { bufferInfo_book, vao_book, material } of parts_book) {
    gl.bindVertexArray(vao_book);
    twgl.setUniforms(meshProgramInfo_book, { u_world: u_world_book, ...material });
    twgl.drawBufferInfo(gl, bufferInfo_book);
  }
          
  //console.log('Book Offset:', bookOffset);
  //console.log('Mill Offset:', millOffset);
  requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
