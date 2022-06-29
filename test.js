


const doctor1 = {
  name: 'Doctor1',
  places: [`123dupa`, `123kupa`,]
}

const doctor2 = {
  name: `Doctor2`,
  places: [`jacek2`, `123dupa`]
}


const doctors = [doctor1, doctor2]

const checkPlaces = (value) => {
  if (value === `123dupa`) {
    console.log(`w if: ${value}`)
  }
  return value === `123dupa`
}

const forEach = doctors.forEach(doctor => {
  console.log(doctor.places.filter(checkPlaces))
})
