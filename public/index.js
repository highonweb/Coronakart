const autoc = async () => {
  let sterm = document.querySelector('.sbar').value;
  let ac = document.querySelector('.res');
  let results = await fetch('http://localhost:3000/search', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify({sterm: sterm}),
  });
  results = await results.json();
  ac.innerHTML = '';
  results.map((element) => {
    a = document.createElement('a');
    a.href = `/item${element._id}`;
    div = document.createElement('div');
    div.innerHTML = element.name;
    div.className = 'acres';
    div.style.cursor = 'pointer';
    a.appendChild(div);
    ac.appendChild(a);
  });
};
const search = async (val) => {
  let sterm = val.previousElementSibling.value;
  let results = await fetch('http://localhost:3000/search', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify({sterm: sterm}),
  });
  let res = await results.json();
  card(res);
};
const card = (va) => {
  document.querySelector('.res').innerHTML = '';
  let container = document.querySelector('.items');
  container.innerHTML = '';
  va.forEach((element) => {
    container.innerHTML += `<a href="item${element._id} ">
    <div class="products">
      ${element.name} <br />
      ${element.price} <br />
      <img src="${'img' + element._id}" alt="" class="dash-img" /></div>
  </a>`;
  });
};
