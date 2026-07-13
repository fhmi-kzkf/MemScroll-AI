import {
    a as N,
    b as E,
    c as O,
    d as _,
    e as d,
    f as g,
    g as P,
    h as y,
    i as b,
    j as h,
    k as w,
    l as G,
    m as v,
    n as B
} from "./chunk-6XKNCR32.js";
import {
    a as I
} from "./chunk-M65MOCFB.js";
import {
    J as s,
    ba as L,
    g as u,
    ga as R,
    qa as f,
    ra as C
} from "./chunk-JYJWMUBN.js";
import "./chunk-5WLRVGM2.js";
var Q = "1.1.23";
var A = u("slider"),
    $ = p => {
        let l = [],
            r = {
                INSTANCE: `[${s.INSTANCE.name}]`,
                LIST_WRAPPER: `[${s.LIST_WRAPPER.name}=${s.LIST_WRAPPER.value}]`,
                LIST: `[${s.LIST.name}=${s.LIST.value}]`,
                SLIDE: `[${s.SLIDE.name}=${s.SLIDE.value}]`,
                PREVIOUS_BUTTON: `[${s.BUTTON_PREVIOUS.name}=${s.BUTTON_PREVIOUS.value}]`,
                NEXT_BUTTON: `[${s.BUTTON_NEXT.name}=${s.BUTTON_NEXT.value}]`,
                PAGINATION: `[${s.PAGINATION.name}=${s.PAGINATION.value}]`,
                BULLET: `[${s.PAGINATION_BULLET.name}=${s.PAGINATION_BULLET.value}]`,
                FRACTION_CURRENT: `[${s.PAGINATION_FRACTION_CURRENT.name}=${s.PAGINATION_FRACTION_CURRENT.value}]`,
                FRACTION_TOTAL: `[${s.PAGINATION_FRACTION_TOTAL.name}=${s.PAGINATION_FRACTION_TOTAL.value}]`,
                PROGRESS: `[${s.PROGRESS.name}=${s.PROGRESS.value}]`,
                SCROLLBAR: `[${s.SCROLLBAR.name}=${s.SCROLLBAR.value}]`,
                SCROLLBAR_DRAG: `[${s.SCROLLBAR_DRAG.name}=${s.SCROLLBAR_DRAG.value}]`
            },
            i = {
                LIST_CLASS: "wrapperClass",
                SLIDE_CLASS: "slideClass",
                BULLET_CLASS: "bulletClass",
                PROGRESS_BAR_FILL_CLASS: "progressbarFillClass",
                SCROLLBAR_DRAG_CLASS: "dragClass",
                PAGINATION_FRACTION_CURRENT_CLASS: "currentClass",
                PAGINATION_FRACTION_TOTAL_CLASS: "totalClass"
            },
            a = t => t ? t.classList[0] : null,
            c = t => Object.fromEntries(Object.entries(t).filter(([, n]) => n !== null)),
            U = document.querySelectorAll(r.INSTANCE);
        for (let t of Array.from(U)) {
            let n = t.getAttribute(s.INSTANCE.name) || "",
                S = `fs-slider-instance="${n}"`,
                T = `fs-slider-instance='${n}'`,
                e = p[T] || p[S];
            if (!e) {
                A.error({}, `No config found on slider instance ${t.getAttribute(s.INSTANCE.name)}`);
                continue
            }
            let F = t.querySelector(r.LIST_WRAPPER),
                x = {
                    [i.LIST_CLASS]: a(t.querySelector(r.LIST)),
                    [i.SLIDE_CLASS]: a(t.querySelector(r.SLIDE)),
                    [i.BULLET_CLASS]: a(t.querySelector(r.BULLET)),
                    [i.PROGRESS_BAR_FILL_CLASS]: a(t.querySelector(r.PROGRESS)),
                    [i.SCROLLBAR_DRAG_CLASS]: a(t.querySelector(r.SCROLLBAR_DRAG)),
                    [i.PAGINATION_FRACTION_CURRENT_CLASS]: a(t.querySelector(r.FRACTION_CURRENT)),
                    [i.PAGINATION_FRACTION_TOTAL_CLASS]: a(t.querySelector(r.FRACTION_TOTAL))
                },
                {
                    wrapperClass: D,
                    slideClass: q,
                    dragClass: M,
                    bulletClass: j,
                    progressbarFillClass: k,
                    currentClass: W,
                    totalClass: H
                } = x,
                V = c({
                    wrapperClass: D,
                    slideClass: q
                }),
                X = c({
                    bulletClass: j,
                    progressbarFillClass: k,
                    currentClass: W,
                    totalClass: H
                }),
                z = c({
                    dragClass: M
                }),
                o = [];
            e.navigation && (o.push(_), e.navigation = { ...e.navigation,
                prevEl: t.querySelector(r.PREVIOUS_BUTTON),
                nextEl: t.querySelector(r.NEXT_BUTTON)
            }), e.pagination && (o.push(d), e.pagination = { ...e.pagination,
                ...X,
                el: t.querySelector(r.PAGINATION)
            }), e.thumbs && (o.push(b), e.thumbs = { ...e.thumbs
            }), e.autoplay && (o.push(y), e.autoplay = { ...e.autoplay
            }), e.scrollbar && (o.push(g), e.scrollbar = { ...e.scrollbar,
                ...z,
                el: t.querySelector(r.SCROLLBAR)
            }), e.controller && (o.push(P), e.controller = { ...e.controller
            }), e.keyboard && (o.push(E), e.keyboard = { ...e.keyboard
            }), e.mousewheel && (o.push(O), e.mousewheel = { ...e.mousewheel
            }), e.effect !== "slide" && (e.effect === "fade" && o.push(h), e.effect === "cube" && o.push(w), e.effect === "coverflow" && o.push(v), e.effect === "flip" && o.push(G), e.effect === "cards" && o.push(B));
            let J = L(e.pagination);
            e = {
                modules: o,
                ...e,
                ...V,
                pagination: J
            };
            try {
                let m = new N(F, e);
                l.push(m)
            } catch (m) {
                A.error({}, "Finsweet Slider initialization error:", {
                    error: m,
                    instance: t,
                    instanceName: n,
                    configObject: e
                })
            }
        }
        return l.forEach(t => {
            if (t.params.thumbs && t.params.thumbs.swiper) {
                let n = l.find(S => S.el.matches(t.params.thumbs ? .swiper));
                n ? t.params.thumbs = {
                    swiper: n,
                    autoScrollOffset: t.params.thumbs.autoScrollOffset,
                    slideThumbActiveClass: t.params.thumbs.slideThumbActiveClass
                } : A.error({}, `No Swiper instance found for selector: ${t.params.thumbs?.swiper}`)
            }
            if (t.params.controller && t.params.controller.control) {
                let n = t.params.controller.control,
                    S = l.find(T => T.el.matches(n));
                S ? t.controller.control = S : A.error({}, `No Swiper instance found for selector: ${n}`)
            }
        }), l
    };
var Y = async p => ({
    init: async () => {
        let r = I(R);
        r || (await C(), await f());
        let i = await $(p);
        return {
            result: i,
            destroy: () => {
                r || i.forEach(a => {
                    let c = a ? .el ? .closest("[fs-slider-instance]");
                    a.destroy(!0, !0), c && c.remove()
                })
            }
        }
    },
    version: "1.0.0"
});
var Z = ["example"],
    ee = {
        example: {
            key: "example",
            values: {
                value: "value"
            }
        }
    };
export {
    Z as ELEMENTS, ee as SETTINGS, Y as init, Q as version
};