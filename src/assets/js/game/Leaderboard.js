export default class Leaderboard {
    constructor(settings) {
        this.settings = settings;
        this.cleanup();
    }
    cleanup() {
        this.type = NaN;
        this.items = null;
        this.canvas = document.createElement("canvas");
        this.teams = ["#F33", "#3F3", "#33F"];
    }
    draw() {
        if (this.type === NaN) return this.visible = false;
        if (!this.settings.showNames || this.items.length === 0)
            return this.visible = false;
        this.visible = true;
        var canvas = this.canvas;
        var ctx = canvas.getContext("2d");
        var len = this.items.length;

        canvas.width = 200;
        canvas.height = this.type !== "pie" ? 60 + 24 * len : 240;

        ctx.globalAlpha = .4;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 200, canvas.height);

        ctx.globalAlpha = 1;
        ctx.fillStyle = "#FFF";
        ctx.font = "30px Ubuntu";
        ctx.fillText("Leaderboard", 100 - ctx.measureText("Leaderboard").width / 2, 40);

        if (this.type === "pie") {
            var last = 0;
            for (var i = 0; i < len; i++) {
                ctx.fillStyle = this.teams[i];
                ctx.beginPath();
                ctx.moveTo(100, 140);
                ctx.arc(100, 140, 80, last, (last += this.items[i] * PI_2), false);
                ctx.closePath();
                ctx.fill();
            }
        } else {
            var text, isMe = false, w, start;
            ctx.font = "20px Ubuntu";
            for (var i = 0; i < len; i++) {
                if (this.type === "text")
                    text = this.items[i];
                else
                    text = this.items[i].name,
                    isMe = this.items[i].me;

                // replace {skin} with empty string
                var reg = /\{([\w]+)\}/.exec(text);
                if (reg) text = text.replace(reg[0], "").trim();

                ctx.fillStyle = isMe ? "#FAA" : "#FFF";
                if (this.type === "ffa")
                    text = (i + 1) + ". " + (text || "An unnamed cell");
                var start = ((w = ctx.measureText(text).width) > 200) ? 2 : 100 - w * 0.5;
                ctx.fillText(text, start, 70 + 24 * i);
            }
        }
    }
}