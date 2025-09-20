// WCAG Contrast Ratio Calculator for Tiny Wins App
// This script calculates contrast ratios for all color combinations used in the app

// Convert RGB values to relative luminance
function getLuminance(r, g, b) {
  // Normalize RGB values to 0-1
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function getContrastRatio(color1, color2) {
  const l1 = getLuminance(...color1);
  const l2 = getLuminance(...color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Check WCAG compliance
function checkWCAG(ratio) {
  return {
    AA_normal: ratio >= 4.5,
    AA_large: ratio >= 3.0,
    AAA_normal: ratio >= 7.0,
    AAA_large: ratio >= 4.5,
    ratio: Math.round(ratio * 100) / 100,
  };
}

// Current Tiny Wins Color Palette (extracted from CSS variables)
const colors = {
  // Light theme colors
  light: {
    primary: [118, 158, 84], // #769E54
    primaryLight: [156, 186, 130], // #9CBA82
    primaryForeground: [255, 255, 255], // white
    background: [254, 253, 248], // #FEFDF8
    foreground: [31, 41, 55], // #1F2937
    muted: [107, 114, 128], // #6B7280
    mutedForeground: [75, 85, 99], // #4B5563
    card: [255, 255, 255], // white
    cardForeground: [31, 41, 55], // #1F2937
    border: [209, 213, 219], // #D1D5DB
    amber: [251, 146, 60], // #FB923C
    amberLight: [254, 215, 170], // #FED7AA
    amberForeground: [31, 41, 55], // #1F2937
    info: [59, 130, 246], // #3B82F6
    infoForeground: [255, 255, 255], // white
    celebration: [168, 85, 247], // #A855F7
    celebrationForeground: [255, 255, 255], // white
    encouragement: [34, 197, 94], // #22C55E
    encouragementForeground: [255, 255, 255], // white
    success: [34, 197, 94], // #22C55E
    successForeground: [255, 255, 255], // white
    warning: [251, 146, 60], // #FB923C
    warningForeground: [31, 41, 55], // #1F2937
  },

  // Dark theme colors
  dark: {
    primary: [156, 186, 130], // #9CBA82
    primaryLight: [187, 207, 171], // #BBCFAB
    primaryForeground: [17, 24, 39], // #111827
    background: [17, 24, 39], // #111827
    foreground: [249, 250, 251], // #F9FAFB
    muted: [75, 85, 99], // #4B5563
    mutedForeground: [156, 163, 175], // #9CA3AF
    card: [31, 41, 55], // #1F2937
    cardForeground: [249, 250, 251], // #F9FAFB
    border: [55, 65, 81], // #374151
    amber: [251, 191, 36], // #FBBF24
    amberForeground: [17, 24, 39], // #111827
    info: [96, 165, 250], // #60A5FA
    infoForeground: [17, 24, 39], // #111827
    celebration: [196, 181, 253], // #C4B5FD
    celebrationForeground: [17, 24, 39], // #111827
    encouragement: [134, 239, 172], // #86EFAC
    encouragementForeground: [17, 24, 39], // #111827
    success: [134, 239, 172], // #86EFAC
    successForeground: [17, 24, 39], // #111827
    warning: [251, 191, 36], // #FBBF24
    warningForeground: [17, 24, 39], // #111827
  },
};

// Test all critical color combinations
function auditColorContrast() {
  const results = {
    light: {},
    dark: {},
    issues: [],
  };

  ['light', 'dark'].forEach((theme) => {
    const palette = colors[theme];
    const currentResults = results[theme];

    // Critical text/background combinations
    const combinations = [
      // Primary text combinations
      {
        name: 'Body text on background',
        text: palette.foreground,
        bg: palette.background,
      },
      {
        name: 'Body text on card',
        text: palette.cardForeground,
        bg: palette.card,
      },
      {
        name: 'Muted text on background',
        text: palette.mutedForeground,
        bg: palette.background,
      },
      { name: 'Muted text on card', text: palette.muted, bg: palette.card },

      // Button combinations
      {
        name: 'Primary button text',
        text: palette.primaryForeground,
        bg: palette.primary,
      },
      {
        name: 'Primary light button text',
        text: palette.primary,
        bg: palette.primaryLight,
      },
      {
        name: 'Success button text',
        text: palette.successForeground,
        bg: palette.success,
      },
      {
        name: 'Warning button text',
        text: palette.warningForeground,
        bg: palette.warning,
      },
      {
        name: 'Info button text',
        text: palette.infoForeground,
        bg: palette.info,
      },
      {
        name: 'Celebration button text',
        text: palette.celebrationForeground,
        bg: palette.celebration,
      },
      {
        name: 'Encouragement button text',
        text: palette.encouragementForeground,
        bg: palette.encouragement,
      },

      // Interactive elements
      {
        name: 'Primary text on background (links)',
        text: palette.primary,
        bg: palette.background,
      },
      {
        name: 'Primary text on card (links)',
        text: palette.primary,
        bg: palette.card,
      },
      {
        name: 'Success text on background',
        text: palette.success,
        bg: palette.background,
      },
      {
        name: 'Warning text on background',
        text: palette.warning,
        bg: palette.background,
      },
      {
        name: 'Amber text on background',
        text: palette.amber,
        bg: palette.background,
      },

      // Border contrast (3:1 minimum for UI components)
      {
        name: 'Border on background',
        text: palette.border,
        bg: palette.background,
      },
      { name: 'Border on card', text: palette.border, bg: palette.card },
    ];

    combinations.forEach((combo) => {
      const ratio = getContrastRatio(combo.text, combo.bg);
      const wcag = checkWCAG(ratio);

      currentResults[combo.name] = {
        ratio: wcag.ratio,
        AA_normal: wcag.AA_normal,
        AA_large: wcag.AA_large,
        colors: {
          text: `rgb(${combo.text.join(', ')})`,
          background: `rgb(${combo.bg.join(', ')})`,
        },
      };

      // Track issues for fixing
      if (!wcag.AA_normal) {
        results.issues.push({
          theme,
          combination: combo.name,
          ratio: wcag.ratio,
          required: 4.5,
          textColor: combo.text,
          backgroundColor: combo.bg,
        });
      }
    });
  });

  return results;
}

// Generate contrast report
function generateReport() {
  const audit = auditColorContrast();

  console.log('='.repeat(60));
  console.log('TINY WINS COLOR CONTRAST AUDIT - WCAG 2.1 AA COMPLIANCE');
  console.log('='.repeat(60));

  ['light', 'dark'].forEach((theme) => {
    console.log(`\n${theme.toUpperCase()} THEME:`);
    console.log('-'.repeat(40));

    Object.entries(audit[theme]).forEach(([name, result]) => {
      const status = result.AA_normal ? '✅ PASS' : '❌ NEEDS ATTENTION';
      const largeStatus = result.AA_large ? '✅' : '❌';
      console.log(
        `${status} ${name}: ${result.ratio}:1 (Large text: ${largeStatus})`
      );

      if (!result.AA_normal) {
        const needed = (4.5 / result.ratio).toFixed(2);
        console.log(`  → Needs ${needed}x improvement to reach 4.5:1`);
      }
    });
  });

  console.log(`\n${'='.repeat(60)}`);
  console.log('ACCESSIBILITY ISSUES SUMMARY');
  console.log('='.repeat(60));

  if (audit.issues.length === 0) {
    console.log('🎉 All color combinations pass WCAG 2.1 AA requirements!');
  } else {
    console.log(`⚠️  Found ${audit.issues.length} accessibility issues:`);
    audit.issues.forEach((issue, index) => {
      console.log(
        `\n${index + 1}. ${issue.theme} theme - ${issue.combination}`
      );
      console.log(
        `   Current ratio: ${issue.ratio}:1 (needs ${issue.required}:1)`
      );
      console.log(`   Text: rgb(${issue.textColor.join(', ')})`);
      console.log(`   Background: rgb(${issue.backgroundColor.join(', ')})`);
    });
  }

  return audit;
}

// Run the audit
const auditResults = generateReport();

// Export for use in fixing colors
if (typeof module !== 'undefined') {
  module.exports = {
    auditResults,
    getContrastRatio,
    getLuminance,
    checkWCAG,
    colors,
  };
}
