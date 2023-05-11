import fs from 'fs';
import chalk from "chalk";

function trataErro(erro) {
  console.log(erro);
  throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório.'))
}

function pegaArquivo(caminhoArquivo) {
  const encoding = 'utf-8';
  fs.promises
    .readFile(caminhoArquivo, encoding)
    .then((texto) => {
      console.log(chalk.green(texto))
    })
    .catch((erro) => {
      trataErro(erro)
    })
}

// function pegaArquivo(caminhoArquivo) {
//   const encoding = 'utf-8';
//   fs.readFile(caminhoArquivo, encoding, (erro, texto) => {
//     if (erro) {
//       trataErro(erro);
//     }
//     console.log(chalk.green(texto));
//   })
// }

pegaArquivo('./arquivos/texto.md');
