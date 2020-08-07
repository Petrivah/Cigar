import Emitter from 'events';

export default class Connection extends Emitter {
    constructor(logger, https) {
        super();
        this.logger = logger;
        this.url = null;
        this.ws = null;
        this.https = https;
        this.disconnectDelay = 1000;

        this.SEND_254 = new Uint8Array([254, 6, 0, 0, 0]);
        this.SEND_255 = new Uint8Array([255, 1, 0, 0, 0]);
        this.UINT8_CACHE = {
            1: new Uint8Array([1]),
            17: new Uint8Array([17]),
            21: new Uint8Array([21]),
            18: new Uint8Array([18]),
            19: new Uint8Array([19]),
            22: new Uint8Array([22]),
            23: new Uint8Array([23]),
            24: new Uint8Array([24]),
            254: new Uint8Array([254])
        };
    }
    cleanup() {
        if (!this.ws) return;
        this.logger.debug("ws cleanup trigger");
        this.ws.onopen = null;
        this.ws.onmessage = null;
        this.ws.close();
        this.ws = null;

        this.emit('cleanup');
    }
    send(data) {
        if (!this.ws) return;
        if (this.ws.readyState !== 1) return;
        if (data.build) this.ws.send(data.build());
        else this.ws.send(data);
    }
    sendRaw(...data) {
        const bytes = new Uint8Array(data);
        this.send(bytes);
    }
    init(url = null) {
        if (this.ws) {
            this.logger.debug("ws init on existing conn");
            this.cleanup();
        }
        if (url) {
            this.url = url;
        }
        this.ws = new WebSocket(`ws${this.https ? "s" : ""}://${this.url}`);
        this.ws.binaryType = "arraybuffer";
        this.ws.onopen = this.onopen.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onerror = this.onerror.bind(this);
        this.ws.onclose = this.onclose.bind(this);

        this.emit('init');
    }
    onopen() {
        this.disconnectDelay = 1000;
        this.logger.debug(`ws connected, using https: ${this.https}`);

        this.emit('open');
    }
    onclose(e) {
        this.logger.debug(`ws disconnected ${e.code} '${e.reason}'`);
        this.cleanup();
        setTimeout(() => {
            if (this.ws && this.ws.readyState === 1) return;
            this.init();
        }, this.disconnectDelay *= 1.5);

        this.emit('close');
    }
    onerror(error) {
        this.logger.warn(error);

        this.emit('error', error);
    }
    onmessage(data) {
        this.emit('message', data);
    }
}