// const defaultTheme = require('tailwindcss/defaultTheme');
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindcssAnimatePlugin from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Helvetica", ...fontFamily.sans],
      },
      // Override default dropshadow color
      /*
      dropShadow: {
        "md": [
          '0 4px 3px hsl(var(--card-foreground) / 0.07)',
          '0 2px 2px hsl(var(--card-foreground) / 0.06)',
        ],
        "xl": [
          '0 20px 13px hsl(var(--card-foreground) / 0.03)',
          '0 8px 5px hsl(var(--card-foreground) / 0.08)',
        ]
      },
      */
      colors: {
        sugilite: "hsl(var(--sugilite))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimatePlugin],
};

export default config;

