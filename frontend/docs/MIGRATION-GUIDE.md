# 🔄 Migration Guide - Path Updates

## Overview

After restructuring the project, all file paths need to be updated to reflect the new folder structure.

## Path Changes Summary

### Before → After

#### CSS Files

```
Old: assets/css/main.css
New: src/assets/css/main.css

Old: assets/css/login.css
New: src/assets/css/login.css
```

#### JavaScript Files

```
Old: assets/js/script.js
New: src/assets/js/script.js

Old: assets/js/login.js
New: src/assets/js/login.js
```

#### Images

```
Old: assets/images/logo.png
New: src/assets/images/logo.png
```

#### Pages

```
Old: pages/login.html
New: src/pages/auth/login.html

Old: pages/register.html
New: src/pages/auth/register.html

Old: pages/certificates.html
New: src/pages/certificates/certificates.html
```

#### Courses

```
Old: courses/html-course/html-course.html
New: src/courses/html/html-course.html

Old: courses/css-course/css-course.html
New: src/courses/css/css-course.html

Old: courses/js-course/js-course.html
New: src/courses/javascript/js-course.html
```

## Required Updates

### 1. Update public/index.html

Replace all asset paths:

```html
<!-- OLD -->
<link rel="stylesheet" href="assets/css/main.css" />
<script src="assets/js/script.js"></script>

<!-- NEW -->
<link rel="stylesheet" href="../src/assets/css/main.css" />
<script src="../src/assets/js/script.js"></script>
```

Update navigation links:

```html
<!-- OLD -->
<a href="pages/login.html">Login</a>
<a href="courses/html-course/html-course.html">HTML</a>

<!-- NEW -->
<a href="../src/pages/auth/login.html">Login</a>
<a href="../src/courses/html/html-course.html">HTML</a>
```

### 2. Update Course Files

In `src/courses/html/html-course.html`:

```html
<!-- OLD -->
<link rel="stylesheet" href="html-course.css" />
<link rel="stylesheet" href="../../assets/css/main.css" />

<!-- NEW -->
<link rel="stylesheet" href="html-course.css" />
<link rel="stylesheet" href="../../assets/css/main.css" />
```

### 3. Update Auth Pages

In `src/pages/auth/login.html`:

```html
<!-- OLD -->
<link rel="stylesheet" href="../../assets/css/login.css" />

<!-- NEW -->
<link rel="stylesheet" href="../../assets/css/login.css" />
```

## Find & Replace Guide

Use your editor's find & replace feature:

### Pattern 1: CSS Links

```
Find:    href="assets/css/
Replace: href="../src/assets/css/
```

### Pattern 2: JS Scripts

```
Find:    src="assets/js/
Replace: src="../src/assets/js/
```

### Pattern 3: Images

```
Find:    src="assets/images/
Replace: src="../src/assets/images/
```

### Pattern 4: Page Links

```
Find:    href="pages/
Replace: href="../src/pages/auth/
```

### Pattern 5: Course Links

```
Find:    href="courses/html-course/
Replace: href="../src/courses/html/

Find:    href="courses/css-course/
Replace: href="../src/courses/css/

Find:    href="courses/js-course/
Replace: href="../src/courses/javascript/
```

## Testing Checklist

After updating paths, test:

- [ ] Home page loads correctly
- [ ] All CSS styles are applied
- [ ] All JavaScript files load
- [ ] Images display properly
- [ ] Navigation links work
- [ ] Course pages load
- [ ] Login/Register pages work
- [ ] Dark mode toggle works
- [ ] Code playground functions
- [ ] Drag & drop builder works

## Common Issues

### Issue: Broken CSS styles

**Solution**: Check relative paths from the HTML file to CSS files

### Issue: 404 for JavaScript files

**Solution**: Verify script src paths are correct

### Issue: Images not loading

**Solution**: Update image paths to use src/assets/images/

### Issue: Navigation broken

**Solution**: Update all href attributes in nav links

## Automated Update Script (Optional)

Create a Node.js script to automate path updates:

```javascript
// update-paths.js
const fs = require("fs");
const path = require("path");

const pathMappings = {
  "assets/css/": "../src/assets/css/",
  "assets/js/": "../src/assets/js/",
  "assets/images/": "../src/assets/images/",
  "pages/": "../src/pages/auth/",
  // Add more mappings as needed
};

// Implement file reading and replacement logic
```

## Need Help?

If you encounter issues:

1. Check the file actually exists in the new location
2. Verify the relative path from your HTML file
3. Check browser console for 404 errors
4. Refer to README.md for folder structure

---

**Note**: Always backup your files before making bulk changes!
