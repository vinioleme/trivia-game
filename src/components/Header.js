import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    const convertImg = md5(gravatarEmail).toString;
    const imgProfile = `https://www.gravatar.com/avatar/${convertImg}`;
    return (
      <div>
        <img
          alt="Imagem do jogador"
          src={ imgProfile }
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Header);
