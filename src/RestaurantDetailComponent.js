import React, { Component } from 'react';
import { Grid, Card, Icon, Image, Label, Modal, Segment, Button } from 'semantic-ui-react'
//import 'semantic-ui-css/semantic.min.css';


class RestaurantDetailComponent extends Component {

  constructor(props) {
      super(props);
	  this.state = {restaurant: this.props.restaurant};
  }

	 
	  	  
    componentWillMount(){
      
	  
    }

	
    render() {
		const { open } = this.state;
		
      return (
	  
	<Grid>
		<Grid.Row>
			<Grid.Column>
				<Segment>
	
					<Label attached='top'>{this.state.restaurant.name}</Label>
		  
					<div>
			
					<div className="row">
						<div className="fieldTitle">Name</div>
						<div className="fieldValue">
						{this.state.restaurant.name}
						</div>
					</div>

					<div className="row">
						<div className="fieldTitle">Title</div>
						<div className="fieldValue">
						{this.state.restaurant.title}
						</div>
					</div>

					<div className="row">
						<div className="fieldTitle">Highlight</div>
						<div className="fieldValue">
						{this.state.restaurant.highlight}
						</div>
					</div>	

					<div className="row">
						<div className="fieldTitle">Hours</div>
						<div className="fieldValue">
						Opens At: {this.state.restaurant.openathour}:{this.state.restaurant.openatminute} AM - 
						Closes At: {this.state.restaurant.closeathour}:{this.state.restaurant.closeatminute} PM
						</div>
					</div>	

					<div className="row">
						<div className="fieldTitle">Location</div>
						<div className="fieldValue">
						{this.state.restaurant.address.address1} {this.state.restaurant.address.address2} {this.state.restaurant.address.city}
						{this.state.restaurant.address.state} {this.state.restaurant.address.zip} {this.state.restaurant.address.country}
						</div>
					</div>	

					<div className="row">
						<div className="fieldTitle">Stars</div>
						<div className="fieldValue">
						{this.state.restaurant.star}
						</div>
					</div>	

					<div className="row">
						<Button onClick={(evt) => this.props.closeModal(evt)}>Close</Button>
					</div>	
	
				</div>

				</Segment>
			</Grid.Column>
		</Grid.Row>
  
	</Grid>
  
      );
    }
  }

export default RestaurantDetailComponent;
