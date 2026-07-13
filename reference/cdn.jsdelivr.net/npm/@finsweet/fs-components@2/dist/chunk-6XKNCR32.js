function Me(e) {
    return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object
}

function me(e = {}, a = {}) {
    let t = ["__proto__", "constructor", "prototype"];
    Object.keys(a).filter(s => t.indexOf(s) < 0).forEach(s => {
        typeof e[s] > "u" ? e[s] = a[s] : Me(a[s]) && Me(e[s]) && Object.keys(a[s]).length > 0 && me(e[s], a[s])
    })
}
var Ce = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector() {
        return null
    },
    querySelectorAll() {
        return []
    },
    getElementById() {
        return null
    },
    createEvent() {
        return {
            initEvent() {}
        }
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName() {
                return []
            }
        }
    },
    createElementNS() {
        return {}
    },
    importNode() {
        return null
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};

function B() {
    let e = typeof document < "u" ? document : {};
    return me(e, Ce), e
}
var Fe = {
    document: Ce,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
        return {
            getPropertyValue() {
                return ""
            }
        }
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
        return {}
    },
    requestAnimationFrame(e) {
        return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0)
    },
    cancelAnimationFrame(e) {
        typeof setTimeout > "u" || clearTimeout(e)
    }
};

function H() {
    let e = typeof window < "u" ? window : {};
    return me(e, Fe), e
}

function j(e = "") {
    return e.trim().split(" ").filter(a => !!a.trim())
}

function Pe(e) {
    let a = e;
    Object.keys(a).forEach(t => {
        try {
            a[t] = null
        } catch {}
        try {
            delete a[t]
        } catch {}
    })
}

function q(e, a = 0) {
    return setTimeout(e, a)
}

function W() {
    return Date.now()
}

function Ne(e) {
    let a = H(),
        t;
    return a.getComputedStyle && (t = a.getComputedStyle(e, null)), !t && e.currentStyle && (t = e.currentStyle), t || (t = e.style), t
}

function pe(e, a = "x") {
    let t = H(),
        s, i, n, o = Ne(e);
    return t.WebKitCSSMatrix ? (i = o.transform || o.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map(l => l.replace(",", ".")).join(", ")), n = new t.WebKitCSSMatrix(i === "none" ? "" : i)) : (n = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = n.toString().split(",")), a === "x" && (t.WebKitCSSMatrix ? i = n.m41 : s.length === 16 ? i = parseFloat(s[12]) : i = parseFloat(s[4])), a === "y" && (t.WebKitCSSMatrix ? i = n.m42 : s.length === 16 ? i = parseFloat(s[13]) : i = parseFloat(s[5])), i || 0
}

function ie(e) {
    return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object"
}

function We(e) {
    return typeof window < "u" && typeof window.HTMLElement < "u" ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11)
}

function F(...e) {
    let a = Object(e[0]);
    for (let t = 1; t < e.length; t += 1) {
        let s = e[t];
        if (s != null && !We(s)) {
            let i = Object.keys(Object(s)).filter(n => n !== "__proto__" && n !== "constructor" && n !== "prototype");
            for (let n = 0, o = i.length; n < o; n += 1) {
                let l = i[n],
                    r = Object.getOwnPropertyDescriptor(s, l);
                r !== void 0 && r.enumerable && (ie(a[l]) && ie(s[l]) ? s[l].__swiper__ ? a[l] = s[l] : F(a[l], s[l]) : !ie(a[l]) && ie(s[l]) ? (a[l] = {}, s[l].__swiper__ ? a[l] = s[l] : F(a[l], s[l])) : a[l] = s[l])
            }
        }
    }
    return a
}

function J(e, a, t) {
    e.style.setProperty(a, t)
}

function he({
    swiper: e,
    targetPosition: a,
    side: t
}) {
    let s = H(),
        i = -e.translate,
        n = null,
        o, l = e.params.speed;
    e.wrapperEl.style.scrollSnapType = "none", s.cancelAnimationFrame(e.cssModeFrameID);
    let r = a > i ? "next" : "prev",
        c = (d, v) => r === "next" && d >= v || r === "prev" && d <= v,
        u = () => {
            o = new Date().getTime(), n === null && (n = o);
            let d = Math.max(Math.min((o - n) / l, 1), 0),
                v = .5 - Math.cos(d * Math.PI) / 2,
                f = i + v * (a - i);
            if (c(f, a) && (f = a), e.wrapperEl.scrollTo({
                    [t]: f
                }), c(f, a)) {
                e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                    e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
                        [t]: f
                    })
                }), s.cancelAnimationFrame(e.cssModeFrameID);
                return
            }
            e.cssModeFrameID = s.requestAnimationFrame(u)
        };
    u()
}

function N(e) {
    return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e
}

function R(e, a = "") {
    let t = H(),
        s = [...e.children];
    return t.HTMLSlotElement && e instanceof HTMLSlotElement && s.push(...e.assignedElements()), a ? s.filter(i => i.matches(a)) : s
}

function _e(e, a) {
    let t = [a];
    for (; t.length > 0;) {
        let s = t.shift();
        if (e === s) return !0;
        t.push(...s.children, ...s.shadowRoot ? s.shadowRoot.children : [], ...s.assignedElements ? s.assignedElements() : [])
    }
}

function Le(e, a) {
    let t = H(),
        s = a.contains(e);
    return !s && t.HTMLSlotElement && a instanceof HTMLSlotElement && (s = [...a.assignedElements()].includes(e), s || (s = _e(e, a))), s
}

function oe(e) {
    try {
        console.warn(e);
        return
    } catch {}
}

function Y(e, a = []) {
    let t = document.createElement(e);
    return t.classList.add(...Array.isArray(a) ? a : j(a)), t
}

function de(e) {
    let a = H(),
        t = B(),
        s = e.getBoundingClientRect(),
        i = t.body,
        n = e.clientTop || i.clientTop || 0,
        o = e.clientLeft || i.clientLeft || 0,
        l = e === a ? a.scrollY : e.scrollTop,
        r = e === a ? a.scrollX : e.scrollLeft;
    return {
        top: s.top + l - n,
        left: s.left + r - o
    }
}

function Ie(e, a) {
    let t = [];
    for (; e.previousElementSibling;) {
        let s = e.previousElementSibling;
        a ? s.matches(a) && t.push(s) : t.push(s), e = s
    }
    return t
}

function ze(e, a) {
    let t = [];
    for (; e.nextElementSibling;) {
        let s = e.nextElementSibling;
        a ? s.matches(a) && t.push(s) : t.push(s), e = s
    }
    return t
}

function w(e, a) {
    return H().getComputedStyle(e, null).getPropertyValue(a)
}

function ae(e) {
    let a = e,
        t;
    if (a) {
        for (t = 0;
            (a = a.previousSibling) !== null;) a.nodeType === 1 && (t += 1);
        return t
    }
}

function ee(e, a) {
    let t = [],
        s = e.parentElement;
    for (; s;) a ? s.matches(a) && t.push(s) : t.push(s), s = s.parentElement;
    return t
}

function ce(e, a) {
    function t(s) {
        s.target === e && (a.call(e, s), e.removeEventListener("transitionend", t))
    }
    a && e.addEventListener("transitionend", t)
}

function fe(e, a, t) {
    let s = H();
    return t ? e[a === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(e, null).getPropertyValue(a === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(e, null).getPropertyValue(a === "width" ? "margin-left" : "margin-bottom")) : e.offsetWidth
}

function V(e) {
    return (Array.isArray(e) ? e : [e]).filter(a => !!a)
}

function se(e) {
    return a => Math.abs(a) > 0 && e.browser && e.browser.need3dFix && Math.abs(a) % 90 === 0 ? a + .001 : a
}

function te(e, a = "") {
    typeof trustedTypes < "u" ? e.innerHTML = trustedTypes.createPolicy("html", {
        createHTML: t => t
    }).createHTML(a) : e.innerHTML = a
}
var ge;

function qe() {
    let e = H(),
        a = B();
    return {
        smoothScroll: a.documentElement && a.documentElement.style && "scrollBehavior" in a.documentElement.style,
        touch: !!("ontouchstart" in e || e.DocumentTouch && a instanceof e.DocumentTouch)
    }
}

function Ge() {
    return ge || (ge = qe()), ge
}
var ve;

function je({
    userAgent: e
} = {}) {
    let a = Ge(),
        t = H(),
        s = t.navigator.platform,
        i = e || t.navigator.userAgent,
        n = {
            ios: !1,
            android: !1
        },
        o = t.screen.width,
        l = t.screen.height,
        r = i.match(/(Android);?[\s\/]+([\d.]+)?/),
        c = i.match(/(iPad)(?!\1).*OS\s([\d_]+)/),
        u = i.match(/(iPod)(.*OS\s([\d_]+))?/),
        d = !c && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
        v = s === "Win32",
        f = s === "MacIntel",
        h = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    return !c && f && a.touch && h.indexOf(`${o}x${l}`) >= 0 && (c = i.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), f = !1), r && !v && (n.os = "android", n.android = !0), (c || d || u) && (n.os = "ios", n.ios = !0), n
}

function He(e = {}) {
    return ve || (ve = je(e)), ve
}
var ye;

function we() {
    let e = H(),
        a = He(),
        t = !1;

    function s() {
        let l = e.navigator.userAgent.toLowerCase();
        return l.indexOf("safari") >= 0 && l.indexOf("chrome") < 0 && l.indexOf("android") < 0
    }
    if (s()) {
        let l = String(e.navigator.userAgent);
        if (l.includes("Version/")) {
            let [r, c] = l.split("Version/")[1].split(" ")[0].split(".").map(u => Number(u));
            t = r < 16 || r === 16 && c < 2
        }
    }
    let i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),
        n = s(),
        o = n || i && a.ios;
    return {
        isSafari: t || n,
        needPerspectiveFix: t,
        need3dFix: o,
        isWebView: i
    }
}

function Be() {
    return ye || (ye = we()), ye
}

function Ue({
    swiper: e,
    on: a,
    emit: t
}) {
    let s = H(),
        i = null,
        n = null,
        o = () => {
            !e || e.destroyed || !e.initialized || (t("beforeResize"), t("resize"))
        },
        l = () => {
            !e || e.destroyed || !e.initialized || (i = new ResizeObserver(u => {
                n = s.requestAnimationFrame(() => {
                    let {
                        width: d,
                        height: v
                    } = e, f = d, h = v;
                    u.forEach(({
                        contentBoxSize: g,
                        contentRect: S,
                        target: p
                    }) => {
                        p && p !== e.el || (f = S ? S.width : (g[0] || g).inlineSize, h = S ? S.height : (g[0] || g).blockSize)
                    }), (f !== d || h !== v) && o()
                })
            }), i.observe(e.el))
        },
        r = () => {
            n && s.cancelAnimationFrame(n), i && i.unobserve && e.el && (i.unobserve(e.el), i = null)
        },
        c = () => {
            !e || e.destroyed || !e.initialized || t("orientationchange")
        };
    a("init", () => {
        if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
            l();
            return
        }
        s.addEventListener("resize", o), s.addEventListener("orientationchange", c)
    }), a("destroy", () => {
        r(), s.removeEventListener("resize", o), s.removeEventListener("orientationchange", c)
    })
}

function Ke({
    swiper: e,
    extendParams: a,
    on: t,
    emit: s
}) {
    let i = [],
        n = H(),
        o = (c, u = {}) => {
            let d = n.MutationObserver || n.WebkitMutationObserver,
                v = new d(f => {
                    if (e.__preventObserver__) return;
                    if (f.length === 1) {
                        s("observerUpdate", f[0]);
                        return
                    }
                    let h = function() {
                        s("observerUpdate", f[0])
                    };
                    n.requestAnimationFrame ? n.requestAnimationFrame(h) : n.setTimeout(h, 0)
                });
            v.observe(c, {
                attributes: typeof u.attributes > "u" ? !0 : u.attributes,
                childList: e.isElement || (typeof u.childList > "u" ? !0 : u).childList,
                characterData: typeof u.characterData > "u" ? !0 : u.characterData
            }), i.push(v)
        },
        l = () => {
            if (e.params.observer) {
                if (e.params.observeParents) {
                    let c = ee(e.hostEl);
                    for (let u = 0; u < c.length; u += 1) o(c[u])
                }
                o(e.hostEl, {
                    childList: e.params.observeSlideChildren
                }), o(e.wrapperEl, {
                    attributes: !1
                })
            }
        },
        r = () => {
            i.forEach(c => {
                c.disconnect()
            }), i.splice(0, i.length)
        };
    a({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }), t("init", l), t("destroy", r)
}
var Ze = {
    on(e, a, t) {
        let s = this;
        if (!s.eventsListeners || s.destroyed || typeof a != "function") return s;
        let i = t ? "unshift" : "push";
        return e.split(" ").forEach(n => {
            s.eventsListeners[n] || (s.eventsListeners[n] = []), s.eventsListeners[n][i](a)
        }), s
    },
    once(e, a, t) {
        let s = this;
        if (!s.eventsListeners || s.destroyed || typeof a != "function") return s;

        function i(...n) {
            s.off(e, i), i.__emitterProxy && delete i.__emitterProxy, a.apply(s, n)
        }
        return i.__emitterProxy = a, s.on(e, i, t)
    },
    onAny(e, a) {
        let t = this;
        if (!t.eventsListeners || t.destroyed || typeof e != "function") return t;
        let s = a ? "unshift" : "push";
        return t.eventsAnyListeners.indexOf(e) < 0 && t.eventsAnyListeners[s](e), t
    },
    offAny(e) {
        let a = this;
        if (!a.eventsListeners || a.destroyed || !a.eventsAnyListeners) return a;
        let t = a.eventsAnyListeners.indexOf(e);
        return t >= 0 && a.eventsAnyListeners.splice(t, 1), a
    },
    off(e, a) {
        let t = this;
        return !t.eventsListeners || t.destroyed || !t.eventsListeners || e.split(" ").forEach(s => {
            typeof a > "u" ? t.eventsListeners[s] = [] : t.eventsListeners[s] && t.eventsListeners[s].forEach((i, n) => {
                (i === a || i.__emitterProxy && i.__emitterProxy === a) && t.eventsListeners[s].splice(n, 1)
            })
        }), t
    },
    emit(...e) {
        let a = this;
        if (!a.eventsListeners || a.destroyed || !a.eventsListeners) return a;
        let t, s, i;
        return typeof e[0] == "string" || Array.isArray(e[0]) ? (t = e[0], s = e.slice(1, e.length), i = a) : (t = e[0].events, s = e[0].data, i = e[0].context || a), s.unshift(i), (Array.isArray(t) ? t : t.split(" ")).forEach(o => {
            a.eventsAnyListeners && a.eventsAnyListeners.length && a.eventsAnyListeners.forEach(l => {
                l.apply(i, [o, ...s])
            }), a.eventsListeners && a.eventsListeners[o] && a.eventsListeners[o].forEach(l => {
                l.apply(i, s)
            })
        }), a
    }
};

function Qe() {
    let e = this,
        a, t, s = e.el;
    typeof e.params.width < "u" && e.params.width !== null ? a = e.params.width : a = s.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? t = e.params.height : t = s.clientHeight, !(a === 0 && e.isHorizontal() || t === 0 && e.isVertical()) && (a = a - parseInt(w(s, "padding-left") || 0, 10) - parseInt(w(s, "padding-right") || 0, 10), t = t - parseInt(w(s, "padding-top") || 0, 10) - parseInt(w(s, "padding-bottom") || 0, 10), Number.isNaN(a) && (a = 0), Number.isNaN(t) && (t = 0), Object.assign(e, {
        width: a,
        height: t,
        size: e.isHorizontal() ? a : t
    }))
}

