# Formula and Mathematical Notation Standards

To ensure mathematical concepts, algorithms, and formulas are universally understandable, readable in all Markdown viewers (including GitHub, Medium, Substack, terminal, and IDE previews), and accessible to all readers:

1. **Dual Notation (Visual Equation + Clear Plain-Text/Unicode)**:
   - Never rely solely on cryptic inline LaTeX tags (like `$\mathcal{F}_i = ...$`) that can look like cluttered syntax soup if not rendered by MathJax.
   - Always present formulas with a dedicated, cleanly formatted code or visual block using explicit, descriptive variable names.
   - Example:
     ```text
     Net Attraction Force (F_i):
     
                     Model_Mass_i  ×  Prompt_Inertia
     Force(i) = G × ─────────────────────────────────── × Dampening(Cost, Latency)
                       ( Geodesic_Distance + ε )^δ
     ```

2. **Explicit Variable Breakdown Table**:
   - Every formula must be accompanied by a clean table or structured list defining:
     - Variable Symbol & Plain Name
     - Physical / Intuitive Meaning
     - Typical Value Range
     - Concrete Example Value

3. **Step-by-Step Concrete Numerical Example**:
   - Provide an easy-to-follow calculation showing how numbers plug in and produce the final decision.

4. **Equilibrium and Threshold Clarity**:
   - Conditions like Lagrangian resonance must be written with clear comparison expressions:
     ```text
     Resonance Gap = (Force_Primary - Force_Secondary) / Force_Primary
     Trigger Condition: Resonance Gap < Threshold (e.g. 15%)
     ```
