import React from 'react';
import ColorContainer from '../Colors/ColorContainer';
import { Link } from 'react-router-dom';
const PaletteContainer = props => {
  return props.palettes.map(p => (
    <div>
      <Link to={`/palette/${p.ID}`}>
        <h5>{p.PaletteName}</h5>
        <div className="row">
          <ColorContainer colors={[p.Primary, p.Secondary, p.Tertiary]} />
        </div>
      </Link>
    </div>
  ));
};

export default PaletteContainer;
