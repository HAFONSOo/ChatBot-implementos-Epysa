var _v = Object.defineProperty;
var bv = (e, t, n) => t in e ? _v(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var bo = (e, t, n) => bv(e, typeof t != "symbol" ? t + "" : t, n);
import { nextTick as Me, ref as D, computed as I, createElementBlock as C, openBlock as b, createElementVNode as p, renderSlot as ae, inject as Le, isRef as Cp, defineComponent as Z, createVNode as he, withCtx as J, createTextVNode as mr, toDisplayString as ke, unref as _, createCommentVNode as te, getCurrentScope as Sp, onScopeDispose as Ep, readonly as Ap, createBlock as Y, withModifiers as tt, onMounted as je, onUnmounted as $p, normalizeStyle as Ue, withDirectives as rt, withKeys as ft, vModelText as Mp, Fragment as He, renderList as ot, onBeforeUnmount as Ft, getCurrentInstance as lt, watch as ue, warn as yv, shallowRef as mn, onBeforeMount as wv, provide as St, mergeProps as We, toRef as Bt, useAttrs as ao, useSlots as Ip, normalizeClass as H, resolveDynamicComponent as ht, vShow as Qt, Transition as er, reactive as zn, onUpdated as kv, cloneVNode as xv, Text as Tp, Comment as Cv, Teleport as Sv, onDeactivated as Ev, watchEffect as Gc, toRaw as Vo, toRefs as ss, triggerRef as Rr, resolveComponent as $n, resolveDirective as Kc, createSlots as Kr, h as Rt, normalizeProps as Xr, createStaticVNode as Dn, useCssModule as is, pushScopeId as Av, popScopeId as $v, guardReactiveProps as Lp, mergeDefaults as Op, createApp as Mv } from "vue";
/*! Package version @n8n/chat@0.58.0 */
const Pr = {
  webhookUrl: "http://localhost:5678",
  webhookConfig: {
    method: "POST",
    headers: {}
  },
  target: "#n8n-chat",
  mode: "window",
  loadPreviousSession: !0,
  chatInputKey: "chatInput",
  chatSessionKey: "sessionId",
  defaultLanguage: "en",
  showWelcomeScreen: !1,
  initialMessages: ["Hi there! 👋", "My name is Nathan. How can I assist you today?"],
  i18n: {
    en: {
      title: "Hi there! 👋",
      subtitle: "Start a chat. We're here to help you 24/7.",
      footer: "",
      getStarted: "New Conversation",
      inputPlaceholder: "Type your question..",
      closeButtonTooltip: "Close chat"
    }
  },
  theme: {},
  enableStreaming: !1
}, Iv = "#n8n-chat", Tv = "n8n-chat", Xl = `${Tv}/sessionId`, Rp = "Chat", Pp = "ChatOptions";
var at = [];
for (var Ps = 0; Ps < 256; ++Ps)
  at.push((Ps + 256).toString(16).slice(1));
function Lv(e, t = 0) {
  return (at[e[t + 0]] + at[e[t + 1]] + at[e[t + 2]] + at[e[t + 3]] + "-" + at[e[t + 4]] + at[e[t + 5]] + "-" + at[e[t + 6]] + at[e[t + 7]] + "-" + at[e[t + 8]] + at[e[t + 9]] + "-" + at[e[t + 10]] + at[e[t + 11]] + at[e[t + 12]] + at[e[t + 13]] + at[e[t + 14]] + at[e[t + 15]]).toLowerCase();
}
var yo, Ov = new Uint8Array(16);
function Rv() {
  if (!yo && (yo = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !yo))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return yo(Ov);
}
var Pv = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const Yl = {
  randomUUID: Pv
};
function Xn(e, t, n) {
  if (Yl.randomUUID && !e)
    return Yl.randomUUID();
  e = e || {};
  var r = e.random || (e.rng || Rv)();
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, Lv(r);
}
async function Bv() {
  return "";
}
async function Xc(...e) {
  var i, a;
  const t = await Bv(), n = (i = e[1]) == null ? void 0 : i.body, r = {
    ...t ? { authorization: `Bearer ${t}` } : {},
    ...(a = e[1]) == null ? void 0 : a.headers
  };
  n instanceof FormData ? delete r["Content-Type"] : r["Content-Type"] = "application/json";
  const s = await fetch(e[0], {
    ...e[1],
    mode: "cors",
    cache: "no-cache",
    headers: r
  });
  let o;
  try {
    o = await s.clone().json();
  } catch {
    o = await s.text();
  }
  return o;
}
async function Bp(e, t = {}, n = {}) {
  let r = e;
  return Object.keys(t).length > 0 && (r = `${r}?${new URLSearchParams(
    t
  ).toString()}`), await Xc(r, { ...n, method: "GET" });
}
async function zp(e, t = {}, n = {}) {
  return await Xc(e, {
    ...n,
    method: "POST",
    body: JSON.stringify(t)
  });
}
async function zv(e, t = {}, n = [], r = {}) {
  const s = new FormData();
  for (const o in t) {
    const i = t[o];
    typeof i == "object" && i !== null ? s.append(o, JSON.stringify(i)) : s.append(o, i);
  }
  for (const o of n)
    s.append("files", o);
  return await Xc(e, {
    ...r,
    method: "POST",
    body: s
  });
}
async function Dv(e, t) {
  var r, s;
  return await (((r = t.webhookConfig) == null ? void 0 : r.method) === "POST" ? zp : Bp)(
    `${t.webhookUrl}`,
    {
      action: "loadPreviousSession",
      [t.chatSessionKey]: e,
      ...t.metadata ? { metadata: t.metadata } : {}
    },
    {
      headers: (s = t.webhookConfig) == null ? void 0 : s.headers
    }
  );
}
async function Nv(e, t, n, r) {
  var o, i, a;
  return t.length > 0 ? await zv(
    `${r.webhookUrl}`,
    {
      action: "sendMessage",
      [r.chatSessionKey]: n,
      [r.chatInputKey]: e,
      ...r.metadata ? { metadata: r.metadata } : {}
    },
    t,
    {
      headers: (o = r.webhookConfig) == null ? void 0 : o.headers
    }
  ) : await (((i = r.webhookConfig) == null ? void 0 : i.method) === "POST" ? zp : Bp)(
    `${r.webhookUrl}`,
    {
      action: "sendMessage",
      [r.chatSessionKey]: n,
      [r.chatInputKey]: e,
      ...r.metadata ? { metadata: r.metadata } : {}
    },
    {
      headers: (a = r.webhookConfig) == null ? void 0 : a.headers
    }
  );
}
function qv() {
  let e = "";
  const t = new TextDecoder();
  return new TransformStream({
    transform(n, r) {
      e += t.decode(n, { stream: !0 });
      const s = e.split(`
`);
      e = s.pop() ?? "";
      for (const o of s)
        if (o.trim())
          try {
            const i = JSON.parse(o);
            r.enqueue(i);
          } catch {
            r.enqueue({
              type: "item",
              content: o
            });
          }
    },
    flush(n) {
      if (e.trim())
        try {
          const r = JSON.parse(e);
          n.enqueue(r);
        } catch {
          n.enqueue({
            type: "item",
            content: e
          });
        }
    }
  });
}
async function Fv(e, t, n, r, s) {
  var c, u;
  const o = await (t.length > 0 ? Hv(e, t, n, r) : jv(e, n, r));
  if (!o.ok) {
    const d = await o.text();
    throw console.error("HTTP error response:", o.status, d), new Error(`Error while sending message. Error: ${d}`);
  }
  if (!o.body)
    throw new Error("Response body is not readable");
  const i = o.body.pipeThrough(qv()).getReader();
  let a = !1;
  try {
    for (; ; ) {
      const { done: d, value: l } = await i.read();
      if (d) break;
      const m = ((c = l.metadata) == null ? void 0 : c.nodeId) || "unknown", f = (u = l.metadata) == null ? void 0 : u.runIndex;
      switch (l.type) {
        case "begin":
          s.onBeginMessage(m, f);
          break;
        case "item":
          a = !0, s.onChunk(l.content ?? "", m, f);
          break;
        case "end":
          s.onEndMessage(m, f);
          break;
        case "error":
          a = !0, s.onChunk(`Error: ${l.content ?? "Unknown error"}`, m, f), s.onEndMessage(m, f);
          break;
      }
    }
  } finally {
    i.releaseLock();
  }
  return { hasReceivedChunks: a };
}
async function Hv(e, t, n, r) {
  var o;
  const s = new FormData();
  s.append("action", "sendMessage"), s.append(r.chatSessionKey, n), s.append(r.chatInputKey, e), r.metadata && s.append("metadata", JSON.stringify(r.metadata));
  for (const i of t)
    s.append("files", i);
  return await fetch(r.webhookUrl, {
    method: "POST",
    headers: {
      Accept: "text/plain",
      ...(o = r.webhookConfig) == null ? void 0 : o.headers
    },
    body: s
  });
}
async function jv(e, t, n) {
  var s;
  const r = {
    action: "sendMessage",
    [n.chatSessionKey]: t,
    [n.chatInputKey]: e,
    ...n.metadata ? { metadata: n.metadata } : {}
  };
  return await fetch(n.webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
      ...(s = n.webhookConfig) == null ? void 0 : s.headers
    },
    body: JSON.stringify(r)
  });
}
function Vv() {
  const e = /* @__PURE__ */ new Map();
  function t(s, o) {
    const i = e.get(s);
    i && i.splice(i.indexOf(o) >>> 0, 1);
  }
  function n(s, o) {
    let i = e.get(s);
    return i ? i.push(o) : i = [o], e.set(s, i), () => t(s, o);
  }
  function r(s, o) {
    const i = e.get(s);
    i && i.slice().forEach(async (a) => {
      await a(o);
    });
  }
  return {
    on: n,
    off: t,
    emit: r
  };
}
function Uv(e) {
  if (!document.querySelector(e)) {
    const n = document.createElement("div");
    e.startsWith("#") && (n.id = e.replace("#", "")), e.startsWith(".") && n.classList.add(e.replace(".", "")), document.body.appendChild(n);
  }
}
function Zv(e, t, n, r) {
  const s = new URL(e).origin, o = s.startsWith("https") ? "wss" : "ws";
  return `${s.replace(/^https?/, o)}/chat?sessionId=${n}&executionId=${t}&isPublic=true`;
}
const _t = Vv();
class Wv {
  constructor() {
    bo(this, "nodeRuns", /* @__PURE__ */ new Map());
    bo(this, "runOrder", []);
    bo(this, "activeRuns", /* @__PURE__ */ new Set());
  }
  getRunKey(t, n) {
    return n !== void 0 ? `${t}-${n}` : t;
  }
  initializeRun(t, n) {
    const r = this.getRunKey(t, n);
    if (!this.nodeRuns.has(r)) {
      const s = vr();
      return this.nodeRuns.set(r, {
        content: "",
        isComplete: !1,
        message: s
      }), this.runOrder.push(r), s;
    }
    return this.nodeRuns.get(r).message;
  }
  registerRunStart(t, n) {
    const r = this.getRunKey(t, n);
    this.activeRuns.add(r);
  }
  addRunToActive(t, n) {
    const r = this.getRunKey(t, n);
    return this.activeRuns.add(r), this.initializeRun(t, n);
  }
  removeRunFromActive(t, n) {
    const r = this.getRunKey(t, n);
    this.activeRuns.delete(r);
    const s = this.nodeRuns.get(r);
    s && (s.isComplete = !0);
  }
  addChunkToRun(t, n, r) {
    const s = this.getRunKey(t, r), o = this.nodeRuns.get(s);
    if (o) {
      o.content += n;
      const i = {
        ...o.message,
        text: o.content
      };
      return o.message = i, i;
    }
    return null;
  }
  getRunMessage(t, n) {
    const r = this.getRunKey(t, n), s = this.nodeRuns.get(r);
    return (s == null ? void 0 : s.message) ?? null;
  }
  areAllRunsComplete() {
    return Array.from(this.nodeRuns.values()).every((t) => t.isComplete);
  }
  getRunCount() {
    return this.runOrder.length;
  }
  getActiveRunCount() {
    return this.activeRuns.size;
  }
  getAllMessages() {
    return this.runOrder.map((t) => {
      var n;
      return (n = this.nodeRuns.get(t)) == null ? void 0 : n.message;
    }).filter((t) => t !== void 0);
  }
  reset() {
    this.nodeRuns.clear(), this.runOrder = [], this.activeRuns.clear();
  }
}
function vr(e) {
  return {
    id: e ?? Xn(),
    type: "text",
    text: "",
    sender: "bot"
  };
}
function Jl(e, t, n) {
  const r = e.findIndex((s) => s.id === t);
  if (r === -1)
    throw new Error(`Can't update message. No message with id ${t} found`);
  e[r] = n;
}
function Gv(e, t, n, r, s, o) {
  try {
    if (e === "")
      return;
    if (t) {
      let i = n.getRunMessage(t, o);
      i || (i = n.addRunToActive(t, o), s.value.push(i));
      const a = n.addChunkToRun(t, e, o);
      a && Jl(s.value, a.id, a);
    } else {
      r.value || (r.value = vr(), s.value.push(r.value));
      const i = {
        ...r.value,
        text: r.value.text + e
      };
      Jl(s.value, r.value.id, i), r.value = i;
    }
    Me(() => {
      _t.emit("scrollToBottom");
    });
  } catch (i) {
    console.error("Error handling stream chunk:", i);
  }
}
function Kv(e, t, n) {
  try {
    t.registerRunStart(e, n);
  } catch (r) {
    console.error("Error handling node start:", r);
  }
}
function Xv(e, t, n) {
  try {
    t.removeRunFromActive(e, n);
  } catch (r) {
    console.error("Error handling node complete:", r);
  }
}
function Yv(e, t = []) {
  return {
    id: Xn(),
    text: e,
    sender: "user",
    files: t
  };
}
function Jv(e) {
  let t = e.output ?? e.text ?? e.message ?? "";
  if (t === "" && Object.keys(e).length > 0)
    try {
      t = JSON.stringify(e, null, 2);
    } catch {
    }
  return t;
}
function Qv(e) {
  const { receivedMessage: t, messages: n } = e;
  t.value && n.value.some(
    (s) => s.sender === "bot" && "text" in s && s.text.trim().length > 0
  ) || (t.value = vr(), n.value.push(t.value)), t.value.text = "[No response received. This could happen if streaming is enabled in the trigger but disabled in agent node(s)]";
}
function e_(e) {
  const { error: t, receivedMessage: n, messages: r } = e;
  n.value ?? (n.value = vr()), n.value.text = "Error: Failed to receive response", r.value.includes(n.value) || r.value.push(n.value), console.error("Chat API error:", t);
}
async function t_(e) {
  const { text: t, files: n, sessionId: r, options: s, messages: o, receivedMessage: i, streamingManager: a } = e, c = {
    onChunk: (d, l, m) => {
      Gv(d, l, a, i, o, m);
    },
    onBeginMessage: (d, l) => {
      Kv(d, a, l);
    },
    onEndMessage: (d, l) => {
      Xv(d, a, l);
    }
  }, { hasReceivedChunks: u } = await Fv(
    t,
    n,
    r,
    s,
    c
  );
  u || Qv({ receivedMessage: i, messages: o });
}
async function n_(e) {
  const { text: t, files: n, sessionId: r, options: s } = e, o = await Nv(t, n, r, s);
  if (o != null && o.executionStarted)
    return { response: o };
  const i = vr();
  return i.text = Jv(o), { botMessage: i };
}
const r_ = {
  install(e, t) {
    e.provide(Pp, t);
    const n = D([]), r = D(null), s = D(!1), o = I(
      () => (t.initialMessages ?? []).map((d) => ({
        id: Xn(),
        text: d,
        sender: "bot"
      }))
    );
    async function i(d, l = []) {
      var g;
      const m = Yv(d, l);
      n.value.push(m), s.value = !0, Me(() => {
        _t.emit("scrollToBottom");
      });
      const f = D(null), v = new Wv();
      try {
        if (t != null && t.enableStreaming)
          await t_({
            text: d,
            files: l,
            sessionId: r.value,
            options: t,
            messages: n,
            receivedMessage: f,
            streamingManager: v
          });
        else {
          const y = await n_({
            text: d,
            files: l,
            sessionId: r.value,
            options: t
          });
          if ((g = y.response) != null && g.executionStarted)
            return s.value = !1, y.response;
          y.botMessage && (f.value = y.botMessage, n.value.push(y.botMessage));
        }
      } catch (y) {
        e_({ error: y, receivedMessage: f, messages: n });
      } finally {
        s.value = !1;
      }
      return Me(() => {
        _t.emit("scrollToBottom");
      }), null;
    }
    async function a() {
      if (!t.loadPreviousSession)
        return;
      const d = localStorage.getItem(Xl) ?? Xn(), l = await Dv(d, t);
      return n.value = ((l == null ? void 0 : l.data) || []).map((m, f) => ({
        id: `${f}`,
        text: m.kwargs.content,
        sender: m.id.includes("HumanMessage") ? "user" : "bot"
      })), n.value.length && (r.value = d), d;
    }
    async function c() {
      r.value = Xn(), localStorage.setItem(Xl, r.value);
    }
    const u = {
      initialMessages: o,
      messages: n,
      currentSessionId: r,
      waitingForResponse: s,
      loadPreviousSession: a,
      startNewSession: c,
      sendMessage: i
    };
    e.provide(Rp, u), e.config.globalProperties.$chat = u;
  }
};
var pr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Er(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Bs, Ql;
function o_() {
  if (Ql) return Bs;
  Ql = 1;
  function e(E) {
    return E instanceof Map ? E.clear = E.delete = E.set = function() {
      throw new Error("map is read-only");
    } : E instanceof Set && (E.add = E.clear = E.delete = function() {
      throw new Error("set is read-only");
    }), Object.freeze(E), Object.getOwnPropertyNames(E).forEach((L) => {
      const q = E[L], ce = typeof q;
      (ce === "object" || ce === "function") && !Object.isFrozen(q) && e(q);
    }), E;
  }
  class t {
    /**
     * @param {CompiledMode} mode
     */
    constructor(L) {
      L.data === void 0 && (L.data = {}), this.data = L.data, this.isMatchIgnored = !1;
    }
    ignoreMatch() {
      this.isMatchIgnored = !0;
    }
  }
  function n(E) {
    return E.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function r(E, ...L) {
    const q = /* @__PURE__ */ Object.create(null);
    for (const ce in E)
      q[ce] = E[ce];
    return L.forEach(function(ce) {
      for (const xe in ce)
        q[xe] = ce[xe];
    }), /** @type {T} */
    q;
  }
  const s = "</span>", o = (E) => !!E.scope, i = (E, { prefix: L }) => {
    if (E.startsWith("language:"))
      return E.replace("language:", "language-");
    if (E.includes(".")) {
      const q = E.split(".");
      return [
        `${L}${q.shift()}`,
        ...q.map((ce, xe) => `${ce}${"_".repeat(xe + 1)}`)
      ].join(" ");
    }
    return `${L}${E}`;
  };
  class a {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(L, q) {
      this.buffer = "", this.classPrefix = q.classPrefix, L.walk(this);
    }
    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(L) {
      this.buffer += n(L);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(L) {
      if (!o(L)) return;
      const q = i(
        L.scope,
        { prefix: this.classPrefix }
      );
      this.span(q);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(L) {
      o(L) && (this.buffer += s);
    }
    /**
     * returns the accumulated buffer
    */
    value() {
      return this.buffer;
    }
    // helpers
    /**
     * Builds a span element
     *
     * @param {string} className */
    span(L) {
      this.buffer += `<span class="${L}">`;
    }
  }
  const c = (E = {}) => {
    const L = { children: [] };
    return Object.assign(L, E), L;
  };
  class u {
    constructor() {
      this.rootNode = c(), this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    /** @param {Node} node */
    add(L) {
      this.top.children.push(L);
    }
    /** @param {string} scope */
    openNode(L) {
      const q = c({ scope: L });
      this.add(q), this.stack.push(q);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); ) ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */
    walk(L) {
      return this.constructor._walk(L, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */
    static _walk(L, q) {
      return typeof q == "string" ? L.addText(q) : q.children && (L.openNode(q), q.children.forEach((ce) => this._walk(L, ce)), L.closeNode(q)), L;
    }
    /**
     * @param {Node} node
     */
    static _collapse(L) {
      typeof L != "string" && L.children && (L.children.every((q) => typeof q == "string") ? L.children = [L.children.join("")] : L.children.forEach((q) => {
        u._collapse(q);
      }));
    }
  }
  class d extends u {
    /**
     * @param {*} options
     */
    constructor(L) {
      super(), this.options = L;
    }
    /**
     * @param {string} text
     */
    addText(L) {
      L !== "" && this.add(L);
    }
    /** @param {string} scope */
    startScope(L) {
      this.openNode(L);
    }
    endScope() {
      this.closeNode();
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */
    __addSublanguage(L, q) {
      const ce = L.root;
      q && (ce.scope = `language:${q}`), this.add(ce);
    }
    toHTML() {
      return new a(this, this.options).value();
    }
    finalize() {
      return this.closeAllNodes(), !0;
    }
  }
  function l(E) {
    return E ? typeof E == "string" ? E : E.source : null;
  }
  function m(E) {
    return g("(?=", E, ")");
  }
  function f(E) {
    return g("(?:", E, ")*");
  }
  function v(E) {
    return g("(?:", E, ")?");
  }
  function g(...E) {
    return E.map((q) => l(q)).join("");
  }
  function y(E) {
    const L = E[E.length - 1];
    return typeof L == "object" && L.constructor === Object ? (E.splice(E.length - 1, 1), L) : {};
  }
  function h(...E) {
    return "(" + (y(E).capture ? "" : "?:") + E.map((ce) => l(ce)).join("|") + ")";
  }
  function w(E) {
    return new RegExp(E.toString() + "|").exec("").length - 1;
  }
  function k(E, L) {
    const q = E && E.exec(L);
    return q && q.index === 0;
  }
  const x = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
  function A(E, { joinWith: L }) {
    let q = 0;
    return E.map((ce) => {
      q += 1;
      const xe = q;
      let Ae = l(ce), oe = "";
      for (; Ae.length > 0; ) {
        const ee = x.exec(Ae);
        if (!ee) {
          oe += Ae;
          break;
        }
        oe += Ae.substring(0, ee.index), Ae = Ae.substring(ee.index + ee[0].length), ee[0][0] === "\\" && ee[1] ? oe += "\\" + String(Number(ee[1]) + xe) : (oe += ee[0], ee[0] === "(" && q++);
      }
      return oe;
    }).map((ce) => `(${ce})`).join(L);
  }
  const S = /\b\B/, $ = "[a-zA-Z]\\w*", M = "[a-zA-Z_]\\w*", P = "\\b\\d+(\\.\\d+)?", R = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", B = "\\b(0b[01]+)", j = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", ie = (E = {}) => {
    const L = /^#![ ]*\//;
    return E.binary && (E.begin = g(
      L,
      /.*\b/,
      E.binary,
      /\b.*/
    )), r({
      scope: "meta",
      begin: L,
      end: /$/,
      relevance: 0,
      /** @type {ModeCallback} */
      "on:begin": (q, ce) => {
        q.index !== 0 && ce.ignoreMatch();
      }
    }, E);
  }, z = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, Q = {
    scope: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [z]
  }, N = {
    scope: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [z]
  }, V = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, F = function(E, L, q = {}) {
    const ce = r(
      {
        scope: "comment",
        begin: E,
        end: L,
        contains: []
      },
      q
    );
    ce.contains.push({
      scope: "doctag",
      // hack to avoid the space from being included. the space is necessary to
      // match here to prevent the plain text rule below from gobbling up doctags
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
      excludeBegin: !0,
      relevance: 0
    });
    const xe = h(
      // list of common 1 and 2 letter words in English
      "I",
      "a",
      "is",
      "so",
      "us",
      "to",
      "at",
      "if",
      "in",
      "it",
      "on",
      // note: this is not an exhaustive list of contractions, just popular ones
      /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
      // contractions - can't we'd they're let's, etc
      /[A-Za-z]+[-][a-z]+/,
      // `no-way`, etc.
      /[A-Za-z][a-z]{2,}/
      // allow capitalized words at beginning of sentences
    );
    return ce.contains.push(
      {
        // TODO: how to include ", (, ) without breaking grammars that use these for
        // comment delimiters?
        // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
        // ---
        // this tries to find sequences of 3 english words in a row (without any
        // "programming" type syntax) this gives us a strong signal that we've
        // TRULY found a comment - vs perhaps scanning with the wrong language.
        // It's possible to find something that LOOKS like the start of the
        // comment - but then if there is no readable text - good chance it is a
        // false match and not a comment.
        //
        // for a visual example please see:
        // https://github.com/highlightjs/highlight.js/issues/2827
        begin: g(
          /[ ]+/,
          // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
          "(",
          xe,
          /[.]?[:]?([.][ ]|[ ])/,
          "){3}"
        )
        // look for 3 words in a row
      }
    ), ce;
  }, G = F("//", "$"), T = F("/\\*", "\\*/"), W = F("#", "$"), U = {
    scope: "number",
    begin: P,
    relevance: 0
  }, se = {
    scope: "number",
    begin: R,
    relevance: 0
  }, de = {
    scope: "number",
    begin: B,
    relevance: 0
  }, ve = {
    scope: "regexp",
    begin: /\/(?=[^/\n]*\/)/,
    end: /\/[gimuy]*/,
    contains: [
      z,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [z]
      }
    ]
  }, we = {
    scope: "title",
    begin: $,
    relevance: 0
  }, Be = {
    scope: "title",
    begin: M,
    relevance: 0
  }, Oe = {
    // excludes method names from keyword processing
    begin: "\\.\\s*" + M,
    relevance: 0
  };
  var re = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    APOS_STRING_MODE: Q,
    BACKSLASH_ESCAPE: z,
    BINARY_NUMBER_MODE: de,
    BINARY_NUMBER_RE: B,
    COMMENT: F,
    C_BLOCK_COMMENT_MODE: T,
    C_LINE_COMMENT_MODE: G,
    C_NUMBER_MODE: se,
    C_NUMBER_RE: R,
    END_SAME_AS_BEGIN: function(E) {
      return Object.assign(
        E,
        {
          /** @type {ModeCallback} */
          "on:begin": (L, q) => {
            q.data._beginMatch = L[1];
          },
          /** @type {ModeCallback} */
          "on:end": (L, q) => {
            q.data._beginMatch !== L[1] && q.ignoreMatch();
          }
        }
      );
    },
    HASH_COMMENT_MODE: W,
    IDENT_RE: $,
    MATCH_NOTHING_RE: S,
    METHOD_GUARD: Oe,
    NUMBER_MODE: U,
    NUMBER_RE: P,
    PHRASAL_WORDS_MODE: V,
    QUOTE_STRING_MODE: N,
    REGEXP_MODE: ve,
    RE_STARTERS_RE: j,
    SHEBANG: ie,
    TITLE_MODE: we,
    UNDERSCORE_IDENT_RE: M,
    UNDERSCORE_TITLE_MODE: Be
  });
  function pe(E, L) {
    E.input[E.index - 1] === "." && L.ignoreMatch();
  }
  function Se(E, L) {
    E.className !== void 0 && (E.scope = E.className, delete E.className);
  }
  function ze(E, L) {
    L && E.beginKeywords && (E.begin = "\\b(" + E.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", E.__beforeBegin = pe, E.keywords = E.keywords || E.beginKeywords, delete E.beginKeywords, E.relevance === void 0 && (E.relevance = 0));
  }
  function Ge(E, L) {
    Array.isArray(E.illegal) && (E.illegal = h(...E.illegal));
  }
  function Je(E, L) {
    if (E.match) {
      if (E.begin || E.end) throw new Error("begin & end are not supported with match");
      E.begin = E.match, delete E.match;
    }
  }
  function st(E, L) {
    E.relevance === void 0 && (E.relevance = 1);
  }
  const rn = (E, L) => {
    if (!E.beforeMatch) return;
    if (E.starts) throw new Error("beforeMatch cannot be used with starts");
    const q = Object.assign({}, E);
    Object.keys(E).forEach((ce) => {
      delete E[ce];
    }), E.keywords = q.keywords, E.begin = g(q.beforeMatch, m(q.begin)), E.starts = {
      relevance: 0,
      contains: [
        Object.assign(q, { endsParent: !0 })
      ]
    }, E.relevance = 0, delete q.beforeMatch;
  }, Et = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    // common variable name
    "list",
    // common variable name
    "value"
    // common variable name
  ], Vt = "keyword";
  function ut(E, L, q = Vt) {
    const ce = /* @__PURE__ */ Object.create(null);
    return typeof E == "string" ? xe(q, E.split(" ")) : Array.isArray(E) ? xe(q, E) : Object.keys(E).forEach(function(Ae) {
      Object.assign(
        ce,
        ut(E[Ae], L, Ae)
      );
    }), ce;
    function xe(Ae, oe) {
      L && (oe = oe.map((ee) => ee.toLowerCase())), oe.forEach(function(ee) {
        const me = ee.split("|");
        ce[me[0]] = [Ae, Ot(me[0], me[1])];
      });
    }
  }
  function Ot(E, L) {
    return L ? Number(L) : At(E) ? 0 : 1;
  }
  function At(E) {
    return Et.includes(E.toLowerCase());
  }
  const Ut = {}, nt = (E) => {
    console.error(E);
  }, K = (E, ...L) => {
    console.log(`WARN: ${E}`, ...L);
  }, ge = (E, L) => {
    Ut[`${E}/${L}`] || (console.log(`Deprecated as of ${E}. ${L}`), Ut[`${E}/${L}`] = !0);
  }, De = new Error();
  function Xe(E, L, { key: q }) {
    let ce = 0;
    const xe = E[q], Ae = {}, oe = {};
    for (let ee = 1; ee <= L.length; ee++)
      oe[ee + ce] = xe[ee], Ae[ee + ce] = !0, ce += w(L[ee - 1]);
    E[q] = oe, E[q]._emit = Ae, E[q]._multi = !0;
  }
  function Zt(E) {
    if (Array.isArray(E.begin)) {
      if (E.skip || E.excludeBegin || E.returnBegin)
        throw nt("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), De;
      if (typeof E.beginScope != "object" || E.beginScope === null)
        throw nt("beginScope must be object"), De;
      Xe(E, E.begin, { key: "beginScope" }), E.begin = A(E.begin, { joinWith: "" });
    }
  }
  function qn(E) {
    if (Array.isArray(E.end)) {
      if (E.skip || E.excludeEnd || E.returnEnd)
        throw nt("skip, excludeEnd, returnEnd not compatible with endScope: {}"), De;
      if (typeof E.endScope != "object" || E.endScope === null)
        throw nt("endScope must be object"), De;
      Xe(E, E.end, { key: "endScope" }), E.end = A(E.end, { joinWith: "" });
    }
  }
  function Fn(E) {
    E.scope && typeof E.scope == "object" && E.scope !== null && (E.beginScope = E.scope, delete E.scope);
  }
  function or(E) {
    Fn(E), typeof E.beginScope == "string" && (E.beginScope = { _wrap: E.beginScope }), typeof E.endScope == "string" && (E.endScope = { _wrap: E.endScope }), Zt(E), qn(E);
  }
  function Tr(E) {
    function L(oe, ee) {
      return new RegExp(
        l(oe),
        "m" + (E.case_insensitive ? "i" : "") + (E.unicodeRegex ? "u" : "") + (ee ? "g" : "")
      );
    }
    class q {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      // @ts-ignore
      addRule(ee, me) {
        me.position = this.position++, this.matchIndexes[this.matchAt] = me, this.regexes.push([me, ee]), this.matchAt += w(ee) + 1;
      }
      compile() {
        this.regexes.length === 0 && (this.exec = () => null);
        const ee = this.regexes.map((me) => me[1]);
        this.matcherRe = L(A(ee, { joinWith: "|" }), !0), this.lastIndex = 0;
      }
      /** @param {string} s */
      exec(ee) {
        this.matcherRe.lastIndex = this.lastIndex;
        const me = this.matcherRe.exec(ee);
        if (!me)
          return null;
        const Qe = me.findIndex(($t, Ms) => Ms > 0 && $t !== void 0), $e = this.matchIndexes[Qe];
        return me.splice(0, Qe), Object.assign(me, $e);
      }
    }
    class ce {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      // @ts-ignore
      getMatcher(ee) {
        if (this.multiRegexes[ee]) return this.multiRegexes[ee];
        const me = new q();
        return this.rules.slice(ee).forEach(([Qe, $e]) => me.addRule(Qe, $e)), me.compile(), this.multiRegexes[ee] = me, me;
      }
      resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      // @ts-ignore
      addRule(ee, me) {
        this.rules.push([ee, me]), me.type === "begin" && this.count++;
      }
      /** @param {string} s */
      exec(ee) {
        const me = this.getMatcher(this.regexIndex);
        me.lastIndex = this.lastIndex;
        let Qe = me.exec(ee);
        if (this.resumingScanAtSamePosition() && !(Qe && Qe.index === this.lastIndex)) {
          const $e = this.getMatcher(0);
          $e.lastIndex = this.lastIndex + 1, Qe = $e.exec(ee);
        }
        return Qe && (this.regexIndex += Qe.position + 1, this.regexIndex === this.count && this.considerAll()), Qe;
      }
    }
    function xe(oe) {
      const ee = new ce();
      return oe.contains.forEach((me) => ee.addRule(me.begin, { rule: me, type: "begin" })), oe.terminatorEnd && ee.addRule(oe.terminatorEnd, { type: "end" }), oe.illegal && ee.addRule(oe.illegal, { type: "illegal" }), ee;
    }
    function Ae(oe, ee) {
      const me = (
        /** @type CompiledMode */
        oe
      );
      if (oe.isCompiled) return me;
      [
        Se,
        // do this early so compiler extensions generally don't have to worry about
        // the distinction between match/begin
        Je,
        or,
        rn
      ].forEach(($e) => $e(oe, ee)), E.compilerExtensions.forEach(($e) => $e(oe, ee)), oe.__beforeBegin = null, [
        ze,
        // do this later so compiler extensions that come earlier have access to the
        // raw array if they wanted to perhaps manipulate it, etc.
        Ge,
        // default to 1 relevance if not specified
        st
      ].forEach(($e) => $e(oe, ee)), oe.isCompiled = !0;
      let Qe = null;
      return typeof oe.keywords == "object" && oe.keywords.$pattern && (oe.keywords = Object.assign({}, oe.keywords), Qe = oe.keywords.$pattern, delete oe.keywords.$pattern), Qe = Qe || /\w+/, oe.keywords && (oe.keywords = ut(oe.keywords, E.case_insensitive)), me.keywordPatternRe = L(Qe, !0), ee && (oe.begin || (oe.begin = /\B|\b/), me.beginRe = L(me.begin), !oe.end && !oe.endsWithParent && (oe.end = /\B|\b/), oe.end && (me.endRe = L(me.end)), me.terminatorEnd = l(me.end) || "", oe.endsWithParent && ee.terminatorEnd && (me.terminatorEnd += (oe.end ? "|" : "") + ee.terminatorEnd)), oe.illegal && (me.illegalRe = L(
        /** @type {RegExp | string} */
        oe.illegal
      )), oe.contains || (oe.contains = []), oe.contains = [].concat(...oe.contains.map(function($e) {
        return sr($e === "self" ? oe : $e);
      })), oe.contains.forEach(function($e) {
        Ae(
          /** @type Mode */
          $e,
          me
        );
      }), oe.starts && Ae(oe.starts, ee), me.matcher = xe(me), me;
    }
    if (E.compilerExtensions || (E.compilerExtensions = []), E.contains && E.contains.includes("self"))
      throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    return E.classNameAliases = r(E.classNameAliases || {}), Ae(
      /** @type Mode */
      E
    );
  }
  function dn(E) {
    return E ? E.endsWithParent || dn(E.starts) : !1;
  }
  function sr(E) {
    return E.variants && !E.cachedVariants && (E.cachedVariants = E.variants.map(function(L) {
      return r(E, { variants: null }, L);
    })), E.cachedVariants ? E.cachedVariants : dn(E) ? r(E, { starts: E.starts ? r(E.starts) : null }) : Object.isFrozen(E) ? r(E) : E;
  }
  var Lr = "11.11.1";
  class Hn extends Error {
    constructor(L, q) {
      super(L), this.name = "HTMLInjectionError", this.html = q;
    }
  }
  const Sn = n, ir = r, jn = Symbol("nomatch"), Or = 7, ar = function(E) {
    const L = /* @__PURE__ */ Object.create(null), q = /* @__PURE__ */ Object.create(null), ce = [];
    let xe = !0;
    const Ae = "Could not find the language '{}', did you forget to load/include a language module?", oe = { disableAutodetect: !0, name: "Plain text", contains: [] };
    let ee = {
      ignoreUnescapedHTML: !1,
      throwUnescapedHTML: !1,
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      cssSelector: "pre code",
      languages: null,
      // beta configuration options, subject to change, welcome to discuss
      // https://github.com/highlightjs/highlight.js/issues/1086
      __emitter: d
    };
    function me(X) {
      return ee.noHighlightRe.test(X);
    }
    function Qe(X) {
      let fe = X.className + " ";
      fe += X.parentNode ? X.parentNode.className : "";
      const Ee = ee.languageDetectRe.exec(fe);
      if (Ee) {
        const qe = En(Ee[1]);
        return qe || (K(Ae.replace("{}", Ee[1])), K("Falling back to no-highlight mode for this block.", X)), qe ? Ee[1] : "no-highlight";
      }
      return fe.split(/\s+/).find((qe) => me(qe) || En(qe));
    }
    function $e(X, fe, Ee) {
      let qe = "", et = "";
      typeof fe == "object" ? (qe = X, Ee = fe.ignoreIllegals, et = fe.language) : (ge("10.7.0", "highlight(lang, code, ...args) has been deprecated."), ge("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), et = X, qe = fe), Ee === void 0 && (Ee = !0);
      const Wt = {
        code: qe,
        language: et
      };
      go("before:highlight", Wt);
      const An = Wt.result ? Wt.result : $t(Wt.language, Wt.code, Ee);
      return An.code = Wt.code, go("after:highlight", An), An;
    }
    function $t(X, fe, Ee, qe) {
      const et = /* @__PURE__ */ Object.create(null);
      function Wt(ne, le) {
        return ne.keywords[le];
      }
      function An() {
        if (!_e.keywords) {
          it.addText(Fe);
          return;
        }
        let ne = 0;
        _e.keywordPatternRe.lastIndex = 0;
        let le = _e.keywordPatternRe.exec(Fe), ye = "";
        for (; le; ) {
          ye += Fe.substring(ne, le.index);
          const Ne = sn.case_insensitive ? le[0].toLowerCase() : le[0], dt = Wt(_e, Ne);
          if (dt) {
            const [fn, mv] = dt;
            if (it.addText(ye), ye = "", et[Ne] = (et[Ne] || 0) + 1, et[Ne] <= Or && (_o += mv), fn.startsWith("_"))
              ye += le[0];
            else {
              const vv = sn.classNameAliases[fn] || fn;
              on(le[0], vv);
            }
          } else
            ye += le[0];
          ne = _e.keywordPatternRe.lastIndex, le = _e.keywordPatternRe.exec(Fe);
        }
        ye += Fe.substring(ne), it.addText(ye);
      }
      function mo() {
        if (Fe === "") return;
        let ne = null;
        if (typeof _e.subLanguage == "string") {
          if (!L[_e.subLanguage]) {
            it.addText(Fe);
            return;
          }
          ne = $t(_e.subLanguage, Fe, !0, Kl[_e.subLanguage]), Kl[_e.subLanguage] = /** @type {CompiledMode} */
          ne._top;
        } else
          ne = Is(Fe, _e.subLanguage.length ? _e.subLanguage : null);
        _e.relevance > 0 && (_o += ne.relevance), it.__addSublanguage(ne._emitter, ne.language);
      }
      function Mt() {
        _e.subLanguage != null ? mo() : An(), Fe = "";
      }
      function on(ne, le) {
        ne !== "" && (it.startScope(le), it.addText(ne), it.endScope());
      }
      function Ul(ne, le) {
        let ye = 1;
        const Ne = le.length - 1;
        for (; ye <= Ne; ) {
          if (!ne._emit[ye]) {
            ye++;
            continue;
          }
          const dt = sn.classNameAliases[ne[ye]] || ne[ye], fn = le[ye];
          dt ? on(fn, dt) : (Fe = fn, An(), Fe = ""), ye++;
        }
      }
      function Zl(ne, le) {
        return ne.scope && typeof ne.scope == "string" && it.openNode(sn.classNameAliases[ne.scope] || ne.scope), ne.beginScope && (ne.beginScope._wrap ? (on(Fe, sn.classNameAliases[ne.beginScope._wrap] || ne.beginScope._wrap), Fe = "") : ne.beginScope._multi && (Ul(ne.beginScope, le), Fe = "")), _e = Object.create(ne, { parent: { value: _e } }), _e;
      }
      function Wl(ne, le, ye) {
        let Ne = k(ne.endRe, ye);
        if (Ne) {
          if (ne["on:end"]) {
            const dt = new t(ne);
            ne["on:end"](le, dt), dt.isMatchIgnored && (Ne = !1);
          }
          if (Ne) {
            for (; ne.endsParent && ne.parent; )
              ne = ne.parent;
            return ne;
          }
        }
        if (ne.endsWithParent)
          return Wl(ne.parent, le, ye);
      }
      function dv(ne) {
        return _e.matcher.regexIndex === 0 ? (Fe += ne[0], 1) : (Rs = !0, 0);
      }
      function fv(ne) {
        const le = ne[0], ye = ne.rule, Ne = new t(ye), dt = [ye.__beforeBegin, ye["on:begin"]];
        for (const fn of dt)
          if (fn && (fn(ne, Ne), Ne.isMatchIgnored))
            return dv(le);
        return ye.skip ? Fe += le : (ye.excludeBegin && (Fe += le), Mt(), !ye.returnBegin && !ye.excludeBegin && (Fe = le)), Zl(ye, ne), ye.returnBegin ? 0 : le.length;
      }
      function pv(ne) {
        const le = ne[0], ye = fe.substring(ne.index), Ne = Wl(_e, ne, ye);
        if (!Ne)
          return jn;
        const dt = _e;
        _e.endScope && _e.endScope._wrap ? (Mt(), on(le, _e.endScope._wrap)) : _e.endScope && _e.endScope._multi ? (Mt(), Ul(_e.endScope, ne)) : dt.skip ? Fe += le : (dt.returnEnd || dt.excludeEnd || (Fe += le), Mt(), dt.excludeEnd && (Fe = le));
        do
          _e.scope && it.closeNode(), !_e.skip && !_e.subLanguage && (_o += _e.relevance), _e = _e.parent;
        while (_e !== Ne.parent);
        return Ne.starts && Zl(Ne.starts, ne), dt.returnEnd ? 0 : le.length;
      }
      function hv() {
        const ne = [];
        for (let le = _e; le !== sn; le = le.parent)
          le.scope && ne.unshift(le.scope);
        ne.forEach((le) => it.openNode(le));
      }
      let vo = {};
      function Gl(ne, le) {
        const ye = le && le[0];
        if (Fe += ne, ye == null)
          return Mt(), 0;
        if (vo.type === "begin" && le.type === "end" && vo.index === le.index && ye === "") {
          if (Fe += fe.slice(le.index, le.index + 1), !xe) {
            const Ne = new Error(`0 width match regex (${X})`);
            throw Ne.languageName = X, Ne.badRule = vo.rule, Ne;
          }
          return 1;
        }
        if (vo = le, le.type === "begin")
          return fv(le);
        if (le.type === "illegal" && !Ee) {
          const Ne = new Error('Illegal lexeme "' + ye + '" for mode "' + (_e.scope || "<unnamed>") + '"');
          throw Ne.mode = _e, Ne;
        } else if (le.type === "end") {
          const Ne = pv(le);
          if (Ne !== jn)
            return Ne;
        }
        if (le.type === "illegal" && ye === "")
          return Fe += `
`, 1;
        if (Os > 1e5 && Os > le.index * 3)
          throw new Error("potential infinite loop, way more iterations than matches");
        return Fe += ye, ye.length;
      }
      const sn = En(X);
      if (!sn)
        throw nt(Ae.replace("{}", X)), new Error('Unknown language: "' + X + '"');
      const gv = Tr(sn);
      let Ls = "", _e = qe || gv;
      const Kl = {}, it = new ee.__emitter(ee);
      hv();
      let Fe = "", _o = 0, Vn = 0, Os = 0, Rs = !1;
      try {
        if (sn.__emitTokens)
          sn.__emitTokens(fe, it);
        else {
          for (_e.matcher.considerAll(); ; ) {
            Os++, Rs ? Rs = !1 : _e.matcher.considerAll(), _e.matcher.lastIndex = Vn;
            const ne = _e.matcher.exec(fe);
            if (!ne) break;
            const le = fe.substring(Vn, ne.index), ye = Gl(le, ne);
            Vn = ne.index + ye;
          }
          Gl(fe.substring(Vn));
        }
        return it.finalize(), Ls = it.toHTML(), {
          language: X,
          value: Ls,
          relevance: _o,
          illegal: !1,
          _emitter: it,
          _top: _e
        };
      } catch (ne) {
        if (ne.message && ne.message.includes("Illegal"))
          return {
            language: X,
            value: Sn(fe),
            illegal: !0,
            relevance: 0,
            _illegalBy: {
              message: ne.message,
              index: Vn,
              context: fe.slice(Vn - 100, Vn + 100),
              mode: ne.mode,
              resultSoFar: Ls
            },
            _emitter: it
          };
        if (xe)
          return {
            language: X,
            value: Sn(fe),
            illegal: !1,
            relevance: 0,
            errorRaised: ne,
            _emitter: it,
            _top: _e
          };
        throw ne;
      }
    }
    function Ms(X) {
      const fe = {
        value: Sn(X),
        illegal: !1,
        relevance: 0,
        _top: oe,
        _emitter: new ee.__emitter(ee)
      };
      return fe._emitter.addText(X), fe;
    }
    function Is(X, fe) {
      fe = fe || ee.languages || Object.keys(L);
      const Ee = Ms(X), qe = fe.filter(En).filter(Vl).map(
        (Mt) => $t(Mt, X, !1)
      );
      qe.unshift(Ee);
      const et = qe.sort((Mt, on) => {
        if (Mt.relevance !== on.relevance) return on.relevance - Mt.relevance;
        if (Mt.language && on.language) {
          if (En(Mt.language).supersetOf === on.language)
            return 1;
          if (En(on.language).supersetOf === Mt.language)
            return -1;
        }
        return 0;
      }), [Wt, An] = et, mo = Wt;
      return mo.secondBest = An, mo;
    }
    function ev(X, fe, Ee) {
      const qe = fe && q[fe] || Ee;
      X.classList.add("hljs"), X.classList.add(`language-${qe}`);
    }
    function Ts(X) {
      let fe = null;
      const Ee = Qe(X);
      if (me(Ee)) return;
      if (go(
        "before:highlightElement",
        { el: X, language: Ee }
      ), X.dataset.highlighted) {
        console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", X);
        return;
      }
      if (X.children.length > 0 && (ee.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(X)), ee.throwUnescapedHTML))
        throw new Hn(
          "One of your code blocks includes unescaped HTML.",
          X.innerHTML
        );
      fe = X;
      const qe = fe.textContent, et = Ee ? $e(qe, { language: Ee, ignoreIllegals: !0 }) : Is(qe);
      X.innerHTML = et.value, X.dataset.highlighted = "yes", ev(X, Ee, et.language), X.result = {
        language: et.language,
        // TODO: remove with version 11.0
        re: et.relevance,
        relevance: et.relevance
      }, et.secondBest && (X.secondBest = {
        language: et.secondBest.language,
        relevance: et.secondBest.relevance
      }), go("after:highlightElement", { el: X, result: et, text: qe });
    }
    function tv(X) {
      ee = ir(ee, X);
    }
    const nv = () => {
      ho(), ge("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    };
    function rv() {
      ho(), ge("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    }
    let Hl = !1;
    function ho() {
      function X() {
        ho();
      }
      if (document.readyState === "loading") {
        Hl || window.addEventListener("DOMContentLoaded", X, !1), Hl = !0;
        return;
      }
      document.querySelectorAll(ee.cssSelector).forEach(Ts);
    }
    function ov(X, fe) {
      let Ee = null;
      try {
        Ee = fe(E);
      } catch (qe) {
        if (nt("Language definition for '{}' could not be registered.".replace("{}", X)), xe)
          nt(qe);
        else
          throw qe;
        Ee = oe;
      }
      Ee.name || (Ee.name = X), L[X] = Ee, Ee.rawDefinition = fe.bind(null, E), Ee.aliases && jl(Ee.aliases, { languageName: X });
    }
    function sv(X) {
      delete L[X];
      for (const fe of Object.keys(q))
        q[fe] === X && delete q[fe];
    }
    function iv() {
      return Object.keys(L);
    }
    function En(X) {
      return X = (X || "").toLowerCase(), L[X] || L[q[X]];
    }
    function jl(X, { languageName: fe }) {
      typeof X == "string" && (X = [X]), X.forEach((Ee) => {
        q[Ee.toLowerCase()] = fe;
      });
    }
    function Vl(X) {
      const fe = En(X);
      return fe && !fe.disableAutodetect;
    }
    function av(X) {
      X["before:highlightBlock"] && !X["before:highlightElement"] && (X["before:highlightElement"] = (fe) => {
        X["before:highlightBlock"](
          Object.assign({ block: fe.el }, fe)
        );
      }), X["after:highlightBlock"] && !X["after:highlightElement"] && (X["after:highlightElement"] = (fe) => {
        X["after:highlightBlock"](
          Object.assign({ block: fe.el }, fe)
        );
      });
    }
    function cv(X) {
      av(X), ce.push(X);
    }
    function lv(X) {
      const fe = ce.indexOf(X);
      fe !== -1 && ce.splice(fe, 1);
    }
    function go(X, fe) {
      const Ee = X;
      ce.forEach(function(qe) {
        qe[Ee] && qe[Ee](fe);
      });
    }
    function uv(X) {
      return ge("10.7.0", "highlightBlock will be removed entirely in v12.0"), ge("10.7.0", "Please use highlightElement now."), Ts(X);
    }
    Object.assign(E, {
      highlight: $e,
      highlightAuto: Is,
      highlightAll: ho,
      highlightElement: Ts,
      // TODO: Remove with v12 API
      highlightBlock: uv,
      configure: tv,
      initHighlighting: nv,
      initHighlightingOnLoad: rv,
      registerLanguage: ov,
      unregisterLanguage: sv,
      listLanguages: iv,
      getLanguage: En,
      registerAliases: jl,
      autoDetection: Vl,
      inherit: ir,
      addPlugin: cv,
      removePlugin: lv
    }), E.debugMode = function() {
      xe = !1;
    }, E.safeMode = function() {
      xe = !0;
    }, E.versionString = Lr, E.regex = {
      concat: g,
      lookahead: m,
      either: h,
      optional: v,
      anyNumberOfTimes: f
    };
    for (const X in re)
      typeof re[X] == "object" && e(re[X]);
    return Object.assign(E, re), E;
  }, O = ar({});
  return O.newInstance = () => ar({}), Bs = O, O.HighlightJS = O, O.default = O, Bs;
}
var s_ = /* @__PURE__ */ o_();
const hn = /* @__PURE__ */ Er(s_), eu = "[A-Za-z$_][0-9A-Za-z$_]*", i_ = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], a_ = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Dp = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Np = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], qp = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], c_ = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], l_ = [].concat(
  qp,
  Dp,
  Np
);
function Fp(e) {
  const t = e.regex, n = (F, { after: G }) => {
    const T = "</" + F[0].slice(1);
    return F.input.indexOf(T, G) !== -1;
  }, r = eu, s = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (F, G) => {
      const T = F[0].length + F.index, W = F.input[T];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        W === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        W === ","
      ) {
        G.ignoreMatch();
        return;
      }
      W === ">" && (n(F, { after: T }) || G.ignoreMatch());
      let U;
      const se = F.input.substring(T);
      if (U = se.match(/^\s*=/)) {
        G.ignoreMatch();
        return;
      }
      if ((U = se.match(/^\s+extends\s+/)) && U.index === 0) {
        G.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: eu,
    keyword: i_,
    literal: a_,
    built_in: l_,
    "variable.language": c_
  }, c = "[0-9](_?[0-9])*", u = `\\.(${c})`, d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", l = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${d})((${u})|\\.)?|(${u}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${d})\\b((${u})\\b|\\.)?|(${u})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, m = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, f = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "xml"
    }
  }, v = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "css"
    }
  }, g = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "graphql"
    }
  }, y = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      m
    ]
  }, w = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, k = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    v,
    g,
    y,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    l
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  m.contains = k.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(k)
  });
  const x = [].concat(w, m.contains), A = x.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(x)
    }
  ]), S = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: A
  }, $ = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(r, "(", t.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, M = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Dp,
        ...Np
      ]
    }
  }, P = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, R = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [S],
    illegal: /%/
  }, B = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function j(F) {
    return t.concat("(?!", F.join("|"), ")");
  }
  const ie = {
    match: t.concat(
      /\b/,
      j([
        ...qp,
        "super",
        "import"
      ].map((F) => `${F}\\s*\\(`)),
      r,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, z = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, Q = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      S
    ]
  }, N = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", V = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(N)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      S
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: A, CLASS_REFERENCE: M },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      P,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      f,
      v,
      g,
      y,
      w,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      l,
      M,
      {
        scope: "attr",
        match: r + t.lookahead(":"),
        relevance: 0
      },
      V,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          w,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: N,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: A
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: s.begin, end: s.end },
              { match: o },
              {
                begin: i.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": i.isTrulyOpeningTag,
                end: i.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: i.begin,
                end: i.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      R,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          S,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      z,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [S]
      },
      ie,
      B,
      $,
      Q,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Hp(e) {
  const t = e.regex, n = t.concat(/[\p{L}_]/u, t.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), r = /[\p{L}0-9._:-]+/u, s = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, o = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, i = e.inherit(o, {
    begin: /\(/,
    end: /\)/
  }), a = e.inherit(e.APOS_STRING_MODE, { className: "string" }), c = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), u = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: r,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [s]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [s]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          o,
          c,
          a,
          i,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  o,
                  i,
                  c,
                  a
                ]
              }
            ]
          }
        ]
      },
      e.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      s,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              c
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [u],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [u],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: t.concat(
          /</,
          t.lookahead(t.concat(
            n,
            // <tag/>
            // <tag>
            // <tag ...
            t.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0,
            starts: u
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: t.concat(
          /<\//,
          t.lookahead(t.concat(
            n,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: n,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
const u_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function d_(e, t) {
  return b(), C("svg", u_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
    }, null, -1)
  ]));
}
const f_ = { name: "mdi-close", render: d_ }, Ht = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, p_ = {}, h_ = { class: "chat-button" };
function g_(e, t) {
  return b(), C("button", h_, [
    ae(e.$slots, "default")
  ]);
}
const m_ = /* @__PURE__ */ Ht(p_, [["render", g_]]);
function Yc() {
  return Le(Rp);
}
function co() {
  return {
    options: Le(Pp)
  };
}
function as() {
  const { options: e } = co(), t = (e == null ? void 0 : e.defaultLanguage) ?? "en";
  function n(s) {
    var i, a;
    const o = (a = (i = e == null ? void 0 : e.i18n) == null ? void 0 : i[t]) == null ? void 0 : a[s];
    return Cp(o) ? o.value : o ?? s;
  }
  function r(s) {
    var o, i;
    return !!((i = (o = e == null ? void 0 : e.i18n) == null ? void 0 : o[t]) != null && i[s]);
  }
  return { t: n, te: r };
}
const v_ = { class: "chat-get-started" }, __ = /* @__PURE__ */ Z({
  __name: "GetStarted",
  setup(e) {
    const { t } = as();
    return (n, r) => (b(), C("div", v_, [
      he(m_, {
        onClick: r[0] || (r[0] = (s) => n.$emit("click:button"))
      }, {
        default: J(() => [
          mr(ke(_(t)("getStarted")), 1)
        ]),
        _: 1
      })
    ]));
  }
}), b_ = {}, y_ = { class: "chat-powered-by" };
function w_(e, t) {
  return b(), C("div", y_, t[0] || (t[0] = [
    mr(" Powered by "),
    p("a", { href: "https://n8n.io?utm_source=n8n-external&utm_medium=widget-powered-by" }, "n8n", -1)
  ]));
}
const k_ = /* @__PURE__ */ Ht(b_, [["render", w_]]), x_ = { class: "chat-get-started-footer" }, C_ = { key: 0 }, S_ = /* @__PURE__ */ Z({
  __name: "GetStartedFooter",
  setup(e) {
    const { t, te: n } = as();
    return (r, s) => (b(), C("div", x_, [
      _(n)("footer") ? (b(), C("div", C_, ke(_(t)("footer")), 1)) : te("", !0),
      he(k_)
    ]));
  }
});
function E_(e) {
  return Sp() ? (Ep(e), !0) : !1;
}
function A_() {
  const e = /* @__PURE__ */ new Set(), t = (s) => {
    e.delete(s);
  };
  return {
    on: (s) => {
      e.add(s);
      const o = () => t(s);
      return E_(o), {
        off: o
      };
    },
    off: t,
    trigger: (...s) => Promise.all(Array.from(e).map((o) => o(...s)))
  };
}
const $_ = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const M_ = (e, t) => Object.prototype.hasOwnProperty.call(e, t), I_ = $_ ? window.document : void 0, T_ = {
  multiple: !0,
  accept: "*",
  reset: !1,
  directory: !1
};
function L_(e = {}) {
  const {
    document: t = I_
  } = e, n = D(null), { on: r, trigger: s } = A_();
  let o;
  t && (o = t.createElement("input"), o.type = "file", o.onchange = (c) => {
    const u = c.target;
    n.value = u.files, s(n.value);
  });
  const i = () => {
    n.value = null, o && o.value && (o.value = "", s(null));
  }, a = (c) => {
    if (!o)
      return;
    const u = {
      ...T_,
      ...e,
      ...c
    };
    o.multiple = u.multiple, o.accept = u.accept, o.webkitdirectory = u.directory, M_(u, "capture") && (o.capture = u.capture), u.reset && i(), o.click();
  };
  return {
    files: Ap(n),
    open: a,
    reset: i,
    onChange: r
  };
}
const O_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function R_(e, t) {
  return b(), C("svg", O_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M16.5 6v11.5a4 4 0 0 1-4 4a4 4 0 0 1-4-4V5A2.5 2.5 0 0 1 11 2.5A2.5 2.5 0 0 1 13.5 5v10.5a1 1 0 0 1-1 1a1 1 0 0 1-1-1V6H10v9.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5V5a4 4 0 0 0-4-4a4 4 0 0 0-4 4v12.5a5.5 5.5 0 0 0 5.5 5.5a5.5 5.5 0 0 0 5.5-5.5V6z"
    }, null, -1)
  ]));
}
const P_ = { name: "mdi-paperclip", render: R_ }, B_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function z_(e, t) {
  return b(), C("svg", B_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "m2 21l21-9L2 3v7l15 2l-15 2z"
    }, null, -1)
  ]));
}
const D_ = { name: "mdi-send", render: z_ }, N_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function q_(e, t) {
  return b(), C("svg", N_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"
    }, null, -1)
  ]));
}
const F_ = { name: "mdi-closeThick", render: q_ }, H_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function j_(e, t) {
  return b(), C("svg", H_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m0 18h12v-8l-4 4l-2-2zM8 9a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
    }, null, -1)
  ]));
}
const V_ = { name: "mdi-fileImage", render: j_ }, U_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Z_(e, t) {
  return b(), C("svg", U_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 11h-2v5a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2c.4 0 .7.1 1 .3V11h3zm0-4V3.5L18.5 9z"
    }, null, -1)
  ]));
}
const W_ = { name: "mdi-fileMusic", render: Z_ }, G_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function K_(e, t) {
  return b(), C("svg", G_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2zm3-4v-2H6v2z"
    }, null, -1)
  ]));
}
const tu = { name: "mdi-fileText", render: K_ }, X_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Y_(e, t) {
  return b(), C("svg", X_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m11 17v-6l-3 2.2V13H7v6h7v-2.2z"
    }, null, -1)
  ]));
}
const J_ = { name: "mdi-fileVideo", render: Y_ }, Q_ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function eb(e, t) {
  return b(), C("svg", Q_, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"
    }, null, -1)
  ]));
}
const tb = { name: "mdi-openInNew", render: eb }, nb = { class: "chat-file-name" }, rb = /* @__PURE__ */ Z({
  __name: "ChatFile",
  props: {
    file: {},
    isRemovable: { type: Boolean },
    isPreviewable: { type: Boolean }
  },
  emits: ["remove"],
  setup(e, { emit: t }) {
    const n = e, r = t, s = {
      document: tu,
      audio: W_,
      image: V_,
      video: J_
    }, o = I(() => {
      var u;
      const c = (u = n.file) == null ? void 0 : u.type.split("/")[0];
      return s[c] || tu;
    });
    function i() {
      n.isPreviewable && window.open(URL.createObjectURL(n.file));
    }
    function a() {
      r("remove", n.file);
    }
    return (c, u) => (b(), C("div", {
      class: "chat-file",
      onClick: i
    }, [
      he(_(o)),
      p("p", nb, ke(c.file.name), 1),
      c.isRemovable ? (b(), C("span", {
        key: 0,
        class: "chat-file-delete",
        onClick: tt(a, ["stop"])
      }, [
        he(_(F_))
      ])) : c.isPreviewable ? (b(), Y(_(tb), {
        key: 1,
        class: "chat-file-preview"
      })) : te("", !0)
    ]));
  }
}), jp = /* @__PURE__ */ Ht(rb, [["__scopeId", "data-v-e0d57af7"]]), ob = { class: "chat-inputs" }, sb = {
  key: 0,
  class: "chat-input-left-panel"
}, ib = ["disabled", "placeholder"], ab = { class: "chat-inputs-controls" }, cb = ["disabled"], lb = ["disabled"], ub = {
  key: 0,
  class: "chat-files"
}, db = /* @__PURE__ */ Z({
  __name: "Input",
  props: {
    placeholder: { default: "inputPlaceholder" }
  },
  emits: ["arrowKeyDown"],
  setup(e, { emit: t }) {
    const n = e, { t: r } = as(), s = t, { options: o } = co(), i = Yc(), { waitingForResponse: a } = i, c = D(null), u = D(null), d = D(""), l = D(!1), m = D(null), f = D(!1), v = I(() => {
      var T;
      return f.value ? !1 : d.value === "" || _(a) || ((T = o.disabled) == null ? void 0 : T.value) === !0;
    }), g = I(() => {
      var T;
      return ((T = o.disabled) == null ? void 0 : T.value) === !0;
    }), y = I(
      () => {
        var T;
        return h.value && _(a) && !((T = o.disabled) != null && T.value);
      }
    ), h = I(() => _(o.allowFileUploads) === !0), w = I(() => _(o.allowedFilesMimeTypes)), k = I(() => ({
      "--controls-count": h.value ? 2 : 1
    })), {
      open: x,
      reset: A,
      onChange: S
    } = L_({
      multiple: !0,
      reset: !1
    });
    S((T) => {
      if (!T) return;
      const W = new DataTransfer();
      if (c.value)
        for (let U = 0; U < c.value.length; U++)
          W.items.add(c.value[U]);
      for (let U = 0; U < T.length; U++)
        W.items.add(T[U]);
      c.value = W.files;
    }), je(() => {
      _t.on("focusInput", M), _t.on("blurInput", $), _t.on("setInputValue", P), u.value && (m.value = new ResizeObserver((T) => {
        for (const W of T)
          W.target === u.value && G();
      }), m.value.observe(u.value));
    }), $p(() => {
      _t.off("focusInput", M), _t.off("blurInput", $), _t.off("setInputValue", P), m.value && (m.value.disconnect(), m.value = null);
    });
    function $() {
      u.value && u.value.blur();
    }
    function M() {
      u.value && u.value.focus();
    }
    function P(T) {
      d.value = T, M();
    }
    function R() {
      if (c.value) {
        const T = Array.from(c.value);
        return A(), c.value = null, T;
      }
      return [];
    }
    function B(T) {
      if (o.webhookUrl && i.currentSessionId.value)
        try {
          const W = Zv(
            o.webhookUrl,
            T,
            i.currentSessionId.value,
            !0
          );
          i.ws = new WebSocket(W), i.ws.onmessage = (U) => {
            var de;
            if (U.data === "n8n|heartbeat") {
              (de = i.ws) == null || de.send("n8n|heartbeat-ack");
              return;
            }
            if (U.data === "n8n|continue") {
              f.value = !1, i.waitingForResponse.value = !0;
              return;
            }
            const se = {
              id: Xn(),
              text: U.data,
              sender: "bot"
            };
            i.messages.value.push(se), f.value = !0, i.waitingForResponse.value = !1;
          }, i.ws.onclose = () => {
            i.ws = null, f.value = !1, i.waitingForResponse.value = !1;
          };
        } catch (W) {
          console.error("Error setting up websocket connection", W);
        }
    }
    async function j(T) {
      if (!T || T.length === 0) return [];
      const W = T.map(async (U) => new Promise((se, de) => {
        const ve = new FileReader();
        ve.onload = () => se({
          name: U.name,
          type: U.type,
          data: ve.result
        }), ve.onerror = () => {
          var we;
          return de(new Error(`Error reading file: ${((we = ve.error) == null ? void 0 : we.message) ?? "Unknown error"}`));
        }, ve.readAsDataURL(U);
      }));
      return await Promise.all(W);
    }
    async function ie(T, W) {
      const U = {
        id: Xn(),
        text: W,
        sender: "user",
        files: c.value ? R() : void 0
      };
      i.messages.value.push(U), T.send(
        JSON.stringify({
          sessionId: i.currentSessionId.value,
          action: "sendMessage",
          chatInput: W,
          files: await j(U.files)
        })
      ), i.waitingForResponse.value = !0, f.value = !1;
    }
    async function z(T) {
      if (T.preventDefault(), v.value)
        return;
      const W = d.value;
      if (d.value = "", l.value = !0, i.ws && f.value) {
        await ie(i.ws, W);
        return;
      }
      const U = await i.sendMessage(W, R());
      U != null && U.executionId && B(U.executionId), l.value = !1;
    }
    async function Q(T) {
      T.shiftKey || T.isComposing || (await z(T), G());
    }
    function N(T) {
      if (!c.value) return;
      const W = new DataTransfer();
      for (let U = 0; U < c.value.length; U++) {
        const se = c.value[U];
        T.name !== se.name && W.items.add(se);
      }
      A(), c.value = W.files;
    }
    function V(T) {
      (T.key === "ArrowUp" || T.key === "ArrowDown") && (T.preventDefault(), s("arrowKeyDown", {
        key: T.key,
        currentInputValue: d.value
      }));
    }
    function F() {
      y.value || x({ accept: _(w) });
    }
    function G() {
      const T = u.value;
      if (!T) return;
      T.style.height = "var(--chat--textarea--height)";
      const W = Math.min(T.scrollHeight, 480);
      T.style.height = `${W}px`;
    }
    return (T, W) => {
      var U;
      return b(), C("div", {
        class: "chat-input",
        style: Ue(k.value),
        onKeydown: tt(V, ["stop"])
      }, [
        p("div", ob, [
          T.$slots.leftPanel ? (b(), C("div", sb, [
            ae(T.$slots, "leftPanel", {}, void 0, !0)
          ])) : te("", !0),
          rt(p("textarea", {
            ref_key: "chatTextArea",
            ref: u,
            "onUpdate:modelValue": W[0] || (W[0] = (se) => d.value = se),
            "data-test-id": "chat-input",
            disabled: g.value,
            placeholder: _(r)(n.placeholder),
            onKeydown: ft(Q, ["enter"]),
            onInput: G,
            onMousedown: G,
            onFocus: G
          }, null, 40, ib), [
            [Mp, d.value]
          ]),
          p("div", ab, [
            h.value ? (b(), C("button", {
              key: 0,
              disabled: y.value,
              class: "chat-input-file-button",
              "data-test-id": "chat-attach-file-button",
              onClick: F
            }, [
              he(_(P_), {
                height: "24",
                width: "24"
              })
            ], 8, cb)) : te("", !0),
            p("button", {
              disabled: v.value,
              class: "chat-input-send-button",
              onClick: z
            }, [
              he(_(D_), {
                height: "24",
                width: "24"
              })
            ], 8, lb)
          ])
        ]),
        (U = c.value) != null && U.length && (!l.value || f.value) ? (b(), C("div", ub, [
          (b(!0), C(He, null, ot(c.value, (se) => (b(), Y(jp, {
            key: se.name,
            file: se,
            "is-removable": !0,
            "is-previewable": !0,
            onRemove: N
          }, null, 8, ["file"]))), 128))
        ])) : te("", !0)
      ], 36);
    };
  }
}), fb = /* @__PURE__ */ Ht(db, [["__scopeId", "data-v-de5e7961"]]), pb = { class: "chat-layout" }, hb = {
  key: 0,
  class: "chat-header"
}, gb = {
  key: 2,
  class: "chat-footer"
}, mb = /* @__PURE__ */ Z({
  __name: "Layout",
  setup(e) {
    const t = D(null);
    function n() {
      const r = t.value;
      r && (r.scrollTop = r.scrollHeight);
    }
    return je(() => {
      _t.on("scrollToBottom", n), window.addEventListener("resize", n);
    }), Ft(() => {
      _t.off("scrollToBottom", n), window.removeEventListener("resize", n);
    }), (r, s) => (b(), C("main", pb, [
      r.$slots.header ? (b(), C("div", hb, [
        ae(r.$slots, "header")
      ])) : te("", !0),
      r.$slots.default ? (b(), C("div", {
        key: 1,
        ref_key: "chatBodyRef",
        ref: t,
        class: "chat-body"
      }, [
        ae(r.$slots, "default")
      ], 512)) : te("", !0),
      r.$slots.footer ? (b(), C("div", gb, [
        ae(r.$slots, "footer")
      ])) : te("", !0)
    ]));
  }
}), vb = /(%|)\{([0-9a-zA-Z_]+)\}/g;
function _b() {
  const e = (n, r) => r in n;
  function t(n, ...r) {
    if (typeof n == "function")
      return n(r);
    const s = n;
    let o = r;
    return r.length === 1 && typeof r[0] == "object" && (o = r[0]), o != null && o.hasOwnProperty || (o = {}), s.replace(vb, (i, a, c, u) => {
      let d;
      return s[u - 1] === "{" && s[u + i.length] === "}" ? `${c}` : (d = e(o, c) ? `${o[c]}` : null, d ?? "");
    });
  }
  return t;
}
const bb = {
  "generic.retry": "Retry",
  "generic.cancel": "Cancel",
  "generic.ignore": "Ignore",
  "generic.ignoreAll": "Ignore all",
  "generic.moreInfo": "More info",
  "nds.auth.roles.owner": "Owner",
  "nds.userInfo.you": "(you)",
  "nds.userSelect.selectUser": "Select User",
  "nds.userSelect.noMatchingUsers": "No matching users",
  "notice.showMore": "Show more",
  "notice.showLess": "Show less",
  "formInput.validator.fieldRequired": "This field is required",
  "formInput.validator.minCharactersRequired": "Must be at least {minimum} characters",
  "formInput.validator.maxCharactersRequired": "Must be at most {maximum} characters",
  "formInput.validator.oneNumbersRequired": (e) => `Must have at least ${e.minimum} number${e.minimum > 1 ? "s" : ""}`,
  "formInput.validator.validEmailRequired": "Must be a valid email",
  "formInput.validator.uppercaseCharsRequired": (e) => `Must have at least ${e.minimum} uppercase character${e.minimum > 1 ? "s" : ""}`,
  "formInput.validator.defaultPasswordRequirements": "8+ characters, at least 1 number and 1 capital letter",
  "sticky.markdownHint": 'You can style with <a href="https://docs.n8n.io/workflows/sticky-notes/" target="_blank">Markdown</a>',
  "tags.showMore": (e) => `+${e} more`,
  "datatable.pageSize": "Page size",
  "codeDiff.couldNotReplace": "Could not replace code",
  "codeDiff.codeReplaced": "Code replaced",
  "codeDiff.replaceMyCode": "Replace my code",
  "codeDiff.replacing": "Replacing...",
  "codeDiff.undo": "Undo",
  "betaTag.beta": "beta",
  "askAssistantButton.askAssistant": "Ask Assistant",
  "assistantChat.builder.name": "AI Builder",
  "assistantChat.builder.generatingFinalWorkflow": "Generating final workflow...",
  "assistantChat.builder.configuredNodes": "Configured nodes",
  "assistantChat.builder.thumbsUp": "Helpful",
  "assistantChat.builder.thumbsDown": "Not helpful",
  "assistantChat.builder.feedbackPlaceholder": "What went wrong?",
  "assistantChat.builder.success": "Thank you for your feedback!",
  "assistantChat.builder.submit": "Submit feedback",
  "assistantChat.builder.workflowGenerated1": "Your workflow was created successfully!",
  "assistantChat.builder.workflowGenerated2": "Fix any missing credentials before testing it.",
  "assistantChat.builder.configuringNodes": "Configuring nodes...",
  "assistantChat.builder.selectedNodes": "Selected workflow nodes",
  "assistantChat.builder.selectingNodes": "Selecting nodes...",
  "assistantChat.builder.generatedNodes": "Generated workflow nodes",
  "assistantChat.builder.toolRunning": "Tool still running",
  "assistantChat.builder.toolError": "Some tool calls have failed. Agent will retry these.",
  "assistantChat.errorParsingMarkdown": "Error parsing markdown content",
  "assistantChat.aiAssistantLabel": "AI Assistant",
  "assistantChat.aiAssistantName": "Assistant",
  "assistantChat.sessionEndMessage.1": "This Assistant session has ended. To start a new session with the Assistant, click an",
  "assistantChat.sessionEndMessage.2": "button in n8n",
  "assistantChat.you": "You",
  "assistantChat.quickRepliesTitle": "Quick reply 👇",
  "assistantChat.placeholder.1": () => "I can answer most questions about building workflows in n8n.",
  "assistantChat.placeholder.2": "For specific tasks, you’ll see the",
  "assistantChat.placeholder.3": "button in the UI.",
  "assistantChat.placeholder.4": "How can I help?",
  "assistantChat.inputPlaceholder": "Enter your response...",
  "assistantChat.copy": "Copy",
  "assistantChat.copied": "Copied",
  "aiAssistant.builder.canvas.thinking": "Working...",
  "inlineAskAssistantButton.asked": "Asked",
  "iconPicker.button.defaultToolTip": "Choose icon",
  "iconPicker.tabs.icons": "Icons",
  "iconPicker.tabs.emojis": "Emojis",
  "selectableList.addDefault": "+ Add a",
  "auth.changePassword.passwordsMustMatchError": "Passwords must match",
  "tableControlsButton.display": "Display",
  "tableControlsButton.shown": "Shown",
  "tableControlsButton.hidden": "Hidden"
}, yb = _b();
let nu = bb;
const wb = function(e, t) {
  return nu[e] !== void 0 ? yb(nu[e], ...t ? [t] : []) : "";
}, gn = (e, t, { checkForDefaultPrevented: n = !0 } = {}) => (s) => {
  const o = e == null ? void 0 : e(s);
  if (n === !1 || !o)
    return t == null ? void 0 : t(s);
};
var ru;
const gt = typeof window < "u", kb = (e) => typeof e == "string", Vp = () => {
}, Up = gt && ((ru = window == null ? void 0 : window.navigator) == null ? void 0 : ru.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Zp(e) {
  return typeof e == "function" ? e() : _(e);
}
function xb(e) {
  return e;
}
function Jc(e) {
  return Sp() ? (Ep(e), !0) : !1;
}
function Cb(e, t = !0) {
  lt() ? je(e) : t ? e() : Me(e);
}
function On(e) {
  var t;
  const n = Zp(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Qc = gt ? window : void 0;
function Yn(...e) {
  let t, n, r, s;
  if (kb(e[0]) || Array.isArray(e[0]) ? ([n, r, s] = e, t = Qc) : [t, n, r, s] = e, !t)
    return Vp;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const o = [], i = () => {
    o.forEach((d) => d()), o.length = 0;
  }, a = (d, l, m, f) => (d.addEventListener(l, m, f), () => d.removeEventListener(l, m, f)), c = ue(() => [On(t), Zp(s)], ([d, l]) => {
    i(), d && o.push(...n.flatMap((m) => r.map((f) => a(d, m, f, l))));
  }, { immediate: !0, flush: "post" }), u = () => {
    c(), i();
  };
  return Jc(u), u;
}
let ou = !1;
function Sb(e, t, n = {}) {
  const { window: r = Qc, ignore: s = [], capture: o = !0, detectIframe: i = !1 } = n;
  if (!r)
    return;
  Up && !ou && (ou = !0, Array.from(r.document.body.children).forEach((m) => m.addEventListener("click", Vp)));
  let a = !0;
  const c = (m) => s.some((f) => {
    if (typeof f == "string")
      return Array.from(r.document.querySelectorAll(f)).some((v) => v === m.target || m.composedPath().includes(v));
    {
      const v = On(f);
      return v && (m.target === v || m.composedPath().includes(v));
    }
  }), d = [
    Yn(r, "click", (m) => {
      const f = On(e);
      if (!(!f || f === m.target || m.composedPath().includes(f))) {
        if (m.detail === 0 && (a = !c(m)), !a) {
          a = !0;
          return;
        }
        t(m);
      }
    }, { passive: !0, capture: o }),
    Yn(r, "pointerdown", (m) => {
      const f = On(e);
      f && (a = !m.composedPath().includes(f) && !c(m));
    }, { passive: !0 }),
    i && Yn(r, "blur", (m) => {
      var f;
      const v = On(e);
      ((f = r.document.activeElement) == null ? void 0 : f.tagName) === "IFRAME" && !(v != null && v.contains(r.document.activeElement)) && t(m);
    })
  ].filter(Boolean);
  return () => d.forEach((m) => m());
}
function Eb(e, t = !1) {
  const n = D(), r = () => n.value = !!e();
  return r(), Cb(r, t), n;
}
const su = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, iu = "__vueuse_ssr_handlers__";
su[iu] = su[iu] || {};
var au = Object.getOwnPropertySymbols, Ab = Object.prototype.hasOwnProperty, $b = Object.prototype.propertyIsEnumerable, Mb = (e, t) => {
  var n = {};
  for (var r in e)
    Ab.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && au)
    for (var r of au(e))
      t.indexOf(r) < 0 && $b.call(e, r) && (n[r] = e[r]);
  return n;
};
function cs(e, t, n = {}) {
  const r = n, { window: s = Qc } = r, o = Mb(r, ["window"]);
  let i;
  const a = Eb(() => s && "ResizeObserver" in s), c = () => {
    i && (i.disconnect(), i = void 0);
  }, u = ue(() => On(e), (l) => {
    c(), a.value && s && l && (i = new ResizeObserver(t), i.observe(l, o));
  }, { immediate: !0, flush: "post" }), d = () => {
    c(), u();
  };
  return Jc(d), {
    isSupported: a,
    stop: d
  };
}
var cu;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(cu || (cu = {}));
var Ib = Object.defineProperty, lu = Object.getOwnPropertySymbols, Tb = Object.prototype.hasOwnProperty, Lb = Object.prototype.propertyIsEnumerable, uu = (e, t, n) => t in e ? Ib(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ob = (e, t) => {
  for (var n in t || (t = {}))
    Tb.call(t, n) && uu(e, n, t[n]);
  if (lu)
    for (var n of lu(t))
      Lb.call(t, n) && uu(e, n, t[n]);
  return e;
};
const Rb = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Ob({
  linear: xb
}, Rb);
const Pb = () => gt && /firefox/i.test(window.navigator.userAgent), el = (e) => {
  let t, n;
  return e.type === "touchend" ? (n = e.changedTouches[0].clientY, t = e.changedTouches[0].clientX) : e.type.startsWith("touch") ? (n = e.touches[0].clientY, t = e.touches[0].clientX) : (n = e.clientY, t = e.clientX), {
    clientX: t,
    clientY: n
  };
};
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Yr = () => {
}, Bb = Object.prototype.hasOwnProperty, Uo = (e, t) => Bb.call(e, t), zb = Array.isArray, Pt = (e) => typeof e == "function", Yt = (e) => typeof e == "string", Jt = (e) => e !== null && typeof e == "object", Db = Object.prototype.toString, Nb = (e) => Db.call(e), zs = (e) => Nb(e).slice(8, -1);
var Wp = typeof global == "object" && global && global.Object === Object && global, qb = typeof self == "object" && self && self.Object === Object && self, un = Wp || qb || Function("return this")(), Bn = un.Symbol, Gp = Object.prototype, Fb = Gp.hasOwnProperty, Hb = Gp.toString, Br = Bn ? Bn.toStringTag : void 0;
function jb(e) {
  var t = Fb.call(e, Br), n = e[Br];
  try {
    e[Br] = void 0;
    var r = !0;
  } catch {
  }
  var s = Hb.call(e);
  return r && (t ? e[Br] = n : delete e[Br]), s;
}
var Vb = Object.prototype, Ub = Vb.toString;
function Zb(e) {
  return Ub.call(e);
}
var Wb = "[object Null]", Gb = "[object Undefined]", du = Bn ? Bn.toStringTag : void 0;
function Ar(e) {
  return e == null ? e === void 0 ? Gb : Wb : du && du in Object(e) ? jb(e) : Zb(e);
}
function _r(e) {
  return e != null && typeof e == "object";
}
var Kb = "[object Symbol]";
function ls(e) {
  return typeof e == "symbol" || _r(e) && Ar(e) == Kb;
}
function Xb(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, s = Array(r); ++n < r; )
    s[n] = t(e[n], n, e);
  return s;
}
var bn = Array.isArray, fu = Bn ? Bn.prototype : void 0, pu = fu ? fu.toString : void 0;
function Kp(e) {
  if (typeof e == "string")
    return e;
  if (bn(e))
    return Xb(e, Kp) + "";
  if (ls(e))
    return pu ? pu.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var Yb = /\s/;
function Jb(e) {
  for (var t = e.length; t-- && Yb.test(e.charAt(t)); )
    ;
  return t;
}
var Qb = /^\s+/;
function ey(e) {
  return e && e.slice(0, Jb(e) + 1).replace(Qb, "");
}
function br(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var hu = NaN, ty = /^[-+]0x[0-9a-f]+$/i, ny = /^0b[01]+$/i, ry = /^0o[0-7]+$/i, oy = parseInt;
function gu(e) {
  if (typeof e == "number")
    return e;
  if (ls(e))
    return hu;
  if (br(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = br(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ey(e);
  var n = ny.test(e);
  return n || ry.test(e) ? oy(e.slice(2), n ? 2 : 8) : ty.test(e) ? hu : +e;
}
function sy(e) {
  return e;
}
var iy = "[object AsyncFunction]", ay = "[object Function]", cy = "[object GeneratorFunction]", ly = "[object Proxy]";
function Xp(e) {
  if (!br(e))
    return !1;
  var t = Ar(e);
  return t == ay || t == cy || t == iy || t == ly;
}
var Ds = un["__core-js_shared__"], mu = (function() {
  var e = /[^.]+$/.exec(Ds && Ds.keys && Ds.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function uy(e) {
  return !!mu && mu in e;
}
var dy = Function.prototype, fy = dy.toString;
function rr(e) {
  if (e != null) {
    try {
      return fy.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var py = /[\\^$.*+?()[\]{}|]/g, hy = /^\[object .+?Constructor\]$/, gy = Function.prototype, my = Object.prototype, vy = gy.toString, _y = my.hasOwnProperty, by = RegExp(
  "^" + vy.call(_y).replace(py, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function yy(e) {
  if (!br(e) || uy(e))
    return !1;
  var t = Xp(e) ? by : hy;
  return t.test(rr(e));
}
function wy(e, t) {
  return e == null ? void 0 : e[t];
}
function $r(e, t) {
  var n = wy(e, t);
  return yy(n) ? n : void 0;
}
var _c = $r(un, "WeakMap");
function ky(e, t, n, r) {
  e.length;
  for (var s = n + 1; s--; )
    if (t(e[s], s, e))
      return s;
  return -1;
}
var xy = 9007199254740991, Cy = /^(?:0|[1-9]\d*)$/;
function Yp(e, t) {
  var n = typeof e;
  return t = t ?? xy, !!t && (n == "number" || n != "symbol" && Cy.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Jp(e, t) {
  return e === t || e !== e && t !== t;
}
var Sy = 9007199254740991;
function tl(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Sy;
}
function Ey(e) {
  return e != null && tl(e.length) && !Xp(e);
}
var Ay = Object.prototype;
function $y(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Ay;
  return e === n;
}
function My(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Iy = "[object Arguments]";
function vu(e) {
  return _r(e) && Ar(e) == Iy;
}
var Qp = Object.prototype, Ty = Qp.hasOwnProperty, Ly = Qp.propertyIsEnumerable, eh = vu(/* @__PURE__ */ (function() {
  return arguments;
})()) ? vu : function(e) {
  return _r(e) && Ty.call(e, "callee") && !Ly.call(e, "callee");
};
function Oy() {
  return !1;
}
var th = typeof exports == "object" && exports && !exports.nodeType && exports, _u = th && typeof module == "object" && module && !module.nodeType && module, Ry = _u && _u.exports === th, bu = Ry ? un.Buffer : void 0, Py = bu ? bu.isBuffer : void 0, bc = Py || Oy, By = "[object Arguments]", zy = "[object Array]", Dy = "[object Boolean]", Ny = "[object Date]", qy = "[object Error]", Fy = "[object Function]", Hy = "[object Map]", jy = "[object Number]", Vy = "[object Object]", Uy = "[object RegExp]", Zy = "[object Set]", Wy = "[object String]", Gy = "[object WeakMap]", Ky = "[object ArrayBuffer]", Xy = "[object DataView]", Yy = "[object Float32Array]", Jy = "[object Float64Array]", Qy = "[object Int8Array]", ew = "[object Int16Array]", tw = "[object Int32Array]", nw = "[object Uint8Array]", rw = "[object Uint8ClampedArray]", ow = "[object Uint16Array]", sw = "[object Uint32Array]", Ve = {};
Ve[Yy] = Ve[Jy] = Ve[Qy] = Ve[ew] = Ve[tw] = Ve[nw] = Ve[rw] = Ve[ow] = Ve[sw] = !0;
Ve[By] = Ve[zy] = Ve[Ky] = Ve[Dy] = Ve[Xy] = Ve[Ny] = Ve[qy] = Ve[Fy] = Ve[Hy] = Ve[jy] = Ve[Vy] = Ve[Uy] = Ve[Zy] = Ve[Wy] = Ve[Gy] = !1;
function iw(e) {
  return _r(e) && tl(e.length) && !!Ve[Ar(e)];
}
function aw(e) {
  return function(t) {
    return e(t);
  };
}
var nh = typeof exports == "object" && exports && !exports.nodeType && exports, jr = nh && typeof module == "object" && module && !module.nodeType && module, cw = jr && jr.exports === nh, Ns = cw && Wp.process, yu = (function() {
  try {
    var e = jr && jr.require && jr.require("util").types;
    return e || Ns && Ns.binding && Ns.binding("util");
  } catch {
  }
})(), wu = yu && yu.isTypedArray, rh = wu ? aw(wu) : iw, lw = Object.prototype, uw = lw.hasOwnProperty;
function dw(e, t) {
  var n = bn(e), r = !n && eh(e), s = !n && !r && bc(e), o = !n && !r && !s && rh(e), i = n || r || s || o, a = i ? My(e.length, String) : [], c = a.length;
  for (var u in e)
    uw.call(e, u) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Yp(u, c))) && a.push(u);
  return a;
}
function fw(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var pw = fw(Object.keys, Object), hw = Object.prototype, gw = hw.hasOwnProperty;
function mw(e) {
  if (!$y(e))
    return pw(e);
  var t = [];
  for (var n in Object(e))
    gw.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function oh(e) {
  return Ey(e) ? dw(e) : mw(e);
}
var vw = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, _w = /^\w*$/;
function nl(e, t) {
  if (bn(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || ls(e) ? !0 : _w.test(e) || !vw.test(e) || t != null && e in Object(t);
}
var Jr = $r(Object, "create");
function bw() {
  this.__data__ = Jr ? Jr(null) : {}, this.size = 0;
}
function yw(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ww = "__lodash_hash_undefined__", kw = Object.prototype, xw = kw.hasOwnProperty;
function Cw(e) {
  var t = this.__data__;
  if (Jr) {
    var n = t[e];
    return n === ww ? void 0 : n;
  }
  return xw.call(t, e) ? t[e] : void 0;
}
var Sw = Object.prototype, Ew = Sw.hasOwnProperty;
function Aw(e) {
  var t = this.__data__;
  return Jr ? t[e] !== void 0 : Ew.call(t, e);
}
var $w = "__lodash_hash_undefined__";
function Mw(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Jr && t === void 0 ? $w : t, this;
}
function tr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
tr.prototype.clear = bw;
tr.prototype.delete = yw;
tr.prototype.get = Cw;
tr.prototype.has = Aw;
tr.prototype.set = Mw;
function Iw() {
  this.__data__ = [], this.size = 0;
}
function us(e, t) {
  for (var n = e.length; n--; )
    if (Jp(e[n][0], t))
      return n;
  return -1;
}
var Tw = Array.prototype, Lw = Tw.splice;
function Ow(e) {
  var t = this.__data__, n = us(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Lw.call(t, n, 1), --this.size, !0;
}
function Rw(e) {
  var t = this.__data__, n = us(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Pw(e) {
  return us(this.__data__, e) > -1;
}
function Bw(e, t) {
  var n = this.__data__, r = us(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function xn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
xn.prototype.clear = Iw;
xn.prototype.delete = Ow;
xn.prototype.get = Rw;
xn.prototype.has = Pw;
xn.prototype.set = Bw;
var Qr = $r(un, "Map");
function zw() {
  this.size = 0, this.__data__ = {
    hash: new tr(),
    map: new (Qr || xn)(),
    string: new tr()
  };
}
function Dw(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function ds(e, t) {
  var n = e.__data__;
  return Dw(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Nw(e) {
  var t = ds(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function qw(e) {
  return ds(this, e).get(e);
}
function Fw(e) {
  return ds(this, e).has(e);
}
function Hw(e, t) {
  var n = ds(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function Cn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Cn.prototype.clear = zw;
Cn.prototype.delete = Nw;
Cn.prototype.get = qw;
Cn.prototype.has = Fw;
Cn.prototype.set = Hw;
var jw = "Expected a function";
function rl(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(jw);
  var n = function() {
    var r = arguments, s = t ? t.apply(this, r) : r[0], o = n.cache;
    if (o.has(s))
      return o.get(s);
    var i = e.apply(this, r);
    return n.cache = o.set(s, i) || o, i;
  };
  return n.cache = new (rl.Cache || Cn)(), n;
}
rl.Cache = Cn;
var Vw = 500;
function Uw(e) {
  var t = rl(e, function(r) {
    return n.size === Vw && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Zw = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ww = /\\(\\)?/g, Gw = Uw(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Zw, function(n, r, s, o) {
    t.push(s ? o.replace(Ww, "$1") : r || n);
  }), t;
});
function Kw(e) {
  return e == null ? "" : Kp(e);
}
function sh(e, t) {
  return bn(e) ? e : nl(e, t) ? [e] : Gw(Kw(e));
}
function fs(e) {
  if (typeof e == "string" || ls(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function ih(e, t) {
  t = sh(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[fs(t[n++])];
  return n && n == r ? e : void 0;
}
function Lt(e, t, n) {
  var r = e == null ? void 0 : ih(e, t);
  return r === void 0 ? n : r;
}
function Xw(e, t) {
  for (var n = -1, r = t.length, s = e.length; ++n < r; )
    e[s + n] = t[n];
  return e;
}
function Yw() {
  this.__data__ = new xn(), this.size = 0;
}
function Jw(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function Qw(e) {
  return this.__data__.get(e);
}
function ek(e) {
  return this.__data__.has(e);
}
var tk = 200;
function nk(e, t) {
  var n = this.__data__;
  if (n instanceof xn) {
    var r = n.__data__;
    if (!Qr || r.length < tk - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Cn(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function vn(e) {
  var t = this.__data__ = new xn(e);
  this.size = t.size;
}
vn.prototype.clear = Yw;
vn.prototype.delete = Jw;
vn.prototype.get = Qw;
vn.prototype.has = ek;
vn.prototype.set = nk;
function rk(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, s = 0, o = []; ++n < r; ) {
    var i = e[n];
    t(i, n, e) && (o[s++] = i);
  }
  return o;
}
function ok() {
  return [];
}
var sk = Object.prototype, ik = sk.propertyIsEnumerable, ku = Object.getOwnPropertySymbols, ak = ku ? function(e) {
  return e == null ? [] : (e = Object(e), rk(ku(e), function(t) {
    return ik.call(e, t);
  }));
} : ok;
function ck(e, t, n) {
  var r = t(e);
  return bn(e) ? r : Xw(r, n(e));
}
function xu(e) {
  return ck(e, oh, ak);
}
var yc = $r(un, "DataView"), wc = $r(un, "Promise"), kc = $r(un, "Set"), Cu = "[object Map]", lk = "[object Object]", Su = "[object Promise]", Eu = "[object Set]", Au = "[object WeakMap]", $u = "[object DataView]", uk = rr(yc), dk = rr(Qr), fk = rr(wc), pk = rr(kc), hk = rr(_c), Ln = Ar;
(yc && Ln(new yc(new ArrayBuffer(1))) != $u || Qr && Ln(new Qr()) != Cu || wc && Ln(wc.resolve()) != Su || kc && Ln(new kc()) != Eu || _c && Ln(new _c()) != Au) && (Ln = function(e) {
  var t = Ar(e), n = t == lk ? e.constructor : void 0, r = n ? rr(n) : "";
  if (r)
    switch (r) {
      case uk:
        return $u;
      case dk:
        return Cu;
      case fk:
        return Su;
      case pk:
        return Eu;
      case hk:
        return Au;
    }
  return t;
});
var Mu = un.Uint8Array, gk = "__lodash_hash_undefined__";
function mk(e) {
  return this.__data__.set(e, gk), this;
}
function vk(e) {
  return this.__data__.has(e);
}
function Zo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Cn(); ++t < n; )
    this.add(e[t]);
}
Zo.prototype.add = Zo.prototype.push = mk;
Zo.prototype.has = vk;
function _k(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function bk(e, t) {
  return e.has(t);
}
var yk = 1, wk = 2;
function ah(e, t, n, r, s, o) {
  var i = n & yk, a = e.length, c = t.length;
  if (a != c && !(i && c > a))
    return !1;
  var u = o.get(e), d = o.get(t);
  if (u && d)
    return u == t && d == e;
  var l = -1, m = !0, f = n & wk ? new Zo() : void 0;
  for (o.set(e, t), o.set(t, e); ++l < a; ) {
    var v = e[l], g = t[l];
    if (r)
      var y = i ? r(g, v, l, t, e, o) : r(v, g, l, e, t, o);
    if (y !== void 0) {
      if (y)
        continue;
      m = !1;
      break;
    }
    if (f) {
      if (!_k(t, function(h, w) {
        if (!bk(f, w) && (v === h || s(v, h, n, r, o)))
          return f.push(w);
      })) {
        m = !1;
        break;
      }
    } else if (!(v === g || s(v, g, n, r, o))) {
      m = !1;
      break;
    }
  }
  return o.delete(e), o.delete(t), m;
}
function kk(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, s) {
    n[++t] = [s, r];
  }), n;
}
function xk(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var Ck = 1, Sk = 2, Ek = "[object Boolean]", Ak = "[object Date]", $k = "[object Error]", Mk = "[object Map]", Ik = "[object Number]", Tk = "[object RegExp]", Lk = "[object Set]", Ok = "[object String]", Rk = "[object Symbol]", Pk = "[object ArrayBuffer]", Bk = "[object DataView]", Iu = Bn ? Bn.prototype : void 0, qs = Iu ? Iu.valueOf : void 0;
function zk(e, t, n, r, s, o, i) {
  switch (n) {
    case Bk:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Pk:
      return !(e.byteLength != t.byteLength || !o(new Mu(e), new Mu(t)));
    case Ek:
    case Ak:
    case Ik:
      return Jp(+e, +t);
    case $k:
      return e.name == t.name && e.message == t.message;
    case Tk:
    case Ok:
      return e == t + "";
    case Mk:
      var a = kk;
    case Lk:
      var c = r & Ck;
      if (a || (a = xk), e.size != t.size && !c)
        return !1;
      var u = i.get(e);
      if (u)
        return u == t;
      r |= Sk, i.set(e, t);
      var d = ah(a(e), a(t), r, s, o, i);
      return i.delete(e), d;
    case Rk:
      if (qs)
        return qs.call(e) == qs.call(t);
  }
  return !1;
}
var Dk = 1, Nk = Object.prototype, qk = Nk.hasOwnProperty;
function Fk(e, t, n, r, s, o) {
  var i = n & Dk, a = xu(e), c = a.length, u = xu(t), d = u.length;
  if (c != d && !i)
    return !1;
  for (var l = c; l--; ) {
    var m = a[l];
    if (!(i ? m in t : qk.call(t, m)))
      return !1;
  }
  var f = o.get(e), v = o.get(t);
  if (f && v)
    return f == t && v == e;
  var g = !0;
  o.set(e, t), o.set(t, e);
  for (var y = i; ++l < c; ) {
    m = a[l];
    var h = e[m], w = t[m];
    if (r)
      var k = i ? r(w, h, m, t, e, o) : r(h, w, m, e, t, o);
    if (!(k === void 0 ? h === w || s(h, w, n, r, o) : k)) {
      g = !1;
      break;
    }
    y || (y = m == "constructor");
  }
  if (g && !y) {
    var x = e.constructor, A = t.constructor;
    x != A && "constructor" in e && "constructor" in t && !(typeof x == "function" && x instanceof x && typeof A == "function" && A instanceof A) && (g = !1);
  }
  return o.delete(e), o.delete(t), g;
}
var Hk = 1, Tu = "[object Arguments]", Lu = "[object Array]", wo = "[object Object]", jk = Object.prototype, Ou = jk.hasOwnProperty;
function Vk(e, t, n, r, s, o) {
  var i = bn(e), a = bn(t), c = i ? Lu : Ln(e), u = a ? Lu : Ln(t);
  c = c == Tu ? wo : c, u = u == Tu ? wo : u;
  var d = c == wo, l = u == wo, m = c == u;
  if (m && bc(e)) {
    if (!bc(t))
      return !1;
    i = !0, d = !1;
  }
  if (m && !d)
    return o || (o = new vn()), i || rh(e) ? ah(e, t, n, r, s, o) : zk(e, t, c, n, r, s, o);
  if (!(n & Hk)) {
    var f = d && Ou.call(e, "__wrapped__"), v = l && Ou.call(t, "__wrapped__");
    if (f || v) {
      var g = f ? e.value() : e, y = v ? t.value() : t;
      return o || (o = new vn()), s(g, y, n, r, o);
    }
  }
  return m ? (o || (o = new vn()), Fk(e, t, n, r, s, o)) : !1;
}
function ps(e, t, n, r, s) {
  return e === t ? !0 : e == null || t == null || !_r(e) && !_r(t) ? e !== e && t !== t : Vk(e, t, n, r, ps, s);
}
var Uk = 1, Zk = 2;
function Wk(e, t, n, r) {
  var s = n.length, o = s;
  if (e == null)
    return !o;
  for (e = Object(e); s--; ) {
    var i = n[s];
    if (i[2] ? i[1] !== e[i[0]] : !(i[0] in e))
      return !1;
  }
  for (; ++s < o; ) {
    i = n[s];
    var a = i[0], c = e[a], u = i[1];
    if (i[2]) {
      if (c === void 0 && !(a in e))
        return !1;
    } else {
      var d = new vn(), l;
      if (!(l === void 0 ? ps(u, c, Uk | Zk, r, d) : l))
        return !1;
    }
  }
  return !0;
}
function ch(e) {
  return e === e && !br(e);
}
function Gk(e) {
  for (var t = oh(e), n = t.length; n--; ) {
    var r = t[n], s = e[r];
    t[n] = [r, s, ch(s)];
  }
  return t;
}
function lh(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Kk(e) {
  var t = Gk(e);
  return t.length == 1 && t[0][2] ? lh(t[0][0], t[0][1]) : function(n) {
    return n === e || Wk(n, e, t);
  };
}
function Xk(e, t) {
  return e != null && t in Object(e);
}
function Yk(e, t, n) {
  t = sh(t, e);
  for (var r = -1, s = t.length, o = !1; ++r < s; ) {
    var i = fs(t[r]);
    if (!(o = e != null && n(e, i)))
      break;
    e = e[i];
  }
  return o || ++r != s ? o : (s = e == null ? 0 : e.length, !!s && tl(s) && Yp(i, s) && (bn(e) || eh(e)));
}
function Jk(e, t) {
  return e != null && Yk(e, t, Xk);
}
var Qk = 1, e4 = 2;
function t4(e, t) {
  return nl(e) && ch(t) ? lh(fs(e), t) : function(n) {
    var r = Lt(n, e);
    return r === void 0 && r === t ? Jk(n, e) : ps(t, r, Qk | e4);
  };
}
function n4(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function r4(e) {
  return function(t) {
    return ih(t, e);
  };
}
function o4(e) {
  return nl(e) ? n4(fs(e)) : r4(e);
}
function s4(e) {
  return typeof e == "function" ? e : e == null ? sy : typeof e == "object" ? bn(e) ? t4(e[0], e[1]) : Kk(e) : o4(e);
}
var Fs = function() {
  return un.Date.now();
}, i4 = "Expected a function", a4 = Math.max, c4 = Math.min;
function xc(e, t, n) {
  var r, s, o, i, a, c, u = 0, d = !1, l = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(i4);
  t = gu(t) || 0, br(n) && (d = !!n.leading, l = "maxWait" in n, o = l ? a4(gu(n.maxWait) || 0, t) : o, m = "trailing" in n ? !!n.trailing : m);
  function f(S) {
    var $ = r, M = s;
    return r = s = void 0, u = S, i = e.apply(M, $), i;
  }
  function v(S) {
    return u = S, a = setTimeout(h, t), d ? f(S) : i;
  }
  function g(S) {
    var $ = S - c, M = S - u, P = t - $;
    return l ? c4(P, o - M) : P;
  }
  function y(S) {
    var $ = S - c, M = S - u;
    return c === void 0 || $ >= t || $ < 0 || l && M >= o;
  }
  function h() {
    var S = Fs();
    if (y(S))
      return w(S);
    a = setTimeout(h, g(S));
  }
  function w(S) {
    return a = void 0, m && r ? f(S) : (r = s = void 0, i);
  }
  function k() {
    a !== void 0 && clearTimeout(a), u = 0, r = c = s = a = void 0;
  }
  function x() {
    return a === void 0 ? i : w(Fs());
  }
  function A() {
    var S = Fs(), $ = y(S);
    if (r = arguments, s = this, c = S, $) {
      if (a === void 0)
        return v(c);
      if (l)
        return clearTimeout(a), a = setTimeout(h, t), f(c);
    }
    return a === void 0 && (a = setTimeout(h, t)), i;
  }
  return A.cancel = k, A.flush = x, A;
}
function l4(e, t, n) {
  var r = e == null ? 0 : e.length;
  if (!r)
    return -1;
  var s = r - 1;
  return ky(e, s4(t), s);
}
function Wo(e) {
  for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
    var s = e[t];
    r[s[0]] = s[1];
  }
  return r;
}
function Cc(e, t) {
  return ps(e, t);
}
function Jn(e) {
  return e == null;
}
function u4(e) {
  return e === void 0;
}
const uh = (e) => e === void 0, ol = (e) => typeof e == "boolean", Ye = (e) => typeof e == "number", eo = (e) => typeof Element > "u" ? !1 : e instanceof Element, d4 = (e) => Yt(e) ? !Number.isNaN(Number(e)) : !1, f4 = (e = "") => e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
class p4 extends Error {
  constructor(t) {
    super(t), this.name = "ElementPlusError";
  }
}
function h4(e, t) {
  throw new p4(`[${e}] ${t}`);
}
function yr(e, t = "px") {
  if (!e)
    return "";
  if (Ye(e) || d4(e))
    return `${e}${t}`;
  if (Yt(e))
    return e;
}
function g4(e, t) {
  if (!gt)
    return;
  if (!t) {
    e.scrollTop = 0;
    return;
  }
  const n = [];
  let r = t.offsetParent;
  for (; r !== null && e !== r && e.contains(r); )
    n.push(r), r = r.offsetParent;
  const s = t.offsetTop + n.reduce((c, u) => c + u.offsetTop, 0), o = s + t.offsetHeight, i = e.scrollTop, a = i + e.clientHeight;
  s < i ? e.scrollTop = s : o > a && (e.scrollTop = o - e.clientHeight);
}
/*! Element Plus Icons Vue v2.3.1 */
var m4 = /* @__PURE__ */ Z({
  name: "ArrowDown",
  __name: "arrow-down",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      })
    ]));
  }
}), dh = m4, v4 = /* @__PURE__ */ Z({
  name: "ArrowLeft",
  __name: "arrow-left",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
      })
    ]));
  }
}), _4 = v4, b4 = /* @__PURE__ */ Z({
  name: "ArrowRight",
  __name: "arrow-right",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
      })
    ]));
  }
}), y4 = b4, w4 = /* @__PURE__ */ Z({
  name: "CircleCheck",
  __name: "circle-check",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      p("path", {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
      })
    ]));
  }
}), k4 = w4, x4 = /* @__PURE__ */ Z({
  name: "CircleClose",
  __name: "circle-close",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
      }),
      p("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
}), sl = x4, C4 = /* @__PURE__ */ Z({
  name: "Close",
  __name: "close",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), Sc = C4, S4 = /* @__PURE__ */ Z({
  name: "DArrowLeft",
  __name: "d-arrow-left",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
      })
    ]));
  }
}), E4 = S4, A4 = /* @__PURE__ */ Z({
  name: "DArrowRight",
  __name: "d-arrow-right",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688m-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
      })
    ]));
  }
}), $4 = A4, M4 = /* @__PURE__ */ Z({
  name: "Hide",
  __name: "hide",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
      }),
      p("path", {
        fill: "currentColor",
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
      })
    ]));
  }
}), I4 = M4, T4 = /* @__PURE__ */ Z({
  name: "Loading",
  __name: "loading",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
      })
    ]));
  }
}), fh = T4, L4 = /* @__PURE__ */ Z({
  name: "MoreFilled",
  __name: "more-filled",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224m336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224"
      })
    ]));
  }
}), Ru = L4, O4 = /* @__PURE__ */ Z({
  name: "PictureFilled",
  __name: "picture-filled",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112M256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384"
      })
    ]));
  }
}), R4 = O4, P4 = /* @__PURE__ */ Z({
  name: "View",
  __name: "view",
  setup(e) {
    return (t, n) => (b(), C("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      p("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
}), B4 = P4;
const ph = "__epPropKey", be = (e) => e, z4 = (e) => Jt(e) && !!e[ph], hs = (e, t) => {
  if (!Jt(e) || z4(e))
    return e;
  const { values: n, required: r, default: s, type: o, validator: i } = e, c = {
    type: o,
    required: !!r,
    validator: n || i ? (u) => {
      let d = !1, l = [];
      if (n && (l = Array.from(n), Uo(e, "default") && l.push(s), d || (d = l.includes(u))), i && (d || (d = i(u))), !d && l.length > 0) {
        const m = [...new Set(l)].map((f) => JSON.stringify(f)).join(", ");
        yv(`Invalid prop: validation failed${t ? ` for prop "${t}"` : ""}. Expected one of [${m}], got value ${JSON.stringify(u)}.`);
      }
      return d;
    } : void 0,
    [ph]: !0
  };
  return Uo(e, "default") && (c.default = s), c;
}, Re = (e) => Wo(Object.entries(e).map(([t, n]) => [
  t,
  hs(n, t)
])), en = be([
  String,
  Object,
  Function
]), hh = {
  validating: fh,
  success: k4,
  error: sl
}, jt = (e, t) => {
  if (e.install = (n) => {
    for (const r of [e, ...Object.values(t ?? {})])
      n.component(r.name, r);
  }, t)
    for (const [n, r] of Object.entries(t))
      e[n] = r;
  return e;
}, D4 = (e, t) => (e.install = (n) => {
  n.directive(t, e);
}, e), gs = (e) => (e.install = Yr, e), _n = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace"
}, wt = "update:modelValue", il = "change", lo = ["", "default", "small", "large"], N4 = {
  large: 40,
  default: 32,
  small: 24
}, q4 = (e) => N4[e || "default"], F4 = (e) => ["", ...lo].includes(e), gh = (e) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(e), al = (e) => e, H4 = ["class", "style"], j4 = /^on[A-Z]/, V4 = (e = {}) => {
  const { excludeListeners: t = !1, excludeKeys: n } = e, r = I(() => ((n == null ? void 0 : n.value) || []).concat(H4)), s = lt();
  return s ? I(() => {
    var o;
    return Wo(Object.entries((o = s.proxy) == null ? void 0 : o.$attrs).filter(([i]) => !r.value.includes(i) && !(t && j4.test(i))));
  }) : I(() => ({}));
}, mh = ({ from: e, replacement: t, scope: n, version: r, ref: s, type: o = "API" }, i) => {
  ue(() => _(i), (a) => {
  }, {
    immediate: !0
  });
};
var U4 = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const Z4 = (e) => (t, n) => W4(t, n, _(e)), W4 = (e, t, n) => Lt(n, e, e).replace(/\{(\w+)\}/g, (r, s) => {
  var o;
  return `${(o = t == null ? void 0 : t[s]) != null ? o : `{${s}}`}`;
}), G4 = (e) => {
  const t = I(() => _(e).name), n = Cp(e) ? e : D(e);
  return {
    lang: t,
    locale: n,
    t: Z4(e)
  };
}, K4 = Symbol("localeContextKey"), tn = (e) => {
  const t = Le(K4, D());
  return G4(I(() => t.value || U4));
}, Hs = "el", X4 = "is-", Un = (e, t, n, r, s) => {
  let o = `${e}-${t}`;
  return n && (o += `-${n}`), r && (o += `__${r}`), s && (o += `--${s}`), o;
}, Y4 = Symbol("namespaceContextKey"), cl = (e) => {
  const t = lt() ? Le(Y4, D(Hs)) : D(Hs);
  return I(() => _(t) || Hs);
}, Te = (e, t) => {
  const n = cl();
  return {
    namespace: n,
    b: (g = "") => Un(n.value, e, g, "", ""),
    e: (g) => g ? Un(n.value, e, "", g, "") : "",
    m: (g) => g ? Un(n.value, e, "", "", g) : "",
    be: (g, y) => g && y ? Un(n.value, e, g, y, "") : "",
    em: (g, y) => g && y ? Un(n.value, e, "", g, y) : "",
    bm: (g, y) => g && y ? Un(n.value, e, g, "", y) : "",
    bem: (g, y, h) => g && y && h ? Un(n.value, e, g, y, h) : "",
    is: (g, ...y) => {
      const h = y.length >= 1 ? y[0] : !0;
      return g && h ? `${X4}${g}` : "";
    },
    cssVar: (g) => {
      const y = {};
      for (const h in g)
        g[h] && (y[`--${n.value}-${h}`] = g[h]);
      return y;
    },
    cssVarName: (g) => `--${n.value}-${g}`,
    cssVarBlock: (g) => {
      const y = {};
      for (const h in g)
        g[h] && (y[`--${n.value}-${e}-${h}`] = g[h]);
      return y;
    },
    cssVarBlockName: (g) => `--${n.value}-${e}-${g}`
  };
}, J4 = hs({
  type: be(Boolean),
  default: null
}), Q4 = hs({
  type: be(Function)
}), e3 = (e) => {
  const t = `update:${e}`, n = `onUpdate:${e}`, r = [t], s = {
    [e]: J4,
    [n]: Q4
  };
  return {
    useModelToggle: ({
      indicator: i,
      toggleReason: a,
      shouldHideWhenRouteChanges: c,
      shouldProceed: u,
      onShow: d,
      onHide: l
    }) => {
      const m = lt(), { emit: f } = m, v = m.props, g = I(() => Pt(v[n])), y = I(() => v[e] === null), h = ($) => {
        i.value !== !0 && (i.value = !0, a && (a.value = $), Pt(d) && d($));
      }, w = ($) => {
        i.value !== !1 && (i.value = !1, a && (a.value = $), Pt(l) && l($));
      }, k = ($) => {
        if (v.disabled === !0 || Pt(u) && !u())
          return;
        const M = g.value && gt;
        M && f(t, !0), (y.value || !M) && h($);
      }, x = ($) => {
        if (v.disabled === !0 || !gt)
          return;
        const M = g.value && gt;
        M && f(t, !1), (y.value || !M) && w($);
      }, A = ($) => {
        ol($) && (v.disabled && $ ? g.value && f(t, !1) : i.value !== $ && ($ ? h() : w()));
      }, S = () => {
        i.value ? x() : k();
      };
      return ue(() => v[e], A), c && m.appContext.config.globalProperties.$route !== void 0 && ue(() => ({
        ...m.proxy.$route
      }), () => {
        c.value && i.value && x();
      }), je(() => {
        A(v[e]);
      }), {
        hide: x,
        show: k,
        toggle: S,
        hasUpdateHandler: g
      };
    },
    useModelToggleProps: s,
    useModelToggleEmits: r
  };
}, vh = (e) => {
  const t = lt();
  return I(() => {
    var n, r;
    return (r = (n = t == null ? void 0 : t.proxy) == null ? void 0 : n.$props) == null ? void 0 : r[e];
  });
};
var xt = "top", Nt = "bottom", qt = "right", Ct = "left", ll = "auto", uo = [xt, Nt, qt, Ct], wr = "start", to = "end", t3 = "clippingParents", _h = "viewport", zr = "popper", n3 = "reference", Pu = uo.reduce(function(e, t) {
  return e.concat([t + "-" + wr, t + "-" + to]);
}, []), ms = [].concat(uo, [ll]).reduce(function(e, t) {
  return e.concat([t, t + "-" + wr, t + "-" + to]);
}, []), r3 = "beforeRead", o3 = "read", s3 = "afterRead", i3 = "beforeMain", a3 = "main", c3 = "afterMain", l3 = "beforeWrite", u3 = "write", d3 = "afterWrite", f3 = [r3, o3, s3, i3, a3, c3, l3, u3, d3];
function ln(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function nn(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function kr(e) {
  var t = nn(e).Element;
  return e instanceof t || e instanceof Element;
}
function zt(e) {
  var t = nn(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ul(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = nn(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function p3(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, s = t.attributes[n] || {}, o = t.elements[n];
    !zt(o) || !ln(o) || (Object.assign(o.style, r), Object.keys(s).forEach(function(i) {
      var a = s[i];
      a === !1 ? o.removeAttribute(i) : o.setAttribute(i, a === !0 ? "" : a);
    }));
  });
}
function h3(e) {
  var t = e.state, n = { popper: { position: t.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var s = t.elements[r], o = t.attributes[r] || {}, i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), a = i.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !zt(s) || !ln(s) || (Object.assign(s.style, a), Object.keys(o).forEach(function(c) {
        s.removeAttribute(c);
      }));
    });
  };
}
var bh = { name: "applyStyles", enabled: !0, phase: "write", fn: p3, effect: h3, requires: ["computeStyles"] };
function cn(e) {
  return e.split("-")[0];
}
var Qn = Math.max, Go = Math.min, xr = Math.round;
function Cr(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(), r = 1, s = 1;
  if (zt(e) && t) {
    var o = e.offsetHeight, i = e.offsetWidth;
    i > 0 && (r = xr(n.width) / i || 1), o > 0 && (s = xr(n.height) / o || 1);
  }
  return { width: n.width / r, height: n.height / s, top: n.top / s, right: n.right / r, bottom: n.bottom / s, left: n.left / r, x: n.left / r, y: n.top / s };
}
function dl(e) {
  var t = Cr(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), { x: e.offsetLeft, y: e.offsetTop, width: n, height: r };
}
function yh(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && ul(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function yn(e) {
  return nn(e).getComputedStyle(e);
}
function g3(e) {
  return ["table", "td", "th"].indexOf(ln(e)) >= 0;
}
function Nn(e) {
  return ((kr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function vs(e) {
  return ln(e) === "html" ? e : e.assignedSlot || e.parentNode || (ul(e) ? e.host : null) || Nn(e);
}
function Bu(e) {
  return !zt(e) || yn(e).position === "fixed" ? null : e.offsetParent;
}
function m3(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && zt(e)) {
    var r = yn(e);
    if (r.position === "fixed") return null;
  }
  var s = vs(e);
  for (ul(s) && (s = s.host); zt(s) && ["html", "body"].indexOf(ln(s)) < 0; ) {
    var o = yn(s);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none") return s;
    s = s.parentNode;
  }
  return null;
}
function fo(e) {
  for (var t = nn(e), n = Bu(e); n && g3(n) && yn(n).position === "static"; ) n = Bu(n);
  return n && (ln(n) === "html" || ln(n) === "body" && yn(n).position === "static") ? t : n || m3(e) || t;
}
function fl(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Vr(e, t, n) {
  return Qn(e, Go(t, n));
}
function v3(e, t, n) {
  var r = Vr(e, t, n);
  return r > n ? n : r;
}
function wh() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function kh(e) {
  return Object.assign({}, wh(), e);
}
function xh(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var _3 = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, kh(typeof e != "number" ? e : xh(e, uo));
};
function b3(e) {
  var t, n = e.state, r = e.name, s = e.options, o = n.elements.arrow, i = n.modifiersData.popperOffsets, a = cn(n.placement), c = fl(a), u = [Ct, qt].indexOf(a) >= 0, d = u ? "height" : "width";
  if (!(!o || !i)) {
    var l = _3(s.padding, n), m = dl(o), f = c === "y" ? xt : Ct, v = c === "y" ? Nt : qt, g = n.rects.reference[d] + n.rects.reference[c] - i[c] - n.rects.popper[d], y = i[c] - n.rects.reference[c], h = fo(o), w = h ? c === "y" ? h.clientHeight || 0 : h.clientWidth || 0 : 0, k = g / 2 - y / 2, x = l[f], A = w - m[d] - l[v], S = w / 2 - m[d] / 2 + k, $ = Vr(x, S, A), M = c;
    n.modifiersData[r] = (t = {}, t[M] = $, t.centerOffset = $ - S, t);
  }
}
function y3(e) {
  var t = e.state, n = e.options, r = n.element, s = r === void 0 ? "[data-popper-arrow]" : r;
  s != null && (typeof s == "string" && (s = t.elements.popper.querySelector(s), !s) || !yh(t.elements.popper, s) || (t.elements.arrow = s));
}
var w3 = { name: "arrow", enabled: !0, phase: "main", fn: b3, effect: y3, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function Sr(e) {
  return e.split("-")[1];
}
var k3 = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function x3(e) {
  var t = e.x, n = e.y, r = window, s = r.devicePixelRatio || 1;
  return { x: xr(t * s) / s || 0, y: xr(n * s) / s || 0 };
}
function zu(e) {
  var t, n = e.popper, r = e.popperRect, s = e.placement, o = e.variation, i = e.offsets, a = e.position, c = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, l = e.isFixed, m = i.x, f = m === void 0 ? 0 : m, v = i.y, g = v === void 0 ? 0 : v, y = typeof d == "function" ? d({ x: f, y: g }) : { x: f, y: g };
  f = y.x, g = y.y;
  var h = i.hasOwnProperty("x"), w = i.hasOwnProperty("y"), k = Ct, x = xt, A = window;
  if (u) {
    var S = fo(n), $ = "clientHeight", M = "clientWidth";
    if (S === nn(n) && (S = Nn(n), yn(S).position !== "static" && a === "absolute" && ($ = "scrollHeight", M = "scrollWidth")), S = S, s === xt || (s === Ct || s === qt) && o === to) {
      x = Nt;
      var P = l && S === A && A.visualViewport ? A.visualViewport.height : S[$];
      g -= P - r.height, g *= c ? 1 : -1;
    }
    if (s === Ct || (s === xt || s === Nt) && o === to) {
      k = qt;
      var R = l && S === A && A.visualViewport ? A.visualViewport.width : S[M];
      f -= R - r.width, f *= c ? 1 : -1;
    }
  }
  var B = Object.assign({ position: a }, u && k3), j = d === !0 ? x3({ x: f, y: g }) : { x: f, y: g };
  if (f = j.x, g = j.y, c) {
    var ie;
    return Object.assign({}, B, (ie = {}, ie[x] = w ? "0" : "", ie[k] = h ? "0" : "", ie.transform = (A.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + g + "px)" : "translate3d(" + f + "px, " + g + "px, 0)", ie));
  }
  return Object.assign({}, B, (t = {}, t[x] = w ? g + "px" : "", t[k] = h ? f + "px" : "", t.transform = "", t));
}
function C3(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, s = r === void 0 ? !0 : r, o = n.adaptive, i = o === void 0 ? !0 : o, a = n.roundOffsets, c = a === void 0 ? !0 : a, u = { placement: cn(t.placement), variation: Sr(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: s, isFixed: t.options.strategy === "fixed" };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, zu(Object.assign({}, u, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: i, roundOffsets: c })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, zu(Object.assign({}, u, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: c })))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var Ch = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: C3, data: {} }, ko = { passive: !0 };
function S3(e) {
  var t = e.state, n = e.instance, r = e.options, s = r.scroll, o = s === void 0 ? !0 : s, i = r.resize, a = i === void 0 ? !0 : i, c = nn(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, ko);
  }), a && c.addEventListener("resize", n.update, ko), function() {
    o && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, ko);
    }), a && c.removeEventListener("resize", n.update, ko);
  };
}
var Sh = { name: "eventListeners", enabled: !0, phase: "write", fn: function() {
}, effect: S3, data: {} }, E3 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Po(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return E3[t];
  });
}
var A3 = { start: "end", end: "start" };
function Du(e) {
  return e.replace(/start|end/g, function(t) {
    return A3[t];
  });
}
function pl(e) {
  var t = nn(e), n = t.pageXOffset, r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function hl(e) {
  return Cr(Nn(e)).left + pl(e).scrollLeft;
}
function $3(e) {
  var t = nn(e), n = Nn(e), r = t.visualViewport, s = n.clientWidth, o = n.clientHeight, i = 0, a = 0;
  return r && (s = r.width, o = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (i = r.offsetLeft, a = r.offsetTop)), { width: s, height: o, x: i + hl(e), y: a };
}
function M3(e) {
  var t, n = Nn(e), r = pl(e), s = (t = e.ownerDocument) == null ? void 0 : t.body, o = Qn(n.scrollWidth, n.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), i = Qn(n.scrollHeight, n.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0), a = -r.scrollLeft + hl(e), c = -r.scrollTop;
  return yn(s || n).direction === "rtl" && (a += Qn(n.clientWidth, s ? s.clientWidth : 0) - o), { width: o, height: i, x: a, y: c };
}
function gl(e) {
  var t = yn(e), n = t.overflow, r = t.overflowX, s = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + s + r);
}
function Eh(e) {
  return ["html", "body", "#document"].indexOf(ln(e)) >= 0 ? e.ownerDocument.body : zt(e) && gl(e) ? e : Eh(vs(e));
}
function Ur(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Eh(e), s = r === ((n = e.ownerDocument) == null ? void 0 : n.body), o = nn(r), i = s ? [o].concat(o.visualViewport || [], gl(r) ? r : []) : r, a = t.concat(i);
  return s ? a : a.concat(Ur(vs(i)));
}
function Ec(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function I3(e) {
  var t = Cr(e);
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Nu(e, t) {
  return t === _h ? Ec($3(e)) : kr(t) ? I3(t) : Ec(M3(Nn(e)));
}
function T3(e) {
  var t = Ur(vs(e)), n = ["absolute", "fixed"].indexOf(yn(e).position) >= 0, r = n && zt(e) ? fo(e) : e;
  return kr(r) ? t.filter(function(s) {
    return kr(s) && yh(s, r) && ln(s) !== "body";
  }) : [];
}
function L3(e, t, n) {
  var r = t === "clippingParents" ? T3(e) : [].concat(t), s = [].concat(r, [n]), o = s[0], i = s.reduce(function(a, c) {
    var u = Nu(e, c);
    return a.top = Qn(u.top, a.top), a.right = Go(u.right, a.right), a.bottom = Go(u.bottom, a.bottom), a.left = Qn(u.left, a.left), a;
  }, Nu(e, o));
  return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
function Ah(e) {
  var t = e.reference, n = e.element, r = e.placement, s = r ? cn(r) : null, o = r ? Sr(r) : null, i = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, c;
  switch (s) {
    case xt:
      c = { x: i, y: t.y - n.height };
      break;
    case Nt:
      c = { x: i, y: t.y + t.height };
      break;
    case qt:
      c = { x: t.x + t.width, y: a };
      break;
    case Ct:
      c = { x: t.x - n.width, y: a };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var u = s ? fl(s) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (o) {
      case wr:
        c[u] = c[u] - (t[d] / 2 - n[d] / 2);
        break;
      case to:
        c[u] = c[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function no(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, s = r === void 0 ? e.placement : r, o = n.boundary, i = o === void 0 ? t3 : o, a = n.rootBoundary, c = a === void 0 ? _h : a, u = n.elementContext, d = u === void 0 ? zr : u, l = n.altBoundary, m = l === void 0 ? !1 : l, f = n.padding, v = f === void 0 ? 0 : f, g = kh(typeof v != "number" ? v : xh(v, uo)), y = d === zr ? n3 : zr, h = e.rects.popper, w = e.elements[m ? y : d], k = L3(kr(w) ? w : w.contextElement || Nn(e.elements.popper), i, c), x = Cr(e.elements.reference), A = Ah({ reference: x, element: h, placement: s }), S = Ec(Object.assign({}, h, A)), $ = d === zr ? S : x, M = { top: k.top - $.top + g.top, bottom: $.bottom - k.bottom + g.bottom, left: k.left - $.left + g.left, right: $.right - k.right + g.right }, P = e.modifiersData.offset;
  if (d === zr && P) {
    var R = P[s];
    Object.keys(M).forEach(function(B) {
      var j = [qt, Nt].indexOf(B) >= 0 ? 1 : -1, ie = [xt, Nt].indexOf(B) >= 0 ? "y" : "x";
      M[B] += R[ie] * j;
    });
  }
  return M;
}
function O3(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, s = n.boundary, o = n.rootBoundary, i = n.padding, a = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? ms : c, d = Sr(r), l = d ? a ? Pu : Pu.filter(function(v) {
    return Sr(v) === d;
  }) : uo, m = l.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  m.length === 0 && (m = l);
  var f = m.reduce(function(v, g) {
    return v[g] = no(e, { placement: g, boundary: s, rootBoundary: o, padding: i })[cn(g)], v;
  }, {});
  return Object.keys(f).sort(function(v, g) {
    return f[v] - f[g];
  });
}
function R3(e) {
  if (cn(e) === ll) return [];
  var t = Po(e);
  return [Du(e), t, Du(t)];
}
function P3(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var s = n.mainAxis, o = s === void 0 ? !0 : s, i = n.altAxis, a = i === void 0 ? !0 : i, c = n.fallbackPlacements, u = n.padding, d = n.boundary, l = n.rootBoundary, m = n.altBoundary, f = n.flipVariations, v = f === void 0 ? !0 : f, g = n.allowedAutoPlacements, y = t.options.placement, h = cn(y), w = h === y, k = c || (w || !v ? [Po(y)] : R3(y)), x = [y].concat(k).reduce(function(de, ve) {
      return de.concat(cn(ve) === ll ? O3(t, { placement: ve, boundary: d, rootBoundary: l, padding: u, flipVariations: v, allowedAutoPlacements: g }) : ve);
    }, []), A = t.rects.reference, S = t.rects.popper, $ = /* @__PURE__ */ new Map(), M = !0, P = x[0], R = 0; R < x.length; R++) {
      var B = x[R], j = cn(B), ie = Sr(B) === wr, z = [xt, Nt].indexOf(j) >= 0, Q = z ? "width" : "height", N = no(t, { placement: B, boundary: d, rootBoundary: l, altBoundary: m, padding: u }), V = z ? ie ? qt : Ct : ie ? Nt : xt;
      A[Q] > S[Q] && (V = Po(V));
      var F = Po(V), G = [];
      if (o && G.push(N[j] <= 0), a && G.push(N[V] <= 0, N[F] <= 0), G.every(function(de) {
        return de;
      })) {
        P = B, M = !1;
        break;
      }
      $.set(B, G);
    }
    if (M) for (var T = v ? 3 : 1, W = function(de) {
      var ve = x.find(function(we) {
        var Be = $.get(we);
        if (Be) return Be.slice(0, de).every(function(Oe) {
          return Oe;
        });
      });
      if (ve) return P = ve, "break";
    }, U = T; U > 0; U--) {
      var se = W(U);
      if (se === "break") break;
    }
    t.placement !== P && (t.modifiersData[r]._skip = !0, t.placement = P, t.reset = !0);
  }
}
var B3 = { name: "flip", enabled: !0, phase: "main", fn: P3, requiresIfExists: ["offset"], data: { _skip: !1 } };
function qu(e, t, n) {
  return n === void 0 && (n = { x: 0, y: 0 }), { top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x };
}
function Fu(e) {
  return [xt, qt, Nt, Ct].some(function(t) {
    return e[t] >= 0;
  });
}
function z3(e) {
  var t = e.state, n = e.name, r = t.rects.reference, s = t.rects.popper, o = t.modifiersData.preventOverflow, i = no(t, { elementContext: "reference" }), a = no(t, { altBoundary: !0 }), c = qu(i, r), u = qu(a, s, o), d = Fu(c), l = Fu(u);
  t.modifiersData[n] = { referenceClippingOffsets: c, popperEscapeOffsets: u, isReferenceHidden: d, hasPopperEscaped: l }, t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-reference-hidden": d, "data-popper-escaped": l });
}
var D3 = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: z3 };
function N3(e, t, n) {
  var r = cn(e), s = [Ct, xt].indexOf(r) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, i = o[0], a = o[1];
  return i = i || 0, a = (a || 0) * s, [Ct, qt].indexOf(r) >= 0 ? { x: a, y: i } : { x: i, y: a };
}
function q3(e) {
  var t = e.state, n = e.options, r = e.name, s = n.offset, o = s === void 0 ? [0, 0] : s, i = ms.reduce(function(d, l) {
    return d[l] = N3(l, t.rects, o), d;
  }, {}), a = i[t.placement], c = a.x, u = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = i;
}
var F3 = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: q3 };
function H3(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Ah({ reference: t.rects.reference, element: t.rects.popper, placement: t.placement });
}
var $h = { name: "popperOffsets", enabled: !0, phase: "read", fn: H3, data: {} };
function j3(e) {
  return e === "x" ? "y" : "x";
}
function V3(e) {
  var t = e.state, n = e.options, r = e.name, s = n.mainAxis, o = s === void 0 ? !0 : s, i = n.altAxis, a = i === void 0 ? !1 : i, c = n.boundary, u = n.rootBoundary, d = n.altBoundary, l = n.padding, m = n.tether, f = m === void 0 ? !0 : m, v = n.tetherOffset, g = v === void 0 ? 0 : v, y = no(t, { boundary: c, rootBoundary: u, padding: l, altBoundary: d }), h = cn(t.placement), w = Sr(t.placement), k = !w, x = fl(h), A = j3(x), S = t.modifiersData.popperOffsets, $ = t.rects.reference, M = t.rects.popper, P = typeof g == "function" ? g(Object.assign({}, t.rects, { placement: t.placement })) : g, R = typeof P == "number" ? { mainAxis: P, altAxis: P } : Object.assign({ mainAxis: 0, altAxis: 0 }, P), B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, j = { x: 0, y: 0 };
  if (S) {
    if (o) {
      var ie, z = x === "y" ? xt : Ct, Q = x === "y" ? Nt : qt, N = x === "y" ? "height" : "width", V = S[x], F = V + y[z], G = V - y[Q], T = f ? -M[N] / 2 : 0, W = w === wr ? $[N] : M[N], U = w === wr ? -M[N] : -$[N], se = t.elements.arrow, de = f && se ? dl(se) : { width: 0, height: 0 }, ve = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : wh(), we = ve[z], Be = ve[Q], Oe = Vr(0, $[N], de[N]), Ke = k ? $[N] / 2 - T - Oe - we - R.mainAxis : W - Oe - we - R.mainAxis, re = k ? -$[N] / 2 + T + Oe + Be + R.mainAxis : U + Oe + Be + R.mainAxis, pe = t.elements.arrow && fo(t.elements.arrow), Se = pe ? x === "y" ? pe.clientTop || 0 : pe.clientLeft || 0 : 0, ze = (ie = B == null ? void 0 : B[x]) != null ? ie : 0, Ge = V + Ke - ze - Se, Je = V + re - ze, st = Vr(f ? Go(F, Ge) : F, V, f ? Qn(G, Je) : G);
      S[x] = st, j[x] = st - V;
    }
    if (a) {
      var rn, Et = x === "x" ? xt : Ct, Vt = x === "x" ? Nt : qt, ut = S[A], Ot = A === "y" ? "height" : "width", At = ut + y[Et], Ut = ut - y[Vt], nt = [xt, Ct].indexOf(h) !== -1, K = (rn = B == null ? void 0 : B[A]) != null ? rn : 0, ge = nt ? At : ut - $[Ot] - M[Ot] - K + R.altAxis, De = nt ? ut + $[Ot] + M[Ot] - K - R.altAxis : Ut, Xe = f && nt ? v3(ge, ut, De) : Vr(f ? ge : At, ut, f ? De : Ut);
      S[A] = Xe, j[A] = Xe - ut;
    }
    t.modifiersData[r] = j;
  }
}
var U3 = { name: "preventOverflow", enabled: !0, phase: "main", fn: V3, requiresIfExists: ["offset"] };
function Z3(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function W3(e) {
  return e === nn(e) || !zt(e) ? pl(e) : Z3(e);
}
function G3(e) {
  var t = e.getBoundingClientRect(), n = xr(t.width) / e.offsetWidth || 1, r = xr(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function K3(e, t, n) {
  n === void 0 && (n = !1);
  var r = zt(t), s = zt(t) && G3(t), o = Nn(t), i = Cr(e, s), a = { scrollLeft: 0, scrollTop: 0 }, c = { x: 0, y: 0 };
  return (r || !r && !n) && ((ln(t) !== "body" || gl(o)) && (a = W3(t)), zt(t) ? (c = Cr(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : o && (c.x = hl(o))), { x: i.left + a.scrollLeft - c.x, y: i.top + a.scrollTop - c.y, width: i.width, height: i.height };
}
function X3(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(o) {
    t.set(o.name, o);
  });
  function s(o) {
    n.add(o.name);
    var i = [].concat(o.requires || [], o.requiresIfExists || []);
    i.forEach(function(a) {
      if (!n.has(a)) {
        var c = t.get(a);
        c && s(c);
      }
    }), r.push(o);
  }
  return e.forEach(function(o) {
    n.has(o.name) || s(o);
  }), r;
}
function Y3(e) {
  var t = X3(e);
  return f3.reduce(function(n, r) {
    return n.concat(t.filter(function(s) {
      return s.phase === r;
    }));
  }, []);
}
function J3(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Q3(e) {
  var t = e.reduce(function(n, r) {
    var s = n[r.name];
    return n[r.name] = s ? Object.assign({}, s, r, { options: Object.assign({}, s.options, r.options), data: Object.assign({}, s.data, r.data) }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var Hu = { placement: "bottom", modifiers: [], strategy: "absolute" };
function ju() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function ml(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, s = t.defaultOptions, o = s === void 0 ? Hu : s;
  return function(i, a, c) {
    c === void 0 && (c = o);
    var u = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Hu, o), modifiersData: {}, elements: { reference: i, popper: a }, attributes: {}, styles: {} }, d = [], l = !1, m = { state: u, setOptions: function(g) {
      var y = typeof g == "function" ? g(u.options) : g;
      v(), u.options = Object.assign({}, o, u.options, y), u.scrollParents = { reference: kr(i) ? Ur(i) : i.contextElement ? Ur(i.contextElement) : [], popper: Ur(a) };
      var h = Y3(Q3([].concat(r, u.options.modifiers)));
      return u.orderedModifiers = h.filter(function(w) {
        return w.enabled;
      }), f(), m.update();
    }, forceUpdate: function() {
      if (!l) {
        var g = u.elements, y = g.reference, h = g.popper;
        if (ju(y, h)) {
          u.rects = { reference: K3(y, fo(h), u.options.strategy === "fixed"), popper: dl(h) }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(M) {
            return u.modifiersData[M.name] = Object.assign({}, M.data);
          });
          for (var w = 0; w < u.orderedModifiers.length; w++) {
            if (u.reset === !0) {
              u.reset = !1, w = -1;
              continue;
            }
            var k = u.orderedModifiers[w], x = k.fn, A = k.options, S = A === void 0 ? {} : A, $ = k.name;
            typeof x == "function" && (u = x({ state: u, options: S, name: $, instance: m }) || u);
          }
        }
      }
    }, update: J3(function() {
      return new Promise(function(g) {
        m.forceUpdate(), g(u);
      });
    }), destroy: function() {
      v(), l = !0;
    } };
    if (!ju(i, a)) return m;
    m.setOptions(c).then(function(g) {
      !l && c.onFirstUpdate && c.onFirstUpdate(g);
    });
    function f() {
      u.orderedModifiers.forEach(function(g) {
        var y = g.name, h = g.options, w = h === void 0 ? {} : h, k = g.effect;
        if (typeof k == "function") {
          var x = k({ state: u, name: y, instance: m, options: w }), A = function() {
          };
          d.push(x || A);
        }
      });
    }
    function v() {
      d.forEach(function(g) {
        return g();
      }), d = [];
    }
    return m;
  };
}
ml();
var e5 = [Sh, $h, Ch, bh];
ml({ defaultModifiers: e5 });
var t5 = [Sh, $h, Ch, bh, F3, B3, U3, w3, D3], n5 = ml({ defaultModifiers: t5 });
const r5 = (e, t, n = {}) => {
  const r = {
    name: "updateState",
    enabled: !0,
    phase: "write",
    fn: ({ state: c }) => {
      const u = o5(c);
      Object.assign(i.value, u);
    },
    requires: ["computeStyles"]
  }, s = I(() => {
    const { onFirstUpdate: c, placement: u, strategy: d, modifiers: l } = _(n);
    return {
      onFirstUpdate: c,
      placement: u || "bottom",
      strategy: d || "absolute",
      modifiers: [
        ...l || [],
        r,
        { name: "applyStyles", enabled: !1 }
      ]
    };
  }), o = mn(), i = D({
    styles: {
      popper: {
        position: _(s).strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), a = () => {
    o.value && (o.value.destroy(), o.value = void 0);
  };
  return ue(s, (c) => {
    const u = _(o);
    u && u.setOptions(c);
  }, {
    deep: !0
  }), ue([e, t], ([c, u]) => {
    a(), !(!c || !u) && (o.value = n5(c, u, _(s)));
  }), Ft(() => {
    a();
  }), {
    state: I(() => {
      var c;
      return { ...((c = _(o)) == null ? void 0 : c.state) || {} };
    }),
    styles: I(() => _(i).styles),
    attributes: I(() => _(i).attributes),
    update: () => {
      var c;
      return (c = _(o)) == null ? void 0 : c.update();
    },
    forceUpdate: () => {
      var c;
      return (c = _(o)) == null ? void 0 : c.forceUpdate();
    },
    instanceRef: I(() => _(o))
  };
};
function o5(e) {
  const t = Object.keys(e.elements), n = Wo(t.map((s) => [s, e.styles[s] || {}])), r = Wo(t.map((s) => [s, e.attributes[s]]));
  return {
    styles: n,
    attributes: r
  };
}
const s5 = (e, t = 0) => {
  if (t === 0)
    return e;
  const n = D(!1);
  let r = 0;
  const s = () => {
    r && clearTimeout(r), r = window.setTimeout(() => {
      n.value = e.value;
    }, t);
  };
  return je(s), ue(() => e.value, (o) => {
    o ? s() : n.value = o;
  }), n;
};
function Vu() {
  let e;
  const t = (r, s) => {
    n(), e = window.setTimeout(r, s);
  }, n = () => window.clearTimeout(e);
  return Jc(() => n()), {
    registerTimeout: t,
    cancelTimeout: n
  };
}
const Uu = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, i5 = Symbol("elIdInjection"), Mh = () => lt() ? Le(i5, Uu) : Uu, _s = (e) => {
  const t = Mh(), n = cl();
  return I(() => _(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
};
let dr = [];
const Zu = (e) => {
  const t = e;
  t.key === _n.esc && dr.forEach((n) => n(t));
}, a5 = (e) => {
  je(() => {
    dr.length === 0 && document.addEventListener("keydown", Zu), gt && dr.push(e);
  }), Ft(() => {
    dr = dr.filter((t) => t !== e), dr.length === 0 && gt && document.removeEventListener("keydown", Zu);
  });
};
let Wu;
const Ih = () => {
  const e = cl(), t = Mh(), n = I(() => `${e.value}-popper-container-${t.prefix}`), r = I(() => `#${n.value}`);
  return {
    id: n,
    selector: r
  };
}, c5 = (e) => {
  const t = document.createElement("div");
  return t.id = e, document.body.appendChild(t), t;
}, l5 = () => {
  const { id: e, selector: t } = Ih();
  return wv(() => {
    gt && !Wu && !document.body.querySelector(t.value) && (Wu = c5(e.value));
  }), {
    id: e,
    selector: t
  };
}, u5 = Re({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  }
}), d5 = ({
  showAfter: e,
  hideAfter: t,
  autoClose: n,
  open: r,
  close: s
}) => {
  const { registerTimeout: o } = Vu(), {
    registerTimeout: i,
    cancelTimeout: a
  } = Vu();
  return {
    onOpen: (d) => {
      o(() => {
        r(d);
        const l = _(n);
        Ye(l) && l > 0 && i(() => {
          s(d);
        }, l);
      }, _(e));
    },
    onClose: (d) => {
      a(), o(() => {
        s(d);
      }, _(t));
    }
  };
}, Th = Symbol("elForwardRef"), f5 = (e) => {
  St(Th, {
    setForwardRef: (n) => {
      e.value = n;
    }
  });
}, p5 = (e) => ({
  mounted(t) {
    e(t);
  },
  updated(t) {
    e(t);
  },
  unmounted() {
    e(null);
  }
}), Gu = D(0), h5 = 2e3, g5 = Symbol("zIndexContextKey"), m5 = (e) => {
  const t = lt() ? Le(g5, void 0) : void 0, n = I(() => {
    const o = _(t);
    return Ye(o) ? o : h5;
  }), r = I(() => n.value + Gu.value);
  return {
    initialZIndex: n,
    currentZIndex: r,
    nextZIndex: () => (Gu.value++, r.value)
  };
};
function v5(e) {
  const t = D();
  function n() {
    if (e.value == null)
      return;
    const { selectionStart: s, selectionEnd: o, value: i } = e.value;
    if (s == null || o == null)
      return;
    const a = i.slice(0, Math.max(0, s)), c = i.slice(Math.max(0, o));
    t.value = {
      selectionStart: s,
      selectionEnd: o,
      value: i,
      beforeTxt: a,
      afterTxt: c
    };
  }
  function r() {
    if (e.value == null || t.value == null)
      return;
    const { value: s } = e.value, { beforeTxt: o, afterTxt: i, selectionStart: a } = t.value;
    if (o == null || i == null || a == null)
      return;
    let c = s.length;
    if (s.endsWith(i))
      c = s.length - i.length;
    else if (s.startsWith(o))
      c = o.length;
    else {
      const u = o[a - 1], d = s.indexOf(u, a - 1);
      d !== -1 && (c = d + 1);
    }
    e.value.setSelectionRange(c, c);
  }
  return [n, r];
}
const vl = hs({
  type: String,
  values: lo,
  required: !1
}), _5 = Symbol("size"), b5 = () => {
  const e = Le(_5, {});
  return I(() => _(e.size) || "");
};
function Lh(e, { afterFocus: t, beforeBlur: n, afterBlur: r } = {}) {
  const s = lt(), { emit: o } = s, i = mn(), a = D(!1), c = (l) => {
    a.value || (a.value = !0, o("focus", l), t == null || t());
  }, u = (l) => {
    var m;
    Pt(n) && n(l) || l.relatedTarget && ((m = i.value) != null && m.contains(l.relatedTarget)) || (a.value = !1, o("blur", l), r == null || r());
  }, d = () => {
    var l;
    (l = e.value) == null || l.focus();
  };
  return ue(i, (l) => {
    l && l.setAttribute("tabindex", "-1");
  }), Yn(i, "click", d), {
    wrapperRef: i,
    isFocused: a,
    handleFocus: c,
    handleBlur: u
  };
}
const y5 = Symbol(), Ku = D();
function w5(e, t = void 0) {
  const n = lt() ? Le(y5, Ku) : Ku;
  return I(() => {
    var r, s;
    return (s = (r = n.value) == null ? void 0 : r[e]) != null ? s : t;
  });
}
var Ce = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
};
const k5 = Re({
  size: {
    type: be([Number, String])
  },
  color: {
    type: String
  }
}), x5 = Z({
  name: "ElIcon",
  inheritAttrs: !1
}), C5 = /* @__PURE__ */ Z({
  ...x5,
  props: k5,
  setup(e) {
    const t = e, n = Te("icon"), r = I(() => {
      const { size: s, color: o } = t;
      return !s && !o ? {} : {
        fontSize: uh(s) ? void 0 : yr(s),
        "--color": o
      };
    });
    return (s, o) => (b(), C("i", We({
      class: _(n).b(),
      style: _(r)
    }, s.$attrs), [
      ae(s.$slots, "default")
    ], 16));
  }
});
var S5 = /* @__PURE__ */ Ce(C5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const kt = jt(S5), _l = Symbol("formContextKey"), Ko = Symbol("formItemContextKey"), po = (e, t = {}) => {
  const n = D(void 0), r = t.prop ? n : vh("size"), s = t.global ? n : b5(), o = t.form ? { size: void 0 } : Le(_l, void 0), i = t.formItem ? { size: void 0 } : Le(Ko, void 0);
  return I(() => r.value || _(e) || (i == null ? void 0 : i.size) || (o == null ? void 0 : o.size) || s.value || "");
}, bs = (e) => {
  const t = vh("disabled"), n = Le(_l, void 0);
  return I(() => t.value || _(e) || (n == null ? void 0 : n.disabled) || !1);
}, ys = () => {
  const e = Le(_l, void 0), t = Le(Ko, void 0);
  return {
    form: e,
    formItem: t
  };
}, Oh = (e, {
  formItemContext: t,
  disableIdGeneration: n,
  disableIdManagement: r
}) => {
  n || (n = D(!1)), r || (r = D(!1));
  const s = D();
  let o;
  const i = I(() => {
    var a;
    return !!(!e.label && t && t.inputIds && ((a = t.inputIds) == null ? void 0 : a.length) <= 1);
  });
  return je(() => {
    o = ue([Bt(e, "id"), n], ([a, c]) => {
      const u = a ?? (c ? void 0 : _s().value);
      u !== s.value && (t != null && t.removeInputId && (s.value && t.removeInputId(s.value), !(r != null && r.value) && !c && u && t.addInputId(u)), s.value = u);
    }, { immediate: !0 });
  }), $p(() => {
    o && o(), t != null && t.removeInputId && s.value && t.removeInputId(s.value);
  }), {
    isLabeledByFormItem: i,
    inputId: s
  };
};
let Gt;
const E5 = `
  height:0 !important;
  visibility:hidden !important;
  ${Pb() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`, A5 = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function $5(e) {
  const t = window.getComputedStyle(e), n = t.getPropertyValue("box-sizing"), r = Number.parseFloat(t.getPropertyValue("padding-bottom")) + Number.parseFloat(t.getPropertyValue("padding-top")), s = Number.parseFloat(t.getPropertyValue("border-bottom-width")) + Number.parseFloat(t.getPropertyValue("border-top-width"));
  return { contextStyle: A5.map((i) => `${i}:${t.getPropertyValue(i)}`).join(";"), paddingSize: r, borderSize: s, boxSizing: n };
}
function Xu(e, t = 1, n) {
  var r;
  Gt || (Gt = document.createElement("textarea"), document.body.appendChild(Gt));
  const { paddingSize: s, borderSize: o, boxSizing: i, contextStyle: a } = $5(e);
  Gt.setAttribute("style", `${a};${E5}`), Gt.value = e.value || e.placeholder || "";
  let c = Gt.scrollHeight;
  const u = {};
  i === "border-box" ? c = c + o : i === "content-box" && (c = c - s), Gt.value = "";
  const d = Gt.scrollHeight - s;
  if (Ye(t)) {
    let l = d * t;
    i === "border-box" && (l = l + s + o), c = Math.max(l, c), u.minHeight = `${l}px`;
  }
  if (Ye(n)) {
    let l = d * n;
    i === "border-box" && (l = l + s + o), c = Math.min(l, c);
  }
  return u.height = `${c}px`, (r = Gt.parentNode) == null || r.removeChild(Gt), Gt = void 0, u;
}
const M5 = Re({
  id: {
    type: String,
    default: void 0
  },
  size: vl,
  disabled: Boolean,
  modelValue: {
    type: be([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: be([Boolean, Object]),
    default: !1
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: !1
  },
  clearable: {
    type: Boolean,
    default: !1
  },
  showPassword: {
    type: Boolean,
    default: !1
  },
  showWordLimit: {
    type: Boolean,
    default: !1
  },
  suffixIcon: {
    type: en
  },
  prefixIcon: {
    type: en
  },
  containerRole: {
    type: String,
    default: void 0
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: !0
  },
  inputStyle: {
    type: be([Object, Array, String]),
    default: () => al({})
  },
  autofocus: {
    type: Boolean,
    default: !1
  }
}), I5 = {
  [wt]: (e) => Yt(e),
  input: (e) => Yt(e),
  change: (e) => Yt(e),
  focus: (e) => e instanceof FocusEvent,
  blur: (e) => e instanceof FocusEvent,
  clear: () => !0,
  mouseleave: (e) => e instanceof MouseEvent,
  mouseenter: (e) => e instanceof MouseEvent,
  keydown: (e) => e instanceof Event,
  compositionstart: (e) => e instanceof CompositionEvent,
  compositionupdate: (e) => e instanceof CompositionEvent,
  compositionend: (e) => e instanceof CompositionEvent
}, T5 = ["role"], L5 = ["id", "type", "disabled", "formatter", "parser", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus"], O5 = ["id", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus"], R5 = Z({
  name: "ElInput",
  inheritAttrs: !1
}), P5 = /* @__PURE__ */ Z({
  ...R5,
  props: M5,
  emits: I5,
  setup(e, { expose: t, emit: n }) {
    const r = e, s = ao(), o = Ip(), i = I(() => {
      const K = {};
      return r.containerRole === "combobox" && (K["aria-haspopup"] = s["aria-haspopup"], K["aria-owns"] = s["aria-owns"], K["aria-expanded"] = s["aria-expanded"]), K;
    }), a = I(() => [
      r.type === "textarea" ? y.b() : g.b(),
      g.m(f.value),
      g.is("disabled", v.value),
      g.is("exceed", de.value),
      {
        [g.b("group")]: o.prepend || o.append,
        [g.bm("group", "append")]: o.append,
        [g.bm("group", "prepend")]: o.prepend,
        [g.m("prefix")]: o.prefix || r.prefixIcon,
        [g.m("suffix")]: o.suffix || r.suffixIcon || r.clearable || r.showPassword,
        [g.bm("suffix", "password-clear")]: T.value && W.value
      },
      s.class
    ]), c = I(() => [
      g.e("wrapper"),
      g.is("focus", R.value)
    ]), u = V4({
      excludeKeys: I(() => Object.keys(i.value))
    }), { form: d, formItem: l } = ys(), { inputId: m } = Oh(r, {
      formItemContext: l
    }), f = po(), v = bs(), g = Te("input"), y = Te("textarea"), h = mn(), w = mn(), k = D(!1), x = D(!1), A = D(!1), S = D(), $ = mn(r.inputStyle), M = I(() => h.value || w.value), { wrapperRef: P, isFocused: R, handleFocus: B, handleBlur: j } = Lh(M, {
      afterBlur() {
        var K;
        r.validateEvent && ((K = l == null ? void 0 : l.validate) == null || K.call(l, "blur").catch((ge) => void 0));
      }
    }), ie = I(() => {
      var K;
      return (K = d == null ? void 0 : d.statusIcon) != null ? K : !1;
    }), z = I(() => (l == null ? void 0 : l.validateState) || ""), Q = I(() => z.value && hh[z.value]), N = I(() => A.value ? B4 : I4), V = I(() => [
      s.style,
      r.inputStyle
    ]), F = I(() => [
      r.inputStyle,
      $.value,
      { resize: r.resize }
    ]), G = I(() => Jn(r.modelValue) ? "" : String(r.modelValue)), T = I(() => r.clearable && !v.value && !r.readonly && !!G.value && (R.value || k.value)), W = I(() => r.showPassword && !v.value && !r.readonly && !!G.value && (!!G.value || R.value)), U = I(() => r.showWordLimit && !!u.value.maxlength && (r.type === "text" || r.type === "textarea") && !v.value && !r.readonly && !r.showPassword), se = I(() => G.value.length), de = I(() => !!U.value && se.value > Number(u.value.maxlength)), ve = I(() => !!o.suffix || !!r.suffixIcon || T.value || r.showPassword || U.value || !!z.value && ie.value), [we, Be] = v5(h);
    cs(w, (K) => {
      if (re(), !U.value || r.resize !== "both")
        return;
      const ge = K[0], { width: De } = ge.contentRect;
      S.value = {
        right: `calc(100% - ${De + 15 + 6}px)`
      };
    });
    const Oe = () => {
      const { type: K, autosize: ge } = r;
      if (!(!gt || K !== "textarea" || !w.value))
        if (ge) {
          const De = Jt(ge) ? ge.minRows : void 0, Xe = Jt(ge) ? ge.maxRows : void 0, Zt = Xu(w.value, De, Xe);
          $.value = {
            overflowY: "hidden",
            ...Zt
          }, Me(() => {
            w.value.offsetHeight, $.value = Zt;
          });
        } else
          $.value = {
            minHeight: Xu(w.value).minHeight
          };
    }, re = ((K) => {
      let ge = !1;
      return () => {
        var De;
        if (ge || !r.autosize)
          return;
        ((De = w.value) == null ? void 0 : De.offsetParent) === null || (K(), ge = !0);
      };
    })(Oe), pe = () => {
      const K = M.value, ge = r.formatter ? r.formatter(G.value) : G.value;
      !K || K.value === ge || (K.value = ge);
    }, Se = async (K) => {
      we();
      let { value: ge } = K.target;
      if (r.formatter && (ge = r.parser ? r.parser(ge) : ge), !x.value) {
        if (ge === G.value) {
          pe();
          return;
        }
        n(wt, ge), n("input", ge), await Me(), pe(), Be();
      }
    }, ze = (K) => {
      n("change", K.target.value);
    }, Ge = (K) => {
      n("compositionstart", K), x.value = !0;
    }, Je = (K) => {
      var ge;
      n("compositionupdate", K);
      const De = (ge = K.target) == null ? void 0 : ge.value, Xe = De[De.length - 1] || "";
      x.value = !gh(Xe);
    }, st = (K) => {
      n("compositionend", K), x.value && (x.value = !1, Se(K));
    }, rn = () => {
      A.value = !A.value, Et();
    }, Et = async () => {
      var K;
      await Me(), (K = M.value) == null || K.focus();
    }, Vt = () => {
      var K;
      return (K = M.value) == null ? void 0 : K.blur();
    }, ut = (K) => {
      k.value = !1, n("mouseleave", K);
    }, Ot = (K) => {
      k.value = !0, n("mouseenter", K);
    }, At = (K) => {
      n("keydown", K);
    }, Ut = () => {
      var K;
      (K = M.value) == null || K.select();
    }, nt = () => {
      n(wt, ""), n("change", ""), n("clear"), n("input", "");
    };
    return ue(() => r.modelValue, () => {
      var K;
      Me(() => Oe()), r.validateEvent && ((K = l == null ? void 0 : l.validate) == null || K.call(l, "change").catch((ge) => void 0));
    }), ue(G, () => pe()), ue(() => r.type, async () => {
      await Me(), pe(), Oe();
    }), je(() => {
      !r.formatter && r.parser, pe(), Me(Oe);
    }), t({
      input: h,
      textarea: w,
      ref: M,
      textareaStyle: F,
      autosize: Bt(r, "autosize"),
      focus: Et,
      blur: Vt,
      select: Ut,
      clear: nt,
      resizeTextarea: Oe
    }), (K, ge) => rt((b(), C("div", We(_(i), {
      class: _(a),
      style: _(V),
      role: K.containerRole,
      onMouseenter: Ot,
      onMouseleave: ut
    }), [
      te(" input "),
      K.type !== "textarea" ? (b(), C(He, { key: 0 }, [
        te(" prepend slot "),
        K.$slots.prepend ? (b(), C("div", {
          key: 0,
          class: H(_(g).be("group", "prepend"))
        }, [
          ae(K.$slots, "prepend")
        ], 2)) : te("v-if", !0),
        p("div", {
          ref_key: "wrapperRef",
          ref: P,
          class: H(_(c))
        }, [
          te(" prefix slot "),
          K.$slots.prefix || K.prefixIcon ? (b(), C("span", {
            key: 0,
            class: H(_(g).e("prefix"))
          }, [
            p("span", {
              class: H(_(g).e("prefix-inner"))
            }, [
              ae(K.$slots, "prefix"),
              K.prefixIcon ? (b(), Y(_(kt), {
                key: 0,
                class: H(_(g).e("icon"))
              }, {
                default: J(() => [
                  (b(), Y(ht(K.prefixIcon)))
                ]),
                _: 1
              }, 8, ["class"])) : te("v-if", !0)
            ], 2)
          ], 2)) : te("v-if", !0),
          p("input", We({
            id: _(m),
            ref_key: "input",
            ref: h,
            class: _(g).e("inner")
          }, _(u), {
            type: K.showPassword ? A.value ? "text" : "password" : K.type,
            disabled: _(v),
            formatter: K.formatter,
            parser: K.parser,
            readonly: K.readonly,
            autocomplete: K.autocomplete,
            tabindex: K.tabindex,
            "aria-label": K.label,
            placeholder: K.placeholder,
            style: K.inputStyle,
            form: r.form,
            autofocus: r.autofocus,
            onCompositionstart: Ge,
            onCompositionupdate: Je,
            onCompositionend: st,
            onInput: Se,
            onFocus: ge[0] || (ge[0] = (...De) => _(B) && _(B)(...De)),
            onBlur: ge[1] || (ge[1] = (...De) => _(j) && _(j)(...De)),
            onChange: ze,
            onKeydown: At
          }), null, 16, L5),
          te(" suffix slot "),
          _(ve) ? (b(), C("span", {
            key: 1,
            class: H(_(g).e("suffix"))
          }, [
            p("span", {
              class: H(_(g).e("suffix-inner"))
            }, [
              !_(T) || !_(W) || !_(U) ? (b(), C(He, { key: 0 }, [
                ae(K.$slots, "suffix"),
                K.suffixIcon ? (b(), Y(_(kt), {
                  key: 0,
                  class: H(_(g).e("icon"))
                }, {
                  default: J(() => [
                    (b(), Y(ht(K.suffixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : te("v-if", !0)
              ], 64)) : te("v-if", !0),
              _(T) ? (b(), Y(_(kt), {
                key: 1,
                class: H([_(g).e("icon"), _(g).e("clear")]),
                onMousedown: tt(_(Yr), ["prevent"]),
                onClick: nt
              }, {
                default: J(() => [
                  he(_(sl))
                ]),
                _: 1
              }, 8, ["class", "onMousedown"])) : te("v-if", !0),
              _(W) ? (b(), Y(_(kt), {
                key: 2,
                class: H([_(g).e("icon"), _(g).e("password")]),
                onClick: rn
              }, {
                default: J(() => [
                  (b(), Y(ht(_(N))))
                ]),
                _: 1
              }, 8, ["class"])) : te("v-if", !0),
              _(U) ? (b(), C("span", {
                key: 3,
                class: H(_(g).e("count"))
              }, [
                p("span", {
                  class: H(_(g).e("count-inner"))
                }, ke(_(se)) + " / " + ke(_(u).maxlength), 3)
              ], 2)) : te("v-if", !0),
              _(z) && _(Q) && _(ie) ? (b(), Y(_(kt), {
                key: 4,
                class: H([
                  _(g).e("icon"),
                  _(g).e("validateIcon"),
                  _(g).is("loading", _(z) === "validating")
                ])
              }, {
                default: J(() => [
                  (b(), Y(ht(_(Q))))
                ]),
                _: 1
              }, 8, ["class"])) : te("v-if", !0)
            ], 2)
          ], 2)) : te("v-if", !0)
        ], 2),
        te(" append slot "),
        K.$slots.append ? (b(), C("div", {
          key: 1,
          class: H(_(g).be("group", "append"))
        }, [
          ae(K.$slots, "append")
        ], 2)) : te("v-if", !0)
      ], 64)) : (b(), C(He, { key: 1 }, [
        te(" textarea "),
        p("textarea", We({
          id: _(m),
          ref_key: "textarea",
          ref: w,
          class: _(y).e("inner")
        }, _(u), {
          tabindex: K.tabindex,
          disabled: _(v),
          readonly: K.readonly,
          autocomplete: K.autocomplete,
          style: _(F),
          "aria-label": K.label,
          placeholder: K.placeholder,
          form: r.form,
          autofocus: r.autofocus,
          onCompositionstart: Ge,
          onCompositionupdate: Je,
          onCompositionend: st,
          onInput: Se,
          onFocus: ge[2] || (ge[2] = (...De) => _(B) && _(B)(...De)),
          onBlur: ge[3] || (ge[3] = (...De) => _(j) && _(j)(...De)),
          onChange: ze,
          onKeydown: At
        }), null, 16, O5),
        _(U) ? (b(), C("span", {
          key: 0,
          style: Ue(S.value),
          class: H(_(g).e("count"))
        }, ke(_(se)) + " / " + ke(_(u).maxlength), 7)) : te("v-if", !0)
      ], 64))
    ], 16, T5)), [
      [Qt, K.type !== "hidden"]
    ]);
  }
});
var B5 = /* @__PURE__ */ Ce(P5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
const ws = jt(B5), hr = 4, z5 = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
}, D5 = ({
  move: e,
  size: t,
  bar: n
}) => ({
  [n.size]: t,
  transform: `translate${n.axis}(${e}%)`
}), Rh = Symbol("scrollbarContextKey"), N5 = Re({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: !0
  },
  always: Boolean
}), q5 = "Thumb", F5 = /* @__PURE__ */ Z({
  __name: "thumb",
  props: N5,
  setup(e) {
    const t = e, n = Le(Rh), r = Te("scrollbar");
    n || h4(q5, "can not inject scrollbar context");
    const s = D(), o = D(), i = D({}), a = D(!1);
    let c = !1, u = !1, d = gt ? document.onselectstart : null;
    const l = I(() => z5[t.vertical ? "vertical" : "horizontal"]), m = I(() => D5({
      size: t.size,
      move: t.move,
      bar: l.value
    })), f = I(() => s.value[l.value.offset] ** 2 / n.wrapElement[l.value.scrollSize] / t.ratio / o.value[l.value.offset]), v = (S) => {
      var $;
      if (S.stopPropagation(), S.ctrlKey || [1, 2].includes(S.button))
        return;
      ($ = window.getSelection()) == null || $.removeAllRanges(), y(S);
      const M = S.currentTarget;
      M && (i.value[l.value.axis] = M[l.value.offset] - (S[l.value.client] - M.getBoundingClientRect()[l.value.direction]));
    }, g = (S) => {
      if (!o.value || !s.value || !n.wrapElement)
        return;
      const $ = Math.abs(S.target.getBoundingClientRect()[l.value.direction] - S[l.value.client]), M = o.value[l.value.offset] / 2, P = ($ - M) * 100 * f.value / s.value[l.value.offset];
      n.wrapElement[l.value.scroll] = P * n.wrapElement[l.value.scrollSize] / 100;
    }, y = (S) => {
      S.stopImmediatePropagation(), c = !0, document.addEventListener("mousemove", h), document.addEventListener("mouseup", w), d = document.onselectstart, document.onselectstart = () => !1;
    }, h = (S) => {
      if (!s.value || !o.value || c === !1)
        return;
      const $ = i.value[l.value.axis];
      if (!$)
        return;
      const M = (s.value.getBoundingClientRect()[l.value.direction] - S[l.value.client]) * -1, P = o.value[l.value.offset] - $, R = (M - P) * 100 * f.value / s.value[l.value.offset];
      n.wrapElement[l.value.scroll] = R * n.wrapElement[l.value.scrollSize] / 100;
    }, w = () => {
      c = !1, i.value[l.value.axis] = 0, document.removeEventListener("mousemove", h), document.removeEventListener("mouseup", w), A(), u && (a.value = !1);
    }, k = () => {
      u = !1, a.value = !!t.size;
    }, x = () => {
      u = !0, a.value = c;
    };
    Ft(() => {
      A(), document.removeEventListener("mouseup", w);
    });
    const A = () => {
      document.onselectstart !== d && (document.onselectstart = d);
    };
    return Yn(Bt(n, "scrollbarElement"), "mousemove", k), Yn(Bt(n, "scrollbarElement"), "mouseleave", x), (S, $) => (b(), Y(er, {
      name: _(r).b("fade"),
      persisted: ""
    }, {
      default: J(() => [
        rt(p("div", {
          ref_key: "instance",
          ref: s,
          class: H([_(r).e("bar"), _(r).is(_(l).key)]),
          onMousedown: g
        }, [
          p("div", {
            ref_key: "thumb",
            ref: o,
            class: H(_(r).e("thumb")),
            style: Ue(_(m)),
            onMousedown: v
          }, null, 38)
        ], 34), [
          [Qt, S.always || a.value]
        ])
      ]),
      _: 1
    }, 8, ["name"]));
  }
});
var Yu = /* @__PURE__ */ Ce(F5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
const H5 = Re({
  always: {
    type: Boolean,
    default: !0
  },
  width: String,
  height: String,
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  }
}), j5 = /* @__PURE__ */ Z({
  __name: "bar",
  props: H5,
  setup(e, { expose: t }) {
    const n = e, r = D(0), s = D(0);
    return t({
      handleScroll: (i) => {
        if (i) {
          const a = i.offsetHeight - hr, c = i.offsetWidth - hr;
          s.value = i.scrollTop * 100 / a * n.ratioY, r.value = i.scrollLeft * 100 / c * n.ratioX;
        }
      }
    }), (i, a) => (b(), C(He, null, [
      he(Yu, {
        move: r.value,
        ratio: i.ratioX,
        size: i.width,
        always: i.always
      }, null, 8, ["move", "ratio", "size", "always"]),
      he(Yu, {
        move: s.value,
        ratio: i.ratioY,
        size: i.height,
        vertical: "",
        always: i.always
      }, null, 8, ["move", "ratio", "size", "always"])
    ], 64));
  }
});
var V5 = /* @__PURE__ */ Ce(j5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
const U5 = Re({
  height: {
    type: [String, Number],
    default: ""
  },
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  native: {
    type: Boolean,
    default: !1
  },
  wrapStyle: {
    type: be([String, Object, Array]),
    default: ""
  },
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  viewClass: {
    type: [String, Array],
    default: ""
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  noresize: Boolean,
  tag: {
    type: String,
    default: "div"
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20
  },
  id: String,
  role: String,
  ariaLabel: String,
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical"]
  }
}), Z5 = {
  scroll: ({
    scrollTop: e,
    scrollLeft: t
  }) => [e, t].every(Ye)
}, W5 = "ElScrollbar", G5 = Z({
  name: W5
}), K5 = /* @__PURE__ */ Z({
  ...G5,
  props: U5,
  emits: Z5,
  setup(e, { expose: t, emit: n }) {
    const r = e, s = Te("scrollbar");
    let o, i;
    const a = D(), c = D(), u = D(), d = D("0"), l = D("0"), m = D(), f = D(1), v = D(1), g = I(() => {
      const $ = {};
      return r.height && ($.height = yr(r.height)), r.maxHeight && ($.maxHeight = yr(r.maxHeight)), [r.wrapStyle, $];
    }), y = I(() => [
      r.wrapClass,
      s.e("wrap"),
      { [s.em("wrap", "hidden-default")]: !r.native }
    ]), h = I(() => [s.e("view"), r.viewClass]), w = () => {
      var $;
      c.value && (($ = m.value) == null || $.handleScroll(c.value), n("scroll", {
        scrollTop: c.value.scrollTop,
        scrollLeft: c.value.scrollLeft
      }));
    };
    function k($, M) {
      Jt($) ? c.value.scrollTo($) : Ye($) && Ye(M) && c.value.scrollTo($, M);
    }
    const x = ($) => {
      Ye($) && (c.value.scrollTop = $);
    }, A = ($) => {
      Ye($) && (c.value.scrollLeft = $);
    }, S = () => {
      if (!c.value)
        return;
      const $ = c.value.offsetHeight - hr, M = c.value.offsetWidth - hr, P = $ ** 2 / c.value.scrollHeight, R = M ** 2 / c.value.scrollWidth, B = Math.max(P, r.minSize), j = Math.max(R, r.minSize);
      f.value = P / ($ - P) / (B / ($ - B)), v.value = R / (M - R) / (j / (M - j)), l.value = B + hr < $ ? `${B}px` : "", d.value = j + hr < M ? `${j}px` : "";
    };
    return ue(() => r.noresize, ($) => {
      $ ? (o == null || o(), i == null || i()) : ({ stop: o } = cs(u, S), i = Yn("resize", S));
    }, { immediate: !0 }), ue(() => [r.maxHeight, r.height], () => {
      r.native || Me(() => {
        var $;
        S(), c.value && (($ = m.value) == null || $.handleScroll(c.value));
      });
    }), St(Rh, zn({
      scrollbarElement: a,
      wrapElement: c
    })), je(() => {
      r.native || Me(() => {
        S();
      });
    }), kv(() => S()), t({
      wrapRef: c,
      update: S,
      scrollTo: k,
      setScrollTop: x,
      setScrollLeft: A,
      handleScroll: w
    }), ($, M) => (b(), C("div", {
      ref_key: "scrollbarRef",
      ref: a,
      class: H(_(s).b())
    }, [
      p("div", {
        ref_key: "wrapRef",
        ref: c,
        class: H(_(y)),
        style: Ue(_(g)),
        onScroll: w
      }, [
        (b(), Y(ht($.tag), {
          id: $.id,
          ref_key: "resizeRef",
          ref: u,
          class: H(_(h)),
          style: Ue($.viewStyle),
          role: $.role,
          "aria-label": $.ariaLabel,
          "aria-orientation": $.ariaOrientation
        }, {
          default: J(() => [
            ae($.$slots, "default")
          ]),
          _: 3
        }, 8, ["id", "class", "style", "role", "aria-label", "aria-orientation"]))
      ], 38),
      $.native ? te("v-if", !0) : (b(), Y(V5, {
        key: 0,
        ref_key: "barRef",
        ref: m,
        height: l.value,
        width: d.value,
        always: $.always,
        "ratio-x": v.value,
        "ratio-y": f.value
      }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"]))
    ], 2));
  }
});
var X5 = /* @__PURE__ */ Ce(K5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const Y5 = jt(X5), bl = Symbol("popper"), Ph = Symbol("popperContent"), J5 = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
], Bh = Re({
  role: {
    type: String,
    values: J5,
    default: "tooltip"
  }
}), Q5 = Z({
  name: "ElPopper",
  inheritAttrs: !1
}), e6 = /* @__PURE__ */ Z({
  ...Q5,
  props: Bh,
  setup(e, { expose: t }) {
    const n = e, r = D(), s = D(), o = D(), i = D(), a = I(() => n.role), c = {
      triggerRef: r,
      popperInstanceRef: s,
      contentRef: o,
      referenceRef: i,
      role: a
    };
    return t(c), St(bl, c), (u, d) => ae(u.$slots, "default");
  }
});
var t6 = /* @__PURE__ */ Ce(e6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const zh = Re({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), n6 = Z({
  name: "ElPopperArrow",
  inheritAttrs: !1
}), r6 = /* @__PURE__ */ Z({
  ...n6,
  props: zh,
  setup(e, { expose: t }) {
    const n = e, r = Te("popper"), { arrowOffset: s, arrowRef: o, arrowStyle: i } = Le(Ph, void 0);
    return ue(() => n.arrowOffset, (a) => {
      s.value = a;
    }), Ft(() => {
      o.value = void 0;
    }), t({
      arrowRef: o
    }), (a, c) => (b(), C("span", {
      ref_key: "arrowRef",
      ref: o,
      class: H(_(r).e("arrow")),
      style: Ue(_(i)),
      "data-popper-arrow": ""
    }, null, 6));
  }
});
var o6 = /* @__PURE__ */ Ce(r6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
const s6 = "ElOnlyChild", i6 = Z({
  name: s6,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    var r;
    const s = Le(Th), o = p5((r = s == null ? void 0 : s.setForwardRef) != null ? r : Yr);
    return () => {
      var i;
      const a = (i = t.default) == null ? void 0 : i.call(t, n);
      if (!a || a.length > 1)
        return null;
      const c = Dh(a);
      return c ? rt(xv(c, n), [[o]]) : null;
    };
  }
});
function Dh(e) {
  if (!e)
    return null;
  const t = e;
  for (const n of t) {
    if (Jt(n))
      switch (n.type) {
        case Cv:
          continue;
        case Tp:
        case "svg":
          return Ju(n);
        case He:
          return Dh(n.children);
        default:
          return n;
      }
    return Ju(n);
  }
  return null;
}
function Ju(e) {
  const t = Te("only-child");
  return he("span", {
    class: t.e("content")
  }, [e]);
}
const Nh = Re({
  virtualRef: {
    type: be(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: be(Function)
  },
  onMouseleave: {
    type: be(Function)
  },
  onClick: {
    type: be(Function)
  },
  onKeydown: {
    type: be(Function)
  },
  onFocus: {
    type: be(Function)
  },
  onBlur: {
    type: be(Function)
  },
  onContextmenu: {
    type: be(Function)
  },
  id: String,
  open: Boolean
}), a6 = Z({
  name: "ElPopperTrigger",
  inheritAttrs: !1
}), c6 = /* @__PURE__ */ Z({
  ...a6,
  props: Nh,
  setup(e, { expose: t }) {
    const n = e, { role: r, triggerRef: s } = Le(bl, void 0);
    f5(s);
    const o = I(() => a.value ? n.id : void 0), i = I(() => {
      if (r && r.value === "tooltip")
        return n.open && n.id ? n.id : void 0;
    }), a = I(() => {
      if (r && r.value !== "tooltip")
        return r.value;
    }), c = I(() => a.value ? `${n.open}` : void 0);
    let u;
    return je(() => {
      ue(() => n.virtualRef, (d) => {
        d && (s.value = On(d));
      }, {
        immediate: !0
      }), ue(s, (d, l) => {
        u == null || u(), u = void 0, eo(d) && ([
          "onMouseenter",
          "onMouseleave",
          "onClick",
          "onKeydown",
          "onFocus",
          "onBlur",
          "onContextmenu"
        ].forEach((m) => {
          var f;
          const v = n[m];
          v && (d.addEventListener(m.slice(2).toLowerCase(), v), (f = l == null ? void 0 : l.removeEventListener) == null || f.call(l, m.slice(2).toLowerCase(), v));
        }), u = ue([o, i, a, c], (m) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((f, v) => {
            Jn(m[v]) ? d.removeAttribute(f) : d.setAttribute(f, m[v]);
          });
        }, { immediate: !0 })), eo(l) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((m) => l.removeAttribute(m));
      }, {
        immediate: !0
      });
    }), Ft(() => {
      u == null || u(), u = void 0;
    }), t({
      triggerRef: s
    }), (d, l) => d.virtualTriggering ? te("v-if", !0) : (b(), Y(_(i6), We({ key: 0 }, d.$attrs, {
      "aria-controls": _(o),
      "aria-describedby": _(i),
      "aria-expanded": _(c),
      "aria-haspopup": _(a)
    }), {
      default: J(() => [
        ae(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"]));
  }
});
var l6 = /* @__PURE__ */ Ce(c6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]);
const js = "focus-trap.focus-after-trapped", Vs = "focus-trap.focus-after-released", u6 = "focus-trap.focusout-prevented", Qu = {
  cancelable: !0,
  bubbles: !1
}, d6 = {
  cancelable: !0,
  bubbles: !1
}, ed = "focusAfterTrapped", td = "focusAfterReleased", f6 = Symbol("elFocusTrap"), yl = D(), ks = D(0), wl = D(0);
let xo = 0;
const qh = (e) => {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const s = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || s ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 || r === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}, nd = (e, t) => {
  for (const n of e)
    if (!p6(n, t))
      return n;
}, p6 = (e, t) => {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}, h6 = (e) => {
  const t = qh(e), n = nd(t, e), r = nd(t.reverse(), e);
  return [n, r];
}, g6 = (e) => e instanceof HTMLInputElement && "select" in e, In = (e, t) => {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), wl.value = window.performance.now(), e !== n && g6(e) && t && e.select();
  }
};
function rd(e, t) {
  const n = [...e], r = e.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
const m6 = () => {
  let e = [];
  return {
    push: (r) => {
      const s = e[0];
      s && r !== s && s.pause(), e = rd(e, r), e.unshift(r);
    },
    remove: (r) => {
      var s, o;
      e = rd(e, r), (o = (s = e[0]) == null ? void 0 : s.resume) == null || o.call(s);
    }
  };
}, v6 = (e, t = !1) => {
  const n = document.activeElement;
  for (const r of e)
    if (In(r, t), document.activeElement !== n)
      return;
}, od = m6(), _6 = () => ks.value > wl.value, Co = () => {
  yl.value = "pointer", ks.value = window.performance.now();
}, sd = () => {
  yl.value = "keyboard", ks.value = window.performance.now();
}, b6 = () => (je(() => {
  xo === 0 && (document.addEventListener("mousedown", Co), document.addEventListener("touchstart", Co), document.addEventListener("keydown", sd)), xo++;
}), Ft(() => {
  xo--, xo <= 0 && (document.removeEventListener("mousedown", Co), document.removeEventListener("touchstart", Co), document.removeEventListener("keydown", sd));
}), {
  focusReason: yl,
  lastUserFocusTimestamp: ks,
  lastAutomatedFocusTimestamp: wl
}), So = (e) => new CustomEvent(u6, {
  ...d6,
  detail: e
}), y6 = Z({
  name: "ElFocusTrap",
  inheritAttrs: !1,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    ed,
    td,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(e, { emit: t }) {
    const n = D();
    let r, s;
    const { focusReason: o } = b6();
    a5((v) => {
      e.trapped && !i.paused && t("release-requested", v);
    });
    const i = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, a = (v) => {
      if (!e.loop && !e.trapped || i.paused)
        return;
      const { key: g, altKey: y, ctrlKey: h, metaKey: w, currentTarget: k, shiftKey: x } = v, { loop: A } = e, S = g === _n.tab && !y && !h && !w, $ = document.activeElement;
      if (S && $) {
        const M = k, [P, R] = h6(M);
        if (P && R) {
          if (!x && $ === R) {
            const j = So({
              focusReason: o.value
            });
            t("focusout-prevented", j), j.defaultPrevented || (v.preventDefault(), A && In(P, !0));
          } else if (x && [P, M].includes($)) {
            const j = So({
              focusReason: o.value
            });
            t("focusout-prevented", j), j.defaultPrevented || (v.preventDefault(), A && In(R, !0));
          }
        } else if ($ === M) {
          const j = So({
            focusReason: o.value
          });
          t("focusout-prevented", j), j.defaultPrevented || v.preventDefault();
        }
      }
    };
    St(f6, {
      focusTrapRef: n,
      onKeydown: a
    }), ue(() => e.focusTrapEl, (v) => {
      v && (n.value = v);
    }, { immediate: !0 }), ue([n], ([v], [g]) => {
      v && (v.addEventListener("keydown", a), v.addEventListener("focusin", d), v.addEventListener("focusout", l)), g && (g.removeEventListener("keydown", a), g.removeEventListener("focusin", d), g.removeEventListener("focusout", l));
    });
    const c = (v) => {
      t(ed, v);
    }, u = (v) => t(td, v), d = (v) => {
      const g = _(n);
      if (!g)
        return;
      const y = v.target, h = v.relatedTarget, w = y && g.contains(y);
      e.trapped || h && g.contains(h) || (r = h), w && t("focusin", v), !i.paused && e.trapped && (w ? s = y : In(s, !0));
    }, l = (v) => {
      const g = _(n);
      if (!(i.paused || !g))
        if (e.trapped) {
          const y = v.relatedTarget;
          !Jn(y) && !g.contains(y) && setTimeout(() => {
            if (!i.paused && e.trapped) {
              const h = So({
                focusReason: o.value
              });
              t("focusout-prevented", h), h.defaultPrevented || In(s, !0);
            }
          }, 0);
        } else {
          const y = v.target;
          y && g.contains(y) || t("focusout", v);
        }
    };
    async function m() {
      await Me();
      const v = _(n);
      if (v) {
        od.push(i);
        const g = v.contains(document.activeElement) ? r : document.activeElement;
        if (r = g, !v.contains(g)) {
          const h = new Event(js, Qu);
          v.addEventListener(js, c), v.dispatchEvent(h), h.defaultPrevented || Me(() => {
            let w = e.focusStartEl;
            Yt(w) || (In(w), document.activeElement !== w && (w = "first")), w === "first" && v6(qh(v), !0), (document.activeElement === g || w === "container") && In(v);
          });
        }
      }
    }
    function f() {
      const v = _(n);
      if (v) {
        v.removeEventListener(js, c);
        const g = new CustomEvent(Vs, {
          ...Qu,
          detail: {
            focusReason: o.value
          }
        });
        v.addEventListener(Vs, u), v.dispatchEvent(g), !g.defaultPrevented && (o.value == "keyboard" || !_6() || v.contains(document.activeElement)) && In(r ?? document.body), v.removeEventListener(Vs, u), od.remove(i);
      }
    }
    return je(() => {
      e.trapped && m(), ue(() => e.trapped, (v) => {
        v ? m() : f();
      });
    }), Ft(() => {
      e.trapped && f();
    }), {
      onKeydown: a
    };
  }
});
function w6(e, t, n, r, s, o) {
  return ae(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var k6 = /* @__PURE__ */ Ce(y6, [["render", w6], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const x6 = ["fixed", "absolute"], C6 = Re({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: be(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: !0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: ms,
    default: "bottom"
  },
  popperOptions: {
    type: be(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: x6,
    default: "absolute"
  }
}), Fh = Re({
  ...C6,
  id: String,
  style: {
    type: be([String, Array, Object])
  },
  className: {
    type: be([String, Array, Object])
  },
  effect: {
    type: String,
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: !0
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: !1
  },
  trapping: {
    type: Boolean,
    default: !1
  },
  popperClass: {
    type: be([String, Array, Object])
  },
  popperStyle: {
    type: be([String, Array, Object])
  },
  referenceEl: {
    type: be(Object)
  },
  triggerTargetEl: {
    type: be(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: !0
  },
  ariaLabel: {
    type: String,
    default: void 0
  },
  virtualTriggering: Boolean,
  zIndex: Number
}), S6 = {
  mouseenter: (e) => e instanceof MouseEvent,
  mouseleave: (e) => e instanceof MouseEvent,
  focus: () => !0,
  blur: () => !0,
  close: () => !0
}, E6 = (e, t = []) => {
  const { placement: n, strategy: r, popperOptions: s } = e, o = {
    placement: n,
    strategy: r,
    ...s,
    modifiers: [...$6(e), ...t]
  };
  return M6(o, s == null ? void 0 : s.modifiers), o;
}, A6 = (e) => {
  if (gt)
    return On(e);
};
function $6(e) {
  const { offset: t, gpuAcceleration: n, fallbackPlacements: r } = e;
  return [
    {
      name: "offset",
      options: {
        offset: [0, t ?? 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements: r
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration: n
      }
    }
  ];
}
function M6(e, t) {
  t && (e.modifiers = [...e.modifiers, ...t ?? []]);
}
const I6 = 0, T6 = (e) => {
  const { popperInstanceRef: t, contentRef: n, triggerRef: r, role: s } = Le(bl, void 0), o = D(), i = D(), a = I(() => ({
    name: "eventListeners",
    enabled: !!e.visible
  })), c = I(() => {
    var h;
    const w = _(o), k = (h = _(i)) != null ? h : I6;
    return {
      name: "arrow",
      enabled: !u4(w),
      options: {
        element: w,
        padding: k
      }
    };
  }), u = I(() => ({
    onFirstUpdate: () => {
      v();
    },
    ...E6(e, [
      _(c),
      _(a)
    ])
  })), d = I(() => A6(e.referenceEl) || _(r)), { attributes: l, state: m, styles: f, update: v, forceUpdate: g, instanceRef: y } = r5(d, n, u);
  return ue(y, (h) => t.value = h), je(() => {
    ue(() => {
      var h;
      return (h = _(d)) == null ? void 0 : h.getBoundingClientRect();
    }, () => {
      v();
    });
  }), {
    attributes: l,
    arrowRef: o,
    contentRef: n,
    instanceRef: y,
    state: m,
    styles: f,
    role: s,
    forceUpdate: g,
    update: v
  };
}, L6 = (e, {
  attributes: t,
  styles: n,
  role: r
}) => {
  const { nextZIndex: s } = m5(), o = Te("popper"), i = I(() => _(t).popper), a = D(Ye(e.zIndex) ? e.zIndex : s()), c = I(() => [
    o.b(),
    o.is("pure", e.pure),
    o.is(e.effect),
    e.popperClass
  ]), u = I(() => [
    { zIndex: _(a) },
    _(n).popper,
    e.popperStyle || {}
  ]), d = I(() => r.value === "dialog" ? "false" : void 0), l = I(() => _(n).arrow || {});
  return {
    ariaModal: d,
    arrowStyle: l,
    contentAttrs: i,
    contentClass: c,
    contentStyle: u,
    contentZIndex: a,
    updateZIndex: () => {
      a.value = Ye(e.zIndex) ? e.zIndex : s();
    }
  };
}, O6 = (e, t) => {
  const n = D(!1), r = D();
  return {
    focusStartRef: r,
    trapped: n,
    onFocusAfterReleased: (u) => {
      var d;
      ((d = u.detail) == null ? void 0 : d.focusReason) !== "pointer" && (r.value = "first", t("blur"));
    },
    onFocusAfterTrapped: () => {
      t("focus");
    },
    onFocusInTrap: (u) => {
      e.visible && !n.value && (u.target && (r.value = u.target), n.value = !0);
    },
    onFocusoutPrevented: (u) => {
      e.trapping || (u.detail.focusReason === "pointer" && u.preventDefault(), n.value = !1);
    },
    onReleaseRequested: () => {
      n.value = !1, t("close");
    }
  };
}, R6 = Z({
  name: "ElPopperContent"
}), P6 = /* @__PURE__ */ Z({
  ...R6,
  props: Fh,
  emits: S6,
  setup(e, { expose: t, emit: n }) {
    const r = e, {
      focusStartRef: s,
      trapped: o,
      onFocusAfterReleased: i,
      onFocusAfterTrapped: a,
      onFocusInTrap: c,
      onFocusoutPrevented: u,
      onReleaseRequested: d
    } = O6(r, n), { attributes: l, arrowRef: m, contentRef: f, styles: v, instanceRef: g, role: y, update: h } = T6(r), {
      ariaModal: w,
      arrowStyle: k,
      contentAttrs: x,
      contentClass: A,
      contentStyle: S,
      updateZIndex: $
    } = L6(r, {
      styles: v,
      attributes: l,
      role: y
    }), M = Le(Ko, void 0), P = D();
    St(Ph, {
      arrowStyle: k,
      arrowRef: m,
      arrowOffset: P
    }), M && (M.addInputId || M.removeInputId) && St(Ko, {
      ...M,
      addInputId: Yr,
      removeInputId: Yr
    });
    let R;
    const B = (ie = !0) => {
      h(), ie && $();
    }, j = () => {
      B(!1), r.visible && r.focusOnShow ? o.value = !0 : r.visible === !1 && (o.value = !1);
    };
    return je(() => {
      ue(() => r.triggerTargetEl, (ie, z) => {
        R == null || R(), R = void 0;
        const Q = _(ie || f.value), N = _(z || f.value);
        eo(Q) && (R = ue([y, () => r.ariaLabel, w, () => r.id], (V) => {
          ["role", "aria-label", "aria-modal", "id"].forEach((F, G) => {
            Jn(V[G]) ? Q.removeAttribute(F) : Q.setAttribute(F, V[G]);
          });
        }, { immediate: !0 })), N !== Q && eo(N) && ["role", "aria-label", "aria-modal", "id"].forEach((V) => {
          N.removeAttribute(V);
        });
      }, { immediate: !0 }), ue(() => r.visible, j, { immediate: !0 });
    }), Ft(() => {
      R == null || R(), R = void 0;
    }), t({
      popperContentRef: f,
      popperInstanceRef: g,
      updatePopper: B,
      contentStyle: S
    }), (ie, z) => (b(), C("div", We({
      ref_key: "contentRef",
      ref: f
    }, _(x), {
      style: _(S),
      class: _(A),
      tabindex: "-1",
      onMouseenter: z[0] || (z[0] = (Q) => ie.$emit("mouseenter", Q)),
      onMouseleave: z[1] || (z[1] = (Q) => ie.$emit("mouseleave", Q))
    }), [
      he(_(k6), {
        trapped: _(o),
        "trap-on-focus-in": !0,
        "focus-trap-el": _(f),
        "focus-start-el": _(s),
        onFocusAfterTrapped: _(a),
        onFocusAfterReleased: _(i),
        onFocusin: _(c),
        onFocusoutPrevented: _(u),
        onReleaseRequested: _(d)
      }, {
        default: J(() => [
          ae(ie.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
    ], 16));
  }
});
var B6 = /* @__PURE__ */ Ce(P6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
const z6 = jt(t6), kl = Symbol("elTooltip"), Tt = Re({
  ...u5,
  ...Fh,
  appendTo: {
    type: be([String, Object])
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: {
    type: Boolean,
    default: !1
  },
  persistent: Boolean,
  ariaLabel: String,
  visible: {
    type: be(Boolean),
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: !0
  },
  disabled: Boolean
}), ro = Re({
  ...Nh,
  disabled: Boolean,
  trigger: {
    type: be([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: be(Array),
    default: () => [_n.enter, _n.space]
  }
}), {
  useModelToggleProps: D6,
  useModelToggleEmits: N6,
  useModelToggle: q6
} = e3("visible"), F6 = Re({
  ...Bh,
  ...D6,
  ...Tt,
  ...ro,
  ...zh,
  showArrow: {
    type: Boolean,
    default: !0
  }
}), H6 = [
  ...N6,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
], j6 = (e, t) => zb(e) ? e.includes(t) : e === t, cr = (e, t, n) => (r) => {
  j6(_(e), t) && n(r);
}, V6 = Z({
  name: "ElTooltipTrigger"
}), U6 = /* @__PURE__ */ Z({
  ...V6,
  props: ro,
  setup(e, { expose: t }) {
    const n = e, r = Te("tooltip"), { controlled: s, id: o, open: i, onOpen: a, onClose: c, onToggle: u } = Le(kl, void 0), d = D(null), l = () => {
      if (_(s) || n.disabled)
        return !0;
    }, m = Bt(n, "trigger"), f = gn(l, cr(m, "hover", a)), v = gn(l, cr(m, "hover", c)), g = gn(l, cr(m, "click", (x) => {
      x.button === 0 && u(x);
    })), y = gn(l, cr(m, "focus", a)), h = gn(l, cr(m, "focus", c)), w = gn(l, cr(m, "contextmenu", (x) => {
      x.preventDefault(), u(x);
    })), k = gn(l, (x) => {
      const { code: A } = x;
      n.triggerKeys.includes(A) && (x.preventDefault(), u(x));
    });
    return t({
      triggerRef: d
    }), (x, A) => (b(), Y(_(l6), {
      id: _(o),
      "virtual-ref": x.virtualRef,
      open: _(i),
      "virtual-triggering": x.virtualTriggering,
      class: H(_(r).e("trigger")),
      onBlur: _(h),
      onClick: _(g),
      onContextmenu: _(w),
      onFocus: _(y),
      onMouseenter: _(f),
      onMouseleave: _(v),
      onKeydown: _(k)
    }, {
      default: J(() => [
        ae(x.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]));
  }
});
var Z6 = /* @__PURE__ */ Ce(U6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const W6 = Z({
  name: "ElTooltipContent",
  inheritAttrs: !1
}), G6 = /* @__PURE__ */ Z({
  ...W6,
  props: Tt,
  setup(e, { expose: t }) {
    const n = e, { selector: r } = Ih(), s = Te("tooltip"), o = D(null), i = D(!1), {
      controlled: a,
      id: c,
      open: u,
      trigger: d,
      onClose: l,
      onOpen: m,
      onShow: f,
      onHide: v,
      onBeforeShow: g,
      onBeforeHide: y
    } = Le(kl, void 0), h = I(() => n.transition || `${s.namespace.value}-fade-in-linear`), w = I(() => n.persistent);
    Ft(() => {
      i.value = !0;
    });
    const k = I(() => _(w) ? !0 : _(u)), x = I(() => n.disabled ? !1 : _(u)), A = I(() => n.appendTo || r.value), S = I(() => {
      var V;
      return (V = n.style) != null ? V : {};
    }), $ = I(() => !_(u)), M = () => {
      v();
    }, P = () => {
      if (_(a))
        return !0;
    }, R = gn(P, () => {
      n.enterable && _(d) === "hover" && m();
    }), B = gn(P, () => {
      _(d) === "hover" && l();
    }), j = () => {
      var V, F;
      (F = (V = o.value) == null ? void 0 : V.updatePopper) == null || F.call(V), g == null || g();
    }, ie = () => {
      y == null || y();
    }, z = () => {
      f(), N = Sb(I(() => {
        var V;
        return (V = o.value) == null ? void 0 : V.popperContentRef;
      }), () => {
        if (_(a))
          return;
        _(d) !== "hover" && l();
      });
    }, Q = () => {
      n.virtualTriggering || l();
    };
    let N;
    return ue(() => _(u), (V) => {
      V || N == null || N();
    }, {
      flush: "post"
    }), ue(() => n.content, () => {
      var V, F;
      (F = (V = o.value) == null ? void 0 : V.updatePopper) == null || F.call(V);
    }), t({
      contentRef: o
    }), (V, F) => (b(), Y(Sv, {
      disabled: !V.teleported,
      to: _(A)
    }, [
      he(er, {
        name: _(h),
        onAfterLeave: M,
        onBeforeEnter: j,
        onAfterEnter: z,
        onBeforeLeave: ie
      }, {
        default: J(() => [
          _(k) ? rt((b(), Y(_(B6), We({
            key: 0,
            id: _(c),
            ref_key: "contentRef",
            ref: o
          }, V.$attrs, {
            "aria-label": V.ariaLabel,
            "aria-hidden": _($),
            "boundaries-padding": V.boundariesPadding,
            "fallback-placements": V.fallbackPlacements,
            "gpu-acceleration": V.gpuAcceleration,
            offset: V.offset,
            placement: V.placement,
            "popper-options": V.popperOptions,
            strategy: V.strategy,
            effect: V.effect,
            enterable: V.enterable,
            pure: V.pure,
            "popper-class": V.popperClass,
            "popper-style": [V.popperStyle, _(S)],
            "reference-el": V.referenceEl,
            "trigger-target-el": V.triggerTargetEl,
            visible: _(x),
            "z-index": V.zIndex,
            onMouseenter: _(R),
            onMouseleave: _(B),
            onBlur: Q,
            onClose: _(l)
          }), {
            default: J(() => [
              i.value ? te("v-if", !0) : ae(V.$slots, "default", { key: 0 })
            ]),
            _: 3
          }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"])), [
            [Qt, _(x)]
          ]) : te("v-if", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ], 8, ["disabled", "to"]));
  }
});
var K6 = /* @__PURE__ */ Ce(G6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const X6 = ["innerHTML"], Y6 = { key: 1 }, J6 = Z({
  name: "ElTooltip"
}), Q6 = /* @__PURE__ */ Z({
  ...J6,
  props: F6,
  emits: H6,
  setup(e, { expose: t, emit: n }) {
    const r = e;
    l5();
    const s = _s(), o = D(), i = D(), a = () => {
      var h;
      const w = _(o);
      w && ((h = w.popperInstanceRef) == null || h.update());
    }, c = D(!1), u = D(), { show: d, hide: l, hasUpdateHandler: m } = q6({
      indicator: c,
      toggleReason: u
    }), { onOpen: f, onClose: v } = d5({
      showAfter: Bt(r, "showAfter"),
      hideAfter: Bt(r, "hideAfter"),
      autoClose: Bt(r, "autoClose"),
      open: d,
      close: l
    }), g = I(() => ol(r.visible) && !m.value);
    St(kl, {
      controlled: g,
      id: s,
      open: Ap(c),
      trigger: Bt(r, "trigger"),
      onOpen: (h) => {
        f(h);
      },
      onClose: (h) => {
        v(h);
      },
      onToggle: (h) => {
        _(c) ? v(h) : f(h);
      },
      onShow: () => {
        n("show", u.value);
      },
      onHide: () => {
        n("hide", u.value);
      },
      onBeforeShow: () => {
        n("before-show", u.value);
      },
      onBeforeHide: () => {
        n("before-hide", u.value);
      },
      updatePopper: a
    }), ue(() => r.disabled, (h) => {
      h && c.value && (c.value = !1);
    });
    const y = (h) => {
      var w, k;
      const x = (k = (w = i.value) == null ? void 0 : w.contentRef) == null ? void 0 : k.popperContentRef, A = (h == null ? void 0 : h.relatedTarget) || document.activeElement;
      return x && x.contains(A);
    };
    return Ev(() => c.value && l()), t({
      popperRef: o,
      contentRef: i,
      isFocusInsideContent: y,
      updatePopper: a,
      onOpen: f,
      onClose: v,
      hide: l
    }), (h, w) => (b(), Y(_(z6), {
      ref_key: "popperRef",
      ref: o,
      role: h.role
    }, {
      default: J(() => [
        he(Z6, {
          disabled: h.disabled,
          trigger: h.trigger,
          "trigger-keys": h.triggerKeys,
          "virtual-ref": h.virtualRef,
          "virtual-triggering": h.virtualTriggering
        }, {
          default: J(() => [
            h.$slots.default ? ae(h.$slots, "default", { key: 0 }) : te("v-if", !0)
          ]),
          _: 3
        }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
        he(K6, {
          ref_key: "contentRef",
          ref: i,
          "aria-label": h.ariaLabel,
          "boundaries-padding": h.boundariesPadding,
          content: h.content,
          disabled: h.disabled,
          effect: h.effect,
          enterable: h.enterable,
          "fallback-placements": h.fallbackPlacements,
          "hide-after": h.hideAfter,
          "gpu-acceleration": h.gpuAcceleration,
          offset: h.offset,
          persistent: h.persistent,
          "popper-class": h.popperClass,
          "popper-style": h.popperStyle,
          placement: h.placement,
          "popper-options": h.popperOptions,
          pure: h.pure,
          "raw-content": h.rawContent,
          "reference-el": h.referenceEl,
          "trigger-target-el": h.triggerTargetEl,
          "show-after": h.showAfter,
          strategy: h.strategy,
          teleported: h.teleported,
          transition: h.transition,
          "virtual-triggering": h.virtualTriggering,
          "z-index": h.zIndex,
          "append-to": h.appendTo
        }, {
          default: J(() => [
            ae(h.$slots, "content", {}, () => [
              h.rawContent ? (b(), C("span", {
                key: 0,
                innerHTML: h.content
              }, null, 8, X6)) : (b(), C("span", Y6, ke(h.content), 1))
            ]),
            h.showArrow ? (b(), Y(_(o6), {
              key: 0,
              "arrow-offset": h.arrowOffset
            }, null, 8, ["arrow-offset"])) : te("v-if", !0)
          ]),
          _: 3
        }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
      ]),
      _: 3
    }, 8, ["role"]));
  }
});
var ex = /* @__PURE__ */ Ce(Q6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
const oo = jt(ex), Hh = Symbol("buttonGroupContextKey"), tx = (e, t) => {
  mh({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, I(() => e.type === "text"));
  const n = Le(Hh, void 0), r = w5("button"), { form: s } = ys(), o = po(I(() => n == null ? void 0 : n.size)), i = bs(), a = D(), c = Ip(), u = I(() => e.type || (n == null ? void 0 : n.type) || ""), d = I(() => {
    var v, g, y;
    return (y = (g = e.autoInsertSpace) != null ? g : (v = r.value) == null ? void 0 : v.autoInsertSpace) != null ? y : !1;
  }), l = I(() => e.tag === "button" ? {
    ariaDisabled: i.value || e.loading,
    disabled: i.value || e.loading,
    autofocus: e.autofocus,
    type: e.nativeType
  } : {}), m = I(() => {
    var v;
    const g = (v = c.default) == null ? void 0 : v.call(c);
    if (d.value && (g == null ? void 0 : g.length) === 1) {
      const y = g[0];
      if ((y == null ? void 0 : y.type) === Tp) {
        const h = y.children;
        return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(h.trim());
      }
    }
    return !1;
  });
  return {
    _disabled: i,
    _size: o,
    _type: u,
    _ref: a,
    _props: l,
    shouldAddSpace: m,
    handleClick: (v) => {
      e.nativeType === "reset" && (s == null || s.resetFields()), t("click", v);
    }
  };
}, nx = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
], rx = ["button", "submit", "reset"], Ac = Re({
  size: vl,
  disabled: Boolean,
  type: {
    type: String,
    values: nx,
    default: ""
  },
  icon: {
    type: en
  },
  nativeType: {
    type: String,
    values: rx,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: en,
    default: () => fh
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: be([String, Object]),
    default: "button"
  }
}), ox = {
  click: (e) => e instanceof MouseEvent
};
function ct(e, t) {
  sx(e) && (e = "100%");
  var n = ix(e);
  return e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e))), n && (e = parseInt(String(e * t), 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : (t === 360 ? e = (e < 0 ? e % t + t : e % t) / parseFloat(String(t)) : e = e % t / parseFloat(String(t)), e);
}
function Eo(e) {
  return Math.min(1, Math.max(0, e));
}
function sx(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function ix(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function jh(e) {
  return e = parseFloat(e), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function Ao(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function Kn(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function ax(e, t, n) {
  return {
    r: ct(e, 255) * 255,
    g: ct(t, 255) * 255,
    b: ct(n, 255) * 255
  };
}
function id(e, t, n) {
  e = ct(e, 255), t = ct(t, 255), n = ct(n, 255);
  var r = Math.max(e, t, n), s = Math.min(e, t, n), o = 0, i = 0, a = (r + s) / 2;
  if (r === s)
    i = 0, o = 0;
  else {
    var c = r - s;
    switch (i = a > 0.5 ? c / (2 - r - s) : c / (r + s), r) {
      case e:
        o = (t - n) / c + (t < n ? 6 : 0);
        break;
      case t:
        o = (n - e) / c + 2;
        break;
      case n:
        o = (e - t) / c + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: i, l: a };
}
function Us(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * (6 * n) : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function cx(e, t, n) {
  var r, s, o;
  if (e = ct(e, 360), t = ct(t, 100), n = ct(n, 100), t === 0)
    s = n, o = n, r = n;
  else {
    var i = n < 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - i;
    r = Us(a, i, e + 1 / 3), s = Us(a, i, e), o = Us(a, i, e - 1 / 3);
  }
  return { r: r * 255, g: s * 255, b: o * 255 };
}
function ad(e, t, n) {
  e = ct(e, 255), t = ct(t, 255), n = ct(n, 255);
  var r = Math.max(e, t, n), s = Math.min(e, t, n), o = 0, i = r, a = r - s, c = r === 0 ? 0 : a / r;
  if (r === s)
    o = 0;
  else {
    switch (r) {
      case e:
        o = (t - n) / a + (t < n ? 6 : 0);
        break;
      case t:
        o = (n - e) / a + 2;
        break;
      case n:
        o = (e - t) / a + 4;
        break;
    }
    o /= 6;
  }
  return { h: o, s: c, v: i };
}
function lx(e, t, n) {
  e = ct(e, 360) * 6, t = ct(t, 100), n = ct(n, 100);
  var r = Math.floor(e), s = e - r, o = n * (1 - t), i = n * (1 - s * t), a = n * (1 - (1 - s) * t), c = r % 6, u = [n, i, o, o, a, n][c], d = [a, n, n, i, o, o][c], l = [o, o, a, n, n, i][c];
  return { r: u * 255, g: d * 255, b: l * 255 };
}
function cd(e, t, n, r) {
  var s = [
    Kn(Math.round(e).toString(16)),
    Kn(Math.round(t).toString(16)),
    Kn(Math.round(n).toString(16))
  ];
  return r && s[0].startsWith(s[0].charAt(1)) && s[1].startsWith(s[1].charAt(1)) && s[2].startsWith(s[2].charAt(1)) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) : s.join("");
}
function ux(e, t, n, r, s) {
  var o = [
    Kn(Math.round(e).toString(16)),
    Kn(Math.round(t).toString(16)),
    Kn(Math.round(n).toString(16)),
    Kn(dx(r))
  ];
  return s && o[0].startsWith(o[0].charAt(1)) && o[1].startsWith(o[1].charAt(1)) && o[2].startsWith(o[2].charAt(1)) && o[3].startsWith(o[3].charAt(1)) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) + o[3].charAt(0) : o.join("");
}
function dx(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function ld(e) {
  return It(e) / 255;
}
function It(e) {
  return parseInt(e, 16);
}
function fx(e) {
  return {
    r: e >> 16,
    g: (e & 65280) >> 8,
    b: e & 255
  };
}
var $c = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function px(e) {
  var t = { r: 0, g: 0, b: 0 }, n = 1, r = null, s = null, o = null, i = !1, a = !1;
  return typeof e == "string" && (e = mx(e)), typeof e == "object" && (pn(e.r) && pn(e.g) && pn(e.b) ? (t = ax(e.r, e.g, e.b), i = !0, a = String(e.r).substr(-1) === "%" ? "prgb" : "rgb") : pn(e.h) && pn(e.s) && pn(e.v) ? (r = Ao(e.s), s = Ao(e.v), t = lx(e.h, r, s), i = !0, a = "hsv") : pn(e.h) && pn(e.s) && pn(e.l) && (r = Ao(e.s), o = Ao(e.l), t = cx(e.h, r, o), i = !0, a = "hsl"), Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)), n = jh(n), {
    ok: i,
    format: e.format || a,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: n
  };
}
var hx = "[-\\+]?\\d+%?", gx = "[-\\+]?\\d*\\.\\d+%?", Rn = "(?:".concat(gx, ")|(?:").concat(hx, ")"), Zs = "[\\s|\\(]+(".concat(Rn, ")[,|\\s]+(").concat(Rn, ")[,|\\s]+(").concat(Rn, ")\\s*\\)?"), Ws = "[\\s|\\(]+(".concat(Rn, ")[,|\\s]+(").concat(Rn, ")[,|\\s]+(").concat(Rn, ")[,|\\s]+(").concat(Rn, ")\\s*\\)?"), Kt = {
  CSS_UNIT: new RegExp(Rn),
  rgb: new RegExp("rgb" + Zs),
  rgba: new RegExp("rgba" + Ws),
  hsl: new RegExp("hsl" + Zs),
  hsla: new RegExp("hsla" + Ws),
  hsv: new RegExp("hsv" + Zs),
  hsva: new RegExp("hsva" + Ws),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function mx(e) {
  if (e = e.trim().toLowerCase(), e.length === 0)
    return !1;
  var t = !1;
  if ($c[e])
    e = $c[e], t = !0;
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = Kt.rgb.exec(e);
  return n ? { r: n[1], g: n[2], b: n[3] } : (n = Kt.rgba.exec(e), n ? { r: n[1], g: n[2], b: n[3], a: n[4] } : (n = Kt.hsl.exec(e), n ? { h: n[1], s: n[2], l: n[3] } : (n = Kt.hsla.exec(e), n ? { h: n[1], s: n[2], l: n[3], a: n[4] } : (n = Kt.hsv.exec(e), n ? { h: n[1], s: n[2], v: n[3] } : (n = Kt.hsva.exec(e), n ? { h: n[1], s: n[2], v: n[3], a: n[4] } : (n = Kt.hex8.exec(e), n ? {
    r: It(n[1]),
    g: It(n[2]),
    b: It(n[3]),
    a: ld(n[4]),
    format: t ? "name" : "hex8"
  } : (n = Kt.hex6.exec(e), n ? {
    r: It(n[1]),
    g: It(n[2]),
    b: It(n[3]),
    format: t ? "name" : "hex"
  } : (n = Kt.hex4.exec(e), n ? {
    r: It(n[1] + n[1]),
    g: It(n[2] + n[2]),
    b: It(n[3] + n[3]),
    a: ld(n[4] + n[4]),
    format: t ? "name" : "hex8"
  } : (n = Kt.hex3.exec(e), n ? {
    r: It(n[1] + n[1]),
    g: It(n[2] + n[2]),
    b: It(n[3] + n[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function pn(e) {
  return !!Kt.CSS_UNIT.exec(String(e));
}
var vx = (
  /** @class */
  (function() {
    function e(t, n) {
      t === void 0 && (t = ""), n === void 0 && (n = {});
      var r;
      if (t instanceof e)
        return t;
      typeof t == "number" && (t = fx(t)), this.originalInput = t;
      var s = px(t);
      this.originalInput = t, this.r = s.r, this.g = s.g, this.b = s.b, this.a = s.a, this.roundA = Math.round(100 * this.a) / 100, this.format = (r = n.format) !== null && r !== void 0 ? r : s.format, this.gradientType = n.gradientType, this.r < 1 && (this.r = Math.round(this.r)), this.g < 1 && (this.g = Math.round(this.g)), this.b < 1 && (this.b = Math.round(this.b)), this.isValid = s.ok;
    }
    return e.prototype.isDark = function() {
      return this.getBrightness() < 128;
    }, e.prototype.isLight = function() {
      return !this.isDark();
    }, e.prototype.getBrightness = function() {
      var t = this.toRgb();
      return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
    }, e.prototype.getLuminance = function() {
      var t = this.toRgb(), n, r, s, o = t.r / 255, i = t.g / 255, a = t.b / 255;
      return o <= 0.03928 ? n = o / 12.92 : n = Math.pow((o + 0.055) / 1.055, 2.4), i <= 0.03928 ? r = i / 12.92 : r = Math.pow((i + 0.055) / 1.055, 2.4), a <= 0.03928 ? s = a / 12.92 : s = Math.pow((a + 0.055) / 1.055, 2.4), 0.2126 * n + 0.7152 * r + 0.0722 * s;
    }, e.prototype.getAlpha = function() {
      return this.a;
    }, e.prototype.setAlpha = function(t) {
      return this.a = jh(t), this.roundA = Math.round(100 * this.a) / 100, this;
    }, e.prototype.isMonochrome = function() {
      var t = this.toHsl().s;
      return t === 0;
    }, e.prototype.toHsv = function() {
      var t = ad(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }, e.prototype.toHsvString = function() {
      var t = ad(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), s = Math.round(t.v * 100);
      return this.a === 1 ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(s, "%)") : "hsva(".concat(n, ", ").concat(r, "%, ").concat(s, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHsl = function() {
      var t = id(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }, e.prototype.toHslString = function() {
      var t = id(this.r, this.g, this.b), n = Math.round(t.h * 360), r = Math.round(t.s * 100), s = Math.round(t.l * 100);
      return this.a === 1 ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(s, "%)") : "hsla(".concat(n, ", ").concat(r, "%, ").concat(s, "%, ").concat(this.roundA, ")");
    }, e.prototype.toHex = function(t) {
      return t === void 0 && (t = !1), cd(this.r, this.g, this.b, t);
    }, e.prototype.toHexString = function(t) {
      return t === void 0 && (t = !1), "#" + this.toHex(t);
    }, e.prototype.toHex8 = function(t) {
      return t === void 0 && (t = !1), ux(this.r, this.g, this.b, this.a, t);
    }, e.prototype.toHex8String = function(t) {
      return t === void 0 && (t = !1), "#" + this.toHex8(t);
    }, e.prototype.toHexShortString = function(t) {
      return t === void 0 && (t = !1), this.a === 1 ? this.toHexString(t) : this.toHex8String(t);
    }, e.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    }, e.prototype.toRgbString = function() {
      var t = Math.round(this.r), n = Math.round(this.g), r = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(t, ", ").concat(n, ", ").concat(r, ")") : "rgba(".concat(t, ", ").concat(n, ", ").concat(r, ", ").concat(this.roundA, ")");
    }, e.prototype.toPercentageRgb = function() {
      var t = function(n) {
        return "".concat(Math.round(ct(n, 255) * 100), "%");
      };
      return {
        r: t(this.r),
        g: t(this.g),
        b: t(this.b),
        a: this.a
      };
    }, e.prototype.toPercentageRgbString = function() {
      var t = function(n) {
        return Math.round(ct(n, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%)") : "rgba(".concat(t(this.r), "%, ").concat(t(this.g), "%, ").concat(t(this.b), "%, ").concat(this.roundA, ")");
    }, e.prototype.toName = function() {
      if (this.a === 0)
        return "transparent";
      if (this.a < 1)
        return !1;
      for (var t = "#" + cd(this.r, this.g, this.b, !1), n = 0, r = Object.entries($c); n < r.length; n++) {
        var s = r[n], o = s[0], i = s[1];
        if (t === i)
          return o;
      }
      return !1;
    }, e.prototype.toString = function(t) {
      var n = !!t;
      t = t ?? this.format;
      var r = !1, s = this.a < 1 && this.a >= 0, o = !n && s && (t.startsWith("hex") || t === "name");
      return o ? t === "name" && this.a === 0 ? this.toName() : this.toRgbString() : (t === "rgb" && (r = this.toRgbString()), t === "prgb" && (r = this.toPercentageRgbString()), (t === "hex" || t === "hex6") && (r = this.toHexString()), t === "hex3" && (r = this.toHexString(!0)), t === "hex4" && (r = this.toHex8String(!0)), t === "hex8" && (r = this.toHex8String()), t === "name" && (r = this.toName()), t === "hsl" && (r = this.toHslString()), t === "hsv" && (r = this.toHsvString()), r || this.toHexString());
    }, e.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    }, e.prototype.clone = function() {
      return new e(this.toString());
    }, e.prototype.lighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l += t / 100, n.l = Eo(n.l), new e(n);
    }, e.prototype.brighten = function(t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100)))), n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100)))), n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100)))), new e(n);
    }, e.prototype.darken = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.l -= t / 100, n.l = Eo(n.l), new e(n);
    }, e.prototype.tint = function(t) {
      return t === void 0 && (t = 10), this.mix("white", t);
    }, e.prototype.shade = function(t) {
      return t === void 0 && (t = 10), this.mix("black", t);
    }, e.prototype.desaturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s -= t / 100, n.s = Eo(n.s), new e(n);
    }, e.prototype.saturate = function(t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return n.s += t / 100, n.s = Eo(n.s), new e(n);
    }, e.prototype.greyscale = function() {
      return this.desaturate(100);
    }, e.prototype.spin = function(t) {
      var n = this.toHsl(), r = (n.h + t) % 360;
      return n.h = r < 0 ? 360 + r : r, new e(n);
    }, e.prototype.mix = function(t, n) {
      n === void 0 && (n = 50);
      var r = this.toRgb(), s = new e(t).toRgb(), o = n / 100, i = {
        r: (s.r - r.r) * o + r.r,
        g: (s.g - r.g) * o + r.g,
        b: (s.b - r.b) * o + r.b,
        a: (s.a - r.a) * o + r.a
      };
      return new e(i);
    }, e.prototype.analogous = function(t, n) {
      t === void 0 && (t = 6), n === void 0 && (n = 30);
      var r = this.toHsl(), s = 360 / n, o = [this];
      for (r.h = (r.h - (s * t >> 1) + 720) % 360; --t; )
        r.h = (r.h + s) % 360, o.push(new e(r));
      return o;
    }, e.prototype.complement = function() {
      var t = this.toHsl();
      return t.h = (t.h + 180) % 360, new e(t);
    }, e.prototype.monochromatic = function(t) {
      t === void 0 && (t = 6);
      for (var n = this.toHsv(), r = n.h, s = n.s, o = n.v, i = [], a = 1 / t; t--; )
        i.push(new e({ h: r, s, v: o })), o = (o + a) % 1;
      return i;
    }, e.prototype.splitcomplement = function() {
      var t = this.toHsl(), n = t.h;
      return [
        this,
        new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
        new e({ h: (n + 216) % 360, s: t.s, l: t.l })
      ];
    }, e.prototype.onBackground = function(t) {
      var n = this.toRgb(), r = new e(t).toRgb(), s = n.a + r.a * (1 - n.a);
      return new e({
        r: (n.r * n.a + r.r * r.a * (1 - n.a)) / s,
        g: (n.g * n.a + r.g * r.a * (1 - n.a)) / s,
        b: (n.b * n.a + r.b * r.a * (1 - n.a)) / s,
        a: s
      });
    }, e.prototype.triad = function() {
      return this.polyad(3);
    }, e.prototype.tetrad = function() {
      return this.polyad(4);
    }, e.prototype.polyad = function(t) {
      for (var n = this.toHsl(), r = n.h, s = [this], o = 360 / t, i = 1; i < t; i++)
        s.push(new e({ h: (r + i * o) % 360, s: n.s, l: n.l }));
      return s;
    }, e.prototype.equals = function(t) {
      return this.toRgbString() === new e(t).toRgbString();
    }, e;
  })()
);
function Mn(e, t = 20) {
  return e.mix("#141414", t).toString();
}
function _x(e) {
  const t = bs(), n = Te("button");
  return I(() => {
    let r = {};
    const s = e.color;
    if (s) {
      const o = new vx(s), i = e.dark ? o.tint(20).toString() : Mn(o, 20);
      if (e.plain)
        r = n.cssVarBlock({
          "bg-color": e.dark ? Mn(o, 90) : o.tint(90).toString(),
          "text-color": s,
          "border-color": e.dark ? Mn(o, 50) : o.tint(50).toString(),
          "hover-text-color": `var(${n.cssVarName("color-white")})`,
          "hover-bg-color": s,
          "hover-border-color": s,
          "active-bg-color": i,
          "active-text-color": `var(${n.cssVarName("color-white")})`,
          "active-border-color": i
        }), t.value && (r[n.cssVarBlockName("disabled-bg-color")] = e.dark ? Mn(o, 90) : o.tint(90).toString(), r[n.cssVarBlockName("disabled-text-color")] = e.dark ? Mn(o, 50) : o.tint(50).toString(), r[n.cssVarBlockName("disabled-border-color")] = e.dark ? Mn(o, 80) : o.tint(80).toString());
      else {
        const a = e.dark ? Mn(o, 30) : o.tint(30).toString(), c = o.isDark() ? `var(${n.cssVarName("color-white")})` : `var(${n.cssVarName("color-black")})`;
        if (r = n.cssVarBlock({
          "bg-color": s,
          "text-color": c,
          "border-color": s,
          "hover-bg-color": a,
          "hover-text-color": c,
          "hover-border-color": a,
          "active-bg-color": i,
          "active-border-color": i
        }), t.value) {
          const u = e.dark ? Mn(o, 50) : o.tint(50).toString();
          r[n.cssVarBlockName("disabled-bg-color")] = u, r[n.cssVarBlockName("disabled-text-color")] = e.dark ? "rgba(255, 255, 255, 0.5)" : `var(${n.cssVarName("color-white")})`, r[n.cssVarBlockName("disabled-border-color")] = u;
        }
      }
    }
    return r;
  });
}
const bx = Z({
  name: "ElButton"
}), yx = /* @__PURE__ */ Z({
  ...bx,
  props: Ac,
  emits: ox,
  setup(e, { expose: t, emit: n }) {
    const r = e, s = _x(r), o = Te("button"), { _ref: i, _size: a, _type: c, _disabled: u, _props: d, shouldAddSpace: l, handleClick: m } = tx(r, n);
    return t({
      ref: i,
      size: a,
      type: c,
      disabled: u,
      shouldAddSpace: l
    }), (f, v) => (b(), Y(ht(f.tag), We({
      ref_key: "_ref",
      ref: i
    }, _(d), {
      class: [
        _(o).b(),
        _(o).m(_(c)),
        _(o).m(_(a)),
        _(o).is("disabled", _(u)),
        _(o).is("loading", f.loading),
        _(o).is("plain", f.plain),
        _(o).is("round", f.round),
        _(o).is("circle", f.circle),
        _(o).is("text", f.text),
        _(o).is("link", f.link),
        _(o).is("has-bg", f.bg)
      ],
      style: _(s),
      onClick: _(m)
    }), {
      default: J(() => [
        f.loading ? (b(), C(He, { key: 0 }, [
          f.$slots.loading ? ae(f.$slots, "loading", { key: 0 }) : (b(), Y(_(kt), {
            key: 1,
            class: H(_(o).is("loading"))
          }, {
            default: J(() => [
              (b(), Y(ht(f.loadingIcon)))
            ]),
            _: 1
          }, 8, ["class"]))
        ], 64)) : f.icon || f.$slots.icon ? (b(), Y(_(kt), { key: 1 }, {
          default: J(() => [
            f.icon ? (b(), Y(ht(f.icon), { key: 0 })) : ae(f.$slots, "icon", { key: 1 })
          ]),
          _: 3
        })) : te("v-if", !0),
        f.$slots.default ? (b(), C("span", {
          key: 2,
          class: H({ [_(o).em("text", "expand")]: _(l) })
        }, [
          ae(f.$slots, "default")
        ], 2)) : te("v-if", !0)
      ]),
      _: 3
    }, 16, ["class", "style", "onClick"]));
  }
});
var wx = /* @__PURE__ */ Ce(yx, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
const kx = {
  size: Ac.size,
  type: Ac.type
}, xx = Z({
  name: "ElButtonGroup"
}), Cx = /* @__PURE__ */ Z({
  ...xx,
  props: kx,
  setup(e) {
    const t = e;
    St(Hh, zn({
      size: Bt(t, "size"),
      type: Bt(t, "type")
    }));
    const n = Te("button");
    return (r, s) => (b(), C("div", {
      class: H(`${_(n).b("group")}`)
    }, [
      ae(r.$slots, "default")
    ], 2));
  }
});
var Vh = /* @__PURE__ */ Ce(Cx, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
const ud = jt(wx, {
  ButtonGroup: Vh
});
gs(Vh);
const Tn = /* @__PURE__ */ new Map();
let dd;
gt && (document.addEventListener("mousedown", (e) => dd = e), document.addEventListener("mouseup", (e) => {
  for (const t of Tn.values())
    for (const { documentHandler: n } of t)
      n(e, dd);
}));
function fd(e, t) {
  let n = [];
  return Array.isArray(t.arg) ? n = t.arg : eo(t.arg) && n.push(t.arg), function(r, s) {
    const o = t.instance.popperRef, i = r.target, a = s == null ? void 0 : s.target, c = !t || !t.instance, u = !i || !a, d = e.contains(i) || e.contains(a), l = e === i, m = n.length && n.some((v) => v == null ? void 0 : v.contains(i)) || n.length && n.includes(a), f = o && (o.contains(i) || o.contains(a));
    c || u || d || l || m || f || t.value(r, s);
  };
}
const Uh = {
  beforeMount(e, t) {
    Tn.has(e) || Tn.set(e, []), Tn.get(e).push({
      documentHandler: fd(e, t),
      bindingFn: t.value
    });
  },
  updated(e, t) {
    Tn.has(e) || Tn.set(e, []);
    const n = Tn.get(e), r = n.findIndex((o) => o.bindingFn === t.oldValue), s = {
      documentHandler: fd(e, t),
      bindingFn: t.value
    };
    r >= 0 ? n.splice(r, 1, s) : n.push(s);
  },
  unmounted(e) {
    Tn.delete(e);
  }
}, Zh = Re({
  type: {
    type: String,
    values: ["success", "info", "warning", "danger", ""],
    default: ""
  },
  closable: Boolean,
  disableTransitions: Boolean,
  hit: Boolean,
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    values: lo,
    default: ""
  },
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  },
  round: Boolean
}), Sx = {
  close: (e) => e instanceof MouseEvent,
  click: (e) => e instanceof MouseEvent
}, Ex = Z({
  name: "ElTag"
}), Ax = /* @__PURE__ */ Z({
  ...Ex,
  props: Zh,
  emits: Sx,
  setup(e, { emit: t }) {
    const n = e, r = po(), s = Te("tag"), o = I(() => {
      const { type: c, hit: u, effect: d, closable: l, round: m } = n;
      return [
        s.b(),
        s.is("closable", l),
        s.m(c),
        s.m(r.value),
        s.m(d),
        s.is("hit", u),
        s.is("round", m)
      ];
    }), i = (c) => {
      t("close", c);
    }, a = (c) => {
      t("click", c);
    };
    return (c, u) => c.disableTransitions ? (b(), C("span", {
      key: 0,
      class: H(_(o)),
      style: Ue({ backgroundColor: c.color }),
      onClick: a
    }, [
      p("span", {
        class: H(_(s).e("content"))
      }, [
        ae(c.$slots, "default")
      ], 2),
      c.closable ? (b(), Y(_(kt), {
        key: 0,
        class: H(_(s).e("close")),
        onClick: tt(i, ["stop"])
      }, {
        default: J(() => [
          he(_(Sc))
        ]),
        _: 1
      }, 8, ["class", "onClick"])) : te("v-if", !0)
    ], 6)) : (b(), Y(er, {
      key: 1,
      name: `${_(s).namespace.value}-zoom-in-center`,
      appear: ""
    }, {
      default: J(() => [
        p("span", {
          class: H(_(o)),
          style: Ue({ backgroundColor: c.color }),
          onClick: a
        }, [
          p("span", {
            class: H(_(s).e("content"))
          }, [
            ae(c.$slots, "default")
          ], 2),
          c.closable ? (b(), Y(_(kt), {
            key: 0,
            class: H(_(s).e("close")),
            onClick: tt(i, ["stop"])
          }, {
            default: J(() => [
              he(_(Sc))
            ]),
            _: 1
          }, 8, ["class", "onClick"])) : te("v-if", !0)
        ], 6)
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
var $x = /* @__PURE__ */ Ce(Ax, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]);
const Mx = jt($x), Ix = Re({
  color: {
    type: be(Object),
    required: !0
  },
  vertical: {
    type: Boolean,
    default: !1
  }
});
let Gs = !1;
function so(e, t) {
  if (!gt)
    return;
  const n = function(o) {
    var i;
    (i = t.drag) == null || i.call(t, o);
  }, r = function(o) {
    var i;
    document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", r), document.removeEventListener("touchmove", n), document.removeEventListener("touchend", r), document.onselectstart = null, document.ondragstart = null, Gs = !1, (i = t.end) == null || i.call(t, o);
  }, s = function(o) {
    var i;
    Gs || (o.preventDefault(), document.onselectstart = () => !1, document.ondragstart = () => !1, document.addEventListener("mousemove", n), document.addEventListener("mouseup", r), document.addEventListener("touchmove", n), document.addEventListener("touchend", r), Gs = !0, (i = t.start) == null || i.call(t, o));
  };
  e.addEventListener("mousedown", s), e.addEventListener("touchstart", s);
}
const Tx = (e) => {
  const t = lt(), n = mn(), r = mn();
  function s(i) {
    i.target !== n.value && o(i);
  }
  function o(i) {
    if (!r.value || !n.value)
      return;
    const c = t.vnode.el.getBoundingClientRect(), { clientX: u, clientY: d } = el(i);
    if (e.vertical) {
      let l = d - c.top;
      l = Math.max(n.value.offsetHeight / 2, l), l = Math.min(l, c.height - n.value.offsetHeight / 2), e.color.set("alpha", Math.round((l - n.value.offsetHeight / 2) / (c.height - n.value.offsetHeight) * 100));
    } else {
      let l = u - c.left;
      l = Math.max(n.value.offsetWidth / 2, l), l = Math.min(l, c.width - n.value.offsetWidth / 2), e.color.set("alpha", Math.round((l - n.value.offsetWidth / 2) / (c.width - n.value.offsetWidth) * 100));
    }
  }
  return {
    thumb: n,
    bar: r,
    handleDrag: o,
    handleClick: s
  };
}, Lx = (e, {
  bar: t,
  thumb: n,
  handleDrag: r
}) => {
  const s = lt(), o = Te("color-alpha-slider"), i = D(0), a = D(0), c = D();
  function u() {
    if (!n.value || e.vertical)
      return 0;
    const w = s.vnode.el, k = e.color.get("alpha");
    return w ? Math.round(k * (w.offsetWidth - n.value.offsetWidth / 2) / 100) : 0;
  }
  function d() {
    if (!n.value)
      return 0;
    const w = s.vnode.el;
    if (!e.vertical)
      return 0;
    const k = e.color.get("alpha");
    return w ? Math.round(k * (w.offsetHeight - n.value.offsetHeight / 2) / 100) : 0;
  }
  function l() {
    if (e.color && e.color.value) {
      const { r: w, g: k, b: x } = e.color.toRgb();
      return `linear-gradient(to right, rgba(${w}, ${k}, ${x}, 0) 0%, rgba(${w}, ${k}, ${x}, 1) 100%)`;
    }
    return "";
  }
  function m() {
    i.value = u(), a.value = d(), c.value = l();
  }
  je(() => {
    if (!t.value || !n.value)
      return;
    const w = {
      drag: (k) => {
        r(k);
      },
      end: (k) => {
        r(k);
      }
    };
    so(t.value, w), so(n.value, w), m();
  }), ue(() => e.color.get("alpha"), () => m()), ue(() => e.color.value, () => m());
  const f = I(() => [o.b(), o.is("vertical", e.vertical)]), v = I(() => o.e("bar")), g = I(() => o.e("thumb")), y = I(() => ({ background: c.value })), h = I(() => ({
    left: yr(i.value),
    top: yr(a.value)
  }));
  return { rootKls: f, barKls: v, barStyle: y, thumbKls: g, thumbStyle: h, update: m };
}, Ox = "ElColorAlphaSlider", Rx = Z({
  name: Ox
}), Px = /* @__PURE__ */ Z({
  ...Rx,
  props: Ix,
  setup(e, { expose: t }) {
    const n = e, { bar: r, thumb: s, handleDrag: o, handleClick: i } = Tx(n), { rootKls: a, barKls: c, barStyle: u, thumbKls: d, thumbStyle: l, update: m } = Lx(n, {
      bar: r,
      thumb: s,
      handleDrag: o
    });
    return t({
      update: m,
      bar: r,
      thumb: s
    }), (f, v) => (b(), C("div", {
      class: H(_(a))
    }, [
      p("div", {
        ref_key: "bar",
        ref: r,
        class: H(_(c)),
        style: Ue(_(u)),
        onClick: v[0] || (v[0] = (...g) => _(i) && _(i)(...g))
      }, null, 6),
      p("div", {
        ref_key: "thumb",
        ref: s,
        class: H(_(d)),
        style: Ue(_(l))
      }, null, 6)
    ], 2));
  }
});
var Bx = /* @__PURE__ */ Ce(Px, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/alpha-slider.vue"]]);
const zx = Z({
  name: "ElColorHueSlider",
  props: {
    color: {
      type: Object,
      required: !0
    },
    vertical: Boolean
  },
  setup(e) {
    const t = Te("color-hue-slider"), n = lt(), r = D(), s = D(), o = D(0), i = D(0), a = I(() => e.color.get("hue"));
    ue(() => a.value, () => {
      m();
    });
    function c(f) {
      f.target !== r.value && u(f);
    }
    function u(f) {
      if (!s.value || !r.value)
        return;
      const g = n.vnode.el.getBoundingClientRect(), { clientX: y, clientY: h } = el(f);
      let w;
      if (e.vertical) {
        let k = h - g.top;
        k = Math.min(k, g.height - r.value.offsetHeight / 2), k = Math.max(r.value.offsetHeight / 2, k), w = Math.round((k - r.value.offsetHeight / 2) / (g.height - r.value.offsetHeight) * 360);
      } else {
        let k = y - g.left;
        k = Math.min(k, g.width - r.value.offsetWidth / 2), k = Math.max(r.value.offsetWidth / 2, k), w = Math.round((k - r.value.offsetWidth / 2) / (g.width - r.value.offsetWidth) * 360);
      }
      e.color.set("hue", w);
    }
    function d() {
      if (!r.value)
        return 0;
      const f = n.vnode.el;
      if (e.vertical)
        return 0;
      const v = e.color.get("hue");
      return f ? Math.round(v * (f.offsetWidth - r.value.offsetWidth / 2) / 360) : 0;
    }
    function l() {
      if (!r.value)
        return 0;
      const f = n.vnode.el;
      if (!e.vertical)
        return 0;
      const v = e.color.get("hue");
      return f ? Math.round(v * (f.offsetHeight - r.value.offsetHeight / 2) / 360) : 0;
    }
    function m() {
      o.value = d(), i.value = l();
    }
    return je(() => {
      if (!s.value || !r.value)
        return;
      const f = {
        drag: (v) => {
          u(v);
        },
        end: (v) => {
          u(v);
        }
      };
      so(s.value, f), so(r.value, f), m();
    }), {
      bar: s,
      thumb: r,
      thumbLeft: o,
      thumbTop: i,
      hueValue: a,
      handleClick: c,
      update: m,
      ns: t
    };
  }
});
function Dx(e, t, n, r, s, o) {
  return b(), C("div", {
    class: H([e.ns.b(), e.ns.is("vertical", e.vertical)])
  }, [
    p("div", {
      ref: "bar",
      class: H(e.ns.e("bar")),
      onClick: t[0] || (t[0] = (...i) => e.handleClick && e.handleClick(...i))
    }, null, 2),
    p("div", {
      ref: "thumb",
      class: H(e.ns.e("thumb")),
      style: Ue({
        left: e.thumbLeft + "px",
        top: e.thumbTop + "px"
      })
    }, null, 6)
  ], 2);
}
var Nx = /* @__PURE__ */ Ce(zx, [["render", Dx], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/hue-slider.vue"]]);
const qx = Re({
  modelValue: String,
  id: String,
  showAlpha: Boolean,
  colorFormat: String,
  disabled: Boolean,
  size: vl,
  popperClass: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  predefine: {
    type: be(Array)
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), Fx = {
  [wt]: (e) => Yt(e) || Jn(e),
  [il]: (e) => Yt(e) || Jn(e),
  activeChange: (e) => Yt(e) || Jn(e),
  focus: (e) => e instanceof FocusEvent,
  blur: (e) => e instanceof FocusEvent
}, Wh = Symbol("colorPickerContextKey"), pd = function(e, t, n) {
  return [
    e,
    t * n / ((e = (2 - t) * n) < 1 ? e : 2 - e) || 0,
    e / 2
  ];
}, Hx = function(e) {
  return typeof e == "string" && e.includes(".") && Number.parseFloat(e) === 1;
}, jx = function(e) {
  return typeof e == "string" && e.includes("%");
}, gr = function(e, t) {
  Hx(e) && (e = "100%");
  const n = jx(e);
  return e = Math.min(t, Math.max(0, Number.parseFloat(`${e}`))), n && (e = Number.parseInt(`${e * t}`, 10) / 100), Math.abs(e - t) < 1e-6 ? 1 : e % t / Number.parseFloat(t);
}, hd = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F"
}, Bo = (e) => {
  e = Math.min(Math.round(e), 255);
  const t = Math.floor(e / 16), n = e % 16;
  return `${hd[t] || t}${hd[n] || n}`;
}, gd = function({ r: e, g: t, b: n }) {
  return Number.isNaN(+e) || Number.isNaN(+t) || Number.isNaN(+n) ? "" : `#${Bo(e)}${Bo(t)}${Bo(n)}`;
}, Ks = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15
}, Zn = function(e) {
  return e.length === 2 ? (Ks[e[0].toUpperCase()] || +e[0]) * 16 + (Ks[e[1].toUpperCase()] || +e[1]) : Ks[e[1].toUpperCase()] || +e[1];
}, Vx = function(e, t, n) {
  t = t / 100, n = n / 100;
  let r = t;
  const s = Math.max(n, 0.01);
  n *= 2, t *= n <= 1 ? n : 2 - n, r *= s <= 1 ? s : 2 - s;
  const o = (n + t) / 2, i = n === 0 ? 2 * r / (s + r) : 2 * t / (n + t);
  return {
    h: e,
    s: i * 100,
    v: o * 100
  };
}, md = (e, t, n) => {
  e = gr(e, 255), t = gr(t, 255), n = gr(n, 255);
  const r = Math.max(e, t, n), s = Math.min(e, t, n);
  let o;
  const i = r, a = r - s, c = r === 0 ? 0 : a / r;
  if (r === s)
    o = 0;
  else {
    switch (r) {
      case e: {
        o = (t - n) / a + (t < n ? 6 : 0);
        break;
      }
      case t: {
        o = (n - e) / a + 2;
        break;
      }
      case n: {
        o = (e - t) / a + 4;
        break;
      }
    }
    o /= 6;
  }
  return { h: o * 360, s: c * 100, v: i * 100 };
}, Dr = function(e, t, n) {
  e = gr(e, 360) * 6, t = gr(t, 100), n = gr(n, 100);
  const r = Math.floor(e), s = e - r, o = n * (1 - t), i = n * (1 - s * t), a = n * (1 - (1 - s) * t), c = r % 6, u = [n, i, o, o, a, n][c], d = [a, n, n, i, o, o][c], l = [o, o, a, n, n, i][c];
  return {
    r: Math.round(u * 255),
    g: Math.round(d * 255),
    b: Math.round(l * 255)
  };
};
class Zr {
  constructor(t = {}) {
    this._hue = 0, this._saturation = 100, this._value = 100, this._alpha = 100, this.enableAlpha = !1, this.format = "hex", this.value = "";
    for (const n in t)
      Uo(t, n) && (this[n] = t[n]);
    t.value ? this.fromString(t.value) : this.doOnChange();
  }
  set(t, n) {
    if (arguments.length === 1 && typeof t == "object") {
      for (const r in t)
        Uo(t, r) && this.set(r, t[r]);
      return;
    }
    this[`_${t}`] = n, this.doOnChange();
  }
  get(t) {
    return t === "alpha" ? Math.floor(this[`_${t}`]) : this[`_${t}`];
  }
  toRgb() {
    return Dr(this._hue, this._saturation, this._value);
  }
  fromString(t) {
    if (!t) {
      this._hue = 0, this._saturation = 100, this._value = 100, this.doOnChange();
      return;
    }
    const n = (r, s, o) => {
      this._hue = Math.max(0, Math.min(360, r)), this._saturation = Math.max(0, Math.min(100, s)), this._value = Math.max(0, Math.min(100, o)), this.doOnChange();
    };
    if (t.includes("hsl")) {
      const r = t.replace(/hsla|hsl|\(|\)/gm, "").split(/\s|,/g).filter((s) => s !== "").map((s, o) => o > 2 ? Number.parseFloat(s) : Number.parseInt(s, 10));
      if (r.length === 4 ? this._alpha = Number.parseFloat(r[3]) * 100 : r.length === 3 && (this._alpha = 100), r.length >= 3) {
        const { h: s, s: o, v: i } = Vx(r[0], r[1], r[2]);
        n(s, o, i);
      }
    } else if (t.includes("hsv")) {
      const r = t.replace(/hsva|hsv|\(|\)/gm, "").split(/\s|,/g).filter((s) => s !== "").map((s, o) => o > 2 ? Number.parseFloat(s) : Number.parseInt(s, 10));
      r.length === 4 ? this._alpha = Number.parseFloat(r[3]) * 100 : r.length === 3 && (this._alpha = 100), r.length >= 3 && n(r[0], r[1], r[2]);
    } else if (t.includes("rgb")) {
      const r = t.replace(/rgba|rgb|\(|\)/gm, "").split(/\s|,/g).filter((s) => s !== "").map((s, o) => o > 2 ? Number.parseFloat(s) : Number.parseInt(s, 10));
      if (r.length === 4 ? this._alpha = Number.parseFloat(r[3]) * 100 : r.length === 3 && (this._alpha = 100), r.length >= 3) {
        const { h: s, s: o, v: i } = md(r[0], r[1], r[2]);
        n(s, o, i);
      }
    } else if (t.includes("#")) {
      const r = t.replace("#", "").trim();
      if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(r))
        return;
      let s, o, i;
      r.length === 3 ? (s = Zn(r[0] + r[0]), o = Zn(r[1] + r[1]), i = Zn(r[2] + r[2])) : (r.length === 6 || r.length === 8) && (s = Zn(r.slice(0, 2)), o = Zn(r.slice(2, 4)), i = Zn(r.slice(4, 6))), r.length === 8 ? this._alpha = Zn(r.slice(6)) / 255 * 100 : (r.length === 3 || r.length === 6) && (this._alpha = 100);
      const { h: a, s: c, v: u } = md(s, o, i);
      n(a, c, u);
    }
  }
  compare(t) {
    return Math.abs(t._hue - this._hue) < 2 && Math.abs(t._saturation - this._saturation) < 1 && Math.abs(t._value - this._value) < 1 && Math.abs(t._alpha - this._alpha) < 1;
  }
  doOnChange() {
    const { _hue: t, _saturation: n, _value: r, _alpha: s, format: o } = this;
    if (this.enableAlpha)
      switch (o) {
        case "hsl": {
          const i = pd(t, n / 100, r / 100);
          this.value = `hsla(${t}, ${Math.round(i[1] * 100)}%, ${Math.round(i[2] * 100)}%, ${this.get("alpha") / 100})`;
          break;
        }
        case "hsv": {
          this.value = `hsva(${t}, ${Math.round(n)}%, ${Math.round(r)}%, ${this.get("alpha") / 100})`;
          break;
        }
        case "hex": {
          this.value = `${gd(Dr(t, n, r))}${Bo(s * 255 / 100)}`;
          break;
        }
        default: {
          const { r: i, g: a, b: c } = Dr(t, n, r);
          this.value = `rgba(${i}, ${a}, ${c}, ${this.get("alpha") / 100})`;
        }
      }
    else
      switch (o) {
        case "hsl": {
          const i = pd(t, n / 100, r / 100);
          this.value = `hsl(${t}, ${Math.round(i[1] * 100)}%, ${Math.round(i[2] * 100)}%)`;
          break;
        }
        case "hsv": {
          this.value = `hsv(${t}, ${Math.round(n)}%, ${Math.round(r)}%)`;
          break;
        }
        case "rgb": {
          const { r: i, g: a, b: c } = Dr(t, n, r);
          this.value = `rgb(${i}, ${a}, ${c})`;
          break;
        }
        default:
          this.value = gd(Dr(t, n, r));
      }
  }
}
const Ux = Z({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    color: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = Te("color-predefine"), { currentColor: n } = Le(Wh), r = D(o(e.colors, e.color));
    ue(() => n.value, (i) => {
      const a = new Zr();
      a.fromString(i), r.value.forEach((c) => {
        c.selected = a.compare(c);
      });
    }), Gc(() => {
      r.value = o(e.colors, e.color);
    });
    function s(i) {
      e.color.fromString(e.colors[i]);
    }
    function o(i, a) {
      return i.map((c) => {
        const u = new Zr();
        return u.enableAlpha = !0, u.format = "rgba", u.fromString(c), u.selected = u.value === a.value, u;
      });
    }
    return {
      rgbaColors: r,
      handleSelect: s,
      ns: t
    };
  }
}), Zx = ["onClick"];
function Wx(e, t, n, r, s, o) {
  return b(), C("div", {
    class: H(e.ns.b())
  }, [
    p("div", {
      class: H(e.ns.e("colors"))
    }, [
      (b(!0), C(He, null, ot(e.rgbaColors, (i, a) => (b(), C("div", {
        key: e.colors[a],
        class: H([
          e.ns.e("color-selector"),
          e.ns.is("alpha", i._alpha < 100),
          { selected: i.selected }
        ]),
        onClick: (c) => e.handleSelect(a)
      }, [
        p("div", {
          style: Ue({ backgroundColor: i.value })
        }, null, 4)
      ], 10, Zx))), 128))
    ], 2)
  ], 2);
}
var Gx = /* @__PURE__ */ Ce(Ux, [["render", Wx], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/predefine.vue"]]);
const Kx = Z({
  name: "ElSlPanel",
  props: {
    color: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const t = Te("color-svpanel"), n = lt(), r = D(0), s = D(0), o = D("hsl(0, 100%, 50%)"), i = I(() => {
      const u = e.color.get("hue"), d = e.color.get("value");
      return { hue: u, value: d };
    });
    function a() {
      const u = e.color.get("saturation"), d = e.color.get("value"), l = n.vnode.el, { clientWidth: m, clientHeight: f } = l;
      s.value = u * m / 100, r.value = (100 - d) * f / 100, o.value = `hsl(${e.color.get("hue")}, 100%, 50%)`;
    }
    function c(u) {
      const l = n.vnode.el.getBoundingClientRect(), { clientX: m, clientY: f } = el(u);
      let v = m - l.left, g = f - l.top;
      v = Math.max(0, v), v = Math.min(v, l.width), g = Math.max(0, g), g = Math.min(g, l.height), s.value = v, r.value = g, e.color.set({
        saturation: v / l.width * 100,
        value: 100 - g / l.height * 100
      });
    }
    return ue(() => i.value, () => {
      a();
    }), je(() => {
      so(n.vnode.el, {
        drag: (u) => {
          c(u);
        },
        end: (u) => {
          c(u);
        }
      }), a();
    }), {
      cursorTop: r,
      cursorLeft: s,
      background: o,
      colorValue: i,
      handleDrag: c,
      update: a,
      ns: t
    };
  }
}), Xx = /* @__PURE__ */ p("div", null, null, -1), Yx = [
  Xx
];
function Jx(e, t, n, r, s, o) {
  return b(), C("div", {
    class: H(e.ns.b()),
    style: Ue({
      backgroundColor: e.background
    })
  }, [
    p("div", {
      class: H(e.ns.e("white"))
    }, null, 2),
    p("div", {
      class: H(e.ns.e("black"))
    }, null, 2),
    p("div", {
      class: H(e.ns.e("cursor")),
      style: Ue({
        top: e.cursorTop + "px",
        left: e.cursorLeft + "px"
      })
    }, Yx, 6)
  ], 6);
}
var Qx = /* @__PURE__ */ Ce(Kx, [["render", Jx], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/components/sv-panel.vue"]]);
const e8 = ["onKeydown"], t8 = ["id", "aria-label", "aria-labelledby", "aria-description", "aria-disabled", "tabindex"], n8 = Z({
  name: "ElColorPicker"
}), r8 = /* @__PURE__ */ Z({
  ...n8,
  props: qx,
  emits: Fx,
  setup(e, { expose: t, emit: n }) {
    const r = e, { t: s } = tn(), o = Te("color"), { formItem: i } = ys(), a = po(), c = bs(), { inputId: u, isLabeledByFormItem: d } = Oh(r, {
      formItemContext: i
    }), l = D(), m = D(), f = D(), v = D(), g = D(), y = D(), {
      isFocused: h,
      handleFocus: w,
      handleBlur: k
    } = Lh(g, {
      beforeBlur(re) {
        var pe;
        return (pe = v.value) == null ? void 0 : pe.isFocusInsideContent(re);
      },
      afterBlur() {
        N(!1), T();
      }
    }), x = (re) => {
      if (c.value)
        return Ke();
      w(re);
    };
    let A = !0;
    const S = zn(new Zr({
      enableAlpha: r.showAlpha,
      format: r.colorFormat || "",
      value: r.modelValue
    })), $ = D(!1), M = D(!1), P = D(""), R = I(() => !r.modelValue && !M.value ? "transparent" : Q(S, r.showAlpha)), B = I(() => !r.modelValue && !M.value ? "" : S.value), j = I(() => d.value ? void 0 : r.label || s("el.colorpicker.defaultLabel")), ie = I(() => d.value ? i == null ? void 0 : i.labelId : void 0), z = I(() => [
      o.b("picker"),
      o.is("disabled", c.value),
      o.bm("picker", a.value),
      o.is("focused", h.value)
    ]);
    function Q(re, pe) {
      if (!(re instanceof Zr))
        throw new TypeError("color should be instance of _color Class");
      const { r: Se, g: ze, b: Ge } = re.toRgb();
      return pe ? `rgba(${Se}, ${ze}, ${Ge}, ${re.get("alpha") / 100})` : `rgb(${Se}, ${ze}, ${Ge})`;
    }
    function N(re) {
      $.value = re;
    }
    const V = xc(N, 100, { leading: !0 });
    function F() {
      c.value || N(!0);
    }
    function G() {
      V(!1), T();
    }
    function T() {
      Me(() => {
        r.modelValue ? S.fromString(r.modelValue) : (S.value = "", Me(() => {
          M.value = !1;
        }));
      });
    }
    function W() {
      c.value || V(!$.value);
    }
    function U() {
      S.fromString(P.value);
    }
    function se() {
      const re = S.value;
      n(wt, re), n("change", re), r.validateEvent && (i == null || i.validate("change").catch((pe) => void 0)), V(!1), Me(() => {
        const pe = new Zr({
          enableAlpha: r.showAlpha,
          format: r.colorFormat || "",
          value: r.modelValue
        });
        S.compare(pe) || T();
      });
    }
    function de() {
      V(!1), n(wt, null), n("change", null), r.modelValue !== null && r.validateEvent && (i == null || i.validate("change").catch((re) => void 0)), T();
    }
    function ve(re) {
      if ($.value && (G(), h.value)) {
        const pe = new FocusEvent("focus", re);
        k(pe);
      }
    }
    function we(re) {
      re.preventDefault(), re.stopPropagation(), N(!1), T();
    }
    function Be(re) {
      switch (re.code) {
        case _n.enter:
        case _n.space:
          re.preventDefault(), re.stopPropagation(), F(), y.value.focus();
          break;
        case _n.esc:
          we(re);
          break;
      }
    }
    function Oe() {
      g.value.focus();
    }
    function Ke() {
      g.value.blur();
    }
    return je(() => {
      r.modelValue && (P.value = B.value);
    }), ue(() => r.modelValue, (re) => {
      re ? re && re !== S.value && (A = !1, S.fromString(re)) : M.value = !1;
    }), ue(() => B.value, (re) => {
      P.value = re, A && n("activeChange", re), A = !0;
    }), ue(() => S.value, () => {
      !r.modelValue && !M.value && (M.value = !0);
    }), ue(() => $.value, () => {
      Me(() => {
        var re, pe, Se;
        (re = l.value) == null || re.update(), (pe = m.value) == null || pe.update(), (Se = f.value) == null || Se.update();
      });
    }), St(Wh, {
      currentColor: B
    }), t({
      color: S,
      show: F,
      hide: G,
      focus: Oe,
      blur: Ke
    }), (re, pe) => (b(), Y(_(oo), {
      ref_key: "popper",
      ref: v,
      visible: $.value,
      "show-arrow": !1,
      "fallback-placements": ["bottom", "top", "right", "left"],
      offset: 0,
      "gpu-acceleration": !1,
      "popper-class": [_(o).be("picker", "panel"), _(o).b("dropdown"), re.popperClass],
      "stop-popper-mouse-event": !1,
      effect: "light",
      trigger: "click",
      transition: `${_(o).namespace.value}-zoom-in-top`,
      persistent: "",
      onHide: pe[2] || (pe[2] = (Se) => N(!1))
    }, {
      content: J(() => [
        rt((b(), C("div", {
          onKeydown: ft(we, ["esc"])
        }, [
          p("div", {
            class: H(_(o).be("dropdown", "main-wrapper"))
          }, [
            he(Nx, {
              ref_key: "hue",
              ref: l,
              class: "hue-slider",
              color: _(S),
              vertical: ""
            }, null, 8, ["color"]),
            he(Qx, {
              ref_key: "sv",
              ref: m,
              color: _(S)
            }, null, 8, ["color"])
          ], 2),
          re.showAlpha ? (b(), Y(Bx, {
            key: 0,
            ref_key: "alpha",
            ref: f,
            color: _(S)
          }, null, 8, ["color"])) : te("v-if", !0),
          re.predefine ? (b(), Y(Gx, {
            key: 1,
            ref: "predefine",
            color: _(S),
            colors: re.predefine
          }, null, 8, ["color", "colors"])) : te("v-if", !0),
          p("div", {
            class: H(_(o).be("dropdown", "btns"))
          }, [
            p("span", {
              class: H(_(o).be("dropdown", "value"))
            }, [
              he(_(ws), {
                ref_key: "inputRef",
                ref: y,
                modelValue: P.value,
                "onUpdate:modelValue": pe[0] || (pe[0] = (Se) => P.value = Se),
                "validate-event": !1,
                size: "small",
                onKeyup: ft(U, ["enter"]),
                onBlur: U
              }, null, 8, ["modelValue", "onKeyup"])
            ], 2),
            he(_(ud), {
              class: H(_(o).be("dropdown", "link-btn")),
              text: "",
              size: "small",
              onClick: de
            }, {
              default: J(() => [
                mr(ke(_(s)("el.colorpicker.clear")), 1)
              ]),
              _: 1
            }, 8, ["class"]),
            he(_(ud), {
              plain: "",
              size: "small",
              class: H(_(o).be("dropdown", "btn")),
              onClick: se
            }, {
              default: J(() => [
                mr(ke(_(s)("el.colorpicker.confirm")), 1)
              ]),
              _: 1
            }, 8, ["class"])
          ], 2)
        ], 40, e8)), [
          [_(Uh), ve]
        ])
      ]),
      default: J(() => [
        p("div", {
          id: _(u),
          ref_key: "triggerRef",
          ref: g,
          class: H(_(z)),
          role: "button",
          "aria-label": _(j),
          "aria-labelledby": _(ie),
          "aria-description": _(s)("el.colorpicker.description", { color: re.modelValue || "" }),
          "aria-disabled": _(c),
          tabindex: _(c) ? -1 : re.tabindex,
          onKeydown: Be,
          onFocus: x,
          onBlur: pe[1] || (pe[1] = (...Se) => _(k) && _(k)(...Se))
        }, [
          _(c) ? (b(), C("div", {
            key: 0,
            class: H(_(o).be("picker", "mask"))
          }, null, 2)) : te("v-if", !0),
          p("div", {
            class: H(_(o).be("picker", "trigger")),
            onClick: W
          }, [
            p("span", {
              class: H([_(o).be("picker", "color"), _(o).is("alpha", re.showAlpha)])
            }, [
              p("span", {
                class: H(_(o).be("picker", "color-inner")),
                style: Ue({
                  backgroundColor: _(R)
                })
              }, [
                rt(he(_(kt), {
                  class: H([_(o).be("picker", "icon"), _(o).is("icon-arrow-down")])
                }, {
                  default: J(() => [
                    he(_(dh))
                  ]),
                  _: 1
                }, 8, ["class"]), [
                  [Qt, re.modelValue || M.value]
                ]),
                rt(he(_(kt), {
                  class: H([_(o).be("picker", "empty"), _(o).is("icon-close")])
                }, {
                  default: J(() => [
                    he(_(Sc))
                  ]),
                  _: 1
                }, 8, ["class"]), [
                  [Qt, !re.modelValue && !M.value]
                ])
              ], 6)
            ], 2)
          ], 2)
        ], 42, t8)
      ]),
      _: 1
    }, 8, ["visible", "popper-class", "transition"]));
  }
});
var o8 = /* @__PURE__ */ Ce(r8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/color-picker.vue"]]);
const s8 = jt(o8), i8 = /* @__PURE__ */ Z({
  inheritAttrs: !1
});
function a8(e, t, n, r, s, o) {
  return ae(e.$slots, "default");
}
var c8 = /* @__PURE__ */ Ce(i8, [["render", a8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);
const l8 = /* @__PURE__ */ Z({
  name: "ElCollectionItem",
  inheritAttrs: !1
});
function u8(e, t, n, r, s, o) {
  return ae(e.$slots, "default");
}
var d8 = /* @__PURE__ */ Ce(l8, [["render", u8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);
const f8 = "data-el-collection-item", p8 = (e) => {
  const t = `El${e}Collection`, n = `${t}Item`, r = Symbol(t), s = Symbol(n), o = {
    ...c8,
    name: t,
    setup() {
      const a = D(null), c = /* @__PURE__ */ new Map();
      St(r, {
        itemMap: c,
        getItems: () => {
          const d = _(a);
          if (!d)
            return [];
          const l = Array.from(d.querySelectorAll(`[${f8}]`));
          return [...c.values()].sort((f, v) => l.indexOf(f.ref) - l.indexOf(v.ref));
        },
        collectionRef: a
      });
    }
  }, i = {
    ...d8,
    name: n,
    setup(a, { attrs: c }) {
      const u = D(null), d = Le(r, void 0);
      St(s, {
        collectionItemRef: u
      }), je(() => {
        const l = _(u);
        l && d.itemMap.set(l, {
          ref: l,
          ...c
        });
      }), Ft(() => {
        const l = _(u);
        d.itemMap.delete(l);
      });
    }
  };
  return {
    COLLECTION_INJECTION_KEY: r,
    COLLECTION_ITEM_INJECTION_KEY: s,
    ElCollection: o,
    ElCollectionItem: i
  };
}, Xs = Re({
  trigger: ro.trigger,
  effect: {
    ...Tt.effect,
    default: "light"
  },
  type: {
    type: be(String)
  },
  placement: {
    type: be(String),
    default: "bottom"
  },
  popperOptions: {
    type: be(Object),
    default: () => ({})
  },
  id: String,
  size: {
    type: String,
    default: ""
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: !0
  },
  loop: {
    type: Boolean,
    default: !0
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  tabindex: {
    type: be([Number, String]),
    default: 0
  },
  maxHeight: {
    type: be([Number, String]),
    default: ""
  },
  popperClass: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  role: {
    type: String,
    default: "menu"
  },
  buttonProps: {
    type: be(Object)
  },
  teleported: Tt.teleported
});
Re({
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: en
  }
});
Re({
  onKeydown: { type: be(Function) }
});
p8("Dropdown");
const Gh = Symbol("elPaginationKey"), h8 = Re({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  prevText: {
    type: String
  },
  prevIcon: {
    type: en
  }
}), g8 = {
  click: (e) => e instanceof MouseEvent
}, m8 = ["disabled", "aria-label", "aria-disabled"], v8 = { key: 0 }, _8 = Z({
  name: "ElPaginationPrev"
}), b8 = /* @__PURE__ */ Z({
  ..._8,
  props: h8,
  emits: g8,
  setup(e) {
    const t = e, { t: n } = tn(), r = I(() => t.disabled || t.currentPage <= 1);
    return (s, o) => (b(), C("button", {
      type: "button",
      class: "btn-prev",
      disabled: _(r),
      "aria-label": s.prevText || _(n)("el.pagination.prev"),
      "aria-disabled": _(r),
      onClick: o[0] || (o[0] = (i) => s.$emit("click", i))
    }, [
      s.prevText ? (b(), C("span", v8, ke(s.prevText), 1)) : (b(), Y(_(kt), { key: 1 }, {
        default: J(() => [
          (b(), Y(ht(s.prevIcon)))
        ]),
        _: 1
      }))
    ], 8, m8));
  }
});
var y8 = /* @__PURE__ */ Ce(b8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/prev.vue"]]);
const w8 = Re({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    default: 50
  },
  nextText: {
    type: String
  },
  nextIcon: {
    type: en
  }
}), k8 = ["disabled", "aria-label", "aria-disabled"], x8 = { key: 0 }, C8 = Z({
  name: "ElPaginationNext"
}), S8 = /* @__PURE__ */ Z({
  ...C8,
  props: w8,
  emits: ["click"],
  setup(e) {
    const t = e, { t: n } = tn(), r = I(() => t.disabled || t.currentPage === t.pageCount || t.pageCount === 0);
    return (s, o) => (b(), C("button", {
      type: "button",
      class: "btn-next",
      disabled: _(r),
      "aria-label": s.nextText || _(n)("el.pagination.next"),
      "aria-disabled": _(r),
      onClick: o[0] || (o[0] = (i) => s.$emit("click", i))
    }, [
      s.nextText ? (b(), C("span", x8, ke(s.nextText), 1)) : (b(), Y(_(kt), { key: 1 }, {
        default: J(() => [
          (b(), Y(ht(s.nextIcon)))
        ]),
        _: 1
      }))
    ], 8, k8));
  }
});
var E8 = /* @__PURE__ */ Ce(S8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/next.vue"]]);
const Kh = Symbol("ElSelectGroup"), xs = Symbol("ElSelect");
function A8(e, t) {
  const n = Le(xs), r = Le(Kh, { disabled: !1 }), s = I(() => Jt(e.value)), o = I(() => n.props.multiple ? l(n.props.modelValue, e.value) : m(e.value, n.props.modelValue)), i = I(() => {
    if (n.props.multiple) {
      const g = n.props.modelValue || [];
      return !o.value && g.length >= n.props.multipleLimit && n.props.multipleLimit > 0;
    } else
      return !1;
  }), a = I(() => e.label || (s.value ? "" : e.value)), c = I(() => e.value || e.label || ""), u = I(() => e.disabled || t.groupDisabled || i.value), d = lt(), l = (g = [], y) => {
    if (s.value) {
      const h = n.props.valueKey;
      return g && g.some((w) => Vo(Lt(w, h)) === Lt(y, h));
    } else
      return g && g.includes(y);
  }, m = (g, y) => {
    if (s.value) {
      const { valueKey: h } = n.props;
      return Lt(g, h) === Lt(y, h);
    } else
      return g === y;
  }, f = () => {
    !e.disabled && !r.disabled && (n.hoverIndex = n.optionsArray.indexOf(d.proxy));
  };
  ue(() => a.value, () => {
    !e.created && !n.props.remote && n.setSelected();
  }), ue(() => e.value, (g, y) => {
    const { remote: h, valueKey: w } = n.props;
    if (Object.is(g, y) || (n.onOptionDestroy(y, d.proxy), n.onOptionCreate(d.proxy)), !e.created && !h) {
      if (w && Jt(g) && Jt(y) && g[w] === y[w])
        return;
      n.setSelected();
    }
  }), ue(() => r.disabled, () => {
    t.groupDisabled = r.disabled;
  }, { immediate: !0 });
  const { queryChange: v } = Vo(n);
  return ue(v, (g) => {
    const { query: y } = _(g), h = new RegExp(f4(y), "i");
    t.visible = h.test(a.value) || e.created, t.visible || n.filteredOptionsCount--;
  }, { immediate: !0 }), {
    select: n,
    currentLabel: a,
    currentValue: c,
    itemSelected: o,
    isDisabled: u,
    hoverItem: f
  };
}
const $8 = Z({
  name: "ElOption",
  componentName: "ElOption",
  props: {
    value: {
      required: !0,
      type: [String, Number, Boolean, Object]
    },
    label: [String, Number],
    created: Boolean,
    disabled: Boolean
  },
  setup(e) {
    const t = Te("select"), n = _s(), r = I(() => [
      t.be("dropdown", "item"),
      t.is("disabled", _(a)),
      {
        selected: _(i),
        hover: _(l)
      }
    ]), s = zn({
      index: -1,
      groupDisabled: !1,
      visible: !0,
      hitState: !1,
      hover: !1
    }), { currentLabel: o, itemSelected: i, isDisabled: a, select: c, hoverItem: u } = A8(e, s), { visible: d, hover: l } = ss(s), m = lt().proxy;
    c.onOptionCreate(m), Ft(() => {
      const v = m.value, { selected: g } = c, h = (c.props.multiple ? g : [g]).some((w) => w.value === m.value);
      Me(() => {
        c.cachedOptions.get(v) === m && !h && c.cachedOptions.delete(v);
      }), c.onOptionDestroy(v, m);
    });
    function f() {
      e.disabled !== !0 && s.groupDisabled !== !0 && c.handleOptionSelect(m);
    }
    return {
      ns: t,
      id: n,
      containerKls: r,
      currentLabel: o,
      itemSelected: i,
      isDisabled: a,
      select: c,
      hoverItem: u,
      visible: d,
      hover: l,
      selectOptionClick: f,
      states: s
    };
  }
}), M8 = ["id", "aria-disabled", "aria-selected"];
function I8(e, t, n, r, s, o) {
  return rt((b(), C("li", {
    id: e.id,
    class: H(e.containerKls),
    role: "option",
    "aria-disabled": e.isDisabled || void 0,
    "aria-selected": e.itemSelected,
    onMouseenter: t[0] || (t[0] = (...i) => e.hoverItem && e.hoverItem(...i)),
    onClick: t[1] || (t[1] = tt((...i) => e.selectOptionClick && e.selectOptionClick(...i), ["stop"]))
  }, [
    ae(e.$slots, "default", {}, () => [
      p("span", null, ke(e.currentLabel), 1)
    ])
  ], 42, M8)), [
    [Qt, e.visible]
  ]);
}
var xl = /* @__PURE__ */ Ce($8, [["render", I8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);
const T8 = Z({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const e = Le(xs), t = Te("select"), n = I(() => e.props.popperClass), r = I(() => e.props.multiple), s = I(() => e.props.fitInputWidth), o = D("");
    function i() {
      var a;
      o.value = `${(a = e.selectWrapper) == null ? void 0 : a.offsetWidth}px`;
    }
    return je(() => {
      i(), cs(e.selectWrapper, i);
    }), {
      ns: t,
      minWidth: o,
      popperClass: n,
      isMultiple: r,
      isFitInputWidth: s
    };
  }
});
function L8(e, t, n, r, s, o) {
  return b(), C("div", {
    class: H([e.ns.b("dropdown"), e.ns.is("multiple", e.isMultiple), e.popperClass]),
    style: Ue({ [e.isFitInputWidth ? "width" : "minWidth"]: e.minWidth })
  }, [
    e.$slots.header ? (b(), C("div", {
      key: 0,
      class: H(e.ns.be("dropdown", "header"))
    }, [
      ae(e.$slots, "header")
    ], 2)) : te("v-if", !0),
    ae(e.$slots, "default"),
    e.$slots.footer ? (b(), C("div", {
      key: 1,
      class: H(e.ns.be("dropdown", "footer"))
    }, [
      ae(e.$slots, "footer")
    ], 2)) : te("v-if", !0)
  ], 6);
}
var O8 = /* @__PURE__ */ Ce(T8, [["render", L8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]);
function R8(e) {
  const { t } = tn();
  return zn({
    options: /* @__PURE__ */ new Map(),
    cachedOptions: /* @__PURE__ */ new Map(),
    disabledOptions: /* @__PURE__ */ new Map(),
    createdLabel: null,
    createdSelected: !1,
    selected: e.multiple ? [] : {},
    inputLength: 20,
    inputWidth: 0,
    optionsCount: 0,
    filteredOptionsCount: 0,
    visible: !1,
    selectedLabel: "",
    hoverIndex: -1,
    query: "",
    previousQuery: null,
    inputHovering: !1,
    cachedPlaceHolder: "",
    currentPlaceholder: t("el.select.placeholder"),
    menuVisibleOnFocus: !1,
    isOnComposition: !1,
    prefixWidth: 11,
    mouseEnter: !1,
    focused: !1
  });
}
const P8 = (e, t, n) => {
  const { t: r } = tn(), s = Te("select");
  mh({
    from: "suffixTransition",
    replacement: "override style scheme",
    version: "2.3.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/select.html#select-attributes"
  }, I(() => e.suffixTransition === !1));
  const o = D(null), i = D(null), a = D(null), c = D(null), u = D(null), d = D(null), l = D(null), m = D(null), f = D(), v = mn({ query: "" }), g = mn(""), y = D([]);
  let h = 0;
  const { form: w, formItem: k } = ys(), x = I(() => !e.filterable || e.multiple || !t.visible), A = I(() => e.disabled || (w == null ? void 0 : w.disabled)), S = I(() => {
    const O = e.multiple ? Array.isArray(e.modelValue) && e.modelValue.length > 0 : e.modelValue !== void 0 && e.modelValue !== null && e.modelValue !== "";
    return e.clearable && !A.value && t.inputHovering && O;
  }), $ = I(() => e.remote && e.filterable && !e.remoteShowSuffix ? "" : e.suffixIcon), M = I(() => s.is("reverse", $.value && t.visible && e.suffixTransition)), P = I(() => (w == null ? void 0 : w.statusIcon) && (k == null ? void 0 : k.validateState) && hh[k == null ? void 0 : k.validateState]), R = I(() => e.remote ? 300 : 0), B = I(() => e.loading ? e.loadingText || r("el.select.loading") : e.remote && t.query === "" && t.options.size === 0 ? !1 : e.filterable && t.query && t.options.size > 0 && t.filteredOptionsCount === 0 ? e.noMatchText || r("el.select.noMatch") : t.options.size === 0 ? e.noDataText || r("el.select.noData") : null), j = I(() => {
    const O = Array.from(t.options.values()), E = [];
    return y.value.forEach((L) => {
      const q = O.findIndex((ce) => ce.currentLabel === L);
      q > -1 && E.push(O[q]);
    }), E.length >= O.length ? E : O;
  }), ie = I(() => Array.from(t.cachedOptions.values())), z = I(() => {
    const O = j.value.filter((E) => !E.created).some((E) => E.currentLabel === t.query);
    return e.filterable && e.allowCreate && t.query !== "" && !O;
  }), Q = po(), N = I(() => ["small"].includes(Q.value) ? "small" : "default"), V = I({
    get() {
      return t.visible && B.value !== !1;
    },
    set(O) {
      t.visible = O;
    }
  });
  ue([() => A.value, () => Q.value, () => w == null ? void 0 : w.size], () => {
    Me(() => {
      F();
    });
  }), ue(() => e.placeholder, (O) => {
    t.cachedPlaceHolder = t.currentPlaceholder = O, e.multiple && Array.isArray(e.modelValue) && e.modelValue.length > 0 && (t.currentPlaceholder = "");
  }), ue(() => e.modelValue, (O, E) => {
    e.multiple && (F(), O && O.length > 0 || i.value && t.query !== "" ? t.currentPlaceholder = "" : t.currentPlaceholder = t.cachedPlaceHolder, e.filterable && !e.reserveKeyword && (t.query = "", G(t.query))), U(), e.filterable && !e.multiple && (t.inputLength = 20), !Cc(O, E) && e.validateEvent && (k == null || k.validate("change").catch((L) => void 0));
  }, {
    flush: "post",
    deep: !0
  }), ue(() => t.visible, (O) => {
    var E, L, q, ce, xe;
    O ? ((L = (E = c.value) == null ? void 0 : E.updatePopper) == null || L.call(E), e.filterable && (t.filteredOptionsCount = t.optionsCount, t.query = e.remote ? "" : t.selectedLabel, (ce = (q = a.value) == null ? void 0 : q.focus) == null || ce.call(q), e.multiple ? (xe = i.value) == null || xe.focus() : t.selectedLabel && (t.currentPlaceholder = `${t.selectedLabel}`, t.selectedLabel = ""), G(t.query), !e.multiple && !e.remote && (v.value.query = "", Rr(v), Rr(g)))) : (e.filterable && (Pt(e.filterMethod) && e.filterMethod(""), Pt(e.remoteMethod) && e.remoteMethod("")), t.query = "", t.previousQuery = null, t.selectedLabel = "", t.inputLength = 20, t.menuVisibleOnFocus = !1, de(), Me(() => {
      i.value && i.value.value === "" && t.selected.length === 0 && (t.currentPlaceholder = t.cachedPlaceHolder);
    }), e.multiple || (t.selected && (e.filterable && e.allowCreate && t.createdSelected && t.createdLabel ? t.selectedLabel = t.createdLabel : t.selectedLabel = t.selected.currentLabel, e.filterable && (t.query = t.selectedLabel)), e.filterable && (t.currentPlaceholder = t.cachedPlaceHolder))), n.emit("visible-change", O);
  }), ue(() => t.options.entries(), () => {
    var O, E, L;
    if (!gt)
      return;
    (E = (O = c.value) == null ? void 0 : O.updatePopper) == null || E.call(O), e.multiple && F();
    const q = ((L = l.value) == null ? void 0 : L.querySelectorAll("input")) || [];
    (!e.filterable && !e.defaultFirstOption && !uh(e.modelValue) || !Array.from(q).includes(document.activeElement)) && U(), e.defaultFirstOption && (e.filterable || e.remote) && t.filteredOptionsCount && W();
  }, {
    flush: "post"
  }), ue(() => t.hoverIndex, (O) => {
    Ye(O) && O > -1 ? f.value = j.value[O] || {} : f.value = {}, j.value.forEach((E) => {
      E.hover = f.value === E;
    });
  });
  const F = () => {
    Me(() => {
      var O, E;
      if (!o.value)
        return;
      const L = o.value.$el.querySelector("input");
      h = h || (L.clientHeight > 0 ? L.clientHeight + 2 : 0);
      const q = d.value, ce = getComputedStyle(L).getPropertyValue(s.cssVarName("input-height")), xe = Number.parseFloat(ce) || q4(Q.value || (w == null ? void 0 : w.size)), Ae = Q.value || xe === h || h <= 0 ? xe : h;
      !(L.offsetParent === null) && (L.style.height = `${(t.selected.length === 0 ? Ae : Math.max(q ? q.clientHeight + (q.clientHeight > Ae ? 6 : 0) : 0, Ae)) - 2}px`), t.visible && B.value !== !1 && ((E = (O = c.value) == null ? void 0 : O.updatePopper) == null || E.call(O));
    });
  }, G = async (O) => {
    if (!(t.previousQuery === O || t.isOnComposition)) {
      if (t.previousQuery === null && (Pt(e.filterMethod) || Pt(e.remoteMethod))) {
        t.previousQuery = O;
        return;
      }
      t.previousQuery = O, Me(() => {
        var E, L;
        t.visible && ((L = (E = c.value) == null ? void 0 : E.updatePopper) == null || L.call(E));
      }), t.hoverIndex = -1, e.multiple && e.filterable && Me(() => {
        if (!A.value) {
          const E = i.value.value.length * 15 + 20;
          t.inputLength = e.collapseTags ? Math.min(50, E) : E, T();
        }
        F();
      }), e.remote && Pt(e.remoteMethod) ? (t.hoverIndex = -1, e.remoteMethod(O)) : Pt(e.filterMethod) ? (e.filterMethod(O), Rr(g)) : (t.filteredOptionsCount = t.optionsCount, v.value.query = O, Rr(v), Rr(g)), e.defaultFirstOption && (e.filterable || e.remote) && t.filteredOptionsCount && (await Me(), W());
    }
  }, T = () => {
    t.currentPlaceholder !== "" && (t.currentPlaceholder = i.value.value ? "" : t.cachedPlaceHolder);
  }, W = () => {
    const O = j.value.filter((q) => q.visible && !q.disabled && !q.states.groupDisabled), E = O.find((q) => q.created), L = O[0];
    t.hoverIndex = st(j.value, E || L);
  }, U = () => {
    var O;
    if (e.multiple)
      t.selectedLabel = "";
    else {
      const L = se(e.modelValue);
      (O = L.props) != null && O.created ? (t.createdLabel = L.props.value, t.createdSelected = !0) : t.createdSelected = !1, t.selectedLabel = L.currentLabel, t.selected = L, e.filterable && (t.query = t.selectedLabel);
      return;
    }
    const E = [];
    Array.isArray(e.modelValue) && e.modelValue.forEach((L) => {
      E.push(se(L));
    }), t.selected = E, Me(() => {
      F();
    });
  }, se = (O) => {
    let E;
    const L = zs(O).toLowerCase() === "object", q = zs(O).toLowerCase() === "null", ce = zs(O).toLowerCase() === "undefined";
    for (let oe = t.cachedOptions.size - 1; oe >= 0; oe--) {
      const ee = ie.value[oe];
      if (L ? Lt(ee.value, e.valueKey) === Lt(O, e.valueKey) : ee.value === O) {
        E = {
          value: O,
          currentLabel: ee.currentLabel,
          isDisabled: ee.isDisabled
        };
        break;
      }
    }
    if (E)
      return E;
    const xe = L ? O.label : !q && !ce ? O : "", Ae = {
      value: O,
      currentLabel: xe
    };
    return e.multiple && (Ae.hitState = !1), Ae;
  }, de = () => {
    setTimeout(() => {
      const O = e.valueKey;
      e.multiple ? t.selected.length > 0 ? t.hoverIndex = Math.min.apply(null, t.selected.map((E) => j.value.findIndex((L) => Lt(L, O) === Lt(E, O)))) : t.hoverIndex = -1 : t.hoverIndex = j.value.findIndex((E) => dn(E) === dn(t.selected));
    }, 300);
  }, ve = () => {
    var O, E;
    we(), (E = (O = c.value) == null ? void 0 : O.updatePopper) == null || E.call(O), e.multiple && F();
  }, we = () => {
    var O;
    t.inputWidth = (O = o.value) == null ? void 0 : O.$el.offsetWidth;
  }, Be = () => {
    e.filterable && t.query !== t.selectedLabel && (t.query = t.selectedLabel, G(t.query));
  }, Oe = xc(() => {
    Be();
  }, R.value), Ke = xc((O) => {
    G(O.target.value);
  }, R.value), re = (O) => {
    Cc(e.modelValue, O) || n.emit(il, O);
  }, pe = (O) => l4(O, (E) => !t.disabledOptions.has(E)), Se = (O) => {
    if (O.code !== _n.delete) {
      if (O.target.value.length <= 0 && !At()) {
        const E = e.modelValue.slice(), L = pe(E);
        if (L < 0)
          return;
        E.splice(L, 1), n.emit(wt, E), re(E);
      }
      O.target.value.length === 1 && e.modelValue.length === 0 && (t.currentPlaceholder = t.cachedPlaceHolder);
    }
  }, ze = (O, E) => {
    const L = t.selected.indexOf(E);
    if (L > -1 && !A.value) {
      const q = e.modelValue.slice();
      q.splice(L, 1), n.emit(wt, q), re(q), n.emit("remove-tag", E.value);
    }
    O.stopPropagation(), ge();
  }, Ge = (O) => {
    O.stopPropagation();
    const E = e.multiple ? [] : "";
    if (!Yt(E))
      for (const L of t.selected)
        L.isDisabled && E.push(L.value);
    n.emit(wt, E), re(E), t.hoverIndex = -1, t.visible = !1, n.emit("clear"), ge();
  }, Je = (O) => {
    var E;
    if (e.multiple) {
      const L = (e.modelValue || []).slice(), q = st(L, O.value);
      q > -1 ? L.splice(q, 1) : (e.multipleLimit <= 0 || L.length < e.multipleLimit) && L.push(O.value), n.emit(wt, L), re(L), O.created && (t.query = "", G(""), t.inputLength = 20), e.filterable && ((E = i.value) == null || E.focus());
    } else
      n.emit(wt, O.value), re(O.value), t.visible = !1;
    rn(), !t.visible && Me(() => {
      Et(O);
    });
  }, st = (O = [], E) => {
    if (!Jt(E))
      return O.indexOf(E);
    const L = e.valueKey;
    let q = -1;
    return O.some((ce, xe) => Vo(Lt(ce, L)) === Lt(E, L) ? (q = xe, !0) : !1), q;
  }, rn = () => {
    const O = i.value || o.value;
    O && (O == null || O.focus());
  }, Et = (O) => {
    var E, L, q, ce, xe;
    const Ae = Array.isArray(O) ? O[0] : O;
    let oe = null;
    if (Ae != null && Ae.value) {
      const ee = j.value.filter((me) => me.value === Ae.value);
      ee.length > 0 && (oe = ee[0].$el);
    }
    if (c.value && oe) {
      const ee = (ce = (q = (L = (E = c.value) == null ? void 0 : E.popperRef) == null ? void 0 : L.contentRef) == null ? void 0 : q.querySelector) == null ? void 0 : ce.call(q, `.${s.be("dropdown", "wrap")}`);
      ee && g4(ee, oe);
    }
    (xe = m.value) == null || xe.handleScroll();
  }, Vt = (O) => {
    t.optionsCount++, t.filteredOptionsCount++, t.options.set(O.value, O), t.cachedOptions.set(O.value, O), O.disabled && t.disabledOptions.set(O.value, O);
  }, ut = (O, E) => {
    t.options.get(O) === E && (t.optionsCount--, t.filteredOptionsCount--, t.options.delete(O));
  }, Ot = (O) => {
    O.code !== _n.backspace && At(!1), t.inputLength = i.value.value.length * 15 + 20, F();
  }, At = (O) => {
    if (!Array.isArray(t.selected))
      return;
    const E = pe(t.selected.map((q) => q.value)), L = t.selected[E];
    if (L)
      return O === !0 || O === !1 ? (L.hitState = O, O) : (L.hitState = !L.hitState, L.hitState);
  }, Ut = (O) => {
    const E = O.target.value;
    if (O.type === "compositionend")
      t.isOnComposition = !1, Me(() => G(E));
    else {
      const L = E[E.length - 1] || "";
      t.isOnComposition = !gh(L);
    }
  }, nt = () => {
    Me(() => Et(t.selected));
  }, K = (O) => {
    t.focused || ((e.automaticDropdown || e.filterable) && (e.filterable && !t.visible && (t.menuVisibleOnFocus = !0), t.visible = !0), t.focused = !0, n.emit("focus", O));
  }, ge = () => {
    var O, E;
    t.visible ? (O = i.value || o.value) == null || O.focus() : (E = o.value) == null || E.focus();
  }, De = () => {
    var O, E, L;
    t.visible = !1, (O = o.value) == null || O.blur(), (L = (E = a.value) == null ? void 0 : E.blur) == null || L.call(E);
  }, Xe = (O) => {
    var E, L, q;
    (E = c.value) != null && E.isFocusInsideContent(O) || (L = u.value) != null && L.isFocusInsideContent(O) || (q = l.value) != null && q.contains(O.relatedTarget) || (t.visible && qn(), t.focused = !1, n.emit("blur", O));
  }, Zt = (O) => {
    Ge(O);
  }, qn = () => {
    t.visible = !1;
  }, Fn = (O) => {
    t.visible && (O.preventDefault(), O.stopPropagation(), t.visible = !1);
  }, or = (O) => {
    O && !t.mouseEnter || A.value || (t.menuVisibleOnFocus ? t.menuVisibleOnFocus = !1 : (!c.value || !c.value.isFocusInsideContent()) && (t.visible = !t.visible), ge());
  }, Tr = () => {
    t.visible ? j.value[t.hoverIndex] && Je(j.value[t.hoverIndex]) : or();
  }, dn = (O) => Jt(O.value) ? Lt(O.value, e.valueKey) : O.value, sr = I(() => j.value.filter((O) => O.visible).every((O) => O.disabled)), Lr = I(() => e.multiple ? t.selected.slice(0, e.maxCollapseTags) : []), Hn = I(() => e.multiple ? t.selected.slice(e.maxCollapseTags) : []), Sn = (O) => {
    if (!t.visible) {
      t.visible = !0;
      return;
    }
    if (!(t.options.size === 0 || t.filteredOptionsCount === 0) && !t.isOnComposition && !sr.value) {
      O === "next" ? (t.hoverIndex++, t.hoverIndex === t.options.size && (t.hoverIndex = 0)) : O === "prev" && (t.hoverIndex--, t.hoverIndex < 0 && (t.hoverIndex = t.options.size - 1));
      const E = j.value[t.hoverIndex];
      (E.disabled === !0 || E.states.groupDisabled === !0 || !E.visible) && Sn(O), Me(() => Et(f.value));
    }
  }, ir = () => {
    t.mouseEnter = !0;
  }, jn = () => {
    t.mouseEnter = !1;
  }, Or = (O, E) => {
    var L, q;
    ze(O, E), (q = (L = u.value) == null ? void 0 : L.updatePopper) == null || q.call(L);
  }, ar = I(() => ({
    maxWidth: `${_(t.inputWidth) - 32 - (P.value ? 22 : 0)}px`,
    width: "100%"
  }));
  return {
    optionList: y,
    optionsArray: j,
    hoverOption: f,
    selectSize: Q,
    handleResize: ve,
    debouncedOnInputChange: Oe,
    debouncedQueryChange: Ke,
    deletePrevTag: Se,
    deleteTag: ze,
    deleteSelected: Ge,
    handleOptionSelect: Je,
    scrollToOption: Et,
    readonly: x,
    resetInputHeight: F,
    showClose: S,
    iconComponent: $,
    iconReverse: M,
    showNewOption: z,
    collapseTagSize: N,
    setSelected: U,
    managePlaceholder: T,
    selectDisabled: A,
    emptyText: B,
    toggleLastOptionHitState: At,
    resetInputState: Ot,
    handleComposition: Ut,
    onOptionCreate: Vt,
    onOptionDestroy: ut,
    handleMenuEnter: nt,
    handleFocus: K,
    focus: ge,
    blur: De,
    handleBlur: Xe,
    handleClearClick: Zt,
    handleClose: qn,
    handleKeydownEscape: Fn,
    toggleMenu: or,
    selectOption: Tr,
    getValueKey: dn,
    navigateOptions: Sn,
    handleDeleteTooltipTag: Or,
    dropMenuVisible: V,
    queryChange: v,
    groupQueryChange: g,
    showTagList: Lr,
    collapseTagList: Hn,
    selectTagsStyle: ar,
    reference: o,
    input: i,
    iOSInput: a,
    tooltipRef: c,
    tagTooltipRef: u,
    tags: d,
    selectWrapper: l,
    scrollbar: m,
    handleMouseEnter: ir,
    handleMouseLeave: jn
  };
};
var B8 = Z({
  name: "ElOptions",
  emits: ["update-options"],
  setup(e, { slots: t, emit: n }) {
    let r = [];
    function s(o, i) {
      if (o.length !== i.length)
        return !1;
      for (const [a] of o.entries())
        if (o[a] != i[a])
          return !1;
      return !0;
    }
    return () => {
      var o, i;
      const a = (o = t.default) == null ? void 0 : o.call(t), c = [];
      function u(d) {
        Array.isArray(d) && d.forEach((l) => {
          var m, f, v, g;
          const y = (m = (l == null ? void 0 : l.type) || {}) == null ? void 0 : m.name;
          y === "ElOptionGroup" ? u(!Yt(l.children) && !Array.isArray(l.children) && Pt((f = l.children) == null ? void 0 : f.default) ? (v = l.children) == null ? void 0 : v.default() : l.children) : y === "ElOption" ? c.push((g = l.props) == null ? void 0 : g.label) : Array.isArray(l.children) && u(l.children);
        });
      }
      return a.length && u((i = a[0]) == null ? void 0 : i.children), s(c, r) || (r = c, n("update-options", c)), a;
    };
  }
});
const vd = "ElSelect", z8 = Z({
  name: vd,
  componentName: vd,
  components: {
    ElInput: ws,
    ElSelectMenu: O8,
    ElOption: xl,
    ElOptions: B8,
    ElTag: Mx,
    ElScrollbar: Y5,
    ElTooltip: oo,
    ElIcon: kt
  },
  directives: { ClickOutside: Uh },
  props: {
    name: String,
    id: String,
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: void 0
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    automaticDropdown: Boolean,
    size: {
      type: String,
      validator: F4
    },
    effect: {
      type: String,
      default: "light"
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: {
      type: String,
      default: ""
    },
    popperOptions: {
      type: Object,
      default: () => ({})
    },
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String
    },
    defaultFirstOption: Boolean,
    reserveKeyword: {
      type: Boolean,
      default: !0
    },
    valueKey: {
      type: String,
      default: "value"
    },
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    maxCollapseTags: {
      type: Number,
      default: 1
    },
    teleported: Tt.teleported,
    persistent: {
      type: Boolean,
      default: !0
    },
    clearIcon: {
      type: en,
      default: sl
    },
    fitInputWidth: Boolean,
    suffixIcon: {
      type: en,
      default: dh
    },
    tagType: { ...Zh.type, default: "info" },
    validateEvent: {
      type: Boolean,
      default: !0
    },
    remoteShowSuffix: Boolean,
    suffixTransition: {
      type: Boolean,
      default: !0
    },
    placement: {
      type: String,
      values: ms,
      default: "bottom-start"
    },
    ariaLabel: {
      type: String,
      default: void 0
    }
  },
  emits: [
    wt,
    il,
    "remove-tag",
    "clear",
    "visible-change",
    "focus",
    "blur"
  ],
  setup(e, t) {
    const n = Te("select"), r = Te("input"), { t: s } = tn(), o = _s(), i = R8(e), {
      optionList: a,
      optionsArray: c,
      hoverOption: u,
      selectSize: d,
      readonly: l,
      handleResize: m,
      collapseTagSize: f,
      debouncedOnInputChange: v,
      debouncedQueryChange: g,
      deletePrevTag: y,
      deleteTag: h,
      deleteSelected: w,
      handleOptionSelect: k,
      scrollToOption: x,
      setSelected: A,
      resetInputHeight: S,
      managePlaceholder: $,
      showClose: M,
      selectDisabled: P,
      iconComponent: R,
      iconReverse: B,
      showNewOption: j,
      emptyText: ie,
      toggleLastOptionHitState: z,
      resetInputState: Q,
      handleComposition: N,
      onOptionCreate: V,
      onOptionDestroy: F,
      handleMenuEnter: G,
      handleFocus: T,
      focus: W,
      blur: U,
      handleBlur: se,
      handleClearClick: de,
      handleClose: ve,
      handleKeydownEscape: we,
      toggleMenu: Be,
      selectOption: Oe,
      getValueKey: Ke,
      navigateOptions: re,
      handleDeleteTooltipTag: pe,
      dropMenuVisible: Se,
      reference: ze,
      input: Ge,
      iOSInput: Je,
      tooltipRef: st,
      tagTooltipRef: rn,
      tags: Et,
      selectWrapper: Vt,
      scrollbar: ut,
      queryChange: Ot,
      groupQueryChange: At,
      handleMouseEnter: Ut,
      handleMouseLeave: nt,
      showTagList: K,
      collapseTagList: ge,
      selectTagsStyle: De
    } = P8(e, i, t), {
      inputWidth: Xe,
      selected: Zt,
      inputLength: qn,
      filteredOptionsCount: Fn,
      visible: or,
      selectedLabel: Tr,
      hoverIndex: dn,
      query: sr,
      inputHovering: Lr,
      currentPlaceholder: Hn,
      menuVisibleOnFocus: Sn,
      isOnComposition: ir,
      options: jn,
      cachedOptions: Or,
      optionsCount: ar,
      prefixWidth: O
    } = ss(i), E = I(() => {
      const $e = [n.b()], $t = _(d);
      return $t && $e.push(n.m($t)), e.disabled && $e.push(n.m("disabled")), $e;
    }), L = I(() => [
      n.e("tags"),
      n.is("disabled", _(P))
    ]), q = I(() => [
      n.b("tags-wrapper"),
      { "has-prefix": _(O) && _(Zt).length }
    ]), ce = I(() => [
      n.e("input"),
      n.is(_(d)),
      n.is("disabled", _(P))
    ]), xe = I(() => [
      n.e("input"),
      n.is(_(d)),
      n.em("input", "iOS")
    ]), Ae = I(() => [
      n.is("empty", !e.allowCreate && !!_(sr) && _(Fn) === 0)
    ]), oe = I(() => ({ maxWidth: `${_(Xe) > 123 && _(Zt).length > e.maxCollapseTags ? _(Xe) - 123 : _(Xe) - 75}px` })), ee = I(() => ({
      marginLeft: `${_(O)}px`,
      flexGrow: 1,
      width: `${_(qn) / (_(Xe) - 32)}%`,
      maxWidth: `${_(Xe) - 42}px`
    }));
    St(xs, zn({
      props: e,
      options: jn,
      optionsArray: c,
      cachedOptions: Or,
      optionsCount: ar,
      filteredOptionsCount: Fn,
      hoverIndex: dn,
      handleOptionSelect: k,
      onOptionCreate: V,
      onOptionDestroy: F,
      selectWrapper: Vt,
      selected: Zt,
      setSelected: A,
      queryChange: Ot,
      groupQueryChange: At
    })), je(() => {
      i.cachedPlaceHolder = Hn.value = e.placeholder || (() => s("el.select.placeholder")), e.multiple && Array.isArray(e.modelValue) && e.modelValue.length > 0 && (Hn.value = ""), cs(Vt, m), e.remote && e.multiple && S(), Me(() => {
        const $e = ze.value && ze.value.$el;
        if ($e && (Xe.value = $e.getBoundingClientRect().width, t.slots.prefix)) {
          const $t = $e.querySelector(`.${r.e("prefix")}`);
          O.value = Math.max($t.getBoundingClientRect().width + 11, 30);
        }
      }), A();
    }), e.multiple && !Array.isArray(e.modelValue) && t.emit(wt, []), !e.multiple && Array.isArray(e.modelValue) && t.emit(wt, "");
    const me = I(() => {
      var $e, $t;
      return ($t = ($e = st.value) == null ? void 0 : $e.popperRef) == null ? void 0 : $t.contentRef;
    });
    return {
      isIOS: Up,
      onOptionsRendered: ($e) => {
        a.value = $e;
      },
      prefixWidth: O,
      selectSize: d,
      readonly: l,
      handleResize: m,
      collapseTagSize: f,
      debouncedOnInputChange: v,
      debouncedQueryChange: g,
      deletePrevTag: y,
      deleteTag: h,
      handleDeleteTooltipTag: pe,
      deleteSelected: w,
      handleOptionSelect: k,
      scrollToOption: x,
      inputWidth: Xe,
      selected: Zt,
      inputLength: qn,
      filteredOptionsCount: Fn,
      visible: or,
      selectedLabel: Tr,
      hoverIndex: dn,
      query: sr,
      inputHovering: Lr,
      currentPlaceholder: Hn,
      menuVisibleOnFocus: Sn,
      isOnComposition: ir,
      options: jn,
      resetInputHeight: S,
      managePlaceholder: $,
      showClose: M,
      selectDisabled: P,
      iconComponent: R,
      iconReverse: B,
      showNewOption: j,
      emptyText: ie,
      toggleLastOptionHitState: z,
      resetInputState: Q,
      handleComposition: N,
      handleMenuEnter: G,
      handleFocus: T,
      focus: W,
      blur: U,
      handleBlur: se,
      handleClearClick: de,
      handleClose: ve,
      handleKeydownEscape: we,
      toggleMenu: Be,
      selectOption: Oe,
      getValueKey: Ke,
      navigateOptions: re,
      dropMenuVisible: Se,
      reference: ze,
      input: Ge,
      iOSInput: Je,
      tooltipRef: st,
      popperPaneRef: me,
      tags: Et,
      selectWrapper: Vt,
      scrollbar: ut,
      wrapperKls: E,
      tagsKls: L,
      tagWrapperKls: q,
      inputKls: ce,
      iOSInputKls: xe,
      scrollbarKls: Ae,
      selectTagsStyle: De,
      nsSelect: n,
      tagTextStyle: oe,
      inputStyle: ee,
      handleMouseEnter: Ut,
      handleMouseLeave: nt,
      showTagList: K,
      collapseTagList: ge,
      tagTooltipRef: rn,
      contentId: o,
      hoverOption: u
    };
  }
}), D8 = ["disabled", "autocomplete", "aria-activedescendant", "aria-controls", "aria-expanded", "aria-label"], N8 = ["disabled"], q8 = { style: { height: "100%", display: "flex", "justify-content": "center", "align-items": "center" } };
function F8(e, t, n, r, s, o) {
  const i = $n("el-tag"), a = $n("el-tooltip"), c = $n("el-icon"), u = $n("el-input"), d = $n("el-option"), l = $n("el-options"), m = $n("el-scrollbar"), f = $n("el-select-menu"), v = Kc("click-outside");
  return rt((b(), C("div", {
    ref: "selectWrapper",
    class: H(e.wrapperKls),
    onMouseenter: t[22] || (t[22] = (...g) => e.handleMouseEnter && e.handleMouseEnter(...g)),
    onMouseleave: t[23] || (t[23] = (...g) => e.handleMouseLeave && e.handleMouseLeave(...g)),
    onClick: t[24] || (t[24] = tt((...g) => e.toggleMenu && e.toggleMenu(...g), ["stop"]))
  }, [
    he(a, {
      ref: "tooltipRef",
      visible: e.dropMenuVisible,
      placement: e.placement,
      teleported: e.teleported,
      "popper-class": [e.nsSelect.e("popper"), e.popperClass],
      "popper-options": e.popperOptions,
      "fallback-placements": ["bottom-start", "top-start", "right", "left"],
      effect: e.effect,
      pure: "",
      trigger: "click",
      transition: `${e.nsSelect.namespace.value}-zoom-in-top`,
      "stop-popper-mouse-event": !1,
      "gpu-acceleration": !1,
      persistent: e.persistent,
      onShow: e.handleMenuEnter
    }, {
      default: J(() => {
        var g, y;
        return [
          p("div", {
            class: "select-trigger",
            onMouseenter: t[20] || (t[20] = (h) => e.inputHovering = !0),
            onMouseleave: t[21] || (t[21] = (h) => e.inputHovering = !1)
          }, [
            e.multiple ? (b(), C("div", {
              key: 0,
              ref: "tags",
              tabindex: "-1",
              class: H(e.tagsKls),
              style: Ue(e.selectTagsStyle),
              onClick: t[15] || (t[15] = (...h) => e.focus && e.focus(...h))
            }, [
              e.collapseTags && e.selected.length ? (b(), Y(er, {
                key: 0,
                onAfterLeave: e.resetInputHeight
              }, {
                default: J(() => [
                  p("span", {
                    class: H(e.tagWrapperKls)
                  }, [
                    (b(!0), C(He, null, ot(e.showTagList, (h) => (b(), Y(i, {
                      key: e.getValueKey(h),
                      closable: !e.selectDisabled && !h.isDisabled,
                      size: e.collapseTagSize,
                      hit: h.hitState,
                      type: e.tagType,
                      "disable-transitions": "",
                      onClose: (w) => e.deleteTag(w, h)
                    }, {
                      default: J(() => [
                        p("span", {
                          class: H(e.nsSelect.e("tags-text")),
                          style: Ue(e.tagTextStyle)
                        }, ke(h.currentLabel), 7)
                      ]),
                      _: 2
                    }, 1032, ["closable", "size", "hit", "type", "onClose"]))), 128)),
                    e.selected.length > e.maxCollapseTags ? (b(), Y(i, {
                      key: 0,
                      closable: !1,
                      size: e.collapseTagSize,
                      type: e.tagType,
                      "disable-transitions": ""
                    }, {
                      default: J(() => [
                        e.collapseTagsTooltip ? (b(), Y(a, {
                          key: 0,
                          ref: "tagTooltipRef",
                          disabled: e.dropMenuVisible,
                          "fallback-placements": ["bottom", "top", "right", "left"],
                          effect: e.effect,
                          placement: "bottom",
                          teleported: e.teleported
                        }, {
                          default: J(() => [
                            p("span", {
                              class: H(e.nsSelect.e("tags-text"))
                            }, "+ " + ke(e.selected.length - e.maxCollapseTags), 3)
                          ]),
                          content: J(() => [
                            p("div", {
                              class: H(e.nsSelect.e("collapse-tags"))
                            }, [
                              (b(!0), C(He, null, ot(e.collapseTagList, (h) => (b(), C("div", {
                                key: e.getValueKey(h),
                                class: H(e.nsSelect.e("collapse-tag"))
                              }, [
                                he(i, {
                                  class: "in-tooltip",
                                  closable: !e.selectDisabled && !h.isDisabled,
                                  size: e.collapseTagSize,
                                  hit: h.hitState,
                                  type: e.tagType,
                                  "disable-transitions": "",
                                  style: { margin: "2px" },
                                  onClose: (w) => e.handleDeleteTooltipTag(w, h)
                                }, {
                                  default: J(() => [
                                    p("span", {
                                      class: H(e.nsSelect.e("tags-text")),
                                      style: Ue({
                                        maxWidth: e.inputWidth - 75 + "px"
                                      })
                                    }, ke(h.currentLabel), 7)
                                  ]),
                                  _: 2
                                }, 1032, ["closable", "size", "hit", "type", "onClose"])
                              ], 2))), 128))
                            ], 2)
                          ]),
                          _: 1
                        }, 8, ["disabled", "effect", "teleported"])) : (b(), C("span", {
                          key: 1,
                          class: H(e.nsSelect.e("tags-text"))
                        }, "+ " + ke(e.selected.length - e.maxCollapseTags), 3))
                      ]),
                      _: 1
                    }, 8, ["size", "type"])) : te("v-if", !0)
                  ], 2)
                ]),
                _: 1
              }, 8, ["onAfterLeave"])) : te("v-if", !0),
              e.collapseTags ? te("v-if", !0) : (b(), Y(er, {
                key: 1,
                onAfterLeave: e.resetInputHeight
              }, {
                default: J(() => [
                  p("span", {
                    class: H(e.tagWrapperKls),
                    style: Ue(e.prefixWidth && e.selected.length ? { marginLeft: `${e.prefixWidth}px` } : "")
                  }, [
                    (b(!0), C(He, null, ot(e.selected, (h) => (b(), Y(i, {
                      key: e.getValueKey(h),
                      closable: !e.selectDisabled && !h.isDisabled,
                      size: e.collapseTagSize,
                      hit: h.hitState,
                      type: e.tagType,
                      "disable-transitions": "",
                      onClose: (w) => e.deleteTag(w, h)
                    }, {
                      default: J(() => [
                        p("span", {
                          class: H(e.nsSelect.e("tags-text")),
                          style: Ue({ maxWidth: e.inputWidth - 75 + "px" })
                        }, ke(h.currentLabel), 7)
                      ]),
                      _: 2
                    }, 1032, ["closable", "size", "hit", "type", "onClose"]))), 128))
                  ], 6)
                ]),
                _: 1
              }, 8, ["onAfterLeave"])),
              e.filterable && !e.selectDisabled ? rt((b(), C("input", {
                key: 2,
                ref: "input",
                "onUpdate:modelValue": t[0] || (t[0] = (h) => e.query = h),
                type: "text",
                class: H(e.inputKls),
                disabled: e.selectDisabled,
                autocomplete: e.autocomplete,
                style: Ue(e.inputStyle),
                role: "combobox",
                "aria-activedescendant": ((g = e.hoverOption) == null ? void 0 : g.id) || "",
                "aria-controls": e.contentId,
                "aria-expanded": e.dropMenuVisible,
                "aria-label": e.ariaLabel,
                "aria-autocomplete": "none",
                "aria-haspopup": "listbox",
                onFocus: t[1] || (t[1] = (...h) => e.handleFocus && e.handleFocus(...h)),
                onBlur: t[2] || (t[2] = (...h) => e.handleBlur && e.handleBlur(...h)),
                onKeyup: t[3] || (t[3] = (...h) => e.managePlaceholder && e.managePlaceholder(...h)),
                onKeydown: [
                  t[4] || (t[4] = (...h) => e.resetInputState && e.resetInputState(...h)),
                  t[5] || (t[5] = ft(tt((h) => e.navigateOptions("next"), ["prevent"]), ["down"])),
                  t[6] || (t[6] = ft(tt((h) => e.navigateOptions("prev"), ["prevent"]), ["up"])),
                  t[7] || (t[7] = ft((...h) => e.handleKeydownEscape && e.handleKeydownEscape(...h), ["esc"])),
                  t[8] || (t[8] = ft(tt((...h) => e.selectOption && e.selectOption(...h), ["stop", "prevent"]), ["enter"])),
                  t[9] || (t[9] = ft((...h) => e.deletePrevTag && e.deletePrevTag(...h), ["delete"])),
                  t[10] || (t[10] = ft((h) => e.visible = !1, ["tab"]))
                ],
                onCompositionstart: t[11] || (t[11] = (...h) => e.handleComposition && e.handleComposition(...h)),
                onCompositionupdate: t[12] || (t[12] = (...h) => e.handleComposition && e.handleComposition(...h)),
                onCompositionend: t[13] || (t[13] = (...h) => e.handleComposition && e.handleComposition(...h)),
                onInput: t[14] || (t[14] = (...h) => e.debouncedQueryChange && e.debouncedQueryChange(...h))
              }, null, 46, D8)), [
                [Mp, e.query]
              ]) : te("v-if", !0)
            ], 6)) : te("v-if", !0),
            e.isIOS && !e.multiple && e.filterable && e.readonly ? (b(), C("input", {
              key: 1,
              ref: "iOSInput",
              class: H(e.iOSInputKls),
              disabled: e.selectDisabled,
              type: "text"
            }, null, 10, N8)) : te("v-if", !0),
            he(u, {
              id: e.id,
              ref: "reference",
              modelValue: e.selectedLabel,
              "onUpdate:modelValue": t[16] || (t[16] = (h) => e.selectedLabel = h),
              type: "text",
              placeholder: typeof e.currentPlaceholder == "function" ? e.currentPlaceholder() : e.currentPlaceholder,
              name: e.name,
              autocomplete: e.autocomplete,
              size: e.selectSize,
              disabled: e.selectDisabled,
              readonly: e.readonly,
              "validate-event": !1,
              class: H([e.nsSelect.is("focus", e.visible)]),
              tabindex: e.multiple && e.filterable ? -1 : void 0,
              role: "combobox",
              "aria-activedescendant": ((y = e.hoverOption) == null ? void 0 : y.id) || "",
              "aria-controls": e.contentId,
              "aria-expanded": e.dropMenuVisible,
              label: e.ariaLabel,
              "aria-autocomplete": "none",
              "aria-haspopup": "listbox",
              onFocus: e.handleFocus,
              onBlur: e.handleBlur,
              onInput: e.debouncedOnInputChange,
              onPaste: e.debouncedOnInputChange,
              onCompositionstart: e.handleComposition,
              onCompositionupdate: e.handleComposition,
              onCompositionend: e.handleComposition,
              onKeydown: [
                t[17] || (t[17] = ft(tt((h) => e.navigateOptions("next"), ["stop", "prevent"]), ["down"])),
                t[18] || (t[18] = ft(tt((h) => e.navigateOptions("prev"), ["stop", "prevent"]), ["up"])),
                ft(tt(e.selectOption, ["stop", "prevent"]), ["enter"]),
                ft(e.handleKeydownEscape, ["esc"]),
                t[19] || (t[19] = ft((h) => e.visible = !1, ["tab"]))
              ]
            }, Kr({
              suffix: J(() => [
                e.iconComponent && !e.showClose ? (b(), Y(c, {
                  key: 0,
                  class: H([e.nsSelect.e("caret"), e.nsSelect.e("icon"), e.iconReverse])
                }, {
                  default: J(() => [
                    (b(), Y(ht(e.iconComponent)))
                  ]),
                  _: 1
                }, 8, ["class"])) : te("v-if", !0),
                e.showClose && e.clearIcon ? (b(), Y(c, {
                  key: 1,
                  class: H([e.nsSelect.e("caret"), e.nsSelect.e("icon")]),
                  onClick: e.handleClearClick
                }, {
                  default: J(() => [
                    (b(), Y(ht(e.clearIcon)))
                  ]),
                  _: 1
                }, 8, ["class", "onClick"])) : te("v-if", !0)
              ]),
              _: 2
            }, [
              e.$slots.prefix ? {
                name: "prefix",
                fn: J(() => [
                  p("div", q8, [
                    ae(e.$slots, "prefix")
                  ])
                ])
              } : void 0
            ]), 1032, ["id", "modelValue", "placeholder", "name", "autocomplete", "size", "disabled", "readonly", "class", "tabindex", "aria-activedescendant", "aria-controls", "aria-expanded", "label", "onFocus", "onBlur", "onInput", "onPaste", "onCompositionstart", "onCompositionupdate", "onCompositionend", "onKeydown"])
          ], 32)
        ];
      }),
      content: J(() => [
        he(f, null, Kr({
          default: J(() => [
            rt(he(m, {
              id: e.contentId,
              ref: "scrollbar",
              tag: "ul",
              "wrap-class": e.nsSelect.be("dropdown", "wrap"),
              "view-class": e.nsSelect.be("dropdown", "list"),
              class: H(e.scrollbarKls),
              role: "listbox",
              "aria-label": e.ariaLabel,
              "aria-orientation": "vertical"
            }, {
              default: J(() => [
                e.showNewOption ? (b(), Y(d, {
                  key: 0,
                  value: e.query,
                  created: !0
                }, null, 8, ["value"])) : te("v-if", !0),
                he(l, { onUpdateOptions: e.onOptionsRendered }, {
                  default: J(() => [
                    ae(e.$slots, "default")
                  ]),
                  _: 3
                }, 8, ["onUpdateOptions"])
              ]),
              _: 3
            }, 8, ["id", "wrap-class", "view-class", "class", "aria-label"]), [
              [Qt, e.options.size > 0 && !e.loading]
            ]),
            e.emptyText && (!e.allowCreate || e.loading || e.allowCreate && e.options.size === 0) ? (b(), C(He, { key: 0 }, [
              e.$slots.empty ? ae(e.$slots, "empty", { key: 0 }) : (b(), C("p", {
                key: 1,
                class: H(e.nsSelect.be("dropdown", "empty"))
              }, ke(e.emptyText), 3))
            ], 64)) : te("v-if", !0)
          ]),
          _: 2
        }, [
          e.$slots.header ? {
            name: "header",
            fn: J(() => [
              ae(e.$slots, "header")
            ])
          } : void 0,
          e.$slots.footer ? {
            name: "footer",
            fn: J(() => [
              ae(e.$slots, "footer")
            ])
          } : void 0
        ]), 1024)
      ]),
      _: 3
    }, 8, ["visible", "placement", "teleported", "popper-class", "popper-options", "effect", "transition", "persistent", "onShow"])
  ], 34)), [
    [v, e.handleClose, e.popperPaneRef]
  ]);
}
var H8 = /* @__PURE__ */ Ce(z8, [["render", F8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);
const j8 = Z({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: Boolean
  },
  setup(e) {
    const t = Te("select"), n = D(!0), r = lt(), s = D([]);
    St(Kh, zn({
      ...ss(e)
    }));
    const o = Le(xs);
    je(() => {
      s.value = i(r.subTree);
    });
    const i = (c) => {
      const u = [];
      return Array.isArray(c.children) && c.children.forEach((d) => {
        var l;
        d.type && d.type.name === "ElOption" && d.component && d.component.proxy ? u.push(d.component.proxy) : (l = d.children) != null && l.length && u.push(...i(d));
      }), u;
    }, { groupQueryChange: a } = Vo(o);
    return ue(a, () => {
      n.value = s.value.some((c) => c.visible === !0);
    }, { flush: "post" }), {
      visible: n,
      ns: t
    };
  }
});
function V8(e, t, n, r, s, o) {
  return rt((b(), C("ul", {
    class: H(e.ns.be("group", "wrap"))
  }, [
    p("li", {
      class: H(e.ns.be("group", "title"))
    }, ke(e.label), 3),
    p("li", null, [
      p("ul", {
        class: H(e.ns.b("group"))
      }, [
        ae(e.$slots, "default")
      ], 2)
    ])
  ], 2)), [
    [Qt, e.visible]
  ]);
}
var Xh = /* @__PURE__ */ Ce(j8, [["render", V8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]);
const Mc = jt(H8, {
  Option: xl,
  OptionGroup: Xh
}), U8 = gs(xl);
gs(Xh);
const Cl = () => Le(Gh, {}), Z8 = Re({
  pageSize: {
    type: Number,
    required: !0
  },
  pageSizes: {
    type: be(Array),
    default: () => al([10, 20, 30, 40, 50, 100])
  },
  popperClass: {
    type: String
  },
  disabled: Boolean,
  teleported: Boolean,
  size: {
    type: String,
    values: lo
  }
}), W8 = Z({
  name: "ElPaginationSizes"
}), G8 = /* @__PURE__ */ Z({
  ...W8,
  props: Z8,
  emits: ["page-size-change"],
  setup(e, { emit: t }) {
    const n = e, { t: r } = tn(), s = Te("pagination"), o = Cl(), i = D(n.pageSize);
    ue(() => n.pageSizes, (u, d) => {
      if (!Cc(u, d) && Array.isArray(u)) {
        const l = u.includes(n.pageSize) ? n.pageSize : n.pageSizes[0];
        t("page-size-change", l);
      }
    }), ue(() => n.pageSize, (u) => {
      i.value = u;
    });
    const a = I(() => n.pageSizes);
    function c(u) {
      var d;
      u !== i.value && (i.value = u, (d = o.handleSizeChange) == null || d.call(o, Number(u)));
    }
    return (u, d) => (b(), C("span", {
      class: H(_(s).e("sizes"))
    }, [
      he(_(Mc), {
        "model-value": i.value,
        disabled: u.disabled,
        "popper-class": u.popperClass,
        size: u.size,
        teleported: u.teleported,
        "validate-event": !1,
        onChange: c
      }, {
        default: J(() => [
          (b(!0), C(He, null, ot(_(a), (l) => (b(), Y(_(U8), {
            key: l,
            value: l,
            label: l + _(r)("el.pagination.pagesize")
          }, null, 8, ["value", "label"]))), 128))
        ]),
        _: 1
      }, 8, ["model-value", "disabled", "popper-class", "size", "teleported"])
    ], 2));
  }
});
var K8 = /* @__PURE__ */ Ce(G8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/sizes.vue"]]);
const X8 = Re({
  size: {
    type: String,
    values: lo
  }
}), Y8 = ["disabled"], J8 = Z({
  name: "ElPaginationJumper"
}), Q8 = /* @__PURE__ */ Z({
  ...J8,
  props: X8,
  setup(e) {
    const { t } = tn(), n = Te("pagination"), { pageCount: r, disabled: s, currentPage: o, changeEvent: i } = Cl(), a = D(), c = I(() => {
      var l;
      return (l = a.value) != null ? l : o == null ? void 0 : o.value;
    });
    function u(l) {
      a.value = l ? +l : "";
    }
    function d(l) {
      l = Math.trunc(+l), i == null || i(l), a.value = void 0;
    }
    return (l, m) => (b(), C("span", {
      class: H(_(n).e("jump")),
      disabled: _(s)
    }, [
      p("span", {
        class: H([_(n).e("goto")])
      }, ke(_(t)("el.pagination.goto")), 3),
      he(_(ws), {
        size: l.size,
        class: H([_(n).e("editor"), _(n).is("in-pagination")]),
        min: 1,
        max: _(r),
        disabled: _(s),
        "model-value": _(c),
        "validate-event": !1,
        label: _(t)("el.pagination.page"),
        type: "number",
        "onUpdate:modelValue": u,
        onChange: d
      }, null, 8, ["size", "class", "max", "disabled", "model-value", "label"]),
      p("span", {
        class: H([_(n).e("classifier")])
      }, ke(_(t)("el.pagination.pageClassifier")), 3)
    ], 10, Y8));
  }
});
var eC = /* @__PURE__ */ Ce(Q8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/jumper.vue"]]);
const tC = Re({
  total: {
    type: Number,
    default: 1e3
  }
}), nC = ["disabled"], rC = Z({
  name: "ElPaginationTotal"
}), oC = /* @__PURE__ */ Z({
  ...rC,
  props: tC,
  setup(e) {
    const { t } = tn(), n = Te("pagination"), { disabled: r } = Cl();
    return (s, o) => (b(), C("span", {
      class: H(_(n).e("total")),
      disabled: _(r)
    }, ke(_(t)("el.pagination.total", {
      total: s.total
    })), 11, nC));
  }
});
var sC = /* @__PURE__ */ Ce(oC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/total.vue"]]);
const iC = Re({
  currentPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    required: !0
  },
  pagerCount: {
    type: Number,
    default: 7
  },
  disabled: Boolean
}), aC = ["onKeyup"], cC = ["aria-current", "aria-label", "tabindex"], lC = ["tabindex", "aria-label"], uC = ["aria-current", "aria-label", "tabindex"], dC = ["tabindex", "aria-label"], fC = ["aria-current", "aria-label", "tabindex"], pC = Z({
  name: "ElPaginationPager"
}), hC = /* @__PURE__ */ Z({
  ...pC,
  props: iC,
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, r = Te("pager"), s = Te("icon"), { t: o } = tn(), i = D(!1), a = D(!1), c = D(!1), u = D(!1), d = D(!1), l = D(!1), m = I(() => {
      const x = n.pagerCount, A = (x - 1) / 2, S = Number(n.currentPage), $ = Number(n.pageCount);
      let M = !1, P = !1;
      $ > x && (S > x - A && (M = !0), S < $ - A && (P = !0));
      const R = [];
      if (M && !P) {
        const B = $ - (x - 2);
        for (let j = B; j < $; j++)
          R.push(j);
      } else if (!M && P)
        for (let B = 2; B < x; B++)
          R.push(B);
      else if (M && P) {
        const B = Math.floor(x / 2) - 1;
        for (let j = S - B; j <= S + B; j++)
          R.push(j);
      } else
        for (let B = 2; B < $; B++)
          R.push(B);
      return R;
    }), f = I(() => [
      "more",
      "btn-quickprev",
      s.b(),
      r.is("disabled", n.disabled)
    ]), v = I(() => [
      "more",
      "btn-quicknext",
      s.b(),
      r.is("disabled", n.disabled)
    ]), g = I(() => n.disabled ? -1 : 0);
    Gc(() => {
      const x = (n.pagerCount - 1) / 2;
      i.value = !1, a.value = !1, n.pageCount > n.pagerCount && (n.currentPage > n.pagerCount - x && (i.value = !0), n.currentPage < n.pageCount - x && (a.value = !0));
    });
    function y(x = !1) {
      n.disabled || (x ? c.value = !0 : u.value = !0);
    }
    function h(x = !1) {
      x ? d.value = !0 : l.value = !0;
    }
    function w(x) {
      const A = x.target;
      if (A.tagName.toLowerCase() === "li" && Array.from(A.classList).includes("number")) {
        const S = Number(A.textContent);
        S !== n.currentPage && t("change", S);
      } else A.tagName.toLowerCase() === "li" && Array.from(A.classList).includes("more") && k(x);
    }
    function k(x) {
      const A = x.target;
      if (A.tagName.toLowerCase() === "ul" || n.disabled)
        return;
      let S = Number(A.textContent);
      const $ = n.pageCount, M = n.currentPage, P = n.pagerCount - 2;
      A.className.includes("more") && (A.className.includes("quickprev") ? S = M - P : A.className.includes("quicknext") && (S = M + P)), Number.isNaN(+S) || (S < 1 && (S = 1), S > $ && (S = $)), S !== M && t("change", S);
    }
    return (x, A) => (b(), C("ul", {
      class: H(_(r).b()),
      onClick: k,
      onKeyup: ft(w, ["enter"])
    }, [
      x.pageCount > 0 ? (b(), C("li", {
        key: 0,
        class: H([[
          _(r).is("active", x.currentPage === 1),
          _(r).is("disabled", x.disabled)
        ], "number"]),
        "aria-current": x.currentPage === 1,
        "aria-label": _(o)("el.pagination.currentPage", { pager: 1 }),
        tabindex: _(g)
      }, " 1 ", 10, cC)) : te("v-if", !0),
      i.value ? (b(), C("li", {
        key: 1,
        class: H(_(f)),
        tabindex: _(g),
        "aria-label": _(o)("el.pagination.prevPages", { pager: x.pagerCount - 2 }),
        onMouseenter: A[0] || (A[0] = (S) => y(!0)),
        onMouseleave: A[1] || (A[1] = (S) => c.value = !1),
        onFocus: A[2] || (A[2] = (S) => h(!0)),
        onBlur: A[3] || (A[3] = (S) => d.value = !1)
      }, [
        (c.value || d.value) && !x.disabled ? (b(), Y(_(E4), { key: 0 })) : (b(), Y(_(Ru), { key: 1 }))
      ], 42, lC)) : te("v-if", !0),
      (b(!0), C(He, null, ot(_(m), (S) => (b(), C("li", {
        key: S,
        class: H([[
          _(r).is("active", x.currentPage === S),
          _(r).is("disabled", x.disabled)
        ], "number"]),
        "aria-current": x.currentPage === S,
        "aria-label": _(o)("el.pagination.currentPage", { pager: S }),
        tabindex: _(g)
      }, ke(S), 11, uC))), 128)),
      a.value ? (b(), C("li", {
        key: 2,
        class: H(_(v)),
        tabindex: _(g),
        "aria-label": _(o)("el.pagination.nextPages", { pager: x.pagerCount - 2 }),
        onMouseenter: A[4] || (A[4] = (S) => y()),
        onMouseleave: A[5] || (A[5] = (S) => u.value = !1),
        onFocus: A[6] || (A[6] = (S) => h()),
        onBlur: A[7] || (A[7] = (S) => l.value = !1)
      }, [
        (u.value || l.value) && !x.disabled ? (b(), Y(_($4), { key: 0 })) : (b(), Y(_(Ru), { key: 1 }))
      ], 42, dC)) : te("v-if", !0),
      x.pageCount > 1 ? (b(), C("li", {
        key: 3,
        class: H([[
          _(r).is("active", x.currentPage === x.pageCount),
          _(r).is("disabled", x.disabled)
        ], "number"]),
        "aria-current": x.currentPage === x.pageCount,
        "aria-label": _(o)("el.pagination.currentPage", { pager: x.pageCount }),
        tabindex: _(g)
      }, ke(x.pageCount), 11, fC)) : te("v-if", !0)
    ], 42, aC));
  }
});
var gC = /* @__PURE__ */ Ce(hC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/pager.vue"]]);
const vt = (e) => typeof e != "number", Yh = Re({
  pageSize: Number,
  defaultPageSize: Number,
  total: Number,
  pageCount: Number,
  pagerCount: {
    type: Number,
    validator: (e) => Ye(e) && Math.trunc(e) === e && e > 4 && e < 22 && e % 2 === 1,
    default: 7
  },
  currentPage: Number,
  defaultCurrentPage: Number,
  layout: {
    type: String,
    default: ["prev", "pager", "next", "jumper", "->", "total"].join(", ")
  },
  pageSizes: {
    type: be(Array),
    default: () => al([10, 20, 30, 40, 50, 100])
  },
  popperClass: {
    type: String,
    default: ""
  },
  prevText: {
    type: String,
    default: ""
  },
  prevIcon: {
    type: en,
    default: () => _4
  },
  nextText: {
    type: String,
    default: ""
  },
  nextIcon: {
    type: en,
    default: () => y4
  },
  teleported: {
    type: Boolean,
    default: !0
  },
  small: Boolean,
  background: Boolean,
  disabled: Boolean,
  hideOnSinglePage: Boolean
}), mC = {
  "update:current-page": (e) => Ye(e),
  "update:page-size": (e) => Ye(e),
  "size-change": (e) => Ye(e),
  "current-change": (e) => Ye(e),
  "prev-click": (e) => Ye(e),
  "next-click": (e) => Ye(e)
}, _d = "ElPagination";
var vC = Z({
  name: _d,
  props: Yh,
  emits: mC,
  setup(e, { emit: t, slots: n }) {
    const { t: r } = tn(), s = Te("pagination"), o = lt().vnode.props || {}, i = "onUpdate:currentPage" in o || "onUpdate:current-page" in o || "onCurrentChange" in o, a = "onUpdate:pageSize" in o || "onUpdate:page-size" in o || "onSizeChange" in o, c = I(() => {
      if (vt(e.total) && vt(e.pageCount) || !vt(e.currentPage) && !i)
        return !1;
      if (e.layout.includes("sizes")) {
        if (vt(e.pageCount)) {
          if (!vt(e.total) && !vt(e.pageSize) && !a)
            return !1;
        } else if (!a)
          return !1;
      }
      return !0;
    }), u = D(vt(e.defaultPageSize) ? 10 : e.defaultPageSize), d = D(vt(e.defaultCurrentPage) ? 1 : e.defaultCurrentPage), l = I({
      get() {
        return vt(e.pageSize) ? u.value : e.pageSize;
      },
      set(k) {
        vt(e.pageSize) && (u.value = k), a && (t("update:page-size", k), t("size-change", k));
      }
    }), m = I(() => {
      let k = 0;
      return vt(e.pageCount) ? vt(e.total) || (k = Math.max(1, Math.ceil(e.total / l.value))) : k = e.pageCount, k;
    }), f = I({
      get() {
        return vt(e.currentPage) ? d.value : e.currentPage;
      },
      set(k) {
        let x = k;
        k < 1 ? x = 1 : k > m.value && (x = m.value), vt(e.currentPage) && (d.value = x), i && (t("update:current-page", x), t("current-change", x));
      }
    });
    ue(m, (k) => {
      f.value > k && (f.value = k);
    });
    function v(k) {
      f.value = k;
    }
    function g(k) {
      l.value = k;
      const x = m.value;
      f.value > x && (f.value = x);
    }
    function y() {
      e.disabled || (f.value -= 1, t("prev-click", f.value));
    }
    function h() {
      e.disabled || (f.value += 1, t("next-click", f.value));
    }
    function w(k, x) {
      k && (k.props || (k.props = {}), k.props.class = [k.props.class, x].join(" "));
    }
    return St(Gh, {
      pageCount: m,
      disabled: I(() => e.disabled),
      currentPage: f,
      changeEvent: v,
      handleSizeChange: g
    }), () => {
      var k, x;
      if (!c.value)
        return r("el.pagination.deprecationWarning"), null;
      if (!e.layout || e.hideOnSinglePage && m.value <= 1)
        return null;
      const A = [], S = [], $ = Rt("div", { class: s.e("rightwrapper") }, S), M = {
        prev: Rt(y8, {
          disabled: e.disabled,
          currentPage: f.value,
          prevText: e.prevText,
          prevIcon: e.prevIcon,
          onClick: y
        }),
        jumper: Rt(eC, {
          size: e.small ? "small" : "default"
        }),
        pager: Rt(gC, {
          currentPage: f.value,
          pageCount: m.value,
          pagerCount: e.pagerCount,
          onChange: v,
          disabled: e.disabled
        }),
        next: Rt(E8, {
          disabled: e.disabled,
          currentPage: f.value,
          pageCount: m.value,
          nextText: e.nextText,
          nextIcon: e.nextIcon,
          onClick: h
        }),
        sizes: Rt(K8, {
          pageSize: l.value,
          pageSizes: e.pageSizes,
          popperClass: e.popperClass,
          disabled: e.disabled,
          teleported: e.teleported,
          size: e.small ? "small" : "default"
        }),
        slot: (x = (k = n == null ? void 0 : n.default) == null ? void 0 : k.call(n)) != null ? x : null,
        total: Rt(sC, { total: vt(e.total) ? 0 : e.total })
      }, P = e.layout.split(",").map((B) => B.trim());
      let R = !1;
      return P.forEach((B) => {
        if (B === "->") {
          R = !0;
          return;
        }
        R ? S.push(M[B]) : A.push(M[B]);
      }), w(A[0], s.is("first")), w(A[A.length - 1], s.is("last")), R && S.length > 0 && (w(S[0], s.is("first")), w(S[S.length - 1], s.is("last")), A.push($)), Rt("div", {
        class: [
          s.b(),
          s.is("background", e.background),
          {
            [s.m("small")]: e.small
          }
        ]
      }, A);
    };
  }
});
const _C = jt(vC), Jh = Re({
  trigger: ro.trigger,
  placement: Xs.placement,
  disabled: ro.disabled,
  visible: Tt.visible,
  transition: Tt.transition,
  popperOptions: Xs.popperOptions,
  tabindex: Xs.tabindex,
  content: Tt.content,
  popperStyle: Tt.popperStyle,
  popperClass: Tt.popperClass,
  enterable: {
    ...Tt.enterable,
    default: !0
  },
  effect: {
    ...Tt.effect,
    default: "light"
  },
  teleported: Tt.teleported,
  title: String,
  width: {
    type: [String, Number],
    default: 150
  },
  offset: {
    type: Number,
    default: void 0
  },
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  persistent: {
    type: Boolean,
    default: !0
  },
  "onUpdate:visible": {
    type: Function
  }
}), bC = {
  "update:visible": (e) => ol(e),
  "before-enter": () => !0,
  "before-leave": () => !0,
  "after-enter": () => !0,
  "after-leave": () => !0
}, yC = "onUpdate:visible", wC = Z({
  name: "ElPopover"
}), kC = /* @__PURE__ */ Z({
  ...wC,
  props: Jh,
  emits: bC,
  setup(e, { expose: t, emit: n }) {
    const r = e, s = I(() => r[yC]), o = Te("popover"), i = D(), a = I(() => {
      var y;
      return (y = _(i)) == null ? void 0 : y.popperRef;
    }), c = I(() => [
      {
        width: yr(r.width)
      },
      r.popperStyle
    ]), u = I(() => [o.b(), r.popperClass, { [o.m("plain")]: !!r.content }]), d = I(() => r.transition === `${o.namespace.value}-fade-in-linear`), l = () => {
      var y;
      (y = i.value) == null || y.hide();
    }, m = () => {
      n("before-enter");
    }, f = () => {
      n("before-leave");
    }, v = () => {
      n("after-enter");
    }, g = () => {
      n("update:visible", !1), n("after-leave");
    };
    return t({
      popperRef: a,
      hide: l
    }), (y, h) => (b(), Y(_(oo), We({
      ref_key: "tooltipRef",
      ref: i
    }, y.$attrs, {
      trigger: y.trigger,
      placement: y.placement,
      disabled: y.disabled,
      visible: y.visible,
      transition: y.transition,
      "popper-options": y.popperOptions,
      tabindex: y.tabindex,
      content: y.content,
      offset: y.offset,
      "show-after": y.showAfter,
      "hide-after": y.hideAfter,
      "auto-close": y.autoClose,
      "show-arrow": y.showArrow,
      "aria-label": y.title,
      effect: y.effect,
      enterable: y.enterable,
      "popper-class": _(u),
      "popper-style": _(c),
      teleported: y.teleported,
      persistent: y.persistent,
      "gpu-acceleration": _(d),
      "onUpdate:visible": _(s),
      onBeforeShow: m,
      onBeforeHide: f,
      onShow: v,
      onHide: g
    }), {
      content: J(() => [
        y.title ? (b(), C("div", {
          key: 0,
          class: H(_(o).e("title")),
          role: "title"
        }, ke(y.title), 3)) : te("v-if", !0),
        ae(y.$slots, "default", {}, () => [
          mr(ke(y.content), 1)
        ])
      ]),
      default: J(() => [
        y.$slots.reference ? ae(y.$slots, "reference", { key: 0 }) : te("v-if", !0)
      ]),
      _: 3
    }, 16, ["trigger", "placement", "disabled", "visible", "transition", "popper-options", "tabindex", "content", "offset", "show-after", "hide-after", "auto-close", "show-arrow", "aria-label", "effect", "enterable", "popper-class", "popper-style", "teleported", "persistent", "gpu-acceleration", "onUpdate:visible"]));
  }
});
var xC = /* @__PURE__ */ Ce(kC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popover/src/popover.vue"]]);
const bd = (e, t) => {
  const n = t.arg || t.value, r = n == null ? void 0 : n.popperRef;
  r && (r.triggerRef = e);
};
var CC = {
  mounted(e, t) {
    bd(e, t);
  },
  updated(e, t) {
    bd(e, t);
  }
};
const SC = "popover", EC = D4(CC, SC), AC = jt(xC, {
  directive: EC
}), $C = Re({
  animated: {
    type: Boolean,
    default: !1
  },
  count: {
    type: Number,
    default: 1
  },
  rows: {
    type: Number,
    default: 3
  },
  loading: {
    type: Boolean,
    default: !0
  },
  throttle: {
    type: Number
  }
}), MC = Re({
  variant: {
    type: String,
    values: [
      "circle",
      "rect",
      "h1",
      "h3",
      "text",
      "caption",
      "p",
      "image",
      "button"
    ],
    default: "text"
  }
}), IC = Z({
  name: "ElSkeletonItem"
}), TC = /* @__PURE__ */ Z({
  ...IC,
  props: MC,
  setup(e) {
    const t = Te("skeleton");
    return (n, r) => (b(), C("div", {
      class: H([_(t).e("item"), _(t).e(n.variant)])
    }, [
      n.variant === "image" ? (b(), Y(_(R4), { key: 0 })) : te("v-if", !0)
    ], 2));
  }
});
var Xo = /* @__PURE__ */ Ce(TC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/skeleton/src/skeleton-item.vue"]]);
const LC = Z({
  name: "ElSkeleton"
}), OC = /* @__PURE__ */ Z({
  ...LC,
  props: $C,
  setup(e, { expose: t }) {
    const n = e, r = Te("skeleton"), s = s5(Bt(n, "loading"), n.throttle);
    return t({
      uiLoading: s
    }), (o, i) => _(s) ? (b(), C("div", We({
      key: 0,
      class: [_(r).b(), _(r).is("animated", o.animated)]
    }, o.$attrs), [
      (b(!0), C(He, null, ot(o.count, (a) => (b(), C(He, { key: a }, [
        o.loading ? ae(o.$slots, "template", { key: a }, () => [
          he(Xo, {
            class: H(_(r).is("first")),
            variant: "p"
          }, null, 8, ["class"]),
          (b(!0), C(He, null, ot(o.rows, (c) => (b(), Y(Xo, {
            key: c,
            class: H([
              _(r).e("paragraph"),
              _(r).is("last", c === o.rows && o.rows > 1)
            ]),
            variant: "p"
          }, null, 8, ["class"]))), 128))
        ]) : te("v-if", !0)
      ], 64))), 128))
    ], 16)) : ae(o.$slots, "default", Xr(We({ key: 1 }, o.$attrs)));
  }
});
var RC = /* @__PURE__ */ Ce(OC, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/skeleton/src/skeleton.vue"]]);
const PC = jt(RC, {
  SkeletonItem: Xo
}), Nr = gs(Xo), BC = "TOOLTIP_APPEND_TO";
function zC() {
  return Le(
    BC,
    I(() => {
    })
  );
}
const Qh = "data:image/svg+xml,%3csvg%20viewBox='0%200%2012%2012'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M1%200.642857C1%200.287817%201.27473%200%201.61364%200H4.06818C4.40708%200%204.68182%200.287817%204.68182%200.642857V4.5C4.68182%204.85504%204.40708%205.14286%204.06818%205.14286H1.61364C1.27473%205.14286%201%204.85504%201%204.5V0.642857ZM2.22727%201.28571V3.85714H3.45455V1.28571H2.22727ZM6.31818%200.642857C6.31818%200.287817%206.59292%200%206.93182%200H8.15909C8.49799%200%208.77273%200.287817%208.77273%200.642857V3.85714H9.38636C9.72527%203.85714%2010%204.14496%2010%204.5C10%204.85504%209.72527%205.14286%209.38636%205.14286H6.93182C6.59292%205.14286%206.31818%204.85504%206.31818%204.5C6.31818%204.14496%206.59292%203.85714%206.93182%203.85714H7.54545V1.28571H6.93182C6.59292%201.28571%206.31818%200.997897%206.31818%200.642857ZM1%207.5C1%207.14496%201.27473%206.85714%201.61364%206.85714H2.84091C3.17981%206.85714%203.45455%207.14496%203.45455%207.5V10.7143H4.06818C4.40708%2010.7143%204.68182%2011.0021%204.68182%2011.3571C4.68182%2011.7122%204.40708%2012%204.06818%2012H1.61364C1.27473%2012%201%2011.7122%201%2011.3571C1%2011.0021%201.27473%2010.7143%201.61364%2010.7143H2.22727V8.14286H1.61364C1.27473%208.14286%201%207.85504%201%207.5ZM6.31818%207.5C6.31818%207.14496%206.59292%206.85714%206.93182%206.85714H9.38636C9.72527%206.85714%2010%207.14496%2010%207.5V11.3571C10%2011.7122%209.72527%2012%209.38636%2012H6.93182C6.59292%2012%206.31818%2011.7122%206.31818%2011.3571V7.5ZM7.54545%208.14286V10.7143H8.77273V8.14286H7.54545Z'%20/%3e%3c/svg%3e", DC = "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.2251%201.02271C13.5179%200.968554%2013.8195%201.00233%2014.0913%201.11939L14.2055%201.17506L14.3149%201.23951C14.5275%201.37763%2014.7014%201.56758%2014.8208%201.79127L14.8764%201.90553L14.9214%202.02467C15.0145%202.30522%2015.0227%202.60793%2014.9438%202.89478C14.9403%202.90772%2014.9372%202.92106%2014.9331%202.93385L13.0132%208.95338L12.9965%209.00025H19.9995C20.3769%208.99952%2020.7471%209.10523%2021.0669%209.30592C21.3874%209.50712%2021.6437%209.79562%2021.8071%2010.137C21.9704%2010.4783%2022.0341%2010.8588%2021.9897%2011.2346C21.9453%2011.6105%2021.7946%2011.9661%2021.5561%2012.26C21.5375%2012.2829%2021.5181%2012.3052%2021.4975%2012.3264L11.5971%2022.5266L11.5962%2022.5256C11.3774%2022.7595%2011.0907%2022.9194%2010.7749%2022.9778C10.4403%2023.0397%2010.0944%2022.9859%209.7944%2022.8254C9.4944%2022.665%209.25775%2022.4066%209.1235%2022.094C8.98941%2021.7815%208.96593%2021.4327%209.05612%2021.1047L9.06686%2021.0657L10.9868%2015.0462L11.0034%2015.0003H3.99948C3.62236%2015.0008%203.25253%2014.8941%202.93307%2014.6936C2.61276%2014.4925%202.35617%2014.2047%202.19284%2013.8635C2.02947%2013.5221%201.96581%2013.1408%202.01022%2012.7649C2.05468%2012.3892%202.20544%2012.0333%202.44382%2011.7395C2.46238%2011.7167%202.4819%2011.6942%202.50241%2011.6731L12.4028%201.47389C12.6215%201.23984%2012.9091%201.08117%2013.2251%201.02271Z'%20fill='currentColor'%20fill-opacity='0.9'%20style='fill:currentColor;fill-opacity:0.9;'/%3e%3c/svg%3e", NC = "data:image/svg+xml,%3csvg%20viewBox='0%200%20512%20512'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M224.975%2049.429c17.138-17.139%2044.919-17.139%2062.057%200l175.546%20175.546a43.8%2043.8%200%200%201%209.347%2013.817l.146.349q.125.298.243.598.1.25.197.5l.147.388q.133.356.261.716l.09.257q.141.407.275.818l.044.136a39%2039%200%200%201%20.306.988%2043.9%2043.9%200%200%201%201.802%2012.473c0%2012.497-5.225%2023.774-13.608%2031.767L287.032%20462.578c-17.138%2017.138-44.919%2017.138-62.057%200s-17.139-44.92%200-62.059l100.618-100.618H80.458c-24.238%200-43.887-19.649-43.887-43.886s19.65-43.887%2043.887-43.887h245.158L224.975%20111.486c-17.139-17.138-17.139-44.919%200-62.057'%20fill='currentColor'/%3e%3c/svg%3e", qC = "data:image/svg+xml,%3csvg%20viewBox='0%200%20512%20512'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M209.675%20387.718c20.945%2010.711%2030.794%2035.749%2022.073%2058.141-9.306%2023.886-36.221%2035.695-60.107%2026.389-29.106-11.34-56.354-28.746-79.744-52.137-20.47-20.47-36.356-43.894-47.607-68.932l-4.53-10.812-1.517-4.508c-6.284-22.673%205.511-46.874%2027.906-55.599%2022.392-8.721%2047.431%201.129%2058.141%2022.073l1.945%204.338%202.735%206.453c6.714%2014.943%2016.204%2028.982%2028.568%2041.346%2014.132%2014.132%2030.44%2024.54%2047.799%2031.304zM91.897%2091.905c23.39-23.39%2050.638-40.796%2079.744-52.137l4.508-1.517c22.673-6.284%2046.874%205.512%2055.599%2027.906%209.303%2023.885-2.526%2050.781-26.411%2060.086-17.359%206.763-33.667%2017.171-47.799%2031.303-12.364%2012.364-21.854%2026.403-28.568%2041.347l-2.735%206.453-1.945%204.337c-10.71%2020.945-35.75%2030.794-58.141%2022.073-23.886-9.306-35.695-36.221-26.39-60.107%2011.341-29.106%2028.747-56.353%2052.138-79.744M354.462%20354.47c12.364-12.364%2021.854-26.403%2028.568-41.346l2.735-6.453%201.945-4.338c10.71-20.944%2035.749-30.794%2058.141-22.073%2022.394%208.725%2034.19%2032.926%2027.906%2055.599l-1.517%204.508-4.53%2010.812c-11.251%2025.038-27.137%2048.462-47.607%2068.932-23.39%2023.391-50.638%2040.797-79.744%2052.137-23.886%209.306-50.801-2.503-60.107-26.389-9.303-23.885%202.526-50.78%2026.411-60.085l6.453-2.735c14.943-6.715%2028.982-16.205%2041.346-28.569m65.641-262.565c23.391%2023.391%2040.796%2050.638%2052.137%2079.744%209.306%2023.886-2.503%2050.801-26.389%2060.107-22.392%208.721-47.431-1.128-58.141-22.073l-1.945-4.337-2.735-6.453c-6.714-14.944-16.204-28.983-28.568-41.347-14.132-14.132-30.44-24.54-47.799-31.303-23.885-9.305-35.714-36.201-26.411-60.086%209.306-23.886%2036.221-35.694%2060.107-26.389l10.812%204.53c25.038%2011.25%2048.462%2027.137%2068.932%2047.607'%20fill='currentColor'%20/%3e%3c/svg%3e", e2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9%203L9%2021'%20stroke='currentColor'%20style='stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15%203L15%2021'%20stroke='currentColor'%20style='stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", FC = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20d='M10.12%203.3c.911-1.395%203.012-1.349%203.844.14l8.222%2014.712c.838%201.5-.246%203.348-1.964%203.348H3.778c-1.718%200-2.802-1.848-1.964-3.348L10.036%203.44zM5.057%2018.5h13.886L12%206.073z'/%3e%3c/svg%3e", HC = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20d='M4.5%209.5a2.5%202.5%200%201%201%200%205%202.5%202.5%200%200%201%200-5m7.5%200a2.5%202.5%200%201%201%200%205%202.5%202.5%200%200%201%200-5m7.5%200a2.5%202.5%200%201%201%200%205%202.5%202.5%200%200%201%200-5'/%3e%3c/svg%3e", jC = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20fill-rule='evenodd'%20d='M12%201c6.075%200%2011%204.925%2011%2011s-4.925%2011-11%2011S1%2018.075%201%2012%205.925%201%2012%201m5.56%205.44a1.5%201.5%200%200%200-2.12%200L12%209.878l-3.44-3.44A1.5%201.5%200%201%200%206.44%208.56L9.878%2012l-3.44%203.44a1.5%201.5%200%201%200%202.122%202.12L12%2014.122l3.44%203.44.114.103a1.5%201.5%200%200%200%202.11-2.11l-.104-.114L14.122%2012l3.44-3.44a1.5%201.5%200%200%200%200-2.12'%20clip-rule='evenodd'/%3e%3c/svg%3e", VC = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20d='M16.297%202.515A3%203%200%200%201%2016%208.5v2.26l.01.138a1%201%200%200%200%20.545.756l.006.003%201.774.898.184.1A3%203%200%200%201%2020%2015.238V16a2%202%200%200%201-2%202h-4.5v4a1.5%201.5%200%200%201-3%200v-4H6a2%202%200%200%201-1.99-1.803L4%2016v-.76l.008-.209a3%203%200%200%201%201.657-2.476l1.773-.898.007-.003a1%201%200%200%200%20.545-.756L8%2010.76V8.5a3%203%200%200%201%200-6h8z'/%3e%3c/svg%3e", UC = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3cpath%20fill='currentColor'%20d='M5.52%202.122c.322-.175.713-.16%201.021.037l14%209a1%201%200%200%201%200%201.682l-14%209A1.001%201.001%200%200%201%205%2021V3a1%201%200%200%201%20.52-.878'/%3e%3c/svg%3e", ZC = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20d='M16.645%205.907a1.5%201.5%200%200%201%202.122.028%209.77%209.77%200%200%201%202.585%204.953%209.9%209.9%200%200%201-.53%205.579%209.66%209.66%200%200%201-3.476%204.357%209.36%209.36%200%200%201-5.28%201.657%209.36%209.36%200%200%201-5.292-1.623%209.66%209.66%200%200%201-3.504-4.335%209.9%209.9%200%200%201-.564-5.576%209.77%209.77%200%200%201%202.556-4.97l.11-.105a1.501%201.501%200%200%201%202.05%202.187l-.166.178a6.8%206.8%200%200%200-1.602%203.266%206.9%206.9%200%200%200%20.393%203.884%206.66%206.66%200%200%200%202.413%202.989%206.36%206.36%200%200%200%203.595%201.105%206.36%206.36%200%200%200%203.59-1.128%206.66%206.66%200%200%200%202.394-3.005%206.9%206.9%200%200%200%20.37-3.887%206.77%206.77%200%200%200-1.79-3.433%201.5%201.5%200%200%201%20.026-2.12'/%3e%3cpath%20fill='currentColor'%20d='M12.035%201.481a1.5%201.5%200%200%201%201.5%201.5v9a1.5%201.5%200%200%201-3%200v-9a1.5%201.5%200%200%201%201.5-1.5'/%3e%3c/svg%3e", WC = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20d='M19.94%205.502a1.5%201.5%200%201%201%202.12%202.12L9.687%2019.999a1.5%201.5%200%200%201-2.122%200L1.94%2014.373a1.5%201.5%200%200%201%202.007-2.225l.115.104%204.564%204.564z'/%3e%3c/svg%3e", GC = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='currentColor'%20d='M21%206a1%201%200%201%201%200%202h-1v12.125c0%20.817-.424%201.534-.941%202.019-.522.488-1.256.856-2.059.856H7c-.803%200-1.537-.368-2.059-.856C4.424%2021.659%204%2020.943%204%2020.125V8H3a1%201%200%200%201%200-2zm-7-5a3%203%200%200%201%203%203H7a3%203%200%200%201%203-3z'/%3e%3c/svg%3e", KC = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.0506%202.38452C10.9161%200.882058%2013.0845%200.882058%2013.95%202.38452L23.3065%2018.6267C24.1706%2020.1267%2023.0883%2021.9997%2021.3572%2021.9998H2.6424C0.911559%2021.9994%20-0.170877%2020.1266%200.693176%2018.6267L10.0506%202.38452ZM11.9998%2015.9998C11.1715%2015.9999%2010.4999%2016.6715%2010.4998%2017.4998C10.4998%2018.3281%2011.1715%2018.9997%2011.9998%2018.9998C12.8282%2018.9998%2013.4998%2018.3282%2013.4998%2017.4998C13.4997%2016.6714%2012.8282%2015.9998%2011.9998%2015.9998ZM11.9998%207.49976C11.1715%207.49986%2010.4999%208.17148%2010.4998%208.99976V12.4998C10.4998%2013.3281%2011.1715%2013.9997%2011.9998%2013.9998C12.8282%2013.9998%2013.4998%2013.3282%2013.4998%2012.4998V8.99976C13.4997%208.17142%2012.8282%207.49976%2011.9998%207.49976Z'%20fill='currentColor'/%3e%3c/svg%3e", t2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M13.3333%2012.5525V12.4489C14.2278%2012.0756%2014.8571%2011.1925%2014.8571%2010.1632V3.61924C14.8571%202.96252%2014.5962%202.3327%2014.1318%201.86832C13.6675%201.40395%2013.0376%201.14307%2012.3809%201.14307H5.90473C5.38113%201.14296%204.87098%201.30883%204.44756%201.61684C4.02414%201.92485%203.70926%202.35915%203.54816%202.85734H3.39501C2.70016%202.85734%202.10892%203.10191%201.70206%203.5842C1.30739%204.05124%201.14282%204.67372%201.14282%205.33352V12.0002C1.14282%2012.8078%201.43463%2013.5346%201.98854%2014.0573C2.54168%2014.5777%203.30892%2014.8535%204.19044%2014.8535H7.17711L10.2826%2014.8573H10.2842C11.0278%2014.8611%2011.7645%2014.7049%2012.336%2014.3392C12.9303%2013.9582%2013.3333%2013.3525%2013.3333%2012.5525ZM3.39501%204.0002H3.42854V10.1625C3.42854%2010.8192%203.68942%2011.449%204.1538%2011.9134C4.61817%2012.3777%205.248%2012.6386%205.90473%2012.6386H12.1874C12.163%2012.9571%2012.003%2013.1948%2011.7196%2013.3761C11.3897%2013.588%2010.8891%2013.7175%2010.2887%2013.7144H10.2857L7.17558%2013.7106H4.19044C3.54816%2013.7106%203.07806%2013.5125%202.7733%2013.2253C2.47006%2012.9403%202.28568%2012.5259%202.28568%2012.0002V5.33352C2.28568%204.84971%202.40758%204.52057%202.5752%204.32096C2.73139%204.13658%202.98054%204.0002%203.39501%204.0002ZM8.01673%203.80972H11.619C11.7706%203.80972%2011.9159%203.86992%2012.0231%203.97709C12.1302%204.08425%2012.1904%204.22959%2012.1904%204.38115V7.98418C12.1904%208.13573%2012.1302%208.28107%2012.0231%208.38823C11.9159%208.4954%2011.7706%208.5556%2011.619%208.5556C11.4675%208.5556%2011.3221%208.4954%2011.215%208.38823C11.1078%208.28107%2011.0476%208.13573%2011.0476%207.98418V5.76019L7.07044%209.73731C7.0177%209.79186%206.95463%209.83536%206.8849%209.86528C6.81517%209.89519%206.74018%209.91092%206.6643%209.91154C6.58843%209.91217%206.51319%209.89767%206.44298%209.86891C6.37277%209.84014%206.30899%209.79768%206.25536%209.74401C6.20173%209.69033%206.15933%209.62651%206.13063%209.55627C6.10193%209.48603%206.08751%209.41078%206.0882%209.3349C6.0889%209.25903%206.1047%209.18406%206.13468%209.11435C6.16466%209.04465%206.20822%208.98162%206.26282%208.92893L10.24%204.95257H8.01673C7.86517%204.95257%207.71983%204.89237%207.61267%204.7852C7.5055%204.67804%207.4453%204.5327%207.4453%204.38115C7.4453%204.22959%207.5055%204.08425%207.61267%203.97709C7.71983%203.86992%207.86517%203.80972%208.01673%203.80972Z'%20/%3e%3c/svg%3e", XC = "data:image/svg+xml,%3csvg%20viewBox='0%200%20512%20512'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M416.648%20227.85c23.324%200%2042.232%2018.908%2042.232%2042.232v84.462c0%2038.872-31.513%2070.384-70.385%2070.385H191.423v36.402c0%2012.541-15.163%2018.822-24.031%209.954l-78.63-78.631c-5.498-5.497-5.498-14.411%200-19.908l78.63-78.631c8.868-8.868%2024.031-2.587%2024.031%209.954v36.398h182.995v-70.385c0-23.324%2018.907-42.231%2042.23-42.232M304.028%2050.669c0-12.541%2015.163-18.822%2024.031-9.954l78.63%2078.631c5.498%205.497%205.498%2014.41%200%2019.908l-78.63%2078.631c-8.868%208.867-24.031%202.587-24.031-9.954v-36.38H121.033v70.385c0%2023.324-18.908%2042.231-42.231%2042.231s-42.23-18.907-42.23-42.231v-84.462c0-38.872%2031.512-70.385%2070.384-70.385h197.072z'%20fill='currentColor'/%3e%3c/svg%3e", YC = "data:image/svg+xml,%3csvg%20viewBox='0%200%20512%20512'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M275.114%2036.8c22.13%202.247%2039.401%2020.934%2039.401%2043.657v307.204h73.142c24.237%200%2043.886%2019.648%2043.886%2043.885s-19.648%2043.886-43.886%2043.886H153.6c-24.238-.001-43.886-19.649-43.886-43.886s19.648-43.885%2043.886-43.885h73.143V124.343H153.6c-24.238%200-43.886-19.649-43.886-43.886s19.648-43.885%2043.886-43.886h117.029z'%20fill='currentColor'/%3e%3c/svg%3e", n2 = "data:image/svg+xml,%3csvg%20viewBox='0%20-1%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M1.63636%200H8.18182C9.08556%200%209.81818%200.732625%209.81818%201.63636C9.81818%202.5401%209.08556%203.27273%208.18182%203.27273H1.63636C0.732626%203.27273%200%202.5401%200%201.63636C0%200.732625%200.732625%200%201.63636%200ZM1.63636%201.09091C1.33512%201.09091%201.09091%201.33512%201.09091%201.63636C1.09091%201.93761%201.33512%202.18182%201.63636%202.18182H8.18182C8.48306%202.18182%208.72727%201.93761%208.72727%201.63636C8.72727%201.33512%208.48306%201.09091%208.18182%201.09091H1.63636Z%20M7.09091%204.36353H11.4545C12.3583%204.36353%2013.0909%205.09615%2013.0909%205.99989C13.0909%206.90363%2012.3583%207.63625%2011.4545%207.63625H7.09091C6.18717%207.63625%205.45454%206.90363%205.45454%205.99989C5.45454%205.09615%206.18717%204.36353%207.09091%204.36353ZM7.09091%205.45443C6.78966%205.45443%206.54545%205.69864%206.54545%205.99989C6.54545%206.30114%206.78966%206.54534%207.09091%206.54534H11.4545C11.7558%206.54534%2012%206.30114%2012%205.99989C12%205.69864%2011.7558%205.45443%2011.4545%205.45443H7.09091Z%20M7.09091%208.72729H11.4545C12.3583%208.72729%2013.0909%209.45992%2013.0909%2010.3637C13.0909%2011.2674%2012.3583%2012%2011.4545%2012H7.09091C6.18717%2012%205.45454%2011.2674%205.45454%2010.3637C5.45454%209.45992%206.18717%208.72729%207.09091%208.72729ZM7.09091%209.8182C6.78966%209.8182%206.54545%2010.0624%206.54545%2010.3637C6.54545%2010.6649%206.78966%2010.9091%207.09091%2010.9091H11.4545C11.7558%2010.9091%2012%2010.6649%2012%2010.3637C12%2010.0624%2011.7558%209.8182%2011.4545%209.8182H7.09091Z'%20/%3e%3c/svg%3e", r2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%202V5'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M12%2019V22'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M12%202V5'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M12%2019V22'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M22.005%2011.9951L19.005%2011.9951'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M5.005%2011.9951L2.005%2011.9951'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M19.0796%2019.0676L16.9583%2016.9463'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M7.05884%207.04688L4.93752%204.92555'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M4.9375%2019.0676L7.05882%2016.9463'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M16.9583%207.04688L19.0796%204.92556'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e", o2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%2014%207%20C%2014%2010.866%2010.866%2014%207%2014%20C%203.134%2014%200%2010.866%200%207%20C%200%203.134%203.134%200%207%200%20C%2010.866%200%2014%203.134%2014%207%20Z%20M%2011.243%206%20L%202.758%206%20L%202.758%208%20L%2011.243%208%20L%2011.243%206%20Z'%20/%3e%3c/svg%3e", s2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%2014%207%20C%2014%2010.866%2010.866%2014%207%2014%20C%203.134%2014%200%2010.866%200%207%20C%200%203.134%203.134%200%207%200%20C%2010.866%200%2014%203.134%2014%207%20Z%20M%202.575%207.728%20L%205.782%2010.935%20L%2011.489%205.228%20L%2010.075%203.814%20L%205.782%208.107%20L%203.989%206.314%20L%202.575%207.728%20Z'%20/%3e%3c/svg%3e", i2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%204.207%202.793%20L%207%205.586%20L%209.793%202.793%20L%2011.207%204.207%20L%208.414%207%20L%2011.207%209.793%20L%209.793%2011.207%20L%207%208.414%20L%204.207%2011.207%20L%202.793%209.793%20L%205.586%207%20L%202.793%204.207%20L%204.207%202.793%20Z%20M%207%200%20C%203.134%200%200%203.134%200%207%20C%200%2010.866%203.134%2014%207%2014%20C%2010.866%2014%2014%2010.866%2014%207%20C%2014%203.134%2010.866%200%207%200%20Z'%20/%3e%3c/svg%3e", a2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%2014%207.006%20C%2014%208.867%2013.162%2010.744%2011.95%2011.956%20C%2010.738%2013.168%208.861%2014.006%207%2014.006%20C%205.139%2014.006%203.262%2013.168%202.05%2011.956%20C%200.838%2010.744%200%208.867%200%207.006%20C%200%205.145%200.838%203.268%202.05%202.056%20C%203.262%200.844%205.139%200.006%207%200.006%20C%208.861%200.006%2010.738%200.844%2011.95%202.056%20C%2013.162%203.268%2014%205.145%2014%207.006%20Z%20M%2010.536%203.47%20C%209.576%202.511%208.453%202.006%207%202.006%20C%205.547%202.006%204.424%202.511%203.464%203.47%20C%202.505%204.43%202%205.553%202%207.006%20C%202%208.459%202.505%209.582%203.464%2010.542%20C%204.424%2011.501%205.547%2012.006%207%2012.006%20C%208.453%2012.006%209.576%2011.501%2010.536%2010.542%20C%2011.495%209.582%2012%208.459%2012%207.006%20C%2012%205.553%2011.495%204.43%2010.536%203.47%20Z'%20/%3e%3c/svg%3e", c2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M13.8668%208.36613L11.9048%207.978C11.967%207.66329%2012%207.33649%2012%207C12%206.66351%2011.967%206.3367%2011.9048%206.022L13.8668%205.63387C13.9542%206.07571%2014%206.5325%2014%207C14%207.4675%2013.9542%207.92429%2013.8668%208.36613ZM12.821%203.11069L11.159%204.22333C10.7934%203.67721%2010.3228%203.2066%209.77667%202.84098L10.8893%201.17904C11.6527%201.6901%2012.3099%202.34733%2012.821%203.11069ZM8.36613%200.133238L7.978%202.09521C7.66329%202.03296%207.33649%202%207%202C6.66351%202%206.3367%202.03296%206.022%202.09521L5.63387%200.133238C6.07571%200.0458286%206.5325%200%207%200C7.4675%200%207.92429%200.0458285%208.36613%200.133238ZM3.11069%201.17904L4.22333%202.84098C3.67721%203.2066%203.2066%203.67721%202.84098%204.22333L1.17904%203.11069C1.6901%202.34733%202.34733%201.6901%203.11069%201.17904ZM0.133238%205.63387C0.0458285%206.07571%200%206.5325%200%207C0%207.4675%200.0458286%207.92429%200.133238%208.36613L2.09521%207.978C2.03296%207.6633%202%207.33649%202%207C2%206.66351%202.03296%206.33671%202.09521%206.022L0.133238%205.63387ZM1.17904%2010.8893L2.84098%209.77667C3.2066%2010.3228%203.67721%2010.7934%204.22333%2011.159L3.11069%2012.821C2.34733%2012.3099%201.6901%2011.6527%201.17904%2010.8893ZM5.63387%2013.8668L6.022%2011.9048C6.33671%2011.967%206.66351%2012%207%2012C7.33649%2012%207.6633%2011.967%207.978%2011.9048L8.36613%2013.8668C7.92429%2013.9542%207.4675%2014%207%2014C6.5325%2014%206.07571%2013.9542%205.63387%2013.8668ZM10.8893%2012.821L9.77667%2011.159C10.3228%2010.7934%2010.7934%2010.3228%2011.159%209.77667L12.821%2010.8893C12.3099%2011.6527%2011.6527%2012.3099%2010.8893%2012.821Z'%20/%3e%3c/svg%3e", l2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M7%2014C10.866%2014%2014%2010.866%2014%207C14%203.13401%2010.866%200%207%200C3.13401%200%200%203.13401%200%207C0%2010.866%203.13401%2014%207%2014ZM7%2012C4.23858%2012%202%209.76142%202%207C2%204.23858%204.23858%202%207%202C9.76142%202%2012%204.23858%2012%207C12%209.76142%209.76142%2012%207%2012ZM6%203V8H11C11%205.23858%208.76142%203%206%203Z'%20/%3e%3c/svg%3e", u2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2014%2014'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M%2014%207%20C%2014%2010.866%2010.866%2014%207%2014%20C%203.134%2014%200%2010.866%200%207%20C%200%203.134%203.134%200%207%200%20C%2010.866%200%2014%203.134%2014%207%20Z%20M%206.5%209%20C%206.224%209%206%209.224%206%209.5%20L%206%2010.5%20C%206%2010.776%206.224%2011%206.5%2011%20L%207.5%2011%20C%207.776%2011%208%2010.776%208%2010.5%20L%208%209.5%20C%208%209.224%207.776%209%207.5%209%20L%206.5%209%20Z%20M%206.5%203%20C%206.224%203%206%203.224%206%203.5%20L%206%207.5%20C%206%207.776%206.224%208%206.5%208%20L%207.5%208%20C%207.776%208%208%207.776%208%207.5%20L%208%203.5%20C%208%203.224%207.776%203%207.5%203%20L%206.5%203%20Z'%20/%3e%3c/svg%3e", d2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2012%2012'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M1.78814e-07%200.666667C1.78814e-07%200.298477%200.298477%200%200.666667%200H11.3333C11.7015%200%2012%200.298477%2012%200.666667C12%201.03486%2011.7015%201.33333%2011.3333%201.33333H0.666667C0.298477%201.33333%201.78814e-07%201.03486%201.78814e-07%200.666667ZM1.78814e-07%203.62963C1.78814e-07%203.26144%200.298477%202.96296%200.666667%202.96296H11.3333C11.7015%202.96296%2012%203.26144%2012%203.62963C12%203.99782%2011.7015%204.2963%2011.3333%204.2963H0.666667C0.298477%204.2963%201.78814e-07%203.99782%201.78814e-07%203.62963ZM0%206.59259C0%206.2244%200.298477%205.92593%200.666667%205.92593H11.3333C11.7015%205.92593%2012%206.2244%2012%206.59259C12%206.96078%2011.7015%207.25926%2011.3333%207.25926H0.666667C0.298477%207.25926%200%206.96078%200%206.59259ZM0%209.55556C0%209.18737%200.298477%208.88889%200.666667%208.88889H8.66667C9.03486%208.88889%209.33333%209.18737%209.33333%209.55556C9.33333%209.92375%209.03486%2010.2222%208.66667%2010.2222H0.666667C0.298477%2010.2222%200%209.92375%200%209.55556Z'%20/%3e%3c/svg%3e", f2 = "data:image/svg+xml,%3csvg%20aria-hidden='true'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20style='stroke:currentColor;stroke-opacity:%201;'%20d='M8%208V4a2%202%200%200%201%202-2h4a2%202%200%200%201%202%202v4m6%2012V10a2%202%200%200%200-2-2H4a2%202%200%200%200-2%202v10a2%202%200%200%200%202%202h16a2%202%200%200%200%202-2ZM8%2013v4m8-4v4M2%2015h20'%20stroke='currentColor'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e", p2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%20512%20512'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='currentColor'%20d='M214.433%2056C232.908%2023.9999%20279.096%2024.0001%20297.571%2056L477.704%20368C496.18%20400%20473.085%20440%20436.135%20440H75.8685C38.918%20440%2015.8241%20400%2034.2993%20368L214.433%2056ZM256.002%20144L131.294%20360H380.709L256.002%20144Z'%20/%3e%3c/svg%3e", h2 = "data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='2'%20y='2'%20width='5'%20height='5'%20rx='1'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'/%3e%3crect%20x='17'%20y='2'%20width='5'%20height='5'%20rx='1'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'/%3e%3crect%20x='17'%20y='17'%20width='5'%20height='5'%20rx='1'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'/%3e%3crect%20x='2'%20y='17'%20width='5'%20height='5'%20rx='1'%20stroke='currentColor'%20style='stroke:currentColor;stroke-opacity:1;'%20stroke-width='2'/%3e%3crect%20x='7'%20y='3'%20width='10'%20height='2'%20fill='currentColor'%20style='fill:currentColor;fill-opacity:1;'/%3e%3crect%20x='7'%20y='19'%20width='10'%20height='2'%20fill='currentColor'%20style='fill:currentColor;fill-opacity:1;'/%3e%3crect%20x='3'%20y='7'%20width='2'%20height='10'%20fill='currentColor'%20style='fill:currentColor;fill-opacity:1;'/%3e%3crect%20x='19'%20y='7'%20width='2'%20height='10'%20fill='currentColor'%20style='fill:currentColor;fill-opacity:1;'/%3e%3c/svg%3e", JC = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function QC(e, t) {
  return b(), C("svg", JC, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21 12H9m12 6H7M21 6H3"
    }, null, -1)
  ]));
}
const g2 = { name: "lucide-align-right", render: QC }, e9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function t9(e, t) {
  return b(), C("svg", e9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "20",
        height: "5",
        x: "2",
        y: "3",
        rx: "1"
      }),
      p("path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8m-10 4h4" })
    ], -1)
  ]));
}
const m2 = { name: "lucide-archive", render: t9 }, n9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function r9(e, t) {
  return b(), C("svg", n9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 5v14m7-7l-7 7l-7-7"
    }, null, -1)
  ]));
}
const v2 = { name: "lucide-arrow-down", render: r9 }, o9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function s9(e, t) {
  return b(), C("svg", o9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m12 19l-7-7l7-7m7 7H5"
    }, null, -1)
  ]));
}
const Ic = { name: "lucide-arrow-left", render: s9 }, i9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function a9(e, t) {
  return b(), C("svg", i9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3L4 7l4 4M4 7h16m-4 14l4-4l-4-4m4 4H4"
    }, null, -1)
  ]));
}
const _2 = { name: "lucide-arrow-left-right", render: a9 }, c9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function l9(e, t) {
  return b(), C("svg", c9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 12h14m-7-7l7 7l-7 7"
    }, null, -1)
  ]));
}
const b2 = { name: "lucide-arrow-right", render: l9 }, u9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function d9(e, t) {
  return b(), C("svg", u9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 5v14m18-7H7m8 6l6-6l-6-6"
    }, null, -1)
  ]));
}
const f9 = { name: "lucide-arrow-right-from-line", render: d9 }, p9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function h9(e, t) {
  return b(), C("svg", p9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17 12H3m8 6l6-6l-6-6m10-1v14"
    }, null, -1)
  ]));
}
const g9 = { name: "lucide-arrow-right-to-line", render: h9 }, m9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function v9(e, t) {
  return b(), C("svg", m9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m5 12l7-7l7 7m-7 7V5"
    }, null, -1)
  ]));
}
const y2 = { name: "lucide-arrow-up", render: v9 }, _9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function b9(e, t) {
  return b(), C("svg", _9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }),
      p("path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" })
    ], -1)
  ]));
}
const w2 = { name: "lucide-at-sign", render: b9 }, y9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function w9(e, t) {
  return b(), C("svg", y9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "m4.9 4.9l14.2 14.2" })
    ], -1)
  ]));
}
const k2 = { name: "lucide-ban", render: w9 }, k9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function x9(e, t) {
  return b(), C("svg", k9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10.268 21a2 2 0 0 0 3.464 0m-10.47-5.674A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
    }, null, -1)
  ]));
}
const x2 = { name: "lucide-bell", render: x9 }, C9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function S9(e, t) {
  return b(), C("svg", C9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
    }, null, -1)
  ]));
}
const C2 = { name: "lucide-book", render: S9 }, E9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function A9(e, t) {
  return b(), C("svg", E9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 7v14m-9-3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4a4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3a3 3 0 0 0-3-3z"
    }, null, -1)
  ]));
}
const $9 = { name: "lucide-book-open", render: A9 }, M9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function I9(e, t) {
  return b(), C("svg", M9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 8V4H8" }),
      p("rect", {
        width: "16",
        height: "12",
        x: "4",
        y: "8",
        rx: "2"
      }),
      p("path", { d: "M2 14h2m16 0h2m-7-1v2m-6-2v2" })
    ], -1)
  ]));
}
const S2 = { name: "lucide-bot", render: I9 }, T9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function L9(e, t) {
  return b(), C("svg", T9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" }),
      p("path", { d: "m3.3 7l8.7 5l8.7-5M12 22V12" })
    ], -1)
  ]));
}
const E2 = { name: "lucide-box", render: L9 }, O9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function R9(e, t) {
  return b(), C("svg", O9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2a2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1m8 0h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"
    }, null, -1)
  ]));
}
const A2 = { name: "lucide-braces", render: R9 }, P9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function B9(e, t) {
  return b(), C("svg", P9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 5a3 3 0 1 0-5.997.125a4 4 0 0 0-2.526 5.77a4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }),
      p("path", { d: "M12 5a3 3 0 1 1 5.997.125a4 4 0 0 1 2.526 5.77a4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" }),
      p("path", { d: "M15 13a4.5 4.5 0 0 1-3-4a4.5 4.5 0 0 1-3 4m8.599-6.5a3 3 0 0 0 .399-1.375m-11.995 0A3 3 0 0 0 6.401 6.5m-2.924 4.396a4 4 0 0 1 .585-.396m15.876 0a4 4 0 0 1 .585.396M6 18a4 4 0 0 1-1.967-.516m15.934 0A4 4 0 0 1 18 18" })
    ], -1)
  ]));
}
const $2 = { name: "lucide-brain", render: B9 }, z9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function D9(e, t) {
  return b(), C("svg", z9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m8 2l1.88 1.88m4.24 0L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" }),
      p("path", { d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6m0 0v-9" }),
      p("path", { d: "M6.53 9C4.6 8.8 3 7.1 3 5m3 8H2m1 8c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4m-.8 4c2.1.1 3.8 1.9 3.8 4" })
    ], -1)
  ]));
}
const M2 = { name: "lucide-bug", render: D9 }, N9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function q9(e, t) {
  return b(), C("svg", N9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "16",
        height: "20",
        x: "4",
        y: "2",
        rx: "2"
      }),
      p("path", { d: "M8 6h8m0 8v4m0-8h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" })
    ], -1)
  ]));
}
const I2 = { name: "lucide-calculator", render: q9 }, F9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function H9(e, t) {
  return b(), C("svg", F9, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M8 2v4m8-4v4" }),
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2"
      }),
      p("path", { d: "M3 10h18" })
    ], -1)
  ]));
}
const T2 = { name: "lucide-calendar", render: H9 }, j9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function V9(e, t) {
  return b(), C("svg", j9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m3 15l4-8l4 8m-7-2h6m5-2h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4"
    }, null, -1)
  ]));
}
const L2 = { name: "lucide-case-upper", render: V9 }, U9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Z9(e, t) {
  return b(), C("svg", U9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M13 17V9m5 8v-3M3 3v16a2 2 0 0 0 2 2h16M8 17V5"
    }, null, -1)
  ]));
}
const O2 = { name: "lucide-chart-column-decreasing", render: Z9 }, W9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function G9(e, t) {
  return b(), C("svg", W9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M20 6L9 17l-5-5"
    }, null, -1)
  ]));
}
const R2 = { name: "lucide-check", render: G9 }, K9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function X9(e, t) {
  return b(), C("svg", K9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M18 6L7 17l-5-5m20-2l-7.5 7.5L13 16"
    }, null, -1)
  ]));
}
const P2 = { name: "lucide-check-check", render: X9 }, Y9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function J9(e, t) {
  return b(), C("svg", Y9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m6 9l6 6l6-6"
    }, null, -1)
  ]));
}
const zo = { name: "lucide-chevron-down", render: J9 }, Q9 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function e7(e, t) {
  return b(), C("svg", Q9, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m15 18l-6-6l6-6"
    }, null, -1)
  ]));
}
const Do = { name: "lucide-chevron-left", render: e7 }, t7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function n7(e, t) {
  return b(), C("svg", t7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m9 18l6-6l-6-6"
    }, null, -1)
  ]));
}
const No = { name: "lucide-chevron-right", render: n7 }, r7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function o7(e, t) {
  return b(), C("svg", r7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m18 15l-6-6l-6 6"
    }, null, -1)
  ]));
}
const qo = { name: "lucide-chevron-up", render: o7 }, s7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function i7(e, t) {
  return b(), C("svg", s7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m7 20l5-5l5 5M7 4l5 5l5-5"
    }, null, -1)
  ]));
}
const a7 = { name: "lucide-chevrons-down-up", render: i7 }, c7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function l7(e, t) {
  return b(), C("svg", c7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m11 17l-5-5l5-5m7 10l-5-5l5-5"
    }, null, -1)
  ]));
}
const B2 = { name: "lucide-chevrons-left", render: l7 }, u7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function d7(e, t) {
  return b(), C("svg", u7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m7 15l5 5l5-5M7 9l5-5l5 5"
    }, null, -1)
  ]));
}
const z2 = { name: "lucide-chevrons-up-down", render: d7 }, f7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function p7(e, t) {
  return b(), C("svg", f7, t[0] || (t[0] = [
    p("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, null, -1)
  ]));
}
const D2 = { name: "lucide-circle", render: p7 }, h7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function g7(e, t) {
  return b(), C("svg", h7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M12 8v4m0 4h.01" })
    ], -1)
  ]));
}
const N2 = { name: "lucide-circle-alert", render: g7 }, m7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function v7(e, t) {
  return b(), C("svg", m7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "m9 12l2 2l4-4" })
    ], -1)
  ]));
}
const q2 = { name: "lucide-circle-check", render: v7 }, _7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function b7(e, t) {
  return b(), C("svg", _7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "1"
      })
    ], -1)
  ]));
}
const F2 = { name: "lucide-circle-dot", render: b7 }, y7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function w7(e, t) {
  return b(), C("svg", y7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" })
    ], -1)
  ]));
}
const Tc = { name: "lucide-circle-help", render: w7 }, k7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function x7(e, t) {
  return b(), C("svg", k7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M8 12h8" })
    ], -1)
  ]));
}
const H2 = { name: "lucide-circle-minus", render: x7 }, C7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function S7(e, t) {
  return b(), C("svg", C7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M10 15V9m4 6V9" })
    ], -1)
  ]));
}
const j2 = { name: "lucide-circle-pause", render: S7 }, E7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function A7(e, t) {
  return b(), C("svg", E7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "m10 8l6 4l-6 4z" })
    ], -1)
  ]));
}
const V2 = { name: "lucide-circle-play", render: A7 }, $7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function M7(e, t) {
  return b(), C("svg", $7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M8 12h8m-4-4v8" })
    ], -1)
  ]));
}
const U2 = { name: "lucide-circle-plus", render: M7 }, I7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function T7(e, t) {
  return b(), C("svg", I7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M18 20a6 6 0 0 0-12 0" }),
      p("circle", {
        cx: "12",
        cy: "10",
        r: "4"
      }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      })
    ], -1)
  ]));
}
const Z2 = { name: "lucide-circle-user-round", render: T7 }, L7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function O7(e, t) {
  return b(), C("svg", L7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "m15 9l-6 6m0-6l6 6" })
    ], -1)
  ]));
}
const W2 = { name: "lucide-circle-x", render: O7 }, R7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function P7(e, t) {
  return b(), C("svg", R7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "8",
        height: "4",
        x: "8",
        y: "2",
        rx: "1",
        ry: "1"
      }),
      p("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01" })
    ], -1)
  ]));
}
const G2 = { name: "lucide-clipboard-list", render: P7 }, B7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function z7(e, t) {
  return b(), C("svg", B7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 6v6l4 2" }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      })
    ], -1)
  ]));
}
const K2 = { name: "lucide-clock", render: z7 }, D7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function N7(e, t) {
  return b(), C("svg", D7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9"
    }, null, -1)
  ]));
}
const X2 = { name: "lucide-cloud", render: N7 }, q7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function F7(e, t) {
  return b(), C("svg", q7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 13v8l-4-4m4 4l4-4" }),
      p("path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" })
    ], -1)
  ]));
}
const Y2 = { name: "lucide-cloud-download", render: F7 }, H7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function j7(e, t) {
  return b(), C("svg", H7, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m16 18l6-6l-6-6M8 6l-6 6l6 6"
    }, null, -1)
  ]));
}
const J2 = { name: "lucide-code", render: j7 }, V7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function U7(e, t) {
  return b(), C("svg", V7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16" }),
      p("path", { d: "M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0-12v2m0 18v-2m5 .66l-1-1.73m-5-8.66L7 3.34M20.66 17l-1.73-1M3.34 7l1.73 1M14 12h8M2 12h2m16.66-5l-1.73 1M3.34 17l1.73-1M17 3.34l-1 1.73m-5 8.66l-4 6.93" })
    ], -1)
  ]));
}
const Lc = { name: "lucide-cog", render: U7 }, Z7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function W7(e, t) {
  return b(), C("svg", Z7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M12 18a6 6 0 0 0 0-12z" })
    ], -1)
  ]));
}
const Q2 = { name: "lucide-contrast", render: W7 }, G7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function K7(e, t) {
  return b(), C("svg", G7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2"
      }),
      p("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })
    ], -1)
  ]));
}
const e1 = { name: "lucide-copy", render: K7 }, X7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Y7(e, t) {
  return b(), C("svg", X7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M22 12h-4M6 12H2m10-6V2m0 20v-4" })
    ], -1)
  ]));
}
const J7 = { name: "lucide-crosshair", render: Y7 }, Q7 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function eS(e, t) {
  return b(), C("svg", Q7, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("ellipse", {
        cx: "12",
        cy: "5",
        rx: "9",
        ry: "3"
      }),
      p("path", { d: "M3 5v14a9 3 0 0 0 18 0V5" }),
      p("path", { d: "M3 12a9 3 0 0 0 18 0" })
    ], -1)
  ]));
}
const t1 = { name: "lucide-database", render: eS }, tS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function nS(e, t) {
  return b(), C("svg", tS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      })
    ], -1)
  ]));
}
const n1 = { name: "lucide-earth", render: nS }, rS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function oS(e, t) {
  return b(), C("svg", rS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "1"
      }),
      p("circle", {
        cx: "19",
        cy: "12",
        r: "1"
      }),
      p("circle", {
        cx: "5",
        cy: "12",
        r: "1"
      })
    ], -1)
  ]));
}
const r1 = { name: "lucide-ellipsis", render: oS }, sS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function iS(e, t) {
  return b(), C("svg", sS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "1"
      }),
      p("circle", {
        cx: "12",
        cy: "5",
        r: "1"
      }),
      p("circle", {
        cx: "12",
        cy: "19",
        r: "1"
      })
    ], -1)
  ]));
}
const o1 = { name: "lucide-ellipsis-vertical", render: iS }, aS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function cS(e, t) {
  return b(), C("svg", aS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 9h14M5 15h14"
    }, null, -1)
  ]));
}
const s1 = { name: "lucide-equal", render: cS }, lS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function uS(e, t) {
  return b(), C("svg", lS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m15 15l6 6M15 9l6-6m0 13v5h-5m5-13V3h-5M3 16v5h5m-5 0l6-6M3 8V3h5m1 6L3 3"
    }, null, -1)
  ]));
}
const dS = { name: "lucide-expand", render: uS }, fS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function pS(e, t) {
  return b(), C("svg", fS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    }, null, -1)
  ]));
}
const i1 = { name: "lucide-external-link", render: pS }, hS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function gS(e, t) {
  return b(), C("svg", hS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })
    ], -1)
  ]));
}
const a1 = { name: "lucide-eye", render: gS }, mS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function vS(e, t) {
  return b(), C("svg", mS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }),
      p("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })
    ], -1)
  ]));
}
const c1 = { name: "lucide-eye-off", render: vS }, _S = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function bS(e, t) {
  return b(), C("svg", _S, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4" })
    ], -1)
  ]));
}
const l1 = { name: "lucide-file", render: bS }, yS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function wS(e, t) {
  return b(), C("svg", yS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M10 12v-1m0 7v-2m0-9V6m4-4v4a2 2 0 0 0 2 2h4" }),
      p("path", { d: "M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01" }),
      p("circle", {
        cx: "10",
        cy: "20",
        r: "2"
      })
    ], -1)
  ]));
}
const u1 = { name: "lucide-file-archive", render: wS }, kS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function xS(e, t) {
  return b(), C("svg", kS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M10 12.5L8 15l2 2.5m4-5l2 2.5l-2 2.5M14 2v4a2 2 0 0 0 2 2h4" }),
      p("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" })
    ], -1)
  ]));
}
const d1 = { name: "lucide-file-code", render: xS }, CS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function SS(e, t) {
  return b(), C("svg", CS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Zm-6 8h6m-3 3V7M9 17h6"
    }, null, -1)
  ]));
}
const ES = { name: "lucide-file-diff", render: SS }, AS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function $S(e, t) {
  return b(), C("svg", AS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4m-8 10v-6m-3 3l3 3l3-3" })
    ], -1)
  ]));
}
const f1 = { name: "lucide-file-down", render: $S }, MS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function IS(e, t) {
  return b(), C("svg", MS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }),
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4M2 15h10m-3 3l3-3l-3-3" })
    ], -1)
  ]));
}
const p1 = { name: "lucide-file-input", render: IS }, TS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function LS(e, t) {
  return b(), C("svg", TS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4M4 7V4a2 2 0 0 1 2-2a2 2 0 0 0-2 2" }),
      p("path", { d: "M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6m-1 9l-3 3" }),
      p("path", { d: "m5 17l-3-3h10" })
    ], -1)
  ]));
}
const h1 = { name: "lucide-file-output", render: LS }, OS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function RS(e, t) {
  return b(), C("svg", OS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
      p("path", { d: "M14 2v4a2 2 0 0 0 2 2h4M10 9H8m8 4H8m8 4H8" })
    ], -1)
  ]));
}
const Oc = { name: "lucide-file-text", render: RS }, PS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function BS(e, t) {
  return b(), C("svg", PS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M20 7h-3a2 2 0 0 1-2-2V2" }),
      p("path", { d: "M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" }),
      p("path", { d: "M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" })
    ], -1)
  ]));
}
const g1 = { name: "lucide-files", render: BS }, zS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function DS(e, t) {
  return b(), C("svg", zS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4M14 13.12c0 2.38 0 6.38-1 8.88m4.29-.98c.12-.6.43-2.3.5-3.02M2 12a10 10 0 0 1 18-6M2 16h.01m19.79 0c.2-2 .131-5.354 0-6" }),
      p("path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2m2.31 12c.21-.66.45-1.32.57-2M9 6.8a6 6 0 0 1 9 5.2v2" })
    ], -1)
  ]));
}
const m1 = { name: "lucide-fingerprint", render: DS }, NS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function qS(e, t) {
  return b(), C("svg", NS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2M6.453 15h11.094M8.5 2h7"
    }, null, -1)
  ]));
}
const v1 = { name: "lucide-flask-conical", render: qS }, FS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function HS(e, t) {
  return b(), C("svg", FS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }, null, -1)
  ]));
}
const _1 = { name: "lucide-folder", render: HS }, jS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function VS(e, t) {
  return b(), C("svg", jS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
    }, null, -1)
  ]));
}
const b1 = { name: "lucide-folder-open", render: VS }, US = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function ZS(e, t) {
  return b(), C("svg", US, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 10v6m-3-3h6m5 7a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
    }, null, -1)
  ]));
}
const y1 = { name: "lucide-folder-plus", render: ZS }, WS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function GS(e, t) {
  return b(), C("svg", WS, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"
    }, null, -1)
  ]));
}
const w1 = { name: "lucide-funnel", render: GS }, KS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function XS(e, t) {
  return b(), C("svg", KS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M6 3h12l4 6l-10 13L2 9Z" }),
      p("path", { d: "M11 3L8 9l4 13l4-13l-3-6M2 9h20" })
    ], -1)
  ]));
}
const k1 = { name: "lucide-gem", render: XS }, YS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function JS(e, t) {
  return b(), C("svg", YS, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "4",
        x: "3",
        y: "8",
        rx: "1"
      }),
      p("path", { d: "M12 8v13m7-9v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5" })
    ], -1)
  ]));
}
const x1 = { name: "lucide-gift", render: JS }, QS = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function eE(e, t) {
  return b(), C("svg", QS, t[0] || (t[0] = [
    Dn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 3v12"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></g>', 1)
  ]));
}
const C1 = { name: "lucide-git-branch", render: eE }, tE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function nE(e, t) {
  return b(), C("svg", tE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20" })
    ], -1)
  ]));
}
const S1 = { name: "lucide-globe", render: nE }, rE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function oE(e, t) {
  return b(), C("svg", rE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0zM22 10v6" }),
      p("path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" })
    ], -1)
  ]));
}
const E1 = { name: "lucide-graduation-cap", render: oE }, sE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function iE(e, t) {
  return b(), C("svg", sE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 3v18m-9-9h18" }),
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      })
    ], -1)
  ]));
}
const A1 = { name: "lucide-grid-2x2", render: iE }, aE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function cE(e, t) {
  return b(), C("svg", aE, t[0] || (t[0] = [
    Dn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></g>', 1)
  ]));
}
const $1 = { name: "lucide-grip-vertical", render: cE }, lE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function uE(e, t) {
  return b(), C("svg", lE, t[0] || (t[0] = [
    Dn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"></path><path d="m7 21l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9M2 16l6 6"></path><circle cx="16" cy="9" r="2.9"></circle><circle cx="6" cy="5" r="3"></circle></g>', 1)
  ]));
}
const M1 = { name: "lucide-hand-coins", render: uE }, dE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function fE(e, t) {
  return b(), C("svg", dE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m11 17l2 2a1 1 0 1 0 3-3" }),
      p("path", { d: "m14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" }),
      p("path", { d: "m21 3l1 11h-2M3 3L2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" })
    ], -1)
  ]));
}
const I1 = { name: "lucide-handshake", render: fE }, pE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function hE(e, t) {
  return b(), C("svg", pE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M22 12H2m3.45-6.89L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11M6 16h.01M10 16h.01"
    }, null, -1)
  ]));
}
const T1 = { name: "lucide-hard-drive", render: hE }, gE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function mE(e, t) {
  return b(), C("svg", gE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 2v8m4-4l-4 4l-4-4" }),
      p("rect", {
        width: "20",
        height: "8",
        x: "2",
        y: "14",
        rx: "2"
      }),
      p("path", { d: "M6 18h.01M10 18h.01" })
    ], -1)
  ]));
}
const L1 = { name: "lucide-hard-drive-download", render: mE }, vE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function _E(e, t) {
  return b(), C("svg", vE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 9h16M4 15h16M10 3L8 21m8-18l-2 18"
    }, null, -1)
  ]));
}
const O1 = { name: "lucide-hash", render: _E }, bE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function yE(e, t) {
  return b(), C("svg", bE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }),
      p("path", { d: "M3 3v5h5m4-1v5l4 2" })
    ], -1)
  ]));
}
const R1 = { name: "lucide-history", render: yE }, wE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function kE(e, t) {
  return b(), C("svg", wE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 22h14M5 2h14m-2 20v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
    }, null, -1)
  ]));
}
const P1 = { name: "lucide-hourglass", render: kE }, xE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function CE(e, t) {
  return b(), C("svg", xE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }),
      p("path", { d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
    ], -1)
  ]));
}
const B1 = { name: "lucide-house", render: CE }, SE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function EE(e, t) {
  return b(), C("svg", SE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        ry: "2"
      }),
      p("circle", {
        cx: "9",
        cy: "9",
        r: "2"
      }),
      p("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
    ], -1)
  ]));
}
const z1 = { name: "lucide-image", render: EE }, AE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function $E(e, t) {
  return b(), C("svg", AE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M22 12h-6l-2 3h-4l-2-3H2" }),
      p("path", { d: "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11" })
    ], -1)
  ]));
}
const D1 = { name: "lucide-inbox", render: $E }, ME = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function IE(e, t) {
  return b(), C("svg", ME, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M12 16v-4m0-4h.01" })
    ], -1)
  ]));
}
const Rc = { name: "lucide-info", render: IE }, TE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function LE(e, t) {
  return b(), C("svg", TE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" }),
      p("circle", {
        cx: "16.5",
        cy: "7.5",
        r: ".5",
        fill: "currentColor"
      })
    ], -1)
  ]));
}
const N1 = { name: "lucide-key-round", render: LE }, OE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function RE(e, t) {
  return b(), C("svg", OE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6"
    }, null, -1)
  ]));
}
const q1 = { name: "lucide-languages", render: RE }, PE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function BE(e, t) {
  return b(), C("svg", PE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" }),
      p("path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" }),
      p("path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" })
    ], -1)
  ]));
}
const F1 = { name: "lucide-layers", render: BE }, zE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function DE(e, t) {
  return b(), C("svg", zE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 14c.2-1 .7-1.7 1.5-2.5c1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5c.7.7 1.3 1.5 1.5 2.5m0 4h6m-5 4h4"
    }, null, -1)
  ]));
}
const H1 = { name: "lucide-lightbulb", render: DE }, NE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function qE(e, t) {
  return b(), C("svg", NE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
      p("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
    ], -1)
  ]));
}
const j1 = { name: "lucide-link", render: qE }, FE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function HE(e, t) {
  return b(), C("svg", FE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"
    }, null, -1)
  ]));
}
const V1 = { name: "lucide-list", render: HE }, jE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function VE(e, t) {
  return b(), C("svg", jE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m3 17l2 2l4-4M3 7l2 2l4-4m4 1h8m-8 6h8m-8 6h8"
    }, null, -1)
  ]));
}
const U1 = { name: "lucide-list-checks", render: VE }, UE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function ZE(e, t) {
  return b(), C("svg", UE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2"
      }),
      p("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ], -1)
  ]));
}
const Z1 = { name: "lucide-lock", render: ZE }, WE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function GE(e, t) {
  return b(), C("svg", WE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m10 17l5-5l-5-5m5 5H3m12-9h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
    }, null, -1)
  ]));
}
const W1 = { name: "lucide-log-in", render: GE }, KE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function XE(e, t) {
  return b(), C("svg", KE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }, null, -1)
  ]));
}
const G1 = { name: "lucide-log-out", render: XE }, YE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function JE(e, t) {
  return b(), C("svg", YE, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }),
      p("rect", {
        width: "20",
        height: "16",
        x: "2",
        y: "4",
        rx: "2"
      })
    ], -1)
  ]));
}
const K1 = { name: "lucide-mail", render: JE }, QE = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function eA(e, t) {
  return b(), C("svg", QE, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
    }, null, -1)
  ]));
}
const X1 = { name: "lucide-maximize", render: eA }, tA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function nA(e, t) {
  return b(), C("svg", tA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
    }, null, -1)
  ]));
}
const Y1 = { name: "lucide-maximize-2", render: nA }, rA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function oA(e, t) {
  return b(), C("svg", rA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 12h16M4 18h16M4 6h16"
    }, null, -1)
  ]));
}
const J1 = { name: "lucide-menu", render: oA }, sA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function iA(e, t) {
  return b(), C("svg", sA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
    }, null, -1)
  ]));
}
const Q1 = { name: "lucide-message-circle", render: iA }, aA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function cA(e, t) {
  return b(), C("svg", aA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2zm4 0h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"
    }, null, -1)
  ]));
}
const eg = { name: "lucide-messages-square", render: cA }, lA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function uA(e, t) {
  return b(), C("svg", lA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 13v8m0-18v3M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z"
    }, null, -1)
  ]));
}
const tg = { name: "lucide-milestone", render: uA }, dA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function fA(e, t) {
  return b(), C("svg", dA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m14 10l7-7m-1 7h-6V4M3 21l7-7m-6 0h6v6"
    }, null, -1)
  ]));
}
const pA = { name: "lucide-minimize-2", render: fA }, hA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function gA(e, t) {
  return b(), C("svg", hA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12.586 12.586L19 19M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"
    }, null, -1)
  ]));
}
const ng = { name: "lucide-mouse-pointer", render: gA }, mA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function vA(e, t) {
  return b(), C("svg", mA, t[0] || (t[0] = [
    Dn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="6" height="6" x="16" y="16" rx="1"></rect><rect width="6" height="6" x="2" y="16" rx="1"></rect><rect width="6" height="6" x="9" y="2" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3m-7-4V8"></path></g>', 1)
  ]));
}
const rg = { name: "lucide-network", render: vA }, _A = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function bA(e, t) {
  return b(), C("svg", _A, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 22v-9m3.17-10.79a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.66 1.66 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" }),
      p("path", { d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" }),
      p("path", { d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.64 1.64 0 0 0 1.63 0z" })
    ], -1)
  ]));
}
const og = { name: "lucide-package-open", render: bA }, yA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function wA(e, t) {
  return b(), C("svg", yA, t[0] || (t[0] = [
    Dn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 22a1 1 0 0 1 0-20a10 9 0 0 1 10 9a5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle></g>', 1)
  ]));
}
const sg = { name: "lucide-palette", render: wA }, kA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function xA(e, t) {
  return b(), C("svg", kA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      p("path", { d: "M15 3v18" })
    ], -1)
  ]));
}
const CA = { name: "lucide-panel-right", render: xA }, SA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function EA(e, t) {
  return b(), C("svg", SA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "4",
        height: "16",
        x: "14",
        y: "4",
        rx: "1"
      }),
      p("rect", {
        width: "4",
        height: "16",
        x: "6",
        y: "4",
        rx: "1"
      })
    ], -1)
  ]));
}
const ig = { name: "lucide-pause", render: EA }, AA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function $A(e, t) {
  return b(), C("svg", AA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
    }, null, -1)
  ]));
}
const ag = { name: "lucide-pen", render: $A }, MA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function IA(e, t) {
  return b(), C("svg", MA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"
    }, null, -1)
  ]));
}
const cg = { name: "lucide-pencil", render: IA }, TA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function LA(e, t) {
  return b(), C("svg", TA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4a1 1 0 0 1 1 1z"
    }, null, -1)
  ]));
}
const lg = { name: "lucide-pin", render: LA }, OA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function RA(e, t) {
  return b(), C("svg", OA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m6 3l14 9l-14 9z"
    }, null, -1)
  ]));
}
const ug = { name: "lucide-play", render: RA }, PA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function BA(e, t) {
  return b(), C("svg", PA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 22v-5M9 8V2m6 6V2m3 6v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"
    }, null, -1)
  ]));
}
const dg = { name: "lucide-plug", render: BA }, zA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function DA(e, t) {
  return b(), C("svg", zA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 12h14m-7-7v14"
    }, null, -1)
  ]));
}
const fg = { name: "lucide-plus", render: DA }, NA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function qA(e, t) {
  return b(), C("svg", NA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2s-2 1-2 2s2 1 2 2m13-7h.01M6 18h.01m14.82-9.17a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" }),
      p("path", { d: "M18 11.66V22a4 4 0 0 0 4-4V6" })
    ], -1)
  ]));
}
const pg = { name: "lucide-pocket-knife", render: qA }, FA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function HA(e, t) {
  return b(), C("svg", FA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 2v10m6.4-5.4a9 9 0 1 1-12.77.04"
    }, null, -1)
  ]));
}
const hg = { name: "lucide-power", render: HA }, jA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function VA(e, t) {
  return b(), C("svg", jA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m15 14l5-5l-5-5" }),
      p("path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" })
    ], -1)
  ]));
}
const gg = { name: "lucide-redo-2", render: VA }, UA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function ZA(e, t) {
  return b(), C("svg", UA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8" }),
      p("path", { d: "M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16" }),
      p("path", { d: "M8 16H3v5" })
    ], -1)
  ]));
}
const Fo = { name: "lucide-refresh-cw", render: ZA }, WA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function GA(e, t) {
  return b(), C("svg", WA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 7V4h16v3M5 20h6m2-16L8 20m7-5l5 5m0-5l-5 5"
    }, null, -1)
  ]));
}
const mg = { name: "lucide-remove-formatting", render: GA }, KA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function XA(e, t) {
  return b(), C("svg", KA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" }),
      p("circle", {
        cx: "5",
        cy: "19",
        r: "1"
      })
    ], -1)
  ]));
}
const vg = { name: "lucide-rss", render: XA }, YA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function JA(e, t) {
  return b(), C("svg", YA, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 10a7.31 7.31 0 0 0 10 10Zm5 5l3-3m5 1a6 6 0 0 0-6-6m10 6A10 10 0 0 0 11 3"
    }, null, -1)
  ]));
}
const _g = { name: "lucide-satellite-dish", render: JA }, QA = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function e$(e, t) {
  return b(), C("svg", QA, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" }),
      p("path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7" })
    ], -1)
  ]));
}
const bg = { name: "lucide-save", render: e$ }, t$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function n$(e, t) {
  return b(), C("svg", t$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m16 16l3-8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1M2 16l3-8l3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1m5 5h10M12 3v18M3 7h2c2 0 5-1 7-2c2 1 5 2 7 2h2"
    }, null, -1)
  ]));
}
const yg = { name: "lucide-scale", render: n$ }, r$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function o$(e, t) {
  return b(), C("svg", r$, t[0] || (t[0] = [
    Dn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="6" cy="6" r="3"></circle><path d="M8.12 8.12L12 12m8-8L8.12 15.88"></path><circle cx="6" cy="18" r="3"></circle><path d="M14.8 14.8L20 20"></path></g>', 1)
  ]));
}
const Pc = { name: "lucide-scissors", render: o$ }, s$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function i$(e, t) {
  return b(), C("svg", s$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m21 21l-4.34-4.34" }),
      p("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      })
    ], -1)
  ]));
}
const wg = { name: "lucide-search", render: i$ }, a$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function c$(e, t) {
  return b(), C("svg", a$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"
    }, null, -1)
  ]));
}
const kg = { name: "lucide-send", render: c$ }, l$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function u$(e, t) {
  return b(), C("svg", l$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "20",
        height: "8",
        x: "2",
        y: "2",
        rx: "2",
        ry: "2"
      }),
      p("rect", {
        width: "20",
        height: "8",
        x: "2",
        y: "14",
        rx: "2",
        ry: "2"
      }),
      p("path", { d: "M6 6h.01M6 18h.01" })
    ], -1)
  ]));
}
const xg = { name: "lucide-server", render: u$ }, d$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function f$(e, t) {
  return b(), C("svg", d$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2" }),
      p("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })
    ], -1)
  ]));
}
const p$ = { name: "lucide-settings", render: f$ }, h$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function g$(e, t) {
  return b(), C("svg", h$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 2v13m4-9l-4-4l-4 4m-4 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
    }, null, -1)
  ]));
}
const Cg = { name: "lucide-share", render: g$ }, m$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function v$(e, t) {
  return b(), C("svg", m$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21 4h-7m-4 0H3m18 8h-9m-4 0H3m18 8h-5m-4 0H3M14 2v4m-6 4v4m8 4v4"
    }, null, -1)
  ]));
}
const Sg = { name: "lucide-sliders-horizontal", render: v$ }, _$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function b$(e, t) {
  return b(), C("svg", _$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      p("path", { d: "M8 14s1.5 2 4 2s4-2 4-2M9 9h.01M15 9h.01" })
    ], -1)
  ]));
}
const Eg = { name: "lucide-smile", render: b$ }, y$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function w$(e, t) {
  return b(), C("svg", y$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0zM20 3v4m2-2h-4M4 17v2m1-1H3"
    }, null, -1)
  ]));
}
const k$ = { name: "lucide-sparkles", render: w$ }, x$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function C$(e, t) {
  return b(), C("svg", x$, t[0] || (t[0] = [
    p("rect", {
      width: "18",
      height: "18",
      x: "3",
      y: "3",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      rx: "2"
    }, null, -1)
  ]));
}
const Ag = { name: "lucide-square", render: C$ }, S$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function E$(e, t) {
  return b(), C("svg", S$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      p("path", { d: "m9 12l2 2l4-4" })
    ], -1)
  ]));
}
const $g = { name: "lucide-square-check", render: E$ }, A$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function $$(e, t) {
  return b(), C("svg", A$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
      p("path", { d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" })
    ], -1)
  ]));
}
const Mg = { name: "lucide-square-pen", render: $$ }, M$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function I$(e, t) {
  return b(), C("svg", M$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      p("path", { d: "M8 12h8m-4-4v8" })
    ], -1)
  ]));
}
const Ig = { name: "lucide-square-plus", render: I$ }, T$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function L$(e, t) {
  return b(), C("svg", T$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" }),
      p("path", { d: "M15 3v4a2 2 0 0 0 2 2h4" })
    ], -1)
  ]));
}
const Tg = { name: "lucide-sticky-note", render: L$ }, O$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function R$(e, t) {
  return b(), C("svg", O$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }),
      p("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })
    ], -1)
  ]));
}
const Lg = { name: "lucide-sun", render: R$ }, P$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function B$(e, t) {
  return b(), C("svg", P$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M12 3v18" }),
      p("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      p("path", { d: "M3 9h18M3 15h18" })
    ], -1)
  ]));
}
const Og = { name: "lucide-table", render: B$ }, z$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function D$(e, t) {
  return b(), C("svg", z$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m15 5l6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" }),
      p("path", { d: "M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" }),
      p("circle", {
        cx: "6.5",
        cy: "9.5",
        r: ".5",
        fill: "currentColor"
      })
    ], -1)
  ]));
}
const Rg = { name: "lucide-tags", render: D$ }, N$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function q$(e, t) {
  return b(), C("svg", N$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 19h8M4 17l6-6l-6-6"
    }, null, -1)
  ]));
}
const Pg = { name: "lucide-terminal", render: q$ }, F$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function H$(e, t) {
  return b(), C("svg", F$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88"
    }, null, -1)
  ]));
}
const Bg = { name: "lucide-thumbs-down", render: H$ }, j$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function V$(e, t) {
  return b(), C("svg", j$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M7 10v12m8-16.12L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88"
    }, null, -1)
  ]));
}
const zg = { name: "lucide-thumbs-up", render: V$ }, U$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Z$(e, t) {
  return b(), C("svg", U$, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "15",
        cy: "12",
        r: "3"
      }),
      p("rect", {
        width: "20",
        height: "14",
        x: "2",
        y: "5",
        rx: "7"
      })
    ], -1)
  ]));
}
const W$ = { name: "lucide-toggle-right", render: Z$ }, G$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function K$(e, t) {
  return b(), C("svg", G$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"
    }, null, -1)
  ]));
}
const Dg = { name: "lucide-trash-2", render: K$ }, X$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Y$(e, t) {
  return b(), C("svg", X$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m17 14l3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7zm-5 8v-3"
    }, null, -1)
  ]));
}
const Ng = { name: "lucide-tree-pine", render: Y$ }, J$ = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Q$(e, t) {
  return b(), C("svg", J$, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"
    }, null, -1)
  ]));
}
const qg = { name: "lucide-triangle-alert", render: Q$ }, eM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function tM(e, t) {
  return b(), C("svg", eM, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 4v16M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2M9 20h6"
    }, null, -1)
  ]));
}
const nM = { name: "lucide-type", render: tM }, rM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function oM(e, t) {
  return b(), C("svg", rM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M9 14L4 9l5-5" }),
      p("path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" })
    ], -1)
  ]));
}
const Fg = { name: "lucide-undo-2", render: oM }, sM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function iM(e, t) {
  return b(), C("svg", sM, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07a5.006 5.006 0 0 0-6.95 0l-1.72 1.71m-6.58 6.57l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07a5.006 5.006 0 0 0 6.95 0l1.71-1.71M8 2v3M2 8h3m11 11v3m3-6h3"
    }, null, -1)
  ]));
}
const Hg = { name: "lucide-unlink", render: iM }, aM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function cM(e, t) {
  return b(), C("svg", aM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
      p("circle", {
        cx: "12",
        cy: "7",
        r: "4"
      })
    ], -1)
  ]));
}
const jg = { name: "lucide-user", render: cM }, lM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function uM(e, t) {
  return b(), C("svg", lM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m16 11l2 2l4-4m-6 12v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
      p("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      })
    ], -1)
  ]));
}
const Vg = { name: "lucide-user-check", render: uM }, dM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function fM(e, t) {
  return b(), C("svg", dM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "10",
        cy: "7",
        r: "4"
      }),
      p("path", { d: "M10.3 15H7a4 4 0 0 0-4 4v2m12-5.5V14a2 2 0 0 1 4 0v1.5" }),
      p("rect", {
        width: "8",
        height: "5",
        x: "13",
        y: "16",
        rx: ".899"
      })
    ], -1)
  ]));
}
const Ug = { name: "lucide-user-lock", render: fM }, pM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function hM(e, t) {
  return b(), C("svg", pM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "12",
        cy: "8",
        r: "5"
      }),
      p("path", { d: "M20 21a8 8 0 0 0-16 0" })
    ], -1)
  ]));
}
const Zg = { name: "lucide-user-round", render: hM }, gM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function mM(e, t) {
  return b(), C("svg", gM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87" }),
      p("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      })
    ], -1)
  ]));
}
const Wg = { name: "lucide-users", render: mM }, vM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function _M(e, t) {
  return b(), C("svg", vM, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 21s-4-3-4-9s4-9 4-9m8 0s4 3 4 9s-4 9-4 9M15 9l-6 6m0-6l6 6"
    }, null, -1)
  ]));
}
const Gg = { name: "lucide-variable", render: _M }, bM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function yM(e, t) {
  return b(), C("svg", bM, t[0] || (t[0] = [
    Dn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"></rect><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle><path d="m7.9 7.9l2.7 2.7"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle><path d="m13.4 10.6l2.7-2.7"></path><circle cx="7.5" cy="16.5" r=".5" fill="currentColor"></circle><path d="m7.9 16.1l2.7-2.7"></path><circle cx="16.5" cy="16.5" r=".5" fill="currentColor"></circle><path d="m13.4 13.4l2.7 2.7"></path><circle cx="12" cy="12" r="2"></circle></g>', 1)
  ]));
}
const Kg = { name: "lucide-vault", render: yM }, wM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function kM(e, t) {
  return b(), C("svg", wM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("path", { d: "m16 13l5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }),
      p("rect", {
        width: "14",
        height: "12",
        x: "2",
        y: "6",
        rx: "2"
      })
    ], -1)
  ]));
}
const Xg = { name: "lucide-video", render: kM }, xM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function CM(e, t) {
  return b(), C("svg", xM, t[0] || (t[0] = [
    Dn('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="4.5" r="2.5"></circle><path d="m10.2 6.3l-3.9 3.9"></path><circle cx="4.5" cy="12" r="2.5"></circle><path d="M7 12h10"></path><circle cx="19.5" cy="12" r="2.5"></circle><path d="m13.8 17.7l3.9-3.9"></path><circle cx="12" cy="19.5" r="2.5"></circle></g>', 1)
  ]));
}
const Yg = { name: "lucide-waypoints", render: CM }, SM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function EM(e, t) {
  return b(), C("svg", SM, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
    }, null, -1)
  ]));
}
const Jg = { name: "lucide-wrench", render: EM }, AM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function $M(e, t) {
  return b(), C("svg", AM, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M18 6L6 18M6 6l12 12"
    }, null, -1)
  ]));
}
const Bc = { name: "lucide-x", render: $M }, MM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function IM(e, t) {
  return b(), C("svg", MM, t[0] || (t[0] = [
    p("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
    }, null, -1)
  ]));
}
const Qg = { name: "lucide-zap", render: IM }, TM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function LM(e, t) {
  return b(), C("svg", TM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }),
      p("path", { d: "m21 21l-4.35-4.35M11 8v6m-3-3h6" })
    ], -1)
  ]));
}
const em = { name: "lucide-zoom-in", render: LM }, OM = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function RM(e, t) {
  return b(), C("svg", OM, t[0] || (t[0] = [
    p("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      p("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }),
      p("path", { d: "m21 21l-4.35-4.35M8 11h6" })
    ], -1)
  ]));
}
const tm = { name: "lucide-zoom-out", render: RM }, yd = {
  // customIcons
  variable: Gg,
  "pop-out": t2,
  triangle: p2,
  "status-completed": s2,
  "status-waiting": l2,
  "status-error": i2,
  "status-canceled": o2,
  "status-new": a2,
  "status-unknown": c2,
  "status-warning": u2,
  "vector-square": h2,
  schema: n2,
  json: A2,
  binary: Qh,
  text: d2,
  toolbox: f2,
  spinner: r2,
  xmark: Bc,
  // fontAwesomeIcons
  "caret-up": qo,
  "caret-down": zo,
  "caret-right": No,
  "caret-left": Do,
  "folder-plus": y1,
  share: Cg,
  "user-check": Vg,
  "check-double": P2,
  "exclamation-circle": N2,
  circle: D2,
  "eye-slash": c1,
  folder: _1,
  "minus-circle": H2,
  adjust: Q2,
  refresh: Fo,
  vault: Kg,
  "angle-double-left": B2,
  "angle-down": zo,
  "angle-left": Do,
  "angle-right": No,
  "angle-up": qo,
  archive: m2,
  "arrow-left": Ic,
  "arrow-right": b2,
  "arrow-up": y2,
  "arrow-down": v2,
  at: w2,
  ban: k2,
  "balance-scale-left": yg,
  bars: J1,
  bolt: Qg,
  book: C2,
  "box-open": og,
  bug: M2,
  brain: $2,
  calculator: I2,
  calendar: T2,
  "chart-bar": O2,
  check: R2,
  "check-circle": q2,
  "check-square": $g,
  "chevron-left": Do,
  "chevron-right": No,
  "chevron-down": zo,
  "chevron-up": qo,
  code: J2,
  "code-branch": C1,
  cog: Lc,
  cogs: Lc,
  comment: Q1,
  comments: eg,
  "clipboard-list": G2,
  clock: K2,
  clone: e1,
  cloud: X2,
  "cloud-download-alt": Y2,
  compress: z2,
  copy: g1,
  cube: E2,
  cut: Pc,
  database: t1,
  "dot-circle": F2,
  "grip-lines-vertical": e2,
  "grip-vertical": $1,
  edit: Mg,
  "ellipsis-h": r1,
  "ellipsis-v": o1,
  envelope: K1,
  equals: s1,
  eye: a1,
  "exclamation-triangle": qg,
  expand: X1,
  "expand-alt": Y1,
  "external-link-alt": i1,
  "exchange-alt": _2,
  file: l1,
  "file-alt": Oc,
  "file-archive": u1,
  "file-code": d1,
  "file-download": f1,
  "file-export": h1,
  "file-import": p1,
  "file-pdf": Oc,
  filter: w1,
  fingerprint: m1,
  flask: v1,
  "folder-open": b1,
  font: L2,
  gift: x1,
  globe: S1,
  "globe-americas": n1,
  "graduation-cap": E1,
  "hand-holding-usd": M1,
  "hand-scissors": Pc,
  handshake: I1,
  "hand-point-left": Ic,
  hashtag: O1,
  hdd: T1,
  history: R1,
  home: B1,
  hourglass: P1,
  image: z1,
  inbox: D1,
  info: Rc,
  "info-circle": Rc,
  key: N1,
  language: q1,
  "layer-group": F1,
  link: j1,
  list: V1,
  lightbulb: H1,
  lock: Z1,
  "map-signs": tg,
  "mouse-pointer": ng,
  "network-wired": rg,
  palette: sg,
  pause: ig,
  "pause-circle": j2,
  pen: ag,
  "pencil-alt": cg,
  play: ug,
  "play-circle": V2,
  plug: dg,
  plus: fg,
  "plus-circle": U2,
  "plus-square": Ig,
  "project-diagram": Yg,
  question: Tc,
  "question-circle": Tc,
  redo: gg,
  "remove-format": mg,
  robot: S2,
  rss: vg,
  save: bg,
  "satellite-dish": _g,
  search: wg,
  "search-minus": tm,
  "search-plus": em,
  server: xg,
  screwdriver: pg,
  smile: Eg,
  "sign-in-alt": W1,
  "sign-out-alt": G1,
  "sliders-h": Sg,
  "sticky-note": Tg,
  stop: Ag,
  stream: g2,
  sun: Lg,
  sync: Fo,
  "sync-alt": Fo,
  table: Og,
  tags: Rg,
  tasks: U1,
  terminal: Pg,
  "th-large": A1,
  thumbtack: lg,
  "thumbs-down": Bg,
  "thumbs-up": zg,
  times: Bc,
  "times-circle": W2,
  tools: Jg,
  trash: Dg,
  undo: Fg,
  unlink: Hg,
  user: jg,
  "user-circle": Z2,
  "user-friends": Zg,
  users: Wg,
  video: Xg,
  tree: Ng,
  "user-lock": Ug,
  gem: k1,
  download: L1,
  "power-off": hg,
  "paper-plane": kg,
  bell: x2
}, wd = {
  // custom icons
  // NOTE: ensure to replace any colors with "currentColor" in SVG
  "bolt-filled": DC,
  "grip-lines-vertical": e2,
  variable: Gg,
  "pop-out": t2,
  triangle: p2,
  "status-completed": s2,
  "status-waiting": l2,
  "status-error": i2,
  "status-canceled": o2,
  "status-new": a2,
  "status-unknown": c2,
  "status-warning": u2,
  "vector-square": h2,
  "continue-on-error": NC,
  "always-output-data": qC,
  "retry-on-fail": XC,
  "execute-once": YC,
  schema: n2,
  json: A2,
  binary: Qh,
  text: d2,
  toolbox: f2,
  spinner: r2,
  "node-dirty": FC,
  "node-ellipsis": HC,
  "node-execution-error": jC,
  "node-validation-error": KC,
  "node-pin": VC,
  "node-play": UC,
  "node-power": ZC,
  "node-success": WC,
  "node-trash": GC,
  // lucide
  "align-right": g2,
  archive: m2,
  "arrow-down": v2,
  "arrow-left": Ic,
  "arrow-left-right": _2,
  "arrow-right": b2,
  "arrow-right-from-line": f9,
  "arrow-right-to-line": g9,
  "arrow-up": y2,
  "at-sign": w2,
  ban: k2,
  bell: x2,
  book: C2,
  "book-open": $9,
  bot: S2,
  box: E2,
  brain: $2,
  bug: M2,
  calculator: I2,
  calendar: T2,
  "case-upper": L2,
  "chart-column-decreasing": O2,
  check: R2,
  "check-check": P2,
  "chevron-down": zo,
  "chevron-left": Do,
  "chevron-right": No,
  "chevron-up": qo,
  "chevrons-left": B2,
  "chevrons-down-up": a7,
  "chevrons-up-down": z2,
  circle: D2,
  "circle-alert": N2,
  "circle-check": q2,
  "circle-dot": F2,
  "circle-help": Tc,
  "circle-minus": H2,
  "circle-pause": j2,
  "circle-play": V2,
  "circle-plus": U2,
  "circle-user-round": Z2,
  "circle-x": W2,
  "clipboard-list": G2,
  clock: K2,
  cloud: X2,
  "cloud-download": Y2,
  code: J2,
  cog: Lc,
  contrast: Q2,
  copy: e1,
  crosshair: J7,
  database: t1,
  earth: n1,
  ellipsis: r1,
  "ellipsis-vertical": o1,
  equal: s1,
  expand: dS,
  "external-link": i1,
  eye: a1,
  "eye-off": c1,
  file: l1,
  "file-archive": u1,
  "file-code": d1,
  "file-diff": ES,
  "file-down": f1,
  "file-input": p1,
  "file-output": h1,
  "file-text": Oc,
  files: g1,
  fingerprint: m1,
  "flask-conical": v1,
  folder: _1,
  "folder-open": b1,
  "folder-plus": y1,
  funnel: w1,
  gem: k1,
  gift: x1,
  "git-branch": C1,
  globe: S1,
  "graduation-cap": E1,
  "grid-2x2": A1,
  "grip-vertical": $1,
  "hand-coins": M1,
  handshake: I1,
  "hard-drive": T1,
  "hard-drive-download": L1,
  hash: O1,
  history: R1,
  hourglass: P1,
  house: B1,
  image: z1,
  inbox: D1,
  info: Rc,
  "key-round": N1,
  languages: q1,
  layers: F1,
  lightbulb: H1,
  link: j1,
  list: V1,
  "list-checks": U1,
  lock: Z1,
  "log-in": W1,
  "log-out": G1,
  mail: K1,
  "minimize-2": pA,
  maximize: X1,
  "maximize-2": Y1,
  menu: J1,
  "message-circle": Q1,
  "messages-square": eg,
  milestone: tg,
  "mouse-pointer": ng,
  network: rg,
  "package-open": og,
  palette: sg,
  "panel-right": CA,
  pause: ig,
  pen: ag,
  pencil: cg,
  pin: lg,
  play: ug,
  plug: dg,
  plus: fg,
  "pocket-knife": pg,
  power: hg,
  "redo-2": gg,
  "refresh-cw": Fo,
  "remove-formatting": mg,
  rss: vg,
  "satellite-dish": _g,
  save: bg,
  scale: yg,
  scissors: Pc,
  search: wg,
  settings: p$,
  send: kg,
  server: xg,
  share: Cg,
  "sliders-horizontal": Sg,
  smile: Eg,
  sparkles: k$,
  square: Ag,
  "square-check": $g,
  "square-pen": Mg,
  "square-plus": Ig,
  "sticky-note": Tg,
  sun: Lg,
  table: Og,
  tags: Rg,
  terminal: Pg,
  "thumbs-down": Bg,
  "thumbs-up": zg,
  "trash-2": Dg,
  "tree-pine": Ng,
  "triangle-alert": qg,
  type: nM,
  "toggle-right": W$,
  "undo-2": Fg,
  unlink: Hg,
  user: jg,
  "user-check": Vg,
  "user-lock": Ug,
  "user-round": Zg,
  users: Wg,
  vault: Kg,
  video: Xg,
  waypoints: Yg,
  wrench: Jg,
  x: Bc,
  zap: Qg,
  "zoom-in": em,
  "zoom-out": tm
}, PM = /* @__PURE__ */ Z({
  name: "N8nIcon",
  __name: "Icon",
  props: {
    icon: {},
    size: { default: void 0 },
    spin: { type: Boolean, default: !1 },
    color: { default: void 0 },
    strokeWidth: {}
  },
  setup(e) {
    const t = e, n = is(), r = I(() => {
      const a = [];
      return t.spin && a.push("spin"), t.strokeWidth && a.push("strokeWidth"), ["n8n-icon", ...a.map((c) => n[c])];
    }), s = {
      xsmall: 10,
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 20
    }, o = I(() => {
      let a = "1em";
      return t.size && (a = `${typeof t.size == "number" ? t.size : s[t.size]}px`), {
        height: a,
        width: a
      };
    }), i = I(() => {
      const a = {};
      return t.color && (a.color = `var(--color-${t.color})`), t.strokeWidth && (a["--n8n-icon-stroke-width"] = `${t.strokeWidth}px`), a;
    });
    return (a, c) => _(wd)[a.icon] ?? _(yd)[a.icon] ? (b(), Y(ht(
      _(wd)[a.icon] ?? _(yd)[a.icon]
    ), {
      key: 0,
      class: H(r.value),
      "aria-hidden": "true",
      focusable: "false",
      role: "img",
      height: o.value.height,
      width: o.value.width,
      "data-icon": t.icon,
      style: Ue(i.value)
    }, null, 8, ["class", "height", "width", "data-icon", "style"])) : te("", !0);
  }
}), BM = "_strokeWidth_fqxq5_1", zM = "_spin_fqxq5_6", DM = {
  strokeWidth: BM,
  spin: zM
}, NM = {
  $style: DM
}, Sl = /* @__PURE__ */ Ht(PM, [["__cssModules", NM]]), qM = { class: "n8n-spinner" }, FM = {
  key: 0,
  class: "lds-ring"
}, HM = /* @__PURE__ */ Z({
  name: "N8nSpinner",
  __name: "Spinner",
  props: {
    size: { default: "medium" },
    type: { default: "dots" }
  },
  setup(e) {
    return (t, n) => (b(), C("span", qM, [
      t.type === "ring" ? (b(), C("div", FM, n[0] || (n[0] = [
        p("div", null, null, -1),
        p("div", null, null, -1),
        p("div", null, null, -1),
        p("div", null, null, -1)
      ]))) : (b(), Y(_(Sl), {
        key: 1,
        icon: "spinner",
        size: t.size,
        spin: ""
      }, null, 8, ["size"]))
    ]));
  }
}), jM = { key: 1 }, VM = /* @__PURE__ */ Z({
  name: "N8nButton",
  __name: "Button",
  props: {
    block: { type: Boolean, default: !1 },
    element: { default: "button" },
    href: {},
    label: { default: "" },
    square: { type: Boolean, default: !1 },
    active: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    float: {},
    icon: {},
    loading: { type: Boolean, default: !1 },
    outline: { type: Boolean, default: !1 },
    size: { default: "medium" },
    iconSize: {},
    text: { type: Boolean, default: !1 },
    type: { default: "primary" },
    nativeType: {}
  },
  setup(e) {
    const t = is(), n = ao(), r = e;
    Gc(() => {
      r.element === "a" && !r.href && console.error("n8n-button:href is required for link buttons");
    });
    const s = I(() => r.loading ? "true" : void 0), o = I(() => r.disabled ? "true" : void 0), i = I(() => r.disabled || r.loading), a = I(
      () => r.iconSize ?? (r.size === "xmini" || r.size === "mini" ? "xsmall" : r.size)
    ), c = I(() => `button ${t.button} ${t[r.type]}${r.size ? ` ${t[r.size]}` : ""}${r.outline ? ` ${t.outline}` : ""}${r.loading ? ` ${t.loading}` : ""}${r.float ? ` ${t[`float-${r.float}`]}` : ""}${r.text ? ` ${t.text}` : ""}${r.disabled ? ` ${t.disabled}` : ""}${r.block ? ` ${t.block}` : ""}${r.active ? ` ${t.active}` : ""}${r.icon || r.loading ? ` ${t.withIcon}` : ""}${r.square ? ` ${t.square}` : ""}`);
    return (u, d) => (b(), Y(ht(u.element), We({
      class: c.value,
      disabled: i.value,
      "aria-disabled": o.value,
      "aria-busy": s.value,
      href: u.href,
      "aria-live": "polite"
    }, {
      ..._(n),
      ...r.nativeType ? { type: r.nativeType } : {}
    }), {
      default: J(() => [
        u.loading || u.icon ? (b(), C("span", {
          key: 0,
          class: H(_(t).icon)
        }, [
          u.loading ? (b(), Y(_(HM), {
            key: 0,
            size: a.value
          }, null, 8, ["size"])) : u.icon ? (b(), Y(_(Sl), {
            key: 1,
            icon: u.icon,
            size: a.value
          }, null, 8, ["icon", "size"])) : te("", !0)
        ], 2)) : te("", !0),
        u.label ? (b(), C("span", jM, ke(u.label), 1)) : u.$slots.default ? ae(u.$slots, "default", { key: 2 }) : te("", !0)
      ]),
      _: 3
    }, 16, ["class", "disabled", "aria-disabled", "aria-busy", "href"]));
  }
}), UM = "_button_slkfq_115", ZM = "_active_slkfq_149", WM = "_disabled_slkfq_167", GM = "_loading_slkfq_175", KM = "_secondary_slkfq_198", XM = "_highlight_slkfq_220", YM = "_tertiary_slkfq_242", JM = "_success_slkfq_264", QM = "_warning_slkfq_286", eI = "_danger_slkfq_308", tI = "_xmini_slkfq_333", nI = "_square_slkfq_338", rI = "_mini_slkfq_343", oI = "_small_slkfq_353", sI = "_medium_slkfq_363", iI = "_large_slkfq_373", aI = "_xlarge_slkfq_378", cI = "_outline_slkfq_391", lI = "_primary_slkfq_395", uI = "_text_slkfq_432", dI = "_transparent_slkfq_500", fI = "_withIcon_slkfq_505", pI = "_icon_slkfq_511", hI = "_block_slkfq_520", gI = {
  button: UM,
  active: ZM,
  disabled: WM,
  loading: GM,
  secondary: KM,
  highlight: XM,
  tertiary: YM,
  success: JM,
  warning: QM,
  danger: eI,
  xmini: tI,
  square: nI,
  mini: rI,
  small: oI,
  medium: sI,
  large: iI,
  xlarge: aI,
  outline: cI,
  primary: lI,
  text: uI,
  transparent: dI,
  withIcon: fI,
  icon: pI,
  block: hI,
  "float-left": "_float-left_slkfq_524",
  "float-right": "_float-right_slkfq_528"
}, mI = {
  $style: gI
}, vI = /* @__PURE__ */ Ht(VM, [["__cssModules", mI]]);
({
  ...oo.props
});
const _I = /* @__PURE__ */ Z({
  name: "N8nText",
  __name: "Text",
  props: {
    bold: { type: Boolean, default: !1 },
    size: { default: "medium" },
    color: {},
    align: {},
    compact: { type: Boolean, default: !1 },
    tag: { default: "span" }
  },
  setup(e) {
    const t = e, n = is(), r = I(() => {
      const s = [];
      return t.align && s.push(`align-${t.align}`), t.color && s.push(t.color), t.compact && s.push("compact"), s.push(`size-${t.size}`), s.push(t.bold ? "bold" : "regular"), s.map((o) => n[o]);
    });
    return (s, o) => (b(), Y(ht(s.tag), We({
      class: ["n8n-text", ...r.value]
    }, s.$attrs), {
      default: J(() => [
        ae(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), bI = "_bold_ushv1_1", yI = "_regular_ushv1_5", wI = "_compact_ushv1_34", kI = "_primary_ushv1_38", xI = "_secondary_ushv1_42", CI = "_danger_ushv1_62", SI = "_success_ushv1_66", EI = "_warning_ushv1_70", AI = {
  bold: bI,
  regular: yI,
  "size-xlarge": "_size-xlarge_ushv1_9",
  "size-large": "_size-large_ushv1_14",
  "size-medium": "_size-medium_ushv1_19",
  "size-small": "_size-small_ushv1_24",
  "size-xsmall": "_size-xsmall_ushv1_29",
  compact: wI,
  primary: kI,
  secondary: xI,
  "text-dark": "_text-dark_ushv1_46",
  "text-base": "_text-base_ushv1_50",
  "text-light": "_text-light_ushv1_54",
  "text-xlight": "_text-xlight_ushv1_58",
  danger: CI,
  success: SI,
  warning: EI,
  "foreground-dark": "_foreground-dark_ushv1_74",
  "foreground-xdark": "_foreground-xdark_ushv1_78",
  "align-left": "_align-left_ushv1_82",
  "align-right": "_align-right_ushv1_86",
  "align-center": "_align-center_ushv1_90"
}, $I = {
  $style: AI
}, nm = /* @__PURE__ */ Ht(_I, [["__cssModules", $I]]), MI = { key: 0 }, II = { key: 1 }, TI = /* @__PURE__ */ Z({
  __name: "Loading",
  props: {
    animated: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !0 },
    rows: { default: 1 },
    cols: { default: 0 },
    shrinkLast: { type: Boolean, default: !0 },
    variant: { default: "p" }
  },
  setup(e) {
    return (t, n) => (b(), Y(_(PC), {
      loading: t.loading,
      animated: t.animated,
      class: H(["n8n-loading", `n8n-loading-${t.variant}`])
    }, Kr({ _: 2 }, [
      t.cols ? {
        name: "template",
        fn: J(() => [
          (b(!0), C(He, null, ot(t.cols, (r) => (b(), Y(_(Nr), { key: r }))), 128))
        ]),
        key: "0"
      } : {
        name: "template",
        fn: J(() => [
          t.variant === "h1" ? (b(), C("div", MI, [
            (b(!0), C(He, null, ot(t.rows, (r, s) => (b(), C("div", {
              key: s,
              class: H({
                [t.$style.h1Last]: r === t.rows && t.rows > 1 && t.shrinkLast
              })
            }, [
              he(_(Nr), { variant: t.variant }, null, 8, ["variant"])
            ], 2))), 128))
          ])) : t.variant === "p" ? (b(), C("div", II, [
            (b(!0), C(He, null, ot(t.rows, (r, s) => (b(), C("div", {
              key: s,
              class: H({
                [t.$style.pLast]: r === t.rows && t.rows > 1 && t.shrinkLast
              })
            }, [
              he(_(Nr), { variant: t.variant }, null, 8, ["variant"])
            ], 2))), 128))
          ])) : t.variant === "custom" ? (b(), C("div", {
            key: 2,
            class: H(t.$style.custom)
          }, [
            he(_(Nr))
          ], 2)) : (b(), Y(_(Nr), {
            key: 3,
            variant: t.variant
          }, null, 8, ["variant"]))
        ]),
        key: "1"
      }
    ]), 1032, ["loading", "animated", "class"]));
  }
}), LI = "_h1Last_1sdbr_1", OI = "_pLast_1sdbr_5", RI = "_custom_1sdbr_9", PI = {
  h1Last: LI,
  pLast: OI,
  custom: RI
}, BI = {
  $style: PI
}, zI = /* @__PURE__ */ Ht(TI, [["__cssModules", BI]]), Mr = (e) => {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return Math.abs(t);
}, rm = (e, t) => Math.floor(e / Math.pow(10, t) % 10), zc = (e, t) => !(rm(e, t) % 2), pt = (e, t, n) => {
  const r = e % t;
  return n && rm(e, n) % 2 === 0 ? -r : r;
}, nr = (e, t, n) => t[e % n], DI = (e) => {
  e.slice(0, 1) === "#" && (e = e.slice(1));
  const t = parseInt(e.substring(0, 2), 16), n = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
  return (t * 299 + n * 587 + r * 114) / 1e3 >= 128 ? "#000000" : "#FFFFFF";
}, NI = 4, Dc = 80;
function qI(e, t) {
  const n = Mr(e), r = t && t.length;
  return Array.from({ length: NI }, (s, o) => ({
    color: nr(n + o, t, r),
    translateX: pt(n * (o + 1), Dc / 2 - (o + 17), 1),
    translateY: pt(n * (o + 1), Dc / 2 - (o + 17), 2),
    rotate: pt(n * (o + 1), 360),
    isSquare: zc(n, 2)
  }));
}
const FI = Z({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { properties: I(() => qI(e.name, e.colors)), SIZE: Dc };
  }
}), Ir = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, HI = ["viewBox", "width", "height"], jI = { key: 0 }, VI = ["width", "height"], UI = ["width", "height", "rx"], ZI = { mask: "url(#mask__bauhaus)" }, WI = ["width", "height", "fill"], GI = ["x", "y", "width", "height", "fill", "transform"], KI = ["cx", "cy", "fill", "r", "transform"], XI = ["y1", "x2", "y2", "stroke", "transform"];
function YI(e, t, n, r, s, o) {
  return b(), C("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), C("title", jI, ke(e.name), 1)) : te("", !0),
    p("mask", {
      id: "mask__bauhaus",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, UI)
    ], 8, VI),
    p("g", ZI, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        fill: e.properties[0].color
      }, null, 8, WI),
      p("rect", {
        x: (e.SIZE - 60) / 2,
        y: (e.SIZE - 20) / 2,
        width: e.SIZE,
        height: e.properties[1].isSquare ? e.SIZE : e.SIZE / 8,
        fill: e.properties[1].color,
        transform: `translate(${e.properties[1].translateX} ${e.properties[1].translateY}) rotate(${e.properties[1].rotate} ${e.SIZE / 2} ${e.SIZE / 2})`
      }, null, 8, GI),
      p("circle", {
        cx: e.SIZE / 2,
        cy: e.SIZE / 2,
        fill: e.properties[2].color,
        r: e.SIZE / 5,
        transform: `translate(${e.properties[2].translateX} ${e.properties[2].translateY})`
      }, null, 8, KI),
      p("line", {
        x1: 0,
        y1: e.SIZE / 2,
        x2: e.SIZE,
        y2: e.SIZE / 2,
        "stroke-width": 2,
        stroke: e.properties[3].color,
        transform: `translate(${e.properties[3].translateX} ${e.properties[3].translateY}) rotate(${e.properties[3].rotate} ${e.SIZE / 2} ${e.SIZE / 2})`
      }, null, 8, XI)
    ])
  ], 8, HI);
}
const JI = /* @__PURE__ */ Ir(FI, [["render", YI]]), fr = 36;
function QI(e, t) {
  const n = Mr(e), r = t && t.length, s = nr(n, t, r), o = pt(n, 10, 1), i = o < 5 ? o + fr / 9 : o, a = pt(n, 10, 2), c = a < 5 ? a + fr / 9 : a;
  return {
    wrapperColor: s,
    faceColor: DI(s),
    backgroundColor: nr(n + 13, t, r),
    wrapperTranslateX: i,
    wrapperTranslateY: c,
    wrapperRotate: pt(n, 360),
    wrapperScale: 1 + pt(n, fr / 12) / 10,
    isMouthOpen: zc(n, 2),
    isCircle: zc(n, 1),
    eyeSpread: pt(n, 5),
    mouthSpread: pt(n, 3),
    faceRotate: pt(n, 10, 3),
    faceTranslateX: i > fr / 6 ? i / 2 : pt(n, 8, 1),
    faceTranslateY: c > fr / 6 ? c / 2 : pt(n, 7, 2)
  };
}
const eT = Z({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { data: I(() => QI(e.name, e.colors)), SIZE: fr };
  }
}), tT = ["viewBox", "width", "height"], nT = { key: 0 }, rT = ["width", "height"], oT = ["width", "height", "rx"], sT = { mask: "url(#mask__beam)" }, iT = ["width", "height", "fill"], aT = ["width", "height", "transform", "fill", "rx"], cT = ["transform"], lT = ["d", "stroke"], uT = ["d", "fill"], dT = ["x", "width", "fill"], fT = ["x", "width", "fill"];
function pT(e, t, n, r, s, o) {
  return b(), C("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), C("title", nT, ke(e.name), 1)) : te("", !0),
    p("mask", {
      id: "mask__beam",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, oT)
    ], 8, rT),
    p("g", sT, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        fill: e.data.backgroundColor
      }, null, 8, iT),
      p("rect", {
        x: 0,
        y: 0,
        width: e.SIZE,
        height: e.SIZE,
        transform: `translate(${e.data.wrapperTranslateX} ${e.data.wrapperTranslateY}) rotate(${e.data.wrapperRotate} ${e.SIZE / 2} ${e.SIZE / 2}) scale(${e.data.wrapperScale})`,
        fill: e.data.wrapperColor,
        rx: e.data.isCircle ? e.SIZE : e.SIZE / 6
      }, null, 8, aT),
      p("g", {
        transform: `translate(${e.data.faceTranslateX} ${e.data.faceTranslateY}) rotate(${e.data.faceRotate} ${e.SIZE / 2} ${e.SIZE / 2})`
      }, [
        e.data.isMouthOpen ? (b(), C("path", {
          key: 0,
          d: `M15 ${19 + e.data.mouthSpread}c2 1
        4 1 6 0`,
          stroke: e.data.faceColor,
          fill: "none",
          "stroke-linecap": "round"
        }, null, 8, lT)) : (b(), C("path", {
          key: 1,
          d: `M13,${19 + e.data.mouthSpread} a1,0.75 0 0,0 10,0`,
          fill: e.data.faceColor
        }, null, 8, uT)),
        p("rect", {
          x: 14 - e.data.eyeSpread,
          y: 14,
          width: 1.5,
          height: 2,
          rx: 1,
          stroke: "none",
          fill: e.data.faceColor
        }, null, 8, dT),
        p("rect", {
          x: 20 + e.data.eyeSpread,
          y: 14,
          width: 1.5,
          height: 2,
          rx: 1,
          stroke: "none",
          fill: e.data.faceColor
        }, null, 8, fT)
      ], 8, cT)
    ])
  ], 8, tT);
}
const hT = /* @__PURE__ */ Ir(eT, [["render", pT]]), gT = 3, Ho = 80;
function mT(e, t) {
  const n = Mr(e), r = t && t.length;
  return Array.from({ length: gT }, (s, o) => ({
    color: nr(n + o, t, r),
    translateX: pt(n * (o + 1), Ho / 10, 1),
    translateY: pt(n * (o + 1), Ho / 10, 2),
    scale: 1.2 + pt(n * (o + 1), Ho / 20) / 10,
    rotate: pt(n * (o + 1), 360, 1)
  }));
}
const vT = Z({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { properties: I(() => mT(e.name, e.colors)), SIZE: Ho };
  }
}), _T = (e) => (Av("data-v-3c8b58b0"), e = e(), $v(), e), bT = ["viewBox", "width", "height"], yT = { key: 0 }, wT = ["width", "height"], kT = ["width", "height", "rx"], xT = { mask: "url(#mask__marble)" }, CT = ["width", "height", "fill"], ST = ["fill", "transform"], ET = ["fill", "transform"], AT = /* @__PURE__ */ _T(() => /* @__PURE__ */ p("defs", null, [
  /* @__PURE__ */ p("filter", {
    id: "prefix__filter0_f",
    filterUnits: "userSpaceOnUse",
    "color-interpolation-filters": "sRGB"
  }, [
    /* @__PURE__ */ p("feFlood", {
      "flood-opacity": 0,
      result: "BackgroundImageFix"
    }),
    /* @__PURE__ */ p("feBlend", {
      in: "SourceGraphic",
      in2: "BackgroundImageFix",
      result: "shape"
    }),
    /* @__PURE__ */ p("feGaussianBlur", {
      stdDeviation: 7,
      result: "effect1_foregroundBlur"
    })
  ])
], -1));
function $T(e, t, n, r, s, o) {
  return b(), C("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), C("title", yT, ke(e.name), 1)) : te("", !0),
    p("mask", {
      id: "mask__marble",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, kT)
    ], 8, wT),
    p("g", xT, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        fill: e.properties[0].color
      }, null, 8, CT),
      p("path", {
        filter: "url(#prefix__filter0_f)",
        d: "M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z",
        fill: e.properties[1].color,
        transform: `translate(${e.properties[1].translateX} ${e.properties[1].translateY}) rotate(${e.properties[1].rotate} ${e.SIZE / 2} ${e.SIZE / 2}) scale(${e.properties[2].scale})`
      }, null, 8, ST),
      p("path", {
        filter: "url(#prefix__filter0_f)",
        class: "mix-blend-overlay",
        d: "M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z",
        fill: e.properties[2].color,
        transform: `translate(${e.properties[2].translateX} ${e.properties[2].translateY}) rotate(${e.properties[2].rotate} ${e.SIZE / 2} ${e.SIZE / 2}) scale(${e.properties[2].scale})`
      }, null, 8, ET)
    ]),
    AT
  ], 8, bT);
}
const MT = /* @__PURE__ */ Ir(vT, [["render", $T], ["__scopeId", "data-v-3c8b58b0"]]), IT = 64, TT = 80;
function LT(e, t) {
  const n = Mr(e), r = t && t.length;
  return Array.from(
    { length: IT },
    (s, o) => nr(n % o, t, r)
  );
}
const OT = Z({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { pixelColors: I(
      () => LT(e.name, e.colors)
    ), SIZE: TT };
  }
}), RT = ["viewBox", "width", "height"], PT = { key: 0 }, BT = ["width", "height"], zT = ["width", "height", "rx"], DT = { mask: "url(#mask__pixel)" }, NT = ["fill"], qT = ["fill"], FT = ["fill"], HT = ["fill"], jT = ["fill"], VT = ["fill"], UT = ["fill"], ZT = ["fill"], WT = ["fill"], GT = ["fill"], KT = ["fill"], XT = ["fill"], YT = ["fill"], JT = ["fill"], QT = ["fill"], eL = ["fill"], tL = ["fill"], nL = ["fill"], rL = ["fill"], oL = ["fill"], sL = ["fill"], iL = ["fill"], aL = ["fill"], cL = ["fill"], lL = ["fill"], uL = ["fill"], dL = ["fill"], fL = ["fill"], pL = ["fill"], hL = ["fill"], gL = ["fill"], mL = ["fill"], vL = ["fill"], _L = ["fill"], bL = ["fill"], yL = ["fill"], wL = ["fill"], kL = ["fill"], xL = ["fill"], CL = ["fill"], SL = ["fill"], EL = ["fill"], AL = ["fill"], $L = ["fill"], ML = ["fill"], IL = ["fill"], TL = ["fill"], LL = ["fill"], OL = ["fill"], RL = ["fill"], PL = ["fill"], BL = ["fill"], zL = ["fill"], DL = ["fill"], NL = ["fill"], qL = ["fill"], FL = ["fill"], HL = ["fill"], jL = ["fill"], VL = ["fill"], UL = ["fill"], ZL = ["fill"], WL = ["fill"], GL = ["fill"];
function KL(e, t, n, r, s, o) {
  return b(), C("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), C("title", PT, ke(e.name), 1)) : te("", !0),
    p("mask", {
      id: "mask__pixel",
      "mask-type": "alpha",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, zT)
    ], 8, BT),
    p("g", DT, [
      p("rect", {
        width: 10,
        height: 10,
        fill: e.pixelColors[0]
      }, null, 8, NT),
      p("rect", {
        x: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[1]
      }, null, 8, qT),
      p("rect", {
        x: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[2]
      }, null, 8, FT),
      p("rect", {
        x: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[3]
      }, null, 8, HT),
      p("rect", {
        x: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[4]
      }, null, 8, jT),
      p("rect", {
        x: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[5]
      }, null, 8, VT),
      p("rect", {
        x: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[6]
      }, null, 8, UT),
      p("rect", {
        x: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[7]
      }, null, 8, ZT),
      p("rect", {
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[8]
      }, null, 8, WT),
      p("rect", {
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[9]
      }, null, 8, GT),
      p("rect", {
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[10]
      }, null, 8, KT),
      p("rect", {
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[11]
      }, null, 8, XT),
      p("rect", {
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[12]
      }, null, 8, YT),
      p("rect", {
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[13]
      }, null, 8, JT),
      p("rect", {
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[14]
      }, null, 8, QT),
      p("rect", {
        x: 20,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[15]
      }, null, 8, eL),
      p("rect", {
        x: 20,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[16]
      }, null, 8, tL),
      p("rect", {
        x: 20,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[17]
      }, null, 8, nL),
      p("rect", {
        x: 20,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[18]
      }, null, 8, rL),
      p("rect", {
        x: 20,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[19]
      }, null, 8, oL),
      p("rect", {
        x: 20,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[20]
      }, null, 8, sL),
      p("rect", {
        x: 20,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[21]
      }, null, 8, iL),
      p("rect", {
        x: 40,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[22]
      }, null, 8, aL),
      p("rect", {
        x: 40,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[23]
      }, null, 8, cL),
      p("rect", {
        x: 40,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[24]
      }, null, 8, lL),
      p("rect", {
        x: 40,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[25]
      }, null, 8, uL),
      p("rect", {
        x: 40,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[26]
      }, null, 8, dL),
      p("rect", {
        x: 40,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[27]
      }, null, 8, fL),
      p("rect", {
        x: 40,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[28]
      }, null, 8, pL),
      p("rect", {
        x: 60,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[29]
      }, null, 8, hL),
      p("rect", {
        x: 60,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[30]
      }, null, 8, gL),
      p("rect", {
        x: 60,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[31]
      }, null, 8, mL),
      p("rect", {
        x: 60,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[32]
      }, null, 8, vL),
      p("rect", {
        x: 60,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[33]
      }, null, 8, _L),
      p("rect", {
        x: 60,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[34]
      }, null, 8, bL),
      p("rect", {
        x: 60,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[35]
      }, null, 8, yL),
      p("rect", {
        x: 10,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[36]
      }, null, 8, wL),
      p("rect", {
        x: 10,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[37]
      }, null, 8, kL),
      p("rect", {
        x: 10,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[38]
      }, null, 8, xL),
      p("rect", {
        x: 10,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[39]
      }, null, 8, CL),
      p("rect", {
        x: 10,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[40]
      }, null, 8, SL),
      p("rect", {
        x: 10,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[41]
      }, null, 8, EL),
      p("rect", {
        x: 10,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[42]
      }, null, 8, AL),
      p("rect", {
        x: 30,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[43]
      }, null, 8, $L),
      p("rect", {
        x: 30,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[44]
      }, null, 8, ML),
      p("rect", {
        x: 30,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[45]
      }, null, 8, IL),
      p("rect", {
        x: 30,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[46]
      }, null, 8, TL),
      p("rect", {
        x: 30,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[47]
      }, null, 8, LL),
      p("rect", {
        x: 30,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[48]
      }, null, 8, OL),
      p("rect", {
        x: 30,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[49]
      }, null, 8, RL),
      p("rect", {
        x: 50,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[50]
      }, null, 8, PL),
      p("rect", {
        x: 50,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[51]
      }, null, 8, BL),
      p("rect", {
        x: 50,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[52]
      }, null, 8, zL),
      p("rect", {
        x: 50,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[53]
      }, null, 8, DL),
      p("rect", {
        x: 50,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[54]
      }, null, 8, NL),
      p("rect", {
        x: 50,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[55]
      }, null, 8, qL),
      p("rect", {
        x: 50,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[56]
      }, null, 8, FL),
      p("rect", {
        x: 70,
        y: 10,
        width: 10,
        height: 10,
        fill: e.pixelColors[57]
      }, null, 8, HL),
      p("rect", {
        x: 70,
        y: 20,
        width: 10,
        height: 10,
        fill: e.pixelColors[58]
      }, null, 8, jL),
      p("rect", {
        x: 70,
        y: 30,
        width: 10,
        height: 10,
        fill: e.pixelColors[59]
      }, null, 8, VL),
      p("rect", {
        x: 70,
        y: 40,
        width: 10,
        height: 10,
        fill: e.pixelColors[60]
      }, null, 8, UL),
      p("rect", {
        x: 70,
        y: 50,
        width: 10,
        height: 10,
        fill: e.pixelColors[61]
      }, null, 8, ZL),
      p("rect", {
        x: 70,
        y: 60,
        width: 10,
        height: 10,
        fill: e.pixelColors[62]
      }, null, 8, WL),
      p("rect", {
        x: 70,
        y: 70,
        width: 10,
        height: 10,
        fill: e.pixelColors[63]
      }, null, 8, GL)
    ])
  ], 8, RT);
}
const XL = /* @__PURE__ */ Ir(OT, [["render", KL]]), YL = 90, JL = 5;
function QL(e, t) {
  const n = Mr(e), r = t && t.length, s = Array.from(
    { length: JL },
    (i, a) => nr(n + a, t, r)
  ), o = [];
  return o[0] = s[0], o[1] = s[1], o[2] = s[1], o[3] = s[2], o[4] = s[2], o[5] = s[3], o[6] = s[3], o[7] = s[0], o[8] = s[4], o;
}
const eO = Z({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    return { ringColors: I(() => QL(e.name, e.colors)), SIZE: YL };
  }
}), tO = ["viewBox", "width", "height"], nO = { key: 0 }, rO = ["width", "height"], oO = ["width", "height", "rx"], sO = { mask: "url(#mask__ring)" }, iO = ["fill"], aO = ["fill"], cO = ["fill"], lO = ["fill"], uO = ["fill"], dO = ["fill"], fO = ["fill"], pO = ["fill"], hO = ["fill"];
function gO(e, t, n, r, s, o) {
  return b(), C("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), C("title", nO, ke(e.name), 1)) : te("", !0),
    p("mask", {
      id: "mask__ring",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, oO)
    ], 8, rO),
    p("g", sO, [
      p("path", {
        d: "M0 0h90v45H0z",
        fill: e.ringColors[0]
      }, null, 8, iO),
      p("path", {
        d: "M0 45h90v45H0z",
        fill: e.ringColors[1]
      }, null, 8, aO),
      p("path", {
        d: "M83 45a38 38 0 00-76 0h76z",
        fill: e.ringColors[2]
      }, null, 8, cO),
      p("path", {
        d: "M83 45a38 38 0 01-76 0h76z",
        fill: e.ringColors[3]
      }, null, 8, lO),
      p("path", {
        d: "M77 45a32 32 0 10-64 0h64z",
        fill: e.ringColors[4]
      }, null, 8, uO),
      p("path", {
        d: "M77 45a32 32 0 11-64 0h64z",
        fill: e.ringColors[5]
      }, null, 8, dO),
      p("path", {
        d: "M71 45a26 26 0 00-52 0h52z",
        fill: e.ringColors[6]
      }, null, 8, fO),
      p("path", {
        d: "M71 45a26 26 0 01-52 0h52z",
        fill: e.ringColors[7]
      }, null, 8, pO),
      p("circle", {
        cx: 45,
        cy: 45,
        r: 23,
        fill: e.ringColors[8]
      }, null, 8, hO)
    ])
  ], 8, tO);
}
const mO = /* @__PURE__ */ Ir(eO, [["render", gO]]), vO = 4, _O = 80;
function bO(e, t) {
  const n = Mr(e), r = t && t.length;
  return Array.from(
    { length: vO },
    (s, o) => nr(n + o, t, r)
  );
}
const yO = Z({
  props: {
    colors: {
      type: Array,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !0
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    const t = I(
      () => bO(e.name, e.colors)
    ), n = I(() => e.name.replace(/\s/g, ""));
    return { sunsetColors: t, formattedName: n, SIZE: _O };
  }
}), wO = ["viewBox", "width", "height"], kO = { key: 0 }, xO = ["width", "height"], CO = ["width", "height", "rx"], SO = { mask: "url(#mask__sunset)" }, EO = ["fill"], AO = ["fill"], $O = ["id", "x1", "x2", "y2"], MO = ["stop-color"], IO = ["stop-color"], TO = ["id", "x1", "y1", "x2", "y2"], LO = ["stop-color"], OO = ["stop-color"];
function RO(e, t, n, r, s, o) {
  return b(), C("svg", {
    viewBox: `0 0 ${e.SIZE} ${e.SIZE}`,
    fill: "none",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    width: e.size,
    height: e.size
  }, [
    e.title ? (b(), C("title", kO, ke(e.name), 1)) : te("", !0),
    p("mask", {
      id: "mask__sunset",
      maskUnits: "userSpaceOnUse",
      x: 0,
      y: 0,
      width: e.SIZE,
      height: e.SIZE
    }, [
      p("rect", {
        width: e.SIZE,
        height: e.SIZE,
        rx: e.square ? void 0 : e.SIZE * 2,
        fill: "#FFFFFF"
      }, null, 8, CO)
    ], 8, xO),
    p("g", SO, [
      p("path", {
        fill: `url(#gradient_paint0_linear_${e.formattedName})`,
        d: "M0 0h80v40H0z"
      }, null, 8, EO),
      p("path", {
        fill: `url(#gradient_paint1_linear_${e.formattedName})`,
        d: "M0 40h80v40H0z"
      }, null, 8, AO)
    ]),
    p("defs", null, [
      p("linearGradient", {
        id: `gradient_paint0_linear_${e.formattedName}`,
        x1: e.SIZE / 2,
        y1: 0,
        x2: e.SIZE / 2,
        y2: e.SIZE / 2,
        gradientUnits: "userSpaceOnUse"
      }, [
        p("stop", {
          "stop-color": e.sunsetColors[0]
        }, null, 8, MO),
        p("stop", {
          offset: 1,
          "stop-color": e.sunsetColors[1]
        }, null, 8, IO)
      ], 8, $O),
      p("linearGradient", {
        id: `gradient_paint1_linear_${e.formattedName}`,
        x1: e.SIZE / 2,
        y1: e.SIZE / 2,
        x2: e.SIZE / 2,
        y2: e.SIZE,
        gradientUnits: "userSpaceOnUse"
      }, [
        p("stop", {
          "stop-color": e.sunsetColors[2]
        }, null, 8, LO),
        p("stop", {
          offset: 1,
          "stop-color": e.sunsetColors[3]
        }, null, 8, OO)
      ], 8, TO)
    ])
  ], 8, wO);
}
const PO = /* @__PURE__ */ Ir(yO, [["render", RO]]);
Z({
  name: "Avatar",
  props: {
    variant: {
      type: String,
      required: !1,
      default: "marble",
      validator(e) {
        return [
          "bauhaus",
          "beam",
          "marble",
          "pixel",
          "ring",
          "sunset"
        ].includes(e);
      }
    },
    colors: {
      type: Array,
      required: !1,
      default: () => ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]
    },
    name: {
      type: String,
      required: !1,
      default: "Clara Barton"
    },
    square: {
      type: Boolean,
      required: !1,
      default: !1
    },
    size: {
      type: Number,
      required: !1,
      default: 40
    },
    title: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup() {
    return {};
  },
  components: {
    AvatarBauhaus: JI,
    AvatarBeam: hT,
    AvatarMarble: MT,
    AvatarPixel: XL,
    AvatarRing: mO,
    AvatarSunset: PO
  }
});
const kd = /(\*|-) \[x\]/, xd = /(\*|-) \[\s\]/, BO = (e, t) => {
  let n = 0;
  const r = e.split(`
`);
  for (let s = 0; s < r.length; s++) {
    const o = r[s], i = kd.test(o), a = xd.test(o);
    if (i || a) {
      if (n === t) {
        const c = i ? kd : xd, u = i ? "[ ]" : "[x]";
        r[s] = o.replace(c, `$1 ${u}`);
        break;
      }
      n++;
    }
  }
  return r.join(`
`);
};
function zO(e, t) {
  return /^on[A-Z]/.test(t);
}
function om(e) {
  return `${e ? `${e}-` : ""}${Math.random().toString(36).substring(2, 11)}`;
}
const DO = /* @__PURE__ */ Z({
  name: "N8nInput",
  __name: "Input",
  props: {
    modelValue: { default: "" },
    type: { default: "text" },
    size: { default: "large" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    rows: { default: 2 },
    maxlength: { default: void 0 },
    title: { default: "" },
    name: { default: () => om("input") },
    autocomplete: { default: "off" }
  },
  setup(e, { expose: t }) {
    const n = e, r = I(
      () => n.size === "medium" ? "default" : n.size
    ), s = I(() => {
      const d = [];
      return n.size === "xlarge" && d.push("xlarge"), n.type === "password" && d.push("ph-no-capture"), d;
    }), o = D(), i = I(() => {
      if (!(o != null && o.value)) return;
      const d = n.type === "textarea" ? "textarea" : "input";
      return o.value.$el.querySelector(d);
    });
    return t({ focus: () => {
      var d;
      return (d = i.value) == null ? void 0 : d.focus();
    }, blur: () => {
      var d;
      return (d = i.value) == null ? void 0 : d.blur();
    }, select: () => {
      var d;
      return (d = i.value) == null ? void 0 : d.select();
    } }), (d, l) => (b(), Y(_(ws), We({
      ref_key: "innerInput",
      ref: o,
      "model-value": d.modelValue,
      type: d.type,
      size: r.value,
      class: ["n8n-input", ...s.value],
      autocomplete: d.autocomplete,
      name: d.name,
      placeholder: d.placeholder,
      disabled: d.disabled,
      readonly: d.readonly,
      clearable: d.clearable,
      rows: d.rows,
      title: d.title,
      maxlength: d.maxlength
    }, d.$attrs), Kr({ _: 2 }, [
      d.$slots.prepend ? {
        name: "prepend",
        fn: J(() => [
          ae(d.$slots, "prepend")
        ]),
        key: "0"
      } : void 0,
      d.$slots.append ? {
        name: "append",
        fn: J(() => [
          ae(d.$slots, "append")
        ]),
        key: "1"
      } : void 0,
      d.$slots.prefix ? {
        name: "prefix",
        fn: J(() => [
          ae(d.$slots, "prefix")
        ]),
        key: "2"
      } : void 0,
      d.$slots.suffix ? {
        name: "suffix",
        fn: J(() => [
          ae(d.$slots, "suffix")
        ]),
        key: "3"
      } : void 0
    ]), 1040, ["model-value", "type", "size", "class", "autocomplete", "name", "placeholder", "disabled", "readonly", "clearable", "rows", "title", "maxlength"]));
  }
}), NO = "_xlarge_ddtui_1", qO = {
  xlarge: NO
}, FO = {
  $style: qO
}, sm = /* @__PURE__ */ Ht(DO, [["__cssModules", FO]]);
om("color-picker");
function HO() {
  return {
    t: (e, t = []) => wb(e, t)
  };
}
({
  ...Yh
});
({
  ...Mc.props
});
/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const jO = () => {
}, Yo = Array.isArray;
function Cd(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function VO(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!UO(e[n], t[n]))
      return !1;
  return !0;
}
function UO(e, t) {
  return Yo(e) ? Sd(e, t) : Yo(t) ? Sd(t, e) : e === t;
}
function Sd(e, t) {
  return Yo(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
var Ed;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Ed || (Ed = {}));
var Ad;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Ad || (Ad = {}));
var $d;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})($d || ($d = {}));
const im = Symbol(""), ZO = Symbol("");
function Md(e) {
  const t = Le(im), n = Le(ZO), r = I(() => {
    const c = _(e.to);
    return t.resolve(c);
  }), s = I(() => {
    const { matched: c } = r.value, { length: u } = c, d = c[u - 1], l = n.matched;
    if (!d || !l.length)
      return -1;
    const m = l.findIndex(Cd.bind(null, d));
    if (m > -1)
      return m;
    const f = Td(c[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      Td(d) === f && // avoid comparing the child with its parent
      l[l.length - 1].path !== f ? l.findIndex(Cd.bind(null, c[u - 2])) : m
    );
  }), o = I(() => s.value > -1 && XO(n.params, r.value.params)), i = I(() => s.value > -1 && s.value === n.matched.length - 1 && VO(n.params, r.value.params));
  function a(c = {}) {
    if (KO(c)) {
      const u = t[_(e.replace) ? "replace" : "push"](
        _(e.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(jO);
      return e.viewTransition && typeof document < "u" && "startViewTransition" in document && document.startViewTransition(() => u), u;
    }
    return Promise.resolve();
  }
  return {
    route: r,
    href: I(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: a
  };
}
function WO(e) {
  return e.length === 1 ? e[0] : e;
}
const GO = /* @__PURE__ */ Z({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: Md,
  setup(e, { slots: t }) {
    const n = zn(Md(e)), { options: r } = Le(im), s = I(() => ({
      [Ld(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [Ld(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && WO(t.default(n));
      return e.custom ? o : Rt("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: s.value
      }, o);
    };
  }
}), Id = GO;
function KO(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function XO(e, t) {
  for (const n in t) {
    const r = t[n], s = e[n];
    if (typeof r == "string") {
      if (r !== s)
        return !1;
    } else if (!Yo(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1;
  }
  return !0;
}
function Td(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Ld = (e, t, n) => e ?? t ?? n;
var Ys = {};
const YO = "Á", JO = "á", QO = "Ă", eR = "ă", tR = "∾", nR = "∿", rR = "∾̳", oR = "Â", sR = "â", iR = "´", aR = "А", cR = "а", lR = "Æ", uR = "æ", dR = "⁡", fR = "𝔄", pR = "𝔞", hR = "À", gR = "à", mR = "ℵ", vR = "ℵ", _R = "Α", bR = "α", yR = "Ā", wR = "ā", kR = "⨿", xR = "&", CR = "&", SR = "⩕", ER = "⩓", AR = "∧", $R = "⩜", MR = "⩘", IR = "⩚", TR = "∠", LR = "⦤", OR = "∠", RR = "⦨", PR = "⦩", BR = "⦪", zR = "⦫", DR = "⦬", NR = "⦭", qR = "⦮", FR = "⦯", HR = "∡", jR = "∟", VR = "⊾", UR = "⦝", ZR = "∢", WR = "Å", GR = "⍼", KR = "Ą", XR = "ą", YR = "𝔸", JR = "𝕒", QR = "⩯", eP = "≈", tP = "⩰", nP = "≊", rP = "≋", oP = "'", sP = "⁡", iP = "≈", aP = "≊", cP = "Å", lP = "å", uP = "𝒜", dP = "𝒶", fP = "≔", pP = "*", hP = "≈", gP = "≍", mP = "Ã", vP = "ã", _P = "Ä", bP = "ä", yP = "∳", wP = "⨑", kP = "≌", xP = "϶", CP = "‵", SP = "∽", EP = "⋍", AP = "∖", $P = "⫧", MP = "⊽", IP = "⌅", TP = "⌆", LP = "⌅", OP = "⎵", RP = "⎶", PP = "≌", BP = "Б", zP = "б", DP = "„", NP = "∵", qP = "∵", FP = "∵", HP = "⦰", jP = "϶", VP = "ℬ", UP = "ℬ", ZP = "Β", WP = "β", GP = "ℶ", KP = "≬", XP = "𝔅", YP = "𝔟", JP = "⋂", QP = "◯", eB = "⋃", tB = "⨀", nB = "⨁", rB = "⨂", oB = "⨆", sB = "★", iB = "▽", aB = "△", cB = "⨄", lB = "⋁", uB = "⋀", dB = "⤍", fB = "⧫", pB = "▪", hB = "▴", gB = "▾", mB = "◂", vB = "▸", _B = "␣", bB = "▒", yB = "░", wB = "▓", kB = "█", xB = "=⃥", CB = "≡⃥", SB = "⫭", EB = "⌐", AB = "𝔹", $B = "𝕓", MB = "⊥", IB = "⊥", TB = "⋈", LB = "⧉", OB = "┐", RB = "╕", PB = "╖", BB = "╗", zB = "┌", DB = "╒", NB = "╓", qB = "╔", FB = "─", HB = "═", jB = "┬", VB = "╤", UB = "╥", ZB = "╦", WB = "┴", GB = "╧", KB = "╨", XB = "╩", YB = "⊟", JB = "⊞", QB = "⊠", ez = "┘", tz = "╛", nz = "╜", rz = "╝", oz = "└", sz = "╘", iz = "╙", az = "╚", cz = "│", lz = "║", uz = "┼", dz = "╪", fz = "╫", pz = "╬", hz = "┤", gz = "╡", mz = "╢", vz = "╣", _z = "├", bz = "╞", yz = "╟", wz = "╠", kz = "‵", xz = "˘", Cz = "˘", Sz = "¦", Ez = "𝒷", Az = "ℬ", $z = "⁏", Mz = "∽", Iz = "⋍", Tz = "⧅", Lz = "\\", Oz = "⟈", Rz = "•", Pz = "•", Bz = "≎", zz = "⪮", Dz = "≏", Nz = "≎", qz = "≏", Fz = "Ć", Hz = "ć", jz = "⩄", Vz = "⩉", Uz = "⩋", Zz = "∩", Wz = "⋒", Gz = "⩇", Kz = "⩀", Xz = "ⅅ", Yz = "∩︀", Jz = "⁁", Qz = "ˇ", eD = "ℭ", tD = "⩍", nD = "Č", rD = "č", oD = "Ç", sD = "ç", iD = "Ĉ", aD = "ĉ", cD = "∰", lD = "⩌", uD = "⩐", dD = "Ċ", fD = "ċ", pD = "¸", hD = "¸", gD = "⦲", mD = "¢", vD = "·", _D = "·", bD = "𝔠", yD = "ℭ", wD = "Ч", kD = "ч", xD = "✓", CD = "✓", SD = "Χ", ED = "χ", AD = "ˆ", $D = "≗", MD = "↺", ID = "↻", TD = "⊛", LD = "⊚", OD = "⊝", RD = "⊙", PD = "®", BD = "Ⓢ", zD = "⊖", DD = "⊕", ND = "⊗", qD = "○", FD = "⧃", HD = "≗", jD = "⨐", VD = "⫯", UD = "⧂", ZD = "∲", WD = "”", GD = "’", KD = "♣", XD = "♣", YD = ":", JD = "∷", QD = "⩴", eN = "≔", tN = "≔", nN = ",", rN = "@", oN = "∁", sN = "∘", iN = "∁", aN = "ℂ", cN = "≅", lN = "⩭", uN = "≡", dN = "∮", fN = "∯", pN = "∮", hN = "𝕔", gN = "ℂ", mN = "∐", vN = "∐", _N = "©", bN = "©", yN = "℗", wN = "∳", kN = "↵", xN = "✗", CN = "⨯", SN = "𝒞", EN = "𝒸", AN = "⫏", $N = "⫑", MN = "⫐", IN = "⫒", TN = "⋯", LN = "⤸", ON = "⤵", RN = "⋞", PN = "⋟", BN = "↶", zN = "⤽", DN = "⩈", NN = "⩆", qN = "≍", FN = "∪", HN = "⋓", jN = "⩊", VN = "⊍", UN = "⩅", ZN = "∪︀", WN = "↷", GN = "⤼", KN = "⋞", XN = "⋟", YN = "⋎", JN = "⋏", QN = "¤", eq = "↶", tq = "↷", nq = "⋎", rq = "⋏", oq = "∲", sq = "∱", iq = "⌭", aq = "†", cq = "‡", lq = "ℸ", uq = "↓", dq = "↡", fq = "⇓", pq = "‐", hq = "⫤", gq = "⊣", mq = "⤏", vq = "˝", _q = "Ď", bq = "ď", yq = "Д", wq = "д", kq = "‡", xq = "⇊", Cq = "ⅅ", Sq = "ⅆ", Eq = "⤑", Aq = "⩷", $q = "°", Mq = "∇", Iq = "Δ", Tq = "δ", Lq = "⦱", Oq = "⥿", Rq = "𝔇", Pq = "𝔡", Bq = "⥥", zq = "⇃", Dq = "⇂", Nq = "´", qq = "˙", Fq = "˝", Hq = "`", jq = "˜", Vq = "⋄", Uq = "⋄", Zq = "⋄", Wq = "♦", Gq = "♦", Kq = "¨", Xq = "ⅆ", Yq = "ϝ", Jq = "⋲", Qq = "÷", eF = "÷", tF = "⋇", nF = "⋇", rF = "Ђ", oF = "ђ", sF = "⌞", iF = "⌍", aF = "$", cF = "𝔻", lF = "𝕕", uF = "¨", dF = "˙", fF = "⃜", pF = "≐", hF = "≑", gF = "≐", mF = "∸", vF = "∔", _F = "⊡", bF = "⌆", yF = "∯", wF = "¨", kF = "⇓", xF = "⇐", CF = "⇔", SF = "⫤", EF = "⟸", AF = "⟺", $F = "⟹", MF = "⇒", IF = "⊨", TF = "⇑", LF = "⇕", OF = "∥", RF = "⤓", PF = "↓", BF = "↓", zF = "⇓", DF = "⇵", NF = "̑", qF = "⇊", FF = "⇃", HF = "⇂", jF = "⥐", VF = "⥞", UF = "⥖", ZF = "↽", WF = "⥟", GF = "⥗", KF = "⇁", XF = "↧", YF = "⊤", JF = "⤐", QF = "⌟", eH = "⌌", tH = "𝒟", nH = "𝒹", rH = "Ѕ", oH = "ѕ", sH = "⧶", iH = "Đ", aH = "đ", cH = "⋱", lH = "▿", uH = "▾", dH = "⇵", fH = "⥯", pH = "⦦", hH = "Џ", gH = "џ", mH = "⟿", vH = "É", _H = "é", bH = "⩮", yH = "Ě", wH = "ě", kH = "Ê", xH = "ê", CH = "≖", SH = "≕", EH = "Э", AH = "э", $H = "⩷", MH = "Ė", IH = "ė", TH = "≑", LH = "ⅇ", OH = "≒", RH = "𝔈", PH = "𝔢", BH = "⪚", zH = "È", DH = "è", NH = "⪖", qH = "⪘", FH = "⪙", HH = "∈", jH = "⏧", VH = "ℓ", UH = "⪕", ZH = "⪗", WH = "Ē", GH = "ē", KH = "∅", XH = "∅", YH = "◻", JH = "∅", QH = "▫", ej = " ", tj = " ", nj = " ", rj = "Ŋ", oj = "ŋ", sj = " ", ij = "Ę", aj = "ę", cj = "𝔼", lj = "𝕖", uj = "⋕", dj = "⧣", fj = "⩱", pj = "ε", hj = "Ε", gj = "ε", mj = "ϵ", vj = "≖", _j = "≕", bj = "≂", yj = "⪖", wj = "⪕", kj = "⩵", xj = "=", Cj = "≂", Sj = "≟", Ej = "⇌", Aj = "≡", $j = "⩸", Mj = "⧥", Ij = "⥱", Tj = "≓", Lj = "ℯ", Oj = "ℰ", Rj = "≐", Pj = "⩳", Bj = "≂", zj = "Η", Dj = "η", Nj = "Ð", qj = "ð", Fj = "Ë", Hj = "ë", jj = "€", Vj = "!", Uj = "∃", Zj = "∃", Wj = "ℰ", Gj = "ⅇ", Kj = "ⅇ", Xj = "≒", Yj = "Ф", Jj = "ф", Qj = "♀", eV = "ﬃ", tV = "ﬀ", nV = "ﬄ", rV = "𝔉", oV = "𝔣", sV = "ﬁ", iV = "◼", aV = "▪", cV = "fj", lV = "♭", uV = "ﬂ", dV = "▱", fV = "ƒ", pV = "𝔽", hV = "𝕗", gV = "∀", mV = "∀", vV = "⋔", _V = "⫙", bV = "ℱ", yV = "⨍", wV = "½", kV = "⅓", xV = "¼", CV = "⅕", SV = "⅙", EV = "⅛", AV = "⅔", $V = "⅖", MV = "¾", IV = "⅗", TV = "⅜", LV = "⅘", OV = "⅚", RV = "⅝", PV = "⅞", BV = "⁄", zV = "⌢", DV = "𝒻", NV = "ℱ", qV = "ǵ", FV = "Γ", HV = "γ", jV = "Ϝ", VV = "ϝ", UV = "⪆", ZV = "Ğ", WV = "ğ", GV = "Ģ", KV = "Ĝ", XV = "ĝ", YV = "Г", JV = "г", QV = "Ġ", eU = "ġ", tU = "≥", nU = "≧", rU = "⪌", oU = "⋛", sU = "≥", iU = "≧", aU = "⩾", cU = "⪩", lU = "⩾", uU = "⪀", dU = "⪂", fU = "⪄", pU = "⋛︀", hU = "⪔", gU = "𝔊", mU = "𝔤", vU = "≫", _U = "⋙", bU = "⋙", yU = "ℷ", wU = "Ѓ", kU = "ѓ", xU = "⪥", CU = "≷", SU = "⪒", EU = "⪤", AU = "⪊", $U = "⪊", MU = "⪈", IU = "≩", TU = "⪈", LU = "≩", OU = "⋧", RU = "𝔾", PU = "𝕘", BU = "`", zU = "≥", DU = "⋛", NU = "≧", qU = "⪢", FU = "≷", HU = "⩾", jU = "≳", VU = "𝒢", UU = "ℊ", ZU = "≳", WU = "⪎", GU = "⪐", KU = "⪧", XU = "⩺", YU = ">", JU = ">", QU = "≫", eZ = "⋗", tZ = "⦕", nZ = "⩼", rZ = "⪆", oZ = "⥸", sZ = "⋗", iZ = "⋛", aZ = "⪌", cZ = "≷", lZ = "≳", uZ = "≩︀", dZ = "≩︀", fZ = "ˇ", pZ = " ", hZ = "½", gZ = "ℋ", mZ = "Ъ", vZ = "ъ", _Z = "⥈", bZ = "↔", yZ = "⇔", wZ = "↭", kZ = "^", xZ = "ℏ", CZ = "Ĥ", SZ = "ĥ", EZ = "♥", AZ = "♥", $Z = "…", MZ = "⊹", IZ = "𝔥", TZ = "ℌ", LZ = "ℋ", OZ = "⤥", RZ = "⤦", PZ = "⇿", BZ = "∻", zZ = "↩", DZ = "↪", NZ = "𝕙", qZ = "ℍ", FZ = "―", HZ = "─", jZ = "𝒽", VZ = "ℋ", UZ = "ℏ", ZZ = "Ħ", WZ = "ħ", GZ = "≎", KZ = "≏", XZ = "⁃", YZ = "‐", JZ = "Í", QZ = "í", eW = "⁣", tW = "Î", nW = "î", rW = "И", oW = "и", sW = "İ", iW = "Е", aW = "е", cW = "¡", lW = "⇔", uW = "𝔦", dW = "ℑ", fW = "Ì", pW = "ì", hW = "ⅈ", gW = "⨌", mW = "∭", vW = "⧜", _W = "℩", bW = "Ĳ", yW = "ĳ", wW = "Ī", kW = "ī", xW = "ℑ", CW = "ⅈ", SW = "ℐ", EW = "ℑ", AW = "ı", $W = "ℑ", MW = "⊷", IW = "Ƶ", TW = "⇒", LW = "℅", OW = "∞", RW = "⧝", PW = "ı", BW = "⊺", zW = "∫", DW = "∬", NW = "ℤ", qW = "∫", FW = "⊺", HW = "⋂", jW = "⨗", VW = "⨼", UW = "⁣", ZW = "⁢", WW = "Ё", GW = "ё", KW = "Į", XW = "į", YW = "𝕀", JW = "𝕚", QW = "Ι", eG = "ι", tG = "⨼", nG = "¿", rG = "𝒾", oG = "ℐ", sG = "∈", iG = "⋵", aG = "⋹", cG = "⋴", lG = "⋳", uG = "∈", dG = "⁢", fG = "Ĩ", pG = "ĩ", hG = "І", gG = "і", mG = "Ï", vG = "ï", _G = "Ĵ", bG = "ĵ", yG = "Й", wG = "й", kG = "𝔍", xG = "𝔧", CG = "ȷ", SG = "𝕁", EG = "𝕛", AG = "𝒥", $G = "𝒿", MG = "Ј", IG = "ј", TG = "Є", LG = "є", OG = "Κ", RG = "κ", PG = "ϰ", BG = "Ķ", zG = "ķ", DG = "К", NG = "к", qG = "𝔎", FG = "𝔨", HG = "ĸ", jG = "Х", VG = "х", UG = "Ќ", ZG = "ќ", WG = "𝕂", GG = "𝕜", KG = "𝒦", XG = "𝓀", YG = "⇚", JG = "Ĺ", QG = "ĺ", eK = "⦴", tK = "ℒ", nK = "Λ", rK = "λ", oK = "⟨", sK = "⟪", iK = "⦑", aK = "⟨", cK = "⪅", lK = "ℒ", uK = "«", dK = "⇤", fK = "⤟", pK = "←", hK = "↞", gK = "⇐", mK = "⤝", vK = "↩", _K = "↫", bK = "⤹", yK = "⥳", wK = "↢", kK = "⤙", xK = "⤛", CK = "⪫", SK = "⪭", EK = "⪭︀", AK = "⤌", $K = "⤎", MK = "❲", IK = "{", TK = "[", LK = "⦋", OK = "⦏", RK = "⦍", PK = "Ľ", BK = "ľ", zK = "Ļ", DK = "ļ", NK = "⌈", qK = "{", FK = "Л", HK = "л", jK = "⤶", VK = "“", UK = "„", ZK = "⥧", WK = "⥋", GK = "↲", KK = "≤", XK = "≦", YK = "⟨", JK = "⇤", QK = "←", eX = "←", tX = "⇐", nX = "⇆", rX = "↢", oX = "⌈", sX = "⟦", iX = "⥡", aX = "⥙", cX = "⇃", lX = "⌊", uX = "↽", dX = "↼", fX = "⇇", pX = "↔", hX = "↔", gX = "⇔", mX = "⇆", vX = "⇋", _X = "↭", bX = "⥎", yX = "↤", wX = "⊣", kX = "⥚", xX = "⋋", CX = "⧏", SX = "⊲", EX = "⊴", AX = "⥑", $X = "⥠", MX = "⥘", IX = "↿", TX = "⥒", LX = "↼", OX = "⪋", RX = "⋚", PX = "≤", BX = "≦", zX = "⩽", DX = "⪨", NX = "⩽", qX = "⩿", FX = "⪁", HX = "⪃", jX = "⋚︀", VX = "⪓", UX = "⪅", ZX = "⋖", WX = "⋚", GX = "⪋", KX = "⋚", XX = "≦", YX = "≶", JX = "≶", QX = "⪡", eY = "≲", tY = "⩽", nY = "≲", rY = "⥼", oY = "⌊", sY = "𝔏", iY = "𝔩", aY = "≶", cY = "⪑", lY = "⥢", uY = "↽", dY = "↼", fY = "⥪", pY = "▄", hY = "Љ", gY = "љ", mY = "⇇", vY = "≪", _Y = "⋘", bY = "⌞", yY = "⇚", wY = "⥫", kY = "◺", xY = "Ŀ", CY = "ŀ", SY = "⎰", EY = "⎰", AY = "⪉", $Y = "⪉", MY = "⪇", IY = "≨", TY = "⪇", LY = "≨", OY = "⋦", RY = "⟬", PY = "⇽", BY = "⟦", zY = "⟵", DY = "⟵", NY = "⟸", qY = "⟷", FY = "⟷", HY = "⟺", jY = "⟼", VY = "⟶", UY = "⟶", ZY = "⟹", WY = "↫", GY = "↬", KY = "⦅", XY = "𝕃", YY = "𝕝", JY = "⨭", QY = "⨴", eJ = "∗", tJ = "_", nJ = "↙", rJ = "↘", oJ = "◊", sJ = "◊", iJ = "⧫", aJ = "(", cJ = "⦓", lJ = "⇆", uJ = "⌟", dJ = "⇋", fJ = "⥭", pJ = "‎", hJ = "⊿", gJ = "‹", mJ = "𝓁", vJ = "ℒ", _J = "↰", bJ = "↰", yJ = "≲", wJ = "⪍", kJ = "⪏", xJ = "[", CJ = "‘", SJ = "‚", EJ = "Ł", AJ = "ł", $J = "⪦", MJ = "⩹", IJ = "<", TJ = "<", LJ = "≪", OJ = "⋖", RJ = "⋋", PJ = "⋉", BJ = "⥶", zJ = "⩻", DJ = "◃", NJ = "⊴", qJ = "◂", FJ = "⦖", HJ = "⥊", jJ = "⥦", VJ = "≨︀", UJ = "≨︀", ZJ = "¯", WJ = "♂", GJ = "✠", KJ = "✠", XJ = "↦", YJ = "↦", JJ = "↧", QJ = "↤", eQ = "↥", tQ = "▮", nQ = "⨩", rQ = "М", oQ = "м", sQ = "—", iQ = "∺", aQ = "∡", cQ = " ", lQ = "ℳ", uQ = "𝔐", dQ = "𝔪", fQ = "℧", pQ = "µ", hQ = "*", gQ = "⫰", mQ = "∣", vQ = "·", _Q = "⊟", bQ = "−", yQ = "∸", wQ = "⨪", kQ = "∓", xQ = "⫛", CQ = "…", SQ = "∓", EQ = "⊧", AQ = "𝕄", $Q = "𝕞", MQ = "∓", IQ = "𝓂", TQ = "ℳ", LQ = "∾", OQ = "Μ", RQ = "μ", PQ = "⊸", BQ = "⊸", zQ = "∇", DQ = "Ń", NQ = "ń", qQ = "∠⃒", FQ = "≉", HQ = "⩰̸", jQ = "≋̸", VQ = "ŉ", UQ = "≉", ZQ = "♮", WQ = "ℕ", GQ = "♮", KQ = " ", XQ = "≎̸", YQ = "≏̸", JQ = "⩃", QQ = "Ň", eee = "ň", tee = "Ņ", nee = "ņ", ree = "≇", oee = "⩭̸", see = "⩂", iee = "Н", aee = "н", cee = "–", lee = "⤤", uee = "↗", dee = "⇗", fee = "↗", pee = "≠", hee = "≐̸", gee = "​", mee = "​", vee = "​", _ee = "​", bee = "≢", yee = "⤨", wee = "≂̸", kee = "≫", xee = "≪", Cee = `
`, See = "∄", Eee = "∄", Aee = "𝔑", $ee = "𝔫", Mee = "≧̸", Iee = "≱", Tee = "≱", Lee = "≧̸", Oee = "⩾̸", Ree = "⩾̸", Pee = "⋙̸", Bee = "≵", zee = "≫⃒", Dee = "≯", Nee = "≯", qee = "≫̸", Fee = "↮", Hee = "⇎", jee = "⫲", Vee = "∋", Uee = "⋼", Zee = "⋺", Wee = "∋", Gee = "Њ", Kee = "њ", Xee = "↚", Yee = "⇍", Jee = "‥", Qee = "≦̸", ete = "≰", tte = "↚", nte = "⇍", rte = "↮", ote = "⇎", ste = "≰", ite = "≦̸", ate = "⩽̸", cte = "⩽̸", lte = "≮", ute = "⋘̸", dte = "≴", fte = "≪⃒", pte = "≮", hte = "⋪", gte = "⋬", mte = "≪̸", vte = "∤", _te = "⁠", bte = " ", yte = "𝕟", wte = "ℕ", kte = "⫬", xte = "¬", Cte = "≢", Ste = "≭", Ete = "∦", Ate = "∉", $te = "≠", Mte = "≂̸", Ite = "∄", Tte = "≯", Lte = "≱", Ote = "≧̸", Rte = "≫̸", Pte = "≹", Bte = "⩾̸", zte = "≵", Dte = "≎̸", Nte = "≏̸", qte = "∉", Fte = "⋵̸", Hte = "⋹̸", jte = "∉", Vte = "⋷", Ute = "⋶", Zte = "⧏̸", Wte = "⋪", Gte = "⋬", Kte = "≮", Xte = "≰", Yte = "≸", Jte = "≪̸", Qte = "⩽̸", ene = "≴", tne = "⪢̸", nne = "⪡̸", rne = "∌", one = "∌", sne = "⋾", ine = "⋽", ane = "⊀", cne = "⪯̸", lne = "⋠", une = "∌", dne = "⧐̸", fne = "⋫", pne = "⋭", hne = "⊏̸", gne = "⋢", mne = "⊐̸", vne = "⋣", _ne = "⊂⃒", bne = "⊈", yne = "⊁", wne = "⪰̸", kne = "⋡", xne = "≿̸", Cne = "⊃⃒", Sne = "⊉", Ene = "≁", Ane = "≄", $ne = "≇", Mne = "≉", Ine = "∤", Tne = "∦", Lne = "∦", One = "⫽⃥", Rne = "∂̸", Pne = "⨔", Bne = "⊀", zne = "⋠", Dne = "⊀", Nne = "⪯̸", qne = "⪯̸", Fne = "⤳̸", Hne = "↛", jne = "⇏", Vne = "↝̸", Une = "↛", Zne = "⇏", Wne = "⋫", Gne = "⋭", Kne = "⊁", Xne = "⋡", Yne = "⪰̸", Jne = "𝒩", Qne = "𝓃", ere = "∤", tre = "∦", nre = "≁", rre = "≄", ore = "≄", sre = "∤", ire = "∦", are = "⋢", cre = "⋣", lre = "⊄", ure = "⫅̸", dre = "⊈", fre = "⊂⃒", pre = "⊈", hre = "⫅̸", gre = "⊁", mre = "⪰̸", vre = "⊅", _re = "⫆̸", bre = "⊉", yre = "⊃⃒", wre = "⊉", kre = "⫆̸", xre = "≹", Cre = "Ñ", Sre = "ñ", Ere = "≸", Are = "⋪", $re = "⋬", Mre = "⋫", Ire = "⋭", Tre = "Ν", Lre = "ν", Ore = "#", Rre = "№", Pre = " ", Bre = "≍⃒", zre = "⊬", Dre = "⊭", Nre = "⊮", qre = "⊯", Fre = "≥⃒", Hre = ">⃒", jre = "⤄", Vre = "⧞", Ure = "⤂", Zre = "≤⃒", Wre = "<⃒", Gre = "⊴⃒", Kre = "⤃", Xre = "⊵⃒", Yre = "∼⃒", Jre = "⤣", Qre = "↖", eoe = "⇖", toe = "↖", noe = "⤧", roe = "Ó", ooe = "ó", soe = "⊛", ioe = "Ô", aoe = "ô", coe = "⊚", loe = "О", uoe = "о", doe = "⊝", foe = "Ő", poe = "ő", hoe = "⨸", goe = "⊙", moe = "⦼", voe = "Œ", _oe = "œ", boe = "⦿", yoe = "𝔒", woe = "𝔬", koe = "˛", xoe = "Ò", Coe = "ò", Soe = "⧁", Eoe = "⦵", Aoe = "Ω", $oe = "∮", Moe = "↺", Ioe = "⦾", Toe = "⦻", Loe = "‾", Ooe = "⧀", Roe = "Ō", Poe = "ō", Boe = "Ω", zoe = "ω", Doe = "Ο", Noe = "ο", qoe = "⦶", Foe = "⊖", Hoe = "𝕆", joe = "𝕠", Voe = "⦷", Uoe = "“", Zoe = "‘", Woe = "⦹", Goe = "⊕", Koe = "↻", Xoe = "⩔", Yoe = "∨", Joe = "⩝", Qoe = "ℴ", ese = "ℴ", tse = "ª", nse = "º", rse = "⊶", ose = "⩖", sse = "⩗", ise = "⩛", ase = "Ⓢ", cse = "𝒪", lse = "ℴ", use = "Ø", dse = "ø", fse = "⊘", pse = "Õ", hse = "õ", gse = "⨶", mse = "⨷", vse = "⊗", _se = "Ö", bse = "ö", yse = "⌽", wse = "‾", kse = "⏞", xse = "⎴", Cse = "⏜", Sse = "¶", Ese = "∥", Ase = "∥", $se = "⫳", Mse = "⫽", Ise = "∂", Tse = "∂", Lse = "П", Ose = "п", Rse = "%", Pse = ".", Bse = "‰", zse = "⊥", Dse = "‱", Nse = "𝔓", qse = "𝔭", Fse = "Φ", Hse = "φ", jse = "ϕ", Vse = "ℳ", Use = "☎", Zse = "Π", Wse = "π", Gse = "⋔", Kse = "ϖ", Xse = "ℏ", Yse = "ℎ", Jse = "ℏ", Qse = "⨣", eie = "⊞", tie = "⨢", nie = "+", rie = "∔", oie = "⨥", sie = "⩲", iie = "±", aie = "±", cie = "⨦", lie = "⨧", uie = "±", die = "ℌ", fie = "⨕", pie = "𝕡", hie = "ℙ", gie = "£", mie = "⪷", vie = "⪻", _ie = "≺", bie = "≼", yie = "⪷", wie = "≺", kie = "≼", xie = "≺", Cie = "⪯", Sie = "≼", Eie = "≾", Aie = "⪯", $ie = "⪹", Mie = "⪵", Iie = "⋨", Tie = "⪯", Lie = "⪳", Oie = "≾", Rie = "′", Pie = "″", Bie = "ℙ", zie = "⪹", Die = "⪵", Nie = "⋨", qie = "∏", Fie = "∏", Hie = "⌮", jie = "⌒", Vie = "⌓", Uie = "∝", Zie = "∝", Wie = "∷", Gie = "∝", Kie = "≾", Xie = "⊰", Yie = "𝒫", Jie = "𝓅", Qie = "Ψ", eae = "ψ", tae = " ", nae = "𝔔", rae = "𝔮", oae = "⨌", sae = "𝕢", iae = "ℚ", aae = "⁗", cae = "𝒬", lae = "𝓆", uae = "ℍ", dae = "⨖", fae = "?", pae = "≟", hae = '"', gae = '"', mae = "⇛", vae = "∽̱", _ae = "Ŕ", bae = "ŕ", yae = "√", wae = "⦳", kae = "⟩", xae = "⟫", Cae = "⦒", Sae = "⦥", Eae = "⟩", Aae = "»", $ae = "⥵", Mae = "⇥", Iae = "⤠", Tae = "⤳", Lae = "→", Oae = "↠", Rae = "⇒", Pae = "⤞", Bae = "↪", zae = "↬", Dae = "⥅", Nae = "⥴", qae = "⤖", Fae = "↣", Hae = "↝", jae = "⤚", Vae = "⤜", Uae = "∶", Zae = "ℚ", Wae = "⤍", Gae = "⤏", Kae = "⤐", Xae = "❳", Yae = "}", Jae = "]", Qae = "⦌", ece = "⦎", tce = "⦐", nce = "Ř", rce = "ř", oce = "Ŗ", sce = "ŗ", ice = "⌉", ace = "}", cce = "Р", lce = "р", uce = "⤷", dce = "⥩", fce = "”", pce = "”", hce = "↳", gce = "ℜ", mce = "ℛ", vce = "ℜ", _ce = "ℝ", bce = "ℜ", yce = "▭", wce = "®", kce = "®", xce = "∋", Cce = "⇋", Sce = "⥯", Ece = "⥽", Ace = "⌋", $ce = "𝔯", Mce = "ℜ", Ice = "⥤", Tce = "⇁", Lce = "⇀", Oce = "⥬", Rce = "Ρ", Pce = "ρ", Bce = "ϱ", zce = "⟩", Dce = "⇥", Nce = "→", qce = "→", Fce = "⇒", Hce = "⇄", jce = "↣", Vce = "⌉", Uce = "⟧", Zce = "⥝", Wce = "⥕", Gce = "⇂", Kce = "⌋", Xce = "⇁", Yce = "⇀", Jce = "⇄", Qce = "⇌", ele = "⇉", tle = "↝", nle = "↦", rle = "⊢", ole = "⥛", sle = "⋌", ile = "⧐", ale = "⊳", cle = "⊵", lle = "⥏", ule = "⥜", dle = "⥔", fle = "↾", ple = "⥓", hle = "⇀", gle = "˚", mle = "≓", vle = "⇄", _le = "⇌", ble = "‏", yle = "⎱", wle = "⎱", kle = "⫮", xle = "⟭", Cle = "⇾", Sle = "⟧", Ele = "⦆", Ale = "𝕣", $le = "ℝ", Mle = "⨮", Ile = "⨵", Tle = "⥰", Lle = ")", Ole = "⦔", Rle = "⨒", Ple = "⇉", Ble = "⇛", zle = "›", Dle = "𝓇", Nle = "ℛ", qle = "↱", Fle = "↱", Hle = "]", jle = "’", Vle = "’", Ule = "⋌", Zle = "⋊", Wle = "▹", Gle = "⊵", Kle = "▸", Xle = "⧎", Yle = "⧴", Jle = "⥨", Qle = "℞", eue = "Ś", tue = "ś", nue = "‚", rue = "⪸", oue = "Š", sue = "š", iue = "⪼", aue = "≻", cue = "≽", lue = "⪰", uue = "⪴", due = "Ş", fue = "ş", pue = "Ŝ", hue = "ŝ", gue = "⪺", mue = "⪶", vue = "⋩", _ue = "⨓", bue = "≿", yue = "С", wue = "с", kue = "⊡", xue = "⋅", Cue = "⩦", Sue = "⤥", Eue = "↘", Aue = "⇘", $ue = "↘", Mue = "§", Iue = ";", Tue = "⤩", Lue = "∖", Oue = "∖", Rue = "✶", Pue = "𝔖", Bue = "𝔰", zue = "⌢", Due = "♯", Nue = "Щ", que = "щ", Fue = "Ш", Hue = "ш", jue = "↓", Vue = "←", Uue = "∣", Zue = "∥", Wue = "→", Gue = "↑", Kue = "­", Xue = "Σ", Yue = "σ", Jue = "ς", Que = "ς", ede = "∼", tde = "⩪", nde = "≃", rde = "≃", ode = "⪞", sde = "⪠", ide = "⪝", ade = "⪟", cde = "≆", lde = "⨤", ude = "⥲", dde = "←", fde = "∘", pde = "∖", hde = "⨳", gde = "⧤", mde = "∣", vde = "⌣", _de = "⪪", bde = "⪬", yde = "⪬︀", wde = "Ь", kde = "ь", xde = "⌿", Cde = "⧄", Sde = "/", Ede = "𝕊", Ade = "𝕤", $de = "♠", Mde = "♠", Ide = "∥", Tde = "⊓", Lde = "⊓︀", Ode = "⊔", Rde = "⊔︀", Pde = "√", Bde = "⊏", zde = "⊑", Dde = "⊏", Nde = "⊑", qde = "⊐", Fde = "⊒", Hde = "⊐", jde = "⊒", Vde = "□", Ude = "□", Zde = "⊓", Wde = "⊏", Gde = "⊑", Kde = "⊐", Xde = "⊒", Yde = "⊔", Jde = "▪", Qde = "□", efe = "▪", tfe = "→", nfe = "𝒮", rfe = "𝓈", ofe = "∖", sfe = "⌣", ife = "⋆", afe = "⋆", cfe = "☆", lfe = "★", ufe = "ϵ", dfe = "ϕ", ffe = "¯", pfe = "⊂", hfe = "⋐", gfe = "⪽", mfe = "⫅", vfe = "⊆", _fe = "⫃", bfe = "⫁", yfe = "⫋", wfe = "⊊", kfe = "⪿", xfe = "⥹", Cfe = "⊂", Sfe = "⋐", Efe = "⊆", Afe = "⫅", $fe = "⊆", Mfe = "⊊", Ife = "⫋", Tfe = "⫇", Lfe = "⫕", Ofe = "⫓", Rfe = "⪸", Pfe = "≻", Bfe = "≽", zfe = "≻", Dfe = "⪰", Nfe = "≽", qfe = "≿", Ffe = "⪰", Hfe = "⪺", jfe = "⪶", Vfe = "⋩", Ufe = "≿", Zfe = "∋", Wfe = "∑", Gfe = "∑", Kfe = "♪", Xfe = "¹", Yfe = "²", Jfe = "³", Qfe = "⊃", e0e = "⋑", t0e = "⪾", n0e = "⫘", r0e = "⫆", o0e = "⊇", s0e = "⫄", i0e = "⊃", a0e = "⊇", c0e = "⟉", l0e = "⫗", u0e = "⥻", d0e = "⫂", f0e = "⫌", p0e = "⊋", h0e = "⫀", g0e = "⊃", m0e = "⋑", v0e = "⊇", _0e = "⫆", b0e = "⊋", y0e = "⫌", w0e = "⫈", k0e = "⫔", x0e = "⫖", C0e = "⤦", S0e = "↙", E0e = "⇙", A0e = "↙", $0e = "⤪", M0e = "ß", I0e = "	", T0e = "⌖", L0e = "Τ", O0e = "τ", R0e = "⎴", P0e = "Ť", B0e = "ť", z0e = "Ţ", D0e = "ţ", N0e = "Т", q0e = "т", F0e = "⃛", H0e = "⌕", j0e = "𝔗", V0e = "𝔱", U0e = "∴", Z0e = "∴", W0e = "∴", G0e = "Θ", K0e = "θ", X0e = "ϑ", Y0e = "ϑ", J0e = "≈", Q0e = "∼", epe = "  ", tpe = " ", npe = " ", rpe = "≈", ope = "∼", spe = "Þ", ipe = "þ", ape = "˜", cpe = "∼", lpe = "≃", upe = "≅", dpe = "≈", fpe = "⨱", ppe = "⊠", hpe = "×", gpe = "⨰", mpe = "∭", vpe = "⤨", _pe = "⌶", bpe = "⫱", ype = "⊤", wpe = "𝕋", kpe = "𝕥", xpe = "⫚", Cpe = "⤩", Spe = "‴", Epe = "™", Ape = "™", $pe = "▵", Mpe = "▿", Ipe = "◃", Tpe = "⊴", Lpe = "≜", Ope = "▹", Rpe = "⊵", Ppe = "◬", Bpe = "≜", zpe = "⨺", Dpe = "⃛", Npe = "⨹", qpe = "⧍", Fpe = "⨻", Hpe = "⏢", jpe = "𝒯", Vpe = "𝓉", Upe = "Ц", Zpe = "ц", Wpe = "Ћ", Gpe = "ћ", Kpe = "Ŧ", Xpe = "ŧ", Ype = "≬", Jpe = "↞", Qpe = "↠", ehe = "Ú", the = "ú", nhe = "↑", rhe = "↟", ohe = "⇑", she = "⥉", ihe = "Ў", ahe = "ў", che = "Ŭ", lhe = "ŭ", uhe = "Û", dhe = "û", fhe = "У", phe = "у", hhe = "⇅", ghe = "Ű", mhe = "ű", vhe = "⥮", _he = "⥾", bhe = "𝔘", yhe = "𝔲", whe = "Ù", khe = "ù", xhe = "⥣", Che = "↿", She = "↾", Ehe = "▀", Ahe = "⌜", $he = "⌜", Mhe = "⌏", Ihe = "◸", The = "Ū", Lhe = "ū", Ohe = "¨", Rhe = "_", Phe = "⏟", Bhe = "⎵", zhe = "⏝", Dhe = "⋃", Nhe = "⊎", qhe = "Ų", Fhe = "ų", Hhe = "𝕌", jhe = "𝕦", Vhe = "⤒", Uhe = "↑", Zhe = "↑", Whe = "⇑", Ghe = "⇅", Khe = "↕", Xhe = "↕", Yhe = "⇕", Jhe = "⥮", Qhe = "↿", e2e = "↾", t2e = "⊎", n2e = "↖", r2e = "↗", o2e = "υ", s2e = "ϒ", i2e = "ϒ", a2e = "Υ", c2e = "υ", l2e = "↥", u2e = "⊥", d2e = "⇈", f2e = "⌝", p2e = "⌝", h2e = "⌎", g2e = "Ů", m2e = "ů", v2e = "◹", _2e = "𝒰", b2e = "𝓊", y2e = "⋰", w2e = "Ũ", k2e = "ũ", x2e = "▵", C2e = "▴", S2e = "⇈", E2e = "Ü", A2e = "ü", $2e = "⦧", M2e = "⦜", I2e = "ϵ", T2e = "ϰ", L2e = "∅", O2e = "ϕ", R2e = "ϖ", P2e = "∝", B2e = "↕", z2e = "⇕", D2e = "ϱ", N2e = "ς", q2e = "⊊︀", F2e = "⫋︀", H2e = "⊋︀", j2e = "⫌︀", V2e = "ϑ", U2e = "⊲", Z2e = "⊳", W2e = "⫨", G2e = "⫫", K2e = "⫩", X2e = "В", Y2e = "в", J2e = "⊢", Q2e = "⊨", e1e = "⊩", t1e = "⊫", n1e = "⫦", r1e = "⊻", o1e = "∨", s1e = "⋁", i1e = "≚", a1e = "⋮", c1e = "|", l1e = "‖", u1e = "|", d1e = "‖", f1e = "∣", p1e = "|", h1e = "❘", g1e = "≀", m1e = " ", v1e = "𝔙", _1e = "𝔳", b1e = "⊲", y1e = "⊂⃒", w1e = "⊃⃒", k1e = "𝕍", x1e = "𝕧", C1e = "∝", S1e = "⊳", E1e = "𝒱", A1e = "𝓋", $1e = "⫋︀", M1e = "⊊︀", I1e = "⫌︀", T1e = "⊋︀", L1e = "⊪", O1e = "⦚", R1e = "Ŵ", P1e = "ŵ", B1e = "⩟", z1e = "∧", D1e = "⋀", N1e = "≙", q1e = "℘", F1e = "𝔚", H1e = "𝔴", j1e = "𝕎", V1e = "𝕨", U1e = "℘", Z1e = "≀", W1e = "≀", G1e = "𝒲", K1e = "𝓌", X1e = "⋂", Y1e = "◯", J1e = "⋃", Q1e = "▽", ege = "𝔛", tge = "𝔵", nge = "⟷", rge = "⟺", oge = "Ξ", sge = "ξ", ige = "⟵", age = "⟸", cge = "⟼", lge = "⋻", uge = "⨀", dge = "𝕏", fge = "𝕩", pge = "⨁", hge = "⨂", gge = "⟶", mge = "⟹", vge = "𝒳", _ge = "𝓍", bge = "⨆", yge = "⨄", wge = "△", kge = "⋁", xge = "⋀", Cge = "Ý", Sge = "ý", Ege = "Я", Age = "я", $ge = "Ŷ", Mge = "ŷ", Ige = "Ы", Tge = "ы", Lge = "¥", Oge = "𝔜", Rge = "𝔶", Pge = "Ї", Bge = "ї", zge = "𝕐", Dge = "𝕪", Nge = "𝒴", qge = "𝓎", Fge = "Ю", Hge = "ю", jge = "ÿ", Vge = "Ÿ", Uge = "Ź", Zge = "ź", Wge = "Ž", Gge = "ž", Kge = "З", Xge = "з", Yge = "Ż", Jge = "ż", Qge = "ℨ", eme = "​", tme = "Ζ", nme = "ζ", rme = "𝔷", ome = "ℨ", sme = "Ж", ime = "ж", ame = "⇝", cme = "𝕫", lme = "ℤ", ume = "𝒵", dme = "𝓏", fme = "‍", pme = "‌", hme = {
  Aacute: YO,
  aacute: JO,
  Abreve: QO,
  abreve: eR,
  ac: tR,
  acd: nR,
  acE: rR,
  Acirc: oR,
  acirc: sR,
  acute: iR,
  Acy: aR,
  acy: cR,
  AElig: lR,
  aelig: uR,
  af: dR,
  Afr: fR,
  afr: pR,
  Agrave: hR,
  agrave: gR,
  alefsym: mR,
  aleph: vR,
  Alpha: _R,
  alpha: bR,
  Amacr: yR,
  amacr: wR,
  amalg: kR,
  amp: xR,
  AMP: CR,
  andand: SR,
  And: ER,
  and: AR,
  andd: $R,
  andslope: MR,
  andv: IR,
  ang: TR,
  ange: LR,
  angle: OR,
  angmsdaa: RR,
  angmsdab: PR,
  angmsdac: BR,
  angmsdad: zR,
  angmsdae: DR,
  angmsdaf: NR,
  angmsdag: qR,
  angmsdah: FR,
  angmsd: HR,
  angrt: jR,
  angrtvb: VR,
  angrtvbd: UR,
  angsph: ZR,
  angst: WR,
  angzarr: GR,
  Aogon: KR,
  aogon: XR,
  Aopf: YR,
  aopf: JR,
  apacir: QR,
  ap: eP,
  apE: tP,
  ape: nP,
  apid: rP,
  apos: oP,
  ApplyFunction: sP,
  approx: iP,
  approxeq: aP,
  Aring: cP,
  aring: lP,
  Ascr: uP,
  ascr: dP,
  Assign: fP,
  ast: pP,
  asymp: hP,
  asympeq: gP,
  Atilde: mP,
  atilde: vP,
  Auml: _P,
  auml: bP,
  awconint: yP,
  awint: wP,
  backcong: kP,
  backepsilon: xP,
  backprime: CP,
  backsim: SP,
  backsimeq: EP,
  Backslash: AP,
  Barv: $P,
  barvee: MP,
  barwed: IP,
  Barwed: TP,
  barwedge: LP,
  bbrk: OP,
  bbrktbrk: RP,
  bcong: PP,
  Bcy: BP,
  bcy: zP,
  bdquo: DP,
  becaus: NP,
  because: qP,
  Because: FP,
  bemptyv: HP,
  bepsi: jP,
  bernou: VP,
  Bernoullis: UP,
  Beta: ZP,
  beta: WP,
  beth: GP,
  between: KP,
  Bfr: XP,
  bfr: YP,
  bigcap: JP,
  bigcirc: QP,
  bigcup: eB,
  bigodot: tB,
  bigoplus: nB,
  bigotimes: rB,
  bigsqcup: oB,
  bigstar: sB,
  bigtriangledown: iB,
  bigtriangleup: aB,
  biguplus: cB,
  bigvee: lB,
  bigwedge: uB,
  bkarow: dB,
  blacklozenge: fB,
  blacksquare: pB,
  blacktriangle: hB,
  blacktriangledown: gB,
  blacktriangleleft: mB,
  blacktriangleright: vB,
  blank: _B,
  blk12: bB,
  blk14: yB,
  blk34: wB,
  block: kB,
  bne: xB,
  bnequiv: CB,
  bNot: SB,
  bnot: EB,
  Bopf: AB,
  bopf: $B,
  bot: MB,
  bottom: IB,
  bowtie: TB,
  boxbox: LB,
  boxdl: OB,
  boxdL: RB,
  boxDl: PB,
  boxDL: BB,
  boxdr: zB,
  boxdR: DB,
  boxDr: NB,
  boxDR: qB,
  boxh: FB,
  boxH: HB,
  boxhd: jB,
  boxHd: VB,
  boxhD: UB,
  boxHD: ZB,
  boxhu: WB,
  boxHu: GB,
  boxhU: KB,
  boxHU: XB,
  boxminus: YB,
  boxplus: JB,
  boxtimes: QB,
  boxul: ez,
  boxuL: tz,
  boxUl: nz,
  boxUL: rz,
  boxur: oz,
  boxuR: sz,
  boxUr: iz,
  boxUR: az,
  boxv: cz,
  boxV: lz,
  boxvh: uz,
  boxvH: dz,
  boxVh: fz,
  boxVH: pz,
  boxvl: hz,
  boxvL: gz,
  boxVl: mz,
  boxVL: vz,
  boxvr: _z,
  boxvR: bz,
  boxVr: yz,
  boxVR: wz,
  bprime: kz,
  breve: xz,
  Breve: Cz,
  brvbar: Sz,
  bscr: Ez,
  Bscr: Az,
  bsemi: $z,
  bsim: Mz,
  bsime: Iz,
  bsolb: Tz,
  bsol: Lz,
  bsolhsub: Oz,
  bull: Rz,
  bullet: Pz,
  bump: Bz,
  bumpE: zz,
  bumpe: Dz,
  Bumpeq: Nz,
  bumpeq: qz,
  Cacute: Fz,
  cacute: Hz,
  capand: jz,
  capbrcup: Vz,
  capcap: Uz,
  cap: Zz,
  Cap: Wz,
  capcup: Gz,
  capdot: Kz,
  CapitalDifferentialD: Xz,
  caps: Yz,
  caret: Jz,
  caron: Qz,
  Cayleys: eD,
  ccaps: tD,
  Ccaron: nD,
  ccaron: rD,
  Ccedil: oD,
  ccedil: sD,
  Ccirc: iD,
  ccirc: aD,
  Cconint: cD,
  ccups: lD,
  ccupssm: uD,
  Cdot: dD,
  cdot: fD,
  cedil: pD,
  Cedilla: hD,
  cemptyv: gD,
  cent: mD,
  centerdot: vD,
  CenterDot: _D,
  cfr: bD,
  Cfr: yD,
  CHcy: wD,
  chcy: kD,
  check: xD,
  checkmark: CD,
  Chi: SD,
  chi: ED,
  circ: AD,
  circeq: $D,
  circlearrowleft: MD,
  circlearrowright: ID,
  circledast: TD,
  circledcirc: LD,
  circleddash: OD,
  CircleDot: RD,
  circledR: PD,
  circledS: BD,
  CircleMinus: zD,
  CirclePlus: DD,
  CircleTimes: ND,
  cir: qD,
  cirE: FD,
  cire: HD,
  cirfnint: jD,
  cirmid: VD,
  cirscir: UD,
  ClockwiseContourIntegral: ZD,
  CloseCurlyDoubleQuote: WD,
  CloseCurlyQuote: GD,
  clubs: KD,
  clubsuit: XD,
  colon: YD,
  Colon: JD,
  Colone: QD,
  colone: eN,
  coloneq: tN,
  comma: nN,
  commat: rN,
  comp: oN,
  compfn: sN,
  complement: iN,
  complexes: aN,
  cong: cN,
  congdot: lN,
  Congruent: uN,
  conint: dN,
  Conint: fN,
  ContourIntegral: pN,
  copf: hN,
  Copf: gN,
  coprod: mN,
  Coproduct: vN,
  copy: _N,
  COPY: bN,
  copysr: yN,
  CounterClockwiseContourIntegral: wN,
  crarr: kN,
  cross: xN,
  Cross: CN,
  Cscr: SN,
  cscr: EN,
  csub: AN,
  csube: $N,
  csup: MN,
  csupe: IN,
  ctdot: TN,
  cudarrl: LN,
  cudarrr: ON,
  cuepr: RN,
  cuesc: PN,
  cularr: BN,
  cularrp: zN,
  cupbrcap: DN,
  cupcap: NN,
  CupCap: qN,
  cup: FN,
  Cup: HN,
  cupcup: jN,
  cupdot: VN,
  cupor: UN,
  cups: ZN,
  curarr: WN,
  curarrm: GN,
  curlyeqprec: KN,
  curlyeqsucc: XN,
  curlyvee: YN,
  curlywedge: JN,
  curren: QN,
  curvearrowleft: eq,
  curvearrowright: tq,
  cuvee: nq,
  cuwed: rq,
  cwconint: oq,
  cwint: sq,
  cylcty: iq,
  dagger: aq,
  Dagger: cq,
  daleth: lq,
  darr: uq,
  Darr: dq,
  dArr: fq,
  dash: pq,
  Dashv: hq,
  dashv: gq,
  dbkarow: mq,
  dblac: vq,
  Dcaron: _q,
  dcaron: bq,
  Dcy: yq,
  dcy: wq,
  ddagger: kq,
  ddarr: xq,
  DD: Cq,
  dd: Sq,
  DDotrahd: Eq,
  ddotseq: Aq,
  deg: $q,
  Del: Mq,
  Delta: Iq,
  delta: Tq,
  demptyv: Lq,
  dfisht: Oq,
  Dfr: Rq,
  dfr: Pq,
  dHar: Bq,
  dharl: zq,
  dharr: Dq,
  DiacriticalAcute: Nq,
  DiacriticalDot: qq,
  DiacriticalDoubleAcute: Fq,
  DiacriticalGrave: Hq,
  DiacriticalTilde: jq,
  diam: Vq,
  diamond: Uq,
  Diamond: Zq,
  diamondsuit: Wq,
  diams: Gq,
  die: Kq,
  DifferentialD: Xq,
  digamma: Yq,
  disin: Jq,
  div: Qq,
  divide: eF,
  divideontimes: tF,
  divonx: nF,
  DJcy: rF,
  djcy: oF,
  dlcorn: sF,
  dlcrop: iF,
  dollar: aF,
  Dopf: cF,
  dopf: lF,
  Dot: uF,
  dot: dF,
  DotDot: fF,
  doteq: pF,
  doteqdot: hF,
  DotEqual: gF,
  dotminus: mF,
  dotplus: vF,
  dotsquare: _F,
  doublebarwedge: bF,
  DoubleContourIntegral: yF,
  DoubleDot: wF,
  DoubleDownArrow: kF,
  DoubleLeftArrow: xF,
  DoubleLeftRightArrow: CF,
  DoubleLeftTee: SF,
  DoubleLongLeftArrow: EF,
  DoubleLongLeftRightArrow: AF,
  DoubleLongRightArrow: $F,
  DoubleRightArrow: MF,
  DoubleRightTee: IF,
  DoubleUpArrow: TF,
  DoubleUpDownArrow: LF,
  DoubleVerticalBar: OF,
  DownArrowBar: RF,
  downarrow: PF,
  DownArrow: BF,
  Downarrow: zF,
  DownArrowUpArrow: DF,
  DownBreve: NF,
  downdownarrows: qF,
  downharpoonleft: FF,
  downharpoonright: HF,
  DownLeftRightVector: jF,
  DownLeftTeeVector: VF,
  DownLeftVectorBar: UF,
  DownLeftVector: ZF,
  DownRightTeeVector: WF,
  DownRightVectorBar: GF,
  DownRightVector: KF,
  DownTeeArrow: XF,
  DownTee: YF,
  drbkarow: JF,
  drcorn: QF,
  drcrop: eH,
  Dscr: tH,
  dscr: nH,
  DScy: rH,
  dscy: oH,
  dsol: sH,
  Dstrok: iH,
  dstrok: aH,
  dtdot: cH,
  dtri: lH,
  dtrif: uH,
  duarr: dH,
  duhar: fH,
  dwangle: pH,
  DZcy: hH,
  dzcy: gH,
  dzigrarr: mH,
  Eacute: vH,
  eacute: _H,
  easter: bH,
  Ecaron: yH,
  ecaron: wH,
  Ecirc: kH,
  ecirc: xH,
  ecir: CH,
  ecolon: SH,
  Ecy: EH,
  ecy: AH,
  eDDot: $H,
  Edot: MH,
  edot: IH,
  eDot: TH,
  ee: LH,
  efDot: OH,
  Efr: RH,
  efr: PH,
  eg: BH,
  Egrave: zH,
  egrave: DH,
  egs: NH,
  egsdot: qH,
  el: FH,
  Element: HH,
  elinters: jH,
  ell: VH,
  els: UH,
  elsdot: ZH,
  Emacr: WH,
  emacr: GH,
  empty: KH,
  emptyset: XH,
  EmptySmallSquare: YH,
  emptyv: JH,
  EmptyVerySmallSquare: QH,
  emsp13: ej,
  emsp14: tj,
  emsp: nj,
  ENG: rj,
  eng: oj,
  ensp: sj,
  Eogon: ij,
  eogon: aj,
  Eopf: cj,
  eopf: lj,
  epar: uj,
  eparsl: dj,
  eplus: fj,
  epsi: pj,
  Epsilon: hj,
  epsilon: gj,
  epsiv: mj,
  eqcirc: vj,
  eqcolon: _j,
  eqsim: bj,
  eqslantgtr: yj,
  eqslantless: wj,
  Equal: kj,
  equals: xj,
  EqualTilde: Cj,
  equest: Sj,
  Equilibrium: Ej,
  equiv: Aj,
  equivDD: $j,
  eqvparsl: Mj,
  erarr: Ij,
  erDot: Tj,
  escr: Lj,
  Escr: Oj,
  esdot: Rj,
  Esim: Pj,
  esim: Bj,
  Eta: zj,
  eta: Dj,
  ETH: Nj,
  eth: qj,
  Euml: Fj,
  euml: Hj,
  euro: jj,
  excl: Vj,
  exist: Uj,
  Exists: Zj,
  expectation: Wj,
  exponentiale: Gj,
  ExponentialE: Kj,
  fallingdotseq: Xj,
  Fcy: Yj,
  fcy: Jj,
  female: Qj,
  ffilig: eV,
  fflig: tV,
  ffllig: nV,
  Ffr: rV,
  ffr: oV,
  filig: sV,
  FilledSmallSquare: iV,
  FilledVerySmallSquare: aV,
  fjlig: cV,
  flat: lV,
  fllig: uV,
  fltns: dV,
  fnof: fV,
  Fopf: pV,
  fopf: hV,
  forall: gV,
  ForAll: mV,
  fork: vV,
  forkv: _V,
  Fouriertrf: bV,
  fpartint: yV,
  frac12: wV,
  frac13: kV,
  frac14: xV,
  frac15: CV,
  frac16: SV,
  frac18: EV,
  frac23: AV,
  frac25: $V,
  frac34: MV,
  frac35: IV,
  frac38: TV,
  frac45: LV,
  frac56: OV,
  frac58: RV,
  frac78: PV,
  frasl: BV,
  frown: zV,
  fscr: DV,
  Fscr: NV,
  gacute: qV,
  Gamma: FV,
  gamma: HV,
  Gammad: jV,
  gammad: VV,
  gap: UV,
  Gbreve: ZV,
  gbreve: WV,
  Gcedil: GV,
  Gcirc: KV,
  gcirc: XV,
  Gcy: YV,
  gcy: JV,
  Gdot: QV,
  gdot: eU,
  ge: tU,
  gE: nU,
  gEl: rU,
  gel: oU,
  geq: sU,
  geqq: iU,
  geqslant: aU,
  gescc: cU,
  ges: lU,
  gesdot: uU,
  gesdoto: dU,
  gesdotol: fU,
  gesl: pU,
  gesles: hU,
  Gfr: gU,
  gfr: mU,
  gg: vU,
  Gg: _U,
  ggg: bU,
  gimel: yU,
  GJcy: wU,
  gjcy: kU,
  gla: xU,
  gl: CU,
  glE: SU,
  glj: EU,
  gnap: AU,
  gnapprox: $U,
  gne: MU,
  gnE: IU,
  gneq: TU,
  gneqq: LU,
  gnsim: OU,
  Gopf: RU,
  gopf: PU,
  grave: BU,
  GreaterEqual: zU,
  GreaterEqualLess: DU,
  GreaterFullEqual: NU,
  GreaterGreater: qU,
  GreaterLess: FU,
  GreaterSlantEqual: HU,
  GreaterTilde: jU,
  Gscr: VU,
  gscr: UU,
  gsim: ZU,
  gsime: WU,
  gsiml: GU,
  gtcc: KU,
  gtcir: XU,
  gt: YU,
  GT: JU,
  Gt: QU,
  gtdot: eZ,
  gtlPar: tZ,
  gtquest: nZ,
  gtrapprox: rZ,
  gtrarr: oZ,
  gtrdot: sZ,
  gtreqless: iZ,
  gtreqqless: aZ,
  gtrless: cZ,
  gtrsim: lZ,
  gvertneqq: uZ,
  gvnE: dZ,
  Hacek: fZ,
  hairsp: pZ,
  half: hZ,
  hamilt: gZ,
  HARDcy: mZ,
  hardcy: vZ,
  harrcir: _Z,
  harr: bZ,
  hArr: yZ,
  harrw: wZ,
  Hat: kZ,
  hbar: xZ,
  Hcirc: CZ,
  hcirc: SZ,
  hearts: EZ,
  heartsuit: AZ,
  hellip: $Z,
  hercon: MZ,
  hfr: IZ,
  Hfr: TZ,
  HilbertSpace: LZ,
  hksearow: OZ,
  hkswarow: RZ,
  hoarr: PZ,
  homtht: BZ,
  hookleftarrow: zZ,
  hookrightarrow: DZ,
  hopf: NZ,
  Hopf: qZ,
  horbar: FZ,
  HorizontalLine: HZ,
  hscr: jZ,
  Hscr: VZ,
  hslash: UZ,
  Hstrok: ZZ,
  hstrok: WZ,
  HumpDownHump: GZ,
  HumpEqual: KZ,
  hybull: XZ,
  hyphen: YZ,
  Iacute: JZ,
  iacute: QZ,
  ic: eW,
  Icirc: tW,
  icirc: nW,
  Icy: rW,
  icy: oW,
  Idot: sW,
  IEcy: iW,
  iecy: aW,
  iexcl: cW,
  iff: lW,
  ifr: uW,
  Ifr: dW,
  Igrave: fW,
  igrave: pW,
  ii: hW,
  iiiint: gW,
  iiint: mW,
  iinfin: vW,
  iiota: _W,
  IJlig: bW,
  ijlig: yW,
  Imacr: wW,
  imacr: kW,
  image: xW,
  ImaginaryI: CW,
  imagline: SW,
  imagpart: EW,
  imath: AW,
  Im: $W,
  imof: MW,
  imped: IW,
  Implies: TW,
  incare: LW,
  in: "∈",
  infin: OW,
  infintie: RW,
  inodot: PW,
  intcal: BW,
  int: zW,
  Int: DW,
  integers: NW,
  Integral: qW,
  intercal: FW,
  Intersection: HW,
  intlarhk: jW,
  intprod: VW,
  InvisibleComma: UW,
  InvisibleTimes: ZW,
  IOcy: WW,
  iocy: GW,
  Iogon: KW,
  iogon: XW,
  Iopf: YW,
  iopf: JW,
  Iota: QW,
  iota: eG,
  iprod: tG,
  iquest: nG,
  iscr: rG,
  Iscr: oG,
  isin: sG,
  isindot: iG,
  isinE: aG,
  isins: cG,
  isinsv: lG,
  isinv: uG,
  it: dG,
  Itilde: fG,
  itilde: pG,
  Iukcy: hG,
  iukcy: gG,
  Iuml: mG,
  iuml: vG,
  Jcirc: _G,
  jcirc: bG,
  Jcy: yG,
  jcy: wG,
  Jfr: kG,
  jfr: xG,
  jmath: CG,
  Jopf: SG,
  jopf: EG,
  Jscr: AG,
  jscr: $G,
  Jsercy: MG,
  jsercy: IG,
  Jukcy: TG,
  jukcy: LG,
  Kappa: OG,
  kappa: RG,
  kappav: PG,
  Kcedil: BG,
  kcedil: zG,
  Kcy: DG,
  kcy: NG,
  Kfr: qG,
  kfr: FG,
  kgreen: HG,
  KHcy: jG,
  khcy: VG,
  KJcy: UG,
  kjcy: ZG,
  Kopf: WG,
  kopf: GG,
  Kscr: KG,
  kscr: XG,
  lAarr: YG,
  Lacute: JG,
  lacute: QG,
  laemptyv: eK,
  lagran: tK,
  Lambda: nK,
  lambda: rK,
  lang: oK,
  Lang: sK,
  langd: iK,
  langle: aK,
  lap: cK,
  Laplacetrf: lK,
  laquo: uK,
  larrb: dK,
  larrbfs: fK,
  larr: pK,
  Larr: hK,
  lArr: gK,
  larrfs: mK,
  larrhk: vK,
  larrlp: _K,
  larrpl: bK,
  larrsim: yK,
  larrtl: wK,
  latail: kK,
  lAtail: xK,
  lat: CK,
  late: SK,
  lates: EK,
  lbarr: AK,
  lBarr: $K,
  lbbrk: MK,
  lbrace: IK,
  lbrack: TK,
  lbrke: LK,
  lbrksld: OK,
  lbrkslu: RK,
  Lcaron: PK,
  lcaron: BK,
  Lcedil: zK,
  lcedil: DK,
  lceil: NK,
  lcub: qK,
  Lcy: FK,
  lcy: HK,
  ldca: jK,
  ldquo: VK,
  ldquor: UK,
  ldrdhar: ZK,
  ldrushar: WK,
  ldsh: GK,
  le: KK,
  lE: XK,
  LeftAngleBracket: YK,
  LeftArrowBar: JK,
  leftarrow: QK,
  LeftArrow: eX,
  Leftarrow: tX,
  LeftArrowRightArrow: nX,
  leftarrowtail: rX,
  LeftCeiling: oX,
  LeftDoubleBracket: sX,
  LeftDownTeeVector: iX,
  LeftDownVectorBar: aX,
  LeftDownVector: cX,
  LeftFloor: lX,
  leftharpoondown: uX,
  leftharpoonup: dX,
  leftleftarrows: fX,
  leftrightarrow: pX,
  LeftRightArrow: hX,
  Leftrightarrow: gX,
  leftrightarrows: mX,
  leftrightharpoons: vX,
  leftrightsquigarrow: _X,
  LeftRightVector: bX,
  LeftTeeArrow: yX,
  LeftTee: wX,
  LeftTeeVector: kX,
  leftthreetimes: xX,
  LeftTriangleBar: CX,
  LeftTriangle: SX,
  LeftTriangleEqual: EX,
  LeftUpDownVector: AX,
  LeftUpTeeVector: $X,
  LeftUpVectorBar: MX,
  LeftUpVector: IX,
  LeftVectorBar: TX,
  LeftVector: LX,
  lEg: OX,
  leg: RX,
  leq: PX,
  leqq: BX,
  leqslant: zX,
  lescc: DX,
  les: NX,
  lesdot: qX,
  lesdoto: FX,
  lesdotor: HX,
  lesg: jX,
  lesges: VX,
  lessapprox: UX,
  lessdot: ZX,
  lesseqgtr: WX,
  lesseqqgtr: GX,
  LessEqualGreater: KX,
  LessFullEqual: XX,
  LessGreater: YX,
  lessgtr: JX,
  LessLess: QX,
  lesssim: eY,
  LessSlantEqual: tY,
  LessTilde: nY,
  lfisht: rY,
  lfloor: oY,
  Lfr: sY,
  lfr: iY,
  lg: aY,
  lgE: cY,
  lHar: lY,
  lhard: uY,
  lharu: dY,
  lharul: fY,
  lhblk: pY,
  LJcy: hY,
  ljcy: gY,
  llarr: mY,
  ll: vY,
  Ll: _Y,
  llcorner: bY,
  Lleftarrow: yY,
  llhard: wY,
  lltri: kY,
  Lmidot: xY,
  lmidot: CY,
  lmoustache: SY,
  lmoust: EY,
  lnap: AY,
  lnapprox: $Y,
  lne: MY,
  lnE: IY,
  lneq: TY,
  lneqq: LY,
  lnsim: OY,
  loang: RY,
  loarr: PY,
  lobrk: BY,
  longleftarrow: zY,
  LongLeftArrow: DY,
  Longleftarrow: NY,
  longleftrightarrow: qY,
  LongLeftRightArrow: FY,
  Longleftrightarrow: HY,
  longmapsto: jY,
  longrightarrow: VY,
  LongRightArrow: UY,
  Longrightarrow: ZY,
  looparrowleft: WY,
  looparrowright: GY,
  lopar: KY,
  Lopf: XY,
  lopf: YY,
  loplus: JY,
  lotimes: QY,
  lowast: eJ,
  lowbar: tJ,
  LowerLeftArrow: nJ,
  LowerRightArrow: rJ,
  loz: oJ,
  lozenge: sJ,
  lozf: iJ,
  lpar: aJ,
  lparlt: cJ,
  lrarr: lJ,
  lrcorner: uJ,
  lrhar: dJ,
  lrhard: fJ,
  lrm: pJ,
  lrtri: hJ,
  lsaquo: gJ,
  lscr: mJ,
  Lscr: vJ,
  lsh: _J,
  Lsh: bJ,
  lsim: yJ,
  lsime: wJ,
  lsimg: kJ,
  lsqb: xJ,
  lsquo: CJ,
  lsquor: SJ,
  Lstrok: EJ,
  lstrok: AJ,
  ltcc: $J,
  ltcir: MJ,
  lt: IJ,
  LT: TJ,
  Lt: LJ,
  ltdot: OJ,
  lthree: RJ,
  ltimes: PJ,
  ltlarr: BJ,
  ltquest: zJ,
  ltri: DJ,
  ltrie: NJ,
  ltrif: qJ,
  ltrPar: FJ,
  lurdshar: HJ,
  luruhar: jJ,
  lvertneqq: VJ,
  lvnE: UJ,
  macr: ZJ,
  male: WJ,
  malt: GJ,
  maltese: KJ,
  Map: "⤅",
  map: XJ,
  mapsto: YJ,
  mapstodown: JJ,
  mapstoleft: QJ,
  mapstoup: eQ,
  marker: tQ,
  mcomma: nQ,
  Mcy: rQ,
  mcy: oQ,
  mdash: sQ,
  mDDot: iQ,
  measuredangle: aQ,
  MediumSpace: cQ,
  Mellintrf: lQ,
  Mfr: uQ,
  mfr: dQ,
  mho: fQ,
  micro: pQ,
  midast: hQ,
  midcir: gQ,
  mid: mQ,
  middot: vQ,
  minusb: _Q,
  minus: bQ,
  minusd: yQ,
  minusdu: wQ,
  MinusPlus: kQ,
  mlcp: xQ,
  mldr: CQ,
  mnplus: SQ,
  models: EQ,
  Mopf: AQ,
  mopf: $Q,
  mp: MQ,
  mscr: IQ,
  Mscr: TQ,
  mstpos: LQ,
  Mu: OQ,
  mu: RQ,
  multimap: PQ,
  mumap: BQ,
  nabla: zQ,
  Nacute: DQ,
  nacute: NQ,
  nang: qQ,
  nap: FQ,
  napE: HQ,
  napid: jQ,
  napos: VQ,
  napprox: UQ,
  natural: ZQ,
  naturals: WQ,
  natur: GQ,
  nbsp: KQ,
  nbump: XQ,
  nbumpe: YQ,
  ncap: JQ,
  Ncaron: QQ,
  ncaron: eee,
  Ncedil: tee,
  ncedil: nee,
  ncong: ree,
  ncongdot: oee,
  ncup: see,
  Ncy: iee,
  ncy: aee,
  ndash: cee,
  nearhk: lee,
  nearr: uee,
  neArr: dee,
  nearrow: fee,
  ne: pee,
  nedot: hee,
  NegativeMediumSpace: gee,
  NegativeThickSpace: mee,
  NegativeThinSpace: vee,
  NegativeVeryThinSpace: _ee,
  nequiv: bee,
  nesear: yee,
  nesim: wee,
  NestedGreaterGreater: kee,
  NestedLessLess: xee,
  NewLine: Cee,
  nexist: See,
  nexists: Eee,
  Nfr: Aee,
  nfr: $ee,
  ngE: Mee,
  nge: Iee,
  ngeq: Tee,
  ngeqq: Lee,
  ngeqslant: Oee,
  nges: Ree,
  nGg: Pee,
  ngsim: Bee,
  nGt: zee,
  ngt: Dee,
  ngtr: Nee,
  nGtv: qee,
  nharr: Fee,
  nhArr: Hee,
  nhpar: jee,
  ni: Vee,
  nis: Uee,
  nisd: Zee,
  niv: Wee,
  NJcy: Gee,
  njcy: Kee,
  nlarr: Xee,
  nlArr: Yee,
  nldr: Jee,
  nlE: Qee,
  nle: ete,
  nleftarrow: tte,
  nLeftarrow: nte,
  nleftrightarrow: rte,
  nLeftrightarrow: ote,
  nleq: ste,
  nleqq: ite,
  nleqslant: ate,
  nles: cte,
  nless: lte,
  nLl: ute,
  nlsim: dte,
  nLt: fte,
  nlt: pte,
  nltri: hte,
  nltrie: gte,
  nLtv: mte,
  nmid: vte,
  NoBreak: _te,
  NonBreakingSpace: bte,
  nopf: yte,
  Nopf: wte,
  Not: kte,
  not: xte,
  NotCongruent: Cte,
  NotCupCap: Ste,
  NotDoubleVerticalBar: Ete,
  NotElement: Ate,
  NotEqual: $te,
  NotEqualTilde: Mte,
  NotExists: Ite,
  NotGreater: Tte,
  NotGreaterEqual: Lte,
  NotGreaterFullEqual: Ote,
  NotGreaterGreater: Rte,
  NotGreaterLess: Pte,
  NotGreaterSlantEqual: Bte,
  NotGreaterTilde: zte,
  NotHumpDownHump: Dte,
  NotHumpEqual: Nte,
  notin: qte,
  notindot: Fte,
  notinE: Hte,
  notinva: jte,
  notinvb: Vte,
  notinvc: Ute,
  NotLeftTriangleBar: Zte,
  NotLeftTriangle: Wte,
  NotLeftTriangleEqual: Gte,
  NotLess: Kte,
  NotLessEqual: Xte,
  NotLessGreater: Yte,
  NotLessLess: Jte,
  NotLessSlantEqual: Qte,
  NotLessTilde: ene,
  NotNestedGreaterGreater: tne,
  NotNestedLessLess: nne,
  notni: rne,
  notniva: one,
  notnivb: sne,
  notnivc: ine,
  NotPrecedes: ane,
  NotPrecedesEqual: cne,
  NotPrecedesSlantEqual: lne,
  NotReverseElement: une,
  NotRightTriangleBar: dne,
  NotRightTriangle: fne,
  NotRightTriangleEqual: pne,
  NotSquareSubset: hne,
  NotSquareSubsetEqual: gne,
  NotSquareSuperset: mne,
  NotSquareSupersetEqual: vne,
  NotSubset: _ne,
  NotSubsetEqual: bne,
  NotSucceeds: yne,
  NotSucceedsEqual: wne,
  NotSucceedsSlantEqual: kne,
  NotSucceedsTilde: xne,
  NotSuperset: Cne,
  NotSupersetEqual: Sne,
  NotTilde: Ene,
  NotTildeEqual: Ane,
  NotTildeFullEqual: $ne,
  NotTildeTilde: Mne,
  NotVerticalBar: Ine,
  nparallel: Tne,
  npar: Lne,
  nparsl: One,
  npart: Rne,
  npolint: Pne,
  npr: Bne,
  nprcue: zne,
  nprec: Dne,
  npreceq: Nne,
  npre: qne,
  nrarrc: Fne,
  nrarr: Hne,
  nrArr: jne,
  nrarrw: Vne,
  nrightarrow: Une,
  nRightarrow: Zne,
  nrtri: Wne,
  nrtrie: Gne,
  nsc: Kne,
  nsccue: Xne,
  nsce: Yne,
  Nscr: Jne,
  nscr: Qne,
  nshortmid: ere,
  nshortparallel: tre,
  nsim: nre,
  nsime: rre,
  nsimeq: ore,
  nsmid: sre,
  nspar: ire,
  nsqsube: are,
  nsqsupe: cre,
  nsub: lre,
  nsubE: ure,
  nsube: dre,
  nsubset: fre,
  nsubseteq: pre,
  nsubseteqq: hre,
  nsucc: gre,
  nsucceq: mre,
  nsup: vre,
  nsupE: _re,
  nsupe: bre,
  nsupset: yre,
  nsupseteq: wre,
  nsupseteqq: kre,
  ntgl: xre,
  Ntilde: Cre,
  ntilde: Sre,
  ntlg: Ere,
  ntriangleleft: Are,
  ntrianglelefteq: $re,
  ntriangleright: Mre,
  ntrianglerighteq: Ire,
  Nu: Tre,
  nu: Lre,
  num: Ore,
  numero: Rre,
  numsp: Pre,
  nvap: Bre,
  nvdash: zre,
  nvDash: Dre,
  nVdash: Nre,
  nVDash: qre,
  nvge: Fre,
  nvgt: Hre,
  nvHarr: jre,
  nvinfin: Vre,
  nvlArr: Ure,
  nvle: Zre,
  nvlt: Wre,
  nvltrie: Gre,
  nvrArr: Kre,
  nvrtrie: Xre,
  nvsim: Yre,
  nwarhk: Jre,
  nwarr: Qre,
  nwArr: eoe,
  nwarrow: toe,
  nwnear: noe,
  Oacute: roe,
  oacute: ooe,
  oast: soe,
  Ocirc: ioe,
  ocirc: aoe,
  ocir: coe,
  Ocy: loe,
  ocy: uoe,
  odash: doe,
  Odblac: foe,
  odblac: poe,
  odiv: hoe,
  odot: goe,
  odsold: moe,
  OElig: voe,
  oelig: _oe,
  ofcir: boe,
  Ofr: yoe,
  ofr: woe,
  ogon: koe,
  Ograve: xoe,
  ograve: Coe,
  ogt: Soe,
  ohbar: Eoe,
  ohm: Aoe,
  oint: $oe,
  olarr: Moe,
  olcir: Ioe,
  olcross: Toe,
  oline: Loe,
  olt: Ooe,
  Omacr: Roe,
  omacr: Poe,
  Omega: Boe,
  omega: zoe,
  Omicron: Doe,
  omicron: Noe,
  omid: qoe,
  ominus: Foe,
  Oopf: Hoe,
  oopf: joe,
  opar: Voe,
  OpenCurlyDoubleQuote: Uoe,
  OpenCurlyQuote: Zoe,
  operp: Woe,
  oplus: Goe,
  orarr: Koe,
  Or: Xoe,
  or: Yoe,
  ord: Joe,
  order: Qoe,
  orderof: ese,
  ordf: tse,
  ordm: nse,
  origof: rse,
  oror: ose,
  orslope: sse,
  orv: ise,
  oS: ase,
  Oscr: cse,
  oscr: lse,
  Oslash: use,
  oslash: dse,
  osol: fse,
  Otilde: pse,
  otilde: hse,
  otimesas: gse,
  Otimes: mse,
  otimes: vse,
  Ouml: _se,
  ouml: bse,
  ovbar: yse,
  OverBar: wse,
  OverBrace: kse,
  OverBracket: xse,
  OverParenthesis: Cse,
  para: Sse,
  parallel: Ese,
  par: Ase,
  parsim: $se,
  parsl: Mse,
  part: Ise,
  PartialD: Tse,
  Pcy: Lse,
  pcy: Ose,
  percnt: Rse,
  period: Pse,
  permil: Bse,
  perp: zse,
  pertenk: Dse,
  Pfr: Nse,
  pfr: qse,
  Phi: Fse,
  phi: Hse,
  phiv: jse,
  phmmat: Vse,
  phone: Use,
  Pi: Zse,
  pi: Wse,
  pitchfork: Gse,
  piv: Kse,
  planck: Xse,
  planckh: Yse,
  plankv: Jse,
  plusacir: Qse,
  plusb: eie,
  pluscir: tie,
  plus: nie,
  plusdo: rie,
  plusdu: oie,
  pluse: sie,
  PlusMinus: iie,
  plusmn: aie,
  plussim: cie,
  plustwo: lie,
  pm: uie,
  Poincareplane: die,
  pointint: fie,
  popf: pie,
  Popf: hie,
  pound: gie,
  prap: mie,
  Pr: vie,
  pr: _ie,
  prcue: bie,
  precapprox: yie,
  prec: wie,
  preccurlyeq: kie,
  Precedes: xie,
  PrecedesEqual: Cie,
  PrecedesSlantEqual: Sie,
  PrecedesTilde: Eie,
  preceq: Aie,
  precnapprox: $ie,
  precneqq: Mie,
  precnsim: Iie,
  pre: Tie,
  prE: Lie,
  precsim: Oie,
  prime: Rie,
  Prime: Pie,
  primes: Bie,
  prnap: zie,
  prnE: Die,
  prnsim: Nie,
  prod: qie,
  Product: Fie,
  profalar: Hie,
  profline: jie,
  profsurf: Vie,
  prop: Uie,
  Proportional: Zie,
  Proportion: Wie,
  propto: Gie,
  prsim: Kie,
  prurel: Xie,
  Pscr: Yie,
  pscr: Jie,
  Psi: Qie,
  psi: eae,
  puncsp: tae,
  Qfr: nae,
  qfr: rae,
  qint: oae,
  qopf: sae,
  Qopf: iae,
  qprime: aae,
  Qscr: cae,
  qscr: lae,
  quaternions: uae,
  quatint: dae,
  quest: fae,
  questeq: pae,
  quot: hae,
  QUOT: gae,
  rAarr: mae,
  race: vae,
  Racute: _ae,
  racute: bae,
  radic: yae,
  raemptyv: wae,
  rang: kae,
  Rang: xae,
  rangd: Cae,
  range: Sae,
  rangle: Eae,
  raquo: Aae,
  rarrap: $ae,
  rarrb: Mae,
  rarrbfs: Iae,
  rarrc: Tae,
  rarr: Lae,
  Rarr: Oae,
  rArr: Rae,
  rarrfs: Pae,
  rarrhk: Bae,
  rarrlp: zae,
  rarrpl: Dae,
  rarrsim: Nae,
  Rarrtl: qae,
  rarrtl: Fae,
  rarrw: Hae,
  ratail: jae,
  rAtail: Vae,
  ratio: Uae,
  rationals: Zae,
  rbarr: Wae,
  rBarr: Gae,
  RBarr: Kae,
  rbbrk: Xae,
  rbrace: Yae,
  rbrack: Jae,
  rbrke: Qae,
  rbrksld: ece,
  rbrkslu: tce,
  Rcaron: nce,
  rcaron: rce,
  Rcedil: oce,
  rcedil: sce,
  rceil: ice,
  rcub: ace,
  Rcy: cce,
  rcy: lce,
  rdca: uce,
  rdldhar: dce,
  rdquo: fce,
  rdquor: pce,
  rdsh: hce,
  real: gce,
  realine: mce,
  realpart: vce,
  reals: _ce,
  Re: bce,
  rect: yce,
  reg: wce,
  REG: kce,
  ReverseElement: xce,
  ReverseEquilibrium: Cce,
  ReverseUpEquilibrium: Sce,
  rfisht: Ece,
  rfloor: Ace,
  rfr: $ce,
  Rfr: Mce,
  rHar: Ice,
  rhard: Tce,
  rharu: Lce,
  rharul: Oce,
  Rho: Rce,
  rho: Pce,
  rhov: Bce,
  RightAngleBracket: zce,
  RightArrowBar: Dce,
  rightarrow: Nce,
  RightArrow: qce,
  Rightarrow: Fce,
  RightArrowLeftArrow: Hce,
  rightarrowtail: jce,
  RightCeiling: Vce,
  RightDoubleBracket: Uce,
  RightDownTeeVector: Zce,
  RightDownVectorBar: Wce,
  RightDownVector: Gce,
  RightFloor: Kce,
  rightharpoondown: Xce,
  rightharpoonup: Yce,
  rightleftarrows: Jce,
  rightleftharpoons: Qce,
  rightrightarrows: ele,
  rightsquigarrow: tle,
  RightTeeArrow: nle,
  RightTee: rle,
  RightTeeVector: ole,
  rightthreetimes: sle,
  RightTriangleBar: ile,
  RightTriangle: ale,
  RightTriangleEqual: cle,
  RightUpDownVector: lle,
  RightUpTeeVector: ule,
  RightUpVectorBar: dle,
  RightUpVector: fle,
  RightVectorBar: ple,
  RightVector: hle,
  ring: gle,
  risingdotseq: mle,
  rlarr: vle,
  rlhar: _le,
  rlm: ble,
  rmoustache: yle,
  rmoust: wle,
  rnmid: kle,
  roang: xle,
  roarr: Cle,
  robrk: Sle,
  ropar: Ele,
  ropf: Ale,
  Ropf: $le,
  roplus: Mle,
  rotimes: Ile,
  RoundImplies: Tle,
  rpar: Lle,
  rpargt: Ole,
  rppolint: Rle,
  rrarr: Ple,
  Rrightarrow: Ble,
  rsaquo: zle,
  rscr: Dle,
  Rscr: Nle,
  rsh: qle,
  Rsh: Fle,
  rsqb: Hle,
  rsquo: jle,
  rsquor: Vle,
  rthree: Ule,
  rtimes: Zle,
  rtri: Wle,
  rtrie: Gle,
  rtrif: Kle,
  rtriltri: Xle,
  RuleDelayed: Yle,
  ruluhar: Jle,
  rx: Qle,
  Sacute: eue,
  sacute: tue,
  sbquo: nue,
  scap: rue,
  Scaron: oue,
  scaron: sue,
  Sc: iue,
  sc: aue,
  sccue: cue,
  sce: lue,
  scE: uue,
  Scedil: due,
  scedil: fue,
  Scirc: pue,
  scirc: hue,
  scnap: gue,
  scnE: mue,
  scnsim: vue,
  scpolint: _ue,
  scsim: bue,
  Scy: yue,
  scy: wue,
  sdotb: kue,
  sdot: xue,
  sdote: Cue,
  searhk: Sue,
  searr: Eue,
  seArr: Aue,
  searrow: $ue,
  sect: Mue,
  semi: Iue,
  seswar: Tue,
  setminus: Lue,
  setmn: Oue,
  sext: Rue,
  Sfr: Pue,
  sfr: Bue,
  sfrown: zue,
  sharp: Due,
  SHCHcy: Nue,
  shchcy: que,
  SHcy: Fue,
  shcy: Hue,
  ShortDownArrow: jue,
  ShortLeftArrow: Vue,
  shortmid: Uue,
  shortparallel: Zue,
  ShortRightArrow: Wue,
  ShortUpArrow: Gue,
  shy: Kue,
  Sigma: Xue,
  sigma: Yue,
  sigmaf: Jue,
  sigmav: Que,
  sim: ede,
  simdot: tde,
  sime: nde,
  simeq: rde,
  simg: ode,
  simgE: sde,
  siml: ide,
  simlE: ade,
  simne: cde,
  simplus: lde,
  simrarr: ude,
  slarr: dde,
  SmallCircle: fde,
  smallsetminus: pde,
  smashp: hde,
  smeparsl: gde,
  smid: mde,
  smile: vde,
  smt: _de,
  smte: bde,
  smtes: yde,
  SOFTcy: wde,
  softcy: kde,
  solbar: xde,
  solb: Cde,
  sol: Sde,
  Sopf: Ede,
  sopf: Ade,
  spades: $de,
  spadesuit: Mde,
  spar: Ide,
  sqcap: Tde,
  sqcaps: Lde,
  sqcup: Ode,
  sqcups: Rde,
  Sqrt: Pde,
  sqsub: Bde,
  sqsube: zde,
  sqsubset: Dde,
  sqsubseteq: Nde,
  sqsup: qde,
  sqsupe: Fde,
  sqsupset: Hde,
  sqsupseteq: jde,
  square: Vde,
  Square: Ude,
  SquareIntersection: Zde,
  SquareSubset: Wde,
  SquareSubsetEqual: Gde,
  SquareSuperset: Kde,
  SquareSupersetEqual: Xde,
  SquareUnion: Yde,
  squarf: Jde,
  squ: Qde,
  squf: efe,
  srarr: tfe,
  Sscr: nfe,
  sscr: rfe,
  ssetmn: ofe,
  ssmile: sfe,
  sstarf: ife,
  Star: afe,
  star: cfe,
  starf: lfe,
  straightepsilon: ufe,
  straightphi: dfe,
  strns: ffe,
  sub: pfe,
  Sub: hfe,
  subdot: gfe,
  subE: mfe,
  sube: vfe,
  subedot: _fe,
  submult: bfe,
  subnE: yfe,
  subne: wfe,
  subplus: kfe,
  subrarr: xfe,
  subset: Cfe,
  Subset: Sfe,
  subseteq: Efe,
  subseteqq: Afe,
  SubsetEqual: $fe,
  subsetneq: Mfe,
  subsetneqq: Ife,
  subsim: Tfe,
  subsub: Lfe,
  subsup: Ofe,
  succapprox: Rfe,
  succ: Pfe,
  succcurlyeq: Bfe,
  Succeeds: zfe,
  SucceedsEqual: Dfe,
  SucceedsSlantEqual: Nfe,
  SucceedsTilde: qfe,
  succeq: Ffe,
  succnapprox: Hfe,
  succneqq: jfe,
  succnsim: Vfe,
  succsim: Ufe,
  SuchThat: Zfe,
  sum: Wfe,
  Sum: Gfe,
  sung: Kfe,
  sup1: Xfe,
  sup2: Yfe,
  sup3: Jfe,
  sup: Qfe,
  Sup: e0e,
  supdot: t0e,
  supdsub: n0e,
  supE: r0e,
  supe: o0e,
  supedot: s0e,
  Superset: i0e,
  SupersetEqual: a0e,
  suphsol: c0e,
  suphsub: l0e,
  suplarr: u0e,
  supmult: d0e,
  supnE: f0e,
  supne: p0e,
  supplus: h0e,
  supset: g0e,
  Supset: m0e,
  supseteq: v0e,
  supseteqq: _0e,
  supsetneq: b0e,
  supsetneqq: y0e,
  supsim: w0e,
  supsub: k0e,
  supsup: x0e,
  swarhk: C0e,
  swarr: S0e,
  swArr: E0e,
  swarrow: A0e,
  swnwar: $0e,
  szlig: M0e,
  Tab: I0e,
  target: T0e,
  Tau: L0e,
  tau: O0e,
  tbrk: R0e,
  Tcaron: P0e,
  tcaron: B0e,
  Tcedil: z0e,
  tcedil: D0e,
  Tcy: N0e,
  tcy: q0e,
  tdot: F0e,
  telrec: H0e,
  Tfr: j0e,
  tfr: V0e,
  there4: U0e,
  therefore: Z0e,
  Therefore: W0e,
  Theta: G0e,
  theta: K0e,
  thetasym: X0e,
  thetav: Y0e,
  thickapprox: J0e,
  thicksim: Q0e,
  ThickSpace: epe,
  ThinSpace: tpe,
  thinsp: npe,
  thkap: rpe,
  thksim: ope,
  THORN: spe,
  thorn: ipe,
  tilde: ape,
  Tilde: cpe,
  TildeEqual: lpe,
  TildeFullEqual: upe,
  TildeTilde: dpe,
  timesbar: fpe,
  timesb: ppe,
  times: hpe,
  timesd: gpe,
  tint: mpe,
  toea: vpe,
  topbot: _pe,
  topcir: bpe,
  top: ype,
  Topf: wpe,
  topf: kpe,
  topfork: xpe,
  tosa: Cpe,
  tprime: Spe,
  trade: Epe,
  TRADE: Ape,
  triangle: $pe,
  triangledown: Mpe,
  triangleleft: Ipe,
  trianglelefteq: Tpe,
  triangleq: Lpe,
  triangleright: Ope,
  trianglerighteq: Rpe,
  tridot: Ppe,
  trie: Bpe,
  triminus: zpe,
  TripleDot: Dpe,
  triplus: Npe,
  trisb: qpe,
  tritime: Fpe,
  trpezium: Hpe,
  Tscr: jpe,
  tscr: Vpe,
  TScy: Upe,
  tscy: Zpe,
  TSHcy: Wpe,
  tshcy: Gpe,
  Tstrok: Kpe,
  tstrok: Xpe,
  twixt: Ype,
  twoheadleftarrow: Jpe,
  twoheadrightarrow: Qpe,
  Uacute: ehe,
  uacute: the,
  uarr: nhe,
  Uarr: rhe,
  uArr: ohe,
  Uarrocir: she,
  Ubrcy: ihe,
  ubrcy: ahe,
  Ubreve: che,
  ubreve: lhe,
  Ucirc: uhe,
  ucirc: dhe,
  Ucy: fhe,
  ucy: phe,
  udarr: hhe,
  Udblac: ghe,
  udblac: mhe,
  udhar: vhe,
  ufisht: _he,
  Ufr: bhe,
  ufr: yhe,
  Ugrave: whe,
  ugrave: khe,
  uHar: xhe,
  uharl: Che,
  uharr: She,
  uhblk: Ehe,
  ulcorn: Ahe,
  ulcorner: $he,
  ulcrop: Mhe,
  ultri: Ihe,
  Umacr: The,
  umacr: Lhe,
  uml: Ohe,
  UnderBar: Rhe,
  UnderBrace: Phe,
  UnderBracket: Bhe,
  UnderParenthesis: zhe,
  Union: Dhe,
  UnionPlus: Nhe,
  Uogon: qhe,
  uogon: Fhe,
  Uopf: Hhe,
  uopf: jhe,
  UpArrowBar: Vhe,
  uparrow: Uhe,
  UpArrow: Zhe,
  Uparrow: Whe,
  UpArrowDownArrow: Ghe,
  updownarrow: Khe,
  UpDownArrow: Xhe,
  Updownarrow: Yhe,
  UpEquilibrium: Jhe,
  upharpoonleft: Qhe,
  upharpoonright: e2e,
  uplus: t2e,
  UpperLeftArrow: n2e,
  UpperRightArrow: r2e,
  upsi: o2e,
  Upsi: s2e,
  upsih: i2e,
  Upsilon: a2e,
  upsilon: c2e,
  UpTeeArrow: l2e,
  UpTee: u2e,
  upuparrows: d2e,
  urcorn: f2e,
  urcorner: p2e,
  urcrop: h2e,
  Uring: g2e,
  uring: m2e,
  urtri: v2e,
  Uscr: _2e,
  uscr: b2e,
  utdot: y2e,
  Utilde: w2e,
  utilde: k2e,
  utri: x2e,
  utrif: C2e,
  uuarr: S2e,
  Uuml: E2e,
  uuml: A2e,
  uwangle: $2e,
  vangrt: M2e,
  varepsilon: I2e,
  varkappa: T2e,
  varnothing: L2e,
  varphi: O2e,
  varpi: R2e,
  varpropto: P2e,
  varr: B2e,
  vArr: z2e,
  varrho: D2e,
  varsigma: N2e,
  varsubsetneq: q2e,
  varsubsetneqq: F2e,
  varsupsetneq: H2e,
  varsupsetneqq: j2e,
  vartheta: V2e,
  vartriangleleft: U2e,
  vartriangleright: Z2e,
  vBar: W2e,
  Vbar: G2e,
  vBarv: K2e,
  Vcy: X2e,
  vcy: Y2e,
  vdash: J2e,
  vDash: Q2e,
  Vdash: e1e,
  VDash: t1e,
  Vdashl: n1e,
  veebar: r1e,
  vee: o1e,
  Vee: s1e,
  veeeq: i1e,
  vellip: a1e,
  verbar: c1e,
  Verbar: l1e,
  vert: u1e,
  Vert: d1e,
  VerticalBar: f1e,
  VerticalLine: p1e,
  VerticalSeparator: h1e,
  VerticalTilde: g1e,
  VeryThinSpace: m1e,
  Vfr: v1e,
  vfr: _1e,
  vltri: b1e,
  vnsub: y1e,
  vnsup: w1e,
  Vopf: k1e,
  vopf: x1e,
  vprop: C1e,
  vrtri: S1e,
  Vscr: E1e,
  vscr: A1e,
  vsubnE: $1e,
  vsubne: M1e,
  vsupnE: I1e,
  vsupne: T1e,
  Vvdash: L1e,
  vzigzag: O1e,
  Wcirc: R1e,
  wcirc: P1e,
  wedbar: B1e,
  wedge: z1e,
  Wedge: D1e,
  wedgeq: N1e,
  weierp: q1e,
  Wfr: F1e,
  wfr: H1e,
  Wopf: j1e,
  wopf: V1e,
  wp: U1e,
  wr: Z1e,
  wreath: W1e,
  Wscr: G1e,
  wscr: K1e,
  xcap: X1e,
  xcirc: Y1e,
  xcup: J1e,
  xdtri: Q1e,
  Xfr: ege,
  xfr: tge,
  xharr: nge,
  xhArr: rge,
  Xi: oge,
  xi: sge,
  xlarr: ige,
  xlArr: age,
  xmap: cge,
  xnis: lge,
  xodot: uge,
  Xopf: dge,
  xopf: fge,
  xoplus: pge,
  xotime: hge,
  xrarr: gge,
  xrArr: mge,
  Xscr: vge,
  xscr: _ge,
  xsqcup: bge,
  xuplus: yge,
  xutri: wge,
  xvee: kge,
  xwedge: xge,
  Yacute: Cge,
  yacute: Sge,
  YAcy: Ege,
  yacy: Age,
  Ycirc: $ge,
  ycirc: Mge,
  Ycy: Ige,
  ycy: Tge,
  yen: Lge,
  Yfr: Oge,
  yfr: Rge,
  YIcy: Pge,
  yicy: Bge,
  Yopf: zge,
  yopf: Dge,
  Yscr: Nge,
  yscr: qge,
  YUcy: Fge,
  yucy: Hge,
  yuml: jge,
  Yuml: Vge,
  Zacute: Uge,
  zacute: Zge,
  Zcaron: Wge,
  zcaron: Gge,
  Zcy: Kge,
  zcy: Xge,
  Zdot: Yge,
  zdot: Jge,
  zeetrf: Qge,
  ZeroWidthSpace: eme,
  Zeta: tme,
  zeta: nme,
  zfr: rme,
  Zfr: ome,
  ZHcy: sme,
  zhcy: ime,
  zigrarr: ame,
  zopf: cme,
  Zopf: lme,
  Zscr: ume,
  zscr: dme,
  zwj: fme,
  zwnj: pme
};
var Js, Od;
function am() {
  return Od || (Od = 1, Js = hme), Js;
}
var Qs, Rd;
function El() {
  return Rd || (Rd = 1, Qs = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/), Qs;
}
var lr = {}, ei, Pd;
function gme() {
  if (Pd) return ei;
  Pd = 1;
  var e = {};
  function t(r) {
    var s, o, i = e[r];
    if (i)
      return i;
    for (i = e[r] = [], s = 0; s < 128; s++)
      o = String.fromCharCode(s), /^[0-9a-z]$/i.test(o) ? i.push(o) : i.push("%" + ("0" + s.toString(16).toUpperCase()).slice(-2));
    for (s = 0; s < r.length; s++)
      i[r.charCodeAt(s)] = r[s];
    return i;
  }
  function n(r, s, o) {
    var i, a, c, u, d, l = "";
    for (typeof s != "string" && (o = s, s = n.defaultChars), typeof o > "u" && (o = !0), d = t(s), i = 0, a = r.length; i < a; i++) {
      if (c = r.charCodeAt(i), o && c === 37 && i + 2 < a && /^[0-9a-f]{2}$/i.test(r.slice(i + 1, i + 3))) {
        l += r.slice(i, i + 3), i += 2;
        continue;
      }
      if (c < 128) {
        l += d[c];
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        if (c >= 55296 && c <= 56319 && i + 1 < a && (u = r.charCodeAt(i + 1), u >= 56320 && u <= 57343)) {
          l += encodeURIComponent(r[i] + r[i + 1]), i++;
          continue;
        }
        l += "%EF%BF%BD";
        continue;
      }
      l += encodeURIComponent(r[i]);
    }
    return l;
  }
  return n.defaultChars = ";/?:@&=+$,-_.!~*'()#", n.componentChars = "-_.!~*'()", ei = n, ei;
}
var ti, Bd;
function mme() {
  if (Bd) return ti;
  Bd = 1;
  var e = {};
  function t(r) {
    var s, o, i = e[r];
    if (i)
      return i;
    for (i = e[r] = [], s = 0; s < 128; s++)
      o = String.fromCharCode(s), i.push(o);
    for (s = 0; s < r.length; s++)
      o = r.charCodeAt(s), i[o] = "%" + ("0" + o.toString(16).toUpperCase()).slice(-2);
    return i;
  }
  function n(r, s) {
    var o;
    return typeof s != "string" && (s = n.defaultChars), o = t(s), r.replace(/(%[a-f0-9]{2})+/gi, function(i) {
      var a, c, u, d, l, m, f, v = "";
      for (a = 0, c = i.length; a < c; a += 3) {
        if (u = parseInt(i.slice(a + 1, a + 3), 16), u < 128) {
          v += o[u];
          continue;
        }
        if ((u & 224) === 192 && a + 3 < c && (d = parseInt(i.slice(a + 4, a + 6), 16), (d & 192) === 128)) {
          f = u << 6 & 1984 | d & 63, f < 128 ? v += "��" : v += String.fromCharCode(f), a += 3;
          continue;
        }
        if ((u & 240) === 224 && a + 6 < c && (d = parseInt(i.slice(a + 4, a + 6), 16), l = parseInt(i.slice(a + 7, a + 9), 16), (d & 192) === 128 && (l & 192) === 128)) {
          f = u << 12 & 61440 | d << 6 & 4032 | l & 63, f < 2048 || f >= 55296 && f <= 57343 ? v += "���" : v += String.fromCharCode(f), a += 6;
          continue;
        }
        if ((u & 248) === 240 && a + 9 < c && (d = parseInt(i.slice(a + 4, a + 6), 16), l = parseInt(i.slice(a + 7, a + 9), 16), m = parseInt(i.slice(a + 10, a + 12), 16), (d & 192) === 128 && (l & 192) === 128 && (m & 192) === 128)) {
          f = u << 18 & 1835008 | d << 12 & 258048 | l << 6 & 4032 | m & 63, f < 65536 || f > 1114111 ? v += "����" : (f -= 65536, v += String.fromCharCode(55296 + (f >> 10), 56320 + (f & 1023))), a += 9;
          continue;
        }
        v += "�";
      }
      return v;
    });
  }
  return n.defaultChars = ";/?:@&=+$,#", n.componentChars = "", ti = n, ti;
}
var ni, zd;
function vme() {
  return zd || (zd = 1, ni = function(t) {
    var n = "";
    return n += t.protocol || "", n += t.slashes ? "//" : "", n += t.auth ? t.auth + "@" : "", t.hostname && t.hostname.indexOf(":") !== -1 ? n += "[" + t.hostname + "]" : n += t.hostname || "", n += t.port ? ":" + t.port : "", n += t.pathname || "", n += t.search || "", n += t.hash || "", n;
  }), ni;
}
var ri, Dd;
function _me() {
  if (Dd) return ri;
  Dd = 1;
  function e() {
    this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
  }
  var t = /^([a-z0-9.+-]+:)/i, n = /:[0-9]*$/, r = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, s = ["<", ">", '"', "`", " ", "\r", `
`, "	"], o = ["{", "}", "|", "\\", "^", "`"].concat(s), i = ["'"].concat(o), a = ["%", "/", "?", ";", "#"].concat(i), c = ["/", "?", "#"], u = 255, d = /^[+a-z0-9A-Z_-]{0,63}$/, l = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, m = {
    javascript: !0,
    "javascript:": !0
  }, f = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  };
  function v(g, y) {
    if (g && g instanceof e)
      return g;
    var h = new e();
    return h.parse(g, y), h;
  }
  return e.prototype.parse = function(g, y) {
    var h, w, k, x, A, S = g;
    if (S = S.trim(), !y && g.split("#").length === 1) {
      var $ = r.exec(S);
      if ($)
        return this.pathname = $[1], $[2] && (this.search = $[2]), this;
    }
    var M = t.exec(S);
    if (M && (M = M[0], k = M.toLowerCase(), this.protocol = M, S = S.substr(M.length)), (y || M || S.match(/^\/\/[^@\/]+@[^@\/]+/)) && (A = S.substr(0, 2) === "//", A && !(M && m[M]) && (S = S.substr(2), this.slashes = !0)), !m[M] && (A || M && !f[M])) {
      var P = -1;
      for (h = 0; h < c.length; h++)
        x = S.indexOf(c[h]), x !== -1 && (P === -1 || x < P) && (P = x);
      var R, B;
      for (P === -1 ? B = S.lastIndexOf("@") : B = S.lastIndexOf("@", P), B !== -1 && (R = S.slice(0, B), S = S.slice(B + 1), this.auth = R), P = -1, h = 0; h < a.length; h++)
        x = S.indexOf(a[h]), x !== -1 && (P === -1 || x < P) && (P = x);
      P === -1 && (P = S.length), S[P - 1] === ":" && P--;
      var j = S.slice(0, P);
      S = S.slice(P), this.parseHost(j), this.hostname = this.hostname || "";
      var ie = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!ie) {
        var z = this.hostname.split(/\./);
        for (h = 0, w = z.length; h < w; h++) {
          var Q = z[h];
          if (Q && !Q.match(d)) {
            for (var N = "", V = 0, F = Q.length; V < F; V++)
              Q.charCodeAt(V) > 127 ? N += "x" : N += Q[V];
            if (!N.match(d)) {
              var G = z.slice(0, h), T = z.slice(h + 1), W = Q.match(l);
              W && (G.push(W[1]), T.unshift(W[2])), T.length && (S = T.join(".") + S), this.hostname = G.join(".");
              break;
            }
          }
        }
      }
      this.hostname.length > u && (this.hostname = ""), ie && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
    }
    var U = S.indexOf("#");
    U !== -1 && (this.hash = S.substr(U), S = S.slice(0, U));
    var se = S.indexOf("?");
    return se !== -1 && (this.search = S.substr(se), S = S.slice(0, se)), S && (this.pathname = S), f[k] && this.hostname && !this.pathname && (this.pathname = ""), this;
  }, e.prototype.parseHost = function(g) {
    var y = n.exec(g);
    y && (y = y[0], y !== ":" && (this.port = y.substr(1)), g = g.substr(0, g.length - y.length)), g && (this.hostname = g);
  }, ri = v, ri;
}
var Nd;
function cm() {
  return Nd || (Nd = 1, lr.encode = gme(), lr.decode = mme(), lr.format = vme(), lr.parse = _me()), lr;
}
var Wn = {}, oi, qd;
function lm() {
  return qd || (qd = 1, oi = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/), oi;
}
var si, Fd;
function um() {
  return Fd || (Fd = 1, si = /[\0-\x1F\x7F-\x9F]/), si;
}
var ii, Hd;
function bme() {
  return Hd || (Hd = 1, ii = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/), ii;
}
var ai, jd;
function dm() {
  return jd || (jd = 1, ai = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/), ai;
}
var Vd;
function yme() {
  return Vd || (Vd = 1, Wn.Any = lm(), Wn.Cc = um(), Wn.Cf = bme(), Wn.P = El(), Wn.Z = dm()), Wn;
}
var Ud;
function Pe() {
  return Ud || (Ud = 1, (function(e) {
    function t(z) {
      return Object.prototype.toString.call(z);
    }
    function n(z) {
      return t(z) === "[object String]";
    }
    var r = Object.prototype.hasOwnProperty;
    function s(z, Q) {
      return r.call(z, Q);
    }
    function o(z) {
      var Q = Array.prototype.slice.call(arguments, 1);
      return Q.forEach(function(N) {
        if (N) {
          if (typeof N != "object")
            throw new TypeError(N + "must be object");
          Object.keys(N).forEach(function(V) {
            z[V] = N[V];
          });
        }
      }), z;
    }
    function i(z, Q, N) {
      return [].concat(z.slice(0, Q), N, z.slice(Q + 1));
    }
    function a(z) {
      return !(z >= 55296 && z <= 57343 || z >= 64976 && z <= 65007 || (z & 65535) === 65535 || (z & 65535) === 65534 || z >= 0 && z <= 8 || z === 11 || z >= 14 && z <= 31 || z >= 127 && z <= 159 || z > 1114111);
    }
    function c(z) {
      if (z > 65535) {
        z -= 65536;
        var Q = 55296 + (z >> 10), N = 56320 + (z & 1023);
        return String.fromCharCode(Q, N);
      }
      return String.fromCharCode(z);
    }
    var u = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, d = /&([a-z#][a-z0-9]{1,31});/gi, l = new RegExp(u.source + "|" + d.source, "gi"), m = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i, f = am();
    function v(z, Q) {
      var N;
      return s(f, Q) ? f[Q] : Q.charCodeAt(0) === 35 && m.test(Q) && (N = Q[1].toLowerCase() === "x" ? parseInt(Q.slice(2), 16) : parseInt(Q.slice(1), 10), a(N)) ? c(N) : z;
    }
    function g(z) {
      return z.indexOf("\\") < 0 ? z : z.replace(u, "$1");
    }
    function y(z) {
      return z.indexOf("\\") < 0 && z.indexOf("&") < 0 ? z : z.replace(l, function(Q, N, V) {
        return N || v(Q, V);
      });
    }
    var h = /[&<>"]/, w = /[&<>"]/g, k = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    function x(z) {
      return k[z];
    }
    function A(z) {
      return h.test(z) ? z.replace(w, x) : z;
    }
    var S = /[.?*+^$[\]\\(){}|-]/g;
    function $(z) {
      return z.replace(S, "\\$&");
    }
    function M(z) {
      switch (z) {
        case 9:
        case 32:
          return !0;
      }
      return !1;
    }
    function P(z) {
      if (z >= 8192 && z <= 8202)
        return !0;
      switch (z) {
        case 9:
        // \t
        case 10:
        // \n
        case 11:
        // \v
        case 12:
        // \f
        case 13:
        // \r
        case 32:
        case 160:
        case 5760:
        case 8239:
        case 8287:
        case 12288:
          return !0;
      }
      return !1;
    }
    var R = El();
    function B(z) {
      return R.test(z);
    }
    function j(z) {
      switch (z) {
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 124:
        case 125:
        case 126:
          return !0;
        default:
          return !1;
      }
    }
    function ie(z) {
      return z = z.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (z = z.replace(/ẞ/g, "ß")), z.toLowerCase().toUpperCase();
    }
    e.lib = {}, e.lib.mdurl = cm(), e.lib.ucmicro = yme(), e.assign = o, e.isString = n, e.has = s, e.unescapeMd = g, e.unescapeAll = y, e.isValidEntityCode = a, e.fromCodePoint = c, e.escapeHtml = A, e.arrayReplaceAt = i, e.isSpace = M, e.isWhiteSpace = P, e.isMdAsciiPunct = j, e.isPunctChar = B, e.escapeRE = $, e.normalizeReference = ie;
  })(Ys)), Ys;
}
var qr = {}, ci, Zd;
function wme() {
  return Zd || (Zd = 1, ci = function(t, n, r) {
    var s, o, i, a, c = -1, u = t.posMax, d = t.pos;
    for (t.pos = n + 1, s = 1; t.pos < u; ) {
      if (i = t.src.charCodeAt(t.pos), i === 93 && (s--, s === 0)) {
        o = !0;
        break;
      }
      if (a = t.pos, t.md.inline.skipToken(t), i === 91) {
        if (a === t.pos - 1)
          s++;
        else if (r)
          return t.pos = d, -1;
      }
    }
    return o && (c = t.pos), t.pos = d, c;
  }), ci;
}
var li, Wd;
function kme() {
  if (Wd) return li;
  Wd = 1;
  var e = Pe().unescapeAll;
  return li = function(n, r, s) {
    var o, i, a = r, c = {
      ok: !1,
      pos: 0,
      lines: 0,
      str: ""
    };
    if (n.charCodeAt(a) === 60) {
      for (a++; a < s; ) {
        if (o = n.charCodeAt(a), o === 10 || o === 60)
          return c;
        if (o === 62)
          return c.pos = a + 1, c.str = e(n.slice(r + 1, a)), c.ok = !0, c;
        if (o === 92 && a + 1 < s) {
          a += 2;
          continue;
        }
        a++;
      }
      return c;
    }
    for (i = 0; a < s && (o = n.charCodeAt(a), !(o === 32 || o < 32 || o === 127)); ) {
      if (o === 92 && a + 1 < s) {
        if (n.charCodeAt(a + 1) === 32)
          break;
        a += 2;
        continue;
      }
      if (o === 40 && (i++, i > 32))
        return c;
      if (o === 41) {
        if (i === 0)
          break;
        i--;
      }
      a++;
    }
    return r === a || i !== 0 || (c.str = e(n.slice(r, a)), c.pos = a, c.ok = !0), c;
  }, li;
}
var ui, Gd;
function xme() {
  if (Gd) return ui;
  Gd = 1;
  var e = Pe().unescapeAll;
  return ui = function(n, r, s) {
    var o, i, a = 0, c = r, u = {
      ok: !1,
      pos: 0,
      lines: 0,
      str: ""
    };
    if (c >= s || (i = n.charCodeAt(c), i !== 34 && i !== 39 && i !== 40))
      return u;
    for (c++, i === 40 && (i = 41); c < s; ) {
      if (o = n.charCodeAt(c), o === i)
        return u.pos = c + 1, u.lines = a, u.str = e(n.slice(r + 1, c)), u.ok = !0, u;
      if (o === 40 && i === 41)
        return u;
      o === 10 ? a++ : o === 92 && c + 1 < s && (c++, n.charCodeAt(c) === 10 && a++), c++;
    }
    return u;
  }, ui;
}
var Kd;
function Cme() {
  return Kd || (Kd = 1, qr.parseLinkLabel = wme(), qr.parseLinkDestination = kme(), qr.parseLinkTitle = xme()), qr;
}
var di, Xd;
function Sme() {
  if (Xd) return di;
  Xd = 1;
  var e = Pe().assign, t = Pe().unescapeAll, n = Pe().escapeHtml, r = {};
  r.code_inline = function(o, i, a, c, u) {
    var d = o[i];
    return "<code" + u.renderAttrs(d) + ">" + n(d.content) + "</code>";
  }, r.code_block = function(o, i, a, c, u) {
    var d = o[i];
    return "<pre" + u.renderAttrs(d) + "><code>" + n(o[i].content) + `</code></pre>
`;
  }, r.fence = function(o, i, a, c, u) {
    var d = o[i], l = d.info ? t(d.info).trim() : "", m = "", f = "", v, g, y, h, w;
    return l && (y = l.split(/(\s+)/g), m = y[0], f = y.slice(2).join("")), a.highlight ? v = a.highlight(d.content, m, f) || n(d.content) : v = n(d.content), v.indexOf("<pre") === 0 ? v + `
` : l ? (g = d.attrIndex("class"), h = d.attrs ? d.attrs.slice() : [], g < 0 ? h.push(["class", a.langPrefix + m]) : (h[g] = h[g].slice(), h[g][1] += " " + a.langPrefix + m), w = {
      attrs: h
    }, "<pre><code" + u.renderAttrs(w) + ">" + v + `</code></pre>
`) : "<pre><code" + u.renderAttrs(d) + ">" + v + `</code></pre>
`;
  }, r.image = function(o, i, a, c, u) {
    var d = o[i];
    return d.attrs[d.attrIndex("alt")][1] = u.renderInlineAsText(d.children, a, c), u.renderToken(o, i, a);
  }, r.hardbreak = function(o, i, a) {
    return a.xhtmlOut ? `<br />
` : `<br>
`;
  }, r.softbreak = function(o, i, a) {
    return a.breaks ? a.xhtmlOut ? `<br />
` : `<br>
` : `
`;
  }, r.text = function(o, i) {
    return n(o[i].content);
  }, r.html_block = function(o, i) {
    return o[i].content;
  }, r.html_inline = function(o, i) {
    return o[i].content;
  };
  function s() {
    this.rules = e({}, r);
  }
  return s.prototype.renderAttrs = function(i) {
    var a, c, u;
    if (!i.attrs)
      return "";
    for (u = "", a = 0, c = i.attrs.length; a < c; a++)
      u += " " + n(i.attrs[a][0]) + '="' + n(i.attrs[a][1]) + '"';
    return u;
  }, s.prototype.renderToken = function(i, a, c) {
    var u, d = "", l = !1, m = i[a];
    return m.hidden ? "" : (m.block && m.nesting !== -1 && a && i[a - 1].hidden && (d += `
`), d += (m.nesting === -1 ? "</" : "<") + m.tag, d += this.renderAttrs(m), m.nesting === 0 && c.xhtmlOut && (d += " /"), m.block && (l = !0, m.nesting === 1 && a + 1 < i.length && (u = i[a + 1], (u.type === "inline" || u.hidden || u.nesting === -1 && u.tag === m.tag) && (l = !1))), d += l ? `>
` : ">", d);
  }, s.prototype.renderInline = function(o, i, a) {
    for (var c, u = "", d = this.rules, l = 0, m = o.length; l < m; l++)
      c = o[l].type, typeof d[c] < "u" ? u += d[c](o, l, i, a, this) : u += this.renderToken(o, l, i);
    return u;
  }, s.prototype.renderInlineAsText = function(o, i, a) {
    for (var c = "", u = 0, d = o.length; u < d; u++)
      o[u].type === "text" ? c += o[u].content : o[u].type === "image" ? c += this.renderInlineAsText(o[u].children, i, a) : o[u].type === "softbreak" && (c += `
`);
    return c;
  }, s.prototype.render = function(o, i, a) {
    var c, u, d, l = "", m = this.rules;
    for (c = 0, u = o.length; c < u; c++)
      d = o[c].type, d === "inline" ? l += this.renderInline(o[c].children, i, a) : typeof m[d] < "u" ? l += m[d](o, c, i, a, this) : l += this.renderToken(o, c, i, a);
    return l;
  }, di = s, di;
}
var fi, Yd;
function Al() {
  if (Yd) return fi;
  Yd = 1;
  function e() {
    this.__rules__ = [], this.__cache__ = null;
  }
  return e.prototype.__find__ = function(t) {
    for (var n = 0; n < this.__rules__.length; n++)
      if (this.__rules__[n].name === t)
        return n;
    return -1;
  }, e.prototype.__compile__ = function() {
    var t = this, n = [""];
    t.__rules__.forEach(function(r) {
      r.enabled && r.alt.forEach(function(s) {
        n.indexOf(s) < 0 && n.push(s);
      });
    }), t.__cache__ = {}, n.forEach(function(r) {
      t.__cache__[r] = [], t.__rules__.forEach(function(s) {
        s.enabled && (r && s.alt.indexOf(r) < 0 || t.__cache__[r].push(s.fn));
      });
    });
  }, e.prototype.at = function(t, n, r) {
    var s = this.__find__(t), o = r || {};
    if (s === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__[s].fn = n, this.__rules__[s].alt = o.alt || [], this.__cache__ = null;
  }, e.prototype.before = function(t, n, r, s) {
    var o = this.__find__(t), i = s || {};
    if (o === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__.splice(o, 0, {
      name: n,
      enabled: !0,
      fn: r,
      alt: i.alt || []
    }), this.__cache__ = null;
  }, e.prototype.after = function(t, n, r, s) {
    var o = this.__find__(t), i = s || {};
    if (o === -1)
      throw new Error("Parser rule not found: " + t);
    this.__rules__.splice(o + 1, 0, {
      name: n,
      enabled: !0,
      fn: r,
      alt: i.alt || []
    }), this.__cache__ = null;
  }, e.prototype.push = function(t, n, r) {
    var s = r || {};
    this.__rules__.push({
      name: t,
      enabled: !0,
      fn: n,
      alt: s.alt || []
    }), this.__cache__ = null;
  }, e.prototype.enable = function(t, n) {
    Array.isArray(t) || (t = [t]);
    var r = [];
    return t.forEach(function(s) {
      var o = this.__find__(s);
      if (o < 0) {
        if (n)
          return;
        throw new Error("Rules manager: invalid rule name " + s);
      }
      this.__rules__[o].enabled = !0, r.push(s);
    }, this), this.__cache__ = null, r;
  }, e.prototype.enableOnly = function(t, n) {
    Array.isArray(t) || (t = [t]), this.__rules__.forEach(function(r) {
      r.enabled = !1;
    }), this.enable(t, n);
  }, e.prototype.disable = function(t, n) {
    Array.isArray(t) || (t = [t]);
    var r = [];
    return t.forEach(function(s) {
      var o = this.__find__(s);
      if (o < 0) {
        if (n)
          return;
        throw new Error("Rules manager: invalid rule name " + s);
      }
      this.__rules__[o].enabled = !1, r.push(s);
    }, this), this.__cache__ = null, r;
  }, e.prototype.getRules = function(t) {
    return this.__cache__ === null && this.__compile__(), this.__cache__[t] || [];
  }, fi = e, fi;
}
var pi, Jd;
function Eme() {
  if (Jd) return pi;
  Jd = 1;
  var e = /\r\n?|\n/g, t = /\0/g;
  return pi = function(r) {
    var s;
    s = r.src.replace(e, `
`), s = s.replace(t, "�"), r.src = s;
  }, pi;
}
var hi, Qd;
function Ame() {
  return Qd || (Qd = 1, hi = function(t) {
    var n;
    t.inlineMode ? (n = new t.Token("inline", "", 0), n.content = t.src, n.map = [0, 1], n.children = [], t.tokens.push(n)) : t.md.block.parse(t.src, t.md, t.env, t.tokens);
  }), hi;
}
var gi, ef;
function $me() {
  return ef || (ef = 1, gi = function(t) {
    var n = t.tokens, r, s, o;
    for (s = 0, o = n.length; s < o; s++)
      r = n[s], r.type === "inline" && t.md.inline.parse(r.content, t.md, t.env, r.children);
  }), gi;
}
var mi, tf;
function Mme() {
  if (tf) return mi;
  tf = 1;
  var e = Pe().arrayReplaceAt;
  function t(r) {
    return /^<a[>\s]/i.test(r);
  }
  function n(r) {
    return /^<\/a\s*>/i.test(r);
  }
  return mi = function(s) {
    var o, i, a, c, u, d, l, m, f, v, g, y, h, w, k, x, A = s.tokens, S;
    if (s.md.options.linkify) {
      for (i = 0, a = A.length; i < a; i++)
        if (!(A[i].type !== "inline" || !s.md.linkify.pretest(A[i].content)))
          for (c = A[i].children, h = 0, o = c.length - 1; o >= 0; o--) {
            if (d = c[o], d.type === "link_close") {
              for (o--; c[o].level !== d.level && c[o].type !== "link_open"; )
                o--;
              continue;
            }
            if (d.type === "html_inline" && (t(d.content) && h > 0 && h--, n(d.content) && h++), !(h > 0) && d.type === "text" && s.md.linkify.test(d.content)) {
              for (f = d.content, S = s.md.linkify.match(f), l = [], y = d.level, g = 0, S.length > 0 && S[0].index === 0 && o > 0 && c[o - 1].type === "text_special" && (S = S.slice(1)), m = 0; m < S.length; m++)
                w = S[m].url, k = s.md.normalizeLink(w), s.md.validateLink(k) && (x = S[m].text, S[m].schema ? S[m].schema === "mailto:" && !/^mailto:/i.test(x) ? x = s.md.normalizeLinkText("mailto:" + x).replace(/^mailto:/, "") : x = s.md.normalizeLinkText(x) : x = s.md.normalizeLinkText("http://" + x).replace(/^http:\/\//, ""), v = S[m].index, v > g && (u = new s.Token("text", "", 0), u.content = f.slice(g, v), u.level = y, l.push(u)), u = new s.Token("link_open", "a", 1), u.attrs = [["href", k]], u.level = y++, u.markup = "linkify", u.info = "auto", l.push(u), u = new s.Token("text", "", 0), u.content = x, u.level = y, l.push(u), u = new s.Token("link_close", "a", -1), u.level = --y, u.markup = "linkify", u.info = "auto", l.push(u), g = S[m].lastIndex);
              g < f.length && (u = new s.Token("text", "", 0), u.content = f.slice(g), u.level = y, l.push(u)), A[i].children = c = e(c, o, l);
            }
          }
    }
  }, mi;
}
var vi, nf;
function Ime() {
  if (nf) return vi;
  nf = 1;
  var e = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, t = /\((c|tm|r)\)/i, n = /\((c|tm|r)\)/ig, r = {
    c: "©",
    r: "®",
    tm: "™"
  };
  function s(a, c) {
    return r[c.toLowerCase()];
  }
  function o(a) {
    var c, u, d = 0;
    for (c = a.length - 1; c >= 0; c--)
      u = a[c], u.type === "text" && !d && (u.content = u.content.replace(n, s)), u.type === "link_open" && u.info === "auto" && d--, u.type === "link_close" && u.info === "auto" && d++;
  }
  function i(a) {
    var c, u, d = 0;
    for (c = a.length - 1; c >= 0; c--)
      u = a[c], u.type === "text" && !d && e.test(u.content) && (u.content = u.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), u.type === "link_open" && u.info === "auto" && d--, u.type === "link_close" && u.info === "auto" && d++;
  }
  return vi = function(c) {
    var u;
    if (c.md.options.typographer)
      for (u = c.tokens.length - 1; u >= 0; u--)
        c.tokens[u].type === "inline" && (t.test(c.tokens[u].content) && o(c.tokens[u].children), e.test(c.tokens[u].content) && i(c.tokens[u].children));
  }, vi;
}
var _i, rf;
function Tme() {
  if (rf) return _i;
  rf = 1;
  var e = Pe().isWhiteSpace, t = Pe().isPunctChar, n = Pe().isMdAsciiPunct, r = /['"]/, s = /['"]/g, o = "’";
  function i(c, u, d) {
    return c.slice(0, u) + d + c.slice(u + 1);
  }
  function a(c, u) {
    var d, l, m, f, v, g, y, h, w, k, x, A, S, $, M, P, R, B, j, ie, z;
    for (j = [], d = 0; d < c.length; d++) {
      for (l = c[d], y = c[d].level, R = j.length - 1; R >= 0 && !(j[R].level <= y); R--)
        ;
      if (j.length = R + 1, l.type === "text") {
        m = l.content, v = 0, g = m.length;
        e:
          for (; v < g && (s.lastIndex = v, f = s.exec(m), !!f); ) {
            if (M = P = !0, v = f.index + 1, B = f[0] === "'", w = 32, f.index - 1 >= 0)
              w = m.charCodeAt(f.index - 1);
            else
              for (R = d - 1; R >= 0 && !(c[R].type === "softbreak" || c[R].type === "hardbreak"); R--)
                if (c[R].content) {
                  w = c[R].content.charCodeAt(c[R].content.length - 1);
                  break;
                }
            if (k = 32, v < g)
              k = m.charCodeAt(v);
            else
              for (R = d + 1; R < c.length && !(c[R].type === "softbreak" || c[R].type === "hardbreak"); R++)
                if (c[R].content) {
                  k = c[R].content.charCodeAt(0);
                  break;
                }
            if (x = n(w) || t(String.fromCharCode(w)), A = n(k) || t(String.fromCharCode(k)), S = e(w), $ = e(k), $ ? M = !1 : A && (S || x || (M = !1)), S ? P = !1 : x && ($ || A || (P = !1)), k === 34 && f[0] === '"' && w >= 48 && w <= 57 && (P = M = !1), M && P && (M = x, P = A), !M && !P) {
              B && (l.content = i(l.content, f.index, o));
              continue;
            }
            if (P) {
              for (R = j.length - 1; R >= 0 && (h = j[R], !(j[R].level < y)); R--)
                if (h.single === B && j[R].level === y) {
                  h = j[R], B ? (ie = u.md.options.quotes[2], z = u.md.options.quotes[3]) : (ie = u.md.options.quotes[0], z = u.md.options.quotes[1]), l.content = i(l.content, f.index, z), c[h.token].content = i(
                    c[h.token].content,
                    h.pos,
                    ie
                  ), v += z.length - 1, h.token === d && (v += ie.length - 1), m = l.content, g = m.length, j.length = R;
                  continue e;
                }
            }
            M ? j.push({
              token: d,
              pos: f.index,
              single: B,
              level: y
            }) : P && B && (l.content = i(l.content, f.index, o));
          }
      }
    }
  }
  return _i = function(u) {
    var d;
    if (u.md.options.typographer)
      for (d = u.tokens.length - 1; d >= 0; d--)
        u.tokens[d].type !== "inline" || !r.test(u.tokens[d].content) || a(u.tokens[d].children, u);
  }, _i;
}
var bi, of;
function Lme() {
  return of || (of = 1, bi = function(t) {
    var n, r, s, o, i, a, c = t.tokens;
    for (n = 0, r = c.length; n < r; n++)
      if (c[n].type === "inline") {
        for (s = c[n].children, i = s.length, o = 0; o < i; o++)
          s[o].type === "text_special" && (s[o].type = "text");
        for (o = a = 0; o < i; o++)
          s[o].type === "text" && o + 1 < i && s[o + 1].type === "text" ? s[o + 1].content = s[o].content + s[o + 1].content : (o !== a && (s[a] = s[o]), a++);
        o !== a && (s.length = a);
      }
  }), bi;
}
var yi, sf;
function $l() {
  if (sf) return yi;
  sf = 1;
  function e(t, n, r) {
    this.type = t, this.tag = n, this.attrs = null, this.map = null, this.nesting = r, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
  }
  return e.prototype.attrIndex = function(n) {
    var r, s, o;
    if (!this.attrs)
      return -1;
    for (r = this.attrs, s = 0, o = r.length; s < o; s++)
      if (r[s][0] === n)
        return s;
    return -1;
  }, e.prototype.attrPush = function(n) {
    this.attrs ? this.attrs.push(n) : this.attrs = [n];
  }, e.prototype.attrSet = function(n, r) {
    var s = this.attrIndex(n), o = [n, r];
    s < 0 ? this.attrPush(o) : this.attrs[s] = o;
  }, e.prototype.attrGet = function(n) {
    var r = this.attrIndex(n), s = null;
    return r >= 0 && (s = this.attrs[r][1]), s;
  }, e.prototype.attrJoin = function(n, r) {
    var s = this.attrIndex(n);
    s < 0 ? this.attrPush([n, r]) : this.attrs[s][1] = this.attrs[s][1] + " " + r;
  }, yi = e, yi;
}
var wi, af;
function Ome() {
  if (af) return wi;
  af = 1;
  var e = $l();
  function t(n, r, s) {
    this.src = n, this.env = s, this.tokens = [], this.inlineMode = !1, this.md = r;
  }
  return t.prototype.Token = e, wi = t, wi;
}
var ki, cf;
function Rme() {
  if (cf) return ki;
  cf = 1;
  var e = Al(), t = [
    ["normalize", Eme()],
    ["block", Ame()],
    ["inline", $me()],
    ["linkify", Mme()],
    ["replacements", Ime()],
    ["smartquotes", Tme()],
    // `text_join` finds `text_special` tokens (for escape sequences)
    // and joins them with the rest of the text
    ["text_join", Lme()]
  ];
  function n() {
    this.ruler = new e();
    for (var r = 0; r < t.length; r++)
      this.ruler.push(t[r][0], t[r][1]);
  }
  return n.prototype.process = function(r) {
    var s, o, i;
    for (i = this.ruler.getRules(""), s = 0, o = i.length; s < o; s++)
      i[s](r);
  }, n.prototype.State = Ome(), ki = n, ki;
}
var xi, lf;
function Pme() {
  if (lf) return xi;
  lf = 1;
  var e = Pe().isSpace;
  function t(r, s) {
    var o = r.bMarks[s] + r.tShift[s], i = r.eMarks[s];
    return r.src.slice(o, i);
  }
  function n(r) {
    var s = [], o = 0, i = r.length, a, c = !1, u = 0, d = "";
    for (a = r.charCodeAt(o); o < i; )
      a === 124 && (c ? (d += r.substring(u, o - 1), u = o) : (s.push(d + r.substring(u, o)), d = "", u = o + 1)), c = a === 92, o++, a = r.charCodeAt(o);
    return s.push(d + r.substring(u)), s;
  }
  return xi = function(s, o, i, a) {
    var c, u, d, l, m, f, v, g, y, h, w, k, x, A, S, $, M, P;
    if (o + 2 > i || (f = o + 1, s.sCount[f] < s.blkIndent) || s.sCount[f] - s.blkIndent >= 4 || (d = s.bMarks[f] + s.tShift[f], d >= s.eMarks[f]) || (M = s.src.charCodeAt(d++), M !== 124 && M !== 45 && M !== 58) || d >= s.eMarks[f] || (P = s.src.charCodeAt(d++), P !== 124 && P !== 45 && P !== 58 && !e(P)) || M === 45 && e(P))
      return !1;
    for (; d < s.eMarks[f]; ) {
      if (c = s.src.charCodeAt(d), c !== 124 && c !== 45 && c !== 58 && !e(c))
        return !1;
      d++;
    }
    for (u = t(s, o + 1), v = u.split("|"), h = [], l = 0; l < v.length; l++) {
      if (w = v[l].trim(), !w) {
        if (l === 0 || l === v.length - 1)
          continue;
        return !1;
      }
      if (!/^:?-+:?$/.test(w))
        return !1;
      w.charCodeAt(w.length - 1) === 58 ? h.push(w.charCodeAt(0) === 58 ? "center" : "right") : w.charCodeAt(0) === 58 ? h.push("left") : h.push("");
    }
    if (u = t(s, o).trim(), u.indexOf("|") === -1 || s.sCount[o] - s.blkIndent >= 4 || (v = n(u), v.length && v[0] === "" && v.shift(), v.length && v[v.length - 1] === "" && v.pop(), g = v.length, g === 0 || g !== h.length))
      return !1;
    if (a)
      return !0;
    for (A = s.parentType, s.parentType = "table", $ = s.md.block.ruler.getRules("blockquote"), y = s.push("table_open", "table", 1), y.map = k = [o, 0], y = s.push("thead_open", "thead", 1), y.map = [o, o + 1], y = s.push("tr_open", "tr", 1), y.map = [o, o + 1], l = 0; l < v.length; l++)
      y = s.push("th_open", "th", 1), h[l] && (y.attrs = [["style", "text-align:" + h[l]]]), y = s.push("inline", "", 0), y.content = v[l].trim(), y.children = [], y = s.push("th_close", "th", -1);
    for (y = s.push("tr_close", "tr", -1), y = s.push("thead_close", "thead", -1), f = o + 2; f < i && !(s.sCount[f] < s.blkIndent); f++) {
      for (S = !1, l = 0, m = $.length; l < m; l++)
        if ($[l](s, f, i, !0)) {
          S = !0;
          break;
        }
      if (S || (u = t(s, f).trim(), !u) || s.sCount[f] - s.blkIndent >= 4)
        break;
      for (v = n(u), v.length && v[0] === "" && v.shift(), v.length && v[v.length - 1] === "" && v.pop(), f === o + 2 && (y = s.push("tbody_open", "tbody", 1), y.map = x = [o + 2, 0]), y = s.push("tr_open", "tr", 1), y.map = [f, f + 1], l = 0; l < g; l++)
        y = s.push("td_open", "td", 1), h[l] && (y.attrs = [["style", "text-align:" + h[l]]]), y = s.push("inline", "", 0), y.content = v[l] ? v[l].trim() : "", y.children = [], y = s.push("td_close", "td", -1);
      y = s.push("tr_close", "tr", -1);
    }
    return x && (y = s.push("tbody_close", "tbody", -1), x[1] = f), y = s.push("table_close", "table", -1), k[1] = f, s.parentType = A, s.line = f, !0;
  }, xi;
}
var Ci, uf;
function Bme() {
  return uf || (uf = 1, Ci = function(t, n, r) {
    var s, o, i;
    if (t.sCount[n] - t.blkIndent < 4)
      return !1;
    for (o = s = n + 1; s < r; ) {
      if (t.isEmpty(s)) {
        s++;
        continue;
      }
      if (t.sCount[s] - t.blkIndent >= 4) {
        s++, o = s;
        continue;
      }
      break;
    }
    return t.line = o, i = t.push("code_block", "code", 0), i.content = t.getLines(n, o, 4 + t.blkIndent, !1) + `
`, i.map = [n, t.line], !0;
  }), Ci;
}
var Si, df;
function zme() {
  return df || (df = 1, Si = function(t, n, r, s) {
    var o, i, a, c, u, d, l, m = !1, f = t.bMarks[n] + t.tShift[n], v = t.eMarks[n];
    if (t.sCount[n] - t.blkIndent >= 4 || f + 3 > v || (o = t.src.charCodeAt(f), o !== 126 && o !== 96) || (u = f, f = t.skipChars(f, o), i = f - u, i < 3) || (l = t.src.slice(u, f), a = t.src.slice(f, v), o === 96 && a.indexOf(String.fromCharCode(o)) >= 0))
      return !1;
    if (s)
      return !0;
    for (c = n; c++, !(c >= r || (f = u = t.bMarks[c] + t.tShift[c], v = t.eMarks[c], f < v && t.sCount[c] < t.blkIndent)); )
      if (t.src.charCodeAt(f) === o && !(t.sCount[c] - t.blkIndent >= 4) && (f = t.skipChars(f, o), !(f - u < i) && (f = t.skipSpaces(f), !(f < v)))) {
        m = !0;
        break;
      }
    return i = t.sCount[n], t.line = c + (m ? 1 : 0), d = t.push("fence", "code", 0), d.info = a, d.content = t.getLines(n + 1, c, i, !0), d.markup = l, d.map = [n, t.line], !0;
  }), Si;
}
var Ei, ff;
function Dme() {
  if (ff) return Ei;
  ff = 1;
  var e = Pe().isSpace;
  return Ei = function(n, r, s, o) {
    var i, a, c, u, d, l, m, f, v, g, y, h, w, k, x, A, S, $, M, P, R = n.lineMax, B = n.bMarks[r] + n.tShift[r], j = n.eMarks[r];
    if (n.sCount[r] - n.blkIndent >= 4 || n.src.charCodeAt(B) !== 62)
      return !1;
    if (o)
      return !0;
    for (g = [], y = [], k = [], x = [], $ = n.md.block.ruler.getRules("blockquote"), w = n.parentType, n.parentType = "blockquote", f = r; f < s && (P = n.sCount[f] < n.blkIndent, B = n.bMarks[f] + n.tShift[f], j = n.eMarks[f], !(B >= j)); f++) {
      if (n.src.charCodeAt(B++) === 62 && !P) {
        for (u = n.sCount[f] + 1, n.src.charCodeAt(B) === 32 ? (B++, u++, i = !1, A = !0) : n.src.charCodeAt(B) === 9 ? (A = !0, (n.bsCount[f] + u) % 4 === 3 ? (B++, u++, i = !1) : i = !0) : A = !1, v = u, g.push(n.bMarks[f]), n.bMarks[f] = B; B < j && (a = n.src.charCodeAt(B), e(a)); ) {
          a === 9 ? v += 4 - (v + n.bsCount[f] + (i ? 1 : 0)) % 4 : v++;
          B++;
        }
        l = B >= j, y.push(n.bsCount[f]), n.bsCount[f] = n.sCount[f] + 1 + (A ? 1 : 0), k.push(n.sCount[f]), n.sCount[f] = v - u, x.push(n.tShift[f]), n.tShift[f] = B - n.bMarks[f];
        continue;
      }
      if (l)
        break;
      for (S = !1, c = 0, d = $.length; c < d; c++)
        if ($[c](n, f, s, !0)) {
          S = !0;
          break;
        }
      if (S) {
        n.lineMax = f, n.blkIndent !== 0 && (g.push(n.bMarks[f]), y.push(n.bsCount[f]), x.push(n.tShift[f]), k.push(n.sCount[f]), n.sCount[f] -= n.blkIndent);
        break;
      }
      g.push(n.bMarks[f]), y.push(n.bsCount[f]), x.push(n.tShift[f]), k.push(n.sCount[f]), n.sCount[f] = -1;
    }
    for (h = n.blkIndent, n.blkIndent = 0, M = n.push("blockquote_open", "blockquote", 1), M.markup = ">", M.map = m = [r, 0], n.md.block.tokenize(n, r, f), M = n.push("blockquote_close", "blockquote", -1), M.markup = ">", n.lineMax = R, n.parentType = w, m[1] = n.line, c = 0; c < x.length; c++)
      n.bMarks[c + r] = g[c], n.tShift[c + r] = x[c], n.sCount[c + r] = k[c], n.bsCount[c + r] = y[c];
    return n.blkIndent = h, !0;
  }, Ei;
}
var Ai, pf;
function Nme() {
  if (pf) return Ai;
  pf = 1;
  var e = Pe().isSpace;
  return Ai = function(n, r, s, o) {
    var i, a, c, u, d = n.bMarks[r] + n.tShift[r], l = n.eMarks[r];
    if (n.sCount[r] - n.blkIndent >= 4 || (i = n.src.charCodeAt(d++), i !== 42 && i !== 45 && i !== 95))
      return !1;
    for (a = 1; d < l; ) {
      if (c = n.src.charCodeAt(d++), c !== i && !e(c))
        return !1;
      c === i && a++;
    }
    return a < 3 ? !1 : (o || (n.line = r + 1, u = n.push("hr", "hr", 0), u.map = [r, n.line], u.markup = Array(a + 1).join(String.fromCharCode(i))), !0);
  }, Ai;
}
var $i, hf;
function qme() {
  if (hf) return $i;
  hf = 1;
  var e = Pe().isSpace;
  function t(s, o) {
    var i, a, c, u;
    return a = s.bMarks[o] + s.tShift[o], c = s.eMarks[o], i = s.src.charCodeAt(a++), i !== 42 && i !== 45 && i !== 43 || a < c && (u = s.src.charCodeAt(a), !e(u)) ? -1 : a;
  }
  function n(s, o) {
    var i, a = s.bMarks[o] + s.tShift[o], c = a, u = s.eMarks[o];
    if (c + 1 >= u || (i = s.src.charCodeAt(c++), i < 48 || i > 57))
      return -1;
    for (; ; ) {
      if (c >= u)
        return -1;
      if (i = s.src.charCodeAt(c++), i >= 48 && i <= 57) {
        if (c - a >= 10)
          return -1;
        continue;
      }
      if (i === 41 || i === 46)
        break;
      return -1;
    }
    return c < u && (i = s.src.charCodeAt(c), !e(i)) ? -1 : c;
  }
  function r(s, o) {
    var i, a, c = s.level + 2;
    for (i = o + 2, a = s.tokens.length - 2; i < a; i++)
      s.tokens[i].level === c && s.tokens[i].type === "paragraph_open" && (s.tokens[i + 2].hidden = !0, s.tokens[i].hidden = !0, i += 2);
  }
  return $i = function(o, i, a, c) {
    var u, d, l, m, f, v, g, y, h, w, k, x, A, S, $, M, P, R, B, j, ie, z, Q, N, V, F, G, T = i, W = !1, U = !0;
    if (o.sCount[T] - o.blkIndent >= 4 || o.listIndent >= 0 && o.sCount[T] - o.listIndent >= 4 && o.sCount[T] < o.blkIndent)
      return !1;
    if (c && o.parentType === "paragraph" && o.sCount[T] >= o.blkIndent && (W = !0), (z = n(o, T)) >= 0) {
      if (g = !0, N = o.bMarks[T] + o.tShift[T], A = Number(o.src.slice(N, z - 1)), W && A !== 1) return !1;
    } else if ((z = t(o, T)) >= 0)
      g = !1;
    else
      return !1;
    if (W && o.skipSpaces(z) >= o.eMarks[T])
      return !1;
    if (c)
      return !0;
    for (x = o.src.charCodeAt(z - 1), k = o.tokens.length, g ? (G = o.push("ordered_list_open", "ol", 1), A !== 1 && (G.attrs = [["start", A]])) : G = o.push("bullet_list_open", "ul", 1), G.map = w = [T, 0], G.markup = String.fromCharCode(x), Q = !1, F = o.md.block.ruler.getRules("list"), P = o.parentType, o.parentType = "list"; T < a; ) {
      for (ie = z, S = o.eMarks[T], v = $ = o.sCount[T] + z - (o.bMarks[T] + o.tShift[T]); ie < S; ) {
        if (u = o.src.charCodeAt(ie), u === 9)
          $ += 4 - ($ + o.bsCount[T]) % 4;
        else if (u === 32)
          $++;
        else
          break;
        ie++;
      }
      if (d = ie, d >= S ? f = 1 : f = $ - v, f > 4 && (f = 1), m = v + f, G = o.push("list_item_open", "li", 1), G.markup = String.fromCharCode(x), G.map = y = [T, 0], g && (G.info = o.src.slice(N, z - 1)), j = o.tight, B = o.tShift[T], R = o.sCount[T], M = o.listIndent, o.listIndent = o.blkIndent, o.blkIndent = m, o.tight = !0, o.tShift[T] = d - o.bMarks[T], o.sCount[T] = $, d >= S && o.isEmpty(T + 1) ? o.line = Math.min(o.line + 2, a) : o.md.block.tokenize(o, T, a, !0), (!o.tight || Q) && (U = !1), Q = o.line - T > 1 && o.isEmpty(o.line - 1), o.blkIndent = o.listIndent, o.listIndent = M, o.tShift[T] = B, o.sCount[T] = R, o.tight = j, G = o.push("list_item_close", "li", -1), G.markup = String.fromCharCode(x), T = o.line, y[1] = T, T >= a || o.sCount[T] < o.blkIndent || o.sCount[T] - o.blkIndent >= 4)
        break;
      for (V = !1, l = 0, h = F.length; l < h; l++)
        if (F[l](o, T, a, !0)) {
          V = !0;
          break;
        }
      if (V)
        break;
      if (g) {
        if (z = n(o, T), z < 0)
          break;
        N = o.bMarks[T] + o.tShift[T];
      } else if (z = t(o, T), z < 0)
        break;
      if (x !== o.src.charCodeAt(z - 1))
        break;
    }
    return g ? G = o.push("ordered_list_close", "ol", -1) : G = o.push("bullet_list_close", "ul", -1), G.markup = String.fromCharCode(x), w[1] = T, o.line = T, o.parentType = P, U && r(o, k), !0;
  }, $i;
}
var Mi, gf;
function Fme() {
  if (gf) return Mi;
  gf = 1;
  var e = Pe().normalizeReference, t = Pe().isSpace;
  return Mi = function(r, s, o, i) {
    var a, c, u, d, l, m, f, v, g, y, h, w, k, x, A, S, $ = 0, M = r.bMarks[s] + r.tShift[s], P = r.eMarks[s], R = s + 1;
    if (r.sCount[s] - r.blkIndent >= 4 || r.src.charCodeAt(M) !== 91)
      return !1;
    for (; ++M < P; )
      if (r.src.charCodeAt(M) === 93 && r.src.charCodeAt(M - 1) !== 92) {
        if (M + 1 === P || r.src.charCodeAt(M + 1) !== 58)
          return !1;
        break;
      }
    for (d = r.lineMax, A = r.md.block.ruler.getRules("reference"), y = r.parentType, r.parentType = "reference"; R < d && !r.isEmpty(R); R++)
      if (!(r.sCount[R] - r.blkIndent > 3) && !(r.sCount[R] < 0)) {
        for (x = !1, m = 0, f = A.length; m < f; m++)
          if (A[m](r, R, d, !0)) {
            x = !0;
            break;
          }
        if (x)
          break;
      }
    for (k = r.getLines(s, R, r.blkIndent, !1).trim(), P = k.length, M = 1; M < P; M++) {
      if (a = k.charCodeAt(M), a === 91)
        return !1;
      if (a === 93) {
        g = M;
        break;
      } else a === 10 ? $++ : a === 92 && (M++, M < P && k.charCodeAt(M) === 10 && $++);
    }
    if (g < 0 || k.charCodeAt(g + 1) !== 58)
      return !1;
    for (M = g + 2; M < P; M++)
      if (a = k.charCodeAt(M), a === 10)
        $++;
      else if (!t(a)) break;
    if (h = r.md.helpers.parseLinkDestination(k, M, P), !h.ok || (l = r.md.normalizeLink(h.str), !r.md.validateLink(l)))
      return !1;
    for (M = h.pos, $ += h.lines, c = M, u = $, w = M; M < P; M++)
      if (a = k.charCodeAt(M), a === 10)
        $++;
      else if (!t(a)) break;
    for (h = r.md.helpers.parseLinkTitle(k, M, P), M < P && w !== M && h.ok ? (S = h.str, M = h.pos, $ += h.lines) : (S = "", M = c, $ = u); M < P && (a = k.charCodeAt(M), !!t(a)); )
      M++;
    if (M < P && k.charCodeAt(M) !== 10 && S)
      for (S = "", M = c, $ = u; M < P && (a = k.charCodeAt(M), !!t(a)); )
        M++;
    return M < P && k.charCodeAt(M) !== 10 || (v = e(k.slice(1, g)), !v) ? !1 : (i || (typeof r.env.references > "u" && (r.env.references = {}), typeof r.env.references[v] > "u" && (r.env.references[v] = { title: S, href: l }), r.parentType = y, r.line = s + $ + 1), !0);
  }, Mi;
}
var Ii, mf;
function Hme() {
  return mf || (mf = 1, Ii = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "section",
    "source",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ]), Ii;
}
var $o = {}, vf;
function fm() {
  if (vf) return $o;
  vf = 1;
  var e = "[a-zA-Z_:][a-zA-Z0-9:._-]*", t = "[^\"'=<>`\\x00-\\x20]+", n = "'[^']*'", r = '"[^"]*"', s = "(?:" + t + "|" + n + "|" + r + ")", o = "(?:\\s+" + e + "(?:\\s*=\\s*" + s + ")?)", i = "<[A-Za-z][A-Za-z0-9\\-]*" + o + "*\\s*\\/?>", a = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", c = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->", u = "<[?][\\s\\S]*?[?]>", d = "<![A-Z]+\\s+[^>]*>", l = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", m = new RegExp("^(?:" + i + "|" + a + "|" + c + "|" + u + "|" + d + "|" + l + ")"), f = new RegExp("^(?:" + i + "|" + a + ")");
  return $o.HTML_TAG_RE = m, $o.HTML_OPEN_CLOSE_TAG_RE = f, $o;
}
var Ti, _f;
function jme() {
  if (_f) return Ti;
  _f = 1;
  var e = Hme(), t = fm().HTML_OPEN_CLOSE_TAG_RE, n = [
    [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
    [/^<!--/, /-->/, !0],
    [/^<\?/, /\?>/, !0],
    [/^<![A-Z]/, />/, !0],
    [/^<!\[CDATA\[/, /\]\]>/, !0],
    [new RegExp("^</?(" + e.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
    [new RegExp(t.source + "\\s*$"), /^$/, !1]
  ];
  return Ti = function(s, o, i, a) {
    var c, u, d, l, m = s.bMarks[o] + s.tShift[o], f = s.eMarks[o];
    if (s.sCount[o] - s.blkIndent >= 4 || !s.md.options.html || s.src.charCodeAt(m) !== 60)
      return !1;
    for (l = s.src.slice(m, f), c = 0; c < n.length && !n[c][0].test(l); c++)
      ;
    if (c === n.length)
      return !1;
    if (a)
      return n[c][2];
    if (u = o + 1, !n[c][1].test(l)) {
      for (; u < i && !(s.sCount[u] < s.blkIndent); u++)
        if (m = s.bMarks[u] + s.tShift[u], f = s.eMarks[u], l = s.src.slice(m, f), n[c][1].test(l)) {
          l.length !== 0 && u++;
          break;
        }
    }
    return s.line = u, d = s.push("html_block", "", 0), d.map = [o, u], d.content = s.getLines(o, u, s.blkIndent, !0), !0;
  }, Ti;
}
var Li, bf;
function Vme() {
  if (bf) return Li;
  bf = 1;
  var e = Pe().isSpace;
  return Li = function(n, r, s, o) {
    var i, a, c, u, d = n.bMarks[r] + n.tShift[r], l = n.eMarks[r];
    if (n.sCount[r] - n.blkIndent >= 4 || (i = n.src.charCodeAt(d), i !== 35 || d >= l))
      return !1;
    for (a = 1, i = n.src.charCodeAt(++d); i === 35 && d < l && a <= 6; )
      a++, i = n.src.charCodeAt(++d);
    return a > 6 || d < l && !e(i) ? !1 : (o || (l = n.skipSpacesBack(l, d), c = n.skipCharsBack(l, 35, d), c > d && e(n.src.charCodeAt(c - 1)) && (l = c), n.line = r + 1, u = n.push("heading_open", "h" + String(a), 1), u.markup = "########".slice(0, a), u.map = [r, n.line], u = n.push("inline", "", 0), u.content = n.src.slice(d, l).trim(), u.map = [r, n.line], u.children = [], u = n.push("heading_close", "h" + String(a), -1), u.markup = "########".slice(0, a)), !0);
  }, Li;
}
var Oi, yf;
function Ume() {
  return yf || (yf = 1, Oi = function(t, n, r) {
    var s, o, i, a, c, u, d, l, m, f = n + 1, v, g = t.md.block.ruler.getRules("paragraph");
    if (t.sCount[n] - t.blkIndent >= 4)
      return !1;
    for (v = t.parentType, t.parentType = "paragraph"; f < r && !t.isEmpty(f); f++)
      if (!(t.sCount[f] - t.blkIndent > 3)) {
        if (t.sCount[f] >= t.blkIndent && (u = t.bMarks[f] + t.tShift[f], d = t.eMarks[f], u < d && (m = t.src.charCodeAt(u), (m === 45 || m === 61) && (u = t.skipChars(u, m), u = t.skipSpaces(u), u >= d)))) {
          l = m === 61 ? 1 : 2;
          break;
        }
        if (!(t.sCount[f] < 0)) {
          for (o = !1, i = 0, a = g.length; i < a; i++)
            if (g[i](t, f, r, !0)) {
              o = !0;
              break;
            }
          if (o)
            break;
        }
      }
    return l ? (s = t.getLines(n, f, t.blkIndent, !1).trim(), t.line = f + 1, c = t.push("heading_open", "h" + String(l), 1), c.markup = String.fromCharCode(m), c.map = [n, t.line], c = t.push("inline", "", 0), c.content = s, c.map = [n, t.line - 1], c.children = [], c = t.push("heading_close", "h" + String(l), -1), c.markup = String.fromCharCode(m), t.parentType = v, !0) : !1;
  }), Oi;
}
var Ri, wf;
function Zme() {
  return wf || (wf = 1, Ri = function(t, n, r) {
    var s, o, i, a, c, u, d = n + 1, l = t.md.block.ruler.getRules("paragraph");
    for (u = t.parentType, t.parentType = "paragraph"; d < r && !t.isEmpty(d); d++)
      if (!(t.sCount[d] - t.blkIndent > 3) && !(t.sCount[d] < 0)) {
        for (o = !1, i = 0, a = l.length; i < a; i++)
          if (l[i](t, d, r, !0)) {
            o = !0;
            break;
          }
        if (o)
          break;
      }
    return s = t.getLines(n, d, t.blkIndent, !1).trim(), t.line = d, c = t.push("paragraph_open", "p", 1), c.map = [n, t.line], c = t.push("inline", "", 0), c.content = s, c.map = [n, t.line], c.children = [], c = t.push("paragraph_close", "p", -1), t.parentType = u, !0;
  }), Ri;
}
var Pi, kf;
function Wme() {
  if (kf) return Pi;
  kf = 1;
  var e = $l(), t = Pe().isSpace;
  function n(r, s, o, i) {
    var a, c, u, d, l, m, f, v;
    for (this.src = r, this.md = s, this.env = o, this.tokens = i, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", c = this.src, v = !1, u = d = m = f = 0, l = c.length; d < l; d++) {
      if (a = c.charCodeAt(d), !v)
        if (t(a)) {
          m++, a === 9 ? f += 4 - f % 4 : f++;
          continue;
        } else
          v = !0;
      (a === 10 || d === l - 1) && (a !== 10 && d++, this.bMarks.push(u), this.eMarks.push(d), this.tShift.push(m), this.sCount.push(f), this.bsCount.push(0), v = !1, m = 0, f = 0, u = d + 1);
    }
    this.bMarks.push(c.length), this.eMarks.push(c.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
  }
  return n.prototype.push = function(r, s, o) {
    var i = new e(r, s, o);
    return i.block = !0, o < 0 && this.level--, i.level = this.level, o > 0 && this.level++, this.tokens.push(i), i;
  }, n.prototype.isEmpty = function(s) {
    return this.bMarks[s] + this.tShift[s] >= this.eMarks[s];
  }, n.prototype.skipEmptyLines = function(s) {
    for (var o = this.lineMax; s < o && !(this.bMarks[s] + this.tShift[s] < this.eMarks[s]); s++)
      ;
    return s;
  }, n.prototype.skipSpaces = function(s) {
    for (var o, i = this.src.length; s < i && (o = this.src.charCodeAt(s), !!t(o)); s++)
      ;
    return s;
  }, n.prototype.skipSpacesBack = function(s, o) {
    if (s <= o)
      return s;
    for (; s > o; )
      if (!t(this.src.charCodeAt(--s)))
        return s + 1;
    return s;
  }, n.prototype.skipChars = function(s, o) {
    for (var i = this.src.length; s < i && this.src.charCodeAt(s) === o; s++)
      ;
    return s;
  }, n.prototype.skipCharsBack = function(s, o, i) {
    if (s <= i)
      return s;
    for (; s > i; )
      if (o !== this.src.charCodeAt(--s))
        return s + 1;
    return s;
  }, n.prototype.getLines = function(s, o, i, a) {
    var c, u, d, l, m, f, v, g = s;
    if (s >= o)
      return "";
    for (f = new Array(o - s), c = 0; g < o; g++, c++) {
      for (u = 0, v = l = this.bMarks[g], g + 1 < o || a ? m = this.eMarks[g] + 1 : m = this.eMarks[g]; l < m && u < i; ) {
        if (d = this.src.charCodeAt(l), t(d))
          d === 9 ? u += 4 - (u + this.bsCount[g]) % 4 : u++;
        else if (l - v < this.tShift[g])
          u++;
        else
          break;
        l++;
      }
      u > i ? f[c] = new Array(u - i + 1).join(" ") + this.src.slice(l, m) : f[c] = this.src.slice(l, m);
    }
    return f.join("");
  }, n.prototype.Token = e, Pi = n, Pi;
}
var Bi, xf;
function Gme() {
  if (xf) return Bi;
  xf = 1;
  var e = Al(), t = [
    // First 2 params - rule name & source. Secondary array - list of rules,
    // which can be terminated by this one.
    ["table", Pme(), ["paragraph", "reference"]],
    ["code", Bme()],
    ["fence", zme(), ["paragraph", "reference", "blockquote", "list"]],
    ["blockquote", Dme(), ["paragraph", "reference", "blockquote", "list"]],
    ["hr", Nme(), ["paragraph", "reference", "blockquote", "list"]],
    ["list", qme(), ["paragraph", "reference", "blockquote"]],
    ["reference", Fme()],
    ["html_block", jme(), ["paragraph", "reference", "blockquote"]],
    ["heading", Vme(), ["paragraph", "reference", "blockquote"]],
    ["lheading", Ume()],
    ["paragraph", Zme()]
  ];
  function n() {
    this.ruler = new e();
    for (var r = 0; r < t.length; r++)
      this.ruler.push(t[r][0], t[r][1], { alt: (t[r][2] || []).slice() });
  }
  return n.prototype.tokenize = function(r, s, o) {
    for (var i, a, c, u = this.ruler.getRules(""), d = u.length, l = s, m = !1, f = r.md.options.maxNesting; l < o && (r.line = l = r.skipEmptyLines(l), !(l >= o || r.sCount[l] < r.blkIndent)); ) {
      if (r.level >= f) {
        r.line = o;
        break;
      }
      for (c = r.line, a = 0; a < d; a++)
        if (i = u[a](r, l, o, !1), i) {
          if (c >= r.line)
            throw new Error("block rule didn't increment state.line");
          break;
        }
      if (!i) throw new Error("none of the block rules matched");
      r.tight = !m, r.isEmpty(r.line - 1) && (m = !0), l = r.line, l < o && r.isEmpty(l) && (m = !0, l++, r.line = l);
    }
  }, n.prototype.parse = function(r, s, o, i) {
    var a;
    r && (a = new this.State(r, s, o, i), this.tokenize(a, a.line, a.lineMax));
  }, n.prototype.State = Wme(), Bi = n, Bi;
}
var zi, Cf;
function Kme() {
  if (Cf) return zi;
  Cf = 1;
  function e(t) {
    switch (t) {
      case 10:
      case 33:
      case 35:
      case 36:
      case 37:
      case 38:
      case 42:
      case 43:
      case 45:
      case 58:
      case 60:
      case 61:
      case 62:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 125:
      case 126:
        return !0;
      default:
        return !1;
    }
  }
  return zi = function(n, r) {
    for (var s = n.pos; s < n.posMax && !e(n.src.charCodeAt(s)); )
      s++;
    return s === n.pos ? !1 : (r || (n.pending += n.src.slice(n.pos, s)), n.pos = s, !0);
  }, zi;
}
var Di, Sf;
function Xme() {
  if (Sf) return Di;
  Sf = 1;
  var e = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
  return Di = function(n, r) {
    var s, o, i, a, c, u, d, l;
    return !n.md.options.linkify || n.linkLevel > 0 || (s = n.pos, o = n.posMax, s + 3 > o) || n.src.charCodeAt(s) !== 58 || n.src.charCodeAt(s + 1) !== 47 || n.src.charCodeAt(s + 2) !== 47 || (i = n.pending.match(e), !i) || (a = i[1], c = n.md.linkify.matchAtStart(n.src.slice(s - a.length)), !c) || (u = c.url, u.length <= a.length) || (u = u.replace(/\*+$/, ""), d = n.md.normalizeLink(u), !n.md.validateLink(d)) ? !1 : (r || (n.pending = n.pending.slice(0, -a.length), l = n.push("link_open", "a", 1), l.attrs = [["href", d]], l.markup = "linkify", l.info = "auto", l = n.push("text", "", 0), l.content = n.md.normalizeLinkText(u), l = n.push("link_close", "a", -1), l.markup = "linkify", l.info = "auto"), n.pos += u.length - a.length, !0);
  }, Di;
}
var Ni, Ef;
function Yme() {
  if (Ef) return Ni;
  Ef = 1;
  var e = Pe().isSpace;
  return Ni = function(n, r) {
    var s, o, i, a = n.pos;
    if (n.src.charCodeAt(a) !== 10)
      return !1;
    if (s = n.pending.length - 1, o = n.posMax, !r)
      if (s >= 0 && n.pending.charCodeAt(s) === 32)
        if (s >= 1 && n.pending.charCodeAt(s - 1) === 32) {
          for (i = s - 1; i >= 1 && n.pending.charCodeAt(i - 1) === 32; ) i--;
          n.pending = n.pending.slice(0, i), n.push("hardbreak", "br", 0);
        } else
          n.pending = n.pending.slice(0, -1), n.push("softbreak", "br", 0);
      else
        n.push("softbreak", "br", 0);
    for (a++; a < o && e(n.src.charCodeAt(a)); )
      a++;
    return n.pos = a, !0;
  }, Ni;
}
var qi, Af;
function Jme() {
  if (Af) return qi;
  Af = 1;
  for (var e = Pe().isSpace, t = [], n = 0; n < 256; n++)
    t.push(0);
  return "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(r) {
    t[r.charCodeAt(0)] = 1;
  }), qi = function(s, o) {
    var i, a, c, u, d, l = s.pos, m = s.posMax;
    if (s.src.charCodeAt(l) !== 92 || (l++, l >= m)) return !1;
    if (i = s.src.charCodeAt(l), i === 10) {
      for (o || s.push("hardbreak", "br", 0), l++; l < m && (i = s.src.charCodeAt(l), !!e(i)); )
        l++;
      return s.pos = l, !0;
    }
    return u = s.src[l], i >= 55296 && i <= 56319 && l + 1 < m && (a = s.src.charCodeAt(l + 1), a >= 56320 && a <= 57343 && (u += s.src[l + 1], l++)), c = "\\" + u, o || (d = s.push("text_special", "", 0), i < 256 && t[i] !== 0 ? d.content = u : d.content = c, d.markup = c, d.info = "escape"), s.pos = l + 1, !0;
  }, qi;
}
var Fi, $f;
function Qme() {
  return $f || ($f = 1, Fi = function(t, n) {
    var r, s, o, i, a, c, u, d, l = t.pos, m = t.src.charCodeAt(l);
    if (m !== 96)
      return !1;
    for (r = l, l++, s = t.posMax; l < s && t.src.charCodeAt(l) === 96; )
      l++;
    if (o = t.src.slice(r, l), u = o.length, t.backticksScanned && (t.backticks[u] || 0) <= r)
      return n || (t.pending += o), t.pos += u, !0;
    for (c = l; (a = t.src.indexOf("`", c)) !== -1; ) {
      for (c = a + 1; c < s && t.src.charCodeAt(c) === 96; )
        c++;
      if (d = c - a, d === u)
        return n || (i = t.push("code_inline", "code", 0), i.markup = o, i.content = t.src.slice(l, a).replace(/\n/g, " ").replace(/^ (.+) $/, "$1")), t.pos = c, !0;
      t.backticks[d] = a;
    }
    return t.backticksScanned = !0, n || (t.pending += o), t.pos += u, !0;
  }), Fi;
}
var Mo = {}, Mf;
function If() {
  if (Mf) return Mo;
  Mf = 1, Mo.tokenize = function(n, r) {
    var s, o, i, a, c, u = n.pos, d = n.src.charCodeAt(u);
    if (r || d !== 126 || (o = n.scanDelims(n.pos, !0), a = o.length, c = String.fromCharCode(d), a < 2))
      return !1;
    for (a % 2 && (i = n.push("text", "", 0), i.content = c, a--), s = 0; s < a; s += 2)
      i = n.push("text", "", 0), i.content = c + c, n.delimiters.push({
        marker: d,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        token: n.tokens.length - 1,
        end: -1,
        open: o.can_open,
        close: o.can_close
      });
    return n.pos += o.length, !0;
  };
  function e(t, n) {
    var r, s, o, i, a, c = [], u = n.length;
    for (r = 0; r < u; r++)
      o = n[r], o.marker === 126 && o.end !== -1 && (i = n[o.end], a = t.tokens[o.token], a.type = "s_open", a.tag = "s", a.nesting = 1, a.markup = "~~", a.content = "", a = t.tokens[i.token], a.type = "s_close", a.tag = "s", a.nesting = -1, a.markup = "~~", a.content = "", t.tokens[i.token - 1].type === "text" && t.tokens[i.token - 1].content === "~" && c.push(i.token - 1));
    for (; c.length; ) {
      for (r = c.pop(), s = r + 1; s < t.tokens.length && t.tokens[s].type === "s_close"; )
        s++;
      s--, r !== s && (a = t.tokens[s], t.tokens[s] = t.tokens[r], t.tokens[r] = a);
    }
  }
  return Mo.postProcess = function(n) {
    var r, s = n.tokens_meta, o = n.tokens_meta.length;
    for (e(n, n.delimiters), r = 0; r < o; r++)
      s[r] && s[r].delimiters && e(n, s[r].delimiters);
  }, Mo;
}
var Io = {}, Tf;
function Lf() {
  if (Tf) return Io;
  Tf = 1, Io.tokenize = function(n, r) {
    var s, o, i, a = n.pos, c = n.src.charCodeAt(a);
    if (r || c !== 95 && c !== 42)
      return !1;
    for (o = n.scanDelims(n.pos, c === 42), s = 0; s < o.length; s++)
      i = n.push("text", "", 0), i.content = String.fromCharCode(c), n.delimiters.push({
        // Char code of the starting marker (number).
        //
        marker: c,
        // Total length of these series of delimiters.
        //
        length: o.length,
        // A position of the token this delimiter corresponds to.
        //
        token: n.tokens.length - 1,
        // If this delimiter is matched as a valid opener, `end` will be
        // equal to its position, otherwise it's `-1`.
        //
        end: -1,
        // Boolean flags that determine if this delimiter could open or close
        // an emphasis.
        //
        open: o.can_open,
        close: o.can_close
      });
    return n.pos += o.length, !0;
  };
  function e(t, n) {
    var r, s, o, i, a, c, u = n.length;
    for (r = u - 1; r >= 0; r--)
      s = n[r], !(s.marker !== 95 && s.marker !== 42) && s.end !== -1 && (o = n[s.end], c = r > 0 && n[r - 1].end === s.end + 1 && // check that first two markers match and adjacent
      n[r - 1].marker === s.marker && n[r - 1].token === s.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
      n[s.end + 1].token === o.token + 1, a = String.fromCharCode(s.marker), i = t.tokens[s.token], i.type = c ? "strong_open" : "em_open", i.tag = c ? "strong" : "em", i.nesting = 1, i.markup = c ? a + a : a, i.content = "", i = t.tokens[o.token], i.type = c ? "strong_close" : "em_close", i.tag = c ? "strong" : "em", i.nesting = -1, i.markup = c ? a + a : a, i.content = "", c && (t.tokens[n[r - 1].token].content = "", t.tokens[n[s.end + 1].token].content = "", r--));
  }
  return Io.postProcess = function(n) {
    var r, s = n.tokens_meta, o = n.tokens_meta.length;
    for (e(n, n.delimiters), r = 0; r < o; r++)
      s[r] && s[r].delimiters && e(n, s[r].delimiters);
  }, Io;
}
var Hi, Of;
function eve() {
  if (Of) return Hi;
  Of = 1;
  var e = Pe().normalizeReference, t = Pe().isSpace;
  return Hi = function(r, s) {
    var o, i, a, c, u, d, l, m, f, v = "", g = "", y = r.pos, h = r.posMax, w = r.pos, k = !0;
    if (r.src.charCodeAt(r.pos) !== 91 || (u = r.pos + 1, c = r.md.helpers.parseLinkLabel(r, r.pos, !0), c < 0))
      return !1;
    if (d = c + 1, d < h && r.src.charCodeAt(d) === 40) {
      for (k = !1, d++; d < h && (i = r.src.charCodeAt(d), !(!t(i) && i !== 10)); d++)
        ;
      if (d >= h)
        return !1;
      if (w = d, l = r.md.helpers.parseLinkDestination(r.src, d, r.posMax), l.ok) {
        for (v = r.md.normalizeLink(l.str), r.md.validateLink(v) ? d = l.pos : v = "", w = d; d < h && (i = r.src.charCodeAt(d), !(!t(i) && i !== 10)); d++)
          ;
        if (l = r.md.helpers.parseLinkTitle(r.src, d, r.posMax), d < h && w !== d && l.ok)
          for (g = l.str, d = l.pos; d < h && (i = r.src.charCodeAt(d), !(!t(i) && i !== 10)); d++)
            ;
      }
      (d >= h || r.src.charCodeAt(d) !== 41) && (k = !0), d++;
    }
    if (k) {
      if (typeof r.env.references > "u")
        return !1;
      if (d < h && r.src.charCodeAt(d) === 91 ? (w = d + 1, d = r.md.helpers.parseLinkLabel(r, d), d >= 0 ? a = r.src.slice(w, d++) : d = c + 1) : d = c + 1, a || (a = r.src.slice(u, c)), m = r.env.references[e(a)], !m)
        return r.pos = y, !1;
      v = m.href, g = m.title;
    }
    return s || (r.pos = u, r.posMax = c, f = r.push("link_open", "a", 1), f.attrs = o = [["href", v]], g && o.push(["title", g]), r.linkLevel++, r.md.inline.tokenize(r), r.linkLevel--, f = r.push("link_close", "a", -1)), r.pos = d, r.posMax = h, !0;
  }, Hi;
}
var ji, Rf;
function tve() {
  if (Rf) return ji;
  Rf = 1;
  var e = Pe().normalizeReference, t = Pe().isSpace;
  return ji = function(r, s) {
    var o, i, a, c, u, d, l, m, f, v, g, y, h, w = "", k = r.pos, x = r.posMax;
    if (r.src.charCodeAt(r.pos) !== 33 || r.src.charCodeAt(r.pos + 1) !== 91 || (d = r.pos + 2, u = r.md.helpers.parseLinkLabel(r, r.pos + 1, !1), u < 0))
      return !1;
    if (l = u + 1, l < x && r.src.charCodeAt(l) === 40) {
      for (l++; l < x && (i = r.src.charCodeAt(l), !(!t(i) && i !== 10)); l++)
        ;
      if (l >= x)
        return !1;
      for (h = l, f = r.md.helpers.parseLinkDestination(r.src, l, r.posMax), f.ok && (w = r.md.normalizeLink(f.str), r.md.validateLink(w) ? l = f.pos : w = ""), h = l; l < x && (i = r.src.charCodeAt(l), !(!t(i) && i !== 10)); l++)
        ;
      if (f = r.md.helpers.parseLinkTitle(r.src, l, r.posMax), l < x && h !== l && f.ok)
        for (v = f.str, l = f.pos; l < x && (i = r.src.charCodeAt(l), !(!t(i) && i !== 10)); l++)
          ;
      else
        v = "";
      if (l >= x || r.src.charCodeAt(l) !== 41)
        return r.pos = k, !1;
      l++;
    } else {
      if (typeof r.env.references > "u")
        return !1;
      if (l < x && r.src.charCodeAt(l) === 91 ? (h = l + 1, l = r.md.helpers.parseLinkLabel(r, l), l >= 0 ? c = r.src.slice(h, l++) : l = u + 1) : l = u + 1, c || (c = r.src.slice(d, u)), m = r.env.references[e(c)], !m)
        return r.pos = k, !1;
      w = m.href, v = m.title;
    }
    return s || (a = r.src.slice(d, u), r.md.inline.parse(
      a,
      r.md,
      r.env,
      y = []
    ), g = r.push("image", "img", 0), g.attrs = o = [["src", w], ["alt", ""]], g.children = y, g.content = a, v && o.push(["title", v])), r.pos = l, r.posMax = x, !0;
  }, ji;
}
var Vi, Pf;
function nve() {
  if (Pf) return Vi;
  Pf = 1;
  var e = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, t = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
  return Vi = function(r, s) {
    var o, i, a, c, u, d, l = r.pos;
    if (r.src.charCodeAt(l) !== 60)
      return !1;
    for (u = r.pos, d = r.posMax; ; ) {
      if (++l >= d || (c = r.src.charCodeAt(l), c === 60)) return !1;
      if (c === 62) break;
    }
    return o = r.src.slice(u + 1, l), t.test(o) ? (i = r.md.normalizeLink(o), r.md.validateLink(i) ? (s || (a = r.push("link_open", "a", 1), a.attrs = [["href", i]], a.markup = "autolink", a.info = "auto", a = r.push("text", "", 0), a.content = r.md.normalizeLinkText(o), a = r.push("link_close", "a", -1), a.markup = "autolink", a.info = "auto"), r.pos += o.length + 2, !0) : !1) : e.test(o) ? (i = r.md.normalizeLink("mailto:" + o), r.md.validateLink(i) ? (s || (a = r.push("link_open", "a", 1), a.attrs = [["href", i]], a.markup = "autolink", a.info = "auto", a = r.push("text", "", 0), a.content = r.md.normalizeLinkText(o), a = r.push("link_close", "a", -1), a.markup = "autolink", a.info = "auto"), r.pos += o.length + 2, !0) : !1) : !1;
  }, Vi;
}
var Ui, Bf;
function rve() {
  if (Bf) return Ui;
  Bf = 1;
  var e = fm().HTML_TAG_RE;
  function t(s) {
    return /^<a[>\s]/i.test(s);
  }
  function n(s) {
    return /^<\/a\s*>/i.test(s);
  }
  function r(s) {
    var o = s | 32;
    return o >= 97 && o <= 122;
  }
  return Ui = function(o, i) {
    var a, c, u, d, l = o.pos;
    return !o.md.options.html || (u = o.posMax, o.src.charCodeAt(l) !== 60 || l + 2 >= u) || (a = o.src.charCodeAt(l + 1), a !== 33 && a !== 63 && a !== 47 && !r(a)) || (c = o.src.slice(l).match(e), !c) ? !1 : (i || (d = o.push("html_inline", "", 0), d.content = c[0], t(d.content) && o.linkLevel++, n(d.content) && o.linkLevel--), o.pos += c[0].length, !0);
  }, Ui;
}
var Zi, zf;
function ove() {
  if (zf) return Zi;
  zf = 1;
  var e = am(), t = Pe().has, n = Pe().isValidEntityCode, r = Pe().fromCodePoint, s = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, o = /^&([a-z][a-z0-9]{1,31});/i;
  return Zi = function(a, c) {
    var u, d, l, m, f = a.pos, v = a.posMax;
    if (a.src.charCodeAt(f) !== 38 || f + 1 >= v) return !1;
    if (u = a.src.charCodeAt(f + 1), u === 35) {
      if (l = a.src.slice(f).match(s), l)
        return c || (d = l[1][0].toLowerCase() === "x" ? parseInt(l[1].slice(1), 16) : parseInt(l[1], 10), m = a.push("text_special", "", 0), m.content = n(d) ? r(d) : r(65533), m.markup = l[0], m.info = "entity"), a.pos += l[0].length, !0;
    } else if (l = a.src.slice(f).match(o), l && t(e, l[1]))
      return c || (m = a.push("text_special", "", 0), m.content = e[l[1]], m.markup = l[0], m.info = "entity"), a.pos += l[0].length, !0;
    return !1;
  }, Zi;
}
var Wi, Df;
function sve() {
  if (Df) return Wi;
  Df = 1;
  function e(t) {
    var n, r, s, o, i, a, c, u, d = {}, l = t.length;
    if (l) {
      var m = 0, f = -2, v = [];
      for (n = 0; n < l; n++)
        if (s = t[n], v.push(0), (t[m].marker !== s.marker || f !== s.token - 1) && (m = n), f = s.token, s.length = s.length || 0, !!s.close) {
          for (d.hasOwnProperty(s.marker) || (d[s.marker] = [-1, -1, -1, -1, -1, -1]), i = d[s.marker][(s.open ? 3 : 0) + s.length % 3], r = m - v[m] - 1, a = r; r > i; r -= v[r] + 1)
            if (o = t[r], o.marker === s.marker && o.open && o.end < 0 && (c = !1, (o.close || s.open) && (o.length + s.length) % 3 === 0 && (o.length % 3 !== 0 || s.length % 3 !== 0) && (c = !0), !c)) {
              u = r > 0 && !t[r - 1].open ? v[r - 1] + 1 : 0, v[n] = n - r + u, v[r] = u, s.open = !1, o.end = n, o.close = !1, a = -1, f = -2;
              break;
            }
          a !== -1 && (d[s.marker][(s.open ? 3 : 0) + (s.length || 0) % 3] = a);
        }
    }
  }
  return Wi = function(n) {
    var r, s = n.tokens_meta, o = n.tokens_meta.length;
    for (e(n.delimiters), r = 0; r < o; r++)
      s[r] && s[r].delimiters && e(s[r].delimiters);
  }, Wi;
}
var Gi, Nf;
function ive() {
  return Nf || (Nf = 1, Gi = function(t) {
    var n, r, s = 0, o = t.tokens, i = t.tokens.length;
    for (n = r = 0; n < i; n++)
      o[n].nesting < 0 && s--, o[n].level = s, o[n].nesting > 0 && s++, o[n].type === "text" && n + 1 < i && o[n + 1].type === "text" ? o[n + 1].content = o[n].content + o[n + 1].content : (n !== r && (o[r] = o[n]), r++);
    n !== r && (o.length = r);
  }), Gi;
}
var Ki, qf;
function ave() {
  if (qf) return Ki;
  qf = 1;
  var e = $l(), t = Pe().isWhiteSpace, n = Pe().isPunctChar, r = Pe().isMdAsciiPunct;
  function s(o, i, a, c) {
    this.src = o, this.env = a, this.md = i, this.tokens = c, this.tokens_meta = Array(c.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
  }
  return s.prototype.pushPending = function() {
    var o = new e("text", "", 0);
    return o.content = this.pending, o.level = this.pendingLevel, this.tokens.push(o), this.pending = "", o;
  }, s.prototype.push = function(o, i, a) {
    this.pending && this.pushPending();
    var c = new e(o, i, a), u = null;
    return a < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), c.level = this.level, a > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], u = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(c), this.tokens_meta.push(u), c;
  }, s.prototype.scanDelims = function(o, i) {
    var a = o, c, u, d, l, m, f, v, g, y, h = !0, w = !0, k = this.posMax, x = this.src.charCodeAt(o);
    for (c = o > 0 ? this.src.charCodeAt(o - 1) : 32; a < k && this.src.charCodeAt(a) === x; )
      a++;
    return d = a - o, u = a < k ? this.src.charCodeAt(a) : 32, v = r(c) || n(String.fromCharCode(c)), y = r(u) || n(String.fromCharCode(u)), f = t(c), g = t(u), g ? h = !1 : y && (f || v || (h = !1)), f ? w = !1 : v && (g || y || (w = !1)), i ? (l = h, m = w) : (l = h && (!w || v), m = w && (!h || y)), {
      can_open: l,
      can_close: m,
      length: d
    };
  }, s.prototype.Token = e, Ki = s, Ki;
}
var Xi, Ff;
function cve() {
  if (Ff) return Xi;
  Ff = 1;
  var e = Al(), t = [
    ["text", Kme()],
    ["linkify", Xme()],
    ["newline", Yme()],
    ["escape", Jme()],
    ["backticks", Qme()],
    ["strikethrough", If().tokenize],
    ["emphasis", Lf().tokenize],
    ["link", eve()],
    ["image", tve()],
    ["autolink", nve()],
    ["html_inline", rve()],
    ["entity", ove()]
  ], n = [
    ["balance_pairs", sve()],
    ["strikethrough", If().postProcess],
    ["emphasis", Lf().postProcess],
    // rules for pairs separate '**' into its own text tokens, which may be left unused,
    // rule below merges unused segments back with the rest of the text
    ["fragments_join", ive()]
  ];
  function r() {
    var s;
    for (this.ruler = new e(), s = 0; s < t.length; s++)
      this.ruler.push(t[s][0], t[s][1]);
    for (this.ruler2 = new e(), s = 0; s < n.length; s++)
      this.ruler2.push(n[s][0], n[s][1]);
  }
  return r.prototype.skipToken = function(s) {
    var o, i, a = s.pos, c = this.ruler.getRules(""), u = c.length, d = s.md.options.maxNesting, l = s.cache;
    if (typeof l[a] < "u") {
      s.pos = l[a];
      return;
    }
    if (s.level < d) {
      for (i = 0; i < u; i++)
        if (s.level++, o = c[i](s, !0), s.level--, o) {
          if (a >= s.pos)
            throw new Error("inline rule didn't increment state.pos");
          break;
        }
    } else
      s.pos = s.posMax;
    o || s.pos++, l[a] = s.pos;
  }, r.prototype.tokenize = function(s) {
    for (var o, i, a, c = this.ruler.getRules(""), u = c.length, d = s.posMax, l = s.md.options.maxNesting; s.pos < d; ) {
      if (a = s.pos, s.level < l) {
        for (i = 0; i < u; i++)
          if (o = c[i](s, !1), o) {
            if (a >= s.pos)
              throw new Error("inline rule didn't increment state.pos");
            break;
          }
      }
      if (o) {
        if (s.pos >= d)
          break;
        continue;
      }
      s.pending += s.src[s.pos++];
    }
    s.pending && s.pushPending();
  }, r.prototype.parse = function(s, o, i, a) {
    var c, u, d, l = new this.State(s, o, i, a);
    for (this.tokenize(l), u = this.ruler2.getRules(""), d = u.length, c = 0; c < d; c++)
      u[c](l);
  }, r.prototype.State = ave(), Xi = r, Xi;
}
var Yi, Hf;
function lve() {
  return Hf || (Hf = 1, Yi = function(e) {
    var t = {};
    e = e || {}, t.src_Any = lm().source, t.src_Cc = um().source, t.src_Z = dm().source, t.src_P = El().source, t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
    var n = "[><｜]";
    return t.src_pseudo_letter = "(?:(?!" + n + "|" + t.src_ZPCc + ")" + t.src_Any + ")", t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?", t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = "(?=$|" + n + "|" + t.src_ZPCc + ")(?!" + (e["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + t.src_ZPCc + "))", t.src_path = "(?:[/?#](?:(?!" + t.src_ZCc + "|" + n + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + t.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + t.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + t.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + t.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + t.src_ZCc + "|[']).)+\\'|\\'(?=" + t.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + t.src_ZCc + "|[.]|$)|" + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + t.src_ZCc + "|$)|;(?!" + t.src_ZCc + "|$)|\\!+(?!" + t.src_ZCc + "|[!]|$)|\\?(?!" + t.src_ZCc + "|[?]|$))+|\\/)?", t.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})", t.src_domain = "(?:" + t.src_xn + "|(?:" + t.src_pseudo_letter + ")|(?:" + t.src_pseudo_letter + "(?:-|" + t.src_pseudo_letter + "){0,61}" + t.src_pseudo_letter + "))", t.src_host = "(?:(?:(?:(?:" + t.src_domain + ")\\.)*" + t.src_domain + "))", t.tpl_host_fuzzy = "(?:" + t.src_ip4 + "|(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%)))", t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))", t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + t.src_ZPCc + "|>|$))", t.tpl_email_fuzzy = "(^|" + n + '|"|\\(|' + t.src_ZCc + ")(" + t.src_email_name + "@" + t.tpl_host_fuzzy_strict + ")", t.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_fuzzy_strict + t.src_path + ")", t.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_no_ip_fuzzy_strict + t.src_path + ")", t;
  }), Yi;
}
var Ji, jf;
function uve() {
  if (jf) return Ji;
  jf = 1;
  function e(k) {
    var x = Array.prototype.slice.call(arguments, 1);
    return x.forEach(function(A) {
      A && Object.keys(A).forEach(function(S) {
        k[S] = A[S];
      });
    }), k;
  }
  function t(k) {
    return Object.prototype.toString.call(k);
  }
  function n(k) {
    return t(k) === "[object String]";
  }
  function r(k) {
    return t(k) === "[object Object]";
  }
  function s(k) {
    return t(k) === "[object RegExp]";
  }
  function o(k) {
    return t(k) === "[object Function]";
  }
  function i(k) {
    return k.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  var a = {
    fuzzyLink: !0,
    fuzzyEmail: !0,
    fuzzyIP: !1
  };
  function c(k) {
    return Object.keys(k || {}).reduce(function(x, A) {
      return x || a.hasOwnProperty(A);
    }, !1);
  }
  var u = {
    "http:": {
      validate: function(k, x, A) {
        var S = k.slice(x);
        return A.re.http || (A.re.http = new RegExp(
          "^\\/\\/" + A.re.src_auth + A.re.src_host_port_strict + A.re.src_path,
          "i"
        )), A.re.http.test(S) ? S.match(A.re.http)[0].length : 0;
      }
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
      validate: function(k, x, A) {
        var S = k.slice(x);
        return A.re.no_http || (A.re.no_http = new RegExp(
          "^" + A.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          "(?:localhost|(?:(?:" + A.re.src_domain + ")\\.)+" + A.re.src_domain_root + ")" + A.re.src_port + A.re.src_host_terminator + A.re.src_path,
          "i"
        )), A.re.no_http.test(S) ? x >= 3 && k[x - 3] === ":" || x >= 3 && k[x - 3] === "/" ? 0 : S.match(A.re.no_http)[0].length : 0;
      }
    },
    "mailto:": {
      validate: function(k, x, A) {
        var S = k.slice(x);
        return A.re.mailto || (A.re.mailto = new RegExp(
          "^" + A.re.src_email_name + "@" + A.re.src_host_strict,
          "i"
        )), A.re.mailto.test(S) ? S.match(A.re.mailto)[0].length : 0;
      }
    }
  }, d = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", l = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
  function m(k) {
    k.__index__ = -1, k.__text_cache__ = "";
  }
  function f(k) {
    return function(x, A) {
      var S = x.slice(A);
      return k.test(S) ? S.match(k)[0].length : 0;
    };
  }
  function v() {
    return function(k, x) {
      x.normalize(k);
    };
  }
  function g(k) {
    var x = k.re = lve()(k.__opts__), A = k.__tlds__.slice();
    k.onCompile(), k.__tlds_replaced__ || A.push(d), A.push(x.src_xn), x.src_tlds = A.join("|");
    function S(R) {
      return R.replace("%TLDS%", x.src_tlds);
    }
    x.email_fuzzy = RegExp(S(x.tpl_email_fuzzy), "i"), x.link_fuzzy = RegExp(S(x.tpl_link_fuzzy), "i"), x.link_no_ip_fuzzy = RegExp(S(x.tpl_link_no_ip_fuzzy), "i"), x.host_fuzzy_test = RegExp(S(x.tpl_host_fuzzy_test), "i");
    var $ = [];
    k.__compiled__ = {};
    function M(R, B) {
      throw new Error('(LinkifyIt) Invalid schema "' + R + '": ' + B);
    }
    Object.keys(k.__schemas__).forEach(function(R) {
      var B = k.__schemas__[R];
      if (B !== null) {
        var j = { validate: null, link: null };
        if (k.__compiled__[R] = j, r(B)) {
          s(B.validate) ? j.validate = f(B.validate) : o(B.validate) ? j.validate = B.validate : M(R, B), o(B.normalize) ? j.normalize = B.normalize : B.normalize ? M(R, B) : j.normalize = v();
          return;
        }
        if (n(B)) {
          $.push(R);
          return;
        }
        M(R, B);
      }
    }), $.forEach(function(R) {
      k.__compiled__[k.__schemas__[R]] && (k.__compiled__[R].validate = k.__compiled__[k.__schemas__[R]].validate, k.__compiled__[R].normalize = k.__compiled__[k.__schemas__[R]].normalize);
    }), k.__compiled__[""] = { validate: null, normalize: v() };
    var P = Object.keys(k.__compiled__).filter(function(R) {
      return R.length > 0 && k.__compiled__[R];
    }).map(i).join("|");
    k.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + x.src_ZPCc + "))(" + P + ")", "i"), k.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + x.src_ZPCc + "))(" + P + ")", "ig"), k.re.schema_at_start = RegExp("^" + k.re.schema_search.source, "i"), k.re.pretest = RegExp(
      "(" + k.re.schema_test.source + ")|(" + k.re.host_fuzzy_test.source + ")|@",
      "i"
    ), m(k);
  }
  function y(k, x) {
    var A = k.__index__, S = k.__last_index__, $ = k.__text_cache__.slice(A, S);
    this.schema = k.__schema__.toLowerCase(), this.index = A + x, this.lastIndex = S + x, this.raw = $, this.text = $, this.url = $;
  }
  function h(k, x) {
    var A = new y(k, x);
    return k.__compiled__[A.schema].normalize(A, k), A;
  }
  function w(k, x) {
    if (!(this instanceof w))
      return new w(k, x);
    x || c(k) && (x = k, k = {}), this.__opts__ = e({}, a, x), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = e({}, u, k), this.__compiled__ = {}, this.__tlds__ = l, this.__tlds_replaced__ = !1, this.re = {}, g(this);
  }
  return w.prototype.add = function(x, A) {
    return this.__schemas__[x] = A, g(this), this;
  }, w.prototype.set = function(x) {
    return this.__opts__ = e(this.__opts__, x), this;
  }, w.prototype.test = function(x) {
    if (this.__text_cache__ = x, this.__index__ = -1, !x.length)
      return !1;
    var A, S, $, M, P, R, B, j, ie;
    if (this.re.schema_test.test(x)) {
      for (B = this.re.schema_search, B.lastIndex = 0; (A = B.exec(x)) !== null; )
        if (M = this.testSchemaAt(x, A[2], B.lastIndex), M) {
          this.__schema__ = A[2], this.__index__ = A.index + A[1].length, this.__last_index__ = A.index + A[0].length + M;
          break;
        }
    }
    return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (j = x.search(this.re.host_fuzzy_test), j >= 0 && (this.__index__ < 0 || j < this.__index__) && (S = x.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (P = S.index + S[1].length, (this.__index__ < 0 || P < this.__index__) && (this.__schema__ = "", this.__index__ = P, this.__last_index__ = S.index + S[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (ie = x.indexOf("@"), ie >= 0 && ($ = x.match(this.re.email_fuzzy)) !== null && (P = $.index + $[1].length, R = $.index + $[0].length, (this.__index__ < 0 || P < this.__index__ || P === this.__index__ && R > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = P, this.__last_index__ = R))), this.__index__ >= 0;
  }, w.prototype.pretest = function(x) {
    return this.re.pretest.test(x);
  }, w.prototype.testSchemaAt = function(x, A, S) {
    return this.__compiled__[A.toLowerCase()] ? this.__compiled__[A.toLowerCase()].validate(x, S, this) : 0;
  }, w.prototype.match = function(x) {
    var A = 0, S = [];
    this.__index__ >= 0 && this.__text_cache__ === x && (S.push(h(this, A)), A = this.__last_index__);
    for (var $ = A ? x.slice(A) : x; this.test($); )
      S.push(h(this, A)), $ = $.slice(this.__last_index__), A += this.__last_index__;
    return S.length ? S : null;
  }, w.prototype.matchAtStart = function(x) {
    if (this.__text_cache__ = x, this.__index__ = -1, !x.length) return null;
    var A = this.re.schema_at_start.exec(x);
    if (!A) return null;
    var S = this.testSchemaAt(x, A[2], A[0].length);
    return S ? (this.__schema__ = A[2], this.__index__ = A.index + A[1].length, this.__last_index__ = A.index + A[0].length + S, h(this, 0)) : null;
  }, w.prototype.tlds = function(x, A) {
    return x = Array.isArray(x) ? x : [x], A ? (this.__tlds__ = this.__tlds__.concat(x).sort().filter(function(S, $, M) {
      return S !== M[$ - 1];
    }).reverse(), g(this), this) : (this.__tlds__ = x.slice(), this.__tlds_replaced__ = !0, g(this), this);
  }, w.prototype.normalize = function(x) {
    x.schema || (x.url = "http://" + x.url), x.schema === "mailto:" && !/^mailto:/i.test(x.url) && (x.url = "mailto:" + x.url);
  }, w.prototype.onCompile = function() {
  }, Ji = w, Ji;
}
var Fr = { exports: {} };
/*! https://mths.be/punycode v1.4.1 by @mathias */
var dve = Fr.exports, Vf;
function fve() {
  return Vf || (Vf = 1, (function(e, t) {
    (function(n) {
      var r = t && !t.nodeType && t, s = e && !e.nodeType && e, o = typeof pr == "object" && pr;
      (o.global === o || o.window === o || o.self === o) && (n = o);
      var i, a = 2147483647, c = 36, u = 1, d = 26, l = 38, m = 700, f = 72, v = 128, g = "-", y = /^xn--/, h = /[^\x20-\x7E]/, w = /[\x2E\u3002\uFF0E\uFF61]/g, k = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      }, x = c - u, A = Math.floor, S = String.fromCharCode, $;
      function M(T) {
        throw new RangeError(k[T]);
      }
      function P(T, W) {
        for (var U = T.length, se = []; U--; )
          se[U] = W(T[U]);
        return se;
      }
      function R(T, W) {
        var U = T.split("@"), se = "";
        U.length > 1 && (se = U[0] + "@", T = U[1]), T = T.replace(w, ".");
        var de = T.split("."), ve = P(de, W).join(".");
        return se + ve;
      }
      function B(T) {
        for (var W = [], U = 0, se = T.length, de, ve; U < se; )
          de = T.charCodeAt(U++), de >= 55296 && de <= 56319 && U < se ? (ve = T.charCodeAt(U++), (ve & 64512) == 56320 ? W.push(((de & 1023) << 10) + (ve & 1023) + 65536) : (W.push(de), U--)) : W.push(de);
        return W;
      }
      function j(T) {
        return P(T, function(W) {
          var U = "";
          return W > 65535 && (W -= 65536, U += S(W >>> 10 & 1023 | 55296), W = 56320 | W & 1023), U += S(W), U;
        }).join("");
      }
      function ie(T) {
        return T - 48 < 10 ? T - 22 : T - 65 < 26 ? T - 65 : T - 97 < 26 ? T - 97 : c;
      }
      function z(T, W) {
        return T + 22 + 75 * (T < 26) - ((W != 0) << 5);
      }
      function Q(T, W, U) {
        var se = 0;
        for (T = U ? A(T / m) : T >> 1, T += A(T / W); T > x * d >> 1; se += c)
          T = A(T / x);
        return A(se + (x + 1) * T / (T + l));
      }
      function N(T) {
        var W = [], U = T.length, se, de = 0, ve = v, we = f, Be, Oe, Ke, re, pe, Se, ze, Ge, Je;
        for (Be = T.lastIndexOf(g), Be < 0 && (Be = 0), Oe = 0; Oe < Be; ++Oe)
          T.charCodeAt(Oe) >= 128 && M("not-basic"), W.push(T.charCodeAt(Oe));
        for (Ke = Be > 0 ? Be + 1 : 0; Ke < U; ) {
          for (re = de, pe = 1, Se = c; Ke >= U && M("invalid-input"), ze = ie(T.charCodeAt(Ke++)), (ze >= c || ze > A((a - de) / pe)) && M("overflow"), de += ze * pe, Ge = Se <= we ? u : Se >= we + d ? d : Se - we, !(ze < Ge); Se += c)
            Je = c - Ge, pe > A(a / Je) && M("overflow"), pe *= Je;
          se = W.length + 1, we = Q(de - re, se, re == 0), A(de / se) > a - ve && M("overflow"), ve += A(de / se), de %= se, W.splice(de++, 0, ve);
        }
        return j(W);
      }
      function V(T) {
        var W, U, se, de, ve, we, Be, Oe, Ke, re, pe, Se = [], ze, Ge, Je, st;
        for (T = B(T), ze = T.length, W = v, U = 0, ve = f, we = 0; we < ze; ++we)
          pe = T[we], pe < 128 && Se.push(S(pe));
        for (se = de = Se.length, de && Se.push(g); se < ze; ) {
          for (Be = a, we = 0; we < ze; ++we)
            pe = T[we], pe >= W && pe < Be && (Be = pe);
          for (Ge = se + 1, Be - W > A((a - U) / Ge) && M("overflow"), U += (Be - W) * Ge, W = Be, we = 0; we < ze; ++we)
            if (pe = T[we], pe < W && ++U > a && M("overflow"), pe == W) {
              for (Oe = U, Ke = c; re = Ke <= ve ? u : Ke >= ve + d ? d : Ke - ve, !(Oe < re); Ke += c)
                st = Oe - re, Je = c - re, Se.push(
                  S(z(re + st % Je, 0))
                ), Oe = A(st / Je);
              Se.push(S(z(Oe, 0))), ve = Q(U, Ge, se == de), U = 0, ++se;
            }
          ++U, ++W;
        }
        return Se.join("");
      }
      function F(T) {
        return R(T, function(W) {
          return y.test(W) ? N(W.slice(4).toLowerCase()) : W;
        });
      }
      function G(T) {
        return R(T, function(W) {
          return h.test(W) ? "xn--" + V(W) : W;
        });
      }
      if (i = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        version: "1.4.1",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        ucs2: {
          decode: B,
          encode: j
        },
        decode: N,
        encode: V,
        toASCII: G,
        toUnicode: F
      }, r && s)
        if (e.exports == r)
          s.exports = i;
        else
          for ($ in i)
            i.hasOwnProperty($) && (r[$] = i[$]);
      else
        n.punycode = i;
    })(dve);
  })(Fr, Fr.exports)), Fr.exports;
}
var Qi, Uf;
function pve() {
  return Uf || (Uf = 1, Qi = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 100
      // Internal protection, recursion limit
    },
    components: {
      core: {},
      block: {},
      inline: {}
    }
  }), Qi;
}
var ea, Zf;
function hve() {
  return Zf || (Zf = 1, ea = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "text"
        ],
        rules2: [
          "balance_pairs",
          "fragments_join"
        ]
      }
    }
  }), ea;
}
var ta, Wf;
function gve() {
  return Wf || (Wf = 1, ta = {
    options: {
      html: !0,
      // Enable HTML tags in source
      xhtmlOut: !0,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkify: !1,
      // autoconvert URL-like texts to links
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "“”‘’",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "blockquote",
          "code",
          "fence",
          "heading",
          "hr",
          "html_block",
          "lheading",
          "list",
          "reference",
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "emphasis",
          "entity",
          "escape",
          "html_inline",
          "image",
          "link",
          "newline",
          "text"
        ],
        rules2: [
          "balance_pairs",
          "emphasis",
          "fragments_join"
        ]
      }
    }
  }), ta;
}
var na, Gf;
function mve() {
  if (Gf) return na;
  Gf = 1;
  var e = Pe(), t = Cme(), n = Sme(), r = Rme(), s = Gme(), o = cve(), i = uve(), a = cm(), c = fve(), u = {
    default: pve(),
    zero: hve(),
    commonmark: gve()
  }, d = /^(vbscript|javascript|file|data):/, l = /^data:image\/(gif|png|jpeg|webp);/;
  function m(h) {
    var w = h.trim().toLowerCase();
    return d.test(w) ? !!l.test(w) : !0;
  }
  var f = ["http:", "https:", "mailto:"];
  function v(h) {
    var w = a.parse(h, !0);
    if (w.hostname && (!w.protocol || f.indexOf(w.protocol) >= 0))
      try {
        w.hostname = c.toASCII(w.hostname);
      } catch {
      }
    return a.encode(a.format(w));
  }
  function g(h) {
    var w = a.parse(h, !0);
    if (w.hostname && (!w.protocol || f.indexOf(w.protocol) >= 0))
      try {
        w.hostname = c.toUnicode(w.hostname);
      } catch {
      }
    return a.decode(a.format(w), a.decode.defaultChars + "%");
  }
  function y(h, w) {
    if (!(this instanceof y))
      return new y(h, w);
    w || e.isString(h) || (w = h || {}, h = "default"), this.inline = new o(), this.block = new s(), this.core = new r(), this.renderer = new n(), this.linkify = new i(), this.validateLink = m, this.normalizeLink = v, this.normalizeLinkText = g, this.utils = e, this.helpers = e.assign({}, t), this.options = {}, this.configure(h), w && this.set(w);
  }
  return y.prototype.set = function(h) {
    return e.assign(this.options, h), this;
  }, y.prototype.configure = function(h) {
    var w = this, k;
    if (e.isString(h) && (k = h, h = u[k], !h))
      throw new Error('Wrong `markdown-it` preset "' + k + '", check name');
    if (!h)
      throw new Error("Wrong `markdown-it` preset, can't be empty");
    return h.options && w.set(h.options), h.components && Object.keys(h.components).forEach(function(x) {
      h.components[x].rules && w[x].ruler.enableOnly(h.components[x].rules), h.components[x].rules2 && w[x].ruler2.enableOnly(h.components[x].rules2);
    }), this;
  }, y.prototype.enable = function(h, w) {
    var k = [];
    Array.isArray(h) || (h = [h]), ["core", "block", "inline"].forEach(function(A) {
      k = k.concat(this[A].ruler.enable(h, !0));
    }, this), k = k.concat(this.inline.ruler2.enable(h, !0));
    var x = h.filter(function(A) {
      return k.indexOf(A) < 0;
    });
    if (x.length && !w)
      throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + x);
    return this;
  }, y.prototype.disable = function(h, w) {
    var k = [];
    Array.isArray(h) || (h = [h]), ["core", "block", "inline"].forEach(function(A) {
      k = k.concat(this[A].ruler.disable(h, !0));
    }, this), k = k.concat(this.inline.ruler2.disable(h, !0));
    var x = h.filter(function(A) {
      return k.indexOf(A) < 0;
    });
    if (x.length && !w)
      throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + x);
    return this;
  }, y.prototype.use = function(h) {
    var w = [this].concat(Array.prototype.slice.call(arguments, 1));
    return h.apply(h, w), this;
  }, y.prototype.parse = function(h, w) {
    if (typeof h != "string")
      throw new Error("Input data should be a String");
    var k = new this.core.State(h, this, w);
    return this.core.process(k), k.tokens;
  }, y.prototype.render = function(h, w) {
    return w = w || {}, this.renderer.render(this.parse(h, w), this.options, w);
  }, y.prototype.parseInline = function(h, w) {
    var k = new this.core.State(h, this, w);
    return k.inlineMode = !0, this.core.process(k), k.tokens;
  }, y.prototype.renderInline = function(h, w) {
    return w = w || {}, this.renderer.render(this.parseInline(h, w), this.options, w);
  }, na = y, na;
}
var ra, Kf;
function vve() {
  return Kf || (Kf = 1, ra = mve()), ra;
}
var _ve = vve();
const pm = /* @__PURE__ */ Er(_ve), bve = "😀", yve = "😃", wve = "😄", kve = "😁", xve = "😆", Cve = "😆", Sve = "😅", Eve = "🤣", Ave = "😂", $ve = "🙂", Mve = "🙃", Ive = "😉", Tve = "😊", Lve = "😇", Ove = "🥰", Rve = "😍", Pve = "🤩", Bve = "😘", zve = "😗", Dve = "☺️", Nve = "😚", qve = "😙", Fve = "🥲", Hve = "😋", jve = "😛", Vve = "😜", Uve = "🤪", Zve = "😝", Wve = "🤑", Gve = "🤗", Kve = "🤭", Xve = "🤫", Yve = "🤔", Jve = "🤐", Qve = "🤨", e_e = "😐", t_e = "😑", n_e = "😶", r_e = "😏", o_e = "😒", s_e = "🙄", i_e = "😬", a_e = "🤥", c_e = "😌", l_e = "😔", u_e = "😪", d_e = "🤤", f_e = "😴", p_e = "😷", h_e = "🤒", g_e = "🤕", m_e = "🤢", v_e = "🤮", __e = "🤧", b_e = "🥵", y_e = "🥶", w_e = "🥴", k_e = "😵", x_e = "🤯", C_e = "🤠", S_e = "🥳", E_e = "🥸", A_e = "😎", $_e = "🤓", M_e = "🧐", I_e = "😕", T_e = "😟", L_e = "🙁", O_e = "☹️", R_e = "😮", P_e = "😯", B_e = "😲", z_e = "😳", D_e = "🥺", N_e = "😦", q_e = "😧", F_e = "😨", H_e = "😰", j_e = "😥", V_e = "😢", U_e = "😭", Z_e = "😱", W_e = "😖", G_e = "😣", K_e = "😞", X_e = "😓", Y_e = "😩", J_e = "😫", Q_e = "🥱", ebe = "😤", tbe = "😡", nbe = "😡", rbe = "😠", obe = "🤬", sbe = "😈", ibe = "👿", abe = "💀", cbe = "☠️", lbe = "💩", ube = "💩", dbe = "💩", fbe = "🤡", pbe = "👹", hbe = "👺", gbe = "👻", mbe = "👽", vbe = "👾", _be = "🤖", bbe = "😺", ybe = "😸", wbe = "😹", kbe = "😻", xbe = "😼", Cbe = "😽", Sbe = "🙀", Ebe = "😿", Abe = "😾", $be = "🙈", Mbe = "🙉", Ibe = "🙊", Tbe = "💋", Lbe = "💌", Obe = "💘", Rbe = "💝", Pbe = "💖", Bbe = "💗", zbe = "💓", Dbe = "💞", Nbe = "💕", qbe = "💟", Fbe = "❣️", Hbe = "💔", jbe = "❤️", Vbe = "🧡", Ube = "💛", Zbe = "💚", Wbe = "💙", Gbe = "💜", Kbe = "🤎", Xbe = "🖤", Ybe = "🤍", Jbe = "💢", Qbe = "💥", eye = "💥", tye = "💫", nye = "💦", rye = "💨", oye = "🕳️", sye = "💣", iye = "💬", aye = "👁️‍🗨️", cye = "🗨️", lye = "🗯️", uye = "💭", dye = "💤", fye = "👋", pye = "🤚", hye = "🖐️", gye = "✋", mye = "✋", vye = "🖖", _ye = "👌", bye = "🤌", yye = "🤏", wye = "✌️", kye = "🤞", xye = "🤟", Cye = "🤘", Sye = "🤙", Eye = "👈", Aye = "👉", $ye = "👆", Mye = "🖕", Iye = "🖕", Tye = "👇", Lye = "☝️", Oye = "👍", Rye = "👎", Pye = "✊", Bye = "✊", zye = "👊", Dye = "👊", Nye = "👊", qye = "🤛", Fye = "🤜", Hye = "👏", jye = "🙌", Vye = "👐", Uye = "🤲", Zye = "🤝", Wye = "🙏", Gye = "✍️", Kye = "💅", Xye = "🤳", Yye = "💪", Jye = "🦾", Qye = "🦿", ewe = "🦵", twe = "🦶", nwe = "👂", rwe = "🦻", owe = "👃", swe = "🧠", iwe = "🫀", awe = "🫁", cwe = "🦷", lwe = "🦴", uwe = "👀", dwe = "👁️", fwe = "👅", pwe = "👄", hwe = "👶", gwe = "🧒", mwe = "👦", vwe = "👧", _we = "🧑", bwe = "👱", ywe = "👨", wwe = "🧔", kwe = "👨‍🦰", xwe = "👨‍🦱", Cwe = "👨‍🦳", Swe = "👨‍🦲", Ewe = "👩", Awe = "👩‍🦰", $we = "🧑‍🦰", Mwe = "👩‍🦱", Iwe = "🧑‍🦱", Twe = "👩‍🦳", Lwe = "🧑‍🦳", Owe = "👩‍🦲", Rwe = "🧑‍🦲", Pwe = "👱‍♀️", Bwe = "👱‍♀️", zwe = "👱‍♂️", Dwe = "🧓", Nwe = "👴", qwe = "👵", Fwe = "🙍", Hwe = "🙍‍♂️", jwe = "🙍‍♀️", Vwe = "🙎", Uwe = "🙎‍♂️", Zwe = "🙎‍♀️", Wwe = "🙅", Gwe = "🙅‍♂️", Kwe = "🙅‍♂️", Xwe = "🙅‍♀️", Ywe = "🙅‍♀️", Jwe = "🙆", Qwe = "🙆‍♂️", eke = "🙆‍♀️", tke = "💁", nke = "💁", rke = "💁‍♂️", oke = "💁‍♂️", ske = "💁‍♀️", ike = "💁‍♀️", ake = "🙋", cke = "🙋‍♂️", lke = "🙋‍♀️", uke = "🧏", dke = "🧏‍♂️", fke = "🧏‍♀️", pke = "🙇", hke = "🙇‍♂️", gke = "🙇‍♀️", mke = "🤦", vke = "🤦‍♂️", _ke = "🤦‍♀️", bke = "🤷", yke = "🤷‍♂️", wke = "🤷‍♀️", kke = "🧑‍⚕️", xke = "👨‍⚕️", Cke = "👩‍⚕️", Ske = "🧑‍🎓", Eke = "👨‍🎓", Ake = "👩‍🎓", $ke = "🧑‍🏫", Mke = "👨‍🏫", Ike = "👩‍🏫", Tke = "🧑‍⚖️", Lke = "👨‍⚖️", Oke = "👩‍⚖️", Rke = "🧑‍🌾", Pke = "👨‍🌾", Bke = "👩‍🌾", zke = "🧑‍🍳", Dke = "👨‍🍳", Nke = "👩‍🍳", qke = "🧑‍🔧", Fke = "👨‍🔧", Hke = "👩‍🔧", jke = "🧑‍🏭", Vke = "👨‍🏭", Uke = "👩‍🏭", Zke = "🧑‍💼", Wke = "👨‍💼", Gke = "👩‍💼", Kke = "🧑‍🔬", Xke = "👨‍🔬", Yke = "👩‍🔬", Jke = "🧑‍💻", Qke = "👨‍💻", e4e = "👩‍💻", t4e = "🧑‍🎤", n4e = "👨‍🎤", r4e = "👩‍🎤", o4e = "🧑‍🎨", s4e = "👨‍🎨", i4e = "👩‍🎨", a4e = "🧑‍✈️", c4e = "👨‍✈️", l4e = "👩‍✈️", u4e = "🧑‍🚀", d4e = "👨‍🚀", f4e = "👩‍🚀", p4e = "🧑‍🚒", h4e = "👨‍🚒", g4e = "👩‍🚒", m4e = "👮", v4e = "👮", _4e = "👮‍♂️", b4e = "👮‍♀️", y4e = "🕵️", w4e = "🕵️‍♂️", k4e = "🕵️‍♀️", x4e = "💂", C4e = "💂‍♂️", S4e = "💂‍♀️", E4e = "🥷", A4e = "👷", $4e = "👷‍♂️", M4e = "👷‍♀️", I4e = "🤴", T4e = "👸", L4e = "👳", O4e = "👳‍♂️", R4e = "👳‍♀️", P4e = "👲", B4e = "🧕", z4e = "🤵", D4e = "🤵‍♂️", N4e = "🤵‍♀️", q4e = "👰", F4e = "👰‍♂️", H4e = "👰‍♀️", j4e = "👰‍♀️", V4e = "🤰", U4e = "🤱", Z4e = "👩‍🍼", W4e = "👨‍🍼", G4e = "🧑‍🍼", K4e = "👼", X4e = "🎅", Y4e = "🤶", J4e = "🧑‍🎄", Q4e = "🦸", e3e = "🦸‍♂️", t3e = "🦸‍♀️", n3e = "🦹", r3e = "🦹‍♂️", o3e = "🦹‍♀️", s3e = "🧙", i3e = "🧙‍♂️", a3e = "🧙‍♀️", c3e = "🧚", l3e = "🧚‍♂️", u3e = "🧚‍♀️", d3e = "🧛", f3e = "🧛‍♂️", p3e = "🧛‍♀️", h3e = "🧜", g3e = "🧜‍♂️", m3e = "🧜‍♀️", v3e = "🧝", _3e = "🧝‍♂️", b3e = "🧝‍♀️", y3e = "🧞", w3e = "🧞‍♂️", k3e = "🧞‍♀️", x3e = "🧟", C3e = "🧟‍♂️", S3e = "🧟‍♀️", E3e = "💆", A3e = "💆‍♂️", $3e = "💆‍♀️", M3e = "💇", I3e = "💇‍♂️", T3e = "💇‍♀️", L3e = "🚶", O3e = "🚶‍♂️", R3e = "🚶‍♀️", P3e = "🧍", B3e = "🧍‍♂️", z3e = "🧍‍♀️", D3e = "🧎", N3e = "🧎‍♂️", q3e = "🧎‍♀️", F3e = "🧑‍🦯", H3e = "👨‍🦯", j3e = "👩‍🦯", V3e = "🧑‍🦼", U3e = "👨‍🦼", Z3e = "👩‍🦼", W3e = "🧑‍🦽", G3e = "👨‍🦽", K3e = "👩‍🦽", X3e = "🏃", Y3e = "🏃", J3e = "🏃‍♂️", Q3e = "🏃‍♀️", e5e = "💃", t5e = "💃", n5e = "🕺", r5e = "🕴️", o5e = "👯", s5e = "👯‍♂️", i5e = "👯‍♀️", a5e = "🧖", c5e = "🧖‍♂️", l5e = "🧖‍♀️", u5e = "🧗", d5e = "🧗‍♂️", f5e = "🧗‍♀️", p5e = "🤺", h5e = "🏇", g5e = "⛷️", m5e = "🏂", v5e = "🏌️", _5e = "🏌️‍♂️", b5e = "🏌️‍♀️", y5e = "🏄", w5e = "🏄‍♂️", k5e = "🏄‍♀️", x5e = "🚣", C5e = "🚣‍♂️", S5e = "🚣‍♀️", E5e = "🏊", A5e = "🏊‍♂️", $5e = "🏊‍♀️", M5e = "⛹️", I5e = "⛹️‍♂️", T5e = "⛹️‍♂️", L5e = "⛹️‍♀️", O5e = "⛹️‍♀️", R5e = "🏋️", P5e = "🏋️‍♂️", B5e = "🏋️‍♀️", z5e = "🚴", D5e = "🚴‍♂️", N5e = "🚴‍♀️", q5e = "🚵", F5e = "🚵‍♂️", H5e = "🚵‍♀️", j5e = "🤸", V5e = "🤸‍♂️", U5e = "🤸‍♀️", Z5e = "🤼", W5e = "🤼‍♂️", G5e = "🤼‍♀️", K5e = "🤽", X5e = "🤽‍♂️", Y5e = "🤽‍♀️", J5e = "🤾", Q5e = "🤾‍♂️", e6e = "🤾‍♀️", t6e = "🤹", n6e = "🤹‍♂️", r6e = "🤹‍♀️", o6e = "🧘", s6e = "🧘‍♂️", i6e = "🧘‍♀️", a6e = "🛀", c6e = "🛌", l6e = "🧑‍🤝‍🧑", u6e = "👭", d6e = "👫", f6e = "👬", p6e = "💏", h6e = "👩‍❤️‍💋‍👨", g6e = "👨‍❤️‍💋‍👨", m6e = "👩‍❤️‍💋‍👩", v6e = "💑", _6e = "👩‍❤️‍👨", b6e = "👨‍❤️‍👨", y6e = "👩‍❤️‍👩", w6e = "👪", k6e = "👨‍👩‍👦", x6e = "👨‍👩‍👧", C6e = "👨‍👩‍👧‍👦", S6e = "👨‍👩‍👦‍👦", E6e = "👨‍👩‍👧‍👧", A6e = "👨‍👨‍👦", $6e = "👨‍👨‍👧", M6e = "👨‍👨‍👧‍👦", I6e = "👨‍👨‍👦‍👦", T6e = "👨‍👨‍👧‍👧", L6e = "👩‍👩‍👦", O6e = "👩‍👩‍👧", R6e = "👩‍👩‍👧‍👦", P6e = "👩‍👩‍👦‍👦", B6e = "👩‍👩‍👧‍👧", z6e = "👨‍👦", D6e = "👨‍👦‍👦", N6e = "👨‍👧", q6e = "👨‍👧‍👦", F6e = "👨‍👧‍👧", H6e = "👩‍👦", j6e = "👩‍👦‍👦", V6e = "👩‍👧", U6e = "👩‍👧‍👦", Z6e = "👩‍👧‍👧", W6e = "🗣️", G6e = "👤", K6e = "👥", X6e = "🫂", Y6e = "👣", J6e = "🐵", Q6e = "🐒", exe = "🦍", txe = "🦧", nxe = "🐶", rxe = "🐕", oxe = "🦮", sxe = "🐕‍🦺", ixe = "🐩", axe = "🐺", cxe = "🦊", lxe = "🦝", uxe = "🐱", dxe = "🐈", fxe = "🐈‍⬛", pxe = "🦁", hxe = "🐯", gxe = "🐅", mxe = "🐆", vxe = "🐴", _xe = "🐎", bxe = "🦄", yxe = "🦓", wxe = "🦌", kxe = "🦬", xxe = "🐮", Cxe = "🐂", Sxe = "🐃", Exe = "🐄", Axe = "🐷", $xe = "🐖", Mxe = "🐗", Ixe = "🐽", Txe = "🐏", Lxe = "🐑", Oxe = "🐐", Rxe = "🐪", Pxe = "🐫", Bxe = "🦙", zxe = "🦒", Dxe = "🐘", Nxe = "🦣", qxe = "🦏", Fxe = "🦛", Hxe = "🐭", jxe = "🐁", Vxe = "🐀", Uxe = "🐹", Zxe = "🐰", Wxe = "🐇", Gxe = "🐿️", Kxe = "🦫", Xxe = "🦔", Yxe = "🦇", Jxe = "🐻", Qxe = "🐻‍❄️", e8e = "🐨", t8e = "🐼", n8e = "🦥", r8e = "🦦", o8e = "🦨", s8e = "🦘", i8e = "🦡", a8e = "🐾", c8e = "🐾", l8e = "🦃", u8e = "🐔", d8e = "🐓", f8e = "🐣", p8e = "🐤", h8e = "🐥", g8e = "🐦", m8e = "🐧", v8e = "🕊️", _8e = "🦅", b8e = "🦆", y8e = "🦢", w8e = "🦉", k8e = "🦤", x8e = "🪶", C8e = "🦩", S8e = "🦚", E8e = "🦜", A8e = "🐸", $8e = "🐊", M8e = "🐢", I8e = "🦎", T8e = "🐍", L8e = "🐲", O8e = "🐉", R8e = "🦕", P8e = "🐳", B8e = "🐋", z8e = "🐬", D8e = "🐬", N8e = "🦭", q8e = "🐟", F8e = "🐠", H8e = "🐡", j8e = "🦈", V8e = "🐙", U8e = "🐚", Z8e = "🐌", W8e = "🦋", G8e = "🐛", K8e = "🐜", X8e = "🐝", Y8e = "🐝", J8e = "🪲", Q8e = "🐞", eCe = "🦗", tCe = "🪳", nCe = "🕷️", rCe = "🕸️", oCe = "🦂", sCe = "🦟", iCe = "🪰", aCe = "🪱", cCe = "🦠", lCe = "💐", uCe = "🌸", dCe = "💮", fCe = "🏵️", pCe = "🌹", hCe = "🥀", gCe = "🌺", mCe = "🌻", vCe = "🌼", _Ce = "🌷", bCe = "🌱", yCe = "🪴", wCe = "🌲", kCe = "🌳", xCe = "🌴", CCe = "🌵", SCe = "🌾", ECe = "🌿", ACe = "☘️", $Ce = "🍀", MCe = "🍁", ICe = "🍂", TCe = "🍃", LCe = "🍇", OCe = "🍈", RCe = "🍉", PCe = "🍊", BCe = "🍊", zCe = "🍊", DCe = "🍋", NCe = "🍌", qCe = "🍍", FCe = "🥭", HCe = "🍎", jCe = "🍏", VCe = "🍐", UCe = "🍑", ZCe = "🍒", WCe = "🍓", GCe = "🫐", KCe = "🥝", XCe = "🍅", YCe = "🫒", JCe = "🥥", QCe = "🥑", e9e = "🍆", t9e = "🥔", n9e = "🥕", r9e = "🌽", o9e = "🌶️", s9e = "🫑", i9e = "🥒", a9e = "🥬", c9e = "🥦", l9e = "🧄", u9e = "🧅", d9e = "🍄", f9e = "🥜", p9e = "🌰", h9e = "🍞", g9e = "🥐", m9e = "🥖", v9e = "🫓", _9e = "🥨", b9e = "🥯", y9e = "🥞", w9e = "🧇", k9e = "🧀", x9e = "🍖", C9e = "🍗", S9e = "🥩", E9e = "🥓", A9e = "🍔", $9e = "🍟", M9e = "🍕", I9e = "🌭", T9e = "🥪", L9e = "🌮", O9e = "🌯", R9e = "🫔", P9e = "🥙", B9e = "🧆", z9e = "🥚", D9e = "🍳", N9e = "🥘", q9e = "🍲", F9e = "🫕", H9e = "🥣", j9e = "🥗", V9e = "🍿", U9e = "🧈", Z9e = "🧂", W9e = "🥫", G9e = "🍱", K9e = "🍘", X9e = "🍙", Y9e = "🍚", J9e = "🍛", Q9e = "🍜", e7e = "🍝", t7e = "🍠", n7e = "🍢", r7e = "🍣", o7e = "🍤", s7e = "🍥", i7e = "🥮", a7e = "🍡", c7e = "🥟", l7e = "🥠", u7e = "🥡", d7e = "🦀", f7e = "🦞", p7e = "🦐", h7e = "🦑", g7e = "🦪", m7e = "🍦", v7e = "🍧", _7e = "🍨", b7e = "🍩", y7e = "🍪", w7e = "🎂", k7e = "🍰", x7e = "🧁", C7e = "🥧", S7e = "🍫", E7e = "🍬", A7e = "🍭", $7e = "🍮", M7e = "🍯", I7e = "🍼", T7e = "🥛", L7e = "☕", O7e = "🫖", R7e = "🍵", P7e = "🍶", B7e = "🍾", z7e = "🍷", D7e = "🍸", N7e = "🍹", q7e = "🍺", F7e = "🍻", H7e = "🥂", j7e = "🥃", V7e = "🥤", U7e = "🧋", Z7e = "🧃", W7e = "🧉", G7e = "🧊", K7e = "🥢", X7e = "🍽️", Y7e = "🍴", J7e = "🥄", Q7e = "🔪", eSe = "🔪", tSe = "🏺", nSe = "🌍", rSe = "🌎", oSe = "🌏", sSe = "🌐", iSe = "🗺️", aSe = "🗾", cSe = "🧭", lSe = "🏔️", uSe = "⛰️", dSe = "🌋", fSe = "🗻", pSe = "🏕️", hSe = "🏖️", gSe = "🏜️", mSe = "🏝️", vSe = "🏞️", _Se = "🏟️", bSe = "🏛️", ySe = "🏗️", wSe = "🧱", kSe = "🪨", xSe = "🪵", CSe = "🛖", SSe = "🏘️", ESe = "🏚️", ASe = "🏠", $Se = "🏡", MSe = "🏢", ISe = "🏣", TSe = "🏤", LSe = "🏥", OSe = "🏦", RSe = "🏨", PSe = "🏩", BSe = "🏪", zSe = "🏫", DSe = "🏬", NSe = "🏭", qSe = "🏯", FSe = "🏰", HSe = "💒", jSe = "🗼", VSe = "🗽", USe = "⛪", ZSe = "🕌", WSe = "🛕", GSe = "🕍", KSe = "⛩️", XSe = "🕋", YSe = "⛲", JSe = "⛺", QSe = "🌁", eEe = "🌃", tEe = "🏙️", nEe = "🌄", rEe = "🌅", oEe = "🌆", sEe = "🌇", iEe = "🌉", aEe = "♨️", cEe = "🎠", lEe = "🎡", uEe = "🎢", dEe = "💈", fEe = "🎪", pEe = "🚂", hEe = "🚃", gEe = "🚄", mEe = "🚅", vEe = "🚆", _Ee = "🚇", bEe = "🚈", yEe = "🚉", wEe = "🚊", kEe = "🚝", xEe = "🚞", CEe = "🚋", SEe = "🚌", EEe = "🚍", AEe = "🚎", $Ee = "🚐", MEe = "🚑", IEe = "🚒", TEe = "🚓", LEe = "🚔", OEe = "🚕", REe = "🚖", PEe = "🚗", BEe = "🚗", zEe = "🚘", DEe = "🚙", NEe = "🛻", qEe = "🚚", FEe = "🚛", HEe = "🚜", jEe = "🏎️", VEe = "🏍️", UEe = "🛵", ZEe = "🦽", WEe = "🦼", GEe = "🛺", KEe = "🚲", XEe = "🛴", YEe = "🛹", JEe = "🛼", QEe = "🚏", eAe = "🛣️", tAe = "🛤️", nAe = "🛢️", rAe = "⛽", oAe = "🚨", sAe = "🚥", iAe = "🚦", aAe = "🛑", cAe = "🚧", lAe = "⚓", uAe = "⛵", dAe = "⛵", fAe = "🛶", pAe = "🚤", hAe = "🛳️", gAe = "⛴️", mAe = "🛥️", vAe = "🚢", _Ae = "✈️", bAe = "🛩️", yAe = "🛫", wAe = "🛬", kAe = "🪂", xAe = "💺", CAe = "🚁", SAe = "🚟", EAe = "🚠", AAe = "🚡", $Ae = "🛰️", MAe = "🚀", IAe = "🛸", TAe = "🛎️", LAe = "🧳", OAe = "⌛", RAe = "⏳", PAe = "⌚", BAe = "⏰", zAe = "⏱️", DAe = "⏲️", NAe = "🕰️", qAe = "🕛", FAe = "🕧", HAe = "🕐", jAe = "🕜", VAe = "🕑", UAe = "🕝", ZAe = "🕒", WAe = "🕞", GAe = "🕓", KAe = "🕟", XAe = "🕔", YAe = "🕠", JAe = "🕕", QAe = "🕡", e$e = "🕖", t$e = "🕢", n$e = "🕗", r$e = "🕣", o$e = "🕘", s$e = "🕤", i$e = "🕙", a$e = "🕥", c$e = "🕚", l$e = "🕦", u$e = "🌑", d$e = "🌒", f$e = "🌓", p$e = "🌔", h$e = "🌔", g$e = "🌕", m$e = "🌖", v$e = "🌗", _$e = "🌘", b$e = "🌙", y$e = "🌚", w$e = "🌛", k$e = "🌜", x$e = "🌡️", C$e = "☀️", S$e = "🌝", E$e = "🌞", A$e = "🪐", $$e = "⭐", M$e = "🌟", I$e = "🌠", T$e = "🌌", L$e = "☁️", O$e = "⛅", R$e = "⛈️", P$e = "🌤️", B$e = "🌥️", z$e = "🌦️", D$e = "🌧️", N$e = "🌨️", q$e = "🌩️", F$e = "🌪️", H$e = "🌫️", j$e = "🌬️", V$e = "🌀", U$e = "🌈", Z$e = "🌂", W$e = "☂️", G$e = "☔", K$e = "⛱️", X$e = "⚡", Y$e = "❄️", J$e = "☃️", Q$e = "⛄", eMe = "☄️", tMe = "🔥", nMe = "💧", rMe = "🌊", oMe = "🎃", sMe = "🎄", iMe = "🎆", aMe = "🎇", cMe = "🧨", lMe = "✨", uMe = "🎈", dMe = "🎉", fMe = "🎊", pMe = "🎋", hMe = "🎍", gMe = "🎎", mMe = "🎏", vMe = "🎐", _Me = "🎑", bMe = "🧧", yMe = "🎀", wMe = "🎁", kMe = "🎗️", xMe = "🎟️", CMe = "🎫", SMe = "🎖️", EMe = "🏆", AMe = "🏅", $Me = "⚽", MMe = "⚾", IMe = "🥎", TMe = "🏀", LMe = "🏐", OMe = "🏈", RMe = "🏉", PMe = "🎾", BMe = "🥏", zMe = "🎳", DMe = "🏏", NMe = "🏑", qMe = "🏒", FMe = "🥍", HMe = "🏓", jMe = "🏸", VMe = "🥊", UMe = "🥋", ZMe = "🥅", WMe = "⛳", GMe = "⛸️", KMe = "🎣", XMe = "🤿", YMe = "🎽", JMe = "🎿", QMe = "🛷", eIe = "🥌", tIe = "🎯", nIe = "🪀", rIe = "🪁", oIe = "🔮", sIe = "🪄", iIe = "🧿", aIe = "🎮", cIe = "🕹️", lIe = "🎰", uIe = "🎲", dIe = "🧩", fIe = "🧸", pIe = "🪅", hIe = "🪆", gIe = "♠️", mIe = "♥️", vIe = "♦️", _Ie = "♣️", bIe = "♟️", yIe = "🃏", wIe = "🀄", kIe = "🎴", xIe = "🎭", CIe = "🖼️", SIe = "🎨", EIe = "🧵", AIe = "🪡", $Ie = "🧶", MIe = "🪢", IIe = "👓", TIe = "🕶️", LIe = "🥽", OIe = "🥼", RIe = "🦺", PIe = "👔", BIe = "👕", zIe = "👕", DIe = "👖", NIe = "🧣", qIe = "🧤", FIe = "🧥", HIe = "🧦", jIe = "👗", VIe = "👘", UIe = "🥻", ZIe = "🩱", WIe = "🩲", GIe = "🩳", KIe = "👙", XIe = "👚", YIe = "👛", JIe = "👜", QIe = "👝", eTe = "🛍️", tTe = "🎒", nTe = "🩴", rTe = "👞", oTe = "👞", sTe = "👟", iTe = "🥾", aTe = "🥿", cTe = "👠", lTe = "👡", uTe = "🩰", dTe = "👢", fTe = "👑", pTe = "👒", hTe = "🎩", gTe = "🎓", mTe = "🧢", vTe = "🪖", _Te = "⛑️", bTe = "📿", yTe = "💄", wTe = "💍", kTe = "💎", xTe = "🔇", CTe = "🔈", STe = "🔉", ETe = "🔊", ATe = "📢", $Te = "📣", MTe = "📯", ITe = "🔔", TTe = "🔕", LTe = "🎼", OTe = "🎵", RTe = "🎶", PTe = "🎙️", BTe = "🎚️", zTe = "🎛️", DTe = "🎤", NTe = "🎧", qTe = "📻", FTe = "🎷", HTe = "🪗", jTe = "🎸", VTe = "🎹", UTe = "🎺", ZTe = "🎻", WTe = "🪕", GTe = "🥁", KTe = "🪘", XTe = "📱", YTe = "📲", JTe = "☎️", QTe = "☎️", eLe = "📞", tLe = "📟", nLe = "📠", rLe = "🔋", oLe = "🔌", sLe = "💻", iLe = "🖥️", aLe = "🖨️", cLe = "⌨️", lLe = "🖱️", uLe = "🖲️", dLe = "💽", fLe = "💾", pLe = "💿", hLe = "📀", gLe = "🧮", mLe = "🎥", vLe = "🎞️", _Le = "📽️", bLe = "🎬", yLe = "📺", wLe = "📷", kLe = "📸", xLe = "📹", CLe = "📼", SLe = "🔍", ELe = "🔎", ALe = "🕯️", $Le = "💡", MLe = "🔦", ILe = "🏮", TLe = "🏮", LLe = "🪔", OLe = "📔", RLe = "📕", PLe = "📖", BLe = "📖", zLe = "📗", DLe = "📘", NLe = "📙", qLe = "📚", FLe = "📓", HLe = "📒", jLe = "📃", VLe = "📜", ULe = "📄", ZLe = "📰", WLe = "🗞️", GLe = "📑", KLe = "🔖", XLe = "🏷️", YLe = "💰", JLe = "🪙", QLe = "💴", eOe = "💵", tOe = "💶", nOe = "💷", rOe = "💸", oOe = "💳", sOe = "🧾", iOe = "💹", aOe = "✉️", cOe = "📧", lOe = "📨", uOe = "📩", dOe = "📤", fOe = "📥", pOe = "📫", hOe = "📪", gOe = "📬", mOe = "📭", vOe = "📮", _Oe = "🗳️", bOe = "✏️", yOe = "✒️", wOe = "🖋️", kOe = "🖊️", xOe = "🖌️", COe = "🖍️", SOe = "📝", EOe = "📝", AOe = "💼", $Oe = "📁", MOe = "📂", IOe = "🗂️", TOe = "📅", LOe = "📆", OOe = "🗒️", ROe = "🗓️", POe = "📇", BOe = "📈", zOe = "📉", DOe = "📊", NOe = "📋", qOe = "📌", FOe = "📍", HOe = "📎", jOe = "🖇️", VOe = "📏", UOe = "📐", ZOe = "✂️", WOe = "🗃️", GOe = "🗄️", KOe = "🗑️", XOe = "🔒", YOe = "🔓", JOe = "🔏", QOe = "🔐", eRe = "🔑", tRe = "🗝️", nRe = "🔨", rRe = "🪓", oRe = "⛏️", sRe = "⚒️", iRe = "🛠️", aRe = "🗡️", cRe = "⚔️", lRe = "🔫", uRe = "🪃", dRe = "🏹", fRe = "🛡️", pRe = "🪚", hRe = "🔧", gRe = "🪛", mRe = "🔩", vRe = "⚙️", _Re = "🗜️", bRe = "⚖️", yRe = "🦯", wRe = "🔗", kRe = "⛓️", xRe = "🪝", CRe = "🧰", SRe = "🧲", ERe = "🪜", ARe = "⚗️", $Re = "🧪", MRe = "🧫", IRe = "🧬", TRe = "🔬", LRe = "🔭", ORe = "📡", RRe = "💉", PRe = "🩸", BRe = "💊", zRe = "🩹", DRe = "🩺", NRe = "🚪", qRe = "🛗", FRe = "🪞", HRe = "🪟", jRe = "🛏️", VRe = "🛋️", URe = "🪑", ZRe = "🚽", WRe = "🪠", GRe = "🚿", KRe = "🛁", XRe = "🪤", YRe = "🪒", JRe = "🧴", QRe = "🧷", ePe = "🧹", tPe = "🧺", nPe = "🧻", rPe = "🪣", oPe = "🧼", sPe = "🪥", iPe = "🧽", aPe = "🧯", cPe = "🛒", lPe = "🚬", uPe = "⚰️", dPe = "🪦", fPe = "⚱️", pPe = "🗿", hPe = "🪧", gPe = "🏧", mPe = "🚮", vPe = "🚰", _Pe = "♿", bPe = "🚹", yPe = "🚺", wPe = "🚻", kPe = "🚼", xPe = "🚾", CPe = "🛂", SPe = "🛃", EPe = "🛄", APe = "🛅", $Pe = "⚠️", MPe = "🚸", IPe = "⛔", TPe = "🚫", LPe = "🚳", OPe = "🚭", RPe = "🚯", PPe = "🚷", BPe = "📵", zPe = "🔞", DPe = "☢️", NPe = "☣️", qPe = "⬆️", FPe = "↗️", HPe = "➡️", jPe = "↘️", VPe = "⬇️", UPe = "↙️", ZPe = "⬅️", WPe = "↖️", GPe = "↕️", KPe = "↔️", XPe = "↩️", YPe = "↪️", JPe = "⤴️", QPe = "⤵️", eBe = "🔃", tBe = "🔄", nBe = "🔙", rBe = "🔚", oBe = "🔛", sBe = "🔜", iBe = "🔝", aBe = "🛐", cBe = "⚛️", lBe = "🕉️", uBe = "✡️", dBe = "☸️", fBe = "☯️", pBe = "✝️", hBe = "☦️", gBe = "☪️", mBe = "☮️", vBe = "🕎", _Be = "🔯", bBe = "♈", yBe = "♉", wBe = "♊", kBe = "♋", xBe = "♌", CBe = "♍", SBe = "♎", EBe = "♏", ABe = "♐", $Be = "♑", MBe = "♒", IBe = "♓", TBe = "⛎", LBe = "🔀", OBe = "🔁", RBe = "🔂", PBe = "▶️", BBe = "⏩", zBe = "⏭️", DBe = "⏯️", NBe = "◀️", qBe = "⏪", FBe = "⏮️", HBe = "🔼", jBe = "⏫", VBe = "🔽", UBe = "⏬", ZBe = "⏸️", WBe = "⏹️", GBe = "⏺️", KBe = "⏏️", XBe = "🎦", YBe = "🔅", JBe = "🔆", QBe = "📶", eze = "📳", tze = "📴", nze = "♀️", rze = "♂️", oze = "⚧️", sze = "✖️", ize = "➕", aze = "➖", cze = "➗", lze = "♾️", uze = "‼️", dze = "⁉️", fze = "❓", pze = "❔", hze = "❕", gze = "❗", mze = "❗", vze = "〰️", _ze = "💱", bze = "💲", yze = "⚕️", wze = "♻️", kze = "⚜️", xze = "🔱", Cze = "📛", Sze = "🔰", Eze = "⭕", Aze = "✅", $ze = "☑️", Mze = "✔️", Ize = "❌", Tze = "❎", Lze = "➰", Oze = "➿", Rze = "〽️", Pze = "✳️", Bze = "✴️", zze = "❇️", Dze = "©️", Nze = "®️", qze = "™️", Fze = "#️⃣", Hze = "*️⃣", jze = "0️⃣", Vze = "1️⃣", Uze = "2️⃣", Zze = "3️⃣", Wze = "4️⃣", Gze = "5️⃣", Kze = "6️⃣", Xze = "7️⃣", Yze = "8️⃣", Jze = "9️⃣", Qze = "🔟", eDe = "🔠", tDe = "🔡", nDe = "🔣", rDe = "🔤", oDe = "🅰️", sDe = "🆎", iDe = "🅱️", aDe = "🆑", cDe = "🆒", lDe = "🆓", uDe = "ℹ️", dDe = "🆔", fDe = "Ⓜ️", pDe = "🆖", hDe = "🅾️", gDe = "🆗", mDe = "🅿️", vDe = "🆘", _De = "🆙", bDe = "🆚", yDe = "🈁", wDe = "🈂️", kDe = "🉐", xDe = "🉑", CDe = "㊗️", SDe = "㊙️", EDe = "🈵", ADe = "🔴", $De = "🟠", MDe = "🟡", IDe = "🟢", TDe = "🔵", LDe = "🟣", ODe = "🟤", RDe = "⚫", PDe = "⚪", BDe = "🟥", zDe = "🟧", DDe = "🟨", NDe = "🟩", qDe = "🟦", FDe = "🟪", HDe = "🟫", jDe = "⬛", VDe = "⬜", UDe = "◼️", ZDe = "◻️", WDe = "◾", GDe = "◽", KDe = "▪️", XDe = "▫️", YDe = "🔶", JDe = "🔷", QDe = "🔸", eNe = "🔹", tNe = "🔺", nNe = "🔻", rNe = "💠", oNe = "🔘", sNe = "🔳", iNe = "🔲", aNe = "🏁", cNe = "🚩", lNe = "🎌", uNe = "🏴", dNe = "🏳️", fNe = "🏳️‍🌈", pNe = "🏳️‍⚧️", hNe = "🏴‍☠️", gNe = "🇦🇨", mNe = "🇦🇩", vNe = "🇦🇪", _Ne = "🇦🇫", bNe = "🇦🇬", yNe = "🇦🇮", wNe = "🇦🇱", kNe = "🇦🇲", xNe = "🇦🇴", CNe = "🇦🇶", SNe = "🇦🇷", ENe = "🇦🇸", ANe = "🇦🇹", $Ne = "🇦🇺", MNe = "🇦🇼", INe = "🇦🇽", TNe = "🇦🇿", LNe = "🇧🇦", ONe = "🇧🇧", RNe = "🇧🇩", PNe = "🇧🇪", BNe = "🇧🇫", zNe = "🇧🇬", DNe = "🇧🇭", NNe = "🇧🇮", qNe = "🇧🇯", FNe = "🇧🇱", HNe = "🇧🇲", jNe = "🇧🇳", VNe = "🇧🇴", UNe = "🇧🇶", ZNe = "🇧🇷", WNe = "🇧🇸", GNe = "🇧🇹", KNe = "🇧🇻", XNe = "🇧🇼", YNe = "🇧🇾", JNe = "🇧🇿", QNe = "🇨🇦", eqe = "🇨🇨", tqe = "🇨🇩", nqe = "🇨🇫", rqe = "🇨🇬", oqe = "🇨🇭", sqe = "🇨🇮", iqe = "🇨🇰", aqe = "🇨🇱", cqe = "🇨🇲", lqe = "🇨🇳", uqe = "🇨🇴", dqe = "🇨🇵", fqe = "🇨🇷", pqe = "🇨🇺", hqe = "🇨🇻", gqe = "🇨🇼", mqe = "🇨🇽", vqe = "🇨🇾", _qe = "🇨🇿", bqe = "🇩🇪", yqe = "🇩🇬", wqe = "🇩🇯", kqe = "🇩🇰", xqe = "🇩🇲", Cqe = "🇩🇴", Sqe = "🇩🇿", Eqe = "🇪🇦", Aqe = "🇪🇨", $qe = "🇪🇪", Mqe = "🇪🇬", Iqe = "🇪🇭", Tqe = "🇪🇷", Lqe = "🇪🇸", Oqe = "🇪🇹", Rqe = "🇪🇺", Pqe = "🇪🇺", Bqe = "🇫🇮", zqe = "🇫🇯", Dqe = "🇫🇰", Nqe = "🇫🇲", qqe = "🇫🇴", Fqe = "🇫🇷", Hqe = "🇬🇦", jqe = "🇬🇧", Vqe = "🇬🇧", Uqe = "🇬🇩", Zqe = "🇬🇪", Wqe = "🇬🇫", Gqe = "🇬🇬", Kqe = "🇬🇭", Xqe = "🇬🇮", Yqe = "🇬🇱", Jqe = "🇬🇲", Qqe = "🇬🇳", eFe = "🇬🇵", tFe = "🇬🇶", nFe = "🇬🇷", rFe = "🇬🇸", oFe = "🇬🇹", sFe = "🇬🇺", iFe = "🇬🇼", aFe = "🇬🇾", cFe = "🇭🇰", lFe = "🇭🇲", uFe = "🇭🇳", dFe = "🇭🇷", fFe = "🇭🇹", pFe = "🇭🇺", hFe = "🇮🇨", gFe = "🇮🇩", mFe = "🇮🇪", vFe = "🇮🇱", _Fe = "🇮🇲", bFe = "🇮🇳", yFe = "🇮🇴", wFe = "🇮🇶", kFe = "🇮🇷", xFe = "🇮🇸", CFe = "🇮🇹", SFe = "🇯🇪", EFe = "🇯🇲", AFe = "🇯🇴", $Fe = "🇯🇵", MFe = "🇰🇪", IFe = "🇰🇬", TFe = "🇰🇭", LFe = "🇰🇮", OFe = "🇰🇲", RFe = "🇰🇳", PFe = "🇰🇵", BFe = "🇰🇷", zFe = "🇰🇼", DFe = "🇰🇾", NFe = "🇰🇿", qFe = "🇱🇦", FFe = "🇱🇧", HFe = "🇱🇨", jFe = "🇱🇮", VFe = "🇱🇰", UFe = "🇱🇷", ZFe = "🇱🇸", WFe = "🇱🇹", GFe = "🇱🇺", KFe = "🇱🇻", XFe = "🇱🇾", YFe = "🇲🇦", JFe = "🇲🇨", QFe = "🇲🇩", eHe = "🇲🇪", tHe = "🇲🇫", nHe = "🇲🇬", rHe = "🇲🇭", oHe = "🇲🇰", sHe = "🇲🇱", iHe = "🇲🇲", aHe = "🇲🇳", cHe = "🇲🇴", lHe = "🇲🇵", uHe = "🇲🇶", dHe = "🇲🇷", fHe = "🇲🇸", pHe = "🇲🇹", hHe = "🇲🇺", gHe = "🇲🇻", mHe = "🇲🇼", vHe = "🇲🇽", _He = "🇲🇾", bHe = "🇲🇿", yHe = "🇳🇦", wHe = "🇳🇨", kHe = "🇳🇪", xHe = "🇳🇫", CHe = "🇳🇬", SHe = "🇳🇮", EHe = "🇳🇱", AHe = "🇳🇴", $He = "🇳🇵", MHe = "🇳🇷", IHe = "🇳🇺", THe = "🇳🇿", LHe = "🇴🇲", OHe = "🇵🇦", RHe = "🇵🇪", PHe = "🇵🇫", BHe = "🇵🇬", zHe = "🇵🇭", DHe = "🇵🇰", NHe = "🇵🇱", qHe = "🇵🇲", FHe = "🇵🇳", HHe = "🇵🇷", jHe = "🇵🇸", VHe = "🇵🇹", UHe = "🇵🇼", ZHe = "🇵🇾", WHe = "🇶🇦", GHe = "🇷🇪", KHe = "🇷🇴", XHe = "🇷🇸", YHe = "🇷🇺", JHe = "🇷🇼", QHe = "🇸🇦", eje = "🇸🇧", tje = "🇸🇨", nje = "🇸🇩", rje = "🇸🇪", oje = "🇸🇬", sje = "🇸🇭", ije = "🇸🇮", aje = "🇸🇯", cje = "🇸🇰", lje = "🇸🇱", uje = "🇸🇲", dje = "🇸🇳", fje = "🇸🇴", pje = "🇸🇷", hje = "🇸🇸", gje = "🇸🇹", mje = "🇸🇻", vje = "🇸🇽", _je = "🇸🇾", bje = "🇸🇿", yje = "🇹🇦", wje = "🇹🇨", kje = "🇹🇩", xje = "🇹🇫", Cje = "🇹🇬", Sje = "🇹🇭", Eje = "🇹🇯", Aje = "🇹🇰", $je = "🇹🇱", Mje = "🇹🇲", Ije = "🇹🇳", Tje = "🇹🇴", Lje = "🇹🇷", Oje = "🇹🇹", Rje = "🇹🇻", Pje = "🇹🇼", Bje = "🇹🇿", zje = "🇺🇦", Dje = "🇺🇬", Nje = "🇺🇲", qje = "🇺🇳", Fje = "🇺🇸", Hje = "🇺🇾", jje = "🇺🇿", Vje = "🇻🇦", Uje = "🇻🇨", Zje = "🇻🇪", Wje = "🇻🇬", Gje = "🇻🇮", Kje = "🇻🇳", Xje = "🇻🇺", Yje = "🇼🇫", Jje = "🇼🇸", Qje = "🇽🇰", eVe = "🇾🇪", tVe = "🇾🇹", nVe = "🇿🇦", rVe = "🇿🇲", oVe = "🇿🇼", sVe = "🏴󠁧󠁢󠁥󠁮󠁧󠁿", iVe = "🏴󠁧󠁢󠁳󠁣󠁴󠁿", aVe = "🏴󠁧󠁢󠁷󠁬󠁳󠁿", cVe = {
  100: "💯",
  1234: "🔢",
  grinning: bve,
  smiley: yve,
  smile: wve,
  grin: kve,
  laughing: xve,
  satisfied: Cve,
  sweat_smile: Sve,
  rofl: Eve,
  joy: Ave,
  slightly_smiling_face: $ve,
  upside_down_face: Mve,
  wink: Ive,
  blush: Tve,
  innocent: Lve,
  smiling_face_with_three_hearts: Ove,
  heart_eyes: Rve,
  star_struck: Pve,
  kissing_heart: Bve,
  kissing: zve,
  relaxed: Dve,
  kissing_closed_eyes: Nve,
  kissing_smiling_eyes: qve,
  smiling_face_with_tear: Fve,
  yum: Hve,
  stuck_out_tongue: jve,
  stuck_out_tongue_winking_eye: Vve,
  zany_face: Uve,
  stuck_out_tongue_closed_eyes: Zve,
  money_mouth_face: Wve,
  hugs: Gve,
  hand_over_mouth: Kve,
  shushing_face: Xve,
  thinking: Yve,
  zipper_mouth_face: Jve,
  raised_eyebrow: Qve,
  neutral_face: e_e,
  expressionless: t_e,
  no_mouth: n_e,
  smirk: r_e,
  unamused: o_e,
  roll_eyes: s_e,
  grimacing: i_e,
  lying_face: a_e,
  relieved: c_e,
  pensive: l_e,
  sleepy: u_e,
  drooling_face: d_e,
  sleeping: f_e,
  mask: p_e,
  face_with_thermometer: h_e,
  face_with_head_bandage: g_e,
  nauseated_face: m_e,
  vomiting_face: v_e,
  sneezing_face: __e,
  hot_face: b_e,
  cold_face: y_e,
  woozy_face: w_e,
  dizzy_face: k_e,
  exploding_head: x_e,
  cowboy_hat_face: C_e,
  partying_face: S_e,
  disguised_face: E_e,
  sunglasses: A_e,
  nerd_face: $_e,
  monocle_face: M_e,
  confused: I_e,
  worried: T_e,
  slightly_frowning_face: L_e,
  frowning_face: O_e,
  open_mouth: R_e,
  hushed: P_e,
  astonished: B_e,
  flushed: z_e,
  pleading_face: D_e,
  frowning: N_e,
  anguished: q_e,
  fearful: F_e,
  cold_sweat: H_e,
  disappointed_relieved: j_e,
  cry: V_e,
  sob: U_e,
  scream: Z_e,
  confounded: W_e,
  persevere: G_e,
  disappointed: K_e,
  sweat: X_e,
  weary: Y_e,
  tired_face: J_e,
  yawning_face: Q_e,
  triumph: ebe,
  rage: tbe,
  pout: nbe,
  angry: rbe,
  cursing_face: obe,
  smiling_imp: sbe,
  imp: ibe,
  skull: abe,
  skull_and_crossbones: cbe,
  hankey: lbe,
  poop: ube,
  shit: dbe,
  clown_face: fbe,
  japanese_ogre: pbe,
  japanese_goblin: hbe,
  ghost: gbe,
  alien: mbe,
  space_invader: vbe,
  robot: _be,
  smiley_cat: bbe,
  smile_cat: ybe,
  joy_cat: wbe,
  heart_eyes_cat: kbe,
  smirk_cat: xbe,
  kissing_cat: Cbe,
  scream_cat: Sbe,
  crying_cat_face: Ebe,
  pouting_cat: Abe,
  see_no_evil: $be,
  hear_no_evil: Mbe,
  speak_no_evil: Ibe,
  kiss: Tbe,
  love_letter: Lbe,
  cupid: Obe,
  gift_heart: Rbe,
  sparkling_heart: Pbe,
  heartpulse: Bbe,
  heartbeat: zbe,
  revolving_hearts: Dbe,
  two_hearts: Nbe,
  heart_decoration: qbe,
  heavy_heart_exclamation: Fbe,
  broken_heart: Hbe,
  heart: jbe,
  orange_heart: Vbe,
  yellow_heart: Ube,
  green_heart: Zbe,
  blue_heart: Wbe,
  purple_heart: Gbe,
  brown_heart: Kbe,
  black_heart: Xbe,
  white_heart: Ybe,
  anger: Jbe,
  boom: Qbe,
  collision: eye,
  dizzy: tye,
  sweat_drops: nye,
  dash: rye,
  hole: oye,
  bomb: sye,
  speech_balloon: iye,
  eye_speech_bubble: aye,
  left_speech_bubble: cye,
  right_anger_bubble: lye,
  thought_balloon: uye,
  zzz: dye,
  wave: fye,
  raised_back_of_hand: pye,
  raised_hand_with_fingers_splayed: hye,
  hand: gye,
  raised_hand: mye,
  vulcan_salute: vye,
  ok_hand: _ye,
  pinched_fingers: bye,
  pinching_hand: yye,
  v: wye,
  crossed_fingers: kye,
  love_you_gesture: xye,
  metal: Cye,
  call_me_hand: Sye,
  point_left: Eye,
  point_right: Aye,
  point_up_2: $ye,
  middle_finger: Mye,
  fu: Iye,
  point_down: Tye,
  point_up: Lye,
  "+1": "👍",
  thumbsup: Oye,
  "-1": "👎",
  thumbsdown: Rye,
  fist_raised: Pye,
  fist: Bye,
  fist_oncoming: zye,
  facepunch: Dye,
  punch: Nye,
  fist_left: qye,
  fist_right: Fye,
  clap: Hye,
  raised_hands: jye,
  open_hands: Vye,
  palms_up_together: Uye,
  handshake: Zye,
  pray: Wye,
  writing_hand: Gye,
  nail_care: Kye,
  selfie: Xye,
  muscle: Yye,
  mechanical_arm: Jye,
  mechanical_leg: Qye,
  leg: ewe,
  foot: twe,
  ear: nwe,
  ear_with_hearing_aid: rwe,
  nose: owe,
  brain: swe,
  anatomical_heart: iwe,
  lungs: awe,
  tooth: cwe,
  bone: lwe,
  eyes: uwe,
  eye: dwe,
  tongue: fwe,
  lips: pwe,
  baby: hwe,
  child: gwe,
  boy: mwe,
  girl: vwe,
  adult: _we,
  blond_haired_person: bwe,
  man: ywe,
  bearded_person: wwe,
  red_haired_man: kwe,
  curly_haired_man: xwe,
  white_haired_man: Cwe,
  bald_man: Swe,
  woman: Ewe,
  red_haired_woman: Awe,
  person_red_hair: $we,
  curly_haired_woman: Mwe,
  person_curly_hair: Iwe,
  white_haired_woman: Twe,
  person_white_hair: Lwe,
  bald_woman: Owe,
  person_bald: Rwe,
  blond_haired_woman: Pwe,
  blonde_woman: Bwe,
  blond_haired_man: zwe,
  older_adult: Dwe,
  older_man: Nwe,
  older_woman: qwe,
  frowning_person: Fwe,
  frowning_man: Hwe,
  frowning_woman: jwe,
  pouting_face: Vwe,
  pouting_man: Uwe,
  pouting_woman: Zwe,
  no_good: Wwe,
  no_good_man: Gwe,
  ng_man: Kwe,
  no_good_woman: Xwe,
  ng_woman: Ywe,
  ok_person: Jwe,
  ok_man: Qwe,
  ok_woman: eke,
  tipping_hand_person: tke,
  information_desk_person: nke,
  tipping_hand_man: rke,
  sassy_man: oke,
  tipping_hand_woman: ske,
  sassy_woman: ike,
  raising_hand: ake,
  raising_hand_man: cke,
  raising_hand_woman: lke,
  deaf_person: uke,
  deaf_man: dke,
  deaf_woman: fke,
  bow: pke,
  bowing_man: hke,
  bowing_woman: gke,
  facepalm: mke,
  man_facepalming: vke,
  woman_facepalming: _ke,
  shrug: bke,
  man_shrugging: yke,
  woman_shrugging: wke,
  health_worker: kke,
  man_health_worker: xke,
  woman_health_worker: Cke,
  student: Ske,
  man_student: Eke,
  woman_student: Ake,
  teacher: $ke,
  man_teacher: Mke,
  woman_teacher: Ike,
  judge: Tke,
  man_judge: Lke,
  woman_judge: Oke,
  farmer: Rke,
  man_farmer: Pke,
  woman_farmer: Bke,
  cook: zke,
  man_cook: Dke,
  woman_cook: Nke,
  mechanic: qke,
  man_mechanic: Fke,
  woman_mechanic: Hke,
  factory_worker: jke,
  man_factory_worker: Vke,
  woman_factory_worker: Uke,
  office_worker: Zke,
  man_office_worker: Wke,
  woman_office_worker: Gke,
  scientist: Kke,
  man_scientist: Xke,
  woman_scientist: Yke,
  technologist: Jke,
  man_technologist: Qke,
  woman_technologist: e4e,
  singer: t4e,
  man_singer: n4e,
  woman_singer: r4e,
  artist: o4e,
  man_artist: s4e,
  woman_artist: i4e,
  pilot: a4e,
  man_pilot: c4e,
  woman_pilot: l4e,
  astronaut: u4e,
  man_astronaut: d4e,
  woman_astronaut: f4e,
  firefighter: p4e,
  man_firefighter: h4e,
  woman_firefighter: g4e,
  police_officer: m4e,
  cop: v4e,
  policeman: _4e,
  policewoman: b4e,
  detective: y4e,
  male_detective: w4e,
  female_detective: k4e,
  guard: x4e,
  guardsman: C4e,
  guardswoman: S4e,
  ninja: E4e,
  construction_worker: A4e,
  construction_worker_man: $4e,
  construction_worker_woman: M4e,
  prince: I4e,
  princess: T4e,
  person_with_turban: L4e,
  man_with_turban: O4e,
  woman_with_turban: R4e,
  man_with_gua_pi_mao: P4e,
  woman_with_headscarf: B4e,
  person_in_tuxedo: z4e,
  man_in_tuxedo: D4e,
  woman_in_tuxedo: N4e,
  person_with_veil: q4e,
  man_with_veil: F4e,
  woman_with_veil: H4e,
  bride_with_veil: j4e,
  pregnant_woman: V4e,
  breast_feeding: U4e,
  woman_feeding_baby: Z4e,
  man_feeding_baby: W4e,
  person_feeding_baby: G4e,
  angel: K4e,
  santa: X4e,
  mrs_claus: Y4e,
  mx_claus: J4e,
  superhero: Q4e,
  superhero_man: e3e,
  superhero_woman: t3e,
  supervillain: n3e,
  supervillain_man: r3e,
  supervillain_woman: o3e,
  mage: s3e,
  mage_man: i3e,
  mage_woman: a3e,
  fairy: c3e,
  fairy_man: l3e,
  fairy_woman: u3e,
  vampire: d3e,
  vampire_man: f3e,
  vampire_woman: p3e,
  merperson: h3e,
  merman: g3e,
  mermaid: m3e,
  elf: v3e,
  elf_man: _3e,
  elf_woman: b3e,
  genie: y3e,
  genie_man: w3e,
  genie_woman: k3e,
  zombie: x3e,
  zombie_man: C3e,
  zombie_woman: S3e,
  massage: E3e,
  massage_man: A3e,
  massage_woman: $3e,
  haircut: M3e,
  haircut_man: I3e,
  haircut_woman: T3e,
  walking: L3e,
  walking_man: O3e,
  walking_woman: R3e,
  standing_person: P3e,
  standing_man: B3e,
  standing_woman: z3e,
  kneeling_person: D3e,
  kneeling_man: N3e,
  kneeling_woman: q3e,
  person_with_probing_cane: F3e,
  man_with_probing_cane: H3e,
  woman_with_probing_cane: j3e,
  person_in_motorized_wheelchair: V3e,
  man_in_motorized_wheelchair: U3e,
  woman_in_motorized_wheelchair: Z3e,
  person_in_manual_wheelchair: W3e,
  man_in_manual_wheelchair: G3e,
  woman_in_manual_wheelchair: K3e,
  runner: X3e,
  running: Y3e,
  running_man: J3e,
  running_woman: Q3e,
  woman_dancing: e5e,
  dancer: t5e,
  man_dancing: n5e,
  business_suit_levitating: r5e,
  dancers: o5e,
  dancing_men: s5e,
  dancing_women: i5e,
  sauna_person: a5e,
  sauna_man: c5e,
  sauna_woman: l5e,
  climbing: u5e,
  climbing_man: d5e,
  climbing_woman: f5e,
  person_fencing: p5e,
  horse_racing: h5e,
  skier: g5e,
  snowboarder: m5e,
  golfing: v5e,
  golfing_man: _5e,
  golfing_woman: b5e,
  surfer: y5e,
  surfing_man: w5e,
  surfing_woman: k5e,
  rowboat: x5e,
  rowing_man: C5e,
  rowing_woman: S5e,
  swimmer: E5e,
  swimming_man: A5e,
  swimming_woman: $5e,
  bouncing_ball_person: M5e,
  bouncing_ball_man: I5e,
  basketball_man: T5e,
  bouncing_ball_woman: L5e,
  basketball_woman: O5e,
  weight_lifting: R5e,
  weight_lifting_man: P5e,
  weight_lifting_woman: B5e,
  bicyclist: z5e,
  biking_man: D5e,
  biking_woman: N5e,
  mountain_bicyclist: q5e,
  mountain_biking_man: F5e,
  mountain_biking_woman: H5e,
  cartwheeling: j5e,
  man_cartwheeling: V5e,
  woman_cartwheeling: U5e,
  wrestling: Z5e,
  men_wrestling: W5e,
  women_wrestling: G5e,
  water_polo: K5e,
  man_playing_water_polo: X5e,
  woman_playing_water_polo: Y5e,
  handball_person: J5e,
  man_playing_handball: Q5e,
  woman_playing_handball: e6e,
  juggling_person: t6e,
  man_juggling: n6e,
  woman_juggling: r6e,
  lotus_position: o6e,
  lotus_position_man: s6e,
  lotus_position_woman: i6e,
  bath: a6e,
  sleeping_bed: c6e,
  people_holding_hands: l6e,
  two_women_holding_hands: u6e,
  couple: d6e,
  two_men_holding_hands: f6e,
  couplekiss: p6e,
  couplekiss_man_woman: h6e,
  couplekiss_man_man: g6e,
  couplekiss_woman_woman: m6e,
  couple_with_heart: v6e,
  couple_with_heart_woman_man: _6e,
  couple_with_heart_man_man: b6e,
  couple_with_heart_woman_woman: y6e,
  family: w6e,
  family_man_woman_boy: k6e,
  family_man_woman_girl: x6e,
  family_man_woman_girl_boy: C6e,
  family_man_woman_boy_boy: S6e,
  family_man_woman_girl_girl: E6e,
  family_man_man_boy: A6e,
  family_man_man_girl: $6e,
  family_man_man_girl_boy: M6e,
  family_man_man_boy_boy: I6e,
  family_man_man_girl_girl: T6e,
  family_woman_woman_boy: L6e,
  family_woman_woman_girl: O6e,
  family_woman_woman_girl_boy: R6e,
  family_woman_woman_boy_boy: P6e,
  family_woman_woman_girl_girl: B6e,
  family_man_boy: z6e,
  family_man_boy_boy: D6e,
  family_man_girl: N6e,
  family_man_girl_boy: q6e,
  family_man_girl_girl: F6e,
  family_woman_boy: H6e,
  family_woman_boy_boy: j6e,
  family_woman_girl: V6e,
  family_woman_girl_boy: U6e,
  family_woman_girl_girl: Z6e,
  speaking_head: W6e,
  bust_in_silhouette: G6e,
  busts_in_silhouette: K6e,
  people_hugging: X6e,
  footprints: Y6e,
  monkey_face: J6e,
  monkey: Q6e,
  gorilla: exe,
  orangutan: txe,
  dog: nxe,
  dog2: rxe,
  guide_dog: oxe,
  service_dog: sxe,
  poodle: ixe,
  wolf: axe,
  fox_face: cxe,
  raccoon: lxe,
  cat: uxe,
  cat2: dxe,
  black_cat: fxe,
  lion: pxe,
  tiger: hxe,
  tiger2: gxe,
  leopard: mxe,
  horse: vxe,
  racehorse: _xe,
  unicorn: bxe,
  zebra: yxe,
  deer: wxe,
  bison: kxe,
  cow: xxe,
  ox: Cxe,
  water_buffalo: Sxe,
  cow2: Exe,
  pig: Axe,
  pig2: $xe,
  boar: Mxe,
  pig_nose: Ixe,
  ram: Txe,
  sheep: Lxe,
  goat: Oxe,
  dromedary_camel: Rxe,
  camel: Pxe,
  llama: Bxe,
  giraffe: zxe,
  elephant: Dxe,
  mammoth: Nxe,
  rhinoceros: qxe,
  hippopotamus: Fxe,
  mouse: Hxe,
  mouse2: jxe,
  rat: Vxe,
  hamster: Uxe,
  rabbit: Zxe,
  rabbit2: Wxe,
  chipmunk: Gxe,
  beaver: Kxe,
  hedgehog: Xxe,
  bat: Yxe,
  bear: Jxe,
  polar_bear: Qxe,
  koala: e8e,
  panda_face: t8e,
  sloth: n8e,
  otter: r8e,
  skunk: o8e,
  kangaroo: s8e,
  badger: i8e,
  feet: a8e,
  paw_prints: c8e,
  turkey: l8e,
  chicken: u8e,
  rooster: d8e,
  hatching_chick: f8e,
  baby_chick: p8e,
  hatched_chick: h8e,
  bird: g8e,
  penguin: m8e,
  dove: v8e,
  eagle: _8e,
  duck: b8e,
  swan: y8e,
  owl: w8e,
  dodo: k8e,
  feather: x8e,
  flamingo: C8e,
  peacock: S8e,
  parrot: E8e,
  frog: A8e,
  crocodile: $8e,
  turtle: M8e,
  lizard: I8e,
  snake: T8e,
  dragon_face: L8e,
  dragon: O8e,
  sauropod: R8e,
  "t-rex": "🦖",
  whale: P8e,
  whale2: B8e,
  dolphin: z8e,
  flipper: D8e,
  seal: N8e,
  fish: q8e,
  tropical_fish: F8e,
  blowfish: H8e,
  shark: j8e,
  octopus: V8e,
  shell: U8e,
  snail: Z8e,
  butterfly: W8e,
  bug: G8e,
  ant: K8e,
  bee: X8e,
  honeybee: Y8e,
  beetle: J8e,
  lady_beetle: Q8e,
  cricket: eCe,
  cockroach: tCe,
  spider: nCe,
  spider_web: rCe,
  scorpion: oCe,
  mosquito: sCe,
  fly: iCe,
  worm: aCe,
  microbe: cCe,
  bouquet: lCe,
  cherry_blossom: uCe,
  white_flower: dCe,
  rosette: fCe,
  rose: pCe,
  wilted_flower: hCe,
  hibiscus: gCe,
  sunflower: mCe,
  blossom: vCe,
  tulip: _Ce,
  seedling: bCe,
  potted_plant: yCe,
  evergreen_tree: wCe,
  deciduous_tree: kCe,
  palm_tree: xCe,
  cactus: CCe,
  ear_of_rice: SCe,
  herb: ECe,
  shamrock: ACe,
  four_leaf_clover: $Ce,
  maple_leaf: MCe,
  fallen_leaf: ICe,
  leaves: TCe,
  grapes: LCe,
  melon: OCe,
  watermelon: RCe,
  tangerine: PCe,
  orange: BCe,
  mandarin: zCe,
  lemon: DCe,
  banana: NCe,
  pineapple: qCe,
  mango: FCe,
  apple: HCe,
  green_apple: jCe,
  pear: VCe,
  peach: UCe,
  cherries: ZCe,
  strawberry: WCe,
  blueberries: GCe,
  kiwi_fruit: KCe,
  tomato: XCe,
  olive: YCe,
  coconut: JCe,
  avocado: QCe,
  eggplant: e9e,
  potato: t9e,
  carrot: n9e,
  corn: r9e,
  hot_pepper: o9e,
  bell_pepper: s9e,
  cucumber: i9e,
  leafy_green: a9e,
  broccoli: c9e,
  garlic: l9e,
  onion: u9e,
  mushroom: d9e,
  peanuts: f9e,
  chestnut: p9e,
  bread: h9e,
  croissant: g9e,
  baguette_bread: m9e,
  flatbread: v9e,
  pretzel: _9e,
  bagel: b9e,
  pancakes: y9e,
  waffle: w9e,
  cheese: k9e,
  meat_on_bone: x9e,
  poultry_leg: C9e,
  cut_of_meat: S9e,
  bacon: E9e,
  hamburger: A9e,
  fries: $9e,
  pizza: M9e,
  hotdog: I9e,
  sandwich: T9e,
  taco: L9e,
  burrito: O9e,
  tamale: R9e,
  stuffed_flatbread: P9e,
  falafel: B9e,
  egg: z9e,
  fried_egg: D9e,
  shallow_pan_of_food: N9e,
  stew: q9e,
  fondue: F9e,
  bowl_with_spoon: H9e,
  green_salad: j9e,
  popcorn: V9e,
  butter: U9e,
  salt: Z9e,
  canned_food: W9e,
  bento: G9e,
  rice_cracker: K9e,
  rice_ball: X9e,
  rice: Y9e,
  curry: J9e,
  ramen: Q9e,
  spaghetti: e7e,
  sweet_potato: t7e,
  oden: n7e,
  sushi: r7e,
  fried_shrimp: o7e,
  fish_cake: s7e,
  moon_cake: i7e,
  dango: a7e,
  dumpling: c7e,
  fortune_cookie: l7e,
  takeout_box: u7e,
  crab: d7e,
  lobster: f7e,
  shrimp: p7e,
  squid: h7e,
  oyster: g7e,
  icecream: m7e,
  shaved_ice: v7e,
  ice_cream: _7e,
  doughnut: b7e,
  cookie: y7e,
  birthday: w7e,
  cake: k7e,
  cupcake: x7e,
  pie: C7e,
  chocolate_bar: S7e,
  candy: E7e,
  lollipop: A7e,
  custard: $7e,
  honey_pot: M7e,
  baby_bottle: I7e,
  milk_glass: T7e,
  coffee: L7e,
  teapot: O7e,
  tea: R7e,
  sake: P7e,
  champagne: B7e,
  wine_glass: z7e,
  cocktail: D7e,
  tropical_drink: N7e,
  beer: q7e,
  beers: F7e,
  clinking_glasses: H7e,
  tumbler_glass: j7e,
  cup_with_straw: V7e,
  bubble_tea: U7e,
  beverage_box: Z7e,
  mate: W7e,
  ice_cube: G7e,
  chopsticks: K7e,
  plate_with_cutlery: X7e,
  fork_and_knife: Y7e,
  spoon: J7e,
  hocho: Q7e,
  knife: eSe,
  amphora: tSe,
  earth_africa: nSe,
  earth_americas: rSe,
  earth_asia: oSe,
  globe_with_meridians: sSe,
  world_map: iSe,
  japan: aSe,
  compass: cSe,
  mountain_snow: lSe,
  mountain: uSe,
  volcano: dSe,
  mount_fuji: fSe,
  camping: pSe,
  beach_umbrella: hSe,
  desert: gSe,
  desert_island: mSe,
  national_park: vSe,
  stadium: _Se,
  classical_building: bSe,
  building_construction: ySe,
  bricks: wSe,
  rock: kSe,
  wood: xSe,
  hut: CSe,
  houses: SSe,
  derelict_house: ESe,
  house: ASe,
  house_with_garden: $Se,
  office: MSe,
  post_office: ISe,
  european_post_office: TSe,
  hospital: LSe,
  bank: OSe,
  hotel: RSe,
  love_hotel: PSe,
  convenience_store: BSe,
  school: zSe,
  department_store: DSe,
  factory: NSe,
  japanese_castle: qSe,
  european_castle: FSe,
  wedding: HSe,
  tokyo_tower: jSe,
  statue_of_liberty: VSe,
  church: USe,
  mosque: ZSe,
  hindu_temple: WSe,
  synagogue: GSe,
  shinto_shrine: KSe,
  kaaba: XSe,
  fountain: YSe,
  tent: JSe,
  foggy: QSe,
  night_with_stars: eEe,
  cityscape: tEe,
  sunrise_over_mountains: nEe,
  sunrise: rEe,
  city_sunset: oEe,
  city_sunrise: sEe,
  bridge_at_night: iEe,
  hotsprings: aEe,
  carousel_horse: cEe,
  ferris_wheel: lEe,
  roller_coaster: uEe,
  barber: dEe,
  circus_tent: fEe,
  steam_locomotive: pEe,
  railway_car: hEe,
  bullettrain_side: gEe,
  bullettrain_front: mEe,
  train2: vEe,
  metro: _Ee,
  light_rail: bEe,
  station: yEe,
  tram: wEe,
  monorail: kEe,
  mountain_railway: xEe,
  train: CEe,
  bus: SEe,
  oncoming_bus: EEe,
  trolleybus: AEe,
  minibus: $Ee,
  ambulance: MEe,
  fire_engine: IEe,
  police_car: TEe,
  oncoming_police_car: LEe,
  taxi: OEe,
  oncoming_taxi: REe,
  car: PEe,
  red_car: BEe,
  oncoming_automobile: zEe,
  blue_car: DEe,
  pickup_truck: NEe,
  truck: qEe,
  articulated_lorry: FEe,
  tractor: HEe,
  racing_car: jEe,
  motorcycle: VEe,
  motor_scooter: UEe,
  manual_wheelchair: ZEe,
  motorized_wheelchair: WEe,
  auto_rickshaw: GEe,
  bike: KEe,
  kick_scooter: XEe,
  skateboard: YEe,
  roller_skate: JEe,
  busstop: QEe,
  motorway: eAe,
  railway_track: tAe,
  oil_drum: nAe,
  fuelpump: rAe,
  rotating_light: oAe,
  traffic_light: sAe,
  vertical_traffic_light: iAe,
  stop_sign: aAe,
  construction: cAe,
  anchor: lAe,
  boat: uAe,
  sailboat: dAe,
  canoe: fAe,
  speedboat: pAe,
  passenger_ship: hAe,
  ferry: gAe,
  motor_boat: mAe,
  ship: vAe,
  airplane: _Ae,
  small_airplane: bAe,
  flight_departure: yAe,
  flight_arrival: wAe,
  parachute: kAe,
  seat: xAe,
  helicopter: CAe,
  suspension_railway: SAe,
  mountain_cableway: EAe,
  aerial_tramway: AAe,
  artificial_satellite: $Ae,
  rocket: MAe,
  flying_saucer: IAe,
  bellhop_bell: TAe,
  luggage: LAe,
  hourglass: OAe,
  hourglass_flowing_sand: RAe,
  watch: PAe,
  alarm_clock: BAe,
  stopwatch: zAe,
  timer_clock: DAe,
  mantelpiece_clock: NAe,
  clock12: qAe,
  clock1230: FAe,
  clock1: HAe,
  clock130: jAe,
  clock2: VAe,
  clock230: UAe,
  clock3: ZAe,
  clock330: WAe,
  clock4: GAe,
  clock430: KAe,
  clock5: XAe,
  clock530: YAe,
  clock6: JAe,
  clock630: QAe,
  clock7: e$e,
  clock730: t$e,
  clock8: n$e,
  clock830: r$e,
  clock9: o$e,
  clock930: s$e,
  clock10: i$e,
  clock1030: a$e,
  clock11: c$e,
  clock1130: l$e,
  new_moon: u$e,
  waxing_crescent_moon: d$e,
  first_quarter_moon: f$e,
  moon: p$e,
  waxing_gibbous_moon: h$e,
  full_moon: g$e,
  waning_gibbous_moon: m$e,
  last_quarter_moon: v$e,
  waning_crescent_moon: _$e,
  crescent_moon: b$e,
  new_moon_with_face: y$e,
  first_quarter_moon_with_face: w$e,
  last_quarter_moon_with_face: k$e,
  thermometer: x$e,
  sunny: C$e,
  full_moon_with_face: S$e,
  sun_with_face: E$e,
  ringed_planet: A$e,
  star: $$e,
  star2: M$e,
  stars: I$e,
  milky_way: T$e,
  cloud: L$e,
  partly_sunny: O$e,
  cloud_with_lightning_and_rain: R$e,
  sun_behind_small_cloud: P$e,
  sun_behind_large_cloud: B$e,
  sun_behind_rain_cloud: z$e,
  cloud_with_rain: D$e,
  cloud_with_snow: N$e,
  cloud_with_lightning: q$e,
  tornado: F$e,
  fog: H$e,
  wind_face: j$e,
  cyclone: V$e,
  rainbow: U$e,
  closed_umbrella: Z$e,
  open_umbrella: W$e,
  umbrella: G$e,
  parasol_on_ground: K$e,
  zap: X$e,
  snowflake: Y$e,
  snowman_with_snow: J$e,
  snowman: Q$e,
  comet: eMe,
  fire: tMe,
  droplet: nMe,
  ocean: rMe,
  jack_o_lantern: oMe,
  christmas_tree: sMe,
  fireworks: iMe,
  sparkler: aMe,
  firecracker: cMe,
  sparkles: lMe,
  balloon: uMe,
  tada: dMe,
  confetti_ball: fMe,
  tanabata_tree: pMe,
  bamboo: hMe,
  dolls: gMe,
  flags: mMe,
  wind_chime: vMe,
  rice_scene: _Me,
  red_envelope: bMe,
  ribbon: yMe,
  gift: wMe,
  reminder_ribbon: kMe,
  tickets: xMe,
  ticket: CMe,
  medal_military: SMe,
  trophy: EMe,
  medal_sports: AMe,
  "1st_place_medal": "🥇",
  "2nd_place_medal": "🥈",
  "3rd_place_medal": "🥉",
  soccer: $Me,
  baseball: MMe,
  softball: IMe,
  basketball: TMe,
  volleyball: LMe,
  football: OMe,
  rugby_football: RMe,
  tennis: PMe,
  flying_disc: BMe,
  bowling: zMe,
  cricket_game: DMe,
  field_hockey: NMe,
  ice_hockey: qMe,
  lacrosse: FMe,
  ping_pong: HMe,
  badminton: jMe,
  boxing_glove: VMe,
  martial_arts_uniform: UMe,
  goal_net: ZMe,
  golf: WMe,
  ice_skate: GMe,
  fishing_pole_and_fish: KMe,
  diving_mask: XMe,
  running_shirt_with_sash: YMe,
  ski: JMe,
  sled: QMe,
  curling_stone: eIe,
  dart: tIe,
  yo_yo: nIe,
  kite: rIe,
  "8ball": "🎱",
  crystal_ball: oIe,
  magic_wand: sIe,
  nazar_amulet: iIe,
  video_game: aIe,
  joystick: cIe,
  slot_machine: lIe,
  game_die: uIe,
  jigsaw: dIe,
  teddy_bear: fIe,
  pinata: pIe,
  nesting_dolls: hIe,
  spades: gIe,
  hearts: mIe,
  diamonds: vIe,
  clubs: _Ie,
  chess_pawn: bIe,
  black_joker: yIe,
  mahjong: wIe,
  flower_playing_cards: kIe,
  performing_arts: xIe,
  framed_picture: CIe,
  art: SIe,
  thread: EIe,
  sewing_needle: AIe,
  yarn: $Ie,
  knot: MIe,
  eyeglasses: IIe,
  dark_sunglasses: TIe,
  goggles: LIe,
  lab_coat: OIe,
  safety_vest: RIe,
  necktie: PIe,
  shirt: BIe,
  tshirt: zIe,
  jeans: DIe,
  scarf: NIe,
  gloves: qIe,
  coat: FIe,
  socks: HIe,
  dress: jIe,
  kimono: VIe,
  sari: UIe,
  one_piece_swimsuit: ZIe,
  swim_brief: WIe,
  shorts: GIe,
  bikini: KIe,
  womans_clothes: XIe,
  purse: YIe,
  handbag: JIe,
  pouch: QIe,
  shopping: eTe,
  school_satchel: tTe,
  thong_sandal: nTe,
  mans_shoe: rTe,
  shoe: oTe,
  athletic_shoe: sTe,
  hiking_boot: iTe,
  flat_shoe: aTe,
  high_heel: cTe,
  sandal: lTe,
  ballet_shoes: uTe,
  boot: dTe,
  crown: fTe,
  womans_hat: pTe,
  tophat: hTe,
  mortar_board: gTe,
  billed_cap: mTe,
  military_helmet: vTe,
  rescue_worker_helmet: _Te,
  prayer_beads: bTe,
  lipstick: yTe,
  ring: wTe,
  gem: kTe,
  mute: xTe,
  speaker: CTe,
  sound: STe,
  loud_sound: ETe,
  loudspeaker: ATe,
  mega: $Te,
  postal_horn: MTe,
  bell: ITe,
  no_bell: TTe,
  musical_score: LTe,
  musical_note: OTe,
  notes: RTe,
  studio_microphone: PTe,
  level_slider: BTe,
  control_knobs: zTe,
  microphone: DTe,
  headphones: NTe,
  radio: qTe,
  saxophone: FTe,
  accordion: HTe,
  guitar: jTe,
  musical_keyboard: VTe,
  trumpet: UTe,
  violin: ZTe,
  banjo: WTe,
  drum: GTe,
  long_drum: KTe,
  iphone: XTe,
  calling: YTe,
  phone: JTe,
  telephone: QTe,
  telephone_receiver: eLe,
  pager: tLe,
  fax: nLe,
  battery: rLe,
  electric_plug: oLe,
  computer: sLe,
  desktop_computer: iLe,
  printer: aLe,
  keyboard: cLe,
  computer_mouse: lLe,
  trackball: uLe,
  minidisc: dLe,
  floppy_disk: fLe,
  cd: pLe,
  dvd: hLe,
  abacus: gLe,
  movie_camera: mLe,
  film_strip: vLe,
  film_projector: _Le,
  clapper: bLe,
  tv: yLe,
  camera: wLe,
  camera_flash: kLe,
  video_camera: xLe,
  vhs: CLe,
  mag: SLe,
  mag_right: ELe,
  candle: ALe,
  bulb: $Le,
  flashlight: MLe,
  izakaya_lantern: ILe,
  lantern: TLe,
  diya_lamp: LLe,
  notebook_with_decorative_cover: OLe,
  closed_book: RLe,
  book: PLe,
  open_book: BLe,
  green_book: zLe,
  blue_book: DLe,
  orange_book: NLe,
  books: qLe,
  notebook: FLe,
  ledger: HLe,
  page_with_curl: jLe,
  scroll: VLe,
  page_facing_up: ULe,
  newspaper: ZLe,
  newspaper_roll: WLe,
  bookmark_tabs: GLe,
  bookmark: KLe,
  label: XLe,
  moneybag: YLe,
  coin: JLe,
  yen: QLe,
  dollar: eOe,
  euro: tOe,
  pound: nOe,
  money_with_wings: rOe,
  credit_card: oOe,
  receipt: sOe,
  chart: iOe,
  envelope: aOe,
  email: cOe,
  "e-mail": "📧",
  incoming_envelope: lOe,
  envelope_with_arrow: uOe,
  outbox_tray: dOe,
  inbox_tray: fOe,
  package: "📦",
  mailbox: pOe,
  mailbox_closed: hOe,
  mailbox_with_mail: gOe,
  mailbox_with_no_mail: mOe,
  postbox: vOe,
  ballot_box: _Oe,
  pencil2: bOe,
  black_nib: yOe,
  fountain_pen: wOe,
  pen: kOe,
  paintbrush: xOe,
  crayon: COe,
  memo: SOe,
  pencil: EOe,
  briefcase: AOe,
  file_folder: $Oe,
  open_file_folder: MOe,
  card_index_dividers: IOe,
  date: TOe,
  calendar: LOe,
  spiral_notepad: OOe,
  spiral_calendar: ROe,
  card_index: POe,
  chart_with_upwards_trend: BOe,
  chart_with_downwards_trend: zOe,
  bar_chart: DOe,
  clipboard: NOe,
  pushpin: qOe,
  round_pushpin: FOe,
  paperclip: HOe,
  paperclips: jOe,
  straight_ruler: VOe,
  triangular_ruler: UOe,
  scissors: ZOe,
  card_file_box: WOe,
  file_cabinet: GOe,
  wastebasket: KOe,
  lock: XOe,
  unlock: YOe,
  lock_with_ink_pen: JOe,
  closed_lock_with_key: QOe,
  key: eRe,
  old_key: tRe,
  hammer: nRe,
  axe: rRe,
  pick: oRe,
  hammer_and_pick: sRe,
  hammer_and_wrench: iRe,
  dagger: aRe,
  crossed_swords: cRe,
  gun: lRe,
  boomerang: uRe,
  bow_and_arrow: dRe,
  shield: fRe,
  carpentry_saw: pRe,
  wrench: hRe,
  screwdriver: gRe,
  nut_and_bolt: mRe,
  gear: vRe,
  clamp: _Re,
  balance_scale: bRe,
  probing_cane: yRe,
  link: wRe,
  chains: kRe,
  hook: xRe,
  toolbox: CRe,
  magnet: SRe,
  ladder: ERe,
  alembic: ARe,
  test_tube: $Re,
  petri_dish: MRe,
  dna: IRe,
  microscope: TRe,
  telescope: LRe,
  satellite: ORe,
  syringe: RRe,
  drop_of_blood: PRe,
  pill: BRe,
  adhesive_bandage: zRe,
  stethoscope: DRe,
  door: NRe,
  elevator: qRe,
  mirror: FRe,
  window: HRe,
  bed: jRe,
  couch_and_lamp: VRe,
  chair: URe,
  toilet: ZRe,
  plunger: WRe,
  shower: GRe,
  bathtub: KRe,
  mouse_trap: XRe,
  razor: YRe,
  lotion_bottle: JRe,
  safety_pin: QRe,
  broom: ePe,
  basket: tPe,
  roll_of_paper: nPe,
  bucket: rPe,
  soap: oPe,
  toothbrush: sPe,
  sponge: iPe,
  fire_extinguisher: aPe,
  shopping_cart: cPe,
  smoking: lPe,
  coffin: uPe,
  headstone: dPe,
  funeral_urn: fPe,
  moyai: pPe,
  placard: hPe,
  atm: gPe,
  put_litter_in_its_place: mPe,
  potable_water: vPe,
  wheelchair: _Pe,
  mens: bPe,
  womens: yPe,
  restroom: wPe,
  baby_symbol: kPe,
  wc: xPe,
  passport_control: CPe,
  customs: SPe,
  baggage_claim: EPe,
  left_luggage: APe,
  warning: $Pe,
  children_crossing: MPe,
  no_entry: IPe,
  no_entry_sign: TPe,
  no_bicycles: LPe,
  no_smoking: OPe,
  do_not_litter: RPe,
  "non-potable_water": "🚱",
  no_pedestrians: PPe,
  no_mobile_phones: BPe,
  underage: zPe,
  radioactive: DPe,
  biohazard: NPe,
  arrow_up: qPe,
  arrow_upper_right: FPe,
  arrow_right: HPe,
  arrow_lower_right: jPe,
  arrow_down: VPe,
  arrow_lower_left: UPe,
  arrow_left: ZPe,
  arrow_upper_left: WPe,
  arrow_up_down: GPe,
  left_right_arrow: KPe,
  leftwards_arrow_with_hook: XPe,
  arrow_right_hook: YPe,
  arrow_heading_up: JPe,
  arrow_heading_down: QPe,
  arrows_clockwise: eBe,
  arrows_counterclockwise: tBe,
  back: nBe,
  end: rBe,
  on: oBe,
  soon: sBe,
  top: iBe,
  place_of_worship: aBe,
  atom_symbol: cBe,
  om: lBe,
  star_of_david: uBe,
  wheel_of_dharma: dBe,
  yin_yang: fBe,
  latin_cross: pBe,
  orthodox_cross: hBe,
  star_and_crescent: gBe,
  peace_symbol: mBe,
  menorah: vBe,
  six_pointed_star: _Be,
  aries: bBe,
  taurus: yBe,
  gemini: wBe,
  cancer: kBe,
  leo: xBe,
  virgo: CBe,
  libra: SBe,
  scorpius: EBe,
  sagittarius: ABe,
  capricorn: $Be,
  aquarius: MBe,
  pisces: IBe,
  ophiuchus: TBe,
  twisted_rightwards_arrows: LBe,
  repeat: OBe,
  repeat_one: RBe,
  arrow_forward: PBe,
  fast_forward: BBe,
  next_track_button: zBe,
  play_or_pause_button: DBe,
  arrow_backward: NBe,
  rewind: qBe,
  previous_track_button: FBe,
  arrow_up_small: HBe,
  arrow_double_up: jBe,
  arrow_down_small: VBe,
  arrow_double_down: UBe,
  pause_button: ZBe,
  stop_button: WBe,
  record_button: GBe,
  eject_button: KBe,
  cinema: XBe,
  low_brightness: YBe,
  high_brightness: JBe,
  signal_strength: QBe,
  vibration_mode: eze,
  mobile_phone_off: tze,
  female_sign: nze,
  male_sign: rze,
  transgender_symbol: oze,
  heavy_multiplication_x: sze,
  heavy_plus_sign: ize,
  heavy_minus_sign: aze,
  heavy_division_sign: cze,
  infinity: lze,
  bangbang: uze,
  interrobang: dze,
  question: fze,
  grey_question: pze,
  grey_exclamation: hze,
  exclamation: gze,
  heavy_exclamation_mark: mze,
  wavy_dash: vze,
  currency_exchange: _ze,
  heavy_dollar_sign: bze,
  medical_symbol: yze,
  recycle: wze,
  fleur_de_lis: kze,
  trident: xze,
  name_badge: Cze,
  beginner: Sze,
  o: Eze,
  white_check_mark: Aze,
  ballot_box_with_check: $ze,
  heavy_check_mark: Mze,
  x: Ize,
  negative_squared_cross_mark: Tze,
  curly_loop: Lze,
  loop: Oze,
  part_alternation_mark: Rze,
  eight_spoked_asterisk: Pze,
  eight_pointed_black_star: Bze,
  sparkle: zze,
  copyright: Dze,
  registered: Nze,
  tm: qze,
  hash: Fze,
  asterisk: Hze,
  zero: jze,
  one: Vze,
  two: Uze,
  three: Zze,
  four: Wze,
  five: Gze,
  six: Kze,
  seven: Xze,
  eight: Yze,
  nine: Jze,
  keycap_ten: Qze,
  capital_abcd: eDe,
  abcd: tDe,
  symbols: nDe,
  abc: rDe,
  a: oDe,
  ab: sDe,
  b: iDe,
  cl: aDe,
  cool: cDe,
  free: lDe,
  information_source: uDe,
  id: dDe,
  m: fDe,
  new: "🆕",
  ng: pDe,
  o2: hDe,
  ok: gDe,
  parking: mDe,
  sos: vDe,
  up: _De,
  vs: bDe,
  koko: yDe,
  sa: wDe,
  ideograph_advantage: kDe,
  accept: xDe,
  congratulations: CDe,
  secret: SDe,
  u6e80: EDe,
  red_circle: ADe,
  orange_circle: $De,
  yellow_circle: MDe,
  green_circle: IDe,
  large_blue_circle: TDe,
  purple_circle: LDe,
  brown_circle: ODe,
  black_circle: RDe,
  white_circle: PDe,
  red_square: BDe,
  orange_square: zDe,
  yellow_square: DDe,
  green_square: NDe,
  blue_square: qDe,
  purple_square: FDe,
  brown_square: HDe,
  black_large_square: jDe,
  white_large_square: VDe,
  black_medium_square: UDe,
  white_medium_square: ZDe,
  black_medium_small_square: WDe,
  white_medium_small_square: GDe,
  black_small_square: KDe,
  white_small_square: XDe,
  large_orange_diamond: YDe,
  large_blue_diamond: JDe,
  small_orange_diamond: QDe,
  small_blue_diamond: eNe,
  small_red_triangle: tNe,
  small_red_triangle_down: nNe,
  diamond_shape_with_a_dot_inside: rNe,
  radio_button: oNe,
  white_square_button: sNe,
  black_square_button: iNe,
  checkered_flag: aNe,
  triangular_flag_on_post: cNe,
  crossed_flags: lNe,
  black_flag: uNe,
  white_flag: dNe,
  rainbow_flag: fNe,
  transgender_flag: pNe,
  pirate_flag: hNe,
  ascension_island: gNe,
  andorra: mNe,
  united_arab_emirates: vNe,
  afghanistan: _Ne,
  antigua_barbuda: bNe,
  anguilla: yNe,
  albania: wNe,
  armenia: kNe,
  angola: xNe,
  antarctica: CNe,
  argentina: SNe,
  american_samoa: ENe,
  austria: ANe,
  australia: $Ne,
  aruba: MNe,
  aland_islands: INe,
  azerbaijan: TNe,
  bosnia_herzegovina: LNe,
  barbados: ONe,
  bangladesh: RNe,
  belgium: PNe,
  burkina_faso: BNe,
  bulgaria: zNe,
  bahrain: DNe,
  burundi: NNe,
  benin: qNe,
  st_barthelemy: FNe,
  bermuda: HNe,
  brunei: jNe,
  bolivia: VNe,
  caribbean_netherlands: UNe,
  brazil: ZNe,
  bahamas: WNe,
  bhutan: GNe,
  bouvet_island: KNe,
  botswana: XNe,
  belarus: YNe,
  belize: JNe,
  canada: QNe,
  cocos_islands: eqe,
  congo_kinshasa: tqe,
  central_african_republic: nqe,
  congo_brazzaville: rqe,
  switzerland: oqe,
  cote_divoire: sqe,
  cook_islands: iqe,
  chile: aqe,
  cameroon: cqe,
  cn: lqe,
  colombia: uqe,
  clipperton_island: dqe,
  costa_rica: fqe,
  cuba: pqe,
  cape_verde: hqe,
  curacao: gqe,
  christmas_island: mqe,
  cyprus: vqe,
  czech_republic: _qe,
  de: bqe,
  diego_garcia: yqe,
  djibouti: wqe,
  denmark: kqe,
  dominica: xqe,
  dominican_republic: Cqe,
  algeria: Sqe,
  ceuta_melilla: Eqe,
  ecuador: Aqe,
  estonia: $qe,
  egypt: Mqe,
  western_sahara: Iqe,
  eritrea: Tqe,
  es: Lqe,
  ethiopia: Oqe,
  eu: Rqe,
  european_union: Pqe,
  finland: Bqe,
  fiji: zqe,
  falkland_islands: Dqe,
  micronesia: Nqe,
  faroe_islands: qqe,
  fr: Fqe,
  gabon: Hqe,
  gb: jqe,
  uk: Vqe,
  grenada: Uqe,
  georgia: Zqe,
  french_guiana: Wqe,
  guernsey: Gqe,
  ghana: Kqe,
  gibraltar: Xqe,
  greenland: Yqe,
  gambia: Jqe,
  guinea: Qqe,
  guadeloupe: eFe,
  equatorial_guinea: tFe,
  greece: nFe,
  south_georgia_south_sandwich_islands: rFe,
  guatemala: oFe,
  guam: sFe,
  guinea_bissau: iFe,
  guyana: aFe,
  hong_kong: cFe,
  heard_mcdonald_islands: lFe,
  honduras: uFe,
  croatia: dFe,
  haiti: fFe,
  hungary: pFe,
  canary_islands: hFe,
  indonesia: gFe,
  ireland: mFe,
  israel: vFe,
  isle_of_man: _Fe,
  india: bFe,
  british_indian_ocean_territory: yFe,
  iraq: wFe,
  iran: kFe,
  iceland: xFe,
  it: CFe,
  jersey: SFe,
  jamaica: EFe,
  jordan: AFe,
  jp: $Fe,
  kenya: MFe,
  kyrgyzstan: IFe,
  cambodia: TFe,
  kiribati: LFe,
  comoros: OFe,
  st_kitts_nevis: RFe,
  north_korea: PFe,
  kr: BFe,
  kuwait: zFe,
  cayman_islands: DFe,
  kazakhstan: NFe,
  laos: qFe,
  lebanon: FFe,
  st_lucia: HFe,
  liechtenstein: jFe,
  sri_lanka: VFe,
  liberia: UFe,
  lesotho: ZFe,
  lithuania: WFe,
  luxembourg: GFe,
  latvia: KFe,
  libya: XFe,
  morocco: YFe,
  monaco: JFe,
  moldova: QFe,
  montenegro: eHe,
  st_martin: tHe,
  madagascar: nHe,
  marshall_islands: rHe,
  macedonia: oHe,
  mali: sHe,
  myanmar: iHe,
  mongolia: aHe,
  macau: cHe,
  northern_mariana_islands: lHe,
  martinique: uHe,
  mauritania: dHe,
  montserrat: fHe,
  malta: pHe,
  mauritius: hHe,
  maldives: gHe,
  malawi: mHe,
  mexico: vHe,
  malaysia: _He,
  mozambique: bHe,
  namibia: yHe,
  new_caledonia: wHe,
  niger: kHe,
  norfolk_island: xHe,
  nigeria: CHe,
  nicaragua: SHe,
  netherlands: EHe,
  norway: AHe,
  nepal: $He,
  nauru: MHe,
  niue: IHe,
  new_zealand: THe,
  oman: LHe,
  panama: OHe,
  peru: RHe,
  french_polynesia: PHe,
  papua_new_guinea: BHe,
  philippines: zHe,
  pakistan: DHe,
  poland: NHe,
  st_pierre_miquelon: qHe,
  pitcairn_islands: FHe,
  puerto_rico: HHe,
  palestinian_territories: jHe,
  portugal: VHe,
  palau: UHe,
  paraguay: ZHe,
  qatar: WHe,
  reunion: GHe,
  romania: KHe,
  serbia: XHe,
  ru: YHe,
  rwanda: JHe,
  saudi_arabia: QHe,
  solomon_islands: eje,
  seychelles: tje,
  sudan: nje,
  sweden: rje,
  singapore: oje,
  st_helena: sje,
  slovenia: ije,
  svalbard_jan_mayen: aje,
  slovakia: cje,
  sierra_leone: lje,
  san_marino: uje,
  senegal: dje,
  somalia: fje,
  suriname: pje,
  south_sudan: hje,
  sao_tome_principe: gje,
  el_salvador: mje,
  sint_maarten: vje,
  syria: _je,
  swaziland: bje,
  tristan_da_cunha: yje,
  turks_caicos_islands: wje,
  chad: kje,
  french_southern_territories: xje,
  togo: Cje,
  thailand: Sje,
  tajikistan: Eje,
  tokelau: Aje,
  timor_leste: $je,
  turkmenistan: Mje,
  tunisia: Ije,
  tonga: Tje,
  tr: Lje,
  trinidad_tobago: Oje,
  tuvalu: Rje,
  taiwan: Pje,
  tanzania: Bje,
  ukraine: zje,
  uganda: Dje,
  us_outlying_islands: Nje,
  united_nations: qje,
  us: Fje,
  uruguay: Hje,
  uzbekistan: jje,
  vatican_city: Vje,
  st_vincent_grenadines: Uje,
  venezuela: Zje,
  british_virgin_islands: Wje,
  us_virgin_islands: Gje,
  vietnam: Kje,
  vanuatu: Xje,
  wallis_futuna: Yje,
  samoa: Jje,
  kosovo: Qje,
  yemen: eVe,
  mayotte: tVe,
  south_africa: nVe,
  zambia: rVe,
  zimbabwe: oVe,
  england: sVe,
  scotland: iVe,
  wales: aVe
};
var oa, Xf;
function lVe() {
  return Xf || (Xf = 1, oa = {
    angry: [">:(", ">:-("],
    blush: [':")', ':-")'],
    broken_heart: ["</3", "<\\3"],
    // :\ and :-\ not used because of conflict with markdown escaping
    confused: [":/", ":-/"],
    // twemoji shows question
    cry: [":'(", ":'-(", ":,(", ":,-("],
    frowning: [":(", ":-("],
    heart: ["<3"],
    imp: ["]:(", "]:-("],
    innocent: ["o:)", "O:)", "o:-)", "O:-)", "0:)", "0:-)"],
    joy: [":')", ":'-)", ":,)", ":,-)", ":'D", ":'-D", ":,D", ":,-D"],
    kissing: [":*", ":-*"],
    laughing: ["x-)", "X-)"],
    neutral_face: [":|", ":-|"],
    open_mouth: [":o", ":-o", ":O", ":-O"],
    rage: [":@", ":-@"],
    smile: [":D", ":-D"],
    smiley: [":)", ":-)"],
    smiling_imp: ["]:)", "]:-)"],
    sob: [":,'(", ":,'-(", ";(", ";-("],
    stuck_out_tongue: [":P", ":-P"],
    sunglasses: ["8-)", "B-)"],
    sweat: [",:(", ",:-("],
    sweat_smile: [",:)", ",:-)"],
    unamused: [":s", ":-S", ":z", ":-Z", ":$", ":-$"],
    wink: [";)", ";-)"]
  }), oa;
}
var sa, Yf;
function uVe() {
  return Yf || (Yf = 1, sa = function(t, n) {
    return t[n].content;
  }), sa;
}
var ia, Jf;
function dVe() {
  return Jf || (Jf = 1, ia = function(t, n, r, s, o) {
    var i = t.utils.arrayReplaceAt, a = t.utils.lib.ucmicro, c = new RegExp([a.Z.source, a.P.source, a.Cc.source].join("|"));
    function u(d, l, m) {
      var f, v = 0, g = [];
      return d.replace(o, function(y, h, w) {
        var k;
        if (r.hasOwnProperty(y)) {
          if (k = r[y], h > 0 && !c.test(w[h - 1]) || h + y.length < w.length && !c.test(w[h + y.length]))
            return;
        } else
          k = y.slice(1, -1);
        h > v && (f = new m("text", "", 0), f.content = d.slice(v, h), g.push(f)), f = new m("emoji", "", 0), f.markup = k, f.content = n[k], g.push(f), v = h + y.length;
      }), v < d.length && (f = new m("text", "", 0), f.content = d.slice(v), g.push(f)), g;
    }
    return function(l) {
      var m, f, v, g, y, h = l.tokens, w = 0;
      for (f = 0, v = h.length; f < v; f++)
        if (h[f].type === "inline")
          for (g = h[f].children, m = g.length - 1; m >= 0; m--)
            y = g[m], (y.type === "link_open" || y.type === "link_close") && y.info === "auto" && (w -= y.nesting), y.type === "text" && w === 0 && s.test(y.content) && (h[f].children = g = i(
              g,
              m,
              u(y.content, y.level, l.Token)
            ));
    };
  }), ia;
}
var aa, Qf;
function fVe() {
  if (Qf) return aa;
  Qf = 1;
  function e(t) {
    return t.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  return aa = function(n) {
    var r = n.defs, s;
    n.enabled.length && (r = Object.keys(r).reduce(function(u, d) {
      return n.enabled.indexOf(d) >= 0 && (u[d] = r[d]), u;
    }, {})), s = Object.keys(n.shortcuts).reduce(function(u, d) {
      return r[d] ? Array.isArray(n.shortcuts[d]) ? (n.shortcuts[d].forEach(function(l) {
        u[l] = d;
      }), u) : (u[n.shortcuts[d]] = d, u) : u;
    }, {});
    var o = Object.keys(r), i;
    o.length === 0 ? i = "^$" : i = o.map(function(u) {
      return ":" + u + ":";
    }).concat(Object.keys(s)).sort().reverse().map(function(u) {
      return e(u);
    }).join("|");
    var a = RegExp(i), c = RegExp(i, "g");
    return {
      defs: r,
      shortcuts: s,
      scanRE: a,
      replaceRE: c
    };
  }, aa;
}
var ca, e0;
function pVe() {
  if (e0) return ca;
  e0 = 1;
  var e = uVe(), t = dVe(), n = fVe();
  return ca = function(s, o) {
    var i = {
      defs: {},
      shortcuts: {},
      enabled: []
    }, a = n(s.utils.assign({}, i, o || {}));
    s.renderer.rules.emoji = e, s.core.ruler.after(
      "linkify",
      "emoji",
      t(s, a.defs, a.shortcuts, a.scanRE, a.replaceRE)
    );
  }, ca;
}
var la, t0;
function hVe() {
  if (t0) return la;
  t0 = 1;
  var e = cVe, t = lVe(), n = pVe();
  return la = function(s, o) {
    var i = {
      defs: e,
      shortcuts: t,
      enabled: []
    }, a = s.utils.assign({}, i, o || {});
    n(s, a);
  }, la;
}
var gVe = hVe();
const mVe = /* @__PURE__ */ Er(gVe);
var ua, n0;
function vVe() {
  if (n0) return ua;
  n0 = 1;
  function e(r, s) {
    var o, i, a = r.attrs[r.attrIndex("href")][1];
    for (o = 0; o < s.length; ++o) {
      if (i = s[o], typeof i.matcher == "function") {
        if (i.matcher(a, i))
          return i;
        continue;
      }
      return i;
    }
  }
  function t(r, s, o) {
    Object.keys(o).forEach(function(i) {
      var a, c = o[i];
      i === "className" && (i = "class"), a = s[r].attrIndex(i), a < 0 ? s[r].attrPush([i, c]) : s[r].attrs[a][1] = c;
    });
  }
  function n(r, s) {
    s ? s = Array.isArray(s) ? s : [s] : s = [], Object.freeze(s);
    var o = r.renderer.rules.link_open || this.defaultRender;
    r.renderer.rules.link_open = function(i, a, c, u, d) {
      var l = e(i[a], s), m = l && l.attrs;
      return m && t(a, i, m), o(i, a, c, u, d);
    };
  }
  return n.defaultRender = function(r, s, o, i, a) {
    return a.renderToken(r, s, o);
  }, ua = n, ua;
}
var _Ve = vVe();
const hm = /* @__PURE__ */ Er(_Ve);
var da, r0;
function bVe() {
  if (r0) return da;
  r0 = 1;
  var e = !0, t = !1, n = !1;
  da = function(g, y) {
    y && (e = !y.enabled, t = !!y.label, n = !!y.labelAfter), g.core.ruler.after("inline", "github-task-lists", function(h) {
      for (var w = h.tokens, k = 2; k < w.length; k++)
        o(w, k) && (i(w[k], h.Token), r(w[k - 2], "class", "task-list-item" + (e ? "" : " enabled")), r(w[s(w, k - 2)], "class", "contains-task-list"));
    });
  };
  function r(g, y, h) {
    var w = g.attrIndex(y), k = [y, h];
    w < 0 ? g.attrPush(k) : g.attrs[w] = k;
  }
  function s(g, y) {
    for (var h = g[y].level - 1, w = y - 1; w >= 0; w--)
      if (g[w].level === h)
        return w;
    return -1;
  }
  function o(g, y) {
    return l(g[y]) && m(g[y - 1]) && f(g[y - 2]) && v(g[y]);
  }
  function i(g, y) {
    if (g.children.unshift(a(g, y)), g.children[1].content = g.children[1].content.slice(3), g.content = g.content.slice(3), t)
      if (n) {
        g.children.pop();
        var h = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
        g.children[0].content = g.children[0].content.slice(0, -1) + ' id="' + h + '">', g.children.push(d(g.content, h, y));
      } else
        g.children.unshift(c(y)), g.children.push(u(y));
  }
  function a(g, y) {
    var h = new y("html_inline", "", 0), w = e ? ' disabled="" ' : "";
    return g.content.indexOf("[ ] ") === 0 ? h.content = '<input class="task-list-item-checkbox"' + w + 'type="checkbox">' : (g.content.indexOf("[x] ") === 0 || g.content.indexOf("[X] ") === 0) && (h.content = '<input class="task-list-item-checkbox" checked=""' + w + 'type="checkbox">'), h;
  }
  function c(g) {
    var y = new g("html_inline", "", 0);
    return y.content = "<label>", y;
  }
  function u(g) {
    var y = new g("html_inline", "", 0);
    return y.content = "</label>", y;
  }
  function d(g, y, h) {
    var w = new h("html_inline", "", 0);
    return w.content = '<label class="task-list-item-label" for="' + y + '">' + g + "</label>", w.attrs = [{ for: y }], w;
  }
  function l(g) {
    return g.type === "inline";
  }
  function m(g) {
    return g.type === "paragraph_open";
  }
  function f(g) {
    return g.type === "list_item_open";
  }
  function v(g) {
    return g.content.indexOf("[ ] ") === 0 || g.content.indexOf("[x] ") === 0 || g.content.indexOf("[X] ") === 0;
  }
  return da;
}
var yVe = bVe();
const wVe = /* @__PURE__ */ Er(yVe);
var To = { exports: {} }, Ze = {}, Lo = { exports: {} }, Gn = {}, o0;
function gm() {
  if (o0) return Gn;
  o0 = 1;
  function e() {
    var o = {};
    return o["align-content"] = !1, o["align-items"] = !1, o["align-self"] = !1, o["alignment-adjust"] = !1, o["alignment-baseline"] = !1, o.all = !1, o["anchor-point"] = !1, o.animation = !1, o["animation-delay"] = !1, o["animation-direction"] = !1, o["animation-duration"] = !1, o["animation-fill-mode"] = !1, o["animation-iteration-count"] = !1, o["animation-name"] = !1, o["animation-play-state"] = !1, o["animation-timing-function"] = !1, o.azimuth = !1, o["backface-visibility"] = !1, o.background = !0, o["background-attachment"] = !0, o["background-clip"] = !0, o["background-color"] = !0, o["background-image"] = !0, o["background-origin"] = !0, o["background-position"] = !0, o["background-repeat"] = !0, o["background-size"] = !0, o["baseline-shift"] = !1, o.binding = !1, o.bleed = !1, o["bookmark-label"] = !1, o["bookmark-level"] = !1, o["bookmark-state"] = !1, o.border = !0, o["border-bottom"] = !0, o["border-bottom-color"] = !0, o["border-bottom-left-radius"] = !0, o["border-bottom-right-radius"] = !0, o["border-bottom-style"] = !0, o["border-bottom-width"] = !0, o["border-collapse"] = !0, o["border-color"] = !0, o["border-image"] = !0, o["border-image-outset"] = !0, o["border-image-repeat"] = !0, o["border-image-slice"] = !0, o["border-image-source"] = !0, o["border-image-width"] = !0, o["border-left"] = !0, o["border-left-color"] = !0, o["border-left-style"] = !0, o["border-left-width"] = !0, o["border-radius"] = !0, o["border-right"] = !0, o["border-right-color"] = !0, o["border-right-style"] = !0, o["border-right-width"] = !0, o["border-spacing"] = !0, o["border-style"] = !0, o["border-top"] = !0, o["border-top-color"] = !0, o["border-top-left-radius"] = !0, o["border-top-right-radius"] = !0, o["border-top-style"] = !0, o["border-top-width"] = !0, o["border-width"] = !0, o.bottom = !1, o["box-decoration-break"] = !0, o["box-shadow"] = !0, o["box-sizing"] = !0, o["box-snap"] = !0, o["box-suppress"] = !0, o["break-after"] = !0, o["break-before"] = !0, o["break-inside"] = !0, o["caption-side"] = !1, o.chains = !1, o.clear = !0, o.clip = !1, o["clip-path"] = !1, o["clip-rule"] = !1, o.color = !0, o["color-interpolation-filters"] = !0, o["column-count"] = !1, o["column-fill"] = !1, o["column-gap"] = !1, o["column-rule"] = !1, o["column-rule-color"] = !1, o["column-rule-style"] = !1, o["column-rule-width"] = !1, o["column-span"] = !1, o["column-width"] = !1, o.columns = !1, o.contain = !1, o.content = !1, o["counter-increment"] = !1, o["counter-reset"] = !1, o["counter-set"] = !1, o.crop = !1, o.cue = !1, o["cue-after"] = !1, o["cue-before"] = !1, o.cursor = !1, o.direction = !1, o.display = !0, o["display-inside"] = !0, o["display-list"] = !0, o["display-outside"] = !0, o["dominant-baseline"] = !1, o.elevation = !1, o["empty-cells"] = !1, o.filter = !1, o.flex = !1, o["flex-basis"] = !1, o["flex-direction"] = !1, o["flex-flow"] = !1, o["flex-grow"] = !1, o["flex-shrink"] = !1, o["flex-wrap"] = !1, o.float = !1, o["float-offset"] = !1, o["flood-color"] = !1, o["flood-opacity"] = !1, o["flow-from"] = !1, o["flow-into"] = !1, o.font = !0, o["font-family"] = !0, o["font-feature-settings"] = !0, o["font-kerning"] = !0, o["font-language-override"] = !0, o["font-size"] = !0, o["font-size-adjust"] = !0, o["font-stretch"] = !0, o["font-style"] = !0, o["font-synthesis"] = !0, o["font-variant"] = !0, o["font-variant-alternates"] = !0, o["font-variant-caps"] = !0, o["font-variant-east-asian"] = !0, o["font-variant-ligatures"] = !0, o["font-variant-numeric"] = !0, o["font-variant-position"] = !0, o["font-weight"] = !0, o.grid = !1, o["grid-area"] = !1, o["grid-auto-columns"] = !1, o["grid-auto-flow"] = !1, o["grid-auto-rows"] = !1, o["grid-column"] = !1, o["grid-column-end"] = !1, o["grid-column-start"] = !1, o["grid-row"] = !1, o["grid-row-end"] = !1, o["grid-row-start"] = !1, o["grid-template"] = !1, o["grid-template-areas"] = !1, o["grid-template-columns"] = !1, o["grid-template-rows"] = !1, o["hanging-punctuation"] = !1, o.height = !0, o.hyphens = !1, o.icon = !1, o["image-orientation"] = !1, o["image-resolution"] = !1, o["ime-mode"] = !1, o["initial-letters"] = !1, o["inline-box-align"] = !1, o["justify-content"] = !1, o["justify-items"] = !1, o["justify-self"] = !1, o.left = !1, o["letter-spacing"] = !0, o["lighting-color"] = !0, o["line-box-contain"] = !1, o["line-break"] = !1, o["line-grid"] = !1, o["line-height"] = !1, o["line-snap"] = !1, o["line-stacking"] = !1, o["line-stacking-ruby"] = !1, o["line-stacking-shift"] = !1, o["line-stacking-strategy"] = !1, o["list-style"] = !0, o["list-style-image"] = !0, o["list-style-position"] = !0, o["list-style-type"] = !0, o.margin = !0, o["margin-bottom"] = !0, o["margin-left"] = !0, o["margin-right"] = !0, o["margin-top"] = !0, o["marker-offset"] = !1, o["marker-side"] = !1, o.marks = !1, o.mask = !1, o["mask-box"] = !1, o["mask-box-outset"] = !1, o["mask-box-repeat"] = !1, o["mask-box-slice"] = !1, o["mask-box-source"] = !1, o["mask-box-width"] = !1, o["mask-clip"] = !1, o["mask-image"] = !1, o["mask-origin"] = !1, o["mask-position"] = !1, o["mask-repeat"] = !1, o["mask-size"] = !1, o["mask-source-type"] = !1, o["mask-type"] = !1, o["max-height"] = !0, o["max-lines"] = !1, o["max-width"] = !0, o["min-height"] = !0, o["min-width"] = !0, o["move-to"] = !1, o["nav-down"] = !1, o["nav-index"] = !1, o["nav-left"] = !1, o["nav-right"] = !1, o["nav-up"] = !1, o["object-fit"] = !1, o["object-position"] = !1, o.opacity = !1, o.order = !1, o.orphans = !1, o.outline = !1, o["outline-color"] = !1, o["outline-offset"] = !1, o["outline-style"] = !1, o["outline-width"] = !1, o.overflow = !1, o["overflow-wrap"] = !1, o["overflow-x"] = !1, o["overflow-y"] = !1, o.padding = !0, o["padding-bottom"] = !0, o["padding-left"] = !0, o["padding-right"] = !0, o["padding-top"] = !0, o.page = !1, o["page-break-after"] = !1, o["page-break-before"] = !1, o["page-break-inside"] = !1, o["page-policy"] = !1, o.pause = !1, o["pause-after"] = !1, o["pause-before"] = !1, o.perspective = !1, o["perspective-origin"] = !1, o.pitch = !1, o["pitch-range"] = !1, o["play-during"] = !1, o.position = !1, o["presentation-level"] = !1, o.quotes = !1, o["region-fragment"] = !1, o.resize = !1, o.rest = !1, o["rest-after"] = !1, o["rest-before"] = !1, o.richness = !1, o.right = !1, o.rotation = !1, o["rotation-point"] = !1, o["ruby-align"] = !1, o["ruby-merge"] = !1, o["ruby-position"] = !1, o["shape-image-threshold"] = !1, o["shape-outside"] = !1, o["shape-margin"] = !1, o.size = !1, o.speak = !1, o["speak-as"] = !1, o["speak-header"] = !1, o["speak-numeral"] = !1, o["speak-punctuation"] = !1, o["speech-rate"] = !1, o.stress = !1, o["string-set"] = !1, o["tab-size"] = !1, o["table-layout"] = !1, o["text-align"] = !0, o["text-align-last"] = !0, o["text-combine-upright"] = !0, o["text-decoration"] = !0, o["text-decoration-color"] = !0, o["text-decoration-line"] = !0, o["text-decoration-skip"] = !0, o["text-decoration-style"] = !0, o["text-emphasis"] = !0, o["text-emphasis-color"] = !0, o["text-emphasis-position"] = !0, o["text-emphasis-style"] = !0, o["text-height"] = !0, o["text-indent"] = !0, o["text-justify"] = !0, o["text-orientation"] = !0, o["text-overflow"] = !0, o["text-shadow"] = !0, o["text-space-collapse"] = !0, o["text-transform"] = !0, o["text-underline-position"] = !0, o["text-wrap"] = !0, o.top = !1, o.transform = !1, o["transform-origin"] = !1, o["transform-style"] = !1, o.transition = !1, o["transition-delay"] = !1, o["transition-duration"] = !1, o["transition-property"] = !1, o["transition-timing-function"] = !1, o["unicode-bidi"] = !1, o["vertical-align"] = !1, o.visibility = !1, o["voice-balance"] = !1, o["voice-duration"] = !1, o["voice-family"] = !1, o["voice-pitch"] = !1, o["voice-range"] = !1, o["voice-rate"] = !1, o["voice-stress"] = !1, o["voice-volume"] = !1, o.volume = !1, o["white-space"] = !1, o.widows = !1, o.width = !0, o["will-change"] = !1, o["word-break"] = !0, o["word-spacing"] = !0, o["word-wrap"] = !0, o["wrap-flow"] = !1, o["wrap-through"] = !1, o["writing-mode"] = !1, o["z-index"] = !1, o;
  }
  function t(o, i, a) {
  }
  function n(o, i, a) {
  }
  var r = /javascript\s*\:/img;
  function s(o, i) {
    return r.test(i) ? "" : i;
  }
  return Gn.whiteList = e(), Gn.getDefaultWhiteList = e, Gn.onAttr = t, Gn.onIgnoreAttr = n, Gn.safeAttrValue = s, Gn;
}
var fa, s0;
function mm() {
  return s0 || (s0 = 1, fa = {
    indexOf: function(e, t) {
      var n, r;
      if (Array.prototype.indexOf)
        return e.indexOf(t);
      for (n = 0, r = e.length; n < r; n++)
        if (e[n] === t)
          return n;
      return -1;
    },
    forEach: function(e, t, n) {
      var r, s;
      if (Array.prototype.forEach)
        return e.forEach(t, n);
      for (r = 0, s = e.length; r < s; r++)
        t.call(n, e[r], r, e);
    },
    trim: function(e) {
      return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "");
    },
    trimRight: function(e) {
      return String.prototype.trimRight ? e.trimRight() : e.replace(/(\s*$)/g, "");
    }
  }), fa;
}
var pa, i0;
function kVe() {
  if (i0) return pa;
  i0 = 1;
  var e = mm();
  function t(n, r) {
    n = e.trimRight(n), n[n.length - 1] !== ";" && (n += ";");
    var s = n.length, o = !1, i = 0, a = 0, c = "";
    function u() {
      if (!o) {
        var m = e.trim(n.slice(i, a)), f = m.indexOf(":");
        if (f !== -1) {
          var v = e.trim(m.slice(0, f)), g = e.trim(m.slice(f + 1));
          if (v) {
            var y = r(i, c.length, v, g, m);
            y && (c += y + "; ");
          }
        }
      }
      i = a + 1;
    }
    for (; a < s; a++) {
      var d = n[a];
      if (d === "/" && n[a + 1] === "*") {
        var l = n.indexOf("*/", a + 2);
        if (l === -1) break;
        a = l + 1, i = a + 1, o = !1;
      } else d === "(" ? o = !0 : d === ")" ? o = !1 : d === ";" ? o || u() : d === `
` && u();
    }
    return e.trim(c);
  }
  return pa = t, pa;
}
var ha, a0;
function xVe() {
  if (a0) return ha;
  a0 = 1;
  var e = gm(), t = kVe();
  mm();
  function n(o) {
    return o == null;
  }
  function r(o) {
    var i = {};
    for (var a in o)
      i[a] = o[a];
    return i;
  }
  function s(o) {
    o = r(o || {}), o.whiteList = o.whiteList || e.whiteList, o.onAttr = o.onAttr || e.onAttr, o.onIgnoreAttr = o.onIgnoreAttr || e.onIgnoreAttr, o.safeAttrValue = o.safeAttrValue || e.safeAttrValue, this.options = o;
  }
  return s.prototype.process = function(o) {
    if (o = o || "", o = o.toString(), !o) return "";
    var i = this, a = i.options, c = a.whiteList, u = a.onAttr, d = a.onIgnoreAttr, l = a.safeAttrValue, m = t(o, function(f, v, g, y, h) {
      var w = c[g], k = !1;
      if (w === !0 ? k = w : typeof w == "function" ? k = w(y) : w instanceof RegExp && (k = w.test(y)), k !== !0 && (k = !1), y = l(g, y), !!y) {
        var x = {
          position: v,
          sourcePosition: f,
          source: h,
          isWhite: k
        };
        if (k) {
          var A = u(g, y, x);
          return n(A) ? g + ":" + y : A;
        } else {
          var A = d(g, y, x);
          if (!n(A))
            return A;
        }
      }
    });
    return m;
  }, ha = s, ha;
}
var c0;
function Nc() {
  return c0 || (c0 = 1, (function(e, t) {
    var n = gm(), r = xVe();
    function s(i, a) {
      var c = new r(a);
      return c.process(i);
    }
    t = e.exports = s, t.FilterCSS = r;
    for (var o in n) t[o] = n[o];
    typeof window < "u" && (window.filterCSS = e.exports);
  })(Lo, Lo.exports)), Lo.exports;
}
var ga, l0;
function Ml() {
  return l0 || (l0 = 1, ga = {
    indexOf: function(e, t) {
      var n, r;
      if (Array.prototype.indexOf)
        return e.indexOf(t);
      for (n = 0, r = e.length; n < r; n++)
        if (e[n] === t)
          return n;
      return -1;
    },
    forEach: function(e, t, n) {
      var r, s;
      if (Array.prototype.forEach)
        return e.forEach(t, n);
      for (r = 0, s = e.length; r < s; r++)
        t.call(n, e[r], r, e);
    },
    trim: function(e) {
      return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "");
    },
    spaceIndex: function(e) {
      var t = /\s|\n|\t/, n = t.exec(e);
      return n ? n.index : -1;
    }
  }), ga;
}
var u0;
function vm() {
  if (u0) return Ze;
  u0 = 1;
  var e = Nc().FilterCSS, t = Nc().getDefaultWhiteList, n = Ml();
  function r() {
    return {
      a: ["target", "href", "title"],
      abbr: ["title"],
      address: [],
      area: ["shape", "coords", "href", "alt"],
      article: [],
      aside: [],
      audio: [
        "autoplay",
        "controls",
        "crossorigin",
        "loop",
        "muted",
        "preload",
        "src"
      ],
      b: [],
      bdi: ["dir"],
      bdo: ["dir"],
      big: [],
      blockquote: ["cite"],
      br: [],
      caption: [],
      center: [],
      cite: [],
      code: [],
      col: ["align", "valign", "span", "width"],
      colgroup: ["align", "valign", "span", "width"],
      dd: [],
      del: ["datetime"],
      details: ["open"],
      div: [],
      dl: [],
      dt: [],
      em: [],
      figcaption: [],
      figure: [],
      font: ["color", "size", "face"],
      footer: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      header: [],
      hr: [],
      i: [],
      img: ["src", "alt", "title", "width", "height", "loading"],
      ins: ["datetime"],
      kbd: [],
      li: [],
      mark: [],
      nav: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      section: [],
      small: [],
      span: [],
      sub: [],
      summary: [],
      sup: [],
      strong: [],
      strike: [],
      table: ["width", "border", "align", "valign"],
      tbody: ["align", "valign"],
      td: ["width", "rowspan", "colspan", "align", "valign"],
      tfoot: ["align", "valign"],
      th: ["width", "rowspan", "colspan", "align", "valign"],
      thead: ["align", "valign"],
      tr: ["rowspan", "align", "valign"],
      tt: [],
      u: [],
      ul: [],
      video: [
        "autoplay",
        "controls",
        "crossorigin",
        "loop",
        "muted",
        "playsinline",
        "poster",
        "preload",
        "src",
        "height",
        "width"
      ]
    };
  }
  var s = new e();
  function o(N, V, F) {
  }
  function i(N, V, F) {
  }
  function a(N, V, F) {
  }
  function c(N, V, F) {
  }
  function u(N) {
    return N.replace(l, "&lt;").replace(m, "&gt;");
  }
  function d(N, V, F, G) {
    if (F = R(F), V === "href" || V === "src") {
      if (F = n.trim(F), F === "#") return "#";
      if (!(F.substr(0, 7) === "http://" || F.substr(0, 8) === "https://" || F.substr(0, 7) === "mailto:" || F.substr(0, 4) === "tel:" || F.substr(0, 11) === "data:image/" || F.substr(0, 6) === "ftp://" || F.substr(0, 2) === "./" || F.substr(0, 3) === "../" || F[0] === "#" || F[0] === "/"))
        return "";
    } else if (V === "background") {
      if (w.lastIndex = 0, w.test(F))
        return "";
    } else if (V === "style") {
      if (k.lastIndex = 0, k.test(F) || (x.lastIndex = 0, x.test(F) && (w.lastIndex = 0, w.test(F))))
        return "";
      G !== !1 && (G = G || s, F = G.process(F));
    }
    return F = B(F), F;
  }
  var l = /</g, m = />/g, f = /"/g, v = /&quot;/g, g = /&#([a-zA-Z0-9]*);?/gim, y = /&colon;?/gim, h = /&newline;?/gim, w = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi, k = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi, x = /u\s*r\s*l\s*\(.*/gi;
  function A(N) {
    return N.replace(f, "&quot;");
  }
  function S(N) {
    return N.replace(v, '"');
  }
  function $(N) {
    return N.replace(g, function(F, G) {
      return G[0] === "x" || G[0] === "X" ? String.fromCharCode(parseInt(G.substr(1), 16)) : String.fromCharCode(parseInt(G, 10));
    });
  }
  function M(N) {
    return N.replace(y, ":").replace(h, " ");
  }
  function P(N) {
    for (var V = "", F = 0, G = N.length; F < G; F++)
      V += N.charCodeAt(F) < 32 ? " " : N.charAt(F);
    return n.trim(V);
  }
  function R(N) {
    return N = S(N), N = $(N), N = M(N), N = P(N), N;
  }
  function B(N) {
    return N = A(N), N = u(N), N;
  }
  function j() {
    return "";
  }
  function ie(N, V) {
    typeof V != "function" && (V = function() {
    });
    var F = !Array.isArray(N);
    function G(U) {
      return F ? !0 : n.indexOf(N, U) !== -1;
    }
    var T = [], W = !1;
    return {
      onIgnoreTag: function(U, se, de) {
        if (G(U))
          if (de.isClosing) {
            var ve = "[/removed]", we = de.position + ve.length;
            return T.push([
              W !== !1 ? W : de.position,
              we
            ]), W = !1, ve;
          } else
            return W || (W = de.position), "[removed]";
        else
          return V(U, se, de);
      },
      remove: function(U) {
        var se = "", de = 0;
        return n.forEach(T, function(ve) {
          se += U.slice(de, ve[0]), de = ve[1];
        }), se += U.slice(de), se;
      }
    };
  }
  function z(N) {
    for (var V = "", F = 0; F < N.length; ) {
      var G = N.indexOf("<!--", F);
      if (G === -1) {
        V += N.slice(F);
        break;
      }
      V += N.slice(F, G);
      var T = N.indexOf("-->", G);
      if (T === -1)
        break;
      F = T + 3;
    }
    return V;
  }
  function Q(N) {
    var V = N.split("");
    return V = V.filter(function(F) {
      var G = F.charCodeAt(0);
      return G === 127 ? !1 : G <= 31 ? G === 10 || G === 13 : !0;
    }), V.join("");
  }
  return Ze.whiteList = r(), Ze.getDefaultWhiteList = r, Ze.onTag = o, Ze.onIgnoreTag = i, Ze.onTagAttr = a, Ze.onIgnoreTagAttr = c, Ze.safeAttrValue = d, Ze.escapeHtml = u, Ze.escapeQuote = A, Ze.unescapeQuote = S, Ze.escapeHtmlEntities = $, Ze.escapeDangerHtml5Entities = M, Ze.clearNonPrintableCharacter = P, Ze.friendlyAttrValue = R, Ze.escapeAttrValue = B, Ze.onIgnoreTagStripAll = j, Ze.StripTagBody = ie, Ze.stripCommentTag = z, Ze.stripBlankChar = Q, Ze.attributeWrapSign = '"', Ze.cssFilter = s, Ze.getDefaultCSSWhiteList = t, Ze;
}
var Oo = {}, d0;
function _m() {
  if (d0) return Oo;
  d0 = 1;
  var e = Ml();
  function t(l) {
    var m = e.spaceIndex(l), f;
    return m === -1 ? f = l.slice(1, -1) : f = l.slice(1, m + 1), f = e.trim(f).toLowerCase(), f.slice(0, 1) === "/" && (f = f.slice(1)), f.slice(-1) === "/" && (f = f.slice(0, -1)), f;
  }
  function n(l) {
    return l.slice(0, 2) === "</";
  }
  function r(l, m, f) {
    var v = "", g = 0, y = !1, h = !1, w = 0, k = l.length, x = "", A = "";
    e: for (w = 0; w < k; w++) {
      var S = l.charAt(w);
      if (y === !1) {
        if (S === "<") {
          y = w;
          continue;
        }
      } else if (h === !1) {
        if (S === "<") {
          v += f(l.slice(g, w)), y = w, g = w;
          continue;
        }
        if (S === ">" || w === k - 1) {
          v += f(l.slice(g, y)), A = l.slice(y, w + 1), x = t(A), v += m(
            y,
            v.length,
            x,
            A,
            n(A)
          ), g = w + 1, y = !1;
          continue;
        }
        if (S === '"' || S === "'")
          for (var $ = 1, M = l.charAt(w - $); M.trim() === "" || M === "="; ) {
            if (M === "=") {
              h = S;
              continue e;
            }
            M = l.charAt(w - ++$);
          }
      } else if (S === h) {
        h = !1;
        continue;
      }
    }
    return g < k && (v += f(l.substr(g))), v;
  }
  var s = /[^a-zA-Z0-9\\_:.-]/gim;
  function o(l, m) {
    var f = 0, v = 0, g = [], y = !1, h = l.length;
    function w($, M) {
      if ($ = e.trim($), $ = $.replace(s, "").toLowerCase(), !($.length < 1)) {
        var P = m($, M || "");
        P && g.push(P);
      }
    }
    for (var k = 0; k < h; k++) {
      var x = l.charAt(k), A, S;
      if (y === !1 && x === "=") {
        y = l.slice(f, k), f = k + 1, v = l.charAt(f) === '"' || l.charAt(f) === "'" ? f : a(l, k + 1);
        continue;
      }
      if (y !== !1 && k === v) {
        if (S = l.indexOf(x, k + 1), S === -1)
          break;
        A = e.trim(l.slice(v + 1, S)), w(y, A), y = !1, k = S, f = k + 1;
        continue;
      }
      if (/\s|\n|\t/.test(x))
        if (l = l.replace(/\s|\n|\t/g, " "), y === !1)
          if (S = i(l, k), S === -1) {
            A = e.trim(l.slice(f, k)), w(A), y = !1, f = k + 1;
            continue;
          } else {
            k = S - 1;
            continue;
          }
        else if (S = c(l, k - 1), S === -1) {
          A = e.trim(l.slice(f, k)), A = d(A), w(y, A), y = !1, f = k + 1;
          continue;
        } else
          continue;
    }
    return f < l.length && (y === !1 ? w(l.slice(f)) : w(y, d(e.trim(l.slice(f))))), e.trim(g.join(" "));
  }
  function i(l, m) {
    for (; m < l.length; m++) {
      var f = l[m];
      if (f !== " ")
        return f === "=" ? m : -1;
    }
  }
  function a(l, m) {
    for (; m < l.length; m++) {
      var f = l[m];
      if (f !== " ")
        return f === "'" || f === '"' ? m : -1;
    }
  }
  function c(l, m) {
    for (; m > 0; m--) {
      var f = l[m];
      if (f !== " ")
        return f === "=" ? m : -1;
    }
  }
  function u(l) {
    return l[0] === '"' && l[l.length - 1] === '"' || l[0] === "'" && l[l.length - 1] === "'";
  }
  function d(l) {
    return u(l) ? l.substr(1, l.length - 2) : l;
  }
  return Oo.parseTag = r, Oo.parseAttr = o, Oo;
}
var ma, f0;
function CVe() {
  if (f0) return ma;
  f0 = 1;
  var e = Nc().FilterCSS, t = vm(), n = _m(), r = n.parseTag, s = n.parseAttr, o = Ml();
  function i(l) {
    return l == null;
  }
  function a(l) {
    var m = o.spaceIndex(l);
    if (m === -1)
      return {
        html: "",
        closing: l[l.length - 2] === "/"
      };
    l = o.trim(l.slice(m + 1, -1));
    var f = l[l.length - 1] === "/";
    return f && (l = o.trim(l.slice(0, -1))), {
      html: l,
      closing: f
    };
  }
  function c(l) {
    var m = {};
    for (var f in l)
      m[f] = l[f];
    return m;
  }
  function u(l) {
    var m = {};
    for (var f in l)
      Array.isArray(l[f]) ? m[f.toLowerCase()] = l[f].map(function(v) {
        return v.toLowerCase();
      }) : m[f.toLowerCase()] = l[f];
    return m;
  }
  function d(l) {
    l = c(l || {}), l.stripIgnoreTag && (l.onIgnoreTag && console.error(
      'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
    ), l.onIgnoreTag = t.onIgnoreTagStripAll), l.whiteList || l.allowList ? l.whiteList = u(l.whiteList || l.allowList) : l.whiteList = t.whiteList, this.attributeWrapSign = l.singleQuotedAttributeValue === !0 ? "'" : t.attributeWrapSign, l.onTag = l.onTag || t.onTag, l.onTagAttr = l.onTagAttr || t.onTagAttr, l.onIgnoreTag = l.onIgnoreTag || t.onIgnoreTag, l.onIgnoreTagAttr = l.onIgnoreTagAttr || t.onIgnoreTagAttr, l.safeAttrValue = l.safeAttrValue || t.safeAttrValue, l.escapeHtml = l.escapeHtml || t.escapeHtml, this.options = l, l.css === !1 ? this.cssFilter = !1 : (l.css = l.css || {}, this.cssFilter = new e(l.css));
  }
  return d.prototype.process = function(l) {
    if (l = l || "", l = l.toString(), !l) return "";
    var m = this, f = m.options, v = f.whiteList, g = f.onTag, y = f.onIgnoreTag, h = f.onTagAttr, w = f.onIgnoreTagAttr, k = f.safeAttrValue, x = f.escapeHtml, A = m.attributeWrapSign, S = m.cssFilter;
    f.stripBlankChar && (l = t.stripBlankChar(l)), f.allowCommentTag || (l = t.stripCommentTag(l));
    var $ = !1;
    f.stripIgnoreTagBody && ($ = t.StripTagBody(
      f.stripIgnoreTagBody,
      y
    ), y = $.onIgnoreTag);
    var M = r(
      l,
      function(P, R, B, j, ie) {
        var z = {
          sourcePosition: P,
          position: R,
          isClosing: ie,
          isWhite: Object.prototype.hasOwnProperty.call(v, B)
        }, Q = g(B, j, z);
        if (!i(Q)) return Q;
        if (z.isWhite) {
          if (z.isClosing)
            return "</" + B + ">";
          var N = a(j), V = v[B], F = s(N.html, function(G, T) {
            var W = o.indexOf(V, G) !== -1, U = h(B, G, T, W);
            return i(U) ? W ? (T = k(B, G, T, S), T ? G + "=" + A + T + A : G) : (U = w(B, G, T, W), i(U) ? void 0 : U) : U;
          });
          return j = "<" + B, F && (j += " " + F), N.closing && (j += " /"), j += ">", j;
        } else
          return Q = y(B, j, z), i(Q) ? x(j) : Q;
      },
      x
    );
    return $ && (M = $.remove(M)), M;
  }, ma = d, ma;
}
var p0;
function SVe() {
  return p0 || (p0 = 1, (function(e, t) {
    var n = vm(), r = _m(), s = CVe();
    function o(a, c) {
      var u = new s(c);
      return u.process(a);
    }
    t = e.exports = o, t.filterXSS = o, t.FilterXSS = s, (function() {
      for (var a in n)
        t[a] = n[a];
      for (var c in r)
        t[c] = r[c];
    })(), typeof window < "u" && (window.filterXSS = e.exports);
    function i() {
      return typeof self < "u" && typeof DedicatedWorkerGlobalScope < "u" && self instanceof DedicatedWorkerGlobalScope;
    }
    i() && (self.filterXSS = e.exports);
  })(To, To.exports)), To.exports;
}
var jo = SVe();
const EVe = /* @__PURE__ */ Er(jo), AVe = /@\[youtube]\(([\w-]{11}(?:\?.*)?)\)/im, $Ve = /^https:\/\/(?:www\.)?(youtube\.com|youtube-nocookie\.com)\/embed\/[\w-]{11}(?:\?.*)?$/i, MVe = (e, t) => {
  const n = {
    width: "100%",
    title: "YouTube video player",
    nocookie: !0,
    ...t
  }, r = (o, i) => {
    const { pos: a, src: c } = o;
    if (c.charCodeAt(a) !== 64) return !1;
    const u = AVe.exec(c.slice(a));
    if (!u) return !1;
    if (!i) {
      const d = o.push("youtube_embed", "", 0);
      d.meta = { videoId: u[1] };
    }
    return o.pos += u[0].length, !0;
  }, s = n.nocookie ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/";
  e.inline.ruler.before("link", "youtube_embed", r), e.renderer.rules.youtube_embed = (o, i) => {
    const { videoId: a } = o[i].meta;
    return `<iframe ${[
      `width="${n.width}"`,
      ...n.height ? [`height="${n.height}"`] : [],
      `src="${s}${a}"`,
      `title="${e.utils.escapeHtml(n.title)}"`,
      'frameborder="0"',
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"',
      'referrerpolicy="strict-origin-when-cross-origin"',
      "allowfullscreen"
    ].join(" ")}></iframe>`;
  };
}, IVe = { class: "n8n-markdown" }, TVe = ["innerHTML"], LVe = /* @__PURE__ */ Z({
  __name: "Markdown",
  props: {
    content: { default: "" },
    withMultiBreaks: { type: Boolean, default: !1 },
    images: { default: () => [] },
    loading: { type: Boolean, default: !1 },
    loadingBlocks: { default: 2 },
    loadingRows: { default: 3 },
    theme: { default: "markdown" },
    options: { default: () => ({
      markdown: {
        html: !1,
        linkify: !0,
        typographer: !0,
        breaks: !0
      },
      linkAttributes: {
        attrs: {
          target: "_blank",
          rel: "noopener"
        }
      },
      tasklists: {
        enabled: !0,
        label: !0,
        labelAfter: !1
      },
      youtube: {}
    }) }
  },
  emits: ["markdown-click", "update-content"],
  setup(e, { emit: t }) {
    const n = e, r = D(void 0), { options: s } = n, o = new pm(s.markdown).use(hm, s.linkAttributes).use(mVe).use(wVe, s.tasklists).use(MVe, s.youtube), i = {
      ...jo.whiteList,
      label: ["class", "for"],
      iframe: [
        "width",
        "height",
        "src",
        "title",
        "frameborder",
        "allow",
        "referrerpolicy",
        "allowfullscreen"
      ]
    }, a = I(() => {
      if (!n.content)
        return "";
      const f = {};
      n.images && n.images.forEach((w) => {
        w && (f[w.id] = w.url);
      });
      const v = new RegExp("fileId:([0-9]+)");
      let g = n.content;
      n.withMultiBreaks && (g = g.replaceAll(`

`, `
&nbsp;
`));
      const y = o.render(g);
      return EVe(y, {
        onTagAttr(w, k, x) {
          if (w === "img" && k === "src") {
            if (x.match(v)) {
              const $ = x.split("fileId:")[1], M = jo.friendlyAttrValue(f[$]);
              return M ? `src=${M}` : "";
            }
            const S = x.split("#")[0].match(/\.(jpeg|jpg|gif|png|webp)$/) !== null && x.startsWith("/static/");
            if (!x.startsWith("https://") && !S)
              return "";
          }
          if (w === "iframe")
            return k === "src" ? $Ve.test(x) ? `src=${jo.friendlyAttrValue(x)}` : "" : void 0;
        },
        onTag(w, k) {
          if (w === "img" && k.includes('alt="workflow-screenshot"'))
            return "";
        },
        onIgnoreTag(w, k) {
          if (w === "input" && k.includes('type="checkbox"'))
            return k;
        },
        whiteList: i
      });
    }), c = t, u = (f) => {
      let v = null;
      if (f.target instanceof HTMLAnchorElement && (v = f.target), f.target instanceof HTMLElement && f.target.matches("a *")) {
        const g = f.target.closest("a");
        g && (v = g);
      }
      v && c("markdown-click", v, f);
    }, d = async (f) => {
      var v;
      if (f.target instanceof HTMLInputElement && f.target.type === "checkbox") {
        const g = (v = r.value) == null ? void 0 : v.querySelectorAll('input[type="checkbox"]');
        if (g) {
          const y = Array.from(g).indexOf(f.target);
          y !== -1 && m(y);
        }
      }
    }, l = (f) => {
      f.target instanceof HTMLInputElement && f.stopPropagation();
    }, m = (f) => {
      const v = n.content;
      if (!v)
        return;
      const g = BO(v, f);
      c("update-content", g);
    };
    return (f, v) => (b(), C("div", IVe, [
      f.loading ? (b(), C("div", {
        key: 1,
        class: H(f.$style.markdown)
      }, [
        (b(!0), C(He, null, ot(f.loadingBlocks, (g, y) => (b(), C("div", { key: y }, [
          he(_(zI), {
            loading: f.loading,
            rows: f.loadingRows,
            animated: "",
            variant: "p"
          }, null, 8, ["loading", "rows"]),
          p("div", {
            class: H(f.$style.spacer)
          }, null, 2)
        ]))), 128))
      ], 2)) : (b(), C("div", {
        key: 0,
        ref_key: "editor",
        ref: r,
        class: H(f.$style[f.theme]),
        onClick: u,
        onMousedown: l,
        onChange: d,
        innerHTML: a.value
      }, null, 42, TVe))
    ]));
  }
}), OVe = "_markdown_17ukb_1", RVe = "_label_17ukb_43", PVe = "_sticky_17ukb_64", BVe = "_spacer_17ukb_160", zVe = {
  markdown: OVe,
  label: RVe,
  sticky: PVe,
  spacer: BVe
}, DVe = {
  $style: zVe
}, NVe = /* @__PURE__ */ Ht(LVe, [["__cssModules", DVe]]), h0 = {
  right: "ew-resize",
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  topLeft: "nw-resize",
  topRight: "ne-resize",
  bottomLeft: "sw-resize",
  bottomRight: "se-resize"
};
({
  // @ts-expect-error TS doesn't understand this but it works
  ...Id.props
  // <a> element "props" are passed as attributes
});
/*!
 * Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
function Wr(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Wr = function(t) {
    return typeof t;
  } : Wr = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Wr(e);
}
function qVe(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function FVe(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function HVe(e, t, n) {
  return t && FVe(e.prototype, t), e;
}
function jVe(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Ie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {}, r = Object.keys(n);
    typeof Object.getOwnPropertySymbols == "function" && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(s) {
      return Object.getOwnPropertyDescriptor(n, s).enumerable;
    }))), r.forEach(function(s) {
      jVe(e, s, n[s]);
    });
  }
  return e;
}
function bm(e, t) {
  return ZVe(e) || GVe(e, t) || XVe();
}
function VVe(e) {
  return UVe(e) || WVe(e) || KVe();
}
function UVe(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function ZVe(e) {
  if (Array.isArray(e)) return e;
}
function WVe(e) {
  if (Symbol.iterator in Object(e) || Object.prototype.toString.call(e) === "[object Arguments]") return Array.from(e);
}
function GVe(e, t) {
  var n = [], r = !0, s = !1, o = void 0;
  try {
    for (var i = e[Symbol.iterator](), a; !(r = (a = i.next()).done) && (n.push(a.value), !(t && n.length === t)); r = !0)
      ;
  } catch (c) {
    s = !0, o = c;
  } finally {
    try {
      !r && i.return != null && i.return();
    } finally {
      if (s) throw o;
    }
  }
  return n;
}
function KVe() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function XVe() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
var g0 = function() {
}, Il = {}, ym = {}, YVe = null, wm = {
  mark: g0,
  measure: g0
};
try {
  typeof window < "u" && (Il = window), typeof document < "u" && (ym = document), typeof MutationObserver < "u" && (YVe = MutationObserver), typeof performance < "u" && (wm = performance);
} catch {
}
var JVe = Il.navigator || {}, m0 = JVe.userAgent, v0 = m0 === void 0 ? "" : m0, Cs = Il, bt = ym, Ro = wm;
Cs.document;
var Tl = !!bt.documentElement && !!bt.head && typeof bt.addEventListener == "function" && typeof bt.createElement == "function", QVe = ~v0.indexOf("MSIE") || ~v0.indexOf("Trident/"), wn = "___FONT_AWESOME___", qc = 16, km = "fa", xm = "svg-inline--fa", Cm = "data-fa-i2svg";
(function() {
  try {
    return !0;
  } catch {
    return !1;
  }
})();
var va = {
  GROUP: "group",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, Sm = Cs.FontAwesomeConfig || {};
function eUe(e) {
  var t = bt.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function tUe(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (bt && typeof bt.querySelector == "function") {
  var nUe = [["data-family-prefix", "familyPrefix"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  nUe.forEach(function(e) {
    var t = bm(e, 2), n = t[0], r = t[1], s = tUe(eUe(n));
    s != null && (Sm[r] = s);
  });
}
var rUe = {
  familyPrefix: km,
  replacementClass: xm,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
}, Fc = Ie({}, rUe, Sm);
Fc.autoReplaceSvg || (Fc.observeMutations = !1);
var mt = Ie({}, Fc);
Cs.FontAwesomeConfig = mt;
var kn = Cs || {};
kn[wn] || (kn[wn] = {});
kn[wn].styles || (kn[wn].styles = {});
kn[wn].hooks || (kn[wn].hooks = {});
kn[wn].shims || (kn[wn].shims = []);
var an = kn[wn], oUe = [], sUe = function e() {
  bt.removeEventListener("DOMContentLoaded", e), Hc = 1, oUe.map(function(t) {
    return t();
  });
}, Hc = !1;
Tl && (Hc = (bt.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(bt.readyState), Hc || bt.addEventListener("DOMContentLoaded", sUe));
var Ll = "pending", Em = "settled", Jo = "fulfilled", Qo = "rejected", iUe = function() {
}, Am = typeof global < "u" && typeof global.process < "u" && typeof global.process.emit == "function", aUe = typeof setImmediate > "u" ? setTimeout : setImmediate, Hr = [], jc;
function cUe() {
  for (var e = 0; e < Hr.length; e++)
    Hr[e][0](Hr[e][1]);
  Hr = [], jc = !1;
}
function es(e, t) {
  Hr.push([e, t]), jc || (jc = !0, aUe(cUe, 0));
}
function lUe(e, t) {
  function n(s) {
    Ol(t, s);
  }
  function r(s) {
    io(t, s);
  }
  try {
    e(n, r);
  } catch (s) {
    r(s);
  }
}
function $m(e) {
  var t = e.owner, n = t._state, r = t._data, s = e[n], o = e.then;
  if (typeof s == "function") {
    n = Jo;
    try {
      r = s(r);
    } catch (i) {
      io(o, i);
    }
  }
  Mm(o, r) || (n === Jo && Ol(o, r), n === Qo && io(o, r));
}
function Mm(e, t) {
  var n;
  try {
    if (e === t)
      throw new TypeError("A promises callback cannot return that same promise.");
    if (t && (typeof t == "function" || Wr(t) === "object")) {
      var r = t.then;
      if (typeof r == "function")
        return r.call(t, function(s) {
          n || (n = !0, t === s ? Im(e, s) : Ol(e, s));
        }, function(s) {
          n || (n = !0, io(e, s));
        }), !0;
    }
  } catch (s) {
    return n || io(e, s), !0;
  }
  return !1;
}
function Ol(e, t) {
  (e === t || !Mm(e, t)) && Im(e, t);
}
function Im(e, t) {
  e._state === Ll && (e._state = Em, e._data = t, es(uUe, e));
}
function io(e, t) {
  e._state === Ll && (e._state = Em, e._data = t, es(dUe, e));
}
function Tm(e) {
  e._then = e._then.forEach($m);
}
function uUe(e) {
  e._state = Jo, Tm(e);
}
function dUe(e) {
  e._state = Qo, Tm(e), !e._handled && Am && global.process.emit("unhandledRejection", e._data, e);
}
function fUe(e) {
  global.process.emit("rejectionHandled", e);
}
function Dt(e) {
  if (typeof e != "function")
    throw new TypeError("Promise resolver " + e + " is not a function");
  if (!(this instanceof Dt))
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  this._then = [], lUe(e, this);
}
Dt.prototype = {
  constructor: Dt,
  _state: Ll,
  _then: null,
  _data: void 0,
  _handled: !1,
  then: function(t, n) {
    var r = {
      owner: this,
      then: new this.constructor(iUe),
      fulfilled: t,
      rejected: n
    };
    return (n || t) && !this._handled && (this._handled = !0, this._state === Qo && Am && es(fUe, this)), this._state === Jo || this._state === Qo ? es($m, r) : this._then.push(r), r.then;
  },
  catch: function(t) {
    return this.then(null, t);
  }
};
Dt.all = function(e) {
  if (!Array.isArray(e))
    throw new TypeError("You must pass an array to Promise.all().");
  return new Dt(function(t, n) {
    var r = [], s = 0;
    function o(c) {
      return s++, function(u) {
        r[c] = u, --s || t(r);
      };
    }
    for (var i = 0, a; i < e.length; i++)
      a = e[i], a && typeof a.then == "function" ? a.then(o(i), n) : r[i] = a;
    s || t(r);
  });
};
Dt.race = function(e) {
  if (!Array.isArray(e))
    throw new TypeError("You must pass an array to Promise.race().");
  return new Dt(function(t, n) {
    for (var r = 0, s; r < e.length; r++)
      s = e[r], s && typeof s.then == "function" ? s.then(t, n) : t(s);
  });
};
Dt.resolve = function(e) {
  return e && Wr(e) === "object" && e.constructor === Dt ? e : new Dt(function(t) {
    t(e);
  });
};
Dt.reject = function(e) {
  return new Dt(function(t, n) {
    n(e);
  });
};
var ur = qc, Pn = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function pUe(e) {
  if (!(!e || !Tl)) {
    var t = bt.createElement("style");
    t.setAttribute("type", "text/css"), t.innerHTML = e;
    for (var n = bt.head.childNodes, r = null, s = n.length - 1; s > -1; s--) {
      var o = n[s], i = (o.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(i) > -1 && (r = o);
    }
    return bt.head.insertBefore(t, r), e;
  }
}
var hUe = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function ts() {
  for (var e = 12, t = ""; e-- > 0; )
    t += hUe[Math.random() * 62 | 0];
  return t;
}
function Lm(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function gUe(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, '="').concat(Lm(e[n]), '" ');
  }, "").trim();
}
function Rl(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, ": ").concat(e[n], ";");
  }, "");
}
function Pl(e) {
  return e.size !== Pn.size || e.x !== Pn.x || e.y !== Pn.y || e.rotate !== Pn.rotate || e.flipX || e.flipY;
}
function Om(e) {
  var t = e.transform, n = e.containerWidth, r = e.iconWidth, s = {
    transform: "translate(".concat(n / 2, " 256)")
  }, o = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), i = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), a = "rotate(".concat(t.rotate, " 0 0)"), c = {
    transform: "".concat(o, " ").concat(i, " ").concat(a)
  }, u = {
    transform: "translate(".concat(r / 2 * -1, " -256)")
  };
  return {
    outer: s,
    inner: c,
    path: u
  };
}
function mUe(e) {
  var t = e.transform, n = e.width, r = n === void 0 ? qc : n, s = e.height, o = s === void 0 ? qc : s, i = "";
  return QVe ? i += "translate(".concat(t.x / ur - r / 2, "em, ").concat(t.y / ur - o / 2, "em) ") : i += "translate(calc(-50% + ".concat(t.x / ur, "em), calc(-50% + ").concat(t.y / ur, "em)) "), i += "scale(".concat(t.size / ur * (t.flipX ? -1 : 1), ", ").concat(t.size / ur * (t.flipY ? -1 : 1), ") "), i += "rotate(".concat(t.rotate, "deg) "), i;
}
var _a = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function _0(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function vUe(e) {
  return e.tag === "g" ? e.children : [e];
}
function _Ue(e) {
  var t = e.children, n = e.attributes, r = e.main, s = e.mask, o = e.maskId, i = e.transform, a = r.width, c = r.icon, u = s.width, d = s.icon, l = Om({
    transform: i,
    containerWidth: u,
    iconWidth: a
  }), m = {
    tag: "rect",
    attributes: Ie({}, _a, {
      fill: "white"
    })
  }, f = c.children ? {
    children: c.children.map(_0)
  } : {}, v = {
    tag: "g",
    attributes: Ie({}, l.inner),
    children: [_0(Ie({
      tag: c.tag,
      attributes: Ie({}, c.attributes, l.path)
    }, f))]
  }, g = {
    tag: "g",
    attributes: Ie({}, l.outer),
    children: [v]
  }, y = "mask-".concat(o || ts()), h = "clip-".concat(o || ts()), w = {
    tag: "mask",
    attributes: Ie({}, _a, {
      id: y,
      maskUnits: "userSpaceOnUse",
      maskContentUnits: "userSpaceOnUse"
    }),
    children: [m, g]
  }, k = {
    tag: "defs",
    children: [{
      tag: "clipPath",
      attributes: {
        id: h
      },
      children: vUe(d)
    }, w]
  };
  return t.push(k, {
    tag: "rect",
    attributes: Ie({
      fill: "currentColor",
      "clip-path": "url(#".concat(h, ")"),
      mask: "url(#".concat(y, ")")
    }, _a)
  }), {
    children: t,
    attributes: n
  };
}
function bUe(e) {
  var t = e.children, n = e.attributes, r = e.main, s = e.transform, o = e.styles, i = Rl(o);
  if (i.length > 0 && (n.style = i), Pl(s)) {
    var a = Om({
      transform: s,
      containerWidth: r.width,
      iconWidth: r.width
    });
    t.push({
      tag: "g",
      attributes: Ie({}, a.outer),
      children: [{
        tag: "g",
        attributes: Ie({}, a.inner),
        children: [{
          tag: r.icon.tag,
          children: r.icon.children,
          attributes: Ie({}, r.icon.attributes, a.path)
        }]
      }]
    });
  } else
    t.push(r.icon);
  return {
    children: t,
    attributes: n
  };
}
function yUe(e) {
  var t = e.children, n = e.main, r = e.mask, s = e.attributes, o = e.styles, i = e.transform;
  if (Pl(i) && n.found && !r.found) {
    var a = n.width, c = n.height, u = {
      x: a / c / 2,
      y: 0.5
    };
    s.style = Rl(Ie({}, o, {
      "transform-origin": "".concat(u.x + i.x / 16, "em ").concat(u.y + i.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: s,
    children: t
  }];
}
function wUe(e) {
  var t = e.prefix, n = e.iconName, r = e.children, s = e.attributes, o = e.symbol, i = o === !0 ? "".concat(t, "-").concat(mt.familyPrefix, "-").concat(n) : o;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: Ie({}, s, {
        id: i
      }),
      children: r
    }]
  }];
}
function kUe(e) {
  var t = e.icons, n = t.main, r = t.mask, s = e.prefix, o = e.iconName, i = e.transform, a = e.symbol, c = e.title, u = e.maskId, d = e.titleId, l = e.extra, m = e.watchable, f = m === void 0 ? !1 : m, v = r.found ? r : n, g = v.width, y = v.height, h = s === "fak", w = h ? "" : "fa-w-".concat(Math.ceil(g / y * 16)), k = [mt.replacementClass, o ? "".concat(mt.familyPrefix, "-").concat(o) : "", w].filter(function(R) {
    return l.classes.indexOf(R) === -1;
  }).filter(function(R) {
    return R !== "" || !!R;
  }).concat(l.classes).join(" "), x = {
    children: [],
    attributes: Ie({}, l.attributes, {
      "data-prefix": s,
      "data-icon": o,
      class: k,
      role: l.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(g, " ").concat(y)
    })
  }, A = h && !~l.classes.indexOf("fa-fw") ? {
    width: "".concat(g / y * 16 * 0.0625, "em")
  } : {};
  f && (x.attributes[Cm] = ""), c && x.children.push({
    tag: "title",
    attributes: {
      id: x.attributes["aria-labelledby"] || "title-".concat(d || ts())
    },
    children: [c]
  });
  var S = Ie({}, x, {
    prefix: s,
    iconName: o,
    main: n,
    mask: r,
    maskId: u,
    transform: i,
    symbol: a,
    styles: Ie({}, A, l.styles)
  }), $ = r.found && n.found ? _Ue(S) : bUe(S), M = $.children, P = $.attributes;
  return S.children = M, S.attributes = P, a ? wUe(S) : yUe(S);
}
function xUe(e) {
  var t = e.content, n = e.width, r = e.height, s = e.transform, o = e.title, i = e.extra, a = e.watchable, c = a === void 0 ? !1 : a, u = Ie({}, i.attributes, o ? {
    title: o
  } : {}, {
    class: i.classes.join(" ")
  });
  c && (u[Cm] = "");
  var d = Ie({}, i.styles);
  Pl(s) && (d.transform = mUe({
    transform: s,
    width: n,
    height: r
  }), d["-webkit-transform"] = d.transform);
  var l = Rl(d);
  l.length > 0 && (u.style = l);
  var m = [];
  return m.push({
    tag: "span",
    attributes: u,
    children: [t]
  }), o && m.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [o]
  }), m;
}
mt.measurePerformance && Ro && Ro.mark && Ro.measure;
var ba = function(t, n, r, s) {
  var o = Object.keys(t), i = o.length, a = n, c, u, d;
  for (r === void 0 ? (c = 1, d = t[o[0]]) : (c = 0, d = r); c < i; c++)
    u = o[c], d = a(d, t[u], u, t);
  return d;
};
function Rm(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.skipHooks, s = r === void 0 ? !1 : r, o = Object.keys(t).reduce(function(i, a) {
    var c = t[a], u = !!c.icon;
    return u ? i[c.iconName] = c.icon : i[a] = c, i;
  }, {});
  typeof an.hooks.addPack == "function" && !s ? an.hooks.addPack(e, o) : an.styles[e] = Ie({}, an.styles[e] || {}, o), e === "fas" && Rm("fa", t);
}
var b0 = an.styles, CUe = an.shims, Pm = function() {
  var t = function(s) {
    return ba(b0, function(o, i, a) {
      return o[a] = ba(i, s, {}), o;
    }, {});
  };
  t(function(r, s, o) {
    return s[3] && (r[s[3]] = o), r;
  }), t(function(r, s, o) {
    var i = s[2];
    return r[o] = o, i.forEach(function(a) {
      r[a] = o;
    }), r;
  });
  var n = "far" in b0;
  ba(CUe, function(r, s) {
    var o = s[0], i = s[1], a = s[2];
    return i === "far" && !n && (i = "fas"), r[o] = {
      prefix: i,
      iconName: a
    }, r;
  }, {});
};
Pm();
an.styles;
function y0(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
function Bm(e) {
  var t = e.tag, n = e.attributes, r = n === void 0 ? {} : n, s = e.children, o = s === void 0 ? [] : s;
  return typeof e == "string" ? Lm(e) : "<".concat(t, " ").concat(gUe(r), ">").concat(o.map(Bm).join(""), "</").concat(t, ">");
}
var SUe = function(t) {
  var n = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return t ? t.toLowerCase().split(" ").reduce(function(r, s) {
    var o = s.toLowerCase().split("-"), i = o[0], a = o.slice(1).join("-");
    if (i && a === "h")
      return r.flipX = !0, r;
    if (i && a === "v")
      return r.flipY = !0, r;
    if (a = parseFloat(a), isNaN(a))
      return r;
    switch (i) {
      case "grow":
        r.size = r.size + a;
        break;
      case "shrink":
        r.size = r.size - a;
        break;
      case "left":
        r.x = r.x - a;
        break;
      case "right":
        r.x = r.x + a;
        break;
      case "up":
        r.y = r.y - a;
        break;
      case "down":
        r.y = r.y + a;
        break;
      case "rotate":
        r.rotate = r.rotate + a;
        break;
    }
    return r;
  }, n) : n;
};
function Vc(e) {
  this.name = "MissingIcon", this.message = e || "Icon unavailable", this.stack = new Error().stack;
}
Vc.prototype = Object.create(Error.prototype);
Vc.prototype.constructor = Vc;
var Ss = {
  fill: "currentColor"
}, zm = {
  attributeType: "XML",
  repeatCount: "indefinite",
  dur: "2s"
};
Ie({}, Ss, {
  d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
});
var Bl = Ie({}, zm, {
  attributeName: "opacity"
});
Ie({}, Ss, {
  cx: "256",
  cy: "364",
  r: "28"
}), Ie({}, zm, {
  attributeName: "r",
  values: "28;14;28;28;14;28;"
}), Ie({}, Bl, {
  values: "1;0;1;1;0;1;"
});
Ie({}, Ss, {
  opacity: "1",
  d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
}), Ie({}, Bl, {
  values: "1;0;0;0;0;1;"
});
Ie({}, Ss, {
  opacity: "0",
  d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
}), Ie({}, Bl, {
  values: "0;0;1;1;0;0;"
});
an.styles;
function w0(e) {
  var t = e[0], n = e[1], r = e.slice(4), s = bm(r, 1), o = s[0], i = null;
  return Array.isArray(o) ? i = {
    tag: "g",
    attributes: {
      class: "".concat(mt.familyPrefix, "-").concat(va.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(mt.familyPrefix, "-").concat(va.SECONDARY),
        fill: "currentColor",
        d: o[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(mt.familyPrefix, "-").concat(va.PRIMARY),
        fill: "currentColor",
        d: o[1]
      }
    }]
  } : i = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: o
    }
  }, {
    found: !0,
    width: t,
    height: n,
    icon: i
  };
}
an.styles;
var EUe = `svg:not(:root).svg-inline--fa {
  overflow: visible;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.225em;
}
.svg-inline--fa.fa-w-1 {
  width: 0.0625em;
}
.svg-inline--fa.fa-w-2 {
  width: 0.125em;
}
.svg-inline--fa.fa-w-3 {
  width: 0.1875em;
}
.svg-inline--fa.fa-w-4 {
  width: 0.25em;
}
.svg-inline--fa.fa-w-5 {
  width: 0.3125em;
}
.svg-inline--fa.fa-w-6 {
  width: 0.375em;
}
.svg-inline--fa.fa-w-7 {
  width: 0.4375em;
}
.svg-inline--fa.fa-w-8 {
  width: 0.5em;
}
.svg-inline--fa.fa-w-9 {
  width: 0.5625em;
}
.svg-inline--fa.fa-w-10 {
  width: 0.625em;
}
.svg-inline--fa.fa-w-11 {
  width: 0.6875em;
}
.svg-inline--fa.fa-w-12 {
  width: 0.75em;
}
.svg-inline--fa.fa-w-13 {
  width: 0.8125em;
}
.svg-inline--fa.fa-w-14 {
  width: 0.875em;
}
.svg-inline--fa.fa-w-15 {
  width: 0.9375em;
}
.svg-inline--fa.fa-w-16 {
  width: 1em;
}
.svg-inline--fa.fa-w-17 {
  width: 1.0625em;
}
.svg-inline--fa.fa-w-18 {
  width: 1.125em;
}
.svg-inline--fa.fa-w-19 {
  width: 1.1875em;
}
.svg-inline--fa.fa-w-20 {
  width: 1.25em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: 0.3em;
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: 0.3em;
  width: auto;
}
.svg-inline--fa.fa-border {
  height: 1.5em;
}
.svg-inline--fa.fa-li {
  width: 2em;
}
.svg-inline--fa.fa-fw {
  width: 1.25em;
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: #ff253a;
  border-radius: 1em;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  color: #fff;
  height: 1.5em;
  line-height: 1;
  max-width: 5em;
  min-width: 1.5em;
  overflow: hidden;
  padding: 0.25em;
  right: 0;
  text-overflow: ellipsis;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: 0;
  right: 0;
  top: auto;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: 0;
  left: 0;
  right: auto;
  top: auto;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  right: 0;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: 0;
  right: auto;
  top: 0;
  -webkit-transform: scale(0.25);
          transform: scale(0.25);
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-lg {
  font-size: 1.3333333333em;
  line-height: 0.75em;
  vertical-align: -0.0667em;
}

.fa-xs {
  font-size: 0.75em;
}

.fa-sm {
  font-size: 0.875em;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: 2.5em;
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: -2em;
  position: absolute;
  text-align: center;
  width: 2em;
  line-height: inherit;
}

.fa-border {
  border: solid 0.08em #eee;
  border-radius: 0.1em;
  padding: 0.2em 0.25em 0.15em;
}

.fa-pull-left {
  float: left;
}

.fa-pull-right {
  float: right;
}

.fa.fa-pull-left,
.fas.fa-pull-left,
.far.fa-pull-left,
.fal.fa-pull-left,
.fab.fa-pull-left {
  margin-right: 0.3em;
}
.fa.fa-pull-right,
.fas.fa-pull-right,
.far.fa-pull-right,
.fal.fa-pull-right,
.fab.fa-pull-right {
  margin-left: 0.3em;
}

.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
          animation: fa-spin 2s infinite linear;
}

.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
          animation: fa-spin 1s infinite steps(8);
}

@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

:root .fa-rotate-90,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-flip-horizontal,
:root .fa-flip-vertical,
:root .fa-flip-both {
  -webkit-filter: none;
          filter: none;
}

.fa-stack {
  display: inline-block;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: #fff;
}

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.sr-only-focusable:active, .sr-only-focusable:focus {
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  width: auto;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: 1;
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: 0.4;
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: 0.4;
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: 1;
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse {
  color: #fff;
}`;
function AUe() {
  var e = km, t = xm, n = mt.familyPrefix, r = mt.replacementClass, s = EUe;
  if (n !== e || r !== t) {
    var o = new RegExp("\\.".concat(e, "\\-"), "g"), i = new RegExp("\\--".concat(e, "\\-"), "g"), a = new RegExp("\\.".concat(t), "g");
    s = s.replace(o, ".".concat(n, "-")).replace(i, "--".concat(n, "-")).replace(a, ".".concat(r));
  }
  return s;
}
var $Ue = /* @__PURE__ */ (function() {
  function e() {
    qVe(this, e), this.definitions = {};
  }
  return HVe(e, [{
    key: "add",
    value: function() {
      for (var n = this, r = arguments.length, s = new Array(r), o = 0; o < r; o++)
        s[o] = arguments[o];
      var i = s.reduce(this._pullDefinitions, {});
      Object.keys(i).forEach(function(a) {
        n.definitions[a] = Ie({}, n.definitions[a] || {}, i[a]), Rm(a, i[a]), Pm();
      });
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(n, r) {
      var s = r.prefix && r.iconName && r.icon ? {
        0: r
      } : r;
      return Object.keys(s).map(function(o) {
        var i = s[o], a = i.prefix, c = i.iconName, u = i.icon;
        n[a] || (n[a] = {}), n[a][c] = u;
      }), n;
    }
  }]), e;
})();
function Dm() {
  mt.autoAddCss && !x0 && (pUe(AUe()), x0 = !0);
}
function Nm(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map(function(r) {
        return Bm(r);
      });
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (Tl) {
        var r = bt.createElement("div");
        return r.innerHTML = e.html, r.children;
      }
    }
  }), e;
}
function k0(e) {
  var t = e.prefix, n = t === void 0 ? "fa" : t, r = e.iconName;
  if (r)
    return y0(IUe.definitions, n, r) || y0(an.styles, n, r);
}
function MUe(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = (t || {}).icon ? t : k0(t || {}), s = n.mask;
    return s && (s = (s || {}).icon ? s : k0(s || {})), e(r, Ie({}, n, {
      mask: s
    }));
  };
}
var IUe = new $Ue(), x0 = !1, ns = {
  transform: function(t) {
    return SUe(t);
  }
}, TUe = MUe(function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.transform, r = n === void 0 ? Pn : n, s = t.symbol, o = s === void 0 ? !1 : s, i = t.mask, a = i === void 0 ? null : i, c = t.maskId, u = c === void 0 ? null : c, d = t.title, l = d === void 0 ? null : d, m = t.titleId, f = m === void 0 ? null : m, v = t.classes, g = v === void 0 ? [] : v, y = t.attributes, h = y === void 0 ? {} : y, w = t.styles, k = w === void 0 ? {} : w;
  if (e) {
    var x = e.prefix, A = e.iconName, S = e.icon;
    return Nm(Ie({
      type: "icon"
    }, e), function() {
      return Dm(), mt.autoA11y && (l ? h["aria-labelledby"] = "".concat(mt.replacementClass, "-title-").concat(f || ts()) : (h["aria-hidden"] = "true", h.focusable = "false")), kUe({
        icons: {
          main: w0(S),
          mask: a ? w0(a.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: x,
        iconName: A,
        transform: Ie({}, Pn, r),
        symbol: o,
        title: l,
        maskId: u,
        titleId: f,
        extra: {
          attributes: h,
          styles: k,
          classes: g
        }
      });
    });
  }
}), LUe = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.transform, s = r === void 0 ? Pn : r, o = n.title, i = o === void 0 ? null : o, a = n.classes, c = a === void 0 ? [] : a, u = n.attributes, d = u === void 0 ? {} : u, l = n.styles, m = l === void 0 ? {} : l;
  return Nm({
    type: "text",
    content: t
  }, function() {
    return Dm(), xUe({
      content: t,
      transform: Ie({}, Pn, s),
      title: i,
      extra: {
        attributes: d,
        styles: m,
        classes: ["".concat(mt.familyPrefix, "-layers-text")].concat(VVe(c))
      }
    });
  });
};
function C0(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? C0(Object(n), !0).forEach(function(r) {
      yt(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : C0(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function rs(e) {
  "@babel/helpers - typeof";
  return rs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, rs(e);
}
function yt(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function OUe(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), s, o;
  for (o = 0; o < r.length; o++)
    s = r[o], !(t.indexOf(s) >= 0) && (n[s] = e[s]);
  return n;
}
function RUe(e, t) {
  if (e == null) return {};
  var n = OUe(e, t), r, s;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (s = 0; s < o.length; s++)
      r = o[s], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Uc(e) {
  return PUe(e) || BUe(e) || zUe(e) || DUe();
}
function PUe(e) {
  if (Array.isArray(e)) return Zc(e);
}
function BUe(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function zUe(e, t) {
  if (e) {
    if (typeof e == "string") return Zc(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Zc(e, t);
  }
}
function Zc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function DUe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var NUe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, qm = { exports: {} };
(function(e) {
  (function(t) {
    var n = function(h, w, k) {
      if (!u(w) || l(w) || m(w) || f(w) || c(w))
        return w;
      var x, A = 0, S = 0;
      if (d(w))
        for (x = [], S = w.length; A < S; A++)
          x.push(n(h, w[A], k));
      else {
        x = {};
        for (var $ in w)
          Object.prototype.hasOwnProperty.call(w, $) && (x[h($, k)] = n(h, w[$], k));
      }
      return x;
    }, r = function(h, w) {
      w = w || {};
      var k = w.separator || "_", x = w.split || /(?=[A-Z])/;
      return h.split(x).join(k);
    }, s = function(h) {
      return v(h) ? h : (h = h.replace(/[\-_\s]+(.)?/g, function(w, k) {
        return k ? k.toUpperCase() : "";
      }), h.substr(0, 1).toLowerCase() + h.substr(1));
    }, o = function(h) {
      var w = s(h);
      return w.substr(0, 1).toUpperCase() + w.substr(1);
    }, i = function(h, w) {
      return r(h, w).toLowerCase();
    }, a = Object.prototype.toString, c = function(h) {
      return typeof h == "function";
    }, u = function(h) {
      return h === Object(h);
    }, d = function(h) {
      return a.call(h) == "[object Array]";
    }, l = function(h) {
      return a.call(h) == "[object Date]";
    }, m = function(h) {
      return a.call(h) == "[object RegExp]";
    }, f = function(h) {
      return a.call(h) == "[object Boolean]";
    }, v = function(h) {
      return h = h - 0, h === h;
    }, g = function(h, w) {
      var k = w && "process" in w ? w.process : w;
      return typeof k != "function" ? h : function(x, A) {
        return k(x, h, A);
      };
    }, y = {
      camelize: s,
      decamelize: i,
      pascalize: o,
      depascalize: i,
      camelizeKeys: function(h, w) {
        return n(g(s, w), h);
      },
      decamelizeKeys: function(h, w) {
        return n(g(i, w), h, w);
      },
      pascalizeKeys: function(h, w) {
        return n(g(o, w), h);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    e.exports ? e.exports = y : t.humps = y;
  })(NUe);
})(qm);
var qUe = qm.exports, FUe = ["class", "style"];
function HUe(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var r = n.indexOf(":"), s = qUe.camelize(n.slice(0, r)), o = n.slice(r + 1).trim();
    return t[s] = o, t;
  }, {});
}
function jUe(e) {
  return e.split(/\s+/).reduce(function(t, n) {
    return t[n] = !0, t;
  }, {});
}
function zl(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof e == "string")
    return e;
  var r = (e.children || []).map(function(c) {
    return zl(c);
  }), s = Object.keys(e.attributes || {}).reduce(function(c, u) {
    var d = e.attributes[u];
    switch (u) {
      case "class":
        c.class = jUe(d);
        break;
      case "style":
        c.style = HUe(d);
        break;
      default:
        c.attrs[u] = d;
    }
    return c;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  n.class;
  var o = n.style, i = o === void 0 ? {} : o, a = RUe(n, FUe);
  return Rt(e.tag, Xt(Xt(Xt({}, t), {}, {
    class: s.class,
    style: Xt(Xt({}, s.style), i)
  }, s.attrs), a), r);
}
var Fm = !1;
try {
  Fm = !0;
} catch {
}
function VUe() {
  if (!Fm && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function Gr(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? yt({}, e, t) : {};
}
function UUe(e) {
  var t, n = (t = {
    "fa-spin": e.spin,
    "fa-pulse": e.pulse,
    "fa-fw": e.fixedWidth,
    "fa-border": e.border,
    "fa-li": e.listItem,
    "fa-inverse": e.inverse,
    "fa-flip": e.flip === !0,
    "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
    "fa-flip-vertical": e.flip === "vertical" || e.flip === "both"
  }, yt(t, "fa-".concat(e.size), e.size !== null), yt(t, "fa-rotate-".concat(e.rotation), e.rotation !== null), yt(t, "fa-pull-".concat(e.pull), e.pull !== null), yt(t, "fa-swap-opacity", e.swapOpacity), yt(t, "fa-bounce", e.bounce), yt(t, "fa-shake", e.shake), yt(t, "fa-beat", e.beat), yt(t, "fa-fade", e.fade), yt(t, "fa-beat-fade", e.beatFade), yt(t, "fa-flash", e.flash), yt(t, "fa-spin-pulse", e.spinPulse), yt(t, "fa-spin-reverse", e.spinReverse), t);
  return Object.keys(n).map(function(r) {
    return n[r] ? r : null;
  }).filter(function(r) {
    return r;
  });
}
function S0(e) {
  if (e && rs(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (ns.icon)
    return ns.icon(e);
  if (e === null)
    return null;
  if (rs(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
Z({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: !1
    },
    fixedWidth: {
      type: Boolean,
      default: !1
    },
    flip: {
      type: [Boolean, String],
      default: !1,
      validator: function(t) {
        return [!0, !1, "horizontal", "vertical", "both"].indexOf(t) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: !0
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    listItem: {
      type: Boolean,
      default: !1
    },
    pull: {
      type: String,
      default: null,
      validator: function(t) {
        return ["right", "left"].indexOf(t) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: !1
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function(t) {
        return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null,
      validator: function(t) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: !1
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: !1
    },
    title: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: !1
    },
    bounce: {
      type: Boolean,
      default: !1
    },
    shake: {
      type: Boolean,
      default: !1
    },
    beat: {
      type: Boolean,
      default: !1
    },
    fade: {
      type: Boolean,
      default: !1
    },
    beatFade: {
      type: Boolean,
      default: !1
    },
    flash: {
      type: Boolean,
      default: !1
    },
    spinPulse: {
      type: Boolean,
      default: !1
    },
    spinReverse: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var r = n.attrs, s = I(function() {
      return S0(t.icon);
    }), o = I(function() {
      return Gr("classes", UUe(t));
    }), i = I(function() {
      return Gr("transform", typeof t.transform == "string" ? ns.transform(t.transform) : t.transform);
    }), a = I(function() {
      return Gr("mask", S0(t.mask));
    }), c = I(function() {
      return TUe(s.value, Xt(Xt(Xt(Xt({}, o.value), i.value), a.value), {}, {
        symbol: t.symbol,
        title: t.title
      }));
    });
    ue(c, function(d) {
      if (!d)
        return VUe("Could not find one or more icon(s)", s.value, a.value);
    }, {
      immediate: !0
    });
    var u = I(function() {
      return c.value ? zl(c.value.abstract[0], {}, r) : null;
    });
    return function() {
      return u.value;
    };
  }
});
Z({
  name: "FontAwesomeLayers",
  props: {
    fixedWidth: {
      type: Boolean,
      default: !1
    }
  },
  setup: function(t, n) {
    var r = n.slots, s = mt.familyPrefix, o = I(function() {
      return ["".concat(s, "-layers")].concat(Uc(t.fixedWidth ? ["".concat(s, "-fw")] : []));
    });
    return function() {
      return Rt("div", {
        class: o.value
      }, r.default ? r.default() : []);
    };
  }
});
Z({
  name: "FontAwesomeLayersText",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    transform: {
      type: [String, Object],
      default: null
    },
    counter: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      default: null,
      validator: function(t) {
        return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(t) > -1;
      }
    }
  },
  setup: function(t, n) {
    var r = n.attrs, s = mt.familyPrefix, o = I(function() {
      return Gr("classes", [].concat(Uc(t.counter ? ["".concat(s, "-layers-counter")] : []), Uc(t.position ? ["".concat(s, "-layers-").concat(t.position)] : [])));
    }), i = I(function() {
      return Gr("transform", typeof t.transform == "string" ? ns.transform(t.transform) : t.transform);
    }), a = I(function() {
      var u = LUe(t.value.toString(), Xt(Xt({}, i.value), o.value)), d = u.abstract;
      return t.counter && (d[0].attributes.class = d[0].attributes.class.replace("fa-layers-text", "")), d[0];
    }), c = I(function() {
      return zl(a.value, {}, r);
    });
    return function() {
      return c.value;
    };
  }
});
({
  ...Jh
});
const ZUe = ["data-dir"], WUe = /* @__PURE__ */ Z({
  __name: "ResizeWrapper",
  props: {
    isResizingEnabled: { type: Boolean, default: !0 },
    height: { default: 0 },
    width: { default: 0 },
    minHeight: { default: 0 },
    maxHeight: { default: Number.POSITIVE_INFINITY },
    minWidth: { default: 0 },
    maxWidth: { default: Number.POSITIVE_INFINITY },
    scale: { default: 1 },
    gridSize: { default: 20 },
    supportedDirections: { default: () => [] },
    outset: { type: Boolean, default: !1 },
    window: { default: void 0 }
  },
  emits: ["resizestart", "resize", "resizeend"],
  setup(e, { emit: t }) {
    function n(f, v) {
      const g = f / v, y = v * g, h = f * v > 0 ? v * (g + 1) : v * (g - 1);
      return Math.abs(f - y) < Math.abs(f - h) ? y : h;
    }
    function r(f, v, g, y) {
      if (v <= 0)
        return f;
      const h = n(v, g);
      return h <= f ? f : h >= y ? y : h;
    }
    const s = e, o = is(), i = t, a = I(() => {
      const f = Object.keys(h0);
      return s.isResizingEnabled ? s.supportedDirections.length === 0 ? f : s.supportedDirections : [];
    }), c = {
      dir: D(""),
      dHeight: D(0),
      dWidth: D(0),
      vHeight: D(0),
      vWidth: D(0),
      x: D(0),
      y: D(0)
    }, u = I(() => ({
      [o.resize]: !0,
      [o.outset]: s.outset
    })), d = (f) => {
      f.preventDefault(), f.stopPropagation();
      let v = 0, g = 0, y = !1, h = !1;
      c.dir.value.includes("right") && (v = f.pageX - c.x.value), c.dir.value.includes("left") && (v = c.x.value - f.pageX, h = !0), c.dir.value.includes("top") && (g = c.y.value - f.pageY, y = !0), c.dir.value.includes("bottom") && (g = f.pageY - c.y.value);
      const w = (v - c.dWidth.value) / s.scale, k = (g - c.dHeight.value) / s.scale;
      c.vHeight.value = c.vHeight.value + k, c.vWidth.value = c.vWidth.value + w;
      const x = r(s.minHeight, c.vHeight.value, s.gridSize, s.maxHeight), A = r(s.minWidth, c.vWidth.value, s.gridSize, s.maxWidth), S = h && A !== s.width ? -1 * (A - s.width) : 0, $ = y && x !== s.height ? -1 * (x - s.height) : 0, M = f.x, P = f.y, R = c.dir.value;
      i("resize", { height: x, width: A, dX: S, dY: $, x: M, y: P, direction: R }), c.dHeight.value = g, c.dWidth.value = v;
    }, l = (f) => {
      f.preventDefault(), f.stopPropagation(), i("resizeend"), (s.window ?? window).removeEventListener("mousemove", d), (s.window ?? window).removeEventListener("mouseup", l), document.body.style.cursor = "unset", c.dir.value = "";
    }, m = (f) => {
      f.preventDefault(), f.stopPropagation();
      const v = f.target;
      v && (c.dir.value = v.dataset.dir.toLocaleLowerCase()), document.body.style.cursor = h0[c.dir.value], c.x.value = f.pageX, c.y.value = f.pageY, c.dWidth.value = 0, c.dHeight.value = 0, c.vHeight.value = s.height, c.vWidth.value = s.width, (s.window ?? window).addEventListener("mousemove", d), (s.window ?? window).addEventListener("mouseup", l), i("resizestart");
    };
    return (f, v) => (b(), C("div", {
      class: H(u.value)
    }, [
      (b(!0), C(He, null, ot(a.value, (g) => (b(), C("div", {
        key: g,
        "data-dir": g,
        class: H({ [_(o).resizer]: !0, [_(o)[g]]: !0 }),
        "data-test-id": "resize-handle",
        onMousedown: m
      }, null, 42, ZUe))), 128)),
      ae(f.$slots, "default")
    ], 2));
  }
}), GUe = "_resize_10tsr_1", KUe = "_resizer_10tsr_11", XUe = "_right_10tsr_16", YUe = "_top_10tsr_24", JUe = "_bottom_10tsr_32", QUe = "_left_10tsr_40", eZe = "_topLeft_10tsr_48", tZe = "_topRight_10tsr_56", nZe = "_bottomLeft_10tsr_64", rZe = "_bottomRight_10tsr_72", oZe = "_outset_10tsr_80", sZe = {
  resize: GUe,
  resizer: KUe,
  right: XUe,
  top: YUe,
  bottom: JUe,
  left: QUe,
  topLeft: eZe,
  topRight: tZe,
  bottomLeft: nZe,
  bottomRight: rZe,
  outset: oZe
}, iZe = {
  $style: sZe
}, aZe = /* @__PURE__ */ Ht(WUe, [["__cssModules", iZe]]), Hm = {
  height: 180,
  width: 240,
  minHeight: 80,
  minWidth: 150,
  id: "0",
  editMode: !1,
  readOnly: !1,
  backgroundColor: 1
}, cZe = /* @__PURE__ */ Z({
  __name: "Sticky",
  props: /* @__PURE__ */ Op({
    modelValue: {},
    height: {},
    width: {},
    minHeight: {},
    minWidth: {},
    id: {},
    defaultText: {},
    editMode: { type: Boolean },
    readOnly: { type: Boolean },
    backgroundColor: {}
  }, Hm),
  emits: ["edit", "update:modelValue", "markdown-click"],
  setup(e, { emit: t }) {
    const n = e, r = t, { t: s } = HO(), o = D(!1), i = D(void 0), a = I(() => n.height < n.minHeight ? n.minHeight : n.height), c = I(() => n.width < n.minWidth ? n.minWidth : n.width), u = I(() => n.id ? `${n.id}-input` : void 0), d = I(() => ({
      height: `${a.value}px`,
      width: `${c.value}px`
    })), l = I(() => a.value > 100 && c.value > 155);
    ue(
      () => n.editMode,
      (h, w) => {
        setTimeout(() => {
          h && !w && i.value && (n.defaultText === n.modelValue && i.value.select(), i.value.focus());
        }, 100);
      }
    );
    const m = () => {
      n.readOnly || r("edit", !0);
    }, f = () => {
      o.value || r("edit", !1);
    }, v = (h) => {
      r("update:modelValue", h);
    }, g = (h, w) => {
      r("markdown-click", h, w);
    }, y = (h) => {
      !h.ctrlKey && !h.metaKey && h.stopPropagation();
    };
    return (h, w) => {
      const k = Kc("n8n-html");
      return b(), C("div", {
        class: H({
          "n8n-sticky": !0,
          [h.$style.sticky]: !0,
          [h.$style.clickable]: !o.value,
          [h.$style[`color-${h.backgroundColor}`]]: !0
        }),
        style: Ue(d.value),
        onKeydown: w[4] || (w[4] = tt(() => {
        }, ["prevent"]))
      }, [
        rt(p("div", {
          class: H(h.$style.wrapper),
          onDblclick: tt(m, ["stop"])
        }, [
          he(_(NVe), {
            theme: "sticky",
            content: h.modelValue,
            "with-multi-breaks": !0,
            onMarkdownClick: g,
            onUpdateContent: v
          }, null, 8, ["content"])
        ], 34), [
          [Qt, !h.editMode]
        ]),
        rt(p("div", {
          class: H({ "full-height": !l.value, "sticky-textarea": !0 }),
          onClick: w[0] || (w[0] = tt(() => {
          }, ["stop"])),
          onMousedown: w[1] || (w[1] = tt(() => {
          }, ["stop"])),
          onMouseup: w[2] || (w[2] = tt(() => {
          }, ["stop"])),
          onKeydown: [
            ft(f, ["esc"]),
            w[3] || (w[3] = tt(() => {
            }, ["stop"]))
          ]
        }, [
          he(_(sm), {
            ref_key: "input",
            ref: i,
            "model-value": h.modelValue,
            name: u.value,
            type: "textarea",
            rows: 5,
            onBlur: f,
            "onUpdate:modelValue": v,
            onWheel: y
          }, null, 8, ["model-value", "name"])
        ], 34), [
          [Qt, h.editMode]
        ]),
        h.editMode && l.value ? (b(), C("div", {
          key: 0,
          class: H(h.$style.footer)
        }, [
          he(_(nm), {
            size: "xsmall",
            align: "right"
          }, {
            default: J(() => [
              rt(p("span", null, null, 512), [
                [k, _(s)("sticky.markdownHint")]
              ])
            ]),
            _: 1
          })
        ], 2)) : te("", !0)
      ], 38);
    };
  }
}), lZe = "_sticky_1iqd8_1", uZe = "_wrapper_1iqd8_7", dZe = "_clickable_1iqd8_12", fZe = "_footer_1iqd8_33", pZe = {
  sticky: lZe,
  wrapper: uZe,
  clickable: dZe,
  footer: fZe,
  "color-2": "_color-2_1iqd8_39",
  "color-3": "_color-3_1iqd8_44",
  "color-4": "_color-4_1iqd8_49",
  "color-5": "_color-5_1iqd8_54",
  "color-6": "_color-6_1iqd8_59",
  "color-7": "_color-7_1iqd8_64"
}, hZe = {
  $style: pZe
}, gZe = /* @__PURE__ */ Ht(cZe, [["__cssModules", hZe]]);
({
  ...Hm
});
var ya, E0;
function Dl() {
  if (E0) return ya;
  E0 = 1;
  var e = Array.isArray;
  return ya = e, ya;
}
var wa, A0;
function mZe() {
  if (A0) return wa;
  A0 = 1;
  var e = typeof pr == "object" && pr && pr.Object === Object && pr;
  return wa = e, wa;
}
var ka, $0;
function Nl() {
  if ($0) return ka;
  $0 = 1;
  var e = mZe(), t = typeof self == "object" && self && self.Object === Object && self, n = e || t || Function("return this")();
  return ka = n, ka;
}
var xa, M0;
function ql() {
  if (M0) return xa;
  M0 = 1;
  var e = Nl(), t = e.Symbol;
  return xa = t, xa;
}
var Ca, I0;
function vZe() {
  if (I0) return Ca;
  I0 = 1;
  var e = ql(), t = Object.prototype, n = t.hasOwnProperty, r = t.toString, s = e ? e.toStringTag : void 0;
  function o(i) {
    var a = n.call(i, s), c = i[s];
    try {
      i[s] = void 0;
      var u = !0;
    } catch {
    }
    var d = r.call(i);
    return u && (a ? i[s] = c : delete i[s]), d;
  }
  return Ca = o, Ca;
}
var Sa, T0;
function _Ze() {
  if (T0) return Sa;
  T0 = 1;
  var e = Object.prototype, t = e.toString;
  function n(r) {
    return t.call(r);
  }
  return Sa = n, Sa;
}
var Ea, L0;
function jm() {
  if (L0) return Ea;
  L0 = 1;
  var e = ql(), t = vZe(), n = _Ze(), r = "[object Null]", s = "[object Undefined]", o = e ? e.toStringTag : void 0;
  function i(a) {
    return a == null ? a === void 0 ? s : r : o && o in Object(a) ? t(a) : n(a);
  }
  return Ea = i, Ea;
}
var Aa, O0;
function bZe() {
  if (O0) return Aa;
  O0 = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return Aa = e, Aa;
}
var $a, R0;
function Fl() {
  if (R0) return $a;
  R0 = 1;
  var e = jm(), t = bZe(), n = "[object Symbol]";
  function r(s) {
    return typeof s == "symbol" || t(s) && e(s) == n;
  }
  return $a = r, $a;
}
var Ma, P0;
function yZe() {
  if (P0) return Ma;
  P0 = 1;
  var e = Dl(), t = Fl(), n = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, r = /^\w*$/;
  function s(o, i) {
    if (e(o))
      return !1;
    var a = typeof o;
    return a == "number" || a == "symbol" || a == "boolean" || o == null || t(o) ? !0 : r.test(o) || !n.test(o) || i != null && o in Object(i);
  }
  return Ma = s, Ma;
}
var Ia, B0;
function Vm() {
  if (B0) return Ia;
  B0 = 1;
  function e(t) {
    var n = typeof t;
    return t != null && (n == "object" || n == "function");
  }
  return Ia = e, Ia;
}
var Ta, z0;
function wZe() {
  if (z0) return Ta;
  z0 = 1;
  var e = jm(), t = Vm(), n = "[object AsyncFunction]", r = "[object Function]", s = "[object GeneratorFunction]", o = "[object Proxy]";
  function i(a) {
    if (!t(a))
      return !1;
    var c = e(a);
    return c == r || c == s || c == n || c == o;
  }
  return Ta = i, Ta;
}
var La, D0;
function kZe() {
  if (D0) return La;
  D0 = 1;
  var e = Nl(), t = e["__core-js_shared__"];
  return La = t, La;
}
var Oa, N0;
function xZe() {
  if (N0) return Oa;
  N0 = 1;
  var e = kZe(), t = (function() {
    var r = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  })();
  function n(r) {
    return !!t && t in r;
  }
  return Oa = n, Oa;
}
var Ra, q0;
function CZe() {
  if (q0) return Ra;
  q0 = 1;
  var e = Function.prototype, t = e.toString;
  function n(r) {
    if (r != null) {
      try {
        return t.call(r);
      } catch {
      }
      try {
        return r + "";
      } catch {
      }
    }
    return "";
  }
  return Ra = n, Ra;
}
var Pa, F0;
function SZe() {
  if (F0) return Pa;
  F0 = 1;
  var e = wZe(), t = xZe(), n = Vm(), r = CZe(), s = /[\\^$.*+?()[\]{}|]/g, o = /^\[object .+?Constructor\]$/, i = Function.prototype, a = Object.prototype, c = i.toString, u = a.hasOwnProperty, d = RegExp(
    "^" + c.call(u).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function l(m) {
    if (!n(m) || t(m))
      return !1;
    var f = e(m) ? d : o;
    return f.test(r(m));
  }
  return Pa = l, Pa;
}
var Ba, H0;
function EZe() {
  if (H0) return Ba;
  H0 = 1;
  function e(t, n) {
    return t == null ? void 0 : t[n];
  }
  return Ba = e, Ba;
}
var za, j0;
function Um() {
  if (j0) return za;
  j0 = 1;
  var e = SZe(), t = EZe();
  function n(r, s) {
    var o = t(r, s);
    return e(o) ? o : void 0;
  }
  return za = n, za;
}
var Da, V0;
function Es() {
  if (V0) return Da;
  V0 = 1;
  var e = Um(), t = e(Object, "create");
  return Da = t, Da;
}
var Na, U0;
function AZe() {
  if (U0) return Na;
  U0 = 1;
  var e = Es();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Na = t, Na;
}
var qa, Z0;
function $Ze() {
  if (Z0) return qa;
  Z0 = 1;
  function e(t) {
    var n = this.has(t) && delete this.__data__[t];
    return this.size -= n ? 1 : 0, n;
  }
  return qa = e, qa;
}
var Fa, W0;
function MZe() {
  if (W0) return Fa;
  W0 = 1;
  var e = Es(), t = "__lodash_hash_undefined__", n = Object.prototype, r = n.hasOwnProperty;
  function s(o) {
    var i = this.__data__;
    if (e) {
      var a = i[o];
      return a === t ? void 0 : a;
    }
    return r.call(i, o) ? i[o] : void 0;
  }
  return Fa = s, Fa;
}
var Ha, G0;
function IZe() {
  if (G0) return Ha;
  G0 = 1;
  var e = Es(), t = Object.prototype, n = t.hasOwnProperty;
  function r(s) {
    var o = this.__data__;
    return e ? o[s] !== void 0 : n.call(o, s);
  }
  return Ha = r, Ha;
}
var ja, K0;
function TZe() {
  if (K0) return ja;
  K0 = 1;
  var e = Es(), t = "__lodash_hash_undefined__";
  function n(r, s) {
    var o = this.__data__;
    return this.size += this.has(r) ? 0 : 1, o[r] = e && s === void 0 ? t : s, this;
  }
  return ja = n, ja;
}
var Va, X0;
function LZe() {
  if (X0) return Va;
  X0 = 1;
  var e = AZe(), t = $Ze(), n = MZe(), r = IZe(), s = TZe();
  function o(i) {
    var a = -1, c = i == null ? 0 : i.length;
    for (this.clear(); ++a < c; ) {
      var u = i[a];
      this.set(u[0], u[1]);
    }
  }
  return o.prototype.clear = e, o.prototype.delete = t, o.prototype.get = n, o.prototype.has = r, o.prototype.set = s, Va = o, Va;
}
var Ua, Y0;
function OZe() {
  if (Y0) return Ua;
  Y0 = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return Ua = e, Ua;
}
var Za, J0;
function RZe() {
  if (J0) return Za;
  J0 = 1;
  function e(t, n) {
    return t === n || t !== t && n !== n;
  }
  return Za = e, Za;
}
var Wa, Q0;
function As() {
  if (Q0) return Wa;
  Q0 = 1;
  var e = RZe();
  function t(n, r) {
    for (var s = n.length; s--; )
      if (e(n[s][0], r))
        return s;
    return -1;
  }
  return Wa = t, Wa;
}
var Ga, ep;
function PZe() {
  if (ep) return Ga;
  ep = 1;
  var e = As(), t = Array.prototype, n = t.splice;
  function r(s) {
    var o = this.__data__, i = e(o, s);
    if (i < 0)
      return !1;
    var a = o.length - 1;
    return i == a ? o.pop() : n.call(o, i, 1), --this.size, !0;
  }
  return Ga = r, Ga;
}
var Ka, tp;
function BZe() {
  if (tp) return Ka;
  tp = 1;
  var e = As();
  function t(n) {
    var r = this.__data__, s = e(r, n);
    return s < 0 ? void 0 : r[s][1];
  }
  return Ka = t, Ka;
}
var Xa, np;
function zZe() {
  if (np) return Xa;
  np = 1;
  var e = As();
  function t(n) {
    return e(this.__data__, n) > -1;
  }
  return Xa = t, Xa;
}
var Ya, rp;
function DZe() {
  if (rp) return Ya;
  rp = 1;
  var e = As();
  function t(n, r) {
    var s = this.__data__, o = e(s, n);
    return o < 0 ? (++this.size, s.push([n, r])) : s[o][1] = r, this;
  }
  return Ya = t, Ya;
}
var Ja, op;
function NZe() {
  if (op) return Ja;
  op = 1;
  var e = OZe(), t = PZe(), n = BZe(), r = zZe(), s = DZe();
  function o(i) {
    var a = -1, c = i == null ? 0 : i.length;
    for (this.clear(); ++a < c; ) {
      var u = i[a];
      this.set(u[0], u[1]);
    }
  }
  return o.prototype.clear = e, o.prototype.delete = t, o.prototype.get = n, o.prototype.has = r, o.prototype.set = s, Ja = o, Ja;
}
var Qa, sp;
function qZe() {
  if (sp) return Qa;
  sp = 1;
  var e = Um(), t = Nl(), n = e(t, "Map");
  return Qa = n, Qa;
}
var ec, ip;
function FZe() {
  if (ip) return ec;
  ip = 1;
  var e = LZe(), t = NZe(), n = qZe();
  function r() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (n || t)(),
      string: new e()
    };
  }
  return ec = r, ec;
}
var tc, ap;
function HZe() {
  if (ap) return tc;
  ap = 1;
  function e(t) {
    var n = typeof t;
    return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? t !== "__proto__" : t === null;
  }
  return tc = e, tc;
}
var nc, cp;
function $s() {
  if (cp) return nc;
  cp = 1;
  var e = HZe();
  function t(n, r) {
    var s = n.__data__;
    return e(r) ? s[typeof r == "string" ? "string" : "hash"] : s.map;
  }
  return nc = t, nc;
}
var rc, lp;
function jZe() {
  if (lp) return rc;
  lp = 1;
  var e = $s();
  function t(n) {
    var r = e(this, n).delete(n);
    return this.size -= r ? 1 : 0, r;
  }
  return rc = t, rc;
}
var oc, up;
function VZe() {
  if (up) return oc;
  up = 1;
  var e = $s();
  function t(n) {
    return e(this, n).get(n);
  }
  return oc = t, oc;
}
var sc, dp;
function UZe() {
  if (dp) return sc;
  dp = 1;
  var e = $s();
  function t(n) {
    return e(this, n).has(n);
  }
  return sc = t, sc;
}
var ic, fp;
function ZZe() {
  if (fp) return ic;
  fp = 1;
  var e = $s();
  function t(n, r) {
    var s = e(this, n), o = s.size;
    return s.set(n, r), this.size += s.size == o ? 0 : 1, this;
  }
  return ic = t, ic;
}
var ac, pp;
function WZe() {
  if (pp) return ac;
  pp = 1;
  var e = FZe(), t = jZe(), n = VZe(), r = UZe(), s = ZZe();
  function o(i) {
    var a = -1, c = i == null ? 0 : i.length;
    for (this.clear(); ++a < c; ) {
      var u = i[a];
      this.set(u[0], u[1]);
    }
  }
  return o.prototype.clear = e, o.prototype.delete = t, o.prototype.get = n, o.prototype.has = r, o.prototype.set = s, ac = o, ac;
}
var cc, hp;
function GZe() {
  if (hp) return cc;
  hp = 1;
  var e = WZe(), t = "Expected a function";
  function n(r, s) {
    if (typeof r != "function" || s != null && typeof s != "function")
      throw new TypeError(t);
    var o = function() {
      var i = arguments, a = s ? s.apply(this, i) : i[0], c = o.cache;
      if (c.has(a))
        return c.get(a);
      var u = r.apply(this, i);
      return o.cache = c.set(a, u) || c, u;
    };
    return o.cache = new (n.Cache || e)(), o;
  }
  return n.Cache = e, cc = n, cc;
}
var lc, gp;
function KZe() {
  if (gp) return lc;
  gp = 1;
  var e = GZe(), t = 500;
  function n(r) {
    var s = e(r, function(i) {
      return o.size === t && o.clear(), i;
    }), o = s.cache;
    return s;
  }
  return lc = n, lc;
}
var uc, mp;
function XZe() {
  if (mp) return uc;
  mp = 1;
  var e = KZe(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = e(function(s) {
    var o = [];
    return s.charCodeAt(0) === 46 && o.push(""), s.replace(t, function(i, a, c, u) {
      o.push(c ? u.replace(n, "$1") : a || i);
    }), o;
  });
  return uc = r, uc;
}
var dc, vp;
function YZe() {
  if (vp) return dc;
  vp = 1;
  function e(t, n) {
    for (var r = -1, s = t == null ? 0 : t.length, o = Array(s); ++r < s; )
      o[r] = n(t[r], r, t);
    return o;
  }
  return dc = e, dc;
}
var fc, _p;
function JZe() {
  if (_p) return fc;
  _p = 1;
  var e = ql(), t = YZe(), n = Dl(), r = Fl(), s = e ? e.prototype : void 0, o = s ? s.toString : void 0;
  function i(a) {
    if (typeof a == "string")
      return a;
    if (n(a))
      return t(a, i) + "";
    if (r(a))
      return o ? o.call(a) : "";
    var c = a + "";
    return c == "0" && 1 / a == -1 / 0 ? "-0" : c;
  }
  return fc = i, fc;
}
var pc, bp;
function QZe() {
  if (bp) return pc;
  bp = 1;
  var e = JZe();
  function t(n) {
    return n == null ? "" : e(n);
  }
  return pc = t, pc;
}
var hc, yp;
function eWe() {
  if (yp) return hc;
  yp = 1;
  var e = Dl(), t = yZe(), n = XZe(), r = QZe();
  function s(o, i) {
    return e(o) ? o : t(o, i) ? [o] : n(r(o));
  }
  return hc = s, hc;
}
var gc, wp;
function tWe() {
  if (wp) return gc;
  wp = 1;
  var e = Fl();
  function t(n) {
    if (typeof n == "string" || e(n))
      return n;
    var r = n + "";
    return r == "0" && 1 / n == -1 / 0 ? "-0" : r;
  }
  return gc = t, gc;
}
var mc, kp;
function nWe() {
  if (kp) return mc;
  kp = 1;
  var e = eWe(), t = tWe();
  function n(r, s) {
    s = e(s, r);
    for (var o = 0, i = s.length; r != null && o < i; )
      r = r[t(s[o++])];
    return o && o == i ? r : void 0;
  }
  return mc = n, mc;
}
var vc, xp;
function rWe() {
  if (xp) return vc;
  xp = 1;
  var e = nWe();
  function t(n, r, s) {
    var o = n == null ? void 0 : e(n, r);
    return o === void 0 ? s : o;
  }
  return vc = t, vc;
}
rWe();
function oWe(e) {
  const t = e.regex, n = {}, r = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [n]
      }
      // default values
    ]
  };
  Object.assign(n, {
    className: "variable",
    variants: [
      { begin: t.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      r
    ]
  });
  const s = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [e.BACKSLASH_ESCAPE]
  }, o = e.inherit(
    e.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: "comment"
      }
    }
  ), i = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      e.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, a = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      n,
      s
    ]
  };
  s.contains.push(a);
  const c = {
    match: /\\"/
  }, u = {
    className: "string",
    begin: /'/,
    end: /'/
  }, d = {
    match: /\\'/
  }, l = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      e.NUMBER_MODE,
      n
    ]
  }, m = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], f = e.SHEBANG({
    binary: `(${m.join("|")})`,
    relevance: 10
  }), v = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, g = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ], y = [
    "true",
    "false"
  ], h = { match: /(\/[a-z._-]+)+/ }, w = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ], k = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ], x = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ], A = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: [
      "sh",
      "zsh"
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: g,
      literal: y,
      built_in: [
        ...w,
        ...k,
        // Shell modifiers
        "set",
        "shopt",
        ...x,
        ...A
      ]
    },
    contains: [
      f,
      // to catch known shells and boost relevancy
      e.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      v,
      l,
      o,
      i,
      h,
      a,
      c,
      u,
      d,
      n
    ]
  };
}
function sWe(e) {
  const t = e.regex, n = new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*", "u"), r = [
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "case",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "match",
    "nonlocal|10",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield"
  ], a = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: r,
    built_in: [
      "__import__",
      "abs",
      "all",
      "any",
      "ascii",
      "bin",
      "bool",
      "breakpoint",
      "bytearray",
      "bytes",
      "callable",
      "chr",
      "classmethod",
      "compile",
      "complex",
      "delattr",
      "dict",
      "dir",
      "divmod",
      "enumerate",
      "eval",
      "exec",
      "filter",
      "float",
      "format",
      "frozenset",
      "getattr",
      "globals",
      "hasattr",
      "hash",
      "help",
      "hex",
      "id",
      "input",
      "int",
      "isinstance",
      "issubclass",
      "iter",
      "len",
      "list",
      "locals",
      "map",
      "max",
      "memoryview",
      "min",
      "next",
      "object",
      "oct",
      "open",
      "ord",
      "pow",
      "print",
      "property",
      "range",
      "repr",
      "reversed",
      "round",
      "set",
      "setattr",
      "slice",
      "sorted",
      "staticmethod",
      "str",
      "sum",
      "super",
      "tuple",
      "type",
      "vars",
      "zip"
    ],
    literal: [
      "__debug__",
      "Ellipsis",
      "False",
      "None",
      "NotImplemented",
      "True"
    ],
    type: [
      "Any",
      "Callable",
      "Coroutine",
      "Dict",
      "List",
      "Literal",
      "Generic",
      "Optional",
      "Sequence",
      "Set",
      "Tuple",
      "Type",
      "Union"
    ]
  }, c = {
    className: "meta",
    begin: /^(>>>|\.\.\.) /
  }, u = {
    className: "subst",
    begin: /\{/,
    end: /\}/,
    keywords: a,
    illegal: /#/
  }, d = {
    begin: /\{\{/,
    relevance: 0
  }, l = {
    className: "string",
    contains: [e.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c
        ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c
        ],
        relevance: 10
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c,
          d,
          u
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          e.BACKSLASH_ESCAPE,
          c,
          d,
          u
        ]
      },
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          e.BACKSLASH_ESCAPE,
          d,
          u
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          e.BACKSLASH_ESCAPE,
          d,
          u
        ]
      },
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  }, m = "[0-9](_?[0-9])*", f = `(\\b(${m}))?\\.(${m})|\\b(${m})\\.`, v = `\\b|${r.join("|")}`, g = {
    className: "number",
    relevance: 0,
    variants: [
      // exponentfloat, pointfloat
      // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
      // optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      // Note: no leading \b because floats can start with a decimal point
      // and we don't want to mishandle e.g. `fn(.5)`,
      // no trailing \b for pointfloat because it can end with a decimal point
      // and we don't want to mishandle e.g. `0..hex()`; this should be safe
      // because both MUST contain a decimal point and so cannot be confused with
      // the interior part of an identifier
      {
        begin: `(\\b(${m})|(${f}))[eE][+-]?(${m})[jJ]?(?=${v})`
      },
      {
        begin: `(${f})[jJ]?`
      },
      // decinteger, bininteger, octinteger, hexinteger
      // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
      // optionally "long" in Python 2
      // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
      // decinteger is optionally imaginary
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${v})`
      },
      {
        begin: `\\b0[bB](_?[01])+[lL]?(?=${v})`
      },
      {
        begin: `\\b0[oO](_?[0-7])+[lL]?(?=${v})`
      },
      {
        begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${v})`
      },
      // imagnumber (digitpart-based)
      // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
      {
        begin: `\\b(${m})[jJ](?=${v})`
      }
    ]
  }, y = {
    className: "comment",
    begin: t.lookahead(/# type:/),
    end: /$/,
    keywords: a,
    contains: [
      {
        // prevent keywords from coloring `type`
        begin: /# type:/
      },
      // comment within a datatype comment includes no keywords
      {
        begin: /#/,
        end: /\b\B/,
        endsWithParent: !0
      }
    ]
  }, h = {
    className: "params",
    variants: [
      // Exclude params in functions without params
      {
        className: "",
        begin: /\(\s*\)/,
        skip: !0
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: !0,
        excludeEnd: !0,
        keywords: a,
        contains: [
          "self",
          c,
          g,
          l,
          e.HASH_COMMENT_MODE
        ]
      }
    ]
  };
  return u.contains = [
    l,
    g,
    c
  ], {
    name: "Python",
    aliases: [
      "py",
      "gyp",
      "ipython"
    ],
    unicodeRegex: !0,
    keywords: a,
    illegal: /(<\/|\?)|=>/,
    contains: [
      c,
      g,
      {
        // very common convention
        scope: "variable.language",
        match: /\bself\b/
      },
      {
        // eat "if" prior to string so that it won't accidentally be
        // labeled as an f-string
        beginKeywords: "if",
        relevance: 0
      },
      { match: /\bor\b/, scope: "keyword" },
      l,
      y,
      e.HASH_COMMENT_MODE,
      {
        match: [
          /\bdef/,
          /\s+/,
          n
        ],
        scope: {
          1: "keyword",
          3: "title.function"
        },
        contains: [h]
      },
      {
        variants: [
          {
            match: [
              /\bclass/,
              /\s+/,
              n,
              /\s*/,
              /\(\s*/,
              n,
              /\s*\)/
            ]
          },
          {
            match: [
              /\bclass/,
              /\s+/,
              n
            ]
          }
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          6: "title.class.inherited"
        }
      },
      {
        className: "meta",
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [
          g,
          h,
          l
        ]
      }
    ]
  };
}
const os = "[A-Za-z$_][0-9A-Za-z$_]*", Zm = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], Wm = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], Gm = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], Km = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], Xm = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], Ym = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], Jm = [].concat(
  Xm,
  Gm,
  Km
);
function iWe(e) {
  const t = e.regex, n = (F, { after: G }) => {
    const T = "</" + F[0].slice(1);
    return F.input.indexOf(T, G) !== -1;
  }, r = os, s = {
    begin: "<>",
    end: "</>"
  }, o = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (F, G) => {
      const T = F[0].length + F.index, W = F.input[T];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        W === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        W === ","
      ) {
        G.ignoreMatch();
        return;
      }
      W === ">" && (n(F, { after: T }) || G.ignoreMatch());
      let U;
      const se = F.input.substring(T);
      if (U = se.match(/^\s*=/)) {
        G.ignoreMatch();
        return;
      }
      if ((U = se.match(/^\s+extends\s+/)) && U.index === 0) {
        G.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: os,
    keyword: Zm,
    literal: Wm,
    built_in: Jm,
    "variable.language": Ym
  }, c = "[0-9](_?[0-9])*", u = `\\.(${c})`, d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", l = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${d})((${u})|\\.)?|(${u}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${d})\\b((${u})\\b|\\.)?|(${u})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, m = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, f = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "xml"
    }
  }, v = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "css"
    }
  }, g = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        m
      ],
      subLanguage: "graphql"
    }
  }, y = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      m
    ]
  }, w = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: r + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, k = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    f,
    v,
    g,
    y,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    l
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  m.contains = k.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(k)
  });
  const x = [].concat(w, m.contains), A = x.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(x)
    }
  ]), S = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: A
  }, $ = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          r,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(r, "(", t.concat(/\./, r), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          r
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, M = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...Gm,
        ...Km
      ]
    }
  }, P = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, R = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          r,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [S],
    illegal: /%/
  }, B = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function j(F) {
    return t.concat("(?!", F.join("|"), ")");
  }
  const ie = {
    match: t.concat(
      /\b/,
      j([
        ...Xm,
        "super",
        "import"
      ].map((F) => `${F}\\s*\\(`)),
      r,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, z = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(r, /(?![0-9A-Za-z$_(])/)
    )),
    end: r,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, Q = {
    match: [
      /get|set/,
      /\s+/,
      r,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      S
    ]
  }, N = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", V = {
    match: [
      /const|var|let/,
      /\s+/,
      r,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(N)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      S
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: A, CLASS_REFERENCE: M },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      P,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      f,
      v,
      g,
      y,
      w,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      l,
      M,
      {
        scope: "attr",
        match: r + t.lookahead(":"),
        relevance: 0
      },
      V,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          w,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: N,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: a,
                    contains: A
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: s.begin, end: s.end },
              { match: o },
              {
                begin: i.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": i.isTrulyOpeningTag,
                end: i.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: i.begin,
                end: i.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      R,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          S,
          e.inherit(e.TITLE_MODE, { begin: r, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      z,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + r,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [S]
      },
      ie,
      B,
      $,
      Q,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function aWe(e) {
  const t = e.regex, n = iWe(e), r = os, s = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ], o = {
    begin: [
      /namespace/,
      /\s+/,
      e.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, i = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: s
    },
    contains: [n.exports.CLASS_REFERENCE]
  }, a = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, c = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ], u = {
    $pattern: os,
    keyword: Zm.concat(c),
    literal: Wm,
    built_in: Jm.concat(s),
    "variable.language": Ym
  }, d = {
    className: "meta",
    begin: "@" + r
  }, l = (g, y, h) => {
    const w = g.contains.findIndex((k) => k.label === y);
    if (w === -1)
      throw new Error("can not find mode to replace");
    g.contains.splice(w, 1, h);
  };
  Object.assign(n.keywords, u), n.exports.PARAMS_CONTAINS.push(d);
  const m = n.contains.find((g) => g.scope === "attr"), f = Object.assign(
    {},
    m,
    { match: t.concat(r, t.lookahead(/\s*\?:/)) }
  );
  n.exports.PARAMS_CONTAINS.push([
    n.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    m,
    // highlight the params key
    f
    // Added for optional property assignment highlighting
  ]), n.contains = n.contains.concat([
    d,
    o,
    i,
    f
    // Added for optional property assignment highlighting
  ]), l(n, "shebang", e.SHEBANG()), l(n, "use_strict", a);
  const v = n.contains.find((g) => g.label === "func.def");
  return v.relevance = 0, Object.assign(n, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), n;
}
const cWe = Z({
  name: "VueMarkdown",
  props: {
    source: {
      type: String,
      required: !0
    },
    options: {
      type: Object,
      required: !1
    },
    plugins: {
      type: Array,
      required: !1
    }
  },
  setup(e) {
    const t = D(new pm(e.options ?? {}));
    for (const r of e.plugins ?? [])
      t.value.use(r);
    const n = I(() => t.value.render(e.source));
    return () => Rt("div", { innerHTML: n.value });
  }
}), lWe = {
  key: 0,
  class: "chat-message-actions"
}, uWe = {
  key: 2,
  class: "chat-message-files"
}, Wc = /* @__PURE__ */ Z({
  __name: "Message",
  props: {
    message: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    hn.registerLanguage("javascript", Fp), hn.registerLanguage("typescript", aWe), hn.registerLanguage("python", sWe), hn.registerLanguage("xml", Hp), hn.registerLanguage("bash", oWe);
    const { message: r } = ss(n), { options: s } = co(), o = D(null), i = D({}), a = I(() => r.value.text || "&lt;Empty response&gt;"), c = I(() => ({
      "chat-message-from-user": r.value.sender === "user",
      "chat-message-from-bot": r.value.sender === "bot",
      "chat-message-transparent": r.value.transparent === !0
    })), u = (v) => {
      v.use(hm, {
        attrs: {
          target: "_blank",
          rel: "noopener"
        }
      });
    }, d = () => {
      var v;
      (v = o.value) != null && v.scrollIntoView && o.value.scrollIntoView({
        block: "start"
      });
    }, l = {
      highlight(v, g) {
        if (g && hn.getLanguage(g))
          try {
            return hn.highlight(v, { language: g }).value;
          } catch {
          }
        return "";
      }
    }, m = { ...(s == null ? void 0 : s.messageComponents) ?? {} };
    t({ scrollToView: d });
    const f = async (v) => await new Promise((g, y) => {
      const h = new FileReader();
      h.onload = () => g(h.result), h.onerror = y, h.readAsDataURL(v);
    });
    return je(async () => {
      if (r.value.files)
        for (const v of r.value.files)
          try {
            const g = await f(v);
            i.value[v.name] = g;
          } catch (g) {
            console.error("Error reading file:", g);
          }
    }), (v, g) => (b(), C("div", {
      ref_key: "messageContainer",
      ref: o,
      class: H(["chat-message", c.value])
    }, [
      v.$slots.beforeMessage ? (b(), C("div", lWe, [
        ae(v.$slots, "beforeMessage", Xr(Lp({ message: _(r) })))
      ])) : te("", !0),
      ae(v.$slots, "default", {}, () => [
        _(r).type === "component" && m[_(r).key] ? (b(), Y(ht(m[_(r).key]), Xr(We({ key: 0 }, _(r).arguments)), null, 16)) : (b(), Y(_(cWe), {
          key: 1,
          class: "chat-message-markdown",
          source: a.value,
          options: l,
          plugins: [u]
        }, null, 8, ["source", "plugins"])),
        (_(r).files ?? []).length > 0 ? (b(), C("div", uWe, [
          (b(!0), C(He, null, ot(_(r).files ?? [], (y) => (b(), C("div", {
            key: y.name,
            class: "chat-message-file"
          }, [
            he(jp, {
              file: y,
              "is-removable": !1,
              "is-previewable": !0
            }, null, 8, ["file"])
          ]))), 128))
        ])) : te("", !0)
      ])
    ], 2));
  }
}), dWe = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function fWe(e, t) {
  return b(), C("svg", dWe, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8"
    }, null, -1)
  ]));
}
const pWe = { name: "mdi-chat", render: fWe }, hWe = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function gWe(e, t) {
  return b(), C("svg", hWe, t[0] || (t[0] = [
    p("path", {
      fill: "currentColor",
      d: "M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"
    }, null, -1)
  ]));
}
const mWe = { name: "mdi-chevron-down", render: gWe }, vWe = { class: "chat-window-wrapper" }, _We = { class: "chat-window" }, bWe = /* @__PURE__ */ Z({
  __name: "ChatWindow",
  setup(e) {
    const t = D(!1);
    function n() {
      t.value = !t.value, t.value && Me(() => {
        _t.emit("scrollToBottom");
      });
    }
    return (r, s) => (b(), C("div", vWe, [
      he(er, { name: "chat-window-transition" }, {
        default: J(() => [
          rt(p("div", _We, [
            he(Qm)
          ], 512), [
            [Qt, t.value]
          ])
        ]),
        _: 1
      }),
      p("div", {
        class: "chat-window-toggle",
        onClick: n
      }, [
        he(er, {
          name: "chat-window-toggle-transition",
          mode: "out-in"
        }, {
          default: J(() => [
            t.value ? (b(), Y(_(mWe), {
              key: 1,
              height: "32",
              width: "32"
            })) : (b(), Y(_(pWe), {
              key: 0,
              height: "32",
              width: "32"
            }))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), yWe = /* @__PURE__ */ Z({
  __name: "MessageTyping",
  props: {
    animation: { default: "bouncing" }
  },
  setup(e) {
    const t = e, n = {
      id: "typing",
      text: "",
      sender: "bot"
    }, r = D(), s = I(() => ({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "chat-message-typing": !0,
      [`chat-message-typing-animation-${t.animation}`]: !0
    }));
    return je(() => {
      var o;
      (o = r.value) == null || o.scrollToView();
    }), (o, i) => (b(), Y(_(Wc), {
      ref_key: "messageContainer",
      ref: r,
      class: H(s.value),
      message: n,
      "data-test-id": "chat-message-typing"
    }, {
      default: J(() => i[0] || (i[0] = [
        p("div", { class: "chat-message-typing-body" }, [
          p("span", { class: "chat-message-typing-circle" }),
          p("span", { class: "chat-message-typing-circle" }),
          p("span", { class: "chat-message-typing-circle" })
        ], -1)
      ])),
      _: 1
    }, 8, ["class"]));
  }
}), wWe = {
  key: 0,
  class: "empty-container"
}, kWe = {
  class: "empty",
  "data-test-id": "chat-messages-empty"
}, xWe = {
  key: 1,
  class: "chat-messages-list"
}, CWe = /* @__PURE__ */ Z({
  __name: "MessagesList",
  props: {
    messages: {},
    emptyText: {}
  },
  setup(e) {
    const t = Yc(), n = D([]), { initialMessages: r, waitingForResponse: s } = t;
    return ue(
      () => n.value.length,
      () => {
        const o = n.value[n.value.length - 1];
        o && o.scrollToView();
      }
    ), (o, i) => o.emptyText && _(r).length === 0 && o.messages.length === 0 ? (b(), C("div", wWe, [
      p("div", kWe, [
        he(_(Sl), {
          icon: "message-circle",
          size: "large",
          class: "emptyIcon"
        }),
        he(_(nm), {
          tag: "p",
          size: "medium",
          color: "text-base"
        }, {
          default: J(() => [
            mr(ke(o.emptyText), 1)
          ]),
          _: 1
        })
      ])
    ])) : (b(), C("div", xWe, [
      (b(!0), C(He, null, ot(_(r), (a) => (b(), Y(Wc, {
        key: a.id,
        message: a
      }, null, 8, ["message"]))), 128)),
      (b(!0), C(He, null, ot(o.messages, (a) => (b(), Y(Wc, {
        key: a.id,
        ref_for: !0,
        ref_key: "messageComponents",
        ref: n,
        message: a
      }, {
        beforeMessage: J(({ message: c }) => [
          ae(o.$slots, "beforeMessage", We({ ref_for: !0 }, { message: c }))
        ]),
        _: 2
      }, 1032, ["message"]))), 128)),
      _(s) ? (b(), Y(yWe, { key: 0 })) : te("", !0)
    ]));
  }
}), SWe = { class: "chat-heading" }, EWe = ["title"], AWe = { key: 0 }, Qm = /* @__PURE__ */ Z({
  __name: "Chat",
  setup(e) {
    const { t } = as(), n = Yc(), { messages: r, currentSessionId: s } = n, { options: o } = co(), i = I(() => o.mode === "window" && o.showWindowCloseButton);
    async function a() {
      n.startNewSession && (n.startNewSession(), Me(() => {
        _t.emit("scrollToBottom");
      }));
    }
    async function c() {
      n.loadPreviousSession && (await n.loadPreviousSession(), Me(() => {
        _t.emit("scrollToBottom");
      }));
    }
    function u() {
      _t.emit("close");
    }
    return je(async () => {
      await c(), !o.showWelcomeScreen && !s.value && await a();
    }), (d, l) => (b(), Y(mb, { class: "chat-wrapper" }, {
      header: J(() => [
        p("div", SWe, [
          p("h1", null, ke(_(t)("title")), 1),
          i.value ? (b(), C("button", {
            key: 0,
            class: "chat-close-button",
            title: _(t)("closeButtonTooltip"),
            onClick: u
          }, [
            he(_(f_), {
              height: "18",
              width: "18"
            })
          ], 8, EWe)) : te("", !0)
        ]),
        _(t)("subtitle") ? (b(), C("p", AWe, ke(_(t)("subtitle")), 1)) : te("", !0)
      ]),
      footer: J(() => [
        _(s) ? (b(), Y(fb, { key: 0 })) : (b(), Y(S_, { key: 1 }))
      ]),
      default: J(() => [
        !_(s) && _(o).showWelcomeScreen ? (b(), Y(__, {
          key: 0,
          "onClick:button": a
        })) : (b(), Y(CWe, {
          key: 1,
          messages: _(r)
        }, null, 8, ["messages"]))
      ]),
      _: 1
    }));
  }
}), $We = /* @__PURE__ */ Z({
  __name: "App",
  props: {},
  setup(e) {
    const { options: t } = co(), n = I(() => t.mode === "fullscreen");
    return je(() => {
      hn.registerLanguage("xml", Hp), hn.registerLanguage("javascript", Fp);
    }), (r, s) => n.value ? (b(), Y(Qm, {
      key: 0,
      class: "n8n-chat"
    })) : (b(), Y(bWe, {
      key: 1,
      class: "n8n-chat"
    }));
  }
});
function TWe(e) {
  var s, o;
  const t = {
    ...Pr,
    ...e,
    webhookConfig: {
      ...Pr.webhookConfig,
      ...e == null ? void 0 : e.webhookConfig
    },
    i18n: {
      ...Pr.i18n,
      ...e == null ? void 0 : e.i18n,
      en: {
        ...(s = Pr.i18n) == null ? void 0 : s.en,
        ...(o = e == null ? void 0 : e.i18n) == null ? void 0 : o.en
      }
    },
    theme: {
      ...Pr.theme,
      ...e == null ? void 0 : e.theme
    }
  }, n = t.target ?? Iv;
  typeof n == "string" && Uv(n);
  const r = Mv($We);
  return r.use(r_, t), r.mount(n), r;
}
export {
  TWe as createChat
};
