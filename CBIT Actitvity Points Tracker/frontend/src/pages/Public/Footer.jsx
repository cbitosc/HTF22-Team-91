import MainLogo from "../../assets/mainlogo.png";


export default function Footer() {
  return (
    <footer className="p-4 bg-gray-900 text-white shadow md:px-6 md:py-8 dark:bg-gray-900">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="/" className="flex justify-center items-center mb-4 sm:mb-0">
          <img src={MainLogo} className="mr-3 mb-1 h-10" alt="CBIT Logo" />
          <h1 className="font-mono -mt-1 text-white text-2xl font-semibold">CBIT <span className="text-teal-600"> Activity </span> Points Tracker</h1>
        </a>
        <ul className="flex flex-wrap items-center justify-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
        © 2022{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          DEV Squad
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
