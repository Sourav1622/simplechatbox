const socket = io();
let name;
let messageArea = document.querySelector(".message_area");
let textArea = document.querySelector("#textarea");

do{
    name= prompt("Please enter your name");
}while(!name)
 textArea.addEventListener('keyup',(e)=>{
     if(e.key ==='Enter'){
         sendMessage(e.target.value);
         e.target.value=""
     }
     
 })

 function sendMessage(message){
     let msg={
         user:name,
         message:message.trim()
     }
     //append
     appendMessage(msg,'outgoing')
     //send to server
     socket.emit('message',msg);
     scrollToBottom();
 }

 function appendMessage(msg,type){
     let mainDiv = document.createElement('div');
     let ClassName = type;
     mainDiv.classList.add(ClassName,'message');
     let markup = `
                <h4>${msg.user}</h4>
                <p>${msg.message}</h4>
     `
     mainDiv.innerHTML = markup;
     messageArea.appendChild(mainDiv);
 }

 //get msg from server
 socket.on('message',(msg)=>{
     appendMessage(msg,'incoming');
     scrollToBottom();
 })
 function scrollToBottom(){
     messageArea.scrollTop = messageArea.scrollHeight;
 }