const 

let list = (directory,options)  => {
  const cmd = 'ls';
  let params = [];
  
  if (options.all) params.push("a");
  if (options.long) params.push("l");
  let parameterizedCommand = params.length 
                              ? cmd + ' -' + params.join('') 
                              : cmd ;
  if (directory) parameterizedCommand += ' ' + directory ;
  
  let output = (error, stdout, stderr) => {
      if (error) console.log(chalk.red.bold.underline("exec error:") + error);
      if (stdout) console.log(chalk.green.bold.underline("[Result]") + stdout);
      if (stderr) console.log(chalk.red("Error: ") + stderr);
  };
  
  exec(parameterizedCommand, output);
}

module.exports = list;