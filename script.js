const postcard = {
  recipient: 'you',
  sender: 'me',
  message: `Dear my baby,

I can't believe it's only been one month since we dated each other. It's always felt like we've been with each other for years to me. Every time I think about us, I'm always amazed by how things are so easy and natural - it's as if I'm walking into my comfy bedroom. 

I know that things will be more difficult, but that doesn't mean it will be for us. People say that distance makes the heart grows fonder, and I think this is especially true for us, as we are a true match that is meant to last forever. 

Honestly, I can't wait to explore the world with you and go through more hardship together, as I know even the rainy days can feel cozy when we are together.

This is a little something I handmade and of course, some AI to help me out.

In this corner of the universe, you are mine and I am yours forever. I love you from the bottom of my heart.

Henry`
};
const $ = id => document.getElementById(id);
function render() {
  document.querySelectorAll('[data-copy]').forEach(node => { node.textContent = postcard[node.dataset.copy]; });
  $('message-output').replaceChildren(...postcard.message.split(/\n\s*\n/).map(text => { const p = document.createElement('p'); p.textContent = text; p.style.whiteSpace = 'pre-line'; return p; }));
}
render();
function openLetter() {
  $('open-letter').classList.add('opened');
  $('letter-section').hidden = false;
  $('open-cta').textContent = 'Read your letter ♡';
  $('letter-section').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}
$('open-letter').addEventListener('click', openLetter);
$('open-cta').addEventListener('click', openLetter);
$('close-letter').addEventListener('click', () => { $('letter-section').hidden = true; $('open-letter').classList.remove('opened'); $('open-cta').innerHTML = 'Open your letter <span>♡</span>'; $('open-cta').focus({preventScroll:true}); window.scrollTo({top:0,behavior:'smooth'}); });
let dodges = 0;
const tease = ['Oops. That button has commitment issues.', 'Nice try. It’s playing hard to get.', 'Even the button knows the right answer.', 'Okay, okay. You can catch it now. ♡'];
function dodge(event) {
  if (dodges >= 4 || (event.type === 'pointerenter' && event.pointerType === 'touch')) return;
  if (event.type === 'click') event.preventDefault();
  const area = $('playground'), button = $('no');
  const maxX = Math.max(0, area.clientWidth - button.offsetWidth - 4);
  const positions = [[maxX,90],[0,100],[maxX * .65,60],[maxX * .35,110]];
  const [x,y] = positions[dodges];
  button.style.position = 'absolute'; button.style.left = `${x}px`; button.style.top = `${y}px`;
  $('tease-caption').textContent = tease[dodges]; dodges++;
}
$('no').addEventListener('pointerenter', dodge);
$('no').addEventListener('click', event => { if(dodges < 4) dodge(event); else { $('tease-caption').textContent = 'Take your time. I’ll be right here, being cute. ♡'; $('no').textContent = 'Okay… obviously ♡'; $('no').onclick = celebrate; } });
function celebrate() {
  $('yes-result').hidden = false;
  $('playground').hidden = true;
  $('tease-caption').textContent = 'Excellent taste. I like you too. A lot.';
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 32; i++) { const heart = document.createElement('span'); heart.textContent = ['♡','♥','✧'][i % 3]; heart.style.left = `${Math.random()*100}%`; heart.style.animationDelay = `${Math.random()*.8}s`; heart.style.fontSize = `${12+Math.random()*22}px`; $('confetti').append(heart); setTimeout(() => heart.remove(), 4200); }
  }
}
$('yes').addEventListener('click', celebrate);
