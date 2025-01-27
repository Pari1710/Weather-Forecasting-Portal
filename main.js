/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE 
COUNTRY CODE (e.g. athens,gr)*/ 
const form = document.querySelector(".top-banner form"); 
const input = document.querySelector(".top-banner input"); 
const msg = document.querySelector(".top-banner .msg"); 
const list = document.querySelector(".ajax-section .cities"); 
 
const apiKey = "0689f4a45efee7e365572738d2807365"; 
 
form.addEventListener("submit", e =>  
{ 
  e.preventDefault(); 
  let inputVal = input.value; 
 
  const listItems = list.querySelectorAll(".ajax-section .city"); 
  const listItemsArray = Array.from(listItems); 
 
  if (listItemsArray.length > 0)  
  { 
    const filteredArray = listItemsArray.filter(el => 
       { 
      let content = ""; 
      if (inputVal.includes(","))  
      { 
        if (inputVal.split(",")[1].length > 2)  
        { 
          inputVal = inputVal.split(",")[0]; 
          content = el 
            .querySelector(".city-name span") 
            .textContent.toLowerCase(); 
        } else  
        { 
          content = el.querySelector(".city-name").dataset.name.toLowerCase(); 
        } 
      }  
      else  
      { 
        content = el.querySelector(".city-name span").textContent.toLowerCase(); 
      } 
      return content == inputVal.toLowerCase(); 
    }); 
 
    if (filteredArray.length > 0)  
    { 
      msg.textContent = `You already know the weather for ${ 
        filteredArray[0].querySelector(".city-name span").textContent 
      } ...otherwise be more specific by providing the country code as well 😉`; 
      form.reset(); 
      input.focus(); 
      return; 
    } 
  } 
 
  const url = 
`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metri
 c`; 
 
  fetch(url) 
    .then(response => response.json()) 
    .then(data =>  
      { 
      const { main, name, sys, weather } = data; 
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${ 
        weather[0]["icon"] 
      }.svg`; 
 
      const li = document.createElement("li"); 
      li.classList.add("city"); 
      const markup = ` 
        <h2 class="city-name" data-name="${name},${sys.country}"> 
          <span>${name}</span> 
          <sup>${sys.country}</sup> 
        </h2> 
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div> 
        <figure> 
          <img class="city-icon" src="${icon}" alt="${ 
        weather[0]["description"] 
      }"> 
          <figcaption>${weather[0]["description"]}</figcaption> 
        </figure> 
      `; 
      li.innerHTML = markup; 
      list.appendChild(li); 
    }) 
    .catch(() =>  
    { 
      msg.textContent = "Please search for a valid city 😩"; 
    }); 
 
  msg.textContent = ""; 
  form.reset(); 
  input.focus(); 
}); 
function showTime(){ 
  var date = new Date(); 
  var h = date.getHours(); // 0 - 23 
  var m = date.getMinutes(); // 0 - 59 
  var s = date.getSeconds(); // 0 - 59 
  var session = "AM"; 
   
  if(h == 0){ 
      h = 12; 
  } 
   
  if(h > 12){ 
      h = h - 12; 
      session = "PM"; 
  } 
   
  h = (h < 10) ? "0" + h : h; 
  m = (m < 10) ? "0" + m : m; 
  s = (s < 10) ? "0" + s : s; 
   
  var time = h + ":" + m + ":" + s + " " + session; 
  document.getElementById("MyClockDisplay").innerText = time; 
  document.getElementById("MyClockDisplay").textContent = time; 
   
  setTimeout(showTime, 1000); 
   
} 
 
showTime(); 
