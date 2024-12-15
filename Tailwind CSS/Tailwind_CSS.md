
# GDG On-Campus Workshop: Tailwind CSS

## Step 1: Learning Topics

### 1. Introduction & Tailwind Playground
- **Definition:**  
  Tailwind CSS is a utility-first CSS framework designed for rapid UI development. Instead of writing custom CSS, you apply utility classes directly to your HTML elements.

- **Playground:**  
  [Tailwind Playground](https://play.tailwindcss.com/)  
  A browser-based editor to test Tailwind CSS without setting up a local environment.

- **Example:**  
  ```html
  <div class="bg-blue-500 text-white p-4 rounded">
    Welcome to Tailwind!
  </div>
  ```

---

### 2. Colors: Text, Background, Opacity
- **Definition:**  
  Colors in Tailwind are defined by utility classes like `text-{color}`, `bg-{color}`, and `opacity-{value}`.

- **Example:**  
  ```html
  <div class="text-red-500">Red Text</div>
  <div class="bg-green-500">Green Background</div>
  <div class="opacity-50">50% Opacity</div>
  ```

- **Practice:**  
  [Color Reference](https://tailwindcss.com/docs/customizing-colors)

---

### 3. Spacing: Margin, Padding
- **Definition:**  
  Spacing utilities include `m-{value}` for margin and `p-{value}` for padding.

- **Example:**  
  ```html
  <div class="m-4 p-4 bg-gray-200">Margin & Padding Example</div>
  ```

---

### 4. Typography: Fonts, Sizes, Alignment, Line Height
- **Definition:**  
  Typography utilities control text styling, alignment, size, and spacing.

- **Example:**  
  ```html
  <div class="font-bold text-lg text-center leading-8">
    Bold Centered Text with Line Height
  </div>
  ```

---

### 5. Borders: Width, Radius, Color
- **Definition:**  
  Border utilities include `border-{width}`, `rounded-{size}`, and `border-{color}`.

- **Example:**  
  ```html
  <div class="border-4 border-red-500 rounded-lg p-4">
    Box with a Border
  </div>
  ```

---

### 6. Box Model: Width, Height
- **Definition:**  
  Controls element dimensions with `w-{value}` and `h-{value}` utilities.

- **Example:**  
  ```html
  <div class="w-32 h-32 bg-blue-300">
    128px Square Box
  </div>
  ```

---

### 7. Flexbox: Alignment, Justification, Wrapping
- **Definition:**  
  Flexbox utilities provide alignment, spacing, and layout options for flex containers.

- **Example:**  
  ```html
  <div class="flex justify-between items-center">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
  ```

---

### 8. Grid: Rows, Columns, Gap
- **Definition:**  
  Grid utilities define layouts with rows, columns, and spacing.

- **Example:**  
  ```html
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-blue-200">1</div>
    <div class="bg-blue-300">2</div>
    <div class="bg-blue-400">3</div>
  </div>
  ```

---

### 9. Breakpoints: sm, md, lg, xl, 2xl
- **Definition:**  
  Breakpoints provide responsive design using screen width prefixes.

- **Example:**  
  ```html
  <div class="text-sm md:text-lg lg:text-xl">
    Responsive Text Sizes
  </div>
  ```

---

## Step 2: Initial Project - Responsive Resume Template

### Project Overview
- **Objective:** Create a responsive resume template using Tailwind CSS.  
- **Features:**
  - Responsive layout using Tailwind's grid and flex utilities.
  - Styling with Tailwind colors, spacing, and typography.
  - Sectional content: header, summary, skills, experience, education, and contact.

---

### Starter Template (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Resume</title>
</head>
<body>
  <header>
    <h1>John Doe</h1>
    <p>Web Developer | Tailwind Enthusiast</p>
  </header>
  
  <main>
    <section>
      <h2>Summary</h2>
      <p>Dynamic web developer skilled in crafting responsive and accessible web designs...</p>
    </section>
    <section>
      <h2>Skills</h2>
      <ul>
        <li>HTML & CSS</li>
        <li>JavaScript</li>
        <li>ReactJS</li>
        <li>Tailwind CSS</li>
      </ul>
    </section>
    <section>
      <h2>Experience</h2>
      <div>
        <h3>Web Developer</h3>
        <p>Company XYZ | Jan 2021 - Present</p>
        <p>Developed and maintained web applications with modern frameworks...</p>
      </div>
    </section>
    <section>
      <h2>Education</h2>
      <p>B.Tech in Computer Science, University ABC</p>
    </section>
    <section>
      <h2>Contact</h2>
      <p>Email: johndoe@example.com | Phone: +123456789</p>
    </section>
  </main>

</body>
</html>

```
---

### Final Project 
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-800">
  <header class="bg-blue-500 text-white py-6 text-center">
    <h1 class="text-3xl font-bold">John Doe</h1>
    <p class="text-lg">Web Developer | Tailwind Enthusiast</p>
  </header>
  
  <main class="container mx-auto my-8 p-4">
    <section class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-blue-500">Summary</h2>
      <p class="mt-2 text-gray-700">Dynamic web developer skilled in crafting responsive and accessible web designs...</p>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-blue-500">Skills</h2>
      <ul class="mt-2 grid grid-cols-2 gap-4">
        <li>HTML & CSS</li>
        <li>JavaScript</li>
        <li>ReactJS</li>
        <li>Tailwind CSS</li>
      </ul>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-blue-500">Experience</h2>
      <div class="mt-2">
        <h3 class="font-bold">Web Developer</h3>
        <p class="text-sm text-gray-600">Company XYZ | Jan 2021 - Present</p>
        <p>Developed and maintained web applications with modern frameworks...</p>
      </div>
    </section>
    <section class="mb-6">
      <h2 class="text-xl font-semibold border-b-2 border-blue-500">Education</h2>
      <p class="mt-2">B.Tech in Computer Science, University ABC</p>
    </section>
    <section>
      <h2 class="text-xl font-semibold border-b-2 border-blue-500">Contact</h2>
      <p class="mt-2">Email: johndoe@example.com | Phone: +123456789</p>
    </section>
  </main>
</body>
</html>
```

---

## Step 3: Quiz (MCQs)
[Tailwind Quiz](https://forms.gle/uvuSxdwvQ4QXsKHq6)
   