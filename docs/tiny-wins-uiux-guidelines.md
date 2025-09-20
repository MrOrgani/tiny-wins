# Tiny Wins UI/UX Design Guidelines

_For the Micro-Habits App that Builds Identity Through Showing Up_

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Core Design Principles](#core-design-principles)
3. [Visual Design System](#visual-design-system)
4. [Component Library](#component-library)
5. [User Experience Flows](#user-experience-flows)
6. [Micro-Interactions & Animations](#micro-interactions--animations)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Mobile-First Requirements](#mobile-first-requirements)
9. [Psychology-Informed Decisions](#psychology-informed-decisions)
10. [Do's and Don'ts](#dos-and-donts)
11. [Key Screens Specifications](#key-screens-specifications)

---

## Design Philosophy

**Core Mantra**: _"Every pixel should whisper: 'You showed up. That's enough. That's everything.'"_

The UI/UX of Tiny Wins exists to support one fundamental goal: making the act of showing up feel effortless, meaningful, and identity-affirming. Every design decision should reduce friction to starting while amplifying the psychological rewards of consistency.

### Three Pillars of Design:

1. **Effortless Entry** - Reduce cognitive load to near-zero
2. **Identity Amplification** - Strengthen user's evolving self-concept
3. **Gentle Persistence** - Encourage without pressuring

---

## Core Design Principles

### 1. **Radical Simplicity**

- Remove every element that doesn't directly serve showing up
- Binary choices over complex options
- One primary action per screen maximum

### 2. **Celebration Over Measurement**

- Emphasize progress over performance
- Make small wins feel significant
- Visual rewards for consistency, not completion

### 3. **Identity-First Language**

- "You're becoming..." not "You completed..."
- Present tense affirmations
- Personal transformation vocabulary

### 4. **Forgiveness by Design**

- No shame-inducing visual elements
- Built-in grace periods and flexibility
- Recovery emphasized over perfection

### 5. **Momentum Visualization**

- Patterns matter more than streaks
- Show resilience and bounce-back ability
- Focus on trajectory, not absolute numbers

---

## Visual Design System

### Color Palette

#### Primary Colors

- **Sage Green (#87A96B)** - Primary action, success, growth
  - _Psychology_: Calming growth, natural progression
  - _Usage_: "I showed up" button, positive states

- **Warm White (#FEFDF8)** - Background, clean slate
  - _Psychology_: Fresh start, clarity, possibility
  - _Usage_: Main backgrounds, card backgrounds

#### Supporting Colors

- **Soft Charcoal (#2D3748)** - Primary text, structure
  - _Psychology_: Grounded, reliable, trustworthy
  - _Usage_: Headlines, important text, icons

- **Gentle Gray (#718096)** - Secondary text, inactive states
  - _Psychology_: Calm, non-demanding, supportive
  - _Usage_: Secondary text, helper text, inactive elements

- **Warm Amber (#F6AD55)** - "Life happened" states, pause days
  - _Psychology_: Understanding, warmth, acceptance
  - _Usage_: Protected days, pause indicators

- **Soft Blue (#63B3ED)** - Information, encouragement
  - _Psychology_: Trust, calm confidence, reliability
  - _Usage_: Tips, encouragement messages, information states

#### Colors to NEVER Use

- **Red/Crimson** - Associated with failure and shame
- **Harsh Orange** - Creates urgency and stress
- **Bright Yellow** - Can trigger anxiety
- **Pure Black** - Too harsh, creates tension

### Typography

#### Font Family

**Primary**: SF Pro Display (iOS) / Roboto (Android)

- Clean, readable, system-optimized
- Reduces cognitive load through familiarity

#### Type Scale

```
Headline: 28px, Bold (Page titles, identity statements)
Title: 24px, Semibold (Section headers, habit names)
Body: 17px, Regular (Main content, descriptions)
Caption: 15px, Medium (Labels, secondary info)
Small: 13px, Regular (Helper text, timestamps)
```

#### Font Weights

- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Labels, captions, buttons
- **Semibold (600)**: Titles, important actions
- **Bold (700)**: Headlines, identity statements

### Spacing System

Based on 8px grid for consistency and rhythm:

```
XXS: 4px   (Icon spacing, fine adjustments)
XS:  8px   (Text spacing, small padding)
SM:  16px  (Component padding, text margins)
MD:  24px  (Section spacing, card margins)
LG:  32px  (Major section breaks)
XL:  48px  (Screen margins, major spacing)
XXL: 64px  (Full section breaks)
```

### Border Radius

- **Small**: 8px (Buttons, small components)
- **Medium**: 12px (Cards, larger components)
- **Large**: 16px (Main containers, modals)

---

## Component Library

### 1. Daily Check-In Card

**Purpose**: Primary interaction for logging habit completion

**Design Specifications**:

- **Size**: Full width - 32px margins, minimum 120px height
- **Background**: Warm white with subtle shadow (0px 2px 8px rgba(0,0,0,0.05))
- **Border Radius**: 12px
- **Layout**: Horizontal with habit name left, check-in button right

**States**:

- **Default**: Sage green "I Showed Up" button (48px height, full width - 16px)
- **Completed**: Green checkmark with "You showed up!" text
- **Protected**: Amber "Life Happened" button alternative
- **Past Day**: Grayed out with small indicator

**Interaction**:

- Single tap to complete
- Haptic feedback on success
- Immediate visual confirmation

### 2. Momentum Visualization

**Purpose**: Show consistency patterns without streak pressure

**Design Specifications**:

- **Layout**: 7 circles representing last 7 days
- **Circle Size**: 32px diameter
- **Spacing**: 8px between circles
- **Colors**:
  - Completed: Sage green filled circle
  - Missed: Light gray outline circle
  - Protected: Amber filled circle
  - Today: Larger (40px) with subtle pulse animation

**Labels**:

- Days of week underneath (abbreviated)
- "This Week" title above
- Momentum percentage below (e.g., "6/7 days - Great momentum!")

### 3. Identity Badge

**Purpose**: Reinforce identity transformation

**Design Specifications**:

- **Shape**: Rounded rectangle badge
- **Size**: Auto-width + 24px padding, 36px height
- **Background**: Soft blue with alpha 20%
- **Text**: "Day 23 as a Reader" in soft charcoal
- **Position**: Top of screen, centered

**Animation**: Gentle scale up (1.05x) when updated

### 4. Habit Creation Flow

**Purpose**: Guide users to create impossibly small habits

**Design Specifications**:

- **Step Indicator**: 4 dots at top, filled progressively
- **"Shrink It" Button**: Amber button that appears after each input
- **Input Field**: Large, friendly text input (56px height)
- **Helper Text**: Encouraging examples in gentle gray

### 5. Quick Win Button

**Purpose**: Primary CTA for daily check-ins

**Design Specifications**:

- **Size**: Minimum 48px height for thumb accessibility
- **Width**: Full container width minus 32px margins
- **Background**: Sage green gradient (subtle)
- **Text**: White, medium weight, 17px
- **Border Radius**: 12px
- **Press State**: Darker green, slight scale down (0.98x)

---

## User Experience Flows

### Onboarding Flow (Goal: First win in under 60 seconds)

**Screen 1: Welcome**

- Minimal text: "Become who you want to be"
- Single CTA: "Start Small"
- Background: Warm white with subtle sage accent

**Screen 2: Identity Selection**

- Question: "Who do you want to become?"
- 6 preset options + "Something else"
- Large, tappable cards (72px height)

**Screen 3: Habit Input**

- "What tiny habit helps you become a [identity]?"
- Text input with encouraging placeholder
- "Shrink It" button prominently displayed

**Screen 4: Habit Shrinking**

- "Let's make it even smaller"
- Show reduced version automatically
- Must tap "Shrink It" 2 more times before proceeding

**Screen 5: First Check-In**

- "Ready for your first win?"
- Large "I Showed Up" button
- Immediate celebration animation on tap

### Daily Check-In Flow (Goal: Complete in under 10 seconds)

**Entry Point**: Notification or app open
**Screen**: Single habit card with check-in button
**Action**: One tap
**Feedback**: Animation + identity reinforcement
**Exit**: Automatic return to previous app or gentle close

### Recovery Flow (After missed days)

**Trigger**: User returns after 2+ missed days
**Screen**: "Welcome back, [identity]!"
**Options**:

- "I'm ready to show up again"
- "Life happened - let's adjust"
  **No shame language**: Focus on return, not absence

---

## Micro-Interactions & Animations

### 1. Success Celebration

**Trigger**: Completing daily check-in
**Animation**:

- Green checkmark scales in (0.8x to 1.2x to 1x)
- Subtle confetti burst (5-7 particles)
- Identity badge updates with gentle glow
  **Duration**: 1.5 seconds
  **Purpose**: Reinforce positive behavior

### 2. Momentum Update

**Trigger**: Daily completion updates weekly view
**Animation**:

- New circle fills from center outward
- Momentum percentage counts up
- Gentle bounce on completion
  **Duration**: 800ms
  **Purpose**: Visualize progress accumulation

### 3. "Life Happened" Comfort

**Trigger**: Using protected day option
**Animation**:

- Amber circle appears with gentle pulse
- Text "That's okay" fades in below
- No dramatic effects - calm acceptance
  **Duration**: 1 second
  **Purpose**: Remove guilt from missed days

### 4. Habit Level-Up

**Trigger**: User chooses to increase habit difficulty
**Animation**:

- Identity badge briefly scales up (1.1x)
- New habit appears with typewriter effect
- Celebratory but calm - growth, not achievement
  **Duration**: 2 seconds
  **Purpose**: Mark identity evolution

### 5. Streak Recovery

**Trigger**: First check-in after missed days
**Animation**:

- "Welcome back" text gentle fade-in
- Momentum visualization rebuilds slowly
- Focus on return, not what was lost
  **Duration**: 1.5 seconds
  **Purpose**: Encourage resilience

### 6. Loading States

**Style**: Gentle pulse on buttons, never spinners
**Color**: Sage green with opacity animation
**Purpose**: Maintain calm, never frantic

### 7. Button Press Feedback

**Immediate Response**: 50ms scale down to 0.98x
**Release**: Scale back to 1x with slight bounce
**Haptic**: Light impact for iOS
**Purpose**: Confirm action without over-celebrating

### 8. Navigation Transitions

**Style**: Gentle fade and slight slide (16px)
**Duration**: 300ms
**Easing**: Ease-out for natural feel
**Purpose**: Smooth flow between states

### 9. Empty State Reveal

**Trigger**: No habits yet created
**Animation**:

- Encouragement text fades in
- "Create your first tiny habit" button gentle pulse
- No urgency - invitation to begin
  **Purpose**: Encourage without pressure

### 10. Weekly Reset

**Trigger**: New week begins
**Animation**:

- Previous week's circles fade to softer opacity
- New week indicators fade in
- Fresh start feeling without losing history
  **Purpose**: New beginning while honoring progress

---

## Accessibility Guidelines

### Motor Accessibility

- **Minimum Touch Targets**: 48px x 48px for all interactive elements
- **Thumb Zones**: Primary actions in easy reach areas
- **Single-Handed Use**: Critical features accessible with one thumb
- **Gesture Alternatives**: No swipe-only interactions

### Visual Accessibility

- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color Independence**: Never rely solely on color to convey information
- **Font Sizes**: Respect system text size preferences
- **Focus Indicators**: Clear visual focus for keyboard navigation

### Cognitive Accessibility

- **Simple Language**: Clear, encouraging, non-technical
- **Consistent Patterns**: Same interactions work the same way
- **Clear Hierarchy**: Visual importance matches actual importance
- **Error Prevention**: Design to prevent mistakes rather than handle them

### Screen Reader Support

- **Meaningful Labels**: "Complete today's tiny habit" not "Button"
- **State Announcements**: "Completed" or "Not yet done"
- **Navigation**: Logical tab order and heading structure
- **Dynamic Content**: Announce changes to momentum and progress

---

## Mobile-First Requirements

### Responsive Breakpoints

- **Mobile**: 320px - 768px (primary focus)
- **Tablet**: 768px - 1024px (enhanced layout)
- **Desktop**: 1024px+ (centered content, max 480px width)

### Touch Interactions

- **Primary Actions**: Thumb-friendly zones (bottom third of screen)
- **Secondary Actions**: Upper areas, smaller targets acceptable
- **Swipe Gestures**: Supportive only, never required
- **Long Press**: Additional options, clearly indicated

### Performance

- **Loading Times**: Under 2 seconds for any action
- **Animation**: 60fps, minimal battery impact
- **Offline Support**: Core functionality works without connection
- **Data Usage**: Minimal API calls, efficient syncing

### Platform Patterns

- **iOS**: Follow Human Interface Guidelines
- **Android**: Material Design principles adapted to brand
- **Haptics**: Light feedback for positive actions only
- **Notifications**: Gentle reminders, never shame-based

---

## Psychology-Informed Decisions

### Color Psychology Application

- **Green**: Growth, progress, natural development
- **Blue**: Trust, calm, reliability
- **Amber**: Understanding, patience, protection
- **Avoid Red**: No failure states, no urgency

### Typography Psychology

- **Rounded Fonts**: Friendly, approachable, less intimidating
- **Consistent Sizing**: Predictability reduces cognitive load
- **Medium Weights**: Confident without being aggressive
- **Generous Line Height**: Breathing room reduces stress

### Layout Psychology

- **White Space**: Reduces overwhelm, creates calm
- **Clear Hierarchy**: Reduces decision fatigue
- **Consistent Patterns**: Builds user confidence
- **Single Focus**: One primary action reduces choice paralysis

### Interaction Psychology

- **Immediate Feedback**: Confirms action, builds trust
- **Gentle Animations**: Celebrate without over-stimulating
- **Forgiving Design**: Second chances, easy corrections
- **Progress Visualization**: Shows growth without pressure

---

## Do's and Don'ts

### ✅ DO

**Visual Design**:

- Use soft, rounded corners throughout
- Implement generous white space
- Keep color palette limited and calming
- Use consistent 8px spacing grid
- Design for one-handed use

**Language & Content**:

- Use "You showed up" instead of "Completed"
- Focus on identity: "Day 15 as a runner"
- Include encouraging micro-copy
- Write in present tense about becoming
- Acknowledge life's complexity with "Life happened"

**Interactions**:

- Make primary actions obvious and large
- Provide immediate visual feedback
- Include gentle haptic feedback
- Allow easy mistake correction
- Default to the most encouraging interpretation

**User Experience**:

- Guide users to shrink habits multiple times
- Celebrate attempts, not just completions
- Show patterns and momentum over streaks
- Make recovery from missed days easy
- Focus on showing up consistently

### ❌ DON'T

**Visual Design**:

- Never use red for missed days or failures
- Avoid sharp, angular shapes that feel harsh
- Don't use bright, alarming colors
- Never overwhelm with too many elements on screen
- Don't rely solely on color to convey meaning

**Language & Content**:

- Never use shame-based language ("You failed", "Streak broken")
- Avoid perfectionist language ("Perfect week!")
- Don't use urgent or pressuring language
- Never compare users to others
- Avoid technical jargon or complex explanations

**Interactions**:

- Don't make users confirm obvious actions
- Never punish missed days with difficult recovery
- Avoid complex gesture requirements
- Don't hide primary actions in sub-menus
- Never make the app feel like work

**User Experience**:

- Don't allow large habits in the initial setup
- Never emphasize failure or what's missing
- Avoid social comparison features
- Don't make the app feel like homework
- Never create stress about maintaining perfect records

---

## Key Screens Specifications

### 1. Home Screen (Daily Hub)

**Layout Structure**:

```
[Safe Area]
┌─ Identity Badge (centered) ─┐
│  "Day 47 as a Reader"      │
├─ Today's Habits ──────────┤
│  ┌─ Habit Card ─────────┐ │
│  │ 📚 Read 1 page       │ │
│  │         [I Showed Up] │ │
│  └─────────────────────┘ │
├─ This Week ──────────────┤
│  ○○●○●●○                │
│  M T W T F S S           │
│  "5/7 days - Momentum!"  │
├─ Encouragement ──────────┤
│  "Small steps, big       │
│   identity changes"      │
└─────────────────────────┘
```

**Key Elements**:

- Identity badge prominently displayed
- Single habit card (maximum 3 total)
- Weekly momentum visualization
- Encouraging message rotates daily
- Quick access to settings (gear icon, top-right)

### 2. Habit Creation Screen

**Flow Structure**:

```
Step 1: Identity
"Who do you want to become?"
[Writer] [Runner] [Artist] [Learner] [Healthy Person] [Other]

Step 2: Habit Input
"What tiny habit helps you become a writer?"
[Write one sentence...] ← Placeholder
[Continue]

Step 3: Shrink It (Forced 3x)
"Let's make it even smaller"
Current: "Write 100 words"
Suggested: "Write one sentence"
[Shrink It More] [This is Perfect]

Step 4: Implementation
"When will you do this?"
"After I [wake up], I will [write one sentence]"
[Start Today]
```

**Critical Requirements**:

- Must force shrinking 3 times minimum
- Provide encouraging examples at each step
- Use progress dots to show advancement
- Include motivational copy about small habits

### 3. Weekly Review Screen

**Layout Structure**:

```
┌─ Week of March 13-19 ────┐
│ ●○●●○●○                 │
│ M T W T F S S            │
│                          │
│ 5 out of 7 days          │
│ "Strong momentum!"       │
│                          │
│ ┌─ Insights ───────────┐ │
│ │ • You're building    │ │
│ │   consistency        │ │
│ │ • Tuesday & Friday   │ │
│ │   are tough days     │ │
│ │ • You bounce back    │ │
│ │   quickly            │ │
│ └─────────────────────┘ │
│                          │
│ [Continue This Week]     │
│ [Level Up My Habit]      │
└─────────────────────────┘
```

**Key Elements**:

- Visual week summary with patterns
- Encouraging momentum language
- Personalized insights (not judgments)
- Options for next week

### 4. Settings Screen

**Simplified Structure**:

```
┌─ Settings ──────────────┐
│                         │
│ 🔔 Notifications        │
│    "Daily gentle        │
│     reminders"          │
│                         │
│ 📊 Your Data            │
│    "Export progress"    │
│                         │
│ 🎯 Adjust Habits        │
│    "Make them smaller   │
│     or bigger"          │
│                         │
│ ❤️  Support             │
│    "Get help"           │
│                         │
│ 📖 About Tiny Wins      │
│    "How this works"     │
└─────────────────────────┘
```

**Requirements**:

- Minimal options to prevent overwhelm
- Friendly descriptions for each setting
- Easy access to help and support
- Data export for user ownership

### 5. Missed Day Recovery Screen

**Compassionate Design**:

```
┌─ Welcome Back! ─────────┐
│                         │
│ "Life happened, and     │
│  that's completely      │
│  normal."               │
│                         │
│ "Ready to show up       │
│  again today?"          │
│                         │
│ [Yes, I'm Ready]        │
│                         │
│ [Life is Still Crazy]   │
│ (Pause for a few days)  │
│                         │
│ ────────────────────    │
│ "Consistency isn't      │
│  perfection. It's       │
│  always coming back."   │
└─────────────────────────┘
```

**Critical Elements**:

- No shame or guilt language
- Options for different life situations
- Encouraging philosophy about consistency
- Easy path back to regular routine

---

## Final Implementation Notes

### Development Priorities

1. **Core Daily Flow**: Check-in experience must be flawless
2. **Onboarding**: Get first win within 60 seconds
3. **Habit Creation**: Force shrinking mechanism
4. **Recovery Flow**: Make returning easy and shame-free
5. **Visual Polish**: Animations and micro-interactions

### Success Metrics to Design For

- Time to first check-in (goal: under 60 seconds)
- Daily interaction time (goal: under 20 seconds)
- Return rate after missed days (goal: 70%+)
- User sentiment in app store reviews (goal: identity transformation themes)

### Technical Considerations

- Design system should be component-based
- Use semantic color tokens for theme flexibility
- Implement progressive enhancement for animations
- Ensure graceful degradation for older devices
- Consider dark mode support (maintain psychological principles)

---

_Remember: Every design decision should ask "Does this make showing up easier?" If the answer is no, reconsider the approach. The goal is identity transformation through effortless consistency, not behavior tracking._
