export default class Logger {
    constructor(verbosity) {
        this.verbosity = verbosity;
    }
    error(msg) {
        if (this.verbosity <= 0) return;
        console.error(msg);
    }
    warn(msg) {
        if (this.verbosity <= 1) return;
        console.warn(msg);
    }
    info(msg) {
        if (this.verbosity <= 2) return;
        console.info(msg);
    }
    debug(msg) {
        if (this.verbosity <= 3) return;
        console.debug(msg);
    }
}
