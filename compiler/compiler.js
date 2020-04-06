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
    this.path = (Math.random() * 100000).toFixed().toString();
  }

  saveToFile(extension) {
    if (!fs.existsSync(`${__dirname}/temp`)) {
      fs.mkdirSync(`${__dirname}/temp`);
    }

    this.pathWithExt = this.path + '.' + extension;
    this.exactPath = `${__dirname}/temp/${this.pathWithExt}`;
    fs.writeFileSync(this.exactPath, this.sourceCode);
  }

  generateCppCommand() {
    this.saveToFile('cpp');
    const cppCompiler = `cd ${__dirname}/temp && g++ ${this.pathWithExt} -o ${this.path} && ./${this.path} && rm ${this.path}*`;
    return cppCompiler;
  }

  generatePythonCommand() {
    this.saveToFile('py');
    const pythonCompiler = `cd ${__dirname}/temp && python ${this.pathWithExt} && rm ${this.pathWithExt}`;
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
