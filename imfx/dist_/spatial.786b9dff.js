parcelRequire = function(e, r, t, n) {
  var i, o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c
      }
      p.resolve = function(r) {
        return e[t][1][r] || r
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this)
    }
    return r[t].exports;

    function p(e) {
      return f(p.resolve(e))
    }
  }
  f.isParcelRequire = !0, f.Module = function(e) {
    this.id = e, this.bundle = f, this.exports = {}
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
    e[r] = [function(e, r) {
      r.exports = t
    }, {}]
  };
  for (var c = 0; c < t.length; c++) try {
    f(t[c])
  } catch (e) {
    i || (i = e)
  }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function() {
      return l
    }) : n && (this[n] = l)
  }
  if (parcelRequire = f, i) throw i;
  return f
}({
  "W8he": [function(require, module, exports) {
    "use strict";

    function e(e, r) {
      var t;
      if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
        if (Array.isArray(e) || (t = n(e)) || r && e && "number" == typeof e.length) {
          t && (e = t);
          var a = 0,
            o = function() {};
          return {
            s: o,
            n: function() {
              return a >= e.length ? {
                done: !0
              } : {
                done: !1,
                value: e[a++]
              }
            },
            e: function(e) {
              throw e
            },
            f: o
          }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }
      var l, u = !0,
        i = !1;
      return {
        s: function() {
          t = e[Symbol.iterator]()
        },
        n: function() {
          var e = t.next();
          return u = e.done, e
        },
        e: function(e) {
          i = !0, l = e
        },
        f: function() {
          try {
            u || null == t.return || t.return()
          } finally {
            if (i) throw l
          }
        }
      }
    }

    function r(e, r) {
      return l(e) || o(e, r) || n(e, r) || t()
    }

    function t() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }

    function n(e, r) {
      if (e) {
        if ("string" == typeof e) return a(e, r);
        var t = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? a(e, r) : void 0
      }
    }

    function a(e, r) {
      (null == r || r > e.length) && (r = e.length);
      for (var t = 0, n = new Array(r); t < r; t++) n[t] = e[t];
      return n
    }

    function o(e, r) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
        var t = [],
          n = !0,
          a = !1,
          o = void 0;
        try {
          for (var l, u = e[Symbol.iterator](); !(n = (l = u.next()).done) && (t.push(l.value), !r || t.length !== r); n = !0);
        } catch (i) {
          a = !0, o = i
        } finally {
          try {
            n || null == u.return || u.return()
          } finally {
            if (a) throw o
          }
        }
        return t
      }
    }

    function l(e) {
      if (Array.isArray(e)) return e
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.parseToCustom = exports.parseKernel = exports.updateKernel = void 0;
    var u = function(e) {
        var r = parseInt(e);
        return isNaN(r) ? 0 : r
      },
      i = {
        Sharpen: {
          squareMatrix: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
          ],
          scale: 1
        },
        "Box Blur": {
          squareMatrix: [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
          ],
          scale: 9
        },
        "Edge Detection": {
          squareMatrix: [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]
          ],
          scale: 1
        },
        "Gaussian Blur": {
          squareMatrix: [
            [1, 2, 1],
            [2, 4, 2],
            [1, 2, 1]
          ],
          scale: 16
        },
        Emboss: {
          squareMatrix: [
            [-2, -1, 0],
            [-1, 1, 1],
            [0, 1, 2]
          ],
          scale: 1
        }
      },
      s = {
        squareMatrix: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0]
        ],
        scale: 1
      },
      c = function(e) {
        for (var t = "Custom" === e ? s : i[e], n = t.squareMatrix, a = t.scale, o = document.getElementById("kernel-table"), l = document.getElementById("scale-input"), u = 0; u < o.rows.length; u++) {
          var c = r(o.rows[u].cells, 3),
            f = c[0],
            d = c[1],
            y = c[2],
            v = r(n[u], 3),
            p = v[0],
            m = v[1],
            h = v[2],
            b = r(f.children, 1)[0],
            x = r(d.children, 1)[0],
            g = r(y.children, 1)[0];
          b.value = p, x.value = m, g.value = h
        }
        l.value = a
      };
    exports.updateKernel = c;
    var f = function() {
      var t, n = document.getElementById("kernel-table"),
        a = document.getElementById("scale-input"),
        o = [],
        l = e(n.rows);
      try {
        for (l.s(); !(t = l.n()).done;) {
          var i = r(t.value.cells, 3),
            s = i[0],
            c = i[1],
            f = i[2],
            d = r(s.children, 1)[0],
            y = r(c.children, 1)[0],
            v = r(f.children, 1)[0],
            p = [d.value, y.value, v.value].map(u);
          o.push(p)
        }
      } catch (m) {
        l.e(m)
      } finally {
        l.f()
      }
      return {
        squareMatrix: o,
        scale: u(a.value)
      }
    };
    exports.parseKernel = f;
    var d = function() {
      var e = f();
      s = e
    };
    exports.parseToCustom = d;
  }, {}],
  "FOZT": [function(require, module, exports) {
    "use strict";

    function t(t, e) {
      var n;
      if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
        if (Array.isArray(t) || (n = r(t)) || e && t && "number" == typeof t.length) {
          n && (t = n);
          var o = 0,
            i = function() {};
          return {
            s: i,
            n: function() {
              return o >= t.length ? {
                done: !0
              } : {
                done: !1,
                value: t[o++]
              }
            },
            e: function(t) {
              throw t
            },
            f: i
          }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }
      var a, u = !0,
        f = !1;
      return {
        s: function() {
          n = t[Symbol.iterator]()
        },
        n: function() {
          var t = n.next();
          return u = t.done, t
        },
        e: function(t) {
          f = !0, a = t
        },
        f: function() {
          try {
            u || null == n.return || n.return()
          } finally {
            if (f) throw a
          }
        }
      }
    }

    function r(t, r) {
      if (t) {
        if ("string" == typeof t) return e(t, r);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? e(t, r) : void 0
      }
    }

    function e(t, r) {
      (null == r || r > t.length) && (r = t.length);
      for (var e = 0, n = new Array(r); e < r; e++) n[e] = t[e];
      return n
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.getPartitions = exports.firstNonZero = exports.bitSlicePixel = exports.posToIndex = void 0;
    var n = function(t) {
      return function(r, e) {
        return 4 * r + 4 * e * t
      }
    };
    exports.posToIndex = n;
    var o = function(t) {
      return function(r) {
        return 255 * r.toString(2)[t]
      }
    };
    exports.bitSlicePixel = o;
    var i = function(r) {
      var e, n = t(r);
      try {
        for (n.s(); !(e = n.n()).done;) {
          var o = e.value;
          if (0 !== o) return o
        }
      } catch (i) {
        n.e(i)
      } finally {
        n.f()
      }
    };
    exports.firstNonZero = i;
    var a = function(t) {
      var r = Math.floor((t.width - 1) / 2),
        e = r + 1,
        n = Math.floor((t.height - 1) / 2),
        o = n + 1;
      return [
        [0, 0, e - 0 + 1, o - 0 + 1],
        [r, 0, t.width - r, o - 0 + 1],
        [0, n, e - 0 + 1, t.height - n],
        [r, n, t.width - r, t.height - n]
      ]
    };
    exports.getPartitions = a;
  }, {}],
  "ejbP": [function(require, module, exports) {
    module.exports = "lenna.690a1e54.jpeg";
  }, {}],
  "hasM": [function(require, module, exports) {
    module.exports = "cat-hat.a4b82474.jpeg";
  }, {}],
  "PZa4": [function(require, module, exports) {
    module.exports = "painting.888ff59e.jpeg";
  }, {}],
  "vUvb": [function(require, module, exports) {
    module.exports = "street-skeletons.a14b506a.jpeg";
  }, {}],
  "zERG": [function(require, module, exports) {
    module.exports = "tower.ea8288ae.jpeg";
  }, {}],
  "KYFy": [function(require, module, exports) {
    module.exports = "zebra.8a4675f1.jpeg";
  }, {}],
  "vDYx": [function(require, module, exports) {
    module.exports = {
      lenna: require("./lenna.jpeg"),
      "cat-hat": require("./cat-hat.jpeg"),
      painting: require("./painting.jpeg"),
      "street-skeletons": require("./street-skeletons.jpeg"),
      tower: require("./tower.jpeg"),
      zebra: require("./zebra.jpeg")
    };
  }, {
    "./lenna.jpeg": "ejbP",
    "./cat-hat.jpeg": "hasM",
    "./painting.jpeg": "PZa4",
    "./street-skeletons.jpeg": "vUvb",
    "./tower.jpeg": "zERG",
    "./zebra.jpeg": "KYFy"
  }],
  "SyrU": [function(require, module, exports) {
    "use strict";
    var e = require("./kernel"),
      t = require("./utils"),
      n = r(require("./../assets/images/painting.jpeg"));

    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function a(e, t) {
      return l(e) || i(e, t) || u(e, t) || o()
    }

    function o() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }

    function i(e, t) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
        var n = [],
          r = !0,
          a = !1,
          o = void 0;
        try {
          for (var i, l = e[Symbol.iterator](); !(r = (i = l.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0);
        } catch (d) {
          a = !0, o = d
        } finally {
          try {
            r || null == l.return || l.return()
          } finally {
            if (a) throw o
          }
        }
        return n
      }
    }

    function l(e) {
      if (Array.isArray(e)) return e
    }

    function d(e, t) {
      var n;
      if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
        if (Array.isArray(e) || (n = u(e)) || t && e && "number" == typeof e.length) {
          n && (e = n);
          var r = 0,
            a = function() {};
          return {
            s: a,
            n: function() {
              return r >= e.length ? {
                done: !0
              } : {
                done: !1,
                value: e[r++]
              }
            },
            e: function(e) {
              throw e
            },
            f: a
          }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }
      var o, i = !0,
        l = !1;
      return {
        s: function() {
          n = e[Symbol.iterator]()
        },
        n: function() {
          var e = n.next();
          return i = e.done, e
        },
        e: function(e) {
          l = !0, o = e
        },
        f: function() {
          try {
            i || null == n.return || n.return()
          } finally {
            if (l) throw o
          }
        }
      }
    }

    function u(e, t) {
      if (e) {
        if ("string" == typeof e) return f(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(e, t) : void 0
      }
    }

    function f(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r
    }
    window.Worker || console.log("You don't have workers, sorry!");
    var c, s = document.getElementById("img-in"),
      m = document.getElementById("img-out"),
      h = document.getElementById("image-select"),
      g = document.getElementById("kernel-select"),
      y = document.getElementById("kernel-table"),
      v = document.getElementById("apply-kernel-btn"),
      b = 0;
    h.disabled = !0, v.disabled = !1;
    var p = s.getContext("2d"),
      w = m.getContext("2d"),
      I = new Image;
    I.addEventListener("load", function() {
      w.clearRect(0, 0, m.width, m.height), s.width = I.width, s.height = I.height, p.drawImage(I, 0, 0), m.width = I.width, m.height = I.height, h.disabled = !1, c = w.createImageData(I.width, I.height)
    }), I.addEventListener("load", function() {
      var e, t = d(E);
      try {
        for (t.s(); !(e = t.n()).done;) {
          e.value.addEventListener("message", k)
        }
      } catch (n) {
        t.e(n)
      } finally {
        t.f()
      }
      v.addEventListener("click", j)
    }, {
      once: !0
    }), h.addEventListener("change", function(e) {
      I.src = n.default[h.value], h.disabled = !0
    }), g.addEventListener("change", function(t) {
      (0, e.updateKernel)(g.value)
    }), y.addEventListener("input", function(t) {
      g.value = "Custom", (0, e.parseToCustom)()
    }), I.src = n.default[h.value], (0, e.updateKernel)(g.value);
    var E = [new Worker("task.335095d2.js"), new Worker("task.335095d2.js"), new Worker("task.335095d2.js"), new Worker("task.335095d2.js")];

    function k(e) {
      var n, r = (0, t.posToIndex)(I.width),
        o = e.data,
        i = o.newImage,
        l = o.xOff,
        u = o.yOff,
        f = d(i);
      try {
        for (f.s(); !(n = f.n()).done;) {
          var s = a(n.value, 3),
            m = s[0],
            h = s[1],
            g = s[2],
            y = r(l + m, u + h);
          c.data[y + 0] = g[0], c.data[y + 1] = g[1], c.data[y + 2] = g[2], c.data[y + 3] = g[3]
        }
      } catch (p) {
        f.e(p)
      } finally {
        f.f()
      }
      0 === (b -= 1) && (w.putImageData(c, 0, 0), console.timeEnd("Filter time"), v.disabled = !1)
    }

    function j() {
      v.disabled = !0;
      for (var n = (0, t.getPartitions)(I), r = (0, e.parseKernel)(), o = 0; o < E.length; o++) {
        var i = a(n[o], 4),
          l = i[0],
          d = i[1],
          u = i[2],
          f = i[3],
          c = E[o],
          s = p.getImageData(l, d, u, f);
        c.postMessage({
          op: "spatial-filter",
          kernel: r,
          xOff: l,
          yOff: d,
          image: {
            width: s.width,
            height: s.height,
            pixels: s.data
          }
        }), b += 1
      }
      console.time("Filter time")
    }
  }, {
    "./kernel": "W8he",
    "./utils": "FOZT",
    "./../assets/images/painting.jpeg": "vDYx",
    "./task.js": [
      ["task.335095d2.js", "oMIk"], "oMIk"
    ]
  }]
}, {}, ["SyrU"], null)
