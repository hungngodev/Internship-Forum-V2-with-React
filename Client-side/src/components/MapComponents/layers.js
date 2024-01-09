
export const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'internships',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#00BCD4',
      10,
      '#2196F3',
      30,
      '#3F51B5'
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
    'text-size': 12
  }
};

export const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'internships',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 20,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};