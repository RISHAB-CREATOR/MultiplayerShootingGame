function ta(c) {
  throw c;
}

var va = void 0, Ta = null;

function kb() {
  return (function() {});
}

var Vb = [], xc = typeof process === "object", Ec = typeof window === "object", Fc = typeof importScripts === "function", Pc = !Ec && !xc && !Fc;

var OUTPUT;

if (xc) {
  print = (function(c) {
    OUTPUT = c;
  });
  printErr = (function(c) {
    OUTPUT = c;
  });
  var ad = require("fs");
  read = (function(c) {
    var d = ad.readFileSync(c).toString();
    !d && c[0] != "/" && (c = __dirname.split("/").slice(0, -1).join("/") + "/src/" + c, d = ad.readFileSync(c).toString());
    return d;
  });
  Vb = process.argv.slice(2);
} else {
  Pc ? (this.read || (read = (function(c) {
    snarf(c);
  })), Vb = this.arguments ? arguments : scriptArgs) : Ec ? (print = printErr = (function(c) {
    OUTPUT = c;
  }), read = (function(c) {
    var d = new XMLHttpRequest;
    d.open("GET", c, !1);
    d.send(Ta);
    return d.responseText;
  }), this.arguments && (Vb = arguments)) : Fc ? load = importScripts : ta("Unknown runtime environment. Where are we?");
}

function bd(c) {
  eval.call(Ta, c);
}

typeof load == "undefined" && typeof read != "undefined" && (load = (function(c) {
  bd(read(c));
}));

typeof printErr === "undefined" && (printErr = kb());

typeof print === "undefined" && (print = printErr);

try {
  this.Module = Module;
} catch (nd) {
  this.Module = Module = {};
}

if (!Module.arguments) {
  Module.arguments = Vb;
}

if (Module.print) {
  print = Module.print;
}

var ud = {
  i1: 0,
  i8: 0,
  i16: 0,
  i32: 0,
  i64: 0
}, Nd = {
  "float": 0,
  "double": 0
};

function ae(c) {
  if (ke == 1) {
    return 1;
  }
  var d = {
    "%i1": 1,
    "%i8": 1,
    "%i16": 2,
    "%i32": 4,
    "%i64": 8,
    "%float": 4,
    "%double": 8
  }["%" + c];
  d || (c[c.length - 1] == "*" ? d = ke : c[0] == "i" && (c = parseInt(c.substr(1)), ne(c % 8 == 0), d = c / 8));
  return d;
}

function oe(c) {
  var d = {};
  c.filter((function(c) {
    return d[c] ? !1 : d[c] = !0;
  }));
}

function Ke() {
  var c, d, e;
  d = c = 0;
  var f = [], g = -1;
  e = [ "i32", "i32" ].map((function(e) {
    var j, m;
    e in ud || e in Nd || e[e.length - 1] == "*" ? m = j = ae(e) : (isPointerType(e) ? 0 : /^\[\d+\ x\ (.*)\]/.test(e) || /<?{ [^}]* }>?/.test(e) || e[0] == "%") ? (j = Types.types[e].Ic, m = Types.types[e].Hc) : ta("Unclear type in struct: " + e + ", in undefined :: " + dump(Types.types[va]));
    m = Math.min(m, ke);
    d = Math.max(d, m);
    e = bf(c, m);
    c = e + j;
    g >= 0 && f.push(e - g);
    return g = e;
  }));
  c = bf(c, d);
  f.length == 0 || oe(f);
  return e;
}

function tf(c) {
  var d = qg;
  qg += c;
  qg = qg + 3 >> 2 << 2;
  return d;
}

function Vg(c) {
  var d = Wg;
  Wg += c;
  Wg = Wg + 3 >> 2 << 2;
  if (Wg >= Xg) {
    for (; Xg <= Wg; ) {
      Xg = Math.ceil(2 * Xg / Bh) * Bh;
    }
    var c = a, e = new ArrayBuffer(Xg);
    a = new Int8Array(e);
    b = new Int16Array(e);
    h = new Int32Array(e);
    Dh = new Uint8Array(e);
    Eh = new Uint16Array(e);
    k = new Uint32Array(e);
    l = new Float32Array(e);
    a.set(c);
  }
  return d;
}

function bf(c, d) {
  return Math.ceil(c / (d ? d : 4)) * (d ? d : 4);
}

var ke = 4, Hi = {}, Ii;

function Ej(c) {
  print(c + ":\n" + Error().stack);
  ta("Assertion: " + c);
}

function ne(c, d) {
  c || Ej("Assertion failed: " + d);
}

var Fj = this;

Module.ccall = (function(c, d, e, f) {
  try {
    var g = eval("_" + c);
  } catch (i) {
    try {
      g = Fj.Module["_" + c];
    } catch (j) {}
  }
  ne(g, "Cannot call unknown function " + c + " (perhaps LLVM optimizations or closure removed it?)");
  var m = 0, c = f ? f.map((function(c) {
    if (e[m++] == "string") {
      var d = qg;
      tf(c.length + 1);
      Gj(c, d);
      c = d;
    }
    return c;
  })) : [];
  return (function(c, d) {
    return d == "string" ? Kk(c) : c;
  })(g.apply(Ta, c), d);
});

function Tk(c, d, e) {
  e = e || "i8";
  e[e.length - 1] === "*" && (e = "i32");
  switch (e) {
   case "i1":
    a[c] = d;
    break;
   case "i8":
    a[c] = d;
    break;
   case "i16":
    b[c >> 1] = d;
    break;
   case "i32":
    h[c >> 2] = d;
    break;
   case "i64":
    h[c >> 2] = d;
    break;
   case "float":
    l[c >> 2] = d;
    break;
   case "double":
    Uk[0] = d;
    h[c >> 2] = t[0];
    h[c + 4 >> 2] = t[1];
    break;
   default:
    Ej("invalid type for setValue: " + e);
  }
}

Module.setValue = Tk;

Module.getValue = (function(c, d) {
  d = d || "i8";
  d[d.length - 1] === "*" && (d = "i32");
  switch (d) {
   case "i1":
    return a[c];
   case "i8":
    return a[c];
   case "i16":
    return b[c >> 1];
   case "i32":
    return h[c >> 2];
   case "i64":
    return h[c >> 2];
   case "float":
    return l[c >> 2];
   case "double":
    return t[0] = h[c >> 2], t[1] = h[c + 4 >> 2], Uk[0];
   default:
    Ej("invalid type for setValue: " + d);
  }
  return Ta;
});

var Vk = 1, v = 2;

Module.ALLOC_NORMAL = 0;

Module.ALLOC_STACK = Vk;

Module.ALLOC_STATIC = v;

function w(c, d, e) {
  var f, g;
  typeof c === "number" ? (f = !0, g = c) : (f = !1, g = c.length);
  var i = typeof d === "string" ? d : Ta, e = [ Wk, tf, Vg ][e === va ? v : e](Math.max(g, i ? 1 : d.length));
  if (f) {
    return Xk(e, g), e;
  }
  f = 0;
  for (var j; f < g; ) {
    var m = c[f];
    typeof m === "function" && (m = Hi.Jc(m));
    j = i || d[f];
    j === 0 ? f++ : (j == "i64" && (j = "i32"), Tk(e + f, m, j), f += ae(j));
  }
  return e;
}

Module.allocate = w;

function Kk(c, d) {
  for (var e = typeof d == "undefined", f = "", g = 0, i, j = String.fromCharCode(0); ; ) {
    i = String.fromCharCode(Dh[c + g]);
    if (e && i == j) {
      break;
    }
    f += i;
    g += 1;
    if (!e && g == d) {
      break;
    }
  }
  return f;
}

Module.Pointer_stringify = Kk;

Module.Array_stringify = (function(c) {
  for (var d = "", e = 0; e < c.length; e++) {
    d += String.fromCharCode(c[e]);
  }
  return d;
});

var Wl, Bh = 4096, a, Dh, b, Eh, h, k, l, qg, wm, Wg, ym = Module.TOTAL_STACK || 5242880, Xg = Module.TOTAL_MEMORY || 10485760;

ne(!!Int32Array && !!Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "Cannot fallback to non-typed array case: Code is too specialized");

var zm = new ArrayBuffer(Xg);

a = new Int8Array(zm);

b = new Int16Array(zm);

h = new Int32Array(zm);

Dh = new Uint8Array(zm);

Eh = new Uint16Array(zm);

k = new Uint32Array(zm);

l = new Float32Array(zm);

h[0] = 255;

ne(Dh[0] === 255 && Dh[3] === 0, "Typed arrays 2 must be run on a little-endian system");

var Bm = Am("(null)");

Wg = Bm.length;

for (var Cm = 0; Cm < Bm.length; Cm++) {
  a[Cm] = Bm[Cm];
}

Module.HEAP = va;

Module.HEAP8 = a;

Module.HEAP16 = b;

Module.HEAP32 = h;

Module.HEAPU8 = Dh;

Module.HEAPU16 = Eh;

Module.HEAPU32 = k;

Module.HEAPF32 = l;

wm = (qg = bf(Wg)) + ym;

var Dm = bf(wm, 8);

a.subarray(Dm);

var t = h.subarray(Dm >> 2), x = l.subarray(Dm >> 2), Uk = (new Float64Array(a.buffer)).subarray(Dm >> 3);

wm = Dm + 8;

Wg = Math.ceil(wm / Bh) * Bh;

function Em(c) {
  for (; c.length > 0; ) {
    var d = c.shift(), e = d.Ja;
    typeof e === "number" && (e = Wl[e]);
    e(d.Dc === va ? Ta : d.Dc);
  }
}

var Fm = [], Gm = [];

function Hm(c, d) {
  return Array.prototype.slice.call(a.subarray(c, c + d));
}

Module.Array_copy = Hm;

Module.TypedArray_copy = (function(c, d) {
  for (var e = new Uint8Array(d), f = 0; f < d; ++f) {
    e[f] = a[c + f];
  }
  return e.buffer;
});

function Im(c) {
  for (var d = 0; a[c + d]; ) {
    d++;
  }
  return d;
}

Module.String_len = Im;

function Jm(c, d) {
  var e = Im(c);
  d && e++;
  var f = Hm(c, e);
  d && (f[e - 1] = 0);
  return f;
}

Module.String_copy = Jm;

function Am(c, d) {
  for (var e = [], f = 0; f < c.length; ) {
    var g = c.charCodeAt(f);
    g > 255 && (g &= 255);
    e.push(g);
    f += 1;
  }
  d || e.push(0);
  return e;
}

Module.intArrayFromString = Am;

Module.intArrayToString = (function(c) {
  for (var d = [], e = 0; e < c.length; e++) {
    var f = c[e];
    f > 255 && (f &= 255);
    d.push(String.fromCharCode(f));
  }
  return d.join("");
});

function Gj(c, d, e) {
  for (var f = 0; f < c.length; ) {
    var g = c.charCodeAt(f);
    g > 255 && (g &= 255);
    a[d + f] = g;
    f += 1;
  }
  e || (a[d + f] = 0);
}

Module.writeStringToMemory = Gj;

var y = [];

function Km(c, d) {
  return c >= 0 ? c : d <= 32 ? 2 * Math.abs(1 << d - 1) + c : Math.pow(2, d) + c;
}

function Lm(c, d) {
  if (c <= 0) {
    return c;
  }
  var e = d <= 32 ? Math.abs(1 << d - 1) : Math.pow(2, d - 1);
  if (c >= e && (d <= 32 || c > e)) {
    c = -2 * e + c;
  }
  return c;
}

function Mm(c, d, e, f, g) {
  var i, j = c >> 2;
  i = (c + 60 | 0) >> 2;
  h[i] = 0;
  var m = f + 12 | 0, n = l[g + 12 >> 2], o = l[m >> 2], q = l[g + 8 >> 2], p = l[f + 16 >> 2], r = n * o - q * p + l[g >> 2] - l[e >> 2], g = q * o + n * p + l[g + 4 >> 2] - l[e + 4 >> 2], n = l[e + 12 >> 2], o = l[e + 8 >> 2], e = n * r + o * g, r = r * -o + n * g, n = d + 12 | 0, g = k[n >> 2], n = k[n + 4 >> 2], o = (t[0] = g, x[0]), q = (t[0] = n, x[0]), s = d + 20 | 0, p = k[s >> 2], s = k[s + 4 >> 2], u = (t[0] = p, x[0]), z = (t[0] = s, x[0]), E = u - o, A = z - q, I = E * (u - e) + A * (z - r), C = e - o, K = r - q, J = E * C + A * K, f = l[d + 8 >> 2] + l[f + 8 >> 2], N = J > 0;
  do {
    if (N) {
      if (I > 0) {
        var B = E * E + A * A;
        B > 0 || G(y.cc | 0, 127, y.hb | 0, y.Qb | 0);
        var F = 1 / B, B = e - (o * I + u * J) * F, F = r - (q * I + z * J) * F;
        if (B * B + F * F <= f * f) {
          B = -A;
          C * B + E * K < 0 ? (F = A, B = -E) : (F = B, B = E);
          var H = Nm(F * F + B * B);
          H < 1.1920928955078125e-7 ? H = B : (H = 1 / H, F *= H, H *= B);
          h[i] = 1;
          h[j + 14] = 1;
          B = c + 40 | 0;
          F = (x[0] = F, t[0]);
          H = (x[0] = H, t[0]) | 0;
          h[B >> 2] = 0 | F;
          h[B + 4 >> 2] = H;
          B = c + 48 | 0;
          h[B >> 2] = g;
          h[B + 4 >> 2] = n;
          B = c + 16 | 0;
          h[B >> 2] = 0;
          F = B;
          a[B] = 0;
          a[F + 1 | 0] = 0;
          a[F + 2 | 0] = 1;
          a[F + 3 | 0] = 0;
          B = m;
          F = c;
          H = h[B + 4 >> 2];
          h[F >> 2] = h[B >> 2];
          h[F + 4 >> 2] = H;
        }
      } else {
        if (B = e - u, F = r - z, B * B + F * F <= f * f) {
          if ((a[d + 45 | 0] & 1) << 24 >> 24 != 0) {
            var O = d + 36 | 0, H = O | 0, O = O + 4 | 0, O = h[O >> 2], H = (t[0] = h[H >> 2], x[0]), O = (t[0] = O, x[0]);
            if ((H - u) * B + (O - z) * F > 0) {
              break;
            }
          }
          h[i] = 1;
          h[j + 14] = 0;
          l[j + 10] = 0;
          l[j + 11] = 0;
          F = c + 48 | 0;
          B = F | 0;
          h[B >> 2] = p;
          B = F + 4 | 0;
          h[B >> 2] = s;
          B = c + 16 | 0;
          h[B >> 2] = 0;
          F = B;
          a[B] = 1;
          a[F + 1 | 0] = 0;
          a[F + 2 | 0] = 0;
          a[F + 3 | 0] = 0;
          F = m;
          H = c;
          B = F | 0;
          F = F + 4 | 0;
          O = h[F >> 2];
          F = H | 0;
          h[F >> 2] = h[B >> 2];
          B = H + 4 | 0;
          h[B >> 2] = O;
        }
      }
    } else {
      if (C * C + K * K <= f * f) {
        if ((a[d + 44 | 0] & 1) << 24 >> 24 != 0 && (B = d + 28 | 0, H = B | 0, O = B + 4 | 0, B = h[O >> 2], F = (t[0] = h[H >> 2], x[0]), B = (t[0] = B, x[0]), (o - F) * (o - e) + (q - B) * (q - r) > 0)) {
          break;
        }
        h[i] = 1;
        h[j + 14] = 0;
        l[j + 10] = 0;
        l[j + 11] = 0;
        F = c + 48 | 0;
        B = F | 0;
        h[B >> 2] = g;
        B = F + 4 | 0;
        h[B >> 2] = n;
        B = c + 16 | 0;
        h[B >> 2] = 0;
        F = B;
        a[B] = 0;
        a[F + 1 | 0] = 0;
        a[F + 2 | 0] = 0;
        a[F + 3 | 0] = 0;
        F = m;
        H = c;
        B = F | 0;
        B = h[B >> 2];
        F = F + 4 | 0;
        O = h[F >> 2];
        F = H | 0;
        h[F >> 2] = B;
        B = H + 4 | 0;
        h[B >> 2] = O;
      }
    }
  } while (0);
}

function Om() {
  var c, d, e, f, g, i, j, m, n, o, q, p, r = qg;
  qg += 104412;
  var s = r + 28, u = r + 56;
  p = u >> 2;
  var z = r + 103084;
  q = z >> 2;
  var E = r + 103136;
  o = E >> 2;
  var A = r + 103184;
  n = A >> 2;
  var I = r + 103336, C = r + 103388, K = u | 0, J = u + 8 | 0;
  h[J >> 2] = 128;
  h[p + 1] = 0;
  var N = Wk(1024);
  h[p] = N;
  Xk(N, h[J >> 2] << 3);
  for (var B = (u + 12 | 0) >> 2, F = B + 14; B < F; B++) {
    h[B] = 0;
  }
  for (var H = 0, O = 1; ; ) {
    (H | 0) < 14 || G(y.e | 0, 73, y.nb | 0, y.Ub | 0);
    if ((O | 0) > (h[Pm + (H << 2) >> 2] | 0)) {
      var D = H + 1 | 0;
      a[Qm + O | 0] = D & 255;
      var Q = D;
    } else {
      a[Qm + O | 0] = H & 255, Q = H;
    }
    var P = O + 1 | 0;
    if ((P | 0) == 641) {
      break;
    }
    H = Q;
    O = P;
  }
  h[p + 25617] = 0;
  h[p + 25618] = 0;
  h[p + 25619] = 0;
  h[p + 25716] = 0;
  h[p + 25718] = -1;
  m = (u + 102884 | 0) >> 2;
  h[m] = 16;
  h[p + 25720] = 0;
  var M = Wk(576);
  j = (u + 102876 | 0) >> 2;
  h[j] = M;
  Xk(M, h[m] * 36 | 0);
  var Na = h[m] - 1 | 0, U = (Na | 0) > 0;
  a : do {
    if (U) {
      for (var L = 0; ; ) {
        var R = L + 1 | 0;
        h[(h[j] + L * 36 + 20 | 0) >> 2] = R;
        h[(h[j] + L * 36 + 32 | 0) >> 2] = -1;
        var la = h[m] - 1 | 0;
        if ((R | 0) >= (la | 0)) {
          var Da = la;
          break a;
        }
        L = R;
      }
    } else {
      Da = Na;
    }
  } while (0);
  h[(h[j] + Da * 36 + 20 | 0) >> 2] = -1;
  h[(h[j] + (h[m] - 1) * 36 + 32 | 0) >> 2] = -1;
  h[p + 25722] = 0;
  h[p + 25723] = 0;
  h[p + 25724] = 0;
  h[p + 25725] = 0;
  h[p + 25730] = 16;
  h[p + 25731] = 0;
  var Y = Wk(192);
  h[p + 25729] = Y;
  h[p + 25727] = 16;
  h[p + 25728] = 0;
  var Z = Wk(64);
  h[p + 25726] = Z;
  h[p + 25733] = 0;
  h[p + 25734] = 0;
  h[p + 25735] = Rm;
  h[p + 25736] = Sm;
  var W = u + 102948 | 0, wa = u + 102968 | 0;
  h[p + 25745] = 0;
  h[p + 25746] = 0;
  i = (u + 102952 | 0) >> 2;
  h[i] = 0;
  h[p + 25739] = 0;
  g = (u + 102960 | 0) >> 2;
  h[g] = 0;
  h[p + 25741] = 0;
  a[u + 102992 | 0] = 1;
  a[u + 102993 | 0] = 1;
  a[u + 102994 | 0] = 0;
  a[u + 102995 | 0] = 1;
  var X = u + 102976 | 0;
  a[X] = 1;
  h[wa >> 2] = 0;
  h[wa + 4 >> 2] = -1054867456;
  f = (u + 102868 | 0) >> 2;
  h[f] = 4;
  l[p + 25747] = 0;
  h[W >> 2] = K;
  e = (u + 102996 | 0) >> 2;
  h[e] = 0;
  h[e + 1] = 0;
  h[e + 2] = 0;
  h[e + 3] = 0;
  h[e + 4] = 0;
  h[e + 5] = 0;
  h[e + 6] = 0;
  h[e + 7] = 0;
  a[X] = 0;
  h[q + 11] = 0;
  var aa = z + 36 | 0;
  d = (z + 4 | 0) >> 2;
  h[d] = 0;
  h[d + 1] = 0;
  h[d + 2] = 0;
  h[d + 3] = 0;
  h[d + 4] = 0;
  h[d + 5] = 0;
  h[d + 6] = 0;
  h[d + 7] = 0;
  a[aa] = 1;
  a[z + 37 | 0] = 1;
  a[z + 38 | 0] = 0;
  a[z + 39 | 0] = 0;
  h[q] = 0;
  a[z + 40 | 0] = 1;
  l[q + 12] = 1;
  var ga = co(K, 152);
  if ((ga | 0) == 0) {
    var ca = 0;
  } else {
    eo(ga, z, u), ca = ga;
  }
  h[ca + 92 >> 2] = 0;
  h[ca + 96 >> 2] = h[i];
  var La = h[i];
  (La | 0) != 0 && (h[(La + 92 | 0) >> 2] = ca);
  h[i] = ca;
  h[g] = h[g] + 1 | 0;
  h[o] = op + 8 | 0;
  h[o + 1] = 1;
  l[o + 2] = .009999999776482582;
  l[o + 7] = 0;
  l[o + 8] = 0;
  l[o + 9] = 0;
  l[o + 10] = 0;
  var Ua = E + 44 | 0, Va = E + 45 | 0, ma = E + 12 | 0;
  h[ma >> 2] = -1038090240;
  h[ma + 4 >> 2] = 0;
  var xa = E + 20 | 0;
  h[xa >> 2] = 1109393408;
  h[xa + 4 >> 2] = 0;
  a[Ua] = 0;
  a[Va] = 0;
  b[r + 22 >> 1] = 1;
  b[r + 24 >> 1] = -1;
  b[r + 26 >> 1] = 0;
  var ua = r | 0;
  h[r + 4 >> 2] = 0;
  l[r + 8 >> 2] = .20000000298023224;
  l[r + 12 >> 2] = 0;
  var da = r + 16 | 0;
  a[r + 20 | 0] = 0;
  h[ua >> 2] = E;
  l[da >> 2] = 0;
  pp(ca, r);
  h[n] = qp + 8 | 0;
  h[n + 1] = 2;
  l[n + 2] = .009999999776482582;
  var ya = A + 12 | 0, Ha = A + 16 | 0;
  h[n + 37] = 4;
  l[n + 5] = -.5;
  l[n + 6] = -.5;
  l[n + 7] = .5;
  l[n + 8] = -.5;
  l[n + 9] = .5;
  l[n + 10] = .5;
  l[n + 11] = -.5;
  l[n + 12] = .5;
  l[n + 21] = 0;
  l[n + 22] = -1;
  l[n + 23] = 1;
  l[n + 24] = 0;
  l[n + 25] = 0;
  l[n + 26] = 1;
  l[n + 27] = -1;
  l[n + 28] = 0;
  l[ya >> 2] = 0;
  l[Ha >> 2] = 0;
  var ab = I + 44 | 0, bb = I + 36 | 0;
  c = (I + 4 | 0) >> 2;
  for (var ob = I + 37 | 0, gb = I + 38 | 0, yb = I + 39 | 0, db = I | 0, eb = I + 40 | 0, pa = I + 48 | 0, $ = I + 4 | 0, Oa = s + 22 | 0, ea = s + 24 | 0, ha = s + 26 | 0, ja = s | 0, ka = s + 4 | 0, za = s + 8 | 0, qa = s + 12 | 0, Aa = s + 16 | 0, fb = s + 20 | 0, na = 0, Pa = -7, mb = .75; ; ) {
    if ((na | 0) >= 40) {
      var lb = 0;
      break;
    }
    for (var pb = na, Cb = Pa, hb = mb; ; ) {
      if ((pb | 0) >= 40) {
        break;
      }
      h[ab >> 2] = 0;
      h[c] = 0;
      h[c + 1] = 0;
      h[c + 2] = 0;
      h[c + 3] = 0;
      h[c + 4] = 0;
      h[c + 5] = 0;
      h[c + 6] = 0;
      h[c + 7] = 0;
      a[bb] = 1;
      a[ob] = 1;
      a[gb] = 0;
      a[yb] = 0;
      a[eb] = 1;
      l[pa >> 2] = 1;
      h[db >> 2] = 2;
      var Qa = (x[0] = Cb, t[0]), ba = (x[0] = hb, t[0]) | 0;
      h[$ >> 2] = 0 | Qa;
      h[$ + 4 >> 2] = ba;
      var ra = h[f];
      if ((ra & 2 | 0) == 0) {
        var Ma = ra;
      } else {
        G(y.r | 0, 109, y.rb | 0, y.Gb | 0), Ma = h[f];
      }
      if ((Ma & 2 | 0) == 0) {
        var Wa = co(K, 152);
        if ((Wa | 0) == 0) {
          var Ca = 0;
        } else {
          var Ba = Wa;
          eo(Wa, I, u);
          Ca = Ba;
        }
        h[Ca + 92 >> 2] = 0;
        h[Ca + 96 >> 2] = h[i];
        var Xa = h[i];
        (Xa | 0) != 0 && (h[(Xa + 92 | 0) >> 2] = Ca);
        h[i] = Ca;
        h[g] = h[g] + 1 | 0;
        var fa = Ca;
      } else {
        fa = 0;
      }
      b[Oa >> 1] = 1;
      b[ea >> 1] = -1;
      b[ha >> 1] = 0;
      h[ka >> 2] = 0;
      l[za >> 2] = .20000000298023224;
      l[qa >> 2] = 0;
      a[fb] = 0;
      h[ja >> 2] = A;
      l[Aa >> 2] = 5;
      pp(fa, s);
      pb = pb + 1 | 0;
      Cb += 1.125;
    }
    na = na + 1 | 0;
    Pa += .5625;
    mb += 1;
  }
  for (;;) {
    if ((lb | 0) >= 64) {
      var Ra = 0;
      break;
    }
    rp(u);
    lb = lb + 1 | 0;
  }
  for (;;) {
    if ((Ra | 0) >= 100) {
      break;
    }
    var Za = sp();
    rp(u);
    var nb = sp() - Za | 0;
    h[C + (Ra << 2) >> 2] = nb;
    var Fb = (nb >>> 0) / 1e3 * 1e3, qb = (Ii = qg, qg += 8, Uk[0] = Fb, h[Ii >> 2] = t[0], h[Ii + 4 >> 2] = t[1], Ii);
    tp(qb);
    Ra = Ra + 1 | 0;
  }
  var Ia = h[up >> 2];
  a[vp] = Km(10);
  if (wp(Ia, vp, 1) == -1 && Ia in xp) {
    xp[Ia].error = !0;
  }
  for (var rb = 0, Ya = 0; ; ) {
    var oa = h[C + (Ya << 2) >> 2] + rb | 0, Fa = Ya + 1 | 0;
    if ((Fa | 0) == 256) {
      break;
    }
    rb = oa;
    Ya = Fa;
  }
  var $a = (oa >>> 0) * .00390625 / 1e3 * 1e3, Ea = (Ii = qg, qg += 8, Uk[0] = $a, h[Ii >> 2] = t[0], h[Ii + 4 >> 2] = t[1], Ii);
  tp(Ea);
  var Ga, Ja, Sa = u >> 2, vb = h[Sa + 25738];
  a : for (;;) {
    if ((vb | 0) == 0) {
      break;
    }
    for (var Gb = h[vb + 96 >> 2], zb = h[vb + 100 >> 2]; ; ) {
      if ((zb | 0) == 0) {
        vb = Gb;
        continue a;
      }
      var Nb = h[zb + 4 >> 2];
      h[zb + 28 >> 2] = 0;
      Ja = (zb + 12 | 0) >> 2;
      var Ob = h[Ja], Db = Wl[h[h[Ob >> 2] + 12 >> 2]](Ob), Pb = zb + 24 | 0, Ab = k[Pb >> 2], Eb = Ab, sb = Db * 28 | 0, cb = (sb | 0) == 0;
      b : do {
        if (!cb) {
          var Mb = (sb | 0) > 0;
          do {
            if (Mb) {
              if ((sb | 0) <= 640) {
                break;
              }
              yp(Eb);
              break b;
            }
            G(y.e | 0, 164, y.h | 0, y.za | 0);
          } while (0);
          var wb = Dh[Qm + sb | 0], tb = wb & 255;
          (wb & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
          var V = Ab, ia = (tb << 2) + u + 12 | 0;
          h[Ab >> 2] = h[ia >> 2];
          h[ia >> 2] = V;
        }
      } while (0);
      h[Pb >> 2] = 0;
      var Hb = k[Ja];
      Ga = Hb >> 2;
      var Qb = h[Ga + 1];
      if (Qb == 0) {
        Wl[h[h[Ga] >> 2]](Hb);
        var Bb = Dh[Qm + 20 | 0], Ib = Bb & 255;
        (Bb & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
        var Xb = Hb, ec = (Ib << 2) + u + 12 | 0;
        h[Ga] = h[ec >> 2];
        h[ec >> 2] = Xb;
      } else {
        if (Qb == 1) {
          Wl[h[h[Ga] >> 2]](Hb);
          var Ka = Dh[Qm + 48 | 0], Jb = Ka & 255;
          (Ka & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
          var S = Hb, ub = (Jb << 2) + u + 12 | 0;
          h[Ga] = h[ub >> 2];
          h[ub >> 2] = S;
        } else {
          if (Qb == 2) {
            Wl[h[h[Ga] >> 2]](Hb);
            var Kb = Dh[Qm + 152 | 0], sa = Kb & 255;
            (Kb & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
            var Rb = Hb, ic = (sa << 2) + u + 12 | 0;
            h[Ga] = h[ic >> 2];
            h[ic >> 2] = Rb;
          } else {
            if (Qb == 3) {
              Wl[h[h[Ga] >> 2]](Hb);
              var $b = Dh[Qm + 40 | 0], ac = $b & 255;
              ($b & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
              var lc = Hb, yc = (ac << 2) + u + 12 | 0;
              h[Ga] = h[yc >> 2];
              h[yc >> 2] = lc;
            } else {
              G(y.Ob | 0, 115, y.tb | 0, y.f | 0);
            }
          }
        }
      }
      h[Ja] = 0;
      zb = Nb;
    }
  }
  yp(h[Sa + 25726]);
  yp(h[Sa + 25729]);
  yp(h[Sa + 25719]);
  (h[Sa + 25617] | 0) != 0 && G(y.j | 0, 32, y.da | 0, y.Vb | 0);
  (h[Sa + 25716] | 0) != 0 && G(y.j | 0, 33, y.da | 0, y.ac | 0);
  var Gc = u + 4 | 0, zc = (h[Gc >> 2] | 0) > 0, mc = u | 0, bc = h[mc >> 2];
  a : do {
    if (zc) {
      for (var cc = 0, Sb = bc; ; ) {
        yp(h[Sb + (cc << 3) + 4 >> 2]);
        var Lb = cc + 1 | 0, ib = h[mc >> 2];
        if ((Lb | 0) >= (h[Gc >> 2] | 0)) {
          var Tb = ib;
          break a;
        }
        cc = Lb;
        Sb = ib;
      }
    } else {
      Tb = bc;
    }
  } while (0);
  yp(Tb);
  qg = r;
  return 0;
}

Module._main = Om;

function zp(c, d, e, f, g, i) {
  var j, m, n, o, q, p, r, s, u, z, E, A, I, C, K, J, N, B, F, H, O, D, Q, P, M, Na, U, L, R, la, Da, Y, Z, W, wa, X, aa, ga, ca, La, Ua, Va, ma, xa, ua, da, ya, Ha, ab, bb, ob, gb, yb, db, eb, pa = g >> 2, $ = c >> 2, Oa = qg;
  qg += 72;
  var ea, ha = Oa + 24;
  eb = ha >> 2;
  var ja = Oa + 48;
  db = ja >> 2;
  var ka = c + 132 | 0, za = l[f + 12 >> 2], qa = l[i + 8 >> 2], Aa = l[f + 8 >> 2], fb = l[i + 12 >> 2], na = za * qa - Aa * fb, Pa = za * fb + Aa * qa, mb = (x[0] = na, t[0]), lb = (x[0] = Pa, t[0]), pb = 0 | mb, Cb = lb | 0, hb = l[i >> 2] - l[f >> 2], Qa = l[i + 4 >> 2] - l[f + 4 >> 2], ba = za * hb + Aa * Qa, ra = hb * -Aa + za * Qa, Ma = (x[0] = ba, t[0]), Wa = (x[0] = ra, t[0]) | 0;
  h[ka >> 2] = 0 | Ma;
  h[ka + 4 >> 2] = Wa;
  var Ca = c + 140 | 0;
  h[Ca >> 2] = pb;
  h[Ca + 4 >> 2] = Cb;
  yb = (c + 144 | 0) >> 2;
  var Ba = l[pa + 3];
  gb = (c + 140 | 0) >> 2;
  var Xa = l[pa + 4];
  ob = (ka | 0) >> 2;
  var fa = Pa * Ba - na * Xa + ba;
  bb = (c + 136 | 0) >> 2;
  var Ra = na * Ba + Pa * Xa + ra, Za = c + 148 | 0, nb = (x[0] = fa, t[0]), Fb = (x[0] = Ra, t[0]) | 0;
  h[Za >> 2] = 0 | nb;
  h[Za + 4 >> 2] = Fb;
  var qb = e + 28 | 0, Ia = c + 156 | 0, rb = h[qb >> 2], Ya = h[qb + 4 >> 2];
  h[Ia >> 2] = rb;
  h[Ia + 4 >> 2] = Ya;
  var oa = e + 12 | 0, Fa = c + 164 | 0, $a = h[oa >> 2], Ea = h[oa + 4 >> 2];
  h[Fa >> 2] = $a;
  h[Fa + 4 >> 2] = Ea;
  var Ga = e + 20 | 0, Ja = c + 172 | 0, Sa = h[Ga >> 2], vb = h[Ga + 4 >> 2];
  h[Ja >> 2] = Sa;
  h[Ja + 4 >> 2] = vb;
  var Gb = e + 36 | 0, zb = c + 180 | 0, Nb = h[Gb >> 2], Ob = h[Gb + 4 >> 2];
  h[zb >> 2] = Nb;
  h[zb + 4 >> 2] = Ob;
  var Db = a[e + 44 | 0] & 1, Pb = Db << 24 >> 24 != 0, Ab = a[e + 45 | 0], Eb = (Ab & 1) << 24 >> 24 != 0, sb = (t[0] = Sa, x[0]), cb = (t[0] = $a, x[0]), Mb = sb - cb, wb = (t[0] = vb, x[0]), tb = c + 168 | 0, V = (t[0] = Ea, x[0]), ia = wb - V, Hb = Nm(Mb * Mb + ia * ia), Qb = Hb < 1.1920928955078125e-7, Bb = (t[0] = rb, x[0]), Ib = (t[0] = Ya, x[0]), Xb = (t[0] = Nb, x[0]), ec = (t[0] = Ob, x[0]);
  if (Qb) {
    var Ka = Mb, Jb = ia;
  } else {
    var S = 1 / Hb, Ka = Mb * S, Jb = ia * S;
  }
  var ub = c + 196 | 0, Kb = -Ka;
  ab = (ub | 0) >> 2;
  l[ab] = Jb;
  Ha = (c + 200 | 0) >> 2;
  l[Ha] = Kb;
  var sa = Jb * (fa - cb) + (Ra - V) * Kb;
  if (Pb) {
    var Rb = cb - Bb, ic = V - Ib, $b = Nm(Rb * Rb + ic * ic);
    if ($b < 1.1920928955078125e-7) {
      var ac = Rb, lc = ic;
    } else {
      var yc = 1 / $b, ac = Rb * yc, lc = ic * yc;
    }
    var Gc = -ac;
    l[$ + 47] = lc;
    l[$ + 48] = Gc;
    var zc = ac * Jb - lc * Ka >= 0, mc = lc * (fa - Bb) + (Ra - Ib) * Gc;
  } else {
    mc = zc = 0;
  }
  a : do {
    if (Eb) {
      var bc = Xb - sb, cc = ec - wb, Sb = Nm(bc * bc + cc * cc);
      if (Sb < 1.1920928955078125e-7) {
        var Lb = bc, ib = cc;
      } else {
        var Tb = 1 / Sb, Lb = bc * Tb, ib = cc * Tb;
      }
      var dc = -Lb;
      ya = (c + 204 | 0) >> 2;
      l[ya] = ib;
      da = (c + 208 | 0) >> 2;
      l[da] = dc;
      var Ac = Ka * ib - Jb * Lb > 0, Hc = ib * (fa - sb) + (Ra - wb) * dc;
      if ((Db & Ab) << 24 >> 24 == 0) {
        var Ic = Hc, fc = Ac;
        ea = 37;
      } else {
        if (zc & Ac) {
          var od = mc < 0 & sa < 0;
          do {
            if (od) {
              var Wc = Hc >= 0;
              a[c + 248 | 0] = Wc & 1;
              var Qc = c + 212 | 0;
              if (Wc) {
                var xb = Qc;
                break;
              }
              var Wb = Qc, oc = (x[0] = -Jb, t[0]), Tc = (x[0] = Ka, t[0]), Jc = 0 | oc, Kc = Tc | 0, gc = Wb | 0;
              ua = gc >> 2;
              h[ua] = Jc;
              var Bc = Wb + 4 | 0;
              xa = Bc >> 2;
              h[xa] = Kc;
              var Rc = c + 228 | 0, jc = Rc | 0;
              ma = jc >> 2;
              h[ma] = Jc;
              var Lc = Rc + 4 | 0;
              Va = Lc >> 2;
              h[Va] = Kc;
              var vd = c + 236 | 0, tc = vd | 0;
              Ua = tc >> 2;
              h[Ua] = Jc;
              var uc = vd + 4 | 0;
              La = uc >> 2;
              h[La] = Kc;
              ea = 64;
              break a;
            }
            a[c + 248 | 0] = 1;
            xb = c + 212 | 0;
          } while (0);
          var Xc = ub, wd = xb, jb = Xc | 0;
          ca = jb >> 2;
          var rc = h[ca], Ub = Xc + 4 | 0;
          ga = Ub >> 2;
          var xd = h[ga], nc = wd | 0;
          aa = nc >> 2;
          h[aa] = rc;
          var Yb = wd + 4 | 0;
          X = Yb >> 2;
          h[X] = xd;
          var yd = c + 188 | 0, Od = c + 228 | 0, cd = yd | 0;
          wa = cd >> 2;
          var dd = h[wa], Yc = yd + 4 | 0;
          W = Yc >> 2;
          var ed = h[W], pc = Od | 0;
          Z = pc >> 2;
          h[Z] = dd;
          var Mc = Od + 4 | 0;
          Y = Mc >> 2;
          h[Y] = ed;
          var Uc = c + 204 | 0, fd = c + 236 | 0, Cc = Uc | 0;
          Da = Cc >> 2;
          var pd = h[Da], zd = Uc + 4 | 0;
          la = zd >> 2;
          var be = h[la];
          h[fd >> 2] = pd;
          h[fd + 4 >> 2] = be;
        } else {
          if (zc) {
            var Jd = mc < 0;
            do {
              if (Jd) {
                if (sa < 0) {
                  a[c + 248 | 0] = 0;
                  var Pd = c + 212 | 0;
                } else {
                  var qd = Hc >= 0;
                  a[c + 248 | 0] = qd & 1;
                  var kc = c + 212 | 0;
                  if (qd) {
                    var hc = kc;
                    break;
                  }
                  Pd = kc;
                }
                var vc = Pd, gd = (x[0] = -Jb, t[0]), hd = (x[0] = Ka, t[0]) | 0, qc = vc | 0;
                R = qc >> 2;
                h[R] = 0 | gd;
                var Zb = vc + 4 | 0;
                L = Zb >> 2;
                h[L] = hd;
                var Ad = -l[da], id = c + 228 | 0, ce = (x[0] = -l[ya], t[0]), Qd = (x[0] = Ad, t[0]) | 0, Rd = id | 0;
                U = Rd >> 2;
                h[U] = 0 | ce;
                var Zc = id + 4 | 0;
                Na = Zc >> 2;
                h[Na] = Qd;
                var Bd = -l[Ha], jd = c + 236 | 0, Cd = (x[0] = -l[ab], t[0]), kd = (x[0] = Bd, t[0]) | 0;
                h[jd >> 2] = 0 | Cd;
                h[jd + 4 >> 2] = kd;
                ea = 64;
                break a;
              }
              a[c + 248 | 0] = 1;
              hc = c + 212 | 0;
            } while (0);
            var Vc = ub, Sd = hc, jb = Vc | 0;
            ca = jb >> 2;
            var Dd = h[ca], Ub = Vc + 4 | 0;
            ga = Ub >> 2;
            var ye = h[ga], nc = Sd | 0;
            aa = nc >> 2;
            h[aa] = Dd;
            Yb = Sd + 4 | 0;
            X = Yb >> 2;
            h[X] = ye;
            var Xd = c + 188 | 0, pe = c + 228 | 0, cd = Xd | 0;
            wa = cd >> 2;
            var Le = h[wa], Yc = Xd + 4 | 0;
            W = Yc >> 2;
            var qe = h[W], pc = pe | 0;
            Z = pc >> 2;
            h[Z] = Le;
            Mc = pe + 4 | 0;
            Y = Mc >> 2;
            h[Y] = qe;
            var Nc = c + 236 | 0, Kd = Vc | 0;
            M = Kd >> 2;
            var Ld = h[M], ld = Vc + 4 | 0;
            P = ld >> 2;
            var de = h[P], Sc = Nc | 0;
            Q = Sc >> 2;
            h[Q] = Ld;
            var md = Nc + 4 | 0;
            D = md >> 2;
            h[D] = de;
          } else {
            if (Ac) {
              var Me = Hc < 0;
              do {
                if (Me) {
                  if (mc < 0) {
                    a[c + 248 | 0] = 0;
                    var ze = c + 212 | 0;
                  } else {
                    var ee = sa >= 0;
                    a[c + 248 | 0] = ee & 1;
                    var cf = c + 212 | 0;
                    if (ee) {
                      var df = cf;
                      break;
                    }
                    ze = cf;
                  }
                  var ef = ze, Qf = (x[0] = -Jb, t[0]), Ae = (x[0] = Ka, t[0]) | 0, qc = ef | 0;
                  R = qc >> 2;
                  h[R] = 0 | Qf;
                  Zb = ef + 4 | 0;
                  L = Zb >> 2;
                  h[L] = Ae;
                  var rg = -l[Ha], re = c + 228 | 0, Be = (x[0] = -l[ab], t[0]), Rf = (x[0] = rg, t[0]) | 0, Rd = re | 0;
                  U = Rd >> 2;
                  h[U] = 0 | Be;
                  Zc = re + 4 | 0;
                  Na = Zc >> 2;
                  h[Na] = Rf;
                  var Ne = -l[$ + 48], ff = c + 236 | 0, sg = (x[0] = -l[$ + 47], t[0]), Sf = (x[0] = Ne, t[0]) | 0, Tf = ff | 0;
                  h[Tf >> 2] = 0 | sg;
                  var uf = ff + 4 | 0;
                  h[uf >> 2] = Sf;
                  ea = 64;
                  break a;
                }
                a[c + 248 | 0] = 1;
                df = c + 212 | 0;
              } while (0);
              var se = ub, tg = df, jb = se | 0;
              ca = jb >> 2;
              var Uf = h[ca], Ub = se + 4 | 0;
              ga = Ub >> 2;
              var Vf = h[ga], nc = tg | 0;
              aa = nc >> 2;
              h[aa] = Uf;
              Yb = tg + 4 | 0;
              X = Yb >> 2;
              h[X] = Vf;
              var Yg = c + 228 | 0, qc = se | 0;
              R = qc >> 2;
              var Fh = h[R], Zb = se + 4 | 0;
              L = Zb >> 2;
              var ug = h[L];
              h[Yg >> 2] = Fh;
              h[Yg + 4 >> 2] = ug;
              var gf = c + 204 | 0, vg = c + 236 | 0, Kd = gf | 0;
              M = Kd >> 2;
              var Zg = h[M], ld = gf + 4 | 0;
              P = ld >> 2;
              var $g = h[P], Sc = vg | 0;
              Q = Sc >> 2;
              h[Q] = Zg;
              md = vg + 4 | 0;
              D = md >> 2;
              h[D] = $g;
            } else {
              var ah = mc < 0 | sa < 0;
              do {
                if (!ah) {
                  var vf = Hc >= 0;
                  a[c + 248 | 0] = vf & 1;
                  var hf = c + 212 | 0;
                  if (!vf) {
                    var jf = hf;
                    break;
                  }
                  var wf = ub, Wf = hf, Ed = wf | 0;
                  O = Ed >> 2;
                  var Ce = k[O], wc = wf + 4 | 0;
                  H = wc >> 2;
                  var Oe = k[H], Fd = Wf | 0;
                  F = Fd >> 2;
                  h[F] = Ce;
                  var Gd = Wf + 4 | 0;
                  B = Gd >> 2;
                  h[B] = Oe;
                  var Xf = c + 228 | 0, gc = Xf | 0;
                  ua = gc >> 2;
                  h[ua] = Ce;
                  Bc = Xf + 4 | 0;
                  xa = Bc >> 2;
                  h[xa] = Oe;
                  var bh = c + 236 | 0, jc = bh | 0;
                  ma = jc >> 2;
                  h[ma] = Ce;
                  Lc = bh + 4 | 0;
                  Va = Lc >> 2;
                  h[Va] = Oe;
                  ea = 64;
                  break a;
                }
                a[c + 248 | 0] = 0;
                jf = c + 212 | 0;
              } while (0);
              var ch = jf, wg = (x[0] = -Jb, t[0]), xg = (x[0] = Ka, t[0]) | 0, qc = ch | 0;
              R = qc >> 2;
              h[R] = 0 | wg;
              Zb = ch + 4 | 0;
              L = Zb >> 2;
              h[L] = xg;
              var Td = -l[da], sc = c + 228 | 0, Gh = (x[0] = -l[ya], t[0]), xf = (x[0] = Td, t[0]) | 0, Rd = sc | 0;
              U = Rd >> 2;
              h[U] = 0 | Gh;
              Zc = sc + 4 | 0;
              Na = Zc >> 2;
              h[Na] = xf;
              var Yf = -l[$ + 48], Ud = c + 236 | 0, Zf = (x[0] = -l[$ + 47], t[0]), Hh = (x[0] = Yf, t[0]) | 0, Tf = Ud | 0;
              h[Tf >> 2] = 0 | Zf;
              uf = Ud + 4 | 0;
              h[uf >> 2] = Hh;
            }
          }
        }
        ea = 64;
      }
    } else {
      fc = Ic = 0, ea = 37;
    }
  } while (0);
  a : do {
    if (ea == 37) {
      if (Pb) {
        var Pe = mc >= 0;
        if (zc) {
          do {
            if (!Pe) {
              var yg = sa >= 0;
              a[c + 248 | 0] = yg & 1;
              var yf = c + 212 | 0;
              if (yg) {
                var kf = yf;
                break;
              }
              var Hd = yf, $f = (x[0] = -Jb, t[0]), dh = (x[0] = Ka, t[0]), zg = dh | 0, gc = Hd | 0;
              ua = gc >> 2;
              h[ua] = 0 | $f;
              Bc = Hd + 4 | 0;
              xa = Bc >> 2;
              h[xa] = zg;
              var ag = ub, Ag = c + 228 | 0, pc = ag | 0;
              Z = pc >> 2;
              var bg = h[Z], Mc = ag + 4 | 0;
              Y = Mc >> 2;
              var cg = h[Y], Md = Ag | 0;
              N = Md >> 2;
              h[N] = bg;
              var te = Ag + 4 | 0;
              J = te >> 2;
              h[J] = cg;
              var fe = c + 236 | 0, Bg = -(t[0] = bg, x[0]), dg = fe, Cg = 0 | (x[0] = Bg, t[0]), ge = dh | 0;
              h[dg >> 2] = Cg;
              h[dg + 4 >> 2] = ge;
              break a;
            }
            a[c + 248 | 0] = 1;
            kf = c + 212 | 0;
          } while (0);
          var he = ub, zf = kf, jb = he | 0;
          ca = jb >> 2;
          var Qe = h[ca], Ub = he + 4 | 0;
          ga = Ub >> 2;
          var ie = h[ga], nc = zf | 0;
          aa = nc >> 2;
          h[aa] = Qe;
          Yb = zf + 4 | 0;
          X = Yb >> 2;
          h[X] = ie;
          var lf = c + 188 | 0, Af = c + 228 | 0, cd = lf | 0;
          wa = cd >> 2;
          var Dg = h[wa], Yc = lf + 4 | 0;
          W = Yc >> 2;
          var eh = h[W], pc = Af | 0;
          Z = pc >> 2;
          h[Z] = Dg;
          Mc = Af + 4 | 0;
          Y = Mc >> 2;
          h[Y] = eh;
          var Id = -l[Ha], De = c + 236 | 0, rd = (x[0] = -l[ab], t[0]), Eg = (x[0] = Id, t[0]) | 0, mf = De | 0;
          h[mf >> 2] = 0 | rd;
          var Ee = De + 4 | 0;
          h[Ee >> 2] = Eg;
        } else {
          do {
            if (Pe) {
              var Re = sa >= 0;
              a[c + 248 | 0] = Re & 1;
              var Vd = c + 212 | 0;
              if (!Re) {
                var Bf = Vd;
                break;
              }
              var eg = ub, nf = Vd, Ed = eg | 0;
              O = Ed >> 2;
              var Yd = k[O], wc = eg + 4 | 0;
              H = wc >> 2;
              var Fe = k[H], Fd = nf | 0;
              F = Fd >> 2;
              h[F] = Yd;
              Gd = nf + 4 | 0;
              B = Gd >> 2;
              h[B] = Fe;
              var Ge = c + 228 | 0, gc = Ge | 0;
              ua = gc >> 2;
              h[ua] = Yd;
              Bc = Ge + 4 | 0;
              xa = Bc >> 2;
              h[xa] = Fe;
              var Ih = c + 236 | 0, Fg = -(t[0] = Yd, x[0]), Se = Ih, of = (x[0] = Fg, t[0]), Cf = (x[0] = Ka, t[0]) | 0, He = Se | 0;
              K = He >> 2;
              h[K] = 0 | of;
              var fg = Se + 4 | 0;
              C = fg >> 2;
              h[C] = Cf;
              break a;
            }
            a[c + 248 | 0] = 0;
            Bf = c + 212 | 0;
          } while (0);
          var pf = Bf, Df = (x[0] = -Jb, t[0]), Gg = (x[0] = Ka, t[0]) | 0, qc = pf | 0;
          R = qc >> 2;
          h[R] = 0 | Df;
          Zb = pf + 4 | 0;
          L = Zb >> 2;
          h[L] = Gg;
          var Ef = ub, gg = c + 228 | 0, $c = Ef | 0;
          I = $c >> 2;
          var Yk = h[I], sd = Ef + 4 | 0;
          A = sd >> 2;
          var Hj = h[A], tc = gg | 0;
          Ua = tc >> 2;
          h[Ua] = Yk;
          uc = gg + 4 | 0;
          La = uc >> 2;
          h[La] = Hj;
          var Ff = -l[$ + 48], qf = c + 236 | 0, Ji = (x[0] = -l[$ + 47], t[0]), Zd = (x[0] = Ff, t[0]) | 0, Gf = qf | 0;
          h[Gf >> 2] = 0 | Ji;
          var rf = qf + 4 | 0;
          h[rf >> 2] = Zd;
        }
      } else {
        var Hg = sa >= 0;
        if (Eb) {
          if (fc) {
            do {
              if (!Hg) {
                var Jh = Ic >= 0;
                a[c + 248 | 0] = Jh & 1;
                var Kh = c + 212 | 0;
                if (Jh) {
                  var Lh = Kh;
                  break;
                }
                var fh = Kh, Ki = (x[0] = -Jb, t[0]), Li = (x[0] = Ka, t[0]), Mi = 0 | Ki, Ni = Li | 0, gc = fh | 0;
                ua = gc >> 2;
                h[ua] = Mi;
                Bc = fh + 4 | 0;
                xa = Bc >> 2;
                h[xa] = Ni;
                var Oi = c + 228 | 0, jc = Oi | 0;
                ma = jc >> 2;
                h[ma] = Mi;
                Lc = Oi + 4 | 0;
                Va = Lc >> 2;
                h[Va] = Ni;
                var hg = ub, ig = c + 236 | 0, Kd = hg | 0;
                M = Kd >> 2;
                var Pi = h[M], ld = hg + 4 | 0;
                P = ld >> 2;
                var ue = h[P], Sc = ig | 0;
                Q = Sc >> 2;
                h[Q] = Pi;
                md = ig + 4 | 0;
                D = md >> 2;
                h[D] = ue;
                break a;
              }
              a[c + 248 | 0] = 1;
              Lh = c + 212 | 0;
            } while (0);
            var Ig = ub, Qi = Lh, jb = Ig | 0;
            ca = jb >> 2;
            var Ri = h[ca], Ub = Ig + 4 | 0;
            ga = Ub >> 2;
            var Si = h[ga], nc = Qi | 0;
            aa = nc >> 2;
            h[aa] = Ri;
            Yb = Qi + 4 | 0;
            X = Yb >> 2;
            h[X] = Si;
            var Hf = -l[Ha], Mh = c + 228 | 0, Ti = (x[0] = -l[ab], t[0]), gh = (x[0] = Hf, t[0]) | 0, Cc = Mh | 0;
            Da = Cc >> 2;
            h[Da] = 0 | Ti;
            zd = Mh + 4 | 0;
            la = zd >> 2;
            h[la] = gh;
            var Dc = c + 204 | 0, hh = c + 236 | 0, Te = Dc | 0, Ui = h[Te >> 2], Nh = Dc + 4 | 0, Vi = h[Nh >> 2], mf = hh | 0;
            h[mf >> 2] = Ui;
            Ee = hh + 4 | 0;
            h[Ee >> 2] = Vi;
          } else {
            do {
              if (Hg) {
                var Wi = Ic >= 0;
                a[c + 248 | 0] = Wi & 1;
                var Oh = c + 212 | 0;
                if (!Wi) {
                  var Jg = Oh;
                  break;
                }
                var ve = ub, Ie = Oh, Ed = ve | 0;
                O = Ed >> 2;
                var Ph = k[O], wc = ve + 4 | 0;
                H = wc >> 2;
                var Qh = k[H], Fd = Ie | 0;
                F = Fd >> 2;
                h[F] = Ph;
                Gd = Ie + 4 | 0;
                B = Gd >> 2;
                h[B] = Qh;
                var If = c + 228 | 0, Xi = -(t[0] = Ph, x[0]), ih = If, jh = (x[0] = Xi, t[0]), Zk = (x[0] = Ka, t[0]) | 0, Kg = ih | 0;
                h[Kg >> 2] = 0 | jh;
                var kh = ih + 4 | 0;
                h[kh >> 2] = Zk;
                var Jf = c + 236 | 0, He = Jf | 0;
                K = He >> 2;
                h[K] = Ph;
                fg = Jf + 4 | 0;
                C = fg >> 2;
                h[C] = Qh;
                break a;
              }
              a[c + 248 | 0] = 0;
              Jg = c + 212 | 0;
            } while (0);
            var lh = Jg, Rh = (x[0] = -Jb, t[0]), Ij = (x[0] = Ka, t[0]) | 0, qc = lh | 0;
            R = qc >> 2;
            h[R] = 0 | Rh;
            Zb = lh + 4 | 0;
            L = Zb >> 2;
            h[L] = Ij;
            var mh = -l[$ + 52], Lg = c + 228 | 0, Jj = (x[0] = -l[$ + 51], t[0]), Kj = (x[0] = mh, t[0]) | 0, Te = Lg | 0;
            h[Te >> 2] = 0 | Jj;
            Nh = Lg + 4 | 0;
            h[Nh >> 2] = Kj;
            var Sh = ub, Th = c + 236 | 0, jg = h[Sh >> 2], Yi = h[Sh + 4 >> 2], Gf = Th | 0;
            h[Gf >> 2] = jg;
            rf = Th + 4 | 0;
            h[rf >> 2] = Yi;
          }
        } else {
          a[c + 248 | 0] = Hg & 1;
          var Zi = c + 212 | 0;
          if (Hg) {
            var Uh = ub, Je = Zi, Ed = Uh | 0;
            O = Ed >> 2;
            var Vh = k[O], wc = Uh + 4 | 0;
            H = wc >> 2;
            var $i = h[H], Fd = Je | 0;
            F = Fd >> 2;
            h[F] = Vh;
            Gd = Je + 4 | 0;
            B = Gd >> 2;
            h[B] = $i;
            var Wh = c + 228 | 0, Mg = -(t[0] = Vh, x[0]), Xh = Wh, je = (x[0] = Mg, t[0]), Lj = (x[0] = Ka, t[0]), nh = 0 | je, Yh = Lj | 0, Kg = Xh | 0;
            h[Kg >> 2] = nh;
            kh = Xh + 4 | 0;
            h[kh >> 2] = Yh;
            var Zh = c + 236 | 0, He = Zh | 0;
            K = He >> 2;
            h[K] = nh;
            fg = Zh + 4 | 0;
            C = fg >> 2;
            h[C] = Yh;
          } else {
            var $h = Zi, ai = (x[0] = -Jb, t[0]), aj = (x[0] = Ka, t[0]) | 0, gc = $h | 0;
            ua = gc >> 2;
            h[ua] = 0 | ai;
            Bc = $h + 4 | 0;
            xa = Bc >> 2;
            h[xa] = aj;
            var bi = ub, ci = c + 228 | 0, pc = bi | 0;
            Z = pc >> 2;
            var Ng = h[Z], Mc = bi + 4 | 0;
            Y = Mc >> 2;
            var oh = h[Y], Md = ci | 0;
            N = Md >> 2;
            h[N] = Ng;
            te = ci + 4 | 0;
            J = te >> 2;
            h[J] = oh;
            var Kf = c + 236 | 0, Sc = Kf | 0;
            Q = Sc >> 2;
            h[Q] = Ng;
            md = Kf + 4 | 0;
            D = md >> 2;
            h[D] = oh;
          }
        }
      }
    }
  } while (0);
  E = (g + 148 | 0) >> 2;
  var Mj = h[E];
  z = (c + 128 | 0) >> 2;
  h[z] = Mj;
  var Nj = (h[E] | 0) > 0;
  a : do {
    if (Nj) {
      for (var sf = 0; ; ) {
        var di = l[yb], ei = l[((sf << 3) + 20 >> 2) + pa], bj = l[gb], fi = l[((sf << 3) + 24 >> 2) + pa], gi = bj * ei + di * fi + l[bb], cj = (sf << 3) + c | 0, hi = (x[0] = di * ei - bj * fi + l[ob], t[0]), Ue = (x[0] = gi, t[0]) | 0, Sc = cj | 0;
        Q = Sc >> 2;
        h[Q] = 0 | hi;
        md = cj + 4 | 0;
        D = md >> 2;
        h[D] = Ue;
        var ii = l[yb], Og = l[((sf << 3) + 84 >> 2) + pa], ji = l[gb], dj = l[((sf << 3) + 88 >> 2) + pa], ej = ji * Og + ii * dj, Lf = (sf << 3) + c + 64 | 0, fj = (x[0] = ii * Og - ji * dj, t[0]), gj = (x[0] = ej, t[0]) | 0;
        h[Lf >> 2] = 0 | fj;
        h[Lf + 4 >> 2] = gj;
        var ki = sf + 1 | 0;
        if ((ki | 0) >= (h[E] | 0)) {
          break a;
        }
        sf = ki;
      }
    }
  } while (0);
  u = (c + 244 | 0) >> 2;
  l[u] = .019999999552965164;
  var Mf = d + 60 | 0;
  h[Mf >> 2] = 0;
  var ph = c + 248 | 0, Nf = h[z], hj = (Nf | 0) > 0;
  a : do {
    if (hj) {
      for (var Bp = l[$ + 41], kg = l[tb >> 2], Tm = l[$ + 53], Oj = l[$ + 54], Pj = 0, $k = 3.4028234663852886e+38; ; ) {
        var Um = Tm * (l[(Pj << 3 >> 2) + $] - Bp) + Oj * (l[((Pj << 3) + 4 >> 2) + $] - kg), Vm = Um < $k ? Um : $k, al = Pj + 1 | 0;
        if ((al | 0) == (Nf | 0)) {
          var Qj = Vm;
          break a;
        }
        Pj = al;
        $k = Vm;
      }
    } else {
      Qj = 3.4028234663852886e+38;
    }
  } while (0);
  var qh = l[u], ij = Qj > qh;
  a : do {
    if (!ij) {
      for (var Wm = c + 216 | 0, jj = l[Wm >> 2], Rj = c + 212 | 0, kj = l[Rj >> 2], Xm = c + 164 | 0, Ym = c + 172 | 0, Zm = c + 176 | 0, $m = c + 228 | 0, bl = c + 232 | 0, cl = c + 236 | 0, lj = c + 240 | 0, Of = 0, mj = -3.4028234663852886e+38, Sj = 0, Tj = -1, Uj = -3.4028234663852886e+38; ; ) {
        if ((Of | 0) < (Nf | 0)) {
          var an = l[((Of << 3) + 64 >> 2) + $], Vj = -an, li = -l[((Of << 3) + 68 >> 2) + $], bn = l[(Of << 3 >> 2) + $], cn = l[((Of << 3) + 4 >> 2) + $], Wj = (bn - l[Xm >> 2]) * Vj + (cn - l[tb >> 2]) * li, Xj = (bn - l[Ym >> 2]) * Vj + (cn - l[Zm >> 2]) * li, rh = Wj < Xj ? Wj : Xj;
          if (rh > qh) {
            var dl = rh, Pg = Of, dn = 2;
            ea = 79;
            break;
          }
          var nj = an * jj + kj * li < 0;
          do {
            if (nj) {
              if ((Vj - l[$m >> 2]) * kj + (li - l[bl >> 2]) * jj >= -.03490658849477768 & rh > mj) {
                ea = 76;
                break;
              }
              var mi = mj, oj = Sj, Yj = Tj, we = Uj;
            } else {
              if ((Vj - l[cl >> 2]) * kj + (li - l[lj >> 2]) * jj >= -.03490658849477768 & rh > mj) {
                ea = 76;
                break;
              }
              mi = mj;
              oj = Sj;
              Yj = Tj;
              we = Uj;
            }
            ea = 77;
          } while (0);
          ea == 76 && (mi = rh, oj = 2, Yj = Of, we = rh);
          Of = Of + 1 | 0;
          mj = mi;
          Sj = oj;
          Tj = Yj;
          Uj = we;
        } else {
          var Zj = Sj, Cp = Tj, en = Uj;
          if ((Zj | 0) == 0) {
            ea = 81;
            break;
          }
          dl = en;
          Pg = Cp;
          dn = Zj;
          ea = 79;
          break;
        }
      }
      do {
        if (ea == 79) {
          if (dl > qh) {
            break a;
          }
          if (dl > Qj * .9800000190734863 + .0010000000474974513) {
            var el = d + 56 | 0;
            if ((dn | 0) == 1) {
              var fl = el;
              ea = 83;
            } else {
              h[el >> 2] = 2;
              var ni = Oa, Ed = Fa | 0;
              O = Ed >> 2;
              var oi = h[O], wc = Fa + 4 | 0;
              H = wc >> 2;
              var fn = h[H], Fd = ni | 0;
              F = Fd >> 2;
              h[F] = oi;
              Gd = ni + 4 | 0;
              B = Gd >> 2;
              h[B] = fn;
              var gl = Oa + 8 | 0, $j = gl;
              a[gl] = 0;
              var pj = Pg & 255;
              a[$j + 1 | 0] = pj;
              a[$j + 2 | 0] = 0;
              a[$j + 3 | 0] = 1;
              var hl = Oa + 12 | 0, Md = Ja | 0;
              N = Md >> 2;
              var il = h[N], te = Ja + 4 | 0;
              J = te >> 2;
              var gn = h[J], Cc = hl | 0;
              Da = Cc >> 2;
              h[Da] = il;
              zd = hl + 4 | 0;
              la = zd >> 2;
              h[la] = gn;
              var jl = Oa + 20 | 0, ak = jl;
              a[jl] = 0;
              a[ak + 1 | 0] = pj;
              a[ak + 2 | 0] = 0;
              a[ak + 3 | 0] = 1;
              var bk = Pg + 1 | 0, kl = (bk | 0) < (h[z] | 0) ? bk : 0, ll = (Pg << 3) + c | 0, ck = h[ll >> 2], ml = h[ll + 4 >> 2], dk = (kl << 3) + c | 0, Dp = h[dk >> 2], hn = h[dk + 4 >> 2], nl = (Pg << 3) + c + 64 | 0, jn = h[nl >> 2], kn = h[nl + 4 >> 2], ek = kl & 255, Ep = (t[0] = oi, x[0]), ln = (t[0] = fn, x[0]), mn = (t[0] = il, x[0]), nn = (t[0] = gn, x[0]), pi = Pg, ol = ek, fk = ck, sh = ml, qi = Dp, ri = hn, th = jn, uh = kn, si = mn, ti = Ep, qj = nn, ui = ln, gk = pj, vi = 0;
              ea = 90;
            }
          } else {
            ea = 81;
          }
        }
      } while (0);
      ea == 81 && (fl = d + 56 | 0, ea = 83);
      if (ea == 83) {
        h[fl >> 2] = 1;
        var rj = h[z], Fp = (rj | 0) > 1;
        b : do {
          if (Fp) {
            for (var on = l[Wm >> 2], pn = l[Rj >> 2], hk = 0, sj = pn * l[$ + 16] + on * l[$ + 17], tj = 1; ; ) {
              var qn = pn * l[((tj << 3) + 64 >> 2) + $] + on * l[((tj << 3) + 68 >> 2) + $], rn = qn < sj, ik = rn ? tj : hk, pl = rn ? qn : sj, jk = tj + 1 | 0;
              if ((jk | 0) >= (rj | 0)) {
                var wi = ik;
                break b;
              }
              hk = ik;
              sj = pl;
              tj = jk;
            }
          } else {
            wi = 0;
          }
        } while (0);
        var sn = wi + 1 | 0, kk = (sn | 0) < (rj | 0) ? sn : 0, lk = (wi << 3) + c | 0, mk = Oa, nc = lk | 0;
        aa = nc >> 2;
        var nk = h[aa], Yb = lk + 4 | 0;
        X = Yb >> 2;
        var tn = h[X];
        h[mk >> 2] = nk;
        h[mk + 4 >> 2] = tn;
        var ql = Oa + 8 | 0, ok = ql;
        a[ql] = 0;
        var pk = wi & 255;
        a[ok + 1 | 0] = pk;
        a[ok + 2 | 0] = 1;
        a[ok + 3 | 0] = 0;
        var rl = (kk << 3) + c | 0, sl = Oa + 12 | 0, tl = h[rl >> 2], ul = h[rl + 4 >> 2];
        h[sl >> 2] = tl;
        h[sl + 4 >> 2] = ul;
        var vl = Oa + 20 | 0, qk = vl;
        a[vl] = 0;
        a[qk + 1 | 0] = kk & 255;
        a[qk + 2 | 0] = 1;
        a[qk + 3 | 0] = 0;
        var un = (a[ph] & 1) << 24 >> 24 == 0, vn = (t[0] = nk, x[0]), wn = (t[0] = tn, x[0]), xn = (t[0] = tl, x[0]), yn = (t[0] = ul, x[0]);
        if (un) {
          var xi = Ja | 0, yi = Ja + 4 | 0, zn = h[xi >> 2], An = h[yi >> 2], rk = Fa | 0, sk = Fa + 4 | 0, Bn = h[rk >> 2], Cn = h[sk >> 2], Dn = -l[Ha], En = (x[0] = -l[ab], t[0]), Fn = (x[0] = Dn, t[0]), pi = 1, ol = 0, fk = zn, sh = An, qi = Bn, ri = Cn, th = En, uh = Fn;
        } else {
          var xi = Fa | 0, yi = Fa + 4 | 0, rk = Ja | 0, sk = Ja + 4 | 0, wl = ub, pi = 0, ol = 1, fk = h[xi >> 2], sh = h[yi >> 2], qi = h[rk >> 2], ri = h[sk >> 2], th = h[wl >> 2], uh = h[wl + 4 >> 2];
        }
        si = xn;
        ti = vn;
        qj = yn;
        ui = wn;
        gk = pk;
        vi = 1;
      }
      var tk = (t[0] = fk, x[0]), uk = (t[0] = sh, x[0]), Gn = (t[0] = ri, x[0]), Qg = (t[0] = th, x[0]), zi = (t[0] = uh, x[0]), xl = -Qg, Hn = zi * tk + uk * xl, Gp = Qg * Gn, vh = (t[0] = qi, x[0]), lg = -zi, yl = vh * lg + Gp, uj = zi * ti + ui * xl - Hn, Hp = Oa + 12 | 0, Ai = zi * si + qj * xl - Hn;
      if (uj > 0) {
        var Bi = 0;
      } else {
        s = ha >> 2, r = Oa >> 2, h[s] = h[r], h[s + 1] = h[r + 1], h[s + 2] = h[r + 2], Bi = 1;
      }
      if (Ai > 0) {
        var Ci = Bi;
      } else {
        p = (ha + Bi * 12 | 0) >> 2, q = Hp >> 2, h[p] = h[q], h[p + 1] = h[q + 1], h[p + 2] = h[q + 2], Ci = Bi + 1 | 0;
      }
      if (uj * Ai < 0) {
        var In = uj / (uj - Ai), Ip = ui + (qj - ui) * In, Jn = ha + Ci * 12 | 0, wh = (x[0] = ti + (si - ti) * In, t[0]), vk = (x[0] = Ip, t[0]) | 0, $c = Jn | 0;
        I = $c >> 2;
        h[I] = 0 | wh;
        sd = Jn + 4 | 0;
        A = sd >> 2;
        h[A] = vk;
        var zl = ha + Ci * 12 + 8 | 0, wk = zl;
        a[zl] = pi & 255;
        a[wk + 1 | 0] = gk;
        a[wk + 2 | 0] = 0;
        a[wk + 3 | 0] = 1;
        var xk = Ci + 1 | 0;
      } else {
        xk = Ci;
      }
      if ((xk | 0) >= 2) {
        var yk = l[eb], vj = l[eb + 1], wj = yk * lg + Qg * vj - yl, zk = ha + 12 | 0, Al = l[zk >> 2], Bl = l[eb + 4], Cl = Al * lg + Qg * Bl - yl;
        if (wj > 0) {
          var Ak = 0;
        } else {
          o = ja >> 2, n = ha >> 2, h[o] = h[n], h[o + 1] = h[n + 1], h[o + 2] = h[n + 2], Ak = 1;
        }
        if (Cl > 0) {
          var xh = Ak;
        } else {
          m = (ja + Ak * 12 | 0) >> 2, j = zk >> 2, h[m] = h[j], h[m + 1] = h[j + 1], h[m + 2] = h[j + 2], xh = Ak + 1 | 0;
        }
        if (wj * Cl < 0) {
          var Bk = wj / (wj - Cl), Jp = vj + (Bl - vj) * Bk, Dl = ja + xh * 12 | 0, Kn = (x[0] = yk + (Al - yk) * Bk, t[0]), Kp = (x[0] = Jp, t[0]) | 0, $c = Dl | 0;
          I = $c >> 2;
          h[I] = 0 | Kn;
          sd = Dl + 4 | 0;
          A = sd >> 2;
          h[A] = Kp;
          var Ln = ja + xh * 12 + 8 | 0, El = Ln;
          a[Ln] = ol;
          a[El + 1 | 0] = a[ha + 9 | 0];
          a[El + 2 | 0] = 0;
          a[El + 3 | 0] = 1;
          var Mn = xh + 1 | 0;
        } else {
          Mn = xh;
        }
        if ((Mn | 0) >= 2) {
          var Fl = d + 40 | 0;
          if (vi) {
            var Nn = Fl;
            h[Nn >> 2] = 0 | th;
            h[Nn + 4 >> 2] = uh | 0;
            var On = d + 48 | 0, Md = On | 0;
            N = Md >> 2;
            h[N] = 0 | fk;
            te = On + 4 | 0;
            J = te >> 2;
            h[J] = sh | 0;
          } else {
            var Gl = (pi << 3) + g + 84 | 0, Pn = Fl, jb = Gl | 0;
            ca = jb >> 2;
            var Qn = h[ca], Ub = Gl + 4 | 0;
            ga = Ub >> 2;
            var Lp = h[ga], nc = Pn | 0;
            aa = nc >> 2;
            h[aa] = Qn;
            Yb = Pn + 4 | 0;
            X = Yb >> 2;
            h[X] = Lp;
            var yh = (pi << 3) + g + 20 | 0, Rn = d + 48 | 0, cd = yh | 0;
            wa = cd >> 2;
            var Hl = h[wa], Yc = yh + 4 | 0;
            W = Yc >> 2;
            var Mp = h[W], pc = Rn | 0;
            Z = pc >> 2;
            h[Z] = Hl;
            Mc = Rn + 4 | 0;
            Y = Mc >> 2;
            h[Y] = Mp;
          }
          var zh = l[db], Il = l[db + 1], Jl = l[u];
          if (Qg * (zh - tk) + zi * (Il - uk) > Jl) {
            var Ah = 0, xj = Jl;
          } else {
            if (vi) {
              var Ck = zh - l[ob], Rg = Il - l[bb], Sn = l[yb], yj = l[gb], Np = Ck * -yj + Sn * Rg, Kl = d, Tn = (x[0] = Sn * Ck + yj * Rg, t[0]), Un = (x[0] = Np, t[0]) | 0, tc = Kl | 0;
              Ua = tc >> 2;
              h[Ua] = 0 | Tn;
              uc = Kl + 4 | 0;
              La = uc >> 2;
              h[La] = Un;
              h[d + 16 >> 2] = h[db + 2];
            } else {
              var Ll = ja, Dk = d, Ed = Ll | 0;
              O = Ed >> 2;
              var Vn = h[O], wc = Ll + 4 | 0;
              H = wc >> 2;
              var Wn = h[H], Fd = Dk | 0;
              F = Fd >> 2;
              h[F] = Vn;
              Gd = Dk + 4 | 0;
              B = Gd >> 2;
              h[B] = Wn;
              var Ek = ja + 8 | 0, Fk = Ek, Ml = d + 16 | 0, Gk = Ml;
              a[Gk + 2 | 0] = a[Fk + 3 | 0];
              a[Gk + 3 | 0] = a[Fk + 2 | 0];
              a[Ml] = a[Fk + 1 | 0];
              a[Gk + 1 | 0] = a[Ek];
            }
            Ah = 1;
            xj = l[u];
          }
          var Nl = ja + 12 | 0, Xn = l[Nl >> 2], Hk = l[db + 4];
          if (Qg * (Xn - tk) + zi * (Hk - uk) > xj) {
            var Ol = Ah;
          } else {
            var Pl = d + Ah * 20 | 0;
            if (vi) {
              var Yn = Xn - l[ob], Ik = Hk - l[bb], Zn = l[yb], $n = l[gb], Op = Yn * -$n + Zn * Ik, Ql = Pl, Ve = (x[0] = Zn * Yn + $n * Ik, t[0]), Pp = (x[0] = Op, t[0]) | 0, tc = Ql | 0;
              Ua = tc >> 2;
              h[Ua] = 0 | Ve;
              uc = Ql + 4 | 0;
              La = uc >> 2;
              h[La] = Pp;
              h[(d + 16 >> 2) + (Ah * 5 | 0)] = h[db + 5];
            } else {
              var Rl = Nl, Jk = Pl, Ed = Rl | 0;
              O = Ed >> 2;
              var Sl = h[O], wc = Rl + 4 | 0;
              H = wc >> 2;
              var ao = h[H], Fd = Jk | 0;
              F = Fd >> 2;
              h[F] = Sl;
              Gd = Jk + 4 | 0;
              B = Gd >> 2;
              h[B] = ao;
              var Tl = ja + 20 | 0, Ul = Tl, bo = d + Ah * 20 + 16 | 0, Vl = bo;
              a[Vl + 2 | 0] = a[Ul + 3 | 0];
              a[Vl + 3 | 0] = a[Ul + 2 | 0];
              a[bo] = a[Ul + 1 | 0];
              a[Vl + 1 | 0] = a[Tl];
            }
            Ol = Ah + 1 | 0;
          }
          h[Mf >> 2] = Ol;
        }
      }
    }
  } while (0);
  qg = Oa;
}

function Ap(c, d, e, f, g) {
  var i = d >> 2, j = h[i + 37], m = l[g + 12 >> 2], n = l[f + 12 >> 2], o = l[g + 8 >> 2], q = l[f + 16 >> 2], p = l[e + 12 >> 2], r = l[i + 3], s = l[e + 8 >> 2], u = l[i + 4], z = m * n - o * q + l[g >> 2] - (p * r - s * u + l[e >> 2]), n = o * n + m * q + l[g + 4 >> 2] - (s * r + p * u + l[e + 4 >> 2]), m = p * z + s * n, p = z * -s + p * n, s = (j | 0) > 0;
  a : do {
    if (s) {
      z = 0;
      n = -3.4028234663852886e+38;
      for (o = 0; ; ) {
        if (q = l[((o << 3) + 84 >> 2) + i] * m + l[((o << 3) + 88 >> 2) + i] * p, z = (r = q > n) ? o : z, n = r ? q : n, o = o + 1 | 0, (o | 0) == (j | 0)) {
          var E = z;
          break a;
        }
      }
    } else {
      E = 0;
    }
  } while (0);
  i = Qp(d, e, E, f, g);
  m = ((E | 0) > 0 ? E : j) - 1 | 0;
  p = Qp(d, e, m, f, g);
  s = E + 1 | 0;
  s = (s | 0) < (j | 0) ? s : 0;
  z = Qp(d, e, s, f, g);
  n = p > i & p > z;
  a : do {
    if (n) {
      o = p;
      for (q = m; ; ) {
        r = ((q | 0) > 0 ? q : j) - 1 | 0;
        u = Qp(d, e, r, f, g);
        if (u <= o) {
          var A = o, I = q;
          break a;
        }
        o = u;
        q = r;
      }
    } else {
      if (z > i) {
        o = z;
        for (q = s; ; ) {
          r = q + 1 | 0;
          r = (r | 0) < (j | 0) ? r : 0;
          u = Qp(d, e, r, f, g);
          if (u <= o) {
            A = o;
            I = q;
            break a;
          }
          o = u;
          q = r;
        }
      } else {
        A = i, I = E;
      }
    }
  } while (0);
  h[c >> 2] = I;
  return A;
}

function Qp(c, d, e, f, g) {
  f >>= 2;
  var i = c >> 2, j = h[f + 37];
  ((e | 0) > -1 ? (h[i + 37] | 0) > (e | 0) ? 3 : 2 : 2) == 2 && G(y.Ga | 0, 32, y.ib | 0, y.ta | 0);
  var c = l[d + 12 >> 2], m = l[((e << 3) + 84 >> 2) + i], n = l[d + 8 >> 2], o = l[((e << 3) + 88 >> 2) + i], q = c * m - n * o, m = n * m + c * o, o = l[g + 12 >> 2], p = l[g + 8 >> 2], r = o * q + p * m, s = q * -p + o * m, u = (j | 0) > 0;
  a : do {
    if (u) {
      for (var z = 0, E = 3.4028234663852886e+38, A = 0; ; ) {
        var I = l[((A << 3) + 20 >> 2) + f] * r + l[((A << 3) + 24 >> 2) + f] * s, C = I < E, z = C ? A : z, E = C ? I : E, A = A + 1 | 0;
        if ((A | 0) == (j | 0)) {
          var K = z;
          break a;
        }
      }
    } else {
      K = 0;
    }
  } while (0);
  j = l[((e << 3) + 20 >> 2) + i];
  e = l[((e << 3) + 24 >> 2) + i];
  i = l[((K << 3) + 20 >> 2) + f];
  K = l[((K << 3) + 24 >> 2) + f];
  return (o * i - p * K + l[g >> 2] - (c * j - n * e + l[d >> 2])) * q + (p * i + o * K + l[g + 4 >> 2] - (n * j + c * e + l[d + 4 >> 2])) * m;
}

function Rp(c, d, e) {
  var f = d >> 2, g = c >> 2, i, j = h[f + 1];
  if (j == 0) {
    h[g + 4] = d + 12 | 0, h[g + 5] = 1, l[g + 6] = l[f + 2];
  } else {
    if (j == 2) {
      h[g + 4] = d + 20 | 0, h[g + 5] = h[f + 37], l[g + 6] = l[f + 2];
    } else {
      if (j == 3) {
        j = d + 16 | 0;
        i = (e | 0) > -1 ? (h[j >> 2] | 0) > (e | 0) ? 6 : 5 : 5;
        i == 5 && G(y.g | 0, 53, y.aa | 0, y.Db | 0);
        d = d + 12 | 0;
        i = (e << 3) + h[d >> 2] | 0;
        var m = h[(i + 4 | 0) >> 2];
        h[c >> 2] = h[(i | 0) >> 2];
        h[c + 4 >> 2] = m;
        i = e + 1 | 0;
        e = c + 8 | 0;
        d = h[d >> 2];
        (i | 0) < (h[j >> 2] | 0) ? (d = (i << 3) + d | 0, j = h[d >> 2], d = h[d + 4 >> 2], h[(e | 0) >> 2] = j, h[(e + 4 | 0) >> 2] = d) : (j = h[d + 4 >> 2], h[e >> 2] = h[d >> 2], h[e + 4 >> 2] = j);
        h[g + 4] = c | 0;
        h[g + 5] = 2;
        l[g + 6] = l[f + 2];
      } else {
        j == 1 ? (h[g + 4] = d + 12 | 0, h[g + 5] = 2, l[g + 6] = l[f + 2]) : G(y.g | 0, 81, y.aa | 0, y.f | 0);
      }
    }
  }
}

function Sp(c, d, e) {
  var f, g, i, j, m, n, o, q, p, r, s, u, z, E, A, I, C, K, J, N, B, F, H, O, D, Q = e >> 2, P = qg;
  qg += 136;
  var M;
  D = P >> 2;
  var Na = P + 112, U = P + 124;
  h[Tp >> 2] = h[Tp >> 2] + 1 | 0;
  var L = l[Q + 14], R = l[Q + 15], la = l[Q + 16], Da = l[Q + 17], Y = l[Q + 18], Z = l[Q + 19], W = l[Q + 20], wa = l[Q + 21];
  O = (d + 4 | 0) >> 1;
  var X = Eh[O];
  if ((X & 65535) < 4) {
    var aa = X;
  } else {
    G(y.g | 0, 102, y.ub | 0, y.pc | 0), aa = b[O];
  }
  var ga = aa & 65535;
  H = (P + 108 | 0) >> 2;
  h[H] = ga;
  var ca = P | 0;
  F = ca >> 2;
  var La = aa << 16 >> 16 == 0;
  a : do {
    if (La) {
      var Ua = ga;
    } else {
      for (var Va = e + 20 | 0, ma = e + 16 | 0, xa = e + 48 | 0, ua = e + 44 | 0, da = 0; ; ) {
        var ya = ca + da * 36 | 0, Ha = Dh[d + (da + 6) | 0] & 255;
        h[F + (da * 9 | 0) + 7] = Ha;
        var ab = Dh[d + (da + 9) | 0] & 255, bb = ca + da * 36 + 32 | 0;
        h[bb >> 2] = ab;
        if ((h[Va >> 2] | 0) > (Ha | 0)) {
          var ob = ab;
        } else {
          G(y.b | 0, 103, y.a | 0, y.c | 0), ob = h[bb >> 2];
        }
        var gb = (Ha << 3) + h[ma >> 2] | 0, yb = h[gb + 4 >> 2], db = (t[0] = h[gb >> 2], x[0]), eb = (t[0] = yb, x[0]);
        M = (ob | 0) > -1 ? (h[xa >> 2] | 0) > (ob | 0) ? 9 : 8 : 8;
        M == 8 && G(y.b | 0, 103, y.a | 0, y.c | 0);
        var pa = (ob << 3) + h[ua >> 2] | 0, $ = pa | 0;
        B = $ >> 2;
        var Oa = pa + 4 | 0;
        N = Oa >> 2;
        var ea = h[N], ha = (t[0] = h[B], x[0]), ja = (t[0] = ea, x[0]), ka = Da * db - la * eb + L, za = la * db + Da * eb + R, qa = ya, Aa = (x[0] = ka, t[0]), fb = (x[0] = za, t[0]) | 0, na = qa | 0;
        h[na >> 2] = 0 | Aa;
        var Pa = qa + 4 | 0;
        h[Pa >> 2] = fb;
        var mb = wa * ha - W * ja + Y, lb = W * ha + wa * ja + Z, pb = ca + da * 36 + 8 | 0, Cb = (x[0] = mb, t[0]), hb = (x[0] = lb, t[0]) | 0, Qa = pb | 0;
        h[Qa >> 2] = 0 | Cb;
        var ba = pb + 4 | 0;
        h[ba >> 2] = hb;
        var ra = l[F + (da * 9 | 0) + 3] - l[F + (da * 9 | 0) + 1], Ma = ca + da * 36 + 16 | 0, Wa = (x[0] = mb - ka, t[0]), Ca = (x[0] = ra, t[0]) | 0;
        h[Ma >> 2] = 0 | Wa;
        h[Ma + 4 >> 2] = Ca;
        l[F + (da * 9 | 0) + 6] = 0;
        var Ba = da + 1 | 0, Xa = h[H];
        if ((Ba | 0) >= (Xa | 0)) {
          Ua = Xa;
          break a;
        }
        da = Ba;
      }
    }
  } while (0);
  var fa = (Ua | 0) > 1;
  a : do {
    if (fa) {
      var Ra = l[d >> 2];
      if (Ua == 0) {
        G(y.g | 0, 246, y.H | 0, y.f | 0);
        var Za = 0;
      } else {
        if (Ua == 1) {
          Za = 0;
        } else {
          if (Ua == 2) {
            var nb = l[D + 4] - l[D + 13], Fb = l[D + 5] - l[D + 14], Za = Nm(nb * nb + Fb * Fb);
          } else {
            if (Ua == 3) {
              var qb = l[D + 4], Ia = l[D + 5], Za = (l[D + 13] - qb) * (l[D + 23] - Ia) - (l[D + 14] - Ia) * (l[D + 22] - qb);
            } else {
              G(y.g | 0, 259, y.H | 0, y.f | 0), Za = 0;
            }
          }
        }
      }
      var rb = Za < Ra * .5;
      do {
        if (!rb && !(Ra * 2 < Za | Za < 1.1920928955078125e-7)) {
          var Ya = h[H];
          M = 20;
          break a;
        }
      } while (0);
      h[H] = 0;
      M = 21;
    } else {
      Ya = Ua, M = 20;
    }
  } while (0);
  if (M == 20) {
    if ((Ya | 0) == 0) {
      M = 21;
    } else {
      var oa = Ya;
      oa == 0 ? G(y.g | 0, 194, y.G | 0, y.f | 0) : oa == 1 || oa == 2 || oa == 3 || G(y.g | 0, 207, y.G | 0, y.f | 0);
      M = 29;
    }
  }
  if (M == 21) {
    h[D + 7] = 0;
    h[D + 8] = 0;
    (h[Q + 5] | 0) > 0 || G(y.b | 0, 103, y.a | 0, y.c | 0);
    var Fa = h[Q + 4], $ = Fa | 0;
    B = $ >> 2;
    Oa = Fa + 4 | 0;
    N = Oa >> 2;
    var $a = h[N], Ea = (t[0] = h[B], x[0]), Ga = (t[0] = $a, x[0]);
    (h[Q + 12] | 0) > 0 || G(y.b | 0, 103, y.a | 0, y.c | 0);
    var Ja = h[Q + 11], $ = Ja | 0;
    B = $ >> 2;
    Oa = Ja + 4 | 0;
    N = Oa >> 2;
    var Sa = h[N], vb = (t[0] = h[B], x[0]), Gb = (t[0] = Sa, x[0]), zb = Da * Ea - la * Ga + L, Nb = la * Ea + Da * Ga + R, Ob = (x[0] = zb, t[0]), Db = (x[0] = Nb, t[0]), Pb = 0 | Ob, Ab = Db | 0, na = P | 0;
    h[na >> 2] = Pb;
    Pa = P + 4 | 0;
    h[Pa >> 2] = Ab;
    var Eb = wa * vb - W * Gb + Y, sb = W * vb + wa * Gb + Z, cb = P + 8 | 0, Mb = (x[0] = Eb, t[0]), wb = (x[0] = sb, t[0]), tb = 0 | Mb, V = wb | 0, Qa = cb | 0;
    h[Qa >> 2] = tb;
    ba = cb + 4 | 0;
    h[ba >> 2] = V;
    var ia = sb - Nb, Hb = P + 16 | 0, Qb = (x[0] = Eb - zb, t[0]), Bb = (x[0] = ia, t[0]) | 0;
    h[Hb >> 2] = 0 | Qb;
    h[Hb + 4 >> 2] = Bb;
    h[H] = 1;
  }
  var Ib = e + 16 | 0, Xb = e + 20 | 0, ec = e + 44 | 0, Ka = e + 48 | 0;
  J = (P + 16 | 0) >> 2;
  K = (P + 20 | 0) >> 2;
  C = (P + 52 | 0) >> 2;
  I = (P + 56 | 0) >> 2;
  var Jb = P + 16 | 0, S = P + 52 | 0;
  A = (P + 24 | 0) >> 2;
  E = (P + 60 | 0) >> 2;
  z = P >> 2;
  u = (P + 36 | 0) >> 2;
  var ub = -W, Kb = P + 88 | 0;
  s = (P + 96 | 0) >> 2;
  r = (P + 72 | 0) >> 2;
  var sa = 0;
  a : for (;;) {
    if ((sa | 0) >= 20) {
      var Rb = sa;
      break;
    }
    var ic = k[H], $b = (ic | 0) > 0;
    b : do {
      if ($b) {
        for (var ac = 0; ; ) {
          h[Na + (ac << 2) >> 2] = h[F + (ac * 9 | 0) + 7];
          h[U + (ac << 2) >> 2] = h[F + (ac * 9 | 0) + 8];
          var lc = ac + 1 | 0;
          if ((lc | 0) == (ic | 0)) {
            break b;
          }
          ac = lc;
        }
      } else {
        M = 33;
      }
    } while (0);
    do {
      if (ic == 1) {
        M = 55;
      } else {
        if (ic == 2) {
          var yc = Jb | 0, Gc = Jb + 4 | 0, zc = h[Gc >> 2], mc = (t[0] = h[yc >> 2], x[0]), bc = (t[0] = zc, x[0]), cc = S | 0, Sb = S + 4 | 0, Lb = h[Sb >> 2], ib = (t[0] = h[cc >> 2], x[0]), Tb = (t[0] = Lb, x[0]), dc = ib - mc, Ac = Tb - bc, Hc = mc * dc + bc * Ac, Ic = -Hc;
          if (Hc < 0) {
            var fc = ib * dc + Tb * Ac;
            if (fc > 0) {
              var od = 1 / (fc - Hc);
              l[A] = fc * od;
              l[E] = od * Ic;
              h[H] = 2;
              var Wc = ib, Qc = mc;
              M = 60;
            } else {
              l[E] = 1;
              h[H] = 1;
              for (var xb = u, Wb = z, oc = xb + 9; xb < oc; xb++, Wb++) {
                h[Wb] = h[xb];
              }
              M = 57;
            }
          } else {
            l[A] = 1;
            h[H] = 1;
            var Tc = mc;
            M = 59;
          }
        } else {
          if (ic == 3) {
            var yc = Jb | 0, Gc = Jb + 4 | 0, Jc = h[Gc >> 2], Kc = (t[0] = h[yc >> 2], x[0]), gc = (t[0] = Jc, x[0]), cc = S | 0, Sb = S + 4 | 0, Bc = h[Sb >> 2], Rc = (t[0] = h[cc >> 2], x[0]), jc = (t[0] = Bc, x[0]), Lc = Kb | 0, vd = Kb + 4 | 0, tc = h[vd >> 2], uc = (t[0] = h[Lc >> 2], x[0]), Xc = (t[0] = tc, x[0]), wd = Rc - Kc, jb = jc - gc, rc = Kc * wd + gc * jb, Ub = Rc * wd + jc * jb, xd = -rc, nc = uc - Kc, Yb = Xc - gc, yd = Kc * nc + gc * Yb, Od = uc * nc + Xc * Yb, cd = -yd, dd = uc - Rc, Yc = Xc - jc, ed = Rc * dd + jc * Yc, pc = uc * dd + Xc * Yc, Mc = -ed, Uc = wd * Yb - jb * nc, fd = Uc * (Rc * Xc - jc * uc), Cc = Uc * (uc * gc - Xc * Kc), pd = Uc * (Kc * jc - gc * Rc);
            if (rc < 0 | yd < 0) {
              if (rc >= 0 | Ub <= 0 | pd > 0) {
                if (yd >= 0 | Od <= 0 | Cc > 0) {
                  if (Ub > 0 | ed < 0) {
                    if (Od > 0 | pc > 0) {
                      if (ed >= 0 | pc <= 0 | fd > 0) {
                        var zd = 1 / (fd + Cc + pd);
                        l[A] = fd * zd;
                        l[E] = Cc * zd;
                        l[s] = pd * zd;
                        h[H] = 3;
                        Rb = sa;
                        break a;
                      }
                      var be = 1 / (pc - ed);
                      l[E] = pc * be;
                      l[s] = be * Mc;
                      h[H] = 2;
                      xb = r;
                      Wb = z;
                      for (oc = xb + 9; xb < oc; xb++, Wb++) {
                        h[Wb] = h[xb];
                      }
                      M = 58;
                    } else {
                      l[s] = 1;
                      h[H] = 1;
                      xb = r;
                      Wb = z;
                      for (oc = xb + 9; xb < oc; xb++, Wb++) {
                        h[Wb] = h[xb];
                      }
                      M = 57;
                    }
                  } else {
                    l[E] = 1;
                    h[H] = 1;
                    xb = u;
                    Wb = z;
                    for (oc = xb + 9; xb < oc; xb++, Wb++) {
                      h[Wb] = h[xb];
                    }
                    M = 57;
                  }
                } else {
                  var Jd = 1 / (Od - yd);
                  l[A] = Od * Jd;
                  l[s] = Jd * cd;
                  h[H] = 2;
                  xb = r;
                  Wb = u;
                  for (oc = xb + 9; xb < oc; xb++, Wb++) {
                    h[Wb] = h[xb];
                  }
                  M = 58;
                }
              } else {
                var Pd = 1 / (Ub - rc);
                l[A] = Ub * Pd;
                l[E] = Pd * xd;
                h[H] = 2;
                Wc = Rc;
                Qc = Kc;
                M = 60;
              }
            } else {
              l[A] = 1, h[H] = 1, Tc = Kc, M = 59;
            }
          } else {
            G(y.g | 0, 498, y.fb | 0, y.f | 0);
            var qd = h[H];
            if (qd == 3) {
              Rb = sa;
              break a;
            } else {
              if (qd == 0) {
                G(y.g | 0, 194, y.G | 0, y.f | 0), M = 55;
              } else {
                if (qd == 1 || qd == 2) {
                  var kc = qd;
                  M = 56;
                } else {
                  G(y.g | 0, 207, y.G | 0, y.f | 0), M = 55;
                }
              }
            }
          }
        }
      }
    } while (0);
    M == 55 && (kc = h[H], M = 56);
    if (M == 56) {
      if (kc == 1) {
        M = 57;
      } else {
        if (kc == 2) {
          M = 58;
        } else {
          G(y.g | 0, 184, y.zb | 0, y.f | 0);
          var hc = 0, vc = 0;
          M = 64;
        }
      }
    }
    M == 57 ? (Tc = l[J], M = 59) : M == 58 && (Wc = l[C], Qc = l[J], M = 60);
    if (M == 59) {
      hc = -Tc, vc = -l[K];
    } else {
      if (M == 60) {
        var gd = Wc - Qc, hd = l[K], qc = l[I] - hd;
        gd * -hd - qc * -Qc > 0 ? (hc = qc * -1, vc = gd) : (hc = qc, vc = gd * -1);
      }
    }
    if (hc * hc + vc * vc < 1.4210854715202004e-14) {
      Rb = sa;
      break;
    }
    var Zb = k[H], Ad = ca + Zb * 36 | 0, id = -vc, ce = Da * -hc + la * id, Qd = hc * la + Da * id, Rd = h[Ib >> 2];
    p = Rd >> 2;
    var Zc = h[Xb >> 2], Bd = (Zc | 0) > 1;
    do {
      if (Bd) {
        for (var jd = 0, Cd = l[p] * ce + l[p + 1] * Qd, kd = 1; ; ) {
          var Vc = l[(kd << 3 >> 2) + p] * ce + l[((kd << 3) + 4 >> 2) + p] * Qd, Sd = Vc > Cd, Dd = Sd ? kd : jd, ye = Sd ? Vc : Cd, Xd = kd + 1 | 0;
          if ((Xd | 0) == (Zc | 0)) {
            break;
          }
          jd = Dd;
          Cd = ye;
          kd = Xd;
        }
        var pe = ca + Zb * 36 + 28 | 0;
        h[pe >> 2] = Dd;
        var Le = Ad | 0;
        if ((Dd | 0) > -1) {
          ld = Dd, de = pe, Sc = Le, M = 70;
        } else {
          var qe = Dd, Nc = pe, Kd = Le;
          M = 71;
        }
      } else {
        var Ld = ca + Zb * 36 + 28 | 0, ld = h[Ld >> 2] = 0, de = Ld, Sc = Ad | 0;
        M = 70;
      }
    } while (0);
    if (M == 70) {
      if ((Zc | 0) > (ld | 0)) {
        var md = ld, Me = de, ze = Sc, ee = Rd;
        M = 72;
      } else {
        qe = ld, Nc = de, Kd = Sc, M = 71;
      }
    }
    M == 71 && (G(y.b | 0, 103, y.a | 0, y.c | 0), md = qe, Me = Nc, ze = Kd, ee = h[Ib >> 2]);
    var cf = l[ee + (md << 3) >> 2], df = l[ee + (md << 3) + 4 >> 2], ef = la * cf + Da * df + R, Qf = Ad, Ae = (x[0] = Da * cf - la * df + L, t[0]), rg = (x[0] = ef, t[0]) | 0, re = Qf | 0;
    q = re >> 2;
    h[q] = 0 | Ae;
    var Be = Qf + 4 | 0;
    o = Be >> 2;
    h[o] = rg;
    var Rf = wa * hc + W * vc, Ne = hc * ub + wa * vc, ff = h[ec >> 2];
    n = ff >> 2;
    var sg = h[Ka >> 2], Sf = (sg | 0) > 1;
    do {
      if (Sf) {
        for (var Tf = 0, uf = l[n] * Rf + l[n + 1] * Ne, se = 1; ; ) {
          var tg = l[(se << 3 >> 2) + n] * Rf + l[((se << 3) + 4 >> 2) + n] * Ne, Uf = tg > uf, Vf = Uf ? se : Tf, Yg = Uf ? tg : uf, Fh = se + 1 | 0;
          if ((Fh | 0) == (sg | 0)) {
            break;
          }
          Tf = Vf;
          uf = Yg;
          se = Fh;
        }
        var ug = ca + Zb * 36 + 32 | 0;
        h[ug >> 2] = Vf;
        var gf = ca + Zb * 36 + 8 | 0;
        if ((Vf | 0) > -1) {
          vf = Vf, hf = ug, jf = gf, M = 77;
        } else {
          var vg = Vf, Zg = ug, $g = gf;
          M = 78;
        }
      } else {
        var ah = ca + Zb * 36 + 32 | 0, vf = h[ah >> 2] = 0, hf = ah, jf = ca + Zb * 36 + 8 | 0;
        M = 77;
      }
    } while (0);
    if (M == 77) {
      if ((sg | 0) > (vf | 0)) {
        var wf = vf, Wf = hf, Ed = jf, Ce = ff;
        M = 79;
      } else {
        vg = vf, Zg = hf, $g = jf, M = 78;
      }
    }
    M == 78 && (G(y.b | 0, 103, y.a | 0, y.c | 0), wf = vg, Wf = Zg, Ed = $g, Ce = h[ec >> 2]);
    var wc = l[Ce + (wf << 3) >> 2], Oe = l[Ce + (wf << 3) + 4 >> 2], Fd = wa * wc - W * Oe + Y, Gd = W * wc + wa * Oe + Z, Xf = Ed, bh = (x[0] = Fd, t[0]), ch = (x[0] = Gd, t[0]) | 0, re = Xf | 0;
    q = re >> 2;
    h[q] = 0 | bh;
    Be = Xf + 4 | 0;
    o = Be >> 2;
    h[o] = ch;
    var wg = Gd - l[ze + 4 >> 2], xg = ca + Zb * 36 + 16 | 0, Td = (x[0] = Fd - l[ze >> 2], t[0]), sc = (x[0] = wg, t[0]) | 0;
    h[xg >> 2] = 0 | Td;
    h[xg + 4 >> 2] = sc;
    var Gh = sa + 1 | 0;
    h[Up >> 2] = h[Up >> 2] + 1 | 0;
    for (var xf = 0; ; ) {
      if ((xf | 0) >= (ic | 0)) {
        break;
      }
      if ((h[Me >> 2] | 0) == (h[Na + (xf << 2) >> 2] | 0) && (h[Wf >> 2] | 0) == (h[U + (xf << 2) >> 2] | 0)) {
        Rb = Gh;
        break a;
      }
      xf = xf + 1 | 0;
    }
    h[H] = h[H] + 1 | 0;
    sa = Gh;
  }
  var Yf = h[Vp >> 2];
  h[Vp >> 2] = (Yf | 0) > (Rb | 0) ? Yf : Rb;
  var Ud = c + 8 | 0, Zf = h[H];
  if (Zf == 0) {
    G(y.g | 0, 217, y.pa | 0, y.f | 0);
  } else {
    if (Zf == 1) {
      var Hh = h[P + 4 >> 2];
      h[c >> 2] = h[P >> 2];
      h[c + 4 >> 2] = Hh;
      var Pe = P + 8 | 0, yg = h[Pe + 4 >> 2];
      h[Ud >> 2] = h[Pe >> 2];
      h[Ud + 4 >> 2] = yg;
    } else {
      if (Zf == 2) {
        var yf = l[A], kf = l[E], Hd = l[D + 1] * yf + l[D + 10] * kf, $f = (x[0] = l[D] * yf + l[D + 9] * kf, t[0]), dh = (x[0] = Hd, t[0]) | 0, re = c | 0;
        q = re >> 2;
        h[q] = 0 | $f;
        Be = c + 4 | 0;
        o = Be >> 2;
        h[o] = dh;
        var zg = l[D + 3] * yf + l[D + 12] * kf, ag = (x[0] = l[D + 2] * yf + l[D + 11] * kf, t[0]), Ag = (x[0] = zg, t[0]) | 0;
        h[Ud >> 2] = 0 | ag;
        h[Ud + 4 >> 2] = Ag;
      } else {
        if (Zf == 3) {
          var bg = l[A], cg = l[E], Md = l[s], te = l[D + 1] * bg + l[D + 10] * cg + l[D + 19] * Md, fe = (x[0] = l[D] * bg + l[D + 9] * cg + l[D + 18] * Md, t[0]), Bg = (x[0] = te, t[0]), dg = 0 | fe, Cg = Bg | 0;
          h[c >> 2] = dg;
          h[c + 4 >> 2] = Cg;
          h[Ud >> 2] = dg;
          h[Ud + 4 >> 2] = Cg;
        } else {
          G(y.g | 0, 236, y.pa | 0, y.f | 0);
        }
      }
    }
  }
  m = (c | 0) >> 2;
  j = (Ud | 0) >> 2;
  var ge = l[m] - l[j];
  i = (c + 4 | 0) >> 2;
  g = (c + 12 | 0) >> 2;
  var he = l[i] - l[g], zf = Nm(ge * ge + he * he);
  f = (c + 16 | 0) >> 2;
  l[f] = zf;
  h[c + 20 >> 2] = Rb;
  var Qe = h[H];
  if (Qe == 0) {
    G(y.g | 0, 246, y.H | 0, y.f | 0);
    var ie = 0;
  } else {
    if (Qe == 1) {
      ie = 0;
    } else {
      if (Qe == 2) {
        var lf = l[J] - l[C], Af = l[K] - l[I], ie = Nm(lf * lf + Af * Af);
      } else {
        if (Qe == 3) {
          var Dg = l[J], eh = l[K], ie = (l[C] - Dg) * (l[D + 23] - eh) - (l[I] - eh) * (l[D + 22] - Dg);
        } else {
          G(y.g | 0, 259, y.H | 0, y.f | 0), ie = 0;
        }
      }
    }
  }
  l[d >> 2] = ie;
  var Id = h[H];
  b[O] = Id & 65535;
  var De = (Id | 0) > 0;
  a : do {
    if (De) {
      for (var rd = 0; ; ) {
        a[d + (rd + 6) | 0] = h[F + (rd * 9 | 0) + 7] & 255;
        a[d + (rd + 9) | 0] = h[F + (rd * 9 | 0) + 8] & 255;
        var Eg = rd + 1 | 0;
        if ((Eg | 0) >= (Id | 0)) {
          break a;
        }
        rd = Eg;
      }
    }
  } while (0);
  if ((a[e + 88 | 0] & 1) << 24 >> 24 != 0) {
    var mf = l[Q + 6], Ee = l[Q + 13], Re = l[f], Vd = mf + Ee;
    if (Re > Vd & Re > 1.1920928955078125e-7) {
      l[f] = Re - Vd;
      var Bf = l[j], eg = l[m], nf = Bf - eg, Yd = l[g], Fe = l[i], Ge = Yd - Fe, Ih = Nm(nf * nf + Ge * Ge);
      if (Ih < 1.1920928955078125e-7) {
        var Fg = nf, Se = Ge;
      } else {
        var of = 1 / Ih, Fg = nf * of, Se = Ge * of;
      }
      var Cf = Se * mf;
      l[m] = eg + Fg * mf;
      l[i] = Fe + Cf;
      var He = Se * Ee;
      l[j] = Bf - Fg * Ee;
      l[g] = Yd - He;
    } else {
      var fg = (l[i] + l[g]) * .5, pf = (x[0] = (l[m] + l[j]) * .5, t[0]), Df = (x[0] = fg, t[0]), Gg = 0 | pf, Ef = Df | 0;
      h[c >> 2] = Gg;
      h[c + 4 >> 2] = Ef;
      Lc = Ud | 0;
      h[Lc >> 2] = Gg;
      vd = Ud + 4 | 0;
      h[vd >> 2] = Ef;
      l[f] = 0;
    }
  }
  qg = P;
}

function Wp(c) {
  var d, e, f, g;
  g = (c + 16 | 0) >> 2;
  var i = h[g];
  if ((i | 0) == -1) {
    i = c + 8 | 0;
    f = i >> 2;
    d = (c + 12 | 0) >> 2;
    e = h[d];
    if ((h[f] | 0) == (e | 0)) {
      var j = e;
    } else {
      G(y.d | 0, 61, y.kb | 0, y.Eb | 0), j = h[d];
    }
    c = c + 4 | 0;
    e = c >> 2;
    var m = h[e];
    h[d] = j << 1;
    j = Wk(j * 72 | 0);
    h[e] = j;
    Xp(j, m, h[f] * 36 | 0);
    yp(m);
    var j = h[f], m = h[d] - 1 | 0, n = (j | 0) < (m | 0);
    a : do {
      if (n) {
        for (var o = j; ; ) {
          var q = o + 1 | 0;
          h[(h[e] + o * 36 + 20 | 0) >> 2] = q;
          h[(h[e] + o * 36 + 32 | 0) >> 2] = -1;
          o = h[d] - 1 | 0;
          if ((q | 0) >= (o | 0)) {
            var p = o;
            break a;
          }
          o = q;
        }
      } else {
        p = m;
      }
    } while (0);
    h[(h[e] + p * 36 + 20 | 0) >> 2] = -1;
    h[(h[e] + (h[d] - 1) * 36 + 32 | 0) >> 2] = -1;
    p = h[f];
    h[g] = p;
    d = c >> 2;
  } else {
    p = i, d = (c + 4 | 0) >> 2, i = c + 8 | 0;
  }
  f = h[d] + p * 36 + 20 | 0;
  h[g] = h[f >> 2];
  h[f >> 2] = -1;
  h[(h[d] + p * 36 + 24 | 0) >> 2] = -1;
  h[(h[d] + p * 36 + 28 | 0) >> 2] = -1;
  h[(h[d] + p * 36 + 32 | 0) >> 2] = 0;
  h[(h[d] + p * 36 + 16 | 0) >> 2] = 0;
  h[i >> 2] = h[i >> 2] + 1 | 0;
  return p;
}

function Yp(c, d) {
  var e, f, g, i, j;
  i = c + 24 | 0;
  h[i >> 2] = h[i >> 2] + 1 | 0;
  j = (c | 0) >> 2;
  var m = h[j], n = (m | 0) == -1;
  a : do {
    if (n) {
      h[j] = d, h[(h[c + 4 >> 2] + d * 36 + 20 | 0) >> 2] = -1;
    } else {
      i = (c + 4 | 0) >> 2;
      g = h[i] >> 2;
      var o = l[g + (d * 9 | 0)];
      e = l[g + (d * 9 | 0) + 1];
      for (var q = l[g + (d * 9 | 0) + 2], p = l[g + (d * 9 | 0) + 3], r = m; ; ) {
        var s = h[g + (r * 9 | 0) + 6];
        if ((s | 0) == -1) {
          break;
        }
        var u = h[g + (r * 9 | 0) + 7], z = l[g + (r * 9 | 0) + 2], E = l[g + (r * 9 | 0)], A = l[g + (r * 9 | 0) + 3], I = l[g + (r * 9 | 0) + 1], C = ((z > q ? z : q) - (E < o ? E : o) + ((A > p ? A : p) - (I < e ? I : e))) * 2;
        f = C * 2;
        var z = (C - (z - E + (A - I)) * 2) * 2, E = l[g + (s * 9 | 0)], A = o < E ? o : E, I = l[g + (s * 9 | 0) + 1], C = e < I ? e : I, K = l[g + (s * 9 | 0) + 2], J = q > K ? q : K, N = l[g + (s * 9 | 0) + 3], B = p > N ? p : N, E = ((h[g + (s * 9 | 0) + 6] | 0) == -1 ? (J - A + (B - C)) * 2 : (J - A + (B - C)) * 2 - (K - E + (N - I)) * 2) + z, A = l[g + (u * 9 | 0)], I = o < A ? o : A, C = l[g + (u * 9 | 0) + 1], K = e < C ? e : C, J = l[g + (u * 9 | 0) + 2], N = q > J ? q : J, B = l[g + (u * 9 | 0) + 3], F = p > B ? p : B, z = ((h[g + (u * 9 | 0) + 6] | 0) == -1 ? (N - I + (F - K)) * 2 : (N - I + (F - K)) * 2 - (J - A + (B - C)) * 2) + z;
        if (f < E & f < z) {
          break;
        }
        r = E < z ? s : u;
      }
      g = h[g + (r * 9 | 0) + 5];
      s = Wp(c);
      h[(h[i] + s * 36 + 20 | 0) >> 2] = g;
      h[(h[i] + s * 36 + 16 | 0) >> 2] = 0;
      u = h[i];
      f = u >> 2;
      z = l[f + (r * 9 | 0)];
      E = l[f + (r * 9 | 0) + 1];
      E = e < E ? e : E;
      e = u + s * 36 | 0;
      o = (x[0] = o < z ? o : z, t[0]);
      z = (x[0] = E, t[0]) | 0;
      h[(e | 0) >> 2] = 0 | o;
      h[(e + 4 | 0) >> 2] = z;
      o = l[f + (r * 9 | 0) + 2];
      e = l[f + (r * 9 | 0) + 3];
      p = p > e ? p : e;
      e = u + s * 36 + 8 | 0;
      q = (x[0] = q > o ? q : o, t[0]);
      p = (x[0] = p, t[0]) | 0;
      h[(e | 0) >> 2] = 0 | q;
      h[(e + 4 | 0) >> 2] = p;
      q = h[i];
      h[(q + s * 36 + 32 | 0) >> 2] = h[(q + 32 >> 2) + (r * 9 | 0)] + 1 | 0;
      q = h[i];
      (g | 0) == -1 ? (h[(q + s * 36 + 24 | 0) >> 2] = r, h[(h[i] + s * 36 + 28 | 0) >> 2] = d, h[(h[i] + r * 36 + 20 | 0) >> 2] = s, h[(h[i] + d * 36 + 20 | 0) >> 2] = s, h[j] = s) : (p = q + g * 36 + 24 | 0, (h[p >> 2] | 0) == (r | 0) ? h[p >> 2] = s : h[(q + g * 36 + 28 | 0) >> 2] = s, h[(h[i] + s * 36 + 24 | 0) >> 2] = r, h[(h[i] + s * 36 + 28 | 0) >> 2] = d, h[(h[i] + r * 36 + 20 | 0) >> 2] = s, h[(h[i] + d * 36 + 20 | 0) >> 2] = s);
      r = h[(h[i] + 20 >> 2) + (d * 9 | 0)];
      if ((r | 0) != -1) {
        for (;;) {
          if (r = Pr(c, r), p = h[i], q = h[(p + 24 >> 2) + (r * 9 | 0)], p = h[(p + 28 >> 2) + (r * 9 | 0)], (q | 0) == -1 && G(y.d | 0, 307, y.X | 0, y.wc | 0), (p | 0) == -1 && G(y.d | 0, 308, y.X | 0, y.zc | 0), o = h[i], e = h[(o + 32 >> 2) + (q * 9 | 0)], g = h[(o + 32 >> 2) + (p * 9 | 0)], h[(o + r * 36 + 32 | 0) >> 2] = ((e | 0) > (g | 0) ? e : g) + 1 | 0, o = h[i], e = o >> 2, g = l[e + (q * 9 | 0)], s = l[e + (p * 9 | 0)], u = l[e + (q * 9 | 0) + 1], f = l[e + (p * 9 | 0) + 1], f = u < f ? u : f, u = o + r * 36 | 0, g = (x[0] = g < s ? g : s, t[0]), s = (x[0] = f, t[0]) | 0, h[(u | 0) >> 2] = 0 | g, h[(u + 4 | 0) >> 2] = s, g = l[e + (q * 9 | 0) + 2], s = l[e + (p * 9 | 0) + 2], q = l[e + (q * 9 | 0) + 3], p = l[e + (p * 9 | 0) + 3], q = q > p ? q : p, p = o + r * 36 + 8 | 0, o = (x[0] = g > s ? g : s, t[0]), q = (x[0] = q, t[0]) | 0, h[(p | 0) >> 2] = 0 | o, h[(p + 4 | 0) >> 2] = q, r = h[(h[i] + 20 >> 2) + (r * 9 | 0)], (r | 0) == -1) {
            break a;
          }
        }
      }
    }
  } while (0);
}

function Pr(c, d) {
  var e, f, g, i, j, m, n, o, q, p, r, s, u, z, E, A, I, C, K, J, N, B, F, H, O = c >> 2, D;
  (d | 0) == -1 && G(y.d | 0, 382, y.l | 0, y.Bc | 0);
  H = (c + 4 | 0) >> 2;
  var Q = h[H];
  F = Q >> 2;
  var P = Q + d * 36 | 0;
  B = (Q + d * 36 + 24 | 0) >> 2;
  var M = h[B];
  if ((M | 0) == -1) {
    var Na = d;
  } else {
    if (N = (Q + d * 36 + 32 | 0) >> 2, (h[N] | 0) < 2) {
      Na = d;
    } else {
      J = (Q + d * 36 + 28 | 0) >> 2;
      var U = h[J];
      D = (M | 0) > -1 ? (M | 0) < (h[O + 3] | 0) ? 7 : 6 : 6;
      D == 6 && G(y.d | 0, 392, y.l | 0, y.Cc | 0);
      D = (U | 0) > -1 ? (U | 0) < (h[O + 3] | 0) ? 10 : 9 : 9;
      D == 9 && G(y.d | 0, 393, y.l | 0, y.Bb | 0);
      var L = h[H];
      K = L >> 2;
      var R = L + M * 36 | 0, la = L + U * 36 | 0;
      C = (L + U * 36 + 32 | 0) >> 2;
      I = (L + M * 36 + 32 | 0) >> 2;
      var Da = h[C] - h[I] | 0;
      if ((Da | 0) > 1) {
        var Y = L + U * 36 + 24 | 0, Z = h[Y >> 2];
        A = (L + U * 36 + 28 | 0) >> 2;
        var W = h[A], wa = L + Z * 36 | 0, X = L + W * 36 | 0;
        D = (Z | 0) > -1 ? (Z | 0) < (h[O + 3] | 0) ? 14 : 13 : 13;
        D == 13 && G(y.d | 0, 407, y.l | 0, y.Cb | 0);
        D = (W | 0) > -1 ? (W | 0) < (h[O + 3] | 0) ? 17 : 16 : 16;
        D == 16 && G(y.d | 0, 408, y.l | 0, y.Ib | 0);
        h[Y >> 2] = d;
        var aa = Q + d * 36 + 20 | 0, ga = h[aa >> 2];
        E = (L + U * 36 + 20 | 0) >> 2;
        h[E] = ga;
        h[aa >> 2] = U;
        var ca = h[E];
        if ((ca | 0) == -1) {
          h[O] = U;
        } else {
          var La = h[H], Ua = La + ca * 36 + 24 | 0;
          if ((h[Ua >> 2] | 0) == (d | 0)) {
            h[Ua >> 2] = U;
          } else {
            if ((h[(La + 28 >> 2) + (ca * 9 | 0)] | 0) == (d | 0)) {
              var Va = ca, ma = La;
            } else {
              G(y.d | 0, 424, y.l | 0, y.Nb | 0), Va = h[E], ma = h[H];
            }
            h[(ma + 28 >> 2) + (Va * 9 | 0)] = U;
          }
        }
        z = (L + Z * 36 + 32 | 0) >> 2;
        u = (L + W * 36 + 32 | 0) >> 2;
        if ((h[z] | 0) > (h[u] | 0)) {
          h[A] = Z;
          h[J] = W;
          h[(L + W * 36 + 20 | 0) >> 2] = d;
          var xa = l[R >> 2], ua = l[X >> 2], da = xa < ua ? xa : ua, ya = l[K + (M * 9 | 0) + 1], Ha = l[K + (W * 9 | 0) + 1], ab = ya < Ha ? ya : Ha, bb = (x[0] = da, t[0]), ob = (x[0] = ab, t[0]), gb = 0 | bb, yb = ob | 0, db = P | 0;
          s = db >> 2;
          h[s] = gb;
          var eb = P + 4 | 0;
          r = eb >> 2;
          h[r] = yb;
          var pa = l[K + (M * 9 | 0) + 2], $ = l[K + (W * 9 | 0) + 2], Oa = l[K + (M * 9 | 0) + 3], ea = l[K + (W * 9 | 0) + 3], ha = Oa > ea ? Oa : ea, ja = Q + d * 36 + 8 | 0, ka = (x[0] = pa > $ ? pa : $, t[0]), za = (x[0] = ha, t[0]), qa = 0 | ka, Aa = za | 0, fb = ja | 0;
          p = fb >> 2;
          h[p] = qa;
          var na = ja + 4 | 0;
          q = na >> 2;
          h[q] = Aa;
          var Pa = l[wa >> 2], mb = l[F + (d * 9 | 0) + 1], lb = l[K + (Z * 9 | 0) + 1], pb = mb < lb ? mb : lb, Cb = (x[0] = da < Pa ? da : Pa, t[0]), hb = (x[0] = pb, t[0]), Qa = 0 | Cb, ba = hb | 0, ra = la | 0;
          o = ra >> 2;
          h[o] = Qa;
          var Ma = la + 4 | 0;
          n = Ma >> 2;
          h[n] = ba;
          var Wa = l[F + (d * 9 | 0) + 2], Ca = l[K + (Z * 9 | 0) + 2], Ba = l[F + (d * 9 | 0) + 3], Xa = l[K + (Z * 9 | 0) + 3], fa = Ba > Xa ? Ba : Xa, Ra = L + U * 36 + 8 | 0, Za = (x[0] = Wa > Ca ? Wa : Ca, t[0]), nb = (x[0] = fa, t[0]), Fb = 0 | Za, qb = nb | 0, Ia = Ra | 0;
          m = Ia >> 2;
          h[m] = Fb;
          var rb = Ra + 4 | 0;
          j = rb >> 2;
          h[j] = qb;
          var Ya = h[I], oa = h[u], Fa = ((Ya | 0) > (oa | 0) ? Ya : oa) + 1 | 0;
          h[N] = Fa;
          var $a = h[z], Ea = (Fa | 0) > ($a | 0) ? Fa : $a;
        } else {
          h[A] = W;
          h[J] = Z;
          h[(L + Z * 36 + 20 | 0) >> 2] = d;
          var Ga = l[R >> 2], Ja = l[wa >> 2], Sa = Ga < Ja ? Ga : Ja, vb = l[K + (M * 9 | 0) + 1], Gb = l[K + (Z * 9 | 0) + 1], zb = vb < Gb ? vb : Gb, Nb = (x[0] = Sa, t[0]), Ob = (x[0] = zb, t[0]), Db = 0 | Nb, Pb = Ob | 0, db = P | 0;
          s = db >> 2;
          h[s] = Db;
          eb = P + 4 | 0;
          r = eb >> 2;
          h[r] = Pb;
          var Ab = l[K + (M * 9 | 0) + 2], Eb = l[K + (Z * 9 | 0) + 2], sb = l[K + (M * 9 | 0) + 3], cb = l[K + (Z * 9 | 0) + 3], Mb = sb > cb ? sb : cb, wb = Q + d * 36 + 8 | 0, tb = (x[0] = Ab > Eb ? Ab : Eb, t[0]), V = (x[0] = Mb, t[0]), ia = 0 | tb, Hb = V | 0, fb = wb | 0;
          p = fb >> 2;
          h[p] = ia;
          na = wb + 4 | 0;
          q = na >> 2;
          h[q] = Hb;
          var Qb = l[X >> 2], Bb = l[F + (d * 9 | 0) + 1], Ib = l[K + (W * 9 | 0) + 1], Xb = Bb < Ib ? Bb : Ib, ec = (x[0] = Sa < Qb ? Sa : Qb, t[0]), Ka = (x[0] = Xb, t[0]), Jb = 0 | ec, S = Ka | 0, ra = la | 0;
          o = ra >> 2;
          h[o] = Jb;
          Ma = la + 4 | 0;
          n = Ma >> 2;
          h[n] = S;
          var ub = l[F + (d * 9 | 0) + 2], Kb = l[K + (W * 9 | 0) + 2], sa = l[F + (d * 9 | 0) + 3], Rb = l[K + (W * 9 | 0) + 3], ic = sa > Rb ? sa : Rb, $b = L + U * 36 + 8 | 0, ac = (x[0] = ub > Kb ? ub : Kb, t[0]), lc = (x[0] = ic, t[0]), yc = 0 | ac, Gc = lc | 0, Ia = $b | 0;
          m = Ia >> 2;
          h[m] = yc;
          rb = $b + 4 | 0;
          j = rb >> 2;
          h[j] = Gc;
          var zc = h[I], mc = h[z], bc = ((zc | 0) > (mc | 0) ? zc : mc) + 1 | 0;
          h[N] = bc;
          var cc = h[u], Ea = (bc | 0) > (cc | 0) ? bc : cc;
        }
        h[C] = Ea + 1 | 0;
        Na = U;
      } else {
        if ((Da | 0) < -1) {
          var Sb = L + M * 36 + 24 | 0, Lb = h[Sb >> 2];
          i = (L + M * 36 + 28 | 0) >> 2;
          var ib = h[i], Tb = L + Lb * 36 | 0, dc = L + ib * 36 | 0;
          D = (Lb | 0) > -1 ? (Lb | 0) < (h[O + 3] | 0) ? 32 : 31 : 31;
          D == 31 && G(y.d | 0, 467, y.l | 0, y.Rb | 0);
          D = (ib | 0) > -1 ? (ib | 0) < (h[O + 3] | 0) ? 35 : 34 : 34;
          D == 34 && G(y.d | 0, 468, y.l | 0, y.Sb | 0);
          h[Sb >> 2] = d;
          var Ac = Q + d * 36 + 20 | 0, Hc = h[Ac >> 2];
          g = (L + M * 36 + 20 | 0) >> 2;
          h[g] = Hc;
          h[Ac >> 2] = M;
          var Ic = h[g];
          if ((Ic | 0) == -1) {
            h[O] = M;
          } else {
            var fc = h[H], od = fc + Ic * 36 + 24 | 0;
            if ((h[od >> 2] | 0) == (d | 0)) {
              h[od >> 2] = M;
            } else {
              if ((h[(fc + 28 >> 2) + (Ic * 9 | 0)] | 0) == (d | 0)) {
                var Wc = Ic, Qc = fc;
              } else {
                G(y.d | 0, 484, y.l | 0, y.Tb | 0), Wc = h[g], Qc = h[H];
              }
              h[(Qc + 28 >> 2) + (Wc * 9 | 0)] = M;
            }
          }
          f = (L + Lb * 36 + 32 | 0) >> 2;
          e = (L + ib * 36 + 32 | 0) >> 2;
          if ((h[f] | 0) > (h[e] | 0)) {
            h[i] = Lb;
            h[B] = ib;
            h[(L + ib * 36 + 20 | 0) >> 2] = d;
            var xb = l[la >> 2], Wb = l[dc >> 2], oc = xb < Wb ? xb : Wb, Tc = l[K + (U * 9 | 0) + 1], Jc = l[K + (ib * 9 | 0) + 1], Kc = Tc < Jc ? Tc : Jc, gc = (x[0] = oc, t[0]), Bc = (x[0] = Kc, t[0]), Rc = 0 | gc, jc = Bc | 0, db = P | 0;
            s = db >> 2;
            h[s] = Rc;
            eb = P + 4 | 0;
            r = eb >> 2;
            h[r] = jc;
            var Lc = l[K + (U * 9 | 0) + 2], vd = l[K + (ib * 9 | 0) + 2], tc = l[K + (U * 9 | 0) + 3], uc = l[K + (ib * 9 | 0) + 3], Xc = tc > uc ? tc : uc, wd = Q + d * 36 + 8 | 0, jb = (x[0] = Lc > vd ? Lc : vd, t[0]), rc = (x[0] = Xc, t[0]), Ub = 0 | jb, xd = rc | 0, fb = wd | 0;
            p = fb >> 2;
            h[p] = Ub;
            na = wd + 4 | 0;
            q = na >> 2;
            h[q] = xd;
            var nc = l[Tb >> 2], Yb = l[F + (d * 9 | 0) + 1], yd = l[K + (Lb * 9 | 0) + 1], Od = Yb < yd ? Yb : yd, cd = (x[0] = oc < nc ? oc : nc, t[0]), dd = (x[0] = Od, t[0]), Yc = 0 | cd, ed = dd | 0, ra = R | 0;
            o = ra >> 2;
            h[o] = Yc;
            Ma = R + 4 | 0;
            n = Ma >> 2;
            h[n] = ed;
            var pc = l[F + (d * 9 | 0) + 2], Mc = l[K + (Lb * 9 | 0) + 2], Uc = l[F + (d * 9 | 0) + 3], fd = l[K + (Lb * 9 | 0) + 3], Cc = Uc > fd ? Uc : fd, pd = L + M * 36 + 8 | 0, zd = (x[0] = pc > Mc ? pc : Mc, t[0]), be = (x[0] = Cc, t[0]), Jd = 0 | zd, Pd = be | 0, Ia = pd | 0;
            m = Ia >> 2;
            h[m] = Jd;
            rb = pd + 4 | 0;
            j = rb >> 2;
            h[j] = Pd;
            var qd = h[C], kc = h[e], hc = ((qd | 0) > (kc | 0) ? qd : kc) + 1 | 0;
            h[N] = hc;
            var vc = h[f], gd = (hc | 0) > (vc | 0) ? hc : vc;
          } else {
            h[i] = ib;
            h[B] = Lb;
            h[(L + Lb * 36 + 20 | 0) >> 2] = d;
            var hd = l[la >> 2], qc = l[Tb >> 2], Zb = hd < qc ? hd : qc, Ad = l[K + (U * 9 | 0) + 1], id = l[K + (Lb * 9 | 0) + 1], ce = Ad < id ? Ad : id, Qd = (x[0] = Zb, t[0]), Rd = (x[0] = ce, t[0]), Zc = 0 | Qd, Bd = Rd | 0, db = P | 0;
            s = db >> 2;
            h[s] = Zc;
            eb = P + 4 | 0;
            r = eb >> 2;
            h[r] = Bd;
            var jd = l[K + (U * 9 | 0) + 2], Cd = l[K + (Lb * 9 | 0) + 2], kd = l[K + (U * 9 | 0) + 3], Vc = l[K + (Lb * 9 | 0) + 3], Sd = kd > Vc ? kd : Vc, Dd = Q + d * 36 + 8 | 0, ye = (x[0] = jd > Cd ? jd : Cd, t[0]), Xd = (x[0] = Sd, t[0]), pe = 0 | ye, Le = Xd | 0, fb = Dd | 0;
            p = fb >> 2;
            h[p] = pe;
            na = Dd + 4 | 0;
            q = na >> 2;
            h[q] = Le;
            var qe = l[dc >> 2], Nc = l[F + (d * 9 | 0) + 1], Kd = l[K + (ib * 9 | 0) + 1], Ld = Nc < Kd ? Nc : Kd, ld = (x[0] = Zb < qe ? Zb : qe, t[0]), de = (x[0] = Ld, t[0]), Sc = 0 | ld, md = de | 0, ra = R | 0;
            o = ra >> 2;
            h[o] = Sc;
            Ma = R + 4 | 0;
            n = Ma >> 2;
            h[n] = md;
            var Me = l[F + (d * 9 | 0) + 2], ze = l[K + (ib * 9 | 0) + 2], ee = l[F + (d * 9 | 0) + 3], cf = l[K + (ib * 9 | 0) + 3], df = ee > cf ? ee : cf, ef = L + M * 36 + 8 | 0, Qf = (x[0] = Me > ze ? Me : ze, t[0]), Ae = (x[0] = df, t[0]), rg = 0 | Qf, re = Ae | 0, Ia = ef | 0;
            m = Ia >> 2;
            h[m] = rg;
            rb = ef + 4 | 0;
            j = rb >> 2;
            h[j] = re;
            var Be = h[C], Rf = h[f], Ne = ((Be | 0) > (Rf | 0) ? Be : Rf) + 1 | 0;
            h[N] = Ne;
            var ff = h[e], gd = (Ne | 0) > (ff | 0) ? Ne : ff;
          }
          h[I] = gd + 1 | 0;
          Na = M;
        } else {
          Na = d;
        }
      }
    }
  }
  return Na;
}

function Js(c, d, e, f) {
  var g = c >> 2, i = 1 - f, j = l[g + 4] * i + l[g + 6] * f, m = l[g + 5] * i + l[g + 7] * f, n = i * l[g + 8] + l[g + 9] * f, o = Ks(n), n = Ms(n), q = l[g + 2], p = l[g + 3];
  j -= n * q - o * p;
  m -= o * q + n * p;
  var q = l[g + 13] * i + l[g + 15] * f, p = l[g + 14] * i + l[g + 16] * f, i = i * l[g + 17] + l[g + 18] * f, f = Ks(i), i = Ms(i), r = l[g + 11], s = l[g + 12];
  q -= i * r - f * s;
  p -= f * r + i * s;
  r = h[g + 20];
  if (r == 0) {
    var r = c + 92 | 0, s = c + 96 | 0, u = h[g], c = (d | 0) > -1 ? (h[u + 20 >> 2] | 0) > (d | 0) ? 4 : 3 : 3;
    c == 3 && G(y.b | 0, 103, y.a | 0, y.c | 0);
    d = (d << 3) + h[u + 16 >> 2] | 0;
    c = h[(d + 4 | 0) >> 2];
    d = (t[0] = h[(d | 0) >> 2], x[0]);
    u = (t[0] = c, x[0]);
    g = h[g + 1];
    c = (e | 0) > -1 ? (h[g + 20 >> 2] | 0) > (e | 0) ? 7 : 6 : 6;
    c == 6 && G(y.b | 0, 103, y.a | 0, y.c | 0);
    e = (e << 3) + h[g + 16 >> 2] | 0;
    g = h[(e + 4 | 0) >> 2];
    e = (t[0] = h[(e | 0) >> 2], x[0]);
    g = (t[0] = g, x[0]);
    o = (i * e - f * g + q - (n * d - o * u + j)) * l[r >> 2] + (f * e + i * g + p - (o * d + n * u + m)) * l[s >> 2];
  } else {
    r == 1 ? (c = l[g + 23], r = l[g + 24], d = n * c - o * r, r = o * c + n * r, c = l[g + 21], s = l[g + 22], j = n * c - o * s + j, o = o * c + n * s + m, n = h[g + 1], c = (e | 0) > -1 ? (h[n + 20 >> 2] | 0) > (e | 0) ? 11 : 10 : 10, c == 10 && G(y.b | 0, 103, y.a | 0, y.c | 0), m = (e << 3) + h[n + 16 >> 2] | 0, n = h[(m + 4 | 0) >> 2], m = (t[0] = h[(m | 0) >> 2], x[0]), n = (t[0] = n, x[0]), o = (i * m - f * n + q - j) * d + (f * m + i * n + p - o) * r) : r == 2 ? (c = l[g + 23], r = l[g + 24], e = i * c - f * r, r = f * c + i * r, c = l[g + 21], s = l[g + 22], q = i * c - f * s + q, f = f * c + i * s + p, i = h[g], c = (d | 0) > -1 ? (h[i + 20 >> 2] | 0) > (d | 0) ? 15 : 14 : 14, c == 14 && G(y.b | 0, 103, y.a | 0, y.c | 0), g = (d << 3) + h[i + 16 >> 2] | 0, i = h[(g + 4 | 0) >> 2], g = (t[0] = h[(g | 0) >> 2], x[0]), i = (t[0] = i, x[0]), o = (n * g - o * i + j - q) * e + (o * g + n * i + m - f) * r) : (G(y.K | 0, 242, y.yb | 0, y.f | 0), o = 0);
  }
  return o;
}

function Ss(c, d, e) {
  var f;
  ((e | 0) > -1 ? (h[c + 16 >> 2] - 1 | 0) > (e | 0) ? 3 : 2 : 2) == 2 && G(y.jc | 0, 89, y.vb | 0, y.kc | 0);
  h[d + 4 >> 2] = 1;
  l[d + 8 >> 2] = l[c + 8 >> 2];
  f = (c + 12 | 0) >> 2;
  var g = (e << 3) + h[f] | 0, i = d + 12 | 0, j = h[g + 4 >> 2];
  h[i >> 2] = h[g >> 2];
  h[i + 4 >> 2] = j;
  g = (e + 1 << 3) + h[f] | 0;
  i = d + 20 | 0;
  j = h[g + 4 >> 2];
  h[i >> 2] = h[g >> 2];
  h[i + 4 >> 2] = j;
  g = d + 28 | 0;
  (e | 0) > 0 ? (i = (e - 1 << 3) + h[f] | 0, j = h[(i + 4 | 0) >> 2], h[(g | 0) >> 2] = h[(i | 0) >> 2], h[(g + 4 | 0) >> 2] = j, a[d + 44 | 0] = 1) : (i = c + 20 | 0, j = h[(i + 4 | 0) >> 2], h[(g | 0) >> 2] = h[(i | 0) >> 2], h[(g + 4 | 0) >> 2] = j, a[d + 44 | 0] = a[c + 36 | 0] & 1);
  g = d + 36 | 0;
  (h[c + 16 >> 2] - 2 | 0) > (e | 0) ? (e = (e + 2 << 3) + h[f] | 0, c = h[(e | 0) >> 2], e = h[(e + 4 | 0) >> 2], h[(g | 0) >> 2] = c, h[(g + 4 | 0) >> 2] = e, a[d + 45 | 0] = 1) : (f = c + 28 | 0, e = h[(f | 0) >> 2], f = h[(f + 4 | 0) >> 2], h[(g | 0) >> 2] = e, h[(g + 4 | 0) >> 2] = f, a[d + 45 | 0] = a[c + 37 | 0] & 1);
}

function co(c, d) {
  var e, f, g, i = (d | 0) == 0;
  a : do {
    if (i) {
      g = 0;
    } else {
      g = (d | 0) > 0;
      do {
        if (g) {
          if ((d | 0) <= 640) {
            break;
          }
          g = Wk(d);
          break a;
        }
        G(y.e | 0, 104, y.N | 0, y.za | 0);
      } while (0);
      g = Dh[Qm + d | 0];
      var j = g & 255;
      (g & 255) < 14 || G(y.e | 0, 112, y.N | 0, y.i | 0);
      g = ((j << 2) + c + 12 | 0) >> 2;
      f = k[g];
      if ((f | 0) == 0) {
        f = (c + 4 | 0) >> 2;
        var m = k[f], n = c + 8 | 0, o = h[n >> 2];
        e = (c | 0) >> 2;
        (m | 0) == (o | 0) ? (m = h[e], o = o + 128 | 0, h[n >> 2] = o, n = Wk(o << 3), h[e] = n, Xp(n, m, h[f] << 3), Xk((h[f] << 3) + h[e] | 0, 1024), yp(m), n = h[f]) : n = m;
        o = h[e];
        m = Wk(16384);
        e = ((n << 3) + o + 4 | 0) >> 2;
        h[e] = m;
        j = h[Pm + (j << 2) >> 2];
        h[((n << 3) + o | 0) >> 2] = j;
        n = 16384 / j | 0;
        (n * j | 0) < 16385 ? o = m : (G(y.e | 0, 140, y.N | 0, y.mc | 0), o = h[e]);
        n = n - 1 | 0;
        m = (n | 0) > 0;
        b : do {
          if (m) {
            for (var q = 0, p = o; ; ) {
              var r = q + 1 | 0;
              h[(p + q * j | 0) >> 2] = p + r * j | 0;
              p = h[e];
              if ((r | 0) == (n | 0)) {
                var s = p;
                break b;
              }
              q = r;
            }
          } else {
            s = o;
          }
        } while (0);
        h[(s + n * j | 0) >> 2] = 0;
        h[g] = h[h[e] >> 2];
        h[f] = h[f] + 1 | 0;
        g = h[e];
      } else {
        h[g] = h[f >> 2], g = f;
      }
    }
  } while (0);
  return g;
}

function Ts(c, d) {
  var e;
  e = (c + 102796 | 0) >> 2;
  var f = h[e];
  (f | 0) > 0 || (G(y.j | 0, 63, y.ca | 0, y.nc | 0), f = h[e]);
  f = f - 1 | 0;
  (h[(c + 102412 >> 2) + (f * 3 | 0)] | 0) != (d | 0) && G(y.j | 0, 65, y.ca | 0, y.uc | 0);
  if ((a[c + f * 12 + 102420 | 0] & 1) << 24 >> 24 == 0) {
    var f = c + f * 12 + 102416 | 0, g = c + 102400 | 0;
    h[g >> 2] = h[g >> 2] - h[f >> 2] | 0;
  } else {
    yp(d), f = c + f * 12 + 102416 | 0;
  }
  g = c + 102404 | 0;
  h[g >> 2] = h[g >> 2] - h[f >> 2] | 0;
  h[e] = h[e] - 1 | 0;
}

function eo(c, d, e) {
  var f, g, i = d >> 2, j = c >> 2, m = c + 12 | 0, n = c + 64 | 0, o = d + 4 | 0, q = l[o >> 2];
  (!isNaN(q) && !isNaN(0)) & q > -Infinity & q < Infinity ? (q = l[i + 2], g = (!isNaN(q) && !isNaN(0)) & q > -Infinity & q < Infinity ? 3 : 2) : g = 2;
  g == 2 && G(y.m | 0, 27, y.q | 0, y.Wb | 0);
  q = d + 16 | 0;
  g = l[q >> 2];
  (!isNaN(g) && !isNaN(0)) & g > -Infinity & g < Infinity ? (g = l[i + 5], g = (!isNaN(g) && !isNaN(0)) & g > -Infinity & g < Infinity ? 6 : 5) : g = 5;
  g == 5 && G(y.m | 0, 28, y.q | 0, y.bc | 0);
  g = (d + 12 | 0) >> 2;
  var p = l[g];
  (!isNaN(p) && !isNaN(0)) & p > -Infinity & p < Infinity || G(y.m | 0, 29, y.q | 0, y.gc | 0);
  var p = d + 24 | 0, r = l[p >> 2];
  (!isNaN(r) && !isNaN(0)) & r > -Infinity & r < Infinity || G(y.m | 0, 30, y.q | 0, y.oc | 0);
  var r = d + 32 | 0, s = l[r >> 2];
  s < 0 | (!isNaN(s) && !isNaN(0)) & s > -Infinity & s < Infinity ^ 1 && G(y.m | 0, 31, y.q | 0, y.vc | 0);
  s = d + 28 | 0;
  f = l[s >> 2];
  f < 0 | (!isNaN(f) && !isNaN(0)) & f > -Infinity & f < Infinity ^ 1 && G(y.m | 0, 32, y.q | 0, y.yc | 0);
  f = (c + 4 | 0) >> 1;
  b[f] = 0;
  var u = (a[d + 39 | 0] & 1) << 24 >> 24 == 0 ? 0 : b[f] = 8;
  (a[d + 38 | 0] & 1) << 24 >> 24 != 0 && (u |= 16, b[f] = u);
  (a[d + 36 | 0] & 1) << 24 >> 24 != 0 && (u |= 4, b[f] = u);
  (a[d + 37 | 0] & 1) << 24 >> 24 != 0 && (u |= 2, b[f] = u);
  (a[d + 40 | 0] & 1) << 24 >> 24 != 0 && (b[f] = u | 32);
  h[j + 22] = e;
  d = h[o >> 2];
  o = h[o + 4 >> 2];
  h[m >> 2] = d;
  h[m + 4 >> 2] = o;
  m = l[g];
  e = Ks(m);
  l[j + 5] = e;
  m = Ms(m);
  l[j + 6] = m;
  l[j + 7] = 0;
  l[j + 8] = 0;
  m = c + 36 | 0;
  h[m >> 2] = d;
  h[m + 4 >> 2] = o;
  m = c + 44 | 0;
  h[m >> 2] = d;
  h[m + 4 >> 2] = o;
  l[j + 13] = l[g];
  l[j + 14] = l[g];
  l[j + 15] = 0;
  h[j + 27] = 0;
  h[j + 28] = 0;
  h[j + 23] = 0;
  h[j + 24] = 0;
  g = h[q + 4 >> 2];
  h[n >> 2] = h[q >> 2];
  h[n + 4 >> 2] = g;
  l[j + 18] = l[p >> 2];
  l[j + 33] = l[s >> 2];
  l[j + 34] = l[r >> 2];
  l[j + 35] = l[i + 12];
  l[j + 19] = 0;
  l[j + 20] = 0;
  l[j + 21] = 0;
  l[j + 36] = 0;
  n = h[i];
  h[j] = n;
  c = c + 116 | 0;
  (n | 0) == 2 ? (l[c >> 2] = 1, l[j + 30] = 1) : (l[c >> 2] = 0, l[j + 30] = 0);
  l[j + 31] = 0;
  l[j + 32] = 0;
  h[j + 37] = h[i + 11];
  h[j + 25] = 0;
  h[j + 26] = 0;
}

function pp(c, d) {
  var e, f, g, i, j, m, n, o, q, p, r, s, u, z, E, A, I = d >> 2, C = c >> 2, K = qg;
  qg += 16;
  var J;
  A = (c + 88 | 0) >> 2;
  var N = h[A], B = h[N + 102868 >> 2];
  if ((B & 2 | 0) == 0) {
    var F = N, H = B;
  } else {
    G(y.m | 0, 153, y.qb | 0, y.Ac | 0);
    var O = h[A], F = O, H = h[O + 102868 >> 2];
  }
  if ((H & 2 | 0) == 0) {
    var D = F | 0, Q = co(D, 44);
    if ((Q | 0) == 0) {
      var P = 0;
    } else {
      b[Q + 32 >> 1] = 1, b[Q + 34 >> 1] = -1, b[Q + 36 >> 1] = 0, h[Q + 40 >> 2] = 0, h[Q + 8 >> 2] = 0, h[Q + 4 >> 2] = 0, h[Q + 24 >> 2] = 0, h[Q + 28 >> 2] = 0, h[Q + 12 >> 2] = 0, l[Q >> 2] = 0, P = Q;
    }
    E = P >> 2;
    h[E + 10] = h[I + 1];
    l[E + 4] = l[I + 2];
    l[E + 5] = l[I + 3];
    var M = P + 8 | 0;
    h[M >> 2] = c;
    var Na = P + 4 | 0;
    h[Na >> 2] = 0;
    z = (P + 32 | 0) >> 1;
    u = (d + 22 | 0) >> 1;
    b[z] = b[u];
    b[z + 1] = b[u + 1];
    b[z + 2] = b[u + 2];
    a[P + 38 | 0] = a[d + 20 | 0] & 1;
    var U = h[I], L = Wl[h[h[U >> 2] + 8 >> 2]](U, D);
    s = (P + 12 | 0) >> 2;
    h[s] = L;
    var R = Wl[h[h[L >> 2] + 12 >> 2]](L), la = co(D, R * 28 | 0);
    r = (P + 24 | 0) >> 2;
    h[r] = la;
    var Da = (R | 0) > 0;
    a : do {
      if (Da && (h[(la + 16 | 0) >> 2] = 0, h[(h[r] + 24 | 0) >> 2] = -1, (R | 0) != 1)) {
        for (var Y = 1; ; ) {
          h[(h[r] + Y * 28 + 16 | 0) >> 2] = 0;
          h[(h[r] + Y * 28 + 24 | 0) >> 2] = -1;
          var Z = Y + 1 | 0;
          if ((Z | 0) == (R | 0)) {
            break a;
          }
          Y = Z;
        }
      }
    } while (0);
    p = (P + 28 | 0) >> 2;
    h[p] = 0;
    var W = P | 0;
    l[W >> 2] = l[I + 4];
    var wa = c + 4 | 0, X = (b[wa >> 1] & 32) << 16 >> 16 == 0;
    a : do {
      if (!X) {
        var aa = h[A], ga = aa + 102872 | 0, ca = c + 12 | 0, La = h[s], Ua = Wl[h[h[La >> 2] + 12 >> 2]](La);
        h[p] = Ua;
        if ((Ua | 0) > 0) {
          var Va = ga;
          q = (aa + 102876 | 0) >> 2;
          var ma = aa + 102900 | 0;
          o = (aa + 102912 | 0) >> 2;
          var xa = aa + 102908 | 0;
          n = (aa + 102904 | 0) >> 2;
          for (var ua = 0; ; ) {
            var da = h[r];
            m = da >> 2;
            var ya = da + ua * 28 | 0, Ha = h[s];
            Wl[h[h[Ha >> 2] + 24 >> 2]](Ha, ya | 0, ca, ua);
            var ab = ya, bb = Wp(Va), ob = l[m + (ua * 7 | 0) + 1] - .10000000149011612, gb = h[q] + bb * 36 | 0, yb = (x[0] = l[ya >> 2] - .10000000149011612, t[0]), db = (x[0] = ob, t[0]) | 0;
            h[(gb | 0) >> 2] = 0 | yb;
            h[(gb + 4 | 0) >> 2] = db;
            var eb = l[m + (ua * 7 | 0) + 3] + .10000000149011612, pa = h[q] + bb * 36 + 8 | 0, $ = (x[0] = l[m + (ua * 7 | 0) + 2] + .10000000149011612, t[0]), Oa = (x[0] = eb, t[0]) | 0;
            h[(pa | 0) >> 2] = 0 | $;
            h[(pa + 4 | 0) >> 2] = Oa;
            h[(h[q] + bb * 36 + 16 | 0) >> 2] = ab;
            h[(h[q] + bb * 36 + 32 | 0) >> 2] = 0;
            Yp(Va, bb);
            h[ma >> 2] = h[ma >> 2] + 1 | 0;
            var ea = h[o], ha = h[xa >> 2];
            if ((ea | 0) == (ha | 0)) {
              var ja = h[n];
              h[xa >> 2] = ha << 1;
              var ka = Wk(ha << 3);
              h[n] = ka;
              var za = ja;
              Xp(ka, za, h[o] << 2);
              yp(za);
              var qa = h[o];
            } else {
              qa = ea;
            }
            h[((qa << 2) + h[n] | 0) >> 2] = bb;
            h[o] = h[o] + 1 | 0;
            h[(da + ua * 28 + 24 | 0) >> 2] = bb;
            h[(da + ua * 28 + 16 | 0) >> 2] = P;
            h[(da + ua * 28 + 20 | 0) >> 2] = ua;
            var Aa = ua + 1 | 0;
            if ((Aa | 0) >= (h[p] | 0)) {
              break a;
            }
            ua = Aa;
          }
        }
      }
    } while (0);
    j = (c + 100 | 0) >> 2;
    h[Na >> 2] = h[j];
    h[j] = P;
    var fb = c + 104 | 0;
    h[fb >> 2] = h[fb >> 2] + 1 | 0;
    h[M >> 2] = c;
    var na = l[W >> 2] > 0;
    do {
      if (na) {
        i = (c + 116 | 0) >> 2;
        l[i] = 0;
        g = (c + 120 | 0) >> 2;
        l[g] = 0;
        f = (c + 124 | 0) >> 2;
        l[f] = 0;
        var Pa = c + 128 | 0;
        l[Pa >> 2] = 0;
        var mb = c + 28 | 0;
        l[mb >> 2] = 0;
        l[C + 8] = 0;
        var lb = h[C];
        if (lb == 0 || lb == 1) {
          var pb = c + 12 | 0, Cb = c + 36 | 0, hb = pb | 0, Qa = h[hb >> 2], ba = pb + 4 | 0, ra = h[ba >> 2];
          h[Cb >> 2] = Qa;
          h[Cb + 4 >> 2] = ra;
          var Ma = c + 44 | 0;
          h[Ma >> 2] = Qa;
          h[Ma + 4 >> 2] = ra;
          l[C + 13] = l[C + 14];
        } else {
          lb != 2 && G(y.m | 0, 284, y.ja | 0, y.Hb | 0);
          var Wa = h[j], Ca = (Wa | 0) == 0;
          a : do {
            if (Ca) {
              var Ba = 0, Xa = 0;
            } else {
              var fa = K | 0, Ra = K + 4 | 0, Za = K + 8 | 0, nb = K + 12 | 0, Fb = 0, qb = 0, Ia = Wa;
              for (e = Ia >> 2; ; ) {
                var rb = l[e];
                if (rb == 0) {
                  var Ya = qb, oa = Fb;
                } else {
                  var Fa = h[e + 3];
                  Wl[h[h[Fa >> 2] + 28 >> 2]](Fa, K, rb);
                  var $a = l[fa >> 2];
                  l[i] += $a;
                  var Ea = qb + l[Ra >> 2] * $a, Ga = Fb + l[Za >> 2] * $a;
                  l[f] += l[nb >> 2];
                  Ya = Ea;
                  oa = Ga;
                }
                var Ja = h[e + 1];
                if ((Ja | 0) == 0) {
                  Ba = oa;
                  Xa = Ya;
                  break a;
                }
                Fb = oa;
                qb = Ya;
                Ia = Ja;
                e = Ia >> 2;
              }
            }
          } while (0);
          var Sa = l[i];
          if (Sa > 0) {
            var vb = 1 / Sa;
            l[g] = vb;
            var Gb = Xa * vb, zb = Ba * vb, Nb = Sa;
          } else {
            l[i] = 1, l[g] = 1, Gb = Xa, zb = Ba, Nb = 1;
          }
          var Ob = l[f];
          if (Ob > 0) {
            if ((b[wa >> 1] & 16) << 16 >> 16 != 0) {
              J = 31;
            } else {
              var Db = Ob - Nb * (Gb * Gb + zb * zb);
              l[f] = Db;
              if (Db > 0) {
                var Pb = Db;
              } else {
                G(y.m | 0, 319, y.ja | 0, y.Mb | 0), Pb = l[f];
              }
              var Ab = 1 / Pb;
              J = 32;
            }
          } else {
            J = 31;
          }
          J == 31 && (Ab = l[f] = 0);
          l[Pa >> 2] = Ab;
          var Eb = c + 44 | 0, hb = Eb | 0, ba = Eb + 4 | 0, sb = h[ba >> 2], cb = (t[0] = h[hb >> 2], x[0]), Mb = (t[0] = sb, x[0]), wb = mb, tb = (x[0] = Gb, t[0]), V = (x[0] = zb, t[0]) | 0;
          h[wb >> 2] = 0 | tb;
          h[wb + 4 >> 2] = V;
          var ia = c + 36 | 0, Hb = l[C + 6], Qb = l[C + 5], Bb = Hb * Gb - Qb * zb + l[C + 3], Ib = Qb * Gb + Hb * zb + l[C + 4], Xb = (x[0] = Bb, t[0]), ec = (x[0] = Ib, t[0]), Ka = 0 | Xb, Jb = ec | 0;
          h[Eb >> 2] = Ka;
          h[Eb + 4 >> 2] = Jb;
          var S = ia;
          h[S >> 2] = Ka;
          h[S + 4 >> 2] = Jb;
          var ub = l[C + 18], Kb = (Bb - cb) * ub;
          l[(c + 64 | 0) >> 2] += (Ib - Mb) * -ub;
          l[(c + 68 | 0) >> 2] += Kb;
        }
      }
    } while (0);
    h[(h[A] + 102868 | 0) >> 2] |= 1;
  }
  qg = K;
}

function Us(c, d) {
  var e, f, g;
  g = (d + 48 | 0) >> 2;
  var i = d + 52 | 0;
  e = h[h[g] + 8 >> 2];
  var j = h[h[i >> 2] + 8 >> 2];
  f = h[c + 72 >> 2];
  if ((f | 0) != 0 && (h[d + 4 >> 2] & 2 | 0) != 0) {
    Wl[h[h[f >> 2] + 12 >> 2]](f, d);
  }
  var m = d + 8 | 0, n = h[m >> 2];
  f = (d + 12 | 0) >> 2;
  (n | 0) != 0 && (h[(n + 12 | 0) >> 2] = h[f]);
  n = h[f];
  (n | 0) != 0 && (h[(n + 8 | 0) >> 2] = h[m >> 2]);
  m = c + 60 | 0;
  (h[m >> 2] | 0) == (d | 0) && (h[m >> 2] = h[f]);
  m = d + 24 | 0;
  n = h[m >> 2];
  f = (d + 28 | 0) >> 2;
  (n | 0) != 0 && (h[(n + 12 | 0) >> 2] = h[f]);
  n = h[f];
  (n | 0) != 0 && (h[(n + 8 | 0) >> 2] = h[m >> 2]);
  e = e + 112 | 0;
  (d + 16 | 0) == (h[e >> 2] | 0) && (h[e >> 2] = h[f]);
  f = d + 40 | 0;
  m = h[f >> 2];
  e = (d + 44 | 0) >> 2;
  (m | 0) != 0 && (h[(m + 12 | 0) >> 2] = h[e]);
  m = h[e];
  (m | 0) != 0 && (h[(m + 8 | 0) >> 2] = h[f >> 2]);
  j = j + 112 | 0;
  (d + 32 | 0) == (h[j >> 2] | 0) && (h[j >> 2] = h[e]);
  j = h[c + 76 >> 2];
  Dh[Vs] || G(y.A | 0, 103, y.Q | 0, y.dc | 0);
  (h[d + 124 >> 2] | 0) > 0 && (e = h[h[g] + 8 >> 2], f = e + 4 | 0, m = b[f >> 1], (m & 2) << 16 >> 16 == 0 && (b[f >> 1] = m | 2, l[e + 144 >> 2] = 0), e = h[h[i >> 2] + 8 >> 2], f = e + 4 | 0, m = b[f >> 1], (m & 2) << 16 >> 16 == 0 && (b[f >> 1] = m | 2, l[e + 144 >> 2] = 0));
  g = h[h[h[g] + 12 >> 2] + 4 >> 2];
  i = h[h[h[i >> 2] + 12 >> 2] + 4 >> 2];
  (g | 0) > -1 & (i | 0) < 4 || (G(y.A | 0, 114, y.Q | 0, y.Fa | 0), G(y.A | 0, 115, y.Q | 0, y.Fa | 0));
  Wl[h[(Ws + 4 >> 2) + (g * 12 | 0) + (i * 3 | 0)]](d, j);
  g = c + 64 | 0;
  h[g >> 2] = h[g >> 2] - 1 | 0;
}

function Xs(c, d) {
  var e, f, g, i, j, m, n, o, q, p, r, s, u, z, E = qg;
  qg += 1040;
  var A, I = E + 1036;
  z = (c + 52 | 0) >> 2;
  h[z] = 0;
  u = (c + 40 | 0) >> 2;
  var C = h[u];
  if ((C | 0) > 0) {
    var K = c + 32 | 0;
    s = (c + 56 | 0) >> 2;
    var J = c + 12 | 0, N = c + 4 | 0, B = E + 4 | 0;
    r = (E | 0) >> 2;
    p = (E + 1028 | 0) >> 2;
    q = (E + 1032 | 0) >> 2;
    var F = c | 0, H = c + 48 | 0, O = c + 44 | 0;
    o = O >> 2;
    for (var D = 0, Q = C; ; ) {
      var P = h[h[K >> 2] + (D << 2) >> 2];
      h[s] = P;
      if ((P | 0) == -1) {
        var M = Q;
      } else {
        A = (P | 0) > -1 ? (h[J >> 2] | 0) > (P | 0) ? 7 : 6 : 6;
        A == 6 && G(y.z | 0, 159, y.R | 0, y.s | 0);
        var Na = h[N >> 2];
        h[r] = B;
        h[q] = 256;
        h[B >> 2] = h[F >> 2];
        h[p] = 1;
        for (var U = Na + P * 36 | 0, L = Na + P * 36 + 4 | 0, R = Na + P * 36 + 8 | 0, la = Na + P * 36 + 12 | 0, Da = 1, Y = B; ; ) {
          var Z = Da - 1 | 0;
          h[p] = Z;
          var W = h[Y + (Z << 2) >> 2];
          if ((W | 0) == -1) {
            var wa = Z;
          } else {
            var X = h[N >> 2];
            n = X >> 2;
            if (l[U >> 2] - l[n + (W * 9 | 0) + 2] > 0 | l[L >> 2] - l[n + (W * 9 | 0) + 3] > 0 | l[n + (W * 9 | 0)] - l[R >> 2] > 0 | l[n + (W * 9 | 0) + 1] - l[la >> 2] > 0) {
              wa = Z;
            } else {
              var aa = X + W * 36 + 24 | 0;
              if ((h[aa >> 2] | 0) == -1) {
                var ga = h[s];
                if ((ga | 0) == (W | 0)) {
                  wa = Z;
                } else {
                  var ca = h[z], La = h[H >> 2];
                  if ((ca | 0) == (La | 0)) {
                    var Ua = h[o];
                    h[H >> 2] = La << 1;
                    var Va = Wk(La * 24 | 0);
                    h[o] = Va;
                    var ma = Ua;
                    Xp(Va, ma, h[z] * 12 | 0);
                    yp(ma);
                    var xa = h[s], ua = h[z];
                  } else {
                    xa = ga, ua = ca;
                  }
                  h[(h[o] + ua * 12 | 0) >> 2] = (xa | 0) > (W | 0) ? W : xa;
                  var da = h[s];
                  h[(h[o] + h[z] * 12 + 4 | 0) >> 2] = (da | 0) < (W | 0) ? W : da;
                  h[z] = h[z] + 1 | 0;
                  wa = h[p];
                }
              } else {
                var ya = h[q];
                if ((Z | 0) == (ya | 0)) {
                  h[q] = ya << 1;
                  var Ha = Wk(ya << 3);
                  h[r] = Ha;
                  var ab = Y;
                  Xp(Ha, ab, h[p] << 2);
                  (Y | 0) != (B | 0) && yp(ab);
                }
                h[((h[p] << 2) + h[r] | 0) >> 2] = h[aa >> 2];
                var bb = h[p] + 1 | 0;
                h[p] = bb;
                var ob = X + W * 36 + 28 | 0, gb = h[q];
                if ((bb | 0) == (gb | 0)) {
                  var yb = h[r];
                  h[q] = gb << 1;
                  var db = Wk(gb << 3);
                  h[r] = db;
                  var eb = yb;
                  Xp(db, eb, h[p] << 2);
                  (yb | 0) != (B | 0) && yp(eb);
                }
                h[((h[p] << 2) + h[r] | 0) >> 2] = h[ob >> 2];
                var pa = h[p] + 1 | 0, wa = h[p] = pa;
              }
            }
          }
          var $ = h[r];
          if ((wa | 0) <= 0) {
            break;
          }
          Da = wa;
          Y = $;
        }
        ($ | 0) != (B | 0) && (yp($), h[r] = 0);
        M = h[u];
      }
      var Oa = D + 1 | 0;
      if ((Oa | 0) >= (M | 0)) {
        break;
      }
      D = Oa;
      Q = M;
    }
    var ea = h[z], ha = O;
  } else {
    ea = 0, ha = c + 44 | 0;
  }
  m = ha >> 2;
  h[u] = 0;
  var ja = h[m], ka = ja + ea * 12 | 0;
  h[I >> 2] = 2;
  Ys(ja, ka, I);
  var za = (h[z] | 0) > 0;
  a : do {
    if (za) {
      var qa = c + 12 | 0, Aa = c + 4 | 0, fb = d + 68 | 0, na = d + 76 | 0;
      j = (d + 60 | 0) >> 2;
      var Pa = d + 64 | 0, mb = h[m], lb = 0, pb = mb, Cb = h[mb >> 2];
      b : for (;;) {
        var hb = pb + lb * 12 | 0;
        A = (Cb | 0) > -1 ? (h[qa >> 2] | 0) > (Cb | 0) ? 33 : 32 : 32;
        A == 32 && G(y.z | 0, 153, y.na | 0, y.s | 0);
        var Qa = h[Aa >> 2], ba = h[(Qa + 16 >> 2) + (Cb * 9 | 0)], ra = pb + lb * 12 + 4 | 0, Ma = h[ra >> 2];
        if ((Ma | 0) > -1) {
          if ((h[qa >> 2] | 0) > (Ma | 0)) {
            var Wa = Qa;
            A = 36;
          } else {
            A = 35;
          }
        } else {
          A = 35;
        }
        A == 35 && (G(y.z | 0, 153, y.na | 0, y.s | 0), Wa = h[Aa >> 2]);
        var Ca = h[(Wa + 16 >> 2) + (Ma * 9 | 0)], Ba = h[ba + 16 >> 2], Xa = h[Ca + 16 >> 2], fa = k[ba + 20 >> 2], Ra = k[Ca + 20 >> 2], Za = h[Ba + 8 >> 2], nb = h[Xa + 8 >> 2], Fb = (Za | 0) == (nb | 0);
        c : do {
          if (!Fb) {
            for (var qb = nb + 112 | 0; ; ) {
              var Ia = h[qb >> 2];
              if ((Ia | 0) == 0) {
                break;
              }
              if ((h[Ia >> 2] | 0) == (Za | 0)) {
                i = h[Ia + 4 >> 2] >> 2;
                var rb = h[i + 12], Ya = h[i + 13], oa = h[i + 14], Fa = h[i + 15];
                if ((rb | 0) == (Ba | 0) & (Ya | 0) == (Xa | 0) & (oa | 0) == (fa | 0) & (Fa | 0) == (Ra | 0)) {
                  break c;
                }
                if ((rb | 0) == (Xa | 0) & (Ya | 0) == (Ba | 0) & (oa | 0) == (Ra | 0) & (Fa | 0) == (fa | 0)) {
                  break c;
                }
              }
              qb = Ia + 12 | 0;
            }
            var $a = Za;
            if (!((h[nb >> 2] | 0) != 2 && (h[Za >> 2] | 0) != 2)) {
              for (var Ea = nb + 108 | 0; ; ) {
                var Ga = h[Ea >> 2];
                if ((Ga | 0) == 0) {
                  break;
                }
                if ((h[Ga >> 2] | 0) == ($a | 0) && (a[h[Ga + 4 >> 2] + 61 | 0] & 1) << 24 >> 24 == 0) {
                  break c;
                }
                Ea = Ga + 12 | 0;
              }
              var Ja = h[fb >> 2];
              if ((Ja | 0) == 0 || Wl[h[h[Ja >> 2] + 8 >> 2]](Ja, Ba, Xa)) {
                var Sa = Ba, vb = Xa, Gb = h[na >> 2];
                Dh[Vs] || (h[Ws >> 2] = 4, h[Ws + 4 >> 2] = 6, a[Ws + 8 | 0] = 1, h[Ws + 96 >> 2] = 8, h[Ws + 100 >> 2] = 10, a[Ws + 104 | 0] = 1, h[Ws + 24 >> 2] = 8, h[Ws + 28 >> 2] = 10, a[Ws + 32 | 0] = 0, h[Ws + 120 >> 2] = 12, h[Ws + 124 >> 2] = 14, a[Ws + 128 | 0] = 1, h[Ws + 48 >> 2] = 16, h[Ws + 52 >> 2] = 18, a[Ws + 56 | 0] = 1, h[Ws + 12 >> 2] = 16, h[Ws + 16 >> 2] = 18, a[Ws + 20 | 0] = 0, h[Ws + 72 >> 2] = 20, h[Ws + 76 >> 2] = 22, a[Ws + 80 | 0] = 1, h[Ws + 108 >> 2] = 20, h[Ws + 112 >> 2] = 22, a[Ws + 116 | 0] = 0, h[Ws + 144 >> 2] = 24, h[Ws + 148 >> 2] = 26, a[Ws + 152 | 0] = 1, h[Ws + 36 >> 2] = 24, h[Ws + 40 >> 2] = 26, a[Ws + 44 | 0] = 0, h[Ws + 168 >> 2] = 28, h[Ws + 172 >> 2] = 30, a[Ws + 176 | 0] = 1, h[Ws + 132 >> 2] = 28, h[Ws + 136 >> 2] = 30, a[Ws + 140 | 0] = 0, a[Vs] = 1);
                var zb = k[h[Ba + 12 >> 2] + 4 >> 2], Nb = k[h[Xa + 12 >> 2] + 4 >> 2];
                zb >>> 0 < 4 || G(y.A | 0, 80, y.ma | 0, y.Kb | 0);
                Nb >>> 0 < 4 || G(y.A | 0, 81, y.ma | 0, y.Yb | 0);
                var Ob = k[(Ws >> 2) + (zb * 12 | 0) + (Nb * 3 | 0)];
                if ((Ob | 0) != 0) {
                  var Db = (a[Ws + zb * 48 + Nb * 12 + 8 | 0] & 1) << 24 >> 24 == 0 ? Wl[Ob](vb, Ra, Sa, fa, Gb) : Wl[Ob](Sa, fa, vb, Ra, Gb);
                  g = Db >> 2;
                  var Pb = Db;
                  if ((Db | 0) != 0) {
                    var Ab = k[h[g + 12] + 8 >> 2], Eb = k[h[g + 13] + 8 >> 2];
                    h[g + 2] = 0;
                    h[g + 3] = h[j];
                    var sb = h[j];
                    (sb | 0) != 0 && (h[(sb + 8 | 0) >> 2] = Pb);
                    h[j] = Pb;
                    var cb = Db + 16 | 0;
                    h[g + 5] = Db;
                    h[cb >> 2] = Eb;
                    h[g + 6] = 0;
                    f = (Ab + 112 | 0) >> 2;
                    h[g + 7] = h[f];
                    var Mb = h[f];
                    (Mb | 0) != 0 && (h[(Mb + 8 | 0) >> 2] = cb);
                    h[f] = cb;
                    var wb = Db + 32 | 0;
                    h[g + 9] = Db;
                    h[wb >> 2] = Ab;
                    h[g + 10] = 0;
                    e = (Eb + 112 | 0) >> 2;
                    h[g + 11] = h[e];
                    var tb = h[e];
                    (tb | 0) != 0 && (h[(tb + 8 | 0) >> 2] = wb);
                    h[e] = wb;
                    var V = Ab + 4 | 0, ia = b[V >> 1];
                    (ia & 2) << 16 >> 16 == 0 && (b[V >> 1] = ia | 2, l[Ab + 144 >> 2] = 0);
                    var Hb = Eb + 4 | 0, Qb = b[Hb >> 1];
                    (Qb & 2) << 16 >> 16 == 0 && (b[Hb >> 1] = Qb | 2, l[Eb + 144 >> 2] = 0);
                    h[Pa >> 2] = h[Pa >> 2] + 1 | 0;
                  }
                }
              }
            }
          }
        } while (0);
        for (var Bb = h[z], Ib = lb; ; ) {
          var Xb = Ib + 1 | 0;
          if ((Xb | 0) >= (Bb | 0)) {
            break a;
          }
          var ec = k[m], Ka = k[(ec >> 2) + (Xb * 3 | 0)];
          if ((Ka | 0) != (h[hb >> 2] | 0)) {
            lb = Xb;
            pb = ec;
            Cb = Ka;
            continue b;
          }
          if ((h[(ec + 4 >> 2) + (Xb * 3 | 0)] | 0) != (h[ra >> 2] | 0)) {
            lb = Xb;
            pb = ec;
            Cb = Ka;
            continue b;
          }
          Ib = Xb;
        }
      }
    }
  } while (0);
  qg = E;
}

function Ys(c, d, e) {
  var f, g, i, j, m, n, o, q, p, r, s, u, z, E, A, I, C, K, J, N, B = e >> 2, F = qg;
  qg += 12;
  var H, O = d, D = c;
  a : for (;;) {
    var Q = D, P = D + 12 | 0, M = D | 0, Na = D + 4 | 0, U = D + 8 | 0;
    N = D >> 2;
    var L = O;
    b : for (;;) {
      var R = L, la = R - Q | 0, Da = la / 12 | 0;
      if (Da == 0 || Da == 1) {
        H = 52;
        break a;
      } else {
        if (Da == 2) {
          var Y = L - 12 | 0;
          if (!Wl[h[B]](Y, D)) {
            H = 52;
            break a;
          }
          var Z = h[M >> 2], W = h[Na >> 2], wa = h[U >> 2];
          J = Y >> 2;
          h[N] = h[J];
          h[N + 1] = h[J + 1];
          h[N + 2] = h[J + 2];
          h[Y >> 2] = Z;
          h[L - 12 + 4 >> 2] = W;
          h[L - 12 + 8 >> 2] = wa;
          H = 52;
          break a;
        } else {
          if (Da == 3) {
            Zs(D, P, L - 12 | 0, e);
            H = 52;
            break a;
          } else {
            if (Da == 4) {
              $s(D, P, D + 24 | 0, L - 12 | 0, e);
              H = 52;
              break a;
            } else {
              if (Da == 5) {
                at(D, P, D + 24 | 0, D + 36 | 0, L - 12 | 0, e);
                H = 52;
                break a;
              } else {
                if ((la | 0) < 372) {
                  H = 9;
                  break a;
                }
                var X = L - 12 | 0, aa = la / 24 | 0, ga = D + aa * 12 | 0;
                if ((la | 0) > 11988) {
                  var ca = la / 48 | 0, La = at(D, D + ca * 12 | 0, ga, D + (ca + aa) * 12 | 0, X, e);
                } else {
                  La = Zs(D, ga, X, e);
                }
                if (Wl[h[B]](D, ga)) {
                  var Ua = X, Va = La;
                } else {
                  for (var ma = X; ; ) {
                    var xa = ma - 12 | 0, ua = k[B];
                    if ((D | 0) == (xa | 0)) {
                      break b;
                    }
                    if (Wl[ua](xa, ga)) {
                      break;
                    }
                    ma = xa;
                  }
                  var da = h[M >> 2], ya = h[Na >> 2], Ha = h[U >> 2];
                  K = xa >> 2;
                  h[N] = h[K];
                  h[N + 1] = h[K + 1];
                  h[N + 2] = h[K + 2];
                  h[xa >> 2] = da;
                  h[ma - 12 + 4 >> 2] = ya;
                  h[ma - 12 + 8 >> 2] = Ha;
                  Ua = xa;
                  Va = La + 1 | 0;
                }
                var ab = P >>> 0 < Ua >>> 0;
                c : do {
                  if (ab) {
                    for (var bb = Ua, ob = P, gb = Va, yb = ga; ; ) {
                      var db = Wl[h[B]](ob, yb);
                      d : do {
                        if (db) {
                          for (var eb = ob; ; ) {
                            var pa = eb + 12 | 0;
                            if (!Wl[h[B]](pa, yb)) {
                              var $ = pa;
                              C = $ >> 2;
                              break d;
                            }
                            eb = pa;
                          }
                        } else {
                          $ = ob, C = $ >> 2;
                        }
                      } while (0);
                      for (var Oa = bb; ; ) {
                        var ea = Oa - 12 | 0;
                        if (Wl[h[B]](ea, yb)) {
                          break;
                        }
                        Oa = ea;
                      }
                      if ($ >>> 0 > ea >>> 0) {
                        var ha = $;
                        I = ha >> 2;
                        var ja = gb, ka = yb;
                        A = ka >> 2;
                        break c;
                      }
                      var za = h[C], qa = h[C + 1], Aa = h[C + 2];
                      E = $ >> 2;
                      z = ea >> 2;
                      h[E] = h[z];
                      h[E + 1] = h[z + 1];
                      h[E + 2] = h[z + 2];
                      h[ea >> 2] = za;
                      h[Oa - 12 + 4 >> 2] = qa;
                      h[Oa - 12 + 8 >> 2] = Aa;
                      var fb = (yb | 0) == ($ | 0) ? ea : yb, bb = ea, ob = $ + 12 | 0, gb = gb + 1 | 0, yb = fb;
                    }
                  } else {
                    ha = P, I = ha >> 2, ja = Va, ka = ga, A = ka >> 2;
                  }
                } while (0);
                if ((ha | 0) == (ka | 0)) {
                  var na = ja;
                } else {
                  if (Wl[h[B]](ka, ha)) {
                    var Pa = h[I], mb = h[I + 1], lb = h[I + 2];
                    u = ha >> 2;
                    s = ka >> 2;
                    h[u] = h[s];
                    h[u + 1] = h[s + 1];
                    h[u + 2] = h[s + 2];
                    h[A] = Pa;
                    h[A + 1] = mb;
                    h[A + 2] = lb;
                    na = ja + 1 | 0;
                  } else {
                    na = ja;
                  }
                }
                if ((na | 0) == 0) {
                  var pb = bt(D, ha, e), Cb = ha + 12 | 0;
                  if (bt(Cb, L, e)) {
                    if (pb) {
                      H = 52;
                      break a;
                    }
                    L = ha;
                    continue;
                  } else {
                    if (pb) {
                      O = L;
                      D = Cb;
                      continue a;
                    }
                  }
                }
                var hb = ha;
                if ((hb - Q | 0) < (R - hb | 0)) {
                  Ys(D, ha, e);
                  O = L;
                  D = ha + 12 | 0;
                  continue a;
                }
                Ys(ha + 12 | 0, L, e);
                L = ha;
              }
            }
          }
        }
      }
    }
    if (Wl[ua](D, X)) {
      var Qa = P;
    } else {
      var ba = P;
      for (r = ba >> 2; ; ) {
        if ((ba | 0) == (X | 0)) {
          H = 52;
          break a;
        }
        if (Wl[h[B]](D, ba)) {
          break;
        }
        ba = ba + 12 | 0;
        r = ba >> 2;
      }
      var ra = h[r], Ma = h[r + 1], Wa = h[r + 2];
      p = ba >> 2;
      q = X >> 2;
      h[p] = h[q];
      h[p + 1] = h[q + 1];
      h[p + 2] = h[q + 2];
      h[X >> 2] = ra;
      h[L - 12 + 4 >> 2] = Ma;
      h[L - 12 + 8 >> 2] = Wa;
      Qa = ba + 12 | 0;
    }
    if ((Qa | 0) == (X | 0)) {
      H = 52;
      break;
    }
    for (var Ca = X, Ba = Qa; ; ) {
      var Xa = Wl[h[B]](D, Ba);
      b : do {
        if (Xa) {
          var fa = Ba;
          o = fa >> 2;
        } else {
          for (var Ra = Ba; ; ) {
            var Za = Ra + 12 | 0;
            if (Wl[h[B]](D, Za)) {
              fa = Za;
              o = fa >> 2;
              break b;
            }
            Ra = Za;
          }
        }
      } while (0);
      for (var nb = Ca; ; ) {
        var Fb = nb - 12 | 0;
        if (!Wl[h[B]](D, Fb)) {
          break;
        }
        nb = Fb;
      }
      if (fa >>> 0 >= Fb >>> 0) {
        O = L;
        D = fa;
        continue a;
      }
      var qb = h[o], Ia = h[o + 1], rb = h[o + 2];
      n = fa >> 2;
      m = Fb >> 2;
      h[n] = h[m];
      h[n + 1] = h[m + 1];
      h[n + 2] = h[m + 2];
      h[Fb >> 2] = qb;
      h[nb - 12 + 4 >> 2] = Ia;
      h[nb - 12 + 8 >> 2] = rb;
      Ca = Fb;
      Ba = fa + 12 | 0;
    }
  }
  a : do {
    if (H == 9) {
      j = F >> 2;
      var Ya = D + 24 | 0;
      Zs(D, P, Ya, e);
      var oa = D + 36 | 0;
      if ((oa | 0) != (L | 0)) {
        for (var Fa = Ya, $a = oa; ; ) {
          if (Wl[h[B]]($a, Fa)) {
            i = $a >> 2;
            h[j] = h[i];
            h[j + 1] = h[i + 1];
            h[j + 2] = h[i + 2];
            for (var Ea = Fa, Ga = $a; ; ) {
              g = Ga >> 2;
              f = Ea >> 2;
              h[g] = h[f];
              h[g + 1] = h[f + 1];
              h[g + 2] = h[f + 2];
              if ((Ea | 0) == (D | 0)) {
                break;
              }
              var Ja = Ea - 12 | 0;
              if (!Wl[h[B]](F, Ja)) {
                break;
              }
              Ga = Ea;
              Ea = Ja;
            }
            h[f] = h[j];
            h[f + 1] = h[j + 1];
            h[f + 2] = h[j + 2];
          }
          var Sa = $a + 12 | 0;
          if ((Sa | 0) == (L | 0)) {
            break a;
          }
          Fa = $a;
          $a = Sa;
        }
      }
    }
  } while (0);
  qg = F;
}

function Zs(c, d, e, f) {
  var g, i, j = e >> 2, m = c >> 2;
  g = Wl[h[f >> 2]](d, c);
  var n = Wl[h[f >> 2]](e, d);
  if (g) {
    var o = h[m];
    g = h[m + 1];
    m = h[m + 2];
    i = c >> 2;
    n ? (e >>= 2, h[i] = h[e], h[i + 1] = h[e + 1], h[i + 2] = h[e + 2], h[j] = o, h[j + 1] = g, h[j + 2] = m, j = 1) : (c = d >> 2, h[i] = h[c], h[i + 1] = h[c + 1], h[i + 2] = h[c + 2], n = d | 0, h[n >> 2] = o, o = d + 4 | 0, h[o >> 2] = g, g = d + 8 | 0, h[g >> 2] = m, Wl[h[f >> 2]](e, d) ? (d = h[n >> 2], f = h[o >> 2], m = h[g >> 2], e >>= 2, h[c] = h[e], h[c + 1] = h[e + 1], h[c + 2] = h[e + 2], h[j] = d, h[j + 1] = f, h[j + 2] = m, j = 2) : j = 1);
  } else {
    if (n) {
      var o = d | 0, q = h[o >> 2], n = d + 4 | 0, p = h[n >> 2];
      i = d + 8 | 0;
      var r = h[i >> 2];
      g = d >> 2;
      e >>= 2;
      h[g] = h[e];
      h[g + 1] = h[e + 1];
      h[g + 2] = h[e + 2];
      h[j] = q;
      h[j + 1] = p;
      h[j + 2] = r;
      Wl[h[f >> 2]](d, c) ? (j = h[m], e = h[m + 1], d = h[m + 2], f = c >> 2, h[f] = h[g], h[f + 1] = h[g + 1], h[f + 2] = h[g + 2], h[o >> 2] = j, h[n >> 2] = e, h[i >> 2] = d, j = 2) : j = 1;
    } else {
      j = 0;
    }
  }
  return j;
}

function $s(c, d, e, f, g) {
  var i, j, m = Zs(c, d, e, g);
  if (Wl[h[g >> 2]](f, e)) {
    var n = e | 0, o = h[n >> 2], q = e + 4 | 0, p = h[q >> 2], r = e + 8 | 0, s = h[r >> 2];
    j = e >> 2;
    i = f >> 2;
    h[j] = h[i];
    h[j + 1] = h[i + 1];
    h[j + 2] = h[i + 2];
    h[f >> 2] = o;
    h[f + 4 >> 2] = p;
    h[f + 8 >> 2] = s;
    f = m + 1 | 0;
    if (Wl[h[g >> 2]](e, d)) {
      f = d | 0;
      p = h[f >> 2];
      i = d + 4 | 0;
      var s = h[i >> 2], o = d + 8 | 0, u = h[o >> 2], e = d >> 2;
      h[e] = h[j];
      h[e + 1] = h[j + 1];
      h[e + 2] = h[j + 2];
      h[n >> 2] = p;
      h[q >> 2] = s;
      h[r >> 2] = u;
      j = m + 2 | 0;
      Wl[h[g >> 2]](d, c) ? (d = h[c >> 2], g = h[c + 4 >> 2], j = h[c + 8 >> 2], c >>= 2, h[c] = h[e], h[c + 1] = h[e + 1], h[c + 2] = h[e + 2], h[f >> 2] = d, h[i >> 2] = g, h[o >> 2] = j, m = m + 3 | 0) : m = j;
    } else {
      m = f;
    }
  }
  return m;
}

function at(c, d, e, f, g, i) {
  var j, m, n = $s(c, d, e, f, i);
  if (Wl[h[i >> 2]](g, f)) {
    var o = f | 0, q = h[o >> 2], p = f + 4 | 0, r = h[p >> 2], s = f + 8 | 0, u = h[s >> 2];
    m = f >> 2;
    j = g >> 2;
    h[m] = h[j];
    h[m + 1] = h[j + 1];
    h[m + 2] = h[j + 2];
    h[g >> 2] = q;
    h[g + 4 >> 2] = r;
    h[g + 8 >> 2] = u;
    g = n + 1 | 0;
    if (Wl[h[i >> 2]](f, e)) {
      g = e | 0;
      r = h[g >> 2];
      j = e + 4 | 0;
      var u = h[j >> 2], q = e + 8 | 0, z = h[q >> 2], f = e >> 2;
      h[f] = h[m];
      h[f + 1] = h[m + 1];
      h[f + 2] = h[m + 2];
      h[o >> 2] = r;
      h[p >> 2] = u;
      h[s >> 2] = z;
      m = n + 2 | 0;
      Wl[h[i >> 2]](e, d) ? (m = d | 0, s = h[m >> 2], o = d + 4 | 0, r = h[o >> 2], p = d + 8 | 0, u = h[p >> 2], e = d >> 2, h[e] = h[f], h[e + 1] = h[f + 1], h[e + 2] = h[f + 2], h[g >> 2] = s, h[j >> 2] = r, h[q >> 2] = u, f = n + 3 | 0, Wl[h[i >> 2]](d, c) ? (d = h[c >> 2], i = h[c + 4 >> 2], f = h[c + 8 >> 2], c >>= 2, h[c] = h[e], h[c + 1] = h[e + 1], h[c + 2] = h[e + 2], h[m >> 2] = d, h[o >> 2] = i, h[p >> 2] = f, n = n + 4 | 0) : n = f) : n = m;
    } else {
      n = g;
    }
  }
  return n;
}

function bt(c, d, e) {
  var f, g, i, j, m = qg;
  qg += 12;
  var n = (d - c) / 12 | 0;
  a : do {
    if (n == 0 || n == 1) {
      i = 1;
    } else {
      if (n == 2) {
        var o = d - 12 | 0;
        if (Wl[h[e >> 2]](o, c)) {
          var q = h[c >> 2];
          g = h[c + 4 >> 2];
          var p = h[c + 8 >> 2];
          j = c >> 2;
          i = o >> 2;
          h[j] = h[i];
          h[j + 1] = h[i + 1];
          h[j + 2] = h[i + 2];
          h[o >> 2] = q;
          h[d - 12 + 4 >> 2] = g;
          h[d - 12 + 8 >> 2] = p;
        }
        i = 1;
      } else {
        if (n == 3) {
          Zs(c, c + 12 | 0, d - 12 | 0, e), i = 1;
        } else {
          if (n == 4) {
            $s(c, c + 12 | 0, c + 24 | 0, d - 12 | 0, e), i = 1;
          } else {
            if (n == 5) {
              at(c, c + 12 | 0, c + 24 | 0, c + 36 | 0, d - 12 | 0, e), i = 1;
            } else {
              q = c + 24 | 0;
              Zs(c, c + 12 | 0, q, e);
              i = m >> 2;
              j = c + 36 | 0;
              for (o = 0; ; ) {
                if ((j | 0) == (d | 0)) {
                  i = 1;
                  break a;
                }
                if (Wl[h[e >> 2]](j, q)) {
                  g = j >> 2;
                  h[i] = h[g];
                  h[i + 1] = h[g + 1];
                  h[i + 2] = h[g + 2];
                  for (g = j; ; ) {
                    g >>= 2;
                    f = q >> 2;
                    h[g] = h[f];
                    h[g + 1] = h[f + 1];
                    h[g + 2] = h[f + 2];
                    if ((q | 0) == (c | 0)) {
                      break;
                    }
                    p = q - 12 | 0;
                    if (!Wl[h[e >> 2]](m, p)) {
                      break;
                    }
                    g = q;
                    q = p;
                  }
                  h[f] = h[i];
                  h[f + 1] = h[i + 1];
                  h[f + 2] = h[i + 2];
                  o = o + 1 | 0;
                  if ((o | 0) == 8) {
                    break;
                  }
                }
                q = j;
                j = j + 12 | 0;
              }
              i = (j + 12 | 0) == (d | 0);
            }
          }
        }
      }
    }
  } while (0);
  qg = m;
  return i;
}

function ct(c, d, e, f) {
  var g, i, j, m, n, o, q, p, r, s, u, z, E = qg;
  qg += 32;
  var A, I = E + 16, C = c + 28 | 0, K = (h[C >> 2] | 0) > 0;
  a : do {
    if (K) {
      var J = c + 24 | 0, N = c + 12 | 0, B = E | 0, F = I | 0, H = E + 4 | 0, O = I + 4 | 0, D = E + 8 | 0, Q = I + 8 | 0, P = E + 12 | 0, M = I + 12 | 0, Na = f | 0, U = e | 0, L = f + 4 | 0, R = e + 4 | 0, la = d;
      z = (d + 40 | 0) >> 2;
      var Da = d + 36 | 0;
      u = (d + 32 | 0) >> 2;
      s = (d + 12 | 0) >> 2;
      r = (d + 4 | 0) >> 2;
      p = (d | 0) >> 2;
      q = (d + 8 | 0) >> 2;
      o = (d + 16 | 0) >> 2;
      for (var Y = 0; ; ) {
        var Z = k[J >> 2];
        n = Z >> 2;
        var W = Z + Y * 28 | 0, wa = h[N >> 2], X = Z + Y * 28 + 20 | 0;
        Wl[h[h[wa >> 2] + 24 >> 2]](wa, E, e, h[X >> 2]);
        var aa = h[N >> 2];
        Wl[h[h[aa >> 2] + 24 >> 2]](aa, I, f, h[X >> 2]);
        var ga = l[B >> 2], ca = l[F >> 2], La = l[H >> 2], Ua = l[O >> 2], Va = La < Ua ? La : Ua, ma = W, xa = (x[0] = ga < ca ? ga : ca, t[0]), ua = (x[0] = Va, t[0]) | 0;
        h[ma >> 2] = 0 | xa;
        h[ma + 4 >> 2] = ua;
        var da = l[D >> 2], ya = l[Q >> 2], Ha = l[P >> 2], ab = l[M >> 2], bb = Ha > ab ? Ha : ab, ob = Z + Y * 28 + 8 | 0, gb = (x[0] = da > ya ? da : ya, t[0]), yb = (x[0] = bb, t[0]) | 0;
        h[ob >> 2] = 0 | gb;
        h[ob + 4 >> 2] = yb;
        var db = l[Na >> 2] - l[U >> 2], eb = l[L >> 2] - l[R >> 2], pa = k[n + (Y * 7 | 0) + 6];
        A = (pa | 0) > -1 ? (h[s] | 0) > (pa | 0) ? 5 : 4 : 4;
        A == 4 && G(y.d | 0, 135, y.Y | 0, y.s | 0);
        var $ = h[r], Oa = $;
        if ((h[(Oa + 24 >> 2) + (pa * 9 | 0)] | 0) == -1) {
          var ea = Oa;
          m = ea >> 2;
          var ha = $;
        } else {
          G(y.d | 0, 137, y.Y | 0, y.qc | 0);
          var ja = h[r], ea = ja;
          m = ea >> 2;
          ha = ja;
        }
        var ka = W | 0;
        if (l[m + (pa * 9 | 0)] > l[ka >> 2]) {
          var za = Z + Y * 28 + 4 | 0;
          A = 12;
        } else {
          var qa = Z + Y * 28 + 4 | 0;
          l[m + (pa * 9 | 0) + 1] > l[qa >> 2] ? (za = qa, A = 12) : l[n + (Y * 7 | 0) + 2] > l[m + (pa * 9 | 0) + 2] ? (za = qa, A = 12) : l[n + (Y * 7 | 0) + 3] > l[m + (pa * 9 | 0) + 3] ? (za = qa, A = 12) : A = 42;
        }
        if (A == 12) {
          var Aa = (h[p] | 0) == (pa | 0);
          b : do {
            if (Aa) {
              h[p] = -1;
            } else {
              var fb = ha;
              j = fb >> 2;
              var na = k[j + (pa * 9 | 0) + 5], Pa = k[j + (na * 9 | 0) + 5], mb = h[j + (na * 9 | 0) + 6], lb = (mb | 0) == (pa | 0) ? h[j + (na * 9 | 0) + 7] : mb;
              if ((Pa | 0) == -1) {
                h[p] = lb, h[j + (lb * 9 | 0) + 5] = -1, A = (na | 0) > -1 ? (h[s] | 0) > (na | 0) ? 30 : 29 : 29, A == 29 && G(y.d | 0, 97, y.D | 0, y.va | 0), (h[q] | 0) > 0 || G(y.d | 0, 98, y.D | 0, y.Ea | 0), h[(h[r] + na * 36 + 20 | 0) >> 2] = h[o], h[(h[r] + na * 36 + 32 | 0) >> 2] = -1, h[o] = na, h[q] = h[q] - 1 | 0;
              } else {
                var pb = fb + Pa * 36 + 24 | 0;
                (h[pb >> 2] | 0) == (na | 0) ? h[pb >> 2] = lb : h[j + (Pa * 9 | 0) + 7] = lb;
                h[(h[r] + lb * 36 + 20 | 0) >> 2] = Pa;
                A = (na | 0) > -1 ? (h[s] | 0) > (na | 0) ? 23 : 22 : 22;
                A == 22 && G(y.d | 0, 97, y.D | 0, y.va | 0);
                (h[q] | 0) > 0 || G(y.d | 0, 98, y.D | 0, y.Ea | 0);
                h[(h[r] + na * 36 + 20 | 0) >> 2] = h[o];
                h[(h[r] + na * 36 + 32 | 0) >> 2] = -1;
                h[o] = na;
                h[q] = h[q] - 1 | 0;
                for (var Cb = Pa; ; ) {
                  var hb = Pr(la, Cb), Qa = h[r];
                  i = Qa >> 2;
                  var ba = h[i + (hb * 9 | 0) + 6], ra = h[i + (hb * 9 | 0) + 7], Ma = l[i + (ba * 9 | 0)], Wa = l[i + (ra * 9 | 0)], Ca = l[i + (ba * 9 | 0) + 1], Ba = l[i + (ra * 9 | 0) + 1], Xa = Ca < Ba ? Ca : Ba, fa = Qa + hb * 36 | 0, Ra = (x[0] = Ma < Wa ? Ma : Wa, t[0]), Za = (x[0] = Xa, t[0]) | 0;
                  h[(fa | 0) >> 2] = 0 | Ra;
                  h[(fa + 4 | 0) >> 2] = Za;
                  var nb = l[i + (ba * 9 | 0) + 2], Fb = l[i + (ra * 9 | 0) + 2], qb = l[i + (ba * 9 | 0) + 3], Ia = l[i + (ra * 9 | 0) + 3], rb = qb > Ia ? qb : Ia, Ya = Qa + hb * 36 + 8 | 0, oa = (x[0] = nb > Fb ? nb : Fb, t[0]), Fa = (x[0] = rb, t[0]) | 0;
                  h[(Ya | 0) >> 2] = 0 | oa;
                  h[(Ya + 4 | 0) >> 2] = Fa;
                  var $a = h[r], Ea = h[($a + 32 >> 2) + (ba * 9 | 0)], Ga = h[($a + 32 >> 2) + (ra * 9 | 0)];
                  h[($a + hb * 36 + 32 | 0) >> 2] = ((Ea | 0) > (Ga | 0) ? Ea : Ga) + 1 | 0;
                  var Ja = h[(h[r] + 20 >> 2) + (hb * 9 | 0)];
                  if ((Ja | 0) == -1) {
                    break b;
                  }
                  Cb = Ja;
                }
              }
            }
          } while (0);
          var Sa = l[ka >> 2] - .10000000149011612, vb = l[za >> 2] - .10000000149011612, Gb = l[n + (Y * 7 | 0) + 2] + .10000000149011612, zb = l[n + (Y * 7 | 0) + 3] + .10000000149011612, Nb = db * 2, Ob = eb * 2;
          if (Nb < 0) {
            var Db = Sa + Nb, Pb = Gb;
          } else {
            Db = Sa, Pb = Gb + Nb;
          }
          if (Ob < 0) {
            var Ab = vb + Ob, Eb = zb;
          } else {
            Ab = vb, Eb = zb + Ob;
          }
          g = h[r] >> 2;
          l[g + (pa * 9 | 0)] = Db;
          l[g + (pa * 9 | 0) + 1] = Ab;
          l[g + (pa * 9 | 0) + 2] = Pb;
          l[g + (pa * 9 | 0) + 3] = Eb;
          Yp(la, pa);
          var sb = h[z], cb = h[Da >> 2];
          if ((sb | 0) == (cb | 0)) {
            var Mb = h[u];
            h[Da >> 2] = cb << 1;
            var wb = Wk(cb << 3);
            h[u] = wb;
            var tb = Mb;
            Xp(wb, tb, h[z] << 2);
            yp(tb);
            var V = h[z];
          } else {
            V = sb;
          }
          h[((V << 2) + h[u] | 0) >> 2] = pa;
          h[z] = h[z] + 1 | 0;
        }
        var ia = Y + 1 | 0;
        if ((ia | 0) >= (h[C >> 2] | 0)) {
          break a;
        }
        Y = ia;
      }
    }
  } while (0);
  qg = E;
}

function dt(c, d, e, f, g, i) {
  var j, m, n, o, q = c >> 2;
  j = (c + 40 | 0) >> 2;
  h[j] = d;
  h[q + 11] = e;
  h[q + 12] = f;
  h[q + 7] = 0;
  h[q + 9] = 0;
  h[q + 8] = 0;
  c = (c | 0) >> 2;
  h[c] = g;
  h[q + 1] = i;
  m = d << 2;
  d = (g + 102796 | 0) >> 2;
  i = h[d];
  (i | 0) < 32 ? n = i : (G(y.j | 0, 38, y.n | 0, y.p | 0), n = h[d]);
  i = (g + n * 12 + 102412 | 0) >> 2;
  h[(g + 102416 >> 2) + (n * 3 | 0)] = m;
  o = (g + 102400 | 0) >> 2;
  var p = h[o];
  (p + m | 0) > 102400 ? (o = Wk(m), h[i] = o, a[g + n * 12 + 102420 | 0] = 1) : (h[i] = g + p | 0, a[g + n * 12 + 102420 | 0] = 0, h[o] = h[o] + m | 0);
  n = g + 102404 | 0;
  m = h[n >> 2] + m | 0;
  h[n >> 2] = m;
  g = g + 102408 | 0;
  n = h[g >> 2];
  h[g >> 2] = (n | 0) > (m | 0) ? n : m;
  h[d] = h[d] + 1 | 0;
  h[q + 2] = h[i];
  g = h[c];
  i = e << 2;
  e = (g + 102796 | 0) >> 2;
  d = h[e];
  (d | 0) < 32 ? m = d : (G(y.j | 0, 38, y.n | 0, y.p | 0), m = h[e]);
  d = g + m * 12 + 102412 | 0;
  h[(g + m * 12 + 102416 | 0) >> 2] = i;
  n = (g + 102400 | 0) >> 2;
  o = h[n];
  (o + i | 0) > 102400 ? (n = Wk(i), h[(d | 0) >> 2] = n, a[g + m * 12 + 102420 | 0] = 1) : (h[(d | 0) >> 2] = g + o | 0, a[g + m * 12 + 102420 | 0] = 0, h[n] = h[n] + i | 0);
  m = g + 102404 | 0;
  i = h[m >> 2] + i | 0;
  h[m >> 2] = i;
  g = g + 102408 | 0;
  m = h[g >> 2];
  h[g >> 2] = (m | 0) > (i | 0) ? m : i;
  h[e] = h[e] + 1 | 0;
  h[q + 3] = h[d >> 2];
  e = h[c];
  d = f << 2;
  f = (e + 102796 | 0) >> 2;
  g = h[f];
  (g | 0) < 32 ? i = g : (G(y.j | 0, 38, y.n | 0, y.p | 0), i = h[f]);
  g = e + i * 12 + 102412 | 0;
  h[(e + i * 12 + 102416 | 0) >> 2] = d;
  m = (e + 102400 | 0) >> 2;
  n = h[m];
  (n + d | 0) > 102400 ? (m = Wk(d), h[(g | 0) >> 2] = m, a[e + i * 12 + 102420 | 0] = 1) : (h[(g | 0) >> 2] = e + n | 0, a[e + i * 12 + 102420 | 0] = 0, h[m] = h[m] + d | 0);
  i = e + 102404 | 0;
  d = h[i >> 2] + d | 0;
  h[i >> 2] = d;
  e = e + 102408 | 0;
  i = h[e >> 2];
  h[e >> 2] = (i | 0) > (d | 0) ? i : d;
  h[f] = h[f] + 1 | 0;
  h[q + 4] = h[g >> 2];
  g = h[c];
  d = h[j] * 12 | 0;
  f = (g + 102796 | 0) >> 2;
  e = h[f];
  (e | 0) < 32 ? i = e : (G(y.j | 0, 38, y.n | 0, y.p | 0), i = h[f]);
  e = g + i * 12 + 102412 | 0;
  h[(g + i * 12 + 102416 | 0) >> 2] = d;
  m = (g + 102400 | 0) >> 2;
  n = h[m];
  (n + d | 0) > 102400 ? (m = Wk(d), h[(e | 0) >> 2] = m, a[g + i * 12 + 102420 | 0] = 1) : (h[(e | 0) >> 2] = g + n | 0, a[g + i * 12 + 102420 | 0] = 0, h[m] = h[m] + d | 0);
  i = g + 102404 | 0;
  d = h[i >> 2] + d | 0;
  h[i >> 2] = d;
  g = g + 102408 | 0;
  i = h[g >> 2];
  h[g >> 2] = (i | 0) > (d | 0) ? i : d;
  h[f] = h[f] + 1 | 0;
  h[q + 6] = h[e >> 2];
  c = h[c];
  e = h[j] * 12 | 0;
  j = (c + 102796 | 0) >> 2;
  f = h[j];
  (f | 0) < 32 ? g = f : (G(y.j | 0, 38, y.n | 0, y.p | 0), g = h[j]);
  f = c + g * 12 + 102412 | 0;
  h[(c + g * 12 + 102416 | 0) >> 2] = e;
  d = (c + 102400 | 0) >> 2;
  i = h[d];
  (i + e | 0) > 102400 ? (d = Wk(e), h[(f | 0) >> 2] = d, a[c + g * 12 + 102420 | 0] = 1) : (h[(f | 0) >> 2] = c + i | 0, a[c + g * 12 + 102420 | 0] = 0, h[d] = h[d] + e | 0);
  g = c + 102404 | 0;
  e = h[g >> 2] + e | 0;
  h[g >> 2] = e;
  c = c + 102408 | 0;
  g = h[c >> 2];
  h[c >> 2] = (g | 0) > (e | 0) ? g : e;
  h[j] = h[j] + 1 | 0;
  h[q + 5] = h[f >> 2];
}

function rp(c) {
  var d, e, f, g, i, j, m, n, o, q, p, r, s, u, z, E, A, I, C, K, J, N, B, F, H, O, D, Q, P, M, Na, U, L, R, la, Da, Y, Z, W, wa, X, aa, ga, ca, La, Ua, Va, ma, xa, ua, da, ya, Ha, ab, bb, ob, gb, yb, db, eb, pa, $, Oa, ea, ha, ja, ka, za, qa, Aa, fb, na, Pa, mb, lb, pb, Cb, hb, Qa, ba, ra, Ma, Wa, Ca, Ba, Xa, fa, Ra, Za, nb, Fb, qb, Ia, rb, Ya, oa, Fa, $a, Ea, Ga, Ja, Sa, vb, Gb, zb, Nb, Ob, Db, Pb, Ab, Eb, sb, cb, Mb, wb, tb = c >> 2, V = qg;
  qg += 1012;
  var ia, Hb = V + 16, Qb = V + 32, Bb = V + 52, Ib = V + 72, Xb = V + 116, ec = V + 168, Ka = V + 180, Jb = V + 272, S = V + 296, ub = V + 396, Kb = V + 412, sa = V + 464, Rb = V + 596, ic = V + 604, $b = V + 608, ac = V + 624, lc = V + 640, yc = V + 660, Gc = V + 668, zc = V + 676, mc = V + 684, bc = V + 692, cc = V + 700, Sb = V + 708, Lb = V + 728, ib = V + 736, Tb = V + 768, dc = V + 812, Ac = V + 864, Hc = V + 880, Ic = V + 888, fc = V + 896, od = V + 948, Wc = V + 956, Qc = V + 964, xb = V + 972, Wb = V + 980, oc = V + 988, Tc = V + 996, Jc = V + 1004;
  et(Jc);
  var Kc = h[Jc >> 2], gc = (h[Jc + 4 >> 2] | 0) * .0010000000474974513, Bc = gc >= 0 ? Math.floor(gc) : Math.ceil(gc);
  wb = (c + 102868 | 0) >> 2;
  var Rc = h[wb], jc = c + 102872 | 0;
  if ((Rc & 1 | 0) == 0) {
    var Lc = Rc;
  } else {
    Xs(jc, jc);
    var vd = h[wb] & -2, Lc = h[wb] = vd;
  }
  h[wb] = Lc | 2;
  var tc = c + 102988 | 0, uc = l[tc >> 2] * .01666666753590107, Xc = a[c + 102992 | 0] & 1;
  et(Tc);
  var wd = h[Tc >> 2], jb = (h[Tc + 4 >> 2] | 0) * .0010000000474974513, rc = jb >= 0 ? Math.floor(jb) : Math.ceil(jb), Ub = c + 102932 | 0;
  Mb = Ub >> 2;
  var xd = h[Mb], nc = (xd | 0) == 0;
  a : do {
    if (!nc) {
      var Yb = c + 102884 | 0, yd = c + 102876 | 0, Od = c + 102944 | 0, cd = c + 102940 | 0, dd = xd;
      for (cb = dd >> 2; ; ) {
        var Yc = h[cb + 12], ed = h[cb + 13], pc = h[cb + 14], Mc = h[cb + 15], Uc = h[Yc + 8 >> 2], fd = h[ed + 8 >> 2];
        sb = (dd + 4 | 0) >> 2;
        var Cc = h[sb], pd = (Cc & 8 | 0) == 0;
        b : do {
          if (pd) {
            ia = 19;
          } else {
            var zd = Uc;
            ia = (h[fd >> 2] | 0) == 2 ? 7 : (h[Uc >> 2] | 0) == 2 ? 7 : 12;
            c : do {
              if (ia == 7) {
                for (var be = fd + 108 | 0; ; ) {
                  var Jd = h[be >> 2];
                  if ((Jd | 0) == 0) {
                    break;
                  }
                  if ((h[Jd >> 2] | 0) == (zd | 0) && (a[h[Jd + 4 >> 2] + 61 | 0] & 1) << 24 >> 24 == 0) {
                    break c;
                  }
                  be = Jd + 12 | 0;
                }
                var Pd = h[cd >> 2];
                if ((Pd | 0) == 0) {
                  var qd = Cc;
                } else {
                  if (!Wl[h[h[Pd >> 2] + 8 >> 2]](Pd, Yc, ed)) {
                    var kc = h[cb + 3];
                    Us(jc, dd);
                    var hc = kc;
                    ia = 13;
                    break b;
                  }
                  qd = h[sb];
                }
                h[sb] = qd & -9;
                ia = 19;
                break b;
              }
            } while (0);
            var vc = h[cb + 3];
            Us(jc, dd);
            hc = vc;
            ia = 13;
          }
        } while (0);
        if (ia == 19) {
          if (((b[Uc + 4 >> 1] & 2) << 16 >> 16 == 0 ? 0 : (h[Uc >> 2] | 0) != 0) | ((b[fd + 4 >> 1] & 2) << 16 >> 16 == 0 ? 0 : (h[fd >> 2] | 0) != 0)) {
            var gd = h[(h[Yc + 24 >> 2] + 24 >> 2) + (pc * 7 | 0)], hd = h[(h[ed + 24 >> 2] + 24 >> 2) + (Mc * 7 | 0)];
            ia = (gd | 0) > -1 ? (h[Yb >> 2] | 0) > (gd | 0) ? 28 : 27 : 27;
            ia == 27 && G(y.z | 0, 159, y.R | 0, y.s | 0);
            var qc = h[yd >> 2];
            Eb = qc >> 2;
            if ((hd | 0) > -1) {
              if ((h[Yb >> 2] | 0) > (hd | 0)) {
                var Zb = qc;
                Ab = Zb >> 2;
                ia = 31;
              } else {
                ia = 30;
              }
            } else {
              ia = 30;
            }
            ia == 30 && (G(y.z | 0, 159, y.R | 0, y.s | 0), Zb = h[yd >> 2], Ab = Zb >> 2);
            if (l[Ab + (hd * 9 | 0)] - l[Eb + (gd * 9 | 0) + 2] > 0 | l[Ab + (hd * 9 | 0) + 1] - l[Eb + (gd * 9 | 0) + 3] > 0 | l[Eb + (gd * 9 | 0)] - l[Ab + (hd * 9 | 0) + 2] > 0 | l[Eb + (gd * 9 | 0) + 1] - l[Ab + (hd * 9 | 0) + 3] > 0) {
              var Ad = h[cb + 3];
              Us(jc, dd);
              hc = Ad;
            } else {
              ft(dd, h[Od >> 2]), hc = h[cb + 3];
            }
          } else {
            hc = h[cb + 3];
          }
        }
        if ((hc | 0) == 0) {
          break a;
        }
        dd = hc;
        cb = dd >> 2;
      }
    }
  } while (0);
  et(oc);
  l[tb + 25750] = (((h[oc >> 2] - wd) * 1e3 | 0) >>> 0) + (h[oc + 4 >> 2] | 0) * .0010000000474974513 - (rc >>> 0);
  var id = c + 102995 | 0;
  if ((a[id] & 1) << 24 >> 24 != 0) {
    et(Wb);
    var ce = h[Wb >> 2], Qd = (h[Wb + 4 >> 2] | 0) * .0010000000474974513, Rd = Qd >= 0 ? Math.floor(Qd) : Math.ceil(Qd);
    Pb = (c + 103008 | 0) >> 2;
    l[Pb] = 0;
    Db = (c + 103012 | 0) >> 2;
    l[Db] = 0;
    Ob = (c + 103016 | 0) >> 2;
    l[Ob] = 0;
    var Zc = c + 102960 | 0, Bd = c + 68 | 0;
    dt(fc, h[Zc >> 2], h[tb + 25734], h[tb + 25741], Bd, h[tb + 25736]);
    var jd = c + 102952 | 0, Cd = h[jd >> 2], kd = (Cd | 0) == 0;
    a : do {
      if (!kd) {
        for (var Vc = Cd; ; ) {
          b[(Vc + 4 | 0) >> 1] &= -2;
          var Sd = h[Vc + 96 >> 2];
          if ((Sd | 0) == 0) {
            break a;
          }
          Vc = Sd;
        }
      }
    } while (0);
    var Dd = h[Mb], ye = (Dd | 0) == 0;
    a : do {
      if (!ye) {
        for (var Xd = Dd; ; ) {
          h[(Xd + 4 | 0) >> 2] &= -2;
          var pe = h[Xd + 12 >> 2];
          if ((pe | 0) == 0) {
            break a;
          }
          Xd = pe;
        }
      }
    } while (0);
    var Le = h[tb + 25739], qe = (Le | 0) == 0;
    a : do {
      if (!qe) {
        for (var Nc = Le; ; ) {
          a[Nc + 60 | 0] = 0;
          var Kd = h[Nc + 12 >> 2];
          if ((Kd | 0) == 0) {
            break a;
          }
          Nc = Kd;
        }
      }
    } while (0);
    var Ld = k[Zc >> 2], ld = Ld << 2;
    Nb = (c + 102864 | 0) >> 2;
    var de = h[Nb];
    if ((de | 0) < 32) {
      var Sc = de;
    } else {
      G(y.j | 0, 38, y.n | 0, y.p | 0), Sc = h[Nb];
    }
    zb = (c + Sc * 12 + 102480 | 0) >> 2;
    h[tb + (Sc * 3 | 0) + 25621] = ld;
    Gb = (c + 102468 | 0) >> 2;
    var md = h[Gb];
    if ((md + ld | 0) > 102400) {
      var Me = Wk(ld);
      h[zb] = Me;
      a[c + Sc * 12 + 102488 | 0] = 1;
    } else {
      h[zb] = c + (md + 68) | 0, a[c + Sc * 12 + 102488 | 0] = 0, h[Gb] = h[Gb] + ld | 0;
    }
    var ze = c + 102472 | 0, ee = h[ze >> 2] + ld | 0;
    h[ze >> 2] = ee;
    var cf = c + 102476 | 0, df = h[cf >> 2];
    h[cf >> 2] = (df | 0) > (ee | 0) ? df : ee;
    h[Nb] = h[Nb] + 1 | 0;
    var ef = k[zb];
    vb = ef >> 2;
    Sa = (fc + 28 | 0) >> 2;
    Ja = (fc + 36 | 0) >> 2;
    Ga = (fc + 32 | 0) >> 2;
    var Qf = fc + 40 | 0;
    Ea = (fc + 8 | 0) >> 2;
    var Ae = fc + 44 | 0;
    $a = (fc + 12 | 0) >> 2;
    var rg = fc + 48 | 0;
    Fa = (fc + 16 | 0) >> 2;
    var re = c + 102976 | 0, Be = c + 102968 | 0, Rf = c + 102972 | 0;
    oa = (fc + 20 | 0) >> 2;
    Ya = (fc + 24 | 0) >> 2;
    var Ne = bc | 0, ff = bc + 4 | 0, sg = ib | 0, Sf = ib + 4 | 0, Tf = ib + 8 | 0, uf = ib + 12 | 0, se = ib + 16 | 0, tg = ib + 20 | 0, Uf = ib + 24 | 0, Vf = ib + 28 | 0, Yg = Tb | 0, Fh = Tb + 4 | 0, ug = Tb + 8 | 0, gf = Tb + 12 | 0, vg = Tb + 16 | 0, Zg = Tb + 20 | 0, $g = Tb + 24 | 0, ah = Tb + 28 | 0, vf = Tb + 32 | 0, hf = Tb + 36 | 0;
    rb = (fc | 0) >> 2;
    var jf = Tb + 40 | 0, wf = Xc << 24 >> 24 == 0, Wf = mc | 0, Ed = mc + 4 | 0, Ce = zc | 0, wc = zc + 4 | 0, Oe = dc + 48 | 0;
    Ia = (dc + 40 | 0) >> 2;
    for (var Fd = dc + 44 | 0, Gd = Gc | 0, Xf = Gc + 4 | 0, bh = yc | 0, ch = yc + 4 | 0, wg = dc + 36 | 0, xg = dc + 24 | 0, Td = $b + 8 | 0, sc = $b + 12 | 0, Gh = ac + 8 | 0, xf = ac + 12 | 0, Yf = lc + 8 | 0, Ud = lc + 16 | 0, Zf = cc | 0, Hh = cc + 4 | 0, Pe = fc + 4 | 0, yg = dc + 32 | 0, yf = Sb + 16 | 0, kf = dc + 28 | 0, Hd = jd; ; ) {
      var $f = k[Hd >> 2];
      if (($f | 0) == 0) {
        break;
      }
      qb = ($f + 4 | 0) >> 1;
      var dh = (b[qb] & 35) << 16 >> 16 == 34;
      a : do {
        if (dh && (h[$f >> 2] | 0) != 0) {
          h[Sa] = 0;
          h[Ja] = 0;
          h[Ga] = 0;
          h[vb] = $f;
          b[qb] |= 1;
          var zg = 1, ag = 0, Ag = 0, bg = 0;
          b : for (;;) {
            for (var cg = zg, Md = ag; ; ) {
              if ((cg | 0) <= 0) {
                break b;
              }
              var te = cg - 1 | 0, fe = h[(te << 2 >> 2) + vb];
              Fb = (fe + 4 | 0) >> 1;
              (b[Fb] & 32) << 16 >> 16 == 0 && G(y.r | 0, 445, y.O | 0, y.hc | 0);
              (Md | 0) < (h[Qf >> 2] | 0) || G(y.o | 0, 54, y.F | 0, y.J | 0);
              h[(fe + 8 | 0) >> 2] = Md;
              h[((Md << 2) + h[Ea] | 0) >> 2] = fe;
              var Bg = Md + 1 | 0;
              h[Sa] = Bg;
              var dg = b[Fb];
              (dg & 2) << 16 >> 16 == 0 && (b[Fb] = dg | 2, l[fe + 144 >> 2] = 0);
              if ((h[fe >> 2] | 0) != 0) {
                break;
              }
              cg = te;
              Md = Bg;
            }
            for (var Cg = fe + 112 | 0, ge = te, he = bg; ; ) {
              var zf = h[Cg >> 2];
              if ((zf | 0) == 0) {
                break;
              }
              var Qe = h[zf + 4 >> 2];
              nb = (Qe + 4 | 0) >> 2;
              if ((h[nb] & 7 | 0) == 6) {
                if ((a[h[Qe + 48 >> 2] + 38 | 0] & 1) << 24 >> 24 != 0) {
                  var ie = ge, lf = he;
                } else {
                  if ((a[h[Qe + 52 >> 2] + 38 | 0] & 1) << 24 >> 24 != 0) {
                    ie = ge, lf = he;
                  } else {
                    (he | 0) < (h[Ae >> 2] | 0) || G(y.o | 0, 62, y.P | 0, y.T | 0);
                    var Af = he + 1 | 0;
                    h[Ja] = Af;
                    h[((he << 2) + h[$a] | 0) >> 2] = Qe;
                    h[nb] |= 1;
                    var Dg = h[zf >> 2];
                    Za = (Dg + 4 | 0) >> 1;
                    (b[Za] & 1) << 16 >> 16 != 0 ? ie = ge : ((ge | 0) < (Ld | 0) || G(y.r | 0, 495, y.O | 0, y.Ha | 0), h[(ge << 2 >> 2) + vb] = Dg, b[Za] |= 1, ie = ge + 1 | 0);
                    lf = Af;
                  }
                }
              } else {
                ie = ge, lf = he;
              }
              Cg = zf + 12 | 0;
              ge = ie;
              he = lf;
            }
            for (var eh = fe + 108 | 0, Id = ge, De = Ag; ; ) {
              var rd = h[eh >> 2];
              if ((rd | 0) == 0) {
                zg = Id;
                ag = Bg;
                Ag = De;
                bg = he;
                continue b;
              }
              var Eg = rd + 4 | 0, mf = h[Eg >> 2];
              if ((a[mf + 60 | 0] & 1) << 24 >> 24 == 0) {
                var Ee = h[rd >> 2];
                Ra = (Ee + 4 | 0) >> 1;
                if ((b[Ra] & 32) << 16 >> 16 == 0) {
                  var Re = Id, Vd = De;
                } else {
                  (De | 0) < (h[rg >> 2] | 0) || G(y.o | 0, 68, y.sb | 0, y.$b | 0);
                  var Bf = De + 1 | 0;
                  h[Ga] = Bf;
                  h[((De << 2) + h[Fa] | 0) >> 2] = mf;
                  a[h[Eg >> 2] + 60 | 0] = 1;
                  (b[Ra] & 1) << 16 >> 16 != 0 ? Re = Id : ((Id | 0) < (Ld | 0) || G(y.r | 0, 524, y.O | 0, y.Ha | 0), h[(Id << 2 >> 2) + vb] = Ee, b[Ra] |= 1, Re = Id + 1 | 0);
                  Vd = Bf;
                }
              } else {
                Re = Id, Vd = De;
              }
              eh = rd + 12 | 0;
              Id = Re;
              De = Vd;
            }
          }
          var eg = (a[re] & 1) << 24 >> 24 == 0;
          et(Lb);
          var nf = (h[Sa] | 0) > 0;
          b : do {
            if (nf) {
              for (var Yd = 0; ; ) {
                var Fe = h[h[Ea] + (Yd << 2) >> 2];
                fa = Fe >> 2;
                var Ge = Fe + 44 | 0, Ih = l[Ge >> 2], Fg = l[fa + 12], Se = l[fa + 14], of = Fe + 64 | 0, Cf = of | 0;
                Xa = Cf >> 2;
                var He = of + 4 | 0;
                Ba = He >> 2;
                var fg = h[Ba], pf = (t[0] = h[Xa], x[0]), Df = (t[0] = fg, x[0]), Gg = l[fa + 18], Ef = Ge, gg = Fe + 36 | 0, $c = Ef | 0;
                Ca = $c >> 2;
                var Yk = h[Ca], sd = Ef + 4 | 0;
                Wa = sd >> 2;
                var Hj = h[Wa], Ff = gg | 0;
                Ma = Ff >> 2;
                h[Ma] = Yk;
                var qf = gg + 4 | 0;
                ra = qf >> 2;
                h[ra] = Hj;
                l[fa + 13] = Se;
                if ((h[fa] | 0) == 2) {
                  var Ji = l[fa + 35], Zd = l[fa + 30], Gf = 1 - l[fa + 33] * .01666666753590107, rf = Gf < 1 ? Gf : 1, Hg = rf < 0 ? 0 : rf, Jh = 1 - l[fa + 34] * .01666666753590107, Kh = Jh < 1 ? Jh : 1, Lh = (Gg + l[fa + 32] * .01666666753590107 * l[fa + 21]) * (Kh < 0 ? 0 : Kh), fh = (pf + (l[Be >> 2] * Ji + l[fa + 19] * Zd) * .01666666753590107) * Hg, Ki = (Df + (l[Rf >> 2] * Ji + l[fa + 20] * Zd) * .01666666753590107) * Hg;
                } else {
                  Lh = Gg, fh = pf, Ki = Df;
                }
                var Li = h[oa];
                l[(Li >> 2) + (Yd * 3 | 0)] = Ih;
                l[(Li + 4 >> 2) + (Yd * 3 | 0)] = Fg;
                l[(h[oa] + 8 >> 2) + (Yd * 3 | 0)] = Se;
                var Mi = h[Ya] + Yd * 12 | 0, Ni = (x[0] = fh, t[0]), Oi = (x[0] = Ki, t[0]) | 0, hg = Mi | 0;
                h[hg >> 2] = 0 | Ni;
                var ig = Mi + 4 | 0;
                h[ig >> 2] = Oi;
                l[(h[Ya] + 8 >> 2) + (Yd * 3 | 0)] = Lh;
                var Pi = Yd + 1 | 0;
                if ((Pi | 0) >= (h[Sa] | 0)) {
                  break b;
                }
                Yd = Pi;
              }
            }
          } while (0);
          et(bc);
          var ue = h[Ne >> 2], Ig = (h[ff >> 2] | 0) * .0010000000474974513, Qi = Ig >= 0 ? Math.floor(Ig) : Math.ceil(Ig);
          l[sg >> 2] = .01666666753590107;
          l[Sf >> 2] = 59.999996185302734;
          l[Tf >> 2] = uc;
          h[uf >> 2] = 3;
          h[se >> 2] = 3;
          a[tg] = Xc;
          var Ri = h[oa];
          h[Uf >> 2] = Ri;
          var Si = h[Ya];
          h[Vf >> 2] = Si;
          l[Yg >> 2] = .01666666753590107;
          l[Fh >> 2] = 59.999996185302734;
          l[ug >> 2] = uc;
          h[gf >> 2] = 3;
          h[vg >> 2] = 3;
          a[Zg] = Xc;
          h[$g >> 2] = h[$a];
          h[ah >> 2] = h[Ja];
          h[vf >> 2] = Ri;
          h[hf >> 2] = Si;
          h[jf >> 2] = h[rb];
          gt(dc, Tb);
          ht(dc);
          b : do {
            if (wf) {
              var Hf = 0;
              ia = 119;
            } else {
              var Mh = h[Oe >> 2];
              if ((Mh | 0) > 0) {
                var Ti = h[Ia];
                ba = Ti >> 2;
                for (var gh = h[kf >> 2], Dc = 0; ; ) {
                  var hh = h[ba + (Dc * 38 | 0) + 28], Te = h[ba + (Dc * 38 | 0) + 29], Ui = l[ba + (Dc * 38 | 0) + 30], Nh = l[ba + (Dc * 38 | 0) + 32], Vi = l[ba + (Dc * 38 | 0) + 31], Wi = l[ba + (Dc * 38 | 0) + 33], Oh = h[ba + (Dc * 38 | 0) + 36], Jg = gh + hh * 12 | 0, ve = Jg | 0;
                  Qa = ve >> 2;
                  var Ie = Jg + 4 | 0;
                  hb = Ie >> 2;
                  var Ph = h[hb], Qh = (t[0] = h[Qa], x[0]), If = (t[0] = Ph, x[0]), Xi = gh + hh * 12 + 8 | 0, ih = l[Xi >> 2], jh = gh + Te * 12 | 0, Zk = h[jh + 4 >> 2], Kg = (t[0] = h[jh >> 2], x[0]), kh = (t[0] = Zk, x[0]), Jf = gh + Te * 12 + 8 | 0, lh = l[Jf >> 2], Rh = Ti + Dc * 152 + 72 | 0, Ij = h[Rh + 4 >> 2], mh = (t[0] = h[Rh >> 2], x[0]), Lg = (t[0] = Ij, x[0]), Jj = mh * -1, Kj = (Oh | 0) > 0;
                  c : do {
                    if (Kj) {
                      for (var Sh = kh, Th = Kg, jg = If, Yi = Qh, Zi = ih, Uh = lh, Je = 0; ; ) {
                        var Vh = l[ba + (Dc * 38 | 0) + (Je * 9 | 0) + 4], $i = l[ba + (Dc * 38 | 0) + (Je * 9 | 0) + 5], Wh = mh * Vh + Lg * $i, Mg = Lg * Vh + Jj * $i, Xh = Zi - Nh * (l[ba + (Dc * 38 | 0) + (Je * 9 | 0)] * Mg - l[ba + (Dc * 38 | 0) + (Je * 9 | 0) + 1] * Wh), je = Yi - Wh * Ui, Lj = jg - Mg * Ui, nh = Uh + Wi * (l[ba + (Dc * 38 | 0) + (Je * 9 | 0) + 2] * Mg - l[ba + (Dc * 38 | 0) + (Je * 9 | 0) + 3] * Wh), Yh = Th + Wh * Vi, Zh = Sh + Mg * Vi, $h = Je + 1 | 0;
                        if (($h | 0) == (Oh | 0)) {
                          var ai = Zh, aj = Yh, bi = Lj, ci = je, Ng = Xh, oh = nh;
                          break c;
                        }
                        Sh = Zh;
                        Th = Yh;
                        jg = Lj;
                        Yi = je;
                        Zi = Xh;
                        Uh = nh;
                        Je = $h;
                      }
                    } else {
                      ai = kh, aj = Kg, bi = If, ci = Qh, Ng = ih, oh = lh;
                    }
                  } while (0);
                  var Kf = (x[0] = ci, t[0]), Mj = (x[0] = bi, t[0]) | 0;
                  h[(Jg | 0) >> 2] = 0 | Kf;
                  h[(Jg + 4 | 0) >> 2] = Mj;
                  l[Xi >> 2] = Ng;
                  var Nj = (x[0] = aj, t[0]), sf = (x[0] = ai, t[0]) | 0, $c = jh | 0;
                  Ca = $c >> 2;
                  h[Ca] = 0 | Nj;
                  sd = jh + 4 | 0;
                  Wa = sd >> 2;
                  h[Wa] = sf;
                  l[Jf >> 2] = oh;
                  var di = Dc + 1 | 0;
                  if ((di | 0) >= (Mh | 0)) {
                    Hf = 0;
                    break b;
                  }
                  Dc = di;
                }
              } else {
                Hf = 0;
              }
            }
          } while (0);
          for (;;) {
            if ((Hf | 0) >= (h[Ga] | 0)) {
              break;
            }
            var ei = h[h[Fa] + (Hf << 2) >> 2];
            Wl[h[h[ei >> 2] + 28 >> 2]](ei, ib);
            Hf = Hf + 1 | 0;
          }
          et(mc);
          var bj = (((h[Wf >> 2] - ue) * 1e3 | 0) >>> 0) + (h[Ed >> 2] | 0) * .0010000000474974513 - (Qi >>> 0);
          et(zc);
          for (var fi = h[Ce >> 2], gi = (h[wc >> 2] | 0) * .0010000000474974513, cj = gi >= 0 ? Math.floor(gi) : Math.ceil(gi), hi = 0; ; ) {
            if ((hi | 0) >= 3) {
              break;
            }
            for (var Ue = 0; ; ) {
              if ((Ue | 0) >= (h[Ga] | 0)) {
                break;
              }
              var ii = h[h[Fa] + (Ue << 2) >> 2];
              Wl[h[h[ii >> 2] + 32 >> 2]](ii, ib);
              Ue = Ue + 1 | 0;
            }
            it(dc);
            hi = hi + 1 | 0;
          }
          var Og = k[Oe >> 2], ji = (Og | 0) > 0;
          b : do {
            if (ji) {
              var dj = h[Ia];
              Cb = dj >> 2;
              for (var ej = h[Fd >> 2], Lf = 0; ; ) {
                var fj = h[ej + (h[Cb + (Lf * 38 | 0) + 37] << 2) >> 2], gj = dj + Lf * 152 + 144 | 0, ki = (h[gj >> 2] | 0) > 0;
                c : do {
                  if (ki) {
                    for (var Mf = 0; ; ) {
                      l[(fj + 72 >> 2) + (Mf * 5 | 0)] = l[Cb + (Lf * 38 | 0) + (Mf * 9 | 0) + 4];
                      l[(fj + 76 >> 2) + (Mf * 5 | 0)] = l[Cb + (Lf * 38 | 0) + (Mf * 9 | 0) + 5];
                      var ph = Mf + 1 | 0;
                      if ((ph | 0) >= (h[gj >> 2] | 0)) {
                        break c;
                      }
                      Mf = ph;
                    }
                  }
                } while (0);
                var Nf = Lf + 1 | 0;
                if ((Nf | 0) >= (Og | 0)) {
                  break b;
                }
                Lf = Nf;
              }
            }
          } while (0);
          et(Gc);
          var hj = (((h[Gd >> 2] - fi) * 1e3 | 0) >>> 0) + (h[Xf >> 2] | 0) * .0010000000474974513 - (cj >>> 0), Bp = (h[Sa] | 0) > 0;
          b : do {
            if (Bp) {
              for (var kg = 0; ; ) {
                var Tm = h[oa], Oj = Tm + kg * 12 | 0, Pj = h[Oj + 4 >> 2], $k = (t[0] = h[Oj >> 2], x[0]), Um = (t[0] = Pj, x[0]), Vm = l[(Tm + 8 >> 2) + (kg * 3 | 0)], al = h[Ya], Qj = al + kg * 12 | 0, qh = Qj | 0;
                pb = qh >> 2;
                var ij = Qj + 4 | 0;
                lb = ij >> 2;
                var Wm = h[lb], jj = (t[0] = h[pb], x[0]), Rj = (t[0] = Wm, x[0]), kj = l[(al + 8 >> 2) + (kg * 3 | 0)], Xm = jj * .01666666753590107, Ym = Rj * .01666666753590107, Zm = Xm * Xm + Ym * Ym;
                if (Zm > 4) {
                  var $m = 2 / Nm(Zm), bl = jj * $m, cl = Rj * $m;
                } else {
                  bl = jj, cl = Rj;
                }
                var lj = kj * .01666666753590107, Of = lj * lj > 2.4674012660980225 ? kj * (1.5707963705062866 / (lj > 0 ? lj : -lj)) : kj, mj = Um + cl * .01666666753590107, Sj = Vm + Of * .01666666753590107, Tj = (x[0] = $k + bl * .01666666753590107, t[0]), Uj = (x[0] = mj, t[0]), an = 0 | Tj, Vj = Uj | 0, ve = Oj | 0;
                Qa = ve >> 2;
                h[Qa] = an;
                Ie = Oj + 4 | 0;
                hb = Ie >> 2;
                h[hb] = Vj;
                l[(h[oa] + 8 >> 2) + (kg * 3 | 0)] = Sj;
                var li = h[Ya] + kg * 12 | 0, bn = (x[0] = bl, t[0]), cn = (x[0] = cl, t[0]) | 0, Wj = li | 0;
                h[Wj >> 2] = 0 | bn;
                var Xj = li + 4 | 0;
                h[Xj >> 2] = cn;
                l[(h[Ya] + 8 >> 2) + (kg * 3 | 0)] = Of;
                var rh = kg + 1 | 0;
                if ((rh | 0) >= (h[Sa] | 0)) {
                  break b;
                }
                kg = rh;
              }
            }
          } while (0);
          et(yc);
          var dl = h[bh >> 2], Pg = (h[ch >> 2] | 0) * .0010000000474974513, dn = Pg >= 0 ? Math.floor(Pg) : Math.ceil(Pg), nj = k[wg >> 2];
          mb = nj >> 2;
          for (var mi = h[xg >> 2], oj = 0; ; ) {
            if ((oj | 0) >= 3) {
              var Yj = 1;
              break;
            }
            b : do {
              if (ji) {
                for (var we = 0, Zj = 0; ; ) {
                  var Cp = nj + we * 88 | 0, en = h[mb + (we * 22 | 0) + 8], el = h[mb + (we * 22 | 0) + 9], fl = nj + we * 88 + 48 | 0, ni = fl | 0;
                  Pa = ni >> 2;
                  var oi = fl + 4 | 0;
                  na = oi >> 2;
                  var fn = h[na], gl = (t[0] = h[Pa], x[0]), $j = (t[0] = fn, x[0]), pj = l[mb + (we * 22 | 0) + 10], hl = l[mb + (we * 22 | 0) + 16], il = nj + we * 88 + 56 | 0, hg = il | 0, ig = il + 4 | 0, gn = h[ig >> 2], jl = (t[0] = h[hg >> 2], x[0]), ak = (t[0] = gn, x[0]), bk = l[mb + (we * 22 | 0) + 11], kl = l[mb + (we * 22 | 0) + 17], ll = h[mb + (we * 22 | 0) + 21], ck = mi + en * 12 | 0, ml = ck | 0, dk = ck + 4 | 0, Dp = h[dk >> 2], hn = (t[0] = h[ml >> 2], x[0]), nl = (t[0] = Dp, x[0]), jn = mi + en * 12 + 8 | 0, kn = l[jn >> 2], ek = mi + el * 12 | 0, Ep = h[ek + 4 >> 2], ln = (t[0] = h[ek >> 2], x[0]), mn = (t[0] = Ep, x[0]), nn = mi + el * 12 + 8 | 0, pi = l[nn >> 2], ol = (ll | 0) > 0;
                  c : do {
                    if (ol) {
                      for (var fk = pj + bk, sh = mn, qi = ln, ri = nl, th = hn, uh = kn, si = pi, ti = Zj, qj = 0; ; ) {
                        var ui = Ks(uh);
                        l[Td >> 2] = ui;
                        var gk = Ms(uh);
                        l[sc >> 2] = gk;
                        var vi = Ks(si);
                        l[Gh >> 2] = vi;
                        var rj = Ms(si);
                        l[xf >> 2] = rj;
                        var Fp = ri - (ui * gl + gk * $j), on = (x[0] = th - (gk * gl - ui * $j), t[0]), pn = (x[0] = Fp, t[0]) | 0, hk = $b | 0;
                        h[hk >> 2] = 0 | on;
                        var sj = $b + 4 | 0;
                        h[sj >> 2] = pn;
                        var tj = sh - (vi * jl + rj * ak), qn = (x[0] = qi - (rj * jl - vi * ak), t[0]), rn = (x[0] = tj, t[0]) | 0, ik = ac | 0;
                        h[ik >> 2] = 0 | qn;
                        var pl = ac + 4 | 0;
                        h[pl >> 2] = rn;
                        jt(lc, Cp, $b, ac, qj);
                        var jk = lc | 0, wi = lc + 4 | 0, sn = h[wi >> 2], kk = (t[0] = h[jk >> 2], x[0]), lk = (t[0] = sn, x[0]), mk = Yf | 0, nk = Yf + 4 | 0, tn = h[nk >> 2], ql = (t[0] = h[mk >> 2], x[0]), ok = (t[0] = tn, x[0]), pk = l[Ud >> 2], rl = ql - th, sl = ok - ri, tl = ql - qi, ul = ok - sh, vl = ti < pk ? ti : pk, qk = (pk + .004999999888241291) * .20000000298023224, un = qk < 0 ? qk : 0, vn = rl * lk - sl * kk, wn = tl * lk - ul * kk, xn = fk + hl * vn * vn + kl * wn * wn, yn = xn > 0 ? -(un < -.20000000298023224 ? -.20000000298023224 : un) / xn : 0, xi = kk * yn, yi = lk * yn, zn = th - xi * pj, An = ri - yi * pj, rk = uh - hl * (rl * yi - sl * xi), sk = qi + xi * bk, Bn = sh + yi * bk, Cn = si + kl * (tl * yi - ul * xi), Dn = qj + 1 | 0;
                        if ((Dn | 0) == (ll | 0)) {
                          var En = Bn, Fn = sk, wl = An, tk = zn, uk = rk, Gn = Cn, Qg = vl;
                          break c;
                        }
                        sh = Bn;
                        qi = sk;
                        ri = An;
                        th = zn;
                        uh = rk;
                        si = Cn;
                        ti = vl;
                        qj = Dn;
                      }
                    } else {
                      En = mn, Fn = ln, wl = nl, tk = hn, uk = kn, Gn = pi, Qg = Zj;
                    }
                  } while (0);
                  var zi = (x[0] = tk, t[0]), xl = (x[0] = wl, t[0]) | 0, ve = ck | 0;
                  Qa = ve >> 2;
                  h[Qa] = 0 | zi;
                  Ie = ck + 4 | 0;
                  hb = Ie >> 2;
                  h[hb] = xl;
                  l[jn >> 2] = uk;
                  var Hn = (x[0] = Fn, t[0]), Gp = (x[0] = En, t[0]) | 0, vh = ek | 0;
                  fb = vh >> 2;
                  h[fb] = 0 | Hn;
                  var lg = ek + 4 | 0;
                  Aa = lg >> 2;
                  h[Aa] = Gp;
                  l[nn >> 2] = Gn;
                  var yl = we + 1 | 0;
                  if ((yl | 0) >= (Og | 0)) {
                    var uj = Qg;
                    break b;
                  }
                  we = yl;
                  Zj = Qg;
                }
              } else {
                uj = 0;
              }
            } while (0);
            for (var Hp = uj >= -.014999999664723873, Ai = 0, Bi = 1; ; ) {
              if ((Ai | 0) >= (h[Ga] | 0)) {
                break;
              }
              var Ci = h[h[Fa] + (Ai << 2) >> 2], In = Wl[h[h[Ci >> 2] + 36 >> 2]](Ci, ib), Ip = Bi & In, Ai = Ai + 1 | 0, Bi = Ip;
            }
            if (Hp & Bi) {
              Yj = 0;
              break;
            }
            oj = oj + 1 | 0;
          }
          var Jn = (h[Sa] | 0) > 0;
          b : do {
            if (Jn) {
              for (var wh = 0; ; ) {
                var vk = h[h[Ea] + (wh << 2) >> 2];
                qa = vk >> 2;
                var zl = h[oa] + wh * 12 | 0, wk = vk + 44 | 0, xk = zl | 0, yk = h[xk >> 2], vj = zl + 4 | 0, wj = h[vj >> 2];
                h[(wk | 0) >> 2] = yk;
                h[(wk + 4 | 0) >> 2] = wj;
                var zk = l[(h[oa] + 8 >> 2) + (wh * 3 | 0)];
                l[qa + 14] = zk;
                var Al = h[Ya] + wh * 12 | 0, Bl = vk + 64 | 0, $c = Al | 0;
                Ca = $c >> 2;
                var Cl = h[Ca], sd = Al + 4 | 0;
                Wa = sd >> 2;
                var Ak = h[Wa], Ff = Bl | 0;
                Ma = Ff >> 2;
                h[Ma] = Cl;
                qf = Bl + 4 | 0;
                ra = qf >> 2;
                h[ra] = Ak;
                l[qa + 18] = l[(h[Ya] + 8 >> 2) + (wh * 3 | 0)];
                var xh = Ks(zk);
                l[qa + 5] = xh;
                var Bk = Ms(zk);
                l[qa + 6] = Bk;
                var Jp = vk + 12 | 0, Dl = l[qa + 7], Kn = l[qa + 8], Kp = Bk * Dl - xh * Kn, Ln = xh * Dl + Bk * Kn, El = (t[0] = yk, x[0]) - Kp, Mn = (t[0] = wj, x[0]) - Ln, Fl = Jp, Nn = (x[0] = El, t[0]), On = (x[0] = Mn, t[0]) | 0;
                h[(Fl | 0) >> 2] = 0 | Nn;
                h[(Fl + 4 | 0) >> 2] = On;
                var Gl = wh + 1 | 0;
                if ((Gl | 0) >= (h[Sa] | 0)) {
                  break b;
                }
                wh = Gl;
              }
            }
          } while (0);
          et(cc);
          var Pn = (((h[Zf >> 2] - dl) * 1e3 | 0) >>> 0) + (h[Hh >> 2] | 0) * .0010000000474974513 - (dn >>> 0), Qn = k[Ia];
          za = Qn >> 2;
          var Lp = (h[Pe >> 2] | 0) == 0;
          b : do {
            if (Lp) {
              ia = 171;
            } else {
              if ((h[Ja] | 0) > 0) {
                for (var yh = 0; ; ) {
                  var Rn = h[h[$a] + (yh << 2) >> 2], Hl = h[za + (yh * 38 | 0) + 36];
                  h[yf >> 2] = Hl;
                  var Mp = (Hl | 0) > 0;
                  c : do {
                    if (Mp) {
                      for (var zh = 0; ; ) {
                        l[Sb + (zh << 2) >> 2] = l[za + (yh * 38 | 0) + (zh * 9 | 0) + 4];
                        l[Sb + (zh << 2) + 8 >> 2] = l[za + (yh * 38 | 0) + (zh * 9 | 0) + 5];
                        var Il = zh + 1 | 0;
                        if ((Il | 0) == (Hl | 0)) {
                          break c;
                        }
                        zh = Il;
                      }
                    }
                  } while (0);
                  var Jl = h[Pe >> 2];
                  Wl[h[h[Jl >> 2] + 20 >> 2]](Jl, Rn, Sb);
                  var Ah = yh + 1 | 0;
                  if ((Ah | 0) >= (h[Ja] | 0)) {
                    break b;
                  }
                  yh = Ah;
                }
              }
            }
          } while (0);
          b : do {
            if (!eg && (h[Sa] | 0) > 0) {
              for (var xj = 3.4028234663852886e+38, Ck = 0; ; ) {
                var Rg = h[h[Ea] + (Ck << 2) >> 2], Sn = (h[Rg >> 2] | 0) == 0;
                c : do {
                  if (Sn) {
                    var yj = xj;
                  } else {
                    var Np = (b[Rg + 4 >> 1] & 4) << 16 >> 16 == 0;
                    do {
                      if (!Np) {
                        var Kl = l[Rg + 72 >> 2];
                        if (Kl * Kl <= .001218469929881394) {
                          var Tn = l[Rg + 64 >> 2], Un = l[Rg + 68 >> 2];
                          if (Tn * Tn + Un * Un <= 9999999747378752e-20) {
                            var Ll = Rg + 144 | 0, Dk = l[Ll >> 2] + .01666666753590107;
                            l[Ll >> 2] = Dk;
                            yj = xj < Dk ? xj : Dk;
                            break c;
                          }
                        }
                      }
                    } while (0);
                    yj = l[Rg + 144 >> 2] = 0;
                  }
                } while (0);
                var Vn = Ck + 1 | 0, Wn = k[Sa];
                if ((Vn | 0) >= (Wn | 0)) {
                  break;
                }
                xj = yj;
                Ck = Vn;
              }
              if ((Wn | 0) > 0 & ((yj < .5 | Yj) ^ 1)) {
                for (var Ek = 0; ; ) {
                  var Fk = k[h[Ea] + (Ek << 2) >> 2];
                  ka = Fk >> 2;
                  b[(Fk + 4 | 0) >> 1] &= -3;
                  l[ka + 36] = 0;
                  l[ka + 16] = 0;
                  l[ka + 17] = 0;
                  l[ka + 18] = 0;
                  l[ka + 19] = 0;
                  l[ka + 20] = 0;
                  l[ka + 21] = 0;
                  var Ml = Ek + 1 | 0;
                  if ((Ml | 0) >= (h[Sa] | 0)) {
                    break b;
                  }
                  Ek = Ml;
                }
              }
            }
          } while (0);
          var Gk = h[yg >> 2];
          Ts(Gk, Qn);
          Ts(Gk, nj);
          l[Pb] += bj;
          l[Db] += hj;
          l[Ob] += Pn;
          var Nl = h[Sa];
          if ((Nl | 0) > 0) {
            for (var Xn = h[Ea], Hk = 0; ; ) {
              var Ol = h[Xn + (Hk << 2) >> 2];
              (h[Ol >> 2] | 0) == 0 && (b[(Ol + 4 | 0) >> 1] &= -2);
              var Pl = Hk + 1 | 0;
              if ((Pl | 0) >= (Nl | 0)) {
                break a;
              }
              Hk = Pl;
            }
          }
        }
      } while (0);
      Hd = $f + 96 | 0;
    }
    Ts(Bd, ef);
    et(Hc);
    for (var Yn = h[Hc >> 2], Ik = (h[Hc + 4 >> 2] | 0) * .0010000000474974513, Zn = Ik >= 0 ? Math.floor(Ik) : Math.ceil(Ik), $n = Ac + 8 | 0, Op = Ac + 12 | 0, Ql = jd; ; ) {
      var Ve = h[Ql >> 2];
      if ((Ve | 0) == 0) {
        break;
      }
      var Pp = (b[Ve + 4 >> 1] & 1) << 16 >> 16 == 0;
      a : do {
        if (!Pp && (h[Ve >> 2] | 0) != 0) {
          var Rl = l[Ve + 52 >> 2], Jk = Ks(Rl);
          l[$n >> 2] = Jk;
          var Sl = Ms(Rl);
          l[Op >> 2] = Sl;
          var ao = l[Ve + 28 >> 2], Tl = l[Ve + 32 >> 2], Ul = l[Ve + 40 >> 2] - (Jk * ao + Sl * Tl), bo = (x[0] = l[Ve + 36 >> 2] - (Sl * ao - Jk * Tl), t[0]), Vl = (x[0] = Ul, t[0]), hB = 0 | bo, iB = Vl | 0, vh = Ac | 0;
          fb = vh >> 2;
          h[fb] = hB;
          lg = Ac + 4 | 0;
          Aa = lg >> 2;
          h[Aa] = iB;
          var jB = h[Ve + 88 >> 2] + 102872 | 0, St = h[Ve + 100 >> 2];
          if ((St | 0) != 0) {
            for (var kB = Ve + 12 | 0, Zp = St; ; ) {
              ct(Zp, jB, Ac, kB);
              var Tt = h[Zp + 4 >> 2];
              if ((Tt | 0) == 0) {
                break a;
              }
              Zp = Tt;
            }
          }
        }
      } while (0);
      Ql = Ve + 96 | 0;
    }
    Xs(jc, jc);
    et(Ic);
    l[tb + 25755] = (((h[Ic >> 2] - Yn) * 1e3 | 0) >>> 0) + (h[Ic + 4 >> 2] | 0) * .0010000000474974513 - (Zn >>> 0);
    Ts(h[rb], h[oa]);
    Ts(h[rb], h[Ya]);
    Ts(h[rb], h[Fa]);
    var Ut = h[rb];
    Ts(Ut, h[$a]);
    Ts(Ut, h[Ea]);
    et(xb);
    l[tb + 25751] = (((h[xb >> 2] - ce) * 1e3 | 0) >>> 0) + (h[xb + 4 >> 2] | 0) * .0010000000474974513 - (Rd >>> 0);
  }
  if ((a[c + 102993 | 0] & 1) << 24 >> 24 != 0) {
    et(Qc);
    var lB = h[Qc >> 2], $p = (h[Qc + 4 >> 2] | 0) * .0010000000474974513, mB = $p >= 0 ? Math.floor($p) : Math.ceil($p);
    ja = sa >> 2;
    var nB = c + 68 | 0;
    ha = (c + 102944 | 0) >> 2;
    dt(Kb, 64, 32, 0, nB, h[ha]);
    var oB = (a[id] & 1) << 24 >> 24 == 0;
    a : do {
      if (!oB) {
        var Vt = h[tb + 25738], pB = (Vt | 0) == 0;
        b : do {
          if (!pB) {
            for (var fo = Vt; ; ) {
              b[(fo + 4 | 0) >> 1] &= -2;
              l[fo + 60 >> 2] = 0;
              var Wt = h[fo + 96 >> 2];
              if ((Wt | 0) == 0) {
                break b;
              }
              fo = Wt;
            }
          }
        } while (0);
        var Xt = h[Mb];
        if ((Xt | 0) != 0) {
          var go = Xt;
          for (ea = go >> 2; ; ) {
            h[(go + 4 | 0) >> 2] &= -34;
            h[ea + 32] = 0;
            l[ea + 33] = 1;
            var Yt = h[ea + 3];
            if ((Yt | 0) == 0) {
              break a;
            }
            go = Yt;
            ea = go >> 2;
          }
        }
      }
    } while (0);
    var Zt = sa + 16 | 0, $t = sa + 20 | 0, au = sa + 24 | 0;
    Oa = (sa + 44 | 0) >> 2;
    $ = (sa + 48 | 0) >> 2;
    var bu = sa + 52 | 0, cu = sa | 0, aq = sa + 28 | 0, du = sa + 56 | 0, eu = sa + 92 | 0, fu = sa + 128 | 0;
    pa = (Kb + 28 | 0) >> 2;
    eb = (Kb + 36 | 0) >> 2;
    var qB = Kb + 32 | 0, gu = Kb + 40 | 0;
    db = (Kb + 8 | 0) >> 2;
    var hu = Kb + 44 | 0;
    yb = (Kb + 12 | 0) >> 2;
    var rB = Rb | 0, sB = Rb + 4 | 0, tB = ub + 8 | 0, uB = ub + 12 | 0, vB = c + 102994 | 0;
    gb = (Kb + 20 | 0) >> 2;
    ob = (Kb + 24 | 0) >> 2;
    var wB = Ib + 24 | 0, xB = Ib + 28 | 0, iu = Kb | 0, yB = Ib + 40 | 0, zB = Ib | 0, AB = Ib + 4 | 0, BB = Ib + 8 | 0, CB = Ib + 12 | 0, DB = Ib + 16 | 0, EB = Ib + 20 | 0, FB = Ib + 32 | 0, GB = Ib + 36 | 0, HB = Xb + 48 | 0, ju = Xb + 36 | 0, IB = Xb + 24 | 0, JB = V + 8 | 0, KB = V + 12 | 0, LB = Hb + 8 | 0, MB = Hb + 12 | 0, ku = Qb + 8 | 0, NB = Qb + 16 | 0, OB = Xb + 40 | 0, PB = Kb + 4 | 0, QB = Xb + 32 | 0, RB = Bb + 16 | 0;
    bb = Ka >> 2;
    var SB = du | 0, TB = sa + 60 | 0, UB = sa + 64 | 0, VB = sa + 68 | 0, WB = sa + 72 | 0, XB = sa + 76 | 0, YB = sa + 80 | 0, ZB = sa + 84 | 0, $B = sa + 88 | 0, aC = eu | 0, bC = sa + 96 | 0, cC = sa + 100 | 0, dC = sa + 104 | 0, eC = sa + 108 | 0, fC = sa + 112 | 0, gC = sa + 116 | 0, hC = sa + 120 | 0, iC = sa + 124 | 0, lu = ec + 4 | 0;
    ab = (Ka + 28 | 0) >> 2;
    Ha = aq >> 2;
    var jC = Ka + 88 | 0, kC = Ka + 56 | 0, lC = Ka + 60 | 0, mC = Ka + 64 | 0, nC = Ka + 68 | 0, oC = Ka + 72 | 0, pC = Ka + 76 | 0, qC = Ka + 80 | 0, rC = Ka + 84 | 0, sC = Jb + 16 | 0;
    ya = (S | 0) >> 2;
    da = (S + 4 | 0) >> 2;
    var tC = S + 8 | 0, uC = S + 12 | 0, vC = S + 16 | 0, wC = S + 20 | 0, xC = S + 24 | 0, yC = S + 28 | 0, zC = S + 32 | 0, AC = S + 36 | 0, BC = S + 40 | 0, CC = S + 44 | 0, DC = S + 48 | 0, EC = S + 52 | 0, FC = S + 56 | 0, GC = S + 60 | 0, HC = S + 64 | 0, IC = S + 68 | 0, JC = S + 72 | 0, KC = S + 76 | 0, LC = S + 16 | 0, MC = S + 20 | 0, NC = S + 24 | 0, OC = S + 28 | 0, PC = S + 32 | 0, QC = S + 36 | 0, RC = S + 12 | 0, SC = S + 52 | 0, TC = S + 56 | 0, UC = S + 60 | 0, VC = S + 64 | 0, WC = S + 68 | 0, XC = S + 72 | 0, YC = S + 48 | 0;
    ua = (S + 80 | 0) >> 2;
    var bq = ec + 9 | 0, Di = S + 92 | 0;
    xa = Di >> 2;
    ma = (S + 96 | 0) >> 2;
    Va = (Di | 0) >> 2;
    var ZC = ec + 10 | 0, ho = S + 84 | 0, $C = S + 8 | 0, aD = S + 44 | 0;
    Ua = (S + 92 | 0) >> 2;
    for (var mu = S + 84 | 0, nu = S + 88 | 0, xe = 0, $d = 1, cq = Ub; ; ) {
      var Xl = k[cq >> 2];
      La = Xl >> 2;
      if ((Xl | 0) == 0) {
        if ((xe | 0) == 0 | $d > .9999988079071045) {
          var ou = 1, pu = h[db], qu = h[yb], ru = h[gb], su = h[ob];
          break;
        }
        var td = k[h[xe + 48 >> 2] + 8 >> 2], Wd = k[h[xe + 52 >> 2] + 8 >> 2];
        ca = (td + 28 | 0) >> 2;
        var tu = l[ca];
        ga = (td + 32 | 0) >> 2;
        var uu = l[ga], vu = td + 36 | 0, wu = l[vu >> 2];
        aa = (td + 40 | 0) >> 2;
        var xu = l[aa];
        X = (td + 44 | 0) >> 2;
        var yu = l[X];
        wa = (td + 48 | 0) >> 2;
        var zu = l[wa];
        W = (td + 52 | 0) >> 2;
        var Au = l[W];
        Z = (td + 56 | 0) >> 2;
        var Bu = l[Z];
        Y = (td + 60 | 0) >> 2;
        var dq = l[Y];
        Da = (Wd + 28 | 0) >> 2;
        var bD = l[Da];
        la = (Wd + 32 | 0) >> 2;
        var cD = l[la], Cu = Wd + 36 | 0, dD = l[Cu >> 2];
        R = (Wd + 40 | 0) >> 2;
        var eD = l[R];
        L = (Wd + 44 | 0) >> 2;
        var fD = l[L];
        U = (Wd + 48 | 0) >> 2;
        var gD = l[U];
        Na = (Wd + 52 | 0) >> 2;
        var hD = l[Na];
        M = (Wd + 56 | 0) >> 2;
        var iD = l[M];
        P = (Wd + 60 | 0) >> 2;
        var jD = l[P];
        if (dq < 1) {
          var eq = dq, Du = wu, Eu = xu, Fu = yu, Gu = zu, Hu = Au, Iu = Bu, fq = tu, gq = uu, Ju = td + 36 | 0;
        } else {
          G(y.B | 0, 715, y.w | 0, y.t | 0);
          var Ku = td + 36 | 0, eq = l[Y], Du = l[Ku >> 2], Eu = l[aa], Fu = l[X], Gu = l[wa], Hu = l[W], Iu = l[Z], fq = l[ca], gq = l[ga], Ju = Ku;
        }
        var io = ($d - eq) / (1 - eq), hq = 1 - io, Lu = Du * hq + Fu * io, Mu = Eu * hq + Gu * io, Nu = Ju, kD = (x[0] = Lu, t[0]), lD = (x[0] = Mu, t[0]), Ou = 0 | kD, Pu = lD | 0, $c = Nu | 0;
        Ca = $c >> 2;
        h[Ca] = Ou;
        sd = Nu + 4 | 0;
        Wa = sd >> 2;
        h[Wa] = Pu;
        var jo = hq * Hu + io * Iu;
        l[W] = jo;
        l[Y] = $d;
        var Qu = td + 44 | 0, iq = Qu | 0;
        h[iq >> 2] = Ou;
        var jq = Qu + 4 | 0;
        h[jq >> 2] = Pu;
        l[Z] = jo;
        var kq = Ks(jo), Ru = td + 20 | 0;
        l[Ru >> 2] = kq;
        var lq = Ms(jo), Su = td + 24 | 0;
        l[Su >> 2] = lq;
        var mD = Mu - (kq * fq + lq * gq), ko = td + 12 | 0, nD = (x[0] = Lu - (lq * fq - kq * gq), t[0]), oD = (x[0] = mD, t[0]) | 0, mq = ko | 0;
        h[mq >> 2] = 0 | nD;
        var nq = ko + 4 | 0;
        h[nq >> 2] = oD;
        var Tu = l[P];
        if (Tu < 1) {
          var oq = Tu;
        } else {
          G(y.B | 0, 715, y.w | 0, y.t | 0), oq = l[P];
        }
        var lo = ($d - oq) / (1 - oq), Uu = Wd + 36 | 0, pq = 1 - lo, Vu = l[Uu >> 2] * pq + l[L] * lo, Wu = l[R] * pq + l[U] * lo, Xu = Uu, pD = (x[0] = Vu, t[0]), qD = (x[0] = Wu, t[0]), Yu = 0 | pD, Zu = qD | 0, qq = Xu | 0;
        h[qq >> 2] = Yu;
        var rq = Xu + 4 | 0;
        h[rq >> 2] = Zu;
        var mo = pq * l[Na] + lo * l[M];
        l[Na] = mo;
        l[P] = $d;
        var $u = Wd + 44 | 0;
        h[($u | 0) >> 2] = Yu;
        h[($u + 4 | 0) >> 2] = Zu;
        l[M] = mo;
        var sq = Ks(mo), av = Wd + 20 | 0;
        l[av >> 2] = sq;
        var tq = Ms(mo), bv = Wd + 24 | 0;
        l[bv >> 2] = tq;
        var cv = l[Da], dv = l[la], rD = Wu - (sq * cv + tq * dv), no = Wd + 12 | 0, sD = (x[0] = Vu - (tq * cv - sq * dv), t[0]), tD = (x[0] = rD, t[0]) | 0;
        h[(no | 0) >> 2] = 0 | sD;
        h[(no + 4 | 0) >> 2] = tD;
        ft(xe, h[ha]);
        Q = (xe + 4 | 0) >> 2;
        var uq = h[Q];
        h[Q] = uq & -33;
        var ev = xe + 128 | 0;
        h[ev >> 2] = h[ev >> 2] + 1 | 0;
        if ((uq & 6 | 0) == 6) {
          D = (td + 4 | 0) >> 1;
          var fv = b[D];
          (fv & 2) << 16 >> 16 == 0 && (b[D] = fv | 2, l[td + 144 >> 2] = 0);
          O = (Wd + 4 | 0) >> 1;
          var gv = b[O];
          (gv & 2) << 16 >> 16 == 0 && (b[O] = gv | 2, l[Wd + 144 >> 2] = 0);
          h[pa] = 0;
          h[eb] = 0;
          h[qB >> 2] = 0;
          var hv = h[gu >> 2];
          if ((hv | 0) > 0) {
            var vq = td + 8 | 0;
            h[vq >> 2] = 0;
            var wq = h[db];
            h[wq >> 2] = td;
            h[pa] = 1;
            if ((hv | 0) > 1) {
              var iv = vq, jv = wq;
              ia = 367;
            } else {
              kv = vq, lv = wq, ia = 366;
            }
          } else {
            G(y.o | 0, 54, y.F | 0, y.J | 0);
            var mv = td + 8 | 0;
            h[mv >> 2] = 0;
            var nv = h[db];
            h[nv >> 2] = td;
            h[pa] = 1;
            var kv = mv, lv = nv;
            ia = 366;
          }
          ia == 366 && (G(y.o | 0, 54, y.F | 0, y.J | 0), iv = kv, jv = lv);
          var ov = Wd + 8 | 0;
          h[ov >> 2] = 1;
          h[jv + 4 >> 2] = Wd;
          h[pa] = 2;
          (h[hu >> 2] | 0) > 0 || G(y.o | 0, 62, y.P | 0, y.T | 0);
          h[eb] = 1;
          h[h[yb] >> 2] = xe;
          b[D] |= 1;
          b[O] |= 1;
          h[Q] |= 1;
          h[rB >> 2] = td;
          h[sB >> 2] = Wd;
          for (var pv = h[gu >> 2], qv = h[hu >> 2], xq = k[yb], oo = k[db], po = 0; ; ) {
            if ((po | 0) >= 2) {
              break;
            }
            var yq = h[Rb + (po << 2) >> 2], uD = (h[yq >> 2] | 0) == 2;
            a : do {
              if (uD) {
                for (var vD = yq + 4 | 0, rv = yq + 112 | 0; ; ) {
                  var qo = h[rv >> 2];
                  if ((qo | 0) == 0) {
                    break a;
                  }
                  var Yl = h[pa];
                  if ((Yl | 0) == (pv | 0)) {
                    break a;
                  }
                  var ro = h[eb];
                  if ((ro | 0) == (qv | 0)) {
                    break a;
                  }
                  var Zl = h[qo + 4 >> 2];
                  H = (Zl + 4 | 0) >> 2;
                  var wD = (h[H] & 1 | 0) == 0;
                  b : do {
                    if (wD) {
                      var Oc = h[qo >> 2], sv = Oc | 0, xD = (h[sv >> 2] | 0) == 2;
                      do {
                        if (xD && (b[vD >> 1] & 8) << 16 >> 16 == 0 && (b[Oc + 4 >> 1] & 8) << 16 >> 16 == 0) {
                          break b;
                        }
                      } while (0);
                      if ((a[h[Zl + 48 >> 2] + 38 | 0] & 1) << 24 >> 24 == 0 && (a[h[Zl + 52 >> 2] + 38 | 0] & 1) << 24 >> 24 == 0) {
                        F = (Oc + 28 | 0) >> 2;
                        var zj = l[F];
                        B = (Oc + 32 | 0) >> 2;
                        var Aj = l[B];
                        N = (Oc + 36 | 0) >> 2;
                        var zq = l[N];
                        J = (Oc + 40 | 0) >> 2;
                        var Aq = l[J];
                        K = (Oc + 44 | 0) >> 2;
                        var $l = l[K];
                        C = (Oc + 48 | 0) >> 2;
                        var am = l[C];
                        I = (Oc + 52 | 0) >> 2;
                        var Bq = l[I];
                        A = (Oc + 56 | 0) >> 2;
                        var Bj = l[A];
                        E = (Oc + 60 | 0) >> 2;
                        var so = l[E];
                        z = (Oc + 4 | 0) >> 1;
                        if ((b[z] & 1) << 16 >> 16 == 0) {
                          if (so < 1) {
                            var Cq = so, tv = zq, uv = Aq, vv = $l, wv = am, xv = Bq, yv = Bj, Dq = zj, Eq = Aj, zv = Oc + 36 | 0;
                          } else {
                            G(y.B | 0, 715, y.w | 0, y.t | 0);
                            var Av = Oc + 36 | 0, Cq = l[E], tv = l[Av >> 2], uv = l[J], vv = l[K], wv = l[C], xv = l[I], yv = l[A], Dq = l[F], Eq = l[B], zv = Av;
                          }
                          var to = ($d - Cq) / (1 - Cq), Fq = 1 - to, Bv = tv * Fq + vv * to, Cv = uv * Fq + wv * to, Dv = zv, yD = (x[0] = Bv, t[0]), zD = (x[0] = Cv, t[0]), Ev = 0 | yD, Fv = zD | 0, $c = Dv | 0;
                          Ca = $c >> 2;
                          h[Ca] = Ev;
                          sd = Dv + 4 | 0;
                          Wa = sd >> 2;
                          h[Wa] = Fv;
                          var uo = Fq * xv + to * yv;
                          l[I] = uo;
                          l[E] = $d;
                          var Gv = Oc + 44 | 0, iq = Gv | 0;
                          h[iq >> 2] = Ev;
                          jq = Gv + 4 | 0;
                          h[jq >> 2] = Fv;
                          l[A] = uo;
                          var Gq = Ks(uo);
                          l[Oc + 20 >> 2] = Gq;
                          var Hq = Ms(uo);
                          l[Oc + 24 >> 2] = Hq;
                          var AD = Cv - (Gq * Dq + Hq * Eq), Hv = Oc + 12 | 0, BD = (x[0] = Bv - (Hq * Dq - Gq * Eq), t[0]), CD = (x[0] = AD, t[0]) | 0, mq = Hv | 0;
                          h[mq >> 2] = 0 | BD;
                          nq = Hv + 4 | 0;
                          h[nq >> 2] = CD;
                        }
                        ft(Zl, h[ha]);
                        var Iq = h[H];
                        if ((Iq & 4 | 0) == 0) {
                          l[F] = zj;
                          l[B] = Aj;
                          l[N] = zq;
                          l[J] = Aq;
                          l[K] = $l;
                          l[C] = am;
                          l[I] = Bq;
                          l[A] = Bj;
                          l[E] = so;
                          var Jq = Ks(Bj);
                          l[Oc + 20 >> 2] = Jq;
                          var Kq = Ms(Bj);
                          l[Oc + 24 >> 2] = Kq;
                          var DD = am - (Jq * zj + Kq * Aj), Iv = Oc + 12 | 0, ED = (x[0] = $l - (Kq * zj - Jq * Aj), t[0]), FD = (x[0] = DD, t[0]) | 0, Ff = Iv | 0;
                          Ma = Ff >> 2;
                          h[Ma] = 0 | ED;
                          qf = Iv + 4 | 0;
                          ra = qf >> 2;
                          h[ra] = FD;
                        } else {
                          if ((Iq & 2 | 0) == 0) {
                            l[F] = zj;
                            l[B] = Aj;
                            l[N] = zq;
                            l[J] = Aq;
                            l[K] = $l;
                            l[C] = am;
                            l[I] = Bq;
                            l[A] = Bj;
                            l[E] = so;
                            var Lq = Ks(Bj);
                            l[Oc + 20 >> 2] = Lq;
                            var Mq = Ms(Bj);
                            l[Oc + 24 >> 2] = Mq;
                            var GD = am - (Lq * zj + Mq * Aj), Jv = Oc + 12 | 0, HD = (x[0] = $l - (Mq * zj - Lq * Aj), t[0]), ID = (x[0] = GD, t[0]) | 0, Ff = Jv | 0;
                            Ma = Ff >> 2;
                            h[Ma] = 0 | HD;
                            qf = Jv + 4 | 0;
                            ra = qf >> 2;
                            h[ra] = ID;
                          } else {
                            h[H] = Iq | 1;
                            (ro | 0) < (qv | 0) || G(y.o | 0, 62, y.P | 0, y.T | 0);
                            h[eb] = ro + 1 | 0;
                            h[((ro << 2) + xq | 0) >> 2] = Zl;
                            var vo = b[z];
                            (vo & 1) << 16 >> 16 == 0 && (b[z] = vo | 1, (h[sv >> 2] | 0) != 0 && (vo & 2) << 16 >> 16 == 0 && (b[z] = vo | 3, l[Oc + 144 >> 2] = 0), (Yl | 0) < (pv | 0) || G(y.o | 0, 54, y.F | 0, y.J | 0), h[(Oc + 8 | 0) >> 2] = Yl, h[((Yl << 2) + oo | 0) >> 2] = Oc, h[pa] = Yl + 1 | 0);
                          }
                        }
                      }
                    }
                  } while (0);
                  rv = qo + 12 | 0;
                }
              }
            } while (0);
            po = po + 1 | 0;
          }
          var Ei = (1 - $d) * .01666666753590107, JD = 1 / Ei;
          a[ic] = 0;
          var bm = k[iv >> 2], cm = k[ov >> 2], dm = k[pa];
          (dm | 0) > (bm | 0) || G(y.ua | 0, 386, y.la | 0, y.Fb | 0);
          (dm | 0) > (cm | 0) || G(y.ua | 0, 387, y.la | 0, y.Xb | 0);
          var Kv = (dm | 0) > 0, Nq = h[gb], Oq = h[ob];
          a : do {
            if (Kv) {
              for (var Cj = 0; ; ) {
                var wo = h[oo + (Cj << 2) >> 2], Lv = Nq, Mv = wo + 44 | 0, Nv = Lv + Cj * 12 | 0, ni = Mv | 0;
                Pa = ni >> 2;
                var KD = h[Pa], oi = Mv + 4 | 0;
                na = oi >> 2;
                var LD = h[na];
                h[(Nv | 0) >> 2] = KD;
                h[(Nv + 4 | 0) >> 2] = LD;
                l[(Lv + 8 >> 2) + (Cj * 3 | 0)] = l[wo + 56 >> 2];
                var Ov = Oq, Pv = wo + 64 | 0, Qv = Ov + Cj * 12 | 0, Pq = Pv | 0, Qq = Pv + 4 | 0, MD = h[Qq >> 2], Rq = Qv | 0;
                h[Rq >> 2] = h[Pq >> 2];
                var Sq = Qv + 4 | 0;
                h[Sq >> 2] = MD;
                l[(Ov + 8 >> 2) + (Cj * 3 | 0)] = l[wo + 72 >> 2];
                var Rv = Cj + 1 | 0;
                if ((Rv | 0) >= (dm | 0)) {
                  var xo = Nq, yo = Oq;
                  break a;
                }
                Cj = Rv;
              }
            } else {
              xo = Nq, yo = Oq;
            }
          } while (0);
          var Sv = xq;
          h[wB >> 2] = Sv;
          var Tq = k[eb];
          h[xB >> 2] = Tq;
          h[yB >> 2] = h[iu >> 2];
          l[zB >> 2] = Ei;
          l[AB >> 2] = JD;
          l[BB >> 2] = 1;
          h[CB >> 2] = 3;
          h[DB >> 2] = 20;
          a[EB] = 0;
          var em = xo;
          h[FB >> 2] = em;
          h[GB >> 2] = yo;
          gt(Xb, Ib);
          var Tv = h[HB >> 2], ND = (Tv | 0) > 0, zo = h[ju >> 2];
          u = zo >> 2;
          for (var Ao = h[IB >> 2], Uq = 0; ; ) {
            if ((Uq | 0) >= 20) {
              break;
            }
            a : do {
              if (ND) {
                for (var Pf = 0, Vq = 0; ; ) {
                  var OD = zo + Pf * 88 | 0, Bo = h[u + (Pf * 22 | 0) + 8], Uv = h[u + (Pf * 22 | 0) + 9], Vv = zo + Pf * 88 + 48 | 0, ni = Vv | 0;
                  Pa = ni >> 2;
                  oi = Vv + 4 | 0;
                  na = oi >> 2;
                  var PD = h[na], Wv = (t[0] = h[Pa], x[0]), Xv = (t[0] = PD, x[0]), Yv = zo + Pf * 88 + 56 | 0, qh = Yv | 0;
                  pb = qh >> 2;
                  ij = Yv + 4 | 0;
                  lb = ij >> 2;
                  var QD = h[lb], Zv = (t[0] = h[pb], x[0]), $v = (t[0] = QD, x[0]), aw = h[u + (Pf * 22 | 0) + 21];
                  if ((Bo | 0) == (bm | 0) | (Bo | 0) == (cm | 0)) {
                    var Wq = l[u + (Pf * 22 | 0) + 16], Co = l[u + (Pf * 22 | 0) + 10];
                  } else {
                    Co = Wq = 0;
                  }
                  var bw = l[u + (Pf * 22 | 0) + 17], Xq = l[u + (Pf * 22 | 0) + 11], Do = Ao + Bo * 12 | 0, RD = h[Do + 4 >> 2], cw = (t[0] = h[Do >> 2], x[0]), dw = (t[0] = RD, x[0]), ew = Ao + Bo * 12 + 8 | 0, fw = l[ew >> 2], Eo = Ao + Uv * 12 | 0, SD = h[Eo + 4 >> 2], gw = (t[0] = h[Eo >> 2], x[0]), hw = (t[0] = SD, x[0]), iw = Ao + Uv * 12 + 8 | 0, jw = l[iw >> 2], TD = (aw | 0) > 0;
                  b : do {
                    if (TD) {
                      for (var UD = Co + Xq, Fo = hw, Go = gw, Ho = dw, Io = cw, Yq = Vq, Jo = fw, Ko = jw, Zq = 0; ; ) {
                        var $q = Ks(Jo);
                        l[JB >> 2] = $q;
                        var ar = Ms(Jo);
                        l[KB >> 2] = ar;
                        var br = Ks(Ko);
                        l[LB >> 2] = br;
                        var cr = Ms(Ko);
                        l[MB >> 2] = cr;
                        var VD = Ho - ($q * Wv + ar * Xv), WD = (x[0] = Io - (ar * Wv - $q * Xv), t[0]), XD = (x[0] = VD, t[0]), YD = 0 | WD, ZD = XD | 0, hk = V | 0;
                        h[hk >> 2] = YD;
                        sj = V + 4 | 0;
                        h[sj >> 2] = ZD;
                        var $D = Fo - (br * Zv + cr * $v), aE = (x[0] = Go - (cr * Zv - br * $v), t[0]), bE = (x[0] = $D, t[0]), cE = 0 | aE, dE = bE | 0, ik = Hb | 0;
                        h[ik >> 2] = cE;
                        pl = Hb + 4 | 0;
                        h[pl >> 2] = dE;
                        jt(Qb, OD, V, Hb, Zq);
                        var jk = Qb | 0, wi = Qb + 4 | 0, eE = h[wi >> 2], dr = (t[0] = h[jk >> 2], x[0]), er = (t[0] = eE, x[0]), mk = ku | 0, nk = ku + 4 | 0, fE = h[nk >> 2], kw = (t[0] = h[mk >> 2], x[0]), lw = (t[0] = fE, x[0]), fr = l[NB >> 2], mw = kw - Io, nw = lw - Ho, ow = kw - Go, pw = lw - Fo, qw = Yq < fr ? Yq : fr, rw = (fr + .004999999888241291) * .75, sw = rw < 0 ? rw : 0, tw = mw * er - nw * dr, uw = ow * er - pw * dr, vw = UD + Wq * tw * tw + bw * uw * uw, ww = vw > 0 ? -(sw < -.20000000298023224 ? -.20000000298023224 : sw) / vw : 0, Lo = dr * ww, Mo = er * ww, xw = Io - Lo * Co, yw = Ho - Mo * Co, zw = Jo - Wq * (mw * Mo - nw * Lo), Aw = Go + Lo * Xq, Bw = Fo + Mo * Xq, Cw = Ko + bw * (ow * Mo - pw * Lo), Dw = Zq + 1 | 0;
                        if ((Dw | 0) == (aw | 0)) {
                          var Ew = Bw, Fw = Aw, Gw = yw, Hw = xw, gr = qw, Iw = zw, Jw = Cw;
                          break b;
                        }
                        Fo = Bw;
                        Go = Aw;
                        Ho = yw;
                        Io = xw;
                        Yq = qw;
                        Jo = zw;
                        Ko = Cw;
                        Zq = Dw;
                      }
                    } else {
                      Ew = hw, Fw = gw, Gw = dw, Hw = cw, gr = Vq, Iw = fw, Jw = jw;
                    }
                  } while (0);
                  var gE = (x[0] = Hw, t[0]), hE = (x[0] = Gw, t[0]) | 0, ve = Do | 0;
                  Qa = ve >> 2;
                  h[Qa] = 0 | gE;
                  Ie = Do + 4 | 0;
                  hb = Ie >> 2;
                  h[hb] = hE;
                  l[ew >> 2] = Iw;
                  var iE = (x[0] = Fw, t[0]), jE = (x[0] = Ew, t[0]) | 0, vh = Eo | 0;
                  fb = vh >> 2;
                  h[fb] = 0 | iE;
                  lg = Eo + 4 | 0;
                  Aa = lg >> 2;
                  h[Aa] = jE;
                  l[iw >> 2] = Jw;
                  var Kw = Pf + 1 | 0;
                  if ((Kw | 0) >= (Tv | 0)) {
                    var Lw = gr;
                    break a;
                  }
                  Pf = Kw;
                  Vq = gr;
                }
              } else {
                Lw = 0;
              }
            } while (0);
            if (Lw >= -.007499999832361937) {
              break;
            }
            Uq = Uq + 1 | 0;
          }
          var Mw = oo, Nw = (bm << 2) + Mw | 0, Ow = em + bm * 12 | 0, Pw = h[Nw >> 2] + 36 | 0, kE = h[Ow >> 2], lE = h[Ow + 4 >> 2], xk = Pw | 0;
          h[xk >> 2] = kE;
          vj = Pw + 4 | 0;
          h[vj >> 2] = lE;
          l[h[Nw >> 2] + 52 >> 2] = l[(em + 8 >> 2) + (bm * 3 | 0)];
          var Qw = (cm << 2) + Mw | 0, Rw = em + cm * 12 | 0, Sw = h[Qw >> 2] + 36 | 0, Pq = Rw | 0, mE = h[Pq >> 2], Qq = Rw + 4 | 0, nE = h[Qq >> 2], Rq = Sw | 0;
          h[Rq >> 2] = mE;
          Sq = Sw + 4 | 0;
          h[Sq >> 2] = nE;
          l[h[Qw >> 2] + 52 >> 2] = l[(em + 8 >> 2) + (cm * 3 | 0)];
          ht(Xb);
          for (var hr = 0; ; ) {
            if ((hr | 0) >= 3) {
              break;
            }
            it(Xb);
            hr = hr + 1 | 0;
          }
          a : do {
            if (Kv) {
              for (var Sg = 0, Tw = xo, Uw = yo; ; ) {
                var Vw = Tw, No = Vw + Sg * 12 | 0, ir = No | 0, jr = No + 4 | 0, oE = h[jr >> 2], pE = (t[0] = h[ir >> 2], x[0]), qE = (t[0] = oE, x[0]), rE = l[(Vw + 8 >> 2) + (Sg * 3 | 0)], Ww = Uw, Xw = Ww + Sg * 12 | 0, qh = Xw | 0;
                pb = qh >> 2;
                ij = Xw + 4 | 0;
                lb = ij >> 2;
                var sE = h[lb], kr = (t[0] = h[pb], x[0]), lr = (t[0] = sE, x[0]), mr = l[(Ww + 8 >> 2) + (Sg * 3 | 0)], Yw = kr * Ei, Zw = lr * Ei, $w = Yw * Yw + Zw * Zw;
                if ($w > 4) {
                  var ax = 2 / Nm($w), nr = kr * ax, or = lr * ax;
                } else {
                  nr = kr, or = lr;
                }
                var fm = Ei * mr, pr = fm * fm > 2.4674012660980225 ? mr * (1.5707963705062866 / (fm > 0 ? fm : -fm)) : mr, bx = pE + nr * Ei, cx = qE + or * Ei, Oo = rE + Ei * pr, tE = (x[0] = bx, t[0]), uE = (x[0] = cx, t[0]), dx = 0 | tE, ex = uE | 0, ve = No | 0;
                Qa = ve >> 2;
                h[Qa] = dx;
                Ie = No + 4 | 0;
                hb = Ie >> 2;
                h[hb] = ex;
                var qr = h[gb];
                l[(qr + 8 >> 2) + (Sg * 3 | 0)] = Oo;
                var rr = h[ob], fx = rr, gx = fx + Sg * 12 | 0, vE = (x[0] = nr, t[0]), wE = (x[0] = or, t[0]), hx = 0 | vE, ix = wE | 0, Wj = gx | 0;
                h[Wj >> 2] = hx;
                Xj = gx + 4 | 0;
                h[Xj >> 2] = ix;
                l[(fx + 8 >> 2) + (Sg * 3 | 0)] = pr;
                var jx = h[db], Po = h[jx + (Sg << 2) >> 2];
                s = Po >> 2;
                var kx = Po + 44 | 0;
                h[(kx | 0) >> 2] = dx;
                h[(kx + 4 | 0) >> 2] = ex;
                l[s + 14] = Oo;
                var lx = Po + 64 | 0;
                h[(lx | 0) >> 2] = hx;
                h[(lx + 4 | 0) >> 2] = ix;
                l[s + 18] = pr;
                var sr = Ks(Oo);
                l[s + 5] = sr;
                var tr = Ms(Oo);
                l[s + 6] = tr;
                var mx = l[s + 7], nx = l[s + 8], xE = cx - (sr * mx + tr * nx), ox = Po + 12 | 0, yE = (x[0] = bx - (tr * mx - sr * nx), t[0]), zE = (x[0] = xE, t[0]) | 0;
                h[(ox | 0) >> 2] = 0 | yE;
                h[(ox + 4 | 0) >> 2] = zE;
                var px = Sg + 1 | 0, qx = h[pa];
                if ((px | 0) >= (qx | 0)) {
                  var rx = qx, ur = jx, sx = qr, tx = rr;
                  break a;
                }
                Sg = px;
                Tw = qr;
                Uw = rr;
              }
            } else {
              rx = dm, ur = oo, sx = xo, tx = yo;
            }
          } while (0);
          var ux = k[OB >> 2];
          r = ux >> 2;
          var vr = h[PB >> 2], AE = (vr | 0) != 0 & (Tq | 0) > 0;
          a : do {
            if (AE) {
              for (var Lk = 0; ; ) {
                var BE = h[Sv + (Lk << 2) >> 2], wr = h[r + (Lk * 38 | 0) + 36];
                h[RB >> 2] = wr;
                var CE = (wr | 0) > 0;
                b : do {
                  if (CE) {
                    for (var Mk = 0; ; ) {
                      l[Bb + (Mk << 2) >> 2] = l[r + (Lk * 38 | 0) + (Mk * 9 | 0) + 4];
                      l[Bb + (Mk << 2) + 8 >> 2] = l[r + (Lk * 38 | 0) + (Mk * 9 | 0) + 5];
                      var vx = Mk + 1 | 0;
                      if ((vx | 0) == (wr | 0)) {
                        break b;
                      }
                      Mk = vx;
                    }
                  }
                } while (0);
                Wl[h[h[vr >> 2] + 20 >> 2]](vr, BE, Bb);
                var wx = Lk + 1 | 0;
                if ((wx | 0) >= (Tq | 0)) {
                  break a;
                }
                Lk = wx;
              }
            }
          } while (0);
          var xx = h[QB >> 2];
          Ts(xx, ux);
          Ts(xx, h[ju >> 2]);
          for (var Qo = 0; ; ) {
            if ((Qo | 0) >= (rx | 0)) {
              break;
            }
            var xr = h[ur + (Qo << 2) >> 2];
            p = xr >> 2;
            b[(xr + 4 | 0) >> 1] &= -2;
            var DE = (h[p] | 0) == 2;
            a : do {
              if (DE) {
                var yx = l[p + 13], yr = Ks(yx);
                l[tB >> 2] = yr;
                var zr = Ms(yx);
                l[uB >> 2] = zr;
                var zx = l[p + 7], Ax = l[p + 8], EE = l[p + 10] - (yr * zx + zr * Ax), FE = (x[0] = l[p + 9] - (zr * zx - yr * Ax), t[0]), GE = (x[0] = EE, t[0]) | 0, vh = ub | 0;
                fb = vh >> 2;
                h[fb] = 0 | FE;
                lg = ub + 4 | 0;
                Aa = lg >> 2;
                h[Aa] = GE;
                var HE = h[p + 22] + 102872 | 0, Bx = h[p + 25], IE = (Bx | 0) == 0;
                b : do {
                  if (!IE) {
                    for (var JE = xr + 12 | 0, Ar = Bx; ; ) {
                      ct(Ar, HE, ub, JE);
                      var Cx = h[Ar + 4 >> 2];
                      if ((Cx | 0) == 0) {
                        break b;
                      }
                      Ar = Cx;
                    }
                  }
                } while (0);
                var Dx = h[p + 28];
                if ((Dx | 0) != 0) {
                  for (var Br = Dx; ; ) {
                    h[(h[Br + 4 >> 2] + 4 | 0) >> 2] &= -34;
                    var Ex = h[Br + 12 >> 2];
                    if ((Ex | 0) == 0) {
                      break a;
                    }
                    Br = Ex;
                  }
                }
              }
            } while (0);
            Qo = Qo + 1 | 0;
          }
          Xs(jc, jc);
          if ((a[vB] & 1) << 24 >> 24 != 0) {
            ou = 0;
            pu = ur;
            qu = xq;
            ru = sx;
            su = tx;
            break;
          }
        } else {
          h[Q] = uq & -37;
          l[ca] = tu;
          l[ga] = uu;
          l[vu >> 2] = wu;
          l[aa] = xu;
          l[X] = yu;
          l[wa] = zu;
          l[W] = Au;
          l[Z] = Bu;
          l[Y] = dq;
          l[Da] = bD;
          l[la] = cD;
          l[Cu >> 2] = dD;
          l[R] = eD;
          l[L] = fD;
          l[U] = gD;
          l[Na] = hD;
          l[M] = iD;
          l[P] = jD;
          var Fx = l[Z], Cr = Ks(Fx);
          l[Ru >> 2] = Cr;
          var Dr = Ms(Fx);
          l[Su >> 2] = Dr;
          var Gx = l[ca], Hx = l[ga], KE = l[wa] - (Cr * Gx + Dr * Hx), LE = (x[0] = l[X] - (Dr * Gx - Cr * Hx), t[0]), ME = (x[0] = KE, t[0]) | 0, ml = ko | 0;
          h[ml >> 2] = 0 | LE;
          dk = ko + 4 | 0;
          h[dk >> 2] = ME;
          var Ix = l[M], Er = Ks(Ix);
          l[av >> 2] = Er;
          var Fr = Ms(Ix);
          l[bv >> 2] = Fr;
          var Jx = l[Da], Kx = l[la], NE = l[U] - (Er * Jx + Fr * Kx), OE = (x[0] = l[L] - (Fr * Jx - Er * Kx), t[0]), PE = (x[0] = NE, t[0]) | 0;
          h[(no | 0) >> 2] = 0 | OE;
          h[(no + 4 | 0) >> 2] = PE;
        }
        xe = 0;
        $d = 1;
        cq = Ub;
      } else {
        q = (Xl + 4 | 0) >> 2;
        var Lx = h[q], QE = (Lx & 4 | 0) == 0;
        do {
          if (QE) {
            var Fi = xe, Gi = $d;
          } else {
            if ((h[La + 32] | 0) > 8) {
              Fi = xe, Gi = $d;
            } else {
              if ((Lx & 32 | 0) == 0) {
                var Gr = h[La + 12], Hr = h[La + 13];
                if ((a[Gr + 38 | 0] & 1) << 24 >> 24 != 0) {
                  Fi = xe;
                  Gi = $d;
                  break;
                }
                if ((a[Hr + 38 | 0] & 1) << 24 >> 24 != 0) {
                  Fi = xe;
                  Gi = $d;
                  break;
                }
                var Tg = h[Gr + 8 >> 2], Ug = h[Hr + 8 >> 2], Ir = h[Tg >> 2], Jr = h[Ug >> 2];
                (Ir | 0) == 2 | (Jr | 0) == 2 || G(y.r | 0, 641, y.ka | 0, y.xc | 0);
                var Mx = b[Tg + 4 >> 1], Nx = b[Ug + 4 >> 1];
                if (!((Mx & 2) << 16 >> 16 != 0 & (Ir | 0) != 0 | (Nx & 2) << 16 >> 16 != 0 & (Jr | 0) != 0)) {
                  Fi = xe;
                  Gi = $d;
                  break;
                }
                if (!((Mx & 8) << 16 >> 16 != 0 | (Ir | 0) != 2 | (Nx & 8) << 16 >> 16 != 0 | (Jr | 0) != 2)) {
                  Fi = xe;
                  Gi = $d;
                  break;
                }
                var RE = Tg + 28 | 0;
                o = (Tg + 60 | 0) >> 2;
                var Dj = l[o], SE = Ug + 28 | 0;
                n = (Ug + 60 | 0) >> 2;
                var Nk = l[n];
                if (Dj < Nk) {
                  if (Dj < 1) {
                    var Kr = Dj;
                  } else {
                    G(y.B | 0, 715, y.w | 0, y.t | 0), Kr = l[o];
                  }
                  var Ro = (Nk - Kr) / (1 - Kr), Ox = Tg + 36 | 0, Lr = 1 - Ro, TE = l[Tg + 40 >> 2] * Lr + l[Tg + 48 >> 2] * Ro, Px = Ox, UE = (x[0] = l[Ox >> 2] * Lr + l[Tg + 44 >> 2] * Ro, t[0]), VE = (x[0] = TE, t[0]), WE = 0 | UE, XE = VE | 0, $c = Px | 0;
                  Ca = $c >> 2;
                  h[Ca] = WE;
                  sd = Px + 4 | 0;
                  Wa = sd >> 2;
                  h[Wa] = XE;
                  var Qx = Tg + 52 | 0;
                  l[Qx >> 2] = Lr * l[Qx >> 2] + Ro * l[Tg + 56 >> 2];
                  var So = l[o] = Nk;
                } else {
                  if (Nk < Dj) {
                    if (Nk < 1) {
                      var Mr = Nk;
                    } else {
                      G(y.B | 0, 715, y.w | 0, y.t | 0), Mr = l[n];
                    }
                    var To = (Dj - Mr) / (1 - Mr), Rx = Ug + 36 | 0, Nr = 1 - To, YE = l[Ug + 40 >> 2] * Nr + l[Ug + 48 >> 2] * To, Sx = Rx, ZE = (x[0] = l[Rx >> 2] * Nr + l[Ug + 44 >> 2] * To, t[0]), $E = (x[0] = YE, t[0]), aF = 0 | ZE, bF = $E | 0, $c = Sx | 0;
                    Ca = $c >> 2;
                    h[Ca] = aF;
                    sd = Sx + 4 | 0;
                    Wa = sd >> 2;
                    h[Wa] = bF;
                    var Tx = Ug + 52 | 0;
                    l[Tx >> 2] = Nr * l[Tx >> 2] + To * l[Ug + 56 >> 2];
                    l[n] = Dj;
                  }
                  So = Dj;
                }
                So < 1 || G(y.r | 0, 676, y.ka | 0, y.t | 0);
                var cF = h[La + 14], dF = h[La + 15];
                h[Zt >> 2] = 0;
                h[$t >> 2] = 0;
                l[au >> 2] = 0;
                h[Oa] = 0;
                h[$] = 0;
                l[bu >> 2] = 0;
                Rp(cu, h[Gr + 12 >> 2], cF);
                Rp(aq, h[Hr + 12 >> 2], dF);
                for (var Ch = RE >> 2, gm = du >> 2, Or = Ch + 9; Ch < Or; Ch++, gm++) {
                  h[gm] = h[Ch];
                }
                Ch = SE >> 2;
                gm = eu >> 2;
                for (Or = Ch + 9; Ch < Or; Ch++, gm++) {
                  h[gm] = h[Ch];
                }
                l[fu >> 2] = 1;
                h[kt >> 2] = h[kt >> 2] + 1 | 0;
                var Qr = l[SB >> 2], Rr = l[TB >> 2], Ux = l[UB >> 2], Vx = l[VB >> 2], Wx = l[WB >> 2], Xx = l[XB >> 2], Yx = l[YB >> 2], eF = l[ZB >> 2], fF = l[$B >> 2], Sr = l[aC >> 2], Tr = l[bC >> 2], Zx = l[cC >> 2], $x = l[dC >> 2], ay = l[eC >> 2], by = l[fC >> 2], cy = l[gC >> 2], gF = l[hC >> 2], hF = l[iC >> 2], ey = lt(Yx / 6.2831854820251465) * 6.2831854820251465, fy = Yx - ey, gy = eF - ey, hy = lt(cy / 6.2831854820251465) * 6.2831854820251465, iy = cy - hy, jy = gF - hy, hm = l[fu >> 2], ky = l[au >> 2] + l[bu >> 2] - .014999999664723873, Ok = ky < .004999999888241291 ? .004999999888241291 : ky;
                Ok > .0012499999720603228 || G(y.K | 0, 280, y.gb | 0, y.Pb | 0);
                b[lu >> 1] = 0;
                h[bb] = h[ja];
                h[bb + 1] = h[ja + 1];
                h[bb + 2] = h[ja + 2];
                h[bb + 3] = h[ja + 3];
                h[bb + 4] = h[ja + 4];
                h[bb + 5] = h[ja + 5];
                h[bb + 6] = h[ja + 6];
                h[ab] = h[Ha];
                h[ab + 1] = h[Ha + 1];
                h[ab + 2] = h[Ha + 2];
                h[ab + 3] = h[Ha + 3];
                h[ab + 4] = h[Ha + 4];
                h[ab + 5] = h[Ha + 5];
                h[ab + 6] = h[Ha + 6];
                a[jC] = 0;
                var Ur = Ok + .0012499999720603228, ly = Ok - .0012499999720603228, We = 0, im = 0;
                a : for (;;) {
                  var Pk = 1 - We, iF = Ux * Pk + Wx * We, jF = Vx * Pk + Xx * We, my = Pk * fy + gy * We, mg = Ks(my), ng = Ms(my), Uo = iF - (ng * Qr - mg * Rr), Vo = jF - (mg * Qr + ng * Rr), kF = Zx * Pk + ay * We, lF = $x * Pk + by * We, ny = Pk * iy + jy * We, og = Ks(ny), pg = Ms(ny), Wo = kF - (pg * Sr - og * Tr), Xo = lF - (og * Sr + pg * Tr);
                  l[kC >> 2] = Uo;
                  l[lC >> 2] = Vo;
                  l[mC >> 2] = mg;
                  l[nC >> 2] = ng;
                  l[oC >> 2] = Wo;
                  l[pC >> 2] = Xo;
                  l[qC >> 2] = og;
                  l[rC >> 2] = pg;
                  Sp(Jb, ec, Ka);
                  var oy = l[sC >> 2];
                  if (oy <= 0) {
                    var jm = im, Yo = 0, Zo = 2;
                    break;
                  }
                  if (oy < Ur) {
                    jm = im;
                    Yo = We;
                    Zo = 3;
                    break;
                  }
                  h[ya] = cu;
                  h[da] = aq;
                  var Vr = k[lu >> 2], Wr = Vr & 65535, $o = Vr >>> 16, mF = $o & 255, Xr = Vr >>> 24, nF = Xr & 255;
                  Wr << 16 >> 16 != 0 & (Wr & 65535) < 3 || G(y.K | 0, 50, y.ob | 0, y.sc | 0);
                  l[tC >> 2] = Qr;
                  l[uC >> 2] = Rr;
                  l[vC >> 2] = Ux;
                  l[wC >> 2] = Vx;
                  l[xC >> 2] = Wx;
                  l[yC >> 2] = Xx;
                  l[zC >> 2] = fy;
                  l[AC >> 2] = gy;
                  l[BC >> 2] = fF;
                  l[CC >> 2] = Sr;
                  l[DC >> 2] = Tr;
                  l[EC >> 2] = Zx;
                  l[FC >> 2] = $x;
                  l[GC >> 2] = ay;
                  l[HC >> 2] = by;
                  l[IC >> 2] = iy;
                  l[JC >> 2] = jy;
                  l[KC >> 2] = hF;
                  var oF = Wr << 16 >> 16 == 1;
                  do {
                    if (oF) {
                      h[ua] = 0;
                      var py = h[ya], qy = $o & 255;
                      (h[py + 20 >> 2] | 0) > (qy | 0) || G(y.b | 0, 103, y.a | 0, y.c | 0);
                      var ry = (qy << 3) + h[py + 16 >> 2] | 0, le = ry | 0;
                      m = le >> 2;
                      var me = ry + 4 | 0;
                      j = me >> 2;
                      var pF = h[j], sy = (t[0] = h[m], x[0]), ty = (t[0] = pF, x[0]), uy = h[da], vy = Dh[bq] & 255;
                      (h[uy + 20 >> 2] | 0) > (vy | 0) || G(y.b | 0, 103, y.a | 0, y.c | 0);
                      var wy = (vy << 3) + h[uy + 16 >> 2] | 0, le = wy | 0;
                      m = le >> 2;
                      me = wy + 4 | 0;
                      j = me >> 2;
                      var qF = h[j], xy = (t[0] = h[m], x[0]), yy = (t[0] = qF, x[0]), ap = pg * xy - og * yy + Wo - (ng * sy - mg * ty + Uo), bp = og * xy + pg * yy + Xo - (mg * sy + ng * ty + Vo), rF = (x[0] = ap, t[0]), sF = (x[0] = bp, t[0]) | 0;
                      h[xa] = 0 | rF;
                      h[xa + 1] = sF;
                      var zy = Nm(ap * ap + bp * bp);
                      if (zy < 1.1920928955078125e-7) {
                        var Qk = 1, Xe = hm;
                        break;
                      }
                      var Ay = 1 / zy;
                      l[Va] = ap * Ay;
                      l[ma] = bp * Ay;
                    } else {
                      if (mF << 24 >> 24 == nF << 24 >> 24) {
                        h[ua] = 2;
                        var By = Dh[bq] & 255, Cy = h[$];
                        if ((Cy | 0) > (By | 0)) {
                          var Dy = Cy;
                        } else {
                          G(y.b | 0, 103, y.a | 0, y.c | 0), Dy = h[$];
                        }
                        var Ey = k[Oa], Fy = (By << 3) + Ey | 0, le = Fy | 0;
                        m = le >> 2;
                        me = Fy + 4 | 0;
                        j = me >> 2;
                        var tF = h[j], Gy = (t[0] = h[m], x[0]), Hy = (t[0] = tF, x[0]), Iy = Dh[ZC] & 255;
                        if ((Dy | 0) > (Iy | 0)) {
                          var Jy = Ey;
                        } else {
                          G(y.b | 0, 103, y.a | 0, y.c | 0), Jy = h[Oa];
                        }
                        var Ky = (Iy << 3) + Jy | 0, Yr = Ky | 0, Zr = Ky + 4 | 0, uF = h[Zr >> 2], Ly = (t[0] = h[Yr >> 2], x[0]), My = (t[0] = uF, x[0]), km = My - Hy, lm = (Ly - Gy) * -1, vF = (x[0] = km, t[0]), wF = (x[0] = lm, t[0]), xF = 0 | vF, yF = wF | 0, qq = Di | 0;
                        h[qq >> 2] = xF;
                        rq = Di + 4 | 0;
                        h[rq >> 2] = yF;
                        var Ny = Nm(km * km + lm * lm);
                        if (Ny < 1.1920928955078125e-7) {
                          var $r = km, as = lm;
                        } else {
                          var Oy = 1 / Ny, Py = km * Oy;
                          l[Va] = Py;
                          var Qy = lm * Oy;
                          l[ma] = Qy;
                          $r = Py;
                          as = Qy;
                        }
                        var zF = pg * $r - og * as, AF = og * $r + pg * as, bs = (Gy + Ly) * .5, cs = (Hy + My) * .5, BF = (x[0] = bs, t[0]), CF = (x[0] = cs, t[0]) | 0, ds = ho | 0;
                        h[ds >> 2] = 0 | BF;
                        var es = ho + 4 | 0;
                        h[es >> 2] = CF;
                        var DF = pg * bs - og * cs + Wo, EF = og * bs + pg * cs + Xo, Ry = $o & 255;
                        (h[$t >> 2] | 0) > (Ry | 0) || G(y.b | 0, 103, y.a | 0, y.c | 0);
                        var Sy = (Ry << 3) + h[Zt >> 2] | 0, Yr = Sy | 0, Zr = Sy + 4 | 0, FF = h[Zr >> 2], Ty = (t[0] = h[Yr >> 2], x[0]), Uy = (t[0] = FF, x[0]);
                        if ((ng * Ty - mg * Uy + Uo - DF) * zF + (mg * Ty + ng * Uy + Vo - EF) * AF >= 0) {
                          Qk = 1;
                          Xe = hm;
                          break;
                        }
                        var GF = -l[ma], HF = (x[0] = -l[Va], t[0]), IF = (x[0] = GF, t[0]) | 0, Cf = Di | 0;
                        Xa = Cf >> 2;
                        h[Xa] = 0 | HF;
                        He = Di + 4 | 0;
                        Ba = He >> 2;
                        h[Ba] = IF;
                      } else {
                        h[ua] = 1;
                        var fs = h[ya], Vy = $o & 255, Wy = h[fs + 20 >> 2];
                        if ((Wy | 0) > (Vy | 0)) {
                          var Xy = fs, Yy = Wy;
                        } else {
                          G(y.b | 0, 103, y.a | 0, y.c | 0);
                          var Zy = h[ya], Xy = Zy, Yy = h[Zy + 20 >> 2];
                        }
                        var $y = (Vy << 3) + h[fs + 16 >> 2] | 0, ir = $y | 0, jr = $y + 4 | 0, JF = h[jr >> 2], az = (t[0] = h[ir >> 2], x[0]), bz = (t[0] = JF, x[0]);
                        (Yy | 0) > (Xr | 0) || G(y.b | 0, 103, y.a | 0, y.c | 0);
                        var cz = (Xr << 3) + h[Xy + 16 >> 2] | 0, le = cz | 0;
                        m = le >> 2;
                        me = cz + 4 | 0;
                        j = me >> 2;
                        var KF = h[j], dz = (t[0] = h[m], x[0]), ez = (t[0] = KF, x[0]), mm = ez - bz, nm = (dz - az) * -1, LF = (x[0] = mm, t[0]), MF = (x[0] = nm, t[0]) | 0;
                        h[xa] = 0 | LF;
                        h[xa + 1] = MF;
                        var fz = Nm(mm * mm + nm * nm);
                        if (fz < 1.1920928955078125e-7) {
                          var gs = mm, hs = nm;
                        } else {
                          var gz = 1 / fz, hz = mm * gz;
                          l[Va] = hz;
                          var iz = nm * gz;
                          l[ma] = iz;
                          gs = hz;
                          hs = iz;
                        }
                        var NF = ng * gs - mg * hs, OF = mg * gs + ng * hs, is = (az + dz) * .5, js = (bz + ez) * .5, PF = (x[0] = is, t[0]), QF = (x[0] = js, t[0]), RF = 0 | PF, SF = QF | 0, ds = ho | 0;
                        h[ds >> 2] = RF;
                        es = ho + 4 | 0;
                        h[es >> 2] = SF;
                        var TF = ng * is - mg * js + Uo, UF = mg * is + ng * js + Vo, jz = h[da], kz = Dh[bq] & 255;
                        (h[jz + 20 >> 2] | 0) > (kz | 0) || G(y.b | 0, 103, y.a | 0, y.c | 0);
                        var lz = (kz << 3) + h[jz + 16 >> 2] | 0, le = lz | 0;
                        m = le >> 2;
                        me = lz + 4 | 0;
                        j = me >> 2;
                        var VF = h[j], mz = (t[0] = h[m], x[0]), nz = (t[0] = VF, x[0]);
                        if ((pg * mz - og * nz + Wo - TF) * NF + (og * mz + pg * nz + Xo - UF) * OF >= 0) {
                          Qk = 1;
                          Xe = hm;
                          break;
                        }
                        var WF = -l[ma], XF = (x[0] = -l[Va], t[0]), YF = (x[0] = WF, t[0]) | 0, Cf = Di | 0;
                        Xa = Cf >> 2;
                        h[Xa] = 0 | XF;
                        He = Di + 4 | 0;
                        Ba = He >> 2;
                        h[Ba] = YF;
                      }
                    }
                    Qk = 1;
                    Xe = hm;
                  } while (0);
                  b : for (;;) {
                    var Rk = 1 - Xe, ZF = l[LC >> 2] * Rk + l[NC >> 2] * Xe, $F = l[MC >> 2] * Rk + l[OC >> 2] * Xe, oz = Rk * l[PC >> 2] + l[QC >> 2] * Xe, Ye = Ks(oz), Ze = Ms(oz), pz = l[$C >> 2], qz = l[RC >> 2], ks = ZF - (Ze * pz - Ye * qz), ls = $F - (Ye * pz + Ze * qz), aG = l[SC >> 2] * Rk + l[UC >> 2] * Xe, bG = l[TC >> 2] * Rk + l[VC >> 2] * Xe, rz = Rk * l[WC >> 2] + l[XC >> 2] * Xe, $e = Ks(rz), af = Ms(rz), sz = l[aD >> 2], tz = l[YC >> 2], ms = aG - (af * sz - $e * tz), ns = bG - ($e * sz + af * tz), os = h[ua];
                    if (os == 0) {
                      var cp = l[Ua], ps = l[ma], uz = Ze * cp + Ye * ps, vz = cp * -Ye + Ze * ps, wz = -ps, xz = af * -cp + $e * wz, yz = cp * $e + af * wz, zz = h[ya], Az = zz + 16 | 0, Bz = h[Az >> 2];
                      i = Bz >> 2;
                      var qs = h[zz + 20 >> 2], cG = (qs | 0) > 1;
                      c : do {
                        if (cG) {
                          for (var Cz = 0, rs = l[i] * uz + l[i + 1] * vz, om = 1; ; ) {
                            var Dz = l[(om << 3 >> 2) + i] * uz + l[((om << 3) + 4 >> 2) + i] * vz, Ez = Dz > rs, Fz = Ez ? om : Cz, dG = Ez ? Dz : rs, Gz = om + 1 | 0;
                            if ((Gz | 0) == (qs | 0)) {
                              var pm = Fz;
                              break c;
                            }
                            Cz = Fz;
                            rs = dG;
                            om = Gz;
                          }
                        } else {
                          pm = 0;
                        }
                      } while (0);
                      var ss = h[da];
                      g = h[ss + 16 >> 2] >> 2;
                      var Hz = h[ss + 20 >> 2], eG = (Hz | 0) > 1;
                      c : do {
                        if (eG) {
                          for (var Iz = 0, ts = l[g] * xz + l[g + 1] * yz, qm = 1; ; ) {
                            var Jz = l[(qm << 3 >> 2) + g] * xz + l[((qm << 3) + 4 >> 2) + g] * yz, Kz = Jz > ts, Lz = Kz ? qm : Iz, fG = Kz ? Jz : ts, Mz = qm + 1 | 0;
                            if ((Mz | 0) == (Hz | 0)) {
                              var rm = Lz;
                              break c;
                            }
                            Iz = Lz;
                            ts = fG;
                            qm = Mz;
                          }
                        } else {
                          rm = 0;
                        }
                      } while (0);
                      if ((pm | 0) > -1 & (qs | 0) > (pm | 0)) {
                        var Nz = Bz, us = ss;
                      } else {
                        G(y.b | 0, 103, y.a | 0, y.c | 0), Nz = h[Az >> 2], us = h[da];
                      }
                      var Oz = (pm << 3) + Nz | 0, le = Oz | 0;
                      m = le >> 2;
                      me = Oz + 4 | 0;
                      j = me >> 2;
                      var gG = h[j], Pz = (t[0] = h[m], x[0]), Qz = (t[0] = gG, x[0]);
                      ia = (rm | 0) > -1 ? (h[us + 20 >> 2] | 0) > (rm | 0) ? 305 : 304 : 304;
                      ia == 304 && G(y.b | 0, 103, y.a | 0, y.c | 0);
                      var Rz = (rm << 3) + h[us + 16 >> 2] | 0, le = Rz | 0;
                      m = le >> 2;
                      me = Rz + 4 | 0;
                      j = me >> 2;
                      var hG = h[j], Sz = (t[0] = h[m], x[0]), Tz = (t[0] = hG, x[0]), Sk = (af * Sz - $e * Tz + ms - (Ze * Pz - Ye * Qz + ks)) * l[Ua] + ($e * Sz + af * Tz + ns - (Ye * Pz + Ze * Qz + ls)) * l[ma], sm = pm, dp = rm;
                    } else {
                      if (os == 1) {
                        var Uz = l[Ua], Vz = l[ma], vs = Ze * Uz - Ye * Vz, Wz = Ye * Uz + Ze * Vz, Xz = l[mu >> 2], Yz = l[nu >> 2], iG = Ze * Xz - Ye * Yz + ks, jG = Ye * Xz + Ze * Yz + ls, Zz = -Wz, $z = af * -vs + $e * Zz, aA = vs * $e + af * Zz, bA = h[da], cA = bA + 16 | 0, dA = h[cA >> 2];
                        f = dA >> 2;
                        var ws = h[bA + 20 >> 2], kG = (ws | 0) > 1;
                        do {
                          if (kG) {
                            for (var eA = 0, xs = l[f] * $z + l[f + 1] * aA, tm = 1; ; ) {
                              var fA = l[(tm << 3 >> 2) + f] * $z + l[((tm << 3) + 4 >> 2) + f] * aA, gA = fA > xs, ep = gA ? tm : eA, lG = gA ? fA : xs, hA = tm + 1 | 0;
                              if ((hA | 0) == (ws | 0)) {
                                break;
                              }
                              eA = ep;
                              xs = lG;
                              tm = hA;
                            }
                            if ((ep | 0) > -1) {
                              var fp = ep;
                              ia = 310;
                            } else {
                              var iA = ep;
                              ia = 311;
                            }
                          } else {
                            fp = 0, ia = 310;
                          }
                        } while (0);
                        if (ia == 310) {
                          if ((ws | 0) > (fp | 0)) {
                            var ys = fp, jA = dA;
                            ia = 313;
                          } else {
                            iA = fp, ia = 311;
                          }
                        }
                        ia == 311 && (G(y.b | 0, 103, y.a | 0, y.c | 0), ys = iA, jA = h[cA >> 2]);
                        var kA = (ys << 3) + jA | 0, le = kA | 0;
                        m = le >> 2;
                        me = kA + 4 | 0;
                        j = me >> 2;
                        var mG = h[j], lA = (t[0] = h[m], x[0]), mA = (t[0] = mG, x[0]), Sk = (af * lA - $e * mA + ms - iG) * vs + ($e * lA + af * mA + ns - jG) * Wz, sm = -1, dp = ys;
                      } else {
                        if (os == 2) {
                          var nA = l[Ua], oA = l[ma], zs = af * nA - $e * oA, pA = $e * nA + af * oA, qA = l[mu >> 2], rA = l[nu >> 2], nG = af * qA - $e * rA + ms, oG = $e * qA + af * rA + ns, sA = -pA, tA = Ze * -zs + Ye * sA, uA = zs * Ye + Ze * sA, vA = h[ya], wA = vA + 16 | 0, xA = h[wA >> 2];
                          e = xA >> 2;
                          var As = h[vA + 20 >> 2], pG = (As | 0) > 1;
                          do {
                            if (pG) {
                              for (var yA = 0, Bs = l[e] * tA + l[e + 1] * uA, um = 1; ; ) {
                                var zA = l[(um << 3 >> 2) + e] * tA + l[((um << 3) + 4 >> 2) + e] * uA, AA = zA > Bs, gp = AA ? um : yA, qG = AA ? zA : Bs, BA = um + 1 | 0;
                                if ((BA | 0) == (As | 0)) {
                                  break;
                                }
                                yA = gp;
                                Bs = qG;
                                um = BA;
                              }
                              if ((gp | 0) > -1) {
                                var hp = gp;
                                ia = 318;
                              } else {
                                var CA = gp;
                                ia = 319;
                              }
                            } else {
                              hp = 0, ia = 318;
                            }
                          } while (0);
                          if (ia == 318) {
                            if ((As | 0) > (hp | 0)) {
                              var Cs = hp, DA = xA;
                              ia = 321;
                            } else {
                              CA = hp, ia = 319;
                            }
                          }
                          ia == 319 && (G(y.b | 0, 103, y.a | 0, y.c | 0), Cs = CA, DA = h[wA >> 2]);
                          var EA = (Cs << 3) + DA | 0, le = EA | 0;
                          m = le >> 2;
                          me = EA + 4 | 0;
                          j = me >> 2;
                          var rG = h[j], FA = (t[0] = h[m], x[0]), GA = (t[0] = rG, x[0]), Sk = (Ze * FA - Ye * GA + ks - nG) * zs + (Ye * FA + Ze * GA + ls - oG) * pA, sm = Cs;
                        } else {
                          G(y.K | 0, 183, y.xb | 0, y.f | 0), Sk = 0, sm = -1;
                        }
                        dp = -1;
                      }
                    }
                    var sG = Sk > Ur;
                    c : do {
                      if (sG) {
                        var Ds = hm, Es = 4;
                      } else {
                        var tG = Sk > ly;
                        do {
                          if (!tG) {
                            var Fs = Js(S, sm, dp, We);
                            if (Fs < ly) {
                              Ds = We;
                              Es = 1;
                              break c;
                            }
                            if (Fs <= Ur) {
                              Ds = We;
                              Es = 3;
                              break c;
                            }
                            for (var ip = Xe, vm = We, jp = 0, kp = Fs, Gs = Sk; ; ) {
                              var lp = (jp & 1 | 0) == 0 ? (vm + ip) * .5 : vm + (Ok - kp) * (ip - vm) / (Gs - kp), mp = Js(S, sm, dp, lp), Hs = mp - Ok;
                              if ((Hs > 0 ? Hs : -Hs) < .0012499999720603228) {
                                var Is = jp, HA = lp;
                                break;
                              }
                              var np = mp > Ok, uG = np ? Gs : mp, vG = np ? mp : kp, wG = np ? lp : vm, xG = np ? ip : lp, IA = jp + 1 | 0;
                              h[mt >> 2] = h[mt >> 2] + 1 | 0;
                              if ((IA | 0) == 50) {
                                Is = 50;
                                HA = Xe;
                                break;
                              }
                              ip = xG;
                              vm = wG;
                              jp = IA;
                              kp = vG;
                              Gs = uG;
                            }
                            var JA = h[nt >> 2];
                            h[nt >> 2] = (JA | 0) > (Is | 0) ? JA : Is;
                            if ((Qk | 0) == 8) {
                              var Ls = We;
                              break;
                            }
                            Qk = Qk + 1 | 0;
                            Xe = HA;
                            continue b;
                          }
                          Ls = Xe;
                        } while (0);
                        var KA = im + 1 | 0;
                        h[ot >> 2] = h[ot >> 2] + 1 | 0;
                        if ((KA | 0) == 20) {
                          jm = 20;
                          Yo = Ls;
                          Zo = 1;
                          break a;
                        }
                        We = Ls;
                        im = KA;
                        continue a;
                      }
                    } while (0);
                    h[ot >> 2] = h[ot >> 2] + 1 | 0;
                    jm = im + 1 | 0;
                    Yo = Ds;
                    Zo = Es;
                    break a;
                  }
                }
                var LA = h[pt >> 2];
                h[pt >> 2] = (LA | 0) > (jm | 0) ? LA : jm;
                if ((Zo | 0) == 3) {
                  var MA = So + (1 - So) * Yo, Ns = MA < 1 ? MA : 1;
                } else {
                  Ns = 1;
                }
                l[La + 33] = Ns;
                h[q] |= 32;
                var Os = Ns;
              } else {
                Os = l[La + 33];
              }
              Os < $d ? (Fi = Xl, Gi = Os) : (Fi = xe, Gi = $d);
            }
          }
        } while (0);
        xe = Fi;
        $d = Gi;
        cq = Xl + 12 | 0;
      }
    }
    a[id] = ou;
    var xm = h[iu >> 2];
    Ts(xm, ru);
    Ts(xm, su);
    Ts(xm, h[Kb + 16 >> 2]);
    Ts(xm, qu);
    Ts(xm, pu);
    et(Wc);
    l[tb + 25756] = (((h[Wc >> 2] - lB) * 1e3 | 0) >>> 0) + (h[Wc + 4 >> 2] | 0) * .0010000000474974513 - (mB >>> 0);
  }
  l[tc >> 2] = 59.999996185302734;
  var Ps = k[wb], yG = (Ps & 4 | 0) == 0;
  do {
    if (yG) {
      var Qs = Ps;
    } else {
      var NA = h[tb + 25738];
      if ((NA | 0) == 0) {
        Qs = Ps;
      } else {
        var Rs = NA;
        for (d = Rs >> 2; ; ) {
          l[d + 19] = 0;
          l[d + 20] = 0;
          l[d + 21] = 0;
          var OA = h[d + 24];
          if ((OA | 0) == 0) {
            break;
          }
          Rs = OA;
          d = Rs >> 2;
        }
        Qs = h[wb];
      }
    }
  } while (0);
  h[wb] = Qs & -3;
  et(od);
  l[tb + 25749] = (((h[od >> 2] - Kc) * 1e3 | 0) >>> 0) + (h[od + 4 >> 2] | 0) * .0010000000474974513 - (Bc >>> 0);
  qg = V;
}

function ft(c, d) {
  var e, f, g, i, j, m = c >> 2, n = qg;
  qg += 192;
  j = n >> 2;
  var o = n + 92, q = n + 104, p = n + 128;
  i = p >> 2;
  var r = c + 64 | 0, s = r >> 2;
  g = p >> 2;
  for (var u = s + 16; s < u; s++, g++) {
    h[g] = h[s];
  }
  g = (c + 4 | 0) >> 2;
  s = k[g];
  h[g] = s | 4;
  var u = s >>> 1, z = k[m + 12], E = k[m + 13], s = ((a[E + 38 | 0] | a[z + 38 | 0]) & 1) << 24 >> 24 != 0, A = k[z + 8 >> 2], I = k[E + 8 >> 2], C = A + 12 | 0, K = I + 12 | 0;
  do {
    if (s) {
      e = h[z + 12 >> 2];
      f = h[E + 12 >> 2];
      var J = h[m + 14], N = h[m + 15];
      h[j + 4] = 0;
      h[j + 5] = 0;
      l[j + 6] = 0;
      h[j + 11] = 0;
      h[j + 12] = 0;
      l[j + 13] = 0;
      Rp(n | 0, e, J);
      Rp(n + 28 | 0, f, N);
      f = (n + 56 | 0) >> 2;
      e = C >> 2;
      h[f] = h[e];
      h[f + 1] = h[e + 1];
      h[f + 2] = h[e + 2];
      h[f + 3] = h[e + 3];
      f = (n + 72 | 0) >> 2;
      e = K >> 2;
      h[f] = h[e];
      h[f + 1] = h[e + 1];
      h[f + 2] = h[e + 2];
      h[f + 3] = h[e + 3];
      a[n + 88 | 0] = 1;
      b[o + 4 >> 1] = 0;
      Sp(q, o, n);
      e = l[q + 16 >> 2] < 11920928955078125e-22 & 1;
      h[m + 31] = 0;
      f = e;
      e = u & 1;
    } else {
      Wl[h[h[m] >> 2]](c, r, C, K);
      J = c + 124 | 0;
      f = (h[J >> 2] | 0) > 0;
      e = f & 1;
      a : do {
        if (f) {
          for (var N = h[i + 15], B = 0; ; ) {
            var F = c + B * 20 + 72 | 0;
            l[F >> 2] = 0;
            var H = c + B * 20 + 76 | 0;
            l[H >> 2] = 0;
            for (var O = h[m + (B * 5 | 0) + 20], D = 0; ; ) {
              if ((D | 0) >= (N | 0)) {
                break;
              }
              if ((h[i + (D * 5 | 0) + 4] | 0) == (O | 0)) {
                l[F >> 2] = l[i + (D * 5 | 0) + 2];
                l[H >> 2] = l[i + (D * 5 | 0) + 3];
                break;
              }
              D = D + 1 | 0;
            }
            B = B + 1 | 0;
            if ((B | 0) >= (h[J >> 2] | 0)) {
              break a;
            }
          }
        }
      } while (0);
      J = u & 1;
      (f & 1 | 0) != (J | 0) && (f = A + 4 | 0, N = b[f >> 1], (N & 2) << 16 >> 16 == 0 && (b[f >> 1] = N | 2, l[A + 144 >> 2] = 0), f = I + 4 | 0, N = b[f >> 1], (N & 2) << 16 >> 16 == 0 && (b[f >> 1] = N | 2, l[I + 144 >> 2] = 0));
      f = e;
      e = J;
    }
  } while (0);
  i = f << 24 >> 24 != 0;
  j = h[g];
  h[g] = i ? j | 2 : j & -3;
  j = i ^ 1;
  m = (d | 0) == 0;
  if (!((e | 0) != 0 | j | m)) {
    Wl[h[h[d >> 2] + 8 >> 2]](d, c);
  }
  if (!(i | (e | 0) == 0 | m)) {
    Wl[h[h[d >> 2] + 12 >> 2]](d, c);
  }
  if (!(s | j | m)) {
    Wl[h[h[d >> 2] + 16 >> 2]](d, c, p);
  }
  qg = n;
}

function gt(c, d) {
  var e, f, g, i, j, m, n, o, q = d >> 2;
  n = c >> 2;
  o = d >> 2;
  h[n] = h[o];
  h[n + 1] = h[o + 1];
  h[n + 2] = h[o + 2];
  h[n + 3] = h[o + 3];
  h[n + 4] = h[o + 4];
  h[n + 5] = h[o + 5];
  var p = h[q + 10];
  m = c + 32 | 0;
  h[m >> 2] = p;
  n = h[q + 7];
  o = (c + 48 | 0) >> 2;
  h[o] = n;
  var r = n * 88 | 0;
  n = (p + 102796 | 0) >> 2;
  var s = h[n];
  if ((s | 0) < 32) {
    var u = s;
  } else {
    G(y.j | 0, 38, y.n | 0, y.p | 0), u = h[n];
  }
  s = p + u * 12 + 102412 | 0;
  h[(p + u * 12 + 102416 | 0) >> 2] = r;
  j = (p + 102400 | 0) >> 2;
  i = h[j];
  (i + r | 0) > 102400 ? (j = Wk(r), h[(s | 0) >> 2] = j, a[p + u * 12 + 102420 | 0] = 1) : (h[(s | 0) >> 2] = p + i | 0, a[p + u * 12 + 102420 | 0] = 0, h[j] = h[j] + r | 0);
  u = p + 102404 | 0;
  r = h[u >> 2] + r | 0;
  h[u >> 2] = r;
  p = p + 102408 | 0;
  u = h[p >> 2];
  h[p >> 2] = (u | 0) > (r | 0) ? u : r;
  h[n] = h[n] + 1 | 0;
  n = c + 36 | 0;
  h[n >> 2] = h[s >> 2];
  p = h[m >> 2];
  r = h[o] * 152 | 0;
  m = (p + 102796 | 0) >> 2;
  s = h[m];
  (s | 0) < 32 ? u = s : (G(y.j | 0, 38, y.n | 0, y.p | 0), u = h[m]);
  s = p + u * 12 + 102412 | 0;
  h[(p + u * 12 + 102416 | 0) >> 2] = r;
  j = (p + 102400 | 0) >> 2;
  i = h[j];
  (i + r | 0) > 102400 ? (j = Wk(r), h[(s | 0) >> 2] = j, a[p + u * 12 + 102420 | 0] = 1) : (h[(s | 0) >> 2] = p + i | 0, a[p + u * 12 + 102420 | 0] = 0, h[j] = h[j] + r | 0);
  u = p + 102404 | 0;
  r = h[u >> 2] + r | 0;
  h[u >> 2] = r;
  p = p + 102408 | 0;
  u = h[p >> 2];
  h[p >> 2] = (u | 0) > (r | 0) ? u : r;
  h[m] = h[m] + 1 | 0;
  m = c + 40 | 0;
  h[m >> 2] = h[s >> 2];
  h[c + 24 >> 2] = h[q + 8];
  h[c + 28 >> 2] = h[q + 9];
  q = h[q + 6];
  s = c + 44 | 0;
  h[s >> 2] = q;
  p = (h[o] | 0) > 0;
  a : do {
    if (p) {
      r = c + 20 | 0;
      u = c + 8 | 0;
      j = 0;
      for (i = q; ; ) {
        var z = h[i + (j << 2) >> 2];
        i = z >> 2;
        var E = h[i + 12];
        g = h[i + 13];
        var A = l[h[E + 12 >> 2] + 8 >> 2], I = l[h[g + 12 >> 2] + 8 >> 2], C = h[E + 8 >> 2], K = h[g + 8 >> 2], E = h[i + 31], J = (E | 0) > 0;
        J || G(y.C | 0, 71, y.mb | 0, y.Lb | 0);
        f = h[m >> 2];
        g = f >> 2;
        l[g + (j * 38 | 0) + 34] = l[i + 34];
        l[g + (j * 38 | 0) + 35] = l[i + 35];
        var N = C + 8 | 0;
        h[(f + j * 152 + 112 | 0) >> 2] = h[N >> 2];
        var B = K + 8 | 0;
        h[(f + j * 152 + 116 | 0) >> 2] = h[B >> 2];
        var F = C + 120 | 0;
        l[g + (j * 38 | 0) + 30] = l[F >> 2];
        var H = K + 120 | 0;
        l[g + (j * 38 | 0) + 31] = l[H >> 2];
        var O = C + 128 | 0;
        l[g + (j * 38 | 0) + 32] = l[O >> 2];
        var D = K + 128 | 0;
        l[g + (j * 38 | 0) + 33] = l[D >> 2];
        h[(f + j * 152 + 148 | 0) >> 2] = j;
        h[(f + j * 152 + 144 | 0) >> 2] = E;
        f = (f + j * 152 + 80 | 0) >> 2;
        h[f] = 0;
        h[f + 1] = 0;
        h[f + 2] = 0;
        h[f + 3] = 0;
        h[f + 4] = 0;
        h[f + 5] = 0;
        h[f + 6] = 0;
        h[f + 7] = 0;
        f = h[n >> 2];
        e = f >> 2;
        h[(f + j * 88 + 32 | 0) >> 2] = h[N >> 2];
        h[(f + j * 88 + 36 | 0) >> 2] = h[B >> 2];
        l[e + (j * 22 | 0) + 10] = l[F >> 2];
        l[e + (j * 22 | 0) + 11] = l[H >> 2];
        C = C + 28 | 0;
        N = f + j * 88 + 48 | 0;
        B = h[C + 4 >> 2];
        h[(N | 0) >> 2] = h[C >> 2];
        h[(N + 4 | 0) >> 2] = B;
        K = K + 28 | 0;
        C = f + j * 88 + 56 | 0;
        N = h[K + 4 >> 2];
        h[(C | 0) >> 2] = h[K >> 2];
        h[(C + 4 | 0) >> 2] = N;
        l[e + (j * 22 | 0) + 16] = l[O >> 2];
        l[e + (j * 22 | 0) + 17] = l[D >> 2];
        O = z + 104 | 0;
        D = f + j * 88 + 16 | 0;
        K = h[O + 4 >> 2];
        h[(D | 0) >> 2] = h[O >> 2];
        h[(D + 4 | 0) >> 2] = K;
        O = z + 112 | 0;
        D = f + j * 88 + 24 | 0;
        K = h[O + 4 >> 2];
        h[(D | 0) >> 2] = h[O >> 2];
        h[(D + 4 | 0) >> 2] = K;
        h[(f + j * 88 + 84 | 0) >> 2] = E;
        l[e + (j * 22 | 0) + 19] = A;
        l[e + (j * 22 | 0) + 20] = I;
        h[(f + j * 88 + 72 | 0) >> 2] = h[i + 30];
        b : do {
          if (J) {
            for (A = 0; ; ) {
              if (I = z + A * 20 + 64 | 0, (a[r] & 1) << 24 >> 24 == 0 ? (l[g + (j * 38 | 0) + (A * 9 | 0) + 4] = 0, l[g + (j * 38 | 0) + (A * 9 | 0) + 5] = 0) : (l[g + (j * 38 | 0) + (A * 9 | 0) + 4] = l[u >> 2] * l[i + (A * 5 | 0) + 18], l[g + (j * 38 | 0) + (A * 9 | 0) + 5] = l[u >> 2] * l[i + (A * 5 | 0) + 19]), l[g + (j * 38 | 0) + (A * 9 | 0)] = 0, l[g + (j * 38 | 0) + (A * 9 | 0) + 1] = 0, l[g + (j * 38 | 0) + (A * 9 | 0) + 2] = 0, l[g + (j * 38 | 0) + (A * 9 | 0) + 3] = 0, l[g + (j * 38 | 0) + (A * 9 | 0) + 6] = 0, l[g + (j * 38 | 0) + (A * 9 | 0) + 7] = 0, l[g + (j * 38 | 0) + (A * 9 | 0) + 8] = 0, e = (A << 3) + f + j * 88 | 0, O = h[I + 4 >> 2], h[(e | 0) >> 2] = h[I >> 2], h[(e + 4 | 0) >> 2] = O, A = A + 1 | 0, (A | 0) == (E | 0)) {
                break b;
              }
            }
          }
        } while (0);
        j = j + 1 | 0;
        if ((j | 0) >= (h[o] | 0)) {
          break a;
        }
        i = h[s >> 2];
      }
    }
  } while (0);
}

function ht(c) {
  var d, e, f, g, i, j, m, n, o, q = qg;
  qg += 24;
  var p = c + 48 | 0, r = (h[p >> 2] | 0) > 0;
  a : do {
    if (r) {
      var s = c + 40 | 0, u = c + 36 | 0, z = c + 44 | 0, E = c + 24 | 0, A = c + 28 | 0, I = q, C = q;
      o = C >> 2;
      n = (q | 0) >> 2;
      m = (q + 4 | 0) >> 2;
      for (var K = q + 8 | 0, J = 0; ; ) {
        var N = k[s >> 2];
        j = N >> 2;
        var B = h[u >> 2], F = l[(B + 76 >> 2) + (J * 22 | 0)], H = l[(B + 80 >> 2) + (J * 22 | 0)], O = h[h[z >> 2] + (h[j + (J * 38 | 0) + 37] << 2) >> 2];
        i = O >> 2;
        var D = O + 64 | 0, Q = h[j + (J * 38 | 0) + 28], P = h[j + (J * 38 | 0) + 29], M = l[j + (J * 38 | 0) + 30], Na = l[j + (J * 38 | 0) + 31], U = l[j + (J * 38 | 0) + 32], L = l[j + (J * 38 | 0) + 33], R = B + J * 88 + 48 | 0, la = h[R + 4 >> 2], Da = (t[0] = h[R >> 2], x[0]), Y = (t[0] = la, x[0]), Z = B + J * 88 + 56 | 0, W = h[Z + 4 >> 2], wa = (t[0] = h[Z >> 2], x[0]), X = (t[0] = W, x[0]), aa = h[E >> 2], ga = aa + Q * 12 | 0, ca = h[ga + 4 >> 2], La = (t[0] = h[ga >> 2], x[0]), Ua = (t[0] = ca, x[0]), Va = l[(aa + 8 >> 2) + (Q * 3 | 0)], ma = h[A >> 2], xa = ma + Q * 12 | 0, ua = h[xa + 4 >> 2], da = (t[0] = h[xa >> 2], x[0]), ya = (t[0] = ua, x[0]), Ha = l[(ma + 8 >> 2) + (Q * 3 | 0)], ab = aa + P * 12 | 0, bb = h[ab + 4 >> 2], ob = (t[0] = h[ab >> 2], x[0]), gb = (t[0] = bb, x[0]), yb = l[(aa + 8 >> 2) + (P * 3 | 0)], db = ma + P * 12 | 0, eb = h[db + 4 >> 2], pa = (t[0] = h[db >> 2], x[0]), $ = (t[0] = eb, x[0]), Oa = l[(ma + 8 >> 2) + (P * 3 | 0)], ea = O + 124 | 0, ha = h[ea >> 2];
        if ((ha | 0) > 0) {
          var ja = ha;
        } else {
          G(y.C | 0, 168, y.lb | 0, y.Zb | 0), ja = h[ea >> 2];
        }
        var ka = Ks(Va), za = Ms(Va), qa = Ks(yb), Aa = Ms(yb), fb = La - (za * Da - ka * Y), na = Ua - (ka * Da + za * Y), Pa = ob - (Aa * wa - qa * X), mb = gb - (qa * wa + Aa * X);
        g = D >> 2;
        var lb = (ja | 0) == 0;
        b : do {
          if (!lb) {
            var pb = h[i + 30];
            if (pb == 0) {
              l[n] = 1;
              l[m] = 0;
              var Cb = l[i + 28], hb = l[i + 29], Qa = za * Cb - ka * hb + fb, ba = ka * Cb + za * hb + na, ra = l[D >> 2], Ma = l[i + 17], Wa = Aa * ra - qa * Ma + Pa, Ca = qa * ra + Aa * Ma + mb, Ba = Qa - Wa, Xa = ba - Ca;
              if (Ba * Ba + Xa * Xa > 1.4210854715202004e-14) {
                var fa = Wa - Qa, Ra = Ca - ba, Za = (x[0] = fa, t[0]), nb = (x[0] = Ra, t[0]) | 0;
                h[o] = 0 | Za;
                h[o + 1] = nb;
                var Fb = Nm(fa * fa + Ra * Ra);
                if (Fb < 1.1920928955078125e-7) {
                  var qb = fa, Ia = Ra;
                } else {
                  var rb = 1 / Fb, Ya = fa * rb;
                  l[n] = Ya;
                  var oa = Ra * rb;
                  l[m] = oa;
                  qb = Ya;
                  Ia = oa;
                }
              } else {
                qb = 1, Ia = 0;
              }
              var Fa = (ba + Ia * F + (Ca - Ia * H)) * .5, $a = (x[0] = (Qa + qb * F + (Wa - qb * H)) * .5, t[0]), Ea = (x[0] = Fa, t[0]) | 0;
              h[K >> 2] = 0 | $a;
              h[K + 4 >> 2] = Ea;
            } else {
              if (pb == 1) {
                var Ga = l[i + 26], Ja = l[i + 27], Sa = za * Ga - ka * Ja, vb = ka * Ga + za * Ja, Gb = (x[0] = Sa, t[0]), zb = (x[0] = vb, t[0]) | 0, Nb = C | 0;
                h[Nb >> 2] = 0 | Gb;
                var Ob = C + 4 | 0;
                h[Ob >> 2] = zb;
                var Db = l[i + 28], Pb = l[i + 29], Ab = za * Db - ka * Pb + fb, Eb = ka * Db + za * Pb + na;
                if ((ja | 0) > 0) {
                  for (var sb = 0, cb = Sa, Mb = vb; ; ) {
                    var wb = l[g + (sb * 5 | 0)], tb = l[g + (sb * 5 | 0) + 1], V = Aa * wb - qa * tb + Pa, ia = qa * wb + Aa * tb + mb, Hb = F - ((V - Ab) * cb + (ia - Eb) * Mb), Qb = (ia + Mb * Hb + (ia - Mb * H)) * .5, Bb = (sb << 3) + I + 8 | 0, Ib = (x[0] = (V + cb * Hb + (V - cb * H)) * .5, t[0]), Xb = (x[0] = Qb, t[0]) | 0, ec = Bb | 0;
                    h[ec >> 2] = 0 | Ib;
                    var Ka = Bb + 4 | 0;
                    h[Ka >> 2] = Xb;
                    var Jb = sb + 1 | 0;
                    if ((Jb | 0) >= (ja | 0)) {
                      break b;
                    }
                    sb = Jb;
                    cb = l[n];
                    Mb = l[m];
                  }
                }
              } else {
                if (pb == 2) {
                  var S = l[i + 26], ub = l[i + 27], Kb = Aa * S - qa * ub, sa = qa * S + Aa * ub, Rb = (x[0] = Kb, t[0]), ic = (x[0] = sa, t[0]), $b = 0 | Rb, ac = ic | 0, Nb = C | 0;
                  h[Nb >> 2] = $b;
                  Ob = C + 4 | 0;
                  h[Ob >> 2] = ac;
                  var lc = l[i + 28], yc = l[i + 29], Gc = Aa * lc - qa * yc + Pa, zc = qa * lc + Aa * yc + mb, mc = (ja | 0) > 0;
                  c : do {
                    if (mc) {
                      for (var bc = 0, cc = Kb, Sb = sa; ; ) {
                        var Lb = l[g + (bc * 5 | 0)], ib = l[g + (bc * 5 | 0) + 1], Tb = za * Lb - ka * ib + fb, dc = ka * Lb + za * ib + na, Ac = H - ((Tb - Gc) * cc + (dc - zc) * Sb), Hc = (dc - Sb * F + dc + Sb * Ac) * .5, Ic = (bc << 3) + I + 8 | 0, fc = (x[0] = (Tb - cc * F + Tb + cc * Ac) * .5, t[0]), od = (x[0] = Hc, t[0]), Wc = 0 | fc, Qc = od | 0, ec = Ic | 0;
                        h[ec >> 2] = Wc;
                        Ka = Ic + 4 | 0;
                        h[Ka >> 2] = Qc;
                        var xb = bc + 1 | 0, Wb = l[n], oc = l[m];
                        if ((xb | 0) >= (ja | 0)) {
                          var Tc = Wb, Jc = oc;
                          break c;
                        }
                        bc = xb;
                        cc = Wb;
                        Sb = oc;
                      }
                    } else {
                      Tc = Kb, Jc = sa;
                    }
                  } while (0);
                  var Kc = (x[0] = -Tc, t[0]), gc = (x[0] = -Jc, t[0]) | 0;
                  h[o] = 0 | Kc;
                  h[o + 1] = gc;
                }
              }
            }
          }
        } while (0);
        var Bc = N + J * 152 + 72 | 0, Rc = Bc, jc = h[o + 1];
        h[Rc >> 2] = h[o];
        h[Rc + 4 >> 2] = jc;
        f = (N + J * 152 + 144 | 0) >> 2;
        var Lc = h[f], vd = (Lc | 0) > 0;
        do {
          if (vd) {
            e = (N + J * 152 + 76 | 0) >> 2;
            d = (Bc | 0) >> 2;
            for (var tc = M + Na, uc = -Oa, Xc = -Ha, wd = N + J * 152 + 140 | 0, jb = 0; ; ) {
              var rc = l[q + (jb << 3) + 8 >> 2], Ub = rc - La, xd = l[q + (jb << 3) + 12 >> 2], nc = xd - Ua, Yb = N + J * 152 + jb * 36 | 0, yd = (x[0] = Ub, t[0]), Od = (x[0] = nc, t[0]) | 0;
              h[Yb >> 2] = 0 | yd;
              h[Yb + 4 >> 2] = Od;
              var cd = rc - ob, dd = xd - gb, Yc = N + J * 152 + jb * 36 + 8 | 0, ed = (x[0] = cd, t[0]), pc = (x[0] = dd, t[0]) | 0;
              h[Yc >> 2] = 0 | ed;
              h[Yc + 4 >> 2] = pc;
              var Mc = l[e], Uc = l[j + (J * 38 | 0) + (jb * 9 | 0) + 1], fd = l[d], Cc = Ub * Mc - Uc * fd, pd = l[j + (J * 38 | 0) + (jb * 9 | 0) + 3], zd = cd * Mc - pd * fd, be = tc + U * Cc * Cc + L * zd * zd;
              l[j + (J * 38 | 0) + (jb * 9 | 0) + 6] = be > 0 ? 1 / be : 0;
              var Jd = l[e], Pd = l[d] * -1, qd = Ub * Pd - Uc * Jd, kc = cd * Pd - pd * Jd, hc = tc + U * qd * qd + L * kc * kc;
              l[j + (J * 38 | 0) + (jb * 9 | 0) + 7] = hc > 0 ? 1 / hc : 0;
              var vc = N + J * 152 + jb * 36 + 32 | 0;
              l[vc >> 2] = 0;
              var gd = l[d] * (pa + pd * uc - da - Uc * Xc) + l[e] * ($ + cd * Oa - ya - Ub * Ha);
              gd < -1 && (l[vc >> 2] = gd * -l[wd >> 2]);
              var hd = jb + 1 | 0;
              if ((hd | 0) == (Lc | 0)) {
                break;
              }
              jb = hd;
            }
            if ((h[f] | 0) == 2) {
              var qc = l[e], Zb = l[d], Ad = l[j + (J * 38 | 0)] * qc - l[j + (J * 38 | 0) + 1] * Zb, id = l[j + (J * 38 | 0) + 2] * qc - l[j + (J * 38 | 0) + 3] * Zb, ce = l[j + (J * 38 | 0) + 9] * qc - l[j + (J * 38 | 0) + 10] * Zb, Qd = l[j + (J * 38 | 0) + 11] * qc - l[j + (J * 38 | 0) + 12] * Zb, Rd = U * Ad, Zc = L * id, Bd = tc + Rd * Ad + Zc * id, jd = tc + U * ce * ce + L * Qd * Qd, Cd = tc + Rd * ce + Zc * Qd, kd = Bd * jd - Cd * Cd;
              if (Bd * Bd < kd * 1e3) {
                l[j + (J * 38 | 0) + 24] = Bd;
                l[j + (J * 38 | 0) + 25] = Cd;
                l[j + (J * 38 | 0) + 26] = Cd;
                l[j + (J * 38 | 0) + 27] = jd;
                var Vc = kd != 0 ? 1 / kd : kd, Sd = Cd * -Vc, Dd = Vc * Bd;
                l[j + (J * 38 | 0) + 20] = Vc * jd;
                l[j + (J * 38 | 0) + 21] = Sd;
                l[j + (J * 38 | 0) + 22] = Sd;
                l[j + (J * 38 | 0) + 23] = Dd;
              } else {
                h[f] = 1;
              }
            }
          }
        } while (0);
        var ye = J + 1 | 0;
        if ((ye | 0) >= (h[p >> 2] | 0)) {
          break a;
        }
        J = ye;
      }
    }
  } while (0);
  qg = q;
}

function it(c) {
  var d, e, f, g, i = c + 48 | 0, j = (h[i >> 2] | 0) > 0;
  a : do {
    if (j) {
      var m = c + 40 | 0;
      g = (c + 28 | 0) >> 2;
      for (var n = 0; ; ) {
        var o = k[m >> 2];
        f = o >> 2;
        var q = o + n * 152 | 0, p = k[f + (n * 38 | 0) + 28], r = k[f + (n * 38 | 0) + 29], s = l[f + (n * 38 | 0) + 30], u = l[f + (n * 38 | 0) + 32], z = l[f + (n * 38 | 0) + 31], E = l[f + (n * 38 | 0) + 33], A = o + n * 152 + 144 | 0, I = k[A >> 2], C = h[g], K = C + p * 12 | 0, J = h[K + 4 >> 2], N = (t[0] = h[K >> 2], x[0]), B = (t[0] = J, x[0]), F = l[(C + 8 >> 2) + (p * 3 | 0)], H = C + r * 12 | 0, O = h[H + 4 >> 2], D = (t[0] = h[H >> 2], x[0]), Q = (t[0] = O, x[0]), P = l[(C + 8 >> 2) + (r * 3 | 0)], M = o + n * 152 + 72 | 0, Na = h[M + 4 >> 2], U = (t[0] = h[M >> 2], x[0]), L = (t[0] = Na, x[0]), R = U * -1, la = l[f + (n * 38 | 0) + 34];
        (I - 1 | 0) >>> 0 < 2 || G(y.C | 0, 311, y.$ | 0, y.ec | 0);
        var Da = (I | 0) > 0;
        b : do {
          if (Da) {
            for (var Y = Q, Z = D, W = B, wa = N, X = F, aa = P, ga = 0; ; ) {
              var ca = l[f + (n * 38 | 0) + (ga * 9 | 0) + 3], La = l[f + (n * 38 | 0) + (ga * 9 | 0) + 2], Ua = l[f + (n * 38 | 0) + (ga * 9 | 0) + 1], Va = l[f + (n * 38 | 0) + (ga * 9 | 0)], ma = la * l[f + (n * 38 | 0) + (ga * 9 | 0) + 4], xa = o + n * 152 + ga * 36 + 20 | 0, ua = l[xa >> 2], da = ua + l[f + (n * 38 | 0) + (ga * 9 | 0) + 7] * -((Z + ca * -aa - wa - Ua * -X) * L + (Y + La * aa - W - Va * X) * R), ya = -ma, Ha = da < ma ? da : ma, ab = Ha < ya ? ya : Ha, bb = ab - ua;
              l[xa >> 2] = ab;
              var ob = L * bb, gb = R * bb, yb = wa - ob * s, db = W - gb * s, eb = X - u * (Va * gb - Ua * ob), pa = Z + ob * z, $ = Y + gb * z, Oa = aa + E * (La * gb - ca * ob), ea = ga + 1 | 0;
              if ((ea | 0) == (I | 0)) {
                var ha = $, ja = pa, ka = db, za = yb, qa = eb, Aa = Oa;
                break b;
              }
              Y = $;
              Z = pa;
              W = db;
              wa = yb;
              X = eb;
              aa = Oa;
              ga = ea;
            }
          } else {
            ha = Q, ja = D, ka = B, za = N, qa = F, Aa = P;
          }
        } while (0);
        var fb = (h[A >> 2] | 0) == 1;
        b : do {
          if (fb) {
            var na = l[f + (n * 38 | 0) + 3], Pa = l[f + (n * 38 | 0) + 2], mb = l[f + (n * 38 | 0) + 1], lb = l[q >> 2], pb = o + n * 152 + 16 | 0, Cb = l[pb >> 2], hb = Cb + ((ja + na * -Aa - za - mb * -qa) * U + (ha + Pa * Aa - ka - lb * qa) * L - l[f + (n * 38 | 0) + 8]) * -l[f + (n * 38 | 0) + 6], Qa = hb > 0 ? hb : 0, ba = Qa - Cb;
            l[pb >> 2] = Qa;
            var ra = U * ba, Ma = L * ba, Wa = Aa + E * (Pa * Ma - na * ra), Ca = qa - u * (lb * Ma - mb * ra), Ba = za - ra * s, Xa = ka - Ma * s, fa = ja + ra * z, Ra = ha + Ma * z;
          } else {
            e = (o + n * 152 + 16 | 0) >> 2;
            var Za = l[e];
            d = (o + n * 152 + 52 | 0) >> 2;
            var nb = l[d];
            Za < 0 | nb < 0 && G(y.C | 0, 406, y.$ | 0, y.ic | 0);
            var Fb = -Aa, qb = l[f + (n * 38 | 0) + 3], Ia = l[f + (n * 38 | 0) + 2], rb = -qa, Ya = l[f + (n * 38 | 0) + 1], oa = l[q >> 2], Fa = l[f + (n * 38 | 0) + 12], $a = l[f + (n * 38 | 0) + 11], Ea = l[f + (n * 38 | 0) + 10], Ga = l[f + (n * 38 | 0) + 9], Ja = l[f + (n * 38 | 0) + 26], Sa = l[f + (n * 38 | 0) + 25], vb = (ja + qb * Fb - za - Ya * rb) * U + (ha + Ia * Aa - ka - oa * qa) * L - l[f + (n * 38 | 0) + 8] - (l[f + (n * 38 | 0) + 24] * Za + Ja * nb), Gb = (ja + Fa * Fb - za - Ea * rb) * U + (ha + $a * Aa - ka - Ga * qa) * L - l[f + (n * 38 | 0) + 17] - (Sa * Za + l[f + (n * 38 | 0) + 27] * nb), zb = l[f + (n * 38 | 0) + 20] * vb + l[f + (n * 38 | 0) + 22] * Gb, Nb = l[f + (n * 38 | 0) + 21] * vb + l[f + (n * 38 | 0) + 23] * Gb, Ob = -zb, Db = -Nb;
            if (zb > 0 | Nb > 0) {
              var Pb = vb * -l[f + (n * 38 | 0) + 6], Ab = Pb < 0;
              do {
                if (!Ab && Sa * Pb + Gb >= 0) {
                  var Eb = Pb - Za, sb = -nb, cb = U * Eb, Mb = L * Eb, wb = U * sb, tb = L * sb, V = cb + wb, ia = Mb + tb, Hb = za - V * s, Qb = ka - ia * s, Bb = qa - u * (oa * Mb - Ya * cb + (Ga * tb - Ea * wb)), Ib = ja + V * z, Xb = ha + ia * z, ec = Aa + E * (Ia * Mb - qb * cb + ($a * tb - Fa * wb));
                  l[e] = Pb;
                  l[d] = 0;
                  Wa = ec;
                  Ca = Bb;
                  Ba = Hb;
                  Xa = Qb;
                  fa = Ib;
                  Ra = Xb;
                  break b;
                }
              } while (0);
              var Ka = Gb * -l[f + (n * 38 | 0) + 15], Jb = Ka < 0;
              do {
                if (!Jb && Ja * Ka + vb >= 0) {
                  var S = -Za, ub = Ka - nb, Kb = U * S, sa = L * S, Rb = U * ub, ic = L * ub, $b = Kb + Rb, ac = sa + ic, lc = za - $b * s, yc = ka - ac * s, Gc = qa - u * (oa * sa - Ya * Kb + (Ga * ic - Ea * Rb)), zc = ja + $b * z, mc = ha + ac * z, bc = Aa + E * (Ia * sa - qb * Kb + ($a * ic - Fa * Rb));
                  l[e] = 0;
                  l[d] = Ka;
                  Wa = bc;
                  Ca = Gc;
                  Ba = lc;
                  Xa = yc;
                  fa = zc;
                  Ra = mc;
                  break b;
                }
              } while (0);
              if (vb < 0 | Gb < 0) {
                Wa = Aa, Ca = qa, Ba = za, Xa = ka, fa = ja, Ra = ha;
              } else {
                var cc = -Za, Sb = -nb, Lb = U * cc, ib = L * cc, Tb = U * Sb, dc = L * Sb, Ac = Lb + Tb, Hc = ib + dc, Ic = za - Ac * s, fc = ka - Hc * s, od = qa - u * (oa * ib - Ya * Lb + (Ga * dc - Ea * Tb)), Wc = ja + Ac * z, Qc = ha + Hc * z, xb = Aa + E * (Ia * ib - qb * Lb + ($a * dc - Fa * Tb));
                l[e] = 0;
                l[d] = 0;
                Wa = xb;
                Ca = od;
                Ba = Ic;
                Xa = fc;
                fa = Wc;
                Ra = Qc;
              }
            } else {
              var Wb = Ob - Za, oc = Db - nb, Tc = U * Wb, Jc = L * Wb, Kc = U * oc, gc = L * oc, Bc = Tc + Kc, Rc = Jc + gc, jc = za - Bc * s, Lc = ka - Rc * s, vd = qa - u * (oa * Jc - Ya * Tc + (Ga * gc - Ea * Kc)), tc = ja + Bc * z, uc = ha + Rc * z, Xc = Aa + E * (Ia * Jc - qb * Tc + ($a * gc - Fa * Kc));
              l[e] = Ob;
              l[d] = Db;
              Wa = Xc;
              Ca = vd;
              Ba = jc;
              Xa = Lc;
              fa = tc;
              Ra = uc;
            }
          }
        } while (0);
        var wd = h[g] + p * 12 | 0, jb = (x[0] = Ba, t[0]), rc = (x[0] = Xa, t[0]) | 0;
        h[(wd | 0) >> 2] = 0 | jb;
        h[(wd + 4 | 0) >> 2] = rc;
        l[(h[g] + 8 >> 2) + (p * 3 | 0)] = Ca;
        var Ub = h[g] + r * 12 | 0, xd = (x[0] = fa, t[0]), nc = (x[0] = Ra, t[0]) | 0;
        h[(Ub | 0) >> 2] = 0 | xd;
        h[(Ub + 4 | 0) >> 2] = nc;
        l[(h[g] + 8 >> 2) + (r * 3 | 0)] = Wa;
        var Yb = n + 1 | 0;
        if ((Yb | 0) >= (h[i >> 2] | 0)) {
          break a;
        }
        n = Yb;
      }
    }
  } while (0);
}

function jt(c, d, e, f, g) {
  var i = f >> 2, j = e >> 2;
  d >>= 2;
  (h[d + 21] | 0) > 0 || G(y.C | 0, 617, y.pb | 0, y.rc | 0);
  var m = h[d + 18];
  if (m == 0) {
    var e = l[j + 3], m = l[d + 6], n = l[j + 2], o = l[d + 7], g = e * m - n * o + l[j], j = n * m + e * o + l[j + 1], m = l[i + 3], n = l[d], o = l[i + 2], f = l[d + 1], e = m * n - o * f + l[i], n = o * n + m * f + l[i + 1], i = e - g, m = n - j, o = (x[0] = i, t[0]), f = (x[0] = m, t[0]) | 0;
    h[c >> 2] = 0 | o;
    h[c + 4 >> 2] = f;
    o = Nm(i * i + m * m);
    o < 1.1920928955078125e-7 ? (o = i, f = m) : (f = 1 / o, o = i * f, l[c >> 2] = o, f *= m, l[(c + 4 | 0) >> 2] = f);
    var q = c + 8 | 0, g = (x[0] = (g + e) * .5, t[0]), j = (x[0] = (j + n) * .5, t[0]) | 0;
    h[q >> 2] = 0 | g;
    h[q + 4 >> 2] = j;
    l[c + 16 >> 2] = i * o + m * f - l[d + 19] - l[d + 20];
  } else {
    if (m == 1) {
      var n = e + 12 | 0, m = l[n >> 2], o = l[d + 4], f = e + 8 | 0, q = l[f >> 2], p = l[d + 5], e = m * o - q * p, m = q * o + m * p, o = (x[0] = e, t[0]), q = (x[0] = m, t[0]) | 0;
      h[(c | 0) >> 2] = 0 | o;
      h[(c + 4 | 0) >> 2] = q;
      var n = l[n >> 2], o = l[d + 6], f = l[f >> 2], q = l[d + 7], p = l[i + 3], r = l[(g << 3 >> 2) + d], s = l[i + 2], u = l[((g << 3) + 4 >> 2) + d], g = p * r - s * u + l[i], i = s * r + p * u + l[i + 1];
      l[c + 16 >> 2] = (g - (n * o - f * q + l[j])) * e + (i - (f * o + n * q + l[j + 1])) * m - l[d + 19] - l[d + 20];
      c = c + 8 | 0;
      d = (x[0] = g, t[0]);
      i = (x[0] = i, t[0]) | 0;
      h[(c | 0) >> 2] = 0 | d;
      h[(c + 4 | 0) >> 2] = i;
    } else {
      m == 2 && (n = f + 12 | 0, m = l[n >> 2], o = l[d + 4], f = f + 8 | 0, q = l[f >> 2], p = l[d + 5], e = m * o - q * p, m = q * o + m * p, o = (x[0] = e, t[0]), q = (x[0] = m, t[0]) | 0, h[(c | 0) >> 2] = 0 | o, h[(c + 4 | 0) >> 2] = q, n = l[n >> 2], o = l[d + 6], f = l[f >> 2], q = l[d + 7], p = l[j + 3], r = l[(g << 3 >> 2) + d], s = l[j + 2], u = l[((g << 3) + 4 >> 2) + d], g = p * r - s * u + l[j], j = s * r + p * u + l[j + 1], l[c + 16 >> 2] = (g - (n * o - f * q + l[i])) * e + (j - (f * o + n * q + l[i + 1])) * m - l[d + 19] - l[d + 20], d = c + 8 | 0, i = (x[0] = g, t[0]), j = (x[0] = j, t[0]) | 0, h[(d | 0) >> 2] = 0 | i, h[(d + 4 | 0) >> 2] = j, d = (x[0] = -e, t[0]), i = (x[0] = -m, t[0]) | 0, h[c >> 2] = 0 | d, h[c + 4 >> 2] = i);
    }
  }
}

function Wk(c) {
  var d, e, f, g, i, j, m, n, o, q, p, r, s, u, z, E, A, I, C, K = c >>> 0 < 245;
  a : do {
    if (K) {
      var J = c >>> 0 < 11 ? 16 : c + 11 & -8, N = J >>> 3, B = k[T >> 2], F = B >>> (N >>> 0);
      if ((F & 3 | 0) != 0) {
        var H = (F & 1 ^ 1) + N | 0, O = H << 1, D = (O << 2) + T + 40 | 0, Q = (O + 2 << 2) + T + 40 | 0, P = k[Q >> 2], M = P + 8 | 0, Na = k[M >> 2];
        (D | 0) == (Na | 0) ? h[T >> 2] = B & (1 << H ^ -1) : Na >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[Q >> 2] = Na, h[Na + 12 >> 2] = D);
        var U = H << 3;
        h[P + 4 >> 2] = U | 3;
        h[(P + (U | 4) | 0) >> 2] |= 1;
        var L = M;
        C = 334;
        break;
      }
      if (J >>> 0 <= k[T + 8 >> 2] >>> 0) {
        var R = J;
        I = R >> 2;
        C = 156;
        break;
      }
      if ((F | 0) != 0) {
        var la = 2 << N, Da = F << N & (la | -la), Y = (Da & -Da) - 1 | 0, Z = Y >>> 12 & 16, W = Y >>> (Z >>> 0), wa = W >>> 5 & 8, X = W >>> (wa >>> 0), aa = X >>> 2 & 4, ga = X >>> (aa >>> 0), ca = ga >>> 1 & 2, La = ga >>> (ca >>> 0), Ua = La >>> 1 & 1, Va = (wa | Z | aa | ca | Ua) + (La >>> (Ua >>> 0)) | 0, ma = Va << 1, xa = (ma << 2) + T + 40 | 0, ua = (ma + 2 << 2) + T + 40 | 0, da = k[ua >> 2], ya = da + 8 | 0, Ha = k[ya >> 2];
        (xa | 0) == (Ha | 0) ? h[T >> 2] = B & (1 << Va ^ -1) : Ha >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[ua >> 2] = Ha, h[Ha + 12 >> 2] = xa);
        var ab = Va << 3, bb = ab - J | 0;
        h[da + 4 >> 2] = J | 3;
        var ob = da, gb = ob + J | 0;
        h[ob + (J | 4) >> 2] = bb | 1;
        h[ob + ab >> 2] = bb;
        var yb = k[T + 8 >> 2];
        if ((yb | 0) != 0) {
          var db = h[T + 20 >> 2], eb = yb >>> 2 & 1073741822, pa = (eb << 2) + T + 40 | 0, $ = k[T >> 2], Oa = 1 << (yb >>> 3);
          if (($ & Oa | 0) == 0) {
            h[T >> 2] = $ | Oa;
            var ea = pa, ha = (eb + 2 << 2) + T + 40 | 0;
          } else {
            var ja = (eb + 2 << 2) + T + 40 | 0, ka = k[ja >> 2];
            ka >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (ea = ka, ha = ja);
          }
          h[ha >> 2] = db;
          h[ea + 12 >> 2] = db;
          h[(db + 8 | 0) >> 2] = ea;
          h[(db + 12 | 0) >> 2] = pa;
        }
        h[T + 8 >> 2] = bb;
        h[T + 20 >> 2] = gb;
        L = ya;
        C = 334;
        break;
      }
      var za = h[T + 4 >> 2];
      if ((za | 0) == 0) {
        R = J;
        I = R >> 2;
        C = 156;
        break;
      }
      var qa = (za & -za) - 1 | 0, Aa = qa >>> 12 & 16, fb = qa >>> (Aa >>> 0), na = fb >>> 5 & 8, Pa = fb >>> (na >>> 0), mb = Pa >>> 2 & 4, lb = Pa >>> (mb >>> 0), pb = lb >>> 1 & 2, Cb = lb >>> (pb >>> 0), hb = Cb >>> 1 & 1, Qa = k[T + ((na | Aa | mb | pb | hb) + (Cb >>> (hb >>> 0)) << 2) + 304 >> 2], ba = Qa;
      A = ba >> 2;
      var ra = (h[Qa + 4 >> 2] & -8) - J | 0;
      b : for (;;) {
        for (var Ma = ba; ; ) {
          var Wa = h[Ma + 16 >> 2];
          if ((Wa | 0) == 0) {
            var Ca = h[Ma + 20 >> 2];
            if ((Ca | 0) == 0) {
              break b;
            }
            var Ba = Ca;
          } else {
            Ba = Wa;
          }
          var Xa = (h[Ba + 4 >> 2] & -8) - J | 0;
          if (Xa >>> 0 < ra >>> 0) {
            ba = Ba;
            A = ba >> 2;
            ra = Xa;
            continue b;
          }
          Ma = Ba;
        }
      }
      var fa = ba, Ra = k[T + 16 >> 2], Za = fa >>> 0 < Ra >>> 0;
      do {
        if (!Za) {
          var nb = fa + J | 0, Fb = nb;
          if (fa >>> 0 < nb >>> 0) {
            var qb = k[A + 6], Ia = k[A + 3], rb = (Ia | 0) == (ba | 0);
            do {
              if (rb) {
                var Ya = ba + 20 | 0, oa = h[Ya >> 2];
                if ((oa | 0) == 0) {
                  var Fa = ba + 16 | 0, $a = h[Fa >> 2];
                  if (($a | 0) == 0) {
                    var Ea = 0;
                    E = Ea >> 2;
                    break;
                  }
                  var Ga = Fa, Ja = $a;
                } else {
                  Ga = Ya, Ja = oa, C = 38;
                }
                for (;;) {
                  var Sa = Ja + 20 | 0, vb = h[Sa >> 2];
                  if ((vb | 0) != 0) {
                    Ga = Sa, Ja = vb;
                  } else {
                    var Gb = Ja + 16 | 0, zb = k[Gb >> 2];
                    if ((zb | 0) == 0) {
                      break;
                    }
                    Ga = Gb;
                    Ja = zb;
                  }
                }
                Ga >>> 0 < Ra >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[Ga >> 2] = 0, Ea = Ja, E = Ea >> 2);
              } else {
                var Nb = k[A + 2];
                Nb >>> 0 < Ra >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[Nb + 12 >> 2] = Ia, h[Ia + 8 >> 2] = Nb, Ea = Ia, E = Ea >> 2);
              }
            } while (0);
            var Ob = (qb | 0) == 0;
            b : do {
              if (!Ob) {
                var Db = ba + 28 | 0, Pb = (h[Db >> 2] << 2) + T + 304 | 0, Ab = (ba | 0) == (h[Pb >> 2] | 0);
                do {
                  if (Ab) {
                    h[Pb >> 2] = Ea;
                    if ((Ea | 0) != 0) {
                      break;
                    }
                    h[T + 4 >> 2] &= 1 << h[Db >> 2] ^ -1;
                    break b;
                  }
                  if (qb >>> 0 < k[T + 16 >> 2] >>> 0) {
                    qt(), ta("Reached an unreachable!");
                  } else {
                    var Eb = qb + 16 | 0;
                    (h[Eb >> 2] | 0) == (ba | 0) ? h[Eb >> 2] = Ea : h[qb + 20 >> 2] = Ea;
                    if ((Ea | 0) == 0) {
                      break b;
                    }
                  }
                } while (0);
                if (Ea >>> 0 < k[T + 16 >> 2] >>> 0) {
                  qt(), ta("Reached an unreachable!");
                } else {
                  h[E + 6] = qb;
                  var sb = k[A + 4];
                  (sb | 0) != 0 && (sb >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[E + 4] = sb, h[sb + 24 >> 2] = Ea));
                  var cb = k[A + 5];
                  (cb | 0) != 0 && (cb >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[E + 5] = cb, h[cb + 24 >> 2] = Ea));
                }
              }
            } while (0);
            if (ra >>> 0 < 16) {
              var Mb = ra + J | 0;
              h[A + 1] = Mb | 3;
              h[(Mb + (fa + 4) | 0) >> 2] |= 1;
            } else {
              h[A + 1] = J | 3;
              h[fa + (J | 4) >> 2] = ra | 1;
              h[fa + ra + J >> 2] = ra;
              var wb = k[T + 8 >> 2];
              if ((wb | 0) != 0) {
                var tb = k[T + 20 >> 2], V = wb >>> 2 & 1073741822, ia = (V << 2) + T + 40 | 0, Hb = k[T >> 2], Qb = 1 << (wb >>> 3);
                if ((Hb & Qb | 0) == 0) {
                  h[T >> 2] = Hb | Qb;
                  var Bb = ia, Ib = (V + 2 << 2) + T + 40 | 0;
                } else {
                  var Xb = (V + 2 << 2) + T + 40 | 0, ec = k[Xb >> 2];
                  ec >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (Bb = ec, Ib = Xb);
                }
                h[Ib >> 2] = tb;
                h[Bb + 12 >> 2] = tb;
                h[tb + 8 >> 2] = Bb;
                h[tb + 12 >> 2] = ia;
              }
              h[T + 8 >> 2] = ra;
              h[T + 20 >> 2] = Fb;
            }
            var Ka = ba + 8 | 0;
            if ((Ka | 0) == 0) {
              R = J;
              I = R >> 2;
              C = 156;
              break a;
            }
            L = Ka;
            C = 334;
            break a;
          }
        }
      } while (0);
    } else {
      if (c >>> 0 > 4294967231) {
        R = -1;
        I = R >> 2;
        C = 156;
        break;
      }
      var Jb = c + 11 | 0, S = Jb & -8;
      z = S >> 2;
      var ub = k[T + 4 >> 2];
      if ((ub | 0) == 0) {
        R = S;
        I = R >> 2;
        C = 156;
        break;
      }
      var Kb = -S | 0, sa = Jb >>> 8;
      if ((sa | 0) == 0) {
        var Rb = 0;
      } else {
        if (S >>> 0 > 16777215) {
          Rb = 31;
        } else {
          var ic = (sa + 1048320 | 0) >>> 16 & 8, $b = sa << ic, ac = ($b + 520192 | 0) >>> 16 & 4, lc = $b << ac, yc = (lc + 245760 | 0) >>> 16 & 2, Gc = 14 - (ac | ic | yc) + (lc << yc >>> 15) | 0, Rb = S >>> ((Gc + 7 | 0) >>> 0) & 1 | Gc << 1;
        }
      }
      var zc = k[T + (Rb << 2) + 304 >> 2], mc = (zc | 0) == 0;
      b : do {
        if (mc) {
          var bc = 0, cc = Kb, Sb = 0;
        } else {
          var Lb = (Rb | 0) == 31 ? 0 : 25 - (Rb >>> 1) | 0, ib = 0, Tb = Kb, dc = zc;
          u = dc >> 2;
          for (var Ac = S << Lb, Hc = 0; ; ) {
            var Ic = h[u + 1] & -8, fc = Ic - S | 0;
            if (fc >>> 0 < Tb >>> 0) {
              if ((Ic | 0) == (S | 0)) {
                bc = dc;
                cc = fc;
                Sb = dc;
                break b;
              }
              var od = dc, Wc = fc;
            } else {
              od = ib, Wc = Tb;
            }
            var Qc = k[u + 5], xb = k[((Ac >>> 31 << 2) + 16 >> 2) + u], Wb = (Qc | 0) == 0 | (Qc | 0) == (xb | 0) ? Hc : Qc;
            if ((xb | 0) == 0) {
              bc = od;
              cc = Wc;
              Sb = Wb;
              break b;
            }
            ib = od;
            Tb = Wc;
            dc = xb;
            u = dc >> 2;
            Ac <<= 1;
            Hc = Wb;
          }
        }
      } while (0);
      if ((Sb | 0) == 0 & (bc | 0) == 0) {
        var oc = 2 << Rb, Tc = ub & (oc | -oc);
        if ((Tc | 0) == 0) {
          var Jc = Sb;
        } else {
          var Kc = (Tc & -Tc) - 1 | 0, gc = Kc >>> 12 & 16, Bc = Kc >>> (gc >>> 0), Rc = Bc >>> 5 & 8, jc = Bc >>> (Rc >>> 0), Lc = jc >>> 2 & 4, vd = jc >>> (Lc >>> 0), tc = vd >>> 1 & 2, uc = vd >>> (tc >>> 0), Xc = uc >>> 1 & 1, Jc = h[T + ((Rc | gc | Lc | tc | Xc) + (uc >>> (Xc >>> 0)) << 2) + 304 >> 2];
        }
      } else {
        Jc = Sb;
      }
      var wd = (Jc | 0) == 0;
      b : do {
        if (wd) {
          var jb = cc, rc = bc;
          s = rc >> 2;
        } else {
          var Ub = Jc;
          r = Ub >> 2;
          for (var xd = cc, nc = bc; ; ) {
            var Yb = (h[r + 1] & -8) - S | 0, yd = Yb >>> 0 < xd >>> 0, Od = yd ? Yb : xd, cd = yd ? Ub : nc, dd = k[r + 4];
            if ((dd | 0) != 0) {
              Ub = dd;
            } else {
              var Yc = k[r + 5];
              if ((Yc | 0) == 0) {
                jb = Od;
                rc = cd;
                s = rc >> 2;
                break b;
              }
              Ub = Yc;
            }
            r = Ub >> 2;
            xd = Od;
            nc = cd;
          }
        }
      } while (0);
      if ((rc | 0) == 0) {
        R = S;
        I = R >> 2;
        C = 156;
        break;
      }
      if (jb >>> 0 >= (h[T + 8 >> 2] - S | 0) >>> 0) {
        R = S;
        I = R >> 2;
        C = 156;
        break;
      }
      var ed = rc;
      p = ed >> 2;
      var pc = k[T + 16 >> 2], Mc = ed >>> 0 < pc >>> 0;
      do {
        if (!Mc) {
          var Uc = ed + S | 0, fd = Uc;
          if (ed >>> 0 < Uc >>> 0) {
            var Cc = k[s + 6], pd = k[s + 3], zd = (pd | 0) == (rc | 0);
            do {
              if (zd) {
                var be = rc + 20 | 0, Jd = h[be >> 2];
                if ((Jd | 0) == 0) {
                  var Pd = rc + 16 | 0, qd = h[Pd >> 2];
                  if ((qd | 0) == 0) {
                    var kc = 0;
                    q = kc >> 2;
                    break;
                  }
                  var hc = Pd, vc = qd;
                } else {
                  hc = be, vc = Jd, C = 103;
                }
                for (;;) {
                  var gd = vc + 20 | 0, hd = h[gd >> 2];
                  if ((hd | 0) != 0) {
                    hc = gd, vc = hd;
                  } else {
                    var qc = vc + 16 | 0, Zb = k[qc >> 2];
                    if ((Zb | 0) == 0) {
                      break;
                    }
                    hc = qc;
                    vc = Zb;
                  }
                }
                hc >>> 0 < pc >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[hc >> 2] = 0, kc = vc, q = kc >> 2);
              } else {
                var Ad = k[s + 2];
                Ad >>> 0 < pc >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[Ad + 12 >> 2] = pd, h[pd + 8 >> 2] = Ad, kc = pd, q = kc >> 2);
              }
            } while (0);
            var id = (Cc | 0) == 0;
            b : do {
              if (!id) {
                var ce = rc + 28 | 0, Qd = (h[ce >> 2] << 2) + T + 304 | 0, Rd = (rc | 0) == (h[Qd >> 2] | 0);
                do {
                  if (Rd) {
                    h[Qd >> 2] = kc;
                    if ((kc | 0) != 0) {
                      break;
                    }
                    h[T + 4 >> 2] &= 1 << h[ce >> 2] ^ -1;
                    break b;
                  }
                  if (Cc >>> 0 < k[T + 16 >> 2] >>> 0) {
                    qt(), ta("Reached an unreachable!");
                  } else {
                    var Zc = Cc + 16 | 0;
                    (h[Zc >> 2] | 0) == (rc | 0) ? h[Zc >> 2] = kc : h[Cc + 20 >> 2] = kc;
                    if ((kc | 0) == 0) {
                      break b;
                    }
                  }
                } while (0);
                if (kc >>> 0 < k[T + 16 >> 2] >>> 0) {
                  qt(), ta("Reached an unreachable!");
                } else {
                  h[q + 6] = Cc;
                  var Bd = k[s + 4];
                  (Bd | 0) != 0 && (Bd >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[q + 4] = Bd, h[Bd + 24 >> 2] = kc));
                  var jd = k[s + 5];
                  (jd | 0) != 0 && (jd >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[q + 5] = jd, h[jd + 24 >> 2] = kc));
                }
              }
            } while (0);
            var Cd = jb >>> 0 < 16;
            b : do {
              if (Cd) {
                var kd = jb + S | 0;
                h[s + 1] = kd | 3;
                h[(kd + (ed + 4) | 0) >> 2] |= 1;
              } else {
                if (h[s + 1] = S | 3, h[((S | 4) >> 2) + p] = jb | 1, h[(jb >> 2) + p + z] = jb, jb >>> 0 < 256) {
                  var Vc = jb >>> 2 & 1073741822, Sd = (Vc << 2) + T + 40 | 0, Dd = k[T >> 2], ye = 1 << (jb >>> 3);
                  if ((Dd & ye | 0) == 0) {
                    h[T >> 2] = Dd | ye;
                    var Xd = Sd, pe = (Vc + 2 << 2) + T + 40 | 0;
                  } else {
                    var Le = (Vc + 2 << 2) + T + 40 | 0, qe = k[Le >> 2];
                    qe >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (Xd = qe, pe = Le);
                  }
                  h[pe >> 2] = fd;
                  h[Xd + 12 >> 2] = fd;
                  h[z + (p + 2)] = Xd;
                  h[z + (p + 3)] = Sd;
                } else {
                  var Nc = Uc, Kd = jb >>> 8;
                  if ((Kd | 0) == 0) {
                    var Ld = 0;
                  } else {
                    if (jb >>> 0 > 16777215) {
                      Ld = 31;
                    } else {
                      var ld = (Kd + 1048320 | 0) >>> 16 & 8, de = Kd << ld, Sc = (de + 520192 | 0) >>> 16 & 4, md = de << Sc, Me = (md + 245760 | 0) >>> 16 & 2, ze = 14 - (Sc | ld | Me) + (md << Me >>> 15) | 0, Ld = jb >>> ((ze + 7 | 0) >>> 0) & 1 | ze << 1;
                    }
                  }
                  var ee = (Ld << 2) + T + 304 | 0;
                  h[z + (p + 7)] = Ld;
                  var cf = S + (ed + 16) | 0;
                  h[z + (p + 5)] = 0;
                  h[cf >> 2] = 0;
                  var df = h[T + 4 >> 2], ef = 1 << Ld;
                  if ((df & ef | 0) == 0) {
                    h[T + 4 >> 2] = df | ef, h[ee >> 2] = Nc, h[z + (p + 6)] = ee, h[z + (p + 3)] = Nc, h[z + (p + 2)] = Nc;
                  } else {
                    for (var Qf = jb << ((Ld | 0) == 31 ? 0 : 25 - (Ld >>> 1) | 0), Ae = h[ee >> 2]; ; ) {
                      if ((h[Ae + 4 >> 2] & -8 | 0) == (jb | 0)) {
                        var rg = Ae + 8 | 0, re = k[rg >> 2], Be = k[T + 16 >> 2], Rf = Ae >>> 0 < Be >>> 0;
                        do {
                          if (!Rf && re >>> 0 >= Be >>> 0) {
                            h[re + 12 >> 2] = Nc;
                            h[rg >> 2] = Nc;
                            h[z + (p + 2)] = re;
                            h[z + (p + 3)] = Ae;
                            h[z + (p + 6)] = 0;
                            break b;
                          }
                        } while (0);
                        qt();
                        ta("Reached an unreachable!");
                      } else {
                        var Ne = (Qf >>> 31 << 2) + Ae + 16 | 0, ff = k[Ne >> 2];
                        if ((ff | 0) == 0) {
                          if (Ne >>> 0 >= k[T + 16 >> 2] >>> 0) {
                            h[Ne >> 2] = Nc;
                            h[z + (p + 6)] = Ae;
                            h[z + (p + 3)] = Nc;
                            h[z + (p + 2)] = Nc;
                            break b;
                          }
                          qt();
                          ta("Reached an unreachable!");
                        } else {
                          Qf <<= 1, Ae = ff;
                        }
                      }
                    }
                  }
                }
              }
            } while (0);
            var sg = rc + 8 | 0;
            if ((sg | 0) == 0) {
              R = S;
              I = R >> 2;
              C = 156;
              break a;
            }
            L = sg;
            C = 334;
            break a;
          }
        }
      } while (0);
    }
    qt();
    ta("Reached an unreachable!");
  } while (0);
  a : do {
    if (C == 156) {
      var Sf = k[T + 8 >> 2];
      if (R >>> 0 > Sf >>> 0) {
        var Tf = k[T + 12 >> 2];
        if (R >>> 0 < Tf >>> 0) {
          var uf = Tf - R | 0;
          h[T + 12 >> 2] = uf;
          var se = k[T + 24 >> 2], tg = se;
          h[T + 24 >> 2] = tg + R | 0;
          h[(tg + 4 >> 2) + I] = uf | 1;
          h[se + 4 >> 2] = R | 3;
          L = se + 8 | 0;
        } else {
          if ((h[rt >> 2] | 0) == 0 && (h[rt >> 2] | 0) == 0) {
            var Uf = st();
            (Uf - 1 & Uf | 0) == 0 ? (h[rt + 8 >> 2] = Uf, h[rt + 4 >> 2] = Uf, h[rt + 12 >> 2] = -1, h[rt + 16 >> 2] = 2097152, h[rt + 20 >> 2] = 0, h[T + 440 >> 2] = 0, h[rt >> 2] = Math.floor(Date.now() / 1e3) & -16 ^ 1431655768) : (qt(), ta("Reached an unreachable!"));
          }
          var Vf = (h[T + 440 >> 2] & 4 | 0) == 0;
          do {
            if (Vf) {
              var Yg = h[T + 24 >> 2], Fh = (Yg | 0) == 0;
              b : do {
                if (Fh) {
                  C = 175;
                } else {
                  for (var ug = Yg, gf = T + 444 | 0; ; ) {
                    var vg = gf | 0, Zg = k[vg >> 2];
                    if (Zg >>> 0 <= ug >>> 0) {
                      var $g = gf + 4 | 0;
                      if ((Zg + h[$g >> 2] | 0) >>> 0 > ug >>> 0) {
                        break;
                      }
                    }
                    var ah = k[gf + 8 >> 2];
                    if ((ah | 0) == 0) {
                      C = 175;
                      break b;
                    }
                    gf = ah;
                  }
                  if ((gf | 0) == 0) {
                    C = 175;
                  } else {
                    var vf = h[rt + 8 >> 2], hf = R + 47 - h[T + 12 >> 2] + vf & -vf;
                    if (hf >>> 0 < 2147483647) {
                      var jf = tt(hf);
                      if ((jf | 0) == (h[vg >> 2] + h[$g >> 2] | 0)) {
                        var wf = jf, Wf = hf, Ed = jf;
                        C = 182;
                      } else {
                        var Ce = jf, wc = hf;
                        C = 184;
                      }
                    } else {
                      C = 183;
                    }
                  }
                }
              } while (0);
              if (C == 175) {
                var Oe = tt(0);
                if ((Oe | 0) == -1) {
                  C = 183;
                } else {
                  var Fd = h[rt + 8 >> 2], Gd = Fd + (R + 47) & -Fd, Xf = Oe, bh = h[rt + 4 >> 2], ch = bh - 1 | 0, wg = (ch & Xf | 0) == 0 ? Gd : Gd - Xf + (ch + Xf & -bh) | 0;
                  if (wg >>> 0 < 2147483647) {
                    var xg = tt(wg);
                    (xg | 0) == (Oe | 0) ? (wf = Oe, Wf = wg, Ed = xg, C = 182) : (Ce = xg, wc = wg, C = 184);
                  } else {
                    C = 183;
                  }
                }
              }
              if (C == 183) {
                h[T + 440 >> 2] |= 4, C = 192;
              } else {
                if (C == 182) {
                  if ((wf | 0) != -1) {
                    var Td = Wf, sc = wf;
                    o = sc >> 2;
                    C = 195;
                    break;
                  }
                  Ce = Ed;
                  wc = Wf;
                }
                var Gh = -wc | 0;
                if ((Ce | 0) != -1 & wc >>> 0 < 2147483647) {
                  if (wc >>> 0 < (R + 48 | 0) >>> 0) {
                    var xf = h[rt + 8 >> 2], Yf = R + 47 - wc + xf & -xf;
                    Yf >>> 0 < 2147483647 ? (tt(Yf) | 0) == -1 ? (tt(Gh), C = 191) : (Ud = Yf + wc | 0, C = 190) : (Ud = wc, C = 190);
                  } else {
                    var Ud = wc;
                    C = 190;
                  }
                } else {
                  Ud = wc, C = 190;
                }
                C == 190 && (Ce | 0) != -1 ? (Td = Ud, sc = Ce, o = sc >> 2, C = 195) : (h[T + 440 >> 2] |= 4, C = 192);
              }
            } else {
              C = 192;
            }
          } while (0);
          if (C == 192) {
            var Zf = h[rt + 8 >> 2], Hh = Zf + (R + 47) & -Zf;
            if (Hh >>> 0 < 2147483647) {
              var Pe = tt(Hh), yg = tt(0);
              if ((yg | 0) != -1 & (Pe | 0) != -1 & Pe >>> 0 < yg >>> 0) {
                var yf = yg - Pe | 0;
                yf >>> 0 <= (R + 40 | 0) >>> 0 | (Pe | 0) == -1 ? C = 333 : (Td = yf, sc = Pe, o = sc >> 2, C = 195);
              } else {
                C = 333;
              }
            } else {
              C = 333;
            }
          }
          do {
            if (C == 195) {
              var kf = h[T + 432 >> 2] + Td | 0;
              h[T + 432 >> 2] = kf;
              kf >>> 0 > k[T + 436 >> 2] >>> 0 && (h[T + 436 >> 2] = kf);
              var Hd = k[T + 24 >> 2];
              n = Hd >> 2;
              var $f = (Hd | 0) == 0;
              b : do {
                if ($f) {
                  var dh = k[T + 16 >> 2];
                  (dh | 0) == 0 | sc >>> 0 < dh >>> 0 && (h[T + 16 >> 2] = sc);
                  h[T + 444 >> 2] = sc;
                  h[T + 448 >> 2] = Td;
                  h[T + 456 >> 2] = 0;
                  h[T + 36 >> 2] = h[rt >> 2];
                  h[T + 32 >> 2] = -1;
                  for (var zg = 0; ; ) {
                    var ag = zg << 1, Ag = (ag << 2) + T + 40 | 0;
                    h[T + (ag + 3 << 2) + 40 >> 2] = Ag;
                    h[T + (ag + 2 << 2) + 40 >> 2] = Ag;
                    var bg = zg + 1 | 0;
                    if ((bg | 0) == 32) {
                      break;
                    }
                    zg = bg;
                  }
                  var cg = sc + 8 | 0, Md = (cg & 7 | 0) == 0 ? 0 : -cg & 7, te = Td - 40 - Md | 0;
                  h[T + 24 >> 2] = sc + Md | 0;
                  h[T + 12 >> 2] = te;
                  h[(Md + 4 >> 2) + o] = te | 1;
                  h[(Td - 36 >> 2) + o] = 40;
                  h[T + 28 >> 2] = h[rt + 16 >> 2];
                } else {
                  var fe = T + 444 | 0;
                  for (m = fe >> 2; ; ) {
                    if ((fe | 0) == 0) {
                      break;
                    }
                    var Bg = k[m], dg = fe + 4 | 0, Cg = k[dg >> 2], ge = Bg + Cg | 0;
                    if ((sc | 0) == (ge | 0)) {
                      if ((h[m + 3] & 8 | 0) != 0) {
                        break;
                      }
                      var he = Hd;
                      if (!(he >>> 0 >= Bg >>> 0 & he >>> 0 < ge >>> 0)) {
                        break;
                      }
                      h[dg >> 2] = Cg + Td | 0;
                      var zf = h[T + 24 >> 2], Qe = h[T + 12 >> 2] + Td | 0, ie = zf, lf = zf + 8 | 0, Af = (lf & 7 | 0) == 0 ? 0 : -lf & 7, Dg = Qe - Af | 0;
                      h[T + 24 >> 2] = ie + Af | 0;
                      h[T + 12 >> 2] = Dg;
                      h[(Af + (ie + 4) | 0) >> 2] = Dg | 1;
                      h[(Qe + (ie + 4) | 0) >> 2] = 40;
                      h[T + 28 >> 2] = h[rt + 16 >> 2];
                      break b;
                    }
                    fe = h[m + 2];
                    m = fe >> 2;
                  }
                  sc >>> 0 < k[T + 16 >> 2] >>> 0 && (h[T + 16 >> 2] = sc);
                  for (var eh = sc + Td | 0, Id = T + 444 | 0; ; ) {
                    if ((Id | 0) == 0) {
                      C = 295;
                      break;
                    }
                    var De = Id | 0, rd = k[De >> 2];
                    j = rd >> 2;
                    if ((rd | 0) == (eh | 0)) {
                      C = 219;
                      break;
                    }
                    Id = h[Id + 8 >> 2];
                  }
                  do {
                    if (C == 219 && (h[Id + 12 >> 2] & 8 | 0) == 0) {
                      h[De >> 2] = sc;
                      var Eg = Id + 4 | 0;
                      h[Eg >> 2] = h[Eg >> 2] + Td | 0;
                      var mf = sc + 8 | 0, Ee = (mf & 7 | 0) == 0 ? 0 : -mf & 7, Re = rd + 8 | 0, Vd = (Re & 7 | 0) == 0 ? 0 : -Re & 7;
                      i = Vd >> 2;
                      var Bf = rd + Vd | 0, eg = Bf, nf = Ee + R | 0;
                      g = nf >> 2;
                      var Yd = sc + nf | 0, Fe = Yd, Ge = Bf - (sc + Ee) - R | 0;
                      h[(Ee + 4 >> 2) + o] = R | 3;
                      var Ih = (eg | 0) == (h[T + 24 >> 2] | 0);
                      c : do {
                        if (Ih) {
                          var Fg = h[T + 12 >> 2] + Ge | 0;
                          h[T + 12 >> 2] = Fg;
                          h[T + 24 >> 2] = Fe;
                          h[g + (o + 1)] = Fg | 1;
                        } else {
                          if ((eg | 0) == (h[T + 20 >> 2] | 0)) {
                            var Se = h[T + 8 >> 2] + Ge | 0;
                            h[T + 8 >> 2] = Se;
                            h[T + 20 >> 2] = Fe;
                            h[g + (o + 1)] = Se | 1;
                            h[(sc + Se + nf | 0) >> 2] = Se;
                          } else {
                            var of = k[i + (j + 1)];
                            if ((of & 3 | 0) == 1) {
                              var Cf = of & -8, He = of >>> 3, fg = of >>> 0 < 256;
                              d : do {
                                if (fg) {
                                  var pf = k[((Vd | 8) >> 2) + j], Df = k[i + (j + 3)];
                                  if ((pf | 0) == (Df | 0)) {
                                    h[T >> 2] &= 1 << He ^ -1;
                                  } else {
                                    var Gg = ((of >>> 2 & 1073741822) << 2) + T + 40 | 0;
                                    C = (pf | 0) == (Gg | 0) ? 234 : pf >>> 0 < k[T + 16 >> 2] >>> 0 ? 237 : 234;
                                    do {
                                      if (C == 234 && !((Df | 0) != (Gg | 0) && Df >>> 0 < k[T + 16 >> 2] >>> 0)) {
                                        h[pf + 12 >> 2] = Df;
                                        h[Df + 8 >> 2] = pf;
                                        break d;
                                      }
                                    } while (0);
                                    qt();
                                    ta("Reached an unreachable!");
                                  }
                                } else {
                                  var Ef = Bf, gg = k[((Vd | 24) >> 2) + j], $c = k[i + (j + 3)], Yk = ($c | 0) == (Ef | 0);
                                  do {
                                    if (Yk) {
                                      var sd = Vd | 16, Hj = sd + (rd + 4) | 0, Ff = h[Hj >> 2];
                                      if ((Ff | 0) == 0) {
                                        var qf = rd + sd | 0, Ji = h[qf >> 2];
                                        if ((Ji | 0) == 0) {
                                          var Zd = 0;
                                          f = Zd >> 2;
                                          break;
                                        }
                                        var Gf = qf, rf = Ji;
                                      } else {
                                        Gf = Hj, rf = Ff, C = 244;
                                      }
                                      for (;;) {
                                        var Hg = rf + 20 | 0, Jh = h[Hg >> 2];
                                        if ((Jh | 0) != 0) {
                                          Gf = Hg, rf = Jh;
                                        } else {
                                          var Kh = rf + 16 | 0, Lh = k[Kh >> 2];
                                          if ((Lh | 0) == 0) {
                                            break;
                                          }
                                          Gf = Kh;
                                          rf = Lh;
                                        }
                                      }
                                      Gf >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[Gf >> 2] = 0, Zd = rf, f = Zd >> 2);
                                    } else {
                                      var fh = k[((Vd | 8) >> 2) + j];
                                      fh >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[fh + 12 >> 2] = $c, h[$c + 8 >> 2] = fh, Zd = $c, f = Zd >> 2);
                                    }
                                  } while (0);
                                  if ((gg | 0) != 0) {
                                    var Ki = Vd + (rd + 28) | 0, Li = (h[Ki >> 2] << 2) + T + 304 | 0, Mi = (Ef | 0) == (h[Li >> 2] | 0);
                                    do {
                                      if (Mi) {
                                        h[Li >> 2] = Zd;
                                        if ((Zd | 0) != 0) {
                                          break;
                                        }
                                        h[T + 4 >> 2] &= 1 << h[Ki >> 2] ^ -1;
                                        break d;
                                      }
                                      if (gg >>> 0 < k[T + 16 >> 2] >>> 0) {
                                        qt(), ta("Reached an unreachable!");
                                      } else {
                                        var Ni = gg + 16 | 0;
                                        (h[Ni >> 2] | 0) == (Ef | 0) ? h[Ni >> 2] = Zd : h[gg + 20 >> 2] = Zd;
                                        if ((Zd | 0) == 0) {
                                          break d;
                                        }
                                      }
                                    } while (0);
                                    if (Zd >>> 0 < k[T + 16 >> 2] >>> 0) {
                                      qt(), ta("Reached an unreachable!");
                                    } else {
                                      h[f + 6] = gg;
                                      var Oi = Vd | 16, hg = k[(Oi >> 2) + j];
                                      (hg | 0) != 0 && (hg >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[f + 4] = hg, h[hg + 24 >> 2] = Zd));
                                      var ig = k[(Oi + 4 >> 2) + j];
                                      (ig | 0) != 0 && (ig >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[f + 5] = ig, h[ig + 24 >> 2] = Zd));
                                    }
                                  }
                                }
                              } while (0);
                              var Pi = rd + (Cf | Vd) | 0, ue = Cf + Ge | 0;
                            } else {
                              Pi = eg, ue = Ge;
                            }
                            h[(Pi + 4 | 0) >> 2] &= -2;
                            h[g + (o + 1)] = ue | 1;
                            h[(ue >> 2) + o + g] = ue;
                            if (ue >>> 0 < 256) {
                              var Ig = ue >>> 2 & 1073741822, Qi = (Ig << 2) + T + 40 | 0, Ri = k[T >> 2], Si = 1 << (ue >>> 3);
                              if ((Ri & Si | 0) == 0) {
                                h[T >> 2] = Ri | Si;
                                var Hf = Qi, Mh = (Ig + 2 << 2) + T + 40 | 0;
                              } else {
                                var Ti = (Ig + 2 << 2) + T + 40 | 0, gh = k[Ti >> 2];
                                gh >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (Hf = gh, Mh = Ti);
                              }
                              h[Mh >> 2] = Fe;
                              h[Hf + 12 >> 2] = Fe;
                              h[g + (o + 2)] = Hf;
                              h[g + (o + 3)] = Qi;
                            } else {
                              var Dc = Yd, hh = ue >>> 8;
                              if ((hh | 0) == 0) {
                                var Te = 0;
                              } else {
                                if (ue >>> 0 > 16777215) {
                                  Te = 31;
                                } else {
                                  var Ui = (hh + 1048320 | 0) >>> 16 & 8, Nh = hh << Ui, Vi = (Nh + 520192 | 0) >>> 16 & 4, Wi = Nh << Vi, Oh = (Wi + 245760 | 0) >>> 16 & 2, Jg = 14 - (Vi | Ui | Oh) + (Wi << Oh >>> 15) | 0, Te = ue >>> ((Jg + 7 | 0) >>> 0) & 1 | Jg << 1;
                                }
                              }
                              var ve = (Te << 2) + T + 304 | 0;
                              h[g + (o + 7)] = Te;
                              h[g + (o + 5)] = 0;
                              h[g + (o + 4)] = 0;
                              var Ie = h[T + 4 >> 2], Ph = 1 << Te;
                              if ((Ie & Ph | 0) == 0) {
                                h[T + 4 >> 2] = Ie | Ph, h[ve >> 2] = Dc, h[g + (o + 6)] = ve, h[g + (o + 3)] = Dc, h[g + (o + 2)] = Dc;
                              } else {
                                for (var Qh = ue << ((Te | 0) == 31 ? 0 : 25 - (Te >>> 1) | 0), If = h[ve >> 2]; ; ) {
                                  if ((h[If + 4 >> 2] & -8 | 0) == (ue | 0)) {
                                    var Xi = If + 8 | 0, ih = k[Xi >> 2], jh = k[T + 16 >> 2], Zk = If >>> 0 < jh >>> 0;
                                    do {
                                      if (!Zk && ih >>> 0 >= jh >>> 0) {
                                        h[ih + 12 >> 2] = Dc;
                                        h[Xi >> 2] = Dc;
                                        h[g + (o + 2)] = ih;
                                        h[g + (o + 3)] = If;
                                        h[g + (o + 6)] = 0;
                                        break c;
                                      }
                                    } while (0);
                                    qt();
                                    ta("Reached an unreachable!");
                                  } else {
                                    var Kg = (Qh >>> 31 << 2) + If + 16 | 0, kh = k[Kg >> 2];
                                    if ((kh | 0) == 0) {
                                      if (Kg >>> 0 >= k[T + 16 >> 2] >>> 0) {
                                        h[Kg >> 2] = Dc;
                                        h[g + (o + 6)] = If;
                                        h[g + (o + 3)] = Dc;
                                        h[g + (o + 2)] = Dc;
                                        break c;
                                      }
                                      qt();
                                      ta("Reached an unreachable!");
                                    } else {
                                      Qh <<= 1, If = kh;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      } while (0);
                      L = sc + (Ee | 8) | 0;
                      break a;
                    }
                  } while (0);
                  var Jf = Hd, lh = T + 444 | 0;
                  for (e = lh >> 2; ; ) {
                    var Rh = k[e];
                    if (Rh >>> 0 <= Jf >>> 0) {
                      var Ij = k[e + 1];
                      if ((Rh + Ij | 0) >>> 0 > Jf >>> 0) {
                        var mh = Rh, Lg = Ij;
                        break;
                      }
                    }
                    var Jj = k[e + 2];
                    if ((Jj | 0) != 0) {
                      lh = Jj, e = lh >> 2;
                    } else {
                      mh = 0;
                      Lg = 4;
                      break;
                    }
                  }
                  var Kj = mh + Lg | 0, Sh = mh + (Lg - 39) | 0, Th = mh + (Lg - 47) + ((Sh & 7 | 0) == 0 ? 0 : -Sh & 7) | 0, jg = Th >>> 0 < (Hd + 16 | 0) >>> 0 ? Jf : Th, Yi = jg + 8 | 0;
                  d = Yi >> 2;
                  var Zi = Yi, Uh = sc + 8 | 0, Je = (Uh & 7 | 0) == 0 ? 0 : -Uh & 7, Vh = Td - 40 - Je | 0;
                  h[T + 24 >> 2] = sc + Je | 0;
                  h[T + 12 >> 2] = Vh;
                  h[(Je + 4 >> 2) + o] = Vh | 1;
                  h[(Td - 36 >> 2) + o] = 40;
                  h[T + 28 >> 2] = h[rt + 16 >> 2];
                  h[jg + 4 >> 2] = 27;
                  h[d] = h[T + 444 >> 2];
                  h[d + 1] = h[T + 448 >> 2];
                  h[d + 2] = h[T + 452 >> 2];
                  h[d + 3] = h[T + 456 >> 2];
                  h[T + 444 >> 2] = sc;
                  h[T + 448 >> 2] = Td;
                  h[T + 456 >> 2] = 0;
                  h[T + 452 >> 2] = Zi;
                  var $i = jg + 28 | 0;
                  h[$i >> 2] = 7;
                  var Wh = (jg + 32 | 0) >>> 0 < Kj >>> 0;
                  c : do {
                    if (Wh) {
                      for (var Mg = $i; ; ) {
                        var Xh = Mg + 4 | 0;
                        h[Xh >> 2] = 7;
                        if ((Mg + 8 | 0) >>> 0 >= Kj >>> 0) {
                          break c;
                        }
                        Mg = Xh;
                      }
                    }
                  } while (0);
                  if ((jg | 0) != (Jf | 0)) {
                    var je = jg - Hd | 0, Lj = Jf + je | 0;
                    h[(je + (Jf + 4) | 0) >> 2] &= -2;
                    h[n + 1] = je | 1;
                    h[Lj >> 2] = je;
                    if (je >>> 0 < 256) {
                      var nh = je >>> 2 & 1073741822, Yh = (nh << 2) + T + 40 | 0, Zh = k[T >> 2], $h = 1 << (je >>> 3);
                      if ((Zh & $h | 0) == 0) {
                        h[T >> 2] = Zh | $h;
                        var ai = Yh, aj = (nh + 2 << 2) + T + 40 | 0;
                      } else {
                        var bi = (nh + 2 << 2) + T + 40 | 0, ci = k[bi >> 2];
                        ci >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (ai = ci, aj = bi);
                      }
                      h[aj >> 2] = Hd;
                      h[ai + 12 >> 2] = Hd;
                      h[n + 2] = ai;
                      h[n + 3] = Yh;
                    } else {
                      var Ng = Hd, oh = je >>> 8;
                      if ((oh | 0) == 0) {
                        var Kf = 0;
                      } else {
                        if (je >>> 0 > 16777215) {
                          Kf = 31;
                        } else {
                          var Mj = (oh + 1048320 | 0) >>> 16 & 8, Nj = oh << Mj, sf = (Nj + 520192 | 0) >>> 16 & 4, di = Nj << sf, ei = (di + 245760 | 0) >>> 16 & 2, bj = 14 - (sf | Mj | ei) + (di << ei >>> 15) | 0, Kf = je >>> ((bj + 7 | 0) >>> 0) & 1 | bj << 1;
                        }
                      }
                      var fi = (Kf << 2) + T + 304 | 0;
                      h[n + 7] = Kf;
                      h[n + 5] = 0;
                      h[n + 4] = 0;
                      var gi = h[T + 4 >> 2], cj = 1 << Kf;
                      if ((gi & cj | 0) == 0) {
                        h[T + 4 >> 2] = gi | cj, h[fi >> 2] = Ng, h[n + 6] = fi, h[n + 3] = Hd, h[n + 2] = Hd;
                      } else {
                        for (var hi = je << ((Kf | 0) == 31 ? 0 : 25 - (Kf >>> 1) | 0), Ue = h[fi >> 2]; ; ) {
                          if ((h[Ue + 4 >> 2] & -8 | 0) == (je | 0)) {
                            var ii = Ue + 8 | 0, Og = k[ii >> 2], ji = k[T + 16 >> 2], dj = Ue >>> 0 < ji >>> 0;
                            do {
                              if (!dj && Og >>> 0 >= ji >>> 0) {
                                h[Og + 12 >> 2] = Ng;
                                h[ii >> 2] = Ng;
                                h[n + 2] = Og;
                                h[n + 3] = Ue;
                                h[n + 6] = 0;
                                break b;
                              }
                            } while (0);
                            qt();
                            ta("Reached an unreachable!");
                          } else {
                            var ej = (hi >>> 31 << 2) + Ue + 16 | 0, Lf = k[ej >> 2];
                            if ((Lf | 0) == 0) {
                              if (ej >>> 0 >= k[T + 16 >> 2] >>> 0) {
                                h[ej >> 2] = Ng;
                                h[n + 6] = Ue;
                                h[n + 3] = Hd;
                                h[n + 2] = Hd;
                                break b;
                              }
                              qt();
                              ta("Reached an unreachable!");
                            } else {
                              hi <<= 1, Ue = Lf;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } while (0);
              var fj = k[T + 12 >> 2];
              if (fj >>> 0 > R >>> 0) {
                var gj = fj - R | 0;
                h[T + 12 >> 2] = gj;
                var ki = k[T + 24 >> 2], Mf = ki;
                h[T + 24 >> 2] = Mf + R | 0;
                h[(Mf + 4 >> 2) + I] = gj | 1;
                h[ki + 4 >> 2] = R | 3;
                L = ki + 8 | 0;
                break a;
              }
            }
          } while (0);
          h[ut >> 2] = 12;
          L = 0;
        }
      } else {
        var ph = Sf - R | 0, Nf = k[T + 20 >> 2];
        if (ph >>> 0 > 15) {
          var hj = Nf;
          h[T + 20 >> 2] = hj + R | 0;
          h[T + 8 >> 2] = ph;
          h[(hj + 4 >> 2) + I] = ph | 1;
          h[hj + Sf >> 2] = ph;
          h[Nf + 4 >> 2] = R | 3;
        } else {
          h[T + 8 >> 2] = 0, h[T + 20 >> 2] = 0, h[Nf + 4 >> 2] = Sf | 3, h[(Sf + (Nf + 4) | 0) >> 2] |= 1;
        }
        L = Nf + 8 | 0;
      }
    }
  } while (0);
  return L;
}

function yp(c) {
  var d, e, f, g, i, j, m, n, o = c >> 2, q, p = (c | 0) == 0;
  a : do {
    if (!p) {
      var r = c - 8 | 0, s = r, u = k[T + 16 >> 2], z = r >>> 0 < u >>> 0;
      b : do {
        if (!z) {
          var E = k[c - 4 >> 2], A = E & 3;
          if ((A | 0) != 1) {
            var I = E & -8;
            n = I >> 2;
            var C = c + (I - 8) | 0, K = C, J = (E & 1 | 0) == 0;
            c : do {
              if (J) {
                var N = k[r >> 2];
                if ((A | 0) == 0) {
                  break a;
                }
                var B = -8 - N | 0;
                m = B >> 2;
                var F = c + B | 0, H = F, O = N + I | 0;
                if (F >>> 0 < u >>> 0) {
                  break b;
                }
                if ((H | 0) == (h[T + 20 >> 2] | 0)) {
                  j = (c + (I - 4) | 0) >> 2;
                  if ((h[j] & 3 | 0) != 3) {
                    var D = H;
                    i = D >> 2;
                    var Q = O;
                    break;
                  }
                  h[T + 8 >> 2] = O;
                  h[j] &= -2;
                  h[m + (o + 1)] = O | 1;
                  h[C >> 2] = O;
                  break a;
                }
                if (N >>> 0 < 256) {
                  var P = k[m + (o + 2)], M = k[m + (o + 3)];
                  if ((P | 0) == (M | 0)) {
                    h[T >> 2] &= 1 << (N >>> 3) ^ -1, D = H, i = D >> 2, Q = O;
                  } else {
                    var Na = ((N >>> 2 & 1073741822) << 2) + T + 40 | 0, U = (P | 0) != (Na | 0) & P >>> 0 < u >>> 0;
                    do {
                      if (!U && (M | 0) == (Na | 0) | M >>> 0 >= u >>> 0) {
                        h[P + 12 >> 2] = M;
                        h[M + 8 >> 2] = P;
                        D = H;
                        i = D >> 2;
                        Q = O;
                        break c;
                      }
                    } while (0);
                    qt();
                    ta("Reached an unreachable!");
                  }
                } else {
                  var L = F, R = k[m + (o + 6)], la = k[m + (o + 3)], Da = (la | 0) == (L | 0);
                  do {
                    if (Da) {
                      var Y = B + (c + 20) | 0, Z = h[Y >> 2];
                      if ((Z | 0) == 0) {
                        var W = B + (c + 16) | 0, wa = h[W >> 2];
                        if ((wa | 0) == 0) {
                          var X = 0;
                          g = X >> 2;
                          break;
                        }
                        var aa = W, ga = wa;
                      } else {
                        aa = Y, ga = Z, q = 20;
                      }
                      for (;;) {
                        var ca = ga + 20 | 0, La = h[ca >> 2];
                        if ((La | 0) != 0) {
                          aa = ca, ga = La;
                        } else {
                          var Ua = ga + 16 | 0, Va = k[Ua >> 2];
                          if ((Va | 0) == 0) {
                            break;
                          }
                          aa = Ua;
                          ga = Va;
                        }
                      }
                      aa >>> 0 < u >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[aa >> 2] = 0, X = ga, g = X >> 2);
                    } else {
                      var ma = k[m + (o + 2)];
                      ma >>> 0 < u >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[ma + 12 >> 2] = la, h[la + 8 >> 2] = ma, X = la, g = X >> 2);
                    }
                  } while (0);
                  if ((R | 0) == 0) {
                    D = H, i = D >> 2, Q = O;
                  } else {
                    var xa = B + (c + 28) | 0, ua = (h[xa >> 2] << 2) + T + 304 | 0, da = (L | 0) == (h[ua >> 2] | 0);
                    do {
                      if (da) {
                        h[ua >> 2] = X;
                        if ((X | 0) != 0) {
                          break;
                        }
                        h[T + 4 >> 2] &= 1 << h[xa >> 2] ^ -1;
                        D = H;
                        i = D >> 2;
                        Q = O;
                        break c;
                      }
                      if (R >>> 0 < k[T + 16 >> 2] >>> 0) {
                        qt(), ta("Reached an unreachable!");
                      } else {
                        var ya = R + 16 | 0;
                        (h[ya >> 2] | 0) == (L | 0) ? h[ya >> 2] = X : h[R + 20 >> 2] = X;
                        if ((X | 0) == 0) {
                          D = H;
                          i = D >> 2;
                          Q = O;
                          break c;
                        }
                      }
                    } while (0);
                    if (X >>> 0 < k[T + 16 >> 2] >>> 0) {
                      qt(), ta("Reached an unreachable!");
                    } else {
                      h[g + 6] = R;
                      var Ha = k[m + (o + 4)];
                      (Ha | 0) != 0 && (Ha >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[g + 4] = Ha, h[Ha + 24 >> 2] = X));
                      var ab = k[m + (o + 5)];
                      (ab | 0) == 0 ? (D = H, i = D >> 2, Q = O) : ab >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[g + 5] = ab, h[ab + 24 >> 2] = X, D = H, i = D >> 2, Q = O);
                    }
                  }
                }
              } else {
                D = s, i = D >> 2, Q = I;
              }
            } while (0);
            var bb = D;
            if (bb >>> 0 < C >>> 0) {
              var ob = c + (I - 4) | 0, gb = k[ob >> 2];
              if ((gb & 1 | 0) != 0) {
                var yb = (gb & 2 | 0) == 0;
                do {
                  if (yb) {
                    if ((K | 0) == (h[T + 24 >> 2] | 0)) {
                      var db = h[T + 12 >> 2] + Q | 0;
                      h[T + 12 >> 2] = db;
                      h[T + 24 >> 2] = D;
                      h[i + 1] = db | 1;
                      (D | 0) == (h[T + 20 >> 2] | 0) && (h[T + 20 >> 2] = 0, h[T + 8 >> 2] = 0);
                      if (db >>> 0 <= k[T + 28 >> 2] >>> 0) {
                        break a;
                      }
                      if ((h[rt >> 2] | 0) == 0 && (h[rt >> 2] | 0) == 0) {
                        var eb = st();
                        (eb - 1 & eb | 0) == 0 ? (h[rt + 8 >> 2] = eb, h[rt + 4 >> 2] = eb, h[rt + 12 >> 2] = -1, h[rt + 16 >> 2] = 2097152, h[rt + 20 >> 2] = 0, h[T + 440 >> 2] = 0, h[rt >> 2] = Math.floor(Date.now() / 1e3) & -16 ^ 1431655768) : (qt(), ta("Reached an unreachable!"));
                      }
                      var pa = k[T + 24 >> 2];
                      if ((pa | 0) == 0) {
                        break a;
                      }
                      var $ = k[T + 12 >> 2], Oa = $ >>> 0 > 40;
                      do {
                        if (Oa) {
                          var ea = k[rt + 8 >> 2], ha = (Math.floor((($ - 41 + ea | 0) >>> 0) / (ea >>> 0)) - 1) * ea | 0, ja = pa, ka = T + 444 | 0;
                          for (f = ka >> 2; ; ) {
                            var za = k[f];
                            if (za >>> 0 <= ja >>> 0 && (za + h[f + 1] | 0) >>> 0 > ja >>> 0) {
                              var qa = ka;
                              break;
                            }
                            var Aa = k[f + 2];
                            if ((Aa | 0) == 0) {
                              qa = 0;
                              break;
                            }
                            ka = Aa;
                            f = ka >> 2;
                          }
                          if ((h[qa + 12 >> 2] & 8 | 0) == 0) {
                            var fb = tt(0);
                            e = (qa + 4 | 0) >> 2;
                            if ((fb | 0) == (h[qa >> 2] + h[e] | 0)) {
                              var na = tt(-(ha >>> 0 > 2147483646 ? -2147483648 - ea | 0 : ha) | 0), Pa = tt(0);
                              if ((na | 0) != -1 & Pa >>> 0 < fb >>> 0) {
                                var mb = fb - Pa | 0;
                                if ((fb | 0) != (Pa | 0)) {
                                  h[e] = h[e] - mb | 0;
                                  h[T + 432 >> 2] = h[T + 432 >> 2] - mb | 0;
                                  var lb = h[T + 24 >> 2], pb = h[T + 12 >> 2] - mb | 0, Cb = lb, hb = lb + 8 | 0, Qa = (hb & 7 | 0) == 0 ? 0 : -hb & 7, ba = pb - Qa | 0;
                                  h[T + 24 >> 2] = Cb + Qa | 0;
                                  h[T + 12 >> 2] = ba;
                                  h[(Qa + (Cb + 4) | 0) >> 2] = ba | 1;
                                  h[(pb + (Cb + 4) | 0) >> 2] = 40;
                                  h[T + 28 >> 2] = h[rt + 16 >> 2];
                                  break a;
                                }
                              }
                            }
                          }
                        }
                      } while (0);
                      if (k[T + 12 >> 2] >>> 0 <= k[T + 28 >> 2] >>> 0) {
                        break a;
                      }
                      h[T + 28 >> 2] = -1;
                      break a;
                    }
                    if ((K | 0) == (h[T + 20 >> 2] | 0)) {
                      var ra = h[T + 8 >> 2] + Q | 0;
                      h[T + 8 >> 2] = ra;
                      h[T + 20 >> 2] = D;
                      h[i + 1] = ra | 1;
                      h[(bb + ra | 0) >> 2] = ra;
                      break a;
                    }
                    var Ma = (gb & -8) + Q | 0, Wa = gb >>> 3, Ca = gb >>> 0 < 256;
                    c : do {
                      if (Ca) {
                        var Ba = k[o + n], Xa = k[((I | 4) >> 2) + o];
                        if ((Ba | 0) == (Xa | 0)) {
                          h[T >> 2] &= 1 << Wa ^ -1;
                        } else {
                          var fa = ((gb >>> 2 & 1073741822) << 2) + T + 40 | 0;
                          q = (Ba | 0) == (fa | 0) ? 81 : Ba >>> 0 < k[T + 16 >> 2] >>> 0 ? 84 : 81;
                          do {
                            if (q == 81 && !((Xa | 0) != (fa | 0) && Xa >>> 0 < k[T + 16 >> 2] >>> 0)) {
                              h[Ba + 12 >> 2] = Xa;
                              h[Xa + 8 >> 2] = Ba;
                              break c;
                            }
                          } while (0);
                          qt();
                          ta("Reached an unreachable!");
                        }
                      } else {
                        var Ra = C, Za = k[n + (o + 4)], nb = k[((I | 4) >> 2) + o], Fb = (nb | 0) == (Ra | 0);
                        do {
                          if (Fb) {
                            var qb = I + (c + 12) | 0, Ia = h[qb >> 2];
                            if ((Ia | 0) == 0) {
                              var rb = I + (c + 8) | 0, Ya = h[rb >> 2];
                              if ((Ya | 0) == 0) {
                                var oa = 0;
                                d = oa >> 2;
                                break;
                              }
                              var Fa = rb, $a = Ya;
                            } else {
                              Fa = qb, $a = Ia, q = 91;
                            }
                            for (;;) {
                              var Ea = $a + 20 | 0, Ga = h[Ea >> 2];
                              if ((Ga | 0) != 0) {
                                Fa = Ea, $a = Ga;
                              } else {
                                var Ja = $a + 16 | 0, Sa = k[Ja >> 2];
                                if ((Sa | 0) == 0) {
                                  break;
                                }
                                Fa = Ja;
                                $a = Sa;
                              }
                            }
                            Fa >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[Fa >> 2] = 0, oa = $a, d = oa >> 2);
                          } else {
                            var vb = k[o + n];
                            vb >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[vb + 12 >> 2] = nb, h[nb + 8 >> 2] = vb, oa = nb, d = oa >> 2);
                          }
                        } while (0);
                        if ((Za | 0) != 0) {
                          var Gb = I + (c + 20) | 0, zb = (h[Gb >> 2] << 2) + T + 304 | 0, Nb = (Ra | 0) == (h[zb >> 2] | 0);
                          do {
                            if (Nb) {
                              h[zb >> 2] = oa;
                              if ((oa | 0) != 0) {
                                break;
                              }
                              h[T + 4 >> 2] &= 1 << h[Gb >> 2] ^ -1;
                              break c;
                            }
                            if (Za >>> 0 < k[T + 16 >> 2] >>> 0) {
                              qt(), ta("Reached an unreachable!");
                            } else {
                              var Ob = Za + 16 | 0;
                              (h[Ob >> 2] | 0) == (Ra | 0) ? h[Ob >> 2] = oa : h[Za + 20 >> 2] = oa;
                              if ((oa | 0) == 0) {
                                break c;
                              }
                            }
                          } while (0);
                          if (oa >>> 0 < k[T + 16 >> 2] >>> 0) {
                            qt(), ta("Reached an unreachable!");
                          } else {
                            h[d + 6] = Za;
                            var Db = k[n + (o + 2)];
                            (Db | 0) != 0 && (Db >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[d + 4] = Db, h[Db + 24 >> 2] = oa));
                            var Pb = k[n + (o + 3)];
                            (Pb | 0) != 0 && (Pb >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (h[d + 5] = Pb, h[Pb + 24 >> 2] = oa));
                          }
                        }
                      }
                    } while (0);
                    h[i + 1] = Ma | 1;
                    h[bb + Ma >> 2] = Ma;
                    if ((D | 0) != (h[T + 20 >> 2] | 0)) {
                      var Ab = Ma;
                    } else {
                      h[T + 8 >> 2] = Ma;
                      break a;
                    }
                  } else {
                    h[ob >> 2] = gb & -2, h[i + 1] = Q | 1, Ab = h[bb + Q >> 2] = Q;
                  }
                } while (0);
                if (Ab >>> 0 < 256) {
                  var Eb = Ab >>> 2 & 1073741822, sb = (Eb << 2) + T + 40 | 0, cb = k[T >> 2], Mb = 1 << (Ab >>> 3);
                  if ((cb & Mb | 0) == 0) {
                    h[T >> 2] = cb | Mb;
                    var wb = sb, tb = (Eb + 2 << 2) + T + 40 | 0;
                  } else {
                    var V = (Eb + 2 << 2) + T + 40 | 0, ia = k[V >> 2];
                    ia >>> 0 < k[T + 16 >> 2] >>> 0 ? (qt(), ta("Reached an unreachable!")) : (wb = ia, tb = V);
                  }
                  h[tb >> 2] = D;
                  h[wb + 12 >> 2] = D;
                  h[i + 2] = wb;
                  h[i + 3] = sb;
                  break a;
                }
                var Hb = D, Qb = Ab >>> 8;
                if ((Qb | 0) == 0) {
                  var Bb = 0;
                } else {
                  if (Ab >>> 0 > 16777215) {
                    Bb = 31;
                  } else {
                    var Ib = (Qb + 1048320 | 0) >>> 16 & 8, Xb = Qb << Ib, ec = (Xb + 520192 | 0) >>> 16 & 4, Ka = Xb << ec, Jb = (Ka + 245760 | 0) >>> 16 & 2, S = 14 - (ec | Ib | Jb) + (Ka << Jb >>> 15) | 0, Bb = Ab >>> ((S + 7 | 0) >>> 0) & 1 | S << 1;
                  }
                }
                var ub = (Bb << 2) + T + 304 | 0;
                h[i + 7] = Bb;
                h[i + 5] = 0;
                h[i + 4] = 0;
                var Kb = h[T + 4 >> 2], sa = 1 << Bb, Rb = (Kb & sa | 0) == 0;
                c : do {
                  if (Rb) {
                    h[T + 4 >> 2] = Kb | sa, h[ub >> 2] = Hb, h[i + 6] = ub, h[i + 3] = D, h[i + 2] = D;
                  } else {
                    for (var ic = Ab << ((Bb | 0) == 31 ? 0 : 25 - (Bb >>> 1) | 0), $b = h[ub >> 2]; ; ) {
                      if ((h[$b + 4 >> 2] & -8 | 0) == (Ab | 0)) {
                        var ac = $b + 8 | 0, lc = k[ac >> 2], yc = k[T + 16 >> 2], Gc = $b >>> 0 < yc >>> 0;
                        do {
                          if (!Gc && lc >>> 0 >= yc >>> 0) {
                            h[lc + 12 >> 2] = Hb;
                            h[ac >> 2] = Hb;
                            h[i + 2] = lc;
                            h[i + 3] = $b;
                            h[i + 6] = 0;
                            break c;
                          }
                        } while (0);
                        qt();
                        ta("Reached an unreachable!");
                      } else {
                        var zc = (ic >>> 31 << 2) + $b + 16 | 0, mc = k[zc >> 2];
                        if ((mc | 0) == 0) {
                          if (zc >>> 0 >= k[T + 16 >> 2] >>> 0) {
                            h[zc >> 2] = Hb;
                            h[i + 6] = $b;
                            h[i + 3] = D;
                            h[i + 2] = D;
                            break c;
                          }
                          qt();
                          ta("Reached an unreachable!");
                        } else {
                          ic <<= 1, $b = mc;
                        }
                      }
                    }
                  }
                } while (0);
                var bc = h[T + 32 >> 2] - 1 | 0;
                h[T + 32 >> 2] = bc;
                if ((bc | 0) != 0) {
                  break a;
                }
                var cc = h[T + 452 >> 2], Sb = (cc | 0) == 0;
                c : do {
                  if (!Sb) {
                    for (var Lb = cc; ; ) {
                      var ib = h[Lb + 8 >> 2];
                      if ((ib | 0) == 0) {
                        break c;
                      }
                      Lb = ib;
                    }
                  }
                } while (0);
                h[T + 32 >> 2] = -1;
                break a;
              }
            }
          }
        }
      } while (0);
      qt();
      ta("Reached an unreachable!");
    }
  } while (0);
}

function Xp(c, d, e) {
  if (e >= 20 && d % 2 == c % 2) {
    if (d % 4 == c % 4) {
      for (e = d + e; d % 4; ) {
        a[c++] = a[d++];
      }
      d >>= 2;
      c >>= 2;
      for (var f = e >> 2; d < f; ) {
        h[c++] = h[d++];
      }
      d <<= 2;
      for (c <<= 2; d < e; ) {
        a[c++] = a[d++];
      }
    } else {
      e = d + e;
      d % 2 && (a[c++] = a[d++]);
      d >>= 1;
      c >>= 1;
      for (f = e >> 1; d < f; ) {
        b[c++] = b[d++];
      }
      d <<= 1;
      c <<= 1;
      d < e && (a[c++] = a[d++]);
    }
  } else {
    for (; e--; ) {
      a[c++] = a[d++];
    }
  }
}

function sp() {
  vt === va && (vt = Date.now());
  return Math.floor((Date.now() - vt) * 1);
}

var vt, wt = 13, xt = 9, yt = 22, zt = 5, At = 21, Bt = 6;

function Ct(c) {
  ut || (ut = w([ 0 ], "i32", v));
  h[ut >> 2] = c;
}

var ut, Dt = 0, up = 0, Et = 0, Ft = 2, xp = [ Ta ], Gt = !0;

function Ht(c, d) {
  if (typeof c !== "string") {
    return Ta;
  }
  d === va && (d = "/");
  c && c[0] == "/" && (d = "");
  for (var e = (d + "/" + c).split("/").reverse(), f = [ "" ]; e.length; ) {
    var g = e.pop();
    g == "" || g == "." || (g == ".." ? f.length > 1 && f.pop() : f.push(g));
  }
  return f.length == 1 ? "/" : f.join("/");
}

function It(c, d, e) {
  var f = {
    Gc: !1,
    W: !1,
    error: 0,
    name: Ta,
    path: Ta,
    object: Ta,
    Ma: !1,
    Oa: Ta,
    Na: Ta
  }, c = Ht(c);
  if (c == "/") {
    f.Gc = !0, f.W = f.Ma = !0, f.name = "/", f.path = f.Oa = "/", f.object = f.Na = Jt;
  } else {
    if (c !== Ta) {
      for (var e = e || 0, c = c.slice(1).split("/"), g = Jt, i = [ "" ]; c.length; ) {
        if (c.length == 1 && g.u) {
          f.Ma = !0, f.Oa = i.length == 1 ? "/" : i.join("/"), f.Na = g, f.name = c[0];
        }
        var j = c.shift();
        if (g.u) {
          if (g.Qa) {
            if (!g.k.hasOwnProperty(j)) {
              f.error = 2;
              break;
            }
          } else {
            f.error = wt;
            break;
          }
        } else {
          f.error = 20;
          break;
        }
        g = g.k[j];
        if (g.link && !(d && c.length == 0)) {
          if (e > 40) {
            f.error = 40;
            break;
          }
          f = Ht(g.link, i.join("/"));
          return It([ f ].concat(c).join("/"), d, e + 1);
        }
        i.push(j);
        if (c.length == 0) {
          f.W = !0, f.path = i.join("/"), f.object = g;
        }
      }
    }
  }
  return f;
}

function Kt(c) {
  Lt();
  c = It(c, va);
  return c.W ? c.object : (Ct(c.error), Ta);
}

function Mt(c, d, e, f, g) {
  c || (c = "/");
  typeof c === "string" && (c = Kt(c));
  c || (Ct(wt), ta(Error("Parent path must exist.")));
  c.u || (Ct(20), ta(Error("Parent must be a folder.")));
  !c.write && !Gt && (Ct(wt), ta(Error("Parent folder must be writeable.")));
  if (!d || d == "." || d == "..") {
    Ct(2), ta(Error("Name must not be empty."));
  }
  c.k.hasOwnProperty(d) && (Ct(17), ta(Error("Can't overwrite object.")));
  c.k[d] = {
    Qa: f === va ? !0 : f,
    write: g === va ? !1 : g,
    timestamp: Date.now(),
    Fc: Ft++
  };
  for (var i in e) {
    e.hasOwnProperty(i) && (c.k[d][i] = e[i]);
  }
  return c.k[d];
}

function Nt(c, d) {
  return Mt(c, d, {
    u: !0,
    L: !1,
    k: {}
  }, !0, !0);
}

function Ot() {
  var c = "dev/shm/tmp", d = Kt("/");
  d === Ta && ta(Error("Invalid parent."));
  for (c = c.split("/").reverse(); c.length; ) {
    var e = c.pop();
    e && (d.k.hasOwnProperty(e) || Nt(d, e), d = d.k[e]);
  }
}

function Pt(c, d, e, f) {
  !e && !f && ta(Error("A device must have at least one callback defined."));
  var g = {
    L: !0,
    input: e,
    v: f,
    u: !1
  };
  return Mt(c, d, g, Boolean(e), Boolean(f));
}

function Lt() {
  Jt || (Jt = {
    Qa: !0,
    write: !0,
    u: !0,
    L: !1,
    timestamp: Date.now(),
    Fc: 1,
    k: {}
  });
}

function Qt() {
  var c, d, e;
  ne(!Rt, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  Rt = !0;
  Lt();
  c || (c = (function() {
    if (!c.V || !c.V.length) {
      var d;
      typeof window != "undefined" && typeof window.prompt == "function" ? d = window.prompt("Input: ") : typeof readline == "function" && (d = readline());
      d || (d = "");
      c.V = Am(d + "\n", !0);
    }
    return c.V.shift();
  }));
  d || (d = (function(c) {
    c === Ta || c === "\n".charCodeAt(0) ? (d.Pa(d.buffer.join("")), d.buffer = []) : d.buffer.push(String.fromCharCode(c));
  }));
  if (!d.Pa) {
    d.Pa = function(a) { OUTPUT = a };
  }
  if (!d.buffer) {
    d.buffer = [];
  }
  e || (e = d);
  Nt("/", "tmp");
  var f = Nt("/", "dev"), g = Pt(f, "stdin", c), i = Pt(f, "stdout", Ta, d);
  e = Pt(f, "stderr", Ta, e);
  Pt(f, "tty", c, d);
  xp[1] = {
    path: "/dev/stdin",
    object: g,
    position: 0,
    La: !0,
    M: !1,
    Ka: !1,
    error: !1,
    Ia: !1,
    Ra: []
  };
  xp[2] = {
    path: "/dev/stdout",
    object: i,
    position: 0,
    La: !1,
    M: !0,
    Ka: !1,
    error: !1,
    Ia: !1,
    Ra: []
  };
  xp[3] = {
    path: "/dev/stderr",
    object: e,
    position: 0,
    La: !1,
    M: !0,
    Ka: !1,
    error: !1,
    Ia: !1,
    Ra: []
  };
  Dt = w([ 1 ], "void*", v);
  up = w([ 2 ], "void*", v);
  Et = w([ 3 ], "void*", v);
  Ot();
  xp[Dt] = xp[1];
  xp[up] = xp[2];
  xp[Et] = xp[3];
  w([ w([ 0, 0, 0, 0, Dt, 0, 0, 0, up, 0, 0, 0, Et, 0, 0, 0 ], "void*", v) ], "void*", v);
}

var Rt, Jt;

function wp(c, d, e) {
  var f = xp[c];
  if (f) {
    if (f.M) {
      if (e < 0) {
        return Ct(yt), -1;
      } else {
        if (f.object.L) {
          if (f.object.v) {
            for (var g = 0; g < e; g++) {
              try {
                f.object.v(a[d + g]);
              } catch (i) {
                return Ct(zt), -1;
              }
            }
            f.object.timestamp = Date.now();
            return g;
          } else {
            return Ct(Bt), -1;
          }
        } else {
          g = f.position;
          c = xp[c];
          if (!c || c.object.L) {
            Ct(xt), d = -1;
          } else {
            if (c.M) {
              if (c.object.u) {
                Ct(At), d = -1;
              } else {
                if (e < 0 || g < 0) {
                  Ct(yt), d = -1;
                } else {
                  for (var j = c.object.k; j.length < g; ) {
                    j.push(0);
                  }
                  for (var m = 0; m < e; m++) {
                    j[g + m] = Dh[d + m];
                  }
                  c.object.timestamp = Date.now();
                  d = m;
                }
              }
            } else {
              Ct(wt), d = -1;
            }
          }
          d != -1 && (f.position += d);
          return d;
        }
      }
    } else {
      return Ct(wt), -1;
    }
  } else {
    return Ct(xt), -1;
  }
}

function dy(c) {
  function d(d) {
    var e;
    d === "double" ? e = (t[0] = h[c + f >> 2], t[1] = h[c + f + 4 >> 2], Uk[0]) : d == "i64" ? e = [ h[c + f >> 2], h[c + f + 4 >> 2] ] : (d = "i32", e = h[c + f >> 2]);
    f += Math.max(ae(d), ke);
    return e;
  }
  for (var e = y.Ab | 0, f = 0, g = [], i, j; ; ) {
    var m = e;
    i = a[e];
    if (i === 0) {
      break;
    }
    j = a[e + 1];
    if (i == "%".charCodeAt(0)) {
      var n = !1, o = !1, q = !1, p = !1;
      a : for (;;) {
        switch (j) {
         case "+".charCodeAt(0):
          n = !0;
          break;
         case "-".charCodeAt(0):
          o = !0;
          break;
         case "#".charCodeAt(0):
          q = !0;
          break;
         case "0".charCodeAt(0):
          if (p) {
            break a;
          } else {
            p = !0;
            break;
          }
         default:
          break a;
        }
        e++;
        j = a[e + 1];
      }
      var r = 0;
      if (j == "*".charCodeAt(0)) {
        r = d("i32"), e++, j = a[e + 1];
      } else {
        for (; j >= "0".charCodeAt(0) && j <= "9".charCodeAt(0); ) {
          r = r * 10 + (j - "0".charCodeAt(0)), e++, j = a[e + 1];
        }
      }
      var s = !1;
      if (j == ".".charCodeAt(0)) {
        var u = 0, s = !0;
        e++;
        j = a[e + 1];
        if (j == "*".charCodeAt(0)) {
          u = d("i32"), e++;
        } else {
          for (;;) {
            j = a[e + 1];
            if (j < "0".charCodeAt(0) || j > "9".charCodeAt(0)) {
              break;
            }
            u = u * 10 + (j - "0".charCodeAt(0));
            e++;
          }
        }
        j = a[e + 1];
      } else {
        u = 6;
      }
      var z;
      switch (String.fromCharCode(j)) {
       case "h":
        j = a[e + 2];
        j == "h".charCodeAt(0) ? (e++, z = 1) : z = 2;
        break;
       case "l":
        j = a[e + 2];
        j == "l".charCodeAt(0) ? (e++, z = 8) : z = 4;
        break;
       case "L":
       case "q":
       case "j":
        z = 8;
        break;
       case "z":
       case "t":
       case "I":
        z = 4;
        break;
       default:
        z = Ta;
      }
      z && e++;
      j = a[e + 1];
      if ("d,i,u,o,x,X,p".split(",").indexOf(String.fromCharCode(j)) != -1) {
        m = j == "d".charCodeAt(0) || j == "i".charCodeAt(0);
        z = z || 4;
        i = d("i" + z * 8);
        z == 8 && (i = j == "u".charCodeAt(0) ? (i[0] >>> 0) + (i[1] >>> 0) * 4294967296 : (i[0] >>> 0) + (i[1] | 0) * 4294967296);
        z <= 4 && (i = (m ? Lm : Km)(i & Math.pow(256, z) - 1, z * 8));
        var E = Math.abs(i), A, m = "";
        if (j == "d".charCodeAt(0) || j == "i".charCodeAt(0)) {
          A = Lm(i, 8 * z).toString(10);
        } else {
          if (j == "u".charCodeAt(0)) {
            A = Km(i, 8 * z).toString(10), i = Math.abs(i);
          } else {
            if (j == "o".charCodeAt(0)) {
              A = (q ? "0" : "") + E.toString(8);
            } else {
              if (j == "x".charCodeAt(0) || j == "X".charCodeAt(0)) {
                m = q ? "0x" : "";
                if (i < 0) {
                  i = -i;
                  A = (E - 1).toString(16);
                  q = [];
                  for (E = 0; E < A.length; E++) {
                    q.push((15 - parseInt(A[E], 16)).toString(16));
                  }
                  for (A = q.join(""); A.length < z * 2; ) {
                    A = "f" + A;
                  }
                } else {
                  A = E.toString(16);
                }
                j == "X".charCodeAt(0) && (m = m.toUpperCase(), A = A.toUpperCase());
              } else {
                j == "p".charCodeAt(0) && (E === 0 ? A = "(nil)" : (m = "0x", A = E.toString(16)));
              }
            }
          }
        }
        if (s) {
          for (; A.length < u; ) {
            A = "0" + A;
          }
        }
        for (n && (m = i < 0 ? "-" + m : "+" + m); m.length + A.length < r; ) {
          o ? A += " " : p ? A = "0" + A : m = " " + m;
        }
        A = m + A;
        A.split("").forEach((function(c) {
          g.push(c.charCodeAt(0));
        }));
      } else {
        if ("f,F,e,E,g,G".split(",").indexOf(String.fromCharCode(j)) != -1) {
          i = d("double");
          if (isNaN(i)) {
            A = "nan", p = !1;
          } else {
            if (isFinite(i)) {
              s = !1;
              z = Math.min(u, 20);
              if (j == "g".charCodeAt(0) || j == "G".charCodeAt(0)) {
                s = !0, u = u || 1, z = parseInt(i.toExponential(z).split("e")[1], 10), u > z && z >= -4 ? (j = (j == "g".charCodeAt(0) ? "f" : "F").charCodeAt(0), u -= z + 1) : (j = (j == "g".charCodeAt(0) ? "e" : "E").charCodeAt(0), u--), z = Math.min(u, 20);
              }
              if (j == "e".charCodeAt(0) || j == "E".charCodeAt(0)) {
                A = i.toExponential(z), /[eE][-+]\d$/.test(A) && (A = A.slice(0, -1) + "0" + A.slice(-1));
              } else {
                if (j == "f".charCodeAt(0) || j == "F".charCodeAt(0)) {
                  A = i.toFixed(z);
                }
              }
              m = A.split("e");
              if (s && !q) {
                for (; m[0].length > 1 && m[0].indexOf(".") != -1 && (m[0].slice(-1) == "0" || m[0].slice(-1) == "."); ) {
                  m[0] = m[0].slice(0, -1);
                }
              } else {
                for (q && A.indexOf(".") == -1 && (m[0] += "."); u > z++; ) {
                  m[0] += "0";
                }
              }
              A = m[0] + (m.length > 1 ? "e" + m[1] : "");
              j == "E".charCodeAt(0) && (A = A.toUpperCase());
              n && i >= 0 && (A = "+" + A);
            } else {
              A = (i < 0 ? "-" : "") + "inf", p = !1;
            }
          }
          for (; A.length < r; ) {
            o ? A += " " : A = p && (A[0] == "-" || A[0] == "+") ? A[0] + "0" + A.slice(1) : (p ? "0" : " ") + A;
          }
          j < "a".charCodeAt(0) && (A = A.toUpperCase());
          A.split("").forEach((function(c) {
            g.push(c.charCodeAt(0));
          }));
        } else {
          if (j == "s".charCodeAt(0)) {
            (n = d("i8*")) ? (n = Jm(n), s && n.length > u && (n = n.slice(0, u))) : n = Am("(null)", !0);
            if (!o) {
              for (; n.length < r--; ) {
                g.push(" ".charCodeAt(0));
              }
            }
            g = g.concat(n);
            if (o) {
              for (; n.length < r--; ) {
                g.push(" ".charCodeAt(0));
              }
            }
          } else {
            if (j == "c".charCodeAt(0)) {
              for (o && g.push(d("i8")); --r > 0; ) {
                g.push(" ".charCodeAt(0));
              }
              o || g.push(d("i8"));
            } else {
              if (j == "n".charCodeAt(0)) {
                o = d("i32*"), h[o >> 2] = g.length;
              } else {
                if (j == "%".charCodeAt(0)) {
                  g.push(i);
                } else {
                  for (E = m; E < e + 2; E++) {
                    g.push(a[E]);
                  }
                }
              }
            }
          }
        }
      }
      e += 2;
    } else {
      g.push(i), e += 1;
    }
  }
  return g;
}

function tp(c) {
  var d = h[up >> 2], e = dy(c), c = qg;
  var f = w(e, "i8", Vk), e = e.length * 1;
  if (e != 0 && wp(d, f, e) == -1 && xp[d]) {
    xp[d].error = !0;
  }
  qg = c;
}

var Nm = Math.sqrt;

function G(c, d, e, f) {
  ta("Assertion failed: " + Kk(f) + ", at: " + [ Kk(c), d, Kk(e) ]);
}

function Xk(c, d) {
  var e = 0;
  if (d >= 20) {
    for (var f = c + d; c % 4; ) {
      a[c++] = e;
    }
    e < 0 && (e += 256);
    for (var g = c >> 2, i = f >> 2, j = e | e << 8 | e << 16 | e << 24; g < i; ) {
      h[g++] = j;
    }
    for (c = g << 2; c < f; ) {
      a[c++] = e;
    }
  } else {
    for (; d--; ) {
      a[c++] = e;
    }
  }
}

var Ks = Math.sin, Ms = Math.cos, lt = Math.floor;

function et(c) {
  var d = Ke(), e = Date.now();
  h[c + d[0] >> 2] = Math.floor(e / 1e3);
  h[c + d[1] >> 2] = Math.floor((e - 1e3 * Math.floor(e / 1e3)) * 1e3);
}

function qt() {
  ta("ABORT: undefined, at " + Error().stack);
}

function st() {
  switch (8) {
   case 8:
    return Bh;
   case 54:
   case 56:
   case 21:
   case 61:
   case 63:
   case 22:
   case 67:
   case 23:
   case 24:
   case 25:
   case 26:
   case 27:
   case 69:
   case 28:
   case 101:
   case 70:
   case 71:
   case 29:
   case 30:
   case 199:
   case 75:
   case 76:
   case 32:
   case 43:
   case 44:
   case 80:
   case 46:
   case 47:
   case 45:
   case 48:
   case 49:
   case 42:
   case 82:
   case 33:
   case 7:
   case 108:
   case 109:
   case 107:
   case 112:
   case 119:
   case 121:
    return 200809;
   case 13:
   case 104:
   case 94:
   case 95:
   case 34:
   case 35:
   case 77:
   case 81:
   case 83:
   case 84:
   case 85:
   case 86:
   case 87:
   case 88:
   case 89:
   case 90:
   case 91:
   case 94:
   case 95:
   case 110:
   case 111:
   case 113:
   case 114:
   case 115:
   case 116:
   case 117:
   case 118:
   case 120:
   case 40:
   case 16:
   case 79:
   case 19:
    return -1;
   case 92:
   case 93:
   case 5:
   case 72:
   case 6:
   case 74:
   case 92:
   case 93:
   case 96:
   case 97:
   case 98:
   case 99:
   case 102:
   case 103:
   case 105:
    return 1;
   case 38:
   case 66:
   case 50:
   case 51:
   case 4:
    return 1024;
   case 15:
   case 64:
   case 41:
    return 32;
   case 55:
   case 37:
   case 17:
    return 2147483647;
   case 18:
   case 1:
    return 47839;
   case 59:
   case 57:
    return 99;
   case 68:
   case 58:
    return 2048;
   case 0:
    return 2097152;
   case 3:
    return 65536;
   case 14:
    return 32768;
   case 73:
    return 32767;
   case 39:
    return 16384;
   case 60:
    return 1e3;
   case 106:
    return 700;
   case 52:
    return 256;
   case 62:
    return 255;
   case 2:
    return 100;
   case 65:
    return 64;
   case 36:
    return 20;
   case 100:
    return 16;
   case 20:
    return 6;
   case 53:
    return 4;
  }
  Ct(yt);
  return -1;
}

function tt(c) {
  PA || (Wg = Math.ceil(Wg / Bh) * Bh, PA = !0);
  var d = Wg;
  c != 0 && Vg(c);
  return d;
}

var PA;

Fm.unshift({
  Ja: (function() {
    Gt = !1;
    Rt || Qt();
  })
});

Gm.push({
  Ja: (function() {
    Rt && (xp[2].object.v.buffer.length > 0 && xp[2].object.v("\n".charCodeAt(0)), xp[3].object.v.buffer.length > 0 && xp[3].object.v("\n".charCodeAt(0)));
  })
});

Ct(0);

var vp = w([ 0 ], "i8", v);

Module.Ec = (function(c) {
  function d() {
    for (var c = 0; c < 3; c++) {
      f.push(0);
    }
  }
  var e = c.length + 1, f = [ w(Am("/bin/this.program"), "i8", v) ];
  d();
  for (var g = 0; g < e - 1; g += 1) {
    f.push(w(Am(c[g]), "i8", v)), d();
  }
  f.push(0);
  f = w(f, "i32", v);
  return Om();
});

var QA, RA, Tp, Up, Vp, kt, ot, pt, mt, nt, SA, op, TA, qp, UA, Pm, Qm, Fm = Fm.concat([]), Rm, Sm, VA, WA, XA, YA, ZA, $A, aB, bB, cB, dB, eB, Ws, Vs, fB, gB, zG, AG, BG, CG, DG, EG, FG, T, rt;

y.Ab = w([ 37, 102, 10, 0 ], "i8", v);

y.cb = w([ 55, 98, 50, 83, 104, 97, 112, 101, 0 ], "i8", v);

RA = w(8, "*", v);

y.cc = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 67, 111, 108, 108, 105, 100, 101, 69, 100, 103, 101, 46, 99, 112, 112, 0 ], "i8", v);

y.hb = w([ 118, 111, 105, 100, 32, 98, 50, 67, 111, 108, 108, 105, 100, 101, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 40, 98, 50, 77, 97, 110, 105, 102, 111, 108, 100, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 69, 100, 103, 101, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 67, 105, 114, 99, 108, 101, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", v);

y.Qb = w([ 100, 101, 110, 32, 62, 32, 48, 46, 48, 102, 0 ], "i8", v);

y.Ga = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 67, 111, 108, 108, 105, 100, 101, 80, 111, 108, 121, 103, 111, 110, 46, 99, 112, 112, 0 ], "i8", v);

y.jb = w([ 118, 111, 105, 100, 32, 98, 50, 70, 105, 110, 100, 73, 110, 99, 105, 100, 101, 110, 116, 69, 100, 103, 101, 40, 98, 50, 67, 108, 105, 112, 86, 101, 114, 116, 101, 120, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", v);

y.ta = w([ 48, 32, 60, 61, 32, 101, 100, 103, 101, 49, 32, 38, 38, 32, 101, 100, 103, 101, 49, 32, 60, 32, 112, 111, 108, 121, 49, 45, 62, 109, 95, 118, 101, 114, 116, 101, 120, 67, 111, 117, 110, 116, 0 ], "i8", v);

y.ib = w([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 69, 100, 103, 101, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 40, 99, 111, 110, 115, 116, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", v);

Tp = w(1, "i32", v);

Up = w(1, "i32", v);

Vp = w(1, "i32", v);

y.g = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 46, 99, 112, 112, 0 ], "i8", v);

y.aa = w([ 118, 111, 105, 100, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 58, 58, 83, 101, 116, 40, 99, 111, 110, 115, 116, 32, 98, 50, 83, 104, 97, 112, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.Db = w([ 48, 32, 60, 61, 32, 105, 110, 100, 101, 120, 32, 38, 38, 32, 105, 110, 100, 101, 120, 32, 60, 32, 99, 104, 97, 105, 110, 45, 62, 109, 95, 99, 111, 117, 110, 116, 0 ], "i8", v);

y.fb = w([ 118, 111, 105, 100, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 40, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 79, 117, 116, 112, 117, 116, 32, 42, 44, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 67, 97, 99, 104, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 73, 110, 112, 117, 116, 32, 42, 41, 0 ], "i8", v);

y.H = w([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 71, 101, 116, 77, 101, 116, 114, 105, 99, 40, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.pa = w([ 118, 111, 105, 100, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 71, 101, 116, 87, 105, 116, 110, 101, 115, 115, 80, 111, 105, 110, 116, 115, 40, 98, 50, 86, 101, 99, 50, 32, 42, 44, 32, 98, 50, 86, 101, 99, 50, 32, 42, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.b = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 46, 104, 0 ], "i8", v);

y.a = w([ 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 58, 58, 71, 101, 116, 86, 101, 114, 116, 101, 120, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.c = w([ 48, 32, 60, 61, 32, 105, 110, 100, 101, 120, 32, 38, 38, 32, 105, 110, 100, 101, 120, 32, 60, 32, 109, 95, 99, 111, 117, 110, 116, 0 ], "i8", v);

y.zb = w([ 98, 50, 86, 101, 99, 50, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 71, 101, 116, 83, 101, 97, 114, 99, 104, 68, 105, 114, 101, 99, 116, 105, 111, 110, 40, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.G = w([ 98, 50, 86, 101, 99, 50, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 71, 101, 116, 67, 108, 111, 115, 101, 115, 116, 80, 111, 105, 110, 116, 40, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.ub = w([ 118, 111, 105, 100, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 58, 58, 82, 101, 97, 100, 67, 97, 99, 104, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 67, 97, 99, 104, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 41, 0 ], "i8", v);

y.pc = w([ 99, 97, 99, 104, 101, 45, 62, 99, 111, 117, 110, 116, 32, 60, 61, 32, 51, 0 ], "i8", v);

y.d = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 46, 99, 112, 112, 0 ], "i8", v);

y.kb = w([ 105, 110, 116, 51, 50, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 65, 108, 108, 111, 99, 97, 116, 101, 78, 111, 100, 101, 40, 41, 0 ], "i8", v);

y.Eb = w([ 109, 95, 110, 111, 100, 101, 67, 111, 117, 110, 116, 32, 61, 61, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.D = w([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 70, 114, 101, 101, 78, 111, 100, 101, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.va = w([ 48, 32, 60, 61, 32, 110, 111, 100, 101, 73, 100, 32, 38, 38, 32, 110, 111, 100, 101, 73, 100, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.Ea = w([ 48, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 111, 117, 110, 116, 0 ], "i8", v);

y.qc = w([ 109, 95, 110, 111, 100, 101, 115, 91, 112, 114, 111, 120, 121, 73, 100, 93, 46, 73, 115, 76, 101, 97, 102, 40, 41, 0 ], "i8", v);

y.Y = w([ 98, 111, 111, 108, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 77, 111, 118, 101, 80, 114, 111, 120, 121, 40, 105, 110, 116, 51, 50, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 65, 65, 66, 66, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 86, 101, 99, 50, 32, 38, 41, 0 ], "i8", v);

y.X = w([ 118, 111, 105, 100, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 73, 110, 115, 101, 114, 116, 76, 101, 97, 102, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.wc = w([ 99, 104, 105, 108, 100, 49, 32, 33, 61, 32, 40, 45, 49, 41, 0 ], "i8", v);

y.zc = w([ 99, 104, 105, 108, 100, 50, 32, 33, 61, 32, 40, 45, 49, 41, 0 ], "i8", v);

y.l = w([ 105, 110, 116, 51, 50, 32, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 66, 97, 108, 97, 110, 99, 101, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.Bc = w([ 105, 65, 32, 33, 61, 32, 40, 45, 49, 41, 0 ], "i8", v);

y.Cc = w([ 48, 32, 60, 61, 32, 105, 66, 32, 38, 38, 32, 105, 66, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.Bb = w([ 48, 32, 60, 61, 32, 105, 67, 32, 38, 38, 32, 105, 67, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.Cb = w([ 48, 32, 60, 61, 32, 105, 70, 32, 38, 38, 32, 105, 70, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.Ib = w([ 48, 32, 60, 61, 32, 105, 71, 32, 38, 38, 32, 105, 71, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.Nb = w([ 109, 95, 110, 111, 100, 101, 115, 91, 67, 45, 62, 112, 97, 114, 101, 110, 116, 93, 46, 99, 104, 105, 108, 100, 50, 32, 61, 61, 32, 105, 65, 0 ], "i8", v);

y.Rb = w([ 48, 32, 60, 61, 32, 105, 68, 32, 38, 38, 32, 105, 68, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.Sb = w([ 48, 32, 60, 61, 32, 105, 69, 32, 38, 38, 32, 105, 69, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.Tb = w([ 109, 95, 110, 111, 100, 101, 115, 91, 66, 45, 62, 112, 97, 114, 101, 110, 116, 93, 46, 99, 104, 105, 108, 100, 50, 32, 61, 61, 32, 105, 65, 0 ], "i8", v);

kt = w(1, "i32", v);

ot = w(1, "i32", v);

pt = w(1, "i32", v);

mt = w(1, "i32", v);

nt = w(1, "i32", v);

y.K = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 84, 105, 109, 101, 79, 102, 73, 109, 112, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.gb = w([ 118, 111, 105, 100, 32, 98, 50, 84, 105, 109, 101, 79, 102, 73, 109, 112, 97, 99, 116, 40, 98, 50, 84, 79, 73, 79, 117, 116, 112, 117, 116, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 79, 73, 73, 110, 112, 117, 116, 32, 42, 41, 0 ], "i8", v);

y.Pb = w([ 116, 97, 114, 103, 101, 116, 32, 62, 32, 116, 111, 108, 101, 114, 97, 110, 99, 101, 0 ], "i8", v);

y.yb = w([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 70, 117, 110, 99, 116, 105, 111, 110, 58, 58, 69, 118, 97, 108, 117, 97, 116, 101, 40, 105, 110, 116, 51, 50, 44, 32, 105, 110, 116, 51, 50, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.xb = w([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 70, 117, 110, 99, 116, 105, 111, 110, 58, 58, 70, 105, 110, 100, 77, 105, 110, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 40, 105, 110, 116, 51, 50, 32, 42, 44, 32, 105, 110, 116, 51, 50, 32, 42, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.ob = w([ 102, 108, 111, 97, 116, 51, 50, 32, 98, 50, 83, 101, 112, 97, 114, 97, 116, 105, 111, 110, 70, 117, 110, 99, 116, 105, 111, 110, 58, 58, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 83, 105, 109, 112, 108, 101, 120, 67, 97, 99, 104, 101, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 83, 119, 101, 101, 112, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 68, 105, 115, 116, 97, 110, 99, 101, 80, 114, 111, 120, 121, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 83, 119, 101, 101, 112, 32, 38, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", v);

y.sc = w([ 48, 32, 60, 32, 99, 111, 117, 110, 116, 32, 38, 38, 32, 99, 111, 117, 110, 116, 32, 60, 32, 51, 0 ], "i8", v);

y.jc = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 83, 104, 97, 112, 101, 115, 47, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 46, 99, 112, 112, 0 ], "i8", v);

y.vb = w([ 118, 111, 105, 100, 32, 98, 50, 67, 104, 97, 105, 110, 83, 104, 97, 112, 101, 58, 58, 71, 101, 116, 67, 104, 105, 108, 100, 69, 100, 103, 101, 40, 98, 50, 69, 100, 103, 101, 83, 104, 97, 112, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.kc = w([ 48, 32, 60, 61, 32, 105, 110, 100, 101, 120, 32, 38, 38, 32, 105, 110, 100, 101, 120, 32, 60, 32, 109, 95, 99, 111, 117, 110, 116, 32, 45, 32, 49, 0 ], "i8", v);

op = w([ 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 34, 0, 0, 0, 36, 0, 0, 0, 38, 0, 0, 0, 40, 0, 0, 0, 42, 0, 0, 0, 44, 0, 0, 0, 46, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.Sa = w([ 49, 49, 98, 50, 69, 100, 103, 101, 83, 104, 97, 112, 101, 0 ], "i8", v);

TA = w(12, "*", v);

y.U = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 83, 104, 97, 112, 101, 115, 47, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 46, 99, 112, 112, 0 ], "i8", v);

y.wb = w([ 118, 105, 114, 116, 117, 97, 108, 32, 98, 111, 111, 108, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 58, 58, 82, 97, 121, 67, 97, 115, 116, 40, 98, 50, 82, 97, 121, 67, 97, 115, 116, 79, 117, 116, 112, 117, 116, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 82, 97, 121, 67, 97, 115, 116, 73, 110, 112, 117, 116, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.fc = w([ 48, 46, 48, 102, 32, 60, 61, 32, 108, 111, 119, 101, 114, 32, 38, 38, 32, 108, 111, 119, 101, 114, 32, 60, 61, 32, 105, 110, 112, 117, 116, 46, 109, 97, 120, 70, 114, 97, 99, 116, 105, 111, 110, 0 ], "i8", v);

y.oa = w([ 118, 105, 114, 116, 117, 97, 108, 32, 118, 111, 105, 100, 32, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 58, 58, 67, 111, 109, 112, 117, 116, 101, 77, 97, 115, 115, 40, 98, 50, 77, 97, 115, 115, 68, 97, 116, 97, 32, 42, 44, 32, 102, 108, 111, 97, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.lc = w([ 109, 95, 118, 101, 114, 116, 101, 120, 67, 111, 117, 110, 116, 32, 62, 61, 32, 51, 0 ], "i8", v);

y.tc = w([ 97, 114, 101, 97, 32, 62, 32, 49, 46, 49, 57, 50, 48, 57, 50, 57, 48, 69, 45, 48, 55, 70, 0 ], "i8", v);

qp = w([ 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 50, 0, 0, 0, 52, 0, 0, 0, 54, 0, 0, 0, 56, 0, 0, 0, 58, 0, 0, 0, 60, 0, 0, 0, 62, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.Ta = w([ 49, 52, 98, 50, 80, 111, 108, 121, 103, 111, 110, 83, 104, 97, 112, 101, 0 ], "i8", v);

UA = w(12, "*", v);

Pm = w([ 16, 0, 0, 0, 32, 0, 0, 0, 64, 0, 0, 0, 96, 0, 0, 0, 128, 0, 0, 0, 160, 0, 0, 0, 192, 0, 0, 0, 224, 0, 0, 0, 256, 0, 0, 0, 320, 0, 0, 0, 384, 0, 0, 0, 448, 0, 0, 0, 512, 0, 0, 0, 640, 0, 0, 0 ], [ "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0 ], v);

Qm = w(641, "i8", v);

y.e = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 109, 109, 111, 110, 47, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 46, 99, 112, 112, 0 ], "i8", v);

y.nb = w([ 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 40, 41, 0 ], "i8", v);

y.Ub = w([ 106, 32, 60, 32, 98, 50, 95, 98, 108, 111, 99, 107, 83, 105, 122, 101, 115, 0 ], "i8", v);

y.N = w([ 118, 111, 105, 100, 32, 42, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 65, 108, 108, 111, 99, 97, 116, 101, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.za = w([ 48, 32, 60, 32, 115, 105, 122, 101, 0 ], "i8", v);

y.i = w([ 48, 32, 60, 61, 32, 105, 110, 100, 101, 120, 32, 38, 38, 32, 105, 110, 100, 101, 120, 32, 60, 32, 98, 50, 95, 98, 108, 111, 99, 107, 83, 105, 122, 101, 115, 0 ], "i8", v);

y.mc = w([ 98, 108, 111, 99, 107, 67, 111, 117, 110, 116, 32, 42, 32, 98, 108, 111, 99, 107, 83, 105, 122, 101, 32, 60, 61, 32, 98, 50, 95, 99, 104, 117, 110, 107, 83, 105, 122, 101, 0 ], "i8", v);

y.h = w([ 118, 111, 105, 100, 32, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 70, 114, 101, 101, 40, 118, 111, 105, 100, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.j = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 109, 109, 111, 110, 47, 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 46, 99, 112, 112, 0 ], "i8", v);

y.da = w([ 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 126, 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 40, 41, 0 ], "i8", v);

y.Vb = w([ 109, 95, 105, 110, 100, 101, 120, 32, 61, 61, 32, 48, 0 ], "i8", v);

y.ac = w([ 109, 95, 101, 110, 116, 114, 121, 67, 111, 117, 110, 116, 32, 61, 61, 32, 48, 0 ], "i8", v);

y.n = w([ 118, 111, 105, 100, 32, 42, 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 65, 108, 108, 111, 99, 97, 116, 101, 40, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.p = w([ 109, 95, 101, 110, 116, 114, 121, 67, 111, 117, 110, 116, 32, 60, 32, 98, 50, 95, 109, 97, 120, 83, 116, 97, 99, 107, 69, 110, 116, 114, 105, 101, 115, 0 ], "i8", v);

y.ca = w([ 118, 111, 105, 100, 32, 98, 50, 83, 116, 97, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 58, 58, 70, 114, 101, 101, 40, 118, 111, 105, 100, 32, 42, 41, 0 ], "i8", v);

y.nc = w([ 109, 95, 101, 110, 116, 114, 121, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", v);

y.uc = w([ 112, 32, 61, 61, 32, 101, 110, 116, 114, 121, 45, 62, 100, 97, 116, 97, 0 ], "i8", v);

y.m = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 66, 111, 100, 121, 46, 99, 112, 112, 0 ], "i8", v);

y.q = w([ 98, 50, 66, 111, 100, 121, 58, 58, 98, 50, 66, 111, 100, 121, 40, 99, 111, 110, 115, 116, 32, 98, 50, 66, 111, 100, 121, 68, 101, 102, 32, 42, 44, 32, 98, 50, 87, 111, 114, 108, 100, 32, 42, 41, 0 ], "i8", v);

y.Wb = w([ 98, 100, 45, 62, 112, 111, 115, 105, 116, 105, 111, 110, 46, 73, 115, 86, 97, 108, 105, 100, 40, 41, 0 ], "i8", v);

y.bc = w([ 98, 100, 45, 62, 108, 105, 110, 101, 97, 114, 86, 101, 108, 111, 99, 105, 116, 121, 46, 73, 115, 86, 97, 108, 105, 100, 40, 41, 0 ], "i8", v);

y.gc = w([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 98, 100, 45, 62, 97, 110, 103, 108, 101, 41, 0 ], "i8", v);

y.oc = w([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 98, 100, 45, 62, 97, 110, 103, 117, 108, 97, 114, 86, 101, 108, 111, 99, 105, 116, 121, 41, 0 ], "i8", v);

y.vc = w([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 98, 100, 45, 62, 97, 110, 103, 117, 108, 97, 114, 68, 97, 109, 112, 105, 110, 103, 41, 32, 38, 38, 32, 98, 100, 45, 62, 97, 110, 103, 117, 108, 97, 114, 68, 97, 109, 112, 105, 110, 103, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", v);

y.yc = w([ 98, 50, 73, 115, 86, 97, 108, 105, 100, 40, 98, 100, 45, 62, 108, 105, 110, 101, 97, 114, 68, 97, 109, 112, 105, 110, 103, 41, 32, 38, 38, 32, 98, 100, 45, 62, 108, 105, 110, 101, 97, 114, 68, 97, 109, 112, 105, 110, 103, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", v);

y.Ac = w([ 109, 95, 119, 111, 114, 108, 100, 45, 62, 73, 115, 76, 111, 99, 107, 101, 100, 40, 41, 32, 61, 61, 32, 102, 97, 108, 115, 101, 0 ], "i8", v);

y.qb = w([ 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 98, 50, 66, 111, 100, 121, 58, 58, 67, 114, 101, 97, 116, 101, 70, 105, 120, 116, 117, 114, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 68, 101, 102, 32, 42, 41, 0 ], "i8", v);

y.ja = w([ 118, 111, 105, 100, 32, 98, 50, 66, 111, 100, 121, 58, 58, 82, 101, 115, 101, 116, 77, 97, 115, 115, 68, 97, 116, 97, 40, 41, 0 ], "i8", v);

y.Hb = w([ 109, 95, 116, 121, 112, 101, 32, 61, 61, 32, 98, 50, 95, 100, 121, 110, 97, 109, 105, 99, 66, 111, 100, 121, 0 ], "i8", v);

y.Mb = w([ 109, 95, 73, 32, 62, 32, 48, 46, 48, 102, 0 ], "i8", v);

Rm = w(4, "*", v);

Sm = w(4, "*", v);

y.na = w([ 118, 111, 105, 100, 32, 42, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 71, 101, 116, 85, 115, 101, 114, 68, 97, 116, 97, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

y.s = w([ 48, 32, 60, 61, 32, 112, 114, 111, 120, 121, 73, 100, 32, 38, 38, 32, 112, 114, 111, 120, 121, 73, 100, 32, 60, 32, 109, 95, 110, 111, 100, 101, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.R = w([ 99, 111, 110, 115, 116, 32, 98, 50, 65, 65, 66, 66, 32, 38, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 58, 58, 71, 101, 116, 70, 97, 116, 65, 65, 66, 66, 40, 105, 110, 116, 51, 50, 41, 32, 99, 111, 110, 115, 116, 0 ], "i8", v);

VA = w([ 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 66, 0, 0, 0, 68, 0, 0, 0, 70, 0, 0, 0, 72, 0, 0, 0, 74, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.Xa = w([ 49, 55, 98, 50, 67, 111, 110, 116, 97, 99, 116, 76, 105, 115, 116, 101, 110, 101, 114, 0 ], "i8", v);

WA = w(8, "*", v);

y.Ob = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 70, 105, 120, 116, 117, 114, 101, 46, 99, 112, 112, 0 ], "i8", v);

y.tb = w([ 118, 111, 105, 100, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 58, 58, 68, 101, 115, 116, 114, 111, 121, 40, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 32, 42, 41, 0 ], "i8", v);

y.ua = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 73, 115, 108, 97, 110, 100, 46, 99, 112, 112, 0 ], "i8", v);

y.la = w([ 118, 111, 105, 100, 32, 98, 50, 73, 115, 108, 97, 110, 100, 58, 58, 83, 111, 108, 118, 101, 84, 79, 73, 40, 99, 111, 110, 115, 116, 32, 98, 50, 84, 105, 109, 101, 83, 116, 101, 112, 32, 38, 44, 32, 105, 110, 116, 51, 50, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.Fb = w([ 116, 111, 105, 73, 110, 100, 101, 120, 65, 32, 60, 32, 109, 95, 98, 111, 100, 121, 67, 111, 117, 110, 116, 0 ], "i8", v);

y.Xb = w([ 116, 111, 105, 73, 110, 100, 101, 120, 66, 32, 60, 32, 109, 95, 98, 111, 100, 121, 67, 111, 117, 110, 116, 0 ], "i8", v);

y.r = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 87, 111, 114, 108, 100, 46, 99, 112, 112, 0 ], "i8", v);

y.rb = w([ 98, 50, 66, 111, 100, 121, 32, 42, 98, 50, 87, 111, 114, 108, 100, 58, 58, 67, 114, 101, 97, 116, 101, 66, 111, 100, 121, 40, 99, 111, 110, 115, 116, 32, 98, 50, 66, 111, 100, 121, 68, 101, 102, 32, 42, 41, 0 ], "i8", v);

y.Gb = w([ 73, 115, 76, 111, 99, 107, 101, 100, 40, 41, 32, 61, 61, 32, 102, 97, 108, 115, 101, 0 ], "i8", v);

y.O = w([ 118, 111, 105, 100, 32, 98, 50, 87, 111, 114, 108, 100, 58, 58, 83, 111, 108, 118, 101, 40, 99, 111, 110, 115, 116, 32, 98, 50, 84, 105, 109, 101, 83, 116, 101, 112, 32, 38, 41, 0 ], "i8", v);

y.hc = w([ 98, 45, 62, 73, 115, 65, 99, 116, 105, 118, 101, 40, 41, 32, 61, 61, 32, 116, 114, 117, 101, 0 ], "i8", v);

y.Ha = w([ 115, 116, 97, 99, 107, 67, 111, 117, 110, 116, 32, 60, 32, 115, 116, 97, 99, 107, 83, 105, 122, 101, 0 ], "i8", v);

y.ka = w([ 118, 111, 105, 100, 32, 98, 50, 87, 111, 114, 108, 100, 58, 58, 83, 111, 108, 118, 101, 84, 79, 73, 40, 99, 111, 110, 115, 116, 32, 98, 50, 84, 105, 109, 101, 83, 116, 101, 112, 32, 38, 41, 0 ], "i8", v);

y.xc = w([ 116, 121, 112, 101, 65, 32, 61, 61, 32, 98, 50, 95, 100, 121, 110, 97, 109, 105, 99, 66, 111, 100, 121, 32, 124, 124, 32, 116, 121, 112, 101, 66, 32, 61, 61, 32, 98, 50, 95, 100, 121, 110, 97, 109, 105, 99, 66, 111, 100, 121, 0 ], "i8", v);

y.t = w([ 97, 108, 112, 104, 97, 48, 32, 60, 32, 49, 46, 48, 102, 0 ], "i8", v);

y.z = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 108, 108, 105, 115, 105, 111, 110, 47, 98, 50, 68, 121, 110, 97, 109, 105, 99, 84, 114, 101, 101, 46, 104, 0 ], "i8", v);

y.B = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 67, 111, 109, 109, 111, 110, 47, 98, 50, 77, 97, 116, 104, 46, 104, 0 ], "i8", v);

y.w = w([ 118, 111, 105, 100, 32, 98, 50, 83, 119, 101, 101, 112, 58, 58, 65, 100, 118, 97, 110, 99, 101, 40, 102, 108, 111, 97, 116, 51, 50, 41, 0 ], "i8", v);

y.o = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 98, 50, 73, 115, 108, 97, 110, 100, 46, 104, 0 ], "i8", v);

y.sb = w([ 118, 111, 105, 100, 32, 98, 50, 73, 115, 108, 97, 110, 100, 58, 58, 65, 100, 100, 40, 98, 50, 74, 111, 105, 110, 116, 32, 42, 41, 0 ], "i8", v);

y.$b = w([ 109, 95, 106, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 60, 32, 109, 95, 106, 111, 105, 110, 116, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.P = w([ 118, 111, 105, 100, 32, 98, 50, 73, 115, 108, 97, 110, 100, 58, 58, 65, 100, 100, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 32, 42, 41, 0 ], "i8", v);

y.T = w([ 109, 95, 99, 111, 110, 116, 97, 99, 116, 67, 111, 117, 110, 116, 32, 60, 32, 109, 95, 99, 111, 110, 116, 97, 99, 116, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

y.F = w([ 118, 111, 105, 100, 32, 98, 50, 73, 115, 108, 97, 110, 100, 58, 58, 65, 100, 100, 40, 98, 50, 66, 111, 100, 121, 32, 42, 41, 0 ], "i8", v);

y.J = w([ 109, 95, 98, 111, 100, 121, 67, 111, 117, 110, 116, 32, 60, 32, 109, 95, 98, 111, 100, 121, 67, 97, 112, 97, 99, 105, 116, 121, 0 ], "i8", v);

XA = w([ 0, 0, 0, 0, 0, 0, 0, 0, 76, 0, 0, 0, 78, 0, 0, 0, 80, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.Va = w([ 49, 53, 98, 50, 67, 111, 110, 116, 97, 99, 116, 70, 105, 108, 116, 101, 114, 0 ], "i8", v);

YA = w(8, "*", v);

ZA = w([ 0, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 84, 0, 0, 0, 86, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.wa = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.fa = w([ 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.Za = w([ 50, 51, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", v);

y.eb = w([ 57, 98, 50, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", v);

$A = w(8, "*", v);

aB = w(12, "*", v);

bB = w([ 0, 0, 0, 0, 0, 0, 0, 0, 88, 0, 0, 0, 90, 0, 0, 0, 92, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.xa = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.ha = w([ 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.qa = w([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 65, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 99, 104, 97, 105, 110, 0 ], "i8", v);

y.ab = w([ 50, 52, 98, 50, 67, 104, 97, 105, 110, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", v);

cB = w(12, "*", v);

dB = w([ 0, 0, 0, 0, 0, 0, 0, 0, 94, 0, 0, 0, 96, 0, 0, 0, 98, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.ya = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.Z = w([ 98, 50, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", v);

y.Jb = w([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 65, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 99, 105, 114, 99, 108, 101, 0 ], "i8", v);

y.Ua = w([ 49, 53, 98, 50, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", v);

eB = w(12, "*", v);

Ws = w(192, [ "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i8", 0, 0, 0 ], v);

Vs = w(1, "i1", v);

y.A = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.Kb = w([ 48, 32, 60, 61, 32, 116, 121, 112, 101, 49, 32, 38, 38, 32, 116, 121, 112, 101, 49, 32, 60, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 116, 121, 112, 101, 67, 111, 117, 110, 116, 0 ], "i8", v);

y.Yb = w([ 48, 32, 60, 61, 32, 116, 121, 112, 101, 50, 32, 38, 38, 32, 116, 121, 112, 101, 50, 32, 60, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 116, 121, 112, 101, 67, 111, 117, 110, 116, 0 ], "i8", v);

y.ma = w([ 115, 116, 97, 116, 105, 99, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 32, 42, 98, 50, 67, 111, 110, 116, 97, 99, 116, 58, 58, 67, 114, 101, 97, 116, 101, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 105, 110, 116, 51, 50, 44, 32, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 32, 42, 41, 0 ], "i8", v);

y.Q = w([ 115, 116, 97, 116, 105, 99, 32, 118, 111, 105, 100, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 58, 58, 68, 101, 115, 116, 114, 111, 121, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 32, 42, 44, 32, 98, 50, 66, 108, 111, 99, 107, 65, 108, 108, 111, 99, 97, 116, 111, 114, 32, 42, 41, 0 ], "i8", v);

y.dc = w([ 115, 95, 105, 110, 105, 116, 105, 97, 108, 105, 122, 101, 100, 32, 61, 61, 32, 116, 114, 117, 101, 0 ], "i8", v);

y.Fa = w([ 48, 32, 60, 61, 32, 116, 121, 112, 101, 65, 32, 38, 38, 32, 116, 121, 112, 101, 66, 32, 60, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 116, 121, 112, 101, 67, 111, 117, 110, 116, 0 ], "i8", v);

fB = w([ 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 102, 0, 0, 0, 104, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.C = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 46, 99, 112, 112, 0 ], "i8", v);

y.mb = w([ 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 58, 58, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 68, 101, 102, 32, 42, 41, 0 ], "i8", v);

y.Lb = w([ 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", v);

y.lb = w([ 118, 111, 105, 100, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 58, 58, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 86, 101, 108, 111, 99, 105, 116, 121, 67, 111, 110, 115, 116, 114, 97, 105, 110, 116, 115, 40, 41, 0 ], "i8", v);

y.Zb = w([ 109, 97, 110, 105, 102, 111, 108, 100, 45, 62, 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", v);

y.$ = w([ 118, 111, 105, 100, 32, 98, 50, 67, 111, 110, 116, 97, 99, 116, 83, 111, 108, 118, 101, 114, 58, 58, 83, 111, 108, 118, 101, 86, 101, 108, 111, 99, 105, 116, 121, 67, 111, 110, 115, 116, 114, 97, 105, 110, 116, 115, 40, 41, 0 ], "i8", v);

y.ec = w([ 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 61, 61, 32, 49, 32, 124, 124, 32, 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 61, 61, 32, 50, 0 ], "i8", v);

y.ic = w([ 97, 46, 120, 32, 62, 61, 32, 48, 46, 48, 102, 32, 38, 38, 32, 97, 46, 121, 32, 62, 61, 32, 48, 46, 48, 102, 0 ], "i8", v);

y.pb = w([ 118, 111, 105, 100, 32, 98, 50, 80, 111, 115, 105, 116, 105, 111, 110, 83, 111, 108, 118, 101, 114, 77, 97, 110, 105, 102, 111, 108, 100, 58, 58, 73, 110, 105, 116, 105, 97, 108, 105, 122, 101, 40, 98, 50, 67, 111, 110, 116, 97, 99, 116, 80, 111, 115, 105, 116, 105, 111, 110, 67, 111, 110, 115, 116, 114, 97, 105, 110, 116, 32, 42, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 99, 111, 110, 115, 116, 32, 98, 50, 84, 114, 97, 110, 115, 102, 111, 114, 109, 32, 38, 44, 32, 105, 110, 116, 51, 50, 41, 0 ], "i8", v);

y.rc = w([ 112, 99, 45, 62, 112, 111, 105, 110, 116, 67, 111, 117, 110, 116, 32, 62, 32, 48, 0 ], "i8", v);

gB = w([ 0, 0, 0, 0, 0, 0, 0, 0, 106, 0, 0, 0, 108, 0, 0, 0, 110, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.Aa = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.ea = w([ 98, 50, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", v);

y.Ya = w([ 50, 50, 98, 50, 69, 100, 103, 101, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", v);

zG = w(12, "*", v);

AG = w([ 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 114, 0, 0, 0, 116, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.Ba = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 69, 100, 103, 101, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.ga = w([ 98, 50, 69, 100, 103, 101, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 69, 100, 103, 101, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", v);

y.ra = w([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 65, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 101, 100, 103, 101, 0 ], "i8", v);

y.$a = w([ 50, 51, 98, 50, 69, 100, 103, 101, 65, 110, 100, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", v);

BG = w(12, "*", v);

CG = w([ 0, 0, 0, 0, 0, 0, 0, 0, 118, 0, 0, 0, 120, 0, 0, 0, 122, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.Ca = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 80, 111, 108, 121, 103, 111, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.ia = w([ 98, 50, 80, 111, 108, 121, 103, 111, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 80, 111, 108, 121, 103, 111, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", v);

y.I = w([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 66, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 99, 105, 114, 99, 108, 101, 0 ], "i8", v);

y.bb = w([ 50, 53, 98, 50, 80, 111, 108, 121, 103, 111, 110, 65, 110, 100, 67, 105, 114, 99, 108, 101, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", v);

DG = w(12, "*", v);

EG = w([ 0, 0, 0, 0, 0, 0, 0, 0, 124, 0, 0, 0, 126, 0, 0, 0, 128, 0, 0, 0 ], [ "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0 ], v);

w(1, "void*", v);

y.Da = w([ 66, 111, 120, 50, 68, 95, 118, 50, 46, 50, 46, 49, 47, 66, 111, 120, 50, 68, 47, 68, 121, 110, 97, 109, 105, 99, 115, 47, 67, 111, 110, 116, 97, 99, 116, 115, 47, 98, 50, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 46, 99, 112, 112, 0 ], "i8", v);

y.ba = w([ 98, 50, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 58, 58, 98, 50, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 40, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 44, 32, 98, 50, 70, 105, 120, 116, 117, 114, 101, 32, 42, 41, 0 ], "i8", v);

y.sa = w([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 65, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 112, 111, 108, 121, 103, 111, 110, 0 ], "i8", v);

y.S = w([ 109, 95, 102, 105, 120, 116, 117, 114, 101, 66, 45, 62, 71, 101, 116, 84, 121, 112, 101, 40, 41, 32, 61, 61, 32, 98, 50, 83, 104, 97, 112, 101, 58, 58, 101, 95, 112, 111, 108, 121, 103, 111, 110, 0 ], "i8", v);

y.Wa = w([ 49, 54, 98, 50, 80, 111, 108, 121, 103, 111, 110, 67, 111, 110, 116, 97, 99, 116, 0 ], "i8", v);

FG = w(12, "*", v);

y.f = w([ 102, 97, 108, 115, 101, 0 ], "i8", v);

T = w(468, [ "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0, "*", 0, 0, 0, "i32", 0, 0, 0 ], v);

rt = w(24, "i32", v);

QA = w([ 1, 0, 0, 0, 0 ], [ "i8*", 0, 0, 0, 0 ], v);

h[RA >> 2] = QA + 8 | 0;

h[RA + 4 >> 2] = y.cb | 0;

SA = w([ 2, 0, 0, 0, 0 ], [ "i8*", 0, 0, 0, 0 ], v);

h[op + 4 >> 2] = TA;

h[TA >> 2] = SA + 8 | 0;

h[TA + 4 >> 2] = y.Sa | 0;

h[TA + 8 >> 2] = RA;

h[qp + 4 >> 2] = UA;

h[UA >> 2] = SA + 8 | 0;

h[UA + 4 >> 2] = y.Ta | 0;

h[UA + 8 >> 2] = RA;

h[Rm >> 2] = XA + 8 | 0;

h[Sm >> 2] = VA + 8 | 0;

h[VA + 4 >> 2] = WA;

h[WA >> 2] = QA + 8 | 0;

h[WA + 4 >> 2] = y.Xa | 0;

h[XA + 4 >> 2] = YA;

h[YA >> 2] = QA + 8 | 0;

h[YA + 4 >> 2] = y.Va | 0;

h[ZA + 4 >> 2] = aB;

h[$A >> 2] = QA + 8 | 0;

h[$A + 4 >> 2] = y.eb | 0;

h[aB >> 2] = SA + 8 | 0;

h[aB + 4 >> 2] = y.Za | 0;

h[aB + 8 >> 2] = $A;

h[bB + 4 >> 2] = cB;

h[cB >> 2] = SA + 8 | 0;

h[cB + 4 >> 2] = y.ab | 0;

h[cB + 8 >> 2] = $A;

h[dB + 4 >> 2] = eB;

h[eB >> 2] = SA + 8 | 0;

h[eB + 4 >> 2] = y.Ua | 0;

h[eB + 8 >> 2] = $A;

h[fB + 4 >> 2] = $A;

h[gB + 4 >> 2] = zG;

h[zG >> 2] = SA + 8 | 0;

h[zG + 4 >> 2] = y.Ya | 0;

h[zG + 8 >> 2] = $A;

h[AG + 4 >> 2] = BG;

h[BG >> 2] = SA + 8 | 0;

h[BG + 4 >> 2] = y.$a | 0;

h[BG + 8 >> 2] = $A;

h[CG + 4 >> 2] = DG;

h[DG >> 2] = SA + 8 | 0;

h[DG + 4 >> 2] = y.bb | 0;

h[DG + 8 >> 2] = $A;

h[EG + 4 >> 2] = FG;

h[FG >> 2] = SA + 8 | 0;

h[FG + 4 >> 2] = y.Wa | 0;

h[FG + 8 >> 2] = $A;

Wl = [ 0, 0, (function(c, d) {
  var e = h[c >> 2], f = h[d >> 2];
  return (e | 0) < (f | 0) ? 1 : (e | 0) != (f | 0) ? 0 : (h[c + 4 >> 2] | 0) < (h[d + 4 >> 2] | 0);
}), 0, (function(c, d, e, f, g) {
  d = co(g, 144);
  f = d >> 2;
  if ((d | 0) == 0) {
    c = 0;
  } else {
    h[d >> 2] = fB + 8 | 0;
    h[f + 1] = 4;
    h[f + 12] = c;
    g = d + 52 | 0;
    h[g >> 2] = e;
    h[f + 14] = 0;
    h[f + 15] = 0;
    h[f + 31] = 0;
    h[f + 32] = 0;
    for (var i = (d + 8 | 0) >> 2, j = i + 10; i < j; i++) {
      h[i] = 0;
    }
    i = Nm(l[(c + 16 | 0) >> 2] * l[e + 16 >> 2]);
    l[f + 34] = i;
    i = l[c + 20 >> 2];
    j = l[e + 20 >> 2];
    l[f + 35] = i > j ? i : j;
    h[d >> 2] = dB + 8 | 0;
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) == 0 ? c = e : (G(y.ya | 0, 44, y.Z | 0, y.Jb | 0), c = h[g >> 2]);
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) != 0 && G(y.ya | 0, 45, y.Z | 0, y.I | 0);
    c = d;
  }
  return c | 0;
}), 0, (function(c, d) {
  Wl[h[h[c >> 2] + 4 >> 2]](c);
  var e = Dh[Qm + 144 | 0], f = e & 255;
  (e & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
  e = (f << 2) + d + 12 | 0;
  h[c >> 2] = h[e >> 2];
  h[e >> 2] = c;
}), 0, (function(c, d, e, f, g) {
  d = co(g, 144);
  f = d >> 2;
  if ((d | 0) == 0) {
    c = 0;
  } else {
    h[d >> 2] = fB + 8 | 0;
    h[f + 1] = 4;
    h[f + 12] = c;
    g = d + 52 | 0;
    h[g >> 2] = e;
    h[f + 14] = 0;
    h[f + 15] = 0;
    h[f + 31] = 0;
    h[f + 32] = 0;
    for (var i = (d + 8 | 0) >> 2, j = i + 10; i < j; i++) {
      h[i] = 0;
    }
    i = Nm(l[(c + 16 | 0) >> 2] * l[e + 16 >> 2]);
    l[f + 34] = i;
    i = l[c + 20 >> 2];
    j = l[e + 20 >> 2];
    l[f + 35] = i > j ? i : j;
    h[d >> 2] = CG + 8 | 0;
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) == 2 ? c = e : (G(y.Ca | 0, 41, y.ia | 0, y.sa | 0), c = h[g >> 2]);
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) != 0 && G(y.Ca | 0, 42, y.ia | 0, y.I | 0);
    c = d;
  }
  return c | 0;
}), 0, (function(c, d) {
  Wl[h[h[c >> 2] + 4 >> 2]](c);
  var e = Dh[Qm + 144 | 0], f = e & 255;
  (e & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
  e = (f << 2) + d + 12 | 0;
  h[c >> 2] = h[e >> 2];
  h[e >> 2] = c;
}), 0, (function(c, d, e, f, g) {
  d = co(g, 144);
  f = d >> 2;
  if ((d | 0) == 0) {
    c = 0;
  } else {
    h[d >> 2] = fB + 8 | 0;
    h[f + 1] = 4;
    h[f + 12] = c;
    g = d + 52 | 0;
    h[g >> 2] = e;
    h[f + 14] = 0;
    h[f + 15] = 0;
    h[f + 31] = 0;
    h[f + 32] = 0;
    for (var i = (d + 8 | 0) >> 2, j = i + 10; i < j; i++) {
      h[i] = 0;
    }
    i = Nm(l[(c + 16 | 0) >> 2] * l[e + 16 >> 2]);
    l[f + 34] = i;
    i = l[c + 20 >> 2];
    j = l[e + 20 >> 2];
    l[f + 35] = i > j ? i : j;
    h[d >> 2] = EG + 8 | 0;
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) == 2 ? c = e : (G(y.Da | 0, 44, y.ba | 0, y.sa | 0), c = h[g >> 2]);
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) != 2 && G(y.Da | 0, 45, y.ba | 0, y.S | 0);
    c = d;
  }
  return c | 0;
}), 0, (function(c, d) {
  Wl[h[h[c >> 2] + 4 >> 2]](c);
  var e = Dh[Qm + 144 | 0], f = e & 255;
  (e & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
  e = (f << 2) + d + 12 | 0;
  h[c >> 2] = h[e >> 2];
  h[e >> 2] = c;
}), 0, (function(c, d, e, f, g) {
  d = co(g, 144);
  f = d >> 2;
  if ((d | 0) == 0) {
    c = 0;
  } else {
    h[d >> 2] = fB + 8 | 0;
    h[f + 1] = 4;
    h[f + 12] = c;
    g = d + 52 | 0;
    h[g >> 2] = e;
    h[f + 14] = 0;
    h[f + 15] = 0;
    h[f + 31] = 0;
    h[f + 32] = 0;
    for (var i = (d + 8 | 0) >> 2, j = i + 10; i < j; i++) {
      h[i] = 0;
    }
    i = Nm(l[(c + 16 | 0) >> 2] * l[e + 16 >> 2]);
    l[f + 34] = i;
    i = l[c + 20 >> 2];
    j = l[e + 20 >> 2];
    l[f + 35] = i > j ? i : j;
    h[d >> 2] = gB + 8 | 0;
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) == 1 ? c = e : (G(y.Aa | 0, 41, y.ea | 0, y.ra | 0), c = h[g >> 2]);
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) != 0 && G(y.Aa | 0, 42, y.ea | 0, y.I | 0);
    c = d;
  }
  return c | 0;
}), 0, (function(c, d) {
  Wl[h[h[c >> 2] + 4 >> 2]](c);
  var e = Dh[Qm + 144 | 0], f = e & 255;
  (e & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
  e = (f << 2) + d + 12 | 0;
  h[c >> 2] = h[e >> 2];
  h[e >> 2] = c;
}), 0, (function(c, d, e, f, g) {
  d = co(g, 144);
  f = d >> 2;
  if ((d | 0) == 0) {
    c = 0;
  } else {
    h[d >> 2] = fB + 8 | 0;
    h[f + 1] = 4;
    h[f + 12] = c;
    g = d + 52 | 0;
    h[g >> 2] = e;
    h[f + 14] = 0;
    h[f + 15] = 0;
    h[f + 31] = 0;
    h[f + 32] = 0;
    for (var i = (d + 8 | 0) >> 2, j = i + 10; i < j; i++) {
      h[i] = 0;
    }
    i = Nm(l[(c + 16 | 0) >> 2] * l[e + 16 >> 2]);
    l[f + 34] = i;
    i = l[c + 20 >> 2];
    j = l[e + 20 >> 2];
    l[f + 35] = i > j ? i : j;
    h[d >> 2] = AG + 8 | 0;
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) == 1 ? c = e : (G(y.Ba | 0, 41, y.ga | 0, y.ra | 0), c = h[g >> 2]);
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) != 2 && G(y.Ba | 0, 42, y.ga | 0, y.S | 0);
    c = d;
  }
  return c | 0;
}), 0, (function(c, d) {
  Wl[h[h[c >> 2] + 4 >> 2]](c);
  var e = Dh[Qm + 144 | 0], f = e & 255;
  (e & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
  e = (f << 2) + d + 12 | 0;
  h[c >> 2] = h[e >> 2];
  h[e >> 2] = c;
}), 0, (function(c, d, e, f, g) {
  var i, g = co(g, 144);
  i = g >> 2;
  if ((g | 0) == 0) {
    c = 0;
  } else {
    h[g >> 2] = fB + 8 | 0;
    h[i + 1] = 4;
    h[i + 12] = c;
    var j = g + 52 | 0;
    h[j >> 2] = e;
    h[i + 14] = d;
    h[i + 15] = f;
    h[i + 31] = 0;
    h[i + 32] = 0;
    d = (g + 8 | 0) >> 2;
    for (f = d + 10; d < f; d++) {
      h[d] = 0;
    }
    d = Nm(l[(c + 16 | 0) >> 2] * l[e + 16 >> 2]);
    l[i + 34] = d;
    d = l[c + 20 >> 2];
    f = l[e + 20 >> 2];
    l[i + 35] = d > f ? d : f;
    h[g >> 2] = ZA + 8 | 0;
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) == 3 ? c = e : (G(y.wa | 0, 43, y.fa | 0, y.qa | 0), c = h[j >> 2]);
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) != 0 && G(y.wa | 0, 44, y.fa | 0, y.I | 0);
    c = g;
  }
  return c | 0;
}), 0, (function(c, d) {
  Wl[h[h[c >> 2] + 4 >> 2]](c);
  var e = Dh[Qm + 144 | 0], f = e & 255;
  (e & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
  e = (f << 2) + d + 12 | 0;
  h[c >> 2] = h[e >> 2];
  h[e >> 2] = c;
}), 0, (function(c, d, e, f, g) {
  var i, g = co(g, 144);
  i = g >> 2;
  if ((g | 0) == 0) {
    c = 0;
  } else {
    h[g >> 2] = fB + 8 | 0;
    h[i + 1] = 4;
    h[i + 12] = c;
    var j = g + 52 | 0;
    h[j >> 2] = e;
    h[i + 14] = d;
    h[i + 15] = f;
    h[i + 31] = 0;
    h[i + 32] = 0;
    d = (g + 8 | 0) >> 2;
    for (f = d + 10; d < f; d++) {
      h[d] = 0;
    }
    d = Nm(l[(c + 16 | 0) >> 2] * l[e + 16 >> 2]);
    l[i + 34] = d;
    d = l[c + 20 >> 2];
    f = l[e + 20 >> 2];
    l[i + 35] = d > f ? d : f;
    h[g >> 2] = bB + 8 | 0;
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) == 3 ? c = e : (G(y.xa | 0, 43, y.ha | 0, y.qa | 0), c = h[j >> 2]);
    (h[h[c + 12 >> 2] + 4 >> 2] | 0) != 2 && G(y.xa | 0, 44, y.ha | 0, y.S | 0);
    c = g;
  }
  return c | 0;
}), 0, (function(c, d) {
  Wl[h[h[c >> 2] + 4 >> 2]](c);
  var e = Dh[Qm + 144 | 0], f = e & 255;
  (e & 255) < 14 || G(y.e | 0, 173, y.h | 0, y.i | 0);
  e = (f << 2) + d + 12 | 0;
  h[c >> 2] = h[e >> 2];
  h[e >> 2] = c;
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d) {
  var e, f = co(d, 48);
  e = f >> 2;
  (f | 0) == 0 ? e = 0 : (h[e] = op + 8 | 0, h[e + 1] = 1, l[e + 2] = .009999999776482582, l[e + 7] = 0, l[e + 8] = 0, l[e + 9] = 0, l[e + 10] = 0, a[f + 44 | 0] = 0, a[f + 45 | 0] = 0, e = f);
  h[e + 4 >> 2] = h[c + 4 >> 2];
  l[e + 8 >> 2] = l[c + 8 >> 2];
  var f = c + 12 | 0, g = e + 12 | 0, i = h[f + 4 >> 2];
  h[g >> 2] = h[f >> 2];
  h[g + 4 >> 2] = i;
  f = c + 20 | 0;
  g = e + 20 | 0;
  i = h[f + 4 >> 2];
  h[g >> 2] = h[f >> 2];
  h[g + 4 >> 2] = i;
  f = c + 28 | 0;
  g = e + 28 | 0;
  i = h[f + 4 >> 2];
  h[g >> 2] = h[f >> 2];
  h[g + 4 >> 2] = i;
  f = c + 36 | 0;
  g = e + 36 | 0;
  i = h[f + 4 >> 2];
  h[g >> 2] = h[f >> 2];
  h[g + 4 >> 2] = i;
  a[e + 44 | 0] = a[c + 44 | 0] & 1;
  a[e + 45 | 0] = a[c + 45 | 0] & 1;
  return e | 0;
}), 0, (function() {
  return 1;
}), 0, (function() {
  return 0;
}), 0, (function(c, d, e, f) {
  e >>= 2;
  var g = l[f >> 2], i = l[e] - g, j = l[f + 4 >> 2], m = l[e + 1] - j, n = l[f + 12 >> 2], o = l[f + 8 >> 2], f = n * i + o * m, q = -o, i = i * q + n * m, g = l[e + 2] - g, m = l[e + 3] - j, j = n * g + o * m - f, n = g * q + n * m - i, q = c + 12 | 0, o = h[q + 4 >> 2], q = (t[0] = h[q >> 2], x[0]), o = (t[0] = o, x[0]), g = c + 20 | 0, c = h[g + 4 >> 2], g = (t[0] = h[g >> 2], x[0]), m = (t[0] = c, x[0]), c = g - q, g = m - o, p = -c, r = g * g, s = c * c, m = Nm(r + s);
  if (m < 1.1920928955078125e-7) {
    m = g;
  } else {
    var u = 1 / m, m = g * u;
    p *= u;
  }
  var u = m * (q - f) + p * (o - i), z = m * j + p * n;
  z == 0 ? d = 0 : (z = u / z, z < 0 ? d = 0 : l[e + 4] < z ? d = 0 : (e = s + r, e == 0 ? d = 0 : (e = ((f + j * z - q) * c + (i + n * z - o) * g) / e, e < 0 | e > 1 ? d = 0 : (l[d + 8 >> 2] = z, u > 0 ? (e = (x[0] = -m, t[0]), f = (x[0] = -p, t[0]) | 0) : (e = (x[0] = m, t[0]), f = (x[0] = p, t[0]) | 0), h[d >> 2] = 0 | e, h[d + 4 >> 2] = f, d = 1))));
  return d;
}), 0, (function(c, d, e) {
  var f = c >> 2, g = l[e + 12 >> 2], i = l[f + 3], j = l[e + 8 >> 2], m = l[f + 4], n = l[e >> 2], c = g * i - j * m + n, o = l[e + 4 >> 2], e = j * i + g * m + o, i = l[f + 5], m = l[f + 6], n = g * i - j * m + n, g = j * i + g * m + o, f = l[f + 2], j = (x[0] = (c < n ? c : n) - f, t[0]), o = (x[0] = (e < g ? e : g) - f, t[0]) | 0;
  h[d >> 2] = 0 | j;
  h[d + 4 >> 2] = o;
  d = d + 8 | 0;
  c = (x[0] = (c > n ? c : n) + f, t[0]);
  e = (x[0] = (e > g ? e : g) + f, t[0]) | 0;
  h[d >> 2] = 0 | c;
  h[d + 4 >> 2] = e;
}), 0, (function(c, d) {
  l[d >> 2] = 0;
  var e = (l[c + 16 >> 2] + l[c + 24 >> 2]) * .5, f = d + 4 | 0, g = (x[0] = (l[c + 12 >> 2] + l[c + 20 >> 2]) * .5, t[0]), e = (x[0] = e, t[0]) | 0;
  h[f >> 2] = 0 | g;
  h[f + 4 >> 2] = e;
  l[d + 12 >> 2] = 0;
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d) {
  var e, f = co(d, 152);
  e = f >> 2;
  (f | 0) == 0 ? f = 0 : (h[e] = qp + 8 | 0, h[e + 1] = 2, l[e + 2] = .009999999776482582, h[e + 37] = 0, l[e + 3] = 0, l[e + 4] = 0);
  e = f >> 2;
  h[e + 1] = h[c + 4 >> 2];
  l[e + 2] = l[c + 8 >> 2];
  var g = c + 12 | 0, i = f + 12 | 0, j = h[g + 4 >> 2];
  h[i >> 2] = h[g >> 2];
  h[i + 4 >> 2] = j;
  Xp(f + 20 | 0, c + 20 | 0, 64);
  Xp(f + 84 | 0, c + 84 | 0, 64);
  h[e + 37] = h[c + 148 >> 2];
  return f | 0;
}), 0, (function() {
  return 1;
}), 0, (function(c, d, e) {
  c >>= 2;
  for (var f = l[e >> 2] - l[d >> 2], e = l[e + 4 >> 2] - l[d + 4 >> 2], g = l[d + 12 >> 2], i = l[d + 8 >> 2], d = g * f + i * e, f = f * -i + g * e, e = h[c + 37], g = 0; ; ) {
    if ((g | 0) >= (e | 0)) {
      var j = 1;
      break;
    }
    if (l[((g << 3) + 84 >> 2) + c] * (d - l[((g << 3) + 20 >> 2) + c]) + l[((g << 3) + 88 >> 2) + c] * (f - l[((g << 3) + 24 >> 2) + c]) > 0) {
      j = 0;
      break;
    }
    g = g + 1 | 0;
  }
  return j;
}), 0, (function(c, d, e, f) {
  var g = e >> 2;
  c >>= 2;
  var i = l[f >> 2], j = l[g] - i, m = l[f + 4 >> 2], n = l[g + 1] - m, e = f + 12 | 0, o = l[e >> 2], f = f + 8 | 0, q = l[f >> 2], p = o * j + q * n, r = -q, j = j * r + o * n, i = l[g + 2] - i, n = l[g + 3] - m, m = o * i + q * n - p, o = i * r + o * n - j, r = l[g + 4], q = h[c + 37], i = 0, g = -1, n = r, s = 0;
  a : for (;;) {
    if ((i | 0) >= (q | 0)) {
      s < 0 | s > r && G(y.U | 0, 249, y.wb | 0, y.fc | 0);
      if ((g | 0) <= -1) {
        var u = 0;
        break;
      }
      l[d + 8 >> 2] = s;
      u = l[e >> 2];
      e = l[((g << 3) + 84 >> 2) + c];
      f = l[f >> 2];
      p = l[((g << 3) + 88 >> 2) + c];
      c = f * e + u * p;
      u = (x[0] = u * e - f * p, t[0]);
      c = (x[0] = c, t[0]) | 0;
      h[d >> 2] = 0 | u;
      h[d + 4 >> 2] = c;
      u = 1;
      break;
    }
    var z = l[((i << 3) + 84 >> 2) + c], E = l[((i << 3) + 88 >> 2) + c], A = z * (l[((i << 3) + 20 >> 2) + c] - p) + E * (l[((i << 3) + 24 >> 2) + c] - j), z = z * m + E * o, E = z == 0;
    b : do {
      if (E) {
        if (A < 0) {
          u = 0;
          break a;
        }
        var I = g, C = n, K = s;
      } else {
        I = z < 0;
        do {
          if (I && A < s * z) {
            I = i;
            C = n;
            K = A / z;
            break b;
          }
        } while (0);
        z > 0 ? A < n * z ? (I = g, C = A / z) : (I = g, C = n) : (I = g, C = n);
        K = s;
      }
    } while (0);
    if (C < K) {
      u = 0;
      break;
    }
    i = i + 1 | 0;
    g = I;
    n = C;
    s = K;
  }
  return u;
}), 0, (function(c, d, e) {
  c >>= 2;
  var f = l[e + 12 >> 2], g = l[c + 5], i = l[e + 8 >> 2], j = l[c + 6], m = l[e >> 2], n = f * g - i * j + m, e = l[e + 4 >> 2], g = i * g + f * j + e, j = h[c + 37], o = (j | 0) > 1;
  a : do {
    if (o) {
      for (var q = g, p = g, r = n, s = n, u = 1; ; ) {
        var z = l[((u << 3) + 20 >> 2) + c], E = l[((u << 3) + 24 >> 2) + c], A = f * z - i * E + m, z = i * z + f * E + e, s = s < A ? s : A, p = p < z ? p : z, r = r > A ? r : A, q = q > z ? q : z, u = u + 1 | 0;
        if ((u | 0) >= (j | 0)) {
          var I = q, C = p, K = r, J = s;
          break a;
        }
      }
    } else {
      C = I = g, J = K = n;
    }
  } while (0);
  c = l[c + 2];
  J = (x[0] = J - c, t[0]);
  C = (x[0] = C - c, t[0]) | 0;
  h[d >> 2] = 0 | J;
  h[d + 4 >> 2] = C;
  d = d + 8 | 0;
  K = (x[0] = K + c, t[0]);
  I = (x[0] = I + c, t[0]) | 0;
  h[d >> 2] = 0 | K;
  h[d + 4 >> 2] = I;
}), 0, (function(c, d, e) {
  var f;
  f = c + 148 | 0;
  var g = h[f >> 2];
  if ((g | 0) > 2) {
    i = g, f = 3;
  } else {
    if (G(y.U | 0, 306, y.oa | 0, y.lc | 0), f = h[f >> 2], (f | 0) > 0) {
      var i = f;
      f = 3;
    } else {
      var j = d | 0, m = l[j >> 2] = 0, n = 0, o = 0, q = 0, p = 0, r = 0;
      f = 10;
    }
  }
  do {
    if (f == 3) {
      for (var s = g = f = 0; ; ) {
        var u = g + l[c + (s << 3) + 20 >> 2], z = f + l[c + (s << 3) + 24 >> 2], s = s + 1 | 0;
        if ((s | 0) >= (i | 0)) {
          break;
        }
        f = z;
        g = u;
      }
      g = 1 / (i | 0);
      f = u * g;
      g *= z;
      for (var s = c + 20 | 0, E = c + 24 | 0, A = 0, I = 0, C = 0, K = 0, J = 0; ; ) {
        var N = l[c + (J << 3) + 20 >> 2] - f, B = l[c + (J << 3) + 24 >> 2] - g, J = J + 1 | 0, F = (J | 0) < (i | 0);
        if (F) {
          var H = (J << 3) + c + 20 | 0, O = (J << 3) + c + 24 | 0;
        } else {
          H = s, O = E;
        }
        var D = l[H >> 2] - f, Q = l[O >> 2] - g, P = N * Q - B * D, H = P * .5, O = C + H, M = H * .3333333432674408, H = I + (N + D) * M, M = A + (B + Q) * M, N = K + P * .0833333358168602 * (N * N + D * N + D * D + B * B + Q * B + Q * Q);
        if (!F) {
          break;
        }
        A = M;
        I = H;
        C = O;
        K = N;
      }
      s = O * e;
      E = d | 0;
      l[E >> 2] = s;
      if (O > 1.1920928955078125e-7) {
        var Na = s, U = g, L = f, R = N, la = O, Da = H, Y = M;
        f = 11;
      } else {
        m = g, n = f, o = N, q = O, p = H, r = M, j = E, f = 10;
      }
    }
  } while (0);
  f == 10 && (G(y.U | 0, 352, y.oa | 0, y.tc | 0), Na = l[j >> 2], U = m, L = n, R = o, la = q, Da = p, Y = r);
  c = 1 / la;
  Da *= c;
  Y *= c;
  L = Da + L;
  U = Y + U;
  c = d + 4 | 0;
  i = (x[0] = L, t[0]);
  m = (x[0] = U, t[0]) | 0;
  h[c >> 2] = 0 | i;
  h[c + 4 >> 2] = m;
  l[d + 12 >> 2] = R * e + Na * (L * L + U * U - (Da * Da + Y * Y));
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, kb(), 0, kb(), 0, kb(), 0, kb(), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d, e) {
  c = b[d + 36 >> 1];
  return c << 16 >> 16 != b[e + 36 >> 1] << 16 >> 16 | c << 16 >> 16 == 0 ? (b[e + 32 >> 1] & b[d + 34 >> 1]) << 16 >> 16 == 0 ? 0 : (b[e + 34 >> 1] & b[d + 32 >> 1]) << 16 >> 16 != 0 : c << 16 >> 16 > 0;
}), 0, (function(c, d, e, f) {
  var g, i = qg;
  qg += 48;
  g = i >> 2;
  var j = h[h[c + 48 >> 2] + 12 >> 2];
  h[g] = op + 8 | 0;
  h[g + 1] = 1;
  l[g + 2] = .009999999776482582;
  l[g + 7] = 0;
  l[g + 8] = 0;
  l[g + 9] = 0;
  l[g + 10] = 0;
  a[i + 44 | 0] = 0;
  a[i + 45 | 0] = 0;
  Ss(j, i, h[c + 56 >> 2]);
  Mm(d, i, e, h[h[c + 52 >> 2] + 12 >> 2], f);
  qg = i;
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d, e, f) {
  var g, i = qg;
  qg += 300;
  var j = i + 252;
  g = j >> 2;
  var m = h[h[c + 48 >> 2] + 12 >> 2];
  h[g] = op + 8 | 0;
  h[g + 1] = 1;
  l[g + 2] = .009999999776482582;
  l[g + 7] = 0;
  l[g + 8] = 0;
  l[g + 9] = 0;
  l[g + 10] = 0;
  a[j + 44 | 0] = 0;
  a[j + 45 | 0] = 0;
  Ss(m, j, h[c + 56 >> 2]);
  zp(i, d, j, e, h[h[c + 52 >> 2] + 12 >> 2], f);
  qg = i;
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d, e, f) {
  var g = h[h[c + 48 >> 2] + 12 >> 2], i = h[h[c + 52 >> 2] + 12 >> 2], j = d + 60 | 0;
  h[j >> 2] = 0;
  var m = g + 12 | 0, n = l[e + 12 >> 2], o = l[m >> 2], q = l[e + 8 >> 2], p = l[g + 16 >> 2], c = i + 12 | 0, r = l[f + 12 >> 2], s = l[c >> 2], u = l[f + 8 >> 2], z = l[i + 16 >> 2], E = r * s - u * z + l[f >> 2] - (n * o - q * p + l[e >> 2]), e = u * s + r * z + l[f + 4 >> 2] - (q * o + n * p + l[e + 4 >> 2]), g = l[g + 8 >> 2] + l[i + 8 >> 2];
  E * E + e * e > g * g || (h[d + 56 >> 2] = 0, g = d + 48 | 0, E = h[m + 4 >> 2], h[g >> 2] = h[m >> 2], h[g + 4 >> 2] = E, l[d + 40 >> 2] = 0, l[d + 44 >> 2] = 0, h[j >> 2] = 1, j = h[c + 4 >> 2], h[d >> 2] = h[c >> 2], h[d + 4 >> 2] = j, h[d + 16 >> 2] = 0);
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function() {
  ta("Pure virtual function called!");
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d, e, f) {
  Mm(d, h[h[c + 48 >> 2] + 12 >> 2], e, h[h[c + 52 >> 2] + 12 >> 2], f);
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d, e, f) {
  var g = qg;
  qg += 252;
  zp(g, d, h[h[c + 48 >> 2] + 12 >> 2], e, h[h[c + 52 >> 2] + 12 >> 2], f);
  qg = g;
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d, e, f) {
  var g, i, j = d >> 2, m = h[h[c + 48 >> 2] + 12 >> 2], n = h[h[c + 52 >> 2] + 12 >> 2];
  i = m >> 2;
  g = (d + 60 | 0) >> 2;
  h[g] = 0;
  for (var o = n + 12 | 0, q = l[f + 12 >> 2], p = l[o >> 2], r = l[f + 8 >> 2], s = l[n + 16 >> 2], u = q * p - r * s + l[f >> 2] - l[e >> 2], z = r * p + q * s + l[f + 4 >> 2] - l[e + 4 >> 2], E = l[e + 12 >> 2], A = l[e + 8 >> 2], I = E * u + A * z, C = u * -A + E * z, K = l[m + 8 >> 2] + l[n + 8 >> 2], J = h[m + 148 >> 2], N = 0, B = -3.4028234663852886e+38, F = 0; ; ) {
    if ((N | 0) < (J | 0)) {
      var H = l[((N << 3) + 84 >> 2) + i] * (I - l[((N << 3) + 20 >> 2) + i]) + l[((N << 3) + 88 >> 2) + i] * (C - l[((N << 3) + 24 >> 2) + i]);
      if (H > K) {
        break;
      }
      var O = H > B, D = O ? N : F, Q = O ? H : B, N = N + 1 | 0, B = Q, F = D;
    } else {
      var P = F + 1 | 0, M = (P | 0) < (J | 0) ? P : 0, Na = (F << 3) + m + 20 | 0, U = k[Na >> 2], L = k[Na + 4 >> 2], R = (t[0] = U, x[0]), la = (t[0] = L, x[0]), Da = (M << 3) + m + 20 | 0, Y = k[Da >> 2], Z = k[Da + 4 >> 2], W = (t[0] = Y, x[0]), wa = (t[0] = Z, x[0]);
      if (B < 1.1920928955078125e-7) {
        h[g] = 1;
        h[j + 14] = 1;
        var X = (F << 3) + m + 84 | 0, aa = d + 40 | 0, ga = h[X + 4 >> 2];
        h[aa >> 2] = h[X >> 2];
        h[aa + 4 >> 2] = ga;
        var ca = (la + wa) * .5, La = d + 48 | 0, Ua = (x[0] = (R + W) * .5, t[0]), Va = (x[0] = ca, t[0]) | 0;
        h[La >> 2] = 0 | Ua;
        h[La + 4 >> 2] = Va;
        var ma = o, xa = d, ua = h[ma + 4 >> 2];
        h[xa >> 2] = h[ma >> 2];
        h[xa + 4 >> 2] = ua;
        h[j + 4] = 0;
        break;
      }
      var da = I - R, ya = C - la, Ha = I - W, ab = C - wa;
      if (da * (W - R) + ya * (wa - la) <= 0) {
        var bb = da * da + ya * ya;
        if (bb > K * K) {
          break;
        }
        h[g] = 1;
        h[j + 14] = 1;
        var ob = d + 40 | 0, gb = ob, yb = (x[0] = da, t[0]), db = (x[0] = ya, t[0]) | 0, eb = gb | 0;
        h[eb >> 2] = 0 | yb;
        var pa = gb + 4 | 0;
        h[pa >> 2] = db;
        var $ = Nm(bb);
        if ($ >= 1.1920928955078125e-7) {
          var Oa = d + 44 | 0, ea = 1 / $;
          l[ob >> 2] = da * ea;
          l[Oa >> 2] = ya * ea;
        }
        var ha = d + 48 | 0, ja = ha | 0;
        h[ja >> 2] = U;
        var ka = ha + 4 | 0;
        h[ka >> 2] = L;
        var za = o, qa = d, Aa = za | 0, fb = za + 4 | 0, na = h[fb >> 2], Pa = qa | 0;
        h[Pa >> 2] = h[Aa >> 2];
        var mb = qa + 4 | 0;
        h[mb >> 2] = na;
        h[j + 4] = 0;
        break;
      }
      if (Ha * (R - W) + ab * (la - wa) > 0) {
        var lb = (R + W) * .5, pb = (la + wa) * .5, Cb = (F << 3) + m + 84 | 0;
        if ((I - lb) * l[Cb >> 2] + (C - pb) * l[((F << 3) + 88 >> 2) + i] > K) {
          break;
        }
        h[g] = 1;
        h[j + 14] = 1;
        var hb = Cb, Qa = d + 40 | 0, ba = h[hb + 4 >> 2];
        h[Qa >> 2] = h[hb >> 2];
        h[Qa + 4 >> 2] = ba;
        var ra = d + 48 | 0, Ma = (x[0] = lb, t[0]), Wa = (x[0] = pb, t[0]) | 0;
        h[ra >> 2] = 0 | Ma;
        h[ra + 4 >> 2] = Wa;
        var Ca = o, Ba = d, Xa = h[Ca + 4 >> 2];
        h[Ba >> 2] = h[Ca >> 2];
        h[Ba + 4 >> 2] = Xa;
        h[j + 4] = 0;
        break;
      }
      var fa = Ha * Ha + ab * ab;
      if (fa > K * K) {
        break;
      }
      h[g] = 1;
      h[j + 14] = 1;
      var Ra = d + 40 | 0, Za = Ra, nb = (x[0] = Ha, t[0]), Fb = (x[0] = ab, t[0]), qb = 0 | nb, Ia = Fb | 0, eb = Za | 0;
      h[eb >> 2] = qb;
      pa = Za + 4 | 0;
      h[pa >> 2] = Ia;
      var rb = Nm(fa);
      if (rb >= 1.1920928955078125e-7) {
        var Ya = d + 44 | 0, oa = 1 / rb;
        l[Ra >> 2] = Ha * oa;
        l[Ya >> 2] = ab * oa;
      }
      var Fa = d + 48 | 0, ja = Fa | 0;
      h[ja >> 2] = Y;
      ka = Fa + 4 | 0;
      h[ka >> 2] = Z;
      var $a = o, Ea = d, Aa = $a | 0, Ga = h[Aa >> 2], fb = $a + 4 | 0, Ja = h[fb >> 2], Pa = Ea | 0;
      h[Pa >> 2] = Ga;
      mb = Ea + 4 | 0;
      h[mb >> 2] = Ja;
      h[j + 4] = 0;
      break;
    }
  }
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0, (function(c, d, e, f) {
  var g, i, j, m, n, o, q, p, r, s, u, z, E, A = f >> 2, I = e >> 2, C = qg;
  qg += 80;
  var K, J = C + 4, N = C + 8, B = C + 32;
  E = B >> 2;
  var F = C + 56;
  z = F >> 2;
  var H = h[h[c + 48 >> 2] + 12 >> 2], O = h[h[c + 52 >> 2] + 12 >> 2];
  u = N >> 2;
  s = B >> 2;
  r = F >> 2;
  var D = d + 60 | 0;
  h[D >> 2] = 0;
  var Q = l[H + 8 >> 2] + l[O + 8 >> 2];
  h[C >> 2] = 0;
  var P = Ap(C, H, e, O, f), M = P > Q;
  do {
    if (!M) {
      h[J >> 2] = 0;
      var Na = Ap(J, O, f, H, e);
      if (Na <= Q) {
        if (Na > P * .9800000190734863 + .0010000000474974513) {
          var U = l[A], L = l[A + 1], R = l[A + 2], la = l[A + 3], Da = l[I], Y = l[I + 1], Z = l[I + 2], W = l[I + 3], wa = h[J >> 2];
          h[d + 56 >> 2] = 2;
          var X = 1, aa = wa, ga = H;
          p = ga >> 2;
          var ca = O;
          q = ca >> 2;
          var La = U, Ua = L, Va = R, ma = la, xa = Da, ua = Y, da = Z, ya = W;
        } else {
          var Ha = l[I], ab = l[I + 1], bb = l[I + 2], ob = l[I + 3], gb = l[A], yb = l[A + 1], db = l[A + 2], eb = l[A + 3], pa = h[C >> 2];
          h[d + 56 >> 2] = 1;
          X = 0;
          aa = pa;
          ga = O;
          p = ga >> 2;
          ca = H;
          q = ca >> 2;
          La = Ha;
          Ua = ab;
          Va = bb;
          ma = ob;
          xa = gb;
          ua = yb;
          da = db;
          ya = eb;
        }
        var $ = h[p + 37];
        K = (aa | 0) > -1 ? (h[q + 37] | 0) > (aa | 0) ? 8 : 7 : 7;
        K == 7 && G(y.Ga | 0, 151, y.jb | 0, y.ta | 0);
        var Oa = l[((aa << 3) + 84 >> 2) + q], ea = l[((aa << 3) + 88 >> 2) + q], ha = ma * Oa - Va * ea, ja = Va * Oa + ma * ea, ka = ya * ha + da * ja, za = -da, qa = ha * za + ya * ja, Aa = ($ | 0) > 0;
        a : do {
          if (Aa) {
            for (var fb = 0, na = 3.4028234663852886e+38, Pa = 0; ; ) {
              var mb = ka * l[((Pa << 3) + 84 >> 2) + p] + qa * l[((Pa << 3) + 88 >> 2) + p], lb = mb < na, pb = lb ? Pa : fb, Cb = lb ? mb : na, hb = Pa + 1 | 0;
              if ((hb | 0) == ($ | 0)) {
                var Qa = pb;
                break a;
              }
              fb = pb;
              na = Cb;
              Pa = hb;
            }
          } else {
            Qa = 0;
          }
        } while (0);
        var ba = Qa + 1 | 0, ra = (ba | 0) < ($ | 0) ? ba : 0, Ma = l[((Qa << 3) + 20 >> 2) + p], Wa = l[((Qa << 3) + 24 >> 2) + p], Ca = ya * Ma - da * Wa + xa, Ba = da * Ma + ya * Wa + ua, Xa = N, fa = (x[0] = Ca, t[0]), Ra = (x[0] = Ba, t[0]) | 0;
        h[Xa >> 2] = 0 | fa;
        h[Xa + 4 >> 2] = Ra;
        var Za = aa & 255, nb = N + 8 | 0, Fb = nb;
        a[nb] = Za;
        var qb = Qa & 255;
        a[Fb + 1 | 0] = qb;
        a[Fb + 2 | 0] = 1;
        a[Fb + 3 | 0] = 0;
        var Ia = N + 12 | 0, rb = l[((ra << 3) + 20 >> 2) + p], Ya = l[((ra << 3) + 24 >> 2) + p], oa = ya * rb - da * Ya + xa, Fa = da * rb + ya * Ya + ua, $a = Ia, Ea = (x[0] = oa, t[0]), Ga = (x[0] = Fa, t[0]) | 0;
        h[$a >> 2] = 0 | Ea;
        h[$a + 4 >> 2] = Ga;
        var Ja = N + 20 | 0, Sa = Ja;
        a[Ja] = Za;
        a[Sa + 1 | 0] = ra & 255;
        a[Sa + 2 | 0] = 1;
        a[Sa + 3 | 0] = 0;
        var vb = aa + 1 | 0, Gb = (vb | 0) < (h[q + 37] | 0) ? vb : 0, zb = (aa << 3) + ca + 20 | 0, Nb = h[zb + 4 >> 2], Ob = (t[0] = h[zb >> 2], x[0]), Db = (t[0] = Nb, x[0]), Pb = (Gb << 3) + ca + 20 | 0, Ab = h[Pb + 4 >> 2], Eb = (t[0] = h[Pb >> 2], x[0]), sb = (t[0] = Ab, x[0]), cb = Eb - Ob, Mb = sb - Db, wb = Nm(cb * cb + Mb * Mb);
        if (wb < 1.1920928955078125e-7) {
          var tb = cb, V = Mb;
        } else {
          var ia = 1 / wb, tb = cb * ia, V = Mb * ia;
        }
        var Hb = (Ob + Eb) * .5, Qb = ma * tb - Va * V, Bb = Va * tb + ma * V, Ib = Qb * -1, Xb = ma * Ob - Va * Db + La, ec = Va * Ob + ma * Db + Ua, Ka = (Db + sb) * .5, Jb = Bb * Xb + Ib * ec, S = Q - (Qb * Xb + Bb * ec), ub = Qb * (ma * Eb - Va * sb + La) + Bb * (Va * Eb + ma * sb + Ua) + Q, Kb = -Qb, sa = -Bb, Rb = Ca * Kb + Ba * sa - S, ic = oa * Kb + Fa * sa - S;
        if (Rb > 0) {
          var $b = 0;
        } else {
          h[s] = h[u], h[s + 1] = h[u + 1], h[s + 2] = h[u + 2], $b = 1;
        }
        if (ic > 0) {
          var ac = $b;
        } else {
          o = (B + $b * 12 | 0) >> 2, n = Ia >> 2, h[o] = h[n], h[o + 1] = h[n + 1], h[o + 2] = h[n + 2], ac = $b + 1 | 0;
        }
        if (Rb * ic < 0) {
          var lc = Rb / (Rb - ic), yc = Ba + (Fa - Ba) * lc, Gc = B + ac * 12 | 0, zc = (x[0] = Ca + (oa - Ca) * lc, t[0]), mc = (x[0] = yc, t[0]), bc = 0 | zc, cc = mc | 0, Sb = Gc | 0;
          m = Sb >> 2;
          h[m] = bc;
          var Lb = Gc + 4 | 0;
          j = Lb >> 2;
          h[j] = cc;
          var ib = B + ac * 12 + 8 | 0, Tb = ib;
          a[ib] = Za;
          a[Tb + 1 | 0] = qb;
          a[Tb + 2 | 0] = 0;
          a[Tb + 3 | 0] = 1;
          var dc = ac + 1 | 0;
        } else {
          dc = ac;
        }
        if ((dc | 0) >= 2) {
          var Ac = l[E], Hc = l[E + 1], Ic = Qb * Ac + Bb * Hc - ub, fc = B + 12 | 0, od = l[fc >> 2], Wc = l[E + 4], Qc = Qb * od + Bb * Wc - ub;
          if (Ic > 0) {
            var xb = 0;
          } else {
            h[r] = h[s], h[r + 1] = h[s + 1], h[r + 2] = h[s + 2], xb = 1;
          }
          if (Qc > 0) {
            var Wb = xb;
          } else {
            i = (F + xb * 12 | 0) >> 2, g = fc >> 2, h[i] = h[g], h[i + 1] = h[g + 1], h[i + 2] = h[g + 2], Wb = xb + 1 | 0;
          }
          if (Ic * Qc < 0) {
            var oc = Ic / (Ic - Qc), Tc = Hc + (Wc - Hc) * oc, Jc = F + Wb * 12 | 0, Kc = (x[0] = Ac + (od - Ac) * oc, t[0]), gc = (x[0] = Tc, t[0]), Bc = 0 | Kc, Rc = gc | 0, Sb = Jc | 0;
            m = Sb >> 2;
            h[m] = Bc;
            Lb = Jc + 4 | 0;
            j = Lb >> 2;
            h[j] = Rc;
            var jc = F + Wb * 12 + 8 | 0, Lc = jc;
            a[jc] = Gb & 255;
            a[Lc + 1 | 0] = a[B + 9 | 0];
            a[Lc + 2 | 0] = 0;
            a[Lc + 3 | 0] = 1;
            var vd = Wb + 1 | 0;
          } else {
            vd = Wb;
          }
          if ((vd | 0) >= 2) {
            var tc = d + 40 | 0, uc = (x[0] = V, t[0]), Xc = (x[0] = tb * -1, t[0]) | 0;
            h[tc >> 2] = 0 | uc;
            h[tc + 4 >> 2] = Xc;
            var wd = d + 48 | 0, jb = (x[0] = Hb, t[0]), rc = (x[0] = Ka, t[0]) | 0;
            h[wd >> 2] = 0 | jb;
            h[wd + 4 >> 2] = rc;
            var Ub = l[z], xd = l[z + 1], nc = Bb * Ub + Ib * xd - Jb > Q;
            if (X << 24 >> 24 == 0) {
              if (nc) {
                var Yb = 0;
              } else {
                var yd = Ub - xa, Od = xd - ua, cd = yd * za + ya * Od, dd = d, Yc = (x[0] = ya * yd + da * Od, t[0]), ed = (x[0] = cd, t[0]) | 0, pc = dd | 0;
                h[pc >> 2] = 0 | Yc;
                var Mc = dd + 4 | 0;
                h[Mc >> 2] = ed;
                h[d + 16 >> 2] = h[z + 2];
                Yb = 1;
              }
              var Uc = l[z + 3], fd = l[z + 4];
              if (Bb * Uc + Ib * fd - Jb > Q) {
                var Cc = Yb;
              } else {
                var pd = Uc - xa, zd = fd - ua, be = pd * za + ya * zd, Jd = d + Yb * 20 | 0, Pd = (x[0] = ya * pd + da * zd, t[0]), qd = (x[0] = be, t[0]) | 0, Sb = Jd | 0;
                m = Sb >> 2;
                h[m] = 0 | Pd;
                Lb = Jd + 4 | 0;
                j = Lb >> 2;
                h[j] = qd;
                h[(d + 16 >> 2) + (Yb * 5 | 0)] = h[z + 5];
                Cc = Yb + 1 | 0;
              }
            } else {
              if (nc) {
                var kc = 0;
              } else {
                var hc = Ub - xa, vc = xd - ua, gd = hc * za + ya * vc, hd = d, qc = (x[0] = ya * hc + da * vc, t[0]), Zb = (x[0] = gd, t[0]) | 0, pc = hd | 0;
                h[pc >> 2] = 0 | qc;
                Mc = hd + 4 | 0;
                h[Mc >> 2] = Zb;
                var Ad = d + 16 | 0, id = k[z + 2];
                h[Ad >> 2] = id;
                var ce = id >>> 24 & 255, Qd = id >>> 16 & 255, Rd = id & 255, Zc = Ad, Bd = Zc + 1 | 0, jd = Zc + 2 | 0, Cd = Zc + 3 | 0;
                a[Ad] = id >>> 8 & 255;
                a[Bd] = Rd;
                a[jd] = ce;
                a[Cd] = Qd;
                kc = 1;
              }
              var kd = l[z + 3], Vc = l[z + 4];
              if (Bb * kd + Ib * Vc - Jb > Q) {
                Cc = kc;
              } else {
                var Sd = kd - xa, Dd = Vc - ua, ye = Sd * za + ya * Dd, Xd = d + kc * 20 | 0, pe = (x[0] = ya * Sd + da * Dd, t[0]), Le = (x[0] = ye, t[0]) | 0, Sb = Xd | 0;
                m = Sb >> 2;
                h[m] = 0 | pe;
                Lb = Xd + 4 | 0;
                j = Lb >> 2;
                h[j] = Le;
                var qe = d + kc * 20 + 16 | 0, Nc = k[z + 5];
                h[qe >> 2] = Nc;
                var Kd = Nc >>> 24 & 255, Ld = Nc >>> 16 & 255, ld = Nc & 255, de = qe, Sc = de + 1 | 0, md = de + 2 | 0, Me = de + 3 | 0;
                a[qe] = Nc >>> 8 & 255;
                a[Sc] = ld;
                a[md] = Kd;
                a[Me] = Ld;
                Cc = kc + 1 | 0;
              }
            }
            h[D >> 2] = Cc;
          }
        }
      }
    }
  } while (0);
  qg = C;
}), 0, kb(), 0, (function(c) {
  (c | 0) != 0 && yp(c);
}), 0 ];

Module.FUNCTION_TABLE = Wl;

function GG(c) {
  c = c || Module.arguments;
  Em(Fm);
  var d = Ta;
  Module._main && (d = Module.Ec(c), Em(Gm));
  return d;
}

var startTime = Date.now();

Module.run = GG;

Module.preRun && Module.preRun();

Module.noInitialRun || GG();

Module.postRun && Module.postRun();

if (typeof document != 'undefined') {
  document.write('Box2D benchmark: ' + OUTPUT + ' ms per frame, total time: ' + (Date.now() - startTime) + ' ms.');
} else {
  print('Box2D benchmark: ' + OUTPUT + ' ms per frame, total time: ' + (Date.now() - startTime) + ' ms.');
}

