import Link from 'next/link';

const SignInForm = () => {
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
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <form>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="block w-full p-2 rounded border text-black" placeholder="user.name@example.com" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" className="block w-full p-2 rounded border text-black" placeholder="********" />
            </div>
            <div className="flex justify-between items-center mb-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-xs">Remember me?</span>
              </label>
              <a href="#" className="text-xs text-blue-400 hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Sign In</button>
          </form>
          <p className="text-center text-sm">
            Not registered yet? <Link href="/signup" className="text-blue-400 hover:underline">Create an account</Link>
          </p>
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center items-center bg-white text-black rounded-r-lg">
          <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-4 text-sm">Continue on your journey by signing in</p>
          <p className='mb-4 text-lg font-bold'>OR</p>
          <p className="mb-4 text-sm">Sign up with your email</p>
          <Link href="/signup" className="btn btn-lg btn-primary text-white font-bold py-2 px-4 rounded mb-4">Sign Up</Link>
        </div>
      </div>
    </main>
  );
};

export default SignInForm;
