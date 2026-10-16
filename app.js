const DUE=new Date(2027,2,9,12),START=new Date(2026,5,2,12),DAY=86400000;
const data=[[[1,4],"O início da aventura","As primeiras estruturas começam a se organizar. É uma fase inicial e delicada da jornada.","🌱"],[[5,8],"Pequeno explorador","O sistema nervoso, o coração e os principais órgãos entram em formação.","🦁"],[[9,12],"Movimentos começam","Rafael apresenta uma forma cada vez mais definida, enquanto braços, pernas, mãos e pés continuam se desenvolvendo.","🐾"],[[13,16],"Crescendo na savana","O corpo se alonga, os ossos se fortalecem e as expressões faciais ficam mais variadas.","🌿"],[[17,20],"Sons e movimentos","Os movimentos podem começar a ser percebidos. A audição continua se desenvolvendo e Rafael fica mais ativo.","🐘"],[[21,24],"Mais força a cada dia","Os sentidos e os movimentos seguem amadurecendo. O crescimento ganha ritmo.","🦒"],[[25,27],"Fim do segundo trimestre","O cérebro e os pulmões continuam amadurecendo, enquanto o corpo acumula mais gordura.","☀️"],[[28,31],"Terceiro trimestre","Rafael cresce rapidamente e passa por uma fase importante de amadurecimento cerebral.","🌅"],[[32,35],"Preparando a chegada","O corpo ganha peso e os órgãos seguem aperfeiçoando suas funções.","🧡"],[[36,40],"Quase nos braços da família","Rafael entra na reta final e se prepara para conhecer o mundo.","🎈"],[[41,42],"Acompanhamento final","A data prevista é uma estimativa. O acompanhamento da equipe de saúde é especialmente importante.","🤎"]];
function noon(d=new Date){return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12)}
const days=Math.max(0,Math.min(294,Math.round((noon()-START)/DAY))),week=Math.floor(days/7),day=days%7,left=Math.max(0,Math.round((DUE-noon())/DAY)),progress=Math.min(100,days/280*100);let selected=Math.max(1,Math.min(42,week));
const stats=[["👶","Hoje, Rafael está com",`${week} semanas`,`e ${day} ${day===1?'dia':'dias'}`],["⏳","Faltam aproximadamente",`${left} dias`,"para a data prevista"],["📅","Previsão da chegada do Rafael","09/03/2027","terça-feira"],["✨","Concepção estimada","16/06/2026","data aproximada"]];
document.querySelector('#stats').innerHTML=stats.map(x=>`<article class="card stat"><div class="stat-icon">${x[0]}</div><small>${x[1]}</small><h3>${x[2]}</h3><p>${x[3]}</p></article>`).join('');
percent.textContent=progress.toFixed(1).replace('.',',')+'% do caminho';bar.style.width=progress+'%';trimester.textContent=week<14?'1º trimestre':week<28?'2º trimestre':'3º trimestre';
function render(){const x=data.find(x=>selected>=x[0][0]&&selected<=x[0][1]);weekIcon.textContent=x[3];weekNumber.textContent=selected;weekTitle.textContent=x[1];weekText.textContent=x[2];prev.disabled=selected===1;next.disabled=selected===42}prev.onclick=()=>{selected--;render()};next.onclick=()=>{selected++;render()};render();
const text=()=>`Acompanhe a jornada do Rafael 🦁💛 Hoje ele está com ${week} semanas e ${day} dias. A chegada está prevista para 09/03/2027!`;
async function share(){if(navigator.share)try{await navigator.share({title:'A Jornada do Rafael',text:text(),url:location.href});return}catch(e){}open('https://wa.me/?text='+encodeURIComponent(text()+' '+location.href),'_blank')}
document.querySelector('#share').onclick=share;whatsapp.onclick=share;
let promptEvent;addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;install.hidden=false});install.onclick=async()=>{if(promptEvent){promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;install.hidden=true}};
function online(){offline.hidden=navigator.onLine}addEventListener('online',online);addEventListener('offline',online);online();if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));

// Canção de ninar original do Rafael, com controle de ativar e desativar.
const lullaby = new Audio('./pequeno_leao_do_rafael.wav');
lullaby.loop = true;
lullaby.preload = 'auto';
lullaby.volume = 0.42;
let musicPlaying = false;

async function toggleMusic() {
  const btn = document.querySelector('#music');
  if (!musicPlaying) {
    try {
      await lullaby.play();
      musicPlaying = true;
      btn.setAttribute('aria-pressed', 'true');
      btn.textContent = '❚❚ Desativar música';
    } catch (error) {
      btn.textContent = '♫ Toque para ativar';
    }
  } else {
    lullaby.pause();
    musicPlaying = false;
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = '♫ Ativar música';
  }
}

document.querySelector('#music').addEventListener('click', toggleMusic);
document.addEventListener('visibilitychange', () => {
  if (document.hidden && musicPlaying) toggleMusic();
});
