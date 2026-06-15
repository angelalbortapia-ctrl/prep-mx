import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  // `hover:` solo se aplica en dispositivos con puntero fino (mouse/trackpad).
  // En móviles/tablets táctiles los estilos hover NO se disparan al tocar.
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'uni-primary': 'hsl(var(--uni-primary) / <alpha-value>)',
        'uni-accent': 'hsl(var(--uni-accent) / <alpha-value>)',
        'uni-primary-foreground': 'hsl(var(--uni-primary-foreground) / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      transitionTimingFunction: {
        // Curva tipo iOS para interacciones táctiles fluidas.
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      fontFamily: {
        serif: ["'Playfair Display'", 'Georgia', 'Garamond', 'Times New Roman', 'serif'],
        sans: ["'Plus Jakarta Sans'", 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    // Utilidades táctiles para apps híbridas (móvil/tablet/nativo).
    plugin(({ addUtilities, addVariant }) => {
      // Variantes según capacidad del puntero (útil para gestos táctiles).
      addVariant('coarse', '@media (pointer: coarse)');
      addVariant('fine', '@media (pointer: fine)');
      // Variante de standalone (PWA / contenedor nativo en pantalla completa).
      addVariant('standalone', '@media (display-mode: standalone)');

      addUtilities({
        // Oculta scrollbars manteniendo el scroll (carruseles de materias).
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        },
        '.scrollbar-none::-webkit-scrollbar': {
          display: 'none',
        },
        // Quita el flash gris al tocar en móviles.
        '.tap-transparent': {
          '-webkit-tap-highlight-color': 'transparent',
        },
        // Aceleración por hardware para transformaciones de pulsación.
        '.gpu': {
          transform: 'translateZ(0)',
          'backface-visibility': 'hidden',
          'will-change': 'transform',
        },
        // Padding seguro para notch/home-indicator.
        '.pt-safe': { 'padding-top': 'env(safe-area-inset-top)' },
        '.pb-safe': { 'padding-bottom': 'env(safe-area-inset-bottom)' },
        '.min-h-screen-safe': {
          'min-height': '100svh',
        },
      });
    }),
  ],
};

export default config;
