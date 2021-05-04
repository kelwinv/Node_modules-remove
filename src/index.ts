import input from "./robots/input";
import readFile from "./robots/readFile";
import deleteFiles from "./robots/deleteFiles";
import confirmFiles from "./robots/confirmFiles";

export interface Icontet {
  fileStructure: {};
  nodeModulesPath: string[];
  nodeModulesLang: number;
  filePath: string;
  filesDelted: number;
  DirsDeleted: number;
  node_modulesDeleted: number;
}

const content = {
  nodeModulesLang: 0,
  filesDelted: 0,
  DirsDeleted: 0,
  node_modulesDeleted: 0,
  nodeModulesPath: [],
} as Icontet;

async function start() {
  await input(content);

  console.group();
  console.log("> Lendo Estrutura de dados em:", content.filePath);

  content.fileStructure = await readFile(content.filePath, content);
  console.groupEnd();

  if (content.nodeModulesLang <= 0) {
    console.log("> Não existe arquivos node modules em: ", content.filePath);
    return
  }

  console.log(
    "----------------------------------------------------------------"
  );

  console.log(
    `> Foram encontrados ${content.nodeModulesLang} em ${content.filePath}`
  );

  console.log(
    "----------------------------------------------------------------"
  );

  if (await confirmFiles(content)) {
    await deleteFiles(content);
  }

  console.log(
    "\u001b[34m  =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~\u001b[0m"
  );
  console.log(`> Foram deletados ${content.DirsDeleted} pastas no total `);
  console.log(`> Foram deletados ${content.filesDelted} arquivos no total `);
  console.log(
    `> Foram deletados ${content.node_modulesDeleted} node_modules no total `
  );
  console.log(
    "\u001b[34m  =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~\u001b[0m"
  );
}

start();
