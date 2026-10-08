const groups=['الكل','برجر لحم','برجر دجاج','سبيشل ساندويش','جريل ساندويش','مقبلات','البطاطس','نقرشات','المشروبات'];
const menu=[];
function add(group,entries){for(const [name,price,note=''] of entries)menu.push({id:menu.length,name,price,note,group});}
add('برجر لحم',[['تيستي',1.65],['كلاسيك',1.65],['مشروم',1.85],['تيستي دبل',2.65],['كلاسيك دبل',2.65],['مشروم دبل',2.85],['إضافة سماش برجر 100 غ',.5,'إضافة للبرجر'],['إضافة سماش برجر 200 غ',1,'إضافة للبرجر']]);
add('برجر دجاج',[['بيج مو',2,'150 غ'],['تشيكن رويال (باتي)',2.4],['تشيكن برجر',1.65],['تشيكي (صدر) — مقلي',2.35],['تشيكي (صدر) — مشوي',2.35]]);
add('سبيشل ساندويش',[['زنجر سبيشل — حمام',1.5],['زنجر سبيشل — فرنسي',2.1],['تويستر',2.1],['بيج زنجر',2.4],['زنجر تورتيلا',2.1],['هودوج سبيشل',1.25,'خبز حمام']]);
add('جريل ساندويش',[['إيطالي — حمام',1.9],['إيطالي — فرنسي',2.5],['باربيكيو — حمام',1.9],['باربيكيو — فرنسي',2.5],['فاهيتا — حمام',1.9],['فاهيتا — فرنسي',2.5],['فرانسيسكو — حمام',1.9],['فرانسيسكو — فرنسي',2.5],['مش شاورما شراك',1.5]]);
add('مقبلات',[['مكسيكانو سالاد',2.5],['تشيكن سيزر',2.3],['مش كومبير',2.5],['ماش بوتيتو',.85]]);
add('البطاطس',[['بطاطس صغير',.6],['بطاطس وسط',.8],['بطاطس كبير',1.2],['زنجر فرايز',3],['تشيزي فرايز',1.6]]);
add('نقرشات',[['بايتس 12 حبة',2.35,'مع صوص؛ حدّد اختيارك برسالة الطلب'],['حبة وينجز',.3],['صوص باربيكيو',.4],['صوص بافلو',.4],['صوص رانش',.4],['صوص هني ماستر',.4],['صوص سويت شيلي',.4],['صوص ديناميت',.4],['صوص جارليك',.4]]);
add('المشروبات',[['كولا محلي',.3],['عصير مش طبيعي',.15],['ماء',.3]]);
const photos={
'برجر لحم':['main','340% auto','9% 23%'],
'برجر دجاج':['main','340% auto','91% 44%'],
'سبيشل ساندويش':['main','280% auto','10% 73%'],
'جريل ساندويش':['main','320% auto','96% 92%'],
'مقبلات':['sides','280% auto','10% 26%'],
'البطاطس':['sides','310% auto','92% 47%'],
'نقرشات':['sides','300% auto','10% 66%'],
'المشروبات':['sides','330% auto','92% 90%']};
let category='الكل';const cart=new Map();const $=s=>document.querySelector(s);const money=n=>n.toFixed(2)+' د.أ';
function renderMenu(){const q=$('#search').value.trim();const items=menu.filter(x=>(category==='الكل'||category===x.group)&&x.name.includes(q));$('#menu-grid').innerHTML=items.map(x=>{const p=photos[x.group];return `<article class="food-card"><div class="food-art" style="--photo:url('assets/menu-${p[0]}.jpg');--size:${p[1]};--position:${p[2]}" aria-hidden="true"><span class="category-label">${x.group}</span></div><div class="card-body"><h3>${x.name}</h3><p>${x.note||'من منيو هُنا الروابي'}</p><div class="card-bottom"><span class="price">${x.price.toFixed(2)}<small>د.أ</small></span><button class="add" data-add="${x.id}" aria-label="أضف ${x.name} إلى الطلب">+</button></div></div></article>`}).join('');$('#empty').hidden=items.length>0;}
$('#categories').innerHTML=groups.map((g,i)=>`<button class="${i===0?'active':''}" aria-pressed="${i===0}" data-category="${g}">${g}</button>`).join('');
$('#categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;document.querySelectorAll('[data-category]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderMenu()});$('#search').addEventListener('input',renderMenu);
let toastTimer;$('#menu-grid').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const id=Number(b.dataset.add);cart.set(id,(cart.get(id)||0)+1);renderCart();$('#toast').textContent=`أضفنا ${menu[id].name} لطلبك`;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',2200)});
function renderCart(){let count=0,total=0;const lines=[];$('#cart-items').innerHTML=[...cart].map(([id,n])=>{const x=menu[id];count+=n;total+=x.price*n;lines.push(`${n} × ${x.name} — ${money(x.price*n)}`);return `<div class="cart-row"><div><h3>${x.name}</h3><small>${money(x.price*n)}</small></div><div class="quantity"><button data-change="${id}" data-delta="-1" aria-label="تقليل ${x.name}">−</button><span>${n}</span><button data-change="${id}" data-delta="1" aria-label="زيادة ${x.name}">+</button></div></div>`}).join('')||'<p>لسه ما اخترت. المنيو بستناك!</p>';$('#cart-toggle').hidden=!count;$('#cart-count').textContent=count;$('#cart-total').textContent=money(total);$('#summary-total').textContent=money(total);$('#send-order').hidden=!count;$('#send-order').style.display=count?'':'none';$('#send-order').href='https://wa.me/962790222078?text='+encodeURIComponent('مرحبا هُنا الروابي، بدي أطلب:\n'+lines.join('\n')+'\nالمجموع المبدئي: '+money(total)+'\nممكن تأكيد التوفر والسعر وطريقة الاستلام؟');}
$('#cart-items').addEventListener('click',e=>{const b=e.target.closest('[data-change]');if(!b)return;const id=Number(b.dataset.change),n=cart.get(id)+Number(b.dataset.delta);if(n>0)cart.set(id,n);else cart.delete(id);renderCart()});$('#cart-toggle').addEventListener('click',()=>$('#cart-dialog').showModal());
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));document.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{$('#full-image').src=b.dataset.image;$('#download-image').href=b.dataset.image;$('#image-dialog').showModal()}));$('#year').textContent=new Date().getFullYear();renderMenu();renderCart();
