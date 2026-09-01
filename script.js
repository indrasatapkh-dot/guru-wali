const KEY="guruWaliAppV3";
const months=["Juli","Agustus","September","Oktober","November","Desember","Januari","Februari","Maret","April","Mei","Juni"];
let data={school:"SMP NEGERI 2 KAPUAS HILIR",teacher:"Indra Arief Rianto, S.Kom",subject:"",className:"IX",schoolYear:"2026/2027",semester:"Ganjil",reportNumber:"",reportDate:"",principal:"",principalNip:"",logo:"",students:[],journal:[],development:[],recap:[]};
function load(){try{let x=JSON.parse(localStorage.getItem(KEY));if(x)data={...data,...x}}catch(e){}}
let saveTimer;function save(){localStorage.setItem(KEY,JSON.stringify(data));clearTimeout(saveTimer);saveTimer=setTimeout(()=>{let b=document.getElementById("saveBadge");if(b)b.innerHTML="✓<span>TERSIMPAN</span>"},100)}
function saveRender(){save();renderAll()}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function studentOptions(sel=""){return '<option value="">Pilih murid</option>'+data.students.map((s,i)=>`<option value="${i}" ${String(sel)===String(i)?"selected":""}>${esc(s.nama||"Murid "+(i+1))}</option>`).join("")}
function bindIdentity(){
 ["school","teacher","subject","className","schoolYear","semester"].forEach(id=>{
  let e=document.getElementById(id);e.value=data[id]||"";
  e.addEventListener("input",()=>{data[id]=e.value;save();renderReports()});
  e.addEventListener("change",()=>{data[id]=e.value;save();renderReports()});
 });
 ["reportNumber","reportDate","principal","principalNip"].forEach(id=>{
  let e=document.getElementById(id);if(!e)return;e.value=data[id]||"";
  e.addEventListener("input",()=>{data[id]=e.value;save();renderReports()});
  e.addEventListener("change",()=>{data[id]=e.value;save();renderReports()});
 });
 let lf=document.getElementById("logoFile"),ln=document.getElementById("logoName");
 if(!data.logo){
  data.logo="logo-kapuas.png";
  if(ln)ln.textContent="Lambang Kabupaten Kapuas";
 }
 if(lf)lf.addEventListener("change",()=>{
  let f=lf.files[0];if(!f)return;
  let r=new FileReader();r.onload=()=>{data.logo=r.result;save();if(ln)ln.textContent=f.name;renderReports()};
  r.readAsDataURL(f);
 });
 if(ln&&data.logo)ln.textContent="Logo tersimpan";
}
function renderStudents(){let b=document.getElementById("studentBody");b.innerHTML=data.students.length?data.students.map((s,i)=>`<tr><td>${i+1}</td><td><input value="${esc(s.nama)}" data-s="${i}" data-k="nama" placeholder="Nama murid"></td><td><input value="${esc(s.nisn)}" data-s="${i}" data-k="nisn" placeholder="NIS/NISN"></td><td><input value="${esc(s.kelas||data.className)}" data-s="${i}" data-k="kelas"></td><td><select data-s="${i}" data-k="jk"><option ${s.jk==="L"?"selected":""}>L</option><option ${s.jk==="P"?"selected":""}>P</option></select></td><td><input value="${esc(s.kontak)}" data-s="${i}" data-k="kontak" placeholder="08..."></td><td><input value="${esc(s.catatan)}" data-s="${i}" data-k="catatan"></td><td><button class="del" onclick="delStudent(${i})">×</button></td></tr>`).join(""):'<tr><td colspan="8" class="empty">Belum ada murid.</td></tr>';b.querySelectorAll("[data-s]").forEach(e=>e.addEventListener("input",()=>{data.students[e.dataset.s][e.dataset.k]=e.value;save()}));document.getElementById("studentCount").textContent=data.students.length+" murid terdaftar"}
function delStudent(i){if(confirm("Hapus murid ini?")){data.students.splice(i,1);saveRender()}}
function renderJournal(){let b=document.getElementById("journalBody");b.innerHTML=data.journal.length?data.journal.map((r,i)=>`<tr><td><input type="date" value="${esc(r.date)}" data-j="${i}" data-k="date"></td><td><select data-j="${i}" data-k="student">${studentOptions(r.student)}</select></td><td><input value="${esc(r.type)}" data-j="${i}" data-k="type" placeholder="Pembinaan"></td><td><textarea rows="2" data-j="${i}" data-k="problem">${esc(r.problem)}</textarea></td><td><textarea rows="2" data-j="${i}" data-k="result">${esc(r.result)}</textarea></td><td><textarea rows="2" data-j="${i}" data-k="followup">${esc(r.followup)}</textarea></td><td><select data-j="${i}" data-k="status"><option ${r.status==="Selesai"?"selected":""}>Selesai</option><option ${r.status==="Dipantau"?"selected":""}>Dipantau</option><option ${r.status==="Belum selesai"?"selected":""}>Belum selesai</option></select></td><td><button class="del" onclick="delJournal(${i})">×</button></td></tr>`).join(""):'<tr><td colspan="8" class="empty">Belum ada jurnal pembinaan.</td></tr>';b.querySelectorAll("[data-j]").forEach(e=>e.addEventListener("input",()=>{data.journal[e.dataset.j][e.dataset.k]=e.value;save();renderReports()}))}
function delJournal(i){data.journal.splice(i,1);saveRender()}
function renderDevelopment(){let b=document.getElementById("developmentBody"),f=document.getElementById("monthFilter").value||"Semua";let rows=data.development.map((r,i)=>({...r,i})).filter(r=>f==="Semua"||r.month===f);b.innerHTML=rows.length?rows.map(r=>`<tr><td><select data-d="${r.i}" data-k="month">${months.map(m=>`<option ${m===r.month?"selected":""}>${m}</option>`).join("")}</select></td><td><select data-d="${r.i}" data-k="student">${studentOptions(r.student)}</select></td><td><input value="${esc(r.attendance)}" data-d="${r.i}" data-k="attendance" placeholder="Hadir/I/S"></td><td><textarea rows="2" data-d="${r.i}" data-k="academic">${esc(r.academic)}</textarea></td><td><textarea rows="2" data-d="${r.i}" data-k="attitude">${esc(r.attitude)}</textarea></td><td><textarea rows="2" data-d="${r.i}" data-k="progress">${esc(r.progress)}</textarea></td><td><textarea rows="2" data-d="${r.i}" data-k="problem">${esc(r.problem)}</textarea></td><td><textarea rows="2" data-d="${r.i}" data-k="followup">${esc(r.followup)}</textarea></td><td><button class="del" onclick="delDevelopment(${r.i})">×</button></td></tr>`).join(""):'<tr><td colspan="9" class="empty">Belum ada catatan perkembangan.</td></tr>';b.querySelectorAll("[data-d]").forEach(e=>e.addEventListener("input",()=>{data.development[e.dataset.d][e.dataset.k]=e.value;save();renderReports()}))}
function delDevelopment(i){data.development.splice(i,1);saveRender()}
function renderRecap(){let b=document.getElementById("recapBody");b.innerHTML=data.recap.length?data.recap.map((r,i)=>`<tr><td>${i+1}</td><td><input type="date" value="${esc(r.date)}" data-r="${i}" data-k="date"></td><td><select data-r="${i}" data-k="student">${studentOptions(r.student)}</select></td><td><input value="${esc(r.type)}" data-r="${i}" data-k="type"></td><td><textarea rows="2" data-r="${i}" data-k="result">${esc(r.result)}</textarea></td><td><textarea rows="2" data-r="${i}" data-k="followup">${esc(r.followup)}</textarea></td><td><button class="del" onclick="delRecap(${i})">×</button></td></tr>`).join(""):'<tr><td colspan="7" class="empty">Belum ada rekap pendampingan.</td></tr>';b.querySelectorAll("[data-r]").forEach(e=>e.addEventListener("input",()=>{data.recap[e.dataset.r][e.dataset.k]=e.value;save();renderReports()}));document.getElementById("totalStudents").textContent=data.students.length;document.getElementById("totalJournal").textContent=data.journal.length;document.getElementById("totalDevelopment").textContent=data.development.length;document.getElementById("totalFollowup").textContent=data.journal.filter(x=>x.followup?.trim()).length+data.development.filter(x=>x.followup?.trim()).length+data.recap.filter(x=>x.followup?.trim()).length}
function delRecap(i){data.recap.splice(i,1);saveRender()}
function studentName(i){return data.students[i]?.nama||"Murid belum dipilih"}
function formatDateID(v){
 if(!v)return "................................";
 const d=new Date(v+"T00:00:00");
 return d.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});
}
function reportHeader(title,subtitle=""){
 return `<div class="official-letterhead">
   <div class="logo-box">${data.logo?`<img src="${data.logo}" alt="Logo Sekolah">`:`<div class="logo-placeholder">SMP<br><b>2</b></div>`}</div>
   <div class="kop-text">
    <div class="kop-line">PEMERINTAH KABUPATEN KAPUAS</div>
    <div class="kop-line">DINAS PENDIDIKAN</div>
    <div class="school-name">${esc(data.school||"SMP NEGERI 2 KAPUAS HILIR")}</div>
    <div class="school-address">Alamat sekolah · Kapuas Hilir · Kalimantan Tengah</div>
   </div>
  </div>
  <div class="kop-rule"></div>
  <div class="report-meta"><span>Nomor: ${esc(data.reportNumber||"................................")}</span><span>Tanggal: ${formatDateID(data.reportDate)}</span></div>
  <div class="official-title">${title}</div>${subtitle?`<div class="official-subtitle">${subtitle}</div>`:""}`;
}
function signatureBlock(){
 return `<div class="signature-grid">
   <div><div>Mengetahui,</div><b>Kepala Sekolah</b><div class="sign-space"></div><b>${esc(data.principal||"................................................")}</b><div>NIP. ${esc(data.principalNip||"................................")}</div></div>
   <div><div>${esc(data.school||"Kapuas Hilir")}, ${formatDateID(data.reportDate)}</div><b>Guru Wali</b><div class="sign-space"></div><b>${esc(data.teacher||"................................................")}</b><div>NIP. ................................</div></div>
  </div>`;
}

