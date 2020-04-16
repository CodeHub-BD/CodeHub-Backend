const fs = require('fs');
const AppError = require('../utils/appError');
const { exec } = require('child_process');

const extensions = {
  cpp: 'cpp',
  'c++': 'cpp',
  'c plus plus': 'cpp',
  python: 'py',
  py: 'py',
  python3: 'py',
  python2: 'py',
};

class Compiler {
  /**
   *
   * @param {String} sourceCode
   * @param {String} language
   */
  constructor(sourceCode, language) {
    this.sourceCode = sourceCode;
    this.language = language;
    this.path = `${__dirname}/temp/`;
    this.fileName = (Math.random() * 100000).toFixed().toString();
    this.fileNameWithExt = this.fileName + '.' + extensions[this.language];

    this.generateCommand();
  }

  generateCppCommand() {
    this.compilingCommand = `cd ${this.path} && g++ ${this.fileNameWithExt} -o ${this.fileName} && timeout 3s ./${this.fileName}`;
    this.cleaningCommand = `cd ${this.path} && rm ${this.fileName}*`;
  }

  generatePythonCommand() {
    this.compilingCommand = `cd ${this.path} && python ${this.fileNameWithExt}`;
    this.cleaningCommand = `cd ${this.path} && rm ${this.fileNameWithExt}`;
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

  createTempFolder() {
    return new Promise((resolve, reject) => {
      fs.exists(this.path, (exist) => {
        if (!exist) {
          fs.mkdir(this.path, (err) => {
            if (err) {
              console.error('Error creating temp folder!');
              reject(err);
            }
            resolve('Successfully created the temp folder!');
          });
        } else resolve('Folder already exists!');
      });
    });
  }

  saveCodeToFile() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path + this.fileNameWithExt, this.sourceCode, (err) => {
        if (err) {
          console.error('Error writing the code to the file');
          reject(err);
        }
        resolve('Written the code to the file!');
      });
    });
  }

  compileCode() {
    return new Promise((resolve, reject) => {
      exec(this.compilingCommand, (err, stdout, stderr) => {
        if (stderr) {
          console.warn('Error came from compilation!');
          reject(new Error(stderr));
        } else if (err) {
          console.error('Error compiling the code');
          if (err.message.includes('timeout')) {
            err.message = 'Time Limit Exceeded';
          }
          if (err.message.includes('length exceeded')) {
            err.message = 'Output Length Exceeded';
          }
          reject(err);
        } else {
          console.log({ stdout, message: 'Succesfully compiled!' });
          resolve(stdout, 'Succesfully compiled!');
        }
      });
    });
  }

  cleanCode() {
    return new Promise((resolve, reject) => {
      exec(this.cleaningCommand, (err, stdout, stderr) => {
        if (err) {
          console.error('Error cleaning the code!');
          reject(err);
        }
        resolve('Succesfully cleaned!');
      });
    });
  }

  async compile() {
    try {
      await this.createTempFolder();
      await this.saveCodeToFile();
      const output = await this.compileCode();
      await this.cleanCode();
      return output;
    } catch (err) {
      await this.cleanCode();
      throw err;
    }
  }
}

module.exports = Compiler;
