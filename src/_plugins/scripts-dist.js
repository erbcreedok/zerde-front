function includeHTML() {
    var e, t, i, n, a;
    for (e = document.getElementsByTagName("*"), t = 0; t < e.length; t++) if (n = (i = e[t]).getAttribute("w3-include-html")) return (a = new XMLHttpRequest()).onreadystatechange = function() {
        4 == this.readyState && (200 == this.status && (i.innerHTML = this.responseText, 
        $(i).contents().unwrap()), 404 == this.status && (i.innerHTML = "Page not found."), 
        i.removeAttribute("w3-include-html"), includeHTML());
    }, a.open("GET", n, !0), void a.send();
}

!function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e);
    } : t(e);
}("undefined" != typeof window ? window : this, function(f, e) {
    function o(e) {
        var t = e.length, i = Q.type(e);
        return "function" !== i && !Q.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === i || 0 === t || "number" == typeof t && 0 < t && t - 1 in e));
    }
    function t(e, i, n) {
        if (Q.isFunction(i)) return Q.grep(e, function(e, t) {
            return !!i.call(e, t, e) !== n;
        });
        if (i.nodeType) return Q.grep(e, function(e) {
            return e === i !== n;
        });
        if ("string" == typeof i) {
            if (se.test(i)) return Q.filter(i, e, n);
            i = Q.filter(i, e);
        }
        return Q.grep(e, function(e) {
            return 0 <= Q.inArray(e, i) !== n;
        });
    }
    function i(e, t) {
        for (;(e = e[t]) && 1 !== e.nodeType; ) ;
        return e;
    }
    function n() {
        le.addEventListener ? (le.removeEventListener("DOMContentLoaded", a, !1), f.removeEventListener("load", a, !1)) : (le.detachEvent("onreadystatechange", a), 
        f.detachEvent("onload", a));
    }
    function a() {
        (le.addEventListener || "load" === event.type || "complete" === le.readyState) && (n(), 
        Q.ready());
    }
    function l(e, t, i) {
        if (void 0 === i && 1 === e.nodeType) {
            var n = "data-" + t.replace(ye, "-$1").toLowerCase();
            if ("string" == typeof (i = e.getAttribute(n))) {
                try {
                    i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : ge.test(i) ? Q.parseJSON(i) : i);
                } catch (e) {}
                Q.data(e, t, i);
            } else i = void 0;
        }
        return i;
    }
    function d(e) {
        var t;
        for (t in e) if (("data" !== t || !Q.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0;
    }
    function r(e, t, i, n) {
        if (Q.acceptData(e)) {
            var a, r, s = Q.expando, o = e.nodeType, l = o ? Q.cache : e, d = o ? e[s] : e[s] && s;
            if (d && l[d] && (n || l[d].data) || void 0 !== i || "string" != typeof t) return d || (d = o ? e[s] = F.pop() || Q.guid++ : s), 
            l[d] || (l[d] = o ? {} : {
                toJSON: Q.noop
            }), ("object" == typeof t || "function" == typeof t) && (n ? l[d] = Q.extend(l[d], t) : l[d].data = Q.extend(l[d].data, t)), 
            r = l[d], n || (r.data || (r.data = {}), r = r.data), void 0 !== i && (r[Q.camelCase(t)] = i), 
            "string" == typeof t ? null == (a = r[t]) && (a = r[Q.camelCase(t)]) : a = r, a;
        }
    }
    function s(e, t, i) {
        if (Q.acceptData(e)) {
            var n, a, r = e.nodeType, s = r ? Q.cache : e, o = r ? e[Q.expando] : Q.expando;
            if (s[o]) {
                if (t && (n = i ? s[o] : s[o].data)) {
                    Q.isArray(t) ? t = t.concat(Q.map(t, Q.camelCase)) : t in n ? t = [ t ] : t = (t = Q.camelCase(t)) in n ? [ t ] : t.split(" "), 
                    a = t.length;
                    for (;a--; ) delete n[t[a]];
                    if (i ? !d(n) : !Q.isEmptyObject(n)) return;
                }
                (i || (delete s[o].data, d(s[o]))) && (r ? Q.cleanData([ e ], !0) : K.deleteExpando || s != s.window ? delete s[o] : s[o] = null);
            }
        }
    }
    function c() {
        return !0;
    }
    function u() {
        return !1;
    }
    function p() {
        try {
            return le.activeElement;
        } catch (e) {}
    }
    function v(e) {
        var t = Le.split("|"), i = e.createDocumentFragment();
        if (i.createElement) for (;t.length; ) i.createElement(t.pop());
        return i;
    }
    function m(e, t) {
        var i, n, a = 0, r = typeof e.getElementsByTagName !== me ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== me ? e.querySelectorAll(t || "*") : void 0;
        if (!r) for (r = [], i = e.childNodes || e; null != (n = i[a]); a++) !t || Q.nodeName(n, t) ? r.push(n) : Q.merge(r, m(n, t));
        return void 0 === t || t && Q.nodeName(e, t) ? Q.merge([ e ], r) : r;
    }
    function g(e) {
        Ee.test(e.type) && (e.defaultChecked = e.checked);
    }
    function h(e, t) {
        return Q.nodeName(e, "table") && Q.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function y(e) {
        return e.type = (null !== Q.find.attr(e, "type")) + "/" + e.type, e;
    }
    function b(e) {
        var t = Be.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e;
    }
    function x(e, t) {
        for (var i, n = 0; null != (i = e[n]); n++) Q._data(i, "globalEval", !t || Q._data(t[n], "globalEval"));
    }
    function w(e, t) {
        if (1 === t.nodeType && Q.hasData(e)) {
            var i, n, a, r = Q._data(e), s = Q._data(t, r), o = r.events;
            if (o) for (i in delete s.handle, s.events = {}, o) for (n = 0, a = o[i].length; n < a; n++) Q.event.add(t, i, o[i][n]);
            s.data && (s.data = Q.extend({}, s.data));
        }
    }
    function T(e, t) {
        var i, n, a;
        if (1 === t.nodeType) {
            if (i = t.nodeName.toLowerCase(), !K.noCloneEvent && t[Q.expando]) {
                for (n in (a = Q._data(t)).events) Q.removeEvent(t, n, a.handle);
                t.removeAttribute(Q.expando);
            }
            "script" === i && t.text !== e.text ? (y(t).text = e.text, b(t)) : "object" === i ? (t.parentNode && (t.outerHTML = e.outerHTML), 
            K.html5Clone && e.innerHTML && !Q.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === i && Ee.test(e.type) ? (t.defaultChecked = t.checked = e.checked, 
            t.value !== e.value && (t.value = e.value)) : "option" === i ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === i || "textarea" === i) && (t.defaultValue = e.defaultValue);
        }
    }
    function E(e, t) {
        var i, n = Q(t.createElement(e)).appendTo(t.body), a = f.getDefaultComputedStyle && (i = f.getDefaultComputedStyle(n[0])) ? i.display : Q.css(n[0], "display");
        return n.detach(), a;
    }
    function C(e) {
        var t = le, i = Ve[e];
        return i || ("none" !== (i = E(e, t)) && i || ((t = ((Xe = (Xe || Q("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || Xe[0].contentDocument).document).write(), 
        t.close(), i = E(e, t), Xe.detach()), Ve[e] = i), i;
    }
    function S(t, i) {
        return {
            get: function() {
                var e = t();
                if (null != e) return e ? void delete this.get : (this.get = i).apply(this, arguments);
            }
        };
    }
    function k(e, t) {
        if (t in e) return t;
        for (var i = t.charAt(0).toUpperCase() + t.slice(1), n = t, a = rt.length; a--; ) if ((t = rt[a] + i) in e) return t;
        return n;
    }
    function M(e, t) {
        for (var i, n, a, r = [], s = 0, o = e.length; s < o; s++) (n = e[s]).style && (r[s] = Q._data(n, "olddisplay"), 
        i = n.style.display, t ? (r[s] || "none" !== i || (n.style.display = ""), "" === n.style.display && we(n) && (r[s] = Q._data(n, "olddisplay", C(n.nodeName)))) : (a = we(n), 
        (i && "none" !== i || !a) && Q._data(n, "olddisplay", a ? i : Q.css(n, "display"))));
        for (s = 0; s < o; s++) (n = e[s]).style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? r[s] || "" : "none"));
        return e;
    }
    function N(e, t, i) {
        var n = tt.exec(t);
        return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : t;
    }
    function L(e, t, i, n, a) {
        for (var r = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; r < 4; r += 2) "margin" === i && (s += Q.css(e, i + xe[r], !0, a)), 
        n ? ("content" === i && (s -= Q.css(e, "padding" + xe[r], !0, a)), "margin" !== i && (s -= Q.css(e, "border" + xe[r] + "Width", !0, a))) : (s += Q.css(e, "padding" + xe[r], !0, a), 
        "padding" !== i && (s += Q.css(e, "border" + xe[r] + "Width", !0, a)));
        return s;
    }
    function P(e, t, i) {
        var n = !0, a = "width" === t ? e.offsetWidth : e.offsetHeight, r = Ge(e), s = K.boxSizing && "border-box" === Q.css(e, "boxSizing", !1, r);
        if (a <= 0 || null == a) {
            if (((a = Ye(e, t, r)) < 0 || null == a) && (a = e.style[t]), Ke.test(a)) return a;
            n = s && (K.boxSizingReliable() || a === e.style[t]), a = parseFloat(a) || 0;
        }
        return a + L(e, t, i || (s ? "border" : "content"), n, r) + "px";
    }
    function $(e, t, i, n, a) {
        return new $.prototype.init(e, t, i, n, a);
    }
    function z() {
        return setTimeout(function() {
            st = void 0;
        }), st = Q.now();
    }
    function D(e, t) {
        var i, n = {
            height: e
        }, a = 0;
        for (t = t ? 1 : 0; a < 4; a += 2 - t) n["margin" + (i = xe[a])] = n["padding" + i] = e;
        return t && (n.opacity = n.width = e), n;
    }
    function A(e, t, i) {
        for (var n, a = (gt[t] || []).concat(gt["*"]), r = 0, s = a.length; r < s; r++) if (n = a[r].call(i, t, e)) return n;
    }
    function I(r, e, t) {
        var i, s, n = 0, a = mt.length, o = Q.Deferred().always(function() {
            delete l.elem;
        }), l = function() {
            if (s) return !1;
            for (var e = st || z(), t = Math.max(0, d.startTime + d.duration - e), i = 1 - (t / d.duration || 0), n = 0, a = d.tweens.length; n < a; n++) d.tweens[n].run(i);
            return o.notifyWith(r, [ d, i, t ]), i < 1 && a ? t : (o.resolveWith(r, [ d ]), 
            !1);
        }, d = o.promise({
            elem: r,
            props: Q.extend({}, e),
            opts: Q.extend(!0, {
                specialEasing: {}
            }, t),
            originalProperties: e,
            originalOptions: t,
            startTime: st || z(),
            duration: t.duration,
            tweens: [],
            createTween: function(e, t) {
                var i = Q.Tween(r, d.opts, e, t, d.opts.specialEasing[e] || d.opts.easing);
                return d.tweens.push(i), i;
            },
            stop: function(e) {
                var t = 0, i = e ? d.tweens.length : 0;
                if (s) return this;
                for (s = !0; t < i; t++) d.tweens[t].run(1);
                return e ? o.resolveWith(r, [ d, e ]) : o.rejectWith(r, [ d, e ]), this;
            }
        }), c = d.props;
        for (function(e, t) {
            var i, n, a, r, s;
            for (i in e) if (a = t[n = Q.camelCase(i)], r = e[i], Q.isArray(r) && (a = r[1], 
            r = e[i] = r[0]), i !== n && (e[n] = r, delete e[i]), (s = Q.cssHooks[n]) && "expand" in s) for (i in r = s.expand(r), 
            delete e[n], r) i in e || (e[i] = r[i], t[i] = a); else t[n] = a;
        }(c, d.opts.specialEasing); n < a; n++) if (i = mt[n].call(d, r, c, d.opts)) return i;
        return Q.map(c, A, d), Q.isFunction(d.opts.start) && d.opts.start.call(r, d), Q.fx.timer(Q.extend(l, {
            elem: r,
            anim: d,
            queue: d.opts.queue
        })), d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always);
    }
    function O(r) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var i, n = 0, a = e.toLowerCase().match(he) || [];
            if (Q.isFunction(t)) for (;i = a[n++]; ) "+" === i.charAt(0) ? (i = i.slice(1) || "*", 
            (r[i] = r[i] || []).unshift(t)) : (r[i] = r[i] || []).push(t);
        };
    }
    function H(t, a, r, s) {
        function o(e) {
            var n;
            return l[e] = !0, Q.each(t[e] || [], function(e, t) {
                var i = t(a, r, s);
                return "string" != typeof i || d || l[i] ? d ? !(n = i) : void 0 : (a.dataTypes.unshift(i), 
                o(i), !1);
            }), n;
        }
        var l = {}, d = t === Bt;
        return o(a.dataTypes[0]) || !l["*"] && o("*");
    }
    function _(e, t) {
        var i, n, a = Q.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((a[n] ? e : i || (i = {}))[n] = t[n]);
        return i && Q.extend(!0, e, i), e;
    }
    function j(i, e, n, a) {
        var t;
        if (Q.isArray(e)) Q.each(e, function(e, t) {
            n || Rt.test(i) ? a(i, t) : j(i + "[" + ("object" == typeof t ? e : "") + "]", t, n, a);
        }); else if (n || "object" !== Q.type(e)) a(i, e); else for (t in e) j(i + "[" + t + "]", e[t], n, a);
    }
    function B() {
        try {
            return new f.XMLHttpRequest();
        } catch (e) {}
    }
    function q(e) {
        return Q.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow);
    }
    var F = [], R = F.slice, X = F.concat, W = F.push, V = F.indexOf, G = {}, Y = G.toString, U = G.hasOwnProperty, K = {}, J = "1.11.1", Q = function(e, t) {
        return new Q.fn.init(e, t);
    }, Z = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ee = /^-ms-/, te = /-([\da-z])/gi, ie = function(e, t) {
        return t.toUpperCase();
    };
    Q.fn = Q.prototype = {
        jquery: J,
        constructor: Q,
        selector: "",
        length: 0,
        toArray: function() {
            return R.call(this);
        },
        get: function(e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : R.call(this);
        },
        pushStack: function(e) {
            var t = Q.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t;
        },
        each: function(e, t) {
            return Q.each(this, e, t);
        },
        map: function(i) {
            return this.pushStack(Q.map(this, function(e, t) {
                return i.call(e, t, e);
            }));
        },
        slice: function() {
            return this.pushStack(R.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length, i = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= i && i < t ? [ this[i] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: W,
        sort: F.sort,
        splice: F.splice
    }, Q.extend = Q.fn.extend = function() {
        var e, t, i, n, a, r, s = arguments[0] || {}, o = 1, l = arguments.length, d = !1;
        for ("boolean" == typeof s && (d = s, s = arguments[o] || {}, o++), "object" == typeof s || Q.isFunction(s) || (s = {}), 
        o === l && (s = this, o--); o < l; o++) if (null != (a = arguments[o])) for (n in a) e = s[n], 
        s !== (i = a[n]) && (d && i && (Q.isPlainObject(i) || (t = Q.isArray(i))) ? (t ? (t = !1, 
        r = e && Q.isArray(e) ? e : []) : r = e && Q.isPlainObject(e) ? e : {}, s[n] = Q.extend(d, r, i)) : void 0 !== i && (s[n] = i));
        return s;
    }, Q.extend({
        expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e);
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === Q.type(e);
        },
        isArray: Array.isArray || function(e) {
            return "array" === Q.type(e);
        },
        isWindow: function(e) {
            return null != e && e == e.window;
        },
        isNumeric: function(e) {
            return !Q.isArray(e) && 0 <= e - parseFloat(e);
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0;
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== Q.type(e) || e.nodeType || Q.isWindow(e)) return !1;
            try {
                if (e.constructor && !U.call(e, "constructor") && !U.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            if (K.ownLast) for (t in e) return U.call(e, t);
            for (t in e) ;
            return void 0 === t || U.call(e, t);
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? G[Y.call(e)] || "object" : typeof e;
        },
        globalEval: function(e) {
            e && Q.trim(e) && (f.execScript || function(e) {
                f.eval.call(f, e);
            })(e);
        },
        camelCase: function(e) {
            return e.replace(ee, "ms-").replace(te, ie);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t, i) {
            var n = 0, a = e.length, r = o(e);
            if (i) {
                if (r) for (;n < a && !1 !== t.apply(e[n], i); n++) ; else for (n in e) if (!1 === t.apply(e[n], i)) break;
            } else if (r) for (;n < a && !1 !== t.call(e[n], n, e[n]); n++) ; else for (n in e) if (!1 === t.call(e[n], n, e[n])) break;
            return e;
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(Z, "");
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (o(Object(e)) ? Q.merge(i, "string" == typeof e ? [ e ] : e) : W.call(i, e)), 
            i;
        },
        inArray: function(e, t, i) {
            var n;
            if (t) {
                if (V) return V.call(t, e, i);
                for (n = t.length, i = i ? i < 0 ? Math.max(0, n + i) : i : 0; i < n; i++) if (i in t && t[i] === e) return i;
            }
            return -1;
        },
        merge: function(e, t) {
            for (var i = +t.length, n = 0, a = e.length; n < i; ) e[a++] = t[n++];
            if (i != i) for (;void 0 !== t[n]; ) e[a++] = t[n++];
            return e.length = a, e;
        },
        grep: function(e, t, i) {
            for (var n = [], a = 0, r = e.length, s = !i; a < r; a++) !t(e[a], a) !== s && n.push(e[a]);
            return n;
        },
        map: function(e, t, i) {
            var n, a = 0, r = e.length, s = [];
            if (o(e)) for (;a < r; a++) null != (n = t(e[a], a, i)) && s.push(n); else for (a in e) null != (n = t(e[a], a, i)) && s.push(n);
            return X.apply([], s);
        },
        guid: 1,
        proxy: function(e, t) {
            var i, n, a;
            return "string" == typeof t && (a = e[t], t = e, e = a), Q.isFunction(e) ? (i = R.call(arguments, 2), 
            (n = function() {
                return e.apply(t || this, i.concat(R.call(arguments)));
            }).guid = e.guid = e.guid || Q.guid++, n) : void 0;
        },
        now: function() {
            return +new Date();
        },
        support: K
    }), Q.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        G["[object " + t + "]"] = t.toLowerCase();
    });
    var ne = function(i) {
        function x(e, t, i, n) {
            var a, r, s, o, l, d, c, u, p, h;
            if ((t ? t.ownerDocument || t : _) !== P && L(t), i = i || [], !e || "string" != typeof e) return i;
            if (1 !== (o = (t = t || P).nodeType) && 9 !== o) return [];
            if (z && !n) {
                if (a = me.exec(e)) if (s = a[1]) {
                    if (9 === o) {
                        if (!(r = t.getElementById(s)) || !r.parentNode) return i;
                        if (r.id === s) return i.push(r), i;
                    } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && O(t, r) && r.id === s) return i.push(r), 
                    i;
                } else {
                    if (a[2]) return J.apply(i, t.getElementsByTagName(e)), i;
                    if ((s = a[3]) && m.getElementsByClassName && t.getElementsByClassName) return J.apply(i, t.getElementsByClassName(s)), 
                    i;
                }
                if (m.qsa && (!D || !D.test(e))) {
                    if (u = c = H, p = t, h = 9 === o && e, 1 === o && "object" !== t.nodeName.toLowerCase()) {
                        for (d = E(e), (c = t.getAttribute("id")) ? u = c.replace(ye, "\\$&") : t.setAttribute("id", u), 
                        u = "[id='" + u + "'] ", l = d.length; l--; ) d[l] = u + v(d[l]);
                        p = ge.test(e) && f(t.parentNode) || t, h = d.join(",");
                    }
                    if (h) try {
                        return J.apply(i, p.querySelectorAll(h)), i;
                    } catch (e) {} finally {
                        c || t.removeAttribute("id");
                    }
                }
            }
            return S(e.replace(se, "$1"), t, i, n);
        }
        function e() {
            var n = [];
            return function e(t, i) {
                return n.push(t + " ") > T.cacheLength && delete e[n.shift()], e[t + " "] = i;
            };
        }
        function l(e) {
            return e[H] = !0, e;
        }
        function n(e) {
            var t = P.createElement("div");
            try {
                return !!e(t);
            } catch (e) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }
        function t(e, t) {
            for (var i = e.split("|"), n = e.length; n--; ) T.attrHandle[i[n]] = t;
        }
        function d(e, t) {
            var i = t && e, n = i && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (n) return n;
            if (i) for (;i = i.nextSibling; ) if (i === t) return -1;
            return e ? 1 : -1;
        }
        function a(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t;
            };
        }
        function r(i) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === i;
            };
        }
        function s(s) {
            return l(function(r) {
                return r = +r, l(function(e, t) {
                    for (var i, n = s([], e.length, r), a = n.length; a--; ) e[i = n[a]] && (e[i] = !(t[i] = e[i]));
                });
            });
        }
        function f(e) {
            return e && typeof e.getElementsByTagName !== W && e;
        }
        function o() {}
        function v(e) {
            for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
            return n;
        }
        function u(s, e, t) {
            var o = e.dir, l = t && "parentNode" === o, d = B++;
            return e.first ? function(e, t, i) {
                for (;e = e[o]; ) if (1 === e.nodeType || l) return s(e, t, i);
            } : function(e, t, i) {
                var n, a, r = [ j, d ];
                if (i) {
                    for (;e = e[o]; ) if ((1 === e.nodeType || l) && s(e, t, i)) return !0;
                } else for (;e = e[o]; ) if (1 === e.nodeType || l) {
                    if ((n = (a = e[H] || (e[H] = {}))[o]) && n[0] === j && n[1] === d) return r[2] = n[2];
                    if ((a[o] = r)[2] = s(e, t, i)) return !0;
                }
            };
        }
        function p(a) {
            return 1 < a.length ? function(e, t, i) {
                for (var n = a.length; n--; ) if (!a[n](e, t, i)) return !1;
                return !0;
            } : a[0];
        }
        function w(e, t, i, n, a) {
            for (var r, s = [], o = 0, l = e.length, d = null != t; o < l; o++) (r = e[o]) && (!i || i(r, n, a)) && (s.push(r), 
            d && t.push(o));
            return s;
        }
        function y(h, f, v, m, g, e) {
            return m && !m[H] && (m = y(m)), g && !g[H] && (g = y(g, e)), l(function(e, t, i, n) {
                var a, r, s, o = [], l = [], d = t.length, c = e || function(e, t, i) {
                    for (var n = 0, a = t.length; n < a; n++) x(e, t[n], i);
                    return i;
                }(f || "*", i.nodeType ? [ i ] : i, []), u = !h || !e && f ? c : w(c, o, h, i, n), p = v ? g || (e ? h : d || m) ? [] : t : u;
                if (v && v(u, p, i, n), m) for (a = w(p, l), m(a, [], i, n), r = a.length; r--; ) (s = a[r]) && (p[l[r]] = !(u[l[r]] = s));
                if (e) {
                    if (g || h) {
                        if (g) {
                            for (a = [], r = p.length; r--; ) (s = p[r]) && a.push(u[r] = s);
                            g(null, p = [], a, n);
                        }
                        for (r = p.length; r--; ) (s = p[r]) && -1 < (a = g ? Z.call(e, s) : o[r]) && (e[a] = !(t[a] = s));
                    }
                } else p = w(p === t ? p.splice(d, p.length) : p), g ? g(null, t, p, n) : J.apply(t, p);
            });
        }
        function h(e) {
            for (var n, t, i, a = e.length, r = T.relative[e[0].type], s = r || T.relative[" "], o = r ? 1 : 0, l = u(function(e) {
                return e === n;
            }, s, !0), d = u(function(e) {
                return -1 < Z.call(n, e);
            }, s, !0), c = [ function(e, t, i) {
                return !r && (i || t !== k) || ((n = t).nodeType ? l(e, t, i) : d(e, t, i));
            } ]; o < a; o++) if (t = T.relative[e[o].type]) c = [ u(p(c), t) ]; else {
                if ((t = T.filter[e[o].type].apply(null, e[o].matches))[H]) {
                    for (i = ++o; i < a && !T.relative[e[i].type]; i++) ;
                    return y(1 < o && p(c), 1 < o && v(e.slice(0, o - 1).concat({
                        value: " " === e[o - 2].type ? "*" : ""
                    })).replace(se, "$1"), t, o < i && h(e.slice(o, i)), i < a && h(e = e.slice(i)), i < a && v(e));
                }
                c.push(t);
            }
            return p(c);
        }
        var c, m, T, g, b, E, C, S, k, M, N, L, P, $, z, D, A, I, O, H = "sizzle" + -new Date(), _ = i.document, j = 0, B = 0, q = e(), F = e(), R = e(), X = function(e, t) {
            return e === t && (N = !0), 0;
        }, W = "undefined", V = 1 << 31, G = {}.hasOwnProperty, Y = [], U = Y.pop, K = Y.push, J = Y.push, Q = Y.slice, Z = Y.indexOf || function(e) {
            for (var t = 0, i = this.length; t < i; t++) if (this[t] === e) return t;
            return -1;
        }, ee = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", te = "[\\x20\\t\\r\\n\\f]", ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ne = ie.replace("w", "w#"), ae = "\\[" + te + "*(" + ie + ")(?:" + te + "*([*^$|!~]?=)" + te + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ne + "))|)" + te + "*\\]", re = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)", se = new RegExp("^" + te + "+|((?:^|[^\\\\])(?:\\\\.)*)" + te + "+$", "g"), oe = new RegExp("^" + te + "*," + te + "*"), le = new RegExp("^" + te + "*([>+~]|" + te + ")" + te + "*"), de = new RegExp("=" + te + "*([^\\]'\"]*?)" + te + "*\\]", "g"), ce = new RegExp(re), ue = new RegExp("^" + ne + "$"), pe = {
            ID: new RegExp("^#(" + ie + ")"),
            CLASS: new RegExp("^\\.(" + ie + ")"),
            TAG: new RegExp("^(" + ie.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + ae),
            PSEUDO: new RegExp("^" + re),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + te + "*(even|odd|(([+-]|)(\\d*)n|)" + te + "*(?:([+-]|)" + te + "*(\\d+)|))" + te + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + ee + ")$", "i"),
            needsContext: new RegExp("^" + te + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + te + "*((?:-\\d)?\\d*)" + te + "*\\)|)(?=[^-]|$)", "i")
        }, he = /^(?:input|select|textarea|button)$/i, fe = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ge = /[+~]/, ye = /'|\\/g, be = new RegExp("\\\\([\\da-f]{1,6}" + te + "?|(" + te + ")|.)", "ig"), xe = function(e, t, i) {
            var n = "0x" + t - 65536;
            return n != n || i ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320);
        };
        try {
            J.apply(Y = Q.call(_.childNodes), _.childNodes), Y[_.childNodes.length].nodeType;
        } catch (e) {
            J = {
                apply: Y.length ? function(e, t) {
                    K.apply(e, Q.call(t));
                } : function(e, t) {
                    for (var i = e.length, n = 0; e[i++] = t[n++]; ) ;
                    e.length = i - 1;
                }
            };
        }
        for (c in m = x.support = {}, b = x.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName;
        }, L = x.setDocument = function(e) {
            var t, l = e ? e.ownerDocument || e : _, i = l.defaultView;
            return l !== P && 9 === l.nodeType && l.documentElement ? ($ = (P = l).documentElement, 
            z = !b(l), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", function() {
                L();
            }, !1) : i.attachEvent && i.attachEvent("onunload", function() {
                L();
            })), m.attributes = n(function(e) {
                return e.className = "i", !e.getAttribute("className");
            }), m.getElementsByTagName = n(function(e) {
                return e.appendChild(l.createComment("")), !e.getElementsByTagName("*").length;
            }), m.getElementsByClassName = ve.test(l.getElementsByClassName) && n(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 
                2 === e.getElementsByClassName("i").length;
            }), m.getById = n(function(e) {
                return $.appendChild(e).id = H, !l.getElementsByName || !l.getElementsByName(H).length;
            }), m.getById ? (T.find.ID = function(e, t) {
                if (typeof t.getElementById !== W && z) {
                    var i = t.getElementById(e);
                    return i && i.parentNode ? [ i ] : [];
                }
            }, T.filter.ID = function(e) {
                var t = e.replace(be, xe);
                return function(e) {
                    return e.getAttribute("id") === t;
                };
            }) : (delete T.find.ID, T.filter.ID = function(e) {
                var i = e.replace(be, xe);
                return function(e) {
                    var t = typeof e.getAttributeNode !== W && e.getAttributeNode("id");
                    return t && t.value === i;
                };
            }), T.find.TAG = m.getElementsByTagName ? function(e, t) {
                return typeof t.getElementsByTagName !== W ? t.getElementsByTagName(e) : void 0;
            } : function(e, t) {
                var i, n = [], a = 0, r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (;i = r[a++]; ) 1 === i.nodeType && n.push(i);
                    return n;
                }
                return r;
            }, T.find.CLASS = m.getElementsByClassName && function(e, t) {
                return typeof t.getElementsByClassName !== W && z ? t.getElementsByClassName(e) : void 0;
            }, A = [], D = [], (m.qsa = ve.test(l.querySelectorAll)) && (n(function(e) {
                e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && D.push("[*^$]=" + te + "*(?:''|\"\")"), 
                e.querySelectorAll("[selected]").length || D.push("\\[" + te + "*(?:value|" + ee + ")"), 
                e.querySelectorAll(":checked").length || D.push(":checked");
            }), n(function(e) {
                var t = l.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && D.push("name" + te + "*[*^$|!~]?="), 
                e.querySelectorAll(":enabled").length || D.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), 
                D.push(",.*:");
            })), (m.matchesSelector = ve.test(I = $.matches || $.webkitMatchesSelector || $.mozMatchesSelector || $.oMatchesSelector || $.msMatchesSelector)) && n(function(e) {
                m.disconnectedMatch = I.call(e, "div"), I.call(e, "[s!='']:x"), A.push("!=", re);
            }), D = D.length && new RegExp(D.join("|")), A = A.length && new RegExp(A.join("|")), 
            t = ve.test($.compareDocumentPosition), O = t || ve.test($.contains) ? function(e, t) {
                var i = 9 === e.nodeType ? e.documentElement : e, n = t && t.parentNode;
                return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)));
            } : function(e, t) {
                if (t) for (;t = t.parentNode; ) if (t === e) return !0;
                return !1;
            }, X = t ? function(e, t) {
                if (e === t) return N = !0, 0;
                var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return i || (1 & (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !m.sortDetached && t.compareDocumentPosition(e) === i ? e === l || e.ownerDocument === _ && O(_, e) ? -1 : t === l || t.ownerDocument === _ && O(_, t) ? 1 : M ? Z.call(M, e) - Z.call(M, t) : 0 : 4 & i ? -1 : 1);
            } : function(e, t) {
                if (e === t) return N = !0, 0;
                var i, n = 0, a = e.parentNode, r = t.parentNode, s = [ e ], o = [ t ];
                if (!a || !r) return e === l ? -1 : t === l ? 1 : a ? -1 : r ? 1 : M ? Z.call(M, e) - Z.call(M, t) : 0;
                if (a === r) return d(e, t);
                for (i = e; i = i.parentNode; ) s.unshift(i);
                for (i = t; i = i.parentNode; ) o.unshift(i);
                for (;s[n] === o[n]; ) n++;
                return n ? d(s[n], o[n]) : s[n] === _ ? -1 : o[n] === _ ? 1 : 0;
            }, l) : P;
        }, x.matches = function(e, t) {
            return x(e, null, null, t);
        }, x.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== P && L(e), t = t.replace(de, "='$1']"), !(!m.matchesSelector || !z || A && A.test(t) || D && D.test(t))) try {
                var i = I.call(e, t);
                if (i || m.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
            } catch (e) {}
            return 0 < x(t, P, null, [ e ]).length;
        }, x.contains = function(e, t) {
            return (e.ownerDocument || e) !== P && L(e), O(e, t);
        }, x.attr = function(e, t) {
            (e.ownerDocument || e) !== P && L(e);
            var i = T.attrHandle[t.toLowerCase()], n = i && G.call(T.attrHandle, t.toLowerCase()) ? i(e, t, !z) : void 0;
            return void 0 !== n ? n : m.attributes || !z ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null;
        }, x.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }, x.uniqueSort = function(e) {
            var t, i = [], n = 0, a = 0;
            if (N = !m.detectDuplicates, M = !m.sortStable && e.slice(0), e.sort(X), N) {
                for (;t = e[a++]; ) t === e[a] && (n = i.push(a));
                for (;n--; ) e.splice(i[n], 1);
            }
            return M = null, e;
        }, g = x.getText = function(e) {
            var t, i = "", n = 0, a = e.nodeType;
            if (a) {
                if (1 === a || 9 === a || 11 === a) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) i += g(e);
                } else if (3 === a || 4 === a) return e.nodeValue;
            } else for (;t = e[n++]; ) i += g(t);
            return i;
        }, (T = x.selectors = {
            cacheLength: 50,
            createPseudo: l,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), 
                    "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || x.error(e[0]), 
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && x.error(e[0]), 
                    e;
                },
                PSEUDO: function(e) {
                    var t, i = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && ce.test(i) && (t = E(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), 
                    e[2] = i.slice(0, t)), e.slice(0, 3));
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(be, xe).toLowerCase();
                    return "*" === e ? function() {
                        return !0;
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function(e) {
                    var t = q[e + " "];
                    return t || (t = new RegExp("(^|" + te + ")" + e + "(" + te + "|$)")) && q(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== W && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(i, n, a) {
                    return function(e) {
                        var t = x.attr(e, i);
                        return null == t ? "!=" === n : !n || (t += "", "=" === n ? t === a : "!=" === n ? t !== a : "^=" === n ? a && 0 === t.indexOf(a) : "*=" === n ? a && -1 < t.indexOf(a) : "$=" === n ? a && t.slice(-a.length) === a : "~=" === n ? -1 < (" " + t + " ").indexOf(a) : "|=" === n && (t === a || t.slice(0, a.length + 1) === a + "-"));
                    };
                },
                CHILD: function(h, e, t, f, v) {
                    var m = "nth" !== h.slice(0, 3), g = "last" !== h.slice(-4), y = "of-type" === e;
                    return 1 === f && 0 === v ? function(e) {
                        return !!e.parentNode;
                    } : function(e, t, i) {
                        var n, a, r, s, o, l, d = m !== g ? "nextSibling" : "previousSibling", c = e.parentNode, u = y && e.nodeName.toLowerCase(), p = !i && !y;
                        if (c) {
                            if (m) {
                                for (;d; ) {
                                    for (r = e; r = r[d]; ) if (y ? r.nodeName.toLowerCase() === u : 1 === r.nodeType) return !1;
                                    l = d = "only" === h && !l && "nextSibling";
                                }
                                return !0;
                            }
                            if (l = [ g ? c.firstChild : c.lastChild ], g && p) {
                                for (o = (n = (a = c[H] || (c[H] = {}))[h] || [])[0] === j && n[1], s = n[0] === j && n[2], 
                                r = o && c.childNodes[o]; r = ++o && r && r[d] || (s = o = 0) || l.pop(); ) if (1 === r.nodeType && ++s && r === e) {
                                    a[h] = [ j, o, s ];
                                    break;
                                }
                            } else if (p && (n = (e[H] || (e[H] = {}))[h]) && n[0] === j) s = n[1]; else for (;(r = ++o && r && r[d] || (s = o = 0) || l.pop()) && ((y ? r.nodeName.toLowerCase() !== u : 1 !== r.nodeType) || !++s || (p && ((r[H] || (r[H] = {}))[h] = [ j, s ]), 
                            r !== e)); ) ;
                            return (s -= v) === f || s % f == 0 && 0 <= s / f;
                        }
                    };
                },
                PSEUDO: function(e, r) {
                    var t, s = T.pseudos[e] || T.setFilters[e.toLowerCase()] || x.error("unsupported pseudo: " + e);
                    return s[H] ? s(r) : 1 < s.length ? (t = [ e, e, "", r ], T.setFilters.hasOwnProperty(e.toLowerCase()) ? l(function(e, t) {
                        for (var i, n = s(e, r), a = n.length; a--; ) e[i = Z.call(e, n[a])] = !(t[i] = n[a]);
                    }) : function(e) {
                        return s(e, 0, t);
                    }) : s;
                }
            },
            pseudos: {
                not: l(function(e) {
                    var n = [], a = [], o = C(e.replace(se, "$1"));
                    return o[H] ? l(function(e, t, i, n) {
                        for (var a, r = o(e, null, n, []), s = e.length; s--; ) (a = r[s]) && (e[s] = !(t[s] = a));
                    }) : function(e, t, i) {
                        return n[0] = e, o(n, null, i, a), !a.pop();
                    };
                }),
                has: l(function(t) {
                    return function(e) {
                        return 0 < x(t, e).length;
                    };
                }),
                contains: l(function(t) {
                    return function(e) {
                        return -1 < (e.textContent || e.innerText || g(e)).indexOf(t);
                    };
                }),
                lang: l(function(i) {
                    return ue.test(i || "") || x.error("unsupported lang: " + i), i = i.replace(be, xe).toLowerCase(), 
                    function(e) {
                        var t;
                        do {
                            if (t = z ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === i || 0 === t.indexOf(i + "-");
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1;
                    };
                }),
                target: function(e) {
                    var t = i.location && i.location.hash;
                    return t && t.slice(1) === e.id;
                },
                root: function(e) {
                    return e === $;
                },
                focus: function(e) {
                    return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function(e) {
                    return !1 === e.disabled;
                },
                disabled: function(e) {
                    return !0 === e.disabled;
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected;
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(e) {
                    return !T.pseudos.empty(e);
                },
                header: function(e) {
                    return fe.test(e.nodeName);
                },
                input: function(e) {
                    return he.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t;
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                },
                first: s(function() {
                    return [ 0 ];
                }),
                last: s(function(e, t) {
                    return [ t - 1 ];
                }),
                eq: s(function(e, t, i) {
                    return [ i < 0 ? i + t : i ];
                }),
                even: s(function(e, t) {
                    for (var i = 0; i < t; i += 2) e.push(i);
                    return e;
                }),
                odd: s(function(e, t) {
                    for (var i = 1; i < t; i += 2) e.push(i);
                    return e;
                }),
                lt: s(function(e, t, i) {
                    for (var n = i < 0 ? i + t : i; 0 <= --n; ) e.push(n);
                    return e;
                }),
                gt: s(function(e, t, i) {
                    for (var n = i < 0 ? i + t : i; ++n < t; ) e.push(n);
                    return e;
                })
            }
        }).pseudos.nth = T.pseudos.eq, {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) T.pseudos[c] = a(c);
        for (c in {
            submit: !0,
            reset: !0
        }) T.pseudos[c] = r(c);
        return o.prototype = T.filters = T.pseudos, T.setFilters = new o(), E = x.tokenize = function(e, t) {
            var i, n, a, r, s, o, l, d = F[e + " "];
            if (d) return t ? 0 : d.slice(0);
            for (s = e, o = [], l = T.preFilter; s; ) {
                for (r in (!i || (n = oe.exec(s))) && (n && (s = s.slice(n[0].length) || s), o.push(a = [])), 
                i = !1, (n = le.exec(s)) && (i = n.shift(), a.push({
                    value: i,
                    type: n[0].replace(se, " ")
                }), s = s.slice(i.length)), T.filter) !(n = pe[r].exec(s)) || l[r] && !(n = l[r](n)) || (i = n.shift(), 
                a.push({
                    value: i,
                    type: r,
                    matches: n
                }), s = s.slice(i.length));
                if (!i) break;
            }
            return t ? s.length : s ? x.error(e) : F(e, o).slice(0);
        }, C = x.compile = function(e, t) {
            var i, m, g, y, b, n, a = [], r = [], s = R[e + " "];
            if (!s) {
                for (t || (t = E(e)), i = t.length; i--; ) (s = h(t[i]))[H] ? a.push(s) : r.push(s);
                (s = R(e, (m = r, y = 0 < (g = a).length, b = 0 < m.length, n = function(e, t, i, n, a) {
                    var r, s, o, l = 0, d = "0", c = e && [], u = [], p = k, h = e || b && T.find.TAG("*", a), f = j += null == p ? 1 : Math.random() || .1, v = h.length;
                    for (a && (k = t !== P && t); d !== v && null != (r = h[d]); d++) {
                        if (b && r) {
                            for (s = 0; o = m[s++]; ) if (o(r, t, i)) {
                                n.push(r);
                                break;
                            }
                            a && (j = f);
                        }
                        y && ((r = !o && r) && l--, e && c.push(r));
                    }
                    if (l += d, y && d !== l) {
                        for (s = 0; o = g[s++]; ) o(c, u, t, i);
                        if (e) {
                            if (0 < l) for (;d--; ) c[d] || u[d] || (u[d] = U.call(n));
                            u = w(u);
                        }
                        J.apply(n, u), a && !e && 0 < u.length && 1 < l + g.length && x.uniqueSort(n);
                    }
                    return a && (j = f, k = p), c;
                }, y ? l(n) : n))).selector = e;
            }
            return s;
        }, S = x.select = function(e, t, i, n) {
            var a, r, s, o, l, d = "function" == typeof e && e, c = !n && E(e = d.selector || e);
            if (i = i || [], 1 === c.length) {
                if (2 < (r = c[0] = c[0].slice(0)).length && "ID" === (s = r[0]).type && m.getById && 9 === t.nodeType && z && T.relative[r[1].type]) {
                    if (!(t = (T.find.ID(s.matches[0].replace(be, xe), t) || [])[0])) return i;
                    d && (t = t.parentNode), e = e.slice(r.shift().value.length);
                }
                for (a = pe.needsContext.test(e) ? 0 : r.length; a-- && (s = r[a], !T.relative[o = s.type]); ) if ((l = T.find[o]) && (n = l(s.matches[0].replace(be, xe), ge.test(r[0].type) && f(t.parentNode) || t))) {
                    if (r.splice(a, 1), !(e = n.length && v(r))) return J.apply(i, n), i;
                    break;
                }
            }
            return (d || C(e, c))(n, t, !z, i, ge.test(e) && f(t.parentNode) || t), i;
        }, m.sortStable = H.split("").sort(X).join("") === H, m.detectDuplicates = !!N, 
        L(), m.sortDetached = n(function(e) {
            return 1 & e.compareDocumentPosition(P.createElement("div"));
        }), n(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || t("type|href|height|width", function(e, t, i) {
            return i ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), m.attributes && n(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || t("value", function(e, t, i) {
            return i || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
        }), n(function(e) {
            return null == e.getAttribute("disabled");
        }) || t(ee, function(e, t, i) {
            var n;
            return i ? void 0 : !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null;
        }), x;
    }(f);
    Q.find = ne, Q.expr = ne.selectors, Q.expr[":"] = Q.expr.pseudos, Q.unique = ne.uniqueSort, 
    Q.text = ne.getText, Q.isXMLDoc = ne.isXML, Q.contains = ne.contains;
    var ae = Q.expr.match.needsContext, re = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, se = /^.[^:#\[\.,]*$/;
    Q.filter = function(e, t, i) {
        var n = t[0];
        return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? Q.find.matchesSelector(n, e) ? [ n ] : [] : Q.find.matches(e, Q.grep(t, function(e) {
            return 1 === e.nodeType;
        }));
    }, Q.fn.extend({
        find: function(e) {
            var t, i = [], n = this, a = n.length;
            if ("string" != typeof e) return this.pushStack(Q(e).filter(function() {
                for (t = 0; t < a; t++) if (Q.contains(n[t], this)) return !0;
            }));
            for (t = 0; t < a; t++) Q.find(e, n[t], i);
            return (i = this.pushStack(1 < a ? Q.unique(i) : i)).selector = this.selector ? this.selector + " " + e : e, 
            i;
        },
        filter: function(e) {
            return this.pushStack(t(this, e || [], !1));
        },
        not: function(e) {
            return this.pushStack(t(this, e || [], !0));
        },
        is: function(e) {
            return !!t(this, "string" == typeof e && ae.test(e) ? Q(e) : e || [], !1).length;
        }
    });
    var oe, le = f.document, de = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (Q.fn.init = function(e, t) {
        var i, n;
        if (!e) return this;
        if ("string" == typeof e) {
            if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && 3 <= e.length ? [ null, e, null ] : de.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || oe).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof Q ? t[0] : t, Q.merge(this, Q.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : le, !0)), 
                re.test(i[1]) && Q.isPlainObject(t)) for (i in t) Q.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this;
            }
            if ((n = le.getElementById(i[2])) && n.parentNode) {
                if (n.id !== i[2]) return oe.find(e);
                this.length = 1, this[0] = n;
            }
            return this.context = le, this.selector = e, this;
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Q.isFunction(e) ? void 0 !== oe.ready ? oe.ready(e) : e(Q) : (void 0 !== e.selector && (this.selector = e.selector, 
        this.context = e.context), Q.makeArray(e, this));
    }).prototype = Q.fn, oe = Q(le);
    var ce = /^(?:parents|prev(?:Until|All))/, ue = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    Q.extend({
        dir: function(e, t, i) {
            for (var n = [], a = e[t]; a && 9 !== a.nodeType && (void 0 === i || 1 !== a.nodeType || !Q(a).is(i)); ) 1 === a.nodeType && n.push(a), 
            a = a[t];
            return n;
        },
        sibling: function(e, t) {
            for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
            return i;
        }
    }), Q.fn.extend({
        has: function(e) {
            var t, i = Q(e, this), n = i.length;
            return this.filter(function() {
                for (t = 0; t < n; t++) if (Q.contains(this, i[t])) return !0;
            });
        },
        closest: function(e, t) {
            for (var i, n = 0, a = this.length, r = [], s = ae.test(e) || "string" != typeof e ? Q(e, t || this.context) : 0; n < a; n++) for (i = this[n]; i && i !== t; i = i.parentNode) if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && Q.find.matchesSelector(i, e))) {
                r.push(i);
                break;
            }
            return this.pushStack(1 < r.length ? Q.unique(r) : r);
        },
        index: function(e) {
            return e ? "string" == typeof e ? Q.inArray(this[0], Q(e)) : Q.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e, t) {
            return this.pushStack(Q.unique(Q.merge(this.get(), Q(e, t))));
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        }
    }), Q.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
        },
        parents: function(e) {
            return Q.dir(e, "parentNode");
        },
        parentsUntil: function(e, t, i) {
            return Q.dir(e, "parentNode", i);
        },
        next: function(e) {
            return i(e, "nextSibling");
        },
        prev: function(e) {
            return i(e, "previousSibling");
        },
        nextAll: function(e) {
            return Q.dir(e, "nextSibling");
        },
        prevAll: function(e) {
            return Q.dir(e, "previousSibling");
        },
        nextUntil: function(e, t, i) {
            return Q.dir(e, "nextSibling", i);
        },
        prevUntil: function(e, t, i) {
            return Q.dir(e, "previousSibling", i);
        },
        siblings: function(e) {
            return Q.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return Q.sibling(e.firstChild);
        },
        contents: function(e) {
            return Q.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : Q.merge([], e.childNodes);
        }
    }, function(n, a) {
        Q.fn[n] = function(e, t) {
            var i = Q.map(this, a, e);
            return "Until" !== n.slice(-5) && (t = e), t && "string" == typeof t && (i = Q.filter(t, i)), 
            1 < this.length && (ue[n] || (i = Q.unique(i)), ce.test(n) && (i = i.reverse())), 
            this.pushStack(i);
        };
    });
    var pe, he = /\S+/g, fe = {};
    Q.Callbacks = function(a) {
        var e, i;
        a = "string" == typeof a ? fe[a] || (i = fe[e = a] = {}, Q.each(e.match(he) || [], function(e, t) {
            i[t] = !0;
        }), i) : Q.extend({}, a);
        var n, t, r, s, o, l, d = [], c = !a.once && [], u = function(e) {
            for (t = a.memory && e, r = !0, o = l || 0, l = 0, s = d.length, n = !0; d && o < s; o++) if (!1 === d[o].apply(e[0], e[1]) && a.stopOnFalse) {
                t = !1;
                break;
            }
            n = !1, d && (c ? c.length && u(c.shift()) : t ? d = [] : p.disable());
        }, p = {
            add: function() {
                if (d) {
                    var e = d.length;
                    !function n(e) {
                        Q.each(e, function(e, t) {
                            var i = Q.type(t);
                            "function" === i ? a.unique && p.has(t) || d.push(t) : t && t.length && "string" !== i && n(t);
                        });
                    }(arguments), n ? s = d.length : t && (l = e, u(t));
                }
                return this;
            },
            remove: function() {
                return d && Q.each(arguments, function(e, t) {
                    for (var i; -1 < (i = Q.inArray(t, d, i)); ) d.splice(i, 1), n && (i <= s && s--, 
                    i <= o && o--);
                }), this;
            },
            has: function(e) {
                return e ? -1 < Q.inArray(e, d) : !(!d || !d.length);
            },
            empty: function() {
                return d = [], s = 0, this;
            },
            disable: function() {
                return d = c = t = void 0, this;
            },
            disabled: function() {
                return !d;
            },
            lock: function() {
                return c = void 0, t || p.disable(), this;
            },
            locked: function() {
                return !c;
            },
            fireWith: function(e, t) {
                return !d || r && !c || (t = [ e, (t = t || []).slice ? t.slice() : t ], n ? c.push(t) : u(t)), 
                this;
            },
            fire: function() {
                return p.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!r;
            }
        };
        return p;
    }, Q.extend({
        Deferred: function(e) {
            var r = [ [ "resolve", "done", Q.Callbacks("once memory"), "resolved" ], [ "reject", "fail", Q.Callbacks("once memory"), "rejected" ], [ "notify", "progress", Q.Callbacks("memory") ] ], a = "pending", s = {
                state: function() {
                    return a;
                },
                always: function() {
                    return o.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return Q.Deferred(function(n) {
                        Q.each(r, function(e, t) {
                            var i = Q.isFunction(a[e]) && a[e];
                            o[t[1]](function() {
                                var e = i && i.apply(this, arguments);
                                e && Q.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[t[0] + "With"](this === s ? n.promise() : this, i ? [ e ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                promise: function(e) {
                    return null != e ? Q.extend(e, s) : s;
                }
            }, o = {};
            return s.pipe = s.then, Q.each(r, function(e, t) {
                var i = t[2], n = t[3];
                s[t[1]] = i.add, n && i.add(function() {
                    a = n;
                }, r[1 ^ e][2].disable, r[2][2].lock), o[t[0]] = function() {
                    return o[t[0] + "With"](this === o ? s : this, arguments), this;
                }, o[t[0] + "With"] = i.fireWith;
            }), s.promise(o), e && e.call(o, o), o;
        },
        when: function(e) {
            var a, t, i, n = 0, r = R.call(arguments), s = r.length, o = 1 !== s || e && Q.isFunction(e.promise) ? s : 0, l = 1 === o ? e : Q.Deferred(), d = function(t, i, n) {
                return function(e) {
                    i[t] = this, n[t] = 1 < arguments.length ? R.call(arguments) : e, n === a ? l.notifyWith(i, n) : --o || l.resolveWith(i, n);
                };
            };
            if (1 < s) for (a = new Array(s), t = new Array(s), i = new Array(s); n < s; n++) r[n] && Q.isFunction(r[n].promise) ? r[n].promise().done(d(n, i, r)).fail(l.reject).progress(d(n, t, a)) : --o;
            return o || l.resolveWith(i, r), l.promise();
        }
    }), Q.fn.ready = function(e) {
        return Q.ready.promise().done(e), this;
    }, Q.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? Q.readyWait++ : Q.ready(!0);
        },
        ready: function(e) {
            if (!0 === e ? !--Q.readyWait : !Q.isReady) {
                if (!le.body) return setTimeout(Q.ready);
                (Q.isReady = !0) !== e && 0 < --Q.readyWait || (pe.resolveWith(le, [ Q ]), Q.fn.triggerHandler && (Q(le).triggerHandler("ready"), 
                Q(le).off("ready")));
            }
        }
    }), Q.ready.promise = function(e) {
        if (!pe) if (pe = Q.Deferred(), "complete" === le.readyState) setTimeout(Q.ready); else if (le.addEventListener) le.addEventListener("DOMContentLoaded", a, !1), 
        f.addEventListener("load", a, !1); else {
            le.attachEvent("onreadystatechange", a), f.attachEvent("onload", a);
            var i = !1;
            try {
                i = null == f.frameElement && le.documentElement;
            } catch (e) {}
            i && i.doScroll && function t() {
                if (!Q.isReady) {
                    try {
                        i.doScroll("left");
                    } catch (e) {
                        return setTimeout(t, 50);
                    }
                    n(), Q.ready();
                }
            }();
        }
        return pe.promise(e);
    };
    var ve, me = "undefined";
    for (ve in Q(K)) break;
    K.ownLast = "0" !== ve, K.inlineBlockNeedsLayout = !1, Q(function() {
        var e, t, i, n;
        (i = le.getElementsByTagName("body")[0]) && i.style && (t = le.createElement("div"), 
        (n = le.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        i.appendChild(n).appendChild(t), typeof t.style.zoom !== me && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        K.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (i.style.zoom = 1)), i.removeChild(n));
    }), function() {
        var e = le.createElement("div");
        if (null == K.deleteExpando) {
            K.deleteExpando = !0;
            try {
                delete e.test;
            } catch (e) {
                K.deleteExpando = !1;
            }
        }
        e = null;
    }(), Q.acceptData = function(e) {
        var t = Q.noData[(e.nodeName + " ").toLowerCase()], i = +e.nodeType || 1;
        return (1 === i || 9 === i) && (!t || !0 !== t && e.getAttribute("classid") === t);
    };
    var ge = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ye = /([A-Z])/g;
    Q.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return !!(e = e.nodeType ? Q.cache[e[Q.expando]] : e[Q.expando]) && !d(e);
        },
        data: function(e, t, i) {
            return r(e, t, i);
        },
        removeData: function(e, t) {
            return s(e, t);
        },
        _data: function(e, t, i) {
            return r(e, t, i, !0);
        },
        _removeData: function(e, t) {
            return s(e, t, !0);
        }
    }), Q.fn.extend({
        data: function(e, t) {
            var i, n, a, r = this[0], s = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (a = Q.data(r), 1 === r.nodeType && !Q._data(r, "parsedAttrs"))) {
                    for (i = s.length; i--; ) s[i] && (0 === (n = s[i].name).indexOf("data-") && l(r, n = Q.camelCase(n.slice(5)), a[n]));
                    Q._data(r, "parsedAttrs", !0);
                }
                return a;
            }
            return "object" == typeof e ? this.each(function() {
                Q.data(this, e);
            }) : 1 < arguments.length ? this.each(function() {
                Q.data(this, e, t);
            }) : r ? l(r, e, Q.data(r, e)) : void 0;
        },
        removeData: function(e) {
            return this.each(function() {
                Q.removeData(this, e);
            });
        }
    }), Q.extend({
        queue: function(e, t, i) {
            var n;
            return e ? (t = (t || "fx") + "queue", n = Q._data(e, t), i && (!n || Q.isArray(i) ? n = Q._data(e, t, Q.makeArray(i)) : n.push(i)), 
            n || []) : void 0;
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var i = Q.queue(e, t), n = i.length, a = i.shift(), r = Q._queueHooks(e, t);
            "inprogress" === a && (a = i.shift(), n--), a && ("fx" === t && i.unshift("inprogress"), 
            delete r.stop, a.call(e, function() {
                Q.dequeue(e, t);
            }, r)), !n && r && r.empty.fire();
        },
        _queueHooks: function(e, t) {
            var i = t + "queueHooks";
            return Q._data(e, i) || Q._data(e, i, {
                empty: Q.Callbacks("once memory").add(function() {
                    Q._removeData(e, t + "queue"), Q._removeData(e, i);
                })
            });
        }
    }), Q.fn.extend({
        queue: function(t, i) {
            var e = 2;
            return "string" != typeof t && (i = t, t = "fx", e--), arguments.length < e ? Q.queue(this[0], t) : void 0 === i ? this : this.each(function() {
                var e = Q.queue(this, t, i);
                Q._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && Q.dequeue(this, t);
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                Q.dequeue(this, e);
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, t) {
            var i, n = 1, a = Q.Deferred(), r = this, s = this.length, o = function() {
                --n || a.resolveWith(r, [ r ]);
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--; ) (i = Q._data(r[s], e + "queueHooks")) && i.empty && (n++, 
            i.empty.add(o));
            return o(), a.promise(t);
        }
    });
    var be = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, xe = [ "Top", "Right", "Bottom", "Left" ], we = function(e, t) {
        return e = t || e, "none" === Q.css(e, "display") || !Q.contains(e.ownerDocument, e);
    }, Te = Q.access = function(e, t, i, n, a, r, s) {
        var o = 0, l = e.length, d = null == i;
        if ("object" === Q.type(i)) for (o in a = !0, i) Q.access(e, t, o, i[o], !0, r, s); else if (void 0 !== n && (a = !0, 
        Q.isFunction(n) || (s = !0), d && (s ? (t.call(e, n), t = null) : (d = t, t = function(e, t, i) {
            return d.call(Q(e), i);
        })), t)) for (;o < l; o++) t(e[o], i, s ? n : n.call(e[o], o, t(e[o], i)));
        return a ? e : d ? t.call(e) : l ? t(e[0], i) : r;
    }, Ee = /^(?:checkbox|radio)$/i;
    !function() {
        var e = le.createElement("input"), t = le.createElement("div"), i = le.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        K.leadingWhitespace = 3 === t.firstChild.nodeType, K.tbody = !t.getElementsByTagName("tbody").length, 
        K.htmlSerialize = !!t.getElementsByTagName("link").length, K.html5Clone = "<:nav></:nav>" !== le.createElement("nav").cloneNode(!0).outerHTML, 
        e.type = "checkbox", e.checked = !0, i.appendChild(e), K.appendChecked = e.checked, 
        t.innerHTML = "<textarea>x</textarea>", K.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, 
        i.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", 
        K.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, K.noCloneEvent = !0, 
        t.attachEvent && (t.attachEvent("onclick", function() {
            K.noCloneEvent = !1;
        }), t.cloneNode(!0).click()), null == K.deleteExpando) {
            K.deleteExpando = !0;
            try {
                delete t.test;
            } catch (e) {
                K.deleteExpando = !1;
            }
        }
    }(), function() {
        var e, t, i = le.createElement("div");
        for (e in {
            submit: !0,
            change: !0,
            focusin: !0
        }) t = "on" + e, (K[e + "Bubbles"] = t in f) || (i.setAttribute(t, "t"), K[e + "Bubbles"] = !1 === i.attributes[t].expando);
        i = null;
    }();
    var Ce = /^(?:input|select|textarea)$/i, Se = /^key/, ke = /^(?:mouse|pointer|contextmenu)|click/, Me = /^(?:focusinfocus|focusoutblur)$/, Ne = /^([^.]*)(?:\.(.+)|)$/;
    Q.event = {
        global: {},
        add: function(e, t, i, n, a) {
            var r, s, o, l, d, c, u, p, h, f, v, m = Q._data(e);
            if (m) {
                for (i.handler && (i = (l = i).handler, a = l.selector), i.guid || (i.guid = Q.guid++), 
                (s = m.events) || (s = m.events = {}), (c = m.handle) || ((c = m.handle = function(e) {
                    return typeof Q === me || e && Q.event.triggered === e.type ? void 0 : Q.event.dispatch.apply(c.elem, arguments);
                }).elem = e), o = (t = (t || "").match(he) || [ "" ]).length; o--; ) h = v = (r = Ne.exec(t[o]) || [])[1], 
                f = (r[2] || "").split(".").sort(), h && (d = Q.event.special[h] || {}, h = (a ? d.delegateType : d.bindType) || h, 
                d = Q.event.special[h] || {}, u = Q.extend({
                    type: h,
                    origType: v,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: a,
                    needsContext: a && Q.expr.match.needsContext.test(a),
                    namespace: f.join(".")
                }, l), (p = s[h]) || ((p = s[h] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, n, f, c) || (e.addEventListener ? e.addEventListener(h, c, !1) : e.attachEvent && e.attachEvent("on" + h, c))), 
                d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = i.guid)), a ? p.splice(p.delegateCount++, 0, u) : p.push(u), 
                Q.event.global[h] = !0);
                e = null;
            }
        },
        remove: function(e, t, i, n, a) {
            var r, s, o, l, d, c, u, p, h, f, v, m = Q.hasData(e) && Q._data(e);
            if (m && (c = m.events)) {
                for (d = (t = (t || "").match(he) || [ "" ]).length; d--; ) if (h = v = (o = Ne.exec(t[d]) || [])[1], 
                f = (o[2] || "").split(".").sort(), h) {
                    for (u = Q.event.special[h] || {}, p = c[h = (n ? u.delegateType : u.bindType) || h] || [], 
                    o = o[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--; ) s = p[r], 
                    !a && v !== s.origType || i && i.guid !== s.guid || o && !o.test(s.namespace) || n && n !== s.selector && ("**" !== n || !s.selector) || (p.splice(r, 1), 
                    s.selector && p.delegateCount--, u.remove && u.remove.call(e, s));
                    l && !p.length && (u.teardown && !1 !== u.teardown.call(e, f, m.handle) || Q.removeEvent(e, h, m.handle), 
                    delete c[h]);
                } else for (h in c) Q.event.remove(e, h + t[d], i, n, !0);
                Q.isEmptyObject(c) && (delete m.handle, Q._removeData(e, "events"));
            }
        },
        trigger: function(e, t, i, n) {
            var a, r, s, o, l, d, c, u = [ i || le ], p = U.call(e, "type") ? e.type : e, h = U.call(e, "namespace") ? e.namespace.split(".") : [];
            if (s = d = i = i || le, 3 !== i.nodeType && 8 !== i.nodeType && !Me.test(p + Q.event.triggered) && (0 <= p.indexOf(".") && (p = (h = p.split(".")).shift(), 
            h.sort()), r = p.indexOf(":") < 0 && "on" + p, (e = e[Q.expando] ? e : new Q.Event(p, "object" == typeof e && e)).isTrigger = n ? 2 : 3, 
            e.namespace = h.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            e.result = void 0, e.target || (e.target = i), t = null == t ? [ e ] : Q.makeArray(t, [ e ]), 
            l = Q.event.special[p] || {}, n || !l.trigger || !1 !== l.trigger.apply(i, t))) {
                if (!n && !l.noBubble && !Q.isWindow(i)) {
                    for (o = l.delegateType || p, Me.test(o + p) || (s = s.parentNode); s; s = s.parentNode) u.push(s), 
                    d = s;
                    d === (i.ownerDocument || le) && u.push(d.defaultView || d.parentWindow || f);
                }
                for (c = 0; (s = u[c++]) && !e.isPropagationStopped(); ) e.type = 1 < c ? o : l.bindType || p, 
                (a = (Q._data(s, "events") || {})[e.type] && Q._data(s, "handle")) && a.apply(s, t), 
                (a = r && s[r]) && a.apply && Q.acceptData(s) && (e.result = a.apply(s, t), !1 === e.result && e.preventDefault());
                if (e.type = p, !n && !e.isDefaultPrevented() && (!l._default || !1 === l._default.apply(u.pop(), t)) && Q.acceptData(i) && r && i[p] && !Q.isWindow(i)) {
                    (d = i[r]) && (i[r] = null), Q.event.triggered = p;
                    try {
                        i[p]();
                    } catch (e) {}
                    Q.event.triggered = void 0, d && (i[r] = d);
                }
                return e.result;
            }
        },
        dispatch: function(e) {
            e = Q.event.fix(e);
            var t, i, n, a, r, s = [], o = R.call(arguments), l = (Q._data(this, "events") || {})[e.type] || [], d = Q.event.special[e.type] || {};
            if ((o[0] = e).delegateTarget = this, !d.preDispatch || !1 !== d.preDispatch.call(this, e)) {
                for (s = Q.event.handlers.call(this, e, l), t = 0; (a = s[t++]) && !e.isPropagationStopped(); ) for (e.currentTarget = a.elem, 
                r = 0; (n = a.handlers[r++]) && !e.isImmediatePropagationStopped(); ) (!e.namespace_re || e.namespace_re.test(n.namespace)) && (e.handleObj = n, 
                e.data = n.data, void 0 !== (i = ((Q.event.special[n.origType] || {}).handle || n.handler).apply(a.elem, o)) && !1 === (e.result = i) && (e.preventDefault(), 
                e.stopPropagation()));
                return d.postDispatch && d.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function(e, t) {
            var i, n, a, r, s = [], o = t.delegateCount, l = e.target;
            if (o && l.nodeType && (!e.button || "click" !== e.type)) for (;l != this; l = l.parentNode || this) if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                for (a = [], r = 0; r < o; r++) void 0 === a[i = (n = t[r]).selector + " "] && (a[i] = n.needsContext ? 0 <= Q(i, this).index(l) : Q.find(i, this, null, [ l ]).length), 
                a[i] && a.push(n);
                a.length && s.push({
                    elem: l,
                    handlers: a
                });
            }
            return o < t.length && s.push({
                elem: this,
                handlers: t.slice(o)
            }), s;
        },
        fix: function(e) {
            if (e[Q.expando]) return e;
            var t, i, n, a = e.type, r = e, s = this.fixHooks[a];
            for (s || (this.fixHooks[a] = s = ke.test(a) ? this.mouseHooks : Se.test(a) ? this.keyHooks : {}), 
            n = s.props ? this.props.concat(s.props) : this.props, e = new Q.Event(r), t = n.length; t--; ) e[i = n[t]] = r[i];
            return e.target || (e.target = r.srcElement || le), 3 === e.target.nodeType && (e.target = e.target.parentNode), 
            e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), 
                e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var i, n, a, r = t.button, s = t.fromElement;
                return null == e.pageX && null != t.clientX && (a = (n = e.target.ownerDocument || le).documentElement, 
                i = n.body, e.pageX = t.clientX + (a && a.scrollLeft || i && i.scrollLeft || 0) - (a && a.clientLeft || i && i.clientLeft || 0), 
                e.pageY = t.clientY + (a && a.scrollTop || i && i.scrollTop || 0) - (a && a.clientTop || i && i.clientTop || 0)), 
                !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), 
                e;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== p() && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === p() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return Q.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(e) {
                    return Q.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                }
            }
        },
        simulate: function(e, t, i, n) {
            var a = Q.extend(new Q.Event(), i, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            n ? Q.event.trigger(a, null, t) : Q.event.dispatch.call(t, a), a.isDefaultPrevented() && i.preventDefault();
        }
    }, Q.removeEvent = le.removeEventListener ? function(e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i, !1);
    } : function(e, t, i) {
        var n = "on" + t;
        e.detachEvent && (typeof e[n] === me && (e[n] = null), e.detachEvent(n, i));
    }, Q.Event = function(e, t) {
        return this instanceof Q.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, 
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? c : u) : this.type = e, 
        t && Q.extend(this, t), this.timeStamp = e && e.timeStamp || Q.now(), void (this[Q.expando] = !0)) : new Q.Event(e, t);
    }, Q.Event.prototype = {
        isDefaultPrevented: u,
        isPropagationStopped: u,
        isImmediatePropagationStopped: u,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = c, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = c, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = c, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, Q.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, a) {
        Q.event.special[e] = {
            delegateType: a,
            bindType: a,
            handle: function(e) {
                var t, i = e.relatedTarget, n = e.handleObj;
                return (!i || i !== this && !Q.contains(this, i)) && (e.type = n.origType, t = n.handler.apply(this, arguments), 
                e.type = a), t;
            }
        };
    }), K.submitBubbles || (Q.event.special.submit = {
        setup: function() {
            return !Q.nodeName(this, "form") && void Q.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target, i = Q.nodeName(t, "input") || Q.nodeName(t, "button") ? t.form : void 0;
                i && !Q._data(i, "submitBubbles") && (Q.event.add(i, "submit._submit", function(e) {
                    e._submit_bubble = !0;
                }), Q._data(i, "submitBubbles", !0));
            });
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && Q.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function() {
            return !Q.nodeName(this, "form") && void Q.event.remove(this, "._submit");
        }
    }), K.changeBubbles || (Q.event.special.change = {
        setup: function() {
            return Ce.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (Q.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0);
            }), Q.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), Q.event.simulate("change", this, e, !0);
            })), !1) : void Q.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Ce.test(t.nodeName) && !Q._data(t, "changeBubbles") && (Q.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || Q.event.simulate("change", this.parentNode, e, !0);
                }), Q._data(t, "changeBubbles", !0));
            });
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return Q.event.remove(this, "._change"), !Ce.test(this.nodeName);
        }
    }), K.focusinBubbles || Q.each({
        focus: "focusin",
        blur: "focusout"
    }, function(i, n) {
        var a = function(e) {
            Q.event.simulate(n, e.target, Q.event.fix(e), !0);
        };
        Q.event.special[n] = {
            setup: function() {
                var e = this.ownerDocument || this, t = Q._data(e, n);
                t || e.addEventListener(i, a, !0), Q._data(e, n, (t || 0) + 1);
            },
            teardown: function() {
                var e = this.ownerDocument || this, t = Q._data(e, n) - 1;
                t ? Q._data(e, n, t) : (e.removeEventListener(i, a, !0), Q._removeData(e, n));
            }
        };
    }), Q.fn.extend({
        on: function(e, t, i, n, a) {
            var r, s;
            if ("object" == typeof e) {
                for (r in "string" != typeof t && (i = i || t, t = void 0), e) this.on(r, t, i, e[r], a);
                return this;
            }
            if (null == i && null == n ? (n = t, i = t = void 0) : null == n && ("string" == typeof t ? (n = i, 
            i = void 0) : (n = i, i = t, t = void 0)), !1 === n) n = u; else if (!n) return this;
            return 1 === a && (s = n, (n = function(e) {
                return Q().off(e), s.apply(this, arguments);
            }).guid = s.guid || (s.guid = Q.guid++)), this.each(function() {
                Q.event.add(this, e, n, i, t);
            });
        },
        one: function(e, t, i, n) {
            return this.on(e, t, i, n, 1);
        },
        off: function(e, t, i) {
            var n, a;
            if (e && e.preventDefault && e.handleObj) return n = e.handleObj, Q(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), 
            this;
            if ("object" == typeof e) {
                for (a in e) this.off(a, t, e[a]);
                return this;
            }
            return (!1 === t || "function" == typeof t) && (i = t, t = void 0), !1 === i && (i = u), 
            this.each(function() {
                Q.event.remove(this, e, i, t);
            });
        },
        trigger: function(e, t) {
            return this.each(function() {
                Q.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, t) {
            var i = this[0];
            return i ? Q.event.trigger(e, t, i, !0) : void 0;
        }
    });
    var Le = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Pe = / jQuery\d+="(?:null|\d+)"/g, $e = new RegExp("<(?:" + Le + ")[\\s/>]", "i"), ze = /^\s+/, De = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Ae = /<([\w:]+)/, Ie = /<tbody/i, Oe = /<|&#?\w+;/, He = /<(?:script|style|link)/i, _e = /checked\s*(?:[^=]|=\s*.checked.)/i, je = /^$|\/(?:java|ecma)script/i, Be = /^true\/(.*)/, qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Fe = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: K.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, Re = v(le).appendChild(le.createElement("div"));
    Fe.optgroup = Fe.option, Fe.tbody = Fe.tfoot = Fe.colgroup = Fe.caption = Fe.thead, 
    Fe.th = Fe.td, Q.extend({
        clone: function(e, t, i) {
            var n, a, r, s, o, l = Q.contains(e.ownerDocument, e);
            if (K.html5Clone || Q.isXMLDoc(e) || !$e.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (Re.innerHTML = e.outerHTML, 
            Re.removeChild(r = Re.firstChild)), !(K.noCloneEvent && K.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Q.isXMLDoc(e))) for (n = m(r), 
            o = m(e), s = 0; null != (a = o[s]); ++s) n[s] && T(a, n[s]);
            if (t) if (i) for (o = o || m(e), n = n || m(r), s = 0; null != (a = o[s]); s++) w(a, n[s]); else w(e, r);
            return 0 < (n = m(r, "script")).length && x(n, !l && m(e, "script")), n = o = a = null, 
            r;
        },
        buildFragment: function(e, t, i, n) {
            for (var a, r, s, o, l, d, c, u = e.length, p = v(t), h = [], f = 0; f < u; f++) if ((r = e[f]) || 0 === r) if ("object" === Q.type(r)) Q.merge(h, r.nodeType ? [ r ] : r); else if (Oe.test(r)) {
                for (o = o || p.appendChild(t.createElement("div")), l = (Ae.exec(r) || [ "", "" ])[1].toLowerCase(), 
                c = Fe[l] || Fe._default, o.innerHTML = c[1] + r.replace(De, "<$1></$2>") + c[2], 
                a = c[0]; a--; ) o = o.lastChild;
                if (!K.leadingWhitespace && ze.test(r) && h.push(t.createTextNode(ze.exec(r)[0])), 
                !K.tbody) for (a = (r = "table" !== l || Ie.test(r) ? "<table>" !== c[1] || Ie.test(r) ? 0 : o : o.firstChild) && r.childNodes.length; a--; ) Q.nodeName(d = r.childNodes[a], "tbody") && !d.childNodes.length && r.removeChild(d);
                for (Q.merge(h, o.childNodes), o.textContent = ""; o.firstChild; ) o.removeChild(o.firstChild);
                o = p.lastChild;
            } else h.push(t.createTextNode(r));
            for (o && p.removeChild(o), K.appendChecked || Q.grep(m(h, "input"), g), f = 0; r = h[f++]; ) if ((!n || -1 === Q.inArray(r, n)) && (s = Q.contains(r.ownerDocument, r), 
            o = m(p.appendChild(r), "script"), s && x(o), i)) for (a = 0; r = o[a++]; ) je.test(r.type || "") && i.push(r);
            return o = null, p;
        },
        cleanData: function(e, t) {
            for (var i, n, a, r, s = 0, o = Q.expando, l = Q.cache, d = K.deleteExpando, c = Q.event.special; null != (i = e[s]); s++) if ((t || Q.acceptData(i)) && (r = (a = i[o]) && l[a])) {
                if (r.events) for (n in r.events) c[n] ? Q.event.remove(i, n) : Q.removeEvent(i, n, r.handle);
                l[a] && (delete l[a], d ? delete i[o] : typeof i.removeAttribute !== me ? i.removeAttribute(o) : i[o] = null, 
                F.push(a));
            }
        }
    }), Q.fn.extend({
        text: function(e) {
            return Te(this, function(e) {
                return void 0 === e ? Q.text(this) : this.empty().append((this[0] && this[0].ownerDocument || le).createTextNode(e));
            }, null, e, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || h(this, e).appendChild(e);
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        },
        remove: function(e, t) {
            for (var i, n = e ? Q.filter(e, this) : this, a = 0; null != (i = n[a]); a++) t || 1 !== i.nodeType || Q.cleanData(m(i)), 
            i.parentNode && (t && Q.contains(i.ownerDocument, i) && x(m(i, "script")), i.parentNode.removeChild(i));
            return this;
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && Q.cleanData(m(e, !1)); e.firstChild; ) e.removeChild(e.firstChild);
                e.options && Q.nodeName(e, "select") && (e.options.length = 0);
            }
            return this;
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return Q.clone(this, e, t);
            });
        },
        html: function(e) {
            return Te(this, function(e) {
                var t = this[0] || {}, i = 0, n = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Pe, "") : void 0;
                if (!("string" != typeof e || He.test(e) || !K.htmlSerialize && $e.test(e) || !K.leadingWhitespace && ze.test(e) || Fe[(Ae.exec(e) || [ "", "" ])[1].toLowerCase()])) {
                    e = e.replace(De, "<$1></$2>");
                    try {
                        for (;i < n; i++) 1 === (t = this[i] || {}).nodeType && (Q.cleanData(m(t, !1)), 
                        t.innerHTML = e);
                        t = 0;
                    } catch (e) {}
                }
                t && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, Q.cleanData(m(this)), t && t.replaceChild(e, this);
            }), t && (t.length || t.nodeType) ? this : this.remove();
        },
        detach: function(e) {
            return this.remove(e, !0);
        },
        domManip: function(i, n) {
            i = X.apply([], i);
            var e, t, a, r, s, o, l = 0, d = this.length, c = this, u = d - 1, p = i[0], h = Q.isFunction(p);
            if (h || 1 < d && "string" == typeof p && !K.checkClone && _e.test(p)) return this.each(function(e) {
                var t = c.eq(e);
                h && (i[0] = p.call(this, e, t.html())), t.domManip(i, n);
            });
            if (d && (e = (o = Q.buildFragment(i, this[0].ownerDocument, !1, this)).firstChild, 
            1 === o.childNodes.length && (o = e), e)) {
                for (a = (r = Q.map(m(o, "script"), y)).length; l < d; l++) t = o, l !== u && (t = Q.clone(t, !0, !0), 
                a && Q.merge(r, m(t, "script"))), n.call(this[l], t, l);
                if (a) for (s = r[r.length - 1].ownerDocument, Q.map(r, b), l = 0; l < a; l++) t = r[l], 
                je.test(t.type || "") && !Q._data(t, "globalEval") && Q.contains(s, t) && (t.src ? Q._evalUrl && Q._evalUrl(t.src) : Q.globalEval((t.text || t.textContent || t.innerHTML || "").replace(qe, "")));
                o = e = null;
            }
            return this;
        }
    }), Q.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, s) {
        Q.fn[e] = function(e) {
            for (var t, i = 0, n = [], a = Q(e), r = a.length - 1; i <= r; i++) t = i === r ? this : this.clone(!0), 
            Q(a[i])[s](t), W.apply(n, t.get());
            return this.pushStack(n);
        };
    });
    var Xe, We, Ve = {};
    K.shrinkWrapBlocks = function() {
        return null != We ? We : (We = !1, (t = le.getElementsByTagName("body")[0]) && t.style ? (e = le.createElement("div"), 
        (i = le.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        t.appendChild(i).appendChild(e), typeof e.style.zoom !== me && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        e.appendChild(le.createElement("div")).style.width = "5px", We = 3 !== e.offsetWidth), 
        t.removeChild(i), We) : void 0);
        var e, t, i;
    };
    var Ge, Ye, Ue = /^margin/, Ke = new RegExp("^(" + be + ")(?!px)[a-z%]+$", "i"), Je = /^(top|right|bottom|left)$/;
    f.getComputedStyle ? (Ge = function(e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null);
    }, Ye = function(e, t, i) {
        var n, a, r, s, o = e.style;
        return s = (i = i || Ge(e)) ? i.getPropertyValue(t) || i[t] : void 0, i && ("" !== s || Q.contains(e.ownerDocument, e) || (s = Q.style(e, t)), 
        Ke.test(s) && Ue.test(t) && (n = o.width, a = o.minWidth, r = o.maxWidth, o.minWidth = o.maxWidth = o.width = s, 
        s = i.width, o.width = n, o.minWidth = a, o.maxWidth = r)), void 0 === s ? s : s + "";
    }) : le.documentElement.currentStyle && (Ge = function(e) {
        return e.currentStyle;
    }, Ye = function(e, t, i) {
        var n, a, r, s, o = e.style;
        return null == (s = (i = i || Ge(e)) ? i[t] : void 0) && o && o[t] && (s = o[t]), 
        Ke.test(s) && !Je.test(t) && (n = o.left, (r = (a = e.runtimeStyle) && a.left) && (a.left = e.currentStyle.left), 
        o.left = "fontSize" === t ? "1em" : s, s = o.pixelLeft + "px", o.left = n, r && (a.left = r)), 
        void 0 === s ? s : s + "" || "auto";
    }), function() {
        function e() {
            var e, t, i, n;
            (t = le.getElementsByTagName("body")[0]) && t.style && (e = le.createElement("div"), 
            (i = le.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            t.appendChild(i).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            a = r = !1, o = !0, f.getComputedStyle && (a = "1%" !== (f.getComputedStyle(e, null) || {}).top, 
            r = "4px" === (f.getComputedStyle(e, null) || {
                width: "4px"
            }).width, (n = e.appendChild(le.createElement("div"))).style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
            n.style.marginRight = n.style.width = "0", e.style.width = "1px", o = !parseFloat((f.getComputedStyle(n, null) || {}).marginRight)), 
            e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", (n = e.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", 
            (s = 0 === n[0].offsetHeight) && (n[0].style.display = "", n[1].style.display = "none", 
            s = 0 === n[0].offsetHeight), t.removeChild(i));
        }
        var t, i, n, a, r, s, o;
        (t = le.createElement("div")).innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        (i = (n = t.getElementsByTagName("a")[0]) && n.style) && (i.cssText = "float:left;opacity:.5", 
        K.opacity = "0.5" === i.opacity, K.cssFloat = !!i.cssFloat, t.style.backgroundClip = "content-box", 
        t.cloneNode(!0).style.backgroundClip = "", K.clearCloneStyle = "content-box" === t.style.backgroundClip, 
        K.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, 
        Q.extend(K, {
            reliableHiddenOffsets: function() {
                return null == s && e(), s;
            },
            boxSizingReliable: function() {
                return null == r && e(), r;
            },
            pixelPosition: function() {
                return null == a && e(), a;
            },
            reliableMarginRight: function() {
                return null == o && e(), o;
            }
        }));
    }(), Q.swap = function(e, t, i, n) {
        var a, r, s = {};
        for (r in t) s[r] = e.style[r], e.style[r] = t[r];
        for (r in a = i.apply(e, n || []), t) e.style[r] = s[r];
        return a;
    };
    var Qe = /alpha\([^)]*\)/i, Ze = /opacity\s*=\s*([^)]*)/, et = /^(none|table(?!-c[ea]).+)/, tt = new RegExp("^(" + be + ")(.*)$", "i"), it = new RegExp("^([+-])=(" + be + ")", "i"), nt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, at = {
        letterSpacing: "0",
        fontWeight: "400"
    }, rt = [ "Webkit", "O", "Moz", "ms" ];
    Q.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var i = Ye(e, "opacity");
                        return "" === i ? "1" : i;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: K.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, i, n) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var a, r, s, o = Q.camelCase(t), l = e.style;
                if (t = Q.cssProps[o] || (Q.cssProps[o] = k(l, o)), s = Q.cssHooks[t] || Q.cssHooks[o], 
                void 0 === i) return s && "get" in s && void 0 !== (a = s.get(e, !1, n)) ? a : l[t];
                if ("string" === (r = typeof i) && (a = it.exec(i)) && (i = (a[1] + 1) * a[2] + parseFloat(Q.css(e, t)), 
                r = "number"), null != i && i == i && ("number" !== r || Q.cssNumber[o] || (i += "px"), 
                K.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (l[t] = "inherit"), 
                !(s && "set" in s && void 0 === (i = s.set(e, i, n))))) try {
                    l[t] = i;
                } catch (e) {}
            }
        },
        css: function(e, t, i, n) {
            var a, r, s, o = Q.camelCase(t);
            return t = Q.cssProps[o] || (Q.cssProps[o] = k(e.style, o)), (s = Q.cssHooks[t] || Q.cssHooks[o]) && "get" in s && (r = s.get(e, !0, i)), 
            void 0 === r && (r = Ye(e, t, n)), "normal" === r && t in at && (r = at[t]), "" === i || i ? (a = parseFloat(r), 
            !0 === i || Q.isNumeric(a) ? a || 0 : r) : r;
        }
    }), Q.each([ "height", "width" ], function(e, a) {
        Q.cssHooks[a] = {
            get: function(e, t, i) {
                return t ? et.test(Q.css(e, "display")) && 0 === e.offsetWidth ? Q.swap(e, nt, function() {
                    return P(e, a, i);
                }) : P(e, a, i) : void 0;
            },
            set: function(e, t, i) {
                var n = i && Ge(e);
                return N(0, t, i ? L(e, a, i, K.boxSizing && "border-box" === Q.css(e, "boxSizing", !1, n), n) : 0);
            }
        };
    }), K.opacity || (Q.cssHooks.opacity = {
        get: function(e, t) {
            return Ze.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
        },
        set: function(e, t) {
            var i = e.style, n = e.currentStyle, a = Q.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", r = n && n.filter || i.filter || "";
            ((i.zoom = 1) <= t || "" === t) && "" === Q.trim(r.replace(Qe, "")) && i.removeAttribute && (i.removeAttribute("filter"), 
            "" === t || n && !n.filter) || (i.filter = Qe.test(r) ? r.replace(Qe, a) : r + " " + a);
        }
    }), Q.cssHooks.marginRight = S(K.reliableMarginRight, function(e, t) {
        return t ? Q.swap(e, {
            display: "inline-block"
        }, Ye, [ e, "marginRight" ]) : void 0;
    }), Q.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, r) {
        Q.cssHooks[a + r] = {
            expand: function(e) {
                for (var t = 0, i = {}, n = "string" == typeof e ? e.split(" ") : [ e ]; t < 4; t++) i[a + xe[t] + r] = n[t] || n[t - 2] || n[0];
                return i;
            }
        }, Ue.test(a) || (Q.cssHooks[a + r].set = N);
    }), Q.fn.extend({
        css: function(e, t) {
            return Te(this, function(e, t, i) {
                var n, a, r = {}, s = 0;
                if (Q.isArray(t)) {
                    for (n = Ge(e), a = t.length; s < a; s++) r[t[s]] = Q.css(e, t[s], !1, n);
                    return r;
                }
                return void 0 !== i ? Q.style(e, t, i) : Q.css(e, t);
            }, e, t, 1 < arguments.length);
        },
        show: function() {
            return M(this, !0);
        },
        hide: function() {
            return M(this);
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                we(this) ? Q(this).show() : Q(this).hide();
            });
        }
    }), (Q.Tween = $).prototype = {
        constructor: $,
        init: function(e, t, i, n, a, r) {
            this.elem = e, this.prop = i, this.easing = a || "swing", this.options = t, this.start = this.now = this.cur(), 
            this.end = n, this.unit = r || (Q.cssNumber[i] ? "" : "px");
        },
        cur: function() {
            var e = $.propHooks[this.prop];
            return e && e.get ? e.get(this) : $.propHooks._default.get(this);
        },
        run: function(e) {
            var t, i = $.propHooks[this.prop];
            return this.pos = t = this.options.duration ? Q.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, 
            this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            i && i.set ? i.set(this) : $.propHooks._default.set(this), this;
        }
    }, $.prototype.init.prototype = $.prototype, $.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Q.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0 : e.elem[e.prop];
            },
            set: function(e) {
                Q.fx.step[e.prop] ? Q.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Q.cssProps[e.prop]] || Q.cssHooks[e.prop]) ? Q.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    }, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, Q.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }
    }, Q.fx = $.prototype.init, Q.fx.step = {};
    var st, ot, lt, dt, ct, ut, pt, ht = /^(?:toggle|show|hide)$/, ft = new RegExp("^(?:([+-])=|)(" + be + ")([a-z%]*)$", "i"), vt = /queueHooks$/, mt = [ function(t, e, i) {
        var n, a, r, s, o, l, d, c = this, u = {}, p = t.style, h = t.nodeType && we(t), f = Q._data(t, "fxshow");
        for (n in i.queue || (null == (o = Q._queueHooks(t, "fx")).unqueued && (o.unqueued = 0, 
        l = o.empty.fire, o.empty.fire = function() {
            o.unqueued || l();
        }), o.unqueued++, c.always(function() {
            c.always(function() {
                o.unqueued--, Q.queue(t, "fx").length || o.empty.fire();
            });
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [ p.overflow, p.overflowX, p.overflowY ], 
        "inline" === ("none" === (d = Q.css(t, "display")) ? Q._data(t, "olddisplay") || C(t.nodeName) : d) && "none" === Q.css(t, "float") && (K.inlineBlockNeedsLayout && "inline" !== C(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), 
        i.overflow && (p.overflow = "hidden", K.shrinkWrapBlocks() || c.always(function() {
            p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2];
        })), e) if (a = e[n], ht.exec(a)) {
            if (delete e[n], r = r || "toggle" === a, a === (h ? "hide" : "show")) {
                if ("show" !== a || !f || void 0 === f[n]) continue;
                h = !0;
            }
            u[n] = f && f[n] || Q.style(t, n);
        } else d = void 0;
        if (Q.isEmptyObject(u)) "inline" === ("none" === d ? C(t.nodeName) : d) && (p.display = d); else for (n in f ? "hidden" in f && (h = f.hidden) : f = Q._data(t, "fxshow", {}), 
        r && (f.hidden = !h), h ? Q(t).show() : c.done(function() {
            Q(t).hide();
        }), c.done(function() {
            var e;
            for (e in Q._removeData(t, "fxshow"), u) Q.style(t, e, u[e]);
        }), u) s = A(h ? f[n] : 0, n, c), n in f || (f[n] = s.start, h && (s.end = s.start, 
        s.start = "width" === n || "height" === n ? 1 : 0));
    } ], gt = {
        "*": [ function(e, t) {
            var i = this.createTween(e, t), n = i.cur(), a = ft.exec(t), r = a && a[3] || (Q.cssNumber[e] ? "" : "px"), s = (Q.cssNumber[e] || "px" !== r && +n) && ft.exec(Q.css(i.elem, e)), o = 1, l = 20;
            if (s && s[3] !== r) for (r = r || s[3], a = a || [], s = +n || 1; s /= o = o || ".5", 
            Q.style(i.elem, e, s + r), o !== (o = i.cur() / n) && 1 !== o && --l; ) ;
            return a && (s = i.start = +s || +n || 0, i.unit = r, i.end = a[1] ? s + (a[1] + 1) * a[2] : +a[2]), 
            i;
        } ]
    };
    Q.Animation = Q.extend(I, {
        tweener: function(e, t) {
            Q.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
            for (var i, n = 0, a = e.length; n < a; n++) i = e[n], gt[i] = gt[i] || [], gt[i].unshift(t);
        },
        prefilter: function(e, t) {
            t ? mt.unshift(e) : mt.push(e);
        }
    }), Q.speed = function(e, t, i) {
        var n = e && "object" == typeof e ? Q.extend({}, e) : {
            complete: i || !i && t || Q.isFunction(e) && e,
            duration: e,
            easing: i && t || t && !Q.isFunction(t) && t
        };
        return n.duration = Q.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in Q.fx.speeds ? Q.fx.speeds[n.duration] : Q.fx.speeds._default, 
        (null == n.queue || !0 === n.queue) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
            Q.isFunction(n.old) && n.old.call(this), n.queue && Q.dequeue(this, n.queue);
        }, n;
    }, Q.fn.extend({
        fadeTo: function(e, t, i, n) {
            return this.filter(we).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, i, n);
        },
        animate: function(t, e, i, n) {
            var a = Q.isEmptyObject(t), r = Q.speed(e, i, n), s = function() {
                var e = I(this, Q.extend({}, t), r);
                (a || Q._data(this, "finish")) && e.stop(!0);
            };
            return s.finish = s, a || !1 === r.queue ? this.each(s) : this.queue(r.queue, s);
        },
        stop: function(a, e, r) {
            var s = function(e) {
                var t = e.stop;
                delete e.stop, t(r);
            };
            return "string" != typeof a && (r = e, e = a, a = void 0), e && !1 !== a && this.queue(a || "fx", []), 
            this.each(function() {
                var e = !0, t = null != a && a + "queueHooks", i = Q.timers, n = Q._data(this);
                if (t) n[t] && n[t].stop && s(n[t]); else for (t in n) n[t] && n[t].stop && vt.test(t) && s(n[t]);
                for (t = i.length; t--; ) i[t].elem !== this || null != a && i[t].queue !== a || (i[t].anim.stop(r), 
                e = !1, i.splice(t, 1));
                (e || !r) && Q.dequeue(this, a);
            });
        },
        finish: function(s) {
            return !1 !== s && (s = s || "fx"), this.each(function() {
                var e, t = Q._data(this), i = t[s + "queue"], n = t[s + "queueHooks"], a = Q.timers, r = i ? i.length : 0;
                for (t.finish = !0, Q.queue(this, s, []), n && n.stop && n.stop.call(this, !0), 
                e = a.length; e--; ) a[e].elem === this && a[e].queue === s && (a[e].anim.stop(!0), 
                a.splice(e, 1));
                for (e = 0; e < r; e++) i[e] && i[e].finish && i[e].finish.call(this);
                delete t.finish;
            });
        }
    }), Q.each([ "toggle", "show", "hide" ], function(e, n) {
        var a = Q.fn[n];
        Q.fn[n] = function(e, t, i) {
            return null == e || "boolean" == typeof e ? a.apply(this, arguments) : this.animate(D(n, !0), e, t, i);
        };
    }), Q.each({
        slideDown: D("show"),
        slideUp: D("hide"),
        slideToggle: D("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, n) {
        Q.fn[e] = function(e, t, i) {
            return this.animate(n, e, t, i);
        };
    }), Q.timers = [], Q.fx.tick = function() {
        var e, t = Q.timers, i = 0;
        for (st = Q.now(); i < t.length; i++) (e = t[i])() || t[i] !== e || t.splice(i--, 1);
        t.length || Q.fx.stop(), st = void 0;
    }, Q.fx.timer = function(e) {
        Q.timers.push(e), e() ? Q.fx.start() : Q.timers.pop();
    }, Q.fx.interval = 13, Q.fx.start = function() {
        ot || (ot = setInterval(Q.fx.tick, Q.fx.interval));
    }, Q.fx.stop = function() {
        clearInterval(ot), ot = null;
    }, Q.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, Q.fn.delay = function(n, e) {
        return n = Q.fx && Q.fx.speeds[n] || n, e = e || "fx", this.queue(e, function(e, t) {
            var i = setTimeout(e, n);
            t.stop = function() {
                clearTimeout(i);
            };
        });
    }, (dt = le.createElement("div")).setAttribute("className", "t"), dt.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
    ut = dt.getElementsByTagName("a")[0], pt = (ct = le.createElement("select")).appendChild(le.createElement("option")), 
    lt = dt.getElementsByTagName("input")[0], ut.style.cssText = "top:1px", K.getSetAttribute = "t" !== dt.className, 
    K.style = /top/.test(ut.getAttribute("style")), K.hrefNormalized = "/a" === ut.getAttribute("href"), 
    K.checkOn = !!lt.value, K.optSelected = pt.selected, K.enctype = !!le.createElement("form").enctype, 
    ct.disabled = !0, K.optDisabled = !pt.disabled, (lt = le.createElement("input")).setAttribute("value", ""), 
    K.input = "" === lt.getAttribute("value"), lt.value = "t", lt.setAttribute("type", "radio"), 
    K.radioValue = "t" === lt.value;
    var yt = /\r/g;
    Q.fn.extend({
        val: function(i) {
            var n, e, a, t = this[0];
            return arguments.length ? (a = Q.isFunction(i), this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = a ? i.call(this, e, Q(this).val()) : i) ? t = "" : "number" == typeof t ? t += "" : Q.isArray(t) && (t = Q.map(t, function(e) {
                    return null == e ? "" : e + "";
                })), (n = Q.valHooks[this.type] || Q.valHooks[this.nodeName.toLowerCase()]) && "set" in n && void 0 !== n.set(this, t, "value") || (this.value = t));
            })) : t ? (n = Q.valHooks[t.type] || Q.valHooks[t.nodeName.toLowerCase()]) && "get" in n && void 0 !== (e = n.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(yt, "") : null == e ? "" : e : void 0;
        }
    }), Q.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = Q.find.attr(e, "value");
                    return null != t ? t : Q.trim(Q.text(e));
                }
            },
            select: {
                get: function(e) {
                    for (var t, i, n = e.options, a = e.selectedIndex, r = "select-one" === e.type || a < 0, s = r ? null : [], o = r ? a + 1 : n.length, l = a < 0 ? o : r ? a : 0; l < o; l++) if (!(!(i = n[l]).selected && l !== a || (K.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && Q.nodeName(i.parentNode, "optgroup"))) {
                        if (t = Q(i).val(), r) return t;
                        s.push(t);
                    }
                    return s;
                },
                set: function(e, t) {
                    for (var i, n, a = e.options, r = Q.makeArray(t), s = a.length; s--; ) if (n = a[s], 
                    0 <= Q.inArray(Q.valHooks.option.get(n), r)) try {
                        n.selected = i = !0;
                    } catch (e) {
                        n.scrollHeight;
                    } else n.selected = !1;
                    return i || (e.selectedIndex = -1), a;
                }
            }
        }
    }), Q.each([ "radio", "checkbox" ], function() {
        Q.valHooks[this] = {
            set: function(e, t) {
                return Q.isArray(t) ? e.checked = 0 <= Q.inArray(Q(e).val(), t) : void 0;
            }
        }, K.checkOn || (Q.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    });
    var bt, xt, wt = Q.expr.attrHandle, Tt = /^(?:checked|selected)$/i, Et = K.getSetAttribute, Ct = K.input;
    Q.fn.extend({
        attr: function(e, t) {
            return Te(this, Q.attr, e, t, 1 < arguments.length);
        },
        removeAttr: function(e) {
            return this.each(function() {
                Q.removeAttr(this, e);
            });
        }
    }), Q.extend({
        attr: function(e, t, i) {
            var n, a, r = e.nodeType;
            if (e && 3 !== r && 8 !== r && 2 !== r) return typeof e.getAttribute === me ? Q.prop(e, t, i) : (1 === r && Q.isXMLDoc(e) || (t = t.toLowerCase(), 
            n = Q.attrHooks[t] || (Q.expr.match.bool.test(t) ? xt : bt)), void 0 === i ? n && "get" in n && null !== (a = n.get(e, t)) ? a : null == (a = Q.find.attr(e, t)) ? void 0 : a : null !== i ? n && "set" in n && void 0 !== (a = n.set(e, i, t)) ? a : (e.setAttribute(t, i + ""), 
            i) : void Q.removeAttr(e, t));
        },
        removeAttr: function(e, t) {
            var i, n, a = 0, r = t && t.match(he);
            if (r && 1 === e.nodeType) for (;i = r[a++]; ) n = Q.propFix[i] || i, Q.expr.match.bool.test(i) ? Ct && Et || !Tt.test(i) ? e[n] = !1 : e[Q.camelCase("default-" + i)] = e[n] = !1 : Q.attr(e, i, ""), 
            e.removeAttribute(Et ? i : n);
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!K.radioValue && "radio" === t && Q.nodeName(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t), i && (e.value = i), t;
                    }
                }
            }
        }
    }), xt = {
        set: function(e, t, i) {
            return !1 === t ? Q.removeAttr(e, i) : Ct && Et || !Tt.test(i) ? e.setAttribute(!Et && Q.propFix[i] || i, i) : e[Q.camelCase("default-" + i)] = e[i] = !0, 
            i;
        }
    }, Q.each(Q.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var r = wt[t] || Q.find.attr;
        wt[t] = Ct && Et || !Tt.test(t) ? function(e, t, i) {
            var n, a;
            return i || (a = wt[t], wt[t] = n, n = null != r(e, t, i) ? t.toLowerCase() : null, 
            wt[t] = a), n;
        } : function(e, t, i) {
            return i ? void 0 : e[Q.camelCase("default-" + t)] ? t.toLowerCase() : null;
        };
    }), Ct && Et || (Q.attrHooks.value = {
        set: function(e, t, i) {
            return Q.nodeName(e, "input") ? void (e.defaultValue = t) : bt && bt.set(e, t, i);
        }
    }), Et || (bt = {
        set: function(e, t, i) {
            var n = e.getAttributeNode(i);
            return n || e.setAttributeNode(n = e.ownerDocument.createAttribute(i)), n.value = t += "", 
            "value" === i || t === e.getAttribute(i) ? t : void 0;
        }
    }, wt.id = wt.name = wt.coords = function(e, t, i) {
        var n;
        return i ? void 0 : (n = e.getAttributeNode(t)) && "" !== n.value ? n.value : null;
    }, Q.valHooks.button = {
        get: function(e, t) {
            var i = e.getAttributeNode(t);
            return i && i.specified ? i.value : void 0;
        },
        set: bt.set
    }, Q.attrHooks.contenteditable = {
        set: function(e, t, i) {
            bt.set(e, "" !== t && t, i);
        }
    }, Q.each([ "width", "height" ], function(e, i) {
        Q.attrHooks[i] = {
            set: function(e, t) {
                return "" === t ? (e.setAttribute(i, "auto"), t) : void 0;
            }
        };
    })), K.style || (Q.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0;
        },
        set: function(e, t) {
            return e.style.cssText = t + "";
        }
    });
    var St = /^(?:input|select|textarea|button|object)$/i, kt = /^(?:a|area)$/i;
    Q.fn.extend({
        prop: function(e, t) {
            return Te(this, Q.prop, e, t, 1 < arguments.length);
        },
        removeProp: function(e) {
            return e = Q.propFix[e] || e, this.each(function() {
                try {
                    this[e] = void 0, delete this[e];
                } catch (e) {}
            });
        }
    }), Q.extend({
        propFix: {
            for: "htmlFor",
            class: "className"
        },
        prop: function(e, t, i) {
            var n, a, r = e.nodeType;
            if (e && 3 !== r && 8 !== r && 2 !== r) return (1 !== r || !Q.isXMLDoc(e)) && (t = Q.propFix[t] || t, 
            a = Q.propHooks[t]), void 0 !== i ? a && "set" in a && void 0 !== (n = a.set(e, i, t)) ? n : e[t] = i : a && "get" in a && null !== (n = a.get(e, t)) ? n : e[t];
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = Q.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : St.test(e.nodeName) || kt.test(e.nodeName) && e.href ? 0 : -1;
                }
            }
        }
    }), K.hrefNormalized || Q.each([ "href", "src" ], function(e, t) {
        Q.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4);
            }
        };
    }), K.optSelected || (Q.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
        }
    }), Q.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        Q.propFix[this.toLowerCase()] = this;
    }), K.enctype || (Q.propFix.enctype = "encoding");
    var Mt = /[\t\r\n\f]/g;
    Q.fn.extend({
        addClass: function(t) {
            var e, i, n, a, r, s, o = 0, l = this.length, d = "string" == typeof t && t;
            if (Q.isFunction(t)) return this.each(function(e) {
                Q(this).addClass(t.call(this, e, this.className));
            });
            if (d) for (e = (t || "").match(he) || []; o < l; o++) if (n = 1 === (i = this[o]).nodeType && (i.className ? (" " + i.className + " ").replace(Mt, " ") : " ")) {
                for (r = 0; a = e[r++]; ) n.indexOf(" " + a + " ") < 0 && (n += a + " ");
                s = Q.trim(n), i.className !== s && (i.className = s);
            }
            return this;
        },
        removeClass: function(t) {
            var e, i, n, a, r, s, o = 0, l = this.length, d = 0 === arguments.length || "string" == typeof t && t;
            if (Q.isFunction(t)) return this.each(function(e) {
                Q(this).removeClass(t.call(this, e, this.className));
            });
            if (d) for (e = (t || "").match(he) || []; o < l; o++) if (n = 1 === (i = this[o]).nodeType && (i.className ? (" " + i.className + " ").replace(Mt, " ") : "")) {
                for (r = 0; a = e[r++]; ) for (;0 <= n.indexOf(" " + a + " "); ) n = n.replace(" " + a + " ", " ");
                s = t ? Q.trim(n) : "", i.className !== s && (i.className = s);
            }
            return this;
        },
        toggleClass: function(a, t) {
            var r = typeof a;
            return "boolean" == typeof t && "string" === r ? t ? this.addClass(a) : this.removeClass(a) : this.each(Q.isFunction(a) ? function(e) {
                Q(this).toggleClass(a.call(this, e, this.className, t), t);
            } : function() {
                if ("string" === r) for (var e, t = 0, i = Q(this), n = a.match(he) || []; e = n[t++]; ) i.hasClass(e) ? i.removeClass(e) : i.addClass(e); else (r === me || "boolean" === r) && (this.className && Q._data(this, "__className__", this.className), 
                this.className = this.className || !1 === a ? "" : Q._data(this, "__className__") || "");
            });
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", i = 0, n = this.length; i < n; i++) if (1 === this[i].nodeType && 0 <= (" " + this[i].className + " ").replace(Mt, " ").indexOf(t)) return !0;
            return !1;
        }
    }), Q.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, i) {
        Q.fn[i] = function(e, t) {
            return 0 < arguments.length ? this.on(i, null, e, t) : this.trigger(i);
        };
    }), Q.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        },
        bind: function(e, t, i) {
            return this.on(e, null, t, i);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, i, n) {
            return this.on(t, e, i, n);
        },
        undelegate: function(e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i);
        }
    });
    var Nt = Q.now(), Lt = /\?/, Pt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    Q.parseJSON = function(e) {
        if (f.JSON && f.JSON.parse) return f.JSON.parse(e + "");
        var a, r = null, t = Q.trim(e + "");
        return t && !Q.trim(t.replace(Pt, function(e, t, i, n) {
            return a && t && (r = 0), 0 === r ? e : (a = i || t, r += !n - !i, "");
        })) ? Function("return " + t)() : Q.error("Invalid JSON: " + e);
    }, Q.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            f.DOMParser ? t = new DOMParser().parseFromString(e, "text/xml") : ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", 
            t.loadXML(e));
        } catch (e) {
            t = void 0;
        }
        return t && t.documentElement && !t.getElementsByTagName("parsererror").length || Q.error("Invalid XML: " + e), 
        t;
    };
    var $t, zt, Dt = /#.*$/, At = /([?&])_=[^&]*/, It = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Ot = /^(?:GET|HEAD)$/, Ht = /^\/\//, _t = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, jt = {}, Bt = {}, qt = "*/".concat("*");
    try {
        zt = location.href;
    } catch (e) {
        (zt = le.createElement("a")).href = "", zt = zt.href;
    }
    $t = _t.exec(zt.toLowerCase()) || [], Q.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: zt,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test($t[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": qt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": Q.parseJSON,
                "text xml": Q.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? _(_(e, Q.ajaxSettings), t) : _(Q.ajaxSettings, e);
        },
        ajaxPrefilter: O(jt),
        ajaxTransport: O(Bt),
        ajax: function(e, t) {
            function i(e, t, i, n) {
                var a, r, s, o, l, d = t;
                2 !== w && (w = 2, p && clearTimeout(p), f = void 0, u = n || "", T.readyState = 0 < e ? 4 : 0, 
                a = 200 <= e && e < 300 || 304 === e, i && (o = function(e, t, i) {
                    for (var n, a, r, s, o = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), 
                    void 0 === a && (a = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (a) for (s in o) if (o[s] && o[s].test(a)) {
                        l.unshift(s);
                        break;
                    }
                    if (l[0] in i) r = l[0]; else {
                        for (s in i) {
                            if (!l[0] || e.converters[s + " " + l[0]]) {
                                r = s;
                                break;
                            }
                            n || (n = s);
                        }
                        r = r || n;
                    }
                    return r ? (r !== l[0] && l.unshift(r), i[r]) : void 0;
                }(v, T, i)), o = function(e, t, i, n) {
                    var a, r, s, o, l, d = {}, c = e.dataTypes.slice();
                    if (c[1]) for (s in e.converters) d[s.toLowerCase()] = e.converters[s];
                    for (r = c.shift(); r; ) if (e.responseFields[r] && (i[e.responseFields[r]] = t), 
                    !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = c.shift()) if ("*" === r) r = l; else if ("*" !== l && l !== r) {
                        if (!(s = d[l + " " + r] || d["* " + r])) for (a in d) if ((o = a.split(" "))[1] === r && (s = d[l + " " + o[0]] || d["* " + o[0]])) {
                            !0 === s ? s = d[a] : !0 !== d[a] && (r = o[0], c.unshift(o[1]));
                            break;
                        }
                        if (!0 !== s) if (s && e.throws) t = s(t); else try {
                            t = s(t);
                        } catch (e) {
                            return {
                                state: "parsererror",
                                error: s ? e : "No conversion from " + l + " to " + r
                            };
                        }
                    }
                    return {
                        state: "success",
                        data: t
                    };
                }(v, o, T, a), a ? (v.ifModified && ((l = T.getResponseHeader("Last-Modified")) && (Q.lastModified[c] = l), 
                (l = T.getResponseHeader("etag")) && (Q.etag[c] = l)), 204 === e || "HEAD" === v.type ? d = "nocontent" : 304 === e ? d = "notmodified" : (d = o.state, 
                r = o.data, a = !(s = o.error))) : (s = d, (e || !d) && (d = "error", e < 0 && (e = 0))), 
                T.status = e, T.statusText = (t || d) + "", a ? y.resolveWith(m, [ r, d, T ]) : y.rejectWith(m, [ T, d, s ]), 
                T.statusCode(x), x = void 0, h && g.trigger(a ? "ajaxSuccess" : "ajaxError", [ T, v, a ? r : s ]), 
                b.fireWith(m, [ T, d ]), h && (g.trigger("ajaxComplete", [ T, v ]), --Q.active || Q.event.trigger("ajaxStop")));
            }
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var n, a, c, u, p, h, f, r, v = Q.ajaxSetup({}, t), m = v.context || v, g = v.context && (m.nodeType || m.jquery) ? Q(m) : Q.event, y = Q.Deferred(), b = Q.Callbacks("once memory"), x = v.statusCode || {}, s = {}, o = {}, w = 0, l = "canceled", T = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === w) {
                        if (!r) for (r = {}; t = It.exec(u); ) r[t[1].toLowerCase()] = t[2];
                        t = r[e.toLowerCase()];
                    }
                    return null == t ? null : t;
                },
                getAllResponseHeaders: function() {
                    return 2 === w ? u : null;
                },
                setRequestHeader: function(e, t) {
                    var i = e.toLowerCase();
                    return w || (e = o[i] = o[i] || e, s[e] = t), this;
                },
                overrideMimeType: function(e) {
                    return w || (v.mimeType = e), this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (w < 2) for (t in e) x[t] = [ x[t], e[t] ]; else T.always(e[T.status]);
                    return this;
                },
                abort: function(e) {
                    var t = e || l;
                    return f && f.abort(t), i(0, t), this;
                }
            };
            if (y.promise(T).complete = b.add, T.success = T.done, T.error = T.fail, v.url = ((e || v.url || zt) + "").replace(Dt, "").replace(Ht, $t[1] + "//"), 
            v.type = t.method || t.type || v.method || v.type, v.dataTypes = Q.trim(v.dataType || "*").toLowerCase().match(he) || [ "" ], 
            null == v.crossDomain && (n = _t.exec(v.url.toLowerCase()), v.crossDomain = !(!n || n[1] === $t[1] && n[2] === $t[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === ($t[3] || ("http:" === $t[1] ? "80" : "443")))), 
            v.data && v.processData && "string" != typeof v.data && (v.data = Q.param(v.data, v.traditional)), 
            H(jt, v, t, T), 2 === w) return T;
            for (a in (h = v.global) && 0 == Q.active++ && Q.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), 
            v.hasContent = !Ot.test(v.type), c = v.url, v.hasContent || (v.data && (c = v.url += (Lt.test(c) ? "&" : "?") + v.data, 
            delete v.data), !1 === v.cache && (v.url = At.test(c) ? c.replace(At, "$1_=" + Nt++) : c + (Lt.test(c) ? "&" : "?") + "_=" + Nt++)), 
            v.ifModified && (Q.lastModified[c] && T.setRequestHeader("If-Modified-Since", Q.lastModified[c]), 
            Q.etag[c] && T.setRequestHeader("If-None-Match", Q.etag[c])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), 
            T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + qt + "; q=0.01" : "") : v.accepts["*"]), 
            v.headers) T.setRequestHeader(a, v.headers[a]);
            if (v.beforeSend && (!1 === v.beforeSend.call(m, T, v) || 2 === w)) return T.abort();
            for (a in l = "abort", {
                success: 1,
                error: 1,
                complete: 1
            }) T[a](v[a]);
            if (f = H(Bt, v, t, T)) {
                T.readyState = 1, h && g.trigger("ajaxSend", [ T, v ]), v.async && 0 < v.timeout && (p = setTimeout(function() {
                    T.abort("timeout");
                }, v.timeout));
                try {
                    w = 1, f.send(s, i);
                } catch (e) {
                    if (!(w < 2)) throw e;
                    i(-1, e);
                }
            } else i(-1, "No Transport");
            return T;
        },
        getJSON: function(e, t, i) {
            return Q.get(e, t, i, "json");
        },
        getScript: function(e, t) {
            return Q.get(e, void 0, t, "script");
        }
    }), Q.each([ "get", "post" ], function(e, a) {
        Q[a] = function(e, t, i, n) {
            return Q.isFunction(t) && (n = n || i, i = t, t = void 0), Q.ajax({
                url: e,
                type: a,
                dataType: n,
                data: t,
                success: i
            });
        };
    }), Q.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        Q.fn[t] = function(e) {
            return this.on(t, e);
        };
    }), Q._evalUrl = function(e) {
        return Q.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        });
    }, Q.fn.extend({
        wrapAll: function(t) {
            if (Q.isFunction(t)) return this.each(function(e) {
                Q(this).wrapAll(t.call(this, e));
            });
            if (this[0]) {
                var e = Q(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; ) e = e.firstChild;
                    return e;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(i) {
            return this.each(Q.isFunction(i) ? function(e) {
                Q(this).wrapInner(i.call(this, e));
            } : function() {
                var e = Q(this), t = e.contents();
                t.length ? t.wrapAll(i) : e.append(i);
            });
        },
        wrap: function(t) {
            var i = Q.isFunction(t);
            return this.each(function(e) {
                Q(this).wrapAll(i ? t.call(this, e) : t);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                Q.nodeName(this, "body") || Q(this).replaceWith(this.childNodes);
            }).end();
        }
    }), Q.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !K.reliableHiddenOffsets() && "none" === (e.style && e.style.display || Q.css(e, "display"));
    }, Q.expr.filters.visible = function(e) {
        return !Q.expr.filters.hidden(e);
    };
    var Ft = /%20/g, Rt = /\[\]$/, Xt = /\r?\n/g, Wt = /^(?:submit|button|image|reset|file)$/i, Vt = /^(?:input|select|textarea|keygen)/i;
    Q.param = function(e, t) {
        var i, n = [], a = function(e, t) {
            t = Q.isFunction(t) ? t() : null == t ? "" : t, n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        };
        if (void 0 === t && (t = Q.ajaxSettings && Q.ajaxSettings.traditional), Q.isArray(e) || e.jquery && !Q.isPlainObject(e)) Q.each(e, function() {
            a(this.name, this.value);
        }); else for (i in e) j(i, e[i], t, a);
        return n.join("&").replace(Ft, "+");
    }, Q.fn.extend({
        serialize: function() {
            return Q.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = Q.prop(this, "elements");
                return e ? Q.makeArray(e) : this;
            }).filter(function() {
                var e = this.type;
                return this.name && !Q(this).is(":disabled") && Vt.test(this.nodeName) && !Wt.test(e) && (this.checked || !Ee.test(e));
            }).map(function(e, t) {
                var i = Q(this).val();
                return null == i ? null : Q.isArray(i) ? Q.map(i, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Xt, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: i.replace(Xt, "\r\n")
                };
            }).get();
        }
    }), Q.ajaxSettings.xhr = void 0 !== f.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && B() || function() {
            try {
                return new f.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }();
    } : B;
    var Gt = 0, Yt = {}, Ut = Q.ajaxSettings.xhr();
    f.ActiveXObject && Q(f).on("unload", function() {
        for (var e in Yt) Yt[e](void 0, !0);
    }), K.cors = !!Ut && "withCredentials" in Ut, (Ut = K.ajax = !!Ut) && Q.ajaxTransport(function(l) {
        var d;
        if (!l.crossDomain || K.cors) return {
            send: function(e, r) {
                var t, s = l.xhr(), o = ++Gt;
                if (s.open(l.type, l.url, l.async, l.username, l.password), l.xhrFields) for (t in l.xhrFields) s[t] = l.xhrFields[t];
                for (t in l.mimeType && s.overrideMimeType && s.overrideMimeType(l.mimeType), l.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), 
                e) void 0 !== e[t] && s.setRequestHeader(t, e[t] + "");
                s.send(l.hasContent && l.data || null), d = function(e, t) {
                    var i, n, a;
                    if (d && (t || 4 === s.readyState)) if (delete Yt[o], d = void 0, s.onreadystatechange = Q.noop, 
                    t) 4 !== s.readyState && s.abort(); else {
                        a = {}, i = s.status, "string" == typeof s.responseText && (a.text = s.responseText);
                        try {
                            n = s.statusText;
                        } catch (e) {
                            n = "";
                        }
                        i || !l.isLocal || l.crossDomain ? 1223 === i && (i = 204) : i = a.text ? 200 : 404;
                    }
                    a && r(i, n, a, s.getAllResponseHeaders());
                }, l.async ? 4 === s.readyState ? setTimeout(d) : s.onreadystatechange = Yt[o] = d : d();
            },
            abort: function() {
                d && d(void 0, !0);
            }
        };
    }), Q.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return Q.globalEval(e), e;
            }
        }
    }), Q.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
    }), Q.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var n, a = le.head || Q("head")[0] || le.documentElement;
            return {
                send: function(e, i) {
                    (n = le.createElement("script")).async = !0, t.scriptCharset && (n.charset = t.scriptCharset), 
                    n.src = t.url, n.onload = n.onreadystatechange = function(e, t) {
                        (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, 
                        n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"));
                    }, a.insertBefore(n, a.firstChild);
                },
                abort: function() {
                    n && n.onload(void 0, !0);
                }
            };
        }
    });
    var Kt = [], Jt = /(=)\?(?=&|$)|\?\?/;
    Q.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Kt.pop() || Q.expando + "_" + Nt++;
            return this[e] = !0, e;
        }
    }), Q.ajaxPrefilter("json jsonp", function(e, t, i) {
        var n, a, r, s = !1 !== e.jsonp && (Jt.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Jt.test(e.data) && "data");
        return s || "jsonp" === e.dataTypes[0] ? (n = e.jsonpCallback = Q.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, 
        s ? e[s] = e[s].replace(Jt, "$1" + n) : !1 !== e.jsonp && (e.url += (Lt.test(e.url) ? "&" : "?") + e.jsonp + "=" + n), 
        e.converters["script json"] = function() {
            return r || Q.error(n + " was not called"), r[0];
        }, e.dataTypes[0] = "json", a = f[n], f[n] = function() {
            r = arguments;
        }, i.always(function() {
            f[n] = a, e[n] && (e.jsonpCallback = t.jsonpCallback, Kt.push(n)), r && Q.isFunction(a) && a(r[0]), 
            r = a = void 0;
        }), "script") : void 0;
    }), Q.parseHTML = function(e, t, i) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (i = t, t = !1), t = t || le;
        var n = re.exec(e), a = !i && [];
        return n ? [ t.createElement(n[1]) ] : (n = Q.buildFragment([ e ], t, a), a && a.length && Q(a).remove(), 
        Q.merge([], n.childNodes));
    };
    var Qt = Q.fn.load;
    Q.fn.load = function(e, t, i) {
        if ("string" != typeof e && Qt) return Qt.apply(this, arguments);
        var n, a, r, s = this, o = e.indexOf(" ");
        return 0 <= o && (n = Q.trim(e.slice(o, e.length)), e = e.slice(0, o)), Q.isFunction(t) ? (i = t, 
        t = void 0) : t && "object" == typeof t && (r = "POST"), 0 < s.length && Q.ajax({
            url: e,
            type: r,
            dataType: "html",
            data: t
        }).done(function(e) {
            a = arguments, s.html(n ? Q("<div>").append(Q.parseHTML(e)).find(n) : e);
        }).complete(i && function(e, t) {
            s.each(i, a || [ e.responseText, t, e ]);
        }), this;
    }, Q.expr.filters.animated = function(t) {
        return Q.grep(Q.timers, function(e) {
            return t === e.elem;
        }).length;
    };
    var Zt = f.document.documentElement;
    Q.offset = {
        setOffset: function(e, t, i) {
            var n, a, r, s, o, l, d = Q.css(e, "position"), c = Q(e), u = {};
            "static" === d && (e.style.position = "relative"), o = c.offset(), r = Q.css(e, "top"), 
            l = Q.css(e, "left"), ("absolute" === d || "fixed" === d) && -1 < Q.inArray("auto", [ r, l ]) ? (s = (n = c.position()).top, 
            a = n.left) : (s = parseFloat(r) || 0, a = parseFloat(l) || 0), Q.isFunction(t) && (t = t.call(e, i, o)), 
            null != t.top && (u.top = t.top - o.top + s), null != t.left && (u.left = t.left - o.left + a), 
            "using" in t ? t.using.call(e, u) : c.css(u);
        }
    }, Q.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                Q.offset.setOffset(this, t, e);
            });
            var e, i, n = {
                top: 0,
                left: 0
            }, a = this[0], r = a && a.ownerDocument;
            return r ? (e = r.documentElement, Q.contains(e, a) ? (typeof a.getBoundingClientRect !== me && (n = a.getBoundingClientRect()), 
            i = q(r), {
                top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : n) : void 0;
        },
        position: function() {
            if (this[0]) {
                var e, t, i = {
                    top: 0,
                    left: 0
                }, n = this[0];
                return "fixed" === Q.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
                t = this.offset(), Q.nodeName(e[0], "html") || (i = e.offset()), i.top += Q.css(e[0], "borderTopWidth", !0), 
                i.left += Q.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - i.top - Q.css(n, "marginTop", !0),
                    left: t.left - i.left - Q.css(n, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || Zt; e && !Q.nodeName(e, "html") && "static" === Q.css(e, "position"); ) e = e.offsetParent;
                return e || Zt;
            });
        }
    }), Q.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, a) {
        var r = /Y/.test(a);
        Q.fn[t] = function(e) {
            return Te(this, function(e, t, i) {
                var n = q(e);
                return void 0 === i ? n ? a in n ? n[a] : n.document.documentElement[t] : e[t] : void (n ? n.scrollTo(r ? Q(n).scrollLeft() : i, r ? i : Q(n).scrollTop()) : e[t] = i);
            }, t, e, arguments.length, null);
        };
    }), Q.each([ "top", "left" ], function(e, i) {
        Q.cssHooks[i] = S(K.pixelPosition, function(e, t) {
            return t ? (t = Ye(e, i), Ke.test(t) ? Q(e).position()[i] + "px" : t) : void 0;
        });
    }), Q.each({
        Height: "height",
        Width: "width"
    }, function(r, s) {
        Q.each({
            padding: "inner" + r,
            content: s,
            "": "outer" + r
        }, function(n, e) {
            Q.fn[e] = function(e, t) {
                var i = arguments.length && (n || "boolean" != typeof e), a = n || (!0 === e || !0 === t ? "margin" : "border");
                return Te(this, function(e, t, i) {
                    var n;
                    return Q.isWindow(e) ? e.document.documentElement["client" + r] : 9 === e.nodeType ? (n = e.documentElement, 
                    Math.max(e.body["scroll" + r], n["scroll" + r], e.body["offset" + r], n["offset" + r], n["client" + r])) : void 0 === i ? Q.css(e, t, a) : Q.style(e, t, i, a);
                }, s, i ? e : void 0, i, null);
            };
        });
    }), Q.fn.size = function() {
        return this.length;
    }, Q.fn.andSelf = Q.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return Q;
    });
    var ei = f.jQuery, ti = f.$;
    return Q.noConflict = function(e) {
        return f.$ === Q && (f.$ = ti), e && f.jQuery === Q && (f.jQuery = ei), Q;
    }, typeof e === me && (f.jQuery = f.$ = Q), Q;
}), function(r, s, o) {
    function t(e, i) {
        function t(t) {
            r(n).each(function() {
                var e = r(this);
                this === t.target || e.has(t.target).length || e.triggerHandler(i, [ t.target ]);
            });
        }
        i = i || e + o;
        var n = r(), a = e + "." + i + "-special-event";
        r.event.special[i] = {
            setup: function() {
                1 === (n = n.add(this)).length && r(s).bind(a, t);
            },
            teardown: function() {
                0 === (n = n.not(this)).length && r(s).unbind(a);
            },
            add: function(e) {
                var i = e.handler;
                e.handler = function(e, t) {
                    e.target = t, i.apply(this, arguments);
                };
            }
        };
    }
    r.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "), function(e) {
        t(e);
    }), t("focusin", "focus" + o), t("focusout", "blur" + o), r.addOutsideEvent = t;
}(jQuery, document, "outside");

