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
const soundButton = document.getElementById('soundButton');
const all_tones = document.getElementById('all_tones');

soundButton.addEventListener('click', () => {
  all_tones.currentTime = 0;
  all_tones.play();
});

})