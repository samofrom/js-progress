## Vanilla JS Progress component

<div style="text-align: center">
    <img src="https://ddgobkiprc33d.cloudfront.net/48e3d4ec-d663-4b11-987d-4bc297c28e95.gif"/>
</div>

This is a pure js modern lightweight  library for displaying the process of tasks and their progress
executions

### Quick start

```javascript
const progress = new Progress.circle(container, options);
```

### Options

| Property                | Description                                 | Type    | Default          |
|-------------------------|---------------------------------------------|---------|------------------|
| width                   | loader width in px                          | `number`  | `120`            |
| initialValue            | initial value (0-100)                       | `number`  | `50`             |
| strokeWidth             | loader width in px                          | `number`  | `5`              |
| color                   | color of loader                             | `string`  | `#0FA0CE`        |
| bgColor                 | loader background color                     | `string`  | `#FAFAFA `         |
| rounded                 | loader end rounding                         | `boolean` | `false`            |
| rotate                  | rotation angle in degrees                   | `number`  | `0`                |
| svgClass                | svg component class                         | `string`  | `progress__svg`    |
| bgClass                 | loader background class                     | `string`  | `progress__bg`     |
| circleClass             | circle class                                | `string`  | `progress__circle` |
| animationSpeed          | rotation animation speed                    | `number`  | `1000`             |
| animationTimingFunction | css built-in function or own cubic-bezier() | `string`  | `linear`           |

### API

| Property           | Description                    |
|--------------------|--------------------------------|
| `setValue(val)`    | sets the value, 0 <= val <=100 |
| `getValue()`       | gets the current value         |               
| `playAnimation() ` | starts rotate animation        |
| `stopAnimation()`  | stops the animation            |
| `show() `          | displays loader                |
| `hide()`           | hides loader                   |

### Running the example locally

```bash
$ npm install
$ npm run dev
```







