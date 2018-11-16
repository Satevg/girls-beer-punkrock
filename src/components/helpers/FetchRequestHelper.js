import React from "react";
import { connect } from "react-redux";
import { setLoading } from "../actions/index";

const mapDispatchToProps = dispatch => {
    return {
        setLoading: isLoading => dispatch(setLoading(isLoading)),
    };
};

class ConnectedFetchRequestHelper extends React.Component {
    constructor(props) {
        super(props);
    }

    request = (method, url) => {
        console.log("REA");
        // this.props.setLoading(true);
        fetch(url, { method: method })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.error(error);
                throw "RequestError";
            })
            .finally(() => {
                // this.props.setLoading(false);
            });
    };
}

// const FetchRequestHelper = connect(
//     null,
//     mapDispatchToProps
// )(ConnectedFetchRequestHelper);

const FetchRequestHelper = ConnectedFetchRequestHelper;

export default FetchRequestHelper;
