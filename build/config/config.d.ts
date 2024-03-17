declare class Config {
    protected config: any;
    constructor(pathToEnvFile: string);
    getField(field: string | string[]): any;
    protected loadConfig(): any;
}
export default Config;
