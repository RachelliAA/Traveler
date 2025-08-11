  export const addUser=async(id, name, phone_number, email, password, is_admin)=> {
    const response=await fetch('http://localhost:3000/user', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:id,
        name:name,
        phone_number:phone_number,
        email:email,
        password:password,
        is_admin:is_admin
      })
    })
    if (!response.ok) {
      throw new Error('Failed to add user');
    }

    return response.json();
  }
  export const getAllUsers=async()=> {
    const response=await fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
  }
