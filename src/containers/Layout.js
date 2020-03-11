import React from "react";
import {Card, Container, Nav} from "react-bootstrap";

class CustomLayout extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Nav>
                      <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Card>
                      <Card.Body>
                          {this.props.children}
                      </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default CustomLayout;