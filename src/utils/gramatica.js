const tokensTerminales = new Set([
  "function", "(", "var", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
  ":", "integer", "real", "boolean", "string", ";", ")", "$"
]);

const tablaAnalisis = {
  "FUNCION": { "function": ["function", "PNOMBRE", "PARAMETROS"] },
  "PARAMETROS": { "(": ["(","PARAMLIST",")"] },
  "PARAMLIST": { "var": ["var","VARIABLE", "LIST"] },
  "VARIABLE": generarProduccionesVariables(),
  "PNOMBRE": generarProduccionesPNOMBRE(),
  "RESTOL": generarProduccionesRESTOL(),
  "LETRA": generarProduccionesLETRA(),
  "IDENTIPO": generarProduccionesIDENTIPO(),
  "LIST": generarProduccionesLIST()
};

function generarProduccionesVariables() {
  const produccionesVariables = {};
  for (let letra of Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))) {
    produccionesVariables[letra] = ["PNOMBRE", ":", "IDENTIPO"];
  }
  return produccionesVariables;
}

function generarProduccionesPNOMBRE() {
  const produccionesPNOMBRE = {};
  for (let letra of Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))) {
    produccionesPNOMBRE[letra] = ["LETRA", "RESTOL"];
  }
  return produccionesPNOMBRE;
}

function generarProduccionesRESTOL() {
  const produccionesRESTOL = {};
  for (let letra of Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))) {
    produccionesRESTOL[letra] = ["LETRA", "RESTOL"];
  }
  produccionesRESTOL["("] = [];
  produccionesRESTOL[":"] = [];
  return produccionesRESTOL;
}

function generarProduccionesLETRA() {
  const produccionesLETRA = {};
  for (let letra of Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))) {
    produccionesLETRA[letra] = [letra];
  }
  return produccionesLETRA;
}

function generarProduccionesIDENTIPO() {
  return { "integer": ["integer"], "real": ["real"], "boolean": ["boolean"], "string": ["string"] };
}

function generarProduccionesLIST() {
  return { ";": [";", "VARIABLE", ";", "LIST"], ")": [] };
}

export { tablaAnalisis, tokensTerminales };
