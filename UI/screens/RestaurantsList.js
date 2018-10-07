import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ImageBackground,
  ListView,
  Tile,
  Title,
  Subtitle,
  TouchableOpacity,
  Screen,
  Divider,
} from '@shoutem/ui';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';
import { connect } from 'react-redux';

import { navigatePush } from '../redux';

class ecoesList extends Component {
  static propTypes = {
    onButtonPress: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  getecoes() {
    return require('../assets/data/ecoess.json');
  }

  renderRow(ecoes) {
    const { onButtonPress } = this.props;

    return (
      <TouchableOpacity onPress={() => onButtonPress(ecoes)}>
        <ImageBackground
          styleName="large-banner"
          source={{ uri: ecoes.image.url }}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{ecoes.name}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{ecoes.address}</Subtitle>
          </Tile>
        </ImageBackground>
        <Divider styleName="line" />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Screen>
        <NavigationBar title="All ecoes" />
          <ListView
            data={this.getecoes()}
            renderRow={ecoes => this.renderRow(ecoes)}
          />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: (ecoes) => {
    dispatch(navigatePush({
      key: 'RestaurantDetails',
      title: 'Details',
    }, { ecoes }));
  },
});

export default connect(
	undefined,
	mapDispatchToProps
)(ecoesList);
