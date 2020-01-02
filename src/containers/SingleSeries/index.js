import React, {Component} from 'react';
import Loader from '../../components/Loader';
import { Link } from "react-router-dom";

class SingleSeries extends Component {
    state ={
        show:null
    }
    componentDidMount(){

        const {id} = this.props.match.params;
        fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
        .then((response) => response.json())
        .then(json => this.setState({show:json}));
    }
    render(){
        const {show} = this.state;

        return (
            <div>
                {show === null && <Loader/>}
                {
                    show !== null 
                    &&
                    <div>
                        <p>
                        <span style={{ color: "#0454f5", fontWeight: "bold" }}>
                            Name -
                        </span>
                            {show.name}
                        </p>
                        <p>
                        <span style={{ color: "#0454f5", fontWeight: "bold" }}>
                            Rating -
                        </span>
                            {show.rating.average}
                        </p>
                        <p>
                        <span style={{ color: "#0454f5", fontWeight: "bold" }}>
                            Premiered -
                        </span>
                            {show.premiered}
                        </p>
                        <p>
                        <span style={{ color: "#0454f5", fontWeight: "bold" }}>
                            Number of Episodes -
                        </span>
                            {show._embedded.episodes.length}
                        </p>
                        <p>
                            <img alt="Show" src={show.image.medium} />
                        </p>
                        <button>
                            <Link to={`/`} style={{ color: "blue" }}>
                                Back to Search
                            </Link>
                        </button>
                    </div>
                    
                }
            </div>
        )
    }
}

export default SingleSeries;