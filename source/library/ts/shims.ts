import { MTScript, MapTool } from "./mocks";

class MT {

    /**
     * Returns the name of the player for the Client that it executes on.
     * @returns Name of the player.
     */
    public static getPlayerName(): string {
        return MTScript.evalMacro("[r:getPlayerName()]");
    }

    /**
     * Returns true(1) if the current player is a GM or false(0) if they are not.
     * @param player - optional player name. 
     * @returns True if the player is GM or false is not.
     */
    public static isGM(player?: string): boolean {
        if (player == undefined) {
            return Number(MTScript.evalMacro("[r:isGM()")) == 1;
        }
        MTScript.setVariable("player", player);
        return Number(MTScript.evalMacro("[r:isGM(player)")) == 1;
    }

    /**
     * Returns the value of a token property from a library token. If the lib argument is not 
     * specified then the token property will be retrieved from the library token that the macro 
     * is currently running from. 
     * @param name - Name of the property
     * @param lib - If supplied, this is the specified library the property is set on. Otherwise 
     * it is the running library.
     * @returns 
     */
    public static getLibProperty(name: string, lib: string): string {
        MTScript.setVariable("name", name);
        MTScript.setVariable("lib", lib);

        return MTScript.evalMacro("[r:getLibProperty(name, lib)]");
    }

    /**
     * Sets the Token Property on a Library Token. if the name of the Library Token is not 
     * specified then the Token Property is set on the Library Token that the macro is running 
     * from.
     * @param name - Name of the property
     * @param value - Value of the property
     * @param libName - If supplied, this is the specified library the property is set on. 
     * Otherwise it is the running library.
     */
    public static setLibProperty(name: string, value: unknown, libName?: string) {
        MTScript.setVariable("name", name);
        MTScript.setVariable("value", value);
        if (libName != null)
            MTScript.setVariable("lib", libName);

        MTScript.evalMacro("[r:setLibProperty(name, value, lib)]");
    }

    /**
     * Encodes a string that was can be decoded with the decode() function. The decode() and 
     * encode() functions can be used to encode a property list so that it can be embedded 
     * within another property list.
     * @param str - string to encode.
     * @returns Encoded string.
     */
    public static encode(str: string): string {
        MTScript.setVariable("str", str);
        return MTScript.evalMacro("[r:encode(str)]");
    }

    /**
     * Decodes a string that was encoded with the encode() function. The encode() and decode() 
     * functions can be used to encode a property list so that it can be embedded within another 
     * property list.
     * @param str - string to decode.
     * @returns Decoded string.
     */
    public static decode(str: string): string {
        MTScript.setVariable("str", str);
        return MTScript.evalMacro("[r:decode(str)]");
    }

    /**
     * Takes the supplied text string and encodes it to Base64.
     * @param data - The text string to be encoded.
     * @returns A base64 encoded string.
     */
    public static btoa(data: string): string {
        MTScript.setVariable("data", data);
        return MTScript.evalMacro("[r:base64.encode(data)]");
    }

    /**
     * Accepts a Base64 encoded string and decodes it to plain text.
     * @param data - The base64 encoded string to be decoded.
     * @returns A plain text string.
     */
    public static atob(data: string): string {
        MTScript.setVariable("data", data);
        return MTScript.evalMacro("[r:base64.decode(data)]");
    }

    /**
     * Dialog specific methods.
     */
    public static dialog = class Dialog {

        /**
         * Creates a HTML dialog with the HTML source from the specified lib:// URI.
         * @param name - Name of the dialog, will be used as title if nothing is defined.
         * @param uri - A lib:// uri for the html to show in the dialog.
         * @param options - Dialog options. 
         */
        public static show(name: string, uri: string, options: string): void {
            MTScript.setVariable("name", name);
            MTScript.setVariable("uri", uri);
            MTScript.setVariable("options", options);
            MTScript.evalMacro("[h:html.dialog5(name, uri, options)]");
        }

        /**
         * Returns true if the specified dialog is visible, or false if it is not visible.
         * @param name - The name of the dialog.
         * @returns True if the dialog is visible.
         */
        public static isVisible(name: string): boolean {
            MTScript.setVariable("name", name);
            return Number(MTScript.evalMacro("[h:isDialogVisible(name)]")) === 1;
        }

        /**
         * Closes the specified macro dialog that was previously created using [dialog():], 
         * [dialog5():] or [html.dialog5():]. 
         * If the dialog is not open then the function has no effect.
         * @param name - The name of the dialog.
         */
        public static close(name: string): void {
            MTScript.setVariable("name", name);
            MTScript.evalMacro("[h:closeDialog(name)]");
        }

        /**
         * Returns a json object holding the properties associated with a given dialog. 
         * The properties are width, height, temporary, title, and value.
         * @param name - The name of the dialog.
         * @returns A json object with the dialog options.
         */
        public static getOptions(name: string): JSON {
            MTScript.setVariable("name", name);
            const data = MTScript.evalMacro("[h:getDialogProperties(name)]");
            return JSON.parse(data);
        }
    }


