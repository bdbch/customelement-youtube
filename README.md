# `<youtube-player>`

> Easy to embed Youtube Embeds

### [Live Demo (try to change attributes in dev tools)](https://bdbch.github.io/customelement-youtube/)

`youtube-player` creates a simple youtube embed player without any iframe attributes. Easy to embed from any URL.

## Installation

`npm install --save customelement-youtube`

## Usage

#### ES6:

```js
import "customelement-youtube"
```

#### Via `<script>` in ES6

```js
<script src="build/youtube.js"></script>
```

#### Via `<script>` in ES5

```js
<script src="build/youtube.es5.js"></script>
```

When image-blur is loaded correctly, you can just use it like this:

```html
<youtube-player url="https://www.youtube.com/watch?v=jJWPmYSbN5c" >
```

## Available Attributes

* `url` - YouTube Embed Url
* `start-at="60"` - Start a youtube video at 60 seconds
* `recommendations` - Shows recommendations on pause or videoend
* `hide-info` - Hide video information
* `hide-controls` - Hide player controls
* `extended-privacy` - Activate nocookies mode
* `autoplay` - Autoplay the video
* `allow-fullscreen` - Allow the player to go fullscreen

## Browser Support

This will need an update to find out what browsers are currently supporting all features

## Contribution

Feel free to send in Pull Requests. I'll take my time to look into them.
