import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

class Config {
  
  protected config: any
  protected configPaths: { pathToEnv: string, pathToConfigDir: string }

  
  constructor(configPaths: { pathToEnv: string, pathToConfigDir: string }) {
    if (!configPaths) {
      throw new Error('Config constructor must have a path argument')
    }
    this.configPaths = configPaths
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

    const config = {
      MYSQL_CONFIG: {
        user: process.env.BACKEND_MYSQL_CONFIG_USER,
        password: process.env.BACKEND_MYSQL_CONFIG_PASSWORD,
        database: process.env.BACKEND_MYSQL_CONFIG_DATABASE,
        timezone: process.env.BACKEND_MYSQL_CONFIG_TIMEZONE,
        multipleStatements: true
      },
      UPLOAD_DIRECTORY: process.env.BACKEND_UPLOAD_DIRECTORY,
      STORAGE_AUDIO_FILES: process.env.BACKEND_STORAGE_AUDIO_FILES,
      STORAGE_PHOTO_FILES: process.env.BACKEND_STORAGE_PHOTO_FILES,
    }

    return config
    
  }
}


export default Config