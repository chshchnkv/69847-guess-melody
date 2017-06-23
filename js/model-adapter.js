import {QuestionType} from './data';

export class ModelAdapter {
  preprocess(data) {
    return data;
  }
}


export default new class extends ModelAdapter {
  preprocess(data) {
    const preprocessed = {questions: []};
    const questions = preprocessed.questions;
    const questionsCount = data.length;
    Object.keys(data).forEach((questionKey, dataQuestionIndex) => {

      const dataQuestion = data[questionKey];

      const modelQuestion = {
        id: dataQuestionIndex,
        type: dataQuestion.type,
        label: dataQuestion.question
      };

      if (dataQuestion.type === QuestionType.ARTIST) {
        modelQuestion.content = dataQuestion.src;
      }

      const modelAnswers = [];

      dataQuestion.answers.forEach((dataAnswer, dataAnswerIndex) => {
        const modelAnswer = {
          id: dataAnswerIndex,
          content: dataAnswer.src,
        };

        if (dataQuestion.type === QuestionType.GENRE) {
          modelAnswer.isCorrect = dataAnswer.genre === dataQuestion.genre;
        } else if (dataQuestion.type === QuestionType.ARTIST) {
          modelAnswer.content = dataAnswer.image.url;
          modelAnswer.label = dataAnswer.title;
          modelAnswer.isCorrect = dataAnswer.isCorrect;
        }

        modelAnswers.push(modelAnswer);
      });

      modelQuestion.answers = modelAnswers;
      if (dataQuestionIndex < questionsCount - 1) {
        modelQuestion.next = dataQuestionIndex + 1;
      }

      questions.push(modelQuestion);
    });
    return preprocessed;
  }
}();
