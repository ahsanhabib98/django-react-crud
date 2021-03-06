import React, {Fragment} from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import {articleCreateURL, articleUpdateURL} from "../constants";

class ArticleForm extends React.Component {
    state = {
      title: "",
      description: "",
      image: null
    };

    componentDidMount() {
        const {article} = this.props;

        this.setState({
            title: article.title,
            description: article.description,
            image: article.image,
            extra_image: article.image
        })
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handlePhoto = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    };

    handleFormSubmit = async (e, requestType) => {
        e.preventDefault();

        let contentType = {};
        let form_data = new FormData();
        if (this.state.image!==this.state.extra_image) {
            console.log('if ', this.state)
            form_data.append('image', this.state.image, this.state.image.name);
            form_data.append('title', this.state.title);
            form_data.append('description', this.state.description);
            contentType = {
                headers: {
                    'content-type': 'multipart/form-data'
                }}
        } else {
            form_data = {...this.state}
            delete form_data.extra_image
            delete form_data.image
            contentType = {
                headers: {
                    'content-type': 'application/json'
                }}
            console.log('else ', this.state)
        }

        if (requestType === "post") {
            console.log(this.state)
            await axios.post(articleCreateURL, form_data, contentType)
                .then(res => {
                    if (res.status === 201) {
                        this.props.reset();
                        this.props.toggle();
                    }
                })
        } else if (requestType === "put") {
            const articleID = this.props.article.id;
            await axios.put(articleUpdateURL(articleID), form_data, contentType)
                .then(res => {
                    if (res.status === 200) {
                        this.props.reset();
                        this.props.toggle();
                    }
                })
        }
    };

    render() {
        console.log(this.state);
        return (
            <Fragment>
                <Form encType="multipart/form-data" onSubmit={(e) => this.handleFormSubmit(e, this.props.requestType)}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Title"
                            name="title"
                            onChange={this.handleChange}
                            value={this.state.title}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            as="textarea"
                            placeholder="Description"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            accept="image/png, image/jpeg"
                            onChange={this.handlePhoto}
                        />

                        {this.state.image && (
                            <img className="float-right" src={this.state.image} height="200px" width="200px" alt=""/>
                        )}

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Fragment>
        );
    }
}

export default ArticleForm;