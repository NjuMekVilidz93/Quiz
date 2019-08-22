const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const maxHighScores = 3;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup',function () {
  saveScoreBtn.disabled = !username.value;
});



function saveHighScore(e) {
  console.log("clicked");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort( (a,b) => b.score - a.score );
  highScores.splice(3);


  localStorage.setItem('highScores', JSON.stringify(highScores));
  // localStorage.clear(); //
}
