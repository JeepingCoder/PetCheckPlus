
const addPetHandler = async (event) => {
  const newPetForm = document.querySelector('#addPetForm')
  newPetForm.classList.toggle('invisible');
}


// function to delete a pet
const delButtonHandler = async (event) => {
  console.log("i am deleting a pert")
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`api/pet/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log("I have deleted a pet")
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

// for loop that adds the event listener to each button
let deleteBtns = document.querySelectorAll('.delete-pet-btn')
for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener('click', delButtonHandler);
}

document
  .getElementById('add-pet-btn')
  .addEventListener('click', addPetHandler);




