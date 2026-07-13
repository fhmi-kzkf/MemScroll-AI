import {
    a as Y
} from "./chunk-4QVIEXA2.js";
import {
    a as I
} from "./chunk-M65MOCFB.js";
import {
    ea as B,
    g as E,
    ga as y,
    ia as M,
    ma as Q,
    qa as X,
    ra as j,
    t as _,
    ua as J,
    va as T
} from "./chunk-JYJWMUBN.js";
import "./chunk-5WLRVGM2.js";
var k = "0.2.34";
var f = "fs-marquee-itemid",
    g = "fs-marquee-itemclone",
    O = "fs-marquee-templatecloneref",
    D = ["marquee", "list", "item", "wrapper"],
    $ = {
        speed: {
            key: "speed"
        },
        gap: {
            key: "gap"
        },
        direction: {
            key: "direction",
            values: {
                ttb: "ttb",
                btt: "btt",
                rtl: "rtl",
                ltr: "ltr"
            }
        },
        pauseonhover: {
            key: "pauseonhover"
        },
        spacebetween: {
            key: "spacebetween"
        },
        source: {
            key: "source",
            values: {
                cms: "cms",
                static: "static"
            }
        }
    };
var C = n => {
        let e = window.innerWidth,
            t = Object.entries(n).map(([l, a]) => ({
                width: parseInt(l),
                duration: a
            })).sort((l, a) => a.width - l.width),
            i = t.find(l => e >= l.width);
        i || (i = t.reduce((l, a) => a.width < l.width ? a : l, t[0]));
        let s = i ? i.duration : n[991] ? ? "100";
        return M(s, 0) / 100
    },
    Z = (n, e = 0, t = "false") => {
        if (e > 0 && t === "true") {
            let i = e / 1e3;
            Y(n, {
                opacity: [0, 1]
            }, {
                duration: i,
                easing: "linear"
            });
            return
        }
        n.style.opacity = "1"
    };
var {
    getAttribute: Ee,
    getInstance: q,
    queryElement: b,
    queryAllElements: d,
    getElementSelector: ye
} = Q(_, D, $);
var re = E("marquee"),
    K = (n, e) => {
        let t = window.getComputedStyle(n),
            i = t.getPropertyValue(e).trim();
        if (!i || i === "normal") return 0;
        let s = i.match(/^([\d.]+)([a-z%]*)$/);
        if (!s) return 0;
        let [r, o, l] = s, a = parseFloat(o);
        if (Number.isNaN(a)) return 0;
        switch (l) {
            case "px":
                return a;
            case "%":
                {
                    let h = e === "column-gap" ? n.clientWidth : n.clientHeight;
                    return a / 100 * h
                }
            case "em":
                {
                    let c = parseFloat(t.fontSize);
                    return a * c
                }
            case "rem":
                {
                    let c = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
                    return a * c
                }
            case "vw":
                return a / 100 * window.innerWidth;
            case "vh":
                return a / 100 * window.innerHeight;
            case "svw":
                return a / 100 * (window ? .visualViewport ? .width || window.innerWidth);
            case "svh":
                return a / 100 * (window ? .visualViewport ? .height || window.innerHeight);
            case "ch":
                {
                    let c = parseFloat(t.fontSize);
                    return a * (c * .5)
                }
            default:
                return re.warn({}, `Finsweet Marquee - We detected an unsupported gap unit: ${l}. If your Marquee has an issue please contact Finsweet Support`), 0
        }
    };
