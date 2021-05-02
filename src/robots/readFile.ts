import fs from "fs";
import { Icontet } from "..";

async function robot(dir: string, content: Icontet) {
  const fileStructure = {};
  console.log(`> Buscando em: "${dir}" `);

  fs.readdirSync(dir).forEach(async (file) => {
    if (file === "node_modules") {
      content.nodeModulesPath = [`${dir}/${file}`, ...content.nodeModulesPath];
      content.nodeModulesLang += 1;
    } else if (fs.lstatSync(`${dir}/${file}`).isDirectory()) {
      fileStructure[file] = await robot(`${dir}/${file}`, content);
    }
  });

  return fileStructure;
}

export default robot;