var Notyf = function() {
    "use strict";
    var n, e, a = function() {
        return (a = Object.assign || function(e) {
            for (var t, i = 1, n = arguments.length; i < n; i++) for (var a in t = arguments[i]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e;
        }).apply(this, arguments);
    };
    (e = n || (n = {}))[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove";
    var r = function() {
        function e() {
            this.notifications = [];
        }
        return e.prototype.push = function(e) {
            this.notifications.push(e), this.updateFn(e, n.Add, this.notifications);
        }, e.prototype.splice = function(e, t) {
            var i = this.notifications.splice(e, t)[0];
            this.updateFn(i, n.Remove, this.notifications);
        }, e.prototype.indexOf = function(e) {
            return this.notifications.indexOf(e);
        }, e.prototype.onupdate = function(e) {
            this.updateFn = e;
        }, e;
    }(), s = {
        types: [ {
            type: "success",
            className: "notyf__toast--success",
            backgroundColor: "#3dc763",
            icon: {
                className: "notyf__icon--success",
                tagName: "i"
            }
        }, {
            type: "error",
            className: "notyf__toast--error",
            backgroundColor: "#ed3d3d",
            icon: {
                className: "notyf__icon--error",
                tagName: "i"
            }
        } ],
        duration: 2e3,
        ripple: !0
    }, o = function() {
        function e() {
            this.notifications = [];
            var e = document.createDocumentFragment(), t = this._createHTLMElement({
                tagName: "div",
                className: "notyf"
            });
            e.appendChild(t), document.body.appendChild(e), this.container = t, this.animationEndEventName = this._getAnimationEndEventName(), 
            this._createA11yContainer();
        }
        return e.prototype.update = function(e, t) {
            t === n.Add ? this.addNotification(e) : t === n.Remove && this.removeNotification(e);
        }, e.prototype.removeNotification = function(e) {
            var t, i, n = this, a = this._popRenderedNotification(e);
            a && ((t = a.node).classList.add("notyf__toast--disappear"), t.addEventListener(this.animationEndEventName, i = function(e) {
                e.target === t && (t.removeEventListener(n.animationEndEventName, i), n.container.removeChild(t));
            }));
        }, e.prototype.addNotification = function(e) {
            var t = this._renderNotification(e);
            this.notifications.push({
                notification: e,
                node: t
            }), this._announce(e.options.message || "Notification");
        }, e.prototype._renderNotification = function(e) {
            var t = this._buildNotificationCard(e), i = e.options.className;
            return i && t.classList.add(i), this.container.appendChild(t), t;
        }, e.prototype._popRenderedNotification = function(e) {
            for (var t = -1, i = 0; i < this.notifications.length && t < 0; i++) this.notifications[i].notification === e && (t = i);
            if (-1 !== t) return this.notifications.splice(t, 1)[0];
        }, e.prototype._buildNotificationCard = function(e) {
            var t = e.options, i = t.icon, n = this._createHTLMElement({
                tagName: "div",
                className: "notyf__toast"
            }), a = this._createHTLMElement({
                tagName: "div",
                className: "notyf__ripple"
            }), r = this._createHTLMElement({
                tagName: "div",
                className: "notyf__wrapper"
            }), s = this._createHTLMElement({
                tagName: "div",
                className: "notyf__message"
            });
            s.innerHTML = t.message || "";
            var o = t.backgroundColor;
            if (i && "object" == typeof i) {
                var l = this._createHTLMElement({
                    tagName: "div",
                    className: "notyf__icon"
                }), d = this._createHTLMElement({
                    tagName: i.tagName || "i",
                    className: i.className,
                    text: i.text
                });
                o && (d.style.color = o), l.appendChild(d), r.appendChild(l);
            }
            return r.appendChild(s), n.appendChild(r), o && (t.ripple ? (a.style.backgroundColor = o, 
            n.appendChild(a)) : n.style.backgroundColor = o), n;
        }, e.prototype._createHTLMElement = function(e) {
            var t = e.tagName, i = e.className, n = e.text, a = document.createElement(t);
            return i && (a.className = i), a.textContent = n || null, a;
        }, e.prototype._createA11yContainer = function() {
            var e = this._createHTLMElement({
                tagName: "div",
                className: "notyf-announcer"
            });
            e.setAttribute("aria-atomic", "true"), e.setAttribute("aria-live", "polite"), e.style.border = "0", 
            e.style.clip = "rect(0 0 0 0)", e.style.height = "1px", e.style.margin = "-1px", 
            e.style.overflow = "hidden", e.style.padding = "0", e.style.position = "absolute", 
            e.style.width = "1px", e.style.outline = "0", document.body.appendChild(e), this.a11yContainer = e;
        }, e.prototype._announce = function(e) {
            var t = this;
            this.a11yContainer.textContent = "", setTimeout(function() {
                t.a11yContainer.textContent = e;
            }, 100);
        }, e.prototype._getAnimationEndEventName = function() {
            var e, t = document.createElement("_fake"), i = {
                MozTransition: "animationend",
                OTransition: "oAnimationEnd",
                WebkitTransition: "webkitAnimationEnd",
                transition: "animationend"
            };
            for (e in i) if (void 0 !== t.style[e]) return i[e];
            return "animationend";
        }, e;
    }();
    return function() {
        function e(e) {
            var i = this;
            this.notifications = new r(), this.view = new o();
            var t = this.registerTypes(e);
            this.options = a({}, s, e), this.options.types = t, this.notifications.onupdate(function(e, t) {
                i.view.update(e, t);
            });
        }
        return e.prototype.error = function(e) {
            var t = this.normalizeOptions("error", e);
            this.open(t);
        }, e.prototype.success = function(e) {
            var t = this.normalizeOptions("success", e);
            this.open(t);
        }, e.prototype.open = function(t) {
            var e = this.options.types.find(function(e) {
                return e.type === t.type;
            }) || {}, i = a({}, e, t);
            i.ripple = void 0 === i.ripple ? this.options.ripple : i.ripple;
            var n = new function(e) {
                this.options = e;
            }(i);
            this._pushNotification(n);
        }, e.prototype._pushNotification = function(t) {
            var i = this;
            this.notifications.push(t);
            var e = t.options.duration || this.options.duration;
            setTimeout(function() {
                var e = i.notifications.indexOf(t);
                i.notifications.splice(e, 1);
            }, e);
        }, e.prototype.normalizeOptions = function(e, t) {
            var i = {
                type: e
            };
            return "string" == typeof t ? i.message = t : "object" == typeof t && (i = a({}, i, t)), 
            i;
        }, e.prototype.registerTypes = function(e) {
            var n = (e && e.types || []).slice();
            return s.types.map(function(t) {
                var e = n.findIndex(function(e) {
                    return e.type === t.type;
                }), i = -1 !== e ? n.splice(e, 1)[0] : {};
                return a({}, t, i);
            }).concat(n);
        }, e;
    }();
}();

!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t();
}(this, function() {
    "use strict";
    function $(e, t) {
        var i = [], n = 0;
        if (e && !t && e instanceof d) return e;
        if (e) if ("string" == typeof e) {
            var a, r, s = e.trim();
            if (0 <= s.indexOf("<") && 0 <= s.indexOf(">")) {
                var o = "div";
                for (0 === s.indexOf("<li") && (o = "ul"), 0 === s.indexOf("<tr") && (o = "tbody"), 
                0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (o = "tr"), 0 === s.indexOf("<tbody") && (o = "table"), 
                0 === s.indexOf("<option") && (o = "select"), (r = v.createElement(o)).innerHTML = s, 
                n = 0; n < r.childNodes.length; n += 1) i.push(r.childNodes[n]);
            } else for (a = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || v).querySelectorAll(e.trim()) : [ v.getElementById(e.trim().split("#")[1]) ], 
            n = 0; n < a.length; n += 1) a[n] && i.push(a[n]);
        } else if (e.nodeType || e === Z || e === v) i.push(e); else if (0 < e.length && e[0].nodeType) for (n = 0; n < e.length; n += 1) i.push(e[n]);
        return new d(i);
    }
    function r(e) {
        for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t;
    }
    function l() {
        var e = this, t = e.params, i = e.el;
        if (!i || 0 !== i.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var n = e.allowSlideNext, a = e.allowSlidePrev, r = e.snapGrid;
            if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), 
            t.freeMode) {
                var s = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight();
            } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = a, e.allowSlideNext = n, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
        }
    }
    var v = "undefined" == typeof document ? {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null;
        },
        querySelectorAll: function() {
            return [];
        },
        getElementById: function() {
            return null;
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            };
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return [];
                }
            };
        },
        location: {
            hash: ""
        }
    } : document, Z = "undefined" == typeof window ? {
        document: v,
        navigator: {
            userAgent: ""
        },
        location: {},
        history: {},
        CustomEvent: function() {
            return this;
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return "";
                }
            };
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {}
    } : window, d = function(e) {
        for (var t = 0; t < e.length; t += 1) this[t] = e[t];
        return this.length = e.length, this;
    };
    $.fn = d.prototype, $.Class = d, $.Dom7 = d;
    var t = {
        addClass: function(e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.add(t[i]);
            return this;
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.remove(t[i]);
            return this;
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e);
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var n = 0; n < this.length; n += 1) void 0 !== this[n] && void 0 !== this[n].classList && this[n].classList.toggle(t[i]);
            return this;
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var n = 0; n < this.length; n += 1) if (2 === i.length) this[n].setAttribute(e, t); else for (var a in e) this[n][a] = e[a], 
            this[n].setAttribute(a, e[a]);
            return this;
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this;
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var n = 0; n < this.length; n += 1) (i = this[n]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), 
                i.dom7ElementDataStorage[e] = t;
                return this;
            }
            if (i = this[0]) return i.dom7ElementDataStorage && e in i.dom7ElementDataStorage ? i.dom7ElementDataStorage[e] : i.getAttribute("data-" + e) || void 0;
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e;
            }
            return this;
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e;
            }
            return this;
        },
        on: function() {
            function e(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e), $(t).is(s)) o.apply(t, i); else for (var n = $(t).parents(), a = 0; a < n.length; a += 1) $(n[a]).is(s) && o.apply(n[a], i);
                }
            }
            function t(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), o.apply(this, t);
            }
            for (var i, n = [], a = arguments.length; a--; ) n[a] = arguments[a];
            var r = n[0], s = n[1], o = n[2], l = n[3];
            "function" == typeof n[1] && (r = (i = n)[0], o = i[1], l = i[2], s = void 0), l || (l = !1);
            for (var d, c = r.split(" "), u = 0; u < this.length; u += 1) {
                var p = this[u];
                if (s) for (d = 0; d < c.length; d += 1) {
                    var h = c[d];
                    p.dom7LiveListeners || (p.dom7LiveListeners = {}), p.dom7LiveListeners[h] || (p.dom7LiveListeners[h] = []), 
                    p.dom7LiveListeners[h].push({
                        listener: o,
                        proxyListener: e
                    }), p.addEventListener(h, e, l);
                } else for (d = 0; d < c.length; d += 1) {
                    var f = c[d];
                    p.dom7Listeners || (p.dom7Listeners = {}), p.dom7Listeners[f] || (p.dom7Listeners[f] = []), 
                    p.dom7Listeners[f].push({
                        listener: o,
                        proxyListener: t
                    }), p.addEventListener(f, t, l);
                }
            }
            return this;
        },
        off: function() {
            for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
            var n = t[0], a = t[1], r = t[2], s = t[3];
            "function" == typeof t[1] && (n = (e = t)[0], r = e[1], s = e[2], a = void 0), s || (s = !1);
            for (var o = n.split(" "), l = 0; l < o.length; l += 1) for (var d = o[l], c = 0; c < this.length; c += 1) {
                var u = this[c], p = void 0;
                if (!a && u.dom7Listeners ? p = u.dom7Listeners[d] : a && u.dom7LiveListeners && (p = u.dom7LiveListeners[d]), 
                p && p.length) for (var h = p.length - 1; 0 <= h; h -= 1) {
                    var f = p[h];
                    r && f.listener === r ? (u.removeEventListener(d, f.proxyListener, s), p.splice(h, 1)) : r && f.listener && f.listener.dom7proxy && f.listener.dom7proxy === r ? (u.removeEventListener(d, f.proxyListener, s), 
                    p.splice(h, 1)) : r || (u.removeEventListener(d, f.proxyListener, s), p.splice(h, 1));
                }
            }
            return this;
        },
        trigger: function() {
            for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
            for (var i = e[0].split(" "), n = e[1], a = 0; a < i.length; a += 1) for (var r = i[a], s = 0; s < this.length; s += 1) {
                var o = this[s], l = void 0;
                try {
                    l = new Z.CustomEvent(r, {
                        detail: n,
                        bubbles: !0,
                        cancelable: !0
                    });
                } catch (e) {
                    (l = v.createEvent("Event")).initEvent(r, !0, !0), l.detail = n;
                }
                o.dom7EventData = e.filter(function(e, t) {
                    return 0 < t;
                }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData;
            }
            return this;
        },
        transitionEnd: function(t) {
            function i(e) {
                if (e.target === this) for (t.call(this, e), n = 0; n < a.length; n += 1) r.off(a[n], i);
            }
            var n, a = [ "webkitTransitionEnd", "transitionend" ], r = this;
            if (t) for (n = 0; n < a.length; n += 1) r.on(a[n], i);
            return this;
        },
        outerWidth: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        },
        outerHeight: function(e) {
            if (0 < this.length) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        },
        offset: function() {
            if (0 < this.length) {
                var e = this[0], t = e.getBoundingClientRect(), i = v.body, n = e.clientTop || i.clientTop || 0, a = e.clientLeft || i.clientLeft || 0, r = e === Z ? Z.scrollY : e.scrollTop, s = e === Z ? Z.scrollX : e.scrollLeft;
                return {
                    top: t.top + r - n,
                    left: t.left + s - a
                };
            }
            return null;
        },
        css: function(e, t) {
            var i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1) for (var n in e) this[i].style[n] = e[n];
                    return this;
                }
                if (this[0]) return Z.getComputedStyle(this[0], null).getPropertyValue(e);
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                return this;
            }
            return this;
        },
        each: function(e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
            return this;
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this;
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this;
        },
        is: function(e) {
            var t, i, n = this[0];
            if (!n || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (t = $(e), i = 0; i < t.length; i += 1) if (t[i] === n) return !0;
                return !1;
            }
            if (e === v) return n === v;
            if (e === Z) return n === Z;
            if (e.nodeType || e instanceof d) {
                for (t = e.nodeType ? [ e ] : e, i = 0; i < t.length; i += 1) if (t[i] === n) return !0;
                return !1;
            }
            return !1;
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
                return e;
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t, i = this.length;
            return new d(i - 1 < e ? [] : e < 0 ? (t = i + e) < 0 ? [] : [ this[t] ] : [ this[e] ]);
        },
        append: function() {
            for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
            for (var n = 0; n < t.length; n += 1) {
                e = t[n];
                for (var a = 0; a < this.length; a += 1) if ("string" == typeof e) {
                    var r = v.createElement("div");
                    for (r.innerHTML = e; r.firstChild; ) this[a].appendChild(r.firstChild);
                } else if (e instanceof d) for (var s = 0; s < e.length; s += 1) this[a].appendChild(e[s]); else this[a].appendChild(e);
            }
            return this;
        },
        prepend: function(e) {
            var t, i;
            for (t = 0; t < this.length; t += 1) if ("string" == typeof e) {
                var n = v.createElement("div");
                for (n.innerHTML = e, i = n.childNodes.length - 1; 0 <= i; i -= 1) this[t].insertBefore(n.childNodes[i], this[t].childNodes[0]);
            } else if (e instanceof d) for (i = 0; i < e.length; i += 1) this[t].insertBefore(e[i], this[t].childNodes[0]); else this[t].insertBefore(e, this[t].childNodes[0]);
            return this;
        },
        next: function(e) {
            return 0 < this.length ? e ? this[0].nextElementSibling && $(this[0].nextElementSibling).is(e) ? new d([ this[0].nextElementSibling ]) : new d([]) : this[0].nextElementSibling ? new d([ this[0].nextElementSibling ]) : new d([]) : new d([]);
        },
        nextAll: function(e) {
            var t = [], i = this[0];
            if (!i) return new d([]);
            for (;i.nextElementSibling; ) {
                var n = i.nextElementSibling;
                e ? $(n).is(e) && t.push(n) : t.push(n), i = n;
            }
            return new d(t);
        },
        prev: function(e) {
            if (0 < this.length) {
                var t = this[0];
                return e ? t.previousElementSibling && $(t.previousElementSibling).is(e) ? new d([ t.previousElementSibling ]) : new d([]) : t.previousElementSibling ? new d([ t.previousElementSibling ]) : new d([]);
            }
            return new d([]);
        },
        prevAll: function(e) {
            var t = [], i = this[0];
            if (!i) return new d([]);
            for (;i.previousElementSibling; ) {
                var n = i.previousElementSibling;
                e ? $(n).is(e) && t.push(n) : t.push(n), i = n;
            }
            return new d(t);
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? $(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return $(r(t));
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var n = this[i].parentNode; n; ) e ? $(n).is(e) && t.push(n) : t.push(n), 
            n = n.parentNode;
            return $(r(t));
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var n = this[i].querySelectorAll(e), a = 0; a < n.length; a += 1) t.push(n[a]);
            return new d(t);
        },
        children: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var n = this[i].childNodes, a = 0; a < n.length; a += 1) e ? 1 === n[a].nodeType && $(n[a]).is(e) && t.push(n[a]) : 1 === n[a].nodeType && t.push(n[a]);
            return new d(r(t));
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this;
        },
        add: function() {
            for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
            var i, n;
            for (i = 0; i < e.length; i += 1) {
                var a = $(e[i]);
                for (n = 0; n < a.length; n += 1) this[this.length] = a[n], this.length += 1;
            }
            return this;
        },
        styles: function() {
            return this[0] ? Z.getComputedStyle(this[0], null) : {};
        }
    };
    Object.keys(t).forEach(function(e) {
        $.fn[e] = t[e];
    });
    var e, i, n, a, ee = {
        deleteProps: function(e) {
            var t = e;
            Object.keys(t).forEach(function(e) {
                try {
                    t[e] = null;
                } catch (e) {}
                try {
                    delete t[e];
                } catch (e) {}
            });
        },
        nextTick: function(e, t) {
            return void 0 === t && (t = 0), setTimeout(e, t);
        },
        now: function() {
            return Date.now();
        },
        getTranslate: function(e, t) {
            var i, n, a;
            void 0 === t && (t = "x");
            var r = Z.getComputedStyle(e, null);
            return Z.WebKitCSSMatrix ? (6 < (n = r.transform || r.webkitTransform).split(",").length && (n = n.split(", ").map(function(e) {
                return e.replace(",", ".");
            }).join(", ")), a = new Z.WebKitCSSMatrix("none" === n ? "" : n)) : i = (a = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), 
            "x" === t && (n = Z.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), 
            "y" === t && (n = Z.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), 
            n || 0;
        },
        parseUrlQuery: function(e) {
            var t, i, n, a, r = {}, s = e || Z.location.href;
            if ("string" == typeof s && s.length) for (a = (i = (s = -1 < s.indexOf("?") ? s.replace(/\S*\?/, "") : "").split("&").filter(function(e) {
                return "" !== e;
            })).length, t = 0; t < a; t += 1) n = i[t].replace(/#\S+/g, "").split("="), r[decodeURIComponent(n[0])] = void 0 === n[1] ? void 0 : decodeURIComponent(n[1]) || "";
            return r;
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object;
        },
        extend: function() {
            for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
            for (var i = Object(e[0]), n = 1; n < e.length; n += 1) {
                var a = e[n];
                if (null != a) for (var r = Object.keys(Object(a)), s = 0, o = r.length; s < o; s += 1) {
                    var l = r[s], d = Object.getOwnPropertyDescriptor(a, l);
                    void 0 !== d && d.enumerable && (ee.isObject(i[l]) && ee.isObject(a[l]) ? ee.extend(i[l], a[l]) : !ee.isObject(i[l]) && ee.isObject(a[l]) ? (i[l] = {}, 
                    ee.extend(i[l], a[l])) : i[l] = a[l]);
                }
            }
            return i;
        }
    }, te = (n = v.createElement("div"), {
        touch: Z.Modernizr && !0 === Z.Modernizr.touch || !!(0 < Z.navigator.maxTouchPoints || "ontouchstart" in Z || Z.DocumentTouch && v instanceof Z.DocumentTouch),
        pointerEvents: !!(Z.navigator.pointerEnabled || Z.PointerEvent || "maxTouchPoints" in Z.navigator && 0 < Z.navigator.maxTouchPoints),
        prefixedPointerEvents: !!Z.navigator.msPointerEnabled,
        transition: (i = n.style, "transition" in i || "webkitTransition" in i || "MozTransition" in i),
        transforms3d: Z.Modernizr && !0 === Z.Modernizr.csstransforms3d || (e = n.style, 
        "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
        flexbox: function() {
            for (var e = n.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1) if (t[i] in e) return !0;
            return !1;
        }(),
        observer: "MutationObserver" in Z || "WebkitMutationObserver" in Z,
        passiveListener: function() {
            var e = !1;
            try {
                var t = Object.defineProperty({}, "passive", {
                    get: function() {
                        e = !0;
                    }
                });
                Z.addEventListener("testPassiveListener", null, t);
            } catch (e) {}
            return e;
        }(),
        gestures: "ongesturestart" in Z
    }), z = {
        isIE: !!Z.navigator.userAgent.match(/Trident/g) || !!Z.navigator.userAgent.match(/MSIE/g),
        isEdge: !!Z.navigator.userAgent.match(/Edge/g),
        isSafari: (a = Z.navigator.userAgent.toLowerCase(), 0 <= a.indexOf("safari") && a.indexOf("chrome") < 0 && a.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(Z.navigator.userAgent)
    }, s = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) {
            t.on(e, t.params.on[e]);
        });
    }, o = {
        components: {
            configurable: !0
        }
    };
    s.prototype.on = function(e, t, i) {
        var n = this;
        if ("function" != typeof t) return n;
        var a = i ? "unshift" : "push";
        return e.split(" ").forEach(function(e) {
            n.eventsListeners[e] || (n.eventsListeners[e] = []), n.eventsListeners[e][a](t);
        }), n;
    }, s.prototype.once = function(i, n, e) {
        function a() {
            for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
            n.apply(r, e), r.off(i, a), a.f7proxy && delete a.f7proxy;
        }
        var r = this;
        return "function" != typeof n ? r : (a.f7proxy = n, r.on(i, a, e));
    }, s.prototype.off = function(e, n) {
        var a = this;
        return a.eventsListeners && e.split(" ").forEach(function(i) {
            void 0 === n ? a.eventsListeners[i] = [] : a.eventsListeners[i] && a.eventsListeners[i].length && a.eventsListeners[i].forEach(function(e, t) {
                (e === n || e.f7proxy && e.f7proxy === n) && a.eventsListeners[i].splice(t, 1);
            });
        }), a;
    }, s.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        var i, n, a, r = this;
        return r.eventsListeners && ("string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], 
        n = e.slice(1, e.length), a = r) : (i = e[0].events, n = e[0].data, a = e[0].context || r), 
        (Array.isArray(i) ? i : i.split(" ")).forEach(function(e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach(function(e) {
                    t.push(e);
                }), t.forEach(function(e) {
                    e.apply(a, n);
                });
            }
        })), r;
    }, s.prototype.useModulesParams = function(i) {
        var n = this;
        n.modules && Object.keys(n.modules).forEach(function(e) {
            var t = n.modules[e];
            t.params && ee.extend(i, t.params);
        });
    }, s.prototype.useModules = function(n) {
        void 0 === n && (n = {});
        var a = this;
        a.modules && Object.keys(a.modules).forEach(function(e) {
            var i = a.modules[e], t = n[e] || {};
            i.instance && Object.keys(i.instance).forEach(function(e) {
                var t = i.instance[e];
                a[e] = "function" == typeof t ? t.bind(a) : t;
            }), i.on && a.on && Object.keys(i.on).forEach(function(e) {
                a.on(e, i.on[e]);
            }), i.create && i.create.bind(a)(t);
        });
    }, o.components.set = function(e) {
        this.use && this.use(e);
    }, s.installModule = function(t) {
        for (var e = [], i = arguments.length - 1; 0 < i--; ) e[i] = arguments[i + 1];
        var n = this;
        n.prototype.modules || (n.prototype.modules = {});
        var a = t.name || Object.keys(n.prototype.modules).length + "_" + ee.now();
        return (n.prototype.modules[a] = t).proto && Object.keys(t.proto).forEach(function(e) {
            n.prototype[e] = t.proto[e];
        }), t.static && Object.keys(t.static).forEach(function(e) {
            n[e] = t.static[e];
        }), t.install && t.install.apply(n, e), n;
    }, s.use = function(e) {
        for (var t = [], i = arguments.length - 1; 0 < i--; ) t[i] = arguments[i + 1];
        var n = this;
        return Array.isArray(e) ? (e.forEach(function(e) {
            return n.installModule(e);
        }), n) : n.installModule.apply(n, [ e ].concat(t));
    }, Object.defineProperties(s, o);
    var c = {
        updateSize: function() {
            var e, t, i = this, n = i.$el;
            e = void 0 !== i.params.width ? i.params.width : n[0].clientWidth, t = void 0 !== i.params.height ? i.params.height : n[0].clientHeight, 
            0 === e && i.isHorizontal() || 0 === t && i.isVertical() || (e = e - parseInt(n.css("padding-left"), 10) - parseInt(n.css("padding-right"), 10), 
            t = t - parseInt(n.css("padding-top"), 10) - parseInt(n.css("padding-bottom"), 10), 
            ee.extend(i, {
                width: e,
                height: t,
                size: i.isHorizontal() ? e : t
            }));
        },
        updateSlides: function() {
            var e = this, t = e.params, i = e.$wrapperEl, n = e.size, a = e.rtlTranslate, r = e.wrongRTL, s = e.virtual && t.virtual.enabled, o = s ? e.virtual.slides.length : e.slides.length, l = i.children("." + e.params.slideClass), d = s ? e.virtual.slides.length : l.length, c = [], u = [], p = [], h = t.slidesOffsetBefore;
            "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
            var f = t.slidesOffsetAfter;
            "function" == typeof f && (f = t.slidesOffsetAfter.call(e));
            var v = e.snapGrid.length, m = e.snapGrid.length, g = t.spaceBetween, y = -h, b = 0, x = 0;
            if (void 0 !== n) {
                var w, T;
                "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * n), 
                e.virtualSize = -g, a ? l.css({
                    marginLeft: "",
                    marginTop: ""
                }) : l.css({
                    marginRight: "",
                    marginBottom: ""
                }), 1 < t.slidesPerColumn && (w = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, 
                "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (w = Math.max(w, t.slidesPerView * t.slidesPerColumn)));
                for (var E, C = t.slidesPerColumn, S = w / C, k = Math.floor(d / t.slidesPerColumn), M = 0; M < d; M += 1) {
                    T = 0;
                    var N = l.eq(M);
                    if (1 < t.slidesPerColumn) {
                        var L = void 0, P = void 0, $ = void 0;
                        "column" === t.slidesPerColumnFill ? ($ = M - (P = Math.floor(M / C)) * C, (k < P || P === k && $ === C - 1) && C <= ($ += 1) && ($ = 0, 
                        P += 1), L = P + $ * w / C, N.css({
                            "-webkit-box-ordinal-group": L,
                            "-moz-box-ordinal-group": L,
                            "-ms-flex-order": L,
                            "-webkit-order": L,
                            order: L
                        })) : P = M - ($ = Math.floor(M / S)) * S, N.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== $ && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", P).attr("data-swiper-row", $);
                    }
                    if ("none" !== N.css("display")) {
                        if ("auto" === t.slidesPerView) {
                            var z = Z.getComputedStyle(N[0], null), D = N[0].style.transform, A = N[0].style.webkitTransform;
                            if (D && (N[0].style.transform = "none"), A && (N[0].style.webkitTransform = "none"), 
                            t.roundLengths) T = e.isHorizontal() ? N.outerWidth(!0) : N.outerHeight(!0); else if (e.isHorizontal()) {
                                var I = parseFloat(z.getPropertyValue("width")), O = parseFloat(z.getPropertyValue("padding-left")), H = parseFloat(z.getPropertyValue("padding-right")), _ = parseFloat(z.getPropertyValue("margin-left")), j = parseFloat(z.getPropertyValue("margin-right")), B = z.getPropertyValue("box-sizing");
                                T = B && "border-box" === B ? I + _ + j : I + O + H + _ + j;
                            } else {
                                var q = parseFloat(z.getPropertyValue("height")), F = parseFloat(z.getPropertyValue("padding-top")), R = parseFloat(z.getPropertyValue("padding-bottom")), X = parseFloat(z.getPropertyValue("margin-top")), W = parseFloat(z.getPropertyValue("margin-bottom")), V = z.getPropertyValue("box-sizing");
                                T = V && "border-box" === V ? q + X + W : q + F + R + X + W;
                            }
                            D && (N[0].style.transform = D), A && (N[0].style.webkitTransform = A), t.roundLengths && (T = Math.floor(T));
                        } else T = (n - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), 
                        l[M] && (e.isHorizontal() ? l[M].style.width = T + "px" : l[M].style.height = T + "px");
                        l[M] && (l[M].swiperSlideSize = T), p.push(T), t.centeredSlides ? (y = y + T / 2 + b / 2 + g, 
                        0 === b && 0 !== M && (y = y - n / 2 - g), 0 === M && (y = y - n / 2 - g), Math.abs(y) < .001 && (y = 0), 
                        t.roundLengths && (y = Math.floor(y)), x % t.slidesPerGroup == 0 && c.push(y), u.push(y)) : (t.roundLengths && (y = Math.floor(y)), 
                        x % t.slidesPerGroup == 0 && c.push(y), u.push(y), y = y + T + g), e.virtualSize += T + g, 
                        b = T, x += 1;
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, n) + f, a && r && ("slide" === t.effect || "coverflow" === t.effect) && i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }), te.flexbox && !t.setWrapperSize || (e.isHorizontal() ? i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }) : i.css({
                    height: e.virtualSize + t.spaceBetween + "px"
                })), 1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * w, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, 
                e.isHorizontal() ? i.css({
                    width: e.virtualSize + t.spaceBetween + "px"
                }) : i.css({
                    height: e.virtualSize + t.spaceBetween + "px"
                }), t.centeredSlides)) {
                    E = [];
                    for (var G = 0; G < c.length; G += 1) {
                        var Y = c[G];
                        t.roundLengths && (Y = Math.floor(Y)), c[G] < e.virtualSize + c[0] && E.push(Y);
                    }
                    c = E;
                }
                if (!t.centeredSlides) {
                    E = [];
                    for (var U = 0; U < c.length; U += 1) {
                        var K = c[U];
                        t.roundLengths && (K = Math.floor(K)), c[U] <= e.virtualSize - n && E.push(K);
                    }
                    c = E, 1 < Math.floor(e.virtualSize - n) - Math.floor(c[c.length - 1]) && c.push(e.virtualSize - n);
                }
                if (0 === c.length && (c = [ 0 ]), 0 !== t.spaceBetween && (e.isHorizontal() ? a ? l.css({
                    marginLeft: g + "px"
                }) : l.css({
                    marginRight: g + "px"
                }) : l.css({
                    marginBottom: g + "px"
                })), t.centerInsufficientSlides) {
                    var J = 0;
                    if (p.forEach(function(e) {
                        J += e + (t.spaceBetween ? t.spaceBetween : 0);
                    }), (J -= t.spaceBetween) < n) {
                        var Q = (n - J) / 2;
                        c.forEach(function(e, t) {
                            c[t] = e - Q;
                        }), u.forEach(function(e, t) {
                            u[t] = e + Q;
                        });
                    }
                }
                ee.extend(e, {
                    slides: l,
                    snapGrid: c,
                    slidesGrid: u,
                    slidesSizesGrid: p
                }), d !== o && e.emit("slidesLengthChange"), c.length !== v && (e.params.watchOverflow && e.checkOverflow(), 
                e.emit("snapGridLengthChange")), u.length !== m && e.emit("slidesGridLengthChange"), 
                (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset();
            }
        },
        updateAutoHeight: function(e) {
            var t, i = this, n = [], a = 0;
            if ("number" == typeof e ? i.setTransition(e) : !0 === e && i.setTransition(i.params.speed), 
            "auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView) for (t = 0; t < Math.ceil(i.params.slidesPerView); t += 1) {
                var r = i.activeIndex + t;
                if (r > i.slides.length) break;
                n.push(i.slides.eq(r)[0]);
            } else n.push(i.slides.eq(i.activeIndex)[0]);
            for (t = 0; t < n.length; t += 1) if (void 0 !== n[t]) {
                var s = n[t].offsetHeight;
                a = a < s ? s : a;
            }
            a && i.$wrapperEl.css("height", a + "px");
        },
        updateSlidesOffset: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop;
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this, i = t.params, n = t.slides, a = t.rtlTranslate;
            if (0 !== n.length) {
                void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
                var r = -e;
                a && (r = e), n.removeClass(i.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                for (var s = 0; s < n.length; s += 1) {
                    var o = n[s], l = (r + (i.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + i.spaceBetween);
                    if (i.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset), c = d + t.slidesSizesGrid[s];
                        (0 <= d && d < t.size || 0 < c && c <= t.size || d <= 0 && c >= t.size) && (t.visibleSlides.push(o), 
                        t.visibleSlidesIndexes.push(s), n.eq(s).addClass(i.slideVisibleClass));
                    }
                    o.progress = a ? -l : l;
                }
                t.visibleSlides = $(t.visibleSlides);
            }
        },
        updateProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this, i = t.params, n = t.maxTranslate() - t.minTranslate(), a = t.progress, r = t.isBeginning, s = t.isEnd, o = r, l = s;
            0 === n ? s = r = !(a = 0) : (r = (a = (e - t.minTranslate()) / n) <= 0, s = 1 <= a), 
            ee.extend(t, {
                progress: a,
                isBeginning: r,
                isEnd: s
            }), (i.watchSlidesProgress || i.watchSlidesVisibility) && t.updateSlidesProgress(e), 
            r && !o && t.emit("reachBeginning toEdge"), s && !l && t.emit("reachEnd toEdge"), 
            (o && !r || l && !s) && t.emit("fromEdge"), t.emit("progress", a);
        },
        updateSlidesClasses: function() {
            var e, t = this, i = t.slides, n = t.params, a = t.$wrapperEl, r = t.activeIndex, s = t.realIndex, o = t.virtual && n.virtual.enabled;
            i.removeClass(n.slideActiveClass + " " + n.slideNextClass + " " + n.slidePrevClass + " " + n.slideDuplicateActiveClass + " " + n.slideDuplicateNextClass + " " + n.slideDuplicatePrevClass), 
            (e = o ? t.$wrapperEl.find("." + n.slideClass + '[data-swiper-slide-index="' + r + '"]') : i.eq(r)).addClass(n.slideActiveClass), 
            n.loop && (e.hasClass(n.slideDuplicateClass) ? a.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + s + '"]').addClass(n.slideDuplicateActiveClass) : a.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + s + '"]').addClass(n.slideDuplicateActiveClass));
            var l = e.nextAll("." + n.slideClass).eq(0).addClass(n.slideNextClass);
            n.loop && 0 === l.length && (l = i.eq(0)).addClass(n.slideNextClass);
            var d = e.prevAll("." + n.slideClass).eq(0).addClass(n.slidePrevClass);
            n.loop && 0 === d.length && (d = i.eq(-1)).addClass(n.slidePrevClass), n.loop && (l.hasClass(n.slideDuplicateClass) ? a.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicateNextClass) : a.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicateNextClass), 
            d.hasClass(n.slideDuplicateClass) ? a.children("." + n.slideClass + ":not(." + n.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicatePrevClass) : a.children("." + n.slideClass + "." + n.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(n.slideDuplicatePrevClass));
        },
        updateActiveIndex: function(e) {
            var t, i = this, n = i.rtlTranslate ? i.translate : -i.translate, a = i.slidesGrid, r = i.snapGrid, s = i.params, o = i.activeIndex, l = i.realIndex, d = i.snapIndex, c = e;
            if (void 0 === c) {
                for (var u = 0; u < a.length; u += 1) void 0 !== a[u + 1] ? n >= a[u] && n < a[u + 1] - (a[u + 1] - a[u]) / 2 ? c = u : n >= a[u] && n < a[u + 1] && (c = u + 1) : n >= a[u] && (c = u);
                s.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
            }
            if ((t = 0 <= r.indexOf(n) ? r.indexOf(n) : Math.floor(c / s.slidesPerGroup)) >= r.length && (t = r.length - 1), 
            c !== o) {
                var p = parseInt(i.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
                ee.extend(i, {
                    snapIndex: t,
                    realIndex: p,
                    previousIndex: o,
                    activeIndex: c
                }), i.emit("activeIndexChange"), i.emit("snapIndexChange"), l !== p && i.emit("realIndexChange"), 
                i.emit("slideChange");
            } else t !== d && (i.snapIndex = t, i.emit("snapIndexChange"));
        },
        updateClickedSlide: function(e) {
            var t = this, i = t.params, n = $(e.target).closest("." + i.slideClass)[0], a = !1;
            if (n) for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === n && (a = !0);
            if (!n || !a) return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
            t.clickedSlide = n, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt($(n).attr("data-swiper-slide-index"), 10) : t.clickedIndex = $(n).index(), 
            i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
        }
    }, u = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params, i = this.rtlTranslate, n = this.translate, a = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -n : n;
            var r = ee.getTranslate(a[0], e);
            return i && (r = -r), r || 0;
        },
        setTranslate: function(e, t) {
            var i = this, n = i.rtlTranslate, a = i.params, r = i.$wrapperEl, s = i.progress, o = 0, l = 0;
            i.isHorizontal() ? o = n ? -e : e : l = e, a.roundLengths && (o = Math.floor(o), 
            l = Math.floor(l)), a.virtualTranslate || (te.transforms3d ? r.transform("translate3d(" + o + "px, " + l + "px, 0px)") : r.transform("translate(" + o + "px, " + l + "px)")), 
            i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? o : l;
            var d = i.maxTranslate() - i.minTranslate();
            (0 === d ? 0 : (e - i.minTranslate()) / d) !== s && i.updateProgress(e), i.emit("setTranslate", i.translate, t);
        },
        minTranslate: function() {
            return -this.snapGrid[0];
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
    }, p = {
        slideTo: function(e, t, i, n) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = this, r = e;
            r < 0 && (r = 0);
            var s = a.params, o = a.snapGrid, l = a.slidesGrid, d = a.previousIndex, c = a.activeIndex, u = a.rtlTranslate;
            if (a.animating && s.preventInteractionOnTransition) return !1;
            var p = Math.floor(r / s.slidesPerGroup);
            p >= o.length && (p = o.length - 1), (c || s.initialSlide || 0) === (d || 0) && i && a.emit("beforeSlideChangeStart");
            var h, f = -o[p];
            if (a.updateProgress(f), s.normalizeSlideIndex) for (var v = 0; v < l.length; v += 1) -Math.floor(100 * f) >= Math.floor(100 * l[v]) && (r = v);
            if (a.initialized && r !== c) {
                if (!a.allowSlideNext && f < a.translate && f < a.minTranslate()) return !1;
                if (!a.allowSlidePrev && f > a.translate && f > a.maxTranslate() && (c || 0) !== r) return !1;
            }
            return h = c < r ? "next" : r < c ? "prev" : "reset", u && -f === a.translate || !u && f === a.translate ? (a.updateActiveIndex(r), 
            s.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== s.effect && a.setTranslate(f), 
            "reset" !== h && (a.transitionStart(i, h), a.transitionEnd(i, h)), !1) : (0 !== t && te.transition ? (a.setTransition(t), 
            a.setTranslate(f), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, n), 
            a.transitionStart(i, h), a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) {
                a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), 
                a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), 
                a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, 
                a.transitionEnd(i, h));
            }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), 
            a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd))) : (a.setTransition(0), 
            a.setTranslate(f), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, n), 
            a.transitionStart(i, h), a.transitionEnd(i, h)), !0);
        },
        slideToLoop: function(e, t, i, n) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, n);
        },
        slideNext: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this, a = n.params, r = n.animating;
            return a.loop ? !r && (n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft, 
            n.slideTo(n.activeIndex + a.slidesPerGroup, e, t, i)) : n.slideTo(n.activeIndex + a.slidesPerGroup, e, t, i);
        },
        slidePrev: function(e, t, i) {
            function n(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var a = this, r = a.params, s = a.animating, o = a.snapGrid, l = a.slidesGrid, d = a.rtlTranslate;
            if (r.loop) {
                if (s) return !1;
                a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft;
            }
            var c, u = n(d ? a.translate : -a.translate), p = o.map(function(e) {
                return n(e);
            }), h = (l.map(function(e) {
                return n(e);
            }), o[p.indexOf(u)], o[p.indexOf(u) - 1]);
            return void 0 !== h && (c = l.indexOf(h)) < 0 && (c = a.activeIndex - 1), a.slideTo(c, e, t, i);
        },
        slideReset: function(e, t, i) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i);
        },
        slideToClosest: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var n = this, a = n.activeIndex, r = Math.floor(a / n.params.slidesPerGroup);
            if (r < n.snapGrid.length - 1) {
                var s = n.rtlTranslate ? n.translate : -n.translate, o = n.snapGrid[r];
                (n.snapGrid[r + 1] - o) / 2 < s - o && (a = n.params.slidesPerGroup);
            }
            return n.slideTo(a, e, t, i);
        },
        slideToClickedSlide: function() {
            var e, t = this, i = t.params, n = t.$wrapperEl, a = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, r = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                e = parseInt($(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? r < t.loopedSlides - a / 2 || r > t.slides.length - t.loopedSlides + a / 2 ? (t.loopFix(), 
                r = n.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), 
                ee.nextTick(function() {
                    t.slideTo(r);
                })) : t.slideTo(r) : r > t.slides.length - a ? (t.loopFix(), r = n.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), 
                ee.nextTick(function() {
                    t.slideTo(r);
                })) : t.slideTo(r);
            } else t.slideTo(r);
        }
    }, h = {
        loopCreate: function() {
            var n = this, e = n.params, t = n.$wrapperEl;
            t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove();
            var a = t.children("." + e.slideClass);
            if (e.loopFillGroupWithBlank) {
                var i = e.slidesPerGroup - a.length % e.slidesPerGroup;
                if (i !== e.slidesPerGroup) {
                    for (var r = 0; r < i; r += 1) {
                        var s = $(v.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                        t.append(s);
                    }
                    a = t.children("." + e.slideClass);
                }
            }
            "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = a.length), n.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), 
            n.loopedSlides += e.loopAdditionalSlides, n.loopedSlides > a.length && (n.loopedSlides = a.length);
            var o = [], l = [];
            a.each(function(e, t) {
                var i = $(t);
                e < n.loopedSlides && l.push(t), e < a.length && e >= a.length - n.loopedSlides && o.push(t), 
                i.attr("data-swiper-slide-index", e);
            });
            for (var d = 0; d < l.length; d += 1) t.append($(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass));
            for (var c = o.length - 1; 0 <= c; c -= 1) t.prepend($(o[c].cloneNode(!0)).addClass(e.slideDuplicateClass));
        },
        loopFix: function() {
            var e, t = this, i = t.params, n = t.activeIndex, a = t.slides, r = t.loopedSlides, s = t.allowSlidePrev, o = t.allowSlideNext, l = t.snapGrid, d = t.rtlTranslate;
            t.allowSlidePrev = !0, t.allowSlideNext = !0;
            var c = -l[n] - t.getTranslate();
            n < r ? (e = a.length - 3 * r + n, e += r, t.slideTo(e, 0, !1, !0) && 0 !== c && t.setTranslate((d ? -t.translate : t.translate) - c)) : ("auto" === i.slidesPerView && 2 * r <= n || n >= a.length - r) && (e = -a.length + n + r, 
            e += r, t.slideTo(e, 0, !1, !0) && 0 !== c && t.setTranslate((d ? -t.translate : t.translate) - c)), 
            t.allowSlidePrev = s, t.allowSlideNext = o;
        },
        loopDestroy: function() {
            var e = this.$wrapperEl, t = this.params, i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), 
            i.removeAttr("data-swiper-slide-index");
        }
    }, f = {
        setGrabCursor: function(e) {
            if (!(te.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", 
                t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab";
            }
        },
        unsetGrabCursor: function() {
            te.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "");
        }
    }, m = {
        appendSlide: function(e) {
            var t = this, i = t.$wrapperEl, n = t.params;
            if (n.loop && t.loopDestroy(), "object" == typeof e && "length" in e) for (var a = 0; a < e.length; a += 1) e[a] && i.append(e[a]); else i.append(e);
            n.loop && t.loopCreate(), n.observer && te.observer || t.update();
        },
        prependSlide: function(e) {
            var t = this, i = t.params, n = t.$wrapperEl, a = t.activeIndex;
            i.loop && t.loopDestroy();
            var r = a + 1;
            if ("object" == typeof e && "length" in e) {
                for (var s = 0; s < e.length; s += 1) e[s] && n.prepend(e[s]);
                r = a + e.length;
            } else n.prepend(e);
            i.loop && t.loopCreate(), i.observer && te.observer || t.update(), t.slideTo(r, 0, !1);
        },
        addSlide: function(e, t) {
            var i = this, n = i.$wrapperEl, a = i.params, r = i.activeIndex;
            a.loop && (r -= i.loopedSlides, i.loopDestroy(), i.slides = n.children("." + a.slideClass));
            var s = i.slides.length;
            if (e <= 0) i.prependSlide(t); else if (s <= e) i.appendSlide(t); else {
                for (var o = e < r ? r + 1 : r, l = [], d = s - 1; e <= d; d -= 1) {
                    var c = i.slides.eq(d);
                    c.remove(), l.unshift(c);
                }
                if ("object" == typeof t && "length" in t) {
                    for (var u = 0; u < t.length; u += 1) t[u] && n.append(t[u]);
                    o = e < r ? r + t.length : r;
                } else n.append(t);
                for (var p = 0; p < l.length; p += 1) n.append(l[p]);
                a.loop && i.loopCreate(), a.observer && te.observer || i.update(), a.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1);
            }
        },
        removeSlide: function(e) {
            var t = this, i = t.params, n = t.$wrapperEl, a = t.activeIndex;
            i.loop && (a -= t.loopedSlides, t.loopDestroy(), t.slides = n.children("." + i.slideClass));
            var r, s = a;
            if ("object" == typeof e && "length" in e) {
                for (var o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), 
                r < s && (s -= 1);
                s = Math.max(s, 0);
            } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < s && (s -= 1), s = Math.max(s, 0);
            i.loop && t.loopCreate(), i.observer && te.observer || t.update(), i.loop ? t.slideTo(s + t.loopedSlides, 0, !1) : t.slideTo(s, 0, !1);
        },
        removeAllSlides: function() {
            for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
            this.removeSlide(e);
        }
    }, g = function() {
        var e = Z.navigator.userAgent, t = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            windows: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            cordova: Z.cordova || Z.phonegap,
            phonegap: Z.cordova || Z.phonegap
        }, i = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/), n = e.match(/(Android);?[\s\/]+([\d.]+)?/), a = e.match(/(iPad).*OS\s([\d_]+)/), r = e.match(/(iPod)(.*OS\s([\d_]+))?/), s = !a && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (i && (t.os = "windows", t.osVersion = i[2], t.windows = !0), n && !i && (t.os = "android", 
        t.osVersion = n[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), 
        (a || s || r) && (t.os = "ios", t.ios = !0), s && !r && (t.osVersion = s[2].replace(/_/g, "."), 
        t.iphone = !0), a && (t.osVersion = a[2].replace(/_/g, "."), t.ipad = !0), r && (t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null, 
        t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), 
        t.desktop = !(t.os || t.android || t.webView), t.webView = (s || a || r) && e.match(/.*AppleWebKit(?!.*Safari)/i), 
        t.os && "ios" === t.os) {
            var o = t.osVersion.split("."), l = v.querySelector('meta[name="viewport"]');
            t.minimalUi = !t.webView && (r || s) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui");
        }
        return t.pixelRatio = Z.devicePixelRatio || 1, t;
    }(), y = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsInverse: !1,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0
    }, b = {
        update: c,
        translate: u,
        transition: {
            setTransition: function(e, t) {
                this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
            },
            transitionStart: function(e, t) {
                void 0 === e && (e = !0);
                var i = this, n = i.activeIndex, a = i.params, r = i.previousIndex;
                a.autoHeight && i.updateAutoHeight();
                var s = t;
                if (s || (s = r < n ? "next" : n < r ? "prev" : "reset"), i.emit("transitionStart"), 
                e && n !== r) {
                    if ("reset" === s) return void i.emit("slideResetTransitionStart");
                    i.emit("slideChangeTransitionStart"), "next" === s ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart");
                }
            },
            transitionEnd: function(e, t) {
                void 0 === e && (e = !0);
                var i = this, n = i.activeIndex, a = i.previousIndex;
                i.animating = !1, i.setTransition(0);
                var r = t;
                if (r || (r = a < n ? "next" : n < a ? "prev" : "reset"), i.emit("transitionEnd"), 
                e && n !== a) {
                    if ("reset" === r) return void i.emit("slideResetTransitionEnd");
                    i.emit("slideChangeTransitionEnd"), "next" === r ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd");
                }
            }
        },
        slide: p,
        loop: h,
        grabCursor: f,
        manipulation: m,
        events: {
            attachEvents: function() {
                var e = this, t = e.params, i = e.touchEvents, n = e.el, a = e.wrapperEl;
                e.onTouchStart = function(e) {
                    var t = this, i = t.touchEventsData, n = t.params, a = t.touches;
                    if (!t.animating || !n.preventInteractionOnTransition) {
                        var r = e;
                        if (r.originalEvent && (r = r.originalEvent), i.isTouchEvent = "touchstart" === r.type, 
                        (i.isTouchEvent || !("which" in r) || 3 !== r.which) && !(!i.isTouchEvent && "button" in r && 0 < r.button || i.isTouched && i.isMoved)) if (n.noSwiping && $(r.target).closest(n.noSwipingSelector ? n.noSwipingSelector : "." + n.noSwipingClass)[0]) t.allowClick = !0; else if (!n.swipeHandler || $(r).closest(n.swipeHandler)[0]) {
                            a.currentX = "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX, a.currentY = "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY;
                            var s = a.currentX, o = a.currentY, l = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection, d = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
                            if (!l || !(s <= d || s >= Z.screen.width - d)) {
                                if (ee.extend(i, {
                                    isTouched: !0,
                                    isMoved: !1,
                                    allowTouchCallbacks: !0,
                                    isScrolling: void 0,
                                    startMoving: void 0
                                }), a.startX = s, a.startY = o, i.touchStartTime = ee.now(), t.allowClick = !0, 
                                t.updateSize(), t.swipeDirection = void 0, 0 < n.threshold && (i.allowThresholdMove = !1), 
                                "touchstart" !== r.type) {
                                    var c = !0;
                                    $(r.target).is(i.formElements) && (c = !1), v.activeElement && $(v.activeElement).is(i.formElements) && v.activeElement !== r.target && v.activeElement.blur();
                                    var u = c && t.allowTouchMove && n.touchStartPreventDefault;
                                    (n.touchStartForcePreventDefault || u) && r.preventDefault();
                                }
                                t.emit("touchStart", r);
                            }
                        }
                    }
                }.bind(e), e.onTouchMove = function(e) {
                    var t = this, i = t.touchEventsData, n = t.params, a = t.touches, r = t.rtlTranslate, s = e;
                    if (s.originalEvent && (s = s.originalEvent), i.isTouched) {
                        if (!i.isTouchEvent || "mousemove" !== s.type) {
                            var o = "touchmove" === s.type ? s.targetTouches[0].pageX : s.pageX, l = "touchmove" === s.type ? s.targetTouches[0].pageY : s.pageY;
                            if (s.preventedByNestedSwiper) return a.startX = o, void (a.startY = l);
                            if (!t.allowTouchMove) return t.allowClick = !1, void (i.isTouched && (ee.extend(a, {
                                startX: o,
                                startY: l,
                                currentX: o,
                                currentY: l
                            }), i.touchStartTime = ee.now()));
                            if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop) if (t.isVertical()) {
                                if (l < a.startY && t.translate <= t.maxTranslate() || l > a.startY && t.translate >= t.minTranslate()) return i.isTouched = !1, 
                                void (i.isMoved = !1);
                            } else if (o < a.startX && t.translate <= t.maxTranslate() || o > a.startX && t.translate >= t.minTranslate()) return;
                            if (i.isTouchEvent && v.activeElement && s.target === v.activeElement && $(s.target).is(i.formElements)) return i.isMoved = !0, 
                            void (t.allowClick = !1);
                            if (i.allowTouchCallbacks && t.emit("touchMove", s), !(s.targetTouches && 1 < s.targetTouches.length)) {
                                a.currentX = o, a.currentY = l;
                                var d, c = a.currentX - a.startX, u = a.currentY - a.startY;
                                if (!(t.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < t.params.threshold)) if (void 0 === i.isScrolling && (t.isHorizontal() && a.currentY === a.startY || t.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : 25 <= c * c + u * u && (d = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI, 
                                i.isScrolling = t.isHorizontal() ? d > n.touchAngle : 90 - d > n.touchAngle)), i.isScrolling && t.emit("touchMoveOpposite", s), 
                                void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)), 
                                i.isScrolling) i.isTouched = !1; else if (i.startMoving) {
                                    t.allowClick = !1, s.preventDefault(), n.touchMoveStopPropagation && !n.nested && s.stopPropagation(), 
                                    i.isMoved || (n.loop && t.loopFix(), i.startTranslate = t.getTranslate(), t.setTransition(0), 
                                    t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, 
                                    !n.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), 
                                    t.emit("sliderFirstMove", s)), t.emit("sliderMove", s), i.isMoved = !0;
                                    var p = t.isHorizontal() ? c : u;
                                    a.diff = p, p *= n.touchRatio, r && (p = -p), t.swipeDirection = 0 < p ? "prev" : "next", 
                                    i.currentTranslate = p + i.startTranslate;
                                    var h = !0, f = n.resistanceRatio;
                                    if (n.touchReleaseOnEdges && (f = 0), 0 < p && i.currentTranslate > t.minTranslate() ? (h = !1, 
                                    n.resistance && (i.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + i.startTranslate + p, f))) : p < 0 && i.currentTranslate < t.maxTranslate() && (h = !1, 
                                    n.resistance && (i.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - i.startTranslate - p, f))), 
                                    h && (s.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), 
                                    !t.allowSlidePrev && "prev" === t.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), 
                                    0 < n.threshold) {
                                        if (!(Math.abs(p) > n.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                                        if (!i.allowThresholdMove) return i.allowThresholdMove = !0, a.startX = a.currentX, 
                                        a.startY = a.currentY, i.currentTranslate = i.startTranslate, void (a.diff = t.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY);
                                    }
                                    n.followFinger && ((n.freeMode || n.watchSlidesProgress || n.watchSlidesVisibility) && (t.updateActiveIndex(), 
                                    t.updateSlidesClasses()), n.freeMode && (0 === i.velocities.length && i.velocities.push({
                                        position: a[t.isHorizontal() ? "startX" : "startY"],
                                        time: i.touchStartTime
                                    }), i.velocities.push({
                                        position: a[t.isHorizontal() ? "currentX" : "currentY"],
                                        time: ee.now()
                                    })), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate));
                                }
                            }
                        }
                    } else i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", s);
                }.bind(e), e.onTouchEnd = function(e) {
                    var t = this, i = t.touchEventsData, n = t.params, a = t.touches, r = t.rtlTranslate, s = t.$wrapperEl, o = t.slidesGrid, l = t.snapGrid, d = e;
                    if (d.originalEvent && (d = d.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", d), 
                    i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && n.grabCursor && t.setGrabCursor(!1), 
                    i.isMoved = !1, void (i.startMoving = !1);
                    n.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                    var c, u = ee.now(), p = u - i.touchStartTime;
                    if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), p < 300 && 300 < u - i.lastClickTime && (i.clickTimeout && clearTimeout(i.clickTimeout), 
                    i.clickTimeout = ee.nextTick(function() {
                        t && !t.destroyed && t.emit("click", d);
                    }, 300)), p < 300 && u - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), 
                    t.emit("doubleTap", d))), i.lastClickTime = ee.now(), ee.nextTick(function() {
                        t.destroyed || (t.allowClick = !0);
                    }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, 
                    i.isMoved = !1, void (i.startMoving = !1);
                    if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, c = n.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, 
                    n.freeMode) {
                        if (c < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                        if (c > -t.maxTranslate()) return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                        if (n.freeModeMomentum) {
                            if (1 < i.velocities.length) {
                                var h = i.velocities.pop(), f = i.velocities.pop(), v = h.position - f.position, m = h.time - f.time;
                                t.velocity = v / m, t.velocity /= 2, Math.abs(t.velocity) < n.freeModeMinimumVelocity && (t.velocity = 0), 
                                (150 < m || 300 < ee.now() - h.time) && (t.velocity = 0);
                            } else t.velocity = 0;
                            t.velocity *= n.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                            var g = 1e3 * n.freeModeMomentumRatio, y = t.velocity * g, b = t.translate + y;
                            r && (b = -b);
                            var x, w, T = !1, E = 20 * Math.abs(t.velocity) * n.freeModeMomentumBounceRatio;
                            if (b < t.maxTranslate()) n.freeModeMomentumBounce ? (b + t.maxTranslate() < -E && (b = t.maxTranslate() - E), 
                            x = t.maxTranslate(), T = !0, i.allowMomentumBounce = !0) : b = t.maxTranslate(), 
                            n.loop && n.centeredSlides && (w = !0); else if (b > t.minTranslate()) n.freeModeMomentumBounce ? (b - t.minTranslate() > E && (b = t.minTranslate() + E), 
                            x = t.minTranslate(), T = !0, i.allowMomentumBounce = !0) : b = t.minTranslate(), 
                            n.loop && n.centeredSlides && (w = !0); else if (n.freeModeSticky) {
                                for (var C, S = 0; S < l.length; S += 1) if (l[S] > -b) {
                                    C = S;
                                    break;
                                }
                                b = -(b = Math.abs(l[C] - b) < Math.abs(l[C - 1] - b) || "next" === t.swipeDirection ? l[C] : l[C - 1]);
                            }
                            if (w && t.once("transitionEnd", function() {
                                t.loopFix();
                            }), 0 !== t.velocity) g = r ? Math.abs((-b - t.translate) / t.velocity) : Math.abs((b - t.translate) / t.velocity); else if (n.freeModeSticky) return void t.slideToClosest();
                            n.freeModeMomentumBounce && T ? (t.updateProgress(x), t.setTransition(g), t.setTranslate(b), 
                            t.transitionStart(!0, t.swipeDirection), t.animating = !0, s.transitionEnd(function() {
                                t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(n.speed), 
                                t.setTranslate(x), s.transitionEnd(function() {
                                    t && !t.destroyed && t.transitionEnd();
                                }));
                            })) : t.velocity ? (t.updateProgress(b), t.setTransition(g), t.setTranslate(b), 
                            t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, s.transitionEnd(function() {
                                t && !t.destroyed && t.transitionEnd();
                            }))) : t.updateProgress(b), t.updateActiveIndex(), t.updateSlidesClasses();
                        } else if (n.freeModeSticky) return void t.slideToClosest();
                        (!n.freeModeMomentum || p >= n.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), 
                        t.updateSlidesClasses());
                    } else {
                        for (var k = 0, M = t.slidesSizesGrid[0], N = 0; N < o.length; N += n.slidesPerGroup) void 0 !== o[N + n.slidesPerGroup] ? c >= o[N] && c < o[N + n.slidesPerGroup] && (M = o[(k = N) + n.slidesPerGroup] - o[N]) : c >= o[N] && (k = N, 
                        M = o[o.length - 1] - o[o.length - 2]);
                        var L = (c - o[k]) / M;
                        if (p > n.longSwipesMs) {
                            if (!n.longSwipes) return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && (L >= n.longSwipesRatio ? t.slideTo(k + n.slidesPerGroup) : t.slideTo(k)), 
                            "prev" === t.swipeDirection && (L > 1 - n.longSwipesRatio ? t.slideTo(k + n.slidesPerGroup) : t.slideTo(k));
                        } else {
                            if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
                            "next" === t.swipeDirection && t.slideTo(k + n.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(k);
                        }
                    }
                }.bind(e), e.onClick = function(e) {
                    this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), 
                    e.stopImmediatePropagation()));
                }.bind(e);
                var r = "container" === t.touchEventsTarget ? n : a, s = !!t.nested;
                if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                    if (te.touch) {
                        var o = !("touchstart" !== i.start || !te.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        r.addEventListener(i.start, e.onTouchStart, o), r.addEventListener(i.move, e.onTouchMove, te.passiveListener ? {
                            passive: !1,
                            capture: s
                        } : s), r.addEventListener(i.end, e.onTouchEnd, o);
                    }
                    (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !te.touch && g.ios) && (r.addEventListener("mousedown", e.onTouchStart, !1), 
                    v.addEventListener("mousemove", e.onTouchMove, s), v.addEventListener("mouseup", e.onTouchEnd, !1));
                } else r.addEventListener(i.start, e.onTouchStart, !1), v.addEventListener(i.move, e.onTouchMove, s), 
                v.addEventListener(i.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", e.onClick, !0), 
                e.on(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", l, !0);
            },
            detachEvents: function() {
                var e = this, t = e.params, i = e.touchEvents, n = e.el, a = e.wrapperEl, r = "container" === t.touchEventsTarget ? n : a, s = !!t.nested;
                if (te.touch || !te.pointerEvents && !te.prefixedPointerEvents) {
                    if (te.touch) {
                        var o = !("onTouchStart" !== i.start || !te.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        r.removeEventListener(i.start, e.onTouchStart, o), r.removeEventListener(i.move, e.onTouchMove, s), 
                        r.removeEventListener(i.end, e.onTouchEnd, o);
                    }
                    (t.simulateTouch && !g.ios && !g.android || t.simulateTouch && !te.touch && g.ios) && (r.removeEventListener("mousedown", e.onTouchStart, !1), 
                    v.removeEventListener("mousemove", e.onTouchMove, s), v.removeEventListener("mouseup", e.onTouchEnd, !1));
                } else r.removeEventListener(i.start, e.onTouchStart, !1), v.removeEventListener(i.move, e.onTouchMove, s), 
                v.removeEventListener(i.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", e.onClick, !0), 
                e.off(g.ios || g.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", l);
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                var e = this, t = e.activeIndex, i = e.initialized, n = e.loopedSlides;
                void 0 === n && (n = 0);
                var a = e.params, r = a.breakpoints;
                if (r && (!r || 0 !== Object.keys(r).length)) {
                    var s = e.getBreakpoint(r);
                    if (s && e.currentBreakpoint !== s) {
                        var o = s in r ? r[s] : void 0;
                        o && [ "slidesPerView", "spaceBetween", "slidesPerGroup" ].forEach(function(e) {
                            var t = o[e];
                            void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto");
                        });
                        var l = o || e.originalParams, d = l.direction && l.direction !== a.direction, c = a.loop && (l.slidesPerView !== a.slidesPerView || d);
                        d && i && e.changeDirection(), ee.extend(e.params, l), ee.extend(e, {
                            allowTouchMove: e.params.allowTouchMove,
                            allowSlideNext: e.params.allowSlideNext,
                            allowSlidePrev: e.params.allowSlidePrev
                        }), e.currentBreakpoint = s, c && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), 
                        e.slideTo(t - n + e.loopedSlides, 0, !1)), e.emit("breakpoint", l);
                    }
                }
            },
            getBreakpoint: function(e) {
                if (e) {
                    var t = !1, i = [];
                    Object.keys(e).forEach(function(e) {
                        i.push(e);
                    }), i.sort(function(e, t) {
                        return parseInt(e, 10) - parseInt(t, 10);
                    });
                    for (var n = 0; n < i.length; n += 1) {
                        var a = i[n];
                        this.params.breakpointsInverse ? a <= Z.innerWidth && (t = a) : a >= Z.innerWidth && !t && (t = a);
                    }
                    return t || "max";
                }
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                var e = this, t = e.isLocked;
                e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, 
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, 
                e.navigation.update());
            }
        },
        classes: {
            addClasses: function() {
                var t = this.classNames, i = this.params, e = this.rtl, n = this.$el, a = [];
                a.push("initialized"), a.push(i.direction), i.freeMode && a.push("free-mode"), te.flexbox || a.push("no-flexbox"), 
                i.autoHeight && a.push("autoheight"), e && a.push("rtl"), 1 < i.slidesPerColumn && a.push("multirow"), 
                g.android && a.push("android"), g.ios && a.push("ios"), (z.isIE || z.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && a.push("wp8-" + i.direction), 
                a.forEach(function(e) {
                    t.push(i.containerModifierClass + e);
                }), n.addClass(t.join(" "));
            },
            removeClasses: function() {
                var e = this.$el, t = this.classNames;
                e.removeClass(t.join(" "));
            }
        },
        images: {
            loadImage: function(e, t, i, n, a, r) {
                function s() {
                    r && r();
                }
                var o;
                e.complete && a ? s() : t ? ((o = new Z.Image()).onload = s, o.onerror = s, n && (o.sizes = n), 
                i && (o.srcset = i), t && (o.src = t)) : s();
            },
            preloadImages: function() {
                function e() {
                    null != t && t && !t.destroyed && (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1), 
                    t.imagesLoaded === t.imagesToLoad.length && (t.params.updateOnImagesReady && t.update(), 
                    t.emit("imagesReady")));
                }
                var t = this;
                t.imagesToLoad = t.$el.find("img");
                for (var i = 0; i < t.imagesToLoad.length; i += 1) {
                    var n = t.imagesToLoad[i];
                    t.loadImage(n, n.currentSrc || n.getAttribute("src"), n.srcset || n.getAttribute("srcset"), n.sizes || n.getAttribute("sizes"), !0, e);
                }
            }
        }
    }, x = {}, w = function(p) {
        function h() {
            for (var e, t, a, i = [], n = arguments.length; n--; ) i[n] = arguments[n];
            1 === i.length && i[0].constructor && i[0].constructor === Object ? a = i[0] : (t = (e = i)[0], 
            a = e[1]), a || (a = {}), a = ee.extend({}, a), t && !a.el && (a.el = t), p.call(this, a), 
            Object.keys(b).forEach(function(t) {
                Object.keys(b[t]).forEach(function(e) {
                    h.prototype[e] || (h.prototype[e] = b[t][e]);
                });
            });
            var r = this;
            void 0 === r.modules && (r.modules = {}), Object.keys(r.modules).forEach(function(e) {
                var t = r.modules[e];
                if (t.params) {
                    var i = Object.keys(t.params)[0], n = t.params[i];
                    if ("object" != typeof n || null === n) return;
                    if (!(i in a && "enabled" in n)) return;
                    !0 === a[i] && (a[i] = {
                        enabled: !0
                    }), "object" != typeof a[i] || "enabled" in a[i] || (a[i].enabled = !0), a[i] || (a[i] = {
                        enabled: !1
                    });
                }
            });
            var s = ee.extend({}, y);
            r.useModulesParams(s), r.params = ee.extend({}, s, x, a), r.originalParams = ee.extend({}, r.params), 
            r.passedParams = ee.extend({}, a);
            var o = (r.$ = $)(r.params.el);
            if (t = o[0]) {
                if (1 < o.length) {
                    var l = [];
                    return o.each(function(e, t) {
                        var i = ee.extend({}, a, {
                            el: t
                        });
                        l.push(new h(i));
                    }), l;
                }
                t.swiper = r, o.data("swiper", r);
                var d, c, u = o.children("." + r.params.wrapperClass);
                return ee.extend(r, {
                    $el: o,
                    el: t,
                    $wrapperEl: u,
                    wrapperEl: u[0],
                    classNames: [],
                    slides: $(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: function() {
                        return "horizontal" === r.params.direction;
                    },
                    isVertical: function() {
                        return "vertical" === r.params.direction;
                    },
                    rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"),
                    rtlTranslate: "horizontal" === r.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")),
                    wrongRTL: "-webkit-box" === u.css("display"),
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: r.params.allowSlideNext,
                    allowSlidePrev: r.params.allowSlidePrev,
                    touchEvents: (d = [ "touchstart", "touchmove", "touchend" ], c = [ "mousedown", "mousemove", "mouseup" ], 
                    te.pointerEvents ? c = [ "pointerdown", "pointermove", "pointerup" ] : te.prefixedPointerEvents && (c = [ "MSPointerDown", "MSPointerMove", "MSPointerUp" ]), 
                    r.touchEventsTouch = {
                        start: d[0],
                        move: d[1],
                        end: d[2]
                    }, r.touchEventsDesktop = {
                        start: c[0],
                        move: c[1],
                        end: c[2]
                    }, te.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        formElements: "input, select, option, textarea, button, video",
                        lastClickTime: ee.now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: r.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }), r.useModules(), r.params.init && r.init(), r;
            }
        }
        p && (h.__proto__ = p);
        var e = {
            extendedDefaults: {
                configurable: !0
            },
            defaults: {
                configurable: !0
            },
            Class: {
                configurable: !0
            },
            $: {
                configurable: !0
            }
        };
        return ((h.prototype = Object.create(p && p.prototype)).constructor = h).prototype.slidesPerViewDynamic = function() {
            var e = this, t = e.params, i = e.slides, n = e.slidesGrid, a = e.size, r = e.activeIndex, s = 1;
            if (t.centeredSlides) {
                for (var o, l = i[r].swiperSlideSize, d = r + 1; d < i.length; d += 1) i[d] && !o && (s += 1, 
                a < (l += i[d].swiperSlideSize) && (o = !0));
                for (var c = r - 1; 0 <= c; c -= 1) i[c] && !o && (s += 1, a < (l += i[c].swiperSlideSize) && (o = !0));
            } else for (var u = r + 1; u < i.length; u += 1) n[u] - n[r] < a && (s += 1);
            return s;
        }, h.prototype.update = function() {
            function e() {
                var e = i.rtlTranslate ? -1 * i.translate : i.translate, t = Math.min(Math.max(e, i.maxTranslate()), i.minTranslate());
                i.setTranslate(t), i.updateActiveIndex(), i.updateSlidesClasses();
            }
            var i = this;
            if (i && !i.destroyed) {
                var t = i.snapGrid, n = i.params;
                n.breakpoints && i.setBreakpoint(), i.updateSize(), i.updateSlides(), i.updateProgress(), 
                i.updateSlidesClasses(), i.params.freeMode ? (e(), i.params.autoHeight && i.updateAutoHeight()) : (("auto" === i.params.slidesPerView || 1 < i.params.slidesPerView) && i.isEnd && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0)) || e(), 
                n.watchOverflow && t !== i.snapGrid && i.checkOverflow(), i.emit("update");
            }
        }, h.prototype.changeDirection = function(i, e) {
            void 0 === e && (e = !0);
            var t = this, n = t.params.direction;
            return i || (i = "horizontal" === n ? "vertical" : "horizontal"), i === n || "horizontal" !== i && "vertical" !== i || ("vertical" === n && (t.$el.removeClass(t.params.containerModifierClass + "vertical wp8-vertical").addClass("" + t.params.containerModifierClass + i), 
            (z.isIE || z.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + i)), 
            "horizontal" === n && (t.$el.removeClass(t.params.containerModifierClass + "horizontal wp8-horizontal").addClass("" + t.params.containerModifierClass + i), 
            (z.isIE || z.isEdge) && (te.pointerEvents || te.prefixedPointerEvents) && t.$el.addClass(t.params.containerModifierClass + "wp8-" + i)), 
            t.params.direction = i, t.slides.each(function(e, t) {
                "vertical" === i ? t.style.width = "" : t.style.height = "";
            }), t.emit("changeDirection"), e && t.update()), t;
        }, h.prototype.init = function() {
            var e = this;
            e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), 
            e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), 
            e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), 
            e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), 
            e.attachEvents(), e.initialized = !0, e.emit("init"));
        }, h.prototype.destroy = function(e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            var i = this, n = i.params, a = i.$el, r = i.$wrapperEl, s = i.slides;
            return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, 
            i.detachEvents(), n.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), 
            r.removeAttr("style"), s && s.length && s.removeClass([ n.slideVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), 
            i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function(e) {
                i.off(e);
            }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), ee.deleteProps(i)), 
            i.destroyed = !0), null;
        }, h.extendDefaults = function(e) {
            ee.extend(x, e);
        }, e.extendedDefaults.get = function() {
            return x;
        }, e.defaults.get = function() {
            return y;
        }, e.Class.get = function() {
            return p;
        }, e.$.get = function() {
            return $;
        }, Object.defineProperties(h, e), h;
    }(s), T = {
        name: "device",
        proto: {
            device: g
        },
        static: {
            device: g
        }
    }, E = {
        name: "support",
        proto: {
            support: te
        },
        static: {
            support: te
        }
    }, C = {
        name: "browser",
        proto: {
            browser: z
        },
        static: {
            browser: z
        }
    }, S = {
        name: "resize",
        create: function() {
            var e = this;
            ee.extend(e, {
                resize: {
                    resizeHandler: function() {
                        e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"));
                    },
                    orientationChangeHandler: function() {
                        e && !e.destroyed && e.initialized && e.emit("orientationchange");
                    }
                }
            });
        },
        on: {
            init: function() {
                Z.addEventListener("resize", this.resize.resizeHandler), Z.addEventListener("orientationchange", this.resize.orientationChangeHandler);
            },
            destroy: function() {
                Z.removeEventListener("resize", this.resize.resizeHandler), Z.removeEventListener("orientationchange", this.resize.orientationChangeHandler);
            }
        }
    }, k = {
        func: Z.MutationObserver || Z.WebkitMutationObserver,
        attach: function(e, t) {
            void 0 === t && (t = {});
            var i = this, n = new k.func(function(e) {
                if (1 !== e.length) {
                    var t = function() {
                        i.emit("observerUpdate", e[0]);
                    };
                    Z.requestAnimationFrame ? Z.requestAnimationFrame(t) : Z.setTimeout(t, 0);
                } else i.emit("observerUpdate", e[0]);
            });
            n.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }), i.observer.observers.push(n);
        },
        init: function() {
            var e = this;
            if (te.observer && e.params.observer) {
                if (e.params.observeParents) for (var t = e.$el.parents(), i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
                e.observer.attach(e.$el[0], {
                    childList: e.params.observeSlideChildren
                }), e.observer.attach(e.$wrapperEl[0], {
                    attributes: !1
                });
            }
        },
        destroy: function() {
            this.observer.observers.forEach(function(e) {
                e.disconnect();
            }), this.observer.observers = [];
        }
    }, M = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        },
        create: function() {
            ee.extend(this, {
                observer: {
                    init: k.init.bind(this),
                    attach: k.attach.bind(this),
                    destroy: k.destroy.bind(this),
                    observers: []
                }
            });
        },
        on: {
            init: function() {
                this.observer.init();
            },
            destroy: function() {
                this.observer.destroy();
            }
        }
    }, N = {
        update: function(e) {
            function t() {
                i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.lazy && i.params.lazy.enabled && i.lazy.load();
            }
            var i = this, n = i.params, a = n.slidesPerView, r = n.slidesPerGroup, s = n.centeredSlides, o = i.params.virtual, l = o.addSlidesBefore, d = o.addSlidesAfter, c = i.virtual, u = c.from, p = c.to, h = c.slides, f = c.slidesGrid, v = c.renderSlide, m = c.offset;
            i.updateActiveIndex();
            var g, y, b, x = i.activeIndex || 0;
            g = i.rtlTranslate ? "right" : i.isHorizontal() ? "left" : "top", s ? (y = Math.floor(a / 2) + r + l, 
            b = Math.floor(a / 2) + r + d) : (y = a + (r - 1) + l, b = r + d);
            var w = Math.max((x || 0) - b, 0), T = Math.min((x || 0) + y, h.length - 1), E = (i.slidesGrid[w] || 0) - (i.slidesGrid[0] || 0);
            if (ee.extend(i.virtual, {
                from: w,
                to: T,
                offset: E,
                slidesGrid: i.slidesGrid
            }), u === w && p === T && !e) return i.slidesGrid !== f && E !== m && i.slides.css(g, E + "px"), 
            void i.updateProgress();
            if (i.params.virtual.renderExternal) return i.params.virtual.renderExternal.call(i, {
                offset: E,
                from: w,
                to: T,
                slides: function() {
                    for (var e = [], t = w; t <= T; t += 1) e.push(h[t]);
                    return e;
                }()
            }), void t();
            var C = [], S = [];
            if (e) i.$wrapperEl.find("." + i.params.slideClass).remove(); else for (var k = u; k <= p; k += 1) (k < w || T < k) && i.$wrapperEl.find("." + i.params.slideClass + '[data-swiper-slide-index="' + k + '"]').remove();
            for (var M = 0; M < h.length; M += 1) w <= M && M <= T && (void 0 === p || e ? S.push(M) : (p < M && S.push(M), 
            M < u && C.push(M)));
            S.forEach(function(e) {
                i.$wrapperEl.append(v(h[e], e));
            }), C.sort(function(e, t) {
                return t - e;
            }).forEach(function(e) {
                i.$wrapperEl.prepend(v(h[e], e));
            }), i.$wrapperEl.children(".swiper-slide").css(g, E + "px"), t();
        },
        renderSlide: function(e, t) {
            var i = this, n = i.params.virtual;
            if (n.cache && i.virtual.cache[t]) return i.virtual.cache[t];
            var a = n.renderSlide ? $(n.renderSlide.call(i, e, t)) : $('<div class="' + i.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
            return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), 
            n.cache && (i.virtual.cache[t] = a), a;
        },
        appendSlide: function(e) {
            if ("object" == typeof e && "length" in e) for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]); else this.virtual.slides.push(e);
            this.virtual.update(!0);
        },
        prependSlide: function(e) {
            var t = this, i = t.activeIndex, n = i + 1, a = 1;
            if (Array.isArray(e)) {
                for (var r = 0; r < e.length; r += 1) e[r] && t.virtual.slides.unshift(e[r]);
                n = i + e.length, a = e.length;
            } else t.virtual.slides.unshift(e);
            if (t.params.virtual.cache) {
                var s = t.virtual.cache, o = {};
                Object.keys(s).forEach(function(e) {
                    o[parseInt(e, 10) + a] = s[e];
                }), t.virtual.cache = o;
            }
            t.virtual.update(!0), t.slideTo(n, 0);
        },
        removeSlide: function(e) {
            var t = this;
            if (null != e) {
                var i = t.activeIndex;
                if (Array.isArray(e)) for (var n = e.length - 1; 0 <= n; n -= 1) t.virtual.slides.splice(e[n], 1), 
                t.params.virtual.cache && delete t.virtual.cache[e[n]], e[n] < i && (i -= 1), i = Math.max(i, 0); else t.virtual.slides.splice(e, 1), 
                t.params.virtual.cache && delete t.virtual.cache[e], e < i && (i -= 1), i = Math.max(i, 0);
                t.virtual.update(!0), t.slideTo(i, 0);
            }
        },
        removeAllSlides: function() {
            var e = this;
            e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), 
            e.slideTo(0, 0);
        }
    }, L = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                virtual: {
                    update: N.update.bind(e),
                    appendSlide: N.appendSlide.bind(e),
                    prependSlide: N.prependSlide.bind(e),
                    removeSlide: N.removeSlide.bind(e),
                    removeAllSlides: N.removeAllSlides.bind(e),
                    renderSlide: N.renderSlide.bind(e),
                    slides: e.params.virtual.slides,
                    cache: {}
                }
            });
        },
        on: {
            beforeInit: function() {
                var e = this;
                if (e.params.virtual.enabled) {
                    e.classNames.push(e.params.containerModifierClass + "virtual");
                    var t = {
                        watchSlidesProgress: !0
                    };
                    ee.extend(e.params, t), ee.extend(e.originalParams, t), e.params.initialSlide || e.virtual.update();
                }
            },
            setTranslate: function() {
                this.params.virtual.enabled && this.virtual.update();
            }
        }
    }, P = {
        handle: function(e) {
            var t = this, i = t.rtlTranslate, n = e;
            n.originalEvent && (n = n.originalEvent);
            var a = n.keyCode || n.charCode;
            if (!t.allowSlideNext && (t.isHorizontal() && 39 === a || t.isVertical() && 40 === a)) return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && 37 === a || t.isVertical() && 38 === a)) return !1;
            if (!(n.shiftKey || n.altKey || n.ctrlKey || n.metaKey || v.activeElement && v.activeElement.nodeName && ("input" === v.activeElement.nodeName.toLowerCase() || "textarea" === v.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (37 === a || 39 === a || 38 === a || 40 === a)) {
                    var r = !1;
                    if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                    var s = Z.innerWidth, o = Z.innerHeight, l = t.$el.offset();
                    i && (l.left -= t.$el[0].scrollLeft);
                    for (var d = [ [ l.left, l.top ], [ l.left + t.width, l.top ], [ l.left, l.top + t.height ], [ l.left + t.width, l.top + t.height ] ], c = 0; c < d.length; c += 1) {
                        var u = d[c];
                        0 <= u[0] && u[0] <= s && 0 <= u[1] && u[1] <= o && (r = !0);
                    }
                    if (!r) return;
                }
                t.isHorizontal() ? (37 !== a && 39 !== a || (n.preventDefault ? n.preventDefault() : n.returnValue = !1), 
                (39 === a && !i || 37 === a && i) && t.slideNext(), (37 === a && !i || 39 === a && i) && t.slidePrev()) : (38 !== a && 40 !== a || (n.preventDefault ? n.preventDefault() : n.returnValue = !1), 
                40 === a && t.slideNext(), 38 === a && t.slidePrev()), t.emit("keyPress", a);
            }
        },
        enable: function() {
            this.keyboard.enabled || ($(v).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0);
        },
        disable: function() {
            this.keyboard.enabled && ($(v).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1);
        }
    }, D = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1,
                onlyInViewport: !0
            }
        },
        create: function() {
            ee.extend(this, {
                keyboard: {
                    enabled: !1,
                    enable: P.enable.bind(this),
                    disable: P.disable.bind(this),
                    handle: P.handle.bind(this)
                }
            });
        },
        on: {
            init: function() {
                this.params.keyboard.enabled && this.keyboard.enable();
            },
            destroy: function() {
                this.keyboard.enabled && this.keyboard.disable();
            }
        }
    }, A = {
        lastScrollTime: ee.now(),
        event: -1 < Z.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
            var e = "onwheel", t = e in v;
            if (!t) {
                var i = v.createElement("div");
                i.setAttribute(e, "return;"), t = "function" == typeof i[e];
            }
            return !t && v.implementation && v.implementation.hasFeature && !0 !== v.implementation.hasFeature("", "") && (t = v.implementation.hasFeature("Events.wheel", "3.0")), 
            t;
        }() ? "wheel" : "mousewheel",
        normalize: function(e) {
            var t = 0, i = 0, n = 0, a = 0;
            return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), 
            "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), 
            "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, a = 10 * i, 
            "deltaY" in e && (a = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || a) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, 
            a *= 40) : (n *= 800, a *= 800)), n && !t && (t = n < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), 
            {
                spinX: t,
                spinY: i,
                pixelX: n,
                pixelY: a
            };
        },
        handleMouseEnter: function() {
            this.mouseEntered = !0;
        },
        handleMouseLeave: function() {
            this.mouseEntered = !1;
        },
        handle: function(e) {
            var t = e, i = this, n = i.params.mousewheel;
            if (!i.mouseEntered && !n.releaseOnEdges) return !0;
            t.originalEvent && (t = t.originalEvent);
            var a = 0, r = i.rtlTranslate ? -1 : 1, s = A.normalize(t);
            if (n.forceToAxis) if (i.isHorizontal()) {
                if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return !0;
                a = s.pixelX * r;
            } else {
                if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return !0;
                a = s.pixelY;
            } else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * r : -s.pixelY;
            if (0 === a) return !0;
            if (n.invert && (a = -a), i.params.freeMode) {
                i.params.loop && i.loopFix();
                var o = i.getTranslate() + a * n.sensitivity, l = i.isBeginning, d = i.isEnd;
                if (o >= i.minTranslate() && (o = i.minTranslate()), o <= i.maxTranslate() && (o = i.maxTranslate()), 
                i.setTransition(0), i.setTranslate(o), i.updateProgress(), i.updateActiveIndex(), 
                i.updateSlidesClasses(), (!l && i.isBeginning || !d && i.isEnd) && i.updateSlidesClasses(), 
                i.params.freeModeSticky && (clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = ee.nextTick(function() {
                    i.slideToClosest();
                }, 300)), i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), 
                o === i.minTranslate() || o === i.maxTranslate()) return !0;
            } else {
                if (60 < ee.now() - i.mousewheel.lastScrollTime) if (a < 0) if (i.isEnd && !i.params.loop || i.animating) {
                    if (n.releaseOnEdges) return !0;
                } else i.slideNext(), i.emit("scroll", t); else if (i.isBeginning && !i.params.loop || i.animating) {
                    if (n.releaseOnEdges) return !0;
                } else i.slidePrev(), i.emit("scroll", t);
                i.mousewheel.lastScrollTime = new Z.Date().getTime();
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1;
        },
        enable: function() {
            var e = this;
            if (!A.event) return !1;
            if (e.mousewheel.enabled) return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = $(e.params.mousewheel.eventsTarged)), 
            t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), 
            t.on(A.event, e.mousewheel.handle), e.mousewheel.enabled = !0;
        },
        disable: function() {
            var e = this;
            if (!A.event) return !1;
            if (!e.mousewheel.enabled) return !1;
            var t = e.$el;
            return "container" !== e.params.mousewheel.eventsTarged && (t = $(e.params.mousewheel.eventsTarged)), 
            t.off(A.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1);
        }
    }, I = {
        update: function() {
            var e = this, t = e.params.navigation;
            if (!e.params.loop) {
                var i = e.navigation, n = i.$nextEl, a = i.$prevEl;
                a && 0 < a.length && (e.isBeginning ? a.addClass(t.disabledClass) : a.removeClass(t.disabledClass), 
                a[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), 
                n && 0 < n.length && (e.isEnd ? n.addClass(t.disabledClass) : n.removeClass(t.disabledClass), 
                n[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass));
            }
        },
        onPrevClick: function(e) {
            e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev();
        },
        onNextClick: function(e) {
            e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext();
        },
        init: function() {
            var e, t, i = this, n = i.params.navigation;
            (n.nextEl || n.prevEl) && (n.nextEl && (e = $(n.nextEl), i.params.uniqueNavElements && "string" == typeof n.nextEl && 1 < e.length && 1 === i.$el.find(n.nextEl).length && (e = i.$el.find(n.nextEl))), 
            n.prevEl && (t = $(n.prevEl), i.params.uniqueNavElements && "string" == typeof n.prevEl && 1 < t.length && 1 === i.$el.find(n.prevEl).length && (t = i.$el.find(n.prevEl))), 
            e && 0 < e.length && e.on("click", i.navigation.onNextClick), t && 0 < t.length && t.on("click", i.navigation.onPrevClick), 
            ee.extend(i.navigation, {
                $nextEl: e,
                nextEl: e && e[0],
                $prevEl: t,
                prevEl: t && t[0]
            }));
        },
        destroy: function() {
            var e = this, t = e.navigation, i = t.$nextEl, n = t.$prevEl;
            i && i.length && (i.off("click", e.navigation.onNextClick), i.removeClass(e.params.navigation.disabledClass)), 
            n && n.length && (n.off("click", e.navigation.onPrevClick), n.removeClass(e.params.navigation.disabledClass));
        }
    }, O = {
        update: function() {
            var e = this, t = e.rtl, a = e.params.pagination;
            if (a.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var r, i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, n = e.pagination.$el, s = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                if (e.params.loop ? ((r = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > i - 1 - 2 * e.loopedSlides && (r -= i - 2 * e.loopedSlides), 
                s - 1 < r && (r -= s), r < 0 && "bullets" !== e.params.paginationType && (r = s + r)) : r = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, 
                "bullets" === a.type && e.pagination.bullets && 0 < e.pagination.bullets.length) {
                    var o, l, d, c = e.pagination.bullets;
                    if (a.dynamicBullets && (e.pagination.bulletSize = c.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), 
                    n.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (a.dynamicMainBullets + 4) + "px"), 
                    1 < a.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += r - e.previousIndex, 
                    e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = a.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), 
                    o = r - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(c.length, a.dynamicMainBullets) - 1)) + o) / 2), 
                    c.removeClass(a.bulletActiveClass + " " + a.bulletActiveClass + "-next " + a.bulletActiveClass + "-next-next " + a.bulletActiveClass + "-prev " + a.bulletActiveClass + "-prev-prev " + a.bulletActiveClass + "-main"), 
                    1 < n.length) c.each(function(e, t) {
                        var i = $(t), n = i.index();
                        n === r && i.addClass(a.bulletActiveClass), a.dynamicBullets && (o <= n && n <= l && i.addClass(a.bulletActiveClass + "-main"), 
                        n === o && i.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), 
                        n === l && i.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next"));
                    }); else if (c.eq(r).addClass(a.bulletActiveClass), a.dynamicBullets) {
                        for (var u = c.eq(o), p = c.eq(l), h = o; h <= l; h += 1) c.eq(h).addClass(a.bulletActiveClass + "-main");
                        u.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), 
                        p.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next");
                    }
                    if (a.dynamicBullets) {
                        var f = Math.min(c.length, a.dynamicMainBullets + 4), v = (e.pagination.bulletSize * f - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize, m = t ? "right" : "left";
                        c.css(e.isHorizontal() ? m : "top", v + "px");
                    }
                }
                if ("fraction" === a.type && (n.find("." + a.currentClass).text(a.formatFractionCurrent(r + 1)), 
                n.find("." + a.totalClass).text(a.formatFractionTotal(s))), "progressbar" === a.type) {
                    var g;
                    g = a.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                    var y = (r + 1) / s, b = 1, x = 1;
                    "horizontal" === g ? b = y : x = y, n.find("." + a.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + b + ") scaleY(" + x + ")").transition(e.params.speed);
                }
                "custom" === a.type && a.renderCustom ? (n.html(a.renderCustom(e, r + 1, s)), e.emit("paginationRender", e, n[0])) : e.emit("paginationUpdate", e, n[0]), 
                n[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](a.lockClass);
            }
        },
        render: function() {
            var e = this, t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, n = e.pagination.$el, a = "";
                if ("bullets" === t.type) {
                    for (var r = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, s = 0; s < r; s += 1) t.renderBullet ? a += t.renderBullet.call(e, s, t.bulletClass) : a += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                    n.html(a), e.pagination.bullets = n.find("." + t.bulletClass);
                }
                "fraction" === t.type && (a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', 
                n.html(a)), "progressbar" === t.type && (a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', 
                n.html(a)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0]);
            }
        },
        init: function() {
            var i = this, e = i.params.pagination;
            if (e.el) {
                var t = $(e.el);
                0 !== t.length && (i.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === i.$el.find(e.el).length && (t = i.$el.find(e.el)), 
                "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), 
                "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), 
                i.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), 
                "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), 
                e.clickable && t.on("click", "." + e.bulletClass, function(e) {
                    e.preventDefault();
                    var t = $(this).index() * i.params.slidesPerGroup;
                    i.params.loop && (t += i.loopedSlides), i.slideTo(t);
                }), ee.extend(i.pagination, {
                    $el: t,
                    el: t[0]
                }));
            }
        },
        destroy: function() {
            var e = this, t = e.params.pagination;
            if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                var i = e.pagination.$el;
                i.removeClass(t.hiddenClass), i.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), 
                t.clickable && i.off("click", "." + t.bulletClass);
            }
        }
    }, H = {
        setTranslate: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar, i = e.rtlTranslate, n = e.progress, a = t.dragSize, r = t.trackSize, s = t.$dragEl, o = t.$el, l = e.params.scrollbar, d = a, c = (r - a) * n;
                i ? 0 < (c = -c) ? (d = a - c, c = 0) : r < -c + a && (d = r + c) : c < 0 ? (d = a + c, 
                c = 0) : r < c + a && (d = r - c), e.isHorizontal() ? (te.transforms3d ? s.transform("translate3d(" + c + "px, 0, 0)") : s.transform("translateX(" + c + "px)"), 
                s[0].style.width = d + "px") : (te.transforms3d ? s.transform("translate3d(0px, " + c + "px, 0)") : s.transform("translateY(" + c + "px)"), 
                s[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, 
                e.scrollbar.timeout = setTimeout(function() {
                    o[0].style.opacity = 0, o.transition(400);
                }, 1e3));
            }
        },
        setTransition: function(e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e);
        },
        updateSize: function() {
            var e = this;
            if (e.params.scrollbar.el && e.scrollbar.el) {
                var t = e.scrollbar, i = t.$dragEl, n = t.$el;
                i[0].style.width = "", i[0].style.height = "";
                var a, r = e.isHorizontal() ? n[0].offsetWidth : n[0].offsetHeight, s = e.size / e.virtualSize, o = s * (r / e.size);
                a = "auto" === e.params.scrollbar.dragSize ? r * s : parseInt(e.params.scrollbar.dragSize, 10), 
                e.isHorizontal() ? i[0].style.width = a + "px" : i[0].style.height = a + "px", n[0].style.display = 1 <= s ? "none" : "", 
                e.params.scrollbar.hide && (n[0].style.opacity = 0), ee.extend(t, {
                    trackSize: r,
                    divider: s,
                    moveDivider: o,
                    dragSize: a
                }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass);
            }
        },
        setDragPosition: function(e) {
            var t, i = this, n = i.scrollbar, a = i.rtlTranslate, r = n.$el, s = n.dragSize, o = n.trackSize;
            t = ((i.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - r.offset()[i.isHorizontal() ? "left" : "top"] - s / 2) / (o - s), 
            t = Math.max(Math.min(t, 1), 0), a && (t = 1 - t);
            var l = i.minTranslate() + (i.maxTranslate() - i.minTranslate()) * t;
            i.updateProgress(l), i.setTranslate(l), i.updateActiveIndex(), i.updateSlidesClasses();
        },
        onDragStart: function(e) {
            var t = this, i = t.params.scrollbar, n = t.scrollbar, a = t.$wrapperEl, r = n.$el, s = n.$dragEl;
            t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.transition(100), 
            s.transition(100), n.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), 
            r.transition(0), i.hide && r.css("opacity", 1), t.emit("scrollbarDragStart", e);
        },
        onDragMove: function(e) {
            var t = this.scrollbar, i = this.$wrapperEl, n = t.$el, a = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, 
            t.setDragPosition(e), i.transition(0), n.transition(0), a.transition(0), this.emit("scrollbarDragMove", e));
        },
        onDragEnd: function(e) {
            var t = this, i = t.params.scrollbar, n = t.scrollbar.$el;
            t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, i.hide && (clearTimeout(t.scrollbar.dragTimeout), 
            t.scrollbar.dragTimeout = ee.nextTick(function() {
                n.css("opacity", 0), n.transition(400);
            }, 1e3)), t.emit("scrollbarDragEnd", e), i.snapOnRelease && t.slideToClosest());
        },
        enableDraggable: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar, i = e.touchEventsTouch, n = e.touchEventsDesktop, a = e.params, r = t.$el[0], s = !(!te.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }, o = !(!te.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.touch ? (r.addEventListener(i.start, e.scrollbar.onDragStart, s), r.addEventListener(i.move, e.scrollbar.onDragMove, s), 
                r.addEventListener(i.end, e.scrollbar.onDragEnd, o)) : (r.addEventListener(n.start, e.scrollbar.onDragStart, s), 
                v.addEventListener(n.move, e.scrollbar.onDragMove, s), v.addEventListener(n.end, e.scrollbar.onDragEnd, o));
            }
        },
        disableDraggable: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar, i = e.touchEventsTouch, n = e.touchEventsDesktop, a = e.params, r = t.$el[0], s = !(!te.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }, o = !(!te.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.touch ? (r.removeEventListener(i.start, e.scrollbar.onDragStart, s), r.removeEventListener(i.move, e.scrollbar.onDragMove, s), 
                r.removeEventListener(i.end, e.scrollbar.onDragEnd, o)) : (r.removeEventListener(n.start, e.scrollbar.onDragStart, s), 
                v.removeEventListener(n.move, e.scrollbar.onDragMove, s), v.removeEventListener(n.end, e.scrollbar.onDragEnd, o));
            }
        },
        init: function() {
            var e = this;
            if (e.params.scrollbar.el) {
                var t = e.scrollbar, i = e.$el, n = e.params.scrollbar, a = $(n.el);
                e.params.uniqueNavElements && "string" == typeof n.el && 1 < a.length && 1 === i.find(n.el).length && (a = i.find(n.el));
                var r = a.find("." + e.params.scrollbar.dragClass);
                0 === r.length && (r = $('<div class="' + e.params.scrollbar.dragClass + '"></div>'), 
                a.append(r)), ee.extend(t, {
                    $el: a,
                    el: a[0],
                    $dragEl: r,
                    dragEl: r[0]
                }), n.draggable && t.enableDraggable();
            }
        },
        destroy: function() {
            this.scrollbar.disableDraggable();
        }
    }, _ = {
        setTransform: function(e, t) {
            var i = this.rtl, n = $(e), a = i ? -1 : 1, r = n.attr("data-swiper-parallax") || "0", s = n.attr("data-swiper-parallax-x"), o = n.attr("data-swiper-parallax-y"), l = n.attr("data-swiper-parallax-scale"), d = n.attr("data-swiper-parallax-opacity");
            if (s || o ? (s = s || "0", o = o || "0") : this.isHorizontal() ? (s = r, o = "0") : (o = r, 
            s = "0"), s = 0 <= s.indexOf("%") ? parseInt(s, 10) * t * a + "%" : s * t * a + "px", 
            o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
                var c = d - (d - 1) * (1 - Math.abs(t));
                n[0].style.opacity = c;
            }
            if (null == l) n.transform("translate3d(" + s + ", " + o + ", 0px)"); else {
                var u = l - (l - 1) * (1 - Math.abs(t));
                n.transform("translate3d(" + s + ", " + o + ", 0px) scale(" + u + ")");
            }
        },
        setTranslate: function() {
            var n = this, e = n.$el, t = n.slides, a = n.progress, r = n.snapGrid;
            e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                n.parallax.setTransform(t, a);
            }), t.each(function(e, t) {
                var i = t.progress;
                1 < n.params.slidesPerGroup && "auto" !== n.params.slidesPerView && (i += Math.ceil(e / 2) - a * (r.length - 1)), 
                i = Math.min(Math.max(i, -1), 1), $(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                    n.parallax.setTransform(t, i);
                });
            });
        },
        setTransition: function(a) {
            void 0 === a && (a = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) {
                var i = $(t), n = parseInt(i.attr("data-swiper-parallax-duration"), 10) || a;
                0 === a && (n = 0), i.transition(n);
            });
        }
    }, j = {
        getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2) return 1;
            var t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, n = e.targetTouches[1].pageX, a = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(n - t, 2) + Math.pow(a - i, 2));
        },
        onGestureStart: function(e) {
            var t = this, i = t.params.zoom, n = t.zoom, a = n.gesture;
            if (n.fakeGestureTouched = !1, n.fakeGestureMoved = !1, !te.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                n.fakeGestureTouched = !0, a.scaleStart = j.getDistanceBetweenTouches(e);
            }
            a.$slideEl && a.$slideEl.length || (a.$slideEl = $(e.target).closest(".swiper-slide"), 
            0 === a.$slideEl.length && (a.$slideEl = t.slides.eq(t.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas"), 
            a.$imageWrapEl = a.$imageEl.parent("." + i.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 
            0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0), t.zoom.isScaling = !0) : a.$imageEl = void 0;
        },
        onGestureChange: function(e) {
            var t = this.params.zoom, i = this.zoom, n = i.gesture;
            if (!te.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                i.fakeGestureMoved = !0, n.scaleMove = j.getDistanceBetweenTouches(e);
            }
            n.$imageEl && 0 !== n.$imageEl.length && (i.scale = te.gestures ? e.scale * i.currentScale : n.scaleMove / n.scaleStart * i.currentScale, 
            i.scale > n.maxRatio && (i.scale = n.maxRatio - 1 + Math.pow(i.scale - n.maxRatio + 1, .5)), 
            i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), 
            n.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
        },
        onGestureEnd: function(e) {
            var t = this.params.zoom, i = this.zoom, n = i.gesture;
            if (!te.gestures) {
                if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !g.android) return;
                i.fakeGestureTouched = !1, i.fakeGestureMoved = !1;
            }
            n.$imageEl && 0 !== n.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, n.maxRatio), t.minRatio), 
            n.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), 
            i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (n.$slideEl = void 0));
        },
        onTouchStart: function(e) {
            var t = this.zoom, i = t.gesture, n = t.image;
            i.$imageEl && 0 !== i.$imageEl.length && (n.isTouched || (g.android && e.preventDefault(), 
            n.isTouched = !0, n.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, 
            n.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY));
        },
        onTouchMove: function(e) {
            var t = this, i = t.zoom, n = i.gesture, a = i.image, r = i.velocity;
            if (n.$imageEl && 0 !== n.$imageEl.length && (t.allowClick = !1, a.isTouched && n.$slideEl)) {
                a.isMoved || (a.width = n.$imageEl[0].offsetWidth, a.height = n.$imageEl[0].offsetHeight, 
                a.startX = ee.getTranslate(n.$imageWrapEl[0], "x") || 0, a.startY = ee.getTranslate(n.$imageWrapEl[0], "y") || 0, 
                n.slideWidth = n.$slideEl[0].offsetWidth, n.slideHeight = n.$slideEl[0].offsetHeight, 
                n.$imageWrapEl.transition(0), t.rtl && (a.startX = -a.startX, a.startY = -a.startY));
                var s = a.width * i.scale, o = a.height * i.scale;
                if (!(s < n.slideWidth && o < n.slideHeight)) {
                    if (a.minX = Math.min(n.slideWidth / 2 - s / 2, 0), a.maxX = -a.minX, a.minY = Math.min(n.slideHeight / 2 - o / 2, 0), 
                    a.maxY = -a.minY, a.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, 
                    a.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, 
                    !a.isMoved && !i.isScaling) {
                        if (t.isHorizontal() && (Math.floor(a.minX) === Math.floor(a.startX) && a.touchesCurrent.x < a.touchesStart.x || Math.floor(a.maxX) === Math.floor(a.startX) && a.touchesCurrent.x > a.touchesStart.x)) return void (a.isTouched = !1);
                        if (!t.isHorizontal() && (Math.floor(a.minY) === Math.floor(a.startY) && a.touchesCurrent.y < a.touchesStart.y || Math.floor(a.maxY) === Math.floor(a.startY) && a.touchesCurrent.y > a.touchesStart.y)) return void (a.isTouched = !1);
                    }
                    e.preventDefault(), e.stopPropagation(), a.isMoved = !0, a.currentX = a.touchesCurrent.x - a.touchesStart.x + a.startX, 
                    a.currentY = a.touchesCurrent.y - a.touchesStart.y + a.startY, a.currentX < a.minX && (a.currentX = a.minX + 1 - Math.pow(a.minX - a.currentX + 1, .8)), 
                    a.currentX > a.maxX && (a.currentX = a.maxX - 1 + Math.pow(a.currentX - a.maxX + 1, .8)), 
                    a.currentY < a.minY && (a.currentY = a.minY + 1 - Math.pow(a.minY - a.currentY + 1, .8)), 
                    a.currentY > a.maxY && (a.currentY = a.maxY - 1 + Math.pow(a.currentY - a.maxY + 1, .8)), 
                    r.prevPositionX || (r.prevPositionX = a.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = a.touchesCurrent.y), 
                    r.prevTime || (r.prevTime = Date.now()), r.x = (a.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, 
                    r.y = (a.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(a.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), 
                    Math.abs(a.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = a.touchesCurrent.x, 
                    r.prevPositionY = a.touchesCurrent.y, r.prevTime = Date.now(), n.$imageWrapEl.transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)");
                }
            }
        },
        onTouchEnd: function() {
            var e = this.zoom, t = e.gesture, i = e.image, n = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
                i.isTouched = !1, i.isMoved = !1;
                var a = 300, r = 300, s = n.x * a, o = i.currentX + s, l = n.y * r, d = i.currentY + l;
                0 !== n.x && (a = Math.abs((o - i.currentX) / n.x)), 0 !== n.y && (r = Math.abs((d - i.currentY) / n.y));
                var c = Math.max(a, r);
                i.currentX = o, i.currentY = d;
                var u = i.width * e.scale, p = i.height * e.scale;
                i.minX = Math.min(t.slideWidth / 2 - u / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - p / 2, 0), 
                i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), 
                t.$imageWrapEl.transition(c).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)");
            }
        },
        onTransitionEnd: function() {
            var e = this.zoom, t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), 
            t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, 
            t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0);
        },
        toggle: function(e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e);
        },
        in: function(e) {
            var t, i, n, a, r, s, o, l, d, c, u, p, h, f, v, m, g = this, y = g.zoom, b = g.params.zoom, x = y.gesture, w = y.image;
            x.$slideEl || (x.$slideEl = g.clickedSlide ? $(g.clickedSlide) : g.slides.eq(g.activeIndex), 
            x.$imageEl = x.$slideEl.find("img, svg, canvas"), x.$imageWrapEl = x.$imageEl.parent("." + b.containerClass)), 
            x.$imageEl && 0 !== x.$imageEl.length && (x.$slideEl.addClass("" + b.zoomedSlideClass), 
            void 0 === w.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, 
            i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = w.touchesStart.x, 
            i = w.touchesStart.y), y.scale = x.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, 
            y.currentScale = x.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, e ? (v = x.$slideEl[0].offsetWidth, 
            m = x.$slideEl[0].offsetHeight, n = x.$slideEl.offset().left + v / 2 - t, a = x.$slideEl.offset().top + m / 2 - i, 
            o = x.$imageEl[0].offsetWidth, l = x.$imageEl[0].offsetHeight, d = o * y.scale, 
            c = l * y.scale, h = -(u = Math.min(v / 2 - d / 2, 0)), f = -(p = Math.min(m / 2 - c / 2, 0)), 
            (r = n * y.scale) < u && (r = u), h < r && (r = h), (s = a * y.scale) < p && (s = p), 
            f < s && (s = f)) : s = r = 0, x.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + s + "px,0)"), 
            x.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + y.scale + ")"));
        },
        out: function() {
            var e = this, t = e.zoom, i = e.params.zoom, n = t.gesture;
            n.$slideEl || (n.$slideEl = e.clickedSlide ? $(e.clickedSlide) : e.slides.eq(e.activeIndex), 
            n.$imageEl = n.$slideEl.find("img, svg, canvas"), n.$imageWrapEl = n.$imageEl.parent("." + i.containerClass)), 
            n.$imageEl && 0 !== n.$imageEl.length && (t.scale = 1, t.currentScale = 1, n.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), 
            n.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), n.$slideEl.removeClass("" + i.zoomedSlideClass), 
            n.$slideEl = void 0);
        },
        enable: function() {
            var e = this, t = e.zoom;
            if (!t.enabled) {
                t.enabled = !0;
                var i = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, i), 
                e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i), 
                e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)), 
                e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove);
            }
        },
        disable: function() {
            var e = this, t = e.zoom;
            if (t.enabled) {
                e.zoom.enabled = !1;
                var i = !("touchstart" !== e.touchEvents.start || !te.passiveListener || !e.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                te.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, i), 
                e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i), 
                e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)), 
                e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove);
            }
        }
    }, B = {
        loadInSlide: function(e, l) {
            void 0 === l && (l = !0);
            var d = this, c = d.params.lazy;
            if (void 0 !== e && 0 !== d.slides.length) {
                var u = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e), t = u.find("." + c.elementClass + ":not(." + c.loadedClass + "):not(." + c.loadingClass + ")");
                !u.hasClass(c.elementClass) || u.hasClass(c.loadedClass) || u.hasClass(c.loadingClass) || (t = t.add(u[0])), 
                0 !== t.length && t.each(function(e, t) {
                    var n = $(t);
                    n.addClass(c.loadingClass);
                    var a = n.attr("data-background"), r = n.attr("data-src"), s = n.attr("data-srcset"), o = n.attr("data-sizes");
                    d.loadImage(n[0], r || a, s, o, !1, function() {
                        if (null != d && d && (!d || d.params) && !d.destroyed) {
                            if (a ? (n.css("background-image", 'url("' + a + '")'), n.removeAttr("data-background")) : (s && (n.attr("srcset", s), 
                            n.removeAttr("data-srcset")), o && (n.attr("sizes", o), n.removeAttr("data-sizes")), 
                            r && (n.attr("src", r), n.removeAttr("data-src"))), n.addClass(c.loadedClass).removeClass(c.loadingClass), 
                            u.find("." + c.preloaderClass).remove(), d.params.loop && l) {
                                var e = u.attr("data-swiper-slide-index");
                                if (u.hasClass(d.params.slideDuplicateClass)) {
                                    var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                    d.lazy.loadInSlide(t.index(), !1);
                                } else {
                                    var i = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    d.lazy.loadInSlide(i.index(), !1);
                                }
                            }
                            d.emit("lazyImageReady", u[0], n[0]);
                        }
                    }), d.emit("lazyImageLoad", u[0], n[0]);
                });
            }
        },
        load: function() {
            function e(e) {
                if (o) {
                    if (i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0;
                } else if (r[e]) return !0;
                return !1;
            }
            function t(e) {
                return o ? $(e).attr("data-swiper-slide-index") : $(e).index();
            }
            var n = this, i = n.$wrapperEl, a = n.params, r = n.slides, s = n.activeIndex, o = n.virtual && a.virtual.enabled, l = a.lazy, d = a.slidesPerView;
            if ("auto" === d && (d = 0), n.lazy.initialImageLoaded || (n.lazy.initialImageLoaded = !0), 
            n.params.watchSlidesVisibility) i.children("." + a.slideVisibleClass).each(function(e, t) {
                var i = o ? $(t).attr("data-swiper-slide-index") : $(t).index();
                n.lazy.loadInSlide(i);
            }); else if (1 < d) for (var c = s; c < s + d; c += 1) e(c) && n.lazy.loadInSlide(c); else n.lazy.loadInSlide(s);
            if (l.loadPrevNext) if (1 < d || l.loadPrevNextAmount && 1 < l.loadPrevNextAmount) {
                for (var u = l.loadPrevNextAmount, p = d, h = Math.min(s + p + Math.max(u, p), r.length), f = Math.max(s - Math.max(p, u), 0), v = s + d; v < h; v += 1) e(v) && n.lazy.loadInSlide(v);
                for (var m = f; m < s; m += 1) e(m) && n.lazy.loadInSlide(m);
            } else {
                var g = i.children("." + a.slideNextClass);
                0 < g.length && n.lazy.loadInSlide(t(g));
                var y = i.children("." + a.slidePrevClass);
                0 < y.length && n.lazy.loadInSlide(t(y));
            }
        }
    }, q = {
        LinearSpline: function(e, t) {
            var i, n, a, r, s;
            return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                return e ? (s = function(e, t) {
                    for (n = -1, i = e.length; 1 < i - n; ) e[a = i + n >> 1] <= t ? n = a : i = a;
                    return i;
                }(this.x, e), r = s - 1, (e - this.x[r]) * (this.y[s] - this.y[r]) / (this.x[s] - this.x[r]) + this.y[r]) : 0;
            }, this;
        },
        getInterpolateFunction: function(e) {
            var t = this;
            t.controller.spline || (t.controller.spline = t.params.loop ? new q.LinearSpline(t.slidesGrid, e.slidesGrid) : new q.LinearSpline(t.snapGrid, e.snapGrid));
        },
        setTranslate: function(e, t) {
            function i(e) {
                var t = r.rtlTranslate ? -r.translate : r.translate;
                "slide" === r.params.controller.by && (r.controller.getInterpolateFunction(e), a = -r.controller.spline.interpolate(-t)), 
                a && "container" !== r.params.controller.by || (n = (e.maxTranslate() - e.minTranslate()) / (r.maxTranslate() - r.minTranslate()), 
                a = (t - r.minTranslate()) * n + e.minTranslate()), r.params.controller.inverse && (a = e.maxTranslate() - a), 
                e.updateProgress(a), e.setTranslate(a, r), e.updateActiveIndex(), e.updateSlidesClasses();
            }
            var n, a, r = this, s = r.controller.control;
            if (Array.isArray(s)) for (var o = 0; o < s.length; o += 1) s[o] !== t && s[o] instanceof w && i(s[o]); else s instanceof w && t !== s && i(s);
        },
        setTransition: function(t, e) {
            function i(e) {
                e.setTransition(t, a), 0 !== t && (e.transitionStart(), e.params.autoHeight && ee.nextTick(function() {
                    e.updateAutoHeight();
                }), e.$wrapperEl.transitionEnd(function() {
                    r && (e.params.loop && "slide" === a.params.controller.by && e.loopFix(), e.transitionEnd());
                }));
            }
            var n, a = this, r = a.controller.control;
            if (Array.isArray(r)) for (n = 0; n < r.length; n += 1) r[n] !== e && r[n] instanceof w && i(r[n]); else r instanceof w && e !== r && i(r);
        }
    }, F = {
        makeElFocusable: function(e) {
            return e.attr("tabIndex", "0"), e;
        },
        addElRole: function(e, t) {
            return e.attr("role", t), e;
        },
        addElLabel: function(e, t) {
            return e.attr("aria-label", t), e;
        },
        disableEl: function(e) {
            return e.attr("aria-disabled", !0), e;
        },
        enableEl: function(e) {
            return e.attr("aria-disabled", !1), e;
        },
        onEnterKey: function(e) {
            var t = this, i = t.params.a11y;
            if (13 === e.keyCode) {
                var n = $(e.target);
                t.navigation && t.navigation.$nextEl && n.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), 
                t.isEnd ? t.a11y.notify(i.lastSlideMessage) : t.a11y.notify(i.nextSlideMessage)), 
                t.navigation && t.navigation.$prevEl && n.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), 
                t.isBeginning ? t.a11y.notify(i.firstSlideMessage) : t.a11y.notify(i.prevSlideMessage)), 
                t.pagination && n.is("." + t.params.pagination.bulletClass) && n[0].click();
            }
        },
        notify: function(e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""), t.html(e));
        },
        updateNavigation: function() {
            var e = this;
            if (!e.params.loop) {
                var t = e.navigation, i = t.$nextEl, n = t.$prevEl;
                n && 0 < n.length && (e.isBeginning ? e.a11y.disableEl(n) : e.a11y.enableEl(n)), 
                i && 0 < i.length && (e.isEnd ? e.a11y.disableEl(i) : e.a11y.enableEl(i));
            }
        },
        updatePagination: function() {
            var n = this, a = n.params.a11y;
            n.pagination && n.params.pagination.clickable && n.pagination.bullets && n.pagination.bullets.length && n.pagination.bullets.each(function(e, t) {
                var i = $(t);
                n.a11y.makeElFocusable(i), n.a11y.addElRole(i, "button"), n.a11y.addElLabel(i, a.paginationBulletMessage.replace(/{{index}}/, i.index() + 1));
            });
        },
        init: function() {
            var e = this;
            e.$el.append(e.a11y.liveRegion);
            var t, i, n = e.params.a11y;
            e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl), 
            t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, n.nextSlideMessage), 
            t.on("keydown", e.a11y.onEnterKey)), i && (e.a11y.makeElFocusable(i), e.a11y.addElRole(i, "button"), 
            e.a11y.addElLabel(i, n.prevSlideMessage), i.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey);
        },
        destroy: function() {
            var e, t, i = this;
            i.a11y.liveRegion && 0 < i.a11y.liveRegion.length && i.a11y.liveRegion.remove(), 
            i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl), i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl), 
            e && e.off("keydown", i.a11y.onEnterKey), t && t.off("keydown", i.a11y.onEnterKey), 
            i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.off("keydown", "." + i.params.pagination.bulletClass, i.a11y.onEnterKey);
        }
    }, R = {
        init: function() {
            var e = this;
            if (e.params.history) {
                if (!Z.history || !Z.history.pushState) return e.params.history.enabled = !1, void (e.params.hashNavigation.enabled = !0);
                var t = e.history;
                t.initialized = !0, t.paths = R.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), 
                e.params.history.replaceState || Z.addEventListener("popstate", e.history.setHistoryPopState));
            }
        },
        destroy: function() {
            this.params.history.replaceState || Z.removeEventListener("popstate", this.history.setHistoryPopState);
        },
        setHistoryPopState: function() {
            this.history.paths = R.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1);
        },
        getPathValues: function() {
            var e = Z.location.pathname.slice(1).split("/").filter(function(e) {
                return "" !== e;
            }), t = e.length;
            return {
                key: e[t - 2],
                value: e[t - 1]
            };
        },
        setHistory: function(e, t) {
            if (this.history.initialized && this.params.history.enabled) {
                var i = this.slides.eq(t), n = R.slugify(i.attr("data-history"));
                Z.location.pathname.includes(e) || (n = e + "/" + n);
                var a = Z.history.state;
                a && a.value === n || (this.params.history.replaceState ? Z.history.replaceState({
                    value: n
                }, null, n) : Z.history.pushState({
                    value: n
                }, null, n));
            }
        },
        slugify: function(e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
        },
        scrollToSlide: function(e, t, i) {
            var n = this;
            if (t) for (var a = 0, r = n.slides.length; a < r; a += 1) {
                var s = n.slides.eq(a);
                if (R.slugify(s.attr("data-history")) === t && !s.hasClass(n.params.slideDuplicateClass)) {
                    var o = s.index();
                    n.slideTo(o, e, i);
                }
            } else n.slideTo(0, e, i);
        }
    }, X = {
        onHashCange: function() {
            var e = this, t = v.location.hash.replace("#", "");
            if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                var i = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index();
                if (void 0 === i) return;
                e.slideTo(i);
            }
        },
        setHash: function() {
            var e = this;
            if (e.hashNavigation.initialized && e.params.hashNavigation.enabled) if (e.params.hashNavigation.replaceState && Z.history && Z.history.replaceState) Z.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""); else {
                var t = e.slides.eq(e.activeIndex), i = t.attr("data-hash") || t.attr("data-history");
                v.location.hash = i || "";
            }
        },
        init: function() {
            var e = this;
            if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                e.hashNavigation.initialized = !0;
                var t = v.location.hash.replace("#", "");
                if (t) for (var i = 0, n = e.slides.length; i < n; i += 1) {
                    var a = e.slides.eq(i);
                    if ((a.attr("data-hash") || a.attr("data-history")) === t && !a.hasClass(e.params.slideDuplicateClass)) {
                        var r = a.index();
                        e.slideTo(r, 0, e.params.runCallbacksOnInit, !0);
                    }
                }
                e.params.hashNavigation.watchState && $(Z).on("hashchange", e.hashNavigation.onHashCange);
            }
        },
        destroy: function() {
            this.params.hashNavigation.watchState && $(Z).off("hashchange", this.hashNavigation.onHashCange);
        }
    }, W = {
        run: function() {
            var e = this, t = e.slides.eq(e.activeIndex), i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), 
            e.autoplay.timeout = ee.nextTick(function() {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), 
                e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), 
                e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), 
                e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), 
                e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
            }, i);
        },
        start: function() {
            var e = this;
            return void 0 === e.autoplay.timeout && !e.autoplay.running && (e.autoplay.running = !0, 
            e.emit("autoplayStart"), e.autoplay.run(), !0);
        },
        stop: function() {
            var e = this;
            return !!e.autoplay.running && void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), 
            e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0);
        },
        pause: function(e) {
            var t = this;
            t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), 
            t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), 
            t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, 
            t.autoplay.run())));
        }
    }, V = {
        setTranslate: function() {
            for (var e = this, t = e.slides, i = 0; i < t.length; i += 1) {
                var n = e.slides.eq(i), a = -n[0].swiperSlideOffset;
                e.params.virtualTranslate || (a -= e.translate);
                var r = 0;
                e.isHorizontal() || (r = a, a = 0);
                var s = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(n[0].progress), 0) : 1 + Math.min(Math.max(n[0].progress, -1), 0);
                n.css({
                    opacity: s
                }).transform("translate3d(" + a + "px, " + r + "px, 0px)");
            }
        },
        setTransition: function(e) {
            var i = this, t = i.slides, n = i.$wrapperEl;
            if (t.transition(e), i.params.virtualTranslate && 0 !== e) {
                var a = !1;
                t.transitionEnd(function() {
                    if (!a && i && !i.destroyed) {
                        a = !0, i.animating = !1;
                        for (var e = [ "webkitTransitionEnd", "transitionend" ], t = 0; t < e.length; t += 1) n.trigger(e[t]);
                    }
                });
            }
        }
    }, G = {
        setTranslate: function() {
            var e, t = this, i = t.$el, n = t.$wrapperEl, a = t.slides, r = t.width, s = t.height, o = t.rtlTranslate, l = t.size, d = t.params.cubeEffect, c = t.isHorizontal(), u = t.virtual && t.params.virtual.enabled, p = 0;
            d.shadow && (c ? (0 === (e = n.find(".swiper-cube-shadow")).length && (e = $('<div class="swiper-cube-shadow"></div>'), 
            n.append(e)), e.css({
                height: r + "px"
            })) : 0 === (e = i.find(".swiper-cube-shadow")).length && (e = $('<div class="swiper-cube-shadow"></div>'), 
            i.append(e)));
            for (var h = 0; h < a.length; h += 1) {
                var f = a.eq(h), v = h;
                u && (v = parseInt(f.attr("data-swiper-slide-index"), 10));
                var m = 90 * v, g = Math.floor(m / 360);
                o && (m = -m, g = Math.floor(-m / 360));
                var y = Math.max(Math.min(f[0].progress, 1), -1), b = 0, x = 0, w = 0;
                v % 4 == 0 ? (b = 4 * -g * l, w = 0) : (v - 1) % 4 == 0 ? (b = 0, w = 4 * -g * l) : (v - 2) % 4 == 0 ? (b = l + 4 * g * l, 
                w = l) : (v - 3) % 4 == 0 && (b = -l, w = 3 * l + 4 * l * g), o && (b = -b), c || (x = b, 
                b = 0);
                var T = "rotateX(" + (c ? 0 : -m) + "deg) rotateY(" + (c ? m : 0) + "deg) translate3d(" + b + "px, " + x + "px, " + w + "px)";
                if (y <= 1 && -1 < y && (p = 90 * v + 90 * y, o && (p = 90 * -v - 90 * y)), f.transform(T), 
                d.slideShadows) {
                    var E = c ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"), C = c ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                    0 === E.length && (E = $('<div class="swiper-slide-shadow-' + (c ? "left" : "top") + '"></div>'), 
                    f.append(E)), 0 === C.length && (C = $('<div class="swiper-slide-shadow-' + (c ? "right" : "bottom") + '"></div>'), 
                    f.append(C)), E.length && (E[0].style.opacity = Math.max(-y, 0)), C.length && (C[0].style.opacity = Math.max(y, 0));
                }
            }
            if (n.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }), d.shadow) if (c) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")"); else {
                var S = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90), k = 1.5 - (Math.sin(2 * S * Math.PI / 360) / 2 + Math.cos(2 * S * Math.PI / 360) / 2), M = d.shadowScale, N = d.shadowScale / k, L = d.shadowOffset;
                e.transform("scale3d(" + M + ", 1, " + N + ") translate3d(0px, " + (s / 2 + L) + "px, " + -s / 2 / N + "px) rotateX(-90deg)");
            }
            var P = z.isSafari || z.isUiWebView ? -l / 2 : 0;
            n.transform("translate3d(0px,0," + P + "px) rotateX(" + (t.isHorizontal() ? 0 : p) + "deg) rotateY(" + (t.isHorizontal() ? -p : 0) + "deg)");
        },
        setTransition: function(e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), 
            this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e);
        }
    }, Y = {
        setTranslate: function() {
            for (var e = this, t = e.slides, i = e.rtlTranslate, n = 0; n < t.length; n += 1) {
                var a = t.eq(n), r = a[0].progress;
                e.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
                var s = -180 * r, o = 0, l = -a[0].swiperSlideOffset, d = 0;
                if (e.isHorizontal() ? i && (s = -s) : (d = l, o = -s, s = l = 0), a[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, 
                e.params.flipEffect.slideShadows) {
                    var c = e.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"), u = e.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                    0 === c.length && (c = $('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), 
                    a.append(c)), 0 === u.length && (u = $('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), 
                    a.append(u)), c.length && (c[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0));
                }
                a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + s + "deg)");
            }
        },
        setTransition: function(e) {
            var i = this, t = i.slides, n = i.activeIndex, a = i.$wrapperEl;
            if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), 
            i.params.virtualTranslate && 0 !== e) {
                var r = !1;
                t.eq(n).transitionEnd(function() {
                    if (!r && i && !i.destroyed) {
                        r = !0, i.animating = !1;
                        for (var e = [ "webkitTransitionEnd", "transitionend" ], t = 0; t < e.length; t += 1) a.trigger(e[t]);
                    }
                });
            }
        }
    }, U = {
        setTranslate: function() {
            for (var e = this, t = e.width, i = e.height, n = e.slides, a = e.$wrapperEl, r = e.slidesSizesGrid, s = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : i / 2 - l, c = o ? s.rotate : -s.rotate, u = s.depth, p = 0, h = n.length; p < h; p += 1) {
                var f = n.eq(p), v = r[p], m = (d - f[0].swiperSlideOffset - v / 2) / v * s.modifier, g = o ? c * m : 0, y = o ? 0 : c * m, b = -u * Math.abs(m), x = o ? 0 : s.stretch * m, w = o ? s.stretch * m : 0;
                Math.abs(w) < .001 && (w = 0), Math.abs(x) < .001 && (x = 0), Math.abs(b) < .001 && (b = 0), 
                Math.abs(g) < .001 && (g = 0), Math.abs(y) < .001 && (y = 0);
                var T = "translate3d(" + w + "px," + x + "px," + b + "px)  rotateX(" + y + "deg) rotateY(" + g + "deg)";
                if (f.transform(T), f[0].style.zIndex = 1 - Math.abs(Math.round(m)), s.slideShadows) {
                    var E = o ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"), C = o ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                    0 === E.length && (E = $('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), 
                    f.append(E)), 0 === C.length && (C = $('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), 
                    f.append(C)), E.length && (E[0].style.opacity = 0 < m ? m : 0), C.length && (C[0].style.opacity = 0 < -m ? -m : 0);
                }
            }
            (te.pointerEvents || te.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = d + "px 50%");
        },
        setTransition: function(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
        }
    }, K = {
        init: function() {
            var e = this, t = e.params.thumbs, i = e.constructor;
            t.swiper instanceof i ? (e.thumbs.swiper = t.swiper, ee.extend(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), ee.extend(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : ee.isObject(t.swiper) && (e.thumbs.swiper = new i(ee.extend({}, t.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), 
            e.thumbs.swiper.on("tap", e.thumbs.onThumbClick);
        },
        onThumbClick: function() {
            var e = this, t = e.thumbs.swiper;
            if (t) {
                var i = t.clickedIndex, n = t.clickedSlide;
                if (!(n && $(n).hasClass(e.params.thumbs.slideThumbActiveClass) || null == i)) {
                    var a;
                    if (a = t.params.loop ? parseInt($(t.clickedSlide).attr("data-swiper-slide-index"), 10) : i, 
                    e.params.loop) {
                        var r = e.activeIndex;
                        e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, 
                        r = e.activeIndex);
                        var s = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(), o = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index();
                        a = void 0 === s ? o : void 0 === o ? s : o - r < r - s ? o : s;
                    }
                    e.slideTo(a);
                }
            }
        },
        update: function(e) {
            var t = this, i = t.thumbs.swiper;
            if (i) {
                var n = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView;
                if (t.realIndex !== i.realIndex) {
                    var a, r = i.activeIndex;
                    if (i.params.loop) {
                        i.slides.eq(r).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, 
                        r = i.activeIndex);
                        var s = i.slides.eq(r).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(), o = i.slides.eq(r).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                        a = void 0 === s ? o : void 0 === o ? s : o - r == r - s ? r : o - r < r - s ? o : s;
                    } else a = t.realIndex;
                    i.visibleSlidesIndexes.indexOf(a) < 0 && (i.params.centeredSlides ? a = r < a ? a - Math.floor(n / 2) + 1 : a + Math.floor(n / 2) - 1 : r < a && (a = a - n + 1), 
                    i.slideTo(a, e ? 0 : void 0));
                }
                var l = 1, d = t.params.thumbs.slideThumbActiveClass;
                if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView), 
                i.slides.removeClass(d), i.params.loop) for (var c = 0; c < l; c += 1) i.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + c) + '"]').addClass(d); else for (var u = 0; u < l; u += 1) i.slides.eq(t.realIndex + u).addClass(d);
            }
        }
    }, J = [ T, E, C, S, M, L, D, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                mousewheel: {
                    enabled: !1,
                    enable: A.enable.bind(e),
                    disable: A.disable.bind(e),
                    handle: A.handle.bind(e),
                    handleMouseEnter: A.handleMouseEnter.bind(e),
                    handleMouseLeave: A.handleMouseLeave.bind(e),
                    lastScrollTime: ee.now()
                }
            });
        },
        on: {
            init: function() {
                this.params.mousewheel.enabled && this.mousewheel.enable();
            },
            destroy: function() {
                this.mousewheel.enabled && this.mousewheel.disable();
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                navigation: {
                    init: I.init.bind(e),
                    update: I.update.bind(e),
                    destroy: I.destroy.bind(e),
                    onNextClick: I.onNextClick.bind(e),
                    onPrevClick: I.onPrevClick.bind(e)
                }
            });
        },
        on: {
            init: function() {
                this.navigation.init(), this.navigation.update();
            },
            toEdge: function() {
                this.navigation.update();
            },
            fromEdge: function() {
                this.navigation.update();
            },
            destroy: function() {
                this.navigation.destroy();
            },
            click: function(e) {
                var t, i = this, n = i.navigation, a = n.$nextEl, r = n.$prevEl;
                !i.params.navigation.hideOnClick || $(e.target).is(r) || $(e.target).is(a) || (a ? t = a.hasClass(i.params.navigation.hiddenClass) : r && (t = r.hasClass(i.params.navigation.hiddenClass)), 
                !0 === t ? i.emit("navigationShow", i) : i.emit("navigationHide", i), a && a.toggleClass(i.params.navigation.hiddenClass), 
                r && r.toggleClass(i.params.navigation.hiddenClass));
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function(e) {
                    return e;
                },
                formatFractionTotal: function(e) {
                    return e;
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                pagination: {
                    init: O.init.bind(e),
                    render: O.render.bind(e),
                    update: O.update.bind(e),
                    destroy: O.destroy.bind(e),
                    dynamicBulletIndex: 0
                }
            });
        },
        on: {
            init: function() {
                this.pagination.init(), this.pagination.render(), this.pagination.update();
            },
            activeIndexChange: function() {
                this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update();
            },
            snapIndexChange: function() {
                this.params.loop || this.pagination.update();
            },
            slidesLengthChange: function() {
                this.params.loop && (this.pagination.render(), this.pagination.update());
            },
            snapGridLengthChange: function() {
                this.params.loop || (this.pagination.render(), this.pagination.update());
            },
            destroy: function() {
                this.pagination.destroy();
            },
            click: function(e) {
                var t = this;
                t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !$(e.target).hasClass(t.params.pagination.bulletClass) && (!0 === t.pagination.$el.hasClass(t.params.pagination.hiddenClass) ? t.emit("paginationShow", t) : t.emit("paginationHide", t), 
                t.pagination.$el.toggleClass(t.params.pagination.hiddenClass));
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                scrollbar: {
                    init: H.init.bind(e),
                    destroy: H.destroy.bind(e),
                    updateSize: H.updateSize.bind(e),
                    setTranslate: H.setTranslate.bind(e),
                    setTransition: H.setTransition.bind(e),
                    enableDraggable: H.enableDraggable.bind(e),
                    disableDraggable: H.disableDraggable.bind(e),
                    setDragPosition: H.setDragPosition.bind(e),
                    onDragStart: H.onDragStart.bind(e),
                    onDragMove: H.onDragMove.bind(e),
                    onDragEnd: H.onDragEnd.bind(e),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            });
        },
        on: {
            init: function() {
                this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate();
            },
            update: function() {
                this.scrollbar.updateSize();
            },
            resize: function() {
                this.scrollbar.updateSize();
            },
            observerUpdate: function() {
                this.scrollbar.updateSize();
            },
            setTranslate: function() {
                this.scrollbar.setTranslate();
            },
            setTransition: function(e) {
                this.scrollbar.setTransition(e);
            },
            destroy: function() {
                this.scrollbar.destroy();
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            ee.extend(this, {
                parallax: {
                    setTransform: _.setTransform.bind(this),
                    setTranslate: _.setTranslate.bind(this),
                    setTransition: _.setTransition.bind(this)
                }
            });
        },
        on: {
            beforeInit: function() {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0);
            },
            init: function() {
                this.params.parallax.enabled && this.parallax.setTranslate();
            },
            setTranslate: function() {
                this.params.parallax.enabled && this.parallax.setTranslate();
            },
            setTransition: function(e) {
                this.params.parallax.enabled && this.parallax.setTransition(e);
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var n = this, t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                }
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(e) {
                t[e] = j[e].bind(n);
            }), ee.extend(n, {
                zoom: t
            });
            var a = 1;
            Object.defineProperty(n.zoom, "scale", {
                get: function() {
                    return a;
                },
                set: function(e) {
                    if (a !== e) {
                        var t = n.zoom.gesture.$imageEl ? n.zoom.gesture.$imageEl[0] : void 0, i = n.zoom.gesture.$slideEl ? n.zoom.gesture.$slideEl[0] : void 0;
                        n.emit("zoomChange", e, t, i);
                    }
                    a = e;
                }
            });
        },
        on: {
            init: function() {
                this.params.zoom.enabled && this.zoom.enable();
            },
            destroy: function() {
                this.zoom.disable();
            },
            touchStart: function(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e);
            },
            touchEnd: function(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e);
            },
            doubleTap: function(e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e);
            },
            transitionEnd: function() {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd();
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            ee.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: B.load.bind(this),
                    loadInSlide: B.loadInSlide.bind(this)
                }
            });
        },
        on: {
            beforeInit: function() {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1);
            },
            init: function() {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load();
            },
            scroll: function() {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load();
            },
            resize: function() {
                this.params.lazy.enabled && this.lazy.load();
            },
            scrollbarDragMove: function() {
                this.params.lazy.enabled && this.lazy.load();
            },
            transitionStart: function() {
                var e = this;
                e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load();
            },
            transitionEnd: function() {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load();
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                controller: {
                    control: e.params.controller.control,
                    getInterpolateFunction: q.getInterpolateFunction.bind(e),
                    setTranslate: q.setTranslate.bind(e),
                    setTransition: q.setTransition.bind(e)
                }
            });
        },
        on: {
            update: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, 
                delete this.controller.spline);
            },
            resize: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, 
                delete this.controller.spline);
            },
            observerUpdate: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0, 
                delete this.controller.spline);
            },
            setTranslate: function(e, t) {
                this.controller.control && this.controller.setTranslate(e, t);
            },
            setTransition: function(e, t) {
                this.controller.control && this.controller.setTransition(e, t);
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function() {
            var t = this;
            ee.extend(t, {
                a11y: {
                    liveRegion: $('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                }
            }), Object.keys(F).forEach(function(e) {
                t.a11y[e] = F[e].bind(t);
            });
        },
        on: {
            init: function() {
                this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation());
            },
            toEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation();
            },
            fromEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation();
            },
            paginationUpdate: function() {
                this.params.a11y.enabled && this.a11y.updatePagination();
            },
            destroy: function() {
                this.params.a11y.enabled && this.a11y.destroy();
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                history: {
                    init: R.init.bind(e),
                    setHistory: R.setHistory.bind(e),
                    setHistoryPopState: R.setHistoryPopState.bind(e),
                    scrollToSlide: R.scrollToSlide.bind(e),
                    destroy: R.destroy.bind(e)
                }
            });
        },
        on: {
            init: function() {
                this.params.history.enabled && this.history.init();
            },
            destroy: function() {
                this.params.history.enabled && this.history.destroy();
            },
            transitionEnd: function() {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex);
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            var e = this;
            ee.extend(e, {
                hashNavigation: {
                    initialized: !1,
                    init: X.init.bind(e),
                    destroy: X.destroy.bind(e),
                    setHash: X.setHash.bind(e),
                    onHashCange: X.onHashCange.bind(e)
                }
            });
        },
        on: {
            init: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.init();
            },
            destroy: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy();
            },
            transitionEnd: function() {
                this.hashNavigation.initialized && this.hashNavigation.setHash();
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function() {
            var t = this;
            ee.extend(t, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: W.run.bind(t),
                    start: W.start.bind(t),
                    stop: W.stop.bind(t),
                    pause: W.pause.bind(t),
                    onTransitionEnd: function(e) {
                        t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), 
                        t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), 
                        t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
                    }
                }
            });
        },
        on: {
            init: function() {
                this.params.autoplay.enabled && this.autoplay.start();
            },
            beforeTransitionStart: function(e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop());
            },
            sliderFirstMove: function() {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause());
            },
            destroy: function() {
                this.autoplay.running && this.autoplay.stop();
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            ee.extend(this, {
                fadeEffect: {
                    setTranslate: V.setTranslate.bind(this),
                    setTransition: V.setTransition.bind(this)
                }
            });
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("fade" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "fade");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t), ee.extend(e.originalParams, t);
                }
            },
            setTranslate: function() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate();
            },
            setTransition: function(e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e);
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            ee.extend(this, {
                cubeEffect: {
                    setTranslate: G.setTranslate.bind(this),
                    setTransition: G.setTransition.bind(this)
                }
            });
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("cube" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t), ee.extend(e.originalParams, t);
                }
            },
            setTranslate: function() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate();
            },
            setTransition: function(e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e);
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            ee.extend(this, {
                flipEffect: {
                    setTranslate: Y.setTranslate.bind(this),
                    setTransition: Y.setTransition.bind(this)
                }
            });
        },
        on: {
            beforeInit: function() {
                var e = this;
                if ("flip" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    ee.extend(e.params, t), ee.extend(e.originalParams, t);
                }
            },
            setTranslate: function() {
                "flip" === this.params.effect && this.flipEffect.setTranslate();
            },
            setTransition: function(e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e);
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            ee.extend(this, {
                coverflowEffect: {
                    setTranslate: U.setTranslate.bind(this),
                    setTransition: U.setTransition.bind(this)
                }
            });
        },
        on: {
            beforeInit: function() {
                var e = this;
                "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), 
                e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, 
                e.originalParams.watchSlidesProgress = !0);
            },
            setTranslate: function() {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate();
            },
            setTransition: function(e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e);
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function() {
            ee.extend(this, {
                thumbs: {
                    swiper: null,
                    init: K.init.bind(this),
                    update: K.update.bind(this),
                    onThumbClick: K.onThumbClick.bind(this)
                }
            });
        },
        on: {
            beforeInit: function() {
                var e = this.params.thumbs;
                e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
            },
            slideChange: function() {
                this.thumbs.swiper && this.thumbs.update();
            },
            update: function() {
                this.thumbs.swiper && this.thumbs.update();
            },
            resize: function() {
                this.thumbs.swiper && this.thumbs.update();
            },
            observerUpdate: function() {
                this.thumbs.swiper && this.thumbs.update();
            },
            setTransition: function(e) {
                var t = this.thumbs.swiper;
                t && t.setTransition(e);
            },
            beforeDestroy: function() {
                var e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy();
            }
        }
    } ];
    return void 0 === w.use && (w.use = w.Class.use, w.installModule = w.Class.installModule), 
    w.use(J), w;
}), function() {
    var L, P;
    L = this.jQuery || window.jQuery, P = L(window), L.fn.stick_in_parent = function(e) {
        var w, T, t, i, E, n, C, S, k, M, N;
        for (null == e && (e = {}), N = e.sticky_class, E = e.inner_scrolling, M = e.recalc_every, 
        k = e.parent, S = e.offset_top, C = e.spacer, T = e.bottoming, null == S && (S = 0), 
        null == k && (k = void 0), null == E && (E = !0), null == N && (N = "is_stuck"), 
        w = L(document), null == T && (T = !0), t = function(a, r, s, o, l, d, c, u) {
            var p, e, h, f, v, m, g, y, t, b, x, n;
            if (!a.data("sticky_kit")) {
                if (a.data("sticky_kit", !0), v = w.height(), g = a.parent(), null != k && (g = g.closest(k)), 
                !g.length) throw "failed to find stick parent";
                if (p = h = !1, (x = null != C ? C && a.closest(C) : L("<div />")) && x.css("position", a.css("position")), 
                (y = function() {
                    var e, t, i;
                    if (!u && (v = w.height(), e = parseInt(g.css("border-top-width"), 10), t = parseInt(g.css("padding-top"), 10), 
                    r = parseInt(g.css("padding-bottom"), 10), s = g.offset().top + e + t, o = g.height(), 
                    h && (p = h = !1, null == C && (a.insertAfter(x), x.detach()), a.css({
                        position: "",
                        top: "",
                        width: "",
                        bottom: ""
                    }).removeClass(N), i = !0), l = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - S, 
                    d = a.outerHeight(!0), c = a.css("float"), x && x.css({
                        width: a.outerWidth(!0),
                        height: d,
                        display: a.css("display"),
                        "vertical-align": a.css("vertical-align"),
                        float: c
                    }), i)) return n();
                })(), d !== o) return f = void 0, m = S, b = M, n = function() {
                    var e, t, i, n;
                    if (!u && (i = !1, null != b && (--b <= 0 && (b = M, y(), i = !0)), i || w.height() === v || y(), 
                    i = P.scrollTop(), null != f && (t = i - f), f = i, h ? (T && (n = o + s < i + d + m, 
                    p && !n && (p = !1, a.css({
                        position: "fixed",
                        bottom: "",
                        top: m
                    }).trigger("sticky_kit:unbottom"))), i < l && (h = !1, m = S, null == C && ("left" !== c && "right" !== c || a.insertAfter(x), 
                    x.detach()), e = {
                        position: "",
                        width: "",
                        top: ""
                    }, a.css(e).removeClass(N).trigger("sticky_kit:unstick")), E && ((e = P.height()) < d + S && !p && (m -= t, 
                    m = Math.max(e - d, m), m = Math.min(S, m), h && a.css({
                        top: m + "px"
                    })))) : l < i && (h = !0, (e = {
                        position: "fixed",
                        top: m
                    }).width = "border-box" === a.css("box-sizing") ? a.outerWidth() + "px" : a.width() + "px", 
                    a.css(e).addClass(N), null == C && (a.after(x), "left" !== c && "right" !== c || x.append(a)), 
                    a.trigger("sticky_kit:stick")), h && T && (null == n && (n = o + s < i + d + m), 
                    !p && n))) return p = !0, "static" === g.css("position") && g.css({
                        position: "relative"
                    }), a.css({
                        position: "absolute",
                        bottom: r,
                        top: "auto"
                    }).trigger("sticky_kit:bottom");
                }, t = function() {
                    return y(), n();
                }, e = function() {
                    if (u = !0, P.off("touchmove", n), P.off("scroll", n), P.off("resize", t), L(document.body).off("sticky_kit:recalc", t), 
                    a.off("sticky_kit:detach", e), a.removeData("sticky_kit"), a.css({
                        position: "",
                        bottom: "",
                        top: "",
                        width: ""
                    }), g.position("position", ""), h) return null == C && ("left" !== c && "right" !== c || a.insertAfter(x), 
                    x.remove()), a.removeClass(N);
                }, P.on("touchmove", n), P.on("scroll", n), P.on("resize", t), L(document.body).on("sticky_kit:recalc", t), 
                a.on("sticky_kit:detach", e), setTimeout(n, 0);
            }
        }, i = 0, n = this.length; i < n; i++) e = this[i], t(L(e));
        return this;
    };
}.call(this), $(document).on("click", ".select_toggle", function(e) {
    e.preventDefault(), e.stopPropagation();
    var t = $(this).parents(".select").first(), i = t.find(".select_wrap");
    t.hasClass("select-opened") ? t.removeClass("select-opened") : ($(".select").removeClass("select-opened"), 
    t.addClass("select-opened"), i.removeClass("select_wrap-above"), $(window).height() - i[0].getBoundingClientRect().bottom <= 0 && i.addClass("select_wrap-above"));
}), $(document).on("click", ".select_item", function(e) {
    var t = $(this).parents(".select"), i = t.find("input:checked").length, n = t.data("labels");
    i ? t.find(".select_value").html(1 == i ? $(this).find(".select_item_value").html() : i + " " + (i < 5 ? n.length ? n[0][1] : "значения" : n.length ? n[0][2] : "значений")) : t.find(".select_value").html(t.data("placeholder")), 
    t.hasClass("select-multiple") || t.removeClass("select-opened");
}), $(document).ready(function() {
    $(".select_wrap").on("clickoutside", function(e) {
        -1 == e.target.className.indexOf("select_toggle") && $(this).parent(".select").removeClass("select-opened");
    });
});

