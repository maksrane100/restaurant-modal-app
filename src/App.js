import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RestaurantDetailComponent from './RestaurantDetailComponent';
import axios from 'axios';
import { Grid, Card, Icon, Image, Label, Modal, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

/*************************************************************************************************************************/
/****************************** Demonstration of how to use Semanti UI React Modal ***************************************/
/*** On click of the Details button of the restaurant Card component, it opens up modal and displays the restaurant ******/
/*** details along with close button. When user clicks on the close button, the modal closes. ****************************/
/*************************************************************************************************************************/

const customStyles = {
	content : {
		width: '800 px',
		padding: '1.2rem',
		background: '#ffffff'
	}
};

class App extends Component {
	
	
	  constructor(props) {
      
		super(props);

		this.state = {
			restaurants:[], 
			selectedRestaurant: {},
			indents: [],
			cities: [],
			totalcities: 0,
			city:'',
			modalIsOpen: false,
			loading: true
		};
	   
		this.handleInputChange = this.handleInputChange.bind(this);    
		this.getCities = this.getCities.bind(this);  		
    }
	
	componentWillMount(){		
		this.setState({ loading: true});			
		this.getCities();
		this.setState({ loading: false});	
	}
	
	
	handleInputChange(e) {

		var newState = {};
		newState =this.state;
		newState[e.target.name] = e.target.value;
		this.setState(newState);
		this.setState({ loading: true});
		this.getRestaurants();
		this.setState({ loading: false});	
	}
	
	showDetails(restaurant, e) {

		this.setState({ selectedRestaurant: restaurant, modalIsOpen: true});	
	}
	
	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};
	  
	getCities() {
	
		var url ='http://localhost:4200/restaurants/cities';
	
		axios.get(url)
		.then(response => {

			this.setState({ cities: response.data, totalcities:  response.data.length});			
			let cities = this.state.cities;
			let optionItems = cities.map((city) =>
				<option key={city} value={city}>{city}</option>
			);
			console.log('optionItems:'+optionItems);
			this.setState({ optionItems: optionItems});
		})
		.catch(function (error) {
			console.log(error);
		});	  
	}	
	
	getRestaurants() {
		
		axios.post('http://localhost:4200/restaurants/search', {
		 "city":this.state.city
		})
		.then(response => {
			console.log('response.data.length:'+response.data.length);
			this.setState({ restaurants: response.data, totalrestaurants:  response.data.length});						
		})
		.catch(function (error) {
			console.log(error);
		});
	  
		console.log('restaurants length:'+this.state.restaurants.length);	  
	}
	
	render() {
		
	let data;
  
	if (this.state.loading) {
		data = <div>Loading data.... Please wait....</div>
    } else {
			data = 
				
				<div className="container">

				<div className="jumbotron">
					Search Restaurants
				</div>
 					
				<div className="row">
					<div className="fieldTitle">Select City</div>
					<div className="fieldValue">
						<select id="city" name="city"  value={this.state.city} onChange={this.handleInputChange}>
						<option value="">Select</option>
							{this.state.optionItems}
						</select>
					</div>
				</div>
			
				<div className="row">
					Total Restaurants: {this.state.restaurants.length}
				</div>

				<div>

					{ this.state.restaurants.map(restaurant => (
				
						<div className="card">
				
				
							<Card>
	
							<div>
								<div className="floatLeft">
									<Image src='http://www.clker.com/cliparts/E/y/s/j/w/U/home-icon-md.png' size="tiny"/>
								</div>
								<div className="name">
									<span>{restaurant.name}</span>
								</div>
							</div>
	
							<Card.Content>
     
								<Card.Description>

								<div className="row">
									<div className="fieldTitle">Food:</div><div className="fieldValue">{restaurant.title}</div>
								</div>

								</Card.Description>
							</Card.Content>
	
							<Card.Content extra>
								<div>
								<div className="row">
									<div className="fieldTitleExtra">Stars: {restaurant.star} </div>
									</div>
								<div className="row">
									<div className="fieldTitleExtra">Hours:
									{restaurant.openathour}:{restaurant.openatminute} AM - 
									{restaurant.closeathour}:{restaurant.closeatminute} PM
									</div>
								</div>

								<div className="row">
									
									  <Button onClick={(evt) => this.showDetails(restaurant, evt)}>Details</Button>
								</div>
								
								</div>
							</Card.Content>
  
							</Card>
						</div>
				
					))}
				</div>
			
			<div>
			
				<Modal
					open={this.state.modalIsOpen}			 
					onClose={this.closeModal}
					style={customStyles}
					className="Modal"
				>
				<RestaurantDetailComponent restaurant={this.state.selectedRestaurant} closeModal={this.closeModal}/>
				</Modal>
		
			</div>
			
		</div>
	}
	
		return (
		<div>
            {data}
		</div>

	   );
  }
}

export default App;