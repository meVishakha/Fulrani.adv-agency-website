# Client Logos System Usage

This system provides a dynamic way to display client logos (Client/logo1.png to Client/logo10.png) across your website without code duplication.

## Features

- **Automatic Logo Loading**: Automatically loads logos 1-10 from the Client/ directory
- **Responsive Carousel**: Creates a smooth scrolling carousel with hover effects
- **Easy Integration**: Simple HTML insertion with various placement options
- **Customizable**: Easy to add, remove, or modify logos

## How It Works

The system uses a JavaScript class (`ClientLogos`) that:
1. Automatically detects logos 1-10 from the Client/ directory
2. Generates HTML for a responsive carousel
3. Provides multiple insertion methods
4. Handles CSS animations and responsive design

## Usage Examples

### 1. Automatic Insertion (Recommended)
Add this HTML where you want the client logos to appear:
```html
<div id="clients-section"></div>
```

The system will automatically populate this element with the client logos carousel.

### 2. Manual Insertion
You can also manually control where and when the logos appear:

```javascript
// Insert into a specific element
clientLogos.insertIntoElement('.my-clients-container');

// Insert before an element
clientLogos.insertBeforeElement('.footer');

// Insert after an element
clientLogos.insertAfterElement('.services-section');
```

### 3. Custom Logo Management
```javascript
// Add a new logo
clientLogos.addLogo('Client/new-logo.png', 'New Client');

// Remove a logo by index
clientLogos.removeLogo(0);

// Get all logos
const logos = clientLogos.getLogos();
```

## File Structure

```
Client/
├── logo1.png
├── logo2.png
├── logo3.png
├── logo4.png
├── logo5.png
├── logo6.png
├── logo7.png
├── logo8.png
├── logo9.png
└── logo10.png
```

## CSS Features

The system automatically includes:
- Smooth horizontal scrolling animation
- Grayscale to color hover effects
- Responsive design for mobile devices
- Proper image scaling and positioning

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Graceful degradation for older browsers

## Customization

You can customize the appearance by modifying the CSS in the `initCarousel()` method or by adding your own styles that target the generated classes:
- `.clients-carousel` - Main container
- `.clients-track` - Scrolling track
- `.client-logo-item` - Individual logo container
- `.client-logo-img` - Logo images