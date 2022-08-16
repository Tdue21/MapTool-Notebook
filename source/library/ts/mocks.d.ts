export declare namespace MTScript {

    function abort(): void;

    function mtsAssert(...args: any[]): void;

    function setVariable(variable: string, value: unknown): void;

    function getVariable(variable: string): object;

    function evalMacro(script: string): string;

    function execMacro(script: string): string;

    function getMTScriptCallingArgs(): any[];

    function registerMacro(macroName: string, callable: Function): void;
}

export declare namespace MapTool {
    function log(msg: string): void;
}

export declare namespace MapTool.chat {
    function broadcast(msg: string): void;

    function broadcast(lstOfPlayers: string[], msg: string): void;

    function broadcastToGM(msg: string): void;
}

