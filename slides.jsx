// slides.jsx — six 1080×1350 IG carousel slides — dev-tool aesthetic

const W = 1080;
const H = 1350;

// ── Logo placeholder ────────────────────────────────────────────────────────
function LogoSlot({ name, size = 220, light }) {
  const fg = light ? '#FFFFFF' : '#0F1418';
  const bg = light ? '#0F1418' : '#FFFFFF';
  return (
    <div style={{
      width: size, height: size, position: 'relative',
      background: bg, color: fg,
      border: `1.5px solid ${fg}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    }}>
      {/* Corner ticks */}
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) =>
      <div key={i} style={{
        position: 'absolute', width: 12, height: 12,
        top: y ? 'auto' : -1, bottom: y ? -1 : 'auto',
        left: x ? 'auto' : -1, right: x ? -1 : 'auto',
        borderTop: !y ? `2px solid ${fg}` : 'none',
        borderBottom: y ? `2px solid ${fg}` : 'none',
        borderLeft: !x ? `2px solid ${fg}` : 'none',
        borderRight: x ? `2px solid ${fg}` : 'none',
        background: bg
      }} />
      )}
      <div style={{ textAlign: 'center', lineHeight: 1.4 }}>
        <div style={{ fontSize: 11, opacity: 0.5, letterSpacing: '0.2em' }}>{'<LOGO/>'}</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8, letterSpacing: '-0.01em' }}>
          {name.split('.')[0]}
        </div>
      </div>
    </div>);

}

// ── Grid + Grain ───────────────────────────────────────────────────────────
function GridBg({ light }) {
  const c = light ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(${c} 1px, transparent 1px),
                        linear-gradient(90deg, ${c} 1px, transparent 1px)`,
      backgroundSize: '60px 60px'
    }} />);

}

function Grain({ amount = 0.1 }) {
  if (!amount) return null;
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', mixBlendMode: 'multiply', opacity: amount }}>
      <filter id="g">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g)" />
    </svg>);

}

// ── Slide shell ────────────────────────────────────────────────────────────
function Slide({ children, light, grain = 0.1, idx, total = 6 }) {
  const bg = light ? '#0F1418' : '#FFFFFF';
  const fg = light ? '#FFFFFF' : '#0F1418';
  return (
    <div style={{
      width: W, height: H, position: 'relative', overflow: 'hidden',
      background: bg, color: fg,
      fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    }}>
      <GridBg light={light} />
      {children}
      <Grain amount={grain} />
    </div>);

}

// ── Slide 1 — Hook ─────────────────────────────────────────────────────────
function SlideHook({ tweaks }) {
  const { displayFont, light, grain } = tweaks;
  const fg = light ? '#FFFFFF' : '#0F1418';
  return (
    <Slide light={light} grain={grain} idx={0}>
      {/* Main type stack */}
      <div style={{
        position: 'absolute', top: 120, left: 48, right: 48
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase',
          opacity: 0.55, marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center'
        }}>
          <span>// Builder log</span>
          <span style={{ flex: 1, height: 1, background: fg, opacity: 0.3 }} />
          <span>v.01</span>
        </div>

        <div style={{
          fontFamily: displayFont,
          fontSize: 260, lineHeight: 0.88, fontWeight: 900,
          letterSpacing: '-0.05em'
        }}>
          <div style={{ fontFamily: "BlinkMacSystemFont" }}>5 apps.</div>
          <div style={{ fontFamily: "BlinkMacSystemFont" }}>10 days.</div>
        </div>
      </div>

      {/* Code-style sub copy */}
      <div style={{
        position: 'absolute', left: 48, right: 48, bottom: 120,
        fontSize: 24, lineHeight: 1.55,
        borderLeft: `3px solid ${fg}`, paddingLeft: 22
      }}>
        <div style={{ opacity: 0.5 }}>{'>'} const stack = [</div>
        <div style={{ paddingLeft: 24 }}>
          'capture', 'pantry', 'cashflow',<br />
          'yeni', 'jain.dham'
        </div>
        <div style={{ opacity: 0.5 }}>];</div>
        <div style={{ marginTop: 14, opacity: 0.5 }}>{'>'} status: <span style={{
            background: '#0F1418', color: '#FFFFFF',
            padding: '4px 12px', fontWeight: 700
          }}>SHIPPED</span></div>
      </div>
    </Slide>);

}

