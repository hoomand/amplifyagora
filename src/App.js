import React from "react";
import { Auth, Hub } from "aws-amplify";
import { Authenticator, Greetings, AmplifyTheme } from "aws-amplify-react";
import "./App.css";

class App extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? this.setState({ user }) : this.setState({ user: null });
    Hub.listen("auth", this, "onHubCapsule");
  };

  onHubCapsule = capsule => {
    switch (capsule) {
      case "signIn":
        console.log("user signed in!");
        this.getUserData();
        break;
      case "signUp":
        console.log("signed up");
        break;
      case "signOut":
        console.log("signed out");
        this.setState({ user: null });
        break;
      default:
        return;
    }
  };

  render() {
    const { user } = this.state;
    return !user ? (
      <Authenticator theme={theme} hideDefault={true} />
    ) : (
      <div>App</div>
    );
  }
}

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0cb"
  },
  button: { ...AmplifyTheme.button, backgroundColor: "var(--amazonOrange)" },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  }
};

export default App;
