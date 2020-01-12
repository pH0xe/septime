const events = [
  {
    title: 'Barbecue',
    description: 'Un petit barbecue pour passer un moment convivial et agréable',
    date: new Date(2020, 1, 7),
    timeRange: '14-16h',
    roles: [
      {
        uid: '1',
        role: 'Jambon'
      },
      {
        uid: '2',
        role: 'Bibine'
      }
    ]
  },
  {
    title: 'Olympiades de janvier',
    description: 'Les Olympiades de janvier sont là ! Nous vous attendons en masse !',
    date: new Date(2020, 1, 9),
    timeRange: '13-19h',
    roles: [
      {
        uid: '1',
        role: 'Gâteaux'
      },
      {
        uid: '4',
        role: 'Boissons'
      }
    ]
  }
];

export default events;
