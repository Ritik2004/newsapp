import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
 
  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const[page, setPage] = useState(1)
  const[lotalResults, settotalResults] = useState(0)
  //document.title = `${this.capital(props.category)}- News`;
  const capital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a9a4dba4885a4140bf3419943cbb7e70&page=${page}&pageSize=${props.pagesize}`;
    setLoading(false);
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(parseData.articles)
    settotalResults(parseData.totalResults)
   
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
  }, [])

  }

  const handlePreviousclick = async () => {
    setPage(page-1)
   updateNews();
  };
  const handleNextclick = async () => {
    
    setPage(page+1)
    updateNews();
  };
   const fetchMoreData = async () => {
      setPage(page+1)
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a9a4dba4885a4140bf3419943cbb7e70&page=${page}&pageSize=${props.pagesize}`;
      
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles(articles.concat(parseData.articles))
      settotalResults(parseData.totalResults)
  };
  
    return (
      <>

        <h1 className="text-center" style={{ margin: "40px 0px;" }}>
          News-Top {capital(props.category)} Headlines
        </h1>
        {/* state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4">
                  <NewsItem
                    key={element.url}
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })} 
          </div>
        </InfiniteScroll>
        
      </>
    );
  

News.defaultProps = {
  country: "in",
  pagesize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
