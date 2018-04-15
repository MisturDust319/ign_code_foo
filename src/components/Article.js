import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Extra.css';

import { Row } from 'reactstrap';
import { Col } from 'reactstrap';

function Article(props) {

    return (
        <Row>
            {() => { if(props.bool == true)
                return (<hr />) } }
            <Col xs="5">
                <img src={props.imageSource} width={props.imageWidth} height={props.imageHeight} className="img-fluid" />
            </Col>
            <Col xs="7">
                <Row>
                    <span className="item-stats">
                    {props.length}m&ensp;-&ensp;
                        <svg className="icon icon-comment-2" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.538 11.528l-3.14 2.048a.5.5 0 0 1-.773-.419v-1.993a4.375 4.375 0 0 1 1.749-8.383h5.252a4.374 4.374 0 1 1 0 8.747H7.538z" stroke="#DD3A3A" stroke-width="2" fill="none" fill-rule="evenodd">
                            </path>
                        </svg>
                    &ensp;{props.commentCount}
                    </span>
                </Row>
                <Row><b className="article-name">{props.name}</b></Row>
            </Col>
        </Row>
    )
}

Article.propTypes = {
    imageSource: PropTypes.string.isRequired,
    imageWidth: PropTypes.string.isRequired,
    imageHeight: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    commentCount: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rule: PropTypes.bool
}

export { Article };