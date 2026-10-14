const $=i=>document.getElementById(i),e=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let alvo;
function cont(){const d=alvo-Date.now();if(d<=0){$('cont').innerHTML='<div><b>0</b><small>dias</small></div>';return}
const t=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];
$('cont').innerHTML=t.map((v,i)=>`<div><b>${v}</b><small>${['dias','horas','min','seg'][i]}</small></div>`).join('')}
const item=a=>{const ext=/\bADPF\b/i.test(a.titulo)?'<div class="adpf-ext">Arguição de Descumprimento de Preceito Fundamental</div>':'';return `<div class="cd"><span class="dt">${e(a.data)}</span><h3>${e(a.titulo)}</h3>${ext}<div class="v">${e(a.texto)}</div><div class="nota">Fonte: <a href="${e(a.url)}" target="_blank" rel="noopener">${e(a.fonte)}</a></div></div>`};
fetch('dados.json?t='+Date.now()).then(r=>r.json()).then(D=>{
const s=D.status,p=D.processo;alvo=new Date(D.data_alvo);cont();setInterval(cont,1000);
{const n=(s.numero_adpf||'').trim();$('numproc').innerHTML='<span>Número do processo:</span><b>'+e(n&&!/^n[ãa]o divulgado$/i.test(n)?n:'ainda não divulgado')+'</b>';}
$('status').innerHTML=`<div>Relator<b>${e(s.relator)}</b></div><div>Liminar<b>${e(s.liminar)}</b></div><div>Nº da ADPF<b>${e(s.numero_adpf)}</b></div>`;
const kv=(k,v)=>`<div class="cd"><div class="k">${k}</div><div class="v">${v}</div></div>`;
$('proc').innerHTML=kv('Situação',e(s.situacao))+kv('Classe','ADPF<div class="adpf-ext">Arguição de Descumprimento de Preceito Fundamental</div>')+kv('Número',e(s.numero_adpf))+kv('Número único',e(p.numero_unico||'—'))+kv('Tribunal',e(p.tribunal))+kv('Requerente',e(p.autor))+kv('Advogado',e(p.advogado||'—'))+kv('Interessado',e(p.interessado||'—'))+kv('Assunto',e(p.assunto||'—'))+kv('Protocolo',e(p.protocolo))+kv('Relator',e(s.relator))+kv('Liminar',e(s.liminar))+kv('Pedido','<ul>'+p.pedido.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul>')+kv('Tese',e(p.tese))+kv('Citação do PSD','<q>'+e(p.citacao)+'</q>')+kv('Se não houver decisão',e(p.alternativa));
$('and').innerHTML=D.andamentos.map(item).join('');
$('ctx').innerHTML=D.contexto.map(item).join('');
$('min').innerHTML='<p class="ct nota">Indicados pelo PSD para o sorteio</p>'+D.ministros.filter(m=>m.grupo=='pedido').map(m=>`<div class="cd"><h3>${e(m.nome)}</h3><div class="v">${e(m.status)}</div></div>`).join('')+'<p class="ct nota">Excluídos no pedido</p>'+D.ministros.filter(m=>m.grupo!='pedido').map(m=>`<div class="cd ex"><h3>${e(m.nome)}</h3><div class="v">${e(m.status)}</div></div>`).join('');
$('fon').innerHTML=D.fontes.map(f=>`<div class="cd"><a href="${e(f.url)}" target="_blank" rel="noopener">${e(f.nome)}</a></div>`).join('');
$('atu').innerHTML='Atualizado em <b>'+e(D.atualizado_em)+'</b> (horário de Brasília)';});
function aba(n){document.querySelectorAll('.aba').forEach(m=>m.hidden=m.id!='aba-'+n);document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('atual',a.dataset.aba==n))}
document.querySelectorAll('#nav a').forEach(a=>a.onclick=ev=>{ev.preventDefault();aba(a.dataset.aba);history.replaceState(0,'','#'+a.dataset.aba)});
if(location.hash)aba(location.hash.slice(1));
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
