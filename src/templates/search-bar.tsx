"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
// import { SearchInput } from '@shadcn/ui';

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     router.push(`/search?q=${searchTerm}`);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
//       <Input
//         placeholder="Search..."
//         type="search"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="w-full pl-10"
//       />
//       <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
//     </form >
//   );
// };

// export default SearchBar;



interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full md:w-1/2">
      <Input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="w-full border pl-10 border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* <Input
        placeholder="Search..."
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10"
      /> */}

      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
      {/* <button
        type="button"
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;