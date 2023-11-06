import React from "react";

function QuestionItem({ question, onUpdateQuestion, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleCorrectAnswerChange(newCorrectIndex){
    fetch(`http://127.0.0.1:4000/questions/${id}`,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({correctIndex: parseInt(newCorrectIndex, 10)})
    })
    .then(r=>r.json())
    .then((updatedQuestion)=>onUpdateQuestion(updatedQuestion))
  }

  function handleDeleteClick() {
    fetch(`http://127.0.0.1:4000/questions/${id}`,{
      method: 'DELETE',
    })
    .then(r=>r.json())
    .then(()=>onDeleteQuestion(question))
  }
  const options = answers && answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
        onChange={(e=>handleCorrectAnswerChange(e.target.value))} 
        defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
