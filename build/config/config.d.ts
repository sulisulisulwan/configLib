declare class Config {
    protected config: any;
    protected keys: string[];
    protected configPaths: {
        pathToEnv: string;
        pathToConfigDir: string;
    };
    constructor(configPaths: {
        pathToEnv: string;
        pathToConfigDir: string;
    }, keys: string[]);
    getField(field: string | string[]): any;
    protected loadConfig(): any;
}
export default Config;
