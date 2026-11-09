const d = new Date();
let day = d.getDay();
console.log(day);
if(day == 5){
  window.location.href = 'https://gaffel.nu/closed';
}
