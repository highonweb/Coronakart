const autoc = async () => {
  let sterm = document.querySelector('.sbar').value;
  let ac = document.querySelector('.ac');
  let results = await fetch('http://localhost:3000/search', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify({sterm: sterm}),
  });
  results = await results.json();
  ac.innerHTML = '';
  result.map((element) => {
    div = document.createElement('div');
    if (isNaN(sterm)) {
      div.innerHTML = element.name;
    } else {
      div.innerHTML = element.rollno;
    }
    div.id = 'suggestion';
    div.style.cursor = 'pointer';
    div.setAttribute('onclick', 'search(this)');
    ac.appendChild(div);
  });
};
