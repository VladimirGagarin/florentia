// app/components/legos/theme.js
export const darkTheme = {
  colors: {
    background: '#1E2A2E',     // Dark sage green
    surface: '#2A3A3F',         // Lighter sage
    primary: '#3B4D54',         // Forest green
    text: '#E0E5E5',            // Off-white
    secondaryText: '#A0B0B0',   // Muted green-gray
    accent: '#B68B6D',          // Warm bronze
    border: '#2D3D42',          // Border color
    error: '#CF6679',
    success: '#81B69D',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    round: 999,
  },
  typography: {
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    subheader: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
};