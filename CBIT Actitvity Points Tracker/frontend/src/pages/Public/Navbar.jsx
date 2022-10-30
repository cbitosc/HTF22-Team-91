import MainLogo from "../../assets/mainlogo.png"

const Navbar = () => {
    return (
  <nav class="bg-white border-gray-200 mt-4 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
    <a href="/" className="flex justify-center items-center mb-4 sm:mb-0">
          <img src={MainLogo} className="mr-3 mb-1 h-10" alt="CBIT Logo" />
          <h1 className="font-mono -mt-1 text-dark text-2xl font-semibold">CBIT <span className="text-teal-600"> Activity </span> Points Tracker</h1>
        </a>
    <div class="flex md:order-2">
        <a href="/login" class="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Log In</a>
    </div>
    </div>
  </nav>
    );
  };
  
  export default Navbar;
  