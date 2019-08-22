const topScoresList = document.getElementById('topScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

topScoresList.innerHTML = highScores.map( score => {
  return `<li class='high-score'>${score.name} - ${score.score}</li>`;
}).join("");
