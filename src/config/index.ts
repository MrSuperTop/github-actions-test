import { readFileSync } from 'fs'
import { join } from 'path';

interface Config {
  redis: {
    host: string,
    port: number
  }
}

const configPath = join(__dirname, './dev.json');
export const config: Config = JSON.parse(
  readFileSync(configPath).toString()
);

console.log(config)
