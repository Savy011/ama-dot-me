import Atkinson from "@/fonts/atkinson-hyperlegible-mono.ttf";
import Englebert from "@/fonts/englebert.ttf";
import Faustina from "@/fonts/faustina.ttf";

export const CONSTANTS = {
  OG_WIDTH: 1200,
  OG_HEIGHT: 630,
  CACHE_HEADERS: {
    "Content-Type": "image/png",
    "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    "CDN-Cache-Control": "max-age=604800",
  },
  FONTS: [
    { name: "Faustina", data: Faustina, weight: 400, style: "normal" },
    { name: "Atkinson Hyperlegible Mono", data: Atkinson, weight: 400, style: "normal" },
    { name: "Englebert", data: Englebert, weight: 400, style: "normal" },
  ],
};

function cleanText(raw: string): string {
  return raw
    .replace(/&#8230;/g, "\u2026") // ellipsis
    .replace(/&#8217;/g, "\u2019") // right single quote
    .replace(/&#8216;/g, "\u2018") // left single quote
    .replace(/&#8220;/g, "\u201C") // left double quote
    .replace(/&#8221;/g, "\u201D") // right double quote
    .replace(/&#8211;/g, "\u2013") // en dash
    .replace(/&#8212;/g, "\u2014") // em dash
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]*>/g, ""); // strip any remaining HTML tags
}

function prepareText(
  subtitle: string | undefined,
  maxLength = 80,
): { text: string; fontSize: string } {
  if (!subtitle) return { text: "", fontSize: "72px" };
  const clean = cleanText(subtitle);
  const truncated = clean.length > maxLength ? `${clean.slice(0, maxLength - 3)}...` : clean;

  const fontSize = truncated.length > 80 ? "50px" : truncated.length > 50 ? "60px" : "72px";

  return { text: truncated, fontSize };
}

const PALETTE = {
  Green: "#4e9e72",
  GreenDark: "#1c3d2a",
  GreenCard: "#163324",

  Peach: "#ffaa80",
  PeachLight: "#ffd0b5",

  GridLine: "rgba(255, 255, 255, 0.07)",
  OffWhite: "#f0ede6",

  Muted: "rgba(240, 237, 230, 0.55)",
  LinkBtn: "rgba(15, 28, 20, 0.55)",
};

const FONT_SIZES = {
  SiteLabel: "22px",
  Handle: "40px",
  Pill: "17px",
};

export function QuestionTemplate(question: string): string {
  const { fontSize, text } = prepareText(question);

  return `
    <div style="
      display:          flex;
      flex-direction:   column;
      justify-content:  space-between;
      width:            ${CONSTANTS.OG_WIDTH}px;
      height:           ${CONSTANTS.OG_HEIGHT}px;
      background-color: ${PALETTE.GreenCard};
      background-image: linear-gradient(${PALETTE.GridLine} 1px, transparent 1px),
                        linear-gradient(90deg, ${PALETTE.GridLine} 1px, transparent 1px);
      background-size:  48px 48px;
      padding:          56px 72px;
      font-family:      'Atkinson Hyperlegible Mono';
    ">

      <div style="
        display:     flex;
        align-items: center;
        gap:         10px;
      ">
        <div style="
          display:       flex;
          width:         10px;
          height:        10px;
          border-radius: 50%;
          background:    ${PALETTE.Peach};
        "></div>
        <span style="
          display:        flex;
          font-size:      ${FONT_SIZES.SiteLabel};
          color:          ${PALETTE.Muted};
          letter-spacing: 0.06em;
          font-family:    'Atkinson Hyperlegible Mono';
        ">ama.yvas.me</span>
      </div>

      <div style="
        display:     flex;
        font-size:   ${fontSize};
        color:       ${PALETTE.OffWhite};
        line-height: 1.25;
        max-width:   900px;
        font-family: 'Faustina';
      ">${text}</div>

      <div style="
        display:         flex;
        justify-content: space-between;
        align-items:     flex-end;
        width:           100%;
      ">
        <span style="
          display:     flex;
          font-size:   ${FONT_SIZES.Handle};
          color:       ${PALETTE.Peach};
          font-family: 'Englebert';
        ">— .savy</span>
        <span style="
          display:          flex;
          font-size:        ${FONT_SIZES.Pill};
          color:            ${PALETTE.Muted};
          letter-spacing:   0.1em;
          font-family:      'Atkinson Hyperlegible Mono';
          border:           2px solid rgba(255,255,255,0.08);
          padding:          6px 18px;
          border-radius:    999px;
          background-color: rgba(255,255,255,0.05);
        ">ask me anything</span>
      </div>
    </div>
`;
}

export function DefaultTemplate(text: string): string {
  return `
    <div style="
      display:          flex;
      flex-direction:   column;
      justify-content:  space-between;
      width:            ${CONSTANTS.OG_WIDTH}px;
      height:           ${CONSTANTS.OG_HEIGHT}px;
      background-color: ${PALETTE.GreenCard};
      background-image: linear-gradient(${PALETTE.GridLine} 1px, transparent 1px),
                        linear-gradient(90deg, ${PALETTE.GridLine} 1px, transparent 1px);
      background-size:  48px 48px;
      padding:          56px 72px;
      font-family:      'Atkinson Hyperlegible Mono';
    ">
      <div style="
        display:     flex;
        align-items: center;
        gap:         10px;
      ">
        <div style="
          display:       flex;
          width:         10px;
          height:        10px;
          border-radius: 50%;
          background:    ${PALETTE.Peach};
        "></div>
        <span style="
          display:        flex;
          font-size:      ${FONT_SIZES.SiteLabel};
          color:          ${PALETTE.Muted};
          letter-spacing: 0.06em;
          font-family:    'Atkinson Hyperlegible Mono';
        ">ama.yvas.me</span>
      </div>

      <div style="
        display:     flex;
        font-size:   72px;
        color:       ${PALETTE.OffWhite};
        line-height: 1.1;
        font-family: 'Faustina';
      ">${text}</div>

      <div style="
        display:         flex;
        justify-content: space-between;
        align-items:     flex-end;
        width:           100%;
      ">
        <span style="
          font-size:   ${FONT_SIZES.Handle};
          color:       ${PALETTE.Peach};
          font-family: 'Englebert';
        ">— .savy</span>
        <span style="
          font-size:        ${FONT_SIZES.Pill};
          color:            ${PALETTE.Muted};
          letter-spacing:   0.1em;
          font-family:      'Atkinson Hyperlegible Mono';
          border:           2px solid rgba(255,255,255,0.08);
          padding:          6px 18px;
          border-radius:    999px;
          background-color: rgba(255,255,255,0.05);
        ">ask me anything</span>
      </div>
    </div>
  `;
}
