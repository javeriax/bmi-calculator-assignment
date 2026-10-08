# React Notes (from Week 5 - 7 slides)

## 1. What React is (Week 5, Class 1)

- A free, open-source **JavaScript library** for front-end UIs, made by Meta.
- Built for **SPAs** (single page applications): the page loads once, then components
  update dynamically instead of loading a whole new HTML file each click.
  - SPA examples from slides: Gmail, Trello, Spotify Web, Netflix.
  - MPA examples: Amazon, Wikipedia, news sites.
- Core concepts to remember:
  - **Component based** - UI split into reusable blocks (navbar, card, button).
  - **Virtual DOM** - React keeps a copy of the DOM in memory, compares (diffs) old vs new,
    then patches only the parts that changed. That's why it's fast.
  - **JSX** - HTML-like syntax written inside JavaScript.
  - **Declarative** - you describe what the UI should look like for a state, React does the updating.
  - **Unidirectional data flow** - data goes down from parent to child through props.
- Competitors: Vue (framework), Angular (full framework, Google), SolidJS, Ember.
- A **bundler** packs all your files + node_modules into a few optimized files for the browser.
  Vite is what we use; others are Parcel, Webpack, esbuild, Turbopack.

## 2. Commands you must know (Week 5 / 6 / 7 slides)

```bash
node -v                                        # check node is installed
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install                                    # install dependencies
npm run dev                                    # start dev server -> http://localhost:5173
```

Extra one from Week 7: `npm install react-icons` (then import icons like
`import { FaGithub } from 'react-icons/fa'`).

## 3. Important files / folders

- `index.html` - entry HTML, contains `<div id="root"></div>`.
- `src/main.jsx` - entry point, mounts App onto that root div.
- `src/App.jsx` - the root component where you build the app.
- `src/components/` - reusable UI components.
- `src/index.css` - global styles.
- `package.json` - dependencies + scripts (dev, build).
- `vite.config.js` - build tool config.
- `node_modules/` - installed packages.

Rule of thumb from slides: UI stuff in `components/`, data in `data/`, classes in `models/`.
Keep something inside App only if it is used once.

## 4. Rendering (main.jsx)

`createRoot` makes the root node, `render` says what to put inside `<div id="root">`.

```jsx
import { createRoot } from 'react-dom/client'

function App() {
  return <div>Hello World!</div>
}

createRoot(document.getElementById('root')).render(<App />)
```

## 5. Functional components

Just a JS function that returns JSX. Name starts with a capital letter, and you export it.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>
}
export default Welcome

// arrow function version
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>
```

## 6. JSX + expressions

- JSX = JavaScript XML. Behind the scenes it becomes `React.createElement()` calls.
- Anything inside `{ }` is treated as normal JavaScript and gets evaluated.

```jsx
const hp = 296.48
<p>It has {218 * 1.36} horsepower</p>   // math
<p>{hp}</p>                              // variable
<p>{kwtohp(218)}</p>                     // function call
```

Return **one** parent element. If you need two side by side, wrap in `<> </>` (fragment).

## 7. Props (Week 7)

- Props = arguments passed into a component, written like HTML attributes.
- **Props are read-only** - never change them inside the child.
- Strings go in quotes; numbers, variables, arrays and objects go in curly braces.

```jsx
function Car(props) {
  return <h2>I am a {props.color} {props.brand} {props.model}!</h2>
}

<Car brand="Ford" model="Mustang" color="red" year={1969} />
```

Passing component to component:

```jsx
function Garage() {
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car brand="Ford" />
    </>
  )
}
```

`props.children` = whatever you wrote between the opening and closing tag:

```jsx
function Son(props) {
  return <div>{props.children}</div>
}

<Son><p>This paragraph is props.children</p></Son>
```

## 8. Destructuring (Week 6)

Pulling values out of arrays/objects into their own variables.

```jsx
// array - by position
const vehicles = ['honda', 'shehzor', 'oshan']
const [car, truck, suv] = vehicles
const [car, , suv] = vehicles          // skip the middle one

// object - by property name, order doesn't matter, defaults allowed
const person = { firstName: 'John', lastName: 'Doe', age: 50 }
let { firstName, age, country = 'Norway' } = person

// nested object
let { firstName, car: { brand, model } } = person
```

In props (this is the cleaner way):

```jsx
function Greeting({ name, age }) {
  return <h1>Hello, {name}! You are {age} years old.</h1>
}
```

Also `...rest` for "whatever is left over".

## 9. useState hook (Week 6)

Hooks let function components use state. `useState` returns an **array of two things**,
so we destructure it.

```jsx
const [count, setCount] = useState(0)
//     ^value   ^setter        ^initial value

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

- Calling the setter schedules an update **and re-renders** the component.
- Names can be anything, but first = value, second = updater (order matters).
- **Rules of hooks:** call them only at the top level (not inside loops, ifs or nested
  functions) and only inside components or custom hooks.
- Other hooks (intro only): `useEffect` (side effects), `useContext`, `useRef`,
  `useReducer`, `useMemo` / `useCallback`.

## 10. map() for lists (Week 6)

`map()` returns a **new** array, it does not change the original.

```jsx
const numbers = [1, 2, 3, 4]
const doubled = numbers.map(x => x * 2)
```

In JSX, to render a list. Each item needs a unique `key`:

```jsx
const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 }
]

<ul>
  {users.map(user =>
    <li key={user.id}>{user.name} is {user.age} years old</li>
  )}
</ul>
```

Parameters: `map((value, index, array) => ...)` - index and array are optional.

## 11. Spread operator (Week 6)

`...` copies array/object contents into another one.

```jsx
const combined = [...numbersOne, ...numbersTwo]
const [one, two, ...rest] = numbers         // rest = leftover items

const mycar = { ...car, ...car_more }       // later object overwrites matching keys
```

## 12. Template strings (Week 6)

Backticks instead of quotes. Multi-line, and `${ }` puts values inside.

```jsx
const msg = `Hello, ${name}!
You are ${age} years old.`

`Total: ${price * quantity}`
`Status: ${isAdmin ? 'Admin' : 'User'}`
```

## 13. ES6 classes (Week 5, Class 2)

Not used in our function components, but it was on the slides.

```jsx
class Car {
  constructor(name) { this.brand = name }
  present() { return 'I have a ' + this.brand }
}

class Model extends Car {
  constructor(name, mod) {
    super(name)          // must call parent constructor
    this.model = mod
  }
  show() { return this.present() + ', it is a ' + this.model }
}

const mycar = new Model('Ford', 'Mustang')
```

## 14. Conditional rendering

```jsx
{isOnline && <span>Online</span>}             // show only if true
{error !== '' ? <p>{error}</p> : null}        // if / else
```

---

## How this assignment uses the above

| Slide topic | Where it is used |
|---|---|
| `npm create vite` / `npm run dev` | project setup |
| Function components + export default | `App.jsx`, `components/ResultBox.jsx` |
| Props + props destructuring | `<ResultBox bmiValue={bmiValue} />` -> `function ResultBox({ bmiValue })` |
| `useState` | unit, weight, height, bmiValue, errorMsg |
| JSX expressions `{ }` | labels, result text |
| Template strings | `` `Your BMI is ${bmiValue.toFixed(1)}` `` |
| Conditional rendering | error message, result box, unit labels |
