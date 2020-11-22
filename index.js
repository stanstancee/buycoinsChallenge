//basic declaration
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const repos = document.getElementById("repositories");
const profile = document.querySelector("#profile");
const img = document.querySelector("#img");
const DURATION_IN_SECONDS = {
mdhms: [ 'month', 'day', 'hour', 'minute'],
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60
};
// this will fetch the api , here serving from a json file
async function returnData(url) {

  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

// get duration in seconds
function getDuration(seconds) {
 let mdhm, interval;
  for (let i = 0; i < DURATION_IN_SECONDS.mdhms.length; i++) {
    mdhm = DURATION_IN_SECONDS.mdhms[i];
    interval = Math.floor(seconds / DURATION_IN_SECONDS[mdhm]);
    if (interval >= 1) {
      return {
        interval: interval,
        mdhm: mdhm
      };
    }
  }

};


 function timeSince(date) {
   //convert date in  milliseconds to seconds
const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const duration = getDuration(seconds);
//check if duration is more than 1 month 
    if(duration.interval>1 && duration.mdhm ==="month"){
      date= new Date(date);
      return `updated ${month[date.getMonth()]} ${date.getDate()}`
    }
     const suffix = (duration.interval > 1 || duration.interval === 0) ? 's ago' : ' ago';
 return`updated ${duration.interval} ${duration.mdhm}${suffix}` ;
};



/* dynamic rendering of divs*/
const createDiv = async ()=>{
  let div;
let data = await returnData('api/repositories.json')
const repositories =  data.data.viewer.repositories;
 const { nodes } = repositories;
 document.querySelector("#rep-count").innerHTML= `${nodes.length}`
 nodes.map((repo)=>{
  div =  document.createElement("div");
  div.setAttribute('class',"rep")
let colour
//switch colours for div
if(repo.primaryLanguage !== null){
switch (repo.primaryLanguage.name) {
  case "HTML":
    colour = 'HTML'
    break;
    case "JavaScript":
      colour = 'JavaScript'
      break;
      case "CSS":
        colour = 'CSS'
        break;
        case "TypeScript":
          colour = 'TypeScript'
          break;
      
  default:
    colour = "WHITE"
    break;
}
}
let url = `http://github.com/stanstancee/${repo.name}`
  div.innerHTML = `<div class="row">
  <div class="col-4">
  <h2><a href=${url}> ${repo.name} </a></h2>
  <p>
 ${repo.description !== null? document.createElement('p').textContent= repo.description:""}
 </p>
 <div>

 <span ><svg class=${colour} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 18a6 6 0 100-12 6 6 0 000 12z"></path></svg></span>
<span>${repo.primaryLanguage !== null? document.createElement('span').textContent= repo.primaryLanguage.name:""}</span>
${repo.stargazerCount > 0? document.createElement('span').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg> ' +repo.stargazerCount:""}
${repo.forkCount > 0 ?document.createElement("span").innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"></path></svg>'+repo.forkCount:""}
<span>${timeSince(repo.updatedAt)}</span>
  </div>
  </div>

  <div class="col-5">
    <button class="btn"><span class="btn-svg"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg></span><span class="btn-text">Star</span></button>
    
  </div>
  </div>
 `
 
repos.appendChild(div)
 });


 
}


 



/* dynamic redering of profile div */
const  createProfile = async ()=>{
  let data = await  returnData("api/profile.json")
  
  const  viewer = data.data.viewer;

     const {avatarUrl,name,login,bio,followers:{totalCount}, following:{totalCount:fTotalCount}, location, email ,stargazerCount} =  viewer
    if(viewer){
   img.attributes.src.nodeValue = avatarUrl
   const a = document.querySelectorAll(".circled")
   a.forEach((b)=>{

    b.setAttribute('href',`https://github.com/${login}`);
    b.innerHTML=`<img src=${avatarUrl} alt="image" srcset="" id="img2"> ${login}`
   })
 
 
      profile.innerHTML = `
       <div>
       <div class="top">
       <div class="tp">
       <div >
         <img src=${avatarUrl} alt="image" srcset="">
       
        <h1>
        <span class="p-name">${name}</span>
         <span class="p-login" >${login}</span>
         </h1>
         <a href="" class="smile sm"> <svg class="smiley sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M8.456 14.494a.75.75 0 011.068.17 3.08 3.08 0 00.572.492A3.381 3.381 0 0012 15.72c.855 0 1.487-.283 1.904-.562a3.081 3.081 0 00.572-.492l.021-.026a.75.75 0 011.197.905l-.027.034c-.013.016-.03.038-.052.063-.044.05-.105.119-.184.198a4.569 4.569 0 01-.695.566A4.88 4.88 0 0112 17.22a4.88 4.88 0 01-2.736-.814 4.57 4.57 0 01-.695-.566 3.253 3.253 0 01-.236-.261c-.259-.332-.223-.824.123-1.084z"></path><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path><path d="M9 10.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM16.25 12a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"></path></svg><span id="smile-input" class="sm">Set status</span> </a>
      </div>
       <p>${bio}</p>
       <button class="btn">Edit Profile</button>
    
     <div class="count"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg></span><p><span class="num">${totalCount}</span> followers</p><p><span class="num">${fTotalCount} </span> following</p> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg> </span><strong class="num">${stargazerCount}</strong></div>
     <div class="location"> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg></span><span id="loc">${location}</span></div>
     <div class="email"> <span ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path></svg></span><a id="em" href="">${email}</a></div>
   <h3 class="hl">Highlights</h3>
   <p class="hl"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12.5 1.25a.75.75 0 00-1.5 0v8.69L6.447 5.385a.75.75 0 10-1.061 1.06L9.94 11H1.25a.75.75 0 000 1.5h8.69l-4.554 4.553a.75.75 0 001.06 1.061L11 13.561v8.689a.75.75 0 001.5 0v-8.69l4.553 4.554a.75.75 0 001.061-1.06L13.561 12.5h8.689a.75.75 0 000-1.5h-8.69l4.554-4.553a.75.75 0 10-1.06-1.061L12.5 9.939V1.25z"></path></svg></span> <span>Arctic Code Vault Contributer</span></p>
  
    </div>
    
    </div>
    </div>
       `
 
   }
  

 }
 //toggle mobile menu
 const toggle = (e,hide,remove)=>{
  e.id === hide ?e.id= remove: e.id = hide;
 }
let c = document.querySelector("#toggle");
c.addEventListener('click',()=>{
  let a = document.querySelector(".form");
  let b = document.querySelector(".href");
toggle(a,"hide","remove")
toggle(b,"hide2","remove2")


});


window.addEventListener('scroll', ()=>{
  let circle =  document.querySelector("#circled")
  let menu =  document.querySelector("#menu");
 // let profile =  document.querySelector(".top");
  let nav =  document.querySelector("nav.tabs");
  if(window.scrollY >= "100"&& window.innerWidth>768){

    menu.style.position = "fixed";
    menu.style.top ="-30px";
    menu.style.opacity ="70";
    menu.style.background = "#fff";
    menu.style.width = "100%";
    nav.style.left = "30%";
    circle.style.display = "block";
   
  
}

else{
  menu.style={};
  circle.style.display = "none";
  nav.style.left = "0";

}

if(window.innerWidth<=768 && window.scrollY>=400){
  menu.style.position = "fixed";
    menu.style.top ="-30px";
    menu.style.opacity ="70";
    menu.style.background = "#fff";
    menu.style.width = "100%";

}
  

  
})




  createProfile()
  createDiv()



