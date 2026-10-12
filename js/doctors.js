const Doctors = {
  all(){return Store.all("doctors")},
  byId(id){return this.all().find(d=>d.id===id)},
  save(list){Store.set("doctors",list)},
  search(query="",specialty="",availability="all",maxFee="",sort="recommended"){
    let list=this.all().filter(d=>{
      const q=query.toLowerCase();
      return (!q||`${d.name} ${d.specialty} ${d.qualification}`.toLowerCase().includes(q)) &&
        (!specialty||specialty==="all"||d.specialty===specialty) &&
        (availability==="all"||(availability==="available"&&d.available)||(availability==="unavailable"&&!d.available)) &&
        (!maxFee||d.fee<=Number(maxFee));
    });
    if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
    if(sort==="fee-low")list.sort((a,b)=>a.fee-b.fee);
    if(sort==="fee-high")list.sort((a,b)=>b.fee-a.fee);
    return list;
  },
  card(d){return `<article class="card doctor-card"><div class="doctor-top"><div class="avatar ${d.tone||""}" aria-label="Doctor avatar">${d.avatar}</div><div><h3>${esc(d.name)}</h3><div class="specialty">${esc(d.specialty)}</div><div class="small muted">${esc(d.qualification)}</div></div></div><div class="doctor-info"><div class="status-line"><span class="status-dot" style="background:${d.available?'var(--green)':'var(--red)'}"></span><span class="small">${d.available?'Available for demo bookings':'Currently unavailable'}</span></div><div class="doctor-meta"><span>✦ ${d.experience} years</span><span class="price">₹${d.fee} <small>/ visit</small></span></div><div class="doctor-actions"><button class="btn btn-outline" data-action="doctor-profile" data-id="${d.id}">View profile</button><button class="btn btn-primary" data-action="book" data-id="${d.id}" ${d.available?'':'disabled'}>Book</button></div></div></article>`}
};
