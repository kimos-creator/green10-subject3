const data = 보도자료; // fetch 없이 로컬 더블클릭으로도 동작한다.
const q = document.getElementById('q');
const list = document.getElementById('list');
const count = document.getElementById('count');
function search() {
  const kw = q.value.trim().toLocaleLowerCase('ko');
  const filtered = kw ? data.filter(a => [a.본문, a.제목, a.부처].some(text => text.toLocaleLowerCase('ko').includes(kw))) : data;
  render(filtered);
}
q.addEventListener('input', search);
document.getElementById('reset').addEventListener('click', () => {
  q.value = '';
  search();
  q.focus();
});
function render(arr) {
  count.textContent = `결과 ${arr.length}건 / 전체 ${data.length}건`;
  list.replaceChildren();
  if (arr.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = '검색 결과가 없습니다. 다른 검색어를 입력해 주세요.';
    list.append(empty);
    return;
  }
  for (const a of arr) {
    const card = document.createElement('article');
    card.className = 'card';
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = a.부처;
    const title = document.createElement('h2');
    title.className = 'title';
    title.textContent = a.제목;
    const body = document.createElement('div');
    body.className = 'body';
    body.textContent = a.본문;
    card.append(label, title, body);
    list.append(card);
  }
}
render(data);
