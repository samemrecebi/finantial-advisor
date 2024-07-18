import Link from 'next/link';

const SignUpForm = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-dark text-white">{/*bg yi istersek değiştiririz sonradan img vs*/ }
      <div className="flex flex-row bg-gradient-to-r from-indigo-950 to-indigo-400 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="w-1/2 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="Fintech" className="w-[77px] h-[61px]" />
              <div>
                <div className="text-lg font-bold">Fintech</div>
                <div className="text-xs">Your finance assistant</div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          <form>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Username</label>
              <input type="text" className="block w-full p-2 rounded border text-black" placeholder="username" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="block w-full p-2 rounded border text-black" placeholder="user.name@example.com" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" className="block w-full p-2 rounded border text-black" placeholder="********" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input type="password" className="block w-full p-2 rounded border text-black" placeholder="********" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Sign Up</button>
          </form>
          <p className="text-center text-sm">
            Already have an account? <Link href="/signin" className="text-blue-400 hover:underline">Sign in</Link>
          </p>
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center items-center bg-white text-black rounded-r-lg">
          <h1 className="text-2xl font-bold mb-4">Hello!</h1>
          <p className="mb-4 text-sm text-center">Embark on a journey with our specialized financial assistant powered by OpenAI</p>
          <p className='mb-4 text-lg font-bold'>OR</p>
          <p className="mb-4 text-sm">Sign in with your Fintech account</p>
          <Link href="/signin" className="btn btn-lg btn-primary text-white font-bold py-2 px-4 rounded mb-4">Sign In</Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;
