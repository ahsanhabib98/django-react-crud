import React, {Fragment} from "react";
import {Alert, Button, Modal, ModalBody, ModalFooter, Spinner, Table} from "react-bootstrap";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {articleListURL, articleDeleteURL} from "../constants";
import ModalShow from "./ArticleModalShow";
import ModalHeader from "react-bootstrap/ModalHeader";
import {connect} from "react-redux";

class ArticleDelete extends React.Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    handleDelete = articleID => {
        axios.delete(articleDeleteURL(articleID))
            .then(res => {
                this.props.reset();
                this.toggle();
            });
    };

    handleClick = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/login')
        } else {
            return this.toggle()
        }
    }

    render() {
        const button = <Button variant="danger" onClick={() => this.handleClick()} style={{minWidth: "80px"}}>Delete</Button>;
        return (
            <Fragment>
                {button}
                <Modal
                    show={this.state.modal}
                >
                  <ModalHeader>
                      Modal heading
                  </ModalHeader>
                  <ModalBody>
                        <p>Are you sure you want to delete this article ?</p>
                  </ModalBody>
                  <ModalFooter>
                      <Button onClick={() => this.handleDelete(this.props.articleID)}>Yes</Button>
                      <Button onClick={this.toggle}>No</Button>
                  </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

class ArticleList extends React.Component {

    state = {
        data: [],
        error: null,
        loading: false
    };

    componentDidMount() {
        this.handleFetchArticleList();
    }

    handleFetchArticleList = () => {
        this.setState({loading: true});
        axios.get(articleListURL)
            .then(res => {
                this.setState({data: res.data, loading: false});
            })
            .catch(err => {
                this.setState({error: err});
            });
    };

    render() {
        const {data, error, loading} = this.state;
        return (
              <Fragment>
                  {error && (
                      <Alert variant="success">
                        <Alert.Heading>How's it going?!</Alert.Heading>
                        <p>
                            not working
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                          <Button variant="outline-success">
                            Close me ya'll!
                          </Button>
                        </div>
                      </Alert>
                  )}
                  {loading && (
                      <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                      </Spinner>
                  )}
                  {data && (
                      <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Title</th>
                              <th>Date</th>
                              <th colSpan="2"/>
                            </tr>
                          </thead>
                          <tbody>
                          {data.map((article, i) => {
                              return (
                                  <tr key={article.id}>
                                      <td>{i+1}</td>
                                      <td>
                                          <Link to={`${article.id}/detail`}>
                                              {article.title}
                                          </Link>
                                      </td>
                                      <td>{new Date(article.date).toUTCString()}</td>
                                      <td>
                                          <ModalShow
                                            create={false}
                                            article={article}
                                            reset={this.handleFetchArticleList}
                                            history={this.props.history}
                                            isAuthenticated={this.props.isAuthenticated}
                                          />
                                      </td>
                                      <td>
                                          <ArticleDelete
                                            articleID={article.id}
                                            reset={this.handleFetchArticleList}
                                            history={this.props.history}
                                            isAuthenticated={this.props.isAuthenticated}
                                          />
                                      </td>
                                  </tr>
                              )
                          })}
                          <tr>
                              <td colSpan="4"/>
                              <td>
                                  <ModalShow
                                    create={true}
                                    article={null}
                                    reset={this.handleFetchArticleList}
                                    history={this.props.history}
                                    isAuthenticated={this.props.isAuthenticated}
                                  />
                              </td>
                          </tr>
                          </tbody>
                      </Table>
                  )}
              </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps, null)(ArticleList);

