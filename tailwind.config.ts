import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Psychology-focused color extensions (WCAG AA Compliant)
        amber: {
          DEFAULT: 'hsl(var(--amber))',
          light: 'hsl(var(--amber-light))',
          foreground: 'hsl(var(--amber-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        celebration: {
          DEFAULT: 'hsl(var(--celebration))',
          foreground: 'hsl(var(--celebration-foreground))',
        },
        encouragement: {
          DEFAULT: 'hsl(var(--encouragement))',
          light: 'hsl(var(--encouragement-light))',
          foreground: 'hsl(var(--encouragement-foreground))',
        },
        // Additional accessible color variations - Natural Palette
        'primary-accessible': {
          DEFAULT:
            'hsl(120 14% 33%)' /* #485F48 - Natural forest green accessible primary */,
          light:
            'hsl(120 9% 41%)' /* #607360 - Natural sage accessible primary-light */,
          dark: 'hsl(120 9% 57%)' /* #869E86 - Natural sage accessible for dark mode */,
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Psychology-focused animations
        celebrate: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.05) rotate(1deg)' },
          '50%': { transform: 'scale(1.1) rotate(-1deg)' },
          '75%': { transform: 'scale(1.05) rotate(1deg)' },
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        celebrate: 'celebrate 1.5s ease-out',
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      // Touch-friendly sizing
      spacing: {
        '18': '4.5rem', // 72px - Good for touch targets
        '22': '5.5rem', // 88px - Larger touch targets
      },
      // Psychology-focused typography
      fontSize: {
        identity: ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],
        celebration: ['1rem', { lineHeight: '1.4', fontWeight: '500' }],
        gentle: ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
