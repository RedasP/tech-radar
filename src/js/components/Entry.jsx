import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import radarService from '../modules/radarService';
import Related from './entry/Related';
import History from './entry/History';
import Badge from './entry/Badge';

const Entry = (props) => {
  const { match } = props;
  const entry = radarService.getEntry(match.params.id);

  return (
    <div className="container">
      <div className="row">
        <div className="entry-container">
          <h1>{entry.name}</h1>
          {entry.logo && (
            <img src={entry.logo} alt={entry.name} className="entry-logo" />
          )}
        </div>
      </div>
      <div className="row">
        <div className="badges">
          <Badge className={entry.blip.ringName} icon="map-marker" text={entry.blip.ringName} />
          <Badge icon="clock-o" text={entry.blip.since} />
          {(entry.blip.active === false) && (
            <Badge className="inactive" icon="warning" text="Inactive" />
          )}
        </div>
        <div className="twelve.columns">
          <Markdown source={entry.description} />
        </div>
        {entry.rationale && (
          <React.Fragment>
            <h2>Rationale</h2>
            <Markdown source={entry.rationale} />
          </React.Fragment>
        )}
        <Related related={entry.related} />
        <History history={entry.blip.history} />
      </div>
    </div>
  );
};

Entry.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Entry;