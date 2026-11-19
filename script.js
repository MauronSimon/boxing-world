const menu=document.querySelector('#menu'),links=document.querySelector('#links');if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕ Fermer':'☰ Menu'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰ Menu'}))}document.querySelectorAll('.year').forEach(el=>el.textContent=new Date().getFullYear());const observer=('IntersectionObserver'in window)?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08}):null;document.querySelectorAll('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));

// Quiz BOXING WORLD : progression et réponses validées conservées jusqu'à actualisation.
const quiz=document.querySelector('#quiz');
if(quiz){
 const questions=[
  {q:"Quel est le rôle principal d’un commerce de détail ?",a:["Vendre des produits au consommateur final","Fabriquer tous les produits vendus","Organiser des compétitions sportives"],correct:0,why:"Le détaillant vend des articles directement aux consommateurs."},
  {q:"Quel produit est un équipement de protection pour la boxe ?",a:["Une corde à sauter","Un protège-dents","Un chronomètre"],correct:1,why:"Le protège-dents aide à protéger la bouche pendant la pratique."},
  {q:"Dans un circuit de distribution, qui achète généralement en dernier ?",a:["Le fournisseur","Le grossiste","Le consommateur final"],correct:2,why:"Le circuit aboutit au client qui utilise le produit."},
  {q:"Que signifie la demande sur un marché ?",a:["La quantité que les clients souhaitent acheter","Le nombre de produits fabriqués","Le prix des matières premières"],correct:0,why:"La demande représente les achats souhaités par les consommateurs."},
  {q:"Que représente l’offre sur un marché ?",a:["Les souhaits des clients","Les produits proposés à la vente","Les impôts payés par un magasin"],correct:1,why:"L’offre correspond aux biens ou services proposés sur le marché."},
  {q:"Lequel est une partie prenante d’un magasin de boxe ?",a:["Uniquement les arbitres","Uniquement les boxeurs professionnels","Les fournisseurs"],correct:2,why:"Les fournisseurs fournissent les équipements au commerce."},
  {q:"Quel exemple correspond à la vente directe d’un fabricant ?",a:["Une marque vend ses propres gants sur son site","Un client revend ses anciens gants","Un club prête des gants aux élèves"],correct:0,why:"Le producteur assure directement la vente au consommateur."},
  {q:"Quel avantage apporte une boutique spécialisée ?",a:["Elle supprime tous les coûts de production","Elle peut conseiller les clients sur le matériel","Elle fabrique obligatoirement les gants"],correct:1,why:"Le conseil personnalisé fait partie du service commercial."},
  {q:"Quel geste peut rendre l’achat d’équipement plus durable ?",a:["Remplacer les gants après chaque séance","Jeter les protections encore utilisables","Entretenir le matériel pour prolonger sa durée de vie"],correct:2,why:"Entretenir et utiliser plus longtemps les produits limite les déchets."},
  {q:"Pourquoi indiquer les sources sur un site scolaire ?",a:["Pour permettre de vérifier les informations","Pour cacher les auteurs des images","Pour supprimer les explications"],correct:0,why:"Une source permet au lecteur de retrouver et vérifier une information."}
 ];
 const progress=quiz.querySelector('#quiz-progress');
 const title=quiz.querySelector('#quiz-question');
 const options=quiz.querySelector('#quiz-options');
 const result=quiz.querySelector('#quiz-result');
 const overview=quiz.querySelector('#quiz-overview');
 const done=Array(questions.length).fill(false);
 let current=0,waiting=false;
 function render(){
  const item=questions[current];
  progress.textContent=`Question ${current+1} / ${questions.length} · ${done.filter(Boolean).length} réussies`;
  title.textContent=item.q;
  result.textContent=done[current]?'✓ Bonne réponse déjà validée.':"";
  result.style.color='#9de7be';
  options.replaceChildren();
  item.a.forEach((answer,index)=>{
   const b=document.createElement('button');
   b.type='button';b.textContent=answer;
   b.className='quiz-answer'+(done[current]&&index===item.correct?' is-correct':'');
   b.disabled=done[current]||waiting;
   b.addEventListener('click',()=>{
    if(waiting||done[current])return;
    if(index!==item.correct){
     b.classList.add('is-wrong');
     result.textContent='Pas encore ! Essaie une autre réponse.';
     result.style.color='#ffb7b7';
     window.setTimeout(()=>b.classList.remove('is-wrong'),650);
     return;
    }
    done[current]=true;waiting=true;
    b.classList.add('is-correct');
    options.querySelectorAll('button').forEach(x=>x.disabled=true);
    result.textContent='✓ '+item.why;
    result.style.color='#9de7be';
    updateOverview();
    window.setTimeout(()=>{
     current=(current+1)%questions.length;
     waiting=false;render();
     if(current===0&&done.every(Boolean)){
      result.textContent='🏆 Bravo ! Les 10 questions sont réussies. Tes réponses restent en vert.';
     }
    },1250);
   });
   options.append(b);
  });
  updateOverview();
 }
 function updateOverview(){
  overview.replaceChildren();
  questions.forEach((_,i)=>{
   const b=document.createElement('button');
   b.type='button';b.textContent=String(i+1);
   b.className='quiz-step'+(done[i]?' is-correct':'')+(i===current?' is-current':'');
   b.setAttribute('aria-label',`Question ${i+1}${done[i]?', réussie':''}`);
   b.disabled=waiting||(!done[i]&&i!==current);
   b.addEventListener('click',()=>{if(!waiting){current=i;render()}});
   overview.append(b);
  });
 }
 render();
}
