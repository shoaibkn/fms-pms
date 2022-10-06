export default function NotFound() {
  return (
    <div>
      <div class="p-6 shadow-lg rounded-lg bg-gray-100 text-gray-700">
        <h2 class="font-semibold text-3xl mb-5">Hello world!</h2>
        <p>The Page you are looking for is currently under construction.</p>
        <hr class="my-6 border-gray-300" />
        <p>
          If you were led here by some active link, please let the developer
          know.
        </p>
        <button
          type="button"
          class="inline-block px-6 py-2.5 mt-4 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
