import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

class Config {
  
  protected config: any
  protected keys: string[]
  protected configPaths: { pathToEnv: string, pathToConfigDir: string }

  
  constructor(configPaths: { pathToEnv: string, pathToConfigDir: string }, keys: string[]) {
    if (!configPaths) {
      throw new Error('Config constructor must have a path argument')
    }
    this.configPaths = configPaths
    this.keys = keys
    this.config = this.loadConfig()
  }

  public getField(field: string | string[]) {

    if (!Array.isArray(field)) {
      return this.config[field]
    }

    let level = this.config
    for (let i = 0; i < field.length; i++) {
      level = level[field[i]]
    }

    return level
  }

  protected loadConfig() {
    dotenv.config({ path: this.configPaths.pathToEnv })
    const dir = fs.readdirSync(this.configPaths.pathToConfigDir)

    if (dir.find(file => file === 'config.json')) {
      const json = fs.readFileSync(path.resolve(this.configPaths.pathToConfigDir, 'config.json'), 'utf8')
      return JSON.parse(json)
    }

    const config: any = {}

    this.keys.forEach(key => {
      config[key] = process.env[key]
    })

    return config
    
  }
}


export default Config