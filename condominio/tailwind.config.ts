module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      "2xs": "320px",
      xs: "434px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1436px",
      "3xl": "1640px",
      "4xl": "1920px",
    },
    extend: {
      colors: {
        text: {
          base: "#1a1a1a",
        },
        LandingBlue: "#007AFF",
        LandingYellow: "#F9C05F",
        LandingBlack: "#000000",
        LandingWhite: "#FFFFFF",
        primary: {
          50: "#f0f3ff",
          100: "#e4e8ff",
          200: "#cdd6ff",
          300: "#a5b2ff",
          400: "#727fff",
          500: "#3a42ff",
          600: "#1712ff",
          700: "#0201ff",
          800: "#0100d7",
          900: "#030293",
          950: "#000678",
          1000: "#071A6E",
        },
        secondary: {
          50: "#f0f3ff",
          100: "#e4e8ff",
          200: "#cdd6ff",
          300: "#a5b2ff",
          400: "#727fff",
          500: "#3a42ff",
          600: "#1712ff",
          700: "#0201ff",
          800: "#0100d7",
          900: "#030293",
          950: "#000678",
          1000: "#071A6E",
        },
        green: {
          100: "#F0FFF4",
          200: "#C6F6D5",
          300: "#9AE6B4",
          400: "#68D391",
          500: "#48BB78",
          600: "#38A169",
          700: "#2F855A",
          800: "#276749",
          900: "#22543D",
        },
        orange: {
          50: "#FFF5F2",
          100: "#FFE8D9",
          200: "#FFD3BA",
          300: "#FCAE8D",
          400: "#FF8A4C",
          500: "#FF5A1F",
          600: "#D03801",
          700: "#B43403",
          800: "#8A2C0D",
          900: "#771D1D",
        },
        brown: {
          50: "#F7F4F2",
          100: "#E7E2E1",
          200: "#C5B9B3",
          300: "#A19288",
          400: "#746058",
          500: "#5D473A",
          600: "#483631",
          700: "#33241C",
          800: "#211716",
          900: "#1A1413",
        },
      },
      boxShadow: {
        section: "0 1px 1px #172b4d40,0 0 1px #172b4d40",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      keyframes: {
        slideDown: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [
  ]}