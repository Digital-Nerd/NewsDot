import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'



export default class News extends Component {
  static defaultProps = {
    pageSize: 9,
    category: 'general'
  }
  
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  
  articles=[];

  constructor( ) {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("async componentDidMount");
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=311d469e269f4a36a921be9f635b376d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(data);
    console.log("parsedData:");
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles,
      loading: false
    });
  }

  handleNextPage = async () => {
    // if(this.state.page > Math.ceil((this.state.totalResults/20)))
    if(Object.keys(this.state.articles).length===0)
    {
      
    }
    else{
      let url =
      `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=311d469e269f4a36a921be9f635b376d&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(data);
      console.log("parsedData:");
      console.log(parsedData);
      this.setState({ 
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    }
    };

  handlePreviousPage = async () => {
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=311d469e269f4a36a921be9f635b376d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true
      })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(data);
    console.log("parsedData:");
    console.log(parsedData);
    this.setState({ 
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
     });
  };

  render() {
    return (
      <div className="container my-4">
        <h2 className="text-center">Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-4">
          {!this.state.loading && this.state.articles.map((element) => {
             
              return (
                <div className="col-md-4 ">
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    url={element.url}
                  />
                </div>
              );              
             
          })}
        </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center",}}>
          <button className="btn btn-success" onClick={this.handlePreviousPage} disabled={this.state.page<=1}> Previous Page</button>
          <button className="btn btn-success mx-3" onClick={this.handleNextPage} disabled={Object.keys(this.state.articles).length === 0}> Next Page </button> 
        </div>        
      </div>
    );
  }
}

// News-API Key: 311d469e269f4a36a921be9f635b376d
// if(Object.keys(this.state.articles)).length === 0)
