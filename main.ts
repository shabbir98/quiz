#! /usr/bin/env node
import inquirer from 'inquirer';

interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

const quizQuestions: Question[] = [
  {
    question: 'What is the capital of Spain?',
    choices: ['Paris', 'London', 'Madrid', 'Rome'],
    correctAnswer: 'Madrid',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    choices: ['Earth', 'Mars', 'Venus', 'Jupiter'],
    correctAnswer: 'Mars',
  },
  {
    question: 'What is the largest mammal in the world?',
    choices: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 'Blue Whale',
  },
];

interface UserAnswers {
  [index: number]: string;
}

const userAnswers: UserAnswers = {};

async function startQuiz() {
  let score = 0;

  const { userName } = await inquirer.prompt({
    type: 'input',
    name: 'userName',
    message: 'Enter your name:',
  });

  console.log(`Welcome to the Quiz ${userName}\n`);

  for (let i = 0; i < quizQuestions.length; i++) {
    const question = quizQuestions[i];
    const { question: q, choices, correctAnswer } = question;

    const { response } = await inquirer.prompt([
      {
        type: 'list',
        name: 'response',
        message: q,
        choices,
      },
    ]);

    userAnswers[i] = response;
    if (response === correctAnswer) score++;

    console.log('\n');
  }

  console.log(
    `Quiz completed!\nYour score: ${score} out of ${quizQuestions.length}`
  );

  console.log('\nCorrect Answers:');
  quizQuestions.forEach((q, i) =>
    console.log(`${i + 1}) ${q.question} - Correct Answer: ${q.correctAnswer}`)
  );

  console.log('\nYour Answers:');
  quizQuestions.forEach((q, i) =>
    console.log(`${i + 1}) ${q.question} - Your Answer: ${userAnswers[i]}`)
  );
}

startQuiz();
