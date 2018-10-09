import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = "AIzaSyDHSZCNNKhHUVFOz0rrabB3fR7b5GbOx6c";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };

        YTSearch({ key: API_KEY, term: 'surfboards' }, (videos) => {
            this.setState({ 
                videos:videos,
                selectedVideo:videos[0]
             });
            // in es6: equivalent to this.setState({videos: videos});
            this.videoSearch('surfboards');
        });
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({ 
                videos:videos,
                selectedVideo:videos[0]
             });
            // in es6: equivalent to this.setState({videos: videos});
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo:selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));