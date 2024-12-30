const log = (...msg: string[]) => console.log('\x1b[38;2;255;105;180m[CustomMsgBub]\x1b[0m ', ...msg);
export = log;