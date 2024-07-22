const Inputs = () => {
    return (
      <div className="flex flex-col">
        <label htmlFor="first_name" className="mb-2 font-bold">First Name</label>
        <input type="text" id="first_name" name="first_name" className="p-2 mb-4 border border-gray-300 rounded" />
  
        <label htmlFor="last_name" className="mb-2 font-bold">Last Name</label>
        <input type="text" id="last_name" name="last_name" className="p-2 mb-4 border border-gray-300 rounded" />
  
        <label htmlFor="email" className="mb-2 font-bold">Email</label>
        <input type="email" id="email" name="email" className="p-2 mb-4 border border-gray-300 rounded" />
  
        <label htmlFor="password" className="mb-2 font-bold">Password</label>
        <input type="password" id="password" name="password" className="p-2 mb-4 border border-gray-300 rounded" />
      </div>
    );
  };
  
  export default Inputs;
  