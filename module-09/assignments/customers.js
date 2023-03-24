const xhr = (url, method='GET') => 
    new Promise((resolve)=> {
        const xhttp= new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        displayData(this.responseXML);
    }
};
xhttp.open("GET", "customers.xml", true);
xhttp.send();
    });

const parseCustomer = (customer) => {
    const custID = customer.getAttribute('custID');
    const tname = customer.getElementsByTagName('name')[0].getAttribute('title');
    const name = customer.getElementsByTagName('name')[0].childNodes[0].nodeValue;
    const addr = customer.getElementsByTagName('address')[0].childNodes[0].nodeValue;
    const pnum = customer.getElementsByTagName('phone')[0].childNodes[0].nodeValue;
    const email = customer.getElementsByTagName('email')[0] ?
                  customer.getElementsByTagName('email')[0].childNodes[0].nodeValue : ' - ';
    const oID=customer.getElementsByTagName('order')[0].getAttribute('orderID');
    const oDate=customer.getElementsByTagName('orderDate')[0].childNodes[0].nodeValue;
    const itemPrice=customer.getElementsByTagName('itemPrice')[0].childNodes[0].nodeValue;
    const iqty=customer.getElementsByTagName('itemQty')[0].childNodes[0].nodeValue;

    return { custID, tname, name, addr, pnum, email, oID, oDate, itemPrice, iqty };
};

const createCustomer = parsedCustomer => {
    const content = `
        <tr>
            <td>${parsedCustomer.custID}</td>
            <td>${parsedCustomer.tname} ${parsedCustomer.name}</td>
            <td>${parsedCustomer.addr}</td>
            <td>${parsedCustomer.pnum}</td>
            <td>${parsedCustomer.email}</td>
            <td>${parsedCustomer.oID}</td>
            <td>${parsedCustomer.oDate}</td>
            <td>${parsedCustomer.itemPrice}</td>
            <td>${parsedCustomer.iqty}</td>
        </tr>`;

    return content;
}


const displayData = (xmlDoc) => {
    const list = document.getElementById('table');
    const c = Array.from(xmlDoc.getElementsByTagName('customer'));
    
      for (let index = 0; index < c.length; index++) {
        const customer = c[index];
        const parsedCustomer = parseCustomer(customer);
        const customerElement = createCustomer(parsedCustomer);
        list.innerHTML+=customerElement;
}
}

//using promise
xhr("customers.xml").then(displayData);

//using fetch and promise
fetch('customers.xml', {method:'GET'})
    .then((result)=> result.text())
    .then((data)=>new DOMParser().parseFromString(data, "text/xml"))
    .then(displayData);

//using async and fetch
const loadData = async () => {
    const response = await fetch("customers.xml");
    const str = await response.text();
    const xmlData = new DOMParser().parseFromString(str, "text/xml");
    displayData(xmlData);
  };
  
  loadData();