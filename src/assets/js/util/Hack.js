export default class Hacker {
    static hack() {
        Date.now || (Date.now = function() {
            return (+new Date).getTime();
        });
        Array.prototype.peek = function() {
            return this[this.length - 1];
        };
        Array.prototype.remove = function(a) {
            var i = this.indexOf(a);
            if (i !== -1) this.splice(i, 1);
            return i !== -1;
        };
    }
}