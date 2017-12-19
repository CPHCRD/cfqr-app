// @flow
import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Chart } from 'react-google-charts';

import { connect } from '../../../actions';

import { stringToColour } from '../../../utils/misc';
import { calculateScore } from '../../../utils/questionnaire';

class StatisticsQuestionnaireChart extends Component {
  static propTypes = {
    i18n: PropTypes.func,
    questionnaireData: PropTypes.instanceOf(Object)
  };

  getChartData() {
    const { i18n, questionnaireData } = this.props;
    const scores = calculateScore(questionnaireData);

    const chartHeaders = [
      i18n('statistics-questionnaire-type'),
      i18n('statistics-questionnaire-score'),
      { role: 'style' },
      { role: 'annotation' }
    ];

    const chartData = [chartHeaders];
    Object.keys(scores).forEach(key => {
      chartData.push([
        `${i18n(`statistics-questionnaire-type-${key}`)}`,
        scores[key],
        stringToColour(key),
        scores[key]
      ]);
    });
    return chartData;
  }

  render() {
    const { i18n, questionnaireData } = this.props;
    if (!questionnaireData) {
      return (<div />);
    }

    return (
      <List>
        <Subheader>{i18n('statistics-graph-score-trend')}</Subheader>
        <ListItem
          className="statistics__element"
          key="qst-stats-patient-vacation"
          disabled={true}
        >
          <Chart
            chartType="BarChart"
            options={{
              chartArea: {
                left: '100',
                top: 0,
                width: '80%',
                height: '100%'
              },
              bar: { groupWidth: '80%' },
              legend: { position: 'none' },
            }}
            graph_id="BarScoreChart"
            width="100%"
            height="300px"
            data={this.getChartData()}
            legend_toggle
          />
        </ListItem>
      </List>
    );
  }
}

export default connect(StatisticsQuestionnaireChart);
