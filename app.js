var D={phone:"201070817203",currency:"ج.م",items:[
{id:"p1",n:"ايس جل باك (أكياس)",d:"أكياس جل قابلة لإعادة التجميد، خفيفة وتناسب الشنط والصناديق بمختلف المقاسات.",p:15,unit:"للقطعة",u:["food","ship","trip"],t:["قابل لإعادة الاستخدام"],ic:"bag",img:""},
{id:"p2",n:"ايس باك (عبوات صلبة)",d:"عبوات صلبة متينة بمقاسات مختلفة، تحافظ على البرودة لفترة أطول وتتحمل الاستخدام المتكرر.",p:35,unit:"للقطعة",u:["food","ship","trip"],t:["متين"],ic:"box",img:""},
{id:"p3",n:"انستانت ايس باك",d:"كيس تبريد فوري بدون تجميد. اضغط وهز الكيس ويبرد في ثوانٍ. مناسب للإصابات والرحلات.",p:35,unit:"للقطعة",u:["med","trip"],t:["استخدام مرة واحدة","بدون فريزر"],ic:"bolt",img:""},
{id:"p4",n:"سيليكا جيل",d:"أكياس مجففة تمتص الرطوبة وتحمي المنتجات والأجهزة والأغذية من التلف.",p:8,unit:"للكيس",u:["food","ship"],t:["مضاد للرطوبة"],ic:"beads",img:""},
{id:"p5",n:"حافظات أنسولين",d:"حافظة معزولة بجيب للجل تحفظ أقلام وأمبولات الأنسولين باردة أثناء السفر والعمل.",p:180,unit:"للقطعة",u:["med","trip"],t:["للأدوية","سهلة الحمل"],ic:"med",img:""},
{id:"p6",n:"شنط حفظ الطعام",d:"شنط معزولة بسعات متعددة تحافظ على الأكل والمشروبات باردة للمطاعم والمنزل والرحلات.",p:150,unit:"للقطعة",u:["food","trip","ship"],t:["معزولة","سعات متعددة"],ic:"tote",img:""},
{id:"p7",n:"سو دراى (مضاد للعفن)",d:"مضاد للعفن والرطوبة يحمي المنتجات والمخازن والشنط من الفطريات والروائح المتعفنة.",p:12,unit:"للكيس",u:["food","ship"],t:["مضاد للعفن","مضاد للرطوبة"],ic:"drop",img:""},
{id:"p8",n:"بى فريش (ماص للأكسجين)",d:"يمتص الأكسجين وثاني أكسيد الكربون والروائح الكريهة، فيطيل مدة حفظ الأغذية ويحافظ على نضارتها.",p:10,unit:"للكيس",u:["food","ship"],t:["يمتص الأكسجين","يمتص ثاني أكسيد الكربون","يزيل الروائح"],ic:"leaf",img:""}
]};
var IC={
bag:'<rect x="14" y="8" width="36" height="46" rx="7"/><path d="M14 18h36M24 30h16M24 38h16"/>',
box:'<rect x="12" y="22" width="40" height="32" rx="5"/><rect x="16" y="12" width="32" height="10" rx="3"/>',
bolt:'<path d="M36 6L16 36h13l-4 22 23-32H34z"/>',
beads:'<circle cx="22" cy="24" r="8"/><circle cx="42" cy="24" r="8"/><circle cx="32" cy="42" r="8"/>',
med:'<rect x="6" y="20" width="52" height="26" rx="9"/><path d="M32 27v12M26 33h12"/>',
tote:'<path d="M12 24h40l-3 30H15z"/><path d="M22 24v-6a10 10 0 0 1 20 0v6"/>',
leaf:'<path d="M14 50C14 26 28 14 50 14c0 22-12 36-36 36zM14 50L36 28"/>',
drop:'<path d="M32 8C22 22 16 30 16 40a16 16 0 0 0 32 0C48 30 42 22 32 8z"/><path d="M22 14l20 36"/>'};
var USES=[["all","الكل"],["food","حفظ الطعام"],["med","أدوية وأنسولين"],["ship","شحن وتوصيل"],["trip","رحلات وطوارئ"]];
var cart={},cur="all";
function $(i){return document.getElementById(i)}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function money(n){return Number(n||0).toLocaleString("ar-EG")+" "+D.currency}
function item(id){return D.items.filter(function(x){return x.id===id})[0]}
function wa(t){return"https://wa.me/"+D.phone+"?text="+encodeURIComponent(t)}
function drawChips(){var c=$("chips");c.innerHTML="";USES.forEach(function(u){var b=document.createElement("button");b.className="chip";b.textContent=u[1];b.setAttribute("aria-pressed",String(cur===u[0]));b.onclick=function(){cur=u[0];drawChips();drawGrid()};c.appendChild(b)})}
function drawGrid(){
 $("grid").innerHTML=D.items.map(function(p){
  var on=cur==="all"||(p.u||[]).indexOf(cur)>-1;
  var vis=p.img?'<img class="thumb" alt="'+esc(p.n)+'" src="'+esc(p.img)+'">':'<div class="ico"><svg viewBox="0 0 64 64" aria-hidden="true">'+(IC[p.ic]||IC.box)+'</svg></div>';
  return'<article class="card'+(on?"":" dim")+'">'+vis+'<h3>'+esc(p.n)+'</h3><p>'+esc(p.d)+'</p><div class="tags">'+(p.t||[]).map(function(x){return"<span>"+esc(x)+"</span>"}).join("")+'</div><div class="price">'+money(p.p)+' <small>'+esc(p.unit)+'</small></div><div class="buy"><input type="number" min="1" value="1" aria-label="الكمية" id="q_'+p.id+'"><button class="btn" data-add="'+p.id+'">أضف للطلب</button></div></article>'}).join("");
}
function drawCart(){
 var ids=Object.keys(cart).filter(function(i){return item(i)}),t=0,n=0;
 $("lines").innerHTML=ids.length?ids.map(function(i){var p=item(i),q=cart[i];t+=p.p*q;n+=q;return'<div class="line"><span>'+esc(p.n)+'</span><input type="number" min="1" value="'+q+'" data-cq="'+i+'" aria-label="الكمية"><span>'+money(p.p*q)+'</span><button data-rm="'+i+'" aria-label="حذف">×</button></div>'}).join(""):'<p class="sub">لم تضف منتجات بعد. اختر منتجا وحدد الكمية.</p>';
 $("tot").textContent=money(t);$("cartbtn").textContent="طلبك ("+n.toLocaleString("ar-EG")+")";
}
$("grid").addEventListener("click",function(e){
 var t=e.target,id;
 if(id=t.getAttribute("data-add")){var q=Math.max(1,parseInt($("q_"+id).value)||1);cart[id]=(cart[id]||0)+q;drawCart();t.textContent="تمت الإضافة";setTimeout(function(){t.textContent="أضف للطلب"},1200)}
});
$("lines").addEventListener("input",function(e){var i=e.target.getAttribute("data-cq");if(i&&e.target.value!==""){cart[i]=Math.max(1,parseInt(e.target.value)||1);var f=document.activeElement;var v=f.value,k=f.getAttribute("data-cq");drawCart();var nf=document.querySelector('[data-cq="'+k+'"]');if(nf){nf.focus();nf.value=v}}});
$("lines").addEventListener("click",function(e){var i=e.target.getAttribute("data-rm");if(i){delete cart[i];drawCart()}});
$("send").onclick=function(){
 var ids=Object.keys(cart).filter(function(i){return item(i)});
 if(!ids.length){alert("أضف منتجا واحدا على الأقل.");return}
 var t=0,l=ids.map(function(i){var p=item(i);t+=p.p*cart[i];return"- "+p.n+" × "+cart[i]+" = "+money(p.p*cart[i])}).join("\n");
 var m="طلب جديد من موقع جيروباك\n"+l+"\nالإجمالي: "+money(t)+"\nالاسم: "+$("cn").value+"\nالموبايل: "+$("cp").value+($("cm").value?"\nملاحظات: "+$("cm").value:"");
 window.open(wa(m),"_blank")};
drawChips();drawGrid();drawCart();
(function(){var t=$("t"),b=$("b");
 if(matchMedia("(prefers-reduced-motion:reduce)").matches){t.textContent="4";b.style.transform="scaleX(.16)";return}
 var s=null;function f(ts){if(!s)s=ts;var k=Math.min((ts-s)/2200,1);t.textContent=Math.round(25-21*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)}
 requestAnimationFrame(f);setTimeout(function(){b.style.transform="scaleX(.16)"},50)})();
