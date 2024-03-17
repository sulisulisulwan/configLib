import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
var Config = /** @class */ (function () {
    function Config(configPaths) {
        if (!configPaths) {
            throw new Error('Config constructor must have a path argument');
        }
        this.configPaths = configPaths;
        this.config = this.loadConfig();
    }
    Config.prototype.getField = function (field) {
        if (!Array.isArray(field)) {
            return this.config[field];
        }
        var level = this.config;
        for (var i = 0; i < field.length; i++) {
            level = level[field[i]];
        }
        return level;
    };
    Config.prototype.loadConfig = function () {
        dotenv.config({ path: this.configPaths.pathToEnv });
        var dir = fs.readdirSync(this.configPaths.pathToConfigDir);
        if (dir.find(function (file) { return file === 'config.json'; })) {
            var json = fs.readFileSync(path.resolve(this.configPaths.pathToConfigDir, 'config.json'), 'utf8');
            return JSON.parse(json);
        }
        var config = {
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
        };
        return config;
    };
    return Config;
}());
export default Config;
