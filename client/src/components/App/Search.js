export default function Search(onSearchFieldChange) {
    return (
        <div>
            <form onChange={onSearchFieldChange} className="m-4 flex">
                <input
                    className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                    placeholder="Search for other users..."
                />
                <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">
                    Search
                </button>
            </form>
        </div>
    );
}
