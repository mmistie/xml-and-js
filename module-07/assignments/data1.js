const data1 = [
  { born: 1870, died: 1924 },
  { born: 1893, died: 1976 },
  { born: 1869, died: 1948 },
  { born: 1901, died: 1989 },
];

const parsed=data1.map((data1)=>
({
    Age: data1.died-data1.born
})
);

console.log(parsed);
console.log('----------------------------------------')
const filtered=parsed.filter(data1=>data1.Age>75);
console.log(filtered);
console.log('----------------------------------------')
const oldest=filtered.reduce((acc, data1)=>
{
    if(!acc || data1.Age > acc.Age)
    {
        return data1.Age;
    } else{
        return acc.Age;
    }
}, null);
console.log("oldest:" +oldest);