import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

function imprimeLista(valida, resultado, nomeArquivo = "") {

  if (valida){
    console.log(
      chalk.yellow("Lista validada"),
      chalk.black.bgGreen(nomeArquivo),
      listaValidada(resultado)
    );
  } else {
    console.log(
      chalk.yellow("Lista de links"),
      chalk.black.bgGreen(nomeArquivo),
      resultado
    );
  }
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--valida';

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log("Arquivo ou diretório não existe.");
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho);
    imprimeLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`);
      imprimeLista(valida, lista, nomeArquivo);
    });
  }
}

processaTexto(caminho);
