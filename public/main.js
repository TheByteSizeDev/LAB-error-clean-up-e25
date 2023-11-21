import '../styles/main.scss'; // You have to import your styles for them to work. Comment in this line
import renderToDOM from '../utils/renderToDOM';
import htmlStructure from '../components/htmlStructure';
import form from '../components/form';
import studentsOnDom from '../utils/studentsOnDom';

const voldysArmy = []; // starts as an empty array
const students = [];
// ********** HTML Components  ********** //

const header = () => {
  const domString = `<div class="container">
    <h1>Welcome to Hoggy Hogwarts Sorting Hat!</h1>
    <p>
      Hmm, difficult. VERY difficult. <br />Plenty of courage, I see.
      <br />Not a bad mind, either. There's talent, oh yes. <br />And a
      thirst to prove yourself. <br />But where to put you?
    </p>
  </div>`;

  renderToDOM('#header-container', domString);
};

const startSortingBtn = () => {
  const domString = '<button type="button" class="btn btn-info" id="start-sorting">Start the Sorting Ceremony!</button>';

  renderToDOM('#form-container', domString);
};

const studentAreas = () => {
  const domString = `<div id="students">No Students</div>
  <div id="voldy">No Death Eaters</div>`;

  renderToDOM('#student-container', domString);
};

const filterBtnRow = () => {
  const domString = `<div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" id="filter--hufflepuff" class="btn btn-warning btn-sm">Hufflepuff</button>
      <button type="button" class="btn btn-primary btn-sm" id="filter--ravenclaw">Ravenclaw</button>
      <button type="button" class="btn btn-success btn-sm" id="filter--slytherin">Slytherin</button>
      <button type="button" class="btn btn-danger btn-sm" id="filter--gryffindor">Gryffindor</button>
      <button type="button" class="btn btn-secondary btn-sm" id="filter--all">All</button>
    </div>`;

  renderToDOM('#filter-container', domString);
};

// ********** LOGIC  ********** //
// sorts student to a house and then place them in the students array

const events = () => {
  // get form on the DOM on button click
  document.querySelector('#start-sorting').addEventListener('click', () => {
    // put html elements on the DOM on click
    form(); // form
    filterBtnRow(); // filter buttons
    studentAreas(); // students and voldy's army divs
  });

  // target expel buttons to move to voldys army
  document
    .querySelector('#student-container')
    .addEventListener('click', (e) => {
      if (e.target.id.includes('expel')) {
        const [, id] = e.target.id.split('--');
        const index = students.findIndex((student) => student.id === Number(id));

        // move from one array to another
        voldysArmy.push(...students.splice(index, 1));
        // get both sets of students on the DOM
        studentsOnDom('#students', students);
        studentsOnDom('#voldy', voldysArmy);
      }
    });

  // target filter buttons on Dom
  document.querySelector('#filter-container').addEventListener('click', (e) => {
    if (e.target.id.includes('filter')) {
      const [, house] = e.target.id.split('--');

      if (house === 'all') {
        studentsOnDom('#students', students);
      } else if (house) {
        const filter = students.filter((student) => student.house === house);
        studentsOnDom('#students', filter, house);
      }
    }
  });
};

const startApp = () => {
  htmlStructure(); // always load first
  header();
  startSortingBtn();
  events(); // always load last
};

startApp();
