import React from "react";
import Modal from "react-modal";
import axios from "axios";

const api_key = "d0aea524bd07ed49cbc26dff63f357dd";
export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      data: [],
      filteredData: []
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  async componentDidMount() {
    Modal.setAppElement("#root");
    // get default data
    const { data: movies } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`
    );
    console.log(movies);

    // set default data
    this.setState({ data: movies.results });
  }

  filter = async e => {
    // get the value of the filter
    const val = e.target.value;

    // update endpoint string to contain new value
    const url = `https://api.themoviedb.org/3/discover/${val}?sort_by=popularity.desc&api_key=${api_key}`;
    console.log(url);

    // set state with updated api response
    await axios.get(url).then(res => {
      this.setState({ filteredData: { data: res.data, type: val } });
    });

    console.log(this.state);
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
    console.log(this.state);
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <div className="filter-container">
          <button onClick={this.filter} value="all">
            Popular
          </button>
          <button onClick={this.filter} value="movie">
            Movies
          </button>
          <button onClick={this.filter} value="tv">
            TV Shows
          </button>
          <button onClick={this.filter} value="actors">
            Actors
          </button>
        </div>
        {/* If data has been filtered, display filtered data*/}
        {this.state.filteredData.results ? (
          <div>
            <ul>
              {this.state.filteredData.results.map((item, index) => (
                <div>
                  {this.state.filteredData.type === "movie" ? (
                    <li
                      onClick={this.handleOpenModal}
                      value={index}
                      key={index}
                      data={item}
                    >
                      {item.title}
                    </li>
                  ) : (
                    <li
                      onClick={this.handleOpenModal}
                      value={index}
                      key={index}
                      data={item}
                    >
                      {item.name}
                    </li>
                  )}
                  <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                  >
                    <button onClick={this.handleCloseModal}>X</button>
                    <h1>{item.id}</h1>
                  </Modal>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <ul>
              {/* Otherwise display default data*/}
              {this.state.data.map((item, index) => (
                <div>
                  <li
                    onClick={this.handleOpenModal}
                    value={index}
                    key={index}
                    data={item}
                  >
                    {item.title}
                  </li>
                  <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                  >
                    <button onClick={this.handleCloseModal}>X</button>
                    <h1>{item.id}</h1>
                  </Modal>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
