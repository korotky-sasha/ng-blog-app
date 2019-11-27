/*{ 'class'; : 'organizationTree',
  'data'; : [
  {id: 1, title: 'Branch 1'},
  {id: 2, title: 'Branch 21', parent: 1},
  {id: 3, title: 'Branch 2'},
  {id: 4, title: 'Branch 21', parent: 3},
  {id: 5, title: 'Branch 23', parent: 3},
  ...
];
}*/
export class OrganizationTree {
  data = [
    {id: 1, title: 'Branch 1'},
    {id: 2, title: 'Branch 11', parent: 1},
    {id: 3, title: 'Branch 2'},
    {id: 4, title: 'Branch 21', parent: 3},
    {id: 5, title: 'Branch 23', parent: 3},
  ];
}
