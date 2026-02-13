# 🍱 Meal Suggester

## The Problem

Every day, the same questions:

> "What should we eat tonight?"
> "What's for breakfast?"
> "What should I pack for tomorrow's bento?"

It's not that we lack ideas—we have plenty of recipes we love. They just don't come to mind when we're standing in the kitchen, tired, staring at the fridge.

**The real problem isn't cooking. It's deciding.**

---

## The Solution

An app that knows what we like and what we have—and connects the two.

### Core Features

| Feature | What it does |
|---------|--------------|
| **Recipe Bank** | Store recipes you love. Add them once, forget about them—until you need them. |
| **Ingredients List** | Track what's in your fridge and pantry. |
| **Smart Suggestions** | Get meal ideas for dinner, breakfast, and tomorrow's bento—based on what you actually have. |

### How It Works

```
┌─────────────────┐     ┌─────────────────┐
│  Recipe Bank    │     │  Ingredients    │
│  (things we     │  +  │  (things we     │
│   love to eat)  │     │   have at home) │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
         ┌─────────────────────┐
         │  "Tonight, try the  │
         │   oyakodon—you have │
         │   chicken, eggs,    │
         │   and rice!"        │
         └─────────────────────┘
```

---

## Why This Works

1. **Zero mental load** — Stop asking "what should we eat?" The app already knows.
2. **No food waste** — Use what you have before it expires.
3. **Rediscover forgotten favorites** — That recipe you loved 6 months ago? It'll come back.
4. **Fits your life** — Suggestions adapt to the time of day and meal type.

---

## Future Enhancements

### Personal Features

| Feature | Description |
|---------|-------------|
| **Recipe preferences** | Rate recipes by how much you love them, how often you'd eat them |
| **Staples list** | "Always have these at home"—get reminded when you run out |
| **Variety prompts** | "You haven't had pasta in 3 weeks—how about tonight?" |
| **New ingredient discovery** | Occasionally suggest ingredients you've never tried |
| **Time-aware suggestions** | Quick breakfast ideas in the morning, hearty dinners at night |
| **Nutritional balance hints** | Gentle nudges like "Lots of carbs lately—how about more vegetables tonight?" |
| **Leftover integration** | "You made rice yesterday—here's what to do with leftover rice" |
| **Shared household sync** | Both partners can update ingredients from their own phones |
| **Shopping list generation** | "To make these 5 meals this week, buy: X, Y, Z" |

### Reducing Friction

| Feature | Description |
|---------|-------------|
| **Recipe scanning** | Snap a photo of a recipe → auto-add to your bank |
| **Fridge photo** | Snap a photo of your fridge → auto-update ingredients |
| **Expiration tracking** | Scan product dates → prioritize items expiring soon |
| **Voice input** | "We're out of eggs" → updates the list |

---

## Beyond Personal Use

This concept scales beyond households.

### For Ingredient Sellers (e.g., 生協, grocery delivery services)

| Use Case | Value |
|----------|-------|
| **Link to product catalog** | Suggest recipes using products they sell |
| **Seasonal promotions** | "These ingredients are in season—here's a recipe" |
| **Smart upselling** | "Add mirin to your cart to complete this recipe" |
| **Customer engagement** | Weekly personalized meal plans based on order history |

### For Recipe Creators

| Use Case | Value |
|----------|-------|
| **Recipe-set marketplace** | Creators sell curated recipe collections |
| **Subscription packs** | "This month's 10 recipes from Chef Tanaka" |
| **Affiliate integration** | Link recipes to ingredient purchases |

---

## Technical Notes

- **AI-powered suggestions** — Uses LLM to match recipes with ingredients intelligently
- **Simple to start** — MVP is a single Python file (~50 lines)
- **Extensible** — Can integrate with image recognition, shopping APIs, etc.
