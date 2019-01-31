// /* eslint-disable no-mixed-spaces-and-tabs */
// import React from 'react';

// const AddUserForm = (props) => {
//   const initialFormState = { id: null, userName: '', points: 10 };
//   const [ecouser, setUser] = useState(initialFormState);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setUser({ ...ecouser, [name]: value });
//   };

//   return (
// 		<form
// 			onSubmit={(event) => {
// 			  event.preventDefault();
// 			  if (!ecouser.userName || !ecouser.userName) return;

// 			  props.addUser(ecouser);
// 			  setUser(initialFormState);
// 			}}
// 		>
// 			<label>Name</label>
// 			<input type="text" name="name" value={ecouser.userName} onChange={handleInputChange} />
// 			<label>Username</label>
// 			<input type="text" name="username" value={ecouser.points} onChange={handleInputChange} />
// 			<button>Add new user</button>
// 		</form>
//   );
// };

// export default AddUserForm;