function Je() {
    let e = this;

    function a(C, b) {
        return parseFloat(C.getPropertyValue(e.getDirectionLabel(b)) || 0)
    }
    let t = e.params,
        {
            wrapperEl: s,
            slidesEl: i,
            rtlTranslate: n,
            wrongRTL: o
        } = e,
        l = e.virtual && t.virtual.enabled,
        r = l ? e.virtual.slides.length : e.slides.length,
        c = R(i, `.${e.params.slideClass}, swiper-slide`),
        u = l ? e.virtual.slides.length : c.length,
        d = [],
        v = [],
        f = [],
        h = t.slidesOffsetBefore;
    typeof h == "function" && (h = t.slidesOffsetBefore.call(e));
    let g = t.slidesOffsetAfter;
    typeof g == "function" && (g = t.slidesOffsetAfter.call(e));
    let S = e.snapGrid.length,
        p = e.slidesGrid.length,
        m = e.size - h - g,
        y = t.spaceBetween,
        T = -h,
        L = 0,
        I = 0;
    if (typeof m > "u") return;
    typeof y == "string" && y.indexOf("%") >= 0 ? y = parseFloat(y.replace("%", "")) / 100 * m : typeof y == "string" && (y = parseFloat(y)), e.virtualSize = -y - h - g, c.forEach(C => {
        n ? C.style.marginLeft = "" : C.style.marginRight = "", C.style.marginBottom = "", C.style.marginTop = ""
    }), t.centeredSlides && t.cssMode && (J(s, "--swiper-centered-offset-before", ""), J(s, "--swiper-centered-offset-after", "")), t.cssMode && (J(s, "--swiper-slides-offset-before", `${h}px`), J(s, "--swiper-slides-offset-after", `${g}px`));
    let z = t.grid && t.grid.rows > 1 && e.grid;
    z ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
    let E, O = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter(C => typeof t.breakpoints[C].slidesPerView < "u").length > 0;
    for (let C = 0; C < u; C += 1) {
        E = 0;
        let b = c[C];
        if (!(b && (z && e.grid.updateSlide(C, b, c), w(b, "display") === "none"))) {
            if (l && t.slidesPerView === "auto") t.virtual.slidesPerViewAutoSlideSize && (E = t.virtual.slidesPerViewAutoSlideSize), E && b && (t.roundLengths && (E = Math.floor(E)), b.style[e.getDirectionLabel("width")] = `${E}px`);
            else if (t.slidesPerView === "auto") {
                O && (b.style[e.getDirectionLabel("width")] = "");
                let x = getComputedStyle(b),
                    M = b.style.transform,
                    P = b.style.webkitTransform;
                if (M && (b.style.transform = "none"), P && (b.style.webkitTransform = "none"), t.roundLengths) E = e.isHorizontal() ? fe(b, "width", !0) : fe(b, "height", !0);
                else {
                    let D = a(x, "width"),
                        G = a(x, "padding-left"),
                        $ = a(x, "padding-right"),
                        A = a(x, "margin-left"),
                        k = a(x, "margin-right"),
                        X = x.getPropertyValue("box-sizing");
                    if (X && X === "border-box") E = D + A + k;
                    else {
                        let {
                            clientWidth: Q,
                            offsetWidth: Ye
                        } = b;
                        E = D + G + $ + A + k + (Ye - Q)
                    }
                }
                M && (b.style.transform = M), P && (b.style.webkitTransform = P), t.roundLengths && (E = Math.floor(E))
            } else E = (m - (t.slidesPerView - 1) * y) / t.slidesPerView, t.roundLengths && (E = Math.floor(E)), b && (b.style[e.getDirectionLabel("width")] = `${E}px`);
            b && (b.swiperSlideSize = E), f.push(E), t.centeredSlides ? (T = T + E / 2 + L / 2 + y, L === 0 && C !== 0 && (T = T - m / 2 - y), C === 0 && (T = T - m / 2 - y), Math.abs(T) < 1 / 1e3 && (T = 0), t.roundLengths && (T = Math.floor(T)), I % t.slidesPerGroup === 0 && d.push(T), v.push(T)) : (t.roundLengths && (T = Math.floor(T)), (I - Math.min(e.params.slidesPerGroupSkip, I)) % e.params.slidesPerGroup === 0 && d.push(T), v.push(T), T = T + E + y), e.virtualSize += E + y, L = E, I += 1
        }
    }
    if (e.virtualSize = Math.max(e.virtualSize, m) + g, n && o && (t.effect === "slide" || t.effect === "coverflow") && (s.style.width = `${e.virtualSize+y}px`), t.setWrapperSize && (s.style[e.getDirectionLabel("width")] = `${e.virtualSize+y}px`), z && e.grid.updateWrapperSize(E, d), !t.centeredSlides) {
        let C = t.slidesPerView !== "auto" && t.slidesPerView % 1 !== 0,
            b = t.snapToSlideEdge && !t.loop && (t.slidesPerView === "auto" || C),
            x = d.length;
        if (b) {
            let P;
            if (t.slidesPerView === "auto") {
                P = 1;
                let D = 0;
                for (let G = f.length - 1; G >= 0 && (D += f[G] + (G < f.length - 1 ? y : 0), D <= m); G -= 1) P = f.length - G
            } else P = Math.floor(t.slidesPerView);
            x = Math.max(u - P, 0)
        }
        let M = [];
        for (let P = 0; P < d.length; P += 1) {
            let D = d[P];
            t.roundLengths && (D = Math.floor(D)), b ? P <= x && M.push(D) : d[P] <= e.virtualSize - m && M.push(D)
        }
        d = M, Math.floor(e.virtualSize - m) - Math.floor(d[d.length - 1]) > 1 && (b || d.push(e.virtualSize - m))
    }
    if (l && t.loop) {
        let C = f[0] + y;
        if (t.slidesPerGroup > 1) {
            let b = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / t.slidesPerGroup),
                x = C * t.slidesPerGroup;
            for (let M = 0; M < b; M += 1) d.push(d[d.length - 1] + x)
        }
        for (let b = 0; b < e.virtual.slidesBefore + e.virtual.slidesAfter; b += 1) t.slidesPerGroup === 1 && d.push(d[d.length - 1] + C), v.push(v[v.length - 1] + C), e.virtualSize += C
    }
    if (d.length === 0 && (d = [0]), y !== 0) {
        let C = e.isHorizontal() && n ? "marginLeft" : e.getDirectionLabel("marginRight");
        c.filter((b, x) => !t.cssMode || t.loop ? !0 : x !== c.length - 1).forEach(b => {
            b.style[C] = `${y}px`
        })
    }
    if (t.centeredSlides && t.centeredSlidesBounds) {
        let C = 0;
        f.forEach(x => {
            C += x + (y || 0)
        }), C -= y;
        let b = C > m ? C - m : 0;
        d = d.map(x => x <= 0 ? -h : x > b ? b + g : x)
    }
    if (t.centerInsufficientSlides) {
        let C = 0;
        if (f.forEach(b => {
                C += b + (y || 0)
            }), C -= y, C < m) {
            let b = (m - C) / 2;
            d.forEach((x, M) => {
                d[M] = x - b
            }), v.forEach((x, M) => {
                v[M] = x + b
            })
        }
    }
    if (Object.assign(e, {
            slides: c,
            snapGrid: d,
            slidesGrid: v,
            slidesSizesGrid: f
        }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
        J(s, "--swiper-centered-offset-before", `${-d[0]}px`), J(s, "--swiper-centered-offset-after", `${e.size/2-f[f.length-1]/2}px`);
        let C = -e.snapGrid[0],
            b = -e.slidesGrid[0];
        e.snapGrid = e.snapGrid.map(x => x + C), e.slidesGrid = e.slidesGrid.map(x => x + b)
    }
    if (u !== r && e.emit("slidesLengthChange"), d.length !== S && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), v.length !== p && e.emit("slidesGridLengthChange"), t.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !l && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
        let C = `${t.containerModifierClass}backface-hidden`,
            b = e.el.classList.contains(C);
        u <= t.maxBackfaceHiddenSlides ? b || e.el.classList.add(C) : b && e.el.classList.remove(C)
    }
}

function et(e) {
    let a = this,
        t = [],
        s = a.virtual && a.params.virtual.enabled,
        i = 0,
        n;
    typeof e == "number" ? a.setTransition(e) : e === !0 && a.setTransition(a.params.speed);
    let o = l => s ? a.slides[a.getSlideIndexByData(l)] : a.slides[l];
    if (a.params.slidesPerView !== "auto" && a.params.slidesPerView > 1)
        if (a.params.centeredSlides)(a.visibleSlides || []).forEach(l => {
            t.push(l)
        });
        else
            for (n = 0; n < Math.ceil(a.params.slidesPerView); n += 1) {
                let l = a.activeIndex + n;
                if (l > a.slides.length && !s) break;
                t.push(o(l))
            } else t.push(o(a.activeIndex));
    for (n = 0; n < t.length; n += 1)
        if (typeof t[n] < "u") {
            let l = t[n].offsetHeight;
            i = l > i ? l : i
        }(i || i === 0) && (a.wrapperEl.style.height = `${i}px`)
}

function tt() {
    let e = this,
        a = e.slides,
        t = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
    for (let s = 0; s < a.length; s += 1) a[s].swiperSlideOffset = (e.isHorizontal() ? a[s].offsetLeft : a[s].offsetTop) - t - e.cssOverflowAdjustment()
}
var Ae = (e, a, t) => {
    a && !e.classList.contains(t) ? e.classList.add(t) : !a && e.classList.contains(t) && e.classList.remove(t)
};

function at(e = this && this.translate || 0) {
    let a = this,
        t = a.params,
        {
            slides: s,
            rtlTranslate: i,
            snapGrid: n
        } = a;
    if (s.length === 0) return;
    typeof s[0].swiperSlideOffset > "u" && a.updateSlidesOffset();
    let o = -e;
    i && (o = e), a.visibleSlidesIndexes = [], a.visibleSlides = [];
    let l = t.spaceBetween;
    typeof l == "string" && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * a.size : typeof l == "string" && (l = parseFloat(l));
    for (let r = 0; r < s.length; r += 1) {
        let c = s[r],
            u = c.swiperSlideOffset;
        t.cssMode && t.centeredSlides && (u -= s[0].swiperSlideOffset);
        let d = (o + (t.centeredSlides ? a.minTranslate() : 0) - u) / (c.swiperSlideSize + l),
            v = (o - n[0] + (t.centeredSlides ? a.minTranslate() : 0) - u) / (c.swiperSlideSize + l),
            f = -(o - u),
            h = f + a.slidesSizesGrid[r],
            g = f >= 0 && f <= a.size - a.slidesSizesGrid[r],
            S = f >= 0 && f < a.size - 1 || h > 1 && h <= a.size || f <= 0 && h >= a.size;
        S && (a.visibleSlides.push(c), a.visibleSlidesIndexes.push(r)), Ae(c, S, t.slideVisibleClass), Ae(c, g, t.slideFullyVisibleClass), c.progress = i ? -d : d, c.originalProgress = i ? -v : v
    }
}

function st(e) {
    let a = this;
    if (typeof e > "u") {
        let u = a.rtlTranslate ? -1 : 1;
        e = a && a.translate && a.translate * u || 0
    }
    let t = a.params,
        s = a.maxTranslate() - a.minTranslate(),
        {
            progress: i,
            isBeginning: n,
            isEnd: o,
            progressLoop: l
        } = a,
        r = n,
        c = o;
    if (s === 0) i = 0, n = !0, o = !0;
    else {
        i = (e - a.minTranslate()) / s;
        let u = Math.abs(e - a.minTranslate()) < 1,
            d = Math.abs(e - a.maxTranslate()) < 1;
        n = u || i <= 0, o = d || i >= 1, u && (i = 0), d && (i = 1)
    }
    if (t.loop) {
        let u = a.getSlideIndexByData(0),
            d = a.getSlideIndexByData(a.slides.length - 1),
            v = a.slidesGrid[u],
            f = a.slidesGrid[d],
            h = a.slidesGrid[a.slidesGrid.length - 1],
            g = Math.abs(e);
        g >= v ? l = (g - v) / h : l = (g + h - f) / h, l > 1 && (l -= 1)
    }
    Object.assign(a, {
        progress: i,
        progressLoop: l,
        isBeginning: n,
        isEnd: o
    }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && a.updateSlidesProgress(e), n && !r && a.emit("reachBeginning toEdge"), o && !c && a.emit("reachEnd toEdge"), (r && !n || c && !o) && a.emit("fromEdge"), a.emit("progress", i)
}
var be = (e, a, t) => {
    a && !e.classList.contains(t) ? e.classList.add(t) : !a && e.classList.contains(t) && e.classList.remove(t)
};

function nt() {
    let e = this,
        {
            slides: a,
            params: t,
            slidesEl: s,
            activeIndex: i
        } = e,
        n = e.virtual && t.virtual.enabled,
        o = e.grid && t.grid && t.grid.rows > 1,
        l = d => R(s, `.${t.slideClass}${d}, swiper-slide${d}`)[0],
        r, c, u;
    if (n)
        if (t.loop) {
            let d = i - e.virtual.slidesBefore;
            d < 0 && (d = e.virtual.slides.length + d), d >= e.virtual.slides.length && (d -= e.virtual.slides.length), r = l(`[data-swiper-slide-index="${d}"]`)
        } else r = l(`[data-swiper-slide-index="${i}"]`);
    else o ? (r = a.find(d => d.column === i), u = a.find(d => d.column === i + 1), c = a.find(d => d.column === i - 1)) : r = a[i];
    r && (o || (u = ze(r, `.${t.slideClass}, swiper-slide`)[0], t.loop && !u && (u = a[0]), c = Ie(r, `.${t.slideClass}, swiper-slide`)[0], t.loop && !c === 0 && (c = a[a.length - 1]))), a.forEach(d => {
        be(d, d === r, t.slideActiveClass), be(d, d === u, t.slideNextClass), be(d, d === c, t.slidePrevClass)
    }), e.emitSlidesClasses()
}
var ue = (e, a) => {
        if (!e || e.destroyed || !e.params) return;
        let t = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
            s = a.closest(t());
        if (s) {
            let i = s.querySelector(`.${e.params.lazyPreloaderClass}`);
            !i && e.isElement && (s.shadowRoot ? i = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
                s.shadowRoot && (i = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), i && !i.lazyPreloaderManaged && i.remove())
            })), i && !i.lazyPreloaderManaged && i.remove()
        }
    },
    Se = (e, a) => {
        if (!e.slides[a]) return;
        let t = e.slides[a].querySelector('[loading="lazy"]');
        t && t.removeAttribute("loading")
    },
    Te = e => {
        if (!e || e.destroyed || !e.params) return;
        let a = e.params.lazyPreloadPrevNext,
            t = e.slides.length;
        if (!t || !a || a < 0) return;
        a = Math.min(a, t);
        let s = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView),
            i = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
            let o = i,
                l = [o - a];
            l.push(...Array.from({
                length: a
            }).map((r, c) => o + s + c)), e.slides.forEach((r, c) => {
                l.includes(r.column) && Se(e, c)
            });
            return
        }
        let n = i + s - 1;
        if (e.params.rewind || e.params.loop)
            for (let o = i - a; o <= n + a; o += 1) {
                let l = (o % t + t) % t;
                (l < i || l > n) && Se(e, l)
            } else
                for (let o = Math.max(i - a, 0); o <= Math.min(n + a, t - 1); o += 1) o !== i && (o > n || o < i) && Se(e, o)
    };

function it(e) {
    let {
        slidesGrid: a,
        params: t
    } = e, s = e.rtlTranslate ? e.translate : -e.translate, i;
    for (let n = 0; n < a.length; n += 1) typeof a[n + 1] < "u" ? s >= a[n] && s < a[n + 1] - (a[n + 1] - a[n]) / 2 ? i = n : s >= a[n] && s < a[n + 1] && (i = n + 1) : s >= a[n] && (i = n);
    return t.normalizeSlideIndex && (i < 0 || typeof i > "u") && (i = 0), i
}

function rt(e) {
    let a = this,
        t = a.rtlTranslate ? a.translate : -a.translate,
        {
            snapGrid: s,
            params: i,
            activeIndex: n,
            realIndex: o,
            snapIndex: l
        } = a,
        r = e,
        c, u = f => {
            let h = f - a.virtual.slidesBefore;
            return h < 0 && (h = a.virtual.slides.length + h), h >= a.virtual.slides.length && (h -= a.virtual.slides.length), h
        };
    if (typeof r > "u" && (r = it(a)), s.indexOf(t) >= 0) c = s.indexOf(t);
    else {
        let f = Math.min(i.slidesPerGroupSkip, r);
        c = f + Math.floor((r - f) / i.slidesPerGroup)
    }
    if (c >= s.length && (c = s.length - 1), r === n && !a.params.loop) {
        c !== l && (a.snapIndex = c, a.emit("snapIndexChange"));
        return
    }
    if (r === n && a.params.loop && a.virtual && a.params.virtual.enabled) {
        a.realIndex = u(r);
        return
    }
    let d = a.grid && i.grid && i.grid.rows > 1,
        v;
    if (a.virtual && i.virtual.enabled) i.loop ? v = u(r) : v = r;
    else if (d) {
        let f = a.slides.find(g => g.column === r),
            h = parseInt(f.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(h) && (h = Math.max(a.slides.indexOf(f), 0)), v = Math.floor(h / i.grid.rows)
    } else if (a.slides[r]) {
        let f = a.slides[r].getAttribute("data-swiper-slide-index");
        f ? v = parseInt(f, 10) : v = r
    } else v = r;
    Object.assign(a, {
        previousSnapIndex: l,
        snapIndex: c,
        previousRealIndex: o,
        realIndex: v,
        previousIndex: n,
        activeIndex: r
    }), a.initialized && Te(a), a.emit("activeIndexChange"), a.emit("snapIndexChange"), (a.initialized || a.params.runCallbacksOnInit) && (o !== v && a.emit("realIndexChange"), a.emit("slideChange"))
}

function lt(e, a) {
    let t = this,
        s = t.params,
        i = e.closest(`.${s.slideClass}, swiper-slide`);
    !i && t.isElement && a && a.length > 1 && a.includes(e) && [...a.slice(a.indexOf(e) + 1, a.length)].forEach(l => {
        !i && l.matches && l.matches(`.${s.slideClass}, swiper-slide`) && (i = l)
    });
    let n = !1,
        o;
    if (i) {
        for (let l = 0; l < t.slides.length; l += 1)
            if (t.slides[l] === i) {
                n = !0, o = l;
                break
            }
    }
    if (i && n) t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = o;
    else {
        t.clickedSlide = void 0, t.clickedIndex = void 0;
        return
    }
    s.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
}
var ot = {
    updateSize: Qe,
    updateSlides: Je,
    updateAutoHeight: et,
    updateSlidesOffset: tt,
    updateSlidesProgress: at,
    updateProgress: st,
    updateSlidesClasses: nt,
    updateActiveIndex: rt,
    updateClickedSlide: lt
};

function dt(e = this.isHorizontal() ? "x" : "y") {
    let a = this,
        {
            params: t,
            rtlTranslate: s,
            translate: i,
            wrapperEl: n
        } = a;
    if (t.virtualTranslate) return s ? -i : i;
    if (t.cssMode) return i;
    let o = pe(n, e);
    return o += a.cssOverflowAdjustment(), s && (o = -o), o || 0
}

function ct(e, a) {
    let t = this,
        {
            rtlTranslate: s,
            params: i,
            wrapperEl: n,
            progress: o
        } = t,
        l = 0,
        r = 0,
        c = 0;
    t.isHorizontal() ? l = s ? -e : e : r = e, i.roundLengths && (l = Math.floor(l), r = Math.floor(r)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? l : r, i.cssMode ? n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -l : -r : i.virtualTranslate || (t.isHorizontal() ? l -= t.cssOverflowAdjustment() : r -= t.cssOverflowAdjustment(), n.style.transform = `translate3d(${l}px, ${r}px, ${c}px)`);
    let u, d = t.maxTranslate() - t.minTranslate();
    d === 0 ? u = 0 : u = (e - t.minTranslate()) / d, u !== o && t.updateProgress(e), t.emit("setTranslate", t.translate, a)
}

function ft() {
    return -this.snapGrid[0]
}

function ut() {
    return -this.snapGrid[this.snapGrid.length - 1]
}

function mt(e = 0, a = this.params.speed, t = !0, s = !0, i) {
    let n = this,
        {
            params: o,
            wrapperEl: l
        } = n;
    if (n.animating && o.preventInteractionOnTransition) return !1;
    let r = n.minTranslate(),
        c = n.maxTranslate(),
        u;
    if (s && e > r ? u = r : s && e < c ? u = c : u = e, n.updateProgress(u), o.cssMode) {
        let d = n.isHorizontal();
        if (a === 0) l[d ? "scrollLeft" : "scrollTop"] = -u;
        else {
            if (!n.support.smoothScroll) return he({
                swiper: n,
                targetPosition: -u,
                side: d ? "left" : "top"
            }), !0;
            l.scrollTo({
                [d ? "left" : "top"]: -u,
                behavior: "smooth"
            })
        }
        return !0
    }
    return a === 0 ? (n.setTransition(0), n.setTranslate(u), t && (n.emit("beforeTransitionStart", a, i), n.emit("transitionEnd"))) : (n.setTransition(a), n.setTranslate(u), t && (n.emit("beforeTransitionStart", a, i), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(v) {
        !n || n.destroyed || v.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, n.animating = !1, t && n.emit("transitionEnd"))
    }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0
}
var pt = {
    getTranslate: dt,
    setTranslate: ct,
    minTranslate: ft,
    maxTranslate: ut,
    translateTo: mt
};

function ht(e, a) {
    let t = this;
    t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${e}ms`, t.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), t.emit("setTransition", e, a)
}

function Ve({
    swiper: e,
    runCallbacks: a,
    direction: t,
    step: s
}) {
    let {
        activeIndex: i,
        previousIndex: n
    } = e, o = t;
    o || (i > n ? o = "next" : i < n ? o = "prev" : o = "reset"), e.emit(`transition${s}`), a && o === "reset" ? e.emit(`slideResetTransition${s}`) : a && i !== n && (e.emit(`slideChangeTransition${s}`), o === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`))
}

function gt(e = !0, a) {
    let t = this,
        {
            params: s
        } = t;
    s.cssMode || (s.autoHeight && t.updateAutoHeight(), Ve({
        swiper: t,
        runCallbacks: e,
        direction: a,
        step: "Start"
    }))
}

function vt(e = !0, a) {
    let t = this,
        {
            params: s
        } = t;
    t.animating = !1, !s.cssMode && (t.setTransition(0), Ve({
        swiper: t,
        runCallbacks: e,
        direction: a,
        step: "End"
    }))
}
var yt = {
    setTransition: ht,
    transitionStart: gt,
    transitionEnd: vt
};

function bt(e = 0, a, t = !0, s, i) {
    typeof e == "string" && (e = parseInt(e, 10));
    let n = this,
        o = e;
    o < 0 && (o = 0);
    let {
        params: l,
        snapGrid: r,
        slidesGrid: c,
        previousIndex: u,
        activeIndex: d,
        rtlTranslate: v,
        wrapperEl: f,
        enabled: h
    } = n;
    if (!h && !s && !i || n.destroyed || n.animating && l.preventInteractionOnTransition) return !1;
    typeof a > "u" && (a = n.params.speed);
    let g = Math.min(n.params.slidesPerGroupSkip, o),
        S = g + Math.floor((o - g) / n.params.slidesPerGroup);
    S >= r.length && (S = r.length - 1);
    let p = -r[S];
    if (l.normalizeSlideIndex)
        for (let z = 0; z < c.length; z += 1) {
            let E = -Math.floor(p * 100),
                O = Math.floor(c[z] * 100),
                C = Math.floor(c[z + 1] * 100);
            typeof c[z + 1] < "u" ? E >= O && E < C - (C - O) / 2 ? o = z : E >= O && E < C && (o = z + 1) : E >= O && (o = z)
        }
    if (n.initialized && o !== d && (!n.allowSlideNext && (v ? p > n.translate && p > n.minTranslate() : p < n.translate && p < n.minTranslate()) || !n.allowSlidePrev && p > n.translate && p > n.maxTranslate() && (d || 0) !== o)) return !1;
    o !== (u || 0) && t && n.emit("beforeSlideChangeStart"), n.updateProgress(p);
    let m;
    o > d ? m = "next" : o < d ? m = "prev" : m = "reset";
    let y = n.virtual && n.params.virtual.enabled;
    if (!(y && i) && (v && -p === n.translate || !v && p === n.translate)) return n.updateActiveIndex(o), l.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), l.effect !== "slide" && n.setTranslate(p), m !== "reset" && (n.transitionStart(t, m), n.transitionEnd(t, m)), !1;
    if (l.cssMode) {
        let z = n.isHorizontal(),
            E = v ? p : -p;
        if (a === 0) y && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), y && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
            f[z ? "scrollLeft" : "scrollTop"] = E
        })) : f[z ? "scrollLeft" : "scrollTop"] = E, y && requestAnimationFrame(() => {
            n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1
        });
        else {
            if (!n.support.smoothScroll) return he({
                swiper: n,
                targetPosition: E,
                side: z ? "left" : "top"
            }), !0;
            f.scrollTo({
                [z ? "left" : "top"]: E,
                behavior: "smooth"
            })
        }
        return !0
    }
    let I = Be().isSafari;
    return y && !i && I && n.isElement && n.virtual.update(!1, !1, o), n.setTransition(a), n.setTranslate(p), n.updateActiveIndex(o), n.updateSlidesClasses(), n.emit("beforeTransitionStart", a, s), n.transitionStart(t, m), a === 0 ? n.transitionEnd(t, m) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(E) {
        !n || n.destroyed || E.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(t, m))
    }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0
}

