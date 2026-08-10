"use strict";

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(t) { return typeof t; }
        : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t; }
    )(t);
}

!function(t) {
    var mergeObject = function t(n) {
        for (var e, o = n || {}, s = 1; s < arguments.length; s += 1) {
            e = arguments[s];
            var r = Object.keys(e);
            if (r.length) {
                for (var a = 0; a < r.length; a += 1) {
                    var l = r[a];
                    Object.prototype.hasOwnProperty.call(e, l) && ("object" === _typeof(e[l]) ? t(o[l], e[l]) : o[l] = e[l]);
                }
            }
        }
        return o;
    };

    var createElements = function(t, n, e) {
        var o = document.createElement("div");
        var s = document.createElement("span");
        var r = document.createElement("span");
        var a = document.createElement("div");

        a.appendChild(s);
        a.appendChild(r);
        o.appendChild(a);

        o.classList.add(n.sectionClass);
        o.classList.add(e);
        s.classList.add(n.amountClass);
        r.classList.add(n.wordClass);

        t.appendChild(o);

        return {
            full: o,
            amount: s,
            word: r
        };
    };

    t.simplyCountdown = function(t, o) {
        var s, r, a, l, i, u, c, d, p, m, y;
        var g = Object.getPrototypeOf(t);

        var w = mergeObject({
            year: 2015,
            month: 6,
            day: 28,
            hours: 0,
            minutes: 0,
            seconds: 0,
            words: {
                days: { singular: "day", plural: "days" },
                hours: { singular: "hour", plural: "hours" },
                minutes: { singular: "minute", plural: "minutes" },
                seconds: { singular: "second", plural: "seconds" }
            },
            plural: true,
            inline: false,
            enableUtc: false,
            onEnd: function() {},
            refresh: 1000,
            inlineClass: "simply-countdown-inline",
            sectionClass: "simply-section",
            amountClass: "simply-amount",
            wordClass: "simply-word",
            zeroPad: false,
            countUp: false
        }, o);

        y = g === String.prototype ? document.querySelectorAll(t) : t;

        a = new Date(w.year, w.month - 1, w.day, w.hours, w.minutes, w.seconds);
        r = w.enableUtc
            ? new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds())
            : a;

        var f;
        var h = function(t) {
            var n, o = t;
            var a = function(t, n) {
                var o;
                if (t.inline) {
                    o = document.createElement("span");
                    o.classList.add(t.inlineClass);
                    return o;
                }
                return {
                    days: createElements(n, t, "simply-days-section"),
                    hours: createElements(n, t, "simply-hours-section"),
                    minutes: createElements(n, t, "simply-minutes-section"),
                    seconds: createElements(n, t, "simply-seconds-section")
                };
            }(w, o);

            (n = function() {
                var t, n, e, y;

                var g = function() {
                    c = parseInt(u / 86400, 10);
                    u %= 86400;
                    d = parseInt(u / 3600, 10);
                    u %= 3600;
                    p = parseInt(u / 60, 10);
                    m = parseInt(u % 60, 10);
                };

                l = new Date;
                if (w.enableUtc) {
                    i = new Date(l.getFullYear(), l.getMonth(), l.getDate(), l.getHours(), l.getMinutes(), l.getSeconds());
                    u = (r - i.getTime()) / 1000;
                } else {
                    u = (r - l.getTime()) / 1000;
                }

                if (u > 0) {
                    g();
                } else if (w.countUp) {
                    u = (l.getTime() - r) / 1000;
                    g();
                } else {
                    c = 0;
                    d = 0;
                    p = 0;
                    m = 0;
                    window.clearInterval(s);
                    w.onEnd();
                }

                if (w.plural) {
                    t = c > 1 ? w.words.days.plural : w.words.days.singular;
                    n = d > 1 ? w.words.hours.plural : w.words.hours.singular;
                    e = p > 1 ? w.words.minutes.plural : w.words.minutes.singular;
                    y = m > 1 ? w.words.seconds.plural : w.words.seconds.singular;
                } else {
                    t = w.words.days.singular;
                    n = w.words.hours.singular;
                    e = w.words.minutes.singular;
                    y = w.words.seconds.singular;
                }

                if (w.inline) {
                    o.innerHTML = ""
                        .concat(c, " ").concat(t, ", ")
                        .concat(d, " ").concat(n, ", ")
                        .concat(p, " ").concat(e, ", ")
                        .concat(m, " ").concat(y, ".");
                } else {
                    a.days.amount.textContent = (w.zeroPad && c.toString().length < 2 ? "0" : "") + c;
                    a.days.word.textContent = t;
                    a.hours.amount.textContent = (w.zeroPad && d.toString().length < 2 ? "0" : "") + d;
                    a.hours.word.textContent = n;
                    a.minutes.amount.textContent = (w.zeroPad && p.toString().length < 2 ? "0" : "") + p;
                    a.minutes.word.textContent = e;
                    a.seconds.amount.textContent = (w.zeroPad && m.toString().length < 2 ? "0" : "") + m;
                    a.seconds.word.textContent = y;
                }
            })();

            s = window.setInterval(n, w.refresh);
        };

        if (null !== (f = y) && Symbol.iterator in Object(f)) {
            Array.prototype.forEach.call(y, function(t) {
                h(t);
            });
        } else {
            h(y);
        }
    };
}(window);

window.jQuery && function(t, n) {
    t.fn.simplyCountdown = function(t) {
        return function(t, e) {
            n(t, e);
        }(this.selector, t);
    };
}(jQuery, simplyCountdown);