module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // blue-600 - Clear sky blue
          50: "#EFF6FF", // blue-50
          100: "#DBEAFE", // blue-100
          500: "#3B82F6", // blue-500
          600: "#2563EB", // blue-600
          700: "#1D4ED8", // blue-700
        },
        secondary: {
          DEFAULT: "#64748B", // slate-500 - Neutral slate
          100: "#F1F5F9", // slate-100
          200: "#E2E8F0", // slate-200
          300: "#CBD5E1", // slate-300
          400: "#94A3B8", // slate-400
          500: "#64748B", // slate-500
          600: "#475569", // slate-600
        },
        accent: {
          DEFAULT: "#F59E0B", // amber-500 - Warm amber
          100: "#FEF3C7", // amber-100
          500: "#F59E0B", // amber-500
          600: "#D97706", // amber-600
        },
        background: "#F8FAFC", // slate-50 - Soft off-white
        surface: "#FFFFFF", // white - Pure white
        text: {
          primary: "#1E293B", // slate-800 - Deep charcoal
          secondary: "#64748B", // slate-500 - Medium gray
        },
        success: {
          DEFAULT: "#10B981", // emerald-500 - Fresh green
          100: "#D1FAE5", // emerald-100
          500: "#10B981", // emerald-500
          600: "#059669", // emerald-600
        },
        warning: {
          DEFAULT: "#F59E0B", // amber-500 - Consistent amber
          100: "#FEF3C7", // amber-100
          500: "#F59E0B", // amber-500
          600: "#D97706", // amber-600
        },
        error: {
          DEFAULT: "#EF4444", // red-500 - Clear red
          100: "#FEE2E2", // red-100
          500: "#EF4444", // red-500
          600: "#DC2626", // red-600
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        inter: ['Inter', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'data': ['1rem', { lineHeight: '1.5', fontFamily: 'JetBrains Mono' }],
      },
      spacing: {
        'touch': '44px',
        'touch-buffer': '8px',
      },
      backdropBlur: {
        'glass': '10px',
      },
      boxShadow: {
        'weather-card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'floating': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'focus': '0 0 0 3px rgba(37, 99, 235, 0.1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'skeleton': 'loading 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        loading: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
}