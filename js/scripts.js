// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, workEmail, personalEmail, workAddress, personalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address = {};
  this.address.workEmail = workEmail;
  this.address.personalEmail = personalEmail;
  this.address.workAddress = workAddress;
  this.address.personalAddress = personalAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  if(contact.firstName === ""){
    $("#first-name").remove();
  }
  if(contact.lastName === ""){
    $("#last-name").remove();
  }
  if(contact.phoneNumber === ""){
    $("#phone-number").remove();
  }
  if(contact.address.workEmail === ""){
    $("#work-email").remove();
  }
  if(contact.address.personalEmail === ""){
    $("#personal-email").remove();
  }
  if(contact.address.workAddress === ""){
    $("#work-address").remove();
  }
  if(contact.address.personalAddress === ""){
    $("#personal-address").remove();
  }
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".work-email").html(contact.address.workEmail);
  $(".personal-email").html(contact.address.personalEmail);
  $(".work-address").html(contact.address.workAddress);
  $(".personal-address").html(contact.address.personalAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedWorkEmail = $("input#new-work-email").val();
    const inputtedPersonalEmail = $("input#new-personal-email").val();
    const inputtedWorkAddress = $("input#new-work-address").val();
    const inputtedPersonalAddress = $("input#new-personal-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-work-email").val("");
    $("input#new-personal-email").val("");
    $("input#new-work-address").val("");
    $("input#new-personal-address").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedWorkEmail, inputtedPersonalEmail, inputtedWorkAddress, inputtedPersonalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});