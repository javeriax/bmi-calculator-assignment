function ResultBox({ bmiValue }) {
  let category = 'Obese'
  if (bmiValue < 18.5) {
    category = 'Underweight'
  } else if (bmiValue < 25) {
    category = 'Normal weight'
  } else if (bmiValue < 30) {
    category = 'Overweight'
  }

  const line = `Your BMI is ${bmiValue.toFixed(1)}`

  return (
    <div className="result">
      <p >{line}</p>
      <p>Category: {category}</p>
    </div>
  )
}

export default ResultBox
