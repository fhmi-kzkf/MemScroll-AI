import {
    a as o,
    b as i,
    c as a,
    d as m
} from "./chunk-JYJWMUBN.js";

function e(t, r = {}) {
    return a([() => {
        let n = new i(t, [0, 1], r);
        return n.finished.catch(() => {}), n
    }], r, r.duration)
}

function f(t, r, n) {
    return (o(t) ? e : m)(t, r, n)
}
export {
    f as a
};