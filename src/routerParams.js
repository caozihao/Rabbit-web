
const commonModels = () => {
  return [
  ];
};

export default [
  {
    path: '/',
    models: () => [
      ...commonModels()],
    page: () => import('./routes/main/MainContainer.jsx'),
  },
  {
    path: '/find',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/FindContainer.jsx'),
  },
  {
    path: '/receive',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/ReceiveContainer.jsx'),
  },
  {
    path: '/detail/:id',
    models: () => [
      ...commonModels(),
    ],
    page: () => import('./routes/goods/DetailContainer.jsx'),
  },
];
