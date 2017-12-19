// @flow
import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Chart } from 'react-google-charts';

import { connect } from '../../../actions';

import { calculateScore } from '../../../utils/questionnaire';
import { format as dateFormat } from '../../../config/date.json';

class StatisticsPatientChart extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    questionnairesData: PropTypes.instanceOf(Object),
    locale: PropTypes.string
  };

  getChartData() {
    const { i18n, locale, questionnairesData } = this.props;
    const timescores = {};
    questionnairesData.reverse();
    questionnairesData.forEach(questionnaire => {
      const qstDate = new Date(questionnaire.createdAt);
      const scores = calculateScore(questionnaire);
      Object.keys(scores).forEach(key => {
        if (!timescores[key]) {
          timescores[key] = {};
        }
        timescores[key][+qstDate] = scores[key];
      });
    });

    const chartHeaders = [i18n('statistics-patient-questionnaires')].concat(Object
      .keys(timescores)
      .map(key => i18n(`statistics-questionnaire-type-${key}`)));

    const chartData = [chartHeaders];
    questionnairesData.forEach(questionnaire => {
      const qstDate = new Date(questionnaire.createdAt);
      const qstData = [];
      qstData.push(new global.Intl
        .DateTimeFormat(locale, dateFormat.date)
        .format(qstDate));
      Object.keys(timescores).forEach(key => {
        const score = timescores[key][+qstDate];
        if (typeof score === 'number') {
          qstData.push(score);
        } else {
          qstData.push(0);
        }
      });
      chartData.push(qstData);
    });
    return chartData;
  }

  render() {
    const { i18n, questionnairesData } = this.props;
    if (!questionnairesData) {
      return (<div />);
    }

    return (
      <List>
        <Subheader>{i18n('statistics-graph-score-trend')}</Subheader>
        <ListItem
          className="statistics__element"
          disabled={true}
        >
          <Chart
            chartType="LineChart"
            options={{
              interpolateNulls: true,
              chartArea: {
                left: 0,
                top: 0,
                width: '80%'
              }
            }}
            graph_id="LineScoreChart"
            width="100%"
            height="450px"
            data={this.getChartData()}
            legend_toggle
          />
        </ListItem>
      </List>
    );
  }
}

export default connect(StatisticsPatientChart);
