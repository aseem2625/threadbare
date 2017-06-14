import Inferno from 'inferno';
import Component from 'inferno-component';

class Welcome extends Component {
    handleClick() {
        alert('That tickles nooo!');
    }
    render() {
        return (
            <div className="welcome">
                <h3>Threadbare</h3>
                <hr />
                <p>Threadbare is a basis for building isometric inferno apps easily.</p>
                <p>In its default form it carries very few dependencies and is meant to be as lean as possible</p>
                <p>To start the application in a development environment run:</p>
                <p><code>yarn dev</code></p>
                <p>By default this will build the front end javascript and restart the server on demand, all that is left for you to do is refresh.</p>
            </div>
        )
    }
}

export default Welcome;