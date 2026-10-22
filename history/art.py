"""
Inline SVG artwork for each topic, drawn from shapes rather than traced paths.

Each function takes a suffix so that the same art can appear twice on one page
(the home card and the topic header) without clashing <defs> ids. The art keeps
its own fixed palette in both light and dark themes, like a print would.
"""

from __future__ import annotations


def tudors(s: str) -> str:
    """The Tudor rose on a lozenge diaper in the Tudor livery of green and white."""
    sepals = "".join(f'<polygon points="0,-80 10,-48 -10,-48" fill="#4c7a3d" transform="rotate({36 + 72 * k})"/>'
                     for k in range(5))
    outer = "".join(f'<circle cx="0" cy="-33" r="31" fill="#a4231d" stroke="#5e0f0c" stroke-width="1.5" '
                    f'transform="rotate({72 * k})"/>' for k in range(5))
    inner = "".join(f'<circle cx="0" cy="-17" r="17" fill="#f3ead8" stroke="#a4231d" stroke-width="1" '
                    f'transform="rotate({36 + 72 * k})"/>' for k in range(5))
    seeds = "".join(f'<circle cx="0" cy="-6" r="2" fill="#7a5410" transform="rotate({72 * k})"/>' for k in range(5))
    return f"""<svg viewBox="0 0 400 175" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A Tudor rose on a green and white diamond pattern">
  <defs>
    <pattern id="diaper{s}" width="28" height="28" patternUnits="userSpaceOnUse">
      <rect width="28" height="28" fill="#1f4a2f"/>
      <path d="M14 0 L28 14 L14 28 L0 14 Z" fill="none" stroke="#e9e1cc" stroke-opacity=".28" stroke-width="1.2"/>
      <circle cx="14" cy="14" r="1.6" fill="#d4a63a" fill-opacity=".7"/>
    </pattern>
    <radialGradient id="glow{s}"><stop offset="0" stop-color="#e9e1cc" stop-opacity=".22"/><stop offset="1" stop-color="#e9e1cc" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="400" height="175" fill="url(#diaper{s})"/>
  <rect x="0" width="400" height="175" fill="none" stroke="#d4a63a" stroke-width="6"/>
  <circle cx="200" cy="80" r="96" fill="url(#glow{s})"/>
  <g transform="translate(200 80)">{sepals}{outer}{inner}
    <circle r="11" fill="#d4a63a" stroke="#7a5410" stroke-width="1.2"/>{seeds}
  </g>
  <rect x="86" y="149" width="228" height="21" fill="#1f4a2f" stroke="#d4a63a" stroke-width="1"/>
  <text x="200" y="164" text-anchor="middle" font-family="'IM Fell English SC', Georgia, serif" font-size="13" letter-spacing="5" fill="#d4a63a">DIEV ET MON DROIT</text>
</svg>"""


def stuarts(s: str) -> str:
    """An engraved crown on a Civil War pamphlet, with Charles I's last word."""
    pearls = "".join(f'<circle cx="{x}" cy="121" r="2.6" fill="#efe6d1"/>' for x in range(160, 245, 12))
    return f"""<svg viewBox="0 0 400 175" preserveAspectRatio="xMidYMid slice" role="img" aria-label="An engraved royal crown above the word Remember">
  <defs>
    <pattern id="hatch{s}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <rect width="5" height="5" fill="#e7dcc3"/><line x1="0" y1="0" x2="0" y2="5" stroke="#3a2c1d" stroke-opacity=".16" stroke-width="1"/>
    </pattern>
    <pattern id="cross{s}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
      <rect width="4" height="4" fill="#6e1a20"/><line x1="0" y1="0" x2="4" y2="0" stroke="#2a1410" stroke-width="1.2"/>
    </pattern>
  </defs>
  <rect width="400" height="175" fill="url(#hatch{s})"/>
  <rect x="8" y="8" width="384" height="159" fill="none" stroke="#2a2119" stroke-width="2.5"/>
  <rect x="14" y="14" width="372" height="147" fill="none" stroke="#2a2119" stroke-width=".8"/>
  <g fill="#2a2119">
    <rect x="9" y="9" width="12" height="12"/><rect x="379" y="9" width="12" height="12"/>
    <rect x="9" y="154" width="12" height="12"/><rect x="379" y="154" width="12" height="12"/>
  </g>
  <path d="M150 112 Q148 52 200 44 Q252 52 250 112 Z" fill="url(#cross{s})"/>
  <g fill="none" stroke="#2a2119" stroke-width="5" stroke-linecap="round">
    <path d="M150 112 Q148 52 200 44 Q252 52 250 112"/>
    <path d="M176 112 Q176 62 200 44 Q224 62 224 112"/>
  </g>
  <rect x="144" y="110" width="112" height="22" rx="2" fill="#2a2119"/>
  {pearls}
  <circle cx="176" cy="121" r="4" fill="#a4231d"/><circle cx="200" cy="121" r="5" fill="#1f3f66"/><circle cx="224" cy="121" r="4" fill="#a4231d"/>
  <circle cx="200" cy="36" r="9" fill="#2a2119"/>
  <rect x="197" y="14" width="6" height="18" fill="#2a2119"/><rect x="191" y="19" width="18" height="6" fill="#2a2119"/>
  <line x1="40" y1="88" x2="120" y2="88" stroke="#2a2119" stroke-width="1"/><line x1="280" y1="88" x2="360" y2="88" stroke="#2a2119" stroke-width="1"/>
  <text x="200" y="156" text-anchor="middle" font-family="'IM Fell English SC', Georgia, serif" font-size="17" letter-spacing="6" fill="#2a2119">REMEMBER.</text>
  <text x="80" y="80" text-anchor="middle" font-family="'IM Fell English', Georgia, serif" font-style="italic" font-size="12" fill="#3a2c1d">Whitehall</text>
  <text x="320" y="80" text-anchor="middle" font-family="'IM Fell English', Georgia, serif" font-style="italic" font-size="12" fill="#3a2c1d">30 Ian. 1649</text>
</svg>"""