function St(e = 0, a, t = !0, s) {
    typeof e == "string" && (e = parseInt(e, 10));
    let i = this;
    if (i.destroyed) return;
    typeof a > "u" && (a = i.params.speed);
    let n = i.grid && i.params.grid && i.params.grid.rows > 1,
        o = e;
    if (i.params.loop)
        if (i.virtual && i.params.virtual.enabled) o = o + i.virtual.slidesBefore;
        else {
            let l;
            if (n) {
                let g = o * i.params.grid.rows;
                l = i.slides.find(S => S.getAttribute("data-swiper-slide-index") * 1 === g).column
            } else l = i.getSlideIndexByData(o);
            let r = n ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length,
                {
                    centeredSlides: c,
                    slidesOffsetBefore: u,
                    slidesOffsetAfter: d
                } = i.params,
                v = c || !!u || !!d,
                f = i.params.slidesPerView;
            f === "auto" ? f = i.slidesPerViewDynamic() : (f = Math.ceil(parseFloat(i.params.slidesPerView, 10)), v && f % 2 === 0 && (f = f + 1));
            let h = r - l < f;
            if (v && (h = h || l < Math.ceil(f / 2)), s && v && i.params.slidesPerView !== "auto" && !n && (h = !1), h) {
                let g = v ? l < i.activeIndex ? "prev" : "next" : l - i.activeIndex - 1 < i.params.slidesPerView ? "next" : "prev";
                i.loopFix({
                    direction: g,
                    slideTo: !0,
                    activeSlideIndex: g === "next" ? l + 1 : l - r + 1,
                    slideRealIndex: g === "next" ? i.realIndex : void 0
                })
            }
            if (n) {
                let g = o * i.params.grid.rows;
                o = i.slides.find(S => S.getAttribute("data-swiper-slide-index") * 1 === g).column
            } else o = i.getSlideIndexByData(o)
        }
    return requestAnimationFrame(() => {
        i.slideTo(o, a, t, s)
    }), i
}

function Et(e, a = !0, t) {
    let s = this,
        {
            enabled: i,
            params: n,
            animating: o
        } = s;
    if (!i || s.destroyed) return s;
    typeof e > "u" && (e = s.params.speed);
    let l = n.slidesPerGroup;
    n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (l = Math.max(s.slidesPerViewDynamic("current", !0), 1));
    let r = s.activeIndex < n.slidesPerGroupSkip ? 1 : l,
        c = s.virtual && n.virtual.enabled;
    if (n.loop) {
        if (o && !c && n.loopPreventsSliding) return !1;
        if (s.loopFix({
                direction: "next"
            }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && n.cssMode) return requestAnimationFrame(() => {
            s.slideTo(s.activeIndex + r, e, a, t)
        }), !0
    }
    return n.rewind && s.isEnd ? s.slideTo(0, e, a, t) : s.slideTo(s.activeIndex + r, e, a, t)
}

function xt(e, a = !0, t) {
    let s = this,
        {
            params: i,
            snapGrid: n,
            slidesGrid: o,
            rtlTranslate: l,
            enabled: r,
            animating: c
        } = s;
    if (!r || s.destroyed) return s;
    typeof e > "u" && (e = s.params.speed);
    let u = s.virtual && i.virtual.enabled;
    if (i.loop) {
        if (c && !u && i.loopPreventsSliding) return !1;
        s.loopFix({
            direction: "prev"
        }), s._clientLeft = s.wrapperEl.clientLeft
    }
    let d = l ? s.translate : -s.translate;

    function v(m) {
        return m < 0 ? -Math.floor(Math.abs(m)) : Math.floor(m)
    }
    let f = v(d),
        h = n.map(m => v(m)),
        g = i.freeMode && i.freeMode.enabled,
        S = n[h.indexOf(f) - 1];
    if (typeof S > "u" && (i.cssMode || g)) {
        let m;
        n.forEach((y, T) => {
            f >= y && (m = T)
        }), typeof m < "u" && (S = g ? n[m] : n[m > 0 ? m - 1 : m])
    }
    let p = 0;
    if (typeof S < "u" && (p = o.indexOf(S), p < 0 && (p = s.activeIndex - 1), i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (p = p - s.slidesPerViewDynamic("previous", !0) + 1, p = Math.max(p, 0))), i.rewind && s.isBeginning) {
        let m = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
        return s.slideTo(m, e, a, t)
    } else if (i.loop && s.activeIndex === 0 && i.cssMode) return requestAnimationFrame(() => {
        s.slideTo(p, e, a, t)
    }), !0;
    return s.slideTo(p, e, a, t)
}

function Tt(e, a = !0, t) {
    let s = this;
    if (!s.destroyed) return typeof e > "u" && (e = s.params.speed), s.slideTo(s.activeIndex, e, a, t)
}

function Mt(e, a = !0, t, s = .5) {
    let i = this;
    if (i.destroyed) return;
    typeof e > "u" && (e = i.params.speed);
    let n = i.activeIndex,
        o = Math.min(i.params.slidesPerGroupSkip, n),
        l = o + Math.floor((n - o) / i.params.slidesPerGroup),
        r = i.rtlTranslate ? i.translate : -i.translate;
    if (r >= i.snapGrid[l]) {
        let c = i.snapGrid[l],
            u = i.snapGrid[l + 1];
        r - c > (u - c) * s && (n += i.params.slidesPerGroup)
    } else {
        let c = i.snapGrid[l - 1],
            u = i.snapGrid[l];
        r - c <= (u - c) * s && (n -= i.params.slidesPerGroup)
    }
    return n = Math.max(n, 0), n = Math.min(n, i.slidesGrid.length - 1), i.slideTo(n, e, a, t)
}

function Ct() {
    let e = this;
    if (e.destroyed) return;
    let {
        params: a,
        slidesEl: t
    } = e, s = a.slidesPerView === "auto" ? e.slidesPerViewDynamic() : a.slidesPerView, i = e.getSlideIndexWhenGrid(e.clickedIndex), n, o = e.isElement ? "swiper-slide" : `.${a.slideClass}`, l = e.grid && e.params.grid && e.params.grid.rows > 1;
    if (a.loop) {
        if (e.animating) return;
        n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), a.centeredSlides ? e.slideToLoop(n) : i > (l ? (e.slides.length - s) / 2 - (e.params.grid.rows - 1) : e.slides.length - s) ? (e.loopFix(), i = e.getSlideIndex(R(t, `${o}[data-swiper-slide-index="${n}"]`)[0]), q(() => {
            e.slideTo(i)
        })) : e.slideTo(i)
    } else e.slideTo(i)
}
var Pt = {
    slideTo: bt,
    slideToLoop: St,
    slideNext: Et,
    slidePrev: xt,
    slideReset: Tt,
    slideToClosest: Mt,
    slideToClickedSlide: Ct
};

function Lt(e, a) {
    let t = this,
        {
            params: s,
            slidesEl: i
        } = t;
    if (!s.loop || t.virtual && t.params.virtual.enabled) return;
    let n = () => {
            R(i, `.${s.slideClass}, swiper-slide`).forEach((h, g) => {
                h.setAttribute("data-swiper-slide-index", g)
            })
        },
        o = () => {
            let f = R(i, `.${s.slideBlankClass}`);
            f.forEach(h => {
                h.remove()
            }), f.length > 0 && (t.recalcSlides(), t.updateSlides())
        },
        l = t.grid && s.grid && s.grid.rows > 1;
    s.loopAddBlankSlides && (s.slidesPerGroup > 1 || l) && o();
    let r = s.slidesPerGroup * (l ? s.grid.rows : 1),
        c = t.slides.length % r !== 0,
        u = l && t.slides.length % s.grid.rows !== 0,
        d = f => {
            for (let h = 0; h < f; h += 1) {
                let g = t.isElement ? Y("swiper-slide", [s.slideBlankClass]) : Y("div", [s.slideClass, s.slideBlankClass]);
                t.slidesEl.append(g)
            }
        };
    if (c) {
        if (s.loopAddBlankSlides) {
            let f = r - t.slides.length % r;
            d(f), t.recalcSlides(), t.updateSlides()
        } else oe("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
        n()
    } else if (u) {
        if (s.loopAddBlankSlides) {
            let f = s.grid.rows - t.slides.length % s.grid.rows;
            d(f), t.recalcSlides(), t.updateSlides()
        } else oe("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
        n()
    } else n();
    let v = s.centeredSlides || !!s.slidesOffsetBefore || !!s.slidesOffsetAfter;
    t.loopFix({
        slideRealIndex: e,
        direction: v ? void 0 : "next",
        initial: a
    })
}

function It({
    slideRealIndex: e,
    slideTo: a = !0,
    direction: t,
    setTranslate: s,
    activeSlideIndex: i,
    initial: n,
    byController: o,
    byMousewheel: l
} = {}) {
    let r = this;
    if (!r.params.loop) return;
    r.emit("beforeLoopFix");
    let {
        slides: c,
        allowSlidePrev: u,
        allowSlideNext: d,
        slidesEl: v,
        params: f
    } = r, {
        centeredSlides: h,
        slidesOffsetBefore: g,
        slidesOffsetAfter: S,
        initialSlide: p
    } = f, m = h || !!g || !!S;
    if (r.allowSlidePrev = !0, r.allowSlideNext = !0, r.virtual && f.virtual.enabled) {
        a && (!m && r.snapIndex === 0 ? r.slideTo(r.virtual.slides.length, 0, !1, !0) : m && r.snapIndex < f.slidesPerView ? r.slideTo(r.virtual.slides.length + r.snapIndex, 0, !1, !0) : r.snapIndex === r.snapGrid.length - 1 && r.slideTo(r.virtual.slidesBefore, 0, !1, !0)), r.allowSlidePrev = u, r.allowSlideNext = d, r.emit("loopFix");
        return
    }
    let y = f.slidesPerView;
    y === "auto" ? y = r.slidesPerViewDynamic() : (y = Math.ceil(parseFloat(f.slidesPerView, 10)), m && y % 2 === 0 && (y = y + 1));
    let T = f.slidesPerGroupAuto ? y : f.slidesPerGroup,
        L = m ? Math.max(T, Math.ceil(y / 2)) : T;
    L % T !== 0 && (L += T - L % T), L += f.loopAdditionalSlides, r.loopedSlides = L;
    let I = r.grid && f.grid && f.grid.rows > 1;
    c.length < y + L || r.params.effect === "cards" && c.length < y + L * 2 ? oe("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : I && f.grid.fill === "row" && oe("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    let z = [],
        E = [],
        O = I ? Math.ceil(c.length / f.grid.rows) : c.length,
        C = n && O - p < y && !m,
        b = C ? p : r.activeIndex;
    typeof i > "u" ? i = r.getSlideIndex(c.find(A => A.classList.contains(f.slideActiveClass))) : b = i;
    let x = t === "next" || !t,
        M = t === "prev" || !t,
        P = 0,
        D = 0,
        $ = (I ? c[i].column : i) + (m && typeof s > "u" ? -y / 2 + .5 : 0);
    if ($ < L) {
        P = Math.max(L - $, T);
        for (let A = 0; A < L - $; A += 1) {
            let k = A - Math.floor(A / O) * O;
            if (I) {
                let X = O - k - 1;
                for (let Q = c.length - 1; Q >= 0; Q -= 1) c[Q].column === X && z.push(Q)
            } else z.push(O - k - 1)
        }
    } else if ($ + y > O - L) {
        D = Math.max($ - (O - L * 2), T), C && (D = Math.max(D, y - O + p + 1));
        for (let A = 0; A < D; A += 1) {
            let k = A - Math.floor(A / O) * O;
            I ? c.forEach((X, Q) => {
                X.column === k && E.push(Q)
            }) : E.push(k)
        }
    }
    if (r.__preventObserver__ = !0, requestAnimationFrame(() => {
            r.__preventObserver__ = !1
        }), r.params.effect === "cards" && c.length < y + L * 2 && (E.includes(i) && E.splice(E.indexOf(i), 1), z.includes(i) && z.splice(z.indexOf(i), 1)), M && z.forEach(A => {
            c[A].swiperLoopMoveDOM = !0, v.prepend(c[A]), c[A].swiperLoopMoveDOM = !1
        }), x && E.forEach(A => {
            c[A].swiperLoopMoveDOM = !0, v.append(c[A]), c[A].swiperLoopMoveDOM = !1
        }), r.recalcSlides(), f.slidesPerView === "auto" ? r.updateSlides() : I && (z.length > 0 && M || E.length > 0 && x) && r.slides.forEach((A, k) => {
            r.grid.updateSlide(k, A, r.slides)
        }), f.watchSlidesProgress && r.updateSlidesOffset(), a) {
        if (z.length > 0 && M) {
            if (typeof e > "u") {
                let A = r.slidesGrid[b],
                    X = r.slidesGrid[b + P] - A;
                l ? r.setTranslate(r.translate - X) : (r.slideTo(b + Math.ceil(P), 0, !1, !0), s && (r.touchEventsData.startTranslate = r.touchEventsData.startTranslate - X, r.touchEventsData.currentTranslate = r.touchEventsData.currentTranslate - X))
            } else if (s) {
                let A = I ? z.length / f.grid.rows : z.length;
                r.slideTo(r.activeIndex + A, 0, !1, !0), r.touchEventsData.currentTranslate = r.translate
            }
        } else if (E.length > 0 && x)
            if (typeof e > "u") {
                let A = r.slidesGrid[b],
                    X = r.slidesGrid[b - D] - A;
                l ? r.setTranslate(r.translate - X) : (r.slideTo(b - D, 0, !1, !0), s && (r.touchEventsData.startTranslate = r.touchEventsData.startTranslate - X, r.touchEventsData.currentTranslate = r.touchEventsData.currentTranslate - X))
            } else {
                let A = I ? E.length / f.grid.rows : E.length;
                r.slideTo(r.activeIndex - A, 0, !1, !0)
            }
    }
    if (r.allowSlidePrev = u, r.allowSlideNext = d, r.controller && r.controller.control && !o) {
        let A = {
            slideRealIndex: e,
            direction: t,
            setTranslate: s,
            activeSlideIndex: i,
            byController: !0
        };
        Array.isArray(r.controller.control) ? r.controller.control.forEach(k => {
            !k.destroyed && k.params.loop && k.loopFix({ ...A,
                slideTo: k.params.slidesPerView === f.slidesPerView ? a : !1
            })
        }) : r.controller.control instanceof r.constructor && r.controller.control.params.loop && r.controller.control.loopFix({ ...A,
            slideTo: r.controller.control.params.slidesPerView === f.slidesPerView ? a : !1
        })
    }
    r.emit("loopFix")
}

function zt() {
    let e = this,
        {
            params: a,
            slidesEl: t
        } = e;
    if (!a.loop || !t || e.virtual && e.params.virtual.enabled) return;
    e.recalcSlides();
    let s = [];
    e.slides.forEach(i => {
        let n = typeof i.swiperSlideIndex > "u" ? i.getAttribute("data-swiper-slide-index") * 1 : i.swiperSlideIndex;
        s[n] = i
    }), e.slides.forEach(i => {
        i.removeAttribute("data-swiper-slide-index")
    }), s.forEach(i => {
        t.append(i)
    }), e.recalcSlides(), e.slideTo(e.realIndex, 0)
}
var At = {
    loopCreate: Lt,
    loopFix: It,
    loopDestroy: zt
};

function Ot(e) {
    let a = this;
    if (!a.params.simulateTouch || a.params.watchOverflow && a.isLocked || a.params.cssMode) return;
    let t = a.params.touchEventsTarget === "container" ? a.el : a.wrapperEl;
    a.isElement && (a.__preventObserver__ = !0), t.style.cursor = "move", t.style.cursor = e ? "grabbing" : "grab", a.isElement && requestAnimationFrame(() => {
        a.__preventObserver__ = !1
    })
}

function Dt() {
    let e = this;
    e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
        e.__preventObserver__ = !1
    }))
}
var $t = {
    setGrabCursor: Ot,
    unsetGrabCursor: Dt
};

function kt(e, a = this) {
    function t(s) {
        if (!s || s === B() || s === H()) return null;
        s.assignedSlot && (s = s.assignedSlot);
        let i = s.closest(e);
        return !i && !s.getRootNode ? null : i || t(s.getRootNode().host)
    }
    return t(a)
}

