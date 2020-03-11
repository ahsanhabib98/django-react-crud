import React from "react";
import axios from "axios";
import {Card, Image} from "react-bootstrap";
import {articleDetailURL} from "../constants";

class ArticleDetail extends React.Component {
    state = {
        article: {}
    };

    componentDidMount() {
        const articleID = this.props.match.params.articleID
        axios.get(articleDetailURL(articleID))
            .then(res => {
                this.setState({
                    article: res.data
                });
            })
    };

    render() {
        return (
            <React.Fragment>
                <Card>
                  <Card.Header>Featured</Card.Header>
                  <Card.Body>
                    <Card.Title>{this.state.article.title}</Card.Title>
                      <Image height="200px" width="200px" src={this.state.article.image} fluid />
                    <Card.Text>
                        {this.state.article.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default ArticleDetail;