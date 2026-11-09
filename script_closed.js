const d = new Date();
let day = d.getDay();
console.log(day);
if(day == 0){
  window.location.href = 'https://gaffel.nu/closed';
}
