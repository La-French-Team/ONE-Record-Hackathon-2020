import React from 'react';
import PageWithNav from 'components/commons/Page/PageWithNav';
import { useRouteMatch } from 'react-router-dom';
import LineChart from 'components/stats/LineChart/LineChart';

export default () => {
  const match = useRouteMatch();
  return (
    <PageWithNav
      pageName='Shipment'
      tabs={[
        {
          label: 'Recap',
          content: <>Shipment {match.params.id}</>,
        },
        {
          label: 'Stats',
          content: (
            <>
              <LineChart
                series={[
                  {
                    id: 'Internal temperature',
                    data: [
                      { x: 0, y: 7 },
                      { x: 1, y: 5 },
                      { x: 2, y: 11 },
                      { x: 3, y: 9 },
                      { x: 4, y: 13 },
                      { x: 7, y: 16 },
                      { x: 9, y: 12 },
                    ],
                  },
                ]}
              />
            </>
          ),
        },
      ]}
    />
  );
};