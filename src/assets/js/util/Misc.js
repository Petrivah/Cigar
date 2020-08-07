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
}