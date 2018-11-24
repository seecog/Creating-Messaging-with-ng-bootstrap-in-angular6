

export class MessageService{
    message : string;
    messageClass : string;

success(data){
this.message = data;
this.messageClass = "success";
}

error(data){
    this.message = data;
    this.messageClass = "danger";
}

warning(data){
    this.message = data;
    this.messageClass = "warning";
}

}