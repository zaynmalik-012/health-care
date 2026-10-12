const Validate = {
  email(value){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)},
  phone(value){return /^[0-9+\-\s()]{7,16}$/.test(value)},
  required(value){return String(value??"").trim().length>0},
  show(field,message){const el=document.querySelector(`[data-error="${field}"]`);if(el)el.textContent=message||""},
  clear(form){form.querySelectorAll(".error-text").forEach(e=>e.textContent="")},
  escape(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
};
function esc(v){return Validate.escape(v)}
