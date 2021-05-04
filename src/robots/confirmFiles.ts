import readLine from "readline-sync";

import { Icontet } from ".."

async function robot(content: Icontet){
  console.log("\u001b[31m' > ATENÇÃO!!! Em caso de duvidas vejas as pastas selecionadas, não nos responsabilizamos por perdas de arquivos \u001b[0m")


  const isItForShow = readLine.keyInYN(`Deseja ver o caminho para todos node_modules? `)

  if(isItForShow){
    console.table(content.nodeModulesPath)
  }

  let isToMaintain = readLine.keyInYN(`Gostaria de manter algum desses arquivos? `)

  while(isToMaintain){
    if(content.nodeModulesPath.length <= 0){
      break
    }

    const listIndex = readLine.keyInSelect(content.nodeModulesPath, "Qual deseja retirar da lista de remoção?");

    content.nodeModulesPath.splice(listIndex,1)
    console.log("Item removido da lista")

    isToMaintain = readLine.keyInYN(`Mais algum?`)
  }

  console.table(content.nodeModulesPath)

  return readLine.keyInYN(`Deseja deletar esses node_modules?`)
}

export default robot;