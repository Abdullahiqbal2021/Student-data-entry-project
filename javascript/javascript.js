let form = document.getElementById("form");
let submit = document.getElementById("submit");

function getAndUpdate() {
  console.log("updating list...")
  let title = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let mobile = document.getElementById("mobile").value;
  let marks = document.getElementById("marks").value;

  if (title !== "" && email !== "" && mobile !== "" && marks !== "") {
    if (mobile.length < 12) {

      if (localStorage.getItem('dataEntry') == null) {
        dataEntryArray = [];
        dataEntryArray.push([title, email, mobile, marks])
        localStorage.setItem("dataEntry", JSON.stringify(dataEntryArray));

      } else {
        dataEntryArraystr = localStorage.getItem('dataEntry');
        dataEntryArray = JSON.parse(dataEntryArraystr);
        dataEntryArray.push([title, email, mobile, marks])
        localStorage.setItem("dataEntry", JSON.stringify(dataEntryArray));
        update()

      }
    } else {
      alert("Mobile no not valid")
    }
  } else {
    alert("Some field is empty")
    update()
  }
  update()
}

function update() {
  if (localStorage.getItem('dataEntry') == null) {
    dataEntryArray = [];

  } else {
    dataEntryArraystr = localStorage.getItem('dataEntry');
    dataEntryArray = JSON.parse(dataEntryArraystr);
  }

  // Populate the table
  tablebody = document.getElementById("tablebody");
  let str = "";
  dataEntryArray.forEach((element, index) => {
    str += `
  <tr>
      <th class="th" scope="row">${index + 1}</th>
      <td class="td"><p class="text-truncate">${element[0]}</p></td>
      <td class="td"><p class="text-truncate">${element[1]}</p></td>
      <td class="td"><p class="text-truncate">${element[2]}</p></td>
      <td class="td"><p class="text-truncate">${element[3]}</p></td>
  
      <td><button class="btn btn-outline-danger" onclick="deleted(${index})">Delete</button></td>
    </tr>`;

  });
  tablebody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener('click', getAndUpdate);
update();
function deleted(itemindex) {
  console.log('Delete', itemindex);

  dataEntryArraystr = localStorage.getItem('dataEntry');
  dataEntryArray = JSON.parse(dataEntryArraystr)
  dataEntryArray.splice(itemindex, 1);
  localStorage.setItem('dataEntry', JSON.stringify(dataEntryArray));
  update();
}
let clear = document.getElementById("clear")
clear.addEventListener("click", () => {
  if (confirm("Do you really want to clear the list.You will lost all the data")) {
    localStorage.clear();
    update();
  }
})

function tableSearch() {
  // Initializing variables
  let input = document.getElementById("search-input");
  let filter = input.value.toUpperCase();
  let table = document.getElementById("myTable")
  let tr = document.getElementsByTagName("tr")

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      let textValue = td.textContent || td.innerText;
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        console.log();
        tr[i].style.display = ""
      } else {
        tr[i].style.display = "none";
      }
    }
  }

}