function monthReport(month){let j=data.journal.filter(r=>{let d=r.date?new Date(r.date+"T00:00:00"):null;return d&&months[(d.getMonth()+6)%12]===month}),dev=data.development.filter(r=>r.month===month),rc=data.recap.filter(r=>{let d=r.date?new Date(r.date+"T00:00:00"):null;return d&&months[(d.getMonth()+6)%12]===month});return {j,dev,rc}}
function renderReports(){let m=document.getElementById("reportMonth").value||months[0],x=monthReport(m);document.getElementById("monthlyPreview").innerHTML=reportHeader("LAPORAN BULANAN PENDAMPINGAN GURU WALI",`Kelas ${esc(data.className)} · Tahun Ajaran ${esc(data.schoolYear)} · ${m}`)+`<p>Pada bulan <b>${m}</b>, tercatat <b>${x.j.length}</b> jurnal pembinaan, <b>${x.dev.length}</b> catatan perkembangan, dan <b>${x.rc.length}</b> kegiatan pendampingan.</p><h4>Ringkasan Jurnal Pembinaan</h4><table><thead><tr><th>No</th><th>Tanggal</th><th>Murid</th><th>Kegiatan</th><th>Hasil</th><th>Tindak Lanjut</th></tr></thead><tbody>${x.j.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.date)}</td><td>${esc(studentName(r.student))}</td><td>${esc(r.type)}</td><td>${esc(r.result)}</td><td>${esc(r.followup)}</td></tr>`).join("")||'<tr><td colspan="6">Tidak ada data.</td></tr>'}</tbody></table><h4>Ringkasan Perkembangan</h4><table><thead><tr><th>No</th><th>Murid</th><th>Kehadiran</th><th>Akademik</th><th>Sikap</th><th>Perkembangan</th><th>Tindak Lanjut</th></tr></thead><tbody>${x.dev.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(studentName(r.student))}</td><td>${esc(r.attendance)}</td><td>${esc(r.academic)}</td><td>${esc(r.attitude)}</td><td>${esc(r.progress)}</td><td>${esc(r.followup)}</td></tr>`).join("")||'<tr><td colspan="7">Tidak ada data.</td></tr>'}</tbody></table>${signatureBlock()}`}
function renderSemester(){let p=data.journal.filter(x=>x.status!=="Selesai").length;document.getElementById("semesterPreview").innerHTML=reportHeader("LAPORAN SEMESTER BUKU PENDAMPINGAN GURU WALI",`Kelas ${esc(data.className)} · Tahun Ajaran ${esc(data.schoolYear)} · Semester ${esc(data.semester)}`)+`<p>Guru wali telah melaksanakan pendampingan terhadap <b>${data.students.length} murid</b>. Selama semester berjalan tercatat <b>${data.journal.length} jurnal pembinaan</b>, <b>${data.development.length} catatan perkembangan</b>, dan <b>${data.recap.length} kegiatan pendampingan</b>.</p><h4>Rekapitulasi Murid</h4><table><thead><tr><th>No</th><th>Nama</th><th>NIS/NISN</th><th>Kelas</th><th>L/P</th><th>Catatan Khusus</th></tr></thead><tbody>${data.students.map((s,i)=>`<tr><td>${i+1}</td><td>${esc(s.nama||"-")}</td><td>${esc(s.nisn||"-")}</td><td>${esc(s.kelas||data.className)}</td><td>${esc(s.jk||"-")}</td><td>${esc(s.catatan||"-")}</td></tr>`).join("")||'<tr><td colspan="6">Belum ada data murid.</td></tr>'}</tbody></table><h4>Kesimpulan dan Tindak Lanjut</h4><p>Data pendampingan digunakan sebagai bahan evaluasi perkembangan murid dan koordinasi dengan pihak sekolah serta orang tua/wali. Terdapat <b>${p}</b> jurnal yang masih berstatus dipantau/belum selesai. Tindak lanjut disesuaikan dengan kebutuhan masing-masing murid.</p>${signatureBlock()}`}
function renderDashboard(){
 const t=document.getElementById("dashTeacher"),s=document.getElementById("dashSchool");
 if(t)t.textContent=data.teacher||"Guru Wali";
 if(s)s.textContent=(data.school||"Sekolah")+" · Kelas "+(data.className||"-")+" · "+(data.schoolYear||"-");
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
 set("dashStudents",data.students.length);set("dashJournal",data.journal.length);
 set("dashDevelopment",data.development.length);
 set("dashFollowup",data.journal.filter(x=>x.followup?.trim()).length+data.development.filter(x=>x.followup?.trim()).length+data.recap.filter(x=>x.followup?.trim()).length);
}
function renderAll(){renderStudents();renderJournal();renderDevelopment();renderRecap();renderReports();renderSemester();renderDashboard()}
function setup(){
 let mf=document.getElementById("monthFilter"),rm=document.getElementById("reportMonth");mf.innerHTML="<option>Semua</option>"+months.map(m=>`<option>${m}</option>`).join("");rm.innerHTML=months.map(m=>`<option>${m}</option>`).join("");mf.addEventListener("change",renderDevelopment);rm.addEventListener("change",renderReports);
 document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));btn.classList.add("active");document.getElementById(btn.dataset.tab).classList.add("active");if(btn.dataset.tab==="monthlyReport")renderReports();if(btn.dataset.tab==="semesterReport")renderSemester()}));
 document.getElementById("addStudent").onclick=()=>{data.students.push({nama:"",nisn:"",kelas:data.className,jk:"L",kontak:"",catatan:""});saveRender()};
 document.getElementById("addJournal").onclick=()=>{data.journal.push({date:new Date().toISOString().slice(0,10),student:"",type:"Pembinaan",problem:"",result:"",followup:"",status:"Dipantau"});saveRender()};
 document.getElementById("addDevelopment").onclick=()=>{data.development.push({month:months[0],student:"",attendance:"",academic:"",attitude:"",progress:"",problem:"",followup:""});saveRender()};
 document.getElementById("addRecap").onclick=()=>{data.recap.push({date:new Date().toISOString().slice(0,10),student:"",type:"",result:"",followup:""});saveRender()};
 function printOnly(id){
 const allowed=["students","journal","development","recap","monthlyReport","semesterReport"];
 if(!allowed.includes(id)) return;
 const url=new URL(window.location.href);
 url.searchParams.set("print",id);
 window.open(url.toString(),"_blank","noopener,noreferrer");
}
function runPrintMode(){
 const id=new URLSearchParams(window.location.search).get("print");
 const allowed=["students","journal","development","recap","monthlyReport","semesterReport"];
 if(!allowed.includes(id)) return;
 document.body.setAttribute("data-print",id);
 // Reports are rendered from the normal app state, so wait until rendering completes.
 setTimeout(()=>{
   window.focus();
   window.print();
 },700);
}
document.getElementById("exportData").onclick=()=>{let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));a.download="backup-buku-guru-wali.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
 document.getElementById("importData").onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{data={...data,...JSON.parse(r.result)};saveRender();alert("Data berhasil dipulihkan.")}catch{alert("File backup tidak valid.")}};r.readAsText(f)};
 document.getElementById("clearData").onclick=()=>{if(confirm("Hapus SEMUA data aplikasi?")){localStorage.removeItem(KEY);location.reload()}};
}
load();setup();bindIdentity();renderAll();runPrintMode();
