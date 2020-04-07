const fs = require('fs');
const { exec } = require('child_process');

class Compiler {
  /**
   *
   * @param {String} sourceCode
   * @param {String} language
   */
  constructor(sourceCode, language) {
    this.sourceCode = sourceCode;
    this.language = language;
    this.fileName = (Math.random() * 100000).toFixed().toString();
  }

  saveToFile(extension) {
    if (!fs.existsSync(`${__dirname}/temp`)) {
      fs.mkdirSync(`${__dirname}/temp`);
    }

    this.fileNameWithExt = this.fileName + '.' + extension;
    this.path = `${__dirname}/temp`;
    fs.writeFileSync(this.path, this.sourceCode);
  }

  generateCppCommand() {
    this.saveToFile('cpp');
    const cppCompiler = `cd ${this.path} && g++ ${this.fileNameWithExt} -o ${this.fileName} && ./${this.fileName} && rm ${this.fileName}*`;
    return cppCompiler;
  }

  generatePythonCommand() {
    this.saveToFile('py');
    const pythonCompiler = `cd ${this.path} && python ${this.fileNameWithExt} && rm ${this.fileNameWithExt}`;
    return pythonCompiler;
  }

  generateCommand() {
    switch (this.language) {
      case 'cpp':
        return this.generateCppCommand();
      case 'python':
        return this.generatePythonCommand();

      default:
        console.error("Couldn't understand the language!");
        return 'Error';
    }
  }

  compileCode(compileCommand) {
    exec(compileCommand, (err, stdout, stderr) => {
      if (stderr) {
        console.error(stderr);
      } else if (stdout) {
        console.log(stdout);
      } else if (err) throw err;
    });
  }

  compile() {
    let compileCommand = this.generateCommand();
    this.compileCode(compileCommand);
  }
}

module.exports = Compiler;
