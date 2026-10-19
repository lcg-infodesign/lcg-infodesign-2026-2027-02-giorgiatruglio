let coloreSfondo = "#f4efe6";   

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('p5.js version:', p5.VERSION);
  angleMode(DEGREES);
  background(coloreSfondo);

  // disegno glifi
  let numeroGlifi = 120;
  let numeroColonne = ceil(sqrt(numeroGlifi * windowWidth / windowHeight));
  let numeroRighe = ceil(numeroGlifi / numeroColonne);
  let dimensioneColonna = windowWidth / numeroColonne;
  let dimensioneRiga = windowHeight / numeroRighe;
  let dimensioneGlifo = dimensioneRiga * 0.7;
  if (dimensioneColonna < dimensioneRiga) {
    dimensioneGlifo = dimensioneColonna * 0.7;
  }

  let xCorrente = 0;
  let yCorrente = 0;

  for (let g = 0; g < numeroGlifi; g++) {

    mioGlifo(
      xCorrente + dimensioneColonna / 2,
      yCorrente + dimensioneRiga / 2,
      dimensioneGlifo
    );
    xCorrente = xCorrente + dimensioneColonna;

    if (xCorrente + 1 >= windowWidth) {
      xCorrente = 0;
      yCorrente = yCorrente + dimensioneRiga;
    }
  }
}

// PALETTE COLORI
function scegliColore() {
  let sorte = random(6);
  if (sorte < 1) {
    return "#e63946";   
  } else if (sorte < 2) {
    return "#1d3557";   
  } else if (sorte < 3) {
    return "#2a9d8f";   
  } else if (sorte < 4) {
    return "#f77f00";  
  } else if (sorte < 5) {
    return "#7b2cbf";   
  } else {
    return "#ef476f";   
  }
}

// GLIFO - FACCINE
function mioGlifo(_x, _y, _size) {
  push();
  translate(_x, _y);
  rotate(random(-10, 10));      

  coloreGlifo = scegliColore();

  let tipoBocca = random(8);         
  let stileOcchi = 0;                  // 0 tondi, 1 X, 2 occhiolino
  let yOcchi = -_size * 0.15;
 
  if (tipoBocca >= 6 && tipoBocca < 7) {
    stileOcchi = 1;                    // bocca "sorpresa" solo con occhi a X
  } else if (random(10) >= 8) {
    stileOcchi = 2;                   
  }
 
  disegnaBocca(_size, tipoBocca);
  disegnaOcchi(_size, stileOcchi, yOcchi);

  pop();
}

// OCCHI 
function disegnaOcchi(_size, _stile, _y) {
  let diametroOcchio = _size * 0.22;     
  let distanzaOcchi = _size * 0.2;     
 
  push();
  noStroke();
  rectMode(CENTER);
 
  for (let latoOcchio = -1; latoOcchio <= 1; latoOcchio = latoOcchio + 2) {
    let ex = latoOcchio * distanzaOcchi;
    fill(coloreGlifo);
 
    if (_stile === 0) {                        // occhi tondi
      circle(ex, _y, diametroOcchio);
 
    } else if (_stile === 1) {                 // occhi a X
      push();
      translate(ex, _y);
      rotate(45);
      rect(0, 0, diametroOcchio * 1.2, diametroOcchio * 0.28);
      rotate(-90);
      rect(0, 0, diametroOcchio * 1.2, diametroOcchio * 0.28);
      pop();
 
    } else if (_stile === 2) {                 // occhiolino
      if (latoOcchio === -1) {
        circle(ex, _y, diametroOcchio);
      } else {
        rect(ex, _y, diametroOcchio, diametroOcchio * 0.3);
      }
    }
  }
  pop();
}

// BOCCA 
function disegnaBocca(_size, _tipoBocca) {
  let spessore = _size * 0.1;     // stesso spessore per tutte le bocche
 
  push();
  noStroke();
  rectMode(CENTER);
  fill(coloreGlifo);
 
  if (_tipoBocca < 1) {                      // sorriso
    push();
    translate(0, _size * 0.02);
    arco(_size * 0.7, spessore, 0);
    pop();
 
  } else if (_tipoBocca < 2) {               // triste
    push();
    translate(0, _size * 0.4);
    arco(_size * 0.7, spessore, 1);
    pop();
 
  } else if (_tipoBocca < 3) {               // zigzag
    let passoZigzag = _size * 0.175;
    for (let i = 0; i < 4; i++) {
      push();
      translate(-1.5 * passoZigzag + i * passoZigzag, _size * 0.25);
      if (i % 2 === 0) {
        rotate(35);
      } else {
        rotate(-35);
      }
      rect(0, 0, _size * 0.24, spessore);
      pop();
    }
 
  } else if (_tipoBocca < 4) {              // linea piatta
    rect(0, _size * 0.25, _size * 0.7, spessore);
 
  } else if (_tipoBocca < 5) {              // linea inclinata
    push();
    translate(0, _size * 0.25);
    rotate(-15);
    rect(0, 0, _size * 0.7, spessore);
    pop();
 
  } else if (_tipoBocca < 6) {              // virgola
    push();
    translate(-_size * 0.05, _size * 0.05);
    arco(_size * 0.6, spessore, 2);
    pop();
 
  } else if (_tipoBocca < 7) {              // sorpresa 
    circle(0, _size * 0.28, _size * 0.3);
 
  } else {                                  // mezzo disco pieno 
    circle(0, _size * 0.08, _size * 0.7);
    fill(coloreSfondo);
    rect(0, _size * 0.08 - _size * 0.35, _size * 0.75, _size * 0.7);
  }
  pop();
}

function arco(_d, _spessore, _tipo) {
  push();
  noStroke();
  rectMode(CENTER);
 
  fill(coloreGlifo);
  circle(0, 0, _d);
  fill(coloreSfondo);
  circle(0, 0, _d - 2 * _spessore);
 
  if (_tipo === 0 || _tipo === 2) {
    rect(0, -_d / 2, _d * 1.05, _d);      // copre la metà alta
  }
  if (_tipo === 1) {
    rect(0, _d / 2, _d * 1.05, _d);       // copre la metà bassa
  }
  if (_tipo === 2) {
    rect(-_d / 2, 0, _d, _d * 1.05);      // copre la metà sinistra
  }
  pop();
}

  const message =
    "This is a template repository\nfor the course Laboratorio di Computergrafica\nCommunication Design, Politecnico di Milano";
  textAlign(CENTER, CENTER);
  textSize(16);
  text(message, width / 2, height / 2);

