//basic declaration
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const repos = document.querySelector("#repositories");
const profile = document.querySelector("#profile");
const img = document.querySelector("#img");
const DURATION_IN_SECONDS = {
mdhms: [ 'month', 'day', 'hour', 'minute'],
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60
};


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
const createDiv = (data)=>{
  let div;
const repositories = data.data.viewer.repositories;
 const { nodes } = repositories;
 nodes.map((repo)=>{
  div =  document.createElement("div");
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
  div.innerHTML = `<div class="col-1">
  <h2>${repo.name}</h2>
 ${repo.description !== null? document.createElement('p').textContent= repo.description:""}
 <div>
 <div>
 <span class=${colour}></span>
${repo.primaryLanguage !== null? document.createElement('div').textContent= repo.primaryLanguage.name:""}</div>
${repo.stargazerCount > 0? document.createElement('span').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg> ' +repo.stargazerCount:""}
${repo.forkCount > 0 ?document.createElement("span").innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"></path></svg>'+repo.forkCount:""}
<div>${timeSince(repo.updatedAt)}</div>
  </div>
  </div>
  <div class="col-2>
  </div>
 `
 
repos.appendChild(div)
 });
 
}
/* dynamic redering of profile div */
const  createProfile = (data)=>{
 const  viewer =  data.data.viewer;

    const {avatarUrl,name,login,bio,followers:{totalCount}, following:{totalCount:fTotalCount}, location, email,twitterUsername ,stargazerCount} =  viewer
   if(viewer){
img.attributes.src.nodeValue = avatarUrl
      profile.innerHTML = `
      <div>
      <div class="top">
        <img src=${avatarUrl} alt="" srcset="">
       <h2>${name}</h2>
        <p>${login}</p>
      </div>
      <p>${bio}</p>
      <div><button>Edit Profile</button></div>
    
    <div><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg></span>${totalCount}<span>followers</span><span>${fTotalCount}</span><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>${stargazerCount}</span></div>
    <div> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg></span><span>${location}</span></div>
    <div> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path></svg></span><a href="">${email}</a</div>
    <div> <span></span><a href="">${twitterUsername}</a></div>
    </div> 
      `
 
   }
  

}


// this will fetch the api , here serving from a json file
function returnData(repo,func){
  fetch(repo)
  .then(response => response.json())
  .then(data =>func(data));
}

//fetch data 
  returnData('api/repositories.json',createDiv)
 returnData('api/profile.json', createProfile )