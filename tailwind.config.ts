import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", ...fontFamily.sans],
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        "ibm-plex": ["var(--font-ibm-plex-sans)", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "hsl(var(--foreground))",
            a: {
              color: "hsl(var(--primary))",
              "&:hover": {
                color: "hsl(var(--primary))",
              },
            },
            h1: {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-space-grotesk)",
            },
            h2: {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-space-grotesk)",
            },
            h3: {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-space-grotesk)",
            },
            h4: {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-space-grotesk)",
            },
            p: {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-ibm-plex-sans)",
            },
            li: {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-ibm-plex-sans)",
            },
          },
        },
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      backgroundImage: {
        "loading-gradient":
          "linear-gradient(90deg, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config