function Oe(e, a, t) {
    let s = H(),
        {
            params: i
        } = e,
        n = i.edgeSwipeDetection,
        o = i.edgeSwipeThreshold;
    return n && (t <= o || t >= s.innerWidth - o) ? n === "prevent" ? (a.preventDefault(), !0) : !1 : !0
}

function Gt(e) {
    let a = this,
        t = B(),
        s = e;
    s.originalEvent && (s = s.originalEvent);
    let i = a.touchEventsData;
    if (s.type === "pointerdown") {
        if (i.pointerId !== null && i.pointerId !== s.pointerId) return;
        i.pointerId = s.pointerId
    } else s.type === "touchstart" && s.targetTouches.length === 1 && (i.touchId = s.targetTouches[0].identifier);
    if (s.type === "touchstart") {
        Oe(a, s, s.targetTouches[0].pageX);
        return
    }
    let {
        params: n,
        touches: o,
        enabled: l
    } = a;
    if (!l || !n.simulateTouch && s.pointerType === "mouse" || a.animating && n.preventInteractionOnTransition) return;
    !a.animating && n.cssMode && n.loop && a.loopFix();
    let r = s.target;
    if (n.touchEventsTarget === "wrapper" && !Le(r, a.wrapperEl) || "which" in s && s.which === 3 || "button" in s && s.button > 0 || i.isTouched && i.isMoved) return;
    let c = !!n.noSwipingClass && n.noSwipingClass !== "",
        u = s.composedPath ? s.composedPath() : s.path;
    c && s.target && s.target.shadowRoot && u && (r = u[0]);
    let d = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
        v = !!(s.target && s.target.shadowRoot);
    if (n.noSwiping && (v ? kt(d, r) : r.closest(d))) {
        a.allowClick = !0;
        return
    }
    if (n.swipeHandler && !r.closest(n.swipeHandler)) return;
    o.currentX = s.pageX, o.currentY = s.pageY;
    let f = o.currentX,
        h = o.currentY;
    if (!Oe(a, s, f)) return;
    Object.assign(i, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }), o.startX = f, o.startY = h, i.touchStartTime = W(), a.allowClick = !0, a.updateSize(), a.swipeDirection = void 0, n.threshold > 0 && (i.allowThresholdMove = !1);
    let g = !0;
    r.matches(i.focusableElements) && (g = !1, r.nodeName === "SELECT" && (i.isTouched = !1)), t.activeElement && t.activeElement.matches(i.focusableElements) && t.activeElement !== r && (s.pointerType === "mouse" || s.pointerType !== "mouse" && !r.matches(i.focusableElements)) && t.activeElement.blur();
    let S = g && a.allowTouchMove && n.touchStartPreventDefault;
    (n.touchStartForcePreventDefault || S) && !r.isContentEditable && s.preventDefault(), n.freeMode && n.freeMode.enabled && a.freeMode && a.animating && !n.cssMode && a.freeMode.onTouchStart(), a.emit("touchStart", s)
}

function Ht(e) {
    let a = B(),
        t = this,
        s = t.touchEventsData,
        {
            params: i,
            touches: n,
            rtlTranslate: o,
            enabled: l
        } = t;
    if (!l || !i.simulateTouch && e.pointerType === "mouse") return;
    let r = e;
    if (r.originalEvent && (r = r.originalEvent), r.type === "pointermove" && (s.touchId !== null || r.pointerId !== s.pointerId)) return;
    let c;
    if (r.type === "touchmove") {
        if (c = [...r.changedTouches].find(I => I.identifier === s.touchId), !c || c.identifier !== s.touchId) return
    } else c = r;
    if (!s.isTouched) {
        s.startMoving && s.isScrolling && t.emit("touchMoveOpposite", r);
        return
    }
    let u = c.pageX,
        d = c.pageY;
    if (r.preventedByNestedSwiper) {
        n.startX = u, n.startY = d;
        return
    }
    if (!t.allowTouchMove) {
        r.target.matches(s.focusableElements) || (t.allowClick = !1), s.isTouched && (Object.assign(n, {
            startX: u,
            startY: d,
            currentX: u,
            currentY: d
        }), s.touchStartTime = W());
        return
    }
    if (i.touchReleaseOnEdges && !i.loop)
        if (t.isVertical()) {
            if (d < n.startY && t.translate <= t.maxTranslate() || d > n.startY && t.translate >= t.minTranslate()) {
                s.isTouched = !1, s.isMoved = !1;
                return
            }
        } else {
            if (o && (u > n.startX && -t.translate <= t.maxTranslate() || u < n.startX && -t.translate >= t.minTranslate())) return;
            if (!o && (u < n.startX && t.translate <= t.maxTranslate() || u > n.startX && t.translate >= t.minTranslate())) return
        }
    if (a.activeElement && a.activeElement.matches(s.focusableElements) && a.activeElement !== r.target && r.pointerType !== "mouse" && a.activeElement.blur(), a.activeElement && r.target === a.activeElement && r.target.matches(s.focusableElements)) {
        s.isMoved = !0, t.allowClick = !1;
        return
    }
    s.allowTouchCallbacks && t.emit("touchMove", r), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = u, n.currentY = d;
    let v = n.currentX - n.startX,
        f = n.currentY - n.startY;
    if (t.params.threshold && Math.sqrt(v ** 2 + f ** 2) < t.params.threshold) return;
    if (typeof s.isScrolling > "u") {
        let I;
        t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : v * v + f * f >= 25 && (I = Math.atan2(Math.abs(f), Math.abs(v)) * 180 / Math.PI, s.isScrolling = t.isHorizontal() ? I > i.touchAngle : 90 - I > i.touchAngle)
    }
    if (s.isScrolling && t.emit("touchMoveOpposite", r), typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0), s.isScrolling || r.type === "touchmove" && s.preventTouchMoveFromPointerMove) {
        s.isTouched = !1;
        return
    }
    if (!s.startMoving) return;
    t.allowClick = !1, !i.cssMode && r.cancelable && r.preventDefault(), i.touchMoveStopPropagation && !i.nested && r.stopPropagation();
    let h = t.isHorizontal() ? v : f,
        g = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
    i.oneWayMovement && (h = Math.abs(h) * (o ? 1 : -1), g = Math.abs(g) * (o ? 1 : -1)), n.diff = h, h *= i.touchRatio, o && (h = -h, g = -g);
    let S = t.touchesDirection;
    t.swipeDirection = h > 0 ? "prev" : "next", t.touchesDirection = g > 0 ? "prev" : "next";
    let p = t.params.loop && !i.cssMode,
        m = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
    if (!s.isMoved) {
        if (p && m && t.loopFix({
                direction: t.swipeDirection
            }), s.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
            let I = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
                detail: {
                    bySwiperTouchMove: !0
                }
            });
            t.wrapperEl.dispatchEvent(I)
        }
        s.allowMomentumBounce = !1, i.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", r)
    }
    let y;
    if (new Date().getTime(), i._loopSwapReset !== !1 && s.isMoved && s.allowThresholdMove && S !== t.touchesDirection && p && m && Math.abs(h) >= 1) {
        Object.assign(n, {
            startX: u,
            startY: d,
            currentX: u,
            currentY: d,
            startTranslate: s.currentTranslate
        }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
        return
    }
    t.emit("sliderMove", r), s.isMoved = !0, s.currentTranslate = h + s.startTranslate;
    let T = !0,
        L = i.resistanceRatio;
    if (i.touchReleaseOnEdges && (L = 0), h > 0 ? (p && m && !y && s.allowThresholdMove && s.currentTranslate > (i.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (i.slidesPerView !== "auto" && t.slides.length - i.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }), s.currentTranslate > t.minTranslate() && (T = !1, i.resistance && (s.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + s.startTranslate + h) ** L))) : h < 0 && (p && m && !y && s.allowThresholdMove && s.currentTranslate < (i.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (i.slidesPerView !== "auto" && t.slides.length - i.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex: t.slides.length - (i.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(i.slidesPerView, 10)))
        }), s.currentTranslate < t.maxTranslate() && (T = !1, i.resistance && (s.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - s.startTranslate - h) ** L))), T && (r.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (s.currentTranslate = s.startTranslate), i.threshold > 0)
        if (Math.abs(h) > i.threshold || s.allowThresholdMove) {
            if (!s.allowThresholdMove) {
                s.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, s.currentTranslate = s.startTranslate, n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
                return
            }
        } else {
            s.currentTranslate = s.startTranslate;
            return
        }!i.followFinger || i.cssMode || ((i.freeMode && i.freeMode.enabled && t.freeMode || i.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && i.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(s.currentTranslate), t.setTranslate(s.currentTranslate))
}

function Bt(e) {
    let a = this,
        t = a.touchEventsData,
        s = e;
    s.originalEvent && (s = s.originalEvent);
    let i;
    if (s.type === "touchend" || s.type === "touchcancel") {
        if (i = [...s.changedTouches].find(L => L.identifier === t.touchId), !i || i.identifier !== t.touchId) return
    } else {
        if (t.touchId !== null || s.pointerId !== t.pointerId) return;
        i = s
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (a.browser.isSafari || a.browser.isWebView))) return;
    t.pointerId = null, t.touchId = null;
    let {
        params: o,
        touches: l,
        rtlTranslate: r,
        slidesGrid: c,
        enabled: u
    } = a;
    if (!u || !o.simulateTouch && s.pointerType === "mouse") return;
    if (t.allowTouchCallbacks && a.emit("touchEnd", s), t.allowTouchCallbacks = !1, !t.isTouched) {
        t.isMoved && o.grabCursor && a.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
        return
    }
    o.grabCursor && t.isMoved && t.isTouched && (a.allowSlideNext === !0 || a.allowSlidePrev === !0) && a.setGrabCursor(!1);
    let d = W(),
        v = d - t.touchStartTime;
    if (a.allowClick) {
        let L = s.path || s.composedPath && s.composedPath();
        a.updateClickedSlide(L && L[0] || s.target, L), a.emit("tap click", s), v < 300 && d - t.lastClickTime < 300 && a.emit("doubleTap doubleClick", s)
    }
    if (t.lastClickTime = W(), q(() => {
            a.destroyed || (a.allowClick = !0)
        }), !t.isTouched || !t.isMoved || !a.swipeDirection || l.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
        t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
        return
    }
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    let f;
    if (o.followFinger ? f = r ? a.translate : -a.translate : f = -t.currentTranslate, o.cssMode) return;
    if (o.freeMode && o.freeMode.enabled) {
        a.freeMode.onTouchEnd({
            currentPos: f
        });
        return
    }
    let h = f >= -a.maxTranslate() && !a.params.loop,
        g = 0,
        S = a.slidesSizesGrid[0];
    for (let L = 0; L < c.length; L += L < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
        let I = L < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
        typeof c[L + I] < "u" ? (h || f >= c[L] && f < c[L + I]) && (g = L, S = c[L + I] - c[L]) : (h || f >= c[L]) && (g = L, S = c[c.length - 1] - c[c.length - 2])
    }
    let p = null,
        m = null;
    o.rewind && (a.isBeginning ? m = o.virtual && o.virtual.enabled && a.virtual ? a.virtual.slides.length - 1 : a.slides.length - 1 : a.isEnd && (p = 0));
    let y = (f - c[g]) / S,
        T = g < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    if (v > o.longSwipesMs) {
        if (!o.longSwipes) {
            a.slideTo(a.activeIndex);
            return
        }
        a.swipeDirection === "next" && (y >= o.longSwipesRatio ? a.slideTo(o.rewind && a.isEnd ? p : g + T) : a.slideTo(g)), a.swipeDirection === "prev" && (y > 1 - o.longSwipesRatio ? a.slideTo(g + T) : m !== null && y < 0 && Math.abs(y) > o.longSwipesRatio ? a.slideTo(m) : a.slideTo(g))
    } else {
        if (!o.shortSwipes) {
            a.slideTo(a.activeIndex);
            return
        }
        a.navigation && (s.target === a.navigation.nextEl || s.target === a.navigation.prevEl) ? s.target === a.navigation.nextEl ? a.slideTo(g + T) : a.slideTo(g) : (a.swipeDirection === "next" && a.slideTo(p !== null ? p : g + T), a.swipeDirection === "prev" && a.slideTo(m !== null ? m : g))
    }
}

function De() {
    let e = this,
        {
            params: a,
            el: t
        } = e;
    if (t && t.offsetWidth === 0) return;
    a.breakpoints && e.setBreakpoint();
    let {
        allowSlideNext: s,
        allowSlidePrev: i,
        snapGrid: n
    } = e, o = e.virtual && e.params.virtual.enabled;
    e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
    let l = o && a.loop;
    (a.slidesPerView === "auto" || a.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !l ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.params.loop && !o ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
    }, 500)), e.allowSlidePrev = i, e.allowSlideNext = s, e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow()
}

function Vt(e) {
    let a = this;
    a.enabled && (a.allowClick || (a.params.preventClicks && e.preventDefault(), a.params.preventClicksPropagation && a.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
}

function Xt() {
    let e = this,
        {
            wrapperEl: a,
            rtlTranslate: t,
            enabled: s
        } = e;
    if (!s) return;
    e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -a.scrollLeft : e.translate = -a.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
    let i, n = e.maxTranslate() - e.minTranslate();
    n === 0 ? i = 0 : i = (e.translate - e.minTranslate()) / n, i !== e.progress && e.updateProgress(t ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
}

function Rt(e) {
    let a = this;
    ue(a, e.target), !(a.params.cssMode || a.params.slidesPerView !== "auto" && !a.params.autoHeight) && a.update()
}

function Yt() {
    let e = this;
    e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
}
var Xe = (e, a) => {
    let t = B(),
        {
            params: s,
            el: i,
            wrapperEl: n,
            device: o
        } = e,
        l = !!s.nested,
        r = a === "on" ? "addEventListener" : "removeEventListener",
        c = a;
    !i || typeof i == "string" || (t[r]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: l
    }), i[r]("touchstart", e.onTouchStart, {
        passive: !1
    }), i[r]("pointerdown", e.onTouchStart, {
        passive: !1
    }), t[r]("touchmove", e.onTouchMove, {
        passive: !1,
        capture: l
    }), t[r]("pointermove", e.onTouchMove, {
        passive: !1,
        capture: l
    }), t[r]("touchend", e.onTouchEnd, {
        passive: !0
    }), t[r]("pointerup", e.onTouchEnd, {
        passive: !0
    }), t[r]("pointercancel", e.onTouchEnd, {
        passive: !0
    }), t[r]("touchcancel", e.onTouchEnd, {
        passive: !0
    }), t[r]("pointerout", e.onTouchEnd, {
        passive: !0
    }), t[r]("pointerleave", e.onTouchEnd, {
        passive: !0
    }), t[r]("contextmenu", e.onTouchEnd, {
        passive: !0
    }), (s.preventClicks || s.preventClicksPropagation) && i[r]("click", e.onClick, !0), s.cssMode && n[r]("scroll", e.onScroll), s.updateOnWindowResize ? e[c](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", De, !0) : e[c]("observerUpdate", De, !0), i[r]("load", e.onLoad, {
        capture: !0
    }))
};

function Ft() {
    let e = this,
        {
            params: a
        } = e;
    e.onTouchStart = Gt.bind(e), e.onTouchMove = Ht.bind(e), e.onTouchEnd = Bt.bind(e), e.onDocumentTouchStart = Yt.bind(e), a.cssMode && (e.onScroll = Xt.bind(e)), e.onClick = Vt.bind(e), e.onLoad = Rt.bind(e), Xe(e, "on")
}

function Nt() {
    Xe(this, "off")
}
var Wt = {
        attachEvents: Ft,
        detachEvents: Nt
    },
    $e = (e, a) => e.grid && a.grid && a.grid.rows > 1;

function _t() {
    let e = this,
        {
            realIndex: a,
            initialized: t,
            params: s,
            el: i
        } = e,
        n = s.breakpoints;
    if (!n || n && Object.keys(n).length === 0) return;
    let o = B(),
        l = s.breakpointsBase === "window" || !s.breakpointsBase ? s.breakpointsBase : "container",
        r = ["window", "container"].includes(s.breakpointsBase) || !s.breakpointsBase ? e.el : o.querySelector(s.breakpointsBase),
        c = e.getBreakpoint(n, l, r);
    if (!c || e.currentBreakpoint === c) return;
    let d = (c in n ? n[c] : void 0) || e.originalParams,
        v = $e(e, s),
        f = $e(e, d),
        h = e.params.grabCursor,
        g = d.grabCursor,
        S = s.enabled;
    v && !f ? (i.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), e.emitContainerClasses()) : !v && f && (i.classList.add(`${s.containerModifierClass}grid`), (d.grid.fill && d.grid.fill === "column" || !d.grid.fill && s.grid.fill === "column") && i.classList.add(`${s.containerModifierClass}grid-column`), e.emitContainerClasses()), h && !g ? e.unsetGrabCursor() : !h && g && e.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach(I => {
        if (typeof d[I] > "u") return;
        let z = s[I] && s[I].enabled,
            E = d[I] && d[I].enabled;
        z && !E && e[I].disable(), !z && E && e[I].enable()
    });
    let p = d.direction && d.direction !== s.direction,
        m = s.loop && (d.slidesPerView !== s.slidesPerView || p),
        y = s.loop;
    p && t && e.changeDirection(), F(e.params, d);
    let T = e.params.enabled,
        L = e.params.loop;
    Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev
    }), S && !T ? e.disable() : !S && T && e.enable(), e.currentBreakpoint = c, e.emit("_beforeBreakpoint", d), t && (m ? (e.loopDestroy(), e.loopCreate(a), e.updateSlides()) : !y && L ? (e.loopCreate(a), e.updateSlides()) : y && !L && e.loopDestroy()), e.emit("breakpoint", d)
}

function qt(e, a = "window", t) {
    if (!e || a === "container" && !t) return;
    let s = !1,
        i = H(),
        n = a === "window" ? i.innerHeight : t.clientHeight,
        o = Object.keys(e).map(l => {
            if (typeof l == "string" && l.indexOf("@") === 0) {
                let r = parseFloat(l.substr(1));
                return {
                    value: n * r,
                    point: l
                }
            }
            return {
                value: l,
                point: l
            }
        });
    o.sort((l, r) => parseInt(l.value, 10) - parseInt(r.value, 10));
    for (let l = 0; l < o.length; l += 1) {
        let {
            point: r,
            value: c
        } = o[l];
        a === "window" ? i.matchMedia(`(min-width: ${c}px)`).matches && (s = r) : c <= t.clientWidth && (s = r)
    }
    return s || "max"
}
var jt = {
    setBreakpoint: _t,
    getBreakpoint: qt
};

function wt(e, a) {
    let t = [];
    return e.forEach(s => {
        typeof s == "object" ? Object.keys(s).forEach(i => {
            s[i] && t.push(a + i)
        }) : typeof s == "string" && t.push(a + s)
    }), t
}

