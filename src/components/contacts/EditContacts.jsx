import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      errors: {}
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = response.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name is Required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is Required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is Required" } });
      return;
    }
    const updateContact = {
      name,
      email,
      phone
    };
    const { id } = this.props.match.params;
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updateContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: response.data });

    //clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    this.props.history.push("/");
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form action="" onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    error={errors.email}
                  />
                  <TextInputGroup
                    name="phone"
                    label="Phone"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    name=""
                    value="Update Contact"
                    id=""
                    className="btn btn-info btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContacts;
