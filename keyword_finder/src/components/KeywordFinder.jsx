import axios from "axios";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const KeywordFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [views, setViews] = useState(0);
  // const [limit, setLimit] = useState(100);
  // const [currentPage, setCurrentPage] = useState(1);
  const recordsPerpage = 25;
  const [similarKeywords, setSimilarKeywords] = useState([]);

  const fetchSimilarKeywords = async () => {
    try {
      if (searchTerm === "") {
        setSimilarKeywords([]); // Reset similarKeywords when the keyword is empty
        return;
      }

      const requestOptions = {
        method: "GET",
        params: { keywords: `${searchTerm}`, limit:100},
        url: "http://localhost:5000/results",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };      

      const response = await axios.request(requestOptions);
      const list = response.data.results;

      console.log(list);

      const totalviews = list.reduce((totalViews, listing) => totalViews + listing.views, 0);

      setViews(totalviews)

      // Extract tags from the response and filter similar keywords
      const extractedTags = list.flatMap((item) => item.tags);
      
      const similarKeywords = extractedTags.filter((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log(similarKeywords);

      setSimilarKeywords(similarKeywords);

      // axios.request(requestOptions).then((response) => {
      //   // res.json(response.data)
      //   // console.log(response.data)
      //   const list = response.data.results;

      //   const retriveddata = list.map((i) => i.tags.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase())));
      //   console.log(retriveddata);
      // setSimilarKeywords(data.similarKeywords);
      // }).catch((error) => console.log(error))

      // if (response.ok) {
      //   const data = await response.json();
      //   setSimilarKeywords(data.similarKeywords);
      // } else {
      //   console.error('Failed to fetch similar keywords');
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
          <div className=" min-h-screen bg-gray-100 flex flex-col sm:py-12 justify-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Search similar keywords
          {/* <p className="text-center text-xl">{`Similar keyword count: ${similarKeywords.length}`}</p> */}
          <p className="text-center text-xl">{`Competition for 100 records limit: ${similarKeywords.length}`}</p>
          <p className="text-center text-xl">{`Views for 100 records: ${views}`}</p>

          <p className="text-[12px]">Note: click on search icon to search the keyword</p>
        </h2>
       
      </div>

      <div className="mt-8 relative sm:mx-auto sm:w-full sm:max-w-md">
      <input
          type="text"
          placeholder="Search Products.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-[40px] w-full px-3 border-[2px] border-black  rounded-md"
        />
        <AiOutlineSearch
          size={30}
          className="absolute right-2 top-1.5 cursor-pointer"
          onClick={fetchSimilarKeywords}
        />
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
        {similarKeywords && similarKeywords.length !== 0 ? (
          <div>
            <ul>
              {
                similarKeywords && similarKeywords.map((word,index) => {
                  return <p key={index}>{word}</p>
                })
              }
            </ul>
          </div>
        ) : "No keyword found"}
        </div>
      </div>
    </div>
    
    </>
  );
};

export default KeywordFinder;
