
//inputs
var siteName= document.getElementById("siteName");
var siteUrl=document.getElementById("siteUrl");
var submit= document.getElementById("submitBtn");
var tableBody=document.getElementById("table-body");
var bookmarks;
var closeBtn = document.getElementById("closeBtn");
var boxModal=document.getElementById("box-info");
//showing all data stored in local storage
 if(localStorage.getItem('bookmarksList')!==null){
    bookmarks=JSON.parse(localStorage.getItem('bookmarksList'));
    displayBookmark();
 }
 else{
    bookmarks=[];
 }
 // add bookmark function and click event for the button to add 
 submit.addEventListener("click", addBookmark);

function addBookmark(){
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    var bookmark = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
      };
      bookmarks.push(bookmark);
      localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
      console.log(bookmarks); 
      displayBookmark();
      clearInput();
      siteName.classList.remove("is-valid");
      siteUrl.classList.remove("is-valid");
    }
    else{
      boxModal.classList.remove("d-none");
    }
}  
// Display Function and adding click event to visit and delete buttons
function displayBookmark(){
    var newBookmark='';
    for(var indexOfWebsite=0; indexOfWebsite <bookmarks.length;indexOfWebsite+=1){
     newBookmark += `
    <tr>
      <td >${indexOfWebsite + 1}</td>
      <td class="text-capitalize">${bookmarks[indexOfWebsite].siteName}</td>              
      <td>
        <button id="visitBtn" class="btn  btn-visit" data-index="${indexOfWebsite}">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button  id="deleteBtn" class="btn btn-danger pe-2" data-index="${indexOfWebsite}" >
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
  </tr>
  `;
    }
tableBody.innerHTML = newBookmark;
 //click event for delete
var deleteBtns = document.querySelectorAll(".btn-danger");
if (deleteBtns) {
  for (var j = 0; j < deleteBtns.length; j++) {
 
    deleteBtns[j].addEventListener("click", function (e) {
      deleteBookmark(e);
    });
  }
}
//click event for visit
visitBtns = document.querySelectorAll(".btn-visit");
if (visitBtns) {
  for (var i = 0; i < visitBtns.length; i++) {
    visitBtns[i].addEventListener("click", function (e) {
      visitBookmark(e);
    });
  }
}
}
//clear function
function clearInput(){
        siteName.value="";
        siteUrl.value="";
}


//delete function
function deleteBookmark(e) {

  tableBody.innerHTML = "";
  var indexOfWebsite = e.target.dataset.index;
  
    bookmarks.splice(indexOfWebsite, 1);
  
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarks));
    displayBookmark();

  
  }
//visit function
function visitBookmark( e){
    var indexOfWebsite = e.target.dataset.index;
  
    if (bookmarks[indexOfWebsite] && bookmarks[indexOfWebsite].siteUrl) {
        console.log('URL:',bookmarks[indexOfWebsite].siteUrl);
        var httpsRegex = /^https?:\/\//;
        if (httpsRegex.test(bookmarks[indexOfWebsite].siteUrl)) {
            open(bookmarks[indexOfWebsite].siteUrl);
        } else {
            open(`https://${bookmarks[indexOfWebsite].siteUrl}`);
        }
    }}

  //Making sure that user enter the correct data

    var nameRegex = /^\w{3,}(\s+\w+)*$/;
    var urlRegex = /^(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+)+(:\d{2,5})?(\/[\w-]*)*(\?[\w-=&]*)?(#[\w-]*)?$/;

    siteName.addEventListener("input", function () {
      validate(siteName, nameRegex);
    });
    
    siteUrl.addEventListener("input", function () {
      validate(siteUrl, urlRegex);
    });
// validate function
    function validate(e, regex ){
     
      if (regex.test(e.value)){
        e.classList.add("is-valid");
        e.classList.remove("is-invalid")
      }
      else{
        e.classList.add("is-invalid");
        e.classList.remove("is-valid")
      }

    }
//close modal function
    function closeModal() {
      boxModal.classList.add("d-none");
    }
   
// close with close button,esc,clicking outsite the modal   
    closeBtn.addEventListener("click", closeModal);
    
    document.addEventListener("keydown", function (e) {
      if (e.key == "Escape") {
        closeModal();
      }
    });
    
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("box-info")) {
        closeModal();
      }
    });
  