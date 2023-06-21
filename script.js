//Global Variable.....
let btn = document.getElementsByClassName("btn")[0];
let info = document.getElementById("info");
let option = document.getElementById("option");
let selectmenu = document.querySelectorAll("select");
let img = document.getElementById("img")
let alarmtime, isalarmset;
let ringtone = new Audio("./download.ogg");

// Digital watch Section...
setInterval(function() {
  let t = new Date();
  let h = t.getHours();
  let m = t.getMinutes();
  let s = t.getSeconds();
  let ap = (h >= 12) ? "pm" : "am";
  if (h > 12) {
    h = h - 12;
  }
  if (h == 00) {
    h = "12";
  }
  if (h.toString().length == 1) {
    h = "0" + h;
  }
  if (m.toString().length == 1) {
    m = "0" + m;
  }
  if (s.toString().length == 1) {
    s = "0" + s;
  }
  document.getElementById("time").innerHTML = `${h} : ${m} : ${s}   ${ap}`;
  if (alarmtime === `${h}:${m} ${ap}`) {
    ringtone.play();
    ringtone.loop = true;
    img.classList.remove("float");
    img.classList.add("shake");
    info.innerHTML="Your alarm is ringing";
    btn.innerHTML="Stop Alarm";
  }
}, 1000)

// Set Alarm function....
const setalarm = () => {
  if (isalarmset) {
    alarmtime = "";
    ringtone.pause();
    img.classList.remove("shake");
    img.classList.add("float");
    selectmenu[0].disabled = false;
    selectmenu[1].disabled = false;
    selectmenu[2].disabled = false;
    btn.innerHTML = "Set Alarm";
    let a2 = document.createElement("div");
    a2.setAttribute("id", "alert");
    a2.innerHTML = "<b>Your alarm cancel successfully...</b>"
    let b2 = document.getElementsByClassName("container")[0];
    b2.append(a2);
    setTimeout(() => {
      a2.style.display = "none";
    }, 3000);
    info.innerHTML = `No alarm set till now`;
    return isalarmset = false;
  }
  let time = `${selectmenu[0].value}:${selectmenu[1].value} ${selectmenu[2].value}`;
  if (selectmenu[0].value == "hour" || selectmenu[1].value == "minute" || selectmenu[2].value == "ampm") {
    let a = document.createElement("div");
    a.setAttribute("id", "alert");
    a.innerHTML = "<b>Please Enter a valid time...</b>"
    let b = document.getElementsByClassName("container")[0];
    b.append(a);
    setTimeout(() => {
      a.style.display = "none";
    }, 3000);
  }
  else {
    alarmtime = time;
    isalarmset = true;
    info.innerHTML = `Your alarm is set on ${selectmenu[0].value}:${selectmenu[1].value} ${selectmenu[2].value}`;
    let a1 = document.createElement("div");
    a1.setAttribute("id", "alert");
    a1.innerHTML = "<b>Your alarm set successfully...</b>"
    let b1 = document.getElementsByClassName("container")[0];
    b1.append(a1);
    setTimeout(() => {
      a1.style.display = "none";
    }, 3000);
    selectmenu[0].value = "hour";
    selectmenu[1].value = "minute";
    selectmenu[2].value = "ampm";
    selectmenu[0].disabled = true;
    selectmenu[1].disabled = true;
    selectmenu[2].disabled = true;
    btn.innerHTML = `Clear Alarm`;
  }
}

// Button Work...
btn.addEventListener("click", setalarm);