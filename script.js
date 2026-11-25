const button=document.getElementById('addbtn');

const textField=document.getElementById('text');

const filter=document.getElementById('filter');

const lists=document.querySelector('.lists');


const clearButton=document.getElementById('clear');

clearButton.addEventListener('click',e=>{

    lists.innerHTML='';
})

displayItems();



function checkUI(){

    const allItems = lists.querySelectorAll('li');

    if(allItems.length === 0){

        filter.style.display = 'none';
        clearButton.style.display='none';

    } else {

        filter.style.display = 'flex';
        clearButton.style.display='flex';

    }

  

}




function filtering(e){

    const text=e.target.value.toLowerCase();

    console.log(text);

    const allItems=lists.querySelectorAll('li');

    allItems.forEach(item=>{

        if(item.textContent.includes(text)){


item.style.display='block';

        }else{

            item.style.display='none';
        }
    })


}



filter.addEventListener('input',filtering);

function displayItems(){

    const items=getItemsFromLocalStorage();

    items.forEach(item=>{

        const li=document.createElement('li');

        li.innerHTML = `<span>${item}</span><button class="delete">delete</button>`;

        lists.appendChild(li);

        checkUI();

        const deleteBtn=li.querySelector('.delete');

        deleteBtn.addEventListener('click',()=>{

            if(confirm('are you sure?')){

                li.remove();

                addToLocalStorage();

              checkUI();

            }

        });

    })



}


function addSomething(){

    const newItem = textField.value;

    if(newItem === ''){
        alert('please type something');
        return;

    } else {

        const li = document.createElement('li');

        li.innerHTML = `<span>${newItem}</span><button class="delete">delete</button>`;
        lists.appendChild(li);

        const deleteBtn = li.querySelector('.delete');

        deleteBtn.addEventListener('click', e => {
            if(confirm('are you sure?')){

            e.target.parentElement.remove();

            addToLocalStorage();

            checkUI();}

        });

        textField.value = '';

        addToLocalStorage();

        checkUI();

    }

}






function addToLocalStorage(){

    const allItems=lists.querySelectorAll('li');

    const itemArr=[...allItems].map(item=>
        item.querySelector('span').textContent
    );

    localStorage.setItem('allItems',JSON.stringify(itemArr));

}


    function getItemsFromLocalStorage(){


let getItems;

if(localStorage.getItem('allItems')===null){


getItems=[];

}else{

getItems=JSON.parse(localStorage.getItem('allItems'));



}

return getItems;


    }





button.addEventListener('click',addSomething);