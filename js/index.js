//Add note

let formContainer = document.querySelector('#container');
let noInput = document.querySelector('#noInputText');
let noteInput = document.getElementById('note');
const deleteBtn = document.getElementsByClassName('delete-all')[0]

noteInput.addEventListener('click', function () {
  noteInput.classList.remove('show');
});

window.onload = function() {
	window.setInterval(function(){

		let Data = new Date();

		let hours = Data.getHours();
		let minutes = Data.getMinutes();
		let seconds = Data.getSeconds();
    let year = Data.getFullYear();
    let month = Data.getMonth();
    let day = Data.getDate();

    switch (month)
    {
      case 0: fMonth="January"; break;
      case 1: fMonth="February"; break;
      case 2: fMonth="March"; break;
      case 3: fMonth="April"; break;
      case 4: fMonth="May"; break;
      case 5: fMonth="June"; break;
      case 6: fMonth="July"; break;
      case 7: fMonth="August"; break;
      case 8: fMonth="September"; break;
      case 9: fMonth="October"; break;
      case 10: fMonth="November"; break;
      case 11: fMonth="December"; break;
    }

		if (hours < 10)
			hours = "0" + hours;	
		
		if (minutes < 10)
			minutes = "0" + minutes;	

		if (seconds < 10) 
			seconds = "0" + seconds;
	
		let dateTime = `Today: ${day} ${fMonth} ${year} <br> ${hours}:${minutes}:${seconds}`;

		document.getElementById("dateBox").innerHTML = dateTime;
	},100);
}

formContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  let noteobj = [];
  let addtxt = document.getElementById('note');
  let notes = localStorage.getItem('notes');

  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(localStorage.getItem('notes'));
  }

  if (addtxt.value != '') {
    noteobj.push(addtxt.value);
    showmsg('Your Note has been added successfully.');
  } else {
    // noInput.classList.add("show");
    showmsg('Please write something for your note before adding it ...');
  }

  localStorage.setItem('notes', JSON.stringify(noteobj));
  noteInput.value = '';

  showNotes();
});
deleteBtn.addEventListener('click', () => {
  const notes = localStorage.getItem("notes");
  if (notes === null) {
    showmsg("No notes to delete");
    return;
  }
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete all notes!'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("notes");
      showmsg('All notes deleted successfully.');
      document.getElementById('mainbox').innerHTML = "";
    }
  })
})


function showNotes() {
  let notesobj = JSON.parse(localStorage.getItem('notes'));

  if (notesobj == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(localStorage.getItem('notes'));
  }

  let html = '';
  notesobj.forEach(function (element, index) {
    html += `
      <div class="box" id="box-${index}" >
        <h5>NOTE :${index + 1}</h5>
        <div class="swappable">
          <p id=myInput-${index}>${element}</p> 
        </div>
        <button class=copy  onclick=copyText(${index})>Copy</button>
        <button class=edit onclick=edit(${index})>Edit</button>
        <button id=delete onclick=deleted(${index})>Delete note</button> 
      </div>
    `;
  });

  let box = document.getElementById('mainbox');
  box.innerHTML = html;
}
function deleted(index) {
  let notes = localStorage.getItem('notes');

  if (notes == null) {
    noteobj = [];
  } else {
    noteobj = JSON.parse(localStorage.getItem('notes'));
  }
  noteobj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(noteobj));
  showNotes();
  showmsg('Note deleted successfully.');
}
function edit(index) {
  // edits the value to the value in text area
  let notes = localStorage.getItem('notes');
  const noteElement = document.getElementById(`box-${index}`);
  const swappableElement = noteElement.getElementsByClassName('swappable')[0];
  const editButton = noteElement.getElementsByClassName('edit')[0];

  if (editButton.innerHTML == 'Edit') {
    swappableElement.innerHTML = `
      <div id="notebox">
        <input type="text" id="note" value="${
          noteElement.getElementsByTagName('p')[0].innerHTML
        }" style="width:${noteElement.getElementsByTagName('p')[0].clientWidth + "px"}"/>
      </div>
    `;
    editButton.innerHTML = 'Save';
    showmsg('Note in Edit Mode.');
  } else {
    if (notes == null) {
      noteobj = [];
    } else {
      noteobj = JSON.parse(localStorage.getItem('notes'));
    }
    noteobj[index] = noteElement.getElementsByTagName('input')[0].value;
    localStorage.setItem('notes', JSON.stringify(noteobj));
    showNotes();
    showmsg('Note updated successfully.');
  }
}

function copyText(index) {
  let noteobj = JSON.parse(localStorage.getItem('notes'));
  let noteToCopy = noteobj[index];
  navigator.clipboard.writeText(noteToCopy);
  showmsg("Copied the note: " + noteToCopy);
}


let searchtext = document.getElementById('searching');
searchtext.addEventListener("input", function(){
   let inputvalue = searchtext.value.toLowerCase();
   let notecard = document.getElementsByClassName('box');
   Array.from(notecard).forEach(function(element){
    let cardtext = element.getElementsByTagName('div')[0].getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardtext.includes(inputvalue)) {
      element.style.display = "inline-block";
    }  
    else{
      element.style.display = "none";
    }
   })
 })
