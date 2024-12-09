import { LoaderFunction, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { mongodb } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request }) => {
  const db = await mongodb.db("sample_mflix");
  const collection = db.collection("draggable_data");

  const draggableData = await collection.find({}).toArray();

  return json(draggableData);
};

interface DraggableData {
  question: string;
  options: string[];
  answer: string;
}

const DraggableDataDisplay = () => {
  const draggableData: DraggableData[] = useLoaderData();



  const [answeredQuestions, setAnsweredQuestions] = useState(
    draggableData.map(() => ({ selectedAnswer: null, answered: false }))
  );

  const handleAnswerSelection = (index, answer) => {
    const updatedAnsweredQuestions = [...answeredQuestions];
    updatedAnsweredQuestions[index] = {
      ...updatedAnsweredQuestions[index],
      selectedAnswer: answer,
      answered: true,
    };
    setAnsweredQuestions(updatedAnsweredQuestions);
  };

  return (
    <div className="questions-container">
      {draggableData.map((question, index) => {
        const { question: questionText, options, answer } = question;
        const { selectedAnswer, answered } = answeredQuestions[index];

        return (
          <div key={index} className="question-container">
            <h3>{questionText}</h3>
            <div className="options-container">
              {options.map((option, i) => {
                let optionClass = "";
                if (answered) {
                  if (option === selectedAnswer) {
                    optionClass =
                      option === answer ? "correct" : "incorrect";
                  } else {
                    optionClass =
                      option === answer ? "correct" : "incorrect";
                  }
                }
                return (
                  <div
                    key={i}
                    className={`option ${optionClass}`}
                    onClick={() => handleAnswerSelection(index, option)}
                  >
                    {option}
                  </div>
                );
              })}
            </div>
            {answered && (
              <div className="result-message">
                {selectedAnswer === answer
                  ? "Correct!"
                  : answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DraggableDataDisplay;