// ── App slide template ─────────────────────────────────────────────────────
function AppSlide({ idx, num, name, tag, body, status, tweaks, accent }) {
  const { displayFont, light, grain } = tweaks;
  const fg = light ? '#FFFFFF' : '#0F1418';
  const bg = light ? '#0F1418' : '#FFFFFF';
  return (
    <Slide light={light} grain={grain} idx={idx}>
      {/* Logo + name lockup */}
      <div style={{
        position: 'absolute', top: 130, left: 48, right: 48,
        display: 'flex', alignItems: 'center', gap: 36
      }}>
        <LogoSlot name={name} light={light} size={200} />
        <div style={{ flex: 1, minWidth: 0, fontFamily: "\"Segoe UI\"" }}>
          <div style={{
            fontFamily: displayFont,
            fontSize: 96, lineHeight: 0.92, fontWeight: 900,
            letterSpacing: '-0.045em',
            wordBreak: 'break-word'
          }}>
            {name}
          </div>
          <div style={{
            marginTop: 14, fontSize: 16, letterSpacing: '0.12em',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#0F1418', color: '#FFFFFF', padding: '6px 12px', fontWeight: 700
          }}>
            ● {(status || 'live').toUpperCase()}
          </div>
        </div>
      </div>

      {/* README block */}
      <div style={{
        position: 'absolute', left: 48, right: 48, top: 460,
        border: `1.5px solid ${fg}`
      }}>
        <div style={{
          padding: '12px 18px', borderBottom: `1.5px solid ${fg}`,
          fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase',
          display: 'flex', justifyContent: 'space-between'
        }}>
          <span>README.md</span>
          <span style={{ opacity: 0.55 }}>{idx} / 5</span>
        </div>
        <div style={{
          padding: '28px 28px 32px',
          fontSize: 28, lineHeight: 1.4, textWrap: 'pretty',
          fontFamily: displayFont, fontWeight: 400
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 18, opacity: 0.55, marginBottom: 16, fontWeight: 500
          }}># What it does</div>
          {body}
        </div>
      </div>

      {/* Tags row */}
      <div style={{
        position: 'absolute', left: 48, right: 48, bottom: 80,
        display: 'flex', gap: 10, flexWrap: 'wrap',
        fontSize: 16, letterSpacing: '0.14em', textTransform: 'uppercase'
      }}>
        {(accent || []).map((t, i) =>
        <div key={i} style={{
          border: `1.5px solid ${fg}`, padding: '8px 14px',
          fontWeight: 500
        }}>
            {t}
          </div>
        )}
      </div>
    </Slide>);

}

// ── App data ───────────────────────────────────────────────────────────────
const APPS = [
{
  num: '01', name: 'capture.territory', tag: 'fitness · gamified',
  status: 'Live',
  body: <>A gamified running app. Run to <em>capture territories</em>, unlock brand deals, freebies & discounts — and steal someone else&rsquo;s turf if you&rsquo;re fast enough.</>,
  accent: ['run', 'claim', 'earn']
},
{
  num: '02', name: 'the.pantry', tag: 'kitchen · ai',
  status: 'Live',
  body: <>Track what&rsquo;s in your kitchen without thinking. Know <em>what you have, what&rsquo;s expiring,</em> and what to buy next — auto-synced.</>,
  accent: ['stock', 'expiry', 'restock']
},
{
  num: '03', name: 'cashflow', tag: 'finance · split-pay',
  status: 'Live',
  body: <>Track expenses & income — and <em>split money for group plans</em> without the usual mess of receipts and chase-up reminders.</>,
  accent: ['track', 'split', 'settle']
},
{
  num: '04', name: 'yeni', tag: 'learning · daily',
  status: 'Live',
  body: <>One new thing every day. <em>Quick, easy, no overwhelm</em> — a small habit engineered to compound into something real.</>,
  accent: ['daily', 'tiny', 'compound']
},
{
  num: '05', name: 'Jain.dham', tag: 'spiritual · ai',
  status: 'Live',
  body: <>Jain temples worldwide, live darshan, daily prayers and events — plus <em style={{ fontFamily: "monospace" }}>instant guidance from an AI Jain assistant.</em></>,
  accent: ['darshan', 'pray', 'discover']
}];


// ── Compose ────────────────────────────────────────────────────────────────
function CarouselSlides({ tweaks }) {
  return [
  <DCArtboard key="s1" id="s1" label="01 · Hook" width={W} height={H}>
      <SlideHook tweaks={tweaks} />
    </DCArtboard>,
  ...APPS.map((app, i) =>
  <DCArtboard key={app.num} id={`s${i + 2}`} label={`0${i + 2} · ${app.name}`} width={W} height={H}>
        <AppSlide idx={i + 1} {...app} tweaks={tweaks} />
      </DCArtboard>
  )];

}

window.CarouselSlides = CarouselSlides;