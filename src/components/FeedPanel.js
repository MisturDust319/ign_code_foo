import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { ButtonGroup } from 'reactstrap';
import { Label } from 'reactstrap';

import {Article} from './Article.js';


class FeedPanel extends React.Component {

    constructor(props) {
        super(props);
        
        this.apiURL = "https://ign-apis.herokuapp.com/";
        this.startIndex = 0; // used to gauge where to start when
        // getting new content
        this.contentAmount = 10; // amount of data to pull from api

        //articles: available articles
        //videos: available videos
        //view: the currently visible content
        this.state = {
            articles: [],
            videos: [],
            view: "articles",
        }
        
        this.getArticles = this.getArticles.bind(this);
        this.getVideos = this.getVideos.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    getContent = () => {
        (this.state.view === "videos") ? this.getVideos() : this.getArticles();
    }

    getVideos = () => {
        alert("WIP");
    }

    getArticles = () => {
        // get data from the API
        let url = `${this.apiURL}content?startIndex=${this.startIndex}&count=${this.contentAmount}`;
        let content; // empty var to hold content
        let articles = [];

        // you want to get content in regular chunks
        // so loop until you get enough
        // while(articles.length < 10) {
            // call API to get feed content
            axios.get(url)
                .then((response) => {
                    alert(response.data);
                    content = response.data.map((cont) => {
                        // for each datum processed, increment start index
                        this.startIndex = (this.startIndex + 1) % 300;
                        
                        let dat = {} // holds return data

                        // get img data
                        let imgDat = cont.thumbnails[0];
                        dat.imgURL = imgDat.url;
                        dat.imgWidth = imgDat.width;
                        dat.imgHeight = imgDat.height;

                        // other data
                        dat.id = cont.contentId;
                        dat.title = cont.metadata.title;
                        dat.type = cont.metadata.contentType;

                        return dat;
                    });
                }).catch((error) => {
                    console.log(error.response);
                });

            // // next sort content into videos and articles
            // articles = content.filter((data) => {
            //     return data.type === "article";
            // });

            // // make sure you only get 10 items
            // if(articles.length > this.contentAmount) {
            //     articles.slice( 0, this.contentAmount + 1);
            // }
        // }

        // store the data in state
        this.setState({ articles : articles});
    }

    renderArticles = () => {
        let zeroElem = this.state.articles[0];
        let ret = (
            <Article key={zeroElem.id}
            imageSource={zeroElem.imgURL} imageWidth={zeroElem.imageWidth} imageHeight={zeroElem.imageHeight}
            length="TEST" commentCount="TEST"
            name={zeroElem.title} />
        );
        ret += this.state.articles.slice(0, this.state.articles.length).map((art) => {
            <Article key={art.id}
            imageSource={art.imgURL} imageWidth={art.imageWidth} imageHeight={art.imageHeight}
            length="TEST" commentCount="TEST"
            name={art.title} rule={true} />
        });
    }

    render() {
        return(
            <div>
                <Row>
                    <Col xs="12">
                        <ButtonGroup className="button-margin">
                            <Button color="primary">VIDEOS</Button>
                            <Button color="primary">ARTICLES</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className="item-list">
                    {this.renderArticles}
                </Row>
                <Row>
                    <Col xs="12">
                        <Button color="primary" className="button-margin" onClick={this.getContent}>LOAD MORE</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export {FeedPanel};