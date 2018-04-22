"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YoutubeElement = function (_HTMLElement) {
  _inherits(YoutubeElement, _HTMLElement);

  _createClass(YoutubeElement, null, [{
    key: "observedAttributes",
    get: function get() {
      return ["url", "autoplay", "hide-controls", "hide-info", "autoplay", "allow-fullscreen", "extended-privacy", "recommendations", "start-at"];
    }
  }]);

  function YoutubeElement() {
    _classCallCheck(this, YoutubeElement);

    var _this = _possibleConstructorReturn(this, (YoutubeElement.__proto__ || Object.getPrototypeOf(YoutubeElement)).call(this));

    _this.shadow = _this.attachShadow({ mode: 'open' });
    _this.getAttributesFromElement();
    _this.createElements();
    _this.attachElements();
    return _this;
  }

  _createClass(YoutubeElement, [{
    key: "getAttributesFromElement",
    value: function getAttributesFromElement() {
      this.startAt = this.getAttribute('start-at');
      this.src = this.getAttribute('url');
      this.showRecommendations = this.getAttribute('recommendations');
      this.hideInfo = this.getAttribute('hide-info');
      this.hideControls = this.getAttribute('hide-controls');
      this.extendedPrivacy = this.getAttribute('extended-privacy');
      this.allowFullscreen = this.getAttribute('allow-fullscreen');
      this.autoplay = this.getAttribute('autoplay');
    }
  }, {
    key: "createElements",
    value: function createElements() {
      this.wrapper = document.createElement('div');
      this.wrapper.style = "\n      width: 100%;\n      position: relative;\n      padding-bottom: " + 9 / 16 * 100 + "%;\n      height: 0;\n    ";

      this.player = document.createElement('iframe');
      this.player.setAttribute('frameborder', 0);
      this.player.style = "\n      width: 100%;\n      position: absolute;\n      height: 100%;\n    ";
      this.setElementAttributes();

      this.wrapper.appendChild(this.player);
    }
  }, {
    key: "setElementAttributes",
    value: function setElementAttributes() {
      var allowAttribute = this.autoplay !== null ? 'autoplay; encrypted-media' : 'encrypted-media';
      this.player.setAttribute('allow', allowAttribute);
      this.player.setAttribute('src', this.getYouTubeEmbedUrl());
      if (this.allowFullscreen !== null) {
        this.player.setAttribute('allowfullscreen', '');
      }
    }
  }, {
    key: "attachElements",
    value: function attachElements() {
      this.shadow.appendChild(this.wrapper);
    }
  }, {
    key: "getYouTubeEmbedUrl",
    value: function getYouTubeEmbedUrl() {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = this.src.match(regExp);
      var videoId = match && match[7].length == 11 ? match[7] : false;
      var url = false;

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
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback() {
      this.getAttributesFromElement();
      this.setElementAttributes();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.image.remove();
      this.canvas.remove();
      console.log(this.image, this.canvas);
    }
  }]);

  return YoutubeElement;
}(HTMLElement);

window.customElements.define('youtube-player', YoutubeElement);
