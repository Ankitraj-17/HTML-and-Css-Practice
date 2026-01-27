
Why does the same website look different on mobile and laptop?
Mobile screens are smaller and have higher pixel density. Browsers on mobile simulate a large desktop width unless told otherwise, so layouts scale differently compared to laptops.

What exactly changes when the meta viewport tag is added?
The viewport tag tells the browser:

Use actual device width

Do not zoom out

Render content at 1:1 scale

This enables true responsive behavior.

Why does text appear very small on mobile if viewport is missing?
Without viewport, the browser assumes a 980px desktop layout and shrinks everything to fit the phone screen, making text tiny.

How does CSS detect screen size?
CSS uses media queries like:

@media (max-width: 768px)

The browser continuously checks screen width and applies matching rules.

What happens when a breakpoint is crossed?
Old CSS rules stop applying

New layout rules activate

Layout, font size, spacing, colors may change instantly

Why is layout design device-dependent?
Because:

Touch vs mouse interaction

Screen size differences

Orientation (portrait/landscape)

Readability & usability needs differ

Where does the browser store localStorage data?
localStorage is stored:

Inside the browser profile

On the user’s device

Per domain (website-specific)

Why does stored data remain after refresh?
Because localStorage:

Is not tied to variables

Persists until manually cleared

Survives refresh & browser restart

How can a website work without internet?
Logic runs using:

HTML

CSS

JavaScript

localStorage No server is required for local execution.

How do learning platforms remember progress?
They store:

Progress data in databases or localStorage

User IDs or session data

Cached state that reloads on revisit
