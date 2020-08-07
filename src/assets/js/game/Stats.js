import Misc from '../util/Misc';

export default class Stats {
    constructor(settings) {
        this.settings = settings;
        this.cleanup();
    }
    cleanup() {
        this.framesPerSecond = 0;
        this.latency = NaN;
        this.supports = null;
        this.info = null;
        this.pingLoopId = NaN;
        this.pingLoopStamp = null;
        this.canvas = document.createElement("canvas");
        this.visible = false;
        this.score = NaN;
        this.maxScore = 0;
    }
    draw() {
        if (!this.info) return this.visible = false;
        this.visible = true;

        var canvas = this.canvas;
        var ctx = canvas.getContext("2d");
        ctx.font = "14px Ubuntu";
        var rows = [
            `${this.info.name} (${this.info.mode})`,
            `${this.info.playersTotal} / ${this.info.playersLimit} players`,
            `${this.info.playersAlive} playing`,
            `${this.info.playersSpect} spectating`,
            `${(this.info.update * 2.5).toFixed(1)}% load @ ${Misc.prettyPrintTime(this.info.uptime)}`
        ];
        var width = 0;
        for (var i = 0; i < rows.length; i++)
            width = Math.max(width, 2 + ctx.measureText(rows[i]).width + 2);
        canvas.width = width;
        canvas.height = rows.length * (14 + 2);
        ctx.font = "14px Ubuntu";
        ctx.fillStyle = this.settings.darkTheme ? "#AAA" : "#555";
        ctx.textBaseline = "top";
        for (var i = 0; i < rows.length; i++)
            ctx.fillText(rows[i], 2, -2 + i * (14 + 2));
    }
}