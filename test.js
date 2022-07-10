


const doctor1 = {
  name: 'Doctor1',
  places: [`123dupa`, `123kupa`,],
  status: 'pending'
}

const doctor2 = {
  name: `Doctor2`,
  places: [`jacek2`, `123dupa`],
  status: 'active'
}

const doctor3 = {
  name: `Doctor2`,
  places: [`jacek2`, `123dupa`],
  status: 'active'
}
const doctor4 = {
  name: `Doctor2`,
  places: [`jacek2`, `123dupa`],
  status: 'pending'
}
const doctor5 = {
  name: `Doctor2`,
  places: [`jacek2`, `123dupa`],
  status: 'active'
}

const doctors = [doctor1, doctor2, doctor3, doctor4, doctor5]


const pendings = [];
const actives = [];

for (let i = 0; i < doctors.length; i++){
  if (doctors[i].status === 'pending'){
    pendings.push('pending')
  } else if(doctors[i].status === 'active'){
    actives.push('active')
  }
};

console.log(`Liczba elementow o statusie pending: ${pendings.length}`)
console.log(`Liczba elementow o statusie active: ${actives.length}`)


