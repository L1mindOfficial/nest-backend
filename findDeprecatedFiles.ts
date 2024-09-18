import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const directoryPath: string = path.join(__dirname, 'src');

function findDeprecatedFiles(dir: string): void {
  const files: string[] = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath: string = path.join(dir, file);
    const stat: fs.Stats = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findDeprecatedFiles(filePath);
    } else if (file.endsWith('.ts')) {
      const content: string = fs.readFileSync(filePath, 'utf8');
      if (content.includes('@deprecated')) {
        console.log(chalk.yellow(`Deprecated: [${file}] '${filePath}'`));
      }
    }
  });
}

findDeprecatedFiles(directoryPath);
