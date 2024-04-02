import React, { useEffect, useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RxTrash } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";

const ClassExtraActivities = ({ course, setCourses, lessonIndex }) => {
  const [opened, setOpened] = useState(false);
  const [creating, setCreating] = useState(false);

  const quizQuestionModel = {
    question: "Your Question",
    type: "quiz",
    answers: [
      {
        answer: "answer1",
        correct: true,
      },
      {
        answer: "answer2",
        correct: false,
      },
      {
        answer: "answer3",
        correct: false,
      },
      {
        answer: "answer4",
        correct: false,
      },
    ],
  };

  const addExtraActivity = (newLesson) => {
    if(course.extraActivities && course.extraActivities.length >= 5){
      return
    }
    setCourses((prevLesson) => {
      console.log(prevLesson);
      // If extraActivities array exists, add the new object to it
      if (prevLesson.extraActivities) {
        return {
          ...prevLesson,
          extraActivities: [...prevLesson.extraActivities, newLesson],
        };
      } else {
        // If extraActivities array doesn't exist, create it and add the new object
        return {
          ...prevLesson,
          extraActivities: [newLesson],
        };
      }
    });
  };
  const removeActivity = (indexToRemove) => {
    setCourses((prevCourses) => {
      const updatedExtraActivities = [...prevCourses.extraActivities];
      updatedExtraActivities.splice(indexToRemove, 1);
      return { ...prevCourses, extraActivities: updatedExtraActivities };
    });
  };
  useEffect(() => {
    console.log(course);
  }, []);

  return (
    <div className="w-full ">
      <div className="flex justify-between items-center">
        <button
          className={
            " px-2 py-1 rounded font-medium text-stone-500 text-sm border border-stone-500 mt-3 flex items-center"
          }
          onClick={() => {
            addExtraActivity(quizQuestionModel);
          }}
        >
          Add an extra activity
          <IoMdAdd className="mx-1" />
        </button>
        <p className={`font-medium text-xs  ${(course.extraActivities && course.extraActivities.length >= 5)? "text-red-500" : "text-stone-500"}`}>
          <span className="mx-1">
            {course.extraActivities ? course.extraActivities.length : 0}
          </span>
          <span>
          / 5
          </span>
        </p>
      </div>

      {course.extraActivities &&
        course.extraActivities.map((item, index) => {
          return (
            <div key={index}>
              <QuizQuestion
                activity={item}
                activityIndex={index}
                setCourses={setCourses}
                remove={removeActivity}
              />
            </div>
          );
        })}
    </div>
  );
};

const QuizQuestion = ({ activity, activityIndex, setCourses, remove }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // En el efecto, establece el foco en el input cuando se monta el componente
    inputRef.current.focus();
  }, []); // Asegúrate de que el efecto se ejecute solo una vez al montar el componente

  const [opened, setOpend] = useState(true);

  const updateCorrectFlag = (extraActivitiesIndex, answerIndex) => {
    setCourses((prevObject) => {
      const updatedExtraActivities = [...prevObject.extraActivities];
      const updatedAnswers = [
        ...updatedExtraActivities[extraActivitiesIndex].answers,
      ];
      updatedAnswers.forEach((answer, index) => {
        answer.correct = index === answerIndex;
      });
      updatedExtraActivities[extraActivitiesIndex] = {
        ...updatedExtraActivities[extraActivitiesIndex],
        answers: updatedAnswers,
      };
      return {
        ...prevObject,
        extraActivities: updatedExtraActivities,
      };
    });
  };
  const updateAnswer = (extraActivitiesIndex, answerIndex, newAnswer) => {
    setCourses((prevCourses) => {
      const updatedExtraActivities = [...prevCourses.extraActivities];
      const updatedAnswers = [
        ...updatedExtraActivities[extraActivitiesIndex].answers,
      ];
      updatedAnswers[answerIndex] = {
        ...updatedAnswers[answerIndex],
        answer: newAnswer,
      };
      updatedExtraActivities[extraActivitiesIndex] = {
        ...updatedExtraActivities[extraActivitiesIndex],
        answers: updatedAnswers,
      };
      return {
        ...prevCourses,
        extraActivities: updatedExtraActivities,
      };
    });
  };
  const updateQuestion = (extraActivitiesIndex, newQuestion) => {
    setCourses((prevCourses) => {
      const updatedExtraActivities = [...prevCourses.extraActivities];
      updatedExtraActivities[extraActivitiesIndex] = {
        ...updatedExtraActivities[extraActivitiesIndex],
        question: newQuestion,
      };
      return {
        ...prevCourses,
        extraActivities: updatedExtraActivities,
      };
    });
  };
  return (
    <div className="my-3">
      {opened ? (
        <>
          <div className="flex items-center  justify-between">
            <input
              ref={inputRef}
              type="text"
              placeholder="Your question"
              value={activity.question}
              className="focus:outline-none  border pl-2 py-1 w-full"
              onChange={(e) => updateQuestion(activityIndex, e.target.value)}
            />
            <div className="flex">
              <div
                onClick={() => remove(activityIndex)}
                className="border-y border-r p-2 "
              >
                <RxTrash />
              </div>
              <div
                onClick={() => setOpend(false)}
                className="border-y border-r p-2"
              >
                <IoIosArrowUp />
              </div>
            </div>
          </div>

          <div>
            {activity.answers.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-start space-x-2 my-1"
              >
                <div
                  onClick={() => updateCorrectFlag(activityIndex, index)}
                  className={`h-[20px] w-[20px] border-1 ${
                    item.correct ? "linearGradient_ver1 border-transparent" : ""
                  } hover:bg-stone-100 flex items-center justify-center transition-all`}
                >
                  <MdDone className="text-white" />
                </div>
                <input
                  type="text"
                  placeholder="answer"
                  value={item.answer}
                  onChange={(e) =>
                    updateAnswer(activityIndex, index, e.target.value)
                  }
                  className="w-full focus:outline-none focus:border-b-stone-400 hover:border-b-stone-200 border-b-transparent border-b-2 pl-1 py-1 text-sm"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => setOpend(true)}
            className="flex items-center justify-between hover:bg-stone-50 px-2 py-1 border"
          >
            <p>{activity.question}</p>
            <div>
              <IoIosArrowDown />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassExtraActivities;
