class YoutubeElement extends HTMLElement {
  static get observedAttributes() {
    return ["url", "autoplay", "hide-controls", "hide-info", "autoplay", "allow-fullscreen", "extended-privacy", "recommendations", "start-at"];
  }

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.getAttributesFromElement();
    this.createElements();
    this.attachElements();
  }

  getAttributesFromElement() {
    this.startAt = this.getAttribute('start-at');
    this.src = this.getAttribute('url');
    this.showRecommendations = this.getAttribute('recommendations');
    this.hideInfo = this.getAttribute('hide-info');
    this.hideControls = this.getAttribute('hide-controls');
    this.extendedPrivacy = this.getAttribute('extended-privacy');
    this.allowFullscreen = this.getAttribute('allow-fullscreen');
    this.autoplay = this.getAttribute('autoplay');
  }

  createElements() {
    this.wrapper = document.createElement('div');
    this.wrapper.style = `
      width: 100%;
      position: relative;
      padding-bottom: ${9 / 16 * 100}%;
      height: 0;
    `;

    this.player = document.createElement('iframe');
    this.player.setAttribute('frameborder', 0);
    this.player.style = `
      width: 100%;
      position: absolute;
      height: 100%;
    `;
    this.setElementAttributes();

    this.wrapper.appendChild(this.player);
  }

  setElementAttributes() {
    const allowAttribute = this.autoplay !== null ? 'autoplay; encrypted-media' : 'encrypted-media';
    this.player.setAttribute('allow', allowAttribute);
    this.player.setAttribute('src', this.getYouTubeEmbedUrl());
    if (this.allowFullscreen !== null) {
      this.player.setAttribute('allowfullscreen', '');
    }
  }

  attachElements() {
    this.shadow.appendChild(this.wrapper);
  }

  getYouTubeEmbedUrl() {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = this.src.match(regExp);
    const videoId = match && match[7].length == 11 ? match[7] : false;
    let url = false;

    if (videoId) {
      url = this.extendedPrivacy !== null ? 'https://www.youtube-nocookie.com/embed/' + videoId : 'https://www.youtube.com/embed/' + videoId;
    }

    url += '?';

    if (this.hideControls !== null) {
      url += '&controls=0';
    }

    if (this.hideInfo !== null) {
      url += '&showinfo=0';
    }

    if (this.showRecommendations === null) {
      url += '&rel=0';
    }

    if (this.startAt !== null) {
      url += '&;start=' + this.startAt;
    }

    if (this.autoplay !== null) {
      url += '&autoplay=1';
    }

    return url;
  }

  attributeChangedCallback() {
    this.getAttributesFromElement();
    this.setElementAttributes();
  }

  disconnectedCallback() {
    this.image.remove();
    this.canvas.remove();
    console.log(this.image, this.canvas);
  }
}

window.customElements.define('youtube-player', YoutubeElement);
