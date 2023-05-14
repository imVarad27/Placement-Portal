// const fs = require("fs").promises;

// async function readLinesFromFile() {
//   const data = await fs.readFile("test.txt", "utf8");
//   const lines = data.split("\n");
//   return lines;
// }

// (async () => {
//   const arr = await readLinesFromFile();
//   for (let i = 0; i < arr.length; i++) {
//     const stu = arr[i];
//     const studentName = stu.split(" ");
//     const firstName = studentName[1];
//     const lastName = studentName[0];
//     console.log(firstName, lastName);
//     let url = ``;
//     if (firstName === undefined) {
//       url = `https://api.dicebear.com/6.x/initials/svg?seed=${lastName}}`;
//     }
//     if (lastName === undefined) {
//       url = `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}}`;
//     } else {
//       url = `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}+${lastName}}`;
//     }
//     try {
//       await fs.appendFile("images.txt", url + "\n");
//     } catch (err) {
//       console.log(err);
//     }
//   }
// })();

// generate random numbers from 70 to 90 172 mnumbers and write it into test.txt
const fs = require("fs").promises;
let arr = [];

for (let i = 0; i < 172; i++) {
  let num = Math.floor(Math.random() * (95 - 70 + 1) + 70);
  arr.push(num);
}
// console.log(arr);
(async () => {
  for (let i = 0; i < arr.length; i++) {
    try {
      await fs.appendFile("test.txt", arr[i] + "\n");
    } catch (err) {
      console.log(err);
    }
  }
})();
