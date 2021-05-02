import input from "./robots/input";
import readFile from "./robots/readFile";
import deleteFiles from "./robots/deleteFiles";

export interface Icontet {
  fileStructure: {};
  nodeModulesPath: string[];
  nodeModulesLang: number;
  filePath: string;
}

const content = {
  nodeModulesLang: 0,
  nodeModulesPath: []
} as Icontet;

async function start() {http://kelwin.vercel.app/
  await input.start(content);

  console.group()
  console.log("> Lendo Estrutura de dados em:", content.filePath);

  content.fileStructure = await readFile(content.filePath, content);
  console.groupEnd()

  if(content.nodeModulesLang <= 0){
    console.log("> Todos os node_modules do arquivo ",content.filePath)
  }

  console.log("----------------------------------------------------------------")

  console.log(`> Foram encontrados ${content.nodeModulesLang} em ${content.filePath}`);

  console.log("----------------------------------------------------------------")

  if(await input.deletionConfirmationInput(content)){
    await deleteFiles(content.nodeModulesPath)
  }
}

start();
