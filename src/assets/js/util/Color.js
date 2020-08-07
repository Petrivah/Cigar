export default class Color {
    static fromString(color) {
        if (color.length === 4)
            return new Color(parseInt(color[1] + color[1], 16), parseInt(color[2] + color[2], 16), parseInt(color[3] + color[3], 16));
        else if (color.length === 7)
            return new Color(parseInt(color[1] + color[2], 16), parseInt(color[3] + color[4], 16), parseInt(color[5] + color[6], 16));
        throw new Error(`invalid color ${color}`);
    }
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    darken(k = 0.1) {
        const d = 1 - k;
        return new Color(this.r * d, this.g * d, this.b * d);
    }
    toString() {
        const r = (~~this.r).toString(16).padStart(2, '0');
        const g = (~~this.g).toString(16).padStart(2, '0');
        const b = (~~this.b).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }
}