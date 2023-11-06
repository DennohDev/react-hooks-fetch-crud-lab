import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    fetch(`http://127.0.0.1:4000/questions`)
      .then(r => r.json())
      .then(questions => setQuestions(questions))
  }, [])

  function handleUpdateQuestion(updatedQuiz) {
    const updatedQuestion = questions.map((question) => {
      if (question.id === updatedQuiz.id) {
        return updatedQuiz
      }
      else {
        return question
      }
    })
    setQuestions(updatedQuestion)
  }

  function handleDeleteQuestion(deletedQuiz){
    const updatedQuestion = questions.filter((question)=>question.id !== deletedQuiz.id);
    setQuestions(updatedQuestion);
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
      questions && questions.map(question => <QuestionItem key={question.id} question={question} onUpdateQuestion={handleUpdateQuestion} onDeleteQuestion={handleDeleteQuestion} />)
      }</ul>
    </section>
  );
}

export default QuestionList;
