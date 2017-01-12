import './InitialContainer.styl';

import React, {
  Component,
  PropTypes as Type,
} from 'react';

import Slider from 'react-slick';

import {
  Dropdown,
  Menu,
  Segment,
  Input,
  Button,
  Icon,
  Image,
  Container,
  Header
} from 'semantic-ui-react';

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import {
  StoreActions,
} from 'actions';

const options = [
  { text: 'United States', value: 'us', flag: 'us' },
  { text: 'Russia', value: 'ru', flag: 'ru' },
];

const reg = /id(\d+)/;

@connect(state => ({
  data: state.store
}), dispatch => ({
  actions: bindActionCreators(StoreActions, dispatch)
}))

export default class InitialContainer extends Component {
  /**
   * Validates passed properties
   */
  static propTypes = {
    actions: Type.object
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentValue: 'ru'
    };


    this.handleChange = this.handleChange.bind(this);
  }

  state = { activeItem: 'Iphone' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleChangeLanguage(e, { value }) {
    this.setState({ currentValue: value })
    let newLang =  this.state.currentValue

    if(newLang === 'ru'){
      newLang = 'us'
    }else{
      newLang='ru'
    }
    if(this.state.value == '')
    {
      alert('Введите адресс')
    }else{
      if(this.state.value.match(reg) == null){
        alert('Неправильные  адрес')
      }else{
        this.props.actions.storeActions(this.state.value.match(reg)[1], newLang);
      }
    }
  }

  /**
   * Invokes after the initial rendering of component
   */
  componentDidMount() {
    //this.props.actions.testAction();
  }

  /**
   * Renders 'InitialContainer' component
   */

  _Search() {
    if(this.state.value == '')
    {
      alert('Введите адресс')
    }else{
      if(this.state.value.match(reg) == null){
        alert('Неправильные  адрес')
      }else{
        this.props.actions.storeActions(this.state.value.match(reg)[1], this.state.currentValue);
      }
    }

  }

  handleChange(event, valueObject) {
    this.setState({value: valueObject.value});
  }

  render() {
    const { data } = this.props
    const info = data.data
    console.log(info)
    const { activeItem } = this.state
    var settings = {
      dots: false,
      arrows: false,
      focusOnSelect: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1
    };

    return (
      <div className="root">
        <Menu attached='top' tabular >
          <Menu.Item name='Iphone' active={activeItem === 'Iphone'} onClick={this.handleItemClick}>
            <Icon name="apple" />
            App Store
          </Menu.Item>
          <Menu.Item name='Android' active={activeItem === 'Android'} onClick={this.handleItemClick} >
            <Icon name="android" />
            Google Play
          </Menu.Item>
        </Menu>
        <Segment attached='bottom'>
          <Input type='text' placeholder='Enter app name or URL...' value={this.state.value} onChange={this.handleChange} />
          <Dropdown compact search selection options={options} onChange={::this.handleChangeLanguage} defaultValue={this.state.currentValue} />
          <Button primary type='submit' onClick={::this._Search}>Search</Button>
        </Segment>
        <div className={(info.trackName == undefined ? "none" : "icon-app")}>
          <Image src={info.artworkUrl512} size='small'  />
        </div>
        <div className={(info.trackName == undefined ? "none" : "discription")}>
          <Container fluid>
            <Header as='h2'>{info.trackName}</Header>
            <p>От {info.sellerName}</p>
            <Button basic color={info.price == 0 ? 'green' : 'blue'}>{info.price == 0 ? this.state.currentValue === 'ru' ? 'Загрузить' : 'Download' : info.price+' '+info.currency}</Button>
          </Container>
        </div>
        <div className={(info.trackName == undefined ? "none" : "contentAdvisoryRating")}>{info.contentAdvisoryRating}</div>
        <div className="slide-wrapper">
          {
            info && info.screenshotUrls && info.screenshotUrls.length &&
            <Slider
              {...settings}>
              { info.screenshotUrls.map((item, key) => (
                <div className="slide" key={key} style={ { backgroundImage: `url(${item})` } }>
                  <div className="divider"></div>
                </div>
              ))}
            </Slider>
          }
        </div>
        <div className={(info.trackName == undefined ? "none" : "more-discription")}>
          <Container fluid>
            <Header as='h2'>{this.state.currentValue === 'ru' ? 'Описание' : 'Discription'}</Header>
            <p>{info.description}</p>
          </Container>
        </div>
      </div>
    );
  }
}
