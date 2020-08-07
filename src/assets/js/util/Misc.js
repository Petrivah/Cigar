export default class Misc {
    static cleanupObject(object) {
        for (var i in object) {
            delete object[i];
        }
    }
    static checkIE() {
        if (navigator.appVersion.indexOf("MSIE") != -1) {
            alert("You're using a pretty old browser, some parts of the website might not work properly.");
        }
    }
    static cellSort(a, b) {
        return a.s === b.s ? a.id - b.id : a.s - b.s;
    }
    static prettyPrintTime(seconds) {
        seconds = ~~seconds;
        var minutes = ~~(seconds / 60);
        if (minutes < 1) return "<1 min";
        var hours = ~~(minutes / 60);
        if (hours < 1) return minutes + "min";
        var days = ~~(hours / 24);
        if (days < 1) return hours + "h";
        return days + "d";
    }
}