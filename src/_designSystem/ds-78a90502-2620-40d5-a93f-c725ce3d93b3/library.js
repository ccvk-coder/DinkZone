import * as __mod_react from 'react';
import * as __mod_react_dom from 'react-dom';
import * as __mod_jsx from 'react/jsx-runtime';
import * as __mod_rrd from 'react-router-dom';
var require = (m) => {
  var __mods = {
    react: __mod_react,
    'react-dom': __mod_react_dom,
    'react/jsx-runtime': __mod_jsx,
    'react-router-dom': __mod_rrd
  };
  if (__mods[m]) return __mods[m];
  throw new Error('Cannot require ' + m);
};
var Ml = ((e) =>
  typeof require < 'u'
    ? require
    : typeof Proxy < 'u'
      ? new Proxy(e, { get: (t, a) => (typeof require < 'u' ? require : t)[a] })
      : e)(function (e) {
  if (typeof require < 'u') return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
import { useState as Dl } from 'react';
import { jsx as Et } from 'react/jsx-runtime';
var Rl = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-base' };
function Bl(e) {
  return e
    ? e
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((t) => t[0]?.toUpperCase() ?? '')
        .join('')
    : '';
}
function Fc({ src: e, name: t, size: a = 'md', className: o = '' }) {
  let [r, i] = Dl(!1),
    s = Bl(t),
    n = e && !r;
  return Et('span', {
    className: `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent font-medium text-accent-foreground ${Rl[a]} ${o}`,
    role: 'img',
    'aria-label': t || 'User avatar',
    'data-id': 'element-13',
    children: n
      ? Et('img', {
          src: e,
          alt: t || '',
          className: 'h-full w-full object-cover',
          onError: () => i(!0),
          'data-id': 'element-14'
        })
      : s
        ? Et('span', { 'data-id': 'element-15', children: s })
        : Et('svg', {
            viewBox: '0 0 24 24',
            className: 'h-3/5 w-3/5',
            fill: 'currentColor',
            'aria-hidden': 'true',
            'data-id': 'element-16',
            children: Et('path', {
              d: 'M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z',
              'data-id': 'element-17'
            })
          })
  });
}
import { jsx as Vl } from 'react/jsx-runtime';
var Fl = {
  neutral: 'bg-muted text-muted-foreground',
  primary: 'bg-accent text-accent-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive'
};
function Ec({ tone: e = 'neutral', className: t = '', children: a, ...o }) {
  return Vl('span', {
    className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${Fl[e]} ${t}`,
    ...o,
    'data-id': 'element-18',
    children: a
  });
}
import { Fragment as ql, jsx as Zr } from 'react/jsx-runtime';
var Ol = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-primary',
    secondary:
      'bg-muted text-foreground border border-border hover:bg-accent focus-visible:ring-primary',
    ghost: 'bg-transparent text-foreground hover:bg-muted focus-visible:ring-primary',
    destructive: 'bg-destructive text-white hover:opacity-90 focus-visible:ring-destructive'
  },
  El = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2'
  };
function Hc({ variant: e = 'primary', size: t = 'md', className: a = '', children: o, ...r }) {
  return Zr(ql, {
    children: Zr('button', {
      className: `inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${Ol[e]} ${El[t]} ${a}`,
      ...r,
      'data-id': 'element-19',
      children: o
    })
  });
}
import { Fragment as Qe, jsx as Q } from 'react/jsx-runtime';
function Wc({ className: e = '', children: t, ...a }) {
  return Q(Qe, {
    children: Q('div', {
      className: `rounded-lg border border-border bg-card text-card-foreground shadow-sm ${e}`,
      ...a,
      'data-id': 'element-20',
      children: t
    })
  });
}
function zc({ className: e = '', children: t, ...a }) {
  return Q(Qe, {
    children: Q('div', {
      className: `flex flex-col gap-1 border-b border-border px-6 py-4 ${e}`,
      ...a,
      'data-id': 'element-21',
      children: t
    })
  });
}
function Kc({ className: e = '', children: t, ...a }) {
  return Q(Qe, {
    children: Q('h3', {
      className: `font-serif text-lg font-bold text-foreground ${e}`,
      ...a,
      'data-id': 'element-22',
      children: t
    })
  });
}
function jc({ className: e = '', children: t, ...a }) {
  return Q(Qe, {
    children: Q('p', {
      className: `text-sm text-muted-foreground ${e}`,
      ...a,
      'data-id': 'element-23',
      children: t
    })
  });
}
function Xc({ className: e = '', children: t, ...a }) {
  return Q(Qe, {
    children: Q('div', { className: `px-6 py-4 ${e}`, ...a, 'data-id': 'element-24', children: t })
  });
}
function $c({ className: e = '', children: t, ...a }) {
  return Q(Qe, {
    children: Q('div', {
      className: `flex items-center gap-3 border-t border-border px-6 py-4 ${e}`,
      ...a,
      'data-id': 'element-25',
      children: t
    })
  });
}
import { useId as Jl } from 'react';
import { forwardRef as Nl, createElement as Gl } from 'react';
var Yr = (e) => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  Ul = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, a, o) => (o ? o.toUpperCase() : a.toLowerCase())),
  Ho = (e) => {
    let t = Ul(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  ca = (...e) =>
    e
      .filter((t, a, o) => !!t && t.trim() !== '' && o.indexOf(t) === a)
      .join(' ')
      .trim(),
  Qr = (e) => {
    for (let t in e) if (t.startsWith('aria-') || t === 'role' || t === 'title') return !0;
  };
import { forwardRef as Hl, createElement as es } from 'react';
var Jr = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};
var ts = Hl(
  (
    {
      color: e = 'currentColor',
      size: t = 24,
      strokeWidth: a = 2,
      absoluteStrokeWidth: o,
      className: r = '',
      children: i,
      iconNode: s,
      ...n
    },
    l
  ) =>
    es(
      'svg',
      {
        ref: l,
        ...Jr,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: o ? (Number(a) * 24) / Number(t) : a,
        className: ca('lucide', r),
        ...(!i && !Qr(n) && { 'aria-hidden': 'true' }),
        ...n
      },
      [...s.map(([u, d]) => es(u, d)), ...(Array.isArray(i) ? i : [i])]
    )
);
var F = (e, t) => {
  let a = Nl(({ className: o, ...r }, i) =>
    Gl(ts, { ref: i, iconNode: t, className: ca(`lucide-${Yr(Ho(e))}`, `lucide-${e}`, o), ...r })
  );
  return ((a.displayName = Ho(e)), a);
};
var Wl = [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]],
  qt = F('check', Wl);
var zl = [['path', { d: 'm6 9 6 6 6-6', key: 'qrunsl' }]],
  Oe = F('chevron-down', zl);
var Kl = [['path', { d: 'm18 15-6-6-6 6', key: '153udz' }]],
  Ut = F('chevron-up', Kl);
var jl = [
    ['path', { d: 'm7 15 5 5 5-5', key: '1hf1tw' }],
    ['path', { d: 'm7 9 5-5 5 5', key: 'sgt6xg' }]
  ],
  Ht = F('chevrons-up-down', jl);
var Xl = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
    ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }]
  ],
  ge = F('circle-alert', Xl);
var $l = [
    ['path', { d: 'M21.801 10A10 10 0 1 1 17 3.335', key: 'yps3ct' }],
    ['path', { d: 'm9 11 3 3L22 4', key: '1pflzl' }]
  ],
  Le = F('circle-check-big', $l);
var _l = [
    ['polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12', key: 'o97t9d' }],
    [
      'path',
      {
        d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
        key: 'oot6mr'
      }
    ]
  ],
  Nt = F('inbox', _l);
var Zl = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['path', { d: 'M12 16v-4', key: '1dtifu' }],
    ['path', { d: 'M12 8h.01', key: 'e9boi3' }]
  ],
  Gt = F('info', Zl);
var Yl = [
    [
      'path',
      {
        d: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
        key: '4pj2yx'
      }
    ],
    ['path', { d: 'M20 3v4', key: '1olli1' }],
    ['path', { d: 'M22 5h-4', key: '1gvqau' }],
    ['path', { d: 'M4 17v2', key: 'vumght' }],
    ['path', { d: 'M5 18H3', key: 'zchphs' }]
  ],
  Ie = F('sparkles', Yl);
var Ql = [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }]
  ],
  Ee = F('x', Ql);
import { jsx as No, jsxs as as } from 'react/jsx-runtime';
function Nm({ label: e, className: t = '', id: a, checked: o, disabled: r, ...i }) {
  let s = Jl(),
    n = a ?? s;
  return as('label', {
    htmlFor: n,
    className: `inline-flex items-center gap-2 text-sm text-foreground ${r ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${t}`,
    'data-id': 'element-26',
    children: [
      as('span', {
        className: 'relative inline-flex h-4 w-4 items-center justify-center',
        'data-id': 'element-27',
        children: [
          No('input', {
            id: n,
            type: 'checkbox',
            checked: o,
            disabled: r,
            className:
              'peer absolute inset-0 cursor-[inherit] appearance-none rounded border border-border bg-card checked:border-primary checked:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background',
            ...i,
            'data-id': 'element-28'
          }),
          No(qt, {
            size: 12,
            className: 'pointer-events-none hidden text-primary-foreground peer-checked:block',
            'data-id': 'element-29'
          })
        ]
      }),
      e && No('span', { 'data-id': 'element-30', children: e })
    ]
  });
}
import { jsx as Wt, jsxs as eu } from 'react/jsx-runtime';
function Km({ icon: e, title: t, description: a, action: o, className: r = '' }) {
  return eu('div', {
    className: `flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center ${r}`,
    'data-id': 'element-68',
    children: [
      Wt('span', {
        className:
          'mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground',
        'data-id': 'element-69',
        children: e ?? Wt(Nt, { size: 22, 'data-id': 'element-70' })
      }),
      Wt('h3', {
        className: 'font-serif text-lg font-bold text-foreground',
        'data-id': 'element-71',
        children: t
      }),
      a &&
        Wt('p', {
          className: 'mt-1 max-w-sm text-sm text-muted-foreground',
          'data-id': 'element-72',
          children: a
        }),
      o && Wt('div', { className: 'mt-6', 'data-id': 'element-73', children: o })
    ]
  });
}
import { Fragment as au, jsx as ma, jsxs as tu } from 'react/jsx-runtime';
function _m({ iconOnly: e = !1, size: t = 28, className: a = '' }) {
  return ma(au, {
    children: tu('span', {
      className: `inline-flex items-center gap-2 ${a}`,
      'data-id': 'element-74',
      children: [
        ma('span', {
          className:
            'inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground',
          style: { width: t, height: t },
          'aria-hidden': 'true',
          'data-id': 'element-75',
          children: ma(Ie, { size: t * 0.6, 'data-id': 'element-76' })
        }),
        !e &&
          ma('span', {
            className: 'font-serif font-bold tracking-tight text-foreground',
            style: { fontSize: t * 0.7 },
            'data-id': 'element-77',
            children: 'Relay'
          })
      ]
    })
  });
}
import { useEffect as ou } from 'react';
import { createPortal as ru } from 'react-dom';
import { jsx as qe, jsxs as pa } from 'react/jsx-runtime';
function ap({
  open: e,
  onClose: t,
  title: a,
  description: o,
  children: r,
  footer: i,
  className: s = ''
}) {
  return (
    ou(() => {
      if (!e) return;
      let n = (l) => {
        l.key === 'Escape' && t();
      };
      return (
        document.addEventListener('keydown', n),
        () => document.removeEventListener('keydown', n)
      );
    }, [e, t]),
    e
      ? ru(
          pa('div', {
            className: 'fixed inset-0 z-50 flex items-center justify-center p-4',
            'data-id': 'element-78',
            children: [
              qe('div', {
                className: 'absolute inset-0 bg-foreground/40',
                onClick: t,
                'aria-hidden': 'true',
                'data-id': 'element-79'
              }),
              pa('div', {
                role: 'dialog',
                'aria-modal': 'true',
                'aria-label': a,
                className: `relative z-10 w-full max-w-md rounded-lg border border-border bg-card text-card-foreground shadow-lg ${s}`,
                'data-id': 'element-80',
                children: [
                  pa('div', {
                    className: 'flex items-start justify-between gap-4 px-6 py-4',
                    'data-id': 'element-81',
                    children: [
                      pa('div', {
                        className: 'flex flex-col gap-1',
                        'data-id': 'element-82',
                        children: [
                          a &&
                            qe('h2', {
                              className: 'font-serif text-lg font-bold text-foreground',
                              'data-id': 'element-83',
                              children: a
                            }),
                          o &&
                            qe('p', {
                              className: 'text-sm text-muted-foreground',
                              'data-id': 'element-84',
                              children: o
                            })
                        ]
                      }),
                      qe('button', {
                        type: 'button',
                        onClick: t,
                        'aria-label': 'Close',
                        className:
                          'rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        'data-id': 'element-85',
                        children: qe(Ee, { size: 18, 'data-id': 'element-86' })
                      })
                    ]
                  }),
                  r &&
                    qe('div', {
                      className: 'px-6 pb-4 text-sm',
                      'data-id': 'element-87',
                      children: r
                    }),
                  i &&
                    qe('div', {
                      className:
                        'flex items-center justify-end gap-3 border-t border-border px-6 py-4',
                      'data-id': 'element-88',
                      children: i
                    })
                ]
              })
            ]
          }),
          document.body
        )
      : null
  );
}
import { createContext as su, useContext as iu, useId as rs } from 'react';
import { jsx as zt, jsxs as os } from 'react/jsx-runtime';
var ss = su(null);
function np({ name: e, value: t, onChange: a, disabled: o, className: r = '', children: i }) {
  let s = rs();
  return zt(ss.Provider, {
    value: { name: e ?? s, value: t, onChange: a, disabled: o },
    'data-id': 'element-89',
    children: zt('div', {
      role: 'radiogroup',
      className: `flex flex-col gap-2 ${r}`,
      'data-id': 'element-90',
      children: i
    })
  });
}
function lp({ value: e, label: t, disabled: a, className: o = '' }) {
  let r = iu(ss),
    i = rs();
  if (!r) throw new Error('Radio must be used within a RadioGroup');
  let s = a || r.disabled,
    n = r.value === e;
  return os('label', {
    htmlFor: i,
    className: `inline-flex items-center gap-2 text-sm text-foreground ${s ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${o}`,
    'data-id': 'element-91',
    children: [
      os('span', {
        className: 'relative inline-flex h-4 w-4 items-center justify-center',
        'data-id': 'element-92',
        children: [
          zt('input', {
            id: i,
            type: 'radio',
            name: r.name,
            value: e,
            checked: n,
            disabled: s,
            onChange: () => r.onChange?.(e),
            className:
              'peer h-4 w-4 cursor-[inherit] appearance-none rounded-full border border-border bg-card checked:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background',
            'data-id': 'element-93'
          }),
          zt('span', {
            className:
              'pointer-events-none absolute hidden h-2 w-2 rounded-full bg-primary peer-checked:block',
            'data-id': 'element-94'
          })
        ]
      }),
      t && zt('span', { 'data-id': 'element-95', children: t })
    ]
  });
}
import { useId as nu } from 'react';
import { jsx as Kt, jsxs as Go } from 'react/jsx-runtime';
function pp({ label: e, error: t, options: a, placeholder: o, className: r = '', id: i, ...s }) {
  let n = nu(),
    l = i ?? n;
  return Go('div', {
    className: `flex flex-col gap-1.5 ${r}`,
    'data-id': 'element-96',
    children: [
      e &&
        Kt('label', {
          htmlFor: l,
          className: 'text-sm font-medium text-foreground',
          'data-id': 'element-97',
          children: e
        }),
      Go('div', {
        className: 'relative',
        'data-id': 'element-98',
        children: [
          Go('select', {
            id: l,
            'aria-invalid': !!t,
            className: `h-10 w-full appearance-none rounded-md border bg-card px-3 pr-9 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${t ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-primary'}`,
            ...s,
            'data-id': 'element-99',
            children: [
              o && Kt('option', { value: '', disabled: !0, 'data-id': 'element-100', children: o }),
              a.map((u) =>
                Kt(
                  'option',
                  { value: u.value, 'data-id': 'element-101', children: u.label },
                  u.value
                )
              )
            ]
          }),
          Kt(Oe, {
            size: 16,
            className:
              'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground',
            'data-id': 'element-102'
          })
        ]
      }),
      t &&
        Kt('span', { className: 'text-xs text-destructive', 'data-id': 'element-103', children: t })
    ]
  });
}
import { useId as lu } from 'react';
import { jsx as Wo, jsxs as uu } from 'react/jsx-runtime';
function Ip({ checked: e = !1, onChange: t, label: a, disabled: o, id: r, className: i = '' }) {
  let s = lu(),
    n = r ?? s;
  return uu('label', {
    htmlFor: n,
    className: `inline-flex items-center gap-2 text-sm text-foreground ${o ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${i}`,
    'data-id': 'element-104',
    children: [
      Wo('button', {
        id: n,
        type: 'button',
        role: 'switch',
        'aria-checked': e,
        disabled: o,
        onClick: () => t?.(!e),
        className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed ${e ? 'bg-primary' : 'bg-muted border border-border'}`,
        'data-id': 'element-105',
        children: Wo('span', {
          className: `inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${e ? 'translate-x-4' : 'translate-x-0.5'}`,
          'data-id': 'element-106'
        })
      }),
      a && Wo('span', { 'data-id': 'element-107', children: a })
    ]
  });
}
import { useMemo as du, useState as is } from 'react';
import { jsx as ee, jsxs as ns } from 'react/jsx-runtime';
function wp({ columns: e, data: t, rowKey: a, className: o = '' }) {
  let [r, i] = is(null),
    [s, n] = is('asc'),
    l = du(() => {
      if (!r) return t;
      let d = e.find((c) => c.key === r);
      if (!d?.sortValue) return t;
      let f = d.sortValue;
      return [...t].sort((c, m) => {
        let p = f(c),
          h = f(m);
        return p < h ? (s === 'asc' ? -1 : 1) : p > h ? (s === 'asc' ? 1 : -1) : 0;
      });
    }, [t, e, r, s]),
    u = (d) => {
      r === d ? n((f) => (f === 'asc' ? 'desc' : 'asc')) : (i(d), n('asc'));
    };
  return ee('div', {
    className: `overflow-hidden rounded-lg border border-border ${o}`,
    'data-id': 'element-108',
    children: ns('table', {
      className: 'w-full border-collapse text-sm',
      'data-id': 'element-109',
      children: [
        ee('thead', {
          'data-id': 'element-110',
          children: ee('tr', {
            className: 'border-b border-border bg-muted/50',
            'data-id': 'element-111',
            children: e.map((d) => {
              let f = !!d.sortValue,
                c = r === d.key;
              return ee(
                'th',
                {
                  scope: 'col',
                  className: `px-4 py-3 text-left font-medium text-muted-foreground ${d.className ?? ''}`,
                  'aria-sort': c ? (s === 'asc' ? 'ascending' : 'descending') : void 0,
                  'data-id': 'element-112',
                  children: f
                    ? ns('button', {
                        type: 'button',
                        onClick: () => u(d.key),
                        className:
                          'inline-flex items-center gap-1 transition-colors hover:text-foreground',
                        'data-id': 'element-113',
                        children: [
                          d.header,
                          c
                            ? s === 'asc'
                              ? ee(Ut, { size: 14, 'data-id': 'element-114' })
                              : ee(Oe, { size: 14, 'data-id': 'element-115' })
                            : ee(Ht, {
                                size: 14,
                                className: 'opacity-50',
                                'data-id': 'element-116'
                              })
                        ]
                      })
                    : d.header
                },
                d.key
              );
            })
          })
        }),
        ee('tbody', {
          'data-id': 'element-117',
          children: l.map((d) =>
            ee(
              'tr',
              {
                className: 'border-b border-border last:border-0 hover:bg-muted/30',
                'data-id': 'element-118',
                children: e.map((f) =>
                  ee(
                    'td',
                    {
                      className: `px-4 py-3 text-foreground ${f.className ?? ''}`,
                      'data-id': 'element-119',
                      children: f.render ? f.render(d) : d[f.key]
                    },
                    f.key
                  )
                )
              },
              a(d)
            )
          )
        })
      ]
    })
  });
}
import { createContext as fu, useContext as ls, useId as cu } from 'react';
import { Fragment as Ko, jsx as Ce } from 'react/jsx-runtime';
var zo = fu(null);
function Mp({ value: e, onChange: t, className: a = '', children: o }) {
  let r = cu();
  return Ce(zo.Provider, {
    value: { value: e, onChange: t, baseId: r },
    'data-id': 'element-120',
    children: Ce('div', { className: a, 'data-id': 'element-121', children: o })
  });
}
function Dp({ className: e = '', children: t }) {
  return Ce(Ko, {
    children: Ce('div', {
      role: 'tablist',
      className: `flex items-center gap-1 border-b border-border ${e}`,
      'data-id': 'element-122',
      children: t
    })
  });
}
function Rp({ value: e, className: t = '', children: a }) {
  let o = ls(zo);
  if (!o) throw new Error('Tab must be used within Tabs');
  let r = o.value === e;
  return Ce(Ko, {
    children: Ce('button', {
      type: 'button',
      role: 'tab',
      id: `${o.baseId}-tab-${e}`,
      'aria-selected': r,
      'aria-controls': `${o.baseId}-panel-${e}`,
      onClick: () => o.onChange(e),
      className: `-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${r ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'} ${t}`,
      'data-id': 'element-123',
      children: a
    })
  });
}
function Bp({ value: e, className: t = '', children: a }) {
  let o = ls(zo);
  if (!o) throw new Error('TabPanel must be used within Tabs');
  return o.value !== e
    ? null
    : Ce(Ko, {
        children: Ce('div', {
          role: 'tabpanel',
          id: `${o.baseId}-panel-${e}`,
          'aria-labelledby': `${o.baseId}-tab-${e}`,
          className: `pt-4 ${t}`,
          'data-id': 'element-124',
          children: a
        })
      });
}
import { useId as mu } from 'react';
import { Fragment as hu, jsx as ha, jsxs as pu } from 'react/jsx-runtime';
function qp({ label: e, error: t, className: a = '', id: o, rows: r = 4, ...i }) {
  let s = mu(),
    n = o ?? s;
  return ha(hu, {
    children: pu('div', {
      className: `flex flex-col gap-1.5 ${a}`,
      'data-id': 'element-125',
      children: [
        e &&
          ha('label', {
            htmlFor: n,
            className: 'text-sm font-medium text-foreground',
            'data-id': 'element-126',
            children: e
          }),
        ha('textarea', {
          id: n,
          rows: r,
          'aria-invalid': !!t,
          className: `w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${t ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-primary'}`,
          ...i,
          'data-id': 'element-127'
        }),
        t &&
          ha('span', {
            className: 'text-xs text-destructive',
            'data-id': 'element-128',
            children: t
          })
      ]
    })
  });
}
import { useId as xu } from 'react';
import { Fragment as Lu, jsx as xa, jsxs as gu } from 'react/jsx-runtime';
function Wp({ label: e, error: t, className: a = '', id: o, disabled: r, ...i }) {
  let s = xu(),
    n = o ?? s;
  return xa(Lu, {
    children: gu('div', {
      className: `flex flex-col gap-1.5 ${a}`,
      'data-id': 'element-129',
      children: [
        e &&
          xa('label', {
            htmlFor: n,
            className: 'text-sm font-medium text-foreground',
            'data-id': 'element-130',
            children: e
          }),
        xa('input', {
          id: n,
          disabled: r,
          'aria-invalid': !!t,
          className: `h-10 w-full rounded-md border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${t ? 'border-destructive focus-visible:ring-destructive' : 'border-border focus-visible:ring-primary'}`,
          ...i,
          'data-id': 'element-131'
        }),
        t &&
          xa('span', {
            className: 'text-xs text-destructive',
            'data-id': 'element-132',
            children: t
          })
      ]
    })
  });
}
import { useCallback as bl, useState as Sc, createContext as yc, useContext as vc } from 'react';
import { createPortal as Pc } from 'react-dom';
import { jsx as hs, Fragment as qu } from 'react/jsx-runtime';
import { useMemo as Uu, useRef as xs, useState as gs, useContext as Hu } from 'react';
import { createContext as Iu } from 'react';
var Je = Iu({});
import { useRef as Cu } from 'react';
function et(e) {
  let t = Cu(null);
  return (t.current === null && (t.current = e()), t.current);
}
import { jsx as fs } from 'react/jsx-runtime';
import * as ms from 'react';
import { useId as Tu, useCallback as Au, useMemo as cs } from 'react';
import { createContext as Su } from 'react';
var Se = Su(null);
import { jsx as vu } from 'react/jsx-runtime';
import * as ga from 'react';
import { useId as Pu, useRef as us, useContext as wu, useInsertionEffect as bu } from 'react';
import { createContext as yu } from 'react';
var tt = yu({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: 'never' });
var jo = class extends ga.Component {
  getSnapshotBeforeUpdate(t) {
    let a = this.props.childRef.current;
    if (a && t.isPresent && !this.props.isPresent) {
      let o = this.props.sizeRef.current;
      ((o.height = a.offsetHeight || 0),
        (o.width = a.offsetWidth || 0),
        (o.top = a.offsetTop),
        (o.left = a.offsetLeft));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
};
function ds({ children: e, isPresent: t }) {
  let a = Pu(),
    o = us(null),
    r = us({ width: 0, height: 0, top: 0, left: 0 }),
    { nonce: i } = wu(tt);
  return (
    bu(() => {
      let { width: s, height: n, top: l, left: u } = r.current;
      if (t || !o.current || !s || !n) return;
      o.current.dataset.motionPopId = a;
      let d = document.createElement('style');
      return (
        i && (d.nonce = i),
        document.head.appendChild(d),
        d.sheet &&
          d.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${s}px !important;
            height: ${n}px !important;
            top: ${l}px !important;
            left: ${u}px !important;
          }
        `),
        () => {
          document.head.removeChild(d);
        }
      );
    }, [t]),
    vu(jo, { isPresent: t, childRef: o, sizeRef: r, children: ga.cloneElement(e, { ref: o }) })
  );
}
var ps = ({
  children: e,
  initial: t,
  isPresent: a,
  onExitComplete: o,
  custom: r,
  presenceAffectsLayout: i,
  mode: s
}) => {
  let n = et(ku),
    l = Tu(),
    u = Au(
      (f) => {
        n.set(f, !0);
        for (let c of n.values()) if (!c) return;
        o && o();
      },
      [n, o]
    ),
    d = cs(
      () => ({
        id: l,
        initial: t,
        isPresent: a,
        custom: r,
        onExitComplete: u,
        register: (f) => (n.set(f, !1), () => n.delete(f))
      }),
      i ? [Math.random(), u] : [a, u]
    );
  return (
    cs(() => {
      n.forEach((f, c) => n.set(c, !1));
    }, [a]),
    ms.useEffect(() => {
      !a && !n.size && o && o();
    }, [a]),
    s === 'popLayout' && (e = fs(ds, { isPresent: a, children: e })),
    fs(Se.Provider, { value: d, children: e })
  );
};
function ku() {
  return new Map();
}
import { useContext as Mu, useId as Du, useEffect as Ru, useCallback as Bu } from 'react';
function La(e = !0) {
  let t = Mu(Se);
  if (t === null) return [!0, null];
  let { isPresent: a, onExitComplete: o, register: r } = t,
    i = Du();
  Ru(() => {
    e && r(i);
  }, [e]);
  let s = Bu(() => e && o && o(i), [i, o, e]);
  return !a && o ? [!1, s] : [!0];
}
import { Children as Fu, isValidElement as Vu } from 'react';
var jt = (e) => e.key || '';
function Xo(e) {
  let t = [];
  return (
    Fu.forEach(e, (a) => {
      Vu(a) && t.push(a);
    }),
    t
  );
}
import { useLayoutEffect as Ou, useEffect as Eu } from 'react';
var at = typeof window < 'u';
var Ia = at ? Ou : Eu;
var $o = ({
  children: e,
  custom: t,
  initial: a = !0,
  onExitComplete: o,
  presenceAffectsLayout: r = !0,
  mode: i = 'sync',
  propagate: s = !1
}) => {
  let [n, l] = La(s),
    u = Uu(() => Xo(e), [e]),
    d = s && !n ? [] : u.map(jt),
    f = xs(!0),
    c = xs(u),
    m = et(() => new Map()),
    [p, h] = gs(u),
    [g, x] = gs(u);
  Ia(() => {
    ((f.current = !1), (c.current = u));
    for (let P = 0; P < g.length; P++) {
      let L = jt(g[P]);
      d.includes(L) ? m.delete(L) : m.get(L) !== !0 && m.set(L, !1);
    }
  }, [g, d.length, d.join('-')]);
  let C = [];
  if (u !== p) {
    let P = [...u];
    for (let L = 0; L < g.length; L++) {
      let b = g[L],
        D = jt(b);
      d.includes(D) || (P.splice(L, 0, b), C.push(b));
    }
    (i === 'wait' && C.length && (P = C), x(Xo(P)), h(u));
    return;
  }
  let { forceRender: S } = Hu(Je);
  return hs(qu, {
    children: g.map((P) => {
      let L = jt(P),
        b = s && !n ? !1 : u === g || d.includes(L),
        D = () => {
          if (m.has(L)) m.set(L, !0);
          else return;
          let y = !0;
          (m.forEach((H) => {
            H || (y = !1);
          }),
            y && (S?.(), x(c.current), s && l?.(), o && o()));
        };
      return hs(
        ps,
        {
          isPresent: b,
          initial: !f.current || a ? void 0 : !1,
          custom: b ? void 0 : t,
          presenceAffectsLayout: r,
          mode: i,
          onExitComplete: b ? void 0 : D,
          children: P
        },
        L
      );
    })
  });
};
var T = (e) => e;
var le = T,
  J = T;
function Ue(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
var X = (e, t, a) => {
  let o = t - e;
  return o === 0 ? 1 : (a - e) / o;
};
var R = (e) => e * 1e3,
  E = (e) => e / 1e3;
var ot = { skipAnimations: !1, useManualTiming: !1 };
function Ls(e) {
  let t = new Set(),
    a = new Set(),
    o = !1,
    r = !1,
    i = new WeakSet(),
    s = { delta: 0, timestamp: 0, isProcessing: !1 };
  function n(u) {
    (i.has(u) && (l.schedule(u), e()), u(s));
  }
  let l = {
    schedule: (u, d = !1, f = !1) => {
      let m = f && o ? t : a;
      return (d && i.add(u), m.has(u) || m.add(u), u);
    },
    cancel: (u) => {
      (a.delete(u), i.delete(u));
    },
    process: (u) => {
      if (((s = u), o)) {
        r = !0;
        return;
      }
      ((o = !0),
        ([t, a] = [a, t]),
        t.forEach(n),
        t.clear(),
        (o = !1),
        r && ((r = !1), l.process(u)));
    }
  };
  return l;
}
var Ca = ['read', 'resolveKeyframes', 'update', 'preRender', 'render', 'postRender'],
  Nu = 40;
function Sa(e, t) {
  let a = !1,
    o = !0,
    r = { delta: 0, timestamp: 0, isProcessing: !1 },
    i = () => (a = !0),
    s = Ca.reduce((x, C) => ((x[C] = Ls(i)), x), {}),
    { read: n, resolveKeyframes: l, update: u, preRender: d, render: f, postRender: c } = s,
    m = () => {
      let x = ot.useManualTiming ? r.timestamp : performance.now();
      ((a = !1),
        (r.delta = o ? 1e3 / 60 : Math.max(Math.min(x - r.timestamp, Nu), 1)),
        (r.timestamp = x),
        (r.isProcessing = !0),
        n.process(r),
        l.process(r),
        u.process(r),
        d.process(r),
        f.process(r),
        c.process(r),
        (r.isProcessing = !1),
        a && t && ((o = !1), e(m)));
    },
    p = () => {
      ((a = !0), (o = !0), r.isProcessing || e(m));
    };
  return {
    schedule: Ca.reduce((x, C) => {
      let S = s[C];
      return ((x[C] = (P, L = !1, b = !1) => (a || p(), S.schedule(P, L, b))), x);
    }, {}),
    cancel: (x) => {
      for (let C = 0; C < Ca.length; C++) s[Ca[C]].cancel(x);
    },
    state: r,
    steps: s
  };
}
var {
  schedule: v,
  cancel: $,
  state: B,
  steps: ya
} = Sa(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : T, !0);
import { createContext as Gu } from 'react';
var va = Gu({ strict: !1 });
var Is = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag'
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId']
  },
  ue = {};
for (let e in Is) ue[e] = { isEnabled: (t) => Is[e].some((a) => !!t[a]) };
function Cs(e) {
  for (let t in e) ue[t] = { ...ue[t], ...e[t] };
}
var Wu = new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'ignoreStrict',
  'viewport'
]);
function Xt(e) {
  return (
    e.startsWith('while') ||
    (e.startsWith('drag') && e !== 'draggable') ||
    e.startsWith('layout') ||
    e.startsWith('onTap') ||
    e.startsWith('onPan') ||
    e.startsWith('onLayout') ||
    Wu.has(e)
  );
}
var Ss = (e) => !Xt(e);
function zu(e) {
  e && (Ss = (t) => (t.startsWith('on') ? !Xt(t) : e(t)));
}
try {
  zu(Ml('@emotion/is-prop-valid').default);
} catch {}
function ys(e, t, a) {
  let o = {};
  for (let r in e)
    (r === 'values' && typeof e.values == 'object') ||
      ((Ss(r) ||
        (a === !0 && Xt(r)) ||
        (!t && !Xt(r)) ||
        (e.draggable && r.startsWith('onDrag'))) &&
        (o[r] = e[r]));
  return o;
}
function vs(e) {
  if (typeof Proxy > 'u') return e;
  let t = new Map(),
    a = (...o) => e(...o);
  return new Proxy(a, {
    get: (o, r) => (r === 'create' ? e : (t.has(r) || t.set(r, e(r)), t.get(r)))
  });
}
import { jsxs as ed, jsx as td } from 'react/jsx-runtime';
import { forwardRef as ad, useContext as Zo } from 'react';
import { createContext as Ku } from 'react';
var ye = Ku({});
import { useContext as ju, useMemo as Xu } from 'react';
function de(e) {
  return typeof e == 'string' || Array.isArray(e);
}
function ve(e) {
  return e !== null && typeof e == 'object' && typeof e.start == 'function';
}
var Pa = ['animate', 'whileInView', 'whileFocus', 'whileHover', 'whileTap', 'whileDrag', 'exit'],
  $t = ['initial', ...Pa];
function He(e) {
  return ve(e.animate) || $t.some((t) => de(e[t]));
}
function wa(e) {
  return !!(He(e) || e.variants);
}
function Ps(e, t) {
  if (He(e)) {
    let { initial: a, animate: o } = e;
    return { initial: a === !1 || de(a) ? a : void 0, animate: de(o) ? o : void 0 };
  }
  return e.inherit !== !1 ? t : {};
}
function bs(e) {
  let { initial: t, animate: a } = Ps(e, ju(ye));
  return Xu(() => ({ initial: t, animate: a }), [ws(t), ws(a)]);
}
function ws(e) {
  return Array.isArray(e) ? e.join(' ') : e;
}
var Ts = Symbol.for('motionComponentSymbol');
import { useCallback as $u } from 'react';
function fe(e) {
  return e && typeof e == 'object' && Object.prototype.hasOwnProperty.call(e, 'current');
}
function As(e, t, a) {
  return $u(
    (o) => {
      (o && e.onMount && e.onMount(o),
        t && (o ? t.mount(o) : t.unmount()),
        a && (typeof a == 'function' ? a(o) : fe(a) && (a.current = o)));
    },
    [t]
  );
}
import { useContext as _t, useRef as _o, useInsertionEffect as Yu, useEffect as Qu } from 'react';
var rt = (e) => e.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase();
var _u = 'framerAppearId',
  ba = 'data-' + rt(_u);
var { schedule: st, cancel: Ax } = Sa(queueMicrotask, !1);
import { createContext as Zu } from 'react';
var Ta = Zu({});
function ks(e, t, a, o, r) {
  var i, s;
  let { visualElement: n } = _t(ye),
    l = _t(va),
    u = _t(Se),
    d = _t(tt).reducedMotion,
    f = _o(null);
  ((o = o || l.renderer),
    !f.current &&
      o &&
      (f.current = o(e, {
        visualState: t,
        parent: n,
        props: a,
        presenceContext: u,
        blockInitialAnimation: u ? u.initial === !1 : !1,
        reducedMotionConfig: d
      })));
  let c = f.current,
    m = _t(Ta);
  c && !c.projection && r && (c.type === 'html' || c.type === 'svg') && Ju(f.current, a, r, m);
  let p = _o(!1);
  Yu(() => {
    c && p.current && c.update(a, u);
  });
  let h = a[ba],
    g = _o(
      !!h &&
        !(!((i = window.MotionHandoffIsComplete) === null || i === void 0) && i.call(window, h)) &&
        ((s = window.MotionHasOptimisedAnimation) === null || s === void 0
          ? void 0
          : s.call(window, h))
    );
  return (
    Ia(() => {
      c &&
        ((p.current = !0),
        (window.MotionIsMounted = !0),
        c.updateFeatures(),
        st.render(c.render),
        g.current && c.animationState && c.animationState.animateChanges());
    }),
    Qu(() => {
      c &&
        (!g.current && c.animationState && c.animationState.animateChanges(),
        g.current &&
          (queueMicrotask(() => {
            var x;
            (x = window.MotionHandoffMarkAsComplete) === null || x === void 0 || x.call(window, h);
          }),
          (g.current = !1)));
    }),
    c
  );
}
function Ju(e, t, a, o) {
  let { layoutId: r, layout: i, drag: s, dragConstraints: n, layoutScroll: l, layoutRoot: u } = t;
  ((e.projection = new a(e.latestValues, t['data-framer-portal-id'] ? void 0 : Ms(e.parent))),
    e.projection.setOptions({
      layoutId: r,
      layout: i,
      alwaysMeasureLayout: !!s || (n && fe(n)),
      visualElement: e,
      animationType: typeof i == 'string' ? i : 'both',
      initialPromotionConfig: o,
      layoutScroll: l,
      layoutRoot: u
    }));
}
function Ms(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : Ms(e.parent);
}
function Ds({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: a,
  useVisualState: o,
  Component: r
}) {
  var i, s;
  e && Cs(e);
  function n(u, d) {
    let f,
      c = { ...Zo(tt), ...u, layoutId: od(u) },
      { isStatic: m } = c,
      p = bs(u),
      h = o(u, m);
    if (!m && at) {
      rd(c, e);
      let g = sd(c);
      ((f = g.MeasureLayout), (p.visualElement = ks(r, h, c, t, g.ProjectionNode)));
    }
    return ed(ye.Provider, {
      value: p,
      children: [
        f && p.visualElement ? td(f, { visualElement: p.visualElement, ...c }) : null,
        a(r, u, As(h, p.visualElement, d), h, m, p.visualElement)
      ]
    });
  }
  n.displayName = `motion.${typeof r == 'string' ? r : `create(${(s = (i = r.displayName) !== null && i !== void 0 ? i : r.name) !== null && s !== void 0 ? s : ''})`}`;
  let l = ad(n);
  return ((l[Ts] = r), l);
}
function od({ layoutId: e }) {
  let t = Zo(Je).id;
  return t && e !== void 0 ? t + '-' + e : e;
}
function rd(e, t) {
  let a = Zo(va).strict;
}
function sd(e) {
  let { drag: t, layout: a } = ue;
  if (!t && !a) return {};
  let o = { ...t, ...a };
  return {
    MeasureLayout: t?.isEnabled(e) || a?.isEnabled(e) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
var Rs = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view'
];
function it(e) {
  return typeof e != 'string' || e.includes('-') ? !1 : !!(Rs.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
import { useContext as Os } from 'react';
function Bs(e) {
  let t = [{}, {}];
  return (
    e?.values.forEach((a, o) => {
      ((t[0][o] = a.get()), (t[1][o] = a.getVelocity()));
    }),
    t
  );
}
function nt(e, t, a, o) {
  if (typeof t == 'function') {
    let [r, i] = Bs(o);
    t = t(a !== void 0 ? a : e.custom, r, i);
  }
  if ((typeof t == 'string' && (t = e.variants && e.variants[t]), typeof t == 'function')) {
    let [r, i] = Bs(o);
    t = t(a !== void 0 ? a : e.custom, r, i);
  }
  return t;
}
var Zt = (e) => Array.isArray(e);
var Fs = (e) => !!(e && typeof e == 'object' && e.mix && e.toValue),
  Vs = (e) => (Zt(e) ? e[e.length - 1] || 0 : e);
var A = (e) => !!(e && e.getVelocity);
function lt(e) {
  let t = A(e) ? e.get() : e;
  return Fs(t) ? t.toValue() : t;
}
function id({ scrapeMotionValuesFromProps: e, createRenderState: t, onUpdate: a }, o, r, i) {
  let s = { latestValues: nd(o, r, i, e), renderState: t() };
  return (
    a && ((s.onMount = (n) => a({ props: o, current: n, ...s })), (s.onUpdate = (n) => a(n))),
    s
  );
}
var Aa = (e) => (t, a) => {
  let o = Os(ye),
    r = Os(Se),
    i = () => id(e, t, o, r);
  return a ? i() : et(i);
};
function nd(e, t, a, o) {
  let r = {},
    i = o(e, {});
  for (let c in i) r[c] = lt(i[c]);
  let { initial: s, animate: n } = e,
    l = He(e),
    u = wa(e);
  t &&
    u &&
    !l &&
    e.inherit !== !1 &&
    (s === void 0 && (s = t.initial), n === void 0 && (n = t.animate));
  let d = a ? a.initial === !1 : !1;
  d = d || s === !1;
  let f = d ? n : s;
  if (f && typeof f != 'boolean' && !ve(f)) {
    let c = Array.isArray(f) ? f : [f];
    for (let m = 0; m < c.length; m++) {
      let p = nt(e, c[m]);
      if (p) {
        let { transitionEnd: h, transition: g, ...x } = p;
        for (let C in x) {
          let S = x[C];
          if (Array.isArray(S)) {
            let P = d ? S.length - 1 : 0;
            S = S[P];
          }
          S !== null && (r[C] = S);
        }
        for (let C in h) r[C] = h[C];
      }
    }
  }
  return r;
}
var te = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY'
  ],
  K = new Set(te);
var Es = (e) => (t) => typeof t == 'string' && t.startsWith(e),
  ka = Es('--'),
  ld = Es('var(--'),
  ut = (e) => (ld(e) ? ud.test(e.split('/*')[0].trim()) : !1),
  ud = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
var Ma = (e, t) => (t && typeof e == 'number' ? t.transform(e) : e);
var q = (e, t, a) => (a > t ? t : a < e ? e : a);
var ae = { test: (e) => typeof e == 'number', parse: parseFloat, transform: (e) => e },
  ce = { ...ae, transform: (e) => q(0, 1, e) },
  Yt = { ...ae, default: 1 };
var Qt = (e) => ({
    test: (t) => typeof t == 'string' && t.endsWith(e) && t.split(' ').length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`
  }),
  oe = Qt('deg'),
  W = Qt('%'),
  I = Qt('px'),
  qs = Qt('vh'),
  Us = Qt('vw'),
  Yo = { ...W, parse: (e) => W.parse(e) / 100, transform: (e) => W.transform(e * 100) };
var Hs = {
  borderWidth: I,
  borderTopWidth: I,
  borderRightWidth: I,
  borderBottomWidth: I,
  borderLeftWidth: I,
  borderRadius: I,
  radius: I,
  borderTopLeftRadius: I,
  borderTopRightRadius: I,
  borderBottomRightRadius: I,
  borderBottomLeftRadius: I,
  width: I,
  maxWidth: I,
  height: I,
  maxHeight: I,
  top: I,
  right: I,
  bottom: I,
  left: I,
  padding: I,
  paddingTop: I,
  paddingRight: I,
  paddingBottom: I,
  paddingLeft: I,
  margin: I,
  marginTop: I,
  marginRight: I,
  marginBottom: I,
  marginLeft: I,
  backgroundPositionX: I,
  backgroundPositionY: I
};
var Ns = {
  rotate: oe,
  rotateX: oe,
  rotateY: oe,
  rotateZ: oe,
  scale: Yt,
  scaleX: Yt,
  scaleY: Yt,
  scaleZ: Yt,
  skew: oe,
  skewX: oe,
  skewY: oe,
  distance: I,
  translateX: I,
  translateY: I,
  translateZ: I,
  x: I,
  y: I,
  z: I,
  perspective: I,
  transformPerspective: I,
  opacity: ce,
  originX: Yo,
  originY: Yo,
  originZ: I
};
var Qo = { ...ae, transform: Math.round };
var dt = { ...Hs, ...Ns, zIndex: Qo, size: I, fillOpacity: ce, strokeOpacity: ce, numOctaves: Qo };
var dd = { x: 'translateX', y: 'translateY', z: 'translateZ', transformPerspective: 'perspective' },
  fd = te.length;
function Gs(e, t, a) {
  let o = '',
    r = !0;
  for (let i = 0; i < fd; i++) {
    let s = te[i],
      n = e[s];
    if (n === void 0) continue;
    let l = !0;
    if (
      (typeof n == 'number'
        ? (l = n === (s.startsWith('scale') ? 1 : 0))
        : (l = parseFloat(n) === 0),
      !l || a)
    ) {
      let u = Ma(n, dt[s]);
      if (!l) {
        r = !1;
        let d = dd[s] || s;
        o += `${d}(${u}) `;
      }
      a && (t[s] = u);
    }
  }
  return ((o = o.trim()), a ? (o = a(t, r ? '' : o)) : r && (o = 'none'), o);
}
function ft(e, t, a) {
  let { style: o, vars: r, transformOrigin: i } = e,
    s = !1,
    n = !1;
  for (let l in t) {
    let u = t[l];
    if (K.has(l)) {
      s = !0;
      continue;
    } else if (ka(l)) {
      r[l] = u;
      continue;
    } else {
      let d = Ma(u, dt[l]);
      l.startsWith('origin') ? ((n = !0), (i[l] = d)) : (o[l] = d);
    }
  }
  if (
    (t.transform ||
      (s || a ? (o.transform = Gs(t, e.transform, a)) : o.transform && (o.transform = 'none')),
    n)
  ) {
    let { originX: l = '50%', originY: u = '50%', originZ: d = 0 } = i;
    o.transformOrigin = `${l} ${u} ${d}`;
  }
}
var cd = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  md = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
function Ws(e, t, a = 1, o = 0, r = !0) {
  e.pathLength = 1;
  let i = r ? cd : md;
  e[i.offset] = I.transform(-o);
  let s = I.transform(t),
    n = I.transform(a);
  e[i.array] = `${s} ${n}`;
}
function zs(e, t, a) {
  return typeof e == 'string' ? e : I.transform(t + a * e);
}
function Ks(e, t, a) {
  let o = zs(t, e.x, e.width),
    r = zs(a, e.y, e.height);
  return `${o} ${r}`;
}
function ct(
  e,
  {
    attrX: t,
    attrY: a,
    attrScale: o,
    originX: r,
    originY: i,
    pathLength: s,
    pathSpacing: n = 1,
    pathOffset: l = 0,
    ...u
  },
  d,
  f
) {
  if ((ft(e, u, f), d)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  ((e.attrs = e.style), (e.style = {}));
  let { attrs: c, style: m, dimensions: p } = e;
  (c.transform && (p && (m.transform = c.transform), delete c.transform),
    p &&
      (r !== void 0 || i !== void 0 || m.transform) &&
      (m.transformOrigin = Ks(p, r !== void 0 ? r : 0.5, i !== void 0 ? i : 0.5)),
    t !== void 0 && (c.x = t),
    a !== void 0 && (c.y = a),
    o !== void 0 && (c.scale = o),
    s !== void 0 && Ws(c, s, n, l, !1));
}
var mt = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
var Da = () => ({ ...mt(), attrs: {} });
var pt = (e) => typeof e == 'string' && e.toLowerCase() === 'svg';
function Ra(e, { style: t, vars: a }, o, r) {
  Object.assign(e.style, t, r && r.getProjectionStyles(o));
  for (let i in a) e.style.setProperty(i, a[i]);
}
var Ba = new Set([
  'baseFrequency',
  'diffuseConstant',
  'kernelMatrix',
  'kernelUnitLength',
  'keySplines',
  'keyTimes',
  'limitingConeAngle',
  'markerHeight',
  'markerWidth',
  'numOctaves',
  'targetX',
  'targetY',
  'surfaceScale',
  'specularConstant',
  'specularExponent',
  'stdDeviation',
  'tableValues',
  'viewBox',
  'gradientTransform',
  'pathLength',
  'startOffset',
  'textLength',
  'lengthAdjust'
]);
function Fa(e, t, a, o) {
  Ra(e, t, void 0, o);
  for (let r in t.attrs) e.setAttribute(Ba.has(r) ? r : rt(r), t.attrs[r]);
}
var ht = {};
function js(e) {
  Object.assign(ht, e);
}
function Va(e, { layout: t, layoutId: a }) {
  return (
    K.has(e) || e.startsWith('origin') || ((t || a !== void 0) && (!!ht[e] || e === 'opacity'))
  );
}
function xt(e, t, a) {
  var o;
  let { style: r } = e,
    i = {};
  for (let s in r)
    (A(r[s]) ||
      (t.style && A(t.style[s])) ||
      Va(s, e) ||
      ((o = a?.getValue(s)) === null || o === void 0 ? void 0 : o.liveStyle) !== void 0) &&
      (i[s] = r[s]);
  return i;
}
function Oa(e, t, a) {
  let o = xt(e, t, a);
  for (let r in e)
    if (A(e[r]) || A(t[r])) {
      let i = te.indexOf(r) !== -1 ? 'attr' + r.charAt(0).toUpperCase() + r.substring(1) : r;
      o[i] = e[r];
    }
  return o;
}
function pd(e, t) {
  try {
    t.dimensions = typeof e.getBBox == 'function' ? e.getBBox() : e.getBoundingClientRect();
  } catch {
    t.dimensions = { x: 0, y: 0, width: 0, height: 0 };
  }
}
var Xs = ['x', 'y', 'width', 'height', 'cx', 'cy', 'r'],
  $s = {
    useVisualState: Aa({
      scrapeMotionValuesFromProps: Oa,
      createRenderState: Da,
      onUpdate: ({ props: e, prevProps: t, current: a, renderState: o, latestValues: r }) => {
        if (!a) return;
        let i = !!e.drag;
        if (!i) {
          for (let n in r)
            if (K.has(n)) {
              i = !0;
              break;
            }
        }
        if (!i) return;
        let s = !t;
        if (t)
          for (let n = 0; n < Xs.length; n++) {
            let l = Xs[n];
            e[l] !== t[l] && (s = !0);
          }
        s &&
          v.read(() => {
            (pd(a, o),
              v.render(() => {
                (ct(o, r, pt(a.tagName), e.transformTemplate), Fa(a, o));
              }));
          });
      }
    })
  };
var _s = { useVisualState: Aa({ scrapeMotionValuesFromProps: xt, createRenderState: mt }) };
import { Fragment as Id, useMemo as Cd, createElement as Sd } from 'react';
import { useMemo as hd } from 'react';
function Jo(e, t, a) {
  for (let o in t) !A(t[o]) && !Va(o, a) && (e[o] = t[o]);
}
function xd({ transformTemplate: e }, t) {
  return hd(() => {
    let a = mt();
    return (ft(a, t, e), Object.assign({}, a.vars, a.style));
  }, [t]);
}
function gd(e, t) {
  let a = e.style || {},
    o = {};
  return (Jo(o, a, e), Object.assign(o, xd(e, t)), o);
}
function Zs(e, t) {
  let a = {},
    o = gd(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((a.draggable = !1),
      (o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = 'none'),
      (o.touchAction = e.drag === !0 ? 'none' : `pan-${e.drag === 'x' ? 'y' : 'x'}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (a.tabIndex = 0),
    (a.style = o),
    a
  );
}
import { useMemo as Ld } from 'react';
function Ys(e, t, a, o) {
  let r = Ld(() => {
    let i = Da();
    return (ct(i, t, pt(o), e.transformTemplate), { ...i.attrs, style: { ...i.style } });
  }, [t]);
  if (e.style) {
    let i = {};
    (Jo(i, e.style, e), (r.style = { ...i, ...r.style }));
  }
  return r;
}
function Qs(e = !1) {
  return (a, o, r, { latestValues: i }, s) => {
    let l = (it(a) ? Ys : Zs)(o, i, s, a),
      u = ys(o, typeof a == 'string', e),
      d = a !== Id ? { ...u, ...l, ref: r } : {},
      { children: f } = o,
      c = Cd(() => (A(f) ? f.get() : f), [f]);
    return Sd(a, { ...d, children: c });
  };
}
function Js(e, t) {
  return function (o, { forwardMotionProps: r } = { forwardMotionProps: !1 }) {
    let s = {
      ...(it(o) ? $s : _s),
      preloadedFeatures: e,
      useRender: Qs(r),
      createVisualElement: t,
      Component: o
    };
    return Ds(s);
  };
}
function er(e, t) {
  if (!Array.isArray(t)) return !1;
  let a = t.length;
  if (a !== e.length) return !1;
  for (let o = 0; o < a; o++) if (t[o] !== e[o]) return !1;
  return !0;
}
function Pe(e, t, a) {
  let o = e.getProps();
  return nt(o, t, a !== void 0 ? a : o.custom, e);
}
var tr = Ue(() => window.ScrollTimeline !== void 0);
var Jt = class {
  constructor(t) {
    ((this.stop = () => this.runAll('stop')), (this.animations = t.filter(Boolean)));
  }
  get finished() {
    return Promise.all(this.animations.map((t) => ('finished' in t ? t.finished : t)));
  }
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, a) {
    for (let o = 0; o < this.animations.length; o++) this.animations[o][t] = a;
  }
  attachTimeline(t, a) {
    let o = this.animations.map((r) => {
      if (tr() && r.attachTimeline) return r.attachTimeline(t);
      if (typeof a == 'function') return a(r);
    });
    return () => {
      o.forEach((r, i) => {
        (r && r(), this.animations[i].stop());
      });
    };
  }
  get time() {
    return this.getAll('time');
  }
  set time(t) {
    this.setAll('time', t);
  }
  get speed() {
    return this.getAll('speed');
  }
  set speed(t) {
    this.setAll('speed', t);
  }
  get startTime() {
    return this.getAll('startTime');
  }
  get duration() {
    let t = 0;
    for (let a = 0; a < this.animations.length; a++) t = Math.max(t, this.animations[a].duration);
    return t;
  }
  runAll(t) {
    this.animations.forEach((a) => a[t]());
  }
  flatten() {
    this.runAll('flatten');
  }
  play() {
    this.runAll('play');
  }
  pause() {
    this.runAll('pause');
  }
  cancel() {
    this.runAll('cancel');
  }
  complete() {
    this.runAll('complete');
  }
};
var ea = class extends Jt {
  then(t, a) {
    return Promise.all(this.animations).then(t).catch(a);
  }
};
function we(e, t) {
  return e ? e[t] || e.default || e : void 0;
}
function gt(e) {
  let t = 0,
    a = 50,
    o = e.next(t);
  for (; !o.done && t < 2e4;) ((t += a), (o = e.next(t)));
  return t >= 2e4 ? 1 / 0 : t;
}
function be(e) {
  return typeof e == 'function';
}
function ta(e, t) {
  ((e.timeline = t), (e.onfinish = null));
}
var Lt = (e) => Array.isArray(e) && typeof e[0] == 'number';
var or = { linearEasing: void 0 };
function ei(e, t) {
  let a = Ue(e);
  return () => {
    var o;
    return (o = or[t]) !== null && o !== void 0 ? o : a();
  };
}
var Te = ei(() => {
  try {
    document.createElement('div').animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
  } catch {
    return !1;
  }
  return !0;
}, 'linearEasing');
var aa = (e, t, a = 10) => {
  let o = '',
    r = Math.max(Math.round(t / a), 2);
  for (let i = 0; i < r; i++) o += e(X(0, r - 1, i)) + ', ';
  return `linear(${o.substring(0, o.length - 2)})`;
};
function qa(e) {
  return !!(
    (typeof e == 'function' && Te()) ||
    !e ||
    (typeof e == 'string' && (e in Ea || Te())) ||
    Lt(e) ||
    (Array.isArray(e) && e.every(qa))
  );
}
var It = ([e, t, a, o]) => `cubic-bezier(${e}, ${t}, ${a}, ${o})`,
  Ea = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: It([0, 0.65, 0.55, 1]),
    circOut: It([0.55, 0, 1, 0.45]),
    backIn: It([0.31, 0.01, 0.66, -0.59]),
    backOut: It([0.33, 1.53, 0.69, 0.99])
  };
function Ct(e, t) {
  if (e)
    return typeof e == 'function' && Te()
      ? aa(e, t)
      : Lt(e)
        ? It(e)
        : Array.isArray(e)
          ? e.map((a) => Ct(a, t) || Ea.easeOut)
          : Ea[e];
}
var _ = { x: !1, y: !1 };
function St() {
  return _.x || _.y;
}
function rr(e, t, a) {
  var o;
  if (e instanceof Element) return [e];
  if (typeof e == 'string') {
    let r = document;
    t && (r = t.current);
    let i = (o = a?.[e]) !== null && o !== void 0 ? o : r.querySelectorAll(e);
    return i ? Array.from(i) : [];
  }
  return Array.from(e);
}
function Ua(e, t) {
  let a = rr(e),
    o = new AbortController(),
    r = { passive: !0, ...t, signal: o.signal };
  return [a, r, () => o.abort()];
}
function ti(e) {
  return (t) => {
    t.pointerType === 'touch' || St() || e(t);
  };
}
function sr(e, t, a = {}) {
  let [o, r, i] = Ua(e, a),
    s = ti((n) => {
      let { target: l } = n,
        u = t(n);
      if (typeof u != 'function' || !l) return;
      let d = ti((f) => {
        (u(f), l.removeEventListener('pointerleave', d));
      });
      l.addEventListener('pointerleave', d, r);
    });
  return (
    o.forEach((n) => {
      n.addEventListener('pointerenter', s, r);
    }),
    i
  );
}
var Ha = (e, t) => (t ? (e === t ? !0 : Ha(e, t.parentElement)) : !1);
var Ne = (e) =>
  e.pointerType === 'mouse' ? typeof e.button != 'number' || e.button <= 0 : e.isPrimary !== !1;
var yd = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']);
function ai(e) {
  return yd.has(e.tagName) || e.tabIndex !== -1;
}
var Ge = new WeakSet();
function oi(e) {
  return (t) => {
    t.key === 'Enter' && e(t);
  };
}
function ir(e, t) {
  e.dispatchEvent(new PointerEvent('pointer' + t, { isPrimary: !0, bubbles: !0 }));
}
var ri = (e, t) => {
  let a = e.currentTarget;
  if (!a) return;
  let o = oi(() => {
    if (Ge.has(a)) return;
    ir(a, 'down');
    let r = oi(() => {
        ir(a, 'up');
      }),
      i = () => ir(a, 'cancel');
    (a.addEventListener('keyup', r, t), a.addEventListener('blur', i, t));
  });
  (a.addEventListener('keydown', o, t),
    a.addEventListener('blur', () => a.removeEventListener('keydown', o), t));
};
function si(e) {
  return Ne(e) && !St();
}
function nr(e, t, a = {}) {
  let [o, r, i] = Ua(e, a),
    s = (n) => {
      let l = n.currentTarget;
      if (!si(n) || Ge.has(l)) return;
      Ge.add(l);
      let u = t(n),
        d = (m, p) => {
          (window.removeEventListener('pointerup', f),
            window.removeEventListener('pointercancel', c),
            !(!si(m) || !Ge.has(l)) &&
              (Ge.delete(l), typeof u == 'function' && u(m, { success: p })));
        },
        f = (m) => {
          d(m, a.useGlobalTarget || Ha(l, m.target));
        },
        c = (m) => {
          d(m, !1);
        };
      (window.addEventListener('pointerup', f, r), window.addEventListener('pointercancel', c, r));
    };
  return (
    o.forEach((n) => {
      (!ai(n) && n.getAttribute('tabindex') === null && (n.tabIndex = 0),
        (a.useGlobalTarget ? window : n).addEventListener('pointerdown', s, r),
        n.addEventListener('focus', (u) => ri(u, r), r));
    }),
    i
  );
}
function lr(e) {
  return e === 'x' || e === 'y'
    ? _[e]
      ? null
      : ((_[e] = !0),
        () => {
          _[e] = !1;
        })
    : _.x || _.y
      ? null
      : ((_.x = _.y = !0),
        () => {
          _.x = _.y = !1;
        });
}
var Na = new Set(['width', 'height', 'top', 'left', 'right', 'bottom', ...te]);
var Ga;
function Pd() {
  Ga = void 0;
}
var N = {
  now: () => (
    Ga === void 0 && N.set(B.isProcessing || ot.useManualTiming ? B.timestamp : performance.now()),
    Ga
  ),
  set: (e) => {
    ((Ga = e), queueMicrotask(Pd));
  }
};
function yt(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function vt(e, t) {
  let a = e.indexOf(t);
  a > -1 && e.splice(a, 1);
}
var Ae = class {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return (yt(this.subscriptions, t), () => vt(this.subscriptions, t));
  }
  notify(t, a, o) {
    let r = this.subscriptions.length;
    if (r)
      if (r === 1) this.subscriptions[0](t, a, o);
      else
        for (let i = 0; i < r; i++) {
          let s = this.subscriptions[i];
          s && s(t, a, o);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};
function Wa(e, t) {
  return t ? e * (1e3 / t) : 0;
}
var ni = 30,
  wd = (e) => !isNaN(parseFloat(e)),
  li = { current: void 0 },
  ur = class {
    constructor(t, a = {}) {
      ((this.version = '11.18.2'),
        (this.canTrackVelocity = null),
        (this.events = {}),
        (this.updateAndNotify = (o, r = !0) => {
          let i = N.now();
          (this.updatedAt !== i && this.setPrevFrameValue(),
            (this.prev = this.current),
            this.setCurrent(o),
            this.current !== this.prev &&
              this.events.change &&
              this.events.change.notify(this.current),
            r && this.events.renderRequest && this.events.renderRequest.notify(this.current));
        }),
        (this.hasAnimated = !1),
        this.setCurrent(t),
        (this.owner = a.owner));
    }
    setCurrent(t) {
      ((this.current = t),
        (this.updatedAt = N.now()),
        this.canTrackVelocity === null &&
          t !== void 0 &&
          (this.canTrackVelocity = wd(this.current)));
    }
    setPrevFrameValue(t = this.current) {
      ((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt));
    }
    onChange(t) {
      return this.on('change', t);
    }
    on(t, a) {
      this.events[t] || (this.events[t] = new Ae());
      let o = this.events[t].add(a);
      return t === 'change'
        ? () => {
            (o(),
              v.read(() => {
                this.events.change.getSize() || this.stop();
              }));
          }
        : o;
    }
    clearListeners() {
      for (let t in this.events) this.events[t].clear();
    }
    attach(t, a) {
      ((this.passiveEffect = t), (this.stopPassiveEffect = a));
    }
    set(t, a = !0) {
      !a || !this.passiveEffect
        ? this.updateAndNotify(t, a)
        : this.passiveEffect(t, this.updateAndNotify);
    }
    setWithVelocity(t, a, o) {
      (this.set(a),
        (this.prev = void 0),
        (this.prevFrameValue = t),
        (this.prevUpdatedAt = this.updatedAt - o));
    }
    jump(t, a = !0) {
      (this.updateAndNotify(t),
        (this.prev = t),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        a && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect());
    }
    get() {
      return (li.current && li.current.push(this), this.current);
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      let t = N.now();
      if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > ni)
        return 0;
      let a = Math.min(this.updatedAt - this.prevUpdatedAt, ni);
      return Wa(parseFloat(this.current) - parseFloat(this.prevFrameValue), a);
    }
    start(t) {
      return (
        this.stop(),
        new Promise((a) => {
          ((this.hasAnimated = !0),
            (this.animation = t(a)),
            this.events.animationStart && this.events.animationStart.notify());
        }).then(() => {
          (this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation());
        })
      );
    }
    stop() {
      (this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation());
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    destroy() {
      (this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect());
    }
  };
function me(e, t) {
  return new ur(e, t);
}
function bd(e, t, a) {
  e.hasValue(t) ? e.getValue(t).set(a) : e.addValue(t, me(a));
}
function ui(e, t) {
  let a = Pe(e, t),
    { transitionEnd: o = {}, transition: r = {}, ...i } = a || {};
  i = { ...i, ...o };
  for (let s in i) {
    let n = Vs(i[s]);
    bd(e, s, n);
  }
}
function di(e) {
  return !!(A(e) && e.add);
}
function oa(e, t) {
  let a = e.getValue('willChange');
  if (di(a)) return a.add(t);
}
function za(e) {
  return e.props[ba];
}
var Ka = { current: !1 };
var fi = (e, t, a) => (((1 - 3 * a + 3 * t) * e + (3 * a - 6 * t)) * e + 3 * t) * e,
  Td = 1e-7,
  Ad = 12;
function kd(e, t, a, o, r) {
  let i,
    s,
    n = 0;
  do ((s = t + (a - t) / 2), (i = fi(s, o, r) - e), i > 0 ? (a = s) : (t = s));
  while (Math.abs(i) > Td && ++n < Ad);
  return s;
}
function ke(e, t, a, o) {
  if (e === t && a === o) return T;
  let r = (i) => kd(i, 0, 1, e, a);
  return (i) => (i === 0 || i === 1 ? i : fi(r(i), t, o));
}
var ja = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2);
var Xa = (e) => (t) => 1 - e(1 - t);
var dr = ke(0.33, 1.53, 0.69, 0.99),
  ra = Xa(dr),
  $a = ja(ra);
var _a = (e) => ((e *= 2) < 1 ? 0.5 * ra(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))));
var Za = (e) => 1 - Math.sin(Math.acos(e)),
  Ya = Xa(Za),
  Qa = ja(Za);
var Ja = (e) => /^0[^.\s]+$/u.test(e);
function ci(e) {
  return typeof e == 'number' ? e === 0 : e !== null ? e === 'none' || e === '0' || Ja(e) : !0;
}
var Me = (e) => Math.round(e * 1e5) / 1e5;
var Pt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function mi(e) {
  return e == null;
}
var pi =
  /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
var wt = (e, t) => (a) =>
    !!(
      (typeof a == 'string' && pi.test(a) && a.startsWith(e)) ||
      (t && !mi(a) && Object.prototype.hasOwnProperty.call(a, t))
    ),
  eo = (e, t, a) => (o) => {
    if (typeof o != 'string') return o;
    let [r, i, s, n] = o.match(Pt);
    return {
      [e]: parseFloat(r),
      [t]: parseFloat(i),
      [a]: parseFloat(s),
      alpha: n !== void 0 ? parseFloat(n) : 1
    };
  };
var Md = (e) => q(0, 255, e),
  fr = { ...ae, transform: (e) => Math.round(Md(e)) },
  re = {
    test: wt('rgb', 'red'),
    parse: eo('red', 'green', 'blue'),
    transform: ({ red: e, green: t, blue: a, alpha: o = 1 }) =>
      'rgba(' +
      fr.transform(e) +
      ', ' +
      fr.transform(t) +
      ', ' +
      fr.transform(a) +
      ', ' +
      Me(ce.transform(o)) +
      ')'
  };
function Dd(e) {
  let t = '',
    a = '',
    o = '',
    r = '';
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (a = e.substring(3, 5)),
        (o = e.substring(5, 7)),
        (r = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (a = e.substring(2, 3)),
        (o = e.substring(3, 4)),
        (r = e.substring(4, 5)),
        (t += t),
        (a += a),
        (o += o),
        (r += r)),
    {
      red: parseInt(t, 16),
      green: parseInt(a, 16),
      blue: parseInt(o, 16),
      alpha: r ? parseInt(r, 16) / 255 : 1
    }
  );
}
var sa = { test: wt('#'), parse: Dd, transform: re.transform };
var De = {
  test: wt('hsl', 'hue'),
  parse: eo('hue', 'saturation', 'lightness'),
  transform: ({ hue: e, saturation: t, lightness: a, alpha: o = 1 }) =>
    'hsla(' +
    Math.round(e) +
    ', ' +
    W.transform(Me(t)) +
    ', ' +
    W.transform(Me(a)) +
    ', ' +
    Me(ce.transform(o)) +
    ')'
};
var V = {
  test: (e) => re.test(e) || sa.test(e) || De.test(e),
  parse: (e) => (re.test(e) ? re.parse(e) : De.test(e) ? De.parse(e) : sa.parse(e)),
  transform: (e) =>
    typeof e == 'string' ? e : e.hasOwnProperty('red') ? re.transform(e) : De.transform(e)
};
var hi =
  /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Rd(e) {
  var t, a;
  return (
    isNaN(e) &&
    typeof e == 'string' &&
    (((t = e.match(Pt)) === null || t === void 0 ? void 0 : t.length) || 0) +
      (((a = e.match(hi)) === null || a === void 0 ? void 0 : a.length) || 0) >
      0
  );
}
var gi = 'number',
  Li = 'color',
  Bd = 'var',
  Fd = 'var(',
  xi = '${}',
  Vd =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function We(e) {
  let t = e.toString(),
    a = [],
    o = { color: [], number: [], var: [] },
    r = [],
    i = 0,
    n = t
      .replace(
        Vd,
        (l) => (
          V.test(l)
            ? (o.color.push(i), r.push(Li), a.push(V.parse(l)))
            : l.startsWith(Fd)
              ? (o.var.push(i), r.push(Bd), a.push(l))
              : (o.number.push(i), r.push(gi), a.push(parseFloat(l))),
          ++i,
          xi
        )
      )
      .split(xi);
  return { values: a, split: n, indexes: o, types: r };
}
function Ii(e) {
  return We(e).values;
}
function Ci(e) {
  let { split: t, types: a } = We(e),
    o = t.length;
  return (r) => {
    let i = '';
    for (let s = 0; s < o; s++)
      if (((i += t[s]), r[s] !== void 0)) {
        let n = a[s];
        n === gi ? (i += Me(r[s])) : n === Li ? (i += V.transform(r[s])) : (i += r[s]);
      }
    return i;
  };
}
var Od = (e) => (typeof e == 'number' ? 0 : e);
function Ed(e) {
  let t = Ii(e);
  return Ci(e)(t.map(Od));
}
var z = { test: Rd, parse: Ii, createTransformer: Ci, getAnimatableNone: Ed };
var qd = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function Ud(e) {
  let [t, a] = e.slice(0, -1).split('(');
  if (t === 'drop-shadow') return e;
  let [o] = a.match(Pt) || [];
  if (!o) return e;
  let r = a.replace(o, ''),
    i = qd.has(t) ? 1 : 0;
  return (o !== a && (i *= 100), t + '(' + i + r + ')');
}
var Hd = /\b([a-z-]*)\(.*?\)/gu,
  ia = {
    ...z,
    getAnimatableNone: (e) => {
      let t = e.match(Hd);
      return t ? t.map(Ud).join(' ') : e;
    }
  };
var Nd = {
    ...dt,
    color: V,
    backgroundColor: V,
    outlineColor: V,
    fill: V,
    stroke: V,
    borderColor: V,
    borderTopColor: V,
    borderRightColor: V,
    borderBottomColor: V,
    borderLeftColor: V,
    filter: ia,
    WebkitFilter: ia
  },
  bt = (e) => Nd[e];
function to(e, t) {
  let a = bt(e);
  return (a !== ia && (a = z), a.getAnimatableNone ? a.getAnimatableNone(t) : void 0);
}
var Gd = new Set(['auto', 'none', '0']);
function Si(e, t, a) {
  let o = 0,
    r;
  for (; o < e.length && !r;) {
    let i = e[o];
    (typeof i == 'string' && !Gd.has(i) && We(i).values.length && (r = e[o]), o++);
  }
  if (r && a) for (let i of t) e[i] = to(a, r);
}
var cr = (e) => e === ae || e === I,
  yi = (e, t) => parseFloat(e.split(', ')[t]),
  vi =
    (e, t) =>
    (a, { transform: o }) => {
      if (o === 'none' || !o) return 0;
      let r = o.match(/^matrix3d\((.+)\)$/u);
      if (r) return yi(r[1], t);
      {
        let i = o.match(/^matrix\((.+)\)$/u);
        return i ? yi(i[1], e) : 0;
      }
    },
  Wd = new Set(['x', 'y', 'z']),
  zd = te.filter((e) => !Wd.has(e));
function Pi(e) {
  let t = [];
  return (
    zd.forEach((a) => {
      let o = e.getValue(a);
      o !== void 0 && (t.push([a, o.get()]), o.set(a.startsWith('scale') ? 1 : 0));
    }),
    t
  );
}
var ze = {
  width: ({ x: e }, { paddingLeft: t = '0', paddingRight: a = '0' }) =>
    e.max - e.min - parseFloat(t) - parseFloat(a),
  height: ({ y: e }, { paddingTop: t = '0', paddingBottom: a = '0' }) =>
    e.max - e.min - parseFloat(t) - parseFloat(a),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: vi(4, 13),
  y: vi(5, 14)
};
ze.translateX = ze.x;
ze.translateY = ze.y;
var Ke = new Set(),
  mr = !1,
  pr = !1;
function wi() {
  if (pr) {
    let e = Array.from(Ke).filter((o) => o.needsMeasurement),
      t = new Set(e.map((o) => o.element)),
      a = new Map();
    (t.forEach((o) => {
      let r = Pi(o);
      r.length && (a.set(o, r), o.render());
    }),
      e.forEach((o) => o.measureInitialState()),
      t.forEach((o) => {
        o.render();
        let r = a.get(o);
        r &&
          r.forEach(([i, s]) => {
            var n;
            (n = o.getValue(i)) === null || n === void 0 || n.set(s);
          });
      }),
      e.forEach((o) => o.measureEndState()),
      e.forEach((o) => {
        o.suspendedScrollY !== void 0 && window.scrollTo(0, o.suspendedScrollY);
      }));
  }
  ((pr = !1), (mr = !1), Ke.forEach((e) => e.complete()), Ke.clear());
}
function bi() {
  Ke.forEach((e) => {
    (e.readKeyframes(), e.needsMeasurement && (pr = !0));
  });
}
function Ti() {
  (bi(), wi());
}
var Re = class {
  constructor(t, a, o, r, i, s = !1) {
    ((this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = a),
      (this.name = o),
      (this.motionValue = r),
      (this.element = i),
      (this.isAsync = s));
  }
  scheduleResolve() {
    ((this.isScheduled = !0),
      this.isAsync
        ? (Ke.add(this), mr || ((mr = !0), v.read(bi), v.resolveKeyframes(wi)))
        : (this.readKeyframes(), this.complete()));
  }
  readKeyframes() {
    let { unresolvedKeyframes: t, name: a, element: o, motionValue: r } = this;
    for (let i = 0; i < t.length; i++)
      if (t[i] === null)
        if (i === 0) {
          let s = r?.get(),
            n = t[t.length - 1];
          if (s !== void 0) t[0] = s;
          else if (o && a) {
            let l = o.readValue(a, n);
            l != null && (t[0] = l);
          }
          (t[0] === void 0 && (t[0] = n), r && s === void 0 && r.set(t[0]));
        } else t[i] = t[i - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    ((this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      Ke.delete(this));
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), Ke.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
};
var ao = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
var Kd = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function jd(e) {
  let t = Kd.exec(e);
  if (!t) return [,];
  let [, a, o, r] = t;
  return [`--${a ?? o}`, r];
}
var Xd = 4;
function hr(e, t, a = 1) {
  J(
    a <= Xd,
    `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`
  );
  let [o, r] = jd(e);
  if (!o) return;
  let i = window.getComputedStyle(t).getPropertyValue(o);
  if (i) {
    let s = i.trim();
    return ao(s) ? parseFloat(s) : s;
  }
  return ut(r) ? hr(r, t, a + 1) : r;
}
var oo = (e) => (t) => t.test(e);
var Ai = { test: (e) => e === 'auto', parse: (e) => e };
var xr = [ae, I, W, oe, Us, qs, Ai],
  gr = (e) => xr.find(oo(e));
var Tt = class extends Re {
  constructor(t, a, o, r, i) {
    super(t, a, o, r, i, !0);
  }
  readKeyframes() {
    let { unresolvedKeyframes: t, element: a, name: o } = this;
    if (!a || !a.current) return;
    super.readKeyframes();
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      if (typeof u == 'string' && ((u = u.trim()), ut(u))) {
        let d = hr(u, a.current);
        (d !== void 0 && (t[l] = d), l === t.length - 1 && (this.finalKeyframe = u));
      }
    }
    if ((this.resolveNoneKeyframes(), !Na.has(o) || t.length !== 2)) return;
    let [r, i] = t,
      s = gr(r),
      n = gr(i);
    if (s !== n)
      if (cr(s) && cr(n))
        for (let l = 0; l < t.length; l++) {
          let u = t[l];
          typeof u == 'string' && (t[l] = parseFloat(u));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    let { unresolvedKeyframes: t, name: a } = this,
      o = [];
    for (let r = 0; r < t.length; r++) ci(t[r]) && o.push(r);
    o.length && Si(t, o, a);
  }
  measureInitialState() {
    let { element: t, unresolvedKeyframes: a, name: o } = this;
    if (!t || !t.current) return;
    (o === 'height' && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = ze[o](t.measureViewportBox(), window.getComputedStyle(t.current))),
      (a[0] = this.measuredOrigin));
    let r = a[a.length - 1];
    r !== void 0 && t.getValue(o, r).jump(r, !1);
  }
  measureEndState() {
    var t;
    let { element: a, name: o, unresolvedKeyframes: r } = this;
    if (!a || !a.current) return;
    let i = a.getValue(o);
    i && i.jump(this.measuredOrigin, !1);
    let s = r.length - 1,
      n = r[s];
    ((r[s] = ze[o](a.measureViewportBox(), window.getComputedStyle(a.current))),
      n !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = n),
      !((t = this.removedTransforms) === null || t === void 0) &&
        t.length &&
        this.removedTransforms.forEach(([l, u]) => {
          a.getValue(l).set(u);
        }),
      this.resolveNoneKeyframes());
  }
};
var Lr = (e, t) =>
  t === 'zIndex'
    ? !1
    : !!(
        typeof e == 'number' ||
        Array.isArray(e) ||
        (typeof e == 'string' && (z.test(e) || e === '0') && !e.startsWith('url('))
      );
function $d(e) {
  let t = e[0];
  if (e.length === 1) return !0;
  for (let a = 0; a < e.length; a++) if (e[a] !== t) return !0;
}
function ki(e, t, a, o) {
  let r = e[0];
  if (r === null) return !1;
  if (t === 'display' || t === 'visibility') return !0;
  let i = e[e.length - 1],
    s = Lr(r, t),
    n = Lr(i, t);
  return (
    le(
      s === n,
      `You are trying to animate ${t} from "${r}" to "${i}". ${r} is not an animatable value - to enable this animation set ${r} to a value animatable to ${i} via the \`style\` property.`
    ),
    !s || !n ? !1 : $d(e) || ((a === 'spring' || be(a)) && o)
  );
}
var _d = (e) => e !== null;
function Be(e, { repeat: t, repeatType: a = 'loop' }, o) {
  let r = e.filter(_d),
    i = t && a !== 'loop' && t % 2 === 1 ? 0 : r.length - 1;
  return !i || o === void 0 ? r[i] : o;
}
var Zd = 40,
  At = class {
    constructor({
      autoplay: t = !0,
      delay: a = 0,
      type: o = 'keyframes',
      repeat: r = 0,
      repeatDelay: i = 0,
      repeatType: s = 'loop',
      ...n
    }) {
      ((this.isStopped = !1),
        (this.hasAttemptedResolve = !1),
        (this.createdAt = N.now()),
        (this.options = {
          autoplay: t,
          delay: a,
          type: o,
          repeat: r,
          repeatDelay: i,
          repeatType: s,
          ...n
        }),
        this.updateFinishedPromise());
    }
    calcStartTime() {
      return this.resolvedAt
        ? this.resolvedAt - this.createdAt > Zd
          ? this.resolvedAt
          : this.createdAt
        : this.createdAt;
    }
    get resolved() {
      return (!this._resolved && !this.hasAttemptedResolve && Ti(), this._resolved);
    }
    onKeyframesResolved(t, a) {
      ((this.resolvedAt = N.now()), (this.hasAttemptedResolve = !0));
      let {
        name: o,
        type: r,
        velocity: i,
        delay: s,
        onComplete: n,
        onUpdate: l,
        isGenerator: u
      } = this.options;
      if (!u && !ki(t, o, r, i))
        if (Ka.current || !s) {
          (l && l(Be(t, this.options, a)), n && n(), this.resolveFinishedPromise());
          return;
        } else this.options.duration = 0;
      let d = this.initPlayback(t, a);
      d !== !1 &&
        ((this._resolved = { keyframes: t, finalKeyframe: a, ...d }), this.onPostResolved());
    }
    onPostResolved() {}
    then(t, a) {
      return this.currentFinishedPromise.then(t, a);
    }
    flatten() {
      ((this.options.type = 'keyframes'), (this.options.ease = 'linear'));
    }
    updateFinishedPromise() {
      this.currentFinishedPromise = new Promise((t) => {
        this.resolveFinishedPromise = t;
      });
    }
  };
var w = (e, t, a) => e + (t - e) * a;
function Ir(e, t, a) {
  return (
    a < 0 && (a += 1),
    a > 1 && (a -= 1),
    a < 1 / 6 ? e + (t - e) * 6 * a : a < 1 / 2 ? t : a < 2 / 3 ? e + (t - e) * (2 / 3 - a) * 6 : e
  );
}
function Mi({ hue: e, saturation: t, lightness: a, alpha: o }) {
  ((e /= 360), (t /= 100), (a /= 100));
  let r = 0,
    i = 0,
    s = 0;
  if (!t) r = i = s = a;
  else {
    let n = a < 0.5 ? a * (1 + t) : a + t - a * t,
      l = 2 * a - n;
    ((r = Ir(l, n, e + 1 / 3)), (i = Ir(l, n, e)), (s = Ir(l, n, e - 1 / 3)));
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(i * 255),
    blue: Math.round(s * 255),
    alpha: o
  };
}
function kt(e, t) {
  return (a) => (a > 0 ? t : e);
}
var Cr = (e, t, a) => {
    let o = e * e,
      r = a * (t * t - o) + o;
    return r < 0 ? 0 : Math.sqrt(r);
  },
  Yd = [sa, re, De],
  Qd = (e) => Yd.find((t) => t.test(e));
function Di(e) {
  let t = Qd(e);
  if ((le(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`), !t))
    return !1;
  let a = t.parse(e);
  return (t === De && (a = Mi(a)), a);
}
var Sr = (e, t) => {
  let a = Di(e),
    o = Di(t);
  if (!a || !o) return kt(e, t);
  let r = { ...a };
  return (i) => (
    (r.red = Cr(a.red, o.red, i)),
    (r.green = Cr(a.green, o.green, i)),
    (r.blue = Cr(a.blue, o.blue, i)),
    (r.alpha = w(a.alpha, o.alpha, i)),
    re.transform(r)
  );
};
var Jd = (e, t) => (a) => t(e(a)),
  se = (...e) => e.reduce(Jd);
var ro = new Set(['none', 'hidden']);
function Ri(e, t) {
  return ro.has(e) ? (a) => (a <= 0 ? e : t) : (a) => (a >= 1 ? t : e);
}
function ef(e, t) {
  return (a) => w(e, t, a);
}
function so(e) {
  return typeof e == 'number'
    ? ef
    : typeof e == 'string'
      ? ut(e)
        ? kt
        : V.test(e)
          ? Sr
          : of
      : Array.isArray(e)
        ? Bi
        : typeof e == 'object'
          ? V.test(e)
            ? Sr
            : tf
          : kt;
}
function Bi(e, t) {
  let a = [...e],
    o = a.length,
    r = e.map((i, s) => so(i)(i, t[s]));
  return (i) => {
    for (let s = 0; s < o; s++) a[s] = r[s](i);
    return a;
  };
}
function tf(e, t) {
  let a = { ...e, ...t },
    o = {};
  for (let r in a) e[r] !== void 0 && t[r] !== void 0 && (o[r] = so(e[r])(e[r], t[r]));
  return (r) => {
    for (let i in o) a[i] = o[i](r);
    return a;
  };
}
function af(e, t) {
  var a;
  let o = [],
    r = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < t.values.length; i++) {
    let s = t.types[i],
      n = e.indexes[s][r[s]],
      l = (a = e.values[n]) !== null && a !== void 0 ? a : 0;
    ((o[i] = l), r[s]++);
  }
  return o;
}
var of = (e, t) => {
  let a = z.createTransformer(t),
    o = We(e),
    r = We(t);
  return o.indexes.var.length === r.indexes.var.length &&
    o.indexes.color.length === r.indexes.color.length &&
    o.indexes.number.length >= r.indexes.number.length
    ? (ro.has(e) && !r.values.length) || (ro.has(t) && !o.values.length)
      ? Ri(e, t)
      : se(Bi(af(o, r), r.values), a)
    : (le(
        !0,
        `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`
      ),
      kt(e, t));
};
function io(e, t, a) {
  return typeof e == 'number' && typeof t == 'number' && typeof a == 'number'
    ? w(e, t, a)
    : so(e)(e, t);
}
var rf = 5;
function no(e, t, a) {
  let o = Math.max(t - rf, 0);
  return Wa(a - e(o), t - o);
}
var k = {
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  duration: 800,
  bounce: 0.3,
  visualDuration: 0.3,
  restSpeed: { granular: 0.01, default: 2 },
  restDelta: { granular: 0.005, default: 0.5 },
  minDuration: 0.01,
  maxDuration: 10,
  minDamping: 0.05,
  maxDamping: 1
};
var yr = 0.001;
function Fi({
  duration: e = k.duration,
  bounce: t = k.bounce,
  velocity: a = k.velocity,
  mass: o = k.mass
}) {
  let r, i;
  le(e <= R(k.maxDuration), 'Spring duration must be 10 seconds or less');
  let s = 1 - t;
  ((s = q(k.minDamping, k.maxDamping, s)),
    (e = q(k.minDuration, k.maxDuration, E(e))),
    s < 1
      ? ((r = (u) => {
          let d = u * s,
            f = d * e,
            c = d - a,
            m = lo(u, s),
            p = Math.exp(-f);
          return yr - (c / m) * p;
        }),
        (i = (u) => {
          let f = u * s * e,
            c = f * a + a,
            m = Math.pow(s, 2) * Math.pow(u, 2) * e,
            p = Math.exp(-f),
            h = lo(Math.pow(u, 2), s);
          return ((-r(u) + yr > 0 ? -1 : 1) * ((c - m) * p)) / h;
        }))
      : ((r = (u) => {
          let d = Math.exp(-u * e),
            f = (u - a) * e + 1;
          return -yr + d * f;
        }),
        (i = (u) => {
          let d = Math.exp(-u * e),
            f = (a - u) * (e * e);
          return d * f;
        })));
  let n = 5 / e,
    l = nf(r, i, n);
  if (((e = R(e)), isNaN(l))) return { stiffness: k.stiffness, damping: k.damping, duration: e };
  {
    let u = Math.pow(l, 2) * o;
    return { stiffness: u, damping: s * 2 * Math.sqrt(o * u), duration: e };
  }
}
var sf = 12;
function nf(e, t, a) {
  let o = a;
  for (let r = 1; r < sf; r++) o = o - e(o) / t(o);
  return o;
}
function lo(e, t) {
  return e * Math.sqrt(1 - t * t);
}
var lf = ['duration', 'bounce'],
  uf = ['stiffness', 'damping', 'mass'];
function Vi(e, t) {
  return t.some((a) => e[a] !== void 0);
}
function df(e) {
  let t = {
    velocity: k.velocity,
    stiffness: k.stiffness,
    damping: k.damping,
    mass: k.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!Vi(e, uf) && Vi(e, lf))
    if (e.visualDuration) {
      let a = e.visualDuration,
        o = (2 * Math.PI) / (a * 1.2),
        r = o * o,
        i = 2 * q(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(r);
      t = { ...t, mass: k.mass, stiffness: r, damping: i };
    } else {
      let a = Fi(e);
      ((t = { ...t, ...a, mass: k.mass }), (t.isResolvedFromDuration = !0));
    }
  return t;
}
function uo(e = k.visualDuration, t = k.bounce) {
  let a = typeof e != 'object' ? { visualDuration: e, keyframes: [0, 1], bounce: t } : e,
    { restSpeed: o, restDelta: r } = a,
    i = a.keyframes[0],
    s = a.keyframes[a.keyframes.length - 1],
    n = { done: !1, value: i },
    {
      stiffness: l,
      damping: u,
      mass: d,
      duration: f,
      velocity: c,
      isResolvedFromDuration: m
    } = df({ ...a, velocity: -E(a.velocity || 0) }),
    p = c || 0,
    h = u / (2 * Math.sqrt(l * d)),
    g = s - i,
    x = E(Math.sqrt(l / d)),
    C = Math.abs(g) < 5;
  (o || (o = C ? k.restSpeed.granular : k.restSpeed.default),
    r || (r = C ? k.restDelta.granular : k.restDelta.default));
  let S;
  if (h < 1) {
    let L = lo(x, h);
    S = (b) => {
      let D = Math.exp(-h * x * b);
      return s - D * (((p + h * x * g) / L) * Math.sin(L * b) + g * Math.cos(L * b));
    };
  } else if (h === 1) S = (L) => s - Math.exp(-x * L) * (g + (p + x * g) * L);
  else {
    let L = x * Math.sqrt(h * h - 1);
    S = (b) => {
      let D = Math.exp(-h * x * b),
        y = Math.min(L * b, 300);
      return s - (D * ((p + h * x * g) * Math.sinh(y) + L * g * Math.cosh(y))) / L;
    };
  }
  let P = {
    calculatedDuration: (m && f) || null,
    next: (L) => {
      let b = S(L);
      if (m) n.done = L >= f;
      else {
        let D = 0;
        h < 1 && (D = L === 0 ? R(p) : no(S, L, b));
        let y = Math.abs(D) <= o,
          H = Math.abs(s - b) <= r;
        n.done = y && H;
      }
      return ((n.value = n.done ? s : b), n);
    },
    toString: () => {
      let L = Math.min(gt(P), 2e4),
        b = aa((D) => P.next(L * D).value, L, 30);
      return L + 'ms ' + b;
    }
  };
  return P;
}
function vr({
  keyframes: e,
  velocity: t = 0,
  power: a = 0.8,
  timeConstant: o = 325,
  bounceDamping: r = 10,
  bounceStiffness: i = 500,
  modifyTarget: s,
  min: n,
  max: l,
  restDelta: u = 0.5,
  restSpeed: d
}) {
  let f = e[0],
    c = { done: !1, value: f },
    m = (y) => (n !== void 0 && y < n) || (l !== void 0 && y > l),
    p = (y) => (n === void 0 ? l : l === void 0 || Math.abs(n - y) < Math.abs(l - y) ? n : l),
    h = a * t,
    g = f + h,
    x = s === void 0 ? g : s(g);
  x !== g && (h = x - f);
  let C = (y) => -h * Math.exp(-y / o),
    S = (y) => x + C(y),
    P = (y) => {
      let H = C(y),
        Y = S(y);
      ((c.done = Math.abs(H) <= u), (c.value = c.done ? x : Y));
    },
    L,
    b,
    D = (y) => {
      m(c.value) &&
        ((L = y),
        (b = uo({
          keyframes: [c.value, p(c.value)],
          velocity: no(S, y, c.value),
          damping: r,
          stiffness: i,
          restDelta: u,
          restSpeed: d
        })));
    };
  return (
    D(0),
    {
      calculatedDuration: null,
      next: (y) => {
        let H = !1;
        return (
          !b && L === void 0 && ((H = !0), P(y), D(y)),
          L !== void 0 && y >= L ? b.next(y - L) : (!H && P(y), c)
        );
      }
    }
  );
}
var Oi = ke(0.42, 0, 1, 1),
  Ei = ke(0, 0, 0.58, 1),
  fo = ke(0.42, 0, 0.58, 1);
var qi = (e) => Array.isArray(e) && typeof e[0] != 'number';
var Ui = {
    linear: T,
    easeIn: Oi,
    easeInOut: fo,
    easeOut: Ei,
    circIn: Za,
    circInOut: Qa,
    circOut: Ya,
    backIn: ra,
    backInOut: $a,
    backOut: dr,
    anticipate: _a
  },
  Pr = (e) => {
    if (Lt(e)) {
      J(e.length === 4, 'Cubic bezier arrays must contain four numerical values.');
      let [t, a, o, r] = e;
      return ke(t, a, o, r);
    } else if (typeof e == 'string')
      return (J(Ui[e] !== void 0, `Invalid easing type '${e}'`), Ui[e]);
    return e;
  };
function ff(e, t, a) {
  let o = [],
    r = a || io,
    i = e.length - 1;
  for (let s = 0; s < i; s++) {
    let n = r(e[s], e[s + 1]);
    if (t) {
      let l = Array.isArray(t) ? t[s] || T : t;
      n = se(l, n);
    }
    o.push(n);
  }
  return o;
}
function Hi(e, t, { clamp: a = !0, ease: o, mixer: r } = {}) {
  let i = e.length;
  if ((J(i === t.length, 'Both input and output ranges must be the same length'), i === 1))
    return () => t[0];
  if (i === 2 && t[0] === t[1]) return () => t[1];
  let s = e[0] === e[1];
  e[0] > e[i - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  let n = ff(t, o, r),
    l = n.length,
    u = (d) => {
      if (s && d < e[0]) return t[0];
      let f = 0;
      if (l > 1) for (; f < e.length - 2 && !(d < e[f + 1]); f++);
      let c = X(e[f], e[f + 1], d);
      return n[f](c);
    };
  return a ? (d) => u(q(e[0], e[i - 1], d)) : u;
}
function Ni(e, t) {
  let a = e[e.length - 1];
  for (let o = 1; o <= t; o++) {
    let r = X(0, t, o);
    e.push(w(a, 1, r));
  }
}
function Gi(e) {
  let t = [0];
  return (Ni(t, e.length - 1), t);
}
function Wi(e, t) {
  return e.map((a) => a * t);
}
function cf(e, t) {
  return e.map(() => t || fo).splice(0, e.length - 1);
}
function na({ duration: e = 300, keyframes: t, times: a, ease: o = 'easeInOut' }) {
  let r = qi(o) ? o.map(Pr) : Pr(o),
    i = { done: !1, value: t[0] },
    s = Wi(a && a.length === t.length ? a : Gi(t), e),
    n = Hi(s, t, { ease: Array.isArray(r) ? r : cf(t, r) });
  return { calculatedDuration: e, next: (l) => ((i.value = n(l)), (i.done = l >= e), i) };
}
var zi = (e) => {
  let t = ({ timestamp: a }) => e(a);
  return {
    start: () => v.update(t, !0),
    stop: () => $(t),
    now: () => (B.isProcessing ? B.timestamp : N.now())
  };
};
var mf = { decay: vr, inertia: vr, tween: na, keyframes: na, spring: uo },
  pf = (e) => e / 100,
  je = class extends At {
    constructor(t) {
      (super(t),
        (this.holdTime = null),
        (this.cancelTime = null),
        (this.currentTime = 0),
        (this.playbackSpeed = 1),
        (this.pendingPlayState = 'running'),
        (this.startTime = null),
        (this.state = 'idle'),
        (this.stop = () => {
          if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')) return;
          this.teardown();
          let { onStop: l } = this.options;
          l && l();
        }));
      let { name: a, motionValue: o, element: r, keyframes: i } = this.options,
        s = r?.KeyframeResolver || Re,
        n = (l, u) => this.onKeyframesResolved(l, u);
      ((this.resolver = new s(i, n, a, o, r)), this.resolver.scheduleResolve());
    }
    flatten() {
      (super.flatten(),
        this._resolved &&
          Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes)));
    }
    initPlayback(t) {
      let {
          type: a = 'keyframes',
          repeat: o = 0,
          repeatDelay: r = 0,
          repeatType: i,
          velocity: s = 0
        } = this.options,
        n = be(a) ? a : mf[a] || na,
        l,
        u;
      n !== na && typeof t[0] != 'number' && ((l = se(pf, io(t[0], t[1]))), (t = [0, 100]));
      let d = n({ ...this.options, keyframes: t });
      (i === 'mirror' && (u = n({ ...this.options, keyframes: [...t].reverse(), velocity: -s })),
        d.calculatedDuration === null && (d.calculatedDuration = gt(d)));
      let { calculatedDuration: f } = d,
        c = f + r,
        m = c * (o + 1) - r;
      return {
        generator: d,
        mirroredGenerator: u,
        mapPercentToKeyframes: l,
        calculatedDuration: f,
        resolvedDuration: c,
        totalDuration: m
      };
    }
    onPostResolved() {
      let { autoplay: t = !0 } = this.options;
      (this.play(),
        this.pendingPlayState === 'paused' || !t
          ? this.pause()
          : (this.state = this.pendingPlayState));
    }
    tick(t, a = !1) {
      let { resolved: o } = this;
      if (!o) {
        let { keyframes: y } = this.options;
        return { done: !0, value: y[y.length - 1] };
      }
      let {
        finalKeyframe: r,
        generator: i,
        mirroredGenerator: s,
        mapPercentToKeyframes: n,
        keyframes: l,
        calculatedDuration: u,
        totalDuration: d,
        resolvedDuration: f
      } = o;
      if (this.startTime === null) return i.next(0);
      let { delay: c, repeat: m, repeatType: p, repeatDelay: h, onUpdate: g } = this.options;
      (this.speed > 0
        ? (this.startTime = Math.min(this.startTime, t))
        : this.speed < 0 && (this.startTime = Math.min(t - d / this.speed, this.startTime)),
        a
          ? (this.currentTime = t)
          : this.holdTime !== null
            ? (this.currentTime = this.holdTime)
            : (this.currentTime = Math.round(t - this.startTime) * this.speed));
      let x = this.currentTime - c * (this.speed >= 0 ? 1 : -1),
        C = this.speed >= 0 ? x < 0 : x > d;
      ((this.currentTime = Math.max(x, 0)),
        this.state === 'finished' && this.holdTime === null && (this.currentTime = d));
      let S = this.currentTime,
        P = i;
      if (m) {
        let y = Math.min(this.currentTime, d) / f,
          H = Math.floor(y),
          Y = y % 1;
        (!Y && y >= 1 && (Y = 1),
          Y === 1 && H--,
          (H = Math.min(H, m + 1)),
          !!(H % 2) &&
            (p === 'reverse' ? ((Y = 1 - Y), h && (Y -= h / f)) : p === 'mirror' && (P = s)),
          (S = q(0, 1, Y) * f));
      }
      let L = C ? { done: !1, value: l[0] } : P.next(S);
      n && (L.value = n(L.value));
      let { done: b } = L;
      !C && u !== null && (b = this.speed >= 0 ? this.currentTime >= d : this.currentTime <= 0);
      let D =
        this.holdTime === null && (this.state === 'finished' || (this.state === 'running' && b));
      return (
        D && r !== void 0 && (L.value = Be(l, this.options, r)),
        g && g(L.value),
        D && this.finish(),
        L
      );
    }
    get duration() {
      let { resolved: t } = this;
      return t ? E(t.calculatedDuration) : 0;
    }
    get time() {
      return E(this.currentTime);
    }
    set time(t) {
      ((t = R(t)),
        (this.currentTime = t),
        this.holdTime !== null || this.speed === 0
          ? (this.holdTime = t)
          : this.driver && (this.startTime = this.driver.now() - t / this.speed));
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(t) {
      let a = this.playbackSpeed !== t;
      ((this.playbackSpeed = t), a && (this.time = E(this.currentTime)));
    }
    play() {
      if ((this.resolver.isScheduled || this.resolver.resume(), !this._resolved)) {
        this.pendingPlayState = 'running';
        return;
      }
      if (this.isStopped) return;
      let { driver: t = zi, onPlay: a, startTime: o } = this.options;
      (this.driver || (this.driver = t((i) => this.tick(i))), a && a());
      let r = this.driver.now();
      (this.holdTime !== null
        ? (this.startTime = r - this.holdTime)
        : this.startTime
          ? this.state === 'finished' && (this.startTime = r)
          : (this.startTime = o ?? this.calcStartTime()),
        this.state === 'finished' && this.updateFinishedPromise(),
        (this.cancelTime = this.startTime),
        (this.holdTime = null),
        (this.state = 'running'),
        this.driver.start());
    }
    pause() {
      var t;
      if (!this._resolved) {
        this.pendingPlayState = 'paused';
        return;
      }
      ((this.state = 'paused'),
        (this.holdTime = (t = this.currentTime) !== null && t !== void 0 ? t : 0));
    }
    complete() {
      (this.state !== 'running' && this.play(),
        (this.pendingPlayState = this.state = 'finished'),
        (this.holdTime = null));
    }
    finish() {
      (this.teardown(), (this.state = 'finished'));
      let { onComplete: t } = this.options;
      t && t();
    }
    cancel() {
      (this.cancelTime !== null && this.tick(this.cancelTime),
        this.teardown(),
        this.updateFinishedPromise());
    }
    teardown() {
      ((this.state = 'idle'),
        this.stopDriver(),
        this.resolveFinishedPromise(),
        this.updateFinishedPromise(),
        (this.startTime = this.cancelTime = null),
        this.resolver.cancel());
    }
    stopDriver() {
      this.driver && (this.driver.stop(), (this.driver = void 0));
    }
    sample(t) {
      return ((this.startTime = 0), this.tick(t, !0));
    }
  };
var Ki = new Set(['opacity', 'clipPath', 'filter', 'transform']);
function ji(
  e,
  t,
  a,
  {
    delay: o = 0,
    duration: r = 300,
    repeat: i = 0,
    repeatType: s = 'loop',
    ease: n = 'easeInOut',
    times: l
  } = {}
) {
  let u = { [t]: a };
  l && (u.offset = l);
  let d = Ct(n, r);
  return (
    Array.isArray(d) && (u.easing = d),
    e.animate(u, {
      delay: o,
      duration: r,
      easing: Array.isArray(d) ? 'linear' : d,
      fill: 'both',
      iterations: i + 1,
      direction: s === 'reverse' ? 'alternate' : 'normal'
    })
  );
}
var Xi = Ue(() => Object.hasOwnProperty.call(Element.prototype, 'animate'));
var co = 10,
  hf = 2e4;
function xf(e) {
  return be(e.type) || e.type === 'spring' || !qa(e.ease);
}
function gf(e, t) {
  let a = new je({ ...t, keyframes: e, repeat: 0, delay: 0, isGenerator: !0 }),
    o = { done: !1, value: e[0] },
    r = [],
    i = 0;
  for (; !o.done && i < hf;) ((o = a.sample(i)), r.push(o.value), (i += co));
  return { times: void 0, keyframes: r, duration: i - co, ease: 'linear' };
}
var $i = { anticipate: _a, backInOut: $a, circInOut: Qa };
function Lf(e) {
  return e in $i;
}
var la = class extends At {
  constructor(t) {
    super(t);
    let { name: a, motionValue: o, element: r, keyframes: i } = this.options;
    ((this.resolver = new Tt(i, (s, n) => this.onKeyframesResolved(s, n), a, o, r)),
      this.resolver.scheduleResolve());
  }
  initPlayback(t, a) {
    let {
      duration: o = 300,
      times: r,
      ease: i,
      type: s,
      motionValue: n,
      name: l,
      startTime: u
    } = this.options;
    if (!n.owner || !n.owner.current) return !1;
    if ((typeof i == 'string' && Te() && Lf(i) && (i = $i[i]), xf(this.options))) {
      let { onComplete: f, onUpdate: c, motionValue: m, element: p, ...h } = this.options,
        g = gf(t, h);
      ((t = g.keyframes),
        t.length === 1 && (t[1] = t[0]),
        (o = g.duration),
        (r = g.times),
        (i = g.ease),
        (s = 'keyframes'));
    }
    let d = ji(n.owner.current, l, t, { ...this.options, duration: o, times: r, ease: i });
    return (
      (d.startTime = u ?? this.calcStartTime()),
      this.pendingTimeline
        ? (ta(d, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (d.onfinish = () => {
            let { onComplete: f } = this.options;
            (n.set(Be(t, this.options, a)), f && f(), this.cancel(), this.resolveFinishedPromise());
          }),
      { animation: d, duration: o, times: r, type: s, ease: i, keyframes: t }
    );
  }
  get duration() {
    let { resolved: t } = this;
    if (!t) return 0;
    let { duration: a } = t;
    return E(a);
  }
  get time() {
    let { resolved: t } = this;
    if (!t) return 0;
    let { animation: a } = t;
    return E(a.currentTime || 0);
  }
  set time(t) {
    let { resolved: a } = this;
    if (!a) return;
    let { animation: o } = a;
    o.currentTime = R(t);
  }
  get speed() {
    let { resolved: t } = this;
    if (!t) return 1;
    let { animation: a } = t;
    return a.playbackRate;
  }
  set speed(t) {
    let { resolved: a } = this;
    if (!a) return;
    let { animation: o } = a;
    o.playbackRate = t;
  }
  get state() {
    let { resolved: t } = this;
    if (!t) return 'idle';
    let { animation: a } = t;
    return a.playState;
  }
  get startTime() {
    let { resolved: t } = this;
    if (!t) return null;
    let { animation: a } = t;
    return a.startTime;
  }
  attachTimeline(t) {
    if (!this._resolved) this.pendingTimeline = t;
    else {
      let { resolved: a } = this;
      if (!a) return T;
      let { animation: o } = a;
      ta(o, t);
    }
    return T;
  }
  play() {
    if (this.isStopped) return;
    let { resolved: t } = this;
    if (!t) return;
    let { animation: a } = t;
    (a.playState === 'finished' && this.updateFinishedPromise(), a.play());
  }
  pause() {
    let { resolved: t } = this;
    if (!t) return;
    let { animation: a } = t;
    a.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), this.state === 'idle')) return;
    (this.resolveFinishedPromise(), this.updateFinishedPromise());
    let { resolved: t } = this;
    if (!t) return;
    let { animation: a, keyframes: o, duration: r, type: i, ease: s, times: n } = t;
    if (a.playState === 'idle' || a.playState === 'finished') return;
    if (this.time) {
      let { motionValue: u, onUpdate: d, onComplete: f, element: c, ...m } = this.options,
        p = new je({
          ...m,
          keyframes: o,
          duration: r,
          type: i,
          ease: s,
          times: n,
          isGenerator: !0
        }),
        h = R(this.time);
      u.setWithVelocity(p.sample(h - co).value, p.sample(h).value, co);
    }
    let { onStop: l } = this.options;
    (l && l(), this.cancel());
  }
  complete() {
    let { resolved: t } = this;
    t && t.animation.finish();
  }
  cancel() {
    let { resolved: t } = this;
    t && t.animation.cancel();
  }
  static supports(t) {
    let { motionValue: a, name: o, repeatDelay: r, repeatType: i, damping: s, type: n } = t;
    if (!a || !a.owner || !(a.owner.current instanceof HTMLElement)) return !1;
    let { onUpdate: l, transformTemplate: u } = a.owner.getProps();
    return Xi() && o && Ki.has(o) && !l && !u && !r && i !== 'mirror' && s !== 0 && n !== 'inertia';
  }
};
var If = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  Cf = (e) => ({
    type: 'spring',
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
  }),
  Sf = { type: 'keyframes', duration: 0.8 },
  yf = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  _i = (e, { keyframes: t }) =>
    t.length > 2 ? Sf : K.has(e) ? (e.startsWith('scale') ? Cf(t[1]) : If) : yf;
function Zi({
  when: e,
  delay: t,
  delayChildren: a,
  staggerChildren: o,
  staggerDirection: r,
  repeat: i,
  repeatType: s,
  repeatDelay: n,
  from: l,
  elapsed: u,
  ...d
}) {
  return !!Object.keys(d).length;
}
var Mt =
  (e, t, a, o = {}, r, i) =>
  (s) => {
    let n = we(o, e) || {},
      l = n.delay || o.delay || 0,
      { elapsed: u = 0 } = o;
    u = u - R(l);
    let d = {
      keyframes: Array.isArray(a) ? a : [null, a],
      ease: 'easeOut',
      velocity: t.getVelocity(),
      ...n,
      delay: -u,
      onUpdate: (c) => {
        (t.set(c), n.onUpdate && n.onUpdate(c));
      },
      onComplete: () => {
        (s(), n.onComplete && n.onComplete());
      },
      name: e,
      motionValue: t,
      element: i ? void 0 : r
    };
    (Zi(n) || (d = { ...d, ..._i(e, d) }),
      d.duration && (d.duration = R(d.duration)),
      d.repeatDelay && (d.repeatDelay = R(d.repeatDelay)),
      d.from !== void 0 && (d.keyframes[0] = d.from));
    let f = !1;
    if (
      ((d.type === !1 || (d.duration === 0 && !d.repeatDelay)) &&
        ((d.duration = 0), d.delay === 0 && (f = !0)),
      (Ka.current || ot.skipAnimations) && ((f = !0), (d.duration = 0), (d.delay = 0)),
      f && !i && t.get() !== void 0)
    ) {
      let c = Be(d.keyframes, n);
      if (c !== void 0)
        return (
          v.update(() => {
            (d.onUpdate(c), d.onComplete());
          }),
          new ea([])
        );
    }
    return !i && la.supports(d) ? new la(d) : new je(d);
  };
function vf({ protectedKeys: e, needsAnimating: t }, a) {
  let o = e.hasOwnProperty(a) && t[a] !== !0;
  return ((t[a] = !1), o);
}
function mo(e, t, { delay: a = 0, transitionOverride: o, type: r } = {}) {
  var i;
  let { transition: s = e.getDefaultTransition(), transitionEnd: n, ...l } = t;
  o && (s = o);
  let u = [],
    d = r && e.animationState && e.animationState.getState()[r];
  for (let f in l) {
    let c = e.getValue(f, (i = e.latestValues[f]) !== null && i !== void 0 ? i : null),
      m = l[f];
    if (m === void 0 || (d && vf(d, f))) continue;
    let p = { delay: a, ...we(s || {}, f) },
      h = !1;
    if (window.MotionHandoffAnimation) {
      let x = za(e);
      if (x) {
        let C = window.MotionHandoffAnimation(x, f, v);
        C !== null && ((p.startTime = C), (h = !0));
      }
    }
    (oa(e, f), c.start(Mt(f, c, m, e.shouldReduceMotion && Na.has(f) ? { type: !1 } : p, e, h)));
    let g = c.animation;
    g && u.push(g);
  }
  return (
    n &&
      Promise.all(u).then(() => {
        v.update(() => {
          n && ui(e, n);
        });
      }),
    u
  );
}
function po(e, t, a = {}) {
  var o;
  let r = Pe(
      e,
      t,
      a.type === 'exit'
        ? (o = e.presenceContext) === null || o === void 0
          ? void 0
          : o.custom
        : void 0
    ),
    { transition: i = e.getDefaultTransition() || {} } = r || {};
  a.transitionOverride && (i = a.transitionOverride);
  let s = r ? () => Promise.all(mo(e, r, a)) : () => Promise.resolve(),
    n =
      e.variantChildren && e.variantChildren.size
        ? (u = 0) => {
            let { delayChildren: d = 0, staggerChildren: f, staggerDirection: c } = i;
            return Pf(e, t, d + u, f, c, a);
          }
        : () => Promise.resolve(),
    { when: l } = i;
  if (l) {
    let [u, d] = l === 'beforeChildren' ? [s, n] : [n, s];
    return u().then(() => d());
  } else return Promise.all([s(), n(a.delay)]);
}
function Pf(e, t, a = 0, o = 0, r = 1, i) {
  let s = [],
    n = (e.variantChildren.size - 1) * o,
    l = r === 1 ? (u = 0) => u * o : (u = 0) => n - u * o;
  return (
    Array.from(e.variantChildren)
      .sort(wf)
      .forEach((u, d) => {
        (u.notify('AnimationStart', t),
          s.push(po(u, t, { ...i, delay: a + l(d) }).then(() => u.notify('AnimationComplete', t))));
      }),
    Promise.all(s)
  );
}
function wf(e, t) {
  return e.sortNodePosition(t);
}
function Yi(e, t, a = {}) {
  e.notify('AnimationStart', t);
  let o;
  if (Array.isArray(t)) {
    let r = t.map((i) => po(e, i, a));
    o = Promise.all(r);
  } else if (typeof t == 'string') o = po(e, t, a);
  else {
    let r = typeof t == 'function' ? Pe(e, t, a.custom) : t;
    o = Promise.all(mo(e, r, a));
  }
  return o.then(() => {
    e.notify('AnimationComplete', t);
  });
}
var bf = $t.length;
function wr(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    let a = e.parent ? wr(e.parent) || {} : {};
    return (e.props.initial !== void 0 && (a.initial = e.props.initial), a);
  }
  let t = {};
  for (let a = 0; a < bf; a++) {
    let o = $t[a],
      r = e.props[o];
    (de(r) || r === !1) && (t[o] = r);
  }
  return t;
}
var Tf = [...Pa].reverse(),
  Af = Pa.length;
function kf(e) {
  return (t) => Promise.all(t.map(({ animation: a, options: o }) => Yi(e, a, o)));
}
function Ji(e) {
  let t = kf(e),
    a = Qi(),
    o = !0,
    r = (l) => (u, d) => {
      var f;
      let c = Pe(
        e,
        d,
        l === 'exit'
          ? (f = e.presenceContext) === null || f === void 0
            ? void 0
            : f.custom
          : void 0
      );
      if (c) {
        let { transition: m, transitionEnd: p, ...h } = c;
        u = { ...u, ...h, ...p };
      }
      return u;
    };
  function i(l) {
    t = l(e);
  }
  function s(l) {
    let { props: u } = e,
      d = wr(e.parent) || {},
      f = [],
      c = new Set(),
      m = {},
      p = 1 / 0;
    for (let g = 0; g < Af; g++) {
      let x = Tf[g],
        C = a[x],
        S = u[x] !== void 0 ? u[x] : d[x],
        P = de(S),
        L = x === l ? C.isActive : null;
      L === !1 && (p = g);
      let b = S === d[x] && S !== u[x] && P;
      if (
        (b && o && e.manuallyAnimateOnMount && (b = !1),
        (C.protectedKeys = { ...m }),
        (!C.isActive && L === null) || (!S && !C.prevProp) || ve(S) || typeof S == 'boolean')
      )
        continue;
      let D = Mf(C.prevProp, S),
        y = D || (x === l && C.isActive && !b && P) || (g > p && P),
        H = !1,
        Y = Array.isArray(S) ? S : [S],
        Ye = Y.reduce(r(x), {});
      L === !1 && (Ye = {});
      let { prevResolvedValues: $r = {} } = C,
        kl = { ...$r, ...Ye },
        _r = (G) => {
          ((y = !0), c.has(G) && ((H = !0), c.delete(G)), (C.needsAnimating[G] = !0));
          let ne = e.getValue(G);
          ne && (ne.liveStyle = !1);
        };
      for (let G in kl) {
        let ne = Ye[G],
          qo = $r[G];
        if (m.hasOwnProperty(G)) continue;
        let Uo = !1;
        (Zt(ne) && Zt(qo) ? (Uo = !er(ne, qo)) : (Uo = ne !== qo),
          Uo
            ? ne != null
              ? _r(G)
              : c.add(G)
            : ne !== void 0 && c.has(G)
              ? _r(G)
              : (C.protectedKeys[G] = !0));
      }
      ((C.prevProp = S),
        (C.prevResolvedValues = Ye),
        C.isActive && (m = { ...m, ...Ye }),
        o && e.blockInitialAnimation && (y = !1),
        y && (!(b && D) || H) && f.push(...Y.map((G) => ({ animation: G, options: { type: x } }))));
    }
    if (c.size) {
      let g = {};
      (c.forEach((x) => {
        let C = e.getBaseTarget(x),
          S = e.getValue(x);
        (S && (S.liveStyle = !0), (g[x] = C ?? null));
      }),
        f.push({ animation: g }));
    }
    let h = !!f.length;
    return (
      o && (u.initial === !1 || u.initial === u.animate) && !e.manuallyAnimateOnMount && (h = !1),
      (o = !1),
      h ? t(f) : Promise.resolve()
    );
  }
  function n(l, u) {
    var d;
    if (a[l].isActive === u) return Promise.resolve();
    ((d = e.variantChildren) === null ||
      d === void 0 ||
      d.forEach((c) => {
        var m;
        return (m = c.animationState) === null || m === void 0 ? void 0 : m.setActive(l, u);
      }),
      (a[l].isActive = u));
    let f = s(l);
    for (let c in a) a[c].protectedKeys = {};
    return f;
  }
  return {
    animateChanges: s,
    setActive: n,
    setAnimateFunction: i,
    getState: () => a,
    reset: () => {
      ((a = Qi()), (o = !0));
    }
  };
}
function Mf(e, t) {
  return typeof t == 'string' ? t !== e : Array.isArray(t) ? !er(t, e) : !1;
}
function Xe(e = !1) {
  return { isActive: e, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function Qi() {
  return {
    animate: Xe(!0),
    whileInView: Xe(),
    whileHover: Xe(),
    whileTap: Xe(),
    whileDrag: Xe(),
    whileFocus: Xe(),
    exit: Xe()
  };
}
var O = class {
  constructor(t) {
    ((this.isMounted = !1), (this.node = t));
  }
  update() {}
};
var ho = class extends O {
  constructor(t) {
    (super(t), t.animationState || (t.animationState = Ji(t)));
  }
  updateAnimationControlsSubscription() {
    let { animate: t } = this.node.getProps();
    ve(t) && (this.unmountControls = t.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    let { animate: t } = this.node.getProps(),
      { animate: a } = this.node.prevProps || {};
    t !== a && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var t;
    (this.node.animationState.reset(),
      (t = this.unmountControls) === null || t === void 0 || t.call(this));
  }
};
var Df = 0,
  xo = class extends O {
    constructor() {
      (super(...arguments), (this.id = Df++));
    }
    update() {
      if (!this.node.presenceContext) return;
      let { isPresent: t, onExitComplete: a } = this.node.presenceContext,
        { isPresent: o } = this.node.prevPresenceContext || {};
      if (!this.node.animationState || t === o) return;
      let r = this.node.animationState.setActive('exit', !t);
      a && !t && r.then(() => a(this.id));
    }
    mount() {
      let { register: t } = this.node.presenceContext || {};
      t && (this.unmount = t(this.id));
    }
    unmount() {}
  };
var en = { animation: { Feature: ho }, exit: { Feature: xo } };
function pe(e, t, a, o = { passive: !0 }) {
  return (e.addEventListener(t, a, o), () => e.removeEventListener(t, a));
}
function he(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
var tn = (e) => (t) => Ne(t) && e(t, he(t));
function Fe(e, t, a, o) {
  return pe(e, t, tn(a), o);
}
var an = (e, t) => Math.abs(e - t);
function on(e, t) {
  let a = an(e.x, t.x),
    o = an(e.y, t.y);
  return Math.sqrt(a ** 2 + o ** 2);
}
var Dt = class {
  constructor(t, a, { transformPagePoint: o, contextWindow: r, dragSnapToOrigin: i = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        let f = Tr(this.lastMoveEventInfo, this.history),
          c = this.startEvent !== null,
          m = on(f.offset, { x: 0, y: 0 }) >= 3;
        if (!c && !m) return;
        let { point: p } = f,
          { timestamp: h } = B;
        this.history.push({ ...p, timestamp: h });
        let { onStart: g, onMove: x } = this.handlers;
        (c || (g && g(this.lastMoveEvent, f), (this.startEvent = this.lastMoveEvent)),
          x && x(this.lastMoveEvent, f));
      }),
      (this.handlePointerMove = (f, c) => {
        ((this.lastMoveEvent = f),
          (this.lastMoveEventInfo = br(c, this.transformPagePoint)),
          v.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (f, c) => {
        this.end();
        let { onEnd: m, onSessionEnd: p, resumeAnimation: h } = this.handlers;
        if ((this.dragSnapToOrigin && h && h(), !(this.lastMoveEvent && this.lastMoveEventInfo)))
          return;
        let g = Tr(
          f.type === 'pointercancel' ? this.lastMoveEventInfo : br(c, this.transformPagePoint),
          this.history
        );
        (this.startEvent && m && m(f, g), p && p(f, g));
      }),
      !Ne(t))
    )
      return;
    ((this.dragSnapToOrigin = i),
      (this.handlers = a),
      (this.transformPagePoint = o),
      (this.contextWindow = r || window));
    let s = he(t),
      n = br(s, this.transformPagePoint),
      { point: l } = n,
      { timestamp: u } = B;
    this.history = [{ ...l, timestamp: u }];
    let { onSessionStart: d } = a;
    (d && d(t, Tr(n, this.history)),
      (this.removeListeners = se(
        Fe(this.contextWindow, 'pointermove', this.handlePointerMove),
        Fe(this.contextWindow, 'pointerup', this.handlePointerUp),
        Fe(this.contextWindow, 'pointercancel', this.handlePointerUp)
      )));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    (this.removeListeners && this.removeListeners(), $(this.updatePoint));
  }
};
function br(e, t) {
  return t ? { point: t(e.point) } : e;
}
function rn(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Tr({ point: e }, t) {
  return { point: e, delta: rn(e, sn(t)), offset: rn(e, Rf(t)), velocity: Bf(t, 0.1) };
}
function Rf(e) {
  return e[0];
}
function sn(e) {
  return e[e.length - 1];
}
function Bf(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let a = e.length - 1,
    o = null,
    r = sn(e);
  for (; a >= 0 && ((o = e[a]), !(r.timestamp - o.timestamp > R(t)));) a--;
  if (!o) return { x: 0, y: 0 };
  let i = E(r.timestamp - o.timestamp);
  if (i === 0) return { x: 0, y: 0 };
  let s = { x: (r.x - o.x) / i, y: (r.y - o.y) / i };
  return (s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s);
}
var dn = 1e-4,
  Ff = 1 - dn,
  Vf = 1 + dn,
  fn = 0.01,
  Of = 0 - fn,
  Ef = 0 + fn;
function U(e) {
  return e.max - e.min;
}
function cn(e, t, a) {
  return Math.abs(e - t) <= a;
}
function nn(e, t, a, o = 0.5) {
  ((e.origin = o),
    (e.originPoint = w(t.min, t.max, e.origin)),
    (e.scale = U(a) / U(t)),
    (e.translate = w(a.min, a.max, e.origin) - e.originPoint),
    ((e.scale >= Ff && e.scale <= Vf) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= Of && e.translate <= Ef) || isNaN(e.translate)) && (e.translate = 0));
}
function Rt(e, t, a, o) {
  (nn(e.x, t.x, a.x, o ? o.originX : void 0), nn(e.y, t.y, a.y, o ? o.originY : void 0));
}
function ln(e, t, a) {
  ((e.min = a.min + t.min), (e.max = e.min + U(t)));
}
function mn(e, t, a) {
  (ln(e.x, t.x, a.x), ln(e.y, t.y, a.y));
}
function un(e, t, a) {
  ((e.min = t.min - a.min), (e.max = e.min + U(t)));
}
function Bt(e, t, a) {
  (un(e.x, t.x, a.x), un(e.y, t.y, a.y));
}
function Ln(e, { min: t, max: a }, o) {
  return (
    t !== void 0 && e < t
      ? (e = o ? w(t, e, o.min) : Math.max(e, t))
      : a !== void 0 && e > a && (e = o ? w(a, e, o.max) : Math.min(e, a)),
    e
  );
}
function pn(e, t, a) {
  return {
    min: t !== void 0 ? e.min + t : void 0,
    max: a !== void 0 ? e.max + a - (e.max - e.min) : void 0
  };
}
function In(e, { top: t, left: a, bottom: o, right: r }) {
  return { x: pn(e.x, a, r), y: pn(e.y, t, o) };
}
function hn(e, t) {
  let a = t.min - e.min,
    o = t.max - e.max;
  return (t.max - t.min < e.max - e.min && ([a, o] = [o, a]), { min: a, max: o });
}
function Cn(e, t) {
  return { x: hn(e.x, t.x), y: hn(e.y, t.y) };
}
function Sn(e, t) {
  let a = 0.5,
    o = U(e),
    r = U(t);
  return (
    r > o ? (a = X(t.min, t.max - o, e.min)) : o > r && (a = X(e.min, e.max - r, t.min)),
    q(0, 1, a)
  );
}
function yn(e, t) {
  let a = {};
  return (
    t.min !== void 0 && (a.min = t.min - e.min),
    t.max !== void 0 && (a.max = t.max - e.min),
    a
  );
}
var go = 0.35;
function vn(e = go) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = go),
    { x: xn(e, 'left', 'right'), y: xn(e, 'top', 'bottom') }
  );
}
function xn(e, t, a) {
  return { min: gn(e, t), max: gn(e, a) };
}
function gn(e, t) {
  return typeof e == 'number' ? e : e[t] || 0;
}
var Pn = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  $e = () => ({ x: Pn(), y: Pn() }),
  wn = () => ({ min: 0, max: 0 }),
  M = () => ({ x: wn(), y: wn() });
function j(e) {
  return [e('x'), e('y')];
}
function Lo({ top: e, left: t, right: a, bottom: o }) {
  return { x: { min: t, max: a }, y: { min: e, max: o } };
}
function bn({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Tn(e, t) {
  if (!t) return e;
  let a = t({ x: e.left, y: e.top }),
    o = t({ x: e.right, y: e.bottom });
  return { top: a.y, left: a.x, bottom: o.y, right: o.x };
}
function Ar(e) {
  return e === void 0 || e === 1;
}
function Io({ scale: e, scaleX: t, scaleY: a }) {
  return !Ar(e) || !Ar(t) || !Ar(a);
}
function xe(e) {
  return Io(e) || kr(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function kr(e) {
  return An(e.x) || An(e.y);
}
function An(e) {
  return e && e !== '0%';
}
function ua(e, t, a) {
  let o = e - a,
    r = t * o;
  return a + r;
}
function kn(e, t, a, o, r) {
  return (r !== void 0 && (e = ua(e, r, o)), ua(e, a, o) + t);
}
function Mr(e, t = 0, a = 1, o, r) {
  ((e.min = kn(e.min, t, a, o, r)), (e.max = kn(e.max, t, a, o, r)));
}
function Dr(e, { x: t, y: a }) {
  (Mr(e.x, t.translate, t.scale, t.originPoint), Mr(e.y, a.translate, a.scale, a.originPoint));
}
var Mn = 0.999999999999,
  Dn = 1.0000000000001;
function Bn(e, t, a, o = !1) {
  let r = a.length;
  if (!r) return;
  t.x = t.y = 1;
  let i, s;
  for (let n = 0; n < r; n++) {
    ((i = a[n]), (s = i.projectionDelta));
    let { visualElement: l } = i.options;
    (l && l.props.style && l.props.style.display === 'contents') ||
      (o &&
        i.options.layoutScroll &&
        i.scroll &&
        i !== i.root &&
        _e(e, { x: -i.scroll.offset.x, y: -i.scroll.offset.y }),
      s && ((t.x *= s.x.scale), (t.y *= s.y.scale), Dr(e, s)),
      o && xe(i.latestValues) && _e(e, i.latestValues));
  }
  (t.x < Dn && t.x > Mn && (t.x = 1), t.y < Dn && t.y > Mn && (t.y = 1));
}
function Ve(e, t) {
  ((e.min = e.min + t), (e.max = e.max + t));
}
function Rn(e, t, a, o, r = 0.5) {
  let i = w(e.min, e.max, r);
  Mr(e, t, a, i, o);
}
function _e(e, t) {
  (Rn(e.x, t.x, t.scaleX, t.scale, t.originX), Rn(e.y, t.y, t.scaleY, t.scale, t.originY));
}
function Rr(e, t) {
  return Lo(Tn(e.getBoundingClientRect(), t));
}
function Fn(e, t, a) {
  let o = Rr(e, a),
    { scroll: r } = t;
  return (r && (Ve(o.x, r.offset.x), Ve(o.y, r.offset.y)), o);
}
var Co = ({ current: e }) => (e ? e.ownerDocument.defaultView : null);
var qf = new WeakMap(),
  yo = class {
    constructor(t) {
      ((this.openDragLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = M()),
        (this.visualElement = t));
    }
    start(t, { snapToCursor: a = !1 } = {}) {
      let { presenceContext: o } = this.visualElement;
      if (o && o.isPresent === !1) return;
      let r = (d) => {
          let { dragSnapToOrigin: f } = this.getProps();
          (f ? this.pauseAnimation() : this.stopAnimation(), a && this.snapToCursor(he(d).point));
        },
        i = (d, f) => {
          let { drag: c, dragPropagation: m, onDragStart: p } = this.getProps();
          if (
            c &&
            !m &&
            (this.openDragLock && this.openDragLock(),
            (this.openDragLock = lr(c)),
            !this.openDragLock)
          )
            return;
          ((this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            j((g) => {
              let x = this.getAxisMotionValue(g).get() || 0;
              if (W.test(x)) {
                let { projection: C } = this.visualElement;
                if (C && C.layout) {
                  let S = C.layout.layoutBox[g];
                  S && (x = U(S) * (parseFloat(x) / 100));
                }
              }
              this.originPoint[g] = x;
            }),
            p && v.postRender(() => p(d, f)),
            oa(this.visualElement, 'transform'));
          let { animationState: h } = this.visualElement;
          h && h.setActive('whileDrag', !0);
        },
        s = (d, f) => {
          let {
            dragPropagation: c,
            dragDirectionLock: m,
            onDirectionLock: p,
            onDrag: h
          } = this.getProps();
          if (!c && !this.openDragLock) return;
          let { offset: g } = f;
          if (m && this.currentDirection === null) {
            ((this.currentDirection = Uf(g)),
              this.currentDirection !== null && p && p(this.currentDirection));
            return;
          }
          (this.updateAxis('x', f.point, g),
            this.updateAxis('y', f.point, g),
            this.visualElement.render(),
            h && h(d, f));
        },
        n = (d, f) => this.stop(d, f),
        l = () =>
          j((d) => {
            var f;
            return (
              this.getAnimationState(d) === 'paused' &&
              ((f = this.getAxisMotionValue(d).animation) === null || f === void 0
                ? void 0
                : f.play())
            );
          }),
        { dragSnapToOrigin: u } = this.getProps();
      this.panSession = new Dt(
        t,
        { onSessionStart: r, onStart: i, onMove: s, onSessionEnd: n, resumeAnimation: l },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: u,
          contextWindow: Co(this.visualElement)
        }
      );
    }
    stop(t, a) {
      let o = this.isDragging;
      if ((this.cancel(), !o)) return;
      let { velocity: r } = a;
      this.startAnimation(r);
      let { onDragEnd: i } = this.getProps();
      i && v.postRender(() => i(t, a));
    }
    cancel() {
      this.isDragging = !1;
      let { projection: t, animationState: a } = this.visualElement;
      (t && (t.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        (this.panSession = void 0));
      let { dragPropagation: o } = this.getProps();
      (!o && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
        a && a.setActive('whileDrag', !1));
    }
    updateAxis(t, a, o) {
      let { drag: r } = this.getProps();
      if (!o || !So(t, r, this.currentDirection)) return;
      let i = this.getAxisMotionValue(t),
        s = this.originPoint[t] + o[t];
      (this.constraints && this.constraints[t] && (s = Ln(s, this.constraints[t], this.elastic[t])),
        i.set(s));
    }
    resolveConstraints() {
      var t;
      let { dragConstraints: a, dragElastic: o } = this.getProps(),
        r =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : (t = this.visualElement.projection) === null || t === void 0
              ? void 0
              : t.layout,
        i = this.constraints;
      (a && fe(a)
        ? this.constraints || (this.constraints = this.resolveRefConstraints())
        : a && r
          ? (this.constraints = In(r.layoutBox, a))
          : (this.constraints = !1),
        (this.elastic = vn(o)),
        i !== this.constraints &&
          r &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          j((s) => {
            this.constraints !== !1 &&
              this.getAxisMotionValue(s) &&
              (this.constraints[s] = yn(r.layoutBox[s], this.constraints[s]));
          }));
    }
    resolveRefConstraints() {
      let { dragConstraints: t, onMeasureDragConstraints: a } = this.getProps();
      if (!t || !fe(t)) return !1;
      let o = t.current;
      J(
        o !== null,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
      );
      let { projection: r } = this.visualElement;
      if (!r || !r.layout) return !1;
      let i = Fn(o, r.root, this.visualElement.getTransformPagePoint()),
        s = Cn(r.layout.layoutBox, i);
      if (a) {
        let n = a(bn(s));
        ((this.hasMutatedConstraints = !!n), n && (s = Lo(n)));
      }
      return s;
    }
    startAnimation(t) {
      let {
          drag: a,
          dragMomentum: o,
          dragElastic: r,
          dragTransition: i,
          dragSnapToOrigin: s,
          onDragTransitionEnd: n
        } = this.getProps(),
        l = this.constraints || {},
        u = j((d) => {
          if (!So(d, a, this.currentDirection)) return;
          let f = (l && l[d]) || {};
          s && (f = { min: 0, max: 0 });
          let c = r ? 200 : 1e6,
            m = r ? 40 : 1e7,
            p = {
              type: 'inertia',
              velocity: o ? t[d] : 0,
              bounceStiffness: c,
              bounceDamping: m,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...i,
              ...f
            };
          return this.startAxisValueAnimation(d, p);
        });
      return Promise.all(u).then(n);
    }
    startAxisValueAnimation(t, a) {
      let o = this.getAxisMotionValue(t);
      return (oa(this.visualElement, t), o.start(Mt(t, o, 0, a, this.visualElement, !1)));
    }
    stopAnimation() {
      j((t) => this.getAxisMotionValue(t).stop());
    }
    pauseAnimation() {
      j((t) => {
        var a;
        return (a = this.getAxisMotionValue(t).animation) === null || a === void 0
          ? void 0
          : a.pause();
      });
    }
    getAnimationState(t) {
      var a;
      return (a = this.getAxisMotionValue(t).animation) === null || a === void 0 ? void 0 : a.state;
    }
    getAxisMotionValue(t) {
      let a = `_drag${t.toUpperCase()}`,
        o = this.visualElement.getProps(),
        r = o[a];
      return r || this.visualElement.getValue(t, (o.initial ? o.initial[t] : void 0) || 0);
    }
    snapToCursor(t) {
      j((a) => {
        let { drag: o } = this.getProps();
        if (!So(a, o, this.currentDirection)) return;
        let { projection: r } = this.visualElement,
          i = this.getAxisMotionValue(a);
        if (r && r.layout) {
          let { min: s, max: n } = r.layout.layoutBox[a];
          i.set(t[a] - w(s, n, 0.5));
        }
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      let { drag: t, dragConstraints: a } = this.getProps(),
        { projection: o } = this.visualElement;
      if (!fe(a) || !o || !this.constraints) return;
      this.stopAnimation();
      let r = { x: 0, y: 0 };
      j((s) => {
        let n = this.getAxisMotionValue(s);
        if (n && this.constraints !== !1) {
          let l = n.get();
          r[s] = Sn({ min: l, max: l }, this.constraints[s]);
        }
      });
      let { transformTemplate: i } = this.visualElement.getProps();
      ((this.visualElement.current.style.transform = i ? i({}, '') : 'none'),
        o.root && o.root.updateScroll(),
        o.updateLayout(),
        this.resolveConstraints(),
        j((s) => {
          if (!So(s, t, null)) return;
          let n = this.getAxisMotionValue(s),
            { min: l, max: u } = this.constraints[s];
          n.set(w(l, u, r[s]));
        }));
    }
    addListeners() {
      if (!this.visualElement.current) return;
      qf.set(this.visualElement, this);
      let t = this.visualElement.current,
        a = Fe(t, 'pointerdown', (l) => {
          let { drag: u, dragListener: d = !0 } = this.getProps();
          u && d && this.start(l);
        }),
        o = () => {
          let { dragConstraints: l } = this.getProps();
          fe(l) && l.current && (this.constraints = this.resolveRefConstraints());
        },
        { projection: r } = this.visualElement,
        i = r.addEventListener('measure', o);
      (r && !r.layout && (r.root && r.root.updateScroll(), r.updateLayout()), v.read(o));
      let s = pe(window, 'resize', () => this.scalePositionWithinConstraints()),
        n = r.addEventListener('didUpdate', ({ delta: l, hasLayoutChanged: u }) => {
          this.isDragging &&
            u &&
            (j((d) => {
              let f = this.getAxisMotionValue(d);
              f && ((this.originPoint[d] += l[d].translate), f.set(f.get() + l[d].translate));
            }),
            this.visualElement.render());
        });
      return () => {
        (s(), a(), i(), n && n());
      };
    }
    getProps() {
      let t = this.visualElement.getProps(),
        {
          drag: a = !1,
          dragDirectionLock: o = !1,
          dragPropagation: r = !1,
          dragConstraints: i = !1,
          dragElastic: s = go,
          dragMomentum: n = !0
        } = t;
      return {
        ...t,
        drag: a,
        dragDirectionLock: o,
        dragPropagation: r,
        dragConstraints: i,
        dragElastic: s,
        dragMomentum: n
      };
    }
  };
function So(e, t, a) {
  return (t === !0 || t === e) && (a === null || a === e);
}
function Uf(e, t = 10) {
  let a = null;
  return (Math.abs(e.y) > t ? (a = 'y') : Math.abs(e.x) > t && (a = 'x'), a);
}
var vo = class extends O {
  constructor(t) {
    (super(t),
      (this.removeGroupControls = T),
      (this.removeListeners = T),
      (this.controls = new yo(t)));
  }
  mount() {
    let { dragControls: t } = this.node.getProps();
    (t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || T));
  }
  unmount() {
    (this.removeGroupControls(), this.removeListeners());
  }
};
var Vn = (e) => (t, a) => {
    e && v.postRender(() => e(t, a));
  },
  Po = class extends O {
    constructor() {
      (super(...arguments), (this.removePointerDownListener = T));
    }
    onPointerDown(t) {
      this.session = new Dt(t, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: Co(this.node)
      });
    }
    createPanHandlers() {
      let { onPanSessionStart: t, onPanStart: a, onPan: o, onPanEnd: r } = this.node.getProps();
      return {
        onSessionStart: Vn(t),
        onStart: Vn(a),
        onMove: o,
        onEnd: (i, s) => {
          (delete this.session, r && v.postRender(() => r(i, s)));
        }
      };
    }
    mount() {
      this.removePointerDownListener = Fe(this.node.current, 'pointerdown', (t) =>
        this.onPointerDown(t)
      );
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      (this.removePointerDownListener(), this.session && this.session.end());
    }
  };
import { jsx as Hf } from 'react/jsx-runtime';
import { useContext as qn, Component as Nf } from 'react';
var Ft = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function On(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
var Vt = {
  correct: (e, t) => {
    if (!t.target) return e;
    if (typeof e == 'string')
      if (I.test(e)) e = parseFloat(e);
      else return e;
    let a = On(e, t.target.x),
      o = On(e, t.target.y);
    return `${a}% ${o}%`;
  }
};
var En = {
  correct: (e, { treeScale: t, projectionDelta: a }) => {
    let o = e,
      r = z.parse(e);
    if (r.length > 5) return o;
    let i = z.createTransformer(e),
      s = typeof r[0] != 'number' ? 1 : 0,
      n = a.x.scale * t.x,
      l = a.y.scale * t.y;
    ((r[0 + s] /= n), (r[1 + s] /= l));
    let u = w(n, l, 0.5);
    return (
      typeof r[2 + s] == 'number' && (r[2 + s] /= u),
      typeof r[3 + s] == 'number' && (r[3 + s] /= u),
      i(r)
    );
  }
};
var Br = class extends Nf {
  componentDidMount() {
    let { visualElement: t, layoutGroup: a, switchLayoutGroup: o, layoutId: r } = this.props,
      { projection: i } = t;
    (js(Gf),
      i &&
        (a.group && a.group.add(i),
        o && o.register && r && o.register(i),
        i.root.didUpdate(),
        i.addEventListener('animationComplete', () => {
          this.safeToRemove();
        }),
        i.setOptions({ ...i.options, onExitComplete: () => this.safeToRemove() })),
      (Ft.hasEverUpdated = !0));
  }
  getSnapshotBeforeUpdate(t) {
    let { layoutDependency: a, visualElement: o, drag: r, isPresent: i } = this.props,
      s = o.projection;
    return (
      s &&
        ((s.isPresent = i),
        r || t.layoutDependency !== a || a === void 0 ? s.willUpdate() : this.safeToRemove(),
        t.isPresent !== i &&
          (i
            ? s.promote()
            : s.relegate() ||
              v.postRender(() => {
                let n = s.getStack();
                (!n || !n.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    let { projection: t } = this.props.visualElement;
    t &&
      (t.root.didUpdate(),
      st.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    let { visualElement: t, layoutGroup: a, switchLayoutGroup: o } = this.props,
      { projection: r } = t;
    r &&
      (r.scheduleCheckAfterUnmount(),
      a && a.group && a.group.remove(r),
      o && o.deregister && o.deregister(r));
  }
  safeToRemove() {
    let { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
};
function wo(e) {
  let [t, a] = La(),
    o = qn(Je);
  return Hf(Br, { ...e, layoutGroup: o, switchLayoutGroup: qn(Ta), isPresent: t, safeToRemove: a });
}
var Gf = {
  borderRadius: {
    ...Vt,
    applyTo: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius'
    ]
  },
  borderTopLeftRadius: Vt,
  borderTopRightRadius: Vt,
  borderBottomLeftRadius: Vt,
  borderBottomRightRadius: Vt,
  boxShadow: En
};
function Un(e, t, a) {
  let o = A(e) ? e : me(e);
  return (o.start(Mt('', o, t, a)), o.animation);
}
function Hn(e) {
  return e instanceof SVGElement && e.tagName !== 'svg';
}
var Nn = (e, t) => e.depth - t.depth;
var bo = class {
  constructor() {
    ((this.children = []), (this.isDirty = !1));
  }
  add(t) {
    (yt(this.children, t), (this.isDirty = !0));
  }
  remove(t) {
    (vt(this.children, t), (this.isDirty = !0));
  }
  forEach(t) {
    (this.isDirty && this.children.sort(Nn), (this.isDirty = !1), this.children.forEach(t));
  }
};
function Gn(e, t) {
  let a = N.now(),
    o = ({ timestamp: r }) => {
      let i = r - a;
      i >= t && ($(o), e(i - t));
    };
  return (v.read(o, !0), () => $(o));
}
var jn = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  Wf = jn.length,
  Wn = (e) => (typeof e == 'string' ? parseFloat(e) : e),
  zn = (e) => typeof e == 'number' || I.test(e);
function Xn(e, t, a, o, r, i) {
  r
    ? ((e.opacity = w(0, a.opacity !== void 0 ? a.opacity : 1, zf(o))),
      (e.opacityExit = w(t.opacity !== void 0 ? t.opacity : 1, 0, Kf(o))))
    : i &&
      (e.opacity = w(
        t.opacity !== void 0 ? t.opacity : 1,
        a.opacity !== void 0 ? a.opacity : 1,
        o
      ));
  for (let s = 0; s < Wf; s++) {
    let n = `border${jn[s]}Radius`,
      l = Kn(t, n),
      u = Kn(a, n);
    if (l === void 0 && u === void 0) continue;
    (l || (l = 0),
      u || (u = 0),
      l === 0 || u === 0 || zn(l) === zn(u)
        ? ((e[n] = Math.max(w(Wn(l), Wn(u), o), 0)), (W.test(u) || W.test(l)) && (e[n] += '%'))
        : (e[n] = u));
  }
  (t.rotate || a.rotate) && (e.rotate = w(t.rotate || 0, a.rotate || 0, o));
}
function Kn(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius;
}
var zf = $n(0, 0.5, Ya),
  Kf = $n(0.5, 0.95, T);
function $n(e, t, a) {
  return (o) => (o < e ? 0 : o > t ? 1 : a(X(e, t, o)));
}
function _n(e, t) {
  ((e.min = t.min), (e.max = t.max));
}
function Z(e, t) {
  (_n(e.x, t.x), _n(e.y, t.y));
}
function Fr(e, t) {
  ((e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin));
}
function Zn(e, t, a, o, r) {
  return ((e -= t), (e = ua(e, 1 / a, o)), r !== void 0 && (e = ua(e, 1 / r, o)), e);
}
function jf(e, t = 0, a = 1, o = 0.5, r, i = e, s = e) {
  if (
    (W.test(t) && ((t = parseFloat(t)), (t = w(s.min, s.max, t / 100) - s.min)),
    typeof t != 'number')
  )
    return;
  let n = w(i.min, i.max, o);
  (e === i && (n -= t), (e.min = Zn(e.min, t, a, n, r)), (e.max = Zn(e.max, t, a, n, r)));
}
function Yn(e, t, [a, o, r], i, s) {
  jf(e, t[a], t[o], t[r], t.scale, i, s);
}
var Xf = ['x', 'scaleX', 'originX'],
  $f = ['y', 'scaleY', 'originY'];
function Vr(e, t, a, o) {
  (Yn(e.x, t, Xf, a ? a.x : void 0, o ? o.x : void 0),
    Yn(e.y, t, $f, a ? a.y : void 0, o ? o.y : void 0));
}
function Qn(e) {
  return e.translate === 0 && e.scale === 1;
}
function Or(e) {
  return Qn(e.x) && Qn(e.y);
}
function Jn(e, t) {
  return e.min === t.min && e.max === t.max;
}
function tl(e, t) {
  return Jn(e.x, t.x) && Jn(e.y, t.y);
}
function el(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function Er(e, t) {
  return el(e.x, t.x) && el(e.y, t.y);
}
function qr(e) {
  return U(e.x) / U(e.y);
}
function Ur(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
var To = class {
  constructor() {
    this.members = [];
  }
  add(t) {
    (yt(this.members, t), t.scheduleRender());
  }
  remove(t) {
    if ((vt(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead)) {
      let a = this.members[this.members.length - 1];
      a && this.promote(a);
    }
  }
  relegate(t) {
    let a = this.members.findIndex((r) => t === r);
    if (a === 0) return !1;
    let o;
    for (let r = a; r >= 0; r--) {
      let i = this.members[r];
      if (i.isPresent !== !1) {
        o = i;
        break;
      }
    }
    return o ? (this.promote(o), !0) : !1;
  }
  promote(t, a) {
    let o = this.lead;
    if (t !== o && ((this.prevLead = o), (this.lead = t), t.show(), o)) {
      (o.instance && o.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = o),
        a && (t.resumeFrom.preserveOpacity = !0),
        o.snapshot &&
          ((t.snapshot = o.snapshot),
          (t.snapshot.latestValues = o.animationValues || o.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0));
      let { crossfade: r } = t.options;
      r === !1 && o.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      let { options: a, resumingFrom: o } = t;
      (a.onExitComplete && a.onExitComplete(),
        o && o.options.onExitComplete && o.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
};
function al(e, t, a) {
  let o = '',
    r = e.x.translate / t.x,
    i = e.y.translate / t.y,
    s = a?.z || 0;
  if (
    ((r || i || s) && (o = `translate3d(${r}px, ${i}px, ${s}px) `),
    (t.x !== 1 || t.y !== 1) && (o += `scale(${1 / t.x}, ${1 / t.y}) `),
    a)
  ) {
    let { transformPerspective: u, rotate: d, rotateX: f, rotateY: c, skewX: m, skewY: p } = a;
    (u && (o = `perspective(${u}px) ${o}`),
      d && (o += `rotate(${d}deg) `),
      f && (o += `rotateX(${f}deg) `),
      c && (o += `rotateY(${c}deg) `),
      m && (o += `skewX(${m}deg) `),
      p && (o += `skewY(${p}deg) `));
  }
  let n = e.x.scale * t.x,
    l = e.y.scale * t.y;
  return ((n !== 1 || l !== 1) && (o += `scale(${n}, ${l})`), o || 'none');
}
var Ze = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0
  },
  da = typeof window < 'u' && window.MotionDebug !== void 0,
  Hr = ['', 'X', 'Y', 'Z'],
  _f = { visibility: 'hidden' },
  ol = 1e3,
  Zf = 0;
function Nr(e, t, a, o) {
  let { latestValues: r } = t;
  r[e] && ((a[e] = r[e]), t.setStaticValue(e, 0), o && (o[e] = 0));
}
function fl(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  let { visualElement: t } = e.options;
  if (!t) return;
  let a = za(t);
  if (window.MotionHasOptimisedAnimation(a, 'transform')) {
    let { layout: r, layoutId: i } = e.options;
    window.MotionCancelOptimisedAnimation(a, 'transform', v, !(r || i));
  }
  let { parent: o } = e;
  o && !o.hasCheckedOptimisedAppear && fl(o);
}
function Ao({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: a,
  checkIsScrollRoot: o,
  resetTransform: r
}) {
  return class {
    constructor(s = {}, n = t?.()) {
      ((this.id = Zf++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            da && (Ze.totalNodes = Ze.resolvedTargetDeltas = Ze.recalculatedProjection = 0),
            this.nodes.forEach(Jf),
            this.nodes.forEach(rc),
            this.nodes.forEach(sc),
            this.nodes.forEach(ec),
            da && window.MotionDebug.record(Ze));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = s),
        (this.root = n ? n.root || n : this),
        (this.path = n ? [...n.path, n] : []),
        (this.parent = n),
        (this.depth = n ? n.depth + 1 : 0));
      for (let l = 0; l < this.path.length; l++) this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new bo());
    }
    addEventListener(s, n) {
      return (
        this.eventHandlers.has(s) || this.eventHandlers.set(s, new Ae()),
        this.eventHandlers.get(s).add(n)
      );
    }
    notifyListeners(s, ...n) {
      let l = this.eventHandlers.get(s);
      l && l.notify(...n);
    }
    hasListeners(s) {
      return this.eventHandlers.has(s);
    }
    mount(s, n = this.root.hasTreeAnimated) {
      if (this.instance) return;
      ((this.isSVG = Hn(s)), (this.instance = s));
      let { layoutId: l, layout: u, visualElement: d } = this.options;
      if (
        (d && !d.current && d.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        n && (u || l) && (this.isLayoutDirty = !0),
        e)
      ) {
        let f,
          c = () => (this.root.updateBlockedByResize = !1);
        e(s, () => {
          ((this.root.updateBlockedByResize = !0),
            f && f(),
            (f = Gn(c, 250)),
            Ft.hasAnimatedSinceResize &&
              ((Ft.hasAnimatedSinceResize = !1), this.nodes.forEach(sl)));
        });
      }
      (l && this.root.registerSharedNode(l, this),
        this.options.animate !== !1 &&
          d &&
          (l || u) &&
          this.addEventListener(
            'didUpdate',
            ({ delta: f, hasLayoutChanged: c, hasRelativeTargetChanged: m, layout: p }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              let h = this.options.transition || d.getDefaultTransition() || dc,
                { onLayoutAnimationStart: g, onLayoutAnimationComplete: x } = d.getProps(),
                C = !this.targetLayout || !Er(this.targetLayout, p) || m,
                S = !c && m;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                S ||
                (c && (C || !this.currentAnimation))
              ) {
                (this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(f, S));
                let P = { ...we(h, 'layout'), onPlay: g, onComplete: x };
                ((d.shouldReduceMotion || this.options.layoutRoot) &&
                  ((P.delay = 0), (P.type = !1)),
                  this.startAnimation(P));
              } else
                (c || sl(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete());
              this.targetLayout = p;
            }
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this));
      let s = this.getStack();
      (s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        $(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(ic), this.animationId++);
    }
    getTransformTemplate() {
      let { visualElement: s } = this.options;
      return s && s.getProps().transformTemplate;
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && fl(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let d = 0; d < this.path.length; d++) {
        let f = this.path[d];
        ((f.shouldResetTransform = !0),
          f.updateScroll('snapshot'),
          f.options.layoutRoot && f.willUpdate(!1));
      }
      let { layoutId: n, layout: l } = this.options;
      if (n === void 0 && !l) return;
      let u = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = u ? u(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners('willUpdate'));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(rl));
        return;
      }
      (this.isUpdating || this.nodes.forEach(ac),
        (this.isUpdating = !1),
        this.nodes.forEach(oc),
        this.nodes.forEach(Yf),
        this.nodes.forEach(Qf),
        this.clearAllSnapshots());
      let n = N.now();
      ((B.delta = q(0, 1e3 / 60, n - B.timestamp)),
        (B.timestamp = n),
        (B.isProcessing = !0),
        ya.update.process(B),
        ya.preRender.process(B),
        ya.render.process(B),
        (B.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), st.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(tc), this.sharedNodes.forEach(nc));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), v.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      v.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      let s = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = M()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox));
      let { visualElement: n } = this.options;
      n && n.notify('LayoutMeasure', this.layout.layoutBox, s ? s.layoutBox : void 0);
    }
    updateScroll(s = 'measure') {
      let n = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === s &&
          (n = !1),
        n)
      ) {
        let l = o(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: s,
          isRoot: l,
          offset: a(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!r) return;
      let s = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        n = this.projectionDelta && !Or(this.projectionDelta),
        l = this.getTransformTemplate(),
        u = l ? l(this.latestValues, '') : void 0,
        d = u !== this.prevTransformTemplateValue;
      s &&
        (n || xe(this.latestValues) || d) &&
        (r(this.instance, u), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(s = !0) {
      let n = this.measurePageBox(),
        l = this.removeElementScroll(n);
      return (
        s && (l = this.removeTransform(l)),
        fc(l),
        {
          animationId: this.root.animationId,
          measuredBox: n,
          layoutBox: l,
          latestValues: {},
          source: this.id
        }
      );
    }
    measurePageBox() {
      var s;
      let { visualElement: n } = this.options;
      if (!n) return M();
      let l = n.measureViewportBox();
      if (!(
        ((s = this.scroll) === null || s === void 0 ? void 0 : s.wasRoot) || this.path.some(cc)
      )) {
        let { scroll: d } = this.root;
        d && (Ve(l.x, d.offset.x), Ve(l.y, d.offset.y));
      }
      return l;
    }
    removeElementScroll(s) {
      var n;
      let l = M();
      if ((Z(l, s), !((n = this.scroll) === null || n === void 0) && n.wasRoot)) return l;
      for (let u = 0; u < this.path.length; u++) {
        let d = this.path[u],
          { scroll: f, options: c } = d;
        d !== this.root &&
          f &&
          c.layoutScroll &&
          (f.wasRoot && Z(l, s), Ve(l.x, f.offset.x), Ve(l.y, f.offset.y));
      }
      return l;
    }
    applyTransform(s, n = !1) {
      let l = M();
      Z(l, s);
      for (let u = 0; u < this.path.length; u++) {
        let d = this.path[u];
        (!n &&
          d.options.layoutScroll &&
          d.scroll &&
          d !== d.root &&
          _e(l, { x: -d.scroll.offset.x, y: -d.scroll.offset.y }),
          xe(d.latestValues) && _e(l, d.latestValues));
      }
      return (xe(this.latestValues) && _e(l, this.latestValues), l);
    }
    removeTransform(s) {
      let n = M();
      Z(n, s);
      for (let l = 0; l < this.path.length; l++) {
        let u = this.path[l];
        if (!u.instance || !xe(u.latestValues)) continue;
        Io(u.latestValues) && u.updateSnapshot();
        let d = M(),
          f = u.measurePageBox();
        (Z(d, f), Vr(n, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, d));
      }
      return (xe(this.latestValues) && Vr(n, this.latestValues), n);
    }
    setTargetDelta(s) {
      ((this.targetDelta = s), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0));
    }
    setOptions(s) {
      this.options = {
        ...this.options,
        ...s,
        crossfade: s.crossfade !== void 0 ? s.crossfade : !0
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== B.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(s = !1) {
      var n;
      let l = this.getLead();
      (this.isProjectionDirty || (this.isProjectionDirty = l.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = l.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = l.isSharedProjectionDirty));
      let u = !!this.resumingFrom || this !== l;
      if (!(
        s ||
        (u && this.isSharedProjectionDirty) ||
        this.isProjectionDirty ||
        (!((n = this.parent) === null || n === void 0) && n.isProjectionDirty) ||
        this.attemptToResolveRelativeTarget ||
        this.root.updateBlockedByResize
      ))
        return;
      let { layout: f, layoutId: c } = this.options;
      if (!(!this.layout || !(f || c))) {
        if (
          ((this.resolvedRelativeTargetAt = B.timestamp), !this.targetDelta && !this.relativeTarget)
        ) {
          let m = this.getClosestProjectingParent();
          m && m.layout && this.animationProgress !== 1
            ? ((this.relativeParent = m),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = M()),
              (this.relativeTargetOrigin = M()),
              Bt(this.relativeTargetOrigin, this.layout.layoutBox, m.layout.layoutBox),
              Z(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target || ((this.target = M()), (this.targetWithTransforms = M())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                mn(this.target, this.relativeTarget, this.relativeParent.target))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : Z(this.target, this.layout.layoutBox),
                  Dr(this.target, this.targetDelta))
                : Z(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            let m = this.getClosestProjectingParent();
            m &&
            !!m.resumingFrom == !!this.resumingFrom &&
            !m.options.layoutScroll &&
            m.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = m),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = M()),
                (this.relativeTargetOrigin = M()),
                Bt(this.relativeTargetOrigin, this.target, m.target),
                Z(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          da && Ze.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Io(this.parent.latestValues) || kr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      var s;
      let n = this.getLead(),
        l = !!this.resumingFrom || this !== n,
        u = !0;
      if (
        ((this.isProjectionDirty ||
          (!((s = this.parent) === null || s === void 0) && s.isProjectionDirty)) &&
          (u = !1),
        l && (this.isSharedProjectionDirty || this.isTransformDirty) && (u = !1),
        this.resolvedRelativeTargetAt === B.timestamp && (u = !1),
        u)
      )
        return;
      let { layout: d, layoutId: f } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(d || f))
      )
        return;
      Z(this.layoutCorrected, this.layout.layoutBox);
      let c = this.treeScale.x,
        m = this.treeScale.y;
      (Bn(this.layoutCorrected, this.treeScale, this.path, l),
        n.layout &&
          !n.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((n.target = n.layout.layoutBox), (n.targetWithTransforms = M())));
      let { target: p } = n;
      if (!p) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Fr(this.prevProjectionDelta.x, this.projectionDelta.x),
          Fr(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Rt(this.projectionDelta, this.layoutCorrected, p, this.latestValues),
        (this.treeScale.x !== c ||
          this.treeScale.y !== m ||
          !Ur(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !Ur(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners('projectionUpdate', p)),
        da && Ze.recalculatedProjection++);
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(s = !0) {
      var n;
      if (((n = this.options.visualElement) === null || n === void 0 || n.scheduleRender(), s)) {
        let l = this.getStack();
        l && l.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = $e()),
        (this.projectionDelta = $e()),
        (this.projectionDeltaWithTransform = $e()));
    }
    setAnimationOrigin(s, n = !1) {
      let l = this.snapshot,
        u = l ? l.latestValues : {},
        d = { ...this.latestValues },
        f = $e();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !n));
      let c = M(),
        m = l ? l.source : void 0,
        p = this.layout ? this.layout.source : void 0,
        h = m !== p,
        g = this.getStack(),
        x = !g || g.members.length <= 1,
        C = !!(h && !x && this.options.crossfade === !0 && !this.path.some(uc));
      this.animationProgress = 0;
      let S;
      ((this.mixTargetDelta = (P) => {
        let L = P / 1e3;
        (il(f.x, s.x, L),
          il(f.y, s.y, L),
          this.setTargetDelta(f),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Bt(c, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            lc(this.relativeTarget, this.relativeTargetOrigin, c, L),
            S && tl(this.relativeTarget, S) && (this.isProjectionDirty = !1),
            S || (S = M()),
            Z(S, this.relativeTarget)),
          h && ((this.animationValues = d), Xn(d, u, this.latestValues, L, C, x)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = L));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(s) {
      (this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation && ($(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = v.update(() => {
          ((Ft.hasAnimatedSinceResize = !0),
            (this.currentAnimation = Un(0, ol, {
              ...s,
              onUpdate: (n) => {
                (this.mixTargetDelta(n), s.onUpdate && s.onUpdate(n));
              },
              onComplete: () => {
                (s.onComplete && s.onComplete(), this.completeAnimation());
              }
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      let s = this.getStack();
      (s && s.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners('animationComplete'));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(ol), this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      let s = this.getLead(),
        { targetWithTransforms: n, target: l, layout: u, latestValues: d } = s;
      if (!(!n || !l || !u)) {
        if (
          this !== s &&
          this.layout &&
          u &&
          cl(this.options.animationType, this.layout.layoutBox, u.layoutBox)
        ) {
          l = this.target || M();
          let f = U(this.layout.layoutBox.x);
          ((l.x.min = s.target.x.min), (l.x.max = l.x.min + f));
          let c = U(this.layout.layoutBox.y);
          ((l.y.min = s.target.y.min), (l.y.max = l.y.min + c));
        }
        (Z(n, l), _e(n, d), Rt(this.projectionDeltaWithTransform, this.layoutCorrected, n, d));
      }
    }
    registerSharedNode(s, n) {
      (this.sharedNodes.has(s) || this.sharedNodes.set(s, new To()),
        this.sharedNodes.get(s).add(n));
      let u = n.options.initialPromotionConfig;
      n.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity:
          u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(n) : void 0
      });
    }
    isLead() {
      let s = this.getStack();
      return s ? s.lead === this : !0;
    }
    getLead() {
      var s;
      let { layoutId: n } = this.options;
      return n ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.lead) || this : this;
    }
    getPrevLead() {
      var s;
      let { layoutId: n } = this.options;
      return n ? ((s = this.getStack()) === null || s === void 0 ? void 0 : s.prevLead) : void 0;
    }
    getStack() {
      let { layoutId: s } = this.options;
      if (s) return this.root.sharedNodes.get(s);
    }
    promote({ needsReset: s, transition: n, preserveFollowOpacity: l } = {}) {
      let u = this.getStack();
      (u && u.promote(this, l),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        n && this.setOptions({ transition: n }));
    }
    relegate() {
      let s = this.getStack();
      return s ? s.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      let { visualElement: s } = this.options;
      if (!s) return;
      let n = !1,
        { latestValues: l } = s;
      if (
        ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (n = !0),
        !n)
      )
        return;
      let u = {};
      l.z && Nr('z', s, u, this.animationValues);
      for (let d = 0; d < Hr.length; d++)
        (Nr(`rotate${Hr[d]}`, s, u, this.animationValues),
          Nr(`skew${Hr[d]}`, s, u, this.animationValues));
      s.render();
      for (let d in u)
        (s.setStaticValue(d, u[d]), this.animationValues && (this.animationValues[d] = u[d]));
      s.scheduleRender();
    }
    getProjectionStyles(s) {
      var n, l;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return _f;
      let u = { visibility: '' },
        d = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (u.opacity = ''),
          (u.pointerEvents = lt(s?.pointerEvents) || ''),
          (u.transform = d ? d(this.latestValues, '') : 'none'),
          u
        );
      let f = this.getLead();
      if (!this.projectionDelta || !this.layout || !f.target) {
        let h = {};
        return (
          this.options.layoutId &&
            ((h.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
            (h.pointerEvents = lt(s?.pointerEvents) || '')),
          this.hasProjected &&
            !xe(this.latestValues) &&
            ((h.transform = d ? d({}, '') : 'none'), (this.hasProjected = !1)),
          h
        );
      }
      let c = f.animationValues || f.latestValues;
      (this.applyTransformsToTarget(),
        (u.transform = al(this.projectionDeltaWithTransform, this.treeScale, c)),
        d && (u.transform = d(c, u.transform)));
      let { x: m, y: p } = this.projectionDelta;
      ((u.transformOrigin = `${m.origin * 100}% ${p.origin * 100}% 0`),
        f.animationValues
          ? (u.opacity =
              f === this
                ? (l = (n = c.opacity) !== null && n !== void 0 ? n : this.latestValues.opacity) !==
                    null && l !== void 0
                  ? l
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : c.opacityExit)
          : (u.opacity =
              f === this
                ? c.opacity !== void 0
                  ? c.opacity
                  : ''
                : c.opacityExit !== void 0
                  ? c.opacityExit
                  : 0));
      for (let h in ht) {
        if (c[h] === void 0) continue;
        let { correct: g, applyTo: x } = ht[h],
          C = u.transform === 'none' ? c[h] : g(c[h], f);
        if (x) {
          let S = x.length;
          for (let P = 0; P < S; P++) u[x[P]] = C;
        } else u[h] = C;
      }
      return (
        this.options.layoutId &&
          (u.pointerEvents = f === this ? lt(s?.pointerEvents) || '' : 'none'),
        u
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((s) => {
        var n;
        return (n = s.currentAnimation) === null || n === void 0 ? void 0 : n.stop();
      }),
        this.root.nodes.forEach(rl),
        this.root.sharedNodes.clear());
    }
  };
}
function Yf(e) {
  e.updateLayout();
}
function Qf(e) {
  var t;
  let a = ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && a && e.hasListeners('didUpdate')) {
    let { layoutBox: o, measuredBox: r } = e.layout,
      { animationType: i } = e.options,
      s = a.source !== e.layout.source;
    i === 'size'
      ? j((f) => {
          let c = s ? a.measuredBox[f] : a.layoutBox[f],
            m = U(c);
          ((c.min = o[f].min), (c.max = c.min + m));
        })
      : cl(i, a.layoutBox, o) &&
        j((f) => {
          let c = s ? a.measuredBox[f] : a.layoutBox[f],
            m = U(o[f]);
          ((c.max = c.min + m),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[f].max = e.relativeTarget[f].min + m)));
        });
    let n = $e();
    Rt(n, o, a.layoutBox);
    let l = $e();
    s ? Rt(l, e.applyTransform(r, !0), a.measuredBox) : Rt(l, o, a.layoutBox);
    let u = !Or(n),
      d = !1;
    if (!e.resumeFrom) {
      let f = e.getClosestProjectingParent();
      if (f && !f.resumeFrom) {
        let { snapshot: c, layout: m } = f;
        if (c && m) {
          let p = M();
          Bt(p, a.layoutBox, c.layoutBox);
          let h = M();
          (Bt(h, o, m.layoutBox),
            Er(p, h) || (d = !0),
            f.options.layoutRoot &&
              ((e.relativeTarget = h), (e.relativeTargetOrigin = p), (e.relativeParent = f)));
        }
      }
    }
    e.notifyListeners('didUpdate', {
      layout: o,
      snapshot: a,
      delta: l,
      layoutDelta: n,
      hasLayoutChanged: u,
      hasRelativeTargetChanged: d
    });
  } else if (e.isLead()) {
    let { onExitComplete: o } = e.options;
    o && o();
  }
  e.options.transition = void 0;
}
function Jf(e) {
  (da && Ze.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = !!(
          e.isProjectionDirty ||
          e.parent.isProjectionDirty ||
          e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty)));
}
function ec(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function tc(e) {
  e.clearSnapshot();
}
function rl(e) {
  e.clearMeasurements();
}
function ac(e) {
  e.isLayoutDirty = !1;
}
function oc(e) {
  let { visualElement: t } = e.options;
  (t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'), e.resetTransform());
}
function sl(e) {
  (e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0));
}
function rc(e) {
  e.resolveTargetDelta();
}
function sc(e) {
  e.calcProjection();
}
function ic(e) {
  e.resetSkewAndRotation();
}
function nc(e) {
  e.removeLeadSnapshot();
}
function il(e, t, a) {
  ((e.translate = w(t.translate, 0, a)),
    (e.scale = w(t.scale, 1, a)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint));
}
function nl(e, t, a, o) {
  ((e.min = w(t.min, a.min, o)), (e.max = w(t.max, a.max, o)));
}
function lc(e, t, a, o) {
  (nl(e.x, t.x, a.x, o), nl(e.y, t.y, a.y, o));
}
function uc(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
var dc = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  ll = (e) =>
    typeof navigator < 'u' && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
  ul = ll('applewebkit/') && !ll('chrome/') ? Math.round : T;
function dl(e) {
  ((e.min = ul(e.min)), (e.max = ul(e.max)));
}
function fc(e) {
  (dl(e.x), dl(e.y));
}
function cl(e, t, a) {
  return e === 'position' || (e === 'preserve-aspect' && !cn(qr(t), qr(a), 0.2));
}
function cc(e) {
  var t;
  return e !== e.root && ((t = e.scroll) === null || t === void 0 ? void 0 : t.wasRoot);
}
var ml = Ao({
  attachResizeListener: (e, t) => pe(e, 'resize', t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
});
var Gr = { current: void 0 },
  ko = Ao({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!Gr.current) {
        let e = new ml({});
        (e.mount(window), e.setOptions({ layoutScroll: !0 }), (Gr.current = e));
      }
      return Gr.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : 'none';
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === 'fixed'
  });
var pl = { pan: { Feature: Po }, drag: { Feature: vo, ProjectionNode: ko, MeasureLayout: wo } };
function hl(e, t, a) {
  let { props: o } = e;
  e.animationState && o.whileHover && e.animationState.setActive('whileHover', a === 'Start');
  let r = 'onHover' + a,
    i = o[r];
  i && v.postRender(() => i(t, he(t)));
}
var Mo = class extends O {
  mount() {
    let { current: t } = this.node;
    t && (this.unmount = sr(t, (a) => (hl(this.node, a, 'Start'), (o) => hl(this.node, o, 'End'))));
  }
  unmount() {}
};
var Do = class extends O {
  constructor() {
    (super(...arguments), (this.isActive = !1));
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(':focus-visible');
    } catch {
      t = !0;
    }
    !t ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !0), (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !1), (this.isActive = !1));
  }
  mount() {
    this.unmount = se(
      pe(this.node.current, 'focus', () => this.onFocus()),
      pe(this.node.current, 'blur', () => this.onBlur())
    );
  }
  unmount() {}
};
function xl(e, t, a) {
  let { props: o } = e;
  e.animationState && o.whileTap && e.animationState.setActive('whileTap', a === 'Start');
  let r = 'onTap' + (a === 'End' ? '' : a),
    i = o[r];
  i && v.postRender(() => i(t, he(t)));
}
var Ro = class extends O {
  mount() {
    let { current: t } = this.node;
    t &&
      (this.unmount = nr(
        t,
        (a) => (
          xl(this.node, a, 'Start'),
          (o, { success: r }) => xl(this.node, o, r ? 'End' : 'Cancel')
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ));
  }
  unmount() {}
};
var zr = new WeakMap(),
  Wr = new WeakMap(),
  mc = (e) => {
    let t = zr.get(e.target);
    t && t(e);
  },
  pc = (e) => {
    e.forEach(mc);
  };
function hc({ root: e, ...t }) {
  let a = e || document;
  Wr.has(a) || Wr.set(a, {});
  let o = Wr.get(a),
    r = JSON.stringify(t);
  return (o[r] || (o[r] = new IntersectionObserver(pc, { root: e, ...t })), o[r]);
}
function gl(e, t, a) {
  let o = hc(t);
  return (
    zr.set(e, a),
    o.observe(e),
    () => {
      (zr.delete(e), o.unobserve(e));
    }
  );
}
var xc = { some: 0, all: 1 },
  Bo = class extends O {
    constructor() {
      (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
    }
    startObserver() {
      this.unmount();
      let { viewport: t = {} } = this.node.getProps(),
        { root: a, margin: o, amount: r = 'some', once: i } = t,
        s = {
          root: a ? a.current : void 0,
          rootMargin: o,
          threshold: typeof r == 'number' ? r : xc[r]
        },
        n = (l) => {
          let { isIntersecting: u } = l;
          if (this.isInView === u || ((this.isInView = u), i && !u && this.hasEnteredView)) return;
          (u && (this.hasEnteredView = !0),
            this.node.animationState && this.node.animationState.setActive('whileInView', u));
          let { onViewportEnter: d, onViewportLeave: f } = this.node.getProps(),
            c = u ? d : f;
          c && c(l);
        };
      return gl(this.node.current, s, n);
    }
    mount() {
      this.startObserver();
    }
    update() {
      if (typeof IntersectionObserver > 'u') return;
      let { props: t, prevProps: a } = this.node;
      ['amount', 'margin', 'root'].some(gc(t, a)) && this.startObserver();
    }
    unmount() {}
  };
function gc({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (a) => e[a] !== t[a];
}
var Ll = {
  inView: { Feature: Bo },
  tap: { Feature: Ro },
  focus: { Feature: Do },
  hover: { Feature: Mo }
};
var Il = { layout: { ProjectionNode: ko, MeasureLayout: wo } };
import { Fragment as Cc } from 'react';
var fa = { current: null },
  Fo = { current: !1 };
function Cl() {
  if (((Fo.current = !0), !!at))
    if (window.matchMedia) {
      let e = window.matchMedia('(prefers-reduced-motion)'),
        t = () => (fa.current = e.matches);
      (e.addListener(t), t());
    } else fa.current = !1;
}
var Lc = [...xr, V, z],
  Sl = (e) => Lc.find(oo(e));
var Kr = new WeakMap();
function yl(e, t, a) {
  for (let o in t) {
    let r = t[o],
      i = a[o];
    if (A(r)) e.addValue(o, r);
    else if (A(i)) e.addValue(o, me(r, { owner: e }));
    else if (i !== r)
      if (e.hasValue(o)) {
        let s = e.getValue(o);
        s.liveStyle === !0 ? s.jump(r) : s.hasAnimated || s.set(r);
      } else {
        let s = e.getStaticValue(o);
        e.addValue(o, me(s !== void 0 ? s : r, { owner: e }));
      }
  }
  for (let o in a) t[o] === void 0 && e.removeValue(o);
  return t;
}
var vl = [
    'AnimationStart',
    'AnimationComplete',
    'Update',
    'BeforeLayoutMeasure',
    'LayoutMeasure',
    'LayoutAnimationStart',
    'LayoutAnimationComplete'
  ],
  Vo = class {
    scrapeMotionValuesFromProps(t, a, o) {
      return {};
    }
    constructor(
      {
        parent: t,
        props: a,
        presenceContext: o,
        reducedMotionConfig: r,
        blockInitialAnimation: i,
        visualState: s
      },
      n = {}
    ) {
      ((this.current = null),
        (this.children = new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.values = new Map()),
        (this.KeyframeResolver = Re),
        (this.features = {}),
        (this.valueSubscriptions = new Map()),
        (this.prevMotionValues = {}),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
        (this.render = () => {
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
        }),
        (this.renderScheduledAt = 0),
        (this.scheduleRender = () => {
          let m = N.now();
          this.renderScheduledAt < m &&
            ((this.renderScheduledAt = m), v.render(this.render, !1, !0));
        }));
      let { latestValues: l, renderState: u, onUpdate: d } = s;
      ((this.onUpdate = d),
        (this.latestValues = l),
        (this.baseTarget = { ...l }),
        (this.initialValues = a.initial ? { ...l } : {}),
        (this.renderState = u),
        (this.parent = t),
        (this.props = a),
        (this.presenceContext = o),
        (this.depth = t ? t.depth + 1 : 0),
        (this.reducedMotionConfig = r),
        (this.options = n),
        (this.blockInitialAnimation = !!i),
        (this.isControllingVariants = He(a)),
        (this.isVariantNode = wa(a)),
        this.isVariantNode && (this.variantChildren = new Set()),
        (this.manuallyAnimateOnMount = !!(t && t.current)));
      let { willChange: f, ...c } = this.scrapeMotionValuesFromProps(a, {}, this);
      for (let m in c) {
        let p = c[m];
        l[m] !== void 0 && A(p) && p.set(l[m], !1);
      }
    }
    mount(t) {
      ((this.current = t),
        Kr.set(t, this),
        this.projection && !this.projection.instance && this.projection.mount(t),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((a, o) => this.bindToMotionValue(o, a)),
        Fo.current || Cl(),
        (this.shouldReduceMotion =
          this.reducedMotionConfig === 'never'
            ? !1
            : this.reducedMotionConfig === 'always'
              ? !0
              : fa.current),
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext));
    }
    unmount() {
      (Kr.delete(this.current),
        this.projection && this.projection.unmount(),
        $(this.notifyUpdate),
        $(this.render),
        this.valueSubscriptions.forEach((t) => t()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this));
      for (let t in this.events) this.events[t].clear();
      for (let t in this.features) {
        let a = this.features[t];
        a && (a.unmount(), (a.isMounted = !1));
      }
      this.current = null;
    }
    bindToMotionValue(t, a) {
      this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
      let o = K.has(t),
        r = a.on('change', (n) => {
          ((this.latestValues[t] = n),
            this.props.onUpdate && v.preRender(this.notifyUpdate),
            o && this.projection && (this.projection.isTransformDirty = !0));
        }),
        i = a.on('renderRequest', this.scheduleRender),
        s;
      (window.MotionCheckAppearSync && (s = window.MotionCheckAppearSync(this, t, a)),
        this.valueSubscriptions.set(t, () => {
          (r(), i(), s && s(), a.owner && a.stop());
        }));
    }
    sortNodePosition(t) {
      return !this.current || !this.sortInstanceNodePosition || this.type !== t.type
        ? 0
        : this.sortInstanceNodePosition(this.current, t.current);
    }
    updateFeatures() {
      let t = 'animation';
      for (t in ue) {
        let a = ue[t];
        if (!a) continue;
        let { isEnabled: o, Feature: r } = a;
        if (
          (!this.features[t] && r && o(this.props) && (this.features[t] = new r(this)),
          this.features[t])
        ) {
          let i = this.features[t];
          i.isMounted ? i.update() : (i.mount(), (i.isMounted = !0));
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : M();
    }
    getStaticValue(t) {
      return this.latestValues[t];
    }
    setStaticValue(t, a) {
      this.latestValues[t] = a;
    }
    update(t, a) {
      ((t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = t),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = a));
      for (let o = 0; o < vl.length; o++) {
        let r = vl[o];
        this.propEventSubscriptions[r] &&
          (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
        let i = 'on' + r,
          s = t[i];
        s && (this.propEventSubscriptions[r] = this.on(r, s));
      }
      ((this.prevMotionValues = yl(
        this,
        this.scrapeMotionValuesFromProps(t, this.prevProps, this),
        this.prevMotionValues
      )),
        this.handleChildMotionValue && this.handleChildMotionValue(),
        this.onUpdate && this.onUpdate(this));
    }
    getProps() {
      return this.props;
    }
    getVariant(t) {
      return this.props.variants ? this.props.variants[t] : void 0;
    }
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
    }
    addVariantChild(t) {
      let a = this.getClosestVariantNode();
      if (a)
        return (a.variantChildren && a.variantChildren.add(t), () => a.variantChildren.delete(t));
    }
    addValue(t, a) {
      let o = this.values.get(t);
      a !== o &&
        (o && this.removeValue(t),
        this.bindToMotionValue(t, a),
        this.values.set(t, a),
        (this.latestValues[t] = a.get()));
    }
    removeValue(t) {
      this.values.delete(t);
      let a = this.valueSubscriptions.get(t);
      (a && (a(), this.valueSubscriptions.delete(t)),
        delete this.latestValues[t],
        this.removeValueFromRenderState(t, this.renderState));
    }
    hasValue(t) {
      return this.values.has(t);
    }
    getValue(t, a) {
      if (this.props.values && this.props.values[t]) return this.props.values[t];
      let o = this.values.get(t);
      return (
        o === void 0 &&
          a !== void 0 &&
          ((o = me(a === null ? void 0 : a, { owner: this })), this.addValue(t, o)),
        o
      );
    }
    readValue(t, a) {
      var o;
      let r =
        this.latestValues[t] !== void 0 || !this.current
          ? this.latestValues[t]
          : (o = this.getBaseTargetFromProps(this.props, t)) !== null && o !== void 0
            ? o
            : this.readValueFromInstance(this.current, t, this.options);
      return (
        r != null &&
          (typeof r == 'string' && (ao(r) || Ja(r))
            ? (r = parseFloat(r))
            : !Sl(r) && z.test(a) && (r = to(t, a)),
          this.setBaseTarget(t, A(r) ? r.get() : r)),
        A(r) ? r.get() : r
      );
    }
    setBaseTarget(t, a) {
      this.baseTarget[t] = a;
    }
    getBaseTarget(t) {
      var a;
      let { initial: o } = this.props,
        r;
      if (typeof o == 'string' || typeof o == 'object') {
        let s = nt(
          this.props,
          o,
          (a = this.presenceContext) === null || a === void 0 ? void 0 : a.custom
        );
        s && (r = s[t]);
      }
      if (o && r !== void 0) return r;
      let i = this.getBaseTargetFromProps(this.props, t);
      return i !== void 0 && !A(i)
        ? i
        : this.initialValues[t] !== void 0 && r === void 0
          ? void 0
          : this.baseTarget[t];
    }
    on(t, a) {
      return (this.events[t] || (this.events[t] = new Ae()), this.events[t].add(a));
    }
    notify(t, ...a) {
      this.events[t] && this.events[t].notify(...a);
    }
  };
var Ot = class extends Vo {
  constructor() {
    (super(...arguments), (this.KeyframeResolver = Tt));
  }
  sortInstanceNodePosition(t, a) {
    return t.compareDocumentPosition(a) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, a) {
    return t.style ? t.style[a] : void 0;
  }
  removeValueFromRenderState(t, { vars: a, style: o }) {
    (delete a[t], delete o[t]);
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    let { children: t } = this.props;
    A(t) &&
      (this.childSubscription = t.on('change', (a) => {
        this.current && (this.current.textContent = `${a}`);
      }));
  }
};
function Ic(e) {
  return window.getComputedStyle(e);
}
var Oo = class extends Ot {
  constructor() {
    (super(...arguments), (this.type = 'html'), (this.renderInstance = Ra));
  }
  readValueFromInstance(t, a) {
    if (K.has(a)) {
      let o = bt(a);
      return (o && o.default) || 0;
    } else {
      let o = Ic(t),
        r = (ka(a) ? o.getPropertyValue(a) : o[a]) || 0;
      return typeof r == 'string' ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: a }) {
    return Rr(t, a);
  }
  build(t, a, o) {
    ft(t, a, o.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, a, o) {
    return xt(t, a, o);
  }
};
var Eo = class extends Ot {
  constructor() {
    (super(...arguments),
      (this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = M));
  }
  getBaseTargetFromProps(t, a) {
    return t[a];
  }
  readValueFromInstance(t, a) {
    if (K.has(a)) {
      let o = bt(a);
      return (o && o.default) || 0;
    }
    return ((a = Ba.has(a) ? a : rt(a)), t.getAttribute(a));
  }
  scrapeMotionValuesFromProps(t, a, o) {
    return Oa(t, a, o);
  }
  build(t, a, o) {
    ct(t, a, this.isSVGTag, o.transformTemplate);
  }
  renderInstance(t, a, o, r) {
    Fa(t, a, o, r);
  }
  mount(t) {
    ((this.isSVGTag = pt(t.tagName)), super.mount(t));
  }
};
var Pl = (e, t) => (it(e) ? new Eo(t) : new Oo(t, { allowProjection: e !== Cc }));
var wl = Js({ ...en, ...Ll, ...pl, ...Il }, Pl);
var jr = vs(wl);
import { jsx as ie, jsxs as Xr } from 'react/jsx-runtime';
var Al = yc(null),
  Tl = {
    info: { icon: ie(Gt, { size: 18, 'data-id': 'element-133' }), color: 'text-primary' },
    success: { icon: ie(Le, { size: 18, 'data-id': 'element-134' }), color: 'text-success' },
    error: { icon: ie(ge, { size: 18, 'data-id': 'element-135' }), color: 'text-destructive' }
  };
function kD({ children: e }) {
  let [t, a] = Sc([]),
    o = bl((i) => {
      a((s) => s.filter((n) => n.id !== i));
    }, []),
    r = bl(
      ({ tone: i = 'info', duration: s = 4e3, ...n }) => {
        let l = Date.now() + Math.random();
        (a((u) => [...u, { id: l, tone: i, duration: s, ...n }]),
          s > 0 && setTimeout(() => o(l), s));
      },
      [o]
    );
  return Xr(Al.Provider, {
    value: { toast: r },
    'data-id': 'element-136',
    children: [
      e,
      Pc(
        ie('div', {
          className: 'fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2',
          'data-id': 'element-137',
          children: ie($o, {
            initial: !1,
            'data-id': 'element-138',
            children: t.map((i) =>
              Xr(
                jr.div,
                {
                  layout: !0,
                  initial: { opacity: 0, x: 24, scale: 0.96 },
                  animate: { opacity: 1, x: 0, scale: 1 },
                  exit: { opacity: 0, x: 24, scale: 0.96 },
                  transition: { duration: 0.2, ease: 'easeOut' },
                  className:
                    'flex items-start gap-3 rounded-md border border-border bg-card p-3 text-card-foreground shadow-lg',
                  role: 'status',
                  'data-id': 'element-139',
                  children: [
                    ie('span', {
                      className: `mt-0.5 ${Tl[i.tone].color}`,
                      'data-id': 'element-140',
                      children: Tl[i.tone].icon
                    }),
                    Xr('div', {
                      className: 'flex-1',
                      'data-id': 'element-141',
                      children: [
                        ie('p', {
                          className: 'text-sm font-medium text-foreground',
                          'data-id': 'element-142',
                          children: i.title
                        }),
                        i.description &&
                          ie('p', {
                            className: 'mt-0.5 text-xs text-muted-foreground',
                            'data-id': 'element-143',
                            children: i.description
                          })
                      ]
                    }),
                    ie('button', {
                      type: 'button',
                      onClick: () => o(i.id),
                      'aria-label': 'Dismiss',
                      className: 'text-muted-foreground transition-colors hover:text-foreground',
                      'data-id': 'element-144',
                      children: ie(Ee, { size: 16, 'data-id': 'element-145' })
                    })
                  ]
                },
                i.id
              )
            )
          })
        }),
        document.body
      )
    ]
  });
}
function MD() {
  let e = vc(Al);
  if (!e) throw new Error('useToast must be used within a ToastProvider');
  return e;
}
import { useState as wc } from 'react';
import { jsx as Tc, jsxs as Ac } from 'react/jsx-runtime';
var bc = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2'
};
function VD({ content: e, side: t = 'top', children: a, className: o = '' }) {
  let [r, i] = wc(!1);
  return Ac('span', {
    className: `relative inline-flex ${o}`,
    onMouseEnter: () => i(!0),
    onMouseLeave: () => i(!1),
    onFocus: () => i(!0),
    onBlur: () => i(!1),
    'data-id': 'element-146',
    children: [
      a,
      r &&
        Tc('span', {
          role: 'tooltip',
          className: `pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md ${bc[t]}`,
          'data-id': 'element-147',
          children: e
        })
    ]
  });
}
export {
  Fc as Avatar,
  Ec as Badge,
  Hc as Button,
  Wc as Card,
  Xc as CardBody,
  jc as CardDescription,
  $c as CardFooter,
  zc as CardHeader,
  Kc as CardTitle,
  Nm as Checkbox,
  Km as EmptyState,
  _m as Logo,
  ap as Modal,
  lp as Radio,
  np as RadioGroup,
  pp as Select,
  Ip as Switch,
  Rp as Tab,
  Dp as TabList,
  Bp as TabPanel,
  wp as Table,
  Mp as Tabs,
  qp as TextArea,
  Wp as TextInput,
  kD as ToastProvider,
  VD as Tooltip,
  MD as useToast
};
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/Icon.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/check.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevron-down.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevron-up.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/chevrons-up-down.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/circle-alert.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/circle-check-big.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/inbox.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/info.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/sparkles.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/x.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.522.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
