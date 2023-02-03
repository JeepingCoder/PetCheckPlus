const updateProfileHandler = async (event) => {
  event.preventDefault();
  console.log("test")
  const name = document.querySelector('#updated-name').value.trim();
  const email = document.querySelector('#updated-email').value.trim();
  const password = document.querySelector('#updated-password').value.trim();
  const phoneNumber = document.querySelector('#updated-phone-number').value.trim();
  const id = document.querySelector('#update-profile-btn').dataset?.id
  console.log(id)
  if (id) {
            const response = await fetch(`/user/update/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, email, password, phoneNumber }),
                headers: { 'Content-Type': 'application/json' },
            });


    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update profile');
    }
  }
};

document
  .querySelector('#update-profile-btn')
  .addEventListener('click', updateProfileHandler);

