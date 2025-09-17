export const Colors = {
  primary: '#2563EB',
  secondary: '#F59E0B',
  success: '#10B981',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  muted: '#6B7280',
  divider: '#E5E7EB',
  shadow: 'rgba(0,0,0,0.08)',
};

export const Elevation = {
  card: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },
};

export const Spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
};

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  round: 999,
};

export const Typography = {
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.muted,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
  },
};

export const PaperTheme = {
  colors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    background: Colors.background,
    surface: Colors.surface,
    error: Colors.error,
    onPrimary: '#ffffff',
    onSecondary: '#111827',
    onBackground: Colors.text,
    onSurface: Colors.text,
    onError: '#ffffff',
  },
  roundness: Radii.md,
};
