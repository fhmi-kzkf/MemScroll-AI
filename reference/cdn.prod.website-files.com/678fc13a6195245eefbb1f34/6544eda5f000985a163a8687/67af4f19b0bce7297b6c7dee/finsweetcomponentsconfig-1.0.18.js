const injectStyles = () => {
        const e = document.querySelector("style[fs-components-cloak]");
        e ? .remove();
        const s = document.createElement("style");
        s.setAttribute("fs-components-cloak", "cloak"), s.textContent = '\n    [fs-marquee-instance],[fs-cnumbercount-instance]{ opacity: 0; }\n    [fs-consent-element="internal-component"],[fs-consent-element="banner"],[fs-consent-element="fixed-preferences"],[fs-consent-element="preferences"],[fs-consent-element="interaction"]{display:none}\n  ', document.head.appendChild(s)
    },
    initFsComponents = async e => {
        injectStyles();
        const s = window ? .finsweetComponentsConfigLoading,
            i = document ? .querySelector("script[fs-components-src]");
        if (void 0 !==
            import.meta && !i && !s) {
            document ? .querySelector('script[finsweet="components"][async][type="module"]');
            const s = await
            import (
                import.meta.url), i = Object.keys(s) || [];
            return new Promise(((s, l) => {
                const t = document.createElement("script"),
                    n = `${e}?v=${(new Date).getTime()}`;
                t.src = n, t.type = "module", t.async = !0, t.setAttribute("fs-components-src",
                    import.meta.url), t.setAttribute("fs-components-installed", i ? .join(",")), t.onload = () => s(), t.onerror = () => l(new Error("Failed to load script")), document.head.appendChild(t)
            }))
        }
    };
initFsComponents("https://cdn.jsdelivr.net/npm/@finsweet/fs-components@2/fs-components.js");
export const marquee = {
    instances: {
        "testimonial-marquee": {
            source: "cms",
            instance: "testimonial-marquee",
            direction: "rtl",
            pauseonhover: "false",
            easeoutduration: "500",
            breakpoints: {
                991: "54"
            },
            fadein: "1000",
            usefadein: "false"
        },
        "about-marquee": {
            source: "static",
            instance: "about-marquee",
            direction: "rtl",
            pauseonhover: "false",
            easeoutduration: "500",
            breakpoints: {
                320: "60",
                480: "60",
                768: "60",
                991: "60"
            },
            fadein: "2000",
            usefadein: "true"
        },
        brands: {
            source: "cms",
            instance: "brands",
            direction: "rtl",
            pauseonhover: "false",
            easeoutduration: "500",
            breakpoints: {
                991: "100"
            },
            fadein: "1000",
            usefadein: "true"
        }
    }
};
export const slider = {
    "fs-slider-instance='testimonial'": {
        slideActiveClass: "is-slide-active",
        slideNextClass: "is-slide-next",
        slidePrevClass: "is-slide-previous",
        direction: "horizontal",
        loop: !1,
        autoHeight: !1,
        allowTouchMove: !0,
        centeredSlides: !1,
        slideToClickedSlide: !1,
        initialSlide: 0,
        speed: 600,
        followFinger: !0,
        keyboard: !1,
        mousewheel: !1,
        effect: "slide",
        navigation: {
            prevEl: "[fs-slider-instance='testimonial'] [fs-slider-element='previous']",
            nextEl: "[fs-slider-instance='testimonial'] [fs-slider-element='next']",
            hideOnClick: !1,
            disabledClass: "is-nav-disabled"
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 12
            },
            991: {
                slidesPerView: "auto",
                slidesPerGroup: 1,
                spaceBetween: 12
            }
        }
    },
    "fs-slider-instance='fs-slider'": {
        slideActiveClass: "is-slide-active",
        slideNextClass: "is-slide-next",
        slidePrevClass: "is-slide-previous",
        direction: "horizontal",
        loop: !1,
        autoHeight: !1,
        allowTouchMove: !1,
        centeredSlides: !1,
        slideToClickedSlide: !1,
        initialSlide: 0,
        speed: 500,
        followFinger: !1,
        keyboard: !1,
        mousewheel: !0,
        effect: "slide",
        scrollbar: {
            el: "[fs-slider-instance='fs-slider'] [fs-slider-element='scrollbar']",
            draggable: !1,
            hide: !1,
            snapOnRelease: !1
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16
            },
            991: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16
            }
        }
    },
    "fs-slider-instance='projects-slider'": {
        slideActiveClass: "is-slide-active",
        slideNextClass: "is-slide-next",
        slidePrevClass: "is-slide-previous",
        direction: "horizontal",
        loop: !1,
        autoHeight: !1,
        allowTouchMove: !1,
        centeredSlides: !1,
        slideToClickedSlide: !1,
        initialSlide: 0,
        speed: 300,
        followFinger: !1,
        keyboard: !1,
        mousewheel: !0,
        effect: "slide",
        pagination: {
            el: "[fs-slider-instance='projects-slider'] [fs-slider-element='pagination']",
            type: "fraction",
            bulletElement: "div"
        },
        scrollbar: {
            el: "[fs-slider-instance='projects-slider'] [fs-slider-element='scrollbar']",
            draggable: !1,
            hide: !1,
            snapOnRelease: !1
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16
            },
            991: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16
            }
        }
    },
    "fs-slider-instance='projects-slide'": {
        slideActiveClass: "is-slide-active",
        slideNextClass: "is-slide-next",
        slidePrevClass: "is-slide-previous",
        direction: "horizontal",
        loop: !1,
        autoHeight: !1,
        allowTouchMove: !1,
        centeredSlides: !1,
        slideToClickedSlide: !1,
        initialSlide: 0,
        speed: 500,
        followFinger: !1,
        keyboard: !1,
        mousewheel: !0,
        effect: "slide",
        pagination: {
            el: "[fs-slider-instance='projects-slide'] [fs-slider-element='pagination']",
            type: "fraction",
            bulletElement: "div"
        },
        scrollbar: {
            el: "[fs-slider-instance='projects-slide'] [fs-slider-element='scrollbar']",
            draggable: !1,
            hide: !1,
            snapOnRelease: !1
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16
            },
            991: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16
            }
        }
    },
    "fs-slider-instance='news-cta'": {
        slideActiveClass: "is-slide-active",
        slideNextClass: "is-slide-next",
        slidePrevClass: "is-slide-previous",
        direction: "horizontal",
        loop: !1,
        autoHeight: !1,
        allowTouchMove: !0,
        centeredSlides: !1,
        slideToClickedSlide: !1,
        initialSlide: 0,
        speed: 600,
        followFinger: !0,
        keyboard: !1,
        mousewheel: !1,
        effect: "slide",
        navigation: {
            prevEl: "[fs-slider-instance='news-cta'] [fs-slider-element='previous']",
            nextEl: "[fs-slider-instance='news-cta'] [fs-slider-element='next']",
            hideOnClick: !1,
            disabledClass: "is-nav-disabled"
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 12
            },
            991: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 12
            }
        }
    }
};