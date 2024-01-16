
export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'internships',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#ffa000',
      10,
      '#7986cb',
      30,
      '#f44336'
    ],
    'circle-radius': [
      'step',
      ['get', 'point_count'],
      15,
      10,
      20,
      30,
      25
    ]
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'internships',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 20
  }
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'internships',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#ec407a',
    'circle-radius': 10,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};