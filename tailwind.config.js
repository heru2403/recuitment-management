module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#6c757d' ,// Contoh warna secondary
        primary: {
          500: '#2980b9',
          600: '#2472a4'
        },
        danger: {
          500: '#e74c3c',
          600: '#d62c1a'
        },
        success: {
          500: '#2ecc71',
          600: '#27ae60'
        },
        warning: {
          500: '#f39c12',
          600: '#e67e22'
        },
        info: {
          500: '#3498db',
          600: '#2980b9'
        }
      },
      spacing: {
        'sidebar': '250px'
      }
    }
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb'
        },
        success: {
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669'
        },
        warning: {
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706'
        },
        danger: {
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626'
        }
      }
    }
  }
}
