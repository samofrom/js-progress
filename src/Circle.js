class Circle {
  #value;

  #container;
  #svg;
  #circle;

  #attrs;
  #svgAttrs;
  #bgAttrs;
  #circleAttrs;
  #animation;

  #options = {
    width: 120,
    initialValue: 50,
    strokeWidth: 5,
    color: '#0FA0CE',
    bgColor: '#FAFAFA',
    rounded: false,
    rotate: 0,
    svgClass: 'progress__svg',
    bgClass: 'progress__bg',
    circleClass: 'progress__circle',
    animationSpeed: 1000,
    animationTimingFunction: 'linear',
  };

  #ns = 'http://www.w3.org/2000/svg';

  constructor(container, options = {}) {
    this.#container = container;
    this.#options = { ...this.#options, ...options };

    this.#value = this.#options.initialValue;

    this.#attrs = {
      cx: this.#options.width / 2,
      cy: this.#options.width / 2,
      r: (this.#options.width - this.#options.strokeWidth) / 2,
      fill: 'none',
      'stroke-width': this.#options.strokeWidth,
    };

    this.#svgAttrs = {
      class: this.#options.svgClass,
      width: this.#options.width,
      height: this.#options.width,
      viewBox: `0 0 ${this.#options.width} ${this.#options.width}`,
      xmlns: this.#ns,
    };

    this.#bgAttrs = {
      ...this.#attrs,
      class: this.#options.bgClass,
      stroke: this.#options.bgColor,
    };

    const dashArray = 2 * Math.PI * this.#attrs.r;
    this.#circleAttrs = {
      ...this.#attrs,
      class: this.#options.circleClass,
      stroke: this.#options.color,
      'stroke-dasharray': dashArray,
      'stroke-dashoffset':
        dashArray - (dashArray * this.#options['initialValue']) / 100,
      'stroke-linecap': this.#options.rounded ? 'round' : 'square',
    };

    this.#render();
  }

  #render() {
    this.#svg = document.createElementNS(this.#ns, 'svg');
    this.#setAttrs(this.#svg, this.#svgAttrs);
    this.#svg.style.rotate = `${this.#options.rotate}deg`;

    this.#animation = this.#svg.animate(
      [{ transform: `rotate(0deg)` }, { transform: `rotate(360deg)` }],
      {
        duration: this.#options.animationSpeed,
        iterations: Infinity,
        easing: this.#options.animationTimingFunction,
      }
    );
    this.#animation.pause();

    const bg = document.createElementNS(this.#ns, 'circle');
    this.#setAttrs(bg, this.#bgAttrs);

    this.#circle = document.createElementNS(this.#ns, 'circle');
    this.#setAttrs(this.#circle, this.#circleAttrs);
    this.#circle.style.transition = 'all .3s cubic-bezier(.85,0,.15,1)';

    this.#svg.appendChild(bg);
    this.#svg.appendChild(this.#circle);

    this.#container.appendChild(this.#svg);
  }

  #setAttrs = (element, attrs) =>
    Object.entries(attrs).forEach(([attr, value]) =>
      element.setAttribute(attr, value)
    );

  #calculateDashOffset = (val) =>
    this.#circleAttrs['stroke-dasharray'] -
    (this.#circleAttrs['stroke-dasharray'] * val) / 100;

  setValue(val) {
    let validValue = val;
    if (val < 0 || val > 100) {
      console.warn('Progress value must be between 0 and 100');
      validValue = Math.max(0, Math.min(val, 100));
    }
    this.#value = validValue;
    this.#circle.setAttribute(
      'stroke-dashoffset',
      this.#calculateDashOffset(validValue)
    );
  }

  getValue = () => this.#value;

  playAnimation = () => this.#animation.play();

  stopAnimation = () => this.#animation.pause();

  show = () => (this.#container.style.display = 'block');

  hide = () => (this.#container.style.display = 'none');
}

export default Circle;
