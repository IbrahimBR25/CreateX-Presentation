import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Marketing presentation website palette — edit here to rebrand the landing page
        lp: {
          navy: "#142B4A",
          blue: "#3977D5",
          bg: "#F7F9FC",
          surface: "#FFFFFF",
          teal: "#36B8A5",
          ink: "#202C3C",
          muted: "#68768A",
          line: "#E3E8F0",
          soft: "#EEF3FA",
        },
        canvas: "#F4F6FA",
        surface: "#FFFFFF",
        "surface-subtle": "#F8FAFC",
        hairline: "#E7EBF2",
        charcoal: "#303747",
        coolborder: "#E7EBF2",
        pastel: {
          lavender: "#D0CBFF",
          "lavender-pale": "#F2F0FF",
          blue: "#BDEAF8",
          "blue-pale": "#DFF4FC",
          yellow: "#FFE681",
          "yellow-pale": "#FFF8DB",
          cyan: "#35B8D5",
        },
        ink: {
          primary: "#303747",
          secondary: "#5A6275",
          muted: "#8A93A3",
          inverted: "#FFFFFF",
        },
        brand: {
          DEFAULT: "#35B8D5",
          hover: "#289BB5",
          subtle: "#DFF4FC",
          border: "#BDEAF8",
        },
        status: {
          present: {
            bg: "#EAF7F1",
            border: "#C5E9D8",
            text: "#1E7E5A",
            dot: "#28A073",
          },
          pending: {
            bg: "#FFF8DB",
            border: "#F5E09B",
            text: "#9A6712",
            dot: "#E5A524",
          },
          absent: {
            bg: "#FDF0F2",
            border: "#F5CED4",
            text: "#B83B4A",
            dot: "#D95364",
          },
        },
      },
      fontFamily: {
        sans: ["'Inter'", "'Manrope'", "'Plus Jakarta Sans'", "'Tajawal'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "10px",
        sm: "8px",
        md: "10px",
        lg: "14px",
        xl: "16px",
        "2xl": "18px",
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(48, 55, 71, 0.03)",
        xs: "0 2px 6px 0 rgba(48, 55, 71, 0.04)",
        card: "0 2px 10px 0 rgba(48, 55, 71, 0.04)",
        "card-hover": "0 6px 18px -2px rgba(48, 55, 71, 0.06)",
        hairline: "0 1px 2px 0 rgba(48, 55, 71, 0.03)",
        dialog: "0 10px 28px -4px rgba(48, 55, 71, 0.08), 0 0 0 1px #E7EBF2",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(({ addUtilities }) => {
      addUtilities({
        ".outline-hidden": {
          outline: "2px solid transparent",
          "outline-offset": "2px",
        },
      });
    }),
  ],
};

export default config;
