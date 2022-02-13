﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function () {
    if (window.CKEDITOR && window.CKEDITOR.dom) return;
    window.CKEDITOR || (window.CKEDITOR = function () {
        var b = {
            timestamp: "D2LL4",
            version: "4.1",
            revision: "80c139aa",
            rnd: Math.floor(900 * Math.random()) + 100,
            _: {
                pending: []
            },
            status: "unloaded",
            basePath: function () {
                var a = window.CKEDITOR_BASEPATH || "";
                if (!a) for (var b = document.getElementsByTagName("script"), d = 0; d < b.length; d++) {
                        var c = b[d].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                        if (c) {
                            a = c[1];
                            break
                        }
                } - 1 == a.indexOf(":/") && (a = 0 === a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] +
                    a);
                if (!a) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return a
            }(),
            getUrl: function (a) {
                -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                this.timestamp && ("/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a)) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp);
                return a
            },
            domReady: function () {
                function a() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                    } catch (d) {}
                }
                function b() {
                    for (var a; a = d.shift();) a()
                }
                var d = [];
                return function (b) {
                    d.push(b);
                    "complete" === document.readyState && setTimeout(a, 1);
                    if (1 == d.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                        else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", a);
                        window.attachEvent("onload", a);
                        b = !1;
                        try {
                            b = !window.frameElement
                        } catch (e) {}
                        if (document.documentElement.doScroll && b) {
                            var c = function () {
                                try {
                                    document.documentElement.doScroll("left")
                                } catch (b) {
                                    setTimeout(c, 1);
                                    return
                                }
                                a()
                            };
                            c()
                        }
                    }
                }
            }()
        }, c = window.CKEDITOR_GETURL;
        if (c) {
            var a = b.getUrl;
            b.getUrl = function (g) {
                return c.call(b, g) || a.call(b, g)
            }
        }
        return b
    }());
    CKEDITOR.event || (CKEDITOR.event = function () {}, CKEDITOR.event.implementOn = function (b) {
        var c = CKEDITOR.event.prototype,
            a;
        for (a in c) b[a] == void 0 && (b[a] = c[a])
    }, CKEDITOR.event.prototype = function () {
        function b(g) {
            var b = c(this);
            return b[g] || (b[g] = new a(g))
        }
        var c = function (a) {
            a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
            return a.events || (a.events = {})
        }, a = function (a) {
                this.name = a;
                this.listeners = []
            };
        a.prototype = {
            getListenerIndex: function (a) {
                for (var b = 0, d = this.listeners; b < d.length; b++) if (d[b].fn == a) return b;
                return -1
            }
        };
        return {
            define: function (a, e) {
                var d = b.call(this, a);
                CKEDITOR.tools.extend(d, e, true)
            },
            on: function (a, e, d, c, i) {
                function j(b, m, o, n) {
                    b = {
                        name: a,
                        sender: this,
                        editor: b,
                        data: m,
                        listenerData: c,
                        stop: o,
                        cancel: n,
                        removeListener: l
                    };
                    return e.call(d, b) === false ? false : b.data
                }
                function l() {
                    m.removeListener(a, e)
                }
                var n = b.call(this, a);
                if (n.getListenerIndex(e) < 0) {
                    n = n.listeners;
                    d || (d = this);
                    isNaN(i) && (i = 10);
                    var m = this;
                    j.fn = e;
                    j.priority = i;
                    for (var o = n.length - 1; o >= 0; o--) if (n[o].priority <= i) {
                            n.splice(o + 1, 0, j);
                            return {
                                removeListener: l
                            }
                        }
                    n.unshift(j)
                }
                return {
                    removeListener: l
                }
            },
            once: function () {
                var a = arguments[1];
                arguments[1] = function (b) {
                    b.removeListener();
                    return a.apply(this, arguments)
                };
                return this.on.apply(this, arguments)
            },
            capture: function () {
                CKEDITOR.event.useCapture = 1;
                var a = this.on.apply(this, arguments);
                CKEDITOR.event.useCapture = 0;
                return a
            },
            fire: function () {
                var a = 0,
                    b = function () {
                        a = 1
                    }, d = 0,
                    f = function () {
                        d = 1
                    };
                return function (i, j, l) {
                    var n = c(this)[i],
                        i = a,
                        m = d;
                    a = d = 0;
                    if (n) {
                        var o = n.listeners;
                        if (o.length) for (var o = o.slice(0), k, h = 0; h < o.length; h++) {
                                if (n.errorProof) try {
                                        k = o[h].call(this,
                                        l, j, b, f)
                                } catch (s) {} else k = o[h].call(this, l, j, b, f);
                                k === false ? d = 1 : typeof k != "undefined" && (j = k);
                                if (a || d) break
                        }
                    }
                    j = d ? false : typeof j == "undefined" ? true : j;
                    a = i;
                    d = m;
                    return j
                }
            }(),
            fireOnce: function (a, b, d) {
                b = this.fire(a, b, d);
                delete c(this)[a];
                return b
            },
            removeListener: function (a, b) {
                var d = c(this)[a];
                if (d) {
                    var f = d.getListenerIndex(b);
                    f >= 0 && d.listeners.splice(f, 1)
                }
            },
            removeAllListeners: function () {
                var a = c(this),
                    b;
                for (b in a) delete a[b]
            },
            hasListeners: function (a) {
                return (a = c(this)[a]) && a.listeners.length > 0
            }
        }
    }());
    CKEDITOR.editor || (CKEDITOR.editor = function () {
        CKEDITOR._.pending.push([this, arguments]);
        CKEDITOR.event.call(this)
    }, CKEDITOR.editor.prototype.fire = function (b, c) {
        b in {
            instanceReady: 1,
            loaded: 1
        } && (this[b] = true);
        return CKEDITOR.event.prototype.fire.call(this, b, c, this)
    }, CKEDITOR.editor.prototype.fireOnce = function (b, c) {
        b in {
            instanceReady: 1,
            loaded: 1
        } && (this[b] = true);
        return CKEDITOR.event.prototype.fireOnce.call(this, b, c, this)
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype));
    CKEDITOR.env || (CKEDITOR.env = function () {
        var b = navigator.userAgent.toLowerCase(),
            c = window.opera,
            a = {
                ie: eval("/*@cc_on!@*/false"),
                opera: !! c && c.version,
                webkit: b.indexOf(" applewebkit/") > -1,
                air: b.indexOf(" adobeair/") > -1,
                mac: b.indexOf("macintosh") > -1,
                quirks: document.compatMode == "BackCompat",
                mobile: b.indexOf("mobile") > -1,
                iOS: /(ipad|iphone|ipod)/.test(b),
                isCustomDomain: function () {
                    if (!this.ie) return false;
                    var a = document.domain,
                        b = window.location.hostname;
                    return a != b && a != "[" + b + "]"
                },
                secure: location.protocol == "https:"
            };
        a.gecko = navigator.product == "Gecko" && !a.webkit && !a.opera;
        if (a.webkit) b.indexOf("chrome") > -1 ? a.chrome = true : a.safari = true;
        var g = 0;
        if (a.ie) {
            g = a.quirks || !document.documentMode ? parseFloat(b.match(/msie (\d+)/)[1]) : document.documentMode;
            a.ie9Compat = g == 9;
            a.ie8Compat = g == 8;
            a.ie7Compat = g == 7;
            a.ie6Compat = g < 7 || a.quirks
        }
        if (a.gecko) {
            var e = b.match(/rv:([\d\.]+)/);
            if (e) {
                e = e[1].split(".");
                g = e[0] * 1E4 + (e[1] || 0) * 100 + (e[2] || 0) * 1
            }
        }
        a.opera && (g = parseFloat(c.version()));
        a.air && (g = parseFloat(b.match(/ adobeair\/(\d+)/)[1]));
        a.webkit && (g = parseFloat(b.match(/ applewebkit\/(\d+)/)[1]));
        a.version = g;
        a.isCompatible = a.iOS && g >= 534 || !a.mobile && (a.ie && g > 6 || a.gecko && g >= 10801 || a.opera && g >= 9.5 || a.air && g >= 1 || a.webkit && g >= 522 || false);
        a.cssClass = "cke_browser_" + (a.ie ? "ie" : a.gecko ? "gecko" : a.opera ? "opera" : a.webkit ? "webkit" : "unknown");
        if (a.quirks) a.cssClass = a.cssClass + " cke_browser_quirks";
        if (a.ie) {
            a.cssClass = a.cssClass + (" cke_browser_ie" + (a.quirks || a.version < 7 ? "6" : a.version));
            if (a.quirks) a.cssClass = a.cssClass + " cke_browser_iequirks"
        }
        if (a.gecko) if (g <
                10900) a.cssClass = a.cssClass + " cke_browser_gecko18";
            else if (g <= 11E3) a.cssClass = a.cssClass + " cke_browser_gecko19";
        if (a.air) a.cssClass = a.cssClass + " cke_browser_air";
        return a
    }());
    "unloaded" == CKEDITOR.status && function () {
        CKEDITOR.event.implementOn(CKEDITOR);
        CKEDITOR.loadFullCore = function () {
            if (CKEDITOR.status != "basic_ready") CKEDITOR.loadFullCore._load = 1;
            else {
                delete CKEDITOR.loadFullCore;
                var b = document.createElement("script");
                b.type = "text/javascript";
                b.src = CKEDITOR.basePath + "ckeditor.js";
                document.getElementsByTagName("head")[0].appendChild(b)
            }
        };
        CKEDITOR.loadFullCoreTimeout = 0;
        CKEDITOR.add = function (b) {
            (this._.pending || (this._.pending = [])).push(b)
        };
        (function () {
            CKEDITOR.domReady(function () {
                var b =
                    CKEDITOR.loadFullCore,
                    c = CKEDITOR.loadFullCoreTimeout;
                if (b) {
                    CKEDITOR.status = "basic_ready";
                    b && b._load ? b() : c && setTimeout(function () {
                        CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
                    }, c * 1E3)
                }
            })
        })();
        CKEDITOR.status = "basic_loaded"
    }();
    CKEDITOR.dom = {};
    (function () {
        var b = [],
            c = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.opera ? "-o-" : CKEDITOR.env.ie ? "-ms-" : "";
        CKEDITOR.on("reset", function () {
            b = []
        });
        CKEDITOR.tools = {
            arrayCompare: function (a, b) {
                if (!a && !b) return true;
                if (!a || !b || a.length != b.length) return false;
                for (var e = 0; e < a.length; e++) if (a[e] != b[e]) return false;
                return true
            },
            clone: function (a) {
                var b;
                if (a && a instanceof Array) {
                    b = [];
                    for (var e = 0; e < a.length; e++) b[e] = CKEDITOR.tools.clone(a[e]);
                    return b
                }
                if (a === null || typeof a != "object" ||
                    a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp) return a;
                b = new a.constructor;
                for (e in a) b[e] = CKEDITOR.tools.clone(a[e]);
                return b
            },
            capitalize: function (a) {
                return a.charAt(0).toUpperCase() + a.substring(1).toLowerCase()
            },
            extend: function (a) {
                var b = arguments.length,
                    e, d;
                if (typeof (e = arguments[b - 1]) == "boolean") b--;
                else if (typeof (e = arguments[b - 2]) == "boolean") {
                    d = arguments[b - 1];
                    b = b - 2
                }
                for (var c = 1; c < b; c++) {
                    var i = arguments[c],
                        j;
                    for (j in i) if (e === true || a[j] == void 0) if (!d ||
                                j in d) a[j] = i[j]
                }
                return a
            },
            prototypedCopy: function (a) {
                var b = function () {};
                b.prototype = a;
                return new b
            },
            copy: function (a) {
                var b = {}, e;
                for (e in a) b[e] = a[e];
                return b
            },
            isArray: function (a) {
                return !!a && a instanceof Array
            },
            isEmpty: function (a) {
                for (var b in a) if (a.hasOwnProperty(b)) return false;
                return true
            },
            cssVendorPrefix: function (a, b, e) {
                if (e) return c + a + ":" + b + ";" + a + ":" + b;
                e = {};
                e[a] = b;
                e[c + a] = b;
                return e
            },
            cssStyleToDomStyle: function () {
                var a = document.createElement("div").style,
                    b = typeof a.cssFloat != "undefined" ? "cssFloat" :
                        typeof a.styleFloat != "undefined" ? "styleFloat" : "float";
                return function (a) {
                    return a == "float" ? b : a.replace(/-./g, function (a) {
                        return a.substr(1).toUpperCase()
                    })
                }
            }(),
            buildStyleHtml: function (a) {
                for (var a = [].concat(a), b, e = [], d = 0; d < a.length; d++) if (b = a[d]) /@import|[{}]/.test(b) ? e.push("<style>" + b + "</style>") : e.push('<link type="text/css" rel=stylesheet href="' + b + '">');
                return e.join("")
            },
            buildScriptHtml: function (a) {
                for (var a = [].concat(a), b, e = [], d = 0; d < a.length; d++) if (b = a[d]) if((new RegExp('\.js$')).test(b)) { e.push('<script type="text/javascript" language=javascript src="' + b + '"></script>') } else { e.push("<script>" + b + "</script>")};
                return e.join("")
            },
            htmlEncode: function (a) {
                return ("" + a).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
            },
            htmlEncodeAttr: function (a) {
                return a.replace(/"/g,
                    "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            },
            getNextNumber: function () {
                var a = 0;
                return function () {
                    return ++a
                }
            }(),
            getNextId: function () {
                return "cke_" + this.getNextNumber()
            },
            override: function (a, b) {
                var e = b(a);
                e.prototype = a.prototype;
                return e
            },
            setTimeout: function (a, b, e, d, c) {
                c || (c = window);
                e || (e = c);
                return c.setTimeout(function () {
                    d ? a.apply(e, [].concat(d)) : a.apply(e)
                }, b || 0)
            },
            trim: function () {
                var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function (b) {
                    return b.replace(a, "")
                }
            }(),
            ltrim: function () {
                var a = /^[ \t\n\r]+/g;
                return function (b) {
                    return b.replace(a, "")
                }
            }(),
            rtrim: function () {
                var a = /[ \t\n\r]+$/g;
                return function (b) {
                    return b.replace(a, "")
                }
            }(),
            indexOf: function (a, b) {
                if (typeof b == "function") for (var e = 0, d = a.length; e < d; e++) {
                        if (b(a[e])) return e
                } else {
                    if (a.indexOf) return a.indexOf(b);
                    e = 0;
                    for (d = a.length; e < d; e++) if (a[e] === b) return e
                }
                return -1
            },
            search: function (a, b) {
                var e = CKEDITOR.tools.indexOf(a, b);
                return e >= 0 ? a[e] : null
            },
            bind: function (a, b) {
                return function () {
                    return a.apply(b, arguments)
                }
            },
            createClass: function (a) {
                var b = a.$,
                    e = a.base,
                    d = a.privates || a._,
                    c = a.proto,
                    a = a.statics;
                !b && (b = function () {
                    e && this.base.apply(this, arguments)
                });
                if (d) var i = b,
                b = function () {
                    var a = this._ || (this._ = {}),
                        b;
                    for (b in d) {
                        var g = d[b];
                        a[b] = typeof g == "function" ? CKEDITOR.tools.bind(g, this) : g
                    }
                    i.apply(this, arguments)
                };
                if (e) {
                    b.prototype = this.prototypedCopy(e.prototype);
                    b.prototype.constructor = b;
                    b.base = e;
                    b.baseProto = e.prototype;
                    b.prototype.base = function () {
                        this.base = e.prototype.base;
                        e.apply(this, arguments);
                        this.base = arguments.callee
                    }
                }
                c && this.extend(b.prototype,
                c, true);
                a && this.extend(b, a, true);
                return b
            },
            addFunction: function (a, g) {
                return b.push(function () {
                    return a.apply(g || this, arguments)
                }) - 1
            },
            removeFunction: function (a) {
                b[a] = null
            },
            callFunction: function (a) {
                var g = b[a];
                return g && g.apply(window, Array.prototype.slice.call(arguments, 1))
            },
            cssLength: function () {
                var a = /^-?\d+\.?\d*px$/,
                    b;
                return function (e) {
                    b = CKEDITOR.tools.trim(e + "") + "px";
                    return a.test(b) ? b : e || ""
                }
            }(),
            convertToPx: function () {
                var a;
                return function (b) {
                    if (!a) {
                        a = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>',
                        CKEDITOR.document);
                        CKEDITOR.document.getBody().append(a)
                    }
                    if (!/%$/.test(b)) {
                        a.setStyle("width", b);
                        return a.$.clientWidth
                    }
                    return b
                }
            }(),
            repeat: function (a, b) {
                return Array(b + 1).join(a)
            },
            tryThese: function () {
                for (var a, b = 0, e = arguments.length; b < e; b++) {
                    var d = arguments[b];
                    try {
                        a = d();
                        break
                    } catch (c) {}
                }
                return a
            },
            genKey: function () {
                return Array.prototype.slice.call(arguments).join("-")
            },
            defer: function (a) {
                return function () {
                    var b = arguments,
                        e = this;
                    window.setTimeout(function () {
                        a.apply(e, b)
                    }, 0)
                }
            },
            normalizeCssText: function (a,
            b) {
                var e = [],
                    d, c = CKEDITOR.tools.parseCssText(a, true, b);
                for (d in c) e.push(d + ":" + c[d]);
                e.sort();
                return e.length ? e.join(";") + ";" : ""
            },
            convertRgbToHex: function (a) {
                return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, b, d, c) {
                    a = [b, d, c];
                    for (b = 0; b < 3; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                    return "#" + a.join("")
                })
            },
            parseCssText: function (a, b, e) {
                var d = {};
                if (e) {
                    e = new CKEDITOR.dom.element("span");
                    e.setAttribute("style", a);
                    a = CKEDITOR.tools.convertRgbToHex(e.getAttribute("style") ||
                        "")
                }
                if (!a || a == ";") return d;
                a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, e, c) {
                    if (b) {
                        e = e.toLowerCase();
                        e == "font-family" && (c = c.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ","));
                        c = CKEDITOR.tools.trim(c)
                    }
                    d[e] = c
                });
                return d
            },
            writeCssText: function (a, b) {
                var e, c = [];
                for (e in a) c.push(e + ":" + a[e]);
                b && c.sort();
                return c.join("; ")
            },
            objectCompare: function (a, b, c) {
                var d;
                if (!a && !b) return true;
                if (!a || !b) return false;
                for (d in a) if (a[d] != b[d]) return false;
                if (!c) for (d in b) if (a[d] !=
                            b[d]) return false;
                return true
            },
            objectKeys: function (a) {
                var b = [],
                    c;
                for (c in a) b.push(c);
                return b
            },
            convertArrayToObject: function (a, b) {
                var c = {};
                arguments.length == 1 && (b = true);
                for (var d = 0, f = a.length; d < f; ++d) c[a[d]] = b;
                return c
            }
        }
    })();
    CKEDITOR.dtd = function () {
        var b = CKEDITOR.tools.extend,
            c = function (a, b) {
                for (var g = CKEDITOR.tools.clone(a), o = 1; o < arguments.length; o++) {
                    var b = arguments[o],
                        k;
                    for (k in b) delete g[k]
                }
                return g
            }, a = {}, g = {}, e = {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                details: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figure: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                hr: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                p: 1,
                pre: 1,
                section: 1,
                table: 1,
                ul: 1
            }, d = {
                command: 1,
                link: 1,
                meta: 1,
                noscript: 1,
                script: 1,
                style: 1
            }, f = {}, i = {
                "#": 1
            }, j = {
                center: 1,
                dir: 1,
                noframes: 1
            };
        b(a, {
            a: 1,
            abbr: 1,
            area: 1,
            audio: 1,
            b: 1,
            bdi: 1,
            bdo: 1,
            br: 1,
            button: 1,
            canvas: 1,
            cite: 1,
            code: 1,
            command: 1,
            datalist: 1,
            del: 1,
            dfn: 1,
            em: 1,
            embed: 1,
            i: 1,
            iframe: 1,
            img: 1,
            input: 1,
            ins: 1,
            kbd: 1,
            keygen: 1,
            label: 1,
            map: 1,
            mark: 1,
            meter: 1,
            noscript: 1,
            object: 1,
            output: 1,
            progress: 1,
            q: 1,
            ruby: 1,
            s: 1,
            samp: 1,
            script: 1,
            select: 1,
            small: 1,
            span: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            textarea: 1,
            time: 1,
            u: 1,
            "var": 1,
            video: 1,
            wbr: 1
        }, i, {
            acronym: 1,
            applet: 1,
            basefont: 1,
            big: 1,
            font: 1,
            isindex: 1,
            strike: 1,
            style: 1,
            tt: 1
        });
        b(g, e, a, j);
        c = {
            a: c(a, {
                a: 1,
                button: 1
            }),
            abbr: a,
            address: g,
            area: f,
            article: b({
                style: 1
            }, g),
            aside: b({
                style: 1
            }, g),
            audio: b({
                source: 1,
                track: 1
            }, g),
            b: a,
            base: f,
            bdi: a,
            bdo: a,
            blockquote: g,
            body: g,
            br: f,
            button: c(a, {
                a: 1,
                button: 1
            }),
            canvas: a,
            caption: g,
            cite: a,
            code: a,
            col: f,
            colgroup: {
                col: 1
            },
            command: f,
            datalist: b({
                option: 1
            }, a),
            dd: g,
            del: a,
            details: b({
                summary: 1
            }, g),
            dfn: a,
            div: b({
                style: 1
            }, g),
            dl: {
                dt: 1,
                dd: 1
            },
            dt: g,
            em: a,
            embed: f,
            fieldset: b({
                legend: 1
            }, g),
            figcaption: g,
            figure: b({
                figcaption: 1
            }, g),
            footer: g,
            form: g,
            h1: a,
            h2: a,
            h3: a,
            h4: a,
            h5: a,
            h6: a,
            head: b({
                title: 1,
                base: 1
            }, d),
            header: g,
            hgroup: {
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1
            },
            hr: f,
            html: b({
                head: 1,
                body: 1
            }, g, d),
            i: a,
            iframe: i,
            img: f,
            input: f,
            ins: a,
            kbd: a,
            keygen: f,
            label: a,
            legend: a,
            li: g,
            link: f,
            map: g,
            mark: a,
            menu: b({
                li: 1
            }, g),
            meta: f,
            meter: c(a, {
                meter: 1
            }),
            nav: g,
            noscript: b({
                link: 1,
                meta: 1,
                style: 1
            }, a),
            object: b({
                param: 1
            }, a),
            ol: {
                li: 1
            },
            optgroup: {
                option: 1
            },
            option: i,
            output: a,
            p: a,
            param: f,
            pre: a,
            progress: c(a, {
                progress: 1
            }),
            q: a,
            rp: a,
            rt: a,
            ruby: b({
                rp: 1,
                rt: 1
            }, a),
            s: a,
            samp: a,
            script: i,
            section: b({
                style: 1
            }, g),
            select: {
                optgroup: 1,
                option: 1
            },
            small: a,
            source: f,
            span: a,
            strong: a,
            style: i,
            sub: a,
            summary: a,
            sup: a,
            table: {
                caption: 1,
                colgroup: 1,
                thead: 1,
                tfoot: 1,
                tbody: 1,
                tr: 1
            },
            tbody: {
                tr: 1
            },
            td: g,
            textarea: i,
            tfoot: {
                tr: 1
            },
            th: g,
            thead: {
                tr: 1
            },
            time: c(a, {
                time: 1
            }),
            title: i,
            tr: {
                th: 1,
                td: 1
            },
            track: f,
            u: a,
            ul: {
                li: 1
            },
            "var": a,
            video: b({
                source: 1,
                track: 1
            }, g),
            wbr: f,
            acronym: a,
            applet: b({
                param: 1
            }, g),
            basefont: f,
            big: a,
            center: g,
            dialog: f,
            dir: {
                li: 1
            },
            font: a,
            isindex: f,
            noframes: g,
            strike: a,
            tt: a
        };
        b(c, {
            $block: b({
                audio: 1,
                dd: 1,
                dt: 1,
                li: 1,
                video: 1
            }, e, j),
            $blockLimit: {
                article: 1,
                aside: 1,
                audio: 1,
                body: 1,
                caption: 1,
                details: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figure: 1,
                footer: 1,
                form: 1,
                header: 1,
                hgroup: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                section: 1,
                table: 1,
                td: 1,
                th: 1,
                tr: 1,
                ul: 1,
                video: 1
            },
            $cdata: {
                script: 1,
                style: 1
            },
            $editable: {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                body: 1,
                details: 1,
                div: 1,
                fieldset: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                nav: 1,
                p: 1,
                pre: 1,
                section: 1
            },
            $empty: {
                area: 1,
                base: 1,
                basefont: 1,
                br: 1,
                col: 1,
                command: 1,
                dialog: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                isindex: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                track: 1,
                wbr: 1
            },
            $inline: a,
            $list: {
                dl: 1,
                ol: 1,
                ul: 1
            },
            $listItem: {
                dd: 1,
                dt: 1,
                li: 1
            },
            $nonBodyContent: b({
                body: 1,
                head: 1,
                html: 1
            }, c.head),
            $nonEditable: {
                applet: 1,
                audio: 1,
                button: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                option: 1,
                param: 1,
                script: 1,
                textarea: 1,
                video: 1
            },
            $object: {
                applet: 1,
                audio: 1,
                button: 1,
                hr: 1,
                iframe: 1,
                img: 1,
                input: 1,
                object: 1,
                select: 1,
                table: 1,
                textarea: 1,
                video: 1
            },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                mark: 1,
                meter: 1,
                output: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                time: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            $tabIndex: {
                a: 1,
                area: 1,
                button: 1,
                input: 1,
                object: 1,
                select: 1,
                textarea: 1
            },
            $tableContent: {
                caption: 1,
                col: 1,
                colgroup: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            },
            $transparent: {
                a: 1,
                audio: 1,
                canvas: 1,
                del: 1,
                ins: 1,
                map: 1,
                noscript: 1,
                object: 1,
                video: 1
            },
            $intermediate: {
                caption: 1,
                colgroup: 1,
                dd: 1,
                dt: 1,
                figcaption: 1,
                legend: 1,
                li: 1,
                optgroup: 1,
                option: 1,
                rp: 1,
                rt: 1,
                summary: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            }
        });
        return c
    }();
    CKEDITOR.dom.event = function (b) {
        this.$ = b
    };
    CKEDITOR.dom.event.prototype = {
        getKey: function () {
            return this.$.keyCode || this.$.which
        },
        getKeystroke: function () {
            var b = this.getKey();
            if (this.$.ctrlKey || this.$.metaKey) b = b + CKEDITOR.CTRL;
            this.$.shiftKey && (b = b + CKEDITOR.SHIFT);
            this.$.altKey && (b = b + CKEDITOR.ALT);
            return b
        },
        preventDefault: function (b) {
            var c = this.$;
            c.preventDefault ? c.preventDefault() : c.returnValue = false;
            b && this.stopPropagation()
        },
        stopPropagation: function () {
            var b = this.$;
            b.stopPropagation ? b.stopPropagation() : b.cancelBubble = true
        },
        getTarget: function () {
            var b =
                this.$.target || this.$.srcElement;
            return b ? new CKEDITOR.dom.node(b) : null
        },
        getPhase: function () {
            return this.$.eventPhase || 2
        },
        getPageOffset: function () {
            var b = this.getTarget().getDocument().$;
            return {
                x: this.$.pageX || this.$.clientX + (b.documentElement.scrollLeft || b.body.scrollLeft),
                y: this.$.pageY || this.$.clientY + (b.documentElement.scrollTop || b.body.scrollTop)
            }
        }
    };
    CKEDITOR.CTRL = 1114112;
    CKEDITOR.SHIFT = 2228224;
    CKEDITOR.ALT = 4456448;
    CKEDITOR.EVENT_PHASE_CAPTURING = 1;
    CKEDITOR.EVENT_PHASE_AT_TARGET = 2;
    CKEDITOR.EVENT_PHASE_BUBBLING = 3;
    CKEDITOR.dom.domObject = function (b) {
        if (b) this.$ = b
    };
    CKEDITOR.dom.domObject.prototype = function () {
        var b = function (b, a) {
            return function (g) {
                typeof CKEDITOR != "undefined" && b.fire(a, new CKEDITOR.dom.event(g))
            }
        };
        return {
            getPrivate: function () {
                var b;
                if (!(b = this.getCustomData("_"))) this.setCustomData("_", b = {});
                return b
            },
            on: function (c) {
                var a = this.getCustomData("_cke_nativeListeners");
                if (!a) {
                    a = {};
                    this.setCustomData("_cke_nativeListeners", a)
                }
                if (!a[c]) {
                    a = a[c] = b(this, c);
                    this.$.addEventListener ? this.$.addEventListener(c, a, !! CKEDITOR.event.useCapture) : this.$.attachEvent &&
                        this.$.attachEvent("on" + c, a)
                }
                return CKEDITOR.event.prototype.on.apply(this, arguments)
            },
            removeListener: function (b) {
                CKEDITOR.event.prototype.removeListener.apply(this, arguments);
                if (!this.hasListeners(b)) {
                    var a = this.getCustomData("_cke_nativeListeners"),
                        g = a && a[b];
                    if (g) {
                        this.$.removeEventListener ? this.$.removeEventListener(b, g, false) : this.$.detachEvent && this.$.detachEvent("on" + b, g);
                        delete a[b]
                    }
                }
            },
            removeAllListeners: function () {
                var b = this.getCustomData("_cke_nativeListeners"),
                    a;
                for (a in b) {
                    var g = b[a];
                    this.$.detachEvent ?
                        this.$.detachEvent("on" + a, g) : this.$.removeEventListener && this.$.removeEventListener(a, g, false);
                    delete b[a]
                }
            }
        }
    }();
    (function (b) {
        var c = {};
        CKEDITOR.on("reset", function () {
            c = {}
        });
        b.equals = function (a) {
            try {
                return a && a.$ === this.$
            } catch (b) {
                return false
            }
        };
        b.setCustomData = function (a, b) {
            var e = this.getUniqueId();
            (c[e] || (c[e] = {}))[a] = b;
            return this
        };
        b.getCustomData = function (a) {
            var b = this.$["data-cke-expando"];
            return (b = b && c[b]) && a in b ? b[a] : null
        };
        b.removeCustomData = function (a) {
            var b = this.$["data-cke-expando"],
                b = b && c[b],
                e, d;
            if (b) {
                e = b[a];
                d = a in b;
                delete b[a]
            }
            return d ? e : null
        };
        b.clearCustomData = function () {
            this.removeAllListeners();
            var a = this.$["data-cke-expando"];
            a && delete c[a]
        };
        b.getUniqueId = function () {
            return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
        };
        CKEDITOR.event.implementOn(b)
    })(CKEDITOR.dom.domObject.prototype);
    CKEDITOR.dom.node = function (b) {
        return b ? new CKEDITOR.dom[b.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : b.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : b.nodeType == CKEDITOR.NODE_TEXT ? "text" : b.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](b) : this
    };
    CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.NODE_ELEMENT = 1;
    CKEDITOR.NODE_DOCUMENT = 9;
    CKEDITOR.NODE_TEXT = 3;
    CKEDITOR.NODE_COMMENT = 8;
    CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11;
    CKEDITOR.POSITION_IDENTICAL = 0;
    CKEDITOR.POSITION_DISCONNECTED = 1;
    CKEDITOR.POSITION_FOLLOWING = 2;
    CKEDITOR.POSITION_PRECEDING = 4;
    CKEDITOR.POSITION_IS_CONTAINED = 8;
    CKEDITOR.POSITION_CONTAINS = 16;
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function (b, c) {
            b.append(this, c);
            return b
        },
        clone: function (b, c) {
            var a = this.$.cloneNode(b),
                g = function (a) {
                    a["data-cke-expando"] && (a["data-cke-expando"] = false);
                    if (a.nodeType == CKEDITOR.NODE_ELEMENT) {
                        c || a.removeAttribute("id", false);
                        if (b) for (var a = a.childNodes, d = 0; d < a.length; d++) g(a[d])
                    }
                };
            g(a);
            return new CKEDITOR.dom.node(a)
        },
        hasPrevious: function () {
            return !!this.$.previousSibling
        },
        hasNext: function () {
            return !!this.$.nextSibling
        },
        insertAfter: function (b) {
            b.$.parentNode.insertBefore(this.$,
            b.$.nextSibling);
            return b
        },
        insertBefore: function (b) {
            b.$.parentNode.insertBefore(this.$, b.$);
            return b
        },
        insertBeforeMe: function (b) {
            this.$.parentNode.insertBefore(b.$, this.$);
            return b
        },
        getAddress: function (b) {
            for (var c = [], a = this.getDocument().$.documentElement, g = this.$; g && g != a;) {
                var e = g.parentNode;
                e && c.unshift(this.getIndex.call({
                    $: g
                }, b));
                g = e
            }
            return c
        },
        getDocument: function () {
            return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
        },
        getIndex: function (b) {
            var c = this.$,
                a = -1,
                g;
            if (!this.$.parentNode) return a;
            do if (!b || !(c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (g || !c.nodeValue))) {
                    a++;
                    g = c.nodeType == CKEDITOR.NODE_TEXT
                }
            while (c = c.previousSibling);
            return a
        },
        getNextSourceNode: function (b, c, a) {
            if (a && !a.call) var g = a,
            a = function (a) {
                return !a.equals(g)
            };
            var b = !b && this.getFirst && this.getFirst(),
                e;
            if (!b) {
                if (this.type == CKEDITOR.NODE_ELEMENT && a && a(this, true) === false) return null;
                b = this.getNext()
            }
            for (; !b && (e = (e || this).getParent());) {
                if (a && a(e, true) === false) return null;
                b = e.getNext()
            }
            return !b ||
                a && a(b) === false ? null : c && c != b.type ? b.getNextSourceNode(false, c, a) : b
        },
        getPreviousSourceNode: function (b, c, a) {
            if (a && !a.call) var g = a,
            a = function (a) {
                return !a.equals(g)
            };
            var b = !b && this.getLast && this.getLast(),
                e;
            if (!b) {
                if (this.type == CKEDITOR.NODE_ELEMENT && a && a(this, true) === false) return null;
                b = this.getPrevious()
            }
            for (; !b && (e = (e || this).getParent());) {
                if (a && a(e, true) === false) return null;
                b = e.getPrevious()
            }
            return !b || a && a(b) === false ? null : c && b.type != c ? b.getPreviousSourceNode(false, c, a) : b
        },
        getPrevious: function (b) {
            var c =
                this.$,
                a;
            do a = (c = c.previousSibling) && c.nodeType != 10 && new CKEDITOR.dom.node(c); while (a && b && !b(a));
            return a
        },
        getNext: function (b) {
            var c = this.$,
                a;
            do a = (c = c.nextSibling) && new CKEDITOR.dom.node(c); while (a && b && !b(a));
            return a
        },
        getParent: function (b) {
            var c = this.$.parentNode;
            return c && (c.nodeType == CKEDITOR.NODE_ELEMENT || b && c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(c) : null
        },
        getParents: function (b) {
            var c = this,
                a = [];
            do a[b ? "push" : "unshift"](c); while (c = c.getParent());
            return a
        },
        getCommonAncestor: function (b) {
            if (b.equals(this)) return this;
            if (b.contains && b.contains(this)) return b;
            var c = this.contains ? this : this.getParent();
            do if (c.contains(b)) return c;
            while (c = c.getParent());
            return null
        },
        getPosition: function (b) {
            var c = this.$,
                a = b.$;
            if (c.compareDocumentPosition) return c.compareDocumentPosition(a);
            if (c == a) return CKEDITOR.POSITION_IDENTICAL;
            if (this.type == CKEDITOR.NODE_ELEMENT && b.type == CKEDITOR.NODE_ELEMENT) {
                if (c.contains) {
                    if (c.contains(a)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                    if (a.contains(c)) return CKEDITOR.POSITION_IS_CONTAINED +
                            CKEDITOR.POSITION_FOLLOWING
                }
                if ("sourceIndex" in c) return c.sourceIndex < 0 || a.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : c.sourceIndex < a.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
            }
            for (var c = this.getAddress(), b = b.getAddress(), a = Math.min(c.length, b.length), g = 0; g <= a - 1; g++) if (c[g] != b[g]) {
                    if (g < a) return c[g] < b[g] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                    break
                }
            return c.length < b.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED +
                CKEDITOR.POSITION_FOLLOWING
        },
        getAscendant: function (b, c) {
            var a = this.$,
                g;
            if (!c) a = a.parentNode;
            for (; a;) {
                if (a.nodeName && (g = a.nodeName.toLowerCase(), typeof b == "string" ? g == b : g in b)) return new CKEDITOR.dom.node(a);
                try {
                    a = a.parentNode
                } catch (e) {
                    a = null
                }
            }
            return null
        },
        hasAscendant: function (b, c) {
            var a = this.$;
            if (!c) a = a.parentNode;
            for (; a;) {
                if (a.nodeName && a.nodeName.toLowerCase() == b) return true;
                a = a.parentNode
            }
            return false
        },
        move: function (b, c) {
            b.append(this.remove(), c)
        },
        remove: function (b) {
            var c = this.$,
                a = c.parentNode;
            if (a) {
                if (b) for (; b = c.firstChild;) a.insertBefore(c.removeChild(b), c);
                a.removeChild(c)
            }
            return this
        },
        replace: function (b) {
            this.insertBefore(b);
            b.remove()
        },
        trim: function () {
            this.ltrim();
            this.rtrim()
        },
        ltrim: function () {
            for (var b; this.getFirst && (b = this.getFirst());) {
                if (b.type == CKEDITOR.NODE_TEXT) {
                    var c = CKEDITOR.tools.ltrim(b.getText()),
                        a = b.getLength();
                    if (c) {
                        if (c.length < a) {
                            b.split(a - c.length);
                            this.$.removeChild(this.$.firstChild)
                        }
                    } else {
                        b.remove();
                        continue
                    }
                }
                break
            }
        },
        rtrim: function () {
            for (var b; this.getLast && (b =
                this.getLast());) {
                if (b.type == CKEDITOR.NODE_TEXT) {
                    var c = CKEDITOR.tools.rtrim(b.getText()),
                        a = b.getLength();
                    if (c) {
                        if (c.length < a) {
                            b.split(c.length);
                            this.$.lastChild.parentNode.removeChild(this.$.lastChild)
                        }
                    } else {
                        b.remove();
                        continue
                    }
                }
                break
            }
            if (!CKEDITOR.env.ie && !CKEDITOR.env.opera)(b = this.$.lastChild) && (b.type == 1 && b.nodeName.toLowerCase() == "br") && b.parentNode.removeChild(b)
        },
        isReadOnly: function () {
            var b = this;
            this.type != CKEDITOR.NODE_ELEMENT && (b = this.getParent());
            if (b && typeof b.$.isContentEditable != "undefined") return !(b.$.isContentEditable ||
                    b.data("cke-editable"));
            for (; b;) {
                if (b.data("cke-editable")) break;
                if (b.getAttribute("contentEditable") == "false") return true;
                if (b.getAttribute("contentEditable") == "true") break;
                b = b.getParent()
            }
            return !b
        }
    });
    CKEDITOR.dom.window = function (b) {
        CKEDITOR.dom.domObject.call(this, b)
    };
    CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function () {
            this.$.focus()
        },
        getViewPaneSize: function () {
            var b = this.$.document,
                c = b.compatMode == "CSS1Compat";
            return {
                width: (c ? b.documentElement.clientWidth : b.body.clientWidth) || 0,
                height: (c ? b.documentElement.clientHeight : b.body.clientHeight) || 0
            }
        },
        getScrollPosition: function () {
            var b = this.$;
            if ("pageXOffset" in b) return {
                    x: b.pageXOffset || 0,
                    y: b.pageYOffset || 0
            };
            b = b.document;
            return {
                x: b.documentElement.scrollLeft || b.body.scrollLeft || 0,
                y: b.documentElement.scrollTop || b.body.scrollTop || 0
            }
        },
        getFrame: function () {
            var b = this.$.frameElement;
            return b ? new CKEDITOR.dom.element.get(b) : null
        }
    });
    CKEDITOR.dom.document = function (b) {
        CKEDITOR.dom.domObject.call(this, b)
    };
    CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject;
    CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT,
        appendStyleSheet: function (b) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(b);
            else {
                var c = new CKEDITOR.dom.element("link");
                c.setAttributes({
                    rel: "stylesheet",
                    type: "text/css",
                    href: b
                });
                this.getHead().append(c)
            }
        },
        appendStyleText: function (b) {
            if (this.$.createStyleSheet) {
                var c = this.$.createStyleSheet("");
                c.cssText = b
            } else {
                var a = new CKEDITOR.dom.element("style", this);
                a.append(new CKEDITOR.dom.text(b, this));
                this.getHead().append(a)
            }
            return c ||
                a.$.sheet
        },
        createElement: function (b, c) {
            var a = new CKEDITOR.dom.element(b, this);
            if (c) {
                c.attributes && a.setAttributes(c.attributes);
                c.styles && a.setStyles(c.styles)
            }
            return a
        },
        createText: function (b) {
            return new CKEDITOR.dom.text(b, this)
        },
        focus: function () {
            this.getWindow().focus()
        },
        getActive: function () {
            return new CKEDITOR.dom.element(this.$.activeElement)
        },
        getById: function (b) {
            return (b = this.$.getElementById(b)) ? new CKEDITOR.dom.element(b) : null
        },
        getByAddress: function (b, c) {
            for (var a = this.$.documentElement, g =
                    0; a && g < b.length; g++) {
                var e = b[g];
                if (c) for (var d = -1, f = 0; f < a.childNodes.length; f++) {
                        var i = a.childNodes[f];
                        if (!(c === true && i.nodeType == 3 && i.previousSibling && i.previousSibling.nodeType == 3)) {
                            d++;
                            if (d == e) {
                                a = i;
                                break
                            }
                        }
                } else a = a.childNodes[e]
            }
            return a ? new CKEDITOR.dom.node(a) : null
        },
        getElementsByTag: function (b, c) {
            if ((!CKEDITOR.env.ie || document.documentMode > 8) && c) b = c + ":" + b;
            return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(b))
        },
        getHead: function () {
            var b = this.$.getElementsByTagName("head")[0];
            return b =
                b ? new CKEDITOR.dom.element(b) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), true)
        },
        getBody: function () {
            return new CKEDITOR.dom.element(this.$.body)
        },
        getDocumentElement: function () {
            return new CKEDITOR.dom.element(this.$.documentElement)
        },
        getWindow: function () {
            var b = new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView);
            return (this.getWindow = function () {
                return b
            })()
        },
        write: function (b) {
            this.$.open("text/html", "replace");
            CKEDITOR.env.isCustomDomain() && (this.$.domain = document.domain);
            this.$.write(b);
            this.$.close()
        }
    });
    CKEDITOR.dom.nodeList = function (b) {
        this.$ = b
    };
    CKEDITOR.dom.nodeList.prototype = {
        count: function () {
            return this.$.length
        },
        getItem: function (b) {
            if (b < 0 || b >= this.$.length) return null;
            return (b = this.$[b]) ? new CKEDITOR.dom.node(b) : null
        }
    };
    CKEDITOR.dom.element = function (b, c) {
        typeof b == "string" && (b = (c ? c.$ : document).createElement(b));
        CKEDITOR.dom.domObject.call(this, b)
    };
    CKEDITOR.dom.element.get = function (b) {
        return (b = typeof b == "string" ? document.getElementById(b) || document.getElementsByName(b)[0] : b) && (b.$ ? b : new CKEDITOR.dom.element(b))
    };
    CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node;
    CKEDITOR.dom.element.createFromHtml = function (b, c) {
        var a = new CKEDITOR.dom.element("div", c);
        a.setHtml(b);
        return a.getFirst().remove()
    };
    CKEDITOR.dom.element.setMarker = function (b, c, a, g) {
        var e = c.getCustomData("list_marker_id") || c.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
            d = c.getCustomData("list_marker_names") || c.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        b[e] = c;
        d[a] = 1;
        return c.setCustomData(a, g)
    };
    CKEDITOR.dom.element.clearAllMarkers = function (b) {
        for (var c in b) CKEDITOR.dom.element.clearMarkers(b, b[c], 1)
    };
    CKEDITOR.dom.element.clearMarkers = function (b, c, a) {
        var g = c.getCustomData("list_marker_names"),
            e = c.getCustomData("list_marker_id"),
            d;
        for (d in g) c.removeCustomData(d);
        c.removeCustomData("list_marker_names");
        if (a) {
            c.removeCustomData("list_marker_id");
            delete b[e]
        }
    };
    (function () {
        function b(a) {
            for (var b = 0, e = 0, d = c[a].length; e < d; e++) b = b + (parseInt(this.getComputedStyle(c[a][e]) || 0, 10) || 0);
            return b
        }
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT,
            addClass: function (a) {
                var b = this.$.className;
                b && (RegExp("(?:^|\\s)" + a + "(?:\\s|$)", "").test(b) || (b = b + (" " + a)));
                this.$.className = b || a
            },
            removeClass: function (a) {
                var b = this.getAttribute("class");
                if (b) {
                    a = RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "i");
                    if (a.test(b))(b = b.replace(a, "").replace(/^\s+/, "")) ? this.setAttribute("class",
                        b) : this.removeAttribute("class")
                }
                return this
            },
            hasClass: function (a) {
                return RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "").test(this.getAttribute("class"))
            },
            append: function (a, b) {
                typeof a == "string" && (a = this.getDocument().createElement(a));
                b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
                return a
            },
            appendHtml: function (a) {
                if (this.$.childNodes.length) {
                    var b = new CKEDITOR.dom.element("div", this.getDocument());
                    b.setHtml(a);
                    b.moveChildren(this)
                } else this.setHtml(a)
            },
            appendText: function (a) {
                this.$.text !=
                    void 0 ? this.$.text = this.$.text + a : this.append(new CKEDITOR.dom.text(a))
            },
            appendBogus: function () {
                for (var a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
                if (!a || !a.is || !a.is("br")) {
                    a = CKEDITOR.env.opera ? this.getDocument().createText("") : this.getDocument().createElement("br");
                    CKEDITOR.env.gecko && a.setAttribute("type", "_moz");
                    this.append(a)
                }
            },
            breakParent: function (a) {
                var b = new CKEDITOR.dom.range(this.getDocument());
                b.setStartAfter(this);
                b.setEndAfter(a);
                a = b.extractContents();
                b.insertNode(this.remove());
                a.insertAfterNode(this)
            },
            contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (a) {
                var b = this.$;
                return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$)
            } : function (a) {
                return !!(this.$.compareDocumentPosition(a.$) & 16)
            },
            focus: function () {
                function a() {
                    try {
                        this.$.focus()
                    } catch (a) {}
                }
                return function (b) {
                    b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this)
                }
            }(),
            getHtml: function () {
                var a = this.$.innerHTML;
                return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g,
                    "") : a
            },
            getOuterHtml: function () {
                if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var a = this.$.ownerDocument.createElement("div");
                a.appendChild(this.$.cloneNode(true));
                return a.innerHTML
            },
            getClientRect: function () {
                var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                !a.width && (a.width = a.right - a.left);
                !a.height && (a.height = a.bottom - a.top);
                return a
            },
            setHtml: function () {
                var a = function (a) {
                    return this.$.innerHTML = a
                };
                return CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function (a) {
                    try {
                        return this.$.innerHTML =
                            a
                    } catch (b) {
                        this.$.innerHTML = "";
                        var c = new CKEDITOR.dom.element("body", this.getDocument());
                        c.$.innerHTML = a;
                        for (c = c.getChildren(); c.count();) this.append(c.getItem(0));
                        return a
                    }
                } : a
            }(),
            setText: function (a) {
                CKEDITOR.dom.element.prototype.setText = this.$.innerText != void 0 ? function (a) {
                    return this.$.innerText = a
                } : function (a) {
                    return this.$.textContent = a
                };
                return this.setText(a)
            },
            getAttribute: function () {
                var a = function (a) {
                    return this.$.getAttribute(a, 2)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function (a) {
                    switch (a) {
                        case "class":
                            a = "className";
                            break;
                        case "http-equiv":
                            a = "httpEquiv";
                            break;
                        case "name":
                            return this.$.name;
                        case "tabindex":
                            a = this.$.getAttribute(a, 2);
                            a !== 0 && this.$.tabIndex === 0 && (a = null);
                            return a;
                        case "checked":
                            a = this.$.attributes.getNamedItem(a);
                            return (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
                        case "hspace":
                        case "value":
                            return this.$[a];
                        case "style":
                            return this.$.style.cssText;
                        case "contenteditable":
                        case "contentEditable":
                            return this.$.attributes.getNamedItem("contentEditable").specified ?
                                this.$.getAttribute("contentEditable") : null
                    }
                    return this.$.getAttribute(a, 2)
                } : a
            }(),
            getChildren: function () {
                return new CKEDITOR.dom.nodeList(this.$.childNodes)
            },
            getComputedStyle: CKEDITOR.env.ie ? function (a) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]
            } : function (a) {
                var b = this.getWindow().$.getComputedStyle(this.$, null);
                return b ? b.getPropertyValue(a) : ""
            },
            getDtd: function () {
                var a = CKEDITOR.dtd[this.getName()];
                this.getDtd = function () {
                    return a
                };
                return a
            },
            getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: CKEDITOR.env.ie ? function () {
                var a = this.$.tabIndex;
                a === 0 && (!CKEDITOR.dtd.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"), 10) !== 0) && (a = -1);
                return a
            } : CKEDITOR.env.webkit ? function () {
                var a = this.$.tabIndex;
                if (a == void 0) {
                    a = parseInt(this.getAttribute("tabindex"), 10);
                    isNaN(a) && (a = -1)
                }
                return a
            } : function () {
                return this.$.tabIndex
            },
            getText: function () {
                return this.$.textContent || this.$.innerText || ""
            },
            getWindow: function () {
                return this.getDocument().getWindow()
            },
            getId: function () {
                return this.$.id ||
                    null
            },
            getNameAtt: function () {
                return this.$.name || null
            },
            getName: function () {
                var a = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && !(document.documentMode > 8)) {
                    var b = this.$.scopeName;
                    b != "HTML" && (a = b.toLowerCase() + ":" + a)
                }
                return (this.getName = function () {
                    return a
                })()
            },
            getValue: function () {
                return this.$.value
            },
            getFirst: function (a) {
                var b = this.$.firstChild;
                (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getNext(a));
                return b
            },
            getLast: function (a) {
                var b = this.$.lastChild;
                (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) &&
                    (b = b.getPrevious(a));
                return b
            },
            getStyle: function (a) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]
            },
            is: function () {
                var a = this.getName();
                if (typeof arguments[0] == "object") return !!arguments[0][a];
                for (var b = 0; b < arguments.length; b++) if (arguments[b] == a) return true;
                return false
            },
            isEditable: function (a) {
                var b = this.getName();
                if (this.isReadOnly() || this.getComputedStyle("display") == "none" || this.getComputedStyle("visibility") == "hidden" || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") &&
                    (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount()) return false;
                if (a !== false) {
                    a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span;
                    return !(!a || !a["#"])
                }
                return true
            },
            isIdentical: function (a) {
                var b = this.clone(0, 1),
                    a = a.clone(0, 1);
                b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                if (b.$.isEqualNode) {
                    b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText);
                    a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText);
                    return b.$.isEqualNode(a.$)
                }
                b = b.getOuterHtml();
                a = a.getOuterHtml();
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                    var c = this.getParent();
                    if (c.type == CKEDITOR.NODE_ELEMENT) {
                        c = c.clone();
                        c.setHtml(b);
                        b = c.getHtml();
                        c.setHtml(a);
                        a = c.getHtml()
                    }
                }
                return b == a
            },
            isVisible: function () {
                var a = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle("visibility") != "hidden",
                    b, c;
                if (a && (CKEDITOR.env.webkit || CKEDITOR.env.opera)) {
                    b =
                        this.getWindow();
                    if (!b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement)) a = (new CKEDITOR.dom.element(c)).isVisible()
                }
                return !!a
            },
            isEmptyInlineRemoveable: function () {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return false;
                for (var a = this.getChildren(), b = 0, c = a.count(); b < c; b++) {
                    var d = a.getItem(b);
                    if (!(d.type == CKEDITOR.NODE_ELEMENT && d.data("cke-bookmark")) && (d.type == CKEDITOR.NODE_ELEMENT && !d.isEmptyInlineRemoveable() || d.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(d.getText()))) return false
                }
                return true
            },
            hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function () {
                for (var a = this.$.attributes, b = 0; b < a.length; b++) {
                    var c = a[b];
                    switch (c.nodeName) {
                        case "class":
                            if (this.getAttribute("class")) return true;
                        case "data-cke-expando":
                            continue;
                        default:
                            if (c.specified) return true
                    }
                }
                return false
            } : function () {
                var a = this.$.attributes,
                    b = a.length,
                    c = {
                        "data-cke-expando": 1,
                        _moz_dirty: 1
                    };
                return b > 0 && (b > 2 || !c[a[0].nodeName] || b == 2 && !c[a[1].nodeName])
            },
            hasAttribute: function () {
                function a(a) {
                    a = this.$.attributes.getNamedItem(a);
                    return !(!a || !a.specified)
                }
                return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? function (b) {
                    return b == "name" ? !! this.$.name : a.call(this, b)
                } : a
            }(),
            hide: function () {
                this.setStyle("display", "none")
            },
            moveChildren: function (a, b) {
                var c = this.$,
                    a = a.$;
                if (c != a) {
                    var d;
                    if (b) for (; d = c.lastChild;) a.insertBefore(c.removeChild(d), a.firstChild);
                    else for (; d = c.firstChild;) a.appendChild(c.removeChild(d))
                }
            },
            mergeSiblings: function () {
                function a(a, b, c) {
                    if (b && b.type == CKEDITOR.NODE_ELEMENT) {
                        for (var f = []; b.data("cke-bookmark") || b.isEmptyInlineRemoveable();) {
                            f.push(b);
                            b = c ? b.getNext() : b.getPrevious();
                            if (!b || b.type != CKEDITOR.NODE_ELEMENT) return
                        }
                        if (a.isIdentical(b)) {
                            for (var i = c ? a.getLast() : a.getFirst(); f.length;) f.shift().move(a, !c);
                            b.moveChildren(a, !c);
                            b.remove();
                            i && i.type == CKEDITOR.NODE_ELEMENT && i.mergeSiblings()
                        }
                    }
                }
                return function (b) {
                    if (b === false || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) {
                        a(this, this.getNext(), true);
                        a(this, this.getPrevious())
                    }
                }
            }(),
            show: function () {
                this.setStyles({
                    display: "",
                    visibility: ""
                })
            },
            setAttribute: function () {
                var a = function (a,
                b) {
                    this.$.setAttribute(a, b);
                    return this
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function (b, c) {
                    b == "class" ? this.$.className = c : b == "style" ? this.$.style.cssText = c : b == "tabindex" ? this.$.tabIndex = c : b == "checked" ? this.$.checked = c : b == "contenteditable" ? a.call(this, "contentEditable", c) : a.apply(this, arguments);
                    return this
                } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (b, c) {
                    if (b == "src" && c.match(/^http:\/\//)) try {
                            a.apply(this, arguments)
                    } catch (d) {} else a.apply(this, arguments);
                    return this
                } : a
            }(),
            setAttributes: function (a) {
                for (var b in a) this.setAttribute(b, a[b]);
                return this
            },
            setValue: function (a) {
                this.$.value = a;
                return this
            },
            removeAttribute: function () {
                var a = function (a) {
                    this.$.removeAttribute(a)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function (a) {
                    a == "class" ? a = "className" : a == "tabindex" ? a = "tabIndex" : a == "contenteditable" && (a = "contentEditable");
                    this.$.removeAttribute(a)
                } : a
            }(),
            removeAttributes: function (a) {
                if (CKEDITOR.tools.isArray(a)) for (var b = 0; b <
                        a.length; b++) this.removeAttribute(a[b]);
                else for (b in a) a.hasOwnProperty(b) && this.removeAttribute(b)
            },
            removeStyle: function (a) {
                var b = this.$.style;
                if (!b.removeProperty && (a == "border" || a == "margin" || a == "padding")) {
                    var c = ["top", "left", "right", "bottom"],
                        d;
                    a == "border" && (d = ["color", "style", "width"]);
                    for (var b = [], f = 0; f < c.length; f++) if (d) for (var i = 0; i < d.length; i++) b.push([a, c[f], d[i]].join("-"));
                        else b.push([a, c[f]].join("-"));
                    for (a = 0; a < b.length; a++) this.removeStyle(b[a])
                } else {
                    b.removeProperty ? b.removeProperty(a) :
                        b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a));
                    this.$.style.cssText || this.removeAttribute("style")
                }
            },
            setStyle: function (a, b) {
                this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
                return this
            },
            setStyles: function (a) {
                for (var b in a) this.setStyle(b, a[b]);
                return this
            },
            setOpacity: function (a) {
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                    a = Math.round(a * 100);
                    this.setStyle("filter", a >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + a + ")")
                } else this.setStyle("opacity", a)
            },
            unselectable: function () {
                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select",
                    "none"));
                if (CKEDITOR.env.ie || CKEDITOR.env.opera) {
                    this.setAttribute("unselectable", "on");
                    for (var a, b = this.getElementsByTag("*"), c = 0, d = b.count(); c < d; c++) {
                        a = b.getItem(c);
                        a.setAttribute("unselectable", "on")
                    }
                }
            },
            getPositionedAncestor: function () {
                for (var a = this; a.getName() != "html";) {
                    if (a.getComputedStyle("position") != "static") return a;
                    a = a.getParent()
                }
                return null
            },
            getDocumentPosition: function (a) {
                var b = 0,
                    c = 0,
                    d = this.getDocument(),
                    f = d.getBody(),
                    i = d.$.compatMode == "BackCompat";
                if (document.documentElement.getBoundingClientRect) {
                    var j =
                        this.$.getBoundingClientRect(),
                        l = d.$.documentElement,
                        n = l.clientTop || f.$.clientTop || 0,
                        m = l.clientLeft || f.$.clientLeft || 0,
                        o = true;
                    if (CKEDITOR.env.ie) {
                        o = d.getDocumentElement().contains(this);
                        d = d.getBody().contains(this);
                        o = i && d || !i && o
                    }
                    if (o) {
                        b = j.left + (!i && l.scrollLeft || f.$.scrollLeft);
                        b = b - m;
                        c = j.top + (!i && l.scrollTop || f.$.scrollTop);
                        c = c - n
                    }
                } else {
                    f = this;
                    for (d = null; f && !(f.getName() == "body" || f.getName() == "html");) {
                        b = b + (f.$.offsetLeft - f.$.scrollLeft);
                        c = c + (f.$.offsetTop - f.$.scrollTop);
                        if (!f.equals(this)) {
                            b = b + (f.$.clientLeft ||
                                0);
                            c = c + (f.$.clientTop || 0)
                        }
                        for (; d && !d.equals(f);) {
                            b = b - d.$.scrollLeft;
                            c = c - d.$.scrollTop;
                            d = d.getParent()
                        }
                        d = f;
                        f = (j = f.$.offsetParent) ? new CKEDITOR.dom.element(j) : null
                    }
                }
                if (a) {
                    f = this.getWindow();
                    d = a.getWindow();
                    if (!f.equals(d) && f.$.frameElement) {
                        a = (new CKEDITOR.dom.element(f.$.frameElement)).getDocumentPosition(a);
                        b = b + a.x;
                        c = c + a.y
                    }
                }
                if (!document.documentElement.getBoundingClientRect && CKEDITOR.env.gecko && !i) {
                    b = b + (this.$.clientLeft ? 1 : 0);
                    c = c + (this.$.clientTop ? 1 : 0)
                }
                return {
                    x: b,
                    y: c
                }
            },
            scrollIntoView: function (a) {
                var b =
                    this.getParent();
                if (b) {
                    do {
                        (b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1);
                        if (b.is("html")) {
                            var c = b.getWindow();
                            try {
                                var d = c.$.frameElement;
                                d && (b = new CKEDITOR.dom.element(d))
                            } catch (f) {}
                        }
                    } while (b = b.getParent())
                }
            },
            scrollIntoParent: function (a, b, c) {
                var d, f, i, j;

                function l(b, m) {
                    if (/body|html/.test(a.getName())) a.getWindow().$.scrollBy(b, m);
                    else {
                        a.$.scrollLeft = a.$.scrollLeft + b;
                        a.$.scrollTop = a.$.scrollTop + m
                    }
                }

                function n(a, b) {
                    var m = {
                        x: 0,
                        y: 0
                    };
                    if (!a.is(o ? "body" : "html")) {
                        var c = a.$.getBoundingClientRect();
                        m.x = c.left;
                        m.y = c.top
                    }
                    c = a.getWindow();
                    if (!c.equals(b)) {
                        c = n(CKEDITOR.dom.element.get(c.$.frameElement), b);
                        m.x = m.x + c.x;
                        m.y = m.y + c.y
                    }
                    return m
                }
                function m(a, b) {
                    return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0
                }!a && (a = this.getWindow());
                i = a.getDocument();
                var o = i.$.compatMode == "BackCompat";
                a instanceof CKEDITOR.dom.window && (a = o ? i.getBody() : i.getDocumentElement());
                i = a.getWindow();
                f = n(this, i);
                var k = n(a, i),
                    h = this.$.offsetHeight;
                d = this.$.offsetWidth;
                var s = a.$.clientHeight,
                    w = a.$.clientWidth;
                i = f.x - m(this, "left") - k.x || 0;
                j = f.y - m(this, "top") - k.y || 0;
                d = f.x + d + m(this, "right") - (k.x + w) || 0;
                f = f.y + h + m(this, "bottom") - (k.y + s) || 0;
                if (j < 0 || f > 0) l(0, b === true ? j : b === false ? f : j < 0 ? j : f);
                if (c && (i < 0 || d > 0)) l(i < 0 ? i : d, 0)
            },
            setState: function (a, b, c) {
                b = b || "cke";
                switch (a) {
                    case CKEDITOR.TRISTATE_ON:
                        this.addClass(b + "_on");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_disabled");
                        c && this.setAttribute("aria-pressed", true);
                        c && this.removeAttribute("aria-disabled");
                        break;
                    case CKEDITOR.TRISTATE_DISABLED:
                        this.addClass(b + "_disabled");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_on");
                        c && this.setAttribute("aria-disabled", true);
                        c && this.removeAttribute("aria-pressed");
                        break;
                    default:
                        this.addClass(b + "_off");
                        this.removeClass(b + "_on");
                        this.removeClass(b + "_disabled");
                        c && this.removeAttribute("aria-pressed");
                        c && this.removeAttribute("aria-disabled")
                }
            },
            getFrameDocument: function () {
                var a = this.$;
                try {
                    a.contentWindow.document
                } catch (b) {
                    a.src = a.src
                }
                return a && new CKEDITOR.dom.document(a.contentWindow.document)
            },
            copyAttributes: function (a, b) {
                for (var c = this.$.attributes, b = b || {}, d = 0; d < c.length; d++) {
                    var f = c[d],
                        i = f.nodeName.toLowerCase(),
                        j;
                    if (!(i in b)) if (i == "checked" && (j = this.getAttribute(i))) a.setAttribute(i, j);
                        else if (f.specified || CKEDITOR.env.ie && f.nodeValue && i == "value") {
                        j = this.getAttribute(i);
                        if (j === null) j = f.nodeValue;
                        a.setAttribute(i, j)
                    }
                }
                if (this.$.style.cssText !== "") a.$.style.cssText = this.$.style.cssText
            },
            renameNode: function (a) {
                if (this.getName() != a) {
                    var b = this.getDocument(),
                        a = new CKEDITOR.dom.element(a,
                        b);
                    this.copyAttributes(a);
                    this.moveChildren(a);
                    this.getParent() && this.$.parentNode.replaceChild(a.$, this.$);
                    a.$["data-cke-expando"] = this.$["data-cke-expando"];
                    this.$ = a.$
                }
            },
            getChild: function () {
                function a(a, b) {
                    var c = a.childNodes;
                    if (b >= 0 && b < c.length) return c[b]
                }
                return function (b) {
                    var c = this.$;
                    if (b.slice) for (; b.length > 0 && c;) c = a(c, b.shift());
                    else c = a(c, b);
                    return c ? new CKEDITOR.dom.node(c) : null
                }
            }(),
            getChildCount: function () {
                return this.$.childNodes.length
            },
            disableContextMenu: function () {
                this.on("contextmenu",

                function (a) {
                    a.data.getTarget().hasClass("cke_enable_context_menu") || a.data.preventDefault()
                })
            },
            getDirection: function (a) {
                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir")
            },
            data: function (a, b) {
                a = "data-" + a;
                if (b === void 0) return this.getAttribute(a);
                b === false ? this.removeAttribute(a) : this.setAttribute(a, b);
                return null
            },
            getEditor: function () {
                var a = CKEDITOR.instances,
                    b, c;
                for (b in a) {
                    c = a[b];
                    if (c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return c
                }
                return null
            }
        });
        var c = {
            width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
            height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
        };
        CKEDITOR.dom.element.prototype.setSize = function (a, c, e) {
            if (typeof c == "number") {
                if (e && (!CKEDITOR.env.ie || !CKEDITOR.env.quirks)) c = c - b.call(this, a);
                this.setStyle(a, c + "px")
            }
        };
        CKEDITOR.dom.element.prototype.getSize = function (a,
        c) {
            var e = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
            c && (e = e - b.call(this, a));
            return e
        }
    })();
    CKEDITOR.dom.documentFragment = function (b) {
        b = b || CKEDITOR.document;
        this.$ = b.type == CKEDITOR.NODE_DOCUMENT ? b.$.createDocumentFragment() : b
    };
    CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function (b) {
            b = b.$;
            b.parentNode.insertBefore(this.$, b.nextSibling)
        }
    }, !0, {
        append: 1,
        appendBogus: 1,
        getFirst: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    });
    (function () {
        function b(a, b) {
            var c = this.range;
            if (this._.end) return null;
            if (!this._.start) {
                this._.start = 1;
                if (c.collapsed) {
                    this.end();
                    return null
                }
                c.optimize()
            }
            var d, n = c.startContainer;
            d = c.endContainer;
            var m = c.startOffset,
                o = c.endOffset,
                k, h = this.guard,
                s = this.type,
                g = a ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!a && !this._.guardLTR) {
                var e = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
                    t = d.type == CKEDITOR.NODE_ELEMENT ? d.getChild(o) : d.getNext();
                this._.guardLTR = function (a, b) {
                    return (!b || !e.equals(a)) && (!t || !a.equals(t)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                }
            }
            if (a && !this._.guardRTL) {
                var F = n.type == CKEDITOR.NODE_ELEMENT ? n : n.getParent(),
                    z = n.type == CKEDITOR.NODE_ELEMENT ? m ? n.getChild(m - 1) : null : n.getPrevious();
                this._.guardRTL = function (a, b) {
                    return (!b || !F.equals(a)) && (!z || !a.equals(z)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
                }
            }
            var q = a ? this._.guardRTL : this._.guardLTR;
            k = h ? function (a, b) {
                return q(a, b) === false ? false : h(a, b)
            } : q;
            if (this.current) d = this.current[g](false, s, k);
            else {
                if (a) d.type ==
                        CKEDITOR.NODE_ELEMENT && (d = o > 0 ? d.getChild(o - 1) : k(d, true) === false ? null : d.getPreviousSourceNode(true, s, k));
                else {
                    d = n;
                    if (d.type == CKEDITOR.NODE_ELEMENT && !(d = d.getChild(m))) d = k(n, true) === false ? null : n.getNextSourceNode(true, s, k)
                }
                d && k(d) === false && (d = null)
            }
            for (; d && !this._.end;) {
                this.current = d;
                if (!this.evaluator || this.evaluator(d) !== false) {
                    if (!b) return d
                } else if (b && this.evaluator) return false;
                d = d[g](false, s, k)
            }
            this.end();
            return this.current = null
        }
        function c(a) {
            for (var c, d = null; c = b.call(this, a);) d = c;
            return d
        }
        CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function (a) {
                this.range = a;
                this._ = {}
            },
            proto: {
                end: function () {
                    this._.end = 1
                },
                next: function () {
                    return b.call(this)
                },
                previous: function () {
                    return b.call(this, 1)
                },
                checkForward: function () {
                    return b.call(this, 0, 1) !== false
                },
                checkBackward: function () {
                    return b.call(this, 1, 1) !== false
                },
                lastForward: function () {
                    return c.call(this)
                },
                lastBackward: function () {
                    return c.call(this, 1)
                },
                reset: function () {
                    delete this.current;
                    this._ = {}
                }
            }
        });
        var a = {
            block: 1,
            "list-item": 1,
            table: 1,
            "table-row-group": 1,
            "table-header-group": 1,
            "table-footer-group": 1,
            "table-row": 1,
            "table-column-group": 1,
            "table-column": 1,
            "table-cell": 1,
            "table-caption": 1
        };
        CKEDITOR.dom.element.prototype.isBlockBoundary = function (b) {
            b = b ? CKEDITOR.tools.extend({}, CKEDITOR.dtd.$block, b || {}) : CKEDITOR.dtd.$block;
            return this.getComputedStyle("float") == "none" && a[this.getComputedStyle("display")] || b[this.getName()]
        };
        CKEDITOR.dom.walker.blockBoundary = function (a) {
            return function (b) {
                return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
            }
        };
        CKEDITOR.dom.walker.listItemBoundary = function () {
            return this.blockBoundary({
                br: 1
            })
        };
        CKEDITOR.dom.walker.bookmark = function (a, b) {
            function c(a) {
                return a && a.getName && a.getName() == "span" && a.data("cke-bookmark")
            }
            return function (d) {
                var n, m;
                n = d && d.type != CKEDITOR.NODE_ELEMENT && (m = d.getParent()) && c(m);
                n = a ? n : n || c(d);
                return !!(b ^ n)
            }
        };
        CKEDITOR.dom.walker.whitespaces = function (a) {
            return function (b) {
                var c;
                b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == "​");
                return !!(a ^ c)
            }
        };
        CKEDITOR.dom.walker.invisible = function (a) {
            var b = CKEDITOR.dom.walker.whitespaces();
            return function (c) {
                if (b(c)) c = 1;
                else {
                    c.type == CKEDITOR.NODE_TEXT && (c = c.getParent());
                    c = !c.$.offsetHeight
                }
                return !!(a ^ c)
            }
        };
        CKEDITOR.dom.walker.nodeType = function (a, b) {
            return function (c) {
                return !!(b ^ c.type == a)
            }
        };
        CKEDITOR.dom.walker.bogus = function (a) {
            function b(a) {
                return !e(a) && !d(a)
            }
            return function (c) {
                var d = !CKEDITOR.env.ie ? c.is && c.is("br") : c.getText && g.test(c.getText());
                if (d) {
                    d = c.getParent();
                    c = c.getNext(b);
                    d = d.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT &&
                        c.isBlockBoundary())
                }
                return !!(a ^ d)
            }
        };
        var g = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            e = CKEDITOR.dom.walker.whitespaces(),
            d = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.dom.element.prototype.getBogus = function () {
            var a = this;
            do a = a.getPreviousSourceNode(); while (d(a) || e(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty));
            return a && (!CKEDITOR.env.ie ? a.is && a.is("br") : a.getText && g.test(a.getText())) ? a : false
        }
    })();
    CKEDITOR.dom.range = function (b) {
        this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
        this.collapsed = true;
        var c = b instanceof CKEDITOR.dom.document;
        this.document = c ? b : b.getDocument();
        this.root = c ? b.getBody() : b
    };
    (function () {
        function b() {
            var a = false,
                b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(true),
                k = CKEDITOR.dom.walker.bogus();
            return function (h) {
                if (c(h) || b(h)) return true;
                if (k(h) && !a) return a = true;
                return h.type == CKEDITOR.NODE_TEXT && (h.hasAscendant("pre") || CKEDITOR.tools.trim(h.getText()).length) || h.type == CKEDITOR.NODE_ELEMENT && !h.is(d) ? false : true
            }
        }
        function c(a) {
            var b = CKEDITOR.dom.walker.whitespaces(),
                c = CKEDITOR.dom.walker.bookmark(1);
            return function (k) {
                return c(k) || b(k) ? true : !a && f(k) ||
                    k.type == CKEDITOR.NODE_ELEMENT && k.is(CKEDITOR.dtd.$removeEmpty)
            }
        }
        function a(a) {
            return !i(a) && !j(a)
        }
        var g = function (a) {
            a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
        }, e = function (a, b, c, k) {
                a.optimizeBookmark();
                var h = a.startContainer,
                    d = a.endContainer,
                    g = a.startOffset,
                    e = a.endOffset,
                    f, i;
                if (d.type == CKEDITOR.NODE_TEXT) d = d.split(e);
                else if (d.getChildCount() > 0) if (e >= d.getChildCount()) {
                        d = d.append(a.document.createText(""));
                        i = true
                    } else d = d.getChild(e);
                if (h.type == CKEDITOR.NODE_TEXT) {
                    h.split(g);
                    h.equals(d) && (d = h.getNext())
                } else if (g) if (g >= h.getChildCount()) {
                        h = h.append(a.document.createText(""));
                        f = true
                    } else h = h.getChild(g).getPrevious();
                    else {
                        h = h.append(a.document.createText(""), 1);
                        f = true
                    }
                var g = h.getParents(),
                    e = d.getParents(),
                    j, q, p;
                for (j = 0; j < g.length; j++) {
                    q = g[j];
                    p = e[j];
                    if (!q.equals(p)) break
                }
                for (var l = c, r, C, y, u = j; u < g.length; u++) {
                    r = g[u];
                    l && !r.equals(h) && (C = l.append(r.clone()));
                    for (r = r.getNext(); r;) {
                        if (r.equals(e[u]) || r.equals(d)) break;
                        y = r.getNext();
                        if (b == 2) l.append(r.clone(true));
                        else {
                            r.remove();
                            b == 1 && l.append(r)
                        }
                        r = y
                    }
                    l && (l = C)
                }
                l = c;
                for (c = j; c < e.length; c++) {
                    r = e[c];
                    b > 0 && !r.equals(d) && (C = l.append(r.clone()));
                    if (!g[c] || r.$.parentNode != g[c].$.parentNode) for (r = r.getPrevious(); r;) {
                            if (r.equals(g[c]) || r.equals(h)) break;
                            y = r.getPrevious();
                            if (b == 2) l.$.insertBefore(r.$.cloneNode(true), l.$.firstChild);
                            else {
                                r.remove();
                                b == 1 && l.$.insertBefore(r.$, l.$.firstChild)
                            }
                            r = y
                    }
                    l && (l = C)
                }
                if (b == 2) {
                    q = a.startContainer;
                    if (q.type == CKEDITOR.NODE_TEXT) {
                        q.$.data = q.$.data + q.$.nextSibling.data;
                        q.$.parentNode.removeChild(q.$.nextSibling)
                    }
                    a = a.endContainer;
                    if (a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling) {
                        a.$.data = a.$.data + a.$.nextSibling.data;
                        a.$.parentNode.removeChild(a.$.nextSibling)
                    }
                } else {
                    if (q && p && (h.$.parentNode != q.$.parentNode || d.$.parentNode != p.$.parentNode)) {
                        b = p.getIndex();
                        f && p.$.parentNode == h.$.parentNode && b--;
                        if (k && q.type == CKEDITOR.NODE_ELEMENT) {
                            k = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document);
                            k.insertAfter(q);
                            q.mergeSiblings(false);
                            a.moveToBookmark({
                                startNode: k
                            })
                        } else a.setStart(p.getParent(), b)
                    }
                    a.collapse(true)
                }
                f && h.remove();
                i && d.$.parentNode && d.remove()
            }, d = {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                "var": 1
            }, f = CKEDITOR.dom.walker.bogus(),
            i = new CKEDITOR.dom.walker.whitespaces,
            j = new CKEDITOR.dom.walker.bookmark,
            l = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/;
        CKEDITOR.dom.range.prototype = {
            clone: function () {
                var a = new CKEDITOR.dom.range(this.root);
                a.startContainer = this.startContainer;
                a.startOffset = this.startOffset;
                a.endContainer = this.endContainer;
                a.endOffset = this.endOffset;
                a.collapsed = this.collapsed;
                return a
            },
            collapse: function (a) {
                if (a) {
                    this.endContainer = this.startContainer;
                    this.endOffset = this.startOffset
                } else {
                    this.startContainer = this.endContainer;
                    this.startOffset = this.endOffset
                }
                this.collapsed = true
            },
            cloneContents: function () {
                var a = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || e(this, 2, a);
                return a
            },
            deleteContents: function (a) {
                this.collapsed ||
                    e(this, 0, null, a)
            },
            extractContents: function (a) {
                var b = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || e(this, 1, b, a);
                return b
            },
            createBookmark: function (a) {
                var b, c, d, h, g = this.collapsed;
                b = this.document.createElement("span");
                b.data("cke-bookmark", 1);
                b.setStyle("display", "none");
                b.setHtml("&nbsp;");
                if (a) {
                    d = "cke_bm_" + CKEDITOR.tools.getNextNumber();
                    b.setAttribute("id", d + (g ? "C" : "S"))
                }
                if (!g) {
                    c = b.clone();
                    c.setHtml("&nbsp;");
                    a && c.setAttribute("id", d + "E");
                    h = this.clone();
                    h.collapse();
                    h.insertNode(c)
                }
                h =
                    this.clone();
                h.collapse(true);
                h.insertNode(b);
                if (c) {
                    this.setStartAfter(b);
                    this.setEndBefore(c)
                } else this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                return {
                    startNode: a ? d + (g ? "C" : "S") : b,
                    endNode: a ? d + "E" : c,
                    serializable: a,
                    collapsed: g
                }
            },
            createBookmark2: function (a) {
                var b = this.startContainer,
                    c = this.endContainer,
                    d = this.startOffset,
                    h = this.endOffset,
                    g = this.collapsed,
                    e, f;
                if (!b || !c) return {
                        start: 0,
                        end: 0
                };
                if (a) {
                    if (b.type == CKEDITOR.NODE_ELEMENT) {
                        if ((e = b.getChild(d)) && e.type == CKEDITOR.NODE_TEXT && d > 0 && e.getPrevious().type ==
                            CKEDITOR.NODE_TEXT) {
                            b = e;
                            d = 0
                        }
                        e && e.type == CKEDITOR.NODE_ELEMENT && (d = e.getIndex(1))
                    }
                    for (; b.type == CKEDITOR.NODE_TEXT && (f = b.getPrevious()) && f.type == CKEDITOR.NODE_TEXT;) {
                        b = f;
                        d = d + f.getLength()
                    }
                    if (!g) {
                        if (c.type == CKEDITOR.NODE_ELEMENT) {
                            if ((e = c.getChild(h)) && e.type == CKEDITOR.NODE_TEXT && h > 0 && e.getPrevious().type == CKEDITOR.NODE_TEXT) {
                                c = e;
                                h = 0
                            }
                            e && e.type == CKEDITOR.NODE_ELEMENT && (h = e.getIndex(1))
                        }
                        for (; c.type == CKEDITOR.NODE_TEXT && (f = c.getPrevious()) && f.type == CKEDITOR.NODE_TEXT;) {
                            c = f;
                            h = h + f.getLength()
                        }
                    }
                }
                return {
                    start: b.getAddress(a),
                    end: g ? null : c.getAddress(a),
                    startOffset: d,
                    endOffset: h,
                    normalized: a,
                    collapsed: g,
                    is2: true
                }
            },
            moveToBookmark: function (a) {
                if (a.is2) {
                    var b = this.document.getByAddress(a.start, a.normalized),
                        c = a.startOffset,
                        d = a.end && this.document.getByAddress(a.end, a.normalized),
                        a = a.endOffset;
                    this.setStart(b, c);
                    d ? this.setEnd(d, a) : this.collapse(true)
                } else {
                    b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode;
                    a = c ? this.document.getById(a.endNode) : a.endNode;
                    this.setStartBefore(b);
                    b.remove();
                    if (a) {
                        this.setEndBefore(a);
                        a.remove()
                    } else this.collapse(true)
                }
            },
            getBoundaryNodes: function () {
                var a = this.startContainer,
                    b = this.endContainer,
                    c = this.startOffset,
                    d = this.endOffset,
                    h;
                if (a.type == CKEDITOR.NODE_ELEMENT) {
                    h = a.getChildCount();
                    if (h > c) a = a.getChild(c);
                    else if (h < 1) a = a.getPreviousSourceNode();
                    else {
                        for (a = a.$; a.lastChild;) a = a.lastChild;
                        a = new CKEDITOR.dom.node(a);
                        a = a.getNextSourceNode() || a
                    }
                }
                if (b.type == CKEDITOR.NODE_ELEMENT) {
                    h = b.getChildCount();
                    if (h > d) b = b.getChild(d).getPreviousSourceNode(true);
                    else if (h < 1) b = b.getPreviousSourceNode();
                    else {
                        for (b = b.$; b.lastChild;) b = b.lastChild;
                        b = new CKEDITOR.dom.node(b)
                    }
                }
                a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                return {
                    startNode: a,
                    endNode: b
                }
            },
            getCommonAncestor: function (a, b) {
                var c = this.startContainer,
                    d = this.endContainer,
                    c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d);
                return b && !c.is ? c.getParent() : c
            },
            optimize: function () {
                var a = this.startContainer,
                    b = this.startOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >=
                    a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
                a = this.endContainer;
                b = this.endOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
            },
            optimizeBookmark: function () {
                var a = this.startContainer,
                    b = this.endContainer;
                a.is && (a.is("span") && a.data("cke-bookmark")) && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                b && (b.is && b.is("span") && b.data("cke-bookmark")) && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
            },
            trim: function (a, b) {
                var c = this.startContainer,
                    d = this.startOffset,
                    h = this.collapsed;
                if ((!a || h) && c && c.type == CKEDITOR.NODE_TEXT) {
                    if (d) if (d >= c.getLength()) {
                            d = c.getIndex() + 1;
                            c = c.getParent()
                        } else {
                            var g = c.split(d),
                                d = c.getIndex() + 1,
                                c = c.getParent();
                            if (this.startContainer.equals(this.endContainer)) this.setEnd(g, this.endOffset - this.startOffset);
                            else if (c.equals(this.endContainer)) this.endOffset = this.endOffset + 1
                        } else {
                            d = c.getIndex();
                            c = c.getParent()
                        }
                    this.setStart(c, d);
                    if (h) {
                        this.collapse(true);
                        return
                    }
                }
                c = this.endContainer;
                d = this.endOffset;
                if (!b && !h && c && c.type ==
                    CKEDITOR.NODE_TEXT) {
                    if (d) {
                        d >= c.getLength() || c.split(d);
                        d = c.getIndex() + 1
                    } else d = c.getIndex();
                    c = c.getParent();
                    this.setEnd(c, d)
                }
            },
            enlarge: function (a, b) {
                switch (a) {
                    case CKEDITOR.ENLARGE_INLINE:
                        var c = 1;
                    case CKEDITOR.ENLARGE_ELEMENT:
                        if (this.collapsed) break;
                        var d = this.getCommonAncestor(),
                            h = this.root,
                            g, e, f, i, j, l = false,
                            q, p;
                        q = this.startContainer;
                        p = this.startOffset;
                        if (q.type == CKEDITOR.NODE_TEXT) {
                            if (p) {
                                q = !CKEDITOR.tools.trim(q.substring(0, p)).length && q;
                                l = !! q
                            }
                            if (q && !(i = q.getPrevious())) f = q.getParent()
                        } else {
                            p &&
                                (i = q.getChild(p - 1) || q.getLast());
                            i || (f = q)
                        }
                        for (; f || i;) {
                            if (f && !i) {
                                !j && f.equals(d) && (j = true);
                                if (c ? f.isBlockBoundary() : !h.contains(f)) break;
                                if (!l || f.getComputedStyle("display") != "inline") {
                                    l = false;
                                    j ? g = f : this.setStartBefore(f)
                                }
                                i = f.getPrevious()
                            }
                            for (; i;) {
                                q = false;
                                if (i.type == CKEDITOR.NODE_COMMENT) i = i.getPrevious();
                                else {
                                    if (i.type == CKEDITOR.NODE_TEXT) {
                                        p = i.getText();
                                        /[^\s\ufeff]/.test(p) && (i = null);
                                        q = /[\s\ufeff]$/.test(p)
                                    } else if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark")) if (l && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
                                            p =
                                                i.getText();
                                            if (/[^\s\ufeff]/.test(p)) i = null;
                                            else for (var A = i.$.getElementsByTagName("*"), r = 0, C; C = A[r++];) if (!CKEDITOR.dtd.$removeEmpty[C.nodeName.toLowerCase()]) {
                                                        i = null;
                                                        break
                                                    }
                                            i && (q = !! p.length)
                                        } else i = null;
                                    q && (l ? j ? g = f : f && this.setStartBefore(f) : l = true);
                                    if (i) {
                                        q = i.getPrevious();
                                        if (!f && !q) {
                                            f = i;
                                            i = null;
                                            break
                                        }
                                        i = q
                                    } else f = null
                                }
                            }
                            f && (f = f.getParent())
                        }
                        q = this.endContainer;
                        p = this.endOffset;
                        f = i = null;
                        j = l = false;
                        if (q.type == CKEDITOR.NODE_TEXT) {
                            q = !CKEDITOR.tools.trim(q.substring(p)).length && q;
                            l = !(q && q.getLength());
                            if (q && !(i = q.getNext())) f = q.getParent()
                        } else(i = q.getChild(p)) || (f = q);
                        for (; f || i;) {
                            if (f && !i) {
                                !j && f.equals(d) && (j = true);
                                if (c ? f.isBlockBoundary() : !h.contains(f)) break;
                                if (!l || f.getComputedStyle("display") != "inline") {
                                    l = false;
                                    j ? e = f : f && this.setEndAfter(f)
                                }
                                i = f.getNext()
                            }
                            for (; i;) {
                                q = false;
                                if (i.type == CKEDITOR.NODE_TEXT) {
                                    p = i.getText();
                                    /[^\s\ufeff]/.test(p) && (i = null);
                                    q = /^[\s\ufeff]/.test(p)
                                } else if (i.type == CKEDITOR.NODE_ELEMENT) {
                                    if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark")) if (l && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
                                            p =
                                                i.getText();
                                            if (/[^\s\ufeff]/.test(p)) i = null;
                                            else {
                                                A = i.$.getElementsByTagName("*");
                                                for (r = 0; C = A[r++];) if (!CKEDITOR.dtd.$removeEmpty[C.nodeName.toLowerCase()]) {
                                                        i = null;
                                                        break
                                                    }
                                            }
                                            i && (q = !! p.length)
                                        } else i = null
                                } else q = 1;
                                q && l && (j ? e = f : this.setEndAfter(f));
                                if (i) {
                                    q = i.getNext();
                                    if (!f && !q) {
                                        f = i;
                                        i = null;
                                        break
                                    }
                                    i = q
                                } else f = null
                            }
                            f && (f = f.getParent())
                        }
                        if (g && e) {
                            d = g.contains(e) ? e : g;
                            this.setStartBefore(d);
                            this.setEndAfter(d)
                        }
                        break;
                    case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                    case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                        f = new CKEDITOR.dom.range(this.root);
                        h = this.root;
                        f.setStartAt(h, CKEDITOR.POSITION_AFTER_START);
                        f.setEnd(this.startContainer, this.startOffset);
                        f = new CKEDITOR.dom.walker(f);
                        var y, u, x = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
                                br: 1
                            } : null),
                            I = function (a) {
                                var b = x(a);
                                b || (y = a);
                                return b
                            }, c = function (a) {
                                var b = I(a);
                                !b && (a.is && a.is("br")) && (u = a);
                                return b
                            };
                        f.guard = I;
                        f = f.lastBackward();
                        y = y || h;
                        this.setStartAt(y, !y.is("br") && (!f && this.checkStartOfBlock() || f && y.contains(f)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                        if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                            f = this.clone();
                            f = new CKEDITOR.dom.walker(f);
                            var G = CKEDITOR.dom.walker.whitespaces(),
                                E = CKEDITOR.dom.walker.bookmark();
                            f.evaluator = function (a) {
                                return !G(a) && !E(a)
                            };
                            if ((f = f.previous()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("br")) break
                        }
                        f = this.clone();
                        f.collapse();
                        f.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                        f = new CKEDITOR.dom.walker(f);
                        f.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? c : I;
                        y = null;
                        f = f.lastForward();
                        y = y || h;
                        this.setEndAt(y, !f && this.checkEndOfBlock() || f &&
                            y.contains(f) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                        u && this.setEndAfter(u)
                }
            },
            shrink: function (a, b, c) {
                if (!this.collapsed) {
                    var a = a || CKEDITOR.SHRINK_TEXT,
                        d = this.clone(),
                        h = this.startContainer,
                        f = this.endContainer,
                        g = this.startOffset,
                        e = this.endOffset,
                        i = 1,
                        j = 1;
                    if (h && h.type == CKEDITOR.NODE_TEXT) if (g) if (g >= h.getLength()) d.setStartAfter(h);
                            else {
                                d.setStartBefore(h);
                                i = 0
                            } else d.setStartBefore(h);
                    if (f && f.type == CKEDITOR.NODE_TEXT) if (e) if (e >= f.getLength()) d.setEndAfter(f);
                            else {
                                d.setEndAfter(f);
                                j = 0
                            } else d.setEndBefore(f);
                    var d = new CKEDITOR.dom.walker(d),
                        l = CKEDITOR.dom.walker.bookmark();
                    d.evaluator = function (b) {
                        return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
                    };
                    var q;
                    d.guard = function (b, d) {
                        if (l(b)) return true;
                        if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(q) || c === false && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary()) return false;
                        !d && b.type == CKEDITOR.NODE_ELEMENT && (q = b);
                        return true
                    };
                    if (i)(h = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" :
                            "next"]()) && this.setStartAt(h, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                    if (j) {
                        d.reset();
                        (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)
                    }
                    return !(!i && !j)
                }
            },
            insertNode: function (a) {
                this.optimizeBookmark();
                this.trim(false, true);
                var b = this.startContainer,
                    c = b.getChild(this.startOffset);
                c ? a.insertBefore(c) : b.append(a);
                a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                this.setStartBefore(a)
            },
            moveToPosition: function (a, b) {
                this.setStartAt(a, b);
                this.collapse(true)
            },
            moveToRange: function (a) {
                this.setStart(a.startContainer, a.startOffset);
                this.setEnd(a.endContainer, a.endOffset)
            },
            selectNodeContents: function (a) {
                this.setStart(a, 0);
                this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
            },
            setStart: function (a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()]) {
                    b = a.getIndex();
                    a = a.getParent()
                }
                this.startContainer = a;
                this.startOffset = b;
                if (!this.endContainer) {
                    this.endContainer =
                        a;
                    this.endOffset = b
                }
                g(this)
            },
            setEnd: function (a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()]) {
                    b = a.getIndex() + 1;
                    a = a.getParent()
                }
                this.endContainer = a;
                this.endOffset = b;
                if (!this.startContainer) {
                    this.startContainer = a;
                    this.startOffset = b
                }
                g(this)
            },
            setStartAfter: function (a) {
                this.setStart(a.getParent(), a.getIndex() + 1)
            },
            setStartBefore: function (a) {
                this.setStart(a.getParent(), a.getIndex())
            },
            setEndAfter: function (a) {
                this.setEnd(a.getParent(), a.getIndex() + 1)
            },
            setEndBefore: function (a) {
                this.setEnd(a.getParent(),
                a.getIndex())
            },
            setStartAt: function (a, b) {
                switch (b) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setStart(a, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        a.type == CKEDITOR.NODE_TEXT ? this.setStart(a, a.getLength()) : this.setStart(a, a.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setStartBefore(a);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setStartAfter(a)
                }
                g(this)
            },
            setEndAt: function (a, b) {
                switch (b) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setEnd(a, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        a.type ==
                            CKEDITOR.NODE_TEXT ? this.setEnd(a, a.getLength()) : this.setEnd(a, a.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setEndBefore(a);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setEndAfter(a)
                }
                g(this)
            },
            fixBlock: function (a, b) {
                var c = this.createBookmark(),
                    d = this.document.createElement(b);
                this.collapse(a);
                this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                this.extractContents().appendTo(d);
                d.trim();
                CKEDITOR.env.ie || d.appendBogus();
                this.insertNode(d);
                this.moveToBookmark(c);
                return d
            },
            splitBlock: function (a) {
                var b =
                    new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                    c = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                    d = b.block,
                    h = c.block,
                    f = null;
                if (!b.blockLimit.equals(c.blockLimit)) return null;
                if (a != "br") {
                    if (!d) {
                        d = this.fixBlock(true, a);
                        h = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block
                    }
                    h || (h = this.fixBlock(false, a))
                }
                a = d && this.checkStartOfBlock();
                b = h && this.checkEndOfBlock();
                this.deleteContents();
                if (d && d.equals(h)) if (b) {
                        f = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                        this.moveToPosition(h, CKEDITOR.POSITION_AFTER_END);
                        h = null
                    } else if (a) {
                    f = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                    this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START);
                    d = null
                } else {
                    h = this.splitElement(d);
                    !CKEDITOR.env.ie && !d.is("ul", "ol") && d.appendBogus()
                }
                return {
                    previousBlock: d,
                    nextBlock: h,
                    wasStartOfBlock: a,
                    wasEndOfBlock: b,
                    elementPath: f
                }
            },
            splitElement: function (a) {
                if (!this.collapsed) return null;
                this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                var b = this.extractContents(),
                    c = a.clone(false);
                b.appendTo(c);
                c.insertAfter(a);
                this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                return c
            },
            removeEmptyBlocksAtEnd: function () {
                function a(d) {
                    return function (a) {
                        return b(a) || (c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable()) || d.is("table") && a.is("caption") ? false : true
                    }
                }
                var b = CKEDITOR.dom.walker.whitespaces(),
                    c = CKEDITOR.dom.walker.bookmark(false);
                return function (b) {
                    for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), m = d.block || d.blockLimit, f; m && !m.equals(d.root) && !m.getFirst(a(m));) {
                        f =
                            m.getParent();
                        this[b ? "setEndAt" : "setStartAt"](m, CKEDITOR.POSITION_AFTER_END);
                        m.remove(1);
                        m = f
                    }
                    this.moveToBookmark(c)
                }
            }(),
            startPath: function () {
                return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
            },
            endPath: function () {
                return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
            },
            checkBoundaryOfElement: function (a, b) {
                var d = b == CKEDITOR.START,
                    f = this.clone();
                f.collapse(d);
                f[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                f = new CKEDITOR.dom.walker(f);
                f.evaluator = c(d);
                return f[d ? "checkBackward" : "checkForward"]()
            },
            checkStartOfBlock: function () {
                var a = this.startContainer,
                    c = this.startOffset;
                if (CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT) {
                    a = CKEDITOR.tools.ltrim(a.substring(0, c));
                    l.test(a) && this.trim(0, 1)
                }
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                c = this.clone();
                c.collapse(true);
                c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkBackward()
            },
            checkEndOfBlock: function () {
                var a =
                    this.endContainer,
                    c = this.endOffset;
                if (CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT) {
                    a = CKEDITOR.tools.rtrim(a.substring(c));
                    l.test(a) && this.trim(1, 0)
                }
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                c = this.clone();
                c.collapse(false);
                c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                a = new CKEDITOR.dom.walker(c);
                a.evaluator = b();
                return a.checkForward()
            },
            getPreviousNode: function (a, b, c) {
                var d = this.clone();
                d.collapse(1);
                d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.previous()
            },
            getNextNode: function (a, b, c) {
                var d = this.clone();
                d.collapse();
                d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
                c = new CKEDITOR.dom.walker(d);
                c.evaluator = a;
                c.guard = b;
                return c.next()
            },
            checkReadOnly: function () {
                function a(b, c) {
                    for (; b;) {
                        if (b.type == CKEDITOR.NODE_ELEMENT) {
                            if (b.getAttribute("contentEditable") == "false" && !b.data("cke-editable")) return 0;
                            if (b.is("html") || b.getAttribute("contentEditable") == "true" && (b.contains(c) || b.equals(c))) break
                        }
                        b =
                            b.getParent()
                    }
                    return 1
                }
                return function () {
                    var b = this.startContainer,
                        c = this.endContainer;
                    return !(a(b, c) && a(c, b))
                }
            }(),
            moveToElementEditablePosition: function (b, c) {
                if (b.type == CKEDITOR.NODE_ELEMENT && !b.isEditable(false)) {
                    this.moveToPosition(b, c ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                    return true
                }
                for (var d = 0; b;) {
                    if (b.type == CKEDITOR.NODE_TEXT) {
                        c && this.checkEndOfBlock() && l.test(b.getText()) ? this.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(b, c ? CKEDITOR.POSITION_AFTER_END :
                            CKEDITOR.POSITION_BEFORE_START);
                        d = 1;
                        break
                    }
                    if (b.type == CKEDITOR.NODE_ELEMENT) if (b.isEditable()) {
                            this.moveToPosition(b, c ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START);
                            d = 1
                        } else c && (b.is("br") && this.checkEndOfBlock()) && this.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                    var f = b,
                        h = d,
                        g = void 0;
                    f.type == CKEDITOR.NODE_ELEMENT && f.isEditable(false) && (g = f[c ? "getLast" : "getFirst"](a));
                    !h && !g && (g = f[c ? "getPrevious" : "getNext"](a));
                    b = g
                }
                return !!d
            },
            moveToElementEditStart: function (a) {
                return this.moveToElementEditablePosition(a)
            },
            moveToElementEditEnd: function (a) {
                return this.moveToElementEditablePosition(a, true)
            },
            getEnclosedNode: function () {
                var a = this.clone();
                a.optimize();
                if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
                var a = new CKEDITOR.dom.walker(a),
                    b = CKEDITOR.dom.walker.bookmark(false, true),
                    c = CKEDITOR.dom.walker.whitespaces(true);
                a.evaluator = function (a) {
                    return c(a) && b(a)
                };
                var d = a.next();
                a.reset();
                return d && d.equals(a.previous()) ? d : null
            },
            getTouchedStartNode: function () {
                var a =
                    this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
            },
            getTouchedEndNode: function () {
                var a = this.endContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
            },
            scrollIntoView: function () {
                var a = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document),
                    b, c, d, h = this.clone();
                h.optimize();
                if (d = h.startContainer.type == CKEDITOR.NODE_TEXT) {
                    c = h.startContainer.getText();
                    b = h.startContainer.split(h.startOffset);
                    a.insertAfter(h.startContainer)
                } else h.insertNode(a);
                a.scrollIntoView();
                if (d) {
                    h.startContainer.setText(c);
                    b.remove()
                }
                a.remove()
            }
        }
    })();
    CKEDITOR.POSITION_AFTER_START = 1;
    CKEDITOR.POSITION_BEFORE_END = 2;
    CKEDITOR.POSITION_BEFORE_START = 3;
    CKEDITOR.POSITION_AFTER_END = 4;
    CKEDITOR.ENLARGE_ELEMENT = 1;
    CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2;
    CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3;
    CKEDITOR.ENLARGE_INLINE = 4;
    CKEDITOR.START = 1;
    CKEDITOR.END = 2;
    CKEDITOR.SHRINK_ELEMENT = 1;
    CKEDITOR.SHRINK_TEXT = 2;
    (function () {
        function b(a) {
            if (!(arguments.length < 1)) {
                this.range = a;
                this.forceBrBreak = 0;
                this.enlargeBr = 1;
                this.enforceRealBlocks = 0;
                this._ || (this._ = {})
            }
        }
        function c(a, b, c) {
            for (a = a.getNextSourceNode(b, null, c); !g(a);) a = a.getNextSourceNode(b, null, c);
            return a
        }
        var a = /^[\r\n\t ]+$/,
            g = CKEDITOR.dom.walker.bookmark(false, true),
            e = CKEDITOR.dom.walker.whitespaces(true),
            d = function (a) {
                return g(a) && e(a)
            };
        b.prototype = {
            getNextParagraph: function (b) {
                b = b || "p";
                if (!CKEDITOR.dtd[this.range.root.getName()][b]) return null;
                var e,
                    j, l, n, m, o;
                if (!this._.started) {
                    j = this.range.clone();
                    j.shrink(CKEDITOR.NODE_ELEMENT, true);
                    n = j.endContainer.hasAscendant("pre", true) || j.startContainer.hasAscendant("pre", true);
                    j.enlarge(this.forceBrBreak && !n || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    if (!j.collapsed) {
                        n = new CKEDITOR.dom.walker(j.clone());
                        var k = CKEDITOR.dom.walker.bookmark(true, true);
                        n.evaluator = k;
                        this._.nextNode = n.next();
                        n = new CKEDITOR.dom.walker(j.clone());
                        n.evaluator = k;
                        n = n.previous();
                        this._.lastNode =
                            n.getNextSourceNode(true);
                        if (this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary()) {
                            k = this.range.clone();
                            k.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END);
                            if (k.checkEndOfBlock()) {
                                k = new CKEDITOR.dom.elementPath(k.endContainer, k.root);
                                this._.lastNode = (k.block || k.blockLimit).getNextSourceNode(true)
                            }
                        }
                        if (!this._.lastNode) {
                            this._.lastNode = this._.docEndMarker = j.document.createText("");
                            this._.lastNode.insertAfter(n)
                        }
                        j =
                            null
                    }
                    this._.started = 1
                }
                k = this._.nextNode;
                n = this._.lastNode;
                for (this._.nextNode = null; k;) {
                    var h = 0,
                        s = k.hasAscendant("pre"),
                        w = k.type != CKEDITOR.NODE_ELEMENT,
                        v = 0;
                    if (w) k.type == CKEDITOR.NODE_TEXT && a.test(k.getText()) && (w = 0);
                    else {
                        var t = k.getName();
                        if (k.isBlockBoundary(this.forceBrBreak && !s && {
                            br: 1
                        })) {
                            if (t == "br") w = 1;
                            else if (!j && !k.getChildCount() && t != "hr") {
                                e = k;
                                l = k.equals(n);
                                break
                            }
                            if (j) {
                                j.setEndAt(k, CKEDITOR.POSITION_BEFORE_START);
                                if (t != "br") this._.nextNode = k
                            }
                            h = 1
                        } else {
                            if (k.getFirst()) {
                                if (!j) {
                                    j = this.range.clone();
                                    j.setStartAt(k, CKEDITOR.POSITION_BEFORE_START)
                                }
                                k = k.getFirst();
                                continue
                            }
                            w = 1
                        }
                    }
                    if (w && !j) {
                        j = this.range.clone();
                        j.setStartAt(k, CKEDITOR.POSITION_BEFORE_START)
                    }
                    l = (!h || w) && k.equals(n);
                    if (j && !h) for (; !k.getNext(d) && !l;) {
                            t = k.getParent();
                            if (t.isBlockBoundary(this.forceBrBreak && !s && {
                                br: 1
                            })) {
                                h = 1;
                                w = 0;
                                l || t.equals(n);
                                j.setEndAt(t, CKEDITOR.POSITION_BEFORE_END);
                                break
                            }
                            k = t;
                            w = 1;
                            l = k.equals(n);
                            v = 1
                    }
                    w && j.setEndAt(k, CKEDITOR.POSITION_AFTER_END);
                    k = c(k, v, n);
                    if ((l = !k) || h && j) break
                }
                if (!e) {
                    if (!j) {
                        this._.docEndMarker && this._.docEndMarker.remove();
                        return this._.nextNode = null
                    }
                    e = new CKEDITOR.dom.elementPath(j.startContainer, j.root);
                    k = e.blockLimit;
                    h = {
                        div: 1,
                        th: 1,
                        td: 1
                    };
                    e = e.block;
                    if (!e && k && !this.enforceRealBlocks && h[k.getName()] && j.checkStartOfBlock() && j.checkEndOfBlock() && !k.equals(j.root)) e = k;
                    else if (!e || this.enforceRealBlocks && e.getName() == "li") {
                        e = this.range.document.createElement(b);
                        j.extractContents().appendTo(e);
                        e.trim();
                        j.insertNode(e);
                        m = o = true
                    } else if (e.getName() != "li") {
                        if (!j.checkStartOfBlock() || !j.checkEndOfBlock()) {
                            e = e.clone(false);
                            j.extractContents().appendTo(e);
                            e.trim();
                            o = j.splitBlock();
                            m = !o.wasStartOfBlock;
                            o = !o.wasEndOfBlock;
                            j.insertNode(e)
                        }
                    } else if (!l) this._.nextNode = e.equals(n) ? null : c(j.getBoundaryNodes().endNode, 1, n)
                }
                if (m)(j = e.getPrevious()) && j.type == CKEDITOR.NODE_ELEMENT && (j.getName() == "br" ? j.remove() : j.getLast() && j.getLast().$.nodeName.toLowerCase() == "br" && j.getLast().remove());
                if (o)(j = e.getLast()) && j.type == CKEDITOR.NODE_ELEMENT && j.getName() == "br" && (CKEDITOR.env.ie || j.getPrevious(g) || j.getNext(g)) && j.remove();
                if (!this._.nextNode) this._.nextNode = l ||
                        e.equals(n) || !n ? null : c(e, 1, n);
                return e
            }
        };
        CKEDITOR.dom.range.prototype.createIterator = function () {
            return new b(this)
        }
    })();
    CKEDITOR.command = function (b, c) {
        this.uiItems = [];
        this.exec = function (a) {
            if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return false;
            this.editorFocus && b.focus();
            return this.fire("exec") === false ? true : c.exec.call(this, b, a) !== false
        };
        this.refresh = function (a, b) {
            if (!this.readOnly && a.readOnly) return true;
            if (this.context && !b.isContextFor(this.context)) {
                this.disable();
                return true
            }
            this.enable();
            return this.fire("refresh", {
                editor: a,
                path: b
            }) === false ? true : c.refresh && c.refresh.apply(this, arguments) !==
                false
        };
        var a;
        this.checkAllowed = function () {
            return typeof a == "boolean" ? a : a = b.filter.checkFeature(this)
        };
        CKEDITOR.tools.extend(this, c, {
            modes: {
                wysiwyg: 1
            },
            editorFocus: 1,
            contextSensitive: !! c.context,
            state: CKEDITOR.TRISTATE_DISABLED
        });
        CKEDITOR.event.call(this)
    };
    CKEDITOR.command.prototype = {
        enable: function () {
            this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(!this.preserveState || typeof this.previousState == "undefined" ? CKEDITOR.TRISTATE_OFF : this.previousState)
        },
        disable: function () {
            this.setState(CKEDITOR.TRISTATE_DISABLED)
        },
        setState: function (b) {
            if (this.state == b || !this.checkAllowed()) return false;
            this.previousState = this.state;
            this.state = b;
            this.fire("state");
            return true
        },
        toggleState: function () {
            this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :
                this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    };
    CKEDITOR.event.implementOn(CKEDITOR.command.prototype);
    CKEDITOR.ENTER_P = 1;
    CKEDITOR.ENTER_BR = 2;
    CKEDITOR.ENTER_DIV = 3;
    CKEDITOR.config = {
        customConfig: "config.js",
        autoUpdateElement: !0,
        language: "",
        defaultLanguage: "en",
        contentsLangDirection: "",
        enterMode: CKEDITOR.ENTER_P,
        forceEnterMode: !1,
        shiftEnterMode: CKEDITOR.ENTER_BR,
        docType: "<!DOCTYPE html>",
        bodyId: "",
        bodyClass: "",
        fullPage: !1,
        height: 200,
        extraPlugins: "",
        removePlugins: "",
        protectedSource: [],
        tabIndex: 0,
        width: "",
        baseFloatZIndex: 1E4,
        blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
    };
    (function () {
        function b(a, b, d, h, f) {
            var m = b.name;
            if ((h || typeof a.elements != "function" || a.elements(m)) && (!a.match || a.match(b))) {
                if (h = !f) {
                    a: if (a.nothingRequired) h = true;
                    else {
                        if (f = a.requiredClasses) {
                            m = b.classes;
                            for (h = 0; h < f.length; ++h) if (CKEDITOR.tools.indexOf(m, f[h]) == -1) {
                                    h = false;
                                    break a
                                }
                        }
                        h = e(b.styles, a.requiredStyles) && e(b.attributes, a.requiredAttributes)
                    }
                    h = !h
                }
                if (!h) {
                    if (!a.propertiesOnly) d.valid = true;
                    if (!d.allAttributes) d.allAttributes = c(a.attributes, b.attributes, d.validAttributes);
                    if (!d.allStyles) d.allStyles =
                            c(a.styles, b.styles, d.validStyles);
                    if (!d.allClasses) {
                        a = a.classes;
                        b = b.classes;
                        h = d.validClasses;
                        if (a) if (a === true) b = true;
                            else {
                                for (var f = 0, m = b.length, g; f < m; ++f) {
                                    g = b[f];
                                    h[g] || (h[g] = a(g))
                                }
                                b = false
                            } else b = false;
                        d.allClasses = b
                    }
                }
            }
        }
        function c(a, b, c) {
            if (!a) return false;
            if (a === true) return true;
            for (var d in b) c[d] || (c[d] = a(d, b[d]));
            return false
        }
        function a(a, b) {
            if (!a) return false;
            if (a === true) return a;
            if (typeof a == "string") {
                a = p(a);
                return a == "*" ? true : CKEDITOR.tools.convertArrayToObject(a.split(b))
            }
            if (CKEDITOR.tools.isArray(a)) return a.length ?
                    CKEDITOR.tools.convertArrayToObject(a) : false;
            var c = {}, d = 0,
                h;
            for (h in a) {
                c[h] = a[h];
                d++
            }
            return d ? c : false
        }
        function g(a) {
            if (a._.filterFunction) return a._.filterFunction;
            var c = /^cke:(object|embed|param)$/,
                d = /^(object|embed|param)$/;
            return a._.filterFunction = function (h, f, m, e, g, o, k) {
                var i = h.name,
                    u, w = false;
                if (g) h.name = i = i.replace(c, "$1");
                if (m = m && m[i]) {
                    j(h);
                    for (i = 0; i < m.length; ++i) s(a, h, m[i]);
                    l(h)
                }
                if (f) {
                    var i = h.name,
                        m = f.elements[i],
                        v = f.generic,
                        f = {
                            valid: false,
                            validAttributes: {},
                            validClasses: {},
                            validStyles: {},
                            allAttributes: false,
                            allClasses: false,
                            allStyles: false
                        };
                    if (!m && !v) {
                        e.push(h);
                        return true
                    }
                    j(h);
                    if (m) {
                        i = 0;
                        for (u = m.length; i < u; ++i) b(m[i], h, f, true, o)
                    }
                    if (v) {
                        i = 0;
                        for (u = v.length; i < u; ++i) b(v[i], h, f, false, o)
                    }
                    if (!f.valid) {
                        e.push(h);
                        return true
                    }
                    o = f.validAttributes;
                    i = f.validStyles;
                    m = f.validClasses;
                    u = h.attributes;
                    var v = h.styles,
                        q = u["class"],
                        p = u.style,
                        x, z, t = [],
                        r = [],
                        y = /^data-cke-/,
                        A = false;
                    delete u.style;
                    delete u["class"];
                    if (!f.allAttributes) for (x in u) if (!o[x]) if (y.test(x)) {
                                    if (x != (z = x.replace(/^data-cke-saved-/, "")) && !o[z]) {
                                        delete u[x];
                                        A = true
                                    }
                                } else {
                                    delete u[x];
                                    A = true
                                }
                    if (f.allStyles) {
                        if (p) u.style = p
                    } else {
                        for (x in v) i[x] ? t.push(x + ":" + v[x]) : A = true;
                        if (t.length) u.style = t.sort().join("; ")
                    }
                    if (f.allClasses) q && (u["class"] = q);
                    else {
                        for (x in m) m[x] && r.push(x);
                        r.length && (u["class"] = r.sort().join(" "));
                        q && r.length < q.split(/\s+/).length && (A = true)
                    }
                    A && (w = true);
                    if (!k && !n(h)) {
                        e.push(h);
                        return true
                    }
                }
                if (g) h.name = h.name.replace(d, "cke:$1");
                return w
            }
        }
        function e(a, b) {
            if (!b) return true;
            for (var c = 0; c < b.length; ++c) if (!(b[c] in a)) return false;
            return true
        }
        function d(a) {
            if (!a) return {};
            for (var a = a.split(/\s*,\s*/).sort(), b = {}; a.length;) b[a.shift()] = A;
            return b
        }
        function f(a) {
            for (var b, c, d, h, f = {}, m = 1, a = p(a); b = a.match(y);) {
                if (c = b[2]) {
                    d = i(c, "styles");
                    h = i(c, "attrs");
                    c = i(c, "classes")
                } else d = h = c = null;
                f["$" + m++] = {
                    elements: b[1],
                    classes: c,
                    styles: d,
                    attributes: h
                };
                a = a.slice(b[0].length)
            }
            return f
        }
        function i(a, b) {
            var c = a.match(u[b]);
            return c ? p(c[1]) : null
        }
        function j(a) {
            if (!a.styles) a.styles = CKEDITOR.tools.parseCssText(a.attributes.style || "", 1);
            if (!a.classes) a.classes =
                    a.attributes["class"] ? a.attributes["class"].split(/\s+/) : []
        }
        function l(a) {
            var b = a.attributes,
                c;
            delete b.style;
            delete b["class"];
            if (c = CKEDITOR.tools.writeCssText(a.styles, true)) b.style = c;
            a.classes.length && (b["class"] = a.classes.sort().join(" "))
        }
        function n(a) {
            switch (a.name) {
                case "a":
                    if (!a.children.length && !a.attributes.name) return false;
                    break;
                case "img":
                    if (!a.attributes.src) return false
            }
            return true
        }
        function m(a) {
            return !a ? false : a === true ? true : function (b) {
                return b in a
            }
        }
        function o() {
            return new CKEDITOR.htmlParser.element("br")
        }

        function k(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && (a.name == "br" || z.$block[a.name])
        }
        function h(a, b, c) {
            var d = a.name;
            if (z.$empty[d] || !a.children.length) if (d == "hr" && b == "br") a.replaceWith(o());
                else {
                    a.parent && c.push({
                        check: "it",
                        el: a.parent
                    });
                    a.remove()
                } else if (z.$block[d] || d == "tr") if (b == "br") {
                    if (a.previous && !k(a.previous)) {
                        b = o();
                        b.insertBefore(a)
                    }
                    if (a.next && !k(a.next)) {
                        b = o();
                        b.insertAfter(a)
                    }
                    a.replaceWithChildren()
                } else {
                    var d = a.children,
                        h;
                    b: {
                        h = z[b];
                        for (var f = 0, m = d.length, e; f < m; ++f) {
                            e = d[f];
                            if (e.type ==
                                CKEDITOR.NODE_ELEMENT && !h[e.name]) {
                                h = false;
                                break b
                            }
                        }
                        h = true
                    }
                    if (h) {
                        a.name = b;
                        a.attributes = {};
                        c.push({
                            check: "parent-down",
                            el: a
                        })
                    } else {
                        h = a.parent;
                        for (var f = h.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || h.name == "body", g, m = d.length; m > 0;) {
                            e = d[--m];
                            if (f && (e.type == CKEDITOR.NODE_TEXT || e.type == CKEDITOR.NODE_ELEMENT && z.$inline[e.name])) {
                                if (!g) {
                                    g = new CKEDITOR.htmlParser.element(b);
                                    g.insertAfter(a);
                                    c.push({
                                        check: "parent-down",
                                        el: g
                                    })
                                }
                                g.add(e, 0)
                            } else {
                                g = null;
                                e.insertAfter(a);
                                h.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && (e.type ==
                                    CKEDITOR.NODE_ELEMENT && !z[h.name][e.name]) && c.push({
                                    check: "el-up",
                                    el: e
                                })
                            }
                        }
                        a.remove()
                    }
                } else if (d == "style") a.remove();
            else {
                a.parent && c.push({
                    check: "it",
                    el: a.parent
                });
                a.replaceWithChildren()
            }
        }
        function s(a, b, c) {
            var d, h;
            for (d = 0; d < c.length; ++d) {
                h = c[d];
                if ((!h.check || a.check(h.check, false)) && (!h.left || h.left(b))) {
                    h.right(b, x);
                    break
                }
            }
        }
        function w(a, b) {
            var c = b.getDefinition(),
                d = c.attributes,
                h = c.styles,
                f, m, e, g;
            if (a.name != c.element) return false;
            for (f in d) if (f == "class") {
                    c = d[f].split(/\s+/);
                    for (e = a.classes.join("|"); g =
                        c.pop();) if (e.indexOf(g) == -1) return false
                } else if (a.attributes[f] != d[f]) return false;
            for (m in h) if (a.styles[m] != h[m]) return false;
            return true
        }
        function v(a, b) {
            var c, d;
            if (typeof a == "string") c = a;
            else if (a instanceof CKEDITOR.style) d = a;
            else {
                c = a[0];
                d = a[1]
            }
            return [{
                element: c,
                left: d,
                right: function (a, c) {
                    c.transform(a, b)
                }
            }]
        }
        function t(a) {
            return function (b) {
                return w(b, a)
            }
        }
        function F(a) {
            return function (b, c) {
                c[a](b)
            }
        }
        var z = CKEDITOR.dtd,
            q = CKEDITOR.tools.copy,
            p = CKEDITOR.tools.trim,
            A = "cke-test";
        CKEDITOR.filter = function (a) {
            this.allowedContent = [];
            this.disabled = false;
            this.editor = null;
            this.enterMode = CKEDITOR.ENTER_P;
            this._ = {
                rules: {},
                transformations: {},
                cachedTests: {}
            };
            if (a instanceof CKEDITOR.editor) {
                var b = this.editor = a;
                this.customConfig = true;
                var a = b.config.allowedContent,
                    c;
                if (a === true) this.disabled = true;
                else {
                    if (!a) this.customConfig = false;
                    this.enterMode = c = b.blockless ? CKEDITOR.ENTER_BR : b.config.enterMode;
                    this.allow("br " + (c == CKEDITOR.ENTER_P ? "p" : c == CKEDITOR.ENTER_DIV ? "div" : ""), "default", 1);
                    this.allow(a, "config", 1);
                    this.allow(b.config.extraAllowedContent,
                        "extra", 1);
                    this._.toHtmlListener = b.on("toHtml", function (a) {
                        this.applyTo(a.data.dataValue, true, a.data.dontFilter) && b.fire("dataFiltered")
                    }, this, null, 6);
                    this._.toDataFormatListener = b.on("toDataFormat", function (a) {
                        this.applyTo(a.data.dataValue, false, true)
                    }, this, null, 11)
                }
            } else {
                this.customConfig = false;
                this.allow(a, "default", 1)
            }
        };
        CKEDITOR.filter.prototype = {
            allow: function (b, c, d) {
                if (this.disabled || this.customConfig && !d || !b) return false;
                this._.cachedChecks = {};
                var h, e;
                if (typeof b == "string") b = f(b);
                else if (b instanceof
                CKEDITOR.style) {
                    e = b.getDefinition();
                    d = {};
                    b = e.attributes;
                    d[e.element] = e = {
                        styles: e.styles,
                        requiredStyles: e.styles && CKEDITOR.tools.objectKeys(e.styles)
                    };
                    if (b) {
                        b = q(b);
                        e.classes = b["class"] ? b["class"].split(/\s+/) : null;
                        e.requiredClasses = e.classes;
                        delete b["class"];
                        e.attributes = b;
                        e.requiredAttributes = b && CKEDITOR.tools.objectKeys(b)
                    }
                    b = d
                } else if (CKEDITOR.tools.isArray(b)) {
                    for (h = 0; h < b.length; ++h) e = this.allow(b[h], c, d);
                    return e
                }
                var g, d = [];
                for (g in b) {
                    e = b[g];
                    e = typeof e == "boolean" ? {} : typeof e == "function" ? {
                        match: e
                    } :
                        q(e);
                    if (g.charAt(0) != "$") e.elements = g;
                    if (c) e.featureName = c.toLowerCase();
                    var o = e;
                    o.elements = a(o.elements, /\s+/) || null;
                    o.propertiesOnly = o.propertiesOnly || o.elements === true;
                    var k = /\s*,\s*/,
                        s = void 0;
                    for (s in r) {
                        o[s] = a(o[s], k) || null;
                        var i = o,
                            u = C[s],
                            w = a(o[C[s]], k),
                            j = o[s],
                            v = [],
                            l = true,
                            x = void 0;
                        w ? l = false : w = {};
                        for (x in j) if (x.charAt(0) == "!") {
                                x = x.slice(1);
                                v.push(x);
                                w[x] = true;
                                l = false
                            }
                        for (; x = v.pop();) {
                            j[x] = j["!" + x];
                            delete j["!" + x]
                        }
                        i[u] = (l ? false : w) || null
                    }
                    o.match = o.match || null;
                    this.allowedContent.push(e);
                    d.push(e)
                }
                c =
                    this._.rules;
                g = c.elements || {};
                b = c.generic || [];
                e = 0;
                for (o = d.length; e < o; ++e) {
                    k = q(d[e]);
                    s = k.classes === true || k.styles === true || k.attributes === true;
                    i = k;
                    u = void 0;
                    for (u in r) i[u] = m(i[u]);
                    w = true;
                    for (u in C) {
                        u = C[u];
                        i[u] = CKEDITOR.tools.objectKeys(i[u]);
                        i[u] && (w = false)
                    }
                    i.nothingRequired = w;
                    if (k.elements === true || k.elements === null) {
                        k.elements = m(k.elements);
                        b[s ? "unshift" : "push"](k)
                    } else {
                        i = k.elements;
                        delete k.elements;
                        for (h in i) if (g[h]) g[h][s ? "unshift" : "push"](k);
                            else g[h] = [k]
                    }
                }
                c.elements = g;
                c.generic = b.length ? b : null;
                return true
            },
            applyTo: function (a, b, c) {
                var d = [],
                    f = !c && this._.rules,
                    m = this._.transformations,
                    e = g(this),
                    o = this.editor && this.editor.config.protectedSource,
                    k = false;
                a.forEach(function (a) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) e(a, f, m, d, b) && (k = true);
                    else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var c;
                        a: {
                            var h = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));
                            c = [];
                            var g, s, i;
                            if (o) for (s = 0; s < o.length; ++s) if ((i = h.match(o[s])) && i[0].length == h.length) {
                                        c = true;
                                        break a
                                    }
                            h =
                                CKEDITOR.htmlParser.fragment.fromHtml(h);
                            h.children.length == 1 && (g = h.children[0]).type == CKEDITOR.NODE_ELEMENT && e(g, f, m, c, b);
                            c = !c.length
                        }
                        c || d.push(a)
                    }
                }, null, true);
                d.length && (k = true);
                for (var s, i, a = [], c = ["p", "br", "div"][this.enterMode - 1]; s = d.pop();) s.type == CKEDITOR.NODE_ELEMENT ? h(s, c, a) : s.remove();
                for (; i = a.pop();) {
                    s = i.el;
                    if (s.parent) switch (i.check) {
                            case "it":
                                z.$removeEmpty[s.name] && !s.children.length ? h(s, c, a) : n(s) || h(s, c, a);
                                break;
                            case "el-up":
                                s.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !z[s.parent.name][s.name] &&
                                    h(s, c, a);
                                break;
                            case "parent-down":
                                s.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !z[s.parent.name][s.name] && h(s.parent, c, a)
                    }
                }
                return k
            },
            checkFeature: function (a) {
                if (this.disabled || !a) return true;
                a.toFeature && (a = a.toFeature(this.editor));
                return !a.requiredContent || this.check(a.requiredContent)
            },
            disable: function () {
                this.disabled = true;
                this._.toHtmlListener && this._.toHtmlListener.removeListener();
                this._.toDataFormatListener && this._.toDataFormatListener.removeListener()
            },
            addContentForms: function (a) {
                if (!this.disabled &&
                    a) {
                    var b, c, d = [],
                        h;
                    for (b = 0; b < a.length && !h; ++b) {
                        c = a[b];
                        if ((typeof c == "string" || c instanceof CKEDITOR.style) && this.check(c)) h = c
                    }
                    if (h) {
                        for (b = 0; b < a.length; ++b) d.push(v(a[b], h));
                        this.addTransformations(d)
                    }
                }
            },
            addFeature: function (a) {
                if (this.disabled || !a) return true;
                a.toFeature && (a = a.toFeature(this.editor));
                this.allow(a.allowedContent, a.name);
                this.addTransformations(a.contentTransformations);
                this.addContentForms(a.contentForms);
                return this.customConfig && a.requiredContent ? this.check(a.requiredContent) : true
            },
            addTransformations: function (a) {
                var b, c;
                if (!this.disabled && a) {
                    var d = this._.transformations,
                        h;
                    for (h = 0; h < a.length; ++h) {
                        b = a[h];
                        var f = void 0,
                            m = void 0,
                            e = void 0,
                            g = void 0,
                            o = void 0,
                            k = void 0;
                        c = [];
                        for (m = 0; m < b.length; ++m) {
                            e = b[m];
                            if (typeof e == "string") {
                                e = e.split(/\s*:\s*/);
                                g = e[0];
                                o = null;
                                k = e[1]
                            } else {
                                g = e.check;
                                o = e.left;
                                k = e.right
                            }
                            if (!f) {
                                f = e;
                                f = f.element ? f.element : g ? g.match(/^([a-z0-9]+)/i)[0] : f.left.getDefinition().element
                            }
                            o instanceof CKEDITOR.style && (o = t(o));
                            c.push({
                                check: g == f ? null : g,
                                left: o,
                                right: typeof k == "string" ? F(k) : k
                            })
                        }
                        b = f;
                        d[b] || (d[b] = []);
                        d[b].push(c)
                    }
                }
            },
            check: function (a, b, c) {
                if (this.disabled) return true;
                if (CKEDITOR.tools.isArray(a)) {
                    for (var h = a.length; h--;) if (this.check(a[h], b, c)) return true;
                    return false
                }
                var e, m;
                if (typeof a == "string") {
                    m = a + "<" + (b === false ? "0" : "1") + (c ? "1" : "0") + ">";
                    if (m in this._.cachedChecks) return this._.cachedChecks[m];
                    h = f(a).$1;
                    e = h.styles;
                    var o = h.classes;
                    h.name = h.elements;
                    h.classes = o = o ? o.split(/\s*,\s*/) : [];
                    h.styles = d(e);
                    h.attributes = d(h.attributes);
                    h.children = [];
                    o.length && (h.attributes["class"] =
                        o.join(" "));
                    if (e) h.attributes.style = CKEDITOR.tools.writeCssText(h.styles);
                    e = h
                } else {
                    h = a.getDefinition();
                    e = h.styles;
                    o = h.attributes || {};
                    if (e) {
                        e = q(e);
                        o.style = CKEDITOR.tools.writeCssText(e, true)
                    } else e = {};
                    e = {
                        name: h.element,
                        attributes: o,
                        classes: o["class"] ? o["class"].split(/\s+/) : [],
                        styles: e,
                        children: []
                    }
                }
                var o = CKEDITOR.tools.clone(e),
                    k = [],
                    i;
                if (b !== false && (i = this._.transformations[e.name])) {
                    for (h = 0; h < i.length; ++h) s(this, e, i[h]);
                    l(e)
                }
                g(this)(o, this._.rules, b === false ? false : this._.transformations, k, false, !c, !c);
                b = k.length > 0 ? false : CKEDITOR.tools.objectCompare(e.attributes, o.attributes, true) ? true : false;
                typeof a == "string" && (this._.cachedChecks[m] = b);
                return b
            }
        };
        var r = {
            styles: 1,
            attributes: 1,
            classes: 1
        }, C = {
                styles: "requiredStyles",
                attributes: "requiredAttributes",
                classes: "requiredClasses"
            }, y = /^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
            u = {
                styles: /{([^}]+)}/,
                attrs: /\[([^\]]+)\]/,
                classes: /\(([^\)]+)\)/
            }, x = CKEDITOR.filter.transformationsTools = {
                sizeToStyle: function (a) {
                    this.lengthToStyle(a,
                        "width");
                    this.lengthToStyle(a, "height")
                },
                sizeToAttribute: function (a) {
                    this.lengthToAttribute(a, "width");
                    this.lengthToAttribute(a, "height")
                },
                lengthToStyle: function (a, b, c) {
                    c = c || b;
                    if (!(c in a.styles)) {
                        var d = a.attributes[b];
                        if (d) {
                            /^\d+$/.test(d) && (d = d + "px");
                            a.styles[c] = d
                        }
                    }
                    delete a.attributes[b]
                },
                lengthToAttribute: function (a, b, c) {
                    c = c || b;
                    if (!(c in a.attributes)) {
                        var d = a.styles[b],
                            h = d && d.match(/^(\d+)(?:\.\d*)?px$/);
                        h ? a.attributes[c] = h[1] : d == A && (a.attributes[c] = A)
                    }
                    delete a.styles[b]
                },
                alignmentToStyle: function (a) {
                    if (!("float" in
                        a.styles)) {
                        var b = a.attributes.align;
                        if (b == "left" || b == "right") a.styles["float"] = b
                    }
                    delete a.attributes.align
                },
                alignmentToAttribute: function (a) {
                    if (!("align" in a.attributes)) {
                        var b = a.styles["float"];
                        if (b == "left" || b == "right") a.attributes.align = b
                    }
                    delete a.styles["float"]
                },
                matchesStyle: w,
                transform: function (a, b) {
                    if (typeof b == "string") a.name = b;
                    else {
                        var c = b.getDefinition(),
                            d = c.styles,
                            h = c.attributes,
                            e, f, m, g;
                        a.name = c.element;
                        for (e in h) if (e == "class") {
                                c = a.classes.join("|");
                                for (m = h[e].split(/\s+/); g = m.pop();) c.indexOf(g) == -1 && a.classes.push(g)
                            } else a.attributes[e] = h[e];
                        for (f in d) a.styles[f] = d[f]
                    }
                }
            }
    })();
    (function () {
        CKEDITOR.focusManager = function (b) {
            if (b.focusManager) return b.focusManager;
            this.hasFocus = false;
            this.currentActive = null;
            this._ = {
                editor: b
            };
            return this
        };
        CKEDITOR.focusManager._ = {
            blurDelay: 200
        };
        CKEDITOR.focusManager.prototype = {
            focus: function () {
                this._.timer && clearTimeout(this._.timer);
                if (!this.hasFocus && !this._.locked) {
                    var b = CKEDITOR.currentInstance;
                    b && b.focusManager.blur(1);
                    this.hasFocus = true;
                    (b = this._.editor.container) && b.addClass("cke_focus");
                    this._.editor.fire("focus")
                }
            },
            lock: function () {
                this._.locked =
                    1
            },
            unlock: function () {
                delete this._.locked
            },
            blur: function (b) {
                function c() {
                    if (this.hasFocus) {
                        this.hasFocus = false;
                        var a = this._.editor.container;
                        a && a.removeClass("cke_focus");
                        this._.editor.fire("blur")
                    }
                }
                if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer);
                    var a = CKEDITOR.focusManager._.blurDelay;
                    b || !a ? c.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () {
                        delete this._.timer;
                        c.call(this)
                    }, a, this)
                }
            },
            add: function (b, c) {
                var a = b.getCustomData("focusmanager");
                if (!a || a != this) {
                    a && a.remove(b);
                    var a =
                        "focus",
                        g = "blur";
                    if (c) if (CKEDITOR.env.ie) {
                            a = "focusin";
                            g = "focusout"
                        } else CKEDITOR.event.useCapture = 1;
                    var e = {
                        blur: function () {
                            b.equals(this.currentActive) && this.blur()
                        },
                        focus: function () {
                            this.currentActive = b;
                            this.focus()
                        }
                    };
                    b.on(a, e.focus, this);
                    b.on(g, e.blur, this);
                    if (c) CKEDITOR.event.useCapture = 0;
                    b.setCustomData("focusmanager", this);
                    b.setCustomData("focusmanager_handlers", e)
                }
            },
            remove: function (b) {
                b.removeCustomData("focusmanager");
                var c = b.removeCustomData("focusmanager_handlers");
                b.removeListener("blur",
                c.blur);
                b.removeListener("focus", c.focus)
            }
        }
    })();
    CKEDITOR.keystrokeHandler = function (b) {
        if (b.keystrokeHandler) return b.keystrokeHandler;
        this.keystrokes = {};
        this.blockedKeystrokes = {};
        this._ = {
            editor: b
        };
        return this
    };
    (function () {
        var b, c = function (a) {
                var a = a.data,
                    c = a.getKeystroke(),
                    d = this.keystrokes[c],
                    f = this._.editor;
                b = f.fire("key", {
                    keyCode: c
                }) === false;
                if (!b) {
                    d && (b = f.execCommand(d, {
                        from: "keystrokeHandler"
                    }) !== false);
                    b || (b = !! this.blockedKeystrokes[c])
                }
                b && a.preventDefault(true);
                return !b
            }, a = function (a) {
                if (b) {
                    b = false;
                    a.data.preventDefault(true)
                }
            };
        CKEDITOR.keystrokeHandler.prototype = {
            attach: function (b) {
                b.on("keydown", c, this);
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) b.on("keypress", a, this)
            }
        }
    })();
    (function () {
        CKEDITOR.lang = {
            languages: {
                af: 1,
                ar: 1,
                bg: 1,
                bn: 1,
                bs: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                "en-au": 1,
                "en-ca": 1,
                "en-gb": 1,
                en: 1,
                eo: 1,
                es: 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                "fr-ca": 1,
                fr: 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                is: 1,
                it: 1,
                ja: 1,
                ka: 1,
                km: 1,
                ko: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mn: 1,
                ms: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                "pt-br": 1,
                pt: 1,
                ro: 1,
                ru: 1,
                sk: 1,
                sl: 1,
                "sr-latn": 1,
                sr: 1,
                sv: 1,
                th: 1,
                tr: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1,
                zh: 1
            },
            load: function (b, c, a) {
                if (!b || !CKEDITOR.lang.languages[b]) b = this.detect(c, b);
                this[b] ? a(b, this[b]) : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" +
                    b + ".js"), function () {
                    a(b, this[b])
                }, this)
            },
            detect: function (b, c) {
                var a = this.languages,
                    c = c || navigator.userLanguage || navigator.language || b,
                    g = c.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                    e = g[1],
                    g = g[2];
                a[e + "-" + g] ? e = e + "-" + g : a[e] || (e = null);
                CKEDITOR.lang.detect = e ? function () {
                    return e
                } : function (a) {
                    return a
                };
                return e || b
            }
        }
    })();
    CKEDITOR.scriptLoader = function () {
        var b = {}, c = {};
        return {
            load: function (a, g, e, d) {
                var f = typeof a == "string";
                f && (a = [a]);
                e || (e = CKEDITOR);
                var i = a.length,
                    j = [],
                    l = [],
                    n = function (a) {
                        g && (f ? g.call(e, a) : g.call(e, j, l))
                    };
                if (i === 0) n(true);
                else {
                    var m = function (a, b) {
                        (b ? j : l).push(a);
                        if (--i <= 0) {
                            d && CKEDITOR.document.getDocumentElement().removeStyle("cursor");
                            n(b)
                        }
                    }, o = function (a, d) {
                            b[a] = 1;
                            var h = c[a];
                            delete c[a];
                            for (var e = 0; e < h.length; e++) h[e](a, d)
                        }, k = function (a) {
                            if (b[a]) m(a, true);
                            else {
                                var d = c[a] || (c[a] = []);
                                d.push(m);
                                if (!(d.length >
                                    1)) {
                                    var h = new CKEDITOR.dom.element("script");
                                    h.setAttributes({
                                        type: "text/javascript",
                                        src: a
                                    });
                                    if (g) if (CKEDITOR.env.ie) h.$.onreadystatechange = function () {
                                                if (h.$.readyState == "loaded" || h.$.readyState == "complete") {
                                                    h.$.onreadystatechange = null;
                                                    o(a, true)
                                                }
                                        };
                                        else {
                                            h.$.onload = function () {
                                                setTimeout(function () {
                                                    o(a, true)
                                                }, 0)
                                            };
                                            h.$.onerror = function () {
                                                o(a, false)
                                            }
                                        }
                                    h.appendTo(CKEDITOR.document.getHead())
                                }
                            }
                        };
                    d && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                    for (var h = 0; h < i; h++) k(a[h])
                }
            }
        }
    }();
    CKEDITOR.resourceManager = function (b, c) {
        this.basePath = b;
        this.fileName = c;
        this.registered = {};
        this.loaded = {};
        this.externals = {};
        this._ = {
            waitingList: {}
        }
    };
    CKEDITOR.resourceManager.prototype = {
        add: function (b, c) {
            if (this.registered[b]) throw '[CKEDITOR.resourceManager.add] The resource name "' + b + '" is already registered.';
            var a = this.registered[b] = c || {};
            a.name = b;
            a.path = this.getPath(b);
            CKEDITOR.fire(b + CKEDITOR.tools.capitalize(this.fileName) + "Ready", a);
            return this.get(b)
        },
        get: function (b) {
            return this.registered[b] || null
        },
        getPath: function (b) {
            var c = this.externals[b];
            return CKEDITOR.getUrl(c && c.dir || this.basePath + b + "/")
        },
        getFilePath: function (b) {
            var c = this.externals[b];
            return CKEDITOR.getUrl(this.getPath(b) + (c && typeof c.file == "string" ? c.file : this.fileName + ".js"))
        },
        addExternal: function (b, c, a) {
            for (var b = b.split(","), g = 0; g < b.length; g++) this.externals[b[g]] = {
                    dir: c,
                    file: a
            }
        },
        load: function (b, c, a) {
            CKEDITOR.tools.isArray(b) || (b = b ? [b] : []);
            for (var g = this.loaded, e = this.registered, d = [], f = {}, i = {}, j = 0; j < b.length; j++) {
                var l = b[j];
                if (l) if (!g[l] && !e[l]) {
                        var n = this.getFilePath(l);
                        d.push(n);
                        n in f || (f[n] = []);
                        f[n].push(l)
                    } else i[l] = this.get(l)
            }
            CKEDITOR.scriptLoader.load(d, function (b,
            d) {
                if (d.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + f[d[0]].join(",") + '" was not found at "' + d[0] + '".';
                for (var e = 0; e < b.length; e++) for (var h = f[b[e]], s = 0; s < h.length; s++) {
                        var w = h[s];
                        i[w] = this.get(w);
                        g[w] = 1
                }
                c.call(a, i)
            }, this)
        }
    };
    CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin");
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (b) {
        var c = {};
        return function (a, g, e) {
            var d = {}, f = function (a) {
                    b.call(this, a, function (a) {
                        CKEDITOR.tools.extend(d, a);
                        var b = [],
                            i;
                        for (i in a) {
                            var m = a[i],
                                o = m && m.requires;
                            if (!c[i]) {
                                if (m.icons) for (var k = m.icons.split(","), h = 0; h < k.length; h++) CKEDITOR.skin.addIcon(k[h], m.path + "icons/" + k[h] + ".png");
                                c[i] = 1
                            }
                            if (o) {
                                o.split && (o = o.split(","));
                                for (m = 0; m < o.length; m++) d[o[m]] || b.push(o[m])
                            }
                        }
                        if (b.length) f.call(this, b);
                        else {
                            for (i in d) {
                                m = d[i];
                                if (m.onLoad && !m.onLoad._called) {
                                    m.onLoad() === false && delete d[i];
                                    m.onLoad._called = 1
                                }
                            }
                            g && g.call(e || window, d)
                        }
                    }, this)
                };
            f.call(this, a)
        }
    });
    CKEDITOR.plugins.setLang = function (b, c, a) {
        var g = this.get(b),
            b = g.langEntries || (g.langEntries = {}),
            g = g.lang || (g.lang = []);
        g.split && (g = g.split(","));
        CKEDITOR.tools.indexOf(g, c) == -1 && g.push(c);
        b[c] = a
    };
    CKEDITOR.ui = function (b) {
        if (b.ui) return b.ui;
        this.items = {};
        this.instances = {};
        this.editor = b;
        this._ = {
            handlers: {}
        };
        return this
    };
    CKEDITOR.ui.prototype = {
        add: function (b, c, a) {
            a.name = b.toLowerCase();
            var g = this.items[b] = {
                type: c,
                command: a.command || null,
                args: Array.prototype.slice.call(arguments, 2)
            };
            CKEDITOR.tools.extend(g, a)
        },
        get: function (b) {
            return this.instances[b]
        },
        create: function (b) {
            var c = this.items[b],
                a = c && this._.handlers[c.type],
                g = c && c.command && this.editor.getCommand(c.command),
                a = a && a.create.apply(this, c.args);
            this.instances[b] = a;
            g && g.uiItems.push(a);
            if (a && !a.type) a.type = c.type;
            return a
        },
        addHandler: function (b, c) {
            this._.handlers[b] =
                c
        },
        space: function (b) {
            return CKEDITOR.document.getById(this.spaceId(b))
        },
        spaceId: function (b) {
            return this.editor.id + "_" + b
        }
    };
    CKEDITOR.event.implementOn(CKEDITOR.ui);
    (function () {
        function b(b, d, m) {
            CKEDITOR.event.call(this);
            b = b && CKEDITOR.tools.clone(b);
            if (d !== void 0) {
                if (d instanceof CKEDITOR.dom.element) {
                    if (!m) throw Error("One of the element mode must be specified.");
                } else throw Error("Expect element of type CKEDITOR.dom.element.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && m == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                if (m == CKEDITOR.ELEMENT_MODE_INLINE && !d.is(CKEDITOR.dtd.$editable) || m == CKEDITOR.ELEMENT_MODE_REPLACE &&
                    d.is(CKEDITOR.dtd.$nonBodyContent)) throw Error('The specified element mode is not supported on element: "' + d.getName() + '".');
                this.element = d;
                this.elementMode = m;
                this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (d.getId() || d.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {};
            this.commands = {};
            this.templates = {};
            this.name = this.name || c();
            this.id = CKEDITOR.tools.getNextId();
            this.status = "unloaded";
            this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
            this.ui = new CKEDITOR.ui(this);
            this.focusManager = new CKEDITOR.focusManager(this);
            this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
            this.on("readOnly", a);
            this.on("selectionChange", e);
            this.on("instanceReady", function () {
                a.call(this);
                this.on("mode", a);
                this.config.startupFocus && this.focus()
            });
            CKEDITOR.fire("instanceCreated", null, this);
            CKEDITOR.add(this);
            CKEDITOR.tools.setTimeout(function () {
                f(this, b)
            }, 0, this)
        }
        function c() {
            do var a = "editor" + ++o; while (CKEDITOR.instances[a]);
            return a
        }
        function a() {
            var a = this.commands;
            if (this.mode) for (var b in a) g(this,
                    a[b])
        }
        function g(a, b) {
            b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
        }
        function e(a) {
            var b = this.commands,
                c = a.editor,
                d = a.data.path,
                e;
            for (e in b) {
                a = b[e];
                a.contextSensitive && a.refresh(c, d)
            }
        }
        function d(a) {
            var b = a.config.customConfig;
            if (!b) return false;
            var b = CKEDITOR.getUrl(b),
                c = k[b] || (k[b] = {});
            if (c.fn) {
                c.fn.call(a, a.config);
                (CKEDITOR.getUrl(a.config.customConfig) == b || !d(a)) && a.fireOnce("customConfigLoaded")
            } else CKEDITOR.scriptLoader.load(b, function () {
                    c.fn =
                        CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () {};
                    d(a)
                });
            return true
        }
        function f(a, b) {
            a.on("customConfigLoaded", function () {
                if (b) {
                    if (b.on) for (var c in b.on) a.on(c, b.on[c]);
                    CKEDITOR.tools.extend(a.config, b, true);
                    delete a.config.on
                }
                a.readOnly = !(!a.config.readOnly && !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && a.element.getAttribute("disabled")));
                a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !CKEDITOR.dtd[a.element.getName()].p;
                a.tabIndex = a.config.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                if (a.config.skin) CKEDITOR.skinName = a.config.skin;
                a.fireOnce("configLoaded");
                a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
                a.filter = new CKEDITOR.filter(a);
                i(a)
            });
            if (b && b.customConfig != void 0) a.config.customConfig = b.customConfig;
            d(a) || a.fireOnce("customConfigLoaded")
        }
        function i(a) {
            CKEDITOR.skin.loadPart("editor", function () {
                j(a)
            })
        }
        function j(a) {
            CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, c) {
                a.langCode =
                    b;
                a.lang = CKEDITOR.tools.prototypedCopy(c);
                if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.lang.dir == "rtl") a.lang.dir = "ltr";
                if (!a.config.contentsLangDirection) a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir;
                a.fire("langLoaded");
                l(a)
            })
        }
        function l(a) {
            a.getStylesSet(function (b) {
                a.once("loaded", function () {
                    a.fire("stylesSet", {
                        styles: b
                    })
                }, null, null, 1);
                n(a)
            })
        }
        function n(a) {
            var b = a.config,
                c = b.plugins,
                d = b.extraPlugins,
                e = b.removePlugins;
            if (d) var f =
                    RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
            c = c.replace(f, ""), c = c + ("," + d);
            if (e) var m = RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"),
            c = c.replace(m, "");
            CKEDITOR.env.air && (c = c + ",adobeair");
            CKEDITOR.plugins.load(c.split(","), function (c) {
                var d = [],
                    e = [],
                    f = [];
                a.plugins = c;
                for (var o in c) {
                    var g = c[o],
                        k = g.lang,
                        i = null,
                        j = g.requires,
                        w;
                    CKEDITOR.tools.isArray(j) && (j = j.join(","));
                    if (j && (w = j.match(m))) for (; j = w.pop();) CKEDITOR.tools.setTimeout(function (a, b) {
                                throw Error('Plugin "' + a.replace(",",
                                    "") + '" cannot be removed from the plugins list, because it\'s required by "' + b + '" plugin.');
                            }, 0, null, [j, o]);
                    if (k && !a.lang[o]) {
                        k.split && (k = k.split(","));
                        if (CKEDITOR.tools.indexOf(k, a.langCode) >= 0) i = a.langCode;
                        else {
                            i = a.langCode.replace(/-.*/, "");
                            i = i != a.langCode && CKEDITOR.tools.indexOf(k, i) >= 0 ? i : CKEDITOR.tools.indexOf(k, "en") >= 0 ? "en" : k[0]
                        }
                        if (!g.langEntries || !g.langEntries[i]) f.push(CKEDITOR.getUrl(g.path + "lang/" + i + ".js"));
                        else {
                            a.lang[o] = g.langEntries[i];
                            i = null
                        }
                    }
                    e.push(i);
                    d.push(g)
                }
                CKEDITOR.scriptLoader.load(f,

                function () {
                    for (var c = ["beforeInit", "init", "afterInit"], f = 0; f < c.length; f++) for (var m = 0; m < d.length; m++) {
                            var g = d[m];
                            f === 0 && (e[m] && g.lang && g.langEntries) && (a.lang[g.name] = g.langEntries[e[m]]);
                            if (g[c[f]]) g[c[f]](a)
                    }
                    a.fireOnce("pluginsLoaded");
                    b.keystrokes && a.setKeystroke(a.config.keystrokes);
                    for (m = 0; m < a.config.blockedKeystrokes.length; m++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[m]] = 1;
                    a.status = "loaded";
                    a.fireOnce("loaded");
                    CKEDITOR.fire("instanceLoaded", null, a)
                })
            })
        }
        function m() {
            var a =
                this.element;
            if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var b = this.getData();
                this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                return true
            }
            return false
        }
        b.prototype = CKEDITOR.editor.prototype;
        CKEDITOR.editor = b;
        var o = 0,
            k = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function (a, b) {
                b.name = a.toLowerCase();
                var c = new CKEDITOR.command(this, b);
                this.status == "ready" && this.mode && g(this, c);
                return this.commands[a] = c
            },
            destroy: function (a) {
                this.fire("beforeDestroy");
                !a && m.call(this);
                this.editable(null);
                this.status = "destroyed";
                this.fire("destroy");
                this.removeAllListeners();
                CKEDITOR.remove(this);
                CKEDITOR.fire("instanceDestroyed", null, this)
            },
            elementPath: function (a) {
                return (a = a || this.getSelection().getStartElement()) ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
            },
            createRange: function () {
                var a = this.editable();
                return a ? new CKEDITOR.dom.range(a) : null
            },
            execCommand: function (a, b) {
                var c = this.getCommand(a),
                    d = {
                        name: a,
                        commandData: b,
                        command: c
                    };
                if (c && c.state != CKEDITOR.TRISTATE_DISABLED &&
                    this.fire("beforeCommandExec", d) !== true) {
                    d.returnValue = c.exec(d.commandData);
                    if (!c.async && this.fire("afterCommandExec", d) !== true) return d.returnValue
                }
                return false
            },
            getCommand: function (a) {
                return this.commands[a]
            },
            getData: function (a) {
                !a && this.fire("beforeGetData");
                var b = this._.data;
                if (typeof b != "string") b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "";
                b = {
                    dataValue: b
                };
                !a && this.fire("getData", b);
                return b.dataValue
            },
            getSnapshot: function () {
                var a =
                    this.fire("getSnapshot");
                if (typeof a != "string") {
                    var b = this.element;
                    b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a = b.is("textarea") ? b.getValue() : b.getHtml())
                }
                return a
            },
            loadSnapshot: function (a) {
                this.fire("loadSnapshot", a)
            },
            setData: function (a, b, c) {
                if (b) this.on("dataReady", function (a) {
                        a.removeListener();
                        b.call(a.editor)
                    });
                a = {
                    dataValue: a
                };
                !c && this.fire("setData", a);
                this._.data = a.dataValue;
                !c && this.fire("afterSetData", a)
            },
            setReadOnly: function (a) {
                a = a == void 0 || a;
                if (this.readOnly != a) {
                    this.readOnly =
                        a;
                    this.editable().setReadOnly(a);
                    this.fire("readOnly")
                }
            },
            insertHtml: function (a, b) {
                this.fire("insertHtml", {
                    dataValue: a,
                    mode: b
                })
            },
            insertText: function (a) {
                this.fire("insertText", a)
            },
            insertElement: function (a) {
                this.fire("insertElement", a)
            },
            focus: function () {
                this.fire("beforeFocus")
            },
            checkDirty: function () {
                return this.status == "ready" && this._.previousValue !== this.getSnapshot()
            },
            resetDirty: function () {
                this._.previousValue = this.getSnapshot()
            },
            updateElement: function () {
                return m.call(this)
            },
            setKeystroke: function () {
                for (var a =
                    this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
                        [].slice.call(arguments, 0)
                    ], c, d, e = b.length; e--;) {
                    c = b[e];
                    d = 0;
                    if (CKEDITOR.tools.isArray(c)) {
                        d = c[1];
                        c = c[0]
                    }
                    d ? a[c] = d : delete a[c]
                }
            },
            addFeature: function (a) {
                return this.filter.addFeature(a)
            }
        })
    })();
    CKEDITOR.ELEMENT_MODE_NONE = 0;
    CKEDITOR.ELEMENT_MODE_REPLACE = 1;
    CKEDITOR.ELEMENT_MODE_APPENDTO = 2;
    CKEDITOR.ELEMENT_MODE_INLINE = 3;
    CKEDITOR.htmlParser = function () {
        this._ = {
            htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)--\>)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))", "g")
        }
    };
    (function () {
        var b = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
            c = {
                checked: 1,
                compact: 1,
                declare: 1,
                defer: 1,
                disabled: 1,
                ismap: 1,
                multiple: 1,
                nohref: 1,
                noresize: 1,
                noshade: 1,
                nowrap: 1,
                readonly: 1,
                selected: 1
            };
        CKEDITOR.htmlParser.prototype = {
            onTagOpen: function () {},
            onTagClose: function () {},
            onText: function () {},
            onCDATA: function () {},
            onComment: function () {},
            parse: function (a) {
                for (var g, e, d = 0, f; g = this._.htmlPartsRegex.exec(a);) {
                    e = g.index;
                    if (e > d) {
                        d = a.substring(d, e);
                        if (f) f.push(d);
                        else this.onText(d)
                    }
                    d =
                        this._.htmlPartsRegex.lastIndex;
                    if (e = g[1]) {
                        e = e.toLowerCase();
                        if (f && CKEDITOR.dtd.$cdata[e]) {
                            this.onCDATA(f.join(""));
                            f = null
                        }
                        if (!f) {
                            this.onTagClose(e);
                            continue
                        }
                    }
                    if (f) f.push(g[0]);
                    else if (e = g[3]) {
                        e = e.toLowerCase();
                        if (!/="/.test(e)) {
                            var i = {}, j;
                            g = g[4];
                            var l = !! (g && g.charAt(g.length - 1) == "/");
                            if (g) for (; j = b.exec(g);) {
                                    var n = j[1].toLowerCase();
                                    j = j[2] || j[3] || j[4] || "";
                                    i[n] = !j && c[n] ? n : j
                            }
                            this.onTagOpen(e, i, l);
                            !f && CKEDITOR.dtd.$cdata[e] && (f = [])
                        }
                    } else if (e = g[2]) this.onComment(e)
                }
                if (a.length > d) this.onText(a.substring(d,
                    a.length))
            }
        }
    })();
    CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function () {
            this._ = {
                output: []
            }
        },
        proto: {
            openTag: function (b) {
                this._.output.push("<", b)
            },
            openTagClose: function (b, c) {
                c ? this._.output.push(" />") : this._.output.push(">")
            },
            attribute: function (b, c) {
                typeof c == "string" && (c = CKEDITOR.tools.htmlEncodeAttr(c));
                this._.output.push(" ", b, '="', c, '"')
            },
            closeTag: function (b) {
                this._.output.push("</", b, ">")
            },
            text: function (b) {
                this._.output.push(b)
            },
            comment: function (b) {
                this._.output.push("<\!--", b, "--\>")
            },
            write: function (b) {
                this._.output.push(b)
            },
            reset: function () {
                this._.output = [];
                this._.indent = false
            },
            getHtml: function (b) {
                var c = this._.output.join("");
                b && this.reset();
                return c
            }
        }
    });
    "use strict";
    (function () {
        CKEDITOR.htmlParser.node = function () {};
        CKEDITOR.htmlParser.node.prototype = {
            remove: function () {
                var b = this.parent.children,
                    c = CKEDITOR.tools.indexOf(b, this),
                    a = this.previous,
                    g = this.next;
                a && (a.next = g);
                g && (g.previous = a);
                b.splice(c, 1);
                this.parent = null
            },
            replaceWith: function (b) {
                var c = this.parent.children,
                    a = CKEDITOR.tools.indexOf(c, this),
                    g = b.previous = this.previous,
                    e = b.next = this.next;
                g && (g.next = b);
                e && (e.previous = b);
                c[a] = b;
                b.parent = this.parent;
                this.parent = null
            },
            insertAfter: function (b) {
                var c = b.parent.children,
                    a = CKEDITOR.tools.indexOf(c, b),
                    g = b.next;
                c.splice(a + 1, 0, this);
                this.next = b.next;
                this.previous = b;
                b.next = this;
                g && (g.previous = this);
                this.parent = b.parent
            },
            insertBefore: function (b) {
                var c = b.parent.children,
                    a = CKEDITOR.tools.indexOf(c, b);
                c.splice(a, 0, this);
                this.next = b;
                (this.previous = b.previous) && (b.previous.next = this);
                b.previous = this;
                this.parent = b.parent
            }
        }
    })();
    "use strict";
    CKEDITOR.htmlParser.comment = function (b) {
        this.value = b;
        this._ = {
            isBlockLike: false
        }
    };
    CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_COMMENT,
        filter: function (b) {
            var c = this.value;
            if (!(c = b.onComment(c, this))) {
                this.remove();
                return false
            }
            if (typeof c != "string") {
                this.replaceWith(c);
                return false
            }
            this.value = c;
            return true
        },
        writeHtml: function (b, c) {
            c && this.filter(c);
            b.comment(this.value)
        }
    });
    "use strict";
    (function () {
        CKEDITOR.htmlParser.text = function (b) {
            this.value = b;
            this._ = {
                isBlockLike: false
            }
        };
        CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function (b) {
                if (!(this.value = b.onText(this.value, this))) {
                    this.remove();
                    return false
                }
            },
            writeHtml: function (b, c) {
                c && this.filter(c);
                b.text(this.value)
            }
        })
    })();
    "use strict";
    (function () {
        CKEDITOR.htmlParser.cdata = function (b) {
            this.value = b
        };
        CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function () {},
            writeHtml: function (b) {
                b.write(this.value)
            }
        })
    })();
    "use strict";
    CKEDITOR.htmlParser.fragment = function () {
        this.children = [];
        this.parent = null;
        this._ = {
            isBlockLike: true,
            hasInlineStarted: false
        }
    };
    (function () {
        function b(a) {
            return a.name == "a" && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
        }
        var c = CKEDITOR.tools.extend({
            table: 1,
            ul: 1,
            ol: 1,
            dl: 1
        }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
            a = {
                ol: 1,
                ul: 1
            }, g = CKEDITOR.tools.extend({}, {
                html: 1
            }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
                style: 1,
                script: 1
            });
        CKEDITOR.htmlParser.fragment.fromHtml = function (e, d, f) {
            function i(a) {
                var b;
                if (s.length > 0) for (var c = 0; c < s.length; c++) {
                        var d = s[c],
                            e = d.name,
                            f = CKEDITOR.dtd[e],
                            m = v.name &&
                                CKEDITOR.dtd[v.name];
                        if ((!m || m[e]) && (!a || !f || f[a] || !CKEDITOR.dtd[a])) {
                            if (!b) {
                                j();
                                b = 1
                            }
                            d = d.clone();
                            d.parent = v;
                            v = d;
                            s.splice(c, 1);
                            c--
                        } else if (e == v.name) {
                            n(v, v.parent, 1);
                            c--
                        }
                }
            }
            function j() {
                for (; w.length;) n(w.shift(), v)
            }
            function l(a) {
                if (a._.isBlockLike && a.name != "pre" && a.name != "textarea") {
                    var b = a.children.length,
                        c = a.children[b - 1],
                        d;
                    if (c && c.type == CKEDITOR.NODE_TEXT)(d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1
                }
            }
            function n(a, c, d) {
                var c = c || v || h,
                    e = v;
                if (a.previous === void 0) {
                    if (m(c, a)) {
                        v = c;
                        k.onTagOpen(f, {});
                        a.returnPoint = c = v
                    }
                    l(a);
                    (!b(a) || a.children.length) && c.add(a);
                    a.name == "pre" && (F = false);
                    a.name == "textarea" && (t = false)
                }
                if (a.returnPoint) {
                    v = a.returnPoint;
                    delete a.returnPoint
                } else v = d ? c : e
            }
            function m(a, b) {
                if ((a == h || a.name == "body") && f && (!a.name || CKEDITOR.dtd[a.name][f])) {
                    var c, d;
                    return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                }
            }
            function o(a, b) {
                return a in CKEDITOR.dtd.$listItem ||
                    a in CKEDITOR.dtd.$tableContent ? a == b || a == "dt" && b == "dd" || a == "dd" && b == "dt" : false
            }
            var k = new CKEDITOR.htmlParser,
                h = d instanceof CKEDITOR.htmlParser.element ? d : typeof d == "string" ? new CKEDITOR.htmlParser.element(d) : new CKEDITOR.htmlParser.fragment,
                s = [],
                w = [],
                v = h,
                t = h.name == "textarea",
                F = h.name == "pre";
            k.onTagOpen = function (d, e, f, m) {
                e = new CKEDITOR.htmlParser.element(d, e);
                if (e.isUnknown && f) e.isEmpty = true;
                e.isOptionalClose = m;
                if (b(e)) s.push(e);
                else {
                    if (d == "pre") F = true;
                    else {
                        if (d == "br" && F) {
                            v.add(new CKEDITOR.htmlParser.text("\n"));
                            return
                        }
                        d == "textarea" && (t = true)
                    }
                    if (d == "br") w.push(e);
                    else {
                        for (;;) {
                            m = (f = v.name) ? CKEDITOR.dtd[f] || (v._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : g;
                            if (!e.isUnknown && !v.isUnknown && !m[d]) if (v.isOptionalClose) k.onTagClose(f);
                                else if (d in a && f in a) {
                                f = v.children;
                                (f = f[f.length - 1]) && f.name == "li" || n(f = new CKEDITOR.htmlParser.element("li"), v);
                                !e.returnPoint && (e.returnPoint = v);
                                v = f
                            } else if (d in CKEDITOR.dtd.$listItem && !o(d, f)) k.onTagOpen(d == "li" ? "ul" : "dl", {}, 0, 1);
                            else if (f in c && !o(d, f)) {
                                !e.returnPoint &&
                                    (e.returnPoint = v);
                                v = v.parent
                            } else {
                                f in CKEDITOR.dtd.$inline && s.unshift(v);
                                if (v.parent) n(v, v.parent, 1);
                                else {
                                    e.isOrphan = 1;
                                    break
                                }
                            } else break
                        }
                        i(d);
                        j();
                        e.parent = v;
                        e.isEmpty ? n(e) : v = e
                    }
                }
            };
            k.onTagClose = function (a) {
                for (var b = s.length - 1; b >= 0; b--) if (a == s[b].name) {
                        s.splice(b, 1);
                        return
                    }
                for (var c = [], d = [], e = v; e != h && e.name != a;) {
                    e._.isBlockLike || d.unshift(e);
                    c.push(e);
                    e = e.returnPoint || e.parent
                }
                if (e != h) {
                    for (b = 0; b < c.length; b++) {
                        var m = c[b];
                        n(m, m.parent)
                    }
                    v = e;
                    e._.isBlockLike && j();
                    n(e, e.parent);
                    if (e == v) v = v.parent;
                    s = s.concat(d)
                }
                a ==
                    "body" && (f = false)
            };
            k.onText = function (b) {
                if ((!v._.hasInlineStarted || w.length) && !F && !t) {
                    b = CKEDITOR.tools.ltrim(b);
                    if (b.length === 0) return
                }
                var d = v.name,
                    e = d ? CKEDITOR.dtd[d] || (v._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : g;
                if (!t && !e["#"] && d in c) {
                    k.onTagOpen(d in a ? "li" : d == "dl" ? "dd" : d == "table" ? "tr" : d == "tr" ? "td" : "");
                    k.onText(b)
                } else {
                    j();
                    i();
                    !F && !t && (b = b.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                    b = new CKEDITOR.htmlParser.text(b);
                    if (m(v, b)) this.onTagOpen(f, {}, 0, 1);
                    v.add(b)
                }
            };
            k.onCDATA = function (a) {
                v.add(new CKEDITOR.htmlParser.cdata(a))
            };
            k.onComment = function (a) {
                j();
                i();
                v.add(new CKEDITOR.htmlParser.comment(a))
            };
            k.parse(e);
            for (j(!CKEDITOR.env.ie && 1); v != h;) n(v, v.parent, 1);
            l(h);
            return h
        };
        CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
            add: function (a, b) {
                isNaN(b) && (b = this.children.length);
                var c = b > 0 ? this.children[b - 1] : null;
                if (c) {
                    if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT) {
                        c.value = CKEDITOR.tools.rtrim(c.value);
                        if (c.value.length === 0) {
                            this.children.pop();
                            this.add(a);
                            return
                        }
                    }
                    c.next = a
                }
                a.previous = c;
                a.parent = this;
                this.children.splice(b, 0, a);
                if (!this._.hasInlineStarted) this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike
            },
            filter: function (a) {
                a.onRoot(this);
                this.filterChildren(a)
            },
            filterChildren: function (a, b) {
                if (this.childrenFilteredBy != a.id) {
                    if (b && !this.parent) a.onRoot(this);
                    this.childrenFilteredBy = a.id;
                    for (var c = 0; c < this.children.length; c++) this.children[c].filter(a) === false && c--
                }
            },
            writeHtml: function (a, b) {
                b && this.filter(b);
                this.writeChildrenHtml(a)
            },
            writeChildrenHtml: function (a,
            b, c) {
                if (c && !this.parent && b) b.onRoot(this);
                b && this.filterChildren(b);
                for (var b = 0, c = this.children, g = c.length; b < g; b++) c[b].writeHtml(a)
            },
            forEach: function (a, b, c) {
                !c && (!b || this.type == b) && a(this);
                for (var c = this.children, g, j = 0, l = c.length; j < l; j++) {
                    g = c[j];
                    g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : (!b || g.type == b) && a(g)
                }
            }
        }
    })();
    (function () {
        function b(a, b) {
            for (var c = 0; a && c < b.length; c++) var e = b[c],
            a = a.replace(e[0], e[1]);
            return a
        }
        function c(a, b, c) {
            typeof b == "function" && (b = [b]);
            var e, g;
            g = a.length;
            var n = b && b.length;
            if (n) {
                for (e = 0; e < g && a[e].pri <= c; e++);
                for (g = n - 1; g >= 0; g--) if (n = b[g]) {
                        n.pri = c;
                        a.splice(e, 0, n)
                    }
            }
        }
        function a(a, b, c) {
            if (b) for (var e in b) {
                    var l = a[e];
                    a[e] = g(l, b[e], c);
                    l || a.$length++
            }
        }
        function g(a, b, g) {
            if (b) {
                b.pri = g;
                if (a) {
                    if (a.splice) c(a, b, g);
                    else {
                        a = a.pri > g ? [b, a] : [a, b];
                        a.filter = e
                    }
                    return a
                }
                return b.filter = b
            }
        }
        function e(a) {
            for (var b =
                a.type || a instanceof CKEDITOR.htmlParser.fragment, c = 0; c < this.length; c++) {
                if (b) var e = a.type,
                g = a.name;
                var n = this[c].apply(window, arguments);
                if (n === false) return n;
                if (b) {
                    if (n && (n.name != g || n.type != e)) return n
                } else if (typeof n != "string") return n;
                n != void 0 && (a = n)
            }
            return a
        }
        CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function (a) {
                this.id = CKEDITOR.tools.getNextNumber();
                this._ = {
                    elementNames: [],
                    attributeNames: [],
                    elements: {
                        $length: 0
                    },
                    attributes: {
                        $length: 0
                    }
                };
                a && this.addRules(a, 10)
            },
            proto: {
                addRules: function (b,
                e) {
                    typeof e != "number" && (e = 10);
                    c(this._.elementNames, b.elementNames, e);
                    c(this._.attributeNames, b.attributeNames, e);
                    a(this._.elements, b.elements, e);
                    a(this._.attributes, b.attributes, e);
                    this._.text = g(this._.text, b.text, e) || this._.text;
                    this._.comment = g(this._.comment, b.comment, e) || this._.comment;
                    this._.root = g(this._.root, b.root, e) || this._.root
                },
                applyTo: function (a) {
                    a.filter(this)
                },
                onElementName: function (a) {
                    return b(a, this._.elementNames)
                },
                onAttributeName: function (a) {
                    return b(a, this._.attributeNames)
                },
                onText: function (a) {
                    var b =
                        this._.text;
                    return b ? b.filter(a) : a
                },
                onComment: function (a, b) {
                    var c = this._.comment;
                    return c ? c.filter(a, b) : a
                },
                onRoot: function (a) {
                    var b = this._.root;
                    return b ? b.filter(a) : a
                },
                onElement: function (a) {
                    for (var b = [this._.elements["^"], this._.elements[a.name], this._.elements.$], c, e = 0; e < 3; e++) if (c = b[e]) {
                            c = c.filter(a, this);
                            if (c === false) return null;
                            if (c && c != a) return this.onNode(c);
                            if (a.parent && !a.name) break
                        }
                    return a
                },
                onNode: function (a) {
                    var b = a.type;
                    return b == CKEDITOR.NODE_ELEMENT ? this.onElement(a) : b == CKEDITOR.NODE_TEXT ?
                        new CKEDITOR.htmlParser.text(this.onText(a.value)) : b == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a.value)) : null
                },
                onAttribute: function (a, b, c) {
                    if (b = this._.attributes[b]) {
                        a = b.filter(c, a, this);
                        if (a === false) return false;
                        if (typeof a != "undefined") return a
                    }
                    return c
                }
            }
        })
    })();
    (function () {
        function b(b, c) {
            function m(a) {
                return a || CKEDITOR.env.ie ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
                    "data-cke-bogus": 1
                })
            }
            function h(b, c) {
                return function (e) {
                    if (e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var h = [],
                            f = a(e),
                            k, i;
                        if (f) for (o(f, 1) && h.push(f); f;) {
                                if (d(f) && (k = g(f)) && o(k)) if ((i = g(k)) && !d(i)) h.push(k);
                                    else {
                                        var s = k,
                                            w = m(u),
                                            D = s.parent.children,
                                            l = CKEDITOR.tools.indexOf(D, s);
                                        D.splice(l + 1, 0, w);
                                        D = s.next;
                                        s.next = w;
                                        w.previous = s;
                                        w.parent = s.parent;
                                        w.next = D;
                                        j(k)
                                    }
                                f = f.previous
                        }
                        for (f =
                            0; f < h.length; f++) j(h[f]);
                        if (h = CKEDITOR.env.opera && !b || (typeof c == "function" ? c(e) !== false : c)) if (!u && CKEDITOR.env.ie && e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) h = false;
                            else if (!u && CKEDITOR.env.ie && (document.documentMode > 7 || e.name in CKEDITOR.dtd.tr || e.name in CKEDITOR.dtd.$listItem)) h = false;
                        else {
                            h = a(e);
                            h = !h || e.name == "form" && h.name == "input"
                        }
                        h && e.add(m(b))
                    }
                }
            }
            function o(a, b) {
                if ((!u || !CKEDITOR.env.ie) && a.type == CKEDITOR.NODE_ELEMENT && a.name == "br" && !a.attributes["data-cke-eol"]) return true;
                var c;
                if (a.type ==
                    CKEDITOR.NODE_TEXT && (c = a.value.match(F))) {
                    if (c.index) {
                        f(a, new CKEDITOR.htmlParser.text(a.value.substring(0, c.index)));
                        a.value = c[0]
                    }
                    if (CKEDITOR.env.ie && u && (!b || a.parent.name in s)) return true;
                    if (!u) if ((c = a.previous) && c.name == "br" || !c || d(c)) return true
                }
                return false
            }
            var k = {
                elements: {}
            }, u = c == "html",
                s = CKEDITOR.tools.extend({}, A),
                w;
            for (w in s) "#" in q[w] || delete s[w];
            for (w in s) k.elements[w] = h(u, b.config.fillEmptyBlocks !== false);
            k.root = h(u);
            k.elements.br = function (a) {
                return function (b) {
                    if (b.parent.type !=
                        CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var c = b.attributes;
                        if ("data-cke-bogus" in c || "data-cke-eol" in c) delete c["data-cke-bogus"];
                        else {
                            for (c = b.next; c && e(c);) c = c.next;
                            var h = g(b);
                            !c && d(b.parent) ? i(b.parent, m(a)) : d(c) && (h && !d(h)) && f(c, m(a))
                        }
                    }
                }
            }(u);
            return k
        }
        function c(a) {
            return a.enterMode != CKEDITOR.ENTER_BR && a.autoParagraph !== false ? a.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false
        }
        function a(a) {
            for (a = a.children[a.children.length - 1]; a && e(a);) a = a.previous;
            return a
        }
        function g(a) {
            for (a = a.previous; a && e(a);) a = a.previous;
            return a
        }
        function e(a) {
            return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
        }
        function d(a) {
            return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in A || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        }
        function f(a, b) {
            var c = a.parent.children,
                d = CKEDITOR.tools.indexOf(c, a);
            c.splice(d, 0, b);
            c = a.previous;
            a.previous = b;
            b.next = a;
            b.parent = a.parent;
            if (c) {
                b.previous = c;
                c.next = b
            }
        }
        function i(a, b) {
            var c = a.children[a.children.length - 1];
            a.children.push(b);
            b.parent = a;
            if (c) {
                c.next = b;
                b.previous = c
            }
        }
        function j(a) {
            var b = a.parent.children,
                c = CKEDITOR.tools.indexOf(b, a),
                d = a.previous,
                a = a.next;
            d && (d.next = a);
            a && (a.previous = d);
            b.splice(c, 1)
        }
        function l(a) {
            var b = a.parent;
            return b ? CKEDITOR.tools.indexOf(b.children, a) : -1
        }
        function n(a) {
            a = a.attributes;
            a.contenteditable != "false" && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
            a.contenteditable = "false"
        }
        function m(a) {
            a = a.attributes;
            switch (a["data-cke-editable"]) {
                case "true":
                    a.contenteditable = "true";
                    break;
                case "1":
                    delete a.contenteditable
            }
        }

        function o(a) {
            return a.replace(u, function (a, b, c) {
                return "<" + b + c.replace(x, function (a, b) {
                    return !/^on/.test(b) && c.indexOf("data-cke-saved-" + b) == -1 ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a
                }) + ">"
            })
        }
        function k(a) {
            return a.replace(I, function (a) {
                return "<cke:encoded>" + encodeURIComponent(a) + "</cke:encoded>"
            })
        }
        function h(a) {
            return a.replace(G, function (a, b) {
                return decodeURIComponent(b)
            })
        }
        function s(a) {
            return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function (a) {
                return "<\!--" + z + "{C}" + encodeURIComponent(a).replace(/--/g,
                    "%2D%2D") + "--\>"
            })
        }
        function w(a) {
            return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function (a, b) {
                return decodeURIComponent(b)
            })
        }
        function v(a, b) {
            var c = b._.dataStore;
            return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function (a, b) {
                return decodeURIComponent(b)
            }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) {
                return c && c[b] || ""
            })
        }
        function t(a, b) {
            for (var c = [], d = b.config.protectedSource, e = b._.dataStore || (b._.dataStore = {
                    id: 1
                }), m = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, d = [/<script[\s\S]*?<\/script>/gi,
                        /<noscript[\s\S]*?<\/noscript>/gi
                ].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function (a) {
                    return "<\!--{cke_tempcomment}" + (c.push(a) - 1) + "--\>"
                }), h = 0; h < d.length; h++) a = a.replace(d[h], function (a) {
                    a = a.replace(m, function (a, b, d) {
                        return c[d]
                    });
                    return /cke_temp(comment)?/.test(a) ? a : "<\!--{cke_temp}" + (c.push(a) - 1) + "--\>"
                });
            a = a.replace(m, function (a, b, d) {
                return "<\!--" + z + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\>"
            });
            return a.replace(/(['"]).*?\1/g, function (a) {
                return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g,

                function (a, b) {
                    e[e.id] = decodeURIComponent(b);
                    return "{cke_protected_" + e.id+++"}"
                })
            })
        }
        CKEDITOR.htmlDataProcessor = function (a) {
            var d, e, m = this;
            this.editor = a;
            this.dataFilter = d = new CKEDITOR.htmlParser.filter;
            this.htmlFilter = e = new CKEDITOR.htmlParser.filter;
            this.writer = new CKEDITOR.htmlParser.basicWriter;
            d.addRules(r);
            d.addRules(b(a, "data"));
            e.addRules(C);
            e.addRules(b(a, "html"));
            a.on("toHtml", function (b) {
                var b = b.data,
                    d = b.dataValue,
                    d = t(d, a),
                    d = o(d),
                    d = k(d),
                    d = d.replace(E, "$1cke:$2"),
                    d = d.replace(L, "<cke:$1$2></cke:$1>"),
                    d = CKEDITOR.env.opera ? d : d.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
                    e = b.context || a.editable().getName(),
                    m;
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && e == "pre") {
                    e = "div";
                    d = "<pre>" + d + "</pre>";
                    m = 1
                }
                e = a.document.createElement(e);
                e.setHtml("a" + d);
                d = e.getHtml().substr(1);
                d = d.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " ");
                m && (d = d.replace(/^<pre>|<\/pre>$/gi, ""));
                d = d.replace(Q, "$1$2");
                d = h(d);
                d = w(d);
                b.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(d, b.context, b.fixForBody === false ? false : c(a.config))
            },
            null, null, 5);
            a.on("toHtml", function (a) {
                a.data.dataValue.filterChildren(m.dataFilter, true)
            }, null, null, 10);
            a.on("toHtml", function (a) {
                var a = a.data,
                    b = a.dataValue,
                    c = new CKEDITOR.htmlParser.basicWriter;
                b.writeChildrenHtml(c);
                b = c.getHtml(true);
                a.dataValue = s(b)
            }, null, null, 15);
            a.on("toDataFormat", function (b) {
                b.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(b.data.dataValue, a.editable().getName(), c(a.config))
            }, null, null, 5);
            a.on("toDataFormat", function (a) {
                a.data.dataValue.filterChildren(m.htmlFilter, true)
            },
            null, null, 10);
            a.on("toDataFormat", function (b) {
                var c = b.data.dataValue,
                    d = m.writer;
                d.reset();
                c.writeChildrenHtml(d);
                c = d.getHtml(true);
                c = w(c);
                c = v(c, a);
                b.data.dataValue = c
            }, null, null, 15)
        };
        CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function (a, b, c, d) {
                var e = this.editor;
                !b && b !== null && (b = e.editable().getName());
                return e.fire("toHtml", {
                    dataValue: a,
                    context: b,
                    fixForBody: c,
                    dontFilter: !! d
                }).dataValue
            },
            toDataFormat: function (a) {
                return this.editor.fire("toDataFormat", {
                    dataValue: a
                }).dataValue
            }
        };
        var F = /(?:&nbsp;|\xa0)$/,
            z = "{cke_protected}",
            q = CKEDITOR.dtd,
            p = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"],
            A = CKEDITOR.tools.extend({}, q.$blockLimit, q.$block),
            r = {
                elements: {},
                attributeNames: [
                    [/^on/, "data-cke-pa-on"]
                ]
            }, C = {
                elementNames: [
                    [/^cke:/, ""],
                    [/^\?xml:namespace$/, ""]
                ],
                attributeNames: [
                    [/^data-cke-(saved|pa)-/, ""],
                    [/^data-cke-.*/, ""],
                    ["hidefocus", ""]
                ],
                elements: {
                    $: function (a) {
                        var b = a.attributes;
                        if (b) {
                            if (b["data-cke-temp"]) return false;
                            for (var c = ["name", "href", "src"], d, e = 0; e < c.length; e++) {
                                d = "data-cke-saved-" + c[e];
                                d in b && delete b[c[e]]
                            }
                        }
                        return a
                    },
                    table: function (a) {
                        a.children.slice(0).sort(function (a, b) {
                            var c, d;
                            if (a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type) {
                                c = CKEDITOR.tools.indexOf(p, a.name);
                                d = CKEDITOR.tools.indexOf(p, b.name)
                            }
                            if (!(c > -1 && d > -1 && c != d)) {
                                c = l(a);
                                d = l(b)
                            }
                            return c > d ? 1 : -1
                        })
                    },
                    embed: function (a) {
                        var b = a.parent;
                        if (b && b.name == "object") {
                            var c = b.attributes.width,
                                b = b.attributes.height;
                            c && (a.attributes.width = c);
                            b && (a.attributes.height = b)
                        }
                    },
                    param: function (a) {
                        a.children = [];
                        a.isEmpty = true;
                        return a
                    },
                    a: function (a) {
                        if (!a.children.length && !a.attributes.name && !a.attributes["data-cke-saved-name"]) return false
                    },
                    span: function (a) {
                        a.attributes["class"] == "Apple-style-span" && delete a.name
                    },
                    html: function (a) {
                        delete a.attributes.contenteditable;
                        delete a.attributes["class"]
                    },
                    body: function (a) {
                        delete a.attributes.spellcheck;
                        delete a.attributes.contenteditable
                    },
                    style: function (a) {
                        var b = a.children[0];
                        b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
                        if (!a.attributes.type) a.attributes.type = "text/css"
                    },
                    title: function (a) {
                        var b = a.children[0];
                        !b && i(a,
                        b = new CKEDITOR.htmlParser.text);
                        b.value = a.attributes["data-cke-title"] || ""
                    }
                },
                attributes: {
                    "class": function (a) {
                        return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || false
                    }
                }
            };
        if (CKEDITOR.env.ie) C.attributes.style = function (a) {
                return a.replace(/(^|;)([^\:]+)/g, function (a) {
                    return a.toLowerCase()
                })
        };
        for (var y in {
            input: 1,
            textarea: 1
        }) {
            r.elements[y] = n;
            C.elements[y] = m
        }
        var u = /<(a|area|img|input|source)\b([^>]*)>/gi,
            x = /\b(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
            I = /(?:<style(?=[ >])[^>]*>[\s\S]*<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            G = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
            E = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
            Q = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
            L = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    })();
    "use strict";
    CKEDITOR.htmlParser.element = function (b, c) {
        this.name = b;
        this.attributes = c || {};
        this.children = [];
        var a = b || "",
            g = a.match(/^cke:(.*)/);
        g && (a = g[1]);
        a = !(!CKEDITOR.dtd.$nonBodyContent[a] && !CKEDITOR.dtd.$block[a] && !CKEDITOR.dtd.$listItem[a] && !CKEDITOR.dtd.$tableContent[a] && !(CKEDITOR.dtd.$nonEditable[a] || a == "br"));
        this.isEmpty = !! CKEDITOR.dtd.$empty[b];
        this.isUnknown = !CKEDITOR.dtd[b];
        this._ = {
            isBlockLike: a,
            hasInlineStarted: this.isEmpty || !a
        }
    };
    CKEDITOR.htmlParser.cssStyle = function (b) {
        var c = {};
        ((b instanceof CKEDITOR.htmlParser.element ? b.attributes.style : b) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, b, e) {
            b == "font-family" && (e = e.replace(/["']/g, ""));
            c[b.toLowerCase()] = e
        });
        return {
            rules: c,
            populate: function (a) {
                var b = this.toString();
                if (b) a instanceof CKEDITOR.dom.element ? a.setAttribute("style", b) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = b : a.style = b
            },
            toString: function () {
                var a = [],
                    b;
                for (b in c) c[b] && a.push(b, ":", c[b], ";");
                return a.join("")
            }
        }
    };
    (function () {
        var b = function (a, b) {
            a = a[0];
            b = b[0];
            return a < b ? -1 : a > b ? 1 : 0
        }, c = CKEDITOR.htmlParser.fragment.prototype;
        CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT,
            add: c.add,
            clone: function () {
                return new CKEDITOR.htmlParser.element(this.name, this.attributes)
            },
            filter: function (a) {
                var b = this,
                    c, d;
                if (!b.parent) a.onRoot(b);
                for (;;) {
                    c = b.name;
                    if (!(d = a.onElementName(c))) {
                        this.remove();
                        return false
                    }
                    b.name = d;
                    if (!(b = a.onElement(b))) {
                        this.remove();
                        return false
                    }
                    if (b !==
                        this) {
                        this.replaceWith(b);
                        return false
                    }
                    if (b.name == c) break;
                    if (b.type != CKEDITOR.NODE_ELEMENT) {
                        this.replaceWith(b);
                        return false
                    }
                    if (!b.name) {
                        this.replaceWithChildren();
                        return false
                    }
                }
                c = b.attributes;
                var f, i;
                for (f in c) {
                    i = f;
                    for (d = c[f];;) if (i = a.onAttributeName(f)) if (i != f) {
                                delete c[f];
                                f = i
                            } else break;
                            else {
                                delete c[f];
                                break
                            }
                    i && ((d = a.onAttribute(b, i, d)) === false ? delete c[i] : c[i] = d)
                }
                b.isEmpty || this.filterChildren(a);
                return true
            },
            filterChildren: c.filterChildren,
            writeHtml: function (a, c) {
                c && this.filter(c);
                var e = this.name,
                    d = [],
                    f = this.attributes,
                    i, j;
                a.openTag(e, f);
                for (i in f) d.push([i, f[i]]);
                a.sortAttributes && d.sort(b);
                i = 0;
                for (j = d.length; i < j; i++) {
                    f = d[i];
                    a.attribute(f[0], f[1])
                }
                a.openTagClose(e, this.isEmpty);
                this.writeChildrenHtml(a);
                this.isEmpty || a.closeTag(e)
            },
            writeChildrenHtml: c.writeChildrenHtml,
            replaceWithChildren: function () {
                for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
                this.remove()
            },
            forEach: c.forEach
        })
    })();
    (function () {
        var b = {};
        CKEDITOR.template = function (c) {
            if (b[c]) this.output = b[c];
            else {
                var a = c.replace(/'/g, "\\'").replace(/{([^}]+)}/g, function (a, b) {
                    return "',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'"
                });
                this.output = b[c] = Function("data", "buffer", "return buffer?buffer.push('" + a + "'):['" + a + "'].join('');")
            }
        }
    })();
    delete CKEDITOR.loadFullCore;
    CKEDITOR.instances = {};
    CKEDITOR.document = new CKEDITOR.dom.document(document);
    CKEDITOR.add = function (b) {
        CKEDITOR.instances[b.name] = b;
        b.on("focus", function () {
            if (CKEDITOR.currentInstance != b) {
                CKEDITOR.currentInstance = b;
                CKEDITOR.fire("currentInstance")
            }
        });
        b.on("blur", function () {
            if (CKEDITOR.currentInstance == b) {
                CKEDITOR.currentInstance = null;
                CKEDITOR.fire("currentInstance")
            }
        });
        CKEDITOR.fire("instance", null, b)
    };
    CKEDITOR.remove = function (b) {
        delete CKEDITOR.instances[b.name]
    };
    (function () {
        var b = {};
        CKEDITOR.addTemplate = function (c, a) {
            var g = b[c];
            if (g) return g;
            g = {
                name: c,
                source: a
            };
            CKEDITOR.fire("template", g);
            return b[c] = new CKEDITOR.template(g.source)
        };
        CKEDITOR.getTemplate = function (c) {
            return b[c]
        }
    })();
    (function () {
        var b = [];
        CKEDITOR.addCss = function (c) {
            b.push(c)
        };
        CKEDITOR.getCss = function () {
            return b.join("\n")
        }
    })();
    CKEDITOR.on("instanceDestroyed", function () {
        CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
    });
    CKEDITOR.TRISTATE_ON = 1;
    CKEDITOR.TRISTATE_OFF = 2;
    CKEDITOR.TRISTATE_DISABLED = 0;
    (function () {
        CKEDITOR.inline = function (b, c) {
            if (!CKEDITOR.env.isCompatible) return null;
            b = CKEDITOR.dom.element.get(b);
            if (b.getEditor()) throw 'The editor instance "' + b.getEditor().name + '" is already attached to the provided element.';
            var a = new CKEDITOR.editor(c, b, CKEDITOR.ELEMENT_MODE_INLINE);
            a.setData(b.getHtml(), null, true);
            a.on("loaded", function () {
                a.fire("uiReady");
                a.editable(b);
                a.container = b;
                a.setData(a.getData(1));
                a.resetDirty();
                a.fire("contentDom");
                a.mode = "wysiwyg";
                a.fire("mode");
                a.status = "ready";
                a.fireOnce("instanceReady");
                CKEDITOR.fire("instanceReady", null, a)
            }, null, null, 1E4);
            a.on("destroy", function () {
                a.element.clearCustomData();
                delete a.element
            });
            return a
        };
        CKEDITOR.inlineAll = function () {
            var b, c, a;
            for (a in CKEDITOR.dtd.$editable) for (var g = CKEDITOR.document.getElementsByTag(a), e = 0, d = g.count(); e < d; e++) {
                    b = g.getItem(e);
                    if (b.getAttribute("contenteditable") == "true") {
                        c = {
                            element: b,
                            config: {}
                        };
                        CKEDITOR.fire("inline", c) !== false && CKEDITOR.inline(b, c.config)
                    }
            }
        };
        CKEDITOR.domReady(function () {
            !CKEDITOR.disableAutoInline &&
                CKEDITOR.inlineAll()
        })
    })();
    CKEDITOR.replaceClass = "ckeditor";
    (function () {
        function b(b, e, i, j) {
            if (!CKEDITOR.env.isCompatible) return null;
            b = CKEDITOR.dom.element.get(b);
            if (b.getEditor()) throw 'The editor instance "' + b.getEditor().name + '" is already attached to the provided element.';
            var l = new CKEDITOR.editor(e, b, j);
            j == CKEDITOR.ELEMENT_MODE_REPLACE && b.setStyle("visibility", "hidden");
            i && l.setData(i, null, true);
            l.on("loaded", function () {
                a(l);
                j == CKEDITOR.ELEMENT_MODE_REPLACE && l.config.autoUpdateElement && g(l);
                l.setMode(l.config.startupMode, function () {
                    l.resetDirty();
                    l.status =
                        "ready";
                    l.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady", null, l)
                })
            });
            l.on("destroy", c);
            return l
        }
        function c() {
            var a = this.container,
                b = this.element;
            if (a) {
                a.clearCustomData();
                a.remove()
            }
            if (b) {
                b.clearCustomData();
                this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && b.show();
                delete this.element
            }
        }
        function a(a) {
            var b = a.name,
                c = a.element,
                g = a.elementMode,
                l = a.fire("uiSpace", {
                    space: "top",
                    html: ""
                }).html,
                n = a.fire("uiSpace", {
                    space: "bottom",
                    html: ""
                }).html;
            e || (e = CKEDITOR.addTemplate("maincontainer", '<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' +
                CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'));
            b = CKEDITOR.dom.element.createFromHtml(e.output({
                id: a.id,
                name: b,
                langDir: a.lang.dir,
                langCode: a.langCode,
                voiceLabel: a.lang.editor,
                topHtml: l ? '<span id="' + a.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + l + "</span>" : "",
                contentId: a.ui.spaceId("contents"),
                bottomHtml: n ? '<span id="' + a.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + n + "</span>" : "",
                outerEl: CKEDITOR.env.ie ? "span" : "div"
            }));
            if (g == CKEDITOR.ELEMENT_MODE_REPLACE) {
                c.hide();
                b.insertAfter(c)
            } else c.append(b);
            a.container = b;
            l && a.ui.space("top").unselectable();
            n && a.ui.space("bottom").unselectable();
            c =
                a.config.width;
            g = a.config.height;
            c && b.setStyle("width", CKEDITOR.tools.cssLength(c));
            g && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(g));
            b.disableContextMenu();
            CKEDITOR.env.webkit && b.on("focus", function () {
                a.focus()
            });
            a.fireOnce("uiReady")
        }
        function g(a) {
            var b = a.element;
            if (a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && b.is("textarea")) {
                var c = b.$.form && new CKEDITOR.dom.element(b.$.form);
                if (c) {
                    var e = function () {
                        a.updateElement()
                    };
                    c.on("submit", e);
                    if (!c.$.submit.nodeName && !c.$.submit.length) c.$.submit =
                            CKEDITOR.tools.override(c.$.submit, function (b) {
                            return function () {
                                a.updateElement();
                                b.apply ? b.apply(this, arguments) : b()
                            }
                        });
                    a.on("destroy", function () {
                        c.removeListener("submit", e)
                    })
                }
            }
        }
        CKEDITOR.replace = function (a, c) {
            return b(a, c, null, CKEDITOR.ELEMENT_MODE_REPLACE)
        };
        CKEDITOR.appendTo = function (a, c, e) {
            return b(a, c, e, CKEDITOR.ELEMENT_MODE_APPENDTO)
        };
        CKEDITOR.replaceAll = function () {
            for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
                var c = null,
                    e = a[b];
                if (e.name || e.id) {
                    if (typeof arguments[0] ==
                        "string") {
                        if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(e.className)) continue
                    } else if (typeof arguments[0] == "function") {
                        c = {};
                        if (arguments[0](e, c) === false) continue
                    }
                    this.replace(e, c)
                }
            }
        };
        CKEDITOR.editor.prototype.addMode = function (a, b) {
            (this._.modes || (this._.modes = {}))[a] = b
        };
        CKEDITOR.editor.prototype.setMode = function (a, b) {
            var c = this,
                e = this._.modes;
            if (!(a == c.mode || !e || !e[a])) {
                c.fire("beforeSetMode", a);
                if (c.mode) {
                    var g = c.checkDirty();
                    c._.previousMode = c.mode;
                    c.fire("beforeModeUnload");
                    c.editable(0);
                    c.ui.space("contents").setHtml("");
                    c.mode = ""
                }
                this._.modes[a](function () {
                    c.mode = a;
                    g !== void 0 && !g && c.resetDirty();
                    setTimeout(function () {
                        c.fire("mode");
                        b && b.call(c)
                    }, 0)
                })
            }
        };
        CKEDITOR.editor.prototype.resize = function (a, b, c, e) {
            var g = this.container,
                n = this.ui.space("contents"),
                m = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement,
                e = e ? g.getChild(1) : g;
            e.setSize("width", a, true);
            m && (m.style.width = "1%");
            n.setStyle("height", Math.max(b - (c ? 0 : (e.$.offsetHeight || 0) - (n.$.clientHeight || 0)), 0) +
                "px");
            m && (m.style.width = "100%");
            this.fire("resize")
        };
        CKEDITOR.editor.prototype.getResizable = function (a) {
            return a ? this.ui.space("contents") : this.container
        };
        var e;
        CKEDITOR.domReady(function () {
            CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
        })
    })();
    CKEDITOR.config.startupMode = "wysiwyg";
    (function () {
        function b(b) {
            var c = b.editor,
                d = c.editable(),
                e = b.data.path,
                g = e.blockLimit,
                f = b.data.selection.getRanges()[0],
                i = c.config.enterMode;
            if (CKEDITOR.env.gecko) {
                var j = e.block || e.blockLimit || e.root,
                    l = j && j.getLast(a);
                j && (j.isBlockBoundary() && (!l || !(l.type == CKEDITOR.NODE_ELEMENT && l.isBlockBoundary())) && !j.is("pre") && !j.getBogus()) && j.appendBogus()
            }
            if (c.config.autoParagraph !== false && i != CKEDITOR.ENTER_BR && f.collapsed && d.equals(g) && !e.block) {
                d = f.clone();
                d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                e = new CKEDITOR.dom.walker(d);
                e.guard = function (b) {
                    return !a(b) || b.type == CKEDITOR.NODE_COMMENT || b.isReadOnly()
                };
                if (!e.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) {
                    c = f.fixBlock(true, c.config.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p");
                    if (CKEDITOR.env.ie)(c = c.getFirst(a)) && (c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/)) && c.remove();
                    f.select();
                    b.cancel()
                }
            }
        }
        function c(a) {
            var b = a.data.getTarget();
            if (b.is("input")) {
                b = b.getAttribute("type");
                (b == "submit" || b == "reset") && a.data.preventDefault()
            }
        }

        function a(a) {
            return j(a) && l(a)
        }
        function g(a, b) {
            return function (c) {
                var d = CKEDITOR.dom.element.get(c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget);
                (!d || !b.equals(d) && !b.contains(d)) && a.call(this, c)
            }
        }
        function e(b) {
            var c, d = b.getRanges()[0],
                b = b.root,
                e = d.startPath(),
                g = {
                    table: 1,
                    ul: 1,
                    ol: 1,
                    dl: 1
                }, f = CKEDITOR.dom.walker.bogus();
            if (e.contains(g)) {
                var i = d.clone();
                i.collapse(1);
                i.setStartAt(b, CKEDITOR.POSITION_AFTER_START);
                i = new CKEDITOR.dom.walker(i);
                e = function (b, d) {
                    return function (b, e) {
                        e && (b.type ==
                            CKEDITOR.NODE_ELEMENT && b.is(g)) && (c = b);
                        if (a(b) && !e && (!d || !f(b))) return false
                    }
                };
                i.guard = e(i);
                i.checkBackward();
                if (c) {
                    i = d.clone();
                    i.collapse();
                    i.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
                    i = new CKEDITOR.dom.walker(i);
                    i.guard = e(i, 1);
                    c = 0;
                    i.checkForward();
                    return c
                }
            }
            return null
        }
        function d(a) {
            a.editor.focus();
            a.editor.fire("saveSnapshot")
        }
        function f(a, b) {
            var c = a.editor;
            !b && c.getSelection().scrollIntoView();
            setTimeout(function () {
                c.fire("saveSnapshot")
            }, 0)
        }
        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element,
            $: function (a, b) {
                this.base(b.$ || b);
                this.editor = a;
                this.hasFocus = false;
                this.setup()
            },
            proto: {
                focus: function () {
                    this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]();
                    CKEDITOR.env.safari && !this.isInline() && (CKEDITOR.document.getActive().equals(this.getWindow().getFrame()) || this.getWindow().focus())
                },
                on: function (a, b) {
                    var c = Array.prototype.slice.call(arguments, 0);
                    if (CKEDITOR.env.ie && /^focus|blur$/.exec(a)) {
                        a = a == "focus" ? "focusin" : "focusout";
                        b = g(b, this);
                        c[0] = a;
                        c[1] = b
                    }
                    return CKEDITOR.dom.element.prototype.on.apply(this,
                    c)
                },
                attachListener: function (a, b, c, d, e, g) {
                    !this._.listeners && (this._.listeners = []);
                    var f = Array.prototype.slice.call(arguments, 1);
                    this._.listeners.push(a.on.apply(a, f))
                },
                clearListeners: function () {
                    var a = this._.listeners;
                    try {
                        for (; a.length;) a.pop().removeListener()
                    } catch (b) {}
                },
                restoreAttrs: function () {
                    var a = this._.attrChanges,
                        b, c;
                    for (c in a) if (a.hasOwnProperty(c)) {
                            b = a[c];
                            b !== null ? this.setAttribute(c, b) : this.removeAttribute(c)
                        }
                },
                attachClass: function (a) {
                    var b = this.getCustomData("classes");
                    if (!this.hasClass(a)) {
                        !b &&
                            (b = []);
                        b.push(a);
                        this.setCustomData("classes", b);
                        this.addClass(a)
                    }
                },
                changeAttr: function (a, b) {
                    var c = this.getAttribute(a);
                    if (b !== c) {
                        !this._.attrChanges && (this._.attrChanges = {});
                        a in this._.attrChanges || (this._.attrChanges[a] = c);
                        this.setAttribute(a, b)
                    }
                },
                insertHtml: function (a, b) {
                    d(this);
                    n(this, b || "html", a)
                },
                insertText: function (a) {
                    d(this);
                    var b = this.editor,
                        c = b.getSelection().getStartElement().hasAscendant("pre", true) ? CKEDITOR.ENTER_BR : b.config.enterMode,
                        b = c == CKEDITOR.ENTER_BR,
                        e = CKEDITOR.tools,
                        a = e.htmlEncode(a.replace(/\r\n/g,
                            "\n")),
                        a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"),
                        c = c == CKEDITOR.ENTER_P ? "p" : "div";
                    if (!b) {
                        var g = /\n{2}/g;
                        if (g.test(a)) var f = "<" + c + ">",
                        i = "</" + c + ">", a = f + a.replace(g, function () {
                            return i + f
                        }) + i
                    }
                    a = a.replace(/\n/g, "<br>");
                    b || (a = a.replace(RegExp("<br>(?=</" + c + ">)"), function (a) {
                        return e.repeat(a, 2)
                    }));
                    a = a.replace(/^ | $/g, "&nbsp;");
                    a = a.replace(/(>|\s) /g, function (a, b) {
                        return b + "&nbsp;"
                    }).replace(/ (?=<)/g, "&nbsp;");
                    n(this, "text", a)
                },
                insertElement: function (b) {
                    d(this);
                    for (var c = this.editor, e = c.config.enterMode,
                        h = c.getSelection(), g = h.getRanges(), i = b.getName(), j = CKEDITOR.dtd.$block[i], l, n, z, q = g.length - 1; q >= 0; q--) {
                        l = g[q];
                        if (!l.checkReadOnly()) {
                            l.deleteContents(1);
                            n = !q && b || b.clone(1);
                            var p, A;
                            if (j) for (;
                                (p = l.getCommonAncestor(0, 1)) && (A = CKEDITOR.dtd[p.getName()]) && (!A || !A[i]);) if (p.getName() in CKEDITOR.dtd.span) l.splitElement(p);
                                    else if (l.checkStartOfBlock() && l.checkEndOfBlock()) {
                                l.setStartBefore(p);
                                l.collapse(true);
                                p.remove()
                            } else l.splitBlock(e == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                            l.insertNode(n);
                            z ||
                                (z = n)
                        }
                    }
                    if (z) {
                        l.moveToPosition(z, CKEDITOR.POSITION_AFTER_END);
                        if (j) if ((b = z.getNext(a)) && b.type == CKEDITOR.NODE_ELEMENT && b.is(CKEDITOR.dtd.$block)) b.getDtd()["#"] ? l.moveToElementEditStart(b) : l.moveToElementEditEnd(z);
                            else if (!b && e != CKEDITOR.ENTER_BR) {
                            b = l.fixBlock(true, e == CKEDITOR.ENTER_DIV ? "div" : "p");
                            l.moveToElementEditStart(b)
                        }
                    }
                    h.selectRanges([l]);
                    f(this, CKEDITOR.env.opera)
                },
                setData: function (a, b) {
                    !b && this.editor.dataProcessor && (a = this.editor.dataProcessor.toHtml(a));
                    this.setHtml(a);
                    this.editor.fire("dataReady")
                },
                getData: function (a) {
                    var b = this.getHtml();
                    !a && this.editor.dataProcessor && (b = this.editor.dataProcessor.toDataFormat(b));
                    return b
                },
                setReadOnly: function (a) {
                    this.setAttribute("contenteditable", !a)
                },
                detach: function () {
                    this.removeClass("cke_editable");
                    var a = this.editor;
                    this._.detach();
                    delete a.document;
                    delete a.window
                },
                isInline: function () {
                    return this.getDocument().equals(CKEDITOR.document)
                },
                setup: function () {
                    var a = this.editor;
                    this.attachListener(a, "beforeGetData", function () {
                        var b = this.getData();
                        this.is("textarea") ||
                            a.config.ignoreEmptyParagraph !== false && (b = b.replace(i, function (a, b) {
                            return b
                        }));
                        a.setData(b, null, 1)
                    }, this);
                    this.attachListener(a, "getSnapshot", function (a) {
                        a.data = this.getData(1)
                    }, this);
                    this.attachListener(a, "afterSetData", function () {
                        this.setData(a.getData(1))
                    }, this);
                    this.attachListener(a, "loadSnapshot", function (a) {
                        this.setData(a.data, 1)
                    }, this);
                    this.attachListener(a, "beforeFocus", function () {
                        var b = a.getSelection();
                        (b = b && b.getNative()) && b.type == "Control" || this.focus()
                    }, this);
                    this.attachListener(a, "insertHtml",

                    function (a) {
                        this.insertHtml(a.data.dataValue, a.data.mode)
                    }, this);
                    this.attachListener(a, "insertElement", function (a) {
                        this.insertElement(a.data)
                    }, this);
                    this.attachListener(a, "insertText", function (a) {
                        this.insertText(a.data)
                    }, this);
                    this.setReadOnly(a.readOnly);
                    this.attachClass("cke_editable");
                    this.attachClass(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || a.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" : "");
                    this.attachClass("cke_contents_" +
                        a.config.contentsLangDirection);
                    a.keystrokeHandler.blockedKeystrokes[8] = a.readOnly;
                    a.keystrokeHandler.attach(this);
                    this.on("blur", function (a) {
                        CKEDITOR.env.opera && CKEDITOR.document.getActive().equals(this.isInline() ? this : this.getWindow().getFrame()) ? a.cancel() : this.hasFocus = false
                    }, null, null, -1);
                    this.on("focus", function () {
                        this.hasFocus = true
                    }, null, null, -1);
                    a.focusManager.add(this);
                    if (this.equals(CKEDITOR.document.getActive())) {
                        this.hasFocus = true;
                        a.once("contentDom", function () {
                            a.focusManager.focus()
                        })
                    }
                    this.isInline() &&
                        this.changeAttr("tabindex", a.tabIndex);
                    if (!this.is("textarea")) {
                        a.document = this.getDocument();
                        a.window = this.getWindow();
                        var b = a.document;
                        this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                        var d = a.config.contentsLangDirection;
                        this.getDirection(1) != d && this.changeAttr("dir", d);
                        var h = CKEDITOR.getCss();
                        if (h) {
                            d = b.getHead();
                            if (!d.getCustomData("stylesheet")) {
                                h = b.appendStyleText(h);
                                h = new CKEDITOR.dom.element(h.ownerNode || h.owningElement);
                                d.setCustomData("stylesheet", h);
                                h.data("cke-temp", 1)
                            }
                        }
                        d =
                            b.getCustomData("stylesheet_ref") || 0;
                        b.setCustomData("stylesheet_ref", d + 1);
                        this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
                        this.attachListener(this, "click", function (a) {
                            var a = a.data,
                                b = a.getTarget();
                            b.is("a") && (a.$.button != 2 && b.isReadOnly()) && a.preventDefault()
                        });
                        this.attachListener(a, "key", function (b) {
                            if (a.readOnly) return true;
                            var c = b.data.keyCode,
                                d;
                            if (c in {
                                8: 1,
                                46: 1
                            }) {
                                var h = a.getSelection(),
                                    b = h.getRanges()[0],
                                    g = b.startPath(),
                                    f, k, o, c = c == 8;
                                if (h = e(h)) {
                                    a.fire("saveSnapshot");
                                    b.moveToPosition(h, CKEDITOR.POSITION_BEFORE_START);
                                    h.remove();
                                    b.select();
                                    a.fire("saveSnapshot");
                                    d = 1
                                } else if (b.collapsed) if ((f = g.block) && b[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && (o = f[c ? "getPrevious" : "getNext"](j)) && o.is("table")) {
                                        a.fire("saveSnapshot");
                                        b[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && f.remove();
                                        b["moveToElementEdit" + (c ? "End" : "Start")](o);
                                        b.select();
                                        a.fire("saveSnapshot");
                                        d = 1
                                    } else if (g.blockLimit && g.blockLimit.is("td") && (k = g.blockLimit.getAscendant("table")) && b.checkBoundaryOfElement(k,
                                c ? CKEDITOR.START : CKEDITOR.END) && (o = k[c ? "getPrevious" : "getNext"](j))) {
                                    a.fire("saveSnapshot");
                                    b["moveToElementEdit" + (c ? "End" : "Start")](o);
                                    b.checkStartOfBlock() && b.checkEndOfBlock() ? o.remove() : b.select();
                                    a.fire("saveSnapshot");
                                    d = 1
                                } else if ((k = g.contains(["td", "th", "caption"])) && b.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END)) if ((o = k[c ? "getPreviousSourceNode" : "getNextSourceNode"](1, CKEDITOR.NODE_ELEMENT)) && !o.isReadOnly() && b.root.contains(o)) {
                                        b[c ? "moveToElementEditEnd" : "moveToElementEditStart"](o);
                                        b.select();
                                        d = 1
                                    }
                            }
                            return !d
                        });
                        CKEDITOR.env.ie && this.attachListener(this, "click", c);
                        !CKEDITOR.env.ie && !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function (b) {
                            var c = b.data.getTarget();
                            if (c.is("img", "hr", "input", "textarea", "select")) {
                                a.getSelection().selectElement(c);
                                c.is("input", "textarea", "select") && b.data.preventDefault()
                            }
                        });
                        CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (b) {
                            if (b.data.$.button == 2) {
                                b = b.data.getTarget();
                                if (!b.getOuterHtml().replace(i, "")) {
                                    var c = a.createRange();
                                    c.moveToElementEditStart(b);
                                    c.select(true)
                                }
                            }
                        });
                        if (CKEDITOR.env.webkit) {
                            this.attachListener(this, "click", function (a) {
                                a.data.getTarget().is("input", "select") && a.data.preventDefault()
                            });
                            this.attachListener(this, "mouseup", function (a) {
                                a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
                            })
                        }
                    }
                }
            },
            _: {
                detach: function () {
                    this.editor.setData(this.editor.getData(), 0, 1);
                    this.clearListeners();
                    this.restoreAttrs();
                    var a;
                    if (a = this.removeCustomData("classes")) for (; a.length;) this.removeClass(a.pop());
                    a = this.getDocument();
                    var b = a.getHead();
                    if (b.getCustomData("stylesheet")) {
                        var c = a.getCustomData("stylesheet_ref");
                        if (--c) a.setCustomData("stylesheet_ref", c);
                        else {
                            a.removeCustomData("stylesheet_ref");
                            b.removeCustomData("stylesheet").remove()
                        }
                    }
                    delete this.editor
                }
            }
        });
        CKEDITOR.editor.prototype.editable = function (a) {
            var b = this._.editable;
            if (b && a) return 0;
            if (arguments.length) b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null);
            return b
        };
        var i = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
            j = CKEDITOR.dom.walker.whitespaces(true),
            l = CKEDITOR.dom.walker.bookmark(false, true);
        CKEDITOR.on("instanceLoaded", function (a) {
            var c = a.editor;
            c.on("insertElement", function (a) {
                a = a.data;
                if (a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea"))) {
                    a.getAttribute("contentEditable") != "false" && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1");
                    a.setAttribute("contentEditable", false)
                }
            });
            c.on("selectionChange", function (a) {
                if (!c.readOnly) {
                    var d = c.getSelection();
                    if (d && !d.isLocked) {
                        d = c.checkDirty();
                        c.fire("lockSnapshot");
                        b(a);
                        c.fire("unlockSnapshot");
                        !d && c.resetDirty()
                    }
                }
            })
        });
        CKEDITOR.on("instanceCreated", function (a) {
            var b = a.editor;
            b.on("mode", function () {
                var a = b.editable();
                if (a && a.isInline()) {
                    var c = this.lang.editor + ", " + this.name;
                    a.changeAttr("role", "textbox");
                    a.changeAttr("aria-label", c);
                    a.changeAttr("title", c);
                    if (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents")) {
                        var d = CKEDITOR.tools.getNextId(),
                            e = CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' +
                                this.lang.common.editorHelp + "</span>");
                        c.append(e);
                        a.changeAttr("aria-describedby", d)
                    }
                }
            })
        });
        CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        var n = function () {
            function b(a) {
                return a.type == CKEDITOR.NODE_ELEMENT
            }
            function c(a, d) {
                var e, g, h, f, k = [],
                    i = d.range.startContainer;
                e = d.range.startPath();
                for (var i = j[i.getName()], l = 0, n = a.getChildren(), w = n.count(), s = -1, t = -1, D = 0, z = e.contains(j.$list); l < w; ++l) {
                    e = n.getItem(l);
                    if (b(e)) {
                        h = e.getName();
                        if (z && h in CKEDITOR.dtd.$list) k = k.concat(c(e, d));
                        else {
                            f = !! i[h];
                            if (h == "br" && e.data("cke-eol") && (!l || l == w - 1)) {
                                D = (g = l ? k[l - 1].node : n.getItem(l + 1)) && (!b(g) || !g.is("br"));
                                g = g && b(g) && j.$block[g.getName()]
                            }
                            s == -1 && !f && (s = l);
                            f || (t = l);
                            k.push({
                                isElement: 1,
                                isLineBreak: D,
                                isBlock: e.isBlockBoundary(),
                                hasBlockSibling: g,
                                node: e,
                                name: h,
                                allowed: f
                            });
                            g = D = 0
                        }
                    } else k.push({
                            isElement: 0,
                            node: e,
                            allowed: 1
                        })
                }
                if (s > -1) k[s].firstNotAllowed = 1;
                if (t > -1) k[t].lastNotAllowed = 1;
                return k
            }
            function d(a, c) {
                var e = [],
                    g = a.getChildren(),
                    h = g.count(),
                    f, o = 0,
                    i = j[c],
                    l = !a.is(j.$inline) || a.is("br");
                for (l && e.push(" "); o < h; o++) {
                    f = g.getItem(o);
                    b(f) && !f.is(i) ? e = e.concat(d(f, c)) : e.push(f)
                }
                l && e.push(" ");
                return e
            }
            function e(a) {
                return a && b(a) && (a.is(j.$removeEmpty) || a.is("a") && !a.isBlockBoundary())
            }
            function g(a, c, d, e) {
                var h = a.clone(),
                    f, k;
                h.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                if ((f = (new CKEDITOR.dom.walker(h)).next()) && b(f) && l[f.getName()] && (k = f.getPrevious()) && b(k) && !k.getParent().equals(a.startContainer) && d.contains(k) && e.contains(f) && f.isIdentical(k)) {
                    f.moveChildren(k);
                    f.remove();
                    g(a, c, d, e)
                }
            }
            function i(a, c) {
                function d(a, c) {
                    if (c.isBlock && c.isElement && !c.node.is("br") && b(a) && a.is("br")) {
                        a.remove();
                        return 1
                    }
                }
                var e = c.endContainer.getChild(c.endOffset),
                    g = c.endContainer.getChild(c.endOffset - 1);
                e && d(e, a[a.length - 1]);
                if (g && d(g, a[0])) {
                    c.setEnd(c.endContainer, c.endOffset - 1);
                    c.collapse()
                }
            }
            var j = CKEDITOR.dtd,
                l = {
                    p: 1,
                    div: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    ul: 1,
                    ol: 1,
                    li: 1,
                    pre: 1,
                    dl: 1,
                    blockquote: 1
                }, n = {
                    p: 1,
                    div: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1
                }, z = CKEDITOR.tools.extend({}, j.$inline);
            delete z.br;
            return function (l, p, t) {
                var r = l.editor;
                l.getDocument();
                var C = r.getSelection().getRanges()[0],
                    y = false;
                if (p == "unfiltered_html") {
                    p = "html";
                    y = true
                }
                if (!C.checkReadOnly()) {
                    var u = (new CKEDITOR.dom.elementPath(C.startContainer, C.root)).blockLimit || C.root,
                        p = {
                            type: p,
                            dontFilter: y,
                            editable: l,
                            editor: r,
                            range: C,
                            blockLimit: u,
                            mergeCandidates: [],
                            zombies: []
                        }, r = p.range,
                        y = p.mergeCandidates,
                        x, I, G, E;
                    if (p.type == "text" && r.shrink(CKEDITOR.SHRINK_ELEMENT, true, false)) {
                        x = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>",
                        r.document);
                        r.insertNode(x);
                        r.setStartAfter(x)
                    }
                    I = new CKEDITOR.dom.elementPath(r.startContainer);
                    p.endPath = G = new CKEDITOR.dom.elementPath(r.endContainer);
                    if (!r.collapsed) {
                        var u = G.block || G.blockLimit,
                            Q = r.getCommonAncestor();
                        u && (!u.equals(Q) && !u.contains(Q) && r.checkEndOfBlock()) && p.zombies.push(u);
                        r.deleteContents()
                    }
                    for (;
                    (E = b(r.startContainer) && r.startContainer.getChild(r.startOffset - 1)) && b(E) && E.isBlockBoundary() && I.contains(E);) r.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END);
                    g(r, p.blockLimit, I, G);
                    if (x) {
                        r.setEndBefore(x);
                        r.collapse();
                        x.remove()
                    }
                    x = r.startPath();
                    if (u = x.contains(e, false, 1)) {
                        r.splitElement(u);
                        p.inlineStylesRoot = u;
                        p.inlineStylesPeak = x.lastElement
                    }
                    x = r.createBookmark();
                    (u = x.startNode.getPrevious(a)) && b(u) && e(u) && y.push(u);
                    (u = x.startNode.getNext(a)) && b(u) && e(u) && y.push(u);
                    for (u = x.startNode;
                    (u = u.getParent()) && e(u);) y.push(u);
                    r.moveToBookmark(x);
                    if (t) {
                        E = t;
                        t = p.range;
                        if (p.type == "text" && p.inlineStylesRoot) {
                            x = E;
                            E = p.inlineStylesPeak;
                            r = E.getDocument().createText("{cke-peak}");
                            for (y = p.inlineStylesRoot.getParent(); !E.equals(y);) {
                                r =
                                    r.appendTo(E.clone());
                                E = E.getParent()
                            }
                            E = r.getOuterHtml().replace("{cke-peak}", x)
                        }
                        x = p.blockLimit.getName();
                        if (/^\s+|\s+$/.test(E) && "span" in CKEDITOR.dtd[x]) {
                            var L = '<span data-cke-marker="1">&nbsp;</span>';
                            E = L + E + L
                        }
                        E = p.editor.dataProcessor.toHtml(E, null, false, p.dontFilter);
                        x = t.document.createElement("body");
                        x.setHtml(E);
                        if (L) {
                            x.getFirst().remove();
                            x.getLast().remove()
                        }
                        if ((L = t.startPath().block) && !(L.getChildCount() == 1 && L.getBogus())) a: {
                                var D;
                                if (x.getChildCount() == 1 && b(D = x.getFirst()) && D.is(n)) {
                                    L = D.getElementsByTag("*");
                                    t = 0;
                                    for (r = L.count(); t < r; t++) {
                                        E = L.getItem(t);
                                        if (!E.is(z)) break a
                                    }
                                    D.moveChildren(D.getParent(1));
                                    D.remove()
                                }
                        }
                        p.dataWrapper = x;
                        D = p.range;
                        var L = D.document,
                            B, t = p.blockLimit;
                        x = 0;
                        var J;
                        E = [];
                        var H, N, y = r = 0,
                            K, O;
                        I = D.startContainer;
                        var u = p.endPath.elements[0],
                            P;
                        G = u.getPosition(I);
                        Q = !! u.getCommonAncestor(I) && G != CKEDITOR.POSITION_IDENTICAL && !(G & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                        I = c(p.dataWrapper, p);
                        for (i(I, D); x < I.length; x++) {
                            G = I[x];
                            if (B = G.isLineBreak) {
                                B = D;
                                K = t;
                                var M = void 0,
                                    R = void 0;
                                if (G.hasBlockSibling) B =
                                        1;
                                else {
                                    M = B.startContainer.getAscendant(j.$block, 1);
                                    if (!M || !M.is({
                                        div: 1,
                                        p: 1
                                    })) B = 0;
                                    else {
                                        R = M.getPosition(K);
                                        if (R == CKEDITOR.POSITION_IDENTICAL || R == CKEDITOR.POSITION_CONTAINS) B = 0;
                                        else {
                                            K = B.splitElement(M);
                                            B.moveToPosition(K, CKEDITOR.POSITION_AFTER_START);
                                            B = 1
                                        }
                                    }
                                }
                            }
                            if (B) y = x > 0;
                            else {
                                B = D.startPath();
                                if (!G.isBlock && (N = p.editor.config.enterMode != CKEDITOR.ENTER_BR && p.editor.config.autoParagraph !== false ? p.editor.config.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false) && !B.block && B.blockLimit && B.blockLimit.equals(D.root)) {
                                    N =
                                        L.createElement(N);
                                    !CKEDITOR.env.ie && N.appendBogus();
                                    D.insertNode(N);
                                    !CKEDITOR.env.ie && (J = N.getBogus()) && J.remove();
                                    D.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END)
                                }
                                if ((B = D.startPath().block) && !B.equals(H)) {
                                    if (J = B.getBogus()) {
                                        J.remove();
                                        E.push(B)
                                    }
                                    H = B
                                }
                                G.firstNotAllowed && (r = 1);
                                if (r && G.isElement) {
                                    B = D.startContainer;
                                    for (K = null; B && !j[B.getName()][G.name];) {
                                        if (B.equals(t)) {
                                            B = null;
                                            break
                                        }
                                        K = B;
                                        B = B.getParent()
                                    }
                                    if (B) {
                                        if (K) {
                                            O = D.splitElement(K);
                                            p.zombies.push(O);
                                            p.zombies.push(K)
                                        }
                                    } else {
                                        K = t.getName();
                                        P = !x;
                                        B = x ==
                                            I.length - 1;
                                        K = d(G.node, K);
                                        for (var M = [], R = K.length, T = 0, U = void 0, V = 0, W = -1; T < R; T++) {
                                            U = K[T];
                                            if (U == " ") {
                                                if (!V && (!P || T)) {
                                                    M.push(new CKEDITOR.dom.text(" "));
                                                    W = M.length
                                                }
                                                V = 1
                                            } else {
                                                M.push(U);
                                                V = 0
                                            }
                                        }
                                        B && W == M.length && M.pop();
                                        P = M
                                    }
                                }
                                if (P) {
                                    for (; B = P.pop();) D.insertNode(B);
                                    P = 0
                                } else D.insertNode(G.node);
                                if (G.lastNotAllowed && x < I.length - 1) {
                                    (O = Q ? u : O) && D.setEndAt(O, CKEDITOR.POSITION_AFTER_START);
                                    r = 0
                                }
                                D.collapse()
                            }
                        }
                        p.dontMoveCaret = y;
                        p.bogusNeededBlocks = E
                    }
                    J = p.range;
                    var S;
                    O = p.bogusNeededBlocks;
                    for (P = J.createBookmark(); H = p.zombies.pop();) if (H.getParent()) {
                            N =
                                J.clone();
                            N.moveToElementEditStart(H);
                            N.removeEmptyBlocksAtEnd()
                        }
                    if (O) for (; H = O.pop();) H.append(CKEDITOR.env.ie ? J.document.createText(" ") : J.document.createElement("br"));
                    for (; H = p.mergeCandidates.pop();) H.mergeSiblings();
                    J.moveToBookmark(P);
                    if (!p.dontMoveCaret) {
                        for (H = b(J.startContainer) && J.startContainer.getChild(J.startOffset - 1); H && b(H) && !H.is(j.$empty);) {
                            if (H.isBlockBoundary()) J.moveToPosition(H, CKEDITOR.POSITION_BEFORE_END);
                            else {
                                if (e(H) && H.getHtml().match(/(\s|&nbsp;)$/g)) {
                                    S = null;
                                    break
                                }
                                S = J.clone();
                                S.moveToPosition(H, CKEDITOR.POSITION_BEFORE_END)
                            }
                            H = H.getLast(a)
                        }
                        S && J.moveToRange(S)
                    }
                    C.select();
                    f(l)
                }
            }
        }()
    })();
    (function () {
        function b() {
            var a = this.getSelection(1);
            if (a.getType() != CKEDITOR.SELECTION_NONE) {
                this.fire("selectionCheck", a);
                var b = this.elementPath();
                if (!b.compare(this._.selectionPreviousPath)) {
                    this._.selectionPreviousPath = b;
                    this.fire("selectionChange", {
                        selection: a,
                        path: b
                    })
                }
            }
        }
        function c() {
            i = true;
            if (!f) {
                a.call(this);
                f = CKEDITOR.tools.setTimeout(a, 200, this)
            }
        }
        function a() {
            f = null;
            if (i) {
                CKEDITOR.tools.setTimeout(b, 0, this);
                i = false
            }
        }
        function g(a) {
            function b(c, d) {
                return !c || c.type == CKEDITOR.NODE_TEXT ? false :
                    a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c)
            }
            if (!(a.root instanceof CKEDITOR.editable)) return false;
            var c = a.startContainer,
                d = a.getPreviousNode(j, null, c),
                e = a.getNextNode(j, null, c);
            return b(d) || b(e, 1) || !d && !e && !(c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? true : false
        }
        function e(a) {
            return a.getCustomData("cke-fillingChar")
        }
        function d(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar");
            if (c) {
                if (b !== false) {
                    var d, e = a.getDocument().getSelection().getNative(),
                        g = e && e.type != "None" &&
                            e.getRangeAt(0);
                    if (c.getLength() > 1 && g && g.intersectsNode(c.$)) {
                        d = [e.anchorOffset, e.focusOffset];
                        g = e.focusNode == c.$ && e.focusOffset > 0;
                        e.anchorNode == c.$ && e.anchorOffset > 0 && d[0]--;
                        g && d[1]--;
                        var f;
                        g = e;
                        if (!g.isCollapsed) {
                            f = g.getRangeAt(0);
                            f.setStart(g.anchorNode, g.anchorOffset);
                            f.setEnd(g.focusNode, g.focusOffset);
                            f = f.collapsed
                        }
                        f && d.unshift(d.pop())
                    }
                }
                c.setText(c.getText().replace(/\u200B/g, ""));
                if (d) {
                    c = e.getRangeAt(0);
                    c.setStart(c.startContainer, d[0]);
                    c.setEnd(c.startContainer, d[1]);
                    e.removeAllRanges();
                    e.addRange(c)
                }
            }
        }
        var f, i, j = CKEDITOR.dom.walker.invisible(1);
        CKEDITOR.on("instanceCreated", function (a) {
            function e() {
                var a = g.getSelection();
                a && a.removeAllRanges()
            }
            var g = a.editor;
            g.define("selectionChange", {
                errorProof: 1
            });
            g.on("contentDom", function () {
                var a = g.document,
                    e = CKEDITOR.document,
                    f = g.editable(),
                    o = a.getBody(),
                    m = a.getDocumentElement(),
                    i = f.isInline(),
                    j;
                CKEDITOR.env.gecko && f.attachListener(f, "focus", function (a) {
                    a.removeListener();
                    if (j !== 0) {
                        a = g.getSelection().getNative();
                        if (a.isCollapsed && a.anchorNode == f.$) {
                            a = g.createRange();
                            a.moveToElementEditStart(f);
                            a.select()
                        }
                    }
                }, null, null, -2);
                f.attachListener(f, "focus", function () {
                    g.unlockSelection(j);
                    j = 0
                }, null, null, -1);
                f.attachListener(f, "mousedown", function () {
                    j = 0
                });
                if (CKEDITOR.env.ie || CKEDITOR.env.opera || i) {
                    var n, p = function () {
                            n = g.getSelection(1);
                            n.lock()
                        };
                    l ? f.attachListener(f, "beforedeactivate", p, null, null, -1) : f.attachListener(g, "selectionCheck", p, null, null, -1);
                    f.attachListener(f, "blur", function () {
                        g.lockSelection(n);
                        j = 1
                    }, null, null, -1)
                }
                if (CKEDITOR.env.ie && !i) {
                    var A;
                    f.attachListener(f,
                        "mousedown", function (a) {
                        a.data.$.button == 2 && g.document.$.selection.type == "None" && (A = g.window.getScrollPosition())
                    });
                    f.attachListener(f, "mouseup", function (a) {
                        if (a.data.$.button == 2 && A) {
                            g.document.$.documentElement.scrollLeft = A.x;
                            g.document.$.documentElement.scrollTop = A.y
                        }
                        A = null
                    });
                    if (a.$.compatMode != "BackCompat") {
                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) m.on("mousedown", function (a) {
                                function b(a) {
                                    a = a.data.$;
                                    if (d) {
                                        var c = o.$.createTextRange();
                                        try {
                                            c.moveToPoint(a.x, a.y)
                                        } catch (e) {}
                                        d.setEndPoint(f.compareEndPoints("StartToStart",
                                        c) < 0 ? "EndToEnd" : "StartToStart", c);
                                        d.select()
                                    }
                                }
                                function c() {
                                    m.removeListener("mousemove", b);
                                    e.removeListener("mouseup", c);
                                    m.removeListener("mouseup", c);
                                    d.select()
                                }
                                a = a.data;
                                if (a.getTarget().is("html") && a.$.y < m.$.clientHeight && a.$.x < m.$.clientWidth) {
                                    var d = o.$.createTextRange();
                                    try {
                                        d.moveToPoint(a.$.x, a.$.y)
                                    } catch (g) {}
                                    var f = d.duplicate();
                                    m.on("mousemove", b);
                                    e.on("mouseup", c);
                                    m.on("mouseup", c)
                                }
                            });
                        if (CKEDITOR.env.version > 7) {
                            m.on("mousedown", function (a) {
                                if (a.data.getTarget().is("html")) {
                                    e.on("mouseup", r);
                                    m.on("mouseup", r)
                                }
                            });
                            var r = function () {
                                e.removeListener("mouseup", r);
                                m.removeListener("mouseup", r);
                                var b = CKEDITOR.document.$.selection,
                                    c = b.createRange();
                                b.type != "None" && c.parentElement().ownerDocument == a.$ && c.select()
                            }
                        }
                    }
                }
                f.attachListener(f, "selectionchange", b, g);
                f.attachListener(f, "keyup", c, g);
                f.attachListener(f, "focus", function () {
                    g.forceNextSelectionCheck();
                    g.selectionChange(1)
                });
                if (i ? CKEDITOR.env.webkit || CKEDITOR.env.gecko : CKEDITOR.env.opera) {
                    var C;
                    f.attachListener(f, "mousedown", function () {
                        C = 1
                    });
                    f.attachListener(a.getDocumentElement(), "mouseup", function () {
                        C && c.call(g);
                        C = 0
                    })
                } else f.attachListener(CKEDITOR.env.ie ? f : a.getDocumentElement(), "mouseup", c, g);
                if (CKEDITOR.env.webkit) a.on("keydown", function (a) {
                        switch (a.data.getKey()) {
                            case 13:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 39:
                            case 8:
                            case 45:
                            case 46:
                                d(g.editable())
                        }
                    }, null, null, -1)
            });
            g.on("contentDomUnload", g.forceNextSelectionCheck, g);
            g.on("dataReady", function () {
                g.selectionChange(1)
            });
            CKEDITOR.env.ie9Compat && g.on("beforeDestroy", e, null,
            null, 9);
            CKEDITOR.env.webkit && g.on("setData", e);
            g.on("contentDomUnload", function () {
                g.unlockSelection()
            })
        });
        CKEDITOR.on("instanceReady", function (a) {
            var b = a.editor,
                c = b.editable();
            if (CKEDITOR.env.webkit) {
                b.on("selectionChange", function () {
                    var a = e(c);
                    a && (a.getCustomData("ready") ? d(c) : a.setCustomData("ready", 1))
                }, null, null, -1);
                b.on("beforeSetMode", function () {
                    d(c)
                }, null, null, -1);
                var g, f, a = function () {
                        var a = b.document,
                            d = e(c);
                        if (d) {
                            a = a.$.defaultView.getSelection();
                            a.type == "Caret" && a.anchorNode == d.$ && (f = 1);
                            g =
                                d.getText();
                            d.setText(g.replace(/\u200B/g, ""))
                        }
                    }, i = function () {
                        var a = b.document,
                            d = e(c);
                        if (d) {
                            d.setText(g);
                            if (f) {
                                a.$.defaultView.getSelection().setPosition(d.$, d.getLength());
                                f = 0
                            }
                        }
                    };
                b.on("beforeUndoImage", a);
                b.on("afterUndoImage", i);
                b.on("beforeGetData", a, null, null, 0);
                b.on("getData", i)
            }
        });
        CKEDITOR.editor.prototype.selectionChange = function (a) {
            (a ? b : c).call(this)
        };
        CKEDITOR.editor.prototype.getSelection = function (a) {
            if (this._.savedSelection && !a) return this._.savedSelection;
            return (a = this.editable()) ? new CKEDITOR.dom.selection(a) :
                null
        };
        CKEDITOR.editor.prototype.lockSelection = function (a) {
            a = a || this.getSelection(1);
            if (a.getType() != CKEDITOR.SELECTION_NONE) {
                !a.isLocked && a.lock();
                this._.savedSelection = a;
                return true
            }
            return false
        };
        CKEDITOR.editor.prototype.unlockSelection = function (a) {
            var b = this._.savedSelection;
            if (b) {
                b.unlock(a);
                delete this._.savedSelection;
                return true
            }
            return false
        };
        CKEDITOR.editor.prototype.forceNextSelectionCheck = function () {
            delete this._.selectionPreviousPath
        };
        CKEDITOR.dom.document.prototype.getSelection = function () {
            return new CKEDITOR.dom.selection(this)
        };
        CKEDITOR.dom.range.prototype.select = function () {
            var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
            a.selectRanges([this]);
            return a
        };
        CKEDITOR.SELECTION_NONE = 1;
        CKEDITOR.SELECTION_TEXT = 2;
        CKEDITOR.SELECTION_ELEMENT = 3;
        var l = typeof window.getSelection != "function";
        CKEDITOR.dom.selection = function (a) {
            var b = a instanceof CKEDITOR.dom.element;
            this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
            this.root = b ? a : this.document.getBody();
            this.isLocked = 0;
            this._ = {
                cache: {}
            };
            if (CKEDITOR.env.webkit) {
                a = this.document.getWindow().$.getSelection();
                if (a.type == "None" && this.document.getActive().equals(this.root) || a.type == "Caret" && a.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) {
                    var c = new CKEDITOR.dom.range(this.root);
                    c.moveToPosition(this.root, CKEDITOR.POSITION_AFTER_START);
                    b = this.document.$.createRange();
                    b.setStart(c.startContainer.$, c.startOffset);
                    b.collapse(1);
                    var d = this.root.on("focus", function (a) {
                        a.cancel()
                    }, null, null, -100);
                    a.addRange(b);
                    d.removeListener()
                }
            }
            var a = this.getNative(),
                e;
            if (a) if (a.getRangeAt) e = (c = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(c.commonAncestorContainer);
                else {
                    try {
                        c = a.createRange()
                    } catch (g) {}
                    e = c && CKEDITOR.dom.element.get(c.item && c.item(0) || c.parentElement())
                }
            if (!e || !this.root.equals(e) && !this.root.contains(e)) {
                this._.cache.type = CKEDITOR.SELECTION_NONE;
                this._.cache.startElement = null;
                this._.cache.selectedElement = null;
                this._.cache.selectedText = "";
                this._.cache.ranges = new CKEDITOR.dom.rangeList
            }
            return this
        };
        var n = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            thead: 1,
            tfoot: 1
        };
        CKEDITOR.dom.selection.prototype = {
            getNative: function () {
                return this._.cache.nativeSel !== void 0 ? this._.cache.nativeSel : this._.cache.nativeSel = l ? this.document.$.selection : this.document.getWindow().$.getSelection()
            },
            getType: l ? function () {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_NONE;
                try {
                    var c = this.getNative(),
                        d = c.type;
                    if (d == "Text") b =
                            CKEDITOR.SELECTION_TEXT;
                    if (d == "Control") b = CKEDITOR.SELECTION_ELEMENT;
                    if (c.createRange().parentElement()) b = CKEDITOR.SELECTION_TEXT
                } catch (e) {}
                return a.type = b
            } : function () {
                var a = this._.cache;
                if (a.type) return a.type;
                var b = CKEDITOR.SELECTION_TEXT,
                    c = this.getNative();
                if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
                else if (c.rangeCount == 1) {
                    var c = c.getRangeAt(0),
                        d = c.startContainer;
                    if (d == c.endContainer && d.nodeType == 1 && c.endOffset - c.startOffset == 1 && n[d.childNodes[c.startOffset].nodeName.toLowerCase()]) b = CKEDITOR.SELECTION_ELEMENT
                }
                return a.type =
                    b
            },
            getRanges: function () {
                var a = l ? function () {
                        function a(b) {
                            return (new CKEDITOR.dom.node(b)).getIndex()
                        }
                        var b = function (b, c) {
                            b = b.duplicate();
                            b.collapse(c);
                            var d = b.parentElement(),
                                e = d.ownerDocument;
                            if (!d.hasChildNodes()) return {
                                    container: d,
                                    offset: 0
                            };
                            for (var g = d.children, f, i, m = b.duplicate(), k = 0, j = g.length - 1, l = -1, n, y; k <= j;) {
                                l = Math.floor((k + j) / 2);
                                f = g[l];
                                m.moveToElementText(f);
                                n = m.compareEndPoints("StartToStart", b);
                                if (n > 0) j = l - 1;
                                else if (n < 0) k = l + 1;
                                else {
                                    if (CKEDITOR.env.ie9Compat && f.tagName == "BR") {
                                        g = e.defaultView.getSelection();
                                        return {
                                            container: g[c ? "anchorNode" : "focusNode"],
                                            offset: g[c ? "anchorOffset" : "focusOffset"]
                                        }
                                    }
                                    return {
                                        container: d,
                                        offset: a(f)
                                    }
                                }
                            }
                            if (l == -1 || l == g.length - 1 && n < 0) {
                                m.moveToElementText(d);
                                m.setEndPoint("StartToStart", b);
                                e = m.text.replace(/(\r\n|\r)/g, "\n").length;
                                g = d.childNodes;
                                if (!e) {
                                    f = g[g.length - 1];
                                    return f.nodeType != CKEDITOR.NODE_TEXT ? {
                                        container: d,
                                        offset: g.length
                                    } : {
                                        container: f,
                                        offset: f.nodeValue.length
                                    }
                                }
                                for (d = g.length; e > 0 && d > 0;) {
                                    i = g[--d];
                                    if (i.nodeType == CKEDITOR.NODE_TEXT) {
                                        y = i;
                                        e = e - i.nodeValue.length
                                    }
                                }
                                return {
                                    container: y,
                                    offset: -e
                                }
                            }
                            m.collapse(n > 0 ? true : false);
                            m.setEndPoint(n > 0 ? "StartToStart" : "EndToStart", b);
                            e = m.text.replace(/(\r\n|\r)/g, "\n").length;
                            if (!e) return {
                                    container: d,
                                    offset: a(f) + (n > 0 ? 0 : 1)
                            };
                            for (; e > 0;) try {
                                    i = f[n > 0 ? "previousSibling" : "nextSibling"];
                                    if (i.nodeType == CKEDITOR.NODE_TEXT) {
                                        e = e - i.nodeValue.length;
                                        y = i
                                    }
                                    f = i
                            } catch (u) {
                                return {
                                    container: d,
                                    offset: a(f)
                                }
                            }
                            return {
                                container: y,
                                offset: n > 0 ? -e : y.nodeValue.length + e
                            }
                        };
                        return function () {
                            var a = this.getNative(),
                                c = a && a.createRange(),
                                d = this.getType();
                            if (!a) return [];
                            if (d == CKEDITOR.SELECTION_TEXT) {
                                a =
                                    new CKEDITOR.dom.range(this.root);
                                d = b(c, true);
                                a.setStart(new CKEDITOR.dom.node(d.container), d.offset);
                                d = b(c);
                                a.setEnd(new CKEDITOR.dom.node(d.container), d.offset);
                                a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse();
                                return [a]
                            }
                            if (d == CKEDITOR.SELECTION_ELEMENT) {
                                for (var d = [], e = 0; e < c.length; e++) {
                                    for (var g = c.item(e), f = g.parentNode, i = 0, a = new CKEDITOR.dom.range(this.root); i < f.childNodes.length && f.childNodes[i] != g; i++);
                                    a.setStart(new CKEDITOR.dom.node(f),
                                    i);
                                    a.setEnd(new CKEDITOR.dom.node(f), i + 1);
                                    d.push(a)
                                }
                                return d
                            }
                            return []
                        }
                    }() : function () {
                        var a = [],
                            b, c = this.getNative();
                        if (!c) return a;
                        for (var d = 0; d < c.rangeCount; d++) {
                            var e = c.getRangeAt(d);
                            b = new CKEDITOR.dom.range(this.root);
                            b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset);
                            b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
                            a.push(b)
                        }
                        return a
                    };
                return function (b) {
                    var c = this._.cache;
                    if (c.ranges && !b) return c.ranges;
                    if (!c.ranges) c.ranges = new CKEDITOR.dom.rangeList(a.call(this));
                    if (b) for (var d =
                            c.ranges, e = 0; e < d.length; e++) {
                            var g = d[e];
                            g.getCommonAncestor().isReadOnly() && d.splice(e, 1);
                            if (!g.collapsed) {
                                if (g.startContainer.isReadOnly()) for (var b = g.startContainer, f; b;) {
                                        if ((f = b.type == CKEDITOR.NODE_ELEMENT) && b.is("body") || !b.isReadOnly()) break;
                                        f && b.getAttribute("contentEditable") == "false" && g.setStartAfter(b);
                                        b = b.getParent()
                                }
                                b = g.startContainer;
                                f = g.endContainer;
                                var i = g.startOffset,
                                    j = g.endOffset,
                                    l = g.clone();
                                b && b.type == CKEDITOR.NODE_TEXT && (i >= b.getLength() ? l.setStartAfter(b) : l.setStartBefore(b));
                                f &&
                                    f.type == CKEDITOR.NODE_TEXT && (j ? l.setEndAfter(f) : l.setEndBefore(f));
                                b = new CKEDITOR.dom.walker(l);
                                b.evaluator = function (a) {
                                    if (a.type == CKEDITOR.NODE_ELEMENT && a.isReadOnly()) {
                                        var b = g.clone();
                                        g.setEndBefore(a);
                                        g.collapsed && d.splice(e--, 1);
                                        if (!(a.getPosition(l.endContainer) & CKEDITOR.POSITION_CONTAINS)) {
                                            b.setStartAfter(a);
                                            b.collapsed || d.splice(e + 1, 0, b)
                                        }
                                        return true
                                    }
                                    return false
                                };
                                b.next()
                            }
                    }
                    return c.ranges
                }
            }(),
            getStartElement: function () {
                var a = this._.cache;
                if (a.startElement !== void 0) return a.startElement;
                var b;
                switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT:
                        return this.getSelectedElement();
                    case CKEDITOR.SELECTION_TEXT:
                        var c = this.getRanges()[0];
                        if (c) {
                            if (c.collapsed) {
                                b = c.startContainer;
                                b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent())
                            } else {
                                for (c.optimize();;) {
                                    b = c.startContainer;
                                    if (c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary()) c.setStartAfter(b);
                                    else break
                                }
                                b = c.startContainer;
                                if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
                                b = b.getChild(c.startOffset);
                                if (!b ||
                                    b.type != CKEDITOR.NODE_ELEMENT) b = c.startContainer;
                                else for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) {
                                        b = c;
                                        c = c.getFirst()
                                }
                            }
                            b = b.$
                        }
                }
                return a.startElement = b ? new CKEDITOR.dom.element(b) : null
            },
            getSelectedElement: function () {
                var a = this._.cache;
                if (a.selectedElement !== void 0) return a.selectedElement;
                var b = this,
                    c = CKEDITOR.tools.tryThese(function () {
                        return b.getNative().createRange().item(0)
                    }, function () {
                        for (var a = b.getRanges()[0], c, d, e = 2; e && (!(c = a.getEnclosedNode()) || !(c.type == CKEDITOR.NODE_ELEMENT && n[c.getName()] &&
                            (d = c))); e--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
                        return d.$
                    });
                return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
            },
            getSelectedText: function () {
                var a = this._.cache;
                if (a.selectedText !== void 0) return a.selectedText;
                var b = this.getNative(),
                    b = l ? b.type == "Control" ? "" : b.createRange().text : b.toString();
                return a.selectedText = b
            },
            lock: function () {
                this.getRanges();
                this.getStartElement();
                this.getSelectedElement();
                this.getSelectedText();
                this._.cache.nativeSel = null;
                this.isLocked = 1
            },
            unlock: function (a) {
                if (this.isLocked) {
                    if (a) var b =
                            this.getSelectedElement(),
                    c = !b && this.getRanges();
                    this.isLocked = 0;
                    this.reset();
                    if (a)(a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (b ? this.selectElement(b) : this.selectRanges(c))
                }
            },
            reset: function () {
                this._.cache = {}
            },
            selectElement: function (a) {
                var b = new CKEDITOR.dom.range(this.root);
                b.setStartBefore(a);
                b.setEndAfter(a);
                this.selectRanges([b])
            },
            selectRanges: function (a) {
                if (a.length) if (this.isLocked) {
                        var b = CKEDITOR.document.getActive();
                        this.unlock();
                        this.selectRanges(a);
                        this.lock();
                        !b.equals(this.root) &&
                            b.focus()
                    } else {
                        if (l) {
                            var c = CKEDITOR.dom.walker.whitespaces(true),
                                e = /\ufeff|\u00a0/,
                                f = {
                                    table: 1,
                                    tbody: 1,
                                    tr: 1
                                };
                            if (a.length > 1) {
                                b = a[a.length - 1];
                                a[0].setEnd(b.endContainer, b.endOffset)
                            }
                            var b = a[0],
                                a = b.collapsed,
                                i, j, t, F = b.getEnclosedNode();
                            if (F && F.type == CKEDITOR.NODE_ELEMENT && F.getName() in n && (!F.is("a") || !F.getText())) try {
                                    t = F.$.createControlRange();
                                    t.addElement(F.$);
                                    t.select();
                                    return
                            } catch (z) {}(b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in f || b.endContainer.type == CKEDITOR.NODE_ELEMENT &&
                                b.endContainer.getName() in f) && b.shrink(CKEDITOR.NODE_ELEMENT, true);
                            t = b.createBookmark();
                            var f = t.startNode,
                                q;
                            if (!a) q = t.endNode;
                            t = b.document.$.body.createTextRange();
                            t.moveToElementText(f.$);
                            t.moveStart("character", 1);
                            if (q) {
                                e = b.document.$.body.createTextRange();
                                e.moveToElementText(q.$);
                                t.setEndPoint("EndToEnd", e);
                                t.moveEnd("character", -1)
                            } else {
                                i = f.getNext(c);
                                j = f.hasAscendant("pre");
                                i = !(i && i.getText && i.getText().match(e)) && (j || !f.hasPrevious() || f.getPrevious().is && f.getPrevious().is("br"));
                                j = b.document.createElement("span");
                                j.setHtml("&#65279;");
                                j.insertBefore(f);
                                i && b.document.createText("﻿").insertBefore(f)
                            }
                            b.setStartBefore(f);
                            f.remove();
                            if (a) {
                                if (i) {
                                    t.moveStart("character", -1);
                                    t.select();
                                    b.document.$.selection.clear()
                                } else t.select();
                                b.moveToPosition(j, CKEDITOR.POSITION_BEFORE_START);
                                j.remove()
                            } else {
                                b.setEndBefore(q);
                                q.remove();
                                t.select()
                            }
                        } else {
                            q = this.getNative();
                            if (!q) return;
                            if (CKEDITOR.env.opera) {
                                b = this.document.$.createRange();
                                b.selectNodeContents(this.root.$);
                                q.addRange(b)
                            }
                            this.removeAllRanges();
                            for (e = 0; e < a.length; e++) {
                                if (e <
                                    a.length - 1) {
                                    b = a[e];
                                    t = a[e + 1];
                                    j = b.clone();
                                    j.setStart(b.endContainer, b.endOffset);
                                    j.setEnd(t.startContainer, t.startOffset);
                                    if (!j.collapsed) {
                                        j.shrink(CKEDITOR.NODE_ELEMENT, true);
                                        i = j.getCommonAncestor();
                                        j = j.getEnclosedNode();
                                        if (i.isReadOnly() || j && j.isReadOnly()) {
                                            t.setStart(b.startContainer, b.startOffset);
                                            a.splice(e--, 1);
                                            continue
                                        }
                                    }
                                }
                                b = a[e];
                                t = this.document.$.createRange();
                                i = b.startContainer;
                                if (CKEDITOR.env.opera && b.collapsed && i.type == CKEDITOR.NODE_ELEMENT) {
                                    j = i.getChild(b.startOffset - 1);
                                    c = i.getChild(b.startOffset);
                                    if (!j && !c && i.is(CKEDITOR.dtd.$removeEmpty) || j && j.type == CKEDITOR.NODE_ELEMENT || c && c.type == CKEDITOR.NODE_ELEMENT) {
                                        b.insertNode(this.document.createText(""));
                                        b.collapse(1)
                                    }
                                }
                                if (b.collapsed && CKEDITOR.env.webkit && g(b)) {
                                    i = this.root;
                                    d(i, false);
                                    j = i.getDocument().createText("​");
                                    i.setCustomData("cke-fillingChar", j);
                                    b.insertNode(j);
                                    if ((i = j.getNext()) && !j.getPrevious() && i.type == CKEDITOR.NODE_ELEMENT && i.getName() == "br") {
                                        d(this.root);
                                        b.moveToPosition(i, CKEDITOR.POSITION_BEFORE_START)
                                    } else b.moveToPosition(j, CKEDITOR.POSITION_AFTER_END)
                                }
                                t.setStart(b.startContainer.$,
                                b.startOffset);
                                try {
                                    t.setEnd(b.endContainer.$, b.endOffset)
                                } catch (p) {
                                    if (p.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
                                        b.collapse(1);
                                        t.setEnd(b.endContainer.$, b.endOffset)
                                    } else throw p;
                                }
                                q.addRange(t)
                            }
                        }
                        this.reset();
                        this.root.fire("selectionchange")
                    }
            },
            createBookmarks: function (a) {
                return this.getRanges().createBookmarks(a)
            },
            createBookmarks2: function (a) {
                return this.getRanges().createBookmarks2(a)
            },
            selectBookmarks: function (a) {
                for (var b = [], c = 0; c < a.length; c++) {
                    var d = new CKEDITOR.dom.range(this.root);
                    d.moveToBookmark(a[c]);
                    b.push(d)
                }
                this.selectRanges(b);
                return this
            },
            getCommonAncestor: function () {
                var a = this.getRanges();
                return a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer)
            },
            scrollIntoView: function () {
                this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
            },
            removeAllRanges: function () {
                var a = this.getNative();
                try {
                    a && a[l ? "empty" : "removeAllRanges"]()
                } catch (b) {}
                this.reset()
            }
        }
    })();
    CKEDITOR.editor.prototype.attachStyleStateChange = function (b, c) {
        var a = this._.styleStateChangeCallbacks;
        if (!a) {
            a = this._.styleStateChangeCallbacks = [];
            this.on("selectionChange", function (b) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c],
                        f = d.style.checkActive(b.data.path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                    d.fn.call(this, f)
                }
            })
        }
        a.push({
            style: b,
            fn: c
        })
    };
    CKEDITOR.STYLE_BLOCK = 1;
    CKEDITOR.STYLE_INLINE = 2;
    CKEDITOR.STYLE_OBJECT = 3;
    (function () {
        function b(a, b) {
            for (var c, d; a = a.getParent();) {
                if (a.equals(b)) break;
                if (a.getAttribute("data-nostyle")) c = a;
                else if (!d) {
                    var e = a.getAttribute("contentEditable");
                    e == "false" ? c = a : e == "true" && (d = 1)
                }
            }
            return c
        }
        function c(a) {
            var c = a.document;
            if (a.collapsed) {
                c = s(this, c);
                a.insertNode(c);
                a.moveToPosition(c, CKEDITOR.POSITION_BEFORE_END)
            } else {
                var d = this.element,
                    e = this._.definition,
                    g, f = e.ignoreReadonly,
                    h = f || e.includeReadonly;
                h == void 0 && (h = a.root.getCustomData("cke_includeReadonly"));
                var i = CKEDITOR.dtd[d] ||
                    (g = true, CKEDITOR.dtd.span);
                a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                a.trim();
                var j = a.createBookmark(),
                    l = j.startNode,
                    m = j.endNode,
                    k = l,
                    n;
                if (!f) {
                    var p = a.getCommonAncestor(),
                        f = b(l, p),
                        p = b(m, p);
                    f && (k = f.getNextSourceNode(true));
                    p && (m = p)
                }
                for (k.getPosition(m) == CKEDITOR.POSITION_FOLLOWING && (k = 0); k;) {
                    f = false;
                    if (k.equals(m)) {
                        k = null;
                        f = true
                    } else {
                        var q = k.type,
                            r = q == CKEDITOR.NODE_ELEMENT ? k.getName() : null,
                            p = r && k.getAttribute("contentEditable") == "false",
                            t = r && k.getAttribute("data-nostyle");
                        if (r && k.data("cke-bookmark")) {
                            k =
                                k.getNextSourceNode(true);
                            continue
                        }
                        if (!r || i[r] && !t && (!p || h) && (k.getPosition(m) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!e.childRule || e.childRule(k))) {
                            var v = k.getParent();
                            if (v && ((v.getDtd() || CKEDITOR.dtd.span)[d] || g) && (!e.parentRule || e.parentRule(v))) {
                                if (!n && (!r || !CKEDITOR.dtd.$removeEmpty[r] || (k.getPosition(m) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL |
                                    CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED)) {
                                    n = a.clone();
                                    n.setStartBefore(k)
                                }
                                if (q == CKEDITOR.NODE_TEXT || p || q == CKEDITOR.NODE_ELEMENT && !k.getChildCount()) {
                                    for (var q = k, w;
                                    (f = !q.getNext(C)) && (w = q.getParent(), i[w.getName()]) && (w.getPosition(l) | CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_FOLLOWING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!e.childRule ||
                                        e.childRule(w));) q = w;
                                    n.setEndAfter(q)
                                }
                            } else f = true
                        } else f = true;
                        k = k.getNextSourceNode(t || p && !h)
                    }
                    if (f && n && !n.collapsed) {
                        for (var f = s(this, c), p = f.hasAttributes(), t = n.getCommonAncestor(), q = {}, r = {}, v = {}, y = {}, z, A, F; f && t;) {
                            if (t.getName() == d) {
                                for (z in e.attributes) if (!y[z] && (F = t.getAttribute(A))) f.getAttribute(z) == F ? r[z] = 1 : y[z] = 1;
                                for (A in e.styles) if (!v[A] && (F = t.getStyle(A))) f.getStyle(A) == F ? q[A] = 1 : v[A] = 1
                            }
                            t = t.getParent()
                        }
                        for (z in r) f.removeAttribute(z);
                        for (A in q) f.removeStyle(A);
                        p && !f.hasAttributes() && (f =
                            null);
                        if (f) {
                            n.extractContents().appendTo(f);
                            o.call(this, f);
                            n.insertNode(f);
                            f.mergeSiblings();
                            CKEDITOR.env.ie || f.$.normalize()
                        } else {
                            f = new CKEDITOR.dom.element("span");
                            n.extractContents().appendTo(f);
                            n.insertNode(f);
                            o.call(this, f);
                            f.remove(true)
                        }
                        n = null
                    }
                }
                a.moveToBookmark(j);
                a.shrink(CKEDITOR.SHRINK_TEXT)
            }
        }
        function a(a) {
            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var b = a.createBookmark(),
                c = b.startNode;
            if (a.collapsed) {
                for (var d = new CKEDITOR.dom.elementPath(c.getParent(), a.root), e, f = 0, g; f < d.elements.length && (g =
                    d.elements[f]); f++) {
                    if (g == d.block || g == d.blockLimit) break;
                    if (this.checkElementRemovable(g)) {
                        var h;
                        if (a.collapsed && (a.checkBoundaryOfElement(g, CKEDITOR.END) || (h = a.checkBoundaryOfElement(g, CKEDITOR.START)))) {
                            e = g;
                            e.match = h ? "start" : "end"
                        } else {
                            g.mergeSiblings();
                            g.getName() == this.element ? m.call(this, g) : k(g, t(this)[g.getName()])
                        }
                    }
                }
                if (e) {
                    g = c;
                    for (f = 0;; f++) {
                        h = d.elements[f];
                        if (h.equals(e)) break;
                        else if (h.match) continue;
                        else h = h.clone();
                        h.append(g);
                        g = h
                    }
                    g[e.match == "start" ? "insertBefore" : "insertAfter"](e)
                }
            } else {
                var i =
                    b.endNode,
                    j = this,
                    d = function () {
                        for (var a = new CKEDITOR.dom.elementPath(c.getParent()), b = new CKEDITOR.dom.elementPath(i.getParent()), d = null, e = null, f = 0; f < a.elements.length; f++) {
                            var g = a.elements[f];
                            if (g == a.block || g == a.blockLimit) break;
                            j.checkElementRemovable(g) && (d = g)
                        }
                        for (f = 0; f < b.elements.length; f++) {
                            g = b.elements[f];
                            if (g == b.block || g == b.blockLimit) break;
                            j.checkElementRemovable(g) && (e = g)
                        }
                        e && i.breakParent(e);
                        d && c.breakParent(d)
                    };
                d();
                for (e = c; !e.equals(i);) {
                    f = e.getNextSourceNode();
                    if (e.type == CKEDITOR.NODE_ELEMENT &&
                        this.checkElementRemovable(e)) {
                        e.getName() == this.element ? m.call(this, e) : k(e, t(this)[e.getName()]);
                        if (f.type == CKEDITOR.NODE_ELEMENT && f.contains(c)) {
                            d();
                            f = c.getNext()
                        }
                    }
                    e = f
                }
            }
            a.moveToBookmark(b)
        }
        function g(a) {
            var b = a.getEnclosedNode() || a.getCommonAncestor(false, true);
            (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && w(a, this)
        }
        function e(a) {
            var b = a.getCommonAncestor(true, true);
            if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                var b = this._.definition,
                    c = b.attributes;
                if (c) for (var d in c) a.removeAttribute(d, c[d]);
                if (b.styles) for (var e in b.styles) b.styles.hasOwnProperty(e) && a.removeStyle(e)
            }
        }
        function d(a) {
            var b = a.createBookmark(true),
                c = a.createIterator();
            c.enforceRealBlocks = true;
            if (this._.enterMode) c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d, e = a.document; d = c.getNextParagraph();) if (!d.isReadOnly()) {
                    var f = s(this, e, d);
                    i(d, f)
                }
            a.moveToBookmark(b)
        }
        function f(a) {
            var b = a.createBookmark(1),
                c = a.createIterator();
            c.enforceRealBlocks = true;
            c.enlargeBr =
                this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d; d = c.getNextParagraph();) if (this.checkElementRemovable(d)) if (d.is("pre")) {
                        var e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                        e && d.copyAttributes(e);
                        i(d, e)
                    } else m.call(this, d);
            a.moveToBookmark(b)
        }
        function i(a, b) {
            var c = !b;
            if (c) {
                b = a.getDocument().createElement("div");
                a.copyAttributes(b)
            }
            var d = b && b.is("pre"),
                e = a.is("pre"),
                f = !d && e;
            if (d && !e) {
                e = b;
                (f = a.getBogus()) && f.remove();
                f = a.getHtml();
                f = l(f,
                    /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                f = f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                f = f.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
                f = f.replace(/<br\b[^>]*>/gi, "\n");
                if (CKEDITOR.env.ie) {
                    var g = a.getDocument().createElement("div");
                    g.append(e);
                    e.$.outerHTML = "<pre>" + f + "</pre>";
                    e.copyAttributes(g.getFirst());
                    e = g.getFirst().remove()
                } else e.setHtml(f);
                b = e
            } else f ? b = n(c ? [a.getHtml()] : j(a), b) : a.moveChildren(b);
            b.replace(a);
            if (d) {
                var c = b,
                    i;
                if ((i = c.getPrevious(y)) && i.is && i.is("pre")) {
                    d = l(i.getHtml(), /\n$/, "") +
                        "\n\n" + l(c.getHtml(), /^\n/, "");
                    CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + d + "</pre>" : c.setHtml(d);
                    i.remove()
                }
            } else c && h(b)
        }
        function j(a) {
            a.getName();
            var b = [];
            l(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) {
                return b + "</pre>" + c + "<pre>"
            }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) {
                b.push(c)
            });
            return b
        }
        function l(a, b, c) {
            var d = "",
                e = "",
                a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a,
                b, c) {
                    b && (d = b);
                    c && (e = c);
                    return ""
                });
            return d + a.replace(b, c) + e
        }
        function n(a, b) {
            var c;
            a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
            for (var d = 0; d < a.length; d++) {
                var e = a[d],
                    e = e.replace(/(\r\n|\r)/g, "\n"),
                    e = l(e, /^[ \t]*\n/, ""),
                    e = l(e, /\n$/, ""),
                    e = l(e, /^[ \t]+|[ \t]+$/g, function (a, b) {
                        return a.length == 1 ? "&nbsp;" : b ? " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                    }),
                    e = e.replace(/\n/g, "<br>"),
                    e = e.replace(/[ \t]{2,}/g, function (a) {
                        return CKEDITOR.tools.repeat("&nbsp;",
                        a.length - 1) + " "
                    });
                if (c) {
                    var f = b.clone();
                    f.setHtml(e);
                    c.append(f)
                } else b.setHtml(e)
            }
            return c || b
        }
        function m(a) {
            var b = this._.definition,
                c = b.attributes,
                b = b.styles,
                d = t(this)[a.getName()],
                e = CKEDITOR.tools.isEmpty(c) && CKEDITOR.tools.isEmpty(b),
                f;
            for (f in c) if (!((f == "class" || this._.definition.fullMatch) && a.getAttribute(f) != F(f, c[f]))) {
                    e = a.hasAttribute(f);
                    a.removeAttribute(f)
                }
            for (var g in b) if (!(this._.definition.fullMatch && a.getStyle(g) != F(g, b[g], true))) {
                    e = e || !! a.getStyle(g);
                    a.removeStyle(g)
                }
            k(a, d, q[a.getName()]);
            e && (this._.definition.alwaysRemoveElement ? h(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? h(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        }
        function o(a) {
            for (var b = t(this), c = a.getElementsByTag(this.element), d = c.count(); --d >= 0;) m.call(this, c.getItem(d));
            for (var e in b) if (e != this.element) {
                    c = a.getElementsByTag(e);
                    for (d = c.count() - 1; d >= 0; d--) {
                        var f = c.getItem(d);
                        k(f, b[e])
                    }
                }
        }
        function k(a, b, c) {
            if (b = b && b.attributes) for (var d = 0; d < b.length; d++) {
                    var e =
                        b[d][0],
                        f;
                    if (f = a.getAttribute(e)) {
                        var g = b[d][1];
                        (g === null || g.test && g.test(f) || typeof g == "string" && f == g) && a.removeAttribute(e)
                    }
            }
            c || h(a)
        }
        function h(a, b) {
            if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) {
                    var c = a.getPrevious(y),
                        d = a.getNext(y);
                    c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({
                        br: 1
                    })) && a.append("br", 1);
                    d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({
                        br: 1
                    })) && a.append("br");
                    a.remove(true)
                } else {
                    c = a.getFirst();
                    d = a.getLast();
                    a.remove(true);
                    if (c) {
                        c.type == CKEDITOR.NODE_ELEMENT &&
                            c.mergeSiblings();
                        d && (!c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT) && d.mergeSiblings()
                    }
                }
        }
        function s(a, b, c) {
            var d;
            d = a.element;
            d == "*" && (d = "span");
            d = new CKEDITOR.dom.element(d, b);
            c && c.copyAttributes(d);
            d = w(d, a);
            b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
            return d
        }
        function w(a, b) {
            var c = b._.definition,
                d = c.attributes,
                c = CKEDITOR.style.getStyleText(c);
            if (d) for (var e in d) a.setAttribute(e, d[e]);
            c && a.setAttribute("style", c);
            return a
        }
        function v(a, b) {
            for (var c in a) a[c] = a[c].replace(r, function (a, c) {
                    return b[c]
                })
        }
        function t(a) {
            if (a._.overrides) return a._.overrides;
            var b = a._.overrides = {}, c = a._.definition.overrides;
            if (c) {
                CKEDITOR.tools.isArray(c) || (c = [c]);
                for (var d = 0; d < c.length; d++) {
                    var e = c[d],
                        f, g;
                    if (typeof e == "string") f = e.toLowerCase();
                    else {
                        f = e.element ? e.element.toLowerCase() : a.element;
                        g = e.attributes
                    }
                    e = b[f] || (b[f] = {});
                    if (g) {
                        var e = e.attributes = e.attributes || [],
                            h;
                        for (h in g) e.push([h.toLowerCase(), g[h]])
                    }
                }
            }
            return b
        }
        function F(a,
        b, c) {
            var d = new CKEDITOR.dom.element("span");
            d[c ? "setStyle" : "setAttribute"](a, b);
            return d[c ? "getStyle" : "getAttribute"](a)
        }
        function z(a, b) {
            for (var c = a.document, d = a.getRanges(), e = b ? this.removeFromRange : this.applyToRange, f, g = d.createIterator(); f = g.getNextRange();) e.call(this, f);
            a.selectRanges(d);
            c.removeCustomData("doc_processing_style")
        }
        var q = {
            address: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            section: 1,
            header: 1,
            footer: 1,
            nav: 1,
            article: 1,
            aside: 1,
            figure: 1,
            dialog: 1,
            hgroup: 1,
            time: 1,
            meter: 1,
            menu: 1,
            command: 1,
            keygen: 1,
            output: 1,
            progress: 1,
            details: 1,
            datagrid: 1,
            datalist: 1
        }, p = {
                a: 1,
                embed: 1,
                hr: 1,
                img: 1,
                li: 1,
                object: 1,
                ol: 1,
                table: 1,
                td: 1,
                tr: 1,
                th: 1,
                ul: 1,
                dl: 1,
                dt: 1,
                dd: 1,
                form: 1,
                audio: 1,
                video: 1
            }, A = /\s*(?:;\s*|$)/,
            r = /#\((.+?)\)/g,
            C = CKEDITOR.dom.walker.bookmark(0, 1),
            y = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function (a, b) {
            var c = a.attributes;
            if (c && c.style) {
                a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style));
                delete c.style
            }
            if (b) {
                a = CKEDITOR.tools.clone(a);
                v(a.attributes, b);
                v(a.styles,
                b)
            }
            c = this.element = a.element ? typeof a.element == "string" ? a.element.toLowerCase() : a.element : "*";
            this.type = a.type || (q[c] ? CKEDITOR.STYLE_BLOCK : p[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
            if (typeof this.element == "object") this.type = CKEDITOR.STYLE_OBJECT;
            this._ = {
                definition: a
            }
        };
        CKEDITOR.editor.prototype.applyStyle = function (a) {
            z.call(a, this.getSelection())
        };
        CKEDITOR.editor.prototype.removeStyle = function (a) {
            z.call(a, this.getSelection(), 1)
        };
        CKEDITOR.style.prototype = {
            apply: function (a) {
                z.call(this, a.getSelection())
            },
            remove: function (a) {
                z.call(this, a.getSelection(), 1)
            },
            applyToRange: function (a) {
                return (this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? d : this.type == CKEDITOR.STYLE_OBJECT ? g : null).call(this, a)
            },
            removeFromRange: function (b) {
                return (this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? a : this.type == CKEDITOR.STYLE_BLOCK ? f : this.type == CKEDITOR.STYLE_OBJECT ? e : null).call(this, b)
            },
            applyToObject: function (a) {
                w(a, this)
            },
            checkActive: function (a) {
                switch (this.type) {
                    case CKEDITOR.STYLE_BLOCK:
                        return this.checkElementRemovable(a.block ||
                            a.blockLimit, true);
                    case CKEDITOR.STYLE_OBJECT:
                    case CKEDITOR.STYLE_INLINE:
                        for (var b = a.elements, c = 0, d; c < b.length; c++) {
                            d = b[c];
                            if (!(this.type == CKEDITOR.STYLE_INLINE && (d == a.block || d == a.blockLimit))) {
                                if (this.type == CKEDITOR.STYLE_OBJECT) {
                                    var e = d.getName();
                                    if (!(typeof this.element == "string" ? e == this.element : e in this.element)) continue
                                }
                                if (this.checkElementRemovable(d, true)) return true
                            }
                        }
                }
                return false
            },
            checkApplicable: function (a) {
                switch (this.type) {
                    case CKEDITOR.STYLE_OBJECT:
                        return a.contains(this.element)
                }
                return true
            },
            checkElementMatch: function (a, b) {
                var c = this._.definition;
                if (!a || !c.ignoreReadonly && a.isReadOnly()) return false;
                var d = a.getName();
                if (typeof this.element == "string" ? d == this.element : d in this.element) {
                    if (!b && !a.hasAttributes()) return true;
                    if (d = c._AC) c = d;
                    else {
                        var d = {}, e = 0,
                            f = c.attributes;
                        if (f) for (var g in f) {
                                e++;
                                d[g] = f[g]
                        }
                        if (g = CKEDITOR.style.getStyleText(c)) {
                            d.style || e++;
                            d.style = g
                        }
                        d._length = e;
                        c = c._AC = d
                    }
                    if (c._length) {
                        for (var h in c) if (h != "_length") {
                                e = a.getAttribute(h) || "";
                                if (h == "style") a: {
                                        d = c[h];
                                        typeof d ==
                                            "string" && (d = CKEDITOR.tools.parseCssText(d));
                                        typeof e == "string" && (e = CKEDITOR.tools.parseCssText(e, true));
                                        g = void 0;
                                        for (g in d) if (!(g in e && (e[g] == d[g] || d[g] == "inherit" || e[g] == "inherit"))) {
                                                d = false;
                                                break a
                                            }
                                        d = true
                                } else d = c[h] == e;
                                if (d) {
                                    if (!b) return true
                                } else if (b) return false
                            }
                        if (b) return true
                    } else return true
                }
                return false
            },
            checkElementRemovable: function (a, b) {
                if (this.checkElementMatch(a, b)) return true;
                var c = t(this)[a.getName()];
                if (c) {
                    var d;
                    if (!(c = c.attributes)) return true;
                    for (var e = 0; e < c.length; e++) {
                        d =
                            c[e][0];
                        if (d = a.getAttribute(d)) {
                            var f = c[e][1];
                            if (f === null || typeof f == "string" && d == f || f.test(d)) return true
                        }
                    }
                }
                return false
            },
            buildPreview: function (a) {
                var b = this._.definition,
                    c = [],
                    d = b.element;
                d == "bdo" && (d = "span");
                var c = ["<", d],
                    e = b.attributes;
                if (e) for (var f in e) c.push(" ", f, '="', e[f], '"');
                (e = CKEDITOR.style.getStyleText(b)) && c.push(' style="', e, '"');
                c.push(">", a || b.name, "</", d, ">");
                return c.join("")
            },
            getDefinition: function () {
                return this._.definition
            }
        };
        CKEDITOR.style.getStyleText = function (a) {
            var b = a._ST;
            if (b) return b;
            var b = a.styles,
                c = a.attributes && a.attributes.style || "",
                d = "";
            c.length && (c = c.replace(A, ";"));
            for (var e in b) {
                var f = b[e],
                    g = (e + ":" + f).replace(A, ";");
                f == "inherit" ? d = d + g : c = c + g
            }
            c.length && (c = CKEDITOR.tools.normalizeCssText(c, true));
            return a._ST = c + d
        }
    })();
    CKEDITOR.styleCommand = function (b, c) {
        this.requiredContent = this.allowedContent = this.style = b;
        CKEDITOR.tools.extend(this, c, true)
    };
    CKEDITOR.styleCommand.prototype.exec = function (b) {
        b.focus();
        this.state == CKEDITOR.TRISTATE_OFF ? b.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && b.removeStyle(this.style)
    };
    CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet");
    CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet);
    CKEDITOR.loadStylesSet = function (b, c, a) {
        CKEDITOR.stylesSet.addExternal(b, c, "");
        CKEDITOR.stylesSet.load(b, a)
    };
    CKEDITOR.editor.prototype.getStylesSet = function (b) {
        if (this._.stylesDefinitions) b(this._.stylesDefinitions);
        else {
            var c = this,
                a = c.config.stylesCombo_stylesSet || c.config.stylesSet;
            if (a === false) b(null);
            else if (a instanceof Array) {
                c._.stylesDefinitions = a;
                b(a)
            } else {
                a || (a = "default");
                var a = a.split(":"),
                    g = a[0];
                CKEDITOR.stylesSet.addExternal(g, a[1] ? a.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                CKEDITOR.stylesSet.load(g, function (a) {
                    c._.stylesDefinitions = a[g];
                    b(c._.stylesDefinitions)
                })
            }
        }
    };
    CKEDITOR.dom.comment = function (b, c) {
        typeof b == "string" && (b = (c ? c.$ : document).createComment(b));
        CKEDITOR.dom.domObject.call(this, b)
    };
    CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
        type: CKEDITOR.NODE_COMMENT,
        getOuterHtml: function () {
            return "<\!--" + this.$.nodeValue + "--\>"
        }
    });
    (function () {
        var b = {}, c;
        for (c in CKEDITOR.dtd.$blockLimit) c in CKEDITOR.dtd.$list || (b[c] = 1);
        var a = {};
        for (c in CKEDITOR.dtd.$block) c in CKEDITOR.dtd.$blockLimit || c in CKEDITOR.dtd.$empty || (a[c] = 1);
        CKEDITOR.dom.elementPath = function (c, e) {
            var d = null,
                f = null,
                i = [],
                e = e || c.getDocument().getBody(),
                j = c;
            do if (j.type == CKEDITOR.NODE_ELEMENT) {
                    i.push(j);
                    if (!this.lastElement) {
                        this.lastElement = j;
                        if (j.is(CKEDITOR.dtd.$object)) continue
                    }
                    var l = j.getName();
                    if (!f) {
                        !d && a[l] && (d = j);
                        if (b[l]) {
                            var n;
                            if (n = !d) {
                                if (l = l == "div") {
                                    a: {
                                        l =
                                            j.getChildren();
                                        n = 0;
                                        for (var m = l.count(); n < m; n++) {
                                            var o = l.getItem(n);
                                            if (o.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[o.getName()]) {
                                                l = true;
                                                break a
                                            }
                                        }
                                        l = false
                                    }
                                    l = !l && !j.equals(e)
                                }
                                n = l
                            }
                            n ? d = j : f = j
                        }
                    }
                    if (j.equals(e)) break
                }
            while (j = j.getParent());
            this.block = d;
            this.blockLimit = f;
            this.root = e;
            this.elements = i
        }
    })();
    CKEDITOR.dom.elementPath.prototype = {
        compare: function (b) {
            var c = this.elements,
                b = b && b.elements;
            if (!b || c.length != b.length) return false;
            for (var a = 0; a < c.length; a++) if (!c[a].equals(b[a])) return false;
            return true
        },
        contains: function (b, c, a) {
            var g;
            typeof b == "string" && (g = function (a) {
                return a.getName() == b
            });
            b instanceof CKEDITOR.dom.element ? g = function (a) {
                return a.equals(b)
            } : CKEDITOR.tools.isArray(b) ? g = function (a) {
                return CKEDITOR.tools.indexOf(b, a.getName()) > -1
            } : typeof b == "function" ? g = b : typeof b == "object" && (g = function (a) {
                return a.getName() in b
            });
            var e = this.elements,
                d = e.length;
            c && d--;
            if (a) {
                e = Array.prototype.slice.call(e, 0);
                e.reverse()
            }
            for (c = 0; c < d; c++) if (g(e[c])) return e[c];
            return null
        },
        isContextFor: function (b) {
            var c;
            if (b in CKEDITOR.dtd.$block) {
                c = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit;
                return !!c.getDtd()[b]
            }
            return true
        },
        direction: function () {
            return (this.block || this.blockLimit || this.root).getDirection(1)
        }
    };
    CKEDITOR.dom.text = function (b, c) {
        typeof b == "string" && (b = (c ? c.$ : document).createTextNode(b));
        this.$ = b
    };
    CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node;
    CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT,
        getLength: function () {
            return this.$.nodeValue.length
        },
        getText: function () {
            return this.$.nodeValue
        },
        setText: function (b) {
            this.$.nodeValue = b
        },
        split: function (b) {
            var c = this.$.parentNode,
                a = c.childNodes.length,
                g = this.getLength(),
                e = this.getDocument(),
                d = new CKEDITOR.dom.text(this.$.splitText(b), e);
            if (c.childNodes.length == a) if (b >= g) {
                    d = e.createText("");
                    d.insertAfter(this)
                } else {
                    b = e.createText("");
                    b.insertAfter(d);
                    b.remove()
                }
            return d
        },
        substring: function (b,
        c) {
            return typeof c != "number" ? this.$.nodeValue.substr(b) : this.$.nodeValue.substring(b, c)
        }
    });
    (function () {
        function b(a, b, c) {
            var d = a.serializable,
                f = b[c ? "endContainer" : "startContainer"],
                i = c ? "endOffset" : "startOffset",
                j = d ? b.document.getById(a.startNode) : a.startNode,
                a = d ? b.document.getById(a.endNode) : a.endNode;
            if (f.equals(j.getPrevious())) {
                b.startOffset = b.startOffset - f.getLength() - a.getPrevious().getLength();
                f = a.getNext()
            } else if (f.equals(a.getPrevious())) {
                b.startOffset = b.startOffset - f.getLength();
                f = a.getNext()
            }
            f.equals(j.getParent()) && b[i]++;
            f.equals(a.getParent()) && b[i]++;
            b[c ? "endContainer" : "startContainer"] =
                f;
            return b
        }
        CKEDITOR.dom.rangeList = function (a) {
            if (a instanceof CKEDITOR.dom.rangeList) return a;
            a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
            return CKEDITOR.tools.extend(a, c)
        };
        var c = {
            createIterator: function () {
                var a = this,
                    b = CKEDITOR.dom.walker.bookmark(),
                    c = [],
                    d;
                return {
                    getNextRange: function (f) {
                        d = d == void 0 ? 0 : d + 1;
                        var i = a[d];
                        if (i && a.length > 1) {
                            if (!d) for (var j = a.length - 1; j >= 0; j--) c.unshift(a[j].createBookmark(true));
                            if (f) for (var l = 0; a[d + l + 1];) {
                                    for (var n = i.document, f = 0, j = n.getById(c[l].endNode), n = n.getById(c[l +
                                            1].startNode);;) {
                                        j = j.getNextSourceNode(false);
                                        if (n.equals(j)) f = 1;
                                        else if (b(j) || j.type == CKEDITOR.NODE_ELEMENT && j.isBlockBoundary()) continue;
                                        break
                                    }
                                    if (!f) break;
                                    l++
                            }
                            for (i.moveToBookmark(c.shift()); l--;) {
                                j = a[++d];
                                j.moveToBookmark(c.shift());
                                i.setEnd(j.endContainer, j.endOffset)
                            }
                        }
                        return i
                    }
                }
            },
            createBookmarks: function (a) {
                for (var c = [], e, d = 0; d < this.length; d++) {
                    c.push(e = this[d].createBookmark(a, true));
                    for (var f = d + 1; f < this.length; f++) {
                        this[f] = b(e, this[f]);
                        this[f] = b(e, this[f], true)
                    }
                }
                return c
            },
            createBookmarks2: function (a) {
                for (var b = [], c = 0; c < this.length; c++) b.push(this[c].createBookmark2(a));
                return b
            },
            moveToBookmarks: function (a) {
                for (var b = 0; b < this.length; b++) this[b].moveToBookmark(a[b])
            }
        }
    })();
    (function () {
        function b() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
        }
        function c(a) {
            var c = CKEDITOR.skin["ua_" + a],
                d = CKEDITOR.env;
            if (c) for (var c = c.split(",").sort(function (a, b) {
                    return a > b ? -1 : 1
                }), e = 0, f; e < c.length; e++) {
                    f = c[e];
                    if (d.ie && (f.replace(/^ie/, "") == d.version || d.quirks && f == "iequirks")) f = "ie";
                    if (d[f]) {
                        a = a + ("_" + c[e]);
                        break
                    }
            }
            return CKEDITOR.getUrl(b() + a + ".css")
        }
        function a(a, b) {
            if (!d[a]) {
                CKEDITOR.document.appendStyleSheet(c(a));
                d[a] = 1
            }
            b && b()
        }

        function g(a) {
            var b = a.getById(f);
            if (!b) {
                b = a.getHead().append("style");
                b.setAttribute("id", f);
                b.setAttribute("type", "text/css")
            }
            return b
        }
        function e(a, b, c) {
            var d, e, f;
            if (CKEDITOR.env.webkit) {
                b = b.split("}").slice(0, -1);
                for (e = 0; e < b.length; e++) b[e] = b[e].split("{")
            }
            for (var g = 0; g < a.length; g++) if (CKEDITOR.env.webkit) for (e = 0; e < b.length; e++) {
                        f = b[e][1];
                        for (d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
                        a[g].$.sheet.addRule(b[e][0], f)
                } else {
                    f = b;
                    for (d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
                    CKEDITOR.env.ie ?
                        a[g].$.styleSheet.cssText = a[g].$.styleSheet.cssText + f : a[g].$.innerHTML = a[g].$.innerHTML + f
                }
        }
        var d = {};
        CKEDITOR.skin = {
            path: b,
            loadPart: function (c, d) {
                CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(b() + "skin.js"), function () {
                    a(c, d)
                }) : a(c, d)
            },
            getPath: function (a) {
                return CKEDITOR.getUrl(c(a))
            },
            icons: {},
            addIcon: function (a, b, c) {
                a = a.toLowerCase();
                this.icons[a] || (this.icons[a] = {
                    path: b,
                    offset: c || 0
                })
            },
            getIconStyle: function (a, b, c, d) {
                var e;
                if (a) {
                    a = a.toLowerCase();
                    b &&
                        (e = this.icons[a + "-rtl"]);
                    e || (e = this.icons[a])
                }
                a = c || e && e.path || "";
                d = d || e && e.offset;
                return a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;"
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function () {
                return this.uiColor
            },
            setUiColor: function (a) {
                var b = g(CKEDITOR.document);
                return (this.setUiColor = function (a) {
                    var c = CKEDITOR.skin.chameleon,
                        d = [
                            [j, a]
                        ];
                    this.uiColor = a;
                    e([b], c(this, "editor"), d);
                    e(i, c(this, "panel"), d)
                }).call(this, a)
            }
        });
        var f = "cke_ui_color",
            i = [],
            j = /\$color/g;
        CKEDITOR.on("instanceLoaded", function (a) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var b = a.editor,
                    a = function (a) {
                        a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                        if (!a.getById("cke_ui_color")) {
                            a = g(a);
                            i.push(a);
                            var c = b.getUiColor();
                            c && e([a], CKEDITOR.skin.chameleon(b, "panel"), [
                                [j, c]
                            ])
                        }
                    };
                b.on("panelShow", a);
                b.on("menuShow", a);
                b.config.uiColor && b.setUiColor(b.config.uiColor)
            }
        })
    })();
    (function () {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = false;
        else {
            var b = CKEDITOR.dom.element.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;border: 1px solid;border-color: red blue;"></div>', CKEDITOR.document);
            b.appendTo(CKEDITOR.document.getHead());
            try {
                CKEDITOR.env.hc = b.getComputedStyle("border-top-color") == b.getComputedStyle("border-right-color")
            } catch (c) {
                CKEDITOR.env.hc = false
            }
            b.remove()
        }
        if (CKEDITOR.env.hc) CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc";
        CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
        CKEDITOR.status = "loaded";
        CKEDITOR.fireOnce("loaded");
        if (b = CKEDITOR._.pending) {
            delete CKEDITOR._.pending;
            for (var a = 0; a < b.length; a++) {
                CKEDITOR.editor.prototype.constructor.apply(b[a][0], b[a][1]);
                CKEDITOR.add(b[a][0])
            }
        }
    })();
    CKEDITOR.skin.name = "moono";
    CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko";
    CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera";
    CKEDITOR.skin.chameleon = function () {
        var b = function () {
            return function (b, e) {
                for (var a = b.match(/[^#]./g), c = 0; 3 > c; c++) {
                    var f = a,
                        h = c,
                        d;
                    d = parseInt(a[c], 16);
                    d = ("0" + (0 > e ? 0 | d * (1 + e) : 0 | d + (255 - d) * e).toString(16)).slice(-2);
                    f[h] = d
                }
                return "#" + a.join("")
            }
        }(),
            c = function () {
                var b = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
                return function (c,
                a) {
                    return b.output({
                        from: c,
                        to: a
                    })
                }
            }(),
            f = {
                editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
                panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
            };
        return function (g, e) {
            var a = g.uiColor,
                a = {
                    id: "." + g.id,
                    defaultBorder: b(a, -0.1),
                    defaultGradient: c(b(a, 0.9), a),
                    lightGradient: c(b(a, 1), b(a, 0.7)),
                    mediumGradient: c(b(a, 0.8), b(a, 0.5)),
                    ckeButtonOn: c(b(a, 0.6), b(a, 0.7)),
                    ckeResizer: b(a, -0.4),
                    ckeToolbarSeparator: b(a, 0.5),
                    ckeColorauto: b(a, 0.8),
                    dialogBody: b(a, 0.7),
                    dialogTabSelected: c("#FFFFFF", "#FFFFFF"),
                    dialogTabSelectedBorder: "#FFF",
                    elementsPathColor: b(a, -0.6),
                    elementsPathBg: a,
                    menubuttonIcon: b(a, 0.5),
                    menubuttonIconHover: b(a, 0.3)
                };
            return f[e].output(a).replace(/\[/g,
                "{").replace(/\]/g, "}")
        }
    }();
    CKEDITOR.plugins.add("dialogui", {
        onLoad: function () {
            var h = function (b) {
                this._ || (this._ = {});
                this._["default"] = this._.initValue = b["default"] || "";
                this._.required = b.required || !1;
                for (var a = [this._], d = 1; d < arguments.length; d++) a.push(arguments[d]);
                a.push(!0);
                CKEDITOR.tools.extend.apply(CKEDITOR.tools, a);
                return this._
            }, r = {
                    build: function (b, a, d) {
                        return new CKEDITOR.ui.dialog.textInput(b, a, d)
                    }
                }, l = {
                    build: function (b, a, d) {
                        return new CKEDITOR.ui.dialog[a.type](b, a, d)
                    }
                }, n = {
                    isChanged: function () {
                        return this.getValue() !=
                            this.getInitValue()
                    },
                    reset: function (b) {
                        this.setValue(this.getInitValue(), b)
                    },
                    setInitValue: function () {
                        this._.initValue = this.getValue()
                    },
                    resetInitValue: function () {
                        this._.initValue = this._["default"]
                    },
                    getInitValue: function () {
                        return this._.initValue
                    }
                }, o = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onChange: function (b, a) {
                        this._.domOnChangeRegistered || (b.on("load", function () {
                            this.getInputElement().on("change", function () {
                                b.parts.dialog.isVisible() && this.fire("change", {
                                    value: this.getValue()
                                })
                            },
                            this)
                        }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", a)
                    }
                }, !0),
                s = /^on([A-Z]\w+)/,
                p = function (b) {
                    for (var a in b)(s.test(a) || "title" == a || "type" == a) && delete b[a];
                    return b
                };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function (b, a, d, e) {
                    if (!(4 > arguments.length)) {
                        var c = h.call(this, a);
                        c.labelId = CKEDITOR.tools.getNextId() + "_label";
                        this._.children = [];
                        CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "div", null, {
                            role: "presentation"
                        }, function () {
                            var f = [],
                                d = a.required ? " cke_required" : "";
                            "horizontal" !=
                                a.labelLayout ? f.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + c.labelId + '"', c.inputId ? ' for="' + c.inputId + '"' : "", (a.labelStyle ? ' style="' + a.labelStyle + '"' : "") + ">", a.label, "</label>", '<div class="cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style="' + a.controlStyle + '"' : "") + ' role="presentation">', e.call(this, b, a), "</div>") : (d = {
                                type: "hbox",
                                widths: a.widths,
                                padding: 0,
                                children: [{
                                        type: "html",
                                        html: '<label class="cke_dialog_ui_labeled_label' + d + '" id="' + c.labelId + '" for="' + c.inputId + '"' +
                                            (a.labelStyle ? ' style="' + a.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(a.label) + "</span>"
                                    }, {
                                        type: "html",
                                        html: '<span class="cke_dialog_ui_labeled_content"' + (a.controlStyle ? ' style="' + a.controlStyle + '"' : "") + ">" + e.call(this, b, a) + "</span>"
                                    }
                                ]
                            }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, d, f));
                            return f.join("")
                        })
                    }
                },
                textInput: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        var e = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                            c = {
                                "class": "cke_dialog_ui_input_" + a.type,
                                id: e,
                                type: a.type
                            };
                        a.validate && (this.validate = a.validate);
                        a.maxLength && (c.maxlength = a.maxLength);
                        a.size && (c.size = a.size);
                        a.inputStyle && (c.style = a.inputStyle);
                        var f = this,
                            i = !1;
                        b.on("load", function () {
                            f.getInputElement().on("keydown", function (a) {
                                a.data.getKeystroke() == 13 && (i = true)
                            });
                            f.getInputElement().on("keyup", function (a) {
                                if (a.data.getKeystroke() == 13 && i) {
                                    b.getButton("ok") && setTimeout(function () {
                                        b.getButton("ok").click()
                                    }, 0);
                                    i = false
                                }
                            }, null, null, 1E3)
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            var b = ['<div class="cke_dialog_ui_input_', a.type, '" role="presentation"'];
                            a.width && b.push('style="width:' + a.width + '" ');
                            b.push("><input ");
                            c["aria-labelledby"] = this._.labelId;
                            this._.required && (c["aria-required"] = this._.required);
                            for (var f in c) b.push(f + '="' + c[f] + '" ');
                            b.push(" /></div>");
                            return b.join("")
                        })
                    }
                },
                textarea: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        var e = this,
                            c = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
                            f = {};
                        a.validate && (this.validate = a.validate);
                        f.rows = a.rows || 5;
                        f.cols =
                            a.cols || 20;
                        f["class"] = "cke_dialog_ui_input_textarea " + (a["class"] || "");
                        "undefined" != typeof a.inputStyle && (f.style = a.inputStyle);
                        a.dir && (f.dir = a.dir);
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            f["aria-labelledby"] = this._.labelId;
                            this._.required && (f["aria-required"] = this._.required);
                            var a = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', c, '" '],
                                b;
                            for (b in f) a.push(b + '="' + CKEDITOR.tools.htmlEncode(f[b]) + '" ');
                            a.push(">", CKEDITOR.tools.htmlEncode(e._["default"]),
                                "</textarea></div>");
                            return a.join("")
                        })
                    }
                },
                checkbox: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        var e = h.call(this, a, {
                            "default": !! a["default"]
                        });
                        a.validate && (this.validate = a.validate);
                        CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, "span", null, null, function () {
                            var c = CKEDITOR.tools.extend({}, a, {
                                id: a.id ? a.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
                            }, true),
                                f = [],
                                d = CKEDITOR.tools.getNextId() + "_label",
                                g = {
                                    "class": "cke_dialog_ui_checkbox_input",
                                    type: "checkbox",
                                    "aria-labelledby": d
                                };
                            p(c);
                            if (a["default"]) g.checked =
                                    "checked";
                            if (typeof c.inputStyle != "undefined") c.style = c.inputStyle;
                            e.checkbox = new CKEDITOR.ui.dialog.uiElement(b, c, f, "input", null, g);
                            f.push(' <label id="', d, '" for="', g.id, '"' + (a.labelStyle ? ' style="' + a.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(a.label), "</label>");
                            return f.join("")
                        })
                    }
                },
                radio: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        this._["default"] || (this._["default"] = this._.initValue = a.items[0][1]);
                        a.validate && (this.validate = a.valdiate);
                        var e = [],
                            c = this;
                        CKEDITOR.ui.dialog.labeledElement.call(this,
                        b, a, d, function () {
                            for (var f = [], d = [], g = a.id ? a.id + "_radio" : CKEDITOR.tools.getNextId() + "_radio", k = 0; k < a.items.length; k++) {
                                var j = a.items[k],
                                    h = j[2] !== void 0 ? j[2] : j[0],
                                    l = j[1] !== void 0 ? j[1] : j[0],
                                    m = CKEDITOR.tools.getNextId() + "_radio_input",
                                    n = m + "_label",
                                    m = CKEDITOR.tools.extend({}, a, {
                                        id: m,
                                        title: null,
                                        type: null
                                    }, true),
                                    h = CKEDITOR.tools.extend({}, m, {
                                        title: h
                                    }, true),
                                    o = {
                                        type: "radio",
                                        "class": "cke_dialog_ui_radio_input",
                                        name: g,
                                        value: l,
                                        "aria-labelledby": n
                                    }, q = [];
                                if (c._["default"] == l) o.checked = "checked";
                                p(m);
                                p(h);
                                if (typeof m.inputStyle !=
                                    "undefined") m.style = m.inputStyle;
                                e.push(new CKEDITOR.ui.dialog.uiElement(b, m, q, "input", null, o));
                                q.push(" ");
                                new CKEDITOR.ui.dialog.uiElement(b, h, q, "label", null, {
                                    id: n,
                                    "for": o.id
                                }, j[0]);
                                f.push(q.join(""))
                            }
                            new CKEDITOR.ui.dialog.hbox(b, e, f, d);
                            return d.join("")
                        });
                        this._.children = e
                    }
                },
                button: function (b, a, d) {
                    if (arguments.length) {
                        "function" == typeof a && (a = a(b.getParentEditor()));
                        h.call(this, a, {
                            disabled: a.disabled || !1
                        });
                        CKEDITOR.event.implementOn(this);
                        var e = this;
                        b.on("load", function () {
                            var a = this.getElement();
                            (function () {
                                a.on("click", e.click, e);
                                a.on("keydown", function (a) {
                                    a.data.getKeystroke() in {
                                        32: 1
                                    } && (e.click(), a.data.preventDefault())
                                })
                            })();
                            a.unselectable()
                        }, this);
                        var c = CKEDITOR.tools.extend({}, a);
                        delete c.style;
                        var f = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "a", null, {
                            style: a.style,
                            href: "javascript:void(0)",
                            title: a.label,
                            hidefocus: "true",
                            "class": a["class"],
                            role: "button",
                            "aria-labelledby": f
                        }, '<span id="' + f + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(a.label) +
                            "</span>")
                    }
                },
                select: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        var e = h.call(this, a);
                        a.validate && (this.validate = a.validate);
                        e.inputId = CKEDITOR.tools.getNextId() + "_select";
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            var c = CKEDITOR.tools.extend({}, a, {
                                id: a.id ? a.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
                            }, true),
                                d = [],
                                i = [],
                                g = {
                                    id: e.inputId,
                                    "class": "cke_dialog_ui_input_select",
                                    "aria-labelledby": this._.labelId
                                };
                            d.push('<div class="cke_dialog_ui_input_', a.type, '" role="presentation"');
                            a.width && d.push('style="width:' + a.width + '" ');
                            d.push(">");
                            if (a.size != void 0) g.size = a.size;
                            if (a.multiple != void 0) g.multiple = a.multiple;
                            p(c);
                            for (var k = 0, j; k < a.items.length && (j = a.items[k]); k++) i.push('<option value="', CKEDITOR.tools.htmlEncode(j[1] !== void 0 ? j[1] : j[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(j[0]));
                            if (typeof c.inputStyle != "undefined") c.style = c.inputStyle;
                            e.select = new CKEDITOR.ui.dialog.uiElement(b, c, d, "select", null, g, i.join(""));
                            d.push("</div>");
                            return d.join("")
                        })
                    }
                },
                file: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        void 0 === a["default"] && (a["default"] = "");
                        var e = CKEDITOR.tools.extend(h.call(this, a), {
                            definition: a,
                            buttons: []
                        });
                        a.validate && (this.validate = a.validate);
                        b.on("load", function () {
                            CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file")
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
                            e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var b = CKEDITOR.env.isCustomDomain(),
                                d = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="',
                                    e.frameId, '" title="', a.label, '" src="javascript:void('
                                ];
                            d.push(b ? "(function(){document.open();document.domain='" + document.domain + "';document.close();})()" : "0");
                            d.push(')"></iframe>');
                            return d.join("")
                        })
                    }
                },
                fileButton: function (b, a, d) {
                    if (!(3 > arguments.length)) {
                        h.call(this, a);
                        var e = this;
                        a.validate && (this.validate = a.validate);
                        var c = CKEDITOR.tools.extend({}, a),
                            f = c.onClick;
                        c.className = (c.className ? c.className + " " : "") + "cke_dialog_ui_button";
                        c.onClick = function (c) {
                            var d = a["for"];
                            if (!f || f.call(this, c) !== false) {
                                b.getContentElement(d[0],
                                d[1]).submit();
                                this.disable()
                            }
                        };
                        b.on("load", function () {
                            b.getContentElement(a["for"][0], a["for"][1])._.buttons.push(e)
                        });
                        CKEDITOR.ui.dialog.button.call(this, b, c, d)
                    }
                },
                html: function () {
                    var b = /^\s*<[\w:]+\s+([^>]*)?>/,
                        a = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                        d = /\/$/;
                    return function (e, c, f) {
                        if (!(3 > arguments.length)) {
                            var i = [],
                                g = c.html;
                            "<" != g.charAt(0) && (g = "<span>" + g + "</span>");
                            var k = c.focus;
                            if (k) {
                                var j = this.focus;
                                this.focus = function () {
                                    ("function" == typeof k ? k : j).call(this);
                                    this.fire("focus")
                                };
                                c.isFocusable &&
                                    (this.isFocusable = this.isFocusable);
                                this.keyboardFocusable = !0
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, e, c, i, "span", null, null, "");
                            i = i.join("").match(b);
                            g = g.match(a) || ["", "", ""];
                            d.test(g[1]) && (g[1] = g[1].slice(0, -1), g[2] = "/" + g[2]);
                            f.push([g[1], " ", i[1] || "", g[2]].join(""))
                        }
                    }
                }(),
                fieldset: function (b, a, d, e, c) {
                    var f = c.label;
                    this._ = {
                        children: a
                    };
                    CKEDITOR.ui.dialog.uiElement.call(this, b, c, e, "fieldset", null, null, function () {
                        var a = [];
                        f && a.push("<legend" + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">" + f + "</legend>");
                        for (var b = 0; b < d.length; b++) a.push(d[b]);
                        return a.join("")
                    })
                }
            }, !0);
            CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
            CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function (b) {
                    var a = CKEDITOR.document.getById(this._.labelId);
                    1 > a.getChildCount() ? (new CKEDITOR.dom.text(b, CKEDITOR.document)).appendTo(a) : a.getChild(0).$.nodeValue = b;
                    return this
                },
                getLabel: function () {
                    var b = CKEDITOR.document.getById(this._.labelId);
                    return !b || 1 > b.getChildCount() ?
                        "" : b.getChild(0).getText()
                },
                eventProcessors: o
            }, !0);
            CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function () {
                    return !this._.disabled ? this.fire("click", {
                        dialog: this._.dialog
                    }) : !1
                },
                enable: function () {
                    this._.disabled = !1;
                    var b = this.getElement();
                    b && b.removeClass("cke_disabled")
                },
                disable: function () {
                    this._.disabled = !0;
                    this.getElement().addClass("cke_disabled")
                },
                isVisible: function () {
                    return this.getElement().getFirst().isVisible()
                },
                isEnabled: function () {
                    return !this._.disabled
                },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onClick: function (b, a) {
                        this.on("click", function () {
                            a.apply(this, arguments)
                        })
                    }
                }, !0),
                accessKeyUp: function () {
                    this.click()
                },
                accessKeyDown: function () {
                    this.focus()
                },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () {
                    return CKEDITOR.document.getById(this._.inputId)
                },
                focus: function () {
                    var b = this.selectParentTab();
                    setTimeout(function () {
                        var a = b.getInputElement();
                        a && a.$.focus()
                    }, 0)
                },
                select: function () {
                    var b = this.selectParentTab();
                    setTimeout(function () {
                        var a = b.getInputElement();
                        a && (a.$.focus(), a.$.select())
                    }, 0)
                },
                accessKeyUp: function () {
                    this.select()
                },
                setValue: function (b) {
                    !b && (b = "");
                    return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                },
                keyboardFocusable: !0
            }, n, !0);
            CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput;
            CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () {
                    return this._.select.getElement()
                },
                add: function (b, a, d) {
                    var e = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                        c = this.getInputElement().$;
                    e.$.text = b;
                    e.$.value = void 0 === a || null === a ? b : a;
                    void 0 === d || null === d ? CKEDITOR.env.ie ? c.add(e.$) : c.add(e.$, null) : c.add(e.$, d);
                    return this
                },
                remove: function (b) {
                    this.getInputElement().$.remove(b);
                    return this
                },
                clear: function () {
                    for (var b = this.getInputElement().$; 0 < b.length;) b.remove(0);
                    return this
                },
                keyboardFocusable: !0
            },
            n, !0);
            CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getInputElement: function () {
                    return this._.checkbox.getElement()
                },
                setValue: function (b, a) {
                    this.getInputElement().$.checked = b;
                    !a && this.fire("change", {
                        value: b
                    })
                },
                getValue: function () {
                    return this.getInputElement().$.checked
                },
                accessKeyUp: function () {
                    this.setValue(!this.getValue())
                },
                eventProcessors: {
                    onChange: function (b, a) {
                        if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return o.onChange.apply(this, arguments);
                        b.on("load",

                        function () {
                            var a = this._.checkbox.getElement();
                            a.on("propertychange", function (b) {
                                b = b.data.$;
                                "checked" == b.propertyName && this.fire("change", {
                                    value: a.$.checked
                                })
                            }, this)
                        }, this);
                        this.on("change", a);
                        return null
                    }
                },
                keyboardFocusable: !0
            }, n, !0);
            CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setValue: function (b, a) {
                    for (var d = this._.children, e, c = 0; c < d.length && (e = d[c]); c++) e.getElement().$.checked = e.getValue() == b;
                    !a && this.fire("change", {
                        value: b
                    })
                },
                getValue: function () {
                    for (var b =
                        this._.children, a = 0; a < b.length; a++) if (b[a].getElement().$.checked) return b[a].getValue();
                    return null
                },
                accessKeyUp: function () {
                    var b = this._.children,
                        a;
                    for (a = 0; a < b.length; a++) if (b[a].getElement().$.checked) {
                            b[a].getElement().focus();
                            return
                        }
                    b[0].getElement().focus()
                },
                eventProcessors: {
                    onChange: function (b, a) {
                        if (CKEDITOR.env.ie) b.on("load", function () {
                                for (var a = this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function (a) {
                                        a = a.data.$;
                                        "checked" == a.propertyName && this.$.checked &&
                                            b.fire("change", {
                                            value: this.getAttribute("value")
                                        })
                                    })
                            }, this), this.on("change", a);
                        else return o.onChange.apply(this, arguments);
                        return null
                    }
                },
                keyboardFocusable: !0
            }, n, !0);
            CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, n, {
                getInputElement: function () {
                    var b = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return 0 < b.$.forms.length ? new CKEDITOR.dom.element(b.$.forms[0].elements[0]) : this.getElement()
                },
                submit: function () {
                    this.getInputElement().getParent().$.submit();
                    return this
                },
                getAction: function () {
                    return this.getInputElement().getParent().$.action
                },
                registerEvents: function (b) {
                    var a = /^on([A-Z]\w+)/,
                        d, e = function (a, b, c, d) {
                            a.on("formLoaded", function () {
                                a.getInputElement().on(c, d, a)
                            })
                        }, c;
                    for (c in b) if (d = c.match(a)) this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, b[c]) : e(this, this._.dialog, d[1].toLowerCase(), b[c]);
                    return this
                },
                reset: function () {
                    function b() {
                        d.$.open();
                        CKEDITOR.env.isCustomDomain() && (d.$.domain = document.domain);
                        var b = "";
                        e.size &&
                            (b = e.size - (CKEDITOR.env.ie ? 7 : 0));
                        var h = a.frameId + "_input";
                        d.$.write(['<html dir="' + g + '" lang="' + k + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + g + '" lang="' + k + '" action="', CKEDITOR.tools.htmlEncode(e.action), '"><label id="', a.labelId, '" for="', h, '" style="display:none">', CKEDITOR.tools.htmlEncode(e.label), '</label><input id="', h, '" aria-labelledby="', a.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(e.id ||
                                "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(0 < b ? b : ""), '" /></form></body></html>', "<script>window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + i + ")}<\/script>"].join(""));
                        d.$.close();
                        for (b = 0; b < c.length; b++) c[b].enable()
                    }
                    var a = this._,
                        d = CKEDITOR.document.getById(a.frameId).getFrameDocument(),
                        e = a.definition,
                        c = a.buttons,
                        f = this.formLoadedNumber,
                        i = this.formUnloadNumber,
                        g = a.dialog._.editor.lang.dir,
                        k = a.dialog._.editor.langCode;
                    f || (f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () {
                        this.fire("formLoaded")
                    }, this), i = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () {
                        this.getInputElement().clearCustomData()
                    }, this), this.getDialog()._.editor.on("destroy", function () {
                        CKEDITOR.tools.removeFunction(f);
                        CKEDITOR.tools.removeFunction(i)
                    }));
                    CKEDITOR.env.gecko ? setTimeout(b, 500) : b()
                },
                getValue: function () {
                    return this.getInputElement().$.value || ""
                },
                setInitValue: function () {
                    this._.initValue = ""
                },
                eventProcessors: {
                    onChange: function (b,
                    a) {
                        this._.domOnChangeRegistered || (this.on("formLoaded", function () {
                            this.getInputElement().on("change", function () {
                                this.fire("change", {
                                    value: this.getValue()
                                })
                            }, this)
                        }, this), this._.domOnChangeRegistered = !0);
                        this.on("change", a)
                    }
                },
                keyboardFocusable: !0
            }, !0);
            CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;
            CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
            CKEDITOR.dialog.addUIElement("text", r);
            CKEDITOR.dialog.addUIElement("password", r);
            CKEDITOR.dialog.addUIElement("textarea",
            l);
            CKEDITOR.dialog.addUIElement("checkbox", l);
            CKEDITOR.dialog.addUIElement("radio", l);
            CKEDITOR.dialog.addUIElement("button", l);
            CKEDITOR.dialog.addUIElement("select", l);
            CKEDITOR.dialog.addUIElement("file", l);
            CKEDITOR.dialog.addUIElement("fileButton", l);
            CKEDITOR.dialog.addUIElement("html", l);
            CKEDITOR.dialog.addUIElement("fieldset", {
                build: function (b, a, d) {
                    for (var e = a.children, c, f = [], i = [], g = 0; g < e.length && (c = e[g]); g++) {
                        var h = [];
                        f.push(h);
                        i.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b, c, h))
                    }
                    return new CKEDITOR.ui.dialog[a.type](b,
                    i, f, d, a)
                }
            })
        }
    });
    CKEDITOR.DIALOG_RESIZE_NONE = 0;
    CKEDITOR.DIALOG_RESIZE_WIDTH = 1;
    CKEDITOR.DIALOG_RESIZE_HEIGHT = 2;
    CKEDITOR.DIALOG_RESIZE_BOTH = 3;
    (function () {
        function p() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null
        }
        function u() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
            return null
        }
        function q(a, b) {
            for (var c = a.$.getElementsByTagName("input"),
                e = 0, d = c.length; e < d; e++) {
                var g = new CKEDITOR.dom.element(c[e]);
                "text" == g.getAttribute("type").toLowerCase() && (b ? (g.setAttribute("value", g.getCustomData("fake_value") || ""), g.removeCustomData("fake_value")) : (g.setCustomData("fake_value", g.getAttribute("value")), g.setAttribute("value", "")))
            }
        }
        function P(a, b) {
            var c = this.getInputElement();
            c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
            a || (this.select ? this.select() : this.focus());
            b && alert(b);
            this.fire("validated", {
                valid: a,
                msg: b
            })
        }

        function Q() {
            var a = this.getInputElement();
            a && a.removeAttribute("aria-invalid")
        }
        function R(a) {
            var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", S).output({
                id: CKEDITOR.tools.getNextNumber(),
                editorId: a.id,
                langDir: a.lang.dir,
                langCode: a.langCode,
                editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
                closeTitle: a.lang.common.close
            })),
                b = a.getChild([0, 0, 0, 0, 0]),
                c = b.getChild(0),
                e = b.getChild(1);
            if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) {
                var d = CKEDITOR.env.isCustomDomain(),
                    d = "javascript:void(function(){" + encodeURIComponent("document.open();" + (d ? 'document.domain="' + document.domain + '";' : "") + "document.close();") + "}())";
                CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + d + '" tabIndex="-1"></iframe>').appendTo(b.getParent())
            }
            c.unselectable();
            e.unselectable();
            return {
                element: a,
                parts: {
                    dialog: a.getChild(0),
                    title: c,
                    close: e,
                    tabs: b.getChild(2),
                    contents: b.getChild([3, 0, 0, 0]),
                    footer: b.getChild([3, 0, 1, 0])
                }
            }
        }
        function H(a, b, c) {
            this.element = b;
            this.focusIndex = c;
            this.tabIndex = 0;
            this.isFocusable = function () {
                return !b.getAttribute("disabled") && b.isVisible()
            };
            this.focus = function () {
                a._.currentFocusIndex = this.focusIndex;
                this.element.focus()
            };
            b.on("keydown", function (a) {
                a.data.getKeystroke() in {
                    32: 1,
                    13: 1
                } && this.fire("click")
            });
            b.on("focus", function () {
                this.fire("mouseover")
            });
            b.on("blur", function () {
                this.fire("mouseout")
            })
        }
        function T(a) {
            function b() {
                a.layout()
            }
            var c = CKEDITOR.document.getWindow();
            c.on("resize", b);
            a.on("hide", function () {
                c.removeListener("resize",
                b)
            })
        }
        function I(a, b) {
            this._ = {
                dialog: a
            };
            CKEDITOR.tools.extend(this, b)
        }
        function U(a) {
            function b(b) {
                var c = a.getSize(),
                    h = CKEDITOR.document.getWindow().getViewPaneSize(),
                    o = b.data.$.screenX,
                    i = b.data.$.screenY,
                    n = o - e.x,
                    l = i - e.y;
                e = {
                    x: o,
                    y: i
                };
                d.x += n;
                d.y += l;
                a.move(d.x + k[3] < f ? -k[3] : d.x - k[1] > h.width - c.width - f ? h.width - c.width + ("rtl" == g.lang.dir ? 0 : k[1]) : d.x, d.y + k[0] < f ? -k[0] : d.y - k[2] > h.height - c.height - f ? h.height - c.height + k[2] : d.y, 1);
                b.data.preventDefault()
            }
            function c() {
                CKEDITOR.document.removeListener("mousemove",
                b);
                CKEDITOR.document.removeListener("mouseup", c);
                if (CKEDITOR.env.ie6Compat) {
                    var a = r.getChild(0).getFrameDocument();
                    a.removeListener("mousemove", b);
                    a.removeListener("mouseup", c)
                }
            }
            var e = null,
                d = null;
            a.getElement().getFirst();
            var g = a.getParentEditor(),
                f = g.config.dialog_magnetDistance,
                k = CKEDITOR.skin.margins || [0, 0, 0, 0];
            "undefined" == typeof f && (f = 20);
            a.parts.title.on("mousedown", function (f) {
                e = {
                    x: f.data.$.screenX,
                    y: f.data.$.screenY
                };
                CKEDITOR.document.on("mousemove", b);
                CKEDITOR.document.on("mouseup", c);
                d =
                    a.getPosition();
                if (CKEDITOR.env.ie6Compat) {
                    var g = r.getChild(0).getFrameDocument();
                    g.on("mousemove", b);
                    g.on("mouseup", c)
                }
                f.data.preventDefault()
            }, a)
        }
        function V(a) {
            var b, c;

            function e(d) {
                var e = "rtl" == k.lang.dir,
                    i = o.width,
                    D = o.height,
                    E = i + (d.data.$.screenX - b) * (e ? -1 : 1) * (a._.moved ? 1 : 2),
                    n = D + (d.data.$.screenY - c) * (a._.moved ? 1 : 2),
                    x = a._.element.getFirst(),
                    x = e && x.getComputedStyle("right"),
                    y = a.getPosition();
                y.y + n > h.height && (n = h.height - y.y);
                if ((e ? x : y.x) + E > h.width) E = h.width - (e ? x : y.x);
                if (f == CKEDITOR.DIALOG_RESIZE_WIDTH ||
                    f == CKEDITOR.DIALOG_RESIZE_BOTH) i = Math.max(g.minWidth || 0, E - m);
                if (f == CKEDITOR.DIALOG_RESIZE_HEIGHT || f == CKEDITOR.DIALOG_RESIZE_BOTH) D = Math.max(g.minHeight || 0, n - j);
                a.resize(i, D);
                a._.moved || a.layout();
                d.data.preventDefault()
            }
            function d() {
                CKEDITOR.document.removeListener("mouseup", d);
                CKEDITOR.document.removeListener("mousemove", e);
                i && (i.remove(), i = null);
                if (CKEDITOR.env.ie6Compat) {
                    var a = r.getChild(0).getFrameDocument();
                    a.removeListener("mouseup", d);
                    a.removeListener("mousemove", e)
                }
            }
            var g = a.definition,
                f = g.resizable;
            if (f != CKEDITOR.DIALOG_RESIZE_NONE) {
                var k = a.getParentEditor(),
                    m, j, h, o, i, n = CKEDITOR.tools.addFunction(function (f) {
                        o = a.getSize();
                        var g = a.parts.contents;
                        g.$.getElementsByTagName("iframe").length && (i = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'), g.append(i));
                        j = o.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                        m = o.width - a.parts.contents.getSize("width",
                        1);
                        b = f.screenX;
                        c = f.screenY;
                        h = CKEDITOR.document.getWindow().getViewPaneSize();
                        CKEDITOR.document.on("mousemove", e);
                        CKEDITOR.document.on("mouseup", d);
                        CKEDITOR.env.ie6Compat && (g = r.getChild(0).getFrameDocument(), g.on("mousemove", e), g.on("mouseup", d));
                        f.preventDefault && f.preventDefault()
                    });
                a.on("load", function () {
                    var b = "";
                    f == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : f == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                    b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' +
                        b + " cke_resizer_" + k.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(k.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + n + ', event )">' + ("ltr" == k.lang.dir ? "◢" : "◣") + "</div>");
                    a.parts.footer.append(b, 1)
                });
                k.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(n)
                })
            }
        }
        function F(a) {
            a.data.preventDefault(1)
        }
        function J(a) {
            var b = CKEDITOR.document.getWindow(),
                c = a.config,
                e = c.dialog_backgroundCoverColor || "white",
                d = c.dialog_backgroundCoverOpacity,
                g = c.baseFloatZIndex,
                c = CKEDITOR.tools.genKey(e,
                d, g),
                f = w[c];
            if (f) f.show();
            else {
                g = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", g, "; top: 0px; left: 0px; ", !CKEDITOR.env.ie6Compat ? "background-color: " + e : "", '" class="cke_dialog_background_cover">'];
                if (CKEDITOR.env.ie6Compat) {
                    var k = CKEDITOR.env.isCustomDomain(),
                        e = "<html><body style=\\'background-color:" + e + ";\\'></body></html>";
                    g.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                    g.push("void((function(){document.open();" +
                        (k ? "document.domain='" + document.domain + "';" : "") + "document.write( '" + e + "' );document.close();})())");
                    g.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')
                }
                g.push("</div>");
                f = CKEDITOR.dom.element.createFromHtml(g.join(""));
                f.setOpacity(void 0 != d ? d : 0.5);
                f.on("keydown", F);
                f.on("keypress", F);
                f.on("keyup", F);
                f.appendTo(CKEDITOR.document.getBody());
                w[c] = f
            }
            a.focusManager.add(f);
            r = f;
            var a = function () {
                var a = b.getViewPaneSize();
                f.setStyles({
                    width: a.width + "px",
                    height: a.height + "px"
                })
            }, m = function () {
                    var a = b.getScrollPosition(),
                        c = CKEDITOR.dialog._.currentTop;
                    f.setStyles({
                        left: a.x + "px",
                        top: a.y + "px"
                    });
                    if (c) {
                        do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog)
                    }
                };
            G = a;
            b.on("resize", a);
            a();
            (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && f.focus();
            if (CKEDITOR.env.ie6Compat) {
                var j = function () {
                    m();
                    arguments.callee.prevScrollHandler.apply(this, arguments)
                };
                b.$.setTimeout(function () {
                    j.prevScrollHandler = window.onscroll || function () {};
                    window.onscroll = j
                }, 0);
                m()
            }
        }
        function K(a) {
            r && (a.focusManager.remove(r), a = CKEDITOR.document.getWindow(), r.hide(), a.removeListener("resize", G), CKEDITOR.env.ie6Compat && a.$.setTimeout(function () {
                window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
            }, 0), G = null)
        }
        var s = CKEDITOR.tools.cssLength,
            S = '<div class="cke cke_reset_all {editorId} {editorDialogClass}" dir="{langDir}" lang="{langCode}" role="application"><table class="cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" aria-labelledby="cke_dialog_title_{id}" style="position:absolute" role="dialog"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
        CKEDITOR.dialog = function (a, b) {
            function c() {
                var a = l._.focusList;
                a.sort(function (a, b) {
                    return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
                });
                for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c
            }
            function e(a) {
                var b = l._.focusList,
                    a = a || 0;
                if (!(1 > b.length)) {
                    var c = l._.currentFocusIndex;
                    try {
                        b[c].getInputElement().$.blur()
                    } catch (f) {}
                    for (var d = c = (c + a + b.length) % b.length; a && !b[d].isFocusable() && !(d = (d + a + b.length) % b.length, d == c););
                    b[d].focus();
                    "text" == b[d].type && b[d].select()
                }
            }
            function d(b) {
                if (l ==
                    CKEDITOR.dialog._.currentTop) {
                    var c = b.data.getKeystroke(),
                        d = "rtl" == a.lang.dir;
                    o = i = 0;
                    if (9 == c || c == CKEDITOR.SHIFT + 9) c = c == CKEDITOR.SHIFT + 9, l._.tabBarMode ? (c = c ? p.call(l) : u.call(l), l.selectPage(c), l._.tabs[c][0].focus()) : e(c ? -1 : 1), o = 1;
                    else if (c == CKEDITOR.ALT + 121 && !l._.tabBarMode && 1 < l.getPageCount()) l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), o = 1;
                    else if ((37 == c || 39 == c) && l._.tabBarMode) c = c == (d ? 39 : 37) ? p.call(l) : u.call(l), l.selectPage(c), l._.tabs[c][0].focus(), o = 1;
                    else if ((13 == c || 32 == c) && l._.tabBarMode) this.selectPage(this._.currentTabId),
                    this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1), o = 1;
                    else if (13 == c) {
                        c = b.data.getTarget();
                        if (!c.is("a", "button", "select", "textarea") && (!c.is("input") || "button" != c.$.type))(c = this.getButton("ok")) && CKEDITOR.tools.setTimeout(c.click, 0, c), o = 1;
                        i = 1
                    } else if (27 == c)(c = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire("cancel", {
                            hide: !0
                        }).hide && this.hide(), i = 1;
                    else return;
                    g(b)
                }
            }
            function g(a) {
                o ? a.data.preventDefault(1) : i && a.data.stopPropagation()
            }
            var f = CKEDITOR.dialog._.dialogDefinitions[b],
                k = CKEDITOR.tools.clone(W),
                m = a.config.dialog_buttonsOrder || "OS",
                j = a.lang.dir,
                h = {}, o, i;
            ("OS" == m && CKEDITOR.env.mac || "rtl" == m && "ltr" == j || "ltr" == m && "rtl" == j) && k.buttons.reverse();
            f = CKEDITOR.tools.extend(f(a), k);
            f = CKEDITOR.tools.clone(f);
            f = new L(this, f);
            k = R(a);
            this._ = {
                editor: a,
                element: k.element,
                name: b,
                contentSize: {
                    width: 0,
                    height: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: !1,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: !1
            };
            this.parts = k.parts;
            CKEDITOR.tools.setTimeout(function () {
                a.fire("ariaWidget", this.parts.contents)
            }, 0, this);
            k = {
                position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
                top: 0,
                visibility: "hidden"
            };
            k["rtl" == j ? "right" : "left"] = 0;
            this.parts.dialog.setStyles(k);
            CKEDITOR.event.call(this);
            this.definition = f = CKEDITOR.fire("dialogDefinition", {
                name: b,
                definition: f
            }, a).definition;
            if (!("removeDialogTabs" in a._) && a.config.removeDialogTabs) {
                k = a.config.removeDialogTabs.split(";");
                for (j = 0; j <
                    k.length; j++) if (m = k[j].split(":"), 2 == m.length) {
                        var n = m[0];
                        h[n] || (h[n] = []);
                        h[n].push(m[1])
                    }
                a._.removeDialogTabs = h
            }
            if (a._.removeDialogTabs && (h = a._.removeDialogTabs[b])) for (j = 0; j < h.length; j++) f.removeContents(h[j]);
            if (f.onLoad) this.on("load", f.onLoad);
            if (f.onShow) this.on("show", f.onShow);
            if (f.onHide) this.on("hide", f.onHide);
            if (f.onOk) this.on("ok", function (b) {
                    a.fire("saveSnapshot");
                    setTimeout(function () {
                        a.fire("saveSnapshot")
                    }, 0);
                    !1 === f.onOk.call(this, b) && (b.data.hide = !1)
                });
            if (f.onCancel) this.on("cancel",

                function (a) {
                    !1 === f.onCancel.call(this, a) && (a.data.hide = !1)
                });
            var l = this,
                C = function (a) {
                    var b = l._.contents,
                        c = !1,
                        d;
                    for (d in b) for (var f in b[d]) if (c = a.call(this, b[d][f])) return
                };
            this.on("ok", function (a) {
                C(function (b) {
                    if (b.validate) {
                        var c = b.validate(this),
                            d = "string" == typeof c || !1 === c;
                        d && (a.data.hide = !1, a.stop());
                        P.call(b, !d, "string" == typeof c ? c : void 0);
                        return d
                    }
                })
            }, this, null, 0);
            this.on("cancel", function (b) {
                C(function (c) {
                    if (c.isChanged()) return confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0
                })
            },
            this, null, 0);
            this.parts.close.on("click", function (a) {
                !1 !== this.fire("cancel", {
                    hide: !0
                }).hide && this.hide();
                a.data.preventDefault()
            }, this);
            this.changeFocus = e;
            var v = this._.element;
            a.focusManager.add(v, 1);
            this.on("show", function () {
                v.on("keydown", d, this);
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko) v.on("keypress", g, this)
            });
            this.on("hide", function () {
                v.removeListener("keydown", d);
                (CKEDITOR.env.opera || CKEDITOR.env.gecko) && v.removeListener("keypress", g);
                C(function (a) {
                    Q.apply(a)
                })
            });
            this.on("iframeAdded", function (a) {
                (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown",
                d, this, null, 0)
            });
            this.on("show", function () {
                c();
                if (a.config.dialog_startupFocusTab && 1 < l._.pageCount) l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus();
                else if (!this._.hasFocus) if (this._.currentFocusIndex = -1, f.onFocus) {
                        var b = f.onFocus.call(this);
                        b && b.focus()
                    } else e(1)
            }, this, null, 4294967295);
            if (CKEDITOR.env.ie6Compat) this.on("load", function () {
                    var a = this.getElement(),
                        b = a.getFirst();
                    b.remove();
                    b.appendTo(a)
                }, this);
            U(this);
            V(this);
            (new CKEDITOR.dom.text(f.title, CKEDITOR.document)).appendTo(this.parts.title);
            for (j = 0; j < f.contents.length; j++)(h = f.contents[j]) && this.addPage(h);
            this.parts.tabs.on("click", function (a) {
                var b = a.data.getTarget();
                b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))), this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1)), a.data.preventDefault())
            }, this);
            j = [];
            h = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                type: "hbox",
                className: "cke_dialog_footer_buttons",
                widths: [],
                children: f.buttons
            }, j).getChild();
            this.parts.footer.setHtml(j.join(""));
            for (j = 0; j < h.length; j++) this._.buttons[h[j].id] = h[j]
        };
        CKEDITOR.dialog.prototype = {
            destroy: function () {
                this.hide();
                this._.element.remove()
            },
            resize: function () {
                return function (a, b) {
                    if (!this._.contentSize || !(this._.contentSize.width == a && this._.contentSize.height == b)) CKEDITOR.dialog.fire("resize", {
                            dialog: this,
                            width: a,
                            height: b
                        }, this._.editor), this.fire("resize", {
                            width: a,
                            height: b
                        }, this._.editor), this.parts.contents.setStyles({
                            width: a + "px",
                            height: b + "px"
                        }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x =
                            CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
                            width: a,
                            height: b
                    }
                }
            }(),
            getSize: function () {
                var a = this._.element.getFirst();
                return {
                    width: a.$.offsetWidth || 0,
                    height: a.$.offsetHeight || 0
                }
            },
            move: function (a, b, c) {
                var e = this._.element.getFirst(),
                    d = "rtl" == this._.editor.lang.dir,
                    g = "fixed" == e.getComputedStyle("position");
                CKEDITOR.env.ie && e.setStyle("zoom", "100%");
                if (!g || !this._.position || !(this._.position.x ==
                    a && this._.position.y == b)) this._.position = {
                        x: a,
                        y: b
                }, g || (g = CKEDITOR.document.getWindow().getScrollPosition(), a += g.x, b += g.y), d && (g = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - g.width - a), b = {
                    top: (0 < b ? b : 0) + "px"
                }, b[d ? "right" : "left"] = (0 < a ? a : 0) + "px", e.setStyles(b), c && (this._.moved = 1)
            },
            getPosition: function () {
                return CKEDITOR.tools.extend({}, this._.position)
            },
            show: function () {
                var a = this._.element,
                    b = this.definition;
                !a.getParent() || !a.getParent().equals(CKEDITOR.document.getBody()) ? a.appendTo(CKEDITOR.document.getBody()) :
                    a.setStyle("display", "block");
                if (CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version) {
                    var c = this.parts.dialog;
                    c.setStyle("position", "absolute");
                    setTimeout(function () {
                        c.setStyle("position", "fixed")
                    }, 0)
                }
                this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
                this.reset();
                this.selectPage(this.definition.contents[0].id);
                null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
                this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
                null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, J(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this);
                a.on("keydown", M);
                a.on(CKEDITOR.env.opera ? "keypress" : "keyup", N);
                this._.hasFocus = !1;
                CKEDITOR.tools.setTimeout(function () {
                    this.layout();
                    T(this);
                    this.parts.dialog.setStyle("visibility", "");
                    this.fireOnce("load", {});
                    CKEDITOR.ui.fire("ready", this);
                    this.fire("show", {});
                    this._.editor.fire("dialogShow", this);
                    this._.parentDialog || this._.editor.focusManager.lock();
                    this.foreach(function (a) {
                        a.setInitValue && a.setInitValue()
                    })
                }, 100, this)
            },
            layout: function () {
                var a = this.parts.dialog,
                    b = this.getSize(),
                    c = CKEDITOR.document.getWindow().getViewPaneSize(),
                    e = (c.width - b.width) / 2,
                    d = (c.height - b.height) / 2;
                CKEDITOR.env.ie6Compat || (b.height + (0 < d ? d : 0) > c.height ||
                    b.width + (0 < e ? e : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                this.move(this._.moved ? this._.position.x : e, this._.moved ? this._.position.y : d)
            },
            foreach: function (a) {
                for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
                return this
            },
            reset: function () {
                var a = function (a) {
                    a.reset && a.reset(1)
                };
                return function () {
                    this.foreach(a);
                    return this
                }
            }(),
            setupContent: function () {
                var a = arguments;
                this.foreach(function (b) {
                    b.setup && b.setup.apply(b, a)
                })
            },
            commitContent: function () {
                var a = arguments;
                this.foreach(function (b) {
                    CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                    b.commit && b.commit.apply(b, a)
                })
            },
            hide: function () {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {});
                    this._.editor.fire("dialogHide", this);
                    this.selectPage(this._.tabIdList[0]);
                    var a = this._.element;
                    a.setStyle("display", "none");
                    this.parts.dialog.setStyle("visibility", "hidden");
                    for (X(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var b = this._.parentDialog.getElement().getFirst();
                        b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                    } else K(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10;
                    else {
                        CKEDITOR.dialog._.currentZIndex = null;
                        a.removeListener("keydown", M);
                        a.removeListener(CKEDITOR.env.opera ? "keypress" : "keyup", N);
                        var c = this._.editor;
                        c.focus();
                        setTimeout(function () {
                            c.focusManager.unlock()
                        }, 0)
                    }
                    delete this._.parentDialog;
                    this.foreach(function (a) {
                        a.resetInitValue && a.resetInitValue()
                    })
                }
            },
            addPage: function (a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                            type: "vbox",
                            className: "cke_dialog_page_contents",
                            children: a.elements,
                            expand: !! a.expand,
                            padding: a.padding,
                            style: a.style || "width: 100%;"
                        }, b), d = this._.contents[a.id] = {}, g = e.getChild(), f = 0; e = g.shift();)!e.notAllowed && ("hbox" !=
                        e.type && "vbox" != e.type) && f++, d[e.id] = e, "function" == typeof e.getChild && g.push.apply(g, e.getChild());
                    f || (a.hidden = !0);
                    b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                    b.setAttribute("role", "tabpanel");
                    e = CKEDITOR.env;
                    d = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
                    c = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', d, '"', e.gecko && 10900 <= e.version && !e.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">',
                        a.label, "</a>"
                    ].join(""));
                    b.setAttribute("aria-labelledby", d);
                    this._.tabs[a.id] = [c, b];
                    this._.tabIdList.push(a.id);
                    !a.hidden && this._.pageCount++;
                    this._.lastTab = c;
                    this.updateStyle();
                    b.setAttribute("name", a.id);
                    b.appendTo(this.parts.contents);
                    c.unselectable();
                    this.parts.tabs.append(c);
                    a.accessKey && (O(this, this, "CTRL+" + a.accessKey, Y, Z), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
                }
            },
            selectPage: function (a) {
                if (this._.currentTabId != a && !0 !== this.fire("selectPage", {
                    page: a,
                    currentPage: this._.currentTabId
                })) {
                    for (var b in this._.tabs) {
                        var c =
                            this._.tabs[b][0],
                            e = this._.tabs[b][1];
                        b != a && (c.removeClass("cke_dialog_tab_selected"), e.hide());
                        e.setAttribute("aria-hidden", b != a)
                    }
                    var d = this._.tabs[a];
                    d[0].addClass("cke_dialog_tab_selected");
                    CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (q(d[1]), d[1].show(), setTimeout(function () {
                        q(d[1], 1)
                    }, 0)) : d[1].show();
                    this._.currentTabId = a;
                    this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            },
            updateStyle: function () {
                this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
            },
            hidePage: function (a) {
                var b = this._.tabs[a] && this._.tabs[a][0];
                b && (1 != this._.pageCount && b.isVisible()) && (a == this._.currentTabId && this.selectPage(p.call(this)), b.hide(), this._.pageCount--, this.updateStyle())
            },
            showPage: function (a) {
                if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle()
            },
            getElement: function () {
                return this._.element
            },
            getName: function () {
                return this._.name
            },
            getContentElement: function (a, b) {
                var c = this._.contents[a];
                return c && c[b]
            },
            getValueOf: function (a, b) {
                return this.getContentElement(a,
                b).getValue()
            },
            setValueOf: function (a, b, c) {
                return this.getContentElement(a, b).setValue(c)
            },
            getButton: function (a) {
                return this._.buttons[a]
            },
            click: function (a) {
                return this._.buttons[a].click()
            },
            disableButton: function (a) {
                return this._.buttons[a].disable()
            },
            enableButton: function (a) {
                return this._.buttons[a].enable()
            },
            getPageCount: function () {
                return this._.pageCount
            },
            getParentEditor: function () {
                return this._.editor
            },
            getSelectedElement: function () {
                return this.getParentEditor().getSelection().getSelectedElement()
            },
            addFocusable: function (a, b) {
                if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new H(this, a, b));
                else {
                    this._.focusList.splice(b, 0, new H(this, a, b));
                    for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
                }
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function (a, b) {
                if (!this._.dialogDefinitions[a] || "function" == typeof b) this._.dialogDefinitions[a] = b
            },
            exists: function (a) {
                return !!this._.dialogDefinitions[a]
            },
            getCurrent: function () {
                return CKEDITOR.dialog._.currentTop
            },
            isTabEnabled: function (a, b, c) {
                a = a.config.removeDialogTabs;
                return !(a && a.match(RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")))
            },
            okButton: function () {
                var a = function (a, c) {
                    c = c || {};
                    return CKEDITOR.tools.extend({
                        id: "ok",
                        type: "button",
                        label: a.lang.common.ok,
                        "class": "cke_dialog_ui_button_ok",
                        onClick: function (a) {
                            a = a.data.dialog;
                            !1 !== a.fire("ok", {
                                hide: !0
                            }).hide && a.hide()
                        }
                    }, c, !0)
                };
                a.type = "button";
                a.override = function (b) {
                    return CKEDITOR.tools.extend(function (c) {
                        return a(c, b)
                    }, {
                        type: "button"
                    }, !0)
                };
                return a
            }(),
            cancelButton: function () {
                var a = function (a, c) {
                    c = c || {};
                    return CKEDITOR.tools.extend({
                        id: "cancel",
                        type: "button",
                        label: a.lang.common.cancel,
                        "class": "cke_dialog_ui_button_cancel",
                        onClick: function (a) {
                            a = a.data.dialog;
                            !1 !== a.fire("cancel", {
                                hide: !0
                            }).hide && a.hide()
                        }
                    }, c, !0)
                };
                a.type = "button";
                a.override = function (b) {
                    return CKEDITOR.tools.extend(function (c) {
                        return a(c, b)
                    }, {
                        type: "button"
                    }, !0)
                };
                return a
            }(),
            addUIElement: function (a, b) {
                this._.uiElementBuilders[a] = b
            }
        });
        CKEDITOR.dialog._ = {
            uiElementBuilders: {},
            dialogDefinitions: {},
            currentTop: null,
            currentZIndex: null
        };
        CKEDITOR.event.implementOn(CKEDITOR.dialog);
        CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var W = {
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
            minWidth: 600,
            minHeight: 400,
            buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
        }, z = function (a, b, c) {
                for (var e = 0, d; d = a[e]; e++) if (d.id == b || c && d[c] && (d = z(d[c], b, c))) return d;
                return null
            }, A = function (a, b, c, e, d) {
                if (c) {
                    for (var g = 0, f; f = a[g]; g++) {
                        if (f.id == c) return a.splice(g, 0, b), b;
                        if (e && f[e] && (f = A(f[e], b, c, e, !0))) return f
                    }
                    if (d) return null
                }
                a.push(b);
                return b
            },
            B = function (a, b, c) {
                for (var e = 0, d; d = a[e]; e++) {
                    if (d.id == b) return a.splice(e, 1);
                    if (c && d[c] && (d = B(d[c], b, c))) return d
                }
                return null
            }, L = function (a, b) {
                this.dialog = a;
                for (var c = b.contents, e = 0, d; d = c[e]; e++) c[e] = d && new I(a, d);
                CKEDITOR.tools.extend(this, b)
            };
        L.prototype = {
            getContents: function (a) {
                return z(this.contents, a)
            },
            getButton: function (a) {
                return z(this.buttons, a)
            },
            addContents: function (a, b) {
                return A(this.contents, a, b)
            },
            addButton: function (a, b) {
                return A(this.buttons, a, b)
            },
            removeContents: function (a) {
                B(this.contents,
                a)
            },
            removeButton: function (a) {
                B(this.buttons, a)
            }
        };
        I.prototype = {
            get: function (a) {
                return z(this.elements, a, "children")
            },
            add: function (a, b) {
                return A(this.elements, a, b, "children")
            },
            remove: function (a) {
                B(this.elements, a, "children")
            }
        };
        var G, w = {}, r, t = {}, M = function (a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey,
                    c = a.data.$.altKey,
                    e = a.data.$.shiftKey,
                    d = String.fromCharCode(a.data.$.keyCode);
                if ((b = t[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length) b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog,
                    b.key), a.data.preventDefault()
            }, N = function (a) {
                var b = a.data.$.ctrlKey || a.data.$.metaKey,
                    c = a.data.$.altKey,
                    e = a.data.$.shiftKey,
                    d = String.fromCharCode(a.data.$.keyCode);
                if ((b = t[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (e ? "SHIFT+" : "") + d]) && b.length) b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
            }, O = function (a, b, c, e, d) {
                (t[c] || (t[c] = [])).push({
                    uiElement: a,
                    dialog: b,
                    key: c,
                    keyup: d || a.accessKeyUp,
                    keydown: e || a.accessKeyDown
                })
            }, X = function (a) {
                for (var b in t) {
                    for (var c = t[b], e = c.length -
                            1; 0 <= e; e--)(c[e].dialog == a || c[e].uiElement == a) && c.splice(e, 1);
                    0 === c.length && delete t[b]
                }
            }, Z = function (a, b) {
                a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
            }, Y = function () {};
        (function () {
            CKEDITOR.ui.dialog = {
                uiElement: function (a, b, c, e, d, g, f) {
                    if (!(4 > arguments.length)) {
                        var k = (e.call ? e(b) : e) || "div",
                            m = ["<", k, " "],
                            j = (d && d.call ? d(b) : d) || {}, h = (g && g.call ? g(b) : g) || {}, o = (f && f.call ? f.call(this, a, b) : f) || "",
                            i = this.domId = h.id || CKEDITOR.tools.getNextId() + "_uiElement";
                        this.id = b.id;
                        b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) &&
                            (j.display = "none", this.notAllowed = !0);
                        h.id = i;
                        var n = {};
                        b.type && (n["cke_dialog_ui_" + b.type] = 1);
                        b.className && (n[b.className] = 1);
                        b.disabled && (n.cke_disabled = 1);
                        for (var l = h["class"] && h["class"].split ? h["class"].split(" ") : [], i = 0; i < l.length; i++) l[i] && (n[l[i]] = 1);
                        l = [];
                        for (i in n) l.push(i);
                        h["class"] = l.join(" ");
                        b.title && (h.title = b.title);
                        n = (b.style || "").split(";");
                        b.align && (l = b.align, j["margin-left"] = "left" == l ? 0 : "auto", j["margin-right"] = "right" == l ? 0 : "auto");
                        for (i in j) n.push(i + ":" + j[i]);
                        b.hidden && n.push("display:none");
                        for (i = n.length - 1; 0 <= i; i--) "" === n[i] && n.splice(i, 1);
                        0 < n.length && (h.style = (h.style ? h.style + "; " : "") + n.join("; "));
                        for (i in h) m.push(i + '="' + CKEDITOR.tools.htmlEncode(h[i]) + '" ');
                        m.push(">", o, "</", k, ">");
                        c.push(m.join(""));
                        (this._ || (this._ = {})).dialog = a;
                        "boolean" == typeof b.isChanged && (this.isChanged = function () {
                            return b.isChanged
                        });
                        "function" == typeof b.isChanged && (this.isChanged = b.isChanged);
                        "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) {
                            return function (c) {
                                a.call(this,
                                b.setValue.call(this, c))
                            }
                        }));
                        "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function (a) {
                            return function () {
                                return b.getValue.call(this, a.call(this))
                            }
                        }));
                        CKEDITOR.event.implementOn(this);
                        this.registerEvents(b);
                        this.accessKeyUp && (this.accessKeyDown && b.accessKey) && O(this, a, "CTRL+" + b.accessKey);
                        var p = this;
                        a.on("load", function () {
                            var b = p.getInputElement();
                            if (b) {
                                var c = p.type in {
                                    checkbox: 1,
                                    ratio: 1
                                } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                b.on("focus",

                                function () {
                                    a._.tabBarMode = false;
                                    a._.hasFocus = true;
                                    p.fire("focus");
                                    c && this.addClass(c)
                                });
                                b.on("blur", function () {
                                    p.fire("blur");
                                    c && this.removeClass(c)
                                })
                            }
                        });
                        this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function () {
                            a._.currentFocusIndex = p.focusIndex
                        }));
                        CKEDITOR.tools.extend(this, b)
                    }
                },
                hbox: function (a, b, c, e, d) {
                    if (!(4 > arguments.length)) {
                        this._ || (this._ = {});
                        var g = this._.children = b,
                            f = d && d.widths || null,
                            k = d && d.height || null,
                            m, j = {
                                role: "presentation"
                            };
                        d && d.align && (j.align = d.align);
                        CKEDITOR.ui.dialog.uiElement.call(this, a, d || {
                            type: "hbox"
                        }, e, "table", {}, j, function () {
                            var a = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                            for (m = 0; m < c.length; m++) {
                                var b = "cke_dialog_ui_hbox_child",
                                    e = [];
                                0 === m && (b = "cke_dialog_ui_hbox_first");
                                m == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                a.push('<td class="', b, '" role="presentation" ');
                                f ? f[m] && e.push("width:" + s(f[m])) : e.push("width:" + Math.floor(100 / c.length) + "%");
                                k && e.push("height:" + s(k));
                                d && void 0 != d.padding && e.push("padding:" +
                                    s(d.padding));
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && g[m].align) && e.push("text-align:" + g[m].align);
                                0 < e.length && a.push('style="' + e.join("; ") + '" ');
                                a.push(">", c[m], "</td>")
                            }
                            a.push("</tr></tbody>");
                            return a.join("")
                        })
                    }
                },
                vbox: function (a, b, c, e, d) {
                    if (!(3 > arguments.length)) {
                        this._ || (this._ = {});
                        var g = this._.children = b,
                            f = d && d.width || null,
                            k = d && d.heights || null;
                        CKEDITOR.ui.dialog.uiElement.call(this, a, d || {
                            type: "vbox"
                        }, e, "div", null, {
                            role: "presentation"
                        }, function () {
                            var b = ['<table role="presentation" cellspacing="0" border="0" '];
                            b.push('style="');
                            d && d.expand && b.push("height:100%;");
                            b.push("width:" + s(f || "100%"), ";");
                            CKEDITOR.env.webkit && b.push("float:none;");
                            b.push('"');
                            b.push('align="', CKEDITOR.tools.htmlEncode(d && d.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
                            b.push("><tbody>");
                            for (var e = 0; e < c.length; e++) {
                                var h = [];
                                b.push('<tr><td role="presentation" ');
                                f && h.push("width:" + s(f || "100%"));
                                k ? h.push("height:" + s(k[e])) : d && d.expand && h.push("height:" + Math.floor(100 / c.length) + "%");
                                d && void 0 != d.padding && h.push("padding:" +
                                    s(d.padding));
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && g[e].align) && h.push("text-align:" + g[e].align);
                                0 < h.length && b.push('style="', h.join("; "), '" ');
                                b.push(' class="cke_dialog_ui_vbox_child">', c[e], "</td></tr>")
                            }
                            b.push("</tbody></table>");
                            return b.join("")
                        })
                    }
                }
            }
        })();
        CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function () {
                return CKEDITOR.document.getById(this.domId)
            },
            getInputElement: function () {
                return this.getElement()
            },
            getDialog: function () {
                return this._.dialog
            },
            setValue: function (a, b) {
                this.getInputElement().setValue(a);
                !b && this.fire("change", {
                    value: a
                });
                return this
            },
            getValue: function () {
                return this.getInputElement().getValue()
            },
            isChanged: function () {
                return !1
            },
            selectParentTab: function () {
                for (var a = this.getInputElement();
                (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
                if (!a) return this;
                a = a.getAttribute("name");
                this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                return this
            },
            focus: function () {
                this.selectParentTab().getInputElement().focus();
                return this
            },
            registerEvents: function (a) {
                var b =
                    /^on([A-Z]\w+)/,
                    c, e = function (a, b, c, d) {
                        b.on("load", function () {
                            a.getInputElement().on(c, d, a)
                        })
                    }, d;
                for (d in a) if (c = d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : e(this, this._.dialog, c[1].toLowerCase(), a[d]);
                return this
            },
            eventProcessors: {
                onLoad: function (a, b) {
                    a.on("load", b, this)
                },
                onShow: function (a, b) {
                    a.on("show", b, this)
                },
                onHide: function (a, b) {
                    a.on("hide", b, this)
                }
            },
            accessKeyDown: function () {
                this.focus()
            },
            accessKeyUp: function () {},
            disable: function () {
                var a = this.getElement();
                this.getInputElement().setAttribute("disabled", "true");
                a.addClass("cke_disabled")
            },
            enable: function () {
                var a = this.getElement();
                this.getInputElement().removeAttribute("disabled");
                a.removeClass("cke_disabled")
            },
            isEnabled: function () {
                return !this.getElement().hasClass("cke_disabled")
            },
            isVisible: function () {
                return this.getInputElement().isVisible()
            },
            isFocusable: function () {
                return !this.isEnabled() || !this.isVisible() ? !1 : !0
            }
        };
        CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
            getChild: function (a) {
                if (1 > arguments.length) return this._.children.concat();
                a.splice || (a = [a]);
                return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
            }
        }, !0);
        CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
        (function () {
            var a = {
                build: function (a, c, e) {
                    for (var d = c.children, g, f = [], k = [], m = 0; m < d.length && (g = d[m]); m++) {
                        var j = [];
                        f.push(j);
                        k.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, j))
                    }
                    return new CKEDITOR.ui.dialog[c.type](a,
                    k, f, e, c)
                }
            };
            CKEDITOR.dialog.addUIElement("hbox", a);
            CKEDITOR.dialog.addUIElement("vbox", a)
        })();
        CKEDITOR.dialogCommand = function (a, b) {
            this.dialogName = a;
            CKEDITOR.tools.extend(this, b, !0)
        };
        CKEDITOR.dialogCommand.prototype = {
            exec: function (a) {
                CKEDITOR.env.opera ? CKEDITOR.tools.setTimeout(function () {
                    a.openDialog(this.dialogName)
                }, 0, this) : a.openDialog(this.dialogName)
            },
            canUndo: !1,
            editorFocus: 1
        };
        (function () {
            var a = /^([a]|[^a])+$/,
                b = /^\d*$/,
                c = /^\d*(?:\.\d+)?$/,
                e = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                d = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                g = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            CKEDITOR.VALIDATE_OR = 1;
            CKEDITOR.VALIDATE_AND = 2;
            CKEDITOR.dialog.validate = {
                functions: function () {
                    var a = arguments;
                    return function () {
                        var b = this && this.getValue ? this.getValue() : a[0],
                            c = void 0,
                            d = CKEDITOR.VALIDATE_AND,
                            e = [],
                            g;
                        for (g = 0; g < a.length; g++) if ("function" == typeof a[g]) e.push(a[g]);
                            else break;
                        g < a.length && "string" == typeof a[g] && (c = a[g], g++);
                        g < a.length && "number" == typeof a[g] && (d = a[g]);
                        var i = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
                        for (g = 0; g < e.length; g++) i = d == CKEDITOR.VALIDATE_AND ?
                                i && e[g](b) : i || e[g](b);
                        return !i ? c : !0
                    }
                },
                regex: function (a, b) {
                    return function (c) {
                        c = this && this.getValue ? this.getValue() : c;
                        return !a.test(c) ? b : !0
                    }
                },
                notEmpty: function (b) {
                    return this.regex(a, b)
                },
                integer: function (a) {
                    return this.regex(b, a)
                },
                number: function (a) {
                    return this.regex(c, a)
                },
                cssLength: function (a) {
                    return this.functions(function (a) {
                        return d.test(CKEDITOR.tools.trim(a))
                    }, a)
                },
                htmlLength: function (a) {
                    return this.functions(function (a) {
                        return e.test(CKEDITOR.tools.trim(a))
                    }, a)
                },
                inlineStyle: function (a) {
                    return this.functions(function (a) {
                        return g.test(CKEDITOR.tools.trim(a))
                    },
                    a)
                },
                equals: function (a, b) {
                    return this.functions(function (b) {
                        return b == a
                    }, b)
                },
                notEqual: function (a, b) {
                    return this.functions(function (b) {
                        return b != a
                    }, b)
                }
            };
            CKEDITOR.on("instanceDestroyed", function (a) {
                if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                    for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
                    for (var c in w) w[c].remove();
                    w = {}
                }
                var a = a.editor._.storedDialogs,
                    d;
                for (d in a) a[d].destroy()
            })
        })();
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function (a, b) {
                var c = null,
                    e = CKEDITOR.dialog._.dialogDefinitions[a];
                null === CKEDITOR.dialog._.currentTop && J(this);
                if ("function" == typeof e) c = this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show();
                else {
                    if ("failed" == e) throw K(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                    "string" == typeof e && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e), function () {
                        "function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                        this.openDialog(a,
                        b)
                    }, this, 0, 1)
                }
                CKEDITOR.skin.loadPart("dialog");
                return c
            }
        })
    })();
    CKEDITOR.plugins.add("dialog", {
        requires: "dialogui",
        init: function (p) {
            p.on("contentDom", function () {
                var u = p.editable();
                u.attachListener(u, "dblclick", function (q) {
                    if (p.readOnly) return !1;
                    q = {
                        element: q.data.getTarget()
                    };
                    p.fire("doubleclick", q);
                    q.dialog && p.openDialog(q.dialog);
                    return 1
                })
            })
        }
    });
    CKEDITOR.plugins.add("about", {
        requires: "dialog",
        init: function (a) {
            var b = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
            b.modes = {
                wysiwyg: 1,
                source: 1
            };
            b.canUndo = !1;
            b.readOnly = 1;
            a.ui.addButton && a.ui.addButton("About", {
                label: a.lang.about.title,
                command: "about",
                toolbar: "about"
            });
            CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
        }
    });
    (function () {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog",
            availableLangs: {
                en: 1,
                ar: 1,
                bg: 1,
                ca: 1,
                et: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                eo: 1,
                es: 1,
                fa: 1,
                fi: 1,
                fr: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                it: 1,
                ja: 1,
                km: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                pt: 1,
                "pt-br": 1,
                ro: 1,
                ru: 1,
                sk: 1,
                sl: 1,
                sv: 1,
                th: 1,
                tr: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1
            },
            init: function (b) {
                var c = this;
                b.addCommand("a11yHelp", {
                    exec: function () {
                        var a = b.langCode,
                            a = c.availableLangs[a] ? a : c.availableLangs[a.replace(/-.*/, "")] ? a.replace(/-.*/, "") : "en";
                        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path +
                            "dialogs/lang/" + a + ".js"), function () {
                            b.lang.a11yhelp = c.langEntries[a];
                            b.openDialog("a11yHelp")
                        })
                    },
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    },
                    readOnly: 1,
                    canUndo: !1
                });
                b.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
                CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js")
            }
        })
    })();
    (function () {
        function f(c) {
            var a = this.att,
                c = c && c.hasAttribute(a) && c.getAttribute(a) || "";
            void 0 !== c && this.setValue(c)
        }
        function g() {
            for (var c, a = 0; a < arguments.length; a++) if (arguments[a] instanceof CKEDITOR.dom.element) {
                    c = arguments[a];
                    break
                }
            if (c) {
                var a = this.att,
                    b = this.getValue();
                b ? c.setAttribute(a, b) : c.removeAttribute(a, b)
            }
        }
        var i = {
            id: 1,
            dir: 1,
            classes: 1,
            styles: 1
        };
        CKEDITOR.plugins.add("dialogadvtab", {
            requires: "dialog",
            allowedContent: function (c) {
                c || (c = i);
                var a = [];
                c.id && a.push("id");
                c.dir && a.push("dir");
                var b =
                    "";
                a.length && (b += "[" + a.join(",") + "]");
                c.classes && (b += "(*)");
                c.styles && (b += "{*}");
                return b
            },
            createAdvancedTab: function (c, a, b) {
                a || (a = i);
                var d = c.lang.common,
                    h = {
                        id: "advanced",
                        label: d.advancedTab,
                        title: d.advancedTab,
                        elements: [{
                                type: "vbox",
                                padding: 1,
                                children: []
                            }
                        ]
                    }, e = [];
                if (a.id || a.dir) a.id && e.push({
                        id: "advId",
                        att: "id",
                        type: "text",
                        requiredContent: b ? b + "[id]" : null,
                        label: d.id,
                        setup: f,
                        commit: g
                    }), a.dir && e.push({
                        id: "advLangDir",
                        att: "dir",
                        type: "select",
                        requiredContent: b ? b + "[dir]" : null,
                        label: d.langDir,
                        "default": "",
                        style: "width:100%",
                        items: [
                            [d.notSet, ""],
                            [d.langDirLTR, "ltr"],
                            [d.langDirRTL, "rtl"]
                        ],
                        setup: f,
                        commit: g
                    }), h.elements[0].children.push({
                        type: "hbox",
                        widths: ["50%", "50%"],
                        children: [].concat(e)
                    });
                if (a.styles || a.classes) e = [], a.styles && e.push({
                        id: "advStyles",
                        att: "style",
                        type: "text",
                        requiredContent: b ? b + "{cke-xyz}" : null,
                        label: d.styles,
                        "default": "",
                        validate: CKEDITOR.dialog.validate.inlineStyle(d.invalidInlineStyle),
                        onChange: function () {},
                        getStyle: function (a, c) {
                            var b = this.getValue().match(RegExp("(?:^|;)\\s*" + a +
                                "\\s*:\\s*([^;]*)", "i"));
                            return b ? b[1] : c
                        },
                        updateStyle: function (a, b) {
                            var d = this.getValue(),
                                e = c.document.createElement("span");
                            e.setAttribute("style", d);
                            e.setStyle(a, b);
                            d = CKEDITOR.tools.normalizeCssText(e.getAttribute("style"));
                            this.setValue(d, 1)
                        },
                        setup: f,
                        commit: g
                    }), a.classes && e.push({
                        type: "hbox",
                        widths: ["45%", "55%"],
                        children: [{
                                id: "advCSSClasses",
                                att: "class",
                                type: "text",
                                requiredContent: b ? b + "(cke-xyz)" : null,
                                label: d.cssClasses,
                                "default": "",
                                setup: f,
                                commit: g
                            }
                        ]
                    }), h.elements[0].children.push({
                        type: "hbox",
                        widths: ["50%", "50%"],
                        children: [].concat(e)
                    });
                return h
            }
        })
    })();
    CKEDITOR.plugins.add("basicstyles", {
        init: function (c) {
            var e = 0,
                d = function (g, d, b, a) {
                    if (a) {
                        var a = new CKEDITOR.style(a),
                            f = h[b];
                        f.unshift(a);
                        c.attachStyleStateChange(a, function (a) {
                            !c.readOnly && c.getCommand(b).setState(a)
                        });
                        c.addCommand(b, new CKEDITOR.styleCommand(a, {
                            contentForms: f
                        }));
                        c.ui.addButton && c.ui.addButton(g, {
                            label: d,
                            command: b,
                            toolbar: "basicstyles," + (e += 10)
                        })
                    }
                }, h = {
                    bold: ["strong", "b", ["span", function (a) {
                                a = a.styles["font-weight"];
                                return "bold" == a || 700 <= +a
                            }
                        ]],
                    italic: ["em", "i", ["span", function (a) {
                                return "italic" ==
                                    a.styles["font-style"]
                            }
                        ]],
                    underline: ["u", ["span", function (a) {
                                return "underline" == a.styles["text-decoration"]
                            }
                        ]],
                    strike: ["s", "strike", ["span", function (a) {
                                return "line-through" == a.styles["text-decoration"]
                            }
                        ]],
                    subscript: ["sub"],
                    superscript: ["sup"]
                }, b = c.config,
                a = c.lang.basicstyles;
            d("Bold", a.bold, "bold", b.coreStyles_bold);
            d("Italic", a.italic, "italic", b.coreStyles_italic);
            d("Underline", a.underline, "underline", b.coreStyles_underline);
            d("Strike", a.strike, "strike", b.coreStyles_strike);
            d("Subscript", a.subscript,
                "subscript", b.coreStyles_subscript);
            d("Superscript", a.superscript, "superscript", b.coreStyles_superscript);
            c.setKeystroke([
                [CKEDITOR.CTRL + 66, "bold"],
                [CKEDITOR.CTRL + 73, "italic"],
                [CKEDITOR.CTRL + 85, "underline"]
            ])
        }
    });
    CKEDITOR.config.coreStyles_bold = {
        element: "strong",
        overrides: "b"
    };
    CKEDITOR.config.coreStyles_italic = {
        element: "em",
        overrides: "i"
    };
    CKEDITOR.config.coreStyles_underline = {
        element: "u"
    };
    CKEDITOR.config.coreStyles_strike = {
        element: "s",
        overrides: "strike"
    };
    CKEDITOR.config.coreStyles_subscript = {
        element: "sub"
    };
    CKEDITOR.config.coreStyles_superscript = {
        element: "sup"
    };
    (function () {
        function n(a, f, d, b) {
            if (!a.isReadOnly() && !a.equals(d.editable())) {
                CKEDITOR.dom.element.setMarker(b, a, "bidi_processed", 1);
                for (var b = a, c = d.editable();
                (b = b.getParent()) && !b.equals(c);) if (b.getCustomData("bidi_processed")) {
                        a.removeStyle("direction");
                        a.removeAttribute("dir");
                        return
                    }
                b = "useComputedState" in d.config ? d.config.useComputedState : 1;
                if ((b ? a.getComputedStyle("direction") : a.getStyle("direction") || a.hasAttribute("dir")) != f) a.removeStyle("direction"), b ? (a.removeAttribute("dir"), f != a.getComputedStyle("direction") &&
                        a.setAttribute("dir", f)) : a.setAttribute("dir", f), d.forceNextSelectionCheck()
            }
        }
        function r(a, f, d) {
            var b = a.getCommonAncestor(!1, !0),
                a = a.clone();
            a.enlarge(d == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
            if (a.checkBoundaryOfElement(b, CKEDITOR.START) && a.checkBoundaryOfElement(b, CKEDITOR.END)) {
                for (var c; b && b.type == CKEDITOR.NODE_ELEMENT && (c = b.getParent()) && 1 == c.getChildCount() && !(b.getName() in f);) b = c;
                return b.type == CKEDITOR.NODE_ELEMENT && b.getName() in f && b
            }
        }
        function m(a) {
            return {
                context: "p",
                allowedContent: {
                    "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
                        propertiesOnly: !0,
                        attributes: "dir"
                    }
                },
                requiredContent: "p[dir]",
                refresh: function (a, d) {
                    var b = a.config.useComputedState,
                        c, b = void 0 === b || b;
                    if (!b) {
                        c = d.lastElement;
                        for (var h = a.editable(); c && !(c.getName() in q || c.equals(h));) {
                            var e = c.getParent();
                            if (!e) break;
                            c = e
                        }
                    }
                    c = c || d.block || d.blockLimit;
                    c.equals(a.editable()) && (h = a.getSelection().getRanges()[0].getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (c = h);
                    c && (b = b ? c.getComputedStyle("direction") :
                        c.getStyle("direction") || c.getAttribute("dir"), a.getCommand("bidirtl").setState("rtl" == b ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand("bidiltr").setState("ltr" == b ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF));
                    b = (d.block || d.blockLimit || a.editable()).getDirection(1);
                    if (b != (a._.selDir || a.lang.dir)) a._.selDir = b, a.fire("contentDirChanged", b)
                },
                exec: function (f) {
                    var d = f.getSelection(),
                        b = f.config.enterMode,
                        c = d.getRanges();
                    if (c && c.length) {
                        for (var h = {}, e = d.createBookmarks(), c = c.createIterator(), g,
                            j = 0; g = c.getNextRange(1);) {
                            var i = g.getEnclosedNode();
                            if (!i || i && !(i.type == CKEDITOR.NODE_ELEMENT && i.getName() in o)) i = r(g, p, b);
                            i && n(i, a, f, h);
                            var k = new CKEDITOR.dom.walker(g),
                                l = e[j].startNode,
                                m = e[j++].endNode;
                            k.evaluator = function (a) {
                                return !!(a.type == CKEDITOR.NODE_ELEMENT && a.getName() in p && !(a.getName() == (b == CKEDITOR.ENTER_P ? "p" : "div") && a.getParent().type == CKEDITOR.NODE_ELEMENT && "blockquote" == a.getParent().getName()) && a.getPosition(l) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(m) & CKEDITOR.POSITION_PRECEDING +
                                    CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
                            };
                            for (; i = k.next();) n(i, a, f, h);
                            g = g.createIterator();
                            for (g.enlargeBr = b != CKEDITOR.ENTER_BR; i = g.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");) n(i, a, f, h)
                        }
                        CKEDITOR.dom.element.clearAllMarkers(h);
                        f.forceNextSelectionCheck();
                        d.selectBookmarks(e);
                        f.focus()
                    }
                }
            }
        }
        function s(a) {
            var f = a == j.setAttribute,
                d = a == j.removeAttribute,
                b = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
            return function (c, h) {
                if (!this.isReadOnly()) {
                    var e;
                    if (e = c == (f || d ? "dir" : "direction") || "style" ==
                        c && (d || b.test(h))) {
                        a: {
                            e = this;
                            for (var g = e.getDocument().getBody().getParent(); e;) {
                                if (e.equals(g)) {
                                    e = !1;
                                    break a
                                }
                                e = e.getParent()
                            }
                            e = !0
                        }
                        e = !e
                    }
                    if (e && (e = this.getDirection(1), g = a.apply(this, arguments), e != this.getDirection(1))) return this.getDocument().fire("dirChanged", this), g
                }
                return a.apply(this, arguments)
            }
        }
        var p = {
            table: 1,
            ul: 1,
            ol: 1,
            blockquote: 1,
            div: 1
        }, o = {}, q = {};
        CKEDITOR.tools.extend(o, p, {
            tr: 1,
            p: 1,
            div: 1,
            li: 1
        });
        CKEDITOR.tools.extend(q, o, {
            td: 1
        });
        CKEDITOR.plugins.add("bidi", {
            init: function (a) {
                function f(b, c, d,
                e, f) {
                    a.addCommand(d, new CKEDITOR.command(a, e));
                    a.ui.addButton && a.ui.addButton(b, {
                        label: c,
                        command: d,
                        toolbar: "bidi," + f
                    })
                }
                if (!a.blockless) {
                    var d = a.lang.bidi;
                    a.ui.addToolbarGroup && a.ui.addToolbarGroup("bidi", "align", "paragraph");
                    f("BidiLtr", d.ltr, "bidiltr", m("ltr"), 10);
                    f("BidiRtl", d.rtl, "bidirtl", m("rtl"), 20);
                    a.on("contentDom", function () {
                        a.document.on("dirChanged", function (b) {
                            a.fire("dirChanged", {
                                node: b.data,
                                dir: b.data.getDirection(1)
                            })
                        })
                    });
                    a.on("contentDirChanged", function (b) {
                        var b = (a.lang.dir != b.data ?
                            "add" : "remove") + "Class",
                            c = a.ui.space(a.config.toolbarLocation);
                        if (c) c[b]("cke_mixed_dir_content")
                    })
                }
            }
        });
        for (var j = CKEDITOR.dom.element.prototype, l = ["setStyle", "removeStyle", "setAttribute", "removeAttribute"], k = 0; k < l.length; k++) j[l[k]] = CKEDITOR.tools.override(j[l[k]], s)
    })();
    (function () {
        var k = {
            exec: function (g) {
                var a = g.getCommand("blockquote").state,
                    i = g.getSelection(),
                    c = i && i.getRanges(!0)[0];
                if (c) {
                    var h = i.createBookmarks();
                    if (CKEDITOR.env.ie) {
                        var e = h[0].startNode,
                            b = h[0].endNode,
                            d;
                        if (e && "blockquote" == e.getParent().getName()) for (d = e; d = d.getNext();) if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) {
                                    e.move(d, !0);
                                    break
                                }
                        if (b && "blockquote" == b.getParent().getName()) for (d = b; d = d.getPrevious();) if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) {
                                    b.move(d);
                                    break
                                }
                    }
                    var f = c.createIterator();
                    f.enlargeBr = g.config.enterMode != CKEDITOR.ENTER_BR;
                    if (a == CKEDITOR.TRISTATE_OFF) {
                        for (e = []; a = f.getNextParagraph();) e.push(a);
                        1 > e.length && (a = g.document.createElement(g.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), b = h.shift(), c.insertNode(a), a.append(new CKEDITOR.dom.text("﻿", g.document)), c.moveToBookmark(b), c.selectNodeContents(a), c.collapse(!0), b = c.createBookmark(), e.push(a), h.unshift(b));
                        d = e[0].getParent();
                        c = [];
                        for (b = 0; b < e.length; b++) a = e[b], d = d.getCommonAncestor(a.getParent());
                        for (a = {
                            table: 1,
                            tbody: 1,
                            tr: 1,
                            ol: 1,
                            ul: 1
                        }; a[d.getName()];) d = d.getParent();
                        for (b = null; 0 < e.length;) {
                            for (a = e.shift(); !a.getParent().equals(d);) a = a.getParent();
                            a.equals(b) || c.push(a);
                            b = a
                        }
                        for (; 0 < c.length;) if (a = c.shift(), "blockquote" == a.getName()) {
                                for (b = new CKEDITOR.dom.documentFragment(g.document); a.getFirst();) b.append(a.getFirst().remove()), e.push(b.getLast());
                                b.replace(a)
                            } else e.push(a);
                        c = g.document.createElement("blockquote");
                        for (c.insertBefore(e[0]); 0 < e.length;) a = e.shift(), c.append(a)
                    } else if (a == CKEDITOR.TRISTATE_ON) {
                        b = [];
                        for (d = {}; a = f.getNextParagraph();) {
                            for (e = c = null; a.getParent();) {
                                if ("blockquote" == a.getParent().getName()) {
                                    c = a.getParent();
                                    e = a;
                                    break
                                }
                                a = a.getParent()
                            }
                            c && (e && !e.getCustomData("blockquote_moveout")) && (b.push(e), CKEDITOR.dom.element.setMarker(d, e, "blockquote_moveout", !0))
                        }
                        CKEDITOR.dom.element.clearAllMarkers(d);
                        a = [];
                        e = [];
                        for (d = {}; 0 < b.length;) f = b.shift(), c = f.getParent(), f.getPrevious() ? f.getNext() ? (f.breakParent(f.getParent()), e.push(f.getNext())) : f.remove().insertAfter(c) : f.remove().insertBefore(c), c.getCustomData("blockquote_processed") ||
                                (e.push(c), CKEDITOR.dom.element.setMarker(d, c, "blockquote_processed", !0)), a.push(f);
                        CKEDITOR.dom.element.clearAllMarkers(d);
                        for (b = e.length - 1; 0 <= b; b--) {
                            c = e[b];
                            a: {
                                d = c;
                                for (var f = 0, k = d.getChildCount(), j = void 0; f < k && (j = d.getChild(f)); f++) if (j.type == CKEDITOR.NODE_ELEMENT && j.isBlockBoundary()) {
                                        d = !1;
                                        break a
                                    }
                                d = !0
                            }
                            d && c.remove()
                        }
                        if (g.config.enterMode == CKEDITOR.ENTER_BR) for (c = !0; a.length;) if (f = a.shift(), "div" == f.getName()) {
                                    b = new CKEDITOR.dom.documentFragment(g.document);
                                    c && (f.getPrevious() && !(f.getPrevious().type ==
                                        CKEDITOR.NODE_ELEMENT && f.getPrevious().isBlockBoundary())) && b.append(g.document.createElement("br"));
                                    for (c = f.getNext() && !(f.getNext().type == CKEDITOR.NODE_ELEMENT && f.getNext().isBlockBoundary()); f.getFirst();) f.getFirst().remove().appendTo(b);
                                    c && b.append(g.document.createElement("br"));
                                    b.replace(f);
                                    c = !1
                                }
                    }
                    i.selectBookmarks(h);
                    g.focus()
                }
            },
            refresh: function (g, a) {
                this.setState(g.elementPath(a.block || a.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            },
            context: "blockquote",
            allowedContent: "blockquote",
            requiredContent: "blockquote"
        };
        CKEDITOR.plugins.add("blockquote", {
            init: function (g) {
                g.blockless || (g.addCommand("blockquote", k), g.ui.addButton && g.ui.addButton("Blockquote", {
                    label: g.lang.blockquote.toolbar,
                    command: "blockquote",
                    toolbar: "blocks,10"
                }))
            }
        })
    })();
    (function () {
        function v(a) {
            function b() {
                var d = a.editable();
                d.on(q, function (a) {
                    (!CKEDITOR.env.ie || !m) && u(a)
                });
                CKEDITOR.env.ie && d.on("paste", function (d) {
                    r || (f(), d.data.preventDefault(), u(d), k("paste") || a.openDialog("paste"))
                });
                CKEDITOR.env.ie && (d.on("contextmenu", h, null, null, 0), d.on("beforepaste", function (a) {
                    a.data && !a.data.$.ctrlKey && h()
                }, null, null, 0));
                d.on("beforecut", function () {
                    !m && l(a)
                });
                d.attachListener(CKEDITOR.env.ie ? d : a.document.getDocumentElement(), "mouseup", function () {
                    setTimeout(function () {
                        s()
                    },
                    0)
                });
                d.on("keyup", s)
            }
            function e(d) {
                return {
                    type: d,
                    canUndo: "cut" == d,
                    startDisabled: !0,
                    exec: function () {
                        "cut" == this.type && l();
                        var d;
                        var b = this.type;
                        if (CKEDITOR.env.ie) d = k(b);
                        else try {
                                d = a.document.$.execCommand(b, !1, null)
                        } catch (c) {
                            d = !1
                        }
                        d || alert(a.lang.clipboard[this.type + "Error"]);
                        return d
                    }
                }
            }
            function c() {
                return {
                    canUndo: !1,
                    async: !0,
                    exec: function (a, b) {
                        var c = function (b, c) {
                            b && g(b.type, b.dataValue, !! c);
                            a.fire("afterCommandExec", {
                                name: "paste",
                                command: e,
                                returnValue: !! b
                            })
                        }, e = this;
                        "string" == typeof b ? c({
                            type: "auto",
                            dataValue: b
                        }, 1) : a.getClipboardData(c)
                    }
                }
            }
            function f() {
                r = 1;
                setTimeout(function () {
                    r = 0
                }, 100)
            }
            function h() {
                m = 1;
                setTimeout(function () {
                    m = 0
                }, 10)
            }
            function k(d) {
                var b = a.document,
                    c = b.getBody(),
                    e = !1,
                    l = function () {
                        e = !0
                    };
                c.on(d, l);
                (7 < CKEDITOR.env.version ? b.$ : b.$.selection.createRange()).execCommand(d);
                c.removeListener(d, l);
                return e
            }
            function g(d, b, c) {
                d = {
                    type: d
                };
                if (c && !a.fire("beforePaste", d) || !b) return !1;
                d.dataValue = b;
                return a.fire("paste", d)
            }
            function l() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var d = a.getSelection(),
                        b, c, e;
                    if (d.getType() == CKEDITOR.SELECTION_ELEMENT && (b = d.getSelectedElement())) c = d.getRanges()[0], e = a.document.createText(""), e.insertBefore(b), c.setStartBefore(e), c.setEndAfter(b), d.selectRanges([c]), setTimeout(function () {
                            b.getParent() && (e.remove(), d.selectElement(b))
                        }, 0)
                }
            }
            function j(d, b) {
                var c = a.document,
                    e = a.editable(),
                    l = function (a) {
                        a.cancel()
                    }, j = CKEDITOR.env.gecko && 10902 >= CKEDITOR.env.version;
                if (!c.getById("cke_pastebin")) {
                    var f = a.getSelection(),
                        h = f.createBookmarks(),
                        i = new CKEDITOR.dom.element(e.is("body") && !CKEDITOR.env.ie && !CKEDITOR.env.opera ? "body" : "div", c);
                    i.setAttribute("id", "cke_pastebin");
                    CKEDITOR.env.opera && i.appendBogus();
                    var o = 0,
                        c = c.getWindow();
                    j ? (i.insertAfter(h[0].startNode), i.setStyle("display", "inline")) : (CKEDITOR.env.webkit ? (e.append(i), i.addClass("cke_editable"), o = (e.is("body") ? e : CKEDITOR.dom.element.get(i.$.offsetParent)).getDocumentPosition().y) : e.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" : "html", 1).append(i), i.setStyles({
                        position: "absolute",
                        top: c.getScrollPosition().y - o + 10 + "px",
                        width: "1px",
                        height: Math.max(1, c.getViewPaneSize().height - 20) + "px",
                        overflow: "hidden",
                        margin: 0,
                        padding: 0
                    }));
                    (j = i.getParent().isReadOnly()) ? (i.setOpacity(0), i.setAttribute("contenteditable", !0)) : i.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-1000px");
                    a.on("selectionChange", l, null, null, 0);
                    j && i.focus();
                    j = new CKEDITOR.dom.range(i);
                    j.selectNodeContents(i);
                    var g = j.select();
                    if (CKEDITOR.env.ie) var k = e.once("blur", function () {
                            a.lockSelection(g)
                        });
                    var m = CKEDITOR.document.getWindow().getScrollPosition().y;
                    setTimeout(function () {
                        if (CKEDITOR.env.webkit || CKEDITOR.env.opera) CKEDITOR.document[CKEDITOR.env.webkit ? "getBody" : "getDocumentElement"]().$.scrollTop = m;
                        k && k.removeListener();
                        CKEDITOR.env.ie && e.focus();
                        f.selectBookmarks(h);
                        i.remove();
                        var d;
                        if (CKEDITOR.env.webkit && (d = i.getFirst()) && d.is && d.hasClass("Apple-style-span")) i = d;
                        a.removeListener("selectionChange", l);
                        b(i.getHtml())
                    }, 0)
                }
            }
            function o() {
                if (CKEDITOR.env.ie) {
                    a.focus();
                    f();
                    var d = a.focusManager;
                    d.lock();
                    if (a.editable().fire(q) && !k("paste")) return d.unlock(), !1;
                    d.unlock()
                } else try {
                        if (a.editable().fire(q) && !a.document.$.execCommand("Paste", !1, null)) throw 0;
                    } catch (b) {
                        return !1
                }
                return !0
            }
            function p(d) {
                if ("wysiwyg" == a.mode) switch (d.data.keyCode) {
                        case CKEDITOR.CTRL + 86:
                        case CKEDITOR.SHIFT + 45:
                            d = a.editable();
                            f();
                            !CKEDITOR.env.ie && d.fire("beforepaste");
                            (CKEDITOR.env.opera || CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version) && d.fire("paste");
                            break;
                        case CKEDITOR.CTRL + 88:
                        case CKEDITOR.SHIFT + 46:
                            a.fire("saveSnapshot"), setTimeout(function () {
                                a.fire("saveSnapshot")
                            }, 0)
                }
            }
            function u(d) {
                var b = {
                    type: "auto"
                }, c = a.fire("beforePaste", b);
                j(d, function (a) {
                    a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                    c && g(b.type, a, 0, 1)
                })
            }
            function s() {
                if ("wysiwyg" == a.mode) {
                    var b = n("Paste");
                    a.getCommand("cut").setState(n("Cut"));
                    a.getCommand("copy").setState(n("Copy"));
                    a.getCommand("paste").setState(b);
                    a.fire("pasteState", b)
                }
            }
            function n(b) {
                var c;
                if (t && b in {
                    Paste: 1,
                    Cut: 1
                }) return CKEDITOR.TRISTATE_DISABLED;
                if ("Paste" == b) {
                    CKEDITOR.env.ie && (m = 1);
                    try {
                        c = a.document.$.queryCommandEnabled(b) || CKEDITOR.env.webkit
                    } catch (e) {}
                    m =
                        0
                } else b = a.getSelection(), c = b.getRanges(), c = b.getType() != CKEDITOR.SELECTION_NONE && !(1 == c.length && c[0].collapsed);
                return c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
            }
            var m = 0,
                r = 0,
                t = 0,
                q = CKEDITOR.env.ie ? "beforepaste" : "paste";
            (function () {
                a.on("key", p);
                a.on("contentDom", b);
                a.on("selectionChange", function (a) {
                    t = a.data.selection.getRanges()[0].checkReadOnly();
                    s()
                });
                a.contextMenu && a.contextMenu.addListener(function (a, b) {
                    t = b.getRanges()[0].checkReadOnly();
                    return {
                        cut: n("Cut"),
                        copy: n("Copy"),
                        paste: n("Paste")
                    }
                })
            })();
            (function () {
                function b(c, d, e, l, j) {
                    var f = a.lang.clipboard[d];
                    a.addCommand(d, e);
                    a.ui.addButton && a.ui.addButton(c, {
                        label: f,
                        command: d,
                        toolbar: "clipboard," + l
                    });
                    a.addMenuItems && a.addMenuItem(d, {
                        label: f,
                        command: d,
                        group: "clipboard",
                        order: j
                    })
                }
                b("Cut", "cut", e("cut"), 10, 1);
                b("Copy", "copy", e("copy"), 20, 4);
                b("Paste", "paste", c(), 30, 8)
            })();
            a.getClipboardData = function (b, c) {
                function e(a) {
                    a.removeListener();
                    a.cancel();
                    c(a.data)
                }
                function l(a) {
                    a.removeListener();
                    a.cancel();
                    g = !0;
                    c({
                        type: h,
                        dataValue: a.data
                    })
                }
                function j() {
                    this.customTitle =
                        b && b.title
                }
                var f = !1,
                    h = "auto",
                    g = !1;
                c || (c = b, b = null);
                a.on("paste", e, null, null, 0);
                a.on("beforePaste", function (a) {
                    a.removeListener();
                    f = true;
                    h = a.data.type
                }, null, null, 1E3);
                !1 === o() && (a.removeListener("paste", e), f && a.fire("pasteDialog", j) ? (a.on("pasteDialogCommit", l), a.on("dialogHide", function (a) {
                    a.removeListener();
                    a.data.removeListener("pasteDialogCommit", l);
                    setTimeout(function () {
                        g || c(null)
                    }, 10)
                })) : c(null))
            }
        }
        function w(a) {
            if (CKEDITOR.env.webkit) {
                if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
            } else if (CKEDITOR.env.ie) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html"
            } else if (CKEDITOR.env.gecko || CKEDITOR.env.opera) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html"
            } else return "html";
            return "htmlifiedtext"
        }
        function x(a, b) {
            function e(a) {
                return CKEDITOR.tools.repeat("</p><p>", ~~ (a / 2)) + (1 == a % 2 ? "<br>" : "")
            }
            b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>");
            b = b.replace(/<\/?[A-Z]+>/g, function (a) {
                return a.toLowerCase()
            });
            if (b.match(/^[^<]$/)) return b;
            CKEDITOR.env.webkit && -1 < b.indexOf("<div>") &&
                (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>"), b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) {
                return e(a.split("</div><div>").length + 1)
            }) + "</p>"), b = b.replace(/<\/div><div>/g, "<br>"), b = b.replace(/<\/?div>/g, ""));
            if ((CKEDITOR.env.gecko || CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR) CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>")), -1 < b.indexOf("<br><br>") && (b = "<p>" +
                    b.replace(/(<br>){2,}/g, function (a) {
                    return e(a.length / 4)
                }) + "</p>");
            return p(a, b)
        }
        function y() {
            var a = new CKEDITOR.htmlParser.filter,
                b = {
                    blockquote: 1,
                    dl: 1,
                    fieldset: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    ol: 1,
                    p: 1,
                    table: 1,
                    ul: 1
                }, e = CKEDITOR.tools.extend({
                    br: 0
                }, CKEDITOR.dtd.$inline),
                c = {
                    p: 1,
                    br: 1,
                    "cke:br": 1
                }, f = CKEDITOR.dtd,
                h = CKEDITOR.tools.extend({
                    area: 1,
                    basefont: 1,
                    embed: 1,
                    iframe: 1,
                    map: 1,
                    object: 1,
                    param: 1
                }, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata),
                k = function (a) {
                    delete a.name;
                    a.add(new CKEDITOR.htmlParser.text(" "))
                },
                g = function (a) {
                    for (var b = a, c;
                    (b = b.next) && b.name && b.name.match(/^h\d$/);) {
                        c = new CKEDITOR.htmlParser.element("cke:br");
                        c.isEmpty = !0;
                        for (a.add(c); c = b.children.shift();) a.add(c)
                    }
                };
            a.addRules({
                elements: {
                    h1: g,
                    h2: g,
                    h3: g,
                    h4: g,
                    h5: g,
                    h6: g,
                    img: function (a) {
                        var a = CKEDITOR.tools.trim(a.attributes.alt || ""),
                            b = " ";
                        a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" + a + "] ");
                        return new CKEDITOR.htmlParser.text(b)
                    },
                    td: k,
                    th: k,
                    $: function (a) {
                        var j = a.name,
                            g;
                        if (h[j]) return !1;
                        delete a.attributes;
                        if ("br" == j) return a;
                        if (b[j]) a.name =
                                "p";
                        else if (e[j]) delete a.name;
                        else if (f[j]) {
                            g = new CKEDITOR.htmlParser.element("cke:br");
                            g.isEmpty = !0;
                            if (CKEDITOR.dtd.$empty[j]) return g;
                            a.add(g, 0);
                            g = g.clone();
                            g.isEmpty = !0;
                            a.add(g);
                            delete a.name
                        }
                        c[a.name] || delete a.name;
                        return a
                    }
                }
            });
            return a
        }
        function z(a, b, e) {
            var b = new CKEDITOR.htmlParser.fragment.fromHtml(b),
                c = new CKEDITOR.htmlParser.basicWriter;
            b.writeHtml(c, e);
            var b = c.getHtml(),
                b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g,
                    "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, ""),
                f = 0,
                b = b.replace(/<\/?p>/g, function (a) {
                    if ("<p>" == a) {
                        if (1 < ++f) return "</p><p>"
                    } else if (0 < --f) return "</p><p>";
                    return a
                }).replace(/<p><\/p>/g, "");
            return p(a, b)
        }
        function p(a, b) {
            a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) {
                return CKEDITOR.tools.repeat("<br>", 2 * (a.length / 7))
            }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>"));
            return b
        }
        CKEDITOR.plugins.add("clipboard", {
            requires: "dialog",
            init: function (a) {
                var b;
                v(a);
                CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
                a.on("paste", function (a) {
                    var b = a.data.dataValue,
                        f = CKEDITOR.dtd.$block; - 1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) {
                        return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;")
                    })), -1 < b.indexOf('<br class="Apple-interchange-newline">') &&
                        (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
                    if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                        var h, k, g = new CKEDITOR.dom.element("div");
                        for (g.setHtml(b); 1 == g.getChildCount() && (h = g.getFirst()) && h.type == CKEDITOR.NODE_ELEMENT && (h.hasClass("cke_editable") || h.hasClass("cke_contents"));) g = k = h;
                        k && (b = k.getHtml().replace(/<br>$/i, ""))
                    }
                    CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b,
                    c) {
                        if (c.toLowerCase() in f) {
                            a.data.preSniffing = "html";
                            return "<" + c
                        }
                        return b
                    }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, c) {
                        if (c in f) {
                            a.data.endsWithEOL = 1;
                            return "</" + c + ">"
                        }
                        return b
                    }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                    a.data.dataValue = b
                }, null, null, 3);
                a.on("paste", function (e) {
                    var e = e.data,
                        c = e.type,
                        f = e.dataValue,
                        h, k = a.config.clipboard_defaultContentType || "html";
                    h = "html" == c || "html" == e.preSniffing ? "html" : w(f);
                    "htmlifiedtext" == h ? f = x(a.config, f) : "text" == c && "html" ==
                        h && (f = z(a.config, f, b || (b = y(a))));
                    e.startsWithEOL && (f = '<br data-cke-eol="1">' + f);
                    e.endsWithEOL && (f += '<br data-cke-eol="1">');
                    "auto" == c && (c = "html" == h || "html" == k ? "html" : "text");
                    e.type = c;
                    e.dataValue = f;
                    delete e.preSniffing;
                    delete e.startsWithEOL;
                    delete e.endsWithEOL
                }, null, null, 6);
                a.on("paste", function (b) {
                    b = b.data;
                    a.insertHtml(b.dataValue, b.type);
                    setTimeout(function () {
                        a.fire("afterPaste")
                    }, 0)
                }, null, null, 1E3);
                a.on("pasteDialog", function (b) {
                    setTimeout(function () {
                        a.openDialog("paste", b.data)
                    }, 0)
                })
            }
        })
    })();
    (function () {
        var c = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && 10900 <= CKEDITOR.env.version && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}"';
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) c += ' onkeypress="return false;"';
        CKEDITOR.env.gecko && (c += ' onblur="this.style.cssText = this.style.cssText;"');
        var c =
            c + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);"  onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'),
            c = c + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label">{label}</span>{arrowHtml}</a>',
            m = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"),
            n = CKEDITOR.addTemplate("button", c);
        CKEDITOR.plugins.add("button", {
            beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
            }
        });
        CKEDITOR.UI_BUTTON = "button";
        CKEDITOR.ui.button = function (a) {
            CKEDITOR.tools.extend(this, a, {
                title: a.label,
                click: a.click || function (b) {
                    b.execCommand(a.command)
                }
            });
            this._ = {}
        };
        CKEDITOR.ui.button.handler = {
            create: function (a) {
                return new CKEDITOR.ui.button(a)
            }
        };
        CKEDITOR.ui.button.prototype = {
            render: function (a, b) {
                var c = CKEDITOR.env,
                    i = this._.id = CKEDITOR.tools.getNextId(),
                    f = "",
                    e = this.command,
                    l;
                this._.editor = a;
                var d = {
                    id: i,
                    button: this,
                    editor: a,
                    focus: function () {
                        CKEDITOR.document.getById(i).focus()
                    },
                    execute: function () {
                        this.button.click(a)
                    },
                    attach: function (a) {
                        this.button.attach(a)
                    }
                }, o = CKEDITOR.tools.addFunction(function (a) {
                        if (d.onkey) return a = new CKEDITOR.dom.event(a), !1 !== d.onkey(d, a.getKeystroke())
                    }),
                    p = CKEDITOR.tools.addFunction(function (a) {
                        var b;
                        d.onfocus && (b = !1 !== d.onfocus(d, new CKEDITOR.dom.event(a)));
                        CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version && a.preventBubble();
                        return b
                    }),
                    j = 0,
                    q = CKEDITOR.tools.addFunction(function () {
                        if (CKEDITOR.env.opera) {
                            var b = a.editable();
                            b.isInline() && b.hasFocus && (a.lockSelection(), j = 1)
                        }
                    });
                d.clickFn = l = CKEDITOR.tools.addFunction(function () {
                    j && (a.unlockSelection(1), j = 0);
                    d.execute()
                });
                if (this.modes) {
                    var k = {}, g = function () {
                            var b = a.mode;
                            b && (b = this.modes[b] ? void 0 != k[b] ? k[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, this.setState(a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b))
                        };
                    a.on("beforeModeUnload", function () {
                        a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (k[a.mode] = this._.state)
                    }, this);
                    a.on("mode", g, this);
                    !this.readOnly && a.on("readOnly", g, this)
                } else if (e && (e = a.getCommand(e))) e.on("state", function () {
                        this.setState(e.state)
                    }, this), f += e.state == CKEDITOR.TRISTATE_ON ? "on" : e.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                if (this.directional) a.on("contentDirChanged", function (b) {
                        var c = CKEDITOR.document.getById(this._.id),
                            d =
                                c.getFirst(),
                            b = b.data;
                        b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl");
                        d.setAttribute("style", CKEDITOR.skin.getIconStyle(h, "rtl" == b, this.icon, this.iconOffset))
                    }, this);
                e || (f += "off");
                var h = g = this.name || this.command;
                this.icon && !/\./.test(this.icon) && (h = this.icon, this.icon = null);
                c = {
                    id: i,
                    name: g,
                    iconName: h,
                    label: this.label,
                    cls: this.className || "",
                    state: f,
                    title: this.title,
                    titleJs: c.gecko && 10900 <= c.version && !c.hc ? "" : (this.title || "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: o,
                    mousedownFn: q,
                    focusFn: p,
                    clickFn: l,
                    style: CKEDITOR.skin.getIconStyle(h, "rtl" == a.lang.dir, this.icon, this.iconOffset),
                    arrowHtml: this.hasArrow ? m.output() : ""
                };
                n.output(c, b);
                if (this.onRender) this.onRender();
                return d
            },
            setState: function (a) {
                if (this._.state == a) return !1;
                this._.state = a;
                var b = CKEDITOR.document.getById(this._.id);
                return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"), a == CKEDITOR.TRISTATE_ON ?
                    b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
            },
            toFeature: function (a) {
                if (this._.feature) return this._.feature;
                var b = this;
                !this.allowedContent && (!this.requiredContent && this.command) && (b = a.getCommand(this.command) || b);
                return this._.feature = b
            }
        };
        CKEDITOR.ui.prototype.addButton = function (a, b) {
            this.add(a, CKEDITOR.UI_BUTTON, b)
        }
    })();
    CKEDITOR.plugins.add("panelbutton", {
        requires: "button",
        onLoad: function () {
            function e(c) {
                var a = this._;
                a.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(c), a.on ? a.panel.hide() : a.panel.showBlock(this._.id, this.document.getById(this._.id), 4))
            }
            CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button,
                $: function (c) {
                    var a = c.panel || {};
                    delete c.panel;
                    this.base(c);
                    this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
                    a.block = {
                        attributes: a.attributes
                    };
                    this.hasArrow = a.toolbarRelated = !0;
                    this.click = e;
                    this._ = {
                        panelDefinition: a
                    }
                },
                statics: {
                    handler: {
                        create: function (c) {
                            return new CKEDITOR.ui.panelButton(c)
                        }
                    }
                },
                proto: {
                    createPanel: function (c) {
                        var a = this._;
                        if (!a.panel) {
                            var f = this._.panelDefinition,
                                e = this._.panelDefinition.block,
                                g = f.parent || CKEDITOR.document.getBody(),
                                d = this._.panel = new CKEDITOR.ui.floatPanel(c, g, f),
                                f = d.addBlock(a.id, e),
                                b = this;
                            d.onShow = function () {
                                b.className && this.element.addClass(b.className + "_panel");
                                b.setState(CKEDITOR.TRISTATE_ON);
                                a.on = 1;
                                b.editorFocus && c.focus();
                                if (b.onOpen) b.onOpen()
                            };
                            d.onHide = function (d) {
                                b.className && this.element.getFirst().removeClass(b.className + "_panel");
                                b.setState(b.modes && b.modes[c.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                a.on = 0;
                                if (!d && b.onClose) b.onClose()
                            };
                            d.onEscape = function () {
                                d.hide(1);
                                b.document.getById(a.id).focus()
                            };
                            if (this.onBlock) this.onBlock(d, f);
                            f.onHide = function () {
                                a.on = 0;
                                b.setState(CKEDITOR.TRISTATE_OFF)
                            }
                        }
                    }
                }
            })
        },
        beforeInit: function (e) {
            e.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler)
        }
    });
    CKEDITOR.UI_PANELBUTTON = "panelbutton";
    (function () {
        CKEDITOR.plugins.add("panel", {
            beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
            }
        });
        CKEDITOR.UI_PANEL = "panel";
        CKEDITOR.ui.panel = function (a, b) {
            b && CKEDITOR.tools.extend(this, b);
            CKEDITOR.tools.extend(this, {
                className: "",
                css: []
            });
            this.id = CKEDITOR.tools.getNextId();
            this.document = a;
            this.isFramed = this.forceIFrame || this.css.length;
            this._ = {
                blocks: {}
            }
        };
        CKEDITOR.ui.panel.handler = {
            create: function (a) {
                return new CKEDITOR.ui.panel(a)
            }
        };
        var e = CKEDITOR.addTemplate("panel",
            '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'),
            f = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="application" frameborder="0" src="{src}"></iframe>'),
            g = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
        CKEDITOR.ui.panel.prototype = {
            render: function (a, b) {
                this.getHolderElement = function () {
                    var a = this._.holder;
                    if (!a) {
                        if (this.isFramed) {
                            var a = this.document.getById(this.id + "_frame"),
                                b = a.getParent(),
                                a = a.getFrameDocument();
                            CKEDITOR.env.iOS && b.setStyles({
                                overflow: "scroll",
                                "-webkit-overflow-scrolling": "touch"
                            });
                            b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () {
                                this.isLoaded = !0;
                                if (this.onLoad) this.onLoad()
                            }, this));
                            a.write(g.output(CKEDITOR.tools.extend({
                                css: CKEDITOR.tools.buildStyleHtml(this.css),
                                onload: "window.parent.CKEDITOR.tools.callFunction(" + b + ");"
                            }, c)));
                            a.getWindow().$.CKEDITOR = CKEDITOR;
                            a.on("key" + (CKEDITOR.env.opera ? "press" : "down"), function (a) {
                                var b = a.data.getKeystroke(),
                                    c = this.document.getById(this.id).getAttribute("dir");
                                this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault()
                            }, this);
                            a = a.getBody();
                            a.unselectable();
                            CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
                        } else a = this.document.getById(this.id);
                        this._.holder = a
                    }
                    return a
                };
                var c = {
                    editorId: a.id,
                    id: this.id,
                    langCode: a.langCode,
                    dir: a.lang.dir,
                    cls: this.className,
                    frame: "",
                    env: CKEDITOR.env.cssClass,
                    "z-index": a.config.baseFloatZIndex + 1
                };
                this.isFramed && (c.frame = f.output({
                    id: this.id + "_frame",
                    src: "javascript:void(document.open()," + (CKEDITOR.env.isCustomDomain() ? "document.domain='" + document.domain + "'," : "") + 'document.close())">'
                }));
                var d = e.output(c);
                b && b.push(d);
                return d
            },
            addBlock: function (a, b) {
                b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(),
                b);
                this._.currentBlock || this.showBlock(a);
                return b
            },
            getBlock: function (a) {
                return this._.blocks[a]
            },
            showBlock: function (a) {
                var a = this._.blocks[a],
                    b = this._.currentBlock,
                    c = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                b && (c.removeAttributes(b.attributes), b.hide());
                this._.currentBlock = a;
                c.setAttributes(a.attributes);
                CKEDITOR.fire("ariaWidget", c);
                a._.focusIndex = -1;
                this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
                a.show();
                return a
            },
            destroy: function () {
                this.element &&
                    this.element.remove()
            }
        };
        CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
            $: function (a, b) {
                this.element = a.append(a.getDocument().createElement("div", {
                    attributes: {
                        tabIndex: -1,
                        "class": "cke_panel_block",
                        role: "presentation"
                    },
                    styles: {
                        display: "none"
                    }
                }));
                b && CKEDITOR.tools.extend(this, b);
                this.attributes.title || (this.attributes.title = this.attributes["aria-label"]);
                this.keys = {};
                this._.focusIndex = -1;
                this.element.disableContextMenu()
            },
            _: {
                markItem: function (a) {
                    -1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex =
                        a), (CKEDITOR.env.webkit || CKEDITOR.env.opera) && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
                }
            },
            proto: {
                show: function () {
                    this.element.setStyle("display", "")
                },
                hide: function () {
                    (!this.onHide || !0 !== this.onHide.call(this)) && this.element.setStyle("display", "none")
                },
                onKeyDown: function (a) {
                    var b = this.keys[a];
                    switch (b) {
                        case "next":
                            for (var a = this._.focusIndex, b = this.element.getElementsByTag("a"), c; c = b.getItem(++a);) if (c.getAttribute("_cke_focus") && c.$.offsetWidth) {
                                    this._.focusIndex =
                                        a;
                                    c.focus();
                                    break
                                }
                            return !1;
                        case "prev":
                            a = this._.focusIndex;
                            for (b = this.element.getElementsByTag("a"); 0 < a && (c = b.getItem(--a));) if (c.getAttribute("_cke_focus") && c.$.offsetWidth) {
                                    this._.focusIndex = a;
                                    c.focus();
                                    break
                                }
                            return !1;
                        case "click":
                        case "mouseup":
                            return a = this._.focusIndex, (c = 0 <= a && this.element.getElementsByTag("a").getItem(a)) && (c.$[b] ? c.$[b]() : c.$["on" + b]()), !1
                    }
                    return !0
                }
            }
        })
    })();
    CKEDITOR.plugins.add("floatpanel", {
        requires: "panel"
    });
    (function () {
        function o(a, b, c, h, g) {
            var g = CKEDITOR.tools.genKey(b.getUniqueId(), c.getUniqueId(), a.lang.dir, a.uiColor || "", h.css || "", g || ""),
                e = i[g];
            e || (e = i[g] = new CKEDITOR.ui.panel(b, h), e.element = c.append(CKEDITOR.dom.element.createFromHtml(e.render(a), b)), e.element.setStyles({
                display: "none",
                position: "absolute"
            }));
            return e
        }
        var i = {};
        CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
            $: function (a, b, c, h) {
                function g() {
                    j.hide()
                }
                c.forceIFrame = 1;
                c.toolbarRelated && a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE &&
                    (b = CKEDITOR.document.getById("cke_" + a.name));
                var e = b.getDocument(),
                    h = o(a, e, b, c, h || 0),
                    k = h.element,
                    d = k.getFirst(),
                    j = this;
                k.disableContextMenu();
                k.setAttribute("role", "application");
                this.element = k;
                this._ = {
                    editor: a,
                    panel: h,
                    parentElement: b,
                    definition: c,
                    document: e,
                    iframe: d,
                    children: [],
                    dir: a.lang.dir
                };
                a.on("mode", g);
                a.on("resize", g);
                e.getWindow().on("resize", g)
            },
            proto: {
                addBlock: function (a, b) {
                    return this._.panel.addBlock(a, b)
                },
                addListBlock: function (a, b) {
                    return this._.panel.addListBlock(a, b)
                },
                getBlock: function (a) {
                    return this._.panel.getBlock(a)
                },
                showBlock: function (a, b, c, h, g) {
                    var e = this._.panel,
                        k = e.showBlock(a);
                    this.allowBlur(!1);
                    a = this._.editor.editable();
                    this._.returnFocus = a.hasFocus ? a : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                    var d = this.element,
                        a = this._.iframe,
                        a = CKEDITOR.env.ie ? a : new CKEDITOR.dom.window(a.$.contentWindow),
                        j = d.getDocument(),
                        i = this._.parentElement.getPositionedAncestor(),
                        n = b.getDocumentPosition(j),
                        j = i ? i.getDocumentPosition(j) : {
                            x: 0,
                            y: 0
                        }, m = "rtl" == this._.dir,
                        f = n.x + (h || 0) - j.x,
                        l = n.y + (g || 0) - j.y;
                    if (m && (1 == c || 4 ==
                        c)) f += b.$.offsetWidth;
                    else if (!m && (2 == c || 3 == c)) f += b.$.offsetWidth - 1;
                    if (3 == c || 4 == c) l += b.$.offsetHeight - 1;
                    this._.panel._.offsetParentId = b.getId();
                    d.setStyles({
                        top: l + "px",
                        left: 0,
                        display: ""
                    });
                    d.setOpacity(0);
                    d.getFirst().removeStyle("width");
                    this._.editor.focusManager.add(a);
                    this._.blurSet || (CKEDITOR.event.useCapture = !0, a.on("blur", function (a) {
                        this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && (this.visible && !this._.activeChild) && (delete this._.returnFocus, this.hide())
                    }, this), a.on("focus",

                    function () {
                        this._.focused = !0;
                        this.hideChild();
                        this.allowBlur(!0)
                    }, this), CKEDITOR.event.useCapture = !1, this._.blurSet = 1);
                    e.onEscape = CKEDITOR.tools.bind(function (a) {
                        if (this.onEscape && this.onEscape(a) === false) return false
                    }, this);
                    CKEDITOR.tools.setTimeout(function () {
                        var a = CKEDITOR.tools.bind(function () {
                            d.removeStyle("width");
                            if (k.autoSize) {
                                var a = k.element.getDocument(),
                                    a = (CKEDITOR.env.webkit ? k.element : a.getBody()).$.scrollWidth;
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((d.$.offsetWidth || 0) - (d.$.clientWidth ||
                                    0) + 3));
                                d.setStyle("width", a + 10 + "px");
                                a = k.element.$.scrollHeight;
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((d.$.offsetHeight || 0) - (d.$.clientHeight || 0) + 3));
                                d.setStyle("height", a + "px");
                                e._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                            } else d.removeStyle("height");
                            m && (f = f - d.$.offsetWidth);
                            d.setStyle("left", f + "px");
                            var b = e.element.getWindow(),
                                a = d.$.getBoundingClientRect(),
                                b = b.getViewPaneSize(),
                                c = a.width || a.right - a.left,
                                g = a.height || a.bottom - a.top,
                                h = m ? a.right : b.width - a.left,
                                i = m ? b.width - a.right : a.left;
                            m ? h < c && (f = i > c ? f + c : b.width > c ? f - a.left : f - a.right + b.width) : h < c && (f = i > c ? f - c : b.width > c ? f - a.right + b.width : f - a.left);
                            c = a.top;
                            b.height - a.top < g && (l = c > g ? l - g : b.height > g ? l - a.bottom + b.height : l - a.top);
                            if (CKEDITOR.env.ie) {
                                b = a = new CKEDITOR.dom.element(d.$.offsetParent);
                                b.getName() == "html" && (b = b.getDocument().getBody());
                                b.getComputedStyle("direction") == "rtl" && (f = CKEDITOR.env.ie8Compat ? f - d.getDocument().getDocumentElement().$.scrollLeft * 2 : f - (a.$.scrollWidth - a.$.clientWidth))
                            }
                            var a = d.getFirst(),
                                j;
                            (j = a.getCustomData("activePanel")) && j.onHide && j.onHide.call(this, 1);
                            a.setCustomData("activePanel", this);
                            d.setStyles({
                                top: l + "px",
                                left: f + "px"
                            });
                            d.setOpacity(1)
                        }, this);
                        e.isLoaded ? a() : e.onLoad = a;
                        CKEDITOR.tools.setTimeout(function () {
                            this.focus();
                            this.allowBlur(true);
                            this._.editor.fire("panelShow", this)
                        }, 0, this)
                    }, CKEDITOR.env.air ? 200 : 0, this);
                    this.visible = 1;
                    this.onShow && this.onShow.call(this)
                },
                focus: function () {
                    if (CKEDITOR.env.webkit) {
                        var a = CKEDITOR.document.getActive();
                        !a.equals(this._.iframe) && a.$.blur()
                    }(this._.lastFocused ||
                        this._.iframe.getFrameDocument().getWindow()).focus()
                },
                blur: function () {
                    var a = this._.iframe.getFrameDocument().getActive();
                    a.is("a") && (this._.lastFocused = a)
                },
                hide: function (a) {
                    if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
                        this.hideChild();
                        CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
                        this.element.setStyle("display", "none");
                        this.visible = 0;
                        this.element.getFirst().removeCustomData("activePanel");
                        if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(),
                        a.focus();
                        delete this._.lastFocused;
                        this._.editor.fire("panelHide", this)
                    }
                },
                allowBlur: function (a) {
                    var b = this._.panel;
                    void 0 != a && (b.allowBlur = a);
                    return b.allowBlur
                },
                showAsChild: function (a, b, c, h, g, e) {
                    this._.activeChild == a && a._.panel._.offsetParentId == c.getId() || (this.hideChild(), a.onHide = CKEDITOR.tools.bind(function () {
                        CKEDITOR.tools.setTimeout(function () {
                            this._.focused || this.hide()
                        }, 0, this)
                    }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, c, h, g, e), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) &&
                        setTimeout(function () {
                        a.element.getChild(0).$.style.cssText += ""
                    }, 100))
                },
                hideChild: function (a) {
                    var b = this._.activeChild;
                    b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus())
                }
            }
        });
        CKEDITOR.on("instanceDestroyed", function () {
            var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
                b;
            for (b in i) {
                var c = i[b];
                a ? c.destroy() : c.element.hide()
            }
            a && (i = {})
        })
    })();
    CKEDITOR.plugins.add("colorbutton", {
        requires: "panelbutton,floatpanel",
        init: function (c) {
            function m(l, g, e, h) {
                var k = new CKEDITOR.style(i["colorButton_" + g + "Style"]),
                    j = CKEDITOR.tools.getNextId() + "_colorBox";
                c.ui.add(l, CKEDITOR.UI_PANELBUTTON, {
                    label: e,
                    title: e,
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: 1,
                    toolbar: "colors," + h,
                    allowedContent: k,
                    requiredContent: k,
                    panel: {
                        css: CKEDITOR.skin.getPath("editor"),
                        attributes: {
                            role: "listbox",
                            "aria-label": f.panelTitle
                        }
                    },
                    onBlock: function (a, b) {
                        b.autoSize = !0;
                        b.element.addClass("cke_colorblock");
                        b.element.setHtml(o(a, g, j));
                        b.element.getDocument().getBody().setStyle("overflow", "hidden");
                        CKEDITOR.ui.fire("ready", this);
                        var d = b.keys,
                            e = "rtl" == c.lang.dir;
                        d[e ? 37 : 39] = "next";
                        d[40] = "next";
                        d[9] = "next";
                        d[e ? 39 : 37] = "prev";
                        d[38] = "prev";
                        d[CKEDITOR.SHIFT + 9] = "prev";
                        d[32] = "click"
                    },
                    onOpen: function () {
                        var a = c.getSelection(),
                            a = a && a.getStartElement(),
                            a = c.elementPath(a),
                            b, a = a.block || a.blockLimit || c.document.getBody();
                        do b = a && a.getComputedStyle("back" == g ? "background-color" : "color") || "transparent"; while ("back" == g &&
                            "transparent" == b && a && (a = a.getParent()));
                        if (!b || "transparent" == b) b = "#ffffff";
                        this._.panel._.iframe.getFrameDocument().getById(j).setStyle("background-color", b);
                        return b
                    }
                })
            }
            function o(l, g, e) {
                var h = [],
                    k = i.colorButton_colors.split(","),
                    j = CKEDITOR.tools.addFunction(function (a, b) {
                        if ("?" == a) {
                            var e = arguments.callee,
                                d = function (a) {
                                    this.removeListener("ok", d);
                                    this.removeListener("cancel", d);
                                    "ok" == a.name && e(this.getContentElement("picker", "selectedColor").getValue(), b)
                                };
                            c.openDialog("colordialog", function () {
                                this.on("ok",
                                d);
                                this.on("cancel", d)
                            })
                        } else {
                            c.focus();
                            l.hide();
                            c.fire("saveSnapshot");
                            c.removeStyle(new CKEDITOR.style(i["colorButton_" + b + "Style"], {
                                color: "inherit"
                            }));
                            if (a) {
                                var f = i["colorButton_" + b + "Style"];
                                f.childRule = "back" == b ? function (a) {
                                    return n(a)
                                } : function (a) {
                                    return !(a.is("a") || a.getElementsByTag("a").count()) || n(a)
                                };
                                c.applyStyle(new CKEDITOR.style(f, {
                                    color: a
                                }))
                            }
                            c.fire("saveSnapshot")
                        }
                    });
                h.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="', f.auto, '" onclick="CKEDITOR.tools.callFunction(',
                j, ",null,'", g, "');return false;\" href=\"javascript:void('", f.auto, '\')" role="option"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" id="', e, '"></span></td><td colspan=7 align=center>', f.auto, '</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">');
                for (e = 0; e < k.length; e++) {
                    0 === e % 8 && h.push("</tr><tr>");
                    var a = k[e].split("/"),
                        b = a[0],
                        d = a[1] || b;
                    a[1] || (b = "#" + b.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"));
                    a = c.lang.colorbutton.colors[d] ||
                        d;
                    h.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="', a, '" onclick="CKEDITOR.tools.callFunction(', j, ",'", b, "','", g, "'); return false;\" href=\"javascript:void('", a, '\')" role="option"><span class="cke_colorbox" style="background-color:#', d, '"></span></a></td>')
                }(c.plugins.colordialog && void 0 === i.colorButton_enableMore || i.colorButton_enableMore) && h.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="', f.more, '" onclick="CKEDITOR.tools.callFunction(',
                j, ",'?','", g, "');return false;\" href=\"javascript:void('", f.more, "')\"", ' role="option">', f.more, "</a></td>");
                h.push("</tr></table>");
                return h.join("")
            }
            function n(c) {
                return "false" == c.getAttribute("contentEditable") || c.getAttribute("data-nostyle")
            }
            var i = c.config,
                f = c.lang.colorbutton;
            CKEDITOR.env.hc || (m("TextColor", "fore", f.textColorTitle, 10), m("BGColor", "back", f.bgColorTitle, 20))
        }
    });
    CKEDITOR.config.colorButton_colors = "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF";
    CKEDITOR.config.colorButton_foreStyle = {
        element: "span",
        styles: {
            color: "#(color)"
        },
        overrides: [{
                element: "font",
                attributes: {
                    color: null
                }
            }
        ]
    };
    CKEDITOR.config.colorButton_backStyle = {
        element: "span",
        styles: {
            "background-color": "#(color)"
        }
    };
    CKEDITOR.plugins.colordialog = {
        requires: "dialog",
        init: function (b) {
            b.addCommand("colordialog", new CKEDITOR.dialogCommand("colordialog"));
            CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js");
            b.getColorFromDialog = function (e, f) {
                var c = function (a) {
                    this.removeListener("ok", c);
                    this.removeListener("cancel", c);
                    a = "ok" == a.name ? this.getValueOf("picker", "selectedColor") : null;
                    e.call(f, a)
                }, d = function (a) {
                        a.on("ok", c);
                        a.on("cancel", c)
                    };
                b.execCommand("colordialog");
                if (b._.storedDialogs && b._.storedDialogs.colordialog) d(b._.storedDialogs.colordialog);
                else CKEDITOR.on("dialogDefinition", function (a) {
                        if ("colordialog" == a.data.name) {
                            var b = a.data.definition;
                            a.removeListener();
                            b.onLoad = CKEDITOR.tools.override(b.onLoad, function (a) {
                                return function () {
                                    d(this);
                                    b.onLoad = a;
                                    "function" == typeof a && a.call(this)
                                }
                            })
                        }
                    })
            }
        }
    };
    CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog);
    (function () {
        CKEDITOR.plugins.add("templates", {
            requires: "dialog",
            init: function (a) {
                CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js"));
                a.addCommand("templates", new CKEDITOR.dialogCommand("templates"));
                a.ui.addButton && a.ui.addButton("Templates", {
                    label: a.lang.templates.button,
                    command: "templates",
                    toolbar: "doctools,10"
                })
            }
        });
        var c = {}, f = {};
        CKEDITOR.addTemplates = function (a, d) {
            c[a] = d
        };
        CKEDITOR.getTemplates = function (a) {
            return c[a]
        };
        CKEDITOR.loadTemplates = function (a, d) {
            for (var e = [], b = 0, c = a.length; b < c; b++) f[a[b]] || (e.push(a[b]), f[a[b]] = 1);
            e.length ? CKEDITOR.scriptLoader.load(e, d) : setTimeout(d, 0)
        }
    })();
    CKEDITOR.config.templates_files = [CKEDITOR.getUrl("plugins/templates/templates/default.js")];
    CKEDITOR.config.templates_replaceContent = !0;
    CKEDITOR.plugins.add("menu", {
        requires: "floatpanel",
        beforeInit: function (k) {
            for (var g = k.config.menu_groups.split(","), m = k._.menuGroups = {}, l = k._.menuItems = {}, a = 0; a < g.length; a++) m[g[a]] = a + 1;
            k.addMenuGroup = function (b, a) {
                m[b] = a || 100
            };
            k.addMenuItem = function (a, c) {
                m[c.group] && (l[a] = new CKEDITOR.menuItem(this, a, c))
            };
            k.addMenuItems = function (a) {
                for (var c in a) this.addMenuItem(c, a[c])
            };
            k.getMenuItem = function (a) {
                return l[a]
            };
            k.removeMenuItem = function (a) {
                delete l[a]
            }
        }
    });
    (function () {
        function k(a) {
            a.sort(function (a, c) {
                return a.group < c.group ? -1 : a.group > c.group ? 1 : a.order < c.order ? -1 : a.order > c.order ? 1 : 0
            })
        }
        var g = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem" aria-haspopup="{hasPopup}" aria-disabled="{disabled}"';
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) g += ' onkeypress="return false;"';
        CKEDITOR.env.gecko &&
            (g += ' onblur="this.style.cssText = this.style.cssText;"');
        var g = g + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'),
            m = CKEDITOR.addTemplate("menuItem", g + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'),
            l = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
        CKEDITOR.menu = CKEDITOR.tools.createClass({
            $: function (a, b) {
                b = this._.definition = b || {};
                this.id = CKEDITOR.tools.getNextId();
                this.editor = a;
                this.items = [];
                this._.listeners = [];
                this._.level = b.level || 1;
                var c = CKEDITOR.tools.extend({}, b.panel, {
                    css: [CKEDITOR.skin.getPath("editor")],
                    level: this._.level - 1,
                    block: {}
                }),
                    j = c.block.attributes = c.attributes || {};
                !j.role && (j.role = "menu");
                this._.panelDefinition = c
            },
            _: {
                onShow: function () {
                    var a =
                        this.editor.getSelection(),
                        b = a && a.getStartElement(),
                        c = this.editor.elementPath(),
                        j = this._.listeners;
                    this.removeAll();
                    for (var e = 0; e < j.length; e++) {
                        var i = j[e](b, a, c);
                        if (i) for (var f in i) {
                                var h = this.editor.getMenuItem(f);
                                if (h && (!h.command || this.editor.getCommand(h.command).state)) h.state = i[f], this.add(h)
                        }
                    }
                },
                onClick: function (a) {
                    this.hide();
                    if (a.onClick) a.onClick();
                    else a.command && this.editor.execCommand(a.command)
                },
                onEscape: function (a) {
                    var b = this.parent;
                    b ? b._.panel.hideChild(1) : 27 == a && this.hide(1);
                    return !1
                },
                onHide: function () {
                    this.onHide && this.onHide()
                },
                showSubMenu: function (a) {
                    var b = this._.subMenu,
                        c = this.items[a];
                    if (c = c.getItems && c.getItems()) {
                        b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
                            level: this._.level + 1
                        }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
                        for (var j in c) {
                            var e = this.editor.getMenuItem(j);
                            e && (e.state = c[j], b.add(e))
                        }
                        var i = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + ("" + a));
                        setTimeout(function () {
                            b.show(i,
                            2)
                        }, 0)
                    } else this._.panel.hideChild(1)
                }
            },
            proto: {
                add: function (a) {
                    a.order || (a.order = this.items.length);
                    this.items.push(a)
                },
                removeAll: function () {
                    this.items = []
                },
                show: function (a, b, c, j) {
                    if (!this.parent && (this._.onShow(), !this.items.length)) return;
                    var b = b || ("rtl" == this.editor.lang.dir ? 2 : 1),
                        e = this.items,
                        i = this.editor,
                        f = this._.panel,
                        h = this._.element;
                    if (!f) {
                        f = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                        f.onEscape = CKEDITOR.tools.bind(function (a) {
                            if (!1 ===
                                this._.onEscape(a)) return !1
                        }, this);
                        f.onShow = function () {
                            f._.panel.getHolderElement().getParent().addClass("cke cke_reset_all")
                        };
                        f.onHide = CKEDITOR.tools.bind(function () {
                            this._.onHide && this._.onHide()
                        }, this);
                        h = f.addBlock(this.id, this._.panelDefinition.block);
                        h.autoSize = !0;
                        var d = h.keys;
                        d[40] = "next";
                        d[9] = "next";
                        d[38] = "prev";
                        d[CKEDITOR.SHIFT + 9] = "prev";
                        d["rtl" == i.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
                        d[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                        CKEDITOR.env.ie && (d[13] = "mouseup");
                        h = this._.element =
                            h.element;
                        d = h.getDocument();
                        d.getBody().setStyle("overflow", "hidden");
                        d.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
                        this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) {
                            clearTimeout(this._.showSubTimeout);
                            this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, i.config.menu_subMenuDelay || 400, this, [a])
                        }, this);
                        this._.itemOutFn = CKEDITOR.tools.addFunction(function () {
                            clearTimeout(this._.showSubTimeout)
                        }, this);
                        this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) {
                            var b =
                                this.items[a];
                            if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1);
                            else if (b.getItems) this._.showSubMenu(a);
                            else this._.onClick(b)
                        }, this)
                    }
                    k(e);
                    for (var d = i.elementPath(), d = ['<div class="cke_menu' + (d && d.direction() != i.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">'], g = e.length, m = g && e[0].group, l = 0; l < g; l++) {
                        var n = e[l];
                        m != n.group && (d.push('<div class="cke_menuseparator" role="separator"></div>'), m = n.group);
                        n.render(this, l, d)
                    }
                    d.push("</div>");
                    h.setHtml(d.join(""));
                    CKEDITOR.ui.fire("ready",
                    this);
                    this.parent ? this.parent._.panel.showAsChild(f, this.id, a, b, c, j) : f.showBlock(this.id, a, b, c, j);
                    i.fire("menuShow", [f])
                },
                addListener: function (a) {
                    this._.listeners.push(a)
                },
                hide: function (a) {
                    this._.onHide && this._.onHide();
                    this._.panel && this._.panel.hide(a)
                }
            }
        });
        CKEDITOR.menuItem = CKEDITOR.tools.createClass({
            $: function (a, b, c) {
                CKEDITOR.tools.extend(this, c, {
                    order: 0,
                    className: "cke_menubutton__" + b
                });
                this.group = a._.menuGroups[this.group];
                this.editor = a;
                this.name = b
            },
            proto: {
                render: function (a, b, c) {
                    var g = a.id + ("" +
                        b),
                        e = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state,
                        i = e == CKEDITOR.TRISTATE_ON ? "on" : e == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off",
                        f = this.getItems,
                        h = "&#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";",
                        d = this.name;
                    this.icon && !/\./.test(this.icon) && (d = this.icon);
                    a = {
                        id: g,
                        name: this.name,
                        iconName: d,
                        label: this.label,
                        cls: this.className || "",
                        state: i,
                        hasPopup: f ? "true" : "false",
                        disabled: e == CKEDITOR.TRISTATE_DISABLED,
                        title: this.label,
                        href: "javascript:void('" + (this.label || "").replace("'") + "')",
                        hoverFn: a._.itemOverFn,
                        moveOutFn: a._.itemOutFn,
                        clickFn: a._.itemClickFn,
                        index: b,
                        iconStyle: CKEDITOR.skin.getIconStyle(d, "rtl" == this.editor.lang.dir, d == this.icon ? null : this.icon, this.iconOffset),
                        arrowHtml: f ? l.output({
                            label: h
                        }) : ""
                    };
                    m.output(a, c)
                }
            }
        })
    })();
    CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div";
    CKEDITOR.plugins.add("contextmenu", {
        requires: "menu",
        onLoad: function () {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu,
                $: function (b) {
                    this.base.call(this, b, {
                        panel: {
                            className: "cke_menu_panel",
                            attributes: {
                                "aria-label": b.lang.contextmenu.options
                            }
                        }
                    })
                },
                proto: {
                    addTarget: function (b, d) {
                        if (CKEDITOR.env.opera && !("oncontextmenu" in document.body)) {
                            var c;
                            b.on("mousedown", function (a) {
                                a = a.data;
                                if (2 != a.$.button) a.getKeystroke() == CKEDITOR.CTRL + 1 && b.fire("contextmenu", a);
                                else if (!d || !(CKEDITOR.env.mac ?
                                    a.$.metaKey : a.$.ctrlKey)) {
                                    var g = a.getTarget();
                                    c || (g = g.getDocument(), c = g.createElement("input"), c.$.type = "button", g.getBody().append(c));
                                    c.setAttribute("style", "position:absolute;top:" + (a.$.clientY - 2) + "px;left:" + (a.$.clientX - 2) + "px;width:5px;height:5px;opacity:0.01")
                                }
                            });
                            b.on("mouseup", function (a) {
                                c && (c.remove(), c = void 0, b.fire("contextmenu", a.data))
                            })
                        }
                        b.on("contextmenu", function (a) {
                            a = a.data;
                            if (!d || !(CKEDITOR.env.webkit ? e : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey)) {
                                a.preventDefault();
                                var b = a.getTarget().getDocument(),
                                    c = a.getTarget().getDocument().getDocumentElement(),
                                    f = !b.equals(CKEDITOR.document),
                                    b = b.getWindow().getScrollPosition(),
                                    h = f ? a.$.clientX : a.$.pageX || b.x + a.$.clientX,
                                    i = f ? a.$.clientY : a.$.pageY || b.y + a.$.clientY;
                                CKEDITOR.tools.setTimeout(function () {
                                    this.open(c, null, h, i)
                                }, CKEDITOR.env.ie ? 200 : 0, this)
                            }
                        }, this);
                        if (CKEDITOR.env.opera) b.on("keypress", function (a) {
                                a = a.data;
                                0 === a.$.keyCode && a.preventDefault()
                            });
                        if (CKEDITOR.env.webkit) {
                            var e, f = function () {
                                    e = 0
                                };
                            b.on("keydown", function (a) {
                                e = CKEDITOR.env.mac ? a.data.$.metaKey :
                                    a.data.$.ctrlKey
                            });
                            b.on("keyup", f);
                            b.on("contextmenu", f)
                        }
                    },
                    open: function (b, d, c, e) {
                        this.editor.focus();
                        b = b || CKEDITOR.document.getDocumentElement();
                        this.editor.selectionChange(1);
                        this.show(b, d, c, e)
                    }
                }
            })
        },
        beforeInit: function (b) {
            var d = b.contextMenu = new CKEDITOR.plugins.contextMenu(b);
            b.on("contentDom", function () {
                d.addTarget(b.editable(), !1 !== b.config.browserContextMenuOnCtrl)
            });
            b.addCommand("contextMenu", {
                exec: function () {
                    b.contextMenu.open(b.document.getBody())
                }
            });
            b.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
            b.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
        }
    });
    (function () {
        CKEDITOR.plugins.add("div", {
            requires: "dialog",
            init: function (a) {
                if (!a.blockless) {
                    var c = a.lang.div,
                        b = "div(*)";
                    CKEDITOR.dialog.isTabEnabled(a, "editdiv", "advanced") && (b += ";div[dir,id,lang,title]{*}");
                    a.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
                        allowedContent: b,
                        requiredContent: "div",
                        contextSensitive: !0,
                        refresh: function (a, c) {
                            this.setState("div" in (a.config.div_wrapTable ? c.root : c.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }
                    }));
                    a.addCommand("editdiv",
                    new CKEDITOR.dialogCommand("editdiv", {
                        requiredContent: "div"
                    }));
                    a.addCommand("removediv", {
                        requiredContent: "div",
                        exec: function (a) {
                            function c(b) {
                                if ((b = CKEDITOR.plugins.div.getSurroundDiv(a, b)) && !b.data("cke-div-added")) f.push(b), b.data("cke-div-added")
                            }
                            for (var b = a.getSelection(), g = b && b.getRanges(), e, h = b.createBookmarks(), f = [], d = 0; d < g.length; d++) e = g[d], e.collapsed ? c(b.getStartElement()) : (e = new CKEDITOR.dom.walker(e), e.evaluator = c, e.lastForward());
                            for (d = 0; d < f.length; d++) f[d].remove(!0);
                            b.selectBookmarks(h)
                        }
                    });
                    a.ui.addButton && a.ui.addButton("CreateDiv", {
                        label: c.toolbar,
                        command: "creatediv",
                        toolbar: "blocks,50"
                    });
                    a.addMenuItems && (a.addMenuItems({
                        editdiv: {
                            label: c.edit,
                            command: "editdiv",
                            group: "div",
                            order: 1
                        },
                        removediv: {
                            label: c.remove,
                            command: "removediv",
                            group: "div",
                            order: 5
                        }
                    }), a.contextMenu && a.contextMenu.addListener(function (b) {
                        return !b || b.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(a) ? {
                            editdiv: CKEDITOR.TRISTATE_OFF,
                            removediv: CKEDITOR.TRISTATE_OFF
                        } : null
                    }));
                    CKEDITOR.dialog.add("creatediv", this.path +
                        "dialogs/div.js");
                    CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js")
                }
            }
        });
        CKEDITOR.plugins.div = {
            getSurroundDiv: function (a, c) {
                var b = a.elementPath(c);
                return a.elementPath(b.blockLimit).contains("div", 1)
            }
        }
    })();
    CKEDITOR.plugins.add("resize", {
        init: function (b) {
            var f, g, n, o, a = b.config,
                q = b.ui.spaceId("resizer"),
                h = b.element ? b.element.getDirection(1) : "ltr";
            !a.resize_dir && (a.resize_dir = "vertical");
            void 0 == a.resize_maxWidth && (a.resize_maxWidth = 3E3);
            void 0 == a.resize_maxHeight && (a.resize_maxHeight = 3E3);
            void 0 == a.resize_minWidth && (a.resize_minWidth = 750);
            void 0 == a.resize_minHeight && (a.resize_minHeight = 250);
            if (!1 !== a.resize_enabled) {
                var c = null,
                    i = ("both" == a.resize_dir || "horizontal" == a.resize_dir) && a.resize_minWidth != a.resize_maxWidth,
                    l = ("both" == a.resize_dir || "vertical" == a.resize_dir) && a.resize_minHeight != a.resize_maxHeight,
                    j = function (d) {
                        var e = f,
                            m = g,
                            c = e + (d.data.$.screenX - n) * ("rtl" == h ? -1 : 1),
                            d = m + (d.data.$.screenY - o);
                        i && (e = Math.max(a.resize_minWidth, Math.min(c, a.resize_maxWidth)));
                        l && (m = Math.max(a.resize_minHeight, Math.min(d, a.resize_maxHeight)));
                        b.resize(i ? e : null, m)
                    }, k = function () {
                        CKEDITOR.document.removeListener("mousemove", j);
                        CKEDITOR.document.removeListener("mouseup", k);
                        b.document && (b.document.removeListener("mousemove", j), b.document.removeListener("mouseup",
                        k))
                    }, p = CKEDITOR.tools.addFunction(function (d) {
                        c || (c = b.getResizable());
                        f = c.$.offsetWidth || 0;
                        g = c.$.offsetHeight || 0;
                        n = d.screenX;
                        o = d.screenY;
                        a.resize_minWidth > f && (a.resize_minWidth = f);
                        a.resize_minHeight > g && (a.resize_minHeight = g);
                        CKEDITOR.document.on("mousemove", j);
                        CKEDITOR.document.on("mouseup", k);
                        b.document && (b.document.on("mousemove", j), b.document.on("mouseup", k));
                        d.preventDefault && d.preventDefault()
                    });
                b.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(p)
                });
                b.on("uiSpace", function (a) {
                    if ("bottom" ==
                        a.data.space) {
                        var e = "";
                        i && !l && (e = " cke_resizer_horizontal");
                        !i && l && (e = " cke_resizer_vertical");
                        var c = '<span id="' + q + '" class="cke_resizer' + e + " cke_resizer_" + h + '" title="' + CKEDITOR.tools.htmlEncode(b.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + p + ', event)">' + ("ltr" == h ? "◢" : "◣") + "</span>";
                        "ltr" == h && "ltr" == e ? a.data.html += c : a.data.html = c + a.data.html
                    }
                }, b, null, 100);
                b.on("maximize", function (a) {
                    b.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
                })
            }
        }
    });
    (function () {
        function w(a) {
            function d() {
                for (var b = i(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || n(a), f = 0; f < e.length; f++) {
                    var k = e[f];
                    if ("/" != k) {
                        "string" == typeof k && (k = e[f] = {
                            name: k
                        });
                        var j, d = k.groups;
                        if (d) for (var h = 0; h < d.length; h++) j = d[h], (j = b[j]) && c(k, j);
                        (j = b[k.name]) && c(k, j)
                    }
                }
                return e
            }
            function i() {
                var b = {}, c, f, e;
                for (c in a.ui.items) f = a.ui.items[c], e = f.toolbar || "others", e = e.split(","), f = e[0], e = parseInt(e[1] || -1, 10), b[f] || (b[f] = []), b[f].push({
                        name: c,
                        order: e
                    });
                for (f in b) b[f] = b[f].sort(function (b,
                    a) {
                        return b.order == a.order ? 0 : 0 > a.order ? -1 : 0 > b.order ? 1 : b.order < a.order ? -1 : 1
                    });
                return b
            }
            function c(c, e) {
                if (e.length) {
                    c.items ? c.items.push(a.ui.create("-")) : c.items = [];
                    for (var f; f = e.shift();) if (f = "string" == typeof f ? f : f.name, !b || -1 == CKEDITOR.tools.indexOf(b, f))(f = a.ui.create(f)) && a.addFeature(f) && c.items.push(f)
                }
            }
            function h(b) {
                var a = [],
                    e, d, h;
                for (e = 0; e < b.length; ++e) d = b[e], h = {}, "/" == d ? a.push(d) : CKEDITOR.tools.isArray(d) ? (c(h, CKEDITOR.tools.clone(d)), a.push(h)) : d.items && (c(h, CKEDITOR.tools.clone(d.items)),
                    h.name = d.name, a.push(h));
                return a
            }
            var b = a.config.removeButtons,
                b = b && b.split(","),
                e = a.config.toolbar;
            "string" == typeof e && (e = a.config["toolbar_" + e]);
            return a.toolbar = e ? h(e) : d()
        }
        function n(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{
                    name: "document",
                    groups: ["mode", "document", "doctools"]
                }, {
                    name: "clipboard",
                    groups: ["clipboard", "undo"]
                }, {
                    name: "editing",
                    groups: ["find", "selection", "spellchecker"]
                }, {
                    name: "forms"
                }, "/", {
                    name: "basicstyles",
                    groups: ["basicstyles", "cleanup"]
                }, {
                    name: "paragraph",
                    groups: ["list",
                            "indent", "blocks", "align"
                    ]
                }, {
                    name: "links"
                }, {
                    name: "insert"
                }, "/", {
                    name: "styles"
                }, {
                    name: "colors"
                }, {
                    name: "tools"
                }, {
                    name: "others"
                }, {
                    name: "about"
                }
            ])
        }
        var t = function () {
            this.toolbars = [];
            this.focusCommandExecuted = !1
        };
        t.prototype.focus = function () {
            for (var a = 0, d; d = this.toolbars[a++];) for (var i = 0, c; c = d.items[i++];) if (c.focus) {
                        c.focus();
                        return
                    }
        };
        var x = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            readOnly: 1,
            exec: function (a) {
                a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () {
                    a.toolbox.focus()
                },
                100) : a.toolbox.focus())
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button",
            init: function (a) {
                var d, i = function (c, h) {
                        var b, e = "rtl" == a.lang.dir,
                            g = a.config.toolbarGroupCycling,
                            g = void 0 === g || g;
                        switch (h) {
                            case 9:
                            case CKEDITOR.SHIFT + 9:
                                for (; !b || !b.items.length;) if (b = 9 == h ? (b ? b.next : c.toolbar.next) || a.toolbox.toolbars[0] : (b ? b.previous : c.toolbar.previous) || a.toolbox.toolbars[a.toolbox.toolbars.length - 1], b.items.length) for (c = b.items[d ? b.items.length - 1 : 0]; c && !c.focus;)(c = d ? c.previous : c.next) || (b = 0);
                                c && c.focus();
                                return !1;
                            case e ? 37:
                                39 :
                            case 40:
                                b = c;
                                do b = b.next, !b && g && (b = c.toolbar.items[0]); while (b && !b.focus);
                                b ? b.focus() : i(c, 9);
                                return !1;
                            case e ? 39:
                                37 :
                            case 38:
                                b = c;
                                do b = b.previous, !b && g && (b = c.toolbar.items[c.toolbar.items.length - 1]); while (b && !b.focus);
                                b ? b.focus() : (d = 1, i(c, CKEDITOR.SHIFT + 9), d = 0);
                                return !1;
                            case 27:
                                return a.focus(), !1;
                            case 13:
                            case 32:
                                return c.execute(), !1
                        }
                        return !0
                    };
                a.on("uiSpace", function (c) {
                    if (c.data.space == a.config.toolbarLocation) {
                        c.removeListener();
                        a.toolbox = new t;
                        var d = CKEDITOR.tools.getNextId(),
                            b = ['<span id="', d, '" class="cke_voice_label">', a.lang.toolbar.toolbars, "</span>", '<span id="' + a.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', d, '" onmousedown="return false;">'],
                            d = !1 !== a.config.toolbarStartupExpanded,
                            e, g;
                        a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && b.push('<span class="cke_toolbox_main"' + (d ? ">" : ' style="display:none">'));
                        for (var n = a.toolbox.toolbars, f = w(a), k = 0; k < f.length; k++) {
                            var j, l = 0,
                                q, m = f[k],
                                r;
                            if (m) if (e && (b.push("</span>"),
                                g = e = 0), "/" === m) b.push('<span class="cke_toolbar_break"></span>');
                                else {
                                    r = m.items || m;
                                    for (var s = 0; s < r.length; s++) {
                                        var o = r[s],
                                            u;
                                        if (o) if (o.type == CKEDITOR.UI_SEPARATOR) g = e && o;
                                            else {
                                                u = !1 !== o.canGroup;
                                                if (!l) {
                                                    j = CKEDITOR.tools.getNextId();
                                                    l = {
                                                        id: j,
                                                        items: []
                                                    };
                                                    q = m.name && (a.lang.toolbar.toolbarGroups[m.name] || m.name);
                                                    b.push('<span id="', j, '" class="cke_toolbar"', q ? ' aria-labelledby="' + j + '_label"' : "", ' role="toolbar">');
                                                    q && b.push('<span id="', j, '_label" class="cke_voice_label">', q, "</span>");
                                                    b.push('<span class="cke_toolbar_start"></span>');
                                                    var p = n.push(l) - 1;
                                                    0 < p && (l.previous = n[p - 1], l.previous.next = l)
                                                }
                                                u ? e || (b.push('<span class="cke_toolgroup" role="presentation">'), e = 1) : e && (b.push("</span>"), e = 0);
                                                j = function (c) {
                                                    c = c.render(a, b);
                                                    p = l.items.push(c) - 1;
                                                    if (p > 0) {
                                                        c.previous = l.items[p - 1];
                                                        c.previous.next = c
                                                    }
                                                    c.toolbar = l;
                                                    c.onkey = i;
                                                    c.onfocus = function () {
                                                        a.toolbox.focusCommandExecuted || a.focus()
                                                    }
                                                };
                                                g && (j(g), g = 0);
                                                j(o)
                                            }
                                    }
                                    e && (b.push("</span>"), g = e = 0);
                                    l && b.push('<span class="cke_toolbar_end"></span></span>')
                                }
                        }
                        a.config.toolbarCanCollapse && b.push("</span>");
                        if (a.config.toolbarCanCollapse &&
                            a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var v = CKEDITOR.tools.addFunction(function () {
                                a.execCommand("toolbarCollapse")
                            });
                            a.on("destroy", function () {
                                CKEDITOR.tools.removeFunction(v)
                            });
                            a.addCommand("toolbarCollapse", {
                                readOnly: 1,
                                exec: function (b) {
                                    var a = b.ui.space("toolbar_collapser"),
                                        c = a.getPrevious(),
                                        e = b.ui.space("contents"),
                                        d = c.getParent(),
                                        f = parseInt(e.$.style.height, 10),
                                        h = d.$.offsetHeight,
                                        g = a.hasClass("cke_toolbox_collapser_min");
                                    g ? (c.show(), a.removeClass("cke_toolbox_collapser_min"), a.setAttribute("title",
                                    b.lang.toolbar.toolbarCollapse)) : (c.hide(), a.addClass("cke_toolbox_collapser_min"), a.setAttribute("title", b.lang.toolbar.toolbarExpand));
                                    a.getFirst().setText(g ? "▲" : "◀");
                                    e.setStyle("height", f - (d.$.offsetHeight - h) + "px");
                                    b.fire("resize")
                                },
                                modes: {
                                    wysiwyg: 1,
                                    source: 1
                                }
                            });
                            a.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                            b.push('<a title="' + (d ? a.lang.toolbar.toolbarCollapse : a.lang.toolbar.toolbarExpand) + '" id="' + a.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser');
                            d || b.push(" cke_toolbox_collapser_min");
                            b.push('" onclick="CKEDITOR.tools.callFunction(' + v + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                        }
                        b.push("</span>");
                        c.data.html += b.join("")
                    }
                });
                a.on("destroy", function () {
                    if (this.toolbox) {
                        var a, d = 0,
                            b, e, g;
                        for (a = this.toolbox.toolbars; d < a.length; d++) {
                            e = a[d].items;
                            for (b = 0; b < e.length; b++) g = e[b], g.clickFn && CKEDITOR.tools.removeFunction(g.clickFn), g.keyDownFn && CKEDITOR.tools.removeFunction(g.keyDownFn)
                        }
                    }
                });
                a.on("uiReady", function () {
                    var c = a.ui.space("toolbox");
                    c && a.focusManager.add(c, 1)
                });
                a.addCommand("toolbarFocus", x);
                a.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
                a.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                a.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                    create: function () {
                        return {
                            render: function (a, d) {
                                d.push('<span class="cke_toolbar_separator" role="separator"></span>');
                                return {}
                            }
                        }
                    }
                })
            }
        });
        CKEDITOR.ui.prototype.addToolbarGroup = function (a, d, i) {
            var c = n(this.editor),
                h = 0 === d,
                b = {
                    name: a
                };
            if (i) {
                if (i = CKEDITOR.tools.search(c, function (a) {
                    return a.name == i
                })) {
                    !i.groups && (i.groups = []);
                    if (d && (d = CKEDITOR.tools.indexOf(i.groups, d), 0 <= d)) {
                        i.groups.splice(d + 1, 0, a);
                        return
                    }
                    h ? i.groups.splice(0, 0, a) : i.groups.push(a);
                    return
                }
                d = null
            }
            d && (d = CKEDITOR.tools.indexOf(c, function (a) {
                return a.name == d
            }));
            h ? c.splice(0, 0, a) : "number" == typeof d ? c.splice(d + 1, 0, b) : c.push(a)
        }
    })();
    CKEDITOR.UI_SEPARATOR = "separator";
    CKEDITOR.config.toolbarLocation = "top";
    (function () {
        var h;

        function m(a, d) {
            function o(b) {
                b = a._.elementsPath.list[b];
                if (b.equals(a.editable())) {
                    var e = a.createRange();
                    e.selectNodeContents(b);
                    e.select()
                } else a.getSelection().selectElement(b);
                a.focus()
            }
            function p() {
                i && i.setHtml(n);
                delete a._.elementsPath.list
            }
            var l = a.ui.spaceId("path"),
                i, q = "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_";
            a._.elementsPath = {
                idBase: q,
                filters: []
            };
            d.html += '<span id="' + l + '_label" class="cke_voice_label">' + a.lang.elementspath.eleLabel + '</span><span id="' + l + '" class="cke_path" role="group" aria-labelledby="' +
                l + '_label">' + n + "</span>";
            a.on("uiReady", function () {
                var b = a.ui.space("path");
                b && a.focusManager.add(b, 1)
            });
            var m = CKEDITOR.tools.addFunction(o),
                r = CKEDITOR.tools.addFunction(function (b, e) {
                    var c = a._.elementsPath.idBase,
                        f, e = new CKEDITOR.dom.event(e);
                    f = "rtl" == a.lang.dir;
                    switch (e.getKeystroke()) {
                        case f ? 39:
                            37 :
                        case 9:
                            return (f = CKEDITOR.document.getById(c + (b + 1))) || (f = CKEDITOR.document.getById(c + "0")), f.focus(), !1;
                        case f ? 37:
                            39 :
                        case CKEDITOR.SHIFT + 9:
                            return (f = CKEDITOR.document.getById(c + (b - 1))) || (f = CKEDITOR.document.getById(c +
                                (a._.elementsPath.list.length - 1))), f.focus(), !1;
                        case 27:
                            return a.focus(), !1;
                        case 13:
                        case 32:
                            return o(b), !1
                    }
                    return !0
                });
            a.on("selectionChange", function (b) {
                for (var e = a.editable(), c = b.data.selection.getStartElement(), b = [], f = a._.elementsPath.list = [], d = a._.elementsPath.filters; c;) {
                    var j = 0,
                        g;
                    g = c.data("cke-display-name") ? c.data("cke-display-name") : c.data("cke-real-element-type") ? c.data("cke-real-element-type") : c.getName();
                    for (var k = 0; k < d.length; k++) {
                        var h = d[k](c, g);
                        if (!1 === h) {
                            j = 1;
                            break
                        }
                        g = h || g
                    }
                    j || (j = f.push(c) -
                        1, k = a.lang.elementspath.eleTitle.replace(/%1/, g), g = s.output({
                        id: q + j,
                        label: k,
                        text: g,
                        jsTitle: "javascript:void('" + g + "')",
                        index: j,
                        keyDownFn: r,
                        clickFn: m
                    }), b.unshift(g));
                    if (c.equals(e)) break;
                    c = c.getParent()
                }
                i || (i = CKEDITOR.document.getById(l));
                e = i;
                e.setHtml(b.join("") + n);
                a.fire("elementsPathUpdate", {
                    space: e
                })
            });
            a.on("readOnly", p);
            a.on("contentDomUnload", p);
            a.addCommand("elementsPathFocus", h);
            a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
        }
        h = {
            editorFocus: !1,
            readOnly: 1,
            exec: function (a) {
                (a = CKEDITOR.document.getById(a._.elementsPath.idBase +
                    "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
            }
        };
        var n = '<span class="cke_path_empty">&nbsp;</span>',
            d = "";
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) d += ' onkeypress="return false;"';
        CKEDITOR.env.gecko && (d += ' onblur="this.style.cssText = this.style.cssText;"');
        var s = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' + (CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version ? ' onfocus="event.preventBubble();"' : "") + d + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
        CKEDITOR.plugins.add("elementspath", {
            init: function (a) {
                a.on("uiSpace", function (d) {
                    "bottom" == d.data.space && m(a, d.data)
                })
            }
        })
    })();
    (function () {
        function C(c, j, f) {
            function b(b) {
                if ((d = a[b ? "getFirst" : "getLast"]()) && (!d.is || !d.isBlockBoundary()) && (m = j.root[b ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) && (!m.is || !m.isBlockBoundary({
                    br: 1
                }))) c.document.createElement("br")[b ? "insertBefore" : "insertAfter"](d)
            }
            for (var i = CKEDITOR.plugins.list.listToArray(j.root, f), e = [], h = 0; h < j.contents.length; h++) {
                var g = j.contents[h];
                if ((g = g.getAscendant("li", !0)) && !g.getCustomData("list_item_processed")) e.push(g), CKEDITOR.dom.element.setMarker(f,
                    g, "list_item_processed", !0)
            }
            g = null;
            for (h = 0; h < e.length; h++) g = e[h].getCustomData("listarray_index"), i[g].indent = -1;
            for (h = g + 1; h < i.length; h++) if (i[h].indent > i[h - 1].indent + 1) {
                    e = i[h - 1].indent + 1 - i[h].indent;
                    for (g = i[h].indent; i[h] && i[h].indent >= g;) i[h].indent += e, h++;
                    h--
                }
            var a = CKEDITOR.plugins.list.arrayToList(i, f, null, c.config.enterMode, j.root.getAttribute("dir")).listNode,
                d, m;
            b(!0);
            b();
            a.replace(j.root)
        }
        function x(c, j) {
            this.name = c;
            this.context = this.type = j;
            this.allowedContent = j + " li";
            this.requiredContent =
                j
        }
        function y(c, j, f, b) {
            for (var i, e; i = c[b ? "getLast" : "getFirst"](D);)(e = i.getDirection(1)) !== j.getDirection(1) && i.setAttribute("dir", e), i.remove(), f ? i[b ? "insertBefore" : "insertAfter"](f) : j.append(i, b)
        }
        function A(c) {
            var j;
            (j = function (f) {
                var b = c[f ? "getPrevious" : "getNext"](q);
                b && (b.type == CKEDITOR.NODE_ELEMENT && b.is(c.getName())) && (y(c, b, null, !f), c.remove(), c = b)
            })();
            j(1)
        }
        function B(c) {
            return c.type == CKEDITOR.NODE_ELEMENT && (c.getName() in CKEDITOR.dtd.$block || c.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[c.getName()]["#"]
        }

        function v(c, j, f) {
            c.fire("saveSnapshot");
            f.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var b = f.extractContents();
            j.trim(!1, !0);
            var i = j.createBookmark(),
                e = new CKEDITOR.dom.elementPath(j.startContainer),
                h = e.block,
                e = e.lastElement.getAscendant("li", 1) || h,
                g = new CKEDITOR.dom.elementPath(f.startContainer),
                a = g.contains(CKEDITOR.dtd.$listItem),
                g = g.contains(CKEDITOR.dtd.$list);
            h ? (h = h.getBogus()) && h.remove() : g && (h = g.getPrevious(q)) && u(h) && h.remove();
            (h = b.getLast()) && (h.type == CKEDITOR.NODE_ELEMENT && h.is("br")) &&
                h.remove();
            (h = j.startContainer.getChild(j.startOffset)) ? b.insertBefore(h) : j.startContainer.append(b);
            if (a && (b = w(a))) e.contains(a) ? (y(b, a.getParent(), a), b.remove()) : e.append(b);
            for (; f.checkStartOfBlock() && f.checkEndOfBlock();) g = f.startPath(), b = g.block, b.is("li") && (e = b.getParent(), b.equals(e.getLast(q)) && b.equals(e.getFirst(q)) && (b = e)), f.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START), b.remove();
            f = f.clone();
            b = c.editable();
            f.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
            f = new CKEDITOR.dom.walker(f);
            f.evaluator = function (a) {
                return q(a) && !u(a)
            };
            (f = f.next()) && (f.type == CKEDITOR.NODE_ELEMENT && f.getName() in CKEDITOR.dtd.$list) && A(f);
            j.moveToBookmark(i);
            j.select();
            c.fire("saveSnapshot")
        }
        function w(c) {
            return (c = c.getLast(q)) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in r ? c : null
        }
        var r = {
            ol: 1,
            ul: 1
        }, E = CKEDITOR.dom.walker.whitespaces(),
            F = CKEDITOR.dom.walker.bookmark(),
            q = function (c) {
                return !(E(c) || F(c))
            }, u = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function (c, j, f, b, i) {
                if (!r[c.getName()]) return [];
                b ||
                    (b = 0);
                f || (f = []);
                for (var e = 0, h = c.getChildCount(); e < h; e++) {
                    var g = c.getChild(e);
                    g.type == CKEDITOR.NODE_ELEMENT && g.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(g, j, f, b + 1);
                    if ("li" == g.$.nodeName.toLowerCase()) {
                        var a = {
                            parent: c,
                            indent: b,
                            element: g,
                            contents: []
                        };
                        i ? a.grandparent = i : (a.grandparent = c.getParent(), a.grandparent && "li" == a.grandparent.$.nodeName.toLowerCase() && (a.grandparent = a.grandparent.getParent()));
                        j && CKEDITOR.dom.element.setMarker(j, g, "listarray_index", f.length);
                        f.push(a);
                        for (var d =
                            0, m = g.getChildCount(), k; d < m; d++) k = g.getChild(d), k.type == CKEDITOR.NODE_ELEMENT && r[k.getName()] ? CKEDITOR.plugins.list.listToArray(k, j, f, b + 1, a.grandparent) : a.contents.push(k)
                    }
                }
                return f
            },
            arrayToList: function (c, j, f, b, i) {
                f || (f = 0);
                if (!c || c.length < f + 1) return null;
                for (var e, h = c[f].parent.getDocument(), g = new CKEDITOR.dom.documentFragment(h), a = null, d = f, m = Math.max(c[f].indent, 0), k = null, n, l, p = b == CKEDITOR.ENTER_P ? "p" : "div";;) {
                    var o = c[d];
                    e = o.grandparent;
                    n = o.element.getDirection(1);
                    if (o.indent == m) {
                        if (!a || c[d].parent.getName() !=
                            a.getName()) a = c[d].parent.clone(!1, 1), i && a.setAttribute("dir", i), g.append(a);
                        k = a.append(o.element.clone(0, 1));
                        n != a.getDirection(1) && k.setAttribute("dir", n);
                        for (e = 0; e < o.contents.length; e++) k.append(o.contents[e].clone(1, 1));
                        d++
                    } else if (o.indent == Math.max(m, 0) + 1) l = c[d - 1].element.getDirection(1), d = CKEDITOR.plugins.list.arrayToList(c, null, d, b, l != n ? n : null), !k.getChildCount() && (CKEDITOR.env.ie && !(7 < h.$.documentMode)) && k.append(h.createText(" ")), k.append(d.listNode), d = d.nextIndex;
                    else if (-1 == o.indent && !f && e) {
                        r[e.getName()] ? (k = o.element.clone(!1, !0), n != e.getDirection(1) && k.setAttribute("dir", n)) : k = new CKEDITOR.dom.documentFragment(h);
                        var a = e.getDirection(1) != n,
                            s = o.element,
                            z = s.getAttribute("class"),
                            u = s.getAttribute("style"),
                            w = k.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (b != CKEDITOR.ENTER_BR || a || u || z),
                            t, x = o.contents.length;
                        for (e = 0; e < x; e++) {
                            t = o.contents[e];
                            if (t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary()) {
                                a && !t.getDirection() && t.setAttribute("dir", n);
                                var v = t,
                                    y = s.getAttribute("style");
                                y && v.setAttribute("style",
                                y.replace(/([^;])$/, "$1;") + (v.getAttribute("style") || ""));
                                z && t.addClass(z)
                            } else w && (l || (l = h.createElement(p), a && l.setAttribute("dir", n)), u && l.setAttribute("style", u), z && l.setAttribute("class", z), l.append(t.clone(1, 1)));
                            k.append(l || t.clone(1, 1))
                        }
                        k.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && d != c.length - 1 && ((n = k.getLast()) && (n.type == CKEDITOR.NODE_ELEMENT && "_moz" == n.getAttribute("type")) && n.remove(), (!k.getLast(q) || !(n.type == CKEDITOR.NODE_ELEMENT && n.getName() in CKEDITOR.dtd.$block)) && k.append(h.createElement("br")));
                        n = k.$.nodeName.toLowerCase();
                        !CKEDITOR.env.ie && ("div" == n || "p" == n) && k.appendBogus();
                        g.append(k);
                        a = null;
                        d++
                    } else return null;
                    l = null;
                    if (c.length <= d || Math.max(c[d].indent, 0) < m) break
                }
                if (j) for (c = g.getFirst(); c;) {
                        if (c.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(j, c), c.getName() in CKEDITOR.dtd.$listItem && (f = c, h = i = b = void 0, b = f.getDirection()))) {
                            for (i = f.getParent(); i && !(h = i.getDirection());) i = i.getParent();
                            b == h && f.removeAttribute("dir")
                        }
                        c = c.getNextSourceNode()
                }
                return {
                    listNode: g,
                    nextIndex: d
                }
            }
        };
        var G = /^h[1-6]$/,
            D = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        x.prototype = {
            exec: function (c) {
                this.refresh(c, c.elementPath());
                var j = c.config,
                    f = c.getSelection(),
                    b = f && f.getRanges(!0);
                if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var i = c.editable();
                    if (i.getFirst(q)) {
                        var e = 1 == b.length && b[0];
                        (j = e && e.getEnclosedNode()) && (j.is && this.type == j.getName()) && this.setState(CKEDITOR.TRISTATE_ON)
                    } else j.enterMode == CKEDITOR.ENTER_BR ? i.appendBogus() : b[0].fixBlock(1, j.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), f.selectRanges(b)
                }
                for (var j =
                    f.createBookmarks(!0), i = [], h = {}, b = b.createIterator(), g = 0;
                (e = b.getNextRange()) && ++g;) {
                    var a = e.getBoundaryNodes(),
                        d = a.startNode,
                        m = a.endNode;
                    d.type == CKEDITOR.NODE_ELEMENT && "td" == d.getName() && e.setStartAt(a.startNode, CKEDITOR.POSITION_AFTER_START);
                    m.type == CKEDITOR.NODE_ELEMENT && "td" == m.getName() && e.setEndAt(a.endNode, CKEDITOR.POSITION_BEFORE_END);
                    e = e.createIterator();
                    for (e.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; a = e.getNextParagraph();) if (!a.getCustomData("list_block")) {
                            CKEDITOR.dom.element.setMarker(h,
                            a, "list_block", 1);
                            for (var k = c.elementPath(a), d = k.elements, m = 0, k = k.blockLimit, n, l = d.length - 1; 0 <= l && (n = d[l]); l--) if (r[n.getName()] && k.contains(n)) {
                                    k.removeCustomData("list_group_object_" + g);
                                    (d = n.getCustomData("list_group_object")) ? d.contents.push(a) : (d = {
                                        root: n,
                                        contents: [a]
                                    }, i.push(d), CKEDITOR.dom.element.setMarker(h, n, "list_group_object", d));
                                    m = 1;
                                    break
                                }
                            m || (m = k, m.getCustomData("list_group_object_" + g) ? m.getCustomData("list_group_object_" + g).contents.push(a) : (d = {
                                root: m,
                                contents: [a]
                            }, CKEDITOR.dom.element.setMarker(h,
                            m, "list_group_object_" + g, d), i.push(d)))
                        }
                }
                for (n = []; 0 < i.length;) if (d = i.shift(), this.state == CKEDITOR.TRISTATE_OFF) if (r[d.root.getName()]) {
                            a = c;
                            b = d;
                            d = h;
                            g = n;
                            m = CKEDITOR.plugins.list.listToArray(b.root, d);
                            k = [];
                            for (e = 0; e < b.contents.length; e++) if (l = b.contents[e], (l = l.getAscendant("li", !0)) && !l.getCustomData("list_item_processed")) k.push(l), CKEDITOR.dom.element.setMarker(d, l, "list_item_processed", !0);
                            for (var l = b.root.getDocument(), p = void 0, o = void 0, e = 0; e < k.length; e++) {
                                var s = k[e].getCustomData("listarray_index"),
                                    p = m[s].parent;
                                p.is(this.type) || (o = l.createElement(this.type), p.copyAttributes(o, {
                                    start: 1,
                                    type: 1
                                }), o.removeStyle("list-style-type"), m[s].parent = o)
                            }
                            a = CKEDITOR.plugins.list.arrayToList(m, d, null, a.config.enterMode);
                            d = void 0;
                            m = a.listNode.getChildCount();
                            for (e = 0; e < m && (d = a.listNode.getChild(e)); e++) d.getName() == this.type && g.push(d);
                            a.listNode.replace(b.root)
                        } else {
                            m = c;
                            a = d;
                            e = n;
                            k = a.contents;
                            b = a.root.getDocument();
                            g = [];
                            1 == k.length && k[0].equals(a.root) && (d = b.createElement("div"), k[0].moveChildren && k[0].moveChildren(d),
                            k[0].append(d), k[0] = d);
                            a = a.contents[0].getParent();
                            for (l = 0; l < k.length; l++) a = a.getCommonAncestor(k[l].getParent());
                            p = m.config.useComputedState;
                            m = d = void 0;
                            p = void 0 === p || p;
                            for (l = 0; l < k.length; l++) for (o = k[l]; s = o.getParent();) {
                                    if (s.equals(a)) {
                                        g.push(o);
                                        !m && o.getDirection() && (m = 1);
                                        o = o.getDirection(p);
                                        null !== d && (d = d && d != o ? null : o);
                                        break
                                    }
                                    o = s
                            }
                            if (!(1 > g.length)) {
                                k = g[g.length - 1].getNext();
                                l = b.createElement(this.type);
                                e.push(l);
                                for (p = e = void 0; g.length;) e = g.shift(), p = b.createElement("li"), e.is("pre") || G.test(e.getName()) ?
                                        e.appendTo(p) : (e.copyAttributes(p), d && e.getDirection() && (p.removeStyle("direction"), p.removeAttribute("dir")), e.moveChildren(p), e.remove()), p.appendTo(l);
                                d && m && l.setAttribute("dir", d);
                                k ? l.insertBefore(k) : l.appendTo(a)
                            }
                        } else this.state == CKEDITOR.TRISTATE_ON && r[d.root.getName()] && C.call(this, c, d, h);
                for (l = 0; l < n.length; l++) A(n[l]);
                CKEDITOR.dom.element.clearAllMarkers(h);
                f.selectBookmarks(j);
                c.focus()
            },
            refresh: function (c, j) {
                var f = j.contains(r, 1),
                    b = j.blockLimit || j.root;
                f && b.contains(f) ? this.setState(f.is(this.type) ?
                    CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
            }
        };
        CKEDITOR.plugins.add("list", {
            requires: "indent",
            init: function (c) {
                c.blockless || (c.addCommand("numberedlist", new x("numberedlist", "ol")), c.addCommand("bulletedlist", new x("bulletedlist", "ul")), c.ui.addButton && (c.ui.addButton("NumberedList", {
                    label: c.lang.list.numberedlist,
                    command: "numberedlist",
                    directional: !0,
                    toolbar: "list,10"
                }), c.ui.addButton("BulletedList", {
                    label: c.lang.list.bulletedlist,
                    command: "bulletedlist",
                    directional: !0,
                    toolbar: "list,20"
                })), c.on("key", function (j) {
                    var f = j.data.keyCode;
                    if (c.mode == "wysiwyg" && f in {
                        8: 1,
                        46: 1
                    }) {
                        var b = c.getSelection().getRanges()[0],
                            i = b.startPath();
                        if (b.collapsed) {
                            var i = new CKEDITOR.dom.elementPath(b.startContainer),
                                e = f == 8,
                                h = c.editable(),
                                g = new CKEDITOR.dom.walker(b.clone());
                            g.evaluator = function (a) {
                                return q(a) && !u(a)
                            };
                            g.guard = function (a, b) {
                                return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"))
                            };
                            f = b.clone();
                            if (e) {
                                var a, d;
                                if ((a = i.contains(r)) && b.checkBoundaryOfElement(a, CKEDITOR.START) &&
                                    (a = a.getParent()) && a.is("li") && (a = w(a))) {
                                    d = a;
                                    a = a.getPrevious(q);
                                    f.moveToPosition(a && u(a) ? a : d, CKEDITOR.POSITION_BEFORE_START)
                                } else {
                                    g.range.setStartAt(h, CKEDITOR.POSITION_AFTER_START);
                                    g.range.setEnd(b.startContainer, b.startOffset);
                                    if ((a = g.previous()) && a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in r || a.is("li"))) {
                                        if (!a.is("li")) {
                                            g.range.selectNodeContents(a);
                                            g.reset();
                                            g.evaluator = B;
                                            a = g.previous()
                                        }
                                        d = a;
                                        f.moveToElementEditEnd(d)
                                    }
                                }
                                if (d) {
                                    v(c, f, b);
                                    j.cancel()
                                } else if ((f = i.contains(r)) && b.checkBoundaryOfElement(f,
                                CKEDITOR.START)) {
                                    d = f.getFirst(q);
                                    if (b.checkBoundaryOfElement(d, CKEDITOR.START)) {
                                        a = f.getPrevious(q);
                                        if (w(d)) {
                                            if (a) {
                                                b.moveToElementEditEnd(a);
                                                b.select()
                                            }
                                        } else c.execCommand("outdent");
                                        j.cancel()
                                    }
                                }
                            } else if (d = i.contains("li")) {
                                g.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                                h = (i = d.getLast(q)) && B(i) ? i : d;
                                d = 0;
                                if ((a = g.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in r && a.equals(i)) {
                                    d = 1;
                                    a = g.next()
                                } else b.checkBoundaryOfElement(h, CKEDITOR.END) && (d = 1);
                                if (d && a) {
                                    b = b.clone();
                                    b.moveToElementEditStart(a);
                                    v(c,
                                    f, b);
                                    j.cancel()
                                }
                            } else {
                                g.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                                if ((a = g.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.is(r)) {
                                    a = a.getFirst(q);
                                    if (i.block && b.checkStartOfBlock() && b.checkEndOfBlock()) {
                                        i.block.remove();
                                        b.moveToElementEditStart(a);
                                        b.select()
                                    } else if (w(a)) {
                                        b.moveToElementEditStart(a);
                                        b.select()
                                    } else {
                                        b = b.clone();
                                        b.moveToElementEditStart(a);
                                        v(c, f, b)
                                    }
                                    j.cancel()
                                }
                            }
                            setTimeout(function () {
                                c.selectionChange(1)
                            })
                        }
                    }
                }))
            }
        })
    })();
    (function () {
        function p(d, i) {
            this.name = i;
            var a = this.useIndentClasses = d.config.indentClasses && 0 < d.config.indentClasses.length;
            if (a) {
                this.classNameRegex = RegExp("(?:^|\\s+)(" + d.config.indentClasses.join("|") + ")(?=$|\\s)");
                this.indentClassMap = {};
                for (var f = 0; f < d.config.indentClasses.length; f++) this.indentClassMap[d.config.indentClasses[f]] = f + 1
            }
            this.startDisabled = "outdent" == i;
            this.allowedContent = {
                "div h1 h2 h3 h4 h5 h6 ol p pre ul": {
                    propertiesOnly: !0,
                    styles: !a ? "margin-left,margin-right" : null,
                    classes: a ? d.config.indentClasses : null
                }
            };
            this.requiredContent = ["p" + (a ? "(" + d.config.indentClasses[0] + ")" : "{margin-left}"), "li"]
        }
        function r(d, i) {
            return "ltr" == (i || d.getComputedStyle("direction")) ? "margin-left" : "margin-right"
        }
        function q(d) {
            return d.type == CKEDITOR.NODE_ELEMENT && d.is("li")
        }
        var m = {
            ol: 1,
            ul: 1
        }, t = CKEDITOR.dom.walker.whitespaces(!0),
            u = CKEDITOR.dom.walker.bookmark(!1, !0);
        p.prototype = {
            context: "p",
            refresh: function (d, i) {
                var a = i && i.contains(m),
                    f = i.block || i.blockLimit;
                a ? this.setState(CKEDITOR.TRISTATE_OFF) : !this.useIndentClasses &&
                    "indent" == this.name ? this.setState(CKEDITOR.TRISTATE_OFF) : f ? this.useIndentClasses ? (a = f.$.className.match(this.classNameRegex), f = 0, a && (a = a[1], f = this.indentClassMap[a]), "outdent" == this.name && !f || "indent" == this.name && f == d.config.indentClasses.length ? this.setState(CKEDITOR.TRISTATE_DISABLED) : this.setState(CKEDITOR.TRISTATE_OFF)) : (a = parseInt(f.getStyle(r(f)), 10), isNaN(a) && (a = 0), 0 >= a ? this.setState(CKEDITOR.TRISTATE_DISABLED) : this.setState(CKEDITOR.TRISTATE_OFF)) : this.setState(CKEDITOR.TRISTATE_DISABLED)
            },
            exec: function (d) {
                function i(n) {
                    for (var j = l.startContainer, b = l.endContainer; j && !j.getParent().equals(n);) j = j.getParent();
                    for (; b && !b.getParent().equals(n);) b = b.getParent();
                    if (j && b) {
                        for (var c = j, j = [], a = !1; !a;) c.equals(b) && (a = !0), j.push(c), c = c.getNext();
                        if (!(1 > j.length)) {
                            c = n.getParents(!0);
                            for (b = 0; b < c.length; b++) if (c[b].getName && m[c[b].getName()]) {
                                    n = c[b];
                                    break
                                }
                            for (var c = "indent" == e.name ? 1 : -1, b = j[0], j = j[j.length - 1], a = CKEDITOR.plugins.list.listToArray(n, o), f = a[j.getCustomData("listarray_index")].indent,
                                b = b.getCustomData("listarray_index"); b <= j.getCustomData("listarray_index"); b++) if (a[b].indent += c, 0 < c) {
                                    var k = a[b].parent;
                                    a[b].parent = new CKEDITOR.dom.element(k.getName(), k.getDocument())
                                }
                            for (b = j.getCustomData("listarray_index") + 1; b < a.length && a[b].indent > f; b++) a[b].indent += c;
                            j = CKEDITOR.plugins.list.arrayToList(a, o, null, d.config.enterMode, n.getDirection());
                            if ("outdent" == e.name) {
                                var i;
                                if ((i = n.getParent()) && i.is("li")) for (var c = j.listNode.getChildren(), h = [], g, b = c.count() - 1; 0 <= b; b--)(g = c.getItem(b)) && (g.is &&
                                            g.is("li")) && h.push(g)
                            }
                            j && j.listNode.replace(n);
                            if (h && h.length) for (b = 0; b < h.length; b++) {
                                    for (g = n = h[b];
                                    (g = g.getNext()) && g.is && g.getName() in m;) CKEDITOR.env.ie && !n.getFirst(function (b) {
                                            return t(b) && u(b)
                                        }) && n.append(l.document.createText(" ")), n.append(g);
                                    n.insertAfter(i)
                            }
                        }
                    }
                }
                function a() {
                    var a = l.createIterator(),
                        e = d.config.enterMode;
                    a.enforceRealBlocks = !0;
                    a.enlargeBr = e != CKEDITOR.ENTER_BR;
                    for (var b; b = a.getNextParagraph(e == CKEDITOR.ENTER_P ? "p" : "div");) f(b)
                }
                function f(a, g) {
                    if (a.getCustomData("indent_processed")) return !1;
                    if (e.useIndentClasses) {
                        var b = a.$.className.match(e.classNameRegex),
                            c = 0;
                        b && (b = b[1], c = e.indentClassMap[b]);
                        "outdent" == e.name ? c-- : c++;
                        if (0 > c) return !1;
                        c = Math.min(c, d.config.indentClasses.length);
                        c = Math.max(c, 0);
                        a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(e.classNameRegex, ""));
                        0 < c && a.addClass(d.config.indentClasses[c - 1])
                    } else {
                        b = r(a, g);
                        c = parseInt(a.getStyle(b), 10);
                        isNaN(c) && (c = 0);
                        var f = d.config.indentOffset || 40,
                            c = c + ("indent" == e.name ? 1 : -1) * f;
                        if (0 > c) return !1;
                        c = Math.max(c, 0);
                        c = Math.ceil(c / f) *
                            f;
                        a.setStyle(b, c ? c + (d.config.indentUnit || "px") : "");
                        "" === a.getAttribute("style") && a.removeAttribute("style")
                    }
                    CKEDITOR.dom.element.setMarker(o, a, "indent_processed", 1);
                    return !0
                }
                for (var e = this, o = {}, g = d.getSelection(), v = g.createBookmarks(1), l, p = (g && g.getRanges(1)).createIterator(); l = p.getNextRange();) {
                    for (var h = l.getCommonAncestor(); h && !(h.type == CKEDITOR.NODE_ELEMENT && m[h.getName()]);) h = h.getParent();
                    if (!h) {
                        var k = l.getEnclosedNode();
                        k && (k.type == CKEDITOR.NODE_ELEMENT && k.getName() in m) && (l.setStartAt(k,
                        CKEDITOR.POSITION_AFTER_START), l.setEndAt(k, CKEDITOR.POSITION_BEFORE_END), h = k)
                    }
                    h && (l.startContainer.type == CKEDITOR.NODE_ELEMENT && l.startContainer.getName() in m) && (k = new CKEDITOR.dom.walker(l), k.evaluator = q, l.startContainer = k.next());
                    h && (l.endContainer.type == CKEDITOR.NODE_ELEMENT && l.endContainer.getName() in m) && (k = new CKEDITOR.dom.walker(l), k.evaluator = q, l.endContainer = k.previous());
                    if (h) {
                        var k = h.getFirst(q),
                            w = !! k.getNext(q),
                            s = l.startContainer;
                        (!k.equals(s) && !k.contains(s) || !("indent" == e.name || e.useIndentClasses ||
                            parseInt(h.getStyle(r(h)), 10)) || !f(h, !w && k.getDirection())) && i(h)
                    } else a()
                }
                CKEDITOR.dom.element.clearAllMarkers(o);
                d.forceNextSelectionCheck();
                g.selectBookmarks(v)
            }
        };
        CKEDITOR.plugins.add("indent", {
            requires: "list",
            onLoad: function () {
                (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) && CKEDITOR.addCss(".cke_editable ul,.cke_editable ol{\tmargin-left: 0px;\tpadding-left: 40px;}")
            },
            init: function (d) {
                d.blockless || (d.addCommand("indent", new p(d, "indent")), d.addCommand("outdent", new p(d, "outdent")), d.ui.addButton &&
                    (d.ui.addButton("Indent", {
                    label: d.lang.indent.indent,
                    command: "indent",
                    directional: !0,
                    toolbar: "indent,20"
                }), d.ui.addButton("Outdent", {
                    label: d.lang.indent.outdent,
                    command: "outdent",
                    directional: !0,
                    toolbar: "indent,10"
                })), d.on("dirChanged", function (i) {
                    var a = d.createRange();
                    a.setStartBefore(i.data.node);
                    a.setEndAfter(i.data.node);
                    for (var f = new CKEDITOR.dom.walker(a), e; e = f.next();) if (e.type == CKEDITOR.NODE_ELEMENT) if (!e.equals(i.data.node) && e.getDirection()) {
                                a.setStartAfter(e);
                                f = new CKEDITOR.dom.walker(a)
                            } else {
                                var o =
                                    d.config.indentClasses;
                                if (o) for (var g = i.data.dir == "ltr" ? ["_rtl", ""] : ["", "_rtl"], m = 0; m < o.length; m++) if (e.hasClass(o[m] + g[0])) {
                                            e.removeClass(o[m] + g[0]);
                                            e.addClass(o[m] + g[1])
                                        }
                                o = e.getStyle("margin-right");
                                g = e.getStyle("margin-left");
                                o ? e.setStyle("margin-left", o) : e.removeStyle("margin-left");
                                g ? e.setStyle("margin-right", g) : e.removeStyle("margin-right")
                            }
                }))
            }
        })
    })();
    (function () {
        function m(a, d, b) {
            b = a.config.forceEnterMode || b;
            if ("wysiwyg" != a.mode) return !1;
            d || (d = a.config.enterMode);
            a.elementPath().isContextFor("p") || (d = CKEDITOR.ENTER_BR, b = 1);
            a.fire("saveSnapshot");
            d == CKEDITOR.ENTER_BR ? n(a, d, null, b) : o(a, d, null, b);
            a.fire("saveSnapshot");
            return !0
        }
        function p(a) {
            for (var a = a.getSelection().getRanges(!0), d = a.length - 1; 0 < d; d--) a[d].deleteContents();
            return a[0]
        }
        CKEDITOR.plugins.add("enterkey", {
            requires: "indent",
            init: function (a) {
                a.addCommand("enter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function (a) {
                        m(a)
                    }
                });
                a.addCommand("shiftEnter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function (a) {
                        "wysiwyg" == a.mode && m(a, a.config.shiftEnterMode, 1)
                    }
                });
                a.setKeystroke([
                    [13, "enter"],
                    [CKEDITOR.SHIFT + 13, "shiftEnter"]
                ])
            }
        });
        var s = CKEDITOR.dom.walker.whitespaces(),
            t = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function (a, d, b, i) {
                if (b = b || p(a)) {
                    var f = b.document,
                        j = b.checkStartOfBlock(),
                        h = b.checkEndOfBlock(),
                        c = a.elementPath(b.startContainer).block;
                    if (j && h) {
                        if (c && (c.is("li") || c.getParent().is("li"))) {
                            a.execCommand("outdent");
                            return
                        }
                        if (c && c.getParent().is("blockquote")) {
                            c.breakParent(c.getParent());
                            c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove();
                            c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove();
                            b.moveToElementEditStart(c);
                            b.select();
                            return
                        }
                    } else if (c && c.is("pre") && !h) {
                        n(a, d, b, i);
                        return
                    }
                    var c = d == CKEDITOR.ENTER_DIV ? "div" : "p",
                        l = b.splitBlock(c);
                    if (l) {
                        var d = l.previousBlock,
                            a = l.nextBlock,
                            j = l.wasStartOfBlock,
                            h = l.wasEndOfBlock,
                            g;
                        if (a) g = a.getParent(), g.is("li") && (a.breakParent(g),
                            a.move(a.getNext(), 1));
                        else if (d && (g = d.getParent()) && g.is("li")) d.breakParent(g), g = d.getNext(), b.moveToElementEditStart(g), d.move(d.getPrevious());
                        if (!j && !h) {
                            if (a.is("li")) {
                                var e = b.clone();
                                e.selectNodeContents(a);
                                e = new CKEDITOR.dom.walker(e);
                                e.evaluator = function (a) {
                                    return !(t(a) || s(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty))
                                };
                                (g = e.next()) && (g.type == CKEDITOR.NODE_ELEMENT && g.is("ul", "ol")) && (CKEDITOR.env.ie ? f.createText(" ") : f.createElement("br")).insertBefore(g)
                            }
                            a &&
                                b.moveToElementEditStart(a)
                        } else {
                            var k;
                            if (d) {
                                if (d.is("li") || !q.test(d.getName()) && !d.is("pre")) e = d.clone()
                            } else a && (e = a.clone());
                            e ? i && !e.is("li") && e.renameNode(c) : g && g.is("li") ? e = g : (e = f.createElement(c), d && (k = d.getDirection()) && e.setAttribute("dir", k));
                            if (f = l.elementPath) {
                                i = 0;
                                for (g = f.elements.length; i < g; i++) {
                                    k = f.elements[i];
                                    if (k.equals(f.block) || k.equals(f.blockLimit)) break;
                                    CKEDITOR.dtd.$removeEmpty[k.getName()] && (k = k.clone(), e.moveChildren(k), e.append(k))
                                }
                            }
                            CKEDITOR.env.ie || e.appendBogus();
                            e.getParent() ||
                                b.insertNode(e);
                            e.is("li") && e.removeAttribute("value");
                            if (CKEDITOR.env.ie && j && (!h || !d.getChildCount())) b.moveToElementEditStart(h ? d : e), b.select();
                            b.moveToElementEditStart(j && !h ? a : e)
                        }
                        b.select();
                        b.scrollIntoView()
                    }
                }
            },
            enterBr: function (a, d, b, i) {
                if (b = b || p(a)) {
                    var f = b.document,
                        j = b.checkEndOfBlock(),
                        h = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
                        c = h.block,
                        h = c && h.block.getName();
                    !i && "li" == h ? o(a, d, b, i) : (!i && j && q.test(h) ? (j = c.getDirection()) ? (f = f.createElement("div"), f.setAttribute("dir",
                    j), f.insertAfter(c), b.setStart(f, 0)) : (f.createElement("br").insertAfter(c), CKEDITOR.env.gecko && f.createText("").insertAfter(c), b.setStartAt(c.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (c = "pre" == h && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? f.createText("\r") : f.createElement("br"), b.deleteContents(), b.insertNode(c), CKEDITOR.env.ie ? b.setStartAt(c, CKEDITOR.POSITION_AFTER_END) : (f.createText("﻿").insertAfter(c), j && c.getParent().appendBogus(), c.getNext().$.nodeValue =
                        "", b.setStartAt(c.getNext(), CKEDITOR.POSITION_AFTER_START))), b.collapse(!0), b.select(), b.scrollIntoView())
                }
            }
        };
        var r = CKEDITOR.plugins.enterkey,
            n = r.enterBr,
            o = r.enterBlock,
            q = /^h[1-6]$/
    })();
    (function () {
        function j(a, b) {
            var d = {}, e = [],
                f = {
                    nbsp: " ",
                    shy: "­",
                    gt: ">",
                    lt: "<",
                    amp: "&",
                    apos: "'",
                    quot: '"'
                }, a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (a, h) {
                    var c = b ? "&" + h + ";" : f[h];
                    d[c] = b ? f[h] : "&" + h + ";";
                    e.push(c);
                    return ""
                });
            if (!b && a) {
                var a = a.split(","),
                    c = document.createElement("div"),
                    g;
                c.innerHTML = "&" + a.join(";&") + ";";
                g = c.innerHTML;
                c = null;
                for (c = 0; c < g.length; c++) {
                    var i = g.charAt(c);
                    d[i] = "&" + a[c] + ";";
                    e.push(i)
                }
            }
            d.regex = e.join(b ? "|" : "");
            return d
        }
        CKEDITOR.plugins.add("entities", {
            afterInit: function (a) {
                var b =
                    a.config;
                if (a = (a = a.dataProcessor) && a.htmlFilter) {
                    var d = [];
                    !1 !== b.basicEntities && d.push("nbsp,gt,lt,amp");
                    b.entities && (d.length && d.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                    b.entities_latin && d.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), b.entities_greek && d.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                    b.entities_additional && d.push(b.entities_additional));
                    var e = j(d.join(",")),
                        f = e.regex ? "[" + e.regex + "]" : "a^";
                    delete e.regex;
                    b.entities && b.entities_processNumerical && (f = "[^ -~]|" + f);
                    var f = RegExp(f, "g"),
                        c = function (a) {
                            return b.entities_processNumerical == "force" || !e[a] ? "&#" + a.charCodeAt(0) + ";" : e[a]
                        }, g = j("nbsp,gt,lt,amp,shy", !0),
                        i = RegExp(g.regex, "g"),
                        k = function (a) {
                            return g[a]
                        };
                    a.addRules({
                        text: function (a) {
                            return a.replace(i, k).replace(f, c)
                        }
                    })
                }
            }
        })
    })();
    CKEDITOR.config.basicEntities = !0;
    CKEDITOR.config.entities = !0;
    CKEDITOR.config.entities_latin = !0;
    CKEDITOR.config.entities_greek = !0;
    CKEDITOR.config.entities_additional = "#39";
    CKEDITOR.plugins.add("popup");
    CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function (e, a, b, d) {
            a = a || "80%";
            b = b || "70%";
            "string" == typeof a && (1 < a.length && "%" == a.substr(a.length - 1, 1)) && (a = parseInt(window.screen.width * parseInt(a, 10) / 100, 10));
            "string" == typeof b && (1 < b.length && "%" == b.substr(b.length - 1, 1)) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
            640 > a && (a = 640);
            420 > b && (b = 420);
            var f = parseInt((window.screen.height - b) / 2, 10),
                g = parseInt((window.screen.width - a) / 2, 10),
                d = (d || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" +
                    a + ",height=" + b + ",top=" + f + ",left=" + g,
                c = window.open("", null, d, !0);
            if (!c) return !1;
            try {
                -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (c.moveTo(g, f), c.resizeTo(a, b)), c.focus(), c.location.href = e
            } catch (h) {
                window.open(e, null, d, !0)
            }
            return !0
        }
    });
    (function () {
        function g(a, c) {
            var d = [];
            if (c) for (var b in c) d.push(b + "=" + encodeURIComponent(c[b]));
            else return a;
            return a + (-1 != a.indexOf("?") ? "&" : "?") + d.join("&")
        }
        function i(a) {
            a += "";
            return a.charAt(0).toUpperCase() + a.substr(1)
        }
        function k() {
            var a = this.getDialog(),
                c = a.getParentEditor();
            c._.filebrowserSe = this;
            var d = c.config["filebrowser" + i(a.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%",
                a = c.config["filebrowser" + i(a.getName()) + "WindowHeight"] || c.config.filebrowserWindowHeight || "70%",
                b = this.filebrowser.params || {};
            b.CKEditor = c.name;
            b.CKEditorFuncNum = c._.filebrowserFn;
            b.langCode || (b.langCode = c.langCode);
            b = g(this.filebrowser.url, b);
            c.popup(b, d, a, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
        }
        function l() {
            var a = this.getDialog();
            a.getParentEditor()._.filebrowserSe = this;
            return !a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value || !a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !1 : !0
        }
        function m(a, c, d) {
            var b = d.params || {};
            b.CKEditor = a.name;
            b.CKEditorFuncNum = a._.filebrowserFn;
            b.langCode || (b.langCode = a.langCode);
            c.action = g(d.url, b);
            c.filebrowser = d
        }
        function j(a, c, d, b) {
            var e, g;
            for (g in b) if (e = b[g], ("hbox" == e.type || "vbox" == e.type || "fieldset" == e.type) && j(a, c, d, e.children), e.filebrowser) if ("string" == typeof e.filebrowser && (e.filebrowser = {
                        action: "fileButton" == e.type ? "QuickUpload" : "Browse",
                        target: e.filebrowser
                    }), "Browse" == e.filebrowser.action) {
                        var f = e.filebrowser.url;
                        void 0 === f && (f = a.config["filebrowser" + i(c) + "BrowseUrl"], void 0 ===
                            f && (f = a.config.filebrowserBrowseUrl));
                        f && (e.onClick = k, e.filebrowser.url = f, e.hidden = !1)
                    } else if ("QuickUpload" == e.filebrowser.action && e["for"] && (f = e.filebrowser.url, void 0 === f && (f = a.config["filebrowser" + i(c) + "UploadUrl"], void 0 === f && (f = a.config.filebrowserUploadUrl)), f)) {
                var h = e.onClick;
                e.onClick = function (a) {
                    var b = a.sender;
                    return h && h.call(b, a) === false ? false : l.call(b, a)
                };
                e.filebrowser.url = f;
                e.hidden = !1;
                m(a, d.getContents(e["for"][0]).get(e["for"][1]), e.filebrowser)
            }
        }
        function h(a, c, d) {
            if (-1 !== d.indexOf(";")) {
                for (var d =
                    d.split(";"), b = 0; b < d.length; b++) if (h(a, c, d[b])) return !0;
                return !1
            }
            return (a = a.getContents(c).get(d).filebrowser) && a.url
        }
        function n(a, c) {
            var d = this._.filebrowserSe.getDialog(),
                b = this._.filebrowserSe["for"],
                e = this._.filebrowserSe.filebrowser.onSelect;
            b && d.getContentElement(b[0], b[1]).reset();
            if (!("function" == typeof c && !1 === c.call(this._.filebrowserSe)) && !(e && !1 === e.call(this._.filebrowserSe, a, c)) && ("string" == typeof c && c && alert(c), a && (b = this._.filebrowserSe, d = b.getDialog(), b = b.filebrowser.target || null))) if (b =
                    b.split(":"), e = d.getContentElement(b[0], b[1])) e.setValue(a), d.selectPage(b[0])
        }
        CKEDITOR.plugins.add("filebrowser", {
            requires: "popup",
            init: function (a) {
                a._.filebrowserFn = CKEDITOR.tools.addFunction(n, a);
                a.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(this._.filebrowserFn)
                })
            }
        });
        CKEDITOR.on("dialogDefinition", function (a) {
            var c = a.data.definition,
                d, b;
            for (b in c.contents) if (d = c.contents[b]) j(a.editor, a.data.name, c, d.elements), d.hidden && d.filebrowser && (d.hidden = !h(c, d.id, d.filebrowser))
        })
    })();
    CKEDITOR.plugins.add("find", {
        requires: "dialog",
        init: function (a) {
            var b = a.addCommand("find", new CKEDITOR.dialogCommand("find"));
            b.canUndo = !1;
            b.readOnly = 1;
            a.addCommand("replace", new CKEDITOR.dialogCommand("replace")).canUndo = !1;
            a.ui.addButton && (a.ui.addButton("Find", {
                label: a.lang.find.find,
                command: "find",
                toolbar: "find,10"
            }), a.ui.addButton("Replace", {
                label: a.lang.find.replace,
                command: "replace",
                toolbar: "find,20"
            }));
            CKEDITOR.dialog.add("find", this.path + "dialogs/find.js");
            CKEDITOR.dialog.add("replace", this.path +
                "dialogs/find.js")
        }
    });
    CKEDITOR.config.find_highlight = {
        element: "span",
        styles: {
            "background-color": "#004",
            color: "#fff"
        }
    };
    (function () {
        function g(a, b) {
            var c = j.exec(a),
                d = j.exec(b);
            if (c) {
                if (!c[2] && "px" == d[2]) return d[1];
                if ("px" == c[2] && !d[2]) return d[1] + "px"
            }
            return b
        }
        var i = CKEDITOR.htmlParser.cssStyle,
            h = CKEDITOR.tools.cssLength,
            j = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
            l = {
                elements: {
                    $: function (a) {
                        var b = a.attributes;
                        if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
                            var c = (new i(a)).rules,
                                a = b.attributes,
                                d = c.width,
                                c =
                                    c.height;
                            d && (a.width = g(a.width, d));
                            c && (a.height = g(a.height, c))
                        }
                        return b
                    }
                }
            }, k = CKEDITOR.plugins.add("fakeobjects", {
                afterInit: function (a) {
                    (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(l)
                }
            });
        CKEDITOR.editor.prototype.createFakeElement = function (a, b, c, d) {
            var e = this.lang.fakeobjects,
                e = e[c] || e.unknown,
                b = {
                    "class": b,
                    "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                    "data-cke-real-node-type": a.type,
                    alt: e,
                    title: e,
                    align: a.getAttribute("align") || ""
                };
            CKEDITOR.env.hc || (b.src = CKEDITOR.getUrl(k.path +
                "images/spacer.gif"));
            c && (b["data-cke-real-element-type"] = c);
            d && (b["data-cke-resizable"] = d, c = new i, d = a.getAttribute("width"), a = a.getAttribute("height"), d && (c.rules.width = h(d)), a && (c.rules.height = h(a)), c.populate(b));
            return this.document.createElement("img", {
                attributes: b
            })
        };
        CKEDITOR.editor.prototype.createFakeParserElement = function (a, b, c, d) {
            var e = this.lang.fakeobjects,
                e = e[c] || e.unknown,
                f;
            f = new CKEDITOR.htmlParser.basicWriter;
            a.writeHtml(f);
            f = f.getHtml();
            b = {
                "class": b,
                "data-cke-realelement": encodeURIComponent(f),
                "data-cke-real-node-type": a.type,
                alt: e,
                title: e,
                align: a.attributes.align || ""
            };
            CKEDITOR.env.hc || (b.src = CKEDITOR.getUrl(k.path + "images/spacer.gif"));
            c && (b["data-cke-real-element-type"] = c);
            d && (b["data-cke-resizable"] = d, d = a.attributes, a = new i, c = d.width, d = d.height, void 0 != c && (a.rules.width = h(c)), void 0 != d && (a.rules.height = h(d)), a.populate(b));
            return new CKEDITOR.htmlParser.element("img", b)
        };
        CKEDITOR.editor.prototype.restoreRealElement = function (a) {
            if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
            var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document);
            if (a.data("cke-resizable")) {
                var c = a.getStyle("width"),
                    a = a.getStyle("height");
                c && b.setAttribute("width", g(b.getAttribute("width"), c));
                a && b.setAttribute("height", g(b.getAttribute("height"), a))
            }
            return b
        }
    })();
    (function () {
        function d(a) {
            a = a.attributes;
            return "application/x-shockwave-flash" == a.type || f.test(a.src || "")
        }
        function e(a, b) {
            return a.createFakeParserElement(b, "cke_flash", "flash", !0)
        }
        var f = /\.swf(?:$|\?)/i;
        CKEDITOR.plugins.add("flash", {
            requires: "dialog,fakeobjects",
            onLoad: function () {
                CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
            },
            init: function (a) {
                var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
                CKEDITOR.dialog.isTabEnabled(a, "flash", "properties") && (b += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]");
                CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b += ";object[id]{*}; embed[bgcolor]{*}(*)");
                a.addCommand("flash", new CKEDITOR.dialogCommand("flash", {
                    allowedContent: b,
                    requiredContent: "embed"
                }));
                a.ui.addButton && a.ui.addButton("Flash", {
                    label: a.lang.common.flash,
                    command: "flash",
                    toolbar: "insert,20"
                });
                CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js");
                a.addMenuItems && a.addMenuItems({
                    flash: {
                        label: a.lang.flash.properties,
                        command: "flash",
                        group: "flash"
                    }
                });
                a.on("doubleclick", function (a) {
                    var b = a.data.element;
                    b.is("img") && "flash" == b.data("cke-real-element-type") && (a.data.dialog = "flash")
                });
                a.contextMenu && a.contextMenu.addListener(function (a) {
                    if (a && a.is("img") && !a.isReadOnly() && "flash" == a.data("cke-real-element-type")) return {
                            flash: CKEDITOR.TRISTATE_OFF
                    }
                })
            },
            afterInit: function (a) {
                var b = a.dataProcessor;
                (b = b && b.dataFilter) && b.addRules({
                    elements: {
                        "cke:object": function (b) {
                            var c = b.attributes;
                            if ((!c.classid || !("" + c.classid).toLowerCase()) && !d(b)) {
                                for (c = 0; c < b.children.length; c++) if ("cke:embed" == b.children[c].name) {
                                        if (!d(b.children[c])) break;
                                        return e(a, b)
                                    }
                                return null
                            }
                            return e(a, b)
                        },
                        "cke:embed": function (b) {
                            return !d(b) ? null : e(a, b)
                        }
                    }
                }, 5)
            }
        })
    })();
    CKEDITOR.tools.extend(CKEDITOR.config, {
        flashEmbedTagOnly: !1,
        flashAddEmbedTag: !0,
        flashConvertOnEdit: !1
    });
    (function () {
        function t(a) {
            var e = "left" == a ? "pageXOffset" : "pageYOffset";
            return e in g.$ ? g.$[e] : CKEDITOR.document.$.documentElement["left" == a ? "scrollLeft" : "scrollTop"]
        }
        function p(a) {
            var e, f = a.config,
                p = f.floatSpaceDockedOffsetX || 0,
                o = f.floatSpaceDockedOffsetY || 0,
                u = f.floatSpacePinnedOffsetX || 0,
                q = f.floatSpacePinnedOffsetY || 0,
                i = function (c) {
                    function f(a, c, b) {
                        d.setStyle(c, s(b));
                        d.setStyle("position", a)
                    }
                    function j(a) {
                        var c = r.getDocumentPosition();
                        switch (a) {
                            case "top":
                                f("absolute", "top", c.y - l - o);
                                break;
                            case "pin":
                                f("fixed",
                                    "top", q);
                                break;
                            case "bottom":
                                f("absolute", "top", c.y + (b.height || b.bottom - b.top) + o)
                        }
                        e = a
                    }
                    var r = a.editable();
                    if (r) {
                        "focus" == c.name && d.show();
                        d.removeStyle("left");
                        d.removeStyle("right");
                        var k = d.getClientRect(),
                            b = r.getClientRect(),
                            l = k.height,
                            n = t("left");
                        if (e) {
                            "top" == e && k.top < q ? j("pin") : "pin" == e ? b.top > o + l ? j("top") : b.bottom - k.bottom < l && j("bottom") : "bottom" == e && (b.top > o + l ? j("top") : b.bottom > 2 * l + q && j("pin"));
                            var c = g.getViewPaneSize(),
                                h = c.width / 2,
                                h = 0 < b.left && b.right < c.width && b.width > k.width ? "rtl" == a.config.contentsLangDirection ?
                                    "right" : "left" : h - b.left > b.right - h ? "left" : "right",
                                m;
                            k.width > c.width ? (h = "left", m = 0) : (m = "left" == h ? 0 < b.left ? b.left : 0 : b.right < c.width ? c.width - b.right : 0, m + k.width > c.width && (h = "left" == h ? "right" : "left", m = 0));
                            d.setStyle(h, s(("pin" == e ? u : p) + m + ("pin" == e ? 0 : "left" == h ? n : -n)))
                        } else e = "pin", j("pin"), i(c)
                    }
                }, f = CKEDITOR.document.getBody(),
                v = {
                    id: a.id,
                    name: a.name,
                    langDir: a.lang.dir,
                    langCode: a.langCode
                }, n = a.fire("uiSpace", {
                    space: "top",
                    html: ""
                }).html;
            if (n) {
                var d = f.append(CKEDITOR.dom.element.createFromHtml(w.output(CKEDITOR.tools.extend({
                    topId: a.ui.spaceId("top"),
                    content: n,
                    style: "display:none;z-index:" + (a.config.baseFloatZIndex - 1)
                }, v))));
                d.unselectable();
                d.on("mousedown", function (a) {
                    a = a.data;
                    a.getTarget().hasAscendant("a", 1) || a.preventDefault()
                });
                a.on("focus", function (a) {
                    i(a);
                    g.on("scroll", i);
                    g.on("resize", i)
                });
                a.on("blur", function () {
                    d.hide();
                    g.removeListener("scroll", i);
                    g.removeListener("resize", i)
                });
                a.on("destroy", function () {
                    g.removeListener("scroll", i);
                    g.removeListener("resize", i);
                    d.clearCustomData();
                    d.remove()
                });
                a.focusManager.hasFocus && d.show();
                a.focusManager.add(d,
                1)
            }
        }
        var w = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}"><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>');
        CKEDITOR.plugins.add("floatingspace", {
            init: function (a) {
                a.on("loaded", function () {
                    p(a)
                }, null, null, 20)
            }
        });
        var g =
            CKEDITOR.document.getWindow(),
            s = CKEDITOR.tools.cssLength
    })();
    CKEDITOR.plugins.add("listblock", {
        requires: "panel",
        onLoad: function () {
            var e = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'),
                f = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'),
                g = CKEDITOR.addTemplate("panel-list-group",
                    '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>');
            CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) {
                return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b))
            };
            CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block,
                $: function (a, b) {
                    var b = b || {}, c = b.attributes || (b.attributes = {});
                    (this.multiSelect = !! b.multiSelect) && (c["aria-multiselectable"] = !0);
                    !c.role && (c.role = "listbox");
                    this.base.apply(this, arguments);
                    c = this.keys;
                    c[40] = "next";
                    c[9] = "next";
                    c[38] = "prev";
                    c[CKEDITOR.SHIFT + 9] = "prev";
                    c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                    CKEDITOR.env.ie && (c[13] = "mouseup");
                    this._.pendingHtml = [];
                    this._.pendingList = [];
                    this._.items = {};
                    this._.groups = {}
                },
                _: {
                    close: function () {
                        if (this._.started) {
                            var a = e.output({
                                items: this._.pendingList.join("")
                            });
                            this._.pendingList = [];
                            this._.pendingHtml.push(a);
                            delete this._.started
                        }
                    },
                    getClick: function () {
                        this._.click || (this._.click = CKEDITOR.tools.addFunction(function (a) {
                            var b = this.toggle(a);
                            if (this.onClick) this.onClick(a,
                                b)
                        }, this));
                        return this._.click
                    }
                },
                proto: {
                    add: function (a, b, c) {
                        var d = CKEDITOR.tools.getNextId();
                        this._.started || (this._.started = 1, this._.size = this._.size || 0);
                        this._.items[a] = d;
                        a = {
                            id: d,
                            val: a,
                            onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick",
                            clickFn: this._.getClick(),
                            title: c || a,
                            text: b || a
                        };
                        this._.pendingList.push(f.output(a))
                    },
                    startGroup: function (a) {
                        this._.close();
                        var b = CKEDITOR.tools.getNextId();
                        this._.groups[a] = b;
                        this._.pendingHtml.push(g.output({
                            id: b,
                            label: a
                        }))
                    },
                    commit: function () {
                        this._.close();
                        this.element.appendHtml(this._.pendingHtml.join(""));
                        delete this._.size;
                        this._.pendingHtml = []
                    },
                    toggle: function (a) {
                        var b = this.isMarked(a);
                        b ? this.unmark(a) : this.mark(a);
                        return !b
                    },
                    hideGroup: function (a) {
                        var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
                        a && (a.setStyle("display", "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
                    },
                    hideItem: function (a) {
                        this.element.getDocument().getById(this._.items[a]).setStyle("display", "none")
                    },
                    showAll: function () {
                        var a = this._.items,
                            b =
                                this._.groups,
                            c = this.element.getDocument(),
                            d;
                        for (d in a) c.getById(a[d]).setStyle("display", "");
                        for (var e in b) a = c.getById(b[e]), d = a.getNext(), a.setStyle("display", ""), d && "ul" == d.getName() && d.setStyle("display", "")
                    },
                    mark: function (a) {
                        this.multiSelect || this.unmarkAll();
                        var a = this._.items[a],
                            b = this.element.getDocument().getById(a);
                        b.addClass("cke_selected");
                        this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0);
                        this.onMark && this.onMark(b)
                    },
                    unmark: function (a) {
                        var b = this.element.getDocument(),
                            a = this._.items[a],
                            c = b.getById(a);
                        c.removeClass("cke_selected");
                        b.getById(a + "_option").removeAttribute("aria-selected");
                        this.onUnmark && this.onUnmark(c)
                    },
                    unmarkAll: function () {
                        var a = this._.items,
                            b = this.element.getDocument(),
                            c;
                        for (c in a) {
                            var d = a[c];
                            b.getById(d).removeClass("cke_selected");
                            b.getById(d + "_option").removeAttribute("aria-selected")
                        }
                        this.onUnmark && this.onUnmark()
                    },
                    isMarked: function (a) {
                        return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")
                    },
                    focus: function (a) {
                        this._.focusIndex = -1;
                        if (a) {
                            for (var b = this.element.getDocument().getById(this._.items[a]).getFirst(), a = this.element.getElementsByTag("a"), c, d = -1; c = a.getItem(++d);) if (c.equals(b)) {
                                    this._.focusIndex = d;
                                    break
                                }
                            setTimeout(function () {
                                b.focus()
                            }, 0)
                        }
                    }
                }
            })
        }
    });
    CKEDITOR.plugins.add("richcombo", {
        requires: "floatpanel,listblock,button",
        beforeInit: function (c) {
            c.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler)
        }
    });
    (function () {
        var c = '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" hidefocus=true title="{title}" tabindex="-1"' + (CKEDITOR.env.gecko && 10900 <= CKEDITOR.env.version && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) c += ' onkeypress="return false;"';
        CKEDITOR.env.gecko && (c += ' onblur="this.style.cssText = this.style.cssText;"');
        var c = c + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);"  onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' +
            (CKEDITOR.env.hc ? "&#9660;" : CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>"),
            h = CKEDITOR.addTemplate("combo", c);
        CKEDITOR.UI_RICHCOMBO = "richcombo";
        CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
            $: function (a) {
                CKEDITOR.tools.extend(this, a, {
                    canGroup: !1,
                    title: a.label,
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: 1
                });
                a = this.panel || {};
                delete this.panel;
                this.id = CKEDITOR.tools.getNextNumber();
                this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
                a.className = "cke_combopanel";
                a.block = {
                    multiSelect: a.multiSelect,
                    attributes: a.attributes
                };
                a.toolbarRelated = !0;
                this._ = {
                    panelDefinition: a,
                    items: {}
                }
            },
            proto: {
                renderHtml: function (a) {
                    var b = [];
                    this.render(a, b);
                    return b.join("")
                },
                render: function (a, b) {
                    function j() {
                        var d = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                        this.setState(a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : d);
                        this.setValue("")
                    }
                    var c = CKEDITOR.env,
                        g = "cke_" + this.id,
                        e = CKEDITOR.tools.addFunction(function (b) {
                            i && (a.unlockSelection(1), i = 0);
                            d.execute(b)
                        }, this),
                        f = this,
                        d = {
                            id: g,
                            combo: this,
                            focus: function () {
                                CKEDITOR.document.getById(g).getChild(1).focus()
                            },
                            execute: function (d) {
                                var b = f._;
                                if (b.state != CKEDITOR.TRISTATE_DISABLED) if (f.createPanel(a), b.on) b.panel.hide();
                                    else {
                                        f.commit();
                                        var c = f.getValue();
                                        c ? b.list.mark(c) : b.list.unmarkAll();
                                        b.panel.showBlock(f.id, new CKEDITOR.dom.element(d), 4)
                                    }
                            },
                            clickFn: e
                        };
                    a.on("mode", j, this);
                    !this.readOnly && a.on("readOnly", j, this);
                    var k = CKEDITOR.tools.addFunction(function (a, b) {
                        var a = new CKEDITOR.dom.event(a),
                            c = a.getKeystroke();
                        switch (c) {
                            case 13:
                            case 32:
                            case 40:
                                CKEDITOR.tools.callFunction(e,
                                b);
                                break;
                            default:
                                d.onkey(d, c)
                        }
                        a.preventDefault()
                    }),
                        l = CKEDITOR.tools.addFunction(function () {
                            d.onfocus && d.onfocus()
                        }),
                        i = 0,
                        m = CKEDITOR.tools.addFunction(function () {
                            if (CKEDITOR.env.opera) {
                                var b = a.editable();
                                b.isInline() && b.hasFocus && (a.lockSelection(), i = 1)
                            }
                        });
                    d.keyDownFn = k;
                    c = {
                        id: g,
                        name: this.name || this.command,
                        label: this.label,
                        title: this.title,
                        cls: this.className || "",
                        titleJs: c.gecko && 10900 <= c.version && !c.hc ? "" : (this.title || "").replace("'", ""),
                        keydownFn: k,
                        mousedownFn: m,
                        focusFn: l,
                        clickFn: e
                    };
                    h.output(c, b);
                    if (this.onRender) this.onRender();
                    return d
                },
                createPanel: function (a) {
                    if (!this._.panel) {
                        var b = this._.panelDefinition,
                            c = this._.panelDefinition.block,
                            h = b.parent || CKEDITOR.document.getBody(),
                            g = "cke_combopanel__" + this.name,
                            e = new CKEDITOR.ui.floatPanel(a, h, b),
                            f = e.addListBlock(this.id, c),
                            d = this;
                        e.onShow = function () {
                            this.element.addClass(g);
                            d.setState(CKEDITOR.TRISTATE_ON);
                            f.focus(!f.multiSelect && d.getValue());
                            d._.on = 1;
                            d.editorFocus && a.focus();
                            if (d.onOpen) d.onOpen()
                        };
                        e.onHide = function (b) {
                            this.element.removeClass(g);
                            d.setState(d.modes && d.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                            d._.on = 0;
                            if (!b && d.onClose) d.onClose()
                        };
                        e.onEscape = function () {
                            e.hide(1)
                        };
                        f.onClick = function (a, b) {
                            d.onClick && d.onClick.call(d, a, b);
                            e.hide()
                        };
                        this._.panel = e;
                        this._.list = f;
                        e.getBlock(this.id).onHide = function () {
                            d._.on = 0;
                            d.setState(CKEDITOR.TRISTATE_OFF)
                        };
                        this.init && this.init()
                    }
                },
                setValue: function (a, b) {
                    this._.value = a;
                    var c = this.document.getById("cke_" + this.id + "_text");
                    c && (!a && !b ? (b = this.label, c.addClass("cke_combo_inlinelabel")) :
                        c.removeClass("cke_combo_inlinelabel"), c.setText("undefined" != typeof b ? b : a))
                },
                getValue: function () {
                    return this._.value || ""
                },
                unmarkAll: function () {
                    this._.list.unmarkAll()
                },
                mark: function (a) {
                    this._.list.mark(a)
                },
                hideItem: function (a) {
                    this._.list.hideItem(a)
                },
                hideGroup: function (a) {
                    this._.list.hideGroup(a)
                },
                showAll: function () {
                    this._.list.showAll()
                },
                add: function (a, b, c) {
                    this._.items[a] = c || a;
                    this._.list.add(a, b, c)
                },
                startGroup: function (a) {
                    this._.list.startGroup(a)
                },
                commit: function () {
                    this._.committed || (this._.list.commit(),
                    this._.committed = 1, CKEDITOR.ui.fire("ready", this));
                    this._.committed = 1
                },
                setState: function (a) {
                    if (this._.state != a) {
                        var b = this.document.getById("cke_" + this.id);
                        b.setState(a, "cke_combo");
                        a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled");
                        this._.state = a
                    }
                },
                enable: function () {
                    this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
                },
                disable: function () {
                    this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
                }
            },
            statics: {
                handler: {
                    create: function (a) {
                        return new CKEDITOR.ui.richCombo(a)
                    }
                }
            }
        });
        CKEDITOR.ui.prototype.addRichCombo = function (a, b) {
            this.add(a, CKEDITOR.UI_RICHCOMBO, b)
        }
    })();
    (function () {
        function g(a, b, g, h, j, n, k, o) {
            for (var p = a.config, l = new CKEDITOR.style(k), c = j.split(";"), j = [], f = {}, d = 0; d < c.length; d++) {
                var e = c[d];
                if (e) {
                    var e = e.split("/"),
                        m = {}, i = c[d] = e[0];
                    m[g] = j[d] = e[1] || i;
                    f[i] = new CKEDITOR.style(k, m);
                    f[i]._.definition.name = i
                } else c.splice(d--, 1)
            }
            a.ui.addRichCombo(b, {
                label: h.label,
                title: h.panelTitle,
                toolbar: "styles," + o,
                allowedContent: l,
                requiredContent: l,
                panel: {
                    css: [CKEDITOR.skin.getPath("editor")].concat(p.contentsCss),
                    multiSelect: !1,
                    attributes: {
                        "aria-label": h.panelTitle
                    }
                },
                init: function () {
                    this.startGroup(h.panelTitle);
                    for (var a = 0; a < c.length; a++) {
                        var b = c[a];
                        this.add(b, f[b].buildPreview(), b)
                    }
                },
                onClick: function (b) {
                    a.focus();
                    a.fire("saveSnapshot");
                    var c = f[b];
                    a[this.getValue() == b ? "removeStyle" : "applyStyle"](c);
                    a.fire("saveSnapshot")
                },
                onRender: function () {
                    a.on("selectionChange", function (a) {
                        for (var b = this.getValue(), a = a.data.path.elements, c = 0, d; c < a.length; c++) {
                            d = a[c];
                            for (var e in f) if (f[e].checkElementMatch(d, !0)) {
                                    e != b && this.setValue(e);
                                    return
                                }
                        }
                        this.setValue("", n)
                    }, this)
                }
            })
        }
        CKEDITOR.plugins.add("font", {
            requires: "richcombo",
            init: function (a) {
                var b = a.config;
                g(a, "Font", "family", a.lang.font, b.font_names, b.font_defaultLabel, b.font_style, 30);
                g(a, "FontSize", "size", a.lang.font.fontSize, b.fontSize_sizes, b.fontSize_defaultLabel, b.fontSize_style, 40)
            }
        })
    })();
    CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif";
    CKEDITOR.config.font_defaultLabel = "";
    CKEDITOR.config.font_style = {
        element: "span",
        styles: {
            "font-family": "#(family)"
        },
        overrides: [{
                element: "font",
                attributes: {
                    face: null
                }
            }
        ]
    };
    CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px";
    CKEDITOR.config.fontSize_defaultLabel = "";
    CKEDITOR.config.fontSize_style = {
        element: "span",
        styles: {
            "font-size": "#(size)"
        },
        overrides: [{
                element: "font",
                attributes: {
                    size: null
                }
            }
        ]
    };
    CKEDITOR.plugins.add("forms", {
        requires: "dialog,fakeobjects",
        onLoad: function () {
            CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n");
            CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}")
        },
        init: function (b) {
            var a = b.lang,
                e = 0,
                h = {
                    email: 1,
                    password: 1,
                    search: 1,
                    tel: 1,
                    text: 1,
                    url: 1
                }, j = {
                    checkbox: "input[type,name,checked]",
                    radio: "input[type,name,checked]",
                    textfield: "input[type,name,value,size,maxlength]",
                    textarea: "textarea[cols,rows,name]",
                    select: "select[name,size,multiple]; option[value,selected]",
                    button: "input[type,name,value]",
                    form: "form[action,name,id,enctype,target,method]",
                    hiddenfield: "input[type,name,value]",
                    imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
                }, k = {
                    checkbox: "input",
                    radio: "input",
                    textfield: "input",
                    textarea: "textarea",
                    select: "select",
                    button: "input",
                    form: "form",
                    hiddenfield: "input",
                    imagebutton: "input"
                }, d = function (g, c, h) {
                    var d = {
                        allowedContent: j[c],
                        requiredContent: k[c]
                    };
                    "form" == c && (d.context = "form");
                    b.addCommand(c, new CKEDITOR.dialogCommand(c, d));
                    b.ui.addButton && b.ui.addButton(g, {
                        label: a.common[g.charAt(0).toLowerCase() + g.slice(1)],
                        command: c,
                        toolbar: "forms," + (e += 10)
                    });
                    CKEDITOR.dialog.add(c, h)
                }, f = this.path + "dialogs/";
            !b.blockless && d("Form", "form", f + "form.js");
            d("Checkbox", "checkbox", f + "checkbox.js");
            d("Radio", "radio", f + "radio.js");
            d("TextField", "textfield",
            f + "textfield.js");
            d("Textarea", "textarea", f + "textarea.js");
            d("Select", "select", f + "select.js");
            d("Button", "button", f + "button.js");
            var i = CKEDITOR.plugins.get("image");
            i && d("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js");
            d("HiddenField", "hiddenfield", f + "hiddenfield.js");
            b.addMenuItems && (d = {
                checkbox: {
                    label: a.forms.checkboxAndRadio.checkboxTitle,
                    command: "checkbox",
                    group: "checkbox"
                },
                radio: {
                    label: a.forms.checkboxAndRadio.radioTitle,
                    command: "radio",
                    group: "radio"
                },
                textfield: {
                    label: a.forms.textfield.title,
                    command: "textfield",
                    group: "textfield"
                },
                hiddenfield: {
                    label: a.forms.hidden.title,
                    command: "hiddenfield",
                    group: "hiddenfield"
                },
                imagebutton: {
                    label: a.image.titleButton,
                    command: "imagebutton",
                    group: "imagebutton"
                },
                button: {
                    label: a.forms.button.title,
                    command: "button",
                    group: "button"
                },
                select: {
                    label: a.forms.select.title,
                    command: "select",
                    group: "select"
                },
                textarea: {
                    label: a.forms.textarea.title,
                    command: "textarea",
                    group: "textarea"
                }
            }, !b.blockless && (d.form = {
                label: a.forms.form.menu,
                command: "form",
                group: "form"
            }), b.addMenuItems(d));
            b.contextMenu && (!b.blockless && b.contextMenu.addListener(function (g, c, a) {
                if ((g = a.contains("form", 1)) && !g.isReadOnly()) return {
                        form: CKEDITOR.TRISTATE_OFF
                }
            }), b.contextMenu.addListener(function (a) {
                if (a && !a.isReadOnly()) {
                    var c = a.getName();
                    if (c == "select") return {
                            select: CKEDITOR.TRISTATE_OFF
                    };
                    if (c == "textarea") return {
                            textarea: CKEDITOR.TRISTATE_OFF
                    };
                    if (c == "input") {
                        var b = a.getAttribute("type") || "text";
                        switch (b) {
                            case "button":
                            case "submit":
                            case "reset":
                                return {
                                    button: CKEDITOR.TRISTATE_OFF
                                };
                            case "checkbox":
                                return {
                                    checkbox: CKEDITOR.TRISTATE_OFF
                                };
                            case "radio":
                                return {
                                    radio: CKEDITOR.TRISTATE_OFF
                                };
                            case "image":
                                return i ? {
                                    imagebutton: CKEDITOR.TRISTATE_OFF
                                } : null
                        }
                        if (h[b]) return {
                                textfield: CKEDITOR.TRISTATE_OFF
                        }
                    }
                    if (c == "img" && a.data("cke-real-element-type") == "hiddenfield") return {
                            hiddenfield: CKEDITOR.TRISTATE_OFF
                    }
                }
            }));
            b.on("doubleclick", function (a) {
                var c = a.data.element;
                if (!b.blockless && c.is("form")) a.data.dialog = "form";
                else if (c.is("select")) a.data.dialog = "select";
                else if (c.is("textarea")) a.data.dialog = "textarea";
                else if (c.is("img") && c.data("cke-real-element-type") ==
                    "hiddenfield") a.data.dialog = "hiddenfield";
                else if (c.is("input")) {
                    c = c.getAttribute("type") || "text";
                    switch (c) {
                        case "button":
                        case "submit":
                        case "reset":
                            a.data.dialog = "button";
                            break;
                        case "checkbox":
                            a.data.dialog = "checkbox";
                            break;
                        case "radio":
                            a.data.dialog = "radio";
                            break;
                        case "image":
                            a.data.dialog = "imagebutton"
                    }
                    if (h[c]) a.data.dialog = "textfield"
                }
            })
        },
        afterInit: function (b) {
            var a = b.dataProcessor,
                e = a && a.htmlFilter,
                a = a && a.dataFilter;
            CKEDITOR.env.ie && e && e.addRules({
                elements: {
                    input: function (a) {
                        var a = a.attributes,
                            b = a.type;
                        b || (a.type = "text");
                        ("checkbox" == b || "radio" == b) && "on" == a.value && delete a.value
                    }
                }
            });
            a && a.addRules({
                elements: {
                    input: function (a) {
                        if ("hidden" == a.attributes.type) return b.createFakeParserElement(a, "cke_hidden", "hiddenfield")
                    }
                }
            })
        }
    });
    CKEDITOR.env.ie && (CKEDITOR.dom.element.prototype.hasAttribute = CKEDITOR.tools.override(CKEDITOR.dom.element.prototype.hasAttribute, function (b) {
        return function (a) {
            this.$.attributes.getNamedItem(a);
            if ("input" == this.getName()) switch (a) {
                    case "class":
                        return 0 < this.$.className.length;
                    case "checked":
                        return !!this.$.checked;
                    case "value":
                        var e = this.getAttribute("type");
                        return "checkbox" == e || "radio" == e ? "on" != this.$.value : this.$.value
            }
            return b.apply(this, arguments)
        }
    }));
    CKEDITOR.plugins.add("format", {
        requires: "richcombo",
        init: function (a) {
            if (!a.blockless) {
                for (var g = a.config, c = a.lang.format, k = g.format_tags.split(";"), d = {}, l = 0, m = [], h = 0; h < k.length; h++) {
                    var i = k[h],
                        j = new CKEDITOR.style(g["format_" + i]);
                    if (!a.filter.customConfig || a.filter.check(j)) l++, d[i] = j, d[i]._.enterMode = a.config.enterMode, m.push(j)
                }
                0 !== l && a.ui.addRichCombo("Format", {
                    label: c.label,
                    title: c.panelTitle,
                    toolbar: "styles,20",
                    allowedContent: m,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(g.contentsCss),
                        multiSelect: !1,
                        attributes: {
                            "aria-label": c.panelTitle
                        }
                    },
                    init: function () {
                        this.startGroup(c.panelTitle);
                        for (var a in d) {
                            var e = c["tag_" + a];
                            this.add(a, d[a].buildPreview(e), e)
                        }
                    },
                    onClick: function (b) {
                        a.focus();
                        a.fire("saveSnapshot");
                        var b = d[b],
                            e = a.elementPath();
                        a[b.checkActive(e) ? "removeStyle" : "applyStyle"](b);
                        setTimeout(function () {
                            a.fire("saveSnapshot")
                        }, 0)
                    },
                    onRender: function () {
                        a.on("selectionChange", function (b) {
                            var e = this.getValue(),
                                b = b.data.path,
                                c = !a.readOnly && b.isContextFor("p");
                            this[c ? "enable" : "disable"]();
                            if (c) {
                                for (var f in d) if (d[f].checkActive(b)) {
                                        f != e && this.setValue(f, a.lang.format["tag_" + f]);
                                        return
                                    }
                                this.setValue("")
                            }
                        }, this)
                    }
                })
            }
        }
    });
    CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div";
    CKEDITOR.config.format_p = {
        element: "p"
    };
    CKEDITOR.config.format_div = {
        element: "div"
    };
    CKEDITOR.config.format_pre = {
        element: "pre"
    };
    CKEDITOR.config.format_address = {
        element: "address"
    };
    CKEDITOR.config.format_h1 = {
        element: "h1"
    };
    CKEDITOR.config.format_h2 = {
        element: "h2"
    };
    CKEDITOR.config.format_h3 = {
        element: "h3"
    };
    CKEDITOR.config.format_h4 = {
        element: "h4"
    };
    CKEDITOR.config.format_h5 = {
        element: "h5"
    };
    CKEDITOR.config.format_h6 = {
        element: "h6"
    };
    CKEDITOR.plugins.add("htmlwriter", {
        init: function (b) {
            var a = new CKEDITOR.htmlWriter;
            a.forceSimpleAmpersand = b.config.forceSimpleAmpersand;
            a.indentationChars = b.config.dataIndentationChars || "\t";
            b.dataProcessor.writer = a
        }
    });
    CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter,
        $: function () {
            this.base();
            this.indentationChars = "\t";
            this.selfClosingEnd = " />";
            this.lineBreakChars = "\n";
            this.sortAttributes = 1;
            this._.indent = 0;
            this._.indentation = "";
            this._.inPre = 0;
            this._.rules = {};
            var b = CKEDITOR.dtd,
                a;
            for (a in CKEDITOR.tools.extend({}, b.$nonBodyContent, b.$block, b.$listItem, b.$tableContent)) this.setRules(a, {
                    indent: !b[a]["#"],
                    breakBeforeOpen: 1,
                    breakBeforeClose: !b[a]["#"],
                    breakAfterClose: 1,
                    needsSpace: a in b.$block && !(a in {
                        li: 1,
                        dt: 1,
                        dd: 1
                    })
                });
            this.setRules("br", {
                breakAfterOpen: 1
            });
            this.setRules("title", {
                indent: 0,
                breakAfterOpen: 0
            });
            this.setRules("style", {
                indent: 0,
                breakBeforeClose: 1
            });
            this.setRules("pre", {
                breakAfterOpen: 1,
                indent: 0
            })
        },
        proto: {
            openTag: function (b) {
                var a = this._.rules[b];
                this._.afterCloser && (a && a.needsSpace && this._.needsSpace) && this._.output.push("\n");
                this._.indent ? this.indentation() : a && a.breakBeforeOpen && (this.lineBreak(), this.indentation());
                this._.output.push("<", b);
                this._.afterCloser = 0
            },
            openTagClose: function (b, a) {
                var c = this._.rules[b];
                a ? (this._.output.push(this.selfClosingEnd), c && c.breakAfterClose && (this._.needsSpace = c.needsSpace)) : (this._.output.push(">"), c && c.indent && (this._.indentation += this.indentationChars));
                c && c.breakAfterOpen && this.lineBreak();
                "pre" == b && (this._.inPre = 1)
            },
            attribute: function (b, a) {
                "string" == typeof a && (this.forceSimpleAmpersand && (a = a.replace(/&amp;/g, "&")), a = CKEDITOR.tools.htmlEncodeAttr(a));
                this._.output.push(" ", b, '="', a, '"')
            },
            closeTag: function (b) {
                var a = this._.rules[b];
                a && a.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length));
                this._.indent ? this.indentation() : a && a.breakBeforeClose && (this.lineBreak(), this.indentation());
                this._.output.push("</", b, ">");
                "pre" == b && (this._.inPre = 0);
                a && a.breakAfterClose && (this.lineBreak(), this._.needsSpace = a.needsSpace);
                this._.afterCloser = 1
            },
            text: function (b) {
                this._.indent && (this.indentation(), !this._.inPre && (b = CKEDITOR.tools.ltrim(b)));
                this._.output.push(b)
            },
            comment: function (b) {
                this._.indent && this.indentation();
                this._.output.push("<\!--", b, "--\>")
            },
            lineBreak: function () {
                !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars);
                this._.indent = 1
            },
            indentation: function () {
                !this._.inPre && this._.indentation && this._.output.push(this._.indentation);
                this._.indent = 0
            },
            reset: function () {
                this._.output = [];
                this._.indent = 0;
                this._.indentation = "";
                this._.afterCloser = 0;
                this._.inPre = 0
            },
            setRules: function (b, a) {
                var c = this._.rules[b];
                c ? CKEDITOR.tools.extend(c, a, !0) : this._.rules[b] = a
            }
        }
    });
    (function () {
        var b = {
            canUndo: !1,
            exec: function (a) {
                var b = a.document.createElement("hr");
                a.insertElement(b)
            },
            allowedContent: "hr",
            requiredContent: "hr"
        };
        CKEDITOR.plugins.add("horizontalrule", {
            init: function (a) {
                a.blockless || (a.addCommand("horizontalrule", b), a.ui.addButton && a.ui.addButton("HorizontalRule", {
                    label: a.lang.horizontalrule.toolbar,
                    command: "horizontalrule",
                    toolbar: "insert,40"
                }))
            }
        })
    })();
    (function () {
        CKEDITOR.plugins.add("iframe", {
            requires: "dialog,fakeobjects",
            onLoad: function () {
                CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
            },
            init: function (a) {
                var b = a.lang.iframe,
                    c = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
                a.plugins.dialogadvtab && (c += ";iframe" + a.plugins.dialogadvtab.allowedContent({
                    id: 1,
                    classes: 1,
                    styles: 1
                }));
                CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js");
                a.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", {
                    allowedContent: c,
                    requiredContent: "iframe"
                }));
                a.ui.addButton && a.ui.addButton("Iframe", {
                    label: b.toolbar,
                    command: "iframe",
                    toolbar: "insert,80"
                });
                a.on("doubleclick", function (a) {
                    var b = a.data.element;
                    b.is("img") && "iframe" == b.data("cke-real-element-type") && (a.data.dialog = "iframe")
                });
                a.addMenuItems && a.addMenuItems({
                    iframe: {
                        label: b.title,
                        command: "iframe",
                        group: "image"
                    }
                });
                a.contextMenu && a.contextMenu.addListener(function (a) {
                    if (a && a.is("img") && "iframe" == a.data("cke-real-element-type")) return {
                            iframe: CKEDITOR.TRISTATE_OFF
                    }
                })
            },
            afterInit: function (a) {
                var b = a.dataProcessor;
                (b = b && b.dataFilter) && b.addRules({
                    elements: {
                        iframe: function (b) {
                            return a.createFakeParserElement(b, "cke_iframe", "iframe", !0)
                        }
                    }
                })
            }
        })
    })();
    (function () {
        function n(a) {
            var c = this.editor,
                d = a.document,
                b = d.body;
            (a = d.getElementById("cke_actscrpt")) && a.parentNode.removeChild(a);
            (a = d.getElementById("cke_shimscrpt")) && a.parentNode.removeChild(a);
            CKEDITOR.env.gecko && (b.contentEditable = !1, 2E4 > CKEDITOR.env.version && (b.innerHTML = b.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, ""), setTimeout(function () {
                var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(d));
                a.setStart(new CKEDITOR.dom.node(b), 0);
                c.getSelection().selectRanges([a])
            }, 0)));
            b.contentEditable = !0;
            CKEDITOR.env.ie && (b.hideFocus = !0, b.disabled = !0, b.removeAttribute("disabled"));
            delete this._.isLoadingData;
            this.$ = b;
            d = new CKEDITOR.dom.document(d);
            this.setup();
            CKEDITOR.env.ie && (d.getDocumentElement().addClass(d.$.compatMode), c.config.enterMode != CKEDITOR.ENTER_P && d.on("selectionchange", function () {
                var a = d.getBody(),
                    b = c.getSelection(),
                    e = b && b.getRanges()[0];
                e && (a.getHtml().match(/^<p>&nbsp;<\/p>$/i) && e.startContainer.equals(a)) && setTimeout(function () {
                    e = c.getSelection().getRanges()[0];
                    if (!e.startContainer.equals("body")) {
                        a.getFirst().remove(1);
                        e.moveToElementEditEnd(a);
                        e.select()
                    }
                }, 0)
            }));
            CKEDITOR.env.gecko && CKEDITOR.tools.setTimeout(o, 0, this, c);
            try {
                c.document.$.execCommand("2D-position", !1, !0)
            } catch (e) {}
            try {
                c.document.$.execCommand("enableInlineTableEditing", !1, !c.config.disableNativeTableHandles)
            } catch (f) {}
            if (c.config.disableObjectResizing) try {
                    this.getDocument().$.execCommand("enableObjectResizing", !1, !1)
            } catch (g) {
                this.attachListener(this, CKEDITOR.env.ie ? "resizestart" : "resize", function (a) {
                    a.data.preventDefault()
                })
            }(CKEDITOR.env.gecko ||
                CKEDITOR.env.ie && "CSS1Compat" == c.document.$.compatMode) && this.attachListener(this, "keydown", function (a) {
                var b = a.data.getKeystroke();
                if (b == 33 || b == 34) if (CKEDITOR.env.ie) setTimeout(function () {
                            c.getSelection().scrollIntoView()
                        }, 0);
                    else if (c.window.$.innerHeight > this.$.offsetHeight) {
                    var d = c.createRange();
                    d[b == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                    d.select();
                    a.data.preventDefault()
                }
            });
            CKEDITOR.env.ie && this.attachListener(d, "blur", function () {
                try {
                    d.$.selection.empty()
                } catch (a) {}
            });
            c.document.getElementsByTag("title").getItem(0).data("cke-title",
            c.document.$.title);
            CKEDITOR.env.ie && (c.document.$.title = this._.docTitle);
            CKEDITOR.tools.setTimeout(function () {
                c.fire("contentDom");
                if (this._.isPendingFocus) {
                    c.focus();
                    this._.isPendingFocus = false
                }
                setTimeout(function () {
                    c.fire("dataReady")
                }, 0);
                CKEDITOR.env.ie && setTimeout(function () {
                    if (c.document) {
                        var a = c.document.$.body;
                        a.runtimeStyle.marginBottom = "0px";
                        a.runtimeStyle.marginBottom = ""
                    }
                }, 1E3)
            }, 0, this)
        }
        function p(a) {
            a.checkDirty() || setTimeout(function () {
                a.resetDirty()
            }, 0)
        }
        function o(a) {
            if (!a.readOnly) {
                var c =
                    a.window,
                    d = a.document,
                    b = d.getBody(),
                    e = b.getFirst(),
                    f = b.getChildren().count();
                if (!f || 1 == f && e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("_moz_editor_bogus_node")) {
                    p(a);
                    var e = CKEDITOR.document,
                        g = e.getDocumentElement(),
                        h = g.$.scrollTop,
                        i = g.$.scrollLeft,
                        j = d.$.createEvent("KeyEvents");
                    j.initKeyEvent("keypress", !0, !0, c.$, !1, !1, !1, !1, 0, 32);
                    d.$.dispatchEvent(j);
                    (h != g.$.scrollTop || i != g.$.scrollLeft) && e.getWindow().$.scrollTo(i, h);
                    f && b.getFirst().remove();
                    d.getBody().appendBogus();
                    a = a.createRange();
                    a.setStartAt(b,
                    CKEDITOR.POSITION_AFTER_START);
                    a.select()
                }
            }
        }
        function q() {
            var a = [];
            if (8 <= CKEDITOR.document.$.documentMode) {
                a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                var c = [],
                    d;
                for (d in CKEDITOR.dtd.$removeEmpty) c.push("html.CSS1Compat " + d + "[contenteditable=false]");
                a.push(c.join(",") + "{display:inline-block}")
            } else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
            a.push("html{cursor:text;*cursor:auto}");
            a.push("img,input,textarea{cursor:default}");
            return a.join("\n")
        }
        CKEDITOR.plugins.add("wysiwygarea", {
            init: function (a) {
                a.config.fullPage && a.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                });
                a.addMode("wysiwyg", function (c) {
                    function d(d) {
                        d && d.removeListener();
                        a.editable(new k(a, b.$.contentWindow.document.body));
                        a.setData(a.getData(1), c)
                    }
                    var b = CKEDITOR.document.createElement("iframe");
                    b.setStyles({
                        width: "100%",
                        height: "100%"
                    });
                    b.addClass("cke_wysiwyg_frame cke_reset");
                    var e = a.ui.space("contents");
                    e.append(b);
                    var f = "document.open();" + (l ? 'document.domain="' + document.domain + '";' : "") + "document.close();",
                        f = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(f) + "}())" : "",
                        g = CKEDITOR.env.ie || CKEDITOR.env.gecko;
                    if (g) b.on("load", d);
                    var h = [a.lang.editor, a.name].join(),
                        i = a.lang.common.editorHelp;
                    CKEDITOR.env.ie && (h += ", " + i);
                    var j = CKEDITOR.tools.getNextId(),
                        m = CKEDITOR.dom.element.createFromHtml('<span id="' + j + '" class="cke_voice_label">' +
                            i + "</span>");
                    e.append(m, 1);
                    a.on("beforeModeUnload", function (a) {
                        a.removeListener();
                        m.remove()
                    });
                    b.setAttributes({
                        frameBorder: 0,
                        "aria-describedby": j,
                        title: h,
                        src: f,
                        tabIndex: a.tabIndex,
                        allowTransparency: "true"
                    });
                    !g && d();
                    CKEDITOR.env.webkit && (f = function () {
                        e.setStyle("width", "100%");
                        b.hide();
                        b.setSize("width", e.getSize("width"));
                        e.removeStyle("width");
                        b.show()
                    }, b.setCustomData("onResize", f), CKEDITOR.document.getWindow().on("resize", f));
                    a.fire("ariaWidget", b)
                })
            }
        });
        var l = CKEDITOR.env.isCustomDomain(),
            k = CKEDITOR.tools.createClass({
                $: function (a) {
                    this.base.apply(this,
                    arguments);
                    this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (a) {
                        CKEDITOR.tools.setTimeout(n, 0, this, a)
                    }, this);
                    this._.docTitle = this.getWindow().getFrame().getAttribute("title")
                },
                base: CKEDITOR.editable,
                proto: {
                    setData: function (a, c) {
                        var d = this.editor;
                        if (c) this.setHtml(a);
                        else {
                            this._.isLoadingData = !0;
                            d._.dataStore = {
                                id: 1
                            };
                            var b = d.config,
                                e = b.fullPage,
                                f = b.docType,
                                g = CKEDITOR.tools.buildStyleHtml(q()).replace(/<style>/, '<style data-cke-temp="1">');
                            e || (g += CKEDITOR.tools.buildStyleHtml(d.config.contentsCss) + CKEDITOR.tools.buildScriptHtml(d.config.contentsJs));
                            var h = b.baseHref ? '<base href="' + b.baseHref + '" data-cke-temp="1" />' : "";
                            e && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) {
                                d.docType = f = a;
                                return ""
                            }).replace(/<\?xml\s[^\?]*\?>/i, function (a) {
                                d.xmlDeclaration = a;
                                return ""
                            }));
                            d.dataProcessor && (a = d.dataProcessor.toHtml(a));
                            e ? (/<body[\s|>]/.test(a) || (a = "<body>" + a), /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) : a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>"),
                            h && (a = a.replace(/<head>/, "$&" + h)), a = a.replace(/<\/head\s*>/, g + "$&"), a = f + a) : a = b.docType + '<html dir="' + b.contentsLangDirection + '" lang="' + (b.contentsLanguage || d.langCode) + '"><head><title>' + this._.docTitle + "</title>" + h + g + "</head><body" + (b.bodyId ? ' id="' + b.bodyId + '"' : "") + (b.bodyClass ? ' class="' + b.bodyClass + '"' : "") + ">" + a + "</body></html>";
                            CKEDITOR.env.gecko && (a = a.replace(/<body/, '<body contenteditable="true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$&<\!-- cke-content-start --\>")));
                            b = '<script id="cke_actscrpt" type="text/javascript"' +
                                (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">" + (l ? 'document.domain="' + document.domain + '";' : "") + "var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>";
                            CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (b += '<script id="cke_shimscrpt">(function(){var e="abbr,article,aside,audio,bdi,canvas,data,datalist,details,figcaption,figure,footer,header,hgroup,mark,meter,nav,output,progress,section,summary,time,video".split(","),i=e.length;while(i--){document.createElement(e[i])}})()<\/script>');
                            a = a.replace(/(?=\s*<\/(:?head)>)/, b);
                            this.clearCustomData();
                            this.clearListeners();
                            d.fire("contentDomUnload");
                            var i = this.getDocument();
                            try {
                                i.write(a)
                            } catch (j) {
                                setTimeout(function () {
                                    i.write(a)
                                }, 0)
                            }
                        }
                    },
                    getData: function (a) {
                        if (a) return this.getHtml();
                        var a = this.editor,
                            c = a.config.fullPage,
                            d = c && a.docType,
                            b = c && a.xmlDeclaration,
                            e = this.getDocument(),
                            c = c ? e.getDocumentElement().getOuterHtml() : e.getBody().getHtml();
                        CKEDITOR.env.gecko && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                        a.dataProcessor && (c = a.dataProcessor.toDataFormat(c));
                        b && (c = b + "\n" + c);
                        d && (c = d + "\n" + c);
                        return c
                    },
                    focus: function () {
                        this._.isLoadingData ? this._.isPendingFocus = !0 : k.baseProto.focus.call(this)
                    },
                    detach: function () {
                        var a = this.editor,
                            c = a.document,
                            d = a.window.getFrame();
                        k.baseProto.detach.call(this);
                        this.clearCustomData();
                        c.getDocumentElement().clearCustomData();
                        if (d) d.clearCustomData();
                        CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                        d && (c = d.removeCustomData("onResize")) && c.removeListener();
                        a.fire("contentDomUnload");
                        if (d) d.remove()
                    }
                }
            })
    })();
    CKEDITOR.config.disableObjectResizing = !1;
    CKEDITOR.config.disableNativeTableHandles = !0;
    CKEDITOR.config.disableNativeSpellChecker = !0;
    CKEDITOR.config.contentsCss = CKEDITOR.basePath + "contents.css";
    (function () {
        function e(b, a) {
            a || (a = b.getSelection().getSelectedElement());
            if (a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly()) return a
        }
        function f(b) {
            var a = b.getStyle("float");
            if ("inherit" == a || "none" == a) a = 0;
            a || (a = b.getAttribute("align"));
            return a
        }
        CKEDITOR.plugins.add("image", {
            requires: "dialog",
            init: function (b) {
                CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
                b.addCommand("image", new CKEDITOR.dialogCommand("image", {
                    allowedContent: a,
                    requiredContent: "img[alt,src]",
                    contentTransformations: [
                        ["img{width}: sizeToStyle", "img[width]: sizeToAttribute"],
                        ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]
                    ]
                }));
                b.ui.addButton && b.ui.addButton("Image", {
                    label: b.lang.common.image,
                    command: "image",
                    toolbar: "insert,10"
                });
                b.on("doubleclick", function (a) {
                    var b =
                        a.data.element;
                    b.is("img") && (!b.data("cke-realelement") && !b.isReadOnly()) && (a.data.dialog = "image")
                });
                b.addMenuItems && b.addMenuItems({
                    image: {
                        label: b.lang.image.menu,
                        command: "image",
                        group: "image"
                    }
                });
                b.contextMenu && b.contextMenu.addListener(function (a) {
                    if (e(b, a)) return {
                            image: CKEDITOR.TRISTATE_OFF
                    }
                })
            },
            afterInit: function (b) {
                function a(a) {
                    var d = b.getCommand("justify" + a);
                    if (d) {
                        if ("left" == a || "right" == a) d.on("exec", function (d) {
                                var c = e(b),
                                    g;
                                c && (g = f(c), g == a ? (c.removeStyle("float"), a == f(c) && c.removeAttribute("align")) :
                                    c.setStyle("float", a), d.cancel())
                            });
                        d.on("refresh", function (d) {
                            var c = e(b);
                            c && (c = f(c), this.setState(c == a ? CKEDITOR.TRISTATE_ON : "right" == a || "left" == a ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), d.cancel())
                        })
                    }
                }
                a("left");
                a("right");
                a("center");
                a("block")
            }
        })
    })();
    CKEDITOR.config.image_removeLinkByEmptyURL = !0;
    CKEDITOR.plugins.add("smiley", {
        requires: "dialog",
        init: function (a) {
            a.config.smiley_path = a.config.smiley_path || this.path + "images/";
            a.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", {
                allowedContent: "img[alt,height,!src,title,width]",
                requiredContent: "img"
            }));
            a.ui.addButton && a.ui.addButton("Smiley", {
                label: a.lang.smiley.toolbar,
                command: "smiley",
                toolbar: "insert,50"
            });
            CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js")
        }
    });
    CKEDITOR.config.smiley_images = "regular_smile.gif sad_smile.gif wink_smile.gif teeth_smile.gif confused_smile.gif tongue_smile.gif embarrassed_smile.gif omg_smile.gif whatchutalkingabout_smile.gif angry_smile.gif angel_smile.gif shades_smile.gif devil_smile.gif cry_smile.gif lightbulb.gif thumbs_down.gif thumbs_up.gif heart.gif broken_heart.gif kiss.gif envelope.gif".split(" ");
    CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";");
    (function () {
        function l(a, c) {
            var c = void 0 === c || c,
                b;
            if (c) b = a.getComputedStyle("text-align");
            else {
                for (; !a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align");) {
                    b = a.getParent();
                    if (!b) break;
                    a = b
                }
                b = a.getStyle("text-align") || a.getAttribute("align") || ""
            }
            b && (b = b.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, ""));
            !b && c && (b = "rtl" == a.getComputedStyle("direction") ? "right" : "left");
            return b
        }
        function f(a, c, b) {
            this.editor = a;
            this.name = c;
            this.value = b;
            this.context = "p";
            if (a = a.config.justifyClasses) {
                switch (b) {
                    case "left":
                        this.cssClassName =
                            a[0];
                        break;
                    case "center":
                        this.cssClassName = a[1];
                        break;
                    case "right":
                        this.cssClassName = a[2];
                        break;
                    case "justify":
                        this.cssClassName = a[3]
                }
                this.cssClassRegex = RegExp("(?:^|\\s+)(?:" + a.join("|") + ")(?=$|\\s)");
                this.requiredContent = "p(" + this.cssClassName + ")"
            } else this.requiredContent = "p{text-align}";
            this.allowedContent = {
                "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                    propertiesOnly: !0,
                    styles: this.cssClassName ? null : "text-align",
                    classes: this.cssClassName || null
                }
            }
        }
        function j(a) {
            var c = a.editor,
                b = c.createRange();
            b.setStartBefore(a.data.node);
            b.setEndAfter(a.data.node);
            for (var h = new CKEDITOR.dom.walker(b), d; d = h.next();) if (d.type == CKEDITOR.NODE_ELEMENT) if (!d.equals(a.data.node) && d.getDirection()) b.setStartAfter(d), h = new CKEDITOR.dom.walker(b);
                    else {
                        var e = c.config.justifyClasses;
                        e && (d.hasClass(e[0]) ? (d.removeClass(e[0]), d.addClass(e[2])) : d.hasClass(e[2]) && (d.removeClass(e[2]), d.addClass(e[0])));
                        e = d.getStyle("text-align");
                        "left" == e ? d.setStyle("text-align", "right") : "right" == e && d.setStyle("text-align", "left")
                    }
        }
        f.prototype = {
            exec: function (a) {
                var c = a.getSelection(),
                    b = a.config.enterMode;
                if (c) {
                    for (var h = c.createBookmarks(), d = c.getRanges(!0), e = this.cssClassName, f, g, i = a.config.useComputedState, i = void 0 === i || i, k = d.length - 1; 0 <= k; k--) {
                        f = d[k].createIterator();
                        for (f.enlargeBr = b != CKEDITOR.ENTER_BR; g = f.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" : "div");) {
                            g.removeAttribute("align");
                            g.removeStyle("text-align");
                            var j = e && (g.$.className = CKEDITOR.tools.ltrim(g.$.className.replace(this.cssClassRegex, ""))),
                                m = this.state == CKEDITOR.TRISTATE_OFF &&
                                    (!i || l(g, !0) != this.value);
                            e ? m ? g.addClass(e) : j || g.removeAttribute("class") : m && g.setStyle("text-align", this.value)
                        }
                    }
                    a.focus();
                    a.forceNextSelectionCheck();
                    c.selectBookmarks(h)
                }
            },
            refresh: function (a, c) {
                var b = c.block || c.blockLimit;
                this.setState("body" != b.getName() && l(b, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            }
        };
        CKEDITOR.plugins.add("justify", {
            init: function (a) {
                if (!a.blockless) {
                    var c = new f(a, "justifyleft", "left"),
                        b = new f(a, "justifycenter", "center"),
                        h = new f(a,
                            "justifyright", "right"),
                        d = new f(a, "justifyblock", "justify");
                    a.addCommand("justifyleft", c);
                    a.addCommand("justifycenter", b);
                    a.addCommand("justifyright", h);
                    a.addCommand("justifyblock", d);
                    a.ui.addButton && (a.ui.addButton("JustifyLeft", {
                        label: a.lang.justify.left,
                        command: "justifyleft",
                        toolbar: "align,10"
                    }), a.ui.addButton("JustifyCenter", {
                        label: a.lang.justify.center,
                        command: "justifycenter",
                        toolbar: "align,20"
                    }), a.ui.addButton("JustifyRight", {
                        label: a.lang.justify.right,
                        command: "justifyright",
                        toolbar: "align,30"
                    }),
                    a.ui.addButton("JustifyBlock", {
                        label: a.lang.justify.block,
                        command: "justifyblock",
                        toolbar: "align,40"
                    }));
                    a.on("dirChanged", j)
                }
            }
        })
    })();
    CKEDITOR.plugins.add("link", {
        requires: "dialog,fakeobjects",
        onLoad: function () {
            function b(b) {
                return d.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b)
            }
            var a = "background:url(" + CKEDITOR.getUrl(this.path + "images/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;",
                d = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + a + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.env.ie ? "a.cke_anchor_empty{display:inline-block;}" : "") + ".%2 img.cke_anchor{" +
                    a + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" : "text-bottom") + ";}";
            CKEDITOR.addCss(b("ltr") + b("rtl"))
        },
        init: function (b) {
            var a = "a[!href]";
            CKEDITOR.dialog.isTabEnabled(b, "link", "advanced") && (a = a.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)"));
            CKEDITOR.dialog.isTabEnabled(b, "link", "target") && (a = a.replace("]", ",target,onclick]"));
            b.addCommand("link", new CKEDITOR.dialogCommand("link", {
                allowedContent: a,
                requiredContent: "a[href]"
            }));
            b.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
                allowedContent: "a[!name,id]",
                requiredContent: "a[name]"
            }));
            b.addCommand("unlink", new CKEDITOR.unlinkCommand);
            b.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
            b.setKeystroke(CKEDITOR.CTRL + 76, "link");
            b.ui.addButton && (b.ui.addButton("Link", {
                label: b.lang.link.toolbar,
                command: "link",
                toolbar: "links,10"
            }), b.ui.addButton("Unlink", {
                label: b.lang.link.unlink,
                command: "unlink",
                toolbar: "links,20"
            }), b.ui.addButton("Anchor", {
                label: b.lang.link.anchor.toolbar,
                command: "anchor",
                toolbar: "links,30"
            }));
            CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
            CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
            b.on("doubleclick", function (a) {
                var c = CKEDITOR.plugins.link.getSelectedLink(b) || a.data.element;
                if (!c.isReadOnly()) if (c.is("a")) {
                        a.data.dialog = c.getAttribute("name") && (!c.getAttribute("href") || !c.getChildCount()) ? "anchor" : "link";
                        b.getSelection().selectElement(c)
                    } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, c)) a.data.dialog = "anchor"
            });
            b.addMenuItems &&
                b.addMenuItems({
                anchor: {
                    label: b.lang.link.anchor.menu,
                    command: "anchor",
                    group: "anchor",
                    order: 1
                },
                removeAnchor: {
                    label: b.lang.link.anchor.remove,
                    command: "removeAnchor",
                    group: "anchor",
                    order: 5
                },
                link: {
                    label: b.lang.link.menu,
                    command: "link",
                    group: "link",
                    order: 1
                },
                unlink: {
                    label: b.lang.link.unlink,
                    command: "unlink",
                    group: "link",
                    order: 5
                }
            });
            b.contextMenu && b.contextMenu.addListener(function (a) {
                if (!a || a.isReadOnly()) return null;
                a = CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, a);
                if (!a && !(a = CKEDITOR.plugins.link.getSelectedLink(b))) return null;
                var c = {};
                a.getAttribute("href") && a.getChildCount() && (c = {
                    link: CKEDITOR.TRISTATE_OFF,
                    unlink: CKEDITOR.TRISTATE_OFF
                });
                if (a && a.hasAttribute("name")) c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF;
                return c
            })
        },
        afterInit: function (b) {
            var a = b.dataProcessor,
                d = a && a.dataFilter,
                a = a && a.htmlFilter,
                c = b._.elementsPath && b._.elementsPath.filters;
            d && d.addRules({
                elements: {
                    a: function (a) {
                        var c = a.attributes;
                        if (!c.name) return null;
                        var d = !a.children.length;
                        if (CKEDITOR.plugins.link.synAnchorSelector) {
                            var a = d ? "cke_anchor_empty" :
                                "cke_anchor",
                                e = c["class"];
                            if (c.name && (!e || 0 > e.indexOf(a))) c["class"] = (e || "") + " " + a;
                            d && CKEDITOR.plugins.link.emptyAnchorFix && (c.contenteditable = "false", c["data-cke-editable"] = 1)
                        } else if (CKEDITOR.plugins.link.fakeAnchor && d) return b.createFakeParserElement(a, "cke_anchor", "anchor");
                        return null
                    }
                }
            });
            CKEDITOR.plugins.link.emptyAnchorFix && a && a.addRules({
                elements: {
                    a: function (a) {
                        delete a.attributes.contenteditable
                    }
                }
            });
            c && c.push(function (a, c) {
                if ("a" == c && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, a) || a.getAttribute("name") &&
                    (!a.getAttribute("href") || !a.getChildCount()))) return "anchor"
            })
        }
    });
    CKEDITOR.plugins.link = {
        getSelectedLink: function (b) {
            var a = b.getSelection(),
                d = a.getSelectedElement();
            return d && d.is("a") ? d : (a = a.getRanges(!0)[0]) ? (a.shrink(CKEDITOR.SHRINK_TEXT), b.elementPath(a.getCommonAncestor()).contains("a", 1)) : null
        },
        fakeAnchor: CKEDITOR.env.opera || CKEDITOR.env.webkit,
        synAnchorSelector: CKEDITOR.env.ie,
        emptyAnchorFix: CKEDITOR.env.ie && 8 > CKEDITOR.env.version,
        tryRestoreFakeAnchor: function (b, a) {
            if (a && a.data("cke-real-element-type") && "anchor" == a.data("cke-real-element-type")) {
                var d = b.restoreRealElement(a);
                if (d.data("cke-saved-name")) return d
            }
        }
    };
    CKEDITOR.unlinkCommand = function () {};
    CKEDITOR.unlinkCommand.prototype = {
        exec: function (b) {
            var a = new CKEDITOR.style({
                element: "a",
                type: CKEDITOR.STYLE_INLINE,
                alwaysRemoveElement: 1
            });
            b.removeStyle(a)
        },
        refresh: function (b, a) {
            var d = a.lastElement && a.lastElement.getAscendant("a", !0);
            d && "a" == d.getName() && d.getAttribute("href") && d.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
        },
        contextSensitive: 1,
        startDisabled: 1,
        requiredContent: "a[href]"
    };
    CKEDITOR.removeAnchorCommand = function () {};
    CKEDITOR.removeAnchorCommand.prototype = {
        exec: function (b) {
            var a = b.getSelection(),
                d = a.createBookmarks(),
                c;
            if (a && (c = a.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !c.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, c) : c.is("a"))) c.remove(1);
            else if (c = CKEDITOR.plugins.link.getSelectedLink(b)) c.hasAttribute("href") ? (c.removeAttributes({
                    name: 1,
                    "data-cke-saved-name": 1
                }), c.removeClass("cke_anchor")) : c.remove(1);
            a.selectBookmarks(d)
        },
        requiredContent: "a[name]"
    };
    CKEDITOR.tools.extend(CKEDITOR.config, {
        linkShowAdvancedTab: !0,
        linkShowTargetTab: !0
    });
    (function () {
        CKEDITOR.plugins.liststyle = {
            requires: "dialog,contextmenu",
            init: function (a) {
                if (!a.blockless) {
                    var b;
                    b = new CKEDITOR.dialogCommand("numberedListStyle", {
                        requiredContent: "ol",
                        allowedContent: "ol{list-style-type}[start]"
                    });
                    b = a.addCommand("numberedListStyle", b);
                    a.addFeature(b);
                    CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js");
                    b = new CKEDITOR.dialogCommand("bulletedListStyle", {
                        requiredContent: "ul",
                        allowedContent: "ul{list-style-type}"
                    });
                    b = a.addCommand("bulletedListStyle", b);
                    a.addFeature(b);
                    CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js");
                    a.addMenuGroup("list", 108);
                    a.addMenuItems({
                        numberedlist: {
                            label: a.lang.liststyle.numberedTitle,
                            group: "list",
                            command: "numberedListStyle"
                        },
                        bulletedlist: {
                            label: a.lang.liststyle.bulletedTitle,
                            group: "list",
                            command: "bulletedListStyle"
                        }
                    });
                    a.contextMenu.addListener(function (a) {
                        if (!a || a.isReadOnly()) return null;
                        for (; a;) {
                            var b = a.getName();
                            if ("ol" == b) return {
                                    numberedlist: CKEDITOR.TRISTATE_OFF
                            };
                            if ("ul" == b) return {
                                    bulletedlist: CKEDITOR.TRISTATE_OFF
                            };
                            a = a.getParent()
                        }
                        return null
                    })
                }
            }
        };
        CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle)
    })();
    (function () {
        function N(a, b, d) {
            return l(b) && l(d) && d.equals(b.getNext(function (a) {
                return !(y(a) || z(a) || o(a))
            }))
        }
        function t(a) {
            this.upper = a[0];
            this.lower = a[1];
            this.set.apply(this, a.slice(2))
        }
        function H(a) {
            var b = a.element,
                d;
            return b && l(b) ? (d = b.getAscendant(a.triggers, !0)) && !d.contains(a.editable) && !d.equals(a.editable) ? d : null : null
        }
        function ba(a, b, d) {
            m(a, b);
            m(a, d);
            a = b.size.bottom;
            d = d.size.top;
            return a && d ? 0 | (a + d) / 2 : a || d
        }
        function q(a, b, d) {
            return b = b[d ? "getPrevious" : "getNext"](function (e) {
                return e && e.type ==
                    CKEDITOR.NODE_TEXT && !y(e) || l(e) && !o(e) && !u(a, e)
            })
        }
        function ca(a) {
            var b = a.doc,
                d = A('<span contenteditable="false" style="' + I + "position:absolute;border-top:1px dashed " + a.boxColor + '"></span>', b);
            p(d, {
                attach: function () {
                    this.wrap.getParent() || this.wrap.appendTo(a.editable, !0);
                    return this
                },
                lineChildren: [p(A('<span title="' + a.editor.lang.magicline.title + '" contenteditable="false">&#8629;</span>', b), {
                        base: I + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + this.path + "images/icon.png) center no-repeat " + a.boxColor + ";cursor:pointer;" + (n.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : ""),
                        looks: ["top:-8px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px", 1), "top:-17px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px 2px 0px 0px", 1), "top:-1px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "0px 0px 2px 2px", 1)]
                    }), p(A(O, b), {
                        base: P + "left:0px;border-left-color:" + a.boxColor + ";",
                        looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"]
                    }),
                    p(A(O, b), {
                        base: P + "right:0px;border-right-color:" + a.boxColor + ";",
                        looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"]
                    })
                ],
                detach: function () {
                    this.wrap.getParent() && this.wrap.remove();
                    return this
                },
                mouseNear: function () {
                    m(a, this);
                    var e = a.holdDistance,
                        b = this.size;
                    return b && a.mouse.y > b.top - e && a.mouse.y < b.bottom + e && a.mouse.x > b.left - e && a.mouse.x < b.right + e ? !0 : !1
                },
                place: function () {
                    var e = a.view,
                        b = a.editable,
                        c = a.trigger,
                        d = c.upper,
                        i = c.lower,
                        h = d || i,
                        k = h.getParent(),
                        g = {};
                    this.trigger = c;
                    d && m(a, d, !0);
                    i && m(a, i, !0);
                    m(a, k, !0);
                    a.inInlineMode && B(a, !0);
                    k.equals(b) ? (g.left = e.scroll.x, g.right = -e.scroll.x, g.width = "") : (g.left = h.size.left - h.size.margin.left + e.scroll.x - (a.inInlineMode ? e.editable.left + e.editable.border.left : 0), g.width = h.size.outerWidth + h.size.margin.left + h.size.margin.right + e.scroll.x, g.right = "");
                    d && i ? g.top = d.size.margin.bottom === i.size.margin.top ? 0 | d.size.bottom + d.size.margin.bottom / 2 : d.size.margin.bottom < i.size.margin.top ? d.size.bottom + d.size.margin.bottom :
                        d.size.bottom + d.size.margin.bottom - i.size.margin.top : d ? i || (g.top = d.size.bottom + d.size.margin.bottom) : g.top = i.size.top - i.size.margin.top;
                    c.is(w) || g.top > e.scroll.y - 15 && g.top < e.scroll.y + 5 ? (g.top = a.inInlineMode ? 0 : e.scroll.y, this.look(w)) : c.is(x) || g.top > e.pane.bottom - 5 && g.top < e.pane.bottom + 15 ? (g.top = a.inInlineMode ? e.editable.height + e.editable.padding.top + e.editable.padding.bottom : e.pane.bottom - 1, this.look(x)) : (a.inInlineMode && (g.top -= e.editable.top + e.editable.border.top), this.look(r));
                    a.inInlineMode &&
                        (g.top--, g.top += e.editable.scroll.top, g.left += e.editable.scroll.left);
                    for (var Q in g) g[Q] = CKEDITOR.tools.cssLength(g[Q]);
                    this.setStyles(g)
                },
                look: function (a) {
                    if (this.oldLook != a) {
                        for (var d = this.lineChildren.length, c; d--;)(c = this.lineChildren[d]).setAttribute("style", c.base + c.looks[0 | a / 2]);
                        this.oldLook = a
                    }
                },
                wrap: new J("span", a.doc)
            });
            for (b = d.lineChildren.length; b--;) d.lineChildren[b].appendTo(d);
            d.look(r);
            d.appendTo(d.wrap);
            d.unselectable();
            d.lineChildren[0].on("mouseup", function (b) {
                d.detach();
                K(a, function (d) {
                    var c =
                        a.line.trigger;
                    d[c.is(C) ? "insertBefore" : "insertAfter"](c.is(C) ? c.lower : c.upper)
                }, !0);
                a.editor.focus();
                !n.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView();
                b.data.preventDefault(!0)
            });
            d.on("mousedown", function (a) {
                a.data.preventDefault(!0)
            });
            a.line = d
        }
        function K(a, b, d) {
            var e = new CKEDITOR.dom.range(a.doc),
                f = a.editor,
                c;
            n.ie && a.enterMode == CKEDITOR.ENTER_BR ? c = a.doc.createText(D) : (c = new J(a.enterBehavior, a.doc), a.enterMode != CKEDITOR.ENTER_BR && a.doc.createText(D).appendTo(c));
            d && f.fire("saveSnapshot");
            b(c);
            e.moveToPosition(c, CKEDITOR.POSITION_AFTER_START);
            f.getSelection().selectRanges([e]);
            a.hotNode = c;
            d && f.fire("saveSnapshot")
        }
        function R(a, b) {
            return {
                canUndo: !0,
                modes: {
                    wysiwyg: 1
                },
                exec: function () {
                    function d(d) {
                        var f = n.ie && 9 > n.version ? " " : D,
                            c = a.hotNode && a.hotNode.getText() == f && a.element.equals(a.hotNode) && a.lastCmdDirection === !! b;
                        K(a, function (f) {
                            c && a.hotNode && a.hotNode.remove();
                            f[b ? "insertAfter" : "insertBefore"](d);
                            f.setAttributes({
                                "data-cke-magicline-hot": 1,
                                "data-cke-magicline-dir": !! b
                            });
                            a.lastCmdDirection = !! b
                        });
                        !n.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView();
                        a.line.detach()
                    }
                    return function (e) {
                        e = e.getSelection().getStartElement();
                        if ((e = e.getAscendant(S, 1)) && !e.equals(a.editable) && !e.contains(a.editable)) {
                            a.element = e;
                            var f = q(a, e, !b),
                                c;
                            l(f) && f.is(a.triggers) && f.is(da) && (!q(a, f, !b) || (c = q(a, f, !b)) && l(c) && c.is(a.triggers)) ? d(f) : (c = H(a, e), l(c) && (q(a, c, !b) ? (e = q(a, c, !b)) && (l(e) && e.is(a.triggers)) && d(c) : d(c)))
                        }
                    }
                }()
            }
        }
        function u(a, b) {
            if (!b || !(b.type == CKEDITOR.NODE_ELEMENT && b.$)) return !1;
            var d =
                a.line;
            return d.wrap.equals(b) || d.wrap.contains(b)
        }
        function l(a) {
            return a && a.type == CKEDITOR.NODE_ELEMENT && a.$
        }
        function o(a) {
            if (!l(a)) return !1;
            var b;
            if (!(b = T(a))) l(a) ? (b = {
                    left: 1,
                    right: 1,
                    center: 1
                }, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1;
            return b
        }
        function T(a) {
            return !!{
                absolute: 1,
                fixed: 1,
                relative: 1
            }[a.getComputedStyle("position")]
        }
        function E(a, b) {
            return l(b) ? b.is(a.triggers) : null
        }
        function ea(a, b, d) {
            b = b[d ? "getLast" : "getFirst"](function (d) {
                return a.isRelevant(d) && !d.is(fa)
            });
            if (!b) return !1;
            m(a, b);
            return d ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y
        }
        function U(a) {
            var b = a.editable,
                d = a.mouse,
                e = a.view,
                f = a.triggerOffset;
            B(a);
            var c = d.y > (a.inInlineMode ? e.editable.top + e.editable.height / 2 : Math.min(e.editable.height, e.pane.height) / 2),
                b = b[c ? "getLast" : "getFirst"](function (a) {
                    return !(y(a) || z(a))
                });
            if (!b) return null;
            u(a, b) && (b = a.line.wrap[c ? "getPrevious" : "getNext"](function (a) {
                return !(y(a) || z(a))
            }));
            if (!l(b) || o(b) || !E(a, b)) return null;
            m(a, b);
            return !c && 0 <= b.size.top && 0 < d.y && d.y < b.size.top +
                f ? (a = a.inInlineMode || 0 === e.scroll.y ? w : r, new t([null, b, C, F, a])) : c && b.size.bottom <= e.pane.height && d.y > b.size.bottom - f && d.y < e.pane.height ? (a = a.inInlineMode || b.size.bottom > e.pane.height - f && b.size.bottom < e.pane.height ? x : r, new t([b, null, V, F, a])) : null
        }
        function W(a) {
            var b = a.mouse,
                d = a.view,
                e = a.triggerOffset,
                f = H(a);
            if (!f) return null;
            m(a, f);
            var e = Math.min(e, 0 | f.size.outerHeight / 2),
                c = [],
                j, i;
            if (b.y > f.size.top - 1 && b.y < f.size.top + e) i = !1;
            else if (b.y > f.size.bottom - e && b.y < f.size.bottom + 1) i = !0;
            else return null;
            if (o(f) ||
                ea(a, f, i) || f.getParent().is(X)) return null;
            var h = q(a, f, !i);
            if (h) {
                if (h && h.type == CKEDITOR.NODE_TEXT) return null;
                if (l(h)) {
                    if (o(h) || !E(a, h) || h.getParent().is(X)) return null;
                    c = [h, f][i ? "reverse" : "concat"]().concat([L, F])
                }
            } else f.equals(a.editable[i ? "getLast" : "getFirst"](a.isRelevant)) ? (B(a), i && b.y > f.size.bottom - e && b.y < d.pane.height && f.size.bottom > d.pane.height - e && f.size.bottom < d.pane.height ? j = x : 0 < b.y && b.y < f.size.top + e && (j = w)) : j = r, c = [null, f][i ? "reverse" : "concat"]().concat([i ? V : C, F, j, f.equals(a.editable[i ?
                        "getLast" : "getFirst"](a.isRelevant)) ? i ? x : w : r]);
            return 0 in c ? new t(c) : null
        }
        function M(a, b, d, e) {
            for (var f = function () {
                var d = n.ie ? b.$.currentStyle : a.win.$.getComputedStyle(b.$, "");
                return n.ie ? function (a) {
                    return d[CKEDITOR.tools.cssStyleToDomStyle(a)]
                } : function (a) {
                    return d.getPropertyValue(a)
                }
            }(), c = b.getDocumentPosition(), j = {}, i = {}, h = {}, k = {}, g = s.length; g--;) j[s[g]] = parseInt(f("border-" + s[g] + "-width"), 10) || 0, h[s[g]] = parseInt(f("padding-" + s[g]), 10) || 0, i[s[g]] = parseInt(f("margin-" + s[g]), 10) || 0;
            (!d || e) &&
                G(a, e);
            k.top = c.y - (d ? 0 : a.view.scroll.y);
            k.left = c.x - (d ? 0 : a.view.scroll.x);
            k.outerWidth = b.$.offsetWidth;
            k.outerHeight = b.$.offsetHeight;
            k.height = k.outerHeight - (h.top + h.bottom + j.top + j.bottom);
            k.width = k.outerWidth - (h.left + h.right + j.left + j.right);
            k.bottom = k.top + k.outerHeight;
            k.right = k.left + k.outerWidth;
            a.inInlineMode && (k.scroll = {
                top: b.$.scrollTop,
                left: b.$.scrollLeft
            });
            return p({
                border: j,
                padding: h,
                margin: i,
                ignoreScroll: d
            }, k, !0)
        }
        function m(a, b, d) {
            if (!l(b)) return b.size = null;
            if (b.size) {
                if (b.size.ignoreScroll ==
                    d && b.size.date > new Date - Y) return null
            } else b.size = {};
            return p(b.size, M(a, b, d), {
                date: +new Date
            }, !0)
        }
        function B(a, b) {
            a.view.editable = M(a, a.editable, b, !0)
        }
        function G(a, b) {
            a.view || (a.view = {});
            var d = a.view;
            if (b || !(d && d.date > new Date - Y)) {
                var e = a.win,
                    d = e.getScrollPosition(),
                    e = e.getViewPaneSize();
                p(a.view, {
                    scroll: {
                        x: d.x,
                        y: d.y,
                        width: a.doc.$.documentElement.scrollWidth - e.width,
                        height: a.doc.$.documentElement.scrollHeight - e.height
                    },
                    pane: {
                        width: e.width,
                        height: e.height,
                        bottom: e.height + d.y
                    },
                    date: +new Date
                }, !0)
            }
        }

        function ga(a, b, d, e) {
            for (var f = e, c = e, j = 0, i = !1, h = !1, k = a.view.pane.height, g = a.mouse; g.y + j < k && 0 < g.y - j;) {
                i || (i = b(f, e));
                h || (h = b(c, e));
                !i && 0 < g.y - j && (f = d(a, {
                    x: g.x,
                    y: g.y - j
                }));
                !h && g.y + j < k && (c = d(a, {
                    x: g.x,
                    y: g.y + j
                }));
                if (i && h) break;
                j += 2
            }
            return new t([f, c, null, null])
        }
        CKEDITOR.plugins.add("magicline", {
            init: function (a) {
                var b = {};
                b[CKEDITOR.ENTER_BR] = "br";
                b[CKEDITOR.ENTER_P] = "p";
                b[CKEDITOR.ENTER_DIV] = "div";
                var d = a.config,
                    e = d.magicline_triggerOffset || 30,
                    f = d.enterMode,
                    c = {
                        editor: a,
                        enterBehavior: b[f],
                        enterMode: f,
                        triggerOffset: e,
                        holdDistance: 0 | e * (d.magicline_holdDistance || 0.5),
                        boxColor: d.magicline_color || "#ff0000",
                        rtl: "rtl" == d.contentsLangDirection,
                        triggers: d.magicline_everywhere ? S : {
                            table: 1,
                            hr: 1,
                            div: 1,
                            ul: 1,
                            ol: 1,
                            dl: 1,
                            form: 1,
                            blockquote: 1
                        }
                    }, j, i, h;
                c.isRelevant = function (a) {
                    return l(a) && !u(c, a) && !o(a)
                };
                a.on("contentDom", function () {
                    var b = a.editable(),
                        e = a.document,
                        f = a.window;
                    p(c, {
                        editable: b,
                        inInlineMode: b.isInline(),
                        doc: e,
                        win: f
                    }, !0);
                    c.boundary = c.inInlineMode ? c.editable : c.doc.getDocumentElement();
                    b.is(v.$inline) || (c.inInlineMode && !T(b) && b.setStyles({
                        position: "relative",
                        top: null,
                        left: null
                    }), ca.call(this, c), G(c), b.attachListener(a, "beforeUndoImage", function () {
                        c.line.detach()
                    }), b.attachListener(a, "beforeGetData", function () {
                        c.line.wrap.getParent() && (c.line.detach(), a.once("getData", function () {
                            c.line.attach()
                        }, null, null, 1E3))
                    }, null, null, 0), b.attachListener(c.inInlineMode ? e : e.getWindow().getFrame(), "mouseout", function (b) {
                        if ("wysiwyg" == a.mode) if (c.inInlineMode) {
                                var d = b.data.$.clientX,
                                    b = b.data.$.clientY;
                                G(c);
                                B(c, !0);
                                var e = c.view.editable,
                                    f = c.view.scroll;
                                if (!(d > e.left - f.x && d < e.right - f.x) || !(b > e.top - f.y && b < e.bottom - f.y)) clearTimeout(h), h = null, c.line.detach()
                            } else clearTimeout(h), h = null, c.line.detach()
                    }), b.attachListener(b, "keyup", function () {
                        c.hiddenMode = 0
                    }), b.attachListener(b, "keydown", function (b) {
                        if ("wysiwyg" == a.mode) switch (b = b.data.getKeystroke(), a.getSelection().getStartElement(), b) {
                                case 2228240:
                                case 16:
                                    c.hiddenMode = 1, c.line.detach()
                        }
                    }), b.attachListener(c.inInlineMode ? b : e, "mousemove", function (b) {
                        i = !0;
                        if (!("wysiwyg" != a.mode || a.readOnly ||
                            h)) {
                            var d = {
                                x: b.data.$.clientX,
                                y: b.data.$.clientY
                            };
                            h = setTimeout(function () {
                                c.mouse = d;
                                h = c.trigger = null;
                                G(c);
                                if (i && !c.hiddenMode && a.focusManager.hasFocus && !c.line.mouseNear() && (c.element = Z(c, !0)))(c.trigger = U(c) || W(c) || $(c)) ? c.line.attach().place() : (c.trigger = null, c.line.detach()), i = !1
                            }, 30)
                        }
                    }), b.attachListener(f, "scroll", function () {
                        "wysiwyg" == a.mode && (c.line.detach(), n.webkit && (c.hiddenMode = 1, clearTimeout(j), j = setTimeout(function () {
                            c.hiddenMode = 0
                        }, 50)))
                    }), b.attachListener(f, "mousedown", function () {
                        "wysiwyg" ==
                            a.mode && (c.line.detach(), c.hiddenMode = 1)
                    }), b.attachListener(f, "mouseup", function () {
                        c.hiddenMode = 0
                    }), a.addCommand("accessPreviousSpace", R(c)), a.addCommand("accessNextSpace", R(c, !0)), a.setKeystroke([
                        [d.magicline_keystrokePrevious, "accessPreviousSpace"],
                        [d.magicline_keystrokeNext, "accessNextSpace"]
                    ]), a.on("loadSnapshot", function () {
                        for (var b = a.document.getElementsByTag(c.enterBehavior), d, e = b.count(); e--;) if ((d = b.getItem(e)).hasAttribute("data-cke-magicline-hot")) {
                                c.hotNode = d;
                                c.lastCmdDirection = "true" ===
                                    d.getAttribute("data-cke-magicline-dir") ? !0 : !1;
                                break
                            }
                    }), this.backdoor = {
                        accessFocusSpace: K,
                        boxTrigger: t,
                        isLine: u,
                        getAscendantTrigger: H,
                        getNonEmptyNeighbour: q,
                        getSize: M,
                        that: c,
                        triggerEdge: W,
                        triggerEditable: U,
                        triggerExpand: $
                    })
                }, this)
            }
        });
        var p = CKEDITOR.tools.extend,
            J = CKEDITOR.dom.element,
            A = J.createFromHtml,
            n = CKEDITOR.env,
            v = CKEDITOR.dtd,
            C = 128,
            V = 64,
            L = 32,
            F = 16,
            aa = 8,
            w = 4,
            x = 2,
            r = 1,
            D = " ",
            X = v.$listItem,
            fa = v.$tableContent,
            da = p({}, v.$nonEditable, v.$empty),
            S = v.$block,
            Y = 100,
            I = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
            P = I + "border-color:transparent;display:block;border-style:solid;",
            O = "<span>" + D + "</span>";
        t.prototype = {
            set: function (a, b, d) {
                this.properties = a + b + (d || r);
                return this
            },
            is: function (a) {
                return (this.properties & a) == a
            }
        };
        var Z = function () {
            return function (a, b, d) {
                if (!a.mouse) return null;
                var e = a.doc,
                    f = a.line.wrap,
                    d = d || a.mouse,
                    c = new CKEDITOR.dom.element(e.$.elementFromPoint(d.x, d.y));
                b && u(a, c) && (f.hide(), c = new CKEDITOR.dom.element(e.$.elementFromPoint(d.x, d.y)), f.show());
                return !c || !(c.type == CKEDITOR.NODE_ELEMENT && c.$) ||
                    n.ie && 9 > n.version && !a.boundary.equals(c) && !a.boundary.contains(c) ? null : c
            }
        }(),
            y = CKEDITOR.dom.walker.whitespaces(),
            z = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
            $ = function () {
                function a(a) {
                    var e = a.element,
                        f, c, j;
                    if (!l(e) || e.contains(a.editable)) return null;
                    j = ga(a, function (a, b) {
                        return !b.equals(a)
                    }, function (a, b) {
                        return Z(a, !0, b)
                    }, e);
                    f = j.upper;
                    c = j.lower;
                    if (N(a, f, c)) return j.set(L, aa);
                    if (f && e.contains(f)) for (; !f.getParent().equals(e);) f = f.getParent();
                    else f = e.getFirst(function (c) {
                            return b(a, c)
                        });
                    if (c && e.contains(c)) for (; !c.getParent().equals(e);) c = c.getParent();
                    else c = e.getLast(function (c) {
                            return b(a, c)
                        });
                    if (!f || !c) return null;
                    m(a, f);
                    m(a, c);
                    if (!(a.mouse.y > f.size.top && a.mouse.y < c.size.bottom)) return null;
                    for (var e = Number.MAX_VALUE, i, h, k, g; c && !c.equals(f) && (h = f.getNext(a.isRelevant));) i = Math.abs(ba(a, f, h) - a.mouse.y), i < e && (e = i, k = f, g = h), f = h, m(a, f);
                    if (!k || !g || !(a.mouse.y > k.size.top && a.mouse.y < g.size.bottom)) return null;
                    j.upper = k;
                    j.lower = g;
                    return j.set(L, aa)
                }
                function b(a, b) {
                    return !(b && b.type ==
                        CKEDITOR.NODE_TEXT || z(b) || o(b) || u(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br"))
                }
                return function (b) {
                    var e = a(b),
                        f;
                    if (f = e) {
                        f = e.upper;
                        var c = e.lower;
                        f = !f || !c || o(c) || o(f) || c.equals(f) || f.equals(c) || c.contains(f) || f.contains(c) ? !1 : E(b, f) && E(b, c) && N(b, f, c) ? !0 : !1
                    }
                    return f ? e : null
                }
            }(),
            s = ["top", "left", "right", "bottom"]
    })();
    CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 219;
    CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 221;
    (function () {
        function l(a) {
            if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return [];
            for (var e = [], f = ["style", "className"], b = 0; b < f.length; b++) {
                var d = a.$.elements.namedItem(f[b]);
                d && (d = new CKEDITOR.dom.element(d), e.push([d, d.nextSibling]), d.remove())
            }
            return e
        }
        function o(a, e) {
            if (a && !(a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) && 0 < e.length) for (var f = e.length - 1; 0 <= f; f--) {
                    var b = e[f][0],
                        d = e[f][1];
                    d ? b.insertBefore(d) : b.appendTo(a)
            }
        }
        function n(a, e) {
            var f = l(a),
                b = {}, d = a.$;
            e || (b["class"] = d.className ||
                "", d.className = "");
            b.inline = d.style.cssText || "";
            e || (d.style.cssText = "position: static; overflow: visible");
            o(f);
            return b
        }
        function p(a, e) {
            var f = l(a),
                b = a.$;
            "class" in e && (b.className = e["class"]);
            "inline" in e && (b.style.cssText = e.inline);
            o(f)
        }
        function q(a) {
            if (!a.editable().isInline()) {
                var e = CKEDITOR.instances,
                    f;
                for (f in e) {
                    var b = e[f];
                    "wysiwyg" == b.mode && !b.readOnly && (b = b.document.getBody(), b.setAttribute("contentEditable", !1), b.setAttribute("contentEditable", !0))
                }
                a.editable().hasFocus && (a.toolbox.focus(),
                a.focus())
            }
        }
        CKEDITOR.plugins.add("maximize", {
            init: function (a) {
                function e() {
                    var b = d.getViewPaneSize();
                    a.resize(b.width, b.height, null, !0)
                }
                if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var f = a.lang,
                        b = CKEDITOR.document,
                        d = b.getWindow(),
                        j, k, m, l = CKEDITOR.TRISTATE_OFF;
                    a.addCommand("maximize", {
                        modes: {
                            wysiwyg: !CKEDITOR.env.iOS,
                            source: !CKEDITOR.env.iOS
                        },
                        readOnly: 1,
                        editorFocus: !1,
                        exec: function () {
                            var h = a.container.getChild(1),
                                g = a.ui.space("contents");
                            if ("wysiwyg" == a.mode) {
                                var c = a.getSelection();
                                j = c && c.getRanges();
                                k = d.getScrollPosition()
                            } else {
                                var i = a.editable().$;
                                j = !CKEDITOR.env.ie && [i.selectionStart, i.selectionEnd];
                                k = [i.scrollLeft, i.scrollTop]
                            }
                            if (this.state == CKEDITOR.TRISTATE_OFF) {
                                d.on("resize", e);
                                m = d.getScrollPosition();
                                for (c = a.container; c = c.getParent();) c.setCustomData("maximize_saved_styles", n(c)), c.setStyle("z-index", a.config.baseFloatZIndex - 5);
                                g.setCustomData("maximize_saved_styles", n(g, !0));
                                h.setCustomData("maximize_saved_styles", n(h, !0));
                                g = {
                                    overflow: CKEDITOR.env.webkit ? "" : "hidden",
                                    width: 0,
                                    height: 0
                                };
                                b.getDocumentElement().setStyles(g);
                                !CKEDITOR.env.gecko && b.getDocumentElement().setStyle("position", "fixed");
                                (!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) && b.getBody().setStyles(g);
                                CKEDITOR.env.ie ? setTimeout(function () {
                                    d.$.scrollTo(0, 0)
                                }, 0) : d.$.scrollTo(0, 0);
                                h.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
                                h.$.offsetLeft;
                                h.setStyles({
                                    "z-index": a.config.baseFloatZIndex - 5,
                                    left: "0px",
                                    top: "0px"
                                });
                                h.addClass("cke_maximized");
                                e();
                                g = h.getDocumentPosition();
                                h.setStyles({
                                    left: -1 * g.x + "px",
                                    top: -1 * g.y + "px"
                                });
                                CKEDITOR.env.gecko && q(a)
                            } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                d.removeListener("resize", e);
                                g = [g, h];
                                for (c = 0; c < g.length; c++) p(g[c], g[c].getCustomData("maximize_saved_styles")), g[c].removeCustomData("maximize_saved_styles");
                                for (c = a.container; c = c.getParent();) p(c, c.getCustomData("maximize_saved_styles")), c.removeCustomData("maximize_saved_styles");
                                CKEDITOR.env.ie ? setTimeout(function () {
                                    d.$.scrollTo(m.x, m.y)
                                }, 0) : d.$.scrollTo(m.x, m.y);
                                h.removeClass("cke_maximized");
                                CKEDITOR.env.webkit &&
                                    (h.setStyle("display", "inline"), setTimeout(function () {
                                    h.setStyle("display", "block")
                                }, 0));
                                a.fire("resize")
                            }
                            this.toggleState();
                            if (c = this.uiItems[0]) g = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize, c = CKEDITOR.document.getById(c._.id), c.getChild(1).setHtml(g), c.setAttribute("title", g), c.setAttribute("href", 'javascript:void("' + g + '");');
                            "wysiwyg" == a.mode ? j ? (CKEDITOR.env.gecko && q(a), a.getSelection().selectRanges(j), (i = a.getSelection().getStartElement()) && i.scrollIntoView(!0)) :
                                d.$.scrollTo(k.x, k.y) : (j && (i.selectionStart = j[0], i.selectionEnd = j[1]), i.scrollLeft = k[0], i.scrollTop = k[1]);
                            j = k = null;
                            l = this.state;
                            a.fire("maximize", this.state)
                        },
                        canUndo: !1
                    });
                    a.ui.addButton && a.ui.addButton("Maximize", {
                        label: f.maximize.maximize,
                        command: "maximize",
                        toolbar: "tools,10"
                    });
                    a.on("mode", function () {
                        var b = a.getCommand("maximize");
                        b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : l)
                    }, null, null, 100)
                }
            }
        })
    })();
    CKEDITOR.plugins.add("newpage", {
        init: function (a) {
            a.addCommand("newpage", {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                exec: function (b) {
                    var a = this;
                    b.setData(b.config.newpage_html || "", function () {
                        b.focus();
                        setTimeout(function () {
                            b.fire("afterCommandExec", {
                                name: "newpage",
                                command: a
                            });
                            b.selectionChange()
                        }, 200)
                    })
                },
                async: !0
            });
            a.ui.addButton && a.ui.addButton("NewPage", {
                label: a.lang.newpage.toolbar,
                command: "newpage",
                toolbar: "document,20"
            })
        }
    });
    CKEDITOR.plugins.add("pagebreak", {
        requires: "fakeobjects",
        onLoad: function () {
            var a = ["{", "background: url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;", "clear: both;width:100%; _width:99.9%;border-top: #999999 1px dotted;border-bottom: #999999 1px dotted;padding:0;height: 5px;cursor: default;}"].join("").replace(/;/g, " !important;");
            CKEDITOR.addCss("div.cke_pagebreak" + a)
        },
        init: function (a) {
            a.blockless || (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), a.ui.addButton &&
                a.ui.addButton("PageBreak", {
                label: a.lang.pagebreak.toolbar,
                command: "pagebreak",
                toolbar: "insert,70"
            }), CKEDITOR.env.opera && a.on("contentDom", function () {
                a.document.on("click", function (b) {
                    b = b.data.getTarget();
                    b.is("div") && b.hasClass("cke_pagebreak") && a.getSelection().selectElement(b)
                })
            }))
        },
        afterInit: function (a) {
            var b = a.lang.pagebreak.alt,
                c = a.dataProcessor,
                a = c && c.dataFilter;
            (c = c && c.htmlFilter) && c.addRules({
                attributes: {
                    "class": function (a, b) {
                        var c = a.replace("cke_pagebreak", "");
                        if (c != a) {
                            var d = CKEDITOR.htmlParser.fragment.fromHtml('<span style="display: none;">&nbsp;</span>').children[0];
                            b.children.length = 0;
                            b.add(d);
                            d = b.attributes;
                            delete d["aria-label"];
                            delete d.contenteditable;
                            delete d.title
                        }
                        return c
                    }
                }
            }, 5);
            a && a.addRules({
                elements: {
                    div: function (a) {
                        var c = a.attributes,
                            e = c && c.style,
                            d = e && 1 == a.children.length && a.children[0];
                        if ((d = d && "span" == d.name && d.attributes.style) && /page-break-after\s*:\s*always/i.test(e) && /display\s*:\s*none/i.test(d)) c.contenteditable = "false", c["class"] = "cke_pagebreak", c["data-cke-display-name"] = "pagebreak", c["aria-label"] = b, c.title = b, a.children.length = 0
                    }
                }
            })
        }
    });
    CKEDITOR.plugins.pagebreakCmd = {
        exec: function (a) {
            var b = a.lang.pagebreak.alt,
                b = CKEDITOR.dom.element.createFromHtml('<div style="page-break-after: always;"contenteditable="false" title="' + b + '" aria-label="' + b + '" data-cke-display-name="pagebreak" class="cke_pagebreak"></div>', a.document);
            a.insertElement(b)
        },
        context: "div",
        allowedContent: {
            div: {
                styles: "!page-break-after"
            },
            span: {
                match: function (a) {
                    return (a = a.parent) && "div" == a.name && a.styles["page-break-after"]
                },
                styles: "display"
            }
        },
        requiredContent: "div{page-break-after}"
    };
    (function () {
        var c = {
            canUndo: !1,
            async: !0,
            exec: function (a) {
                a.getClipboardData({
                    title: a.lang.pastetext.title
                }, function (b) {
                    b && a.fire("paste", {
                        type: "text",
                        dataValue: b.dataValue
                    });
                    a.fire("afterCommandExec", {
                        name: "pastetext",
                        command: c,
                        returnValue: !! b
                    })
                })
            }
        };
        CKEDITOR.plugins.add("pastetext", {
            requires: "clipboard",
            init: function (a) {
                a.addCommand("pastetext", c);
                a.ui.addButton && a.ui.addButton("PasteText", {
                    label: a.lang.pastetext.button,
                    command: "pastetext",
                    toolbar: "clipboard,40"
                });
                if (a.config.forcePasteAsPlainText) a.on("beforePaste",

                    function (a) {
                        "html" != a.data.type && (a.data.type = "text")
                    });
                a.on("pasteState", function (b) {
                    a.getCommand("pastetext").setState(b.data)
                })
            }
        })
    })();
    (function () {
        function h(a, d, f) {
            var b = CKEDITOR.cleanWord;
            b ? f() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || d + "filter/default.js"), CKEDITOR.scriptLoader.load(a, f, null, !0));
            return !b
        }
        function i(a) {
            a.data.type = "html"
        }
        CKEDITOR.plugins.add("pastefromword", {
            requires: "clipboard",
            init: function (a) {
                var d = 0,
                    f = this.path;
                a.addCommand("pastefromword", {
                    canUndo: !1,
                    async: !0,
                    exec: function (a) {
                        var e = this;
                        d = 1;
                        a.once("beforePaste", i);
                        a.getClipboardData({
                            title: a.lang.pastefromword.title
                        }, function (c) {
                            c && a.fire("paste", {
                                type: "html",
                                dataValue: c.dataValue
                            });
                            a.fire("afterCommandExec", {
                                name: "pastefromword",
                                command: e,
                                returnValue: !! c
                            })
                        })
                    }
                });
                a.ui.addButton && a.ui.addButton("PasteFromWord", {
                    label: a.lang.pastefromword.toolbar,
                    command: "pastefromword",
                    toolbar: "clipboard,50"
                });
                a.on("pasteState", function (b) {
                    a.getCommand("pastefromword").setState(b.data)
                });
                a.on("paste", function (b) {
                    var e = b.data,
                        c = e.dataValue;
                    if (c && (d || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(c))) {
                        var g = h(a, f, function () {
                            if (g) a.fire("paste", e);
                            else if (!a.config.pasteFromWordPromptCleanup || d || confirm(a.lang.pastefromword.confirmCleanup)) e.dataValue = CKEDITOR.cleanWord(c, a)
                        });
                        g && b.cancel()
                    }
                }, null, null, 3)
            }
        })
    })();
    (function () {
        var h, j = {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                canUndo: !1,
                readOnly: 1,
                exec: function (a) {
                    var g, b = a.config,
                        e = b.baseHref ? '<base href="' + b.baseHref + '"/>' : "",
                        i = CKEDITOR.env.isCustomDomain();
                    if (b.fullPage) g = a.getData().replace(/<head>/, "$&" + e).replace(/[^>]*(?=<\/title>)/, "$& &mdash; " + a.lang.preview.preview);
                    else {
                        var b = "<body ",
                            d = a.document && a.document.getBody();
                        d && (d.getAttribute("id") && (b += 'id="' + d.getAttribute("id") + '" '), d.getAttribute("class") && (b += 'class="' + d.getAttribute("class") + '" '));
                        g = a.config.docType +
                            '<html dir="' + a.config.contentsLangDirection + '"><head>' + e + "<title>" + a.lang.preview.preview + "</title>" + CKEDITOR.tools.buildStyleHtml(a.config.contentsCss) + CKEDITOR.tools.buildScriptHtml(a.config.contentsJs) + "<style>" + a.config.style + "</style>" + "</head>" + (b + ">") + a.getData() + "</body></html>"
                    }
                    e = 640;
                    b = 420;
                    d = 80;
                    try {
                        var c = window.screen,
                            e = Math.round(0.8 * c.width),
                            b = Math.round(0.7 * c.height),
                            d = Math.round(0.1 * c.width)
                    } catch (j) {}
                    if (!a.fire("contentPreview", a = {
                        dataValue: g
                    })) return !1;
                    c = "";
                    i && (window._cke_htmlToLoad = a.dataValue, c = 'javascript:void( (function(){document.open();document.domain="' + document.domain +
                        '";document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad = null;})() )');
                    CKEDITOR.env.gecko && (window._cke_htmlToLoad = a.dataValue, c = h + "preview.html");
                    c = window.open(c, null, "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" + e + ",height=" + b + ",left=" + d);
                    if (!i && !CKEDITOR.env.gecko) {
                        var f = c.document;
                        f.open();
                        f.write(a.dataValue);
                        f.close();
                        CKEDITOR.env.webkit && setTimeout(function () {
                            f.body.innerHTML = f.body.innerHTML + ""
                        }, 0)
                    }
                    return !0
                }
            };
        CKEDITOR.plugins.add("preview", {
            init: function (a) {
                a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (h = this.path, a.addCommand("preview", j), a.ui.addButton && a.ui.addButton("Preview", {
                    label: a.lang.preview.preview,
                    command: "preview",
                    toolbar: "document,40"
                }))
            }
        })
    })();
    CKEDITOR.plugins.add("print", {
        init: function (a) {
            a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a.addCommand("print", CKEDITOR.plugins.print), a.ui.addButton && a.ui.addButton("Print", {
                label: a.lang.print.toolbar,
                command: "print",
                toolbar: "document,50"
            }))
        }
    });
    CKEDITOR.plugins.print = {
        exec: function (a) {
            CKEDITOR.env.opera || (CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand("Print"))
        },
        canUndo: !1,
        readOnly: 1,
        modes: {
            wysiwyg: !CKEDITOR.env.opera
        }
    };
    CKEDITOR.plugins.add("removeformat", {
        init: function (a) {
            a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
            a.ui.addButton && a.ui.addButton("RemoveFormat", {
                label: a.lang.removeformat.toolbar,
                command: "removeFormat",
                toolbar: "cleanup,10"
            })
        }
    });
    CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function (a) {
                    for (var h = a._.removeFormatRegex || (a._.removeFormatRegex = RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), e = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), f = CKEDITOR.plugins.removeformat.filter, k = a.getSelection().getRanges(1), l = k.createIterator(), c; c = l.getNextRange();) {
                        c.collapsed || c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                        var i = c.createBookmark(),
                            b = i.startNode,
                            j = i.endNode,
                            d = function (b) {
                                for (var c = a.elementPath(b), e = c.elements, d = 1, g;
                                (g = e[d]) && !g.equals(c.block) && !g.equals(c.blockLimit); d++) h.test(g.getName()) && f(a, g) && b.breakParent(g)
                            };
                        d(b);
                        if (j) {
                            d(j);
                            for (b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); b && !b.equals(j);) d = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), !("img" == b.getName() && b.data("cke-realelement")) && f(a, b) && (h.test(b.getName()) ? b.remove(1) : (b.removeAttributes(e), a.fire("removeFormatCleanup", b))), b = d
                        }
                        c.moveToBookmark(i)
                    }
                    a.forceNextSelectionCheck();
                    a.getSelection().selectRanges(k)
                }
            }
        },
        filter: function (a, h) {
            for (var e = a._.removeFormatFilters || [], f = 0; f < e.length; f++) if (!1 === e[f](h)) return !1;
            return !0
        }
    };
    CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) {
        this._.removeFormatFilters || (this._.removeFormatFilters = []);
        this._.removeFormatFilters.push(a)
    };
    CKEDITOR.config.removeFormatTags = "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var";
    CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign";
    (function () {
        var b = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            readOnly: 1,
            exec: function (a) {
                if (a = a.element.$.form) try {
                        a.submit()
                } catch (b) {
                    a.submit.click && a.submit.click()
                }
            }
        };
        CKEDITOR.plugins.add("save", {
            init: function (a) {
                a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a.addCommand("save", b).modes = {
                    wysiwyg: !! a.element.$.form
                }, a.ui.addButton && a.ui.addButton("Save", {
                    label: a.lang.save.toolbar,
                    command: "save",
                    toolbar: "document,10"
                }))
            }
        })
    })();
    (function () {
        CKEDITOR.plugins.add("selectall", {
            init: function (b) {
                b.addCommand("selectAll", {
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    },
                    exec: function (a) {
                        var b = a.editable();
                        if (b.is("textarea")) a = b.$, CKEDITOR.env.ie ? a.createTextRange().execCommand("SelectAll") : (a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus();
                        else {
                            if (b.is("body")) a.document.$.execCommand("SelectAll", !1, null);
                            else {
                                var c = a.createRange();
                                c.selectNodeContents(b);
                                c.select()
                            }
                            a.forceNextSelectionCheck();
                            a.selectionChange()
                        }
                    },
                    canUndo: !1
                });
                b.ui.addButton &&
                    b.ui.addButton("SelectAll", {
                    label: b.lang.selectall.toolbar,
                    command: "selectAll",
                    toolbar: "selection,10"
                })
            }
        })
    })();
    (function () {
        var d = {
            readOnly: 1,
            preserveState: !0,
            editorFocus: !1,
            exec: function (a) {
                this.toggleState();
                this.refresh(a)
            },
            refresh: function (a) {
                if (a.document) {
                    var b = this.state == CKEDITOR.TRISTATE_ON && (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE || a.focusManager.hasFocus) ? "attachClass" : "removeClass";
                    a.editable()[b]("cke_show_blocks")
                }
            }
        };
        CKEDITOR.plugins.add("showblocks", {
            onLoad: function () {
                function a(a) {
                    return ".%1.%2 p,.%1.%2 div,.%1.%2 pre,.%1.%2 address,.%1.%2 blockquote,.%1.%2 h1,.%1.%2 h2,.%1.%2 h3,.%1.%2 h4,.%1.%2 h5,.%1.%2 h6{background-position: top %3;padding-%3: 8px;}".replace(/%1/g,
                        "cke_show_blocks").replace(/%2/g, "cke_contents_" + a).replace(/%3/g, "rtl" == a ? "right" : "left")
                }
                CKEDITOR.addCss(".%2 p,.%2 div,.%2 pre,.%2 address,.%2 blockquote,.%2 h1,.%2 h2,.%2 h3,.%2 h4,.%2 h5,.%2 h6{background-repeat: no-repeat;border: 1px dotted gray;padding-top: 8px;}.%2 p{%1p.png);}.%2 div{%1div.png);}.%2 pre{%1pre.png);}.%2 address{%1address.png);}.%2 blockquote{%1blockquote.png);}.%2 h1{%1h1.png);}.%2 h2{%1h2.png);}.%2 h3{%1h3.png);}.%2 h4{%1h4.png);}.%2 h5{%1h5.png);}.%2 h6{%1h6.png);}".replace(/%1/g,
                    "background-image: url(" + CKEDITOR.getUrl(this.path) + "images/block_").replace(/%2/g, "cke_show_blocks ") + a("ltr") + a("rtl"))
            },
            init: function (a) {
                if (!a.blockless) {
                    var b = a.addCommand("showblocks", d);
                    b.canUndo = !1;
                    a.config.startupOutlineBlocks && b.setState(CKEDITOR.TRISTATE_ON);
                    a.ui.addButton && a.ui.addButton("ShowBlocks", {
                        label: a.lang.showblocks.toolbar,
                        command: "showblocks",
                        toolbar: "tools,20"
                    });
                    a.on("mode", function () {
                        b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a)
                    });
                    if (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE) {
                        var c = function () {
                            b.refresh(a)
                        };
                        a.on("focus", c);
                        a.on("blur", c)
                    }
                    a.on("contentDom", function () {
                        b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a)
                    })
                }
            }
        })
    })();
    (function () {
        var f = {
            preserveState: !0,
            editorFocus: !1,
            readOnly: 1,
            exec: function (a) {
                this.toggleState();
                this.refresh(a)
            },
            refresh: function (a) {
                if (a.document) {
                    var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
                    a.editable()[b]("cke_show_borders")
                }
            }
        };
        CKEDITOR.plugins.add("showborders", {
            modes: {
                wysiwyg: 1
            },
            onLoad: function () {
                var a;
                a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 > tr > td, .%1 table.%2 > tr > th,;.%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,;.%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,;.%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g,
                    "cke_show_border").replace(/%1/g, "cke_show_borders ");
                CKEDITOR.addCss(a)
            },
            init: function (a) {
                var b = a.addCommand("showborders", f);
                b.canUndo = !1;
                !1 !== a.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON);
                a.on("mode", function () {
                    b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a)
                }, null, null, 100);
                a.on("contentDom", function () {
                    b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a)
                });
                a.on("removeFormatCleanup", function (d) {
                    d = d.data;
                    a.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && (d.is("table") && (!d.hasAttribute("border") ||
                        0 >= parseInt(d.getAttribute("border"), 10))) && d.addClass("cke_show_border")
                })
            },
            afterInit: function (a) {
                var b = a.dataProcessor,
                    a = b && b.dataFilter,
                    b = b && b.htmlFilter;
                a && a.addRules({
                    elements: {
                        table: function (a) {
                            var a = a.attributes,
                                b = a["class"],
                                c = parseInt(a.border, 10);
                            if ((!c || 0 >= c) && (!b || -1 == b.indexOf("cke_show_border"))) a["class"] = (b || "") + " cke_show_border"
                        }
                    }
                });
                b && b.addRules({
                    elements: {
                        table: function (a) {
                            var a = a.attributes,
                                b = a["class"];
                            b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/,
                                ""))
                        }
                    }
                })
            }
        });
        CKEDITOR.on("dialogDefinition", function (a) {
            var b = a.data.name;
            if ("table" == b || "tableProperties" == b) if (a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function (a) {
                    return function (b, c) {
                        a.apply(this, arguments);
                        var e = parseInt(this.getValue(), 10);
                        c[!e || 0 >= e ? "addClass" : "removeClass"]("cke_show_border")
                    }
                }), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function (a) {
                        return function () {
                            a.apply(this,
                            arguments);
                            this.setValue(this.getValue().replace(/cke_show_border/, ""))
                        }
                    }), a.commit = CKEDITOR.tools.override(a.commit, function (a) {
                        return function (b, c) {
                            a.apply(this, arguments);
                            parseInt(c.getAttribute("border"), 10) || c.addClass("cke_show_border")
                        }
                    })
        })
    })();
    (function () {
        CKEDITOR.plugins.add("sourcearea", {
            init: function (a) {
                function d() {
                    this.hide();
                    this.setStyle("height", this.getParent().$.clientHeight + "px");
                    this.setStyle("width", this.getParent().$.clientWidth + "px");
                    this.show()
                }
                if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var e = CKEDITOR.plugins.sourcearea;
                    a.addMode("source", function (e) {
                        var b = a.ui.space("contents").getDocument().createElement("textarea");
                        b.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
                            height: "100%",
                            resize: "none",
                            outline: "none",
                            "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", a.config.sourceAreaTabSize || 4)));
                        b.setAttribute("dir", "ltr");
                        b.addClass("cke_source cke_reset cke_enable_context_menu");
                        a.ui.space("contents").append(b);
                        b = a.editable(new c(a, b));
                        var s = a.getData(1);
                        if (a.config.sourceStripper) {
                            if (typeof a.config.sourceStripper == 'string') {
                                if (a.config.sourceStripper.match(/function/)) {
                                    eval('a.config.sourceStripper = ' + a.config.sourceStripper)
                                }
                            }
                            if (typeof a.config.sourceStripper == 'function') {
                                s = a.config.sourceStripper(s);
                            } else if (typeof a.config.sourceStripper == 'string') {
                                eval(a.config.sourceStripper);
                            }
                        }
                        b.setData(s);
                        CKEDITOR.env.ie && (b.attachListener(a, "resize", d, b), b.attachListener(CKEDITOR.document.getWindow(), "resize", d, b), CKEDITOR.tools.setTimeout(d, 0, b));
                        a.fire("ariaWidget", this);
                        e()
                    });
                    a.addCommand("source", e.commands.source);
                    a.ui.addButton &&
                        a.ui.addButton("Source", {
                        label: a.lang.sourcearea.toolbar,
                        command: "source",
                        toolbar: "mode,10"
                    });
                    a.on("mode", function () {
                        a.getCommand("source").setState("source" == a.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                    })
                }
            }
        });
        var c = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable,
            proto: {
                setData: function (a) {
                    this.setValue(a);
                    this.editor.fire("dataReady")
                },
                getData: function () {
                    return this.getValue()
                },
                insertHtml: function () {},
                insertElement: function () {},
                insertText: function () {},
                setReadOnly: function (a) {
                    this[(a ? "set" :
                        "remove") + "Attribute"]("readOnly", "readonly")
                },
                detach: function () {
                    c.baseProto.detach.call(this);
                    this.clearCustomData();
                    this.remove()
                }
            }
        })
    })();
    CKEDITOR.plugins.sourcearea = {
        commands: {
            source: {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                editorFocus: !1,
                readOnly: 1,
                exec: function (c) {
                    "wysiwyg" == c.mode && c.fire("saveSnapshot");
                    c.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                    c.setMode("source" == c.mode ? "wysiwyg" : "source")
                },
                canUndo: !1
            }
        }
    };
    CKEDITOR.plugins.add("specialchar", {
        availableLangs: {
            ca: 1,
            cs: 1,
            cy: 1,
            de: 1,
            en: 1,
            eo: 1,
            et: 1,
            fa: 1,
            fi: 1,
            fr: 1,
            he: 1,
            hr: 1,
            it: 1,
            ku: 1,
            lv: 1,
            nb: 1,
            nl: 1,
            no: 1,
            pl: 1,
            "pt-br": 1,
            sk: 1,
            sv: 1,
            th: 1,
            tr: 1,
            ug: 1,
            "zh-cn": 1
        },
        requires: "dialog",
        init: function (a) {
            var c = this;
            CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
            a.addCommand("specialchar", {
                exec: function () {
                    var b = a.langCode,
                        b = c.availableLangs[b] ? b : c.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
                    CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path +
                        "dialogs/lang/" + b + ".js"), function () {
                        CKEDITOR.tools.extend(a.lang.specialchar, c.langEntries[b]);
                        a.openDialog("specialchar")
                    })
                },
                modes: {
                    wysiwyg: 1
                },
                canUndo: !1
            });
            a.ui.addButton && a.ui.addButton("SpecialChar", {
                label: a.lang.specialchar.toolbar,
                command: "specialchar",
                toolbar: "insert,50"
            })
        }
    });
    CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" ");
    CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu",
        onLoad: function () {
            var d = function (a) {
                var b = this._;
                if (b.state !== CKEDITOR.TRISTATE_DISABLED) {
                    b.previousState = b.state;
                    var c = b.menu;
                    c || (c = b.menu = new CKEDITOR.menu(a, {
                        panel: {
                            className: "cke_menu_panel",
                            attributes: {
                                "aria-label": a.lang.common.options
                            }
                        }
                    }), c.onHide = CKEDITOR.tools.bind(function () {
                        this.setState(this.modes && this.modes[a.mode] ? b.previousState : CKEDITOR.TRISTATE_DISABLED)
                    }, this), this.onMenu && c.addListener(this.onMenu));
                    b.on ? c.hide() : (this.setState(CKEDITOR.TRISTATE_ON),
                    setTimeout(function () {
                        c.show(CKEDITOR.document.getById(b.id), 4)
                    }, 0))
                }
            };
            CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button,
                $: function (a) {
                    delete a.panel;
                    this.base(a);
                    this.hasArrow = !0;
                    this.click = d
                },
                statics: {
                    handler: {
                        create: function (a) {
                            return new CKEDITOR.ui.menuButton(a)
                        }
                    }
                }
            })
        },
        beforeInit: function (d) {
            d.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler)
        }
    });
    CKEDITOR.UI_MENUBUTTON = "menubutton";
    (function () {
        function k(a, c) {
            var b = 0,
                d;
            for (d in c) if (c[d] == a) {
                    b = 1;
                    break
                }
            return b
        }
        var i = "",
            r = function () {
                function a() {
                    b.once("focus", f);
                    b.once("blur", c)
                }
                function c(b) {
                    var b = b.editor,
                        c = d.getScayt(b),
                        f = b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE;
                    c && (d.setPaused(b, !c.disabled), d.setControlId(b, c.id), c.destroy(!0), delete d.instances[b.name], f && a())
                }
                var b = this,
                    f = function () {
                        if (!("undefined" != typeof d.instances[b.name] || null != d.instances[b.name])) {
                            var a = b.config,
                                c = {};
                            c.srcNodeRef = "BODY" == b.editable().$.nodeName ?
                                b.document.getWindow().$.frameElement : b.editable().$;
                            c.assocApp = "CKEDITOR." + CKEDITOR.version + "@" + CKEDITOR.revision;
                            c.customerid = a.scayt_customerid || "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2";
                            c.customDictionaryIds = a.scayt_customDictionaryIds || "";
                            c.userDictionaryName = a.scayt_userDictionaryName || "";
                            c.sLang = a.scayt_sLang || "en_US";
                            c.onLoad = function () {
                                CKEDITOR.env.ie && 8 > CKEDITOR.env.version || this.addStyle(this.selectorCss(), "padding-bottom: 2px !important;");
                                b.editable().hasFocus && !d.isControlRestored(b) && this.focus()
                            };
                            c.onBeforeChange = function () {
                                d.getScayt(b) && !b.checkDirty() && setTimeout(function () {
                                    b.resetDirty()
                                }, 0)
                            };
                            a = window.scayt_custom_params;
                            if ("object" == typeof a) for (var f in a) c[f] = a[f];
                            d.getControlId(b) && (c.id = d.getControlId(b));
                            var o = new window.scayt(c);
                            o.afterMarkupRemove.push(function (a) {
                                (new CKEDITOR.dom.element(a, o.document)).mergeSiblings()
                            });
                            if (c = d.instances[b.name]) o.sLang = c.sLang, o.option(c.option()), o.paused = c.paused;
                            d.instances[b.name] = o;
                            try {
                                o.setDisabled(!1 ===
                                    d.isPaused(b))
                            } catch (e) {}
                            b.fire("showScaytState")
                        }
                    };
                b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a() : b.on("contentDom", f);
                b.on("contentDomUnload", function () {
                    for (var a = CKEDITOR.document.getElementsByTag("script"), b = /^dojoIoScript(\d+)$/i, c = /^https?:\/\/svc\.webspellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i, d = 0; d < a.count(); d++) {
                        var f = a.getItem(d),
                            e = f.getId(),
                            h = f.getAttribute("src");
                        e && (h && e.match(b) && h.match(c)) && f.remove()
                    }
                });
                b.on("beforeCommandExec", function (a) {
                    "source" == a.data.name && "source" ==
                        b.mode && d.markControlRestore(b)
                });
                b.on("afterCommandExec", function (a) {
                    d.isScaytEnabled(b) && "wysiwyg" == b.mode && ("undo" == a.data.name || "redo" == a.data.name) && window.setTimeout(function () {
                        d.getScayt(b).refresh()
                    }, 10)
                });
                b.on("destroy", c);
                b.on("setData", c);
                b.on("insertElement", function () {
                    var a = d.getScayt(b);
                    d.isScaytEnabled(b) && (CKEDITOR.env.ie && b.getSelection().unlock(!0), window.setTimeout(function () {
                        a.focus();
                        a.refresh()
                    }, 10))
                }, this, null, 50);
                b.on("insertHtml", function () {
                    var a = d.getScayt(b);
                    d.isScaytEnabled(b) &&
                        (CKEDITOR.env.ie && b.getSelection().unlock(!0), window.setTimeout(function () {
                        a.focus();
                        a.refresh()
                    }, 10))
                }, this, null, 50);
                b.on("scaytDialog", function (a) {
                    a.data.djConfig = window.djConfig;
                    a.data.scayt_control = d.getScayt(b);
                    a.data.tab = i;
                    a.data.scayt = window.scayt
                });
                var e = b.dataProcessor;
                (e = e && e.htmlFilter) && e.addRules({
                    elements: {
                        span: function (a) {
                            if (a.attributes["data-scayt_word"] && a.attributes["data-scaytid"]) return delete a.name, a
                        }
                    }
                });
                e = CKEDITOR.plugins.undo.Image.prototype;
                e.equals = CKEDITOR.tools.override(e.equals,

                function (a) {
                    return function (b) {
                        var c = this.contents,
                            f = b.contents,
                            e = d.getScayt(this.editor);
                        e && d.isScaytReady(this.editor) && (this.contents = e.reset(c) || "", b.contents = e.reset(f) || "");
                        e = a.apply(this, arguments);
                        this.contents = c;
                        b.contents = f;
                        return e
                    }
                });
                b.document && (b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE || b.focusManager.hasFocus) && f()
            };
        CKEDITOR.plugins.scayt = {
            engineLoaded: !1,
            instances: {},
            controlInfo: {},
            setControlInfo: function (a, c) {
                a && (a.name && "object" != typeof this.controlInfo[a.name]) && (this.controlInfo[a.name] = {});
                for (var b in c) this.controlInfo[a.name][b] = c[b]
            },
            isControlRestored: function (a) {
                return a && a.name && this.controlInfo[a.name] ? this.controlInfo[a.name].restored : !1
            },
            markControlRestore: function (a) {
                this.setControlInfo(a, {
                    restored: !0
                })
            },
            setControlId: function (a, c) {
                this.setControlInfo(a, {
                    id: c
                })
            },
            getControlId: function (a) {
                return a && a.name && this.controlInfo[a.name] && this.controlInfo[a.name].id ? this.controlInfo[a.name].id : null
            },
            setPaused: function (a, c) {
                this.setControlInfo(a, {
                    paused: c
                })
            },
            isPaused: function (a) {
                if (a &&
                    a.name && this.controlInfo[a.name]) return this.controlInfo[a.name].paused
            },
            getScayt: function (a) {
                return this.instances[a.name]
            },
            isScaytReady: function (a) {
                return !0 === this.engineLoaded && "undefined" !== typeof window.scayt && this.getScayt(a)
            },
            isScaytEnabled: function (a) {
                return (a = this.getScayt(a)) ? !1 === a.disabled : !1
            },
            getUiTabs: function (a) {
                var c = [],
                    b = a.config.scayt_uiTabs || "1,1,1",
                    b = b.split(",");
                b[3] = "1";
                for (var d = 0; 4 > d; d++) c[d] = "undefined" != typeof window.scayt && "undefined" != typeof window.scayt.uiTags ? parseInt(b[d],
                    10) && window.scayt.uiTags[d] : parseInt(b[d], 10);
                "object" == typeof a.plugins.wsc ? c.push(1) : c.push(0);
                return c
            },
            loadEngine: function (a) {
                if (CKEDITOR.env.gecko && 10900 > CKEDITOR.env.version || CKEDITOR.env.opera || CKEDITOR.env.air) return a.fire("showScaytState");
                if (!0 === this.engineLoaded) return r.apply(a);
                if (-1 == this.engineLoaded) return CKEDITOR.on("scaytReady", function () {
                        r.apply(a)
                    });
                CKEDITOR.on("scaytReady", r, a);
                CKEDITOR.on("scaytReady", function () {
                    this.engineLoaded = !0
                }, this, null, 0);
                this.engineLoaded = -1;
                var c =
                    document.location.protocol,
                    c = -1 != c.search(/https?:/) ? c : "http:",
                    c = a.config.scayt_srcUrl || c + "//svc.webspellchecker.net/scayt26/loader__base.js",
                    b = d.parseUrl(c).path + "/";
                void 0 == window.scayt ? (CKEDITOR._djScaytConfig = {
                    baseUrl: b,
                    addOnLoad: [function () {
                            CKEDITOR.fireOnce("scaytReady")
                        }
                    ],
                    isDebug: !1
                }, CKEDITOR.document.getHead().append(CKEDITOR.document.createElement("script", {
                    attributes: {
                        type: "text/javascript",
                        async: "true",
                        src: c
                    }
                }))) : CKEDITOR.fireOnce("scaytReady");
                return null
            },
            parseUrl: function (a) {
                var c;
                return a.match &&
                    (c = a.match(/(.*)[\/\\](.*?\.\w+)$/)) ? {
                    path: c[1],
                    file: c[2]
                } : a
            }
        };
        var d = CKEDITOR.plugins.scayt,
            s = function (a, c, b, d, e, k, g) {
                a.addCommand(d, e);
                a.addMenuItem(d, {
                    label: b,
                    command: d,
                    group: k,
                    order: g
                })
            }, v = {
                preserveState: !0,
                editorFocus: !1,
                canUndo: !1,
                exec: function (a) {
                    if (d.isScaytReady(a)) {
                        var c = d.isScaytEnabled(a);
                        this.setState(c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON);
                        a = d.getScayt(a);
                        a.focus();
                        a.setDisabled(c)
                    } else !a.config.scayt_autoStartup && 0 <= d.engineLoaded && (a.focus(), this.setState(CKEDITOR.TRISTATE_DISABLED),
                    d.loadEngine(a))
                }
            };
        CKEDITOR.plugins.add("scayt", {
            requires: "menubutton,dialog",
            beforeInit: function (a) {
                var c = a.config.scayt_contextMenuItemsOrder || "suggest|moresuggest|control",
                    b = "";
                if ((c = c.split("|")) && c.length) for (var d = 0; d < c.length; d++) b += "scayt_" + c[d] + (c.length != parseInt(d, 10) + 1 ? "," : "");
                a.config.menu_groups = b + "," + a.config.menu_groups
            },
            init: function (a) {
                var c = a.dataProcessor && a.dataProcessor.dataFilter,
                    b = {
                        elements: {
                            span: function (a) {
                                var b = a.attributes;
                                b && b["data-scaytid"] && delete a.name
                            }
                        }
                    };
                c && c.addRules(b);
                var f = {}, e = {}, p = a.addCommand("scaytcheck", v);
                CKEDITOR.dialog.add("scaytcheck", CKEDITOR.getUrl(this.path + "dialogs/options.js"));
                c = d.getUiTabs(a);
                a.addMenuGroup("scaytButton");
                a.addMenuGroup("scayt_suggest", -10);
                a.addMenuGroup("scayt_moresuggest", -9);
                a.addMenuGroup("scayt_control", -8);
                var b = {}, g = a.lang.scayt;
                b.scaytToggle = {
                    label: g.enable,
                    command: "scaytcheck",
                    group: "scaytButton"
                };
                1 == c[0] && (b.scaytOptions = {
                    label: g.options,
                    group: "scaytButton",
                    onClick: function () {
                        i = "options";
                        a.openDialog("scaytcheck")
                    }
                });
                1 == c[1] && (b.scaytLangs = {
                    label: g.langs,
                    group: "scaytButton",
                    onClick: function () {
                        i = "langs";
                        a.openDialog("scaytcheck")
                    }
                });
                1 == c[2] && (b.scaytDict = {
                    label: g.dictionariesTab,
                    group: "scaytButton",
                    onClick: function () {
                        i = "dictionaries";
                        a.openDialog("scaytcheck")
                    }
                });
                b.scaytAbout = {
                    label: a.lang.scayt.about,
                    group: "scaytButton",
                    onClick: function () {
                        i = "about";
                        a.openDialog("scaytcheck")
                    }
                };
                1 == c[4] && (b.scaytWSC = {
                    label: a.lang.wsc.toolbar,
                    group: "scaytButton",
                    command: "checkspell"
                });
                a.addMenuItems(b);
                a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                    label: g.title,
                    title: CKEDITOR.env.opera ? g.opera_title : g.title,
                    modes: {
                        wysiwyg: 1
                    },
                    toolbar: "spellchecker,20",
                    onRender: function () {
                        p.on("state", function () {
                            this.setState(p.state)
                        }, this)
                    },
                    onMenu: function () {
                        var b = d.isScaytEnabled(a);
                        a.getMenuItem("scaytToggle").label = g[b ? "disable" : "enable"];
                        var c = d.getUiTabs(a);
                        return {
                            scaytToggle: CKEDITOR.TRISTATE_OFF,
                            scaytOptions: b && c[0] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytLangs: b && c[1] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytDict: b && c[2] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytAbout: b && c[3] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytWSC: c[4] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                        }
                    }
                });
                a.contextMenu && a.addMenuItems && a.contextMenu.addListener(function (b, c) {
                    if (!d.isScaytEnabled(a) || c.getRanges()[0].checkReadOnly()) return null;
                    var l = d.getScayt(a),
                        q = l.getScaytNode();
                    if (!q) return null;
                    var h = l.getWord(q);
                    if (!h) return null;
                    var i = l.getLang(),
                        m = a.config.scayt_contextCommands || "all",
                        h = window.scayt.getSuggestion(h,
                        i),
                        m = m.split("|"),
                        n;
                    for (n in f) {
                        delete a._.menuItems[n];
                        delete a.commands[n]
                    }
                    for (n in e) {
                        delete a._.menuItems[n];
                        delete a.commands[n]
                    }
                    if (!h || !h.length) {
                        s(a, "no_sugg", g.noSuggestions, "scayt_no_sugg", {
                            exec: function () {}
                        }, "scayt_control", 1, true);
                        e.scayt_no_sugg = CKEDITOR.TRISTATE_OFF
                    } else {
                        f = {};
                        e = {};
                        n = a.config.scayt_moreSuggestions || "on";
                        var i = false,
                            u = a.config.scayt_maxSuggestions;
                        typeof u != "number" && (u = 5);
                        !u && (u = h.length);
                        for (var j = 0, p = h.length; j < p; j = j + 1) {
                            var t = "scayt_suggestion_" + h[j].replace(" ", "_"),
                                r = function (a, b) {
                                    return {
                                        exec: function () {
                                            l.replace(a, b)
                                        }
                                    }
                                }(q, h[j]);
                            if (j < u) {
                                s(a, "button_" + t, h[j], t, r, "scayt_suggest", j + 1);
                                e[t] = CKEDITOR.TRISTATE_OFF
                            } else if (n == "on") {
                                s(a, "button_" + t, h[j], t, r, "scayt_moresuggest", j + 1);
                                f[t] = CKEDITOR.TRISTATE_OFF;
                                i = true
                            }
                        }
                        if (i) {
                            a.addMenuItem("scayt_moresuggest", {
                                label: g.moreSuggestions,
                                group: "scayt_moresuggest",
                                order: 10,
                                getItems: function () {
                                    return f
                                }
                            });
                            e.scayt_moresuggest = CKEDITOR.TRISTATE_OFF
                        }
                    }
                    if (k("all", m) || k("ignore", m)) {
                        s(a, "ignore", g.ignore, "scayt_ignore", {
                            exec: function () {
                                l.ignore(q)
                            }
                        },
                            "scayt_control", 2);
                        e.scayt_ignore = CKEDITOR.TRISTATE_OFF
                    }
                    if (k("all", m) || k("ignoreall", m)) {
                        s(a, "ignore_all", g.ignoreAll, "scayt_ignore_all", {
                            exec: function () {
                                l.ignoreAll(q)
                            }
                        }, "scayt_control", 3);
                        e.scayt_ignore_all = CKEDITOR.TRISTATE_OFF
                    }
                    if (k("all", m) || k("add", m)) {
                        s(a, "add_word", g.addWord, "scayt_add_word", {
                            exec: function () {
                                window.scayt.addWordToUserDictionary(q)
                            }
                        }, "scayt_control", 4);
                        e.scayt_add_word = CKEDITOR.TRISTATE_OFF
                    }
                    l.fireOnContextMenu && l.fireOnContextMenu(a);
                    return e
                });
                c = function (b) {
                    b.removeListener();
                    CKEDITOR.env.opera || CKEDITOR.env.air ? p.setState(CKEDITOR.TRISTATE_DISABLED) : p.setState(d.isScaytEnabled(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                };
                a.on("showScaytState", c);
                a.on("instanceReady", c);
                if (a.config.scayt_autoStartup) a.on("instanceReady", function () {
                        d.loadEngine(a)
                    })
            },
            afterInit: function (a) {
                var c, b = function (a) {
                        if (a.hasAttribute("data-scaytid")) return !1
                    };
                a._.elementsPath && (c = a._.elementsPath.filters) && c.push(b);
                a.addRemoveFormatFilter && a.addRemoveFormatFilter(b)
            }
        })
    })();
    (function () {
        CKEDITOR.plugins.add("stylescombo", {
            requires: "richcombo",
            init: function (c) {
                var j = c.config,
                    f = c.lang.stylescombo,
                    g = {}, i = [],
                    k = [];
                c.on("stylesSet", function (b) {
                    if (b = b.data.styles) {
                        for (var a, h, d = 0, e = b.length; d < e; d++) if (a = b[d], !(c.blockless && a.element in CKEDITOR.dtd.$block) && (h = a.name, a = new CKEDITOR.style(a), !c.filter.customConfig || c.filter.check(a))) a._name = h, a._.enterMode = j.enterMode, a._.weight = d + 1E3 * (a.type == CKEDITOR.STYLE_OBJECT ? 1 : a.type == CKEDITOR.STYLE_BLOCK ? 2 : 3), g[h] = a, i.push(a), k.push(a);
                        i.sort(function (a, b) {
                            return a._.weight - b._.weight
                        })
                    }
                });
                c.ui.addRichCombo("Styles", {
                    label: f.label,
                    title: f.panelTitle,
                    toolbar: "styles,10",
                    allowedContent: k,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(j.contentsCss),
                        multiSelect: !0,
                        attributes: {
                            "aria-label": f.panelTitle
                        }
                    },
                    init: function () {
                        var b, a, c, d, e, g;
                        e = 0;
                        for (g = i.length; e < g; e++) b = i[e], a = b._name, d = b.type, d != c && (this.startGroup(f["panelTitle" + d]), c = d), this.add(a, b.type == CKEDITOR.STYLE_OBJECT ? a : b.buildPreview(), a);
                        this.commit()
                    },
                    onClick: function (b) {
                        c.focus();
                        c.fire("saveSnapshot");
                        var b = g[b],
                            a = c.elementPath();
                        c[b.checkActive(a) ? "removeStyle" : "applyStyle"](b);
                        c.fire("saveSnapshot")
                    },
                    onRender: function () {
                        c.on("selectionChange", function (b) {
                            for (var a = this.getValue(), b = b.data.path.elements, c = 0, d = b.length, e; c < d; c++) {
                                e = b[c];
                                for (var f in g) if (g[f].checkElementRemovable(e, !0)) {
                                        f != a && this.setValue(f);
                                        return
                                    }
                            }
                            this.setValue("")
                        }, this)
                    },
                    onOpen: function () {
                        var b = c.getSelection().getSelectedElement(),
                            b = c.elementPath(b),
                            a = [0, 0, 0, 0];
                        this.showAll();
                        this.unmarkAll();
                        for (var h in g) {
                            var d =
                                g[h],
                                e = d.type;
                            e == CKEDITOR.STYLE_BLOCK && !b.isContextFor(d.element) ? this.hideItem(h) : (d.checkActive(b) ? this.mark(h) : e == CKEDITOR.STYLE_OBJECT && !d.checkApplicable(b) && (this.hideItem(h), a[e]--), a[e]++)
                        }
                        a[CKEDITOR.STYLE_BLOCK] || this.hideGroup(f["panelTitle" + CKEDITOR.STYLE_BLOCK]);
                        a[CKEDITOR.STYLE_INLINE] || this.hideGroup(f["panelTitle" + CKEDITOR.STYLE_INLINE]);
                        a[CKEDITOR.STYLE_OBJECT] || this.hideGroup(f["panelTitle" + CKEDITOR.STYLE_OBJECT])
                    },
                    reset: function () {
                        g = {};
                        i = []
                    }
                })
            }
        })
    })();
    (function () {
        function i(c) {
            return {
                editorFocus: !1,
                canUndo: !1,
                modes: {
                    wysiwyg: 1
                },
                exec: function (d) {
                    if (d.editable().hasFocus) {
                        var e = d.getSelection(),
                            b;
                        if (b = (new CKEDITOR.dom.elementPath(e.getCommonAncestor(), e.root)).contains({
                            td: 1,
                            th: 1
                        }, 1)) {
                            var e = d.createRange(),
                                a = CKEDITOR.tools.tryThese(function () {
                                    var a = b.getParent().$.cells[b.$.cellIndex + (c ? -1 : 1)];
                                    a.parentNode.parentNode;
                                    return a
                                }, function () {
                                    var a = b.getParent(),
                                        a = a.getAscendant("table").$.rows[a.$.rowIndex + (c ? -1 : 1)];
                                    return a.cells[c ? a.cells.length - 1 :
                                        0]
                                });
                            if (!a && !c) {
                                for (var f = b.getAscendant("table").$, a = b.getParent().$.cells, f = new CKEDITOR.dom.element(f.insertRow(-1), d.document), g = 0, h = a.length; g < h; g++) {
                                    var i = f.append((new CKEDITOR.dom.element(a[g], d.document)).clone(!1, !1));
                                    !CKEDITOR.env.ie && i.appendBogus()
                                }
                                e.moveToElementEditStart(f)
                            } else if (a) a = new CKEDITOR.dom.element(a), e.moveToElementEditStart(a), (!e.checkStartOfBlock() || !e.checkEndOfBlock()) && e.selectNodeContents(a);
                            else return !0;
                            e.select(!0);
                            return !0
                        }
                    }
                    return !1
                }
            }
        }
        var h = {
            editorFocus: !1,
            modes: {
                wysiwyg: 1,
                source: 1
            }
        }, g = {
                exec: function (c) {
                    c.container.focusNext(!0, c.tabIndex)
                }
            }, f = {
                exec: function (c) {
                    c.container.focusPrevious(!0, c.tabIndex)
                }
            };
        CKEDITOR.plugins.add("tab", {
            init: function (c) {
                for (var d = !1 !== c.config.enableTabKeyTools, e = c.config.tabSpaces || 0, b = ""; e--;) b += " ";
                if (b) c.on("key", function (a) {
                        9 == a.data.keyCode && (c.insertHtml(b), a.cancel())
                    });
                if (d) c.on("key", function (a) {
                        (9 == a.data.keyCode && c.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && c.execCommand("selectPreviousCell")) && a.cancel()
                    });
                c.addCommand("blur", CKEDITOR.tools.extend(g, h));
                c.addCommand("blurBack", CKEDITOR.tools.extend(f, h));
                c.addCommand("selectNextCell", i());
                c.addCommand("selectPreviousCell", i(!0))
            }
        })
    })();
    CKEDITOR.dom.element.prototype.focusNext = function (i, h) {
        var g = void 0 === h ? this.getTabIndex() : h,
            f, c, d, e, b, a;
        if (0 >= g) for (b = this.getNextSourceNode(i, CKEDITOR.NODE_ELEMENT); b;) {
                if (b.isVisible() && 0 === b.getTabIndex()) {
                    d = b;
                    break
                }
                b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT)
        } else for (b = this.getDocument().getBody().getFirst(); b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
                if (!f) if (!c && b.equals(this)) {
                        if (c = !0, i) {
                            if (!(b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
                            f = 1
                        }
                    } else c && !this.contains(b) &&
                            (f = 1);
                if (b.isVisible() && !(0 > (a = b.getTabIndex()))) {
                    if (f && a == g) {
                        d = b;
                        break
                    }
                    a > g && (!d || !e || a < e) ? (d = b, e = a) : !d && 0 === a && (d = b, e = a)
                }
        }
        d && d.focus()
    };
    CKEDITOR.dom.element.prototype.focusPrevious = function (i, h) {
        for (var g = void 0 === h ? this.getTabIndex() : h, f, c, d, e = 0, b, a = this.getDocument().getBody().getLast(); a = a.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!f) if (!c && a.equals(this)) {
                    if (c = !0, i) {
                        if (!(a = a.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
                        f = 1
                    }
                } else c && !this.contains(a) && (f = 1);
            if (a.isVisible() && !(0 > (b = a.getTabIndex()))) if (0 >= g) {
                    if (f && 0 === b) {
                        d = a;
                        break
                    }
                    b > e && (d = a, e = b)
                } else {
                    if (f && b == g) {
                        d = a;
                        break
                    }
                    if (b < g && (!d || b > e)) d = a, e = b
                }
        }
        d && d.focus()
    };
    CKEDITOR.plugins.add("table", {
        requires: "dialog",
        init: function (a) {
            function d(a) {
                return CKEDITOR.tools.extend(a || {}, {
                    contextSensitive: 1,
                    refresh: function (a, e) {
                        this.setState(e.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                    }
                })
            }
            if (!a.blockless) {
                var b = a.lang.table;
                a.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table",
                    allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (a.plugins.dialogadvtab ?
                        "table" + a.plugins.dialogadvtab.allowedContent() : ""),
                    requiredContent: "table",
                    contentTransformations: [
                        ["table{width}: sizeToStyle", "table[width]: sizeToAttribute"]
                    ]
                }));
                a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", d()));
                a.addCommand("tableDelete", d({
                    exec: function (a) {
                        var c = a.elementPath().contains("table", 1);
                        if (c) {
                            var b = c.getParent();
                            1 == b.getChildCount() && !b.is("body", "td", "th") && (c = b);
                            a = a.createRange();
                            a.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START);
                            c.remove();
                            a.select()
                        }
                    }
                }));
                a.ui.addButton && a.ui.addButton("Table", {
                    label: b.toolbar,
                    command: "table",
                    toolbar: "insert,30"
                });
                CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
                CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
                a.addMenuItems && a.addMenuItems({
                    table: {
                        label: b.menu,
                        command: "tableProperties",
                        group: "table",
                        order: 5
                    },
                    tabledelete: {
                        label: b.deleteTable,
                        command: "tableDelete",
                        group: "table",
                        order: 1
                    }
                });
                a.on("doubleclick", function (a) {
                    a.data.element.is("table") && (a.data.dialog = "tableProperties")
                });
                a.contextMenu &&
                    a.contextMenu.addListener(function () {
                    return {
                        tabledelete: CKEDITOR.TRISTATE_OFF,
                        table: CKEDITOR.TRISTATE_OFF
                    }
                })
            }
        }
    });
    (function () {
        function p(e) {
            function d(a) {
                !(0 < b.length) && (a.type == CKEDITOR.NODE_ELEMENT && y.test(a.getName()) && !a.getCustomData("selected_cell")) && (CKEDITOR.dom.element.setMarker(c, a, "selected_cell", !0), b.push(a))
            }
            for (var e = e.getRanges(), b = [], c = {}, a = 0; a < e.length; a++) {
                var f = e[a];
                if (f.collapsed) f = f.getCommonAncestor(), (f = f.getAscendant("td", !0) || f.getAscendant("th", !0)) && b.push(f);
                else {
                    var f = new CKEDITOR.dom.walker(f),
                        g;
                    for (f.guard = d; g = f.next();) if (g.type != CKEDITOR.NODE_ELEMENT || !g.is(CKEDITOR.dtd.table)) if ((g =
                                g.getAscendant("td", !0) || g.getAscendant("th", !0)) && !g.getCustomData("selected_cell")) CKEDITOR.dom.element.setMarker(c, g, "selected_cell", !0), b.push(g)
                }
            }
            CKEDITOR.dom.element.clearAllMarkers(c);
            return b
        }
        function o(e, d) {
            for (var b = p(e), c = b[0], a = c.getAscendant("table"), c = c.getDocument(), f = b[0].getParent(), g = f.$.rowIndex, b = b[b.length - 1], h = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = new CKEDITOR.dom.element(a.$.rows[h]), g = d ? g : h, f = d ? f : b, b = CKEDITOR.tools.buildTableMap(a), a = b[g], g = d ? b[g - 1] : b[g + 1], b = b[0].length,
                c = c.createElement("tr"), h = 0; a[h] && h < b; h++) {
                var i;
                1 < a[h].rowSpan && g && a[h] == g[h] ? (i = a[h], i.rowSpan += 1) : (i = (new CKEDITOR.dom.element(a[h])).clone(), i.removeAttribute("rowSpan"), !CKEDITOR.env.ie && i.appendBogus(), c.append(i), i = i.$);
                h += i.colSpan - 1
            }
            d ? c.insertBefore(f) : c.insertAfter(f)
        }
        function q(e) {
            if (e instanceof CKEDITOR.dom.selection) {
                for (var d = p(e), b = d[0].getAscendant("table"), c = CKEDITOR.tools.buildTableMap(b), e = d[0].getParent().$.rowIndex, d = d[d.length - 1], a = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = [],
                    f = e; f <= a; f++) {
                    for (var g = c[f], h = new CKEDITOR.dom.element(b.$.rows[f]), i = 0; i < g.length; i++) {
                        var j = new CKEDITOR.dom.element(g[i]),
                            l = j.getParent().$.rowIndex;
                        1 == j.$.rowSpan ? j.remove() : (j.$.rowSpan -= 1, l == f && (l = c[f + 1], l[i - 1] ? j.insertAfter(new CKEDITOR.dom.element(l[i - 1])) : (new CKEDITOR.dom.element(b.$.rows[f + 1])).append(j, 1)));
                        i += j.$.colSpan - 1
                    }
                    d.push(h)
                }
                c = b.$.rows;
                b = new CKEDITOR.dom.element(c[a + 1] || (0 < e ? c[e - 1] : null) || b.$.parentNode);
                for (f = d.length; 0 <= f; f--) q(d[f]);
                return b
            }
            e instanceof CKEDITOR.dom.element &&
                (b = e.getAscendant("table"), 1 == b.$.rows.length ? b.remove() : e.remove());
            return null
        }
        function r(e, d) {
            for (var b = d ? Infinity : 0, c = 0; c < e.length; c++) {
                var a;
                a = e[c];
                for (var f = d, g = a.getParent().$.cells, h = 0, i = 0; i < g.length; i++) {
                    var j = g[i],
                        h = h + (f ? 1 : j.colSpan);
                    if (j == a.$) break
                }
                a = h - 1;
                if (d ? a < b : a > b) b = a
            }
            return b
        }
        function k(e, d) {
            for (var b = p(e), c = b[0].getAscendant("table"), a = r(b, 1), b = r(b), a = d ? a : b, f = CKEDITOR.tools.buildTableMap(c), c = [], b = [], g = f.length, h = 0; h < g; h++) c.push(f[h][a]), b.push(d ? f[h][a - 1] : f[h][a + 1]);
            for (h = 0; h < g; h++) c[h] &&
                    (1 < c[h].colSpan && b[h] == c[h] ? (a = c[h], a.colSpan += 1) : (a = (new CKEDITOR.dom.element(c[h])).clone(), a.removeAttribute("colSpan"), !CKEDITOR.env.ie && a.appendBogus(), a[d ? "insertBefore" : "insertAfter"].call(a, new CKEDITOR.dom.element(c[h])), a = a.$), h += a.rowSpan - 1)
        }
        function u(e, d) {
            var b = e.getStartElement();
            if (b = b.getAscendant("td", 1) || b.getAscendant("th", 1)) {
                var c = b.clone();
                CKEDITOR.env.ie || c.appendBogus();
                d ? c.insertBefore(b) : c.insertAfter(b)
            }
        }
        function t(e) {
            if (e instanceof CKEDITOR.dom.selection) {
                var e = p(e),
                    d =
                        e[0] && e[0].getAscendant("table"),
                    b;
                a: {
                    var c = 0;
                    b = e.length - 1;
                    for (var a = {}, f, g; f = e[c++];) CKEDITOR.dom.element.setMarker(a, f, "delete_cell", !0);
                    for (c = 0; f = e[c++];) if ((g = f.getPrevious()) && !g.getCustomData("delete_cell") || (g = f.getNext()) && !g.getCustomData("delete_cell")) {
                            CKEDITOR.dom.element.clearAllMarkers(a);
                            b = g;
                            break a
                        }
                    CKEDITOR.dom.element.clearAllMarkers(a);
                    g = e[0].getParent();
                    (g = g.getPrevious()) ? b = g.getLast() : (g = e[b].getParent(), b = (g = g.getNext()) ? g.getChild(0) : null)
                }
                for (g = e.length - 1; 0 <= g; g--) t(e[g]);
                b ? m(b, !0) : d && d.remove()
            } else e instanceof CKEDITOR.dom.element && (d = e.getParent(), 1 == d.getChildCount() ? d.remove() : e.remove())
        }
        function m(e, d) {
            var b = new CKEDITOR.dom.range(e.getDocument());
            if (!b["moveToElementEdit" + (d ? "End" : "Start")](e)) b.selectNodeContents(e), b.collapse(d ? !1 : !0);
            b.select(!0)
        }
        function v(e, d, b) {
            e = e[d];
            if ("undefined" == typeof b) return e;
            for (d = 0; e && d < e.length; d++) {
                if (b.is && e[d] == b.$) return d;
                if (d == b) return new CKEDITOR.dom.element(e[d])
            }
            return b.is ? -1 : null
        }
        function s(e, d, b) {
            var c = p(e),
                a;
            if ((d ? 1 != c.length : 2 > c.length) || (a = e.getCommonAncestor()) && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) return !1;
            var f, e = c[0];
            a = e.getAscendant("table");
            var g = CKEDITOR.tools.buildTableMap(a),
                h = g.length,
                i = g[0].length,
                j = e.getParent().$.rowIndex,
                l = v(g, j, e);
            if (d) {
                var n;
                try {
                    var m = parseInt(e.getAttribute("rowspan"), 10) || 1;
                    f = parseInt(e.getAttribute("colspan"), 10) || 1;
                    n = g["up" == d ? j - m : "down" == d ? j + m : j]["left" == d ? l - f : "right" == d ? l + f : l]
                } catch (z) {
                    return !1
                }
                if (!n || e.$ == n) return !1;
                c["up" == d || "left" == d ? "unshift" : "push"](new CKEDITOR.dom.element(n))
            }
            for (var d =
                e.getDocument(), o = j, m = n = 0, q = !b && new CKEDITOR.dom.documentFragment(d), s = 0, d = 0; d < c.length; d++) {
                f = c[d];
                var k = f.getParent(),
                    t = f.getFirst(),
                    r = f.$.colSpan,
                    u = f.$.rowSpan,
                    k = k.$.rowIndex,
                    w = v(g, k, f),
                    s = s + r * u,
                    m = Math.max(m, w - l + r);
                n = Math.max(n, k - j + u);
                if (!b) {
                    r = f;
                    (u = r.getBogus()) && u.remove();
                    r.trim();
                    if (f.getChildren().count()) {
                        if (k != o && t && (!t.isBlockBoundary || !t.isBlockBoundary({
                            br: 1
                        })))(o = q.getLast(CKEDITOR.dom.walker.whitespaces(!0))) && (!o.is || !o.is("br")) && q.append("br");
                        f.moveChildren(q)
                    }
                    d ? f.remove() : f.setHtml("")
                }
                o =
                    k
            }
            if (b) return n * m == s;
            q.moveChildren(e);
            CKEDITOR.env.ie || e.appendBogus();
            m >= i ? e.removeAttribute("rowSpan") : e.$.rowSpan = n;
            n >= h ? e.removeAttribute("colSpan") : e.$.colSpan = m;
            b = new CKEDITOR.dom.nodeList(a.$.rows);
            c = b.count();
            for (d = c - 1; 0 <= d; d--) a = b.getItem(d), a.$.cells.length || (a.remove(), c++);
            return e
        }
        function w(e, d) {
            var b = p(e);
            if (1 < b.length) return !1;
            if (d) return !0;
            var b = b[0],
                c = b.getParent(),
                a = c.getAscendant("table"),
                f = CKEDITOR.tools.buildTableMap(a),
                g = c.$.rowIndex,
                h = v(f, g, b),
                i = b.$.rowSpan,
                j;
            if (1 < i) {
                j = Math.ceil(i /
                    2);
                for (var i = Math.floor(i / 2), c = g + j, a = new CKEDITOR.dom.element(a.$.rows[c]), f = v(f, c), l, c = b.clone(), g = 0; g < f.length; g++) if (l = f[g], l.parentNode == a.$ && g > h) {
                        c.insertBefore(new CKEDITOR.dom.element(l));
                        break
                    } else l = null;
                l || a.append(c, !0)
            } else {
                i = j = 1;
                a = c.clone();
                a.insertAfter(c);
                a.append(c = b.clone());
                l = v(f, g);
                for (h = 0; h < l.length; h++) l[h].rowSpan++
            }
            CKEDITOR.env.ie || c.appendBogus();
            b.$.rowSpan = j;
            c.$.rowSpan = i;
            1 == j && b.removeAttribute("rowSpan");
            1 == i && c.removeAttribute("rowSpan");
            return c
        }
        function x(e, d) {
            var b =
                p(e);
            if (1 < b.length) return !1;
            if (d) return !0;
            var b = b[0],
                c = b.getParent(),
                a = c.getAscendant("table"),
                a = CKEDITOR.tools.buildTableMap(a),
                f = v(a, c.$.rowIndex, b),
                g = b.$.colSpan;
            if (1 < g) c = Math.ceil(g / 2), g = Math.floor(g / 2);
            else {
                for (var g = c = 1, h = [], i = 0; i < a.length; i++) {
                    var j = a[i];
                    h.push(j[f]);
                    1 < j[f].rowSpan && (i += j[f].rowSpan - 1)
                }
                for (a = 0; a < h.length; a++) h[a].colSpan++
            }
            a = b.clone();
            a.insertAfter(b);
            CKEDITOR.env.ie || a.appendBogus();
            b.$.colSpan = c;
            a.$.colSpan = g;
            1 == c && b.removeAttribute("colSpan");
            1 == g && a.removeAttribute("colSpan");
            return a
        }
        var y = /^(?:td|th)$/;
        CKEDITOR.plugins.tabletools = {
            requires: "table,dialog,contextmenu",
            init: function (e) {
                function d(a) {
                    return CKEDITOR.tools.extend(a || {}, {
                        contextSensitive: 1,
                        refresh: function (a, b) {
                            this.setState(b.contains({
                                td: 1,
                                th: 1
                            }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }
                    })
                }
                function b(a, b) {
                    var c = e.addCommand(a, b);
                    e.addFeature(c)
                }
                var c = e.lang.table;
                b("cellProperties", new CKEDITOR.dialogCommand("cellProperties", d({
                    allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
                    requiredContent: "table"
                })));
                CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
                b("rowDelete", d({
                    requiredContent: "table",
                    exec: function (a) {
                        a = a.getSelection();
                        m(q(a))
                    }
                }));
                b("rowInsertBefore", d({
                    requiredContent: "table",
                    exec: function (a) {
                        a = a.getSelection();
                        o(a, !0)
                    }
                }));
                b("rowInsertAfter", d({
                    requiredContent: "table",
                    exec: function (a) {
                        a = a.getSelection();
                        o(a)
                    }
                }));
                b("columnDelete", d({
                    requiredContent: "table",
                    exec: function (a) {
                        for (var a = a.getSelection(), a = p(a), b = a[0], c = a[a.length - 1], a = b.getAscendant("table"),
                            d = CKEDITOR.tools.buildTableMap(a), e, j, l = [], n = 0, o = d.length; n < o; n++) for (var k = 0, q = d[n].length; k < q; k++) d[n][k] == b.$ && (e = k), d[n][k] == c.$ && (j = k);
                        for (n = e; n <= j; n++) for (k = 0; k < d.length; k++) c = d[k], b = new CKEDITOR.dom.element(a.$.rows[k]), c = new CKEDITOR.dom.element(c[n]), c.$ && (1 == c.$.colSpan ? c.remove() : c.$.colSpan -= 1, k += c.$.rowSpan - 1, b.$.cells.length || l.push(b));
                        j = a.$.rows[0] && a.$.rows[0].cells;
                        e = new CKEDITOR.dom.element(j[e] || (e ? j[e - 1] : a.$.parentNode));
                        l.length == o && a.remove();
                        e && m(e, !0)
                    }
                }));
                b("columnInsertBefore",
                d({
                    requiredContent: "table",
                    exec: function (a) {
                        a = a.getSelection();
                        k(a, !0)
                    }
                }));
                b("columnInsertAfter", d({
                    requiredContent: "table",
                    exec: function (a) {
                        a = a.getSelection();
                        k(a)
                    }
                }));
                b("cellDelete", d({
                    requiredContent: "table",
                    exec: function (a) {
                        a = a.getSelection();
                        t(a)
                    }
                }));
                b("cellMerge", d({
                    allowedContent: "td[colspan,rowspan]",
                    requiredContent: "td[colspan,rowspan]",
                    exec: function (a) {
                        m(s(a.getSelection()), !0)
                    }
                }));
                b("cellMergeRight", d({
                    allowedContent: "td[colspan]",
                    requiredContent: "td[colspan]",
                    exec: function (a) {
                        m(s(a.getSelection(),
                            "right"), !0)
                    }
                }));
                b("cellMergeDown", d({
                    allowedContent: "td[rowspan]",
                    requiredContent: "td[rowspan]",
                    exec: function (a) {
                        m(s(a.getSelection(), "down"), !0)
                    }
                }));
                b("cellVerticalSplit", d({
                    allowedContent: "td[rowspan]",
                    requiredContent: "td[rowspan]",
                    exec: function (a) {
                        m(w(a.getSelection()))
                    }
                }));
                b("cellHorizontalSplit", d({
                    allowedContent: "td[colspan]",
                    requiredContent: "td[colspan]",
                    exec: function (a) {
                        m(x(a.getSelection()))
                    }
                }));
                b("cellInsertBefore", d({
                    requiredContent: "table",
                    exec: function (a) {
                        a = a.getSelection();
                        u(a, !0)
                    }
                }));
                b("cellInsertAfter", d({
                    requiredContent: "table",
                    exec: function (a) {
                        a = a.getSelection();
                        u(a)
                    }
                }));
                e.addMenuItems && e.addMenuItems({
                    tablecell: {
                        label: c.cell.menu,
                        group: "tablecell",
                        order: 1,
                        getItems: function () {
                            var a = e.getSelection(),
                                b = p(a);
                            return {
                                tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecell_delete: CKEDITOR.TRISTATE_OFF,
                                tablecell_merge: s(a, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_right: s(a, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_down: s(a, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_vertical: w(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_horizontal: x(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_properties: 0 < b.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                            }
                        }
                    },
                    tablecell_insertBefore: {
                        label: c.cell.insertBefore,
                        group: "tablecell",
                        command: "cellInsertBefore",
                        order: 5
                    },
                    tablecell_insertAfter: {
                        label: c.cell.insertAfter,
                        group: "tablecell",
                        command: "cellInsertAfter",
                        order: 10
                    },
                    tablecell_delete: {
                        label: c.cell.deleteCell,
                        group: "tablecell",
                        command: "cellDelete",
                        order: 15
                    },
                    tablecell_merge: {
                        label: c.cell.merge,
                        group: "tablecell",
                        command: "cellMerge",
                        order: 16
                    },
                    tablecell_merge_right: {
                        label: c.cell.mergeRight,
                        group: "tablecell",
                        command: "cellMergeRight",
                        order: 17
                    },
                    tablecell_merge_down: {
                        label: c.cell.mergeDown,
                        group: "tablecell",
                        command: "cellMergeDown",
                        order: 18
                    },
                    tablecell_split_horizontal: {
                        label: c.cell.splitHorizontal,
                        group: "tablecell",
                        command: "cellHorizontalSplit",
                        order: 19
                    },
                    tablecell_split_vertical: {
                        label: c.cell.splitVertical,
                        group: "tablecell",
                        command: "cellVerticalSplit",
                        order: 20
                    },
                    tablecell_properties: {
                        label: c.cell.title,
                        group: "tablecellproperties",
                        command: "cellProperties",
                        order: 21
                    },
                    tablerow: {
                        label: c.row.menu,
                        group: "tablerow",
                        order: 1,
                        getItems: function () {
                            return {
                                tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablerow_delete: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    },
                    tablerow_insertBefore: {
                        label: c.row.insertBefore,
                        group: "tablerow",
                        command: "rowInsertBefore",
                        order: 5
                    },
                    tablerow_insertAfter: {
                        label: c.row.insertAfter,
                        group: "tablerow",
                        command: "rowInsertAfter",
                        order: 10
                    },
                    tablerow_delete: {
                        label: c.row.deleteRow,
                        group: "tablerow",
                        command: "rowDelete",
                        order: 15
                    },
                    tablecolumn: {
                        label: c.column.menu,
                        group: "tablecolumn",
                        order: 1,
                        getItems: function () {
                            return {
                                tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    },
                    tablecolumn_insertBefore: {
                        label: c.column.insertBefore,
                        group: "tablecolumn",
                        command: "columnInsertBefore",
                        order: 5
                    },
                    tablecolumn_insertAfter: {
                        label: c.column.insertAfter,
                        group: "tablecolumn",
                        command: "columnInsertAfter",
                        order: 10
                    },
                    tablecolumn_delete: {
                        label: c.column.deleteColumn,
                        group: "tablecolumn",
                        command: "columnDelete",
                        order: 15
                    }
                });
                e.contextMenu && e.contextMenu.addListener(function (a, b, c) {
                    return (a = c.contains({
                        td: 1,
                        th: 1
                    }, 1)) && !a.isReadOnly() ? {
                        tablecell: CKEDITOR.TRISTATE_OFF,
                        tablerow: CKEDITOR.TRISTATE_OFF,
                        tablecolumn: CKEDITOR.TRISTATE_OFF
                    } : null
                })
            },
            getSelectedCells: p
        };
        CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    })();
    CKEDITOR.tools.buildTableMap = function (p) {
        for (var p = p.$.rows, o = -1, q = [], r = 0; r < p.length; r++) {
            o++;
            !q[o] && (q[o] = []);
            for (var k = -1, u = 0; u < p[r].cells.length; u++) {
                var t = p[r].cells[u];
                for (k++; q[o][k];) k++;
                for (var m = isNaN(t.colSpan) ? 1 : t.colSpan, t = isNaN(t.rowSpan) ? 1 : t.rowSpan, v = 0; v < t; v++) {
                    q[o + v] || (q[o + v] = []);
                    for (var s = 0; s < m; s++) q[o + v][k + s] = p[r].cells[u]
                }
                k += m - 1
            }
        }
        return q
    };
    (function () {
        function h(a) {
            this.editor = a;
            this.reset()
        }
        CKEDITOR.plugins.add("undo", {
            init: function (a) {
                function c(a) {
                    b.enabled && !1 !== a.data.command.canUndo && b.save()
                }
                var b = new h(a),
                    d = a.addCommand("undo", {
                        exec: function () {
                            b.undo() && (a.selectionChange(), this.fire("afterUndo"))
                        },
                        state: CKEDITOR.TRISTATE_DISABLED,
                        canUndo: !1
                    }),
                    e = a.addCommand("redo", {
                        exec: function () {
                            b.redo() && (a.selectionChange(), this.fire("afterRedo"))
                        },
                        state: CKEDITOR.TRISTATE_DISABLED,
                        canUndo: !1
                    });
                a.setKeystroke([
                    [CKEDITOR.CTRL + 90, "undo"],
                    [CKEDITOR.CTRL + 89, "redo"],
                    [CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo"]
                ]);
                b.onChange = function () {
                    d.setState(b.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                    e.setState(b.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                };
                a.on("beforeCommandExec", c);
                a.on("afterCommandExec", c);
                a.on("saveSnapshot", function (a) {
                    b.save(a.data && a.data.contentOnly)
                });
                a.on("contentDom", function () {
                    a.editable().on("keydown", function (a) {
                        !a.data.$.ctrlKey && !a.data.$.metaKey && b.type(a)
                    })
                });
                a.on("beforeModeUnload",

                function () {
                    "wysiwyg" == a.mode && b.save(!0)
                });
                a.on("mode", function () {
                    b.enabled = a.readOnly ? !1 : "wysiwyg" == a.mode;
                    b.onChange()
                });
                a.ui.addButton && (a.ui.addButton("Undo", {
                    label: a.lang.undo.undo,
                    command: "undo",
                    toolbar: "undo,10"
                }), a.ui.addButton("Redo", {
                    label: a.lang.undo.redo,
                    command: "redo",
                    toolbar: "undo,20"
                }));
                a.resetUndo = function () {
                    b.reset();
                    a.fire("saveSnapshot")
                };
                a.on("updateSnapshot", function () {
                    b.currentImage && b.update()
                });
                a.on("lockSnapshot", b.lock, b);
                a.on("unlockSnapshot", b.unlock, b)
            }
        });
        CKEDITOR.plugins.undo = {};
        var i = CKEDITOR.plugins.undo.Image = function (a) {
            this.editor = a;
            a.fire("beforeUndoImage");
            var c = a.getSnapshot(),
                b = c && a.getSelection();
            CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
            this.contents = c;
            this.bookmarks = b && b.createBookmarks2(!0);
            a.fire("afterUndoImage")
        }, j = /\b(?:href|src|name)="[^"]*?"/gi;
        i.prototype = {
            equals: function (a, c) {
                var b = this.contents,
                    d = a.contents;
                if (CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)) b = b.replace(j, ""), d = d.replace(j, "");
                if (b != d) return !1;
                if (c) return !0;
                b = this.bookmarks;
                d = a.bookmarks;
                if (b || d) {
                    if (!b || !d || b.length != d.length) return !1;
                    for (var e = 0; e < b.length; e++) {
                        var g = b[e],
                            f = d[e];
                        if (g.startOffset != f.startOffset || g.endOffset != f.endOffset || !CKEDITOR.tools.arrayCompare(g.start, f.start) || !CKEDITOR.tools.arrayCompare(g.end, f.end)) return !1
                    }
                }
                return !0
            }
        };
        var k = {
            8: 1,
            46: 1
        }, m = {
                16: 1,
                17: 1,
                18: 1
            }, l = {
                37: 1,
                38: 1,
                39: 1,
                40: 1
            };
        h.prototype = {
            type: function (a) {
                var a = a && a.data.getKey(),
                    c = a in k,
                    b = this.lastKeystroke in k,
                    d = c && a == this.lastKeystroke,
                    e = a in l,
                    g = this.lastKeystroke in
                        l;
                if (!(a in m || this.typing) || !c && !e && (b || g) || c && !d) {
                    var f = new i(this.editor),
                        h = this.snapshots.length;
                    CKEDITOR.tools.setTimeout(function () {
                        var a = this.editor.getSnapshot();
                        CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g, ""));
                        f.contents != a && h == this.snapshots.length && (this.typing = !0, this.save(!1, f, !1) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1), this.hasUndo = !0, this.hasRedo = !1, this.modifiersCount = this.typesCount = 1, this.onChange())
                    }, 0, this)
                }
                this.lastKeystroke = a;
                c ?
                    (this.typesCount = 0, this.modifiersCount++, 25 < this.modifiersCount && (this.save(!1, null, !1), this.modifiersCount = 1)) : e || (this.modifiersCount = 0, this.typesCount++, 25 < this.typesCount && (this.save(!1, null, !1), this.typesCount = 1))
            },
            reset: function () {
                this.lastKeystroke = 0;
                this.snapshots = [];
                this.index = -1;
                this.limit = this.editor.config.undoStackSize || 20;
                this.currentImage = null;
                this.hasRedo = this.hasUndo = !1;
                this.locked = null;
                this.resetType()
            },
            resetType: function () {
                this.typing = !1;
                delete this.lastKeystroke;
                this.modifiersCount =
                    this.typesCount = 0
            },
            fireChange: function () {
                this.hasUndo = !! this.getNextImage(!0);
                this.hasRedo = !! this.getNextImage(!1);
                this.resetType();
                this.onChange()
            },
            save: function (a, c, b) {
                if (this.locked) return !1;
                var d = this.snapshots;
                c || (c = new i(this.editor));
                if (!1 === c.contents || this.currentImage && c.equals(this.currentImage, a)) return !1;
                d.splice(this.index + 1, d.length - this.index - 1);
                d.length == this.limit && d.shift();
                this.index = d.push(c) - 1;
                this.currentImage = c;
                !1 !== b && this.fireChange();
                return !0
            },
            restoreImage: function (a) {
                var c =
                    this.editor,
                    b;
                a.bookmarks && (c.focus(), b = c.getSelection());
                this.locked = 1;
                this.editor.loadSnapshot(a.contents);
                a.bookmarks ? b.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select());
                this.locked = 0;
                this.index = a.index;
                this.update();
                this.fireChange()
            },
            getNextImage: function (a) {
                var c = this.snapshots,
                    b = this.currentImage,
                    d;
                if (b) if (a) for (d = this.index - 1; 0 <= d; d--) {
                            if (a = c[d], !b.equals(a, !0)) return a.index = d, a
                    } else for (d = this.index + 1; d < c.length; d++) if (a =
                                c[d], !b.equals(a, !0)) return a.index = d, a;
                return null
            },
            redoable: function () {
                return this.enabled && this.hasRedo
            },
            undoable: function () {
                return this.enabled && this.hasUndo
            },
            undo: function () {
                if (this.undoable()) {
                    this.save(!0);
                    var a = this.getNextImage(!0);
                    if (a) return this.restoreImage(a), !0
                }
                return !1
            },
            redo: function () {
                if (this.redoable() && (this.save(!0), this.redoable())) {
                    var a = this.getNextImage(!1);
                    if (a) return this.restoreImage(a), !0
                }
                return !1
            },
            update: function () {
                this.locked || this.snapshots.splice(this.index, 1, this.currentImage =
                    new i(this.editor))
            },
            lock: function () {
                if (!this.locked) {
                    var a = this.editor.getSnapshot();
                    this.locked = {
                        update: this.currentImage && a == this.currentImage.contents ? a : null
                    }
                }
            },
            unlock: function () {
                if (this.locked) {
                    var a = this.locked.update,
                        c = this.editor.getSnapshot();
                    this.locked = null;
                    "string" == typeof a && c != a && this.update()
                }
            }
        }
    })();
    CKEDITOR.plugins.add("wsc", {
        requires: "dialog",
        init: function (a) {
            a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {
                wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname
            };
            "undefined" == typeof a.plugins.scayt && a.ui.addButton && a.ui.addButton("SpellChecker", {
                label: a.lang.wsc.toolbar,
                command: "checkspell",
                toolbar: "spellchecker,10"
            });
            CKEDITOR.dialog.add("checkspell", this.path + "dialogs/wsc.js")
        }
    });
    CKEDITOR.config.wsc_customerId = CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
    CKEDITOR.config.wsc_customLoaderScript = CKEDITOR.config.wsc_customLoaderScript || null;
    (function () {
        function h(b, e, c) {
            var i = [],
                g = [],
                a;
            for (a = 0; a < b.styleSheets.length; a++) {
                var d = b.styleSheets[a];
                if (!(d.ownerNode || d.owningElement).getAttribute("data-cke-temp") && !(d.href && "chrome://" == d.href.substr(0, 9))) try {
                        for (var f = d.cssRules || d.rules, d = 0; d < f.length; d++) g.push(f[d].selectorText)
                } catch (h) {}
            }
            a = g.join(" ");
            a = a.replace(/(,|>|\+|~)/g, " ");
            a = a.replace(/\[[^\]]*/g, "");
            a = a.replace(/#[^\s]*/g, "");
            a = a.replace(/\:{1,2}[^\s]*/g, "");
            a = a.replace(/\s+/g, " ");
            a = a.split(" ");
            b = [];
            for (g = 0; g < a.length; g++) f =
                    a[g], c.test(f) && !e.test(f) && -1 == CKEDITOR.tools.indexOf(b, f) && b.push(f);
            for (a = 0; a < b.length; a++) c = b[a].split("."), e = c[0].toLowerCase(), c = c[1], i.push({
                    name: e + "." + c,
                    element: e,
                    attributes: {
                        "class": c
                    }
                });
            return i
        }
        CKEDITOR.plugins.add("stylesheetparser", {
            init: function (b) {
                b.filter.disable();
                var e;
                b.once("stylesSet", function (c) {
                    c.cancel();
                    b.once("contentDom", function () {
                        b.getStylesSet(function (c) {
                            e = c.concat(h(b.document.$, b.config.stylesheetParser_skipSelectors || /(^body\.|^\.)/i, b.config.stylesheetParser_validSelectors ||
                                /\w+\.\w+/));
                            b.getStylesSet = function (b) {
                                if (e) return b(e)
                            };
                            b.fire("stylesSet", {
                                styles: e
                            })
                        })
                    })
                }, null, null, 1)
            }
        })
    })();
    CKEDITOR.plugins.add("syntaxhighlight", {
        requires: "dialog",
        init: function (a) {
            a.addCommand("syntaxhighlightDialog", new CKEDITOR.dialogCommand("syntaxhighlightDialog"));
            a.ui.addButton && a.ui.addButton("Syntaxhighlight", {
                label: a.lang.syntaxhighlight.title,
                command: "syntaxhighlightDialog",
                toolbar: "insert,98"
            });
            a.contextMenu && (a.addMenuGroup("syntaxhighlightGroup"), a.addMenuItem("syntaxhighlightItem", {
                label: a.lang.syntaxhighlight.contextTitle,
                icon: this.path + "icons/syntaxhighlight.png",
                command: "syntaxhighlightDialog",
                group: "syntaxhighlightGroup"
            }), a.contextMenu.addListener(function (a) {
                if (a.getAscendant("pre", !0)) return {
                        syntaxhighlightItem: CKEDITOR.TRISTATE_OFF
                }
            }));
            CKEDITOR.dialog.add("syntaxhighlightDialog", this.path + "dialogs/syntaxhighlight.js")
        }
    });
    (function () {
        function e(a, b) {
            return a.createFakeParserElement(b, "cke_allMedias", "allMedias", !0)
        }
        CKEDITOR.plugins.add("allmedias", {
            requires: "dialog,fakeobjects",
            onLoad: function () {
                CKEDITOR.addCss("img.cke_allMedias{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}")
            },
            init: function (a) {
                a.addCommand("allMedias", new CKEDITOR.dialogCommand("allMedias"));
                a.ui.addButton &&
                    a.ui.addButton("allMedias", {
                    label: a.lang.allMedias.allMedias,
                    command: "allMedias",
                    toolbar: "insert,20"
                });
                CKEDITOR.dialog.add("allMedias", this.path + "dialogs/allMedias.js");
                a.addMenuItems && (a.addMenuGroup("mediagroup"), a.addMenuItems({
                    mediamenu: {
                        label: a.lang.allMedias.properties,
                        command: "allMedias",
                        group: "mediagroup",
                        icon: this.icons
                    }
                }));
                a.on("doubleclick", function (a) {
                    var d = a.data.element;
                    if (d.is("img") && d.data("cke-real-element-type") == "allMedias") a.data.dialog = "allMedias"
                });
                a.contextMenu && a.contextMenu.addListener(function (a) {
                    if (a &&
                        a.is("img") && !a.isReadOnly() && a.data("cke-real-element-type") == "allMedias") return {
                            mediamenu: CKEDITOR.TRISTATE_OFF
                    }
                })
            },
            afterInit: function (a) {
                var b = a.dataProcessor,
                    d = b && b.dataFilter;
                htmlFilter = b && b.htmlFilter;
                d && d.addRules({
                    elements: {
                        "cke:object": function (c) {
                            if ("allMedias" == c.attributes.mtype) return e(a, c);
                            for (var b = 0; b < c.children.length; b++) if ("cke:embed" == c.children[b].name) {
                                    if ("allMedias" != c.children[b].attributes.mtype) break;
                                    return e(a, c)
                                }
                            return null
                        },
                        "cke:embed": function (b) {
                            return "allMedias" !=
                                b.attributes.mtype ? null : e(a, b)
                        }
                    }
                }, 1)
            }
        })
    })();
    CKEDITOR.tools.extend(CKEDITOR.config, {
        allMediasEmbedTagOnly: !1,
        allMediasAddEmbedTag: !0,
        allMediasConvertOnEdit: !1
    });
    CKEDITOR.config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,list,indent,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,htmlwriter,horizontalrule,iframe,wysiwygarea,image,smiley,justify,link,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,menubutton,scayt,stylescombo,tab,table,tabletools,undo,wsc,stylesheetparser,syntaxhighlight,allmedias';
    CKEDITOR.config.skin = 'moono';
    (function () {
        var icons = ('about,0,bold,32,italic,64,strike,96,subscript,128,superscript,160,underline,192,bidiltr,224,bidirtl,256,blockquote,288,copy-rtl,320,copy,352,cut-rtl,384,cut,416,paste-rtl,448,paste,480,bgcolor,512,textcolor,544,templates-rtl,576,templates,608,creatediv,640,bulletedlist-rtl,672,bulletedlist,704,numberedlist-rtl,736,numberedlist,768,indent-rtl,800,indent,832,outdent-rtl,864,outdent,896,find-rtl,928,find,960,replace,992,flash,1024,button,1056,checkbox,1088,form,1120,hiddenfield,1152,imagebutton,1184,radio,1216,select-rtl,1248,select,1280,textarea-rtl,1312,textarea,1344,textfield-rtl,1376,textfield,1408,horizontalrule,1440,iframe,1472,image,1504,smiley,1536,justifyblock,1568,justifycenter,1600,justifyleft,1632,justifyright,1664,anchor-rtl,1696,anchor,1728,link,1760,unlink,1792,maximize,1824,newpage-rtl,1856,newpage,1888,pagebreak-rtl,1920,pagebreak,1952,pastetext-rtl,1984,pastetext,2016,pastefromword-rtl,2048,pastefromword,2080,preview-rtl,2112,preview,2144,print,2176,removeformat,2208,save,2240,selectall,2272,showblocks-rtl,2304,showblocks,2336,source-rtl,2368,source,2400,specialchar,2432,scayt,2464,table,2496,redo-rtl,2528,redo,2560,undo-rtl,2592,undo,2624,spellchecker,2656,syntaxhighlight,2688'),
            path = CKEDITOR.getUrl('plugins/icons.png'),
            icons = icons.split(',');
        for (var i = 0; i < icons.length; i++) CKEDITOR.skin.icons[icons[i]] = {
                path: path,
                offset: -icons[++i]
        };
    })();
    CKEDITOR.lang.languages = {
        "en": 1,
        "ru": 1
    };
}());