var notyf = new Notyf();

$(document).on("click", ".card", function(e) {
    e.preventDefault(), window.location = $(this).find(".card_link").attr("href");
}), setInterval(function() {
    $(".comm_users").toggleClass("comm_users-loading");
}, 2e3), $(document).ready(function() {
    $(".circleProgress").length && $(".circleProgress").each(function(e, t) {
        var i = $(this).find("circle"), n = $(this).find(".circleProgress_circle"), a = $(this).width() / 2 - 4, r = 2 * a * Math.PI, s = r - parseInt($(this).find(".circleProgress_value").html()) / 100 * r;
        i.attr({
            r: a,
            cx: a + 4,
            cy: a + 4,
            "stroke-width": 4,
            fill: "transparent"
        }), n.css({
            strokeDasharray: r + " " + r,
            strokeDashoffset: s
        });
    });
}), $(document).on("click", ".dropdown_toggle", function(e) {
    e.preventDefault(), $window = $(this).parent(".dropdown").find(".dropdown_window"), 
    $window.toggleClass("dropdown_window-visible");
}), $(document).ready(function() {
    $(".dropdown_window").on("clickoutside", function(e) {
        -1 == e.target.className.indexOf("dropdown_toggle") && $(this).removeClass("dropdown_window-visible");
    });
}), $(document).ready(function() {
    if ($(".qa_similar_grid").length) new Swiper(".qa_similar_grid", {
        slidesPerView: 3,
        spaceBetween: 24,
        breakpoints: {
            600: {
                slidesPerView: 1,
                spaceBetween: 16
            },
            1176: {
                slidesPerView: 2,
                spaceBetween: 24
            }
        }
    });
}), $("[data-modal]").on("click", function(e) {
    e.preventDefault();
    var t = $("#" + $(this).data("modal"));
    t.length ? ($(".modal-visible").length && $(".modal-visible").removeClass("modal-visible"), 
    t.addClass("modal-visible")) : console.error("Модальное окно не найдено: #" + $(this).data("modal"));
}), $(".modal_close").on("click", function(e) {
    e.preventDefault();
    var t = $(this).closest(".modal");
    t.length ? t.removeClass("modal-visible") : console.error("Не найден элемент модального окна для закрытия");
}), $(document).on("click", ".mainmenu_toggle, .mainmenu ~ .overlay", function(e) {
    e.preventDefault(), $(".mainmenu").toggleClass("mainmenu-visible");
}), $(document).on("click", "#threads_list .qa_threads_link", function(e) {
    e.preventDefault(), $("#selected_thread_field").val($(this).data("id")), $("#selected_thread").html($(this).parent(".qa_threads_item").clone()), 
    $(this).parents(".modal").removeClass("modal-visible");
}), $(document).ready(function() {
    if ($(".blog_tags").length) new Swiper(".blog_tags", {
        speed: 400,
        spaceBetween: 16,
        slidesPerView: "auto",
        preventClicks: !1,
        freeMode: !0,
        autoplay: {
            delay: 1500
        }
    });
}), $(document).ready(function() {
    $(".blog_grid-slider").length && $(".blog_grid-slider").each(function(e, t) {
        new Swiper($(this), {
            slidesPerView: 4,
            preventClicks: !1,
            spaceBetween: 24,
            breakpoints: {
                600: {
                    slidesPerView: "auto",
                    spaceBetween: 0
                },
                1176: {
                    slidesPerView: 2,
                    spaceBetween: 24
                }
            }
        });
    });
}), $(document).ready(function() {
    $(".course_sidebar_wrap").stick_in_parent({
        offset_top: 24
    });
}), $(document).ready(function() {
    if ($quiz = $(".quiz"), $quiz.length) {
        $next_button = $(".quiz_button"), $progress = $quiz.find(".quiz_progress span");
        new Swiper($quiz, {
            slidesPerView: 1,
            spaceBetween: 24,
            allowTouchMove: !1,
            navigation: {
                nextEl: $next_button
            },
            on: {
                init: function() {
                    console.log(this);
                },
                slideChange: function() {
                    $progress.html(this.activeIndex + 1);
                },
                reachEnd: function() {
                    $next_button.on("click", function(e) {
                        e.preventDefault(), $quiz.submit();
                    });
                }
            }
        });
    }
}), $(document).on("click", ".menu_toggle, .menu ~ .overlay", function(e) {
    e.preventDefault(), $(this).siblings(".menu").toggleClass("menu-visible");
}), $(document).ready(function() {
    if ($(".txt-rotate").length) {
        var a = function(e, t, i) {
            this.toRotate = t, this.el = e, this.loopNum = 0, this.period = parseInt(i, 10) || 2e3, 
            this.txt = "", this.tick(), this.isDeleting = !1;
        };
        a.prototype.tick = function() {
            var e = this.loopNum % this.toRotate.length, t = this.toRotate[e];
            this.isDeleting ? this.txt = t.substring(0, this.txt.length - 1) : this.txt = t.substring(0, this.txt.length + 1), 
            this.el.innerHTML = '<span class="txt-rotate-wrap">' + this.txt + "</span>";
            var i = this, n = 300 - 100 * Math.random();
            this.isDeleting && (n /= 2), this.isDeleting || this.txt !== t ? this.isDeleting && "" === this.txt && (this.isDeleting = !1, 
            this.loopNum++, n = 500) : (n = this.period, this.isDeleting = !0), setTimeout(function() {
                i.tick();
            }, n);
        }, window.onload = function() {
            for (var e = document.getElementsByClassName("txt-rotate"), t = 0; t < e.length; t++) {
                var i = e[t].getAttribute("data-rotate"), n = e[t].getAttribute("data-period");
                i && new a(e[t], JSON.parse(i), n);
            }
        };
    }
}), includeHTML();