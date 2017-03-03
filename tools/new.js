/* eslint-disable */
const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

var name = '';
var author = '';
var target = '';
var date = (new Date()).toISOString().split('T').shift();
var desc = 'React Native Component';
var targetDir = path.resolve(__dirname, '../components');
var currentDir = path.resolve(__dirname, './component');
var isModule = false;

// start
cp.exec('git config user.name', function (err, stdout, stderr) {
  if(err || stderr) {
    console.log('获取git账号名失败');
    process.exit(1);
  }
  author = stdout.trim();
  inputNameAndDescription();
});

function inputNameAndDescription() {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Figure out a cname with CamelCase',
    validate: function(value) {
      if (!value) return 'Please Input A Name';
      const modules = fs.readdirSync(targetDir).map(item => item.toLowerCase())
      if (~modules.indexOf(value.toLowerCase())) return 'Duplicate Name';
      return true;
    }
  }, {
    type: 'input',
    name: 'desc',
    message: 'Input description of this component'
  }]).then(function(answers) {
    name = answers.name;
    desc = answers.desc;
    target = targetDir + '/' + answers.name;
    cp.execSync(`cp -R ${currentDir} ${target}`);
    polishTarget(target);
    registerNew();
  });
}

function polishTarget(file) {
  var state = fs.lstatSync(file);
  if(state.isDirectory()) {
    const files = fs.readdirSync(file);
    files.forEach(item => {
      polishTarget(path.resolve(file, item));
    });
  } else {
    var str = fs.readFileSync(file, 'utf-8');
    var res = str.replace(/#\(NAME\)#/g, name)
      .replace(/#\(name\)#/g, name.replace(/([A-Z])/g,"-$1").toLowerCase())
      .replace(/#\(AUTHOR\)#/g, author)
      .replace(/#\(DATE\)#/g, date)
      .replace(/#\(DESC\)#/g, desc);
    fs.writeFileSync(file, res);
  }
}

function registerNew() {
  var exampleConfigFile = path.resolve(__dirname, '../example/config.js');
  var content = fs.readFileSync(exampleConfigFile, 'utf-8');
  var importString = `import ${name} from '../components/${name}/example';`;
  content = content.replace(/(\/\/\s*#anchor#)/, `$1\n${importString}`)
    .replace(/(\/\/\s*#list#)/, `$1\n  ${name},`);
  fs.writeFile(exampleConfigFile, content, function () {
    console.log('\x1b[36m', `[Bravo] ${name} is Registered!` ,'\x1b[0m');
  });
}
