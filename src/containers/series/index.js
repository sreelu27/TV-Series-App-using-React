import React,{Component} from 'react';
import Intro from '../../components/Intro';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader';

class Series extends Component {
    state = {
        series: [],
        seriesName:'',
        isFetching :false
      }
    
     /* componentDidMount(){
        const series = ["Vikings","Game of Thrones"];
        setTimeout(() =>{
          this.setState({series})
        },2000);
      }*/
    
     /* componentDidMount(){
        fetch('http://api.tvmaze.com/search/shows?q=Vikings')
        .then((response) => response.json())
        .then(json => this.setState({series: json}))
      }*/

      onSeriesInputChange = e => {
        this.setState({seriesName:e.target.value, isFetching:true});
        fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
        .then((response) => response.json())
        .then(json => this.setState({series: json, isFetching: false}));
        console.log(e)
        console.log(e.target.value)
      }

    render(){
        const {series, seriesName, isFetching} = this.state;
        return (
            <div>
                <Intro message="Here you can find all of your favourite series"/>
                <div>
                  <input value ={seriesName} type="text" onChange={this.onSeriesInputChange} />
                </div>
                {
                !isFetching && series.length === 0 && seriesName.trim() === ''
                 && <p>Please enter the name of any tv series into the input</p>
                }
                {
                !isFetching && series.length === 0 && seriesName.trim() !== ''
                 && <p>No tv series has been found with this name</p>
                }
                {
                  isFetching && <Loader/>
                }
                {
                  !isFetching && <SeriesList list = {this.state.series}/>
                }
                
            </div>
        )
    }
}

export default Series;