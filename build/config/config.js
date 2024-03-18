import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
var Config = /** @class */ (function () {
    function Config(configPaths, keys) {
        if (!configPaths) {
            throw new Error('Config constructor must have a path argument');
        }
        this.configPaths = configPaths;
        this.keys = keys;
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
        var config = {};
        this.keys.forEach(function (key) {
            config[key] = process.env[key];
        });
        return config;
    };
    return Config;
}());
export default Config;