var A = class {
    animationFrame = null;
    lastTimestamp = 0;
    isStoppingAnimation = !1;
    stopStartTime = 0;
    position;
    setSize;
    onUpdate;
    reverseDirection;
    speed;
    isStartingAnimation = !1;
    startTime = 0;
    easeDuration;
    constructor(e, t, i, s, r) {
        this.position = e, this.setSize = i, this.onUpdate = s, this.reverseDirection = t.direction === "rtl" || t.direction === "btt", this.speed = r, this.easeDuration = M(t.easeoutduration ? ? 0, 0)
    }
    updateSpeed(e) {
        this.speed = e
    }
    updateSetSize(e) {
        this.setSize = e
    }
    start() {
        this.isStoppingAnimation = !1, this.isStartingAnimation = !0, this.stopStartTime = 0, this.startTime = performance.now(), this.lastTimestamp = performance.now(), this.animationFrame || this.animate(this.lastTimestamp)
    }
    animate = e => {
        let t = this.lastTimestamp ? e - this.lastTimestamp : 16.67;
        this.lastTimestamp = e;
        let i = this.speed;
        if (this.easeDuration > 0) {
            if (this.isStartingAnimation) {
                let r = e - this.startTime,
                    o = Math.min(r / this.easeDuration, 1);
                i = this.speed * Math.pow(o, 3), o === 1 && (this.isStartingAnimation = !1)
            } else if (this.isStoppingAnimation) {
                let r = e - this.stopStartTime,
                    o = Math.min(r / this.easeDuration, 1);
                if (i = this.speed * (1 - Math.pow(o, 3)), o === 1) {
                    this.animationFrame && (cancelAnimationFrame(this.animationFrame), this.animationFrame = null);
                    return
                }
            }
        } else this.isStartingAnimation && (this.isStartingAnimation = !1);
        let s = i * (t / 16.67);
        this.updatePosition(s), this.animationFrame = requestAnimationFrame(this.animate)
    };
    updatePosition(e) {
        let t = this.position.value;
        this.reverseDirection ? (t += e, t >= this.setSize && (t -= this.setSize)) : (t -= e, Math.abs(t) >= this.setSize && (t += this.setSize)), this.position.value = t, this.onUpdate(this.position.value)
    }
    stop() {
        if (this.animationFrame && !this.isStoppingAnimation) {
            if (this.easeDuration <= 0) {
                cancelAnimationFrame(this.animationFrame), this.animationFrame = null;
                return
            }
            this.isStoppingAnimation = !0, this.stopStartTime = performance.now()
        }
    }
};
var L = class n {
    instance;
    items;
    instanceTemplate;
    resizeObserver;
    onDimensionsUpdate;
    isMeasuring = !1;
    measureScheduled = !1;
    measureRaf = null;
    imageListeners = new AbortController;
    lastSizes = new Map;
    measurementClone = null;
    measurementCloneRef = `measure-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    lastGap = null;
    onResize = () => this.scheduleMeasure();
    constructor(e, t, i) {
        this.instance = e, this.items = Array.from(t), this.onDimensionsUpdate = i, this.resizeObserver = T.getInstance(), this.items.forEach(s => n.forceEagerImages(s)), this.instanceTemplate = this.createCleanTemplate(), this.measure(), this.setupResizeObserver(), this.setupImageListeners()
    }
    static forceEagerImages(e) {
        e.querySelectorAll("img").forEach(t => {
            t.loading !== "eager" && (t.loading = "eager")
        })
    }
    createCleanTemplate() {
        let e = this.instance.cloneNode(!0);
        return e.querySelectorAll(`[${g}]`).forEach(t => t.remove()), d("item", {
            scope: e
        }).forEach(t => {
            t.style.removeProperty("width"), t.style.removeProperty("height"), t.style.removeProperty("flex")
        }), n.forceEagerImages(e), e
    }
    isVertical() {
        return this.instance.getAttribute("fs-marquee-vertical") === "true"
    }
    getTrackSize() {
        let e = this.isVertical(),
            t = b("wrapper", {
                scope: this.instance
            });
        if (t) {
            let s = e ? t.clientHeight : t.clientWidth;
            if (s > 0) return s
        }
        let i = this.instance.getBoundingClientRect();
        return e ? i.height : i.width
    }
    getMeasurementTarget() {
        return I(y) ? document.body.querySelector(".iframe-wrapper") : document.body
    }
    ensureMeasurementClone(e, t) {
        let i = this.getMeasurementTarget();
        return i ? (this.measurementClone || (this.measurementClone = this.instanceTemplate.cloneNode(!0), this.measurementClone.setAttribute(O, this.measurementCloneRef)), Object.assign(this.measurementClone.style, {
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            visibility: "hidden",
            pointerEvents: "none",
            width: e ? "auto" : `${t.width}px`,
            height: e ? `${t.height}px` : "auto"
        }), this.measurementClone.parentElement !== i && i.appendChild(this.measurementClone), this.measurementClone) : null
    }
    getItemsById() {
        let e = new Map;
        return this.instance.querySelectorAll(`[${f}]`).forEach(t => {
            if (!(t instanceof HTMLElement)) return;
            let i = t.getAttribute(f);
            if (!i) return;
            let s = e.get(i);
            s ? s.push(t) : e.set(i, [t])
        }), e
    }
    applyItemSizes(e, t) {
        for (let {
                itemId: i,
                width: s,
                height: r
            } of e) {
            let o = t.get(i);
            if (o)
                for (let l of o) l.style.flex = "0 0 auto", s > 0 && (l.style.width = `${s}px`), r > 0 && (l.style.height = `${r}px`)
        }
    }
    isActive() {
        return !this.imageListeners.signal.aborted && this.instance.isConnected
    }
    measure() {
        if (!this.isActive() || this.isMeasuring) return;
        let e = this.getTrackSize();
        if (e <= 0) return;
        this.isMeasuring = !0;
        let t = this.isVertical(),
            i = this.instance.getBoundingClientRect(),
            s = this.ensureMeasurementClone(t, i);
        if (!s) {
            this.isMeasuring = !1;
            return
        }
        let r = !1;
        try {
            let o = b("list", {
                    scope: s
                }),
                l = b("list", {
                    scope: this.instance
                });
            if (!o || !l) return;
            o.style[t ? "height" : "width"] = `${e}px`;
            let a = d("item", {
                    scope: o
                }).filter(u => !u.hasAttribute(g)),
                c = [];
            a.forEach((u, m) => {
                let p = this.items[m];
                if (!p) return;
                let S = p.getAttribute(f);
                if (!S) return;
                let x = u.getBoundingClientRect(),
                    G = p.getBoundingClientRect(),
                    F, P;
                t ? (P = x.height, F = Math.max(G.width, x.width)) : (F = x.width, P = Math.max(G.height, x.height)), c.push({
                    itemId: S,
                    width: F,
                    height: P
                })
            });
            for (let {
                    itemId: u,
                    width: m,
                    height: p
                } of c) {
                let S = this.lastSizes.get(u);
                (!S || Math.abs(S.width - m) > .5 || Math.abs(S.height - p) > .5) && (r = !0), this.lastSizes.set(u, {
                    width: m,
                    height: p
                })
            }
            this.applyItemSizes(c, this.getItemsById());
            let h = K(o, t ? "row-gap" : "column-gap");
            (this.lastGap === null || Math.abs(this.lastGap - h) > .5) && (r = !0, this.lastGap = h, l.style.gap = `${h}px`)
        } finally {
            this.isMeasuring = !1
        }
        r && this.onDimensionsUpdate ? .()
    }
    scheduleMeasure() {
        this.isActive() && (this.measureScheduled || (this.measureScheduled = !0, this.measureRaf = requestAnimationFrame(() => {
            this.measureRaf = null, this.measureScheduled = !1, this.measure()
        })))
    }
    setupResizeObserver() {
        this.resizeObserver.observe(this.instance, this.onResize)
    }
    setupImageListeners() {
        let e = t => {
            t.target ? .tagName === "IMG" && this.scheduleMeasure()
        };
        this.instance.addEventListener("load", e, {
            capture: !0,
            signal: this.imageListeners.signal
        }), this.instance.addEventListener("error", e, {
            capture: !0,
            signal: this.imageListeners.signal
        })
    }
    destroy() {
        this.imageListeners.abort(), this.measureRaf !== null && (cancelAnimationFrame(this.measureRaf), this.measureRaf = null), this.measureScheduled = !1, this.resizeObserver.unobserve(this.instance, this.onResize), this.measurementClone && (this.measurementClone.remove(), this.measurementClone = null), document.querySelectorAll(`[${O}="${this.measurementCloneRef}"]`).forEach(e => e.remove())
    }
};
var R = E("marquee"),
    H = null,
    V = null,
    v = new Set,
    ae = 50,
    N = new WeakSet,
    ee = n => !!n.querySelector("[data-w-id]"),
    oe = n => {
        V = B(["ix2"], n).catch(e => {
            R.error({}, "Failed to re-initialize Webflow IX2 after creating marquee clones", e)
        }).finally(() => {
            V = null, v.size > 0 && U()
        })
    },
    le = () => {
        if (H = null, V) return;
        for (let e of [...v]) document.contains(e) || v.delete(e);
        let n = null;
        for (let e of v)
            if (document.contains(e) && N.has(e) && ee(e)) {
                n = e;
                break
            }
        n && (v.clear(), oe(n))
    },
    U = () => {
        H && clearTimeout(H), H = setTimeout(le, ae)
    },
    ce = n => {
        typeof window > "u" || !window.Webflow || ee(n) && (v.add(n), U())
    },
    te = n => {
        N.add(n), v.size > 0 && !V && U()
    },
    he = n => {
        N.delete(n), v.delete(n)
    },
    z = class {
        items = [];
        listElement;
        instance;
        wrapper;
        settings;
        itemSizes = [];
        dimensionsHandler;
        instanceId;
        onDimensionsChanged;
        isStopped = !1;
        cloneSetCount = 0;
        isVerticalMarquee;
        lastAppliedTransform = null;
        constructor(e, t, i, s, r) {
            if (this.instance = e, this.wrapper = t, this.listElement = i, this.settings = s, this.instanceId = q(this.instance) || "", this.onDimensionsChanged = r, this.isVerticalMarquee = s.direction === "ttb" || s.direction === "btt", this.instance.setAttribute("role", "region"), this.instance.setAttribute("aria-label", "Scrolling marquee content"), !this.listElement) {
                R.error({}, "Marquee list element not found");
                return
            }
            this.setupContent()
        }
        updateWrapperDimensions = () => {
            if (this.isStopped) return;
            let e = this.isVertical(),
                t = this.getMaxItemDimension();
            if (t > 0) {
                let i = e ? "width" : "height";
                this.wrapper.style[i] = t + "px"
            }
        };
        getListGap() {
            let t = window.getComputedStyle(this.listElement).getPropertyValue("gap") || this.listElement.style.gap || "0",
                i = 0;
            try {
                i = J(t, this.listElement) || 0
            } catch (s) {
                R.error({}, "MARQUEE: Failed to convert gap value to pixels", s)
            }
            return i
        }
        setupContent() {
            this.items = d("item", {
                scope: this.listElement
            }).filter(a => !a.hasAttribute(g)), this.items.forEach((a, c) => {
                let h = `${this.instanceId}-${c}`;
                a.setAttribute(f, h)
            });
            let e = window.getComputedStyle(this.listElement),
                t = window.getComputedStyle(this.instance),
                i = e.getPropertyValue("display") || this.listElement.style.display,
                s = t.getPropertyValue("height"),
                r = parseInt(s);
            if ((!r || r === 0) && R.error({}, `Invalid height value for fs-marquee-instance="${this.instanceId}". If you are using Images ensure to set loading="eager" or set a specific height value to the image element.`), !/(flex|grid)/.test(i)) throw new Error(`Marquee list element must use either 'display: flex' or 'display: grid', ensure to set specific height value on the marquee instance element [fs-marquee-instance="${this.instanceId}"]`);
            let l = this.isVerticalMarquee;
            switch (this.instance.setAttribute("fs-marquee-vertical", l ? "true" : "false"), this.dimensionsHandler = new L(this.instance, this.items, () => {
                this.updateWrapperDimensions(), this.onDimensionsChanged()
            }), this.calculateItemSizes(), this.wrapper.style.overflow = "hidden", this.wrapper.style.flex = "auto", this.wrapper.style.position = "relative", this.updateWrapperDimensions(), this.listElement.style.cssText = `
  position: absolute;
  will-change: transform;
  transform: ${l?"translateY(0)":"translateX(0)"};
  ${l?"width: 100%;":"height: 100%;"}
  ${l?"left: 0;":"top: 0;"}
  flex-wrap: nowrap;
    `, this.settings.direction) {
                case "ltr":
                case "ttb":
                    this.listElement.style[l ? "top" : "left"] = "0";
                    break;
                case "rtl":
                case "btt":
                    {
                        let a = -this.getSetSize();this.listElement.style[l ? "top" : "left"] = `${a}px`;
                        break
                    }
            }
            Z(this.instance, M(this.settings ? .fadein, 0), this.settings ? .usefadein)
        }
        calculateItemSizes() {
            function e(o) {
                let l = o.getBoundingClientRect(),
                    a = window.getComputedStyle(o),
                    c = parseFloat(a.marginTop) || 0,
                    h = parseFloat(a.marginBottom) || 0,
                    u = parseFloat(a.marginLeft) || 0,
                    m = parseFloat(a.marginRight) || 0;
                return {
                    width: l.width + u + m,
                    height: l.height + c + h
                }
            }
            let t = this.isVertical(),
                i = this.getListGap(),
                s = this.items.map(o => {
                    let l = e(o);
                    return t ? l.height + i : l.width + i
                }, this),
                r = s.some(o => o === 0) ? this.itemSizes : s;
            this.itemSizes = r
        }
        getMaxItemDimension() {
            let e = this.isVertical(),
                t = Math.max(...this.items.map(r => {
                    let o = window.getComputedStyle(r);
                    return parseInt(e ? o.width : o.height)
                })),
                i = window.getComputedStyle(this.listElement),
                s = parseInt(e ? i.width : i.height);
            return Math.max(t, s)
        }
        getSetSize() {
            return this.itemSizes.reduce((e, t) => e + t, 0)
        }
        getViewportSize() {
            return {
                width: this.wrapper.clientWidth,
                height: this.wrapper.clientHeight
            }
        }
        updateListDimensions() {
            let e = this.getSetSize(),
                t = this.cloneSetCount,
                i = e * t,
                s = this.isVertical() ? "height" : "width";
            this.listElement.style[s] = `${i}px`
        }
        createClones() {
            this.calculateItemSizes();
            let e = this.getViewportSize(),
                t = this.getSetSize(),
                i = this.isVerticalMarquee,
                s = i ? e.height : e.width;
            if (s <= 1) {
                let a = this.instance.getBoundingClientRect(),
                    c = this.instance.parentElement ? .getBoundingClientRect(),
                    h = this.listElement.getBoundingClientRect(),
                    u = [i ? a.height : a.width, i ? c ? .height : c ? .width, i ? h.height : h.width, t].find(m => typeof m == "number" && m > 1) ? ? 0;
                u > 0 && (s = u, this.wrapper.style[i ? "height" : "width"] = `${u}px`)
            }
            s > 1 && (this.wrapper.style[i ? "height" : "width"] = `${s}px`);
            let r = Math.ceil((s + t) / t),
                o = Math.max(r, 2);
            if (o === 0 || o === 1 / 0) {
                console.error("Failed to construct Marquee clones because of invalid cloneSets", {
                    viewportDimension: s,
                    setSize: t,
                    minSets: r,
                    cloneSets: o,
                    instance: this.instance.attributes.getNamedItem("fs-marquee-instance") ? .value
                });
                return
            }
            if (this.cloneSetCount !== o) {
                let a = this.listElement.querySelectorAll(`[${g}]`),
                    c = document.createDocumentFragment();
                a.forEach(h => h.remove());
                for (let h = 0; h < o; h++) this.items.forEach(u => {
                    let m = u.cloneNode(!0);
                    m.setAttribute(g, "");
                    let p = u.getAttribute(f);
                    p && m.setAttribute(f, p), c.appendChild(m)
                });
                this.listElement.appendChild(c), this.cloneSetCount = o, ce(this.instance)
            }
            this.calculateItemSizes(), this.updateListDimensions()
        }
        applyTransform(e) {
            if (this.isStopped) return;
            let t = Math.round(e * 100) / 100,
                i = this.isVerticalMarquee ? `translate3d(0, ${t}px, 0)` : `translate3d(${t}px, 0, 0)`;
            i !== this.lastAppliedTransform && (this.lastAppliedTransform = i, this.listElement.style.transform = i)
        }
        isVertical() {
            return this.isVerticalMarquee
        }
        reset() {
            this.isStopped = !0, this.listElement.querySelectorAll(`[${g}]`).forEach(t => t.remove()), this.cloneSetCount = 0, this.itemSizes = [], this.lastAppliedTransform = null, this.dimensionsHandler && this.dimensionsHandler.destroy(), he(this.instance), this.listElement.removeAttribute("style"), this.listElement.style.cssText = ""
        }
        resume() {
            this.isStopped = !1
        }
    };
var ue = .5,
    W = class {
        content;
        animation = null;
        position = {
            value: 0
        };
        isPaused = !1;
        instance;
        listElement;
        wrapper;
        settings;
        resizeObserver;
        intersectionObserver = null;
        isInView = !0;
        isStopped = !1;
        isInitializing = !1;
        cloneUpdateRaf = null;
        speedCheckRaf = null;
        boundPause = () => this.pause();
        boundPlay = () => this.play();
        constructor(e, t, i, s) {
            this.instance = e, this.listElement = s, this.wrapper = i, this.settings = t;
            let {
                direction: r
            } = t;
            this.resizeObserver = T.getInstance(), this.isInitializing = !0, this.content = new z(this.instance, this.wrapper, this.listElement, this.settings, () => this.handleDimensionsChanged()), this.init(r, t), this.isInitializing = !1
        }
        handleDimensionsChanged() {
            this.isInitializing || this.isStopped || this.scheduleCloneRefresh()
        }
        scheduleCloneRefresh() {
            this.cloneUpdateRaf === null && (this.cloneUpdateRaf = requestAnimationFrame(() => {
                this.cloneUpdateRaf = null, this.content && !this.isStopped && this.refreshClones()
            }))
        }
        refreshClones() {
            let {
                direction: e
            } = this.settings, t = this.content.getSetSize();
            this.content.createClones();
            let i = this.content.getSetSize(),
                s = Math.abs(i - t) >= ue,
                r = C(this.settings.breakpoints);
            if (s) {
                this.animation ? .stop(), this.setupInitialPosition(e), this.setupAnimation(r);
                return
            }
            this.updateSpeedIfNeeded(r)
        }
        updateSpeedIfNeeded(e) {
            !this.animation || Math.abs(this.animation.speed - e) < 1e-4 || this.animation.updateSpeed(e)
        }
        init(e, t) {
            this.content.createClones();
            let i = C(t.breakpoints);
            this.setupInitialPosition(e), this.setupAnimation(i), this.setupEventListeners(t.pauseonhover === "true"), this.setupIntersectionObserver()
        }
        setupInitialPosition(e) {
            let t = this.content.getSetSize();
            switch (e) {
                case "rtl":
                case "ttb":
                    this.position.value = -t;
                    break;
                case "ltr":
                case "btt":
                    this.position.value = 0;
                    break
            }
            this.content.applyTransform(this.position.value)
        }
        setupAnimation(e) {
            this.animation = new A(this.position, this.settings, this.content.getSetSize(), t => {
                this.isStopped || this.content.applyTransform(t)
            }, e), this.isPaused || this.animation.start()
        }
        setupEventListeners(e) {
            e && (this.instance.addEventListener("mouseenter", this.boundPause), this.instance.addEventListener("mouseleave", this.boundPlay)), this.resizeObserver.observe(this.instance, this.handleResize), window.addEventListener("resize", this.handleWindowResize), document.addEventListener("visibilitychange", this.handleVisibility)
        }
        handleResize = () => {
            this.isStopped || (this.cloneUpdateRaf !== null && (cancelAnimationFrame(this.cloneUpdateRaf), this.cloneUpdateRaf = null), this.refreshClones())
        };
        handleWindowResize = () => {
            this.speedCheckRaf === null && (this.speedCheckRaf = requestAnimationFrame(() => {
                this.speedCheckRaf = null, !this.isStopped && this.updateSpeedIfNeeded(C(this.settings.breakpoints))
            }))
        };
        handleVisibility = () => {
            document.hidden ? this.pause() : this.play()
        };
        setupIntersectionObserver() {
            this.intersectionObserver = new IntersectionObserver(e => {
                let [t] = e, i = this.isInView;
                if (this.isInView = t.isIntersecting, this.isInView && te(this.instance), this.isInView && !i && this.isPaused) {
                    if (document.hidden) return;
                    this.play()
                } else !this.isInView && i && !this.isPaused && this.pause()
            }, {
                threshold: 0,
                rootMargin: "50px"
            }), this.intersectionObserver.observe(this.instance)
        }
        play() {
            this.isPaused && this.animation && this.isInView && !document.hidden && (this.isPaused = !1, this.animation.start())
        }
        pause() {
            !this.isPaused && this.animation && (this.isPaused = !0, this.animation.stop())
        }
        destroy() {
            this.animation && this.animation.stop(), this.intersectionObserver && (this.intersectionObserver.disconnect(), this.intersectionObserver = null), this.cloneUpdateRaf !== null && (cancelAnimationFrame(this.cloneUpdateRaf), this.cloneUpdateRaf = null), this.speedCheckRaf !== null && (cancelAnimationFrame(this.speedCheckRaf), this.speedCheckRaf = null), I(y) || this.instance.remove(), this.resizeObserver.unobserve(this.instance, this.handleResize), window.removeEventListener("resize", this.handleWindowResize), document.removeEventListener("visibilitychange", this.handleVisibility), this.content.reset()
        }
        stop() {
            this.isStopped = !0, this.cloneUpdateRaf !== null && (cancelAnimationFrame(this.cloneUpdateRaf), this.cloneUpdateRaf = null), this.speedCheckRaf !== null && (cancelAnimationFrame(this.speedCheckRaf), this.speedCheckRaf = null), this.position.value = 0, this.isPaused = !1, this.isInView = !0, this.animation && (this.animation.stop(), this.animation = null), this.intersectionObserver && (this.intersectionObserver.disconnect(), this.intersectionObserver = null), this.instance.removeEventListener("mouseenter", this.boundPause), this.instance.removeEventListener("mouseleave", this.boundPlay), this.resizeObserver.unobserve(this.instance, this.handleResize), window.removeEventListener("resize", this.handleWindowResize), document.removeEventListener("visibilitychange", this.handleVisibility), this.content.reset(), this.resetInlineStyles(), this.instance.style.opacity = "1"
        }
        resetInlineStyles() {
            this.wrapper.removeAttribute("style"), this.listElement.removeAttribute("style"), this.instance.removeAttribute("style"), this.instance.removeAttribute("role"), this.instance.removeAttribute("aria-label"), this.instance.removeAttribute("fs-marquee-vertical"), d("item", {
                scope: this.listElement
            }).forEach(t => {
                t.removeAttribute("aria-hidden"), t.removeAttribute("style")
            })
        }
        start() {
            this.isStopped = !1;
            let {
                direction: e
            } = this.settings;
            this.resizeObserver = T.getInstance(), this.isInitializing = !0, this.content = new z(this.instance, this.wrapper, this.listElement, this.settings, () => this.handleDimensionsChanged()), this.content.resume(), this.init(e, this.settings), this.isInitializing = !1
        }
    },
    ie = W;
var w = E("marquee"),
    me = n => n.direction === "ltr" ? "rtl" : n.direction === "rtl" ? "ltr" : n.direction === "ttb" ? "btt" : n.direction === "btt" ? "ttb" : n.direction,
    se = n => {
        let e = [],
            t = d("marquee");
        if (t ? .length === 0) return w.error({}, "No marquee instances found on the page when initializing Marquee component"), [];
        for (let i of t) {
            let s = q(i);
            if (!s) {
                w.error({}, "Skipping marquee instance because [fs-marquee-instance] attribute is missing on element");
                continue
            }
            let r = n.instances[s];
            if (!r) {
                w.error({}, `Skipping marquee instance="${s}" because no configuration was found for this index`);
                continue
            }
            let {
                direction: o = null,
                breakpoints: l
            } = r;
            if (!o || !l) {
                w.error({}, `Skipping marquee instance="${s}" due to missing direction or breakpoints in configuration`);
                continue
            }
            let a = b("wrapper", {
                    scope: i
                }),
                c = b("list", {
                    scope: i
                }),
                h = d("item", {
                    scope: i
                });
            if (h.length === 0) {
                let p = q(i);
                w.warn({}, `No marquee items found, if you are using CMS Marquee, ensure to connect the CMS collection to the Marquee [fs-marquee-instance="${p}"]`);
                continue
            }
            if (!(a && c && h.length > 0)) {
                w.error({}, `Skipping marquee instance="${s}" because wrapper, list, or items elements are missing`);
                continue
            }
            let m = { ...r,
                breakpoints: r.breakpoints,
                direction: me(r),
                easeoutduration: r.easeoutduration,
                pauseonhover: r.pauseonhover,
                fadein: r.fadein
            };
            try {
                w.warn({}, `Attempting to create Marquee instance with index="${s}" and direction="${m.direction}"`);
                let p = new ie(i, m, a, c);
                e.push(p)
            } catch (p) {
                w.error({}, `Failed to initialize Marquee instance: ${s} with error:`, p);
                continue
            }
        }
        return e
    };
var pe = async n => ({
    init: async () => {
        let t = I(y);
        try {
            t || (await j(), await X());
            let i = await se(n) || [];
            return {
                result: i,
                destroy: () => {
                    t || i.forEach((s, r) => {
                        s.destroy()
                    })
                }
            }
        } catch (i) {
            return console.error("[marquee] initMarquees(): error while initializing marquee", i), {
                result: [],
                destroy: () => {
                    console.log("[marquee] destroy(): no instances to destroy due to previous init error")
                }
            }
        }
    },
    version: k
});
export {
    D as ELEMENTS, $ as SETTINGS, pe as init, k as version
};