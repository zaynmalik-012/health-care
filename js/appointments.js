const Appointments = {
  all(){return Store.all("appointments")},
  forPatient(){const p=Store.all("profile");return this.all().filter(a=>a.patientId===(p.id||"patient-demo"))},
  save(list){Store.set("appointments",list)},
  slotTaken(doctorId,date,time,ignoreId=""){return this.all().some(a=>a.id!==ignoreId&&a.doctorId===doctorId&&a.date===date&&a.time===time&&a.status!=="Cancelled")},
  create(data){
    if(data.date<StoreDate(0))return {ok:false,message:"Please choose today or a future date."};
    if(this.slotTaken(data.doctorId,data.date,data.time))return {ok:false,message:"That slot is already booked. Please choose another time."};
    const d=Doctors.byId(data.doctorId);if(!d||!d.available)return {ok:false,message:"This doctor is not currently available."};
    const p=Store.all("profile");
    const item={id:"MC-"+String(Date.now()).slice(-7),patientId:p.id||"patient-demo",patientName:p.name,doctorId:d.id,doctorName:d.name,specialty:d.specialty,date:data.date,time:data.time,type:data.type,reason:data.reason,status:"Pending",createdAt:new Date().toISOString(),notes:"",prescriptionId:""};
    const arr=this.all();arr.unshift(item);this.save(arr);Store.notify("Appointment requested",`Your demo appointment with ${d.name} is pending.`,"appointment");Store.addActivity(`Appointment requested with ${d.name}`);return {ok:true,item};
  },
  update(id,changes){const arr=this.all(),i=arr.findIndex(a=>a.id===id);if(i<0)return false;arr[i]={...arr[i],...changes};this.save(arr);return true},
  cancel(id){return this.update(id,{status:"Cancelled"})},
  reschedule(id,date,time){const a=this.all().find(x=>x.id===id);if(!a)return {ok:false,message:"Appointment not found."};if(date<StoreDate(0))return {ok:false,message:"Choose a date that is not in the past."};if(this.slotTaken(a.doctorId,date,time,id))return {ok:false,message:"That time slot is already booked."};this.update(id,{date,time,status:"Pending"});Store.notify("Appointment rescheduled",`${a.doctorName} appointment moved to ${date} at ${time}.`,"appointment");Store.addActivity(`Appointment ${id} rescheduled`);return {ok:true}},
  statusClass(status){return status.toLowerCase()},
  badge(status){return `<span class="pill ${this.statusClass(status)}">${esc(status)}</span>`},
  row(a,doctorMode=false){return `<tr><td><strong>${esc(a.id)}</strong><div class="small muted">${esc(a.reason||"")}</div></td>${doctorMode?`<td>${esc(a.patientName||"Demo patient")}</td>`:`<td><strong>${esc(a.doctorName)}</strong><div class="small muted">${esc(a.specialty)}</div></td>`}<td>${esc(a.date)}<div class="small muted">${esc(a.time)}</div></td><td>${esc(a.type)}</td><td>${this.badge(a.status)}</td><td><div class="table-actions"><button class="btn btn-outline" data-action="appointment-details" data-id="${a.id}">Details</button>${!doctorMode&&["Pending","Confirmed"].includes(a.status)?`<button class="btn btn-outline" data-action="reschedule" data-id="${a.id}">Move</button><button class="btn btn-danger" data-action="cancel-appointment" data-id="${a.id}">Cancel</button>`:""}${doctorMode&&a.status==="Pending"?`<button class="btn btn-soft" data-action="confirm-appointment" data-id="${a.id}">Confirm</button>`:""}${doctorMode&&a.status==="Confirmed"?`<button class="btn btn-soft" data-action="complete-appointment" data-id="${a.id}">Complete</button>`:""}</div></td></tr>`}
};
