/* MediConnect demo storage helpers. Never use this prototype for real patient data. */
const Store = (() => {
  const PREFIX = "mediconnect_demo_";
  const defaults = {
    profile: {id:"patient-demo",name:"Aarav Sharma",email:"patient@demo.test",phone:"9876543210",dob:"2003-04-15",avatar:"👨🏻‍💼"},
    role:"patient",
    doctors: [
      {id:"d1",name:"Dr. Ananya Rao",specialty:"Cardiologist",qualification:"MBBS, MD (Cardiology)",experience:12,fee:700,available:true,avatar:"👩🏻‍⚕️",tone:"",bio:"A fictional cardiology specialist focused on preventive heart-health education and patient-centred care.",slots:["09:00","10:30","12:00","15:00"]},
      {id:"d2",name:"Dr. Rohan Mehta",specialty:"Dermatologist",qualification:"MBBS, MD (Dermatology)",experience:9,fee:500,available:true,avatar:"👨🏻‍⚕️",tone:"blue",bio:"A fictional dermatologist who helps patients understand common skin-care concerns.",slots:["09:30","11:00","14:00","16:00"]},
      {id:"d3",name:"Dr. Sara Khan",specialty:"Pediatrician",qualification:"MBBS, DCH",experience:10,fee:600,available:true,avatar:"👩🏽‍⚕️",tone:"purple",bio:"A fictional pediatrician who values family communication and child wellness education.",slots:["10:00","11:30","13:30","15:30"]},
      {id:"d4",name:"Dr. Vikram Iyer",specialty:"Orthopedist",qualification:"MBBS, MS (Orthopedics)",experience:14,fee:800,available:true,avatar:"👨🏽‍⚕️",tone:"orange",bio:"A fictional orthopedist interested in mobility, joint health, and injury prevention.",slots:["09:00","12:30","14:30","17:00"]},
      {id:"d5",name:"Dr. Neha Patel",specialty:"General Physician",qualification:"MBBS, MD (General Medicine)",experience:7,fee:400,available:true,avatar:"👩🏻‍⚕️",tone:"",bio:"A fictional general physician for routine consultations and general wellness discussions.",slots:["08:30","10:00","13:00","16:30"]},
      {id:"d6",name:"Dr. Imran Ali",specialty:"Neurologist",qualification:"MBBS, DM (Neurology)",experience:11,fee:900,available:false,avatar:"👨🏾‍⚕️",tone:"purple",bio:"A fictional neurologist profile included for directory-filter demonstrations.",slots:["10:00","12:00","15:00"]}
    ],
    appointments: [
      {id:"MC-1001",patientId:"patient-demo",patientName:"Aarav Sharma",doctorId:"d1",doctorName:"Dr. Ananya Rao",specialty:"Cardiologist",date:StoreDate(3),time:"10:30",type:"In-person",reason:"Routine check-up",status:"Confirmed",createdAt:new Date().toISOString(),notes:"",prescriptionId:""},
      {id:"MC-1002",patientId:"patient-demo",patientName:"Aarav Sharma",doctorId:"d2",doctorName:"Dr. Rohan Mehta",specialty:"Dermatologist",date:StoreDate(-5),time:"14:00",type:"Online demo",reason:"General consultation",status:"Completed",createdAt:new Date().toISOString(),notes:"Fictional consultation notes for demonstration.",prescriptionId:"RX-2001"}
    ],
    medical_records:[
      {id:"MR-1",patientId:"patient-demo",title:"General wellness visit",date:StoreDate(-5),doctorName:"Dr. Rohan Mehta",category:"Consultation",notes:"Fictional demo note: patient discussed general wellness and routine follow-up.",history:"No verified history. Sample content only."},
      {id:"MR-2",patientId:"patient-demo",title:"Annual check-up summary",date:StoreDate(-35),doctorName:"Dr. Ananya Rao",category:"Check-up",notes:"Fictional demo note: routine check-up record for interface demonstration.",history:"Allergies and medical history are not verified."}
    ],
    prescriptions:[{id:"RX-2001",patientId:"patient-demo",patientName:"Aarav Sharma",doctorName:"Dr. Rohan Mehta",date:StoreDate(-5),medicine:"Sample medicine (fictional)",dosage:"See a qualified clinician for real instructions",duration:"Demo only",instructions:"This is not a valid prescription. Do not use as medical advice."}],
    notifications:[
      {id:"N-1",title:"Appointment confirmed",message:"Your demo appointment with Dr. Ananya Rao is confirmed.",date:new Date().toISOString(),read:false,type:"appointment"},
      {id:"N-2",title:"Welcome to MediConnect",message:"Explore the demo features. All information is fictional.",date:new Date(Date.now()-86400000).toISOString(),read:true,type:"system"}
    ],
    feedback:[], activity:[{id:"A-1",message:"Demo workspace initialized",date:new Date().toISOString()}], theme:"light",
    demoUsers:[
      {id:"patient-demo",name:"Aarav Sharma",email:"patient@demo.test",role:"patient"},
      {id:"doctor-demo",name:"Dr. Ananya Rao",email:"doctor@demo.test",role:"doctor"},
      {id:"admin-demo",name:"Demo Administrator",email:"admin@demo.test",role:"admin"}
    ]
  };
  function safeParse(raw, fallback){try{return raw===null?fallback:JSON.parse(raw)}catch(e){return fallback}}
  function get(key){try{return safeParse(localStorage.getItem(PREFIX+key),undefined)}catch(e){return undefined}}
  function set(key,value){try{localStorage.setItem(PREFIX+key,JSON.stringify(value));return true}catch(e){toast("Browser storage is unavailable. Changes may not persist.","error");return false}}
  function init(){let ok=true;for(const [k,v] of Object.entries(defaults)){if(get(k)===undefined){if(!set(k,v))ok=false}}return ok}
  function all(key){const v=get(key);return v===undefined?defaults[key]||[]:v}
  function reset(){try{Object.keys(localStorage).filter(k=>k.startsWith(PREFIX)).forEach(k=>localStorage.removeItem(k));init();return true}catch(e){return false}}
  function addActivity(message){const arr=all("activity");arr.unshift({id:"A-"+Date.now(),message,date:new Date().toISOString()});set("activity",arr.slice(0,30))}
  function notify(title,message,type="system"){const arr=all("notifications");arr.unshift({id:"N-"+Date.now(),title,message,type,date:new Date().toISOString(),read:false});set("notifications",arr)}
  return {PREFIX,defaults,get,set,all,init,reset,addActivity,notify};
})();
function StoreDate(offset=0){const d=new Date();d.setDate(d.getDate()+offset);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
