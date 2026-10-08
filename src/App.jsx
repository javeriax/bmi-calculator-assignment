import { useState } from 'react'
import ResultBox from './components/ResultBox'
import './App.css'

function App() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmiValue, setBmiValue] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  function clearResult() {
    setBmiValue(null)
    setErrorMsg('')
  }

  function onWeightTyped(e) {
    setWeight(e.target.value)
    clearResult()
  }

  function onHeightTyped(e) {
    setHeight(e.target.value)
    clearResult()
  }

  function doCalculate() {
    const w = Number(weight)
    const h = Number(height)
    //edge cases checking
    if (weight === '' || height === '') {
      setErrorMsg('Please enter both weight and height.')
      setBmiValue(null)
      return
    }
    if (isNaN(w) || isNaN(h)) {
      setErrorMsg('Numbers only please.')
      setBmiValue(null)
      return
    }
    if (w <= 0 || h <= 0) {
      setErrorMsg('values must be bigger than 0.')
      setBmiValue(null)
      return
    }

    // formula needs metres so cm has to be divided by 100
    const inMeters = h / 100
    const answer = w / (inMeters * inMeters)

    setErrorMsg('')
    setBmiValue(answer)
  }

  function resetAll() {
    setWeight('')
    setHeight('')
    clearResult()
  }

  return (
    <div className="box">
      <h1>BMI Calculator</h1>

      <div className="row">
        <label htmlFor="weight">Weight (kg)</label>
        <input id="weight" type="text" value={weight} onChange={onWeightTyped} />
        <label htmlFor="height">Height (cm)</label>
        <input id="height" type="text" value={height} onChange={onHeightTyped} />
      </div>

      <div className="btns">
        <button onClick={doCalculate}>Calculate</button>
        <button onClick={resetAll}>Reset</button>
      </div>

      {errorMsg !== '' && <p className="error">{errorMsg}</p>}
      {bmiValue !== null && <ResultBox bmiValue={bmiValue} />}
    </div>
  )
}

export default App
