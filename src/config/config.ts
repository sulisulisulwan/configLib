import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))


class Config {
  
  protected config: any
  
  constructor(pathToEnvFile: string) {
    pathToEnvFile ? pathToEnvFile : '../../.env'
    dotenv.config({ path: path.resolve(__dirname, pathToEnvFile) })
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
    const dir = fs.readdirSync(path.resolve(__dirname, '../../config'))

    if (dir.find(file => file === 'config.json')) {
      const json = fs.readFileSync(path.resolve(__dirname, '../../config/config.json'), 'utf8')
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