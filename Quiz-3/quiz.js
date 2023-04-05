// function func(...args) {
//     return new Promise((resolve, reject) => {
//       if (args.length > 0) {
//         resolve(args);
//       } else {
//         reject("No arguments passed");
//       }
//     });
//   }

//   (async () => {
//     try {
//       const result = await func(1, 2, 3);
//       console.log(result); // [1, 2, 3]
//     } catch (error) {
//       console.log(error);
//     }
//   })();
  
//   (async () => {
//     try {
//       const result = await func("value", 15, {});
//       console.log(result); // ["value", 15, {}]
//     } catch (error) {
//       console.log(error);
//     }
//   })();
  
//   (async () => {
//     try {
//       const result = await func();
//       console.log(result); // throws "No arguments passed"
//     } catch (error) {
//       console.log(error);
//     }
//   })();


// const func1 = Promise.resolve(`func1`);
// const func2 = () => Promise.resolve(`func2`);
// const func3 = () => Promise.resolve(`func3`);

// const main = async () => {
//   const [result1, result2, result3] = await Promise.all([func1, func2(), func3()]);
//   const output = `${result1}, ${result2}, ${result3}`;
//   console.log(output);
// }

// main();

//============================================================================================

// data=[1,2,3]

// const main = async () => {

//     const data = await loadData();
    
    
    
//     console.log(data.length);
    
//     };
    
    
    
//     const length = main();
    
    
    
//     console.log(length);

//`================================================================================`

// const users = [
//     { username: `user1`, email: `user1@email.com` },
//     { username: `user2`, email: `user2@email.com` }
//   ];
  
//   const getUser = (username) => {
//     return new Promise((resolve) => {
//       const user = users.find(u => u.username === username);
//       resolve(user);
//     });
//   };
  
//   const getUsers = (userNames) => {
//     const promises = userNames.map(username => getUser(username));
//     return Promise.all(promises);
//   };
  
//   const main = async () => {
//     const userNames = [`user1`, `user2`];
//     const users = await getUsers(userNames);
//     console.log(users);
//   };
  
//   main();

//======================================================================

const func1 =Promise.resolve(`func1`);

const func2 = () => Promise.resolve(`func2`);

const func3 = () => Promise.resolve(`func3`);



const main = async () => {

 const [result1, result2, result3] = await Promise.all([func1, func2(), func3()]);

 const output = `${result1}, ${result2}, ${result3}`;

 console.log(output);

}



main();