def russia(s: str) -> str:
    """After El Lissitzky's 1919 poster: the red wedge breaking the white circle."""
    return f"""<svg viewBox="0 0 400 175" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A red wedge driving into a white circle, after El Lissitzky's 1919 poster">
  <rect width="400" height="175" fill="#e8dcc2"/>
  <polygon points="0,0 236,0 196,175 0,175" fill="#161311"/>
  <circle cx="132" cy="92" r="58" fill="#f2ebdc"/>
  <polygon points="400,44 400,138 150,96" fill="#c1272d"/>
  <polygon points="58,22 92,30 62,40" fill="#c1272d"/>
  <polygon points="60,150 84,140 80,160" fill="#c1272d"/>
  <rect x="250" y="18" width="120" height="7" fill="#161311" transform="rotate(-8 310 21)"/>
  <rect x="250" y="140" width="110" height="5" fill="#161311" transform="rotate(-8 305 142)"/>
  <rect x="34" y="70" width="5" height="44" fill="#c1272d" transform="rotate(-8 36 92)"/>
  <text x="384" y="166" text-anchor="end" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="600" font-size="10" letter-spacing="1" fill="#161311">КЛИНОМ КРАСНЫМ БЕЙ БЕЛЫХ</text>
  <text x="262" y="56" font-family="Oswald, 'Arial Narrow', sans-serif" font-weight="700" font-size="30" letter-spacing="1" fill="#161311">1917</text>
</svg>"""


def civil_rights(s: str) -> str:
    """Placards from the 1968 Memphis sanitation strike, on a halftone newsprint ground."""
    def placard(x: float, y: float, rot: float, shade: str) -> str:
        return f"""<g transform="translate({x} {y}) rotate({rot})">
    <rect x="-5" y="40" width="10" height="120" fill="#5a4630"/>
    <rect x="-62" y="-48" width="124" height="92" fill="{shade}" stroke="#1a1916" stroke-width="1"/>
    <text x="0" y="-16" text-anchor="middle" font-family="'Alfa Slab One', Rockwell, serif" font-size="19" fill="#1a1916">I AM</text>
    <text x="0" y="22" text-anchor="middle" font-family="'Alfa Slab One', Rockwell, serif" font-size="25" fill="#1a1916">A MAN</text>
    <rect x="-46" y="29" width="92" height="4" fill="#1a1916"/>
  </g>"""
    return f"""<svg viewBox="0 0 400 175" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Three placards reading I AM A MAN, from the 1968 Memphis sanitation strike">
  <defs>
    <pattern id="dots{s}" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill="#3b3a35"/><circle cx="3" cy="3" r="1.5" fill="#55534b"/>
    </pattern>
    <linearGradient id="fade{s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1916" stop-opacity="0"/><stop offset="1" stop-color="#1a1916" stop-opacity=".6"/></linearGradient>
  </defs>
  <rect width="400" height="175" fill="url(#dots{s})"/>
  {placard(78, 84, -7, "#d9d3c4")}
  {placard(322, 82, 6, "#d9d3c4")}
  {placard(200, 74, -1, "#f3efe4")}
  <rect width="400" height="175" fill="url(#fade{s})"/>
  <text x="14" y="164" font-family="'Courier Prime', 'Courier New', monospace" font-size="11" letter-spacing="1" fill="#e9b949">MEMPHIS, TENN. · MARCH 28, 1968</text>
</svg>"""


ART = {"tudors": tudors, "stuarts": stuarts, "russia": russia, "civil-rights": civil_rights}
