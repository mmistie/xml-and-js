
const xhr = (url, method='GET') => 
    new Promise((resolve)=> {
        const xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        displayData(this.responseXML);
    }
};
    xhttp.open("GET", "people.xml", true);
    xhttp.send();
});

const parsePerson=(person) =>{
    const firstName=person.getElementsByTagName('firstName')[0].childNodes[0].nodeValue;
    const lastName=person.getElementsByTagName('lastName')[0].childNodes[0].nodeValue;
    const email=person.getElementsByTagName('email')[0].childNodes[0].nodeValue;
    const gender=person.getElementsByTagName('gender')[0].childNodes[0].nodeValue;
    const ipaddress=person.getElementsByTagName('ipaddr')[0].childNodes[0].nodeValue;

    return {firstName, lastName, email, gender, ipaddress};
};

const createPerson=parsedPerson=>{
    const content=`
        <tr>
            <td>${parsedPerson.firstName} ${parsedPerson.lastName} </td>
            <td>${parsedPerson.email} </td>
        </tr>`;
return stringToNode(content);
}

function stringToNode(content){
    const template=document.createElement('template');
    const html=content.trim();
    template.innerHTML=html;
    return template.content.firstChild;
}
const displayData=(xmlDoc) => {
    const list=document.getElementById('table');
    const people=xmlDoc.getElementsByTagName('person');
    for(let index=0;index<people.length;index++)
    {
        const person=people[index];
        const parsedPerson=parsePerson(person);
        const personElement=createPerson(parsedPerson);
        list.appendChild(personElement);
    }
}
//using promise
xhr("people.xml").then(displayData);

//using fetch and promise
fetch('people.xml', {method:'GET'})
    .then((result)=> result.text())
    .then((data)=>new DOMParser().parseFromString(data, "text/xml"))
    .then(displayData);

//using async and fetch
const loadData = async () => {
    const response = await fetch("people.xml");
    const str = await response.text();
    const xmlData = new DOMParser().parseFromString(str, "text/xml");
    displayData(xmlData);
  };
  
  loadData();



  