    /**
     * Frame specific methods.
     */
    public static frame = class Frame {

        /**
         * Creates a HTML5 frame with the HTML source from the specified lib:// URI.
         * @param name - Name of the frame, will be used as title if nothing is defined.
         * @param uri - A lib:// uri for the html to show in the frame.
         * @param options - Frame options. 
         */
        public static show(name: string, uri: string, options: string): void {
            MTScript.setVariable("name", name);
            MTScript.setVariable("uri", uri);
            MTScript.setVariable("options", options);
            MTScript.evalMacro("[h:html.frame5(name, uri, options)]");
        }

        /**
         * Returns true if the specified frame is visible, or false if it is not visible.
         * @param name - The name of the frame.
         * @returns True if the frame is visible.
         */
        public static isVisible(name: string): boolean {
            MTScript.setVariable("name", name);
            return Number(MTScript.evalMacro("[r:isFrameVisible(name)]")) === 1;
        }

        /**
         * Closes the specified frame that was previously created using [frame():], [frame5():] 
         * or [html.frame5():]. 
         * If the frame is not open then the function has no effect.
         * @param name - The name of the frame.
         */
        public static close(name: string): void {
            MTScript.setVariable("name", name);
            MTScript.evalMacro("[h:closeDialog(name)]");
        }

        /**
         * Returns a json object holding the properties associated with a given frame. 
         * The properties are width, height, temporary, title, and value.
         * @param name - The name of the frame.
         * @returns A json object with the frame options.
         */
        public static getOptions(name: string): JSON {
            MTScript.setVariable("name", name);
            const data = MTScript.evalMacro("[r:getFrameProperties(name)]");
            return JSON.parse(data);
        }

        /**
         * Resets a frame to its default position.
         * @param name - The name of the frame.
         */
        public static reset(name: string): void {
            MTScript.setVariable("name", name);
            MTScript.evalMacro("[h:resetFrame(name)]");
        }
    }

    public static overlay = class Overlay {
        /**
         * Creates a HTML5 overlay with the HTML source from the specified lib:// URI.
         * @param name - The name of the overlay.
         * @param uri - A lib:// uri for the html to show in the overlay.
         * @param options - Frame options. 
         */
        public static show(name: string, uri: string, options: string): void {
            MTScript.setVariable("name", name);
            MTScript.setVariable("uri", uri);
            MTScript.setVariable("options", options);
            MTScript.evalMacro("[h:html.overlay(name, uri, options)]");
        }

        /**
         * Returns true if the specified overlay is visible, or false if it is not visible.
         * @param name - The name of the overlay.
         * @returns True if the overlay is visible.
         */
        public static isVisible(name: string): boolean {
            MTScript.setVariable("name", name);
            return Number(MTScript.evalMacro("[r:isOverlayVisible(name)]")) === 1;
        }

        /**
         * Returns 1 if the specified overlay is registered, or 0 if it is not registered.
         * @param name - The name of the overlay.
         * @returns True if the overlay is registered, whether visible or not. Otherwise false.
         */
        public static isRegistered(name: string): boolean {
            MTScript.setVariable("name", name);
            return Number(MTScript.evalMacro("[r:isOverlayRegistered(name)]")) === 1;
        }

        /**
         * Use to toggle the visible status of an Overlay as seen in the Windows -> Overlay menu.
         * @param name - The name of the overlay.
         * @param visible True if the overlay should be visible, false if not.
         */
        public static setVisible(name: string, visible: boolean): void {
            MTScript.setVariable("name", name);
            MTScript.setVariable("visible", visible ? 1 : 0);
            MTScript.evalMacro("[h:setOverlayVisible(name, visible)]");
        }

        /**
         * Closes the specified overlay that was previously created using [overlay():] or 
         * [html.overlay():]. 
         * If the overlay is not open then the function has no effect.
         * @param name - The name of the overlay.
         */
        public static close(name: string): void {
            MTScript.setVariable("name", name);
            MTScript.evalMacro("[h:closeOverlay(name)]");
        }

        /**
         * Returns a json object holding the properties associated with a given overlay. 
         * The properties are name, zorder, and visible.
         * @param name - The name of the overlay.
         * @returns A json object with the overlay options.
         */
        public static getOptions(name: string): JSON {
            MTScript.setVariable("name", name);
            const data = MTScript.evalMacro("[r:getOverlayProperties(name)]");
            return JSON.parse(data);
        }
    }
}