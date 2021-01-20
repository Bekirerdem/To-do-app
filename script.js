// UI vars (UI Değişkenleri)
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

// load items (Öğeleri yükle)
loadItems();

// Call Event Listeners (Olay dinleyicilerini çağır)
eventListeners();

// Call Event Listeners (Olay dinleyicilerini çağır)
function eventListeners() {

  //   Submit event (Olay gönder)
    form.addEventListener("submit", addNewItem);

  //   Delete an item (Bir öğeyi sil)
    taskList.addEventListener("click", deleteItem);

  //   Delete All items (Tüm öğeleri sil)
    btnDeleteAll.addEventListener("click", deleteAllItems);

}

// load items (Öğeleri yükle)
function loadItems() {

    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item);
    })
    
}

// Get items from Local Storage (Yerel depodan öğeler al)
function getItemsFromLS() {

    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    return items;

}

// Set item to Local Storage (Öğeyi yerel depolamaya ayarla)
function setItemToLS(text) {

    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));

}

// delete item from LS (LS'den öğe sil)
function deleteItemFromLS(text) {

    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    });

    localStorage.setItem('items',JSON.stringify(items));

}

// create item (Öğe Oluştur)
function createItem(text) {

  //  Create Li (Oluşturmak)
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));
    
  //  Create A (Oluşturmak)
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';
    
  //   add a to li (li'ye ekle)
    li.appendChild(a);
    
  //  add li to ul (ul'e ekle)
    taskList.appendChild(li);
}

// Add new item (Yeni öğe ekle)
function addNewItem(e) {

    if (input.value === "") {
        alert("Yeni öğe ekle");
    }

  //   create item (Öğe oluştur)
    createItem(input.value);

  //   save to LS (LS ye kaydet)
    setItemToLS(input.value);

  //   clear input (Girişi temizle)
    input.value = "";

    e.preventDefault();

}

// Delete an item (bir öğeyi silin)
function deleteItem(e) {

    if (e.target.className === "fas fa-times") {
        if(confirm('Emin misiniz?')){
            e.target.parentElement.parentElement.remove();

            // delete item from LS (LS den öğe sil)
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    
    e.preventDefault();

}

// Delete All items (Tüm öğeleri silin)
function deleteAllItems(e) {

    if (confirm("Emin misiniz?")) {

         taskList.innerHTML='';

        while(taskList.firstChild){
            taskList.removeChild
            (taskList.firstChild);
        }

        localStorage.clear();

    }

    e.preventDefault();

}