import 'normalize.css';
import './style.scss';
import Progress from './src';

const progress = new Progress.circle(
  document.querySelector('.progress-container'),
  {
    width: 130,
    initialValue: 75,
    strokeWidth: 10,
    color: '#005BFF',
    bgColor: 'rgb(234 240 246)',
    rotate: -90,
    rounded: false,
    animationSpeed: 750,
    animationTimingFunction: 'ease-in-out',
  }
);

const input = document.getElementById('input-value');
const animateSwitch = document.getElementById('switch-animate');
const hideSwitch = document.getElementById('switch-hide');

input.value = progress.getValue();

animateSwitch.addEventListener('change', function () {
  if (this.checked) {
    progress.playAnimation();
  } else progress.stopAnimation();
});

hideSwitch.addEventListener('change', function () {
  if (this.checked) {
    progress.hide();
  } else progress.show();
});

input.addEventListener('keydown', function (event) {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace')
    event.preventDefault();
});

input.addEventListener('input', function () {
  if (this.value > 100) this.value = 100;
  if (this.value[0] === '0') this.value = this.value.slice(1);
  progress.setValue(this.value);
});

input.addEventListener('focus', function () {
  if (this.value === '0') this.value = '';
});

input.addEventListener('blur', function () {
  if (this.value === '') this.value = 0;
});

input.addEventListener('change', function () {
  if (this.value === '') this.value = 0;
});
