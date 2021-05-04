import readLine from "readline-sync";
import path from "path";

import { Icontet } from "..";

async function robot(content: Icontet) {
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

export default robot;
