import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ScrollView,
  Icon,
  Row,
  Subtitle,
  Text,
  Title,
  View,
  ImageBackground,
  Divider,
  Tile,
  Screen,
} from '@shoutem/ui';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

export default class RestaurantDetails extends Component {
  static propTypes = {
    ecoes: PropTypes.object,
  };

  render() {
    const { ecoes } = this.props;

    return (
      <Screen styleName="paper full-screen">
        <NavigationBar
          title={ecoes.name}
          styleName="clear hide-title"
          animationName="solidify"
        />

        <ScrollView>
          <ImageBackground
            styleName="large-portrait hero"
            animationName="hero"
            source={{ uri: ecoes.image && ecoes.image.url }}
            key={ecoes.name}
          >
            <Tile animationName="hero">
              <Title>{ecoes.name}</Title>
              <Subtitle>{ecoes.address}</Subtitle>
            </Tile>
          </ImageBackground>

          <Screen styleName="paper">
            <Text styleName="md-gutter multiline">{ecoes.description}</Text>

            <Divider styleName="line" />

            <Row>
              <Icon name="laptop" />
              <View styleName="vertical">
                <Subtitle>Visit webpage</Subtitle>
                <Text numberOfLines={1}>{ecoes.url}</Text>
              </View>
            </Row>

            <Divider styleName="line" />

            <Row>
              <Icon name="pin" />
              <View styleName="vertical">
                <Subtitle>Address</Subtitle>
                <Text numberOfLines={1}>{ecoes.address}</Text>
              </View>
            </Row>

            <Divider styleName="line" />

            <Row>
              <Icon name="email" />
              <View styleName="vertical">
                <Subtitle>Email</Subtitle>
                <Text numberOfLines={1}>{ecoes.mail}</Text>
              </View>
            </Row>

            <Divider styleName="line" />
          </Screen>
        </ScrollView>
      </Screen>
    );
  }
}
