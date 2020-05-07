import React, {Fragment} from "react";
import {connect} from 'react-redux'
import {Button, Modal, ModalBody, ModalFooter} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import ArticleForm from "./Form";

class ModalShow extends React.Component {
    state = {
        modal: false,
        formData: {
          title: "",
          description: "",
          image: null
      }
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    handleClick = () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/login')
        } else {
            return this.toggle()
        }
    }

    render() {
        const {create, article} = this.props;
        let button = <Button variant="warning" onClick={() => this.handleClick()} style={{minWidth: "80px"}}>Edit</Button>;
        let requestType="put";
        if (create) {
            requestType="post";
            button = (
                <Button
                    variant="primary"
                    className="float-right"
                    onClick={() => this.handleClick()}
                    style={{minWidth: "100px"}}
                >
                    Create
                </Button>
            );
        }
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
                      {create ? (
                          <ArticleForm
                                requestType={requestType}
                                article={this.state.formData}
                                toggle={this.toggle}
                                reset={this.props.reset}
                          />
                      ) : (
                          <ArticleForm
                                requestType={requestType}
                                article={article}
                                toggle={this.toggle}
                                reset={this.props.reset}
                          />
                      )}

                  </ModalBody>
                  <ModalFooter>
                      <Button onClick={this.toggle}>Close</Button>
                  </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps, null)(ModalShow);