function Ut() {
    let e = this,
        {
            classNames: a,
            params: t,
            rtl: s,
            el: i,
            device: n
        } = e,
        o = wt(["initialized", t.direction, {
            "free-mode": e.params.freeMode && t.freeMode.enabled
        }, {
            autoheight: t.autoHeight
        }, {
            rtl: s
        }, {
            grid: t.grid && t.grid.rows > 1
        }, {
            "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
        }, {
            android: n.android
        }, {
            ios: n.ios
        }, {
            "css-mode": t.cssMode
        }, {
            centered: t.cssMode && t.centeredSlides
        }, {
            "watch-progress": t.watchSlidesProgress
        }], t.containerModifierClass);
    a.push(...o), i.classList.add(...a), e.emitContainerClasses()
}

function Kt() {
    let e = this,
        {
            el: a,
            classNames: t
        } = e;
    !a || typeof a == "string" || (a.classList.remove(...t), e.emitContainerClasses())
}
var Zt = {
    addClasses: Ut,
    removeClasses: Kt
};

function Qt() {
    let e = this,
        {
            isLocked: a,
            params: t
        } = e,
        {
            slidesOffsetBefore: s
        } = t;
    if (s) {
        let i = e.slides.length - 1,
            n = e.slidesGrid[i] + e.slidesSizesGrid[i] + s * 2;
        e.isLocked = e.size > n
    } else e.isLocked = e.snapGrid.length === 1;
    t.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), t.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), a && a !== e.isLocked && (e.isEnd = !1), a !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
}
var Jt = {
        checkOverflow: Qt
    },
    ke = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        eventsPrefix: "swiper",
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        snapToSlideEdge: !1,
        watchOverflow: !0,
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
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopAddBlankSlides: !0,
        loopAdditionalSlides: 0,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };

