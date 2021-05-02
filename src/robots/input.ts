import readLine from "readline-sync";
import path from "path";

import { Icontet } from "..";

const robot = {
  start,
  deletionConfirmationInput
}

async function start(content: Icontet) {
  console.log("> olá, Iremos inciar pesquisa por pasta node_moludes");

  content.filePath = await getDirPath();

  async function getDirPath(){
    const willProceed = readLine.keyInYN(
      "> Gostaria de usar uma pasta teste?",
    );
  
    if (willProceed === undefined) return process.exit();
  
    if (willProceed === true) {
      return path.resolve(
        __dirname,
        "..",
        "..",
        "public",
        "pasta_test"
      );
    }

    return await getCustonDirectory();
  }

  async function getCustonDirectory(){
    const pathDir = readLine.questionPath("Escolha o caminho da pasta q gostaria de fazer a pesquisa: ")
    const isThisDirectory = readLine.keyInYN(`Esta é a pasta q deseja fazer a busca?: ${pathDir}`)

    if(isThisDirectory === true){
      return pathDir
    }

    return await getCustonDirectory()
  }
}

async function deletionConfirmationInput(content: Icontet){
  console.log("\u001b[31m' > ATENÇÃO!!! Em caso de duvidas vejas as pastas selecionadas, não nos responsabilizamos por perdas de arquivos \u001b[0m")


  const isItForShow = readLine.keyInYN(`Deseja ver o caminho para todos node_modules?`)

  if(isItForShow){
    console.table(content.nodeModulesPath)
  }

  return readLine.keyInYN(`Deseja deletar esses node_modules?`)
}


export default robot;
