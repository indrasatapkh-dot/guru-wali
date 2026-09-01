const KEY="guruWaliAppV1";
const months=["Juli","Agustus","September","Oktober","November","Desember","Januari","Februari","Maret","April","Mei","Juni"];
let data={school:"SMP NEGERI 2 KAPUAS HILIR",teacher:"Indra Arief Rianto, S.Kom",subject:"",className:"IX",schoolYear:"2026/2027",semester:"Ganjil",students:[],monthly:[],recap:[]};

function load(){try{const x=JSON.parse(localStorage.getItem(KEY));if(x)data={...data,...x}}catch(e){}}
let saveTimer;
function save(){
  localStorage.setItem(KEY,JSON.stringify(data));
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    const badge=document.getElementById("saveBadge");
    if(badge) badge.innerHTML="✓<span>TERSIMPAN</span>";
  },120);
}
function saveAndRender(){
  save();
  renderAll();
}
function bindIdentity(){
 ["school","teacher","subject","className","schoolYear","semester"].forEach(id=>{
  const el=document.getElementById(id);el.value=data[id]||"";
  el.addEventListener("input",()=>{data[id]=el.value;save()});
  el.addEventListener("change",()=>{data[id]=el.value;save()});
 });
}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function studentOptions(selected=""){return '<option value="">Pilih murid</option>'+data.students.map((s,i)=>`<option value="${i}" ${String(selected)===String(i)?"selected":""}>${esc(s.nama||"Murid "+(i+1))}</option>`).join("")}
function renderStudents(){
 const b=document.getElementById("studentBody");
 b.innerHTML=data.students.length?data.students.map((s,i)=>`<tr>
 <td>${i+1}</td>
 <td><input value="${esc(s.nama)}" data-s="${i}" data-k="nama" placeholder="Nama murid"></td>
 <td><input value="${esc(s.nisn)}" data-s="${i}" data-k="nisn" placeholder="NIS/NISN"></td>
 <td><input value="${esc(s.kelas||data.className)}" data-s="${i}" data-k="kelas"></td>
 <td><select data-s="${i}" data-k="jk"><option ${s.jk==="L"?"selected":""}>L</option><option ${s.jk==="P"?"selected":""}>P</option></select></td>
 <td><input value="${esc(s.kontak)}" data-s="${i}" data-k="kontak" placeholder="08..."></td>
 <td><input value="${esc(s.catatan)}" data-s="${i}" data-k="catatan" placeholder="Catatan khusus"></td>
 <td><button class="del" onclick="deleteStudent(${i})" title="Hapus">×</button></td></tr>`).join(""):'<tr><td colspan="8" class="empty">Belum ada murid. Klik “Tambah murid”.</td></tr>';
 b.querySelectorAll("[data-s]").forEach(el=>el.addEventListener("input",()=>{data.students[el.dataset.s][el.dataset.k]=el.value;save()}));
 document.getElementById("studentCount").textContent=`${data.students.length} murid terdaftar`;
}
function deleteStudent(i){if(confirm("Hapus murid ini?")){data.students.splice(i,1);saveAndRender()}}
function renderMonthly(){
 const b=document.getElementById("monthlyBody");const filter=document.getElementById("monthFilter").value||"Semua";
 const rows=data.monthly.map((r,i)=>({...r,i})).filter(r=>filter==="Semua"||r.month===filter);
 b.innerHTML=rows.length?rows.map(r=>`<tr>
 <td><select data-m="${r.i}" data-k="month">${months.map(m=>`<option ${m===r.month?"selected":""}>${m}</option>`).join("")}</select></td>
 <td><select data-m="${r.i}" data-k="student">${studentOptions(r.student)}</select></td>
 <td><input value="${esc(r.attendance)}" data-m="${r.i}" data-k="attendance" placeholder="Hadir/izin/sakit"></td>
 <td><textarea rows="2" data-m="${r.i}" data-k="development">${esc(r.development)}</textarea></td>
 <td><textarea rows="2" data-m="${r.i}" data-k="problem">${esc(r.problem)}</textarea></td>
 <td><textarea rows="2" data-m="${r.i}" data-k="followup">${esc(r.followup)}</textarea></td>
 <td><button class="del" onclick="deleteMonthly(${r.i})">×</button></td></tr>`).join(""):'<tr><td colspan="7" class="empty">Belum ada catatan bulanan.</td></tr>';
 b.querySelectorAll("[data-m]").forEach(el=>el.addEventListener("input",()=>{data.monthly[el.dataset.m][el.dataset.k]=el.value;save()}));
}
function deleteMonthly(i){data.monthly.splice(i,1);saveAndRender()}
function renderRecap(){
 const b=document.getElementById("recapBody");
 b.innerHTML=data.recap.length?data.recap.map((r,i)=>`<tr>
 <td>${i+1}</td><td><input type="date" value="${esc(r.date)}" data-r="${i}" data-k="date"></td>
 <td><select data-r="${i}" data-k="student">${studentOptions(r.student)}</select></td>
 <td><input value="${esc(r.type)}" data-r="${i}" data-k="type" placeholder="Pembinaan / komunikasi"></td>
 <td><textarea rows="2" data-r="${i}" data-k="result">${esc(r.result)}</textarea></td>
 <td><textarea rows="2" data-r="${i}" data-k="followup">${esc(r.followup)}</textarea></td>
 <td><button class="del" onclick="deleteRecap(${i})">×</button></td></tr>`).join(""):'<tr><td colspan="7" class="empty">Belum ada catatan pendampingan.</td></tr>';
 b.querySelectorAll("[data-r]").forEach(el=>el.addEventListener("input",()=>{data.recap[el.dataset.r][el.dataset.k]=el.value;save()}));
 document.getElementById("totalNotes").textContent=data.recap.length+data.monthly.length;
 document.getElementById("totalStudents").textContent=data.students.length;
 document.getElementById("totalFollowup").textContent=data.recap.filter(x=>x.followup?.trim()).length+data.monthly.filter(x=>x.followup?.trim()).length;
}
function deleteRecap(i){data.recap.splice(i,1);saveAndRender()}
function renderReport(){
 const names=data.students.map((s,i)=>`<tr><td>${i+1}</td><td>${esc(s.nama||"-")}</td><td>${esc(s.nisn||"-")}</td><td>${esc(s.kelas||data.className)}</td><td>${esc(s.jk||"-")}</td></tr>`).join("");
 document.getElementById("reportPreview").innerHTML=`<h3>LAPORAN SEMESTER<br>BUKU PENDAMPINGAN GURU WALI</h3>
 <p><b>Sekolah:</b> ${esc(data.school)}<br><b>Guru Wali:</b> ${esc(data.teacher)}<br><b>Kelas:</b> ${esc(data.className)}<br><b>Tahun Ajaran:</b> ${esc(data.schoolYear)} · <b>Semester:</b> ${esc(data.semester)}</p>
 <p>Pada semester ini guru wali melakukan pendampingan terhadap <b>${data.students.length} murid</b> dengan jumlah catatan pendampingan dan perkembangan sebanyak <b>${data.recap.length+data.monthly.length}</b>.</p>
 <h4>Daftar Murid Dampingan</h4><table><thead><tr><th>No</th><th>Nama</th><th>NIS/NISN</th><th>Kelas</th><th>L/P</th></tr></thead><tbody>${names||'<tr><td colspan="5">Belum ada data.</td></tr>'}</tbody></table>
 <p style="margin-top:40px;text-align:right">Guru Wali,<br><br><br><b>${esc(data.teacher)}</b></p>`;
}
function renderAll(){renderStudents();renderMonthly();renderRecap();renderReport()}
function setup(){
 const mf=document.getElementById("monthFilter");mf.innerHTML='<option>Semua</option>'+months.map(m=>`<option>${m}</option>`).join("");mf.addEventListener("change",renderMonthly);
 document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));btn.classList.add("active");document.getElementById(btn.dataset.tab).classList.add("active");}));
 document.getElementById("addStudent").onclick=()=>{data.students.push({nama:"",nisn:"",kelas:data.className,jk:"L",kontak:"",catatan:""});saveAndRender()};
 document.getElementById("addMonthly").onclick=()=>{data.monthly.push({month:months[0],student:"",attendance:"",development:"",problem:"",followup:""});saveAndRender()};
 document.getElementById("addRecap").onclick=()=>{data.recap.push({date:new Date().toISOString().slice(0,10),student:"",type:"",result:"",followup:""});saveAndRender()};
 document.getElementById("printReport").onclick=()=>window.print();
 document.getElementById("exportData").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));a.download="backup-buku-guru-wali.json";a.click();URL.revokeObjectURL(a.href)};
 document.getElementById("importData").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{data={...data,...JSON.parse(r.result)};saveAndRender();alert("Data berhasil dipulihkan.")}catch{alert("File backup tidak valid.")}};r.readAsText(f)};
 document.getElementById("clearData").onclick=()=>{if(confirm("Hapus SEMUA data aplikasi? Data tidak dapat dikembalikan kecuali ada backup.")){localStorage.removeItem(KEY);location.reload()}};
}
load();setup();bindIdentity();renderAll();
