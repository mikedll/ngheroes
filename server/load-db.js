
const Hero = require('./models/hero')

const heroes = [
  { name: 'Mr. Nice' },
  { name: 'Narco' },
  { name: 'Bombasto' },
  { name: 'Celeritas' },
  { name: 'Magneta' },
  { name: 'RubberMan' },
  { name: 'Dynama' },
  { name: 'Dr IQ' },
  { name: 'Magma' },
  { name: 'Tornado' }      
];

heroes.forEach(params => {
  const newHero = new Hero(params);
  newHero.save().then(hero => console.log(`Saved ${hero.name}`))
})
