# Clickable Box Manager
If you have a box in markup with multiple links in the text but want the whole block to be clickable this is the script for you. 

This script figures out which is the primary link in a box and makes the whole box clickable.

## Installation
```
npm install @wezz/ClickableBoxManager
```

## Usage
### Initialize Clickable Box Manager
```js
import ClickableBoxManager from "@wezz/clickableboxmanager";
// On document ready
new ClickableBoxManager();
```

By adding the attribute ```data-clickable-box``` to a container it will make the whole container clickable if there is at least one link within the container.
### Apply attributes in the markup
```html
<div data-clickable-box>
  <p>Lorem ipsum dolor sit amet</p>
  <a href="#">Primary link</a>
</div>
``` 

## Custom selectors
To enable more flexibility, it's possible to fill the attribute with classes that the script will use to indentify the primary link. 

```html
<div data-clickable-box="cta-primary">
  <p>Lorem ipsum <a href="#">First link in content but secondary in importance</a> dolor sit amet</p>
  <a href="#" class="cta-primary">Primary link</a>
</div>
```

## Styling
There is suggested styling to be found in [clickable-box.scss](https://github.com/wezz/ClickableBoxManager/blob/main/src/clickable-box.scss)

## Development & Demo
Clone this repo
Run
``` npm install ```

To run the interactive demo, run 
``` npm run demo ```
