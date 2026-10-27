const input=document.getElementById("input");
const addBtn=document.getElementById("addBtn")
const todoList=document.querySelector(".myList");
const mainContainer=document.querySelector(".mainContainer");


// this is to get  data from local storage  for every loding  of the page
let myTodoList = JSON.parse(
    localStorage.getItem("myTodoList") || "[]"
);

// function to delete list items
const deleteButton=(event )=>{
   
 
   
  const filteredItems = myTodoList.filter(( item)=>{
      console.log(typeof(item))
    console.log((event.target.parentElement.children[1].innerText))
return item !== event.target.parentElement.children[1].innerText;
  })
console.log(filteredItems)
 event.target.parentElement.remove() 
  myTodoList=filteredItems 
   localStorage.setItem("myTodoList",JSON.stringify(filteredItems));
 
}

// function to handle the checkbox
const handleCheckBox=(event)=>{
   if (event.target.classList.contains("check")){
        // todoLi.classList.toggle("check")

        const checkItem=event.target.nextElementSibling;
     
       checkItem.classList.toggle("check");

}
}

addBtn.addEventListener("click",(e)=>{
    const inputValue=input.value;
    // e.preventDefault();

  


   if (input.value.trim() === ""){
   return
   }
   else{
//   this creates a list item 
    const todoLi = document.createElement("li");
    
// with the help of a backtick we can add html code inside  the list item in our javascript file.
    todoLi.innerHTML=`
     <input type="checkbox" class="check" onClick="handleCheckBox(event)">
                    <span >  ${inputValue}</span>
                   
                    <button onClick="deleteButton(event)">Delete</button>
    `

//    with the help of appendChild method we can add the List item to the unordered list in our html file.

   todoList.appendChild(todoLi);
    input.value="";
    // here we are pushing the input value to the myTodoList array .
   myTodoList.push(inputValue);


//    this line of code is used to save the array named myTodoliist to the local storage of the browswer in the form of a string using JSON.stringyfy() method.
   localStorage.setItem("myTodoList",JSON.stringify(myTodoList));


    
  

   }

})


// here we are getting the data from the local storage and parsing it to an array using JSON.parse()method and if there is no data in the localstorage then we are returning an empty array using the logical or (||)operator
const storedInput= JSON.parse(localStorage.getItem("myTodoList" ) || "[]");
//  creating a array of List items using the  array Map method 
const myNewTodo= storedInput.map((item)=>{
const listItem=document.createElement("li");
     listItem.innerHTML= `
      <input type="checkbox" class="check"onClick="handleCheckBox(event)"> 
     <span> ${item}</span>
     <button class="deleteBtn" onClick="deleteButton(event)">Delete</button>
     `
return listItem

})

// to display each list in the todoList we are using the forEach method to loop through the mynewTodo array  and append each of them inthe todoList using appendChild method
// also We use map() to create a new array of HTML elements, and forEach() to perform an action on each element— in this case, displaying it on the page.
 
myNewTodo.forEach((item)=>{
    todoList.appendChild(item);
})
