import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col text-center bg-dark text-bg-dark">
      <div className="flex-grow d-flex flex-column justify-center align-items-center">
        <header className="mb-auto w-full">
          <div className="flex justify-between items-center p-3 mx-auto max-w-screen-xl">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Fintech" className="w-[77px] h-[61px]" />
              <div className="flex flex-col">
                <div className="text-white text-sm font-bold">Fintech</div>
                <div className="text-white text-[10px] font-bold">Your finance assistant</div>
              </div>
            </div>
            <nav className="nav nav-masthead justify-content-center">
              <Link className="nav-link active" aria-current="page" href="/">Home</Link>
              <Link className="nav-link" href="#">Features</Link>{/*şuan aktif olamdığı için duruyor*/ }
              <Link className="nav-link" href="/signin">Sign In</Link>
            </nav>
          </div>
        </header>

        <main className="px-3 flex-grow flex flex-col justify-center items-center">
          <h1>Discover your future finance investments and more with our latest FinanceAI</h1>
          <p className="lead">Start your journey by signing in</p>
          <p className="lead">
            <Link href="/signin" className="btn btn-lg btn-secondary fw-bold border-white bg-primary text-white">Sign In</Link>
          </p>
        </main>

        <footer className="mt-auto text-white-50 py-3">
          <p>© Fintech Financial Assistant 2024 All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