function ea(e, a) {
    return function(s = {}) {
        let i = Object.keys(s)[0],
            n = s[i];
        if (typeof n != "object" || n === null) {
            F(a, s);
            return
        }
        if (e[i] === !0 && (e[i] = {
                enabled: !0
            }), i === "navigation" && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0), ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0), !(i in e && "enabled" in n)) {
            F(a, s);
            return
        }
        typeof e[i] == "object" && !("enabled" in e[i]) && (e[i].enabled = !0), e[i] || (e[i] = {
            enabled: !1
        }), F(a, s)
    }
}
var Ee = {
        eventsEmitter: Ze,
        update: ot,
        translate: pt,
        transition: yt,
        slide: Pt,
        loop: At,
        grabCursor: $t,
        events: Wt,
        breakpoints: jt,
        checkOverflow: Jt,
        classes: Zt
    },
    xe = {},
    re = class e {
        constructor(...a) {
            let t, s;
            a.length === 1 && a[0].constructor && Object.prototype.toString.call(a[0]).slice(8, -1) === "Object" ? s = a[0] : [t, s] = a, s || (s = {}), s = F({}, s), t && !s.el && (s.el = t);
            let i = B();
            if (s.el && typeof s.el == "string" && i.querySelectorAll(s.el).length > 1) {
                let r = [];
                return i.querySelectorAll(s.el).forEach(c => {
                    let u = F({}, s, {
                        el: c
                    });
                    r.push(new e(u))
                }), r
            }
            let n = this;
            n.__swiper__ = !0, n.support = Ge(), n.device = He({
                userAgent: s.userAgent
            }), n.browser = Be(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__], s.modules && Array.isArray(s.modules) && s.modules.forEach(r => {
                typeof r == "function" && n.modules.indexOf(r) < 0 && n.modules.push(r)
            });
            let o = {};
            n.modules.forEach(r => {
                r({
                    params: s,
                    swiper: n,
                    extendParams: ea(s, o),
                    on: n.on.bind(n),
                    once: n.once.bind(n),
                    off: n.off.bind(n),
                    emit: n.emit.bind(n)
                })
            });
            let l = F({}, ke, o);
            return n.params = F({}, l, xe, s), n.originalParams = F({}, n.params), n.passedParams = F({}, s), n.params && n.params.on && Object.keys(n.params.on).forEach(r => {
                n.on(r, n.params.on[r])
            }), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
                enabled: n.params.enabled,
                el: t,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return n.params.direction === "horizontal"
                },
                isVertical() {
                    return n.params.direction === "vertical"
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                },
                allowSlideNext: n.params.allowSlideNext,
                allowSlidePrev: n.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: n.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: !0,
                allowTouchMove: n.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }), n.emit("_swiper"), n.params.init && n.init(), n
        }
        getDirectionLabel(a) {
            return this.isHorizontal() ? a : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[a]
        }
        getSlideIndex(a) {
            let {
                slidesEl: t,
                params: s
            } = this, i = R(t, `.${s.slideClass}, swiper-slide`), n = ae(i[0]);
            return ae(a) - n
        }
        getSlideIndexByData(a) {
            return this.getSlideIndex(this.slides.find(t => t.getAttribute("data-swiper-slide-index") * 1 === a))
        }
        getSlideIndexWhenGrid(a) {
            return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? a = Math.floor(a / this.params.grid.rows) : this.params.grid.fill === "row" && (a = a % Math.ceil(this.slides.length / this.params.grid.rows))), a
        }
        recalcSlides() {
            let a = this,
                {
                    slidesEl: t,
                    params: s
                } = a;
            a.slides = R(t, `.${s.slideClass}, swiper-slide`)
        }
        enable() {
            let a = this;
            a.enabled || (a.enabled = !0, a.params.grabCursor && a.setGrabCursor(), a.emit("enable"))
        }
        disable() {
            let a = this;
            a.enabled && (a.enabled = !1, a.params.grabCursor && a.unsetGrabCursor(), a.emit("disable"))
        }
        setProgress(a, t) {
            let s = this;
            a = Math.min(Math.max(a, 0), 1);
            let i = s.minTranslate(),
                o = (s.maxTranslate() - i) * a + i;
            s.translateTo(o, typeof t > "u" ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
        }
        emitContainerClasses() {
            let a = this;
            if (!a.params._emitClasses || !a.el) return;
            let t = a.el.className.split(" ").filter(s => s.indexOf("swiper") === 0 || s.indexOf(a.params.containerModifierClass) === 0);
            a.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(a) {
            let t = this;
            return t.destroyed ? "" : a.className.split(" ").filter(s => s.indexOf("swiper-slide") === 0 || s.indexOf(t.params.slideClass) === 0).join(" ")
        }
        emitSlidesClasses() {
            let a = this;
            if (!a.params._emitClasses || !a.el) return;
            let t = [];
            a.slides.forEach(s => {
                let i = a.getSlideClasses(s);
                t.push({
                    slideEl: s,
                    classNames: i
                }), a.emit("_slideClass", s, i)
            }), a.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(a = "current", t = !1) {
            let s = this,
                {
                    params: i,
                    slides: n,
                    slidesGrid: o,
                    slidesSizesGrid: l,
                    size: r,
                    activeIndex: c
                } = s,
                u = 1;
            if (typeof i.slidesPerView == "number") return i.slidesPerView;
            if (i.centeredSlides) {
                let d = n[c] ? Math.ceil(n[c].swiperSlideSize) : 0,
                    v;
                for (let f = c + 1; f < n.length; f += 1) n[f] && !v && (d += Math.ceil(n[f].swiperSlideSize), u += 1, d > r && (v = !0));
                for (let f = c - 1; f >= 0; f -= 1) n[f] && !v && (d += n[f].swiperSlideSize, u += 1, d > r && (v = !0))
            } else if (a === "current")
                for (let d = c + 1; d < n.length; d += 1)(t ? o[d] + l[d] - o[c] < r : o[d] - o[c] < r) && (u += 1);
            else
                for (let d = c - 1; d >= 0; d -= 1) o[c] - o[d] < r && (u += 1);
            return u
        }
        update() {
            let a = this;
            if (!a || a.destroyed) return;
            let {
                snapGrid: t,
                params: s
            } = a;
            s.breakpoints && a.setBreakpoint(), [...a.el.querySelectorAll('[loading="lazy"]')].forEach(o => {
                o.complete && ue(a, o)
            }), a.updateSize(), a.updateSlides(), a.updateProgress(), a.updateSlidesClasses();

            function i() {
                let o = a.rtlTranslate ? a.translate * -1 : a.translate,
                    l = Math.min(Math.max(o, a.maxTranslate()), a.minTranslate());
                a.setTranslate(l), a.updateActiveIndex(), a.updateSlidesClasses()
            }
            let n;
            if (s.freeMode && s.freeMode.enabled && !s.cssMode) i(), s.autoHeight && a.updateAutoHeight();
            else {
                if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && a.isEnd && !s.centeredSlides) {
                    let o = a.virtual && s.virtual.enabled ? a.virtual.slides : a.slides;
                    n = a.slideTo(o.length - 1, 0, !1, !0)
                } else n = a.slideTo(a.activeIndex, 0, !1, !0);
                n || i()
            }
            s.watchOverflow && t !== a.snapGrid && a.checkOverflow(), a.emit("update")
        }
        changeDirection(a, t = !0) {
            let s = this,
                i = s.params.direction;
            return a || (a = i === "horizontal" ? "vertical" : "horizontal"), a === i || a !== "horizontal" && a !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`), s.el.classList.add(`${s.params.containerModifierClass}${a}`), s.emitContainerClasses(), s.params.direction = a, s.slides.forEach(n => {
                a === "vertical" ? n.style.width = "" : n.style.height = ""
            }), s.emit("changeDirection"), t && s.update()), s
        }
        changeLanguageDirection(a) {
            let t = this;
            t.rtl && a === "rtl" || !t.rtl && a === "ltr" || (t.rtl = a === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update())
        }
        mount(a) {
            let t = this;
            if (t.mounted) return !0;
            let s = a || t.params.el;
            if (typeof s == "string" && (s = document.querySelector(s)), !s) return !1;
            s.swiper = t, s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
            let i = () => `.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`,
                o = s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(i()) : R(s, i())[0];
            return !o && t.params.createElements && (o = Y("div", t.params.wrapperClass), s.append(o), R(s, `.${t.params.slideClass}`).forEach(l => {
                o.append(l)
            })), Object.assign(t, {
                el: s,
                wrapperEl: o,
                slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : o,
                hostEl: t.isElement ? s.parentNode.host : s,
                mounted: !0,
                rtl: s.dir.toLowerCase() === "rtl" || w(s, "direction") === "rtl",
                rtlTranslate: t.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || w(s, "direction") === "rtl"),
                wrongRTL: w(o, "display") === "-webkit-box"
            }), !0
        }
        init(a) {
            let t = this;
            if (t.initialized || t.mount(a) === !1) return t;
            t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
            let i = [...t.el.querySelectorAll('[loading="lazy"]')];
            return t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), i.forEach(n => {
                n.complete ? ue(t, n) : n.addEventListener("load", o => {
                    ue(t, o.target)
                })
            }), Te(t), t.initialized = !0, Te(t), t.emit("init"), t.emit("afterInit"), t
        }
        destroy(a = !0, t = !0) {
            let s = this,
                {
                    params: i,
                    el: n,
                    wrapperEl: o,
                    slides: l
                } = s;
            return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), n && typeof n != "string" && n.removeAttribute("style"), o && o.removeAttribute("style"), l && l.length && l.forEach(r => {
                r.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), r.removeAttribute("style"), r.removeAttribute("data-swiper-slide-index")
            })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach(r => {
                s.off(r)
            }), a !== !1 && (s.el && typeof s.el != "string" && (s.el.swiper = null), Pe(s)), s.destroyed = !0), null
        }
        static extendDefaults(a) {
            F(xe, a)
        }
        static get extendedDefaults() {
            return xe
        }
        static get defaults() {
            return ke
        }
        static installModule(a) {
            e.prototype.__modules__ || (e.prototype.__modules__ = []);
            let t = e.prototype.__modules__;
            typeof a == "function" && t.indexOf(a) < 0 && t.push(a)
        }
        static use(a) {
            return Array.isArray(a) ? (a.forEach(t => e.installModule(t)), e) : (e.installModule(a), e)
        }
    };
Object.keys(Ee).forEach(e => {
    Object.keys(Ee[e]).forEach(a => {
        re.prototype[a] = Ee[e][a]
    })
});
re.use([Ue, Ke]);

function ta({
    swiper: e,
    extendParams: a,
    on: t,
    emit: s
}) {
    let i = B(),
        n = H();
    e.keyboard = {
        enabled: !1
    }, a({
        keyboard: {
            enabled: !1,
            onlyInViewport: !0,
            pageUpDown: !0,
            speed: void 0
        }
    });

    function o(c) {
        if (!e.enabled) return;
        let {
            rtlTranslate: u
        } = e, d = c;
        d.originalEvent && (d = d.originalEvent);
        let v = d.keyCode || d.charCode,
            f = e.params.keyboard.pageUpDown,
            h = f && v === 33,
            g = f && v === 34,
            S = v === 37,
            p = v === 39,
            m = v === 38,
            y = v === 40;
        if (!e.allowSlideNext && (e.isHorizontal() && p || e.isVertical() && y || g) || !e.allowSlidePrev && (e.isHorizontal() && S || e.isVertical() && m || h)) return !1;
        if (d.shiftKey || d.altKey || d.ctrlKey || d.metaKey || i.activeElement && (i.activeElement.isContentEditable || i.activeElement.nodeName && (i.activeElement.nodeName.toLowerCase() === "input" || i.activeElement.nodeName.toLowerCase() === "textarea"))) return;
        if (e.params.keyboard.onlyInViewport && (h || g || S || p || m || y)) {
            let L = !1;
            if (ee(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && ee(e.el, `.${e.params.slideActiveClass}`).length === 0) return;
            let I = e.el,
                z = I.clientWidth,
                E = I.clientHeight,
                O = n.innerWidth,
                C = n.innerHeight,
                b = de(I);
            u && (b.left -= I.scrollLeft);
            let x = [
                [b.left, b.top],
                [b.left + z, b.top],
                [b.left, b.top + E],
                [b.left + z, b.top + E]
            ];
            for (let M = 0; M < x.length; M += 1) {
                let P = x[M];
                if (P[0] >= 0 && P[0] <= O && P[1] >= 0 && P[1] <= C) {
                    if (P[0] === 0 && P[1] === 0) continue;
                    L = !0
                }
            }
            if (!L) return
        }
        let T = e.params.keyboard.speed;
        e.isHorizontal() ? ((h || g || S || p) && (d.preventDefault ? d.preventDefault() : d.returnValue = !1), ((g || p) && !u || (h || S) && u) && e.slideNext(T), ((h || S) && !u || (g || p) && u) && e.slidePrev(T)) : ((h || g || m || y) && (d.preventDefault ? d.preventDefault() : d.returnValue = !1), (g || y) && e.slideNext(T), (h || m) && e.slidePrev(T)), s("keyPress", v)
    }

    function l() {
        e.keyboard.enabled || (i.addEventListener("keydown", o), e.keyboard.enabled = !0)
    }

    function r() {
        e.keyboard.enabled && (i.removeEventListener("keydown", o), e.keyboard.enabled = !1)
    }
    t("init", () => {
        e.params.keyboard.enabled && l()
    }), t("destroy", () => {
        e.keyboard.enabled && r()
    }), Object.assign(e.keyboard, {
        enable: l,
        disable: r
    })
}

function aa({
    swiper: e,
    extendParams: a,
    on: t,
    emit: s
}) {
    let i = H();
    a({
        mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
            noMousewheelClass: "swiper-no-mousewheel"
        }
    }), e.mousewheel = {
        enabled: !1
    };
    let n, o = W(),
        l, r = [];

    function c(m) {
        let I = 0,
            z = 0,
            E = 0,
            O = 0;
        return "detail" in m && (z = m.detail), "wheelDelta" in m && (z = -m.wheelDelta / 120), "wheelDeltaY" in m && (z = -m.wheelDeltaY / 120), "wheelDeltaX" in m && (I = -m.wheelDeltaX / 120), "axis" in m && m.axis === m.HORIZONTAL_AXIS && (I = z, z = 0), E = I * 10, O = z * 10, "deltaY" in m && (O = m.deltaY), "deltaX" in m && (E = m.deltaX), m.shiftKey && !E && (E = O, O = 0), (E || O) && m.deltaMode && (m.deltaMode === 1 ? (E *= 40, O *= 40) : (E *= 800, O *= 800)), E && !I && (I = E < 1 ? -1 : 1), O && !z && (z = O < 1 ? -1 : 1), {
            spinX: I,
            spinY: z,
            pixelX: E,
            pixelY: O
        }
    }

    function u() {
        e.enabled && (e.mouseEntered = !0)
    }

    function d() {
        e.enabled && (e.mouseEntered = !1)
    }

    function v(m) {
        return e.params.mousewheel.thresholdDelta && m.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && W() - o < e.params.mousewheel.thresholdTime ? !1 : m.delta >= 6 && W() - o < 60 ? !0 : (m.direction < 0 ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(), s("scroll", m.raw)) : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(), s("scroll", m.raw)), o = new i.Date().getTime(), !1)
    }

    function f(m) {
        let y = e.params.mousewheel;
        if (m.direction < 0) {
            if (e.isEnd && !e.params.loop && y.releaseOnEdges) return !0
        } else if (e.isBeginning && !e.params.loop && y.releaseOnEdges) return !0;
        return !1
    }

    function h(m) {
        let y = m,
            T = !0;
        if (!e.enabled || m.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)) return;
        let L = e.params.mousewheel;
        e.params.cssMode && y.preventDefault();
        let I = e.el;
        e.params.mousewheel.eventsTarget !== "container" && (I = document.querySelector(e.params.mousewheel.eventsTarget));
        let z = I && I.contains(y.target);
        if (!e.mouseEntered && !z && !L.releaseOnEdges) return !0;
        y.originalEvent && (y = y.originalEvent);
        let E = 0,
            O = e.rtlTranslate ? -1 : 1,
            C = c(y);
        if (L.forceToAxis)
            if (e.isHorizontal())
                if (Math.abs(C.pixelX) > Math.abs(C.pixelY)) E = -C.pixelX * O;
                else return !0;
        else if (Math.abs(C.pixelY) > Math.abs(C.pixelX)) E = -C.pixelY;
        else return !0;
        else E = Math.abs(C.pixelX) > Math.abs(C.pixelY) ? -C.pixelX * O : -C.pixelY;
        if (E === 0) return !0;
        L.invert && (E = -E);
        let b = e.getTranslate() + E * L.sensitivity;
        if (b >= e.minTranslate() && (b = e.minTranslate()), b <= e.maxTranslate() && (b = e.maxTranslate()), T = e.params.loop ? !0 : !(b === e.minTranslate() || b === e.maxTranslate()), T && e.params.nested && y.stopPropagation(), !e.params.freeMode || !e.params.freeMode.enabled) {
            let x = {
                time: W(),
                delta: Math.abs(E),
                direction: Math.sign(E),
                raw: m
            };
            r.length >= 2 && r.shift();
            let M = r.length ? r[r.length - 1] : void 0;
            if (r.push(x), M ? (x.direction !== M.direction || x.delta > M.delta || x.time > M.time + 150) && v(x) : v(x), f(x)) return !0
        } else {
            let x = {
                    time: W(),
                    delta: Math.abs(E),
                    direction: Math.sign(E)
                },
                M = l && x.time < l.time + 500 && x.delta <= l.delta && x.direction === l.direction;
            if (!M) {
                l = void 0;
                let P = e.getTranslate() + E * L.sensitivity,
                    D = e.isBeginning,
                    G = e.isEnd;
                if (P >= e.minTranslate() && (P = e.minTranslate()), P <= e.maxTranslate() && (P = e.maxTranslate()), e.setTransition(0), e.setTranslate(P), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!D && e.isBeginning || !G && e.isEnd) && e.updateSlidesClasses(), e.params.loop && e.loopFix({
                        direction: x.direction < 0 ? "next" : "prev",
                        byMousewheel: !0
                    }), e.params.freeMode.sticky) {
                    clearTimeout(n), n = void 0, r.length >= 15 && r.shift();
                    let $ = r.length ? r[r.length - 1] : void 0,
                        A = r[0];
                    if (r.push(x), $ && (x.delta > $.delta || x.direction !== $.direction)) r.splice(0);
                    else if (r.length >= 15 && x.time - A.time < 500 && A.delta - x.delta >= 1 && x.delta <= 6) {
                        let k = E > 0 ? .8 : .2;
                        l = x, r.splice(0), n = q(() => {
                            e.destroyed || !e.params || e.slideToClosest(e.params.speed, !0, void 0, k)
                        }, 0)
                    }
                    n || (n = q(() => {
                        if (e.destroyed || !e.params) return;
                        let k = .5;
                        l = x, r.splice(0), e.slideToClosest(e.params.speed, !0, void 0, k)
                    }, 500))
                }
                if (M || s("scroll", y), e.params.autoplay && e.params.autoplay.disableOnInteraction && e.autoplay.stop(), L.releaseOnEdges && (P === e.minTranslate() || P === e.maxTranslate())) return !0
            }
        }
        return y.preventDefault ? y.preventDefault() : y.returnValue = !1, !1
    }

    function g(m) {
        let y = e.el;
        e.params.mousewheel.eventsTarget !== "container" && (y = document.querySelector(e.params.mousewheel.eventsTarget)), y[m]("mouseenter", u), y[m]("mouseleave", d), y[m]("wheel", h)
    }

    function S() {
        return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", h), !0) : e.mousewheel.enabled ? !1 : (g("addEventListener"), e.mousewheel.enabled = !0, !0)
    }

    function p() {
        return e.params.cssMode ? (e.wrapperEl.addEventListener(event, h), !0) : e.mousewheel.enabled ? (g("removeEventListener"), e.mousewheel.enabled = !1, !0) : !1
    }
    t("init", () => {
        !e.params.mousewheel.enabled && e.params.cssMode && p(), e.params.mousewheel.enabled && S()
    }), t("destroy", () => {
        e.params.cssMode && S(), e.mousewheel.enabled && p()
    }), Object.assign(e.mousewheel, {
        enable: S,
        disable: p
    })
}

function le(e, a, t, s) {
    return e.params.createElements && Object.keys(s).forEach(i => {
        if (!t[i] && t.auto === !0) {
            let n = R(e.el, `.${s[i]}`)[0];
            n || (n = Y("div", s[i]), n.className = s[i], e.el.append(n)), t[i] = n, a[i] = n
        }
    }), t
}
var Re = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';

function sa({
    swiper: e,
    extendParams: a,
    on: t,
    emit: s
}) {
    a({
        navigation: {
            nextEl: null,
            prevEl: null,
            addIcons: !0,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }), e.navigation = {
        nextEl: null,
        prevEl: null,
        arrowSvg: Re
    };

    function i(f) {
        let h;
        return f && typeof f == "string" && e.isElement && (h = e.el.querySelector(f) || e.hostEl.querySelector(f), h) ? h : (f && (typeof f == "string" && (h = [...document.querySelectorAll(f)]), e.params.uniqueNavElements && typeof f == "string" && h && h.length > 1 && e.el.querySelectorAll(f).length === 1 ? h = e.el.querySelector(f) : h && h.length === 1 && (h = h[0])), f && !h ? f : h)
    }

    function n(f, h) {
        let g = e.params.navigation;
        f = V(f), f.forEach(S => {
            S && (S.classList[h ? "add" : "remove"](...g.disabledClass.split(" ")), S.tagName === "BUTTON" && (S.disabled = h), e.params.watchOverflow && e.enabled && S.classList[e.isLocked ? "add" : "remove"](g.lockClass))
        })
    }

    function o() {
        let {
            nextEl: f,
            prevEl: h
        } = e.navigation;
        if (e.params.loop) {
            n(h, !1), n(f, !1);
            return
        }
        n(h, e.isBeginning && !e.params.rewind), n(f, e.isEnd && !e.params.rewind)
    }

    function l(f) {
        f.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), s("navigationPrev"))
    }

    function r(f) {
        f.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), s("navigationNext"))
    }

    function c() {
        let f = e.params.navigation;
        if (e.params.navigation = le(e, e.originalParams.navigation, e.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }), !(f.nextEl || f.prevEl)) return;
        let h = i(f.nextEl),
            g = i(f.prevEl);
        Object.assign(e.navigation, {
            nextEl: h,
            prevEl: g
        }), h = V(h), g = V(g);
        let S = (p, m) => {
            if (p) {
                if (f.addIcons && p.matches(".swiper-button-next,.swiper-button-prev") && !p.querySelector("svg")) {
                    let y = document.createElement("div");
                    te(y, Re), p.appendChild(y.querySelector("svg")), y.remove()
                }
                p.addEventListener("click", m === "next" ? r : l)
            }!e.enabled && p && p.classList.add(...f.lockClass.split(" "))
        };
        h.forEach(p => S(p, "next")), g.forEach(p => S(p, "prev"))
    }

    function u() {
        let {
            nextEl: f,
            prevEl: h
        } = e.navigation;
        f = V(f), h = V(h);
        let g = (S, p) => {
            S.removeEventListener("click", p === "next" ? r : l), S.classList.remove(...e.params.navigation.disabledClass.split(" "))
        };
        f.forEach(S => g(S, "next")), h.forEach(S => g(S, "prev"))
    }
    t("init", () => {
        e.params.navigation.enabled === !1 ? v() : (c(), o())
    }), t("toEdge fromEdge lock unlock", () => {
        o()
    }), t("destroy", () => {
        u()
    }), t("enable disable", () => {
        let {
            nextEl: f,
            prevEl: h
        } = e.navigation;
        if (f = V(f), h = V(h), e.enabled) {
            o();
            return
        }[...f, ...h].filter(g => !!g).forEach(g => g.classList.add(e.params.navigation.lockClass))
    }), t("click", (f, h) => {
        let {
            nextEl: g,
            prevEl: S
        } = e.navigation;
        g = V(g), S = V(S);
        let p = h.target,
            m = S.includes(p) || g.includes(p);
        if (e.isElement && !m) {
            let y = h.path || h.composedPath && h.composedPath();
            y && (m = y.find(T => g.includes(T) || S.includes(T)))
        }
        if (e.params.navigation.hideOnClick && !m) {
            if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === p || e.pagination.el.contains(p))) return;
            let y;
            g.length ? y = g[0].classList.contains(e.params.navigation.hiddenClass) : S.length && (y = S[0].classList.contains(e.params.navigation.hiddenClass)), s(y === !0 ? "navigationShow" : "navigationHide"), [...g, ...S].filter(T => !!T).forEach(T => T.classList.toggle(e.params.navigation.hiddenClass))
        }
    });
    let d = () => {
            e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), c(), o()
        },
        v = () => {
            e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), u()
        };
    Object.assign(e.navigation, {
        enable: d,
        disable: v,
        update: o,
        init: c,
        destroy: u
    })
}

function U(e = "") {
    return `.${e.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g,"\\$1").replace(/ /g,".")}`
}

function na({
    swiper: e,
    extendParams: a,
    on: t,
    emit: s
}) {
    let i = "swiper-pagination";
    a({
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
            formatFractionCurrent: p => p,
            formatFractionTotal: p => p,
            bulletClass: `${i}-bullet`,
            bulletActiveClass: `${i}-bullet-active`,
            modifierClass: `${i}-`,
            currentClass: `${i}-current`,
            totalClass: `${i}-total`,
            hiddenClass: `${i}-hidden`,
            progressbarFillClass: `${i}-progressbar-fill`,
            progressbarOppositeClass: `${i}-progressbar-opposite`,
            clickableClass: `${i}-clickable`,
            lockClass: `${i}-lock`,
            horizontalClass: `${i}-horizontal`,
            verticalClass: `${i}-vertical`,
            paginationDisabledClass: `${i}-disabled`
        }
    }), e.pagination = {
        el: null,
        bullets: []
    };
    let n, o = 0;

    function l() {
        return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0
    }

    function r(p, m) {
        let {
            bulletActiveClass: y
        } = e.params.pagination;
        p && (p = p[`${m==="prev"?"previous":"next"}ElementSibling`], p && (p.classList.add(`${y}-${m}`), p = p[`${m==="prev"?"previous":"next"}ElementSibling`], p && p.classList.add(`${y}-${m}-${m}`)))
    }

    function c(p, m, y) {
        if (p = p % y, m = m % y, m === p + 1) return "next";
        if (m === p - 1) return "previous"
    }

    function u(p) {
        let m = p.target.closest(U(e.params.pagination.bulletClass));
        if (!m) return;
        p.preventDefault();
        let y = ae(m) * e.params.slidesPerGroup;
        if (e.params.loop) {
            if (e.realIndex === y) return;
            let T = c(e.realIndex, y, e.slides.length);
            T === "next" ? e.slideNext() : T === "previous" ? e.slidePrev() : e.slideToLoop(y)
        } else e.slideTo(y)
    }

    function d() {
        let p = e.rtl,
            m = e.params.pagination;
        if (l()) return;
        let y = e.pagination.el;
        y = V(y);
        let T, L, I = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            z = e.params.loop ? Math.ceil(I / e.params.slidesPerGroup) : e.snapGrid.length;
        if (e.params.loop ? (L = e.previousRealIndex || 0, T = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (T = e.snapIndex, L = e.previousSnapIndex) : (L = e.previousIndex || 0, T = e.activeIndex || 0), m.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
            let E = e.pagination.bullets,
                O, C, b;
            if (m.dynamicBullets && (n = fe(E[0], e.isHorizontal() ? "width" : "height", !0), y.forEach(x => {
                    x.style[e.isHorizontal() ? "width" : "height"] = `${n*(m.dynamicMainBullets+4)}px`
                }), m.dynamicMainBullets > 1 && L !== void 0 && (o += T - (L || 0), o > m.dynamicMainBullets - 1 ? o = m.dynamicMainBullets - 1 : o < 0 && (o = 0)), O = Math.max(T - o, 0), C = O + (Math.min(E.length, m.dynamicMainBullets) - 1), b = (C + O) / 2), E.forEach(x => {
                    let M = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(P => `${m.bulletActiveClass}${P}`)].map(P => typeof P == "string" && P.includes(" ") ? P.split(" ") : P).flat();
                    x.classList.remove(...M)
                }), y.length > 1) E.forEach(x => {
                let M = ae(x);
                M === T ? x.classList.add(...m.bulletActiveClass.split(" ")) : e.isElement && x.setAttribute("part", "bullet"), m.dynamicBullets && (M >= O && M <= C && x.classList.add(...`${m.bulletActiveClass}-main`.split(" ")), M === O && r(x, "prev"), M === C && r(x, "next"))
            });
            else {
                let x = E[T];
                if (x && x.classList.add(...m.bulletActiveClass.split(" ")), e.isElement && E.forEach((M, P) => {
                        M.setAttribute("part", P === T ? "bullet-active" : "bullet")
                    }), m.dynamicBullets) {
                    let M = E[O],
                        P = E[C];
                    for (let D = O; D <= C; D += 1) E[D] && E[D].classList.add(...`${m.bulletActiveClass}-main`.split(" "));
                    r(M, "prev"), r(P, "next")
                }
            }
            if (m.dynamicBullets) {
                let x = Math.min(E.length, m.dynamicMainBullets + 4),
                    M = (n * x - n) / 2 - b * n,
                    P = p ? "right" : "left";
                E.forEach(D => {
                    D.style[e.isHorizontal() ? P : "top"] = `${M}px`
                })
            }
        }
        y.forEach((E, O) => {
            if (m.type === "fraction" && (E.querySelectorAll(U(m.currentClass)).forEach(C => {
                    C.textContent = m.formatFractionCurrent(T + 1)
                }), E.querySelectorAll(U(m.totalClass)).forEach(C => {
                    C.textContent = m.formatFractionTotal(z)
                })), m.type === "progressbar") {
                let C;
                m.progressbarOpposite ? C = e.isHorizontal() ? "vertical" : "horizontal" : C = e.isHorizontal() ? "horizontal" : "vertical";
                let b = (T + 1) / z,
                    x = 1,
                    M = 1;
                C === "horizontal" ? x = b : M = b, E.querySelectorAll(U(m.progressbarFillClass)).forEach(P => {
                    P.style.transform = `translate3d(0,0,0) scaleX(${x}) scaleY(${M})`, P.style.transitionDuration = `${e.params.speed}ms`
                })
            }
            m.type === "custom" && m.renderCustom ? (te(E, m.renderCustom(e, T + 1, z)), O === 0 && s("paginationRender", E)) : (O === 0 && s("paginationRender", E), s("paginationUpdate", E)), e.params.watchOverflow && e.enabled && E.classList[e.isLocked ? "add" : "remove"](m.lockClass)
        })
    }

    function v() {
        let p = e.params.pagination;
        if (l()) return;
        let m = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length,
            y = e.pagination.el;
        y = V(y);
        let T = "";
        if (p.type === "bullets") {
            let L = e.params.loop ? Math.ceil(m / e.params.slidesPerGroup) : e.snapGrid.length;
            e.params.freeMode && e.params.freeMode.enabled && L > m && (L = m);
            for (let I = 0; I < L; I += 1) p.renderBullet ? T += p.renderBullet.call(e, I, p.bulletClass) : T += `<${p.bulletElement} ${e.isElement?'part="bullet"':""} class="${p.bulletClass}"></${p.bulletElement}>`
        }
        p.type === "fraction" && (p.renderFraction ? T = p.renderFraction.call(e, p.currentClass, p.totalClass) : T = `<span class="${p.currentClass}"></span> / <span class="${p.totalClass}"></span>`), p.type === "progressbar" && (p.renderProgressbar ? T = p.renderProgressbar.call(e, p.progressbarFillClass) : T = `<span class="${p.progressbarFillClass}"></span>`), e.pagination.bullets = [], y.forEach(L => {
            p.type !== "custom" && te(L, T || ""), p.type === "bullets" && e.pagination.bullets.push(...L.querySelectorAll(U(p.bulletClass)))
        }), p.type !== "custom" && s("paginationRender", y[0])
    }

    function f() {
        e.params.pagination = le(e, e.originalParams.pagination, e.params.pagination, {
            el: "swiper-pagination"
        });
        let p = e.params.pagination;
        if (!p.el) return;
        let m;
        typeof p.el == "string" && e.isElement && (m = e.el.querySelector(p.el)), !m && typeof p.el == "string" && (m = [...document.querySelectorAll(p.el)]), m || (m = p.el), !(!m || m.length === 0) && (e.params.uniqueNavElements && typeof p.el == "string" && Array.isArray(m) && m.length > 1 && (m = [...e.el.querySelectorAll(p.el)], m.length > 1 && (m = m.find(y => ee(y, ".swiper")[0] === e.el))), Array.isArray(m) && m.length === 1 && (m = m[0]), Object.assign(e.pagination, {
            el: m
        }), m = V(m), m.forEach(y => {
            p.type === "bullets" && p.clickable && y.classList.add(...(p.clickableClass || "").split(" ")), y.classList.add(p.modifierClass + p.type), y.classList.add(e.isHorizontal() ? p.horizontalClass : p.verticalClass), p.type === "bullets" && p.dynamicBullets && (y.classList.add(`${p.modifierClass}${p.type}-dynamic`), o = 0, p.dynamicMainBullets < 1 && (p.dynamicMainBullets = 1)), p.type === "progressbar" && p.progressbarOpposite && y.classList.add(p.progressbarOppositeClass), p.clickable && y.addEventListener("click", u), e.enabled || y.classList.add(p.lockClass)
        }))
    }

    function h() {
        let p = e.params.pagination;
        if (l()) return;
        let m = e.pagination.el;
        m && (m = V(m), m.forEach(y => {
            y.classList.remove(p.hiddenClass), y.classList.remove(p.modifierClass + p.type), y.classList.remove(e.isHorizontal() ? p.horizontalClass : p.verticalClass), p.clickable && (y.classList.remove(...(p.clickableClass || "").split(" ")), y.removeEventListener("click", u))
        })), e.pagination.bullets && e.pagination.bullets.forEach(y => y.classList.remove(...p.bulletActiveClass.split(" ")))
    }
    t("changeDirection", () => {
        if (!e.pagination || !e.pagination.el) return;
        let p = e.params.pagination,
            {
                el: m
            } = e.pagination;
        m = V(m), m.forEach(y => {
            y.classList.remove(p.horizontalClass, p.verticalClass), y.classList.add(e.isHorizontal() ? p.horizontalClass : p.verticalClass)
        })
    }), t("init", () => {
        e.params.pagination.enabled === !1 ? S() : (f(), v(), d())
    }), t("activeIndexChange", () => {
        typeof e.snapIndex > "u" && d()
    }), t("snapIndexChange", () => {
        d()
    }), t("snapGridLengthChange", () => {
        v(), d()
    }), t("destroy", () => {
        h()
    }), t("enable disable", () => {
        let {
            el: p
        } = e.pagination;
        p && (p = V(p), p.forEach(m => m.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)))
    }), t("lock unlock", () => {
        d()
    }), t("click", (p, m) => {
        let y = m.target,
            T = V(e.pagination.el);
        if (e.params.pagination.el && e.params.pagination.hideOnClick && T && T.length > 0 && !y.classList.contains(e.params.pagination.bulletClass)) {
            if (e.navigation && (e.navigation.nextEl && y === e.navigation.nextEl || e.navigation.prevEl && y === e.navigation.prevEl)) return;
            let L = T[0].classList.contains(e.params.pagination.hiddenClass);
            s(L === !0 ? "paginationShow" : "paginationHide"), T.forEach(I => I.classList.toggle(e.params.pagination.hiddenClass))
        }
    });
    let g = () => {
            e.el.classList.remove(e.params.pagination.paginationDisabledClass);
            let {
                el: p
            } = e.pagination;
            p && (p = V(p), p.forEach(m => m.classList.remove(e.params.pagination.paginationDisabledClass))), f(), v(), d()
        },
        S = () => {
            e.el.classList.add(e.params.pagination.paginationDisabledClass);
            let {
                el: p
            } = e.pagination;
            p && (p = V(p), p.forEach(m => m.classList.add(e.params.pagination.paginationDisabledClass))), h()
        };
    Object.assign(e.pagination, {
        enable: g,
        disable: S,
        render: v,
        update: d,
        init: f,
        destroy: h
    })
}

function ia({
    swiper: e,
    extendParams: a,
    on: t,
    emit: s
}) {
    let i = B(),
        n = !1,
        o = null,
        l = null,
        r, c, u, d;
    a({
        scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
            scrollbarDisabledClass: "swiper-scrollbar-disabled",
            horizontalClass: "swiper-scrollbar-horizontal",
            verticalClass: "swiper-scrollbar-vertical"
        }
    }), e.scrollbar = {
        el: null,
        dragEl: null
    };

    function v() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        let {
            scrollbar: b,
            rtlTranslate: x
        } = e, {
            dragEl: M,
            el: P
        } = b, D = e.params.scrollbar, G = e.params.loop ? e.progressLoop : e.progress, $ = c, A = (u - c) * G;
        x ? (A = -A, A > 0 ? ($ = c - A, A = 0) : -A + c > u && ($ = u + A)) : A < 0 ? ($ = c + A, A = 0) : A + c > u && ($ = u - A), e.isHorizontal() ? (M.style.transform = `translate3d(${A}px, 0, 0)`, M.style.width = `${$}px`) : (M.style.transform = `translate3d(0px, ${A}px, 0)`, M.style.height = `${$}px`), D.hide && (clearTimeout(o), P.style.opacity = 1, o = setTimeout(() => {
            P.style.opacity = 0, P.style.transitionDuration = "400ms"
        }, 1e3))
    }

    function f(b) {
        !e.params.scrollbar.el || !e.scrollbar.el || (e.scrollbar.dragEl.style.transitionDuration = `${b}ms`)
    }

    function h() {
        if (!e.params.scrollbar.el || !e.scrollbar.el) return;
        let {
            scrollbar: b
        } = e, {
            dragEl: x,
            el: M
        } = b;
        x.style.width = "", x.style.height = "", u = e.isHorizontal() ? M.offsetWidth : M.offsetHeight, d = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), e.params.scrollbar.dragSize === "auto" ? c = u * d : c = parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? x.style.width = `${c}px` : x.style.height = `${c}px`, d >= 1 ? M.style.display = "none" : M.style.display = "", e.params.scrollbar.hide && (M.style.opacity = 0), e.params.watchOverflow && e.enabled && b.el.classList[e.isLocked ? "add" : "remove"](e.params.scrollbar.lockClass)
    }

    function g(b) {
        return e.isHorizontal() ? b.clientX : b.clientY
    }

    function S(b) {
        let {
            scrollbar: x,
            rtlTranslate: M
        } = e, {
            el: P
        } = x, D;
        D = (g(b) - de(P)[e.isHorizontal() ? "left" : "top"] - (r !== null ? r : c / 2)) / (u - c), D = Math.max(Math.min(D, 1), 0), M && (D = 1 - D);
        let G = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * D;
        e.updateProgress(G), e.setTranslate(G), e.updateActiveIndex(), e.updateSlidesClasses()
    }

    function p(b) {
        let x = e.params.scrollbar,
            {
                scrollbar: M,
                wrapperEl: P
            } = e,
            {
                el: D,
                dragEl: G
            } = M;
        n = !0, r = b.target === G ? g(b) - b.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, b.preventDefault(), b.stopPropagation(), P.style.transitionDuration = "100ms", G.style.transitionDuration = "100ms", S(b), clearTimeout(l), D.style.transitionDuration = "0ms", x.hide && (D.style.opacity = 1), e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"), s("scrollbarDragStart", b)
    }

    function m(b) {
        let {
            scrollbar: x,
            wrapperEl: M
        } = e, {
            el: P,
            dragEl: D
        } = x;
        n && (b.preventDefault && b.cancelable ? b.preventDefault() : b.returnValue = !1, S(b), M.style.transitionDuration = "0ms", P.style.transitionDuration = "0ms", D.style.transitionDuration = "0ms", s("scrollbarDragMove", b))
    }

    function y(b) {
        let x = e.params.scrollbar,
            {
                scrollbar: M,
                wrapperEl: P
            } = e,
            {
                el: D
            } = M;
        n && (n = !1, e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "", P.style.transitionDuration = ""), x.hide && (clearTimeout(l), l = q(() => {
            D.style.opacity = 0, D.style.transitionDuration = "400ms"
        }, 1e3)), s("scrollbarDragEnd", b), x.snapOnRelease && e.slideToClosest())
    }

    function T(b) {
        let {
            scrollbar: x,
            params: M
        } = e, P = x.el;
        if (!P) return;
        let D = P,
            G = M.passiveListeners ? {
                passive: !1,
                capture: !1
            } : !1,
            $ = M.passiveListeners ? {
                passive: !0,
                capture: !1
            } : !1;
        if (!D) return;
        let A = b === "on" ? "addEventListener" : "removeEventListener";
        D[A]("pointerdown", p, G), i[A]("pointermove", m, G), i[A]("pointerup", y, $)
    }

    function L() {
        !e.params.scrollbar.el || !e.scrollbar.el || T("on")
    }

    function I() {
        !e.params.scrollbar.el || !e.scrollbar.el || T("off")
    }

    function z() {
        let {
            scrollbar: b,
            el: x
        } = e;
        e.params.scrollbar = le(e, e.originalParams.scrollbar, e.params.scrollbar, {
            el: "swiper-scrollbar"
        });
        let M = e.params.scrollbar;
        if (!M.el) return;
        let P;
        if (typeof M.el == "string" && e.isElement && (P = e.el.querySelector(M.el)), !P && typeof M.el == "string") {
            if (P = i.querySelectorAll(M.el), !P.length) return
        } else P || (P = M.el);
        e.params.uniqueNavElements && typeof M.el == "string" && P.length > 1 && x.querySelectorAll(M.el).length === 1 && (P = x.querySelector(M.el)), P.length > 0 && (P = P[0]), P.classList.add(e.isHorizontal() ? M.horizontalClass : M.verticalClass);
        let D;
        P && (D = P.querySelector(U(e.params.scrollbar.dragClass)), D || (D = Y("div", e.params.scrollbar.dragClass), P.append(D))), Object.assign(b, {
            el: P,
            dragEl: D
        }), M.draggable && L(), P && P.classList[e.enabled ? "remove" : "add"](...j(e.params.scrollbar.lockClass))
    }

    function E() {
        let b = e.params.scrollbar,
            x = e.scrollbar.el;
        x && x.classList.remove(...j(e.isHorizontal() ? b.horizontalClass : b.verticalClass)), I()
    }
    t("changeDirection", () => {
        if (!e.scrollbar || !e.scrollbar.el) return;
        let b = e.params.scrollbar,
            {
                el: x
            } = e.scrollbar;
        x = V(x), x.forEach(M => {
            M.classList.remove(b.horizontalClass, b.verticalClass), M.classList.add(e.isHorizontal() ? b.horizontalClass : b.verticalClass)
        })
    }), t("init", () => {
        e.params.scrollbar.enabled === !1 ? C() : (z(), h(), v())
    }), t("update resize observerUpdate lock unlock changeDirection", () => {
        h()
    }), t("setTranslate", () => {
        v()
    }), t("setTransition", (b, x) => {
        f(x)
    }), t("enable disable", () => {
        let {
            el: b
        } = e.scrollbar;
        b && b.classList[e.enabled ? "remove" : "add"](...j(e.params.scrollbar.lockClass))
    }), t("destroy", () => {
        E()
    });
    let O = () => {
            e.el.classList.remove(...j(e.params.scrollbar.scrollbarDisabledClass)), e.scrollbar.el && e.scrollbar.el.classList.remove(...j(e.params.scrollbar.scrollbarDisabledClass)), z(), h(), v()
        },
        C = () => {
            e.el.classList.add(...j(e.params.scrollbar.scrollbarDisabledClass)), e.scrollbar.el && e.scrollbar.el.classList.add(...j(e.params.scrollbar.scrollbarDisabledClass)), E()
        };
    Object.assign(e.scrollbar, {
        enable: O,
        disable: C,
        updateSize: h,
        setTranslate: v,
        init: z,
        destroy: E
    })
}

function ra({
    swiper: e,
    extendParams: a,
    on: t
}) {
    a({
        controller: {
            control: void 0,
            inverse: !1,
            by: "slide"
        }
    }), e.controller = {
        control: void 0
    };

    function s(r, c) {
        let u = (function() {
            let h, g, S;
            return (p, m) => {
                for (g = -1, h = p.length; h - g > 1;) S = h + g >> 1, p[S] <= m ? g = S : h = S;
                return h
            }
        })();
        this.x = r, this.y = c, this.lastIndex = r.length - 1;
        let d, v;
        return this.interpolate = function(h) {
            return h ? (v = u(this.x, h), d = v - 1, (h - this.x[d]) * (this.y[v] - this.y[d]) / (this.x[v] - this.x[d]) + this.y[d]) : 0
        }, this
    }

    function i(r) {
        e.controller.spline = e.params.loop ? new s(e.slidesGrid, r.slidesGrid) : new s(e.snapGrid, r.snapGrid)
    }

    function n(r, c) {
        let u = e.controller.control,
            d, v, f = e.constructor;

        function h(g) {
            if (g.destroyed) return;
            let S = e.rtlTranslate ? -e.translate : e.translate;
            e.params.controller.by === "slide" && (i(g), v = -e.controller.spline.interpolate(-S)), (!v || e.params.controller.by === "container") && (d = (g.maxTranslate() - g.minTranslate()) / (e.maxTranslate() - e.minTranslate()), (Number.isNaN(d) || !Number.isFinite(d)) && (d = 1), v = (S - e.minTranslate()) * d + g.minTranslate()), e.params.controller.inverse && (v = g.maxTranslate() - v), g.updateProgress(v), g.setTranslate(v, e), g.updateActiveIndex(), g.updateSlidesClasses()
        }
        if (Array.isArray(u))
            for (let g = 0; g < u.length; g += 1) u[g] !== c && u[g] instanceof f && h(u[g]);
        else u instanceof f && c !== u && h(u)
    }

    function o(r, c) {
        let u = e.constructor,
            d = e.controller.control,
            v;

        function f(h) {
            h.destroyed || (h.setTransition(r, e), r !== 0 && (h.transitionStart(), h.params.autoHeight && q(() => {
                h.updateAutoHeight()
            }), ce(h.wrapperEl, () => {
                d && h.transitionEnd()
            })))
        }
        if (Array.isArray(d))
            for (v = 0; v < d.length; v += 1) d[v] !== c && d[v] instanceof u && f(d[v]);
        else d instanceof u && c !== d && f(d)
    }

    function l() {
        e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
    }
    t("beforeInit", () => {
        if (typeof window < "u" && (typeof e.params.controller.control == "string" || e.params.controller.control instanceof HTMLElement)) {
            (typeof e.params.controller.control == "string" ? [...document.querySelectorAll(e.params.controller.control)] : [e.params.controller.control]).forEach(c => {
                if (e.controller.control || (e.controller.control = []), c && c.swiper) e.controller.control.push(c.swiper);
                else if (c) {
                    let u = `${e.params.eventsPrefix}init`,
                        d = v => {
                            e.controller.control.push(v.detail[0]), e.update(), c.removeEventListener(u, d)
                        };
                    c.addEventListener(u, d)
                }
            });
            return
        }
        e.controller.control = e.params.controller.control
    }), t("update", () => {
        l()
    }), t("resize", () => {
        l()
    }), t("observerUpdate", () => {
        l()
    }), t("setTranslate", (r, c, u) => {
        !e.controller.control || e.controller.control.destroyed || e.controller.setTranslate(c, u)
    }), t("setTransition", (r, c, u) => {
        !e.controller.control || e.controller.control.destroyed || e.controller.setTransition(c, u)
    }), Object.assign(e.controller, {
        setTranslate: n,
        setTransition: o
    })
}

function la({
    swiper: e,
    extendParams: a,
    on: t,
    emit: s,
    params: i
}) {
    e.autoplay = {
        running: !1,
        paused: !1,
        timeLeft: 0
    }, a({
        autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !1,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1
        }
    });
    let n, o, l = i && i.autoplay ? i.autoplay.delay : 3e3,
        r = i && i.autoplay ? i.autoplay.delay : 3e3,
        c, u = new Date().getTime(),
        d, v, f, h, g, S;

    function p($) {
        !e || e.destroyed || !e.wrapperEl || $.target === e.wrapperEl && (e.wrapperEl.removeEventListener("transitionend", p), !(S || $.detail && $.detail.bySwiperTouchMove) && O())
    }
    let m = () => {
            if (e.destroyed || !e.autoplay.running) return;
            e.autoplay.paused ? d = !0 : d && (r = c, d = !1);
            let $ = e.autoplay.paused ? c : u + r - new Date().getTime();
            e.autoplay.timeLeft = $, s("autoplayTimeLeft", $, $ / l), o = requestAnimationFrame(() => {
                m()
            })
        },
        y = () => {
            let $;
            return e.virtual && e.params.virtual.enabled ? $ = e.slides.find(k => k.classList.contains("swiper-slide-active")) : $ = e.slides[e.activeIndex], $ ? parseInt($.getAttribute("data-swiper-autoplay"), 10) : void 0
        },
        T = () => {
            let $ = e.params.autoplay.delay,
                A = y();
            return !Number.isNaN(A) && A > 0 && ($ = A), $
        },
        L = $ => {
            if (e.destroyed || !e.autoplay.running) return;
            cancelAnimationFrame(o), m();
            let A = $;
            typeof A > "u" && (A = T(), l = A, r = A), c = A;
            let k = e.params.speed,
                X = () => {
                    !e || e.destroyed || (e.params.autoplay.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev(k, !0, !0), s("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(e.slides.length - 1, k, !0, !0), s("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext(k, !0, !0), s("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(0, k, !0, !0), s("autoplay")), e.params.cssMode && (u = new Date().getTime(), requestAnimationFrame(() => {
                        L()
                    })))
                };
            return A > 0 ? (clearTimeout(n), n = setTimeout(() => {
                X()
            }, A)) : requestAnimationFrame(() => {
                X()
            }), A
        },
        I = () => {
            u = new Date().getTime(), e.autoplay.running = !0, L(), s("autoplayStart")
        },
        z = () => {
            e.autoplay.running = !1, clearTimeout(n), cancelAnimationFrame(o), s("autoplayStop")
        },
        E = ($, A) => {
            if (e.destroyed || !e.autoplay.running) return;
            clearTimeout(n), $ || (g = !0);
            let k = () => {
                s("autoplayPause"), e.params.autoplay.waitForTransition ? e.wrapperEl.addEventListener("transitionend", p) : O()
            };
            if (e.autoplay.paused = !0, A) {
                k();
                return
            }
            c = (c || e.params.autoplay.delay) - (new Date().getTime() - u), !(e.isEnd && c < 0 && !e.params.loop) && (c < 0 && (c = 0), k())
        },
        O = () => {
            e.isEnd && c < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (u = new Date().getTime(), g ? (g = !1, L(c)) : L(), e.autoplay.paused = !1, s("autoplayResume"))
        },
        C = () => {
            if (e.destroyed || !e.autoplay.running) return;
            let $ = B();
            $.visibilityState === "hidden" && (g = !0, E(!0)), $.visibilityState === "visible" && O()
        },
        b = $ => {
            $.pointerType === "mouse" && (g = !0, S = !0, !(e.animating || e.autoplay.paused) && E(!0))
        },
        x = $ => {
            $.pointerType === "mouse" && (S = !1, e.autoplay.paused && O())
        },
        M = () => {
            e.params.autoplay.pauseOnMouseEnter && (e.el.addEventListener("pointerenter", b), e.el.addEventListener("pointerleave", x))
        },
        P = () => {
            e.el && typeof e.el != "string" && (e.el.removeEventListener("pointerenter", b), e.el.removeEventListener("pointerleave", x))
        },
        D = () => {
            B().addEventListener("visibilitychange", C)
        },
        G = () => {
            B().removeEventListener("visibilitychange", C)
        };
    t("init", () => {
        e.params.autoplay.enabled && (M(), D(), I())
    }), t("destroy", () => {
        P(), G(), e.autoplay.running && z()
    }), t("_freeModeStaticRelease", () => {
        (f || g) && O()
    }), t("_freeModeNoMomentumRelease", () => {
        e.params.autoplay.disableOnInteraction ? z() : E(!0, !0)
    }), t("beforeTransitionStart", ($, A, k) => {
        e.destroyed || !e.autoplay.running || (k || !e.params.autoplay.disableOnInteraction ? E(!0, !0) : z())
    }), t("sliderFirstMove", () => {
        if (!(e.destroyed || !e.autoplay.running)) {
            if (e.params.autoplay.disableOnInteraction) {
                z();
                return
            }
            v = !0, f = !1, g = !1, h = setTimeout(() => {
                g = !0, f = !0, E(!0)
            }, 200)
        }
    }), t("touchEnd", () => {
        if (!(e.destroyed || !e.autoplay.running || !v)) {
            if (clearTimeout(h), clearTimeout(n), e.params.autoplay.disableOnInteraction) {
                f = !1, v = !1;
                return
            }
            f && e.params.cssMode && O(), f = !1, v = !1
        }
    }), t("slideChange", () => {
        e.destroyed || !e.autoplay.running || e.autoplay.paused && (c = T(), l = T())
    }), Object.assign(e.autoplay, {
        start: I,
        stop: z,
        pause: E,
        resume: O
    })
}

function oa({
    swiper: e,
    extendParams: a,
    on: t
}) {
    a({
        thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs"
        }
    });
    let s = !1,
        i = !1;
    e.thumbs = {
        swiper: null
    };

    function n() {
        let u = e.thumbs.swiper;
        return !u || u.destroyed ? !1 : u.params.virtual && u.params.virtual.enabled
    }

    function o() {
        let u = e.thumbs.swiper;
        if (!u || u.destroyed) return;
        let d = u.clickedIndex,
            v = u.clickedSlide;
        if (v && v.classList.contains(e.params.thumbs.slideThumbActiveClass) || typeof d > "u" || d === null) return;
        let f;
        u.params.loop ? f = parseInt(u.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : f = d, e.params.loop ? e.slideToLoop(f) : e.slideTo(f)
    }

    function l() {
        let {
            thumbs: u
        } = e.params;
        if (s) return !1;
        s = !0;
        let d = e.constructor;
        if (u.swiper instanceof d) {
            if (u.swiper.destroyed) return s = !1, !1;
            e.thumbs.swiper = u.swiper, Object.assign(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), Object.assign(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), e.thumbs.swiper.update()
        } else if (ie(u.swiper)) {
            let v = Object.assign({}, u.swiper);
            Object.assign(v, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }), e.thumbs.swiper = new d(v), i = !0
        }
        return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", o), n() && e.thumbs.swiper.on("virtualUpdate", () => {
            r(!1, {
                autoScroll: !1
            })
        }), !0
    }

    function r(u, d) {
        let v = e.thumbs.swiper;
        if (!v || v.destroyed) return;
        let f = 1,
            h = e.params.thumbs.slideThumbActiveClass;
        if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (f = e.params.slidesPerView), e.params.thumbs.multipleActiveThumbs || (f = 1), f = Math.floor(f), v.slides.forEach(g => g.classList.remove(h)), v.params.loop || n())
            for (let g = 0; g < f; g += 1) R(v.slidesEl, `[data-swiper-slide-index="${e.realIndex+g}"]`).forEach(S => {
                S.classList.add(h)
            });
        else
            for (let g = 0; g < f; g += 1) v.slides[e.realIndex + g] && v.slides[e.realIndex + g].classList.add(h);
        (d ? .autoScroll ? ? !0) && c(u ? 0 : void 0)
    }

    function c(u) {
        let d = e.thumbs.swiper;
        if (!d || d.destroyed) return;
        let v = d.params.slidesPerView === "auto" ? d.slidesPerViewDynamic() : d.params.slidesPerView,
            f = e.params.thumbs.autoScrollOffset,
            h = f && !d.params.loop;
        if (e.realIndex !== d.realIndex || h) {
            let g = d.activeIndex,
                S, p;
            if (d.params.loop) {
                let m = d.slides.find(y => y.getAttribute("data-swiper-slide-index") === `${e.realIndex}`);
                S = d.slides.indexOf(m), p = e.activeIndex > e.previousIndex ? "next" : "prev"
            } else S = e.realIndex, p = S > e.previousIndex ? "next" : "prev";
            h && (S += p === "next" ? f : -1 * f), d.visibleSlidesIndexes && d.visibleSlidesIndexes.indexOf(S) < 0 && (d.params.centeredSlides ? S > g ? S = S - Math.floor(v / 2) + 1 : S = S + Math.floor(v / 2) - 1 : S > g && d.params.slidesPerGroup, d.slideTo(S, u))
        }
    }
    t("beforeInit", () => {
        let {
            thumbs: u
        } = e.params;
        if (!(!u || !u.swiper))
            if (typeof u.swiper == "string" || u.swiper instanceof HTMLElement) {
                let d = B(),
                    v = () => {
                        let h = typeof u.swiper == "string" ? d.querySelector(u.swiper) : u.swiper;
                        if (h && h.swiper) u.swiper = h.swiper, l(), r(!0);
                        else if (h) {
                            let g = `${e.params.eventsPrefix}init`,
                                S = p => {
                                    u.swiper = p.detail[0], h.removeEventListener(g, S), l(), r(!0), u.swiper.update(), e.update()
                                };
                            h.addEventListener(g, S)
                        }
                        return h
                    },
                    f = () => {
                        if (e.destroyed) return;
                        v() || requestAnimationFrame(f)
                    };
                requestAnimationFrame(f)
            } else l(), r(!0)
    }), t("slideChange update resize observerUpdate", () => {
        r()
    }), t("setTransition", (u, d) => {
        let v = e.thumbs.swiper;
        !v || v.destroyed || v.setTransition(d)
    }), t("beforeDestroy", () => {
        let u = e.thumbs.swiper;
        !u || u.destroyed || i && u.destroy()
    }), Object.assign(e.thumbs, {
        init: l,
        update: r
    })
}

function _(e) {
    let {
        effect: a,
        swiper: t,
        on: s,
        setTranslate: i,
        setTransition: n,
        overwriteParams: o,
        perspective: l,
        recreateShadows: r,
        getEffectParams: c
    } = e;
    s("beforeInit", () => {
        if (t.params.effect !== a) return;
        t.classNames.push(`${t.params.containerModifierClass}${a}`), l && l() && t.classNames.push(`${t.params.containerModifierClass}3d`);
        let d = o ? o() : {};
        Object.assign(t.params, d), Object.assign(t.originalParams, d)
    }), s("setTranslate _virtualUpdated", () => {
        t.params.effect === a && i()
    }), s("setTransition", (d, v) => {
        t.params.effect === a && n(v)
    }), s("transitionEnd", () => {
        if (t.params.effect === a && r) {
            if (!c || !c().slideShadows) return;
            t.slides.forEach(d => {
                d.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(v => v.remove())
            }), r()
        }
    });
    let u;
    s("virtualUpdate", () => {
        t.params.effect === a && (t.slides.length || (u = !0), requestAnimationFrame(() => {
            u && t.slides && t.slides.length && (i(), u = !1)
        }))
    })
}

function K(e, a) {
    let t = N(a);
    return t !== a && (t.style.backfaceVisibility = "hidden", t.style["-webkit-backface-visibility"] = "hidden"), t
}

function ne({
    swiper: e,
    duration: a,
    transformElements: t,
    allSlides: s
}) {
    let {
        activeIndex: i
    } = e, n = o => o.parentElement ? o.parentElement : e.slides.find(r => r.shadowRoot && r.shadowRoot === o.parentNode);
    if (e.params.virtualTranslate && a !== 0) {
        let o = !1,
            l;
        s ? l = t : l = t.filter(r => {
            let c = r.classList.contains("swiper-slide-transform") ? n(r) : r;
            return e.getSlideIndex(c) === i
        }), l.forEach(r => {
            ce(r, () => {
                if (o || !e || e.destroyed) return;
                o = !0, e.animating = !1;
                let c = new window.CustomEvent("transitionend", {
                    bubbles: !0,
                    cancelable: !0
                });
                e.wrapperEl.dispatchEvent(c)
            })
        })
    }
}

function da({
    swiper: e,
    extendParams: a,
    on: t
}) {
    a({
        fadeEffect: {
            crossFade: !1
        }
    }), _({
        effect: "fade",
        swiper: e,
        on: t,
        setTranslate: () => {
            let {
                slides: n
            } = e, o = e.params.fadeEffect;
            for (let l = 0; l < n.length; l += 1) {
                let r = e.slides[l],
                    u = -r.swiperSlideOffset;
                e.params.virtualTranslate || (u -= e.translate);
                let d = 0;
                e.isHorizontal() || (d = u, u = 0);
                let v = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(r.progress), 0) : 1 + Math.min(Math.max(r.progress, -1), 0),
                    f = K(o, r);
                f.style.opacity = v, f.style.transform = `translate3d(${u}px, ${d}px, 0px)`
            }
        },
        setTransition: n => {
            let o = e.slides.map(l => N(l));
            o.forEach(l => {
                l.style.transitionDuration = `${n}ms`
            }), ne({
                swiper: e,
                duration: n,
                transformElements: o,
                allSlides: !0
            })
        },
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode
        })
    })
}

function ca({
    swiper: e,
    extendParams: a,
    on: t
}) {
    a({
        cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: .94
        }
    });
    let s = (l, r, c) => {
        let u = c ? l.querySelector(".swiper-slide-shadow-left") : l.querySelector(".swiper-slide-shadow-top"),
            d = c ? l.querySelector(".swiper-slide-shadow-right") : l.querySelector(".swiper-slide-shadow-bottom");
        u || (u = Y("div", `swiper-slide-shadow-cube swiper-slide-shadow-${c?"left":"top"}`.split(" ")), l.append(u)), d || (d = Y("div", `swiper-slide-shadow-cube swiper-slide-shadow-${c?"right":"bottom"}`.split(" ")), l.append(d)), u && (u.style.opacity = Math.max(-r, 0)), d && (d.style.opacity = Math.max(r, 0))
    };
    _({
        effect: "cube",
        swiper: e,
        on: t,
        setTranslate: () => {
            let {
                el: l,
                wrapperEl: r,
                slides: c,
                width: u,
                height: d,
                rtlTranslate: v,
                size: f,
                browser: h
            } = e, g = se(e), S = e.params.cubeEffect, p = e.isHorizontal(), m = e.virtual && e.params.virtual.enabled, y = 0, T;
            S.shadow && (p ? (T = e.wrapperEl.querySelector(".swiper-cube-shadow"), T || (T = Y("div", "swiper-cube-shadow"), e.wrapperEl.append(T)), T.style.height = `${u}px`) : (T = l.querySelector(".swiper-cube-shadow"), T || (T = Y("div", "swiper-cube-shadow"), l.append(T))));
            for (let I = 0; I < c.length; I += 1) {
                let z = c[I],
                    E = I;
                m && (E = parseInt(z.getAttribute("data-swiper-slide-index"), 10));
                let O = E * 90,
                    C = Math.floor(O / 360);
                v && (O = -O, C = Math.floor(-O / 360));
                let b = Math.max(Math.min(z.progress, 1), -1),
                    x = 0,
                    M = 0,
                    P = 0;
                E % 4 === 0 ? (x = -C * 4 * f, P = 0) : (E - 1) % 4 === 0 ? (x = 0, P = -C * 4 * f) : (E - 2) % 4 === 0 ? (x = f + C * 4 * f, P = f) : (E - 3) % 4 === 0 && (x = -f, P = 3 * f + f * 4 * C), v && (x = -x), p || (M = x, x = 0);
                let D = `rotateX(${g(p?0:-O)}deg) rotateY(${g(p?O:0)}deg) translate3d(${x}px, ${M}px, ${P}px)`;
                b <= 1 && b > -1 && (y = E * 90 + b * 90, v && (y = -E * 90 - b * 90)), z.style.transform = D, S.slideShadows && s(z, b, p)
            }
            if (r.style.transformOrigin = `50% 50% -${f/2}px`, r.style["-webkit-transform-origin"] = `50% 50% -${f/2}px`, S.shadow)
                if (p) T.style.transform = `translate3d(0px, ${u/2+S.shadowOffset}px, ${-u/2}px) rotateX(89.99deg) rotateZ(0deg) scale(${S.shadowScale})`;
                else {
                    let I = Math.abs(y) - Math.floor(Math.abs(y) / 90) * 90,
                        z = 1.5 - (Math.sin(I * 2 * Math.PI / 360) / 2 + Math.cos(I * 2 * Math.PI / 360) / 2),
                        E = S.shadowScale,
                        O = S.shadowScale / z,
                        C = S.shadowOffset;
                    T.style.transform = `scale3d(${E}, 1, ${O}) translate3d(0px, ${d/2+C}px, ${-d/2/O}px) rotateX(-89.99deg)`
                }
            let L = (h.isSafari || h.isWebView) && h.needPerspectiveFix ? -f / 2 : 0;
            r.style.transform = `translate3d(0px,0,${L}px) rotateX(${g(e.isHorizontal()?0:y)}deg) rotateY(${g(e.isHorizontal()?-y:0)}deg)`, r.style.setProperty("--swiper-cube-translate-z", `${L}px`)
        },
        setTransition: l => {
            let {
                el: r,
                slides: c
            } = e;
            if (c.forEach(u => {
                    u.style.transitionDuration = `${l}ms`, u.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(d => {
                        d.style.transitionDuration = `${l}ms`
                    })
                }), e.params.cubeEffect.shadow && !e.isHorizontal()) {
                let u = r.querySelector(".swiper-cube-shadow");
                u && (u.style.transitionDuration = `${l}ms`)
            }
        },
        recreateShadows: () => {
            let l = e.isHorizontal();
            e.slides.forEach(r => {
                let c = Math.max(Math.min(r.progress, 1), -1);
                s(r, c, l)
            })
        },
        getEffectParams: () => e.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0
        })
    })
}

function Z(e, a, t) {
    let s = `swiper-slide-shadow${t?`-${t}`:""}${e?` swiper-slide-shadow-${e}`:""}`,
        i = N(a),
        n = i.querySelector(`.${s.split(" ").join(".")}`);
    return n || (n = Y("div", s.split(" ")), i.append(n)), n
}

function fa({
    swiper: e,
    extendParams: a,
    on: t
}) {
    a({
        flipEffect: {
            slideShadows: !0,
            limitRotation: !0
        }
    });
    let s = (l, r) => {
        let c = e.isHorizontal() ? l.querySelector(".swiper-slide-shadow-left") : l.querySelector(".swiper-slide-shadow-top"),
            u = e.isHorizontal() ? l.querySelector(".swiper-slide-shadow-right") : l.querySelector(".swiper-slide-shadow-bottom");
        c || (c = Z("flip", l, e.isHorizontal() ? "left" : "top")), u || (u = Z("flip", l, e.isHorizontal() ? "right" : "bottom")), c && (c.style.opacity = Math.max(-r, 0)), u && (u.style.opacity = Math.max(r, 0))
    };
    _({
        effect: "flip",
        swiper: e,
        on: t,
        setTranslate: () => {
            let {
                slides: l,
                rtlTranslate: r
            } = e, c = e.params.flipEffect, u = se(e);
            for (let d = 0; d < l.length; d += 1) {
                let v = l[d],
                    f = v.progress;
                e.params.flipEffect.limitRotation && (f = Math.max(Math.min(v.progress, 1), -1));
                let h = v.swiperSlideOffset,
                    S = -180 * f,
                    p = 0,
                    m = e.params.cssMode ? -h - e.translate : -h,
                    y = 0;
                e.isHorizontal() ? r && (S = -S) : (y = m, m = 0, p = -S, S = 0), v.style.zIndex = -Math.abs(Math.round(f)) + l.length, c.slideShadows && s(v, f);
                let T = `translate3d(${m}px, ${y}px, 0px) rotateX(${u(p)}deg) rotateY(${u(S)}deg)`,
                    L = K(c, v);
                L.style.transform = T
            }
        },
        setTransition: l => {
            let r = e.slides.map(c => N(c));
            r.forEach(c => {
                c.style.transitionDuration = `${l}ms`, c.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(u => {
                    u.style.transitionDuration = `${l}ms`
                })
            }), ne({
                swiper: e,
                duration: l,
                transformElements: r
            })
        },
        recreateShadows: () => {
            e.params.flipEffect, e.slides.forEach(l => {
                let r = l.progress;
                e.params.flipEffect.limitRotation && (r = Math.max(Math.min(l.progress, 1), -1)), s(l, r)
            })
        },
        getEffectParams: () => e.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode
        })
    })
}

function ua({
    swiper: e,
    extendParams: a,
    on: t
}) {
    a({
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: !0
        }
    }), _({
        effect: "coverflow",
        swiper: e,
        on: t,
        setTranslate: () => {
            let {
                width: n,
                height: o,
                slides: l,
                slidesSizesGrid: r
            } = e, c = e.params.coverflowEffect, u = e.isHorizontal(), d = e.translate, v = u ? -d + n / 2 : -d + o / 2, f = u ? c.rotate : -c.rotate, h = c.depth, g = se(e);
            for (let S = 0, p = l.length; S < p; S += 1) {
                let m = l[S],
                    y = r[S],
                    T = m.swiperSlideOffset,
                    L = (v - T - y / 2) / y,
                    I = typeof c.modifier == "function" ? c.modifier(L) : L * c.modifier,
                    z = u ? f * I : 0,
                    E = u ? 0 : f * I,
                    O = -h * Math.abs(I),
                    C = c.stretch;
                typeof C == "string" && C.indexOf("%") !== -1 && (C = parseFloat(c.stretch) / 100 * y);
                let b = u ? 0 : C * I,
                    x = u ? C * I : 0,
                    M = 1 - (1 - c.scale) * Math.abs(I);
                Math.abs(x) < .001 && (x = 0), Math.abs(b) < .001 && (b = 0), Math.abs(O) < .001 && (O = 0), Math.abs(z) < .001 && (z = 0), Math.abs(E) < .001 && (E = 0), Math.abs(M) < .001 && (M = 0);
                let P = `translate3d(${x}px,${b}px,${O}px)  rotateX(${g(E)}deg) rotateY(${g(z)}deg) scale(${M})`,
                    D = K(c, m);
                if (D.style.transform = P, m.style.zIndex = -Math.abs(Math.round(I)) + 1, c.slideShadows) {
                    let G = u ? m.querySelector(".swiper-slide-shadow-left") : m.querySelector(".swiper-slide-shadow-top"),
                        $ = u ? m.querySelector(".swiper-slide-shadow-right") : m.querySelector(".swiper-slide-shadow-bottom");
                    G || (G = Z("coverflow", m, u ? "left" : "top")), $ || ($ = Z("coverflow", m, u ? "right" : "bottom")), G && (G.style.opacity = I > 0 ? I : 0), $ && ($.style.opacity = -I > 0 ? -I : 0)
                }
            }
        },
        setTransition: n => {
            e.slides.map(l => N(l)).forEach(l => {
                l.style.transitionDuration = `${n}ms`, l.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(r => {
                    r.style.transitionDuration = `${n}ms`
                })
            })
        },
        perspective: () => !0,
        overwriteParams: () => ({
            watchSlidesProgress: !0
        })
    })
}

function ma({
    swiper: e,
    extendParams: a,
    on: t
}) {
    a({
        cardsEffect: {
            slideShadows: !0,
            rotate: !0,
            perSlideRotate: 2,
            perSlideOffset: 8
        }
    }), _({
        effect: "cards",
        swiper: e,
        on: t,
        setTranslate: () => {
            let {
                slides: n,
                activeIndex: o,
                rtlTranslate: l
            } = e, r = e.params.cardsEffect, {
                startTranslate: c,
                isTouched: u
            } = e.touchEventsData, d = l ? -e.translate : e.translate;
            for (let v = 0; v < n.length; v += 1) {
                let f = n[v],
                    h = f.progress,
                    g = Math.min(Math.max(h, -4), 4),
                    S = f.swiperSlideOffset;
                e.params.centeredSlides && !e.params.cssMode && (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`), e.params.centeredSlides && e.params.cssMode && (S -= n[0].swiperSlideOffset);
                let p = e.params.cssMode ? -S - e.translate : -S,
                    m = 0,
                    y = -100 * Math.abs(g),
                    T = 1,
                    L = -r.perSlideRotate * g,
                    I = r.perSlideOffset - Math.abs(g) * .75,
                    z = e.virtual && e.params.virtual.enabled ? e.virtual.from + v : v,
                    E = (z === o || z === o - 1) && g > 0 && g < 1 && (u || e.params.cssMode) && d < c,
                    O = (z === o || z === o + 1) && g < 0 && g > -1 && (u || e.params.cssMode) && d > c;
                if (E || O) {
                    let M = (1 - Math.abs((Math.abs(g) - .5) / .5)) ** .5;
                    L += -28 * g * M, T += -.5 * M, I += 96 * M, m = `${(r.rotate||e.isHorizontal()?-25:0)*M*Math.abs(g)}%`
                }
                if (g < 0 ? p = `calc(${p}px ${l?"-":"+"} (${I*Math.abs(g)}%))` : g > 0 ? p = `calc(${p}px ${l?"-":"+"} (-${I*Math.abs(g)}%))` : p = `${p}px`, !e.isHorizontal()) {
                    let M = m;
                    m = p, p = M
                }
                let C = g < 0 ? `${1+(1-T)*g}` : `${1-(1-T)*g}`,
                    b = `
        translate3d(${p}, ${m}, ${y}px)
        rotateZ(${r.rotate?l?-L:L:0}deg)
        scale(${C})
      `;
                if (r.slideShadows) {
                    let M = f.querySelector(".swiper-slide-shadow");
                    M || (M = Z("cards", f)), M && (M.style.opacity = Math.min(Math.max((Math.abs(g) - .5) / .5, 0), 1))
                }
                f.style.zIndex = -Math.abs(Math.round(h)) + n.length;
                let x = K(r, f);
                x.style.transform = b
            }
        },
        setTransition: n => {
            let o = e.slides.map(l => N(l));
            o.forEach(l => {
                l.style.transitionDuration = `${n}ms`, l.querySelectorAll(".swiper-slide-shadow").forEach(r => {
                    r.style.transitionDuration = `${n}ms`
                })
            }), ne({
                swiper: e,
                duration: n,
                transformElements: o
            })
        },
        perspective: () => !0,
        overwriteParams: () => ({
            _loopSwapReset: !1,
            watchSlidesProgress: !0,
            loopAdditionalSlides: e.params.cardsEffect.rotate ? 3 : 2,
            centeredSlides: !0,
            virtualTranslate: !e.params.cssMode
        })
    })
}
export {
    re as a, ta as b, aa as c, sa as d, na as e, ia as f, ra as g, la as h, oa as i, da as j, ca as k, fa as l, ua as m, ma as n
};