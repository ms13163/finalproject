document.addEventListener('DOMContentLoaded', () => {

  function createElement(type, attrs, ...children) {
    const ele = document.createElement(type);
    for (const prop in attrs) {
      if (attrs.hasOwnProperty(prop)) {
        ele.setAttribute(prop, attrs[prop]);
      }
    }
    children.forEach(c => ele.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return ele;
  }

 const btnShowModalQuestion = document.getElementById('btn-show-modal-question');
  const modalQuestion = document.getElementById('modal-question');
  const btnCreateQuestion = document.getElementById('create-question');
  const questionTextarea = document.getElementById('question-text');
  const allQuestionsContainer = document.querySelector('main'); // Renamed for clarity

  function openModal(modal) {
    modal.classList.add('open');
  }

  function closeModal(modal) {
    modal.classList.remove('open');
  }

  btnShowModalQuestion.addEventListener('click', () => {
    openModal(modalQuestion);
  });

  const closeQuestionModalButton = modalQuestion.querySelector('.close');
  if (closeQuestionModalButton) {
    closeQuestionModalButton.addEventListener('click', () => {
      closeModal(modalQuestion);
      questionTextarea.value = '';
    });
  }

  btnCreateQuestion.addEventListener('click', () => {
    const questionText = questionTextarea.value.trim();
    if (questionText) {
       // console.log('POST /questions/ hit. req.body:',questionText);
      fetch('/questions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText }),
      })

      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(newQuestion => {
        console.log('New question created:', newQuestion);
        const questionContainer = createElement('article');
        const questionHeader = createElement('h3', {}, newQuestion.question);
        questionContainer.appendChild(questionHeader);
        allQuestionsContainer.appendChild(questionContainer); 
        closeModal(modalQuestion);
        questionTextarea.value = '';


        const addAnswerButtons = document.querySelectorAll('.add-answer-btn');
      addAnswerButtons.forEach(button => {
        button.addEventListener('click', function() {
          const questionId = this.getAttribute('data-question-id');
          const modalAnswer = document.getElementById('modal-answer');
          const questionIdInput = document.getElementById('question-id');
          questionIdInput.value = questionId;
          openModal(modalAnswer);
        });
      });
      })
      .catch(error => {
        console.log();
        console.error('Error creating question:', error);
      });
    } else {
      alert('Please enter a question.');
    }
  });

  fetch('/questions/')
    .then(response => {
      if (!response.ok) {
        const error = `an error occurred: ${response.status}`;
        console.error(error);
       
        throw new Error(error); 
      }
      return response.json();
    })
    .then(questions => {
      questions.forEach(questionObject => {
  
        const questionContainer = createElement('article');

    
        const questionHeader = createElement('h3', {}, questionObject.question);
        questionContainer.appendChild(questionHeader);

    
        const answerList = createElement("ul");
        questionObject.answers.forEach(answer => {
          const answerItem = createElement("li", {}, answer);
          answerList.appendChild(answerItem);
        });
        questionContainer.appendChild(answerList);

       
        const addButton = createElement('button', { class: 'add-answer-btn', 'data-question-id': questionObject._id }, "Add Answer");
        questionContainer.appendChild(addButton);

    
        allQuestionsContainer.appendChild(questionContainer);

        const addAnswerButtons = document.querySelectorAll('.add-answer-btn');
      addAnswerButtons.forEach(button => {
        button.addEventListener('click', function() {
          const questionId = this.getAttribute('data-question-id');
          const modalAnswer = document.getElementById('modal-answer');
          const questionIdInput = document.getElementById('question-id');
          questionIdInput.value = questionId;
          openModal(modalAnswer);
        });
      });
      });

     
      
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
      const errorMessage = createElement('p', {}, 'Failed to load questions.');
      allQuestionsContainer.appendChild(errorMessage);
    });
});