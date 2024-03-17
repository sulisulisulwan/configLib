declare class Config {
    protected config: any;
    protected configPaths: {
        pathToEnv: string;
        pathToConfigDir: string;
    };
    constructor(configPaths: {
        pathToEnv: string;
        pathToConfigDir: string;
    });
    getField(field: string | string[]): any;
    protected loadConfig(): any;
}
export default Config;
