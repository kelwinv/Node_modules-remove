import fs from "fs";

async function robot(dirPaths: string[]) {
  console.group();
  console.log("\u001b[31m > deletando todos os arquivos....");

  dirPaths.forEach(async (file) => {
    verifyFilesAndDirsAndDelete(file);
  });

  console.groupEnd();

  function verifyFilesAndDirsAndDelete(dir: string) {
    fs.readdirSync(dir).forEach(async (file) => {
      let dirPath = `${dir}/${file}`;
      let fsLstatSync = fs.lstatSync(dirPath);

      if (fsLstatSync.isFile()) {
        deleteFiles(dirPath);
      }

      if (fsLstatSync.isDirectory()) {
        if (fs.readdirSync(dirPath).length <= 0) {
          deleteDirs(dirPath);
        } else {
          verifyFilesAndDirsAndDelete(dirPath);
        }
      }
    });
    if (fs.readdirSync(dir).length <= 0) {
      deleteDirs(dir);
    }
  }

  function deleteDirs(dirPath: string) {
    try {
      fs.rmdirSync(dirPath);
      console.log(
        `\u001b[31m > Pasta${dirPath} foi deletada com sucesso.. \u001B[0m`
      );
    } catch (error) {
      throw error;
    }
  }

  function deleteFiles(dirPath: string) {
    try {
      fs.rmSync(dirPath);
      console.log(
        `\u001b[31m > Aquivo ${dirPath} foi deletado com sucesso.. \u001B[0m`
      );
    } catch (error) {
      throw error;
    }
  }
}

export default robot;
