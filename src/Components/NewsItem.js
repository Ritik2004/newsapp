import React from "react";

const NewsItem = (props) => {
 
    let { title, description, imageurl, newsurl, author, date,source } = props;
    return (
      <div className="my-3">
        <div className="card" >
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {source}
              </span>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
    
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsurl} target="blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem